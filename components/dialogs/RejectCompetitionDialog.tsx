/* Copyright (c) 2025, the contributors of the SDGP Connect project. All Rights Reserved.

This software is the joint property of the contributors to the SDGP Connect project.
Unauthorized distribution, commercial use, or reproduction of any part of this material
in any form is strictly prohibited without the explicit written consent of all contributors.
You may not alter or remove any copyright or attribution notice from this content. */

import { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { AlertCircle, CheckCircle } from 'lucide-react';
import { useCompetitionApprovalActions } from '@/hooks/competition/useCompetitionApprovalActions';

interface Competition {
  id: string;
  name: string;
}

interface RejectCompetitionDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  competition: Competition;
  onRejected?: () => void;
}

export function RejectCompetitionDialog({ open, onOpenChange, competition, onRejected }: RejectCompetitionDialogProps) {
  const [reason, setReason] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);
  
  const { rejectCompetition, loading, error, clearState } = useCompetitionApprovalActions({
    onSuccess: () => {
      setShowSuccess(true);
      setTimeout(() => {
        setShowSuccess(false);
        onRejected && onRejected();
        onOpenChange(false);
      }, 1500);
    }
  });

  const handleReject = async () => {
    try {
      await rejectCompetition(competition.id, reason);
    } catch (err) {
      // Error is handled by the hook
    }
  };

  const handleOpenChange = (isOpen: boolean) => {
    if (!isOpen) {
      clearState();
      setShowSuccess(false);
      setReason('');
    }
    onOpenChange(isOpen);
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Reject Competition</DialogTitle>
          <DialogDescription>
            Please provide a reason for rejection.
          </DialogDescription>
        </DialogHeader>
        <Textarea
          placeholder="Enter rejection reason..."
          value={reason}
          maxLength={120}
          onChange={(e) => setReason(e.target.value)}
        />        {error && (
          <Alert variant="destructive" className="mt-4">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}
        {showSuccess && (
          <Alert className="mb-4 border-green-200 bg-green-50 text-green-900">
            <CheckCircle className="h-4 w-4 text-green-600" />
            <AlertTitle>Competition Rejected!</AlertTitle>
          </Alert>
        )}        <DialogFooter>
          <Button variant="outline" onClick={() => handleOpenChange(false)} disabled={loading}>
            Cancel
          </Button>
          <Button
            variant="destructive"
            onClick={handleReject}
            disabled={!reason.trim() || loading}
          >
            {loading ? 'Rejecting...' : 'Reject'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
