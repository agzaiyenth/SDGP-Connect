import { NextResponse } from 'next/server';
import { prisma } from '@/prisma/prismaClient';
import { projectSubmissionSchema } from '@/validations/submit_project';
import { AssociationType, ProjectApprovalStatus } from '@prisma/client';
import { revalidatePath } from 'next/cache';

export async function POST(request: Request) {
  try {
    // Parse the request body
    const body = await request.json();
    
    // Validate the submission data
    const validatedData = projectSubmissionSchema.parse(body);
    
    // Start a transaction to ensure all database operations succeed or fail together
    const result = await prisma.$transaction(async (tx) => {
      // 1. Create ProjectMetadata - This has our main project_id
      const projectMetadata = await tx.projectMetadata.create({
        data: {
          sdgp_year: validatedData.metadata.sdgp_year,
          group_num: validatedData.metadata.group_num,
          title: validatedData.metadata.title,
          subtitle: validatedData.metadata.subtitle || null,
          cover_image: validatedData.metadata.cover_image || null,
          logo: validatedData.metadata.logo || null,
          featured: false,
        }
      });
      
      console.log(`Created ProjectMetadata with project_id: ${projectMetadata.project_id}`);

      // 2. Create ProjectContent - This links to ProjectMetadata via project_id
      const projectContent = await tx.projectContent.create({
        data: {
          project_id: projectMetadata.project_id // Link to the main project_id
        }
      });
      
      console.log(`Created ProjectContent with content_id: ${projectContent.content_id}`);

      // 3. Create ProjectDetails - Links to ProjectContent via project_id (content_id)
      await tx.projectDetails.create({
        data: {
          problem_statement: validatedData.projectDetails.problem_statement,
          solution: validatedData.projectDetails.solution,
          features: validatedData.projectDetails.features,
          team_email: validatedData.projectDetails.team_email,
          team_phone: validatedData.projectDetails.team_phone || '',
          project_id: projectContent.content_id // This is the content_id
        }
      });

      // 4. Create ProjectStatus - Links to ProjectContent via content_id
      await tx.projectStatus.create({
        data: {
          content_id: projectContent.content_id, // Using content_id as primary key
          status: validatedData.status.status,
          approved_status: ProjectApprovalStatus.PENDING
        }
      });

      // 5. Create ProjectAssociations - Link to ProjectContent via project_id (content_id)
      // Domain associations
      for (const domain of validatedData.domains) {
        await tx.projectAssociation.create({
          data: {
            project_id: projectContent.content_id, // This is the content_id
            type: AssociationType.PROJECT_DOMAIN,
            domain: domain,
            value: domain
          }
        });
      }
      
      // Project type associations
      for (const projectType of validatedData.projectTypes) {
        await tx.projectAssociation.create({
          data: {
            project_id: projectContent.content_id, // This is the content_id
            type: AssociationType.PROJECT_TYPE,
            projectType: projectType,
            value: projectType
          }
        });
      }
      
      // SDG associations (if present)
      if (validatedData.sdgGoals && validatedData.sdgGoals.length > 0) {
        for (const sdgGoal of validatedData.sdgGoals) {
          await tx.projectAssociation.create({
            data: {
              project_id: projectContent.content_id, // This is the content_id
              type: AssociationType.PROJECT_SDG,
              sdgGoal: sdgGoal,
              value: sdgGoal
            }
          });
        }
      }
      
      // Tech stack associations
      for (const tech of validatedData.techStack) {
        await tx.projectAssociation.create({
          data: {
            project_id: projectContent.content_id, // This is the content_id
            type: AssociationType.PROJECT_TECH,
            techStack: tech,
            value: tech
          }
        });
      }

      // 6. Create Team Members - Link to ProjectContent via project_id (content_id)
      if (validatedData.team && validatedData.team.length > 0) {
        for (const member of validatedData.team) {
          await tx.projectTeam.create({
            data: {
              name: member.name,
              linkedin_url: member.linkedin_url || null,
              profile_image: member.profile_image || null,
              project_id: projectContent.content_id // This is the content_id
            }
          });
        }
      }

      // 7. Create Social Links - Link to ProjectContent via project_id (content_id)
      if (validatedData.socialLinks && validatedData.socialLinks.length > 0) {
        for (const link of validatedData.socialLinks) {
          await tx.projectSocialLink.create({
            data: {
              link_name: link.link_name,
              url: link.url,
              project_id: projectContent.content_id // This is the content_id
            }
          });
        }
      }

      // 8. Create Slides - Link to ProjectContent via project_id (content_id)
      if (validatedData.slides && validatedData.slides.length > 0) {
        for (const slide of validatedData.slides) {
          await tx.projectSlide.create({
            data: {
              slides_content: typeof slide.slides_content === 'string' 
                ? slide.slides_content.substring(0, 65535)
                : JSON.stringify(slide.slides_content).substring(0, 65535),
              project_id: projectContent.content_id // This is the content_id
            }
          });
        }
      }

      return { 
        projectId: projectMetadata.project_id,
        contentId: projectContent.content_id
      };
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