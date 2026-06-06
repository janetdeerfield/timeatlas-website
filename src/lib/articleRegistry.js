/**
 * Article registry — JavaScript mirror of articleRegistry.ts
 * Used by generate-sitemap.mjs (Node.js, runs outside Vite).
 * Keep in sync: any new article slug must be added here AND in articleRegistry.ts.
 */
export const ARTICLES = ['handling-dst-conversions'];
export function articlePath(slug) {
  return `/journal/${slug}`;
}
