import { useEffect, useState, useCallback } from 'react';
import { BlogPost } from '@/types/blog';

interface UseGetPostsByCategoryOptions {
  category?: string;
  limit?: number;
  search?: string;
}

interface UseGetPostsByCategoryReturn {
  posts: BlogPost[];
  isLoading: boolean;
  error: string | null;
  refetch: () => void;
}

export const useGetPostsByCategory = (options: UseGetPostsByCategoryOptions = {}): UseGetPostsByCategoryReturn => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const { category, limit, search } = options;

  const fetchPostsByCategory = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);

      const params = new URLSearchParams();
      
      if (category && category !== "All") {
        params.append('category', category);
      }
      
      if (limit) {
        params.append('limit', limit.toString());
      }
      
      if (search) {
        params.append('search', search);
      }

      const response = await fetch(`/api/blogs?${params}`);
      if (!response.ok) {
        throw new Error('Failed to fetch posts');
      }

      const result = await response.json();
      if (!result.success) {
        throw new Error(result.error || 'Failed to fetch posts');
      }

      setPosts(result.data);
    } catch (err) {
      console.error('Error fetching posts by category:', err);
      setError(err instanceof Error ? err.message : 'Failed to fetch posts');
    } finally {
      setIsLoading(false);
    }
  }, [category, limit, search]);

  useEffect(() => {
    fetchPostsByCategory();
  }, [fetchPostsByCategory]);

  return {
    posts,
    isLoading,
    error,
    refetch: fetchPostsByCategory
  };
};