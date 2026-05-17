import { useMemo } from 'react';
import { useTransactions, useInsights } from '@/hooks';

export const useDashboardMetrics = () => {
  const { transactions } = useTransactions();
  const insights = useInsights();
  const { monthOverMonthChange, budgetHealth } = insights.computed || {};

  // Color indicator for MoM change
  const momColor =
    monthOverMonthChange != null && monthOverMonthChange > 0
      ? 'text-red-500'
      : 'text-emerald-500';

  // Current month metrics
  const currentMonthMetrics = useMemo(() => {
    const currentDate = new Date();
    const startOfMonth = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      1,
    );

    const currentMntTransactions = transactions.filter(
      (t) => new Date(t.date) >= startOfMonth,
    );

    const income = currentMntTransactions
      .filter((t) => t.type === 'income')
      .reduce((s, t) => s + t.amount, 0);

    const expense = currentMntTransactions
      .filter((t) => t.type === 'expense')
      .reduce((s, t) => s + t.amount, 0);

    const savingsRate =
      income > 0
        ? Math.min(Math.max(((income - expense) / income) * 100, 0), 100)
        : 0;

    return { income, expense, savingsRate };
  }, [transactions]);

  // Month-over-month change display
  const momDisplay = useMemo(() => {
    if (monthOverMonthChange == null) return '—';
    const sign = monthOverMonthChange > 0 ? '+' : '';
    return `${sign}${monthOverMonthChange.toFixed(1)}% vs last month`;
  }, [monthOverMonthChange]);

  // Budget utilization percentage
  const budgetUsedPct = useMemo(() => {
    if (!budgetHealth || budgetHealth.length === 0) return 0;
    const totalLimit = budgetHealth.reduce(
      (s: number, b: any) => s + b.limitAmount,
      0,
    );
    const totalSpent = budgetHealth.reduce(
      (s: number, b: any) => s + b.spentAmount,
      0,
    );
    return totalLimit > 0 ? Math.round((totalSpent / totalLimit) * 100) : 0;
  }, [budgetHealth]);

  return {
    currentMonthMetrics,
    monthOverMonthChange,
    momDisplay,
    momColor,
    budgetUsedPct,
    budgetHealth,
  };
};
