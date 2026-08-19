# Panel de Administración del Blog (/admin)

Este documento explica cómo configurar y usar el panel de administración del blog,
que permite crear, editar y eliminar artículos sin tocar código ni recurrir a un agente.

## 🎯 Qué es y cómo funciona

El panel vive en **<https://www.mistervet.co/admin>** y está construido con
[Decap CMS](https://decapcms.org/) (antes Netlify CMS).

Flujo:

1. Entras a <https://www.mistervet.co/admin>
2. Inicias sesión con tu cuenta de GitHub (`Merkevarch`)
3. Decap CMS lista los artículos actuales (leídos desde `src/posts/*.md`)
4. Creas/editas/eliminas artículos desde el editor visual
5. Al guardar, Decap CMS hace commit a `master` en GitHub
6. Tu CI/CD actual (`.github/workflows/deploy.yml`) detecta el push, reconstruye el sitio y lo deploya en Cloudflare Pages
7. El artículo queda publicado en producción en ~2-3 minutos

**No necesitas base de datos**: GitHub es el backend, y la autenticación
es vía OAuth con un Cloudflare Worker que actúa como proxy (para no exponer
el Client Secret en el navegador).

## 🚧 Setup inicial (una sola vez)

### Paso 1: Crear la GitHub OAuth App

1. Ve a <https://github.com/settings/developers>
2. Click en **"New OAuth App"** (o edita la existente "MisterVet CMS")
3. Completa:
   - **Application name:** `MisterVet CMS`
   - **Homepage URL:** `https://www.mistervet.co`
   - **Authorization callback URL:** `https://mistervet-cms-oauth.rubenfchavez.workers.dev/callback`
     - ⚠️ **Importante:** debe ser EXACTAMENTE esa URL — la callback del Worker,
       no la del sitio www.mistervet.co. El Worker recibe el code de GitHub,
       lo intercambia por un access_token server-side, y devuelve una página
       HTML que hace postMessage al opener con el token.
4. Click en **"Register application"**
5. Anota el **Client ID** (visible en la página de la app)
6. Genera un **Client Secret** (botón "Generate a new client secret") — el
   flujo `implicit` con Worker OAuth SÍ requiere Client Secret, porque el
   Worker lo usa server-side para intercambiar el code por token.

### Paso 2: Configurar secrets en el Worker

El Worker (`oauth-worker/`) necesita dos secrets definidos en Cloudflare:

```bash
cd oauth-worker
npx wrangler secret put GITHUB_CLIENT_ID
# Pega el Client ID de la OAuth App

npx wrangler secret put GITHUB_CLIENT_SECRET
# Pega el Client Secret de la OAuth App
```

Verifica que el Worker esté funcionando:

```bash
curl https://mistervet-cms-oauth.rubenfchavez.workers.dev/
# Debe responder: {"ok":true,"service":"mistervet-cms-oauth",...}
```

### Paso 3: Verificar `public/admin/config.yml`

El archivo ya viene configurado. Solo verifica que apunte al Worker correcto:

```yaml
backend:
  name: github
  repo: Merkevarch/mistervet-landing
  branch: master
  auth_type: implicit
  base_url: https://mistervet-cms-oauth.rubenfchavez.workers.dev
  auth_endpoint: /auth
```

### Paso 4: Deployar cambios del Worker (si se modificó)

Si hiciste cambios al código del Worker (`oauth-worker/src/index.js`):

```bash
cd oauth-worker
npx wrangler deploy
```

### Paso 5: Probar el panel

1. Ve a <https://www.mistervet.co/admin>
2. Click en **"Login with GitHub"**
3. Se abre un popup → GitHub pide "Authorize MisterVet CMS" → **Authorize**
4. GitHub redirige el popup al Worker (`/callback?code=xxx`)
5. El Worker intercambia el code por token y devuelve HTML con handshake
6. El popup se cierra solo y Decap CMS carga la lista de artículos

¡Listo! Ya puedes crear, editar y eliminar artículos.

## 📝 Uso diario del panel

### Acceder

1. Ve a <https://www.mistervet.co/admin>
2. Click en **"Login with GitHub"**
3. (Solo la primera vez) Autoriza la OAuth App
4. Verás la lista de artículos actuales

### Crear un artículo nuevo

1. Click en **"New Artículo"** (botón verde arriba a la derecha)
2. Completa los campos:
   - **Título** — se usará como H1 y como slug del archivo
   - **Fecha de publicación** — afecta el orden del blog
   - **Categoría** — Mascotas / Ganadería / General
   - **Autor** — por defecto "MisterVet"
   - **Resumen (excerpt)** — 1-3 frases, se usa en el listado y como meta description SEO
   - **Contenido** — el cuerpo del artículo en Markdown
3. Click en **"Publish"**
4. Decap CMS hace commit a `master` → GitHub Actions rebuild → deploy automático
5. En ~2-3 min el artículo está en <https://www.mistervet.co/blog>

### Editar un artículo existente

1. Click en el artículo desde la lista
2. Modifica los campos necesarios
3. Click en **"Publish"** (commit directo a master)

### Eliminar un artículo

1. Click en el artículo desde la lista
2. Click en **"Delete entry"** (botón rojo arriba a la derecha)
3. Confirma — Decap CMS hace commit eliminando el archivo `.md`

### ⚠️ Importante sobre el contenido Markdown

- **NO escribas `# Título` al inicio del cuerpo** — el sistema ya muestra el título como H1
  desde el frontmatter. Si lo añades, tendrás 2 H1 (mal para SEO).
- Usa `##` para subtítulos de sección
- Usa `###` para sub-subtítulos
- Tablas, listas, imágenes y enlaces funcionan normalmente en Markdown

## 🔧 Arquitectura técnica

```
Navegador:
  /admin         → carga Decap CMS desde unpkg CDN (versión 3.15.1)
                   construye popup URL: ${base_url}${auth_endpoint}?provider=github&site_id=...

Cloudflare Worker (mistervet-cms-oauth):
  /auth          → 302 redirect a https://github.com/login/oauth/authorize?client_id=...
  /callback      → recibe ?code=xxx de GitHub, intercambia por access_token
                   server-side (usando Client Secret), devuelve HTML con handshake
                   postMessage al opener con el token.

GitHub:
  OAuth App                   → emite el code que el Worker intercambia por access_token
  Authorization callback URL → https://mistervet-cms-oauth.rubenfchavez.workers.dev/callback
  API                         → Decap CMS la usa con el access_token para CRUD de archivos

Cloudflare Pages:
  Sirve /admin/index.html y /admin/config.yml como archivos estáticos
  Recibe commits de Decap CMS en master → CI/CD → redeploy automático
```

### ¿Por qué no usar auth_type: pkce?

Decap CMS 3.15.1 **no soporta PKCE para el backend de GitHub**. El componente
`GitHubAuthenticationPage` siempre instancia `NetlifyAuthenticator` sin importar
el valor de `auth_type`. Esto significa que si configuras `auth_type: pkce` con
solo `app_id`, Decap CMS cae al fallback `https://api.netlify.com/auth` →
"not found" porque no estás en Netlify.

La solución es usar `auth_type: implicit` con un OAuth proxy (el Worker) que
imita el comportamiento de Netlify Identity. Esto requiere Client Secret
(manejado server-side en el Worker, nunca expuesto al navegador).

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
4. Asigna el rol **"Write"** (suficiente para editar vía Decap CMS)

### Debugging

- **No carga el panel:** verifica que `dist/admin/index.html` y `dist/admin/config.yml`
  existen después del build.
- **Login va a api.netlify.com/auth:** el `config.yml` no tiene `base_url` o
  `auth_endpoint` apuntando al Worker. Verifica que ambos campos estén presentes.
- **"Invalid redirect_uri":** verifica que la callback URL en la GitHub OAuth App sea
  EXACTAMENTE `https://mistervet-cms-oauth.rubenfchavez.workers.dev/callback`.
- **Popup muestra error del Worker:** revisa los logs del Worker con
  `npx wrangler tail` para ver qué falló al intercambiar el code por token.
- **No aparecen artículos:** verifica que los archivos `.md` estén en `src/posts/` con
  el frontmatter correcto.
- **No puedo publicar:** verifica que tu usuario de GitHub tenga permisos de escritura
  en el repo.

## 🔒 Seguridad

- **Client Secret nunca llega al navegador.** Se queda en el Worker (Cloudflare secret).
- **Client ID SÍ es público** y va en el `config.yml` — esto es por diseño.
- El `state` que el Worker genera aleatoriamente previene CSRF.
- `/admin` y `/callback.html` tienen `meta robots noindex, nofollow`.
- `robots.txt` hace `Disallow: /admin`.
- Solo usuarios con **write access** al repo pueden editar.

## ❓ Preguntas frecuentes

### ¿Puedo usar el panel localmente?

Sí. Tras `npm run dev`, abre <http://localhost:5173/admin>. Necesitarás:

1. Que el Worker OAuth permita el origen `http://localhost:5173` (agregar en
   `getAllowedOrigins()` o via `CMS_ORIGIN` var en `wrangler.toml`).
2. Añadir `http://localhost:5173/admin/` como callback URL adicional en la OAuth App.
3. Modificar el `config.yml` localmente para usar un Worker de desarrollo
   o apuntar al Worker de prod (pero el redirect_uri debe coincidir).

### ¿Qué pasa si hago un commit directo a master (sin usar el panel)?

Funciona igual. El panel es solo una interfaz que hace commits a master. Puedes
alternar entre usar el panel y editar archivos `.md` directamente — ambos son válidos.

### ¿Puedo programar publicaciones para el futuro?

Decap CMS no tiene scheduled publishing nativo. Pero puedes:

- Crear el artículo y guardarlo como draft (no se publica hasta que cambies el status)
- O editar manualmente el archivo `.md` y hacer commit con la fecha futura — el
  `postsLoader.ts` ordena por fecha, así que el artículo aparecerá en el listado pero
  podrías modificarlo para que filtre por fecha si quieres scheduling real.

### ¿Puedo subir imágenes desde el panel?

Sí, el `media_folder` está configurado como `public/blog/`. Cuando insertes una imagen
en el editor markdown, podrás subirla y se guardará en esa carpeta. Aparecerá en
producción en `https://www.mistervet.co/blog/tu-imagen.png`.

### ¿Cómo añado una nueva categoría?

Edita `public/admin/config.yml` → campo `category` → añade la nueva opción en
`options`:

```yaml
- { label: "OtraCategoría", value: "OtraCategoría" }
```

Y asegúrate de añadir el color correspondiente en `src/pages/BlogPage.tsx` y
`src/pages/BlogPost.tsx` (en el objeto `categoryColors`).
