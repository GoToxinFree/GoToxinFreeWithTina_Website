import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { auth } from '@/auth';

export async function POST(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id: postId } = await params;
  const session = await auth();
  const body = await request.json();
  const { content, authorName, authorEmail, parentId } = body;

  try {
    const comment = await prisma.comment.create({
      data: {
        content,
        authorName,
        authorEmail,
        postId,
        parentId,
        isAdmin: !!session?.user,
        status: session?.user ? 'approved' : 'pending',
      },
    });

    return NextResponse.json(comment);
  } catch (error) {
    console.error('Comment creation error:', error);
    return NextResponse.json({ error: 'Failed to post comment' }, { status: 500 });
  }
}
