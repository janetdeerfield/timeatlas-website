import { Link } from 'react-router';
import { Footer } from '../components/Footer';
import { JsonLd } from '../components/JsonLd';
import { SEO } from '../components/SEO';
import {
  TimeHeader,
  TimePillPair,
  TimeTable,
  ConversionGrid,
  Section,
  DstScheduleBlock,
  type DstScheduleZone,
  InternalLinkBlock,
  type InternalLinkBlockLink,
} from '../components/time';
import { getZoneInfo, type ZoneInfo } from '../data/zones';
import { getZoneV3, zoneSlugPart, CURRENT_YEAR, type ZoneV3 } from '../data/zonesV3';
import {
  getPairV3,
  getPairsFromZone,
  getPairsToZone,
  pairSlug,
  type PairV3,
  type MeetingDifficulty,
  type DstRelationship,
} from '../data/pairsV3';

// ─── SEO helpers ──────────────────────────────────────────────────────────────

function titleZoneName(zone: ZoneInfo) {
  return zone.fullName.replace(/ Time$/, '');
}

function buildPageTitle(
  sourceCode: string,
  targetCode: string,
  fromZone?: ZoneInfo,
  toZone?: ZoneInfo
) {
  if (!fromZone || !toZone) return `${sourceCode} to ${targetCode} Time Converter | TimeAtlas`;
  return `${fromZone.abbr} → ${toZone.abbr} Converter (${titleZoneName(fromZone)} to ${titleZoneName(toZone)} Time) | TimeAtlas`;
}

function buildPageDescription(
  sourceCode: string,
  targetCode: string,
  fromZone?: ZoneInfo,
  toZone?: ZoneInfo
) {
  if (!fromZone || !toZone)
    return `Convert ${sourceCode} to ${targetCode} time instantly. Free time zone converter for meetings, travel, and remote work.`;
  return `Convert ${fromZone.fullName} (${sourceCode}) to ${toZone.fullName} (${targetCode}) instantly. Free time zone converter for meetings, travel, and remote work.`;
}

function buildH1(sourceCode: string, targetCode: string, fromZone?: ZoneInfo, toZone?: ZoneInfo) {
  if (!fromZone || !toZone) return `${sourceCode} to ${targetCode} Converter`;
  return `${fromZone.abbr} → ${toZone.abbr} Converter`;
}

// ─── Data-driven helpers ───────────────────────────────────────────────────────

function toDstScheduleZone(zone: ZoneV3): DstScheduleZone {
  return {
    code: zone.code,
    name: zone.name,
    short_name: zone.short_name,
    utc_offset_display: zone.utc_offset_display,
    observes_dst: zone.observes_dst,
    dst: zone.dst,
  };
}

function computeTimeDifference(
  fromCode: string,
  toCode: string,
  fromV3: ZoneV3,
  toV3: ZoneV3
): string {
  const diffMin = toV3.utc_offset_minutes - fromV3.utc_offset_minutes;
  if (diffMin === 0) return `${fromCode} and ${toCode} share the same standard UTC offset`;
  const absMin = Math.abs(diffMin);
  const h = Math.floor(absMin / 60);
  const m = absMin % 60;
  const timeStr =
    m === 0 ? `${h} hour${h !== 1 ? 's' : ''}` : `${h} hour${h !== 1 ? 's' : ''} ${m} minutes`;
  return diffMin > 0
    ? `${toCode} is ${timeStr} ahead of ${fromCode} (standard time)`
    : `${toCode} is ${timeStr} behind ${fromCode} (standard time)`;
}

function dstRelationshipText(
  relationship: DstRelationship,
  fromCode: string,
  toCode: string,
  fromV3: ZoneV3,
  toV3: ZoneV3
): string {
  const diffMin = Math.abs(toV3.utc_offset_minutes - fromV3.utc_offset_minutes);
  const h = Math.floor(diffMin / 60);
  const m = diffMin % 60;
  const gapLabel = m === 0 ? `${h}-hour` : `${h}h ${m}m`;

  switch (relationship) {
    case 'synchronized':
      return `Both ${fromCode} and ${toCode} observe Daylight Saving Time on the same schedule. The ${gapLabel} difference is constant all year — there are no weeks where the gap shifts.`;
    case 'desynchronized':
      return `Both ${fromCode} and ${toCode} observe DST, but switch on different dates. For a few weeks each spring and autumn, the gap shifts by 1 hour — a common source of missed meetings and calendar tool errors.`;
    case 'asymmetric': {
      const observer = fromV3.observes_dst ? fromCode : toCode;
      const fixed = fromV3.observes_dst ? toCode : fromCode;
      return `${observer} observes DST; ${fixed} does not. The offset between them shifts by 1 hour twice a year — in spring and autumn — when ${observer} changes its clocks.`;
    }
    case 'inverted':
      return `Both ${fromCode} and ${toCode} observe DST, but on opposite-hemisphere schedules. When one springs forward, the other falls back — so the offset shifts four times per year instead of the usual two.`;
    case 'neither':
      return `Neither ${fromCode} nor ${toCode} observes Daylight Saving Time. The ${gapLabel} offset is constant year-round with no seasonal variation.`;
  }
}

