import { useId, useMemo, useState } from 'react';
import type { KeyboardEvent } from 'react';
import { CityZoneTile, type CityZoneTileProps } from './CityZoneTile';
import { joinClasses } from './utils';

export interface CitySearchCity extends Pick<
  CityZoneTileProps,
  'name' | 'country' | 'currentTime' | 'utcOffset' | 'tzAbbreviation' | 'href' | 'flag'
> {
  searchTerms?: string[];
}

export interface CitySearchInputProps {
  cities: CitySearchCity[];
  onSelect: (city: CitySearchCity) => void;
  placeholder?: string;
  label?: string;
  className?: string;
}

function cityMatches(city: CitySearchCity, query: string): boolean {
  const normalized = query.trim().toLowerCase();
  if (!normalized) return true;

  return [city.name, city.country, city.tzAbbreviation, ...(city.searchTerms ?? [])]
    .join(' ')
    .toLowerCase()
    .includes(normalized);
}

export function CitySearchInput({
  cities,
  onSelect,
  placeholder = 'Search cities or time zones',
  label = 'Search cities',
  className,
}: CitySearchInputProps) {
  const id = useId();
  const [query, setQuery] = useState('');
  const [open, setOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

  const results = useMemo(
    () => cities.filter((city) => cityMatches(city, query)).slice(0, 6),
    [cities, query]
  );
  const activeCity = results[activeIndex] ?? null;
  const listboxId = `${id}-listbox`;
  const activeDescendant = activeCity ? `${id}-option-${activeIndex}` : undefined;

  const selectCity = (city: CitySearchCity) => {
    onSelect(city);
    setQuery(city.name);
    setOpen(false);
    setActiveIndex(0);
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'ArrowDown') {
      event.preventDefault();
      setOpen(true);
      setActiveIndex((current) => (results.length === 0 ? 0 : (current + 1) % results.length));
      return;
    }

    if (event.key === 'ArrowUp') {
      event.preventDefault();
      setOpen(true);
      setActiveIndex((current) =>
        results.length === 0 ? 0 : (current - 1 + results.length) % results.length
      );
      return;
    }

    if (event.key === 'Enter' && open && activeCity) {
      event.preventDefault();
      selectCity(activeCity);
      return;
    }

    if (event.key === 'Escape') {
      event.preventDefault();
      setOpen(false);
    }
  };

  return (
    <div className={joinClasses('relative', className)}>
      <label
        htmlFor={id}
        className="mb-2 block font-[var(--font-display)] text-sm font-semibold text-card-foreground"
      >
        {label}
      </label>
      <input
        id={id}
        type="search"
        role="combobox"
        aria-expanded={open}
        aria-controls={listboxId}
        aria-activedescendant={open ? activeDescendant : undefined}
        aria-autocomplete="list"
        value={query}
        placeholder={placeholder}
        onFocus={() => setOpen(true)}
        onChange={(event) => {
          setQuery(event.target.value);
          setOpen(true);
          setActiveIndex(0);
        }}
        onKeyDown={handleKeyDown}
        className="w-full rounded-xl border border-border bg-card px-4 py-3 font-[var(--font-body)] text-sm text-card-foreground shadow-sm outline-none transition-colors placeholder:text-muted-foreground focus:border-accent focus:ring-2 focus:ring-ring"
      />

      {open && (
        <div
          id={listboxId}
          role="listbox"
          className="absolute z-20 mt-2 max-h-96 w-full overflow-auto rounded-xl border border-border bg-card p-2 shadow-lg"
        >
          {results.length > 0 ? (
            <div className="space-y-2">
              {results.map((city, index) => (
                <div
                  key={city.href}
                  id={`${id}-option-${index}`}
                  role="option"
                  aria-selected={index === activeIndex}
                  className={joinClasses(index === activeIndex && 'rounded-xl ring-2 ring-ring')}
                  onMouseEnter={() => setActiveIndex(index)}
                >
                  <CityZoneTile
                    {...city}
                    variant="compact"
                    onClick={() => {
                      selectCity(city);
                    }}
                  />
                </div>
              ))}
            </div>
          ) : (
            <p className="px-3 py-2 font-[var(--font-body)] text-sm text-muted-foreground">
              No matching cities found.
            </p>
          )}
        </div>
      )}
    </div>
  );
}
