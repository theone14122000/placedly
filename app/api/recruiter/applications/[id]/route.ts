import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

async function check() {
  const s = await getServerSession(authOptions);
  const role = (s?.user as any)?.role;
  if (!s || (role !== 'recruiter' && role !== 'master_admin')) return null;
  return s;
}

const STAGE_STATUSES: Record<string, string[]> = {
  SCREENING:  ['PENDING', 'SELECTED', 'REJECTED'],
  TECHNICAL:  ['PENDING', 'SELECTED', 'HOLD', 'REJECTED'],
  MANAGER:    ['PENDING', 'SELECTED', 'HOLD', 'REJECTED'],
  OFFER:      ['OFFER_DISCUSSED', 'OFFER_ACCEPTED', 'DECLINED', 'DROPPED', 'JOINED'],
};

export async function GET(_: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const s = await check();
  if (!s) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const { id } = await params;
  const app = await prisma.jobApplication.findUnique({
    where: { id },
    include: {
      notes:        { orderBy: { createdAt: 'desc' } },
      stageHistory: { orderBy: { createdAt: 'desc' } },
      recruiter:    { select: { name: true, email: true } },
    },
  });
  if (!app) return NextResponse.json({ error: 'Not found' }, { status: 404 });
  return NextResponse.json(app);
}

export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const s = await check();
  if (!s) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const { id } = await params;
  const body = await req.json();
  const { stage, status, recruiterId, resumeUrl } = body;
  const authorName = (s.user as any)?.name ?? 'Recruiter';

  const updateData: any = {};
  if (resumeUrl !== undefined) updateData.resumeUrl = resumeUrl;
  if (recruiterId !== undefined) updateData.recruiterId = recruiterId;

  if (stage || status) {
    const app = await prisma.jobApplication.findUnique({ where: { id } });
    if (!app) return NextResponse.json({ error: 'Not found' }, { status: 404 });

    const newStage  = stage  ?? app.currentStage;
    const newStatus = status ?? app.currentStatus;
    const allowed   = STAGE_STATUSES[newStage];
    if (!allowed || !allowed.includes(newStatus)) {
      return NextResponse.json({ error: `Invalid status '${newStatus}' for stage '${newStage}'` }, { status: 400 });
    }
    updateData.currentStage  = newStage;
    updateData.currentStatus = newStatus;

    await prisma.stageHistory.create({
      data: { applicationId: id, stage: newStage, status: newStatus, changedBy: authorName },
    });
  }

  const updated = await prisma.jobApplication.update({ where: { id }, data: updateData });
  return NextResponse.json(updated);
}
