import React from 'react';
import { useApprovedAwards } from '@/hooks/awards/useApprovedAwards';
import { Table, TableHeader, TableBody, TableHead, TableRow, TableCell } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import type { AdminAward } from '@/types/award';

export default function ApprovedAwardsTable() {
  const { awards, isLoading } = useApprovedAwards();

  function formatShortDate(dateStr: string) {
    if (!dateStr) return '';
    const date = new Date(dateStr);
    if (isNaN(date.getTime())) return dateStr;
    const day = date.getDate();
    const month = date.toLocaleString('en-US', { month: 'short' });
    const year = String(date.getFullYear()).slice(-2);
    return `${day} ${month} '${year}`;
  }

  return (
    <div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Project</TableHead>
            <TableHead>Competition</TableHead>
            <TableHead>Approved By</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {isLoading
            ? [...Array(5)].map((_, i) => (
                <TableRow key={i}>
                  <TableCell><Skeleton className="h-5 w-32" /></TableCell>
                  <TableCell><Skeleton className="h-5 w-40" /></TableCell>
                  <TableCell><Skeleton className="h-5 w-40" /></TableCell>
                  <TableCell><Skeleton className="h-5 w-24" /></TableCell>
                  <TableCell><Skeleton className="h-8 w-32" /></TableCell>
                </TableRow>
              ))
            : awards.map((award: AdminAward) => (
                <TableRow key={award.id}>
                  <TableCell className="font-medium">{award.name}</TableCell>
                  <TableCell>
                    <div className="font-medium">{award.project.title}</div>
                    <div className="text-xs text-muted-foreground">
                      {award.project.group_num} &bull; SDGP {award.project.sdgp_year}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="font-medium">{award.competition.name}</div>
                    <div className="text-xs text-muted-foreground">
                      {formatShortDate(award.competition.start_date)} - {formatShortDate(award.competition.end_date)}
                    </div>
                  </TableCell>
                  <TableCell>{award.accepted_by?.name || '-'}</TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button size="sm">View Details</Button>
                      <Button size="sm" variant="destructive">Reject</Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
        </TableBody>
      </Table>
    </div>
  );
}
