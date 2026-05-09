const { PrismaClient } = require('@prisma/client');
const fs = require('fs');

const prisma = new PrismaClient();
const data = JSON.parse(fs.readFileSync('prisma/sqlite_export.json', 'utf8'));

async function importData() {
  // 1. Import Users
  console.log('Importing users...');
  for (const user of data.users) {
    const { accounts, sessions, ...userData } = user;
    await prisma.user.upsert({
      where: { email: userData.email },
      update: {},
      create: {
        id: userData.id,
        name: userData.name,
        email: userData.email,
        emailVerified: userData.emailVerified ? new Date(userData.emailVerified) : null,
        image: userData.image,
        createdAt: new Date(userData.createdAt),
        updatedAt: new Date(userData.updatedAt),
      }
    });

    // Import linked accounts
    for (const account of (accounts || [])) {
      await prisma.account.upsert({
        where: { provider_providerAccountId: { provider: account.provider, providerAccountId: account.providerAccountId } },
        update: {},
        create: {
          ...account,
          createdAt: new Date(account.createdAt),
          updatedAt: new Date(account.updatedAt),
        }
      });
    }
  }
  console.log(`  ✓ ${data.users.length} users imported`);

  // 2. Import Tags
  console.log('Importing tags...');
  for (const tag of data.tags) {
    await prisma.tag.upsert({
      where: { name: tag.name },
      update: {},
      create: { id: tag.id, name: tag.name }
    });
  }
  console.log(`  ✓ ${data.tags.length} tags imported`);

  // 3. Import Posts
  console.log('Importing posts...');
  for (const post of data.posts) {
    const { tags, ...postData } = post;
    await prisma.post.upsert({
      where: { slug: postData.slug },
      update: {},
      create: {
        id: postData.id,
        title: postData.title,
        slug: postData.slug,
        content: postData.content,
        excerpt: postData.excerpt,
        imageUrl: postData.imageUrl,
        published: postData.published,
        views: postData.views,
        authorId: postData.authorId,
        createdAt: new Date(postData.createdAt),
        updatedAt: new Date(postData.updatedAt),
        tags: {
          connectOrCreate: (tags || []).map(t => ({
            where: { name: t.name },
            create: { id: t.id, name: t.name }
          }))
        }
      }
    });
  }
  console.log(`  ✓ ${data.posts.length} posts imported`);

  // 4. Import Comments
  console.log('Importing comments...');
  for (const comment of data.comments) {
    await prisma.comment.upsert({
      where: { id: comment.id },
      update: {},
      create: {
        ...comment,
        createdAt: new Date(comment.createdAt),
      }
    });
  }
  console.log(`  ✓ ${data.comments.length} comments imported`);

  // 5. Import Subscribers
  console.log('Importing subscribers...');
  for (const sub of data.subscribers) {
    await prisma.subscriber.upsert({
      where: { email: sub.email },
      update: {},
      create: {
        ...sub,
        createdAt: new Date(sub.createdAt),
      }
    });
  }
  console.log(`  ✓ ${data.subscribers.length} subscribers imported`);

  await prisma.$disconnect();
  console.log('\n✅ Migration complete!');
}

importData().catch(e => {
  console.error('Migration failed:', e);
  prisma.$disconnect();
  process.exit(1);
});
