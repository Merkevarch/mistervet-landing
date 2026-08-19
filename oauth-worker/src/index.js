/**
 * Cloudflare Worker — OAuth proxy para Decap CMS (backend GitHub, flujo implicit).
 *
 * Imita el comportamiento de Netlify Identity para que el GitHubAuthenticationPage
 * de Decap CMS funcione fuera de Netlify:
 *
 *   1. Decap CMS (en www.mistervet.co/admin/) abre popup a
 *      ${base_url}${auth_endpoint}?provider=github&scope=repo&site_id=...
 *   2. Worker /auth responde con 302 redirect a GitHub OAuth
 *   3. Usuario autoriza en GitHub
 *   4. GitHub redirige el popup a ${base_url}/callback?code=xxx
 *   5. Worker /callback intercambia el code por un access_token (server-side,
 *      sin exponer el Client Secret)
 *   6. Worker /callback responde con una página HTML que hace:
 *        a) postMessage("authorizing:github", opener.origin) al opener
 *        b) espera postMessage("authorizing:github", "*") del opener
 *        c) postMessage("authorization:github:success:JSON", opener.origin) al opener
 *      Este handshake es necesario porque Decap CMS filtra por origin===base_url.
 *   7. Decap CMS recibe el token y carga el panel
 *
 * Variables de entorno (definir con `wrangler secret put`):
 *   - GITHUB_CLIENT_ID     — Client ID de la OAuth App en GitHub
 *   - GITHUB_CLIENT_SECRET — Client Secret de la OAuth App en GitHub
 *
 * IMPORTANTE: La GitHub OAuth App debe tener registrada como
 *   Authorization callback URL:
 *     https://mistervet-cms-oauth.rubenfchavez.workers.dev/callback
 *   (la callback URL del Worker, no la del sitio).
 */

