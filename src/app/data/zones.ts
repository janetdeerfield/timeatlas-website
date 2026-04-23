/**
 * Shared zone configuration for the TimeAtlas Component System.
 * Provides IANA timezone identifiers and display metadata for all 11 supported zones.
 */

export interface ZoneInfo {
  /** Short display abbreviation used in pill labels, e.g. "ET", "GMT" */
  abbr: string;
  /** Full descriptive name, e.g. "Eastern Time" */
  fullName: string;
  /** IANA timezone identifier for Intl / useTime hook */
  ianaTimezone: string;
  /** Representative city name shown in pills, e.g. "New York" */
  city: string;
  /** URL slug fragment used in city-pair routes, e.g. "et", "gmt-uk" */
  slugPart: string;
  /** Standard-time UTC offset in decimal hours (e.g. -5, 5.5, 0) */
  utcOffset: number;
}

export const ZONE_LIST: ZoneInfo[] = [
  {
    abbr: 'ET',
    fullName: 'Eastern Time',
    ianaTimezone: 'America/New_York',
    city: 'New York',
    slugPart: 'et',
    utcOffset: -5,
  },
  {
    abbr: 'CT',
    fullName: 'Central Time',
    ianaTimezone: 'America/Chicago',
    city: 'Chicago',
    slugPart: 'ct',
    utcOffset: -6,
  },
  {
    abbr: 'MT',
    fullName: 'Mountain Time',
    ianaTimezone: 'America/Denver',
    city: 'Denver',
    slugPart: 'mt',
    utcOffset: -7,
  },
  {
    abbr: 'PT',
    fullName: 'Pacific Time',
    ianaTimezone: 'America/Los_Angeles',
    city: 'Los Angeles',
    slugPart: 'pt',
    utcOffset: -8,
  },
  {
    abbr: 'AKT',
    fullName: 'Alaska Time',
    ianaTimezone: 'America/Anchorage',
    city: 'Anchorage',
    slugPart: 'akt',
    utcOffset: -9,
  },
  {
    abbr: 'HI',
    fullName: 'Hawaii Time',
    ianaTimezone: 'Pacific/Honolulu',
    city: 'Honolulu',
    slugPart: 'ht',
    utcOffset: -10,
  },
  {
    abbr: 'UTC',
    fullName: 'Coordinated Universal Time',
    ianaTimezone: 'UTC',
    city: 'Universal',
    slugPart: 'utc',
    utcOffset: 0,
  },
  {
    abbr: 'GMT',
    fullName: 'UK Time',
    ianaTimezone: 'Europe/London',
    city: 'London',
    slugPart: 'gmt-uk',
    utcOffset: 0,
  },
  {
    abbr: 'IST',
    fullName: 'India Standard Time',
    ianaTimezone: 'Asia/Kolkata',
    city: 'New Delhi',
    slugPart: 'ist',
    utcOffset: 5.5,
  },
  {
    abbr: 'CET',
    fullName: 'Central European Time',
    ianaTimezone: 'Europe/Paris',
    city: 'Paris',
    slugPart: 'cet',
    utcOffset: 1,
  },
  {
    abbr: 'JST',
    fullName: 'Japan Standard Time',
    ianaTimezone: 'Asia/Tokyo',
    city: 'Tokyo',
    slugPart: 'jst',
    utcOffset: 9,
  },
];

/**
 * Lookup map from abbreviation → ZoneInfo.
 * Also handles legacy abbreviations (PST, EST, CST, MST, HST) used in static city-pair pages.
 */
export const ZONE_MAP: Record<string, ZoneInfo> = {
  ...Object.fromEntries(ZONE_LIST.map((z) => [z.abbr, z])),
  // Legacy / standard-time abbreviations used in static pages
  EST: ZONE_LIST[0], // ET
  EDT: ZONE_LIST[0],
  PST: ZONE_LIST[3], // PT
  PDT: ZONE_LIST[3],
  CST: ZONE_LIST[1], // CT
  CDT: ZONE_LIST[1],
  MST: ZONE_LIST[2], // MT
  MDT: ZONE_LIST[2],
  AKST: ZONE_LIST[4],
  AKDT: ZONE_LIST[4],
  HST: ZONE_LIST[5], // HI
  // GMT and UTC aliases
  'GMT-UK': ZONE_LIST[7],
  BST: ZONE_LIST[7],
};

/** Returns ZoneInfo for a given abbreviation, or undefined if not found. */
export function getZoneInfo(abbr: string): ZoneInfo | undefined {
  return ZONE_MAP[abbr] ?? ZONE_MAP[abbr.toUpperCase()];
}

/**
 * Formats a decimal UTC offset as a human-readable string.
 * Examples: -5 → "UTC-5", 5.5 → "UTC+5:30", 0 → "UTC+0"
 */
export function formatUtcOffsetLabel(offset: number): string {
  const sign = offset >= 0 ? '+' : '-';
  const abs = Math.abs(offset);
  const hours = Math.floor(abs);
  const minutes = Math.round((abs - hours) * 60);
  if (minutes === 0) return `UTC${sign}${hours}`;
  return `UTC${sign}${hours}:${String(minutes).padStart(2, '0')}`;
}
