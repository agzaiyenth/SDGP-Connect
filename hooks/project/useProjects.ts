import { useEffect, useState } from 'react';
import { PaginatedResponse, ProjectQueryParams } from '../../types/project/pagination';
import { ProjectCardType } from '../../types/project/card';

function useProjects(initialParams?: ProjectQueryParams) {
  const [projects, setProjects] = useState<ProjectCardType[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [meta, setMeta] = useState<PaginatedResponse<ProjectCardType>['meta'] | null>(null);
  const [params, setParams] = useState<ProjectQueryParams>(initialParams || {
    page: 1,
    limit: 9
  });

  useEffect(() => {
    const fetchProjects = async () => {
      setIsLoading(true);
      setError(null);

      try {
        // Build query string from params
        const queryParams = new URLSearchParams();
        
        if (params.page) queryParams.append('page', params.page.toString());
        if (params.limit) queryParams.append('limit', params.limit.toString());
        if (params.search) queryParams.append('search', params.search);
        
        // Handle array parameters
        if (params.types && params.types.length > 0) {
          params.types.forEach(type => queryParams.append('types', type));
        }
        
        if (params.domains && params.domains.length > 0) {
          params.domains.forEach(domain => queryParams.append('domains', domain));
        }
        
        if (params.status && params.status.length > 0) {
          params.status.forEach(status => queryParams.append('status', status));
        }
        
        if (params.sdgGoals && params.sdgGoals.length > 0) {
          params.sdgGoals.forEach(goal => queryParams.append('sdgGoals', goal));
        }

        if (params.techStack && params.techStack.length > 0) {
          params.techStack.forEach(tech => queryParams.append('techStack', tech));
        }

        const response = await fetch(`/api/projects?${queryParams.toString()}`);
        
        if (!response.ok) {
          throw new Error(`Error: ${response.status}`);
        }

        const result = await response.json() as PaginatedResponse<ProjectCardType>;
        setProjects(result.data);
        setMeta(result.meta);
        
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred while fetching projects');
        console.error('Error fetching projects:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProjects();
  }, [params]);

  const updateParams = (newParams: Partial<ProjectQueryParams>) => {
    setParams(prev => ({
      ...prev,
      ...newParams,
    }));
  };

  const goToPage = (page: number) => {
    updateParams({ page });
  };
  return {
    projects,
    isLoading,
    error,
    meta,
    updateParams,
    goToPage
  };
}


export { useProjects };
