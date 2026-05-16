import zonesData from '../../../data/zones.json';

// ─── Schema types ─────────────────────────────────────────────────────────────

export interface DstScheduleV3 {
  summer_code?: string;
  summer_name?: string;
  summer_offset_minutes?: number;
  summer_offset_display?: string;
  start_rule?: string;
  end_rule?: string;
  start_date_current_year?: string;
  end_date_current_year?: string;
  start_clock_change?: string;
  end_clock_change?: string;
  note?: string;
}

export interface PrincipalCity {
  name: string;
  country: string;
  population: number;
  iana: string;
  is_capital?: boolean;
  is_financial_hub?: boolean;
  observes_dst?: boolean;
}

export interface NotableInstitution {
  name: string;
  abbreviation: string;
  city: string;
  category: string;
  trading_hours_local?: string;
}

export interface CountryEntry {
  name: string;
  population: number;
  observes_dst: boolean | 'partial';
  note?: string;
}

export interface ZoneV3 {
  code: string;
  name: string;
  short_name: string;
  category: string;
  utc_offset_minutes: number;
  utc_offset_display: string;
  observes_dst: boolean;
  dst?: DstScheduleV3;
  iana: { primary: string; all: string[] };
  military_code?: { name: string; letter: string };
  countries: CountryEntry[];
  principal_cities: PrincipalCity[];
  notable_institutions: NotableInstitution[];
  geography: { description: string; longitude_center: number };
  history: { adopted_year: number; note: string };
}

// ─── Data ─────────────────────────────────────────────────────────────────────

export const ZONES_V3: readonly ZoneV3[] = zonesData.zones as unknown as ZoneV3[];

export const CURRENT_YEAR: number = zonesData.current_year;

const ZONE_MAP_V3 = Object.fromEntries(
  ZONES_V3.map((z) => [z.code.toUpperCase(), z])
) as Record<string, ZoneV3>;

// ─── Public API ───────────────────────────────────────────────────────────────

export function getZoneV3(code: string): ZoneV3 | undefined {
  return ZONE_MAP_V3[code.toUpperCase()];
}

/** "EST" → "est", "AEDT" → "aedt" */
export function zoneSlugPart(code: string): string {
  return code.toLowerCase();
}
