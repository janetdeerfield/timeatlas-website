import { useEffect, useState } from 'react';
import type { ReactNode } from 'react';

export const DEFAULT_TIME_PLACEHOLDER = '--:--:--';

export interface ClientOnlyTimeProps {
  /**
   * Server-rendered and initial hydration content for time values.
   * Use "--" for offsets and an empty string for relative time text.
   */
  placeholder?: ReactNode;
  children: (mounted: boolean) => ReactNode;
}

export function useClientOnly(): boolean {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return mounted;
}

/**
 * Hydration-safe wrapper for any time-displaying value.
 * It renders a stable placeholder through SSR and initial hydration, then
 * renders the live client value after mount.
 */
export function ClientOnlyTime({
  placeholder = DEFAULT_TIME_PLACEHOLDER,
  children,
}: ClientOnlyTimeProps) {
  const mounted = useClientOnly();

  if (!mounted) {
    return <>{placeholder}</>;
  }

  return <>{children(mounted)}</>;
}
