import { prisma } from '@/prisma/prismaClient';

const awards = await prisma.award.findMany({
  where: { approval_status: 'APPROVED' },
  include: {
    project: true,
    competition: true,
    accepted_by: true,  
  },
  orderBy: { createdAt: 'desc' }, 
});


