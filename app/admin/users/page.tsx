'use client';
import { useState, useEffect } from 'react';
import { Users, Search, CheckCircle2, XCircle, Clock, Mail, Phone, RefreshCw } from 'lucide-react';

type Candidate = {
  id: string; name: string; email: string; phone: string;
  status: 'ACTIVE' | 'EXPIRED' | 'SUSPENDED';
  approvedAt: string; validUntil: string; lastLoginAt: string | null;
  application: { programme: { name: string; cycleDays: number } };
};

const STATUS_STYLE: Record<string, { color: string; bg: string; label: string }> = {
  ACTIVE:    { color: '#16a34a', bg: '#f0fdf4', label: 'Active' },
  EXPIRED:   { color: '#f97316', bg: '#fff7ed', label: 'Expired' },
  SUSPENDED: { color: '#ef4444', bg: '#fef2f2', label: 'Suspended' },
};

const inp: React.CSSProperties = { width: '100%', padding: '9px 12px 9px 36px', border: '1.5px solid #e2e8f0', borderRadius: '8px', fontSize: '13px', fontFamily: "'Poppins',sans-serif", color: '#0b0d20', background: '#f8faff', outline: 'none', boxSizing: 'border-box' as const };

export default function AdminUsersPage() {
  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<'ALL' | 'ACTIVE' | 'EXPIRED' | 'SUSPENDED'>('ALL');
  const [loading, setLoading] = useState(true);
  const [actionId, setActionId] = useState<string | null>(null);

  const load = async () => {
    setLoading(true);
    const data = await fetch('/api/admin/users').then(r => r.json()).catch(() => []);
    setCandidates(Array.isArray(data) ? data : []);
    setLoading(false);
  };

  useEffect(() => { load(); }, []);

  const setStatus = async (id: string, status: string) => {
    setActionId(id);
    await fetch('/api/admin/users', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id, status }),
    });
    await load();
    setActionId(null);
  };

  const filtered = candidates.filter(c => {
    const matchSearch = c.name.toLowerCase().includes(search.toLowerCase()) || c.email.toLowerCase().includes(search.toLowerCase());
    const matchStatus = statusFilter === 'ALL' || c.status === statusFilter;
    return matchSearch && matchStatus;
  });

  const counts = { ALL: candidates.length, ACTIVE: candidates.filter(c => c.status === 'ACTIVE').length, EXPIRED: candidates.filter(c => c.status === 'EXPIRED').length, SUSPENDED: candidates.filter(c => c.status === 'SUSPENDED').length };

  return (
    <div className="adm-page" style={{ padding: '32px', fontFamily: "'Poppins',sans-serif" }}>
      <div style={{ marginBottom: '28px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div>
          <h1 style={{ fontSize: '22px', fontWeight: 900, color: '#0b0d20', marginBottom: '3px' }}>Candidate Accounts</h1>
          <p style={{ fontSize: '13px', color: '#64748b' }}>Manage portal access for approved candidates.</p>
        </div>
        <button onClick={load} style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '9px 16px', background: '#f1f5f9', border: 'none', borderRadius: '9px', fontSize: '13px', cursor: 'pointer', fontFamily: "'Poppins',sans-serif", color: '#374151' }}>
          <RefreshCw size={13} /> Refresh
        </button>
      </div>

      {/* Stats */}
      <div className="adm-stats-4" style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: '14px', marginBottom: '24px' }}>
        {[
          { Icon: Users,        label: 'Total Candidates', value: counts.ALL,       color: '#2145fb', bg: '#eff6ff' },
          { Icon: CheckCircle2, label: 'Active',           value: counts.ACTIVE,    color: '#16a34a', bg: '#f0fdf4' },
          { Icon: Clock,        label: 'Expired',          value: counts.EXPIRED,   color: '#f97316', bg: '#fff7ed' },
          { Icon: XCircle,      label: 'Suspended',        value: counts.SUSPENDED, color: '#ef4444', bg: '#fef2f2' },
        ].map(s => (
          <div key={s.label} style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: '12px', padding: '16px 18px', display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{ width: '38px', height: '38px', borderRadius: '10px', background: s.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <s.Icon size={16} color={s.color} />
            </div>
            <div>
              <div style={{ fontSize: '22px', fontWeight: 900, color: '#0b0d20', lineHeight: 1 }}>{s.value}</div>
              <div style={{ fontSize: '11px', color: '#94a3b8', marginTop: '2px' }}>{s.label}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: '14px', padding: '14px 18px', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap' }}>
        <div style={{ flex: 1, minWidth: '200px', position: 'relative' }}>
          <Search size={14} color="#94a3b8" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }} />
          <input style={inp} placeholder="Search by name or email…" value={search} onChange={e => setSearch(e.target.value)} />
        </div>
        <div style={{ display: 'flex', gap: '6px' }}>
          {(['ALL', 'ACTIVE', 'EXPIRED', 'SUSPENDED'] as const).map(s => (
            <button key={s} onClick={() => setStatusFilter(s)} style={{ padding: '7px 14px', borderRadius: '8px', border: '1.5px solid', cursor: 'pointer', fontFamily: "'Poppins',sans-serif", fontSize: '12px', fontWeight: 600, background: statusFilter === s ? '#0b0d20' : '#fff', borderColor: statusFilter === s ? '#0b0d20' : '#e2e8f0', color: statusFilter === s ? '#fff' : '#64748b' }}>
              {s === 'ALL' ? 'All' : STATUS_STYLE[s].label}
            </button>
          ))}
        </div>
      </div>

      {/* Table */}
      <div style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: '16px', overflow: 'auto' }}>
        {loading ? (
          <div style={{ textAlign: 'center', padding: '48px', color: '#94a3b8' }}>Loading…</div>
        ) : (
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid #e2e8f0', background: '#f8faff' }}>
                {['Candidate', 'Contact', 'Programme', 'Status', 'Access Until', 'Last Login', 'Actions'].map(h => (
                  <th key={h} style={{ padding: '12px 16px', textAlign: 'left', fontSize: '10px', fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.5px', whiteSpace: 'nowrap' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 ? (
                <tr><td colSpan={7} style={{ textAlign: 'center', padding: '48px', color: '#94a3b8', fontSize: '14px' }}>No candidates found.</td></tr>
              ) : filtered.map((c, i) => {
                const ss = STATUS_STYLE[c.status];
                const isExpired = new Date(c.validUntil) < new Date();
                return (
                  <tr key={c.id} style={{ borderBottom: i < filtered.length - 1 ? '1px solid #f1f5f9' : 'none' }}>
                    <td style={{ padding: '14px 16px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <div style={{ width: '34px', height: '34px', borderRadius: '50%', background: '#2145fb', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '13px', fontWeight: 700, color: '#fff', flexShrink: 0 }}>{c.name[0]}</div>
                        <div style={{ fontSize: '13px', fontWeight: 600, color: '#0b0d20' }}>{c.name}</div>
                      </div>
                    </td>
                    <td style={{ padding: '14px 16px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '5px', marginBottom: '3px' }}><Mail size={11} color="#94a3b8" /><span style={{ fontSize: '12px', color: '#374151' }}>{c.email}</span></div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}><Phone size={11} color="#94a3b8" /><span style={{ fontSize: '12px', color: '#64748b' }}>{c.phone}</span></div>
                    </td>
                    <td style={{ padding: '14px 16px' }}>
                      <div style={{ fontSize: '12px', fontWeight: 600, color: '#374151' }}>{c.application?.programme?.name || '—'}</div>
                      <div style={{ fontSize: '11px', color: '#94a3b8' }}>{c.application?.programme?.cycleDays}d cycle</div>
                    </td>
                    <td style={{ padding: '14px 16px' }}>
                      <span style={{ fontSize: '11px', fontWeight: 700, padding: '3px 10px', borderRadius: 999, background: ss.bg, color: ss.color }}>{ss.label}</span>
                    </td>
                    <td style={{ padding: '14px 16px' }}>
                      <span style={{ fontSize: '12px', color: isExpired ? '#ef4444' : '#374151', fontWeight: isExpired ? 600 : 400 }}>
                        {new Date(c.validUntil).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                      </span>
                    </td>
                    <td style={{ padding: '14px 16px' }}>
                      <span style={{ fontSize: '12px', color: '#64748b' }}>
                        {c.lastLoginAt ? new Date(c.lastLoginAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' }) : 'Never'}
                      </span>
                    </td>
                    <td style={{ padding: '14px 16px' }}>
                      <div style={{ display: 'flex', gap: '6px' }}>
                        {c.status !== 'ACTIVE' && (
                          <button onClick={() => setStatus(c.id, 'ACTIVE')} disabled={actionId === c.id} style={{ padding: '5px 10px', background: '#f0fdf4', border: '1px solid #bbf7d0', borderRadius: '6px', cursor: 'pointer', fontSize: '11px', fontWeight: 600, color: '#16a34a', fontFamily: "'Poppins',sans-serif" }}>
                            Activate
                          </button>
                        )}
                        {c.status === 'ACTIVE' && (
                          <button onClick={() => setStatus(c.id, 'SUSPENDED')} disabled={actionId === c.id} style={{ padding: '5px 10px', background: '#fef2f2', border: '1px solid #fecaca', borderRadius: '6px', cursor: 'pointer', fontSize: '11px', fontWeight: 600, color: '#ef4444', fontFamily: "'Poppins',sans-serif" }}>
                            Suspend
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
