import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

function adminOnly(session: any) {
  const r = session?.user?.role;
  return !session || (r !== 'admin' && r !== 'master_admin');
}

export async function GET(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (adminOnly(session)) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const { searchParams } = new URL(req.url);
  const status = searchParams.get('status') ?? undefined;

  const applications = await prisma.candidateApplication.findMany({
    where: status ? { status: status as any } : undefined,
    include: { programme: { select: { name: true, cycleDays: true } }, candidate: { select: { id: true, status: true, validUntil: true } } },
    orderBy: { createdAt: 'desc' },
  });

  return NextResponse.json(applications);
}
