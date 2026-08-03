import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { auditLog } from '@/lib/audit';

async function masterOnly() {
  const session = await getServerSession(authOptions);
  return session && (session.user as any)?.role === 'master_admin' ? session : null;
}

export async function GET() {
  if (!await masterOnly()) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const [apps, recruiters] = await Promise.all([
    prisma.jobApplication.findMany({
      include: {
        recruiter: { select: { id: true, name: true } },
        notes:     { orderBy: { createdAt: 'desc' }, take: 1 },
      },
      orderBy: { updatedAt: 'desc' },
    }),
    prisma.recruiter.findMany({
      where: { isActive: true },
      select: { id: true, name: true, email: true },
      orderBy: { createdAt: 'desc' },
    }),
  ]);

  return NextResponse.json({ apps, recruiters });
}

export async function PATCH(req: Request) {
  const session = await masterOnly();
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const body = await req.json();
  const { id, recruiterId } = body;
  if (!id) return NextResponse.json({ error: 'id required' }, { status: 400 });

  const updated = await prisma.jobApplication.update({
    where: { id },
    data: { recruiterId: recruiterId ?? null },
  });

  const actor = session.user?.email ?? 'master_admin';
  await auditLog(actor, 'REASSIGN_APPLICATION', id, `Application reassigned to recruiter ${recruiterId ?? 'unassigned'}`);

  return NextResponse.json(updated);
}