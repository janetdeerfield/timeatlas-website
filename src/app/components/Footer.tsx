// src/app/components/Footer.tsx (Add Time Tools section)
export function Footer() {
  return (
    <footer className="mt-0" style={{ backgroundColor: '#080A0C', borderTop: 'none' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 pb-24">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div>
            <h3
              className="text-lg font-bold mb-4"
              style={{
                fontFamily: 'Inter, sans-serif',
                color: '#FFFFFF',
              }}
            >
              TimeAtlas
            </h3>
            <div className="mt-8 space-y-2">
              <p
                className="text-sm italic"
                style={{
                  fontFamily: 'Open Sans, sans-serif',
                  color: '#CBD5E1',
                  lineHeight: '1.6',
                }}
              >
                TimeAtlas — A time observatory for the internet.
              </p>
              <p
                className="text-sm"
                style={{
                  fontFamily: 'Open Sans, sans-serif',
                  color: '#CBD5E1',
                  lineHeight: '1.6',
                }}
              >
                Accurate, calm, and reliable time tools for everywhere.
              </p>
            </div>
          </div>

          {/* Time Tools */}
          <div>
            <h4
              className="font-semibold mb-4"
              style={{
                fontFamily: 'Inter, sans-serif',
                color: '#FFFFFF',
                fontSize: '14px',
              }}
            >
              Time Tools
            </h4>
            <ul className="space-y-2">
              {[
                { label: 'Current Local Time', href: '/' },
                { label: 'Time Zone Converter', href: '/convert' },
                { label: 'World Clock', href: '/world' },
                { label: 'Meeting Planner', href: '/meet' },
                { label: 'Developer Tools', href: '/dev' },
              ].map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    className="transition-colors"
                    style={{
                      fontFamily: 'Open Sans, sans-serif',
                      color: '#FFFFFF',
                      fontSize: '14px',
                      textDecoration: 'none',
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = '#8495CB')}
                    onMouseLeave={(e) => (e.currentTarget.style.color = '#FFFFFF')}
                  >
                    {item.label} →
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4
              className="font-semibold mb-4"
              style={{
                fontFamily: 'Inter, sans-serif',
                color: '#FFFFFF',
                fontSize: '14px',
              }}
            >
              Resources
            </h4>
            <ul className="space-y-2">
              {[
                { label: 'About', href: '/about' },
                { label: 'Privacy', href: '/privacy' },
                { label: 'Terms', href: '/terms' },
              ].map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    className="transition-colors"
                    style={{
                      fontFamily: 'Open Sans, sans-serif',
                      color: '#FFFFFF',
                      fontSize: '14px',
                      textDecoration: 'none',
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = '#8495CB')}
                    onMouseLeave={(e) => (e.currentTarget.style.color = '#FFFFFF')}
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div
          className="border-t pt-8 text-center"
          style={{
            borderColor: '#1a1f2e',
            fontFamily: 'Open Sans, sans-serif',
            fontSize: '14px',
            color: '#8495CB',
          }}
        >
          <p>© 2026 TimeAtlas. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
