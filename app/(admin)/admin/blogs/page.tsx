/* Copyright (c) 2025, the contributors of the SDGP Connect project. All Rights Reserved.

This software is the joint property of the contributors to the SDGP Connect project.
Unauthorized distribution, commercial use, or reproduction of any part of this material
in any form is strictly prohibited without the explicit written consent of all contributors.
You may not alter or remove any copyright or attribution notice from this content. */

'use client';

import ApproveBlogDialog from '@/components/dialogs/ApproveBlogDialog';
import BlogDetailsDialog from '@/components/dialogs/BlogDetailsDialog';
import BulkApproveBlogDialog from '@/components/dialogs/BulkApproveBlogDialog';
import RejectBlogDialog from '@/components/dialogs/RejectBlogDialog';
import { EmptyApprovedBlogs, EmptyBlogSearch, EmptyPendingBlogs, EmptyRejectedBlogs } from '@/components/Empty-states/blogEmptyStates';
import { ApprovedBlogsTable } from '@/components/tables/ApprovedBlogsTable';
import { PendingBlogsTable } from '@/components/tables/PendingBlogsTable';
import { RejectedBlogsTable } from '@/components/tables/RejectedBlogsTable';
import ApprovedBlogsTableSkeleton from '@/components/tables/skeletons/ApprovedBlogsTableSkeleton';
import PendingBlogsTableSkeleton from '@/components/tables/skeletons/PendingBlogsTableSkeleton';
import RejectedBlogsTableSkeleton from '@/components/tables/skeletons/RejectedBlogsTableSkeleton';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useBlogActions } from '@/hooks/blogs/useBlogActions';
import { useGetBlogsByStatus } from '@/hooks/blogs/useGetBlogsByStatus';
import { useGetBlogStats } from '@/hooks/blogs/useGetBlogStats';
import { useDebounce } from '@/hooks/use-debounce';
import { AdminBlogPost, ApprovedBlogPost, BlogStatus, PendingBlogPost, RejectedBlogPost } from '@/types/blog/admin';
import { AlertCircle, BookOpen, CheckCircle, Clock, RefreshCcw, Star } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';
import { toast } from 'sonner';

