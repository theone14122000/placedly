import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

async function check() {
  const s = await getServerSession(authOptions);
  const role = (s?.user as any)?.role;
  if (!s || (role !== 'admin' && role !== 'master_admin')) return null;
  return s;
}

export async function GET(req: NextRequest) {
  const s = await check();
  if (!s) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const { searchParams } = new URL(req.url);
  const candidateId = searchParams.get('candidateId');
  if (!candidateId) return NextResponse.json({ error: 'candidateId required' }, { status: 400 });

  const notes = await prisma.candidateNote.findMany({
    where: { candidateId },
    orderBy: { createdAt: 'desc' },
  });
  return NextResponse.json(notes);
}

export async function POST(req: NextRequest) {
  const s = await check();
  if (!s) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const { candidateId, content } = await req.json();
  if (!candidateId || !content?.trim()) {
    return NextResponse.json({ error: 'candidateId and content required' }, { status: 400 });
  }

  const note = await prisma.candidateNote.create({
    data: {
      candidateId,
      content: content.trim(),
      authorName: (s.user as any)?.name ?? 'Admin',
    },
  });
  return NextResponse.json(note, { status: 201 });
}