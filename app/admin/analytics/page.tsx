'use client';
import { useState, useEffect } from 'react';
import { TrendingUp, Users, FileText, Briefcase, BookOpen, Clock, CheckCircle2, XCircle, AlertCircle } from 'lucide-react';

type Stats = {
  totalApplications: number; pendingApplications: number; approvedApplications: number; rejectedApplications: number;
  activeCandidates: number; expiredCandidates: number; suspendedCandidates: number;
  activeVacancies: number; activeCourses: number;
  last7DaysApps: number; last30DaysApps: number;
  byProgramme: { name: string; count: number }[];
  recentApplications: { id: string; name: string; email: string; status: string; createdAt: string; programme: { name: string } }[];
  recentCandidates: { id: string; name: string; email: string; status: string; validUntil: string; createdAt: string }[];
};

const STATUS_COLORS: Record<string, { bg: string; color: string; label: string }> = {
  PENDING:  { bg: '#fef9c3', color: '#a16207', label: 'Pending' },
  APPROVED: { bg: '#dcfce7', color: '#15803d', label: 'Approved' },
  REJECTED: { bg: '#fee2e2', color: '#dc2626', label: 'Rejected' },
  ACTIVE:   { bg: '#dbeafe', color: '#1d4ed8', label: 'Active' },
  EXPIRED:  { bg: '#f1f5f9', color: '#64748b', label: 'Expired' },
  SUSPENDED:{ bg: '#fce7f3', color: '#be185d', label: 'Suspended' },
};

function Badge({ status }: { status: string }) {
  const s = STATUS_COLORS[status] ?? { bg: '#f1f5f9', color: '#64748b', label: status };
  return (
    <span style={{ fontSize: '10px', fontWeight: 700, padding: '3px 8px', borderRadius: 999, background: s.bg, color: s.color, textTransform: 'uppercase', letterSpacing: '0.4px' }}>
      {s.label}
    </span>
  );
}

