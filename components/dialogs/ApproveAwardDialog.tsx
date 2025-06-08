import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogFooter, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';

interface ApproveAwardDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: () => void;
  loading?: boolean;
}

export default function ApproveAwardDialog({ open, onOpenChange, onConfirm, loading }: ApproveAwardDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Approve Award?</DialogTitle>
          <DialogDescription>
            Are you sure you want to approve this award? This will mark the award as approved and notify the relevant users.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)} disabled={loading}>Cancel</Button>
          <Button onClick={onConfirm} loading={loading}>Approve</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
