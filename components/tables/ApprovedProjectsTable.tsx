import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Pagination, PaginationPrevious, PaginationNext } from '@/components/ui/pagination';
import { ApprovedProject } from '@/types/project/response';

interface ApprovedProjectsTableProps {
  projects: ApprovedProject[];
  onViewDetails: (project: ApprovedProject) => void;
  onToggleFeature: (project: ApprovedProject, featured: boolean) => void;
  currentPage: number;
  totalPages: number;
  onNextPage: () => void;
  onPreviousPage: () => void;
  onReject: (project: ApprovedProject) => void;
}

export function ApprovedProjectsTable({
  projects,
  onViewDetails,
  onToggleFeature,
  onReject,
  currentPage,
  totalPages,
  onNextPage,
  onPreviousPage,
}: ApprovedProjectsTableProps)
 {
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
              <TableCell>
                {new Date(project.approvedAt).toLocaleDateString('en-GB', {
                  day: 'numeric',
                  month: 'long',
                  year: 'numeric'
                })}
              </TableCell>
              <TableCell>
                <Button size="sm" onClick={() => onViewDetails(project)}>
                  View Details
                </Button>
                <Button size="sm" variant="destructive" onClick={() => onReject(project)} className='ml-5'>
                  Reject
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Pagination className="mt-4 flex justify-center items-center">
        {currentPage > 1 && <PaginationPrevious href="#" onClick={onPreviousPage} />}
        <span className="mx-2">Page {currentPage} of {totalPages}</span>
        {currentPage < totalPages && <PaginationNext href="#" onClick={onNextPage} />}
      </Pagination>
    </div>
  );
}