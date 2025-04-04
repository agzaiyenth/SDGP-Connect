import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import ProjectDetails from '../ProjectDetails';

const DetailsDialog = ({ open, onOpenChange, projectID }: { open: boolean; onOpenChange: (open: boolean) => void; projectID: any }) => (
  <Dialog open={open} onOpenChange={onOpenChange}>
    <DialogContent className="max-w-3xl">
      <DialogHeader>
        <DialogTitle>Project Details</DialogTitle>
      </DialogHeader>
      {projectID && <ProjectDetails projectID={projectID} />}
      <DialogFooter>
        <Button variant="outline" onClick={() => onOpenChange(false)}>
          Close
        </Button>
      </DialogFooter>
    </DialogContent>
  </Dialog>
);

export default DetailsDialog;