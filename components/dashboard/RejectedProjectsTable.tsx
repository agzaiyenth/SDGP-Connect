import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';

interface Project {
  id: number;
  title: string;
  groupNumber: string;
  rejectedBy: string;
  rejectedAt: string;
  rejectionReason: string;
}

interface RejectedProjectsTableProps {
  projects: Project[];
  onViewDetails: (project: Project) => void;
}

export function RejectedProjectsTable({
  projects,
  onViewDetails,
}: RejectedProjectsTableProps) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Title</TableHead>
          <TableHead>Group</TableHead>
          <TableHead>Rejected By</TableHead>
          <TableHead>Rejected At</TableHead>
          <TableHead>Reason</TableHead>
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {projects.map((project) => (
          <TableRow key={project.id}>
            <TableCell>{project.title}</TableCell>
            <TableCell>{project.groupNumber}</TableCell>
            <TableCell>{project.rejectedBy}</TableCell>
            <TableCell>{project.rejectedAt}</TableCell>
            <TableCell className="max-w-xs truncate">{project.rejectionReason}</TableCell>
            <TableCell>
              <Button size="sm" onClick={() => onViewDetails(project)}>
                View Details
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}