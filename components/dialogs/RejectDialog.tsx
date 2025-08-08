/* Copyright (c) 2025, the contributors of the SDGP Connect project. All Rights Reserved.

This software is the joint property of the contributors to the SDGP Connect project.
Unauthorized distribution, commercial use, or reproduction of any part of this material
in any form is strictly prohibited without the explicit written consent of all contributors.
You may not alter or remove any copyright or attribution notice from this content. */

import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { useState } from 'react';
import { useRejectProject } from '@/hooks/project/useRejectProject';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { AlertCircle, Loader2 } from 'lucide-react';

const RejectDialog = ({ open, onOpenChange, project, onRejected }: { open: boolean; onOpenChange: (open: boolean) => void; project: any; onRejected: () => void }) => {
  const [feedback, setFeedback] = useState('');
  const { rejectProject, isLoading, error } = useRejectProject();

  const handleReject = async () => {
    try {
      await rejectProject({
        projectId: project.id,
        reason: feedback
      });
      onRejected();
      onOpenChange(false);
    } catch (error) {
      console.error("Failed to reject project:", error);
    }
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
          maxLength={120}
          onChange={(e) => setFeedback(e.target.value)}
        />        {error && (
          <Alert variant="destructive" className="mt-4">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{error.message}</AlertDescription>
          </Alert>
        )}<DialogDescription>
        You cannot undo a rejected Project.
      </DialogDescription>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)} disabled={isLoading}>
            Cancel
          </Button>
          <Button
            variant="destructive"
            onClick={handleReject}
            disabled={!feedback.trim() || isLoading}
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Rejecting...
              </>
            ) : (
              'Reject'
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default RejectDialog;