import { prisma } from '@/lib/prisma';
import CommentsClient from './CommentsClient';

export default async function CommentsPage() {
  const comments = await prisma.comment.findMany({
    orderBy: { createdAt: 'desc' },
    include: {
      post: { select: { title: true, slug: true } },
      parent: { select: { content: true, authorName: true } },
    },
  });

  // Serialize dates to strings for client component
  const serialized = comments.map(c => ({
    ...c,
    createdAt: c.createdAt.toISOString(),
  }));

  return <CommentsClient initialComments={serialized} />;
}
