import { useState, useEffect } from "react";
import axios from "axios";

export function useGetCompetitionById(id: string | undefined) {
  const [competition, setCompetition] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    if (!id) {
      setCompetition(null);
      return;
    }
    setIsLoading(true);
    setIsError(false);
    axios
      .get(`/api/admin/competitions/${id}`)
      .then((res) => {
        setCompetition(res.data.competition);
      })
      .catch(() => {
        setIsError(true);
        setCompetition(null);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [id]);

  return {
    competition,
    isLoading,
    isError,
  };
}
