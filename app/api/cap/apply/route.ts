import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { rateLimit, getIp } from '@/lib/rateLimit';

export async function POST(req: NextRequest) {
  const { ok } = rateLimit(`apply:${getIp(req)}`, { windowMs: 60 * 60 * 1000, max: 3 });
  if (!ok) return NextResponse.json({ error: 'Too many applications. Please wait before trying again.' }, { status: 429 });

  try {
    const body = await req.json();
    const { name, email, phone, city, experience, currentRole, targetRole, message } = body;

    if (!name || !email || !phone || !city || !experience || !targetRole) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // Basic input validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) return NextResponse.json({ error: 'Invalid email address' }, { status: 400 });
    if (name.length > 100 || phone.length > 20 || city.length > 100) {
      return NextResponse.json({ error: 'Input too long' }, { status: 400 });
    }

    // Auto-assign the first active CAP programme (not Study Visa)
    const programme = await prisma.programme.findFirst({
      where: { isActive: true, NOT: { name: { contains: 'Study Visa' } } },
      orderBy: { createdAt: 'asc' },
    });
    if (!programme) {
      return NextResponse.json({ error: 'No active programme available' }, { status: 500 });
    }
    const programmeId = programme.id;

    // Check if already applied
    const existing = await prisma.candidateApplication.findUnique({ where: { email } });
    if (existing) {
      const msg =
        existing.status === 'PENDING'
          ? 'Your application is under review. We will notify you by email.'
          : existing.status === 'APPROVED'
          ? 'You already have an approved account. Please log in.'
          : 'Your previous application was not approved. Please contact support.';
      return NextResponse.json({ error: msg }, { status: 409 });
    }

    const referralCode = body.referralCode?.trim() || null;

    // Validate referral code if provided
    let freelancerId: string | null = null;
    if (referralCode) {
      const fl = await prisma.freelancer.findUnique({ where: { referralCode }, select: { id: true, isActive: true } });
      if (fl?.isActive) freelancerId = fl.id;
    }

    const application = await prisma.candidateApplication.create({
      data: { name, email, phone, city, experience, currentRole, targetRole, message, programmeId, referralCode },
    });

    // Create referral record if sourced via freelancer
    if (freelancerId) {
      await prisma.referral.create({ data: { freelancerId, applicationId: application.id } });
    }

    return NextResponse.json({ success: true, id: application.id }, { status: 201 });
  } catch (err) {
    console.error('[CAP apply]', err);
    return NextResponse.json({ error: 'Something went wrong. Please try again.' }, { status: 500 });
  }
}
