import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth/next";
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "../../../../../prisma/prismaClient";

export const GET = async (req: NextRequest) => {
  // Authentication check
  const session = await getServerSession(authOptions);
  if (!session?.user) {
    return NextResponse.json(
      { error: "Unauthorized. You must be logged in to access this resource." },
      { status: 401 }
    );
  }

  // Role-based authorization check
  const { role } = session.user;
  if (!["ADMIN", "MODERATOR", "DEVELOPER"].includes(role)) {
    return NextResponse.json(
      { error: "Forbidden. You don't have permission to access this resource." },
      { status: 403 }
    );
  }

  try {
    const [total, pending, approved, rejected, featured] = await Promise.all([
      prisma.blogPost.count(),
      prisma.blogPost.count({
        where: {
          approved: false,
          rejectedById: null,
        },
      }),
      prisma.blogPost.count({
        where: { approved: true },
      }),
      prisma.blogPost.count({
        where: {
          approved: false,
          rejectedById: { not: null },
        },
      }),
      prisma.blogPost.count({
        where: { featured: true },
      }),
    ]);

    return NextResponse.json({
      total,
      pending,
      approved,
      rejected,
      featured,
    });
  } catch (error) {
    console.error("Error fetching blog stats:", error);
    return NextResponse.json(
      { error: "Failed to fetch blog statistics" },
      { status: 500 }
    );
  }
};
