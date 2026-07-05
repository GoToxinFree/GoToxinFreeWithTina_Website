import { NextResponse } from 'next/server';
import { auth } from '@/auth';
import { promises as fs } from 'fs';
import { v4 as uuidv4 } from 'uuid';
import { UPLOADS_DIR, getUploadFilePath } from '@/lib/uploadPath';

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

