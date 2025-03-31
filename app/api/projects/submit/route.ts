import { NextResponse } from 'next/server';
import { prisma } from '@/prisma/prismaClient';
import { projectSubmissionSchema } from '@/validations/submit_project';
import { AssociationType } from '@prisma/client';
import { revalidatePath } from 'next/cache';

export async function POST(request: Request) {
  try {
    // Parse the request body
    const body = await request.json();
    
    
    // Validate the submission data
    const validatedData = projectSubmissionSchema.parse(body);
    
    // Start a transaction to ensure all database operations succeed or fail together
    const result = await prisma.$transaction(async (tx) => {
      // 1. Create ProjectMetadata
      const projectMetadata = await tx.projectMetadata.create({
        data: {
          sdgp_year: validatedData.metadata.sdgp_year,
          group_num: validatedData.metadata.group_num,
          title: validatedData.metadata.title,
          subtitle: validatedData.metadata.subtitle || null,
          cover_image: validatedData.metadata.cover_image 
            ? `${validatedData.metadata.title.replace(/\s+/g, '-')}-cover-${Date.now()}` 
            : null,
          logo: validatedData.metadata.logo 
            ? `${validatedData.metadata.title.replace(/\s+/g, '-')}-logo-${Date.now()}` 
            : null,
          featured: false,
        }
      });

      // 2. Create ProjectContent
      const projectContent = await tx.projectContent.create({
        data: {
          project_id: projectMetadata.project_id,
        }
      });

      // 3. Create ProjectDetails
      await tx.projectDetails.create({
        data: {
          project_id: projectContent.content_id,
          problem_statement: validatedData.projectDetails.problem_statement,
          solution: validatedData.projectDetails.solution,
          features: validatedData.projectDetails.features,
          team_email: validatedData.projectDetails.team_email,
          team_phone: validatedData.projectDetails.team_phone || '',
        }
      });

      // 4. Create ProjectStatus
      await tx.projectStatus.create({
        data: {
          content_id: projectContent.content_id,
          status: validatedData.status.status,
          approved: false,
        }
      });

      // 5. Create ProjectAssociations with correct schema structure
      const associations = [
        // Domain associations
        ...validatedData.domains.map(domain => ({
          project_id: projectContent.content_id,
          type: AssociationType.PROJECT_DOMAIN,
          value: domain,
        })),
        // Project type associations
        ...validatedData.projectTypes.map(projectType => ({
          project_id: projectContent.content_id,
          type: AssociationType.PROJECT_TYPE,
          value: projectType,
        })),
        // SDG associations
        ...(validatedData.sdgGoals || []).map(sdgGoal => ({
          project_id: projectContent.content_id,
          type: AssociationType.PROJECT_SDG,
          value: sdgGoal,
        })),
        // Tech stack associations
        ...validatedData.techStack.map(tech => ({
          project_id: projectContent.content_id,
          type: AssociationType.PROJECT_TECH,
          value: tech,
        }))
      ];

      // Create all associations at once
      await tx.projectAssociation.createMany({
        data: associations,
      });

      // 6. Create Team Members
      if (validatedData.team && validatedData.team.length > 0) {
        await tx.projectTeam.createMany({
          data: validatedData.team.map(member => ({
            project_id: projectContent.content_id,
            name: member.name,
            linkedin_url: member.linkedin_url || null,
            profile_image: member.profile_image 
              ? `${member.name.replace(/\s+/g, '-')}-${Date.now()}`
              : null,
          })),
        });
      }

      // 7. Create Social Links (if present)
      if (validatedData.socialLinks && validatedData.socialLinks.length > 0) {
        await tx.projectSocialLink.createMany({
          data: validatedData.socialLinks.map(link => ({
            project_id: projectContent.content_id,
            link_name: link.link_name,
            url: link.url,
          })),
        });
      }

      // 8. Create Slides (if present)
      if (validatedData.slides && validatedData.slides.length > 0) {
        await tx.projectSlide.createMany({
          data: validatedData.slides.map(slide => ({
            project_id: projectContent.content_id,
            slides_content: typeof slide.slides_content === 'string' 
              ? slide.slides_content.substring(0, 65535)
              : JSON.stringify(slide.slides_content).substring(0, 65535),
          })),
        });
      }

      return { projectId: projectMetadata.project_id };
    });

    // Revalidate the projects paths to update the cache
    revalidatePath('/project');
    revalidatePath('/(public)/project');

    return NextResponse.json({ 
      success: true, 
      message: 'Project submitted successfully',
      data: {
        projectId: result.projectId
      }
    }, { status: 201 });
  } catch (error: any) {
    console.error('Error submitting project:', error);
    if (error.cause) console.error('Cause:', error.cause);
    if (error.stack) console.error('Stack:', error.stack);
    
    if (error.name === 'ZodError') {
      return NextResponse.json({
        success: false,
        message: 'Validation error',
        errors: error.errors
      }, { status: 400 });
    }
    
    return NextResponse.json({ 
      success: false, 
      message: 'Failed to submit project',
      error: error.message || 'Unknown error occurred'
    }, { status: 500 });
  }
}