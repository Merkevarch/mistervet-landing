# Panel de Administración del Blog (/admin)

Panel custom construido con vanilla JS que permite crear, editar y eliminar
artículos del blog sin tocar código ni recurrir a un agente.

## 🎯 Qué es y cómo funciona

El panel vive en **<https://www.mistervet.co/admin>** y está construido
con **vanilla JS** (sin framework, sin dependencias externas). Usa:

- **Cloudflare Worker OAuth proxy** para autenticar usuarios con GitHub sin
  exponer el Client Secret en el navegador.
- **GitHub REST API** directamente (con el token) para CRUD de archivos `.md`
  en `src/posts/`.

Flujo:

1. Entras a <https://www.mistervet.co/admin>
2. Click en "Iniciar sesión con GitHub"
3. Se abre un popup al Worker (`/auth`)
4. El Worker redirige el popup a GitHub OAuth
5. Usuario autoriza en GitHub
6. GitHub redirige el popup al Worker (`/callback?code=xxx`)
7. El Worker intercambia el code por access_token server-side (Client Secret seguro)
8. El Worker redirige el popup a `https://www.mistervet.co/admin/callback.html#token=xxx`
9. `callback.html` guarda el token en `localStorage` y hace `postMessage` al opener
10. El panel carga la lista de artículos desde la API de GitHub
11. Creas/editas/eliminas artículos — cada acción hace commit directo a `master`
12. Tu CI/CD (`.github/workflows/deploy.yml`) detecta el push, reconstruye y deploya

**No necesitas base de datos**: GitHub es el backend, la autenticación es vía
OAuth con Worker proxy (Client Secret seguro en el Worker).

## 🚧 Setup inicial (una sola vez)

### Paso 1: GitHub OAuth App

1. Ve a <https://github.com/settings/developers>
2. Edita (o crea) la OAuth App "MisterVet CMS"
3. Completa:
   - **Application name:** `MisterVet CMS`
   - **Homepage URL:** `https://www.mistervet.co`
   - **Authorization callback URL:** `https://mistervet-cms-oauth.rubenfchavez.workers.dev/callback`
     - ⚠️ Debe ser EXACTAMENTE esa URL — la callback del Worker.
4. Anota el **Client ID** y genera un **Client Secret**

### Paso 2: Configurar secrets en el Worker

```bash
cd oauth-worker
npx wrangler secret put GITHUB_CLIENT_ID
# Pega el Client ID

npx wrangler secret put GITHUB_CLIENT_SECRET
# Pega el Client Secret
```

Verifica que el Worker esté funcionando:

```bash
curl https://mistervet-cms-oauth.rubenfchavez.workers.dev/
# Debe responder: {"ok":true,"service":"mistervet-cms-oauth",...}
```

### Paso 3: Deployar el Worker (si se modificó)

Si hiciste cambios al código del Worker (`oauth-worker/src/index.js`):

```bash
cd oauth-worker
npx wrangler deploy
```

### Paso 4: Probar el panel

1. Ve a <https://www.mistervet.co/admin>
2. Click en "Iniciar sesión con GitHub"
3. Autoriza la OAuth App en GitHub
4. El popup se cierra solo y el panel carga la lista de artículos

¡Listo! Ya puedes crear, editar y eliminar artículos.

## 📝 Uso diario del panel

### Acceder

1. Ve a <https://www.mistervet.co/admin>
2. Click en "Iniciar sesión con GitHub"
3. (Solo la primera vez) Autoriza la OAuth App
4. Verás la lista de artículos actuales

### Crear un artículo nuevo

1. Click en "+ Nuevo artículo"
2. Completa los campos:
   - **Título** — se usará como H1 y como slug del archivo
   - **Fecha de publicación** — afecta el orden del blog
   - **Categoría** — Mascotas / Ganadería / General
   - **Autor** — por defecto "MisterVet"
   - **Resumen (excerpt)** — 1-3 frases, se usa en el listado y como meta description SEO
   - **Contenido** — el cuerpo del artículo en Markdown
3. Click en "Publicar"
4. El panel hace commit a `master` → GitHub Actions rebuild → deploy automático
5. En ~2-3 min el artículo está en <https://www.mistervet.co/blog>

