import { prisma } from '@/prisma/prismaClient';
import { blogSubmissionSchema } from '@/validations/blog';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const validatedData = blogSubmissionSchema.parse(body);

    // Start a transaction to ensure both author and blog post are created/updated together
    const result = await prisma.$transaction(async (tx) => {
      // Check if author exists, if not create them
      let author = await tx.blogAuthor.findUnique({
        where: { email: validatedData.author.email },
      });

      if (!author) {
        author = await tx.blogAuthor.create({
          data: {
            name: validatedData.author.name,
            email: validatedData.author.email,
            avatarUrl: validatedData.author.avatarUrl || null,
            instagram: validatedData.author.instagram || null,
            twitter: validatedData.author.twitter || null,
            facebook: validatedData.author.facebook || null,
            linkedin: validatedData.author.linkedin || null,
            medium: validatedData.author.medium || null,
            website: validatedData.author.website || null,
          },
        });
      }      // Create the blog post
      const blogPost = await tx.blogPost.create({
        data: {
          title: validatedData.post.title,
          excerpt: validatedData.post.excerpt,
          content: validatedData.post.content,
          imageUrl: validatedData.post.imageUrl || null,
          // publishedAt will use default value from Prisma schema (now())
          category: validatedData.post.category,
          featured: validatedData.post.featured,
          authorId: author.id,
          approved: false, // Default to not approved
        },
        include: {
          author: true,
        },
      });

      return blogPost;
    });

    return NextResponse.json(result, { status: 201 });
  } catch (error: any) {
    console.error('Error creating blog post:', error);
    
    if (error.name === 'ZodError') {
      return NextResponse.json(
        { message: 'Invalid request data', errors: error.errors },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}
