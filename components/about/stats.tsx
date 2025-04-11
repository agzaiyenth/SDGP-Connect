"use client";

import { Star, Apple, PlayCircle, ShieldCheck } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const StatsSection = () => {
  return (
    <section className="px-20 bg-background py-16 text-foreground md:py-24 lg:py-32">
      <div className="container">
        <div className="flex flex-col items-center justify-between gap-8 lg:flex-row lg:items-start">
          <div className="max-w-2xl space-y-4 lg:space-y-6">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
              Trusted by Millions of Users Worldwide
            </h2>

            <div className="flex flex-col gap-4 sm:flex-row">
              <Button className="w-full sm:w-auto">Download Now</Button>
              <Button variant="outline" className="w-full sm:w-auto">
                Learn More
              </Button>
            </div>
          </div>
          <Card className="w-full max-w-md border-primary/10">
            <CardContent className="p-6">
              <div className="grid gap-4 sm:grid-cols-3">
                <StatItem
                  rating={4.8}
                  icon={<Apple className="h-6 w-6" />}
                  platform="App Store"
                  downloads="1M+"
                />
                <StatItem
                  rating={4.9}
                  icon={<PlayCircle className="h-6 w-6" />}
                  platform="Play Store"
                  downloads="5M+"
                />
                <StatItem
                  rating={4.9}
                  icon={<ShieldCheck className="h-6 w-6" />}
                  platform="Trustpilot"
                  reviews="50K+"
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
  reviews,
}: {
  rating: number;
  icon: React.ReactNode;
  platform: string;
  downloads?: string;
  reviews?: string;
}) => (
  <div className="flex flex-col items-center gap-2 text-center">
    <div className="flex items-center gap-1 text-2xl font-bold">
      <span>{rating}</span>
      <Star className="h-5 w-5 text-primary" fill="currentColor" />
    </div>
    <div className="flex flex-col items-center gap-1">
      {icon}
      <span className="text-sm font-medium">{platform}</span>
      <span className="text-xs text-muted-foreground">
        {downloads ? `${downloads} Downloads` : `${reviews} Reviews`}
      </span>
    </div>
  </div>
);

export default StatsSection;
