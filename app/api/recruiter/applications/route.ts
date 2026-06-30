import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

async function check() {
  const s = await getServerSession(authOptions);
  const role = (s?.user as any)?.role;
  if (!s || (role !== 'recruiter' && role !== 'master_admin')) return null;
  return s;
}

export async function GET(req: NextRequest) {
  const s = await check();
  if (!s) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const { searchParams } = new URL(req.url);
  const role     = searchParams.get('role') ?? undefined;
  const stage    = searchParams.get('stage') ?? undefined;
  const q        = searchParams.get('q') ?? undefined;
  const userRole = (s.user as any)?.role;
  const userId   = (s.user as any)?.candidateId;

  const apps = await prisma.jobApplication.findMany({
    where: {
      ...(role  ? { role }         : {}),
      ...(stage ? { currentStage: stage } : {}),
      ...(userRole === 'recruiter' ? { recruiterId: userId } : {}),
      ...(q ? {
        OR: [
          { name:  { contains: q, mode: 'insensitive' } },
          { email: { contains: q, mode: 'insensitive' } },
          { phone: { contains: q } },
        ],
      } : {}),
    },
    include: {
      recruiter: { select: { name: true } },
      notes:     { orderBy: { createdAt: 'desc' }, take: 1 },
    },
    orderBy: { updatedAt: 'desc' },
  });

  return NextResponse.json(apps);
}

export async function POST(req: NextRequest) {
  const s = await check();
  if (!s) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const body = await req.json();
  const { name, email, phone, role } = body;
  if (!name || !email || !phone || !role) {
    return NextResponse.json({ error: 'name, email, phone, role required' }, { status: 400 });
  }
  if (!['AP', 'R2R'].includes(role)) {
    return NextResponse.json({ error: 'role must be AP or R2R' }, { status: 400 });
  }

  const userId   = (s.user as any)?.candidateId;
  const userRole = (s.user as any)?.role;

  const app = await prisma.jobApplication.create({
    data: {
      name, email, phone, role,
      resumeUrl:   body.resumeUrl ?? null,
      recruiterId: userRole === 'recruiter' ? userId : (body.recruiterId ?? null),
    },
  });

  return NextResponse.json(app, { status: 201 });
}
