import { ClockHero } from '../components/ClockHero';
import { ToolCard } from '../components/ToolCard';
import { CityCard } from '../components/CityCard';
import { Footer } from '../components/Footer';
import { SEO } from '../components/SEO';
import { Clock, ArrowLeftRight, Globe, Users, Code, Lightbulb, Quote } from 'lucide-react';
import { majorCities } from '../utils/time';

interface HomeProps {
  use24Hour: boolean;
}

// Helper function to check if DST is currently active in the US
function isDSTActive(): boolean {
  const now = new Date();
  const year = now.getFullYear();
  
  // DST starts on second Sunday in March at 2:00 AM
  const marchFirst = new Date(year, 2, 1); // Month is 0-indexed
  const firstMarchSunday = new Date(year, 2, 1 + (7 - marchFirst.getDay()) % 7);
  const dstStart = new Date(year, 2, firstMarchSunday.getDate() + 7, 2, 0, 0);
  
  // DST ends on first Sunday in November at 2:00 AM
  const novemberFirst = new Date(year, 10, 1);
  const firstNovemberSunday = new Date(year, 10, 1 + (7 - novemberFirst.getDay()) % 7);
  const dstEnd = new Date(year, 10, firstNovemberSunday.getDate(), 2, 0, 0);
  
  return now >= dstStart && now < dstEnd;
}

