/**
 * Dynamic file-serve route: GET /uploads/[filename]
 *
 * This route serves uploaded images directly from the UPLOADS_DIR (which on
 * Hostinger is the persistent file_uploads folder, and locally is public/uploads).
 * It replaces the server.js intercept approach, which was unreliable because
 * Hostinger runs the Next.js standalone server directly, bypassing the outer wrapper.
 *
 * URL pattern: /uploads/abc.jpg → reads UPLOADS_DIR/abc.jpg → streams to browser
 * All existing /uploads/ URLs in the database continue to work unchanged.
 */
import { NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import { existsSync } from 'fs';
import path from 'path';
import { UPLOADS_DIR } from '@/lib/uploadPath';

export const dynamic = 'force-dynamic';

const MIME_TYPES: Record<string, string> = {
  '.jpg':  'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.png':  'image/png',
  '.gif':  'image/gif',
  '.webp': 'image/webp',
  '.svg':  'image/svg+xml',
  '.ico':  'image/x-icon',
};

export async function GET(
  _req: Request,
  { params }: { params: { filename: string } }
) {
  const { filename } = params;

  // Security: prevent path traversal attacks
  const safeFilename = path.basename(filename);
  const filePath = path.join(UPLOADS_DIR, safeFilename);

  if (!existsSync(filePath)) {
    return new NextResponse('Image not found', { status: 404 });
  }

  try {
    const buffer = await fs.readFile(filePath);
    const ext = path.extname(safeFilename).toLowerCase();
    const contentType = MIME_TYPES[ext] || 'application/octet-stream';

    return new NextResponse(buffer, {
      status: 200,
      headers: {
        'Content-Type': contentType,
        'Cache-Control': 'public, max-age=31536000, immutable',
      },
    });
  } catch (err) {
    console.error(`[uploads route] Failed to read file ${filePath}:`, err);
    return new NextResponse('Failed to read image', { status: 500 });
  }
}
