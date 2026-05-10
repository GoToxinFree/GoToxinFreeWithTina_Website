import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import JSZip from 'jszip';
import { promises as fs } from 'fs';
import { existsSync } from 'fs';
import { getUploadFilePath } from '@/lib/uploadPath';

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
    // Uses the SAME path resolver as the upload API — guaranteed consistency
    const imagesFolder = zip.folder('images');
    const processedImages = new Set<string>();
    
    console.log(`Export: Scanning ${posts.length} articles for local images...`);

    for (const post of posts) {
      if (post.imageUrl && (post.imageUrl.includes('/uploads/') || post.imageUrl.includes('uploads/'))) {
        const fileName = post.imageUrl.split('uploads/').pop();
        if (fileName && !processedImages.has(fileName)) {
          const filePath = getUploadFilePath(fileName);
          
          console.log(`Export: Looking for image at ${filePath}`);

          if (existsSync(filePath)) {
            try {
              const imageBuffer = await fs.readFile(filePath);
              imagesFolder?.file(fileName, imageBuffer);
              processedImages.add(fileName);
              console.log(`Export: ✓ Bundled image ${fileName}`);
            } catch (err) {
              console.error(`Export: Failed to read image ${fileName}:`, err);
            }
          } else {
            console.error(`Export: ✗ Image file not found: ${filePath}`);
          }
        }
      }
    }
    
    console.log(`Export: Bundled ${processedImages.size} / ${posts.length} images into ZIP.`);

    // 3. Generate ZIP buffer
    const zipBuffer = await zip.generateAsync({ type: 'nodebuffer' });
    
    // Format: YYYY-MM-DD-HH-mm
    const now = new Date();
    const timestamp = now.toISOString().replace(/[:T]/g, '-').slice(0, 16);
    const fileName = `gotoxinfree-backup-${timestamp}.zip`;

    return new NextResponse(new Uint8Array(zipBuffer), {
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
