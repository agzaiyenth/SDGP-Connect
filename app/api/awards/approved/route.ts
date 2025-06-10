import { NextResponse } from 'next/server';
import prisma from '@/prisma/prismaClient';

export async function GET() {
  const awards = await prisma.award.findMany({
    where: { approvalStatus: 'APPROVED' },
    include: {
      project: true,
      competition: true,
      approvedBy: true,
    },
    orderBy: { createdAt: 'desc' },
  });
  return NextResponse.json(awards);
}
