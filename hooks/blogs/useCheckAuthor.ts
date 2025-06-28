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
    setAuthor(null);
    try {
      const response = await fetch('/api/blogs/author/check', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      if (!response.ok) {
        let errorMsg = 'Failed to check author';
        let errorJson: any = null;
        try {
          errorJson = await response.json();
        } catch {}
        if (response.status === 404) {
          setAuthor(null);
          setIsLoading(false);
          return null;
        } else if (response.status === 400) {
          errorMsg = errorJson?.message || 'Invalid request data';
        } else if (response.status === 500) {
          errorMsg = errorJson?.message || 'Internal server error';
        } else {
          errorMsg = errorJson?.message || errorMsg;
        }
        setError(errorMsg);
        setIsLoading(false);
        setAuthor(null);
        return null;
      }

      const foundAuthor = await response.json();
      setAuthor(foundAuthor);
      setIsLoading(false);
      return foundAuthor;
    } catch (err: any) {
      setError('Network error. Please try again.');
      setIsLoading(false);
      setAuthor(null);
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
