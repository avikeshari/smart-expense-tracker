import { CATEGORY_OPTIONS, formatCurrency, getAverageExpense } from '../utils/calculations';

function Card({ title, value, subtitle }) {
  return (
    <div className="rounded-3xl border border-white/10 bg-slate-900/80 p-5 shadow-soft">
      <p className="text-sm text-slate-400">{title}</p>
      <h3 className="mt-2 text-2xl font-semibold text-white">{value}</h3>
      {subtitle ? <p className="mt-2 text-sm text-slate-500">{subtitle}</p> : null}
    </div>
  );
}

export default function SummaryCards({ expenses, categoryTotals, visibleCount }) {
  const totalSpent = expenses.reduce((sum, item) => sum + Number(item.amount || 0), 0);
  const averageExpense = getAverageExpense(expenses);
  const topCategory = [...categoryTotals].sort((a, b) => b.total - a.total)[0];

  return (
    <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
      <Card
        title="Total Spent"
        value={formatCurrency(totalSpent)}
        subtitle={`Across ${expenses.length} expense${expenses.length === 1 ? '' : 's'}`}
      />
      <Card
        title="Visible Results"
        value={visibleCount.toString()}
        subtitle="After applying filters and sorting"
      />
      <Card
        title="Average Expense"
        value={formatCurrency(averageExpense)}
        subtitle="Mean value of all recorded expenses"
      />
      <Card
        title="Top Category"
        value={topCategory && topCategory.total > 0 ? topCategory.category : '—'}
        subtitle={topCategory && topCategory.total > 0 ? formatCurrency(topCategory.total) : 'No spending yet'}
      />
    </section>
  );
}
