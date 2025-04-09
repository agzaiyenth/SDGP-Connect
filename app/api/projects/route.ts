import { NextRequest, NextResponse } from "next/server";
import { prisma } from "../../../prisma/prismaClient";
import { ProjectApprovalStatus } from "@prisma/client";

export const GET = async (req: NextRequest) => {
  try {
    const { searchParams } = new URL(req.url);

    // --- Pagination & Search ---
    const page = Math.max(parseInt(searchParams.get("page") || "1", 10), 1);
    const limit = Math.max(parseInt(searchParams.get("limit") || "9", 10), 1);
    const search = searchParams.get("search") || "";
    const skip = (page - 1) * limit;

    // --- Filter Parameters (as strings from URL) ---
    const projectTypes = searchParams.getAll("projectTypes"); 
    const domains = searchParams.getAll("domains");           
    const statusValues = searchParams.getAll("status");        
    const sdgGoals = searchParams.getAll("sdgGoals");         
    const years = searchParams.getAll("years");                
    const techStack = searchParams.getAll("techStack");       

    // --- Base Where Clause ---
 
    const whereClause: any = {}; 

    // --- Search Filter ---
    if (search) {
      whereClause.OR = [
        { title: { contains: search, mode: 'insensitive' } },
        { subtitle: { contains: search, mode: 'insensitive' } }
      ];
    }

    // --- Year Filter (using sdgp_year string field) ---
    if (years.length > 0) {
      
      whereClause.sdgp_year = { in: years };
    }
    

    // --- Status Filtering ---
    
    const projectStatusValues = statusValues.filter(status =>
      ["IDEA", "MVP", "DEPLOYED", "STARTUP"].includes(status.toUpperCase()) 
    );
    const approvalStatusValues = statusValues.filter(status =>
      ["APPROVED", "PENDING", "REJECTED"].includes(status.toUpperCase())
    );

 
    if (projectStatusValues.length > 0 || approvalStatusValues.length > 0) {
        whereClause.projectContent = whereClause.projectContent || {};
        whereClause.projectContent.status = whereClause.projectContent.status || {};

        if (projectStatusValues.length > 0) {
             whereClause.projectContent.status.status = { in: projectStatusValues };
        }

        if (approvalStatusValues.length > 0) {
            whereClause.projectContent.status.approved_status = { in: approvalStatusValues };
        } else {
              whereClause.projectContent.status.approved_status = ProjectApprovalStatus.APPROVED;
        }
    } else {
          whereClause.projectContent = whereClause.projectContent || {};
        whereClause.projectContent.status = { approved_status: ProjectApprovalStatus.APPROVED };
    }


    // --- Association Filtering ---
    const associationFilters = [];

    if (projectTypes.length > 0) {
       associationFilters.push({
        type: "PROJECT_TYPE",
        projectType: { in: projectTypes }, 
      });
    }
    if (domains.length > 0) {
      associationFilters.push({
        type: "PROJECT_DOMAIN",
        domain: { in: domains },
      });
    }
    if (sdgGoals.length > 0) {
        associationFilters.push({
        type: "PROJECT_SDG",
        sdgGoal: { in: sdgGoals },
      });
    }
    if (techStack.length > 0) {
      associationFilters.push({
        type: "PROJECT_TECH", 
        techStack: { in: techStack },
      });
    }

    // Apply association filters using 'some' if any exist
    if (associationFilters.length > 0) {
      whereClause.projectContent = whereClause.projectContent || {}; 
      whereClause.projectContent.associations = {
        some: {
          OR: associationFilters
        }
      };
    }

    // --- Database Queries ---

    const totalProjects = await prisma.projectMetadata.count({
      where: whereClause,
    });

    const totalPages = Math.ceil(totalProjects / limit);

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
        sdgp_year: true, 
        projectContent: {
          select: {
            status: {
              select: {
                status: true,         
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

    // --- Format Response Data ---
    const formattedProjects = projects.map((project) => {
     
      const associations = project.projectContent?.associations || [];
      const statusInfo = project.projectContent?.status;

      const projectTypesData = associations
        .filter((assoc) => assoc.type === "PROJECT_TYPE" && assoc.projectType)
        .map((assoc) => assoc.projectType); 

      const domainsData = associations
        .filter((assoc) => assoc.type === "PROJECT_DOMAIN" && assoc.domain)
        .map((assoc) => assoc.domain); 


      const displayStatus = statusInfo?.status || "UNKNOWN"; 

      return {
        id: project.project_id,
        title: project.title,
        subtitle: project.subtitle || "", 
        coverImage: project.cover_image,
        status: displayStatus as string, 
        projectTypes: projectTypesData,
        domains: domainsData,     
        year: project.sdgp_year,   
      };
    });

    // Return the paginated response
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
    // Provide more context in error logging if possible
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json(
      { error: "Failed to fetch projects", details: errorMessage },
      { status: 500 }
    );
  }
};