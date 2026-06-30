'use client';
import { useEffect, useState } from 'react';
import { CheckCircle2, XCircle, RefreshCw, Clock, ChevronDown, KeyRound } from 'lucide-react';

type Application = {
  id: string;
  name: string;
  email: string;
  phone: string;
  city: string;
  experience: string;
  currentRole: string | null;
  targetRole: string;
  message: string | null;
  status: 'PENDING' | 'APPROVED' | 'REJECTED';
  createdAt: string;
  programme: { name: string; cycleDays: number };
  candidate: { id: string; status: string; validUntil: string } | null;
};

const STATUS_TABS = ['ALL', 'PENDING', 'APPROVED', 'REJECTED'] as const;

const badge = (s: string) => {
  const map: Record<string, { bg: string; color: string }> = {
    PENDING:  { bg: '#fef9c3', color: '#854d0e' },
    APPROVED: { bg: '#dcfce7', color: '#166534' },
    REJECTED: { bg: '#fee2e2', color: '#991b1b' },
    ACTIVE:   { bg: '#dbeafe', color: '#1e40af' },
    EXPIRED:  { bg: '#f1f5f9', color: '#475569' },
  };
  const c = map[s] ?? { bg: '#f1f5f9', color: '#475569' };
  return (
    <span style={{ padding: '3px 10px', borderRadius: '999px', fontSize: '11px', fontWeight: 700,
      background: c.bg, color: c.color, whiteSpace: 'nowrap' as const }}>
      {s}
    </span>
  );
};

