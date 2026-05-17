import {
  useDashboard,
  useTransactions,
  useDashboardMetrics,
  useDashboardCharts,
  useNewsData,
  useModal,
} from '@/hooks';
import { DashboardHeader, CardsWrapper, ChartsWrapper, NewsWrapper } from '.';
import { AddTransactionModal } from '../transactions';

const Dashboard = () => {
  // Data fetching hooks
  const { loading: dashboardLoading, monthly } = useDashboard();
  const { createTransaction } = useTransactions();

  // Business logic hooks
  const dashboardMetrics = useDashboardMetrics();
  const dashboardCharts = useDashboardCharts();
  const newsData = useNewsData();
  const addTxModal = useModal(false);

  const {
    currentMonthMetrics,
    momDisplay,
    momColor,
    budgetUsedPct,
    budgetHealth,
  } = dashboardMetrics;
  const { donutData, budgetVsActualData, recentTransactions } = dashboardCharts;
  const {
    news,
    loading: newsLoading,
    error: newsError,
    setNews,
    setLoading: setNewsLoading,
    setError: setNewsError,
  } = newsData;

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      {/* Header section */}
      <DashboardHeader onAddTransaction={addTxModal.open} />

      {/* Metrics cards */}
      <CardsWrapper
        loading={dashboardLoading}
        income={currentMonthMetrics.income}
        expense={currentMonthMetrics.expense}
        savingsRate={currentMonthMetrics.savingsRate}
        momChange={momDisplay}
        momColor={momColor}
        budgetUsedPct={budgetUsedPct}
        budgetHealth={budgetHealth}
      />

      {/* Charts section */}
      <ChartsWrapper
        loading={dashboardLoading}
        donutData={donutData}
        monthly={monthly}
        bvaData={budgetVsActualData}
        recentTx={recentTransactions}
        setShowAddTx={addTxModal.open}
      />

      {/* Financial news section */}
      <NewsWrapper
        news={news}
        setNews={setNews}
        newsLoading={newsLoading}
        setNewsLoading={setNewsLoading}
        newsError={newsError}
        setNewsError={setNewsError}
      />

      {/* Add transaction modal */}
      {addTxModal.isOpen && (
        <AddTransactionModal
          isOpen={addTxModal.isOpen}
          onClose={addTxModal.close}
          onCreate={async (input) => {
            await createTransaction(input);
            addTxModal.close();
          }}
        />
      )}
    </div>
  );
};

export { Dashboard };
