'use client';

import { useState, useEffect } from 'react';

interface StatusCounts {
  approvedCount: number;
  pendingCount: number;
  rejectedCount: number;
}

export default function useGetCountByStatus() {
  const [statusCounts, setStatusCounts] = useState<StatusCounts | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchStatusCounts = async () => {
      try {
        setIsLoading(true);
        const response = await fetch('/api/admin/dashboard/status-count');
        
        if (!response.ok) {
          throw new Error('Failed to fetch project status counts');
        }
        
        const data = await response.json();
        setStatusCounts({
          approvedCount: data.approvedCount,
          pendingCount: data.pendingCount,
          rejectedCount: data.rejectedCount
        });
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An unknown error occurred');
        console.error('Error fetching project status counts:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchStatusCounts();
  }, []);

  return { statusCounts, isLoading, error };
}
