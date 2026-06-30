import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { hashPassword } from '@/lib/password';

function generateReferralCode(name: string): string {
  const base = name.replace(/\s+/g, '').toUpperCase().slice(0, 4);
  const num  = Math.floor(1000 + Math.random() * 9000);
  return `${base}${num}`;
}

export async function POST(req: NextRequest) {
  try {
    const { name, email, phone, password, city } = await req.json();
    if (!name || !email || !phone || !password) {
      return NextResponse.json({ error: 'name, email, phone, password required' }, { status: 400 });
    }
    if (password.length < 8) {
      return NextResponse.json({ error: 'Password must be at least 8 characters' }, { status: 400 });
    }

    const existing = await prisma.freelancer.findUnique({ where: { email } });
    if (existing) return NextResponse.json({ error: 'Email already registered' }, { status: 409 });

    // Generate unique referral code
    let referralCode = generateReferralCode(name);
    let attempts = 0;
    while (await prisma.freelancer.findUnique({ where: { referralCode } }) && attempts < 10) {
      referralCode = generateReferralCode(name);
      attempts++;
    }

    const passwordHash = await hashPassword(password);
    const freelancer = await prisma.freelancer.create({
      data: { name, email, phone, city: city ?? null, passwordHash, referralCode },
    });

    return NextResponse.json({
      success: true,
      referralCode: freelancer.referralCode,
      message: 'Registration successful. Your account is pending activation.',
    }, { status: 201 });
  } catch (err) {
    console.error('[freelancer/register]', err);
    return NextResponse.json({ error: 'Something went wrong' }, { status: 500 });
  }
}
