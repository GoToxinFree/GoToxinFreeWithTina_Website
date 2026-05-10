import { NextResponse } from 'next/server';
import { auth } from '@/auth';
import { promises as fs } from 'fs';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';

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

    // Only accept images
    if (!file.type.startsWith('image/')) {
      return NextResponse.json({ error: 'File must be an image' }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Create unique filename
    const fileExtension = file.name.split('.').pop();
    const fileName = `${uuidv4()}.${fileExtension}`;
    
    // Path: public/uploads/
    const uploadDir = path.join(process.cwd(), 'public', 'uploads');
    const filePath = path.join(uploadDir, fileName);
    
    // Ensure uploads dir exists
    await fs.mkdir(uploadDir, { recursive: true });
    
    // Write file
    await fs.writeFile(filePath, buffer);

    // Return the public URL
    const url = `/uploads/${fileName}`;
    return NextResponse.json({ url });
  } catch (error) {
    console.error("Image upload error:", error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