export function Home({ use24Hour }: HomeProps) {
  const featuredCities = majorCities.slice(0, 5);
  const dstActive = isDSTActive();

  return (
    <>
      <SEO 
        title="Time Converter & World Clock – TimeAtlas"
        description="Convert time zones instantly. Compare world times, plan meetings, and view exact time worldwide with TimeAtlas."
        path="/"
      />
      <div className="min-h-screen flex flex-col" style={{ backgroundColor: '#FEFEFE' }}>
        <div className="flex-1">
          {/* Hero Section */}
          <section className="bg-white pb-2 sm:pb-8" style={{ backgroundColor: '#FEFEFE' }}>
            <h1 className="sr-only">Time Converter &amp; World Clock</h1>
            <ClockHero use24Hour={use24Hour} />
            
            {/* Horizontal Divider */}
            <div 
              style={{
                height: '1px',
                background: '#ECEFF4',
                width: '900px',
                maxWidth: '90%',
                margin: '16px auto',
              }}
              className="sm:!my-8"
            />
          </section>

          {/* Tools Grid */}
          <section id="time-tools" className="pt-8 pb-8 sm:pt-8 sm:pb-16" style={{ backgroundColor: '#F1F3F5' }}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <h2 
                className="text-3xl font-bold mb-8 text-center"
                style={{
                  fontFamily: 'Inter, sans-serif',
                  color: '#080A0C',
                }}
              >
                Time Tools
              </h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                <ToolCard
                  title="Time Converter"
                  description="Compare time between any two cities in the world"
                  icon={ArrowLeftRight}
                  href="/convert"
                  backgroundColor="#FFFFFF"
                  textColor="#0A84D0"
                />
                <ToolCard
                  title="World Time"
                  description="Live time in major cities around the globe"
                  icon={Globe}
                  href="/world"
                  backgroundColor="#FFFFFF"
                  textColor="#0A84D0"
                />
                <ToolCard
                  title="Meeting Planner"
                  description="Find the best time for meetings across different time zones"
                  icon={Users}
                  href="/meet"
                  backgroundColor="#FFFFFF"
                  textColor="#0A84D0"
                />
                <ToolCard
                  title="Developer Tools"
                  description="Essential time formats for developers and APIs"
                  icon={Code}
                  href="/dev"
                  backgroundColor="#FFFFFF"
                  textColor="#0A84D0"
                />
              </div>
            </div>
          </section>

          {/* World Clock Strip */}
          <section className="bg-white py-16" style={{ borderTop: '1px solid #D9DEE6', borderBottom: '1px solid #D9DEE6' }}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <h2 
                className="text-3xl font-bold mb-8"
                style={{
                  fontFamily: 'Inter, sans-serif',
                  color: '#080A0C',
                }}
              >
                Time Around the World
              </h2>
              <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-4">
                {featuredCities.map((city) => (
                  <CityCard
                    key={city.timezone}
                    name={city.name}
                    timezone={city.timezone}
                    utcOffset={city.utcOffset}
                    country={city.country}
                    use24Hour={use24Hour}
                  />
                ))}
              </div>
            </div>
          </section>

          {/* U.S. Time Zones Section */}
          <section className="py-16" style={{ backgroundColor: '#F2EFEA' }}>
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
              <div 
                className="bg-white rounded-2xl p-8 sm:p-10"
                style={{
                  border: '1px solid #E6E9EE',
                }}
              >
                <h2 
                  className="text-2xl font-bold mb-6"
                  style={{
                    fontFamily: 'Inter, sans-serif',
                    color: '#080A0C',
                  }}
                >
                  U.S. Time Zones
                </h2>
                
                {/* DST Status Banner */}
                <div 
                  className="mb-6 p-4 rounded-lg"
                  style={{
                    backgroundColor: dstActive ? '#E8F5E9' : '#FFF3E0',
                    border: `1px solid ${dstActive ? '#A5D6A7' : '#FFE0B2'}`,
                  }}
                >
                  <p 
                    className="font-semibold mb-2"
                    style={{
                      fontFamily: 'Inter, sans-serif',
                      color: '#080A0C',
                      fontSize: '15px',
                    }}
                  >
                    Daylight Saving Time (DST) is {dstActive ? 'ACTIVE' : 'INACTIVE'}
                  </p>
                  <p 
                    className="mb-2"
                    style={{
                      fontFamily: 'Open Sans, sans-serif',
                      color: '#364151',
                      fontSize: '14px',
                      lineHeight: '1.6',
                    }}
                  >
                    Clocks move forward one hour on the second Sunday in March and back one hour on the first Sunday in November. The switch occurs at 2:00 a.m. local time.
                  </p>
                  <p 
                    style={{
                      fontFamily: 'Open Sans, sans-serif',
                      color: '#364151',
                      fontSize: '14px',
                      lineHeight: '1.6',
                    }}
                  >
                    <strong>Locations not observing DST:</strong> Hawaii and most of Arizona do not observe DST, along with American Samoa, Guam, Puerto Rico, and the Virgin Islands.
                  </p>
                </div>
                
                <div className="space-y-3">
                  <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2">
                    <span 
                      style={{
                        fontFamily: 'Inter, sans-serif',
                        fontWeight: 600,
                        color: '#080A0C',
                        fontSize: '15px',
                      }}
                    >
                      Eastern {dstActive ? 'Daylight' : 'Standard'} Time:
                    </span>
                    <span 
                      style={{
                        fontFamily: 'Open Sans, sans-serif',
                        color: '#364151',
                        fontSize: '15px',
                      }}
                    >
                      Washington, DC (GMT-4)
                    </span>
                  </div>
                  <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2">
                    <span 
                      style={{
                        fontFamily: 'Inter, sans-serif',
                        fontWeight: 600,
                        color: '#080A0C',
                        fontSize: '15px',
                      }}
                    >
                      Central {dstActive ? 'Daylight' : 'Standard'} Time:
                    </span>
                    <span 
                      style={{
                        fontFamily: 'Open Sans, sans-serif',
                        color: '#364151',
                        fontSize: '15px',
                      }}
                    >
                      Chicago (GMT-5)
                    </span>
                  </div>
                  <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2">
                    <span 
                      style={{
                        fontFamily: 'Inter, sans-serif',
                        fontWeight: 600,
                        color: '#080A0C',
                        fontSize: '15px',
                      }}
                    >
                      Mountain {dstActive ? 'Daylight' : 'Standard'} Time:
                    </span>
                    <span 
                      style={{
                        fontFamily: 'Open Sans, sans-serif',
                        color: '#364151',
                        fontSize: '15px',
                      }}
                    >
                      Denver (GMT-6)
                    </span>
                  </div>
                  <div className="space-y-1">
                    <div className="flex flex-wrap items-center gap-1 sm:gap-2">
                      <span 
                        style={{
                          fontFamily: 'Inter, sans-serif',
                          fontWeight: 600,
                          color: '#080A0C',
                          fontSize: '15px',
                        }}
                      >
                        Mountain Standard Time:
                      </span>
                      <span 
                        style={{
                          fontFamily: 'Open Sans, sans-serif',
                          color: '#364151',
                          fontSize: '15px',
                        }}
                      >
                        Phoenix (GMT-7)
                      </span>
                    </div>
                    <div className="pl-0 sm:pl-0">
                      <div 
                        style={{
                          fontFamily: 'Open Sans, sans-serif',
                          color: '#6B7280',
                          fontSize: '13px',
                          fontStyle: 'italic',
                        }}
                      >
                        Daylight Saving: No observed change.
                      </div>
                      <div 
                        style={{
                          fontFamily: 'Open Sans, sans-serif',
                          color: '#6B7280',
                          fontSize: '13px',
                          fontStyle: 'italic',
                        }}
                      >
                        Exceptions: The Navajo Nation within Arizona does observe DST.
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2">
                    <span 
                      style={{
                        fontFamily: 'Inter, sans-serif',
                        fontWeight: 600,
                        color: '#080A0C',
                        fontSize: '15px',
                      }}
                    >
                      Pacific {dstActive ? 'Daylight' : 'Standard'} Time:
                    </span>
                    <span 
                      style={{
                        fontFamily: 'Open Sans, sans-serif',
                        color: '#364151',
                        fontSize: '15px',
                      }}
                    >
                      Los Angeles (GMT-7)
                    </span>
                  </div>
                  <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2">
                    <span 
                      style={{
                        fontFamily: 'Inter, sans-serif',
                        fontWeight: 600,
                        color: '#080A0C',
                        fontSize: '15px',
                      }}
                    >
                      Alaska Daylight Time:
                    </span>
                    <span 
                      style={{
                        fontFamily: 'Open Sans, sans-serif',
                        color: '#364151',
                        fontSize: '15px',
                      }}
                    >
                      Anchorage (GMT-8)
                    </span>
                  </div>
                  <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2">
                    <span 
                      style={{
                        fontFamily: 'Inter, sans-serif',
                        fontWeight: 600,
                        color: '#080A0C',
                        fontSize: '15px',
                      }}
                    >
                      Hawaii-Aleutian Standard Time:
                    </span>
                    <span 
                      style={{
                        fontFamily: 'Open Sans, sans-serif',
                        color: '#364151',
                        fontSize: '15px',
                      }}
                    >
                      Honolulu (GMT-10)
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Fun with Time Section */}
          <section 
            className="py-16 pb-20" 
            style={{ 
              background: 'linear-gradient(135deg, #8495CB 0%, #3A5FB8 50%, #06B6D4 100%)'
            }}
          >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <h2 
                className="text-3xl font-bold mb-8"
                style={{
                  fontFamily: 'Inter, sans-serif',
                  color: '#080A0C',
                }}
              >
                Fun with Time
              </h2>
              <div className="grid md:grid-cols-2 gap-6">
                {/* Time Trivia Card */}
                <div
                  style={{
                    backgroundColor: '#FEFEFE',
                    borderRadius: 16,
                    padding: 32,
                    border: '1px solid #D9E7F8',
                  }}
                >
                  <div className="flex items-center gap-2 mb-4">
                    <Lightbulb 
                      className="w-5 h-5" 
                      style={{ color: '#0A84D0' }}
                    />
                    <h3
                      className="font-semibold uppercase tracking-wide text-sm"
                      style={{
                        fontFamily: 'Inter, sans-serif',
                        color: '#0A84D0',
                        letterSpacing: '0.05em',
                      }}
                    >
                      Time Trivia
                    </h3>
                  </div>
                  <p
                    style={{
                      fontFamily: 'Open Sans, sans-serif',
                      fontSize: 16,
                      lineHeight: 1.6,
                      color: '#364151',
                    }}
                  >
                    The shortest unit of time that has been measured is the attosecond (10⁻¹⁸ seconds).
                  </p>
                </div>

                {/* Quote of the Day Card */}
                <div
                  style={{
                    backgroundColor: '#FEFEFE',
                    borderRadius: 16,
                    padding: 32,
                    border: '1px solid #C8E6C9',
                  }}
                >
                  <div className="flex items-center gap-2 mb-4">
                    <Quote 
                      className="w-5 h-5" 
                      style={{ color: '#2E7D32' }}
                    />
                    <h3
                      className="font-semibold uppercase tracking-wide text-sm"
                      style={{
                        fontFamily: 'Inter, sans-serif',
                        color: '#2E7D32',
                        letterSpacing: '0.05em',
                      }}
                    >
                      Quote of the Day
                    </h3>
                  </div>
                  <p
                    style={{
                      fontFamily: 'Open Sans, sans-serif',
                      fontSize: 16,
                      lineHeight: 1.6,
                      color: '#364151',
                      fontStyle: 'italic',
                      marginBottom: 8,
                    }}
                  >
                    "Better three hours too soon than one minute too late."
                  </p>
                  <p
                    style={{
                      fontFamily: 'Open Sans, sans-serif',
                      fontSize: 14,
                      color: '#6B7280',
                    }}
                  >
                    — William Shakespeare
                  </p>
                </div>
              </div>
            </div>
          </section>

        </div>
      </div>
      <Footer />
    </>
  );
}