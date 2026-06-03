import { CATEGORY_OPTIONS, SORT_OPTIONS } from '../utils/calculations';

export default function ExpenseFilter({ filters, onChange, onReset }) {
  const handleFieldChange = (event) => {
    const { name, value } = event.target;
    onChange({ ...filters, [name]: value });
  };

  return (
    <section className="rounded-3xl border border-white/10 bg-slate-900/80 p-5 shadow-soft backdrop-blur">
      <div className="mb-5 flex items-center justify-between gap-3">
        <div>
          <h2 className="text-xl font-semibold text-white">Filter & Sort</h2>
          <p className="mt-1 text-sm text-slate-400">
            Search by note, category, amount, or date.
          </p>
        </div>
        <button
          onClick={onReset}
          type="button"
          className="rounded-2xl border border-white/10 px-4 py-2 text-sm font-medium text-slate-200 transition hover:border-cyan-400 hover:text-cyan-300"
        >
          Reset
        </button>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <label className="space-y-2">
          <span className="text-sm font-medium text-slate-300">Search</span>
          <input
            type="text"
            name="query"
            value={filters.query}
            onChange={handleFieldChange}
            placeholder="Search expenses..."
            className="w-full rounded-2xl border border-white/10 bg-slate-950 px-4 py-3 text-white outline-none transition placeholder:text-slate-500 focus:border-cyan-400"
          />
        </label>

        <label className="space-y-2">
          <span className="text-sm font-medium text-slate-300">Category</span>
          <select
            name="category"
            value={filters.category}
            onChange={handleFieldChange}
            className="w-full rounded-2xl border border-white/10 bg-slate-950 px-4 py-3 text-white outline-none transition focus:border-cyan-400"
          >
            <option value="">All Categories</option>
            {CATEGORY_OPTIONS.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </label>

        <label className="space-y-2">
          <span className="text-sm font-medium text-slate-300">Sort By</span>
          <select
            name="sortBy"
            value={filters.sortBy}
            onChange={handleFieldChange}
            className="w-full rounded-2xl border border-white/10 bg-slate-950 px-4 py-3 text-white outline-none transition focus:border-cyan-400"
          >
            {Object.entries(SORT_OPTIONS).map(([value, label]) => (
              <option key={value} value={value}>
                {label}
              </option>
            ))}
          </select>
        </label>

        <label className="space-y-2">
          <span className="text-sm font-medium text-slate-300">Min Amount</span>
          <input
            type="number"
            name="minAmount"
            value={filters.minAmount}
            onChange={handleFieldChange}
            min="0"
            placeholder="0"
            className="w-full rounded-2xl border border-white/10 bg-slate-950 px-4 py-3 text-white outline-none transition placeholder:text-slate-500 focus:border-cyan-400"
          />
        </label>

        <label className="space-y-2">
          <span className="text-sm font-medium text-slate-300">Max Amount</span>
          <input
            type="number"
            name="maxAmount"
            value={filters.maxAmount}
            onChange={handleFieldChange}
            min="0"
            placeholder="9999"
            className="w-full rounded-2xl border border-white/10 bg-slate-950 px-4 py-3 text-white outline-none transition placeholder:text-slate-500 focus:border-cyan-400"
          />
        </label>

        <label className="space-y-2">
          <span className="text-sm font-medium text-slate-300">Start Date</span>
          <input
            type="date"
            name="startDate"
            value={filters.startDate}
            onChange={handleFieldChange}
            className="w-full rounded-2xl border border-white/10 bg-slate-950 px-4 py-3 text-white outline-none transition focus:border-cyan-400"
          />
        </label>

        <label className="space-y-2">
          <span className="text-sm font-medium text-slate-300">End Date</span>
          <input
            type="date"
            name="endDate"
            value={filters.endDate}
            onChange={handleFieldChange}
            className="w-full rounded-2xl border border-white/10 bg-slate-950 px-4 py-3 text-white outline-none transition focus:border-cyan-400"
          />
        </label>
      </div>
    </section>
  );
}
