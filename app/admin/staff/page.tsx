'use client';
import { useEffect, useState } from 'react';
import { Users, UserPlus, Shield, Briefcase, Link2, ToggleLeft, ToggleRight, Mail, Phone, Calendar, Hash, MapPin } from 'lucide-react';

type StaffMember = { id: string; name: string; email: string; phone?: string; isActive: boolean; createdAt: string; referralCode?: string; city?: string };
type StaffData  = { admins: StaffMember[]; recruiters: StaffMember[]; freelancers: StaffMember[] };

const TABS = [
  { key: 'admin',      label: 'Admins',     Icon: Shield,    color: '#f97316' },
  { key: 'recruiter',  label: 'Recruiters', Icon: Briefcase, color: '#2145fb' },
  { key: 'freelancer', label: 'Partners',   Icon: Link2,     color: '#7c3aed' },
] as const;

type TabKey = typeof TABS[number]['key'];

const inp: React.CSSProperties = { display: 'block', width: '100%', padding: '9px 12px', border: '1.5px solid #e2e8f0', borderRadius: '9px', fontSize: '13px', fontFamily: "'Poppins',sans-serif", color: '#0b0d20', background: '#f8faff', outline: 'none', boxSizing: 'border-box' as const };
const lbl: React.CSSProperties = { display: 'block', fontSize: '11px', fontWeight: 700, color: '#374151', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '5px' };

