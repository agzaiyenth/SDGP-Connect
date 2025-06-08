import { useState } from 'react';
import axios from 'axios';

interface UseAwardApprovalActionsOptions {
  onSuccess?: (action: 'approved' | 'rejected' | 'deleted') => void;
  onError?: (error: any) => void;
}

export function useAwardApprovalActions(options: UseAwardApprovalActionsOptions = {}) {
  const { onSuccess, onError } = options;
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const acceptAward = async (awardId: string) => {
    setLoading(true);
    setError(null);
    setSuccess(false);
    try {
      const response = await axios.post(`/api/admin/awards/${awardId}/accept`);
      setSuccess(true);
      onSuccess && onSuccess('approved');
      return response.data;
    } catch (err: any) {
      const errorMessage = err.response?.data?.error || err.message || 'Failed to approve award';
      setError(errorMessage);
      onError && onError(err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const rejectAward = async (awardId: string, reason: string) => {
    setLoading(true);
    setError(null);
    setSuccess(false);
    try {
      if (!reason.trim()) {
        throw new Error('Rejection reason is required');
      }
      const response = await axios.post(`/api/admin/awards/${awardId}/reject`, { reason });
      setSuccess(true);
      onSuccess && onSuccess('rejected');
      return response.data;
    } catch (err: any) {
      const errorMessage = err.response?.data?.error || err.message || 'Failed to reject award';
      setError(errorMessage);
      onError && onError(err);
      throw err;
    } finally {
      setLoading(false);
    }
  };
  const deleteAward = async (awardId: string) => {
    setLoading(true);
    setError(null);
    setSuccess(false);
    try {
      const response = await axios.delete(`/api/admin/awards/${awardId}/delete`);
      setSuccess(true);
      onSuccess && onSuccess('deleted');
      return response.data;
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
    acceptAward,
    rejectAward,
    deleteAward,
    loading,
    error,
    success,
    clearState,
  };
}
