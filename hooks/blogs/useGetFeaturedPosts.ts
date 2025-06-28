import { useEffect, useState } from 'react';
import { BlogPost } from '@/types/blog';

interface UseGetFeaturedPostsOptions {
  limit?: number;
}

interface UseGetFeaturedPostsReturn {
  posts: BlogPost[];
  isLoading: boolean;
  error: string | null;
  refetch: () => void;
}

export const useGetFeaturedPosts = (options: UseGetFeaturedPostsOptions = {}): UseGetFeaturedPostsReturn => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchFeaturedPosts = async () => {
    try {
      setIsLoading(true);
      setError(null);

      const params = new URLSearchParams({
        featured: 'true',
        ...(options.limit && { limit: options.limit.toString() })
      });

      const response = await fetch(`/api/blogs?${params}`);
      if (!response.ok) {
        throw new Error('Failed to fetch featured posts');
      }

      const result = await response.json();
      if (!result.success) {
        throw new Error(result.error || 'Failed to fetch featured posts');
      }

      setPosts(result.data);
    } catch (err) {
      console.error('Error fetching featured posts:', err);
      setError(err instanceof Error ? err.message : 'Failed to fetch featured posts');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchFeaturedPosts();
  }, [options.limit]);

  return {
    posts,
    isLoading,
    error,
    refetch: fetchFeaturedPosts
  };
};