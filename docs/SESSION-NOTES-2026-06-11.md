# SEO Recovery Session Notes — 2026-06-10/11

Working summary of the TimeAtlas SEO recovery session. Context for future
sessions and contributors.

## The problem

Impressions collapsed from ~19.5K (Apr 1–May 24, avg position 51.6, 7 clicks)
to ~130 over two weeks. The cliff coincided exactly with the May 24 V3
relaunch (this repo's history begins May 22 — the entire repo IS the V3
rebuild that replaced the original Figma Make site).

## Root causes found and FIXED (all live as of 2026-06-11)

1. **Article pages prerendered as empty shells.** ArticlePage loaded content
   in `useEffect` (never runs in SSR) → blank title, no meta/canonical/schema,
   zero body text. Fixed: synchronous resolve during render.
2. **Stale `src/lib/articleRegistry.js`** shadowed the `.ts` registry in Vite
   resolution, silently unpublishing newly registered articles. Deleted.
   NEVER re-add a .js mirror of this file.
3. **Soft-404s**: unknown URLs returned the prerendered HOMEPAGE with HTTP 200
   (homepage canonical + index,follow). Fixed in `.htaccess`: real 404 status
   serving prerendered `404.html`.
4. **Privacy/Terms were `noindex,follow`** — AdSense blocker. Now indexable.
5. **`llms.txt` never deployed** (was at repo root, not `public/`) and had
   placeholder links. Fixed and deployed with real URLs.
6. **Sitemap lastmod churn** (build date restamped on 460+ URLs every build).
   Now stable constants in `scripts/generate-sitemap.mjs` + article
   frontmatter dates. Bump constants when content actually changes.
7. www → apex 301 added (before HTTPS rule, single hop); Organization JSON-LD
   logo now the square 480×480 asset.

## Shipped features

- `/news` Dispatch page (NewsHub + NewsTicker + DstTracker, all SSR-safe:
  styles render inline, DST data is a typed module `src/app/data/dstPolicy.ts`
  so the 50-state table prerenders). News cards render UNLINKED until
  `/news/*` detail pages exist — never link to a 404.
- 4 journal articles live and fully prerendered: iso-8601-vs-unix-timestamp,
  handling-dst-conversions, est-to-pst, b2b-scheduling-blueprint.
  (Note: `/est-to-pst` pair page and `/journal/est-to-pst` article are
  different URLs by design.)
- `/contact` page with ContactPage schema (PR #29) — completes the
  About/Contact/Privacy/Terms trust set for AdSense.

## Deploy: how it actually works

- **All 21 automated FTP deploys (runs #1–#21) failed in ~5s** because the
  workflow referenced `FTP-Deploy-Action@v4.3` — a nonexistent tag — and used
  v3 input names. FTP credentials were NEVER tested. Copilot's PR #26 removed
  the FTP step entirely (green runs ≠ deployed).
- Current model (PR #29): push to main = build + verify only; FTP upload runs
  ONLY via manual "Run workflow" (workflow_dispatch), pinned to v4.3.6.
  To enable: create a Hostinger FTP account scoped to `public_html`, add repo
  secrets `FTP_SERVER`, `FTP_USERNAME`, `FTP_PASSWORD`.
- Until then: owner builds locally, visually previews, uploads `dist/`
  contents to `public_html` as a zip → extract (preserves `journal/` subdir
  and hidden `.htaccess`; flat file-picker uploads overwrite the pair page
  with the article — both are named `est-to-pst.html`).
- The old red ✗ runs in the Actions tab are permanent history, not recurring
  failures.
- **Local builds require Node >= 22.18** (build scripts import `.ts` via
  Node's type stripping). Older Node fails in `generate-sitemap.mjs` with
  "Unknown file extension .ts".

## Open items (priority order)

1. **Hostinger WAF returns 403 to ALL non-browser agents** (verified on every
   URL incl. robots.txt). Blocks AI crawlers (GPTBot/ClaudeBot/Perplexity),
   link unfurlers, SEO tools → kills AEO/GEO/citations. Premium plan has no
   bot allowlisting. Plan: (a) Kodee-guided path exemption for /llms.txt,
   /robots.txt, /sitemap.xml now; (b) Cloudflare Free in front (verified-bot
   allow + CDN) this week. Googlebot currently gets through (site is indexed)
   but verify via GSC Crawl Stats / "Test live URL".
2. GSC: sitemap resubmitted 6/11; indexing requested for home, about,
   privacy, terms, news, journal + 4 articles. `/contact` indexing must be
   RE-requested after PR #29 deploys (first request hit a 404).
3. Owner to provide GSC exports: Pages indexing report, Crawl Stats,
   Performance (Apr 1–May 24 vs May 25–now).
4. News Dispatch items need editorial fact-check against primary sources
   (one fabricated item, "TimeAtlas Chrono-Map v3.2", was already removed).
5. Phase 2 growth: 1–2 long-tail journal articles/week interlinked to pair
   pages; Bing Webmaster Tools + IndexNow; directory submissions and
   backlinks (site currently has ZERO found); /dev IANA docs is the most
   linkable asset. Brand collision: unrelated timeatlas.com dominates brand
   queries.
6. AdSense path: 15–25+ substantive articles, indexed trust pages, real
   traffic. Re-add accurate ad disclosure to Privacy WHEN AdSense integrates.
   Realistic: 2–3 months of consistent publishing.
7. Expect impressions recovery 4–8 weeks post-fix (live 2026-06-11).

## Competitive context

timeanddate.com, time.is, worldtimebuddy, savvytime, dateful own the head
terms (millions of backlinks). Growth = long-tail content + answer-engine
visibility + citations, not head-term rankings.

## Workflow rules learned the hard way

- Never commit directly to `main` (locally or on GitHub) while a feature
  branch/PR is open — caused the conflict + briefly re-shipped fixed bugs.
- Main only moves by merging PRs; local main only moves by pulling.
- Journal images come in 1x + `-2x` pairs (srcset). Swapping one without the
  other shows the old image on retina displays.
