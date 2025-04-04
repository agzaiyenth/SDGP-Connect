'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Check, X, Star, FileText } from 'lucide-react';

const activities = [
  {
    id: 1,
    type: 'approval',
    title: 'Project XYZ Approved',
    time: '2 hours ago',
    icon: Check,
    iconClass: 'text-green-500',
  },
  {
    id: 2,
    type: 'rejection',
    title: 'Project ABC Rejected',
    time: '3 hours ago',
    icon: X,
    iconClass: 'text-red-500',
  },
  {
    id: 3,
    type: 'featured',
    title: 'Project DEF Featured',
    time: '5 hours ago',
    icon: Star,
    iconClass: 'text-yellow-500',
  },
  {
    id: 4,
    type: 'submission',
    title: 'New Project Submitted',
    time: '6 hours ago',
    icon: FileText,
    iconClass: 'text-blue-500',
  },
];

export function RecentActivity() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Activity</CardTitle>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[400px] pr-4">
          <div className="space-y-4">
            {activities.map((activity) => (
              <div
                key={activity.id}
                className="flex items-center space-x-4 rounded-lg border p-3"
              >
                <div className={`rounded-full p-2 ${activity.iconClass} bg-opacity-10`}>
                  <activity.icon className="h-4 w-4" />
                </div>
                <div className="flex-1 space-y-1">
                  <p className="text-sm font-medium">{activity.title}</p>
                  <p className="text-xs text-muted-foreground">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}