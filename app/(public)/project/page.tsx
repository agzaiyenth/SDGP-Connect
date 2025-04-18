"use client"

import React, { useState, useCallback, useEffect, useMemo } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Suspense } from "react";
import ProjectExplorer from "@/components/projects/project-explorer";
import FilterSidebar from "@/components/projects/filter-sidebar";
import SearchHeader from "@/components/projects/search-header";
import { Skeleton } from "@/components/ui/skeleton";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ProjectQueryParams } from '@/hooks/project/useGetProjects';
import { useProjects } from '@/hooks/project/useGetProjects';

interface FilterState {
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

    const currentParams = useMemo((): ProjectQueryParams => ({
        page: parseInt(searchParams.get('page') || '1', 10),
        limit: parseInt(searchParams.get('limit') || '9', 10),
        title: searchParams.get('title') || undefined,
        status: searchParams.getAll('status'),
        years: searchParams.getAll('years'),
        projectTypes: searchParams.getAll('projectTypes'),
        domains: searchParams.getAll('domains'),
        sdgGoals: searchParams.getAll('sdgGoals'),
        techStack: searchParams.getAll('techStack'),
    }), [searchParams]);

    const { projects, isLoading, error, meta } = useProjects(currentParams);

    const initialFilters = useMemo((): FilterState => ({
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
        params.append('limit', String(currentParams.limit || 9));
        if (currentParams.title) params.append('title', currentParams.title);

        Object.entries(newFilters).forEach(([key, values]) => {
            if (values && values.length > 0) {
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

    const handlePageChange = useCallback((newPage: number) => {
        const params = new URLSearchParams(searchParams.toString());
        params.set('page', String(newPage));
        router.push(`${window.location.pathname}?${params.toString()}`, { scroll: false });
    }, [router, searchParams]);

    if (isLoading) {
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
                    <FilterSidebar onFilterChange={handleFilterChange} initialFilters={initialFilters} />
                </div>

                <div className="flex-1">
                    <ProjectExplorer
                        currentParams={currentParams}
                        onPageChange={handlePageChange}
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