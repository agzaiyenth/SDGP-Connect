
import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { ProjectApprovalStatus } from "@prisma/client";
import { prisma } from "@/prisma/prismaClient";

export async function POST(request: NextRequest) {
  
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json(
      { error: "Unauthorized" },
      { status: 401 }
    );
  }

  const userId = session.user.id;   

  try {
    console.log("Approve API called by user:", userId);

    const { projectId, featured } = await request.json();
    if (!projectId) {
      return NextResponse.json(
        { error: "Project ID is required." },
        { status: 400 }
      );
    }

    // verify project exists
    const projectMetadata = await prisma.projectMetadata.findUnique({
      where: { project_id: String(projectId) }
    });
    if (!projectMetadata) {
      return NextResponse.json(
        { error: "Project not found." },
        { status: 404 }
      );
    }

    // load its content + status
    const projectContent = await prisma.projectContent.findUnique({
      where: { metadata_id: String(projectId) },
      include: { status: true }
    });
    if (!projectContent) {
      return NextResponse.json(
        { error: "Project content not found." },
        { status: 404 }
      );
    }

    // conflict if already approved
    if (
      projectContent.status?.approved_status ===
      ProjectApprovalStatus.APPROVED
    ) {
      return NextResponse.json(
        {
          error: "Already approved",
          status: "ALREADY_APPROVED",
          approvedBy: projectContent.status.approved_by_userId,
          approvedAt: projectContent.status.approved_at,
        },
        { status: 409 }
      );
    }

    // update status with the real session.user.id
    const updatedStatus = await prisma.projectStatus.update({
      where: { content_id: projectContent.content_id },
      data: {
        approved_status: ProjectApprovalStatus.APPROVED,
        approved_at: new Date(),
        approved_by_userId: userId,
      },
    });

    // optionally mark featured
    if (featured) {
      await prisma.projectMetadata.update({
        where: { project_id: String(projectId) },
        data: {
          featured: true,
          featured_by_userId: userId,
        },
      });
    }

    return NextResponse.json({
      success: true,
      message: "Project approved successfully",
      data: {
        projectId,
        featured,
        approvedAt: updatedStatus.approved_at,
        approvedBy: userId,
      },
    });
  } catch (error: any) {
    console.error("Error approving project:", error);
    return NextResponse.json(
      {
        error: "Failed to approve project",
        details: error.message,
      },
      { status: 500 }
    );
  }
}
