import Link from "next/link"
import Image from "next/image"
import { Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "../ui/pagination"

import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { useProjects } from "@/hooks/project/useGetProjects";

interface ProjectExplorerProps {
  filters: {
    status: string[];
    years: string[];
    projectTypes: string[];
    domains: string[];
    sdgGoals: string[];
    techStack: string[];
  };
}

export default function ProjectExplorer({ filters }: ProjectExplorerProps) {
  const { projects, isLoading, error, meta, goToPage } = useProjects({ filters });

  // Handle rendering pages for pagination
  const renderPaginationItems = () => {
    if (!meta) return null;
    
    const items = [];
    const { currentPage, totalPages } = meta;
    
    // Always show first page
    items.push(
      <PaginationItem key="page-1">
        <PaginationLink 
          href="#" 
          onClick={(e) => {
            e.preventDefault();
            goToPage(1);
          }}
          isActive={currentPage === 1}
        >
          1
        </PaginationLink>
      </PaginationItem>
    );
    
    // Add ellipsis if needed
    if (currentPage > 3) {
      items.push(
        <PaginationItem key="ellipsis-1">
          <PaginationEllipsis />
        </PaginationItem>
      );
    }
    
    // Add pages around current page
    for (let i = Math.max(2, currentPage - 1); i <= Math.min(totalPages - 1, currentPage + 1); i++) {
      items.push(
        <PaginationItem key={`page-${i}`}>
          <PaginationLink 
            href="#" 
            onClick={(e) => {
              e.preventDefault();
              goToPage(i);
            }}
            isActive={currentPage === i}
          >
            {i}
          </PaginationLink>
        </PaginationItem>
      );
    }
    
    // Add ellipsis if needed
    if (currentPage < totalPages - 2) {
      items.push(
        <PaginationItem key="ellipsis-2">
          <PaginationEllipsis />
        </PaginationItem>
      );
    }
    
    // Always show last page if there is more than one page
    if (totalPages > 1) {
      items.push(
        <PaginationItem key={`page-${totalPages}`}>
          <PaginationLink 
            href="#" 
            onClick={(e) => {
              e.preventDefault();
              goToPage(totalPages);
            }}
            isActive={currentPage === totalPages}
          >
            {totalPages}
          </PaginationLink>
        </PaginationItem>
      );
    }
    
    return items;
  };

  if (error) {
    return <div className="text-center py-10 text-red-500">Error loading projects: {error}</div>;
  }

  if (isLoading && (!projects || projects.length === 0)) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array(6)
          .fill(0)
          .map((_, i) => (
            <div key={i} className="animate-pulse h-[350px] rounded-xl bg-muted"></div>
          ))}
      </div>
    );
  }
  
  return (
    <div className="flex flex-col gap-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project) => (
          <Link
            key={project.id}
            href={`/project/${project.id}`}
            className="project-card group block rounded-xl overflow-hidden border bg-card shadow-sm hover:shadow-lg transition-all"
          >
            <div className="relative aspect-video">
              <Image
                src={project.coverImage || "/placeholder.svg"}
                alt={project.title}
                fill
                className="object-cover transition-transform group-hover:scale-105"
              />
              <div className="absolute top-2 right-2">
                <Badge>{project.status}</Badge>
              </div>
            </div>

            <div className="p-5">
              <h3 className="text-xl font-bold mb-2 line-clamp-1">{project.title}</h3>
              <p className="text-muted-foreground mb-3 line-clamp-2">{project.subtitle || ""}</p>

              <div className="flex flex-wrap gap-2 mb-4">
                {project.projectTypes.slice(0, 3).map((type, i) => (
                  <Badge key={i} variant="outline">
                    {type}
                  </Badge>
                ))}
                {project.projectTypes.length > 3 && (
                  <Badge variant="outline">+{project.projectTypes.length - 3}</Badge>
                )}
              </div>

              <div className="flex justify-between items-center mt-auto">
                <div className="flex gap-2">
                  {project.domains.slice(0, 1).map((domain, i) => (
                    <Badge key={i} variant="secondary">
                      {domain}
                    </Badge>
                  ))}
                  {project.domains.length > 1 && (
                    <Badge variant="secondary">+{project.domains.length - 1}</Badge>
                  )}
                </div>
                <Button size="sm" variant="ghost">
                  View
                </Button>
              </div>
            </div>
          </Link>
        ))}
      </div>
      
      {/* Pagination */}
      {meta && meta.totalPages > 1 && (
        <Pagination className="mt-6">
          <PaginationContent>
            {meta.hasPrevPage && (
              <PaginationItem>
                <PaginationPrevious 
                  href="#" 
                  onClick={(e) => {
                    e.preventDefault();
                    goToPage(meta.currentPage - 1);
                  }}
                />
              </PaginationItem>
            )}
            
            {renderPaginationItems()}
            
            {meta.hasNextPage && (
              <PaginationItem>
                <PaginationNext 
                  href="#" 
                  onClick={(e) => {
                    e.preventDefault();
                    goToPage(meta.currentPage + 1);
                  }}
                />
              </PaginationItem>
            )}
          </PaginationContent>
        </Pagination>
      )}
    </div>
  )
}

