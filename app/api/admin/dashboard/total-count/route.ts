import { NextResponse } from "next/server";
import {prisma} from "@/prisma/prismaClient";

export async function GET() {
  try {
    const totalCount = await prisma.projectMetadata.count();
    
    return NextResponse.json({
      count: totalCount,
    }, { status: 200 });
  } catch (error) {
    console.error("Error fetching total projects count:", error);
    return NextResponse.json(
      { error: "Failed to fetch total projects count" },
      { status: 500 }
    );
  }
}
