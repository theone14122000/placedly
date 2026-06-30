import { prisma } from './prisma';

export async function getCmsMap(prefix?: string): Promise<Record<string, string>> {
  try {
    const rows = await prisma.siteContent.findMany({
      where: prefix ? { key: { startsWith: prefix } } : undefined,
    });
    return Object.fromEntries(rows.map(r => [r.key, r.value]));
  } catch {
    return {};
  }
}

export function parseCmsJson<T>(map: Record<string, string>, key: string, fallback: T): T {
  try {
    const raw = map[key];
    if (!raw) return fallback;
    return { ...fallback, ...(JSON.parse(raw) as Partial<T>) } as T;
  } catch {
    return fallback;
  }
}
