import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const posts = await prisma.post.findMany({
    orderBy: { createdAt: 'desc' },
    take: 5
  });
  
  posts.forEach(p => {
    console.log(p.slug);
    console.log(p.imageUrl);
    console.log('---');
  });
}

main().catch(console.error).finally(() => prisma.$disconnect());
