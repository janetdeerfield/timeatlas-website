// Time utility functions
export interface CityTime {
  name: string;
  timezone: string;
  utcOffset: string;
  country?: string;
  timezoneDisplay?: string; // e.g., "Eastern Time (ET) · UTC−5"
  timezoneAbbrev?: string; // e.g., "ET", "PT", "GMT"
}

export const majorCities: CityTime[] = [
  {
    name: 'Honolulu',
    timezone: 'Pacific/Honolulu',
    utcOffset: 'UTC−10',
    country: 'USA',
    timezoneDisplay: 'HST (UTC−10)',
    timezoneAbbrev: 'HST',
  },
  {
    name: 'Los Angeles',
    timezone: 'America/Los_Angeles',
    utcOffset: 'UTC−8',
    country: 'USA',
    timezoneDisplay: 'PT (UTC−8)',
    timezoneAbbrev: 'PT',
  },
  {
    name: 'Denver',
    timezone: 'America/Denver',
    utcOffset: 'UTC−7',
    country: 'USA',
    timezoneDisplay: 'MT (UTC−7)',
    timezoneAbbrev: 'MT',
  },
  {
    name: 'Chicago',
    timezone: 'America/Chicago',
    utcOffset: 'UTC−6',
    country: 'USA',
    timezoneDisplay: 'CT (UTC−6)',
    timezoneAbbrev: 'CT',
  },
  {
    name: 'Mexico City',
    timezone: 'America/Mexico_City',
    utcOffset: 'UTC−6',
    country: 'Mexico',
    timezoneDisplay: 'CT (UTC−6)',
    timezoneAbbrev: 'CT',
  },
  {
    name: 'New York',
    timezone: 'America/New_York',
    utcOffset: 'UTC−5',
    country: 'USA',
    timezoneDisplay: 'ET (UTC−5)',
    timezoneAbbrev: 'ET',
  },
  {
    name: 'Santiago',
    timezone: 'America/Santiago',
    utcOffset: 'UTC−4',
    country: 'Chile',
    timezoneDisplay: 'CLT (UTC−4)',
    timezoneAbbrev: 'CLT',
  },
  {
    name: 'London',
    timezone: 'Europe/London',
    utcOffset: 'UTC+0',
    country: 'UK',
    timezoneDisplay: 'GMT (UTC+0)',
    timezoneAbbrev: 'GMT',
  },
  {
    name: 'Accra',
    timezone: 'Africa/Accra',
    utcOffset: 'UTC+0',
    country: 'Ghana',
    timezoneDisplay: 'GMT (UTC+0)',
    timezoneAbbrev: 'GMT',
  },
  {
    name: 'Berlin',
    timezone: 'Europe/Berlin',
    utcOffset: 'UTC+1',
    country: 'Germany',
    timezoneDisplay: 'CET (UTC+1)',
    timezoneAbbrev: 'CET',
  },
  {
    name: 'Cairo',
    timezone: 'Africa/Cairo',
    utcOffset: 'UTC+2',
    country: 'Egypt',
    timezoneDisplay: 'EET (UTC+2)',
    timezoneAbbrev: 'EET',
  },
  {
    name: 'Dubai',
    timezone: 'Asia/Dubai',
    utcOffset: 'UTC+4',
    country: 'UAE',
    timezoneDisplay: 'GST (UTC+4)',
    timezoneAbbrev: 'GST',
  },
  {
    name: 'New Delhi',
    timezone: 'Asia/Kolkata',
    utcOffset: 'UTC+5:30',
    country: 'India',
    timezoneDisplay: 'IST (UTC+5:30)',
    timezoneAbbrev: 'IST',
  },
  {
    name: 'Singapore',
    timezone: 'Asia/Singapore',
    utcOffset: 'UTC+8',
    country: 'Singapore',
    timezoneDisplay: 'SGT (UTC+8)',
    timezoneAbbrev: 'SGT',
  },
  {
    name: 'Tokyo',
    timezone: 'Asia/Tokyo',
    utcOffset: 'UTC+9',
    country: 'Japan',
    timezoneDisplay: 'JST (UTC+9)',
    timezoneAbbrev: 'JST',
  },
  {
    name: 'Sydney',
    timezone: 'Australia/Sydney',
    utcOffset: 'UTC+10',
    country: 'Australia',
    timezoneDisplay: 'AEST (UTC+10)',
    timezoneAbbrev: 'AEST',
  },
];

export function getCurrentTimeInTimezone(timezone: string, use24Hour: boolean = false): string {
  const options: Intl.DateTimeFormatOptions = {
    timeZone: timezone,
    hour: 'numeric',
    minute: '2-digit',
    second: '2-digit',
    hour12: !use24Hour,
  };
  return new Intl.DateTimeFormat('en-US', options).format(new Date());
}

