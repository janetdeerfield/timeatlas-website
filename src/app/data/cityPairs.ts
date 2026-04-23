export interface CityPairPageData {
  slug: string;
  title: string;
  fromZone: string;
  toZone: string;
  timeDifference: string;
  description: string;
  h1: string;
  intro: string;
  tableHeading: string;
  conversions: Array<{ from: string; to: string }>;
  faq: Array<{ question: string; answer: string }>;
  related: Array<{ href: string; label: string }>;
}

// ─── Static pages (legacy format, kept for backwards-compatibility) ───────────
const staticCityPairs: CityPairPageData[] = [
  {
    slug: 'pst-to-est',
    title: 'PST to EST Converter – Pacific to Eastern Time | TimeAtlas',
    fromZone: 'PST',
    toZone: 'EST',
    timeDifference: 'EST is 3 hours ahead of PST',
    description:
      'Convert Pacific Time to Eastern Time instantly. PST is 3 hours behind EST. Compare times for meetings, travel, and remote work.',
    h1: 'PST to EST Time Converter',
    intro:
      'Convert Pacific Time (PST) to Eastern Time (EST) instantly. PST is 3 hours behind EST, so 9:00 AM in Los Angeles is 12:00 PM in New York. Use this converter to quickly compare time zones for meetings, travel, and remote collaboration.',
    tableHeading: 'PST to EST Conversion Table',
    conversions: [
      { from: '6:00 AM PST', to: '9:00 AM EST' },
      { from: '7:00 AM PST', to: '10:00 AM EST' },
      { from: '8:00 AM PST', to: '11:00 AM EST' },
      { from: '9:00 AM PST', to: '12:00 PM EST' },
      { from: '10:00 AM PST', to: '1:00 PM EST' },
      { from: '11:00 AM PST', to: '2:00 PM EST' },
      { from: '12:00 PM PST', to: '3:00 PM EST' },
      { from: '1:00 PM PST', to: '4:00 PM EST' },
      { from: '2:00 PM PST', to: '5:00 PM EST' },
      { from: '3:00 PM PST', to: '6:00 PM EST' },
      { from: '5:00 PM PST', to: '8:00 PM EST' },
      { from: '6:00 PM PST', to: '9:00 PM EST' },
    ],
    faq: [
      {
        question: 'What is the time difference between PST and EST?',
        answer:
          "Eastern Time is 3 hours ahead of Pacific Time. So when it's noon on the West Coast, it's 3:00 PM on the East Coast.",
      },
      {
        question: 'How do I convert PST to EST?',
        answer:
          'Add 3 hours to the Pacific Time to get the Eastern Time. For example, 2:00 PM PST is 5:00 PM EST.',
      },
      {
        question: 'Does daylight saving time affect PST to EST conversion?',
        answer:
          'The time zone names may change (PDT/EDT during summer), but the 3-hour difference between coasts remains consistent throughout the year.',
      },
    ],
    related: [
      { href: '/est-to-pst', label: 'EST to PST' },
      { href: '/utc-to-est', label: 'UTC to EST' },
      { href: '/gmt-to-est', label: 'GMT to EST' },
      { href: '/convert', label: 'Time Zone Converter' },
    ],
  },
  {
    slug: 'est-to-pst',
    title: 'EST to PST Converter – Eastern to Pacific Time | TimeAtlas',
    fromZone: 'EST',
    toZone: 'PST',
    timeDifference: 'PST is 3 hours behind EST',
    description:
      'Convert Eastern Time to Pacific Time instantly. EST is 3 hours ahead of PST. Compare times for meetings, travel, and remote work.',
    h1: 'EST to PST Time Converter',
    intro:
      'Convert Eastern Time (EST) to Pacific Time (PST) instantly. Eastern Time is 3 hours ahead of Pacific Time, so 3:00 PM in New York is 12:00 PM in Los Angeles. Use this converter for meetings, travel, and remote collaboration.',
    tableHeading: 'EST to PST Conversion Table',
    conversions: [
      { from: '9:00 AM EST', to: '6:00 AM PST' },
      { from: '10:00 AM EST', to: '7:00 AM PST' },
      { from: '11:00 AM EST', to: '8:00 AM PST' },
      { from: '12:00 PM EST', to: '9:00 AM PST' },
      { from: '1:00 PM EST', to: '10:00 AM PST' },
      { from: '2:00 PM EST', to: '11:00 AM PST' },
      { from: '3:00 PM EST', to: '12:00 PM PST' },
      { from: '4:00 PM EST', to: '1:00 PM PST' },
      { from: '5:00 PM EST', to: '2:00 PM PST' },
      { from: '6:00 PM EST', to: '3:00 PM PST' },
      { from: '7:00 PM EST', to: '4:00 PM PST' },
      { from: '8:00 PM EST', to: '5:00 PM PST' },
    ],
    faq: [
      {
        question: 'What is the time difference between EST and PST?',
        answer:
          "Eastern Time is 3 hours ahead of Pacific Time. So when it's 3:00 PM on the East Coast, it's noon on the West Coast.",
      },
      {
        question: 'How do I convert EST to PST?',
        answer:
          'Subtract 3 hours from the Eastern Time to get the Pacific Time. For example, 5:00 PM EST is 2:00 PM PST.',
      },
      {
        question: "What's the best time for meetings across coasts?",
        answer:
          '12:00 PM to 5:00 PM EST (9:00 AM to 2:00 PM PST) works well for most meetings, keeping both sides in working hours.',
      },
    ],
    related: [
      { href: '/pst-to-est', label: 'PST to EST' },
      { href: '/gmt-to-est', label: 'GMT to EST' },
      { href: '/convert', label: 'Time Zone Converter' },
      { href: '/meet', label: 'Meeting Planner' },
    ],
  },
  {
    slug: 'utc-to-est',
    title: 'UTC to EST Converter | TimeAtlas',
    fromZone: 'UTC',
    toZone: 'EST',
    timeDifference: 'UTC is 5 hours ahead of EST',
    description:
      'Convert UTC to Eastern Time instantly. Compare UTC and EST for meetings, scheduling, and global collaboration.',
    h1: 'UTC to EST Time Converter',
    intro:
      'Convert Coordinated Universal Time (UTC) to Eastern Time (EST) instantly. UTC is 5 hours ahead of EST, so 5:00 PM UTC is 12:00 PM EST. Use this converter for international meetings, server time coordination, and global scheduling.',
    tableHeading: 'UTC to EST Conversion Table',
    conversions: [
      { from: '12:00 AM UTC', to: '7:00 PM EST (previous day)' },
      { from: '1:00 AM UTC', to: '8:00 PM EST (previous day)' },
      { from: '8:00 AM UTC', to: '3:00 AM EST' },
      { from: '12:00 PM UTC', to: '7:00 AM EST' },
      { from: '1:00 PM UTC', to: '8:00 AM EST' },
      { from: '5:00 PM UTC', to: '12:00 PM EST' },
      { from: '6:00 PM UTC', to: '1:00 PM EST' },
      { from: '7:00 PM UTC', to: '2:00 PM EST' },
      { from: '8:00 PM UTC', to: '3:00 PM EST' },
      { from: '11:00 PM UTC', to: '6:00 PM EST' },
      { from: '2:00 PM UTC', to: '9:00 AM EST' },
      { from: '9:00 AM UTC', to: '4:00 AM EST' },
    ],
    faq: [
      {
        question: 'What is the time difference between UTC and EST?',
        answer:
          "UTC is 5 hours ahead of EST (Eastern Standard Time). So when it's noon UTC, it's 7:00 AM EST.",
      },
      {
        question: 'How do I convert UTC to EST?',
        answer: 'Subtract 5 hours from UTC to get EST. For example, 8:00 PM UTC is 3:00 PM EST.',
      },
      {
        question: 'Why is UTC important for developers?',
        answer:
          'UTC is the global standard for server times, databases, and logs. Converting UTC to local times like EST helps coordinate across time zones.',
      },
    ],
    related: [
      { href: '/gmt-to-est', label: 'GMT to EST' },
      { href: '/pst-to-est', label: 'PST to EST' },
      { href: '/convert', label: 'Time Zone Converter' },
      { href: '/dev', label: 'Developer Tools' },
    ],
  },
  {
    slug: 'gmt-to-est',
    title: 'GMT to EST Converter | TimeAtlas',
    fromZone: 'GMT',
    toZone: 'EST',
    timeDifference: 'GMT is 5 hours ahead of EST',
    description:
      'Convert GMT to Eastern Time instantly. Compare GMT and EST for meetings, travel, and business scheduling.',
    h1: 'GMT to EST Time Converter',
    intro:
      'Convert Greenwich Mean Time (GMT) to Eastern Time (EST) instantly. GMT is 5 hours ahead of EST, so 5:00 PM GMT is 12:00 PM EST. Use this converter for UK-US coordination, international business hours, and meeting scheduling.',
    tableHeading: 'GMT to EST Conversion Table',
    conversions: [
      { from: '12:00 AM GMT', to: '7:00 PM EST (previous day)' },
      { from: '1:00 AM GMT', to: '8:00 PM EST (previous day)' },
      { from: '8:00 AM GMT', to: '3:00 AM EST' },
      { from: '12:00 PM GMT', to: '7:00 AM EST' },
      { from: '1:00 PM GMT', to: '8:00 AM EST' },
      { from: '5:00 PM GMT', to: '12:00 PM EST' },
      { from: '6:00 PM GMT', to: '1:00 PM EST' },
      { from: '7:00 PM GMT', to: '2:00 PM EST' },
      { from: '8:00 PM GMT', to: '3:00 PM EST' },
      { from: '11:00 PM GMT', to: '6:00 PM EST' },
      { from: '2:00 PM GMT', to: '9:00 AM EST' },
      { from: '9:00 AM GMT', to: '4:00 AM EST' },
    ],
    faq: [
      {
        question: 'What is the time difference between GMT and EST?',
        answer:
          "GMT is 5 hours ahead of EST. So when it's noon GMT (London time), it's 7:00 AM EST (New York time).",
      },
      {
        question: 'How do I convert GMT to EST?',
        answer: 'Subtract 5 hours from GMT to get EST. For example, 8:00 PM GMT is 3:00 PM EST.',
      },
      {
        question: "What's the best time for UK-US meetings?",
        answer:
          '1:00 PM to 5:00 PM GMT (8:00 AM to 12:00 PM EST) works well, overlapping UK afternoon and US morning business hours.',
      },
    ],
    related: [
      { href: '/utc-to-est', label: 'UTC to EST' },
      { href: '/est-to-pst', label: 'EST to PST' },
      { href: '/convert', label: 'Time Zone Converter' },
      { href: '/meet', label: 'Meeting Planner' },
    ],
  },
];

