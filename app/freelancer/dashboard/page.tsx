'use client';
import { useEffect, useState } from 'react';
import { Copy, Check, Users, IndianRupee, TrendingUp, Clock } from 'lucide-react';

type Stats = { totalReferrals: number; approved: number; pendingCommission: number; paidCommission: number };
type Referral = { id: string; application: { name: string; email: string; status: string; createdAt: string; programme: { name: string } } };

export default function FreelancerDashboard() {
  const [data, setData]     = useState<{ referralCode: string; referralLink: string; stats: Stats; referrals: Referral[] } | null>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    fetch('/api/freelancer/dashboard').then(r => r.json()).then(setData).catch(() => {});
  }, []);

  const copyLink = () => {
    if (!data) return;
    navigator.clipboard.writeText(data.referralLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (!data) return <div style={{ padding: '40px', color: '#64748b', fontSize: '14px' }}>Loading…</div>;

  const statusBadge = (s: string) => {
    const map: Record<string, { bg: string; color: string }> = {
      PENDING:  { bg: '#fef9c3', color: '#854d0e' },
      APPROVED: { bg: '#dcfce7', color: '#166534' },
      REJECTED: { bg: '#fee2e2', color: '#991b1b' },
    };
    const c = map[s] ?? { bg: '#f1f5f9', color: '#475569' };
    return <span style={{ padding: '2px 10px', borderRadius: '999px', fontSize: '11px', fontWeight: 700, background: c.bg, color: c.color }}>{s}</span>;
  };

  return (
    <div style={{ padding: 'clamp(16px, 4vw, 32px)' }}>
      <div style={{ marginBottom: '28px' }}>
        <h1 style={{ fontSize: 'clamp(18px, 4vw, 22px)', fontWeight: 900, color: '#0b0d20', marginBottom: '4px' }}>Partner Dashboard</h1>
        <p style={{ fontSize: '14px', color: '#64748b' }}>Track your referrals and commissions in one place.</p>
      </div>

      {/* Referral link card */}
      <div className="dash-ref-card" style={{ background: 'linear-gradient(135deg, #2145fb 0%, #1a38d4 100%)', borderRadius: '16px', color: '#fff' }}>
        <div style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '0.6px', textTransform: 'uppercase', color: 'rgba(255,255,255,0.6)', marginBottom: '6px' }}>Your Referral Code</div>
        <div style={{ fontSize: 'clamp(22px, 6vw, 28px)', fontWeight: 900, letterSpacing: '2px', marginBottom: '16px' }}>{data.referralCode}</div>
        <div className="dash-reflink-row">
          <span style={{ flex: 1, fontSize: '12px', color: 'rgba(255,255,255,0.8)', wordBreak: 'break-all' }}>{data.referralLink}</span>
          <button onClick={copyLink} style={{ display: 'flex', alignItems: 'center', gap: '5px', background: '#fff', color: '#2145fb', border: 'none', borderRadius: '7px', padding: '8px 14px', fontSize: '12px', fontWeight: 700, cursor: 'pointer', fontFamily: "'Poppins',sans-serif", flexShrink: 0 }}>
            {copied ? <><Check size={12} /> Copied!</> : <><Copy size={12} /> Copy Link</>}
          </button>
        </div>
        <div style={{ fontSize: '12px', color: 'rgba(255,255,255,0.5)', marginTop: '10px' }}>
          Share this link — every candidate who applies via your link is automatically tagged to you.
        </div>
      </div>

      {/* Stats grid */}
      <div className="dash-stats-grid">
        {[
          { label: 'Total Referrals', value: data.stats.totalReferrals, Icon: Users, color: '#2145fb' },
          { label: 'Approved',        value: data.stats.approved,       Icon: TrendingUp, color: '#16a34a' },
          { label: 'Pending Earning', value: `₹${data.stats.pendingCommission.toLocaleString('en-IN')}`, Icon: Clock, color: '#f97316' },
          { label: 'Total Earned',    value: `₹${data.stats.paidCommission.toLocaleString('en-IN')}`,   Icon: IndianRupee, color: '#7c3aed' },
        ].map(s => (
          <div key={s.label} style={{ background: '#fff', borderRadius: '14px', padding: 'clamp(14px, 3vw, 20px)', border: '1px solid #eef0f6', boxShadow: '0 1px 4px rgba(0,0,0,.04)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '10px' }}>
              <div style={{ width: '34px', height: '34px', borderRadius: '9px', background: s.color + '15', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <s.Icon size={16} color={s.color} />
              </div>
            </div>
            <div style={{ fontSize: 'clamp(18px, 4vw, 22px)', fontWeight: 900, color: '#0b0d20', marginBottom: '2px' }}>{s.value}</div>
            <div style={{ fontSize: '12px', color: '#64748b' }}>{s.label}</div>
          </div>
        ))}
      </div>

      {/* Recent referrals */}
      <div style={{ background: '#fff', borderRadius: '16px', border: '1px solid #eef0f6', overflow: 'hidden' }}>
        <div style={{ padding: '18px 24px', borderBottom: '1px solid #f1f5f9', fontSize: '15px', fontWeight: 700, color: '#0b0d20' }}>Recent Referrals</div>
        {data.referrals.length === 0 ? (
          <div style={{ padding: '40px', textAlign: 'center', color: '#94a3b8', fontSize: '14px' }}>No referrals yet. Share your referral link to get started.</div>
        ) : (
          <div className="dash-table-wrap">
            <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: '520px' }}>
              <thead>
                <tr style={{ background: '#f8faff' }}>
                  {['Candidate', 'Email', 'Programme', 'Status', 'Applied On'].map(h => (
                    <th key={h} style={{ padding: '10px 16px', textAlign: 'left', fontSize: '11px', fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.4px', whiteSpace: 'nowrap' }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {data.referrals.map(r => (
                  <tr key={r.id} style={{ borderTop: '1px solid #f1f5f9' }}>
                    <td style={{ padding: '12px 16px', fontSize: '14px', fontWeight: 600, color: '#0b0d20', whiteSpace: 'nowrap' }}>{r.application.name}</td>
                    <td style={{ padding: '12px 16px', fontSize: '13px', color: '#64748b' }}>{r.application.email}</td>
                    <td style={{ padding: '12px 16px', fontSize: '13px', color: '#64748b' }}>{r.application.programme.name}</td>
                    <td style={{ padding: '12px 16px' }}>{statusBadge(r.application.status)}</td>
                    <td style={{ padding: '12px 16px', fontSize: '13px', color: '#94a3b8', whiteSpace: 'nowrap' }}>{new Date(r.application.createdAt).toLocaleDateString('en-IN')}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
