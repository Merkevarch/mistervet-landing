# MisterVet Landing

Landing page de **MisterVet**, negocio veterinario colombiano con dos líneas de servicio:
atención médica a domicilio para mascotas en Sincelejo y Montería, y consultoría
pecuaria para fincas en toda la Costa Caribe. Además, promueve **MisterVet Pro**,
un SaaS de gestión veterinaria multi-tenant (web app separada en `app.mistervet.co`).

🌐 **Producción:** <https://www.mistervet.co>

## 🛠️ Stack tecnológico

| Capa            | Tecnología                                   |
| --------------- | -------------------------------------------- |
| Framework UI    | React 19                                     |
| Build tool      | Vite 8                                       |
| Routing         | react-router-dom 7                           |
| SEO meta tags   | react-helmet-async 3                         |
| Markdown blog   | react-markdown 10                            |
| Estilos         | Tailwind CSS 4 (con `@theme` inline en `src/index.css`) |
| PostCSS         | autoprefixer                                 |
| Hosting         | Cloudflare Pages (`wrangler.toml`)           |
| CI/CD           | GitHub Actions (`.github/workflows/deploy.yml`) |
| Prerender SEO   | Playwright (Chromium) — genera HTML estático por ruta |

Sin TypeScript. Sin tests automatizados (pendiente).

## 📁 Estructura del proyecto

```
mistervet-landing/
├── .github/workflows/deploy.yml      # CI: build + prerender + deploy a Cloudflare
├── index.html                         # HTML raíz (SPA mount point)
├── vite.config.js                     # Config mínima de Vite
├── wrangler.toml                      # Config Cloudflare Pages
├── package.json
├── scripts/
│   └── prerender.cjs                  # ⭐ Prerenderiza 12 rutas con Playwright
├── public/
│   ├── _headers                       # MIME types para .js/.jsx/.mjs
│   ├── _redirects                     # 301s de URLs antiguas + SPA fallback
│   ├── robots.txt
│   ├── sitemap.xml
│   ├── favicon.svg
│   ├── og-image.png
│   └── blog/infografia-que-registrar.png
└── src/
    ├── main.jsx                       # Router con 12 rutas
    ├── App.jsx                        # Home page
    ├── config.js                      # ⭐ Constantes de marca centralizadas
    ├── schemas.js                     # ⭐ Schemas JSON-LD (Organization, Breadcrumb, etc.)
    ├── index.css                      # Tailwind + tema de marca + @font-face
    ├── assets/
    │   ├── fonts/                     # Bacalisties (display) + Roboto-Thin
    │   ├── logo-dibujo.webp           # Logo optimizado (20 KB)
    │   ├── perro.jpg                  # Imagen hero (80 KB)
    │   └── mockup-software.webp       # Captura SaaS (24 KB)
    ├── blog/postsLoader.js            # Parser frontmatter propio (sin gray-matter)
    ├── components/
    │   ├── Navbar.jsx
    │   ├── Footer.jsx
    │   ├── SEO.jsx                    # Helmet + meta tags
    │   └── CityPage.jsx               # Plantilla landing local reutilizable
    ├── pages/
    │   ├── MascotasPage.jsx
    │   ├── ProduccionPage.jsx
    │   ├── SoftwarePage.jsx
    │   ├── BlogPage.jsx
    │   ├── BlogPost.jsx
    │   ├── CoberturaPage.jsx
    │   ├── VeterinariaEnSincelejoMonteriaPage.jsx
    │   ├── GanaderiaEnCostaCaribePage.jsx
    │   └── NotFoundPage.jsx           # ⭐ 404 dedicada con SEO noindex
    └── posts/                          # 3 artículos markdown
        ├── vacunacion-en-perros-guia-completa.md
        ├── desparasitacion-en-gatos.md
        └── manejo-sanitario-ganaderia-bovina.md
```

## 🗺️ Rutas

| Ruta                                          | Componente                              | Tipo         |
| -------------------------------------------- | --------------------------------------- | ------------ |
| `/`                                          | `App`                                   | Home         |
| `/mascotas`                                  | `MascotasPage`                          | Servicios    |
| `/produccion`                                | `ProduccionPage`                        | Servicios    |
| `/software`                                  | `SoftwarePage`                          | SaaS landing |
| `/blog`                                      | `BlogPage`                              | Listado      |
| `/blog/:slug`                                | `BlogPost`                              | Artículo     |
| `/cobertura`                                 | `CoberturaPage`                         | Institucional |
| `/veterinaria-en-sincelejo-y-monteria`       | `VeterinariaEnSincelejoMonteriaPage`    | SEO local    |
| `/ganaderia-en-costa-caribe`                 | `GanaderiaEnCostaCaribePage` (CityPage) | SEO local    |
| `*`                                          | `NotFoundPage`                          | 404          |

## 🎨 Sistema de diseño

Definido en `src/index.css` mediante `@theme` de Tailwind:

