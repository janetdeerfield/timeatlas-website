import { useState, useEffect, useMemo } from 'react';

interface UseTimeOptions {
  timeZone: string;
  format: '12h' | '24h';
  showSeconds?: boolean;
  showMilliseconds?: boolean;
}

interface TimeData {
  hour: string;
  minute: string;
  second: string;
  dayPeriod: string;
  formattedTime: string;
  formattedDate: string;
  milliseconds: string;
  offsetMinutes: number;
  utcOffset: string;
  isoString: string;
  unixTimestamp: number;
  utcString: string;
  activeAbbr: string;
  activeZoneName: string;
}

function getInitialNow(): Date {
  const prerenderNow =
    typeof document === 'undefined'
      ? (globalThis as { __TIMEATLAS_PRERENDER_NOW?: string }).__TIMEATLAS_PRERENDER_NOW
      : document.documentElement.dataset.prerenderNow;

  return prerenderNow ? new Date(prerenderNow) : new Date();
}

/**
 * Format a timezone offset like -300 minutes into "UTC-5" or 330 into "UTC+5:30"
 */
function formatUtcOffset(offsetMinutes: number): string {
  const rounded = Math.round(offsetMinutes);
  const sign = rounded >= 0 ? '+' : '-';
  const absMin = Math.abs(rounded);
  const h = Math.floor(absMin / 60);
  const m = absMin % 60;
  return m === 0 ? `UTC${sign}${h}` : `UTC${sign}${h}:${String(m).padStart(2, '0')}`;
}

/**
 * Get the UTC offset in minutes for a given IANA timezone at a given date.
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

export function useTime({
  timeZone,
  format,
  showSeconds = true,
  showMilliseconds = false,
}: UseTimeOptions): TimeData {
  const [now, setNow] = useState(getInitialNow);

  useEffect(() => {
    let interval: ReturnType<typeof setInterval> | undefined;

    const startTicking = () => {
      setNow(new Date());
      interval = setInterval(() => setNow(new Date()), showMilliseconds ? 100 : 1000);
    };

    if (typeof window !== 'undefined' && 'requestIdleCallback' in window) {
      window.requestIdleCallback(startTicking);
    } else {
      setTimeout(startTicking, 0);
    }

    return () => {
      if (interval !== undefined) clearInterval(interval);
    };
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

  const shortTzFormatter = useMemo(
    () => new Intl.DateTimeFormat('en-US', { timeZone, timeZoneName: 'short', year: 'numeric' }),
    [timeZone]
  );
  const longTzFormatter = useMemo(
    () => new Intl.DateTimeFormat('en-US', { timeZone, timeZoneName: 'long', year: 'numeric' }),
    [timeZone]
  );

  const parts = timeFormatter.formatToParts(now);
  const getPart = (type: string) => parts.find((p) => p.type === type)?.value || '';

  const hour = getPart('hour');
  const minute = getPart('minute');
  const second = getPart('second');
  const dayPeriod = getPart('dayPeriod');

  const offsetMinutes = getTimeZoneOffsetMinutes(now, timeZone);
  const utcOffset = formatUtcOffset(offsetMinutes);

  const formattedTime = timeFormatter.format(now);
  const formattedDate = dateFormatter.format(now);
  const milliseconds = String(now.getMilliseconds()).padStart(3, '0');

  const isoString = now.toISOString();
  const unixTimestamp = Math.floor(now.getTime() / 1000);
  const utcString = now.toUTCString();

  const activeAbbr =
    shortTzFormatter.formatToParts(now).find((p) => p.type === 'timeZoneName')?.value ?? '';
  const activeZoneName =
    longTzFormatter.formatToParts(now).find((p) => p.type === 'timeZoneName')?.value ?? '';

  return {
    hour,
    minute,
    second,
    dayPeriod,
    formattedTime,
    formattedDate,
    milliseconds,
    offsetMinutes,
    utcOffset,
    isoString,
    unixTimestamp,
    utcString,
    activeAbbr,
    activeZoneName,
  };
}
