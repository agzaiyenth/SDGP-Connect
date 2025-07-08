"use client"

import { useState, useEffect } from "react"

const VideoSkeleton = () => (
  <div className="w-full aspect-video bg-gray-800 rounded-lg animate-pulse flex items-center justify-center">
    <div className="w-16 h-16 border-4 border-gray-600 border-t-white rounded-full animate-spin"></div>
  </div>
)

export default function Hero() {
  const [isVideoLoaded, setIsVideoLoaded] = useState(false)
  const [shouldLoadVideo, setShouldLoadVideo] = useState(false)

  useEffect(() => {
    // Delay video loading slightly to improve initial page load
    const timer = setTimeout(() => {
      setShouldLoadVideo(true)
    }, 500)

    return () => clearTimeout(timer)
  }, [])

  const handleVideoLoad = () => {
    setIsVideoLoaded(true)
  }

  return (
    <section className="min-h-screen bg-black text-white py-12 px-4">
      <div className="container mx-auto max-w-7xl">
        <div className="grid gap-8 lg:grid-cols-2 lg:gap-16 items-center min-h-[80vh]">
          {/* Left Content */}
          <div className="flex flex-col justify-center space-y-8">
            <div className="inline-block">
              <span className="bg-gray-800 text-gray-300 px-4 py-2 rounded-full text-sm font-medium">
                Educational Excellence
              </span>
            </div>

            <div className="space-y-6">
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight">
                What is
                <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-400">SDGP</span>
              </h1>

              <p className="text-lg md:text-xl text-gray-300 max-w-2xl leading-relaxed">
                Discover the innovative educational framework and groundbreaking approach that has transformed learning
                experiences through creativity, technology, and academic determination.
              </p>
            </div>

            {/* Stats */}
            <div className="flex gap-12 pt-8">
              <div className="space-y-2">
                <div className="w-12 h-12 bg-gray-800 rounded-full flex items-center justify-center">
                  <div className="w-6 h-6 bg-white rounded-full"></div>
                </div>
                <div className="text-3xl md:text-4xl font-bold">25+</div>
                <div className="text-gray-400 text-sm">Programs</div>
              </div>

              <div className="space-y-2">
                <div className="w-12 h-12 bg-gray-800 rounded-full flex items-center justify-center">
                  <div className="w-6 h-6 bg-gradient-to-r from-white to-gray-400 rounded-full"></div>
                </div>
                <div className="text-3xl md:text-4xl font-bold">500+</div>
                <div className="text-gray-400 text-sm">Students</div>
              </div>
            </div>
          </div>

          {/* Right Video */}
          <div className="flex items-center justify-center">
            <div className="w-full max-w-2xl">
              {!isVideoLoaded && <VideoSkeleton />}

              {shouldLoadVideo && (
                <div className={`w-full ${!isVideoLoaded ? "hidden" : ""}`}>
                  <iframe
                    src="https://www.youtube.com/embed/7uZvGxbC-wA?autoplay=1&mute=1&cc_load_policy=1&modestbranding=1&rel=0&showinfo=0&controls=1&iv_load_policy=3&fs=1&playsinline=1"
                    title="What is SDGPA"
                    className="w-full aspect-video rounded-lg shadow-2xl"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                    loading="lazy"
                    onLoad={handleVideoLoad}
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
