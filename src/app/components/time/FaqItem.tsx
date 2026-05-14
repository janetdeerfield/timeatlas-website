import { useId, useState } from 'react';
import type { ReactNode } from 'react';
import { joinClasses } from './utils';

export interface FaqItemProps {
  question: string;
  answer: ReactNode;
  defaultOpen?: boolean;
  headingLevel?: 2 | 3 | 4 | 5 | 6;
  className?: string;
}

function Heading({
  level,
  children,
  className,
}: {
  level: NonNullable<FaqItemProps['headingLevel']>;
  children: ReactNode;
  className?: string;
}) {
  const Tag = `h${level}` as const;

  return <Tag className={className}>{children}</Tag>;
}

export function FaqItem({
  question,
  answer,
  defaultOpen = false,
  headingLevel = 3,
  className,
}: FaqItemProps) {
  const [open, setOpen] = useState(defaultOpen);
  const id = useId();
  const buttonId = `${id}-button`;
  const panelId = `${id}-panel`;

  return (
    <article
      itemProp="mainEntity"
      itemScope
      itemType="https://schema.org/Question"
      className={joinClasses('rounded-xl border border-border bg-card shadow-sm', className)}
    >
      <Heading level={headingLevel} className="m-0">
        <button
          id={buttonId}
          type="button"
          aria-expanded={open}
          aria-controls={panelId}
          onClick={() => setOpen((current) => !current)}
          className="flex w-full items-center justify-between gap-4 rounded-xl px-5 py-4 text-left font-[var(--font-display)] text-base font-semibold text-card-foreground transition-colors hover:bg-muted/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
        >
          <span itemProp="name">{question}</span>
          <span className="shrink-0 text-sm text-muted-foreground" aria-hidden="true">
            {open ? 'Close' : 'Open'}
          </span>
        </button>
      </Heading>

      <div
        id={panelId}
        role="region"
        aria-labelledby={buttonId}
        aria-hidden={!open}
        itemProp="acceptedAnswer"
        itemScope
        itemType="https://schema.org/Answer"
        className={joinClasses('px-5 pb-5', !open && 'hidden')}
      >
        <div
          itemProp="text"
          className="font-[var(--font-body)] text-sm leading-6 text-muted-foreground"
        >
          {answer}
        </div>
      </div>
    </article>
  );
}
