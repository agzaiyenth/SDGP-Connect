import { NextResponse } from "next/server";
import { prisma } from "@/prisma/prismaClient";

export async function GET() {
  try {
    // Fetch featured projects with their associations and status
    const featuredProjects = await prisma.projectMetadata.findMany({
      where: {
        featured: true,
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
      projectTypes: project.projectContent?.associations.map(
        (association) => association.value
      ) || [],
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
