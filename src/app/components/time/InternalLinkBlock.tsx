import { ConverterCard, type ConverterCardVariant } from './ConverterCard';
import { joinClasses } from './utils';

export type InternalLinkBlockVariant = 'convert-from' | 'convert-to' | 'popular' | 'related';

export interface InternalLinkBlockLink {
  label: string;
  href: string;
  sourceCode?: string;
  targetCode?: string;
  currentExampleTime?: string;
}

export interface InternalLinkBlockProps {
  title: string;
  links: InternalLinkBlockLink[];
  variant?: InternalLinkBlockVariant;
  className?: string;
}

const variantLabels: Record<InternalLinkBlockVariant, string> = {
  'convert-from': 'Convert from',
  'convert-to': 'Convert to',
  popular: 'Popular',
  related: 'Related',
};

function converterPartsFromHref(
  href: string
): Pick<InternalLinkBlockLink, 'sourceCode' | 'targetCode'> {
  const match = href.match(/^\/([a-z0-9-]+)-to-([a-z0-9-]+)\/?$/i);
  if (!match) return {};

  return {
    sourceCode: match[1].toUpperCase(),
    targetCode: match[2].toUpperCase(),
  };
}

function getConverterParts(link: InternalLinkBlockLink) {
  if (link.sourceCode && link.targetCode) {
    return {
      sourceCode: link.sourceCode,
      targetCode: link.targetCode,
    };
  }

  return converterPartsFromHref(link.href);
}

export function InternalLinkBlock({
  title,
  links,
  variant = 'related',
  className,
}: InternalLinkBlockProps) {
  const useConverterCards =
    variant === 'convert-from' || variant === 'convert-to' || variant === 'popular';

  return (
    <section
      className={joinClasses('rounded-xl border border-border bg-card p-5 shadow-sm', className)}
    >
      <div className="mb-4 flex flex-wrap items-baseline justify-between gap-2">
        <h2 className="font-[var(--font-display)] text-xl font-semibold text-card-foreground">
          {title}
        </h2>
        <span className="font-[var(--font-body)] text-xs font-semibold uppercase tracking-wide text-muted-foreground">
          {variantLabels[variant]}
        </span>
      </div>

      <div
        className={joinClasses(
          'grid gap-3',
          useConverterCards
            ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3'
            : 'grid-cols-2 lg:grid-cols-5'
        )}
      >
        {links.map((link) => {
          const converter = getConverterParts(link);

          if (useConverterCards && converter.sourceCode && converter.targetCode) {
            return (
              <ConverterCard
                key={link.href}
                sourceCode={converter.sourceCode}
                targetCode={converter.targetCode}
                currentExampleTime={link.currentExampleTime}
                href={link.href}
                variant={variant === 'popular' ? 'medium' : ('small' as ConverterCardVariant)}
              />
            );
          }

          return (
            <a
              key={link.href}
              href={link.href}
              className="rounded-lg border border-border bg-muted/30 px-3 py-2 font-[var(--font-body)] text-sm font-semibold text-card-foreground no-underline transition-colors hover:border-accent hover:bg-muted/50 hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
            >
              {link.label}
            </a>
          );
        })}
      </div>
    </section>
  );
}
