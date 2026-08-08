'use client';
import { useSession, signOut } from 'next-auth/react';
import { useRouter, usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { LayoutDashboard, BookOpen, Briefcase, TrendingUp, LogOut, MessageCircle, User } from 'lucide-react';
import Link from 'next/link';

const NAV = [
  { href: '/dashboard',           label: 'Dashboard',   Icon: LayoutDashboard },
  { href: '/dashboard/courses',   label: 'My Courses',  Icon: BookOpen },
  { href: '/dashboard/vacancies', label: 'Vacancies',   Icon: Briefcase },
  { href: '/dashboard/progress',  label: 'My Progress', Icon: TrendingUp },
  { href: '/dashboard/profile',   label: 'My Profile',  Icon: User },
];

function ExpiryBanner({ session }: { session: any }) {
  if (!session) return null;
  const validUntil = session?.user?.validUntil;
  if (!validUntil) return null;
  const daysLeft = Math.ceil((new Date(validUntil).getTime() - Date.now()) / 86400000);
  if (daysLeft > 14) return null;
  return (
    <div style={{
      background: daysLeft <= 3 ? '#fef2f2' : '#fff7ed',
      border: `1.5px solid ${daysLeft <= 3 ? '#fecaca' : '#fed7aa'}`,
      borderRadius: '12px', padding: '12px 18px', marginBottom: '20px',
      display: 'flex', alignItems: 'center', gap: '10px',
      fontSize: '13px', fontWeight: 600,
      color: daysLeft <= 3 ? '#dc2626' : '#c2410c',
    }}>
      ⚠️ Your portal access expires in {daysLeft} day{daysLeft !== 1 ? 's' : ''}.
      <a href="/contact" style={{ marginLeft: 'auto', fontSize: '12px', color: 'inherit', fontWeight: 700 }}>Contact advisor →</a>
    </div>
  );
}

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const { data: session, status } = useSession();
  const router = useRouter();
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    if (status === 'unauthenticated') router.replace('/login');
  }, [status, router]);

  // Auto-logout when JWT validUntil is past
  useEffect(() => {
    if (status !== 'authenticated') return;
    const validUntil = (session?.user as any)?.validUntil;
    if (!validUntil) return;
    const msLeft = new Date(validUntil).getTime() - Date.now();
    if (msLeft <= 0) { signOut({ callbackUrl: '/login' }); return; }
    const t = setTimeout(() => signOut({ callbackUrl: '/login' }), Math.min(msLeft, 2147483647));
    return () => clearTimeout(t);
  }, [status, session]);

  // Close sidebar on route change
  useEffect(() => { setSidebarOpen(false); }, [pathname]);

  if (status === 'loading') {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#fff7ed', fontFamily: "'Poppins',sans-serif" }}>
        <div style={{ textAlign: 'center' }}>
          <img src="/logo-dark.png" alt="Placedly" style={{ height: '48px', marginBottom: '12px' }} />
          <p style={{ fontSize: '13px', color: '#94a3b8' }}>Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  const user = session?.user;
  const firstName = user?.name?.split(' ')[0] ?? 'there';

  return (
    <div className="portal-layout" style={{ background: '#f1f5f9' }}>

      {/* Mobile overlay */}
      <div
        className={`portal-overlay${sidebarOpen ? ' open' : ''}`}
        onClick={() => setSidebarOpen(false)}
      />

      {/* ── Sidebar ── */}
      <aside className={`portal-sidebar${sidebarOpen ? ' open' : ''}`}>

        {/* Logo */}
        <div style={{ padding: '20px 20px 16px', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
          <Link href="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center' }}>
            <img src="/logo.png" alt="Placedly" style={{ height: '48px', width: 'auto' }} />
          </Link>
          <div style={{ fontSize: '10px', fontWeight: 600, color: 'rgba(255,255,255,0.3)', marginTop: '6px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Candidate Portal</div>
        </div>

        {/* Nav */}
        <nav style={{ flex: 1, padding: '16px 12px', display: 'flex', flexDirection: 'column', gap: '2px', overflowY: 'auto' }}>
          {NAV.map(item => {
            const active = pathname === item.href;
            return (
              <Link key={item.href} href={item.href} style={{
                display: 'flex', alignItems: 'center', gap: '10px',
                padding: '10px 14px', borderRadius: '999px', textDecoration: 'none',
                background: active ? '#f97316' : 'transparent',
                borderLeft: `3px solid transparent`,
                color: active ? '#fff' : 'rgba(255,255,255,0.55)',
                fontSize: '13px', fontWeight: active ? 600 : 400,
                boxShadow: active ? '0 4px 14px rgba(249,115,22,0.35)' : 'none',
                transition: 'all 0.15s',
              }}>
                <item.Icon size={15} />
                {item.label}
              </Link>
            );
          })}

          <div style={{ marginTop: 'auto', paddingTop: '16px', borderTop: '1px solid rgba(255,255,255,0.06)', marginLeft: '-12px', marginRight: '-12px', paddingLeft: '12px', paddingRight: '12px' }}>
            <a href="https://wa.me/919876543210" target="_blank" rel="noopener noreferrer" style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '10px 14px', borderRadius: '999px', textDecoration: 'none', background: 'rgba(249,115,22,0.14)', color: '#f97316', fontSize: '13px', fontWeight: 600 }}>
              <MessageCircle size={15} />
              Talk to Advisor
            </a>
          </div>
        </nav>

        {/* User footer */}
        <div style={{ padding: '16px', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
            {user?.image
              ? <img src={user.image} alt="" style={{ width: '34px', height: '34px', borderRadius: '50%', objectFit: 'cover', flexShrink: 0 }} />
              : <div style={{ width: '34px', height: '34px', borderRadius: '50%', background: '#f97316', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '13px', fontWeight: 700, color: '#fff', flexShrink: 0 }}>{firstName[0]}</div>
            }
            <div style={{ overflow: 'hidden', flex: 1 }}>
              <div style={{ fontSize: '13px', fontWeight: 600, color: '#fff', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{user?.name}</div>
              <div style={{ fontSize: '10px', color: 'rgba(255,255,255,0.35)' }}>Candidate</div>
            </div>
          </div>
          <button onClick={() => signOut({ callbackUrl: '/login' })} style={{ display: 'flex', alignItems: 'center', gap: '8px', background: 'none', border: 'none', color: 'rgba(255,255,255,0.3)', fontSize: '12px', cursor: 'pointer', padding: '6px 8px', borderRadius: '999px', width: '100%', fontFamily: "'Poppins',sans-serif" }}>
            <LogOut size={12} /> Sign Out
          </button>
        </div>
      </aside>

      {/* ── Main ── */}
      <div className="portal-main">
        {/* Top bar */}
        <header style={{ background: '#fff', borderBottom: '1px solid #e2e8f0', padding: '0 24px', height: '56px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', position: 'sticky', top: 0, zIndex: 20, gap: '12px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <button
              className={`portal-hamburger${sidebarOpen ? ' open' : ''}`}
              onClick={() => setSidebarOpen(v => !v)}
              aria-label="Toggle menu"
            >
              <span />
            </button>
            <img src="/logo.png" alt="Placedly" style={{ height: '24px', width: 'auto', display: 'block' }} />
            <span className="portal-header-greeting" style={{ fontSize: '14px', color: '#64748b' }}>
              Hey, <strong style={{ color: '#0b0d20' }}>{firstName}</strong> — welcome back!
            </span>
          </div>
          <Link href="/contact" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', padding: '8px 18px', background: '#f97316', color: '#fff', borderRadius: '999px', textDecoration: 'none', fontSize: '13px', fontWeight: 600, fontFamily: "'Poppins',sans-serif", whiteSpace: 'nowrap', boxShadow: '0 4px 14px rgba(249,115,22,0.30)' }}>
            Free Consultation
          </Link>
        </header>

        <main style={{ flex: 1, padding: 'clamp(16px,3vw,28px) clamp(16px,4vw,32px)', overflowY: 'auto' }}>
          <ExpiryBanner session={session} />
          {children}
        </main>

        {/* Branding footer */}
        <footer style={{ borderTop: '1px solid #e2e8f0', background: '#fff', padding: '14px 24px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', flexWrap: 'wrap' }}>
          <a href="/" target="_blank" rel="noopener noreferrer" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', textDecoration: 'none' }}>
            <img src="/logo.png" alt="Placedly" style={{ height: '22px', width: 'auto' }} />
            <span style={{ fontSize: '12px', fontWeight: 700, color: '#0b0d20' }}>Placedly</span>
          </a>
          <span style={{ fontSize: '11px', color: '#94a3b8' }}>· © 2026 Placedly · Candidate Portal</span>
          <a href="/" target="_blank" rel="noopener noreferrer" style={{ fontSize: '11px', fontWeight: 600, color: '#f97316', textDecoration: 'none' }}>View Website →</a>
        </footer>
      </div>
    </div>
  );
}
