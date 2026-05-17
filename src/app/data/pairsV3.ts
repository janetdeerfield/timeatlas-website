import pairsData from '../../../data/pairs.json';
import { zoneSlugPart } from './zonesV3';

// ─── Schema types ─────────────────────────────────────────────────────────────

export type DstRelationship =
  | 'synchronized'
  | 'desynchronized'
  | 'asymmetric'
  | 'inverted'
  | 'neither';

export type MeetingDifficulty = 'easy' | 'moderate' | 'hard';

export interface MeetingOverlap {
  start_source: string;
  end_source: string;
  start_target: string;
  end_target: string;
  preferred_default: string;
  note?: string;
}

export interface FlightRoute {
  primary_route: string;
  average_flight_time_minutes: number;
  direct_flights_available: boolean;
  note?: string;
}

export interface PairV3 {
  source_code: string;
  target_code: string;
  dst_relationship: DstRelationship;
  sample_source_city: string;
  sample_target_city: string;
  meeting_overlap: MeetingOverlap;
  meeting_difficulty: MeetingDifficulty;
  notable_pairing: string;
  flight_route?: FlightRoute;
  common_use_cases: string[];
}

// ─── Data ─────────────────────────────────────────────────────────────────────

// Filter entries that have _variant-only keys (metadata rows without source_code)
export const ALL_PAIRS: PairV3[] = (pairsData.pairs as unknown as Array<Record<string, unknown>>)
  .filter((p) => typeof p.source_code === 'string' && typeof p.target_code === 'string')
  .map((p) => p as unknown as PairV3);

const PAIR_MAP = Object.fromEntries(
  ALL_PAIRS.map((p) => [`${p.source_code.toUpperCase()}:${p.target_code.toUpperCase()}`, p])
) as Record<string, PairV3>;

// ─── Public API ───────────────────────────────────────────────────────────────

export function getPairV3(sourceCode: string, targetCode: string): PairV3 | undefined {
  return PAIR_MAP[`${sourceCode.toUpperCase()}:${targetCode.toUpperCase()}`];
}

export function getPairsFromZone(sourceCode: string): PairV3[] {
  const key = sourceCode.toUpperCase();
  return ALL_PAIRS.filter((p) => p.source_code.toUpperCase() === key);
}

export function getPairsToZone(targetCode: string): PairV3[] {
  const key = targetCode.toUpperCase();
  return ALL_PAIRS.filter((p) => p.target_code.toUpperCase() === key);
}

/** "EST" + "PST" → "est-to-pst" */
export function pairSlug(sourceCode: string, targetCode: string): string {
  return `${zoneSlugPart(sourceCode)}-to-${zoneSlugPart(targetCode)}`;
}
