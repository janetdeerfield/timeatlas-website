import { Footer } from '../components/Footer';
import { SEO } from '../components/SEO';
import { TimeHeader, TimePillPair, TimeTable, ConversionGrid, Section } from '../components/time';
import { cityPairs, type CityPairPageData } from '../data/cityPairs';
import { ZONE_LIST, getZoneInfo, formatUtcOffsetLabel, type ZoneInfo } from '../data/zones';

interface CityPairPageProps {
  page: CityPairPageData;
  use24Hour?: boolean;
}

function titleZoneName(zone: ZoneInfo) {
  return zone.fullName.replace(/ Time$/, '');
}

function buildPageTitle(page: CityPairPageData, fromZone?: ZoneInfo, toZone?: ZoneInfo) {
  if (!fromZone || !toZone) return page.title;

  return `${fromZone.abbr} → ${toZone.abbr} Converter (${titleZoneName(fromZone)} to ${titleZoneName(
    toZone
  )} Time) | TimeAtlas`;
}

function buildPageDescription(page: CityPairPageData, fromZone?: ZoneInfo, toZone?: ZoneInfo) {
  if (!fromZone || !toZone) return page.description;

  return `Convert ${fromZone.fullName} (${fromZone.abbr}) to ${toZone.fullName} (${toZone.abbr}) instantly. See current time differences and compare both zones clearly.`;
}

function buildH1(page: CityPairPageData, fromZone?: ZoneInfo, toZone?: ZoneInfo) {
  if (!fromZone || !toZone) return page.h1;

  return `${fromZone.abbr} → ${toZone.abbr} Converter`;
}

function buildCommonLinks(page: CityPairPageData, fromZone?: ZoneInfo, toZone?: ZoneInfo) {
  if (!fromZone || !toZone) return page.related;

  const preferredTargets = ZONE_LIST.filter((zone) => zone.abbr !== fromZone.abbr)
    .sort((a, b) => {
      if (a.abbr === toZone.abbr) return -1;
      if (b.abbr === toZone.abbr) return 1;
      return (
        Math.abs(a.utcOffset - fromZone.utcOffset) - Math.abs(b.utcOffset - fromZone.utcOffset)
      );
    })
    .map((zone) => `${fromZone.slugPart}-to-${zone.slugPart}`);

  const preferredSlugs = [
    ...preferredTargets,
    `${toZone.slugPart}-to-${fromZone.slugPart}`,
    'pst-to-est',
    'est-to-pst',
    'utc-to-est',
    'gmt-to-est',
  ];

  const links = preferredSlugs
    .map((slug) => cityPairs.find((item) => item.slug === slug))
    .filter((item): item is CityPairPageData => Boolean(item))
    .filter((item) => item.slug !== page.slug)
    .map((item) => ({ href: `/${item.slug}`, label: `${item.fromZone} → ${item.toZone}` }));

  const unique = new Map<string, { href: string; label: string }>();
  for (const link of [...links, ...page.related]) {
    if (link.href !== `/${page.slug}` && !unique.has(link.href)) unique.set(link.href, link);
  }

  return Array.from(unique.values()).slice(0, 7);
}

