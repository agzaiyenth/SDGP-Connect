import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/prisma/prismaClient";
import { ProjectApprovalStatus, AssociationType } from "@prisma/client";

export const GET = async (req: NextRequest) => {
  try {
    const { searchParams } = new URL(req.url);

    // --- Pagination ---
    const page = Math.max(parseInt(searchParams.get("page") || "1", 10), 1);
    const limit = Math.max(parseInt(searchParams.get("limit") || "10", 10), 1);
    const skip = (page - 1) * limit;

    // --- Filters ---
    const title = searchParams.get("title") || "";

    // --- Build where clause ---
    const baseWhere: any = {
      // Only show approved projects
      projectContent: {
        status: {
          approved_status: ProjectApprovalStatus.APPROVED
        }
      }
    };

    // Title search
    if (title) {
      baseWhere.title = {
        contains: title,
        mode: 'insensitive'
      };
    }

    // --- Get total count for pagination ---
    const totalItems = await prisma.projectMetadata.count({
      where: baseWhere
    });    // --- Get projects with basic data first ---
    const projects = await prisma.projectMetadata.findMany({
      where: baseWhere,
      include: {
        projectContent: {
          include: {
            status: true,
            associations: {
              where: {
                type: {
                  in: [AssociationType.PROJECT_TYPE, AssociationType.PROJECT_DOMAIN]
                }
              }
            }
          }
        }
      },
      skip,
      take: limit
    });

    // If no projects found, return early
    if (projects.length === 0) {
      const totalPages = Math.ceil(totalItems / limit);
      const hasNextPage = page < totalPages;
      const hasPrevPage = page > 1;
      const meta = {
        currentPage: page,
        totalPages,
        totalItems,
        itemsPerPage: limit,
        hasNextPage,
        hasPrevPage
      };
      return NextResponse.json({ data: [], meta });
    }

    // --- Get vote counts for these projects ---
    const projectIds = projects.map(p => p.project_id);
    const voteCounts = await prisma.projectVote.groupBy({
      by: ['projectId'],
      where: {
        projectId: {
          in: projectIds
        }
      },
      _count: {
        id: true
      }
    });

    // --- Create vote count map ---
    const voteCountMap = new Map();
    voteCounts.forEach(vote => {
      voteCountMap.set(vote.projectId, vote._count.id);
    });

    // --- Sort projects by vote count ---
    const sortedProjects = projects.sort((a, b) => {
      const aVotes = voteCountMap.get(a.project_id) || 0;
      const bVotes = voteCountMap.get(b.project_id) || 0;
      return bVotes - aVotes;
    });

    // --- Transform data ---
    const transformedProjects = sortedProjects.map(project => ({
      id: project.project_id,
      title: project.title,
      subtitle: project.subtitle,
      coverImage: project.cover_image,
      status: project.projectContent?.status?.status || null,
      projectTypes: project.projectContent?.associations
        ?.filter((a: any) => a.type === "PROJECT_TYPE" && a.projectType)
        ?.map((a: any) => a.projectType!) || [],
      domains: project.projectContent?.associations
        ?.filter((a: any) => a.type === "PROJECT_DOMAIN" && a.domain)
        ?.map((a: any) => a.domain!) || [],
      voteCount: voteCountMap.get(project.project_id) || 0
    }));

    // --- Calculate pagination metadata ---
    const totalPages = Math.ceil(totalItems / limit);
    const hasNextPage = page < totalPages;
    const hasPrevPage = page > 1;

    const meta = {
      currentPage: page,
      totalPages,
      totalItems,
      itemsPerPage: limit,
      hasNextPage,
      hasPrevPage
    };

    return NextResponse.json({
      data: transformedProjects,
      meta
    });

  } catch (error) {
    console.error("Error fetching projects for voting:", error);
    return NextResponse.json(
      { error: "Failed to fetch projects for voting" },
      { status: 500 }
    );
  }
};

export const POST = async (req: NextRequest) => {
  try {
    const { projectId } = await req.json();

    if (!projectId) {
      return NextResponse.json(
        { error: "Project ID is required" },
        { status: 400 }
      );
    }    // Get the user's IP address for vote tracking
    const forwarded = req.headers.get("x-forwarded-for");
    const realIp = req.headers.get("x-real-ip");
    const ip = forwarded ? forwarded.split(",")[0] : realIp || "unknown";

    // Check if project exists and is approved
    const project = await prisma.projectMetadata.findFirst({
      where: {
        project_id: projectId,
        projectContent: {
          status: {
            approved_status: ProjectApprovalStatus.APPROVED
          }
        }
      }
    });

    if (!project) {
      return NextResponse.json(
        { error: "Project not found or not approved" },
        { status: 404 }
      );
    }

    // Check if user has already voted (by IP)
    const existingVote = await prisma.projectVote.findUnique({
      where: {
        voterIp: ip
      }
    });

    if (existingVote) {
      // User wants to change their vote
      await prisma.projectVote.update({
        where: {
          voterIp: ip
        },
        data: {
          projectId: projectId,
          voteChangeCount: {
            increment: 1
          }
        }
      });
    } else {
      // New vote
      await prisma.projectVote.create({
        data: {
          voterIp: ip,
          projectId: projectId
        }
      });
    }

    // Get updated vote count for this project
    const voteCount = await prisma.projectVote.count({
      where: {
        projectId: projectId
      }
    });

    return NextResponse.json({
      success: true,
      message: existingVote ? "Vote updated successfully" : "Vote cast successfully",
      voteCount
    });

  } catch (error) {
    console.error("Error casting vote:", error);
    return NextResponse.json(
      { error: "Failed to cast vote" },
      { status: 500 }
    );
  }
};
