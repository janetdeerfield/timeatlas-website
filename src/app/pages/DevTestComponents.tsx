import { useState } from 'react';
import { Footer } from '../components/Footer';
import { SEO } from '../components/SEO';
import {
  AddToCalendarButtonGroup,
  CitySearchInput,
  CityZoneTile,
  ClientOnlyTime,
  CodeExampleTabbed,
  ConverterCard,
  CopyToClipboardButton,
  DstScheduleBlock,
  FaqItem,
  InternalLinkBlock,
  RegionTabBar,
  ShareLinkButton,
  SwapButton,
  useClientOnly,
  type DstScheduleZone,
} from '../components/time';

interface CitySample {
  name: string;
  country: string;
  tzAbbreviation: string;
  utcOffset: string;
  timeZone: string;
  href: string;
  flag?: string;
}

const citySamples: CitySample[] = [
  {
    name: 'Tokyo',
    country: 'Japan',
    tzAbbreviation: 'JST',
    utcOffset: '+09:00',
    timeZone: 'Asia/Tokyo',
    href: '/time/tokyo',
    flag: 'JP',
  },
  {
    name: 'New York',
    country: 'United States',
    tzAbbreviation: 'EDT',
    utcOffset: '-04:00',
    timeZone: 'America/New_York',
    href: '/time/new-york',
    flag: 'US',
  },
  {
    name: 'London',
    country: 'United Kingdom',
    tzAbbreviation: 'BST',
    utcOffset: '+01:00',
    timeZone: 'Europe/London',
    href: '/time/london',
    flag: 'GB',
  },
  {
    name: 'Dubai',
    country: 'United Arab Emirates',
    tzAbbreviation: 'GST',
    utcOffset: '+04:00',
    timeZone: 'Asia/Dubai',
    href: '/time/dubai',
    flag: 'AE',
  },
];

const converterSamples = [
  {
    sourceCode: 'PST',
    targetCode: 'EST',
    href: '/pst-to-est',
    currentExampleTime: '9:00 AM -> 12:00 PM',
  },
  {
    sourceCode: 'UTC',
    targetCode: 'IST',
    href: '/utc-to-ist',
    currentExampleTime: '16:30 -> 22:00',
  },
  {
    sourceCode: 'CET',
    targetCode: 'JST',
    href: '/cet-to-jst',
    currentExampleTime: '3:15 PM -> 10:15 PM',
  },
];

const dstZoneSamples: [DstScheduleZone, DstScheduleZone] = [
  {
    code: 'EST',
    name: 'Eastern Time',
    short_name: 'Eastern Time',
    utc_offset_display: 'UTC-05:00',
    observes_dst: true,
    dst: {
      summer_code: 'EDT',
      summer_offset_display: 'UTC-04:00',
      start_rule: 'Second Sunday in March',
      end_rule: 'First Sunday in November',
      start_date_current_year: '2026-03-08',
      end_date_current_year: '2026-11-01',
      start_clock_change: '2:00 AM -> 3:00 AM',
      end_clock_change: '2:00 AM -> 1:00 AM',
    },
  },
  {
    code: 'JST',
    name: 'Japan Standard Time',
    short_name: 'Japan Standard Time',
    utc_offset_display: 'UTC+09:00',
    observes_dst: false,
  },
];

const regionSamples = [
  { id: 'all', label: 'All', href: '/world' },
  { id: 'americas', label: 'Americas', href: '/world/americas' },
  { id: 'europe', label: 'Europe', href: '/world/europe' },
  { id: 'africa', label: 'Africa', href: '/world/africa' },
  { id: 'middle-east', label: 'Middle East', href: '/world/middle-east' },
  { id: 'asia', label: 'Asia', href: '/world/asia' },
  { id: 'pacific', label: 'Pacific', href: '/world/pacific' },
];

