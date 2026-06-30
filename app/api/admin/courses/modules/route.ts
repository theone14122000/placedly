import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

async function adminCheck() {
  const session = await getServerSession(authOptions);
  const role = (session?.user as any)?.role;
  return !session || !['admin', 'master_admin'].includes(role);
}

// GET /api/admin/courses/modules?courseId=xxx
export async function GET(req: NextRequest) {
  const courseId = new URL(req.url).searchParams.get('courseId');
  if (!courseId) return NextResponse.json({ error: 'courseId required' }, { status: 400 });
  const modules = await prisma.courseModule.findMany({
    where: { courseId, isActive: true },
    orderBy: { sortOrder: 'asc' },
  });
  return NextResponse.json(modules);
}

// POST — create a module
export async function POST(req: NextRequest) {
  if (await adminCheck()) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const { courseId, title, type, url, content, sortOrder } = await req.json();
  if (!courseId || !title || !type) return NextResponse.json({ error: 'courseId, title, type required' }, { status: 400 });
  const module = await prisma.courseModule.create({
    data: { courseId, title, type, url: url ?? null, content: content ?? null, sortOrder: sortOrder ?? 0 },
  });
  return NextResponse.json(module, { status: 201 });
}

// PUT — update a module
export async function PUT(req: NextRequest) {
  if (await adminCheck()) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const { id, ...data } = await req.json();
  const module = await prisma.courseModule.update({ where: { id }, data });
  return NextResponse.json(module);
}

// DELETE — soft delete
export async function DELETE(req: NextRequest) {
  if (await adminCheck()) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const { id } = await req.json();
  await prisma.courseModule.update({ where: { id }, data: { isActive: false } });
  return NextResponse.json({ ok: true });
}
