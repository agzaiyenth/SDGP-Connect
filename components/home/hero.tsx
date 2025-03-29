"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "../ui/button"
import { Play } from "lucide-react"

export default function Hero() {
  const [isVideoLoaded, setIsVideoLoaded] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVideoLoaded(true)
    }, 500)
    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="relative h-[85vh] w-full flex items-center pl-25">
      {/* Video background */}
      <div className="absolute inset-0 overflow-hidden">
        <video
          autoPlay
          loop
          muted
          playsInline
          className={`w-full h-full object-cover transition-opacity duration-1000 ${
            isVideoLoaded ? "opacity-60" : "opacity-0"
          }`}
          onCanPlay={() => setIsVideoLoaded(true)}
        >
          <source src="https://www.youtube.com/watch?v=rNSIwjmynYQ" type="video/mp4" />
        </video>
        {/* Fallback image while video loads */}
        <div
          className={`absolute inset-0 bg-[url('/placeholder.svg?height=1080&width=1920')] bg-cover bg-center transition-opacity duration-1000 ${
            isVideoLoaded ? "opacity-0" : "opacity-60"
          }`}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/80 to-background/20" />
      </div>

      <div className="container mx-auto relative z-20 px-4">
        <div className="max-w-2xl">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 leading-tight">
            Discover Innovative <span className="text-primary">SDGP</span> Projects
          </h1>
          <p className="text-xl text-muted-foreground mb-8">
            Explore student-led software solutions addressing real-world challenges aligned with the UN Sustainable
            Development Goals.
          </p>
          <div className="flex flex-wrap gap-4">
            <Button size="lg" asChild>
              <Link href="/projects">Browse Projects</Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="/submit">Submit Your Project</Link>
            </Button>
            <Button size="lg" variant="secondary" className="flex items-center gap-2">
              <Play className="h-4 w-4" />
              Watch Showcase
            </Button>
          </div>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center animate-bounce">
        <div className="text-muted-foreground text-sm mb-2">Scroll to explore</div>
        <div className="w-6 h-10 border-2 border-muted-foreground rounded-full flex justify-center">
          <div className="w-1 h-2 bg-muted-foreground rounded-full mt-2" />
        </div>
      </div>
    </div>
  )
}

