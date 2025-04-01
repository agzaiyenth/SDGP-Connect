import { Badge } from "../../components/ui/badge"
import type { Project } from "../../types"
import type { Lecturer } from "../../types"
import TeamLeaderCard from "./team-leader-card"

interface ProjectOverviewProps {
  project: Project
  teamLeader: Lecturer
}

export default function ProjectOverview({ project, teamLeader }: ProjectOverviewProps) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <div className="lg:col-span-2 space-y-8">
        {/* Problem Statement */}
        <div>
          <h2 className="text-2xl font-bold mb-4">Problem Statement</h2>
          <p className="text-gray-300">{project.problemStatement}</p>
        </div>

        {/* Solution */}
        <div>
          <h2 className="text-2xl font-bold mb-4">Solution</h2>
          <p className="text-gray-300">{project.solution}</p>
        </div>

        {/* Features */}
        <div>
          <h2 className="text-2xl font-bold mb-4">Key Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {project.features.map((feature, index) => (
              <div key={index} className="bg-zinc-900 p-4 rounded-lg border border-zinc-800">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-red-600/20 flex items-center justify-center">
                    <span className="text-red-500 font-bold">{index + 1}</span>
                  </div>
                  <p className="text-gray-300">{feature}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="space-y-8">
        {/* Tech Stack */}
        <div className="bg-zinc-900 p-6 rounded-lg border border-zinc-800">
          <h2 className="text-xl font-bold mb-4">Tech Stack</h2>
          <div className="flex flex-wrap gap-2">
            {project.techStack.map((tech, index) => (
              <Badge key={index} variant="outline" className="bg-zinc-800 hover:bg-zinc-700">
                {tech}
              </Badge>
            ))}
          </div>
        </div>

        {/* SDG Goals */}
        <div className="bg-zinc-900 p-6 rounded-lg border border-zinc-800">
          <h2 className="text-xl font-bold mb-4">SDG Goals</h2>
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
          <h2 className="text-xl font-bold mb-4">Project Domains</h2>
          <div className="flex flex-wrap gap-2">
            {project.domains.map((domain, index) => (
              <Badge key={index} variant="outline" className="bg-zinc-800 hover:bg-zinc-700">
                {domain}
              </Badge>
            ))}
          </div>
        </div>

        {/* Project Status */}
        <div className="bg-zinc-900 p-6 rounded-lg border border-zinc-800">
          <h2 className="text-xl font-bold mb-4">Project Status</h2>
          <Badge className="bg-red-600 text-white">{project.status}</Badge>
        </div>

        {/* Team Leader Contact */}
        <TeamLeaderCard teamLeader={teamLeader} />
      </div>
    </div>
  )
}