### Editar un artículo existente

1. Click en "Editar" en el card del artículo
2. Modifica los campos necesarios
3. Click en "Guardar" (commit directo a master)

### Eliminar un artículo

1. Click en "Eliminar" en el card del artículo
2. Confirma — el panel hace commit eliminando el archivo `.md`

### ⚠️ Importante sobre el contenido Markdown

- **NO escribas `# Título` al inicio del cuerpo** — el sistema ya muestra el título como H1
  desde el frontmatter. Si lo añades, tendrás 2 H1 (mal para SEO).
- Usa `##` para subtítulos de sección
- Usa `###` para sub-subtítulos
- Tablas, listas, imágenes y enlaces funcionan normalmente en Markdown

## 🔧 Arquitectura técnica

```
Navegador:
  /admin/             → panel SPA (vanilla JS, sin framework)
  /admin/callback.html → recibe token en hash, guarda en localStorage,
                         postMessage al opener, cierra popup

Cloudflare Worker (mistervet-cms-oauth):
  /auth              → 302 redirect a https://github.com/login/oauth/authorize?client_id=...
  /callback          → recibe ?code=xxx de GitHub, intercambia por access_token
                       server-side (usando Client Secret), 302 redirect a
                       /admin/callback.html#token=xxx

GitHub:
  OAuth App                       → emite el code que el Worker intercambia por access_token
  Authorization callback URL      → https://mistervet-cms-oauth.rubenfchavez.workers.dev/callback
  API (api.github.com/repos/...)  → el panel la usa con el access_token para CRUD de archivos

Cloudflare Pages:
  Sirve /admin/index.html y /admin/callback.html como archivos estáticos
  Recibe commits del panel en master → CI/CD → redeploy automático
```

### ¿Por qué un panel custom?

Antes se usaba **Decap CMS** (antes Netlify CMS) con el flujo `implicit` +
Worker OAuth. El problema: el handshake `postMessage` entre el popup
(en el Worker) y el opener (en www.mistervet.co) fallaba porque el popup
navegó cross-origin varias veces (Worker → GitHub → Worker), y los
navegadores modernos restringen `window.opener` en esa situación.
El resultado era un spinner infinito en el login.

También se intentó migrar a **PKCE**, pero el backend `github` de Decap CMS
**no soporta PKCE nativamente** (el componente `GitHubAuthenticationPage`
siempre usa `NetlifyAuthenticator` sin importar `auth_type`). El código
fuente de Decap CMS 3.15.1 lo confirma.

Se evaluó **Sveltia CMS** como drop-in replacement, pero tiene el mismo
problema fundamental: requiere que el popup vuelva al mismo origen que el
opener, lo que no es posible sin un Worker que redirija de vuelta al sitio
con el token (que es justo lo que hace este panel custom, pero sin el
overhead de un CMS externo).

La solución final es un panel custom simple con vanilla JS que:
- Usa el Worker OAuth para autenticar (mismo que antes)
- Redirige el popup al sitio (mismo origen) con el token en el hash
- Usa la API de GitHub directamente para CRUD de archivos

Esto elimina toda la complejidad del handshake entre Decap CMS y el Worker,
y da control total sobre el flujo.

## 🛠️ Mantenimiento

### Cambiar el Client ID o Client Secret

1. Ve a <https://github.com/settings/developers> → MisterVet CMS
2. Genera un nuevo Client Secret si lo rotas
3. Actualiza los secrets del Worker:
   ```bash
   cd oauth-worker
   npx wrangler secret put GITHUB_CLIENT_ID
   npx wrangler secret put GITHUB_CLIENT_SECRET
   ```

### Permitir más usuarios editores

Cualquier usuario con acceso de escritura al repo `Merkevarch/mistervet-landing`
podrá editar el blog desde `/admin` tras autenticarse con su cuenta de GitHub.

Para añadir un colaborador:

1. Ve a <https://github.com/Merkevarch/mistervet-landing/settings/access>
2. Click en **"Add people"**
3. Invita por username o email
4. Asigna el rol **"Write"** (suficiente para editar vía el panel)

