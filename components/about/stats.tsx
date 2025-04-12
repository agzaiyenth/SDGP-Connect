"use client";

import { User, Users, Projector } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const StatsSection = () => {
  return (
    <section className="px-20 bg-background py-16 text-foreground md:py-24 lg:py-32">
      <div className="container">
        <div className="flex flex-col items-center justify-between gap-8 lg:flex-row lg:items-start">
          <div className="max-w-2xl space-y-4 lg:space-y-6">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
              Empowering Innovation with SDGP
            </h2>
          </div>
          <Card className="w-full max-w-md border-primary/10 -mt-8">
            <CardContent className="p-2">
              <div className="grid gap-6 sm:grid-cols-3">
                <StatItem
                  rating={1600}
                  icon={<User className="h-6 w-6" />}
                  platform="Students Enrolled"
                  downloads="1,600"
                />
                <StatItem
                  rating={30}
                  icon={<Users className="h-6 w-6" />}
                  platform="Module Team"
                  downloads="30+"
                />
                <StatItem
                  rating={250}
                  icon={<Projector className="h-6 w-6" />}
                  platform="Completed Projects"
                  downloads="250+"
                />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

const StatItem = ({
  rating,
  icon,
  platform,
  downloads,
}: {
  rating: number;
  icon: React.ReactNode;
  platform: string;
  downloads?: string;
}) => (
  <div className="flex flex-col items-center gap-2 text-center">
    <div className="flex items-center gap-1 text-2xl font-bold pb-2">
      <span>{rating}+</span>
    </div>
    <div className="flex flex-col items-center gap-1">
      {icon}
      <span className="text-sm font-medium">{platform}</span>
    </div>
  </div>
);

export default StatsSection;
