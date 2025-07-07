// Copyright (c) 2025, Psycode Lab's (https://www.psycodelabs.lk). All Rights Reserved.
//
// This software is the property of Psycode Lab's. and its suppliers, if any.
// Dissemination of any information or reproduction of any material contained
// herein in any form is strictly forbidden, unless permitted by Psycode Lab's expressly.
// You may not alter or remove any copyright or other notice from copies of this content.
"use client"

import { useState, useEffect } from "react"
import { VideoCard } from "./video-card"
import { VideoModal } from "./video-modal"

interface Video {
  id: string
  title: string
  description: string
  thumbnail: string
  duration: string
  views: string
  uploadDate: string
}

interface VideoGridProps {
  videos: Video[]
}

const GridSkeleton = () => (
  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
    {Array.from({ length: 10 }).map((_, index) => (
      <div key={index} className="relative bg-zinc-900 rounded-lg" style={{ aspectRatio: "9/16" }}>
        <div
          className="w-full h-full bg-zinc-800"
          style={{
            background: "linear-gradient(90deg, #27272a 25%, #3f3f46 50%, #27272a 75%)",
            backgroundSize: "200% 100%",
            animation: "shimmer 2s infinite",
            animationDelay: `${index * 0.1}s`,
          }}
        />
        <style jsx>{`
          @keyframes shimmer {
            0% { background-position: -200% 0; }
            100% { background-position: 200% 0; }
          }
        `}</style>
      </div>
    ))}
  </div>
)

export function VideoGrid({ videos }: VideoGridProps) {
  const [selectedVideo, setSelectedVideo] = useState<Video | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Simulate data loading
    const timer = setTimeout(() => setIsLoading(false), 500)
    return () => clearTimeout(timer)
  }, [])

  const handleVideoPlay = (video: Video) => {
    setSelectedVideo(video)
    setIsModalOpen(true)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
    setTimeout(() => setSelectedVideo(null), 300)
  }

  if (isLoading) return <GridSkeleton />

  return (
    <>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {videos.map((video, index) => (
          <VideoCard key={`${video.id}-${index}`} video={video} onPlay={handleVideoPlay} />
        ))}
      </div>
      <VideoModal video={selectedVideo} isOpen={isModalOpen} onClose={handleCloseModal} />
    </>
  )
}
