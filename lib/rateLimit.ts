// Simple in-memory rate limiter — resets on server restart
// For production with multiple instances, replace with Redis

const store = new Map<string, { count: number; resetAt: number }>();

type RateLimitOptions = { windowMs: number; max: number };

export function rateLimit(key: string, opts: RateLimitOptions): { ok: boolean; remaining: number } {
  const now = Date.now();
  const entry = store.get(key);

  if (!entry || entry.resetAt < now) {
    store.set(key, { count: 1, resetAt: now + opts.windowMs });
    return { ok: true, remaining: opts.max - 1 };
  }

  if (entry.count >= opts.max) return { ok: false, remaining: 0 };

  entry.count++;
  return { ok: true, remaining: opts.max - entry.count };
}

export function getIp(req: Request): string {
  return req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ?? 'unknown';
}
