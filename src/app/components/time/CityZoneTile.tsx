import type { MouseEventHandler } from 'react';
import { ClientOnlyTime, DEFAULT_TIME_PLACEHOLDER } from './ClientOnlyTime';
import { joinClasses } from './utils';

export type CityZoneTileVariant = 'compact' | 'standard' | 'with-flag' | 'offset-only';

export interface CityZoneTileProps {
  name: string;
  country: string;
  currentTime: string;
  utcOffset: string;
  tzAbbreviation: string;
  href: string;
  flag?: string;
  onClick?: MouseEventHandler<HTMLAnchorElement>;
  variant?: CityZoneTileVariant;
  className?: string;
}

const baseClasses =
  'group flex w-full rounded-xl border border-border bg-card text-card-foreground no-underline shadow-sm transition-colors hover:border-accent hover:bg-muted/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background active:bg-muted';

const variantClasses: Record<CityZoneTileVariant, string> = {
  compact: 'items-center justify-between gap-3 px-4 py-3',
  standard: 'flex-col gap-4 p-5',
  'with-flag': 'items-start gap-4 p-5',
  'offset-only': 'items-center justify-between gap-4 px-4 py-3',
};

function buildAriaLabel({
  name,
  country,
  currentTime,
  mounted,
}: Pick<CityZoneTileProps, 'name' | 'country' | 'currentTime'> & { mounted: boolean }): string {
  const location = `${name}, ${country}`;

  return mounted ? `${location}, current time ${currentTime}` : `${location}, current time loading`;
}

export function CityZoneTile({
  name,
  country,
  currentTime,
  utcOffset,
  tzAbbreviation,
  href,
  flag,
  onClick,
  variant = 'standard',
  className,
}: CityZoneTileProps) {
  const renderTile = (mounted: boolean) => {
    const displayTime = mounted ? currentTime : DEFAULT_TIME_PLACEHOLDER;
    const showFlag = variant === 'with-flag' && flag;
    const isCompact = variant === 'compact';
    const isOffsetOnly = variant === 'offset-only';

    return (
      <a
        href={href}
        onClick={onClick}
        aria-label={buildAriaLabel({ name, country, currentTime, mounted })}
        className={joinClasses(baseClasses, variantClasses[variant], className)}
      >
        {showFlag && (
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-muted text-2xl">
            {flag}
          </span>
        )}

        <span className={joinClasses('min-w-0', !isCompact && !isOffsetOnly && 'flex-1')}>
          <span className="block truncate font-[var(--font-display)] text-sm font-semibold text-card-foreground">
            {name}
          </span>
          <span className="block truncate font-[var(--font-body)] text-xs text-muted-foreground">
            {country}
          </span>
        </span>

        {isOffsetOnly ? (
          <span className="ml-auto flex shrink-0 flex-col items-end gap-1 text-right">
            <span className="font-[var(--font-display)] text-base font-semibold tabular-nums text-card-foreground">
              {utcOffset}
            </span>
            <span className="font-[var(--font-body)] text-xs text-muted-foreground">
              {tzAbbreviation} · {displayTime}
            </span>
          </span>
        ) : (
          <span
            className={joinClasses(
              'flex shrink-0 flex-col gap-1',
              isCompact ? 'items-end text-right' : 'items-start'
            )}
          >
            <span className="font-[var(--font-display)] text-lg font-semibold tabular-nums text-card-foreground">
              {displayTime}
            </span>
            <span className="font-[var(--font-body)] text-xs text-muted-foreground">
              {tzAbbreviation} · {utcOffset}
            </span>
          </span>
        )}
      </a>
    );
  };

  return <ClientOnlyTime placeholder={renderTile(false)}>{renderTile}</ClientOnlyTime>;
}