// ─── New-format city pair page generator ─────────────────────────────────────

interface ZoneConfig {
  /** Short abbreviation used in H1, table, and FAQ (e.g. "ET", "GMT", "IST") */
  abbr: string;
  /**
   * Display name used in H1 heading when this zone is the destination.
   * Differs from abbr only for the GMT/UK zone ("UK Time").
   */
  h1Name: string;
  /** Full descriptive name for titles and intro text (e.g. "Eastern Time") */
  fullName: string;
  /** URL slug fragment (e.g. "et", "gmt-uk", "akt") */
  slugPart: string;
  /** Standard-time UTC offset in decimal hours (e.g. -5, 5.5) */
  utcOffset: number;
  /** Standard-time abbreviation shown in conversion table (e.g. "EST") */
  stdAbbr: string;
  /** Daylight-saving abbreviation; empty string when zone has no DST */
  dstAbbr: string;
  /** One-sentence zone description used in page intro */
  zoneDesc: string;
}

const ZONE_CONFIGS: ZoneConfig[] = [
  {
    abbr: 'ET',
    h1Name: 'ET',
    fullName: 'Eastern Time',
    slugPart: 'et',
    utcOffset: -5,
    stdAbbr: 'EST',
    dstAbbr: 'EDT',
    zoneDesc:
      'Eastern Time (ET) includes both Eastern Standard Time (EST) and Eastern Daylight Time (EDT).',
  },
  {
    abbr: 'CT',
    h1Name: 'CT',
    fullName: 'Central Time',
    slugPart: 'ct',
    utcOffset: -6,
    stdAbbr: 'CST',
    dstAbbr: 'CDT',
    zoneDesc:
      'Central Time (CT) includes both Central Standard Time (CST) and Central Daylight Time (CDT).',
  },
  {
    abbr: 'MT',
    h1Name: 'MT',
    fullName: 'Mountain Time',
    slugPart: 'mt',
    utcOffset: -7,
    stdAbbr: 'MST',
    dstAbbr: 'MDT',
    zoneDesc:
      'Mountain Time (MT) includes both Mountain Standard Time (MST) and Mountain Daylight Time (MDT).',
  },
  {
    abbr: 'PT',
    h1Name: 'PT',
    fullName: 'Pacific Time',
    slugPart: 'pt',
    utcOffset: -8,
    stdAbbr: 'PST',
    dstAbbr: 'PDT',
    zoneDesc:
      'Pacific Time (PT) includes both Pacific Standard Time (PST) and Pacific Daylight Time (PDT).',
  },
  {
    abbr: 'AKT',
    h1Name: 'AKT',
    fullName: 'Alaska Time',
    slugPart: 'akt',
    utcOffset: -9,
    stdAbbr: 'AKST',
    dstAbbr: 'AKDT',
    zoneDesc:
      'Alaska Time (AKT) includes both Alaska Standard Time (AKST) and Alaska Daylight Time (AKDT).',
  },
  {
    abbr: 'HT',
    h1Name: 'HT',
    fullName: 'Hawaii Time',
    slugPart: 'ht',
    utcOffset: -10,
    stdAbbr: 'HST',
    dstAbbr: '',
    zoneDesc:
      'Hawaii Time (HT) uses Hawaii Standard Time (HST). Daylight saving time is not observed in Hawaii.',
  },
  {
    abbr: 'UTC',
    h1Name: 'UTC',
    fullName: 'Coordinated Universal Time',
    slugPart: 'utc',
    utcOffset: 0,
    stdAbbr: 'UTC',
    dstAbbr: '',
    zoneDesc:
      'Coordinated Universal Time (UTC) is the primary global time standard. It does not observe daylight saving time.',
  },
  {
    abbr: 'GMT',
    h1Name: 'UK Time',
    fullName: 'UK Time',
    slugPart: 'gmt-uk',
    utcOffset: 0,
    stdAbbr: 'GMT',
    dstAbbr: 'BST',
    zoneDesc:
      'UK Time uses Greenwich Mean Time (GMT, UTC+0) in winter and British Summer Time (BST, UTC+1) in summer.',
  },
  {
    abbr: 'IST',
    h1Name: 'IST',
    fullName: 'India Standard Time',
    slugPart: 'ist',
    utcOffset: 5.5,
    stdAbbr: 'IST',
    dstAbbr: '',
    zoneDesc: 'India Standard Time (IST) is UTC+5:30. India does not observe daylight saving time.',
  },
  {
    abbr: 'CET',
    h1Name: 'CET',
    fullName: 'Central European Time',
    slugPart: 'cet',
    utcOffset: 1,
    stdAbbr: 'CET',
    dstAbbr: 'CEST',
    zoneDesc:
      'Central European Time (CET) is UTC+1. During summer, Central European Summer Time (CEST, UTC+2) is observed.',
  },
  {
    abbr: 'JST',
    h1Name: 'JST',
    fullName: 'Japan Standard Time',
    slugPart: 'jst',
    utcOffset: 9,
    stdAbbr: 'JST',
    dstAbbr: '',
    zoneDesc: 'Japan Standard Time (JST) is UTC+9. Japan does not observe daylight saving time.',
  },
];

