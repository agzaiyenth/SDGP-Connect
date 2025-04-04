import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { ApprovedProject } from '@/types/project/response';

interface ApprovedProjectsTableProps {
  projects: ApprovedProject[];
  onViewDetails: (project: ApprovedProject) => void;
  onToggleFeature: (project: ApprovedProject, featured: boolean) => void;
  currentPage: number;
  totalPages: number;
  onNextPage: () => void;
  onPreviousPage: () => void;
}

export function ApprovedProjectsTable({
  projects,
  onViewDetails,
  onToggleFeature,
  currentPage,
  totalPages,
  onNextPage,
  onPreviousPage,
}: ApprovedProjectsTableProps) {
  return (
    <div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Title</TableHead>
            <TableHead>Group</TableHead>
            <TableHead>Featured</TableHead>
            <TableHead>Approved By</TableHead>
            <TableHead>Approved At</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {projects.map((project) => (
            <TableRow key={project.id}>
              <TableCell>{project.title}</TableCell>
              <TableCell>{project.groupNumber}</TableCell>
              <TableCell>
                <Switch
                  checked={project.featured}
                  onCheckedChange={(checked) => onToggleFeature(project, checked)}
                />
              </TableCell>
              <TableCell>{project.approvedBy}</TableCell>
              <TableCell>{project.approvedAt}</TableCell>
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