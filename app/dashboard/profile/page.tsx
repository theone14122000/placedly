'use client';
import { useState, useEffect } from 'react';
import { User, Phone, MapPin, Briefcase, Target, Save, Mail, Calendar, Shield } from 'lucide-react';

type Profile = {
  id: string; name: string; email: string; phone: string; city: string;
  experience: string; currentRole: string; targetRole: string;
  status: string; validUntil: string; approvedAt: string;
  programme: string; applicationStatus: string;
};

const inputS: React.CSSProperties = {
  width: '100%', padding: '10px 14px', border: '1.5px solid #e2e8f0',
  borderRadius: '10px', fontSize: '14px', fontFamily: "'Poppins',sans-serif",
  color: '#0b0d20', background: '#f8faff', outline: 'none', boxSizing: 'border-box' as const,
};
const labelS: React.CSSProperties = {
  display: 'block', fontSize: '11px', fontWeight: 700, color: '#64748b',
  letterSpacing: '0.5px', textTransform: 'uppercase' as const, marginBottom: '6px',
};

const STATUS_MAP: Record<string, { label: string; color: string; bg: string }> = {
  ACTIVE:    { label: 'Active',    color: '#16a34a', bg: '#dcfce7' },
  EXPIRED:   { label: 'Expired',   color: '#64748b', bg: '#f1f5f9' },
  SUSPENDED: { label: 'Suspended', color: '#be185d', bg: '#fce7f3' },
};

