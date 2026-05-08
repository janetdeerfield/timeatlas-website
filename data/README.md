# TimeAtlas Data Schema — README

This directory contains the structured data that drives the converter page template. Two files, one set of rules.

## Files

**`zones.json`** — One record per time zone. Source of truth for everything zone-specific: offsets, DST rules, IANA identifiers, countries, principal cities, notable institutions, geography, history.

**`pairs.json`** — One record per directional zone pair (EST→PST is a different record from PST→EST). Holds only the curated content that _cannot_ be derived from `zones.json`: meeting overlap recommendations, sample city pairings, notable-pairing context, flight times, meeting-difficulty assessment.

## What's derived vs. what's stored

Most "facts about a pair" are derivable. Don't store them in `pairs.json`:

| Fact                                    | Derive from                                                                 | Don't store in pairs.json |
| :-------------------------------------- | :-------------------------------------------------------------------------- | :------------------------ |
| Time difference in hours/minutes        | `target.utc_offset_minutes - source.utc_offset_minutes`                     | ✓                         |
| Whether differential changes seasonally | Compare `source.observes_dst` and `target.observes_dst`, plus DST schedules | ✓                         |
| DST start/end dates per zone            | `zones.json` `dst.start_date_current_year` etc.                             | ✓                         |
| IANA identifiers                        | `zones.json` `iana.primary`                                                 | ✓                         |
| Military codes                          | `zones.json` `military_code`                                                | ✓                         |
| Principal cities lists                  | `zones.json` `principal_cities`                                             | ✓                         |
| Notable institutions per zone           | `zones.json` `notable_institutions`                                         | ✓                         |

Only these are stored in `pairs.json` because they require human judgment:

| Fact                                          | Why curated, not derived                                                                                                         |
| :-------------------------------------------- | :------------------------------------------------------------------------------------------------------------------------------- |
| `dst_relationship`                            | Could be derived but storing it as a label simplifies template logic. One of: synchronized, desynchronized, asymmetric, neither. |
| `meeting_overlap`                             | A recommendation, not a calculation. Should respect 9–5 in both zones; for hard pairs, recommend the closest workable window.    |
| `meeting_difficulty`                          | A judgment call (easy / moderate / hard).                                                                                        |
| `notable_pairing`                             | The most genuinely unique content per pair — a sentence or two of context.                                                       |
| `sample_source_city` and `sample_target_city` | Which specific city to feature for this pair (Mumbai for EST↔IST, Bangalore for some software contexts).                         |
| `flight_route`                                | Manually researched from airline data.                                                                                           |
| `common_use_cases`                            | Editorial judgment about what users actually want.                                                                               |

## Template logic — how the data drives the page

The template renders \~11 sections per page. Most sections pull from `zones.json` and `pairs.json` as follows:

### 1\. Hero converter

- Source/target zone names, offsets, sample city — from `zones.json` (look up by code) and `pairs.json` (sample city)
- Live time computed from IANA identifier in `zones.json`

### 2\. Time difference statement (intro paragraph)

Conditional template selected by `pairs.json` → `dst_relationship`:

- `synchronized` → "{source.short_name} and {target.short_name} both observe DST on the same schedule, so the {derived_diff} between {sample_source_city} and {sample_target_city} stays constant year-round."
- `desynchronized` → "{source.short_name} and {target.short_name} both observe DST but on different schedules, so for two weeks each spring and one week each fall the usual {derived_diff} gap shifts to {variant_diff}."
- `asymmetric` → "{country_without_dst} does not observe DST, but {country_with_dst} does — so the gap between {sample_source_city} and {sample_target_city} shifts from {std_diff} to {dst_diff} when {observing_country}'s clocks {direction} in {month}."
- `neither` → "Neither {source.country} nor {target.country} observes DST, so the {derived_diff} between {sample_source_city} and {sample_target_city} is constant every day of the year."

### 3\. "Why does {SOURCE} differ from {TARGET}?"

Pulls `geography.longitude_center` from both zones, computes longitude separation, and uses `notable_pairing` from `pairs.json`. Roughly 3 sentences total.

### 4\. Quick reference comparison table

Pulls all factual fields from both zones in `zones.json`. UTC offset, IANA primary, observes DST, military code, primary country, largest city.

### 5\. Compare Times table (24 rows)

Computed from offsets. For zones with 30-minute offsets (IST), use natural half-hour increments (12:30 AM, 1:30 AM, etc.) rather than forcing whole hours.

### 6\. Best meeting times

Pulls `meeting_overlap` from `pairs.json` directly. If `meeting_difficulty == "hard"`, append the async-pattern note from the `notes` field.

### 7\. DST handling for this pair

Multi-variant section based on the same `dst_relationship` value:

