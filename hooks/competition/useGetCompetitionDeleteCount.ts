import { useState, useCallback } from 'react';
import axios from 'axios';

export function useGetCompetitionDeleteCount(competitionId?: string) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<{ name: string; awardCount: number } | null>(null);

  const fetchCount = useCallback(async () => {
    if (!competitionId) return;
    setLoading(true);
    setError(null);
    try {
      const res = await axios.get(`/api/admin/competitions/${competitionId}/delete-count`);
      setData(res.data);
    } catch (err: any) {
      setError(err.response?.data?.error || err.message || 'Failed to fetch delete count');
    } finally {
      setLoading(false);
    }
  }, [competitionId]);

  return { loading, error, data, fetchCount };
}
