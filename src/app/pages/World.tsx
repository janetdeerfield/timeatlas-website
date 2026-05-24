import { CityCard } from '../components/CityCard';
import { Footer } from '../components/Footer';
import { SEO } from '../components/SEO';
import { majorCities } from '../utils/time';
import { Globe } from 'lucide-react';

interface WorldProps {
  use24Hour: boolean;
}

export function World({ use24Hour }: WorldProps) {
  return (
    <>
      <SEO
        title="World Clock — Current Time in Major Cities | TimeAtlas"
        description="View current local times around the world with a clean, readable world clock designed for clarity and speed."
        path="/world"
      />
      <div
        className="min-h-screen flex flex-col"
        style={{
          background: `
            radial-gradient(circle at 50% -20%, rgba(10,132,208,0.25) 0%, rgba(10,132,208,0.12) 25%, rgba(10,132,208,0.05) 40%, transparent 60%),
            linear-gradient(180deg, #04044E 0%, #0A2133 35%, #0A2133 100%)
          `,
        }}
      >
        <div className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 w-full">
          {/* Header */}
          <div className="text-center mb-12">
            <div
              className="inline-flex items-center justify-center w-16 h-16 rounded-full mb-4"
              style={{ backgroundColor: '#2E45F0' }}
            >
              <Globe className="w-8 h-8" style={{ color: '#FEFEFE' }} />
            </div>
            <h1
              className="text-5xl font-bold mb-3"
              style={{
                color: '#FEFEFE',
              }}
            >
              World Clock
            </h1>
            <p
              className="text-lg"
              style={{
                color: '#5C6E87',
              }}
            >
              Live time in major cities around the globe
            </p>
          </div>

          {/* World Clock Grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {majorCities.map((city) => (
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

          {/* Info Section */}
          <div
            className="mt-16 rounded-xl p-8"
            style={{ backgroundColor: '#FEFEFE', border: '1px solid #E6E9EE' }}
          >
            <h2
              className="text-2xl font-bold mb-4"
              style={{
                color: '#080A0C',
              }}
            >
              About World Clocks
            </h2>
            <div className="prose prose-gray max-w-none">
              <p
                className="mb-4"
                style={{
                  color: '#364151',
                  lineHeight: '1.7',
                }}
              >
                The world is divided into time zones to accommodate the Earth's rotation and ensure
                that noon corresponds approximately to when the sun is highest in the sky. Each time
                zone is typically one hour apart from its neighbors, though some regions use 30 or
                45 minute offsets.
              </p>
              <p
                style={{
                  color: '#364151',
                  lineHeight: '1.7',
                }}
              >
                Understanding time zones is essential for international communication, travel
                planning, and coordinating meetings across different regions. Use the converter tool
                to quickly find the best time for your global activities.
              </p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <Footer />
      </div>
    </>
  );
}
