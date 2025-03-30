import Link from "next/link"
import Image from "next/image"
import { projects } from "../../data/delete_after_db/sampleProjects"
import { Badge } from "../ui/badge"
import { Button } from "../ui/button"

export default function ProjectExplorer() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {projects.map((project) => (
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
  )
}

