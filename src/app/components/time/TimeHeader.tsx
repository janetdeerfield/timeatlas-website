import { useTime } from '../../hooks/useTime';
import type { ZoneInfo } from '../../data/zones';

interface TimeHeaderProps {
 fromZone: ZoneInfo;
 toZone: ZoneInfo;
 use24Hour?: boolean;
}

/**
 * Above-the-fold header that prominently displays:
 * FROM_ZONE → TO_ZONE
 * FROM_TIME = TO_TIME (live, updates every second)
 *
 * This is the "sacred" instant-answer section — visible without scrolling.
 */
export function TimeHeader({ fromZone, toZone, use24Hour = false }: TimeHeaderProps) {
 const fromTime = useTime({
 timeZone: fromZone.ianaTimezone,
 format: use24Hour ? '24h' : '12h',
 showSeconds: false,
 });

 const toTime = useTime({
 timeZone: toZone.ianaTimezone,
 format: use24Hour ? '24h' : '12h',
 showSeconds: false,
 });

 return (
 <div className="mb-8 rounded-2xl border border-slate-200 bg-gradient-to-br from-indigo-50 via-white to-slate-50 p-6 sm:p-8 shadow-sm">
 {/* Zone direction label */}
 <p className="text-sm font-semibold text-indigo-600 uppercase tracking-widest mb-3">
 {fromZone.abbr} → {toZone.abbr}
 </p>

 {/* Live conversion answer */}
 <div className="flex flex-wrap items-baseline gap-2 sm:gap-3">
 <span
 className="text-3xl sm:text-4xl font-bold text-slate-900 tabular-nums"
 suppressHydrationWarning
 >
 {fromTime.formattedTime}
 </span>
 <span className="text-xl font-semibold text-slate-400">=</span>
 <span
 className="text-3xl sm:text-4xl font-bold text-indigo-600 tabular-nums"
 suppressHydrationWarning
 >
 {toTime.formattedTime}
 </span>
 </div>

 {/* Subtitle */}
 <p className="mt-3 text-sm text-slate-500">
 Current time in {fromZone.city} converted to {toZone.city}
 </p>
 </div>
 );
}
