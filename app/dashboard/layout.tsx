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
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#f8faff', fontFamily: "'Poppins',sans-serif" }}>
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
                padding: '10px 14px', borderRadius: '10px', textDecoration: 'none',
                background: active ? 'rgba(33,69,251,0.2)' : 'transparent',
                borderLeft: `3px solid ${active ? '#2145fb' : 'transparent'}`,
                color: active ? '#fff' : 'rgba(255,255,255,0.45)',
                fontSize: '13px', fontWeight: active ? 600 : 400,
                transition: 'all 0.15s',
              }}>
                <item.Icon size={15} />
                {item.label}
              </Link>
            );
          })}

          <div style={{ marginTop: 'auto', paddingTop: '16px', borderTop: '1px solid rgba(255,255,255,0.06)', marginLeft: '-12px', marginRight: '-12px', paddingLeft: '12px', paddingRight: '12px' }}>
            <a href="https://wa.me/919876543210" target="_blank" rel="noopener noreferrer" style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '10px 14px', borderRadius: '10px', textDecoration: 'none', background: 'rgba(34,197,94,0.12)', color: '#4ade80', fontSize: '13px', fontWeight: 500 }}>
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
              : <div style={{ width: '34px', height: '34px', borderRadius: '50%', background: '#2145fb', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '13px', fontWeight: 700, color: '#fff', flexShrink: 0 }}>{firstName[0]}</div>
            }
            <div style={{ overflow: 'hidden', flex: 1 }}>
              <div style={{ fontSize: '13px', fontWeight: 600, color: '#fff', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{user?.name}</div>
              <div style={{ fontSize: '10px', color: 'rgba(255,255,255,0.35)' }}>Candidate</div>
            </div>
          </div>
          <button onClick={() => signOut({ callbackUrl: '/login' })} style={{ display: 'flex', alignItems: 'center', gap: '8px', background: 'none', border: 'none', color: 'rgba(255,255,255,0.3)', fontSize: '12px', cursor: 'pointer', padding: '6px 8px', borderRadius: '8px', width: '100%', fontFamily: "'Poppins',sans-serif" }}>
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
            <span className="portal-header-greeting" style={{ fontSize: '14px', color: '#64748b' }}>
              Hey, <strong style={{ color: '#0b0d20' }}>{firstName}</strong> — welcome back!
            </span>
          </div>
          <Link href="/contact" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', padding: '7px 16px', background: '#2145fb', color: '#fff', borderRadius: '8px', textDecoration: 'none', fontSize: '13px', fontWeight: 600, fontFamily: "'Poppins',sans-serif", whiteSpace: 'nowrap' }}>
            Free Consultation
          </Link>
        </header>

        <main style={{ flex: 1, padding: 'clamp(16px,3vw,28px) clamp(16px,4vw,32px)', overflowY: 'auto' }}>
          <ExpiryBanner session={session} />
          {children}
        </main>
      </div>
    </div>
  );
}
