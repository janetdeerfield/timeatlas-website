import { useTime } from '../../hooks/useTime';

interface TimePillProps {
  /** Zone abbreviation shown as the label prefix, e.g. "EST" */
  zoneAbbr: string;
  /** City name shown after the dot, e.g. "New York" */
  city: string;
  /** IANA timezone identifier passed to useTime, e.g. "America/New_York" */
  ianaTimezone: string;
  /** Whether to show time in 24-hour format */
  use24Hour?: boolean;
}

/**
 * Pill card that displays ZONE · CITY and the live current time for that timezone.
 * Styled with rounded-full pill shape, subtle background, and generous padding.
 */
export function TimePill({ zoneAbbr, city, ianaTimezone, use24Hour = false }: TimePillProps) {
  const timeData = useTime({
    timeZone: ianaTimezone,
    format: use24Hour ? '24h' : '12h',
    showSeconds: false,
  });

  return (
    <div className="flex-1 min-w-0 rounded-2xl border border-slate-200 bg-slate-50 px-6 py-5 shadow-sm flex flex-col gap-2">
      <p className="text-sm font-semibold font-inter text-slate-500 tracking-wide uppercase">
        {zoneAbbr}
        <span className="mx-1 font-normal">·</span>
        {city}
      </p>
      <p
        className="text-4xl font-bold font-inter text-slate-900 tabular-nums leading-none"
        suppressHydrationWarning
      >
        {timeData.formattedTime}
      </p>
      <p className="text-xs font-open-sans text-slate-400" suppressHydrationWarning>
        {timeData.formattedDate}
      </p>
    </div>
  );
}
