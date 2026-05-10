import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import JSZip from 'jszip';
import { promises as fs } from 'fs';
import path from 'path';

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

    const zip = new JSZip();
    
    // 1. Prepare JSON data
    const backupData = {
      version: '2.0',
      exportedAt: new Date().toISOString(),
      count: posts.length,
      articles: posts.map(post => ({
        ...post,
        author: post.author.name || post.author.email,
        tags: post.tags.map(t => t.name),
      }))
    };

    zip.file('articles.json', JSON.stringify(backupData, null, 2));

    // 2. Collect and bundle images
    const imagesFolder = zip.folder('images');
    const processedImages = new Set<string>();

    for (const post of posts) {
      if (post.imageUrl && post.imageUrl.startsWith('/uploads/')) {
        const fileName = post.imageUrl.replace('/uploads/', '');
        if (!processedImages.has(fileName)) {
          try {
            const filePath = path.join(process.cwd(), 'public', 'uploads', fileName);
            const imageBuffer = await fs.readFile(filePath);
            imagesFolder?.file(fileName, imageBuffer);
            processedImages.add(fileName);
          } catch (err) {
            console.warn(`Could not find image: ${fileName}`);
          }
        }
      }
    }

    // 3. Generate ZIP buffer
    const zipBuffer = await zip.generateAsync({ type: 'nodebuffer' });
    const fileName = `gotoxinfree-backup-${new Date().toISOString().split('T')[0]}.zip`;

    return new NextResponse(zipBuffer, {
      status: 200,
      headers: {
        'Content-Type': 'application/zip',
        'Content-Disposition': `attachment; filename="${fileName}"`,
      },
    });
  } catch (error) {
    console.error('Export API Error:', error);
    return NextResponse.json({ 
      error: 'Failed to export backup',
      details: error instanceof Error ? error.message : String(error)
    }, { status: 500 });
  }
}
