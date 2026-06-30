const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function main() {
  const programme = await prisma.programme.findFirst({ where: { name: 'CAP — Standard' } });
  if (!programme) { console.error('No programme found — run seed.js first'); process.exit(1); }

  const email = 'demo@placedly.in';
  const password = 'Demo@1234';
  const hash = await bcrypt.hash(password, 12);

  // Upsert application
  let app = await prisma.candidateApplication.findUnique({ where: { email } });
  if (!app) {
    app = await prisma.candidateApplication.create({
      data: {
        name: 'Demo Candidate',
        email,
        phone: '+91 99999 00001',
        city: 'Mumbai',
        experience: '1–3 years',
        currentRole: 'Business Analyst',
        targetRole: 'Senior Analyst at an MNC',
        programmeId: programme.id,
        status: 'APPROVED',
      },
    });
    console.log('✅ Created demo application');
  } else {
    console.log('⏭ Demo application already exists');
  }

  // Upsert candidate
  const existing = await prisma.candidate.findUnique({ where: { email } });
  if (!existing) {
    const validUntil = new Date(Date.now() + programme.cycleDays * 24 * 60 * 60 * 1000);
    await prisma.candidate.create({
      data: {
        email,
        passwordHash: hash,
        name: 'Demo Candidate',
        phone: '+91 99999 00001',
        applicationId: app.id,
        status: 'ACTIVE',
        validUntil,
      },
    });
    console.log('✅ Created demo candidate');
    console.log('   Email:    demo@placedly.in');
    console.log('   Password: Demo@1234');
    console.log('   Access until:', validUntil.toDateString());
  } else {
    console.log('⏭ Demo candidate already exists');
    console.log('   Email:    demo@placedly.in');
    console.log('   Password: Demo@1234');
  }
}

main().catch(e => { console.error(e); process.exit(1); }).finally(() => prisma.$disconnect());
