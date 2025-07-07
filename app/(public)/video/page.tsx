// Copyright (c) 2025, Psycode Lab's (https://www.psycodelabs.lk). All Rights Reserved.
//
// This software is the property of Psycode Lab's. and its suppliers, if any.
// Dissemination of any information or reproduction of any material contained
// herein in any form is strictly forbidden, unless permitted by Psycode Lab's expressly.
// You may not alter or remove any copyright or other notice from copies of this content.
"use client"

import { useState, useEffect } from "react"
import { VideoGrid } from "@/components/video-grid"
import videosData from "@/data/videos.json"

interface Video {
  id: string
  title: string
  description: string
  thumbnail: string
  duration: string
  views: string
  uploadDate: string
}

const PageSkeleton = () => {
  return (
    <div className="min-h-screen bg-black p-4">
      <style jsx global>{`
        body {
          background-color: black;
          color: white;
          font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif;
        }
        @keyframes shimmer {
          0% {
            background-position: -200% 0;
          }
          100% {
            background-position: 200% 0;
          }
        }
        @keyframes pulse {
          0%, 100% {
            opacity: 1;
          }
          50% {
            opacity: 0.5;
          }
        }
      `}</style>

      <div className="max-w-6xl mx-auto">
        {/* Skeleton Title */}
        <div className="text-center mb-8">
          <div
            className="h-8 bg-zinc-800 rounded mx-auto"
            style={{
              width: "200px",
              background: "linear-gradient(90deg, #27272a 25%, #3f3f46 50%, #27272a 75%)",
              backgroundSize: "200% 100%",
              animation: "shimmer 2s infinite",
            }}
          />
        </div>

        {/* Skeleton Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {Array.from({ length: 10 }).map((_, index) => (
            <div
              key={index}
              className="relative bg-zinc-900 rounded-lg overflow-hidden"
              style={{ aspectRatio: "9/16" }}
            >
              <div
                className="w-full h-full bg-zinc-800"
                style={{
                  background: "linear-gradient(90deg, #27272a 25%, #3f3f46 50%, #27272a 75%)",
                  backgroundSize: "200% 100%",
                  animation: "shimmer 2s infinite",
                  animationDelay: `${index * 0.1}s`,
                }}
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-3">
                <div
                  className="h-4 bg-zinc-700 rounded mb-1"
                  style={{
                    background: "linear-gradient(90deg, #3f3f46 25%, #52525b 50%, #3f3f46 75%)",
                    backgroundSize: "200% 100%",
                    animation: "shimmer 2s infinite",
                    animationDelay: `${index * 0.1 + 0.2}s`,
                  }}
                />
                <div
                  className="h-3 bg-zinc-700 rounded w-3/4"
                  style={{
                    background: "linear-gradient(90deg, #3f3f46 25%, #52525b 50%, #3f3f46 75%)",
                    backgroundSize: "200% 100%",
                    animation: "shimmer 2s infinite",
                    animationDelay: `${index * 0.1 + 0.4}s`,
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default function Home() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setMounted(true), 800)
    return () => clearTimeout(timer)
  }, [])

  if (!mounted) return <PageSkeleton />

  return (
    <div className="min-h-screen bg-black p-4">
      <style jsx global>{`
        * {
          scroll-behavior: smooth;
        }
        body {
          background-color: black;
          color: white;
          font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", sans-serif;
        }
        ::-webkit-scrollbar {
          width: 8px;
        }
        ::-webkit-scrollbar-track {
          background: #0a0a0a;
          border-radius: 4px;
        }
        ::-webkit-scrollbar-thumb {
          background: #404040;
          border-radius: 4px;
        }
        ::-webkit-scrollbar-thumb:hover {
          background: #606060;
        }
      `}</style>

      <div className="max-w-6xl mx-auto">
        <h1 className="text-white text-3xl font-bold text-center mb-8">YouTube Shorts</h1>
        <VideoGrid videos={videosData} />
      </div>
    </div>
  )
}
