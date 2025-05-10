import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import {
  Pagination,
  PaginationPrevious,
  PaginationNext,
} from '@/components/ui/pagination';
import { Checkbox } from '@/components/ui/checkbox';
import { RejectedProject } from '@/types/project/response';

interface RejectedProjectsTableProps {
  projects: RejectedProject[];
  selectedProjects: number[];
  onSelectProject: (projectId: number) => void;
  onSelectAll: (checked: boolean) => void;
  onViewDetails: (project: RejectedProject) => void;
  onApprove?: (project: RejectedProject) => void; 
  currentPage: number;
  totalPages: number;
  onNextPage: () => void;
  onPreviousPage: () => void;
}

export function RejectedProjectsTable({
  projects = [],
  selectedProjects = [],
  onSelectProject,
  onSelectAll,
  onViewDetails,
  onApprove = () => {}, 
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
            <TableHead className="w-12">
              <Checkbox
                checked={selectedProjects.length === projects.length && projects.length > 0}
                onCheckedChange={(checked) => onSelectAll(checked as boolean)}
              />
            </TableHead>
            <TableHead>Title</TableHead>
            <TableHead>Group</TableHead>
            <TableHead>Submission Date</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {projects.length === 0 ? (
            <TableRow>
              <TableCell colSpan={5} className="text-center">
                No rejected projects found.
              </TableCell>
            </TableRow>
          ) : (
            projects.map((project) => {
              if (!project || !project.id) return null;

              return (
                <TableRow key={project.id}>
                  <TableCell>
                    <Checkbox
                      checked={selectedProjects.includes(project.id)}
                      onCheckedChange={(checked) => {
                        if (typeof checked === 'boolean') {
                          onSelectProject(project.id);
                        }
                      }}
                    />
                  </TableCell>
                  <TableCell>{project.title ?? 'Untitled'}</TableCell>
                  <TableCell>{project.groupNumber ?? 'N/A'}</TableCell>
                  <TableCell>
                    {project.submissionDate
                      ? new Date(project.submissionDate).toLocaleDateString('en-GB', {
                          day: 'numeric',
                          month: 'long',
                          year: 'numeric',
                        })
                      : 'No Date'}
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button size="sm" onClick={() => onViewDetails(project)}>
                        View
                      </Button>
                      <Button size="sm" onClick={() => onApprove(project)}>
                        Re-Approve
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              );
            })
          )}
        </TableBody>
      </Table>

      <Pagination className="mt-4">
        {currentPage > 1 && (
          <PaginationPrevious href="#" onClick={onPreviousPage}>
            Previous
          </PaginationPrevious>
        )}
        <span className="mx-2">
          Page {currentPage} of {totalPages}
        </span>
        {currentPage < totalPages && (
          <PaginationNext href="#" onClick={onNextPage}>
            Next
          </PaginationNext>
        )}
      </Pagination>
    </div>
  );
}
