/* Copyright (c) 2025, the contributors of the SDGP Connect project. All Rights Reserved.

This software is the joint property of the contributors to the SDGP Connect project.
Unauthorized distribution, commercial use, or reproduction of any part of this material
in any form is strictly prohibited without the explicit written consent of all contributors.
You may not alter or remove any copyright or attribution notice from this content. */

import { prisma } from "@/prisma/prismaClient";
import { ProjectApprovalStatus } from "@/types/prisma-types";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    // Fetch featured projects that are APPROVED
    const featuredProjects = await prisma.projectMetadata.findMany({
      where: {
        featured: true,
        projectContent: {
          status: {
            approved_status: ProjectApprovalStatus.APPROVED, 
          },
        },
      },
      include: {
        projectContent: {
          include: {
            associations: {
              where: {
                type: "PROJECT_TYPE",
              },
            },
            status: true,
          },
        },
      },
    });

    // Format the response
    const formattedProjects = featuredProjects.map((project) => ({
      id: project.project_id,
      title: project.title,
      subtitle: project.subtitle || "",
      coverImage: project.cover_image || "",
      logo: project.logo || "",
      projectTypes:
        project.projectContent?.associations.map((association) => association.value) || [],
      status: project.projectContent?.status?.status || null,
    }));

    return NextResponse.json(formattedProjects);
  } catch (error) {
    console.error("Error fetching featured projects:", error);
    return NextResponse.json(
      { error: "Failed to fetch featured projects" },
      { status: 500 }
    );
  }
}
