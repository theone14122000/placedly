'use client';
import { useEffect, useState } from 'react';
import { TrendingUp, Users, ClipboardList, CheckCircle2, XCircle, Clock } from 'lucide-react';

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
  byProgramme: { name: string; count: number }[];
};

export default function MgmtAnalytics() {
  const [stats, setStats] = useState<Stats | null>(null);

  useEffect(() => {
    fetch('/api/admin/stats').then(r => r.json()).then(setStats).catch(() => {});
  }, []);

  if (!stats) return <div style={{ padding: '40px', color: '#64748b', fontSize: '14px' }}>Loading…</div>;

  const approvalRate = stats.totalApplications > 0
    ? Math.round((stats.approvedApplications / stats.totalApplications) * 100)
    : 0;

  const rejectionRate = stats.totalApplications > 0
    ? Math.round((stats.rejectedApplications / stats.totalApplications) * 100)
    : 0;

  const pendingRate = stats.totalApplications > 0
    ? Math.round((stats.pendingApplications / stats.totalApplications) * 100)
    : 0;

  const maxProgrammeCount = Math.max(...stats.byProgramme.map(p => p.count), 1);

  return (
    <div className="mgmt-page">
      <div style={{ marginBottom: '28px' }}>
        <h1 style={{ fontSize: 'clamp(18px,4vw,22px)', fontWeight: 900, color: '#0b0d20', marginBottom: '4px' }}>Analytics</h1>
        <p style={{ fontSize: '14px', color: '#64748b' }}>Platform-wide application and candidate metrics.</p>
      </div>

      {/* Top stats */}
      <div className="mgmt-grid-3">
        {[
          { label: 'Total Applications', value: stats.totalApplications, sub: `${stats.last30DaysApps} in last 30 days`, Icon: ClipboardList, color: '#2145fb', bg: '#eff6ff' },
          { label: 'This Week',          value: stats.last7DaysApps,     sub: 'new applications',                          Icon: TrendingUp,   color: '#7c3aed', bg: '#f5f3ff' },
          { label: 'Active Candidates',  value: stats.activeCandidates,  sub: `${stats.expiredCandidates} expired`,         Icon: Users,        color: '#16a34a', bg: '#f0fdf4' },
        ].map(c => (
          <div key={c.label} style={{ background: '#fff', borderRadius: '14px', padding: '22px 24px', border: '1px solid #eef0f6' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '14px' }}>
              <div style={{ width: '38px', height: '38px', borderRadius: '10px', background: c.bg, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <c.Icon size={18} color={c.color} />
              </div>
            </div>
            <div style={{ fontSize: '30px', fontWeight: 900, color: '#0b0d20', marginBottom: '2px' }}>{c.value}</div>
            <div style={{ fontSize: '13px', color: '#64748b' }}>{c.label}</div>
            <div style={{ fontSize: '11px', color: '#94a3b8', marginTop: '4px' }}>{c.sub}</div>
          </div>
        ))}
      </div>

      <div className="mgmt-grid-2">

        {/* Application funnel */}
        <div style={{ background: '#fff', borderRadius: '16px', border: '1px solid #eef0f6', padding: '24px' }}>
          <div style={{ fontSize: '15px', fontWeight: 800, color: '#0b0d20', marginBottom: '20px' }}>Application Funnel</div>
          {[
            { label: 'Total Received', value: stats.totalApplications,  color: '#2145fb', pct: 100 },
            { label: 'Approved',       value: stats.approvedApplications, color: '#16a34a', pct: approvalRate },
            { label: 'Pending',        value: stats.pendingApplications,  color: '#f97316', pct: pendingRate },
            { label: 'Rejected',       value: stats.rejectedApplications, color: '#dc2626', pct: rejectionRate },
          ].map(row => (
            <div key={row.label} style={{ marginBottom: '16px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px' }}>
                <span style={{ fontSize: '13px', color: '#374151', fontWeight: 600 }}>{row.label}</span>
                <span style={{ fontSize: '13px', fontWeight: 900, color: '#0b0d20' }}>{row.value} <span style={{ fontSize: '11px', color: '#94a3b8', fontWeight: 400 }}>({row.pct}%)</span></span>
              </div>
              <div style={{ height: '7px', background: '#f1f5f9', borderRadius: '4px', overflow: 'hidden' }}>
                <div style={{ height: '100%', width: `${row.pct}%`, background: row.color, borderRadius: '4px', transition: '0.5s' }} />
              </div>
            </div>
          ))}
        </div>

        {/* Candidate status */}
        <div style={{ background: '#fff', borderRadius: '16px', border: '1px solid #eef0f6', padding: '24px' }}>
          <div style={{ fontSize: '15px', fontWeight: 800, color: '#0b0d20', marginBottom: '20px' }}>Candidate Accounts</div>
          {[
            { label: 'Active',    value: stats.activeCandidates,    Icon: CheckCircle2, color: '#16a34a', bg: '#f0fdf4' },
            { label: 'Expired',   value: stats.expiredCandidates,   Icon: Clock,        color: '#f97316', bg: '#fff7ed' },
            { label: 'Suspended', value: stats.suspendedCandidates, Icon: XCircle,      color: '#dc2626', bg: '#fef2f2' },
          ].map(row => (
            <div key={row.label} style={{ display: 'flex', alignItems: 'center', gap: '14px', padding: '14px 0', borderBottom: '1px solid #f8faff' }}>
              <div style={{ width: '38px', height: '38px', borderRadius: '10px', background: row.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <row.Icon size={17} color={row.color} />
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: '13px', fontWeight: 600, color: '#374151' }}>{row.label}</div>
              </div>
              <div style={{ fontSize: '22px', fontWeight: 900, color: '#0b0d20' }}>{row.value}</div>
            </div>
          ))}
          <div style={{ marginTop: '16px', padding: '12px 14px', background: '#f8faff', borderRadius: '10px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '13px', color: '#64748b' }}>Total enrolled</span>
            <span style={{ fontSize: '18px', fontWeight: 900, color: '#0b0d20' }}>{stats.activeCandidates + stats.expiredCandidates + stats.suspendedCandidates}</span>
          </div>
        </div>
      </div>

      {/* By programme */}
      {stats.byProgramme.length > 0 && (
        <div style={{ background: '#fff', borderRadius: '16px', border: '1px solid #eef0f6', padding: '24px' }}>
          <div style={{ fontSize: '15px', fontWeight: 800, color: '#0b0d20', marginBottom: '20px' }}>Applications by Programme</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            {stats.byProgramme.sort((a, b) => b.count - a.count).map(p => (
              <div key={p.name}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                  <span style={{ fontSize: '13px', fontWeight: 600, color: '#374151' }}>{p.name}</span>
                  <span style={{ fontSize: '13px', fontWeight: 900, color: '#0b0d20' }}>{p.count}</span>
                </div>
                <div style={{ height: '8px', background: '#f1f5f9', borderRadius: '4px', overflow: 'hidden' }}>
                  <div style={{ height: '100%', width: `${Math.round((p.count / maxProgrammeCount) * 100)}%`, background: 'linear-gradient(90deg, #2145fb, #4f6bff)', borderRadius: '4px' }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
