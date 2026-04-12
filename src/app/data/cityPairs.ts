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

export const cityPairs: CityPairPageData[] = [
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
      { href: '/convert', label: 'Full Time Zone Converter' },
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
      { href: '/convert', label: 'Full Time Zone Converter' },
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
      { from: '12:00 AM UTC', to: '7:00 PM EST (prev)' },
      { from: '1:00 AM UTC', to: '8:00 PM EST (prev)' },
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
      { href: '/convert', label: 'Full Time Zone Converter' },
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
      { from: '12:00 AM GMT', to: '7:00 PM EST (prev)' },
      { from: '1:00 AM GMT', to: '8:00 PM EST (prev)' },
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
      { href: '/convert', label: 'Full Time Zone Converter' },
      { href: '/meet', label: 'Meeting Planner' },
    ],
  },
];

export function getCityPairBySlug(slug: string) {
  return cityPairs.find((item) => item.slug === slug);
}
