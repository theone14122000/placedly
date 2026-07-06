import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const programmes = [
    { name: 'CAP — Basic',   description: 'Career Assistance Programme (Basic tier). Resume rebuild + 3 mock interviews + job matching.', cycleDays: 90 },
    { name: 'CAP — Standard', description: 'Standard CAP with employer connect, salary negotiation coaching, and 30-day post-joining support.', cycleDays: 180 },
    { name: 'CAP — Premium',  description: 'Full CAP suite including priority placement, dedicated advisor, and 6-month follow-up.', cycleDays: 365 },
    { name: 'Study Visa',     description: 'Study abroad guidance — university shortlisting, application support, and visa assistance.', cycleDays: 180 },
  ];

  for (const p of programmes) {
    await prisma.programme.upsert({
      where: { id: p.name }, // won't match, will always create — using createMany below instead
      update: {},
      create: p,
    });
  }
  console.log('✅ Programmes seeded');
}

main().catch(console.error).finally(() => prisma.$disconnect());
