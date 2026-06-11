// DstTracker.tsx
// DST Legislative Status Board.
// Status colors: Permanent = blue, Pending Federal = yellow, Biannual Shift = green.
// Strictly uses TimeAtlas V3 design tokens. System fonts only.

import { Fragment, useMemo, useState } from 'react';
import type { CSSProperties } from 'react';
import { Link } from 'react-router';

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export type DstStatus =
  | 'permanent_standard' // Blue  — resolved, stable law (AZ, HI)
  | 'pending_federal' // Yellow — state passed, awaiting Congress
  | 'biannual_shift'; // Green  — current active law (status quo)

export interface DstRegion {
  id: string; // Two-letter postal code
  name: string;
  status: DstStatus;
  legislation: string | null;
  notes: string;
  since?: string;
}

export interface DstPolicyData {
  meta: {
    last_updated: string;
    source: string;
    note: string;
  };
  regions: DstRegion[];
}

// ---------------------------------------------------------------------------
// Status config — TimeAtlas V3 tokens, blue/yellow/green palette
// ---------------------------------------------------------------------------

interface StatusCfg {
  label: string;
  dotColor: string;
  badgeBg: string;
  badgeText: string;
  description: string;
}

const STATUS: Record<DstStatus, StatusCfg> = {
  permanent_standard: {
    label: 'Permanent',
    dotColor: '#2563EB',
    badgeBg: '#EFF6FF',
    badgeText: '#1e3a8a',
    description: 'Resolved, stable law — clock never changes.',
  },
  pending_federal: {
    label: 'Pending Federal',
    dotColor: '#D97706',
    badgeBg: '#FFFBEB',
    badgeText: '#92400e',
    description: 'State legislation passed, awaiting federal authorization.',
  },
  biannual_shift: {
    label: 'Biannual Shift',
    dotColor: '#16a34a',
    badgeBg: '#F0FDF4',
    badgeText: '#14532d',
    description: 'Current active law — clocks change twice per year.',
  },
};

type FilterStatus = DstStatus | 'all';
type SortKey = 'id' | 'name';

// ---------------------------------------------------------------------------
// Atoms
// ---------------------------------------------------------------------------

function Dot({ status }: { status: DstStatus }) {
  return (
    <span
      aria-hidden
      style={{
        display: 'inline-block',
        width: 8,
        height: 8,
        borderRadius: '50%',
        background: STATUS[status].dotColor,
        flexShrink: 0,
      }}
    />
  );
}

function Badge({ status }: { status: DstStatus }) {
  const cfg = STATUS[status];
  return (
    <span
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 5,
        padding: '2px 8px 2px 6px',
        borderRadius: 4,
        background: cfg.badgeBg,
        color: cfg.badgeText,
        fontFamily: "ui-monospace, 'Courier New', monospace",
        fontSize: 11,
        fontWeight: 600,
        letterSpacing: '0.03em',
        whiteSpace: 'nowrap',
      }}
    >
      <Dot status={status} />
      {cfg.label}
    </span>
  );
}

// ---------------------------------------------------------------------------
// Summary bar
// ---------------------------------------------------------------------------

function Summary({ regions }: { regions: DstRegion[] }) {
  const counts = useMemo(() => {
    const c = { permanent_standard: 0, pending_federal: 0, biannual_shift: 0 };
    regions.forEach((r) => c[r.status]++);
    return c;
  }, [regions]);

  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gap: 8,
        marginBottom: 18,
      }}
    >
      {(['permanent_standard', 'pending_federal', 'biannual_shift'] as DstStatus[]).map((s) => {
        const cfg = STATUS[s];
        return (
          <div
            key={s}
            style={{
              background: '#FFFFFF',
              border: '1px solid #E2E8F0',
              borderRadius: 8,
              padding: '12px 14px',
            }}
          >
            <div
              style={{
                fontFamily: "ui-monospace, 'Courier New', monospace",
                fontSize: 26,
                fontWeight: 700,
                color: cfg.dotColor,
                lineHeight: 1,
              }}
            >
              {counts[s]}
            </div>
            <div
              style={{
                fontSize: 10,
                color: '#8595AD',
                textTransform: 'uppercase',
                letterSpacing: '0.08em',
                marginTop: 3,
              }}
            >
              {cfg.label}
            </div>
          </div>
        );
      })}
    </div>
  );
}

// ---------------------------------------------------------------------------
// Legend
// ---------------------------------------------------------------------------

