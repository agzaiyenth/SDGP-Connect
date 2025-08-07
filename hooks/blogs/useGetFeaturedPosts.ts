
"use client"
// Copyright (c) 2025, Psycode Lab's (https://www.psycodelabs.lk). All Rights Reserved.
//
// This software is the property of Psycode Lab's. and its suppliers, if any.
// Dissemination of any information or reproduction of any material contained
// herein in any form is strictly forbidden, unless permitted by Psycode Lab's expressly.
// You may not alter or remove any copyright or other notice from copies of this content.
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
