/**
 * Cloudflare Worker — OAuth proxy para el panel admin de MisterVet.
 *
 * Flujos:
 *   1. /auth     — el panel (/admin/) abre popup a esta URL
 *                  → Worker responde con 302 a GitHub OAuth
 *   2. /callback — GitHub redirige aquí con ?code=xxx
 *                  → Worker intercambia code por token server-side
 *                  → Worker responde con 302 a
 *                    https://www.mistervet.co/admin/callback.html#token=xxx
 *   3. callback.html (en el sitio, mismo origen con /admin/) guarda el
 *      token en sessionStorage y hace postMessage al opener.
 *
 * Variables de entorno (definir con `wrangler secret put`):
 *   - GITHUB_CLIENT_ID     — Client ID de la OAuth App en GitHub
 *   - GITHUB_CLIENT_SECRET — Client Secret de la OAuth App en GitHub
 *
 * IMPORTANTE — OAuth App en GitHub:
 *   La 'Authorization callback URL' debe ser:
 *     https://mistervet-cms-oauth.rubenfchavez.workers.dev/callback
 */

const SITE_CALLBACK_URL = 'https://www.mistervet.co/admin/callback.html';

export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    // ─── Ruta: /callback  (GitHub redirige aquí con ?code=xxx) ────────
    if (url.pathname === '/callback') {
      const code = url.searchParams.get('code');
      const error = url.searchParams.get('error');

      if (error) {
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

      // Intercambiar el code por un access_token (server-side, sin exponer Client Secret)
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
      return new Response(
        JSON.stringify({
          ok: true,
          service: 'mistervet-cms-oauth',
          endpoints: {
            '/auth': 'Inicia el flujo OAuth de GitHub (panel admin abre esto en popup)',
            '/callback': 'GitHub redirige aquí con ?code=xxx; Worker intercambia por token y redirige a /admin/callback.html',
          },
        }),
        { headers: { 'Content-Type': 'application/json' } }
      );
    }

    return new Response('Not Found', { status: 404 });
  },
};
