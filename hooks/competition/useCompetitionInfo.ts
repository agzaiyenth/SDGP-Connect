import { useState, useEffect } from "react";
import axios from "axios";

export interface CompetitionInfo {
  id: string;
  title: string;
  description: string;
  startDate: string;
  endDate: string;
}

export const useCompetitionInfo = (competitionId?: string) => {
  const [competition, setCompetition] = useState<CompetitionInfo | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!competitionId) return;
    setIsLoading(true);
    setError(null);
    axios
      .get(`/api/competition/info/${competitionId}`)
      .then((res) => {
        setCompetition(res.data);
      })
      .catch(() => {
        setError("Failed to load competition info");
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [competitionId]);

  return { competition, isLoading, error };
};
