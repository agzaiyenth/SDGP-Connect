'use client';

import { useState, useEffect } from 'react';
import { PendingProjectsTable } from '@/components/tables/PendingProjectsTable';
import { ApprovedProjectsTable } from '@/components/tables/ApprovedProjectsTable';
import { RejectedProjectsTable } from '@/components/tables/RejectedProjectsTable';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import ApproveDialog from '@/components/dialogs/ApproveDialog';
import RejectDialog from '@/components/dialogs/RejectDialog';
import DetailsDialog from '@/components/dialogs/DetailsDialog';
import { useGetProjectsByApprovalStatus } from '@/hooks/project/useGetProjectsByApprovalStatus';
import { ProjectApprovalStatus } from '@prisma/client';
import { PendingProject, ApprovedProject, RejectedProject } from '@/types/project/response';

import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import { EmptyState } from '@/components/ui/empty-state';
import { FileX2, AlertCircle, Inbox } from 'lucide-react';
import { LoadingSpinner } from '@/components/ui/loading-spinner';

const projectStatuses = ['IDEA', 'MVP', 'DEPLOYED', 'STARTUP'];

export default function ProjectManagement() {
  const [selectedProjects, setSelectedProjects] = useState<number[]>([]);
  const [approveDialog, setApproveDialog] = useState(false);
  const [rejectDialog, setRejectDialog] = useState(false);
  const [detailsDialog, setDetailsDialog] = useState(false);
  const [currentProject, setCurrentProject] = useState<any>(null);
  const [currentTab, setCurrentTab] = useState<'pending' | 'approved' | 'rejected'>('pending');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const {
    projects: pendingProjects,
    isLoading: isPendingLoading,
    error: pendingError,
    isEmpty: isPendingEmpty,
    refresh: refreshPending,
  } = useGetProjectsByApprovalStatus<PendingProject>(ProjectApprovalStatus.PENDING);

  const {
    projects: approvedProjects,
    isLoading: isApprovedLoading,
    error: approvedError,
    isEmpty: isApprovedEmpty,
  } = useGetProjectsByApprovalStatus<ApprovedProject>(ProjectApprovalStatus.APPROVED);

  const {
    projects: rejectedProjects,
    isLoading: isRejectedLoading,
    error: rejectedError,
    isEmpty: isRejectedEmpty,
  } = useGetProjectsByApprovalStatus<RejectedProject>(ProjectApprovalStatus.REJECTED);

  // Reset selected projects when changing tabs
  useEffect(() => {
    setSelectedProjects([]);
  }, [currentTab]);

  const handleSelectProject = (projectId: number) => {
    setSelectedProjects(prev => {
      if (prev.includes(projectId)) {
        return prev.filter(id => id !== projectId);
      }
      return [...prev, projectId];
    });
  };

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedProjects(pendingProjects.map(project => project.id));
    } else {
      setSelectedProjects([]);
    }
  };

  const handleApprove = (project: PendingProject) => {
    setCurrentProject(project);
    setApproveDialog(true);
  };

  const handleReject = (project: PendingProject) => {
    setCurrentProject(project);
    setRejectDialog(true);
  };

  const handleViewDetails = (project: any) => {
    setCurrentProject(project);
    setDetailsDialog(true);
  };

  const handleToggleFeature = async (project: ApprovedProject, featured: boolean) => {
    // Feature toggle logic will be implemented later
    console.log('Toggle feature for project:', project.id, featured);
  };

  const handleTabChange = (value: string) => {
    setCurrentTab(value as 'pending' | 'approved' | 'rejected');
  };

  const fetchNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(prev => prev + 1);
    }
  };

  const fetchPreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(prev => prev - 1);
    }
  };

  const renderError = (error: Error | null) => {
    if (!error) return null;
    return (
      <Alert variant="destructive" className="mb-4">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>{error.message}</AlertDescription>
      </Alert>
    );
  };

  const renderEmptyState = (type: 'pending' | 'approved' | 'rejected') => {
    const config = {
      pending: {
        title: 'No Pending Projects',
        description: 'There are no projects waiting for review.',
        icon: Inbox,
      },
      approved: {
        title: 'No Approved Projects',
        description: 'No projects have been approved yet.',
        icon: FileX2,
      },
      rejected: {
        title: 'No Rejected Projects',
        description: 'No projects have been rejected.',
        icon: FileX2,
      },
    }[type];

    return (
      <div className="flex justify-center items-center p-8">
        <EmptyState
          title={config.title}
          description={config.description}
          icons={[config.icon]}
        />
      </div>
    );
  };

  const renderContent = () => {
    if (currentTab === 'pending') {
      if (isPendingLoading) return <LoadingSpinner />;
      if (pendingError) return renderError(pendingError);
      if (isPendingEmpty) return renderEmptyState('pending');
      return (
        <PendingProjectsTable
          projects={pendingProjects}
          selectedProjects={selectedProjects}
          onSelectProject={handleSelectProject}
          onSelectAll={handleSelectAll}
          onViewDetails={handleViewDetails}
          onApprove={handleApprove}
          onReject={handleReject}
          currentPage={currentPage}
          totalPages={totalPages}
          onNextPage={fetchNextPage}
          onPreviousPage={fetchPreviousPage}
        />
      );
    }

    if (currentTab === 'approved') {
      if (isApprovedLoading) return <LoadingSpinner />;
      if (approvedError) return renderError(approvedError);
      if (isApprovedEmpty) return renderEmptyState('approved');
      return (
        <ApprovedProjectsTable
          projects={approvedProjects}
          onViewDetails={handleViewDetails}
          onToggleFeature={handleToggleFeature}
          currentPage={currentPage}
          totalPages={totalPages}
          onNextPage={fetchNextPage}
          onPreviousPage={fetchPreviousPage}
        />
      );
    }

    if (currentTab === 'rejected') {
      if (isRejectedLoading) return <LoadingSpinner />;
      if (rejectedError) return renderError(rejectedError);
      if (isRejectedEmpty) return renderEmptyState('rejected');
      return (
        <RejectedProjectsTable
          projects={rejectedProjects}
          onViewDetails={handleViewDetails}
          currentPage={currentPage}
          totalPages={totalPages}
          onNextPage={fetchNextPage}
          onPreviousPage={fetchPreviousPage}
        />
      );
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Project Management</h1>
        <p className="text-muted-foreground">Review and manage project submissions</p>
      </div>

      <Tabs defaultValue="pending" onValueChange={handleTabChange}>
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
                Approve Selected ({selectedProjects.length})
              </Button>
              <Button variant="destructive" onClick={() => setRejectDialog(true)}>
                Reject Selected ({selectedProjects.length})
              </Button>
            </div>
          )}
        </div>

        {renderContent()}
      </Tabs>

      {detailsDialog && currentProject && (
        <DetailsDialog
          open={detailsDialog}
          onOpenChange={setDetailsDialog}
          projectID={currentProject.id}
        />
      )}

      {approveDialog && currentProject && (
        <ApproveDialog
          open={approveDialog}
          onOpenChange={setApproveDialog}
          project={currentProject}
          onApproved={refreshPending}
        />
      )}

      {rejectDialog && currentProject && (
        <RejectDialog
          open={rejectDialog}
          onOpenChange={setRejectDialog}
          project={currentProject}
          onRejected={refreshPending}
        />
      )}
    </div>
  );
}