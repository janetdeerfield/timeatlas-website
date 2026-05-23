import { ZONE_LIST } from '../../data/zones';
import { trackConversionClick } from '../../utils/analytics';

export function ConversionGrid() {
  return (
    <div className="space-y-5">
      {ZONE_LIST.map((zone) => {
        const destinations = ZONE_LIST.filter((z) => z.abbr !== zone.abbr);
        return (
          <div
            key={zone.abbr}
            className="rounded-xl border border-indigo-100 bg-indigo-50/40 px-4 py-4"
          >
            <p className="text-xs font-semibold text-indigo-500 uppercase tracking-wider mb-3">
              {zone.abbr} · {zone.city} →
            </p>
            <div className="flex flex-wrap gap-2">
              {destinations.map((dest) => (
                <a
                  key={dest.abbr}
                  href={`/${zone.slugPart}-to-${dest.slugPart}`}
                  onClick={() => trackConversionClick(zone.abbr, dest.abbr)}
                  className="inline-flex items-center rounded-full border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold text-slate-700 hover:border-indigo-300 hover:text-indigo-600 hover:bg-indigo-50 transition-colors shadow-sm"
                >
                  {zone.abbr} → {dest.abbr}
                </a>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}
