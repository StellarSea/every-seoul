import { useCallback, useEffect, useMemo, useState } from 'react';
import {
  addBookmark,
  fetchBookmarks,
  removeBookmark,
  type BookmarkItemType
} from '../auth/bookmarkApi';
import { ApiError } from '../auth/apiClient';
import { fetchNewsletterDetail } from '../auth/newsletterApi';
import type { Newsletter } from '../types/app';

export function useBookmarks(userId?: string) {
  const [newsletterIds, setNewsletterIds] = useState<number[]>([]);
  const [newsletterItems, setNewsletterItems] = useState<Newsletter[]>([]);
  const [policyIds, setPolicyIds] = useState<number[]>([]);
  const [error, setError] = useState('');

  const reload = useCallback(async () => {
    if (!userId) {
      setNewsletterIds([]);
      setNewsletterItems([]);
      setPolicyIds([]);
      return;
    }

    try {
      setError('');
      const items = await fetchBookmarks(userId);
      const nextNewsletterIds = items
        .filter((item) => item.item_type === 'newsletter')
        .map((item) => item.item_id);
      setNewsletterIds(nextNewsletterIds);
      setNewsletterItems(
        await Promise.all(
          nextNewsletterIds.map((id) => fetchNewsletterDetail(id))
        ).catch(() => [])
      );
      setPolicyIds(
        items
          .filter((item) => item.item_type === 'policy')
          .map((item) => item.item_id)
      );
    } catch (loadError) {
      if (isAuthError(loadError)) {
        setNewsletterIds([]);
        setNewsletterItems([]);
        setPolicyIds([]);
        setError('');
        return;
      }

      setError(
        loadError instanceof Error
          ? loadError.message
          : '북마크를 불러오지 못했습니다.'
      );
    }
  }, [userId]);

  useEffect(() => {
    void Promise.resolve().then(reload);
  }, [reload]);

  const toggle = useCallback(
    async (itemType: BookmarkItemType, itemId: number) => {
      if (!userId) return false;

      const ids = itemType === 'newsletter' ? newsletterIds : policyIds;
      const bookmarked = ids.includes(itemId);

      try {
        setError('');
        if (bookmarked) {
          await removeBookmark(userId, itemType, itemId);
        } else {
          await addBookmark(userId, itemType, itemId);
        }
        await reload();
        return true;
      } catch (toggleError) {
        if (isAuthError(toggleError)) {
          setError('로그인 세션이 만료되었습니다. 다시 로그인해 주세요.');
          return false;
        }

        setError(
          toggleError instanceof Error
            ? toggleError.message
            : '북마크 저장에 실패했습니다.'
        );
        return false;
      }
    },
    [newsletterIds, policyIds, reload, userId]
  );

  return useMemo(
    () => ({
      error,
      newsletterIds,
      newsletterItems,
      policyIds,
      reload,
      toggle
    }),
    [error, newsletterIds, newsletterItems, policyIds, reload, toggle]
  );
}

function isAuthError(error: unknown) {
  return (
    error instanceof ApiError && (error.status === 401 || error.status === 403)
  );
}
