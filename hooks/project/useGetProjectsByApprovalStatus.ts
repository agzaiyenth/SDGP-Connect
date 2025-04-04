import { useState, useEffect, useCallback } from 'react';
import axios, { AxiosError } from 'axios';
import { ProjectApprovalStatus } from '@prisma/client';
import { PendingProject, ApprovedProject, RejectedProject } from '@/types/project/response';

interface PaginatedResponse<T> {
  data: T[];
  metadata: {
    currentPage: number;
    totalPages: number;
    totalItems: number;
    itemsPerPage: number;
  };
}

interface UseGetProjectsByApprovalStatusReturn<T> {
  projects: T[];
  isLoading: boolean;
  error: Error | null;
  currentPage: number;
  totalPages: number;
  totalItems: number;
  fetchNextPage: () => Promise<void>;
  fetchPreviousPage: () => Promise<void>;
  refresh: () => Promise<void>;
  isEmpty: boolean;
}

const MAX_RETRIES = 3;
const RETRY_DELAY = 1000; // 1 second

export function useGetProjectsByApprovalStatus<T extends PendingProject | ApprovedProject | RejectedProject>(
  statusType: ProjectApprovalStatus,
  itemsPerPage: number = 10
): UseGetProjectsByApprovalStatusReturn<T> {
  const [projects, setProjects] = useState<T[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const [isEmpty, setIsEmpty] = useState(false);
  const [retryCount, setRetryCount] = useState(0);

  const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

  const fetchProjects = useCallback(async (page: number, retryAttempt: number = 0) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await axios.get<PaginatedResponse<T>>(`/api/projects`, {
        params: {
          status: statusType,
          page,
          limit: itemsPerPage,
        },
      });

      const { data, metadata } = response.data;
      
      // Validate response data
      if (!Array.isArray(data)) {
        throw new Error('Invalid response format: data is not an array');
      }

      // Validate each project has required fields based on status
      const validatedData = data.filter(project => {
        if (!project || typeof project !== 'object') return false;
        if (!('id' in project) || !('title' in project) || !('groupNumber' in project)) return false;
        return true;
      });

      setProjects(validatedData);
      setTotalPages(metadata.totalPages);
      setTotalItems(metadata.totalItems);
      setCurrentPage(page);
      setIsEmpty(validatedData.length === 0);
      setRetryCount(0); // Reset retry count on success
    } catch (err) {
      console.error('Error fetching projects:', err);
      const axiosError = err as AxiosError;
      
      // Handle specific error cases
      if (axiosError.response?.status === 500 && retryAttempt < MAX_RETRIES) {
        // Retry with exponential backoff
        const retryDelay = RETRY_DELAY * Math.pow(2, retryAttempt);
        console.log(`Retrying request (attempt ${retryAttempt + 1}) after ${retryDelay}ms`);
        await delay(retryDelay);
        setRetryCount(retryAttempt + 1);
        return fetchProjects(page, retryAttempt + 1);
      }

      const errorMessage = axiosError.response?.data?.error || 
                          axiosError.message || 
                          'Failed to fetch projects';
      setError(new Error(errorMessage));
      setIsEmpty(true);
    } finally {
      setIsLoading(false);
    }
  }, [statusType, itemsPerPage]);

  useEffect(() => {
    fetchProjects(1);
  }, [statusType, fetchProjects]);

  const fetchNextPage = async () => {
    if (currentPage < totalPages) {
      await fetchProjects(currentPage + 1);
    }
  };

  const fetchPreviousPage = async () => {
    if (currentPage > 1) {
      await fetchProjects(currentPage - 1);
    }
  };

  const refresh = async () => {
    await fetchProjects(currentPage);
  };

  return {
    projects,
    isLoading,
    error,
    currentPage,
    totalPages,
    totalItems,
    fetchNextPage,
    fetchPreviousPage,
    refresh,
    isEmpty,
  };
}