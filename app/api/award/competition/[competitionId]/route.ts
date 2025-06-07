import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/prisma/prismaClient'

export const runtime = 'nodejs'

// GET /api/award/competition/[competitionId]
export async function GET(req: NextRequest, { params }: { params: { competitionId: string } }) {
  try {
    const { competitionId } = params
    if (!competitionId) {
      return NextResponse.json({ error: 'competitionId is required' }, { status: 400 })
    }

    // Fetch all awards for this competition, including project info
    const awards = await prisma.award.findMany({
      where: { competition_id: competitionId },
      include: {
        project: true
      }
    })

    // Format response
    const result = awards.map((award) => ({
      id: award.id,
      name: award.name,
      image: award.image,
      projectName: award.project?.title,
      team: award.project?.group_num,
      sdgpYear: award.project?.sdgp_year,
      cover: award.project?.cover_image,
      description: award.project?.subtitle,
    }))

    return NextResponse.json(result)
  } catch (error) {
    console.error('Error fetching awards by competition:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
