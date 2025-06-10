import { useState, useEffect } from 'react';
import axios from 'axios';
import { useDebounce } from '../use-debounce';
import { ProjectSearchResult } from '@/types/search';

export const useProjectSearch = (initialQuery: string = '') => {
  const [query, setQuery] = useState(initialQuery);
  const [projects, setProjects] = useState<ProjectSearchResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Debounce the search query
  const debouncedQuery = useDebounce(query, 300);

  useEffect(() => {
    const searchProjects = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const response = await axios.get('/api/projects/search', {
          params: {
            q: debouncedQuery,
            limit: 5
          }
        });

        setProjects(response.data);
      } catch (err) {
        console.error('Error searching projects:', err);
        setError('Failed to search projects');
        setProjects([]);
      } finally {
        setIsLoading(false);
      }
    };

    // Always search on mount or when debounced query changes
    searchProjects();
  }, [debouncedQuery]);

  return {
    query,
    setQuery,
    projects,
    isLoading,
    error
  };
};
