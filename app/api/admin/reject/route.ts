import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { sendRejectionEmail } from '@/lib/email';

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  const role = (session?.user as any)?.role;
  if (!session || (role !== 'admin' && role !== 'master_admin')) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { applicationId } = await req.json();
  if (!applicationId) return NextResponse.json({ error: 'applicationId required' }, { status: 400 });

  const application = await prisma.candidateApplication.findUnique({ where: { id: applicationId } });
  if (!application) return NextResponse.json({ error: 'Not found' }, { status: 404 });
  if (application.status !== 'PENDING') return NextResponse.json({ error: 'Can only reject pending applications' }, { status: 409 });

  await prisma.candidateApplication.update({
    where: { id: applicationId },
    data: { status: 'REJECTED' },
  });

  await sendRejectionEmail({ to: application.email, name: application.name });

  return NextResponse.json({ success: true });
}
