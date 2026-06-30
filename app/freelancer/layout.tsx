'use client';
import { signOut, useSession } from 'next-auth/react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { LayoutDashboard, Users, IndianRupee, BookOpen, LogOut } from 'lucide-react';

const NAV = [
  { href: '/freelancer/dashboard',   label: 'Dashboard',   Icon: LayoutDashboard },
  { href: '/freelancer/referrals',   label: 'Referrals',   Icon: Users },
  { href: '/freelancer/commissions', label: 'Commissions', Icon: IndianRupee },
  { href: '/freelancer/sop',         label: 'Training',    Icon: BookOpen },
];

export default function FreelancerLayout({ children }: { children: React.ReactNode }) {
  const { data: session, status } = useSession();
  const pathname = usePathname();
  const router   = useRouter();

  useEffect(() => {
    if (status === 'unauthenticated') router.push('/login');
  }, [status, router]);

  if (status === 'loading') return null;

  return (
    <div style={{ minHeight: '100vh', fontFamily: "'Poppins',sans-serif" }}>
      {/* Desktop sidebar */}
      <aside className="fl-sidebar">
        <div style={{ padding: '24px 20px 20px', borderBottom: '1px solid rgba(255,255,255,0.07)' }}>
          <div style={{ fontSize: '15px', fontWeight: 800, color: '#fff', marginBottom: '2px' }}>Placedly</div>
          <div style={{ fontSize: '11px', color: 'rgba(255,255,255,0.4)', fontWeight: 500 }}>Partner Portal</div>
        </div>
        <nav style={{ flex: 1, padding: '16px 12px' }}>
          {NAV.map(({ href, label, Icon }) => {
            const active = pathname.startsWith(href);
            return (
              <Link key={href} href={href} style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '10px 12px', borderRadius: '10px', marginBottom: '4px', textDecoration: 'none', background: active ? '#2145fb' : 'transparent', color: active ? '#fff' : 'rgba(255,255,255,0.55)', fontSize: '13px', fontWeight: active ? 700 : 500, transition: '0.15s' }}>
                <Icon size={16} /> {label}
              </Link>
            );
          })}
        </nav>
        <div style={{ padding: '16px 12px', borderTop: '1px solid rgba(255,255,255,0.07)' }}>
          <div style={{ fontSize: '12px', color: 'rgba(255,255,255,0.5)', marginBottom: '4px', paddingLeft: '4px' }}>{session?.user?.name}</div>
          <button onClick={() => signOut({ callbackUrl: '/login' })}
            style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '8px 12px', borderRadius: '8px', background: 'rgba(255,255,255,0.06)', border: 'none', color: 'rgba(255,255,255,0.5)', fontSize: '12px', cursor: 'pointer', fontFamily: "'Poppins',sans-serif", width: '100%' }}>
            <LogOut size={13} /> Sign out
          </button>
        </div>
      </aside>

      {/* Mobile top bar */}
      <div className="fl-mobile-topbar">
        <div style={{ fontSize: '15px', fontWeight: 800, color: '#fff' }}>Placedly <span style={{ fontSize: '11px', fontWeight: 500, color: 'rgba(255,255,255,0.45)' }}>Partner</span></div>
        <button onClick={() => signOut({ callbackUrl: '/login' })}
          style={{ display: 'flex', alignItems: 'center', gap: '6px', background: 'none', border: 'none', color: 'rgba(255,255,255,0.5)', cursor: 'pointer', fontSize: '12px', fontFamily: "'Poppins',sans-serif" }}>
          <LogOut size={14} /> Sign out
        </button>
      </div>

      <main className="fl-main">
        {children}
      </main>

      {/* Mobile bottom nav */}
      <nav className="fl-bottom-nav">
        {NAV.map(({ href, label, Icon }) => {
          const active = pathname.startsWith(href);
          return (
            <Link key={href} href={href} className={active ? 'active' : ''}>
              <Icon size={18} />
              {label}
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
