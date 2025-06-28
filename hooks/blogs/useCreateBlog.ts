import { useState } from 'react';
import { BlogSubmissionSchema } from '@/validations/blog';

export function useCreateBlog() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const createBlog = async (blogData: BlogSubmissionSchema) => {
    setIsLoading(true);
    setError(null);
    setSuccess(false);
    
    try {
      const response = await fetch('/api/blogs/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(blogData),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText || 'Failed to create blog post');
      }

      const createdBlog = await response.json();
      setSuccess(true);
      setIsLoading(false);
      return createdBlog;
    } catch (err: any) {
      setError(err.message || 'Failed to create blog post');
      setIsLoading(false);
      throw err;
    }
  };

  const resetState = () => {
    setError(null);
    setSuccess(false);
    setIsLoading(false);
  };

  return {
    createBlog,
    isLoading,
    error,
    success,
    resetState,
  };
}
