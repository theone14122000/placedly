'use client';
import { useState, useEffect } from 'react';
import { Inbox, Search, RefreshCw, Trash2, ExternalLink, Clock } from 'lucide-react';

type App = {
  id: string; name: string; email: string; phone: string | null;
  experience: string | null; noticePeriod: string | null; education: string | null;
  currentCtc: string | null; expectedCtc: string | null; skills: string | null;
  usShift: string | null; resumeUrl: string | null; status: string; createdAt: string;
  vacancy: { id: string; title: string; company: string };
};

const STATUSES = ['NEW', 'REVIEWING', 'SHORTLISTED', 'REJECTED', 'PLACED'];

const STATUS_COLORS: Record<string, { bg: string; color: string }> = {
  NEW:        { bg: '#eff6ff', color: '#2145fb' },
  REVIEWING:  { bg: '#fff7ed', color: '#f97316' },
  SHORTLISTED:{ bg: '#f0fdf4', color: '#16a34a' },
  REJECTED:   { bg: '#fef2f2', color: '#ef4444' },
  PLACED:     { bg: '#faf5ff', color: '#7c3aed' },
};

const inp: React.CSSProperties = { padding: '6px 10px', border: '1.5px solid #e2e8f0', borderRadius: '8px', fontSize: '12px', fontFamily: "'Poppins',sans-serif", color: '#0b0d20', background: '#f8faff', outline: 'none', cursor: 'pointer' };