/** Format a decimal hour value (may be negative or ≥ 24) as "H:MM AM/PM". */
function formatDecimalHour(h: number): string {
  // Normalise to 0–1439 minute range, preserving fractional minutes
  const rawMins = Math.round((((h % 24) + 24) % 24) * 60);
  const hour24 = Math.floor(rawMins / 60) % 24;
  const mins = rawMins % 60;
  const period = hour24 < 12 ? 'AM' : 'PM';
  const hour12 = hour24 === 0 ? 12 : hour24 > 12 ? hour24 - 12 : hour24;
  const minsStr = mins === 0 ? '00' : String(mins).padStart(2, '0');
  return `${hour12}:${minsStr} ${period}`;
}

/** Human-readable form of an hour offset, e.g. "3 hours", "30 minutes", "5 hours and 30 minutes". */
function diffLabel(diffHours: number): string {
  const abs = Math.abs(diffHours);
  const h = Math.floor(abs);
  const m = Math.round((abs - h) * 60);
  if (m === 0) return `${h} hour${h === 1 ? '' : 's'}`;
  if (h === 0) return `${m} minute${m === 1 ? '' : 's'}`;
  return `${h} hour${h === 1 ? '' : 's'} and ${m} minute${m === 1 ? '' : 's'}`;
}

