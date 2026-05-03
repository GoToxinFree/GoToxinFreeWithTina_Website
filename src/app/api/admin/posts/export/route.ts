import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export const dynamic = 'force-dynamic';

export async function GET() {

  try {
    const posts = await prisma.post.findMany({
      orderBy: { createdAt: 'desc' },
      include: {
        author: {
          select: {
            name: true,
            email: true,
          }
        },
        tags: true,
      }
    });

    console.log(`Export API: Found ${posts.length} posts`);

    const backup = {
      version: '1.0',
      exportedAt: new Date().toISOString(),
      count: posts.length,
      articles: posts.map(post => ({
        id: post.id,
        title: post.title,
        slug: post.slug,
        content: post.content,
        excerpt: post.excerpt,
        imageUrl: post.imageUrl,
        published: post.published,
        views: post.views,
        createdAt: post.createdAt,
        updatedAt: post.updatedAt,
        author: post.author.name || post.author.email,
        tags: post.tags.map(t => t.name),
      }))
    };

    const fileName = `gotoxinfree-articles-backup-${new Date().toISOString().split('T')[0]}.json`;

    return NextResponse.json(backup, {
      status: 200,
      headers: {
        'Content-Disposition': `attachment; filename="${fileName}"`,
      },
    });
  } catch (error) {
    console.error('Export API Error:', error);
    return NextResponse.json({ 
      error: 'Failed to export articles',
      details: error instanceof Error ? error.message : String(error)
    }, { status: 500 });
  }
}
