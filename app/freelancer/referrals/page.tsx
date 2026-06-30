'use client';
import { useEffect, useState } from 'react';

type Referral = {
  id: string;
  createdAt: string;
  application: {
    name: string;
    email: string;
    phone: string;
    city: string;
    status: string;
    createdAt: string;
    programme: { name: string };
  };
};

const STATUS_STYLE: Record<string, { bg: string; color: string }> = {
  PENDING:  { bg: '#fef9c3', color: '#854d0e' },
  APPROVED: { bg: '#dcfce7', color: '#166534' },
  REJECTED: { bg: '#fee2e2', color: '#991b1b' },
};

export default function FreelancerReferrals() {
  const [referrals, setReferrals] = useState<Referral[]>([]);
  const [loading, setLoading]     = useState(true);
  const [q, setQ]                 = useState('');
  const [filter, setFilter]       = useState('ALL');

  useEffect(() => {
    fetch('/api/freelancer/dashboard')
      .then(r => r.json())
      .then(d => { setReferrals(d.referrals ?? []); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  const visible = referrals.filter(r => {
    const matchQ = !q ||
      r.application.name.toLowerCase().includes(q.toLowerCase()) ||
      r.application.email.toLowerCase().includes(q.toLowerCase());
    const matchF = filter === 'ALL' || r.application.status === filter;
    return matchQ && matchF;
  });

  const badge = (s: string) => {
    const c = STATUS_STYLE[s] ?? { bg: '#f1f5f9', color: '#475569' };
    return (
      <span style={{ padding: '3px 10px', borderRadius: '999px', fontSize: '11px', fontWeight: 700, background: c.bg, color: c.color }}>
        {s}
      </span>
    );
  };

  return (
    <div style={{ padding: 'clamp(16px, 4vw, 32px)', fontFamily: "'Poppins',sans-serif" }}>
      <div style={{ marginBottom: '28px' }}>
        <h1 style={{ fontSize: 'clamp(18px, 4vw, 22px)', fontWeight: 900, color: '#0b0d20', marginBottom: '4px' }}>My Referrals</h1>
        <p style={{ fontSize: '14px', color: '#64748b' }}>All candidates you have referred to Placedly.</p>
      </div>

      {/* Filters */}
      <div className="ref-filters">
        <input
          value={q}
          onChange={e => setQ(e.target.value)}
          placeholder="Search by name or email…"
          style={{ padding: '9px 14px', border: '1.5px solid #e2e8f0', borderRadius: '9px', fontSize: '13px', fontFamily: "'Poppins',sans-serif", outline: 'none', color: '#0b0d20' }}
        />
        <div className="ref-filter-btns">
          {['ALL', 'PENDING', 'APPROVED', 'REJECTED'].map(f => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              style={{ padding: '9px 14px', borderRadius: '9px', border: '1.5px solid', borderColor: filter === f ? '#2145fb' : '#e2e8f0', background: filter === f ? '#2145fb' : '#fff', color: filter === f ? '#fff' : '#64748b', fontSize: '12px', fontWeight: 700, cursor: 'pointer', fontFamily: "'Poppins',sans-serif" }}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      <div style={{ background: '#fff', borderRadius: '16px', border: '1px solid #eef0f6', overflow: 'hidden' }}>
        {loading ? (
          <div style={{ padding: '40px', textAlign: 'center', color: '#94a3b8', fontSize: '14px' }}>Loading…</div>
        ) : visible.length === 0 ? (
          <div style={{ padding: '40px', textAlign: 'center', color: '#94a3b8', fontSize: '14px' }}>
            {referrals.length === 0 ? 'No referrals yet. Share your referral link to get started.' : 'No referrals match your search.'}
          </div>
        ) : (
          <div className="ref-table-wrap">
            <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: '640px' }}>
              <thead>
                <tr style={{ background: '#f8faff' }}>
                  {['#', 'Candidate', 'Email', 'Phone', 'City', 'Programme', 'Status', 'Applied On'].map(h => (
                    <th key={h} style={{ padding: '10px 16px', textAlign: 'left', fontSize: '11px', fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.4px', whiteSpace: 'nowrap' }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {visible.map((r, i) => (
                  <tr key={r.id} style={{ borderTop: '1px solid #f1f5f9' }}>
                    <td style={{ padding: '12px 16px', fontSize: '13px', color: '#94a3b8', fontWeight: 600 }}>{i + 1}</td>
                    <td style={{ padding: '12px 16px', fontSize: '14px', fontWeight: 700, color: '#0b0d20', whiteSpace: 'nowrap' }}>{r.application.name}</td>
                    <td style={{ padding: '12px 16px', fontSize: '13px', color: '#64748b' }}>{r.application.email}</td>
                    <td style={{ padding: '12px 16px', fontSize: '13px', color: '#64748b', whiteSpace: 'nowrap' }}>{r.application.phone}</td>
                    <td style={{ padding: '12px 16px', fontSize: '13px', color: '#64748b' }}>{r.application.city}</td>
                    <td style={{ padding: '12px 16px', fontSize: '13px', color: '#64748b' }}>{r.application.programme.name}</td>
                    <td style={{ padding: '12px 16px' }}>{badge(r.application.status)}</td>
                    <td style={{ padding: '12px 16px', fontSize: '13px', color: '#94a3b8', whiteSpace: 'nowrap' }}>
                      {new Date(r.application.createdAt).toLocaleDateString('en-IN')}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <div style={{ marginTop: '12px', fontSize: '12px', color: '#94a3b8' }}>
        Showing {visible.length} of {referrals.length} referral{referrals.length !== 1 ? 's' : ''}
      </div>
    </div>
  );
}
