import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/prisma/prismaClient";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const limit = searchParams.get("limit") || "2"; // Default to 2 for featured

    // Get the latest 2 featured and approved posts
    const featuredPosts = await prisma.blogPost.findMany({
      where: {
        featured: true,
        approved: true, // Only show approved featured posts
      },
      include: {
        author: {
          select: {
            id: true,
            name: true,
            email: true,
            avatarUrl: true,
            instagram: true,
            twitter: true,
            facebook: true,
            linkedin: true,
            medium: true,
            website: true,
          }
        }
      },
      orderBy: {
        publishedAt: "desc" // Latest first
      },
      take: parseInt(limit)
    });

    // Transform the data to match the expected format
    const transformedPosts = featuredPosts.map(post => ({
      id: post.id,
      title: post.title,
      excerpt: post.excerpt,
      content: post.content,
      imageUrl: post.imageUrl,
      publishedAt: post.publishedAt,
      authorId: post.authorId,
      category: post.category,
      featured: post.featured,
      approved: post.approved,
      approvedById: post.approvedById,
      rejectedById: post.rejectedById,
      rejectedReason: post.rejectedReason,
      createdAt: post.createdAt,
      updatedAt: post.updatedAt,
      author: post.author
    }));

    return NextResponse.json({
      success: true,
      data: transformedPosts,
      count: transformedPosts.length
    });

  } catch (error) {
    console.error("Error fetching featured blog posts:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch featured blog posts" },
      { status: 500 }
    );
  }
}
