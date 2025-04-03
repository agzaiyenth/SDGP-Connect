"use client"
import { useParams } from "next/navigation";
import { Project } from "../../../../types/index";
import { projects, lecturers } from "../../../../data/delete_after_db/sampleProjects"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../../../components/ui/tabs"
import ProjectHero from "../../../../components/projects/project-hero"
import ProjectOverview from "../../../../components/projects/project-overview"
import ProjectGallery from "../../../../components/projects/project-gallery"
import ProjectDetails from "../../../../components/projects/project-details"

export default function ProjectPage() {
  const params = useParams();
  const project = (projects.find((p) => p.id === params.id) || projects[0]) as unknown as Project;
 

  const teamLeader = lecturers[0];

  return (
    <div className="min-h-screen bg-black text-white ml-24">
      {/* Hero Banner Section */}
      <ProjectHero project={project} />

      {/* Main Content */}
      <div className="container mx-auto px-4">
        <Tabs defaultValue="overview" className="mt-8">
          <TabsList className="bg-zinc-900 border-b border-zinc-800 w-full justify-start rounded-none p-0">
            <TabsTrigger
              value="overview"
              className="rounded-none px-8 py-3 data-[state=active]:border-b-2 data-[state=active]:border-red-600 data-[state=active]:bg-transparent"
            >
              Overview
            </TabsTrigger>
            <TabsTrigger
              value="gallery"
              className="rounded-none px-8 py-3 data-[state=active]:border-b-2 data-[state=active]:border-red-600 data-[state=active]:bg-transparent"
            >
              Gallery
            </TabsTrigger>
            <TabsTrigger
              value="details"
              className="rounded-none px-8 py-3 data-[state=active]:border-b-2 data-[state=active]:border-red-600 data-[state=active]:bg-transparent"
            >
              Details
            </TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="mt-8">
            <ProjectOverview project={project} teamLeader={teamLeader} />
          </TabsContent>

          {/* Gallery Tab */}
          <TabsContent value="gallery" className="mt-8">
            <ProjectGallery images={project.gallery} />
          </TabsContent>

          {/* Details Tab */}
          <TabsContent value="details" className="mt-8">
            <ProjectDetails project={project} teamLeader={teamLeader} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

