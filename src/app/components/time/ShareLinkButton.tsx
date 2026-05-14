import { useEffect, useMemo, useState } from 'react';
import { CopyToClipboardButton } from './CopyToClipboardButton';

type ShareStateValue =
  | string
  | number
  | boolean
  | null
  | undefined
  | Array<string | number | boolean>;

export interface ShareLinkButtonProps {
  state: Record<string, ShareStateValue>;
  label: string;
  className?: string;
}

function buildQueryString(state: ShareLinkButtonProps['state']): string {
  const params = new URLSearchParams();

  Object.entries(state).forEach(([key, value]) => {
    if (value === null || value === undefined) return;

    if (Array.isArray(value)) {
      if (value.length > 0) {
        params.set(key, value.map(String).join(','));
      }
      return;
    }

    params.set(key, String(value));
  });

  return params.toString();
}

export function ShareLinkButton({ state, label, className }: ShareLinkButtonProps) {
  const queryString = useMemo(() => buildQueryString(state), [state]);
  const fallbackValue = queryString ? `?${queryString}` : '';
  const [shareUrl, setShareUrl] = useState(fallbackValue);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const url = new URL(window.location.href);
    url.search = queryString;
    setShareUrl(url.toString());
  }, [queryString]);

  return (
    <CopyToClipboardButton
      value={shareUrl}
      label={label}
      idleText={label}
      copiedText="Copied link"
      className={className}
    />
  );
}
