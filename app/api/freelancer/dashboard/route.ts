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
            select: { name: true, email: true, status: true, createdAt: true, programme: { select: { name: true } } },
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

  return NextResponse.json({
    referralCode: freelancer.referralCode,
    referralLink: `${process.env.NEXTAUTH_URL}/cap/apply?ref=${freelancer.referralCode}`,
    stats: { totalReferrals, approved, pendingCommission, paidCommission },
    referrals: freelancer.referrals,
    commissions: freelancer.commissions,
  });
}