export function getDateInTimezone(timezone: string): string {
  const options: Intl.DateTimeFormatOptions = {
    timeZone: timezone,
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  };
  return new Intl.DateTimeFormat('en-US', options).format(new Date());
}

export function getShortDateInTimezone(timezone: string): string {
  const options: Intl.DateTimeFormatOptions = {
    timeZone: timezone,
    month: 'short',
    day: 'numeric',
  };
  return new Intl.DateTimeFormat('en-US', options).format(new Date());
}

export function getUTCTime(): string {
  return new Date().toISOString().split('T')[1].split('.')[0];
}

export function getUnixTimestamp(): number {
  return Math.floor(Date.now() / 1000);
}

export function getISO8601(): string {
  return new Date().toISOString();
}

export function getMilliseconds(): string {
  return String(Date.now() % 1000)
    .padStart(3, '0')
    .slice(0, 2);
}

export function getUserTimezone(): string {
  return Intl.DateTimeFormat().resolvedOptions().timeZone;
}

export function getUserCity(): string {
  const timezone = getUserTimezone();
  const city = majorCities.find((c) => c.timezone === timezone);
  if (city) return `${city.name}, ${city.country}`;

  // Extract city name from timezone (e.g., "America/New_York" -> "New York")
  const parts = timezone.split('/');
  return parts[parts.length - 1].replace(/_/g, ' ');
}

export function getTimeDifference(
  timezone1: string,
  timezone2: string
): { hours: number; minutes: number; dayDiff: number } {
  const now = new Date();

  const time1 = new Date(now.toLocaleString('en-US', { timeZone: timezone1 }));
  const time2 = new Date(now.toLocaleString('en-US', { timeZone: timezone2 }));

  const diffMs = time2.getTime() - time1.getTime();
  const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
  const diffMinutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));

  const day1 = new Date(now.toLocaleString('en-US', { timeZone: timezone1 })).getDate();
  const day2 = new Date(now.toLocaleString('en-US', { timeZone: timezone2 })).getDate();
  const dayDiff = day2 - day1;

  return { hours: diffHours, minutes: diffMinutes, dayDiff };
}

export function speakTime(text: string, lang: string = 'en-US') {
  if ('speechSynthesis' in window) {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = lang;
    speechSynthesis.speak(utterance);
  }
}

export function getTimeForSpeech(timezone: string, use24Hour: boolean = false): string {
  // Get time without seconds for speech to avoid lag issues
  const options: Intl.DateTimeFormatOptions = {
    timeZone: timezone,
    hour: 'numeric',
    minute: '2-digit',
    hour12: !use24Hour,
  };
  const time = new Intl.DateTimeFormat('en-US', options).format(new Date());
  return `The time is ${time}`;
}

// DST detection function
export function isDSTActive(timezone: string): boolean {
  const now = new Date();
  const january = new Date(now.getFullYear(), 0, 1);
  const july = new Date(now.getFullYear(), 6, 1);

  const getOffset = (date: Date) => {
    const utcDate = new Date(date.toLocaleString('en-US', { timeZone: 'UTC' }));
    const tzDate = new Date(date.toLocaleString('en-US', { timeZone: timezone }));
    return utcDate.getTime() - tzDate.getTime();
  };

  const stdOffset = Math.max(getOffset(january), getOffset(july));
  const currentOffset = getOffset(now);

  return currentOffset < stdOffset;
}

// Get current UTC offset for a timezone
export function getCurrentUTCOffset(timezone: string): string {
  const now = new Date();
  const utcDate = new Date(now.toLocaleString('en-US', { timeZone: 'UTC' }));
  const tzDate = new Date(now.toLocaleString('en-US', { timeZone: timezone }));

  const offsetMs = tzDate.getTime() - utcDate.getTime();
  const offsetHours = Math.floor(Math.abs(offsetMs) / (1000 * 60 * 60));
  const offsetMinutes = Math.floor((Math.abs(offsetMs) % (1000 * 60 * 60)) / (1000 * 60));

  const sign = offsetMs >= 0 ? '+' : '-';
  const formatted =
    offsetMinutes > 0
      ? `UTC${sign}${offsetHours}:${offsetMinutes.toString().padStart(2, '0')}`
      : `UTC${sign}${offsetHours}`;

  return formatted;
}

// Get timezone display - simplified format: "ET (UTC−5)"
export function getTimezoneDisplayWithDST(city: CityTime): string {
  const currentOffset = getCurrentUTCOffset(city.timezone);
  // Use proper minus sign (U+2212) instead of hyphen
  const formattedOffset = currentOffset.replace('-', '−').replace('+', '+');
  return `${city.timezoneAbbrev} (${formattedOffset})`;
}
