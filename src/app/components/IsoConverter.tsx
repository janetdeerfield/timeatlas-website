import { useState, useEffect } from 'react';
import { CopyButton } from './CopyButton';

// Strict ISO 8601 anatomy: YYYY-MM-DDTHH:MM[:SS[.fff]](Z|±HH:MM)
const ISO_RE =
  /^(\d{4})-(\d{2})-(\d{2})T(\d{2}:\d{2}(?::\d{2})?(?:\.\d+)?)(Z|[+-]\d{2}:\d{2})$/;

const PART_META = {
  year:   { label: 'Year',   bg: '#EEF2FF', color: '#1c469c' },
  sep1:   { label: '',       bg: 'transparent', color: 'var(--text-secondary)' },
  month:  { label: 'Month',  bg: '#F0FDF4', color: '#166534' },
  sep2:   { label: '',       bg: 'transparent', color: 'var(--text-secondary)' },
  day:    { label: 'Day',    bg: '#FFF7ED', color: '#9a3412' },
  sep3:   { label: '',       bg: 'transparent', color: 'var(--text-secondary)' },
  time:   { label: 'Time',   bg: '#F0F9FF', color: '#075985' },
  offset: { label: 'Offset', bg: '#FDF4FF', color: '#7e22ce' },
} as const;

type PartKey = keyof typeof PART_META;
const LABELED_PARTS = ['year', 'month', 'day', 'time', 'offset'] as const;
type AnatomyKey = (typeof LABELED_PARTS)[number];

interface Anatomy {
  year: string;
  month: string;
  day: string;
  time: string;
  offset: string;
}

interface Parsed {
  unixSeconds: number;
  utcString: string;
  anatomy: Anatomy;
}

function parse(raw: string): Parsed | null {
  const s = raw.trim();
  const date = new Date(s);
  if (isNaN(date.getTime())) return null;
  const m = s.match(ISO_RE);
  if (!m) return null;
  return {
    unixSeconds: Math.floor(date.getTime() / 1000),
    utcString: date.toISOString(),
    anatomy: { year: m[1], month: m[2], day: m[3], time: m[4], offset: m[5] },
  };
}

function localLabel(unixSeconds: number): string {
  return new Intl.DateTimeFormat(undefined, {
    dateStyle: 'long',
    timeStyle: 'long',
  }).format(new Date(unixSeconds * 1000));
}

// ---------- sub-components ----------

function ResultRow({
  label,
  value,
  mono = false,
}: {
  label: string;
  value: string;
  mono?: boolean;
}) {
  return (
    <div
      className="flex items-start justify-between gap-4 p-4 rounded-xl"
      style={{ backgroundColor: 'var(--bg-base)', border: '1px solid var(--border-subtle)' }}
    >
      <div className="min-w-0 flex-1">
        <p className="text-xs font-semibold uppercase tracking-widest mb-1" style={{ color: 'var(--text-secondary)' }}>
          {label}
        </p>
        <p
          className="text-lg font-bold break-all leading-snug"
          style={{
            color: 'var(--text-primary)',
            fontFamily: mono
              ? 'ui-monospace, "SF Mono", "Cascadia Code", "Roboto Mono", Menlo, Monaco, Consolas, "Courier New", monospace'
              : undefined,
            fontVariantNumeric: mono ? 'tabular-nums' : undefined,
          }}
        >
          {value}
        </p>
      </div>
      <div className="flex-shrink-0 pt-1">
        <CopyButton text={value} label="Copy" />
      </div>
    </div>
  );
}