export default function ProfilePage() {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [status, setStatus] = useState('');
  const [edits, setEdits] = useState({ phone: '', city: '', currentRole: '', targetRole: '' });

  useEffect(() => {
    fetch('/api/candidate/profile')
      .then(r => r.json())
      .then(d => {
        setProfile(d);
        setEdits({ phone: d.phone ?? '', city: d.city ?? '', currentRole: d.currentRole ?? '', targetRole: d.targetRole ?? '' });
        setLoading(false);
      }).catch(() => setLoading(false));
  }, []);

  const save = async () => {
    setSaving(true);
    const r = await fetch('/api/candidate/profile', {
      method: 'PATCH', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(edits),
    });
    setSaving(false);
    setStatus(r.ok ? 'Profile saved!' : 'Save failed');
    if (r.ok && profile) setProfile({ ...profile, ...edits });
    setTimeout(() => setStatus(''), 3000);
  };

  if (loading) return <div style={{ padding: '32px', fontFamily: "'Poppins',sans-serif", color: '#94a3b8' }}>Loading profile…</div>;
  if (!profile) return <div style={{ padding: '32px', fontFamily: "'Poppins',sans-serif", color: '#ef4444' }}>Failed to load profile.</div>;

  const st = STATUS_MAP[profile.status] ?? STATUS_MAP.ACTIVE;
  const daysLeft = Math.max(0, Math.ceil((new Date(profile.validUntil).getTime() - Date.now()) / 86400000));

  return (
    <div style={{ fontFamily: "'Poppins',sans-serif" }}>
      {/* Header card */}
      <div style={{ background: '#0b0d20', borderRadius: '16px', padding: '28px 32px', marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '20px', flexWrap: 'wrap' }}>
        <div style={{ width: '64px', height: '64px', borderRadius: '50%', background: '#2145fb', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '24px', fontWeight: 900, color: '#fff', flexShrink: 0 }}>
          {profile.name[0]}
        </div>
        <div style={{ flex: 1 }}>
          <h1 style={{ fontSize: '20px', fontWeight: 900, color: '#fff', marginBottom: '4px' }}>{profile.name}</h1>
          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', alignItems: 'center' }}>
            <span style={{ fontSize: '13px', color: 'rgba(255,255,255,0.5)' }}>{profile.email}</span>
            <span style={{ fontSize: '12px', fontWeight: 700, padding: '3px 10px', borderRadius: 999, background: st.bg, color: st.color }}>{st.label}</span>
          </div>
        </div>
        <div style={{ textAlign: 'right' }}>
          <div style={{ fontSize: '11px', color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '4px' }}>Portal Access</div>
          <div style={{ fontSize: '22px', fontWeight: 900, color: daysLeft <= 14 ? '#f97316' : '#fff' }}>{daysLeft} days</div>
          <div style={{ fontSize: '11px', color: 'rgba(255,255,255,0.4)' }}>until {new Date(profile.validUntil).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}</div>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 320px', gap: '20px', alignItems: 'start' }}>

        {/* Editable fields */}
        <div style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: '16px', padding: '28px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
            <div style={{ fontSize: '15px', fontWeight: 800, color: '#0b0d20' }}>My Information</div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              {status && <span style={{ fontSize: '12px', color: status.includes('fail') ? '#ef4444' : '#16a34a', fontWeight: 600 }}>{status}</span>}
              <button onClick={save} disabled={saving} style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '9px 20px', background: '#2145fb', color: '#fff', border: 'none', borderRadius: '10px', fontSize: '13px', fontWeight: 700, cursor: 'pointer', fontFamily: "'Poppins',sans-serif", opacity: saving ? 0.7 : 1 }}>
                <Save size={13} />{saving ? 'Saving…' : 'Save'}
              </button>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '18px' }}>
            <div>
              <label style={labelS}><Mail size={10} style={{ marginRight: 4 }} />Email (read-only)</label>
              <input style={{ ...inputS, background: '#f1f5f9', color: '#94a3b8', cursor: 'not-allowed' }} value={profile.email} readOnly />
            </div>
            <div>
              <label style={labelS}><Phone size={10} style={{ marginRight: 4 }} />Phone</label>
              <input style={inputS} value={edits.phone} onChange={e => setEdits(p => ({ ...p, phone: e.target.value }))} placeholder="+91 98765 43210" />
            </div>
            <div>
              <label style={labelS}><MapPin size={10} style={{ marginRight: 4 }} />City</label>
              <input style={inputS} value={edits.city} onChange={e => setEdits(p => ({ ...p, city: e.target.value }))} placeholder="Delhi, Mumbai…" />
            </div>
            <div>
              <label style={labelS}><User size={10} style={{ marginRight: 4 }} />Years of Experience</label>
              <input style={{ ...inputS, background: '#f1f5f9', color: '#94a3b8', cursor: 'not-allowed' }} value={profile.experience ?? '—'} readOnly />
            </div>
            <div>
              <label style={labelS}><Briefcase size={10} style={{ marginRight: 4 }} />Current Role</label>
              <input style={inputS} value={edits.currentRole} onChange={e => setEdits(p => ({ ...p, currentRole: e.target.value }))} placeholder="e.g. Software Engineer" />
            </div>
            <div>
              <label style={labelS}><Target size={10} style={{ marginRight: 4 }} />Target Role</label>
              <input style={inputS} value={edits.targetRole} onChange={e => setEdits(p => ({ ...p, targetRole: e.target.value }))} placeholder="e.g. Senior Product Manager" />
            </div>
          </div>
        </div>

        {/* Programme info */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: '16px', padding: '22px' }}>
            <div style={{ fontSize: '13px', fontWeight: 800, color: '#0b0d20', marginBottom: '16px' }}>Programme Details</div>
            {[
              { Icon: Shield, label: 'Programme', value: profile.programme },
              { Icon: Calendar, label: 'Approved On', value: new Date(profile.approvedAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' }) },
              { Icon: Calendar, label: 'Valid Until', value: new Date(profile.validUntil).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' }) },
            ].map(({ Icon, label, value }) => (
              <div key={label} style={{ display: 'flex', gap: '12px', alignItems: 'flex-start', marginBottom: '14px' }}>
                <div style={{ width: '32px', height: '32px', borderRadius: '8px', background: '#eff6ff', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <Icon size={14} color="#2145fb" />
                </div>
                <div>
                  <div style={{ fontSize: '10px', fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.4px', marginBottom: '2px' }}>{label}</div>
                  <div style={{ fontSize: '13px', fontWeight: 600, color: '#0b0d20' }}>{value}</div>
                </div>
              </div>
            ))}
          </div>

          {daysLeft <= 30 && (
            <div style={{ background: daysLeft <= 7 ? '#fef2f2' : '#fff7ed', border: `1.5px solid ${daysLeft <= 7 ? '#fecaca' : '#fed7aa'}`, borderRadius: '14px', padding: '18px' }}>
              <div style={{ fontSize: '13px', fontWeight: 700, color: daysLeft <= 7 ? '#dc2626' : '#c2410c', marginBottom: '6px' }}>
                {daysLeft <= 7 ? '⚠️ Access Expiring Soon!' : 'Access Expiring'}
              </div>
              <div style={{ fontSize: '12px', color: daysLeft <= 7 ? '#dc2626' : '#c2410c', opacity: 0.8 }}>
                Your portal access expires in {daysLeft} day{daysLeft !== 1 ? 's' : ''}. Contact your advisor to renew.
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
