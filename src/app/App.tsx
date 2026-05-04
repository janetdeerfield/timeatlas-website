import { useCallback, useEffect, useMemo, useState } from 'react';
import { RouterProvider } from 'react-router';
import { HelmetProvider } from 'react-helmet-async';
import { createRouter } from './routes';

function isPrerenderedPage() {
  return typeof document !== 'undefined' && document.documentElement.dataset.prerendered === 'true';
}

function readStoredUse24Hour() {
  if (typeof window === 'undefined') return false;

  try {
    const saved = window.localStorage.getItem('use24Hour');
    return saved ? JSON.parse(saved) : false;
  } catch {
    return false;
  }
}

export default function App() {
  const [use24Hour, setUse24Hour] = useState(() =>
    isPrerenderedPage() ? false : readStoredUse24Hour()
  );
  const [canPersistPreference, setCanPersistPreference] = useState(() => !isPrerenderedPage());

  useEffect(() => {
    if (!isPrerenderedPage()) return;

    setUse24Hour(readStoredUse24Hour());
    setCanPersistPreference(true);
  }, []);

  useEffect(() => {
    if (!canPersistPreference || typeof window === 'undefined') return;

    try {
      window.localStorage.setItem('use24Hour', JSON.stringify(use24Hour));
    } catch {
      // Ignore storage errors so private browsing modes can still hydrate.
    }
  }, [canPersistPreference, use24Hour]);

  const onToggleFormat = useCallback(() => {
    setUse24Hour((current: boolean) => !current);
  }, []);

  const router = useMemo(
    () => createRouter({ use24Hour, onToggleFormat }),
    [onToggleFormat, use24Hour]
  );

  return (
    <HelmetProvider>
      <RouterProvider router={router} />
    </HelmetProvider>
  );
}
