import { useEffect, useState } from 'react';
import { BlogPost } from '@/types/blog';

interface UseGetAllPostsOptions {
  category?: string;
  search?: string;
  featured?: boolean;
  limit?: number;
  page?: number;
}

interface UseGetAllPostsReturn {
  allPosts: BlogPost[];
  featuredPosts: BlogPost[];
  isLoading: boolean;
  error: string | null;
  hasMore: boolean;
  loadMore: () => void;
  refetch: () => void;
}

export const useGetAllPosts = (options: UseGetAllPostsOptions = {}): UseGetAllPostsReturn => {
  const [allPosts, setAllPosts] = useState<BlogPost[]>([]);
  const [featuredPosts, setFeaturedPosts] = useState<BlogPost[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const fetchPosts = async (page: number = 1, shouldAppend: boolean = false) => {
    try {
      if (!shouldAppend) {
        setIsLoading(true);
      }
      setError(null);      // Fetch posts with pagination
      const allPostsParams = new URLSearchParams();
      allPostsParams.append('page', page.toString());
      allPostsParams.append('limit', (options.limit || 9).toString());
      
      // Only exclude featured posts if we're on the main page (no search/category filters)
      if (!options.search && (!options.category || options.category === "All")) {
        allPostsParams.append('excludeFeatured', 'true');
      }
      
      if (options.category && options.category !== "All") {
        allPostsParams.append('category', options.category);
      }
      if (options.search) {
        allPostsParams.append('search', options.search);
      }

      // Fetch featured posts separately (only on first load)
      const promises = [
        fetch(`/api/blogs?${allPostsParams}`),
      ];

      if (page === 1) {
        const featuredParams = new URLSearchParams({
          featured: 'true',
          limit: '10' // Limit featured posts
        });
        promises.push(fetch(`/api/blogs?${featuredParams}`));
      }

      const responses = await Promise.all(promises);
      
      if (!responses[0].ok || (responses[1] && !responses[1].ok)) {
        throw new Error('Failed to fetch posts');
      }

      const [allPostsResult, featuredResult] = await Promise.all([
        responses[0].json(),
        responses[1] ? responses[1].json() : { success: true, data: featuredPosts }
      ]);

      if (!allPostsResult.success || (responses[1] && !featuredResult.success)) {
        throw new Error('Failed to fetch posts');
      }

      if (shouldAppend) {
        setAllPosts(prev => [...prev, ...allPostsResult.data]);
      } else {
        setAllPosts(allPostsResult.data);
      }

      if (page === 1 && featuredResult.data) {
        setFeaturedPosts(featuredResult.data);
      }

      // Check if there are more posts
      setHasMore(allPostsResult.data.length === (options.limit || 9));
      
    } catch (err) {
      console.error('Error fetching posts:', err);
      setError(err instanceof Error ? err.message : 'Failed to fetch posts');
    } finally {
      setIsLoading(false);
    }
  };

  const loadMore = () => {
    if (!isLoading && hasMore) {
      const nextPage = currentPage + 1;
      setCurrentPage(nextPage);
      fetchPosts(nextPage, true);
    }
  };

  const refetch = () => {
    setCurrentPage(1);
    setHasMore(true);
    fetchPosts(1, false);
  };

  useEffect(() => {
    setCurrentPage(1);
    setHasMore(true);
    fetchPosts(1, false);
  }, [options.category, options.search, options.limit]);

  return {
    allPosts,
    featuredPosts,
    isLoading,
    error,
    hasMore,
    loadMore,
    refetch
  };
};