export default function ApplicationsPage() {
  const [tab, setTab] = useState<typeof STATUS_TABS[number]>('PENDING');
  const [apps, setApps] = useState<Application[]>([]);
  const [loading, setLoading] = useState(true);
  const [busy, setBusy] = useState<string | null>(null);
  const [expanded, setExpanded] = useState<string | null>(null);

  const fetchApps = async () => {
    setLoading(true);
    const r = await fetch(`/api/admin/applications${tab !== 'ALL' ? `?status=${tab}` : ''}`);
    setApps(await r.json());
    setLoading(false);
  };

  useEffect(() => { fetchApps(); }, [tab]);

  const approve = async (id: string) => {
    setBusy(id + '-approve');
    const r = await fetch('/api/admin/approve', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ applicationId: id }) });
    const data = await r.json();
    if (r.ok) {
      alert(`✅ Approved!\n\nEmail: ${data.email}\nPassword: ${data.password}\n\nAccess until ${new Date(data.validUntil).toLocaleDateString('en-IN')}\n\nThis password has also been emailed to the candidate.`);
      fetchApps();
    } else alert('Error: ' + data.error);
    setBusy(null);
  };

  const reject = async (id: string) => {
    if (!confirm('Reject this application? A rejection email will be sent.')) return;
    setBusy(id + '-reject');
    const r = await fetch('/api/admin/reject', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ applicationId: id }) });
    const data = await r.json();
    if (r.ok) fetchApps(); else alert('Error: ' + data.error);
    setBusy(null);
  };

  const renew = async (candidateId: string) => {
    setBusy(candidateId + '-renew');
    const r = await fetch('/api/admin/renew', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ candidateId }) });
    const data = await r.json();
    if (r.ok) { alert(`✅ Renewed until ${new Date(data.validUntil).toLocaleDateString('en-IN')}`); fetchApps(); }
    else alert('Error: ' + data.error);
    setBusy(null);
  };

  const resetPassword = async (candidateId: string) => {
    if (!confirm('Reset this candidate\'s password? A new password will be emailed to them.')) return;
    setBusy(candidateId + '-reset');
    const r = await fetch('/api/admin/reset-password', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ candidateId }) });
    const data = await r.json();
    if (r.ok) alert(`✅ Password reset!\n\nEmail: ${data.email}\nNew Password: ${data.password}\n\nAlso emailed to the candidate.`);
    else alert('Error: ' + data.error);
    setBusy(null);
  };

  return (
    <div style={{ padding: '32px', fontFamily: "'Poppins',sans-serif" }}>
      <div style={{ marginBottom: '28px' }}>
        <h1 style={{ fontSize: '22px', fontWeight: 900, color: '#0b0d20', marginBottom: '4px' }}>CAP Applications</h1>
        <p style={{ fontSize: '14px', color: '#64748b' }}>Review, approve, reject, and renew candidate access.</p>
      </div>

      {/* Tabs */}
      <div style={{ display: 'flex', gap: '8px', marginBottom: '24px', flexWrap: 'wrap' as const }}>
        {STATUS_TABS.map(t => (
          <button key={t} onClick={() => setTab(t)} style={{
            padding: '7px 18px', borderRadius: '8px', fontSize: '13px', fontWeight: 600,
            border: tab === t ? '2px solid #2145fb' : '2px solid #e2e8f0',
            background: tab === t ? '#eff6ff' : '#fff', color: tab === t ? '#2145fb' : '#64748b',
            cursor: 'pointer', fontFamily: "'Poppins',sans-serif",
          }}>{t}</button>
        ))}
      </div>

      {loading ? (
        <div style={{ color: '#64748b', fontSize: '14px' }}>Loading…</div>
      ) : apps.length === 0 ? (
        <div style={{ color: '#94a3b8', fontSize: '14px', padding: '40px 0', textAlign: 'center' as const }}>No applications found.</div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {apps.map(app => (
            <div key={app.id} style={{ background: '#fff', border: '1px solid #eef0f6', borderRadius: '14px', overflow: 'hidden' }}>
              {/* Row */}
              <div style={{ padding: '16px 20px', display: 'flex', alignItems: 'center', gap: '16px', flexWrap: 'wrap' as const }}>
                <div style={{ flex: 1, minWidth: '200px' }}>
                  <div style={{ fontSize: '15px', fontWeight: 700, color: '#0b0d20', marginBottom: '2px' }}>{app.name}</div>
                  <div style={{ fontSize: '13px', color: '#64748b' }}>{app.email} · {app.phone}</div>
                  <div style={{ fontSize: '12px', color: '#94a3b8', marginTop: '2px' }}>{app.programme.name} · {app.programme.cycleDays}d cycle</div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' as const }}>
                  {badge(app.status)}
                  {app.candidate && badge(app.candidate.status)}
                  {app.status === 'PENDING' && (
                    <>
                      <button onClick={() => approve(app.id)} disabled={!!busy} style={btnStyle('#16a34a')}>
                        {busy === app.id + '-approve' ? '…' : <><CheckCircle2 size={13} /> Approve</>}
                      </button>
                      <button onClick={() => reject(app.id)} disabled={!!busy} style={btnStyle('#dc2626')}>
                        {busy === app.id + '-reject' ? '…' : <><XCircle size={13} /> Reject</>}
                      </button>
                    </>
                  )}
                  {app.candidate && (app.candidate.status === 'EXPIRED' || app.candidate.status === 'ACTIVE') && (
                    <button onClick={() => renew(app.candidate!.id)} disabled={!!busy} style={btnStyle('#2145fb')}>
                      {busy === app.candidate.id + '-renew' ? '…' : <><RefreshCw size={13} /> Renew</>}
                    </button>
                  )}
                  {app.candidate && (
                    <button onClick={() => resetPassword(app.candidate!.id)} disabled={!!busy} style={btnStyle('#7c3aed')}>
                      {busy === app.candidate.id + '-reset' ? '…' : <><KeyRound size={13} /> Reset PW</>}
                    </button>
                  )}
                  <button onClick={() => setExpanded(expanded === app.id ? null : app.id)} style={btnStyle('#64748b', true)}>
                    <ChevronDown size={13} style={{ transform: expanded === app.id ? 'rotate(180deg)' : 'none', transition: '0.2s' }} />
                  </button>
                </div>
              </div>

              {/* Expanded details */}
              {expanded === app.id && (
                <div style={{ borderTop: '1px solid #f1f5f9', padding: '16px 20px', background: '#f8faff', display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(200px,1fr))', gap: '12px' }}>
                  {[
                    ['City', app.city],
                    ['Experience', app.experience],
                    ['Current Role', app.currentRole || '—'],
                    ['Target Role', app.targetRole],
                    ['Applied', new Date(app.createdAt).toLocaleDateString('en-IN')],
                    ...(app.candidate ? [['Access Until', new Date(app.candidate.validUntil).toLocaleDateString('en-IN')]] : []),
                  ].map(([label, value]) => (
                    <div key={label}>
                      <div style={{ fontSize: '10px', fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase' as const, letterSpacing: '0.5px', marginBottom: '2px' }}>{label}</div>
                      <div style={{ fontSize: '13px', color: '#1e293b', fontWeight: 500 }}>{value}</div>
                    </div>
                  ))}
                  {app.message && (
                    <div style={{ gridColumn: '1 / -1' }}>
                      <div style={{ fontSize: '10px', fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase' as const, letterSpacing: '0.5px', marginBottom: '4px' }}>Message</div>
                      <div style={{ fontSize: '13px', color: '#475569', lineHeight: 1.6 }}>{app.message}</div>
                    </div>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

const btnStyle = (color: string, ghost = false): React.CSSProperties => ({
  display: 'inline-flex', alignItems: 'center', gap: '5px',
  padding: '6px 13px', borderRadius: '8px', fontSize: '12px', fontWeight: 700,
  border: `1.5px solid ${ghost ? '#e2e8f0' : color}`,
  background: ghost ? '#fff' : color + '15',
  color: ghost ? '#64748b' : color,
  cursor: 'pointer', fontFamily: "'Poppins',sans-serif",
});
