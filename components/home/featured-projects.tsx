"use client"

import { useState, useRef } from "react"
import Link from "next/link"
import Image from "next/image"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { projects } from "../../data/sampleProjects"
import { Badge } from "../ui/badge"
import { Button } from "../ui/button"
import { cn } from "../../lib/utils"

export default function FeaturedProjects() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const carouselRef = useRef<HTMLDivElement>(null)

  const featuredProjects = projects.filter((project) => project.featured)

  const scrollToIndex = (index: number) => {
    if (carouselRef.current) {
      const scrollAmount = index * carouselRef.current.offsetWidth
      carouselRef.current.scrollTo({ left: scrollAmount, behavior: "smooth" })
      setCurrentIndex(index)
    }
  }

  const nextSlide = () => {
    const newIndex = (currentIndex + 1) % featuredProjects.length
    scrollToIndex(newIndex)
  }

  const prevSlide = () => {
    const newIndex = (currentIndex - 1 + featuredProjects.length) % featuredProjects.length
    scrollToIndex(newIndex)
  }

  return (
    <section className="py-12 px-4">
      <div className="container mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold">Featured Projects</h2>
          <div className="flex gap-2">
            <Button variant="outline" size="icon" onClick={prevSlide} aria-label="Previous project">
              <ChevronLeft className="h-5 w-5" />
            </Button>
            <Button variant="outline" size="icon" onClick={nextSlide} aria-label="Next project">
              <ChevronRight className="h-5 w-5" />
            </Button>
          </div>
        </div>

        <div className="relative overflow-hidden">
          <div ref={carouselRef} className="flex overflow-x-hidden snap-x snap-mandatory">
            {featuredProjects.map((project) => (
              <div key={project.id} className="w-full flex-shrink-0 snap-center">
                <div className="flex flex-col md:flex-row gap-8 p-4">
                  <div className="relative w-full md:w-1/2 aspect-video rounded-xl overflow-hidden">
                    <Image
                      src={project.coverImage || "/placeholder.svg"}
                      alt={project.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="w-full md:w-1/2 flex flex-col justify-center">
                    <Badge className="w-fit mb-4">{project.status}</Badge>
                    <h3 className="text-2xl font-bold mb-2">{project.title}</h3>
                    <p className="text-lg text-muted-foreground mb-4">{project.subtitle}</p>
                    <p className="text-muted-foreground mb-6 line-clamp-3">{project.problemStatement}</p>

                    <div className="flex flex-wrap gap-2 mb-6">
                      {project.techStack.slice(0, 4).map((tech, i) => (
                        <Badge key={i} variant="outline">
                          {tech}
                        </Badge>
                      ))}
                    </div>

                    <Button asChild className="w-fit">
                      <Link href={`/projects/${project.id}`}>View Project</Link>
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="flex justify-center mt-6 gap-2">
            {featuredProjects.map((_, i) => (
              <button
                key={i}
                onClick={() => scrollToIndex(i)}
                className={cn("w-3 h-3 rounded-full transition-colors", currentIndex === i ? "bg-primary" : "bg-muted")}
                aria-label={`Go to slide ${i + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