function buildConversions(from: ZoneConfig, to: ZoneConfig): Array<{ from: string; to: string }> {
  const diff = to.utcOffset - from.utcOffset;
  // For IST (UTC+5:30) as source, start at :30 so target times land on round hours.
  const startOffset = from.utcOffset % 1 !== 0 ? 0.5 : 0;
  // 12 sample times spaced 2 hours apart across the day
  const sourceTimes = Array.from({ length: 12 }, (_, i) => startOffset + i * 2);

  return sourceTimes.map((h) => {
    const target = h + diff;
    const dayNote = target >= 24 ? ' (next day)' : target < 0 ? ' (previous day)' : '';
    return {
      from: `${formatDecimalHour(h)} ${from.abbr}`,
      to: `${formatDecimalHour(target)} ${to.abbr}${dayNote}`,
    };
  });
}

function buildDstAnswer(from: ZoneConfig, to: ZoneConfig): string {
  const fromHasDst = !!from.dstAbbr;
  const toHasDst = !!to.dstAbbr;
  const diff = diffLabel(Math.abs(to.utcOffset - from.utcOffset));

  if (!fromHasDst && !toHasDst) {
    return `Neither ${from.fullName} nor ${to.fullName} observes daylight saving time, so the time difference remains constant throughout the year.`;
  }
  if (fromHasDst && toHasDst) {
    return `Both ${from.fullName} and ${to.fullName} observe daylight saving time. When both zones switch simultaneously, the ${diff} difference stays the same. During transition periods when only one zone has switched, the offset may temporarily differ by 1 hour.`;
  }
  if (fromHasDst) {
    return `${from.fullName} observes daylight saving time (switching between ${from.stdAbbr} and ${from.dstAbbr}), while ${to.fullName} does not. The time difference may vary by 1 hour depending on the season.`;
  }
  return `${to.fullName} observes daylight saving time (switching between ${to.stdAbbr} and ${to.dstAbbr}), while ${from.fullName} does not. The time difference may vary by 1 hour depending on the season.`;
}

