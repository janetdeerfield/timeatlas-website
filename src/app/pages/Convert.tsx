import { useState, useEffect } from 'react';
import { ArrowLeftRight, ChevronDown } from 'lucide-react';
import { Footer } from '../components/Footer';
import { SEO } from '../components/SEO';
import { majorCities, getShortDateInTimezone, getTimeDifference } from '../utils/time';
import { formatTimeDifference, formatDayDifference } from '../utils/format';
import { useTime } from '../hooks/useTime';
import { ConversionGrid } from '../components/time';

interface ConvertProps {
  use24Hour: boolean;
}

export function Convert({ use24Hour }: ConvertProps) {
  const [fromCity, setFromCity] = useState(majorCities[0]);
  const [toCity, setToCity] = useState(majorCities[1]);
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');
  const [openAccordion, setOpenAccordion] = useState<string | null>(null);

  const fromTimeData = useTime({
    timeZone: fromCity.timezone,
    format: use24Hour ? '24h' : '12h',
    showSeconds: true,
  });

  const toTimeData = useTime({
    timeZone: toCity.timezone,
    format: use24Hour ? '24h' : '12h',
    showSeconds: true,
  });

  useEffect(() => {
    const updateDates = () => {
      setFromDate(getShortDateInTimezone(fromCity.timezone));
      setToDate(getShortDateInTimezone(toCity.timezone));
    };

    updateDates();
    const interval = setInterval(updateDates, 1000);

    return () => clearInterval(interval);
  }, [fromCity, toCity]);

  const timeDiff = getTimeDifference(fromCity.timezone, toCity.timezone);
  const isAhead = timeDiff.hours > 0 || (timeDiff.hours === 0 && timeDiff.minutes > 0);

  const handleSwap = () => {
    const temp = fromCity;
    setFromCity(toCity);
    setToCity(temp);
  };

  const toggleAccordion = (id: string) => {
    setOpenAccordion(openAccordion === id ? null : id);
  };

  return (
    <div className="min-h-screen flex flex-col" style={{ backgroundColor: '#FEFEFE' }}>
      <SEO
        title="Time Zone Converter – Compare Times Between Cities | TimeAtlas"
        description="Convert time between cities instantly. Compare time zones and plan across regions."
        path="/convert"
      />
      <div className="flex-1 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16 w-full">
        <div className="text-center mb-12">
          <h1
            className="text-5xl font-bold mb-3"
            style={{
              fontFamily: 'Inter, sans-serif',
              color: '#080A0C',
            }}
          >
            Time Zone Converter
          </h1>
          <p
            className="text-lg"
            style={{
              fontFamily: 'Open Sans, sans-serif',
              color: '#364151',
            }}
          >
            Compare time between any two cities in the world
          </p>
        </div>

        {/* City Selectors */}
        <div
          className="bg-white rounded-xl shadow-sm p-6 mb-6"
          style={{ border: '1px solid #E6E9EE' }}
        >
          <div className="flex flex-col md:flex-row items-center gap-4">
            <div className="flex-1 w-full">
              <label
                className="block text-sm font-medium mb-2"
                style={{
                  fontFamily: 'Inter, sans-serif',
                  color: '#364151',
                }}
              >
                From
              </label>
              <select
                value={fromCity.name}
                onChange={(e) => {
                  const city = majorCities.find((c) => c.name === e.target.value);
                  if (city) setFromCity(city);
                }}
                className="w-full px-4 py-3 rounded-lg"
                style={{
                  fontFamily: 'Open Sans, sans-serif',
                  border: '1px solid #D9DEE6',
                  color: '#080A0C',
                }}
              >
                {majorCities.map((city) => (
                  <option key={city.timezone} value={city.name}>
                    {city.name} ({city.timezoneAbbrev}) {city.utcOffset}
                  </option>
                ))}
              </select>
            </div>

            <button
              onClick={handleSwap}
              className="p-3 rounded-lg transition-colors mt-7"
              style={{
                backgroundColor: '#F0F9F3',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#005EE9';
                const icon = e.currentTarget.querySelector<SVGSVGElement>('svg');
                if (icon) icon.style.color = 'white';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = '#F0F9F3';
                const icon = e.currentTarget.querySelector<SVGSVGElement>('svg');
                if (icon) icon.style.color = '#2E45F0';
              }}
              title="Swap cities"
            >
              <ArrowLeftRight className="w-5 h-5" style={{ color: '#2E45F0' }} />
            </button>

            <div className="flex-1 w-full">
              <label
                className="block text-sm font-medium mb-2"
                style={{
                  fontFamily: 'Inter, sans-serif',
                  color: '#364151',
                }}
              >
                To
              </label>
              <select
                value={toCity.name}
                onChange={(e) => {
                  const city = majorCities.find((c) => c.name === e.target.value);
                  if (city) setToCity(city);
                }}
                className="w-full px-4 py-3 rounded-lg"
                style={{
                  fontFamily: 'Open Sans, sans-serif',
                  border: '1px solid #D9DEE6',
                  color: '#080A0C',
                }}
              >
                {majorCities.map((city) => (
                  <option key={city.timezone} value={city.name}>
                    {city.name} ({city.timezoneAbbrev}) {city.utcOffset}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Time Comparison Cards */}
        <div className="grid md:grid-cols-2 gap-6 mb-6">
          {/* From City Card */}
          <div
            className="bg-white rounded-xl shadow-sm p-8"
            style={{ border: '1px solid #E6E9EE' }}
          >
            <h3
              className="text-lg font-semibold mb-2"
              style={{
                fontFamily: 'Inter, sans-serif',
                color: '#080A0C',
              }}
            >
              {fromCity.name}
            </h3>
            <p
              className="text-sm mb-4"
              style={{
                fontFamily: 'Open Sans, sans-serif',
                color: '#8495CB',
              }}
            >
              {fromCity.timezoneDisplay || `${fromCity.timezoneAbbrev} · ${fromCity.utcOffset}`}
            </p>
            <div className="mb-4">
              <div
                className="text-5xl font-bold tabular-nums mb-2"
                style={{
                  fontFamily: 'Inter, sans-serif',
                  fontWeight: 800,
                  color: '#080A0C',
                }}
              >
                {fromTimeData.formattedTime}
              </div>
              <div
                className="text-lg"
                style={{
                  fontFamily: 'Open Sans, sans-serif',
                  color: '#364151',
                }}
              >
                {fromDate}
              </div>
            </div>
          </div>

          {/* To City Card */}
          <div
            className="bg-white rounded-xl shadow-sm p-8"
            style={{ border: '1px solid #E6E9EE' }}
          >
            <h3
              className="text-lg font-semibold mb-2"
              style={{
                fontFamily: 'Inter, sans-serif',
                color: '#080A0C',
              }}
            >
              {toCity.name}
            </h3>
            <p
              className="text-sm mb-4"
              style={{
                fontFamily: 'Open Sans, sans-serif',
                color: '#8495CB',
              }}
            >
              {toCity.timezoneDisplay || `${toCity.timezoneAbbrev} · ${toCity.utcOffset}`}
            </p>
            <div className="mb-4">
              <div
                className="text-5xl font-bold tabular-nums mb-2"
                style={{
                  fontFamily: 'Inter, sans-serif',
                  fontWeight: 800,
                  color: '#080A0C',
                }}
              >
                {toTimeData.formattedTime}
              </div>
              <div
                className="text-lg"
                style={{
                  fontFamily: 'Open Sans, sans-serif',
                  color: '#364151',
                }}
              >
                {toDate}
              </div>
            </div>
          </div>
        </div>

        {/* Time Difference Summary */}
        <div
          className="rounded-xl p-6 mb-16"
          style={{ backgroundColor: '#F0F9F3', border: '1px solid #D9DEE6' }}
        >
          <div className="text-center">
            <p
              className="text-lg mb-2"
              style={{
                fontFamily: 'Open Sans, sans-serif',
                color: '#080A0C',
              }}
            >
              <span className="font-semibold">{toCity.name}</span> is{' '}
              <span className="font-semibold" style={{ color: '#2E45F0' }}>
                {formatTimeDifference(timeDiff.hours, timeDiff.minutes)}
              </span>{' '}
              {isAhead ? 'ahead of' : 'behind'}{' '}
              <span className="font-semibold">{fromCity.name}</span>
            </p>
            <p
              className="text-sm"
              style={{
                fontFamily: 'Open Sans, sans-serif',
                color: '#364151',
              }}
            >
              {formatDayDifference(timeDiff.dayDiff)}
            </p>
          </div>
        </div>

        {/* ── Common Time Conversions ──────────────────────────────── */}
        <section className="mt-8 rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-3xl font-bold font-inter text-slate-900 mb-4">
            Common Time Conversions
          </h2>
          <ConversionGrid />
        </section>

        {/* ── How Time Zone Conversion Works ──────────────────────── */}
        <section className="mt-8 rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-3xl font-bold font-inter text-slate-900 mb-4">
            How Time Zone Conversion Works
          </h2>
          <div className="space-y-4 font-open-sans text-slate-700 leading-relaxed">
            <p>
              Time zone conversion works by comparing the UTC offset of one location to another.
              Every city or region is measured relative to Coordinated Universal Time (UTC), which
              acts as the global reference point for civil time.
            </p>
            <p>
              For example, Pacific Time is typically three hours behind Eastern Time, so a meeting
              at 9:00 AM in Los Angeles would be 12:00 PM in New York. The exact abbreviation may
              change during daylight saving time, but the relative difference between the two zones
              often stays the same.
            </p>
            <p>
              TimeAtlas uses modern browser time zone data to help you compare cities accurately,
              reduce scheduling confusion, and quickly understand time differences for meetings,
              travel, and remote collaboration.
            </p>
          </div>
        </section>

        {/* Educational Sections */}
        {/* Key Capital Time Zones */}
        <section className="mb-12">
          <h2
            className="text-3xl font-bold mb-6"
            style={{
              fontFamily: 'Inter, sans-serif',
              color: '#080A0C',
            }}
          >
            Key Capital Time Zones
          </h2>
          <div
            className="bg-white rounded-xl shadow-sm p-6"
            style={{ border: '1px solid #E6E9EE' }}
          >
            <div className="space-y-4">
              <div>
                <h3
                  className="font-semibold mb-2"
                  style={{
                    fontFamily: 'Inter, sans-serif',
                    color: '#080A0C',
                    fontSize: '16px',
                  }}
                >
                  Europe (GMT/UTC±0)
                </h3>
                <p
                  style={{
                    fontFamily: 'Open Sans, sans-serif',
                    color: '#364151',
                    fontSize: '15px',
                  }}
                >
                  London (GMT), Lisbon (GMT)
                </p>
              </div>
              <div>
                <h3
                  className="font-semibold mb-2"
                  style={{
                    fontFamily: 'Inter, sans-serif',
                    color: '#080A0C',
                    fontSize: '16px',
                  }}
                >
                  Europe (CET/UTC+1)
                </h3>
                <p
                  style={{
                    fontFamily: 'Open Sans, sans-serif',
                    color: '#364151',
                    fontSize: '15px',
                  }}
                >
                  Paris, Berlin, Rome, Madrid, Copenhagen
                </p>
              </div>
              <div>
                <h3
                  className="font-semibold mb-2"
                  style={{
                    fontFamily: 'Inter, sans-serif',
                    color: '#080A0C',
                    fontSize: '16px',
                  }}
                >
                  Europe (EET/UTC+2)
                </h3>
                <p
                  style={{
                    fontFamily: 'Open Sans, sans-serif',
                    color: '#364151',
                    fontSize: '15px',
                  }}
                >
                  Helsinki, Athens, Kyiv, Sofia
                </p>
              </div>
              <div>
                <h3
                  className="font-semibold mb-2"
                  style={{
                    fontFamily: 'Inter, sans-serif',
                    color: '#080A0C',
                    fontSize: '16px',
                  }}
                >
                  Africa (UTC±0/UTC+1)
                </h3>
                <p
                  style={{
                    fontFamily: 'Open Sans, sans-serif',
                    color: '#364151',
                    fontSize: '15px',
                  }}
                >
                  Accra (UTC±0), Lagos/Tunis (UTC+1)
                </p>
              </div>
              <div>
                <h3
                  className="font-semibold mb-2"
                  style={{
                    fontFamily: 'Inter, sans-serif',
                    color: '#080A0C',
                    fontSize: '16px',
                  }}
                >
                  Asia (UTC+3 to +9)
                </h3>
                <p
                  style={{
                    fontFamily: 'Open Sans, sans-serif',
                    color: '#364151',
                    fontSize: '15px',
                  }}
                >
                  Moscow/Istanbul (UTC+3), Dubai (UTC+4), New Delhi (UTC+5:30), Bangkok (UTC+7),
                  Beijing (UTC+8), Tokyo/Seoul (UTC+9)
                </p>
              </div>
              <div>
                <h3
                  className="font-semibold mb-2"
                  style={{
                    fontFamily: 'Inter, sans-serif',
                    color: '#080A0C',
                    fontSize: '16px',
                  }}
                >
                  North America (UTC-5 to -8)
                </h3>
                <p
                  style={{
                    fontFamily: 'Open Sans, sans-serif',
                    color: '#364151',
                    fontSize: '15px',
                  }}
                >
                  Washington D.C. (EST/UTC-5), Mexico City (CST/UTC-6), New York City (EST/UTC-5),
                  Ottawa (EST/UTC-5)
                </p>
              </div>
              <div>
                <h3
                  className="font-semibold mb-2"
                  style={{
                    fontFamily: 'Inter, sans-serif',
                    color: '#080A0C',
                    fontSize: '16px',
                  }}
                >
                  South America (UTC-3 to -5)
                </h3>
                <p
                  style={{
                    fontFamily: 'Open Sans, sans-serif',
                    color: '#364151',
                    fontSize: '15px',
                  }}
                >
                  Brasilia (UTC-3), Santiago (UTC-4), Bogota (UTC-5)
                </p>
              </div>
              <div>
                <h3
                  className="font-semibold mb-2"
                  style={{
                    fontFamily: 'Inter, sans-serif',
                    color: '#080A0C',
                    fontSize: '16px',
                  }}
                >
                  Australia (UTC+10)
                </h3>
                <p
                  style={{
                    fontFamily: 'Open Sans, sans-serif',
                    color: '#364151',
                    fontSize: '15px',
                  }}
                >
                  Canberra (AEST/UTC+10, varies with AEDT)
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* UTC — The Global Time Standard */}
        <section className="mb-12">
          <h2
            className="text-3xl font-bold mb-6"
            style={{
              fontFamily: 'Inter, sans-serif',
              color: '#080A0C',
            }}
          >
            UTC — The Global Time Standard
          </h2>
          <div
            className="bg-white rounded-xl shadow-sm p-6"
            style={{ border: '1px solid #E6E9EE' }}
          >
            <div className="grid sm:grid-cols-2 gap-x-8">
              {/* Left Column - UTC-12 to UTC+1 */}
              <div className="space-y-3">
                <div className="flex gap-2">
                  <span
                    className="font-semibold"
                    style={{
                      fontFamily: 'Inter, sans-serif',
                      color: '#080A0C',
                      fontSize: '15px',
                      minWidth: '90px',
                    }}
                  >
                    UTC−12:00
                  </span>
                  <span
                    style={{
                      fontFamily: 'Open Sans, sans-serif',
                      color: '#364151',
                      fontSize: '15px',
                    }}
                  >
                    Baker Island, Howland Island
                  </span>
                </div>
                <div className="flex gap-2">
                  <span
                    className="font-semibold"
                    style={{
                      fontFamily: 'Inter, sans-serif',
                      color: '#080A0C',
                      fontSize: '15px',
                      minWidth: '90px',
                    }}
                  >
                    UTC−11:00
                  </span>
                  <span
                    style={{
                      fontFamily: 'Open Sans, sans-serif',
                      color: '#364151',
                      fontSize: '15px',
                    }}
                  >
                    Pago Pago
                  </span>
                </div>
                <div className="flex gap-2">
                  <span
                    className="font-semibold"
                    style={{
                      fontFamily: 'Inter, sans-serif',
                      color: '#080A0C',
                      fontSize: '15px',
                      minWidth: '90px',
                    }}
                  >
                    UTC−10:00
                  </span>
                  <span
                    style={{
                      fontFamily: 'Open Sans, sans-serif',
                      color: '#364151',
                      fontSize: '15px',
                    }}
                  >
                    Honolulu
                  </span>
                </div>
                <div className="flex gap-2">
                  <span
                    className="font-semibold"
                    style={{
                      fontFamily: 'Inter, sans-serif',
                      color: '#080A0C',
                      fontSize: '15px',
                      minWidth: '90px',
                    }}
                  >
                    UTC−08:00
                  </span>
                  <span
                    style={{
                      fontFamily: 'Open Sans, sans-serif',
                      color: '#364151',
                      fontSize: '15px',
                    }}
                  >
                    Los Angeles, Vancouver, San Francisco, Seattle
                  </span>
                </div>
                <div className="flex gap-2">
                  <span
                    className="font-semibold"
                    style={{
                      fontFamily: 'Inter, sans-serif',
                      color: '#080A0C',
                      fontSize: '15px',
                      minWidth: '90px',
                    }}
                  >
                    UTC−07:00
                  </span>
                  <span
                    style={{
                      fontFamily: 'Open Sans, sans-serif',
                      color: '#364151',
                      fontSize: '15px',
                    }}
                  >
                    Denver, Phoenix, Calgary
                  </span>
                </div>
                <div className="flex gap-2">
                  <span
                    className="font-semibold"
                    style={{
                      fontFamily: 'Inter, sans-serif',
                      color: '#080A0C',
                      fontSize: '15px',
                      minWidth: '90px',
                    }}
                  >
                    UTC−06:00
                  </span>
                  <span
                    style={{
                      fontFamily: 'Open Sans, sans-serif',
                      color: '#364151',
                      fontSize: '15px',
                    }}
                  >
                    Mexico City, Chicago, Houston, Winnipeg
                  </span>
                </div>
                <div className="flex gap-2">
                  <span
                    className="font-semibold"
                    style={{
                      fontFamily: 'Inter, sans-serif',
                      color: '#080A0C',
                      fontSize: '15px',
                      minWidth: '90px',
                    }}
                  >
                    UTC−05:00
                  </span>
                  <span
                    style={{
                      fontFamily: 'Open Sans, sans-serif',
                      color: '#364151',
                      fontSize: '15px',
                    }}
                  >
                    New York City, Toronto, Havana, Bogota, Lima
                  </span>
                </div>
                <div className="flex gap-2">
                  <span
                    className="font-semibold"
                    style={{
                      fontFamily: 'Inter, sans-serif',
                      color: '#080A0C',
                      fontSize: '15px',
                      minWidth: '90px',
                    }}
                  >
                    UTC−04:00
                  </span>
                  <span
                    style={{
                      fontFamily: 'Open Sans, sans-serif',
                      color: '#364151',
                      fontSize: '15px',
                    }}
                  >
                    Santiago, Santo Domingo, Manaus
                  </span>
                </div>
                <div className="flex gap-2">
                  <span
                    className="font-semibold"
                    style={{
                      fontFamily: 'Inter, sans-serif',
                      color: '#080A0C',
                      fontSize: '15px',
                      minWidth: '90px',
                    }}
                  >
                    UTC−03:00
                  </span>
                  <span
                    style={{
                      fontFamily: 'Open Sans, sans-serif',
                      color: '#364151',
                      fontSize: '15px',
                    }}
                  >
                    Buenos Aires, Rio de Janeiro, São Paulo
                  </span>
                </div>
                <div className="flex gap-2">
                  <span
                    className="font-semibold"
                    style={{
                      fontFamily: 'Inter, sans-serif',
                      color: '#080A0C',
                      fontSize: '15px',
                      minWidth: '90px',
                    }}
                  >
                    UTC+00:00
                  </span>
                  <span
                    style={{
                      fontFamily: 'Open Sans, sans-serif',
                      color: '#364151',
                      fontSize: '15px',
                    }}
                  >
                    London, Dublin, Lisbon, Casablanca, Reykjavik, Accra
                  </span>
                </div>
                <div className="flex gap-2">
                  <span
                    className="font-semibold"
                    style={{
                      fontFamily: 'Inter, sans-serif',
                      color: '#080A0C',
                      fontSize: '15px',
                      minWidth: '90px',
                    }}
                  >
                    UTC+01:00
                  </span>
                  <span
                    style={{
                      fontFamily: 'Open Sans, sans-serif',
                      color: '#364151',
                      fontSize: '15px',
                    }}
                  >
                    Paris, Berlin, Rome, Madrid, Warsaw, Lagos
                  </span>
                </div>
              </div>

              {/* Right Column - UTC+2 to UTC+12 */}
              <div className="space-y-3">
                <div className="flex gap-2">
                  <span
                    className="font-semibold"
                    style={{
                      fontFamily: 'Inter, sans-serif',
                      color: '#080A0C',
                      fontSize: '15px',
                      minWidth: '90px',
                    }}
                  >
                    UTC+02:00
                  </span>
                  <span
                    style={{
                      fontFamily: 'Open Sans, sans-serif',
                      color: '#364151',
                      fontSize: '15px',
                    }}
                  >
                    Cairo, Istanbul, Johannesburg, Kyiv, Athens
                  </span>
                </div>
                <div className="flex gap-2">
                  <span
                    className="font-semibold"
                    style={{
                      fontFamily: 'Inter, sans-serif',
                      color: '#080A0C',
                      fontSize: '15px',
                      minWidth: '90px',
                    }}
                  >
                    UTC+03:00
                  </span>
                  <span
                    style={{
                      fontFamily: 'Open Sans, sans-serif',
                      color: '#364151',
                      fontSize: '15px',
                    }}
                  >
                    Moscow, Dubai, Riyadh, Nairobi
                  </span>
                </div>
                <div className="flex gap-2">
                  <span
                    className="font-semibold"
                    style={{
                      fontFamily: 'Inter, sans-serif',
                      color: '#080A0C',
                      fontSize: '15px',
                      minWidth: '90px',
                    }}
                  >
                    UTC+05:00
                  </span>
                  <span
                    style={{
                      fontFamily: 'Open Sans, sans-serif',
                      color: '#364151',
                      fontSize: '15px',
                    }}
                  >
                    Karachi, Tashkent
                  </span>
                </div>
                <div className="flex gap-2">
                  <span
                    className="font-semibold"
                    style={{
                      fontFamily: 'Inter, sans-serif',
                      color: '#080A0C',
                      fontSize: '15px',
                      minWidth: '90px',
                    }}
                  >
                    UTC+05:30
                  </span>
                  <span
                    style={{
                      fontFamily: 'Open Sans, sans-serif',
                      color: '#364151',
                      fontSize: '15px',
                    }}
                  >
                    New Delhi, Mumbai, Kolkata
                  </span>
                </div>
                <div className="flex gap-2">
                  <span
                    className="font-semibold"
                    style={{
                      fontFamily: 'Inter, sans-serif',
                      color: '#080A0C',
                      fontSize: '15px',
                      minWidth: '90px',
                    }}
                  >
                    UTC+06:00
                  </span>
                  <span
                    style={{
                      fontFamily: 'Open Sans, sans-serif',
                      color: '#364151',
                      fontSize: '15px',
                    }}
                  >
                    Dhaka, Almaty
                  </span>
                </div>
                <div className="flex gap-2">
                  <span
                    className="font-semibold"
                    style={{
                      fontFamily: 'Inter, sans-serif',
                      color: '#080A0C',
                      fontSize: '15px',
                      minWidth: '90px',
                    }}
                  >
                    UTC+07:00
                  </span>
                  <span
                    style={{
                      fontFamily: 'Open Sans, sans-serif',
                      color: '#364151',
                      fontSize: '15px',
                    }}
                  >
                    Bangkok, Jakarta, Ho Chi Minh City
                  </span>
                </div>
                <div className="flex gap-2">
                  <span
                    className="font-semibold"
                    style={{
                      fontFamily: 'Inter, sans-serif',
                      color: '#080A0C',
                      fontSize: '15px',
                      minWidth: '90px',
                    }}
                  >
                    UTC+08:00
                  </span>
                  <span
                    style={{
                      fontFamily: 'Open Sans, sans-serif',
                      color: '#364151',
                      fontSize: '15px',
                    }}
                  >
                    Beijing, Shanghai, Singapore, Hong Kong, Perth
                  </span>
                </div>
                <div className="flex gap-2">
                  <span
                    className="font-semibold"
                    style={{
                      fontFamily: 'Inter, sans-serif',
                      color: '#080A0C',
                      fontSize: '15px',
                      minWidth: '90px',
                    }}
                  >
                    UTC+09:00
                  </span>
                  <span
                    style={{
                      fontFamily: 'Open Sans, sans-serif',
                      color: '#364151',
                      fontSize: '15px',
                    }}
                  >
                    Tokyo, Seoul
                  </span>
                </div>
                <div className="flex gap-2">
                  <span
                    className="font-semibold"
                    style={{
                      fontFamily: 'Inter, sans-serif',
                      color: '#080A0C',
                      fontSize: '15px',
                      minWidth: '90px',
                    }}
                  >
                    UTC+10:00
                  </span>
                  <span
                    style={{
                      fontFamily: 'Open Sans, sans-serif',
                      color: '#364151',
                      fontSize: '15px',
                    }}
                  >
                    Sydney, Melbourne, Vladivostok
                  </span>
                </div>
                <div className="flex gap-2">
                  <span
                    className="font-semibold"
                    style={{
                      fontFamily: 'Inter, sans-serif',
                      color: '#080A0C',
                      fontSize: '15px',
                      minWidth: '90px',
                    }}
                  >
                    UTC+11:00
                  </span>
                  <span
                    style={{
                      fontFamily: 'Open Sans, sans-serif',
                      color: '#364151',
                      fontSize: '15px',
                    }}
                  >
                    Nouméa
                  </span>
                </div>
                <div className="flex gap-2">
                  <span
                    className="font-semibold"
                    style={{
                      fontFamily: 'Inter, sans-serif',
                      color: '#080A0C',
                      fontSize: '15px',
                      minWidth: '90px',
                    }}
                  >
                    UTC+12:00
                  </span>
                  <span
                    style={{
                      fontFamily: 'Open Sans, sans-serif',
                      color: '#364151',
                      fontSize: '15px',
                    }}
                  >
                    Auckland, Suva
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Time Explained FAQ Accordion */}
        <section className="pt-6 mb-12">
          <h2
            className="text-3xl font-bold mb-6"
            style={{
              fontFamily: 'Inter, sans-serif',
              color: '#080A0C',
            }}
          >
            Time Explained
          </h2>
          <div className="space-y-3">
            {/* UTC */}
            <div
              className="bg-white rounded-xl shadow-sm overflow-hidden"
              style={{ border: '1px solid #E6E9EE' }}
            >
              <button
                onClick={() => toggleAccordion('utc')}
                className="w-full px-6 py-4 flex justify-between items-center text-left"
                style={{
                  fontFamily: 'Inter, sans-serif',
                }}
              >
                <span
                  className="font-semibold"
                  style={{
                    color: '#080A0C',
                    fontSize: '16px',
                  }}
                >
                  What is UTC?
                </span>
                <ChevronDown
                  className={`w-5 h-5 transition-transform ${openAccordion === 'utc' ? 'rotate-180' : ''}`}
                  style={{ color: '#8495CB' }}
                />
              </button>
              {openAccordion === 'utc' && (
                <div
                  className="px-6 pb-4"
                  style={{
                    fontFamily: 'Open Sans, sans-serif',
                    color: '#364151',
                    fontSize: '15px',
                    lineHeight: '1.6',
                  }}
                >
                  Coordinated Universal Time (UTC) is the primary time standard by which the world
                  regulates clocks and time. It is not adjusted for daylight saving time.
                </div>
              )}
            </div>

            {/* GMT */}
            <div
              className="bg-white rounded-xl shadow-sm overflow-hidden"
              style={{ border: '1px solid #E6E9EE' }}
            >
              <button
                onClick={() => toggleAccordion('gmt')}
                className="w-full px-6 py-4 flex justify-between items-center text-left"
                style={{
                  fontFamily: 'Inter, sans-serif',
                }}
              >
                <span
                  className="font-semibold"
                  style={{
                    color: '#080A0C',
                    fontSize: '16px',
                  }}
                >
                  What is GMT?
                </span>
                <ChevronDown
                  className={`w-5 h-5 transition-transform ${openAccordion === 'gmt' ? 'rotate-180' : ''}`}
                  style={{ color: '#8495CB' }}
                />
              </button>
              {openAccordion === 'gmt' && (
                <div
                  className="px-6 pb-4"
                  style={{
                    fontFamily: 'Open Sans, sans-serif',
                    color: '#364151',
                    fontSize: '15px',
                    lineHeight: '1.6',
                  }}
                >
                  Greenwich Mean Time (GMT) is the mean solar time at the Royal Observatory in
                  Greenwich, London. It corresponds to UTC+00:00 and is used as a reference point
                  for time zones worldwide.
                </div>
              )}
            </div>

            {/* Prime Meridian */}
            <div
              className="bg-white rounded-xl shadow-sm overflow-hidden"
              style={{ border: '1px solid #E6E9EE' }}
            >
              <button
                onClick={() => toggleAccordion('meridian')}
                className="w-full px-6 py-4 flex justify-between items-center text-left"
                style={{
                  fontFamily: 'Inter, sans-serif',
                }}
              >
                <span
                  className="font-semibold"
                  style={{
                    color: '#080A0C',
                    fontSize: '16px',
                  }}
                >
                  What is the Prime Meridian?
                </span>
                <ChevronDown
                  className={`w-5 h-5 transition-transform ${openAccordion === 'meridian' ? 'rotate-180' : ''}`}
                  style={{ color: '#8495CB' }}
                />
              </button>
              {openAccordion === 'meridian' && (
                <div
                  className="px-6 pb-4"
                  style={{
                    fontFamily: 'Open Sans, sans-serif',
                    color: '#364151',
                    fontSize: '15px',
                    lineHeight: '1.6',
                  }}
                >
                  The Prime Meridian is the 0° longitude line, acting as the global standard for
                  measuring distance east/west and calculating time. Located in Greenwich, London,
                  it separates the Eastern and Western Hemispheres. Chosen in 1884 due to British
                  maritime dominance, it is used for navigation, mapping, and setting international
                  time zones.
                </div>
              )}
            </div>

            {/* IDL */}
            <div
              className="bg-white rounded-xl shadow-sm overflow-hidden"
              style={{ border: '1px solid #E6E9EE' }}
            >
              <button
                onClick={() => toggleAccordion('idl')}
                className="w-full px-6 py-4 flex justify-between items-center text-left"
                style={{
                  fontFamily: 'Inter, sans-serif',
                }}
              >
                <span
                  className="font-semibold"
                  style={{
                    color: '#080A0C',
                    fontSize: '16px',
                  }}
                >
                  What is International Date Line (IDL)?
                </span>
                <ChevronDown
                  className={`w-5 h-5 transition-transform ${openAccordion === 'idl' ? 'rotate-180' : ''}`}
                  style={{ color: '#8495CB' }}
                />
              </button>
              {openAccordion === 'idl' && (
                <div
                  className="px-6 pb-4"
                  style={{
                    fontFamily: 'Open Sans, sans-serif',
                    color: '#364151',
                    fontSize: '15px',
                    lineHeight: '1.6',
                  }}
                >
                  The International Date Line (IDL) is an imaginary, zigzagging line in the Pacific
                  Ocean (roughly following the 180° meridian) that acts as the boundary where one
                  calendar day ends and the next begins. Crossing westward adds a day (e.g., Monday
                  to Tuesday), while crossing eastward subtracts a day, effectively separating two
                  consecutive calendar dates.
                </div>
              )}
            </div>

            {/* ISO 8601 */}
            <div
              className="bg-white rounded-xl shadow-sm overflow-hidden"
              style={{ border: '1px solid #E6E9EE' }}
            >
              <button
                onClick={() => toggleAccordion('iso')}
                className="w-full px-6 py-4 flex justify-between items-center text-left"
                style={{
                  fontFamily: 'Inter, sans-serif',
                }}
              >
                <span
                  className="font-semibold"
                  style={{
                    color: '#080A0C',
                    fontSize: '16px',
                  }}
                >
                  What is ISO 8601?
                </span>
                <ChevronDown
                  className={`w-5 h-5 transition-transform ${openAccordion === 'iso' ? 'rotate-180' : ''}`}
                  style={{ color: '#8495CB' }}
                />
              </button>
              {openAccordion === 'iso' && (
                <div
                  className="px-6 pb-4"
                  style={{
                    fontFamily: 'Open Sans, sans-serif',
                    color: '#364151',
                    fontSize: '15px',
                    lineHeight: '1.6',
                  }}
                >
                  ISO 8601 is an international standard for representing dates and times,
                  established by the International Organization for Standardization to eliminate
                  ambiguity across cultures. It uses a consistent, descending-order format
                  (YYYY-MM-DD), ensuring dates are easy to read, sort, and parse for both humans and
                  computers, such as "2026-03-26" for March 26, 2026.
                </div>
              )}
            </div>

            {/* Unix */}
            <div
              className="bg-white rounded-xl shadow-sm overflow-hidden"
              style={{ border: '1px solid #E6E9EE' }}
            >
              <button
                onClick={() => toggleAccordion('unix')}
                className="w-full px-6 py-4 flex justify-between items-center text-left"
                style={{
                  fontFamily: 'Inter, sans-serif',
                }}
              >
                <span
                  className="font-semibold"
                  style={{
                    color: '#080A0C',
                    fontSize: '16px',
                  }}
                >
                  What is Unix?
                </span>
                <ChevronDown
                  className={`w-5 h-5 transition-transform ${openAccordion === 'unix' ? 'rotate-180' : ''}`}
                  style={{ color: '#8495CB' }}
                />
              </button>
              {openAccordion === 'unix' && (
                <div
                  className="px-6 pb-4"
                  style={{
                    fontFamily: 'Open Sans, sans-serif',
                    color: '#364151',
                    fontSize: '15px',
                    lineHeight: '1.6',
                  }}
                >
                  Unix is a powerful, multitasking, and multi-user operating system originally
                  developed in the 1970s at AT&T Bell Labs. It is characterized by its modular
                  design, hierarchical file system, and reliance on a text-based command-line
                  interface (shell) for system management and tool execution.
                </div>
              )}
            </div>

            {/* DST */}
            <div
              className="bg-white rounded-xl shadow-sm overflow-hidden"
              style={{ border: '1px solid #E6E9EE' }}
            >
              <button
                onClick={() => toggleAccordion('dst')}
                className="w-full px-6 py-4 flex justify-between items-center text-left"
                style={{
                  fontFamily: 'Inter, sans-serif',
                }}
              >
                <span
                  className="font-semibold"
                  style={{
                    color: '#080A0C',
                    fontSize: '16px',
                  }}
                >
                  What is Daylight Saving Time (DST)?
                </span>
                <ChevronDown
                  className={`w-5 h-5 transition-transform ${openAccordion === 'dst' ? 'rotate-180' : ''}`}
                  style={{ color: '#8495CB' }}
                />
              </button>
              {openAccordion === 'dst' && (
                <div
                  className="px-6 pb-4"
                  style={{
                    fontFamily: 'Open Sans, sans-serif',
                    color: '#364151',
                    fontSize: '15px',
                    lineHeight: '1.6',
                  }}
                >
                  Daylight Saving Time (DST) is the practice of advancing clocks by one hour during
                  warmer months—"springing forward" in March and "falling back" in November—to align
                  daylight hours with typical evening schedules. It aims to increase evening
                  sunlight and reduce energy consumption, lasting from the second Sunday in March to
                  the first Sunday in November in the U.S.
                </div>
              )}
            </div>

            {/* AoE */}
            <div
              className="bg-white rounded-xl shadow-sm overflow-hidden"
              style={{ border: '1px solid #E6E9EE' }}
            >
              <button
                onClick={() => toggleAccordion('aoe')}
                className="w-full px-6 py-4 flex justify-between items-center text-left"
                style={{
                  fontFamily: 'Inter, sans-serif',
                }}
              >
                <span
                  className="font-semibold"
                  style={{
                    color: '#080A0C',
                    fontSize: '16px',
                  }}
                >
                  What is AoE?
                </span>
                <ChevronDown
                  className={`w-5 h-5 transition-transform ${openAccordion === 'aoe' ? 'rotate-180' : ''}`}
                  style={{ color: '#8495CB' }}
                />
              </button>
              {openAccordion === 'aoe' && (
                <div
                  className="px-6 pb-4"
                  style={{
                    fontFamily: 'Open Sans, sans-serif',
                    color: '#364151',
                    fontSize: '15px',
                    lineHeight: '1.6',
                  }}
                >
                  The UTC−12:00 time zone, known as Anywhere on Earth (AoE) or Baker Island Time
                  (BIT), contains no inhabited cities, towns, or permanent residents. It is used
                  strictly as a nautical time zone on the high seas and for two uninhabited United
                  States Minor Outlying Islands: Baker Island and Howland Island.
                </div>
              )}
            </div>

            {/* US Time Zones */}
            <div
              className="bg-white rounded-xl shadow-sm overflow-hidden"
              style={{ border: '1px solid #E6E9EE' }}
            >
              <button
                onClick={() => toggleAccordion('us-zones')}
                className="w-full px-6 py-4 flex justify-between items-center text-left"
                style={{
                  fontFamily: 'Inter, sans-serif',
                }}
              >
                <span
                  className="font-semibold"
                  style={{
                    color: '#080A0C',
                    fontSize: '16px',
                  }}
                >
                  What are the U.S. Time Zones?
                </span>
                <ChevronDown
                  className={`w-5 h-5 transition-transform ${openAccordion === 'us-zones' ? 'rotate-180' : ''}`}
                  style={{ color: '#8495CB' }}
                />
              </button>
              {openAccordion === 'us-zones' && (
                <div
                  className="px-6 pb-4"
                  style={{
                    fontFamily: 'Open Sans, sans-serif',
                    color: '#364151',
                    fontSize: '15px',
                    lineHeight: '1.6',
                  }}
                >
                  The United States has seven main time zones: Eastern Daylight Time (EDT), Central
                  Daylight Time (CDT), Mountain Daylight Time (MDT), Mountain Standard Time (MST),
                  Pacific Daylight Time (PDT), Alaska Daylight Time (AKDT), and Hawaii-Aleutian
                  Standard Time (HST).
                </div>
              )}
            </div>

            {/* ET EST EDT */}
            <div
              className="bg-white rounded-xl shadow-sm overflow-hidden"
              style={{ border: '1px solid #E6E9EE' }}
            >
              <button
                onClick={() => toggleAccordion('et-diff')}
                className="w-full px-6 py-4 flex justify-between items-center text-left"
                style={{
                  fontFamily: 'Inter, sans-serif',
                }}
              >
                <span
                  className="font-semibold"
                  style={{
                    color: '#080A0C',
                    fontSize: '16px',
                  }}
                >
                  ET, EST, and EDT; what's the difference?
                </span>
                <ChevronDown
                  className={`w-5 h-5 transition-transform ${openAccordion === 'et-diff' ? 'rotate-180' : ''}`}
                  style={{ color: '#8495CB' }}
                />
              </button>
              {openAccordion === 'et-diff' && (
                <div
                  className="px-6 pb-4"
                  style={{
                    fontFamily: 'Open Sans, sans-serif',
                    color: '#364151',
                    fontSize: '15px',
                    lineHeight: '1.6',
                  }}
                >
                  ET (Eastern Time) is the general term for the time zone. EST (Eastern Standard
                  Time) is used during the winter months (UTC-5), while EDT (Eastern Daylight Time)
                  is used during the summer months when clocks are moved forward one hour (UTC-4).
                </div>
              )}
            </div>

            {/* Minutes in a day */}
            <div
              className="bg-white rounded-xl shadow-sm overflow-hidden"
              style={{ border: '1px solid #E6E9EE' }}
            >
              <button
                onClick={() => toggleAccordion('minutes')}
                className="w-full px-6 py-4 flex justify-between items-center text-left"
                style={{
                  fontFamily: 'Inter, sans-serif',
                }}
              >
                <span
                  className="font-semibold"
                  style={{
                    color: '#080A0C',
                    fontSize: '16px',
                  }}
                >
                  How many minutes are in one day?
                </span>
                <ChevronDown
                  className={`w-5 h-5 transition-transform ${openAccordion === 'minutes' ? 'rotate-180' : ''}`}
                  style={{ color: '#8495CB' }}
                />
              </button>
              {openAccordion === 'minutes' && (
                <div
                  className="px-6 pb-4"
                  style={{
                    fontFamily: 'Open Sans, sans-serif',
                    color: '#364151',
                    fontSize: '15px',
                    lineHeight: '1.6',
                  }}
                >
                  There are 1,440 minutes in one day (24 hours × 60 minutes).
                </div>
              )}
            </div>

            {/* Seconds in a day */}
            <div
              className="bg-white rounded-xl shadow-sm overflow-hidden"
              style={{ border: '1px solid #E6E9EE' }}
            >
              <button
                onClick={() => toggleAccordion('seconds')}
                className="w-full px-6 py-4 flex justify-between items-center text-left"
                style={{
                  fontFamily: 'Inter, sans-serif',
                }}
              >
                <span
                  className="font-semibold"
                  style={{
                    color: '#080A0C',
                    fontSize: '16px',
                  }}
                >
                  How many seconds are in one day?
                </span>
                <ChevronDown
                  className={`w-5 h-5 transition-transform ${openAccordion === 'seconds' ? 'rotate-180' : ''}`}
                  style={{ color: '#8495CB' }}
                />
              </button>
              {openAccordion === 'seconds' && (
                <div
                  className="px-6 pb-4"
                  style={{
                    fontFamily: 'Open Sans, sans-serif',
                    color: '#364151',
                    fontSize: '15px',
                    lineHeight: '1.6',
                  }}
                >
                  There are 86,400 seconds in one day (24 hours × 60 minutes × 60 seconds).
                </div>
              )}
            </div>

            {/* Hours in a year */}
            <div
              className="bg-white rounded-xl shadow-sm overflow-hidden"
              style={{ border: '1px solid #E6E9EE' }}
            >
              <button
                onClick={() => toggleAccordion('hours')}
                className="w-full px-6 py-4 flex justify-between items-center text-left"
                style={{
                  fontFamily: 'Inter, sans-serif',
                }}
              >
                <span
                  className="font-semibold"
                  style={{
                    color: '#080A0C',
                    fontSize: '16px',
                  }}
                >
                  How many hours are in one year?
                </span>
                <ChevronDown
                  className={`w-5 h-5 transition-transform ${openAccordion === 'hours' ? 'rotate-180' : ''}`}
                  style={{ color: '#8495CB' }}
                />
              </button>
              {openAccordion === 'hours' && (
                <div
                  className="px-6 pb-4"
                  style={{
                    fontFamily: 'Open Sans, sans-serif',
                    color: '#364151',
                    fontSize: '15px',
                    lineHeight: '1.6',
                  }}
                >
                  There are 8,760 hours in a standard year (365 days × 24 hours), or 8,784 hours in
                  a leap year (366 days × 24 hours).
                </div>
              )}
            </div>
          </div>
        </section>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
}
