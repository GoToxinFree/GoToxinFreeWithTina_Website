import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const posts = await prisma.post.findMany();
  let updated = 0;
  
  for (const post of posts) {
    let needsUpdate = false;
    let newImageUrl = post.imageUrl;
    let newContent = post.content;
    
    if (newImageUrl && newImageUrl.startsWith('/uploads/')) {
      newImageUrl = newImageUrl.replace('/uploads/', '/api/uploads/');
      needsUpdate = true;
    }
    
    if (newContent && newContent.includes('/uploads/')) {
      newContent = newContent.replace(/\/uploads\//g, '/api/uploads/');
      needsUpdate = true;
    }
    
    if (needsUpdate) {
      await prisma.post.update({
        where: { id: post.id },
        data: { imageUrl: newImageUrl, content: newContent }
      });
      updated++;
    }
  }
  
  console.log('Updated ' + updated + ' posts.');
}

main().catch(console.error).finally(() => prisma.$disconnect());
