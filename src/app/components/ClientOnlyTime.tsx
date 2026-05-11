import { useEffect, useState, type ReactNode } from 'react';

interface ClientOnlyTimeProps {
  placeholder?: ReactNode;
  children: (mounted: boolean) => ReactNode;
  className?: string;
}

export function ClientOnlyTime({
  placeholder = '--:--:--',
  children,
  className,
}: ClientOnlyTimeProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return <span className={className}>{mounted ? children(true) : placeholder}</span>;
}
