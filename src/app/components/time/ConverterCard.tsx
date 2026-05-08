export type ConverterCardVariant = 'small' | 'medium' | 'large';

export interface ConverterCardProps {
  sourceCode: string;
  targetCode: string;
  currentExampleTime?: string;
  href: string;
  variant?: ConverterCardVariant;
  className?: string;
}

const baseClasses =
  'group flex w-full rounded-xl border border-border bg-card text-card-foreground no-underline shadow-sm transition-colors hover:border-accent hover:bg-muted/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background active:bg-muted';

const variantClasses: Record<ConverterCardVariant, string> = {
  small:
    'col-span-12 min-h-24 basis-full flex-col justify-between gap-3 px-3 py-3 sm:col-span-6 sm:basis-1/2 md:col-span-4 md:basis-1/3 xl:col-span-1 xl:basis-1/12',
  medium:
    'col-span-12 min-h-28 basis-full flex-col justify-between gap-4 p-4 sm:col-span-6 sm:basis-1/2 xl:col-span-2 xl:basis-1/6',
  large:
    'col-span-12 min-h-36 basis-full flex-col justify-between gap-5 p-6 md:col-span-6 md:basis-1/2 xl:col-span-4 xl:basis-1/3',
};

const codeClasses: Record<ConverterCardVariant, string> = {
  small: 'text-sm',
  medium: 'text-base',
  large: 'text-xl',
};

const exampleClasses: Record<ConverterCardVariant, string> = {
  small: 'text-xs',
  medium: 'text-sm',
  large: 'text-base',
};

function joinClasses(...classes: Array<string | undefined | false>): string {
  return classes.filter(Boolean).join(' ');
}

export function ConverterCard({
  sourceCode,
  targetCode,
  currentExampleTime,
  href,
  variant = 'medium',
  className,
}: ConverterCardProps) {
  const source = sourceCode.toUpperCase();
  const target = targetCode.toUpperCase();
  const label = `Convert ${source} to ${target}`;

  return (
    <a
      href={href}
      aria-label={currentExampleTime ? `${label}, example ${currentExampleTime}` : label}
      className={joinClasses(baseClasses, variantClasses[variant], className)}
    >
      <span className="flex items-center gap-2 font-[var(--font-display)] font-semibold text-card-foreground">
        <span className={joinClasses('tabular-nums', codeClasses[variant])}>{source}</span>
        <span className="text-xs font-medium text-muted-foreground" aria-hidden="true">
          to
        </span>
        <span className={joinClasses('tabular-nums', codeClasses[variant])}>{target}</span>
      </span>

      <span className="flex items-end justify-between gap-3">
        <span
          className={joinClasses(
            'font-[var(--font-body)] text-muted-foreground',
            exampleClasses[variant]
          )}
        >
          {currentExampleTime ?? 'View converter'}
        </span>
        <span
          className="shrink-0 font-[var(--font-display)] text-sm font-semibold text-accent transition-transform group-hover:translate-x-0.5"
          aria-hidden="true"
        >
          View
        </span>
      </span>
    </a>
  );
}
