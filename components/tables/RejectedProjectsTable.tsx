import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Pagination, PaginationPrevious, PaginationNext } from '@/components/ui/pagination';
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
      <Pagination className="mt-4">
        {currentPage > 1 && <PaginationPrevious onClick={onPreviousPage} />}
        <span className="mx-2">Page {currentPage} of {totalPages}</span>
        {currentPage < totalPages && <PaginationNext onClick={onNextPage} />}
      </Pagination>
    </div>
  );
}