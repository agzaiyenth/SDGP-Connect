import React from "react";
import { format } from "date-fns";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Pagination, PaginationPrevious, PaginationNext } from '@/components/ui/pagination';

export default function ApprovedCompetitionsTable({ competitions, currentPage, totalPages, onNextPage, onPreviousPage }) {
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
                  <Button size="sm">
                    View Details
                  </Button>
                  <Button size="sm" variant="destructive">
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
        {currentPage < totalPages && <PaginationNext href="#" onClick={onNextPage} />}
      </Pagination>
    </div>
  );
}
