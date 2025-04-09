// components/projects/project-explorer.tsx
import Link from "next/link";
import Image from "next/image";
import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious
} from "../ui/pagination"; // Adjust path
import { Badge } from "../ui/badge"; // Adjust path
import { Button } from "../ui/button"; // Adjust path
import { Skeleton } from "../ui/skeleton"; // Adjust path
import { ProjectQueryParams, useProjects } from "@/hooks/project/useGetProjects";

// Define props based on the parent component's provision
interface ProjectExplorerProps {
    currentParams: ProjectQueryParams; // Receive all relevant params from parent
    onPageChange: (newPage: number) => void; // Receive page change handler from parent
}

export default function ProjectExplorer({ currentParams, onPageChange }: ProjectExplorerProps) {
    // Use the hook with the parameters passed down from the page component
    // Removed goToPage and updateParams as they are no longer returned/needed
    const { projects, isLoading, error, meta } = useProjects(currentParams);

    // Simplified page change handler: just calls the prop passed from the parent
    const handlePageChange = (newPage: number) => {
        if (newPage >= 1 && (!meta || newPage <= meta.totalPages)) {
             onPageChange(newPage); // Call the function provided by the parent page
        }
    };

    // Removed internal URL reading and update logic (updateURL, useEffect)

    // Pagination rendering logic (mostly unchanged, but onClick handlers are simplified)
    const renderPaginationItems = () => {
        if (!meta || meta.totalPages <= 1) return null; // Don't render if only one page or no meta

        const items = [];
        const { currentPage, totalPages } = meta;
        const pageRange = 1; // How many pages to show around the current page

        // Always show first page
        if (totalPages > 1) {
             items.push(
                <PaginationItem key="page-1">
                    <PaginationLink
                        href="#" // Use "#" or dynamically generate hrefs if needed, onClick is primary
                        onClick={(e) => {
                            e.preventDefault();
                            handlePageChange(1);
                        }}
                        isActive={currentPage === 1}
                        aria-label="Go to page 1"
                    >
                        1
                    </PaginationLink>
                </PaginationItem>
            );
        }


        // Ellipsis before current page range
        if (currentPage > pageRange + 2) { // Need space for '1', '...', 'current-1'
            items.push(
                <PaginationItem key="ellipsis-start">
                    <PaginationEllipsis />
                </PaginationItem>
            );
        }

        // Pages around the current page
        const startPage = Math.max(2, currentPage - pageRange);
        const endPage = Math.min(totalPages - 1, currentPage + pageRange);

        for (let i = startPage; i <= endPage; i++) {
            items.push(
                <PaginationItem key={`page-${i}`}>
                    <PaginationLink
                        href="#"
                        onClick={(e) => {
                            e.preventDefault();
                            handlePageChange(i);
                        }}
                        isActive={currentPage === i}
                         aria-label={`Go to page ${i}`}
                         aria-current={currentPage === i ? "page" : undefined}
                    >
                        {i}
                    </PaginationLink>
                </PaginationItem>
            );
        }

        // Ellipsis after current page range
         if (currentPage < totalPages - (pageRange + 1)) { // Need space for 'current+1', '...', 'totalPages'
            items.push(
                <PaginationItem key="ellipsis-end">
                    <PaginationEllipsis />
                </PaginationItem>
            );
        }

        // Always show last page (if different from first page)
        if (totalPages > 1) {
             items.push(
                <PaginationItem key={`page-${totalPages}`}>
                    <PaginationLink
                        href="#"
                        onClick={(e) => {
                            e.preventDefault();
                            handlePageChange(totalPages);
                        }}
                        isActive={currentPage === totalPages}
                         aria-label={`Go to page ${totalPages}`}
                    >
                        {totalPages}
                    </PaginationLink>
                </PaginationItem>
            );
        }


        return items;
    };

    // --- Rendering Logic ---

    if (error) {
        return <div className="text-center py-10 text-red-500">Error loading projects: {error}</div>;
    }

    // Show skeleton loader based on isLoading flag
    if (isLoading) {
        return (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* Render skeletons based on limit parameter */}
                {Array(currentParams.limit || 9)
                    .fill(0)
                    .map((_, i) => (
                        // Use Skeleton component if available, otherwise fallback
                        <Skeleton key={i} className="h-[350px] rounded-xl bg-muted" />
                        // Or: <div key={i} className="animate-pulse h-[350px] rounded-xl bg-muted"></div>
                    ))}
            </div>
        );
    }

     // Handle case where loading is done but no projects match
    if (!projects || projects.length === 0) {
        return <div className="text-center py-10 text-muted-foreground">No projects found matching your criteria.</div>;
    }


    // Render projects and pagination
    return (
        <div className="flex flex-col gap-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* Map through loaded projects */}
                {projects.map((project) => (
                    // Use ProjectCard component or inline structure
                    <Link
                        key={project.id}
                        href={`/project/${project.id}`} // Adjust link as needed
                        className="project-card group block rounded-xl overflow-hidden border bg-card shadow-sm hover:shadow-lg transition-all duration-300 ease-in-out"
                    >
                        <div className="relative aspect-video overflow-hidden"> {/* Added overflow-hidden */}
                            <Image
                                src={project.coverImage || "/placeholder.svg"} // Provide a placeholder
                                alt={project.title}
                                fill // Use fill for responsiveness
                                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" // Add sizes prop
                                className="object-cover transition-transform duration-300 group-hover:scale-105"
                            />
                             {/* Display status badge if status exists */}
                             {project.status && (
                                 <div className="absolute top-2 right-2 z-10">
                                    <Badge>{project.status}</Badge>
                                </div>
                             )}
                        </div>

                        <div className="p-4 flex flex-col h-[calc(100%-aspect-video)]"> {/* Adjust padding and height */}
                            <h3 className="text-lg font-semibold mb-1 line-clamp-1">{project.title}</h3>
                            <p className="text-sm text-muted-foreground mb-3 line-clamp-2 flex-grow">{project.subtitle || "No subtitle available."}</p>

                             {/* Display Project Types */}
                             {(project.projectTypes?.length > 0) && (
                                <div className="flex flex-wrap gap-1 mb-3">
                                    {project.projectTypes.slice(0, 2).map((type, i) => ( // Show max 2
                                        <Badge key={`${type}-${i}`} variant="outline" className="text-xs">
                                            {type}
                                        </Badge>
                                    ))}
                                    {project.projectTypes.length > 2 && (
                                        <Badge variant="outline" className="text-xs">+{project.projectTypes.length - 2}</Badge>
                                    )}
                                </div>
                             )}

                            {/* Display Domains and View Button */}
                            <div className="flex justify-between items-center mt-auto pt-2 border-t border-border/50">
                                 {(project.domains?.length > 0) ? (
                                     <div className="flex gap-1 flex-wrap">
                                        {project.domains.slice(0, 1).map((domain, i) => ( // Show max 1
                                            <Badge key={`${domain}-${i}`} variant="secondary" className="text-xs">
                                                {domain}
                                            </Badge>
                                        ))}
                                        {project.domains.length > 1 && (
                                            <Badge variant="secondary" className="text-xs">+{project.domains.length - 1}</Badge>
                                        )}
                                    </div>
                                 ) : <div />} {/* Placeholder to maintain layout */}

                                <Button size="sm" variant="ghost" className="text-xs h-7 px-2">
                                    View Details
                                </Button>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>

            {/* Pagination - Conditionally render based on meta */}
            {meta && meta.totalPages > 1 && (
                <Pagination className="mt-6">
                    <PaginationContent>
                        {/* Previous Button */}
                        <PaginationItem>
                             <PaginationPrevious
                                href="#"
                                onClick={(e) => {
                                    e.preventDefault();
                                    handlePageChange(meta.currentPage - 1);
                                }}
                                aria-disabled={!meta.hasPrevPage}
                                className={!meta.hasPrevPage ? "pointer-events-none opacity-50" : ""}
                             />
                        </PaginationItem>

                        {/* Page Number Links */}
                        {renderPaginationItems()}

                         {/* Next Button */}
                         <PaginationItem>
                             <PaginationNext
                                href="#"
                                onClick={(e) => {
                                    e.preventDefault();
                                    handlePageChange(meta.currentPage + 1);
                                }}
                                aria-disabled={!meta.hasNextPage}
                                className={!meta.hasNextPage ? "pointer-events-none opacity-50" : ""}
                            />
                        </PaginationItem>
                    </PaginationContent>
                </Pagination>
            )}
        </div>
    );
}