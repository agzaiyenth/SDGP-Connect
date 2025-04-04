'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Textarea } from '@/components/ui/textarea';
import { useState } from 'react';

const projectStatuses = ['IDEA', 'MVP', 'DEPLOYED', 'STARTUP'];

const mockProjects = [
  {
    id: 1,
    title: 'Project Alpha',
    groupNumber: 'G01',
    submissionDate: '2024-03-20',
    status: 'IDEA',
    type: 'Web',
    domain: 'Healthcare',
    tech: 'React',
    sdg: 'Quality Education',
    featured: false,
    description: 'A healthcare platform that connects patients with doctors remotely.',
    teamMembers: ['John Doe', 'Jane Smith', 'Bob Johnson'],
    githubUrl: 'https://github.com/project-alpha',
    demoUrl: 'https://project-alpha.demo',
  },
];

const approvedProjects = [
  {
    id: 2,
    title: 'Project Beta',
    groupNumber: 'G02',
    status: 'DEPLOYED',
    featured: true,
    approvedBy: 'Alice Admin',
    approvedAt: '2024-03-15',
    type: 'Mobile',
    domain: 'Education',
    tech: 'React Native',
    sdg: 'Quality Education',
    description: 'A mobile app for personalized learning experiences.',
    teamMembers: ['Sarah Wilson', 'Mike Brown'],
    githubUrl: 'https://github.com/project-beta',
    demoUrl: 'https://project-beta.demo',
  },
];

const rejectedProjects = [
  {
    id: 3,
    title: 'Project Gamma',
    groupNumber: 'G03',
    status: 'MVP',
    rejectedBy: 'Bob Reviewer',
    rejectedAt: '2024-03-18',
    rejectionReason: 'Project scope needs refinement and technical documentation is incomplete.',
    type: 'AI/ML',
    domain: 'Finance',
    tech: 'Python',
    sdg: 'No Poverty',
    description: 'An AI-powered financial advisory system.',
    teamMembers: ['Tom Clark', 'Emma Davis'],
    githubUrl: 'https://github.com/project-gamma',
    demoUrl: 'https://project-gamma.demo',
  },
];

