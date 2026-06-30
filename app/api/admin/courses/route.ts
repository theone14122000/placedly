import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

async function adminCheck() {
  const session = await getServerSession(authOptions);
  const role = (session?.user as any)?.role;
  return !session || !['admin', 'master_admin'].includes(role);
}

export async function GET() {
  const courses = await prisma.course.findMany({ where: { isActive: true }, orderBy: { createdAt: 'desc' } });
  return NextResponse.json(courses);
}

export async function POST(req: NextRequest) {
  if (await adminCheck()) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const data = await req.json();
  const course = await prisma.course.create({ data });
  return NextResponse.json(course, { status: 201 });
}

export async function PUT(req: NextRequest) {
  if (await adminCheck()) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const { id, ...data } = await req.json();
  const course = await prisma.course.update({ where: { id }, data });
  return NextResponse.json(course);
}

export async function DELETE(req: NextRequest) {
  if (await adminCheck()) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const { id } = await req.json();
  await prisma.course.update({ where: { id }, data: { isActive: false } });
  return NextResponse.json({ ok: true });
}
