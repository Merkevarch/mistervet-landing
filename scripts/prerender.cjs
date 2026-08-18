/**
 * Prerender script: generates static HTML for each route after vite build.
 *
 * How it works:
 * 1. Starts a Node.js HTTP server on dist/ with SPA fallback
 * 2. Uses Playwright to load each route
 * 3. Waits for react-helmet-async to inject meta tags and JSON-LD
 * 4. Cleans up duplicate tags (keeps only the page-specific ones from Helmet)
 * 5. Saves the rendered HTML as static files in dist/<route>/index.html
 *
 * This way, Google sees all structured data in the initial HTML response
 * without needing to execute JavaScript.
 */

const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');
const http = require('http');

const ROUTES = [
  '/',
  '/mascotas',
  '/produccion',
  '/software',
  '/blog',
  '/blog/vacunacion-en-perros-guia-completa',
  '/blog/desparasitacion-en-gatos',
  '/blog/manejo-sanitario-ganaderia-bovina',
  '/cobertura',
  '/veterinaria-en-sincelejo-y-monteria',
  '/ganaderia-en-costa-caribe',
];

const DIST_DIR = path.resolve(__dirname, '..', 'dist');
const PORT = 4199;

const MIME_TYPES = {
  '.html': 'text/html',
  '.js': 'application/javascript',
  '.css': 'text/css',
  '.json': 'application/json',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
  '.ttf': 'font/ttf',
  '.eot': 'application/vnd.ms-fontobject',
  '.map': 'application/json',
  '.txt': 'text/plain',
  '.xml': 'application/xml',
};

function createServer() {
  return http.createServer((req, res) => {
    const urlPath = req.url.split('?')[0];
    let filePath = path.join(DIST_DIR, urlPath);

    // If it's a directory or doesn't exist, try SPA fallback
    if (urlPath === '/' || urlPath === '') {
      filePath = path.join(DIST_DIR, 'index.html');
    } else if (!fs.existsSync(filePath) || fs.statSync(filePath).isDirectory()) {
      // Check for prerendered route
      const prerenderedPath = path.join(DIST_DIR, urlPath, 'index.html');
      if (fs.existsSync(prerenderedPath)) {
        filePath = prerenderedPath;
      } else {
        // SPA fallback to index.html
        filePath = path.join(DIST_DIR, 'index.html');
      }
    }

    fs.readFile(filePath, (err, data) => {
      if (err) {
        res.writeHead(404);
        res.end('Not found');
        return;
      }
      const ext = path.extname(filePath);
      const mime = MIME_TYPES[ext] || 'application/octet-stream';
      res.writeHead(200, { 'Content-Type': mime });
      res.end(data);
    });
  });
}

async function main() {
  if (!fs.existsSync(DIST_DIR)) {
    console.error('dist/ not found. Run npm run build first.');
    process.exit(1);
  }

  console.log('▶ Starting HTTP server on dist/...');
  const server = createServer();
  await new Promise((resolve) => server.listen(PORT, resolve));
  const baseUrl = `http://localhost:${PORT}`;
  console.log(`✓ Server running at ${baseUrl}`);

  const browser = await chromium.launch();
  const context = await browser.newContext({
    userAgent: 'MisterVetPrerender/1.0 (+https://www.mistervet.co)',
  });

  let successCount = 0;
  let failCount = 0;

  for (const route of ROUTES) {
    const page = await context.newPage();
    try {
      const url = baseUrl + route;
      console.log(`▶ Prerendering ${route}...`);

      await page.goto(url, { waitUntil: 'networkidle', timeout: 15000 });

      // Wait for Helmet to inject JSON-LD and meta description
      await page.waitForFunction(() => {
        const jsonLd = document.querySelectorAll('script[type="application/ld+json"]').length;
        const metaDesc = document.querySelector('meta[name="description"]');
        return jsonLd > 0 && metaDesc;
      }, { timeout: 10000 });

      // Wait for title to stabilize (check twice with 500ms gap)
      let title1 = await page.title();
      await page.waitForTimeout(1000);
      let title2 = await page.title();
      // If title is still changing, wait more
      let attempts = 0;
      while (title1 !== title2 && attempts < 5) {
        title1 = title2;
        await page.waitForTimeout(1000);
        title2 = await page.title();
        attempts++;
      }

      // Clean up duplicate tags.
      // Helmet REPLACES <title> tags (correct one is FIRST) but APPENDS <meta> and <link> tags (correct one is LAST).
      await page.evaluate(() => {
        // Remove duplicate <title> tags (keep FIRST - Helmet replaces, so first is the latest)
        const titles = document.querySelectorAll('head title');
        for (let i = 1; i < titles.length; i++) titles[i].remove();

        // Remove duplicate meta tags by name (keep LAST - Helmet appends, so last is the latest)
        const metaByName = {};
        document.querySelectorAll('head meta[name]').forEach((m) => {
          const name = m.getAttribute('name');
          if (!metaByName[name]) metaByName[name] = [];
          metaByName[name].push(m);
        });
        Object.values(metaByName).forEach((metas) => {
          for (let i = 0; i < metas.length - 1; i++) metas[i].remove();
        });

        // Remove duplicate meta tags by property (og:*, keep LAST)
        const metaByProp = {};
        document.querySelectorAll('head meta[property]').forEach((m) => {
          const prop = m.getAttribute('property');
          if (!metaByProp[prop]) metaByProp[prop] = [];
          metaByProp[prop].push(m);
        });
        Object.values(metaByProp).forEach((metas) => {
          for (let i = 0; i < metas.length - 1; i++) metas[i].remove();
        });

        // Remove duplicate <link rel="canonical"> (keep LAST)
        const canonicals = document.querySelectorAll('head link[rel="canonical"]');
        for (let i = 0; i < canonicals.length - 1; i++) canonicals[i].remove();
      });

      // Get the rendered HTML
      const html = await page.content();

      // Save as static HTML file (not directory/index.html)
      // Using <route>.html avoids Cloudflare's automatic 308 trailing-slash redirect
      let outPath;
      if (route === '/') {
        outPath = path.join(DIST_DIR, 'index.html');
      } else {
        // For nested routes like /blog/:slug, create the directory structure
        const routePath = route.replace(/^\//, '');
        if (routePath.includes('/')) {
          const dir = path.dirname(routePath);
          fs.mkdirSync(path.join(DIST_DIR, dir), { recursive: true });
        }
        outPath = path.join(DIST_DIR, routePath + '.html');
      }
      fs.writeFileSync(outPath, html);

      const jsonLdCount = await page.evaluate(() =>
        document.querySelectorAll('script[type="application/ld+json"]').length
      );
      const title = await page.title();
      console.log(`  ✓ Saved (${html.length} bytes, ${jsonLdCount} JSON-LD)`);
      console.log(`    Title: ${title}`);
      successCount++;
    } catch (e) {
      console.error(`  ✗ Failed: ${e.message}`);
      failCount++;
    } finally {
      await page.close();
    }
  }

  await browser.close();
  server.close();

  console.log(`\n✅ Prerendered ${successCount}/${ROUTES.length} routes (${failCount} failed)`);
  process.exit(failCount > 0 ? 1 : 0);
}

main().catch((err) => {
  console.error('Fatal error:', err);
  process.exit(1);
});
