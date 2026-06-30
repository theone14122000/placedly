import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

async function getCandidate(session: any) {
  const candidateId = (session?.user as any)?.candidateId;
  if (!candidateId) return null;
  return prisma.candidate.findUnique({
    where: { id: candidateId },
    include: {
      application: { include: { programme: true } },
    },
  });
}

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session || (session.user as any)?.role !== 'candidate') {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  const candidate = await getCandidate(session);
  if (!candidate) return NextResponse.json({ error: 'Not found' }, { status: 404 });

  return NextResponse.json({
    id: candidate.id,
    name: candidate.name,
    email: candidate.email,
    phone: candidate.phone,
    city: candidate.city ?? candidate.application.city,
    experience: candidate.experience ?? candidate.application.experience,
    currentRole: candidate.currentRole ?? candidate.application.currentRole,
    targetRole: candidate.targetRole ?? candidate.application.targetRole,
    status: candidate.status,
    validUntil: candidate.validUntil,
    approvedAt: candidate.approvedAt,
    programme: candidate.application.programme.name,
    applicationStatus: candidate.application.status,
    capStep: (candidate as any).capStep ?? 1,
  });
}

export async function PATCH(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session || (session.user as any)?.role !== 'candidate') {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  const candidateId = (session?.user as any)?.candidateId;
  if (!candidateId) return NextResponse.json({ error: 'Not found' }, { status: 404 });

  const body = await req.json();
  const allowed = ['phone', 'city', 'currentRole', 'targetRole'];
  const data: Record<string, string> = {};
  for (const key of allowed) {
    if (typeof body[key] === 'string' && body[key].trim()) {
      data[key] = body[key].trim().slice(0, 200);
    }
  }

  const updated = await prisma.candidate.update({ where: { id: candidateId }, data });
  return NextResponse.json({ ok: true, updated });
}
