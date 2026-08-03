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
  if (await adminCheck()) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const apps = await prisma.vacancyApplication.findMany({
    include: { vacancy: { select: { id: true, title: true, company: true } } },
    orderBy: { createdAt: 'desc' },
  });
  return NextResponse.json(apps);
}

export async function PATCH(req: NextRequest) {
  if (await adminCheck()) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const { id, status } = await req.json();
  if (!id || !status) return NextResponse.json({ error: 'id and status required' }, { status: 400 });
  const app = await prisma.vacancyApplication.update({ where: { id }, data: { status } });
  return NextResponse.json(app);
}

export async function DELETE(req: NextRequest) {
  if (await adminCheck()) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const { id } = await req.json();
  await prisma.vacancyApplication.delete({ where: { id } });
  return NextResponse.json({ ok: true });
}
