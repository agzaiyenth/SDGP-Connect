'use client';

import { useState } from 'react';
import { Sidebar } from './sidebar';
import { Navbar } from './navbar';
import { cn } from '@/lib/utils';

export function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div className="min-h-screen bg-background">
      <Navbar onMenuClick={() => setSidebarOpen(!sidebarOpen)} />
      <div className="flex  pt-16">
        <Sidebar isOpen={sidebarOpen} />
        <main
          className={cn(
            'flex-1 overflow-y-auto p-6 transition-all duration-300 ease-in-out',
            sidebarOpen ? 'ml-64' : 'ml-20'
          )}
        >
          {children}
        </main>
      </div>
    </div>
  );
}