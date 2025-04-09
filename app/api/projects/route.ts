import { NextRequest, NextResponse } from "next/server";
import { prisma } from "../../../prisma/prismaClient";
import { ProjectDomainEnum, ProjectTypeEnum, ProjectApprovalStatus } from "@prisma/client";

export const GET = async (req: NextRequest) => {
  try {
    const { searchParams } = new URL(req.url);    // Get query parameters with defaults
    const page = Math.max(parseInt(searchParams.get("page") || "1"), 1); // Ensure page is at least 1
    const limit = Math.max(parseInt(searchParams.get("limit") || "9"), 1); // Ensure limit is at least 1
    const search = searchParams.get("search") || "";
    
    // Get filter parameters using the same keys as frontend
    const projectTypes = searchParams.getAll("projectTypes") as ProjectTypeEnum[];
    const domains = searchParams.getAll("domains") as ProjectDomainEnum[];
    const statusValues = searchParams.getAll("status") as ProjectApprovalStatus[];
    const sdgGoals = searchParams.getAll("sdgGoals");
    const years = searchParams.getAll("years");
    const techStack = searchParams.getAll("techStack");

    // Calculate skip for pagination
    const skip = (page - 1) * limit;    // Build filter conditions
    const whereClause: any = {
      projectContent: {
        associations: {},
        status: {
          // If no status values are provided, default to showing only APPROVED projects
          approved_status: statusValues.length > 0 
            ? { in: statusValues } 
            : ProjectApprovalStatus.APPROVED
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

    // Initialize association filters array to handle multiple association types
    const associationFilters = [];

    // Add filters for project types
    if (projectTypes.length > 0) {
      associationFilters.push({
        type: "PROJECT_TYPE",
        projectType: { in: projectTypes },
      });
    }

    // Add filters for domains
    if (domains.length > 0) {
      associationFilters.push({
        type: "PROJECT_DOMAIN",
        domain: { in: domains },
      });
    }

    // Add filters for SDG goals
    if (sdgGoals.length > 0) {
      associationFilters.push({
        type: "SDG_GOAL",
        sdgGoalName: { in: sdgGoals },
      });
    }

    // Add filters for tech stack
    if (techStack.length > 0) {
      associationFilters.push({
        type: "TECH_STACK",
        technologyName: { in: techStack },
      });
    }

    // Apply association filters if any exist
    if (associationFilters.length > 0) {
      whereClause.projectContent.associations.some = {
        OR: associationFilters
      };
    }

    // Add filter for years if provided
    if (years.length > 0) {
      whereClause.createdAt = {
        OR: years.map(year => ({
          gte: new Date(`${year}-01-01`),
          lte: new Date(`${year}-12-31`),
        }))
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
