// Copyright (c) 2025, Psycode Lab's (https://www.psycodelabs.lk). All Rights Reserved.
//
// This software is the property of Psycode Lab's. and its suppliers, if any.
// Dissemination of any information or reproduction of any material contained
// herein in any form is strictly forbidden, unless permitted by Psycode Lab's expressly.
// You may not alter or remove any copyright or other notice from copies of this content.

import { useEffect, useState, useCallback } from "react";
import { PaginatedResponse } from "../../types/project/pagination";
import { ProjectCardType } from "../../types/project/card";

function useProjects(currentParams: ProjectQueryParams) {
  const [projects, setProjects] = useState<ProjectCardType[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isInitialLoading, setIsInitialLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [meta, setMeta] = useState<
    PaginatedResponse<ProjectCardType>["meta"] | null
  >(null);
  const [hasMore, setHasMore] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);

  const fetchProjects = useCallback(
    async (page: number, shouldAppend: boolean = false) => {
      if (!shouldAppend) {
        setIsLoading(true);
      }
      setError(null);

      try {
        let apiUrl = "/api/projects";
        let queryParams = new URLSearchParams();

        if (currentParams.featured) {
          apiUrl = "/api/projects/featured";
        } else {
          queryParams.append("page", page.toString());
          queryParams.append("limit", String(currentParams.limit || 9));
        }

        if (currentParams.title)
          queryParams.append("title", currentParams.title);

        if (
          currentParams.projectTypes &&
          currentParams.projectTypes.length > 0
        ) {
          currentParams.projectTypes.forEach((type) =>
            queryParams.append("projectTypes", type)
          );
        }

        if (currentParams.domains && currentParams.domains.length > 0) {
          currentParams.domains.forEach((domain) =>
            queryParams.append("domains", domain)
          );
        }

        if (currentParams.status && currentParams.status.length > 0) {
          currentParams.status.forEach((status) =>
            queryParams.append("status", status)
          );
        }

        if (currentParams.sdgGoals && currentParams.sdgGoals.length > 0) {
          currentParams.sdgGoals.forEach((goal) =>
            queryParams.append("sdgGoals", goal)
          );
        }

        if (currentParams.techStack && currentParams.techStack.length > 0) {
          currentParams.techStack.forEach((tech) =>
            queryParams.append("techStack", tech)
          );
        }

        if (currentParams.years && currentParams.years.length > 0) {
          currentParams.years.forEach((year) =>
            queryParams.append("years", year)
          );
        }

        // Build final URL
        const finalUrl = queryParams.toString()
          ? `${apiUrl}?${queryParams.toString()}`
          : apiUrl;
        const response = await fetch(finalUrl);

        if (!response.ok) {
          const errorData = await response.text();
          throw new Error(
            `Error ${response.status}: ${errorData || response.statusText}`
          );
        }

        const result = await response.json();

        // Handle different response formats
        let projectsData: ProjectCardType[];
        let metaData: PaginatedResponse<ProjectCardType>["meta"];

        if (currentParams.featured) {
          // Featured projects API might return a simple array
          if (Array.isArray(result)) {
            projectsData = result;
            metaData = {
              totalItems: result.length,
              currentPage: 1,
              itemsPerPage: result.length,
              totalPages: 1,
              hasNextPage: false,
              hasPrevPage: false,
            };
          } else {
            // Or it might return a paginated response
            projectsData = result.data || result;
            metaData = result.meta || {
              totalItems: projectsData.length,
              currentPage: 1,
              itemsPerPage: projectsData.length,
              totalPages: 1,
            };
          }
        } else {
          // Regular projects API returns paginated response
          const paginatedResult = result as PaginatedResponse<ProjectCardType>;
          projectsData = paginatedResult.data;
          metaData = paginatedResult.meta;
        }

        // For infinite scroll: append new projects instead of replacing them
        // But for featured projects, we typically don't use infinite scroll
        if (shouldAppend && !currentParams.featured) {
          setProjects((prev) => [...prev, ...projectsData]);
        } else {
          // Only clear projects if we have new data to replace with
          if (projectsData.length > 0 || isInitialLoading) {
            setProjects(projectsData);
          }
        }

        setMeta(metaData);

        // Update hasMore based on pagination metadata
        // Featured projects don't have pagination, so hasMore should be false
        if (currentParams.featured) {
          setHasMore(false);
        } else {
          setHasMore(page < metaData.totalPages);
        }

        setCurrentPage(page);
      } catch (err) {
        setError(
          err instanceof Error
            ? err.message
            : "An error occurred while fetching projects"
        );
        console.error("Error fetching projects:", err);
        if (!shouldAppend) {
          setProjects([]);
        }
      } finally {
        setIsLoading(false);
        setIsInitialLoading(false);
      }
    },
    [currentParams]
  );

  // Initial load of projects - only clear projects after new data loads
  useEffect(() => {
    setCurrentPage(1);
    setHasMore(true);
    fetchProjects(1, false);
  }, [
    currentParams.featured, // Add featured to dependency array
    currentParams.title,
    currentParams.limit,
    currentParams.projectTypes?.join(","),
    currentParams.domains?.join(","),
    currentParams.status?.join(","),
    currentParams.sdgGoals?.join(","),
    currentParams.techStack?.join(","),
    currentParams.years?.join(","),
    fetchProjects,
  ]);

  // Function to load more projects (called when user scrolls to bottom)
  const loadMore = useCallback(() => {
    // Don't allow load more for featured projects
    if (!isLoading && hasMore && !currentParams.featured) {
      fetchProjects(currentPage + 1, true);
    }
  }, [isLoading, hasMore, currentPage, currentParams.featured, fetchProjects]);

  return {
    projects,
    isLoading,
    isInitialLoading,
    error,
    meta,
    hasMore,
    loadMore,
  };
}

export { useProjects };

export interface ProjectQueryParams {
  page?: number;
  limit?: number;
  title?: string;
  projectTypes?: string[];
  featured?: boolean;
  domains?: string[];
  status?: string[];
  sdgGoals?: string[];
  techStack?: string[];
  years?: string[];
}
