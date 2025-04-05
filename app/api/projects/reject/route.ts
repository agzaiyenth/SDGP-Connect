import { NextRequest, NextResponse } from "next/server";
import { ProjectApprovalStatus } from "@prisma/client";

// import { getServerSession } from "next-auth/next";
// import { authOptions } from "@/lib/auth";
import { session } from "@/app/(auth)/samplesession";
import { prisma } from "@/prisma/prismaClient";

export async function POST(request: NextRequest) {
  try {
    // Get the current user session
    // const session = await getServerSession(authOptions);
    
    // if (!session?.user) {
    //   return NextResponse.json(
    //     { error: "Unauthorized. You must be logged in to reject projects." },
    //     { status: 401 }
    //   );
    // }

    // Check if the user has the necessary roles (ADMIN or MODERATOR or REVIEWER)
    // if (!["ADMIN", "MODERATOR", "REVIEWER"].includes(session.user.role)) {
    //   return NextResponse.json(
    //     { error: "Forbidden. You don't have permission to reject projects." },
    //     { status: 403 }
    //   );
    // }

    // Parse the request body
    const { projectId, reason } = await request.json();

    if (!projectId) {
      return NextResponse.json(
        { error: "Project ID is required." },
        { status: 400 }
      );
    }

    if (!reason || reason.trim() === "") {
      return NextResponse.json(
        { error: "A reason for rejection is required." },
        { status: 400 }
      );
    }

    // Get the project content
    const projectContent = await prisma.projectContent.findFirst({
      where: {
        project: {
          project_id: String(projectId)
        }
      },
      include: {
        status: true
      }
    });

    if (!projectContent) {
      return NextResponse.json(
        { error: "Project not found." },
        { status: 404 }
      );
    }

    // Check if the project is already approved or rejected
    if (projectContent.status?.approved_status === ProjectApprovalStatus.APPROVED) {
      return NextResponse.json(
        { 
          error: "This project has already been approved and cannot be rejected.",
          status: "ALREADY_APPROVED",
          approvedBy: projectContent.status.approved_by_userId,
          approvedAt: projectContent.status.approved_at
        },
        { status: 409 }
      );
    }

    if (projectContent.status?.approved_status === ProjectApprovalStatus.REJECTED) {
      return NextResponse.json(
        { 
          error: "This project has already been rejected.",
          status: "ALREADY_REJECTED",
          rejectedReason: projectContent.status.rejected_reason
        },
        { status: 409 }
      );
    }

    // Update the ProjectStatus record
    const updatedStatus = await prisma.projectStatus.update({
      where: {
        content_id: projectContent.content_id
      },
      data: {
        approved_status: ProjectApprovalStatus.REJECTED,
        rejected_reason: reason,
        approved_by_userId: session.user.id,
        approved_at: new Date()
      }
    });

    return NextResponse.json({
      success: true,
      message: "Project rejected successfully",
      data: {
        projectId,
        reason,
        rejectedAt: updatedStatus.approved_at,
        rejectedBy: session.user.id
      }
    });
  } catch (error: any) {
    console.error("Error rejecting project:", error);
    
    return NextResponse.json(
      { 
        error: "Failed to reject project", 
        details: error.message 
      },
      { status: 500 }
    );
  }
}