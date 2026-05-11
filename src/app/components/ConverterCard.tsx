type ConverterCardVariant = 'small' | 'medium' | 'large';

interface ConverterCardProps {
  sourceCode: string;
  targetCode: string;
  href: string;
  currentExampleTime?: string;
  variant?: ConverterCardVariant;
}

export function ConverterCard({
  sourceCode,
  targetCode,
  href,
  currentExampleTime,
  variant = 'medium',
}: ConverterCardProps) {
  const isLarge = variant === 'large';
  const spacingClass = isLarge ? 'p-5' : variant === 'small' ? 'p-3' : 'p-4';
  const labelClass = isLarge ? 'text-lg' : 'text-base';

  return (
    <a
      href={href}
      className={`group block rounded-xl border ${spacingClass} transition-all duration-150 hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-laser-blue)] focus-visible:ring-offset-2`}
      style={{
        backgroundColor: 'white',
        borderColor: 'var(--color-border-light)',
      }}
      aria-label={`Convert ${sourceCode} to ${targetCode}`}
    >
      <p
        className={`font-semibold tracking-tight ${labelClass}`}
        style={{ color: 'var(--color-onyx)' }}
      >
        {sourceCode} <span style={{ color: 'var(--color-wisteria-blue)' }}>to</span> {targetCode}
      </p>
      {currentExampleTime ? (
        <p className="mt-2 text-sm font-medium" style={{ color: 'var(--color-charcoal-blue)' }}>
          {currentExampleTime}
        </p>
      ) : null}
    </a>
  );
}
