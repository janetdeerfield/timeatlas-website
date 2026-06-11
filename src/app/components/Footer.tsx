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
                color: '#FFFFFF',
              }}
            >
              TimeAtlas
            </h3>
            <div className="mt-8 space-y-2">
              <p
                className="text-sm italic"
                style={{
                  color: '#CBD5E1',
                  lineHeight: '1.6',
                }}
              >
                TimeAtlas — A time observatory for the internet.
              </p>
              <p
                className="text-sm"
                style={{
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
                color: '#FFFFFF',
                fontSize: '14px',
              }}
            >
              Resources
            </h4>
            <ul className="space-y-2">
              {[
                { label: 'About', href: '/about' },
                { label: 'Contact', href: '/contact' },
                { label: 'Privacy', href: '/privacy' },
                { label: 'Terms', href: '/terms' },
              ].map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    className="transition-colors"
                    style={{
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

          {/* Connect */}
          <div>
            <h4
              className="font-semibold mb-4"
              style={{
                color: '#FFFFFF',
                fontSize: '14px',
              }}
            >
              Connect
            </h4>
            <ul className="space-y-3">
              {/* Email */}
              <li>
                <a
                  href="mailto:hello@timeatlas.co"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 transition-colors"
                  style={{ color: '#FFFFFF', fontSize: '14px', textDecoration: 'none' }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = '#8495CB')}
                  onMouseLeave={(e) => (e.currentTarget.style.color = '#FFFFFF')}
                >
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <rect x="2" y="4" width="20" height="16" rx="2" />
                    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                  </svg>
                  hello@timeatlas.co
                </a>
              </li>

              {/* GitHub */}
              <li>
                <a
                  href="https://github.com/janetdeerfield"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 transition-colors"
                  style={{ color: '#FFFFFF', fontSize: '14px', textDecoration: 'none' }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = '#8495CB')}
                  onMouseLeave={(e) => (e.currentTarget.style.color = '#FFFFFF')}
                >
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path d="M12 2C6.477 2 2 6.477 2 12c0 4.418 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.009-.868-.013-1.703-2.782.604-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.463-1.11-1.463-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0 1 12 6.836a9.59 9.59 0 0 1 2.504.337c1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.202 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.163 22 16.418 22 12c0-5.523-4.477-10-10-10z" />
                  </svg>
                  GitHub
                </a>
              </li>

              {/* X (formerly Twitter) */}
              <li>
                <a
                  href="https://x.com/timeatlasco"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 transition-colors"
                  style={{ color: '#FFFFFF', fontSize: '14px', textDecoration: 'none' }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = '#8495CB')}
                  onMouseLeave={(e) => (e.currentTarget.style.color = '#FFFFFF')}
                >
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.737-8.835L2.249 2.25H8.08l4.261 5.632 5.903-5.632Zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                  </svg>
                  X
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div
          className="border-t pt-8 text-center"
          style={{
            borderColor: '#1a1f2e',
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
