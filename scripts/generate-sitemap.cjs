/**
 * Generador dinámico de sitemap.xml en build time.
 *
 * Lee los archivos .md de src/posts/ para incluirlos automáticamente en el
 * sitemap. Las páginas estáticas (rutas principales) se definen aquí.
 *
 * Uso:
 *   node scripts/generate-sitemap.cjs
 *
 * Se ejecuta después de `vite build` en el workflow de deploy.
 */

const fs = require('fs');
const path = require('path');

const SITE_URL = 'https://www.mistervet.co';
const POSTS_DIR = path.resolve(__dirname, '..', 'src', 'posts');
const OUT_FILE = path.resolve(__dirname, '..', 'public', 'sitemap.xml');

// Páginas estáticas (no generadas dinámicamente)
// lastmod puede ser una fecha fija o null (= hoy)
const STATIC_PAGES = [
  { path: '/', priority: '1.0', changefreq: 'weekly' },
  { path: '/mascotas', priority: '0.9', changefreq: 'monthly' },
  { path: '/produccion', priority: '0.9', changefreq: 'monthly' },
  { path: '/software', priority: '0.9', changefreq: 'monthly' },
  { path: '/blog', priority: '0.8', changefreq: 'weekly' },
  { path: '/cobertura', priority: '0.9', changefreq: 'monthly' },
  { path: '/veterinaria-en-sincelejo-y-monteria', priority: '0.9', changefreq: 'monthly' },
  { path: '/ganaderia-en-costa-caribe', priority: '0.9', changefreq: 'monthly' },
];

function todayISO() {
  return new Date().toISOString().split('T')[0];
}

/**
 * Extrae la fecha del frontmatter de un archivo .md.
 * Formato esperado: date: "2026-07-07"
 */
function getPostDate(filePath) {
  const content = fs.readFileSync(filePath, 'utf-8');
  const match = content.match(/^date:\s*["']?(\d{4}-\d{2}-\d{2})["']?/m);
  return match ? match[1] : todayISO();
}

function getPostSlug(filePath) {
  return path.basename(filePath).replace(/\.md$/, '');
}

function generate() {
  const urls = [];

  // Páginas estáticas
  for (const p of STATIC_PAGES) {
    urls.push({
      loc: `${SITE_URL}${p.path}`,
      lastmod: todayISO(),
      changefreq: p.changefreq,
      priority: p.priority,
    });
  }

  // Blog posts dinámicos
  if (fs.existsSync(POSTS_DIR)) {
    const mdFiles = fs.readdirSync(POSTS_DIR).filter((f) => f.endsWith('.md'));
    for (const f of mdFiles) {
      const filePath = path.join(POSTS_DIR, f);
      const slug = getPostSlug(filePath);
      const date = getPostDate(filePath);
      urls.push({
        loc: `${SITE_URL}/blog/${slug}`,
        lastmod: date,
        changefreq: 'monthly',
        priority: '0.7',
      });
    }
  }

  // Generar XML
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map((u) => `  <url>
    <loc>${u.loc}</loc>
    <lastmod>${u.lastmod}</lastmod>
    <changefreq>${u.changefreq}</changefreq>
    <priority>${u.priority}</priority>
  </url>`).join('\n')}
</urlset>
`;

  fs.writeFileSync(OUT_FILE, xml, 'utf-8');
  console.log(`✅ Sitemap generado: ${OUT_FILE}`);
  console.log(`   ${urls.length} URLs incluidas:`);
  urls.forEach((u) => console.log(`   - ${u.loc.replace(SITE_URL, '') || '/'} (lastmod: ${u.lastmod})`));
}

generate();
