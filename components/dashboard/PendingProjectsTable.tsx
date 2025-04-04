import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';

interface Project {
  id: number;
  title: string;
  groupNumber: string;
  submissionDate: string;
  status: string;
}

interface PendingProjectsTableProps {
  projects: Project[];
  selectedProjects: number[];
  onSelectProject: (projectId: number) => void;
  onSelectAll: (checked: boolean) => void;
  onViewDetails: (project: Project) => void;
  onApprove: (project: Project) => void;
  onReject: (project: Project) => void;
}

export function PendingProjectsTable({
  projects,
  selectedProjects,
  onSelectProject,
  onSelectAll,
  onViewDetails,
  onApprove,
  onReject,
}: PendingProjectsTableProps) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-12">
            <Checkbox
              checked={selectedProjects.length === projects.length}
              onCheckedChange={(checked) => onSelectAll(checked as boolean)}
            />
          </TableHead>
          <TableHead>Title</TableHead>
          <TableHead>Group</TableHead>
          <TableHead>Submission Date</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {projects.map((project) => (
          <TableRow key={project.id}>
            <TableCell>
              <Checkbox
                checked={selectedProjects.includes(project.id)}
                onCheckedChange={(checked) => {
                  if (checked) {
                    onSelectProject(project.id);
                  } else {
                    onSelectProject(project.id);
                  }
                }}
              />
            </TableCell>
            <TableCell>{project.title}</TableCell>
            <TableCell>{project.groupNumber}</TableCell>
            <TableCell>{project.submissionDate}</TableCell>
            <TableCell>
              <Badge>{project.status}</Badge>
            </TableCell>
            <TableCell>
              <div className="flex gap-2">
                <Button size="sm" onClick={() => onViewDetails(project)}>
                  View
                </Button>
                <Button size="sm" onClick={() => onApprove(project)}>
                  Approve
                </Button>
                <Button
                  size="sm"
                  variant="destructive"
                  onClick={() => onReject(project)}
                >
                  Reject
                </Button>
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}