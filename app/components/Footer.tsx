'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import Link from 'next/link';
import {
  ArrowUpRight, ArrowUp, MapPin, Mail, MessageCircle,
  Rocket, Sparkles, Phone, Shield, Clock, Zap,
  CheckCircle2, Globe, Star,
  type LucideIcon,
} from 'lucide-react';

/* ── Brand tokens ── */
const G = {
  blue:   '#2563eb',
  indigo: '#7c8ff0',
  orange: '#fb923c',
  rose:   '#f43f5e',
  purple: '#a855f7',
  green:  '#16a34a',
};

const GRAD = `linear-gradient(270deg,${G.blue},${G.indigo},${G.orange},${G.rose},${G.purple},${G.blue})`;
const DOT_COLORS = [G.blue, G.orange, G.purple, G.green, G.rose, G.indigo];

/* ── Social Icons ── */
const IgIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5" />
    <circle cx="12" cy="12" r="4" />
    <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
  </svg>
);
const TwIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);
const LiIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect x="2" y="9" width="4" height="12" /><circle cx="4" cy="4" r="2" />
  </svg>
);
const FbIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
  </svg>
);

/* ── Live ticker ── */
const TICKER_ITEMS = [
  { emoji: '🎉', text: 'Ankit R. placed at WNS', detail: '₹6.4L CTC' },
  { emoji: '⚡', text: 'Priya S. got interview call', detail: '9 days flat' },
  { emoji: '🚀', text: '47 candidates', detail: 'active hiring connect' },
  { emoji: '✅', text: 'Rohit K. signed offer', detail: '52% hike' },
  { emoji: '🎯', text: 'Vikram T. landed Sr. Analyst', detail: 'EXL Healthcare' },
  { emoji: '📄', text: 'Simran K. resume rebuilt', detail: '3 offers in 2 weeks' },
];

/* ── Nav columns ── */
const NAV_COLS = [
  {
    heading: 'Company',
    color: G.orange,
    links: [
      { label: 'Home',      href: '/',          badge: null },
      { label: 'About Us',  href: '/about-us',  badge: null },
      { label: 'Contact',   href: '/contact',   badge: null },
      { label: 'Vacancies', href: '#vacancies', badge: 'Hiring' },
    ],
  },
  {
    heading: 'Programmes',
    color: G.purple,
    links: [
      { label: 'CAP Programme',  href: '/cap',        badge: 'Popular' },
      { label: 'Study Abroad',   href: '/study-visa', badge: null },
      { label: 'Resume Writing', href: '/services',   badge: null },
      { label: 'Interview Prep', href: '/services',   badge: null },
    ],
  },
  {
    heading: 'Legal',
    color: G.blue,
    links: [
      { label: 'Terms & Services', href: '/terms',   badge: null },
      { label: 'Privacy Policy',   href: '/privacy', badge: null },
      { label: 'Career Blog',      href: '/blog',    badge: 'New' },
      { label: 'Success Stories',  href: '/stories', badge: null },
    ],
  },
];

/* ── Achievements marquee ── */
const ACHIEVEMENTS = [
  { icon: <Star size={11} color={G.orange} />, text: '300+ Professionals Placed' },
  { icon: <Zap size={11} color={G.blue} />, text: '40% Average Salary Hike' },
  { icon: <Globe size={11} color={G.purple} />, text: '140+ University Partners' },
  { icon: <CheckCircle2 size={11} color={G.green} />, text: 'Zero Upfront Cost' },
  { icon: <Rocket size={11} color={G.rose} />, text: 'Fastest Offer: 9 Days' },
  { icon: <Shield size={11} color={G.indigo} />, text: '50+ Hiring Partners' },
];

type Cms = Record<string, string>;

/* ════════════════════════════════
   GRADIENT TEXT
════════════════════════════════ */
function GradText({ children }: { children: React.ReactNode }) {
  return (
    <span style={{
      backgroundImage: GRAD, backgroundSize: '300% 300%',
      WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
      backgroundClip: 'text', animation: 'ft-grad 6s ease infinite', display: 'inline',
    }}>
      {children}
    </span>
  );
}

