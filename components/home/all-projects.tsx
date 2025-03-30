"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { projects } from "../../lib/data"
import { Badge } from "..//ui/badge"
import { Button } from "../ui/button"
import { ChevronLeft, ChevronRight } from "lucide-react"

export default function AllProjects() {
  const [currentPage, setCurrentPage] = useState(0)
  const projectsPerPage = 6
  const totalPages = Math.ceil(projects.length / projectsPerPage)

  const displayedProjects = projects.slice(currentPage * projectsPerPage, (currentPage + 1) * projectsPerPage)

  const nextPage = () => {
    setCurrentPage((prev) => (prev + 1) % totalPages)
  }

  const prevPage = () => {
    setCurrentPage((prev) => (prev - 1 + totalPages) % totalPages)
  }

  return (
    <section className="py-12 px-4">
      <div className="container mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold">Explore All Projects</h2>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" onClick={prevPage} disabled={currentPage === 0}>
              <ChevronLeft className="h-4 w-4 mr-1" /> Previous
            </Button>
            <span className="text-sm text-muted-foreground">
              Page {currentPage + 1} of {totalPages}
            </span>
            <Button variant="outline" size="sm" onClick={nextPage} disabled={currentPage === totalPages - 1}>
              Next <ChevronRight className="h-4 w-4 ml-1" />
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayedProjects.map((project) => (
            <Link
              key={project.id}
              href={`/projects/${project.id}`}
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
                <p className="text-muted-foreground mb-3 line-clamp-2">{project.subtitle}</p>

                <div className="flex flex-wrap gap-2 mb-4">
                  {project.techStack.slice(0, 3).map((tech, i) => (
                    <Badge key={i} variant="outline">
                      {tech}
                    </Badge>
                  ))}
                  {project.techStack.length > 3 && <Badge variant="outline">+{project.techStack.length - 3}</Badge>}
                </div>

                <div className="flex justify-between items-center mt-auto">
                  <div className="flex gap-2">
                    {project.domains.slice(0, 1).map((domain, i) => (
                      <Badge key={i} variant="secondary">
                        {domain}
                      </Badge>
                    ))}
                  </div>
                  <Button size="sm" variant="ghost">
                    View
                  </Button>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}

