type ConverterCardVariant = 'small' | 'medium' | 'large';

interface ConverterCardProps {
  sourceCode: string;
  targetCode: string;
  currentExampleTime?: string;
  href: string;
  variant?: ConverterCardVariant;
}

const variantStyles: Record<
  ConverterCardVariant,
  { padding: string; titleSize: string; subtitleSize: string }
> = {
  small: { padding: '12px 14px', titleSize: '0.8125rem', subtitleSize: '0.6875rem' },
  medium: { padding: '16px 20px', titleSize: '0.9375rem', subtitleSize: '0.75rem' },
  large: { padding: '20px 24px', titleSize: '1.125rem', subtitleSize: '0.875rem' },
};

export function ConverterCard({
  sourceCode,
  targetCode,
  currentExampleTime,
  href,
  variant = 'medium',
}: ConverterCardProps) {
  const styles = variantStyles[variant];
  const label = `${sourceCode} to ${targetCode}`;

  return (
    <a
      href={href}
      aria-label={`Convert ${label}`}
      className="block rounded-lg transition-all"
      style={{
        padding: styles.padding,
        backgroundColor: '#FFFFFF',
        border: '1px solid var(--color-border-light)',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = 'var(--color-laser-blue)';
        e.currentTarget.style.boxShadow = '0 2px 8px rgba(0, 94, 233, 0.10)';
        e.currentTarget.style.transform = 'translateY(-1px)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = 'var(--color-border-light)';
        e.currentTarget.style.boxShadow = 'none';
        e.currentTarget.style.transform = 'translateY(0)';
      }}
    >
      <div
        className="font-semibold"
        style={{
          fontFamily: 'var(--font-display)',
          fontSize: styles.titleSize,
          color: 'var(--color-onyx)',
        }}
      >
        {sourceCode} → {targetCode}
      </div>
      {currentExampleTime && (
        <div
          className="mt-1"
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: styles.subtitleSize,
            color: 'var(--color-charcoal-blue)',
          }}
        >
          {currentExampleTime}
        </div>
      )}
    </a>
  );
}
