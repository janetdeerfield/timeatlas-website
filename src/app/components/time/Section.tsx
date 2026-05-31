import type { ReactNode } from 'react';

interface SectionProps {
  title: ReactNode;
  children: ReactNode;
  className?: string;
  id?: string;
}

/**
 * Reusable section wrapper with a consistent heading style and card background.
 */
export function Section({ title, children, className = '', id }: SectionProps) {
  return (
    <section
      id={id}
      className={`mb-10 rounded-xl border border-slate-200 bg-white p-6 shadow-sm ${className}`}
    >
      <h2 className="text-2xl font-bold text-slate-900 mb-6">{title}</h2>
      {children}
    </section>
  );
}
