import { prisma } from '@/lib/prisma';

/**
 * Candidate write-access requires an admin-APPROVED CAP application.
 * Read endpoints (profile GET for the gate check, progress GET) stay open;
 * all mutations must call this first.
 */
export async function isCandidateApproved(candidateId: string): Promise<boolean> {
  if (!candidateId) return false;
  const c = await prisma.candidate.findUnique({
    where: { id: candidateId },
    select: { application: { select: { status: true } } },
  });
  return c?.application?.status === 'APPROVED';
}

export const NOT_APPROVED_ERROR = 'Your application is still under review. Full access unlocks after admin approval.';
