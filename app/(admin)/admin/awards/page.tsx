// Admin Awards Management Page
/* Copyright (c) 2025, the contributors of the SDGP Connect project. All Rights Reserved.

This software is the joint property of the contributors to the SDGP Connect project.
Unauthorized distribution, commercial use, or reproduction of any part of this material
in any form is strictly prohibited without the explicit written consent of all contributors.
You may not alter or remove any copyright or attribution notice from this content. */

'use client';
import ApprovedAwardsTable from '@/components/tables/ApprovedAwardsTable';
import PendingAwardsTable from '@/components/tables/PendingAwardsTable';
import RejectedAwardsTable from '@/components/tables/RejectedAwardsTable';
import ApprovedAwardsTableSkeleton from '@/components/tables/skeletons/ApprovedAwardsTableSkeleton';
import PendingAwardsTableSkeleton from '@/components/tables/skeletons/PendingAwardsTableSkeleton';
import RejectedAwardsTableSkeleton from '@/components/tables/skeletons/RejectedAwardsTableSkeleton';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { EmptyState } from '@/components/ui/empty-state';
import { Input } from '@/components/ui/input';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useGetAwardsByApprovalStatus } from '@/hooks/awards/useGetAwardsByApprovalStatus';
import { useDebounce } from '@/hooks/use-debounce';
import { AlertCircle, FileX2, Inbox, RefreshCcw } from 'lucide-react';
import { useEffect, useState } from 'react';

export default function AdminAwardsPage() {
  const [currentTab, setCurrentTab] = useState<'pending' | 'approved' | 'rejected'>('pending');
  const [searchQuery, setSearchQuery] = useState('');
  const debouncedSearchQuery = useDebounce(searchQuery, 300);
  const [lastFetchedTime, setLastFetchedTime] = useState('');

  // Hooks for each tab
  const pending = useGetAwardsByApprovalStatus('PENDING', debouncedSearchQuery);
  const approved = useGetAwardsByApprovalStatus('APPROVED', debouncedSearchQuery);
  const rejected = useGetAwardsByApprovalStatus('REJECTED', debouncedSearchQuery);

  useEffect(() => {
    setLastFetchedTime(new Date().toLocaleTimeString());
  }, []);

  const handleTabChange = (value: string) => {
    setCurrentTab(value as any);
    setSearchQuery('');
    if (value === 'pending') pending.refresh();
    if (value === 'approved') approved.refresh();
    if (value === 'rejected') rejected.refresh();
  };

  const handleRefresh = () => {
    if (currentTab === 'pending') pending.refresh();
    if (currentTab === 'approved') approved.refresh();
    if (currentTab === 'rejected') rejected.refresh();
    setLastFetchedTime(new Date().toLocaleTimeString());
  };

  const renderError = (error: any) => {
    if (!error) return null;
    return (
      <Alert variant="destructive" className="mb-4">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>{error.message || error.toString()}</AlertDescription>
      </Alert>
    );
  };

  const renderEmptyState = (type: 'pending' | 'approved' | 'rejected') => {
    const config = {
      pending: {
        title: searchQuery ? 'No Matching Pending Awards' : 'No Pending Awards',
        description: searchQuery
          ? `No pending awards found matching "${searchQuery}"`
          : 'There are no awards waiting for review.',
        icon: searchQuery ? FileX2 : Inbox,
      },
      approved: {
        title: searchQuery ? 'No Matching Approved Awards' : 'No Approved Awards',
        description: searchQuery
          ? `No approved awards found matching "${searchQuery}"`
          : 'No awards have been approved yet.',
        icon: FileX2,
      },
      rejected: {
        title: searchQuery ? 'No Matching Rejected Awards' : 'No Rejected Awards',
        description: searchQuery
          ? `No rejected awards found matching "${searchQuery}"`
          : 'No awards have been rejected.',
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
      if (pending.isLoading) return <PendingAwardsTableSkeleton />;
      if (pending.error) return renderError(pending.error);
      if (pending.isEmpty) return renderEmptyState('pending');
      return (
        <PendingAwardsTable
          awards={pending.awards}
          currentPage={pending.currentPage}
          totalPages={pending.totalPages}
          onNextPage={pending.fetchNextPage}
          onPreviousPage={pending.fetchPreviousPage}
          refresh={pending.refresh}
        />
      );
    }
    if (currentTab === 'approved') {
      if (approved.isLoading) return <ApprovedAwardsTableSkeleton />;
      if (approved.error) return renderError(approved.error);
      if (approved.isEmpty) return renderEmptyState('approved');
      return (
        <ApprovedAwardsTable
          awards={approved.awards}
          currentPage={approved.currentPage}
          totalPages={approved.totalPages}
          onNextPage={approved.fetchNextPage}
          onPreviousPage={approved.fetchPreviousPage}
          refresh={approved.refresh}
        />
      );
    }
    if (currentTab === 'rejected') {
      if (rejected.isLoading) return <RejectedAwardsTableSkeleton />;
      if (rejected.error) return renderError(rejected.error);
      if (rejected.isEmpty) return renderEmptyState('rejected');
      return (
        <RejectedAwardsTable
          awards={rejected.awards}
          currentPage={rejected.currentPage}
          totalPages={rejected.totalPages}
          onNextPage={rejected.fetchNextPage}
          onPreviousPage={rejected.fetchPreviousPage}
          refresh={rejected.refresh}
        />
      );
    }
    return null;
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Awards Management</h1>
      <Tabs defaultValue="pending" value={currentTab} onValueChange={handleTabChange} className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="pending">Pending</TabsTrigger>
          <TabsTrigger value="approved">Approved</TabsTrigger>
          <TabsTrigger value="rejected">Rejected</TabsTrigger>
        </TabsList>
        <div className="my-4 flex flex-wrap gap-4 justify-between">
          <div className="flex items-center gap-2">
            <Input
              placeholder="Search awards..."
              className="max-w-xs"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
            />
            {searchQuery && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setSearchQuery('')}
              >
                Clear
              </Button>
            )}
          </div>
          <div className="flex items-center gap-4">
            <Button variant="outline" onClick={handleRefresh}>
              Last Fetched: {lastFetchedTime}
              <RefreshCcw className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
        {renderContent()}
      </Tabs>
    </div>
  );
}
