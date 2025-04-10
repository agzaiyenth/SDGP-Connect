'use client';
import { useState, useEffect } from 'react';

export default function useGetPendingProjectsCount() {
  const [count, setCount] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPendingCount = async () => {
      try {
        setIsLoading(true);
        const response = await fetch('/api/admin/dashboard/pending-count');
        
        if (!response.ok) {
          throw new Error('Failed to fetch pending projects count');
        }
        
        const data = await response.json();
        setCount(data.count);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An unknown error occurred');
        console.error('Error fetching pending projects count:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPendingCount();
  }, []);

  return { count, isLoading, error };
}
