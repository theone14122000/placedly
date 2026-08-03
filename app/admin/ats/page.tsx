'use client';
import { useState, useEffect } from 'react';
import { Users, Search, RefreshCw, UserCog } from 'lucide-react';

type App = {
  id: string; name: string; email: string; phone: string; role: string;
  experience: string | null; currentStage: string; currentStatus: string;
  recruiter: { id: string; name: string } | null; createdAt: string;
};
type Recruiter = { id: string; name: string; email: string };

const inp: React.CSSProperties = { width: '100%', padding: '8px 10px', border: '1.5px solid #e2e8f0', borderRadius: '8px', fontSize: '12px', fontFamily: "'Poppins',sans-serif", color: '#0b0d20', background: '#f8faff', outline: 'none', boxSizing: 'border-box' as const };

export default function AdminATS() {
  const [apps, setApps] = useState<App[]>([]);
  const [recruiters, setRecruiters] = useState<Recruiter[]>([]);
  const [q, setQ] = useState('');
  const [loading, setLoading] = useState(true);
  const [busy, setBusy] = useState<string | null>(null);
  const [saved, setSaved] = useState<string | null>(null);

  const load = async () => {
    setLoading(true);
    const d = await fetch('/api/admin/ats').then(r => r.json()).catch(() => null);
    if (d) { setApps(d.apps ?? []); setRecruiters(d.recruiters ?? []); }
    setLoading(false);
  };

  useEffect(() => { load(); }, []);

  const reassign = async (id: string, recruiterId: string) => {
    setBusy(id);
    setSaved(null);
    await fetch('/api/admin/ats', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id, recruiterId: recruiterId || null }),
    });
    await load();
    setSaved(id);
    setBusy(null);
    setTimeout(() => setSaved(null), 2000);
  };

  const filtered = apps.filter(a =>
    !q || a.name.toLowerCase().includes(q.toLowerCase()) || a.email.toLowerCase().includes(q.toLowerCase()) || a.phone.includes(q)
  );

  const currentRecruiterName = (app: App) => app.recruiter?.name ?? 'Unassigned';

  return (
    <div style={{ padding: 'clamp(14px,4vw,32px)', fontFamily: "'Poppins',sans-serif" }}>
      <div style={{ marginBottom: '24px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '12px' }}>
        <div>
          <h1 style={{ fontSize: '22px', fontWeight: 900, color: '#0b0d20', marginBottom: '4px' }}>Recruiter ATS — Applications</h1>
          <p style={{ fontSize: '13px', color: '#64748b' }}>View all job applications and assign or move candidates between recruiters.</p>
        </div>
        <button onClick={load} style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '9px 16px', background: '#f1f5f9', border: 'none', borderRadius: '9px', fontSize: '13px', cursor: 'pointer', fontFamily: "'Poppins',sans-serif", color: '#374151' }}>
          <RefreshCw size={13} /> Refresh
        </button>
      </div>

      {/* Stats */}
      <div className="adm-stats-4" style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: '14px', marginBottom: '20px' }}>
        {[
          { label: 'Total Applications', value: apps.length, color: '#2145fb', bg: '#eff6ff' },
          { label: 'Assigned', value: apps.filter(a => a.recruiter).length, color: '#16a34a', bg: '#f0fdf4' },
          { label: 'Unassigned', value: apps.filter(a => !a.recruiter).length, color: '#f97316', bg: '#fff7ed' },
          { label: 'Active Recruiters', value: recruiters.length, color: '#7c3aed', bg: '#faf5ff' },
        ].map(s => (
          <div key={s.label} style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: '12px', padding: '16px 18px', display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{ width: '38px', height: '38px', borderRadius: '10px', background: s.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <Users size={16} color={s.color} />
            </div>
            <div>
              <div style={{ fontSize: '22px', fontWeight: 900, color: '#0b0d20', lineHeight: 1 }}>{s.value}</div>
              <div style={{ fontSize: '11px', color: '#94a3b8', marginTop: '2px' }}>{s.label}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Search */}
      <div style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: '12px', padding: '12px 16px', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
        <Search size={14} color="#94a3b8" />
        <input value={q} onChange={e => setQ(e.target.value)} placeholder="Search by name, email or phone…"
          style={{ border: 'none', background: 'none', outline: 'none', fontSize: 13, fontFamily: "'Poppins',sans-serif", color: '#0b0d20', width: '100%' }} />
      </div>

      {/* Table */}
      <div style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: '16px', overflow: 'auto' }}>
        {loading ? (
          <div style={{ textAlign: 'center', padding: '48px', color: '#94a3b8' }}>Loading…</div>
        ) : filtered.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '48px', color: '#94a3b8', fontSize: '14px' }}>No applications found.</div>
        ) : (
          <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: '760px' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid #e2e8f0', background: '#f8faff' }}>
                {['Candidate', 'Role', 'Stage', 'Status', 'Assigned Recruiter', 'Actions'].map(h => (
                  <th key={h} style={{ padding: '12px 16px', textAlign: 'left', fontSize: '10px', fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.5px', whiteSpace: 'nowrap' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map((app, i) => (
                <tr key={app.id} style={{ borderBottom: i < filtered.length - 1 ? '1px solid #f1f5f9' : 'none' }}>
                  <td style={{ padding: '12px 16px' }}>
                    <div style={{ fontSize: '13px', fontWeight: 700, color: '#0b0d20' }}>{app.name}</div>
                    <div style={{ fontSize: '11px', color: '#94a3b8' }}>{app.email} · {app.phone}{app.experience ? ` · ${app.experience}` : ''}</div>
                  </td>
                  <td style={{ padding: '12px 16px' }}>
                    <span style={{ fontSize: '11px', fontWeight: 700, padding: '3px 10px', borderRadius: '999px', background: app.role === 'AP' ? '#dbeafe' : '#fef3c7', color: app.role === 'AP' ? '#1e40af' : '#92400e' }}>{app.role}</span>
                  </td>
                  <td style={{ padding: '12px 16px', fontSize: '12px', color: '#374151' }}>{app.currentStage.replace(/_/g, ' ')}</td>
                  <td style={{ padding: '12px 16px', fontSize: '12px', color: '#64748b' }}>{app.currentStatus.replace(/_/g, ' ')}</td>
                  <td style={{ padding: '12px 16px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px', fontWeight: 600, color: app.recruiter ? '#374151' : '#f97316' }}>
                      <UserCog size={12} color="#94a3b8" />
                      {currentRecruiterName(app)}
                    </div>
                  </td>
                  <td style={{ padding: '12px 16px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <select
                        value={app.recruiter?.id ?? ''}
                        onChange={e => reassign(app.id, e.target.value)}
                        disabled={busy === app.id}
                        style={{ ...inp, width: '160px', cursor: busy === app.id ? 'wait' : 'pointer' }}
                      >
                        <option value="">— Unassigned —</option>
                        {recruiters.map(r => (
                          <option key={r.id} value={r.id}>{r.name}</option>
                        ))}
                      </select>
                      {saved === app.id && <span style={{ fontSize: '11px', fontWeight: 700, color: '#16a34a', whiteSpace: 'nowrap' }}>Saved ✓</span>}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      <div style={{ marginTop: '14px', fontSize: '12px', color: '#94a3b8' }}>
        Recruiters can only see candidates assigned to them. Use this page to move candidates between recruiters.
      </div>
    </div>
  );
}