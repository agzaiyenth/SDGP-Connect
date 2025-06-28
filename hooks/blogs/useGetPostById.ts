import { useEffect, useState } from 'react';
import { BlogPost } from '@/types/blog';

interface UseGetPostByIdReturn {
  post: BlogPost | null;
  isLoading: boolean;
  error: string | null;
  refetch: () => void;
}

export const useGetPostById = (id: string): UseGetPostByIdReturn => {
  const [post, setPost] = useState<BlogPost | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchPostById = async () => {
    if (!id) {
      setIsLoading(false);
      return;
    }

    try {
      setIsLoading(true);
      setError(null);

      const response = await fetch(`/api/blogs/${id}`);
      if (!response.ok) {
        throw new Error('Failed to fetch post');
      }

      const result = await response.json();
      if (!result.success) {
        throw new Error(result.error || 'Failed to fetch post');
      }

      setPost(result.data);
    } catch (err) {
      console.error('Error fetching post by id:', err);
      setError(err instanceof Error ? err.message : 'Failed to fetch post');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchPostById();
  }, [id]);

  return {
    post,
    isLoading,
    error,
    refetch: fetchPostById
  };
};