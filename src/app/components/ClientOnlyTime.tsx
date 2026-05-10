import { useState, useEffect, type ReactNode } from 'react';

interface ClientOnlyTimeProps {
  placeholder?: string;
  children: (mounted: boolean) => ReactNode;
}

/**
 * Hydration-safe wrapper for time-displaying elements.
 * Renders a placeholder during SSR/SSG; switches to live content
 * after the component mounts on the client.
 */
export function ClientOnlyTime({ placeholder = '--:--:--', children }: ClientOnlyTimeProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <span aria-hidden="true">{placeholder}</span>;
  }

  return <>{children(true)}</>;
}
