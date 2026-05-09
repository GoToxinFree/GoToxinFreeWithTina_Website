const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function run() {
  const user = await prisma.user.findFirst();
  console.log('Current user email:', user?.email);
  
  if (user) {
    await prisma.user.update({
      where: { id: user.id },
      data: { email: 'drsupriti@gotoxinfreewithtina.com' }
    });
    console.log('Updated user email to drsupriti@gotoxinfreewithtina.com');
  } else {
    console.log('No user found');
  }
}

run()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
