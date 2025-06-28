import { useState, useEffect } from "react";
import axios from "axios";

interface VoteStatus {
  hasVoted: boolean;
  votedProjectId: string | null;
  voteChangeCount: number;
  firstVotedAt: string | null;
  lastVotedAt: string | null;
}

export function useVoteStatus() {
  const [status, setStatus] = useState<VoteStatus | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const checkStatus = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const response = await axios.get("/api/projects/vote/status");
      setStatus(response.data);
    } catch (err) {
      console.error("Error checking vote status:", err);
      setError(err instanceof Error ? err.message : "Failed to check vote status");
      setStatus(null);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    checkStatus();
  }, []);

  return {
    status,
    isLoading,
    error,
    refetch: checkStatus
  };
}
