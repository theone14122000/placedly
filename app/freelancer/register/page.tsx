'use client';
import { useState } from 'react';
import Link from 'next/link';
import { CheckCircle2 } from 'lucide-react';

export default function FreelancerRegister() {
  const [form, setForm]     = useState({ name: '', email: '', phone: '', city: '', password: '', confirm: '' });
  const [loading, setLoading] = useState(false);
  const [done, setDone]     = useState<string | null>(null);
  const [error, setError]   = useState('');
  const [focused, setFocused] = useState('');

  const inp = (n: string): React.CSSProperties => ({
    display: 'block', width: '100%', padding: '11px 14px', border: `1.5px solid ${focused === n ? '#2145fb' : '#e2e8f0'}`,
    borderRadius: '10px', fontSize: '14px', fontFamily: "'Poppins',sans-serif", color: '#0b0d20',
    background: focused === n ? '#fff' : '#f8faff', outline: 'none', boxSizing: 'border-box' as const,
    boxShadow: focused === n ? '0 0 0 3px rgba(33,69,251,0.09)' : 'none',
  });
  const fp = (n: string) => ({ onFocus: () => setFocused(n), onBlur: () => setFocused('') });
  const lbl: React.CSSProperties = { display: 'block', fontSize: '11px', fontWeight: 700, color: '#374151', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '6px' };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (form.password !== form.confirm) { setError('Passwords do not match'); return; }
    setLoading(true); setError('');
    try {
      const r = await fetch('/api/freelancer/register', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: form.name, email: form.email, phone: form.phone, city: form.city, password: form.password }),
      });
      const data = await r.json();
      if (r.ok) setDone(data.referralCode);
      else setError(data.error ?? 'Something went wrong');
    } catch { setError('Network error. Please try again.'); }
    setLoading(false);
  };

  if (done) return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#f8faff', fontFamily: "'Poppins',sans-serif", padding: '24px' }}>
      <div style={{ maxWidth: '480px', width: '100%', textAlign: 'center', background: '#fff', borderRadius: '20px', padding: 'clamp(28px, 6vw, 48px) clamp(20px, 5vw, 36px)', boxShadow: '0 4px 32px rgba(0,0,0,0.07)' }}>
        <CheckCircle2 size={52} color="#16a34a" style={{ marginBottom: '16px' }} />
        <h1 style={{ fontSize: 'clamp(18px, 4vw, 22px)', fontWeight: 900, color: '#0b0d20', marginBottom: '8px' }}>Registration Submitted!</h1>
        <p style={{ fontSize: '14px', color: '#64748b', lineHeight: 1.7, marginBottom: '20px' }}>
          Your account is pending activation. Once approved, you can log in with your referral code:
        </p>
        <div style={{ background: '#eff6ff', border: '1px solid #bfdbfe', borderRadius: '12px', padding: '16px', marginBottom: '24px' }}>
          <div style={{ fontSize: '11px', fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase', marginBottom: '4px' }}>Your Referral Code</div>
          <div style={{ fontSize: 'clamp(22px, 6vw, 28px)', fontWeight: 900, letterSpacing: '3px', color: '#2145fb' }}>{done}</div>
        </div>
        <Link href="/login" style={{ display: 'block', padding: '12px 28px', background: '#2145fb', color: '#fff', borderRadius: '10px', fontWeight: 700, fontSize: '14px', textDecoration: 'none' }}>Go to Login</Link>
      </div>
    </div>
  );

  return (
    <div style={{ minHeight: '100vh', background: '#f8faff', fontFamily: "'Poppins',sans-serif", padding: 'clamp(24px, 5vw, 40px) clamp(16px, 4vw, 24px)' }}>
      <style>{`
        .reg-grid-2 {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 14px;
        }
        @media (max-width: 479px) {
          .reg-grid-2 {
            grid-template-columns: 1fr;
            gap: 0;
          }
        }
      `}</style>

      <div style={{ maxWidth: '560px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '28px' }}>
          <Link href="/"><img src="/logo.png" alt="Placedly" style={{ height: '40px', marginBottom: '20px' }} /></Link>
          <h1 style={{ fontSize: 'clamp(20px, 5vw, 24px)', fontWeight: 900, color: '#0b0d20', marginBottom: '8px' }}>Partner Registration</h1>
          <p style={{ fontSize: '14px', color: '#64748b', lineHeight: 1.7 }}>
            Join Placedly as a Partner. Source candidates, earn commissions for every successful placement.
          </p>
        </div>

        <div style={{ background: '#fff', borderRadius: '16px', border: '1px solid #e2e8f0', padding: 'clamp(20px, 5vw, 36px)', boxShadow: '0 4px 24px rgba(0,0,0,0.06)' }}>
          {error && <div style={{ padding: '12px 16px', background: '#fef2f2', border: '1px solid #fecaca', borderRadius: '10px', fontSize: '13px', color: '#dc2626', marginBottom: '20px' }}>{error}</div>}

          <form onSubmit={submit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div className="reg-grid-2">
              <div><label style={lbl}>Full Name *</label><input required placeholder="Your name" style={inp('name')} value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} {...fp('name')} /></div>
              <div><label style={lbl}>Email *</label><input type="email" required placeholder="you@email.com" style={inp('email')} value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} {...fp('email')} /></div>
            </div>
            <div className="reg-grid-2">
              <div><label style={lbl}>Phone *</label><input required type="tel" placeholder="+91 XXXXX XXXXX" style={inp('phone')} value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} {...fp('phone')} /></div>
              <div><label style={lbl}>City</label><input placeholder="Delhi" style={inp('city')} value={form.city} onChange={e => setForm({ ...form, city: e.target.value })} {...fp('city')} /></div>
            </div>
            <div className="reg-grid-2">
              <div><label style={lbl}>Password *</label><input required type="password" placeholder="Min 8 characters" style={inp('password')} value={form.password} onChange={e => setForm({ ...form, password: e.target.value })} {...fp('password')} /></div>
              <div><label style={lbl}>Confirm Password *</label><input required type="password" placeholder="Repeat password" style={inp('confirm')} value={form.confirm} onChange={e => setForm({ ...form, confirm: e.target.value })} {...fp('confirm')} /></div>
            </div>

            <button type="submit" disabled={loading} style={{ display: 'block', width: '100%', padding: '14px', background: loading ? '#93a5fd' : '#2145fb', color: '#fff', fontWeight: 700, fontSize: '15px', fontFamily: "'Poppins',sans-serif", border: 'none', borderRadius: '10px', cursor: loading ? 'not-allowed' : 'pointer', textAlign: 'center', marginTop: '4px' }}>
              {loading ? 'Submitting…' : 'Register as Partner'}
            </button>
          </form>
        </div>

        <p style={{ fontSize: '12px', color: '#94a3b8', textAlign: 'center', marginTop: '16px' }}>
          Already registered? <Link href="/login" style={{ color: '#2145fb', fontWeight: 600 }}>Sign in →</Link>
        </p>
      </div>
    </div>
  );
}
