import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { prisma } from "@/prisma/prismaClient";
import { Role } from "@prisma/client";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";


export async function DELETE(req: NextRequest, context: { params: { id: string } }) {
  const { params } = context;
  const { id } = params;
  if (!id) {
    return NextResponse.json({ error: "Award id is required" }, { status: 400 });
  }

  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  // Check user role in DB
  const user = await prisma.user.findUnique({
    where: { user_id: session.user.id },
    select: { role: true },
  });
  if (!user || (user.role !== Role.ADMIN && user.role !== Role.MODERATOR)) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  try {
    // Delete the award, but not the related competition or project
    await prisma.award.delete({
      where: { id },
    });
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting award:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
