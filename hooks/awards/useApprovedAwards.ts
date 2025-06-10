import { useState, useEffect } from 'react';

export function useApprovedAwards() {
  const [awards, setAwards] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    fetch('/api/admin/awards/approved')
      .then((res) => res.json())
      .then((data) => setAwards(data))
      .finally(() => setIsLoading(false));
  }, []);

  return { awards, isLoading };
}
