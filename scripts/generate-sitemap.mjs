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

// lastmod must reflect when page CONTENT meaningfully changed — not the build
// date. Stamping the build date on every URL each deploy (the previous
// behavior) churns 460+ lastmods per release and teaches crawlers to distrust
// the field entirely. Bump these constants manually when the corresponding
// pages actually change.
const STATIC_PAGES_LASTMOD = '2026-06-07'; // V3 schema patch / FAQ update
const PAIR_PAGES_LASTMOD = '2026-06-07'; // bump when pair-page template or data changes

// Articles carry their real dates in frontmatter: updatedAt if present,
// otherwise publishedAt.
function articleLastmod(slug) {
  const md = readFileSync(resolve(repoRoot, `src/articles/${slug}.md`), 'utf8');
  const frontmatter = md.split('---')[1] ?? '';
  const date = (key) => frontmatter.match(new RegExp(`^${key}:\\s*'?([0-9-]+)'?`, 'm'))?.[1];
  return date('updatedAt') ?? date('publishedAt') ?? STATIC_PAGES_LASTMOD;
}

const articleUrls = [...ARTICLES].map((slug) => ({
  loc: `https://timeatlas.co${articlePath(slug)}`,
  lastmod: articleLastmod(slug),
}));

// The journal index changes whenever its newest article does.
const journalLastmod = articleUrls.map((a) => a.lastmod).sort().at(-1) ?? STATIC_PAGES_LASTMOD;

const staticUrls = [
  { loc: 'https://timeatlas.co/', lastmod: STATIC_PAGES_LASTMOD },
  { loc: 'https://timeatlas.co/convert', lastmod: STATIC_PAGES_LASTMOD },
  { loc: 'https://timeatlas.co/world', lastmod: STATIC_PAGES_LASTMOD },
  { loc: 'https://timeatlas.co/meet', lastmod: STATIC_PAGES_LASTMOD },
  { loc: 'https://timeatlas.co/dev', lastmod: STATIC_PAGES_LASTMOD },
  { loc: 'https://timeatlas.co/journal', lastmod: journalLastmod },
  { loc: 'https://timeatlas.co/about', lastmod: STATIC_PAGES_LASTMOD },
  { loc: 'https://timeatlas.co/privacy', lastmod: STATIC_PAGES_LASTMOD },
  { loc: 'https://timeatlas.co/terms', lastmod: STATIC_PAGES_LASTMOD },
];

const pairUrls = canonicalPairs.map((p) => ({
  loc: `https://timeatlas.co/${p.source_code.toLowerCase()}-to-${p.target_code.toLowerCase()}`,
  lastmod: PAIR_PAGES_LASTMOD,
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
