import React from "react";
import { format } from "date-fns";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Pagination, PaginationPrevious, PaginationNext } from '@/components/ui/pagination';
import CompetitionDetailsDialog from '../dialogs/CompetitionDetailsDialog';
import { RejectCompetitionDialog } from '../dialogs/RejectCompetitionDialog';

interface Competition {
  id: string;
  name: string;
  start_date: string;
  end_date: string;
  description: string;
  type: string;
  cover_image?: string;
  logo?: string;
  accepted_by?: { name: string } | null;
}

interface ApprovedCompetitionsTableProps {
  competitions: Competition[];
  currentPage: number;
  totalPages: number;
  onNextPage: () => void;
  onPreviousPage: () => void;
}

export default function ApprovedCompetitionsTable({ competitions, currentPage, totalPages, onNextPage, onPreviousPage }: ApprovedCompetitionsTableProps) {
  const [detailsOpen, setDetailsOpen] = React.useState(false);
  const [selectedId, setSelectedId] = React.useState<string | null>(null);
  const [rejectDialogOpen, setRejectDialogOpen] = React.useState(false);
  const [selectedCompetition, setSelectedCompetition] = React.useState<Competition | null>(null);

  const handleViewDetails = (id: string) => {
    setSelectedId(id);
    setDetailsOpen(true);
  };

  const handleReject = (competition: Competition) => {
    setSelectedCompetition(competition);
    setRejectDialogOpen(true);
  };

  return (
    <div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Start Date</TableHead>
            <TableHead>End Date</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Description</TableHead>
            <TableHead>Approved By</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {competitions.map((comp) => (
            <TableRow key={comp.id}>
              <TableCell className="font-medium">{comp.name}</TableCell>
              <TableCell>{format(new Date(comp.start_date), "MMM d yyyy")}</TableCell>
              <TableCell>{format(new Date(comp.end_date), "MMM d yyyy")}</TableCell>
              <TableCell>
                <Badge variant="secondary">{comp.type}</Badge>
              </TableCell>
              <TableCell>
                <span title={comp.description} className="truncate block max-w-xs cursor-help">
                  {comp.description.length > 40 ? comp.description.slice(0, 40) + "..." : comp.description}
                </span>
              </TableCell>
            
              <TableCell>{comp.accepted_by ? comp.accepted_by.name : "-"}</TableCell>
              <TableCell>
                <div className="flex gap-2">
                  <Button size="sm" onClick={() => handleViewDetails(comp.id)}>
                    View Details
                  </Button>                  <Button size="sm" variant="destructive" onClick={() => handleReject(comp)}>
                    Reject
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Pagination className="mt-4 flex justify-center items-center">
        {currentPage > 1 && <PaginationPrevious href="#" onClick={onPreviousPage} />}
        <span className="mx-2">Page {currentPage} of {totalPages}</span>
        {currentPage < totalPages && <PaginationNext href="#" onClick={onNextPage} />}      </Pagination>
      <CompetitionDetailsDialog open={detailsOpen} onOpenChange={setDetailsOpen} competitionId={selectedId} />
      {selectedCompetition && (
        <RejectCompetitionDialog
          open={rejectDialogOpen}
          onOpenChange={setRejectDialogOpen}
          competition={selectedCompetition}
          onRejected={() => setSelectedCompetition(null)}
        />
      )}
    </div>
  );
}
