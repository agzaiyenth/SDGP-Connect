'use client';

import { useState, useEffect } from 'react';

export default function useGetTotalProjectsCount() {
  const [count, setCount] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTotalCount = async () => {
      try {
        setIsLoading(true);
        const response = await fetch('/api/admin/dashboard/total-count');
        
        if (!response.ok) {
          throw new Error('Failed to fetch total projects count');
        }
        
        const data = await response.json();
        setCount(data.count);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An unknown error occurred');
        console.error('Error fetching total projects count:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTotalCount();
  }, []);

  return { count, isLoading, error };
}
