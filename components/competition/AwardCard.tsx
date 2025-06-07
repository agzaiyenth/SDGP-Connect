import Image from "next/image"

interface AwardCardProps {
  winner: {
    id: string
    projectName: string
    team: string
    sdgpYear: string
    cover: string
    name: string
    description: string
    image?: string
  }
}

export default function AwardCard({ winner }: AwardCardProps) {
  return (
    <div
      className="group relative bg-gray-900 backdrop-blur-sm rounded-2xl sm:rounded-3xl overflow-hidden border border-gray-800 hover:border-gray-700 transition-all duration-500 hover:scale-[1.03] hover:shadow-2xl hover:shadow-blue-950/30 h-[380px] sm:h-[420px] md:h-[450px] flex flex-col"
    >
      {/* Subtle Blue Glow on Hover */}
      <div className="absolute inset-0 bg-blue-950 opacity-0 group-hover:opacity-15 transition-opacity duration-500 rounded-2xl sm:rounded-3xl"></div>

      {/* Team Image */}
      <div className="relative h-48 sm:h-56 md:h-64 overflow-hidden flex-shrink-0">
        <Image
          src={winner.cover || winner.image || '/assets/1.jpg'}
          alt={winner.projectName}
          fill
          className="object-cover group-hover:scale-110 transition-transform duration-700"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw"
        />
        {/* Base gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-60 group-hover:opacity-30 transition-opacity duration-300" />
        {/* Award Badge */}
        <div className="absolute top-3 left-3 sm:top-4 sm:left-4 z-10">
          <div className="bg-gray-800/90 backdrop-blur-sm border border-gray-700 px-2 py-1 sm:px-3 sm:py-1.5 md:px-4 md:py-2 rounded-full shadow-lg">
            <span className="font-bold text-xs sm:text-sm text-white">{winner.name}</span>
          </div>
        </div>
        {/* Enhanced Hover Overlay - positioned at bottom */}
        <div className="absolute bottom-0 left-0 right-0 p-3 sm:p-4 md:p-6 bg-gradient-to-t from-black/95 via-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-4 group-hover:translate-y-0">
          <div className="text-white">
            <h4 className="text-sm sm:text-base md:text-lg font-bold mb-1 sm:mb-2">{winner.projectName}</h4>
            <p className="text-xs sm:text-sm text-gray-200 leading-relaxed line-clamp-3 sm:line-clamp-4">
              {winner.description}
            </p>
          </div>
        </div>
        {/* Mobile-friendly tap indicator */}
        <div className="sm:hidden absolute bottom-2 right-2 bg-gray-800/80 backdrop-blur-sm px-2 py-1 rounded-full opacity-70">
          <span className="text-xs text-gray-300">Tap for details</span>
        </div>
      </div>
      {/* Team Details */}
      <div className="p-4 sm:p-5 md:p-6 flex flex-col flex-grow justify-center">
        <h3 className="text-base sm:text-lg md:text-xl font-bold text-white mb-1 sm:mb-2 group-hover:text-gray-200 transition-colors duration-300 line-clamp-1">
          {winner.projectName}
        </h3>
        <p className="text-xs sm:text-sm md:text-base text-gray-400 font-medium line-clamp-2 leading-relaxed">
          Team {winner.team} | SDGP {winner.sdgpYear}
        </p>
      </div>
    </div>
  )
}
