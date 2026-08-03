const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');
const p = new PrismaClient();

async function main() {
  const hash = (pw) => bcrypt.hash(pw, 12);

  await p.admin.upsert({
    where: { email: 'ops@placedly.in' },
    update: { passwordHash: await hash('Admin@Demo25'), isActive: true },
    create: { name: 'Demo Admin', email: 'ops@placedly.in', passwordHash: await hash('Admin@Demo25') },
  });
  console.log('admin: ops@placedly.in / Admin@Demo25');

  await p.recruiter.upsert({
    where: { email: 'recruiter@placedly.com' },
    update: { passwordHash: await hash('Recruiter@Demo25'), isActive: true },
    create: { name: 'Demo Recruiter', email: 'recruiter@placedly.com', phone: '9999999999', passwordHash: await hash('Recruiter@Demo25') },
  });
  console.log('recruiter: recruiter@placedly.com / Recruiter@Demo25');

  await p.freelancer.upsert({
    where: { email: 'partner@placedly.com' },
    update: { passwordHash: await hash('Partner@Demo25'), isActive: true, kycVerified: true },
    create: { name: 'Demo Partner', email: 'partner@placedly.com', phone: '8888888888', city: 'Delhi', passwordHash: await hash('Partner@Demo25'), referralCode: 'DEMO1234', kycVerified: true },
  });
  console.log('partner: partner@placedly.com / Partner@Demo25 (referral DEMO1234)');

  let programme = await p.programme.findFirst({ where: { name: 'CAP — Standard' } });
  if (!programme) {
    programme = await p.programme.create({
      data: { name: 'CAP — Standard', description: 'Employer connect, salary coaching, 30-day post-joining support.', cycleDays: 180 },
    });
  }
  {
    const app = await p.candidateApplication.upsert({
      where: { email: 'demo@placedly.in' },
      update: { name: 'Demo Candidate', phone: '7777777777', city: 'Mumbai', experience: '0-2', targetRole: 'IT Analyst', status: 'APPROVED', programmeId: programme.id },
      create: { name: 'Demo Candidate', email: 'demo@placedly.in', phone: '7777777777', city: 'Mumbai', experience: '0-2', targetRole: 'IT Analyst', programmeId: programme.id, status: 'APPROVED' },
    });
    await p.candidate.upsert({
      where: { email: 'demo@placedly.in' },
      update: { passwordHash: await hash('Candidate@Demo25'), name: 'Demo Candidate', phone: '7777777777', status: 'ACTIVE', validUntil: new Date(Date.now() + 365 * 86400000) },
      create: {
        email: 'demo@placedly.in', passwordHash: await hash('Candidate@Demo25'),
        name: 'Demo Candidate', phone: '7777777777', applicationId: app.id,
        status: 'ACTIVE', validUntil: new Date(Date.now() + 365 * 86400000),
        capStep: 3, city: 'Mumbai', experience: '0-2', currentRole: 'Student', targetRole: 'IT Analyst',
        interviewSchedule: 'Mock Interview 1 — Fri 3:30 PM (Google Meet link in email)',
        advisorFeedback: 'Strong communication. Focus on SQL practice and STAR-format answers before the next mock.',
      },
    });
    console.log('candidate: demo@placedly.in / Candidate@Demo25 (CAP approved)');
  }
}

main().then(() => p.$disconnect()).catch((e) => { console.error(e); process.exit(1); });
