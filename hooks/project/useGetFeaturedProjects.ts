import { useState, useEffect } from "react";

interface FeaturedProject {
  id: string;
  title: string;
  subtitle: string;
  coverImage: string;
  logo: string;
  projectTypes: string[];
  status: string | null;
}

export const useGetFeaturedProjects = () => {
  const [featuredProjects, setFeaturedProjects] = useState<FeaturedProject[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchFeaturedProjects = async () => {
      try {
        setIsLoading(true);
        const response = await fetch('/api/projects/featured');
        
        if (!response.ok) {
          throw new Error('Failed to fetch featured projects');
        }

        const data = await response.json();
        setFeaturedProjects(data);
        setError(null);
      } catch (err) {
        console.error('Error in useGetFeaturedProjects:', err);
        setError(err instanceof Error ? err.message : 'Unknown error occurred');
        setFeaturedProjects([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchFeaturedProjects();
  }, []);

  return { featuredProjects, isLoading, error };
};