function buildRelated(from: ZoneConfig, to: ZoneConfig): Array<{ href: string; label: string }> {
  // Reverse pair
  const reverse = {
    href: `/${to.slugPart}-to-${from.slugPart}`,
    label: `${to.abbr} → ${from.abbr}`,
  };

  // Two other zones that the "from" zone pairs well with (skip from and to)
  const others = ZONE_CONFIGS.filter((z) => z !== from && z !== to)
    .slice(0, 2)
    .map((z) => ({
      href: `/${from.slugPart}-to-${z.slugPart}`,
      label: `${from.abbr} → ${z.abbr}`,
    }));

  return [reverse, ...others, { href: '/convert', label: 'Smart Time Converter' }];
}

function buildPage(from: ZoneConfig, to: ZoneConfig): CityPairPageData {
  const diff = to.utcOffset - from.utcOffset;
  const slug = `${from.slugPart}-to-${to.slugPart}`;

  const timeDifference =
    diff === 0
      ? `${from.fullName} and ${to.fullName} share the same UTC offset`
      : `${to.fullName} is ${diffLabel(diff)} ${diff > 0 ? 'ahead of' : 'behind'} ${from.fullName}`;

  const h1 = `${from.abbr} → ${to.h1Name} Converter (${from.abbr} to ${to.abbr})`;

  const title = `${from.fullName} → ${to.fullName} Converter (${from.abbr} to ${to.abbr}) | TimeAtlas`;

  const description = `Convert ${from.fullName} (${from.abbr}) to ${to.fullName} (${to.abbr}) instantly. ${timeDifference}. Use this converter for scheduling meetings, remote work, and global coordination.`;

  const intro = `Convert ${from.fullName} (${from.abbr}) to ${to.fullName} (${to.abbr}) instantly. ${timeDifference}. ${from.zoneDesc} ${to.zoneDesc}`;

  // Example conversion at noon source time for FAQ answer
  const noonTarget = 12 + diff;
  const noonTargetStr =
    `${formatDecimalHour(noonTarget)} ${to.abbr}` +
    (noonTarget >= 24 ? ' (next day)' : noonTarget < 0 ? ' (previous day)' : '');

  const faq = [
    {
      question: `What is the time difference between ${from.abbr} and ${to.abbr}?`,
      answer:
        diff === 0
          ? `${from.fullName} and ${to.fullName} share the same UTC offset, so there is no time difference between them.`
          : `${to.fullName} is ${diffLabel(Math.abs(diff))} ${diff > 0 ? 'ahead of' : 'behind'} ${from.fullName} during standard time.`,
    },
    {
      question: `How do I convert ${from.abbr} to ${to.abbr}?`,
      answer:
        diff === 0
          ? `${from.abbr} and ${to.abbr} share the same UTC offset, so no conversion is needed.`
          : `${diff > 0 ? 'Add' : 'Subtract'} ${diffLabel(Math.abs(diff))} ${diff > 0 ? 'to' : 'from'} the ${from.abbr} time to get ${to.abbr}. For example, 12:00 PM ${from.abbr} is ${noonTargetStr}.`,
    },
    {
      question: `Does daylight saving time affect the ${from.abbr} to ${to.abbr} conversion?`,
      answer: buildDstAnswer(from, to),
    },
  ];

  return {
    slug,
    title,
    fromZone: from.abbr,
    toZone: to.abbr,
    timeDifference,
    description,
    h1,
    intro,
    tableHeading: `${from.abbr} to ${to.abbr} Conversion Table`,
    conversions: buildConversions(from, to),
    faq,
    related: buildRelated(from, to),
  };
}

const generatedCityPairs: CityPairPageData[] = ZONE_CONFIGS.flatMap((from) =>
  ZONE_CONFIGS.filter((z) => z !== from).map((to) => buildPage(from, to))
);

export const cityPairs: CityPairPageData[] = [...staticCityPairs, ...generatedCityPairs];

export function getCityPairBySlug(slug: string) {
  return cityPairs.find((item) => item.slug === slug);
}

/** All slug parts used in the generated zone config, for use by build tooling. */
export const GENERATED_ZONE_SLUG_PARTS: string[] = ZONE_CONFIGS.map((z) => z.slugPart);
