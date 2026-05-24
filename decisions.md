# Decisions

## 2026-05-08 — Remove "Hear the Time" from homepage

**Decision:** Remove the "Hear the Time" audio feature from the homepage entirely. Do not retain as feature flag.

**Reason:** Hero real estate is the highest-value surface on the site. The feature's user demand is unproven, while alternative uses for that space (Time Tools description, SEO content, clearer navigation) have known value. Earlier brief specified a Phase 6 decision based on performance cost; deciding earlier on a real-estate basis is a better criterion.

**Alternatives considered:** Keep with feature flag pending Phase 6 audit. Move to footer or About page. Rejected — neither earns the engineering cost of maintaining the audio asset.

**Reversibility:** Easy. Component code preserved in git history; can be reintroduced later if user research shows demand.

## 2026-05-10 - Phase 1 decision

**Decision:** Added a temporary component preview route at /dev-test-components for development QA only.

**Reason:** Team needs a single side-by-side workspace to verify V3 Phase 1 component variants before integrating each component into production pages.

**Alternatives considered:** Reviewing each component only in-page where it is used.

**Reversibility:** Easy.

## Deletion checklist

- [x] Remove /dev-test-components route before V3 production deploy — done, May 2026

**Implementation note:** The preview route is included in local production preview builds so reviewers can inspect component output after `npm run build && npm run preview`. It remains `noindex,nofollow` and must be removed before deployment.

## Clock digit typography (March 2026)

The HeroClock and all clock components site-wide render digits in Inter at
weight 800 with `font-variant-numeric: tabular-nums` enabled. See
src/app/components/LiveClock.tsx lines 138-157 for the canonical
implementation.

Why this matters:

- `tabular-nums` gives all digits equal horizontal width, so the clock
  doesn't visually jitter as digits change each second.
- As a side effect in Inter specifically, tabular figures use a redrawn
  "1" with a small horizontal foot at the base — designed by Rasmus
  Andersson to balance the wider digits at the same width.
- The foot is intentional brand identity, not a font bug.

What to preserve in any future refactor:

- Inter font family for clock digits (do not substitute with another font)
- Weight 800 specifically (700 reads as too light at clock display sizes)
- `font-variant-numeric: tabular-nums` (removing this loses both the
  alignment AND the foot on the 1)

Original design: #TeamTimeAtlas, Figma, March 2026.

## Why other text uses system fonts (May 2026)

Body text, headings, navigation, and all non-clock typography use the platform's system font stack. This is a deliberate performance choice: zero font network requests for ~95% of rendered content, faster FCP/LCP, no FOUT on body text. Inter remains loaded only for clock components, where it's brand-identity-critical. The slight cross-platform visual variation in body text is acceptable for a utility site.

## Fading seconds on clock displays (March 2026 + extended May 2026)

The hero clock on / uses a signature "fading seconds" visual treatment: the seconds digits (the third pair in 00:00:00) render at reduced opacity compared to hours and minutes. This establishes a visual hierarchy of importance: hours > minutes > seconds.

Design history: solid black seconds were distracting and visually competitive with the hours/minutes. Multiple alternatives were tested (smaller point size, solid gray, various opacity values). The current fade was the winner after iteration with #TeamTimeAtlas in March 2026.

Where this applies (as of [date PR 2 ships]):

- Hero clock on /
- "Time Zone Converter" clock on /convert
- "World Time" clocks on /world
- "UTC Time" clock on /dev
- City-pair page clocks
- Any other 00:00:00 display added in the future

The 00:00 displays (no seconds) inherit Inter 800 + tabular-nums but do not need fading treatment — they have no seconds digits to de-emphasize.

What to preserve in future refactors:

- The opacity/styling values established for the seconds digits (see ClockDigits component or .clock-seconds class for canonical values)
- The visual hierarchy hours > minutes > seconds

## Brand color (May 2026 correction)

The primary brand blue is #1B6BB3. Earlier work on city-pair pages used a purple accent that was not part of the brand palette. Corrected in May 2026 to #1B6BB3.

