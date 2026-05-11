# TimeAtlas — V3 Build Brief (Executable)

**Status:** Source of truth for the V3 build. Replaces all prior briefs. **Audience:** Cursor (or any AI coding agent), with human review at each phase gate. **Repo:** Local filesystem → GitHub feature branches → `npm run build` → manual upload to Hostinger.

---

## How to use this document

1. Read Section 0 (Build rules) before any work. These rules apply to every section.
2. Phases are sequenced. Do not skip ahead — later phases depend on earlier ones.
3. Each phase has a **goal**, **tasks**, **acceptance criteria**, and **out of scope** notes.
4. After completing a phase, run the verification commands at the end of that phase before moving on.
5. All work happens on feature branches: `git checkout -b v3-phase-{N}-{shortname}`. Never commit directly to `main`.

---

## Section 0 — Build rules (apply to all phases)

### Source of truth

- Local filesystem is the source of truth.
- Code edits happen in the editor. Changes are reviewed via `git diff` before commit.
- Feature branches only. Merge to `main` only after local preview confirms correctness.
- `npm run build && npm run preview` (or equivalent for the framework) is the required pre-deploy check.
- Manual upload of `dist/` to Hostinger. No auto-deploy.

### Performance budget

- **Mobile PageSpeed: 85–90+ (good range)**
- **Desktop PageSpeed: 95–100**
- **Accessibility: 95–100**
- **SEO: 100**
- **CLS \< 0.1**
- **LCP \< 2.5s on mobile**

If any change pushes mobile PSI below 85, it gets reworked or rolled back, regardless of feature value.

### Hydration safety

- All time-displaying elements must use a client-only render pattern (mount-then-update). Server renders a placeholder; client takes over after mount.
- Never render `new Date()` or any zone-dependent value during SSR/SSG without a client-only wrapper.
- Standard pattern: a `<ClientOnlyTime>` component or `useClientOnly()` hook, used universally.
- Placeholder format: `--:--:--` for clocks, `--` for offsets, blank for relative time (e.g., "X hours ahead").

### Accessibility baseline

- Every interactive element has an accessible name (visible text, `aria-label`, or `aria-labelledby`).
- Every navigable element passes WCAG AA contrast (4.5:1 for body, 3:1 for large text and UI).
- Focus states visible on all interactive elements. Never `outline: none` without a replacement.
- Keyboard navigation works for every flow. Test with Tab/Enter/Esc/Arrow keys.
- Heading hierarchy is correct: one H1 per page, no skipped levels.

### Anchor-by-default rule

**Any UI element that represents a different page on the site must render as a real `<a href>` anchor element.** This applies to:

- Zone tiles on `/convert`
- City cards on `/world`, homepage, and meeting planner
- Converter cards anywhere they appear
- Region tabs on `/world`
- All "related" / "popular" / "convert from X" link blocks

UI interactivity (hover states, click handlers) can layer on top, but the underlying element must be a crawlable anchor with a real href.

### Component-first

- Pages compose from components. Pages do not contain bespoke layout code.
- New components live in a single shared library. No duplication across pages.
- A component is built once, reviewed for accessibility and hydration safety, then reused.

### Verb vocabulary

Use these verbs consistently in UI microcopy. Do not introduce synonyms.

| Verb    | Use for                                                           |
| :------ | :---------------------------------------------------------------- |
| Convert | Time zone conversion (hero CTA on `/convert`, converter pages)    |
| Compare | Side-by-side time comparison (the 24-row table, multi-city views) |
| Observe | Read-only viewing (current time, world clock)                     |
| View    | Navigate to a detail page (city detail, learn pages)              |
| Save    | Persist user state (premium-tier feature, future)                 |

### Editorial language rules

TimeAtlas communicates trust through measured, observational language. The following words are prohibited across all UI copy, microcopy, meta descriptions, learn pages, and marketing surfaces. They introduce performative precision, manufacture anxiety, or import marketing-speak that conflicts with the observatory tone.

**Prohibited:**

- "exact" / "exactly" — overpromises absolute precision the system cannot guarantee. Worse, it primes users to scrutinize the claim and notice imprecision they would otherwise have ignored. Reference: Time.is uses "Exact time" alongside "your clock is wrong by X seconds," producing a self-defeating contradiction that creates user anxiety.
- "perfect" / "perfectly" — same failure mode as "exact." Promises an absolute that any honest system will sometimes fail.
- "supercharge" / "optimize" / "maximize" — productivity-software language that conflicts with the observatory tone.
- "powerful" / "powerful tools" — empty intensifier. The tools should demonstrate capability, not announce it.
- "AI-powered" / "smart" / "intelligent" (as marketing claims) — observatory tone is calm competence, not announced cleverness.
- "instantly" / "lightning-fast" — performative urgency.
- "seamlessly" / "effortlessly" — these are the words a product uses when it isn't.
- "revolutionary" / "next-generation" / "game-changing" — marketing posture.

**Preferred terminology:**

- "accurate" — claims correctness without claiming absolute precision. Fit for purpose.
- "precise" — claims fine-grained correctness in a specific dimension. Use when the precision is the point.
- "current" — for live data ("current time," "current UTC offset")
- "local" — for user-relative values ("local time," "your local time")
- "synchronized" / "coordinated" — for relationship between zones or systems
- "observed" — for data states ("DST is observed in this region")
- "calm" / "measured" / "considered" — when describing the product's character (used sparingly)

