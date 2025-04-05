import { NextRequest, NextResponse } from "next/server";
import { ProjectApprovalStatus } from "@prisma/client";
// import { getServerSession } from "next-auth/next";
// import { authOptions } from "@/lib/auth";

// replace with next auth session
import { session } from "@/app/(auth)/samplesession";
import { prisma } from "@/prisma/prismaClient";

export async function POST(request: NextRequest) {
  try {
    console.log("Approve API called");
    // Parse the request body
    const { projectId, featured } = await request.json();
    console.log("Request body:", { projectId, featured });

    if (!projectId) {
      return NextResponse.json(
        { error: "Project ID is required." },
        { status: 400 }
      );
    }

    // First, find the project metadata to make sure it exists
    const projectMetadata = await prisma.projectMetadata.findUnique({
      where: {
        project_id: String(projectId)
      }
    });

    if (!projectMetadata) {
      console.log(`Project with ID ${projectId} not found in ProjectMetadata`);
      return NextResponse.json(
        { error: "Project not found." },
        { status: 404 }
      );
    }

    // Now find the associated project content
    const projectContent = await prisma.projectContent.findUnique({
      where: {
        metadata_id: String(projectId)
      },
      include: {
        status: true
      }
    });

    if (!projectContent) {
      console.log(`ProjectContent for project ID ${projectId} not found`);
      return NextResponse.json(
        { error: "Project content not found." },
        { status: 404 }
      );
    }

    console.log(`Found project content:`, {
      content_id: projectContent.content_id,
      metadata_id: projectContent.metadata_id,
      status: projectContent.status?.approved_status
    });

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

    console.log("Status updated successfully:", updatedStatus);

    // If featured is true, update the ProjectMetadata record
    if (featured) {
      await prisma.projectMetadata.update({
        where: {
          project_id: String(projectId)
        },
        data: {
          featured: true,
          featured_by_userId: session.user.id
        }
      });
      console.log("Project marked as featured");
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
        details: error.message,
        stack: error.stack
      },
      { status: 500 }
    );
  }
}