export default function BlogManagement() {
  const router = useRouter();
  const [selectedBlogs, setSelectedBlogs] = useState<string[]>([]);
  const [approveDialog, setApproveDialog] = useState(false);
  const [rejectDialog, setRejectDialog] = useState(false);
  const [bulkApproveDialog, setBulkApproveDialog] = useState(false);
  const [detailsDialog, setDetailsDialog] = useState(false);
  const [currentBlog, setCurrentBlog] = useState<AdminBlogPost | null>(null);
  const [currentTab, setCurrentTab] = useState<BlogStatus>('pending');
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  // Debounce search query to avoid too many API calls
  const debouncedSearchQuery = useDebounce(searchQuery, 500);

  // Fetch blogs data
  const {
    blogs,
    total,
    page,
    totalPages,
    isLoading: isBlogsLoading,
    error: blogsError,
    refetch: refetchBlogs,
  } = useGetBlogsByStatus({
    status: currentTab,
    page: currentPage,
    limit: 10,
    search: debouncedSearchQuery,
  });

  // Fetch stats
  const {
    stats,
    isLoading: isStatsLoading,
    error: statsError,
    refetch: refetchStats,
  } = useGetBlogStats();

  // Blog actions hook
  const { featureBlog, unfeatureBlog } = useBlogActions({
    onSuccess: () => {
      refetchBlogs();
      refetchStats();
      toast.success('Blog updated successfully!');
    },
  });

  // Reset search and page when tab changes
  useEffect(() => {
    setSearchQuery('');
    setCurrentPage(1);
    setSelectedBlogs([]);
  }, [currentTab]);

  // Reset page when search changes
  useEffect(() => {
    setCurrentPage(1);
  }, [debouncedSearchQuery]);

  // Handle dialog actions
  const handleApprove = (blog: AdminBlogPost) => {
    setCurrentBlog(blog);
    setApproveDialog(true);
  };

  const handleReject = (blog: AdminBlogPost) => {
    setCurrentBlog(blog);
    setRejectDialog(true);
  };
  const handleViewDetails = (blog: AdminBlogPost) => {
    setCurrentBlog(blog);
    setDetailsDialog(true);
  };

  const handleBulkApprove = () => {
    if (selectedBlogs.length === 0) return;
    setBulkApproveDialog(true);
  }; const handleToggleFeature = async (blog: ApprovedBlogPost) => {
    try {
      if (blog.featured) {
        await unfeatureBlog(blog.id);
      } else {
        await featureBlog(blog.id);
      }
    } catch (error) {
      console.error('Error toggling featured status:', error);
    }
  };

  const handleToggleFeatureFromDetails = async (blog: AdminBlogPost) => {
    if (blog.approved) {
      await handleToggleFeature(blog as ApprovedBlogPost);
    }
  };

  // Selection handlers
  const handleSelectBlog = (blogId: string) => {
    setSelectedBlogs(prev =>
      prev.includes(blogId)
        ? prev.filter(id => id !== blogId)
        : [...prev, blogId]
    );
  };

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedBlogs(blogs.map(blog => blog.id));
    } else {
      setSelectedBlogs([]);
    }
  };

  // Pagination handlers
  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(prev => prev + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(prev => prev - 1);
    }
  };

  // Success handlers for dialogs
  const handleSuccess = useCallback(() => {
    refetchBlogs();
    refetchStats();
    setSelectedBlogs([]);
  }, [refetchBlogs, refetchStats]);

  // Stats cards data
  const statsCards = [
    {
      title: 'Total Blog Posts',
      value: stats?.total || 0,
      icon: BookOpen,
      isLoading: isStatsLoading,
    },
    {
      title: 'Pending Review',
      value: stats?.pending || 0,
      icon: Clock,
      isLoading: isStatsLoading,
    },
    {
      title: 'Approved',
      value: stats?.approved || 0,
      icon: CheckCircle,
      isLoading: isStatsLoading,
    },
    {
      title: 'Featured',
      value: stats?.featured || 0,
      icon: Star,
      isLoading: isStatsLoading,
    },
  ];

  // Render empty state
  const renderEmptyState = () => {
    if (debouncedSearchQuery) {
      return <EmptyBlogSearch />;
    }

    switch (currentTab) {
      case 'pending':
        return <EmptyPendingBlogs />;
      case 'approved':
        return <EmptyApprovedBlogs />;
      case 'rejected':
        return <EmptyRejectedBlogs />;
      default:
        return <EmptyPendingBlogs />;
    }
  };

  // Render table based on current tab
  const renderTable = () => {
    if (isBlogsLoading) {
      switch (currentTab) {
        case 'pending':
          return <PendingBlogsTableSkeleton />;
        case 'approved':
          return <ApprovedBlogsTableSkeleton />;
        case 'rejected':
          return <RejectedBlogsTableSkeleton />;
        default:
          return <PendingBlogsTableSkeleton />;
      }
    } if (blogs.length === 0) {
      return (
        <div className="flex justify-center items-center min-h-[400px] p-8">
          {renderEmptyState()}
        </div>
      );
    }

    switch (currentTab) {
      case 'pending':
        return (
          <PendingBlogsTable
            blogs={blogs as PendingBlogPost[]}
            selectedBlogs={selectedBlogs}
            onSelectBlog={handleSelectBlog}
            onSelectAll={handleSelectAll}
            onViewDetails={handleViewDetails}
            onApprove={handleApprove}
            onReject={handleReject}
            currentPage={currentPage}
            totalPages={totalPages}
            onNextPage={handleNextPage}
            onPreviousPage={handlePreviousPage}
          />
        );
      case 'approved':
        return (
          <ApprovedBlogsTable
            blogs={blogs as ApprovedBlogPost[]}
            selectedBlogs={selectedBlogs}
            onSelectBlog={handleSelectBlog}
            onSelectAll={handleSelectAll}
            onViewDetails={handleViewDetails}
            onToggleFeature={handleToggleFeature}
            currentPage={currentPage}
            totalPages={totalPages}
            onNextPage={handleNextPage}
            onPreviousPage={handlePreviousPage}
          />
        );
      case 'rejected':
        return (
          <RejectedBlogsTable
            blogs={blogs as RejectedBlogPost[]}
            selectedBlogs={selectedBlogs}
            onSelectBlog={handleSelectBlog}
            onSelectAll={handleSelectAll}
            onViewDetails={handleViewDetails}
            onReapprove={handleApprove}
            currentPage={currentPage}
            totalPages={totalPages}
            onNextPage={handleNextPage}
            onPreviousPage={handlePreviousPage}
          />
        );
      default:
        return <PendingBlogsTableSkeleton />;
    }
  };

  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Blog Management</h1>
          <p className="text-muted-foreground">
            Manage and moderate blog posts submitted by authors
          </p>
        </div>
        <Button variant="outline" onClick={() => { refetchBlogs(); refetchStats(); }}>
          <RefreshCcw className="mr-2 h-4 w-4" />
          Refresh
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {statsCards.map((stat, index) => (
          <Card key={index}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {stat.title}
              </CardTitle>
              <stat.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {stat.isLoading ? '...' : stat.value.toLocaleString()}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Error Alerts */}
      {(blogsError || statsError) && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>
            {blogsError || statsError}. Please try refreshing the page.
          </AlertDescription>
        </Alert>
      )}

      {/* Controls */}
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <div className="flex gap-4 items-center">
          <Tabs value={currentTab} onValueChange={(value) => setCurrentTab(value as BlogStatus)}>
            <TabsList>
              <TabsTrigger value="pending">
                Pending {stats?.pending ? `(${stats.pending})` : ''}
              </TabsTrigger>
              <TabsTrigger value="approved">
                Approved {stats?.approved ? `(${stats.approved})` : ''}
              </TabsTrigger>
              <TabsTrigger value="rejected">
                Rejected {stats?.rejected ? `(${stats.rejected})` : ''}
              </TabsTrigger>
            </TabsList>
          </Tabs>

          {currentTab === 'pending' && selectedBlogs.length > 0 && (
            <Button onClick={handleBulkApprove} size="sm">
              Approve Selected ({selectedBlogs.length})
            </Button>
          )}
        </div>

        <div className="flex gap-2 items-center">
          <Input
            placeholder="Search blogs..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-64"
          />
        </div>
      </div>      {/* Table */}
      <Card>
        <CardContent className="p-0 min-h-[500px]">
          {renderTable()}
        </CardContent>
      </Card>{/* Dialogs */}
      <ApproveBlogDialog
        open={approveDialog}
        onOpenChange={setApproveDialog}
        blog={currentBlog}
        onApproved={handleSuccess}
      />

      <RejectBlogDialog
        open={rejectDialog}
        onOpenChange={setRejectDialog}
        blog={currentBlog}
        onRejected={handleSuccess}
      />

      <BulkApproveBlogDialog
        open={bulkApproveDialog}
        onOpenChange={setBulkApproveDialog}
        blogIds={selectedBlogs}
        onApproved={handleSuccess}
      />      <BlogDetailsDialog
        open={detailsDialog}
        onOpenChange={setDetailsDialog}
        blog={currentBlog}
        onApprove={handleApprove}
        onReject={handleReject}
        onToggleFeature={handleToggleFeatureFromDetails}
      />
    </div>
  );
}
