// Copyright (c) 2025, Psycode Lab's (https://www.psycodelabs.lk). All Rights Reserved.
//
// This software is the property of Psycode Lab's. and its suppliers, if any.
// Dissemination of any information or reproduction of any material contained
// herein in any form is strictly forbidden, unless permitted by Psycode Lab's expressly.
// You may not alter or remove any copyright or other notice from copies of this content.
"use client";
import Image from "next/image";
import { useState } from "react";  
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import AwardCard from "@/components/competition/AwardCard";
import { useGetCompetitionAwards } from "@/hooks/awards/useGetCompetitionAwards";
import { useCompetitionInfo } from "@/hooks/competition/useCompetitionInfo";

export default function CompetitionPage({
  params,
}: {
  params: { competition: string };
}) {
  const competitionId = params.competition;
  const [showFull, setShowFull] = useState(false);
  const {
    awards,
    isLoading: isAwardsLoading,
    error: awardsError,
  } = useGetCompetitionAwards(competitionId);
  const {
    competition,
    isLoading: isCompetitionLoading,
    error: competitionError,
  } = useCompetitionInfo(competitionId);

  if (isAwardsLoading || isCompetitionLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-#0c0a09">
        <svg
          className="animate-spin h-12 w-12 text-blue-500"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          {/* <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          ></circle> */}
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8v8z"
          ></path>
        </svg>
      </div>
    );
  }
  if (awardsError || competitionError) {
    return (
      <div className="min-h-screen flex items-center justify-center text-red-500">
        Failed to load awards or competition info.
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-#0c0a09 ">
      {/* Darker Animated Background  removed this by commenting */}
      {/* <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-60 sm:w-80 h-60 sm:h-80 bg-blue-900 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-pulse"></div>
        <div
          className="absolute -bottom-40 -left-40 w-60 sm:w-80 h-60 sm:h-80 bg-blue-800 rounded-full mix-blend-multiply filter blur-xl opacity-15 animate-pulse"
          style={{ animationDelay: "2s" }}
        ></div>
        <div
          className="absolute top-1/2 left-1/2 w-60 sm:w-80 h-60 sm:h-80 bg-blue-900 rounded-full mix-blend-multiply filter blur-xl opacity-8 animate-pulse"
          style={{ animationDelay: "4s" }}
        ></div>
      </div> */}

      {/* Header */}
      <div className="relative bg-#0c0a09 backdrop-blur-sm border-b border-gray-800">
        <div className="container mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 2xl:px-20 py-8 sm:py-12 md:py-16">
          <Link
            href="/competitions"
            className="inline-flex items-center gap-2 text-gray-400 hover:text-white mb-6 sm:mb-8 transition-all duration-300 hover:translate-x-1 text-sm sm:text-base"
          >
            <ArrowLeft className="w-3 h-3 sm:w-4 sm:h-4" />
            Back to Awards
          </Link>

          <div className="text-center">
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-white mb-3 sm:mb-4 leading-tight">
              {competition?.title || "Competition Title"}
            </h1>

            <p
              className={`text-sm sm:text-base md:text-lg lg:text-xl text-gray-400 mb-2 max-w-5xl mx-auto text-justify px-0.5 sm:px-1 ${
                showFull ? "" : "line-clamp-5"
              }`}
            >
              {competition?.description ||
                "Competition description goes here. It should be a brief and engaging summary of the competition's focus and goals."}
            </p>

            {/* Toggle Button */}
            <button
              onClick={() => setShowFull(!showFull)}
              className="text-blue-400 text-sm hover:underline mb-2"
            >
              {showFull ? "Show less" : "View more"}
            </button>

            <p className="text-xs sm:text-sm md:text-base text-gray-500">
                {competition?.startDate && competition?.endDate
                ? `Date: ${new Date(competition.startDate).toLocaleDateString("en-GB").replace(/\//g, ".")} - ${new Date(competition.endDate).toLocaleDateString("en-GB").replace(/\//g, ".")}`
                : ""}
            </p>
          </div>
        </div>
      </div>

      {/* Winners Grid */}
      <div className="relative container mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 2xl:px-20 py-12 sm:py-16 md:py-20">
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3 sm:mb-4">
            Competition Winners
          </h2>
          <p className="text-sm sm:text-base text-gray-400">

            {/* change this line  :- Hover over each team to see their project details */}
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-3 gap-4 sm:gap-6 md:gap-8 max-w-7xl mx-auto">
          {awards.map((winner) => (
            <AwardCard key={winner.id} winner={winner} />
          ))}
        </div>

        {/* Show project details on mobile */}
        <div className="sm:hidden mt-8 space-y-4">
          <h3 className="text-lg font-bold text-white text-center mb-4">
            Project Details
          </h3>
          {awards.map((winner) => (
            <div
              key={`mobile-${winner.id}`}
              className="bg-gray-900/50 backdrop-blur-sm rounded-xl p-4 border border-gray-800"
            >
              <div className="flex items-start gap-3">
                <div className="bg-gray-800 px-2 py-1 rounded-full flex-shrink-0">
                  <span className="text-xs font-bold text-white">
                    {winner.award}
                  </span>
                </div>
                <div>
                  <h4 className="font-bold text-white text-sm mb-1">
                    {winner.projectName}
                  </h4>
                  <h5 className="font-medium text-gray-300 text-xs mb-2">
                    Team {winner.team} | SDGP {winner.sdgpYear}
                  </h5>
                  <p className="text-gray-400 text-xs leading-relaxed">
                    {winner.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
