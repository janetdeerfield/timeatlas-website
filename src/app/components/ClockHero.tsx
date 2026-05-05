import { useEffect, useState } from 'react';
import { Volume2 } from 'lucide-react';
import LiveClock from './LiveClock';
import { getUserTimezone, getUserCity, speakTime, getTimeForSpeech } from '../utils/time';

interface ClockHeroProps {
  use24Hour: boolean;
}

const DEFAULT_TIMEZONE = 'America/New_York';
const DEFAULT_CITY = 'New York, USA';

function getInitialLocation() {
  if (typeof document === 'undefined' || document.documentElement.dataset.prerendered === 'true') {
    return { timezone: DEFAULT_TIMEZONE, city: DEFAULT_CITY };
  }

  return { timezone: getUserTimezone(), city: getUserCity() };
}

export function ClockHero({ use24Hour }: ClockHeroProps) {
  const [location, setLocation] = useState(getInitialLocation);

  useEffect(() => {
    setLocation({ timezone: getUserTimezone(), city: getUserCity() });
  }, []);

  const { timezone, city } = location;

  const handleHearTime = () => {
    const speechText = getTimeForSpeech(timezone, use24Hour);
    speakTime(speechText);
  };

  return (
    <div className="py-12 sm:py-16 px-4" style={{ paddingBottom: 'clamp(1.5rem, 4vw, 2rem)' }}>
      {/* LiveClock Component */}
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

      {/* Authority Line */}
      <p
        className="text-center mt-4 px-4"
        style={{
          fontFamily: 'Open Sans, sans-serif',
          fontSize: '14px',
          color: '#9AA3AF',
          maxWidth: '900px',
          margin: '16px auto 0',
        }}
      >
        Accurate local time, powered by the official IANA time zone database. Compare time zones,
        plan meetings, and coordinate across the world — with TimeAtlas.
      </p>

      {/* Action Buttons */}
      <div className="flex flex-wrap items-center justify-center gap-4 mt-6 sm:mt-8">
        <button
          onClick={handleHearTime}
          className="px-6 py-3 rounded-full font-semibold transition-all shadow-sm hover:shadow-md flex items-center gap-2"
          style={{
            fontFamily: 'Inter, sans-serif',
            backgroundColor: '#0A84D0',
            color: 'white',
          }}
        >
          <Volume2 className="w-5 h-5" />
          Hear the Time
        </button>
      </div>
    </div>
  );
}
