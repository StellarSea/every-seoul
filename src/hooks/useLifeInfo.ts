import { useCallback, useEffect, useState } from 'react';
import { fetchLifeInfo } from '../auth/lifeInfoApi';
import type { LifeInfo } from '../types/app';

export function useLifeInfo(district: string) {
  const [lifeInfo, setLifeInfo] = useState<LifeInfo | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const reload = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      setLifeInfo(await fetchLifeInfo(district));
    } catch (loadError) {
      setError(
        loadError instanceof Error
          ? loadError.message
          : '생활정보를 불러오지 못했습니다.'
      );
    } finally {
      setLoading(false);
    }
  }, [district]);

  useEffect(() => {
    void Promise.resolve().then(reload);
  }, [reload]);

  return { error, lifeInfo, loading, reload };
}
