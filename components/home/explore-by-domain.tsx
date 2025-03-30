"use client"

import { useRef } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"

const domains = [
  "Healthcare",
  "Education",
  "Environment",
  "Agriculture",
  "Financial Inclusion",
  "Smart Cities",
  "Sustainable Energy",
  "Humanitarian Aid",
  "Accessibility",
  "Mental Health",
  "Clean Water",
  "Gender Equality",
]

export default function ExploreByDomain() {
  const scrollContainerRef = useRef<HTMLDivElement>(null)

  const scroll = (direction: "left" | "right") => {
    if (scrollContainerRef.current) {
      const { current: container } = scrollContainerRef
      const scrollAmount = 300

      if (direction === "left") {
        container.scrollBy({ left: -scrollAmount, behavior: "smooth" })
      } else {
        container.scrollBy({ left: scrollAmount, behavior: "smooth" })
      }
    }
  }

  return (
    <section className="py-12 px-4 -mb-[124px]">
      <div className="container mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold">Explore by Domain</h2>
          <div className="flex gap-2">
            <Button variant="outline" size="icon" onClick={() => scroll("left")} aria-label="Scroll left">
              <ChevronLeft className="h-5 w-5" />
            </Button>
            <Button variant="outline" size="icon" onClick={() => scroll("right")} aria-label="Scroll right">
              <ChevronRight className="h-5 w-5" />
            </Button>
          </div>
        </div>

        <div className="relative">
          <div ref={scrollContainerRef} className="flex overflow-x-auto scrollbar-hide pb-4 gap-3 whitespace-nowrap">
            {domains.map((domain, i) => (
              <Button key={i} variant="outline" className="flex-shrink-0 rounded-full px-6">
                {domain}
              </Button>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
