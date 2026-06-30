/** Retry transient Neon / pooler connection failures (cold start, reset, idle timeout). */
export async function withDbRetry<T>(fn: () => Promise<T>, retries = 2): Promise<T> {
  let lastError: unknown;
  for (let attempt = 0; attempt <= retries; attempt++) {
    try {
      return await fn();
    } catch (err) {
      lastError = err;
      const code = (err as { code?: string })?.code;
      const message = String((err as Error)?.message ?? err);
      const retryable =
        code === 'P1001' ||
        code === 'P1017' ||
        message.includes('Connection reset') ||
        message.includes("Can't reach database server") ||
        message.includes('terminating connection');

      if (!retryable || attempt === retries) throw err;
      await new Promise((r) => setTimeout(r, 400 * (attempt + 1)));
    }
  }
  throw lastError;
}

function countByStatus<T extends string>(
  groups: { status: T; _count: { id: number } }[],
  status: T
): number {
  return groups.find((g) => g.status === status)?._count.id ?? 0;
}

export function sumGroupCounts(groups: { _count: { id: number } }[]): number {
  return groups.reduce((sum, g) => sum + g._count.id, 0);
}

export { countByStatus };
