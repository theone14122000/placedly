'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import {
  ArrowUpRight, ArrowUp, MapPin, Mail, MessageCircle,
  Rocket, Sparkles, Phone, Shield, Clock,
} from 'lucide-react';

/* ── Brand tokens (matches site-wide theme) ── */
const G = {
  blue:   '#2563eb',
  indigo: '#7c8ff0',
  orange: '#fb923c',
  rose:   '#f43f5e',
  purple: '#a855f7',
  green:  '#16a34a',
};

const GRAD = `linear-gradient(270deg,${G.blue},${G.indigo},${G.orange},${G.rose},${G.purple},${G.blue})`;

/* ── SVG Social Icons ── */
const IgIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
    <circle cx="12" cy="12" r="4" />
    <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
  </svg>
);
const TwIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);
const LiIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect x="2" y="9" width="4" height="12" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);
const FbIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
  </svg>
);

/* ── Live activity ticker items ── */
const TICKER_ITEMS = [
  '🎉 Ankit R. placed at WNS — ₹6.4L CTC',
  '⚡ Priya S. got interview call in 9 days',
  '🚀 47 candidates in active hiring connect',
  '✅ Rohit K. signed offer — 52% hike',
  '🎯 Vikram T. landed Sr. Analyst role',
  '📄 Resume rebuilt for Simran K. — 3 offers',
];

/* ── Stats ── */
const STATS = [
  { num: '300+', label: 'Careers Transformed', color: G.blue   },
  { num: '50+',  label: 'Hiring Partners',      color: G.orange },
  { num: '40%',  label: 'Avg Salary Hike',      color: G.purple },
  { num: '₹0',   label: 'Upfront Cost',         color: G.green  },
];

/* ── Nav columns ── */
const NAV_COLS = [
  {
    heading: 'Company',
    links: [
      { label: 'Home',       href: '/' },
      { label: 'About Us',   href: '/about-us' },
      { label: 'Contact',    href: '/contact' },
      { label: 'Vacancies',  href: '#vacancies' },
    ],
  },
  {
    heading: 'Programmes',
    links: [
      { label: 'CAP Programme',  href: '/cap' },
      { label: 'Study Abroad',   href: '/study-visa' },
      { label: 'Resume Writing', href: '/services' },
      { label: 'Interview Prep', href: '/services' },
    ],
  },
  {
    heading: 'Resources',
    links: [
      { label: 'Terms & Services', href: '/terms' },
      { label: 'Privacy Policy',   href: '/privacy' },
      { label: 'Career Blog',      href: '/blog' },
      { label: 'Success Stories',  href: '/stories' },
    ],
  },
];

type Cms = Record<string, string>;

/* ════════════════════════════════════════════
   GRADIENT TEXT
════════════════════════════════════════════ */
function GradText({ children, style = {} }: { children: React.ReactNode; style?: React.CSSProperties }) {
  return (
    <span style={{
      backgroundImage: GRAD,
      backgroundSize: '300% 300%',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      backgroundClip: 'text',
      animation: 'ft-grad 6s ease infinite',
      display: 'inline',
      ...style,
    }}>
      {children}
    </span>
  );
}

/* ════════════════════════════════════════════
   SOCIAL BUTTON
════════════════════════════════════════════ */
function SocialBtn({
  href, label, Icon, color, bg,
}: {
  href: string;
  label: string;
  Icon: React.ComponentType;
  color: string;
  bg: string;
}) {
  const [hovered, setHovered] = useState(false);
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        width: '38px', height: '38px', borderRadius: '10px',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        background: hovered ? bg : 'rgba(255,255,255,0.06)',
        border: `1px solid ${hovered ? color + '40' : 'rgba(255,255,255,0.1)'}`,
        color: hovered ? color : 'rgba(255,255,255,0.6)',
        transition: 'all .2s ease',
        transform: hovered ? 'translateY(-3px)' : 'translateY(0)',
        boxShadow: hovered ? `0 6px 16px ${color}30` : 'none',
        textDecoration: 'none',
        cursor: 'pointer',
      }}
    >
      <Icon />
    </a>
  );
}

