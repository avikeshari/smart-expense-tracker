import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import { formatCurrency } from '../utils/calculations';

const PIE_COLORS = ['#22d3ee', '#38bdf8', '#818cf8', '#f472b6', '#f59e0b'];

function CustomTooltip({ active, payload, label }) {
  if (!active || !payload?.length) return null;

  return (
    <div className="rounded-2xl border border-white/10 bg-slate-950/95 px-4 py-3 text-sm text-slate-100 shadow-soft">
      {label ? <p className="font-semibold text-cyan-300">{label}</p> : null}
      <p>{payload[0].name}: {formatCurrency(payload[0].value)}</p>
    </div>
  );
}

export default function ExpenseChart({ categoryTotals }) {
  const chartData = categoryTotals.filter((item) => item.total > 0);

  return (
    <section className="rounded-3xl border border-white/10 bg-slate-900/80 p-5 shadow-soft backdrop-blur">
      <div className="mb-5">
        <h2 className="text-xl font-semibold text-white">Spending Analytics</h2>
        <p className="mt-1 text-sm text-slate-400">
          Category-wise breakdown updates in real time.
        </p>
      </div>

      <div className="grid gap-6 xl:grid-cols-2">
        <div className="h-80 rounded-3xl border border-white/10 bg-slate-950/70 p-3">
          <p className="mb-2 px-2 text-sm font-medium text-slate-300">Pie Chart</p>
          <ResponsiveContainer width="100%" height="90%">
            <PieChart>
              <Pie
                data={chartData}
                dataKey="total"
                nameKey="category"
                cx="50%"
                cy="50%"
                outerRadius={100}
                innerRadius={55}
                paddingAngle={2}
                label={({ category, percent }) =>
                  percent ? `${category} ${(percent * 100).toFixed(0)}%` : category
                }
              >
                {chartData.map((entry, index) => (
                  <Cell key={`pie-${entry.category}`} fill={PIE_COLORS[index % PIE_COLORS.length]} />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="h-80 rounded-3xl border border-white/10 bg-slate-950/70 p-3">
          <p className="mb-2 px-2 text-sm font-medium text-slate-300">Bar Graph</p>
          <ResponsiveContainer width="100%" height="90%">
            <BarChart data={categoryTotals}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.08)" />
              <XAxis dataKey="category" stroke="#cbd5e1" />
              <YAxis stroke="#cbd5e1" tickFormatter={(value) => `${value}`} />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="total" radius={[12, 12, 0, 0]}>
                {categoryTotals.map((entry, index) => (
                  <Cell key={`bar-${entry.category}`} fill={PIE_COLORS[index % PIE_COLORS.length]} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </section>
  );
}
