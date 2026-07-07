'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { signIn } from 'next-auth/react';
import {
  Eye, EyeOff, Mail, Lock, ArrowRight,
  CheckCircle2, Users, Link2, GraduationCap,
  Sparkles,
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

/* ── CMS defaults ── */
const LOGIN_DEFAULTS: Record<string, string> = {
  'login:stat1Num': '300+', 'login:stat1Label': 'Placed',
  'login:stat2Num': '60%+', 'login:stat2Label': 'Avg Growth',
  'login:stat3Num': '₹0',   'login:stat3Label': 'Upfront',
  'login:adminHint': 'Admin & ops staff can log in on any tab.',
  'login:candidateLabel':   'Candidate',
  'login:candidateTagline': 'Welcome back to your career journey.',
  'login:candidateSub':     'Access granted only to approved CAP participants. Log in with the credentials sent to your email.',
  'login:candidatePerk1':   'Track your CAP programme progress in real time',
  'login:candidatePerk2':   'Access interview schedules & advisor feedback',
  'login:candidatePerk3':   'View and download your rebuilt resume',
  'login:candidatePerk4':   'Browse live job opportunities matched to your profile',
  'login:candidateNote':    'Credentials are sent by email after your CAP application is approved by our team.',
  'login:candidateCtaText': 'Apply for CAP →',
  'login:candidateCtaHref': '/cap/apply',
  'login:candidateCtaPre':  'Not enrolled yet?',
  'login:candidateErrMsg':  'Invalid email or password. If you applied for CAP, your account may still be pending approval.',
  'login:partnerLabel':     'Partner',
  'login:partnerTagline':   'Track your referrals and grow your earnings.',
  'login:partnerSub':       'Partner portal access for registered Placedly freelancers. Log in with your partner credentials.',
  'login:partnerPerk1':     'View all candidates referred via your link',
  'login:partnerPerk2':     'Track commission status and payout history',
  'login:partnerPerk3':     'Access training materials and SOP guides',
  'login:partnerPerk4':     'Copy your referral link and share instantly',
  'login:partnerNote':      'Partner accounts are created by the Placedly team. Contact us to become a partner.',
  'login:partnerErrMsg':    'Invalid email or password. Contact the Placedly team if you need access.',
  'login:recruiterLabel':   'Recruiter',
  'login:recruiterTagline': 'Manage your pipeline from screening to offer.',
  'login:recruiterSub':     'ATS portal for Placedly recruiters. Access your candidate pipeline, notes, and stage management.',
  'login:recruiterPerk1':   'Full ATS — screen, shortlist, and move candidates',
  'login:recruiterPerk2':   'Add call notes, interview feedback, and stage updates',
  'login:recruiterPerk3':   'Search and filter by role, stage, and status',
  'login:recruiterPerk4':   'Export candidate data to CSV',
  'login:recruiterNote':    'Recruiter accounts are set up by the Placedly operations team.',
  'login:recruiterErrMsg':  'Invalid email or password. Contact the Placedly team if you need access.',
};

/* ── Portal config — ALL orange ── */
const PORTAL_KEYS = ['candidate', 'partner', 'recruiter'] as const;
type PortalKey = typeof PORTAL_KEYS[number];

const PORTAL_META: Record<PortalKey, {
  Icon: typeof GraduationCap;
  legacyKey: string;
}> = {
  candidate: { Icon: GraduationCap, legacyKey: 'candidate' },
  partner:   { Icon: Link2,         legacyKey: 'freelancer' },
  recruiter: { Icon: Users,         legacyKey: 'recruiter'  },
};

type LoginState = 'idle' | 'loading';

export default function LoginPage() {
  const [portal, setPortal]           = useState<PortalKey>('candidate');
  const [focused, setFocused]         = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [form, setForm]               = useState({ email: '', password: '' });
  const [state, setState]             = useState<LoginState>('idle');
  const [error, setError]             = useState('');
  const [cms, setCms]                 = useState(LOGIN_DEFAULTS);

  useEffect(() => {
    fetch('/api/admin/content?prefix=login:')
      .then(r => r.json())
      .then((saved: Record<string, string>) => setCms({ ...LOGIN_DEFAULTS, ...saved }))
      .catch(() => {});
  }, []);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get('error')) {
      setError(g(`login:${portal}ErrMsg`));
      setState('idle');
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [portal, cms]);

  const g = (k: string) => cms[k] ?? LOGIN_DEFAULTS[k] ?? '';

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

  const switchPortal = (key: PortalKey) => {
    setPortal(key);
    setError('');
    setState('idle');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setState('loading');
    setError('');
    sessionStorage.setItem('placedly_login_portal', portal);
    await signIn('credentials', {
      email:       form.email,
      password:    form.password,
      callbackUrl: '/auth/redirect',
    });
  };

  const stats   = [1, 2, 3].map(i => ({ n: g(`login:stat${i}Num`), l: g(`login:stat${i}Label`) }));
  const perks   = [1, 2, 3, 4].map(i => g(`login:${portal}Perk${i}`)).filter(Boolean);
  const tagline = g(`login:${portal}Tagline`);
  const lastWord  = tagline.split(' ').pop() ?? '';
  const restWords = tagline.split(' ').slice(0, -1).join(' ');
  const hasCta  = portal === 'candidate';

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
        @keyframes al-shimmer {
          0%  { background-position:-400px 0; }
          100%{ background-position: 400px 0; }
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

        /* stats strip on left */
        .al-stats {
          display: grid;
          grid-template-columns: repeat(3,1fr);
          border-top: 1px solid rgba(255,255,255,0.07);
          padding-top: 24px;
          gap: 12px;
          margin-top: auto;
          animation: al-fade-in 0.6s 0.3s ease both;
        }
        .al-stat {
          text-align: center;
          cursor: default;
          transition: transform .2s ease;
        }
        .al-stat:hover { transform: translateY(-2px); }
        .al-stat-num {
          font-size: 18px;
          font-weight: 900;
          color: #fff;
          line-height: 1;
          transition: color .2s ease;
        }
        .al-stat:hover .al-stat-num { color: ${ORANGE}; }
        .al-stat-label {
          font-size: 10px;
          color: rgba(255,255,255,0.35);
          margin-top: 3px;
          text-transform: uppercase;
          letter-spacing: 0.05em;
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

        /* Portal toggle */
        .al-toggle {
          display: flex;
          background: ${BG_ALT};
          border: 1px solid ${BORDER};
          border-radius: 12px;
          padding: 4px;
          margin-bottom: 28px;
          gap: 2px;
        }
        .al-toggle-btn {
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 6px;
          padding: 9px 10px;
          border-radius: 9px;
          border: none;
          cursor: pointer;
          font-family: ${FONT};
          font-size: 12px;
          font-weight: 500;
          background: transparent;
          color: ${MUTED};
          transition: background .2s ease, color .2s ease,
                      box-shadow .2s ease, transform .2s ease;
        }
        .al-toggle-btn:hover:not(.is-active) {
          background: rgba(249,115,22,0.06);
          color: ${ORANGE};
        }
        .al-toggle-btn.is-active {
          background: ${SURFACE};
          color: ${ORANGE};
          font-weight: 700;
          box-shadow: 0 2px 8px rgba(0,0,0,0.10);
          transform: none;
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
        .al-form-sub a {
          color: ${ORANGE};
          font-weight: 600;
          text-decoration: none;
          transition: color .18s;
        }
        .al-form-sub a:hover { color: ${ORANGE_DARK}; }

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

        /* Admin hint */
        .al-hint {
          margin-top: 16px;
          text-align: center;
          font-size: 11px;
          color: #cbd5e1;
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

        /* Divider line */
        .al-divider {
          height: 1px;
          background: linear-gradient(90deg, transparent, ${ORANGE_BORDER}, transparent);
          margin: 24px 0;
        }

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
              {g(`login:${portal}Label`)} Portal
            </span>
          </div>

          {/* Heading */}
          <h1 className="al-heading">
            {restWords}{' '}
            <span className="al-heading-accent">{lastWord}</span>
          </h1>

          {/* Sub */}
          <p className="al-sub">{g(`login:${portal}Sub`)}</p>

          {/* Perks */}
          <div className="al-perks">
            {perks.map((perk, i) => (
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

        {/* Stats */}
        <div className="al-stats" style={{ position: 'relative', zIndex: 1 }}>
          {stats.map(s => (
            <div key={s.n} className="al-stat">
              <div className="al-stat-num">{s.n}</div>
              <div className="al-stat-label">{s.l}</div>
            </div>
          ))}
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

          {/* Portal toggle */}
          <div className="al-toggle" role="tablist" aria-label="Portal selector">
            {PORTAL_KEYS.map(key => {
              const m      = PORTAL_META[key];
              const active = key === portal;
              return (
                <button
                  key={key}
                  role="tab"
                  aria-selected={active}
                  onClick={() => switchPortal(key)}
                  className={`al-toggle-btn${active ? ' is-active' : ''}`}
                >
                  <m.Icon size={13} />
                  {g(`login:${key}Label`)}
                </button>
              );
            })}
          </div>

          {/* Heading */}
          <div style={{ marginBottom: '24px' }}>
            <h2 className="al-form-title">Sign in</h2>
            <p className="al-form-sub">
              {hasCta
                ? <>
                    {g('login:candidateCtaPre')}{' '}
                    <Link href={g('login:candidateCtaHref')}>
                      {g('login:candidateCtaText')}
                    </Link>
                  </>
                : `Enter your credentials to access the ${g(`login:${portal}Label`).toLowerCase()} portal.`
              }
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

          <div className="al-divider" />

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
            {g(`login:${portal}Note`)}
          </div>

          {/* Admin hint */}
          <p className="al-hint">{g('login:adminHint')}</p>

        </div>
      </div>
    </div>
  );
}