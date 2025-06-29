import { useState, useEffect } from "react";
import axios from "axios";

export interface CompetitionInfo {
  title: string;
  description: string;
  type: string;
  startDate: string;
  endDate: string;
  coverImage?: string | null;
}

export const useCompetitionInfo = (competitionId?: string) => {
  const [competition, setCompetition] = useState<CompetitionInfo | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!competitionId) return;
    setIsLoading(true);
    setError(null);
    axios
      .get(`/api/awards/${competitionId}`)
      .then((res) => {
        setCompetition(res.data.competition);
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
