import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { withDbRetry, countByStatus, sumGroupCounts } from '@/lib/db';

export async function GET() {
  const session = await getServerSession(authOptions);
  const role = (session?.user as { role?: string })?.role;
  if (!session || (role !== 'admin' && role !== 'master_admin')) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const now = new Date();
  const thirtyDaysAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
  const sevenDaysAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);

  try {
    const [
      appByStatus,
      candByStatus,
      activeVacancies,
      activeCourses,
      recentApplications,
      recentCandidates,
      applicationsByProgramme,
      last30DaysApps,
      last7DaysApps,
    ] = await withDbRetry(() =>
      Promise.all([
        prisma.candidateApplication.groupBy({
          by: ['status'],
          _count: { id: true },
        }),
        prisma.candidate.groupBy({
          by: ['status'],
          _count: { id: true },
        }),
        prisma.vacancy.count({ where: { isActive: true } }),
        prisma.course.count({ where: { isActive: true } }),
        prisma.candidateApplication.findMany({
          take: 8,
          orderBy: { createdAt: 'desc' },
          select: {
            id: true,
            name: true,
            email: true,
            status: true,
            createdAt: true,
            programme: { select: { name: true } },
          },
        }),
        prisma.candidate.findMany({
          take: 5,
          orderBy: { createdAt: 'desc' },
          select: {
            id: true,
            name: true,
            email: true,
            status: true,
            validUntil: true,
            createdAt: true,
          },
        }),
        prisma.candidateApplication.groupBy({
          by: ['programmeId'],
          _count: { id: true },
        }),
        prisma.candidateApplication.count({
          where: { createdAt: { gte: thirtyDaysAgo } },
        }),
        prisma.candidateApplication.count({
          where: { createdAt: { gte: sevenDaysAgo } },
        }),
      ])
    );

    const programmeIds = applicationsByProgramme.map((g) => g.programmeId);
    const programmes =
      programmeIds.length > 0
        ? await withDbRetry(() =>
            prisma.programme.findMany({
              where: { id: { in: programmeIds } },
              select: { id: true, name: true },
            })
          )
        : [];

    const programmeMap = Object.fromEntries(programmes.map((p) => [p.id, p.name]));
    const byProgramme = applicationsByProgramme.map((g) => ({
      name: programmeMap[g.programmeId] ?? 'Unknown',
      count: g._count.id,
    }));

    return NextResponse.json({
      totalApplications: sumGroupCounts(appByStatus),
      pendingApplications: countByStatus(appByStatus, 'PENDING'),
      approvedApplications: countByStatus(appByStatus, 'APPROVED'),
      rejectedApplications: countByStatus(appByStatus, 'REJECTED'),
      activeCandidates: countByStatus(candByStatus, 'ACTIVE'),
      expiredCandidates: countByStatus(candByStatus, 'EXPIRED'),
      suspendedCandidates: countByStatus(candByStatus, 'SUSPENDED'),
      activeVacancies,
      activeCourses,
      recentApplications,
      recentCandidates,
      byProgramme,
      last30DaysApps,
      last7DaysApps,
    });
  } catch (err) {
    console.error('[admin/stats] Database error:', err);
    return NextResponse.json(
      { error: 'Database temporarily unavailable. Refresh in a few seconds.' },
      { status: 503 }
    );
  }
}
