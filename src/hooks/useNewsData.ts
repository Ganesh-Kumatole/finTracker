import { useState, useEffect, Dispatch, SetStateAction } from 'react';
import { fetchFinancialNews, NewsArticle } from '@/services/news/newsService';

interface UseNewsDataReturn {
  news: NewsArticle[];
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
  setNews: Dispatch<SetStateAction<NewsArticle[]>>;
  setLoading: Dispatch<SetStateAction<boolean>>;
  setError: Dispatch<SetStateAction<string | null>>;
}

export const useNewsData = (): UseNewsDataReturn => {
  const [news, setNews] = useState<NewsArticle[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadNews = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetchFinancialNews({ sort: 'relevancy' });
      setNews(response.articles.slice(0, 3));
    } catch (err) {
      setError('Unable to load news at the moment');
      console.error('News fetch error:', err);
    } finally {
      setLoading(false);
    }
  };

  // Fetch on mount and set up 30-minute refresh interval
  useEffect(() => {
    loadNews();
    const intervalId = setInterval(loadNews, 30 * 60 * 1000); // 30 minutes
    return () => clearInterval(intervalId);
  }, []);

  return {
    news,
    loading,
    error,
    refetch: loadNews,
    setNews,
    setLoading,
    setError,
  };
};
