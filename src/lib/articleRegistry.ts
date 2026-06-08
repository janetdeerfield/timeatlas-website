/**
 * Article registry — the single source of truth for article slugs.
 * Used by:
 *   - prerender.tsx     → registers /journal/:slug routes for SSR prerendering
 *   - generate-sitemap  → adds /journal/:slug URLs to sitemap.xml
 *   - Journal index     → links to individual article pages
 *
 * To publish a new article: add its slug here and drop the .md file in src/articles/.
 * The build pipeline handles the rest automatically.
 */

export const ARTICLES = ['iso-8601-vs-unix-timestamp', 'handling-dst-conversions'] as const;

export type ArticleSlug = (typeof ARTICLES)[number];

/** Prepend /journal/ to produce the full route path */
export function articlePath(slug: ArticleSlug): string {
  return `/journal/${slug}`;
}
