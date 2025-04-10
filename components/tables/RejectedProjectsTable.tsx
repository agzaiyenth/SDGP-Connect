import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Pagination, PaginationPrevious, PaginationNext } from '@/components/ui/pagination';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
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
              <TableCell>
                  {new Date(project.rejectedAt).toLocaleDateString('en-GB', {
                    day: 'numeric',
                    month: 'long',
                    year: 'numeric'
                  })}
                </TableCell>
              <TableCell className="max-w-xs truncate">
                <Tooltip>
                  <TooltipTrigger asChild>
                    <span className="cursor-default">{project.rejectionReason}</span>
                  </TooltipTrigger>
                  <TooltipContent>{project.rejectionReason}</TooltipContent>
                </Tooltip>
              </TableCell>

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
        {currentPage > 1 && <PaginationPrevious href="#" onClick={onPreviousPage} />}
        <span className="mx-2">Page {currentPage} of {totalPages}</span>
        {currentPage < totalPages && <PaginationNext href="#" onClick={onNextPage} />}
      </Pagination>
    </div>
  );
}