/* ════════════════════════════════
   INTERACTIVE SOCIAL BUTTON
════════════════════════════════ */
function SocialBtn({ href, label, Icon, color, bg }: {
  href: string; label: string;
  Icon: React.ComponentType; color: string; bg: string;
}) {
  const [h, setH] = useState(false);
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" aria-label={label}
      onMouseEnter={() => setH(true)} onMouseLeave={() => setH(false)}
      style={{
        width: '40px', height: '40px', borderRadius: '12px',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        background: h ? bg : 'rgba(255,255,255,0.05)',
        border: `1.5px solid ${h ? color + '50' : 'rgba(255,255,255,0.08)'}`,
        color: h ? color : 'rgba(255,255,255,0.5)',
        transition: 'all .2s cubic-bezier(.22,1,.36,1)',
        transform: h ? 'translateY(-4px) scale(1.08)' : 'translateY(0) scale(1)',
        boxShadow: h ? `0 8px 20px ${color}35` : 'none',
        textDecoration: 'none', cursor: 'pointer', flexShrink: 0,
      }}
    >
      <Icon />
    </a>
  );
}

/* ════════════════════════════════
   INTERACTIVE NAV LINK
════════════════════════════════ */
function FooterLink({ href, label, badge }: { href: string; label: string; badge: string | null }) {
  const [h, setH] = useState(false);
  const isExt = href.startsWith('http');
  const badgeColors: Record<string, { bg: string; text: string }> = {
    'Popular': { bg: `${G.orange}20`, text: G.orange },
    'New':     { bg: `${G.green}20`,  text: G.green  },
    'Hiring':  { bg: `${G.blue}20`,   text: G.blue   },
  };
  const bc = badge ? badgeColors[badge] : null;

  const inner = (
    <>
      <span style={{
        width: '5px', height: '5px', borderRadius: '50%', flexShrink: 0,
        background: h ? G.blue : 'rgba(255,255,255,0.2)',
        transition: 'background .15s ease, transform .15s ease',
        transform: h ? 'scale(1.4)' : 'scale(1)',
      }} />
      <span style={{ flex: 1 }}>{label}</span>
      {badge && bc && (
        <span style={{
          fontSize: '8.5px', fontWeight: 800, letterSpacing: '0.04em',
          padding: '2px 6px', borderRadius: '999px',
          background: bc.bg, color: bc.text, flexShrink: 0,
        }}>
          {badge}
        </span>
      )}
      <ArrowUpRight size={11} style={{
        opacity: h ? 0.7 : 0, flexShrink: 0,
        transition: 'opacity .15s ease',
      }} />
    </>
  );

  const style: React.CSSProperties = {
    display: 'flex', alignItems: 'center', gap: '8px',
    fontSize: '13px', fontWeight: 500,
    color: h ? '#fff' : 'rgba(255,255,255,0.5)',
    textDecoration: 'none',
    transition: 'color .15s ease, transform .15s ease',
    transform: h ? 'translateX(5px)' : 'translateX(0)',
    cursor: 'pointer', padding: '3px 0',
  };

  return isExt
    ? <a href={href} target="_blank" rel="noopener noreferrer" style={style} onMouseEnter={() => setH(true)} onMouseLeave={() => setH(false)}>{inner}</a>
    : <Link href={href} style={style} onMouseEnter={() => setH(true)} onMouseLeave={() => setH(false)}>{inner}</Link>;
}

