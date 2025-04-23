export const runtime = 'nodejs';
export const maxDuration = 30;

import { NextResponse } from 'next/server';
import { prisma } from '@/prisma/prismaClient';
import { projectSubmissionSchema } from '@/validations/submit_project';
import { ProjectApprovalStatus, AssociationType } from '@prisma/client';
import { revalidatePath } from 'next/cache';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const validatedData = projectSubmissionSchema.parse(body);

    const result = await prisma.$transaction(async (tx) => {
      const projectMetadata = await tx.projectMetadata.create({
        data: {
          sdgp_year: validatedData.metadata.sdgp_year,
          group_num: validatedData.metadata.group_num,
          title: validatedData.metadata.title,
          subtitle: validatedData.metadata.subtitle || null,
          website: validatedData.metadata.website || null,
          cover_image: validatedData.metadata.cover_image || null,
          logo: validatedData.metadata.logo || null,
          featured: false,
        }
      });

      const projectContent = await tx.projectContent.create({
        data: {
          metadata_id: projectMetadata.project_id
        }
      });

      const contentId = projectContent.content_id;

      await tx.projectDetails.create({
        data: {
          content_id: contentId,
          problem_statement: validatedData.projectDetails.problem_statement,
          solution: validatedData.projectDetails.solution,
          features: validatedData.projectDetails.features,
          team_email: validatedData.projectDetails.team_email,
          team_phone: validatedData.projectDetails.team_phone || '',
        }
      });

      await tx.projectStatus.create({
        data: {
          content_id: contentId,
          status: validatedData.status.status,
          approved_status: ProjectApprovalStatus.PENDING
        }
      });

      const associations = [
        ...validatedData.domains.map(d => ({
          content_id: contentId,
          type: AssociationType.PROJECT_DOMAIN,
          domain: d,
          value: d
        })),
        ...validatedData.projectTypes.map(t => ({
          content_id: contentId,
          type: AssociationType.PROJECT_TYPE,
          projectType: t,
          value: t
        })),
        ...(validatedData.sdgGoals || []).map(s => ({
          content_id: contentId,
          type: AssociationType.PROJECT_SDG,
          sdgGoal: s,
          value: s
        })),
        ...validatedData.techStack.map(t => ({
          content_id: contentId,
          type: AssociationType.PROJECT_TECH,
          techStack: t,
          value: t
        }))
      ];

      if (associations.length > 0) {
        await tx.projectAssociation.createMany({ data: associations });
      }

      if (validatedData.team.length > 0) {
        await tx.projectTeam.createMany({
          data: validatedData.team.map(member => ({
            content_id: contentId,
            name: member.name,
            linkedin_url: member.linkedin_url || null,
            profile_image: member.profile_image || null,
          }))
        });
      }

      if ((validatedData?.socialLinks?.length ?? 0) > 0) {
        await tx.projectSocialLink.createMany({
          data: (validatedData.socialLinks || []).map(link => ({
            content_id: contentId,
            link_name: link.link_name,
            url: link.url
          }))
        });
      }

      // Ensure all previous records are committed before inserting slides
      await tx.$executeRaw`SELECT 1`;

      if ((validatedData?.slides?.length ?? 0) > 0) {
        await tx.projectSlide.createMany({
          data: validatedData.slides!.map(slide => ({
            content_id: contentId,
            slides_content: typeof slide.slides_content === 'string'
              ? slide.slides_content.slice(0, 65535)
              : JSON.stringify(slide.slides_content).slice(0, 65535)
          }))
        });
      }

      return {
        projectId: projectMetadata.project_id
      };
    });

    revalidatePath('/project');
    revalidatePath('/(public)/project');

    return NextResponse.json({
      success: true,
      message: 'Project submitted successfully',
      data: result
    });

  } catch (error: any) {
    console.error('Submission error:', error);
    return NextResponse.json({
      success: false,
      message: error.message || 'Failed to submit project',
      error: error.stack
    }, { status: 500 });
  }
}
