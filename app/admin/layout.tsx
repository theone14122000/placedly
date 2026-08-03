'use client';
import { useSession } from 'next-auth/react';
import { useRouter, usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import {
  LayoutDashboard, Briefcase, BookOpen, Home, Globe, Rocket,
  Users, Image, Info, Layers, LogOut, BarChart2, MessageSquare, Shield, UserCog,
  Phone, KeyRound,
} from 'lucide-react';
import { signOut } from 'next-auth/react';

const NAV = [
  { label: 'Overview',      href: '/admin',             Icon: LayoutDashboard },
  { label: 'Analytics',     href: '/admin/analytics',   Icon: BarChart2 },
  { label: 'Users',         href: '/admin/users',       Icon: Users },
  { label: 'Vacancies',     href: '/admin/vacancies',   Icon: Briefcase },
  { label: 'Courses',       href: '/admin/courses',     Icon: BookOpen },
  { label: 'FAQ & Reviews', href: '/admin/faq',         Icon: MessageSquare },
  { label: 'Homepage',      href: '/admin/homepage',    Icon: Home },
  { label: 'CAP Page',      href: '/admin/cap',         Icon: Rocket },
  { label: 'Study Visa',    href: '/admin/study-visa',  Icon: Globe },
  { label: 'About Us',      href: '/admin/about',       Icon: Info },
  { label: 'Services',      href: '/admin/services',    Icon: Layers },
  { label: 'Contact Page',  href: '/admin/contact',     Icon: Phone },
  { label: 'Login Page',    href: '/admin/login',       Icon: KeyRound },
  { label: 'Media',         href: '/admin/media',       Icon: Image },
  { label: 'Staff',         href: '/admin/staff',       Icon: UserCog },
  { label: 'Audit Log',     href: '/admin/audit',       Icon: Shield },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const { data: session, status } = useSession();
  const router = useRouter();
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    if (status === 'loading') return;
    if (!session) { router.replace('/login'); return; }
    if ((session.user as any)?.role !== 'master_admin') { router.replace('/dashboard'); }
  }, [session, status, router]);

  useEffect(() => { setSidebarOpen(false); }, [pathname]);

  if (status === 'loading' || (session?.user as any)?.role !== 'master_admin') {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#f8faff', fontFamily: "'Poppins',sans-serif" }}>
        <img src="/logo.png" alt="Placedly" style={{ height: '48px', width: 'auto' }} />
      </div>
    );
  }

  return (
    <div className="portal-layout">

      {/* Mobile overlay */}
      <div
        className={`portal-overlay${sidebarOpen ? ' open' : ''}`}
        onClick={() => setSidebarOpen(false)}
      />

      {/* Sidebar */}
      <aside className={`portal-sidebar admin${sidebarOpen ? ' open' : ''}`}>
        <div style={{ padding: '24px 20px', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
          <div style={{ marginBottom: '4px' }}>
            <img src="/logo.png" alt="Placedly" style={{ height: '48px', width: 'auto' }} />
          </div>
          <div style={{ fontSize: '10px', fontWeight: 600, color: '#f97316', textTransform: 'uppercase', letterSpacing: '0.6px', marginLeft: '42px' }}>Super Admin</div>
        </div>

        <nav style={{ flex: 1, padding: '12px', display: 'flex', flexDirection: 'column', gap: '2px', overflowY: 'auto' }}>
          {NAV.map(item => {
            const active = pathname === item.href;
            return (
              <a
                key={item.href}
                href={item.href}
                style={{
                  display: 'flex', alignItems: 'center', gap: '10px',
                  padding: '9px 12px', borderRadius: '10px', textDecoration: 'none',
                  background: active ? 'rgba(33,69,251,0.2)' : 'transparent',
                  borderLeft: active ? '3px solid #2145fb' : '3px solid transparent',
                  color: active ? '#fff' : 'rgba(255,255,255,0.5)',
                  fontSize: '13px', fontWeight: active ? 600 : 400,
                }}
              >
                <item.Icon size={14} />
                {item.label}
              </a>
            );
          })}
        </nav>

        <div style={{ padding: '12px 12px 20px', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '10px 12px', marginBottom: '4px' }}>
            {session?.user?.image
              ? <img src={session.user.image} alt="" style={{ width: '30px', height: '30px', borderRadius: '50%' }} />
              : <div style={{ width: '30px', height: '30px', borderRadius: '50%', background: '#f97316', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '12px', fontWeight: 700, color: '#fff' }}>{session?.user?.name?.[0] ?? 'A'}</div>
            }
            <div style={{ overflow: 'hidden', flex: 1 }}>
              <div style={{ fontSize: '11px', fontWeight: 600, color: '#fff', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{session?.user?.name}</div>
              <div style={{ fontSize: '10px', color: '#f97316' }}>Super Admin</div>
            </div>
          </div>
          <button
            onClick={() => signOut({ callbackUrl: '/login' })}
            style={{ display: 'flex', alignItems: 'center', gap: '8px', background: 'none', border: 'none', color: 'rgba(255,255,255,0.35)', fontSize: '12px', cursor: 'pointer', padding: '8px 12px', borderRadius: '8px', width: '100%', fontFamily: "'Poppins',sans-serif" }}
          >
            <LogOut size={12} /> Sign Out
          </button>
        </div>
      </aside>

      {/* Content */}
      <div className="portal-main" style={{ background: '#f8faff', overflowY: 'auto' }}>
        {/* Mobile topbar */}
        <header style={{ display: 'none', background: '#fff', borderBottom: '1px solid #e2e8f0', padding: '0 20px', height: '52px', alignItems: 'center', gap: '12px', position: 'sticky', top: 0, zIndex: 20 }} className="portal-admin-topbar">
          <button
            className={`portal-hamburger${sidebarOpen ? ' open' : ''}`}
            onClick={() => setSidebarOpen(v => !v)}
            aria-label="Toggle menu"
          >
            <span />
          </button>
          <span style={{ fontSize: '13px', fontWeight: 700, color: '#0b0d20' }}>Admin Panel</span>
        </header>

        {children}
      </div>
    </div>
  );
}
