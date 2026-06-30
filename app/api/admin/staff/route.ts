import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { generatePassword, hashPassword } from '@/lib/password';

async function masterOnly() {
  const session = await getServerSession(authOptions);
  return session && (session.user as any)?.role === 'master_admin' ? session : null;
}

export async function GET() {
  if (!await masterOnly()) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const [admins, recruiters, freelancers] = await Promise.all([
    prisma.admin.findMany({ orderBy: { createdAt: 'desc' } }),
    prisma.recruiter.findMany({ orderBy: { createdAt: 'desc' } }),
    prisma.freelancer.findMany({ orderBy: { createdAt: 'desc' } }),
  ]);

  return NextResponse.json({ admins, recruiters, freelancers });
}

export async function POST(req: NextRequest) {
  if (!await masterOnly()) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const body = await req.json();
  const { type, name, email, phone, city } = body;

  if (!type || !name || !email) {
    return NextResponse.json({ error: 'type, name, and email are required' }, { status: 400 });
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) return NextResponse.json({ error: 'Invalid email' }, { status: 400 });

  const plainPassword = generatePassword();
  const passwordHash = await hashPassword(plainPassword);

  try {
    if (type === 'admin') {
      const existing = await prisma.admin.findUnique({ where: { email } });
      if (existing) return NextResponse.json({ error: 'Email already exists' }, { status: 409 });
      await prisma.admin.create({ data: { name, email, passwordHash } });
    } else if (type === 'recruiter') {
      const existing = await prisma.recruiter.findUnique({ where: { email } });
      if (existing) return NextResponse.json({ error: 'Email already exists' }, { status: 409 });
      await prisma.recruiter.create({ data: { name, email, phone: phone ?? '', passwordHash } });
    } else if (type === 'freelancer') {
      const existing = await prisma.freelancer.findUnique({ where: { email } });
      if (existing) return NextResponse.json({ error: 'Email already exists' }, { status: 409 });
      // generate unique referral code
      const slug = name.trim().replace(/\s+/g, '').slice(0, 6).toUpperCase();
      let referralCode = '';
      for (let attempt = 0; attempt < 10; attempt++) {
        const code = slug + Math.floor(1000 + Math.random() * 9000);
        const conflict = await prisma.freelancer.findUnique({ where: { referralCode: code } });
        if (!conflict) { referralCode = code; break; }
      }
      if (!referralCode) return NextResponse.json({ error: 'Could not generate referral code' }, { status: 500 });
      await prisma.freelancer.create({ data: { name, email, phone: phone ?? '', city, passwordHash, referralCode } });
    } else {
      return NextResponse.json({ error: 'Invalid type' }, { status: 400 });
    }

    return NextResponse.json({ success: true, password: plainPassword, email });
  } catch {
    return NextResponse.json({ error: 'Could not create account' }, { status: 500 });
  }
}

export async function PATCH(req: NextRequest) {
  if (!await masterOnly()) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const { type, id, isActive } = await req.json();
  if (!type || !id || typeof isActive !== 'boolean') {
    return NextResponse.json({ error: 'type, id, and isActive required' }, { status: 400 });
  }

  try {
    if (type === 'admin') {
      await prisma.admin.update({ where: { id }, data: { isActive } });
    } else if (type === 'recruiter') {
      await prisma.recruiter.update({ where: { id }, data: { isActive } });
    } else if (type === 'freelancer') {
      await prisma.freelancer.update({ where: { id }, data: { isActive } });
    } else {
      return NextResponse.json({ error: 'Invalid type' }, { status: 400 });
    }
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: 'Update failed' }, { status: 500 });
  }
}
