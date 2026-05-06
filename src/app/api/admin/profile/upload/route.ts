import { NextResponse } from 'next/server';
import { auth } from '@/auth';
import { promises as fs } from 'fs';
import path from 'path';

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

    // We only accept image files
    if (!file.type.startsWith('image/')) {
      return NextResponse.json({ error: 'File must be an image' }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Save to public directory as owner.jpeg
    const publicPath = path.join(process.cwd(), 'public');
    const filePath = path.join(publicPath, 'owner.jpeg');
    
    // Ensure public dir exists
    await fs.mkdir(publicPath, { recursive: true });
    
    // Write file
    await fs.writeFile(filePath, buffer);

    // Return the URL
    // We add a timestamp query parameter to bypass browser caching when updated
    const url = `/owner.jpeg?v=${Date.now()}`;
    return NextResponse.json({ url });
  } catch (error) {
    console.error("Profile upload error:", error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