/* ════════════════════════════════════════════
   NAV LINK
════════════════════════════════════════════ */
function FooterLink({ href, label }: { href: string; label: string }) {
  const [hovered, setHovered] = useState(false);
  const isExternal = href.startsWith('http');
  const style: React.CSSProperties = {
    display: 'flex', alignItems: 'center', gap: '6px',
    fontSize: '13px', fontWeight: 500,
    color: hovered ? '#fff' : 'rgba(255,255,255,0.55)',
    textDecoration: 'none',
    transition: 'color .15s ease, transform .15s ease',
    transform: hovered ? 'translateX(4px)' : 'translateX(0)',
    cursor: 'pointer',
  };
  return isExternal ? (
    <a href={href} target="_blank" rel="noopener noreferrer"
      style={style}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {label}
      {hovered && <ArrowUpRight size={11} style={{ opacity: 0.7 }} />}
    </a>
  ) : (
    <Link href={href}
      style={style}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {label}
      {hovered && <ArrowUpRight size={11} style={{ opacity: 0.7 }} />}
    </Link>
  );
}

/* ════════════════════════════════════════════
   SCROLL TO TOP BUTTON
════════════════════════════════════════════ */
function ScrollTopBtn() {
  const [visible, setVisible] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const h = document.documentElement;
      const scrolled = window.pageYOffset;
      const max = h.scrollHeight - h.clientHeight;
      setProgress(max > 0 ? (scrolled / max) * 100 : 0);
      setVisible(scrolled > 400);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  /* SVG circle progress */
  const r = 17;
  const circ = 2 * Math.PI * r;
  const dash = circ - (progress / 100) * circ;

  return (
    <button
      onClick={scrollToTop}
      aria-label="Scroll to top"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        position: 'relative', width: '44px', height: '44px',
        borderRadius: '50%', border: 'none',
        background: hovered
          ? `linear-gradient(135deg,${G.blue},${G.indigo})`
          : 'rgba(255,255,255,0.08)',
        cursor: 'pointer',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        transition: 'all .2s ease',
        transform: hovered ? 'translateY(-3px)' : 'translateY(0)',
        boxShadow: hovered ? `0 8px 20px ${G.blue}40` : 'none',
        flexShrink: 0,
        opacity: visible ? 1 : 0.3,
      }}
    >
      {/* SVG progress ring */}
      <svg
        width="44" height="44"
        style={{ position: 'absolute', inset: 0, transform: 'rotate(-90deg)' }}
      >
        <circle cx="22" cy="22" r={r} fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="2" />
        <circle
          cx="22" cy="22" r={r} fill="none"
          stroke={hovered ? '#fff' : G.blue}
          strokeWidth="2"
          strokeDasharray={circ}
          strokeDashoffset={dash}
          strokeLinecap="round"
          style={{ transition: 'stroke-dashoffset .1s linear, stroke .2s ease' }}
        />
      </svg>
      <ArrowUp size={15} color={hovered ? '#fff' : 'rgba(255,255,255,0.7)'} style={{ position: 'relative', zIndex: 1 }} />
    </button>
  );
}

