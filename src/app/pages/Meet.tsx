import { useState, useEffect } from 'react';
import { Users, Clock, Copy, Check } from 'lucide-react';
import { Footer } from '../components/Footer';
import { SEO } from '../components/SEO';
import { majorCities, getCurrentTimeInTimezone, getTimezoneDisplayWithDST } from '../utils/time';
import { copyToClipboard } from '../utils/format';

interface MeetProps {
  use24Hour: boolean;
}

interface MeetingTime {
  city: string;
  timezone: string;
  time: string;
  hour: number;
  isWorkHours: boolean;
  zone: 'best' | 'acceptable' | 'avoid';
  timezoneAbbrev: string;
  timezoneDisplay: string;
}

export function Meet({ use24Hour }: MeetProps) {
  const [selectedCities, setSelectedCities] = useState([
    majorCities[5], // New York
    majorCities[7], // London
    majorCities[9], // Berlin
  ]);
  const [meetingTimes, setMeetingTimes] = useState<MeetingTime[]>([]);
  const [selectedHour, setSelectedHour] = useState(9); // 9 AM in first city
  const [copied, setCopied] = useState(false);

  const getTimeZone = (hour: number): 'best' | 'acceptable' | 'avoid' => {
    if (hour >= 9 && hour < 17) return 'best'; // 9 AM - 5 PM
    if ((hour >= 6 && hour < 9) || (hour >= 17 && hour < 21)) return 'acceptable'; // 6-9 AM or 5-9 PM
    return 'avoid'; // 9 PM - 6 AM
  };

  const updateMeetingTimes = () => {
    const times = selectedCities.map((city) => {
      const now = new Date();
      const baseTime = new Date(
        now.toLocaleString('en-US', { timeZone: selectedCities[0].timezone })
      );
      baseTime.setHours(selectedHour, 0, 0, 0);

      const localTime = new Date(baseTime.toLocaleString('en-US', { timeZone: city.timezone }));
      const hour = localTime.getHours();
      const isWorkHours = hour >= 9 && hour < 17;
      const zone = getTimeZone(hour);

      // Format time based on 12h/24h toggle
      let displayTime: string;
      if (use24Hour) {
        displayTime = `${hour.toString().padStart(2, '0')}:00`;
      } else {
        const displayHour = hour === 0 ? 12 : hour > 12 ? hour - 12 : hour;
        const period = hour >= 12 ? 'PM' : 'AM';
        displayTime = `${displayHour}:00 ${period}`;
      }

      return {
        city: city.name,
        timezone: city.timezone,
        time: displayTime,
        hour,
        isWorkHours,
        zone,
        timezoneAbbrev: city.timezoneAbbrev || '',
        timezoneDisplay: getTimezoneDisplayWithDST(city),
      };
    });

    setMeetingTimes(times);
  };

  const handleCopy = async () => {
    const copyText = meetingTimes
      .map(
        (time) =>
          `${time.city} — ${time.time} (${selectedCities.find((c) => c.name === time.city)?.timezoneAbbrev || ''})`
      )
      .join('\n');

    try {
      await copyToClipboard(copyText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  // Auto-update meeting times when cities, hour, or use24Hour changes
  useEffect(() => {
    updateMeetingTimes();
  }, [selectedCities, selectedHour, use24Hour]);

  const handleCityChange = (index: number, cityName: string) => {
    const city = majorCities.find((c) => c.name === cityName);
    if (city) {
      const newCities = [...selectedCities];
      newCities[index] = city;
      setSelectedCities(newCities);
    }
  };

  const addCity = () => {
    if (selectedCities.length < 5) {
      const availableCity = majorCities.find(
        (c) => !selectedCities.some((sc) => sc.name === c.name)
      );
      if (availableCity) {
        setSelectedCities([...selectedCities, availableCity]);
      }
    }
  };

  const removeCity = (index: number) => {
    if (selectedCities.length > 2) {
      setSelectedCities(selectedCities.filter((_, i) => i !== index));
    }
  };

  const allInWorkHours = meetingTimes.every((t) => t.isWorkHours);

  return (
    <div className="min-h-screen flex flex-col" style={{ backgroundColor: '#F2EFEA' }}>
      <SEO
        title="Meeting Planner – Find Best Time Across Time Zones | TimeAtlas"
        description="Schedule global meetings effortlessly. Find the best meeting time across multiple time zones. Perfect for remote teams and international collaboration."
        path="/meet"
      />
      <h1 className="sr-only">Find the Best Meeting Times Across Time Zones</h1>
      <div className="flex-1 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16 w-full">
        {/* Header */}
        <div className="text-center mb-12">
          <div
            className="inline-flex items-center justify-center w-16 h-16 rounded-full mb-4"
            style={{ backgroundColor: '#F0F9F3' }}
          >
            <Users className="w-8 h-8" style={{ color: '#2E45F0' }} />
          </div>
          <h2
            className="text-5xl font-bold mb-3"
            style={{
              fontFamily: 'Inter, sans-serif',
              color: '#080A0C',
            }}
          >
            Meeting Planner
          </h2>
          <p
            className="text-lg"
            style={{
              fontFamily: 'Open Sans, sans-serif',
              color: '#364151',
            }}
          >
            Find the best time for meetings across different time zones
          </p>
        </div>

        {/* City Selection */}
        <div
          className="bg-white rounded-xl shadow-sm p-6 mb-6"
          style={{ border: '1px solid #E6E9EE' }}
        >
          <h2
            className="text-lg font-semibold mb-4"
            style={{
              fontFamily: 'Inter, sans-serif',
              color: '#080A0C',
            }}
          >
            Select Cities
          </h2>
          <div className="space-y-3">
            {selectedCities.map((city, index) => (
              <div key={index} className="flex items-center gap-3">
                <select
                  value={city.name}
                  onChange={(e) => handleCityChange(index, e.target.value)}
                  className="flex-1 px-4 py-2 rounded-lg"
                  style={{
                    fontFamily: 'Open Sans, sans-serif',
                    border: '1px solid #D9DEE6',
                    color: '#080A0C',
                  }}
                >
                  {majorCities.map((c) => (
                    <option key={c.timezone} value={c.name}>
                      {c.name} · {getTimezoneDisplayWithDST(c)}
                    </option>
                  ))}
                </select>
                {selectedCities.length > 2 && (
                  <button
                    onClick={() => removeCity(index)}
                    className="px-4 py-2 rounded-lg transition-colors"
                    style={{
                      fontFamily: 'Inter, sans-serif',
                      color: '#d4183d',
                      backgroundColor: 'transparent',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = '#fee';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = 'transparent';
                    }}
                  >
                    Remove
                  </button>
                )}
              </div>
            ))}
          </div>
          {selectedCities.length < 5 && (
            <button
              onClick={addCity}
              className="mt-4 px-4 py-2 rounded-lg transition-colors"
              style={{
                fontFamily: 'Inter, sans-serif',
                color: '#005EE9',
                backgroundColor: 'transparent',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#F0F9F3';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'transparent';
              }}
            >
              + Add City
            </button>
          )}
        </div>

        {/* Meeting Time Selector */}
        <div
          className="bg-white rounded-xl shadow-sm p-6 mb-6"
          style={{ border: '1px solid #E6E9EE' }}
        >
          <h2
            className="text-lg font-semibold mb-4"
            style={{
              fontFamily: 'Inter, sans-serif',
              color: '#080A0C',
            }}
          >
            Select Meeting Time in {selectedCities[0].name}
          </h2>
          <input
            type="range"
            min="0"
            max="23"
            value={selectedHour}
            onChange={(e) => setSelectedHour(parseInt(e.target.value))}
            className="w-full"
            style={{
              accentColor: '#2E45F0',
            }}
          />
          <div
            className="text-center mt-2 text-2xl font-bold"
            style={{
              fontFamily: 'Inter, sans-serif',
              fontWeight: 800,
              color: '#080A0C',
            }}
          >
            {selectedHour === 0 ? 12 : selectedHour > 12 ? selectedHour - 12 : selectedHour}:00{' '}
            {selectedHour >= 12 ? 'PM' : 'AM'}
          </div>
        </div>

        {/* Meeting Times Display */}
        <div
          className="bg-white rounded-xl shadow-sm p-6 mb-6"
          style={{ border: '1px solid #E6E9EE' }}
        >
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Clock className="w-5 h-5" style={{ color: '#364151' }} />
              <h2
                className="text-lg font-semibold"
                style={{
                  fontFamily: 'Inter, sans-serif',
                  color: '#080A0C',
                }}
              >
                Meeting Times
              </h2>
            </div>
            <button
              onClick={handleCopy}
              className="flex items-center gap-2 px-3 py-2 rounded-lg transition-colors"
              style={{
                fontFamily: 'Inter, sans-serif',
                color: copied ? '#10b981' : '#005EE9',
                backgroundColor: 'transparent',
                border: '1px solid',
                borderColor: copied ? '#10b981' : '#D9DEE6',
              }}
              onMouseEnter={(e) => {
                if (!copied) {
                  e.currentTarget.style.backgroundColor = '#F0F9F3';
                }
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'transparent';
              }}
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4" />
                  <span>Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4" />
                  <span>Copy meeting summary</span>
                </>
              )}
            </button>
          </div>

          {/* Legend */}
          <div
            className="flex flex-wrap items-center gap-4 mb-6 p-3 rounded-lg"
            style={{ backgroundColor: '#F2EFEA' }}
          >
            <div className="flex items-center gap-2">
              <div
                style={{
                  width: '16px',
                  height: '16px',
                  borderRadius: '4px',
                  backgroundColor: '#10b981',
                }}
              />
              <span
                style={{
                  fontFamily: 'Open Sans, sans-serif',
                  fontSize: '0.875rem',
                  color: '#364151',
                }}
              >
                🟢 Best (9 AM–5 PM)
              </span>
            </div>
            <div className="flex items-center gap-2">
              <div
                style={{
                  width: '16px',
                  height: '16px',
                  borderRadius: '4px',
                  backgroundColor: '#f59e0b',
                }}
              />
              <span
                style={{
                  fontFamily: 'Open Sans, sans-serif',
                  fontSize: '0.875rem',
                  color: '#364151',
                }}
              >
                🟡 Acceptable (6–9 AM / 5–9 PM)
              </span>
            </div>
            <div className="flex items-center gap-2">
              <div
                style={{
                  width: '16px',
                  height: '16px',
                  borderRadius: '4px',
                  backgroundColor: '#ef4444',
                }}
              />
              <span
                style={{
                  fontFamily: 'Open Sans, sans-serif',
                  fontSize: '0.875rem',
                  color: '#364151',
                }}
              >
                🔴 Avoid (9 PM–6 AM)
              </span>
            </div>
          </div>

          <div className="space-y-4">
            {meetingTimes.map((time, index) => {
              const zoneColors = {
                best: { border: '#10b981', bg: '#f0fdf4', text: '#10b981' },
                acceptable: { border: '#f59e0b', bg: '#fffbeb', text: '#f59e0b' },
                avoid: { border: '#ef4444', bg: '#fef2f2', text: '#ef4444' },
              };

              const colors = zoneColors[time.zone];
              const zoneLabels = {
                best: '🟢 Best',
                acceptable: '🟡 Acceptable',
                avoid: '🔴 Avoid',
              };

              return (
                <div
                  key={index}
                  className="p-4 rounded-lg"
                  style={{
                    border: `2px solid ${colors.border}`,
                    backgroundColor: colors.bg,
                  }}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <h3
                        className="font-semibold"
                        style={{
                          fontFamily: 'Inter, sans-serif',
                          color: '#080A0C',
                        }}
                      >
                        {time.city}
                      </h3>
                      <p
                        className="text-sm"
                        style={{
                          fontFamily: 'Open Sans, sans-serif',
                          fontSize: '13px',
                          color: '#6B7280',
                          marginTop: '2px',
                          fontVariantNumeric: 'tabular-nums',
                        }}
                      >
                        {time.timezoneDisplay}
                      </p>
                    </div>
                    <div className="text-right">
                      <div
                        className="text-2xl font-bold"
                        style={{
                          fontFamily: 'Inter, sans-serif',
                          fontWeight: 800,
                          color: '#080A0C',
                        }}
                      >
                        {time.time}
                      </div>
                      <div
                        className="text-sm"
                        style={{
                          fontFamily: 'Open Sans, sans-serif',
                          color: colors.text,
                          fontWeight: 600,
                        }}
                      >
                        {zoneLabels[time.zone]}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Summary */}
        <div
          className="rounded-xl p-6"
          style={{
            backgroundColor: allInWorkHours ? '#f0fdf4' : '#fffbeb',
            border: allInWorkHours ? '2px solid #10b981' : '2px solid #f59e0b',
          }}
        >
          <div className="text-center">
            <p
              className="text-lg font-semibold"
              style={{
                fontFamily: 'Inter, sans-serif',
                color: '#080A0C',
              }}
            >
              {allInWorkHours
                ? '✓ This time works for everyone during work hours!'
                : '⚠ Some participants will be outside typical work hours'}
            </p>
            <p
              className="text-sm mt-2"
              style={{
                fontFamily: 'Open Sans, sans-serif',
                color: '#364151',
              }}
            >
              Work hours are considered 9 AM - 5 PM in each timezone
            </p>
          </div>
        </div>
      </div>

      {/* SEO Content Section */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 w-full">
        <h2
          className="text-2xl font-bold mb-4"
          style={{ fontFamily: 'Inter, sans-serif', color: '#080A0C' }}
        >
          Best Meeting Times Between Time Zones
        </h2>
        <p
          className="mb-4"
          style={{
            fontFamily: 'Open Sans, sans-serif',
            color: '#364151',
            fontSize: '15px',
            lineHeight: '1.7',
          }}
        >
          Easily find the best meeting times across time zones. TimeAtlas helps you compare working
          hours, avoid late-night calls, and schedule meetings between cities like New York, London,
          and Tokyo.
        </p>
        <p
          style={{
            fontFamily: 'Open Sans, sans-serif',
            color: '#364151',
            fontSize: '15px',
            lineHeight: '1.7',
          }}
        >
          Example: A meeting between New York (ET) and Los Angeles (PT) works best between 12 PM – 3
          PM ET, when both teams are within standard working hours.
        </p>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
}