| Token            | Hex       | Uso                                       |
| ---------------- | --------- | ----------------------------------------- |
| `mv-darkblue`    | `#163E8D` | Azul profundo, headings, fondo CTAs       |
| `mv-blue`        | `#2E86DE` | Azul brillante, links, acentos mascotas    |
| `mv-orange`      | `#F15A24` | Naranja, CTAs principales, mascotas        |
| `mv-amber`       | `#FBB03B` | Amarillo, acentos ganadería/software       |

Tipografías autoalojadas (sin Google Fonts):
- `Bacalisties` — display de marca
- `Roboto-Thin` — headings

## ⚙️ Configuración de marca

Todas las constantes (URLs externas, teléfono, email, cobertura) están centralizadas en `src/config.js`.
Los schemas JSON-LD viven en `src/schemas.js` (separados del componente `SEO.jsx`
para respetar `react-refresh/only-export-components`).

## 🔍 SEO

- **`SEO.jsx`**: componente centralizado que inyecta title, description, keywords, canonical,
  Open Graph, Twitter Card, robots.
- **Schemas JSON-LD** en cada página (`Organization`, `Service`, `FAQPage`, `BreadcrumbList`,
  `Article`, `Blog`, `SoftwareApplication`, `VeterinaryBusiness`).
- **Prerendering con Playwright** (`scripts/prerender.cjs`): tras el build, lanza Chromium,
  carga cada una de las 12 rutas, espera a que `react-helmet-async` inyecte meta tags y
  JSON-LD, limpia duplicados y guarda HTML estático.
- **`sitemap.xml`** con las URLs indexables.
- **`_redirects`** hace 301 de URLs antiguas para preservar link equity.

## 🔧 Desarrollo local

Requisitos: Node.js 20+ y npm.

```bash
# Instalar dependencias
npm ci

# Levantar servidor de desarrollo (http://localhost:5173)
npm run dev

# Build de producción (genera dist/)
npm run build

# Previsualizar build de producción
npm run preview

# Prerender HTML estático (requiere build previo y Playwright instalado)
npx playwright install chromium --with-deps
node scripts/prerender.cjs

# Lint
npm run lint
```

## 🚀 Despliegue

El despliegue es automático vía GitHub Actions al hacer push a `master`:

1. `npm ci` — instala deps
2. `npx playwright install chromium --with-deps` — navegador para prerender
3. `npm run build` — Vite genera `dist/`
4. `node scripts/prerender.cjs` — prerenderiza 12 rutas a HTML estático
5. `wrangler pages deploy dist --project-name=mistervet-landing --branch=master`

**Secrets necesarios en GitHub** (Settings → Secrets → Actions):
- `CLOUDFLARE_API_TOKEN`
- `CLOUDFLARE_ACCOUNT_ID`

## 📝 Añadir un nuevo artículo al blog

1. Crear `src/posts/mi-nuevo-articulo.md` con frontmatter:
   ```yaml
   ---
   title: "Título del artículo"
   date: "2026-08-18"
   category: "Mascotas"  # o "Ganadería" o "General"
   author: "MisterVet"
   excerpt: "Resumen corto para SEO y listado."
   ---
   # Contenido en Markdown...
   ```
2. Añadir la URL a `public/sitemap.xml`
3. Añadir la ruta a `scripts/prerender.cjs` (`ROUTES` array)

## 🐛 Añadir una nueva página SEO local (estilo CityPage)

`CityPage.jsx` es un componente plantilla que recibe `city`, `region`, `type`,
`services`, `areas`, `faqs`, `keywords` como props y genera una landing local
completa con schemas `VeterinaryBusiness`, `FAQPage` y `BreadcrumbList`.

```jsx
// Ejemplo: src/pages/VeterinariaEnCartagenaPage.jsx
import CityPage from '../components/CityPage';

export default function VeterinariaEnCartagenaPage() {
  return (
    <CityPage
      city="Cartagena"
      region="Bolívar"
      type="veterinaria"
      title="Veterinaria a Domicilio en Cartagena | MisterVet"
      description="..."
      path="/veterinaria-en-cartagena"
      intro="..."
      services={[...]}
      areas={[...]}
      faqs={[...]}
      keywords={[...]}
    />
  );
}
```

Luego registrar la ruta en `src/main.jsx`, `public/sitemap.xml` y `scripts/prerender.cjs`.

## ⚠️ Notas

- **`og-image.png` debe ser PNG/JPG** (no WebP) para compatibilidad con redes sociales.
- **`favicon.svg`** es un SVG inline con "Mv" sobre fondo azul.
- **`logo-dibujo.webp`** se usa en producción; existe `logo-dibujo.png` como fallback
  para Safari < 14 (no importado en componentes).
- **Catch-all route** redirige a `NotFoundPage` (404 dedicada con `noindex`).

## 📄 Licencia

Código propietario de MisterVet. Todos los derechos reservados.