function formatFlightDuration(minutes: number): string {
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  return m === 0 ? `${h}h` : `${h}h ${m}m`;
}

// ─── Difficulty badge ─────────────────────────────────────────────────────────

const DIFFICULTY_CONFIG: Record<MeetingDifficulty, { label: string; className: string }> = {
  easy: {
    label: 'Easy overlap',
    className: 'border-emerald-200 bg-emerald-100 text-emerald-800',
  },
  moderate: {
    label: 'Moderate overlap',
    className: 'border-amber-200 bg-amber-100 text-amber-800',
  },
  hard: {
    label: 'Hard to overlap',
    className: 'border-red-200 bg-red-100 text-red-800',
  },
};

function DifficultyBadge({ difficulty }: { difficulty: MeetingDifficulty }) {
  const { label, className } = DIFFICULTY_CONFIG[difficulty];
  return (
    <span
      className={`inline-block rounded-full border px-3 py-1 text-xs font-semibold ${className}`}
    >
      {label}
    </span>
  );
}

// ─── Dynamic conversion table ─────────────────────────────────────────────────

function formatHour(totalMin: number, abbr: string): string {
  const norm = ((totalMin % 1440) + 1440) % 1440;
  const h = Math.floor(norm / 60);
  const m = norm % 60;
  const ampm = h < 12 ? 'AM' : 'PM';
  const h12 = h === 0 ? 12 : h > 12 ? h - 12 : h;
  return `${h12}:${m.toString().padStart(2, '0')} ${ampm} ${abbr}`;
}

function generateConversions(
  sourceCode: string,
  targetCode: string,
  fromV3?: ZoneV3,
  toV3?: ZoneV3
): Array<{ from: string; to: string }> {
  if (!fromV3 || !toV3) return [];
  const diffMin = toV3.utc_offset_minutes - fromV3.utc_offset_minutes;
  return Array.from({ length: 24 }, (_, i) => {
    const sourceMin = i * 60;
    return {
      from: formatHour(sourceMin, sourceCode),
      to: formatHour(sourceMin + diffMin, targetCode),
    };
  });
}

// ─── Internal link builders ───────────────────────────────────────────────────

const POPULAR_PAIRS: ReadonlyArray<readonly [string, string]> = [
  ['EST', 'PST'],
  ['PST', 'EST'],
  ['EST', 'CET'],
  ['CET', 'EST'],
  ['EST', 'IST'],
  ['IST', 'EST'],
  ['EST', 'JST'],
  ['PST', 'IST'],
  ['GMT', 'IST'],
  ['UTC', 'EST'],
  ['IST', 'JST'],
  ['EST', 'AEDT'],
];

function buildConvertFromLinks(fromCode: string, currentSlug: string): InternalLinkBlockLink[] {
  return getPairsFromZone(fromCode)
    .filter((p) => pairSlug(p.source_code, p.target_code) !== currentSlug)
    .slice(0, 6)
    .map((p) => ({
      href: `/${pairSlug(p.source_code, p.target_code)}`,
      label: `${p.source_code} → ${p.target_code}`,
      sourceCode: p.source_code,
      targetCode: p.target_code,
    }));
}

function buildConvertToLinks(toCode: string, currentSlug: string): InternalLinkBlockLink[] {
  return getPairsToZone(toCode)
    .filter((p) => pairSlug(p.source_code, p.target_code) !== currentSlug)
    .slice(0, 6)
    .map((p) => ({
      href: `/${pairSlug(p.source_code, p.target_code)}`,
      label: `${p.source_code} → ${p.target_code}`,
      sourceCode: p.source_code,
      targetCode: p.target_code,
    }));
}

