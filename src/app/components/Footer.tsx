// src/app/components/Footer.tsx (Add Time Tools section)
import { Mail, Github, Linkedin } from 'lucide-react';

export function Footer() {
  return (
    <footer className="mt-20" style={{ backgroundColor: '#F1F3F5', borderTop: '1px solid #E6E9EE' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div>
            <h3 
              className="text-lg font-bold mb-4"
              style={{
                fontFamily: 'Inter, sans-serif',
                color: '#080A0C',
              }}
            >
              TimeAtlas
            </h3>
            <p 
              style={{
                fontFamily: 'Open Sans, sans-serif',
                color: '#364151',
                fontSize: '14px',
                lineHeight: '1.6',
              }}
            >
              The Internet's cleanest time zone tools for developers, remote teams, and global travelers.
            </p>
          </div>

          {/* Time Tools */}
          <div>
            <h4 
              className="font-semibold mb-4"
              style={{
                fontFamily: 'Inter, sans-serif',
                color: '#080A0C',
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
              ].map(item => (
                <li key={item.href}>
                  <a 
                    href={item.href}
                    className="hover:text-blue-600 transition-colors"
                    style={{
                      fontFamily: 'Open Sans, sans-serif',
                      color: '#364151',
                      fontSize: '14px',
                      textDecoration: 'none',
                    }}
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
                color: '#080A0C',
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
              ].map(item => (
                <li key={item.href}>
                  <a 
                    href={item.href}
                    className="hover:text-blue-600 transition-colors"
                    style={{
                      fontFamily: 'Open Sans, sans-serif',
                      color: '#364151',
                      fontSize: '14px',
                      textDecoration: 'none',
                    }}
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Social */}
          <div>
            <h4 
              className="font-semibold mb-4"
              style={{
                fontFamily: 'Inter, sans-serif',
                color: '#080A0C',
                fontSize: '14px',
              }}
            >
              Connect
            </h4>
            <div className="flex gap-4">
              <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="hover:text-blue-600">
                <Github size={20} style={{ color: '#364151' }} />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:text-blue-600">
                <Linkedin size={20} style={{ color: '#364151' }} />
              </a>
              <a href="mailto:hello@timeatlas.co" className="hover:text-blue-600">
                <Mail size={20} style={{ color: '#364151' }} />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div 
          className="border-t pt-8 text-center"
          style={{
            borderColor: '#E6E9EE',
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