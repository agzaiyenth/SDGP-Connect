import { useState } from 'react';
import { BlogAuthorSchema } from '@/validations/blog';

export function useCreateAuthor() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const createAuthor = async (authorData: BlogAuthorSchema) => {
    setIsLoading(true);
    setError(null);
    
    try {
      const response = await fetch('/api/blogs/author/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(authorData),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText || 'Failed to create author');
      }

      const createdAuthor = await response.json();
      setIsLoading(false);
      return createdAuthor;
    } catch (err: any) {
      setError(err.message || 'Failed to create author');
      setIsLoading(false);
      throw err;
    }
  };

  return {
    createAuthor,
    isLoading,
    error,
  };
}
