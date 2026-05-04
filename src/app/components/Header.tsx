import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router';
import { Menu, X } from 'lucide-react';

const logoImage = '/timeatlas-logo.png';

interface HeaderProps {
  use24Hour: boolean;
  onToggleFormat: () => void;
}

export function Header({ use24Hour, onToggleFormat }: HeaderProps) {
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  const navItems = [
    { path: '/', label: 'Now' },
    { path: '/convert', label: 'Convert' },
    { path: '/world', label: 'World' },
    { path: '/meet', label: 'Meet' },
    { path: '/dev', label: 'Dev' },
  ];

  return (
    <>
      <header className="border-b bg-white sticky top-0 z-50" style={{ borderColor: '#D9DEE6' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Desktop Header */}
          <div className="hidden md:flex items-center justify-between h-16">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
              <img src={logoImage} alt="TimeAtlas Logo" className="h-8" />
              <span
                className="text-xs"
                style={{
                  fontFamily: 'Open Sans, sans-serif',
                  color: '#6B7280',
                }}
              >
                The Internet's Cleanest Time Tools
              </span>
            </Link>

            {/* Navigation */}
            <nav className="flex items-center gap-1">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className="px-4 py-2 text-base font-medium transition-all"
                  style={{
                    fontFamily: 'Inter, sans-serif',
                    color: location.pathname === item.path ? '#2E45F0' : '#364151',
                    backgroundColor: location.pathname === item.path ? '#E7EDFF' : 'transparent',
                    borderRadius: '999px',
                  }}
                  onMouseEnter={(e) => {
                    if (location.pathname !== item.path) {
                      e.currentTarget.style.color = '#2E45F0';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (location.pathname !== item.path) {
                      e.currentTarget.style.color = '#364151';
                    }
                  }}
                >
                  {item.label}
                </Link>
              ))}
            </nav>

            {/* Right side controls */}
            <div className="flex items-center gap-4">
              {/* 12h/24h Toggle */}
              <div className="flex items-center gap-2 text-sm">
                <button
                  onClick={onToggleFormat}
                  className="px-3 py-1.5 rounded-full font-medium transition-all"
                  style={{
                    fontFamily: 'Inter, sans-serif',
                    backgroundColor: !use24Hour ? '#2E45F0' : 'white',
                    color: !use24Hour ? 'white' : '#364151',
                    border: !use24Hour ? 'none' : '1px solid #D9DEE6',
                  }}
                >
                  12h
                </button>
                <button
                  onClick={onToggleFormat}
                  className="px-3 py-1.5 rounded-full font-medium transition-all"
                  style={{
                    fontFamily: 'Inter, sans-serif',
                    backgroundColor: use24Hour ? '#2E45F0' : 'white',
                    color: use24Hour ? 'white' : '#364151',
                    border: use24Hour ? 'none' : '1px solid #D9DEE6',
                  }}
                >
                  24h
                </button>
              </div>
            </div>
          </div>

          {/* Mobile Header */}
          <div className="md:hidden py-3">
            {/* Top row: Logo */}
            <div className="flex items-center justify-center mb-2">
              <Link to="/" className="hover:opacity-80 transition-opacity">
                <img src={logoImage} alt="TimeAtlas Logo" className="h-7" />
              </Link>
            </div>

            {/* Second row: Tagline */}
            <div className="text-center mb-3">
              <span
                className="text-xs"
                style={{
                  fontFamily: 'Open Sans, sans-serif',
                  color: '#6B7280',
                }}
              >
                The Internet's Cleanest Time Tools
              </span>
            </div>

            {/* Third row: Controls */}
            <div className="flex items-center justify-center gap-3">
              {/* 12h/24h Toggle */}
              <div className="flex items-center gap-2 text-sm">
                <button
                  onClick={onToggleFormat}
                  className="px-2.5 py-1 rounded-full font-medium transition-all"
                  style={{
                    fontFamily: 'Inter, sans-serif',
                    backgroundColor: !use24Hour ? '#2E45F0' : 'white',
                    color: !use24Hour ? 'white' : '#364151',
                    border: !use24Hour ? 'none' : '1px solid #D9DEE6',
                    fontSize: '13px',
                  }}
                >
                  12h
                </button>
                <button
                  onClick={onToggleFormat}
                  className="px-2.5 py-1 rounded-full font-medium transition-all"
                  style={{
                    fontFamily: 'Inter, sans-serif',
                    backgroundColor: use24Hour ? '#2E45F0' : 'white',
                    color: use24Hour ? 'white' : '#364151',
                    border: use24Hour ? 'none' : '1px solid #D9DEE6',
                    fontSize: '13px',
                  }}
                >
                  24h
                </button>
              </div>

              {/* Hamburger Menu */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="p-1 hover:opacity-70 transition-opacity"
                aria-label="Menu"
              >
                {isMobileMenuOpen ? (
                  <X className="h-5 w-5" style={{ color: '#364151' }} />
                ) : (
                  <Menu className="h-5 w-5" style={{ color: '#364151' }} />
                )}
              </button>
            </div>

            {/* Mobile Menu Dropdown */}
            {isMobileMenuOpen && (
              <div className="mt-4 py-3 border-t" style={{ borderColor: '#D9DEE6' }}>
                <nav className="flex flex-col gap-1">
                  {navItems.map((item) => (
                    <Link
                      key={item.path}
                      to={item.path}
                      className="px-4 py-2.5 text-base font-medium transition-all"
                      style={{
                        fontFamily: 'Inter, sans-serif',
                        color: location.pathname === item.path ? '#2E45F0' : '#364151',
                        backgroundColor:
                          location.pathname === item.path ? '#E7EDFF' : 'transparent',
                        borderRadius: '8px',
                      }}
                    >
                      {item.label}
                    </Link>
                  ))}
                </nav>
              </div>
            )}
          </div>
        </div>
      </header>
    </>
  );
}
