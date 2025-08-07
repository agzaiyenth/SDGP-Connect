// Copyright (c) 2025, Psycode Lab's (https://www.psycodelabs.lk). All Rights Reserved.
//
// This software is the property of Psycode Lab's. and its suppliers, if any.
// Dissemination of any information or reproduction of any material contained
// herein in any form is strictly forbidden, unless permitted by Psycode Lab's expressly.
// You may not alter or remove any copyright or other notice from copies of this content.
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '../ui/scroll-area';
import CompetitionCard from '../competition/CompetitionCard';
import { useGetCompetitionById } from '@/hooks/competition/useGetCompetitionById';

interface CompetitionDetailsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  competitionId: string | null;
}

const CompetitionDetailsDialog = ({ open, onOpenChange, competitionId }: CompetitionDetailsDialogProps) => {
  const { competition, isLoading } = useGetCompetitionById(competitionId || undefined);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="!w-auto !max-w-none md:min-w-[800px] md:max-w-[90vw]">
        <DialogHeader>
          <DialogTitle>Competition Details</DialogTitle>
        </DialogHeader>
        <ScrollArea className="h-[70vh] flex items-center justify-center">
          {isLoading && <div className="text-center py-10">Loading...</div>}
          {!isLoading && competition && (
            <CompetitionCard
              id={competition.id}
              title={competition.name || "Untitled"}
              cover={competition.cover_image || "/placeholder.svg"}
              type={competition.type || "-"}
              startDate={competition.start_date || ""}
              endDate={competition.end_date || ""}
              logo={competition.logo || "/placeholder.svg"}
              viewLink={competition.id ? `/competitions/${competition.id}` : "#"}
              description={competition.description || "No description provided."}
              winnersCount={Array.isArray(competition.awards) ? competition.awards.length : 0}
            />
          )}
          {!isLoading && !competition && (
            <div className="text-center py-10 text-red-500">Competition not found.</div>
          )}
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

export default CompetitionDetailsDialog;
