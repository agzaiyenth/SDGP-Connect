// Copyright (c) 2025, Psycode Lab's (https://www.psycodelabs.lk). All Rights Reserved.
//
// This software is the property of Psycode Lab's. and its suppliers, if any.
// Dissemination of any information or reproduction of any material contained
// herein in any form is strictly forbidden, unless permitted by Psycode Lab's expressly.
// You may not alter or remove any copyright or other notice from copies of this content.
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '../ui/scroll-area';
import AwardCard from '../competition/AwardCard';
import { useGetAwardById } from '@/hooks/awards/useGetAwardById';

interface AwardDetailsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  awardId: string | null;
}

const AwardDetailsDialog = ({ open, onOpenChange, awardId }: AwardDetailsDialogProps) => {
  const { award, isLoading } = useGetAwardById(awardId || undefined);

  // Prepare the winner object for AwardCard
  const winner = award && award.project ? {
    id: award.project.project_id || award.project.id || '',
    projectName: award.project.title || 'Untitled',
    team: award.project.group_num || '-',
    sdgpYear: award.project.sdgp_year || '-',
    cover: award.project.cover_image || '/placeholder.svg',
    award: award.name || 'Award',
    description: award.project.subtitle || award.project.description || 'No description provided.'
  } : null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="!w-auto !max-w-none md:min-w-[800px] md:max-w-[90vw]">
        <DialogHeader>
          <DialogTitle>Award Details</DialogTitle>
        </DialogHeader>
        <ScrollArea className="h-[70vh] flex items-center justify-center">
          {isLoading && <div className="text-center py-10">Loading...</div>}
          {!isLoading && winner && <AwardCard winner={winner} />}
          {!isLoading && !winner && <div className="text-center py-10 text-red-500">Award not found.</div>}
        </ScrollArea>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Close
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AwardDetailsDialog;
