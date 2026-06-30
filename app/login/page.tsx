'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { signIn } from 'next-auth/react';
import { Eye, EyeOff, Mail, Lock, ArrowRight, CheckCircle2, Users, Link2, GraduationCap } from 'lucide-react';

/* ─── CMS defaults ─────────────────────────────────────────────────── */

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

/* ─── Portal config ─────────────────────────────────────────────────── */

const PORTAL_KEYS = ['candidate', 'partner', 'recruiter'] as const;
type PortalKey = typeof PORTAL_KEYS[number];

const PORTAL_META: Record<PortalKey, { Icon: typeof GraduationCap; accent: string; accentRgb: string; legacyKey: string }> = {
  candidate: { Icon: GraduationCap, accent: '#f97316', accentRgb: '249,115,22', legacyKey: 'candidate' },
  partner:   { Icon: Link2,         accent: '#7c3aed', accentRgb: '124,58,237', legacyKey: 'freelancer' },
  recruiter: { Icon: Users,         accent: '#2145fb', accentRgb: '33,69,251',  legacyKey: 'recruiter' },
};

/* ─── Component ─────────────────────────────────────────────────────── */

const inputBase: React.CSSProperties = {
  display: 'block', width: '100%',
  padding: '12px 14px 12px 42px',
  border: '1.5px solid #e2e8f0', borderRadius: '10px',
  fontSize: '14px', fontFamily: "'Poppins', sans-serif",
  color: '#0b0d20', background: '#f8faff',
  outline: 'none', boxSizing: 'border-box' as const,
  transition: 'border-color 0.15s, box-shadow 0.15s',
};

type LoginState = 'idle' | 'loading';

