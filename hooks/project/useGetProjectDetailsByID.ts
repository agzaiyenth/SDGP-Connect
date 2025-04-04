import { useState, useEffect, useCallback } from 'react';
import axios, { AxiosError } from 'axios';
import { IProject } from '@/types/project/type';
import { LoadingSpinner } from '@/components/ui/loading-spinner';

interface UseGetProjectDetailsByIDReturn {
  project: IProject | null;
  isLoading: boolean;
  error: Error | null;
  refetch: () => Promise<void>;
}

/**
 * Custom hook to fetch project details by ID
 * @param projectId The ID of the project to fetch
 * @returns Project details, loading state, error state, and refetch function
 */
export function useGetProjectDetailsByID(projectId: string): UseGetProjectDetailsByIDReturn {
  const [project, setProject] = useState<IProject | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchProjectDetails = useCallback(async () => {
    if (!projectId) {
      setError(new Error('Project ID is required'));
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const response = await axios.get<IProject>(`/api/projects/${projectId}`);
      setProject(response.data);
    } catch (err) {
      const axiosError = err as AxiosError;
      // Fix the error message extraction
      const errorMessage = axiosError.message || 'Failed to fetch project details';
      setError(new Error(errorMessage));
      setProject(null);
    } finally {
      setIsLoading(false);
    }
  }, [projectId]);

  useEffect(() => {
    fetchProjectDetails();
  }, [fetchProjectDetails]);

  return {
    project,
    isLoading,
    error,
    refetch: fetchProjectDetails
  };
}

export default useGetProjectDetailsByID;