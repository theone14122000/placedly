import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// Public endpoint — validates a referral code when candidate applies
export async function GET(req: NextRequest) {
  const code = new URL(req.url).searchParams.get('code');
  if (!code) return NextResponse.json({ error: 'code required' }, { status: 400 });

  const freelancer = await prisma.freelancer.findUnique({
    where: { referralCode: code },
    select: { id: true, name: true, isActive: true },
  });

  if (!freelancer || !freelancer.isActive) {
    return NextResponse.json({ valid: false });
  }

  return NextResponse.json({ valid: true, name: freelancer.name });
}