export default function LoginPage() {
  const [portal, setPortal] = useState<PortalKey>('candidate');
  const [focused, setFocused] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [form, setForm] = useState({ email: '', password: '' });
  const [state, setState] = useState<LoginState>('idle');
  const [error, setError] = useState('');
  const [cms, setCms] = useState(LOGIN_DEFAULTS);

  useEffect(() => {
    fetch('/api/admin/content?prefix=login:')
      .then(r => r.json())
      .then((saved: Record<string,string>) => setCms({ ...LOGIN_DEFAULTS, ...saved }))
      .catch(() => {});
  }, []);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get('error')) {
      setError(g(`login:${portal}ErrMsg`));
      setState('idle');
    }
  }, [portal, cms]);

  const g = (k: string) => cms[k] ?? LOGIN_DEFAULTS[k] ?? '';

  const meta = PORTAL_META[portal];

  const fi = (n: string): React.CSSProperties => ({
    ...inputBase,
    borderColor: focused === n ? meta.accent : error ? '#ef4444' : '#e2e8f0',
    background: focused === n ? '#fff' : '#f8faff',
    boxShadow: focused === n ? `0 0 0 3px rgba(${meta.accentRgb},0.10)` : 'none',
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

    /* Let NextAuth set the session cookie and navigate — reliable on Vercel */
    await signIn('credentials', {
      email: form.email,
      password: form.password,
      callbackUrl: '/auth/redirect',
    });
  };

  const stats = [1,2,3].map(i => ({ n: g(`login:stat${i}Num`), l: g(`login:stat${i}Label`) }));
  const perks = [1,2,3,4].map(i => g(`login:${portal}Perk${i}`)).filter(Boolean);

  const tagline  = g(`login:${portal}Tagline`);
  const lastWord = tagline.split(' ').pop() ?? '';
  const restWords= tagline.split(' ').slice(0, -1).join(' ');

  const hasCta = portal === 'candidate';

  return (
    <div className="auth-layout" style={{ minHeight: '100vh', display: 'flex', fontFamily: "'Poppins', sans-serif" }}>

      {/* ── Left brand panel ─────────────────────────────────────────────── */}
      <div className="auth-panel-left" style={{ width: '44%', background: '#0b0d20', display: 'flex', flexDirection: 'column', padding: '40px 48px', position: 'relative', overflow: 'hidden', transition: 'all 0.3s' }}>
        <div style={{ position: 'absolute', top: -160, right: -160, width: 440, height: 440, borderRadius: '50%', background: `rgba(${meta.accentRgb},0.12)`, pointerEvents: 'none', transition: 'background 0.4s' }} />
        <div style={{ position: 'absolute', bottom: -100, left: -100, width: 340, height: 340, borderRadius: '50%', background: `rgba(${meta.accentRgb},0.07)`, pointerEvents: 'none', transition: 'background 0.4s' }} />

        <Link href="/" style={{ display: 'inline-flex', alignItems: 'center', textDecoration: 'none', marginBottom: 'auto' }}>
          <img src="/logo.png" alt="Placedly" style={{ height: '52px', width: 'auto' }} />
        </Link>

        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', paddingBottom: '40px' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', marginBottom: '20px' }}>
            <div style={{ width: '20px', height: '3px', borderRadius: 999, background: meta.accent, transition: 'background 0.3s' }} />
            <span style={{ fontSize: '11px', fontWeight: 700, color: meta.accent, letterSpacing: '0.8px', textTransform: 'uppercase', transition: 'color 0.3s' }}>
              {g(`login:${portal}Label`)} Portal
            </span>
          </div>
          <h1 style={{ fontSize: 'clamp(1.6rem,2.6vw,2.5rem)', fontWeight: 900, color: '#fff', lineHeight: 1.12, letterSpacing: '-0.8px', marginBottom: '14px' }}>
            {restWords}{' '}
            <span style={{ color: meta.accent, transition: 'color 0.3s' }}>{lastWord}</span>
          </h1>
          <p style={{ fontSize: '14px', color: 'rgba(255,255,255,0.55)', lineHeight: 1.75, marginBottom: '36px', maxWidth: '340px' }}>
            {g(`login:${portal}Sub`)}
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '11px' }}>
            {perks.map(perk => (
              <div key={perk} style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                <CheckCircle2 size={15} color={meta.accent} strokeWidth={2.5} style={{ flexShrink: 0, marginTop: '2px', transition: 'color 0.3s' }} />
                <span style={{ fontSize: '13px', color: 'rgba(255,255,255,0.70)', lineHeight: 1.5 }}>{perk}</span>
              </div>
            ))}
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', borderTop: '1px solid rgba(255,255,255,0.07)', paddingTop: '24px', gap: '12px' }}>
          {stats.map(s => (
            <div key={s.n} style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '18px', fontWeight: 900, color: '#fff' }}>{s.n}</div>
              <div style={{ fontSize: '10px', color: 'rgba(255,255,255,0.35)', marginTop: '3px' }}>{s.l}</div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Right form panel ─────────────────────────────────────────────── */}
      <div className="auth-panel-right" style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '48px 40px', background: '#fff' }}>
        <div style={{ width: '100%', maxWidth: '400px' }}>

          <Link href="/" className="auth-mobile-logo" style={{ display: 'none', marginBottom: '28px' }}>
            <img src="/logo.png" alt="Placedly" style={{ height: '44px', width: 'auto' }} />
          </Link>

          {/* Portal toggle */}
          <div style={{ display: 'flex', background: '#f1f5f9', borderRadius: '12px', padding: '4px', marginBottom: '28px', gap: '2px' }}>
            {PORTAL_KEYS.map(key => {
              const m = PORTAL_META[key];
              const active = key === portal;
              return (
                <button
                  key={key}
                  onClick={() => switchPortal(key)}
                  style={{
                    flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px',
                    padding: '8px 10px', borderRadius: '9px', border: 'none', cursor: 'pointer',
                    fontFamily: "'Poppins',sans-serif", fontSize: '12px', fontWeight: active ? 700 : 500,
                    background: active ? '#fff' : 'transparent',
                    color: active ? m.accent : '#64748b',
                    boxShadow: active ? '0 1px 4px rgba(0,0,0,0.10)' : 'none',
                    transition: 'all 0.18s',
                  }}
                >
                  <m.Icon size={13} />
                  {g(`login:${key}Label`)}
                </button>
              );
            })}
          </div>

          <div style={{ marginBottom: '24px' }}>
            <h2 style={{ fontSize: '26px', fontWeight: 900, color: '#0b0d20', letterSpacing: '-0.5px', marginBottom: '6px' }}>Sign in</h2>
            {hasCta ? (
              <p style={{ fontSize: '14px', color: '#64748b' }}>
                {g('login:candidateCtaPre')}{' '}
                <Link href={g('login:candidateCtaHref')} style={{ color: meta.accent, fontWeight: 600, textDecoration: 'none' }}>{g('login:candidateCtaText')}</Link>
              </p>
            ) : (
              <p style={{ fontSize: '14px', color: '#64748b' }}>
                Enter your credentials to access the {g(`login:${portal}Label`).toLowerCase()} portal.
              </p>
            )}
          </div>

          {error && (
            <div style={{ padding: '11px 14px', background: '#fef2f2', border: '1px solid #fecaca', borderRadius: '10px', fontSize: '13px', color: '#dc2626', marginBottom: '16px', lineHeight: 1.6 }}>
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '11px', fontWeight: 600, color: '#374151', letterSpacing: '0.5px', textTransform: 'uppercase' as const, marginBottom: '6px' }}>Email</label>
              <div style={{ position: 'relative' }}>
                <div style={{ position: 'absolute', left: 13, top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }}>
                  <Mail size={15} color={focused === 'email' ? meta.accent : '#cbd5e1'} />
                </div>
                <input type="email" required placeholder="you@email.com" style={fi('email')} value={form.email}
                  onFocus={() => setFocused('email')} onBlur={() => setFocused('')}
                  onChange={e => setForm({ ...form, email: e.target.value })} />
              </div>
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '11px', fontWeight: 600, color: '#374151', letterSpacing: '0.5px', textTransform: 'uppercase' as const, marginBottom: '6px' }}>Password</label>
              <div style={{ position: 'relative' }}>
                <div style={{ position: 'absolute', left: 13, top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }}>
                  <Lock size={15} color={focused === 'password' ? meta.accent : '#cbd5e1'} />
                </div>
                <input type={showPassword ? 'text' : 'password'} required placeholder="Your password"
                  style={{ ...fi('password'), paddingRight: '42px' }} value={form.password}
                  onFocus={() => setFocused('password')} onBlur={() => setFocused('')}
                  onChange={e => setForm({ ...form, password: e.target.value })} />
                <button type="button" onClick={() => setShowPassword(v => !v)}
                  style={{ position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', display: 'flex', padding: 2 }}>
                  {showPassword ? <EyeOff size={15} color="#94a3b8" /> : <Eye size={15} color="#94a3b8" />}
                </button>
              </div>
            </div>

            <button type="submit" disabled={state === 'loading'} style={{
              width: '100%', padding: '13px', marginTop: '4px',
              background: state === 'loading' ? '#93a5fd' : meta.accent,
              color: '#fff', fontWeight: 700, fontSize: '15px',
              fontFamily: "'Poppins', sans-serif", border: 'none', borderRadius: '10px',
              cursor: state === 'loading' ? 'not-allowed' : 'pointer',
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
              boxShadow: `0 4px 18px rgba(${meta.accentRgb},0.30)`,
              transition: 'background 0.2s, box-shadow 0.2s',
            }}>
              {state === 'loading' ? 'Signing in…' : <><span>Sign In</span><ArrowRight size={16} /></>}
            </button>
          </form>

          <div style={{ marginTop: '24px', padding: '14px 16px', background: '#f8faff', borderRadius: '10px', border: '1px solid #e2e8f0' }}>
            <div style={{ fontSize: '12px', color: '#64748b', lineHeight: 1.7 }}>
              {g(`login:${portal}Note`)}
            </div>
          </div>

          <p style={{ marginTop: '16px', textAlign: 'center', fontSize: '11px', color: '#cbd5e1' }}>
            {g('login:adminHint')}
          </p>
        </div>
      </div>
    </div>
  );
}
