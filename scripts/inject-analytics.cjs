/**
 * Inyecta el beacon de Cloudflare Web Analytics en dist/index.html
 * y en todos los .html prerenderizados si la variable de entorno
 * CLOUDFLARE_ANALYTICS_TOKEN está definida.
 *
 * Uso (en CI):
 *   CLOUDFLARE_ANALYTICS_TOKEN=xxxx node scripts/inject-analytics.cjs
 *
 * Si la variable no está definida, no hace nada (silencioso).
 *
 * Cloudflare Web Analytics:
 * - Gratuito, sin cookies, sin PII
 * - No requiere consentimiento bajo GDPR/CCPA
 * - Dashboard accesible desde Cloudflare → Web Analytics
 *
 * Para obtener el token:
 * 1. Cloudflare dashboard → Web Analytics → Analytics tab
 * 2. Add a site → mistervet.co
 * 3. Copiar el JS snippet que dan, extraer el valor data-cf-beacon
 */

const fs = require('fs');
const path = require('path');

const DIST_DIR = path.resolve(__dirname, '..', 'dist');
const TOKEN = process.env.CLOUDFLARE_ANALYTICS_TOKEN;

if (!TOKEN) {
  console.log('ℹ️  CLOUDFLARE_ANALYTICS_TOKEN no definido. Saltando inyección de analytics.');
  process.exit(0);
}

const BEACON_SCRIPT = `<script defer src='https://static.cloudflareinsights.com/beacon.min.js' data-cf-beacon='{"token": "${TOKEN}"}'></script>`;

function injectInFile(filePath) {
  if (!fs.existsSync(filePath)) return;
  let html = fs.readFileSync(filePath, 'utf-8');
  if (html.includes('cloudflareinsights.com')) {
    // Ya inyectado, no duplicar
    return;
  }
  // Inyectar antes de </body>
  html = html.replace('</body>', `  ${BEACON_SCRIPT}\n</body>`);
  fs.writeFileSync(filePath, html, 'utf-8');
}

function main() {
  if (!fs.existsSync(DIST_DIR)) {
    console.error('dist/ no encontrado. Ejecuta npm run build primero.');
    process.exit(1);
  }

  // Procesar index.html raíz
  injectInFile(path.join(DIST_DIR, 'index.html'));

  // Procesar todos los .html prerenderizados en subcarpetas
  function walk(dir) {
    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
      const fullPath = path.join(dir, entry.name);
      if (entry.isDirectory()) {
        walk(fullPath);
      } else if (entry.name.endsWith('.html')) {
        injectInFile(fullPath);
      }
    }
  }
  walk(DIST_DIR);

  console.log(`✅ Beacon de Cloudflare Web Analytics inyectado en todos los HTML de dist/.`);
}

main();
