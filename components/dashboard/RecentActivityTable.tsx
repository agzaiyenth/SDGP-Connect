'use client'
import React from 'react';
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle, 
  CardDescription 
} from '@/components/ui/card';
import { 
  Table, 
  TableHeader, 
  TableBody, 
  TableHead, 
  TableRow, 
  TableCell 
} from '@/components/ui/table';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';

interface Activity {
  id: string;
  projectTitle: string;
  groupNumber: string;
  lastUpdated: string;
  actionType: 'Approved' | 'Rejected' | 'Featured' | 'Submitted';
  actionBy: string;
}

interface RecentActivityTableProps {
  activities: Activity[];
}

const RecentActivityTable: React.FC<RecentActivityTableProps> = ({ activities }) => {
  const getActionBadgeColor = (actionType: string) => {
    switch(actionType) {
      case 'Approved': return 'bg-green-500/20 text-green-500 border-green-500/20';
      case 'Rejected': return 'bg-red-500/20 text-red-500 border-red-500/20';
      case 'Featured': return 'bg-amber-500/20 text-amber-500 border-amber-500/20';
      case 'Submitted': return 'bg-blue-500/20 text-blue-500 border-blue-500/20';
      default: return 'bg-gray-500/20 text-gray-500 border-gray-500/20';
    }
  };

  return (
    <Card className="neo-card w-full mt-8">
      <CardHeader>
        <CardTitle className="text-xl font-medium">Recent Activity</CardTitle>
        <CardDescription>Latest updates on projects and reviews</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader className="bg-background/50">
              <TableRow className="hover:bg-transparent border-b border-white/5">
                <TableHead className="font-medium text-muted-foreground">Project Title</TableHead>
                <TableHead className="font-medium text-muted-foreground">Group Number</TableHead>
                <TableHead className="font-medium text-muted-foreground">Last Updated</TableHead>
                <TableHead className="font-medium text-muted-foreground">Action Type</TableHead>
                <TableHead className="font-medium text-muted-foreground">Action By</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {activities.map((activity, index) => (
                <TableRow 
                  key={activity.id}
                  className={cn(
                    "transition-all cursor-pointer", 
                    "hover:bg-white/5",
                    index % 2 === 0 ? 'bg-transparent' : 'bg-white/[0.02]'
                  )}
                >
                  <TableCell className="font-medium">{activity.projectTitle}</TableCell>
                  <TableCell>{activity.groupNumber}</TableCell>
                  <TableCell>{activity.lastUpdated}</TableCell>
                  <TableCell>
                    <Badge className={cn("font-normal border", getActionBadgeColor(activity.actionType))}>
                      {activity.actionType}
                    </Badge>
                  </TableCell>
                  <TableCell>{activity.actionBy}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
};

export default RecentActivityTable;