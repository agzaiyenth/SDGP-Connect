import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { Pagination, PaginationPrevious, PaginationNext } from '@/components/ui/pagination';
import { PendingProject } from '@/types/project/response';

interface PendingProjectsTableProps {
  projects: PendingProject[];
  selectedProjects: number[];
  onSelectProject: (projectId: number) => void;
  onSelectAll: (checked: boolean) => void;
  onViewDetails: (project: PendingProject) => void;
  onApprove: (project: PendingProject) => void;
  onReject: (project: PendingProject) => void;
  currentPage: number;
  totalPages: number;
  onNextPage: () => void;
  onPreviousPage: () => void;
}

export function PendingProjectsTable({
  projects,
  selectedProjects,
  onSelectProject,
  onSelectAll,
  onViewDetails,
  onApprove,
  onReject,
  currentPage,
  totalPages,
  onNextPage,
  onPreviousPage,
}: PendingProjectsTableProps) {
  return (
    <div>
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
      <Pagination className="mt-4">
        {currentPage > 1 && <PaginationPrevious href="#"onClick={onPreviousPage} />}
        <span className="mx-2">Page {currentPage} of {totalPages}</span>
        {currentPage < totalPages && <PaginationNext href="#" onClick={onNextPage} />}
      </Pagination>
    </div>
  );
}