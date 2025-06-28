import { useEffect, useState } from 'react';
import { BlogPost } from '@/types/blog';

interface UseGetRecentPostsOptions {
  limit?: number;
}

interface UseGetRecentPostsReturn {
  posts: BlogPost[];
  isLoading: boolean;
  error: string | null;
  refetch: () => void;
}

export const useGetRecentPosts = (options: UseGetRecentPostsOptions = {}): UseGetRecentPostsReturn => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchRecentPosts = async () => {
    try {
      setIsLoading(true);
      setError(null);      const params = new URLSearchParams();
      params.append('page', '1');
      params.append('limit', (options.limit || 9).toString());

      const response = await fetch(`/api/blogs?${params}`);
      if (!response.ok) {
        throw new Error('Failed to fetch recent posts');
      }

      const result = await response.json();
      if (!result.success) {
        throw new Error(result.error || 'Failed to fetch recent posts');
      }

      setPosts(result.data);
    } catch (err) {
      console.error('Error fetching recent posts:', err);
      setError(err instanceof Error ? err.message : 'Failed to fetch recent posts');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchRecentPosts();
  }, [options.limit]);

  return {
    posts,
    isLoading,
    error,
    refetch: fetchRecentPosts
  };
};