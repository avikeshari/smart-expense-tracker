import React from 'react';
import useLocalStorage from './hooks/useLocalStorage';
import ExpenseForm from './components/ExpenseForm';
import ExpenseFilter from './components/ExpenseFilter';
import ExpenseList from './components/ExpenseList';
import ExpenseChart from './components/ExpenseChart';
import SummaryCards from './components/SummaryCards';
import {
  applyExpenseFilters,
  getCategoryTotals,
  CATEGORY_OPTIONS,
} from './utils/calculations';

const DEFAULT_FILTERS = {
  query: '',
  category: '',
  sortBy: 'recent',
  minAmount: '',
  maxAmount: '',
  startDate: '',
  endDate: '',
};

const SEED_EXPENSES = [
  {
    id: 'seed-1',
    amount: 240,
    category: 'Food',
    date: new Date().toISOString().slice(0, 10),
    note: 'Breakfast and coffee',
    createdAt: new Date().toISOString(),
  },
  {
    id: 'seed-2',
    amount: 1200,
    category: 'Bills',
    date: new Date(Date.now() - 86400000).toISOString().slice(0, 10),
    note: 'Mobile recharge and internet',
    createdAt: new Date(Date.now() - 86400000).toISOString(),
  },
  {
    id: 'seed-3',
    amount: 650,
    category: 'Travel',
    date: new Date(Date.now() - 2 * 86400000).toISOString().slice(0, 10),
    note: 'Cab to office',
    createdAt: new Date(Date.now() - 2 * 86400000).toISOString(),
  },
];

function makeId() {
  if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') {
    return crypto.randomUUID();
  }
  return `${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

export default function App() {
  const [expenses, setExpenses] = useLocalStorage('smart-expense-tracker-expenses', SEED_EXPENSES);
  const [filters, setFilters] = useLocalStorage('smart-expense-tracker-filters', DEFAULT_FILTERS);

  const visibleExpenses = React.useMemo(
    () => applyExpenseFilters(expenses, filters),
    [expenses, filters]
  );

  const categoryTotals = React.useMemo(() => getCategoryTotals(expenses), [expenses]);

  const handleAddExpense = (expense) => {
    const newExpense = {
      id: makeId(),
      amount: Number(expense.amount),
      category: expense.category,
      date: expense.date,
      note: expense.note,
      createdAt: new Date().toISOString(),
    };

    setExpenses((prev) => [newExpense, ...prev]);
  };

  const handleDeleteExpense = (id) => {
    setExpenses((prev) => prev.filter((expense) => expense.id !== id));
  };

  const handleResetFilters = () => setFilters(DEFAULT_FILTERS);

  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top,_rgba(14,165,233,0.12),_transparent_30%),linear-gradient(180deg,_#020617_0%,_#0f172a_100%)]">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <header className="mb-8 rounded-3xl border border-white/10 bg-slate-900/70 p-6 shadow-soft backdrop-blur">
          <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="text-sm font-medium uppercase tracking-[0.3em] text-cyan-300">
                Avi's Smart Expense Tracker
              </p>
              <h1 className="mt-2 text-3xl font-bold text-white sm:text-4xl">
                Command Your Capital and Take Charge of Your Cash Flow
              </h1>
              <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-400 sm:text-base">
                Master your financial trajectory with absolute precision. This platform eliminates the guesswork from your daily spending, providing a clear, logical breakdown of exactly where your resources are deployed. Track, analyze, and optimize your cash flow to build a resilient and highly calculated financial foundation.
              </p>
            </div>

            <div className="grid gap-3 sm:grid-cols-3 lg:max-w-xl">
              {CATEGORY_OPTIONS.map((category) => {
                const total = categoryTotals.find((item) => item.category === category)?.total || 0;
                return (
                  <div key={category} className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3">
                    <p className="text-xs uppercase tracking-[0.2em] text-slate-400">{category}</p>
                    <p className="mt-1 text-lg font-semibold text-white">
                      {new Intl.NumberFormat('en-IN', {
                        style: 'currency',
                        currency: 'INR',
                        maximumFractionDigits: 0,
                      }).format(total)}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </header>

        <div className="grid gap-6 xl:grid-cols-[420px_minmax(0,1fr)]">
          <div className="space-y-6">
            <ExpenseForm onAddExpense={handleAddExpense} />
            <ExpenseFilter
              filters={filters}
              onChange={setFilters}
              onReset={handleResetFilters}
            />
          </div>

          <div className="space-y-6">
            <SummaryCards
              expenses={expenses}
              categoryTotals={categoryTotals}
              visibleCount={visibleExpenses.length}
            />
            <ExpenseChart categoryTotals={categoryTotals} />
            <ExpenseList expenses={visibleExpenses} onDelete={handleDeleteExpense} />
          </div>
        </div>
      </div>
    </main>
  );
}