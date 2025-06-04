"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Calendar, Play, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"
import { useRouter } from "next/navigation"

const competitions = [
  {
    id: "hackathon-2024",
    title: "Tech Innovation Hackathon 2024",
    description: "48-hour coding challenge focused on sustainable technology solutions",
    date: "March 15-25, 2025",
    winnersCount: 6,
    image: '/assets/1.jpg',
    category: "Technology",
    prize: "500,000 Total Prize Pool",
  },
  {
    id: "design-challenge",
    title: "UI/UX Design Challenge",
    description: "Creative design competition for mobile app interfaces",
    date: "February 20-25, 2025",
    winnersCount: 4,
    image: '/assets/4.jpg',
    category: "Design",
    prize: "250,000 Total Prize Pool",
  },
  {
    id: "startup-pitch",
    title: "Startup Pitch Competition",
    description: "Entrepreneurial teams pitch their innovative business ideas",
    date: "January 10-25, 2024",
    winnersCount: 5,
    image: '/assets/3.jpg',
    category: "Business",
    prize: "750,000 Total Prize Pool",
  },
  {
    id: "ai-challenge",
    title: "AI & Machine Learning Challenge",
    description: "Teams compete to solve real-world problems using AI",
    date: "April 5-25, 2024",
    winnersCount: 3,
    image:'/assets/2.jpg',
    category: "Artificial Intelligence",
    prize: "400,000 Total Prize Pool",
  },
]

export default function AwardsPage() {
  const [videoOpen, setVideoOpen] = useState(false)
  const router = useRouter()

  const handleClick = () => {
    router.push("/contact")
  }

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
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-4">Featured Competitions</h2>
          <p className="text-base text-gray-400">Explore our competitive events and their winners</p>
        </div>

        {/* Responsive Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-6 lg:gap-8">
          {competitions.map((competition, index) => (
            <Link key={competition.id} href={`/awards/${competition.id}`} className="group block h-full">
              <div className="relative bg-gray-900 rounded-2xl overflow-hidden border border-gray-800 hover:border-gray-700 transition-all duration-500 hover:scale-[1.02] hover:shadow-2xl hover:shadow-blue-950/20 h-[400px] flex flex-col">
                {/* Subtle Blue Glow on Hover */}
                <div className="absolute inset-0 bg-blue-950 opacity-0 group-hover:opacity-10 transition-opacity duration-500 rounded-2xl"></div>

                {/* Competition Image */}
                <div className="relative h-48 w-full overflow-hidden flex-shrink-0">
                  <Image
                    src={competition.image}
                    alt={competition.title}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-700"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />

                  {/* Category Badge */}
                  <div className="absolute top-3 left-3">
                    <span className="bg-black/80 backdrop-blur-sm border border-gray-800 px-2.5 py-1.5 rounded-full text-xs font-medium text-gray-300">
                      {competition.category}
                    </span>
                  </div>

                  {/* Winners Count */}
                  <div className="absolute bottom-3 right-3">
                    <div className="bg-gray-800 text-white px-2.5 py-1.5 rounded-full text-xs font-bold shadow-lg border border-gray-700">
                      {competition.winnersCount} Winners
                    </div>
                  </div>
                </div>

                {/* Competition Details */}
                <div className="p-4 flex flex-col flex-grow justify-between">
                  <div className="space-y-2.5">
                    <h3 className="text-lg font-bold text-white group-hover:text-gray-200 transition-colors duration-300 line-clamp-2 min-h-[3.5rem]">
                      {competition.title}
                    </h3>
                    <p className="text-gray-400 leading-relaxed text-sm line-clamp-2 min-h-[2.5rem]">
                      {competition.description}
                    </p>
                  </div>

                  <div className="space-y-2.5 mt-3">
                    <div className="flex items-center justify-between text-xs text-gray-500">
                      <div className="flex items-center gap-1.5">
                        <Calendar className="w-3 h-3" />
                        <span className="truncate">{competition.date.split(",")[0]}</span>
                      </div>
                      <div className="text-gray-500">Team Event</div>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-sm font-bold text-white truncate">{competition.prize.split(" ")[0]}</span>
                      <span className="text-gray-400 group-hover:text-white transition-colors duration-300 flex items-center gap-1.5 text-xs">
                        View
                        <span className="group-hover:translate-x-1 transition-transform duration-300">→</span>
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Stats Section */}
      <div className="relative bg-gray-900/30 backdrop-blur-sm border-t border-gray-800 py-12 sm:py-16 lg:py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 2xl:px-16">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12 text-center max-w-4xl mx-auto">
            <div className="group">
              <div className="text-3xl sm:text-4xl font-bold text-white mb-2 group-hover:scale-110 transition-transform duration-300">
                4
              </div>
              <div className="text-sm text-gray-400">Competitions</div>
            </div>
            <div className="group">
              <div className="text-3xl sm:text-4xl font-bold text-white mb-2 group-hover:scale-110 transition-transform duration-300">
                18
              </div>
              <div className="text-sm text-gray-400">Winning Teams</div>
            </div>
            <div className="group">
              <div className="text-3xl sm:text-4xl font-bold text-white mb-2 group-hover:scale-110 transition-transform duration-300">
                90Mn
              </div>
              <div className="text-sm text-gray-400">Total Prizes</div>
            </div>
            <div className="group">
              <div className="text-3xl sm:text-4xl font-bold text-white mb-2 group-hover:scale-110 transition-transform duration-300">
                200+
              </div>
              <div className="text-sm text-gray-400">Participants</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}