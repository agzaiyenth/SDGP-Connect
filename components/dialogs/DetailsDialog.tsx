/* Copyright (c) 2025, the contributors of the SDGP Connect project. All Rights Reserved.

This software is the joint property of the contributors to the SDGP Connect project.
Unauthorized distribution, commercial use, or reproduction of any part of this material
in any form is strictly prohibited without the explicit written consent of all contributors.
You may not alter or remove any copyright or attribution notice from this content. */

import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import ProjectDetails from '../ProjectDetails';
import { ScrollArea } from '../ui/scroll-area';

const DetailsDialog = ({ open, onOpenChange, projectID }: { open: boolean; onOpenChange: (open: boolean) => void; projectID: any }) => (
  <Dialog open={open} onOpenChange={onOpenChange}>
    <DialogContent className="!w-auto !max-w-none md:min-w-[800px] md:max-w-[90vw]">
      <DialogHeader>
        <DialogTitle>Project Details</DialogTitle>
      </DialogHeader>
      <ScrollArea className="h-[70vh]">
        {projectID && <ProjectDetails projectID={projectID} />}
      </ScrollArea>
      <DialogFooter>
        <Button variant="outline" onClick={() => onOpenChange(false)}>
          Close
        </Button>
      </DialogFooter>
    </DialogContent>
  </Dialog>
);

export default DetailsDialog;