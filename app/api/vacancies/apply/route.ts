import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { rateLimit, getIp } from '@/lib/rateLimit';
import { put } from '@vercel/blob';

const ALLOWED_RESUME_TYPES = [
  'application/pdf',
  'application/msword',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
];

const MAX_RESUME_MB = 5;

export async function POST(req: NextRequest) {
  const { ok } = rateLimit(`vacancy-apply:${getIp(req)}`, { windowMs: 60 * 60 * 1000, max: 5 });
  if (!ok) return NextResponse.json({ error: 'Too many applications. Please wait before trying again.' }, { status: 429 });

  try {
    const form = await req.formData();
    const vacancyId = String(form.get('vacancyId') || '');
    const name = String(form.get('name') || '').trim();
    const email = String(form.get('email') || '').trim();
    const resume = form.get('resume') as File | null;

    if (!vacancyId) return NextResponse.json({ error: 'Missing vacancyId' }, { status: 400 });
    if (!name || !email) return NextResponse.json({ error: 'Name and email are required' }, { status: 400 });

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) return NextResponse.json({ error: 'Invalid email address' }, { status: 400 });
    if (name.length > 120) return NextResponse.json({ error: 'Input too long' }, { status: 400 });

    const vacancy = await prisma.vacancy.findUnique({ where: { id: vacancyId }, select: { id: true, isActive: true } });
    if (!vacancy) return NextResponse.json({ error: 'Vacancy not found' }, { status: 404 });
    if (!vacancy.isActive) return NextResponse.json({ error: 'This vacancy is no longer accepting applications' }, { status: 400 });

    // Attach candidateId if the applicant is a logged-in candidate
    const session = await getServerSession(authOptions);
    const candidateId = session && (session.user as any)?.role === 'candidate' ? (session.user as any)?.candidateId : null;

    // Upload resume if provided
    let resumeUrl: string | null = null;
    if (resume && resume.size > 0) {
      if (!ALLOWED_RESUME_TYPES.includes(resume.type)) {
        return NextResponse.json({ error: 'Resume must be a PDF or Word document' }, { status: 400 });
      }
      if (resume.size > MAX_RESUME_MB * 1024 * 1024) {
        return NextResponse.json({ error: `Resume too large (max ${MAX_RESUME_MB} MB)` }, { status: 400 });
      }
      const ext = resume.name.split('.').pop()?.toLowerCase() ?? 'bin';
      const slug = name.toLowerCase().replace(/[^a-z0-9]/g, '-').replace(/-+/g, '-').slice(0, 50);
      const filename = `resumes/${slug}-${Date.now()}.${ext}`;
      const blob = await put(filename, resume, { access: 'public' });
      resumeUrl = blob.url;
    }

    const text = (key: string): string | null => {
      const v = String(form.get(key) || '').trim();
      return v ? v.slice(0, 2000) : null;
    };

    const application = await prisma.vacancyApplication.create({
      data: {
        vacancyId,
        candidateId,
        name,
        email,
        phone: text('phone'),
        experience: text('experience'),
        noticePeriod: text('noticePeriod'),
        education: text('education'),
        currentCtc: text('currentCtc'),
        expectedCtc: text('expectedCtc'),
        skills: text('skills'),
        usShift: text('usShift'),
        resumeUrl,
      },
    });

    return NextResponse.json({ success: true, id: application.id }, { status: 201 });
  } catch (err) {
    console.error('[Vacancy apply]', err);
    return NextResponse.json({ error: 'Something went wrong. Please try again.' }, { status: 500 });
  }
}
