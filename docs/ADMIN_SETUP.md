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

**No necesitas base de datos ni backend**: GitHub es el backend, la autenticación
es vía OAuth PKCE (moderno, sin secret en el servidor).

## 🚧 Setup inicial (una sola vez)

### Paso 1: Crear la GitHub OAuth App

1. Ve a <https://github.com/settings/developers>
2. Click en **"New OAuth App"**
3. Completa:
   - **Application name:** `MisterVet CMS`
   - **Homepage URL:** `https://www.mistervet.co`
   - **Authorization callback URL:** `https://www.mistervet.co/callback.html`
     - ⚠️ **Importante:** debe ser EXACTAMENTE esa URL, incluyendo `.html` y sin slash final
4. Click en **"Register application"**
5. Anota el **Client ID** (visible en la página de la app, justo debajo del nombre)
   - ✅ **NO necesitas el Client Secret** — el flujo PKCE no lo requiere
6. El Client ID lo vas a poner en el `config.yml` (ver Paso 3)

### Paso 2: Editar `public/admin/config.yml`

Reemplaza `GITHUB_OAUTH_CLIENT_ID` por tu Client ID real:

```yaml
backend:
  name: github
  repo: Merkevarch/mistervet-landing
  branch: master
  auth_type: pkce
  app_id: TU_CLIENT_ID_AQUI  # ← pega tu Client ID
```

Por ejemplo, si tu Client ID es `Iv1.abc123def456`:

```yaml
  app_id: Iv1.abc123def456
```

### Paso 3: Commit + push

```bash
git add public/admin/config.yml
git commit -m "chore(cms): add GitHub OAuth Client ID"
git push origin master
```

Tu CI/CD deploya automáticamente en ~2-3 min.

### Paso 4: Probar el panel

1. Ve a <https://www.mistervet.co/admin>
2. Click en **"Login with GitHub"**
3. Se abre un popup → GitHub pide "Authorize MisterVet CMS" → **Authorize**
4. GitHub redirige a `/callback.html` → el popup se cierra solo
5. Decap CMS carga la lista de artículos

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
  /admin         → carga Decap CMS desde unpkg CDN
  /callback.html → recibe OAuth code de GitHub, postMessage a /admin

GitHub:
  OAuth App       → emite el code que se intercambia por access_token
  API             → Decap CMS la usa con el access_token para CRUD de archivos

Cloudflare Pages:
  Sirve /admin/index.html y /callback.html como archivos estáticos
  Recibe commits de Decap CMS en master → CI/CD → redeploy automático
```

**No se usa Worker**. El flujo PKCE se hace directamente entre el navegador
y GitHub. Esto es más simple y más seguro que el flujo `implicit` con Worker.

## 🛠️ Mantenimiento

### Cambiar el Client ID

Si rotas la OAuth App o necesitas cambiar el Client ID:

1. Edita `public/admin/config.yml` → campo `app_id`
2. Commit + push

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
- **Login falla con redirect a `api.netlify.com`:** esto NO debería pasar con el flujo
  PKCE. Si lo ves, fuerza un hard refresh (Ctrl+Shift+R) para descargar el config.yml nuevo.
- **"Invalid redirect_uri":** verifica que el callback URL en la GitHub OAuth App sea
  EXACTAMENTE `https://www.mistervet.co/callback.html` (con `.html`, sin slash final).
- **No aparecen artículos:** verifica que los archivos `.md` estén en `src/posts/` con
  el frontmatter correcto.
- **No puedo publicar:** verifica que tu usuario de GitHub tenga permisos de escritura
  en el repo.

## 🔒 Seguridad

- **No hay Client Secret en el código fuente.** El flujo PKCE no lo necesita.
- El Client ID es público y va en el navegador — esto es por diseño, es seguro.
- El `state` que Decap CMS genera aleatoriamente previene CSRF.
- El `code_verifier` generado aleatoriamente y solo conocido por el navegador
  previene interceptación del `code` en tránsito.
- `/admin` y `/callback.html` tienen `meta robots noindex, nofollow`.
- `robots.txt` hace `Disallow: /admin` y `Disallow: /callback.html`.
- Solo usuarios con **write access** al repo pueden editar.

## ❓ Preguntas frecuentes

### ¿Puedo usar el panel localmente?

Sí. Tras `npm run dev`, abre <http://localhost:5173/admin>. Necesitarás añadir
`http://localhost:5173/callback.html` como callback URL adicional en la OAuth App
(GitHub permite múltiples callback URLs en la misma app).

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

### ¿Por qué no usamos el Cloudflare Worker OAuth?

Inicialmente intentamos el flujo `implicit` con un Worker OAuth proxy, pero
Decap CMS tiene un bug conocido donde ignora el `auth_endpoint` y cae al fallback
de Netlify Identity (`api.netlify.com/auth`), causando un 404.

El Worker sigue disponible en `oauth-worker/` por si en el futuro queremos volver
al flujo implicit (por ejemplo, si quisiéramos ocultar el Client ID del navegador
o restringir orígenes específicos), pero para uso estándar PKCE es mejor.
