import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';

const repoRoot = resolve(new URL('.', import.meta.url).pathname, '..');
const cityPairsPath = resolve(repoRoot, 'src/app/data/cityPairs.ts');
const sitemapPath = resolve(repoRoot, 'public/sitemap.xml');

const cityPairsContent = readFileSync(cityPairsPath, 'utf8');
const sitemapContent = readFileSync(sitemapPath, 'utf8');

const slugMatches = [...cityPairsContent.matchAll(/slug:\s*'([^']+)'/g)];
const slugs = [...new Set(slugMatches.map((match) => match[1]))];

if (slugs.length === 0) {
  console.error('No city pair slugs found in src/app/data/cityPairs.ts');
  process.exit(1);
}

const missing = slugs.filter(
  (slug) => !sitemapContent.includes(`<loc>https://timeatlas.co/${slug}</loc>`)
);

if (missing.length > 0) {
  console.error('Missing city pair URLs in public/sitemap.xml:');
  for (const slug of missing) {
    console.error(`- /${slug}`);
  }
  process.exit(1);
}

console.log(`Sitemap check passed: ${slugs.length} city pair URL(s) found.`);
