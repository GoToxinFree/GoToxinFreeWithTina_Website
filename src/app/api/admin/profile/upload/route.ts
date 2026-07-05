import { NextResponse } from 'next/server';
import { auth } from '@/auth';
import { promises as fs } from 'fs';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';
import { UPLOADS_DIR, getUploadFilePath } from '@/lib/uploadPath';
import { prisma } from '@/lib/prisma';

export async function POST(req: Request) {
  try {
    const session = await auth();
    if (!session || !session.user || !session.user.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const formData = await req.formData();
    const file = formData.get('file') as File;

    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 });
    }

    if (!file.type.startsWith('image/')) {
      return NextResponse.json({ error: 'File must be an image' }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Save with a unique UUID filename — same approach as article images.
    // This gives every upload a distinct URL, naturally busting browser/CDN caches
    // on all devices and systems without relying on ?v= query parameters.
    const fileExtension = file.name.split('.').pop() || 'jpg';
    const fileName = `profile-${uuidv4()}.${fileExtension}`;

    // Delete the previous profile image from disk before saving the new one,
    // so orphaned files don't accumulate in UPLOADS_DIR over time.
    // Only delete files we own (path starts with /api/uploads/profile-).
    // External URLs (e.g. Google avatar) or the legacy /owner.jpeg are left untouched.
    try {
      const currentUser = await prisma.user.findUnique({
        where: { email: session.user.email },
        select: { image: true },
      });
      const oldImage = currentUser?.image ?? '';
      if (oldImage.startsWith('/api/uploads/profile-')) {
        const oldFileName = path.basename(oldImage.split('?')[0]);
        const oldFilePath = getUploadFilePath(oldFileName);
        await fs.unlink(oldFilePath);
        console.log(`Profile upload: Deleted old image ${oldFilePath}`);
      }
    } catch (cleanupErr) {
      // Non-fatal — log and continue so the new upload always succeeds
      console.warn('Profile upload: Could not delete old image file:', cleanupErr);
    }

    await fs.mkdir(UPLOADS_DIR, { recursive: true });
    await fs.writeFile(getUploadFilePath(fileName), buffer);

    console.log(`Profile upload: Saved to ${getUploadFilePath(fileName)}`);

    // Return the same /api/uploads/ path used by article images
    const url = `/api/uploads/${fileName}`;
    return NextResponse.json({ url });
  } catch (error) {
    console.error("Profile upload error:", error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

