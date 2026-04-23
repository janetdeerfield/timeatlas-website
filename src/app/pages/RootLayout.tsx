import { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router';
import { Header } from '../components/Header';
import { trackPageView } from '../utils/analytics';

interface RootLayoutProps {
  use24Hour: boolean;
  onToggleFormat: () => void;
}

export function RootLayout({ use24Hour, onToggleFormat }: RootLayoutProps) {
  const location = useLocation();

  useEffect(() => {
    const pagePath = `${location.pathname}${location.search}${location.hash}`;
    trackPageView(pagePath);
  }, [location.hash, location.pathname, location.search]);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Header use24Hour={use24Hour} onToggleFormat={onToggleFormat} />
      <main style={{ flex: 1 }}>
        <Outlet />
      </main>
    </div>
  );
}
