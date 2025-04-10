import { useState } from 'react';
import axios from 'axios';
import { toast } from 'sonner';

interface UseToggleProjectFeatureOptions {
  onSuccess?: () => void;
  onError?: (error: Error) => void;
}

export function useToggleProjectFeature(options?: UseToggleProjectFeatureOptions) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const toggleFeature = async (projectId: string, featured: boolean) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await axios.post('/api/admin/projects/feature', {
        projectId: String(projectId),
        featured
      });

      setIsLoading(false);
      
      if (response.status === 200) {
        toast.success(featured ? 'Project featured successfully' : 'Project unfeatured successfully');
        
        // Call the onSuccess callback if provided
        if (options?.onSuccess) {
          options.onSuccess();
        }
        
        return true;
      } else {
        throw new Error('Failed to update project featured status');
      }
    } catch (err: any) {
      setIsLoading(false);
      
      // Handle errors
      const errorMessage = err.response?.data?.error || err.message || 'Failed to update project featured status';
      setError(new Error(errorMessage));
      
      toast.error('Error updating featured status', {
        description: errorMessage,
      });
      
      // Call the onError callback if provided
      if (options?.onError) {
        options.onError(new Error(errorMessage));
      }
      
      return false;
    }
  };

  return {
    toggleFeature,
    isLoading,
    error
  };
}