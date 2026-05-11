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
  const isSmall = variant === 'small';
  const spacingClass = isLarge ? 'p-6 min-h-28' : isSmall ? 'p-3 min-h-20' : 'p-4 min-h-24';
  const labelClass = isLarge ? 'text-lg' : isSmall ? 'text-sm' : 'text-base';
  const exampleClass = isLarge ? 'text-base' : 'text-sm';
  const cardTone = isLarge ? 'shadow-sm' : 'shadow-none';

  return (
    <a
      href={href}
      className={`group block rounded-xl border ${spacingClass} ${cardTone} transition-all duration-150 hover:-translate-y-0.5 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-laser-blue)] focus-visible:ring-offset-2`}
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
        <p className={`mt-2 font-medium ${exampleClass}`} style={{ color: 'var(--color-charcoal-blue)' }}>
          {currentExampleTime}
        </p>
      ) : null}
    </a>
  );
}
