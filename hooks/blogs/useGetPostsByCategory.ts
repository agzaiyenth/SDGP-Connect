import { useEffect, useState } from 'react';
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

  const fetchPostsByCategory = async () => {
    try {
      setIsLoading(true);
      setError(null);

      const params = new URLSearchParams();
      
      if (options.category && options.category !== "All") {
        params.append('category', options.category);
      }
      
      if (options.limit) {
        params.append('limit', options.limit.toString());
      }
      
      if (options.search) {
        params.append('search', options.search);
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
  };

  useEffect(() => {
    fetchPostsByCategory();
  }, [options.category, options.limit, options.search]);

  return {
    posts,
    isLoading,
    error,
    refetch: fetchPostsByCategory
  };
};