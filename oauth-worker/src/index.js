/**
 * Cloudflare Worker — OAuth proxy para Decap CMS.
 *
 * Permite que Decap CMS autentique usuarios con GitHub sin exponer el
 * CLIENT_SECRET en el navegador. El flujo es:
 *
 *   1. Decap CMS abre https://github.com/login/oauth/authorize?client_id=...
 *      con redirect_uri = <este worker>/callback
 *   2. GitHub redirige al usuario a <este worker>/callback?code=xxx
 *   3. Este Worker intercambia el `code` por un `access_token` llamando
 *      a https://github.com/login/oauth/access_token con el CLIENT_SECRET
 *   4. El Worker responde con una página HTML que hace postMessage al
 *      opener (Decap CMS), pasándole el access_token.
 *
 * Variables de entorno (definir con `wrangler secret put`):
 *   - GITHUB_CLIENT_ID     — Client ID de la OAuth App en GitHub
 *   - GITHUB_CLIENT_SECRET — Client Secret de la OAuth App en GitHub
 *
 * Deploy:
 *   cd oauth-worker
 *   wrangler secret put GITHUB_CLIENT_ID
 *   wrangler secret put GITHUB_CLIENT_SECRET
 *   wrangler deploy
 *
 * Ver docs/ADMIN_SETUP.md para la guía paso a paso completa.
 */

function buildHtmlResponse(status, payload, allowedOrigins) {
  const isSuccess = status === 'success';
  const data = isSuccess
    ? JSON.stringify(payload)
    : JSON.stringify({ error: payload });

  // Lista de orígenes permitidos como array literal para el script
  const originsJsArray = JSON.stringify(allowedOrigins);

  return new Response(
    `<!doctype html>
<html>
  <head>
    <meta charset="utf-8" />
    <title>Autenticando con GitHub…</title>
    <style>
      body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background: #f8fafc; color: #475569; display: flex; align-items: center; justify-content: center; min-height: 100vh; margin: 0; }
      .card { text-align: center; padding: 32px; background: white; border-radius: 12px; box-shadow: 0 4px 12px rgba(0,0,0,0.05); max-width: 400px; }
      .spinner { width: 32px; height: 32px; border: 3px solid #e2e8f0; border-top-color: #163E8D; border-radius: 50%; animation: spin 0.8s linear infinite; margin: 0 auto 16px; }
      @keyframes spin { to { transform: rotate(360deg); } }
      .error { color: #dc2626; }
      .ok { color: #16a34a; }
    </style>
  </head>
  <body>
    <div class="card">
      <div class="spinner" id="spinner"></div>
      <p id="message">${isSuccess ? 'Autenticando…' : 'Error de autenticación'}</p>
      <p class="error" id="error"></p>
      <p class="ok" id="ok" style="display:none;">✓ Listo, puedes cerrar esta ventana.</p>
    </div>
    <script>
      (function() {
        const data = ${data};
        const allowedOrigins = ${originsJsArray};
        const status = '${status}';

        function showError(msg) {
          document.getElementById('spinner').style.display = 'none';
          document.getElementById('message').textContent = 'Error';
          document.getElementById('error').textContent = msg;
        }

        function showSuccess() {
          document.getElementById('spinner').style.display = 'none';
          document.getElementById('message').textContent = 'Autenticación exitosa';
          document.getElementById('ok').style.display = 'block';
        }

        if (window.opener) {
          // Decap CMS abre esta ventana via window.open()
          // Intentamos postMessage al origen del opener si está permitido
          const openerOrigin = window.opener.location.origin;
          if (!allowedOrigins.includes(openerOrigin)) {
            showError('Origen no permitido: ' + openerOrigin);
            return;
          }
          window.opener.postMessage(
            { status: status, data: data, provider: 'github' },
            openerOrigin
          );
          if (status === 'success') {
            showSuccess();
            setTimeout(() => window.close(), 1500);
          } else {
            showError(typeof data === 'object' ? (data.error || 'Error desconocido') : data);
          }
        } else {
          // Acceso directo a la URL del callback (sin opener)
          showError('Esta URL solo es válida durante el flujo de autenticación del panel /admin.');
        }
      })();
    </script>
  </body>
</html>`,
    {
      headers: {
        'Content-Type': 'text/html; charset=utf-8',
        'X-Content-Type-Options': 'nosniff',
      },
    }
  );
}

// Devuelve los orígenes permitidos para postMessage.
// Por seguridad, restringimos solo al dominio de producción y localhost.
function getAllowedOrigins(env) {
  const origins = [
    'https://www.mistervet.co',
    'https://mistervet.co',
    'http://localhost:5173',
    'http://localhost:4173',
  ];
  // Permitir override vía variable de entorno para previews / staging
  if (env.CMS_ORIGIN) {
    if (Array.isArray(env.CMS_ORIGIN)) {
      origins.push(...env.CMS_ORIGIN);
    } else {
      origins.push(env.CMS_ORIGIN);
    }
  }
  return origins;
}

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const allowedOrigins = getAllowedOrigins(env);

    // ─── Ruta: /callback  (GitHub redirige aquí con ?code=xxx) ────────
    if (url.pathname === '/callback') {
      const code = url.searchParams.get('code');
      const error = url.searchParams.get('error');

      if (error) {
        return buildHtmlResponse('error', `GitHub devolvió un error: ${error}`, allowedOrigins);
      }
      if (!code) {
        return buildHtmlResponse('error', 'Falta el parámetro code en la URL.', allowedOrigins);
      }

      // Intercambiar el code por un access_token
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
        return buildHtmlResponse(
          'error',
          tokenData.error_description || tokenData.error,
          allowedOrigins
        );
      }

      return buildHtmlResponse('success', tokenData, allowedOrigins);
    }

    // ─── Ruta: /auth  (redirige al usuario a GitHub OAuth) ───────────
    // Útil para testing manual — abre /auth en el navegador.
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
          allowed_origins: allowedOrigins,
          endpoints: {
            '/auth': 'Inicia el flujo OAuth de GitHub',
            '/callback': 'Callback que GitHub invoca con ?code=xxx',
          },
        }),
        { headers: { 'Content-Type': 'application/json' } }
      );
    }

    // ─── 404 para cualquier otra ruta ────────────────────────────────
    return new Response('Not Found', { status: 404 });
  },
};
