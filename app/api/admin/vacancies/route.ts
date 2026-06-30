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
  const vacancies = await prisma.vacancy.findMany({ orderBy: { createdAt: 'desc' } });
  return NextResponse.json(vacancies);
}

export async function POST(req: NextRequest) {
  if (await adminCheck()) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const data = await req.json();
  const vacancy = await prisma.vacancy.create({ data });
  return NextResponse.json(vacancy, { status: 201 });
}

export async function PUT(req: NextRequest) {
  if (await adminCheck()) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const { id, ...data } = await req.json();
  const vacancy = await prisma.vacancy.update({ where: { id }, data });
  return NextResponse.json(vacancy);
}

export async function DELETE(req: NextRequest) {
  if (await adminCheck()) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const { id } = await req.json();
  await prisma.vacancy.delete({ where: { id } });
  return NextResponse.json({ ok: true });
}
