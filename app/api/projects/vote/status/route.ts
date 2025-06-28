import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/prisma/prismaClient";

export const GET = async (req: NextRequest) => {
  try {
    // Get the user's IP address
    const forwarded = req.headers.get("x-forwarded-for");
    const realIp = req.headers.get("x-real-ip");
    const ip = forwarded ? forwarded.split(",")[0] : realIp || "unknown";

    // Check if user has voted
    const existingVote = await prisma.projectVote.findUnique({
      where: {
        voterIp: ip
      },
      select: {
        projectId: true,
        voteChangeCount: true,
        createdAt: true,
        updatedAt: true
      }
    });

    return NextResponse.json({
      hasVoted: !!existingVote,
      votedProjectId: existingVote?.projectId || null,
      voteChangeCount: existingVote?.voteChangeCount || 0,
      firstVotedAt: existingVote?.createdAt || null,
      lastVotedAt: existingVote?.updatedAt || null
    });

  } catch (error) {
    console.error("Error checking vote status:", error);
    return NextResponse.json(
      { error: "Failed to check vote status" },
      { status: 500 }
    );
  }
};
