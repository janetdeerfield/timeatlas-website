// NewsTicker.tsx
// TimeAtlas News — page-level ticker, sits below the nav on /news only.
// Pure CSS keyframe scroll. Zero external dependencies.
// The <style> block renders inline (not injected via document.createElement)
// so the ticker is fully styled in prerendered HTML before hydration.

import type { CSSProperties } from 'react';

export interface TickerItem {
  date: string; // "MM/DD/YYYY"
  text: string;
  href?: string;
}

interface NewsTickerProps {
  items: TickerItem[];
  /** Full scroll cycle in seconds. Default: 52 */
  speed?: number;
}

const CSS = `
@keyframes ta-ticker {
  0%   { transform: translateX(0); }
  100% { transform: translateX(-50%); }
}

.ta-ticker {
  height: 34px;
  background: #1C469C; /* accent/news */
  overflow: hidden;
  display: flex;
  align-items: center;
  position: relative;
  border-bottom: 1px solid #1a3f8f;
  flex-shrink: 0;
}

/* Fade edges */
.ta-ticker::before,
.ta-ticker::after {
  content: '';
  position: absolute;
  top: 0;
  height: 100%;
  width: 48px;
  z-index: 2;
  pointer-events: none;
}
.ta-ticker::before {
  left: 72px;
  background: linear-gradient(to right, #1C469C 20%, transparent);
}
.ta-ticker::after {
  right: 0;
  background: linear-gradient(to left, #1C469C 20%, transparent);
}

/* LIVE pill */
.ta-ticker__label {
  position: absolute;
  left: 0;
  top: 0;
  height: 100%;
  display: flex;
  align-items: center;
  padding: 0 12px;
  background: rgba(0, 0, 0, 0.18);
  color: #FFFFFF;
  font-family: ui-monospace, 'Courier New', monospace;
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 0.14em;
  z-index: 3;
  white-space: nowrap;
  user-select: none;
}

.ta-ticker__outer {
  overflow: hidden;
  width: 100%;
  padding-left: 80px;
}

.ta-ticker__track {
  display: flex;
  white-space: nowrap;
  will-change: transform;
  animation: ta-ticker var(--ta-ticker-speed, 52s) linear infinite;
}

.ta-ticker__track:hover {
  animation-play-state: paused;
}

.ta-ticker__item {
  display: inline-flex;
  align-items: center;
  gap: 5px;
  padding-right: 20px;
  font-family: ui-monospace, 'Courier New', monospace;
  font-size: 11px;
  color: rgba(255, 255, 255, 0.82);
  letter-spacing: 0.02em;
}

.ta-ticker__item a {
  color: inherit;
  text-decoration: none;
}
.ta-ticker__item a:hover {
  text-decoration: underline;
  text-underline-offset: 2px;
}

.ta-ticker__date {
  color: rgba(255, 255, 255, 0.48);
}

.ta-ticker__sep {
  color: rgba(255, 255, 255, 0.2);
  padding: 0 10px;
  user-select: none;
}

@media (prefers-reduced-motion: reduce) {
  .ta-ticker__track {
    animation: none;
  }
}
`;

export function NewsTicker({ items, speed = 52 }: NewsTickerProps) {
  if (!items.length) return null;

  // Double the list so the CSS loop seam is invisible
  const doubled = [...items, ...items];

  const renderItem = (item: TickerItem, idx: number) => (
    <span key={idx} className="ta-ticker__item">
      <span className="ta-ticker__date">[{item.date}]</span>
      {item.href ? (
        <a href={item.href} rel="noopener noreferrer">
          {item.text}
        </a>
      ) : (
        <span>{item.text}</span>
      )}
      <span className="ta-ticker__sep" aria-hidden>
        ◆
      </span>
    </span>
  );

  return (
    <>
      <style data-ta="ticker">{CSS}</style>
      <div
        className="ta-ticker"
        role="marquee"
        aria-label="Latest time science and policy news"
        aria-live="off"
      >
        <span className="ta-ticker__label" aria-hidden>
          LIVE
        </span>
        <div className="ta-ticker__outer">
          <div
            className="ta-ticker__track"
            style={{ '--ta-ticker-speed': `${speed}s` } as CSSProperties}
          >
            {doubled.map(renderItem)}
          </div>
        </div>
      </div>
    </>
  );
}
