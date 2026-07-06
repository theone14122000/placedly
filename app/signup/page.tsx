'use client';
import { useState } from 'react';
import Link from 'next/link';
import { signIn } from 'next-auth/react';
import { Eye, EyeOff, Mail, Lock, User, Phone, ArrowRight, CheckCircle2, Briefcase } from 'lucide-react';

const inputBase: React.CSSProperties = {
  display: 'block', width: '100%',
  padding: '12px 14px 12px 42px',
  border: '1.5px solid #e2e8f0', borderRadius: '10px',
  fontSize: '14px', fontFamily: "'Poppins', sans-serif",
  color: '#0b0d20', background: '#f8faff',
  outline: 'none', boxShadow: 'none',
  appearance: 'none' as const, WebkitAppearance: 'none' as const,
  boxSizing: 'border-box' as const,
};
const labelStyle: React.CSSProperties = {
  display: 'block', fontSize: '11px', fontWeight: 600, color: '#374151',
  letterSpacing: '0.5px', textTransform: 'uppercase' as const, marginBottom: '6px',
};

export default function SignupPage() {
  const [focused, setFocused] = useState('');
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ firstName: '', lastName: '', email: '', phone: '', password: '', service: '' });

  const fi = (n: string): React.CSSProperties => ({
    ...inputBase,
    borderColor: focused === n ? '#2145fb' : '#e2e8f0',
    background: focused === n ? '#fff' : '#f8faff',
    boxShadow: focused === n ? '0 0 0 3px rgba(33,69,251,0.10)' : 'none',
  });

  const handleSubmit = (e: React.FormEvent) => { e.preventDefault(); setLoading(true); setTimeout(() => setLoading(false), 1500); };

  return (
    <div className="auth-layout" style={{ minHeight: '100vh', display: 'flex', fontFamily: "'Poppins', sans-serif" }}>

      {/* ── Left panel ── */}
      <div className="auth-panel-left" style={{ width: '40%', background: '#0b0d20', display: 'flex', flexDirection: 'column', padding: '40px 48px', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: -160, right: -160, width: 400, height: 400, borderRadius: '50%', background: 'rgba(33,69,251,0.12)', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', bottom: -80, left: -80, width: 300, height: 300, borderRadius: '50%', background: 'rgba(249,115,22,0.08)', pointerEvents: 'none' }} />

        <Link href="/" style={{ display: 'inline-flex', alignItems: 'center', textDecoration: 'none', marginBottom: 'auto' }}>
          <img src="/logo.png" alt="Placedly" style={{ height: '52px', width: 'auto' }} />
        </Link>

        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', paddingBottom: '40px' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', marginBottom: '20px' }}>
            <div style={{ width: '20px', height: '3px', borderRadius: 999, background: '#f97316' }} />
            <span style={{ fontSize: '11px', fontWeight: 700, color: '#f97316', letterSpacing: '0.8px', textTransform: 'uppercase' }}>Free to Join</span>
          </div>
          <h1 style={{ fontSize: 'clamp(1.6rem,2.5vw,2.4rem)', fontWeight: 900, color: '#fff', lineHeight: 1.12, letterSpacing: '-0.8px', marginBottom: '14px' }}>
            Start your career<br /><span style={{ color: '#f97316' }}>transformation today.</span>
          </h1>
          <p style={{ fontSize: '14px', color: 'rgba(255,255,255,0.55)', lineHeight: 1.75, marginBottom: '36px', maxWidth: '320px' }}>
            Join 300+ professionals who trusted Placedly to land better roles and bigger salaries.
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '11px' }}>
            {['Zero upfront cost — pay after placement', 'Direct connect to 50+ hiring partners', 'Resume rebuild + 3 mock interviews', 'Dedicated advisor throughout your journey'].map(p => (
              <div key={p} style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                <CheckCircle2 size={15} color="#2145fb" strokeWidth={2.5} style={{ flexShrink: 0, marginTop: '2px' }} />
                <span style={{ fontSize: '13px', color: 'rgba(255,255,255,0.70)', lineHeight: 1.5 }}>{p}</span>
              </div>
            ))}
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', borderTop: '1px solid rgba(255,255,255,0.07)', paddingTop: '24px', gap: '12px' }}>
          {[{ n: '9 days', l: 'Fastest Placed' }, { n: '40%+', l: 'Avg Salary Hike' }, { n: '50+', l: 'Hiring Partners' }].map(s => (
            <div key={s.n} style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '17px', fontWeight: 900, color: '#fff' }}>{s.n}</div>
              <div style={{ fontSize: '10px', color: 'rgba(255,255,255,0.35)', marginTop: '3px' }}>{s.l}</div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Right form panel ── */}
      <div className="auth-panel-right" style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '40px', background: '#fff', overflowY: 'auto' }}>
        <div style={{ width: '100%', maxWidth: '420px' }}>

          {/* Mobile-only logo */}
          <Link href="/" className="auth-mobile-logo" style={{ display: 'none', marginBottom: '24px' }}>
            <img src="/logo.png" alt="Placedly" style={{ height: '44px', width: 'auto' }} />
          </Link>

          <div style={{ marginBottom: '24px' }}>
            <h2 style={{ fontSize: '24px', fontWeight: 900, color: '#0b0d20', letterSpacing: '-0.5px', marginBottom: '6px' }}>Create your account</h2>
            <p style={{ fontSize: '14px', color: '#64748b' }}>
              Already have one?{' '}
              <Link href="/login" style={{ color: '#2145fb', fontWeight: 600, textDecoration: 'none' }}>Sign in →</Link>
            </p>
          </div>

          {/* Google */}
          <button type="button" onClick={() => signIn('google')} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', width: '100%', padding: '12px', border: '1.5px solid #e2e8f0', borderRadius: '10px', fontSize: '14px', fontWeight: 600, color: '#374151', background: '#fff', cursor: 'pointer', fontFamily: "'Poppins', sans-serif", marginBottom: '20px' }}>
            <svg width="18" height="18" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"/>
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
            </svg>
            Continue with Google
          </button>

          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' }}>
            <div style={{ flex: 1, height: '1px', background: '#e2e8f0' }} />
            <span style={{ fontSize: '12px', color: '#94a3b8' }}>or fill the form</span>
            <div style={{ flex: 1, height: '1px', background: '#e2e8f0' }} />
          </div>

          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            {/* Name row */}
            <div className="auth-name-row" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
              <div>
                <label style={labelStyle}>First Name</label>
                <div style={{ position: 'relative' }}>
                  <div style={{ position: 'absolute', left: 13, top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }}><User size={14} color={focused === 'first' ? '#2145fb' : '#cbd5e1'} /></div>
                  <input required placeholder="First" style={fi('first')} value={form.firstName} onFocus={() => setFocused('first')} onBlur={() => setFocused('')} onChange={e => setForm({ ...form, firstName: e.target.value })} />
                </div>
              </div>
              <div>
                <label style={labelStyle}>Last Name</label>
                <div style={{ position: 'relative' }}>
                  <div style={{ position: 'absolute', left: 13, top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }}><User size={14} color={focused === 'last' ? '#2145fb' : '#cbd5e1'} /></div>
                  <input required placeholder="Last" style={fi('last')} value={form.lastName} onFocus={() => setFocused('last')} onBlur={() => setFocused('')} onChange={e => setForm({ ...form, lastName: e.target.value })} />
                </div>
              </div>
            </div>

            {/* Email */}
            <div>
              <label style={labelStyle}>Email Address</label>
              <div style={{ position: 'relative' }}>
                <div style={{ position: 'absolute', left: 13, top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }}><Mail size={14} color={focused === 'email' ? '#2145fb' : '#cbd5e1'} /></div>
                <input type="email" required placeholder="you@email.com" style={fi('email')} value={form.email} onFocus={() => setFocused('email')} onBlur={() => setFocused('')} onChange={e => setForm({ ...form, email: e.target.value })} />
              </div>
            </div>

            {/* Phone */}
            <div>
              <label style={labelStyle}>WhatsApp Number</label>
              <div style={{ position: 'relative' }}>
                <div style={{ position: 'absolute', left: 13, top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }}><Phone size={14} color={focused === 'phone' ? '#2145fb' : '#cbd5e1'} /></div>
                <input type="tel" required placeholder="+91 XXXXX XXXXX" style={fi('phone')} value={form.phone} onFocus={() => setFocused('phone')} onBlur={() => setFocused('')} onChange={e => setForm({ ...form, phone: e.target.value })} />
              </div>
            </div>

            {/* Service */}
            <div>
              <label style={labelStyle}>I am looking for</label>
              <div style={{ position: 'relative' }}>
                <div style={{ position: 'absolute', left: 13, top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }}><Briefcase size={14} color={focused === 'service' ? '#2145fb' : '#cbd5e1'} /></div>
                <select required style={{ ...fi('service'), cursor: 'pointer' }} value={form.service} onFocus={() => setFocused('service')} onBlur={() => setFocused('')} onChange={e => setForm({ ...form, service: e.target.value })}>
                  <option value="">Select a service...</option>
                  <option value="cap">Career Growth in India (CAP)</option>
                  <option value="study">Study Abroad</option>
                  <option value="both">Both</option>
                </select>
              </div>
            </div>

            {/* Password */}
            <div>
              <label style={labelStyle}>Create Password</label>
              <div style={{ position: 'relative' }}>
                <div style={{ position: 'absolute', left: 13, top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }}><Lock size={14} color={focused === 'pass' ? '#2145fb' : '#cbd5e1'} /></div>
                <input type={showPass ? 'text' : 'password'} required placeholder="Min. 8 characters" style={{ ...fi('pass'), paddingRight: '42px' }} value={form.password} onFocus={() => setFocused('pass')} onBlur={() => setFocused('')} onChange={e => setForm({ ...form, password: e.target.value })} />
                <button type="button" onClick={() => setShowPass(v => !v)} style={{ position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', display: 'flex', padding: 2 }}>
                  {showPass ? <EyeOff size={15} color="#94a3b8" /> : <Eye size={15} color="#94a3b8" />}
                </button>
              </div>
            </div>

            {/* Zero cost badge */}
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', background: '#f0fdf4', border: '1px solid #bbf7d0', borderRadius: '10px', padding: '11px 13px' }}>
              <CheckCircle2 size={15} color="#16a34a" style={{ flexShrink: 0, marginTop: '1px' }} />
              <p style={{ fontSize: '12px', color: '#15803d', lineHeight: 1.5, margin: 0 }}>
                <strong>Zero upfront.</strong> Pay only after you are placed or enrolled.
              </p>
            </div>

            <button type="submit" disabled={loading} style={{ width: '100%', padding: '13px', background: loading ? '#93a5fd' : '#2145fb', color: '#fff', fontWeight: 700, fontSize: '15px', fontFamily: "'Poppins', sans-serif", border: 'none', borderRadius: '10px', cursor: loading ? 'not-allowed' : 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', boxShadow: '0 4px 18px rgba(33,69,251,0.28)' }}>
              {loading ? 'Creating account...' : <><span>Create Free Account</span><ArrowRight size={16} /></>}
            </button>
          </form>

          <p style={{ fontSize: '12px', color: '#94a3b8', textAlign: 'center', marginTop: '20px', lineHeight: 1.6 }}>
            By signing up you agree to our{' '}
            <Link href="/terms" style={{ color: '#64748b', textDecoration: 'underline' }}>Terms</Link>
            {' '}and{' '}
            <Link href="/privacy" style={{ color: '#64748b', textDecoration: 'underline' }}>Privacy Policy</Link>.
          </p>
        </div>
      </div>
    </div>
  );
}
