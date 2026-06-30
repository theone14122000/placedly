import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

export async function GET(req: NextRequest) {
  const s = await getServerSession(authOptions);
  const role = (s?.user as any)?.role;
  if (!s || (role !== 'recruiter' && role !== 'master_admin' && role !== 'admin')) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const apps = await prisma.jobApplication.findMany({
    include: {
      recruiter: { select: { name: true } },
      notes:     { orderBy: { createdAt: 'desc' }, take: 1 },
    },
    orderBy: { createdAt: 'desc' },
  });

  // Build CSV
  const headers = ['Name', 'Email', 'Phone', 'Role', 'Stage', 'Status', 'Recruiter', 'Last Note', 'Applied On'];
  const rows = apps.map(a => [
    a.name, a.email, a.phone, a.role,
    a.currentStage, a.currentStatus,
    a.recruiter?.name ?? '',
    a.notes[0]?.content?.replace(/,/g, ';') ?? '',
    new Date(a.createdAt).toLocaleDateString('en-IN'),
  ]);

  const csv = [headers, ...rows].map(r => r.map(v => `"${v}"`).join(',')).join('\n');

  return new NextResponse(csv, {
    headers: {
      'Content-Type': 'text/csv',
      'Content-Disposition': `attachment; filename="ats-export-${Date.now()}.csv"`,
    },
  });
}
