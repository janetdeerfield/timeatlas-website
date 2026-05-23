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

- [ ] Remove /dev-test-components route before V3 production deploy

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

