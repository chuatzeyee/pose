import { personalityDescriptions, BAR_ORDER } from '../../data/personalities';

export function StatTile({ label, value, hint }) {
  return (
    <div className="bg-white rounded-2xl border border-gray-200 p-5">
      <div className="text-sm text-gray-500">{label}</div>
      <div className="text-4xl font-semibold text-gray-900 mt-1">{value}</div>
      {hint && <div className="text-xs text-gray-400 mt-1">{hint}</div>}
    </div>
  );
}

export function TypeDistribution({ counts, total }) {
  return (
    <div className="bg-white rounded-2xl border border-gray-200 p-5">
      <h3 className="font-semibold text-gray-800 mb-4">Primary personality distribution</h3>
      {total === 0 ? (
        <p className="text-sm text-gray-400">No responses yet.</p>
      ) : (
        <div className="space-y-3">
          {BAR_ORDER.map((type) => {
            const n = counts[type] || 0;
            const pct = Math.round((n / total) * 100);
            return (
              <div key={type} className="flex items-center gap-3" title={`${type}: ${n} (${pct}%)`}>
                <span className="w-24 text-sm text-gray-600 shrink-0">
                  {personalityDescriptions[type].emoji} {type}
                </span>
                <div className="flex-1 bg-gray-100 rounded h-6 overflow-hidden">
                  <div
                    className="h-6 rounded-r"
                    style={{ width: `${pct}%`, backgroundColor: personalityDescriptions[type].hex, minWidth: n > 0 ? 4 : 0 }}
                  />
                </div>
                <span className="w-20 text-sm text-gray-700 text-right tabular-nums shrink-0">
                  {n} ({pct}%)
                </span>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

const localDay = (d) =>
  `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;

export function ResponsesPerDay({ rows }) {
  const days = [...Array(30)].map((_, i) => {
    const d = new Date();
    d.setDate(d.getDate() - (29 - i));
    return localDay(d);
  });
  const counts = Object.fromEntries(days.map((d) => [d, 0]));
  rows.forEach((r) => {
    const day = localDay(new Date(r.created_at));
    if (day in counts) counts[day] += 1;
  });
  const max = Math.max(1, ...Object.values(counts));

  return (
    <div className="bg-white rounded-2xl border border-gray-200 p-5">
      <h3 className="font-semibold text-gray-800 mb-4">Responses per day (last 30 days)</h3>
      <div className="flex items-end gap-0.5 h-24">
        {days.map((d) => (
          <div key={d} className="flex-1 flex flex-col justify-end group relative" title={`${d}: ${counts[d]}`}>
            <div
              className="rounded-t bg-blue-600 group-hover:bg-blue-800 transition-colors"
              style={{ height: `${(counts[d] / max) * 100}%`, minHeight: counts[d] > 0 ? 3 : 1 }}
            />
          </div>
        ))}
      </div>
      <div className="flex justify-between text-xs text-gray-400 mt-2">
        <span>{days[0]}</span>
        <span>{days[days.length - 1]}</span>
      </div>
    </div>
  );
}