function Legend() {
  return (
    <div
      style={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: '6px 24px',
        marginBottom: 14,
        paddingBottom: 12,
        borderBottom: '1px solid #E2E8F0',
      }}
    >
      {(Object.entries(STATUS) as [DstStatus, StatusCfg][]).map(([key, cfg]) => (
        <span
          key={key}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 7,
            fontSize: 12,
            color: '#475569',
          }}
        >
          <Dot status={key} />
          <strong style={{ color: cfg.badgeText }}>{cfg.label}</strong>
          <span>— {cfg.description}</span>
        </span>
      ))}
    </div>
  );
}

// ---------------------------------------------------------------------------
// Toolbar
// ---------------------------------------------------------------------------

const chipBase: CSSProperties = {
  fontSize: 11,
  fontWeight: 600,
  padding: '4px 10px',
  borderRadius: 20,
  border: '1px solid #E5E7EB',
  background: '#FFFFFF',
  color: '#475569',
  cursor: 'pointer',
  letterSpacing: '0.02em',
  transition: 'all 0.12s',
  fontFamily: 'system-ui, -apple-system, sans-serif',
};

const chipActive: CSSProperties = {
  ...chipBase,
  background: '#224FB8',
  borderColor: '#224FB8',
  color: '#FFFFFF',
};

interface ToolbarProps {
  filter: FilterStatus;
  setFilter: (v: FilterStatus) => void;
  sort: SortKey;
  setSort: (v: SortKey) => void;
  search: string;
  setSearch: (v: string) => void;
}

