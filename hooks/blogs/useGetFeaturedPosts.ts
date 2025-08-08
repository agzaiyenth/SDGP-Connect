"use client"
/* Copyright (c) 2025, the contributors of the SDGP Connect project. All Rights Reserved.

This software is the joint property of the contributors to the SDGP Connect project.
Unauthorized distribution, commercial use, or reproduction of any part of this material
in any form is strictly prohibited without the explicit written consent of all contributors.
You may not alter or remove any copyright or attribution notice from this content. */

import { useEffect, useState } from 'react';
import axios from 'axios';
import { BlogPost } from '@/types/blog';

interface UseGetFeaturedPostsOptions {
  limit?: number;
}

interface UseGetFeaturedPostsReturn {
  featuredPosts: BlogPost[];
  isLoading: boolean;
  error: string | null;
  refetch: () => void;
}

export const useGetFeaturedPosts = (options: UseGetFeaturedPostsOptions = {}): UseGetFeaturedPostsReturn => {
  const [featuredPosts, setFeaturedPosts] = useState<BlogPost[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchFeaturedPosts = async () => {
    try {
      setIsLoading(true);
      setError(null);

      const params = new URLSearchParams();
      if (options.limit) {
        params.append('limit', options.limit.toString());
      }

      const response = await axios.get(`/api/blogs/featured?${params}`);
      
      if (response.data.success) {
        setFeaturedPosts(response.data.data || []);
      } else {
        throw new Error(response.data.error || 'Failed to fetch featured posts');
      }
      
    } catch (err) {
      console.error('Error fetching featured posts:', err);
      setError(err instanceof Error ? err.message : 'Failed to fetch featured posts');
      setFeaturedPosts([]);
    } finally {
      setIsLoading(false);
    }
  };

  const refetch = () => {
    fetchFeaturedPosts();
  };

  useEffect(() => {
    fetchFeaturedPosts();
  }, [options.limit]);

  return {
    featuredPosts,
    isLoading,
    error,
    refetch
  };
};
