import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';

const repoRoot = resolve(new URL('.', import.meta.url).pathname, '..');
const cityPairsPath = resolve(repoRoot, 'src/app/data/cityPairs.ts');
const sitemapPath = resolve(repoRoot, 'public/sitemap.xml');

const cityPairsContent = readFileSync(cityPairsPath, 'utf8');
const sitemapContent = readFileSync(sitemapPath, 'utf8');

// 1. Collect statically-declared slugs (existing legacy pages)
const staticSlugMatches = [...cityPairsContent.matchAll(/slug:\s*'([^']+)'/g)];
const staticSlugs = staticSlugMatches.map((m) => m[1]);

// 2. Derive generated slugs from ZONE_CONFIGS slugPart values
const slugPartMatches = [...cityPairsContent.matchAll(/slugPart:\s*'([^']+)'/g)];
const slugParts = [...new Set(slugPartMatches.map((m) => m[1]))];

const generatedSlugs = slugParts.flatMap((from) =>
  slugParts.filter((to) => to !== from).map((to) => `${from}-to-${to}`),
);

const slugs = [...new Set([...staticSlugs, ...generatedSlugs])];

if (slugs.length === 0) {
  console.error('No city pair slugs found in src/app/data/cityPairs.ts');
  process.exit(1);
}

const missing = slugs.filter(
  (slug) => !sitemapContent.includes(`<loc>https://timeatlas.co/${slug}</loc>`),
);

if (missing.length > 0) {
  console.error('Missing city pair URLs in public/sitemap.xml:');
  for (const slug of missing) {
    console.error(`- /${slug}`);
  }
  process.exit(1);
}

console.log(`Sitemap check passed: ${slugs.length} city pair URL(s) found.`);
