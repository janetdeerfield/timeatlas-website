import { Link } from 'react-router';

export function Footer() {
  return (
    <footer className="py-12" style={{ backgroundColor: '#080A0C', borderTop: '1px solid #364151' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <p 
            className="text-sm"
            style={{
              fontFamily: 'Open Sans, sans-serif',
              color: '#FEFEFE',
            }}
          >
            TimeAtlas - The Internet's Cleanest Time Tools
          </p>
          <div 
            className="flex items-center gap-6 text-sm"
            style={{
              fontFamily: 'Open Sans, sans-serif',
              color: '#8495CB',
            }}
          >
            <Link 
              to="/about" 
              className="transition-colors"
              onMouseEnter={(e) => e.currentTarget.style.color = '#FEFEFE'}
              onMouseLeave={(e) => e.currentTarget.style.color = '#8495CB'}
            >
              About
            </Link>
            <Link 
              to="/privacy" 
              className="transition-colors"
              onMouseEnter={(e) => e.currentTarget.style.color = '#FEFEFE'}
              onMouseLeave={(e) => e.currentTarget.style.color = '#8495CB'}
            >
              Privacy
            </Link>
            <Link 
              to="/terms" 
              className="transition-colors"
              onMouseEnter={(e) => e.currentTarget.style.color = '#FEFEFE'}
              onMouseLeave={(e) => e.currentTarget.style.color = '#8495CB'}
            >
              Terms
            </Link>
            <a 
              href="mailto:contact@timeatlas.co" 
              className="transition-colors"
              onMouseEnter={(e) => e.currentTarget.style.color = '#FEFEFE'}
              onMouseLeave={(e) => e.currentTarget.style.color = '#8495CB'}
            >
              Contact
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
