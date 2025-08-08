// app/api/projects/feature/route.ts

import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { prisma } from "@/prisma/prismaClient";
import { ProjectApprovalStatus } from "@prisma/client";
import { getServerSession } from "next-auth/next";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  // 1) Get the real session
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json(
      { error: "Unauthorized" },
      { status: 401 }
    );
  }

  const { role } = session.user;
  if (!["ADMIN", "MODERATOR", ].includes(role)) {
    return NextResponse.json(
      { error: "Forbidden. You don't have required Permission" },
      { status: 403 }
    );
  }

  try {
    // 2) Parse the request
    const { projectId, featured } = await request.json();
    if (!projectId) {
      return NextResponse.json(
        { error: "Project ID is required." },
        { status: 400 }
      );
    }

    // 3) Load the project content + metadata + status
    const projectContent = await prisma.projectContent.findFirst({
      where: { metadata_id: String(projectId) },
      include: { metadata: true, status: true },
    });
    if (!projectContent) {
      return NextResponse.json(
        { error: "Project not found." },
        { status: 404 }
      );
    }

    // 4) Only approved projects can be featured
    if (
      projectContent.status?.approved_status !==
      ProjectApprovalStatus.APPROVED
    ) {
      return NextResponse.json(
        { error: "Only approved projects can be featured." },
        { status: 400 }
      );
    }

    // 5) Update the metadata
    const updatedMetadata = await prisma.projectMetadata.update({
      where: { project_id: projectContent.metadata_id },
      data: {
        featured: Boolean(featured),
        ...(featured
          ? { featured_by_userId: session.user.id }
          : {}),
      },
    });

    // 6) Return success
    return NextResponse.json({
      success: true,
      message: featured
        ? "Project featured successfully"
        : "Project unfeatured successfully",
      data: {
        projectId,
        featured: updatedMetadata.featured,
      },
    });
  } catch (error: any) {
    console.error("Error toggling project featured status:", error);
    return NextResponse.json(
      {
        error: "Failed to update project featured status",
        details: error.message,
      },
      { status: 500 }
    );
  }
}
