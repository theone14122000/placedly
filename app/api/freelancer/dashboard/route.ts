import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

export async function GET() {
  const s = await getServerSession(authOptions);
  const role = (s?.user as any)?.role;
  if (!s || (role !== 'freelancer' && role !== 'master_admin')) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const freelancerId = (s.user as any)?.candidateId;
  const freelancer = await prisma.freelancer.findUnique({
    where: { id: freelancerId },
    include: {
      referrals: {
        include: {
          application: {
            select: { name: true, email: true, status: true, createdAt: true, programme: { select: { name: true } }, candidate: { select: { capStep: true, status: true } } },
          },
        },
        orderBy: { createdAt: 'desc' },
      },
      commissions: { orderBy: { createdAt: 'desc' } },
    },
  });

  if (!freelancer) return NextResponse.json({ error: 'Not found' }, { status: 404 });

  const totalReferrals   = freelancer.referrals.length;
  const approved         = freelancer.referrals.filter(r => r.application.status === 'APPROVED').length;
  const pendingCommission = freelancer.commissions.filter(c => c.status === 'PENDING').reduce((s, c) => s + c.amount, 0);
  const paidCommission   = freelancer.commissions.filter(c => c.status === 'PAID').reduce((s, c) => s + c.amount, 0);

  const referrals = freelancer.referrals.map(r => {
    const app = r.application;
    let placementStatus: string;
    if (app.status === 'REJECTED') {
      placementStatus = 'Not Selected';
    } else if (app.status === 'APPROVED' && (app.candidate?.capStep ?? 1) >= 7) {
      placementStatus = 'Placed';
    } else if (app.status === 'APPROVED') {
      placementStatus = 'In Progress';
    } else {
      placementStatus = 'Applied';
    }
    return { ...r, placementStatus };
  });

  return NextResponse.json({
    referralCode: freelancer.referralCode,
    referralLink: `${process.env.NEXTAUTH_URL}/cap/apply?ref=${freelancer.referralCode}`,
    stats: { totalReferrals, approved, pendingCommission, paidCommission },
    referrals,
    commissions: freelancer.commissions,
  });
}
