import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { chromium } from 'playwright';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DIST_DIR = path.resolve(__dirname, '../dist');

// Public routes from client/src/components/Router.tsx (internal/admin excluded)
const PUBLIC_ROUTES = [
  '/',
  '/about',
  '/work',
  '/resort-villa-websites',
  '/contact-only',
];

const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.ico': 'image/x-icon',
  '.svg': 'image/svg+xml',
  '.txt': 'text/plain; charset=utf-8',
  '.xml': 'application/xml',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
};

function createStaticServer(fallbackShellHtml = null) {
  return http.createServer((req, res) => {
    try {
      const parsedUrl = new URL(req.url, 'http://localhost');
      let pathname = decodeURIComponent(parsedUrl.pathname);

      let filePath = path.join(DIST_DIR, pathname);

      // Handle root or directory
      if (fs.existsSync(filePath) && fs.statSync(filePath).isDirectory()) {
        filePath = path.join(filePath, 'index.html');
      }

      // If file doesn't exist, SPA fallback
      if (!fs.existsSync(filePath) || fs.statSync(filePath).isDirectory()) {
        if (fallbackShellHtml) {
          res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
          res.end(fallbackShellHtml);
          return;
        }
        filePath = path.join(DIST_DIR, 'index.html');
      }

      const ext = path.extname(filePath).toLowerCase();
      const contentType = MIME_TYPES[ext] || 'application/octet-stream';

      const content = fs.readFileSync(filePath);
      res.writeHead(200, { 'Content-Type': contentType });
      res.end(content);
    } catch (err) {
      res.writeHead(500, { 'Content-Type': 'text/plain' });
      res.end(`Internal Server Error: ${err.message}`);
    }
  });
}

function generateSitemap(routes) {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  const today = `${year}-${month}-${day}`;

  const baseUrl = 'https://dualsparkstudio.com';

  const urlsXml = routes
    .map((route) => {
      const loc = route === '/' ? `${baseUrl}/` : `${baseUrl}${route}`;
      const changefreq = route === '/' ? 'weekly' : 'monthly';
      const priority = route === '/' ? '1.0' : '0.8';

      return `  <url>
    <loc>${loc}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
  </url>`;
    })
    .join('\n');

  const sitemapContent = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urlsXml}
