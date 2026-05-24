interface TimeTableProps {
  conversions: Array<{ from: string; to: string }>;
  fromZoneAbbr: string;
  toZoneAbbr: string;
}

/**
 * Ultra-clean "Compare Times" two-column table.
 * Uses zone abbreviations as column headers, with only light dividers.
 */
export function TimeTable({ conversions, fromZoneAbbr, toZoneAbbr }: TimeTableProps) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left text-sm">
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
        <tbody>
          {conversions.map((row, idx) => (
            <tr
              key={row.from}
              className={`border-b border-slate-50 hover:bg-slate-50 transition-colors ${
                idx % 2 === 0 ? '' : 'bg-slate-50/50'
              }`}
            >
              <td className="py-2.5 pr-6 text-slate-700">{row.from}</td>
              <td className="py-2.5 text-slate-900 font-medium">{row.to}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
