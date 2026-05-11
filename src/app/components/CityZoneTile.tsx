import type { MouseEventHandler } from 'react';

type CityZoneTileVariant = 'compact' | 'standard' | 'with-flag' | 'offset-only';

interface CityZoneTileProps {
  name: string;
  country: string;
  currentTime: string;
  utcOffset: string;
  tzAbbreviation: string;
  href: string;
  variant?: CityZoneTileVariant;
  flag?: string;
  onClick?: MouseEventHandler<HTMLAnchorElement>;
}

export function CityZoneTile({
  name,
  country,
  currentTime,
  utcOffset,
  tzAbbreviation,
  href,
  variant = 'standard',
  flag,
  onClick,
}: CityZoneTileProps) {
  const isCompact = variant === 'compact';
  const isOffsetOnly = variant === 'offset-only';
  const isWithFlag = variant === 'with-flag';

  const baseClassName =
    'group block rounded-xl border transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-laser-blue)] focus-visible:ring-offset-2 active:scale-[0.99]';

  const sizeClassName = isCompact ? 'p-3' : 'p-4';

  return (
    <a
      href={href}
      onClick={onClick}
      aria-label={`${name}, ${country} — current time ${currentTime}`}
      className={`${baseClassName} ${sizeClassName}`}
      style={{
        backgroundColor: 'white',
        borderColor: 'var(--color-border-light)',
      }}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <p
            className={`font-semibold leading-tight ${isCompact ? 'text-sm' : 'text-base'}`}
            style={{ color: 'var(--color-onyx)' }}
          >
            {isWithFlag && flag ? `${flag} ` : ''}
            {name}
          </p>
          <p
            className={`truncate ${isCompact ? 'text-xs' : 'text-sm'}`}
            style={{ color: 'var(--color-charcoal-blue)' }}
          >
            {country}
          </p>
        </div>

        <div className="text-right shrink-0">
          {!isOffsetOnly ? (
            <p
              className={`font-mono font-semibold ${isCompact ? 'text-sm' : 'text-base'}`}
              style={{ color: 'var(--color-onyx)' }}
            >
              {currentTime}
            </p>
          ) : null}
          <p
            className={`${isCompact ? 'text-xs' : 'text-sm'} ${isOffsetOnly ? 'font-semibold' : ''}`}
            style={{ color: 'var(--color-wisteria-blue)' }}
          >
            {tzAbbreviation} ({utcOffset})
          </p>
        </div>
      </div>
    </a>
  );
}