export default function AdminAnalyticsPage() {
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/admin/stats')
      .then(r => r.json())
      .then(d => { setStats(d); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  if (loading) return (
    <div style={{ padding: '32px', fontFamily: "'Poppins',sans-serif", color: '#94a3b8', fontSize: '14px' }}>Loading analytics…</div>
  );

  if (!stats) return (
    <div style={{ padding: '32px', fontFamily: "'Poppins',sans-serif", color: '#ef4444', fontSize: '14px' }}>Failed to load stats.</div>
  );

  const conversionRate = stats.totalApplications > 0
    ? Math.round((stats.approvedApplications / stats.totalApplications) * 100)
    : 0;

  return (
    <div className="adm-page" style={{ padding: '32px', fontFamily: "'Poppins',sans-serif" }}>
      <div style={{ marginBottom: '28px' }}>
        <h1 style={{ fontSize: '22px', fontWeight: 900, color: '#0b0d20', marginBottom: '3px' }}>Analytics</h1>
        <p style={{ fontSize: '13px', color: '#64748b' }}>Platform performance overview and funnel metrics.</p>
      </div>

      {/* Top KPI row */}
      <div className="adm-stats-4" style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: '16px', marginBottom: '24px' }}>
        {[
          { Icon: FileText, label: 'Total Applications', value: stats.totalApplications, sub: `+${stats.last7DaysApps} this week`, color: '#2145fb', bg: '#eff6ff' },
          { Icon: Users,    label: 'Active Candidates', value: stats.activeCandidates,   sub: `${stats.expiredCandidates} expired`, color: '#16a34a', bg: '#f0fdf4' },
          { Icon: TrendingUp, label: 'Conversion Rate', value: `${conversionRate}%`,      sub: `${stats.approvedApplications} approved`, color: '#f97316', bg: '#fff7ed' },
          { Icon: Clock,    label: 'Pending Review',   value: stats.pendingApplications, sub: 'Need action', color: '#a16207', bg: '#fef9c3' },
        ].map(({ Icon, label, value, sub, color, bg }) => (
          <div key={label} style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: '14px', padding: '20px', boxShadow: '0 1px 3px rgba(0,0,0,.04)' }}>
            <div style={{ width: '36px', height: '36px', borderRadius: '10px', background: bg, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '14px' }}>
              <Icon size={16} color={color} />
            </div>
            <div style={{ fontSize: '24px', fontWeight: 900, color: '#0b0d20', lineHeight: 1, marginBottom: '4px' }}>{value}</div>
            <div style={{ fontSize: '12px', fontWeight: 600, color: '#374151', marginBottom: '2px' }}>{label}</div>
            <div style={{ fontSize: '11px', color: '#94a3b8' }}>{sub}</div>
          </div>
        ))}
      </div>

      <div className="adm-grid-2" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px', marginBottom: '24px' }}>

        {/* Application Funnel */}
        <div style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: '16px', padding: '24px' }}>
          <div style={{ fontSize: '14px', fontWeight: 700, color: '#0b0d20', marginBottom: '20px' }}>Application Funnel</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            {[
              { label: 'Total Received', value: stats.totalApplications, Icon: FileText, color: '#2145fb' },
              { label: 'Pending Review', value: stats.pendingApplications, Icon: AlertCircle, color: '#a16207' },
              { label: 'Approved', value: stats.approvedApplications, Icon: CheckCircle2, color: '#16a34a' },
              { label: 'Rejected', value: stats.rejectedApplications, Icon: XCircle, color: '#dc2626' },
            ].map(({ label, value, Icon, color }) => {
              const pct = stats.totalApplications > 0 ? Math.round((value / stats.totalApplications) * 100) : 0;
              return (
                <div key={label}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <Icon size={13} color={color} />
                      <span style={{ fontSize: '13px', color: '#374151', fontWeight: 500 }}>{label}</span>
                    </div>
                    <span style={{ fontSize: '13px', fontWeight: 700, color: '#0b0d20' }}>{value} <span style={{ fontWeight: 400, color: '#94a3b8', fontSize: '11px' }}>({pct}%)</span></span>
                  </div>
                  <div style={{ height: '6px', background: '#f1f5f9', borderRadius: 999 }}>
                    <div style={{ height: '100%', width: `${pct}%`, background: color, borderRadius: 999, transition: 'width 0.5s ease' }} />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Candidate Status + Content */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: '16px', padding: '24px' }}>
            <div style={{ fontSize: '14px', fontWeight: 700, color: '#0b0d20', marginBottom: '16px' }}>Candidate Status</div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '12px' }}>
              {[
                { label: 'Active', value: stats.activeCandidates, color: '#16a34a', bg: '#f0fdf4' },
                { label: 'Expired', value: stats.expiredCandidates, color: '#64748b', bg: '#f1f5f9' },
                { label: 'Suspended', value: stats.suspendedCandidates, color: '#be185d', bg: '#fce7f3' },
              ].map(s => (
                <div key={s.label} style={{ background: s.bg, borderRadius: '10px', padding: '14px', textAlign: 'center' }}>
                  <div style={{ fontSize: '22px', fontWeight: 900, color: s.color }}>{s.value}</div>
                  <div style={{ fontSize: '11px', color: s.color, fontWeight: 600, marginTop: '2px' }}>{s.label}</div>
                </div>
              ))}
            </div>
          </div>

          <div style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: '16px', padding: '24px' }}>
            <div style={{ fontSize: '14px', fontWeight: 700, color: '#0b0d20', marginBottom: '16px' }}>Content & Platform</div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
              {[
                { Icon: Briefcase, label: 'Live Vacancies', value: stats.activeVacancies, color: '#7c3aed', bg: '#faf5ff' },
                { Icon: BookOpen, label: 'Active Courses', value: stats.activeCourses, color: '#f97316', bg: '#fff7ed' },
                { Icon: TrendingUp, label: 'Last 30 Days', value: stats.last30DaysApps, color: '#2145fb', bg: '#eff6ff' },
                { Icon: TrendingUp, label: 'Last 7 Days', value: stats.last7DaysApps, color: '#16a34a', bg: '#f0fdf4' },
              ].map(({ Icon, label, value, color, bg }) => (
                <div key={label} style={{ background: bg, borderRadius: '10px', padding: '14px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <Icon size={16} color={color} />
                  <div>
                    <div style={{ fontSize: '18px', fontWeight: 900, color }}>{value}</div>
                    <div style={{ fontSize: '10px', color, fontWeight: 600, opacity: 0.7 }}>{label}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* By Programme */}
      {stats.byProgramme.length > 0 && (
        <div style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: '16px', padding: '24px', marginBottom: '24px' }}>
          <div style={{ fontSize: '14px', fontWeight: 700, color: '#0b0d20', marginBottom: '20px' }}>Applications by Programme</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {stats.byProgramme.map(p => {
              const pct = stats.totalApplications > 0 ? Math.round((p.count / stats.totalApplications) * 100) : 0;
              return (
                <div key={p.name}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px' }}>
                    <span style={{ fontSize: '13px', color: '#374151', fontWeight: 500 }}>{p.name}</span>
                    <span style={{ fontSize: '13px', fontWeight: 700, color: '#0b0d20' }}>{p.count}</span>
                  </div>
                  <div style={{ height: '6px', background: '#f1f5f9', borderRadius: 999 }}>
                    <div style={{ height: '100%', width: `${pct}%`, background: '#2145fb', borderRadius: 999 }} />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Recent Applications */}
      <div style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: '16px', padding: '24px' }}>
        <div style={{ fontSize: '14px', fontWeight: 700, color: '#0b0d20', marginBottom: '20px' }}>Recent Applications</div>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px' }}>
            <thead>
              <tr style={{ borderBottom: '2px solid #f1f5f9' }}>
                {['Name', 'Email', 'Programme', 'Status', 'Date'].map(h => (
                  <th key={h} style={{ textAlign: 'left', padding: '8px 12px', fontSize: '11px', fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.4px' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {stats.recentApplications.map(a => (
                <tr key={a.id} style={{ borderBottom: '1px solid #f8faff' }}>
                  <td style={{ padding: '10px 12px', fontWeight: 600, color: '#0b0d20' }}>{a.name}</td>
                  <td style={{ padding: '10px 12px', color: '#64748b' }}>{a.email}</td>
                  <td style={{ padding: '10px 12px', color: '#374151' }}>{a.programme.name}</td>
                  <td style={{ padding: '10px 12px' }}><Badge status={a.status} /></td>
                  <td style={{ padding: '10px 12px', color: '#94a3b8', fontSize: '12px' }}>{new Date(a.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
