import { useState } from 'react';

type BlogAuthor = {
  id: string;
  name: string;
  email: string;
  avatarUrl: string | null;
  instagram: string | null;
  twitter: string | null;
  facebook: string | null;
  linkedin: string | null;
  medium: string | null;
  website: string | null;
  createdAt: Date;
  updatedAt: Date;
};

export function useCheckAuthor() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [author, setAuthor] = useState<BlogAuthor | null>(null);

  const checkAuthor = async (email: string): Promise<BlogAuthor | null> => {
    setIsLoading(true);
    setError(null);
    
    try {
      const response = await fetch('/api/blogs/author/check', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      if (!response.ok) {
        if (response.status === 404) {
          setAuthor(null);
          setIsLoading(false);
          return null;
        }
        const errorText = await response.text();
        throw new Error(errorText || 'Failed to check author');
      }

      const foundAuthor = await response.json();
      setAuthor(foundAuthor);
      setIsLoading(false);
      return foundAuthor;
    } catch (err: any) {
      setError(err.message || 'Failed to check author');
      setIsLoading(false);
      return null;
    }
  };

  return {
    checkAuthor,
    author,
    isLoading,
    error,
  };
}
