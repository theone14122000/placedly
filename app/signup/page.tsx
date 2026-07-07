'use client';

import { useState } from 'react';
import Link from 'next/link';
import { signIn } from 'next-auth/react';
import {
  Eye, EyeOff, Mail, Lock, User,
  Phone, ArrowRight, CheckCircle2, Briefcase, Sparkles,
} from 'lucide-react';

/* ── Design tokens ── */
const ORANGE        = '#f97316';
const ORANGE_DARK   = '#ea580c';
const ORANGE_SOFT   = 'rgba(249,115,22,0.08)';
const ORANGE_MED    = 'rgba(249,115,22,0.14)';
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
  'Zero upfront cost — pay after placement',
  'Direct connect to 50+ hiring partners',
  'Resume rebuild + 3 mock interviews',
  'Dedicated advisor throughout your journey',
];

const STATS = [
  { n: '9 days', l: 'Fastest Placed'   },
  { n: '40%+',   l: 'Avg Salary Hike'  },
  { n: '50+',    l: 'Hiring Partners'  },
];

export default function SignupPage() {
  const [focused,  setFocused]  = useState('');
  const [showPass, setShowPass] = useState(false);
  const [loading,  setLoading]  = useState(false);
  const [form, setForm] = useState({
    firstName: '', lastName: '', email: '',
    phone: '', password: '', service: '',
  });

  /* input style — orange focus */
  const fi = (n: string): React.CSSProperties => ({
    display: 'block', width: '100%',
    padding: '12px 14px 12px 42px',
    border: `1.5px solid ${focused === n ? ORANGE : BORDER}`,
    borderRadius: '10px',
    fontSize: '14px',
    fontFamily: FONT,
    color: BLACK,
    background: focused === n ? SURFACE : BG_ALT,
    outline: 'none',
    boxShadow: focused === n ? `0 0 0 3px ${ORANGE_RING}` : 'none',
    appearance: 'none' as const,
    WebkitAppearance: 'none' as const,
    boxSizing: 'border-box' as const,
    transition: 'border-color .18s, box-shadow .18s, background .18s',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => setLoading(false), 1500);
  };

  return (
    <div className="sg-root">
      <style>{`
        /* ── Font ── */
        .sg-root, .sg-root * {
          font-family: ${FONT};
          box-sizing: border-box;
        }

        /* ── Keyframes ── */
        @keyframes sg-fade-up {
          from { opacity:0; transform:translateY(18px); }
          to   { opacity:1; transform:translateY(0);    }
        }
        @keyframes sg-fade-in {
          from { opacity:0; }
          to   { opacity:1; }
        }
        @keyframes sg-pulse-ring {
          0%  { box-shadow: 0 0 0 0   rgba(249,115,22,0.45); }
          70% { box-shadow: 0 0 0 8px rgba(249,115,22,0);    }
          100%{ box-shadow: 0 0 0 0   rgba(249,115,22,0);    }
        }
        @keyframes sg-float {
          0%,100%{ transform:translateY(0);    }
          50%    { transform:translateY(-8px); }
        }
        @keyframes sg-spin {
          to { transform: rotate(360deg); }
        }
        @keyframes sg-shimmer {
          0%  { background-position:-400px 0; }
          100%{ background-position: 400px 0; }
        }

        /* ── Layout ── */
        .sg-root {
          min-height: 100vh;
          display: flex;
        }

        /* ── Left panel ── */
        .sg-left {
          width: 40%;
          background: ${BLACK};
          display: flex;
          flex-direction: column;
          padding: 40px 48px;
          position: relative;
          overflow: hidden;
        }
        .sg-blob1 {
          position: absolute;
          top: -160px; right: -160px;
          width: 400px; height: 400px;
          border-radius: 50%;
          background: rgba(249,115,22,0.12);
          pointer-events: none;
          animation: sg-float 10s ease-in-out infinite;
        }
        .sg-blob2 {
          position: absolute;
          bottom: -80px; left: -80px;
          width: 300px; height: 300px;
          border-radius: 50%;
          background: rgba(249,115,22,0.07);
          pointer-events: none;
          animation: sg-float 13s ease-in-out 1.5s infinite reverse;
        }

        /* label strip */
        .sg-label-strip {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          margin-bottom: 20px;
          animation: sg-fade-up 0.5s ease both;
        }
        .sg-label-bar {
          width: 20px; height: 3px;
          border-radius: 999px;
          background: ${ORANGE};
        }
        .sg-label-text {
          font-size: 11px;
          font-weight: 700;
          color: ${ORANGE};
          letter-spacing: 0.1em;
          text-transform: uppercase;
        }

        /* heading */
        .sg-heading {
          font-size: clamp(1.6rem,2.5vw,2.4rem);
          font-weight: 900;
          color: #fff;
          line-height: 1.12;
          letter-spacing: -0.03em;
          margin: 0 0 14px;
          animation: sg-fade-up 0.5s 0.06s ease both;
        }
        .sg-heading-accent { color: ${ORANGE}; }

        /* sub */
        .sg-sub {
          font-size: 14px;
          color: rgba(255,255,255,0.55);
          line-height: 1.75;
          margin: 0 0 36px;
          max-width: 320px;
          animation: sg-fade-up 0.5s 0.12s ease both;
        }

        /* perks */
        .sg-perks {
          display: flex;
          flex-direction: column;
          gap: 11px;
          animation: sg-fade-up 0.5s 0.18s ease both;
        }
        .sg-perk {
          display: flex;
          align-items: flex-start;
          gap: 10px;
        }
        .sg-perk-icon {
          flex-shrink: 0;
          margin-top: 2px;
          color: ${ORANGE};
          border-radius: 50%;
          animation: sg-pulse-ring 3s ease-out infinite;
        }
        .sg-perk-text {
          font-size: 13px;
          color: rgba(255,255,255,0.70);
          line-height: 1.5;
        }

        /* stats */
        .sg-stats {
          display: grid;
          grid-template-columns: repeat(3,1fr);
          border-top: 1px solid rgba(255,255,255,0.07);
          padding-top: 24px;
          gap: 12px;
          margin-top: auto;
          animation: sg-fade-in 0.6s 0.3s ease both;
        }
        .sg-stat {
          text-align: center;
          cursor: default;
          transition: transform .2s ease;
        }
        .sg-stat:hover { transform: translateY(-2px); }
        .sg-stat-num {
          font-size: 17px;
          font-weight: 900;
          color: #fff;
          line-height: 1;
          transition: color .2s;
        }
        .sg-stat:hover .sg-stat-num { color: ${ORANGE}; }
        .sg-stat-label {
          font-size: 10px;
          color: rgba(255,255,255,0.35);
          margin-top: 3px;
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }

        /* ── Right panel ── */
        .sg-right {
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 40px;
          background: ${SURFACE};
          overflow-y: auto;
        }
        .sg-form-wrap {
          width: 100%;
          max-width: 420px;
          animation: sg-fade-up 0.55s 0.1s ease both;
        }

        /* heading */
        .sg-form-title {
          font-size: 24px;
          font-weight: 900;
          color: ${BLACK};
          letter-spacing: -0.03em;
          margin: 0 0 6px;
        }
        .sg-form-sub {
          font-size: 14px;
          color: ${MUTED};
          margin: 0 0 24px;
        }
        .sg-form-sub a {
          color: ${ORANGE};
          font-weight: 600;
          text-decoration: none;
          transition: color .18s;
        }
        .sg-form-sub a:hover { color: ${ORANGE_DARK}; }

        /* Google button */
        .sg-google-btn {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          width: 100%;
          padding: 12px;
          border: 1.5px solid ${BORDER};
          border-radius: 10px;
          font-size: 14px;
          font-weight: 600;
          color: ${BODY};
          background: ${SURFACE};
          cursor: pointer;
          font-family: ${FONT};
          margin-bottom: 20px;
          transition: border-color .2s ease, background .2s ease,
                      box-shadow .2s ease, transform .2s ease;
        }
        .sg-google-btn:hover {
          border-color: ${ORANGE_BORDER};
          background: ${ORANGE_SOFT};
          box-shadow: 0 4px 14px rgba(249,115,22,0.10);
          transform: translateY(-1px);
        }
        .sg-google-btn:active { transform: translateY(0); }

        /* divider */
        .sg-divider {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-bottom: 20px;
        }
        .sg-divider-line {
          flex: 1; height: 1px;
          background: linear-gradient(90deg, transparent, ${BORDER}, transparent);
        }
        .sg-divider-text {
          font-size: 12px;
          color: #94a3b8;
          white-space: nowrap;
        }

        /* field label */
        .sg-label {
          display: block;
          font-size: 11px;
          font-weight: 700;
          color: ${BODY};
          letter-spacing: 0.06em;
          text-transform: uppercase;
          margin-bottom: 6px;
        }

        /* name row */
        .sg-name-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 12px;
        }

        /* password toggle */
        .sg-pw-toggle {
          position: absolute;
          right: 12px; top: 50%;
          transform: translateY(-50%);
          background: none; border: none;
          cursor: pointer; display: flex; padding: 2px;
          color: ${MUTED};
          transition: color .18s;
        }
        .sg-pw-toggle:hover { color: ${ORANGE}; }

        /* zero-cost badge */
        .sg-zero-badge {
          display: flex;
          align-items: flex-start;
          gap: 10px;
          background: ${ORANGE_SOFT};
          border: 1px solid ${ORANGE_BORDER};
          border-radius: 10px;
          padding: 12px 14px;
          transition: background .2s ease;
        }
        .sg-zero-badge:hover { background: ${ORANGE_MED}; }
        .sg-zero-badge-text {
          font-size: 12px;
          color: ${ORANGE_DARK};
          line-height: 1.5;
          margin: 0;
        }
        .sg-zero-badge-text strong { font-weight: 800; color: ${BLACK}; }

        /* submit button */
        .sg-submit {
          width: 100%;
          padding: 13px;
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
        .sg-submit:hover:not(:disabled) {
          transform: translateY(-2px);
          box-shadow: 0 8px 24px rgba(249,115,22,0.36);
          filter: brightness(1.06);
        }
        .sg-submit:active:not(:disabled) {
          transform: translateY(0);
          filter: brightness(0.95);
        }
        .sg-submit:disabled {
          opacity: 0.68;
          cursor: not-allowed;
        }

        /* spinner */
        .sg-spinner {
          width: 15px; height: 15px;
          border: 2px solid rgba(255,255,255,0.30);
          border-top-color: #fff;
          border-radius: 50%;
          animation: sg-spin 0.7s linear infinite;
          display: inline-block;
          flex-shrink: 0;
        }

        /* legal text */
        .sg-legal {
          font-size: 12px;
          color: #94a3b8;
          text-align: center;
          margin-top: 20px;
          line-height: 1.6;
        }
        .sg-legal a {
          color: ${MUTED};
          text-decoration: underline;
          transition: color .18s;
        }
        .sg-legal a:hover { color: ${ORANGE}; }

        /* mobile logo */
        .sg-mobile-logo { display: none; margin-bottom: 24px; }

        /* ── Responsive ── */
        @media (max-width: 820px) {
          .sg-root  { flex-direction: column; }
          .sg-left  { display: none; }
          .sg-right {
            padding: 40px 24px;
            min-height: 100vh;
            align-items: flex-start;
            padding-top: 60px;
          }
          .sg-mobile-logo { display: block; }
          .sg-form-wrap   { max-width: 100%; }
        }
        @media (max-width: 420px) {
          .sg-name-row { grid-template-columns: 1fr; }
        }
      `}</style>

      {/* ══════════════════════════════════════════
          LEFT — brand panel
      ══════════════════════════════════════════ */}
      <div className="sg-left">
        <span aria-hidden className="sg-blob1" />
        <span aria-hidden className="sg-blob2" />

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
          <div className="sg-label-strip">
            <span className="sg-label-bar" />
            <span className="sg-label-text">Free to Join</span>
          </div>

          <h1 className="sg-heading">
            Start your career<br />
            <span className="sg-heading-accent">transformation today.</span>
          </h1>

          <p className="sg-sub">
            Join 300+ professionals who trusted Placedly to land better roles and bigger salaries.
          </p>

          <div className="sg-perks">
            {PERKS.map((p, i) => (
              <div key={p} className="sg-perk">
                <CheckCircle2
                  size={15}
                  strokeWidth={2.5}
                  className="sg-perk-icon"
                  style={{ animationDelay: `${i * 0.5}s` }}
                />
                <span className="sg-perk-text">{p}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Stats */}
        <div className="sg-stats" style={{ position: 'relative', zIndex: 1 }}>
          {STATS.map(s => (
            <div key={s.n} className="sg-stat">
              <div className="sg-stat-num">{s.n}</div>
              <div className="sg-stat-label">{s.l}</div>
            </div>
          ))}
        </div>
      </div>

      {/* ══════════════════════════════════════════
          RIGHT — form panel
      ══════════════════════════════════════════ */}
      <div className="sg-right">
        <div className="sg-form-wrap">

          {/* Mobile logo */}
          <Link href="/" className="sg-mobile-logo">
            <img src="/logo.png" alt="Placedly" style={{ height: '44px', width: 'auto' }} />
          </Link>

          {/* Heading */}
          <h2 className="sg-form-title">Create your account</h2>
          <p className="sg-form-sub">
            Already have one?{' '}
            <Link href="/login">Sign in →</Link>
          </p>

          {/* Google */}
          <button
            type="button"
            className="sg-google-btn"
            onClick={() => signIn('google')}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden>
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"/>
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
            </svg>
            Continue with Google
          </button>

          {/* Divider */}
          <div className="sg-divider">
            <span className="sg-divider-line" />
            <span className="sg-divider-text">or fill the form</span>
            <span className="sg-divider-line" />
          </div>

          {/* Form */}
          <form
            onSubmit={handleSubmit}
            style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}
          >
            {/* Name row */}
            <div className="sg-name-row">
              <div>
                <label className="sg-label">First Name</label>
                <div style={{ position: 'relative' }}>
                  <div style={{
                    position: 'absolute', left: 13, top: '50%',
                    transform: 'translateY(-50%)', pointerEvents: 'none',
                  }}>
                    <User size={14} color={focused === 'first' ? ORANGE : '#cbd5e1'} />
                  </div>
                  <input
                    required placeholder="First"
                    style={fi('first')} value={form.firstName}
                    onFocus={() => setFocused('first')}
                    onBlur={() => setFocused('')}
                    onChange={e => setForm({ ...form, firstName: e.target.value })}
                  />
                </div>
              </div>
              <div>
                <label className="sg-label">Last Name</label>
                <div style={{ position: 'relative' }}>
                  <div style={{
                    position: 'absolute', left: 13, top: '50%',
                    transform: 'translateY(-50%)', pointerEvents: 'none',
                  }}>
                    <User size={14} color={focused === 'last' ? ORANGE : '#cbd5e1'} />
                  </div>
                  <input
                    required placeholder="Last"
                    style={fi('last')} value={form.lastName}
                    onFocus={() => setFocused('last')}
                    onBlur={() => setFocused('')}
                    onChange={e => setForm({ ...form, lastName: e.target.value })}
                  />
                </div>
              </div>
            </div>

            {/* Email */}
            <div>
              <label className="sg-label">Email Address</label>
              <div style={{ position: 'relative' }}>
                <div style={{
                  position: 'absolute', left: 13, top: '50%',
                  transform: 'translateY(-50%)', pointerEvents: 'none',
                }}>
                  <Mail size={14} color={focused === 'email' ? ORANGE : '#cbd5e1'} />
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

            {/* Phone */}
            <div>
              <label className="sg-label">WhatsApp Number</label>
              <div style={{ position: 'relative' }}>
                <div style={{
                  position: 'absolute', left: 13, top: '50%',
                  transform: 'translateY(-50%)', pointerEvents: 'none',
                }}>
                  <Phone size={14} color={focused === 'phone' ? ORANGE : '#cbd5e1'} />
                </div>
                <input
                  type="tel" required placeholder="+91 XXXXX XXXXX"
                  style={fi('phone')} value={form.phone}
                  onFocus={() => setFocused('phone')}
                  onBlur={() => setFocused('')}
                  onChange={e => setForm({ ...form, phone: e.target.value })}
                />
              </div>
            </div>

            {/* Service */}
            <div>
              <label className="sg-label">I am looking for</label>
              <div style={{ position: 'relative' }}>
                <div style={{
                  position: 'absolute', left: 13, top: '50%',
                  transform: 'translateY(-50%)', pointerEvents: 'none',
                }}>
                  <Briefcase size={14} color={focused === 'service' ? ORANGE : '#cbd5e1'} />
                </div>
                <select
                  required
                  style={{ ...fi('service'), cursor: 'pointer' }}
                  value={form.service}
                  onFocus={() => setFocused('service')}
                  onBlur={() => setFocused('')}
                  onChange={e => setForm({ ...form, service: e.target.value })}
                >
                  <option value="">Select a service...</option>
                  <option value="cap">Career Growth in India (CAP)</option>
                  <option value="study">Study Abroad</option>
                  <option value="both">Both</option>
                </select>
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="sg-label">Create Password</label>
              <div style={{ position: 'relative' }}>
                <div style={{
                  position: 'absolute', left: 13, top: '50%',
                  transform: 'translateY(-50%)', pointerEvents: 'none',
                }}>
                  <Lock size={14} color={focused === 'pass' ? ORANGE : '#cbd5e1'} />
                </div>
                <input
                  type={showPass ? 'text' : 'password'}
                  required placeholder="Min. 8 characters"
                  style={{ ...fi('pass'), paddingRight: '42px' }}
                  value={form.password}
                  onFocus={() => setFocused('pass')}
                  onBlur={() => setFocused('')}
                  onChange={e => setForm({ ...form, password: e.target.value })}
                />
                <button
                  type="button"
                  className="sg-pw-toggle"
                  onClick={() => setShowPass(v => !v)}
                  aria-label={showPass ? 'Hide password' : 'Show password'}
                >
                  {showPass ? <EyeOff size={15} /> : <Eye size={15} />}
                </button>
              </div>
            </div>

            {/* Zero cost badge */}
            <div className="sg-zero-badge">
              <Sparkles size={15} color={ORANGE} style={{ flexShrink: 0, marginTop: '1px' }} />
              <p className="sg-zero-badge-text">
                <strong>Zero upfront.</strong>{' '}
                Pay only after you are placed or enrolled.
              </p>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="sg-submit"
            >
              {loading
                ? <><span className="sg-spinner" /> Creating account…</>
                : <><span>Create Free Account</span><ArrowRight size={16} /></>
              }
            </button>
          </form>

          {/* Legal */}
          <p className="sg-legal">
            By signing up you agree to our{' '}
            <Link href="/terms">Terms</Link>
            {' '}and{' '}
            <Link href="/privacy">Privacy Policy</Link>.
          </p>

        </div>
      </div>
    </div>
  );
}