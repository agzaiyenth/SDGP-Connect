"use client";
import React from "react";
import { SparklesCore } from "./sparkles";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Play, ArrowRight } from "lucide-react";
import Image from "next/image";
import { Zap } from "lucide-react";

export function ContactTitle() {
  return (
    <section className="px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12 2xl:px-16 relative overflow-hidden mt-28 md:mt-0 md:py-32 lg:py-40 xl:py-48">
          {/* Decorative background elements */}
          <div className="absolute inset-0 -z-10" />
    
          <div className="container relative max-w-7xl 2xl:max-w-screen-2xl mx-auto">
            <div className="grid items-center gap-8 md:gap-12 lg:gap-16 xl:gap-20 2xl:gap-24 lg:grid-cols-2">
              
              {/* Content Section */}
              <div className="flex flex-col items-center text-center lg:items-start lg:text-left">
                <div className="mt-8 space-y-4 lg:space-y-6 xl:space-y-8">
                  
                  {/* Badge */}
                  <div className="inline-flex items-center gap-3 rounded-full bg-primary/10 px-4 py-2 lg:px-5 lg:py-2.5">
                    <Zap className="size-4 lg:size-5 text-primary" />
                    <span className="text-sm lg:text-base font-medium">About Us</span>
                  </div>
    
                  {/* Heading */}
                  <h1 className="text-pretty text-3xl sm:text-4xl lg:text-5xl xl:text-6xl 2xl:text-7xl font-bold tracking-tight leading-tight">
                    Welcome to <span className="text-primary">SDGP</span>
                  </h1>
    
                  {/* Description */}
                  <p className="text-sm sm:text-base lg:text-lg xl:text-xl 2xl:text-2xl text-muted-foreground max-w-2xl leading-relaxed">
                    Explore student-led software solutions addressing real-world challenges aligned with the UN Sustainable Development Goals.
                  </p>
                </div>
    
    
    </div>
            </div>
          </div>
    
          <div className="hidden 2xl:block h-16" />
        </section>
  );
}