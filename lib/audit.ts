import { prisma } from './prisma';

export async function auditLog(actor: string, action: string, target?: string, detail?: string) {
  try {
    await prisma.auditLog.create({ data: { actor, action, target, detail } });
  } catch {
    // audit failures should never break business logic
  }
}
