"use client"

import React, { useState, useCallback, useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { Suspense } from "react"
import ProjectExplorer from "../../../components/projects/project-explorer"
import FilterSidebar from "../../../components/projects/filter-sidebar"
import SearchHeader from "../../../components/projects/search-header"
import { Skeleton } from "../../../components/ui/skeleton"
import { X } from "lucide-react"
import { Button } from "../../../components/ui/button"

interface FilterState {
    status: string[];
    years: string[];
    projectTypes: string[];
    domains: string[];
    sdgGoals: string[];
    techStack: string[];
}

const page = () => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [showMobileFilters, setShowMobileFilters] = useState(false);
    
    // Get all URL parameters
    const page = searchParams.get('page') || '1';
    const limit = searchParams.get('limit') || '9';
    const search = searchParams.get('search') || '';

    // Initialize filters from URL params
    const getInitialFilters = (): FilterState => ({
        status: searchParams.getAll('status'),
        years: searchParams.getAll('years'),
        projectTypes: searchParams.getAll('projectTypes'),
        domains: searchParams.getAll('domains'),
        sdgGoals: searchParams.getAll('sdgGoals'),
        techStack: searchParams.getAll('techStack'),
    });

    const [filters, setFilters] = useState<FilterState>(getInitialFilters());

    // Update filters when URL changes
    useEffect(() => {
        setFilters(getInitialFilters());
    }, [searchParams]);
    
    const toggleFilters = () => {
        setShowMobileFilters(!showMobileFilters);
    };

    // Update URL when filters change
    const handleFilterChange = useCallback((newFilters: FilterState) => {
        setFilters(newFilters);
        
        // Create new URLSearchParams object
        const params = new URLSearchParams();
        
        // Add pagination and search parameters
        params.append('page', page);
        params.append('limit', limit);
        if (search) params.append('search', search);
        
        // Add all filter values to params
        Object.entries(newFilters).forEach(([key, values]) => {
            if (values && values.length > 0) {
                values.forEach((value: string) => {
                    params.append(key, value);
                });
            }
        });

        // Update URL without triggering navigation
        const newUrl = `${window.location.pathname}?${params.toString()}`;
        router.push(newUrl);
    }, [router, page, limit, search]);

    const initialParams = {
        page: parseInt(page),
        limit: parseInt(limit),
        search: search || undefined
    };

    return (
        <div className="container mx-auto py-8 px-4">
            <SearchHeader 
                toggleFilters={toggleFilters} 
                defaultSearch={search}
                onSearch={(value) => {
                    const params = new URLSearchParams(searchParams.toString());
                    if (value) {
                        params.set('search', value);
                    } else {
                        params.delete('search');
                    }
                    router.push(`${window.location.pathname}?${params.toString()}`);
                }}
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
                            <FilterSidebar onFilterChange={handleFilterChange} initialFilters={filters} />
                        </div>
                        <div className="sticky bottom-0 p-4 bg-background border-t">
                            <Button className="w-full" onClick={toggleFilters}>
                                Apply Filters
                            </Button>
                        </div>
                    </div>
                )}

                {/* Desktop Filter Sidebar */}
                <div className="hidden md:block w-64 lg:w-72 flex-shrink-0">
                    <FilterSidebar onFilterChange={handleFilterChange} initialFilters={filters} />
                </div>

                <div className="flex-1">
                    <Suspense
                        fallback={
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {Array(6)
                                    .fill(0)
                                    .map((_, i) => (
                                        <Skeleton key={i} className="h-[350px] rounded-xl" />
                                    ))}
                            </div>
                        }
                    >
                        <ProjectExplorer 
                            filters={filters} 
                            initialParams={initialParams}
                        />
                    </Suspense>
                </div>
            </div>
        </div>
    )
}

export default page
