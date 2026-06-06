import { readFileSync, writeFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const repoRoot = resolve(new URL('.', import.meta.url).pathname, '..');
const __dirname = fileURLToPath(new URL('.', import.meta.url));

const pairsPath = resolve(repoRoot, 'data/pairs.json');
const sitemapPath = resolve(repoRoot, 'public/sitemap.xml');

// Dynamically import the article registry from src/lib/
// This is a Node.js ESM script so we use the .js extension directly.
const { ARTICLES, articlePath } = await import(resolve(repoRoot, 'src/lib/articleRegistry.ts'));

const { pairs } = JSON.parse(readFileSync(pairsPath, 'utf8'));

const canonicalPairs = pairs.filter(
  (p) => typeof p.source_code === 'string' && typeof p.target_code === 'string'
);

const today = new Date().toISOString().slice(0, 10);

const staticUrls = [
  { loc: 'https://timeatlas.co/', lastmod: '2026-04-10' },
  { loc: 'https://timeatlas.co/convert', lastmod: '2026-04-10' },
  { loc: 'https://timeatlas.co/world', lastmod: '2026-04-10' },
  { loc: 'https://timeatlas.co/meet', lastmod: '2026-04-10' },
  { loc: 'https://timeatlas.co/dev', lastmod: '2026-04-10' },
  { loc: 'https://timeatlas.co/journal', lastmod: today },
  { loc: 'https://timeatlas.co/about', lastmod: '2026-04-10' },
  { loc: 'https://timeatlas.co/privacy', lastmod: '2026-04-10' },
  { loc: 'https://timeatlas.co/terms', lastmod: '2026-04-10' },
];

const pairUrls = canonicalPairs.map((p) => ({
  loc: `https://timeatlas.co/${p.source_code.toLowerCase()}-to-${p.target_code.toLowerCase()}`,
  lastmod: today,
}));

const articleUrls = [...ARTICLES].map((slug) => ({
  loc: `https://timeatlas.co${articlePath(slug)}`,
  lastmod: today,
}));

const allUrls = [...staticUrls, ...articleUrls, ...pairUrls];

const urlEntries = allUrls
  .map((u) => `  <url>\n    <loc>${u.loc}</loc>\n    <lastmod>${u.lastmod}</lastmod>\n  </url>`)
  .join('\n\n');

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">

${urlEntries}

</urlset>
`;

writeFileSync(sitemapPath, xml);
console.log(
  `Sitemap generated: ${pairUrls.length} city pair URLs + ${articleUrls.length} article URLs + ${staticUrls.length} static URLs = ${allUrls.length} total.`
);
