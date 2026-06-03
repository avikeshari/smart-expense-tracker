import { formatCurrency, formatDate, groupExpensesByDate } from '../utils/calculations';

function ExpenseRow({ expense, onDelete }) {
  return (
    <div className="flex flex-col gap-3 rounded-2xl border border-white/10 bg-slate-950/70 p-4 md:flex-row md:items-center md:justify-between">
      <div>
        <div className="flex flex-wrap items-center gap-2">
          <h4 className="font-semibold text-white">{expense.note || 'Untitled expense'}</h4>
          <span className="rounded-full bg-cyan-400/15 px-3 py-1 text-xs font-medium text-cyan-300">
            {expense.category}
          </span>
        </div>
        <p className="mt-1 text-sm text-slate-400">
          {formatDate(expense.date)} • {expense.createdAt ? new Date(expense.createdAt).toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' }) : ''}
        </p>
      </div>

      <div className="flex items-center gap-3">
        <span className="text-lg font-semibold text-cyan-300">
          {formatCurrency(expense.amount)}
        </span>
        <button
          type="button"
          onClick={() => onDelete(expense.id)}
          className="rounded-2xl border border-rose-500/30 px-4 py-2 text-sm font-medium text-rose-200 transition hover:bg-rose-500/10"
        >
          Delete
        </button>
      </div>
    </div>
  );
}

export default function ExpenseList({ expenses, onDelete }) {
  const grouped = groupExpensesByDate(expenses);

  return (
    <section className="rounded-3xl border border-white/10 bg-slate-900/80 p-5 shadow-soft backdrop-blur">
      <div className="mb-5 flex items-center justify-between gap-3">
        <div>
          <h2 className="text-xl font-semibold text-white">Expense History</h2>
          <p className="mt-1 text-sm text-slate-400">
            Recent entries grouped by expense date.
          </p>
        </div>
        <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-sm text-slate-300">
          {expenses.length} item{expenses.length === 1 ? '' : 's'}
        </span>
      </div>

      {grouped.length ? (
        <div className="space-y-6">
          {grouped.map(({ date, items }) => (
            <div key={date} className="space-y-3">
              <div className="flex items-center gap-3">
                <h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-400">
                  {formatDate(date)}
                </h3>
                <div className="h-px flex-1 bg-white/10" />
              </div>

              <div className="space-y-3">
                {items.map((expense) => (
                  <ExpenseRow key={expense.id} expense={expense} onDelete={onDelete} />
                ))}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="rounded-3xl border border-dashed border-white/10 bg-slate-950/60 p-10 text-center">
          <p className="text-lg font-semibold text-white">No expenses found</p>
          <p className="mt-2 text-sm text-slate-400">
            Add your first expense or loosen the filters.
          </p>
        </div>
      )}
    </section>
  );
}
