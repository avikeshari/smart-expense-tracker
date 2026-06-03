import { useMemo, useState } from 'react';
import { CATEGORY_OPTIONS, formatCurrency } from '../utils/calculations';

const emptyForm = {
  amount: '',
  category: 'Food',
  date: new Date().toISOString().slice(0, 10),
  note: '',
};

export default function ExpenseForm({ onAddExpense }) {
  const [form, setForm] = useState(emptyForm);
  const [error, setError] = useState('');

  const previewAmount = useMemo(() => Number(form.amount || 0), [form.amount]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const amount = Number(form.amount);
    if (!amount || amount <= 0) {
      setError('Please enter a valid amount greater than 0.');
      return;
    }

    if (!form.date) {
      setError('Please select a date.');
      return;
    }

    const trimmedNote = form.note.trim();

    onAddExpense({
      amount,
      category: form.category,
      date: form.date,
      note: trimmedNote,
    });

    setForm(emptyForm);
    setError('');
  };

  return (
    <section className="rounded-3xl border border-white/10 bg-slate-900/80 p-5 shadow-soft backdrop-blur">
      <div className="mb-5">
        <h2 className="text-xl font-semibold text-white">Add Expense</h2>
        <p className="mt-1 text-sm text-slate-400">
          Save every spend with category, date, and note.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid gap-4 sm:grid-cols-2">
          <label className="space-y-2">
            <span className="text-sm font-medium text-slate-300">Amount</span>
            <input
              type="number"
              name="amount"
              min="1"
              step="1"
              value={form.amount}
              onChange={handleChange}
              placeholder="e.g. 250"
              className="w-full rounded-2xl border border-white/10 bg-slate-950 px-4 py-3 text-white outline-none transition placeholder:text-slate-500 focus:border-cyan-400"
            />
          </label>

          <label className="space-y-2">
            <span className="text-sm font-medium text-slate-300">Category</span>
            <select
              name="category"
              value={form.category}
              onChange={handleChange}
              className="w-full rounded-2xl border border-white/10 bg-slate-950 px-4 py-3 text-white outline-none transition focus:border-cyan-400"
            >
              {CATEGORY_OPTIONS.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </label>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <label className="space-y-2">
            <span className="text-sm font-medium text-slate-300">Date</span>
            <input
              type="date"
              name="date"
              value={form.date}
              onChange={handleChange}
              className="w-full rounded-2xl border border-white/10 bg-slate-950 px-4 py-3 text-white outline-none transition focus:border-cyan-400"
            />
          </label>

          <label className="space-y-2">
            <span className="text-sm font-medium text-slate-300">Note</span>
            <input
              type="text"
              name="note"
              value={form.note}
              onChange={handleChange}
              placeholder="e.g. Lunch with friends"
              className="w-full rounded-2xl border border-white/10 bg-slate-950 px-4 py-3 text-white outline-none transition placeholder:text-slate-500 focus:border-cyan-400"
            />
          </label>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-3">
          <p className="text-sm text-slate-400">
            Preview: <span className="font-semibold text-cyan-300">{formatCurrency(previewAmount)}</span>
          </p>
          <button
            type="submit"
            className="rounded-2xl bg-cyan-400 px-5 py-3 font-semibold text-slate-950 transition hover:bg-cyan-300"
          >
            Add Expense
          </button>
        </div>

        {error ? (
          <p className="rounded-2xl border border-rose-500/30 bg-rose-500/10 px-4 py-3 text-sm text-rose-200">
            {error}
          </p>
        ) : null}
      </form>
    </section>
  );
}