// ──────────────────────────────────────────────────────────────
// Handshake HTML que se sirve tras intercambiar el code por token.
// Imita el comportamiento de Netlify Identity: el popup envía
// "authorizing:<provider>" al opener, espera confirmación, y luego
// envía "authorization:<provider>:success:<json>" con el token.
// ──────────────────────────────────────────────────────────────
function handshakeHTML(provider, payload, errorMessage) {
  const payloadJSON = JSON.stringify(payload);
  const safePayload = payloadJSON.replace(/</g, '\\u003c');
  const safeError = (errorMessage || '').replace(/</g, '\\u003c').replace(/'/g, "\\'");

  return `<!doctype html>
<html lang="es">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<meta name="robots" content="noindex, nofollow" />
<title>Autenticando…</title>
<style>
  body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background: #f8fafc; margin: 0; display: flex; align-items: center; justify-content: center; min-height: 100vh; color: #475569; }
  .card { text-align: center; padding: 32px; background: white; border-radius: 12px; box-shadow: 0 4px 12px rgba(0,0,0,0.05); max-width: 420px; }
  .spinner { width: 36px; height: 36px; border: 3px solid #e2e8f0; border-top-color: #163E8D; border-radius: 50%; animation: spin 0.8s linear infinite; margin: 0 auto 16px; }
  @keyframes spin { to { transform: rotate(360deg); } }
  .ok { color: #16a34a; margin-top: 8px; }
  .error { color: #dc2626; margin-top: 8px; font-size: 14px; word-break: break-word; }
</style>
</head>
<body>
<div class="card">
  <div class="spinner" id="spinner"></div>
  <p id="message">Procesando autenticación…</p>
  <p class="ok" id="ok" style="display:none;">✓ Listo, puedes cerrar esta ventana.</p>
  <p class="error" id="error" style="display:none;"></p>
</div>
<script>
(function () {
  var provider = ${JSON.stringify(provider)};
  var payload = JSON.parse('${safePayload}');
  var error = ${errorMessage ? JSON.stringify(errorMessage) : 'null'};

  function showSuccess() {
    document.getElementById('spinner').style.display = 'none';
    document.getElementById('message').textContent = 'Autenticación exitosa';
    document.getElementById('ok').style.display = 'block';
  }
  function showError(msg) {
    document.getElementById('spinner').style.display = 'none';
    document.getElementById('message').textContent = 'Error de autenticación';
    var el = document.getElementById('error');
    el.textContent = msg || 'Error desconocido';
    el.style.display = 'block';
  }

  if (!window.opener) {
    showError('Esta URL solo es válida durante el flujo de autenticación del panel /admin.');
    return;
  }

  // El opener filtra mensajes por origin === base_url (este Worker).
  // Pero opener.origin puede ser https://www.mistervet.co o https://mistervet.co.
  // Enviamos a ambos orígenes para cubrir el caso.
  var openerOrigins = ['https://www.mistervet.co', 'https://mistervet.co'];

  // Paso 1: Enviar "authorizing:<provider>" al opener
  var handshakeMsg = 'authorizing:' + provider;
  openerOrigins.forEach(function (origin) {
    try { window.opener.postMessage(handshakeMsg, origin); } catch (e) {}
  });

  // Paso 2: Escuchar confirmación del opener, luego enviar el resultado.
  // Si la confirmación no llega en 5s, enviamos igual (algunas versiones de Decap CMS
  // no hacen el handshake bidireccional correctamente).
  var sent = false;
  function sendResult() {
    if (sent) return;
    sent = true;
    if (error) {
      var failMsg = 'authorization:' + provider + ':failure:' + JSON.stringify({ message: error });
      openerOrigins.forEach(function (origin) {
        try { window.opener.postMessage(failMsg, origin); } catch (e) {}
      });
      showError(error);
    } else {
      var successMsg = 'authorization:' + provider + ':success:' + JSON.stringify(payload);
      openerOrigins.forEach(function (origin) {
        try { window.opener.postMessage(successMsg, origin); } catch (e) {}
      });
      showSuccess();
    }
    setTimeout(function () { window.close(); }, 1500);
  }

  // Esperar confirmación "authorizing:<provider>" del opener
  window.addEventListener('message', function (event) {
    if (event.data === handshakeMsg) {
      sendResult();
    }
  });

  // Fallback: si no llega confirmación en 5s, enviar igual
  setTimeout(sendResult, 5000);
})();
</script>
</body>
</html>`;
}

export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    // ─── Ruta: /callback  (GitHub redirige aquí con ?code=xxx) ────────
    if (url.pathname === '/callback') {
      const code = url.searchParams.get('code');
      const error = url.searchParams.get('error');

      if (error) {
        const errorMessage = 'GitHub devolvió un error: ' + error;
        return new Response(
          handshakeHTML('github', {}, errorMessage),
          { headers: { 'Content-Type': 'text/html; charset=utf-8' } }
        );
      }

      if (!code) {
        return new Response(
          handshakeHTML('github', {}, 'Falta el parámetro code en la URL.'),
          { headers: { 'Content-Type': 'text/html; charset=utf-8' } }
        );
      }

      // Intercambiar el code por un access_token (server-side)
      const tokenResponse = await fetch(
        'https://github.com/login/oauth/access_token',
        {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            client_id: env.GITHUB_CLIENT_ID,
            client_secret: env.GITHUB_CLIENT_SECRET,
            code: code,
          }),
        }
      );

      const tokenData = await tokenResponse.json();

      if (tokenData.error) {
        const errorMessage = tokenData.error_description || tokenData.error;
        return new Response(
          handshakeHTML('github', {}, errorMessage),
          { headers: { 'Content-Type': 'text/html; charset=utf-8' } }
        );
      }

      if (!tokenData.access_token) {
        return new Response(
          handshakeHTML('github', {}, 'GitHub no devolvió un access_token válido.'),
          { headers: { 'Content-Type': 'text/html; charset=utf-8' } }
        );
      }

      // Éxito: devolver HTML con handshake que envía el token al opener
      const payload = {
        token: tokenData.access_token,
        provider: 'github',
      };
      return new Response(
        handshakeHTML('github', payload, null),
        { headers: { 'Content-Type': 'text/html; charset=utf-8' } }
      );
    }

    // ─── Ruta: /auth  (Decap CMS abre esto en un popup) ──────────────
    // Responde con 302 redirect a GitHub OAuth.
    if (url.pathname === '/auth') {
      const params = new URLSearchParams({
        client_id: env.GITHUB_CLIENT_ID,
        redirect_uri: `${url.origin}/callback`,
        scope: 'repo user',
        state: crypto.randomUUID(),
      });
      return Response.redirect(
        `https://github.com/login/oauth/authorize?${params.toString()}`,
        302
      );
    }

    // ─── Ruta: /  (health check) ──────────────────────────────────────
    if (url.pathname === '/' || url.pathname === '') {
      return new Response(
        JSON.stringify({
          ok: true,
          service: 'mistervet-cms-oauth',
          endpoints: {
            '/auth': 'Inicia el flujo OAuth de GitHub (Decap CMS abre esto en popup)',
            '/callback': 'GitHub redirige aquí con ?code=xxx; Worker intercambia por token y devuelve HTML con handshake',
          },
        }),
        { headers: { 'Content-Type': 'application/json' } }
      );
    }

    return new Response('Not Found', { status: 404 });
  },
};