function Toolbar({ filter, setFilter, sort, setSort, search, setSearch }: ToolbarProps) {
  return (
    <div
      style={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: 6,
        alignItems: 'center',
        marginBottom: 12,
      }}
    >
      <input
        type="search"
        placeholder="Search state…"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        aria-label="Search state by name"
        style={{
          fontSize: 12,
          padding: '5px 10px',
          border: '1px solid #E5E7EB',
          borderRadius: 6,
          background: '#FFFFFF',
          color: '#0F172A',
          outline: 'none',
          width: 140,
          fontFamily: 'system-ui, -apple-system, sans-serif',
        }}
      />

      {(['all', 'permanent_standard', 'pending_federal', 'biannual_shift'] as FilterStatus[]).map(
        (f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            style={filter === f ? chipActive : chipBase}
            aria-pressed={filter === f}
          >
            {
              {
                all: 'All',
                permanent_standard: 'Permanent',
                pending_federal: 'Pending',
                biannual_shift: 'Biannual',
              }[f]
            }
          </button>
        )
      )}

      <div
        style={{
          marginLeft: 'auto',
          display: 'flex',
          alignItems: 'center',
          gap: 5,
          fontSize: 11,
          color: '#8595AD',
        }}
      >
        <span>Sort:</span>
        {(['id', 'name'] as SortKey[]).map((s) => (
          <button
            key={s}
            onClick={() => setSort(s)}
            style={sort === s ? chipActive : chipBase}
            aria-pressed={sort === s}
          >
            {s === 'id' ? 'ST' : 'Name'}
          </button>
        ))}
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Main component
// ---------------------------------------------------------------------------

export interface DstTrackerProps {
  data: DstPolicyData;
  /** Link to the DST journal article for the footer cross-link */
  journalHref?: string;
}

export function DstTracker({
  data,
  journalHref = '/journal/handling-dst-conversions',
}: DstTrackerProps) {
  const [filter, setFilter] = useState<FilterStatus>('all');
  const [sort, setSort] = useState<SortKey>('id');
  const [search, setSearch] = useState('');
  const [expanded, setExpanded] = useState<string | null>(null);

  const filtered = useMemo(() => {
    let list = data.regions;
    if (filter !== 'all') list = list.filter((r) => r.status === filter);
    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter((r) => r.name.toLowerCase().includes(q) || r.id.toLowerCase().includes(q));
    }
    return [...list].sort((a, b) =>
      sort === 'name' ? a.name.localeCompare(b.name) : a.id.localeCompare(b.id)
    );
  }, [data.regions, filter, sort, search]);

  const cell: CSSProperties = {
    padding: '8px 10px',
    borderBottom: '1px solid #E2E8F0',
    verticalAlign: 'middle',
  };

  const headCell: CSSProperties = {
    padding: '7px 10px',
    fontSize: 10,
    fontWeight: 700,
    color: '#8595AD',
    textTransform: 'uppercase' as const,
    letterSpacing: '0.08em',
    background: '#F1F3F5',
    borderBottom: '1px solid #E5E7EB',
    textAlign: 'left' as const,
  };

  return (
    <section aria-label="DST Legislative Status Tracker">
      <Summary regions={data.regions} />
      <Legend />
      <Toolbar
        filter={filter}
        setFilter={setFilter}
        sort={sort}
        setSort={setSort}
        search={search}
        setSearch={setSearch}
      />

      <div
        style={{
          border: '1px solid #E2E8F0',
          borderRadius: 8,
          overflow: 'hidden',
        }}
        role="region"
        aria-label="DST status by state"
      >
        <table
          style={{
            width: '100%',
            borderCollapse: 'collapse',
            fontSize: 12,
            tableLayout: 'fixed',
            fontFamily: 'system-ui, -apple-system, sans-serif',
          }}
        >
          <thead>
            <tr>
              <th scope="col" style={{ ...headCell, width: 44 }}>
                ST
              </th>
              <th scope="col" style={headCell}>
                State
              </th>
              <th scope="col" style={{ ...headCell, width: 160 }}>
                Status
              </th>
              <th scope="col" style={headCell}>
                Legislation
              </th>
              <th scope="col" style={{ ...headCell, width: 32 }} aria-label="Notes" />
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 ? (
              <tr>
                <td
                  colSpan={5}
                  style={{
                    ...cell,
                    textAlign: 'center',
                    padding: '28px 10px',
                    color: '#9BA8BC',
                  }}
                >
                  No matching states.
                </td>
              </tr>
            ) : (
              filtered.map((region) => {
                const isOpen = expanded === region.id;
                return (
                  <Fragment key={region.id}>
                    <tr
                      style={{
                        background: isOpen ? '#F1F3F5' : '#FFFFFF',
                        transition: 'background 0.1s',
                      }}
                    >
                      <td
                        style={{
                          ...cell,
                          fontFamily: "ui-monospace, 'Courier New', monospace",
                          fontSize: 11,
                          fontWeight: 700,
                          color: '#8595AD',
                          textAlign: 'center',
                        }}
                      >
                        {region.id}
                      </td>

                      <td style={{ ...cell, fontWeight: 500, color: '#0F172A' }}>
                        {region.name}
                        {region.since && (
                          <span
                            style={{
                              fontSize: 10,
                              color: '#9BA8BC',
                              marginLeft: 6,
                            }}
                          >
                            since {region.since}
                          </span>
                        )}
                      </td>

                      <td style={cell}>
                        <Badge status={region.status} />
                      </td>

                      <td style={{ ...cell, fontSize: 11, color: '#475569' }}>
                        {region.legislation ?? <span style={{ opacity: 0.35 }}>—</span>}
                      </td>

                      <td style={{ ...cell, textAlign: 'center' }}>
                        <button
                          onClick={() => setExpanded(isOpen ? null : region.id)}
                          aria-expanded={isOpen}
                          aria-label={`${isOpen ? 'Hide' : 'Show'} notes for ${region.name}`}
                          style={{
                            background: 'none',
                            border: 'none',
                            cursor: 'pointer',
                            color: '#9BA8BC',
                            fontSize: 14,
                            lineHeight: 1,
                            padding: '2px 4px',
                            transition: 'transform 0.15s, color 0.12s',
                            transform: isOpen ? 'rotate(90deg)' : 'none',
                          }}
                        >
                          ›
                        </button>
                      </td>
                    </tr>

                    {isOpen && (
                      <tr style={{ background: '#F7F8FA' }}>
                        <td
                          colSpan={5}
                          style={{
                            padding: '6px 10px 10px 36px',
                            fontSize: 11,
                            color: '#475569',
                            borderBottom: '1px solid #E2E8F0',
                          }}
                        >
                          {region.notes}
                        </td>
                      </tr>
                    )}
                  </Fragment>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      {/* Footer: source note + Journal cross-link */}
      <p
        style={{
          fontSize: 11,
          color: '#9BA8BC',
          marginTop: 10,
          display: 'flex',
          flexWrap: 'wrap',
          gap: '0 8px',
        }}
      >
        <span>
          * {data.meta.note} Source: {data.meta.source}, updated {data.meta.last_updated}.
        </span>
        {journalHref && (
          <Link
            to={journalHref}
            style={{ color: '#224FB8', fontWeight: 600, textDecoration: 'none' }}
          >
            Read the DST Developer Guide →
          </Link>
        )}
      </p>
    </section>
  );
}
