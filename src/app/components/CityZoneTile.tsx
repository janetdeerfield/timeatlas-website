import { type MouseEvent } from 'react';
import { ClientOnlyTime } from './ClientOnlyTime';

type CityZoneTileVariant = 'compact' | 'standard' | 'with-flag' | 'offset-only';

interface CityZoneTileProps {
  name: string;
  country: string;
  currentTime: string;
  utcOffset: string;
  tzAbbreviation: string;
  href: string;
  flag?: string;
  variant?: CityZoneTileVariant;
  onClick?: (e: MouseEvent<HTMLAnchorElement>) => void;
}

export function CityZoneTile({
  name,
  country,
  currentTime,
  utcOffset,
  tzAbbreviation,
  href,
  flag,
  variant = 'standard',
  onClick,
}: CityZoneTileProps) {
  const ariaLabel = `${name}, ${country} – ${currentTime || 'loading'}`;

  if (variant === 'compact') {
    return (
      <a
        href={href}
        onClick={onClick}
        aria-label={ariaLabel}
        className="flex items-center justify-between px-4 py-3 rounded-lg transition-colors"
        style={{
          backgroundColor: '#FFFFFF',
          border: '1px solid var(--color-border-light)',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.borderColor = 'var(--color-laser-blue)';
          e.currentTarget.style.backgroundColor = '#F8FAFF';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.borderColor = 'var(--color-border-light)';
          e.currentTarget.style.backgroundColor = '#FFFFFF';
        }}
      >
        <div className="flex items-center gap-2">
          {flag && <span aria-hidden="true">{flag}</span>}
          <span
            className="font-semibold text-sm"
            style={{ fontFamily: 'var(--font-display)', color: 'var(--color-onyx)' }}
          >
            {name}
          </span>
          <span
            className="text-xs"
            style={{ fontFamily: 'var(--font-body)', color: 'var(--color-charcoal-blue)' }}
          >
            {tzAbbreviation}
          </span>
        </div>
        <ClientOnlyTime>
          {() => (
            <span
              className="font-bold text-sm tabular-nums"
              style={{ fontFamily: 'var(--font-display)', color: 'var(--color-onyx)' }}
            >
              {currentTime}
            </span>
          )}
        </ClientOnlyTime>
      </a>
    );
  }

  if (variant === 'offset-only') {
    return (
      <a
        href={href}
        onClick={onClick}
        aria-label={ariaLabel}
        className="flex items-center justify-between px-4 py-3 rounded-lg transition-colors"
        style={{
          backgroundColor: '#FFFFFF',
          border: '1px solid var(--color-border-light)',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.borderColor = 'var(--color-laser-blue)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.borderColor = 'var(--color-border-light)';
        }}
      >
        <span
          className="font-semibold text-sm"
          style={{ fontFamily: 'var(--font-display)', color: 'var(--color-onyx)' }}
        >
          {name}
        </span>
        <span
          className="text-xs"
          style={{ fontFamily: 'var(--font-body)', color: 'var(--color-charcoal-blue)' }}
        >
          {utcOffset}
        </span>
      </a>
    );
  }

  // 'standard' and 'with-flag' share the same card layout
  return (
    <a
      href={href}
      onClick={onClick}
      aria-label={ariaLabel}
      className="block p-5 rounded-xl transition-all"
      style={{
        backgroundColor: '#FFFFFF',
        border: '1px solid var(--color-border-light)',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = 'var(--color-laser-blue)';
        e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 94, 233, 0.12)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = 'var(--color-border-light)';
        e.currentTarget.style.boxShadow = 'none';
      }}
    >
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-2">
          {(variant === 'with-flag' && flag) && (
            <span className="text-2xl" aria-hidden="true">
              {flag}
            </span>
          )}
          <div>
            <h3
              className="text-lg font-semibold"
              style={{ fontFamily: 'var(--font-display)', color: 'var(--color-onyx)' }}
            >
              {name}
            </h3>
            <p
              className="text-sm"
              style={{ fontFamily: 'var(--font-body)', color: 'var(--color-wisteria-blue)' }}
            >
              {country}
            </p>
          </div>
        </div>
      </div>
      <div className="space-y-1">
        <ClientOnlyTime>
          {() => (
            <div
              className="text-3xl font-bold tabular-nums whitespace-nowrap"
              style={{
                fontFamily: 'var(--font-display)',
                fontWeight: 800,
                color: 'var(--color-onyx)',
              }}
            >
              {currentTime}
            </div>
          )}
        </ClientOnlyTime>
        <div
          className="text-xs"
          style={{ fontFamily: 'var(--font-body)', color: 'var(--color-charcoal-blue)' }}
        >
          {tzAbbreviation} · {utcOffset}
        </div>
      </div>
    </a>
  );
}
