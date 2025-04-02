'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Users, FolderKanban, Star, Activity } from 'lucide-react';

const stats = [
  {
    title: 'Total Users',
    value: '2,345',
    icon: Users,
    change: '+12.5%',
  },
  {
    title: 'Projects',
    value: '456',
    icon: FolderKanban,
    change: '+8.2%',
  },
  {
    title: 'Featured Projects',
    value: '89',
    icon: Star,
    change: '+2.4%',
  },
  {
    title: 'Pending Reviews',
    value: '23',
    icon: Activity,
    change: '-4.5%',
  },
];

export function DashboardStats() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat) => (
        <Card key={stat.title}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              {stat.title}
            </CardTitle>
            <stat.icon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stat.value}</div>
            <p className={`text-xs ${stat.change.startsWith('+') ? 'text-green-500' : 'text-red-500'}`}>
              {stat.change} from last month
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}