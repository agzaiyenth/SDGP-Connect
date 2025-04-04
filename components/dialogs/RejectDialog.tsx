import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { useState } from 'react';

const RejectDialog = ({ open, onClose }: { open: boolean; onClose: () => void }) => {
  const [feedback, setFeedback] = useState('');

  return (
    <Dialog open={open} onOpenChange={onClose}>
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
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button
            variant="destructive"
            onClick={onClose}
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