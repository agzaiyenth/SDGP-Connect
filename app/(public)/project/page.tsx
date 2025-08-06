// Copyright (c) 2025, Psycode Lab's (https://www.psycodelabs.lk). All Rights Reserved.
//
// This software is the property of Psycode Lab's. and its suppliers, if any.
// Dissemination of any information or reproduction of any material contained
// herein in any form is strictly forbidden, unless permitted by Psycode Lab's expressly.
// You may not alter or remove any copyright or other notice from copies of this content.
"use client"

import FilterSidebar from "@/components/projects/filter-sidebar";
import ProjectExplorer from "@/components/projects/project-explorer";
import SearchHeader from "@/components/projects/search-header";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { ProjectQueryParams, useProjects } from "@/hooks/project/useGetProjects";
import { X } from "lucide-react";
import { useRouter, useSearchParams } from 'next/navigation';
import { Suspense, useCallback, useEffect, useMemo, useState } from 'react';

interface FilterState {
    featured: boolean; // Add featured filter
    status: string[];
    years: string[];
    projectTypes: string[];
    domains: string[];
    sdgGoals: string[];
    techStack: string[];
}

function ProjectsPageContent() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [showMobileFilters, setShowMobileFilters] = useState(false);
    const [isInitialLoad, setIsInitialLoad] = useState(true);

    const currentParams = useMemo((): ProjectQueryParams => ({
        page: parseInt(searchParams.get('page') || '1', 10),
        limit: parseInt(searchParams.get('limit') || '9', 10),
        title: searchParams.get('title') || undefined,
        featured: searchParams.get('featured') === 'true', // Add featured parameter
        status: searchParams.getAll('status'),
        years: searchParams.getAll('years'),
        projectTypes: searchParams.getAll('projectTypes'),
        domains: searchParams.getAll('domains'),
        sdgGoals: searchParams.getAll('sdgGoals'),
        techStack: searchParams.getAll('techStack'),
    }), [searchParams]);

    // Use the hook with added infinite scroll capabilities
    const { projects, isLoading, error, meta, hasMore, loadMore } = useProjects(currentParams);

    // Set initial load to false after first load completes
    useEffect(() => {
        if (!isLoading && projects && isInitialLoad) {
            setIsInitialLoad(false);
        }
    }, [isLoading, projects, isInitialLoad]);

    const initialFilters = useMemo((): FilterState => ({
        featured: currentParams.featured || false, // Add featured to initial filters
        status: currentParams.status || [],
        years: currentParams.years || [],
        projectTypes: currentParams.projectTypes || [],
        domains: currentParams.domains || [],
        sdgGoals: currentParams.sdgGoals || [],
        techStack: currentParams.techStack || [],
    }), [currentParams]);

    const toggleFilters = () => {
        setShowMobileFilters(!showMobileFilters);
    };

    const handleFilterChange = useCallback((newFilters: FilterState) => {
        const params = new URLSearchParams();
        params.append('page', '1');
        params.append('limit', String(currentParams.limit || 15));
        if (currentParams.title) params.append('title', currentParams.title);

        // Handle featured filter
        if (newFilters.featured) {
            params.append('featured', 'true');
        }

        // Handle array filters
        Object.entries(newFilters).forEach(([key, values]) => {
            // Skip featured as it's already handled above
            if (key === 'featured') return;
            
            if (Array.isArray(values) && values.length > 0) {
                values.forEach((value: string) => {
                    params.append(key, value);
                });
            }
        });

        const newUrl = `${window.location.pathname}?${params.toString()}`;
        router.push(newUrl, { scroll: false });
        setShowMobileFilters(false);
    }, [router, currentParams.limit, currentParams.title]);

    const handleSearch = useCallback((value: string) => {
        const params = new URLSearchParams(searchParams.toString());
        if (value) {
            params.set('title', value);
        } else {
            params.delete('title');
        }
        params.set('page', '1');
        router.push(`${window.location.pathname}?${params.toString()}`, { scroll: false });
    }, [router, searchParams]);

    // Show full page skeleton only on initial load
    if (isInitialLoad && isLoading && (!projects || projects.length === 0)) {
        return <LoadingSkeleton />;
    }

    return (
        <div className="container mx-auto py-8 px-4">
            <SearchHeader
                toggleFilters={toggleFilters}
                defaultTitle={currentParams.title ?? ""}
                onSearch={handleSearch}
            />

            <div className="flex flex-col md:flex-row gap-6 mt-8">
                {/* Mobile Filter Overlay */}
                {showMobileFilters && (
                    <div className="md:hidden fixed inset-0 bg-background/95 z-40 overflow-y-auto p-4">
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="font-bold text-lg">Filters</h2>
                            <Button variant="ghost" size="icon" onClick={toggleFilters}>
                                <X className="h-5 w-5" />
                            </Button>
                        </div>
                        <div className="mb-6">
                            <FilterSidebar onFilterChange={handleFilterChange} initialFilters={initialFilters} />
                        </div>
                    </div>
                )}

                {/* Desktop Filter Sidebar */}
                <div className="hidden md:block w-64 lg:w-72 flex-shrink-0">
                    <div className="sticky top-0">
                        <FilterSidebar onFilterChange={handleFilterChange} initialFilters={initialFilters} />
                    </div>
                </div>

                <div className="flex-1">
                    <ProjectExplorer
                        currentParams={currentParams}
                        projects={projects}
                        isLoading={isLoading}
                        error={error}
                        meta={meta}
                        hasMore={hasMore}
                        loadMore={loadMore}
                    />
                </div>
            </div>
        </div>
    )
}

// Wrap the client component in Suspense for loading fallback
const Page = () => {
    return (
        <Suspense fallback={<LoadingSkeleton />}>
            <ProjectsPageContent />
        </Suspense>
    );
};

// Define a skeleton component for the fallback
const LoadingSkeleton = () => (
    <div className="container mx-auto py-8 px-4">
        <Skeleton className="h-12 w-full mb-8" /> {/* Placeholder for SearchHeader */}
        <div className="flex flex-col md:flex-row gap-6 mt-8">
            <div className="hidden md:block w-64 lg:w-72 flex-shrink-0">
                <Skeleton className="h-64 w-full" /> {/* Placeholder for FilterSidebar */}
            </div>
            <div className="flex-1">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {Array(6)
                        .fill(0)
                        .map((_, i) => (
                            <Skeleton key={i} className="h-[350px] rounded-xl" />
                        ))}
                </div>
            </div>
        </div>
    </div>
);

export default Page;