/* ════════════════════════════════════════════
   MAIN FOOTER
════════════════════════════════════════════ */
export default function Footer({ cms = {} }: { cms?: Cms }) {
  const [tickerIdx, setTickerIdx]     = useState(0);
  const [tickerVisible, setTickerVisible] = useState(true);
  const [visible, setVisible]         = useState(false);
  const [emailVal, setEmailVal]       = useState('');
  const [subState, setSubState]       = useState<'idle' | 'loading' | 'done'>('idle');
  const footerRef = useRef<HTMLElement>(null);

  /* CMS values */
  const desc      = cms['hp:footerDesc']      ?? "India's career growth and study abroad consultancy. Career Assistance Programme: 12% Success Share, post-placement only. Study Abroad: UK · France · Germany · Dubai. Zero upfront.";
  const ctaText   = cms['hp:footerCtaText']   ?? 'Start Your Journey';
  const ctaHref   = cms['hp:footerCtaHref']   ?? '/contact';
  const instagram = cms['hp:footerInstagram'] ?? 'https://www.instagram.com/';
  const twitter   = cms['hp:footerTwitter']   ?? 'https://twitter.com/';
  const linkedin  = cms['hp:footerLinkedin']  ?? 'https://linkedin.com/';
  const facebook  = cms['hp:footerFacebook']  ?? 'https://www.facebook.com/';
  const emailAddr = cms['hp:footerEmail']     ?? 'hello@placedly.in';
  const wa        = cms['hp:footerWa']        ?? cms['hp:waNumber'] ?? '919910116901';
  const copyright = cms['hp:footerCopyright'] ?? '© 2026 Placedly · Career Assistance Programme · Study Abroad Consultancy · India · CAP Fee: 12% of Annual CTC · Collected post-offer letter only';

  /* Scroll reveal */
  useEffect(() => {
    const el = footerRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.05 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  /* Ticker */
  useEffect(() => {
    const interval = setInterval(() => {
      setTickerVisible(false);
      setTimeout(() => {
        setTickerIdx(i => (i + 1) % TICKER_ITEMS.length);
        setTickerVisible(true);
      }, 350);
    }, 3500);
    return () => clearInterval(interval);
  }, []);

  /* Newsletter mock submit */
  const handleSub = (e: React.FormEvent) => {
    e.preventDefault();
    if (!emailVal.includes('@')) return;
    setSubState('loading');
    setTimeout(() => setSubState('done'), 900);
  };

  const socials = [
    { href: instagram, label: 'Instagram', Icon: IgIcon, color: '#e1306c', bg: '#fff0f5' },
    { href: twitter,   label: 'Twitter/X', Icon: TwIcon, color: '#000',    bg: '#f1f1f1' },
    { href: linkedin,  label: 'LinkedIn',  Icon: LiIcon, color: '#0077b5', bg: '#e8f4fb' },
    { href: facebook,  label: 'Facebook',  Icon: FbIcon, color: '#1877f2', bg: '#e8f0fe' },
  ];

  const contactItems = [
    { Icon: MessageCircle, color: G.green,  text: `wa.me/${wa}`,  href: `https://wa.me/${wa}`,          label: 'WhatsApp' },
    { Icon: Mail,          color: G.blue,   text: emailAddr,      href: `mailto:${emailAddr}`,          label: 'Email' },
    { Icon: MapPin,        color: G.orange, text: 'Delhi NCR, India', href: null,                       label: 'Office' },
    { Icon: Clock,         color: G.purple, text: 'Mon–Sat 9AM–7PM', href: null,                        label: 'Hours' },
  ];

  return (
    <>
      {/* ═══ KEYFRAMES ═══ */}
      <style>{`
        @keyframes ft-grad {
          0%   { background-position:0%   50%; }
          50%  { background-position:100% 50%; }
          100% { background-position:0%   50%; }
        }
        @keyframes ft-blob-a {
          0%,100% { transform:translate(0,0)   scale(1);    }
          50%     { transform:translate(20px,15px) scale(1.05); }
        }
        @keyframes ft-blob-b {
          0%,100% { transform:translate(0,0)    scale(1);    }
          50%     { transform:translate(-15px,-10px) scale(1.04); }
        }
        @keyframes ft-ticker-dot {
          0%,100% { opacity:1; transform:scale(1);   }
          50%     { opacity:.4; transform:scale(1.3); }
        }
        @keyframes ft-spin {
          from { transform:rotate(0deg); }
          to   { transform:rotate(360deg); }
        }
        @keyframes ft-reveal {
          from { opacity:0; transform:translateY(24px); }
          to   { opacity:1; transform:translateY(0);    }
        }
        @keyframes ft-shimmer {
          from { transform:translateX(-100%); }
          to   { transform:translateX(200%);  }
        }
        @keyframes ft-pop {
          0%  { transform:scale(0.7); opacity:0; }
          70% { transform:scale(1.05); }
          100%{ transform:scale(1);   opacity:1; }
        }

        .ft-reveal-in {
          animation: ft-reveal .55s cubic-bezier(.22,1,.36,1) forwards;
        }

        /* Stat cell hover */
        .ft-stat:hover { background:rgba(255,255,255,0.04) !important; }

        /* Nav link hover — handled inline */

        /* Newsletter shimmer */
        .ft-sub-btn-loading { position:relative; overflow:hidden; }
        .ft-sub-btn-loading::after {
          content:'';
          position:absolute; inset:0;
          background:linear-gradient(90deg,transparent,rgba(255,255,255,.2),transparent);
          animation:ft-shimmer 1.2s ease infinite;
        }

        /* Responsive */
        .ft-grid       { display:grid; grid-template-columns:1.6fr 1fr 1fr 1fr; gap:40px; }
        .ft-stats-4    { display:grid; grid-template-columns:repeat(4,1fr); }
        .ft-bottom-row { display:flex; align-items:center; justify-content:space-between; gap:16px; flex-wrap:wrap; }

        @media (max-width:1024px) {
          .ft-grid { grid-template-columns:1fr 1fr; gap:32px; }
        }
        @media (max-width:640px) {
          .ft-grid     { grid-template-columns:1fr; gap:28px; }
          .ft-stats-4  { grid-template-columns:repeat(2,1fr); }
          .ft-bottom-row { flex-direction:column; text-align:center; }
        }
      `}</style>

      <footer
        ref={footerRef}
        style={{
          position: 'relative', overflow: 'hidden',
          background: 'linear-gradient(160deg,#05070f 0%,#0b0d20 40%,#10103a 100%)',
          paddingTop: '1px', /* prevents margin collapse */
        }}
      >

        {/* ── Ambient orbs ── */}
        <div aria-hidden style={{
          position: 'absolute', top: '-120px', left: '-100px',
          width: '500px', height: '500px', borderRadius: '50%',
          background: `radial-gradient(circle,${G.blue}20 0%,transparent 70%)`,
          filter: 'blur(90px)', pointerEvents: 'none',
          animation: 'ft-blob-a 16s ease-in-out infinite',
        }} />
        <div aria-hidden style={{
          position: 'absolute', top: '20%', right: '-120px',
          width: '420px', height: '420px', borderRadius: '50%',
          background: `radial-gradient(circle,${G.orange}18 0%,transparent 70%)`,
          filter: 'blur(90px)', pointerEvents: 'none',
          animation: 'ft-blob-b 18s ease-in-out infinite 1s',
        }} />
        <div aria-hidden style={{
          position: 'absolute', bottom: '-60px', left: '35%',
          width: '340px', height: '340px', borderRadius: '50%',
          background: `radial-gradient(circle,${G.purple}14 0%,transparent 70%)`,
          filter: 'blur(80px)', pointerEvents: 'none',
          animation: 'ft-blob-a 20s ease-in-out infinite 3s',
        }} />

        {/* ══════════════════════════════════
            CTA BANNER
        ══════════════════════════════════ */}
        <div style={{ padding: '72px 0 0', position: 'relative', zIndex: 1 }}>
          <div className="container">
            <div
              style={{
                position: 'relative', borderRadius: '24px', overflow: 'hidden',
                padding: 'clamp(32px,5vw,56px) clamp(24px,5vw,64px)',
                background: 'rgba(255,255,255,0.03)',
                border: '1px solid rgba(255,255,255,0.08)',
                backdropFilter: 'blur(12px)',
                opacity: visible ? 1 : 0,
                transform: visible ? 'translateY(0)' : 'translateY(20px)',
                transition: 'opacity .6s ease, transform .6s ease',
              }}
            >
              {/* Inner orbs */}
              <div aria-hidden style={{ position: 'absolute', top: '-40px', left: '5%', width: '200px', height: '200px', borderRadius: '50%', background: `radial-gradient(circle,${G.blue}30 0%,transparent 70%)`, filter: 'blur(50px)', pointerEvents: 'none' }} />
              <div aria-hidden style={{ position: 'absolute', bottom: '-40px', right: '8%', width: '180px', height: '180px', borderRadius: '50%', background: `radial-gradient(circle,${G.orange}25 0%,transparent 70%)`, filter: 'blur(50px)', pointerEvents: 'none' }} />

              <div style={{ position: 'relative', zIndex: 1, display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '24px', flexWrap: 'wrap' }}>
                <div style={{ flex: 1, minWidth: '260px' }}>
                  {/* Eyebrow */}
                  <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', marginBottom: '12px' }}>
                    <span style={{ width: '16px', height: '2px', borderRadius: '999px', background: `linear-gradient(90deg,${G.blue},${G.orange})` }} />
                    <span style={{ fontSize: '10px', fontWeight: 800, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.45)' }}>
                      Zero Upfront · Pay After Offer
                    </span>
                    <span style={{ width: '16px', height: '2px', borderRadius: '999px', background: `linear-gradient(90deg,${G.orange},${G.blue})` }} />
                  </div>

                  <h2 style={{
                    fontSize: 'clamp(1.5rem,3vw,2.4rem)', fontWeight: 900, lineHeight: 1.12,
                    letterSpacing: '-0.8px', marginBottom: '10px', color: '#fff',
                  }}>
                    Ready to{' '}
                    <GradText>Transform Your Career?</GradText>
                  </h2>
                  <p style={{ fontSize: '14px', color: 'rgba(255,255,255,0.55)', lineHeight: 1.7, maxWidth: '420px' }}>
                    Join 300+ professionals who trusted Placedly. Get placed, get paid more — or you pay nothing.
                  </p>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', flexShrink: 0 }}>
                  <Link
                    href={ctaHref}
                    style={{
                      display: 'inline-flex', alignItems: 'center', gap: '8px',
                      backgroundImage: `linear-gradient(135deg,${G.blue},${G.indigo})`,
                      color: '#fff', fontWeight: 700, fontSize: '14px',
                      padding: '13px 28px', borderRadius: '999px', textDecoration: 'none',
                      boxShadow: `0 8px 24px ${G.blue}40`,
                      transition: 'transform .15s ease, box-shadow .2s ease',
                    }}
                    onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = `0 12px 30px ${G.blue}55`; }}
                    onMouseLeave={e => { e.currentTarget.style.transform = ''; e.currentTarget.style.boxShadow = `0 8px 24px ${G.blue}40`; }}
                  >
                    <Rocket size={14} /> {ctaText}
                    <ArrowUpRight size={13} />
                  </Link>
                  <a
                    href={`https://wa.me/${wa}`}
                    target="_blank" rel="noopener noreferrer"
                    style={{
                      display: 'inline-flex', alignItems: 'center', gap: '8px',
                      background: 'rgba(37,211,102,0.12)',
                      border: '1px solid rgba(37,211,102,0.3)',
                      color: '#4ade80', fontWeight: 600, fontSize: '13px',
                      padding: '11px 24px', borderRadius: '999px', textDecoration: 'none',
                      transition: 'all .15s ease',
                    }}
                    onMouseEnter={e => { e.currentTarget.style.background = 'rgba(37,211,102,0.2)'; e.currentTarget.style.transform = 'translateY(-2px)'; }}
                    onMouseLeave={e => { e.currentTarget.style.background = 'rgba(37,211,102,0.12)'; e.currentTarget.style.transform = ''; }}
                  >
                    <MessageCircle size={13} /> WhatsApp Us
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ══════════════════════════════════
            STATS STRIP
        ══════════════════════════════════ */}
        <div style={{ padding: '48px 0 0', position: 'relative', zIndex: 1 }}>
          <div className="container">
            <div
              className="ft-stats-4"
              style={{
                borderRadius: '16px',
                border: '1px solid rgba(255,255,255,0.06)',
                overflow: 'hidden',
                opacity: visible ? 1 : 0,
                transition: 'opacity .7s ease .15s',
              }}
            >
              {STATS.map((s, i) => (
                <div
                  key={s.label}
                  className="ft-stat"
                  style={{
                    textAlign: 'center', padding: '24px 12px',
                    borderRight: i < STATS.length - 1 ? '1px solid rgba(255,255,255,0.06)' : 'none',
                    transition: 'background .2s ease', cursor: 'default',
                  }}
                >
                  <div style={{
                    fontSize: '1.75rem', fontWeight: 900, lineHeight: 1, marginBottom: '5px',
                    backgroundImage: `linear-gradient(135deg,${s.color},${G.indigo})`,
                    WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
                  }}>{s.num}</div>
                  <div style={{ fontSize: '11px', color: 'rgba(255,255,255,0.4)', fontWeight: 600, letterSpacing: '0.02em' }}>{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ══════════════════════════════════
            LIVE TICKER
        ══════════════════════════════════ */}
        <div style={{ padding: '24px 0 0', position: 'relative', zIndex: 1 }}>
          <div className="container">
            <div style={{
              display: 'inline-flex', alignItems: 'center', gap: '10px',
              background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)',
              borderRadius: '999px', padding: '6px 16px 6px 8px',
              maxWidth: '100%', overflow: 'hidden',
            }}>
              <span style={{
                display: 'inline-flex', alignItems: 'center', gap: '5px',
                fontSize: '9px', fontWeight: 800, color: '#ef4444',
                background: 'rgba(239,68,68,0.15)', padding: '3px 8px', borderRadius: '999px', flexShrink: 0,
              }}>
                <span style={{ width: '5px', height: '5px', borderRadius: '50%', background: '#ef4444', display: 'inline-block', animation: 'ft-ticker-dot 1.4s ease-in-out infinite' }} />
                LIVE
              </span>
              <span style={{
                fontSize: '12px', fontWeight: 600, color: 'rgba(255,255,255,0.7)',
                whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis',
                opacity: tickerVisible ? 1 : 0,
                transform: tickerVisible ? 'translateY(0)' : 'translateY(4px)',
                transition: 'opacity .3s ease, transform .3s ease',
              }}>
                {TICKER_ITEMS[tickerIdx]}
              </span>
            </div>
          </div>
        </div>

        {/* ══════════════════════════════════
            MAIN FOOTER GRID
        ══════════════════════════════════ */}
        <div style={{ padding: '56px 0 0', position: 'relative', zIndex: 1 }}>
          <div className="container">
            <div
              className="ft-grid"
              style={{
                opacity: visible ? 1 : 0,
                transform: visible ? 'translateY(0)' : 'translateY(16px)',
                transition: 'opacity .65s ease .2s, transform .65s ease .2s',
              }}
            >

              {/* ── Brand column ── */}
              <div>
                {/* Logo */}
                <Link href="/" style={{ display: 'inline-block', marginBottom: '20px' }}>
                  <img src="/logo-dark.png" alt="Placedly" style={{ height: '36px', width: 'auto' }} loading="lazy" />
                </Link>

                {/* Description */}
                <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.5)', lineHeight: 1.75, marginBottom: '20px', maxWidth: '280px' }}>
                  {desc}
                </p>

                {/* Trust tags */}
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '22px' }}>
                  {['Zero Upfront', '12% Post-Offer', 'Pan-India', 'Study Abroad'].map(tag => (
                    <span key={tag} style={{
                      fontSize: '10px', fontWeight: 700, color: 'rgba(255,255,255,0.5)',
                      background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)',
                      borderRadius: '999px', padding: '3px 10px',
                    }}>
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Socials */}
                <div style={{ display: 'flex', gap: '8px', marginBottom: '24px', flexWrap: 'wrap' }}>
                  {socials.map(s => (
                    <SocialBtn key={s.label} {...s} />
                  ))}
                </div>

                {/* Contact quick-links */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  {contactItems.map(item => (
                    <div key={item.label} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <item.Icon size={13} color={item.color} style={{ flexShrink: 0 }} />
                      {item.href ? (
                        <a
                          href={item.href}
                          target={item.href.startsWith('http') ? '_blank' : undefined}
                          rel="noopener noreferrer"
                          style={{ fontSize: '12.5px', color: 'rgba(255,255,255,0.5)', textDecoration: 'none', transition: 'color .15s ease' }}
                          onMouseEnter={e => (e.currentTarget.style.color = item.color)}
                          onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.5)')}
                        >
                          {item.text}
                        </a>
                      ) : (
                        <span style={{ fontSize: '12.5px', color: 'rgba(255,255,255,0.4)' }}>{item.text}</span>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* ── Nav columns ── */}
              {NAV_COLS.map((col, ci) => (
                <div key={col.heading}>
                  <div style={{
                    fontSize: '10.5px', fontWeight: 800, letterSpacing: '0.12em',
                    textTransform: 'uppercase', marginBottom: '16px',
                    backgroundImage: `linear-gradient(90deg,${G.blue},${G.indigo})`,
                    WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
                    display: 'inline-block',
                  }}>
                    {col.heading}
                  </div>
                  {/* Accent line */}
                  <div style={{
                    height: '2px', width: '28px', borderRadius: '999px',
                    background: `linear-gradient(90deg,${[G.orange, G.purple, G.blue][ci % 3]},transparent)`,
                    marginBottom: '16px',
                  }} />
                  <nav style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    {col.links.map(link => (
                      <FooterLink key={link.label} href={link.href} label={link.label} />
                    ))}
                  </nav>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ══════════════════════════════════
            NEWSLETTER
        ══════════════════════════════════ */}
        <div style={{ padding: '48px 0 0', position: 'relative', zIndex: 1 }}>
          <div className="container">
            <div style={{
              background: 'rgba(255,255,255,0.03)',
              border: '1px solid rgba(255,255,255,0.07)',
              borderRadius: '16px', padding: '28px 32px',
              display: 'flex', alignItems: 'center', justifyContent: 'space-between',
              gap: '24px', flexWrap: 'wrap',
            }}>
              <div style={{ flex: 1, minWidth: '220px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                  <Sparkles size={15} color={G.orange} />
                  <span style={{ fontSize: '14px', fontWeight: 800, color: '#fff' }}>
                    Career Tips & Placement Alerts
                  </span>
                </div>
                <p style={{ fontSize: '12px', color: 'rgba(255,255,255,0.4)', margin: 0 }}>
                  Weekly insights from Placedly — no spam, unsubscribe anytime.
                </p>
              </div>

              {subState === 'done' ? (
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', animation: 'ft-pop .4s ease' }}>
                  <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: 'rgba(74,222,128,0.15)', border: '1px solid rgba(74,222,128,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Shield size={14} color="#4ade80" />
                  </div>
                  <span style={{ fontSize: '13px', fontWeight: 700, color: '#4ade80' }}>You&apos;re subscribed!</span>
                </div>
              ) : (
                <form onSubmit={handleSub} style={{ display: 'flex', gap: '8px', flex: 1, maxWidth: '380px' }}>
                  <input
                    type="email"
                    required
                    placeholder="your@email.com"
                    value={emailVal}
                    onChange={e => setEmailVal(e.target.value)}
                    style={{
                      flex: 1, padding: '10px 14px', borderRadius: '10px',
                      border: '1px solid rgba(255,255,255,0.12)',
                      background: 'rgba(255,255,255,0.06)',
                      color: '#fff', fontSize: '13px', fontFamily: 'inherit',
                      outline: 'none', transition: 'border-color .15s ease',
                    }}
                    onFocus={e => (e.currentTarget.style.borderColor = G.blue)}
                    onBlur={e => (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.12)')}
                  />
                  <button
                    type="submit"
                    disabled={subState === 'loading'}
                    className={subState === 'loading' ? 'ft-sub-btn-loading' : ''}
                    style={{
                      display: 'inline-flex', alignItems: 'center', gap: '6px',
                      padding: '10px 18px', borderRadius: '10px', border: 'none',
                      backgroundImage: `linear-gradient(135deg,${G.blue},${G.indigo})`,
                      color: '#fff', fontWeight: 700, fontSize: '13px',
                      cursor: subState === 'loading' ? 'wait' : 'pointer',
                      fontFamily: 'inherit', whiteSpace: 'nowrap',
                      boxShadow: `0 4px 14px ${G.blue}30`,
                      transition: 'transform .15s ease',
                    }}
                    onMouseEnter={e => { if (subState !== 'loading') e.currentTarget.style.transform = 'translateY(-1px)'; }}
                    onMouseLeave={e => { e.currentTarget.style.transform = ''; }}
                  >
                    {subState === 'loading' ? (
                      <span style={{ width: '14px', height: '14px', border: '2px solid rgba(255,255,255,0.4)', borderTopColor: '#fff', borderRadius: '50%', animation: 'ft-spin .7s linear infinite', display: 'inline-block' }} />
                    ) : (
                      <><Phone size={12} /> Subscribe</>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>

        {/* ══════════════════════════════════
            BOTTOM BAR
        ══════════════════════════════════ */}
        <div style={{
          marginTop: '56px',
          borderTop: '1px solid rgba(255,255,255,0.06)',
          position: 'relative', zIndex: 1,
        }}>
          <div className="container" style={{ padding: '20px 0' }}>
            <div className="ft-bottom-row">

              {/* Copyright */}
              <p style={{
                fontSize: '11px', color: 'rgba(255,255,255,0.28)',
                lineHeight: 1.6, flex: 1, margin: 0,
              }}>
                {copyright}
              </p>

              {/* Right side */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px', flexShrink: 0 }}>
                {/* Made with love */}
                <span style={{ fontSize: '11px', color: 'rgba(255,255,255,0.25)', whiteSpace: 'nowrap' }}>
                  Made with{' '}
                  <span style={{
                    backgroundImage: `linear-gradient(90deg,${G.rose},${G.orange})`,
                    WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
                  }}>♥</span>
                  {' '}in India
                </span>

                {/* Scroll-to-top with progress ring */}
                <ScrollTopBtn />
              </div>
            </div>
          </div>
        </div>

      </footer>
    </>
  );
}