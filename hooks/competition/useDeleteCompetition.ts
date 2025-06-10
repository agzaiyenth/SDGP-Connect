import { useState } from 'react';
import axios from 'axios';

interface UseDeleteCompetitionOptions {
  onSuccess?: () => void;
  onError?: (error: any) => void;
}

export function useDeleteCompetition(options: UseDeleteCompetitionOptions = {}) {
  const { onSuccess, onError } = options;
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const deleteCompetition = async (competitionId: string) => {
    setLoading(true);
    setError(null);
    setSuccess(false);
    try {
      await axios.delete(`/api/admin/competitions/${competitionId}/delete`);
      setSuccess(true);
      onSuccess && onSuccess();
    } catch (err: any) {
      const errorMessage = err.response?.data?.error || err.message || 'Failed to delete competition';
      setError(errorMessage);
      onError && onError(err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const clearState = () => {
    setError(null);
    setSuccess(false);
  };

  return {
    deleteCompetition,
    loading,
    error,
    success,
    clearState,
  };
}