const internalLinkSamples = [
  {
    label: 'Convert EST to PST',
    href: '/est-to-pst',
    sourceCode: 'EST',
    targetCode: 'PST',
    currentExampleTime: '9:00 AM -> 6:00 AM',
  },
  {
    label: 'Convert EST to UTC',
    href: '/est-to-utc',
    sourceCode: 'EST',
    targetCode: 'UTC',
    currentExampleTime: '9:00 AM -> 2:00 PM',
  },
  {
    label: 'Convert EST to GMT',
    href: '/est-to-gmt',
    sourceCode: 'EST',
    targetCode: 'GMT',
    currentExampleTime: '9:00 AM -> 2:00 PM',
  },
];

const codeExampleSamples = [
  {
    language: 'JavaScript',
    code: "const formatter = new Intl.DateTimeFormat('en-US', { timeZone: 'UTC', timeStyle: 'medium' });\nconsole.log(formatter.format(new Date()));",
  },
  {
    language: 'Python',
    code: "from datetime import datetime, timezone\nprint(datetime.now(timezone.utc).isoformat())",
  },
  {
    language: 'Ruby',
    code: "require 'time'\nputs Time.now.utc.iso8601",
  },
  {
    language: 'Go',
    code: 'package main\n\nimport (\n  "fmt"\n  "time"\n)\n\nfunc main() {\n  fmt.Println(time.Now().UTC().Format(time.RFC3339))\n}',
  },
  {
    language: 'PHP',
    code: "$now = new DateTimeImmutable('now', new DateTimeZone('UTC'));\necho $now->format(DateTimeInterface::ATOM);",
  },
  {
    language: 'Java',
    code: 'import java.time.Instant;\n\nSystem.out.println(Instant.now().toString());',
  },
  {
    language: 'C#',
    code: 'Console.WriteLine(DateTimeOffset.UtcNow.ToString("O"));',
  },
  {
    language: 'SQL',
    code: 'SELECT CURRENT_TIMESTAMP AT TIME ZONE \'UTC\' AS utc_time;',
  },
];

function formatTimeForZone(timeZone: string) {
  try {
    return new Intl.DateTimeFormat('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      second: '2-digit',
      hour12: true,
      timeZone,
    }).format(new Date());
  } catch {
    return '--:--:--';
  }
}

function renderCityVariant(
  variant: 'compact' | 'standard' | 'with-flag' | 'offset-only',
  mounted: boolean
) {
  return citySamples.map((city) => (
    <CityZoneTile
      key={`${variant}-${city.name}`}
      name={city.name}
      country={city.country}
      tzAbbreviation={city.tzAbbreviation}
      utcOffset={city.utcOffset}
      href={city.href}
      variant={variant}
      flag={variant === 'with-flag' ? city.flag : undefined}
      currentTime={mounted ? formatTimeForZone(city.timeZone) : '--:--:--'}
    />
  ));
}

