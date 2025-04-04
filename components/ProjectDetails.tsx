'use client';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';
import { useEffect, useState } from 'react';
import { LoadingSpinner } from '@/components/ui/loading-spinner';
import { useGetProjectDetailsByID } from '@/hooks/project/useGetProjectDetailsByID';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { AlertCircle } from 'lucide-react';

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
    <ScrollArea className="h-[60vh]">
      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-semibold">{project.metadata.title}</h3>
          <p className="text-sm text-muted-foreground">Group {project.metadata.group_num}</p>
        </div>

        <div className="grid gap-4">
          <div>
            <h4 className="font-medium mb-2">Project Status</h4>
            <Badge>{project.content?.status?.status}</Badge>
          </div>

          <div>
            <h4 className="font-medium mb-2">Description</h4>
            <p className="text-sm">{project.content?.projectDetails?.solution}</p>
          </div>

          <div>
            <h4 className="font-medium mb-2">Team Members</h4>
            <ul className="list-disc list-inside text-sm">
              {project.content?.team?.map((member) => (
                <li key={member.member_id}>{member.name}</li>
              ))}
            </ul>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <h4 className="font-medium mb-2">Type</h4>
              <p className="text-sm">{project.content?.associations?.find((association) => association.projectType)?.projectType}</p>
            </div>
            <div>
              <h4 className="font-medium mb-2">Domain</h4>
              <p className="text-sm">{project.content?.associations?.find((association) => association.domain)?.domain}</p>
            </div>
            <div>
              <h4 className="font-medium mb-2">Technology</h4>
              <p className="text-sm">{project.content?.associations?.find((association) => association.techStack)?.techStack}</p>
            </div>
            <div>
              <h4 className="font-medium mb-2">SDG</h4>
              <p className="text-sm">{project.content?.associations?.find((association) => association.sdgGoal)?.sdgGoal}</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {project.content?.socialLinks?.map((link) => (
              <div key={link.id}>
                <h4 className="font-medium mb-2">{link.link_name}</h4>
                <a href={link.url} target="_blank" rel="noopener noreferrer" className="text-sm text-blue-600 hover:underline">
                  {link.link_name} Link
                </a>
              </div>
            ))}
          </div>

          {project.content?.status?.approved_by && (
            <div>
              <h4 className="font-medium mb-2">Approval Details</h4>
              <p className="text-sm">
                Approved by {project.content.status.approved_by.name || 'Administrator'} on {project.content.status.approved_at?.toLocaleDateString()}
              </p>
            </div>
          )}

          {project.content?.status?.approved_status === 'REJECTED' && (
            <div>
              <h4 className="font-medium mb-2">Rejection Details</h4>
              <p className="text-sm">
                Rejected on {project.content.status.approved_at?.toLocaleDateString()}
                {project.content.status.approved_by && ` by ${project.content.status.approved_by.name || 'Administrator'}`}
              </p>
            </div>
          )}
        </div>
      </div>
    </ScrollArea>
  );
};

export default ProjectDetails;