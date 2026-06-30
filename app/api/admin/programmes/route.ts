import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

export async function GET() {
  // Public — needed for the CAP apply form to list programmes
  const programmes = await prisma.programme.findMany({
    where: { isActive: true },
    select: { id: true, name: true, description: true, cycleDays: true },
    orderBy: { name: 'asc' },
  });
  return NextResponse.json(programmes);
}

async function adminCheck() {
  const session = await getServerSession(authOptions);
  const role = (session?.user as any)?.role;
  return !session || !['admin', 'master_admin'].includes(role);
}

export async function POST(req: NextRequest) {
  if (await adminCheck()) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const { name, description, cycleDays } = await req.json();
  if (!name || !cycleDays) return NextResponse.json({ error: 'name and cycleDays required' }, { status: 400 });
  const programme = await prisma.programme.create({ data: { name, description, cycleDays: Number(cycleDays) } });
  return NextResponse.json(programme, { status: 201 });
}

export async function PUT(req: NextRequest) {
  if (await adminCheck()) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const { id, name, description, cycleDays, isActive } = await req.json();
  if (!id) return NextResponse.json({ error: 'id required' }, { status: 400 });
  const programme = await prisma.programme.update({ where: { id }, data: { name, description, cycleDays: Number(cycleDays), ...(isActive !== undefined ? { isActive } : {}) } });
  return NextResponse.json(programme);
}
