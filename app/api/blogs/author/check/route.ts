import { prisma } from '@/prisma/prismaClient';
import { authorCheckSchema } from '@/validations/blog';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email } = authorCheckSchema.parse(body);

    const author = await prisma.blogAuthor.findUnique({
      where: { email },
    });

    if (!author) {
      return NextResponse.json(
        { message: 'Author not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(author);
  } catch (error: any) {
    console.error('Error checking author:', error);
    
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
