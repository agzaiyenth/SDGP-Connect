import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/prisma/prismaClient";
import { ProjectApprovalStatus } from "@prisma/client";

export const GET = async (req: NextRequest) => {
  try {
    const { searchParams } = new URL(req.url);

    // Get search query and pagination params
    const query = searchParams.get("q") || "";
    const limit = Math.min(parseInt(searchParams.get("limit") || "5", 10), 20); // Max 20, default 5

    // Build where condition for search
    let whereCondition: any = {};  // fetch all projects by default, filter by title if query

    // Add search condition if query exists
    if (query.trim()) {
      whereCondition.title = { contains: query };
    }

    // Debug: log the whereCondition
    console.log('Project search whereCondition:', JSON.stringify(whereCondition));

    // Build query options with explicit empty where
const findOptions: any = {
  where: {
    projectContent: {
      status: {
        approved_status: ProjectApprovalStatus.APPROVED,
      },
    },
    ...(query.trim() && {
      title: {
        contains: query,
      },
    }),
  },
  select: {
    project_id: true,
    title: true,
    logo: true,
    group_num: true,
    sdgp_year: true,
  },
  orderBy: {
    createdAt: 'desc',
  },
  take: limit,
};

    const projects = await prisma.projectMetadata.findMany(findOptions);

    return NextResponse.json(projects);
  } catch (error: any) {
    console.error("Error fetching projects:", error, error?.message, error?.stack);
    return NextResponse.json(
      { error: "Failed to fetch projects", details: error?.message || error },
      { status: 500 }
    );
  }
};
