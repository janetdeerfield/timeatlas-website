// NewsHub.tsx
// TimeAtlas /news route — "Dispatch" page heading, ticker below nav, light V3 theme.
// Nav label: "News". Page heading: "Dispatch". Ticker: page-scoped, below nav.
// The <style> block renders inline so prerendered HTML is fully styled.

import { useMemo, useState } from 'react';
import type { CSSProperties } from 'react';
import { Link } from 'react-router';
import { NewsTicker, type TickerItem } from './NewsTicker';
import { DstTracker, type DstPolicyData } from './DstTracker';

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

/**
 * News categories — map to Journal tags via CATEGORY_TAG_MAP below.
 */
export type NewsCategory = 'SCIENCE' | 'POLICY' | 'STANDARDS' | 'TOOLS' | 'HISTORY' | 'RESEARCH';

/**
 * Journal subcategories for cross-linking.
 * Subcategories: Learn | Guides | Developer
 * Tags: developer | business | travel | science | policy | history | dst | iana | standards
 */
export interface JournalCrossLink {
  href: string;
  label: string; // e.g. "DST Dev Guide", "Scheduling Blueprint"
}

export interface NewsArticle {
  id: string;
  title: string;
  excerpt: string;
  date: string; // ISO 8601 "YYYY-MM-DD"
  category: NewsCategory;
  /** Detail-page URL. Omit until the detail page exists — cards without an
      href render as plain articles so we never link to a 404. */
  href?: string;
  tags: string[]; // e.g. ["dst", "policy", "legislation"]
  featured?: boolean; // spans 2 cols on desktop
  readTime?: number; // minutes
  source?: string;
  /** Optional Journal article cross-link matched by shared tags/topic */
  journalLink?: JournalCrossLink;
}

// ---------------------------------------------------------------------------
// Tag taxonomy — shared bridge between News categories and Journal tags
// ---------------------------------------------------------------------------

/**
 * Maps News categories to their primary Journal tags.
 * Used for tag-based cross-linking as the Journal grows.
 */
export const CATEGORY_TAG_MAP: Record<NewsCategory, string[]> = {
  SCIENCE: ['science', 'atomic-time', 'nist'],
  POLICY: ['policy', 'dst', 'legislation'],
  STANDARDS: ['standards', 'iana', 'developer'],
  TOOLS: ['tools', 'developer'],
  HISTORY: ['history', 'standards'],
  RESEARCH: ['research', 'developer', 'databases'],
};

// ---------------------------------------------------------------------------
// Category visual config — V3 token-aligned tint palette
// ---------------------------------------------------------------------------

interface CatCfg {
  bg: string;
  color: string;
  accent: string; // top-border color on card hover
}

const CATEGORY_CFG: Record<NewsCategory, CatCfg> = {
  SCIENCE: { bg: '#EFF6FF', color: '#1e3a8a', accent: '#2563EB' },
  POLICY: { bg: '#FFFBEB', color: '#92400e', accent: '#D97706' },
  STANDARDS: { bg: '#F0FDF4', color: '#14532d', accent: '#16a34a' },
  TOOLS: { bg: '#F5F3FF', color: '#4c1d95', accent: '#7c3aed' },
  HISTORY: { bg: '#FFF1F2', color: '#881337', accent: '#e11d48' },
  RESEARCH: { bg: '#F0F9FF', color: '#0c4a6e', accent: '#0284c7' },
};

// ---------------------------------------------------------------------------
// CSS — rendered inline, strictly V3 tokens
// ---------------------------------------------------------------------------

