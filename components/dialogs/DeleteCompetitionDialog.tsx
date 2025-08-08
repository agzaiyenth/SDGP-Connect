/* Copyright (c) 2025, the contributors of the SDGP Connect project. All Rights Reserved.

This software is the joint property of the contributors to the SDGP Connect project.
Unauthorized distribution, commercial use, or reproduction of any part of this material
in any form is strictly prohibited without the explicit written consent of all contributors.
You may not alter or remove any copyright or attribution notice from this content. */

import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogFooter, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';

interface DeleteCompetitionDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: () => void;
  loading?: boolean;
  competitionName?: string;
  awardCount?: number;
}

export default function DeleteCompetitionDialog({ 
  open, 
  onOpenChange, 
  onConfirm, 
  loading, 
  competitionName, 
  awardCount 
}: DeleteCompetitionDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Delete Competition?</DialogTitle>
          <DialogDescription>
            {competitionName && (
              <>
                This competition '<b>{competitionName}</b>' will be permanently deleted.
                <br />
                {typeof awardCount === 'number' && awardCount > 0 && (
                  <>
                    <b>{awardCount}</b> award{awardCount !== 1 && 's'} related to this competition will also be deleted.
                    <br />
                  </>
                )}
                <span className="text-destructive font-semibold">This action cannot be undone.</span>
              </>
            )}
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)} disabled={loading}>
            Cancel
          </Button>
          <Button variant="destructive" onClick={onConfirm} disabled={loading}>
            {loading ? 'Deleting...' : 'Delete'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}