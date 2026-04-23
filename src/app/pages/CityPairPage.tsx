import { Footer } from '../components/Footer';
import { SEO } from '../components/SEO';
import { TimeHeader, TimePillPair, TimeTable, ConversionGrid, Section } from '../components/time';
import type { CityPairPageData } from '../data/cityPairs';
import { getZoneInfo, formatUtcOffsetLabel } from '../data/zones';

interface CityPairPageProps {
  page: CityPairPageData;
  use24Hour?: boolean;
}

export function CityPairPage({ page, use24Hour = false }: CityPairPageProps) {
  const fromZone = getZoneInfo(page.fromZone);
  const toZone = getZoneInfo(page.toZone);

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <SEO title={page.title} description={page.description} path={`/${page.slug}`} />

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
          <span className="text-slate-900 font-semibold">{page.h1}</span>
        </div>

        {/* H1 */}
        <h1 className="text-4xl sm:text-5xl font-bold font-inter mb-4 text-slate-900">
          {page.h1}
        </h1>

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
              { region: 'North America', detail: 'New York (ET/UTC−5), Chicago (CT/UTC−6), Denver (MT/UTC−7), Los Angeles (PT/UTC−8), Anchorage (AKT/UTC−9), Honolulu (HT/UTC−10)' },
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
            regulates clocks and time. It is not adjusted for daylight saving time and serves as
            the baseline for all time zone offsets worldwide.{' '}
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
              all time zones observe it — Hawaii (HT), Japan (JST), and India (IST) do not.
            </p>
          </div>
        </Section>

        {/* ── 8. RELATED CONVERSIONS ─────────────────────────────────────── */}
        <section className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-2xl font-bold font-inter text-slate-900 mb-4">
            Related Time Conversions
          </h2>
          <div className="flex flex-wrap gap-3">
            {page.related.map((link) => (
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
