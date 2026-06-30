'use client';
import { useState, useEffect } from 'react';
import { Shield, RefreshCw } from 'lucide-react';

type Log = { id: string; actor: string; action: string; target: string | null; detail: string | null; createdAt: string };

const ACTION_COLORS: Record<string, { bg: string; color: string }> = {
  SET_CANDIDATE_ACTIVE:    { bg: '#dcfce7', color: '#15803d' },
  SET_CANDIDATE_SUSPENDED: { bg: '#fce7f3', color: '#be185d' },
  SET_CANDIDATE_EXPIRED:   { bg: '#f1f5f9', color: '#64748b' },
  RATE_LIMITED_LOGIN:      { bg: '#fef9c3', color: '#a16207' },
};

export default function AdminAuditPage() {
  const [logs, setLogs] = useState<Log[]>([]);
  const [loading, setLoading] = useState(true);

  const load = () => {
    setLoading(true);
    fetch('/api/admin/audit?limit=100')
      .then(r => r.json())
      .then(d => { setLogs(Array.isArray(d) ? d : []); setLoading(false); })
      .catch(() => setLoading(false));
  };

  useEffect(() => { load(); }, []);

  return (
    <div className="adm-page" style={{ padding: '32px', fontFamily: "'Poppins',sans-serif" }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '28px' }}>
        <div>
          <h1 style={{ fontSize: '22px', fontWeight: 900, color: '#0b0d20', marginBottom: '3px' }}>Audit Log</h1>
          <p style={{ fontSize: '13px', color: '#64748b' }}>All admin actions and security events.</p>
        </div>
        <button onClick={load} style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '9px 18px', background: '#f1f5f9', border: '1px solid #e2e8f0', borderRadius: '10px', fontSize: '13px', fontWeight: 600, cursor: 'pointer', fontFamily: "'Poppins',sans-serif", color: '#374151' }}>
          <RefreshCw size={13} />Refresh
        </button>
      </div>

      <div style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: '16px', padding: '24px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '20px' }}>
          <Shield size={16} color="#2145fb" />
          <span style={{ fontSize: '14px', fontWeight: 700, color: '#0b0d20' }}>Events ({logs.length})</span>
        </div>

        {loading ? (
          <div style={{ padding: '40px', textAlign: 'center', color: '#94a3b8', fontSize: '13px' }}>Loading…</div>
        ) : logs.length === 0 ? (
          <div style={{ padding: '40px', textAlign: 'center', color: '#94a3b8', fontSize: '13px' }}>No audit events yet.</div>
        ) : (
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px' }}>
              <thead>
                <tr style={{ borderBottom: '2px solid #f1f5f9' }}>
                  {['Time', 'Actor', 'Action', 'Target', 'Detail'].map(h => (
                    <th key={h} style={{ textAlign: 'left', padding: '8px 12px', fontSize: '11px', fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.4px', whiteSpace: 'nowrap' }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {logs.map(log => {
                  const c = ACTION_COLORS[log.action] ?? { bg: '#eff6ff', color: '#2145fb' };
                  return (
                    <tr key={log.id} style={{ borderBottom: '1px solid #f8faff' }}>
                      <td style={{ padding: '10px 12px', color: '#94a3b8', fontSize: '12px', whiteSpace: 'nowrap' }}>
                        {new Date(log.createdAt).toLocaleString('en-IN', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' })}
                      </td>
                      <td style={{ padding: '10px 12px', fontWeight: 600, color: '#374151' }}>{log.actor}</td>
                      <td style={{ padding: '10px 12px' }}>
                        <span style={{ fontSize: '10px', fontWeight: 700, padding: '3px 8px', borderRadius: 999, background: c.bg, color: c.color, textTransform: 'uppercase', letterSpacing: '0.4px' }}>
                          {log.action.replace(/_/g, ' ')}
                        </span>
                      </td>
                      <td style={{ padding: '10px 12px', color: '#64748b', fontSize: '12px', fontFamily: 'monospace' }}>{log.target ?? '—'}</td>
                      <td style={{ padding: '10px 12px', color: '#64748b', fontSize: '12px', maxWidth: '280px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{log.detail ?? '—'}</td>
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
