import { joinClasses } from './utils';

export interface DstScheduleZone {
  code: string;
  name: string;
  short_name?: string;
  utc_offset_display?: string;
  observes_dst: boolean | 'partial';
  dst?: {
    summer_code?: string;
    summer_name?: string;
    summer_offset_display?: string;
    start_rule?: string;
    end_rule?: string;
    start_date_current_year?: string;
    end_date_current_year?: string;
    start_clock_change?: string;
    end_clock_change?: string;
    note?: string;
  };
}

export interface DstScheduleBlockProps {
  zones: [DstScheduleZone] | [DstScheduleZone, DstScheduleZone];
  currentYear: number;
  className?: string;
}

function formatDate(value?: string): string {
  if (!value) return 'Not scheduled';

  const [year, month, day] = value.split('-').map(Number);
  if (!year || !month || !day) return value;

  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  }).format(new Date(year, month - 1, day));
}

function observesDstLabel(observesDst: DstScheduleZone['observes_dst']): string {
  if (observesDst === true) return 'Observes DST';
  if (observesDst === 'partial') return 'Partial DST observance';
  return 'Does not observe DST';
}

function ZoneDstSummary({ zone }: { zone: DstScheduleZone }) {
  const observesDst = zone.observes_dst !== false;
  const displayName = zone.short_name ?? zone.name;

  return (
    <section className="rounded-lg border border-border bg-muted/30 p-4">
      <div className="mb-3 flex flex-wrap items-start justify-between gap-3">
        <div>
          <h3 className="font-[var(--font-display)] text-base font-semibold text-card-foreground">
            {zone.code} · {displayName}
          </h3>
          {zone.utc_offset_display && (
            <p className="font-[var(--font-body)] text-xs text-muted-foreground">
              Standard offset {zone.utc_offset_display}
            </p>
          )}
        </div>
        <span className="rounded-full border border-border bg-card px-3 py-1 font-[var(--font-display)] text-xs font-semibold text-card-foreground">
          {observesDstLabel(zone.observes_dst)}
        </span>
      </div>

      {observesDst ? (
        <dl className="grid gap-3 sm:grid-cols-2">
          <div>
            <dt className="font-[var(--font-display)] text-xs font-semibold uppercase tracking-wide text-muted-foreground">
              Starts
            </dt>
            <dd className="mt-1 font-[var(--font-body)] text-sm text-card-foreground">
              {formatDate(zone.dst?.start_date_current_year)}
              {zone.dst?.start_clock_change ? ` · ${zone.dst.start_clock_change}` : ''}
            </dd>
            {zone.dst?.start_rule && (
              <dd className="mt-1 font-[var(--font-body)] text-xs text-muted-foreground">
                {zone.dst.start_rule}
              </dd>
            )}
          </div>
          <div>
            <dt className="font-[var(--font-display)] text-xs font-semibold uppercase tracking-wide text-muted-foreground">
              Ends
            </dt>
            <dd className="mt-1 font-[var(--font-body)] text-sm text-card-foreground">
              {formatDate(zone.dst?.end_date_current_year)}
              {zone.dst?.end_clock_change ? ` · ${zone.dst.end_clock_change}` : ''}
            </dd>
            {zone.dst?.end_rule && (
              <dd className="mt-1 font-[var(--font-body)] text-xs text-muted-foreground">
                {zone.dst.end_rule}
              </dd>
            )}
          </div>
          {(zone.dst?.summer_code || zone.dst?.summer_offset_display) && (
            <div className="sm:col-span-2">
              <dt className="font-[var(--font-display)] text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                Daylight time
              </dt>
              <dd className="mt-1 font-[var(--font-body)] text-sm text-card-foreground">
                {[zone.dst.summer_code, zone.dst.summer_offset_display].filter(Boolean).join(' · ')}
              </dd>
            </div>
          )}
        </dl>
      ) : (
        <p className="font-[var(--font-body)] text-sm text-muted-foreground">
          {displayName} remains on a constant standard offset for the year.
        </p>
      )}

      {zone.dst?.note && (
        <p className="mt-3 font-[var(--font-body)] text-xs text-muted-foreground">{zone.dst.note}</p>
      )}
    </section>
  );
}

export function DstScheduleBlock({ zones, currentYear, className }: DstScheduleBlockProps) {
  return (
    <div className={joinClasses('rounded-xl border border-border bg-card p-5 shadow-sm', className)}>
      <div className="mb-4">
        <h2 className="font-[var(--font-display)] text-xl font-semibold text-card-foreground">
          DST schedule for {currentYear}
        </h2>
        <p className="mt-1 font-[var(--font-body)] text-sm text-muted-foreground">
          Current-year daylight saving start and end dates for the selected zone
          {zones.length === 2 ? 's' : ''}.
        </p>
      </div>
      <div className="grid gap-4 lg:grid-cols-2">
        {zones.map((zone) => (
          <ZoneDstSummary key={zone.code} zone={zone} />
        ))}
      </div>
    </div>
  );
}
