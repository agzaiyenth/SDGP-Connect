import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { RejectedProject } from '@/types/project/response';



interface RejectedProjectsTableProps {
  projects: RejectedProject[];
  onViewDetails: (project: RejectedProject) => void;
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