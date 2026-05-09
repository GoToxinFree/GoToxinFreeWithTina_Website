const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function verify() {
  const posts = await prisma.post.findMany({ select: { title: true, published: true, slug: true } });
  console.log('Posts in MySQL:');
  posts.forEach(p => console.log(' ', p.published ? '[PUBLISHED]' : '[DRAFT]', p.title));
  const user = await prisma.user.findFirst({ select: { name: true, email: true } });
  console.log('Admin user:', user?.name, user?.email);
  await prisma.$disconnect();
}

verify().catch(e => { console.error(e); process.exit(1); });
