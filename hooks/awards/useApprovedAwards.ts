/* Copyright (c) 2025, the contributors of the SDGP Connect project. All Rights Reserved.

This software is the joint property of the contributors to the SDGP Connect project.
Unauthorized distribution, commercial use, or reproduction of any part of this material
in any form is strictly prohibited without the explicit written consent of all contributors.
You may not alter or remove any copyright or attribution notice from this content. */


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
