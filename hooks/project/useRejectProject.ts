import { useState } from 'react';
import { toast } from 'sonner';

interface RejectProjectParams {
  projectId: string;
  reason: string;
}

export function useRejectProject() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);

  const rejectProject = async ({ projectId, reason }: RejectProjectParams) => {
    setIsLoading(true);
    setError(null);
    setIsSuccess(false);

    try {
      const response = await fetch('/api/admin/projects/reject', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ projectId, reason }),
      });

      const data = await response.json();

      if (!response.ok) {
        const errorMessage = data.error || 'Failed to reject project';
        toast.error('Project Rejection Failed', {
          description: errorMessage
        });
        throw new Error(errorMessage);
      }

      setIsSuccess(true);
      toast.success('Project Rejected Successfully', {
        description: 'The project has been rejected with your feedback.'
      });
      return data;
    } catch (err: any) {
      setError(err);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    rejectProject,
    isLoading,
    error,
    isSuccess,
  };
}
