/* Copyright (c) 2025, the contributors of the SDGP Connect project. All Rights Reserved.

This software is the joint property of the contributors to the SDGP Connect project.
Unauthorized distribution, commercial use, or reproduction of any part of this material
in any form is strictly prohibited without the explicit written consent of all contributors.
You may not alter or remove any copyright or attribution notice from this content. */

// filepath: d:\MyProjects\LEXi\SDGP-Connect\components\projects\project-explorer.tsx
import Link from "next/link";
import Image from "next/image";
import { Skeleton } from "../ui/skeleton"; 
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { ProjectQueryParams } from "@/hooks/project/useGetProjects";
import { EmptyState } from "../ui/empty-state";
import { FileX2, ArrowUp } from "lucide-react";
import { useEffect, useRef, useCallback, useState } from 'react';

interface ProjectExplorerProps {
    currentParams: ProjectQueryParams; 
    projects: any[];
    isLoading: boolean;
    isInitialLoading?: boolean;
    error: string | null;
    meta: any;
    hasMore: boolean;
    loadMore: () => void;
}

export default function ProjectExplorer({ currentParams, projects, isLoading, isInitialLoading, error, meta, hasMore, loadMore }: ProjectExplorerProps) {
    // Create a ref for the loader element (at bottom of list)
    const observerRef = useRef<IntersectionObserver | null>(null);
    const loadingRef = useRef<HTMLDivElement | null>(null);
    const [showScrollTop, setShowScrollTop] = useState(false);

    // Setup the intersection observer for infinite scrolling
    const lastProjectElementRef = useCallback((node: HTMLDivElement) => {
        if (isLoading) return;
        
        if (observerRef.current) observerRef.current.disconnect();
        
        observerRef.current = new IntersectionObserver(entries => {
            if (entries[0].isIntersecting && hasMore) {
                loadMore();
            }
        }, { threshold: 0.5 });
        
        if (node) observerRef.current.observe(node);
    }, [isLoading, hasMore, loadMore]);

    // Add scroll to top button functionality
    useEffect(() => {
        const handleScroll = () => {
            // Show button when user scrolls down 500px
            setShowScrollTop(window.scrollY > 500);
        };
        
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };

    if (error) {
        return <div className="text-center py-10 text-red-500">Error loading projects: {error}</div>;
    }

    // Initial loading state (when no projects are loaded yet)
    if (isInitialLoading || (isLoading && (!projects || projects.length === 0))) {
        return (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {Array(currentParams.limit || 9)
                    .fill(0)
                    .map((_, i) => (
                        <Skeleton key={i} className="h-[350px] rounded-xl bg-muted" />
                    ))}
            </div>
        );
    }

    // Empty state when no projects match filters
    if (!projects || projects.length === 0) {
        return (
            <div className="flex items-center justify-center">
                <EmptyState title="No projects found" description="Try adjusting your filters or search criteria." icons={[FileX2]} />
            </div>
        );
    }

    // Render projects with infinite scroll
    return (
        <div className="flex flex-col gap-8 w-full">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-fr">
                {/* Map through loaded projects */}
                {projects.map((project, index) => {
                    // Check if this is the last project
                    const isLastProject = index === projects.length - 1;
                    
                    return (
                        <div 
                            key={`project-${project.id}-${index}`}
                            ref={isLastProject ? lastProjectElementRef : null}
                            className="project-card-container w-full"
                            style={{ contain: 'layout style' }}
                        >
                            <Link
                                href={`/project/${project.id}`}
                                className="project-card group block rounded-xl overflow-hidden border bg-card shadow-sm hover:shadow-lg transition-shadow duration-200 will-change-auto"
                            >
                                <div className="relative aspect-video overflow-hidden bg-muted">
                                    <Image
                                        src={project.coverImage || "https://placehold.co/600x400?text=NO+IMAGE"}
                                        alt={project.title || "No title available"}
                                        fill
                                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                        className="object-cover transition-opacity duration-200 group-hover:scale-[1.02]"
                                        style={{ 
                                            transform: 'translateZ(0)',
                                            backfaceVisibility: 'hidden',
                                        }}
                                        priority={index < 6}
                                        placeholder="blur"
                                        blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
                                    />
                                    {/* Display status badge if status exists */}
                                    {project.status && (
                                        <div className="absolute top-2 right-2 z-10">
                                            <Badge>{project.status}</Badge>
                                        </div>
                                    )}
                                </div>

                                <div className="p-4 flex flex-col min-h-[200px]">
                                    <h3 className="text-lg font-semibold mb-1 line-clamp-1 min-h-[28px]">{project.title}</h3>
                                    <p className="text-sm text-muted-foreground mb-3 line-clamp-2 flex-grow min-h-[40px]">
                                        {project.subtitle || "No subtitle available."}
                                    </p>

                                    {/* Display Project Types */}
                                    <div className="min-h-[32px] mb-3">
                                        {(project.projectTypes?.length > 0) && (
                                            <div className="flex flex-wrap gap-1">
                                                {project.projectTypes.slice(0, 2).map((type: string, i: number) => (
                                                    <Badge key={`${type}-${i}`} variant="outline" className="text-xs">
                                                        {type}
                                                    </Badge>
                                                ))}
                                                {project.projectTypes.length > 2 && (
                                                    <Badge variant="outline" className="text-xs">+{project.projectTypes.length - 2}</Badge>
                                                )}
                                            </div>
                                        )}
                                    </div>

                                    {/* Display Domains and View Button */}
                                    <div className="flex justify-between items-center mt-auto pt-2 border-t border-border/50 min-h-[36px]">
                                        <div className="flex gap-1 flex-wrap min-w-0 flex-1 mr-2">
                                            {(project.domains?.length > 0) ? (
                                                <>
                                                    {project.domains.slice(0, 1).map((domain: string, i: number) => (
                                                        <Badge key={`${domain}-${i}`} variant="secondary" className="text-xs">
                                                            {domain}
                                                        </Badge>
                                                    ))}
                                                    {project.domains.length > 1 && (
                                                        <Badge variant="secondary" className="text-xs">+{project.domains.length - 1}</Badge>
                                                    )}
                                                </>
                                            ) : null}
                                        </div>

                                        <Button size="sm" variant="ghost" className="text-xs h-7 px-2 flex-shrink-0">
                                            View Details
                                        </Button>
                                    </div>
                                </div>
                            </Link>
                        </div>
                    );
                })}
            </div>

            {/* Loading indicator for infinite scroll */}
            {isLoading && projects.length > 0 && (
                <div className="flex justify-center py-4" ref={loadingRef}>
                    <div className="w-8 h-8 border-2 border-primary/50 border-t-primary rounded-full animate-spin"></div>
                </div>
            )}

            {/* Scroll to Top button */}
            {showScrollTop && (
                <button 
                    onClick={scrollToTop} 
                    className="fixed bottom-4 right-4 p-3 bg-primary text-white rounded-full shadow-md hover:shadow-lg transition-all duration-300 ease-in-out"
                    aria-label="Scroll to top"
                >
                    <ArrowUp className="w-5 h-5 text-black" />
                </button>
            )}
        </div>
    );
}
