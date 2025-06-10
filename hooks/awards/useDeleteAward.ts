import { useState } from 'react';
import axios from 'axios';

interface UseDeleteAwardOptions {
  onSuccess?: () => void;
  onError?: (error: any) => void;
}

export function useDeleteAward(options: UseDeleteAwardOptions = {}) {
  const { onSuccess, onError } = options;
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const deleteAward = async (awardId: string) => {
    setLoading(true);
    setError(null);
    setSuccess(false);
    try {
      await axios.delete(`/api/admin/awards/${awardId}/delete`);
      setSuccess(true);
      onSuccess && onSuccess();
    } catch (err: any) {
      const errorMessage = err.response?.data?.error || err.message || 'Failed to delete award';
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
    deleteAward,
    loading,
    error,
    success,
    clearState,
  };
}
