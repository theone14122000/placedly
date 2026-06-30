import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const programmes = [
    { name: 'CAP — Basic',    description: 'Resume rebuild + 3 mock interviews + job matching.', cycleDays: 90 },
    { name: 'CAP — Standard', description: 'Employer connect, salary coaching, 30-day post-joining support.', cycleDays: 180 },
    { name: 'CAP — Premium',  description: 'Priority placement, dedicated advisor, 6-month follow-up.', cycleDays: 365 },
    { name: 'Study Visa',     description: 'University shortlisting, application support, visa assistance.', cycleDays: 180 },
  ];

  for (const p of programmes) {
    const existing = await prisma.programme.findFirst({ where: { name: p.name } });
    if (!existing) {
      await prisma.programme.create({ data: p });
      console.log(`✅ Created: ${p.name}`);
    } else {
      console.log(`⏭ Already exists: ${p.name}`);
    }
  }
}

main().catch(console.error).finally(() => prisma.$disconnect());
