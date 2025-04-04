import { NextResponse } from 'next/server';
import { prisma } from '@/prisma/prismaClient';
import { ProjectApprovalStatus } from '@prisma/client';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status') as ProjectApprovalStatus;
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    const skip = (page - 1) * limit;

    if (!Object.values(ProjectApprovalStatus).includes(status)) {
      console.error('Invalid status type received:', status);
      return NextResponse.json(
        { error: 'Invalid project status type' },
        { status: 400 }
      );
    }

    console.log(`[API] Fetching projects with status: ${status}, page: ${page}, limit: ${limit}`);

    // Fetch total count for pagination
    const totalCount = await prisma.projectStatus.count({
      where: {
        approved_status: status,
      },
    });

    console.log(`[API] Total count for ${status} projects:`, totalCount);

    if (totalCount === 0) {
      console.log(`[API] No projects found with status: ${status}`);
      return NextResponse.json({
        data: [],
        metadata: {
          currentPage: 1,
          totalPages: 0,
          totalItems: 0,
          itemsPerPage: limit,
        },
      });
    }

    // Fetch projects with their metadata and details
    const projects = await prisma.projectStatus.findMany({
      where: {
        approved_status: status,
      },
      skip,
      take: limit,
      include: {
        project: {
          include: {
            project: true,
            projectDetails: true,
          },
        },
        approved_by: {
          select: {
            name: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    console.log(`[API] Found ${projects.length} projects for status: ${status}`);

    // Transform data based on status type
    const transformedProjects = projects.map((projectStatus) => {
      if (!projectStatus.project?.project) {
        console.error(`[API] Missing project metadata for status ${projectStatus.content_id}`);
        return null;
      }

      const baseProject = {
        id: parseInt(projectStatus.content_id),
        title: projectStatus.project.project.title || 'Untitled Project',
        groupNumber: projectStatus.project.project.group_num || 'N/A',
      };

      switch (status) {
        case ProjectApprovalStatus.PENDING:
          return {
            ...baseProject,
            submissionDate: projectStatus.createdAt.toISOString(),
            status: projectStatus.status,
          };

        case ProjectApprovalStatus.APPROVED:
          return {
            ...baseProject,
            featured: projectStatus.project.project.featured || false,
            approvedBy: projectStatus.approved_by?.name || 'Unknown',
            approvedAt: projectStatus.approved_at?.toISOString() || '',
          };

        case ProjectApprovalStatus.REJECTED:
          return {
            ...baseProject,
            rejectedBy: projectStatus.approved_by?.name || 'Unknown',
            rejectedAt: projectStatus.approved_at?.toISOString() || '',
            rejectionReason: projectStatus.project.projectDetails?.problem_statement || '',
          };

        default:
          return baseProject;
      }
    }).filter(Boolean); // Remove any null entries from transformation

    if (transformedProjects.length === 0) {
      console.log(`[API] All projects were filtered out due to missing data for status: ${status}`);
    }

    return NextResponse.json({
      data: transformedProjects,
      metadata: {
        currentPage: page,
        totalPages: Math.ceil(totalCount / limit),
        totalItems: totalCount,
        itemsPerPage: limit,
      },
    });
  } catch (error) {
    console.error('[API] Error fetching projects:', error);
    
    // Determine if it's a Prisma error
    const isPrismaError = error instanceof Error && 
      (error.name === 'PrismaClientKnownRequestError' || error.name === 'PrismaClientUnknownRequestError');
    
    const message = isPrismaError 
      ? 'Database error occurred while fetching projects'
      : 'Failed to fetch projects';
    
    return NextResponse.json(
      { 
        error: message,
        details: error instanceof Error ? error.message : 'Unknown error occurred'
      },
      { status: 500 }
    );
  }
}