export default function AdminVacancyApplications() {
  const [apps, setApps] = useState<App[]>([]);
  const [q, setQ] = useState('');
  const [loading, setLoading] = useState(true);
  const [busy, setBusy] = useState<string | null>(null);

  const load = async () => {
    setLoading(true);
    const d = await fetch('/api/admin/vacancy-applications').then(r => r.json()).catch(() => null);
    if (d) setApps(d);
    setLoading(false);
  };

  useEffect(() => { load(); }, []);

  const updateStatus = async (id: string, status: string) => {
    setBusy(id);
    await fetch('/api/admin/vacancy-applications', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id, status }),
    });
    await load();
    setBusy(null);
  };

  const remove = async (id: string) => {
    if (!confirm('Delete this application?')) return;
    await fetch('/api/admin/vacancy-applications', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id }),
    });
    await load();
  };

  const filtered = apps.filter(a =>
    !q ||
    a.name.toLowerCase().includes(q.toLowerCase()) ||
    a.email.toLowerCase().includes(q.toLowerCase()) ||
    (a.vacancy.title.toLowerCase().includes(q.toLowerCase())) ||
    (a.vacancy.company.toLowerCase().includes(q.toLowerCase()))
  );

  return (
    <div style={{ padding: 'clamp(14px,4vw,32px)', fontFamily: "'Poppins',sans-serif" }}>
      <div style={{ marginBottom: '24px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '12px' }}>
        <div>
          <h1 style={{ fontSize: '22px', fontWeight: 900, color: '#0b0d20', marginBottom: '4px' }}>Vacancy Applications</h1>
          <p style={{ fontSize: '13px', color: '#64748b' }}>Applications submitted by candidates against posted vacancies.</p>
        </div>
        <button onClick={load} style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '9px 16px', background: '#f1f5f9', border: 'none', borderRadius: '9px', fontSize: '13px', cursor: 'pointer', fontFamily: "'Poppins',sans-serif", color: '#374151' }}>
          <RefreshCw size={13} /> Refresh
        </button>
      </div>

      {/* Stats */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: '14px', marginBottom: '20px' }}>
        {[
          { label: 'Total Applications', value: apps.length, color: '#2145fb', bg: '#eff6ff' },
          { label: 'New', value: apps.filter(a => a.status === 'NEW').length, color: '#f97316', bg: '#fff7ed' },
          { label: 'Shortlisted', value: apps.filter(a => a.status === 'SHORTLISTED').length, color: '#16a34a', bg: '#f0fdf4' },
          { label: 'Placed', value: apps.filter(a => a.status === 'PLACED').length, color: '#7c3aed', bg: '#faf5ff' },
        ].map(s => (
          <div key={s.label} style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: '12px', padding: '16px 18px', display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{ width: '38px', height: '38px', borderRadius: '10px', background: s.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <Inbox size={16} color={s.color} />
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
        <input value={q} onChange={e => setQ(e.target.value)} placeholder="Search by name, email, role or company…"
          style={{ border: 'none', background: 'none', outline: 'none', fontSize: 13, fontFamily: "'Poppins',sans-serif", color: '#0b0d20', width: '100%' }} />
      </div>

      {/* Table */}
      <div style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: '16px', overflow: 'auto' }}>
        {loading ? (
          <div style={{ textAlign: 'center', padding: '48px', color: '#94a3b8' }}>Loading…</div>
        ) : filtered.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '48px', color: '#94a3b8', fontSize: '14px' }}>No applications yet. Applications appear here when candidates apply to posted vacancies.</div>
        ) : (
          <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: '980px' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid #e2e8f0', background: '#f8faff' }}>
                {['Candidate', 'Vacancy', 'Experience', 'CTC', 'Status', 'Received', 'Actions'].map(h => (
                  <th key={h} style={{ padding: '12px 16px', textAlign: 'left', fontSize: '10px', fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.5px', whiteSpace: 'nowrap' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map((app, i) => {
                const sc = STATUS_COLORS[app.status] ?? { bg: '#f1f5f9', color: '#475569' };
                return (
                  <tr key={app.id} style={{ borderBottom: i < filtered.length - 1 ? '1px solid #f1f5f9' : 'none' }}>
                    <td style={{ padding: '12px 16px' }}>
                      <div style={{ fontSize: '13px', fontWeight: 700, color: '#0b0d20' }}>{app.name}</div>
                      <div style={{ fontSize: '11px', color: '#94a3b8' }}>{app.email}{app.phone ? ` · ${app.phone}` : ''}</div>
                    </td>
                    <td style={{ padding: '12px 16px' }}>
                      <div style={{ fontSize: '13px', fontWeight: 600, color: '#0b0d20' }}>{app.vacancy.title}</div>
                      <div style={{ fontSize: '11px', color: '#94a3b8' }}>{app.vacancy.company}</div>
                    </td>
                    <td style={{ padding: '12px 16px', fontSize: '12px', color: '#374151' }}>
                      <div>{app.experience || '—'}</div>
                      <div style={{ fontSize: '11px', color: '#94a3b8' }}>{app.noticePeriod ? `${app.noticePeriod} notice` : ''}{app.education ? ` · ${app.education}` : ''}</div>
                    </td>
                    <td style={{ padding: '12px 16px', fontSize: '12px', color: '#374151' }}>
                      {app.currentCtc ? <div>{app.currentCtc} → {app.expectedCtc}</div> : <div>{app.expectedCtc || '—'}</div>}
                      {app.usShift && <div style={{ fontSize: '11px', color: '#94a3b8' }}>{app.usShift === 'Yes' ? 'Open to US shift' : 'Not open to US shift'}</div>}
                    </td>
                    <td style={{ padding: '12px 16px' }}>
                      <span style={{ fontSize: '11px', fontWeight: 700, padding: '3px 10px', borderRadius: '999px', background: sc.bg, color: sc.color }}>{app.status}</span>
                    </td>
                    <td style={{ padding: '12px 16px' }}>
                      <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', fontSize: '11px', color: '#94a3b8' }}>
                        <Clock size={11} /> {new Date(app.createdAt).toLocaleDateString()}
                      </span>
                    </td>
                    <td style={{ padding: '12px 16px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <select
                          value={app.status}
                          onChange={e => updateStatus(app.id, e.target.value)}
                          disabled={busy === app.id}
                          style={{ ...inp, width: '130px', cursor: busy === app.id ? 'wait' : 'pointer' }}
                        >
                          {STATUSES.map(s => <option key={s} value={s}>{s}</option>)}
                        </select>
                        {app.resumeUrl && (
                          <a href={app.resumeUrl} target="_blank" rel="noopener noreferrer" title="View resume"
                            style={{ display: 'inline-flex', padding: '6px', background: '#eff6ff', borderRadius: '7px', color: '#2145fb' }}>
                            <ExternalLink size={13} />
                          </a>
                        )}
                        <button onClick={() => remove(app.id)} title="Delete"
                          style={{ display: 'inline-flex', padding: '6px', background: '#fef2f2', borderRadius: '7px', color: '#ef4444', border: 'none', cursor: 'pointer' }}>
                          <Trash2 size={13} />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>

      <div style={{ marginTop: '14px', fontSize: '12px', color: '#94a3b8' }}>
        Candidates can apply directly from the public and candidate portals. Use the status dropdown to track progress through to placement.
      </div>
    </div>
  );
}
