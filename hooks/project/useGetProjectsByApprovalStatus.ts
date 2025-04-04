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

  const fetchProjects = useCallback(async (page: number) => {
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
      setProjects(data);
      setTotalPages(metadata.totalPages);
      setTotalItems(metadata.totalItems);
      setCurrentPage(page);
      setIsEmpty(data.length === 0);
    } catch (err) {
      const axiosError = err as AxiosError;
      const errorMessage = axiosError.response?.data?.error || axiosError.message || 'Failed to fetch projects';
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