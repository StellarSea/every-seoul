import { useCallback, useEffect, useState } from 'react';
import {
  fetchNewsletterDetail,
  fetchNewsletters,
  fetchUserFeed,
  markNewsletterAsRead,
  refreshUserFeed
} from '../auth/newsletterApi';
import type { Newsletter } from '../types/app';

export function useNewsletters(district: string, userId?: string) {
  const [newsletters, setNewsletters] = useState<Newsletter[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState('');

  const loadNewsletters = useCallback(async () => {
    setLoading(true);
    setError('');

    try {
      const items = userId
        ? await fetchUserFeed(userId)
        : await fetchNewsletters(district);
      setNewsletters(items);
    } catch (loadError) {
      setError(toErrorMessage(loadError));
      setNewsletters([]);
    } finally {
      setLoading(false);
    }
  }, [district, userId]);

  useEffect(() => {
    void Promise.resolve().then(loadNewsletters);
  }, [loadNewsletters]);

  const refreshFeed = useCallback(async () => {
    if (!userId) {
      await loadNewsletters();
      return;
    }

    setRefreshing(true);
    setError('');
    try {
      await refreshUserFeed(userId);
      await loadNewsletters();
    } catch (refreshError) {
      setError(toErrorMessage(refreshError));
    } finally {
      setRefreshing(false);
    }
  }, [loadNewsletters, userId]);

  const loadDetail = useCallback(
    async (newsletterId: number) => {
      const detail = await fetchNewsletterDetail(newsletterId);
      setNewsletters((current) =>
        current.map((item) => (item.id === newsletterId ? detail : item))
      );

      if (userId) {
        await markNewsletterAsRead(userId, newsletterId).catch(() => undefined);
      }

      return detail;
    },
    [userId]
  );

  return {
    error,
    loading,
    newsletters,
    refreshFeed,
    refreshing,
    reload: loadNewsletters,
    loadDetail
  };
}

function toErrorMessage(error: unknown) {
  return error instanceof Error
    ? error.message
    : '뉴스레터를 불러오지 못했습니다.';
}
