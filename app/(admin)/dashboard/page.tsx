"use client";

import RecentActivityTable from '@/components/dashboard/RecentActivityTable';
import StatCard from '@/components/dashboard/StatCard';
import StatusPieChart from '@/components/dashboard/StatusPieChart';
import SubmissionsLineChart from '@/components/dashboard/SubmissionsLineChart';
import { LoadingSpinner } from '@/components/ui/loading-spinner';
import useGetTotalProjectsCount from '@/hooks/dashboard/useGetTotalProjectsCount';
import useGetFeaturedProjectsCount from '@/hooks/dashboard/useGetFeaturedProjectsCount';
import useGetPendingProjectsCount from '@/hooks/dashboard/useGetPendingProjectsCount';
import { Clock, Folder, Star } from 'lucide-react';
import useGetActivity from '@/hooks/dashboard/useGetActivity';

export default function DashboardPage() {
  // Fetch real data using custom hooks
  const { count: totalCount, isLoading: isTotalLoading } = useGetTotalProjectsCount();
  const { count: featuredCount, isLoading: isFeaturedLoading } = useGetFeaturedProjectsCount();
  const { count: pendingCount, isLoading: isPendingLoading } = useGetPendingProjectsCount();
  
  // Stats card data
  const stats = [
    {
      title: 'Total Projects',
      value: isTotalLoading ? <LoadingSpinner /> : totalCount?.toString() || '0',
      icon: <Folder className="h-5 w-5" />,
      isLoading: isTotalLoading
    },
    {
      title: 'Featured Projects',
      value: isFeaturedLoading ? <LoadingSpinner /> : featuredCount?.toString() || '0',
      icon: <Star className="h-5 w-5" />,
      isLoading: isFeaturedLoading
    },
    {
      title: 'Pending Review',
      value: isPendingLoading ? <LoadingSpinner /> : pendingCount?.toString() || '0',
      icon: <Clock className="h-5 w-5" />,
      isLoading: isPendingLoading
    },
  ];


  // Sample data for line chart
  const submissionsData = [
    { name: 'Jan', submissions: 65 },
    { name: 'Feb', submissions: 78 },
    { name: 'Mar', submissions: 90 },
    { name: 'Apr', submissions: 81 },
    { name: 'May', submissions: 125 },
    { name: 'Jun', submissions: 156 },
    { name: 'Jul', submissions: 139 },
    { name: 'Aug', submissions: 162 },
  ];
  // Get real activity data using the hook
  const { activities: recentActivities, isLoading: isActivitiesLoading, error: activitiesError } = useGetActivity();

  return (
    <>
      <div className="mb-8 animate-fade-in">
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground mt-2">Welcome back! Here's an overview of your platform.</p>
      </div>
      
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {stats.map((stat, index) => (
          <StatCard
            key={index}
            title={stat.title}
            value={stat.value}
            icon={stat.icon}
            className="animate-fade-in"
            style={{ animationDelay: `${index * 100}ms` }}
          />
        ))}
      </div>      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <StatusPieChart/>
        <SubmissionsLineChart />
      </div>

      
      {/* Recent Activity Table */}
      <RecentActivityTable activities={recentActivities} />

      
    </>
  );
}