**Why this matters:** "Accurate" is a relative claim — accurate to a reasonable degree, trustworthy enough, fit for purpose. The user accepts it without scrutiny. "Exact" is an absolute claim that invites scrutiny and creates cognitive load. Every word that requires the user to evaluate the system's honesty is friction. The observatory should reduce friction, not generate it.

When in doubt, choose the word that does the least work. A claim the user can accept without thinking is a stronger claim than one they have to evaluate.

### What not to introduce

- No "productivity" / "supercharge" / "optimize" / "AI-powered" copy
- No marketing modal popups, no email capture overlays, no exit-intent prompts
- No third-party widgets above the fold
- No new fonts beyond what's already in the system
- No new accent colors beyond the existing token set

---

## Section 1 — Visual identity (current state, locked for V3)

### Color tokens (locked)

\[Base\]

bg/base \#F7F8FA

bg/card \#FFFFFF

bg/subtle \#F1F3F5

bg/elevated \#E9ECEF

\[Text\]

text/primary \#0F172A

text/secondary \#475569

text/tertiary \#CBD5E1

text/muted \#94A3B8

text/inverse \#FFFFFF

\[Accents\]

accent/convert \#3B82F6

accent/meet \#10B981

accent/world \#1E3A8A

accent/dev \#334155

\[Borders\]

border/subtle \#E2E8F0

border/medium \#E5E7EB

border/strong \#CBD5E1

\[Gradient/atmosphere\]

start \#8495CB

mid \#3A5FB8

end \#06B6D4

These tokens are exported as CSS custom properties in `src/styles/tokens.css` (or equivalent). Every component reads from tokens. No hex values inline in components.

### Logo (placeholder for V3)

Current logo wordmark \+ alarm-clock icon is **placeholder only**. It functions for V3 but will be replaced post-V3 with an icon that matches the observatory metaphor (analog clock face, compass rose, astrolabe, or similar — TBD).

Required asset variants for V3:

