'use client';

import { useState } from 'react';
import { PendingProjectsTable } from '@/components/dashboard/PendingProjectsTable';
import { ApprovedProjectsTable } from '@/components/dashboard/ApprovedProjectsTable';
import { RejectedProjectsTable } from '@/components/dashboard/RejectedProjectsTable';
import ProjectDetails from '@/components/ProjectDetails';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Textarea } from '@/components/ui/textarea';

const projectStatuses = ['IDEA', 'MVP', 'DEPLOYED', 'STARTUP'];

// Using the same mock data as before
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

  const handleSelectProject = (projectId: number) => {
    setSelectedProjects(prev => 
      prev.includes(projectId) 
        ? prev.filter(id => id !== projectId)
        : [...prev, projectId]
    );
  };

  const handleSelectAll = (checked: boolean) => {
    setSelectedProjects(checked ? mockProjects.map(p => p.id) : []);
  };

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

  const handleToggleFeature = (project: any, featured: boolean) => {
    // Handle toggling feature state
    console.log('Toggle feature for project:', project.id, featured);
  };

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
          <PendingProjectsTable
            projects={mockProjects}
            selectedProjects={selectedProjects}
            onSelectProject={handleSelectProject}
            onSelectAll={handleSelectAll}
            onViewDetails={handleViewDetails}
            onApprove={handleApprove}
            onReject={handleReject}
          />
        </TabsContent>

        <TabsContent value="approved">
          <ApprovedProjectsTable
            projects={approvedProjects}
            onViewDetails={handleViewDetails}
            onToggleFeature={handleToggleFeature}
          />
        </TabsContent>

        <TabsContent value="rejected">
          <RejectedProjectsTable
            projects={rejectedProjects}
            onViewDetails={handleViewDetails}
          />
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