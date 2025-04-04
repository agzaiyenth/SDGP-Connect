import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';

const ApproveDialog = ({ open, onOpenChange, project, onApproved }: { open: boolean; onOpenChange: (open: boolean) => void; project: any; onApproved: () => void }) => {
  const handleApprove = () => {
    // Add approval logic here
    onApproved();
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Approve Project</DialogTitle>
          <DialogDescription>
            Are you sure you want to approve this project?
          </DialogDescription>
        </DialogHeader>
        <div className="flex items-center space-x-2">
          <Switch id="featured" />
          <label htmlFor="featured">Feature this project</label>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleApprove}>
            Approve
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ApproveDialog;