'use client'
import Image from "next/image"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import AwardCard from "@/components/competition/AwardCard"
import { useGetCompetitionAwards } from "@/hooks/awards/useGetCompetitionAwards"
import { useCompetitionInfo } from "@/hooks/competition/useCompetitionInfo"

export default function CompetitionPage({ params }: { params: { competition: string } }) {
  const competitionId = params.competition
  const { awards, isLoading: isAwardsLoading, error: awardsError } = useGetCompetitionAwards(competitionId)
  const { competition, isLoading: isCompetitionLoading, error: competitionError } = useCompetitionInfo(competitionId)

  if (isAwardsLoading || isCompetitionLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <svg className="animate-spin h-12 w-12 text-blue-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"></path>
        </svg>
      </div>
    )
  }
  if (awardsError || competitionError) {
    return <div className="min-h-screen flex items-center justify-center text-red-500">Failed to load awards or competition info.</div>
  }

  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className="relative overflow-hidden">
        <div className="relative container mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 2xl:px-20 py-12 sm:py-16 md:py-20 lg:py-24">
          <Link
            href="/competitions"
            className="inline-flex items-center gap-2 text-gray-400 hover:text-blue-400 mb-8 sm:mb-12 transition-all duration-300 hover:translate-x-1 text-sm sm:text-base group"
          >
            <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5 transition-transform group-hover:-translate-x-1" />
            <span className="font-medium">Back to Awards</span>
          </Link>

          <div className="text-center max-w-6xl mx-auto">
            {/* Main title */}
            <div className="relative mb-6 sm:mb-8">
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-white via-blue-100 to-blue-200 mb-4 leading-tight tracking-tight">
                {competition?.title || "Competition Title"}
              </h1>
            </div>

            {/* Description */}
            <div className="relative mb-8 sm:mb-10">
              <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-300 leading-relaxed max-w-4xl mx-auto font-light">
                {competition?.description || "Competition description goes here. It should be a brief and engaging summary of the competition's focus and goals."}
              </p>
            </div>

            {/* Date */}
            {competition?.startDate && competition?.endDate && (
              <div className="inline-flex items-center gap-3 bg-gradient-to-r from-blue-900/30 to-purple-900/30 backdrop-blur-sm border border-blue-500/20 rounded-full px-6 py-3 sm:px-8 sm:py-4">
                <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
                <span className="text-sm sm:text-base md:text-lg font-medium text-blue-100 tracking-wide">
                  {new Date(competition.startDate).toLocaleDateString('en-GB', { 
                    day: 'numeric', 
                    month: 'long', 
                    year: 'numeric' 
                  })} - {new Date(competition.endDate).toLocaleDateString('en-GB', { 
                    day: 'numeric', 
                    month: 'long', 
                    year: 'numeric' 
                  })}
                </span>
                <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse" style={{ animationDelay: '1s' }}></div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Winners Grid */}
      <div className="relative container mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 2xl:px-20 py-12 sm:py-16 md:py-20">
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3 sm:mb-4">Competition Winners</h2>
          <p className="text-sm sm:text-base text-gray-400">Hover over each team to see their project details</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-3 gap-4 sm:gap-6 md:gap-8 max-w-7xl mx-auto">
          {awards.map((winner) => (
            <div key={winner.id} className="bg-b border border-white rounded-lg overflow-hidden">
              <AwardCard winner={winner} />
            </div>
          ))}
        </div>

        {/* Show project details on mobile */}
        <div className="sm:hidden mt-8 space-y-4">
          <h3 className="text-lg font-bold text-white text-center mb-4">Project Details</h3>
          {awards.map((winner) => (
            <div key={`mobile-${winner.id}`} className="bg-black border border-white rounded-xl p-4">
              <div className="flex items-start gap-3">
                <div className="bg-gray-800 px-2 py-1 rounded-full flex-shrink-0">
                  <span className="text-xs font-bold text-white">{winner.award}</span>
                </div>
                <div>
                  <h4 className="font-bold text-white text-sm mb-1">{winner.projectName}</h4>
                  <h5 className="font-medium text-gray-300 text-xs mb-2">Team {winner.team} | SDGP {winner.sdgpYear}</h5>
                  <p className="text-gray-400 text-xs leading-relaxed">{winner.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
