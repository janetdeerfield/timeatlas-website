import { Footer } from '../components/Footer';
import { SEO } from '../components/SEO';
import {
  CityZoneTile,
  ClientOnlyTime,
  ConverterCard,
  SwapButton,
  useClientOnly,
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
      </main>

      <Footer />
    </div>
  );
}
