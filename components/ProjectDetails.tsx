'use client';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';
import { useEffect, useState } from 'react';

const ProjectDetails = ({ projectID }: { projectID: string }) => (
  const [project, setProject] = useState<any>(null);

  useEffect(() => {
    const fetchProject = async () => {
      const data = await useGetProjectDetailsByID(projectID);
      setProject(data);
    };
    
    fetchProject();
  }, [projectID]);

  if (!project) return <div>Loading...</div>;

  <ScrollArea className="h-[60vh]">
     <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold">{project.title}</h3>
        <p className="text-sm text-muted-foreground">Group {project.group_num}</p>
      </div>

      <div className="grid gap-4">
        <div>
          <h4 className="font-medium mb-2">Project Status</h4>
          <Badge>{project.projectContent.status?.status}</Badge>
        </div>

        <div>
          <h4 className="font-medium mb-2">Description</h4>
          <p className="text-sm">{project.projectContent.projectDetails?.solution}</p>
        </div>

        <div>
          <h4 className="font-medium mb-2">Team Members</h4>
          <ul className="list-disc list-inside text-sm">
            {project.projectContent.team.map((member: any) => (
              <li key={member.member_id}>{member.name}</li>
            ))}
          </ul>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <h4 className="font-medium mb-2">Type</h4>
            <p className="text-sm">{project.projectContent.associations?.find((association: any) => association.projectType)?.projectType}</p>
          </div>
          <div>
            <h4 className="font-medium mb-2">Domain</h4>
            <p className="text-sm">{project.projectContent.associations?.find((association: any) => association.domain)?.domain}</p>
          </div>
          <div>
            <h4 className="font-medium mb-2">Technology</h4>
            <p className="text-sm">{project.projectContent.associations?.find((association: any) => association.techStack)?.techStack}</p>
          </div>
          <div>
            <h4 className="font-medium mb-2">SDG</h4>
            <p className="text-sm">{project.projectContent.associations?.find((association: any) => association.sdgGoal)?.sdgGoal}</p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          {project.projectContent.socialLinks.map((link: any) => (
            <div key={link.id}>
              <h4 className="font-medium mb-2">{link.link_name}</h4>
              <a href={link.url} target="_blank" rel="noopener noreferrer" className="text-sm text-blue-600 hover:underline">
                {link.link_name} Link
              </a>
            </div>
          ))}
        </div>

        {project.projectContent.status?.approved_by && (
          <div>
            <h4 className="font-medium mb-2">Approval Details</h4>
            <p className="text-sm">
              Approved by {project.projectContent.status.approved_by} on {project.projectContent.status.approved_at}
            </p>
          </div>
        )}

        {project.projectContent.status?.approved_status === 'REJECTED' && (
          <div>
            <h4 className="font-medium mb-2">Rejection Details</h4>
            <p className="text-sm">Rejected by {project.projectContent.status?.approved_by} on {project.projectContent.status?.approved_at}</p>
            <p className="text-sm mt-2">Reason: {project.projectContent.status?.rejectionReason}</p>
          </div>
        )}
      </div>
    </div>
  </ScrollArea>
);

export default ProjectDetails;