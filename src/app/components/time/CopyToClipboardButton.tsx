import { useEffect, useRef, useState } from 'react';
import { joinClasses } from './utils';

export interface CopyToClipboardButtonProps {
  value: string;
  label: string;
  className?: string;
}

async function fallbackCopyText(value: string): Promise<void> {
  if (typeof document === 'undefined') {
    throw new Error('Clipboard fallback requires a document.');
  }

  const textArea = document.createElement('textarea');
  textArea.value = value;
  textArea.setAttribute('readonly', '');
  textArea.style.position = 'fixed';
  textArea.style.top = '0';
  textArea.style.left = '0';
  textArea.style.opacity = '0';

  document.body.appendChild(textArea);
  textArea.focus();
  textArea.select();

  try {
    const copied = document.execCommand('copy');
    if (!copied) {
      throw new Error('Copy command was not accepted.');
    }
  } finally {
    document.body.removeChild(textArea);
  }
}

async function copyText(value: string): Promise<void> {
  if (typeof navigator !== 'undefined' && navigator.clipboard?.writeText) {
    try {
      await navigator.clipboard.writeText(value);
      return;
    } catch {
      // Fall back for browsers or contexts that expose but reject the Clipboard API.
    }
  }

  await fallbackCopyText(value);
}

export function CopyToClipboardButton({
  value,
  label,
  className,
}: CopyToClipboardButtonProps) {
  const [copied, setCopied] = useState(false);
  const resetTimer = useRef<number | null>(null);

  useEffect(() => {
    return () => {
      if (resetTimer.current !== null) {
        window.clearTimeout(resetTimer.current);
      }
    };
  }, []);

  const handleCopy = async () => {
    try {
      await copyText(value);
      setCopied(true);

      if (resetTimer.current !== null) {
        window.clearTimeout(resetTimer.current);
      }

      resetTimer.current = window.setTimeout(() => {
        setCopied(false);
        resetTimer.current = null;
      }, 1500);
    } catch {
      setCopied(false);
    }
  };

  return (
    <button
      type="button"
      aria-label={label}
      aria-live="polite"
      onClick={handleCopy}
      className={joinClasses(
        'inline-flex items-center rounded-full border border-border bg-card px-2.5 py-1 font-[var(--font-display)] text-xs font-semibold text-card-foreground shadow-sm transition-colors hover:border-accent hover:bg-muted/50 hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background active:bg-muted',
        copied && 'border-accent bg-muted text-accent',
        className
      )}
    >
      {copied ? 'Copied' : 'Copy'}
    </button>
  );
}