function buildPopularLinks(currentSlug: string): InternalLinkBlockLink[] {
  return POPULAR_PAIRS.filter(([src, tgt]) => pairSlug(src, tgt) !== currentSlug).map(
    ([src, tgt]) => ({
      href: `/${pairSlug(src, tgt)}`,
      label: `${src} → ${tgt}`,
      sourceCode: src,
      targetCode: tgt,
    })
  );
}

// ─── Structured data builders ─────────────────────────────────────────────────

const SITE_URL = 'https://timeatlas.co';

function buildBreadcrumbSchema(currentSlug: string, h1: string): object {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE_URL}/` },
      { '@type': 'ListItem', position: 2, name: 'Convert', item: `${SITE_URL}/convert` },
      { '@type': 'ListItem', position: 3, name: h1, item: `${SITE_URL}/${currentSlug}` },
    ],
  };
}

function buildFaqSchema(
  sourceCode: string,
  targetCode: string,
  fromZone: ZoneInfo | undefined,
  toZone: ZoneInfo | undefined,
  fromZoneV3: ZoneV3 | undefined,
  toZoneV3: ZoneV3 | undefined,
  timeDiffText: string,
  dstCallout: string | null,
  pairData: PairV3
): object {
  const faqItems: Array<{ question: string; answer: string }> = [];

  // Q1: Time difference — maps to the "How Time Zone Conversion Works" section
  if (fromZone && toZone) {
    const dstSuffix = dstCallout ? ` ${dstCallout}` : '';
    faqItems.push({
      question: `What is the time difference between ${fromZone.fullName} (${sourceCode}) and ${toZone.fullName} (${targetCode})?`,
      answer: `${timeDiffText}.${dstSuffix}`,
    });
  }

  // Q2: DST observance — maps to the DST amber callout visible on the page
  if (fromZoneV3 && toZoneV3) {
    const fromDst = fromZoneV3.observes_dst ? 'observes' : 'does not observe';
    const toDst = toZoneV3.observes_dst ? 'observes' : 'does not observe';
    faqItems.push({
      question: `Do ${sourceCode} and ${targetCode} observe Daylight Saving Time?`,
      answer: `${sourceCode} (${fromZoneV3.short_name}) ${fromDst} Daylight Saving Time. ${targetCode} (${toZoneV3.short_name}) ${toDst} Daylight Saving Time.`,
    });
  }

  // Q3: Best meeting times — maps to the "Best Meeting Times" section
  const { meeting_overlap, meeting_difficulty } = pairData;
  const difficultyLabel =
    meeting_difficulty === 'easy'
      ? 'easy'
      : meeting_difficulty === 'moderate'
        ? 'moderate'
        : 'difficult';
  let meetingAnswer =
    `Scheduling meetings between ${sourceCode} and ${targetCode} is ${difficultyLabel}. ` +
    `The recommended overlap window is ${meeting_overlap.start_source}–${meeting_overlap.end_source} ${sourceCode} ` +
    `(${meeting_overlap.start_target}–${meeting_overlap.end_target} ${targetCode}). ` +
    `Recommended time: ${meeting_overlap.preferred_default}.`;
  if (meeting_overlap.note) meetingAnswer += ` ${meeting_overlap.note}`;
  faqItems.push({
    question: `What are the best times to schedule meetings between ${sourceCode} and ${targetCode}?`,
    answer: meetingAnswer,
  });

  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqItems.map(({ question, answer }) => ({
      '@type': 'Question',
      name: question,
      acceptedAnswer: { '@type': 'Answer', text: answer },
    })),
  };
}

// ─── Page component ───────────────────────────────────────────────────────────

interface CityPairPageProps {
  pair: PairV3;
  use24Hour?: boolean;
}

export function CityPairPage({ pair, use24Hour = false }: CityPairPageProps) {
  const sourceCode = pair.source_code;
  const targetCode = pair.target_code;
  const currentSlug = pairSlug(sourceCode, targetCode);

  const fromZone = getZoneInfo(sourceCode);
  const toZone = getZoneInfo(targetCode);
  const fromZoneV3 = getZoneV3(sourceCode);
  const toZoneV3 = getZoneV3(targetCode);
  const pairData: PairV3 = pair;

  const title = buildPageTitle(sourceCode, targetCode, fromZone, toZone);
  const description = buildPageDescription(sourceCode, targetCode, fromZone, toZone);
  const h1 = buildH1(sourceCode, targetCode, fromZone, toZone);

  const convertFromLinks = buildConvertFromLinks(sourceCode, currentSlug);
  const convertToLinks = buildConvertToLinks(targetCode, currentSlug);
  const popularLinks = buildPopularLinks(currentSlug);

  const introText = pairData.notable_pairing;

  const timeDiffText =
    fromZoneV3 && toZoneV3
      ? computeTimeDifference(sourceCode, targetCode, fromZoneV3, toZoneV3)
      : `${sourceCode} and ${targetCode} time conversion`;

  const dstCallout =
    fromZoneV3 && toZoneV3
      ? dstRelationshipText(pairData.dst_relationship, sourceCode, targetCode, fromZoneV3, toZoneV3)
      : null;

  const conversions = generateConversions(sourceCode, targetCode, fromZoneV3, toZoneV3);

  const breadcrumbSchema = buildBreadcrumbSchema(currentSlug, h1);
  const faqSchema = buildFaqSchema(
    sourceCode,
    targetCode,
    fromZone,
    toZone,
    fromZoneV3,
    toZoneV3,
    timeDiffText,
    dstCallout,
    pairData
  );

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <SEO title={title} description={description} path={`/${currentSlug}`} />
      <JsonLd schemas={[breadcrumbSchema, faqSchema]} />

      <main className="flex-1 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 w-full">
        {/* ── Breadcrumb ──────────────────────────────────────────────────── */}
        <div className="mb-6 text-sm text-slate-600">
          <a href="/" className="text-indigo-600 hover:text-indigo-700">
            Home
          </a>
          <span className="mx-2">/</span>
          <a href="/convert" className="text-indigo-600 hover:text-indigo-700">
            Convert
          </a>
          <span className="mx-2">/</span>
          <span className="text-slate-900 font-semibold">{h1}</span>
        </div>

        {/* ── H1 ──────────────────────────────────────────────────────────── */}
        <h1 className="text-4xl sm:text-5xl font-bold mb-4 text-slate-900">{h1}</h1>

        {/* ── Intro ───────────────────────────────────────────────────────── */}
        <p className="text-lg text-slate-700 mb-8 leading-relaxed">{introText}</p>

        {/* ── 1. INSTANT ANSWER HEADER ────────────────────────────────────── */}
        {fromZone && toZone && (
          <TimeHeader fromZone={fromZone} toZone={toZone} use24Hour={use24Hour} />
        )}

        {/* ── 2. TIME ZONE CONVERTER ──────────────────────────────────────── */}
        <Section title="Time Zone Converter">
          {fromZone && toZone && (
            <div className="mb-8">
              <TimePillPair fromZone={fromZone} toZone={toZone} use24Hour={use24Hour} />
            </div>
          )}
          <h3 className="text-base font-semibold text-slate-700 mb-4">Compare Times</h3>
          <TimeTable conversions={conversions} fromZoneAbbr={sourceCode} toZoneAbbr={targetCode} />
        </Section>

        {/* ── 3. FAQ ──────────────────────────────────────────────────────── */}
        {fromZone && toZone && fromZoneV3 && toZoneV3 && (
          <Section title={`Frequently Asked Questions: ${sourceCode} to ${targetCode}`}>
            <div className="space-y-6">
              <div>
                <h3 className="text-base font-semibold text-slate-900 mb-1">
                  What is the time difference between {fromZone.fullName} and {toZone.fullName}?
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed">{timeDiffText}.</p>
              </div>

              <div>
                <h3 className="text-base font-semibold text-slate-900 mb-1">
                  What time is midnight in {sourceCode} in {targetCode}?
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  Midnight (12:00 AM) in {fromZone.fullName} translates to{' '}
                  {formatHour(toZoneV3.utc_offset_minutes - fromZoneV3.utc_offset_minutes, targetCode)}{' '}
                  in {toZone.fullName}.
                </p>
              </div>

              <div>
                <h3 className="text-base font-semibold text-slate-900 mb-1">
                  When do business hours overlap between {sourceCode} and {targetCode}?
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  {pairData.meeting_difficulty === 'hard'
                    ? `Standard 9–5 business hours do not overlap between ${fromZone.fullName} and ${toZone.fullName}. The closest scheduling window is ${pairData.meeting_overlap.start_source}–${pairData.meeting_overlap.end_source} ${sourceCode} (${pairData.meeting_overlap.start_target}–${pairData.meeting_overlap.end_target} ${targetCode}).`
                    : `The business hours overlap window is ${pairData.meeting_overlap.start_source}–${pairData.meeting_overlap.end_source} ${sourceCode} (${pairData.meeting_overlap.start_target}–${pairData.meeting_overlap.end_target} ${targetCode}). ${pairData.meeting_difficulty === 'easy' ? 'There is a strong overlap with plenty of shared working hours.' : 'The shared window is limited; aim for the earlier part of this range when possible.'}`}
                  {pairData.meeting_overlap.note && ` ${pairData.meeting_overlap.note}`}
                </p>
              </div>
            </div>
          </Section>
        )}

        {/* ── 4. COMMON TIME CONVERSIONS (ConversionGrid — V3-Lite <a> tags preserved) */}
        <Section title="Common Time Conversions">
          <ConversionGrid />
        </Section>

        {/* ── 4. HOW TIME ZONE CONVERSION WORKS ──────────────────────────── */}
        <Section title="How Time Zone Conversion Works">
          <div className="space-y-4 text-slate-700 leading-relaxed">
            <p>
              Time zone conversion works by comparing the UTC offset of one location to another.
              Every city or region is measured relative to Coordinated Universal Time (UTC), which
              acts as the global reference point for civil time.
            </p>
            <p>{timeDiffText}.</p>

            {/* DST relationship callout */}
            {dstCallout && (
              <p className="rounded-lg border border-amber-100 bg-amber-50 px-4 py-3 text-sm text-amber-900">
                <strong className="">Daylight Saving Time:</strong> {dstCallout}
              </p>
            )}
          </div>
        </Section>

        {/* ── 5. BEST MEETING TIMES (data-driven, conditional) ────────────── */}
        {pairData && (
          <Section title={
            fromZone && toZone
              ? `Best time to call ${toZone.city} from ${fromZone.city}`
              : `Best Meeting Times: ${sourceCode} & ${targetCode}`
          }>
            <div className="space-y-4 ">
              {/* Context paragraph */}
              {fromZone && toZone && (
                <p className="text-sm leading-relaxed text-slate-600">
                  Planning a remote meeting or international call? The optimal business hours overlap between{' '}
                  {fromZone.city} and {toZone.city} is{' '}
                  {pairData.meeting_difficulty === 'easy'
                    ? 'strong, with significant shared business hours available.'
                    : pairData.meeting_difficulty === 'moderate'
                    ? 'moderate, with a limited shared window to work with.'
                    : 'challenging, with few shared business hours between the two zones.'}
                </p>
              )}

              {/* Meeting Planner CTA */}
              <Link
                to="/meet"
                onClick={() => window.scrollTo(0, 0)}
                className="inline-flex items-center text-sm font-medium text-blue-600 hover:text-blue-800 hover:underline transition-colors"
              >
                Try Meeting Planner for multi-city group scheduling →
              </Link>

              {/* Difficulty */}
              <div className="flex items-center gap-3">
                <span className="text-sm font-semibold text-slate-700">Scheduling difficulty:</span>
                <DifficultyBadge difficulty={pairData.meeting_difficulty} />
              </div>

              {/* Overlap window */}
              <div className="rounded-lg border border-slate-200 bg-slate-50 p-4">
                <div className="grid grid-cols-2 gap-6 mb-3">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wide text-slate-500 mb-1">
                      {sourceCode}
                    </p>
                    <p className="text-lg font-bold text-slate-900">
                      {pairData.meeting_overlap.start_source}–{pairData.meeting_overlap.end_source}
                    </p>
                    {fromZoneV3 && (
                      <p className="text-xs text-slate-500 mt-0.5">{fromZoneV3.short_name}</p>
                    )}
                  </div>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wide text-slate-500 mb-1">
                      {targetCode}
                    </p>
                    <p className="text-lg font-bold text-slate-900">
                      {pairData.meeting_overlap.start_target}–{pairData.meeting_overlap.end_target}
                    </p>
                    {toZoneV3 && (
                      <p className="text-xs text-slate-500 mt-0.5">{toZoneV3.short_name}</p>
                    )}
                  </div>
                </div>
                <p className="text-sm text-slate-700 leading-snug">
                  <span className="font-semibold">Recommended time: </span>
                  {pairData.meeting_overlap.preferred_default}
                </p>
              </div>

              {/* Scheduling note */}
              {pairData.meeting_overlap.note && (
                <p className="text-sm leading-relaxed text-slate-600">
                  {pairData.meeting_overlap.note}
                </p>
              )}

              {/* Common use cases */}
              {pairData.common_use_cases.length > 0 && (
                <div className="flex flex-wrap gap-2 pt-1">
                  {pairData.common_use_cases.map((useCase) => (
                    <span
                      key={useCase}
                      className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700"
                    >
                      {useCase}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </Section>
        )}

        {/* ── 6. DST SCHEDULE (data-driven, full DstScheduleBlock) ────────── */}
        {fromZoneV3 && toZoneV3 && (
          <DstScheduleBlock
            zones={[toDstScheduleZone(fromZoneV3), toDstScheduleZone(toZoneV3)]}
            currentYear={CURRENT_YEAR}
            className="mb-10"
          />
        )}

        {/* ── 7. PRINCIPAL CITIES (data-driven) ───────────────────────────── */}
        {(fromZoneV3 || toZoneV3) && (
          <Section title="Principal Cities">
            <div className="grid gap-8 sm:grid-cols-2">
              {fromZoneV3 && (
                <div>
                  <h3 className="text-xs font-semibold uppercase tracking-wide text-slate-500 mb-3">
                    {fromZoneV3.code} — {fromZoneV3.short_name}
                  </h3>
                  <ul className="space-y-2">
                    {fromZoneV3.principal_cities.slice(0, 4).map((city) => (
                      <li
                        key={city.name}
                        className="flex items-baseline justify-between gap-2 text-sm "
                      >
                        <span className="font-semibold text-slate-900">{city.name}</span>
                        <span className="shrink-0 text-xs text-slate-500">{city.country}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              {toZoneV3 && (
                <div>
                  <h3 className="text-xs font-semibold uppercase tracking-wide text-slate-500 mb-3">
                    {toZoneV3.code} — {toZoneV3.short_name}
                  </h3>
                  <ul className="space-y-2">
                    {toZoneV3.principal_cities.slice(0, 4).map((city) => (
                      <li
                        key={city.name}
                        className="flex items-baseline justify-between gap-2 text-sm "
                      >
                        <span className="font-semibold text-slate-900">{city.name}</span>
                        <span className="shrink-0 text-xs text-slate-500">{city.country}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </Section>
        )}

        {/* ── 8. FLIGHT INFORMATION (data-driven, conditional) ────────────── */}
        {pairData?.flight_route && (
          <Section title="Flight Information">
            <div className="space-y-4 ">
              <div className="flex flex-wrap gap-8">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wide text-slate-500 mb-1">
                    Route
                  </p>
                  <p className="text-lg font-bold text-slate-900">
                    {pairData.flight_route.primary_route}
                  </p>
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wide text-slate-500 mb-1">
                    Avg. flight time
                  </p>
                  <p className="text-lg font-bold text-slate-900">
                    {formatFlightDuration(pairData.flight_route.average_flight_time_minutes)}
                  </p>
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wide text-slate-500 mb-1">
                    Direct flights
                  </p>
                  <p className="text-sm font-semibold text-slate-900">
                    {pairData.flight_route.direct_flights_available ? 'Available' : 'Not available'}
                  </p>
                </div>
              </div>
              {pairData.flight_route.note && (
                <p className="text-sm leading-relaxed text-slate-600">
                  {pairData.flight_route.note}
                </p>
              )}
            </div>
          </Section>
        )}

        {/* ── 9. INTERNAL LINK BLOCKS ─────────────────────────────────────── */}
        {convertFromLinks.length > 0 && (
          <InternalLinkBlock
            title={`Convert from ${fromZoneV3?.short_name ?? sourceCode}`}
            links={convertFromLinks}
            variant="convert-from"
            className="mb-10"
          />
        )}

        {convertToLinks.length > 0 && (
          <InternalLinkBlock
            title={`Convert to ${toZoneV3?.short_name ?? targetCode}`}
            links={convertToLinks}
            variant="convert-to"
            className="mb-10"
          />
        )}

        <InternalLinkBlock
          title="Popular Time Zone Conversions"
          links={popularLinks}
          variant="popular"
          className="mb-10"
        />
      </main>

      <Footer />
    </div>
  );
}
