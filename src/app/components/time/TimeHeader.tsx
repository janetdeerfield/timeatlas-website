import { useTime } from '../../hooks/useTime';
import type { ZoneInfo } from '../../data/zones';

interface TimeHeaderProps {
  fromZone: ZoneInfo;
  toZone: ZoneInfo;
  use24Hour?: boolean;
}

function dstLabel(offsetMinutes: number, standardUtcOffset: number): string {
  const standardMinutes = standardUtcOffset * 60;
  return offsetMinutes !== standardMinutes ? 'DST active' : 'Standard time';
}

function ZoneCard({
  zone,
  use24Hour,
  highlight,
}: {
  zone: ZoneInfo;
  use24Hour: boolean;
  highlight: boolean;
}) {
  const time = useTime({
    timeZone: zone.ianaTimezone,
    format: use24Hour ? '24h' : '12h',
    showSeconds: false,
  });

  const dst = dstLabel(time.offsetMinutes, zone.utcOffset);

  return (
    <div className="flex-1 min-w-0">
      <p
        className={`text-3xl sm:text-4xl font-bold tabular-nums mb-2 ${highlight ? 'text-[#1B6BB3]' : 'text-slate-900'}`}
        suppressHydrationWarning
      >
        {time.formattedTime}
      </p>
      <p className="text-sm font-medium text-slate-700 leading-snug" suppressHydrationWarning>
        {time.activeZoneName} ({time.activeAbbr})
      </p>
      <p className="text-sm text-slate-500 mt-0.5" suppressHydrationWarning>
        {time.formattedDate}
      </p>
      <p className="text-xs text-slate-400 mt-0.5" suppressHydrationWarning>
        {time.utcOffset} ({dst})
      </p>
    </div>
  );
}

export function TimeHeader({ fromZone, toZone, use24Hour = false }: TimeHeaderProps) {
  return (
    <div className="mb-8 rounded-2xl border border-slate-200 bg-gradient-to-br from-blue-50 via-white to-slate-50 p-6 sm:p-8 shadow-sm">
      <p className="text-sm font-semibold text-[#1B6BB3] uppercase tracking-widest mb-5">
        {fromZone.abbr} → {toZone.abbr}
      </p>

      <div className="flex items-start gap-3 sm:gap-6">
        <ZoneCard zone={fromZone} use24Hour={use24Hour} highlight={false} />
        <span className="text-xl font-semibold text-slate-400 pt-2 shrink-0">=</span>
        <ZoneCard zone={toZone} use24Hour={use24Hour} highlight={true} />
      </div>
    </div>
  );
}
