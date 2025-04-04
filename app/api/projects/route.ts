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
      return NextResponse.json(
        { error: 'Invalid project status type' },
        { status: 400 }
      );
    }

    const totalCount = await prisma.projectStatus.count({
      where: {
        approved_status: status,
      },
    });

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

    const transformedProjects = projects.map((projectStatus) => {
      const baseProject = {
        id: parseInt(projectStatus.content_id),
        title: projectStatus.project?.project?.title || 'Untitled Project',
        groupNumber: projectStatus.project?.project?.group_num || 'N/A',
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
            featured: projectStatus.project?.project?.featured || false,
            approvedBy: projectStatus.approved_by?.name || 'Unknown',
            approvedAt: projectStatus.approved_at?.toISOString() || '',
          };

        case ProjectApprovalStatus.REJECTED:
          return {
            ...baseProject,
            rejectedBy: projectStatus.approved_by?.name || 'Unknown',
            rejectedAt: projectStatus.approved_at?.toISOString() || '',
            rejectionReason: projectStatus.project?.projectDetails?.problem_statement || '',
          };

        default:
          return baseProject;
      }
    });

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
    return NextResponse.json(
      { error: 'Failed to fetch projects', details: error instanceof Error ? error.message : undefined },
      { status: 500 }
    );
  }
}