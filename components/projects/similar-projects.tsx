"use client"

import Link from "next/link"
import Image from "next/image"
import { projects } from "../../lib/data"
import { Badge } from "../ui/badge"
import { Play } from "lucide-react"
import { useState } from "react"

export default function SimilarProjects({ currentProjectId }: { currentProjectId: string }) {
  // Filter out the current project and select 3 random projects as "similar"
  const similarProjects = projects.filter((project) => project.id !== currentProjectId).slice(0, 3)
  const [hoveredProject, setHoveredProject] = useState<string | null>(null)

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {similarProjects.map((project) => (
        <Link
          key={project.id}
          href={`/projects/${project.id}`}
          className="group block rounded-lg overflow-hidden bg-zinc-900 border border-zinc-800 hover:border-zinc-700 transition-all duration-300 hover:scale-105"
          onMouseEnter={() => setHoveredProject(project.id)}
          onMouseLeave={() => setHoveredProject(null)}
        >
          <div className="relative aspect-video">
            <Image src={project.coverImage || "/placeholder.svg"} alt={project.title} fill className="object-cover" />
            {hoveredProject === project.id && (
              <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                <Play className="h-12 w-12 text-white" />
              </div>
            )}
            <div className="absolute top-2 right-2">
              <Badge className="bg-red-600">{project.status}</Badge>
            </div>
          </div>

          <div className="p-4">
            <h3 className="text-lg font-bold line-clamp-1">{project.title}</h3>
            <p className="text-gray-400 text-sm mb-3 line-clamp-2">{project.subtitle}</p>
            <div className="flex flex-wrap gap-1">
              {project.domains.slice(0, 1).map((domain, i) => (
                <Badge key={i} variant="outline" className="bg-white/10 text-xs">
                  {domain}
                </Badge>
              ))}
            </div>
          </div>
        </Link>
      ))}
    </div>
  )
}

