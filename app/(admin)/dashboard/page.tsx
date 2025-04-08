"use client"

import { useSession, signOut } from "next-auth/react"
import { useRouter } from "next/navigation"
import { useEffect } from "react"
import React, { Suspense } from 'react';
import StatCard from '@/components/dashboard/StatCard';
import StatusPieChart from '@/components/dashboard/StatusPieChart';
import SubmissionsLineChart from '@/components/dashboard/SubmissionsLineChart';
import RecentActivityTable from '@/components/dashboard/RecentActivityTable';
import { Folder, Clock, Star } from 'lucide-react';

import { DashboardHeader } from '@/components/dashboard/header';
import { DashboardStats } from '@/components/dashboard/stats';
import { RecentActivity } from '@/components/dashboard/recent-activity';
import { AnalyticsCharts } from '@/components/dashboard/analytics';

export default function DashboardPage() {
  const { data: session, status } = useSession()
  const router = useRouter()

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login")
    }
  }, [status, router])

  if (status === "loading") {
    return (
      <div className="flex h-screen items-center justify-center">
        <p>Loading session...</p>
      </div>
    )
  }
  // Sample data for statistics
  const stats = [
    {
      title: 'Total Projects',
      value: '1,258',
      icon: <Folder className="h-5 w-5" />,
      trend: { value: 12, isPositive: true }
    },
    {
      title: 'Featured Projects',
      value: '83',
      icon: <Star className="h-5 w-5" />,
      trend: { value: 8, isPositive: true }
    },
    {
      title: 'Pending Review',
      value: '35',
      icon: <Clock className="h-5 w-5" />,
      trend: { value: 3, isPositive: false }
    },
  ];

  // Sample data for pie chart
  const statusData = [
    { name: 'Approved', value: 785, color: '#16a34a' },
    { name: 'Pending', value: 245, color: '#054afc' },
    { name: 'Rejected', value: 228, color: '#dc2626' },
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

  // Sample data for recent activity table
  const recentActivities = [
    {
      id: '1',
      projectTitle: 'Quantum Analytics Platform',
      groupNumber: 'G-0032',
      lastUpdated: 'Today, 10:30 AM',
      actionType: 'Approved' as const,
      actionBy: 'Sarah Johnson'
    },
    {
      id: '2',
      projectTitle: 'Neural Network Visualizer',
      groupNumber: 'G-0028',
      lastUpdated: 'Today, 09:15 AM',
      actionType: 'Featured' as const,
      actionBy: 'Michael Chen'
    },
    {
      id: '3',
      projectTitle: 'Blockchain Explorer Interface',
      groupNumber: 'G-0045',
      lastUpdated: 'Yesterday, 05:45 PM',
      actionType: 'Rejected' as const,
      actionBy: 'Alex Rodriguez'
    },
    {
      id: '4',
      projectTitle: 'Smart City Dashboard',
      groupNumber: 'G-0019',
      lastUpdated: 'Yesterday, 01:30 PM',
      actionType: 'Submitted' as const,
      actionBy: 'Lisa Wong'
    },
    {
      id: '5',
      projectTitle: 'Augmented Reality Learning Tool',
      groupNumber: 'G-0051',
      lastUpdated: '2 days ago',
      actionType: 'Approved' as const,
      actionBy: 'David Patel'
    },
  ];

  if (status === "authenticated") {
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
              trend={stat.trend}
              className="animate-fade-in"
              style={{ animationDelay: `${index * 100}ms` }}
            />
          ))}
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <StatusPieChart />
          <SubmissionsLineChart data={submissionsData} />
        </div>


        {/* Recent Activity Table */}
        <RecentActivityTable activities={recentActivities} />


      </>
    );
  }
}
