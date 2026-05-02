import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { auth } from '@/auth';

export async function POST(req: Request) {
  try {
    const session = await auth();
    
    // Check if the user is authenticated
    if (!session || !session.user || !session.user.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Get the user from the database to link as the author
    const user = await prisma.user.findUnique({
      where: { email: session.user.email }
    });

    if (!user) {
      return NextResponse.json({ error: 'User not found in database' }, { status: 404 });
    }

    const data = await req.json();
    const { title, slug, content, excerpt, imageUrl, published } = data;

    // Basic validation
    if (!title || !slug || !content) {
      return NextResponse.json({ error: 'Title, slug, and content are required' }, { status: 400 });
    }

    // Create the post
    const post = await prisma.post.create({
      data: {
        title,
        slug: slug.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, ''),
        content,
        excerpt: excerpt || null,
        imageUrl: imageUrl || null,
        published: published === true,
        authorId: user.id,
      }
    });

    return NextResponse.json(post, { status: 201 });
  } catch (error: any) {
    console.error("Error creating post:", error);
    
    // Handle Prisma unique constraint error for slug
    if (error.code === 'P2002') {
      return NextResponse.json({ error: 'A post with this slug already exists. Please choose a different slug.' }, { status: 400 });
    }
    
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
