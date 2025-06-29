import { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import { BlogPost } from '@/types/blog';

interface UseGetAllBlogsOptions {
  category?: string;
  search?: string;
  limit?: number;
  excludeFeatured?: boolean;
}

interface UseGetAllBlogsReturn {
  posts: BlogPost[];
  isLoading: boolean;
  isLoadingMore: boolean;
  error: string | null;
  hasMore: boolean;
  loadMore: () => void;
  refetch: () => void;
  totalCount: number;
}

export const useGetAllBlogs = (options: UseGetAllBlogsOptions = {}): UseGetAllBlogsReturn => {  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [totalCount, setTotalCount] = useState(0);
  const fetchPosts = useCallback(async (page: number = 1, shouldAppend: boolean = false) => {
    try {
  
      if (!shouldAppend) {
        setIsLoading(true);
      } else {
        setIsLoadingMore(true);
      }
      setError(null);

      const params = new URLSearchParams();
      params.append('page', page.toString());
      params.append('limit', (options.limit || 9).toString());
      
      if (options.category && options.category !== "All") {
        params.append('category', options.category);
      }
      
      if (options.search && options.search.trim()) {
        params.append('search', options.search.trim());      }
      
      if (options.excludeFeatured) {
        params.append('excludeFeatured', 'true');
      }

      const response = await axios.get(`/api/blogs/all?${params}`);
      
      if (response.data.success) {
        if (shouldAppend) {
          setPosts(prev => [...prev, ...response.data.data]);
        } else {
          setPosts(response.data.data || []);
        }

        // Update pagination info
        if (response.data.pagination) {
          setHasMore(response.data.pagination.hasMore);
          setTotalCount(response.data.pagination.total);
        } else {
          // Fallback for older API response format          setHasMore(response.data.data.length === (options.limit || 9));
        }
      } else {
        throw new Error(response.data.error || 'Failed to fetch posts');
      }
      
    } catch (err) {
      console.error('Error fetching posts:', err);
      setError(err instanceof Error ? err.message : 'Failed to fetch posts');
      if (!shouldAppend) {
        setPosts([]);
      }
    } finally {
      setIsLoading(false);
      setIsLoadingMore(false);
    }
  }, [options.category, options.search, options.limit, options.excludeFeatured]);

  const loadMore = useCallback(() => {
    if (!isLoading && !isLoadingMore && hasMore) {
      const nextPage = currentPage + 1;
      setCurrentPage(nextPage);
      fetchPosts(nextPage, true);
    }
  }, [currentPage, hasMore, isLoading, isLoadingMore, fetchPosts]);

  const refetch = useCallback(() => {
    setCurrentPage(1);
    setHasMore(true);
    setPosts([]);
    fetchPosts(1, false);
  }, [fetchPosts]);

  useEffect(() => {
    setCurrentPage(1);
    setHasMore(true);
    setPosts([]);
    fetchPosts(1, false);
  }, [options.category, options.search, options.excludeFeatured]);

  return {
    posts,
    isLoading,
    isLoadingMore,
    error,
    hasMore,
    loadMore,
    refetch,
    totalCount
  };
};
