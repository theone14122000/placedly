'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { signIn } from 'next-auth/react';
import {
  Eye, EyeOff, Mail, Lock, ArrowRight,
  CheckCircle2, Sparkles,
} from 'lucide-react';

/* ── Design tokens ── */
const ORANGE        = '#f97316';
const ORANGE_DARK   = '#ea580c';
const ORANGE_SOFT   = 'rgba(249,115,22,0.08)';
const ORANGE_BORDER = 'rgba(249,115,22,0.22)';
const ORANGE_RING   = 'rgba(249,115,22,0.15)';
const BLACK         = '#0b0d20';
const BODY          = '#374151';
const MUTED         = '#64748b';
const BORDER        = '#e5e7eb';
const SURFACE       = '#ffffff';
const BG_ALT        = '#f9fafb';
const FONT          = `'Inter','Manrope','Geist','Plus Jakarta Sans',system-ui,sans-serif`;

const PERKS = [
  'Single secure login for every portal',
  'Directed automatically to your dashboard',
  'Access your pipeline, progress & referrals',
];

type LoginState = 'idle' | 'loading';

export default function LoginPage() {
  const [focused, setFocused]         = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [form, setForm]               = useState({ email: '', password: '' });
  const [state, setState]             = useState<LoginState>('idle');
  const [error, setError]             = useState('');

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get('error')) {
      setError('Invalid email or password. Please check your credentials and try again.');
      setState('idle');
    }
  }, []);

  /* input style — orange focus */
  const fi = (n: string): React.CSSProperties => ({
    display: 'block', width: '100%',
    padding: '12px 14px 12px 42px',
    border: `1.5px solid ${
      focused === n ? ORANGE : error ? '#ef4444' : BORDER
    }`,
    borderRadius: '10px',
    fontSize: '14px',
    fontFamily: FONT,
    color: BLACK,
    background: focused === n ? SURFACE : BG_ALT,
    outline: 'none',
    boxSizing: 'border-box',
    boxShadow: focused === n ? `0 0 0 3px ${ORANGE_RING}` : 'none',
    transition: 'border-color .18s, box-shadow .18s, background .18s',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setState('loading');
    setError('');
    await signIn('credentials', {
      email:       form.email,
      password:    form.password,
      callbackUrl: '/auth/redirect',
    });
  };

  return (
    <div className="al-root">
      <style>{`
        /* ── Font ── */
        .al-root, .al-root * {
          font-family: ${FONT};
          box-sizing: border-box;
        }

        /* ── Keyframes ── */
        @keyframes al-fade-up {
          from { opacity:0; transform:translateY(18px); }
          to   { opacity:1; transform:translateY(0);    }
        }
        @keyframes al-fade-in {
          from { opacity:0; }
          to   { opacity:1; }
        }
        @keyframes al-pulse-ring {
          0%  { box-shadow: 0 0 0 0   rgba(249,115,22,0.45); }
          70% { box-shadow: 0 0 0 8px rgba(249,115,22,0);    }
          100%{ box-shadow: 0 0 0 0   rgba(249,115,22,0);    }
        }
        @keyframes al-float {
          0%,100%{ transform:translateY(0);    }
          50%    { transform:translateY(-7px); }
        }
        @keyframes al-spin {
          to { transform: rotate(360deg); }
        }

        /* ── Layout ── */
        .al-root {
          min-height: 100vh;
          display: flex;
        }

        /* ── Left panel ── */
        .al-left {
          width: 44%;
          background: ${BLACK};
          display: flex;
          flex-direction: column;
          padding: 40px 48px;
          position: relative;
          overflow: hidden;
        }
        .al-left-blob1 {
          position: absolute;
          top: -160px; right: -160px;
          width: 440px; height: 440px;
          border-radius: 50%;
          background: rgba(249,115,22,0.12);
          pointer-events: none;
          animation: al-float 10s ease-in-out infinite;
        }
        .al-left-blob2 {
          position: absolute;
          bottom: -100px; left: -100px;
          width: 340px; height: 340px;
          border-radius: 50%;
          background: rgba(249,115,22,0.07);
          pointer-events: none;
          animation: al-float 13s ease-in-out 1.5s infinite reverse;
        }

        /* section label on left */
        .al-portal-label {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          margin-bottom: 20px;
          animation: al-fade-up 0.5s ease both;
        }
        .al-portal-label-bar {
          width: 20px; height: 3px;
          border-radius: 999px;
          background: ${ORANGE};
        }
        .al-portal-label-text {
          font-size: 11px;
          font-weight: 700;
          color: ${ORANGE};
          letter-spacing: 0.1em;
          text-transform: uppercase;
        }

        /* heading */
        .al-heading {
          font-size: clamp(1.6rem,2.6vw,2.5rem);
          font-weight: 900;
          color: #fff;
          line-height: 1.12;
          letter-spacing: -0.03em;
          margin: 0 0 14px;
          animation: al-fade-up 0.5s 0.06s ease both;
        }
        .al-heading-accent { color: ${ORANGE}; }

        /* sub */
        .al-sub {
          font-size: 14px;
          color: rgba(255,255,255,0.55);
          line-height: 1.75;
          margin: 0 0 36px;
          max-width: 340px;
          animation: al-fade-up 0.5s 0.12s ease both;
        }

        /* perks */
        .al-perks {
          display: flex;
          flex-direction: column;
          gap: 11px;
          animation: al-fade-up 0.5s 0.18s ease both;
        }
        .al-perk {
          display: flex;
          align-items: flex-start;
          gap: 10px;
        }
        .al-perk-icon {
          flex-shrink: 0;
          margin-top: 2px;
          color: ${ORANGE};
          animation: al-pulse-ring 3s ease-out infinite;
          border-radius: 50%;
        }
        .al-perk-text {
          font-size: 13px;
          color: rgba(255,255,255,0.70);
          line-height: 1.5;
        }

        /* ── Right panel ── */
        .al-right {
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 48px 40px;
          background: ${SURFACE};
        }
        .al-form-wrap {
          width: 100%;
          max-width: 400px;
          animation: al-fade-up 0.55s 0.1s ease both;
        }

        /* Form heading */
        .al-form-title {
          font-size: 26px;
          font-weight: 900;
          color: ${BLACK};
          letter-spacing: -0.03em;
          margin: 0 0 6px;
        }
        .al-form-sub {
          font-size: 14px;
          color: ${MUTED};
          margin: 0 0 24px;
        }

        /* Error box */
        .al-error {
          padding: 11px 14px;
          background: #fef2f2;
          border: 1px solid #fecaca;
          border-radius: 10px;
          font-size: 13px;
          color: #dc2626;
          margin-bottom: 16px;
          line-height: 1.6;
          animation: al-fade-in 0.3s ease both;
        }

        /* Field label */
        .al-label {
          display: block;
          font-size: 11px;
          font-weight: 700;
          color: ${BODY};
          letter-spacing: 0.06em;
          text-transform: uppercase;
          margin-bottom: 6px;
        }

        /* Submit button */
        .al-submit {
          width: 100%;
          padding: 13px;
          margin-top: 4px;
          background: ${ORANGE};
          color: #fff;
          font-weight: 700;
          font-size: 15px;
          font-family: ${FONT};
          border: 1px solid ${ORANGE_DARK};
          border-radius: 10px;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          box-shadow: 0 4px 18px rgba(249,115,22,0.28);
          transition: transform .2s ease, box-shadow .2s ease, filter .2s ease;
        }
        .al-submit:hover:not(:disabled) {
          transform: translateY(-2px);
          box-shadow: 0 8px 24px rgba(249,115,22,0.36);
          filter: brightness(1.06);
        }
        .al-submit:active:not(:disabled) {
          transform: translateY(0);
          filter: brightness(0.95);
        }
        .al-submit:disabled {
          opacity: 0.68;
          cursor: not-allowed;
        }

        /* Spinner */
        .al-spinner {
          width: 15px; height: 15px;
          border: 2px solid rgba(255,255,255,0.30);
          border-top-color: #fff;
          border-radius: 50%;
          animation: al-spin 0.7s linear infinite;
          display: inline-block;
        }

        /* Note box */
        .al-note {
          margin-top: 24px;
          padding: 14px 16px;
          background: ${ORANGE_SOFT};
          border-radius: 10px;
          border: 1px solid ${ORANGE_BORDER};
          font-size: 12px;
          color: ${MUTED};
          line-height: 1.7;
        }

        /* Password toggle button */
        .al-pw-toggle {
          position: absolute;
          right: 12px;
          top: 50%;
          transform: translateY(-50%);
          background: none;
          border: none;
          cursor: pointer;
          display: flex;
          padding: 2px;
          color: ${MUTED};
          transition: color .18s;
        }
        .al-pw-toggle:hover { color: ${ORANGE}; }

        /* ── Mobile logo ── */
        .al-mobile-logo { display: none; margin-bottom: 28px; }

        /* ── Responsive ── */
        @media (max-width: 820px) {
          .al-root    { flex-direction: column; }
          .al-left    { display: none; }
          .al-right   { padding: 40px 24px; min-height: 100vh; align-items: flex-start; padding-top: 60px; }
          .al-mobile-logo { display: block; }
          .al-form-wrap { max-width: 100%; }
        }
      `}</style>

      {/* ══════════════════════════════════════════
          LEFT — brand panel
      ══════════════════════════════════════════ */}
      <div className="al-left">
        <span aria-hidden className="al-left-blob1" />
        <span aria-hidden className="al-left-blob2" />

        {/* Logo */}
        <Link href="/" style={{
          display: 'inline-flex', alignItems: 'center',
          textDecoration: 'none', marginBottom: 'auto',
          position: 'relative', zIndex: 1,
        }}>
          <img src="/logo.png" alt="Placedly" style={{ height: '52px', width: 'auto' }} />
        </Link>

        {/* Copy */}
        <div style={{
          flex: 1, display: 'flex', flexDirection: 'column',
          justifyContent: 'center', paddingBottom: '40px',
          position: 'relative', zIndex: 1,
        }}>
          {/* Portal label */}
          <div className="al-portal-label">
            <span className="al-portal-label-bar" />
            <span className="al-portal-label-text">
              Member Sign In
            </span>
          </div>

          {/* Heading */}
          <h1 className="al-heading">
            Welcome back to{' '}
            <span className="al-heading-accent">Placedly</span>
          </h1>

          {/* Sub */}
          <p className="al-sub">
            Log in once with your credentials and we will take you straight to your dashboard.
          </p>

          {/* Perks */}
          <div className="al-perks">
            {PERKS.map((perk, i) => (
              <div key={perk} className="al-perk" style={{ animationDelay: `${0.18 + i * 0.06}s` }}>
                <CheckCircle2
                  size={15}
                  strokeWidth={2.5}
                  className="al-perk-icon"
                  style={{ animationDelay: `${i * 0.4}s` }}
                />
                <span className="al-perk-text">{perk}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ══════════════════════════════════════════
          RIGHT — form panel
      ══════════════════════════════════════════ */}
      <div className="al-right">
        <div className="al-form-wrap">

          {/* Mobile logo */}
          <Link href="/" className="al-mobile-logo">
            <img src="/logo.png" alt="Placedly" style={{ height: '44px', width: 'auto' }} />
          </Link>

          {/* Heading */}
          <div style={{ marginBottom: '24px' }}>
            <h2 className="al-form-title">Sign in</h2>
            <p className="al-form-sub">
              Enter your email and password to access your portal.
            </p>
          </div>

          {/* Error */}
          {error && <div className="al-error">{error}</div>}

          {/* Form */}
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>

            {/* Email */}
            <div>
              <label className="al-label">Email</label>
              <div style={{ position: 'relative' }}>
                <div style={{
                  position: 'absolute', left: 13, top: '50%',
                  transform: 'translateY(-50%)', pointerEvents: 'none',
                }}>
                  <Mail size={15} color={focused === 'email' ? ORANGE : '#cbd5e1'} />
                </div>
                <input
                  type="email" required placeholder="you@email.com"
                  style={fi('email')} value={form.email}
                  onFocus={() => setFocused('email')}
                  onBlur={() => setFocused('')}
                  onChange={e => setForm({ ...form, email: e.target.value })}
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="al-label">Password</label>
              <div style={{ position: 'relative' }}>
                <div style={{
                  position: 'absolute', left: 13, top: '50%',
                  transform: 'translateY(-50%)', pointerEvents: 'none',
                }}>
                  <Lock size={15} color={focused === 'password' ? ORANGE : '#cbd5e1'} />
                </div>
                <input
                  type={showPassword ? 'text' : 'password'}
                  required placeholder="Your password"
                  style={{ ...fi('password'), paddingRight: '42px' }}
                  value={form.password}
                  onFocus={() => setFocused('password')}
                  onBlur={() => setFocused('')}
                  onChange={e => setForm({ ...form, password: e.target.value })}
                />
                <button
                  type="button"
                  className="al-pw-toggle"
                  onClick={() => setShowPassword(v => !v)}
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword
                    ? <EyeOff size={15} />
                    : <Eye    size={15} />
                  }
                </button>
              </div>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={state === 'loading'}
              className="al-submit"
            >
              {state === 'loading'
                ? <><span className="al-spinner" /> Signing in…</>
                : <><span>Sign In</span><ArrowRight size={16} /></>
              }
            </button>
          </form>

          {/* Note */}
          <div className="al-note">
            <div style={{
              display: 'flex', alignItems: 'center', gap: '6px',
              marginBottom: '6px',
            }}>
              <Sparkles size={12} color={ORANGE} />
              <span style={{ fontSize: '11px', fontWeight: 700, color: ORANGE, textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                Access Info
              </span>
            </div>
            After signing in you will be redirected automatically to the correct dashboard for your role.
          </div>

        </div>
      </div>
    </div>
  );
}
