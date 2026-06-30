'use client';
import { signOut, useSession } from 'next-auth/react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { LayoutDashboard, Users, ClipboardList, BarChart2, LogOut } from 'lucide-react';

const NAV = [
  { href: '/mgmt',              label: 'Dashboard',    Icon: LayoutDashboard, exact: true },
  { href: '/mgmt/applications', label: 'Applications', Icon: ClipboardList },
  { href: '/mgmt/users',        label: 'Candidates',   Icon: Users },
  { href: '/mgmt/analytics',    label: 'Analytics',    Icon: BarChart2 },
];

export default function MgmtLayout({ children }: { children: React.ReactNode }) {
  const { data: session, status } = useSession();
  const pathname = usePathname();
  const router   = useRouter();

  useEffect(() => {
    if (status === 'loading') return;
    if (!session) { router.replace('/login'); return; }
    const role = (session.user as any)?.role;
    if (role !== 'admin' && role !== 'master_admin') router.replace('/login');
  }, [session, status, router]);

  if (status === 'loading') return null;

  const role = (session?.user as any)?.role;
  if (role !== 'admin' && role !== 'master_admin') return null;

  return (
    <div style={{ minHeight: '100vh', fontFamily: "'Poppins',sans-serif" }}>

      {/* Desktop sidebar */}
      <aside className="mgmt-sidebar">
        <div style={{ padding: '24px 20px 20px', borderBottom: '1px solid rgba(255,255,255,0.07)' }}>
          <div style={{ fontSize: '15px', fontWeight: 800, color: '#fff', marginBottom: '2px' }}>Placedly</div>
          <div style={{ fontSize: '10px', color: '#f97316', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.5px' }}>Admin Portal</div>
        </div>
        <nav style={{ flex: 1, padding: '16px 12px' }}>
          {NAV.map(({ href, label, Icon, exact }) => {
            const active = exact ? pathname === href : pathname.startsWith(href);
            return (
              <Link key={href} href={href} style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '10px 12px', borderRadius: '10px', marginBottom: '4px', textDecoration: 'none', background: active ? '#f97316' : 'transparent', color: active ? '#fff' : 'rgba(255,255,255,0.55)', fontSize: '13px', fontWeight: active ? 700 : 500, transition: '0.15s' }}>
                <Icon size={16} /> {label}
              </Link>
            );
          })}
        </nav>
        <div style={{ padding: '16px 12px', borderTop: '1px solid rgba(255,255,255,0.07)' }}>
          <div style={{ fontSize: '12px', color: 'rgba(255,255,255,0.4)', marginBottom: '4px', paddingLeft: '4px' }}>{session?.user?.name}</div>
          <button onClick={() => signOut({ callbackUrl: '/login' })}
            style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '8px 12px', borderRadius: '8px', background: 'rgba(255,255,255,0.06)', border: 'none', color: 'rgba(255,255,255,0.5)', fontSize: '12px', cursor: 'pointer', fontFamily: "'Poppins',sans-serif", width: '100%' }}>
            <LogOut size={13} /> Sign out
          </button>
        </div>
      </aside>

      {/* Mobile top bar */}
      <div className="mgmt-mobile-topbar">
        <div style={{ fontSize: '15px', fontWeight: 800, color: '#fff' }}>Placedly <span style={{ fontSize: '10px', fontWeight: 600, color: '#f97316', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Admin</span></div>
        <button onClick={() => signOut({ callbackUrl: '/login' })}
          style={{ display: 'flex', alignItems: 'center', gap: '6px', background: 'none', border: 'none', color: 'rgba(255,255,255,0.5)', cursor: 'pointer', fontSize: '12px', fontFamily: "'Poppins',sans-serif" }}>
          <LogOut size={14} /> Sign out
        </button>
      </div>

      <main className="mgmt-main">
        {children}
      </main>

      {/* Mobile bottom nav */}
      <nav className="mgmt-bottom-nav">
        {NAV.map(({ href, label, Icon, exact }) => {
          const active = exact ? pathname === href : pathname.startsWith(href);
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
