import fs from 'node:fs';
import path from 'node:path';

type JsonObject = Record<string, unknown>;

const EXPECTED_CODES = [
  'EST',
  'CST',
  'MST',
  'PST',
  'AKST',
  'HST',
  'UTC',
  'GMT',
  'CET',
  'IST',
  'JST',
  'AEST',
  'AEDT',
  'ACST',
  'AWST',
  'NZST',
  'NZDT',
  'SGT',
  'HKT',
  'KST',
  'BRT',
  'ART',
  'CLT',
  'COT',
  'GST',
];

const OBSERVES_DST_VALUES = new Set([true, false, 'partial']);
const CATEGORY_VALUES = new Set(['civil_zone', 'reference_standard']);
const DST_KEYS = new Set([
  'summer_code',
  'summer_name',
  'summer_offset_minutes',
  'summer_offset_display',
  'start_rule',
  'end_rule',
  'start_date_current_year',
  'end_date_current_year',
  'start_clock_change',
  'end_clock_change',
  'note',
]);

const REQUIRED_EDGE_CASES = [
  { code: 'CST', pattern: /abolished DST in 2022|Abolished DST in 2022/i },
  { code: 'MST', pattern: /Arizona/i },
  { code: 'PST', pattern: /Yukon/i },
  { code: 'IST', pattern: /Sri Lanka/i },
  { code: 'IST', pattern: /30-minute|half-hour/i },
  { code: 'ACST', pattern: /half-hour/i },
];

const errors: string[] = [];

function fail(message: string) {
  errors.push(message);
}

