import type { MouseEventHandler } from 'react';
import { joinClasses } from './utils';

export interface RegionTab {
  id: string;
  label: string;
  href: string;
}

export interface RegionTabBarProps {
  regions: RegionTab[];
  activeRegion: string;
  onChange?: (region: RegionTab) => void;
  className?: string;
}

export function RegionTabBar({ regions, activeRegion, onChange, className }: RegionTabBarProps) {
  const handleClick =
    (region: RegionTab): MouseEventHandler<HTMLAnchorElement> =>
    (event) => {
      if (!onChange) return;

      event.preventDefault();
      onChange(region);
    };

  return (
    <nav className={joinClasses('overflow-x-auto', className)} aria-label="World clock regions">
      <div className="inline-flex min-w-full gap-2 rounded-full border border-border bg-muted/30 p-1">
        {regions.map((region) => {
          const active = region.id === activeRegion;

          return (
            <a
              key={region.id}
              href={region.href}
              aria-current={active ? 'page' : undefined}
              onClick={handleClick(region)}
              className={joinClasses(
                'whitespace-nowrap rounded-full px-4 py-2 font-[var(--font-display)] text-sm font-semibold no-underline transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background',
                active
                  ? 'bg-card text-card-foreground shadow-sm'
                  : 'text-muted-foreground hover:bg-card hover:text-card-foreground'
              )}
            >
              {region.label}
            </a>
          );
        })}
      </div>
    </nav>
  );
}
