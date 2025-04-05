import { NextRequest, NextResponse } from "next/server";

import { ProjectApprovalStatus } from "@prisma/client";
// import { getServerSession } from "next-auth/next";
// import { authOptions } from "@/lib/auth";

// replace with next auth session
import { session } from "@/app/(auth)/samplesession";
import { prisma } from "@/prisma/prismaClient";


export async function POST(request: NextRequest) {
  try {
    // Get the current user session
    // const session = await getServerSession(authOptions);
    
    // if (!session?.user) {
    //   return NextResponse.json(
    //     { error: "Unauthorized. You must be logged in to approve projects." },
    //     { status: 401 }
    //   );
    // }

    // Check if the user has the necessary roles (ADMIN or MODERATOR or REVIEWER)

    // if (!["ADMIN", "MODERATOR", "REVIEWER"].includes(session.user.role)) {
    //   return NextResponse.json(
    //     { error: "Forbidden. You don't have permission to approve projects." },
    //     { status: 403 }
    //   );
    // }

    // Parse the request body
    const { projectId, featured } = await request.json();

    if (!projectId) {
      return NextResponse.json(
        { error: "Project ID is required." },
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
        project: true,
        status: true
      }
    });

    if (!projectContent) {
      return NextResponse.json(
        { error: "Project not found." },
        { status: 404 }
      );
    }

    // Check if the project is already approved
    if (projectContent.status?.approved_status === ProjectApprovalStatus.APPROVED) {
      return NextResponse.json(
        { 
          error: "This project has already been approved by another user.",
          status: "ALREADY_APPROVED",
          approvedBy: projectContent.status.approved_by_userId,
          approvedAt: projectContent.status.approved_at
        },
        { status: 409 }  // Conflict status code
      );
    }

    // Update the ProjectStatus record
    const updatedStatus = await prisma.projectStatus.update({
      where: {
        content_id: projectContent.content_id
      },
      data: {
        approved_status: ProjectApprovalStatus.APPROVED,
        approved_at: new Date(),
        approved_by_userId: session.user.id
      }
    });

    // If featured is true, update the ProjectMetadata record
    if (featured) {
      await prisma.projectMetadata.update({
        where: {
          project_id: projectContent.project_id
        },
        data: {
          featured: true,
          featured_by_userId: session.user.id
        }
      });
    }

    return NextResponse.json({
      success: true,
      message: "Project approved successfully",
      data: {
        projectId,
        featured,
        approvedAt: updatedStatus.approved_at,
        approvedBy: session.user.id
      }
    });
  } catch (error: any) {
    console.error("Error approving project:", error);
    
    return NextResponse.json(
      { 
        error: "Failed to approve project", 
        details: error.message 
      },
      { status: 500 }
    );
  }
}