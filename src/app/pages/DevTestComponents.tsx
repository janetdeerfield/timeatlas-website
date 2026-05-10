import { useEffect, useState } from 'react';
import { SEO } from '../components/SEO';
import { ClientOnlyTime } from '../components/ClientOnlyTime';
import { CityZoneTile } from '../components/CityZoneTile';
import { ConverterCard } from '../components/ConverterCard';

function useFormattedTime(timeZone: string, hour12: boolean): string {
  const [time, setTime] = useState('--:--:--');

  useEffect(() => {
    const fmt = new Intl.DateTimeFormat('en-US', {
      timeZone,
      hour: 'numeric',
      minute: '2-digit',
      second: '2-digit',
      hour12,
    });
    const tick = () => setTime(fmt.format(new Date()));
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [timeZone, hour12]);

  return time;
}

export function DevTestComponents() {
  const nyTime = useFormattedTime('America/New_York', true);
  const londonTime = useFormattedTime('Europe/London', true);
  const tokyoTime = useFormattedTime('Asia/Tokyo', true);
  const sydneyTime = useFormattedTime('Australia/Sydney', true);
  const dubaiTime = useFormattedTime('Asia/Dubai', true);
  const laTime = useFormattedTime('America/Los_Angeles', true);
  const berlinTime = useFormattedTime('Europe/Berlin', true);
  const mumbaiTime = useFormattedTime('Asia/Kolkata', true);

  return (
    <div className="max-w-6xl mx-auto px-6 py-10" style={{ fontFamily: 'var(--font-body)' }}>
      <SEO
        title="Dev: Component Preview — TimeAtlas"
        description="Internal component preview page for Phase 1 components."
        path="/dev-test-components"
        robots="noindex,nofollow"
      />

      <div className="mb-10">
        <h1
          className="text-3xl font-bold mb-2"
          style={{ fontFamily: 'var(--font-display)', color: 'var(--color-onyx)' }}
        >
          Phase 1 Component Preview
        </h1>
        <p style={{ color: 'var(--color-charcoal-blue)', fontSize: '0.9375rem' }}>
          Internal dev utility — not indexed, not shipped to production.
        </p>
      </div>

      {/* ─── ClientOnlyTime ─────────────────────────────── */}
      <Section
        title="ClientOnlyTime"
        description="Hydration-safe wrapper. Shows placeholder server-side, live content after mount."
      >
        <div className="flex flex-wrap gap-6 items-center">
          <DemoCard label="Default placeholder">
            <ClientOnlyTime>
              {(mounted) => (mounted ? <LiveClock timeZone="America/New_York" /> : null)}
            </ClientOnlyTime>
          </DemoCard>
          <DemoCard label="Custom placeholder '⏳ Loading…'">
            <ClientOnlyTime placeholder="⏳ Loading…">
              {(mounted) => (mounted ? <LiveClock timeZone="Europe/London" /> : null)}
            </ClientOnlyTime>
          </DemoCard>
          <DemoCard label="Placeholder '--'">
            <ClientOnlyTime placeholder="--">
              {(mounted) => (mounted ? <LiveClock timeZone="Asia/Tokyo" /> : null)}
            </ClientOnlyTime>
          </DemoCard>
        </div>
      </Section>

      {/* ─── CityZoneTile — Standard ──────────────────── */}
      <Section
        title="CityZoneTile — standard"
        description="Default card layout for the /world grid."
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <CityZoneTile
            name="New York"
            country="United States"
            currentTime={nyTime}
            utcOffset="UTC-5"
            tzAbbreviation="EST"
            href="/time/new-york"
          />
          <CityZoneTile
            name="London"
            country="United Kingdom"
            currentTime={londonTime}
            utcOffset="UTC+0"
            tzAbbreviation="GMT"
            href="/time/london"
          />
          <CityZoneTile
            name="Tokyo"
            country="Japan"
            currentTime={tokyoTime}
            utcOffset="UTC+9"
            tzAbbreviation="JST"
            href="/time/tokyo"
          />
          <CityZoneTile
            name="Sydney"
            country="Australia"
            currentTime={sydneyTime}
            utcOffset="UTC+10"
            tzAbbreviation="AEST"
            href="/time/sydney"
          />
        </div>
      </Section>

      {/* ─── CityZoneTile — with-flag ─────────────────── */}
      <Section
        title="CityZoneTile — with-flag"
        description="Standard card with country flag emoji."
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <CityZoneTile
            variant="with-flag"
            name="New York"
            country="United States"
            currentTime={nyTime}
            utcOffset="UTC-5"
            tzAbbreviation="EST"
            href="/time/new-york"
            flag="🇺🇸"
          />
          <CityZoneTile
            variant="with-flag"
            name="London"
            country="United Kingdom"
            currentTime={londonTime}
            utcOffset="UTC+0"
            tzAbbreviation="GMT"
            href="/time/london"
            flag="🇬🇧"
          />
          <CityZoneTile
            variant="with-flag"
            name="Tokyo"
            country="Japan"
            currentTime={tokyoTime}
            utcOffset="UTC+9"
            tzAbbreviation="JST"
            href="/time/tokyo"
            flag="🇯🇵"
          />
          <CityZoneTile
            variant="with-flag"
            name="Mumbai"
            country="India"
            currentTime={mumbaiTime}
            utcOffset="UTC+5:30"
            tzAbbreviation="IST"
            href="/time/mumbai"
            flag="🇮🇳"
          />
        </div>
      </Section>

      {/* ─── CityZoneTile — compact ───────────────────── */}
      <Section title="CityZoneTile — compact" description="Slim row layout for homepage listings.">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-2xl">
          <CityZoneTile
            variant="compact"
            name="New York"
            country="United States"
            currentTime={nyTime}
            utcOffset="UTC-5"
            tzAbbreviation="EST"
            href="/time/new-york"
            flag="🇺🇸"
          />
          <CityZoneTile
            variant="compact"
            name="Los Angeles"
            country="United States"
            currentTime={laTime}
            utcOffset="UTC-8"
            tzAbbreviation="PST"
            href="/time/los-angeles"
          />
          <CityZoneTile
            variant="compact"
            name="Berlin"
            country="Germany"
            currentTime={berlinTime}
            utcOffset="UTC+1"
            tzAbbreviation="CET"
            href="/time/berlin"
            flag="🇩🇪"
          />
          <CityZoneTile
            variant="compact"
            name="Dubai"
            country="UAE"
            currentTime={dubaiTime}
            utcOffset="UTC+4"
            tzAbbreviation="GST"
            href="/time/dubai"
            flag="🇦🇪"
          />
        </div>
      </Section>

      {/* ─── CityZoneTile — offset-only ───────────────── */}
      <Section
        title="CityZoneTile — offset-only"
        description="Minimal row showing city name + UTC offset only."
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-2xl">
          <CityZoneTile
            variant="offset-only"
            name="New York"
            country="United States"
            currentTime={nyTime}
            utcOffset="UTC-5"
            tzAbbreviation="EST"
            href="/time/new-york"
          />
          <CityZoneTile
            variant="offset-only"
            name="London"
            country="United Kingdom"
            currentTime={londonTime}
            utcOffset="UTC+0"
            tzAbbreviation="GMT"
            href="/time/london"
          />
          <CityZoneTile
            variant="offset-only"
            name="Tokyo"
            country="Japan"
            currentTime={tokyoTime}
            utcOffset="UTC+9"
            tzAbbreviation="JST"
            href="/time/tokyo"
          />
          <CityZoneTile
            variant="offset-only"
            name="Sydney"
            country="Australia"
            currentTime={sydneyTime}
            utcOffset="UTC+10"
            tzAbbreviation="AEST"
            href="/time/sydney"
          />
        </div>
      </Section>

      {/* ─── ConverterCard — large ────────────────────── */}
      <Section
        title="ConverterCard — large"
        description="Featured converter cards for hero sections."
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <ConverterCard
            variant="large"
            sourceCode="EST"
            targetCode="PST"
            currentExampleTime="9:00 AM → 6:00 AM"
            href="/est-to-pst"
          />
          <ConverterCard
            variant="large"
            sourceCode="GMT"
            targetCode="JST"
            currentExampleTime="12:00 PM → 9:00 PM"
            href="/gmt-to-jst"
          />
          <ConverterCard
            variant="large"
            sourceCode="IST"
            targetCode="EST"
            currentExampleTime="10:30 PM → 12:00 PM"
            href="/ist-to-est"
          />
        </div>
      </Section>

      {/* ─── ConverterCard — medium ───────────────────── */}
      <Section
        title="ConverterCard — medium"
        description="Default converter cards for grid layouts (6 per row)."
      >
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          <ConverterCard
            sourceCode="EST"
            targetCode="PST"
            currentExampleTime="9:00 AM → 6:00 AM"
            href="/est-to-pst"
          />
          <ConverterCard
            sourceCode="PST"
            targetCode="EST"
            currentExampleTime="6:00 AM → 9:00 AM"
            href="/pst-to-est"
          />
          <ConverterCard
            sourceCode="UTC"
            targetCode="EST"
            currentExampleTime="2:00 PM → 9:00 AM"
            href="/utc-to-est"
          />
          <ConverterCard
            sourceCode="GMT"
            targetCode="CET"
            currentExampleTime="12:00 PM → 1:00 PM"
            href="/gmt-to-cet"
          />
          <ConverterCard
            sourceCode="JST"
            targetCode="PST"
            currentExampleTime="9:00 AM → 4:00 PM"
            href="/jst-to-pst"
          />
          <ConverterCard
            sourceCode="IST"
            targetCode="GMT"
            currentExampleTime="5:30 PM → 12:00 PM"
            href="/ist-to-gmt"
          />
        </div>
      </Section>

      {/* ─── ConverterCard — small ────────────────────── */}
      <Section
        title="ConverterCard — small"
        description="Compact converter cards for dense directories (12 per row)."
      >
        <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-6 xl:grid-cols-12 gap-2">
          <ConverterCard variant="small" sourceCode="EST" targetCode="PST" href="/est-to-pst" />
          <ConverterCard variant="small" sourceCode="PST" targetCode="EST" href="/pst-to-est" />
          <ConverterCard variant="small" sourceCode="UTC" targetCode="EST" href="/utc-to-est" />
          <ConverterCard variant="small" sourceCode="GMT" targetCode="EST" href="/gmt-to-est" />
          <ConverterCard variant="small" sourceCode="CET" targetCode="PST" href="/cet-to-pst" />
          <ConverterCard variant="small" sourceCode="IST" targetCode="EST" href="/ist-to-est" />
          <ConverterCard variant="small" sourceCode="JST" targetCode="GMT" href="/jst-to-gmt" />
          <ConverterCard variant="small" sourceCode="HST" targetCode="EST" href="/hst-to-est" />
          <ConverterCard variant="small" sourceCode="AKST" targetCode="CST" href="/akst-to-cst" />
          <ConverterCard variant="small" sourceCode="MST" targetCode="EST" href="/mst-to-est" />
          <ConverterCard variant="small" sourceCode="CST" targetCode="GMT" href="/cst-to-gmt" />
          <ConverterCard variant="small" sourceCode="AEST" targetCode="PST" href="/aest-to-pst" />
        </div>
      </Section>
    </div>
  );
}

/* ─── helper sub-components (page-local) ──────────── */

function Section({
  title,
  description,
  children,
}: {
  title: string;
  description: string;
  children: React.ReactNode;
}) {
  return (
    <section className="mb-12">
      <h2
        className="text-xl font-semibold mb-1"
        style={{ fontFamily: 'var(--font-display)', color: 'var(--color-onyx)' }}
      >
        {title}
      </h2>
      <p className="text-sm mb-4" style={{ color: 'var(--color-charcoal-blue)' }}>
        {description}
      </p>
      {children}
    </section>
  );
}

function DemoCard({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div
      className="p-4 rounded-lg"
      style={{
        backgroundColor: 'var(--color-panel)',
        border: '1px solid var(--color-border-light)',
      }}
    >
      <div className="text-xs mb-2" style={{ color: 'var(--color-charcoal-blue)' }}>
        {label}
      </div>
      <div
        className="text-2xl font-bold tabular-nums"
        style={{ fontFamily: 'var(--font-display)', color: 'var(--color-onyx)' }}
      >
        {children}
      </div>
    </div>
  );
}

function LiveClock({ timeZone }: { timeZone: string }) {
  const time = useFormattedTime(timeZone, true);
  return <>{time}</>;
}
