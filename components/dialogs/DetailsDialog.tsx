// Copyright (c) 2025, Psycode Lab's (https://www.psycodelabs.lk). All Rights Reserved.
//
// This software is the property of Psycode Lab's. and its suppliers, if any.
// Dissemination of any information or reproduction of any material contained
// herein in any form is strictly forbidden, unless permitted by Psycode Lab's expressly.
// You may not alter or remove any copyright or other notice from copies of this content.
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