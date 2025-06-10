import { NextResponse } from 'next/server';
import prisma from '@/prisma/prismaClient';

export async function GET() {
  const awards = await prisma.award.findMany({
    where: { approvalStatus: 'PENDING' },
    include: {
      project: true,
      competition: true,
    },
    orderBy: { createdAt: 'desc' },
  });
  return NextResponse.json(awards);
}
