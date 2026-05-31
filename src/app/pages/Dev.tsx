import { useState, useEffect } from 'react';
import { Code, Copy, Check } from 'lucide-react';
import { Footer } from '../components/Footer';
import { SEO } from '../components/SEO';
import { getUserTimezone } from '../utils/time';
import { formatUnixTime, parseUnixTime, copyToClipboard } from '../utils/format';
import { ClockFace } from '../components/ClockFace';

function getInitialDate() {
  const prerenderNow =
    typeof document === 'undefined'
      ? (globalThis as { __TIMEATLAS_PRERENDER_NOW?: string }).__TIMEATLAS_PRERENDER_NOW
      : document.documentElement.dataset.prerenderNow;

  return prerenderNow ? new Date(prerenderNow) : new Date();
}

function formatUtcTime(date: Date) {
  return date.toISOString().split('T')[1].split('.')[0];
}

function getInitialTimezone() {
  if (typeof document === 'undefined') {
    const isPrerendering = Boolean(
      (globalThis as { __TIMEATLAS_PRERENDER_NOW?: string }).__TIMEATLAS_PRERENDER_NOW
    );
    return isPrerendering ? 'UTC' : getUserTimezone();
  }

  return document.documentElement.dataset.prerendered === 'true' ? 'UTC' : getUserTimezone();
}

