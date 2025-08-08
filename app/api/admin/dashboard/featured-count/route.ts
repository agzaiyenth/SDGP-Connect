import { prisma } from "@/prisma/prismaClient";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const featuredCount = await prisma.projectMetadata.count({
      where: {
        featured: true
      }
    });
    
    return NextResponse.json({
      count: featuredCount,
    }, { status: 200 });
  } catch (error) {
    console.error("Error fetching featured projects count:", error);
    return NextResponse.json(
      { error: "Failed to fetch featured projects count" },
      { status: 500 }
    );
  }
}
