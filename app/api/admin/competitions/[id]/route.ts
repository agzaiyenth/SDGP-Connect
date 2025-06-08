import { prisma } from "@/prisma/prismaClient";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  const { id } = params;
  if (!id) {
    return NextResponse.json({ error: "Competition id is required" }, { status: 400 });
  }

  try {
    const competition = await prisma.competition.findUnique({
      where: { id },
      include: {
        accepted_by: true,
        rejected_by: true,
        awards: true,
      },
    });
    if (!competition) {
      return NextResponse.json({ error: "Competition not found" }, { status: 404 });
    }
    return NextResponse.json({ competition });
  } catch (error) {
    console.error("Error fetching competition by id:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