- `timeatlas-logo-color.svg` — current gradient wordmark, current alarm-clock icon, on transparent background
- `timeatlas-logo-mono-dark.svg` — solid `text/primary` (\#0F172A) version
- `timeatlas-logo-mono-light.svg` — white version for dark surfaces
- `timeatlas-icon-only.svg` — icon without wordmark, three color variants
- `favicon.ico` — black icon (image 4 in source assets), tested at 16×16 and 32×32 for legibility
- `apple-touch-icon.png` — 180×180, black icon on white background
- PWA icons: 192×192 and 512×512

### Typography (locked)

Current font stack stays. No changes in V3.

---

## Section 2 — Component library (Phase 1\)

**Goal:** Build the reusable components that all subsequent phases compose from. Every component is anchor-by-default where applicable, hydration-safe, accessibility-compliant, token-driven.

**Branch:** `v3-phase-1-components`

### Components to build

#### CityZoneTile

- Renders as `<a href="...">` always. Never as a div or button.
- Props: `name`, `country`, `currentTime` (string), `utcOffset`, `tzAbbreviation`, `href`, optional `flag`, optional `onClick` (composes with anchor, doesn't replace it)
- Variants: `compact` (homepage row), `standard` (`/world` grid), `with-flag`, `offset-only`
- States: default, hover, focus-visible, active
- Hydration: `currentTime` defaults to `--:--:--` server-side; client updates after mount
- Accessibility: aria-label includes city \+ country \+ current time after mount

#### ConverterCard

- Renders as `<a href="/{source}-to-{target}">` always.
- Props: `sourceCode`, `targetCode`, `currentExampleTime` (optional, e.g., "9:00 AM → 12:00 PM"), `href`
- Variants: `small` (12/row), `medium` (6/row), `large` (featured)
- States: default, hover, focus-visible

#### InternalLinkBlock

- Renders a heading \+ grid of crawlable anchor links.
- Props: `title` (e.g., "Convert from EST"), `links` (array of `{label, href}`)
- Variants: `convert-from`, `convert-to`, `popular`, `related`
- All links are anchor-by-default. No JS-only links.
- Layout: 2-column on mobile, 5-column on desktop, automatic wrap

#### FaqItem

- Collapsible Q\&A with FAQPage schema.
- Props: `question`, `answer` (can be JSX or plain text)
- Emits Schema.org `Question` / `Answer` markup in the rendered HTML
- Default state: closed on mobile, open on desktop (configurable per-page)
- Accessibility: button with aria-expanded, panel with aria-hidden synced to state

#### CopyToClipboardButton

- Tiny inline button, copies a text value, shows transient confirmation.
- Props: `value` (string to copy), `label` (aria-label, e.g., "Copy UTC time")
- States: default, copied (1500ms feedback)
- Used on `/dev`, converter pages (current times), `/meet` (shareable URL)

#### AddToCalendarButtonGroup

- Group of 4 buttons: Google Calendar, Outlook, iCal download, Yahoo.
- Props: `eventTitle`, `startTime` (ISO 8601 with timezone), `endTime`, `description`
- Each button generates the appropriate calendar URL or .ics file
- Used on `/meet`, future feature on converter pages

#### ShareLinkButton

- Single button: copies the current URL with state encoded as query params.
- Props: `state` (object → query params), `label`
- States: default, copied
- Used on `/meet`, optional on converter pages

#### RegionTabBar

- Horizontal tab bar driving URL state.
- Props: `regions` (array), `activeRegion`, `onChange` (updates URL)
- Renders as `<a href>` tabs (not buttons), anchor-by-default
- Tabs: All / Americas / Europe / Africa / Middle East / Asia / Pacific
- Used on `/world`, future `/cities` index

#### CitySearchInput

- Type-ahead search returning CityZoneTile results.
- Props: `cities` (data source), `onSelect`
- Accessibility: combobox role, aria-activedescendant, keyboard navigation (Up/Down/Enter/Esc)
- Used on `/world`, `/convert`, `/meet`

#### DstScheduleBlock

- Compact display of DST start/end dates for one or two zones.
- Props: `zones` (1 or 2 zone records from zones.json), `currentYear`
- Conditional rendering based on each zone's `observes_dst` flag
- Used on every converter page, every city page (when those exist)

#### SwapButton

- Prominent button on converter pages: "Convert {target} → {source} instead."
- Props: `currentSource`, `currentTarget`, generates `href={/${target}-to-${source}}`
- Renders as `<a>`, not `<button>` (since it navigates to a different page)

#### CodeExampleTabbed

- Tabbed code block with copy button per tab.
- Props: `examples` (array of `{language, code}`)
- Languages required for V3: JavaScript, Python, Ruby, Go, PHP, Java, C\#, SQL
- Used on `/dev` and `/dev/*` pages
- Accessibility: tablist role, keyboard navigation (Left/Right/Home/End)

#### ClientOnlyTime (utility component)

- Wrapper that renders placeholder server-side, real time client-side after mount.
- Props: `placeholder` (default `--:--:--`), `children` (render prop receiving `mounted: boolean`)
- Internal: `useState(false)` \+ `useEffect(() => setMounted(true), [])`
- Every clock-displaying element wraps with this or uses the underlying hook

### Acceptance criteria for Phase 1

- All 13 components live in `src/components/` (or equivalent), with TypeScript types
- Each component has a Storybook entry or equivalent documentation page (optional but recommended)
- Each component passes axe-core accessibility tests
- No component renders `new Date()` or zone math during SSR
- All anchor-rendering components emit valid `<a href="...">` in the static HTML output
- Token usage verified: zero hex values inline outside `tokens.css`

### Verification commands

npm run build

\# Inspect dist/ HTML output for components — confirm anchors render with href

grep \-r "href=" dist/ | head \-20

\# Lighthouse audit on built output

npx lighthouse http://localhost:4173 \--view

### Out of scope for Phase 1

- Connecting components to data (Phase 3\)
- Refactoring existing pages (Phase 4 onward)
- Building the API or `/dev` sub-pages (Phase 7\)

---

## Section 3 — Data schema (Phase 2\)

**Goal:** Establish the data tables that drive the converter template uniqueness engine. Expand zone coverage from 11 to \~25.

**Branch:** `v3-phase-2-data`

### File structure

data/

├── zones.json

├── pairs.json

└── README.md

### zones.json schema

Each zone record contains:

{

code: string, // e.g., "EST"

name: string, // e.g., "Eastern Standard Time"

short_name: string, // e.g., "Eastern Time"

category: "civil_zone" | "reference_standard",

utc_offset_minutes: number,

utc_offset_display: string, // e.g., "−05:00"

observes_dst: boolean | "partial",

dst: {

    summer\_code?: string,          // e.g., "EDT"

    summer\_name?: string,

    summer\_offset\_minutes?: number,

    summer\_offset\_display?: string,

    start\_rule?: string,

    end\_rule?: string,

    start\_date\_current\_year?: string,  // ISO date

    end\_date\_current\_year?: string,

    start\_clock\_change?: string,

    end\_clock\_change?: string,

    note?: string

},

iana: {

    primary: string,

    all: string\[\]

},

military_code: {

    name: string | null,

    letter: string | null,

    note?: string

},

countries: Array\<{

    name: string,

    population: number | null,

    observes\_dst: boolean | "partial",

    note?: string

}\>,

principal_cities: Array\<{

    name: string,

    country: string,

    population: number,

    iana: string,

    is\_capital?: boolean,

    is\_financial\_hub?: boolean,

    observes\_dst?: boolean

}\>,

notable_institutions: Array\<{

    name: string,

    abbreviation?: string,

    city: string,

    category: string,

    trading\_hours\_local?: string

}\>,

geography: {

    description: string,

    longitude\_center: number

},

history: {

    adopted\_year: number,

    note: string

}

}

### Zones to include in V3 (25 total)

**Existing 11 (audit and update):** EST, CST, MST, PST, AKST, HST, UTC, GMT, CET, IST, JST

**New 14 to add:**

- **Australia/NZ:** AEST, AEDT, ACST, AWST, NZST, NZDT
- **Asia-Pacific:** SGT (Singapore), HKT (Hong Kong), KST (Korea)
- **South America:** BRT (Brasília), ART (Argentina), CLT (Chile), COT (Colombia)
- **Middle East:** GST (Gulf, UAE)

For each new zone, populate the same field set as the existing 11\. City populations are city proper, rounded to thousands. DST dates use the current year (2026).

### pairs.json schema

{

source_code: string,

target_code: string,

dst_relationship: "synchronized" | "desynchronized" | "asymmetric" | "neither",

sample_source_city: string,

sample_target_city: string,

meeting_overlap: {

    start\_source: string,           // "HH:MM"

    end\_source: string,

    start\_target: string,

    end\_target: string,

    preferred\_default: string,      // e.g., "13:00 EST / 10:00 PST"

    note?: string

},

meeting_difficulty: "easy" | "moderate" | "hard",

notable_pairing: string, // 1-3 sentences of context

flight_route?: {

    primary\_route: string,          // e.g., "JFK ↔ LAX"

    average\_flight\_time\_minutes: number,

    direct\_flights\_available: boolean,

    note?: string

},

common_use_cases: string\[\]

}

### Pair generation strategy

With 25 zones × 24 directional pairs \= 600 directional pairs total. Generate in priority order:

**Priority 1 (must ship in V3):** \~250 pairs covering the 11 original zones in all directions, plus Australia/NZ ↔ US/UK/Asia (the highest-search-volume pairs for the new zones)

**Priority 2 (ship if time permits):** Remaining \~350 pairs

For each pair, only seven fields require human curation: `dst_relationship`, `meeting_overlap`, `meeting_difficulty`, `notable_pairing`, both sample cities, and optional `flight_route`. Everything else derives from `zones.json` at render time.

### Acceptance criteria for Phase 2

- `zones.json` contains 25 fully populated records, validated against the schema
- `pairs.json` contains at minimum 250 records (Priority 1), validated against the schema
- A schema validator script exists (`scripts/validate-data.ts`) and passes
- DST dates verified against IANA tz database for current year
- City populations verified within last 5 years
- Edge cases documented inline in the data: Mexico's DST abolition, Arizona's non-observance, Yukon's PDT-year-round, Sri Lanka's UTC+5:30 with separate IANA, half-hour offset zones (IST has no military code)

### Out of scope for Phase 2

- Rendering pages from this data (Phase 4\)
- City-level pages (future phase, beyond V3)

---

## Section 4 — Converter page template (Phase 3\)

**Goal:** Refactor the converter page template to be data-driven, hydration-safe, and substantively unique across all pairs.

**Branch:** `v3-phase-3-converter-template`

### Template structure (in render order)

#### Section 4.1 — Hero converter

- Live converter UI: source zone time → target zone time
- Both times use `<ClientOnlyTime>` wrapper (placeholder `--:--:--` server-side)
- `<SwapButton>` prominently placed: "Convert {target} → {source} instead"
- Source and target zone display: full name \+ short name \+ offset (from `zones.json`)

#### Section 4.2 — Time difference statement (intro paragraph)

Conditional template selected by `pair.dst_relationship`:

**`synchronized`:**

"{source.short_name} and {target.short_name} both observe daylight saving time on the same schedule, so the {derived_diff} between {sample_source_city} and {sample_target_city} stays constant year-round."

**`desynchronized`:**

"{source.short_name} and {target.short_name} both observe daylight saving but on different schedules, so for {weeks} weeks each year the usual {std_diff} gap shifts to {variant_diff}."

**`asymmetric`:**

"{country_without_dst} does not observe daylight saving time, but {country_with_dst} does — so the gap between {sample_source_city} and {sample_target_city} shifts from {std_diff} to {dst_diff} when {observing_country}'s clocks {direction} in {month}."

**`neither`:**

"Neither {source.country} nor {target.country} observes daylight saving time, so the {derived_diff} between {sample_source_city} and {sample_target_city} is constant every day of the year."

#### Section 4.3 — "Why does {SOURCE} differ from {TARGET}?"

3 sentences, generated:

- Sentence 1: Longitudinal separation derived from `geography.longitude_center` of both zones
- Sentence 2: Geographic anchor of each zone (one phrase from each `geography.description`)
- Sentence 3: Pull from `pair.notable_pairing`

#### Section 4.4 — Quick reference comparison table

Two columns. Rows pulled from each zone's record:

- UTC offset
- During DST (or "Does not observe DST")
- IANA primary
- Observes DST (Yes/No)
- Military code
- Primary country
- Largest city \+ population
- Time right now (wrapped in `<ClientOnlyTime>`)

#### Section 4.5 — Compare Times table

24 rows, full day. For zones with 30-minute offsets (IST, NPT, ACST), use natural half-hour increments. Each row: source time | target time, both 12h and 24h formats. Optional: highlight the row matching current time (client-only, after mount).

#### Section 4.6 — Best meeting times

Pulls from `pair.meeting_overlap`:

"The best window to schedule a meeting between {source} and {target} is **{overlap_start_source} – {overlap_end_source} {source.code}**, which is **{overlap_start_target} – {overlap_end_target} {target.code}**. {pair.meeting_overlap.note (if present)}"

If `pair.meeting_difficulty === "hard"`, append:

"Because the gap is large, most teams working across these zones use asynchronous hand-offs rather than live meetings."

#### Section 4.7 — DST handling

Variant content based on `pair.dst_relationship`. Use `<DstScheduleBlock>` component.

- `synchronized`: 1 paragraph \+ DST dates (both zones change on same date)
- `desynchronized`: Mini timeline showing 4-5 distinct periods across the year
- `asymmetric`: 1 paragraph \+ DST dates for the observing zone only
- `neither`: 1 sentence emphasizing the constant offset

#### Section 4.8 — Cities and institutions in each zone

Two columns. Pulls `principal_cities` (top 5–7) and `notable_institutions` (top 3–4) from each zone. Each city name is an anchor link to `/time/{city-slug}` (placeholder routes for now; real pages built later).

#### Section 4.9 — FAQ (5 items)

Each rendered with `<FaqItem>` (FAQPage schema).

1. "What is the time difference between {source} and {target}?" — derived
2. "How do I convert {source} to {target}?" — derived
3. "What's the best time for meetings across {source} and {target}?" — from `pair.meeting_overlap`
4. "Does daylight saving time affect {source} to {target} conversion?" — from `pair.dst_relationship`
5. "Does {source} or {target} change with daylight saving?" — from each zone's `observes_dst`

#### Section 4.10 — Internal link blocks

Three `<InternalLinkBlock>` components, all crawlable anchors:

- **"Convert from {source}"** — query: all pairs where `source_code === current.source_code`, exclude self. \~10 links.
- **"Convert to {target}"** — query: all pairs where `target_code === current.target_code`, exclude self. \~10 links.
- **"Popular conversions"** — site-wide curated list. Same on every page. \~10 links.

#### Section 4.11 — Learn more

3–4 contextual `<a>` links to `/learn/*` pages (built in Phase 5):

- Always link to: `/learn/dst`
- If pair involves UTC: link to `/learn/utc`
- If pair involves GMT: link to `/learn/gmt`
- If pair involves IST/JST/AEST: link to `/learn/iana-time-zones`

### Template variants

For UTC (which is `category: "reference_standard"`, not `civil_zone`):

- "Cities and institutions" section adapted: "Used by" instead of cities, listing reference contexts (servers, aviation, scientific)
- DST handling: skipped, replaced with note that UTC does not observe DST by definition
- Geography section: adapted to describe UTC as global reference rather than geographic

### Acceptance criteria for Phase 3

- A single template renders all 250+ pairs from `pairs.json`
- Generated HTML for `/est-to-pst` shows \~80% unique content (current ratio: \~40%)
- All time displays wrap with `<ClientOnlyTime>`
- All internal links are real `<a href>` anchors
- FAQPage schema validates in Google Rich Results Test
- Manual review of 10 sample pairs (covering all 4 DST relationship variants \+ UTC) confirms correct content rendering

### Verification commands

\# Build and inspect a sample page

npm run build

cat dist/est-to-pst/index.html | grep \-E "(\<a |\<h\[1-6\]|application/ld\\+json)"

\# Validate FAQ schema

\# Use https://search.google.com/test/rich-results

\# Diff content between two pages — should be substantively different

diff \<(cat dist/est-to-pst/index.html) \<(cat dist/ist-to-jst/index.html) | wc \-l

\# Expect this number to be large (\>500 lines of difference)

### Out of scope for Phase 3

- Building city detail pages (`/time/{city}` — links exist as placeholders only)
- Building learn pages (Phase 5\)
- Adding the API documentation (Phase 7\)

---

## Section 5 — Main page rebuilds (Phase 4\)

**Goal:** Bring `/`, `/convert`, `/world`, `/meet` into the new component system. Fix the link-graph holes.

**Branch:** `v3-phase-4-main-pages`

### 5.1 Homepage (`/`)

- Hero clock displays user's local time (geo-detect via browser API; fallback to UTC if unavailable)
- "Change default city" link near hero allows manual override (stored in localStorage)
- New "Popular Conversions" row: 10 `<ConverterCard>` components
- "U.S. Time Zones" block links to `/learn/us-time-zones` (placeholder until Phase 5; route resolves to a stub page that says "Coming soon")
- "Hear the Time" button: keep but lazy-load audio asset only on click. **Feature flag `ENABLE_HEAR_THE_TIME`. If Phase 8 audit shows it costs measurable performance, set flag to false and remove from UI.**
- Cities row: each card → `<CityZoneTile>` (anchor-rendered)
- Footer: replace generic `github.com` and `linkedin.com` placeholder links with real TimeAtlas profiles or remove until profiles exist

### 5.2 `/convert`

**Highest-priority change in V3.** The current "Common Time Conversions" zone tiles are non-anchor UI elements; they must become crawlable links.

- "Common Time Conversions" zone tiles: render each as an interactive panel that, when activated, expands to show all 24 destination converter pairs as `<ConverterCard>` anchors. The panel content must exist in the static HTML (not JS-injected) so Google can crawl it.
- New "All Conversions" directory section: compact grid of all 600 converter pairs (or 250 P1 pairs), grouped by source zone. Visually low-contrast, but every cell is a real anchor.
- "Time Explained" accordion content moves to `/learn/*` pages (Phase 5). Replace with a small "Learn more" `<InternalLinkBlock>` linking to relevant learn pages.
- Expand city dropdown from 16 to 50+ (use cities from the 25 zones in `zones.json`)
- All `<FaqItem>` instances use FAQPage schema

### 5.3 `/world`

- Add `<RegionTabBar>` at top: All / Americas / Europe / Africa / Middle East / Asia / Pacific
- Each tab updates URL (`/world/asia`, `/world/europe`, etc.) and filters cities
- Add `<CitySearchInput>` above the grid
- Every city card → `<CityZoneTile>` (anchor-rendered, links to `/time/{city-slug}` placeholder route)
- Expand from 16 to \~50 cities. Priority adds: Toronto, Mumbai, São Paulo, Hong Kong, Seoul, Lagos, Istanbul, Karachi, Bangkok, Auckland, Shanghai, Buenos Aires, Johannesburg, Mexico City, Manila, Jakarta, Cairo, Riyadh, Dubai, Singapore
- "Convert this city's time" affordance on each tile: tap reveals 3-5 quick-convert links

### 5.4 `/meet`

- Shareable meeting URLs: state encoded in query params (`?cities=nyc,ldn,brl&time=14:00&date=2026-05-12`). On page load, rehydrate state from URL.
- Add `<ShareLinkButton>` near the result display
- Add `<AddToCalendarButtonGroup>` (Google, Outlook, iCal, Yahoo)
- Customizable working hours per city (default 9–17, user override stored in URL state)
- Expand cities to 50+ (same list as `/world`)
- Add a "How to schedule meetings across time zones" section beneath the tool. Content covers: US↔Europe overlap, US↔Asia overlap, EU↔India overlap, async-only pairs (LA↔Singapore). 4–6 paragraphs total.

### 5.5 Add Clock Icon to `/convert` page (visual parity)

Per the V3 brief: `/convert` currently lacks the icon treatment that `/`, `/world`, `/meet`, `/dev` have. Add the same icon styling above the page title, matching sizing/spacing/alignment of the other core pages.

### Acceptance criteria for Phase 4

- `/convert` zone tiles render as crawlable anchors in static HTML output
- `/world` region tabs update URL state without full page reload
- `/meet` shareable URLs round-trip correctly (paste URL → state restored)
- All 5 main pages pass Lighthouse 95+ desktop, 85+ mobile
- All clock displays use `<ClientOnlyTime>` (no hydration mismatches)
- Footer links: no broken external links, no placeholder hrefs

### Verification commands

\# Confirm /convert anchors are in HTML, not JS-injected

curl \-s https://timeatlas.co/convert | grep \-c "\<a href=\\"/.\*-to-.\*\\""

\# Should return 100+ matches

\# Test shareable URL round-trip

\# Manually: open /meet, configure cities/times, copy URL, open in new tab, verify state restored

### Out of scope for Phase 4

- `/dev` rebuild (Phase 7\)
- Building actual `/time/{city}` and `/learn/*` pages (Phases 5 and 6\)

---

## Section 6 — Learn pages (Phase 5\)

**Goal:** Move glossary content out of in-page accordions into standalone, rankable URLs.

**Branch:** `v3-phase-5-learn-pages`

### Pages to build

Each at `/learn/{slug}`. All use a shared `<LearnPageTemplate>` component.

1. `/learn/utc` — What is UTC? History, leap seconds, computing significance, relationship to GMT
2. `/learn/gmt` — What is GMT? Royal Observatory history, modern usage, GMT vs UTC
3. `/learn/iso-8601` — ISO 8601 format reference. Examples, common patterns, parsing
4. `/learn/unix-time` — Unix timestamp explainer. Epoch, Y2038 problem, conversion examples
5. `/learn/dst` — Daylight Saving Time. History, current global observance, recent abolitions (Mexico, Russia, Brazil)
6. `/learn/prime-meridian` — Prime Meridian. Royal Observatory, longitude, time zone origin
7. `/learn/international-date-line` — International Date Line. Geography, oddities (Kiribati), travel implications
8. `/learn/aoe` — Anywhere on Earth (UTC-12). Academic deadlines, conferences
9. `/learn/us-time-zones` — US time zones overview. EST/CST/MST/PST/AKST/HST \+ Arizona/Hawaii non-DST notes
10. `/learn/est-vs-edt` — EST vs EDT. Standard time vs daylight time, when each applies
11. `/learn/iana-time-zones` — IANA tz database. Identifiers, why "America/New_York" not "EST", how computers handle DST

### Page template structure

Each learn page:

- H1: matches search intent ("What is UTC?")
- Lead paragraph: definitive 2-3 sentence answer
- Body: 600-1200 words of substantive content
- Sidebar (desktop) / footer (mobile): "Related" links to 4-6 other learn pages
- "Use TimeAtlas tools" CTA: relevant converter or world-clock link
- FAQPage schema if Q\&A format
- Article schema for the page

### Acceptance criteria for Phase 5

- 11 learn pages live, each with unique substantive content
- Internal links from converter pages resolve (no 404s on placeholder links from Phase 3\)
- Each learn page passes Lighthouse 95+ desktop, 85+ mobile
- Each emits valid Article schema, validates in Google Rich Results Test

### Out of scope for Phase 5

- City detail pages (future, beyond V3)
- Video or audio content

---

## Section 7 — Performance and accessibility audit (Phase 6\)

**Goal:** Ship V3 at the performance targets. Fix anything that's not yet at target.

**Branch:** `v3-phase-6-performance`

### Tasks

#### 7.1 JavaScript bundle audit

- Identify unused JS (current measurement: \~312 KiB unused per Lighthouse)
- Lazy-load: secondary features, non-critical icon libraries, route-specific bundles
- Defer: non-critical scripts (analytics, etc.) until after first interaction
- Tree-shake aggressively: import only what's used from icon libraries (e.g., Lucide individual imports, not the whole package)

#### 7.2 LCP optimization

- Identify LCP element on each main page
- Preload critical fonts
- Inline critical CSS
- Reduce render-blocking resources

#### 7.3 CLS elimination

- Add explicit `width` and `height` to every image
- Reserve space for ad slots (when ads are added post-V3 — design layout to accommodate without shift)
- Reserve space for any deferred content (clocks, embeds)

#### 7.4 Forced reflow audit

- Profile main pages in DevTools Performance tab
- Identify layout thrashing
- Batch DOM reads/writes

#### 7.5 "Hear the Time" decision point

Run Phase 6 performance audit with feature enabled vs disabled.

- If audio asset loads measurably impact LCP or transfer size: set feature flag to false, remove from UI.
- If impact is negligible (lazy-loaded only on click): keep enabled. Decision logged in `decisions.md` with measurements.

#### 7.6 Accessibility pass

- Run axe-core on every main page and 10 sample converter pages
- Fix all critical and serious issues
- Verify focus order on every interactive flow
- Verify color contrast on all text against backgrounds (especially `text/secondary` and `text/muted` against `bg/base`)
- Add aria-labels to icon-only buttons (social links in footer, copy buttons, etc.)
- Verify heading hierarchy on every page

#### 7.7 Typography contrast pass

Per V3 brief: some grey text is too low-contrast.

- Audit all text using `text/tertiary` (\#CBD5E1) and `text/muted` (\#94A3B8) against `bg/base` (\#F7F8FA)
- `text/muted` (\#94A3B8) on `bg/base` (\#F7F8FA) \= \~3.5:1 — passes large text only, fails body
- Adjust: where used for body text, swap to `text/secondary` (\#475569) which gives 8:1
- Reserve `text/muted` for large text and decorative use only

#### 7.8 Button contrast compliance

- Audit button colors against text colors
- Verify accent buttons (Convert blue, Meet green, etc.) with white text pass AA
- `accent/convert` (\#3B82F6) with white text \= \~3.7:1 — fails AA for body
- Fix: darken to `#2563EB` (Tailwind blue-600 equivalent) which gives 5.1:1

### Acceptance criteria for Phase 6

- Mobile PageSpeed: 85+ on `/`, `/convert`, `/world`, `/meet`, `/est-to-pst` (sample converter)
- Desktop PageSpeed: 95+ on same pages
- Accessibility: 95+ on every main page
- SEO: 100 on every indexable page
- Zero CLS regressions
- axe-core: zero critical or serious issues on main pages

### Verification commands

\# Run Lighthouse on each main URL

npx lighthouse https://timeatlas.co/ \--only-categories=performance,accessibility,seo \--form-factor=mobile \--view

npx lighthouse https://timeatlas.co/convert \--only-categories=performance,accessibility,seo \--form-factor=mobile \--view

\# Repeat for each main page

\# Bundle analysis

npm run build \-- \--mode analyze

\# Or whatever the framework's bundle analyzer command is

---

## Section 8 — `/dev` rebuild (Phase 7\)

**Goal:** Convert `/dev` from a single demo page into a developer hub with sub-pages and (optional, can defer) public API.

**Branch:** `v3-phase-7-dev`

### Pages

- `/dev` — hub page linking to all sub-tools and API docs
- `/dev/unix-timestamp` — bidirectional Unix ↔ human time converter (both inputs always visible), `<CodeExampleTabbed>` with 8 languages, `<CopyToClipboardButton>` on every output
- `/dev/iso-8601` — ISO 8601 parser/validator with format reference
- `/dev/utc-time` — UTC explainer \+ live UTC time \+ `<CopyToClipboardButton>`
- `/dev/cron` — cron expression converter (next 5 fire times in selected timezone)
- `/dev/duration` — duration calculator (between two times, with timezone awareness)

### API documentation (defer if scope tight)

`/dev/api` — public REST API documentation. Endpoints, auth, rate limits, examples in 8 languages.

If the API itself isn't ready by V3 ship: build the docs page as "Coming soon" with email signup for launch notification. Page exists, ranks for "time zone API," collects signups while implementation continues post-V3.

### Acceptance criteria for Phase 7

- `/dev` renders as a hub with crawlable links to all sub-pages
- Each sub-page is independently rankable (unique title, meta description, H1, content)
- All bidirectional converters use `<ClientOnlyTime>` for any time-displaying values
- Code examples render with syntax highlighting and copy buttons

### Out of scope

- Implementing the actual API service (post-V3)
- Stripe billing for premium API tier (post-V3)

---

## Section 9 — SEO infrastructure (Phase 8\)

**Goal:** Lock in technical SEO before/at launch. These are pre-deploy gates.

**Branch:** `v3-phase-8-seo`

### Tasks

#### 9.1 Sitemap

- Regenerate `sitemap.xml` to include all V3 routes: 250+ converter pages, 11 learn pages, 5 main pages, 6+ dev sub-pages, plus `/world/{region}` routes
- Submit to Google Search Console after V3 deployment

#### 9.2 Robots.txt

- Verify allows all important paths
- Disallow only true non-public paths (admin, if any)

#### 9.3 Schema.org structured data

Each page type emits appropriate schema:

- Homepage: `WebSite` with `SearchAction` (sitelinks search box)
- All pages: `Organization` (in head, site-wide)
- Converter pages: `BreadcrumbList`, `WebPage`, `FAQPage`
- Learn pages: `Article`, `BreadcrumbList`
- City pages (when built): `Place` with `geo` coordinates
- `/dev` pages: `SoftwareApplication`

Validate every schema in Google Rich Results Test before deploy.

#### 9.4 Canonical URLs

Verify every page has correct canonical. Especially:

- All 250+ converter pages canonicalize to themselves
- Old URL formats (`/et-to-pt`, etc.) 301 redirect to new format
- Verify with curl: `curl -sI https://timeatlas.co/et-to-pt | grep -E "(HTTP|location)"` should show 301 \+ correct location

#### 9.5 Internal linking audit

Crawl the V3 build locally before deploy. Verify:

- No orphan pages (every indexable page reachable from at least one other page via `<a>` anchor)
- No broken internal links
- Anchor text is descriptive (not "click here," not just zone codes — should be "Convert EST to PST" or similar)

#### 9.6 Meta data

Every page has:

- Unique title (50–60 characters)
- Unique meta description (150–160 characters)
- Open Graph tags (og:title, og:description, og:image, og:url, og:type)
- Twitter Card tags

#### 9.7 Legal pages audit (AdSense readiness)

Pages already exist with footer links:

- `/privacy` — privacy policy
- `/terms` — terms of service
- `/about` — about page
- `/contact` — contact page

V3 audit tasks for these pages:

- Verify each is indexable (no `noindex` meta tag, present in sitemap)
- Verify each has unique title and meta description
- Verify `/about` establishes editorial identity clearly: who runs TimeAtlas, what the mission is, why it exists. This is what AdSense reviewers look for. If the current copy is thin, expand to 200–400 words covering origin, philosophy ("Internet's Cleanest Time Tools"), and the team.
- Verify `/privacy` discloses any analytics, cookies, or third-party services in use (required for AdSense — they require disclosure of ad serving, even pre-application)
- Verify `/contact` provides a working contact method (form or email)
- Verify all four pages render with the same component system as the rest of V3 (no legacy markup)

### Acceptance criteria for Phase 9

- `sitemap.xml` lists all indexable URLs, no orphans, no 404s
- All schemas validate in Rich Results Test
- All canonical URLs correct
- All legacy redirects return 301
- Legal pages (`/privacy`, `/terms`, `/about`, `/contact`) audited and AdSense-ready

### Verification commands

\# Local crawl before deploy

npx broken-link-checker http://localhost:4173 \--recursive

\# Schema validation per page type

\# Use https://validator.schema.org/

\# Verify canonicals on a sample

curl \-s https://timeatlas.co/est-to-pst | grep \-E "(canonical|og:url|og:title)"

---

## Section 10 — Build sequence and timeline

| Phase                  | Branch                          | Estimated time | Depends on       |
| :--------------------- | :------------------------------ | :------------- | :--------------- |
| 1\. Components         | `v3-phase-1-components`         | 5–7 days       | —                |
| 2\. Data schema        | `v3-phase-2-data`               | 4–6 days       | —                |
| 3\. Converter template | `v3-phase-3-converter-template` | 5–7 days       | Phases 1 & 2     |
| 4\. Main pages         | `v3-phase-4-main-pages`         | 5–7 days       | Phase 1          |
| 5\. Learn pages        | `v3-phase-5-learn-pages`        | 4–6 days       | Phase 1          |
| 6\. Performance/a11y   | `v3-phase-6-performance`        | 3–5 days       | Phases 3, 4, 5   |
| 7\. /dev rebuild       | `v3-phase-7-dev`                | 4–6 days       | Phase 1          |
| 8\. SEO infrastructure | `v3-phase-8-seo`                | 2–3 days       | All prior phases |

**Total estimated time: 32–47 days of focused work** (\~6–9 weeks calendar time depending on pace).

Phases 1 and 2 can run in parallel (different branches, no shared files). Phases 4 and 5 can run in parallel after Phase 1 ships. Phase 7 can run in parallel with Phases 4–5 after Phase 1\.

---

## Section 11 — Post-V3 (not in this build, for reference)

After V3 ships and stabilizes:

**\+30 days:**

- Monitor Search Console for indexing of new pages
- Identify long-tail query opportunities
- Fix any issues surfaced by real traffic

**\+60 days:**

- Apply for Google AdSense from a position of strength
- Build first 50 city detail pages (`/time/{city}`)
- Begin JTF Observatory build in parallel

**\+90 days:**

- Roll out remaining 200+ city pages
- Launch public API at `/dev/api`
- Begin sketching premium tier features (saved cities, team preferences, recurring overlap intelligence)

**Permanent post-V3 maintenance (annual):**

- Update `current_year` and DST dates in `zones.json`
- Verify country-level changes (DST adoption/abolition)
- Refresh city populations (every 5 years)

---

## Appendix A — Key constraints summary

- Anchor-by-default for any UI representing another page
- Hydration-safe rendering for any time-displaying element
- Token-driven styling (no inline hex)
- Component-first composition (no bespoke page layout code)
- Mobile PSI 85+, desktop 95+, accessibility 95+, SEO 100
- Verb vocabulary: Convert, Compare, Observe, View, Save
- No marketing-speak, no SaaS language, no productivity-optimization framing

## Appendix B — Decision log

Maintain `decisions.md` in the repo root, updated at each phase gate. Format:

\#\# YYYY-MM-DD — Phase N decision

\*\*Decision:\*\* what was decided

\*\*Reason:\*\* why

\*\*Alternatives considered:\*\* what else was on the table

\*\*Reversibility:\*\* easy/moderate/hard to reverse later

Required entries (at minimum):

- Hear the Time: keep or remove (Phase 6 decision based on performance measurements)
- Pair generation: 250 P1 only, or all 600 (decided based on Phase 2 progress)
- API launch: V3 or post-V3 (Phase 7 decision)
- Logo redesign: scheduled for V3.5 or later

## Appendix C — Files this brief replaces

This document supersedes:

- TimeAtlas SEO Action Plan (v1)
- TimeAtlas SEO Action Plan v2
- TimeAtlas Figma Build Brief
- Converter Page Template Redesign
- Data Schema README
- TimeAtlas Build Brief V3 (QuietCodeCaptain Edition)

Those files are retained as historical reference. This brief is the current source of truth.
