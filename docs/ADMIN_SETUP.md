# Panel de Administración del Blog (/admin)

Este documento explica cómo configurar y usar el panel de administración del blog,
que permite crear, editar y eliminar artículos sin tocar código ni recurrir a un agente.

## 🎯 Qué es y cómo funciona

El panel vive en **<https://www.mistervet.co/admin>** y está construido con
[Decap CMS](https://decapcms.org/) (antes Netlify CMS). Es un estándar de la industria
para gestionar blogs en sitios estáticos.

Flujo:

1. Entras a <https://www.mistervet.co/admin>
2. Inicias sesión con tu cuenta de GitHub (`Merkevarch`)
3. Decap CMS lista los artículos actuales (leídos desde `src/posts/*.md`)
4. Creas/editas/eliminas artículos desde el editor visual
5. Al guardar, Decap CMS hace commit a `master` en GitHub
6. Tu CI/CD actual (`.github/workflows/deploy.yml`) detecta el push, reconstruye el sitio y lo deploya en Cloudflare Pages
7. El artículo queda publicado en producción en ~2-3 minutos

**No necesitas base de datos ni backend propio**: GitHub es el backend, el OAuth
Worker es solo para autenticación.

## 🚧 Setup inicial (una sola vez)

### Paso 1: Crear la GitHub OAuth App

Decap CMS necesita una OAuth App para autenticar usuarios vía GitHub.

1. Ve a <https://github.com/settings/developers>
2. Click en **"New OAuth App"**
3. Completa:
   - **Application name:** `MisterVet CMS`
   - **Homepage URL:** `https://www.mistervet.co`
   - **Authorization callback URL:** `https://mistervet-cms-oauth.<tu-subdominio>.workers.dev/callback`
     - Reemplaza `<tu-subdominio>` con el subdominio de Cloudflare que se te asigne al deployar el Worker (lo verás tras el Paso 3).
     - Si tu cuenta de Cloudflare es `rubenfchavez`, será probablemente `https://mistervet-cms-oauth.rubenfchavez.workers.dev/callback`
4. Click en **"Register application"**
5. Anota el **Client ID** (visible en la página de la app)
6. Click en **"Generate a new client secret"** y anota el **Client Secret** (solo se ve una vez)

> ⚠️ Guarda el Client Secret en un lugar seguro. Si lo pierdes, tendrás que regenerarlo.

### Paso 2: Instalar Wrangler (CLI de Cloudflare)

```bash
npm install -g wrangler
wrangler login
```

Al ejecutar `wrangler login` se abrirá el navegador para que autorices a Wrangler a
gestionar tu cuenta de Cloudflare.

### Paso 3: Deployar el OAuth Worker

```bash
cd oauth-worker

# 1. Configurar los secrets (te los pedirá interactivamente)
wrangler secret put GITHUB_CLIENT_ID
# Pega el Client ID del Paso 1

wrangler secret put GITHUB_CLIENT_SECRET
# Pega el Client Secret del Paso 1

# 2. Deployar
wrangler deploy
```

La salida te dará la URL pública del Worker, algo como:

```
Published mistervet-cms-oauth (1.23 sec)
  https://mistervet-cms-oauth.<tu-subdominio>.workers.dev
```

Anota esa URL — la necesitarás en el Paso 4.

> Si no tenías una GitHub OAuth App creada en el Paso 1 (porque no sabías el subdominio),
> ahora ya lo tienes. Vuelve al Paso 1 y completa el callback URL.

### Paso 4: Actualizar `config.yml` con la URL del Worker

Edita `public/admin/config.yml` y reemplaza la línea:

```yaml
app_id: <OAUTH_WORKER_URL>
```

con la URL real del Worker:

```yaml
app_id: https://mistervet-cms-oauth.tu-subdominio.workers.dev
```

### Paso 5: Commit y push

```bash
cd ..
git add public/admin/config.yml
git commit -m "chore(cms): configure OAuth worker URL in Decap CMS"
git push origin master
```

El CI/CD deploya automáticamente. En ~2-3 minutos podrás entrar a
<https://www.mistervet.co/admin> e iniciar sesión con GitHub.

## 📝 Uso diario del panel

### Acceder

1. Ve a <https://www.mistervet.co/admin>
2. Click en **"Login with GitHub"**
3. Autoriza la OAuth App (solo la primera vez)
4. Verás la lista de artículos actuales

### Crear un artículo nuevo

1. Click en **"New Artículo"**
2. Completa los campos:
   - **Título** — se usará como H1 y como slug del archivo
   - **Fecha de publicación** — afecta el orden del blog
   - **Categoría** — Mascotas / Ganadería / General
   - **Autor** — por defecto "MisterVet"
   - **Resumen (excerpt)** — 1-3 frases, se usa en el listado y como meta description SEO
   - **Contenido** — el cuerpo del artículo en Markdown
3. Click en **"Publish"** (o "Save" si quieres guardar como draft)
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

## 🛠️ Mantenimiento

### Cambiar la URL del Worker

Si migras de cuenta de Cloudflare o quieres cambiar el subdominio:

1. Edita `public/admin/config.yml` → campo `app_id`
2. Actualiza el callback URL en la GitHub OAuth App
3. Commit + push

### Permitir más usuarios editores

Cualquier usuario con acceso de escritura al repo `Merkevarch/mistervet-landing`
podrá editar el blog desde `/admin` tras autenticarse con su cuenta de GitHub.
No necesitas configurar nada adicional — la OAuth App ya valida que tienen acceso.

Para añadir un colaborador:

1. Ve a <https://github.com/Merkevarch/mistervet-landing/settings/access>
2. Click en **"Add people"**
3. Invita por username o email
4. Asigna el rol **"Write"** (suficiente para editar vía Decap CMS)

### Debugging

- **No carga el panel:** verifica que `dist/admin/index.html` y `dist/admin/config.yml`
  existen después del build (deberían copiarse automáticamente).
- **Login falla:** verifica que la URL del Worker en `config.yml` sea correcta y que el
  Worker responda en `https://mistervet-cms-oauth.tu-subdominio.workers.dev/`
  (debe devolver un JSON con `ok: true`).
- **No aparecen artículos:** verifica que los archivos `.md` estén en `src/posts/` con
  el frontmatter correcto.
- **No puedo publicar:** verifica que tu usuario de GitHub tenga permisos de escritura
  en el repo.

### Ver el OAuth Worker en acción

```bash
# Health check del Worker
curl https://mistervet-cms-oauth.tu-subdominio.workers.dev/

# Iniciar el flujo OAuth manualmente (para probar)
# Abre en el navegador:
https://mistervet-cms-oauth.tu-subdominio.workers.dev/auth
```

## 🔒 Seguridad

- El Client Secret de GitHub **nunca** está en el código fuente ni en el navegador.
  Vive solo en el Worker como secret de Cloudflare.
- El Worker valida que el origen de la petición `postMessage` esté en la lista de
  orígenes permitidos (`getAllowedOrigins` en `oauth-worker/src/index.js`).
- Por defecto, solo se permite `https://www.mistervet.co`, `https://mistervet.co`,
  `http://localhost:5173` y `http://localhost:4173` (dev).
- Para añadir más orígenes (por ejemplo, previews de Cloudflare Pages), añádelos en
  `oauth-worker/wrangler.toml` → `[vars]` → `CMS_ORIGIN`, y redeploya el Worker.

## ❓ Preguntas frecuentes

### ¿Puedo usar el panel localmente?

Sí. Tras `npm run dev`, abre <http://localhost:5173/admin>. El flujo OAuth funcionará
si el Worker ya está deployado y `localhost:5173` está en los orígenes permitidos (lo está).

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

Sí, el media_folder está configurado como `public/blog/`. Cuando insertes una imagen
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
