import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { sendRenewalEmail } from '@/lib/email';

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  const role = (session?.user as any)?.role;
  if (!session || (role !== 'admin' && role !== 'master_admin')) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { candidateId } = await req.json();
  if (!candidateId) return NextResponse.json({ error: 'candidateId required' }, { status: 400 });

  const candidate = await prisma.candidate.findUnique({
    where: { id: candidateId },
    include: { application: { include: { programme: true } } },
  });

  if (!candidate) return NextResponse.json({ error: 'Candidate not found' }, { status: 404 });

  const cycleDays = candidate.application.programme.cycleDays;
  const now = new Date();
  // If expired, start fresh from now. If still active, extend from current validUntil.
  const base = candidate.validUntil > now ? candidate.validUntil : now;
  const validUntil = new Date(base.getTime() + cycleDays * 24 * 60 * 60 * 1000);

  await prisma.candidate.update({
    where: { id: candidateId },
    data: { validUntil, status: 'ACTIVE' },
  });

  await sendRenewalEmail({ to: candidate.email, name: candidate.name, validUntil });

  return NextResponse.json({ success: true, validUntil });
}
