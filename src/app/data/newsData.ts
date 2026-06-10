// Editorial data for the /news Dispatch page.
// Items here are curated by hand until a CMS/feed is wired up.
// IMPORTANT: verify every item against its primary source before publishing —
// this page trades on accuracy. Add an `href` to a card only once a detail
// page for it actually exists (cards without href render unlinked by design).

import type { TickerItem } from '../components/news/NewsTicker';
import type { NewsArticle } from '../components/news/NewsHub';

export const TICKER_ITEMS: TickerItem[] = [
  { date: '06/01/2026', text: 'IANA tzdb 2026c released — Egypt rule correction' },
  { date: '05/28/2026', text: 'US Sunshine Protection Act reintroduced in Senate' },
  { date: '05/15/2026', text: 'NIST JILA ytterbium clock achieves 10⁻¹⁹ fractional uncertainty' },
  { date: '05/01/2026', text: 'USNO Rubidium Fountains mark 15 years of continuous operation' },
  { date: '04/23/2026', text: 'IANA tzdb 2026b released' },
  { date: '04/10/2026', text: 'Samoa eliminates biannual clock change' },
  { date: '03/31/2026', text: 'EU Parliament delays permanent summer time resolution to Q1 2027' },
  { date: '03/08/2026', text: 'North America DST begins — clocks spring forward at 2:00 AM' },
];

export const NEWS_ARTICLES: NewsArticle[] = [
  {
    id: '001',
    title: 'Senate Reintroduces Sunshine Protection Act for Fifth Consecutive Session',
    excerpt:
      'Bipartisan legislation to eliminate seasonal clock changes cleared committee markup Thursday, backed by 63 co-sponsors. Permanent DST would take effect November 2027 if passed.',
    date: '2026-05-28',
    category: 'POLICY',
    tags: ['policy', 'dst', 'legislation'],
    featured: true,
    readTime: 4,
    source: 'Policy Desk',
    journalLink: {
      href: '/journal/handling-dst-conversions',
      label: 'DST Dev Guide',
    },
  },
  {
    id: '002',
    title: 'IANA tzdb 2026c Corrects Egypt Ramadan Exception Rule',
    excerpt:
      'A subtle off-by-one in the Ramadan suspension clause has been patched. Operators on 2026a–2026b should update immediately.',
    date: '2026-06-01',
    category: 'STANDARDS',
    tags: ['iana', 'developer', 'dst'],
    readTime: 2,
    source: 'IANA',
  },
  {
    id: '003',
    title: 'JILA Ytterbium Lattice Clock Reaches 10⁻¹⁹ Fractional Uncertainty',
    excerpt:
      'The benchmark surpasses the previous record by a factor of three — it would not lose one second in 30 billion years.',
    date: '2026-05-15',
    category: 'SCIENCE',
    tags: ['science', 'atomic-time', 'nist'],
    readTime: 6,
    source: 'NIST / JILA',
  },
  {
    id: '005',
    title: 'How the Railroad Companies Standardized Time in 1883',
    excerpt:
      "Before Railroad Time, American cities each kept their own solar noon. The 1883 General Time Convention changed everything — the federal government didn't catch up for 35 years.",
    date: '2026-04-30',
    category: 'HISTORY',
    tags: ['history', 'standards'],
    readTime: 9,
  },
  {
    id: '006',
    title: 'Temporal DB Indexing for High-Frequency UTC Timestamps',
    excerpt:
      'B-tree vs. BRIN index selection when your time-series table exceeds 10 billion rows — benchmarked on PostgreSQL 17 and TimescaleDB.',
    date: '2026-04-22',
    category: 'RESEARCH',
    tags: ['developer', 'research', 'databases'],
    readTime: 12,
  },
  {
    id: '007',
    title: 'Leap Second Retirement: ITU Formal Decision Expected by Year-End',
    excerpt:
      'The ITU Assembly is expected to ratify retirement of the leap second at its November session, ending a 54-year practice.',
    date: '2026-05-05',
    category: 'STANDARDS',
    tags: ['standards', 'itu', 'leap-second'],
    readTime: 5,
    source: 'ITU-R',
  },
  {
    id: '008',
    title: 'EU Delays Permanent Summer Time Resolution to Q1 2027',
    excerpt:
      'Member state disagreement over which permanent offset to adopt has pushed the directive back for the third consecutive year.',
    date: '2026-03-31',
    category: 'POLICY',
    tags: ['policy', 'eu', 'dst'],
    readTime: 4,
    source: 'European Parliament',
  },
  {
    id: '009',
    title: 'Samoa Permanent Standard Time Law Takes Effect June 2026',
    excerpt:
      'Samoa joins Tonga and Tokelau in eliminating biannual shifts, citing agricultural productivity data and a University of Auckland study.',
    date: '2026-04-10',
    category: 'POLICY',
    tags: ['policy', 'pacific', 'dst'],
    readTime: 3,
  },
];
