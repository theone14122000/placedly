import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { generatePassword, hashPassword } from '@/lib/password';
import { sendApprovalEmail } from '@/lib/email';

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  const role = (session?.user as any)?.role;
  if (!session || (role !== 'admin' && role !== 'master_admin')) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { applicationId } = await req.json();
  if (!applicationId) return NextResponse.json({ error: 'applicationId required' }, { status: 400 });

  const application = await prisma.candidateApplication.findUnique({
    where: { id: applicationId },
    include: { programme: true },
  });

  if (!application) return NextResponse.json({ error: 'Application not found' }, { status: 404 });
  if (application.status === 'APPROVED') return NextResponse.json({ error: 'Already approved' }, { status: 409 });

  const plainPassword = generatePassword();
  const passwordHash = await hashPassword(plainPassword);
  const now = new Date();
  const validUntil = new Date(now.getTime() + application.programme.cycleDays * 24 * 60 * 60 * 1000);

  await prisma.$transaction([
    prisma.candidateApplication.update({
      where: { id: applicationId },
      data: { status: 'APPROVED' },
    }),
    prisma.candidate.create({
      data: {
        email: application.email,
        name: application.name,
        phone: application.phone,
        passwordHash,
        applicationId,
        approvedAt: now,
        validUntil,
      },
    }),
  ]);

  await sendApprovalEmail({
    to: application.email,
    name: application.name,
    password: plainPassword,
    validUntil,
  });

  return NextResponse.json({ success: true, validUntil, password: plainPassword, email: application.email });
}
