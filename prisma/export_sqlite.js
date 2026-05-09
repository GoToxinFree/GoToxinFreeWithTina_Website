const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function exportData() {
  const users = await prisma.user.findMany({ include: { accounts: true, sessions: true } });
  const posts = await prisma.post.findMany({ include: { tags: true } });
  const tags = await prisma.tag.findMany();
  const comments = await prisma.comment.findMany();
  const subscribers = await prisma.subscriber.findMany();

  const data = { users, posts, tags, comments, subscribers };
  require('fs').writeFileSync('prisma/sqlite_export.json', JSON.stringify(data, null, 2));

  console.log('Export complete:');
  console.log('  Users:', users.length);
  console.log('  Posts:', posts.length);
  console.log('  Tags:', tags.length);
  console.log('  Comments:', comments.length);
  console.log('  Subscribers:', subscribers.length);

  await prisma.$disconnect();
}

exportData().catch(e => { console.error(e); process.exit(1); });
