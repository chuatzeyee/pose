import { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabase';
import { personalityDescriptions } from '../../data/personalities';

// DB check constraints enforce valid types, but guard anyway so one bad row can't blank the dashboard
const typeLabel = (type, pct) =>
  `${personalityDescriptions[type]?.emoji ?? '❓'} ${type} (${pct}%)`;
import { StatTile, TypeDistribution, ResponsesPerDay } from './Charts';

function Login({ onError, error }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [busy, setBusy] = useState(false);

  const signIn = async (e) => {
    e.preventDefault();
    setBusy(true);
    const { error: err } = await supabase.auth.signInWithPassword({ email, password });
    setBusy(false);
    if (err) onError(err.message);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <form onSubmit={signIn} className="bg-white rounded-2xl border border-gray-200 p-8 w-full max-w-sm space-y-4">
        <h1 className="text-2xl font-semibold text-gray-900">POSE Admin</h1>
        <p className="text-sm text-gray-500">Sign in to review quiz results.</p>
        <input
          type="email" required value={email} onChange={(e) => setEmail(e.target.value)}
          placeholder="Email" aria-label="Email"
          className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="password" required value={password} onChange={(e) => setPassword(e.target.value)}
          placeholder="Password" aria-label="Password"
          className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        {error && <p className="text-sm text-red-600">{error}</p>}
        <button
          type="submit" disabled={busy}
          className="w-full bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white font-semibold rounded-lg py-2.5"
        >
          {busy ? 'Signing in…' : 'Sign in'}
        </button>
      </form>
    </div>
  );
}

function exportCsv(rows) {
  const header = 'created_at,primary_type,primary_pct,secondary_type,secondary_pct,na_count\n';
  // prefix guards against spreadsheet formula injection (=,+,-,@)
  const esc = (v) => {
    const s = String(v).replace(/"/g, '""');
    return `"${/^[=+\-@]/.test(s) ? `'${s}` : s}"`;
  };
  const body = rows
    .map((r) => [r.created_at, r.primary_type, r.primary_pct, r.secondary_type, r.secondary_pct, r.na_count].map(esc).join(','))
    .join('\n');
  const url = URL.createObjectURL(new Blob([header + body], { type: 'text/csv' }));
  const a = document.createElement('a');
  a.href = url;
  a.download = 'pose-results.csv';
  a.click();
  URL.revokeObjectURL(url);
}

export default function Admin() {
  const [session, setSession] = useState(null);
  const [rows, setRows] = useState(null);
  const [loadError, setLoadError] = useState('');
  const [authError, setAuthError] = useState('');

  useEffect(() => {
    if (!supabase) return;
    supabase.auth.getSession().then(({ data }) => setSession(data.session));
    const { data: sub } = supabase.auth.onAuthStateChange((_e, s) => setSession(s));
    return () => sub.subscription.unsubscribe();
  }, []);

  useEffect(() => {
    if (!session) { setRows(null); return; }
    supabase
      .from('pose_results')
      .select('id, created_at, primary_type, primary_pct, secondary_type, secondary_pct, na_count')
      .order('created_at', { ascending: false })
      .limit(2000)
      .then(({ data, error }) => {
        if (error) setLoadError(error.message);
        else setRows(data);
      });
  }, [session]);

  if (!supabase) return <p className="p-8 text-gray-600">Supabase is not configured.</p>;
  if (!session) return <Login error={authError} onError={setAuthError} />;
  if (loadError) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4 text-center">
        <div>
          <p className="text-gray-700 mb-2">Could not load results: {loadError}</p>
          <button onClick={() => supabase.auth.signOut()} className="text-blue-600 underline">Sign out</button>
        </div>
      </div>
    );
  }
  if (!rows) return <p className="p-8 text-gray-500">Loading results…</p>;

  const weekAgo = Date.now() - 7 * 86400e3;
  const thisWeek = rows.filter((r) => new Date(r.created_at).getTime() > weekAgo).length;
  const counts = {};
  rows.forEach((r) => { counts[r.primary_type] = (counts[r.primary_type] || 0) + 1; });
  const topType = Object.entries(counts).sort((a, b) => b[1] - a[1])[0]?.[0];

  const accessDenied = rows.length === 0;

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-8">
      <div className="max-w-5xl mx-auto space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-semibold text-gray-900">POSE Results Dashboard</h1>
          <div className="flex items-center gap-4">
            <button onClick={() => exportCsv(rows)} className="text-sm text-blue-600 hover:underline" disabled={!rows.length}>
              Export CSV
            </button>
            <button onClick={() => supabase.auth.signOut()} className="text-sm text-gray-500 hover:underline">
              Sign out ({session.user.email})
            </button>
          </div>
        </div>

        {accessDenied && (
          <p className="bg-amber-50 border border-amber-200 text-amber-800 rounded-xl p-4 text-sm">
            No results visible. Either no one has taken the quiz yet, or your account is not in the
            pose_admins table — ask the site owner to add you.
          </p>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <StatTile label="Total responses" value={rows.length} />
          <StatTile label="Last 7 days" value={thisWeek} />
          <StatTile
            label="Most common type"
            value={topType ? `${personalityDescriptions[topType]?.emoji ?? '❓'} ${topType}` : '—'}
          />
        </div>

        <TypeDistribution counts={counts} total={rows.length} />
        <ResponsesPerDay rows={rows} />

        <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
          <h3 className="font-semibold text-gray-800 p-5 pb-0">All responses</h3>
          <div className="overflow-x-auto p-5">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-gray-500 border-b border-gray-200">
                  <th className="py-2 pr-4 font-medium">Date</th>
                  <th className="py-2 pr-4 font-medium">Primary</th>
                  <th className="py-2 pr-4 font-medium">Secondary</th>
                  <th className="py-2 font-medium">N/A</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((r) => (
                  <tr key={r.id} className="border-b border-gray-100">
                    <td className="py-2 pr-4 text-gray-600 whitespace-nowrap tabular-nums">
                      {new Date(r.created_at).toLocaleString()}
                    </td>
                    <td className="py-2 pr-4">
                      {typeLabel(r.primary_type, r.primary_pct)}
                    </td>
                    <td className="py-2 pr-4">
                      {typeLabel(r.secondary_type, r.secondary_pct)}
                    </td>
                    <td className="py-2 tabular-nums">{r.na_count}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
