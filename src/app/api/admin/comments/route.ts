import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { auth } from '@/auth';

export const dynamic = 'force-dynamic';

export const GET = auth(async function GET(req) {
  const session = req.auth;
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  try {
    const comments = await prisma.comment.findMany({
      orderBy: { createdAt: 'desc' },
      include: {
        post: {
          select: { title: true, slug: true }
        },
        parent: {
          select: { content: true, authorName: true }
        }
      }
    });
    return NextResponse.json(comments);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch comments' }, { status: 500 });
  }
});
