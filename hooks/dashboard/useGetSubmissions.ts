'use client';

import { useState, useEffect } from 'react';

export interface SubmissionData {
  name: string;
  submissions: number;
}

export function useGetSubmissions() {
  const [data, setData] = useState<SubmissionData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSubmissions = async () => {
      try {
        setIsLoading(true);
        const response = await fetch('/api/admin/dashboard/submissions');
        
        if (!response.ok) {
          throw new Error('Failed to fetch submission data');
        }
        
        const data = await response.json();
        setData(data.submissions);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An unknown error occurred');
        console.error('Error fetching submission data:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchSubmissions();
  }, []);

  return { data, isLoading, error };
}
