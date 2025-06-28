import { useState, useEffect } from 'react';
import { BlogListResponse } from '@/types/blog/admin';

interface UseGetBlogsByStatusProps {
  status?: 'pending' | 'approved' | 'rejected' | '';
  page?: number;
  limit?: number;
  search?: string;
}

export const useGetBlogsByStatus = ({
  status = '',
  page = 1,
  limit = 10,
  search = '',
}: UseGetBlogsByStatusProps = {}) => {
  const [data, setData] = useState<BlogListResponse | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchBlogs = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const params = new URLSearchParams({
        page: page.toString(),
        limit: limit.toString(),
        ...(status && { status }),
        ...(search && { search }),
      });

      const response = await fetch(`/api/admin/blogs?${params}`);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      setData(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      console.error('Error fetching blogs:', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, [status, page, limit, search]);

  return {
    blogs: data?.blogs || [],
    total: data?.total || 0,
    page: data?.page || 1,
    totalPages: data?.totalPages || 0,
    isLoading,
    error,
    refetch: fetchBlogs,
  };
};
