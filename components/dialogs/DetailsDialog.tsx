import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import ProjectDetails from '../ProjectDetails';
import { ScrollArea } from '../ui/scroll-area';

const DetailsDialog = ({ open, onOpenChange, projectID }: { open: boolean; onOpenChange: (open: boolean) => void; projectID: any }) => (
  <Dialog open={open} onOpenChange={onOpenChange}>
    <DialogContent className="!w-auto !max-w-none md:min-w-[800px] md:max-w-[90vw]">
      <DialogHeader>
        <DialogTitle>Project Details</DialogTitle>
      </DialogHeader>
      <ScrollArea className="h-[70vh]">
        {projectID && <ProjectDetails projectID={projectID} />}
      </ScrollArea>
      <DialogFooter>
        <Button variant="outline" onClick={() => onOpenChange(false)}>
          Close
        </Button>
      </DialogFooter>
    </DialogContent>
  </Dialog>
);

export default DetailsDialog;