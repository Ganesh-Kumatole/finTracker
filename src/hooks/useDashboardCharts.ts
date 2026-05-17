import { useMemo } from 'react';
import { useTransactions, useInsights } from '@/hooks';

export const useDashboardCharts = () => {
  const { transactions } = useTransactions();
  const insights = useInsights();
  const { budgetHealth } = insights.computed || {};

  // Category breakdown donut chart (last 30 days)
  const donutData = useMemo(() => {
    const since = new Date();
    since.setDate(since.getDate() - 30);

    const expenses = transactions.filter(
      (t) => new Date(t.date) >= since && t.type === 'expense',
    );

    const grouped = expenses.reduce<Record<string, number>>((acc, t) => {
      acc[t.category] = (acc[t.category] || 0) + t.amount;
      return acc;
    }, {});

    // Take top 8 categories
    const sorted = Object.entries(grouped)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 8);

    return {
      labels: sorted.map(([k]) => k),
      data: sorted.map(([, v]) => v),
    };
  }, [transactions]);

  // Budget vs Actual bar chart (top 6 categories)
  const budgetVsActualData = useMemo(() => {
    const list = budgetHealth || [];
    return {
      labels: list.slice(0, 6).map((b: any) => b.category),
      budgeted: list.slice(0, 6).map((b: any) => b.limitAmount),
      actual: list.slice(0, 6).map((b: any) => b.spentAmount),
    };
  }, [budgetHealth]);

  // Recent 5 transactions sorted by date
  const recentTransactions = useMemo(
    () =>
      [...transactions]
        .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
        .slice(0, 5),
    [transactions],
  );

  return { donutData, budgetVsActualData, recentTransactions };
};
