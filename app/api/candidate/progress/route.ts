import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session || (session.user as any)?.role !== 'candidate') {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  const candidateId = (session?.user as any)?.candidateId;
  if (!candidateId) return NextResponse.json({ error: 'Not found' }, { status: 404 });

  const progress = await prisma.courseProgress.findMany({
    where: { candidateId },
    select: { courseId: true, moduleIndex: true, completedAt: true },
  });
  return NextResponse.json(progress);
}

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session || (session.user as any)?.role !== 'candidate') {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  const candidateId = (session?.user as any)?.candidateId;
  if (!candidateId) return NextResponse.json({ error: 'Not found' }, { status: 404 });

  const { courseId, moduleIndex } = await req.json();
  if (!courseId || typeof moduleIndex !== 'number') {
    return NextResponse.json({ error: 'courseId and moduleIndex required' }, { status: 400 });
  }

  await prisma.courseProgress.upsert({
    where: { candidateId_courseId_moduleIndex: { candidateId, courseId, moduleIndex } },
    create: { candidateId, courseId, moduleIndex },
    update: {},
  });
  return NextResponse.json({ ok: true });
}

export async function DELETE(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session || (session.user as any)?.role !== 'candidate') {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  const candidateId = (session?.user as any)?.candidateId;
  if (!candidateId) return NextResponse.json({ error: 'Not found' }, { status: 404 });

  const { courseId, moduleIndex } = await req.json();
  if (!courseId || typeof moduleIndex !== 'number') {
    return NextResponse.json({ error: 'courseId and moduleIndex required' }, { status: 400 });
  }

  await prisma.courseProgress.deleteMany({ where: { candidateId, courseId, moduleIndex } });
  return NextResponse.json({ ok: true });
}
