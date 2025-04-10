import { useState } from 'react';
import { toast } from 'sonner';

interface BulkApproveProps {
  onSuccess?: () => void;
  onError?: (error: Error) => void;
}


export default function useBulkApprove({ onSuccess, onError }: BulkApproveProps = {}) {
  const [isLoading, setIsLoading] = useState(false);

  const bulkApprove = async (projectIds: number[]) => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/admin/projects/bulk-approve', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ projectIds }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to approve projects');
      }

      const data = await response.json();
      toast.success(`Successfully approved ${projectIds.length} projects`);
      
      if (onSuccess) {
        onSuccess();
      }
      
      return data;
    } catch (err) {
      const error = err as Error;
      toast.error(`Failed to approve projects: ${error.message}`);
      
      if (onError) {
        onError(error);
      }
      
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  return { bulkApprove, isLoading };
}
