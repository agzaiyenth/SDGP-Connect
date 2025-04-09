import { NextRequest, NextResponse } from "next/server";
import { prisma } from "../../../prisma/prismaClient";
import { ProjectDomainEnum, ProjectTypeEnum, ProjectApprovalStatus } from "@prisma/client";

export const GET = async (req: NextRequest) => {
  try {
    const { searchParams } = new URL(req.url);

    // Get query parameters with defaults
    const page = Math.max(parseInt(searchParams.get("page") || "1"), 1); // Ensure page is at least 1
    const limit = Math.max(parseInt(searchParams.get("limit") || "9"), 1); // Ensure limit is at least 1
    const search = searchParams.get("search") || "";
    const types = searchParams.getAll("types") as ProjectTypeEnum[];
    const domains = searchParams.getAll("domains") as ProjectDomainEnum[];
    const statusValues = searchParams.getAll("status") as ProjectApprovalStatus[];

    // Calculate skip for pagination
    const skip = (page - 1) * limit;

    // Build filter conditions
    const whereClause: any = {
      projectContent: {
        associations: {},
        status: {
          approved_status: { in: statusValues },
        },
      },
    };

    // Add search filter if provided
    if (search) {
      whereClause.OR = [
        { title: { contains: search, mode: 'insensitive' } },
        { subtitle: { contains: search, mode: 'insensitive' } }
      ];
    }

    // Add filters for project types
    if (types.length > 0) {
      whereClause.projectContent.associations.some = {
        type: "PROJECT_TYPE",
        projectType: { in: types },
      };
    }

    // Add filters for domains
    if (domains.length > 0) {
      whereClause.projectContent.associations.some = {
        ...whereClause.projectContent.associations.some,
        type: "PROJECT_DOMAIN",
        domain: { in: domains },
      };
    }

    // Count total projects matching the criteria
    const totalProjects = await prisma.projectMetadata.count({
      where: whereClause,
    });

    const totalPages = Math.ceil(totalProjects / limit);

    // Fetch projects with pagination
    const projects = await prisma.projectMetadata.findMany({
      where: whereClause,
      take: limit,
      skip: skip,
      orderBy: {
        updatedAt: 'desc',
      },
      select: {
        project_id: true,
        title: true,
        subtitle: true,
        cover_image: true,
        projectContent: {
          select: {
            status: {
              select: {
                approved_status: true,
              },
            },
            associations: {
              where: {
                OR: [
                  { type: "PROJECT_TYPE" },
                  { type: "PROJECT_DOMAIN" },
                ],
              },
              select: {
                type: true,
                projectType: true,
                domain: true,
              },
            },
          },
        },
      },
    });

    // Transform the projects into the required format for the frontend
    const formattedProjects = projects.map((project) => {
      const projectTypes =
        project.projectContent?.associations
          .filter((assoc) => assoc.type === "PROJECT_TYPE" && assoc.projectType)
          .map((assoc) => assoc.projectType as ProjectTypeEnum) || [];

      const domains =
        project.projectContent?.associations
          .filter((assoc) => assoc.type === "PROJECT_DOMAIN" && assoc.domain)
          .map((assoc) => assoc.domain as ProjectDomainEnum) || [];

      return {
        id: project.project_id,
        title: project.title,
        subtitle: project.subtitle,
        coverImage: project.cover_image,
        status: project.projectContent?.status?.approved_status || ProjectApprovalStatus.PENDING,
        projectTypes,
        domains,
      };
    });    // Return the paginated response
    return NextResponse.json({
      data: formattedProjects,
      metadata: {
        currentPage: page,
        totalPages,
        totalItems: totalProjects,
        itemsPerPage: limit,
        hasNextPage: page < totalPages,
        hasPrevPage: page > 1,
      },
    });
  } catch (error) {
    console.error("Error fetching projects:", error);
    return NextResponse.json(
      { error: "Failed to fetch projects" },
      { status: 500 }
    );
  }
};
