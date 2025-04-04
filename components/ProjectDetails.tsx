import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';

const ProjectDetails = ({ project }: { project: any }) => (
  <ScrollArea className="h-[60vh]">
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold">{project.title}</h3>
        <p className="text-sm text-muted-foreground">Group {project.groupNumber}</p>
      </div>

      <div className="grid gap-4">
        <div>
          <h4 className="font-medium mb-2">Project Status</h4>
          <Badge>{project.status}</Badge>
        </div>

        <div>
          <h4 className="font-medium mb-2">Description</h4>
          <p className="text-sm">{project.description}</p>
        </div>

        <div>
          <h4 className="font-medium mb-2">Team Members</h4>
          <ul className="list-disc list-inside text-sm">
            {project.teamMembers.map((member: string) => (
              <li key={member}>{member}</li>
            ))}
          </ul>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <h4 className="font-medium mb-2">Type</h4>
            <p className="text-sm">{project.type}</p>
          </div>
          <div>
            <h4 className="font-medium mb-2">Domain</h4>
            <p className="text-sm">{project.domain}</p>
          </div>
          <div>
            <h4 className="font-medium mb-2">Technology</h4>
            <p className="text-sm">{project.tech}</p>
          </div>
          <div>
            <h4 className="font-medium mb-2">SDG</h4>
            <p className="text-sm">{project.sdg}</p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <h4 className="font-medium mb-2">GitHub Repository</h4>
            <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="text-sm text-blue-600 hover:underline">
              View Repository
            </a>
          </div>
          <div>
            <h4 className="font-medium mb-2">Demo URL</h4>
            <a href={project.demoUrl} target="_blank" rel="noopener noreferrer" className="text-sm text-blue-600 hover:underline">
              View Demo
            </a>
          </div>
        </div>

        {project.approvedBy && (
          <div>
            <h4 className="font-medium mb-2">Approval Details</h4>
            <p className="text-sm">Approved by {project.approvedBy} on {project.approvedAt}</p>
          </div>
        )}

        {project.rejectedBy && (
          <div>
            <h4 className="font-medium mb-2">Rejection Details</h4>
            <p className="text-sm">Rejected by {project.rejectedBy} on {project.rejectedAt}</p>
            <p className="text-sm mt-2">Reason: {project.rejectionReason}</p>
          </div>
        )}
      </div>
    </div>
  </ScrollArea>
);

export default ProjectDetails;