/* ════════════════════════════════
   MOUSE-TRACKED CTA CARD
════════════════════════════════ */
function CtaCard({ ctaText, ctaHref, wa }: { ctaText: string; ctaHref: string; wa: string }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [mouse, setMouse] = useState({ x: 50, y: 50 });
  const [hCard, setHCard] = useState(false);

  const onMove = useCallback((e: React.MouseEvent) => {
    if (!cardRef.current) return;
    const r = cardRef.current.getBoundingClientRect();
    setMouse({
      x: ((e.clientX - r.left) / r.width) * 100,
      y: ((e.clientY - r.top) / r.height) * 100,
    });
  }, []);

  return (
    <div
      ref={cardRef}
      onMouseMove={onMove}
      onMouseEnter={() => setHCard(true)}
      onMouseLeave={() => setHCard(false)}
      style={{
        position: 'relative', borderRadius: '24px', overflow: 'hidden',
        padding: 'clamp(32px,5vw,52px) clamp(24px,5vw,60px)',
        background: 'rgba(255,255,255,0.025)',
        border: `1px solid ${hCard ? 'rgba(255,255,255,0.14)' : 'rgba(255,255,255,0.07)'}`,
        backdropFilter: 'blur(16px)',
        transition: 'border-color .3s ease, box-shadow .3s ease',
        boxShadow: hCard ? `0 32px 64px rgba(37,99,235,0.2)` : '0 4px 24px rgba(0,0,0,0.2)',
      }}
    >
      {/* Dynamic spotlight */}
      <div aria-hidden style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        background: `radial-gradient(280px circle at ${mouse.x}% ${mouse.y}%, ${G.blue}18, transparent 60%)`,
        transition: hCard ? 'none' : 'opacity .4s ease',
        opacity: hCard ? 1 : 0,
      }} />

      {/* Static orbs */}
      <div aria-hidden style={{ position: 'absolute', top: '-40px', left: '8%', width: '200px', height: '200px', borderRadius: '50%', background: `radial-gradient(circle,${G.blue}28 0%,transparent 70%)`, filter: 'blur(48px)', pointerEvents: 'none' }} />
      <div aria-hidden style={{ position: 'absolute', bottom: '-30px', right: '6%', width: '170px', height: '170px', borderRadius: '50%', background: `radial-gradient(circle,${G.orange}22 0%,transparent 70%)`, filter: 'blur(48px)', pointerEvents: 'none' }} />

      <div style={{ position: 'relative', zIndex: 1, display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '28px', flexWrap: 'wrap' }}>
        <div style={{ flex: 1, minWidth: '240px' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', marginBottom: '14px' }}>
            <span style={{ width: '16px', height: '2px', borderRadius: '999px', background: `linear-gradient(90deg,${G.blue},${G.orange})` }} />
            <span style={{ fontSize: '10px', fontWeight: 800, letterSpacing: '0.13em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.4)' }}>
              Zero Upfront · Pay After Offer
            </span>
            <span style={{ width: '16px', height: '2px', borderRadius: '999px', background: `linear-gradient(90deg,${G.orange},${G.blue})` }} />
          </div>
          <h2 style={{ fontSize: 'clamp(1.4rem,2.8vw,2.2rem)', fontWeight: 900, lineHeight: 1.12, letterSpacing: '-0.8px', marginBottom: '10px', color: '#fff' }}>
            Ready to <GradText>Transform Your Career?</GradText>
          </h2>
          <p style={{ fontSize: '13.5px', color: 'rgba(255,255,255,0.5)', lineHeight: 1.7, maxWidth: '400px', margin: 0 }}>
            Join 300+ professionals who trusted Placedly. Get placed, get paid more — or you pay nothing.
          </p>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', flexShrink: 0 }}>
          <Link href={ctaHref}
            style={{
              display: 'inline-flex', alignItems: 'center', gap: '8px',
              backgroundImage: `linear-gradient(135deg,${G.blue},${G.indigo})`,
              color: '#fff', fontWeight: 700, fontSize: '14px',
              padding: '13px 28px', borderRadius: '999px', textDecoration: 'none',
              boxShadow: `0 8px 24px ${G.blue}45`, transition: 'transform .15s ease, box-shadow .2s ease',
            }}
            onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = `0 14px 32px ${G.blue}55`; }}
            onMouseLeave={e => { e.currentTarget.style.transform = ''; e.currentTarget.style.boxShadow = `0 8px 24px ${G.blue}45`; }}
          >
            <Rocket size={14} /> {ctaText} <ArrowUpRight size={13} />
          </Link>
          <a href={`https://wa.me/${wa}`} target="_blank" rel="noopener noreferrer"
            style={{
              display: 'inline-flex', alignItems: 'center', gap: '8px',
              background: 'rgba(37,211,102,0.1)', border: '1px solid rgba(37,211,102,0.28)',
              color: '#4ade80', fontWeight: 600, fontSize: '13px',
              padding: '11px 24px', borderRadius: '999px', textDecoration: 'none',
              transition: 'all .15s ease',
            }}
            onMouseEnter={e => { e.currentTarget.style.background = 'rgba(37,211,102,0.2)'; e.currentTarget.style.transform = 'translateY(-2px)'; }}
            onMouseLeave={e => { e.currentTarget.style.background = 'rgba(37,211,102,0.1)'; e.currentTarget.style.transform = ''; }}
          >
            <MessageCircle size={13} /> WhatsApp Us
          </a>
        </div>
      </div>
    </div>
  );
}

