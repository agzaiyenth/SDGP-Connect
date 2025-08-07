// Copyright (c) 2025, Psycode Lab's (https://www.psycodelabs.lk). All Rights Reserved.
//
// This software is the property of Psycode Lab's. and its suppliers, if any.
// Dissemination of any information or reproduction of any material contained
// herein in any form is strictly forbidden, unless permitted by Psycode Lab's expressly.
// You may not alter or remove any copyright or other notice from copies of this content.

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';

export const useCurrentUser = () => {
  const { data: session, status } = useSession();
  const [isAdmin, setIsAdmin] = useState(false);
  const [role, setRole] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (status === 'loading') {
      setLoading(true);
      return;
    }

    if (!session) {
      setLoading(false);
      setRole(null);
      setIsAdmin(false);
      return;
    }

    // Extract role from session
    // Assuming session.user.role contains the user's role
    const userRole = (session.user as any)?.role || null;
    setRole(userRole);
    setIsAdmin(userRole === 'ADMIN');
    setLoading(false);
  }, [session, status]);

  return { role, isAdmin, loading };
};
