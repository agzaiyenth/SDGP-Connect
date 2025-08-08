/* Copyright (c) 2025, the contributors of the SDGP Connect project. All Rights Reserved.

This software is the joint property of the contributors to the SDGP Connect project.
Unauthorized distribution, commercial use, or reproduction of any part of this material
in any form is strictly prohibited without the explicit written consent of all contributors.
You may not alter or remove any copyright or attribution notice from this content. */


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
