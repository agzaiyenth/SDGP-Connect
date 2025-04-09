"use client"

import React, { useState } from 'react'
import { Suspense } from "react"
import ProjectExplorer from "../../../components/projects/project-explorer"
import FilterSidebar from "../../../components/projects/filter-sidebar"
import SearchHeader from "../../../components/projects/search-header"
import { Skeleton } from "../../../components/ui/skeleton"
import { X } from "lucide-react"
import { Button } from "../../../components/ui/button"

interface Props {
    // right now we are not taking any props,but after connecting prisma we have to pass the data from the server to the client
}

const page = (props: Props) => {
    const [showMobileFilters, setShowMobileFilters] = useState(false);
    
    const toggleFilters = () => {
        setShowMobileFilters(!showMobileFilters);
    };

    return (
       <div className="container mx-auto py-8 px-4">
      <SearchHeader toggleFilters={toggleFilters} />

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
              <FilterSidebar />
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
          <FilterSidebar />
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
            <ProjectExplorer />
          </Suspense>
        </div>
      </div>
    </div>
    )
}

export default page
