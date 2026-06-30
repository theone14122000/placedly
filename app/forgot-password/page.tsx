'use client';
import { useState } from 'react';
import Link from 'next/link';
import { Mail, ArrowLeft, CheckCircle2 } from 'lucide-react';

const inputBase: React.CSSProperties = {
  display: 'block', width: '100%',
  padding: '12px 14px 12px 42px',
  border: '1.5px solid #e2e8f0', borderRadius: '10px',
  fontSize: '14px', fontFamily: "'Poppins', sans-serif",
  color: '#0b0d20', background: '#f8faff',
  outline: 'none', boxSizing: 'border-box' as const,
  transition: 'border-color 0.15s, box-shadow 0.15s',
};

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [focused, setFocused] = useState(false);
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  const inputStyle: React.CSSProperties = {
    ...inputBase,
    borderColor: focused ? '#2145fb' : '#e2e8f0',
    background: focused ? '#fff' : '#f8faff',
    boxShadow: focused ? '0 0 0 3px rgba(33,69,251,0.10)' : 'none',
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => { setLoading(false); setSent(true); }, 1500);
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#f8faff', fontFamily: "'Poppins', sans-serif", padding: '24px' }}>
      <div style={{ width: '100%', maxWidth: '420px' }}>

        {/* Logo */}
        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <Link href="/">
            <img src="/logo.png" alt="Placedly" style={{ height: '48px', width: 'auto' }} />
          </Link>
        </div>

        <div style={{ background: '#fff', borderRadius: '20px', padding: '40px 36px', boxShadow: '0 4px 24px rgba(0,0,0,0.07)', border: '1px solid #eef0f6' }}>

          {!sent ? (
            <>
              <div style={{ marginBottom: '28px' }}>
                <h1 style={{ fontSize: '24px', fontWeight: 900, color: '#0b0d20', letterSpacing: '-0.5px', marginBottom: '8px' }}>
                  Forgot password?
                </h1>
                <p style={{ fontSize: '14px', color: '#64748b', lineHeight: 1.6 }}>
                  Enter your registered email and we&apos;ll send a reset link within a few minutes.
                </p>
              </div>

              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '11px', fontWeight: 600, color: '#374151', letterSpacing: '0.5px', textTransform: 'uppercase' as const, marginBottom: '6px' }}>
                    Email Address
                  </label>
                  <div style={{ position: 'relative' }}>
                    <div style={{ position: 'absolute', left: 13, top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }}>
                      <Mail size={15} color={focused ? '#2145fb' : '#cbd5e1'} />
                    </div>
                    <input
                      type="email"
                      required
                      placeholder="you@email.com"
                      value={email}
                      style={inputStyle}
                      onFocus={() => setFocused(true)}
                      onBlur={() => setFocused(false)}
                      onChange={e => setEmail(e.target.value)}
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loading || !email}
                  style={{
                    width: '100%', padding: '13px',
                    background: loading || !email ? '#93a5fd' : '#2145fb',
                    color: '#fff', fontWeight: 700, fontSize: '15px',
                    fontFamily: "'Poppins', sans-serif",
                    border: 'none', borderRadius: '10px',
                    cursor: loading || !email ? 'not-allowed' : 'pointer',
                    boxShadow: '0 4px 18px rgba(33,69,251,0.25)',
                  }}
                >
                  {loading ? 'Sending…' : 'Send Reset Link'}
                </button>
              </form>
            </>
          ) : (
            <div style={{ textAlign: 'center', padding: '8px 0' }}>
              <div style={{ width: '56px', height: '56px', borderRadius: '50%', background: '#f0fdf4', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px' }}>
                <CheckCircle2 size={28} color="#16a34a" />
              </div>
              <h2 style={{ fontSize: '20px', fontWeight: 800, color: '#0b0d20', marginBottom: '10px' }}>Check your inbox</h2>
              <p style={{ fontSize: '14px', color: '#64748b', lineHeight: 1.65, marginBottom: '8px' }}>
                We&apos;ve sent a password reset link to
              </p>
              <p style={{ fontSize: '14px', fontWeight: 700, color: '#0b0d20', marginBottom: '28px' }}>{email}</p>
              <p style={{ fontSize: '13px', color: '#94a3b8', lineHeight: 1.6 }}>
                Didn&apos;t receive it? Check your spam folder or{' '}
                <button onClick={() => setSent(false)} style={{ background: 'none', border: 'none', color: '#2145fb', fontWeight: 600, fontSize: '13px', cursor: 'pointer', fontFamily: "'Poppins', sans-serif", padding: 0 }}>
                  try again
                </button>.
              </p>
            </div>
          )}
        </div>

        <div style={{ textAlign: 'center', marginTop: '24px' }}>
          <Link href="/login" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', fontSize: '13px', color: '#64748b', textDecoration: 'none', fontWeight: 500 }}>
            <ArrowLeft size={13} /> Back to Sign In
          </Link>
        </div>
      </div>
    </div>
  );
}
