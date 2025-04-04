'use client';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';
import { useEffect, useState } from 'react';
import { LoadingSpinner } from '@/components/ui/loading-spinner';
import { useGetProjectDetailsByID } from '@/hooks/project/useGetProjectDetailsByID';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { AlertCircle } from 'lucide-react';
import { HeroSection } from './s-project/hero-section';
import { ProjectHeader } from './s-project/project-header';
import { IProjectAssociation } from '@/types/project/type';
import { ProjectDomainEnum } from '@prisma/client';
import { ProjectOverview } from './s-project/project-overview';

const ProjectDetails = ({ projectID }: { projectID: string }) => {
  const { project, isLoading, error } = useGetProjectDetailsByID(projectID);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return (
      <Alert variant="destructive" className="mb-4">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>{error.message}</AlertDescription>
      </Alert>
    );
  }

  if (!project) {
    return (
      <Alert className="mb-4">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Project Not Found</AlertTitle>
        <AlertDescription>The requested project could not be found.</AlertDescription>
      </Alert>
    );
  }

  return (
    
    <div className="min-h-screen ">
      <HeroSection
        coverImage={project.metadata.cover_image}
      />
      
      <div className="container mx-auto px-4 pb-16">
        <ProjectHeader
          title={project.metadata.title}
          subtitle={project.metadata.subtitle}
          domains={
            (project.content?.associations || [])
              .filter(
                (association: IProjectAssociation): association is IProjectAssociation & { domain: ProjectDomainEnum } =>
                  association.domain != null
              )
              .map((association) => association.domain)
          }
          status={project.content?.status?.status}
        />
        
        <ProjectOverview
          problemStatement={project.content?.projectDetails?.problem_statement}
          solution={project.content?.projectDetails?.solution}
          keyFeatures={project.content?.projectDetails?.features}
        />
        
        {/* <SlideDeck slides={mockProject.slides} /> */}
        
        {/* <SDGSection
          sdgGoals={mockProject.sdgGoals}
          domains={mockProject.domains}
          onGoalClick={handleSDGGoalClick}
        /> */}
        
        {/* <SimilarProjects projects={mockProject.similarProjects} /> */}
      </div>
    </div>
  );
};

export default ProjectDetails;