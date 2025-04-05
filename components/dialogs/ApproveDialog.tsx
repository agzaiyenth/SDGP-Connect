import { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { useApproveAndFeatured } from '@/hooks/project/useApproveAndFeatured';
import { LoadingSpinner } from '@/components/ui/loading-spinner';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { AlertCircle } from 'lucide-react';
import { format } from 'date-fns';

interface ApproveDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  projectID: string;
  onApproved: () => void;
}

const ApproveDialog = ({ open, onOpenChange, projectID, onApproved }: ApproveDialogProps) => {
  const [featured, setFeatured] = useState(false);
  const [conflictInfo, setConflictInfo] = useState<any>(null);
  
  const { approveProject, isLoading, error } = useApproveAndFeatured({
    onSuccess: () => {
      onApproved(); // Always refresh the list on any result
      if (!conflictInfo) { // Close dialog only if no conflict occurred
        onOpenChange(false);
      }
    },
    onAlreadyApproved: (data) => {
      setConflictInfo(data);
    },
    onError: () => {
      // Keep dialog open on general errors, but still refresh the list
      onApproved();
    }
  });

  const handleApprove = async () => {
    await approveProject(projectID, featured);
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
        
        {error && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{error.message}</AlertDescription>
          </Alert>
        )}
        
        {conflictInfo && (
          <Alert >
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Already Approved</AlertTitle>
            <AlertDescription>
              This project was already approved
              {conflictInfo.approvedAt && ` on ${format(new Date(conflictInfo.approvedAt), 'MMM dd, yyyy HH:mm')}`}
              {conflictInfo.approvedBy && ` by another user (ID: ${conflictInfo.approvedBy})`}.
            </AlertDescription>
          </Alert>
        )}
        
        <div className="flex items-center space-x-2">
          <Switch 
            id="featured" 
            checked={featured} 
            onCheckedChange={setFeatured}
            disabled={isLoading || !!conflictInfo}
          />
          <label htmlFor="featured">Feature this project</label>
        </div>
        
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)} disabled={isLoading}>
            {conflictInfo ? 'Close' : 'Cancel'}
          </Button>
          {!conflictInfo && (
            <Button onClick={handleApprove} disabled={isLoading}>
              {isLoading ? <LoadingSpinner  /> : null}
              {isLoading ? 'Approving...' : 'Approve'}
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ApproveDialog;