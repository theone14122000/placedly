import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { auditLog } from '@/lib/audit';

async function adminCheck() {
  const session = await getServerSession(authOptions);
  const r = (session?.user as any)?.role;
  return session && (r === 'admin' || r === 'master_admin') ? session : null;
}

export async function GET() {
  if (!await adminCheck()) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const candidates = await prisma.candidate.findMany({
    include: {
      application: { include: { programme: { select: { name: true, cycleDays: true } } } },
    },
    orderBy: { createdAt: 'desc' },
  });

  return NextResponse.json(candidates);
}

export async function PATCH(req: NextRequest) {
  const adminSession = await adminCheck();
  if (!adminSession) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const { id, status, capStep } = await req.json();
  if (!id) return NextResponse.json({ error: 'id required' }, { status: 400 });

  const data: Record<string, any> = {};

  if (status !== undefined) {
    const allowed = ['ACTIVE', 'SUSPENDED', 'EXPIRED'];
    if (!allowed.includes(status)) return NextResponse.json({ error: 'Invalid status' }, { status: 400 });
    data.status = status;
  }

  if (capStep !== undefined) {
    const step = Number(capStep);
    if (isNaN(step) || step < 1 || step > 7) return NextResponse.json({ error: 'capStep must be 1–7' }, { status: 400 });
    data.capStep = step;
  }

  if (Object.keys(data).length === 0) return NextResponse.json({ error: 'Nothing to update' }, { status: 400 });

  const candidate = await prisma.candidate.update({ where: { id }, data });

  const actor = adminSession.user?.email ?? 'admin';
  if (data.status) await auditLog(actor, `SET_CANDIDATE_${data.status}`, id, `Candidate ${candidate.email} → ${data.status}`);
  if (data.capStep) await auditLog(actor, 'UPDATE_CAP_STEP', id, `Candidate ${candidate.email} capStep → ${data.capStep}`);

  return NextResponse.json(candidate);
}
