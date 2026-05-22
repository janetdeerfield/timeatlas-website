import { mkdir, readFile, rm, writeFile } from 'node:fs/promises';
import { dirname, join, resolve } from 'node:path';

const repoRoot = resolve(new URL('..', import.meta.url).pathname);
const distDir = join(repoRoot, 'dist');
const ssrDir = join(repoRoot, 'dist-ssr');
const templatePath = join(distDir, 'index.html');
const { prerenderRoutes, renderPath } = await import('../dist-ssr/prerender.js');
const prerenderNow = new Date().toISOString();

globalThis.__TIMEATLAS_PRERENDER_NOW = prerenderNow;

function stripBaseSeo(html) {
  return html
    .replace(/\s*<title>[\s\S]*?<\/title>/i, '')
    .replace(/\s*<!-- Base Meta Description -->\s*<meta\s+name="description"[^>]*>/i, '')
    .replace(/\s*<meta\s+property="og:title"[^>]*>/i, '')
    .replace(/\s*<meta\s+property="og:description"[^>]*>/i, '')
    .replace(/\s*<meta\s+property="og:url"[^>]*>/i, '')
    .replace(/\s*<meta\s+property="og:type"[^>]*>/i, '');
}

function routeToFiles(route) {
  if (route === '/') return [join(distDir, 'index.html')];

  // Only write slug.html — never slug/index.html.
  // Writing both created a slug/ directory that triggered Apache mod_dir's
  // DirectorySlash redirect (GET /convert → 301 /convert/) before any
  // RewriteRule could serve convert.html. The redirect destination then 404'd
  // when convert/index.html wasn't present, creating a dead redirect chain
  // that Google could not index. Flat .html files only; no directories.
  const routePath = route.replace(/^\//, '');
  return [join(distDir, routePath + '.html')];
}

function withRenderedApp(template, routeHead, appHtml) {
  const html = stripBaseSeo(template).replace(
    '<html lang="en">',
    `<html lang="en" data-prerendered="true" data-prerender-now="${prerenderNow}">`
  );

  return html
    .replace('</head>', routeHead + '\n  </head>')
    .replace('<div id="root"></div>', '<div id="root">' + appHtml + '</div>');
}

const template = await readFile(templatePath, 'utf8');

for (const route of prerenderRoutes) {
  const rendered = await renderPath(route);
  const html = withRenderedApp(template, rendered.head, rendered.html);

  for (const filePath of routeToFiles(route)) {
    await mkdir(dirname(filePath), { recursive: true });
    await writeFile(filePath, html);
  }
}

await rm(ssrDir, { recursive: true, force: true });

console.log(`Prerendered ${prerenderRoutes.length} route(s).`);