The brand palette as of May 2026:

- Primary blue: #1B6BB3 (links, accents, calls-to-action)
- [add other brand colors as you identify them]

Avoid introducing new accent colors without updating this file. If a feature needs a color that isn't in the palette, raise it for a palette decision, don't pick locally.

## Typography system — three tiers (May 2026)

The full typography system is three tiers, no exceptions:

| Content type          | Font                        | Why                                                                                     |
| --------------------- | --------------------------- | --------------------------------------------------------------------------------------- |
| Clock digits          | Inter 800 + `tabular-nums`  | Brand-critical; foot-on-1 design intent; no jitter. See "Clock digit typography" above. |
| Code / format strings | Monospace stack (see below) | Machine-readable output; character-width alignment matters.                             |
| Everything else       | System sans (`--font-sans`) | Zero network cost; utility site; body brand identity not a priority.                    |

**Monospace stack:**

```
ui-monospace, "SF Mono", "Cascadia Code", "Roboto Mono", Menlo, Monaco, Consolas, "Courier New", monospace
```

SF Mono on macOS, Cascadia Code on modern Windows, Roboto Mono on Android — all higher quality than the old `Monaco, Consolas, monospace` fallback chain. Zero network cost.

**Monospace applies to:** code blocks, format examples, ISO 8601 strings, Unix timestamps as format values, IANA timezone identifiers, any content showing what you'd type or paste into a terminal or API call.

**Monospace does not apply to:** live clock readouts (Inter 800), UI labels, body text, headings, navigation.

**Note on numeric live readouts** (Unix timestamps, milliseconds, time differences): these are clocks, not code. They tick. They use Inter 800 + tabular-nums, not monospace, even though they look code-like at a glance. The test: if the value changes on a timer, it's a clock.

## Branch and preview deployment policy (May 2026)

Preview deployments must include robots.txt Disallow and meta noindex,nofollow on every page. The hosting platform handles this automatically for non-production deploys (verify with: curl preview-url/robots.txt and grep meta robots in the HTML).

Production must have explicit meta robots="index,follow" and no Disallow in robots.txt.

After merging a preview branch:

1. Delete the local branch (git branch -d <branch>)
2. Delete the remote branch (git push origin --delete <branch>)
3. Verify the preview URL returns 404 within 24 hours

This prevents stale preview deploys from being indexed and prevents preview-mode noindex logic from accidentally persisting in main.

## DevTestComponents removal — final (May 2026)

DevTestComponents.tsx was a single-page visual catalog of the Phase 1 component library, used during March–April 2026 for component review during the design iteration phase. The page rendered 14 components in their multiple variants with realistic sample data.

Removed in May 2026 once the Phase 1 library was stable and no longer being actively iterated. Git history preserves the file at commit `7d2f51d` (the HEAD immediately before deletion) if a future component catalog is needed.

Why not keep it: the file lived in `src/app/pages/` alongside production pages, gated only by `import.meta.env.DEV`. The investigation report from 5/22 identified the gate as fragile — any future refactor of `routes.tsx` could accidentally expose it. The most likely root cause of the May 18–19 GSC noindex incident was a preview deployment of related infrastructure being crawled. Removing it eliminates this risk class entirely.

If component preview becomes useful again: adopt Storybook or Ladle as a dedicated tool, separated from production source. Do not re-add isolated preview pages to `src/app/pages/`.

## Phase completion checklist (May 2026)

Lesson from Phase 1: dev-only infrastructure created during a phase must be removed when the phase ships. Specifically:

- Dev preview routes (e.g. DevTestComponents)
- Feature flags for now-shipped features
- Branches created for review/iteration that have been merged
- Sample data files used during component design

These are not delete-later items. They are end-of-phase items. Add a "decommission" step to every phase plan from Phase 3 onward.

If component preview becomes useful again in future phases, adopt a real tool (Storybook, Ladle) rather than re-creating ad-hoc preview pages in src/app/pages/.
