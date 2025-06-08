import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogFooter, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';

interface DeleteAwardDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: () => void;
  loading?: boolean;
}

export default function DeleteAwardDialog({ open, onOpenChange, onConfirm, loading }: DeleteAwardDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Delete Award?</DialogTitle>
          <DialogDescription>
            Deleting this award will <b>not</b> delete the competition or project it is related to.<br />
            <span className="text-destructive font-semibold">This action cannot be undone.</span>
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)} disabled={loading}>Cancel</Button>
          <Button variant="destructive" onClick={onConfirm} loading={loading}>Delete</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