- `synchronized` → 1 paragraph noting both zones change on the same dates, gap stays constant
- `desynchronized` → table showing the differential across the year (4-5 distinct periods)
- `asymmetric` → 1 paragraph explaining the seasonal shift, with specific dates from `zones.json`
- `neither` → 1 paragraph emphasizing the constant offset

### 8\. Cities and institutions in each zone

Two columns. Pulls `principal_cities` (top 5-7) and `notable_institutions` (top 3-4) from each zone in `zones.json`. Each city becomes an anchor link to a future `/time/{city}` page.

### 9\. FAQ (5 items)

Three are derivable from `zones.json` \+ `pairs.json`. Two are pair-specific and could be hand-curated or AI-generated:

- "What is the time difference between X and Y?" (derived)
- "How do I convert X to Y?" (derived)
- "What's the best time for meetings between X and Y?" (from pairs.json `meeting_overlap`)
- "Does daylight saving time affect this conversion?" (derived from DST relationship)
- "Does X or Y change with daylight saving?" (derived from each zone's `observes_dst`)

### 10\. Internal link blocks

Three sections, all crawlable:

- "Convert from {source}" — query for all pairs where `source_code == this.source_code`
- "Convert to {target}" — query for all pairs where `target_code == this.target_code`
- "Popular conversions" — site-wide curated list, same on every page

### 11\. Learn more

3-4 contextual links to `/learn/*` pages. Hand-curated; could be config-driven later.

## Generating the remaining pairs

`pairs.json` includes 8 worked examples covering all four DST-relationship variants. The remaining \~100 pairs need to be generated with the same structure. Two approaches:

**Approach A — manual \+ AI assistance.** Feed the current `zones.json`, `pairs.json` (as the pattern), and the list under `_remaining_pairs_to_generate` to an AI agent. Ask it to generate one record per pair following the variant pattern that matches each pair's DST relationship. Plan to spot-check 10-20% of generated records by hand.

**Approach B — partial generation.** Hard-curate the top 30 most-trafficked pairs (the ones likely to rank first). Auto-generate the rest with simpler templated `notable_pairing` text that the system can later upgrade. Trade-off: less unique content per page, faster ship.

Recommended: Approach A. The high-leverage field (`notable_pairing`) is short — usually 1-2 sentences — and an AI agent with this schema and the existing examples can produce reasonable first drafts in batches of 20-30. Budget half a day to review and edit the generated records.

## Verification before publishing

These factual fields should be verified against authoritative sources before going live:

- DST schedules — current year dates may need updating annually. Source: IANA tz database.
- City populations — these are city proper, not metro. Round to thousands. Source: official city statistics or current Wikipedia.
- IANA identifiers — should match the live tz database. Source: IANA tz database.
- Trading hours for stock exchanges — easy to mis-state across DST transitions. Source: each exchange's official site.
- Country DST observance — Mexico (abolished 2022 except border zones), Russia (no DST since 2014), Brazil (no DST since 2019), and several others have changed in recent years.

## Annual maintenance

Each year, update:

1. `last_updated` and `current_year` fields at the top of `zones.json`
2. `dst.start_date_current_year` and `dst.end_date_current_year` for every zone that observes DST
3. Any country-level changes (DST adoption or abolition)
4. City populations (every 5 years is fine; not every year)

## Notes on edge cases

- **Mexico** — abolished DST in 2022 except for \~30 municipalities along the US border. CST records reflect this.
- **Russia** — no DST since 2014\. Not in this dataset yet but relevant for future MSK records.
- **Brazil** — no DST since 2019\. Relevant for future BRT records.
- **Sri Lanka** — uses UTC+5:30, same as IST, but its IANA identifier is `Asia/Colombo`. The dataset notes this.
- **Yukon** — stays on PDT year-round (effectively MST in winter, PDT in summer). Edge case for PST records.
- **Arizona** — most of Arizona stays on MST year-round; the Navajo Nation within Arizona observes MDT. Edge case for MST records.
- **IST military code** — half-hour offset zones don't have standard NATO codes. Marked as null in the dataset with an explanatory note.
- **GMT vs UTC** — different categories (`civil_zone` vs `reference_standard`) but same offset. Template should handle both. The IST/Irish Standard Time abbreviation conflict is noted in the IST record.

## File layout in the codebase

Suggested structure:

data/

├── zones.json

├── pairs.json

└── README.md (this file)

src/

├── templates/

│ └── converter.tsx (or .vue, .astro, etc.)

├── lib/

│ ├── deriveTimeDifference.ts

│ ├── deriveDstRelationship.ts

│ └── formatComparisonTable.ts

└── pages/

    └── \[pair\].tsx (dynamic route reading from data files)

The template is then a single file. New pairs require only a new entry in `pairs.json` (or sometimes just `zones.json` if a new zone is added). No template work per page.