export function DevTestComponents() {
  const mounted = useClientOnly();
  const [activeRegion, setActiveRegion] = useState('all');
  const [selectedCity, setSelectedCity] = useState(citySamples[0]);

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <SEO
        title="Dev Test Components | TimeAtlas"
        description="Temporary development-only preview for V3 Phase 1 components."
        path="/dev-test-components"
        robots="noindex,nofollow"
      />

      <main className="mx-auto w-full max-w-7xl flex-1 space-y-10 px-4 py-10 sm:px-6 lg:px-8">
        <header className="space-y-2">
          <p className="font-[var(--font-display)] text-sm font-semibold uppercase tracking-wide text-accent">
            Phase 1 component library
          </p>
          <h1 className="font-[var(--font-display)] text-4xl font-semibold text-foreground">
            Dev Test Components
          </h1>
          <p className="font-[var(--font-body)] text-base text-muted-foreground">
            Side-by-side comparison view for V3 Phase 1 components.
          </p>
        </header>

        <section className="space-y-4">
          <h2 className="font-[var(--font-display)] text-2xl font-semibold text-card-foreground">
            ClientOnlyTime
          </h2>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            {citySamples.slice(0, 3).map((city) => (
              <div
                key={`client-time-${city.name}`}
                className="rounded-xl border border-border bg-card p-4 shadow-sm"
              >
                <p className="mb-1 font-[var(--font-body)] text-sm text-muted-foreground">
                  {city.name} ({city.tzAbbreviation})
                </p>
                <p className="font-mono text-2xl text-card-foreground">
                  <ClientOnlyTime>
                    {(mounted) => (mounted ? formatTimeForZone(city.timeZone) : '--:--:--')}
                  </ClientOnlyTime>
                </p>
              </div>
            ))}
          </div>
        </section>

        <section className="space-y-4">
          <h2 className="font-[var(--font-display)] text-2xl font-semibold text-card-foreground">
            CityZoneTile Variants
          </h2>
          <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
            <div className="space-y-3">
              <h3 className="font-[var(--font-display)] text-lg font-semibold text-muted-foreground">
                Compact
              </h3>
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                {renderCityVariant('compact', mounted)}
              </div>
            </div>

            <div className="space-y-3">
              <h3 className="font-[var(--font-display)] text-lg font-semibold text-muted-foreground">
                Standard
              </h3>
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                {renderCityVariant('standard', mounted)}
              </div>
            </div>

            <div className="space-y-3">
              <h3 className="font-[var(--font-display)] text-lg font-semibold text-muted-foreground">
                With Flag
              </h3>
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                {renderCityVariant('with-flag', mounted)}
              </div>
            </div>

            <div className="space-y-3">
              <h3 className="font-[var(--font-display)] text-lg font-semibold text-muted-foreground">
                Offset Only
              </h3>
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                {renderCityVariant('offset-only', mounted)}
              </div>
            </div>
          </div>
        </section>

        <section className="space-y-4">
          <h2 className="font-[var(--font-display)] text-2xl font-semibold text-card-foreground">
            ConverterCard Variants
          </h2>
          <div className="space-y-6">
            <div className="space-y-3">
              <h3 className="font-[var(--font-display)] text-lg font-semibold text-muted-foreground">
                Small
              </h3>
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {converterSamples.map((sample) => (
                  <ConverterCard key={`small-${sample.href}`} {...sample} variant="small" />
                ))}
              </div>
            </div>

            <div className="space-y-3">
              <h3 className="font-[var(--font-display)] text-lg font-semibold text-muted-foreground">
                Medium
              </h3>
              <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
                {converterSamples.map((sample) => (
                  <ConverterCard key={`medium-${sample.href}`} {...sample} variant="medium" />
                ))}
              </div>
            </div>

            <div className="space-y-3">
              <h3 className="font-[var(--font-display)] text-lg font-semibold text-muted-foreground">
                Large
              </h3>
              <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
                {converterSamples.map((sample) => (
                  <ConverterCard key={`large-${sample.href}`} {...sample} variant="large" />
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="space-y-4 rounded-xl border border-border bg-card p-6 shadow-sm">
          <h2 className="font-[var(--font-display)] text-2xl font-semibold text-card-foreground">
            SwapButton
          </h2>
          <p className="font-[var(--font-body)] text-sm text-muted-foreground">
            Sample: source EST, target PST. The component renders a crawlable anchor to
            /pst-to-est.
          </p>
          <SwapButton currentSource="EST" currentTarget="PST" />
        </section>

        <section className="space-y-4 rounded-xl border border-border bg-card p-6 shadow-sm">
          <h2 className="font-[var(--font-display)] text-2xl font-semibold text-card-foreground">
            CopyToClipboardButton
          </h2>
          <p className="font-[var(--font-body)] text-sm text-muted-foreground">
            Sample: copy a UTC time string and show copied feedback for 1500ms.
          </p>
          <div className="inline-flex items-center gap-3 rounded-lg border border-border bg-muted/30 px-3 py-2">
            <code className="font-mono text-sm text-card-foreground">14:30:00 UTC</code>
            <CopyToClipboardButton value="14:30:00 UTC" label="Copy UTC time" />
          </div>
        </section>

        <section className="space-y-4">
          <h2 className="font-[var(--font-display)] text-2xl font-semibold text-card-foreground">
            FaqItem
          </h2>
          <FaqItem
            question="Does TimeAtlas render FAQ schema in the page HTML?"
            answer="Yes. FaqItem renders Schema.org Question and Answer microdata with accessible collapse controls."
            defaultOpen
          />
        </section>

        <section className="space-y-4">
          <h2 className="font-[var(--font-display)] text-2xl font-semibold text-card-foreground">
            DstScheduleBlock
          </h2>
          <DstScheduleBlock zones={dstZoneSamples} currentYear={2026} />
        </section>

        <section className="space-y-4 rounded-xl border border-border bg-card p-6 shadow-sm">
          <h2 className="font-[var(--font-display)] text-2xl font-semibold text-card-foreground">
            RegionTabBar
          </h2>
          <p className="font-[var(--font-body)] text-sm text-muted-foreground">
            Sample active region: {regionSamples.find((region) => region.id === activeRegion)?.label}
          </p>
          <RegionTabBar
            regions={regionSamples}
            activeRegion={activeRegion}
            onChange={(region) => setActiveRegion(region.id)}
          />
        </section>

        <section className="space-y-4 rounded-xl border border-border bg-card p-6 shadow-sm">
          <h2 className="font-[var(--font-display)] text-2xl font-semibold text-card-foreground">
            AddToCalendarButtonGroup
          </h2>
          <p className="font-[var(--font-body)] text-sm text-muted-foreground">
            Sample event: TimeAtlas planning review, May 12, 2026 at 2:30 PM Eastern.
          </p>
          <AddToCalendarButtonGroup
            eventTitle="TimeAtlas planning review"
            startTime="2026-05-12T14:30:00-04:00"
            endTime="2026-05-12T15:00:00-04:00"
            description="Review Phase 1 TimeAtlas component library previews."
          />
        </section>

        <section className="space-y-4">
          <h2 className="font-[var(--font-display)] text-2xl font-semibold text-card-foreground">
            InternalLinkBlock
          </h2>
          <InternalLinkBlock
            title="Convert from EST"
            variant="convert-from"
            links={internalLinkSamples}
          />
        </section>

        <section className="space-y-4 rounded-xl border border-border bg-card p-6 shadow-sm">
          <h2 className="font-[var(--font-display)] text-2xl font-semibold text-card-foreground">
            ShareLinkButton
          </h2>
          <p className="font-[var(--font-body)] text-sm text-muted-foreground">
            Sample share state: selected cities and meeting time encoded into the current URL.
          </p>
          <ShareLinkButton
            label="Copy share link"
            state={{ cities: ['nyc', 'ldn', 'tokyo'], time: '14:30', format: '12h' }}
          />
        </section>

        <section className="space-y-4 rounded-xl border border-border bg-card p-6 shadow-sm">
          <h2 className="font-[var(--font-display)] text-2xl font-semibold text-card-foreground">
            CitySearchInput
          </h2>
          <p className="font-[var(--font-body)] text-sm text-muted-foreground">
            Selected city: {selectedCity.name}, {selectedCity.country}
          </p>
          <CitySearchInput
            cities={citySamples.map((city) => ({
              ...city,
              currentTime: mounted ? formatTimeForZone(city.timeZone) : '--:--:--',
            }))}
            onSelect={(city) => setSelectedCity(city)}
          />
        </section>

        <section className="space-y-4">
          <h2 className="font-[var(--font-display)] text-2xl font-semibold text-card-foreground">
            CodeExampleTabbed
          </h2>
          <CodeExampleTabbed examples={codeExampleSamples} />
        </section>
      </main>

      <Footer />
    </div>
  );
}