export function CityPairPage({ page, use24Hour = false }: CityPairPageProps) {
  const fromZone = getZoneInfo(page.fromZone);
  const toZone = getZoneInfo(page.toZone);
  const title = buildPageTitle(page, fromZone, toZone);
  const description = buildPageDescription(page, fromZone, toZone);
  const h1 = buildH1(page, fromZone, toZone);
  const commonLinks = buildCommonLinks(page, fromZone, toZone);

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <SEO title={title} description={description} path={`/${page.slug}`} />

      <main className="flex-1 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 w-full">
        {/* Breadcrumb */}
        <div className="mb-6 text-sm font-open-sans text-slate-600">
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

        {/* H1 */}
        <h1 className="text-4xl sm:text-5xl font-bold font-inter mb-4 text-slate-900">{h1}</h1>

        {/* Intro */}
        <p className="text-lg font-open-sans text-slate-700 mb-8 leading-relaxed">{page.intro}</p>

        {/* ── 1. ABOVE THE FOLD: Instant Answer Header ─────────────────── */}
        {fromZone && toZone && (
          <TimeHeader fromZone={fromZone} toZone={toZone} use24Hour={use24Hour} />
        )}

        {/* ── 2. TIME ZONE CONVERTER: Pill Pair + Compare Times Table ───── */}
        <Section title="Time Zone Converter">
          {/* Pill pair */}
          {fromZone && toZone && (
            <div className="mb-8">
              <TimePillPair fromZone={fromZone} toZone={toZone} use24Hour={use24Hour} />
            </div>
          )}

          {/* Compare Times table */}
          <h3 className="text-base font-semibold font-inter text-slate-700 mb-4">Compare Times</h3>
          <TimeTable
            conversions={page.conversions}
            fromZoneAbbr={page.fromZone}
            toZoneAbbr={page.toZone}
          />
        </Section>

        {/* ── 3. COMMON TIME CONVERSIONS: Expansion Grid ────────────────── */}
        <Section title="Common Time Conversions">
          <ConversionGrid />
        </Section>

        {/* ── 4. HOW TIME ZONE CONVERSION WORKS ─────────────────────────── */}
        <Section title="How Time Zone Conversion Works">
          <div className="space-y-4 font-open-sans text-slate-700 leading-relaxed">
            <p>
              Time zone conversion works by comparing the UTC offset of one location to another.
              Every city or region is measured relative to Coordinated Universal Time (UTC), which
              acts as the global reference point for civil time.
            </p>
            <p>{page.timeDifference}.</p>
            {/* Page-specific FAQ answers */}
            <div className="mt-4 space-y-4">
              {page.faq.map((item) => (
                <div key={item.question}>
                  <h3 className="font-semibold font-inter text-slate-900 mb-1">{item.question}</h3>
                  <p>{item.answer}</p>
                </div>
              ))}
            </div>
          </div>
        </Section>

        {/* ── 5. KEY CAPITAL TIME ZONES ──────────────────────────────────── */}
        <Section title="Key Capital Time Zones">
          <div className="space-y-3 font-open-sans text-slate-700 text-sm leading-relaxed">
            {[
              {
                region: 'North America',
                detail:
                  'New York (EST/UTC−5), Chicago (CST/UTC−6), Denver (MST/UTC−7), Los Angeles (PST/UTC−8), Anchorage (AKST/UTC−9), Honolulu (HST/UTC−10)',
              },
              { region: 'Europe (GMT/UTC±0)', detail: 'London, Dublin, Lisbon' },
              { region: 'Europe (CET/UTC+1)', detail: 'Paris, Berlin, Rome, Madrid' },
              { region: 'Asia (IST/UTC+5:30)', detail: 'New Delhi, Mumbai, Kolkata' },
              { region: 'Asia (JST/UTC+9)', detail: 'Tokyo, Seoul' },
            ].map(({ region, detail }) => (
              <div key={region}>
                <span className="font-semibold text-slate-900">{region}: </span>
                {detail}
              </div>
            ))}
          </div>
        </Section>

        {/* ── 6. UTC — THE GLOBAL TIME STANDARD ─────────────────────────── */}
        <Section title="UTC — The Global Time Standard">
          <p className="font-open-sans text-slate-700 leading-relaxed">
            Coordinated Universal Time (UTC) is the primary time standard by which the world
            regulates clocks and time. It is not adjusted for daylight saving time and serves as the
            baseline for all time zone offsets worldwide.{' '}
            {fromZone && (
              <>
                {page.fromZone} is {formatUtcOffsetLabel(fromZone.utcOffset)}.{' '}
              </>
            )}
            Developers typically store timestamps in UTC to avoid DST-related bugs and ensure
            consistent time comparisons across systems.
          </p>
        </Section>

        {/* ── 7. TIME EXPLAINED ──────────────────────────────────────────── */}
        <Section title="Time Explained">
          <div className="space-y-3 font-open-sans text-slate-700 leading-relaxed text-sm">
            <p>
              <strong className="font-inter text-slate-900">What is UTC?</strong> Coordinated
              Universal Time is the primary time standard that never changes for daylight saving.
            </p>
            <p>
              <strong className="font-inter text-slate-900">What is GMT?</strong> Greenwich Mean
              Time corresponds to UTC+00:00 and is the time at the Royal Observatory in Greenwich,
              London.
            </p>
            <p>
              <strong className="font-inter text-slate-900">What is Daylight Saving Time?</strong>{' '}
              DST advances clocks by one hour during summer months to extend evening daylight. Not
              all time zones observe it — Hawaii (HST), Japan (JST), and India (IST) do not.
            </p>
          </div>
        </Section>

        {/* ── 8. COMMON TIME CONVERSIONS ─────────────────────────────────── */}
        <section className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-2xl font-bold font-inter text-slate-900 mb-4">
            Common Time Conversions
          </h2>
          <div className="flex flex-wrap gap-3">
            {commonLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="rounded-full border border-slate-200 px-4 py-2 text-sm font-open-sans text-indigo-600 hover:border-indigo-300 hover:bg-indigo-50 transition-colors"
              >
                {link.label} →
              </a>
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
