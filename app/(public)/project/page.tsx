"use client"

import React, { useState, useCallback, useEffect, useMemo } from 'react'; // Added useMemo
import { useRouter, useSearchParams } from 'next/navigation';
import { Suspense } from "react";
import ProjectExplorer from "../../../components/projects/project-explorer"; // Adjust path
import FilterSidebar from "../../../components/projects/filter-sidebar"; // Adjust path
import SearchHeader from "../../../components/projects/search-header"; // Adjust path
import { Skeleton } from "../../../components/ui/skeleton"; // Adjust path
import { X } from "lucide-react";
import { Button } from "../../../components/ui/button"; // Adjust path
import { ProjectQueryParams } from '@/hooks/project/useGetProjects';

interface FilterState {
    status: string[];
    years: string[];
    projectTypes: string[];
    domains: string[];
    sdgGoals: string[];
    techStack: string[];
}

// This component now just reads params and passes them down
function ProjectsPageContent() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [showMobileFilters, setShowMobileFilters] = useState(false);

    // Derive ALL parameters directly from searchParams on every render
    // Use useMemo to prevent recreating the object unnecessarily if searchParams haven't changed
    const currentParams = useMemo((): ProjectQueryParams => ({
        page: parseInt(searchParams.get('page') || '1', 10),
        limit: parseInt(searchParams.get('limit') || '9', 10),
        search: searchParams.get('search') || undefined,
        status: searchParams.getAll('status'),
        years: searchParams.getAll('years'),
        projectTypes: searchParams.getAll('projectTypes'),
        domains: searchParams.getAll('domains'),
        sdgGoals: searchParams.getAll('sdgGoals'),
        techStack: searchParams.getAll('techStack'),
    }), [searchParams]);

    // Initial filter state for the sidebar, derived from currentParams
    const initialFilters = useMemo((): FilterState => ({
        status: currentParams.status || [],
        years: currentParams.years || [],
        projectTypes: currentParams.projectTypes || [],
        domains: currentParams.domains || [],
        sdgGoals: currentParams.sdgGoals || [],
        techStack: currentParams.techStack || [],
    }), [currentParams]); // Depend on derived currentParams

    const toggleFilters = () => {
        setShowMobileFilters(!showMobileFilters);
    };

    // Update URL when filters change (from FilterSidebar)
    const handleFilterChange = useCallback((newFilters: FilterState) => {
        // Create new URLSearchParams object
        const params = new URLSearchParams();

        // Always start with page 1 when filters change? Optional, but common UX.
        params.append('page', '1');
        params.append('limit', String(currentParams.limit || 9)); // Keep current limit
        if (currentParams.search) params.append('search', currentParams.search); // Keep current search

        // Add all filter values to params
        Object.entries(newFilters).forEach(([key, values]) => {
            if (values && values.length > 0) {
                values.forEach((value: string) => {
                    // Ensure the key here matches ProjectQueryParams and API keys
                    params.append(key, value);
                });
            }
        });

        // Update URL using router.push. This will trigger re-render and useProjects hook update
        const newUrl = `${window.location.pathname}?${params.toString()}`;
        router.push(newUrl, { scroll: false }); // scroll: false prevents jumping to top
        setShowMobileFilters(false); // Close mobile filters after applying
    }, [router, currentParams.limit, currentParams.search]); // Dependencies


    // Handle search input changes
    const handleSearch = useCallback((value: string) => {
        const params = new URLSearchParams(searchParams.toString());
        if (value) {
            params.set('search', value);
        } else {
            params.delete('search');
        }
        params.set('page', '1'); // Reset to page 1 on new search
        router.push(`${window.location.pathname}?${params.toString()}`, { scroll: false });
    }, [router, searchParams]);


    // Handle page changes (example: called by pagination component inside ProjectExplorer)
    const handlePageChange = useCallback((newPage: number) => {
        const params = new URLSearchParams(searchParams.toString());
        params.set('page', String(newPage));
        router.push(`${window.location.pathname}?${params.toString()}`, { scroll: false });
    }, [router, searchParams]);

    return (
        <div className="container mx-auto py-8 px-4">
            <SearchHeader
                toggleFilters={toggleFilters}
                // defaultSearch={currentParams.search || ''}
                // onSearch={handleSearch} // Use the debounced handler
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
                            {/* Pass initialFilters derived from URL, and the callback */}
                            <FilterSidebar onFilterChange={handleFilterChange} initialFilters={initialFilters} />
                        </div>
                        {/* Remove Apply Filters button from here if FilterSidebar applies changes immediately */}
                        {/* Or keep it if FilterSidebar only stages changes until Apply is clicked */}
                        {/* If kept, the button's onClick should probably call handleFilterChange with the staged filters */}
                    </div>
                )}

                {/* Desktop Filter Sidebar */}
                <div className="hidden md:block w-64 lg:w-72 flex-shrink-0">
                    <FilterSidebar onFilterChange={handleFilterChange} initialFilters={initialFilters} />
                </div>

                <div className="flex-1">
                   {/* Pass currentParams to ProjectExplorer */}
                   {/* ProjectExplorer will use these params to call useProjects */}
                   {/* It might also need handlePageChange if pagination controls are inside it */}
                   <ProjectExplorer
                        currentParams={currentParams}
                        onPageChange={handlePageChange} // Pass the handler down
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