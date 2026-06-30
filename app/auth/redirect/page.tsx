'use client';

import { useSession, signOut } from 'next-auth/react';
import { useEffect, useRef } from 'react';

const ADMIN_ROLES = ['admin', 'master_admin'];

const PORTAL_ROLES: Record<string, string[]> = {
  candidate: ['candidate'],
  partner: ['freelancer'],
  recruiter: ['recruiter'],
};

const ROLE_HOME: Record<string, string> = {
  master_admin: '/admin',
  admin: '/mgmt',
  recruiter: '/recruiter',
  freelancer: '/freelancer/dashboard',
  candidate: '/dashboard',
};

export default function AuthRedirectPage() {
  const { data: session, status } = useSession();
  const handled = useRef(false);

  useEffect(() => {
    if (status === 'loading' || handled.current) return;

    if (status === 'unauthenticated') {
      handled.current = true;
      window.location.replace('/login');
      return;
    }

    const role = (session?.user as { role?: string } | undefined)?.role;
    if (!role) return;

    const portal = sessionStorage.getItem('placedly_login_portal');
    if (portal && !ADMIN_ROLES.includes(role)) {
      const allowed = PORTAL_ROLES[portal] ?? [];
      if (!allowed.includes(role)) {
        handled.current = true;
        sessionStorage.removeItem('placedly_login_portal');
        void signOut({ callbackUrl: '/login' });
        return;
      }
    }

    sessionStorage.removeItem('placedly_login_portal');
    const dest = ROLE_HOME[role] ?? '/login';
    handled.current = true;
    window.location.replace(dest);
  }, [session, status]);

  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: '#f8faff',
        fontFamily: "'Poppins', sans-serif",
      }}
    >
      <img src="/logo.png" alt="Placedly" style={{ height: 48, width: 'auto' }} />
    </div>
  );
}
