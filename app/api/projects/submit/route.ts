export const runtime = 'nodejs';
export const maxDuration = 30;

import { NextResponse } from 'next/server';
import { prisma } from '@/prisma/prismaClient';
import { projectSubmissionSchema } from '@/validations/submit_project';
import {
  ProjectApprovalStatus,
  AssociationType,
  Prisma,          // ⬅ needed for TransactionOptions
} from '@prisma/client';
import { revalidatePath } from 'next/cache';

/** How many slides to send per createMany() call */
const SLIDE_BATCH_SIZE = 50;

export async function POST(request: Request) {
  try {
    /* ------------------------------------------------------------------ */
    /*  1️⃣  Parse & validate body                                         */
    /* ------------------------------------------------------------------ */
    const body = await request.json();
    const validatedData = projectSubmissionSchema.parse(body);

    /* ------------------------------------------------------------------ */
    /*  2️⃣  Main interactive transaction (metadata, details, etc.)       */
    /*      – 20 s timeout / 10 s maxWait                                  */
    /* ------------------------------------------------------------------ */
    const txOptions = {
      maxWait: 10_000,   // wait up to 10 s for a free connection
      timeout: 20_000,   // give the work up to 20 s in the DB
    };

    const { project_id, content_id } = await prisma.$transaction(async (tx) => {
      /* projectMetadata -------------------------------------------------- */
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
        },
        select: { project_id: true },
      });

      /* projectContent ---------------------------------------------------- */
      const projectContent = await tx.projectContent.create({
        data: { metadata_id: projectMetadata.project_id },
        select: { content_id: true },
      });

      const contentId = projectContent.content_id;

      /* projectDetails ---------------------------------------------------- */
      await tx.projectDetails.create({
        data: {
          content_id: contentId,
          problem_statement: validatedData.projectDetails.problem_statement,
          solution: validatedData.projectDetails.solution,
          features: validatedData.projectDetails.features,
          team_email: validatedData.projectDetails.team_email,
          team_phone: validatedData.projectDetails.team_phone || '',
        },
      });

      /* projectStatus ----------------------------------------------------- */
      await tx.projectStatus.create({
        data: {
          content_id: contentId,
          status: validatedData.status.status,
          approved_status: ProjectApprovalStatus.PENDING,
        },
      });

      /* projectAssociation ------------------------------------------------ */
      const associations = [
        ...validatedData.domains.map((d) => ({
          content_id: contentId,
          type: AssociationType.PROJECT_DOMAIN,
          domain: d,
          value: d,
        })),
        ...validatedData.projectTypes.map((t) => ({
          content_id: contentId,
          type: AssociationType.PROJECT_TYPE,
          projectType: t,
          value: t,
        })),
        ...(validatedData.sdgGoals || []).map((s) => ({
          content_id: contentId,
          type: AssociationType.PROJECT_SDG,
          sdgGoal: s,
          value: s,
        })),
        ...validatedData.techStack.map((t) => ({
          content_id: contentId,
          type: AssociationType.PROJECT_TECH,
          techStack: t,
          value: t,
        })),
      ];

      if (associations.length) {
        await tx.projectAssociation.createMany({
          data: associations,
          skipDuplicates: true,
        });
      }

      /* projectTeam ------------------------------------------------------- */
      if (validatedData.team.length) {
        await tx.projectTeam.createMany({
          data: validatedData.team.map((member) => ({
            content_id: contentId,
            name: member.name,
            linkedin_url: member.linkedin_url || null,
            profile_image: member.profile_image || null,
          })),
          skipDuplicates: true,
        });
      }

      /* socialLinks ------------------------------------------------------- */
      if (validatedData.socialLinks?.length) {
        await tx.projectSocialLink.createMany({
          data: validatedData.socialLinks.map((link) => ({
            content_id: contentId,
            link_name: link.link_name,
            url: link.url,
          })),
          skipDuplicates: true,
        });
      }

      /*  Return identifiers for post-commit work ------------------------- */
      return { project_id: projectMetadata.project_id, content_id: contentId };
    }, txOptions);

    /* ------------------------------------------------------------------ */
    /*  3️⃣  Slides: insert outside the interactive transaction            */
    /*      (keeps the DB lock short & avoids hitting the 20 s limit)      */
    /* ------------------------------------------------------------------ */
    if (validatedData.slides?.length) {
      for (let i = 0; i < validatedData.slides.length; i += SLIDE_BATCH_SIZE) {
        const batch = validatedData.slides.slice(i, i + SLIDE_BATCH_SIZE);

        await prisma.projectSlide.createMany({
          data: batch.map((slide) => ({
            content_id,
            slides_content:
              typeof slide.slides_content === 'string'
                ? slide.slides_content.slice(0, 65_535)
                : JSON.stringify(slide.slides_content).slice(0, 65_535),
          })),
          skipDuplicates: true,
        });
      }
    }

    /* ------------------------------------------------------------------ */
    /*  4️⃣  Cache revalidation                                             */
    /* ------------------------------------------------------------------ */
    revalidatePath('/project');
    revalidatePath('/(public)/project');

    /* ------------------------------------------------------------------ */
    /*  5️⃣  Response                                                      */
    /* ------------------------------------------------------------------ */
    return NextResponse.json({
      success: true,
      message: 'Project submitted successfully',
      data: { projectId: project_id },
    });
  } catch (error: any) {
    console.error('Submission error:', error);
    return NextResponse.json(
      {
        success: false,
        message: error?.message ?? 'Failed to submit project',
        error: error?.stack,
      },
      { status: 500 },
    );
  }
}
