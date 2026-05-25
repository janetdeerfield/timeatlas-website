interface TimeTableProps {
  conversions: Array<{ from: string; to: string }>;
  fromZoneAbbr: string;
  toZoneAbbr: string;
}

const GROUPS = [
  { label: 'Morning', range: [0, 11] as [number, number] },
  { label: 'Afternoon', range: [12, 16] as [number, number] },
  { label: 'Evening', range: [17, 23] as [number, number] },
];

function RowGroup({
  rows,
  fromZoneAbbr,
  toZoneAbbr,
}: {
  rows: Array<{ from: string; to: string; idx: number }>;
  fromZoneAbbr: string;
  toZoneAbbr: string;
}) {
  return (
    <table className="w-full text-left text-sm">
      <thead className="sr-only">
        <tr>
          <th>{fromZoneAbbr}</th>
          <th>{toZoneAbbr}</th>
        </tr>
      </thead>
      <tbody>
        {rows.map((row) => (
          <tr
            key={row.from}
            className={`border-b border-slate-50 hover:bg-slate-50 transition-colors ${
              row.idx % 2 === 0 ? '' : 'bg-slate-50/50'
            }`}
          >
            <td className="py-2.5 pr-6 text-slate-700">{row.from}</td>
            <td className="py-2.5 font-medium text-slate-900">{row.to}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export function TimeTable({ conversions, fromZoneAbbr, toZoneAbbr }: TimeTableProps) {
  return (
    <div className="overflow-x-auto">
      {/* Shared column headers */}
      <table className="w-full text-left text-sm mb-1">
        <thead>
          <tr className="border-b border-slate-100">
            <th className="pb-3 pr-6 font-semibold text-slate-500 text-xs uppercase tracking-wider">
              {fromZoneAbbr}
            </th>
            <th className="pb-3 font-semibold text-slate-500 text-xs uppercase tracking-wider">
              {toZoneAbbr}
            </th>
          </tr>
        </thead>
      </table>

      {GROUPS.map(({ label, range: [start, end] }) => {
        const groupRows = conversions
          .map((row, idx) => ({ ...row, idx }))
          .filter(({ idx }) => idx >= start && idx <= end);

        return (
          <details key={label} className="group mb-1">
            <summary className="flex items-center justify-between cursor-pointer select-none px-1 py-2 rounded hover:bg-slate-50 text-xs font-semibold uppercase tracking-wider text-slate-400 list-none [&::-webkit-details-marker]:hidden">
              {label}
              <svg
                className="w-3.5 h-3.5 text-slate-400 transition-transform group-open:rotate-180"
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
                  clipRule="evenodd"
                />
              </svg>
            </summary>
            <RowGroup rows={groupRows} fromZoneAbbr={fromZoneAbbr} toZoneAbbr={toZoneAbbr} />
          </details>
        );
      })}
    </div>
  );
}
