import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/prisma/prismaClient";
import { ProjectApprovalStatus } from "@prisma/client";
import { session } from "@/app/(auth)/samplesession";

export async function POST(request: NextRequest) {
  try {
    // Get the current user session (using the mock session for now)
    // When implementing actual auth, replace with:
    // const session = await getServerSession(authOptions);
    
    // Parse the request body
    const { projectId, featured } = await request.json();

    if (!projectId) {
      return NextResponse.json(
        { error: "Project ID is required." },
        { status: 400 }
      );
    }

    // First, find the project content to make sure it exists and is approved
    const projectContent = await prisma.projectContent.findFirst({
      where: {
        metadata_id: String(projectId)
      },
      include: {
        metadata: true,
        status: true
      }
    });

    if (!projectContent) {
      return NextResponse.json(
        { error: "Project not found." },
        { status: 404 }
      );
    }

    // Check if the project is approved
    if (projectContent.status?.approved_status !== ProjectApprovalStatus.APPROVED) {
      return NextResponse.json(
        { error: "Only approved projects can be featured." },
        { status: 400 }
      );
    }

    // Update the ProjectMetadata to set featured status
    const updatedMetadata = await prisma.projectMetadata.update({
      where: {
        project_id: projectContent.metadata_id
      },
      data: {
        featured: featured,
        // Only update the featured_by field if setting to featured=true
        ...(featured ? { featured_by_userId: session.user.id } : {})
      }
    });

    return NextResponse.json({
      success: true,
      message: featured ? "Project featured successfully" : "Project unfeatured successfully",
      data: {
        projectId,
        featured: updatedMetadata.featured
      }
    });
  } catch (error: any) {
    console.error("Error toggling project featured status:", error);
    
    return NextResponse.json(
      { 
        error: "Failed to update project featured status", 
        details: error.message 
      },
      { status: 500 }
    );
  }
}