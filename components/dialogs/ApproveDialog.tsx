import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';

const ApproveDialog = ({ open, onClose }: { open: boolean; onClose: () => void }) => (
  <Dialog open={open} onOpenChange={onClose}>
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
        <Button variant="outline" onClick={onClose}>
          Cancel
        </Button>
        <Button onClick={onClose}>
          Approve
        </Button>
      </DialogFooter>
    </DialogContent>
  </Dialog>
);

export default ApproveDialog;