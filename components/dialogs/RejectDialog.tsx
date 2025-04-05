import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { useState } from 'react';

const RejectDialog = ({ open, onOpenChange, project, onRejected }: { open: boolean; onOpenChange: (open: boolean) => void; project: any; onRejected: () => void }) => {
  const [feedback, setFeedback] = useState('');

  const handleReject = () => {
    // Add rejection logic here
    onRejected();
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Reject Project</DialogTitle>
          <DialogDescription>
            Please provide feedback for the rejection.
          </DialogDescription>
        </DialogHeader>
        <Textarea
          placeholder="Enter rejection feedback..."
          value={feedback}
          onChange={(e) => setFeedback(e.target.value)}
        />
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button
            variant="destructive"
            onClick={handleReject}
            disabled={!feedback.trim()}
          >
            Reject
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default RejectDialog;