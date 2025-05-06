'use client';

import ApproveDialog from '@/components/dialogs/ApproveDialog';
import DetailsDialog from '@/components/dialogs/DetailsDialog';
import RejectDialog from '@/components/dialogs/RejectDialog';
import { ApprovedProjectsTable } from '@/components/tables/ApprovedProjectsTable';
import { PendingProjectsTable } from '@/components/tables/PendingProjectsTable';
import { RejectedProjectsTable } from '@/components/tables/RejectedProjectsTable';
import PendingProjectsTableSkeleton from '@/components/tables/skeletons/PendingProjectsTableSkeleton';
import ApprovedProjectsTableSkeleton from '@/components/tables/skeletons/ApprovedProjectsTableSkeleton';
import RejectedProjectsTableSkeleton from '@/components/tables/skeletons/RejectedProjectsTableSkeleton';
import { Input } from '@/components/ui/input';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useGetProjectsByApprovalStatus } from '@/hooks/project/useGetProjectsByApprovalStatus';
import { useToggleProjectFeature } from '@/hooks/project/useToggleProjectFeature';
import { ApprovedProject, PendingProject, RejectedProject } from '@/types/project/response';
import { ProjectApprovalStatus } from '@prisma/client';
import { useEffect, useState } from 'react';

import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { EmptyState } from '@/components/ui/empty-state';
import { AlertCircle, FileX2, Inbox, RefreshCcw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import BulkApproveDialog from '@/components/dialogs/BulkApproveDialog';

const projectStatuses = ['IDEA', 'MVP', 'DEPLOYED', 'STARTUP'];

export default function ProjectManagement() {
  const [selectedProjects, setSelectedProjects] = useState<number[]>([]);
  const [approveDialog, setApproveDialog] = useState(false);
  const [rejectDialog, setRejectDialog] = useState(false);
  const [detailsDialog, setDetailsDialog] = useState(false);
  const [bulkApproveDialog, setBulkApproveDialog] = useState(false);
  const [currentProject, setCurrentProject] = useState<any>(null);
  const [currentTab, setCurrentTab] = useState<'pending' | 'approved' | 'rejected'>('pending');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [lastFetchedTime, setLastFetchedTime] = useState<string>('');

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
    refresh: refreshApproved,
  } = useGetProjectsByApprovalStatus<ApprovedProject>(ProjectApprovalStatus.APPROVED);

  const {
    projects: rejectedProjects,
    isLoading: isRejectedLoading,
    error: rejectedError,
    isEmpty: isRejectedEmpty,
    refresh: refreshRejected,
  } = useGetProjectsByApprovalStatus<RejectedProject>(ProjectApprovalStatus.REJECTED);
  // Reset selected projects when changing tabs
  useEffect(() => {
    setSelectedProjects([]);
  }, [currentTab]);

  // Initialize lastFetchedTime on client-side only
  useEffect(() => {
    setLastFetchedTime(new Date().toLocaleTimeString());
  }, []);

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

  const handleReject = (project: PendingProject | ApprovedProject) => {
    setCurrentProject(project);
    setRejectDialog(true);
  };


  const handleViewDetails = (project: any) => {
    setCurrentProject(project);
    setDetailsDialog(true);
  };
  const { toggleFeature, isLoading: isFeatureToggling } = useToggleProjectFeature({
    onSuccess: () => refreshApproved()
  });

  const handleToggleFeature = async (project: ApprovedProject, featured: boolean) => {
    await toggleFeature(project.id, featured);
  };

  const handleTabChange = (value: string) => {
    setCurrentTab(value as 'pending' | 'approved' | 'rejected');
    if (value === 'pending') refreshPending();
    if (value === 'approved') refreshApproved();
    if (value === 'rejected') refreshRejected();
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
      if (isPendingLoading) return <PendingProjectsTableSkeleton />;
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
      if (isApprovedLoading) return <ApprovedProjectsTableSkeleton />;
      if (approvedError) return renderError(approvedError);
      if (isApprovedEmpty) return renderEmptyState('approved');
      return (
        <ApprovedProjectsTable
          projects={approvedProjects}
          onViewDetails={handleViewDetails}
          onToggleFeature={handleToggleFeature}
          onReject={handleReject}
          currentPage={currentPage}
          totalPages={totalPages}
          onNextPage={fetchNextPage}
          onPreviousPage={fetchPreviousPage}
        />

      );
    }

    if (currentTab === 'rejected') {
      if (isRejectedLoading) return <RejectedProjectsTableSkeleton />;
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

      <Tabs defaultValue="pending" onValueChange={handleTabChange} value={currentTab}>
        <TabsList>
          <TabsTrigger value="pending">Pending</TabsTrigger>
          <TabsTrigger value="approved">Approved</TabsTrigger>
          <TabsTrigger value="rejected">Rejected</TabsTrigger>
        </TabsList>
        <div className="my-4 flex flex-wrap gap-4 justify-between">
          <Input
            placeholder="Search projects..."
            className="max-w-xs"
          />
          <div className="flex items-center gap-4">
            <Button
              variant="outline"
              onClick={() => {
                if (currentTab === 'pending') refreshPending();
                if (currentTab === 'approved') refreshApproved();
                if (currentTab === 'rejected') refreshRejected();
                setLastFetchedTime(new Date().toLocaleTimeString());
              }}
            >Last Fetched: {lastFetchedTime}
              <RefreshCcw />
            </Button>

            {currentTab === 'pending' && selectedProjects.length > 0 && (
              <Button
                onClick={() => setBulkApproveDialog(true)}
                variant="default"
              >
                Approve All ({selectedProjects.length})
              </Button>
            )}
          </div>

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
          projectID={currentProject.id}
          onApproved={refreshPending}
        />
      )}      {rejectDialog && currentProject && (
        <RejectDialog
          open={rejectDialog}
          onOpenChange={setRejectDialog}
          project={currentProject}
          onRejected={() => {
            refreshPending();
            refreshApproved(); 
          }}
        />

      )}

      {bulkApproveDialog && selectedProjects.length > 0 && (
        <BulkApproveDialog
          open={bulkApproveDialog}
          onOpenChange={setBulkApproveDialog}
          projectIds={selectedProjects}
          onApproved={refreshPending}
        />
      )}
    </div>
  );
}