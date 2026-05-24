import { useEffect, useRef, useState } from 'react';
import LiveClock from './LiveClock';
import { getUserTimezone, getUserCity, majorCities } from '../utils/time';

interface ClockHeroProps {
  use24Hour: boolean;
}

const STORAGE_KEY = 'ta_hero_location';
const DEFAULT_TIMEZONE = 'America/New_York';
const DEFAULT_CITY = 'New York, USA';

type HeroLocation = { timezone: string; city: string };

function readStored(): HeroLocation | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as HeroLocation) : null;
  } catch {
    return null;
  }
}

function detectLocation(): HeroLocation {
  return { timezone: getUserTimezone(), city: getUserCity() };
}

function saveLocation(loc: HeroLocation): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(loc));
  } catch {}
}

// getInitialLocation runs during useState() initialisation — once per mount.
//
// SSR / prerender:  document is undefined → return New York so the prerendered
//                   HTML is stable and matches the client's first render.
//
// Returning visitor: localStorage has a saved location → use it immediately so
//                   there is no flash of "New York" before the effect fires.
//
// First-time visitor on prerendered page: data-prerendered is true and storage
//                   is empty → return New York for hydration consistency; the
//                   useEffect below detects and saves the real timezone.
//
// Dev server (non-prerendered): no data-prerendered → use detected timezone
//                   straight away.
function getInitialLocation(): HeroLocation {
  if (typeof document === 'undefined') {
    return { timezone: DEFAULT_TIMEZONE, city: DEFAULT_CITY };
  }
  // Returning visitor — no flash, no detection needed
  const stored = readStored();
  if (stored) return stored;
  // Prerendered page, first visit — match server HTML to avoid hydration warning
  if (document.documentElement.dataset.prerendered === 'true') {
    return { timezone: DEFAULT_TIMEZONE, city: DEFAULT_CITY };
  }
  // Dev server — show real timezone immediately
  return detectLocation();
}

export function ClockHero({ use24Hour }: ClockHeroProps) {
  const [location, setLocation] = useState<HeroLocation>(getInitialLocation);
  const [picking, setPicking] = useState(false);
  const selectRef = useRef<HTMLSelectElement>(null);

  useEffect(() => {
    // For prerendered pages on first visit: detect now and save so the next
    // page load skips the New York flash entirely.
    const stored = readStored();
    if (stored) {
      // Already initialised correctly by getInitialLocation — just keep it.
      setLocation(stored);
    } else {
      const detected = detectLocation();
      setLocation(detected);
      saveLocation(detected);
    }
  }, []);

  // Auto-focus the select when it opens so keyboard users can navigate immediately
  useEffect(() => {
    if (picking) selectRef.current?.focus();
  }, [picking]);

  function handleCityChange(e: React.ChangeEvent<HTMLSelectElement>) {
    const value = e.target.value;
    if (!value) return;

    let loc: HeroLocation;
    if (value === '__auto__') {
      loc = detectLocation();
    } else {
      const cityData = majorCities.find((c) => c.timezone === value);
      if (!cityData) return;
      loc = {
        timezone: cityData.timezone,
        city: `${cityData.name}${cityData.country ? `, ${cityData.country}` : ''}`,
      };
    }

    setLocation(loc);
    saveLocation(loc);
    setPicking(false);
  }

  const { timezone, city } = location;

  return (
    <div className="py-12 sm:py-16 px-4" style={{ paddingBottom: 'clamp(1.5rem, 4vw, 2rem)' }}>
      {/* LiveClock shows live, ticking time. On the very first visit the server-
          prerendered "New York" snapshot is briefly visible until the useEffect
          above fires (typically < 50 ms). suppressHydrationWarning silences
          React's mismatch warning for this intentionally dynamic subtree. */}
      <div suppressHydrationWarning>
        <LiveClock
          city={city}
          timeZone={timezone}
          format={use24Hour ? '24h' : '12h'}
          showSeconds={true}
          showMilliseconds={false}
          showDate={true}
          showTimeZoneName={true}
          showUtcOffset={true}
          compact={false}
        />
      </div>

      {/* Change-city affordance ──────────────────────────────────────────────── */}
      <div className="text-center mt-2">
        {picking ? (
          <select
            ref={selectRef}
            onChange={handleCityChange}
            onBlur={() => setPicking(false)}
            defaultValue=""
            aria-label="Select your city"
            className="text-sm rounded-md border border-slate-300 px-2 py-1 bg-white text-slate-700 cursor-pointer"
          >
            <option value="" disabled>
              Select your city…
            </option>
            <option value="__auto__">⟳ Auto-detect my location</option>
            {majorCities.map((c) => (
              <option key={c.timezone} value={c.timezone}>
                {c.name}
                {c.country ? `, ${c.country}` : ''}
              </option>
            ))}
          </select>
        ) : (
          <button
            onClick={() => setPicking(true)}
            className="text-xs hover:underline transition-colors"
            style={{ color: '#64748B' }}
          >
            Not your city? Change →
          </button>
        )}
      </div>

      {/* Authority line */}
      <p
        className="text-center px-4"
        style={{
          fontSize: '14px',
          color: '#64748B',
          maxWidth: '900px',
          margin: '12px auto 0',
        }}
      >
        Accurate local time, powered by the official IANA time zone database. Compare time zones,
        plan meetings, and coordinate across the world — with TimeAtlas.
      </p>
    </div>
  );
}