export default function ProjectManagement() {
  const [selectedProjects, setSelectedProjects] = useState<number[]>([]);
  const [approveDialog, setApproveDialog] = useState(false);
  const [rejectDialog, setRejectDialog] = useState(false);
  const [detailsDialog, setDetailsDialog] = useState(false);
  const [feedback, setFeedback] = useState('');
  const [currentProject, setCurrentProject] = useState<any>(null);

  const handleApprove = (project: any) => {
    setCurrentProject(project);
    setApproveDialog(true);
  };

  const handleReject = (project: any) => {
    setCurrentProject(project);
    setRejectDialog(true);
  };

  const handleViewDetails = (project: any) => {
    setCurrentProject(project);
    setDetailsDialog(true);
  };

  const ProjectDetails = ({ project }: { project: any }) => (
    <ScrollArea className="h-[60vh]">
      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-semibold">{project.title}</h3>
          <p className="text-sm text-muted-foreground">Group {project.groupNumber}</p>
        </div>

        <div className="grid gap-4">
          <div>
            <h4 className="font-medium mb-2">Project Status</h4>
            <Badge>{project.status}</Badge>
          </div>

          <div>
            <h4 className="font-medium mb-2">Description</h4>
            <p className="text-sm">{project.description}</p>
          </div>

          <div>
            <h4 className="font-medium mb-2">Team Members</h4>
            <ul className="list-disc list-inside text-sm">
              {project.teamMembers.map((member: string) => (
                <li key={member}>{member}</li>
              ))}
            </ul>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <h4 className="font-medium mb-2">Type</h4>
              <p className="text-sm">{project.type}</p>
            </div>
            <div>
              <h4 className="font-medium mb-2">Domain</h4>
              <p className="text-sm">{project.domain}</p>
            </div>
            <div>
              <h4 className="font-medium mb-2">Technology</h4>
              <p className="text-sm">{project.tech}</p>
            </div>
            <div>
              <h4 className="font-medium mb-2">SDG</h4>
              <p className="text-sm">{project.sdg}</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <h4 className="font-medium mb-2">GitHub Repository</h4>
              <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="text-sm text-blue-600 hover:underline">
                View Repository
              </a>
            </div>
            <div>
              <h4 className="font-medium mb-2">Demo URL</h4>
              <a href={project.demoUrl} target="_blank" rel="noopener noreferrer" className="text-sm text-blue-600 hover:underline">
                View Demo
              </a>
            </div>
          </div>

          {project.approvedBy && (
            <div>
              <h4 className="font-medium mb-2">Approval Details</h4>
              <p className="text-sm">Approved by {project.approvedBy} on {project.approvedAt}</p>
            </div>
          )}

          {project.rejectedBy && (
            <div>
              <h4 className="font-medium mb-2">Rejection Details</h4>
              <p className="text-sm">Rejected by {project.rejectedBy} on {project.rejectedAt}</p>
              <p className="text-sm mt-2">Reason: {project.rejectionReason}</p>
            </div>
          )}
        </div>
      </div>
    </ScrollArea>
  );

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Project Management</h1>
        <p className="text-muted-foreground">Review and manage project submissions</p>
      </div>

      <Tabs defaultValue="pending">
        <TabsList>
          <TabsTrigger value="pending">Pending</TabsTrigger>
          <TabsTrigger value="approved">Approved</TabsTrigger>
          <TabsTrigger value="rejected">Rejected</TabsTrigger>
        </TabsList>

        <div className="my-4 flex flex-wrap gap-4">
          <Input
            placeholder="Search projects..."
            className="max-w-xs"
          />
          <Select>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              {projectStatuses.map(status => (
                <SelectItem key={status} value={status}>{status}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          {selectedProjects.length > 0 && (
            <div className="flex gap-2">
              <Button onClick={() => setApproveDialog(true)}>
                Approve Selected
              </Button>
              <Button variant="destructive" onClick={() => setRejectDialog(true)}>
                Reject Selected
              </Button>
            </div>
          )}
        </div>

        <TabsContent value="pending">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-12">
                  <Checkbox
                    checked={selectedProjects.length === mockProjects.length}
                    onCheckedChange={(checked) => {
                      if (checked) {
                        setSelectedProjects(mockProjects.map(p => p.id));
                      } else {
                        setSelectedProjects([]);
                      }
                    }}
                  />
                </TableHead>
                <TableHead>Title</TableHead>
                <TableHead>Group</TableHead>
                <TableHead>Submission Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockProjects.map((project) => (
                <TableRow key={project.id}>
                  <TableCell>
                    <Checkbox
                      checked={selectedProjects.includes(project.id)}
                      onCheckedChange={(checked) => {
                        if (checked) {
                          setSelectedProjects([...selectedProjects, project.id]);
                        } else {
                          setSelectedProjects(selectedProjects.filter(id => id !== project.id));
                        }
                      }}
                    />
                  </TableCell>
                  <TableCell>{project.title}</TableCell>
                  <TableCell>{project.groupNumber}</TableCell>
                  <TableCell>{project.submissionDate}</TableCell>
                  <TableCell>
                    <Badge>{project.status}</Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button size="sm" onClick={() => handleViewDetails(project)}>
                        View
                      </Button>
                      <Button size="sm" onClick={() => handleApprove(project)}>
                        Approve
                      </Button>
                      <Button
                        size="sm"
                        variant="destructive"
                        onClick={() => handleReject(project)}
                      >
                        Reject
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TabsContent>

        <TabsContent value="approved">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Title</TableHead>
                <TableHead>Group</TableHead>
                <TableHead>Featured</TableHead>
                <TableHead>Approved By</TableHead>
                <TableHead>Approved At</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {approvedProjects.map((project) => (
                <TableRow key={project.id}>
                  <TableCell>{project.title}</TableCell>
                  <TableCell>{project.groupNumber}</TableCell>
                  <TableCell>
                    <Switch
                      checked={project.featured}
                      onCheckedChange={(checked) => {
                        // Handle feature toggle
                        project.featured = checked;
                      }}
                    />
                  </TableCell>
                  <TableCell>{project.approvedBy}</TableCell>
                  <TableCell>{project.approvedAt}</TableCell>
                  <TableCell>
                    <Button size="sm" onClick={() => handleViewDetails(project)}>
                      View Details
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TabsContent>

        <TabsContent value="rejected">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Title</TableHead>
                <TableHead>Group</TableHead>
                <TableHead>Rejected By</TableHead>
                <TableHead>Rejected At</TableHead>
                <TableHead>Reason</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {rejectedProjects.map((project) => (
                <TableRow key={project.id}>
                  <TableCell>{project.title}</TableCell>
                  <TableCell>{project.groupNumber}</TableCell>
                  <TableCell>{project.rejectedBy}</TableCell>
                  <TableCell>{project.rejectedAt}</TableCell>
                  <TableCell className="max-w-xs truncate">{project.rejectionReason}</TableCell>
                  <TableCell>
                    <Button size="sm" onClick={() => handleViewDetails(project)}>
                      View Details
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TabsContent>
      </Tabs>

      {/* Project Details Dialog */}
      <Dialog open={detailsDialog} onOpenChange={setDetailsDialog}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>Project Details</DialogTitle>
          </DialogHeader>
          {currentProject && <ProjectDetails project={currentProject} />}
          <DialogFooter>
            <Button variant="outline" onClick={() => setDetailsDialog(false)}>
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Approve Dialog */}
      <Dialog open={approveDialog} onOpenChange={setApproveDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Approve Project</DialogTitle>
            <DialogDescription>
              Are you sure you want to approve this project?
            </DialogDescription>
          </DialogHeader>
          <div className="flex items-center space-x-2">
            <Switch id="featured" />
            <label htmlFor="featured">Feature this project</label>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setApproveDialog(false)}>
              Cancel
            </Button>
            <Button onClick={() => setApproveDialog(false)}>
              Approve
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Reject Dialog */}
      <Dialog open={rejectDialog} onOpenChange={setRejectDialog}>
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
            <Button variant="outline" onClick={() => setRejectDialog(false)}>
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={() => setRejectDialog(false)}
              disabled={!feedback.trim()}
            >
              Reject
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}