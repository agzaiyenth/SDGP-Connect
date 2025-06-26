"use client"

import CompetitionCard from "@/components/competition/CompetitionCard"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"
import { useApprovedCompetitions } from "@/hooks/competition/useApprovedCompetitions"
import { ArrowRight, Play } from "lucide-react"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { useCallback, useEffect, useRef, useState } from "react"

export default function AwardsPage() {
  const [videoOpen, setVideoOpen] = useState(false)
  const router = useRouter()

  // Infinite scroll logic
  const { competitions, isLoading, error, fetchMore, hasMore } = useApprovedCompetitions(9)
  const loaderRef = useRef<HTMLDivElement | null>(null)

  const handleClick = () => {
    router.push("/contact")
  }

  // Intersection Observer for infinite scroll
  const handleObserver = useCallback((entries: IntersectionObserverEntry[]) => {
    const target = entries[0]
    if (target.isIntersecting && hasMore && !isLoading) {
      fetchMore()
    }
  }, [hasMore, isLoading, fetchMore])

  useEffect(() => {
    const option = { root: null, rootMargin: "20px", threshold: 0 }
    const observer = new window.IntersectionObserver(handleObserver, option)
    if (loaderRef.current) observer.observe(loaderRef.current)
    return () => { if (loaderRef.current) observer.unobserve(loaderRef.current) }
  }, [handleObserver])

  return (
    <div className="min-h-screen bg-#0c0a09">
      {/* Hero Section */}
      <section className="px-4 sm:px-6 lg:px-8 xl:px-12 2xl:px-16 relative overflow-hidden pt-16 sm:pt-20 lg:pt-24 xl:pt-32 pb-12 sm:pb-16 lg:pb-20 xl:pb-24">
        <div className="container relative max-w-7xl mx-auto">
          <div className="grid items-center gap-8 lg:gap-16 lg:grid-cols-2">
            {/* Content Section */}
            <div className="flex flex-col items-center text-center lg:items-start lg:text-left order-2 lg:order-1">
              <div className="space-y-4 sm:space-y-6 lg:space-y-8">
                {/* Badge */}
                <div className="inline-flex items-center gap-2 rounded-full bg-gray-800 border border-gray-700 px-4 py-2">
                  <span className="text-sm font-medium text-white">Competition Awards</span>
                </div>

                {/* Heading */}
                <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold tracking-tight leading-tight text-white">
                  Celebrating <span className="text-gray-300">Excellence</span>
                </h1>

                {/* Description */}
                <p className="text-base sm:text-lg lg:text-xl text-gray-400 max-w-2xl leading-relaxed">
                  Discover the innovative teams and groundbreaking projects that have shaped our competitive landscape
                  through creativity, technology, and determination.
                </p>

                {/* Buttons */}
                <div className="flex w-full flex-col gap-4 sm:flex-row sm:gap-4 lg:justify-start pt-6">
                  {/* Video Dialog */}
                  <Dialog open={videoOpen} onOpenChange={setVideoOpen}>
                    <DialogTrigger asChild>
                      <Button
                        variant="outline"
                        className="group relative w-full sm:w-auto overflow-hidden bg-gray-900 border-gray-700 text-white hover:bg-gray-800"
                        size="lg"
                      >
                        <div className="absolute inset-0 bg-blue-950/20 transition-transform group-hover:translate-y-full" />
                        <Play className="mr-2 size-4" />
                        Watch Highlights
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="w-[95vw] max-w-4xl bg-gray-900 border-gray-700">
                      <div className="relative aspect-video rounded-lg border border-gray-700 shadow-lg">
                        <iframe
                          src="https://www.youtube.com/embed/qgQh2O1nbi8?end=2537&rel=0"
                          title="Competition Highlights"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen
                          className="absolute inset-0 h-full w-full rounded-md"
                        />
                      </div>
                    </DialogContent>
                  </Dialog>

                  {/* Contact Button */}
                  <Button
                    size="lg"
                    className="group w-full sm:w-auto bg-white text-black hover:bg-gray-200"
                    onClick={handleClick}
                  >
                    View All Winners
                    <ArrowRight className="ml-2 size-4 transition-transform group-hover:translate-x-1" />
                  </Button>
                </div>
              </div>
            </div>

            {/* Image Section */}
            <div className="relative order-1 lg:order-2">
              <div className="absolute -inset-4 -z-10 rounded-2xl bg-blue-950/10 blur-sm" />
              <div className="relative overflow-hidden rounded-xl h-[280px] sm:h-[320px] lg:h-[400px]">
                <Image
                  src='/assets/1.jpg'
                  alt="Competition winners celebrating their achievements"
                  fill
                  className="object-cover shadow-lg transition-transform hover:scale-[1.02] border border-gray-700"
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 45vw"
                  priority
                />

                {/* Overlay Badge */}
                <div className="absolute bottom-4 left-4 rounded-lg bg-gray-900/95 backdrop-blur-sm p-3 shadow-lg border border-gray-700">
                  <p className="font-semibold text-sm text-white">Latest Competition</p>
                  <p className="text-xs text-gray-400">18 Winners Announced</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Competitions Grid */}
      <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 2xl:px-16 py-12 sm:py-16 lg:py-20">
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-4">All Competitions</h2>
          <p className="text-base text-gray-400">Explore our competitive events and their winners</p>
        </div>
        {/* Responsive Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-6 lg:gap-8">
          {competitions.map((competition) => (
            <CompetitionCard
              key={competition.id}
              id={competition.id}
              title={competition.name}
              cover={competition.cover || "/assets/placeholder.svg"}
              type={competition.type || ""}
              startDate={competition.startDate}
              endDate={competition.endDate}
              logo={competition.logo || "/assets/placeholder.svg"}
              viewLink={`/competitions/${competition.id}`}
              description={competition.description}
              winnersCount={competition.winnersCount}
            />
          ))}
        </div>
        <div ref={loaderRef} className="flex justify-center py-8">
          {isLoading && <span className="text-gray-400">Loading...</span>}
          {!hasMore && !isLoading && <span className="text-gray-500">No more competitions</span>}
          {error && <span className="text-red-500">{error}</span>}
        </div>
      </div>
    </div>
  )
}