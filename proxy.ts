import { withAuth } from 'next-auth/middleware';
import { NextResponse } from 'next/server';

export default withAuth(
  function middleware(req) {
    const { pathname } = req.nextUrl;
    const token = req.nextauth.token as any;
    const role: string = token?.role ?? '';

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
      if (!token) return NextResponse.redirect(new URL('/login', req.url));
      if (role !== 'candidate' && role !== 'master_admin')
        return NextResponse.redirect(new URL('/login', req.url));
      if (role === 'candidate') {
        if (token.status === 'EXPIRED')   return NextResponse.redirect(new URL('/access-expired', req.url));
        if (token.status === 'SUSPENDED') return NextResponse.redirect(new URL('/login', req.url));
      }
    }

    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token, req }) => {
        const { pathname } = req.nextUrl;
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
        ) return true;
        return !!token;
      },
    },
  }
);

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
