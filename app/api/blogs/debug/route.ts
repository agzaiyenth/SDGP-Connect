import { prisma } from "@/prisma/prismaClient";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const posts = await prisma.blogPost.findMany({
      include: {
        author: {
          select: {
            name: true,
          }
        }
      },
      orderBy: {
        publishedAt: "desc"
      }
    });

    const summary = {
      totalPosts: posts.length,
      approvedPosts: posts.filter(p => p.approved).length,
      featuredPosts: posts.filter(p => p.featured && p.approved).length,
      nonFeaturedApprovedPosts: posts.filter(p => !p.featured && p.approved).length,
      posts: posts.map(p => ({
        id: p.id,
        title: p.title,
        featured: p.featured,
        approved: p.approved,
        author: p.author?.name,
        publishedAt: p.publishedAt
      }))
    };

    return NextResponse.json({
      success: true,
      data: summary
    });

  } catch (error) {
    console.error("Error fetching blog posts debug info:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch debug info" },
      { status: 500 }
    );
  }
}
