import { useCallback, useEffect, useState } from "react";
import { ApprovalStatus } from "@prisma/client";

export function useGetCompetitionsByApprovalStatus(status, searchQuery) {
  const [competitions, setCompetitions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isEmpty, setIsEmpty] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchCompetitions = useCallback(
    async (page = 1) => {
      setIsLoading(true);
      setError(null);
      try {
        const params = new URLSearchParams({
          status,
          search: searchQuery || "",
          page: page.toString(),
        });
        const res = await fetch(`/api/admin/competitions?${params}`);
        if (!res.ok) throw new Error("Failed to fetch competitions");
        const data = await res.json();
        setCompetitions(data.competitions);
        setCurrentPage(data.currentPage);
        setTotalPages(data.totalPages);
        setIsEmpty(data.competitions.length === 0);
      } catch (e) {
        setError(e);
      } finally {
        setIsLoading(false);
      }
    },
    [status, searchQuery]
  );

  useEffect(() => {
    fetchCompetitions(1);
  }, [fetchCompetitions]);

  const refresh = () => fetchCompetitions(currentPage);
  const fetchNextPage = () => {
    if (currentPage < totalPages) fetchCompetitions(currentPage + 1);
  };
  const fetchPreviousPage = () => {
    if (currentPage > 1) fetchCompetitions(currentPage - 1);
  };

  return {
    competitions,
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