/* ════════════════════════════════
   SCROLL-TO-TOP WITH PROGRESS RING
════════════════════════════════ */
function ScrollTopBtn() {
  const [hovered, setHovered] = useState(false);
  const [progress, setProgress] = useState(0);
  const [show, setShow] = useState(false);

  useEffect(() => {
    const fn = () => {
      const h = document.documentElement;
      const max = h.scrollHeight - h.clientHeight;
      const scrolled = window.pageYOffset;
      setProgress(max > 0 ? (scrolled / max) * 100 : 0);
      setShow(scrolled > 300);
    };
    window.addEventListener('scroll', fn, { passive: true });
    return () => window.removeEventListener('scroll', fn);
  }, []);

  const r = 17, circ = 2 * Math.PI * r;

  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      aria-label="Scroll to top"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        position: 'relative', width: '44px', height: '44px', borderRadius: '50%',
        border: 'none', cursor: 'pointer', flexShrink: 0,
        background: hovered ? `linear-gradient(135deg,${G.blue},${G.indigo})` : 'rgba(255,255,255,0.07)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        transition: 'all .2s ease',
        transform: hovered ? 'translateY(-3px)' : 'translateY(0)',
        boxShadow: hovered ? `0 8px 20px ${G.blue}40` : 'none',
        opacity: show ? 1 : 0.35,
      }}
    >
      <svg width="44" height="44" style={{ position: 'absolute', inset: 0, transform: 'rotate(-90deg)' }}>
        <circle cx="22" cy="22" r={r} fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="2" />
        <circle cx="22" cy="22" r={r} fill="none"
          stroke={hovered ? 'rgba(255,255,255,0.6)' : G.blue} strokeWidth="2.5"
          strokeDasharray={circ} strokeDashoffset={circ - (progress / 100) * circ}
          strokeLinecap="round"
          style={{ transition: 'stroke-dashoffset .12s linear, stroke .2s ease' }}
        />
      </svg>
      <ArrowUp size={15} color={hovered ? '#fff' : 'rgba(255,255,255,0.65)'} style={{ position: 'relative', zIndex: 1 }} />
    </button>
  );
}

/* ════════════════════════════════
   ANIMATED TICKER PILL
════════════════════════════════ */
function LiveTicker({ items, idx, visible }: { items: typeof TICKER_ITEMS; idx: number; visible: boolean }) {
  const item = items[idx];
  return (
    <div style={{
      display: 'inline-flex', alignItems: 'center', gap: '10px',
      background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)',
      borderRadius: '999px', padding: '6px 16px 6px 8px', overflow: 'hidden',
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
        display: 'inline-flex', alignItems: 'center', gap: '6px',
        opacity: visible ? 1 : 0, transform: visible ? 'translateY(0)' : 'translateY(5px)',
        transition: 'opacity .3s ease, transform .3s ease',
        whiteSpace: 'nowrap', overflow: 'hidden',
      }}>
        <span style={{ fontSize: '13px' }}>{item.emoji}</span>
        <span style={{ fontSize: '12px', fontWeight: 600, color: 'rgba(255,255,255,0.7)' }}>{item.text}</span>
        <span style={{
          fontSize: '10.5px', fontWeight: 700, padding: '2px 7px', borderRadius: '999px',
          background: `${DOT_COLORS[idx % DOT_COLORS.length]}20`,
          color: DOT_COLORS[idx % DOT_COLORS.length],
          border: `1px solid ${DOT_COLORS[idx % DOT_COLORS.length]}30`,
        }}>{item.detail}</span>
      </span>
    </div>
  );
}

