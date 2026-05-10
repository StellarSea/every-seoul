import { useCallback, useEffect, useState } from 'react';
import { fetchPolicies } from '../auth/policyApi';
import type { EventDetail, Policy, UserPreferences } from '../types/app';

export function usePolicies(preferences: UserPreferences) {
  const [policies, setPolicies] = useState<Policy[]>([]);
  const [events, setEvents] = useState<EventDetail[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const reload = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      const data = await fetchPolicies(preferences);
      setPolicies(data.policies);
      setEvents(data.events);
    } catch (loadError) {
      setError(
        loadError instanceof Error
          ? loadError.message
          : '정책 정보를 불러오지 못했습니다.'
      );
      setPolicies([]);
      setEvents([]);
    } finally {
      setLoading(false);
    }
  }, [preferences]);

  useEffect(() => {
    void Promise.resolve().then(reload);
  }, [reload]);

  return { error, events, loading, policies, reload };
}
