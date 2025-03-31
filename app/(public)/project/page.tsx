import React from 'react'
import { Suspense } from "react"
import ProjectExplorer from "../../../components/projects/project-explorer"
import FilterSidebar from "../../../components/projects/filter-sidebar"
import SearchHeader from "../../../components/projects/search-header"
import { Skeleton } from "../../../components/ui/skeleton"
interface Props {
    // right now we are not taking any props,but after connecting prisma we have to pass the data from the server to the client
}

const page = (props: Props) => {
    return (
       < div className="container mx-auto py-8 px-4">
      <SearchHeader />

      <div className="flex flex-col md:flex-row gap-6 mt-8">
        <div className="w-full md:w-64 lg:w-72 flex-shrink-0">
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
