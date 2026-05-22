import { useState, useEffect, useMemo } from 'react';
import { CopyButton } from './CopyButton';
import { copyToClipboard } from '../utils/format';

/**
 * Format a timezone offset like -300 minutes into "UTC−5"
 * Uses proper minus sign (−) not hyphen (-)
 */
function formatUtcOffset(offsetMinutes: number): string {
  const hours = offsetMinutes / 60;
  // Round to nearest integer for clean display
  const roundedHours = Math.round(hours);
  const sign = roundedHours >= 0 ? '+' : '−'; // Using minus sign (U+2212)
  return `UTC${sign}${Math.abs(roundedHours)}`;
}

/**
 * Format date to UTC string (not GMT)
 */
function formatUtcString(date: Date): string {
  const pad = (n: number) => String(n).padStart(2, '0');

  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const months = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ];

  const dayName = days[date.getUTCDay()];
  const day = pad(date.getUTCDate());
  const month = months[date.getUTCMonth()];
  const year = date.getUTCFullYear();
  const hours = pad(date.getUTCHours());
  const minutes = pad(date.getUTCMinutes());
  const seconds = pad(date.getUTCSeconds());

  return `${dayName}, ${day} ${month} ${year} ${hours}:${minutes}:${seconds} UTC`;
}

/**
 * Get the UTC offset in minutes for a given IANA timezone at a given date.
 * This compares the timezone-local parts to the UTC timestamp.
 */
function getTimeZoneOffsetMinutes(date: Date, timeZone: string): number {
  const formatter = new Intl.DateTimeFormat('en-US', {
    timeZone,
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hourCycle: 'h23',
  });

  const parts = formatter.formatToParts(date);
  const map = Object.fromEntries(parts.map((p) => [p.type, p.value]));

  const asUtc = Date.UTC(
    Number(map.year),
    Number(map.month) - 1,
    Number(map.day),
    Number(map.hour),
    Number(map.minute),
    Number(map.second)
  );

  return (asUtc - date.getTime()) / 60000;
}

/**
 * Get country code from timezone
 */
function getCountryFromTimezone(timeZone: string): string {
  const timezoneToCountry: Record<string, string> = {
    'America/New_York': 'USA',
    'America/Chicago': 'USA',
    'America/Denver': 'USA',
    'America/Los_Angeles': 'USA',
    'America/Phoenix': 'USA',
    'America/Anchorage': 'USA',
    'Pacific/Honolulu': 'USA',
    'Europe/London': 'UK',
    'Europe/Paris': 'France',
    'Europe/Berlin': 'Germany',
    'Europe/Rome': 'Italy',
    'Europe/Madrid': 'Spain',
    'Asia/Tokyo': 'Japan',
    'Asia/Shanghai': 'China',
    'Asia/Hong_Kong': 'Hong Kong',
    'Asia/Singapore': 'Singapore',
    'Asia/Dubai': 'UAE',
    'Australia/Sydney': 'Australia',
    'Australia/Melbourne': 'Australia',
    'America/Toronto': 'Canada',
    'America/Vancouver': 'Canada',
  };

  return timezoneToCountry[timeZone] || '';
}

/**
 * Get timezone name with abbreviation
 */
function getTimezoneName(date: Date, timeZone: string): string {
  const longFormatter = new Intl.DateTimeFormat('en-US', {
    timeZone,
    timeZoneName: 'long',
  });

  const shortFormatter = new Intl.DateTimeFormat('en-US', {
    timeZone,
    timeZoneName: 'short',
  });

  const longParts = longFormatter.formatToParts(date);
  const shortParts = shortFormatter.formatToParts(date);

  const longName = longParts.find((p) => p.type === 'timeZoneName')?.value || '';
  const shortName = shortParts.find((p) => p.type === 'timeZoneName')?.value || '';

  // Return format like "Eastern Daylight Time (EDT)"
  if (longName && shortName) {
    return `${longName} (${shortName})`;
  }

  return longName || shortName || timeZone;
}

/**
 * Check if timezone is currently in DST
 */
function isDST(date: Date, timeZone: string): boolean {
  const january = new Date(date.getFullYear(), 0, 1);
  const july = new Date(date.getFullYear(), 6, 1);

  const janOffset = getTimeZoneOffsetMinutes(january, timeZone);
  const julOffset = getTimeZoneOffsetMinutes(july, timeZone);
  const currentOffset = getTimeZoneOffsetMinutes(date, timeZone);

  // DST is active when the offset is different from standard time
  return currentOffset !== Math.max(janOffset, julOffset);
}

interface LiveClockProps {
  city?: string;
  timeZone?: string;
  format?: '12h' | '24h';
  showSeconds?: boolean;
  showMilliseconds?: boolean;
  showDate?: boolean;
  showTimeZoneName?: boolean;
  showUtcOffset?: boolean;
  compact?: boolean;
}

function getInitialNow(): Date {
  const prerenderNow =
    typeof document === 'undefined'
      ? (globalThis as { __TIMEATLAS_PRERENDER_NOW?: string }).__TIMEATLAS_PRERENDER_NOW
      : document.documentElement.dataset.prerenderNow;

  return prerenderNow ? new Date(prerenderNow) : new Date();
}

