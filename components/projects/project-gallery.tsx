"use client"

import { useState } from "react"
import Image from "next/image"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "../../components/ui/button"

interface ProjectGalleryProps {
  images: string[]
}

export default function ProjectGallery({ images }: ProjectGalleryProps) {
  const [activeSlide, setActiveSlide] = useState(0)

  const nextSlide = () => {
    setActiveSlide((prev) => (prev + 1) % images.length)
  }

  const prevSlide = () => {
    setActiveSlide((prev) => (prev - 1 + images.length) % images.length)
  }

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Project Gallery</h2>

      {/* Main Slide */}
      <div className="relative bg-zinc-900 rounded-lg overflow-hidden">
        <div className="aspect-video relative">
          <Image
            src={images[activeSlide] || "/placeholder.svg"}
            alt={`Gallery image ${activeSlide + 1}`}
            fill
            className="object-contain"
          />
        </div>

        <Button
          variant="ghost"
          size="icon"
          className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full bg-black/50 hover:bg-black/70"
          onClick={prevSlide}
        >
          <ChevronLeft className="h-5 w-5" />
        </Button>

        <Button
          variant="ghost"
          size="icon"
          className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full bg-black/50 hover:bg-black/70"
          onClick={nextSlide}
        >
          <ChevronRight className="h-5 w-5" />
        </Button>

        {/* Slide Number Indicator */}
        <div className="absolute bottom-4 right-4 bg-black/70 px-3 py-1 rounded-full text-sm">
          {activeSlide + 1} / {images.length}
        </div>
      </div>

      {/* Thumbnails */}
      <div className="mt-6 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
        {images.map((image, i) => (
          <div
            key={i}
            className={`relative cursor-pointer transition-all duration-200 ${
              activeSlide === i ? "ring-2 ring-red-600 scale-105 z-10" : "ring-1 ring-zinc-800 hover:ring-zinc-600"
            }`}
            onClick={() => setActiveSlide(i)}
          >
            <div className="aspect-video relative rounded-md overflow-hidden">
              <Image src={image || "/placeholder.svg"} alt={`Thumbnail ${i + 1}`} fill className="object-cover" />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

