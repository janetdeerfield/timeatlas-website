export interface SwapButtonProps {
  currentSource: string;
  currentTarget: string;
  className?: string;
}

function joinClasses(...classes: Array<string | undefined | false>): string {
  return classes.filter(Boolean).join(' ');
}

function toRouteCode(code: string): string {
  return code.trim().toLowerCase();
}

export function SwapButton({ currentSource, currentTarget, className }: SwapButtonProps) {
  const source = currentSource.toUpperCase();
  const target = currentTarget.toUpperCase();
  const href = `/${toRouteCode(currentTarget)}-to-${toRouteCode(currentSource)}`;
  const label = `Convert ${target} → ${source} instead`;

  return (
    <a
      href={href}
      aria-label={label}
      className={joinClasses(
        'inline-flex items-center justify-center rounded-full border border-border bg-card px-5 py-3 font-[var(--font-display)] text-sm font-semibold text-card-foreground no-underline shadow-sm transition-colors hover:border-accent hover:bg-muted/50 hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background active:bg-muted',
        className
      )}
    >
      {label}
    </a>
  );
}