### Debugging

- **No carga el panel:** verifica que `dist/admin/index.html` y
  `dist/admin/callback.html` existen después del build.
- **Login no redirige a GitHub:** verifica que el Worker esté arriba:
  `curl https://mistervet-cms-oauth.rubenfchavez.workers.dev/`
- **"Invalid redirect_uri":** la callback URL en la GitHub OAuth App debe ser
  EXACTAMENTE `https://mistervet-cms-oauth.rubenfchavez.workers.dev/callback`.
- **"Token inválido o expirado":** el token no funciona con la API de GitHub.
  Verifica que los secrets del Worker sean correctos. Cierra sesión y vuelve
  a iniciar.
- **Popup en blanco:** el navegador bloqueó el popup. Permite popups para
  `www.mistervet.co` e intenta de nuevo.
- **No aparecen artículos:** verifica que los archivos `.md` estén en
  `src/posts/` con el frontmatter correcto.
- **No puedo publicar:** verifica que tu usuario de GitHub tenga permisos de
  escritura en el repo.
- **Error en la consola del navegador:** abre DevTools (F12) → pestaña Console
  para ver errores específicos del panel.

## 🔒 Seguridad

- **Client Secret nunca llega al navegador.** Se queda en el Worker (Cloudflare secret).
- **Client ID es público** y va en el Worker — esto es por diseño, es seguro.
- El token se guarda en `localStorage` del navegador (persiste entre sesiones).
  Para mayor seguridad, se puede cambiar a `sessionStorage` (se borra al cerrar
  el navegador) editando `setToken(token, true)` → `setToken(token, false)` en
  `public/admin/index.html`.
- El `state` que el Worker genera aleatoriamente previene CSRF.
- `/admin/` y `/admin/callback.html` tienen `meta robots noindex, nofollow`.
- `robots.txt` hace `Disallow: /admin`.
- Solo usuarios con **write access** al repo pueden editar (GitHub API valida).

## ❓ Preguntas frecuentes

### ¿Puedo usar el panel localmente?

Sí. Tras `npm run dev`, abre <http://localhost:5173/admin>. Necesitarás:

1. Que el Worker OAuth permita redirigir a localhost. Edita
   `SITE_CALLBACK_URL` en `oauth-worker/src/index.js` temporalmente, o
   crea un Worker de desarrollo.
2. Añadir `http://localhost:5173/admin/callback.html` como callback URL
   adicional en la OAuth App.
3. Deployar el Worker modificado.

### ¿Qué pasa si hago un commit directo a master (sin usar el panel)?

Funciona igual. El panel es solo una interfaz que hace commits a master.
Puedes alternar entre usar el panel y editar archivos `.md` directamente.

### ¿Puedo programar publicaciones para el futuro?

El panel no tiene scheduled publishing. Pero puedes:

- Crear el artículo y guardar el archivo con fecha futura — el
  `postsLoader.ts` ordena por fecha, así que el artículo aparecerá en el
  listado pero podrías modificarlo para que filtre por fecha si quieres
  scheduling real.

### ¿Puedo subir imágenes desde el panel?

Actualmente no. El panel solo soporta texto Markdown. Para imágenes:

- Sube la imagen directamente al repo en `public/blog/`
- O añade la funcionalidad al panel (ampliar el editor para soportar
  upload via GitHub API `PUT /repos/.../contents/public/blog/...`)

### ¿Cómo añado una nueva categoría?

Edita:

1. `public/admin/index.html` → campo `category` del editor (agregar `<option>`)
2. `src/pages/BlogPage.tsx` → objeto `categoryColors` (agregar color)
3. `src/pages/BlogPost.tsx` → objeto `categoryColors` (agregar color)
4. CSS en `public/admin/index.html` → agregar clase `.badge-NuevaCategoría`

### ¿Cómo cambio el alcance de permisos?

Por defecto pedimos `scope: repo user`. Si quieres menos permisos (por ejemplo,
solo `public_repo`), edita `oauth-worker/src/index.js` → endpoint `/auth`:

```js
scope: 'public_repo',  // en lugar de 'repo user'
```

Y redeploya el Worker.
