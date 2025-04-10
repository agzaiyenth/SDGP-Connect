'use client';
import { useState, useEffect } from 'react';

export default function useGetFeaturedProjectsCount() {
  const [count, setCount] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchFeaturedCount = async () => {
      try {
        setIsLoading(true);
        const response = await fetch('/api/admin/dashboard/featured-count');
        
        if (!response.ok) {
          throw new Error('Failed to fetch featured projects count');
        }
        
        const data = await response.json();
        setCount(data.count);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An unknown error occurred');
        console.error('Error fetching featured projects count:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchFeaturedCount();
  }, []);

  return { count, isLoading, error };
}
