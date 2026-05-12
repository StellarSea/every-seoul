import { useCallback, useEffect, useState } from 'react';
import {
  fetchNewsletterDetail,
  fetchNewsletters,
  fetchUserFeed,
  markNewsletterAsRead,
  refreshUserFeed
} from '../auth/newsletterApi';
import { ApiError } from '../auth/apiClient';
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
      if (userId && isAuthError(loadError)) {
        try {
          setNewsletters(await fetchNewsletters(district));
          setError(
            '로그인 세션을 확인하지 못해 기본 뉴스레터를 보여드리고 있습니다.'
          );
          return;
        } catch (fallbackError) {
          setError(toErrorMessage(fallbackError));
          setNewsletters([]);
          return;
        }
      }

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

function isAuthError(error: unknown) {
  return (
    error instanceof ApiError && (error.status === 401 || error.status === 403)
  );
}
