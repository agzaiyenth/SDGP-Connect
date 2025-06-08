import { NextResponse } from 'next/server';
import prisma from '@/prisma/prismaClient';

export async function GET() {
  const awards = await prisma.award.findMany({
    where: { approvalStatus: 'REJECTED' },
    include: {
      project: true,
      competition: true,
      rejectedBy: true,
    },
    orderBy: { createdAt: 'desc' },
  });
  return NextResponse.json(awards);
}
