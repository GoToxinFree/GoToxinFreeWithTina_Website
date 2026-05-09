const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function run() {
  const user = await prisma.user.findFirst();
  console.log('Current user:', user);
  
  if (user) {
    await prisma.user.update({
      where: { id: user.id },
      data: { image: '/owner.jpeg' }
    });
    console.log('Updated user image to /owner.jpeg');
  } else {
    console.log('No user found');
  }
}

run()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