function AnatomyDisplay({ anatomy }: { anatomy: Anatomy }) {
  const parts: { key: PartKey; text: string }[] = [
    { key: 'year',   text: anatomy.year },
    { key: 'sep1',   text: '-' },
    { key: 'month',  text: anatomy.month },
    { key: 'sep2',   text: '-' },
    { key: 'day',    text: anatomy.day },
    { key: 'sep3',   text: 'T' },
    { key: 'time',   text: anatomy.time },
    { key: 'offset', text: anatomy.offset },
  ];

  return (
    <div>
      {/* Color-coded string */}
      <div
        className="flex flex-wrap items-baseline gap-0 p-4 rounded-xl mb-4 overflow-x-auto"
        style={{
          backgroundColor: 'var(--bg-base)',
          border: '1px solid var(--border-subtle)',
          fontFamily:
            'ui-monospace, "SF Mono", "Cascadia Code", "Roboto Mono", Menlo, Monaco, Consolas, "Courier New", monospace',
          fontSize: '1.25rem',
          fontWeight: 700,
        }}
      >
        {parts.map(({ key, text }) => (
          <span
            key={key}
            style={{
              backgroundColor: PART_META[key].bg,
              color: PART_META[key].color,
              borderRadius: '4px',
              padding: PART_META[key].bg !== 'transparent' ? '1px 3px' : undefined,
            }}
          >
            {text}
          </span>
        ))}
      </div>

      {/* Legend grid */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
        {LABELED_PARTS.map((key: AnatomyKey) => (
          <div
            key={key}
            className="flex flex-col items-center gap-1 p-3 rounded-lg"
            style={{ backgroundColor: PART_META[key].bg, border: `1px solid ${PART_META[key].color}22` }}
          >
            <span
              className="text-sm font-bold font-mono"
              style={{ color: PART_META[key].color }}
            >
              {anatomy[key]}
            </span>
            <span className="text-xs font-semibold uppercase tracking-wider" style={{ color: PART_META[key].color, opacity: 0.7 }}>
              {PART_META[key].label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

// ---------- main component ----------

export function IsoConverter() {
  const [input, setInput] = useState('');
  // null until mounted — prevents SSR/client hydration mismatch
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const trimmed = input.trim();
  const parsed = trimmed.length > 0 ? parse(trimmed) : null;
  const isError = trimmed.length > 0 && parsed === null;

  // Local time is derived only after mount to avoid hydration mismatch
  const localTime = mounted && parsed ? localLabel(parsed.unixSeconds) : null;

  return (
    <div
      className="rounded-2xl p-6 space-y-6"
      style={{ backgroundColor: 'var(--bg-card)', border: '1px solid var(--border-subtle)' }}
    >
      {/* Input */}
      <div>
        <label
          htmlFor="iso-input"
          className="block text-sm font-semibold mb-2"
          style={{ color: 'var(--text-secondary)' }}
        >
          ISO 8601 String
        </label>
        <input
          id="iso-input"
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="e.g. 2026-06-08T12:24:00Z"
          spellCheck={false}
          autoComplete="off"
          className="w-full px-4 py-3 rounded-xl text-base outline-none transition-all"
          style={{
            fontFamily:
              'ui-monospace, "SF Mono", "Cascadia Code", "Roboto Mono", Menlo, Monaco, Consolas, "Courier New", monospace',
            backgroundColor: 'var(--bg-base)',
            color: 'var(--text-primary)',
            border: isError
              ? '1.5px solid #ef4444'
              : `1.5px solid var(--border-medium)`,
            // accent-dev focus ring applied via inline :focus workaround via CSS var
          }}
          onFocus={(e) => {
            e.currentTarget.style.borderColor = 'var(--accent-dev)';
            e.currentTarget.style.boxShadow = '0 0 0 3px color-mix(in srgb, var(--accent-dev) 15%, transparent)';
          }}
          onBlur={(e) => {
            e.currentTarget.style.borderColor = isError ? '#ef4444' : 'var(--border-medium)';
            e.currentTarget.style.boxShadow = 'none';
          }}
        />
        {isError && (
          <p className="mt-2 text-sm font-medium" style={{ color: '#ef4444' }}>
            Not a valid ISO 8601 string. Expected format: <code>YYYY-MM-DDTHH:MM:SSZ</code> or with a UTC offset like <code>+05:30</code>.
          </p>
        )}
      </div>

      {/* Results */}
      {parsed && (
        <>
          <div className="space-y-3">
            <ResultRow
              label="Unix Timestamp (seconds)"
              value={String(parsed.unixSeconds)}
              mono
            />
            {localTime && (
              <ResultRow
                label="Local Browser Time"
                value={localTime}
              />
            )}
            <ResultRow
              label="Normalized UTC String"
              value={parsed.utcString}
              mono
            />
          </div>

          <div>
            <p className="text-xs font-semibold uppercase tracking-widest mb-3" style={{ color: 'var(--text-secondary)' }}>
              String Anatomy
            </p>
            <AnatomyDisplay anatomy={parsed.anatomy} />
          </div>
        </>
      )}

      {/* Empty state hint */}
      {!trimmed && (
        <p className="text-sm text-center py-4" style={{ color: 'var(--text-secondary)' }}>
          Paste or type an ISO 8601 timestamp above — results appear instantly.
        </p>
      )}
    </div>
  );
}
