import { NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';
import { getUploadFilePath } from '@/lib/uploadPath';

export async function GET(
  request: Request,
  { params }: { params: Promise<{ path: string[] }> }
) {
  try {
    const { path: pathArray } = await params;
    const fileName = pathArray.join('/');
    const filePath = getUploadFilePath(fileName);

    const fileBuffer = await fs.readFile(filePath);

    const ext = path.extname(filePath).toLowerCase();
    const mimeTypes: Record<string, string> = {
      '.png': 'image/png',
      '.jpg': 'image/jpeg',
      '.jpeg': 'image/jpeg',
      '.gif': 'image/gif',
      '.webp': 'image/webp',
      '.svg': 'image/svg+xml',
    };

    return new NextResponse(fileBuffer, {
      status: 200,
      headers: {
        'Content-Type': mimeTypes[ext] || 'application/octet-stream',
        'Cache-Control': 'public, max-age=31536000, immutable',
      },
    });
  } catch (error: any) {
    console.error(`[Image API Error] Failed to read image:`, error.message);
    return new NextResponse('File not found', { status: 404 });
  }
}
