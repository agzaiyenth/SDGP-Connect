import { prisma } from "@/prisma/prismaClient";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;

    const post = await prisma.blogPost.findUnique({
      where: {
        id: id,
        approved: true, // Only show approved posts
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
            createdAt: true, // Include author's createdAt field
          }
        }
      }
    });

    if (!post) {
      return NextResponse.json(
        { success: false, error: "Blog post not found" },
        { status: 404 }
      );
    }

    // Transform the data to match the expected format
    const transformedPost = {
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
      author: post.author // This will now include createdAt
    };

    return NextResponse.json({
      success: true,
      data: transformedPost
    });

  } catch (error) {
    console.error("Error fetching blog post:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch blog post" },
      { status: 500 }
    );
  }
}
