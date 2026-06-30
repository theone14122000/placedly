'use client';
import { signOut, useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { LogOut, Users } from 'lucide-react';

export default function RecruiterLayout({ children }: { children: React.ReactNode }) {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === 'unauthenticated') router.push('/login');
  }, [status, router]);

  if (status === 'loading') return null;

  return (
    <div style={{ minHeight: '100vh', fontFamily: "'Poppins',sans-serif", background: '#f1f5f9' }}>
      {/* Top bar */}
      <header style={{ background: '#0b0d20', padding: '0 clamp(12px, 3vw, 24px)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '52px', position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <Users size={18} color="#2145fb" />
          <span style={{ fontSize: '15px', fontWeight: 800, color: '#fff' }}>Placedly ATS</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <span style={{ fontSize: '13px', color: 'rgba(255,255,255,0.6)', display: 'inline', maxWidth: '120px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{session?.user?.name}</span>
          <button onClick={() => signOut({ callbackUrl: '/login' })}
            style={{ display: 'flex', alignItems: 'center', gap: '6px', background: 'none', border: 'none', color: 'rgba(255,255,255,0.5)', cursor: 'pointer', fontSize: '12px', fontFamily: "'Poppins',sans-serif" }}>
            <LogOut size={14} /> <span style={{ display: 'inline' }}>Sign out</span>
          </button>
        </div>
      </header>
      <div style={{ paddingTop: '52px' }}>{children}</div>
    </div>
  );
}
