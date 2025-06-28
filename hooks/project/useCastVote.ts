import { useState } from "react";
import axios from "axios";
import { VoteResponse } from "@/types/project/vote";

export function useCastVote() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const castVote = async (projectId: string): Promise<VoteResponse | null> => {
    try {
      setIsLoading(true);
      setError(null);

      const response = await axios.post("/api/projects/vote", {
        projectId
      });

      return response.data;
    } catch (err) {
      const errorMessage = axios.isAxiosError(err) 
        ? err.response?.data?.error || err.message 
        : 'Failed to cast vote';
      
      setError(errorMessage);
      console.error('Error casting vote:', err);
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    castVote,
    isLoading,
    error,
    clearError: () => setError(null)
  };
}
