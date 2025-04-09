import { NextRequest, NextResponse } from "next/server";
import { prisma } from "../../../prisma/prismaClient";
import { ProjectDomainEnum, ProjectStatusEnum, ProjectTypeEnum } from "@prisma/client";

// Make sure to export as a named export (not default)
export const GET = async (req: NextRequest) => {
  try {
    const { searchParams } = new URL(req.url);
    
    // Get query parameters with defaults
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "9");
    const search = searchParams.get("search") || "";
    const types = searchParams.getAll("types") as ProjectTypeEnum[];
    const domains = searchParams.getAll("domains") as ProjectDomainEnum[];
    const statusValues = searchParams.getAll("status") as ProjectStatusEnum[];
    
    // Calculate skip for pagination
    const skip = (page - 1) * limit;
    
    // Build filter conditions
    const whereClause: any = {
      projectContent: {
        associations: { },
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
      whereClause.projectContent = {
        ...whereClause.projectContent,
        associations: {
          some: {
            type: "PROJECT_TYPE",
            projectType: { in: types }
          }
        }
      };
    }
    
    // Add filters for domains
    if (domains.length > 0) {
      whereClause.projectContent = {
        ...whereClause.projectContent,
        associations: {
          some: {
            type: "PROJECT_DOMAIN",
            domain: { in: domains }
          }
        }
      };
    }
    
    // Add filters for status
    if (statusValues.length > 0) {
      whereClause.projectContent = {
        ...whereClause.projectContent,
        status: {
          status: { in: statusValues }
        }
      };
    }

    // Only return approved projects in the public view
    whereClause.projectContent = {
      ...whereClause.projectContent,
      status: {
        ...whereClause.projectContent?.status,
        approved_status: "APPROVED"
      }
    };
    
    // Count total projects matching the criteria
    const totalProjects = await prisma.projectMetadata.count({
      where: whereClause
    });
    
    const totalPages = Math.ceil(totalProjects / limit);
    
    // Fetch projects with pagination
    const projects = await prisma.projectMetadata.findMany({
      where: whereClause,
      take: limit,
      skip: skip,
      orderBy: {
        updatedAt: 'desc'
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
                status: true
              }
            },
            associations: {
              where: {
                OR: [
                  { type: "PROJECT_TYPE" },
                  { type: "PROJECT_DOMAIN" }
                ]
              },
              select: {
                type: true,
                projectType: true,
                domain: true
              }
            }
          }
        }
      }
    });
    
    // Transform the projects into the required format for the frontend
    const formattedProjects = projects.map(project => {
      // Filter associations for project types
      const projectTypes = project.projectContent?.associations
        .filter(assoc => assoc.type === "PROJECT_TYPE" && assoc.projectType)
        .map(assoc => assoc.projectType as ProjectTypeEnum) || [];
      
      // Filter associations for domains
      const domains = project.projectContent?.associations
        .filter(assoc => assoc.type === "PROJECT_DOMAIN" && assoc.domain)
        .map(assoc => assoc.domain as ProjectDomainEnum) || [];
      
      return {
        id: project.project_id,
        title: project.title,
        subtitle: project.subtitle,
        coverImage: project.cover_image,
        status: project.projectContent?.status?.status || ProjectStatusEnum.IDEA,
        projectTypes,
        domains
      };
    });
    
    // Return the paginated response
    return NextResponse.json({
      data: formattedProjects,
      meta: {
        currentPage: page,
        totalPages,
        totalItems: totalProjects,
        itemsPerPage: limit,
        hasNextPage: page < totalPages,
        hasPrevPage: page > 1
      }
    });
    
  } catch (error) {
    console.error("Error fetching projects:", error);
    return NextResponse.json(
      { error: "Failed to fetch projects" },
      { status: 500 }
    );
  }
}
