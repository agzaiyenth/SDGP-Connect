import { prisma } from "@/prisma/prismaClient";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, context: { params: { id: string } }) {
  const { params } = await context;
  const { id } = params;
  if (!id) {
    return NextResponse.json({ error: "Award id is required" }, { status: 400 });
  }

  try {
    const award = await prisma.award.findUnique({
      where: { id },
      include: {
        competition: true,
        project: true,
        accepted_by: true,
        rejected_by: true,
      },
    });
    if (!award) {
      return NextResponse.json({ error: "Award not found" }, { status: 404 });
    }
    return NextResponse.json({ award });
  } catch (error) {
    console.error("Error fetching award by id:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
