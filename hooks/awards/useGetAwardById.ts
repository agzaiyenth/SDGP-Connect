import { useState, useEffect } from "react";
import axios from "axios";

export function useGetAwardById(id: string | undefined) {
  const [award, setAward] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    if (!id) {
      setAward(null);
      return;
    }
    setIsLoading(true);
    setIsError(false);
    axios
      .get(`/api/admin/awards/${id}`)
      .then((res) => {
        setAward(res.data.award);
      })
      .catch(() => {
        setIsError(true);
        setAward(null);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [id]);

  return {
    award,
    isLoading,
    isError,
  };
}
