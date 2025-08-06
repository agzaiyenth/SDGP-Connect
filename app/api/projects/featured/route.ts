// Copyright (c) 2025, Psycode Lab's (https://www.psycodelabs.lk). All Rights Reserved.
//
// This software is the property of Psycode Lab's. and its suppliers, if any.
// Dissemination of any information or reproduction of any material contained
// herein in any form is strictly forbidden, unless permitted by Psycode Lab's expressly.
// You may not alter or remove any copyright or other notice from copies of this content.
import { NextResponse } from "next/server";
import { prisma } from "@/prisma/prismaClient";
import { ProjectApprovalStatus } from "@/types/prisma-types";

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
