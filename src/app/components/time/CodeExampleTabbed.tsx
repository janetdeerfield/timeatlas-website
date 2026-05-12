import { useId, useState } from 'react';
import type { KeyboardEvent } from 'react';
import { CopyToClipboardButton } from './CopyToClipboardButton';
import { joinClasses } from './utils';

export interface CodeExample {
  language: string;
  code: string;
}

export interface CodeExampleTabbedProps {
  examples: CodeExample[];
  defaultLanguage?: string;
  className?: string;
}

export function CodeExampleTabbed({
  examples,
  defaultLanguage,
  className,
}: CodeExampleTabbedProps) {
  const id = useId();
  const defaultIndex = Math.max(
    0,
    examples.findIndex((example) => example.language === defaultLanguage)
  );
  const [activeIndex, setActiveIndex] = useState(defaultIndex);
  const activeExample = examples[activeIndex] ?? examples[0];

  const focusTab = (index: number) => {
    const nextTab = document.getElementById(`${id}-tab-${index}`);
    nextTab?.focus();
  };

  const handleTabKeyDown = (event: KeyboardEvent<HTMLButtonElement>, index: number) => {
    let nextIndex: number | null = null;

    if (event.key === 'ArrowRight') {
      nextIndex = (index + 1) % examples.length;
    } else if (event.key === 'ArrowLeft') {
      nextIndex = (index - 1 + examples.length) % examples.length;
    } else if (event.key === 'Home') {
      nextIndex = 0;
    } else if (event.key === 'End') {
      nextIndex = examples.length - 1;
    }

    if (nextIndex === null) return;

    event.preventDefault();
    setActiveIndex(nextIndex);
    focusTab(nextIndex);
  };

  if (examples.length === 0) {
    return null;
  }

  return (
    <section className={joinClasses('rounded-xl border border-border bg-card shadow-sm', className)}>
      <div
        role="tablist"
        aria-label="Code examples"
        className="flex gap-2 overflow-x-auto border-b border-border p-2"
      >
        {examples.map((example, index) => {
          const active = index === activeIndex;

          return (
            <button
              key={example.language}
              id={`${id}-tab-${index}`}
              type="button"
              role="tab"
              aria-selected={active}
              aria-controls={`${id}-panel-${index}`}
              tabIndex={active ? 0 : -1}
              onClick={() => setActiveIndex(index)}
              onKeyDown={(event) => handleTabKeyDown(event, index)}
              className={joinClasses(
                'whitespace-nowrap rounded-full px-4 py-2 font-[var(--font-display)] text-sm font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background',
                active
                  ? 'bg-muted text-card-foreground'
                  : 'text-muted-foreground hover:bg-muted/50 hover:text-card-foreground'
              )}
            >
              {example.language}
            </button>
          );
        })}
      </div>

      {examples.map((example, index) => {
        const active = index === activeIndex;

        return (
          <div
            key={example.language}
            id={`${id}-panel-${index}`}
            role="tabpanel"
            aria-labelledby={`${id}-tab-${index}`}
            hidden={!active}
            className="p-4"
          >
            {active && (
              <>
                <div className="mb-3 flex items-center justify-between gap-3">
                  <p className="font-[var(--font-display)] text-sm font-semibold text-card-foreground">
                    {activeExample.language}
                  </p>
                  <CopyToClipboardButton
                    value={activeExample.code}
                    label={`Copy ${activeExample.language} code`}
                  />
                </div>
                <pre className="overflow-x-auto rounded-lg border border-border bg-muted/30 p-4">
                  <code className="font-mono text-sm leading-6 text-card-foreground">
                    {activeExample.code}
                  </code>
                </pre>
              </>
            )}
          </div>
        );
      })}
    </section>
  );
}
