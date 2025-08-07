// Copyright (c) 2025, Psycode Lab's (https://www.psycodelabs.lk). All Rights Reserved.
//
// This software is the property of Psycode Lab's. and its suppliers, if any.
// Dissemination of any information or reproduction of any material contained
// herein in any form is strictly forbidden, unless permitted by Psycode Lab's expressly.
// You may not alter or remove any copyright or other notice from copies of this content.

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
