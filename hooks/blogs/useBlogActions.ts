import { useState } from 'react';

interface UseBlogActionsProps {
  onSuccess?: () => void;
}

export const useBlogActions = ({ onSuccess }: UseBlogActionsProps = {}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const performAction = async (
    action: 'approve' | 'reject' | 'feature' | 'unfeature',
    blogIds: string[],
    reason?: string
  ) => {
    setIsLoading(true);
    setError(null);

    try {
      const body: any = { action, blogIds };
      if (reason) body.reason = reason;

      const response = await fetch('/api/admin/blogs', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || `HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      onSuccess?.();
      return result;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An error occurred';
      setError(errorMessage);
      console.error(`Error performing ${action} action:`, err);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const approveBlog = (blogId: string) => performAction('approve', [blogId]);
  
  const approveBlogs = (blogIds: string[]) => performAction('approve', blogIds);
  
  const rejectBlog = (blogId: string, reason: string) => 
    performAction('reject', [blogId], reason);
  
  const rejectBlogs = (blogIds: string[], reason: string) => 
    performAction('reject', blogIds, reason);
  
  const featureBlog = (blogId: string) => performAction('feature', [blogId]);
  
  const unfeatureBlog = (blogId: string) => performAction('unfeature', [blogId]);

  return {
    isLoading,
    error,
    approveBlog,
    approveBlogs,
    rejectBlog,
    rejectBlogs,
    featureBlog,
    unfeatureBlog,
  };
};
