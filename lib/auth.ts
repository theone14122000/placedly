import { type NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { prisma } from '@/lib/prisma';
import { verifyPassword } from '@/lib/password';
import { rateLimit } from '@/lib/rateLimit';

/** Resolve auth URL at runtime on Vercel (never bake localhost into production builds). */
if (!process.env.NEXTAUTH_URL) {
  if (process.env.VERCEL_URL) {
    process.env.NEXTAUTH_URL = `https://${process.env.VERCEL_URL}`;
  } else if (process.env.NODE_ENV === 'development') {
    process.env.NEXTAUTH_URL = 'http://localhost:3000';
  }
}

/** Vercel proxy: allow host header when NEXTAUTH_URL is inferred at runtime */
if (process.env.VERCEL && !process.env.AUTH_TRUST_HOST) {
  process.env.AUTH_TRUST_HOST = 'true';
}

export const authOptions: NextAuthOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        email:    { label: 'Email',    type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials, req) {
        if (!credentials?.email || !credentials?.password) return null;
        const { email, password } = credentials;

        // ── Rate limit by IP ──────────────────────────────────────────────────
        try {
          const ip = (req as any)?.headers?.['x-forwarded-for'] ?? 'unknown';
          const { ok } = rateLimit(`auth:${ip}`, { windowMs: 15 * 60 * 1000, max: 10 });
          if (!ok) return null;
        } catch {}

        // ── 1. Master Admin (env-based) — no DB required ─────────────────────
        const envEmail = process.env.ADMIN_EMAIL ?? '';
        const envPass  = process.env.ADMIN_PASSWORD ?? '';
        if (envEmail && envPass && email === envEmail && password === envPass) {
          return { id: 'master_admin', email, name: 'Master Admin', role: 'master_admin' };
        }

        // ── 2–5. Database-backed roles ────────────────────────────────────────
        try {
          const admin = await prisma.admin.findUnique({ where: { email } });
          if (admin && admin.isActive) {
            const valid = await verifyPassword(password, admin.passwordHash);
            if (valid) return { id: admin.id, email: admin.email, name: admin.name, role: 'admin' };
          }

          const recruiter = await prisma.recruiter.findUnique({ where: { email } });
          if (recruiter && recruiter.isActive) {
            const valid = await verifyPassword(password, recruiter.passwordHash);
            if (valid) return { id: recruiter.id, email: recruiter.email, name: recruiter.name, role: 'recruiter' };
          }

          const freelancer = await prisma.freelancer.findUnique({ where: { email } });
          if (freelancer && freelancer.isActive) {
            const valid = await verifyPassword(password, freelancer.passwordHash);
            if (valid) return {
              id: freelancer.id, email: freelancer.email, name: freelancer.name,
              role: 'freelancer', referralCode: freelancer.referralCode,
            };
          }

          const candidate = await prisma.candidate.findUnique({ where: { email } });
          if (!candidate) return null;

          const valid = await verifyPassword(password, candidate.passwordHash);
          if (!valid) return null;

          if (candidate.validUntil < new Date() && candidate.status === 'ACTIVE') {
            await prisma.candidate.update({ where: { id: candidate.id }, data: { status: 'EXPIRED' } });
            return { id: candidate.id, email: candidate.email, name: candidate.name, role: 'candidate', status: 'EXPIRED', validUntil: candidate.validUntil.toISOString() };
          }

          if (candidate.status !== 'ACTIVE') {
            return { id: candidate.id, email: candidate.email, name: candidate.name, role: 'candidate', status: candidate.status, validUntil: candidate.validUntil.toISOString() };
          }

          await prisma.candidate.update({ where: { id: candidate.id }, data: { lastLoginAt: new Date() } });
          return { id: candidate.id, email: candidate.email, name: candidate.name, role: 'candidate', status: 'ACTIVE', validUntil: candidate.validUntil.toISOString() };
        } catch (err) {
          console.error('[auth] Database error during login:', err);
          return null;
        }
      },
    }),
  ],
  pages: { signIn: '/login', error: '/login' },
  session: { strategy: 'jwt', maxAge: 30 * 24 * 60 * 60 },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role        = (user as any).role;
        token.status      = (user as any).status;
        token.validUntil  = (user as any).validUntil;
        token.candidateId = user.id;
        token.referralCode = (user as any).referralCode;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        (session.user as any).role         = token.role;
        (session.user as any).status       = token.status;
        (session.user as any).validUntil   = token.validUntil;
        (session.user as any).candidateId  = token.candidateId;
        (session.user as any).referralCode = token.referralCode;
      }
      return session;
    },
    async redirect({ url, baseUrl }) {
      if (url.startsWith(baseUrl)) return url;
      return `${baseUrl}/auth/redirect`;
    },
  },
};
