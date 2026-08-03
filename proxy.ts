import { NextRequest, NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';

export default async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  const secureCookie =
    process.env.NEXTAUTH_URL?.startsWith('https://') ?? (process.env.VERCEL_URL ? true : false);

  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET, secureCookie });

  if (
    pathname === '/login' ||
    pathname === '/auth/redirect' ||
    pathname === '/access-expired' ||
    pathname.startsWith('/cap') ||
    pathname.startsWith('/freelancer/register') ||
    pathname.startsWith('/api/cap') ||
    pathname.startsWith('/api/auth') ||
    pathname.startsWith('/api/admin/programmes') ||
    pathname.startsWith('/api/freelancer/register') ||
    pathname.startsWith('/api/freelancer/referral')
  ) {
    return NextResponse.next();
  }

  if (!token) return NextResponse.redirect(new URL('/login', req.url));

  const role: string = (token as any).role ?? '';

  // ── Master Admin: /admin ─────────────────────────────────────────────────
  if (pathname.startsWith('/admin')) {
    if (role !== 'master_admin') return NextResponse.redirect(new URL('/login', req.url));
  }

  // ── Limited Admin: /mgmt ─────────────────────────────────────────────────
  if (pathname.startsWith('/mgmt')) {
    if (role !== 'admin' && role !== 'master_admin')
      return NextResponse.redirect(new URL('/login', req.url));
  }

  // ── Recruiter: /recruiter ────────────────────────────────────────────────
  if (pathname.startsWith('/recruiter')) {
    if (role !== 'recruiter' && role !== 'master_admin')
      return NextResponse.redirect(new URL('/login', req.url));
  }

  // ── Freelancer: /freelancer/dashboard ────────────────────────────────────
  if (pathname.startsWith('/freelancer/dashboard') || pathname.startsWith('/freelancer/referrals') || pathname.startsWith('/freelancer/sop') || pathname.startsWith('/freelancer/commissions')) {
    if (role !== 'freelancer' && role !== 'master_admin')
      return NextResponse.redirect(new URL('/login', req.url));
  }

  // ── Candidate: /dashboard ────────────────────────────────────────────────
  if (pathname.startsWith('/dashboard')) {
    if (role !== 'candidate' && role !== 'master_admin')
      return NextResponse.redirect(new URL('/login', req.url));
    if (role === 'candidate') {
      if ((token as any).status === 'EXPIRED')   return NextResponse.redirect(new URL('/access-expired', req.url));
      if ((token as any).status === 'SUSPENDED') return NextResponse.redirect(new URL('/login', req.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/admin/:path*',
    '/mgmt/:path*',
    '/recruiter/:path*',
    '/freelancer/dashboard/:path*',
    '/freelancer/referrals/:path*',
    '/freelancer/sop/:path*',
    '/freelancer/commissions/:path*',
    '/dashboard/:path*',
    '/auth/redirect',
  ],
};
