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

  const { candidateId } = await req.json();
  if (!candidateId) return NextResponse.json({ error: 'candidateId required' }, { status: 400 });

  const candidate = await prisma.candidate.findUnique({
    where: { id: candidateId },
    include: { application: { include: { programme: true } } },
  });
  if (!candidate) return NextResponse.json({ error: 'Candidate not found' }, { status: 404 });

  const plainPassword = generatePassword();
  const passwordHash = await hashPassword(plainPassword);

  await prisma.candidate.update({ where: { id: candidateId }, data: { passwordHash } });

  // Re-send approval email with new password
  try {
    await sendApprovalEmail({
      to: candidate.email,
      name: candidate.name,
      password: plainPassword,
      validUntil: candidate.validUntil,
    });
  } catch {}

  return NextResponse.json({ success: true, password: plainPassword, email: candidate.email });
}