export function Dev() {
  const [unixInput, setUnixInput] = useState('');
  const [convertedTime, setConvertedTime] = useState('');
  const [copiedField, setCopiedField] = useState<string | null>(null);
  const [currentDate, setCurrentDate] = useState(getInitialDate);
  const [timezone, setTimezone] = useState(getInitialTimezone);

  const handleUnixConvert = () => {
    const timestamp = parseUnixTime(unixInput);
    if (timestamp !== null) {
      setConvertedTime(formatUnixTime(timestamp));
    } else {
      setConvertedTime('Invalid Unix timestamp');
    }
  };

  const handleCopy = async (text: string, field: string) => {
    try {
      await copyToClipboard(text);
      setCopiedField(field);
      setTimeout(() => setCopiedField(null), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  useEffect(() => {
    setCurrentDate(new Date());
    setTimezone(getUserTimezone());

    const interval = setInterval(() => {
      setCurrentDate(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const currentUTC = formatUtcTime(currentDate);
  const currentUnix = Math.floor(currentDate.getTime() / 1000);
  const currentISO = currentDate.toISOString();

  return (
    <>
      <SEO
        title="IANA Timezone API & Developer Tools | TimeAtlas"
        description="Free developer tools for the IANA timezone database. Convert Unix timestamps, UTC, and ISO 8601 formats. Includes API-ready code examples in JavaScript and Python."
        path="/dev"
      />
      <div className="min-h-screen flex flex-col" style={{ backgroundColor: '#FEFEFE' }}>
        <div className="flex-1 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16 w-full">
          {/* Header */}
          <div className="text-center mb-12">
            <div
              className="inline-flex items-center justify-center w-16 h-16 rounded-full mb-4"
              style={{ backgroundColor: '#F0F9F3' }}
            >
              <Code className="w-8 h-8" style={{ color: '#2E45F0' }} />
            </div>
            <h1
              className="text-5xl font-bold mb-3"
              style={{
                color: '#080A0C',
              }}
            >
              UTC, Unix Time &amp; ISO 8601 Tools
            </h1>
            <p
              className="text-lg"
              style={{
                color: '#364151',
              }}
            >
              Essential time formats for developers and APIs
            </p>
          </div>

          {/* Intro */}
          <div className="max-w-3xl mx-auto mb-10 text-center">
            <p className="text-base leading-relaxed" style={{ color: '#475569' }}>
              This page provides essential developer tools built on the{' '}
              <strong>IANA timezone database</strong> — the authoritative, globally maintained
              registry of timezone identifiers used by every major operating system, programming
              language runtime, and API. Whether you are building a scheduling API, parsing
              timestamps from a third-party service, or debugging a timezone-related bug in
              production, these utilities give you live, accurate reference values. Convert any{' '}
              <strong>Unix timestamp</strong> to a human-readable date, inspect the current{' '}
              <strong>UTC offset</strong> and <strong>ISO 8601</strong> string for your environment,
              and copy your local IANA identifier — the exact string your API or database driver
              needs — with one click. Code examples for JavaScript and Python are included so you
              can drop correct timezone-aware logic directly into your codebase. All data is
              computed client-side using the browser's native <code>Intl</code> API, meaning no
              external API call is required and results are always in sync with the IANA database
              version shipped with your runtime.
            </p>
          </div>

          {/* Current Time Formats */}
          <div
            className="bg-white rounded-xl shadow-sm p-6 mb-6"
            style={{ border: '1px solid #E6E9EE' }}
          >
            <h2
              className="text-xl font-semibold mb-4"
              style={{
                color: '#080A0C',
              }}
            >
              Current Time Formats
            </h2>
            <div className="space-y-4">
              {/* UTC Time */}
              <div className="p-4 rounded-lg" style={{ backgroundColor: '#F2EFEA' }}>
                <div className="flex items-center justify-between mb-2">
                  <h3
                    className="font-medium"
                    style={{
                      color: '#364151',
                    }}
                  >
                    UTC Time
                  </h3>
                  <button
                    onClick={() => handleCopy(currentUTC, 'utc')}
                    className="p-2 rounded-lg transition-colors"
                    style={{ backgroundColor: 'white' }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = '#E6E9EE';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = 'white';
                    }}
                  >
                    {copiedField === 'utc' ? (
                      <Check className="w-4 h-4" style={{ color: '#10b981' }} />
                    ) : (
                      <Copy className="w-4 h-4" style={{ color: '#364151' }} />
                    )}
                  </button>
                </div>
                <ClockFace
                  hour={currentUTC.split(':')[0] ?? '00'}
                  minute={currentUTC.split(':')[1] ?? '00'}
                  second={currentUTC.split(':')[2] ?? '00'}
                  fontSize="1.5rem"
                />
                <p
                  className="text-sm mt-2"
                  style={{
                    color: '#5C6E87',
                  }}
                >
                  Coordinated Universal Time (UTC) - The primary time standard
                </p>
              </div>

              {/* Unix Timestamp */}
              <div className="p-4 rounded-lg" style={{ backgroundColor: '#F2EFEA' }}>
                <div className="flex items-center justify-between mb-2">
                  <h3
                    className="font-medium"
                    style={{
                      color: '#364151',
                    }}
                  >
                    Unix Timestamp
                  </h3>
                  <button
                    onClick={() => handleCopy(String(currentUnix), 'unix')}
                    className="p-2 rounded-lg transition-colors"
                    style={{ backgroundColor: 'white' }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = '#E6E9EE';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = 'white';
                    }}
                  >
                    {copiedField === 'unix' ? (
                      <Check className="w-4 h-4" style={{ color: '#10b981' }} />
                    ) : (
                      <Copy className="w-4 h-4" style={{ color: '#364151' }} />
                    )}
                  </button>
                </div>
                <code
                  className="text-2xl font-bold"
                  style={{
                    fontFamily: 'Inter, sans-serif',
                    fontWeight: 800,
                    fontVariantNumeric: 'tabular-nums',
                    color: '#080A0C',
                  }}
                >
                  {currentUnix}
                </code>
                <p
                  className="text-sm mt-2"
                  style={{
                    color: '#5C6E87',
                  }}
                >
                  Seconds since January 1, 1970 00:00:00 UTC
                </p>
              </div>

              {/* ISO 8601 */}
              <div className="p-4 rounded-lg" style={{ backgroundColor: '#F2EFEA' }}>
                <div className="flex items-center justify-between mb-2">
                  <h3
                    className="font-medium"
                    style={{
                      color: '#364151',
                    }}
                  >
                    ISO 8601
                  </h3>
                  <button
                    onClick={() => handleCopy(currentISO, 'iso')}
                    className="p-2 rounded-lg transition-colors"
                    style={{ backgroundColor: 'white' }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = '#E6E9EE';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = 'white';
                    }}
                  >
                    {copiedField === 'iso' ? (
                      <Check className="w-4 h-4" style={{ color: '#10b981' }} />
                    ) : (
                      <Copy className="w-4 h-4" style={{ color: '#364151' }} />
                    )}
                  </button>
                </div>
                <code
                  className="text-lg font-mono font-bold break-all"
                  style={{
                    fontFamily:
                      'ui-monospace, "SF Mono", "Cascadia Code", "Roboto Mono", Menlo, Monaco, Consolas, "Courier New", monospace',
                    color: '#080A0C',
                  }}
                >
                  {currentISO}
                </code>
                <p
                  className="text-sm mt-2"
                  style={{
                    color: '#5C6E87',
                  }}
                >
                  International standard for date and time representation
                </p>
              </div>

              {/* Timezone */}
              <div className="p-4 rounded-lg" style={{ backgroundColor: '#F2EFEA' }}>
                <div className="flex items-center justify-between mb-2">
                  <h3
                    className="font-medium"
                    style={{
                      color: '#364151',
                    }}
                  >
                    Your Timezone
                  </h3>
                  <button
                    onClick={() => handleCopy(timezone, 'tz')}
                    className="p-2 rounded-lg transition-colors"
                    style={{ backgroundColor: 'white' }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = '#E6E9EE';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = 'white';
                    }}
                  >
                    {copiedField === 'tz' ? (
                      <Check className="w-4 h-4" style={{ color: '#10b981' }} />
                    ) : (
                      <Copy className="w-4 h-4" style={{ color: '#364151' }} />
                    )}
                  </button>
                </div>
                <code
                  className="text-xl font-mono font-bold"
                  style={{
                    fontFamily:
                      'ui-monospace, "SF Mono", "Cascadia Code", "Roboto Mono", Menlo, Monaco, Consolas, "Courier New", monospace',
                    color: '#080A0C',
                  }}
                >
                  {timezone}
                </code>
                <p
                  className="text-sm mt-2"
                  style={{
                    color: '#5C6E87',
                  }}
                >
                  IANA timezone identifier
                </p>
              </div>
            </div>
          </div>

          {/* Unix Timestamp Converter */}
          <div
            className="bg-white rounded-xl shadow-sm p-6 mb-6"
            style={{ border: '1px solid #E6E9EE' }}
          >
            <h2
              className="text-xl font-semibold mb-4"
              style={{
                color: '#080A0C',
              }}
            >
              Unix Timestamp Converter
            </h2>
            <div className="space-y-4">
              <div>
                <label
                  className="block text-sm font-medium mb-2"
                  style={{
                    color: '#364151',
                  }}
                >
                  Enter Unix Timestamp
                </label>
                <div className="flex gap-3">
                  <input
                    type="text"
                    value={unixInput}
                    onChange={(e) => setUnixInput(e.target.value)}
                    placeholder="e.g., 1709589895"
                    className="flex-1 px-4 py-3 rounded-lg font-mono"
                    style={{
                      fontFamily:
                        'ui-monospace, "SF Mono", "Cascadia Code", "Roboto Mono", Menlo, Monaco, Consolas, "Courier New", monospace',
                      border: '1px solid #D9DEE6',
                      color: '#080A0C',
                    }}
                  />
                  <button
                    onClick={handleUnixConvert}
                    className="px-6 py-3 rounded-full font-semibold transition-all"
                    style={{
                      backgroundColor: '#2E45F0',
                      color: 'white',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = '#005EE9';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = '#2E45F0';
                    }}
                  >
                    Convert
                  </button>
                </div>
              </div>
              {convertedTime && (
                <div
                  className="p-4 rounded-lg"
                  style={{ backgroundColor: '#F0F9F3', border: '1px solid #D9DEE6' }}
                >
                  <h3
                    className="font-medium mb-1"
                    style={{
                      color: '#364151',
                    }}
                  >
                    Converted Time
                  </h3>
                  <p
                    className="text-lg font-semibold"
                    style={{
                      color: '#080A0C',
                    }}
                  >
                    {convertedTime}
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Code Examples */}
          <div
            className="bg-white rounded-xl shadow-sm p-6"
            style={{ border: '1px solid #E6E9EE' }}
          >
            <h2
              className="text-xl font-semibold mb-4"
              style={{
                color: '#080A0C',
              }}
            >
              Code Examples
            </h2>
            <div className="space-y-4">
              <div>
                <h3
                  className="font-medium mb-2"
                  style={{
                    color: '#364151',
                  }}
                >
                  JavaScript
                </h3>
                <pre
                  className="p-4 rounded-lg overflow-x-auto text-sm"
                  style={{
                    backgroundColor: '#080A0C',
                    color: '#F0F9F3',
                  }}
                >
                  <code
                    style={{
                      fontFamily:
                        'ui-monospace, "SF Mono", "Cascadia Code", "Roboto Mono", Menlo, Monaco, Consolas, "Courier New", monospace',
                    }}
                  >{`// Get current Unix timestamp
const timestamp = Math.floor(Date.now() / 1000);

// Convert Unix timestamp to Date
const date = new Date(timestamp * 1000);

// Get ISO 8601 string
const iso = new Date().toISOString();`}</code>
                </pre>
              </div>
              <div>
                <h3
                  className="font-medium mb-2"
                  style={{
                    color: '#364151',
                  }}
                >
                  Python
                </h3>
                <pre
                  className="p-4 rounded-lg overflow-x-auto text-sm"
                  style={{
                    backgroundColor: '#080A0C',
                    color: '#F0F9F3',
                  }}
                >
                  <code
                    style={{
                      fontFamily:
                        'ui-monospace, "SF Mono", "Cascadia Code", "Roboto Mono", Menlo, Monaco, Consolas, "Courier New", monospace',
                    }}
                  >{`import time
from datetime import datetime

# Get current Unix timestamp
timestamp = int(time.time())

# Convert Unix timestamp to datetime
dt = datetime.fromtimestamp(timestamp)

# Get ISO 8601 string
iso = datetime.now().isoformat()`}</code>
                </pre>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <Footer />
      </div>
    </>
  );
}
