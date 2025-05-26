"use client";
import { useEffect, useRef, useState } from "react";
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
          <Card className="w-full max-w-md border-primary/10 md:-mt-8">
            <CardContent className="p-2">
              <div className="grid gap-6 sm:grid-cols-3">
                <StatItem
                  finalValue={10000}
                  icon={<User className="h-6 w-6" />}
                  platform="Students Enrolled"
                  suffix="+"
                />
                <StatItem
                  finalValue={30}
                  icon={<Users className="h-6 w-6" />}
                  platform="Module Team"
                  suffix="+"
                />
                <StatItem
                  finalValue={1000}
                  icon={<Projector className="h-6 w-6" />}
                  platform="Completed Projects"
                  suffix="+"
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
  finalValue,
  icon,
  platform,
  suffix = "",
}: {
  finalValue: number;
  icon: React.ReactNode;
  platform: string;
  suffix?: string;
}) => {
  const [value, setValue] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.disconnect();
      }
    };
  }, []);

  useEffect(() => {
    if (!isVisible) return;

    const duration = 1000; 
    const frameDuration = 500 / 60; 
    const totalFrames = Math.round(duration / frameDuration);
    
    const incrementPerFrame = finalValue / totalFrames;
    
    let frame = 0;
    const counter = setInterval(() => {
      frame++;
      const newValue = Math.min(Math.round(incrementPerFrame * frame), finalValue);
      setValue(newValue);
      
      if (frame === totalFrames) {
        clearInterval(counter);
      }
    }, frameDuration);

    return () => clearInterval(counter);
  }, [isVisible, finalValue]);

  return (
    <div ref={ref} className="flex flex-col items-center gap-2 text-center">
      <div className="flex items-center gap-1 text-2xl font-bold pb-2">
        <span>{value}{suffix}</span>
      </div>
      <div className="flex flex-col items-center gap-1">
        {icon}
        <span className="text-sm font-medium">{platform}</span>
      </div>
    </div>
  );
};

export default StatsSection;