"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Play, ArrowRight, Link } from "lucide-react";
import Image from "next/image";
import { Zap } from "lucide-react";

export default function Hero() {
  const [videoOpen, setVideoOpen] = useState(false);
  const router = useRouter();

  const handleClick = () => {
    router.push("/contact");
  };

  return (
    <section className="p-10 relative overflow-hidden py-32 mt-28">
      {/* Decorative background elements */}
      <div className="absolute inset-0 -z-10 " />


      <div className="container relative">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div className="flex flex-col items-center text-center lg:items-start lg:text-left">
            <div className="mt-8 space-y-4">
              <div className="inline-flex items-center gap-3 rounded-full bg-primary/10 px-4 py-2">
                <Zap className="size-5 text-primary" />
                <span className="text-sm font-medium">About Us </span>
              </div>

              <h1 className="text-pretty text-4xl font-bold tracking-tight lg:text-5xl">
                Welcome to <span className="text-primary">SDGP - CONNECT</span>
              </h1>

              <p className="text-base text-muted-foreground lg:text-lg">
                Explore student-led software solutions addressing real-world challenges aligned with the UN Sustainable Development Goals.
              </p>
            </div>

            <div className="mt-8 flex w-full flex-col justify-center gap-3 sm:flex-row lg:justify-start">
              <Dialog open={videoOpen} onOpenChange={setVideoOpen}>
                <DialogTrigger asChild>
                  <Button
                    variant="outline"
                    className="group relative w-full overflow-hidden sm:w-auto"
                    size="lg"
                  >
                    <div className="absolute inset-0 bg-primary/10 transition-transform group-hover:translate-y-full" />
                    <Play className="mr-2 size-4" />
                    Watch Video
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[800px]">
                  <div className="relative aspect-video rounded-lg border shadow-lg">
                    <iframe
                      src="https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      className="absolute inset-0 h-full w-full rounded-md"
                    />
                  </div>
                </DialogContent>
              </Dialog>

              <Button size="lg" className="group w-full sm:w-auto" onClick={handleClick}>
                Contact Us
                <ArrowRight className="ml-2 size-4 transition-transform group-hover:translate-x-1" />
              </Button>

            </div>
          </div>

          <div className="relative">
            <div className="absolute -inset-4 -z-10 rounded-2xl bg-dark/10 blur-sm" />
            <Image
              src="/assets/3.jpg"
              alt="Students who won dialog Innovative challenge"
              className="w-full rounded-xl object-contain shadow-lg transition-transform hover:scale-[1.02] border border-gray-600"
              height={800}
              width={800}
              style={{ maxHeight: "480px" }}
            />
            <div className="absolute bottom-4 left-4 rounded-lg bg-background p-4 shadow">
              <p className="font-semibold">Taking Projects</p>
              <p className="text-sm text-muted-foreground">
                To the Next Level
              </p>
            </div>
          </div>


        </div>
      </div>
    </section>
  );
}
