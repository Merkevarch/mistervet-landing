/**
 * Cloudflare Worker — OAuth proxy para Decap CMS.
 *
 * Permite que Decap CMS autentique usuarios con GitHub sin exponer el
 * CLIENT_SECRET en el navegador.
 *
 * FLUJO:
 *   1. Decap CMS (en www.mistervet.co/admin/) abre popup a
 *      ${base_url}/auth?provider=github&scope=repo&site_id=...
 *   2. Worker /auth responde con 302 redirect a GitHub OAuth
 *   3. Usuario autoriza en GitHub
 *   4. GitHub redirige el popup a ${base_url}/callback?code=xxx
 *   5. Worker /callback intercambia el code por un access_token (server-side,
 *      sin exponer el Client Secret)
 *   6. Worker responde con 302 redirect a
 *      https://www.mistervet.co/admin/callback.html#status=success&token=xxx&provider=github
 *   7. El popup navega al callback.html (mismo origen que /admin/)
 *   8. callback.html accede a window.opener (same-origin, sin restricciones)
 *      y envía postMessage al opener con el token
 *   9. Decap CMS recibe el token y carga el panel
 *
 * El paso 6 (redirigir de vuelta al dominio principal) es CRÍTICO para
 * navegadores como Brave que bloquean window.opener en popups cross-origin.
 * Al navegar el popup a una página same-origin con el opener, se restaura
 * el acceso a window.opener.
 *
 * Variables de entorno (definir con `wrangler secret put`):
 *   - GITHUB_CLIENT_ID     — Client ID de la OAuth App en GitHub
 *   - GITHUB_CLIENT_SECRET — Client Secret de la OAuth App en GitHub
 */

// URL del callback.html en el dominio principal (same-origin con /admin/)
// El Worker redirige aquí tras intercambiar el code por un token.
const SITE_CALLBACK_URL = 'https://www.mistervet.co/admin/callback.html';

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

    // ─── Ruta: /callback  (GitHub redirige aquí con ?code=xxx) ────────
    if (url.pathname === '/callback') {
      const code = url.searchParams.get('code');
      const error = url.searchParams.get('error');

      if (error) {
        // Redirigir al callback.html con el error en el hash
        const params = new URLSearchParams({
          status: 'failure',
          error: 'GitHub devolvió un error: ' + error,
          provider: 'github',
        });
        return Response.redirect(
          `${SITE_CALLBACK_URL}#${params.toString()}`,
          302
        );
      }

      if (!code) {
        const params = new URLSearchParams({
          status: 'failure',
          error: 'Falta el parámetro code en la URL.',
          provider: 'github',
        });
        return Response.redirect(
          `${SITE_CALLBACK_URL}#${params.toString()}`,
          302
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
        const params = new URLSearchParams({
          status: 'failure',
          error: tokenData.error_description || tokenData.error,
          provider: 'github',
        });
        return Response.redirect(
          `${SITE_CALLBACK_URL}#${params.toString()}`,
          302
        );
      }

      if (!tokenData.access_token) {
        const params = new URLSearchParams({
          status: 'failure',
          error: 'GitHub no devolvió un access_token válido.',
          provider: 'github',
        });
        return Response.redirect(
          `${SITE_CALLBACK_URL}#${params.toString()}`,
          302
        );
      }

      // Éxito: redirigir al callback.html con el token en el hash
      // (no en el query string, así no llega a logs del servidor)
      const params = new URLSearchParams({
        status: 'success',
        token: tokenData.access_token,
        provider: 'github',
      });
      return Response.redirect(
        `${SITE_CALLBACK_URL}#${params.toString()}`,
        302
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
      const allowedOrigins = getAllowedOrigins(env);
      return new Response(
        JSON.stringify({
          ok: true,
          service: 'mistervet-cms-oauth',
          allowed_origins: allowedOrigins,
          site_callback_url: SITE_CALLBACK_URL,
          endpoints: {
            '/auth': 'Inicia el flujo OAuth de GitHub (Decap CMS abre esto en popup)',
            '/callback': 'GitHub redirige aquí con ?code=xxx, Worker intercambia por token y redirige a site_callback_url',
          },
        }),
        { headers: { 'Content-Type': 'application/json' } }
      );
    }

    return new Response('Not Found', { status: 404 });
  },
};
