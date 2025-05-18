// hooks/useProjects.ts
import { useEffect, useState, useCallback } from 'react';
import { PaginatedResponse } from '../../types/project/pagination'; 
import { ProjectCardType } from '../../types/project/card';

// Hook now accepts current parameters derived from URLSearchParams
// and supports infinite scrolling by accumulating projects
function useProjects(currentParams: ProjectQueryParams) {
  const [projects, setProjects] = useState<ProjectCardType[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [meta, setMeta] = useState<PaginatedResponse<ProjectCardType>['meta'] | null>(null);
  const [hasMore, setHasMore] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);

  const fetchProjects = useCallback(async (page: number, shouldAppend: boolean = false) => {
    setIsLoading(true);
    setError(null);

    try {
      // Build query string from current parameters but override the page
      const queryParams = new URLSearchParams();
      
      // Set page from the parameter
      queryParams.append('page', page.toString());
      queryParams.append('limit', String(currentParams.limit || 9));
      
      if (currentParams.title) queryParams.append('title', currentParams.title);

      // Use the correct keys matching the API route and page component
      if (currentParams.projectTypes && currentParams.projectTypes.length > 0) {
        currentParams.projectTypes.forEach(type => queryParams.append('projectTypes', type));
      }

      if (currentParams.domains && currentParams.domains.length > 0) {
        currentParams.domains.forEach(domain => queryParams.append('domains', domain));
      }

      if (currentParams.status && currentParams.status.length > 0) {
        currentParams.status.forEach(status => queryParams.append('status', status));
      }

      if (currentParams.sdgGoals && currentParams.sdgGoals.length > 0) {
        currentParams.sdgGoals.forEach(goal => queryParams.append('sdgGoals', goal));
      }

      if (currentParams.techStack && currentParams.techStack.length > 0) {
        currentParams.techStack.forEach(tech => queryParams.append('techStack', tech));
      }

      if (currentParams.years && currentParams.years.length > 0) {
        currentParams.years.forEach(year => queryParams.append('years', year));
      }

      const response = await fetch(`/api/projects?${queryParams.toString()}`);

      if (!response.ok) {
        const errorData = await response.text();
        throw new Error(`Error ${response.status}: ${errorData || response.statusText}`);
      }

      const result = await response.json() as PaginatedResponse<ProjectCardType>;
      
      // For infinite scroll: append new projects instead of replacing them
      if (shouldAppend) {
        setProjects(prev => [...prev, ...result.data]);
      } else {
        setProjects(result.data);
      }
      
      setMeta(result.meta);
      
      // Update hasMore based on pagination metadata
      setHasMore(page < result.meta.totalPages);
      setCurrentPage(page);

    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred while fetching projects');
      console.error('Error fetching projects:', err);
      if (!shouldAppend) {
        setProjects([]);
      }
    } finally {
      setIsLoading(false);
    }
  }, [currentParams]);

  // Initial load of projects - reset everything
  useEffect(() => {
    setProjects([]);
    setCurrentPage(1);
    setHasMore(true);
    fetchProjects(1, false);
  }, [
    currentParams.title,
    currentParams.limit,
    currentParams.projectTypes?.join(','),
    currentParams.domains?.join(','),
    currentParams.status?.join(','),
    currentParams.sdgGoals?.join(','),
    currentParams.techStack?.join(','),
    currentParams.years?.join(','),
    fetchProjects
  ]);

  // Function to load more projects (called when user scrolls to bottom)
  const loadMore = useCallback(() => {
    if (!isLoading && hasMore) {
      fetchProjects(currentPage + 1, true);
    }
  }, [isLoading, hasMore, currentPage, fetchProjects]);

  return {
    projects,
    isLoading,
    error,
    meta,
    hasMore,
    loadMore
  };
}

export { useProjects };

export interface ProjectQueryParams {
  page?: number;
  limit?: number;
  title?: string;
  projectTypes?: string[];
  domains?: string[];
  status?: string[];
  sdgGoals?: string[];
  techStack?: string[];
  years?: string[];
}