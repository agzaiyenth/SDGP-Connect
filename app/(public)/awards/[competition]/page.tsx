import Image from "next/image"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"

const competitionData = {
  "hackathon-2024": {
    title: "Tech Innovation Hackathon 2024",
    description: "48-hour coding challenge focused on sustainable technology solutions",
    date: "March 15-17, 2024",
    winners: [
      {
        id: 1,
        teamName: "EcoTech Innovators",
        projectName: "GreenGrid - Smart Energy Management",
        award: "1st Place",
        image: '/assets/1.jpg',
        description: "Revolutionary IoT solution for optimizing energy consumption in smart buildings",
      },
      {
        id: 2,
        teamName: "Ocean Guardians",
        projectName: "AquaClean - Ocean Plastic Tracker",
        award: "2nd Place",
        image: '/assets/1.jpg',
        description: "AI-powered platform for tracking and cleaning ocean plastic pollution",
      },
      {
        id: 3,
        teamName: "Carbon Crushers",
        projectName: "CarbonZero - Personal Carbon Tracker",
        award: "3rd Place",
        image: '/assets/1.jpg',
        description: "Mobile app that gamifies personal carbon footprint reduction",
      },
      {
        id: 4,
        teamName: "Solar Squad",
        projectName: "SunSync - Solar Panel Optimizer",
        award: "Best Innovation",
        image: '/assets/1.jpg',
        description: "Machine learning algorithm for maximizing solar panel efficiency",
      },
      {
        id: 5,
        teamName: "Green Coders",
        projectName: "EcoCommute - Sustainable Transport",
        award: "People's Choice",
        image: '/assets/1.jpg',
        description: "Platform connecting commuters for eco-friendly transportation sharing",
      },
      {
        id: 6,
        teamName: "Climate Champions",
        projectName: "WeatherWise - Climate Predictor",
        award: "Best Presentation",
        image: '/assets/1.jpg',
        description: "Advanced weather prediction system for climate-resilient agriculture",
      },
    ],
  },
  "design-challenge": {
    title: "UI/UX Design Challenge",
    description: "Creative design competition for mobile app interfaces",
    date: "February 20-22, 2024",
    winners: [
      {
        id: 1,
        teamName: "Pixel Pioneers",
        projectName: "MindfulMoments - Meditation App",
        award: "1st Place",
        image: '/assets/1.jpg',
        description: "Beautifully designed meditation app with personalized mindfulness journeys",
      },
      {
        id: 2,
        teamName: "Design Dynamos",
        projectName: "FoodieFind - Restaurant Discovery",
        award: "2nd Place",
        image: '/assets/1.jpg',
        description: "Intuitive restaurant discovery app with AR menu previews",
      },
      {
        id: 3,
        teamName: "Creative Collective",
        projectName: "StudyBuddy - Learning Companion",
        award: "3rd Place",
        image: '/assets/1.jpg',
        description: "Collaborative study app with gamified learning experiences",
      },
      {
        id: 4,
        teamName: "Interface Icons",
        projectName: "HealthHub - Wellness Tracker",
        award: "Best Visual Design",
        image: '/assets/1.jpg',
        description: "Comprehensive health tracking app with beautiful data visualizations",
      },
    ],
  },
}

export default function CompetitionPage({ params }: { params: { competition: string } }) {
  const competition = competitionData[params.competition as keyof typeof competitionData]

  if (!competition) {
    return (
      <div className="min-h-screen bg-#0c0a09 flex items-center justify-center px-4 ">
        <div className="text-center">
          <h1 className="text-xl sm:text-2xl font-bold text-white mb-4">Competition Not Found</h1>
          <Link href="/awards" className="text-gray-400 hover:text-white transition-colors">
            ← Back to Awards
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-#0c0a09 ">
      {/* Darker Animated Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-60 sm:w-80 h-60 sm:h-80 bg-blue-900 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-60 sm:w-80 h-60 sm:h-80 bg-blue-800 rounded-full mix-blend-multiply filter blur-xl opacity-15 animate-pulse" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-1/2 left-1/2 w-60 sm:w-80 h-60 sm:h-80 bg-blue-900 rounded-full mix-blend-multiply filter blur-xl opacity-8 animate-pulse" style={{ animationDelay: '4s' }}></div>
      </div>

      {/* Header */}
      <div className="relative bg-#0c0a09 backdrop-blur-sm border-b border-gray-800">
        <div className="container mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 2xl:px-20 py-8 sm:py-12 md:py-16">
          <Link
            href="/awards"
            className="inline-flex items-center gap-2 text-gray-400 hover:text-white mb-6 sm:mb-8 transition-all duration-300 hover:translate-x-1 text-sm sm:text-base"
          >
            <ArrowLeft className="w-3 h-3 sm:w-4 sm:h-4" />
            Back to Awards
          </Link>

          <div className="text-center">
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-white mb-3 sm:mb-4 leading-tight">
              {competition.title}
            </h1>
            <p className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-400 mb-2 max-w-4xl mx-auto">
              {competition.description}
            </p>
            <p className="text-xs sm:text-sm md:text-base text-gray-500">{competition.date}</p>
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
          {competition.winners.map((winner, index) => (
            <div
              key={winner.id}
              className="group relative bg-gray-900 backdrop-blur-sm rounded-2xl sm:rounded-3xl overflow-hidden border border-gray-800 hover:border-gray-700 transition-all duration-500 hover:scale-[1.03] hover:shadow-2xl hover:shadow-blue-950/30 h-[380px] sm:h-[420px] md:h-[450px] flex flex-col"
              style={{
                animationDelay: `${index * 100}ms`,
              }}
            >
              {/* Subtle Blue Glow on Hover */}
              <div className="absolute inset-0 bg-blue-950 opacity-0 group-hover:opacity-15 transition-opacity duration-500 rounded-2xl sm:rounded-3xl"></div>

              {/* Team Image */}
              <div className="relative h-48 sm:h-56 md:h-64 overflow-hidden flex-shrink-0">
                <Image
                  src={winner.image}
                  alt={winner.teamName}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-700"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw"
                />
                
                {/* Base gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-60 group-hover:opacity-30 transition-opacity duration-300" />

                {/* Award Badge */}
                <div className="absolute top-3 left-3 sm:top-4 sm:left-4 z-10">
                  <div className="bg-gray-800/90 backdrop-blur-sm border border-gray-700 px-2 py-1 sm:px-3 sm:py-1.5 md:px-4 md:py-2 rounded-full shadow-lg">
                    <span className="font-bold text-xs sm:text-sm text-white">{winner.award}</span>
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
                  {winner.teamName}
                </h3>
                <p className="text-xs sm:text-sm md:text-base text-gray-400 font-medium line-clamp-2 leading-relaxed">
                  {winner.projectName}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Show project details on mobile */}
        <div className="sm:hidden mt-8 space-y-4">
          <h3 className="text-lg font-bold text-white text-center mb-4">Project Details</h3>
          {competition.winners.map((winner) => (
            <div key={`mobile-${winner.id}`} className="bg-gray-900/50 backdrop-blur-sm rounded-xl p-4 border border-gray-800">
              <div className="flex items-start gap-3">
                <div className="bg-gray-800 px-2 py-1 rounded-full flex-shrink-0">
                  <span className="text-xs font-bold text-white">{winner.award}</span>
                </div>
                <div>
                  <h4 className="font-bold text-white text-sm mb-1">{winner.teamName}</h4>
                  <h5 className="font-medium text-gray-300 text-xs mb-2">{winner.projectName}</h5>
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