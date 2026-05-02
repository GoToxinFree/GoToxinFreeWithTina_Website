const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  try {
    const posts = await prisma.post.findMany({ take: 1 });
    console.log('Successfully fetched posts:', posts.length);
    process.exit(0);
  } catch (err) {
    console.error('Prisma Error:', err.message);
    process.exit(1);
  }
}

main();
