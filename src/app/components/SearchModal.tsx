import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { X, Search } from 'lucide-react';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const searchItems = [
  { label: 'New York', path: '/world', type: 'city' },
  { label: 'London', path: '/world', type: 'city' },
  { label: 'Tokyo', path: '/world', type: 'city' },
  { label: 'Time Converter', path: '/convert', type: 'tool' },
  { label: 'World Time', path: '/world', type: 'tool' },
  { label: 'Meeting Planner', path: '/meet', type: 'tool' },
  { label: 'UTC Time', path: '/dev', type: 'format' },
  { label: 'Unix Timestamp', path: '/dev', type: 'format' },
  { label: 'ISO 8601', path: '/dev', type: 'format' },
];

export function SearchModal({ isOpen, onClose }: SearchModalProps) {
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        onClose();
      }
      if (e.key === 'Escape') {
        onClose();
      }
      if (e.key === '/') {
        e.preventDefault();
        onClose();
      }
    };

    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }

    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  const filteredItems = searchItems.filter((item) =>
    item.label.toLowerCase().includes(query.toLowerCase())
  );

  const handleSelect = (path: string) => {
    navigate(path);
    onClose();
    setQuery('');
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center px-4"
      style={{
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        paddingTop: 'calc(64px + 16px)', // Header height + buffer
      }}
      onClick={onClose}
    >
      <div
        className="w-full max-w-2xl relative"
        style={{
          backgroundColor: '#FFFFFF',
          borderRadius: 16,
          boxShadow: '0 20px 60px rgba(0,0,0,0.3)',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Subtle top fade for depth */}
        <div
          className="absolute top-0 left-0 right-0 h-1 pointer-events-none"
          style={{
            background: 'linear-gradient(to bottom, rgba(0,0,0,0.04), transparent)',
            borderTopLeftRadius: 16,
            borderTopRightRadius: 16,
          }}
        />

        {/* Search Input */}
        <div className="flex items-center gap-3 p-4 border-b" style={{ borderColor: '#E6E9EE' }}>
          <Search className="w-5 h-5" style={{ color: '#6B7280' }} />
          <input
            type="text"
            placeholder="Search cities, tools, or time formats"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            autoFocus
            className="flex-1 outline-none text-base"
            style={{
              fontFamily: 'Open Sans, sans-serif',
              color: '#080A0C',
            }}
          />
          {/* Close icon - visible on all devices, subtle styling */}
          <button
            onClick={onClose}
            className="p-1 hover:opacity-70 transition-opacity"
            aria-label="Close search"
          >
            <X className="w-5 h-5" style={{ color: 'rgba(0, 0, 0, 0.5)' }} />
          </button>
        </div>

        {/* Results */}
        <div className="max-h-96 overflow-y-auto">
          {filteredItems.length > 0 ? (
            filteredItems.map((item, index) => (
              <button
                key={index}
                onClick={() => handleSelect(item.path)}
                className="w-full text-left px-4 py-3 transition-colors border-b hover:bg-gray-50"
                style={{
                  borderColor: '#F2EFEA',
                  fontFamily: 'Open Sans, sans-serif',
                  color: '#364151',
                }}
              >
                <div className="font-medium">{item.label}</div>
                <div className="text-sm" style={{ color: '#6B7280' }}>
                  {item.type === 'city' && 'View city time'}
                  {item.type === 'tool' && 'Open tool'}
                  {item.type === 'format' && 'Time format'}
                </div>
              </button>
            ))
          ) : (
            <div
              className="p-8 text-center"
              style={{ color: '#6B7280', fontFamily: 'Open Sans, sans-serif' }}
            >
              No results found
            </div>
          )}
        </div>

        {/* Keyboard Shortcuts Hint - hidden on mobile */}
        <div
          className="hidden md:block px-4 py-3 border-t text-sm"
          style={{
            borderColor: '#E6E9EE',
            backgroundColor: '#F2EFEA',
            fontFamily: 'Open Sans, sans-serif',
            color: '#6B7280',
          }}
        >
          Press{' '}
          <kbd
            className="px-2 py-1 rounded"
            style={{ backgroundColor: '#FFFFFF', border: '1px solid #D9DEE6' }}
          >
            ESC
          </kbd>{' '}
          to close
        </div>
      </div>
    </div>
  );
}
