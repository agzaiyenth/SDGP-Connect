// Admin Awards Management Page
'use client';
import React from 'react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import PendingAwardsTable from '@/components/tables/PendingAwardsTable';
import ApprovedAwardsTable from '@/components/tables/ApprovedAwardsTable';
import RejectedAwardsTable from '@/components/tables/RejectedAwardsTable';

export default function AdminAwardsPage() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Awards Management</h1>
      <Tabs defaultValue="pending" className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="pending">Pending</TabsTrigger>
          <TabsTrigger value="approved">Approved</TabsTrigger>
          <TabsTrigger value="rejected">Rejected</TabsTrigger>
        </TabsList>
        <TabsContent value="pending">
          <PendingAwardsTable />
        </TabsContent>
        <TabsContent value="approved">
          <ApprovedAwardsTable />
        </TabsContent>
        <TabsContent value="rejected">
          <RejectedAwardsTable />
        </TabsContent>
      </Tabs>
    </div>
  );
}
