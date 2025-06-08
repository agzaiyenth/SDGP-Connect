import { prisma } from "@/prisma/prismaClient";
import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";


export async function DELETE(req: NextRequest, context: { params: { id: string } }) {
  const { params } = await context;
  const { id } = params;
  if (!id) {
    return NextResponse.json({ error: "Award id is required" }, { status: 400 });
  }

  // Optionally, check if the user is admin here
  const session = await getServerSession(authOptions);
  if (!session || session.user.role !== "ADMIN") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
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
