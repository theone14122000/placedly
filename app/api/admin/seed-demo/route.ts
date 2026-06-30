import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { hashPassword } from '@/lib/password';

// ONE-TIME demo seed — hit GET /api/admin/seed-demo once, then delete this file
export async function GET() {
  if (process.env.NODE_ENV === 'production') {
    return NextResponse.json({ error: 'Not allowed in production' }, { status: 403 });
  }

  const results: string[] = [];

  // Demo limited admin
  const adminEmail = 'ops@placedly.in';
  const adminPass  = 'Admin@Demo25';
  await prisma.admin.upsert({
    where: { email: adminEmail },
    update: { passwordHash: await hashPassword(adminPass), isActive: true },
    create: { name: 'Demo Admin', email: adminEmail, passwordHash: await hashPassword(adminPass) },
  });
  results.push(`Admin ready: ${adminEmail} / ${adminPass}`);

  // Demo recruiter
  const recEmail = 'recruiter@placedly.com';
  const recPass  = 'Recruiter@Demo25';
  await prisma.recruiter.upsert({
    where: { email: recEmail },
    update: { passwordHash: await hashPassword(recPass), isActive: true },
    create: { name: 'Demo Recruiter', email: recEmail, phone: '9999999999', passwordHash: await hashPassword(recPass) },
  });
  results.push(`Recruiter ready: ${recEmail} / ${recPass}`);

  // Demo freelancer / partner
  const flEmail = 'partner@placedly.com';
  const flPass  = 'Partner@Demo25';
  await prisma.freelancer.upsert({
    where: { email: flEmail },
    update: { passwordHash: await hashPassword(flPass), isActive: true },
    create: {
      name: 'Demo Partner', email: flEmail, phone: '8888888888',
      city: 'Delhi', passwordHash: await hashPassword(flPass),
      referralCode: 'DEMO1234',
    },
  });
  results.push(`Partner ready: ${flEmail} / ${flPass} — referral code: DEMO1234`);

  return NextResponse.json({ seeded: true, results });
}
