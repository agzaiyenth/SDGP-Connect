import { useState, useEffect } from 'react';
import axios from 'axios';

import { CompetitionSearchResult } from '@/types/search';
import { useDebounce } from '../use-debounce';

export const useCompetitionSearch = (initialQuery: string = '') => {
  const [query, setQuery] = useState(initialQuery);
  const [competitions, setCompetitions] = useState<CompetitionSearchResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Debounce the search query
  const debouncedQuery = useDebounce(query, 300);

  useEffect(() => {
    const searchCompetitions = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const response = await axios.get('/api/competition/search', {
          params: {
            q: debouncedQuery,
            limit: 5
          }
        });

        setCompetitions(response.data);
      } catch (err) {
        console.error('Error searching competitions:', err);
        setError('Failed to search competitions');
        setCompetitions([]);
      } finally {
        setIsLoading(false);
      }
    };

    // Always search on mount or when debounced query changes
    searchCompetitions();
  }, [debouncedQuery]);

  return {
    query,
    setQuery,
    competitions,
    isLoading,
    error
  };
};
