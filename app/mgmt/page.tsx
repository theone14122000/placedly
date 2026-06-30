'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Users, ClipboardList, CheckCircle2, Clock, XCircle, TrendingUp } from 'lucide-react';

type Stats = {
  totalApplications: number;
  pendingApplications: number;
  approvedApplications: number;
  rejectedApplications: number;
  activeCandidates: number;
  expiredCandidates: number;
  suspendedCandidates: number;
  last7DaysApps: number;
  last30DaysApps: number;
  recentApplications: { id: string; name: string; email: string; status: string; createdAt: string; programme: { name: string } }[];
};

const STATUS_BADGE: Record<string, { bg: string; color: string }> = {
  PENDING:  { bg: '#fef9c3', color: '#854d0e' },
  APPROVED: { bg: '#dcfce7', color: '#166534' },
  REJECTED: { bg: '#fee2e2', color: '#991b1b' },
};

export default function MgmtDashboard() {
  const [stats, setStats] = useState<Stats | null>(null);

  useEffect(() => {
    fetch('/api/admin/stats').then(r => r.json()).then(setStats).catch(() => {});
  }, []);

  if (!stats) return <div style={{ padding: '40px', color: '#64748b', fontSize: '14px' }}>Loading…</div>;

  const cards = [
    { label: 'Total Applications', value: stats.totalApplications,  Icon: ClipboardList, color: '#2145fb', href: '/mgmt/applications' },
    { label: 'Pending Review',     value: stats.pendingApplications, Icon: Clock,         color: '#f97316', href: '/mgmt/applications?status=PENDING' },
    { label: 'Approved',           value: stats.approvedApplications,Icon: CheckCircle2,  color: '#16a34a', href: '/mgmt/applications?status=APPROVED' },
    { label: 'Active Candidates',  value: stats.activeCandidates,    Icon: Users,         color: '#7c3aed', href: '/mgmt/users' },
    { label: 'Last 7 Days',        value: stats.last7DaysApps,       Icon: TrendingUp,    color: '#0891b2', href: '/mgmt/analytics' },
    { label: 'Rejected',           value: stats.rejectedApplications, Icon: XCircle,      color: '#dc2626', href: '/mgmt/applications?status=REJECTED' },
  ];

  return (
    <div className="mgmt-page">
      <div style={{ marginBottom: '28px' }}>
        <h1 style={{ fontSize: 'clamp(18px,4vw,22px)', fontWeight: 900, color: '#0b0d20', marginBottom: '4px' }}>Admin Dashboard</h1>
        <p style={{ fontSize: '14px', color: '#64748b' }}>Overview of applications and candidate activity.</p>
      </div>

      {/* Stat cards */}
      <div className="mgmt-grid-3" style={{ marginBottom: '32px' }}>
        {cards.map(c => (
          <Link key={c.label} href={c.href} style={{ textDecoration: 'none' }}>
            <div style={{ background: '#fff', borderRadius: '14px', padding: '20px 22px', border: '1px solid #eef0f6', boxShadow: '0 1px 4px rgba(0,0,0,.04)', cursor: 'pointer', transition: '0.15s' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px' }}>
                <div style={{ width: '36px', height: '36px', borderRadius: '9px', background: c.color + '18', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <c.Icon size={17} color={c.color} />
                </div>
              </div>
              <div style={{ fontSize: '26px', fontWeight: 900, color: '#0b0d20', marginBottom: '2px' }}>{c.value}</div>
              <div style={{ fontSize: '12px', color: '#64748b' }}>{c.label}</div>
            </div>
          </Link>
        ))}
      </div>

      {/* Recent applications */}
      <div style={{ background: '#fff', borderRadius: '16px', border: '1px solid #eef0f6', overflow: 'hidden' }}>
        <div style={{ padding: '18px 24px', borderBottom: '1px solid #f1f5f9', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <span style={{ fontSize: '15px', fontWeight: 700, color: '#0b0d20' }}>Recent Applications</span>
          <Link href="/mgmt/applications" style={{ fontSize: '12px', color: '#2145fb', fontWeight: 600, textDecoration: 'none' }}>View all →</Link>
        </div>
        {stats.recentApplications.length === 0 ? (
          <div style={{ padding: '40px', textAlign: 'center', color: '#94a3b8', fontSize: '14px' }}>No applications yet.</div>
        ) : (
          <div className="mgmt-table-wrap">
          <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: '540px' }}>
            <thead>
              <tr style={{ background: '#f8faff' }}>
                {['Name', 'Email', 'Programme', 'Status', 'Applied'].map(h => (
                  <th key={h} style={{ padding: '10px 16px', textAlign: 'left', fontSize: '11px', fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.4px' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {stats.recentApplications.map(a => {
                const c = STATUS_BADGE[a.status] ?? { bg: '#f1f5f9', color: '#475569' };
                return (
                  <tr key={a.id} style={{ borderTop: '1px solid #f1f5f9' }}>
                    <td style={{ padding: '12px 16px', fontSize: '14px', fontWeight: 600, color: '#0b0d20' }}>{a.name}</td>
                    <td style={{ padding: '12px 16px', fontSize: '13px', color: '#64748b' }}>{a.email}</td>
                    <td style={{ padding: '12px 16px', fontSize: '13px', color: '#64748b' }}>{a.programme.name}</td>
                    <td style={{ padding: '12px 16px' }}>
                      <span style={{ padding: '3px 10px', borderRadius: '999px', fontSize: '11px', fontWeight: 700, background: c.bg, color: c.color }}>{a.status}</span>
                    </td>
                    <td style={{ padding: '12px 16px', fontSize: '13px', color: '#94a3b8' }}>{new Date(a.createdAt).toLocaleDateString('en-IN')}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          </div>
        )}
      </div>
    </div>
  );
}
