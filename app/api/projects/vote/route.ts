import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/prisma/prismaClient";
import { ProjectApprovalStatus, AssociationType } from "@prisma/client";
import { sanitizeIP, extractIPFromForwarded, getIPStatus } from "@/lib/ip-utils";

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
        contains: title
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

    // --- Get ALL approved projects for global ranking ---
    const allProjects = await prisma.projectMetadata.findMany({
      where: {
        projectContent: {
          status: {
            approved_status: ProjectApprovalStatus.APPROVED
          }
        }
      },
      include: {
        projectContent: {
          include: {
            status: true,
            associations: true
          }
        }
      }
    });

    // --- Get vote counts for all projects ---
    const allProjectIds = allProjects.map(p => p.project_id);
    const allVoteCounts = await prisma.projectVote.groupBy({
      by: ['projectId'],
      where: {
        projectId: {
          in: allProjectIds
        }
      },
      _count: {
        id: true
      }
    });
    const allVoteCountMap = new Map();
    allVoteCounts.forEach(vote => {
      allVoteCountMap.set(vote.projectId, vote._count.id);
    });
    // --- Sort all projects by vote count for global ranking ---
    const allSortedProjects = allProjects.sort((a, b) => {
      const aVotes = allVoteCountMap.get(a.project_id) || 0;
      const bVotes = allVoteCountMap.get(b.project_id) || 0;
      return bVotes - aVotes;
    });
    // --- Map projectId to global rank ---
    const projectIdToRank = new Map();
    allSortedProjects.forEach((proj, idx) => {
      projectIdToRank.set(proj.project_id, idx + 1);
    });
    // --- Prepare global top 3 for podium ---
    const globalTop3 = allSortedProjects.slice(0, 3).map(project => ({
      id: project.project_id,
      title: project.title,
      subtitle: project.subtitle,
      coverImage: project.cover_image,
      status: project.projectContent?.status?.status || null,
      projectTypes: project.projectContent?.associations?.filter((a: any) => a.type === "PROJECT_TYPE" && a.projectType)?.map((a: any) => a.projectType!) || [],
      domains: project.projectContent?.associations?.filter((a: any) => a.type === "PROJECT_DOMAIN" && a.domain)?.map((a: any) => a.domain!) || [],
      voteCount: allVoteCountMap.get(project.project_id) || 0,
      globalRank: projectIdToRank.get(project.project_id)
    }));

    // --- Transform data for paginated/search result, include global rank ---
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
      voteCount: voteCountMap.get(project.project_id) || 0,
      globalRank: projectIdToRank.get(project.project_id)
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
      meta,
      podium: globalTop3
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
    const { projectId, clientIP } = await req.json();

    if (!projectId) {
      return NextResponse.json(
        { error: "Project ID is required" },
        { status: 400 }
      );
    }    // Get the user's IP address for vote tracking with multiple fallback methods
    let ip = sanitizeIP(clientIP);
    
    // If client didn't provide valid IP, try to extract from headers
    if (ip === 'unknown') {
      // Try various header sources in order of reliability
      const cfConnectingIp = req.headers.get("cf-connecting-ip"); // Cloudflare
      const xRealIp = req.headers.get("x-real-ip");
      const xForwardedFor = req.headers.get("x-forwarded-for");
      const xClientIp = req.headers.get("x-client-ip");
      const xClusterClientIp = req.headers.get("x-cluster-client-ip");
      const forwarded = req.headers.get("forwarded");

      if (cfConnectingIp) {
        // Cloudflare provides the most reliable IP
        ip = sanitizeIP(cfConnectingIp);
      } else if (xRealIp) {
        // x-real-ip is usually set by reverse proxies
        ip = sanitizeIP(xRealIp);
      } else if (xForwardedFor) {
        // x-forwarded-for can contain multiple IPs, take the first one
        ip = extractIPFromForwarded(xForwardedFor);
      } else if (xClientIp) {
        ip = sanitizeIP(xClientIp);
      } else if (xClusterClientIp) {
        ip = sanitizeIP(xClusterClientIp);
      } else if (forwarded) {
        // Parse the forwarded header (format: for=192.0.2.60;proto=http;by=203.0.113.43)
        const forMatch = forwarded.match(/for=([^;,\s]+)/);
        if (forMatch) {
          ip = sanitizeIP(forMatch[1].replace(/"/g, '')); // Remove quotes if present
        }
      }
    }

    // Log IP detection for debugging (remove in production)
    const ipStatus = getIPStatus(ip);
    console.log('IP Detection Debug:', {
      clientProvided: clientIP,
      finalIP: ip,
      status: ipStatus,
      headers: {
        'cf-connecting-ip': req.headers.get("cf-connecting-ip"),
        'x-real-ip': req.headers.get("x-real-ip"),
        'x-forwarded-for': req.headers.get("x-forwarded-for"),
      }
    });    // Check if project exists and is approved
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
      voteCount,
      voterIP: ip // Return the IP used for voting (for debugging, remove in production)
    });

  } catch (error) {
    console.error("Error casting vote:", error);
    return NextResponse.json(
      { error: "Failed to cast vote" },
      { status: 500 }
    );
  }
};
