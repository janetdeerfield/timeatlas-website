import { Link } from 'react-router';
import { MapPinOff } from 'lucide-react';
import { Footer } from '../components/Footer';
import { SEO } from '../components/SEO';

export function NotFound() {
  return (
    <div className="min-h-screen flex flex-col" style={{ backgroundColor: '#FEFEFE' }}>
      <SEO
        title="Page Not Found | TimeAtlas"
        description="The requested coordinate could not be located. Return to TimeAtlas for exact time, world clock, and time zone converter tools."
        path="/404"
        robots="noindex,nofollow"
      />
      <main className="flex-1 flex items-center justify-center px-4 py-20">
        <div className="max-w-xl text-center">
          <div
            className="inline-flex items-center justify-center w-16 h-16 rounded-full mb-6"
            style={{ backgroundColor: '#F0F9F3' }}
          >
            <MapPinOff className="w-8 h-8" style={{ color: '#2E45F0' }} />
          </div>
          <h1
            className="text-4xl sm:text-5xl font-bold mb-4"
            style={{ color: '#080A0C' }}
          >
            Page Not Found
          </h1>
          <p
            className="text-lg mb-8"
            style={{ color: '#364151' }}
          >
            The requested coordinate could not be located.
          </p>
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-full px-6 py-3 font-semibold transition-all shadow-sm hover:shadow-md"
            style={{
              backgroundColor: '#0A84D0',
              color: '#FFFFFF',
            }}
          >
            Return to TimeAtlas
          </Link>
        </div>
      </main>
      <Footer />
    </div>
  );
}
