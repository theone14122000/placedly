import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

const DEFAULT_PROGRAMMES = [
  { name: 'CAP — Basic',    description: 'Resume rebuild + 3 mock interviews + job matching.', cycleDays: 90 },
  { name: 'CAP — Standard', description: 'Employer connect, salary coaching, 30-day post-joining support.', cycleDays: 180 },
  { name: 'CAP — Premium',  description: 'Priority placement, dedicated advisor, 6-month follow-up.', cycleDays: 365 },
  { name: 'Study Visa',     description: 'University shortlisting, application support, visa assistance.', cycleDays: 180 },
];

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  const _role = (session?.user as any)?.role;
  if (!session || !['admin', 'master_admin'].includes(_role)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const results = await Promise.all(
    DEFAULT_PROGRAMMES.map(p =>
      prisma.programme.upsert({
        where: { name: p.name } as any,
        update: {},
        create: p,
      }).catch(() => prisma.programme.create({ data: p }))
    )
  );

  return NextResponse.json({ seeded: results.length });
}
