import { useState, useEffect, useCallback } from "react";
import axios from "axios";

export interface ApprovedCompetition {
  id: string;
  name: string;
  description: string;
  logo: string | null;
  cover: string | null;
type: string;
  startDate: string;
  endDate: string;
  winnersCount: number;
}

export const useApprovedCompetitions = (initialLimit = 9) => {
  const [competitions, setCompetitions] = useState<ApprovedCompetition[]>([]);
  const [nextCursor, setNextCursor] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hasMore, setHasMore] = useState(true);

  const fetchCompetitions = useCallback(async (cursor?: string) => {
    setIsLoading(true);
    setError(null);
    try {
      const params: any = { limit: initialLimit };
      if (cursor) params.cursor = cursor;
      const res = await axios.get("/api/competition/approved", { params });
      const { competitions: newComps, nextCursor: newCursor } = res.data;
      setCompetitions((prev) => [...prev, ...newComps]);
      setNextCursor(newCursor);
      setHasMore(!!newCursor);
    } catch (err) {
      setError("Failed to load competitions");
    } finally {
      setIsLoading(false);
    }
  }, [initialLimit]);

  useEffect(() => {
    setCompetitions([]);
    setNextCursor(null);
    setHasMore(true);
    fetchCompetitions();
    // eslint-disable-next-line
  }, [initialLimit]);

  const fetchMore = () => {
    if (hasMore && !isLoading && nextCursor) {
      fetchCompetitions(nextCursor);
    }
  };

  return { competitions, isLoading, error, fetchMore, hasMore };
};
