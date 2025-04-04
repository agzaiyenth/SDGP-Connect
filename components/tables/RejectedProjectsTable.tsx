import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { RejectedProject } from '@/types/project/response';

interface RejectedProjectsTableProps {
  projects: RejectedProject[];
  onViewDetails: (project: RejectedProject) => void;
  currentPage: number;
  totalPages: number;
  onNextPage: () => void;
  onPreviousPage: () => void;
}

export function RejectedProjectsTable({
  projects,
  onViewDetails,
  currentPage,
  totalPages,
  onNextPage,
  onPreviousPage,
}: RejectedProjectsTableProps) {
  return (
    <div>
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
      <div className="flex justify-between items-center mt-4">
        <Button
          onClick={onPreviousPage}
          disabled={currentPage === 1}
        >
          Previous
        </Button>
        <span>
          Page {currentPage} of {totalPages}
        </span>
        <Button
          onClick={onNextPage}
          disabled={currentPage === totalPages}
        >
          Next
        </Button>
      </div>
    </div>
  );
}