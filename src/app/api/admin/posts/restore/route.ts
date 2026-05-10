import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { auth } from '@/auth';
import JSZip from 'jszip';
import { promises as fs } from 'fs';
import { UPLOADS_DIR } from '@/lib/uploadPath';
import path from 'path';

export async function POST(req: Request) {
  try {
    const session = await auth();
    if (!session || !session.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const formData = await req.formData();
    const file = formData.get('file') as File;

    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 });
    }

    const arrayBuffer = await file.arrayBuffer();
    const zip = await JSZip.loadAsync(arrayBuffer);

    // 1. Get JSON data
    const jsonFile = zip.file('articles.json');
    if (!jsonFile) {
      return NextResponse.json({ error: 'Invalid backup file: articles.json missing' }, { status: 400 });
    }

    const jsonData = JSON.parse(await jsonFile.async('string'));
    const articles = jsonData.articles;

    // 2. Extract Images to the same folder the upload API uses
    const imagesFolder = zip.folder('images');
    await fs.mkdir(UPLOADS_DIR, { recursive: true });

    if (imagesFolder) {
      const imageFiles = Object.keys(zip.files).filter(f => f.startsWith('images/') && !zip.files[f].dir);
      
      for (const filePath of imageFiles) {
        const fileName = filePath.replace('images/', '');
        const imageBuffer = await zip.files[filePath].async('nodebuffer');
        await fs.writeFile(path.join(UPLOADS_DIR, fileName), imageBuffer);
      }
    }

    // 3. Restore Database (Upsert)
    let restoredCount = 0;
    const author = await prisma.user.findFirst({ where: { email: session.user.email || "" } });

    if (!author) {
       return NextResponse.json({ error: 'Author not found' }, { status: 400 });
    }

    for (const article of articles) {
      // Create or update tags first
      const tagIds = [];
      if (article.tags && Array.isArray(article.tags)) {
        for (const tagName of article.tags) {
          const tag = await prisma.tag.upsert({
            where: { name: tagName },
            update: {},
            create: { name: tagName }
          });
          tagIds.push({ id: tag.id });
        }
      }

      // Ensure backward compatibility with old backups that used /uploads/
      let finalImageUrl = article.imageUrl;
      if (finalImageUrl && finalImageUrl.startsWith('/uploads/')) {
        finalImageUrl = finalImageUrl.replace('/uploads/', '/api/uploads/');
      }

      let finalContent = article.content;
      if (finalContent && finalContent.includes('/uploads/')) {
        finalContent = finalContent.replace(/\/uploads\//g, '/api/uploads/');
      }

      await prisma.post.upsert({
        where: { slug: article.slug },
        update: {
          title: article.title,
          content: finalContent,
          excerpt: article.excerpt,
          imageUrl: finalImageUrl,
          published: article.published,
          updatedAt: new Date(),
          tags: {
            set: [], // Clear existing tags
            connect: tagIds
          }
        },
        create: {
          title: article.title,
          slug: article.slug,
          content: finalContent,
          excerpt: article.excerpt,
          imageUrl: finalImageUrl,
          published: article.published,
          authorId: author.id,
          createdAt: new Date(article.createdAt),
          tags: {
            connect: tagIds
          }
        }
      });
      restoredCount++;
    }

    return NextResponse.json({ 
      success: true, 
      message: `Successfully restored ${restoredCount} articles and images.` 
    });

  } catch (error) {
    console.error('Restore API Error:', error);
    return NextResponse.json({ 
      error: 'Failed to restore backup',
      details: error instanceof Error ? error.message : String(error)
    }, { status: 500 });
  }
}