export default function StaffPage() {
  const [data, setData]         = useState<StaffData>({ admins: [], recruiters: [], freelancers: [] });
  const [tab, setTab]           = useState<TabKey>('admin');
  const [loading, setLoading]   = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [busy, setBusy]         = useState(false);
  const [form, setForm]         = useState({ name: '', email: '', phone: '', city: '' });
  const [error, setError]       = useState('');

  const load = () => {
    setLoading(true);
    fetch('/api/admin/staff').then(r => r.json()).then(d => { setData(d); setLoading(false); });
  };

  useEffect(() => { load(); }, []);

  const members: StaffMember[] = tab === 'admin' ? data.admins : tab === 'recruiter' ? data.recruiters : data.freelancers;
  const tabMeta = TABS.find(t => t.key === tab)!;

  const toggle = async (id: string, isActive: boolean) => {
    await fetch('/api/admin/staff', { method: 'PATCH', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ type: tab, id, isActive: !isActive }) });
    load();
  };

  const create = async (e: React.FormEvent) => {
    e.preventDefault();
    setBusy(true); setError('');
    const r = await fetch('/api/admin/staff', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ type: tab, ...form }) });
    const d = await r.json();
    if (r.ok) {
      alert(`✅ Account created!\n\nEmail: ${d.email}\nPassword: ${d.password}\n\nShare these credentials with the new ${tab}.`);
      setShowForm(false);
      setForm({ name: '', email: '', phone: '', city: '' });
      load();
    } else setError(d.error ?? 'Something went wrong');
    setBusy(false);
  };

  const ToggleBtn = ({ m }: { m: StaffMember }) => (
    <button
      onClick={() => toggle(m.id, m.isActive)}
      style={{ display: 'inline-flex', alignItems: 'center', gap: '5px', padding: '5px 12px', borderRadius: '8px', border: '1.5px solid', borderColor: m.isActive ? '#fecaca' : '#bbf7d0', background: m.isActive ? '#fef2f2' : '#f0fdf4', color: m.isActive ? '#dc2626' : '#16a34a', fontSize: '12px', fontWeight: 700, cursor: 'pointer', fontFamily: "'Poppins',sans-serif", whiteSpace: 'nowrap' }}
    >
      {m.isActive ? <><ToggleLeft size={13} /> Deactivate</> : <><ToggleRight size={13} /> Activate</>}
    </button>
  );

  return (
    <div style={{ padding: 'clamp(14px,4vw,32px)', fontFamily: "'Poppins',sans-serif" }}>

      {/* Header */}
      <div style={{ marginBottom: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '12px', flexWrap: 'wrap' }}>
        <div>
          <h1 style={{ fontSize: 'clamp(18px,4vw,22px)', fontWeight: 900, color: '#0b0d20', marginBottom: '4px' }}>Staff Management</h1>
          <p style={{ fontSize: '13px', color: '#64748b' }}>Create and manage admin, recruiter, and partner accounts.</p>
        </div>
        <button
          onClick={() => { setShowForm(v => !v); setError(''); }}
          style={{ display: 'flex', alignItems: 'center', gap: '7px', padding: '9px 16px', background: '#2145fb', color: '#fff', border: 'none', borderRadius: '10px', fontSize: '13px', fontWeight: 700, cursor: 'pointer', fontFamily: "'Poppins',sans-serif", whiteSpace: 'nowrap', flexShrink: 0 }}
        >
          <UserPlus size={15} /> Add {tabMeta.label.slice(0, -1)}
        </button>
      </div>

      {/* Add form */}
      {showForm && (
        <div style={{ background: '#fff', borderRadius: '14px', border: '1px solid #e2e8f0', padding: 'clamp(16px,4vw,24px)', marginBottom: '20px' }}>
          <div style={{ fontSize: '15px', fontWeight: 800, color: '#0b0d20', marginBottom: '16px' }}>New {tabMeta.label.slice(0, -1)} Account</div>
          {error && <div style={{ padding: '10px 14px', background: '#fef2f2', border: '1px solid #fecaca', borderRadius: '8px', fontSize: '13px', color: '#dc2626', marginBottom: '14px' }}>{error}</div>}
          <form onSubmit={create}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(200px,1fr))', gap: '12px', marginBottom: '14px' }}>
              <div>
                <label style={lbl}>Full Name *</label>
                <input required style={inp} placeholder="Full name" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} />
              </div>
              <div>
                <label style={lbl}>Email *</label>
                <input required type="email" style={inp} placeholder="email@example.com" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} />
              </div>
              <div>
                <label style={lbl}>Phone {tab !== 'admin' && '*'}</label>
                <input required={tab !== 'admin'} type="tel" style={inp} placeholder="+91 XXXXX XXXXX" value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} />
              </div>
              {tab === 'freelancer' && (
                <div>
                  <label style={lbl}>City</label>
                  <input style={inp} placeholder="Delhi" value={form.city} onChange={e => setForm({ ...form, city: e.target.value })} />
                </div>
              )}
            </div>
            <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
              <button type="submit" disabled={busy} style={{ padding: '9px 20px', background: busy ? '#93a5fd' : '#2145fb', color: '#fff', border: 'none', borderRadius: '9px', fontSize: '13px', fontWeight: 700, cursor: busy ? 'not-allowed' : 'pointer', fontFamily: "'Poppins',sans-serif" }}>
                {busy ? 'Creating…' : 'Create Account'}
              </button>
              <button type="button" onClick={() => setShowForm(false)} style={{ padding: '9px 16px', background: '#f1f5f9', color: '#374151', border: 'none', borderRadius: '9px', fontSize: '13px', cursor: 'pointer', fontFamily: "'Poppins',sans-serif" }}>
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Tabs — horizontal scroll on mobile */}
      <div style={{ display: 'flex', gap: '8px', marginBottom: '16px', overflowX: 'auto', WebkitOverflowScrolling: 'touch' as any, scrollbarWidth: 'none' as any, paddingBottom: '2px' }}>
        {TABS.map(t => (
          <button
            key={t.key}
            onClick={() => setTab(t.key)}
            style={{ display: 'flex', alignItems: 'center', gap: '7px', padding: '8px 14px', borderRadius: '9px', border: '1.5px solid', borderColor: tab === t.key ? t.color : '#e2e8f0', background: tab === t.key ? t.color + '12' : '#fff', color: tab === t.key ? t.color : '#64748b', fontSize: '13px', fontWeight: 700, cursor: 'pointer', fontFamily: "'Poppins',sans-serif", flexShrink: 0, whiteSpace: 'nowrap' }}
          >
            <t.Icon size={14} /> {t.label}
            <span style={{ marginLeft: '2px', padding: '1px 7px', borderRadius: '99px', background: tab === t.key ? t.color : '#f1f5f9', color: tab === t.key ? '#fff' : '#64748b', fontSize: '11px', fontWeight: 700 }}>
              {t.key === 'admin' ? data.admins.length : t.key === 'recruiter' ? data.recruiters.length : data.freelancers.length}
            </span>
          </button>
        ))}
      </div>

      {/* Loading / Empty */}
      {loading ? (
        <div style={{ background: '#fff', borderRadius: '16px', border: '1px solid #eef0f6', padding: '40px', textAlign: 'center', color: '#94a3b8', fontSize: '14px' }}>Loading…</div>
      ) : members.length === 0 ? (
        <div style={{ background: '#fff', borderRadius: '16px', border: '1px solid #eef0f6', padding: '48px', textAlign: 'center', color: '#94a3b8', fontSize: '14px' }}>
          <Users size={32} color="#e2e8f0" style={{ marginBottom: '10px', display: 'block', margin: '0 auto 10px' }} />
          No {tabMeta.label.toLowerCase()} yet. Click &ldquo;Add {tabMeta.label.slice(0, -1)}&rdquo; to create the first one.
        </div>
      ) : (
        <>
          {/* Desktop table — hidden on mobile via CSS */}
          <div className="staff-table-wrap">
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ background: '#f8faff' }}>
                  {['Name', 'Email', 'Phone', ...(tab === 'freelancer' ? ['Referral Code', 'City'] : []), 'Status', 'Created', 'Actions'].map(h => (
                    <th key={h} style={{ padding: '10px 16px', textAlign: 'left', fontSize: '11px', fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.4px', whiteSpace: 'nowrap' }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {members.map(m => (
                  <tr key={m.id} style={{ borderTop: '1px solid #f1f5f9' }}>
                    <td style={{ padding: '13px 16px', fontSize: '14px', fontWeight: 700, color: '#0b0d20' }}>{m.name}</td>
                    <td style={{ padding: '13px 16px', fontSize: '13px', color: '#64748b' }}>{m.email}</td>
                    <td style={{ padding: '13px 16px', fontSize: '13px', color: '#64748b' }}>{m.phone ?? '—'}</td>
                    {tab === 'freelancer' && (
                      <>
                        <td style={{ padding: '13px 16px' }}>
                          <span style={{ padding: '3px 10px', borderRadius: '7px', background: '#eff6ff', color: '#2145fb', fontSize: '12px', fontWeight: 700, letterSpacing: '1px' }}>{m.referralCode ?? '—'}</span>
                        </td>
                        <td style={{ padding: '13px 16px', fontSize: '13px', color: '#64748b' }}>{m.city ?? '—'}</td>
                      </>
                    )}
                    <td style={{ padding: '13px 16px' }}>
                      <span style={{ padding: '3px 10px', borderRadius: '999px', fontSize: '11px', fontWeight: 700, background: m.isActive ? '#dcfce7' : '#f1f5f9', color: m.isActive ? '#166534' : '#64748b' }}>
                        {m.isActive ? 'Active' : 'Inactive'}
                      </span>
                    </td>
                    <td style={{ padding: '13px 16px', fontSize: '13px', color: '#94a3b8', whiteSpace: 'nowrap' }}>
                      {new Date(m.createdAt).toLocaleDateString('en-IN')}
                    </td>
                    <td style={{ padding: '13px 16px' }}>
                      <ToggleBtn m={m} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile cards — hidden on desktop via CSS */}
          <div className="staff-cards-wrap">
            {members.map(m => (
              <div key={m.id} style={{ background: '#fff', borderRadius: '14px', border: '1px solid #eef0f6', padding: '16px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {/* Top row: name + status */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '8px' }}>
                  <div style={{ fontWeight: 800, fontSize: '15px', color: '#0b0d20' }}>{m.name}</div>
                  <span style={{ padding: '3px 10px', borderRadius: '999px', fontSize: '11px', fontWeight: 700, background: m.isActive ? '#dcfce7' : '#f1f5f9', color: m.isActive ? '#166534' : '#64748b', flexShrink: 0 }}>
                    {m.isActive ? 'Active' : 'Inactive'}
                  </span>
                </div>

                {/* Info rows */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', color: '#64748b' }}>
                    <Mail size={13} color="#94a3b8" /> {m.email}
                  </div>
                  {m.phone && (
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', color: '#64748b' }}>
                      <Phone size={13} color="#94a3b8" /> {m.phone}
                    </div>
                  )}
                  {tab === 'freelancer' && m.referralCode && (
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', color: '#2145fb' }}>
                      <Hash size={13} color="#2145fb" />
                      <span style={{ background: '#eff6ff', padding: '2px 8px', borderRadius: '6px', fontWeight: 700, letterSpacing: '0.8px' }}>{m.referralCode}</span>
                    </div>
                  )}
                  {tab === 'freelancer' && m.city && (
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', color: '#64748b' }}>
                      <MapPin size={13} color="#94a3b8" /> {m.city}
                    </div>
                  )}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '12px', color: '#94a3b8' }}>
                    <Calendar size={12} color="#94a3b8" /> {new Date(m.createdAt).toLocaleDateString('en-IN')}
                  </div>
                </div>

                {/* Action */}
                <div style={{ paddingTop: '4px', borderTop: '1px solid #f1f5f9' }}>
                  <ToggleBtn m={m} />
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
