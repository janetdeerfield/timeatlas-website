import { Outlet } from 'react-router';
import { Header } from '../components/Header';

interface RootLayoutProps {
  use24Hour: boolean;
  onToggleFormat: () => void;
}

export function RootLayout({ use24Hour, onToggleFormat }: RootLayoutProps) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Header use24Hour={use24Hour} onToggleFormat={onToggleFormat} />
      <main style={{ flex: 1 }}>
        <Outlet />
      </main>
    </div>
  );
}