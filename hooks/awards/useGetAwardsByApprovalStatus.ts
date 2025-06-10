import { useState, useEffect, useCallback } from 'react';

export function useGetAwardsByApprovalStatus(status: 'PENDING' | 'APPROVED' | 'REJECTED', searchQuery: string) {
  const [awards, setAwards] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<any>(null);
  const [isEmpty, setIsEmpty] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchAwards = useCallback(
    async (page = 1) => {
      setIsLoading(true);
      setError(null);
      try {
        const params = new URLSearchParams({
          status,
          search: searchQuery || '',
          page: page.toString(),
        });
        const res = await fetch(`/api/admin/awards?${params}`);
        if (!res.ok) throw new Error('Failed to fetch awards');
        const data = await res.json();
        setAwards(data.awards);
        setCurrentPage(data.currentPage);
        setTotalPages(data.totalPages);
        setIsEmpty(data.awards.length === 0);
      } catch (e) {
        setError(e);
      } finally {
        setIsLoading(false);
      }
    },
    [status, searchQuery]
  );

  useEffect(() => {
    fetchAwards(1);
  }, [fetchAwards]);

  const refresh = () => fetchAwards(currentPage);
  const fetchNextPage = () => {
    if (currentPage < totalPages) fetchAwards(currentPage + 1);
  };
  const fetchPreviousPage = () => {
    if (currentPage > 1) fetchAwards(currentPage - 1);
  };

  return {
    awards,
    isLoading,
    error,
    isEmpty,
    refresh,
    currentPage,
    totalPages,
    fetchNextPage,
    fetchPreviousPage,
  };
}
