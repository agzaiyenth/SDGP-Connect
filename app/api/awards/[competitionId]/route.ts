import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/prisma/prismaClient";

export const GET = async (
  req: NextRequest,
  context: { params: { competitionId: string } }
) => {
  try {
    const params = await context.params;
    const competitionId = params.competitionId;
    if (!competitionId) {
      return NextResponse.json({ error: "competitionId is required" }, { status: 400 });
    }

    // Fetch all awards for this competition, including project info
    const awards = await prisma.award.findMany({
      where: { competition_id: competitionId },
      include: {
        project: true
      }
    });

    // Format response
    const result = awards.map((award) => ({
      id: award.project?.project_id || "", // Use project.project_id for navigation
      projectName: award.project?.title || "",
      team: award.project?.group_num || "",
      sdgpYear: award.project?.sdgp_year || "",
      cover: award.image || "",
      award: award.name,
      description: award.project?.subtitle || "",
    }));

    return NextResponse.json({ awards: result });
  } catch (error) {
    console.error("Error fetching awards by competition:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
};
