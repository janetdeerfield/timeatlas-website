import { useState } from 'react';
import { ZONE_LIST } from '../../data/zones';

/**
 * A single conversion link pill shown in the expanded state.
 */
function DestinationPill({ href, label }: { href: string; label: string }) {
  return (
    <a
      href={href}
      className="inline-flex items-center rounded-full border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold font-inter text-slate-700 hover:border-indigo-300 hover:text-indigo-600 hover:bg-indigo-50 transition-colors shadow-sm"
    >
      {label}
    </a>
  );
}

interface ExpandedDestinationsProps {
  sourceAbbr: string;
  sourceCity: string;
  sourceSlugPart: string;
}

/**
 * Expanded panel showing all 10 destination links for a given source zone.
 */
function ExpandedDestinations({
  sourceAbbr,
  sourceCity,
  sourceSlugPart,
}: ExpandedDestinationsProps) {
  const destinations = ZONE_LIST.filter((z) => z.abbr !== sourceAbbr);

  return (
    <div className="rounded-xl border border-indigo-100 bg-indigo-50/40 px-4 py-4">
      <p className="text-xs font-semibold font-inter text-indigo-500 uppercase tracking-wider mb-3">
        {sourceAbbr} · {sourceCity} → convert to:
      </p>
      <div className="flex flex-wrap gap-2">
        {destinations.map((dest) => (
          <DestinationPill
            key={dest.abbr}
            href={`/${sourceSlugPart}-to-${dest.slugPart}`}
            label={`${sourceAbbr} → ${dest.abbr}`}
          />
        ))}
      </div>
    </div>
  );
}

/**
 * Interactive navigation grid for "Common Time Conversions".
 *
 * - Shows 11 top-level mini pill buttons (not direct links) in a responsive flex-wrap layout.
 * - Clicking a source pill expands all 10 destination links for that source directly below it.
 * - Only one source can be expanded at a time.
 *
 * Zone abbreviations follow the TimeAtlas spec: ET, CT, MT, PT, AKT, HI (Hawaii), UTC, GMT,
 * IST, CET, JST. The "HI" label is used per spec; slugs use "ht" (matching city-pair routes).
 *
 * By rendering destinations only when expanded (conditional render), search engines see no
 * hidden links, keeping on-page outbound links within a focused range.
 */
export function ConversionGrid() {
  const [expandedAbbr, setExpandedAbbr] = useState<string | null>(null);

  const toggleZone = (abbr: string) => {
    setExpandedAbbr((prev) => (prev === abbr ? null : abbr));
  };

  const activeZone = ZONE_LIST.find((z) => z.abbr === expandedAbbr) ?? null;

  return (
    <div className="space-y-4">
      <p className="text-sm font-open-sans text-slate-500">
        Select a time zone to explore all conversions.
      </p>

      {/* Top-level source pills */}
      <div className="flex flex-wrap gap-2">
        {ZONE_LIST.map((zone) => {
          const isExpanded = expandedAbbr === zone.abbr;
          return (
            <button
              key={zone.abbr}
              onClick={() => toggleZone(zone.abbr)}
              aria-expanded={isExpanded}
              className={`rounded-full border px-3 py-1.5 text-xs font-semibold font-inter transition-colors cursor-pointer ${
                isExpanded
                  ? 'border-indigo-400 bg-indigo-600 text-white shadow'
                  : 'border-slate-200 bg-white text-slate-700 hover:border-indigo-300 hover:text-indigo-600 hover:bg-indigo-50'
              }`}
            >
              {zone.abbr}
            </button>
          );
        })}
      </div>

      {/* Expanded destination links — rendered only for the active source */}
      {activeZone !== null && (
        <ExpandedDestinations
          sourceAbbr={activeZone.abbr}
          sourceCity={activeZone.city}
          sourceSlugPart={activeZone.slugPart}
        />
      )}
    </div>
  );
}