const CSS = `
.ta-news-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 1px;
  background: #E2E8F0;
  border-top: 1px solid #E2E8F0;
  border-bottom: 1px solid #E2E8F0;
}
@media (min-width: 640px) {
  .ta-news-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); }
}
@media (min-width: 1024px) {
  .ta-news-grid { grid-template-columns: repeat(3, minmax(0, 1fr)); }
  .ta-news-card--featured { grid-column: span 2; }
}
@supports not (display: grid) {
  .ta-news-grid { display: flex; flex-wrap: wrap; }
  .ta-news-card { width: 100%; }
}

.ta-news-card {
  background: #FFFFFF;
  padding: 18px 20px 16px;
  display: flex;
  flex-direction: column;
  gap: 9px;
  position: relative;
  overflow: hidden;
  transition: background 0.12s;
  text-decoration: none;
  color: inherit;
  height: 100%;
}
.ta-news-card::after {
  content: '';
  position: absolute;
  top: 0; left: 0; right: 0;
  height: 3px;
  background: var(--ta-card-accent, transparent);
  transform: scaleX(0);
  transform-origin: left;
  transition: transform 0.2s ease;
}
.ta-news-card:hover { background: #F7F8FA; }
.ta-news-card:hover::after,
.ta-news-card:focus-visible::after { transform: scaleX(1); }

.ta-card-meta {
  display: flex;
  align-items: center;
  gap: 7px;
  flex-wrap: wrap;
}
.ta-card-cat {
  font-size: 10px;
  font-weight: 700;
  padding: 2px 7px;
  border-radius: 3px;
  font-family: ui-monospace, 'Courier New', monospace;
  letter-spacing: 0.05em;
}
.ta-card-date, .ta-card-source {
  font-size: 11px;
  color: #9BA8BC;
  font-family: ui-monospace, 'Courier New', monospace;
}
.ta-card-title {
  font-size: 13px;
  font-weight: 600;
  color: #0F172A;
  line-height: 1.4;
  letter-spacing: -0.01em;
}
.ta-news-card--featured .ta-card-title { font-size: 15px; }
.ta-card-excerpt {
  font-size: 12px;
  color: #475569;
  line-height: 1.6;
  flex: 1;
}
.ta-card-footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-top: 8px;
  border-top: 1px solid #E2E8F0;
  margin-top: auto;
  gap: 8px;
}
.ta-card-tags { display: flex; gap: 4px; flex-wrap: wrap; }
.ta-card-tag {
  font-size: 10px;
  color: #8595AD;
  background: #F1F3F5;
  padding: 1px 6px;
  border-radius: 3px;
  border: 1px solid #E2E8F0;
}
.ta-card-meta-right { display: flex; align-items: center; gap: 8px; }
.ta-card-journal {
  font-size: 10px;
  color: #224FB8;
  font-weight: 600;
  text-decoration: none;
  white-space: nowrap;
  display: flex;
  align-items: center;
  gap: 3px;
}
.ta-card-journal:hover { text-decoration: underline; text-underline-offset: 2px; }
.ta-card-readtime {
  font-size: 10px;
  color: #9BA8BC;
  font-family: ui-monospace, 'Courier New', monospace;
  white-space: nowrap;
}

.ta-section-row {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 16px 24px 12px;
}
.ta-section-label {
  font-size: 11px;
  font-weight: 700;
  color: #8595AD;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  white-space: nowrap;
}
.ta-section-rule {
  flex: 1;
  height: 1px;
  background: #E2E8F0;
}
.ta-section-count {
  font-size: 11px;
  color: #9BA8BC;
}

.ta-filter-chip {
  font-size: 11px;
  font-weight: 600;
  padding: 4px 10px;
  border-radius: 20px;
  border: 1px solid #E5E7EB;
  background: #FFFFFF;
  color: #475569;
  cursor: pointer;
  letter-spacing: 0.02em;
  transition: all 0.12s;
  font-family: system-ui, -apple-system, sans-serif;
}
.ta-filter-chip:hover { border-color: #224FB8; color: #224FB8; }
.ta-filter-chip--active {
  background: #224FB8;
  border-color: #224FB8;
  color: #FFFFFF;
}
`;

// ---------------------------------------------------------------------------
// NewsCard
// ---------------------------------------------------------------------------

function formatCardDate(iso: string): string {
  return new Date(`${iso}T00:00:00Z`).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    timeZone: 'UTC',
  });
}

function NewsCard({ article }: { article: NewsArticle }) {
  const cfg = CATEGORY_CFG[article.category];
  const date = formatCardDate(article.date);

  const body = (
    <>
      <div className="ta-card-meta">
        <span className="ta-card-cat" style={{ background: cfg.bg, color: cfg.color }}>
          {article.category}
        </span>
        <time className="ta-card-date" dateTime={article.date}>
          {date}
        </time>
        {article.source && <span className="ta-card-source">· {article.source}</span>}
      </div>

      <div className="ta-card-title">{article.title}</div>

      {article.excerpt && <div className="ta-card-excerpt">{article.excerpt}</div>}

      <div className="ta-card-footer">
        <div className="ta-card-tags">
          {article.tags.slice(0, 3).map((t) => (
            <span key={t} className="ta-card-tag">
              #{t}
            </span>
          ))}
        </div>
        <div className="ta-card-meta-right">
          {article.journalLink && (
            <Link
              to={article.journalLink.href}
              className="ta-card-journal"
              onClick={(e) => e.stopPropagation()}
              aria-label={`Related Journal article: ${article.journalLink.label}`}
            >
              ↗ {article.journalLink.label}
            </Link>
          )}
          {article.readTime && <span className="ta-card-readtime">{article.readTime} min</span>}
        </div>
      </div>
    </>
  );

  const className = `ta-news-card${article.featured ? ' ta-news-card--featured' : ''}`;
  const accentStyle = { '--ta-card-accent': cfg.accent } as CSSProperties;

  // Only render an anchor when a detail page actually exists.
  if (article.href) {
    return (
      <Link
        to={article.href}
        className={className}
        style={{ ...accentStyle, cursor: 'pointer' }}
        aria-label={`${article.category}: ${article.title}`}
      >
        {body}
      </Link>
    );
  }

  return (
    <article
      className={className}
      style={accentStyle}
      aria-label={`${article.category}: ${article.title}`}
    >
      {body}
    </article>
  );
}

