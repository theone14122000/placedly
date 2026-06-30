'use client';
import { useEffect, useState } from 'react';
import { IndianRupee, Clock, CheckCircle2 } from 'lucide-react';

type Commission = {
  id: string;
  candidateName: string;
  candidateEmail: string;
  amount: number;
  status: string;
  paidAt: string | null;
  note: string | null;
  createdAt: string;
};

export default function FreelancerCommissions() {
  const [commissions, setCommissions] = useState<Commission[]>([]);
  const [loading, setLoading]         = useState(true);
  const [filter, setFilter]           = useState('ALL');

  useEffect(() => {
    fetch('/api/freelancer/dashboard')
      .then(r => r.json())
      .then(d => { setCommissions(d.commissions ?? []); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  const pending = commissions.filter(c => c.status === 'PENDING').reduce((s, c) => s + c.amount, 0);
  const paid    = commissions.filter(c => c.status === 'PAID').reduce((s, c) => s + c.amount, 0);

  const visible = filter === 'ALL' ? commissions : commissions.filter(c => c.status === filter);

  return (
    <div style={{ padding: 'clamp(16px, 4vw, 32px)', fontFamily: "'Poppins',sans-serif" }}>
      <div style={{ marginBottom: '28px' }}>
        <h1 style={{ fontSize: 'clamp(18px, 4vw, 22px)', fontWeight: 900, color: '#0b0d20', marginBottom: '4px' }}>Commissions</h1>
        <p style={{ fontSize: '14px', color: '#64748b' }}>Earnings from successful candidate placements.</p>
      </div>

      {/* Summary cards */}
      <div className="comm-summary-grid">
        {[
          { label: 'Total Earned',   value: `₹${(pending + paid).toLocaleString('en-IN')}`, Icon: IndianRupee, color: '#2145fb',  bg: '#eff6ff' },
          { label: 'Pending Payout', value: `₹${pending.toLocaleString('en-IN')}`,          Icon: Clock,       color: '#f97316',  bg: '#fff7ed' },
          { label: 'Paid Out',       value: `₹${paid.toLocaleString('en-IN')}`,             Icon: CheckCircle2, color: '#16a34a', bg: '#f0fdf4' },
        ].map(c => (
          <div key={c.label} className="comm-summary-card" style={{ background: '#fff', borderRadius: '14px', padding: '20px 24px', border: '1px solid #eef0f6', display: 'flex', alignItems: 'center', gap: '16px' }}>
            <div style={{ width: '44px', height: '44px', borderRadius: '12px', background: c.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <c.Icon size={20} color={c.color} />
            </div>
            <div>
              <div style={{ fontSize: 'clamp(18px, 4vw, 22px)', fontWeight: 900, color: '#0b0d20' }}>{c.value}</div>
              <div style={{ fontSize: '12px', color: '#64748b', marginTop: '2px' }}>{c.label}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Filter tabs */}
      <div className="comm-filter-row">
        {['ALL', 'PENDING', 'PAID'].map(f => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            style={{ padding: '7px 16px', borderRadius: '8px', border: '1.5px solid', borderColor: filter === f ? '#2145fb' : '#e2e8f0', background: filter === f ? '#2145fb' : '#fff', color: filter === f ? '#fff' : '#64748b', fontSize: '12px', fontWeight: 700, cursor: 'pointer', fontFamily: "'Poppins',sans-serif" }}
          >
            {f}
          </button>
        ))}
      </div>

      <div style={{ background: '#fff', borderRadius: '16px', border: '1px solid #eef0f6', overflow: 'hidden' }}>
        {loading ? (
          <div style={{ padding: '40px', textAlign: 'center', color: '#94a3b8', fontSize: '14px' }}>Loading…</div>
        ) : visible.length === 0 ? (
          <div style={{ padding: '48px', textAlign: 'center' }}>
            <IndianRupee size={36} color="#cbd5e1" style={{ marginBottom: '12px' }} />
            <div style={{ fontSize: '14px', color: '#94a3b8' }}>
              {commissions.length === 0
                ? 'No commissions yet. Commissions are added once your referred candidates are placed.'
                : 'No commissions match this filter.'}
            </div>
          </div>
        ) : (
          <div className="comm-table-wrap">
            <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: '600px' }}>
              <thead>
                <tr style={{ background: '#f8faff' }}>
                  {['Candidate', 'Email', 'Amount', 'Status', 'Note', 'Created', 'Paid On'].map(h => (
                    <th key={h} style={{ padding: '10px 16px', textAlign: 'left', fontSize: '11px', fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.4px', whiteSpace: 'nowrap' }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {visible.map(c => (
                  <tr key={c.id} style={{ borderTop: '1px solid #f1f5f9' }}>
                    <td style={{ padding: '14px 16px', fontSize: '14px', fontWeight: 700, color: '#0b0d20', whiteSpace: 'nowrap' }}>{c.candidateName}</td>
                    <td style={{ padding: '14px 16px', fontSize: '13px', color: '#64748b' }}>{c.candidateEmail}</td>
                    <td style={{ padding: '14px 16px', fontSize: '15px', fontWeight: 900, color: '#0b0d20', whiteSpace: 'nowrap' }}>
                      ₹{c.amount.toLocaleString('en-IN')}
                    </td>
                    <td style={{ padding: '14px 16px' }}>
                      {c.status === 'PAID' ? (
                        <span style={{ display: 'inline-flex', alignItems: 'center', gap: '5px', padding: '3px 10px', borderRadius: '999px', background: '#dcfce7', color: '#166534', fontSize: '11px', fontWeight: 700 }}>
                          <CheckCircle2 size={11} /> PAID
                        </span>
                      ) : (
                        <span style={{ display: 'inline-flex', alignItems: 'center', gap: '5px', padding: '3px 10px', borderRadius: '999px', background: '#fef9c3', color: '#854d0e', fontSize: '11px', fontWeight: 700 }}>
                          <Clock size={11} /> PENDING
                        </span>
                      )}
                    </td>
                    <td style={{ padding: '14px 16px', fontSize: '12px', color: '#64748b', maxWidth: '180px' }}>{c.note ?? '—'}</td>
                    <td style={{ padding: '14px 16px', fontSize: '13px', color: '#94a3b8', whiteSpace: 'nowrap' }}>
                      {new Date(c.createdAt).toLocaleDateString('en-IN')}
                    </td>
                    <td style={{ padding: '14px 16px', fontSize: '13px', color: '#94a3b8', whiteSpace: 'nowrap' }}>
                      {c.paidAt ? new Date(c.paidAt).toLocaleDateString('en-IN') : '—'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <div style={{ marginTop: '16px', padding: '14px 18px', background: '#fffbeb', border: '1px solid #fde68a', borderRadius: '10px', fontSize: '13px', color: '#92400e', lineHeight: 1.6 }}>
        <strong>How commissions work:</strong> You earn a commission for every candidate you refer who successfully completes enrolment. Commissions are processed within 7 working days of placement confirmation and paid directly to your registered bank account.
      </div>
    </div>
  );
}
