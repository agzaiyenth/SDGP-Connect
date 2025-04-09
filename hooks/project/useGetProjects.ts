// hooks/useProjects.ts
import { useEffect, useState } from 'react';
import { PaginatedResponse } from '../../types/project/pagination'; 
import { ProjectCardType } from '../../types/project/card'; // Adjust path if needed

// Make sure ProjectQueryParams matches the keys used in the API and page
// interface ProjectQueryParams {
//   page?: number;
//   limit?: number;
//   search?: string;
//   projectTypes?: string[]; // Changed from 'types'
//   domains?: string[];
//   status?: string[];
//   sdgGoals?: string[];
//   techStack?: string[];
//   years?: string[]; // Added years
// }

// Hook now accepts current parameters derived from URLSearchParams
function useProjects(currentParams: ProjectQueryParams) {
  const [projects, setProjects] = useState<ProjectCardType[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [meta, setMeta] = useState<PaginatedResponse<ProjectCardType>['meta'] | null>(null);
  // Removed internal params state: const [params, setParams] = useState(...)

  useEffect(() => {
    const fetchProjects = async () => {
      setIsLoading(true);
      setError(null);
      setProjects([]); // Clear previous results while loading new ones
      setMeta(null);

      try {
        // Build query string directly from the passed currentParams
        const queryParams = new URLSearchParams();

        if (currentParams.page) queryParams.append('page', currentParams.page.toString());
        if (currentParams.limit) queryParams.append('limit', currentParams.limit.toString());
        if (currentParams.title) queryParams.append('title', currentParams.title);

        // Use the correct keys matching the API route and page component
        if (currentParams.projectTypes && currentParams.projectTypes.length > 0) {
          currentParams.projectTypes.forEach(type => queryParams.append('projectTypes', type)); // Correct key
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

        // Add years parameter handling
        if (currentParams.years && currentParams.years.length > 0) {
            currentParams.years.forEach(year => queryParams.append('years', year));
        }

        const response = await fetch(`/api/projects?${queryParams.toString()}`);

        if (!response.ok) {
          const errorData = await response.text(); // Get more error details
          throw new Error(`Error ${response.status}: ${errorData || response.statusText}`);
        }

        const result = await response.json() as PaginatedResponse<ProjectCardType>;
        setProjects(result.data);
        setMeta(result.meta);

      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred while fetching projects');
        console.error('Error fetching projects:', err);
        setProjects([]); // Clear projects on error
        setMeta(null);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProjects();
    // useEffect dependency is now the parameters passed from the page component
  }, [currentParams]);

  // Return values - no need for updateParams or goToPage here
  return {
    projects,
    isLoading,
    error,
    meta,
    // Removed updateParams,
    // Removed goToPage
  };
}

export { useProjects };
// Make sure to define or import ProjectQueryParams type correctly
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