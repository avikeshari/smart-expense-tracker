export const CATEGORY_OPTIONS = ['Food', 'Travel', 'Bills', 'Others'];

export const SORT_OPTIONS = {
  recent: 'Most Recent',
  highest: 'Highest Amount',
  lowest: 'Lowest Amount',
};

export function formatCurrency(value) {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(Number(value || 0));
}

export function formatDate(dateString) {
  if (!dateString) return '-';
  const date = new Date(dateString);
  if (Number.isNaN(date.getTime())) return dateString;
  return new Intl.DateTimeFormat('en-IN', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  }).format(date);
}

export function getCategoryTotals(expenses) {
  return CATEGORY_OPTIONS.map((category) => ({
    category,
    total: expenses
      .filter((expense) => expense.category === category)
      .reduce((sum, expense) => sum + Number(expense.amount || 0), 0),
  }));
}

export function getTotalSpent(expenses) {
  return expenses.reduce((sum, expense) => sum + Number(expense.amount || 0), 0);
}

export function getAverageExpense(expenses) {
  if (!expenses.length) return 0;
  return getTotalSpent(expenses) / expenses.length;
}

export function groupExpensesByDate(expenses) {
  const grouped = expenses.reduce((acc, expense) => {
    const key = expense.date;
    if (!acc[key]) acc[key] = [];
    acc[key].push(expense);
    return acc;
  }, {});

  return Object.entries(grouped)
    .sort(([dateA], [dateB]) => new Date(dateB) - new Date(dateA))
    .map(([date, items]) => ({
      date,
      items: items.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)),
    }));
}

export function applyExpenseFilters(expenses, filters) {
  const {
    query,
    category,
    sortBy,
    minAmount,
    maxAmount,
    startDate,
    endDate,
  } = filters;

  const normalizedQuery = query.trim().toLowerCase();

  const filtered = expenses.filter((expense) => {
    const amount = Number(expense.amount || 0);
    const expenseDate = expense.date ? new Date(expense.date) : null;

    const matchesQuery =
      !normalizedQuery ||
      [expense.category, expense.note, expense.date, String(expense.amount)]
        .filter(Boolean)
        .some((field) => field.toLowerCase().includes(normalizedQuery));

    const matchesCategory = !category || expense.category === category;
    const matchesMin = minAmount === '' || amount >= Number(minAmount);
    const matchesMax = maxAmount === '' || amount <= Number(maxAmount);

    const matchesStart =
      !startDate || (expenseDate && expenseDate >= new Date(startDate));
    const matchesEnd =
      !endDate || (expenseDate && expenseDate <= new Date(endDate + 'T23:59:59'));

    return (
      matchesQuery &&
      matchesCategory &&
      matchesMin &&
      matchesMax &&
      matchesStart &&
      matchesEnd
    );
  });

  const sorted = [...filtered].sort((a, b) => {
    if (sortBy === 'highest') return Number(b.amount) - Number(a.amount);
    if (sortBy === 'lowest') return Number(a.amount) - Number(b.amount);
    return new Date(b.createdAt) - new Date(a.createdAt);
  });

  return sorted;
}
