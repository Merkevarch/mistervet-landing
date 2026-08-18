/**
 * Cloudflare Worker — OAuth proxy para Decap CMS.
 *
 * Permite que Decap CMS autentique usuarios con GitHub sin exponer el
 * CLIENT_SECRET en el navegador.
 *
 * IMPORTANTE: Decap CMS espera que la página de callback envíe un
 * postMessage con un STRING en formato específico:
 *
 *   'authorization:github:success:{"token":"ACCESS_TOKEN","provider":"github"}'
 *
 * o para errores:
 *
 *   'authorization:github:failure:ERROR_MESSAGE'
 *
 * Si se envía un objeto, Decap CMS lo ignora y el popup queda colgado
 * con el spinner "Autenticando…" indefinidamente.
 *
 * Variables de entorno (definir con `wrangler secret put`):
 *   - GITHUB_CLIENT_ID     — Client ID de la OAuth App en GitHub
 *   - GITHUB_CLIENT_SECRET — Client Secret de la OAuth App en GitHub
 */

function buildHtmlResponse(status, payload, allowedOrigins) {
  // Construir el mensaje en el formato que Decap CMS espera:
  // 'authorization:github:success:{"token":"...","provider":"github"}'
  // o 'authorization:github:failure:<error_message>'
  let messageStr;
  let displayMessage;

  if (status === 'success' && payload.access_token) {
    const decapPayload = {
      token: payload.access_token,
      provider: 'github',
    };
    messageStr = 'authorization:github:success:' + JSON.stringify(decapPayload);
    displayMessage = 'Autenticación exitosa';
  } else if (status === 'success') {
    // GitHub respondió pero sin access_token — algo raro
    messageStr = 'authorization:github:failure:No se recibió access_token de GitHub';
    displayMessage = 'Error: GitHub no devolvió un token válido';
    status = 'error';
  } else {
    // Error explícito
    const errorMsg = typeof payload === 'string' ? payload : JSON.stringify(payload);
    messageStr = 'authorization:github:failure:' + errorMsg;
    displayMessage = 'Error de autenticación: ' + errorMsg;
  }

  const originsJsArray = JSON.stringify(allowedOrigins);
  // Escapar el mensaje string para embeber en JS de forma segura
  const messageStrEscaped = JSON.stringify(messageStr);

  const isSuccess = status !== 'error';

  return new Response(
    `<!doctype html>
<html>
  <head>
    <meta charset="utf-8" />
    <title>Autenticando con GitHub…</title>
    <style>
      body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background: #f8fafc; color: #475569; display: flex; align-items: center; justify-content: center; min-height: 100vh; margin: 0; }
      .card { text-align: center; padding: 32px; background: white; border-radius: 12px; box-shadow: 0 4px 12px rgba(0,0,0,0.05); max-width: 420px; }
      .spinner { width: 32px; height: 32px; border: 3px solid #e2e8f0; border-top-color: #163E8D; border-radius: 50%; animation: spin 0.8s linear infinite; margin: 0 auto 16px; }
      @keyframes spin { to { transform: rotate(360deg); } }
      .error { color: #dc2626; margin-top: 8px; font-size: 14px; word-break: break-word; }
      .ok { color: #16a34a; margin-top: 8px; }
    </style>
  </head>
  <body>
    <div class="card">
      <div class="spinner" id="spinner"></div>
      <p id="message">${isSuccess ? 'Autenticando…' : 'Error'}</p>
      <p class="${isSuccess ? 'ok' : 'error'}" id="detail" style="display:none;"></p>
      <p style="margin-top:16px;font-size:12px;color:#94a3b8;" id="hint"></p>
    </div>
    <script>
      (function() {
        // Mensaje que Decap CMS espera (string con formato específico)
        var message = ${messageStrEscaped};
        var allowedOrigins = ${originsJsArray};

        function showResult(success, detail, hint) {
          document.getElementById('spinner').style.display = 'none';
          document.getElementById('message').textContent = success ? 'Autenticación exitosa' : 'Error de autenticación';
          var detailEl = document.getElementById('detail');
          detailEl.textContent = detail || '';
          detailEl.style.display = detail ? 'block' : 'none';
          if (hint) {
            document.getElementById('hint').textContent = hint;
          }
        }

        if (window.opener) {
          // Decap CMS abrió esta ventana via window.open()
          // Validamos que el opener sea de un origen permitido
          var openerOrigin;
          try {
            openerOrigin = window.opener.location.origin;
          } catch (e) {
            // Cross-origin: no podemos leer location.origin del opener
            // Esto NO debería pasar en nuestro flujo, pero por si acaso
            openerOrigin = null;
          }

          if (!openerOrigin || !allowedOrigins.includes(openerOrigin)) {
            // Si no podemos leer el origin (cross-origin) o no está permitido,
            // intentamos postMessage a '*' (menos seguro pero necesario en algunos casos)
            // Mejor: intentamos con el primer origen permitido (producción)
            window.opener.postMessage(message, allowedOrigins[0]);
            showResult(true, 'Autenticación exitosa. Cerrando ventana…', '');
            setTimeout(function() { window.close(); }, 1500);
            return;
          }

          // Origen válido — enviar el mensaje al origin exacto del opener
          window.opener.postMessage(message, openerOrigin);

          if (${isSuccess ? 'true' : 'false'}) {
            showResult(true, 'Autenticación exitosa. Cerrando ventana…', '');
            setTimeout(function() { window.close(); }, 1500);
          } else {
            var errorMsg = ${JSON.stringify(displayMessage)};
            showResult(false, errorMsg, 'Cierra esta ventana e intenta de nuevo desde /admin');
          }
        } else {
          // Acceso directo a /callback sin opener
          showResult(false, 'Esta URL solo es válida durante el flujo de autenticación del panel /admin.', 'Abre https://www.mistervet.co/admin para iniciar sesión.');
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

function getAllowedOrigins(env) {
  const origins = [
    'https://www.mistervet.co',
    'https://mistervet.co',
    'http://localhost:5173',
    'http://localhost:4173',
  ];
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

    return new Response('Not Found', { status: 404 });
  },
};
