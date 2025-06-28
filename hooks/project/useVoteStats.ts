import { useState, useEffect } from "react";
import axios from "axios";
import { VoteStats } from "@/types/project/vote";

export function useVoteStats() {
  const [stats, setStats] = useState<VoteStats | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        setIsLoading(true);
        setIsError(false);
        const response = await axios.get("/api/projects/vote/stats");
        setStats(response.data);
      } catch (error) {
        console.error("Error fetching vote stats:", error);
        setIsError(true);
        setStats(null);
      } finally {
        setIsLoading(false);
      }
    };

    fetchStats();
  }, []);

  return {
    stats,
    isLoading,
    isError,
    refetch: () => {
      setIsLoading(true);
      setIsError(false);
      axios.get("/api/projects/vote/stats")
        .then(response => setStats(response.data))
        .catch(() => setIsError(true))
        .finally(() => setIsLoading(false));
    }
  };
}