/* ════════════════════════════════
   ACHIEVEMENT MARQUEE
════════════════════════════════ */
function AchievementMarquee() {
  const doubled = [...ACHIEVEMENTS, ...ACHIEVEMENTS];
  return (
    <div style={{ overflow: 'hidden', position: 'relative', maskImage: 'linear-gradient(90deg,transparent,black 8%,black 92%,transparent)' }}>
      <div style={{ display: 'flex', gap: '0', animation: 'ft-marquee 22s linear infinite', width: 'max-content' }}>
        {doubled.map((a, i) => (
          <div key={i} style={{
            display: 'inline-flex', alignItems: 'center', gap: '6px',
            padding: '7px 20px', whiteSpace: 'nowrap',
            borderRight: '1px solid rgba(255,255,255,0.06)',
          }}>
            {a.icon}
            <span style={{ fontSize: '11.5px', fontWeight: 600, color: 'rgba(255,255,255,0.45)' }}>{a.text}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ════════════════════════════════
   NEWSLETTER SECTION
════════════════════════════════ */
function Newsletter() {
  const [email, setEmail] = useState('');
  const [state, setState] = useState<'idle' | 'loading' | 'done'>('idle');
  const [focused, setFocused] = useState(false);

  const handle = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.includes('@')) return;
    setState('loading');
    setTimeout(() => setState('done'), 900);
  };

  return (
    <div style={{
      position: 'relative', overflow: 'hidden',
      background: 'rgba(255,255,255,0.025)',
      border: '1px solid rgba(255,255,255,0.07)',
      borderRadius: '18px', padding: '28px 32px',
    }}>
      {/* Subtle orb */}
      <div aria-hidden style={{ position: 'absolute', top: '-30px', right: '-20px', width: '140px', height: '140px', borderRadius: '50%', background: `radial-gradient(circle,${G.indigo}20 0%,transparent 70%)`, filter: 'blur(30px)', pointerEvents: 'none' }} />

      <div style={{ position: 'relative', zIndex: 1, display: 'flex', alignItems: 'center', gap: '24px', flexWrap: 'wrap' }}>
        <div style={{ flex: 1, minWidth: '200px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
            <div style={{ width: '26px', height: '26px', borderRadius: '8px', background: `${G.orange}18`, border: `1px solid ${G.orange}30`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Sparkles size={13} color={G.orange} />
            </div>
            <span style={{ fontSize: '14px', fontWeight: 800, color: '#fff' }}>Career Tips & Placement Alerts</span>
          </div>
          <p style={{ fontSize: '12px', color: 'rgba(255,255,255,0.38)', margin: 0, paddingLeft: '34px' }}>
            Weekly insights — no spam, unsubscribe anytime.
          </p>
        </div>

        {state === 'done' ? (
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', animation: 'ft-pop .4s ease' }}>
            <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: 'rgba(74,222,128,0.12)', border: '1px solid rgba(74,222,128,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <CheckCircle2 size={16} color="#4ade80" />
            </div>
            <span style={{ fontSize: '13.5px', fontWeight: 700, color: '#4ade80' }}>You&apos;re in! Watch your inbox.</span>
          </div>
        ) : (
          <form onSubmit={handle} style={{ display: 'flex', gap: '8px', flex: 1, maxWidth: '360px' }}>
            <div style={{ flex: 1, position: 'relative' }}>
              <input
                type="email" required placeholder="your@email.com"
                value={email} onChange={e => setEmail(e.target.value)}
                onFocus={() => setFocused(true)} onBlur={() => setFocused(false)}
                style={{
                  width: '100%', padding: '10px 14px', borderRadius: '10px',
                  border: `1.5px solid ${focused ? G.blue : 'rgba(255,255,255,0.1)'}`,
                  background: focused ? 'rgba(37,99,235,0.08)' : 'rgba(255,255,255,0.05)',
                  color: '#fff', fontSize: '13px', fontFamily: 'inherit',
                  outline: 'none', boxSizing: 'border-box',
                  transition: 'border-color .15s ease, background .15s ease',
                  boxShadow: focused ? `0 0 0 3px ${G.blue}18` : 'none',
                }}
              />
            </div>
            <button type="submit" disabled={state === 'loading'}
              style={{
                display: 'inline-flex', alignItems: 'center', gap: '6px',
                padding: '10px 18px', borderRadius: '10px', border: 'none',
                backgroundImage: state === 'loading' ? 'none' : `linear-gradient(135deg,${G.blue},${G.indigo})`,
                background: state === 'loading' ? 'rgba(255,255,255,0.08)' : undefined,
                color: state === 'loading' ? 'rgba(255,255,255,0.4)' : '#fff',
                fontWeight: 700, fontSize: '13px',
                cursor: state === 'loading' ? 'wait' : 'pointer',
                fontFamily: 'inherit', whiteSpace: 'nowrap',
                boxShadow: state !== 'loading' ? `0 4px 14px ${G.blue}35` : 'none',
                transition: 'transform .15s ease',
                position: 'relative', overflow: 'hidden',
              }}
              onMouseEnter={e => { if (state !== 'loading') e.currentTarget.style.transform = 'translateY(-1px)'; }}
              onMouseLeave={e => { e.currentTarget.style.transform = ''; }}
            >
              {state === 'loading' ? (
                <span style={{ width: '14px', height: '14px', border: '2px solid rgba(255,255,255,0.3)', borderTopColor: '#fff', borderRadius: '50%', animation: 'ft-spin .7s linear infinite', display: 'inline-block' }} />
              ) : (
                <><Sparkles size={12} /> Subscribe</>
              )}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

/* ════════════════════════════════
   CONTACT CARD (interactive)
════════════════════════════════ */
function ContactItem({ Icon, color, text, href, label }: {
  Icon: LucideIcon;
  color: string; text: string; href: string | null; label: string;
}) {
  const [h, setH] = useState(false);
  const inner = (
    <div
      onMouseEnter={() => setH(true)} onMouseLeave={() => setH(false)}
      style={{
        display: 'flex', alignItems: 'center', gap: '10px',
        padding: '10px 12px', borderRadius: '12px',
        background: h ? `${color}10` : 'rgba(255,255,255,0.03)',
        border: `1px solid ${h ? color + '25' : 'rgba(255,255,255,0.06)'}`,
        transition: 'all .2s ease',
        transform: h ? 'translateX(4px)' : 'translateX(0)',
        cursor: href ? 'pointer' : 'default',
      }}
    >
      <div style={{
        width: '30px', height: '30px', borderRadius: '9px', flexShrink: 0,
        background: h ? `${color}20` : 'rgba(255,255,255,0.06)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        transition: 'background .2s ease',
      }}>
        <Icon size={14} color={h ? color : 'rgba(255,255,255,0.5)'} />
      </div>
      <div style={{ minWidth: 0 }}>
        <div style={{ fontSize: '9px', fontWeight: 700, color: 'rgba(255,255,255,0.3)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>{label}</div>
        <div style={{ fontSize: '12.5px', fontWeight: 600, color: h ? color : 'rgba(255,255,255,0.6)', transition: 'color .15s ease', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{text}</div>
      </div>
    </div>
  );

  return href ? (
    <a href={href} target={href.startsWith('http') ? '_blank' : undefined} rel="noopener noreferrer" style={{ textDecoration: 'none' }}>
      {inner}
    </a>
  ) : <div>{inner}</div>;
}

/* ════════════════════════════════
   MAIN FOOTER
════════════════════════════════ */
export default function Footer({ cms = {} }: { cms?: Cms }) {
  const [tickerIdx, setTickerIdx]         = useState(0);
  const [tickerVisible, setTickerVisible] = useState(true);
  const [visible, setVisible]             = useState(false);
  const footerRef = useRef<HTMLElement>(null);

  /* CMS */
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

  /* Reveal */
  useEffect(() => {
    const el = footerRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setVisible(true); },
      { threshold: 0.04 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  /* Ticker */
  useEffect(() => {
    const t = setInterval(() => {
      setTickerVisible(false);
      setTimeout(() => { setTickerIdx(i => (i + 1) % TICKER_ITEMS.length); setTickerVisible(true); }, 350);
    }, 3600);
    return () => clearInterval(t);
  }, []);

  const socials = [
    { href: instagram, label: 'Instagram', Icon: IgIcon, color: '#e1306c', bg: '#fff0f5' },
    { href: twitter,   label: 'Twitter/X', Icon: TwIcon, color: '#1d9bf0', bg: '#e8f5fd' },
    { href: linkedin,  label: 'LinkedIn',  Icon: LiIcon, color: '#0077b5', bg: '#e8f4fb' },
    { href: facebook,  label: 'Facebook',  Icon: FbIcon, color: '#1877f2', bg: '#e8f0fe' },
  ];

  const contacts = [
    { Icon: MessageCircle, color: G.green,  text: `+91 ${wa.slice(-10)}`, href: `https://wa.me/${wa}`, label: 'WhatsApp' },
    { Icon: Mail,          color: G.blue,   text: emailAddr,              href: `mailto:${emailAddr}`, label: 'Email' },
    { Icon: MapPin,        color: G.orange, text: 'Delhi NCR, India',     href: null,                  label: 'Office' },
    { Icon: Clock,         color: G.purple, text: 'Mon–Sat 9AM–7PM',      href: null,                  label: 'Hours' },
  ];

  return (
    <>
      <style>{`
        @keyframes ft-grad      { 0%{background-position:0% 50%} 50%{background-position:100% 50%} 100%{background-position:0% 50%} }
        @keyframes ft-blob-a    { 0%,100%{transform:translate(0,0) scale(1)} 50%{transform:translate(20px,15px) scale(1.05)} }
        @keyframes ft-blob-b    { 0%,100%{transform:translate(0,0) scale(1)} 50%{transform:translate(-15px,-10px) scale(1.04)} }
        @keyframes ft-blob-c    { 0%,100%{transform:translate(0,0) scale(1)} 50%{transform:translate(10px,-20px) scale(1.06)} }
        @keyframes ft-ticker-dot{ 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:.4;transform:scale(1.3)} }
        @keyframes ft-spin      { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }
        @keyframes ft-shimmer   { from{transform:translateX(-100%)} to{transform:translateX(200%)} }
        @keyframes ft-pop       { 0%{transform:scale(.7);opacity:0} 70%{transform:scale(1.06)} 100%{transform:scale(1);opacity:1} }
        @keyframes ft-marquee   { from{transform:translateX(0)} to{transform:translateX(-50%)} }
        @keyframes ft-pulse-ring{ 0%{transform:scale(1);opacity:.5} 70%{transform:scale(1.7);opacity:0} 100%{transform:scale(1.7);opacity:0} }

        /* Responsive grid */
        .ft-main-grid { display:grid; grid-template-columns:1.5fr 1fr 1fr 1fr; gap:44px; align-items:start; }
        .ft-bottom-row{ display:flex; align-items:center; justify-content:space-between; gap:16px; flex-wrap:wrap; }

        @media (max-width:1024px){ .ft-main-grid{ grid-template-columns:1fr 1fr; gap:32px; } }
        @media (max-width:640px) {
          .ft-main-grid { grid-template-columns:1fr; gap:24px; }
          .ft-bottom-row{ flex-direction:column; text-align:center; }
        }
      `}</style>

      <footer ref={footerRef} style={{
        position: 'relative', overflow: 'hidden',
        background: 'linear-gradient(165deg,#04060e 0%,#080b1e 45%,#0e0e34 100%)',
        paddingTop: '1px',
      }}>

        {/* ── Animated ambient orbs ── */}
        {[
          { top: '-130px', left: '-110px', size: '520px', color: `${G.blue}1c`, anim: 'ft-blob-a 17s ease-in-out infinite' },
          { top: '15%',  right: '-130px', size: '440px', color: `${G.orange}16`, anim: 'ft-blob-b 19s ease-in-out infinite 1.5s' },
          { bottom: '-80px', left: '30%', size: '360px', color: `${G.purple}12`, anim: 'ft-blob-c 21s ease-in-out infinite 3s' },
          { top: '55%', left: '55%',     size: '280px', color: `${G.rose}0e`,   anim: 'ft-blob-a 24s ease-in-out infinite 5s' },
        ].map((orb, i) => (
          <div key={i} aria-hidden style={{
            position: 'absolute', borderRadius: '50%', pointerEvents: 'none',
            width: orb.size, height: orb.size,
            top: orb.top ?? 'auto', left: (orb as { left?: string }).left ?? 'auto',
            right: (orb as { right?: string }).right ?? 'auto',
            bottom: (orb as { bottom?: string }).bottom ?? 'auto',
            background: `radial-gradient(circle,${orb.color} 0%,transparent 70%)`,
            filter: 'blur(80px)', animation: orb.anim,
          }} />
        ))}

        {/* ══════════════════════
            CTA CARD
        ══════════════════════ */}
        <div style={{
          padding: '64px 0 0', position: 'relative', zIndex: 1,
          opacity: visible ? 1 : 0, transform: visible ? 'translateY(0)' : 'translateY(18px)',
          transition: 'opacity .6s ease, transform .6s ease',
        }}>
          <div className="container">
            <CtaCard ctaText={ctaText} ctaHref={ctaHref} wa={wa} />
          </div>
        </div>

        {/* ══════════════════════
            LIVE TICKER
        ══════════════════════ */}
        <div style={{ padding: '28px 0 0', position: 'relative', zIndex: 1 }}>
          <div className="container">
            <LiveTicker items={TICKER_ITEMS} idx={tickerIdx} visible={tickerVisible} />
          </div>
        </div>

        {/* ══════════════════════
            ACHIEVEMENT MARQUEE
        ══════════════════════ */}
        <div style={{ padding: '28px 0 0', position: 'relative', zIndex: 1 }}>
          <div style={{
            borderTop: '1px solid rgba(255,255,255,0.05)',
            borderBottom: '1px solid rgba(255,255,255,0.05)',
            padding: '10px 0',
          }}>
            <AchievementMarquee />
          </div>
        </div>

        {/* ══════════════════════
            MAIN GRID
        ══════════════════════ */}
        <div style={{ padding: '52px 0 0', position: 'relative', zIndex: 1 }}>
          <div className="container">
            <div
              className="ft-main-grid"
              style={{
                opacity: visible ? 1 : 0,
                transform: visible ? 'translateY(0)' : 'translateY(14px)',
                transition: 'opacity .7s ease .15s, transform .7s ease .15s',
              }}
            >
              {/* Brand Column */}
              <div>
                <Link href="/" style={{ display: 'inline-block', marginBottom: '18px' }}>
                  <img src="/logo-dark.png" alt="Placedly" style={{ height: '34px', width: 'auto' }} loading="lazy" />
                </Link>

                <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.45)', lineHeight: 1.75, marginBottom: '18px', maxWidth: '270px' }}>
                  {desc}
                </p>

                {/* Trust pills */}
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '5px', marginBottom: '20px' }}>
                  {[
                    { label: 'Zero Upfront', color: G.blue },
                    { label: '12% Post-Offer', color: G.orange },
                    { label: 'Pan-India', color: G.purple },
                    { label: 'Study Abroad', color: G.green },
                  ].map(t => (
                    <span key={t.label} style={{
                      fontSize: '9.5px', fontWeight: 700, letterSpacing: '0.02em',
                      color: t.color, background: `${t.color}14`,
                      border: `1px solid ${t.color}28`,
                      borderRadius: '999px', padding: '3px 9px',
                    }}>
                      {t.label}
                    </span>
                  ))}
                </div>

                {/* Socials */}
                <div style={{ display: 'flex', gap: '8px', marginBottom: '22px', flexWrap: 'wrap' }}>
                  {socials.map(s => <SocialBtn key={s.label} {...s} />)}
                </div>

                {/* Contact items */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  {contacts.map(c => <ContactItem key={c.label} {...c} />)}
                </div>
              </div>

              {/* Nav Columns */}
              {NAV_COLS.map((col, ci) => (
                <div key={col.heading}>
                  {/* Heading */}
                  <div style={{ marginBottom: '6px' }}>
                    <span style={{
                      fontSize: '10px', fontWeight: 800, letterSpacing: '0.13em',
                      textTransform: 'uppercase',
                      backgroundImage: `linear-gradient(90deg,${col.color},${G.indigo})`,
                      WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
                      backgroundClip: 'text', display: 'inline-block',
                    }}>
                      {col.heading}
                    </span>
                  </div>
                  {/* Animated accent underline */}
                  <div style={{
                    height: '2px', width: '32px', borderRadius: '999px', marginBottom: '18px',
                    background: `linear-gradient(90deg,${col.color},transparent)`,
                  }} />
                  <nav style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                    {col.links.map(l => (
                      <FooterLink key={l.label} href={l.href} label={l.label} badge={l.badge} />
                    ))}
                  </nav>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ══════════════════════
            NEWSLETTER
        ══════════════════════ */}
        <div style={{ padding: '44px 0 0', position: 'relative', zIndex: 1 }}>
          <div className="container">
            <Newsletter />
          </div>
        </div>

        {/* ══════════════════════
            DIVIDER WITH LOGO CENTRE
        ══════════════════════ */}
        <div style={{ padding: '44px 0 0', position: 'relative', zIndex: 1 }}>
          <div className="container">
            <div style={{ position: 'relative', display: 'flex', alignItems: 'center', gap: '16px' }}>
              <div style={{ flex: 1, height: '1px', background: 'linear-gradient(90deg,transparent,rgba(255,255,255,0.08) 50%,rgba(255,255,255,0.08))' }} />
              <div style={{
                display: 'flex', alignItems: 'center', gap: '6px', flexShrink: 0,
                padding: '4px 14px', borderRadius: '999px',
                background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.07)',
              }}>
                <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: GRAD, animation: 'ft-ticker-dot 2s ease-in-out infinite' }} />
                <span style={{ fontSize: '10px', fontWeight: 700, color: 'rgba(255,255,255,0.3)', letterSpacing: '0.08em' }}>PLACEDLY</span>
              </div>
              <div style={{ flex: 1, height: '1px', background: 'linear-gradient(90deg,rgba(255,255,255,0.08),rgba(255,255,255,0.08) 50%,transparent)' }} />
            </div>
          </div>
        </div>

        {/* ══════════════════════
            BOTTOM BAR
        ══════════════════════ */}
        <div style={{ position: 'relative', zIndex: 1 }}>
          <div className="container" style={{ padding: '18px 0 24px' }}>
            <div className="ft-bottom-row">
              <p style={{ fontSize: '10.5px', color: 'rgba(255,255,255,0.24)', lineHeight: 1.65, flex: 1, margin: 0 }}>
                {copyright}
              </p>
              <div style={{ display: 'flex', alignItems: 'center', gap: '18px', flexShrink: 0 }}>
                <span style={{ fontSize: '11px', color: 'rgba(255,255,255,0.22)', whiteSpace: 'nowrap' }}>
                  Made with{' '}
                  <span style={{ backgroundImage: `linear-gradient(90deg,${G.rose},${G.orange})`, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>♥</span>
                  {' '}in India
                </span>
                <ScrollTopBtn />
              </div>
            </div>
          </div>
        </div>

      </footer>
    </>
  );
}