import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { ProjectVoteCard, VoteQueryParams } from "@/types/project/vote";
import { PaginatedResponse } from "@/types/project/pagination";

export function useVoteProjects(params: VoteQueryParams) {
  const [projects, setProjects] = useState<ProjectVoteCard[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [meta, setMeta] = useState<PaginatedResponse<ProjectVoteCard>['meta'] | null>(null);
  const [hasMore, setHasMore] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const fetchProjects = useCallback(async (page: number, shouldAppend: boolean = false) => {
    setIsLoading(true);
    setError(null);

    try {
      const queryParams = new URLSearchParams();
      queryParams.append('page', page.toString());
      queryParams.append('limit', String(params.limit || 10));
      
      if (params.title) {
        queryParams.append('title', params.title);
      }

      const response = await axios.get(`/api/projects/vote?${queryParams.toString()}`);
      const result = response.data as PaginatedResponse<ProjectVoteCard>;
      
      if (shouldAppend) {
        setProjects(prev => [...prev, ...result.data]);
      } else {
        setProjects(result.data);
      }
      
      setMeta(result.meta);
      setHasMore(page < result.meta.totalPages);
      setCurrentPage(page);

    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred while fetching projects');
      console.error('Error fetching vote projects:', err);
      if (!shouldAppend) {
        setProjects([]);
      }
    } finally {
      setIsLoading(false);
    }
  }, [params.title, params.limit]); // Only depend on the specific params that change

  // Fetch when title or limit params change
  useEffect(() => {
    setProjects([]);
    setCurrentPage(1);
    setHasMore(true);
    fetchProjects(1, false);
  }, [params.title, params.limit]);

  // Function to load more projects (for infinite scroll)
  const loadMore = useCallback(() => {
    if (!isLoading && hasMore) {
      fetchProjects(currentPage + 1, true);
    }
  }, [isLoading, hasMore, currentPage, fetchProjects]);

  // Function to refresh the list
  const refresh = useCallback(() => {
    setProjects([]);
    setCurrentPage(1);
    setHasMore(true);
    fetchProjects(1, false);
  }, [fetchProjects]);

  return {
    projects,
    isLoading,
    error,
    meta,
    hasMore,
    loadMore,
    refresh
  };
}
