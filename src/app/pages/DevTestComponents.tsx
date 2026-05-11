import { Footer } from '../components/Footer';
import { SEO } from '../components/SEO';
import { ClientOnlyTime } from '../components/ClientOnlyTime';
import { CityZoneTile } from '../components/CityZoneTile';
import { ConverterCard } from '../components/ConverterCard';

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

function renderCityVariant(variant: 'compact' | 'standard' | 'with-flag' | 'offset-only') {
  return citySamples.map((city) => (
    <ClientOnlyTime key={`${variant}-${city.name}`}>
      {(mounted) => (
        <CityZoneTile
          name={city.name}
          country={city.country}
          tzAbbreviation={city.tzAbbreviation}
          utcOffset={city.utcOffset}
          href={city.href}
          variant={variant}
          flag={variant === 'with-flag' ? city.flag : undefined}
          currentTime={mounted ? formatTimeForZone(city.timeZone) : '--:--:--'}
        />
      )}
    </ClientOnlyTime>
  ));
}

export function DevTestComponents() {
  return (
    <div className="min-h-screen flex flex-col" style={{ backgroundColor: 'var(--color-page-bg)' }}>
      <SEO
        title="Dev Test Components | TimeAtlas"
        description="Temporary development-only preview for V3 Phase 1 components."
        path="/dev-test-components"
        robots="noindex,nofollow"
      />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
        <header className="space-y-2">
          <h1 className="text-4xl font-semibold" style={{ color: 'var(--color-onyx)' }}>
            Dev Test Components
          </h1>
          <p className="text-base" style={{ color: 'var(--color-charcoal-blue)' }}>
            Side-by-side comparison view for V3 Phase 1 components.
          </p>
        </header>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold" style={{ color: 'var(--color-onyx)' }}>
            ClientOnlyTime
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {citySamples.slice(0, 3).map((city) => (
              <div
                key={`client-time-${city.name}`}
                className="rounded-xl border p-4"
                style={{ backgroundColor: 'white', borderColor: 'var(--color-border-light)' }}
              >
                <p className="text-sm mb-1" style={{ color: 'var(--color-wisteria-blue)' }}>
                  {city.name} ({city.tzAbbreviation})
                </p>
                <p className="font-mono text-2xl" style={{ color: 'var(--color-onyx)' }}>
                  <ClientOnlyTime>
                    {(mounted) => (mounted ? formatTimeForZone(city.timeZone) : '--:--:--')}
                  </ClientOnlyTime>
                </p>
              </div>
            ))}
          </div>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold" style={{ color: 'var(--color-onyx)' }}>
            CityZoneTile Variants
          </h2>
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
            <div className="space-y-3">
              <h3 className="text-lg font-semibold" style={{ color: 'var(--color-charcoal-blue)' }}>
                Compact
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">{renderCityVariant('compact')}</div>
            </div>

            <div className="space-y-3">
              <h3 className="text-lg font-semibold" style={{ color: 'var(--color-charcoal-blue)' }}>
                Standard
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">{renderCityVariant('standard')}</div>
            </div>

            <div className="space-y-3">
              <h3 className="text-lg font-semibold" style={{ color: 'var(--color-charcoal-blue)' }}>
                With Flag
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">{renderCityVariant('with-flag')}</div>
            </div>

            <div className="space-y-3">
              <h3 className="text-lg font-semibold" style={{ color: 'var(--color-charcoal-blue)' }}>
                Offset Only
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">{renderCityVariant('offset-only')}</div>
            </div>
          </div>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold" style={{ color: 'var(--color-onyx)' }}>
            ConverterCard Variants
          </h2>
          <div className="space-y-6">
            <div className="space-y-3">
              <h3 className="text-lg font-semibold" style={{ color: 'var(--color-charcoal-blue)' }}>
                Small
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {converterSamples.map((sample) => (
                  <ConverterCard key={`small-${sample.href}`} {...sample} variant="small" />
                ))}
              </div>
            </div>

            <div className="space-y-3">
              <h3 className="text-lg font-semibold" style={{ color: 'var(--color-charcoal-blue)' }}>
                Medium
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                {converterSamples.map((sample) => (
                  <ConverterCard key={`medium-${sample.href}`} {...sample} variant="medium" />
                ))}
              </div>
            </div>

            <div className="space-y-3">
              <h3 className="text-lg font-semibold" style={{ color: 'var(--color-charcoal-blue)' }}>
                Large
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                {converterSamples.map((sample) => (
                  <ConverterCard key={`large-${sample.href}`} {...sample} variant="large" />
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
