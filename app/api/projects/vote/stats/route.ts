import { NextResponse } from "next/server";
import { prisma } from "@/prisma/prismaClient";

export const GET = async () => {
  try {
    // Get total votes count from ProjectVote table
    const totalVotes = await prisma.projectVote.count();

    return NextResponse.json({
      totalVotes
    });
  } catch (error) {
    console.error("Error fetching vote stats:", error);
    return NextResponse.json(
      { error: "Failed to fetch vote statistics" },
      { status: 500 }
    );
  }
};
