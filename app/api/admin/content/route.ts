import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { revalidatePath } from 'next/cache';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const prefix = searchParams.get('prefix') ?? '';

  const rows = await prisma.siteContent.findMany({
    where: prefix ? { key: { startsWith: prefix } } : undefined,
  });

  const map: Record<string, string> = {};
  rows.forEach(r => { map[r.key] = r.value; });
  return NextResponse.json(map);
}

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  const role = (session?.user as any)?.role;
  if (!session || !['admin', 'master_admin'].includes(role)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const body: Record<string, string> = await req.json();

  await Promise.all(
    Object.entries(body).map(([key, value]) =>
      prisma.siteContent.upsert({
        where: { key },
        update: { value },
        create: { key, value },
      })
    )
  );

  // Revalidate all pages that render CMS content
  revalidatePath('/', 'layout');

  return NextResponse.json({ ok: true });
}
