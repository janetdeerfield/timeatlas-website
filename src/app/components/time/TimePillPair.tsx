import { TimePill } from './TimePill';
import type { ZoneInfo } from '../../data/zones';

interface TimePillPairProps {
  fromZone: ZoneInfo;
  toZone: ZoneInfo;
  use24Hour?: boolean;
}

/**
 * Two side-by-side TimePill cards connected by an arrow.
 * Stacks vertically on mobile.
 */
export function TimePillPair({ fromZone, toZone, use24Hour = false }: TimePillPairProps) {
  return (
    <div className="flex flex-col sm:flex-row items-stretch gap-3 sm:gap-4">
      <TimePill
        zoneAbbr={fromZone.abbr}
        city={fromZone.city}
        ianaTimezone={fromZone.ianaTimezone}
        use24Hour={use24Hour}
      />

      {/* Arrow separator */}
      <div className="flex items-center justify-center text-slate-400 font-semibold text-xl px-1 py-2 sm:py-0">
        →
      </div>

      <TimePill
        zoneAbbr={toZone.abbr}
        city={toZone.city}
        ianaTimezone={toZone.ianaTimezone}
        use24Hour={use24Hour}
      />
    </div>
  );
}
