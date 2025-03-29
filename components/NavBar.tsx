'use client';

import { cn } from '@/lib/utils';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ThemeToggle } from './ThemeToggle';
import { sidebarItems } from '@/data/NavBarItems';

export function NavBar() {
  const pathname = usePathname();

  return (
    <aside
      className={cn(
        'fixed bottom-4 left-1/2 transform -translate-x-1/2 z-50 w-[90%] md:left-12 md:top-1/2 md:-translate-y-1/2 md:w-auto'
      )}
    >
      <nav
        className={cn(
          'flex md:flex-col items-center justify-between gap-4 p-4 rounded-2xl backdrop-blur-lg bg-background/80 border shadow-lg',
          'w-full md:w-auto'
        )}
      >
        {sidebarItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'p-2 rounded-xl transition-all duration-200 hover:bg-primary/10 relative group',
                isActive && 'bg-primary/10'
              )}
            >
              <Icon
                className={cn(
                  'w-6 h-6 transition-colors',
                  isActive ? 'text-primary' : 'text-muted-foreground'
                )}
              />
              <span className="absolute left-full ml-2 px-2 py-1 rounded-md bg-popover text-popover-foreground text-sm invisible opacity-0 translate-x-2 group-hover:visible group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200">
                {item.label}
              </span>
            </Link>
          );
        })}
        <div className="mt-2 border-t pt-4 w-full justify-center md:justify-start md:block hidden">
          <ThemeToggle />
        </div>
      </nav>
    </aside>
  );
} 
