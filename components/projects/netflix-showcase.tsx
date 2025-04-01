"use client"

import { useState, useRef, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { ChevronLeft, ChevronRight, Play } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { motion } from "framer-motion"
import type { Project } from "@/types"

interface NetflixShowcaseProps {
  projects: Project[]
  featuredProject?: Project
}

export default function NetflixShowcase({ projects, featuredProject }: NetflixShowcaseProps) {
  const [activeIndex, setActiveIndex] = useState(0)
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)
  const carouselRef = useRef<HTMLDivElement>(null)

  // Use the first project as featured if none provided
  const featured = featuredProject || projects[0]

  // Calculate project duration (in months) from status
  const getDuration = (status: string) => {
    switch (status) {
      case "Completed":
        return "12 months"
      case "In Progress":
        return "6 months"
      case "Prototype":
        return "3 months"
      case "Concept":
        return "1 month"
      default:
        return "Ongoing"
    }
  }

  // Get current year
  const currentYear = new Date().getFullYear()

  const nextSlide = () => {
    if (projects.length <= 1) return
    setActiveIndex((prev) => (prev + 1) % projects.length)
  }

  const prevSlide = () => {
    if (projects.length <= 1) return
    setActiveIndex((prev) => (prev - 1 + projects.length) % projects.length)
  }

  // Auto-scroll carousel every 5 seconds if not hovering
  useEffect(() => {
    if (hoveredIndex === null && projects.length > 1) {
      const interval = setInterval(() => {
        nextSlide()
      }, 5000)
      return () => clearInterval(interval)
    }
  }, [hoveredIndex, projects.length])

  return (
    <div className="netflix-bg min-h-screen w-full">
      {/* Hero Section */}
      <div className="relative w-full h-[70vh]">
        {/* Background Image */}
        <div className="absolute inset-0">
          <Image
            src={featured.coverImage || "/placeholder.svg?height=1080&width=1920"}
            alt={featured.title}
            fill
            className="object-cover"
            priority
          />
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-black via-black/70 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent" />
        </div>

        {/* Content */}
        <div className="absolute bottom-0 left-0 w-full p-8 z-10">
          <div className="container mx-auto">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
              <div className="flex items-center gap-3 mb-3">
                <Badge className="bg-red-600 text-white">{featured.status}</Badge>
                <span className="text-gray-300">{currentYear}</span>
                <span className="text-gray-300">•</span>
                <span className="text-gray-300">{getDuration(featured.status)}</span>
                <span className="text-gray-300">•</span>
                <span className="text-gray-300">{featured.domains.join(", ")}</span>
              </div>

              <h1 className="text-5xl font-bold mb-3 text-white">{featured.title}</h1>
              <p className="text-xl text-gray-300 mb-6 max-w-2xl line-clamp-3">{featured.subtitle}</p>

              <div className="flex gap-3 mt-6">
                <Button size="lg" className="bg-red-600 hover:bg-red-700 text-white px-8">
                  VIEW DETAILS
                </Button>
                <Button size="lg" variant="outline" className="border-white/30 hover:bg-white/10 text-white">
                  CONTACT
                </Button>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Trending Projects Carousel */}
      <div className="container mx-auto px-4 py-8">
        <h2 className="text-2xl font-bold mb-6 text-white">Trending Projects</h2>

        <div className="relative">
          {/* Navigation Buttons */}
          <Button
            variant="ghost"
            size="icon"
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-black/50 hover:bg-black/70 text-white rounded-full h-12 w-12"
            onClick={prevSlide}
          >
            <ChevronLeft className="h-6 w-6" />
          </Button>

          <Button
            variant="ghost"
            size="icon"
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-black/50 hover:bg-black/70 text-white rounded-full h-12 w-12"
            onClick={nextSlide}
          >
            <ChevronRight className="h-6 w-6" />
          </Button>

          {/* Carousel */}
          <div ref={carouselRef} className="overflow-hidden mx-10">
            <div
              className="flex transition-transform duration-500 ease-out"
              style={{ transform: `translateX(-${activeIndex * 100}%)` }}
            >
              {projects.map((project, index) => (
                <div key={project.id} className="w-full flex-shrink-0 flex justify-center px-2">
                  <div className="w-full max-w-5xl">
                    <div className="relative aspect-[16/9] overflow-hidden rounded-lg">
                      <Image
                        src={project.gallery[0] || "/placeholder.svg?height=720&width=1280"}
                        alt={project.title}
                        fill
                        className="object-cover"
                      />

                      {/* 3D Stack Effect - Show previous and next slides */}
                      {index !== activeIndex && <div className="absolute inset-0 bg-black/80 backdrop-blur-sm"></div>}

                      {/* Content Overlay */}
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="text-center p-6 max-w-2xl">
                          <h3 className="text-3xl font-bold mb-3 text-white">{project.title}</h3>
                          <p className="text-gray-300 mb-6 line-clamp-2">{project.subtitle}</p>
                          <Link href={`/projects/${project.id}`}>
                            <Button className="bg-red-600 hover:bg-red-700 text-white">
                              <Play className="h-4 w-4 mr-2" /> View Project
                            </Button>
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Indicator Dots */}
          <div className="flex justify-center mt-6 gap-2">
            {projects.map((_, i) => (
              <button
                key={i}
                onClick={() => setActiveIndex(i)}
                className={`w-3 h-3 rounded-full transition-colors ${activeIndex === i ? "bg-red-600" : "bg-gray-600"}`}
                aria-label={`Go to slide ${i + 1}`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Project Thumbnails Row */}
      <div className="container mx-auto px-4 py-8">
        <h2 className="text-2xl font-bold mb-6 text-white">All Projects</h2>

        <div className="relative -mx-4 px-4">
          <div className="flex overflow-x-auto gap-4 pb-4 hide-scrollbar">
            {projects.map((project, index) => (
              <Link
                key={project.id}
                href={`/projects/${project.id}`}
                className="flex-shrink-0 w-[250px] bg-[#181818] rounded-lg overflow-hidden transition-all duration-300 hover:scale-105 transform perspective-1000"
                style={{
                  transform: hoveredIndex === index ? "scale(1.05) translateZ(20px)" : "scale(1) translateZ(0)",
                  transition: "transform 0.3s ease-out",
                  boxShadow: hoveredIndex === index ? "0 10px 25px rgba(0, 0, 0, 0.5)" : "none",
                }}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                <div className="relative aspect-video">
                  <Image
                    src={project.coverImage || "/placeholder.svg?height=720&width=1280"}
                    alt={project.title}
                    fill
                    className="object-cover"
                  />
                  {hoveredIndex === index && (
                    <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                      <Play className="h-12 w-12 text-white" />
                    </div>
                  )}
                  <div className="absolute top-2 right-2">
                    <Badge className="bg-red-600 text-white">{project.status}</Badge>
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="font-bold mb-1 text-white line-clamp-1">{project.title}</h3>
                  <p className="text-sm text-gray-400 line-clamp-2">{project.subtitle}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