</urlset>
`;

  // Write sitemap only to dist/sitemap.xml
  const distSitemap = path.join(DIST_DIR, 'sitemap.xml');
  fs.writeFileSync(distSitemap, sitemapContent, 'utf8');

  console.log(`\n🗺️ Generated sitemap.xml for ${routes.length} public routes with lastmod: ${today}`);
  routes.forEach((r) => console.log(`   ✔ ${r === '/' ? `${baseUrl}/` : `${baseUrl}${r}`}`));
}

async function prerender() {
  console.log('🚀 Starting Playwright Build-Time Pre-rendering...');

  if (!fs.existsSync(DIST_DIR)) {
    throw new Error(`Build directory does not exist: ${DIST_DIR}. Run vite build first.`);
  }

  const originalShell = fs.readFileSync(path.join(DIST_DIR, 'index.html'), 'utf8');
  const server = createStaticServer(originalShell);

  await new Promise((resolve, reject) => {
    server.listen(0, '127.0.0.1', () => resolve());
    server.on('error', reject);
  });

  const address = server.address();
  const port = address.port;
  const baseUrl = `http://127.0.0.1:${port}`;
  console.log(`📡 Local preview server running on ${baseUrl}`);

  let browser;
  try {
    browser = await chromium.launch({
      headless: true,
      args: [
        '--no-sandbox',
        '--disable-setuid-sandbox',
        '--disable-dev-shm-usage',
        '--disable-gpu',
        '--enable-unsafe-webgl',
      ],
    });

    const context = await browser.newContext({
      viewport: { width: 1280, height: 800 },
      userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36 PrerenderBot',
    });

    for (const route of PUBLIC_ROUTES) {
      console.log(`\n⏳ Pre-rendering route: "${route}"...`);
      const page = await context.newPage();

      // Gracefully handle any WebGL or non-fatal page warnings in headless mode
      page.on('pageerror', (err) => {
        console.warn(`   [Browser page warning on ${route}]: ${err.message}`);
      });

      const url = `${baseUrl}${route}`;
      await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 30000 });

      // Wait for page title
      await page.waitForFunction(
        () => document.title && document.title.trim().length > 0,
        { timeout: 15000 }
      );

      // Wait for main heading
      await page.waitForSelector('h1', { timeout: 15000 });

      // Wait for #root to contain rendered content
      await page.waitForFunction(
        () => {
          const root = document.getElementById('root');
          return root && root.innerHTML.trim().length > 100;
        },
        { timeout: 15000 }
      );

      // Brief settling time for client-side state / metadata updates
      await page.waitForTimeout(600);

      // Extract metadata from page
      const title = await page.title();
      const h1Text = await page.$eval('h1', (el) => el.textContent?.trim() || '');
      const metaDescription = await page.$eval(
        'meta[name="description"]',
        (el) => el.getAttribute('content') || ''
      ).catch(() => '');
      const canonical = await page.$eval(
        'link[rel="canonical"]',
        (el) => el.getAttribute('href') || ''
      ).catch(() => '');
      const ogUrl = await page.$eval(
        'meta[property="og:url"]',
        (el) => el.getAttribute('content') || ''
      ).catch(() => '');

      const fullHtml = await page.content();

      // STRICT VALIDATION: Build MUST fail loudly if anything is missing or shell is empty
      if (!title || title.trim().length === 0) {
        throw new Error(`Prerender Error: Missing <title> on route "${route}"`);
      }
      if (!h1Text || h1Text.trim().length === 0) {
        throw new Error(`Prerender Error: Missing <h1> text on route "${route}"`);
      }
      if (!metaDescription || metaDescription.trim().length === 0) {
        throw new Error(`Prerender Error: Missing meta description on route "${route}"`);
      }
      if (!canonical || canonical.trim().length === 0) {
        throw new Error(`Prerender Error: Missing canonical URL on route "${route}"`);
      }
      const expectedCanonical = route === '/'
        ? 'https://dualsparkstudio.com/'
        : `https://dualsparkstudio.com${route}`;
      if (canonical !== expectedCanonical) {
        throw new Error(`Prerender Error: Expected canonical "${expectedCanonical}" on route "${route}", got "${canonical}"`);
      }
      if (ogUrl !== expectedCanonical) {
        throw new Error(`Prerender Error: Expected og:url "${expectedCanonical}" on route "${route}", got "${ogUrl}"`);
      }
      if (fullHtml.includes('<div id="root"></div>')) {
        throw new Error(`Prerender Error: Empty <div id="root"></div> shell rendered on route "${route}"`);
      }

      // Determine output file path
      let outPath;
      if (route === '/') {
        outPath = path.join(DIST_DIR, 'index.html');
      } else {
        const routeFolder = path.join(DIST_DIR, route.replace(/^\//, ''));
        if (!fs.existsSync(routeFolder)) {
          fs.mkdirSync(routeFolder, { recursive: true });
        }
        outPath = path.join(routeFolder, 'index.html');
      }

      fs.writeFileSync(outPath, fullHtml, 'utf8');

      console.log(`   ✔ Written to: ${path.relative(process.cwd(), outPath)}`);
      console.log(`   ✔ Title: "${title}"`);
      console.log(`   ✔ Canonical: "${canonical}"`);
      console.log(`   ✔ H1: "${h1Text}"`);

      await page.close();
    }

    console.log('\n✨ All public routes successfully pre-rendered!');

    // Generate sitemap.xml dynamically from PUBLIC_ROUTES with today's date
    generateSitemap(PUBLIC_ROUTES);
  } finally {
    if (browser) {
      await browser.close();
    }
    server.close();
  }
}

prerender().catch((err) => {
  console.error('\n❌ FATAL PRERENDER ERROR:', err.message);
  process.exit(1);
});

