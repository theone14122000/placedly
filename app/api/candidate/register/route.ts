import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { hashPassword } from '@/lib/password';
import { rateLimit, getIp } from '@/lib/rateLimit';

/**
 * Self-service candidate registration.
 * Called from /signup after a CAP application was submitted.
 * Creates an ACTIVE Candidate row linked to the applicant's PENDING
 * CandidateApplication — same shape as admin-approved accounts
 * (and the demo candidate), so login + dashboard + progress work
 * immediately. The application itself stays PENDING so the ops team
 * can still review/approve it in the mgmt portal.
 */
export async function POST(req: NextRequest) {
  const { ok } = rateLimit(`candidate-register:${getIp(req)}`, { windowMs: 60 * 60 * 1000, max: 10 });
  if (!ok) return NextResponse.json({ error: 'Too many attempts. Please wait before trying again.' }, { status: 429 });

  try {
    const body = await req.json();
    const { firstName, lastName, phone, password, confirmPassword } = body ?? {};
    const email = typeof body?.email === 'string' ? body.email.trim().toLowerCase() : '';

    if (!firstName || !email || !phone || !password) {
      return NextResponse.json({ error: 'Name, email, phone and password are required.' }, { status: 400 });
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: 'Invalid email address.' }, { status: 400 });
    }
    if (password.length < 8) {
      return NextResponse.json({ error: 'Password must be at least 8 characters.' }, { status: 400 });
    }
    if (confirmPassword !== undefined && confirmPassword !== password) {
      return NextResponse.json({ error: 'Passwords do not match.' }, { status: 400 });
    }

    // Must have submitted a CAP application with this email first
    const application = await prisma.candidateApplication.findUnique({
      where: { email },
      include: { programme: true },
    });
    if (!application) {
      return NextResponse.json({ error: 'No CAP application found for this email. Please apply first.' }, { status: 404 });
    }
    if (application.status === 'REJECTED') {
      return NextResponse.json({ error: 'Your previous application was not approved. Please contact support.' }, { status: 403 });
    }

    // Already has an account (admin-approved earlier, or registered twice)
    const existingCandidate =
      (await prisma.candidate.findUnique({ where: { email } })) ??
      (await prisma.candidate.findUnique({ where: { applicationId: application.id } }));
    if (existingCandidate) {
      return NextResponse.json({ error: 'An account already exists for this email. Please log in.' }, { status: 409 });
    }

    const name = `${String(firstName).trim()}${lastName ? ` ${String(lastName).trim()}` : ''}`.slice(0, 100);
    const passwordHash = await hashPassword(password);
    const now = new Date();
    const validUntil = new Date(now.getTime() + application.programme.cycleDays * 24 * 60 * 60 * 1000);

    const candidate = await prisma.candidate.create({
      data: {
        email,
        name,
        phone: String(phone).slice(0, 20),
        passwordHash,
        applicationId: application.id,
        status: 'ACTIVE',
        approvedAt: now,
        validUntil,
        city: application.city,
        experience: application.experience,
        currentRole: application.currentRole,
        targetRole: application.targetRole,
      },
    });

    return NextResponse.json({ success: true, email: candidate.email }, { status: 201 });
  } catch (err) {
    console.error('[candidate/register]', err);
    return NextResponse.json({ error: 'Something went wrong. Please try again.' }, { status: 500 });
  }
}
