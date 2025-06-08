import { useState } from 'react';
import axios from 'axios';

interface UseCompetitionApprovalActionsOptions {
  onSuccess?: (action: 'approved' | 'rejected') => void;
  onError?: (error: any) => void;
}

export function useCompetitionApprovalActions(options: UseCompetitionApprovalActionsOptions = {}) {
  const { onSuccess, onError } = options;
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const acceptCompetition = async (competitionId: string) => {
    setLoading(true);
    setError(null);
    setSuccess(false);
    try {
      const response = await axios.post(`/api/admin/competitions/${competitionId}/accept`);
      setSuccess(true);
      onSuccess && onSuccess('approved');
      return response.data;
    } catch (err: any) {
      const errorMessage = err.response?.data?.error || err.message || 'Failed to approve competition';
      setError(errorMessage);
      onError && onError(err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const rejectCompetition = async (competitionId: string, reason: string) => {
    setLoading(true);
    setError(null);
    setSuccess(false);
    try {
      if (!reason.trim()) {
        throw new Error('Rejection reason is required');
      }
      const response = await axios.post(`/api/admin/competitions/${competitionId}/reject`, { reason });
      setSuccess(true);
      onSuccess && onSuccess('rejected');
      return response.data;
    } catch (err: any) {
      const errorMessage = err.response?.data?.error || err.message || 'Failed to reject competition';
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
    acceptCompetition, 
    rejectCompetition, 
    loading, 
    error, 
    success, 
    clearState 
  };
}
