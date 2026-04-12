import { Volume2 } from 'lucide-react';
import { useTime } from '../hooks/useTime';
import { speakTime, getTimeForSpeech, getShortDateInTimezone } from '../utils/time';
import { useState, useEffect } from 'react';

interface CityCardProps {
  name: string;
  timezone: string;
  utcOffset: string;
  country?: string;
  use24Hour: boolean;
}

export function CityCard({ name, timezone, utcOffset, country, use24Hour }: CityCardProps) {
  const timeData = useTime({
    timeZone: timezone,
    format: use24Hour ? '24h' : '12h',
    showSeconds: true,
    showMilliseconds: false,
  });

  const [date, setDate] = useState('');

  useEffect(() => {
    const updateDate = () => {
      setDate(getShortDateInTimezone(timezone));
    };
    updateDate();
    const interval = setInterval(updateDate, 1000);
    return () => clearInterval(interval);
  }, [timezone]);

  const handleHearTime = () => {
    const speechText = getTimeForSpeech(timezone, use24Hour);
    speakTime(speechText);
  };

  return (
    <div
      className="p-5 bg-white rounded-xl transition-all"
      style={{
        border: '1px solid #E6E9EE',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = '#005EE9';
        e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 94, 233, 0.12)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = '#E6E9EE';
        e.currentTarget.style.boxShadow = 'none';
      }}
    >
      <div className="flex items-start justify-between mb-3">
        <div>
          <h3
            className="text-lg font-semibold"
            style={{
              fontFamily: 'Inter, sans-serif',
              color: '#080A0C',
            }}
          >
            {name}
          </h3>
          {country && (
            <p
              className="text-sm"
              style={{
                fontFamily: 'Open Sans, sans-serif',
                color: '#8495CB',
              }}
            >
              {country}
            </p>
          )}
        </div>
        <button
          onClick={handleHearTime}
          className="p-2 rounded-lg transition-colors"
          style={{
            backgroundColor: 'transparent',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = '#F0F9F3';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = 'transparent';
          }}
          title="Hear the time"
        >
          <Volume2 className="w-4 h-4" style={{ color: '#364151' }} />
        </button>
      </div>

      <div className="space-y-1">
        <div
          className="text-3xl font-bold tabular-nums whitespace-nowrap"
          style={{
            fontFamily: 'Inter, sans-serif',
            fontWeight: 800,
            color: '#080A0C',
          }}
        >
          {timeData.formattedTime}
        </div>
        <div
          className="text-sm"
          style={{
            fontFamily: 'Open Sans, sans-serif',
            color: '#364151',
          }}
        >
          {date}
        </div>
        <div
          className="text-xs"
          style={{
            fontFamily: 'Open Sans, sans-serif',
            color: '#6B7280',
          }}
        >
          {utcOffset}
        </div>
      </div>
    </div>
  );
}