function isObject(value: unknown): value is JsonObject {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

function requireObject(parent: JsonObject, key: string, context: string): JsonObject | null {
  const value = parent[key];
  if (!isObject(value)) {
    fail(`${context}.${key} must be an object`);
    return null;
  }
  return value;
}

function requireArray(parent: JsonObject, key: string, context: string): unknown[] {
  const value = parent[key];
  if (!Array.isArray(value)) {
    fail(`${context}.${key} must be an array`);
    return [];
  }
  return value;
}

function requireString(parent: JsonObject, key: string, context: string) {
  if (typeof parent[key] !== 'string' || parent[key] === '') {
    fail(`${context}.${key} must be a non-empty string`);
  }
}

function requireNumber(parent: JsonObject, key: string, context: string, nullable = false) {
  if (nullable && parent[key] === null) return;
  if (typeof parent[key] !== 'number' || Number.isNaN(parent[key])) {
    fail(`${context}.${key} must be a number${nullable ? ' or null' : ''}`);
  }
}

function requireBoolean(parent: JsonObject, key: string, context: string, optional = false) {
  if (optional && parent[key] === undefined) return;
  if (typeof parent[key] !== 'boolean') {
    fail(`${context}.${key} must be a boolean`);
  }
}

function validateOffsetDisplay(minutes: number, display: string, context: string) {
  const sign = minutes < 0 ? '−' : '+';
  const abs = Math.abs(minutes);
  const hours = Math.floor(abs / 60);
  const mins = abs % 60;
  const expected = `${sign}${String(hours).padStart(2, '0')}:${String(mins).padStart(2, '0')}`;
  if (display !== expected) {
    fail(`${context}.utc_offset_display must be ${expected}; received ${display}`);
  }
}

function isIsoDate(value: unknown, year: number): value is string {
  return typeof value === 'string' && new RegExp(`^${year}-\\d{2}-\\d{2}$`).test(value);
}

function offsetMinutes(timeZone: string, date: Date): number {
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
  const parts = Object.fromEntries(
    formatter.formatToParts(date).map((part) => [part.type, part.value])
  );
  const asUtc = Date.UTC(
    Number(parts.year),
    Number(parts.month) - 1,
    Number(parts.day),
    Number(parts.hour),
    Number(parts.minute),
    Number(parts.second)
  );
  return Math.round((asUtc - date.getTime()) / 60000);
}

function transitionDates(timeZone: string, year: number): string[] {
  let previous = offsetMinutes(timeZone, new Date(Date.UTC(year, 0, 1, 0, 0, 0)));
  const dates: string[] = [];

  for (
    let timestamp = Date.UTC(year, 0, 1);
    timestamp < Date.UTC(year + 1, 0, 1);
    timestamp += 60 * 60 * 1000
  ) {
    const date = new Date(timestamp);
    const current = offsetMinutes(timeZone, date);
    if (current !== previous) {
      const localParts = new Intl.DateTimeFormat('en-CA', {
        timeZone,
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
      }).formatToParts(date);
      const map = Object.fromEntries(localParts.map((part) => [part.type, part.value]));
      dates.push(`${map.year}-${map.month}-${map.day}`);
      previous = current;
    }
  }

  return [...new Set(dates)];
}

function validateCountries(countries: unknown[], context: string) {
  countries.forEach((country, index) => {
    const itemContext = `${context}.countries[${index}]`;
    if (!isObject(country)) {
      fail(`${itemContext} must be an object`);
      return;
    }
    requireString(country, 'name', itemContext);
    requireNumber(country, 'population', itemContext, true);
    if (!OBSERVES_DST_VALUES.has(country.observes_dst as never)) {
      fail(`${itemContext}.observes_dst must be boolean or "partial"`);
    }
    if (country.note !== undefined && typeof country.note !== 'string') {
      fail(`${itemContext}.note must be a string when present`);
    }
  });
}

function validateCities(cities: unknown[], context: string) {
  if (cities.length < 5 || cities.length > 7) {
    fail(`${context}.principal_cities must contain 5-7 cities; received ${cities.length}`);
  }
  cities.forEach((city, index) => {
    const itemContext = `${context}.principal_cities[${index}]`;
    if (!isObject(city)) {
      fail(`${itemContext} must be an object`);
      return;
    }
    requireString(city, 'name', itemContext);
    requireString(city, 'country', itemContext);
    requireNumber(city, 'population', itemContext);
    requireString(city, 'iana', itemContext);
    requireBoolean(city, 'is_capital', itemContext, true);
    requireBoolean(city, 'is_financial_hub', itemContext, true);
    requireBoolean(city, 'observes_dst', itemContext, true);
  });
}

function validateInstitutions(institutions: unknown[], context: string) {
  if (institutions.length < 3 || institutions.length > 4) {
    fail(
      `${context}.notable_institutions must contain 3-4 institutions; received ${institutions.length}`
    );
  }
  institutions.forEach((institution, index) => {
    const itemContext = `${context}.notable_institutions[${index}]`;
    if (!isObject(institution)) {
      fail(`${itemContext} must be an object`);
      return;
    }
    requireString(institution, 'name', itemContext);
    requireString(institution, 'city', itemContext);
    requireString(institution, 'category', itemContext);
    if (institution.abbreviation !== undefined && typeof institution.abbreviation !== 'string') {
      fail(`${itemContext}.abbreviation must be a string when present`);
    }
    if (
      institution.trading_hours_local !== undefined &&
      typeof institution.trading_hours_local !== 'string'
    ) {
      fail(`${itemContext}.trading_hours_local must be a string when present`);
    }
  });
}

function validateZone(zone: unknown, index: number, currentYear: number) {
  const context = `zones[${index}]`;
  if (!isObject(zone)) {
    fail(`${context} must be an object`);
    return;
  }

  const code = String(zone.code);
  for (const key of ['code', 'name', 'short_name', 'utc_offset_display']) {
    requireString(zone, key, context);
  }
  requireNumber(zone, 'utc_offset_minutes', context);
  if (!CATEGORY_VALUES.has(zone.category as string)) {
    fail(`${context}.category must be "civil_zone" or "reference_standard"`);
  }
  if (!OBSERVES_DST_VALUES.has(zone.observes_dst as never)) {
    fail(`${context}.observes_dst must be boolean or "partial"`);
  }
  if (typeof zone.utc_offset_minutes === 'number' && typeof zone.utc_offset_display === 'string') {
    validateOffsetDisplay(zone.utc_offset_minutes, zone.utc_offset_display, context);
  }

  const dst = requireObject(zone, 'dst', context);
  if (dst) {
    for (const key of Object.keys(dst)) {
      if (!DST_KEYS.has(key)) {
        fail(`${context}.dst.${key} is not part of the Section 3 schema`);
      }
    }
    if (zone.observes_dst !== false) {
      for (const key of [
        'summer_code',
        'summer_name',
        'summer_offset_minutes',
        'summer_offset_display',
        'start_rule',
        'end_rule',
        'start_date_current_year',
        'end_date_current_year',
        'start_clock_change',
        'end_clock_change',
      ]) {
        if (dst[key] === undefined)
          fail(`${context}.dst.${key} is required when observes_dst is true/partial`);
      }
      if (!isIsoDate(dst.start_date_current_year, currentYear)) {
        fail(`${context}.dst.start_date_current_year must be an ISO date in ${currentYear}`);
      }
      if (!isIsoDate(dst.end_date_current_year, currentYear)) {
        fail(`${context}.dst.end_date_current_year must be an ISO date in ${currentYear}`);
      }
    }
  }

  const iana = requireObject(zone, 'iana', context);
  if (iana) {
    requireString(iana, 'primary', `${context}.iana`);
    const all = requireArray(iana, 'all', `${context}.iana`);
    if (typeof iana.primary === 'string' && !all.includes(iana.primary)) {
      fail(`${context}.iana.all must include iana.primary`);
    }
    if (typeof iana.primary === 'string') {
      try {
        new Intl.DateTimeFormat('en-US', { timeZone: iana.primary }).format(
          new Date('2026-01-01T00:00:00Z')
        );
      } catch {
        fail(`${context}.iana.primary is not recognized by Intl/IANA: ${iana.primary}`);
      }
    }
  }

  const military = requireObject(zone, 'military_code', context);
  if (military) {
    if (military.name !== null && typeof military.name !== 'string') {
      fail(`${context}.military_code.name must be string or null`);
    }
    if (military.letter !== null && typeof military.letter !== 'string') {
      fail(`${context}.military_code.letter must be string or null`);
    }
    if (military.note !== undefined && typeof military.note !== 'string') {
      fail(`${context}.military_code.note must be a string when present`);
    }
    if (
      typeof zone.utc_offset_minutes === 'number' &&
      zone.utc_offset_minutes % 60 !== 0 &&
      military.letter !== null
    ) {
      fail(`${context}.military_code.letter must be null for half-hour offset zones`);
    }
  }

  const countries = requireArray(zone, 'countries', context);
  validateCountries(countries, context);
  validateCities(requireArray(zone, 'principal_cities', context), context);
  validateInstitutions(requireArray(zone, 'notable_institutions', context), context);

  const geography = requireObject(zone, 'geography', context);
  if (geography) {
    requireString(geography, 'description', `${context}.geography`);
    requireNumber(geography, 'longitude_center', `${context}.geography`);
  }
  const history = requireObject(zone, 'history', context);
  if (history) {
    requireNumber(history, 'adopted_year', `${context}.history`);
    requireString(history, 'note', `${context}.history`);
  }

  if (zone.observes_dst !== false && iana && typeof iana.primary === 'string' && dst) {
    const transitions = transitionDates(iana.primary, currentYear);
    const start = String(dst.start_date_current_year);
    const end = String(dst.end_date_current_year);
    if (!transitions.includes(start)) {
      fail(
        `${context}.dst.start_date_current_year (${start}) does not match Intl/IANA transition dates for ${iana.primary}: ${transitions.join(', ')}`
      );
    }
    if (!transitions.includes(end)) {
      fail(
        `${context}.dst.end_date_current_year (${end}) does not match Intl/IANA transition dates for ${iana.primary}: ${transitions.join(', ')}`
      );
    }
  }

  if (zone.observes_dst === false && iana && typeof iana.primary === 'string') {
    const transitions = transitionDates(iana.primary, currentYear);
    if (transitions.length > 0) {
      fail(
        `${context}.observes_dst is false but ${iana.primary} has ${currentYear} offset transitions: ${transitions.join(', ')}`
      );
    }
  }
}

const filePath = path.resolve('data/zones.json');
const data = JSON.parse(fs.readFileSync(filePath, 'utf8')) as JsonObject;

if (data.schema_version !== '1.0') fail('schema_version must be "1.0"');
if (data.current_year !== 2026) fail('current_year must be 2026');
if (typeof data.last_updated !== 'string') fail('last_updated must be a string');

const zones = requireArray(data, 'zones', 'root');
if (zones.length !== EXPECTED_CODES.length) {
  fail(`zones must contain ${EXPECTED_CODES.length} records; received ${zones.length}`);
}

const codes = zones.map((zone) => (isObject(zone) ? zone.code : undefined));
const uniqueCodes = new Set(codes);
for (const code of EXPECTED_CODES) {
  if (!uniqueCodes.has(code)) fail(`missing required zone code ${code}`);
}
for (const code of codes) {
  if (typeof code !== 'string' || !EXPECTED_CODES.includes(code)) {
    fail(`unexpected zone code ${String(code)}`);
  }
}
if (uniqueCodes.size !== zones.length) fail('zone codes must be unique');

zones.forEach((zone, index) => validateZone(zone, index, Number(data.current_year)));

const serialized = JSON.stringify(data);
for (const edgeCase of REQUIRED_EDGE_CASES) {
  const zone = zones.find((item) => isObject(item) && item.code === edgeCase.code);
  if (!zone || !edgeCase.pattern.test(JSON.stringify(zone))) {
    fail(`${edgeCase.code} must document required edge case: ${edgeCase.pattern}`);
  }
}
if (!/IANA tz database/i.test(serialized)) {
  fail(
    'zones.json notes should document that DST dates were checked against IANA tz database behavior'
  );
}

if (errors.length > 0) {
  console.error(`data/zones.json validation failed with ${errors.length} error(s):`);
  for (const error of errors) {
    console.error(`- ${error}`);
  }
  process.exit(1);
}

console.log(
  `data/zones.json validation passed: ${zones.length} zones, ${EXPECTED_CODES.length} expected codes.`
);
