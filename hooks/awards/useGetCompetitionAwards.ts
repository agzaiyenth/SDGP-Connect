import { useState, useEffect } from "react";
import axios from "axios";

export interface CompetitionAward {
  id: string; // award.id
  projectName: string; // projectmetadata.title
  team: string; // projectmetadata.group_number
  sdgpYear: string; // projectmetadata.sgp_year
  cover: string; // award.image
  award: string; // award.name
  description: string; // projectmetadata.subtitle
}

export const useGetCompetitionAwards = (competitionId?: string) => {
  const [awards, setAwards] = useState<CompetitionAward[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!competitionId) return;
    setIsLoading(true);
    setError(null);
    axios
      .get(`/api/awards/${competitionId}`)
      .then((res) => {
        setAwards(res.data.awards || []);
      })
      .catch(() => {
        setError("Failed to load awards");
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [competitionId]);

  return { awards, isLoading, error };
};
