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

export async function GET(_: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const s = await check();
  if (!s) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const { id } = await params;
  const notes = await prisma.applicationNote.findMany({
    where: { applicationId: id },
    orderBy: { createdAt: 'desc' },
  });
  return NextResponse.json(notes);
}

export async function POST(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const s = await check();
  if (!s) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const { id } = await params;
  const { content, type } = await req.json();
  if (!content?.trim()) return NextResponse.json({ error: 'content required' }, { status: 400 });
  const note = await prisma.applicationNote.create({
    data: {
      applicationId: id,
      content: content.trim(),
      type: type ?? 'GENERAL',
      authorName: (s.user as any)?.name ?? 'Recruiter',
    },
  });
  return NextResponse.json(note, { status: 201 });
}
