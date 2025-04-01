import Link from "next/link"
import { Badge } from "../../components/ui/badge"
import { Button } from "../../components/ui/button"
import { ExternalLink, Play } from "lucide-react"
import type { Project } from "../../types"
import type { Lecturer } from "../../types"
import TeamLeaderCard from "./team-leader-card"

interface ProjectDetailsProps {
  project: Project
  teamLeader: Lecturer
}

export default function ProjectDetails({ project, teamLeader }: ProjectDetailsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      {/* Project Details */}
      <div className="space-y-6">
        <h2 className="text-2xl font-bold mb-4">Project Details</h2>

        <div className="bg-zinc-900 p-6 rounded-lg border border-zinc-800">
          <div className="space-y-4">
            <div>
              <h3 className="text-sm text-gray-400">Project Title</h3>
              <p className="text-lg">{project.title}</p>
            </div>

            <div>
              <h3 className="text-sm text-gray-400">Subtitle</h3>
              <p>{project.subtitle}</p>
            </div>

            <div>
              <h3 className="text-sm text-gray-400">Project Status</h3>
              <Badge className="bg-red-600 text-white mt-1">{project.status}</Badge>
            </div>

            <div>
              <h3 className="text-sm text-gray-400">Tech Stack</h3>
              <div className="flex flex-wrap gap-2 mt-2">
                {project.techStack.map((tech, index) => (
                  <Badge key={index} variant="outline" className="bg-zinc-800 hover:bg-zinc-700">
                    {tech}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* SDG Goals */}
        <div className="bg-zinc-900 p-6 rounded-lg border border-zinc-800">
          <h3 className="text-xl font-bold mb-4">SDG Goals</h3>
          <div className="flex flex-wrap gap-2">
            {project.sdgGoals.map((goal, index) => (
              <Badge key={index} className="bg-green-700 hover:bg-green-600">
                {goal}
              </Badge>
            ))}
          </div>
        </div>

        {/* Project Domains */}
        <div className="bg-zinc-900 p-6 rounded-lg border border-zinc-800">
          <h3 className="text-xl font-bold mb-4">Project Domains</h3>
          <div className="flex flex-wrap gap-2">
            {project.domains.map((domain, index) => (
              <Badge key={index} variant="outline" className="bg-zinc-800 hover:bg-zinc-700">
                {domain}
              </Badge>
            ))}
          </div>
        </div>
      </div>

      {/* Team and Demo */}
      <div className="space-y-6">
        <h2 className="text-2xl font-bold mb-4">Team & Demo</h2>

        {/* Team Leader Contact */}
        <TeamLeaderCard teamLeader={teamLeader} />

        {/* External Links */}
        <div className="bg-zinc-900 p-6 rounded-lg border border-zinc-800">
          <h3 className="text-xl font-bold mb-4">External Links</h3>
          <div className="space-y-4">
            <Button variant="outline" className="w-full justify-start border-zinc-700 hover:bg-zinc-800" asChild>
              <Link href={`https://github.com/search?q=${encodeURIComponent(project.title)}`} target="_blank">
                <ExternalLink className="h-4 w-4 mr-2" />
                GitHub Repository
              </Link>
            </Button>

            <Button variant="outline" className="w-full justify-start border-zinc-700 hover:bg-zinc-800" asChild>
              <Link href={`https://www.google.com/search?q=${encodeURIComponent(project.title)}`} target="_blank">
                <ExternalLink className="h-4 w-4 mr-2" />
                Project Website
              </Link>
            </Button>
          </div>
        </div>

        {/* Demo Video Button */}
        <div className="bg-zinc-900 p-6 rounded-lg border border-zinc-800">
          <h3 className="text-xl font-bold mb-4">Demo Video</h3>
          <Button className="w-full bg-red-600 hover:bg-red-700 text-white">
            <Play className="mr-2 h-4 w-4" /> VIEW DEMO VIDEO
          </Button>
        </div>
      </div>
    </div>
  )
}