// ---------------------------------------------------------------------------
// Section header
// ---------------------------------------------------------------------------

function SectionRow({ label, count }: { label: string; count?: number }) {
  return (
    <div className="ta-section-row">
      <span className="ta-section-label">{label}</span>
      <div className="ta-section-rule" aria-hidden />
      {count !== undefined && <span className="ta-section-count">{count} items</span>}
    </div>
  );
}

// ---------------------------------------------------------------------------
// NewsHub — main page component
// ---------------------------------------------------------------------------

export interface NewsHubProps {
  articles: NewsArticle[];
  tickerItems: TickerItem[];
  dstData: DstPolicyData;
}

export function NewsHub({ articles, tickerItems, dstData }: NewsHubProps) {
  const [activeFilter, setActiveFilter] = useState<NewsCategory | 'ALL'>('ALL');

  const allCategories = useMemo(
    () => Array.from(new Set(articles.map((a) => a.category))).sort() as NewsCategory[],
    [articles]
  );

  const filtered = useMemo(
    () => (activeFilter === 'ALL' ? articles : articles.filter((a) => a.category === activeFilter)),
    [articles, activeFilter]
  );

  return (
    <div style={{ background: '#F7F8FA', minHeight: '100vh' }}>
      <style data-ta="news-hub">{CSS}</style>

      {/* ── Ticker — page-scoped, sits directly below the site nav ── */}
      <NewsTicker items={tickerItems} />

      <div style={{ maxWidth: 1280, margin: '0 auto' }}>
        {/* ── Page header ── */}
        <div
          style={{
            padding: '28px 24px 0',
            display: 'flex',
            alignItems: 'flex-start',
            gap: 14,
          }}
        >
          <div
            style={{
              width: 36,
              height: 36,
              background: '#1C469C',
              borderRadius: 8,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
            }}
            aria-hidden
          >
            {/* Clock icon — inline SVG, no external deps */}
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#FFFFFF"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="12" cy="12" r="9" />
              <path d="M12 7v5l3 3" />
              <path d="M6.5 3.5l1.5 1.5M17.5 3.5l-1.5 1.5" />
            </svg>
          </div>
          <div>
            <h1
              style={{
                fontSize: 22,
                fontWeight: 700,
                color: '#0F172A',
                letterSpacing: '-0.02em',
                lineHeight: 1.2,
                margin: 0,
                fontFamily: 'system-ui, -apple-system, sans-serif',
              }}
            >
              Dispatch
            </h1>
            <p
              style={{
                fontSize: 13,
                color: '#475569',
                marginTop: 3,
                fontFamily: 'system-ui, -apple-system, sans-serif',
              }}
            >
              Time science, policy, standards, and tools — curated for the time community.
            </p>
          </div>
        </div>

        {/* ── Category filter bar ── */}
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: 6,
            padding: '18px 24px 14px',
            alignItems: 'center',
            borderBottom: '1px solid #E2E8F0',
          }}
          role="group"
          aria-label="Filter by category"
        >
          <button
            className={`ta-filter-chip${activeFilter === 'ALL' ? ' ta-filter-chip--active' : ''}`}
            onClick={() => setActiveFilter('ALL')}
            aria-pressed={activeFilter === 'ALL'}
          >
            All dispatches
          </button>
          {allCategories.map((cat) => (
            <button
              key={cat}
              className={`ta-filter-chip${activeFilter === cat ? ' ta-filter-chip--active' : ''}`}
              onClick={() => setActiveFilter(cat)}
              aria-pressed={activeFilter === cat}
            >
              {cat.charAt(0) + cat.slice(1).toLowerCase()}
            </button>
          ))}
        </div>

        {/* ── Intelligence grid ── */}
        <SectionRow label="Dispatches" count={filtered.length} />

        {filtered.length > 0 ? (
          <div className="ta-news-grid" role="list" aria-label="News articles">
            {filtered.map((article) => (
              <div key={article.id} role="listitem">
                <NewsCard article={article} />
              </div>
            ))}
          </div>
        ) : (
          <div
            style={{
              padding: '48px 24px',
              textAlign: 'center',
              fontSize: 13,
              color: '#9BA8BC',
              fontFamily: 'system-ui, -apple-system, sans-serif',
            }}
          >
            No dispatches in this category.
          </div>
        )}

        {/* ── DST Tracker ── */}
        <SectionRow label="DST Observatory" />
        <div
          style={{
            background: '#FFFFFF',
            borderTop: '1px solid #E2E8F0',
            borderBottom: '1px solid #E2E8F0',
            padding: '20px 24px 28px',
          }}
        >
          <DstTracker data={dstData} journalHref="/journal/handling-dst-conversions" />
        </div>
      </div>
    </div>
  );
}