export default function LiveClock({
  city = 'New York',
  timeZone = 'America/New_York',
  format = '12h',
  showSeconds = true,
  showMilliseconds = false,
  showDate = true,
  showTimeZoneName = true,
  showUtcOffset = true,
  compact = false,
}: LiveClockProps) {
  const [now, setNow] = useState(getInitialNow);

  useEffect(() => {
    setNow(new Date());

    const interval = setInterval(
      () => {
        setNow(new Date());
      },
      showMilliseconds ? 100 : 1000
    );

    return () => clearInterval(interval);
  }, [showMilliseconds]);

  const hour12 = format === '12h';

  const timeFormatter = useMemo(() => {
    return new Intl.DateTimeFormat('en-US', {
      timeZone,
      hour: 'numeric',
      minute: '2-digit',
      second: showSeconds ? '2-digit' : undefined,
      hour12,
    });
  }, [timeZone, showSeconds, hour12]);

  const dateFormatter = useMemo(() => {
    return new Intl.DateTimeFormat('en-US', {
      timeZone,
      weekday: 'long',
      month: 'long',
      day: 'numeric',
      year: 'numeric',
    });
  }, [timeZone]);

  const parts = timeFormatter.formatToParts(now);
  const getPart = (type: string) => parts.find((p) => p.type === type)?.value || '';

  const hour = getPart('hour');
  const minute = getPart('minute');
  const second = getPart('second');
  const dayPeriod = getPart('dayPeriod');

  const offsetMinutes = getTimeZoneOffsetMinutes(now, timeZone);
  const utcOffset = formatUtcOffset(offsetMinutes);

  const isoString = now.toISOString();
  const unixTimestamp = Math.floor(now.getTime() / 1000);
  const utcString = formatUtcString(now);

  // Split seconds into individual digits for signature color design
  const secondsDigits = second ? second.split('') : ['0', '0'];
  const secondLeft = secondsDigits[0] || '0';
  const secondRight = secondsDigits[1] || '0';

  // Get additional timezone info
  const country = getCountryFromTimezone(timeZone);
  const timezoneName = getTimezoneName(now, timeZone);
  const dstActive = isDST(now, timeZone);
  const dstText = dstActive ? 'DST active' : 'Standard time';

  // Strip country from city name if it's already included (e.g., "New York, USA" -> "New York")
  const cityName = city.includes(',') ? city.split(',')[0].trim() : city;

  return (
    <div
      style={{
        background: compact ? 'transparent' : '#FFFFFF',
        border: compact ? 'none' : '1px solid #E6E9EE',
        borderRadius: compact ? 0 : 16,
        boxShadow: compact ? 'none' : '0 10px 25px rgba(0,0,0,0.04)',
        padding: compact ? 0 : 'clamp(1rem, 4vw, 2rem)',
        textAlign: 'center',
        maxWidth: compact ? 'auto' : 900,
        margin: compact ? 0 : '0 auto',
      }}
    >
      {/* City (Country) */}
      <div
        style={{
          fontFamily: 'Inter, sans-serif',
          fontWeight: 600,
          fontSize: compact ? 16 : 18,
          color: '#364151',
          marginBottom: 12,
        }}
      >
        {cityName}
        {country && ` (${country})`}
      </div>

      {/* Main Time Display */}
      <div
        style={{
          fontFamily: 'Inter, sans-serif',
          fontWeight: 800,
          fontSize: compact ? 44 : 'clamp(3rem, 15vw, 7.5rem)',
          lineHeight: 1,
          letterSpacing: '-0.02em',
          fontVariantNumeric: 'tabular-nums',
          color: '#0f172a', // TimeAtlas signature: main time color
        }}
      >
        {hour}:{minute}
        {showSeconds && (
          <span style={{ letterSpacing: '0' }}>
            <span
              style={{
                color: '#475569', // TimeAtlas signature: second colon color
              }}
            >
              :
            </span>
            <span
              style={{
                color: '#475569', // TimeAtlas signature: first seconds digit
              }}
            >
              {secondLeft}
            </span>
            <span
              style={{
                color: '#94a3b8', // TimeAtlas signature: second seconds digit (fading)
              }}
            >
              {secondRight}
            </span>
          </span>
        )}
        {format === '12h' && (
          <span
            style={{
              fontSize: compact ? 18 : 'clamp(1.25rem, 4vw, 2rem)',
              fontWeight: 600,
              marginLeft: 8,
              letterSpacing: '0.1em',
              color: '#6B7280',
            }}
          >
            {dayPeriod}
          </span>
        )}
      </div>

      {/* Timezone Name */}
      {showTimeZoneName && (
        <div
          style={{
            fontFamily: 'Open Sans, sans-serif',
            fontSize: compact ? 14 : 16,
            color: '#6B7280',
            marginTop: 12,
          }}
        >
          {timezoneName}
        </div>
      )}

      {showMilliseconds && (
        <div
          style={{
            fontFamily: 'Open Sans, sans-serif',
            fontSize: 14,
            color: '#64748B',
            marginTop: 6,
            fontVariantNumeric: 'tabular-nums',
          }}
        >
          .{String(now.getMilliseconds()).padStart(3, '0')}
        </div>
      )}

      {/* Date */}
      {showDate && (
        <div
          style={{
            fontFamily: 'Open Sans, sans-serif',
            fontSize: compact ? 14 : 20,
            color: '#364151',
            marginTop: 12,
          }}
        >
          {dateFormatter.format(now)}
        </div>
      )}

      {/* UTC Offset with DST Status */}
      {showUtcOffset && (
        <div
          style={{
            fontFamily: 'Open Sans, sans-serif',
            fontSize: compact ? 12 : 16,
            color: '#6B7280',
            marginTop: 8,
          }}
        >
          {utcOffset} ({dstText})
        </div>
      )}

      {!compact && (
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            gap: 24,
            marginTop: 24,
            flexWrap: 'wrap',
            fontFamily: 'Open Sans, sans-serif',
            fontSize: 15,
          }}
        >
          <CopyButton label="ISO 8601" text={isoString} />
          <CopyButton label="UTC" text={utcString} />
          <CopyButton label="Unix" text={String(unixTimestamp)} />
        </div>
      )}
    </div>
  );
}
