'use client';

import { motion } from 'framer-motion';
import {
  Sparkles, Briefcase, Globe, ArrowRight,
  Share2, CheckCircle2, Zap,
} from 'lucide-react';
import Link from 'next/link';
import HeroGradientBg from './HeroGradientBg';
import HeroBgVideo from './HeroBgVideo';

type HeroCms = { [k: string]: string };

/* ── Brand tokens — matches site-wide theme ── */
const G = {
  blue:   '#2563eb',
  indigo: '#7c8ff0',
  orange: '#fb923c',
  rose:   '#f43f5e',
  purple: '#a855f7',
  green:  '#16a34a',
};

/* ── Scatter avatars — positions tuned for mobile viewport ── */
const SCATTER_AVATARS = [
  {
    src: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=128&h=128&fit=crop&crop=face',
    top: '8%', left: '6%', size: 36, rotate: -12, blur: false, delay: 0.1,
  },
  {
    src: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=128&h=128&fit=crop&crop=face',
    top: '3%', left: '58%', size: 42, rotate: 0, center: true, delay: 0.2,
  },
  {
    src: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=128&h=128&fit=crop&crop=face',
    top: '68%', left: '22%', size: 30, rotate: -8, blur: false, delay: 0.15,
  },
  {
    src: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=128&h=128&fit=crop&crop=face',
    top: '14%', left: '86%', size: 28, rotate: 10, blur: false, delay: 0.25,
  },
  {
    src: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=128&h=128&fit=crop&crop=face',
    top: '72%', left: '74%', size: 32, rotate: 6, blur: false, delay: 0.3,
  },
] as const;

const HERO_CARD_AVATARS = {
  left:  'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=96&h=96&fit=crop&crop=face',
  right: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=96&h=96&fit=crop&crop=face',
} as const;

/* ── Gradient text — matches desktop exactly ── */
const GRADIENT_STYLE: React.CSSProperties = {
  backgroundImage: `linear-gradient(270deg,${G.blue},${G.indigo},${G.orange},${G.rose},${G.purple},${G.blue})`,
  backgroundSize: '300% 300%',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  backgroundClip: 'text',
  animation: 'placedly-gradient-shift 6s ease infinite',
  display: 'inline',
};

/* ── Live activity ticker items ── */
const TICKER_ITEMS = [
  '🎉 Ankit R. placed at WNS — ₹6.4L CTC',
  '⚡ Priya S. interview call — 9 days',
  '✅ Rohit K. signed offer — 52% hike',
  '🎯 Vikram T. landed Sr. Analyst role',
  '🚀 47 candidates in active connect',
];

/* ════════════════════════════════════════════
   LIVE TICKER PILL
════════════════════════════════════════════ */
function MobileTicker() {
  const [idx, setIdx]         = React.useState(0);
  const [show, setShow]       = React.useState(true);

  React.useEffect(() => {
    const t = setInterval(() => {
      setShow(false);
      setTimeout(() => {
        setIdx(i => (i + 1) % TICKER_ITEMS.length);
        setShow(true);
      }, 320);
    }, 3400);
    return () => clearInterval(t);
  }, []);

  return (
    <div style={{
      display: 'inline-flex', alignItems: 'center', gap: '8px',
      background: 'rgba(255,255,255,0.08)',
      backdropFilter: 'blur(12px)',
      border: '1px solid rgba(255,255,255,0.14)',
      borderRadius: '999px',
      padding: '5px 14px 5px 7px',
      maxWidth: '100%', overflow: 'hidden',
    }}>
      <span style={{
        display: 'inline-flex', alignItems: 'center', gap: '4px',
        fontSize: '8.5px', fontWeight: 800, color: '#ef4444',
        background: 'rgba(239,68,68,0.18)', padding: '2px 7px',
        borderRadius: '999px', flexShrink: 0,
      }}>
        <span style={{
          width: '5px', height: '5px', borderRadius: '50%',
          background: '#ef4444', display: 'inline-block',
          animation: 'mb-ticker-dot 1.4s ease-in-out infinite',
        }} />
        LIVE
      </span>
      <span style={{
        fontSize: '11.5px', fontWeight: 600,
        color: show ? 'rgba(255,255,255,0.85)' : 'transparent',
        whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis',
        transition: 'color .28s ease, transform .28s ease',
        transform: show ? 'translateY(0)' : 'translateY(4px)',
        maxWidth: '200px',
      }}>
        {TICKER_ITEMS[idx]}
      </span>
    </div>
  );
}

/* ════════════════════════════════════════════
   CTA BUTTON — matches desktop shine-pill
════════════════════════════════════════════ */
function MobileCtaButton({
  href, label, variant, delay = 0,
}: {
  href: string; label: string;
  variant: 'get-placed' | 'study-abroad';
  delay?: number;
}) {
  const isPlaced = variant === 'get-placed';
  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      whileTap={{ scale: 0.97 }}
      style={{ flex: 1 }}
    >
      <Link href={href} className={`placedly-hero-cta placedly-hero-cta--${variant}`}
        style={{ width: '100%', justifyContent: 'center', padding: '14px 20px', fontSize: '14.5px' }}
      >
        <span className="placedly-hero-cta-shine" aria-hidden />
        <span className="placedly-hero-cta-label">{label}</span>
        <motion.span
          className="placedly-hero-cta-icon"
          animate={{ x: [0, 3, 0] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut', delay: delay + 0.3 }}
        >
          {isPlaced
            ? <Briefcase size={13} strokeWidth={2.5} />
            : <Globe size={13} strokeWidth={2.5} />
          }
        </motion.span>
      </Link>
    </motion.div>
  );
}

/* ════════════════════════════════════════════
   FLOATING GLASS CARD
════════════════════════════════════════════ */
function MobileCard({
  side, avatarSrc, name, role, line, animY, delay = 0,
}: {
  side: 'left' | 'right';
  avatarSrc: string; name: string; role: string; line: React.ReactNode;
  animY: number[]; delay?: number;
}) {
  return (
    <motion.div
      animate={{ y: animY }}
      transition={{ duration: side === 'left' ? 5.5 : 6, repeat: Infinity, ease: 'easeInOut', delay }}
      style={{
        position: 'absolute',
        bottom: side === 'left' ? '18%' : '12%',
        left: side === 'left' ? '-2px' : undefined,
        right: side === 'right' ? '-2px' : undefined,
        width: '158px',
        background: 'rgba(255,255,255,0.88)',
        backdropFilter: 'blur(16px)',
        borderRadius: '16px',
        padding: '11px 13px',
        boxShadow: side === 'left'
          ? `0 12px 32px rgba(37,99,235,0.22), 0 2px 8px rgba(0,0,0,0.1)`
          : `0 12px 32px rgba(251,146,60,0.22), 0 2px 8px rgba(0,0,0,0.1)`,
        border: `1px solid ${side === 'left' ? 'rgba(37,99,235,0.15)' : 'rgba(251,146,60,0.15)'}`,
        zIndex: 10,
      }}
    >
      {/* Accent top strip */}
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0, height: '2.5px',
        borderRadius: '16px 16px 0 0',
        background: side === 'left'
          ? `linear-gradient(90deg,${G.blue},${G.indigo})`
          : `linear-gradient(90deg,${G.orange},${G.rose})`,
      }} />

      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '7px' }}>
        <img src={avatarSrc} alt="" width={28} height={28} loading="lazy" decoding="async"
          style={{ width: '28px', height: '28px', borderRadius: '50%', objectFit: 'cover', border: '2px solid #fff', boxShadow: '0 2px 6px rgba(0,0,0,0.12)', flexShrink: 0 }}
        />
        <div style={{ minWidth: 0 }}>
          <p style={{ fontSize: '11.5px', fontWeight: 800, color: '#0f172a', margin: 0, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{name}</p>
          <p style={{ fontSize: '9.5px', color: '#64748b', margin: 0, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{role}</p>
        </div>
      </div>

      <div style={{
        fontSize: '10.5px', color: '#374151', lineHeight: 1.45,
        padding: '6px 8px', borderRadius: '8px',
        background: side === 'left' ? `${G.blue}08` : `${G.orange}08`,
        border: `1px solid ${side === 'left' ? G.blue + '18' : G.orange + '18'}`,
      }}>
        {line}
      </div>
    </motion.div>
  );
}

/* ════════════════════════════════════════════
   ACHIEVEMENT BADGES ROW
════════════════════════════════════════════ */
function AchievementBadges() {
  const badges = [
    { icon: <CheckCircle2 size={10} color={G.green} />,  text: '300+ Placed',     color: G.green  },
    { icon: <Zap size={10} color={G.orange} />,          text: '40% Avg Hike',    color: G.orange },
    { icon: <Globe size={10} color={G.blue} />,          text: '140+ Uni\'s',     color: G.blue   },
    { icon: <Sparkles size={10} color={G.purple} />,     text: '₹0 Upfront',      color: G.purple },
  ];
  return (
    <div style={{
      display: 'flex', gap: '6px', flexWrap: 'wrap', justifyContent: 'center',
    }}>
      {badges.map((b, i) => (
        <motion.div
          key={b.text}
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.35, delay: 0.5 + i * 0.06 }}
          style={{
            display: 'inline-flex', alignItems: 'center', gap: '4px',
            fontSize: '10px', fontWeight: 700, color: b.color,
            background: `${b.color}12`, border: `1px solid ${b.color}28`,
            borderRadius: '999px', padding: '4px 10px',
            backdropFilter: 'blur(8px)',
          }}
        >
          {b.icon} {b.text}
        </motion.div>
      ))}
    </div>
  );
}

/* ════════════════════════════════════════════
   MAIN MOBILE HERO
════════════════════════════════════════════ */
import React from 'react';

export default function HeroMobileBrief({ cms = {} }: { cms?: HeroCms }) {
  const offerRole      = cms['hp:heroOfferRole']      ?? 'Senior Claims Analyst';
  const offerName      = cms['hp:heroOfferName']      ?? 'Priya';
  const admitName      = cms['hp:heroAdmitName']      ?? 'Arjun';
  const admitProgramme = cms['hp:heroAdmitProgramme'] ?? "MSc International Business · Fall '25";
  const subline        = cms['hp:heroSubline']        ?? 'Career Placement & Global Education Consultancy — Delhi NCR.';
  const primaryCta     = cms['hp:heroPrimaryCtaText'] ?? 'Get Placed';
  const secondaryCta   = cms['hp:heroSecondaryCtaText'] ?? 'Study Abroad';

  return (
    <div className="placedly-hero-mobile-brief" aria-label="Mobile hero">

      {/* Background layers */}
      <HeroGradientBg />
      <HeroBgVideo />

      {/* ════ KEYFRAMES ════ */}
      <style>{`
        @keyframes placedly-gradient-shift {
          0%   { background-position:0%   50%; }
          50%  { background-position:100% 50%; }
          100% { background-position:0%   50%; }
        }
        @keyframes mb-ticker-dot {
          0%,100% { opacity:1; transform:scale(1);   }
          50%     { opacity:.4; transform:scale(1.3); }
        }
        @keyframes mb-float-up {
          0%,100% { transform:translateY(0) rotate(-12deg); }
          50%     { transform:translateY(-6px) rotate(-12deg); }
        }
        @keyframes mb-float-right {
          0%,100% { transform:translateY(0) rotate(10deg); }
          50%     { transform:translateY(6px) rotate(10deg); }
        }
        @keyframes mb-pulse-ring {
          0%   { transform:scale(1);   opacity:.5; }
          70%  { transform:scale(1.6); opacity:0;  }
          100% { transform:scale(1.6); opacity:0;  }
        }

        /* Scatter avatar glow on center */
        .mb-scatter-center {
          box-shadow: 0 0 0 3px rgba(255,255,255,0.9), 0 8px 24px rgba(37,99,235,0.35) !important;
        }

        /* Scene stage */
        .mb-scene {
          position: relative;
          width: 100%;
          height: 220px;
          margin: 0 auto;
          max-width: 360px;
        }

        /* Shine-pill CTA — must be in scope for desktop-defined class to apply */
        .placedly-hero-cta {
          position: relative;
          display: inline-flex;
          align-items: center;
          gap: 10px;
          border-radius: 999px;
          font-weight: 700;
          font-size: 14.5px;
          letter-spacing: 0.01em;
          font-family: inherit;
          text-decoration: none;
          color: #ffffff;
          border: 1px solid rgba(255,255,255,0.25);
          overflow: hidden;
          isolation: isolate;
          cursor: pointer;
          background-size: 200% 200%;
          background-position: 0% 50%;
          transition: transform .28s cubic-bezier(.22,1,.36,1), box-shadow .28s cubic-bezier(.22,1,.36,1), filter .28s ease, background-position .6s ease;
        }
        .placedly-hero-cta--get-placed {
          background-image: linear-gradient(135deg,#2563eb,#7c8ff0);
          box-shadow: 0 8px 22px rgba(37,99,235,.32), 0 2px 6px rgba(0,0,0,.12), inset 0 1px 0 rgba(255,255,255,.25);
        }
        .placedly-hero-cta--study-abroad {
          background-image: linear-gradient(135deg,#fb923c,#f43f5e);
          box-shadow: 0 8px 22px rgba(251,146,60,.32), 0 2px 6px rgba(0,0,0,.12), inset 0 1px 0 rgba(255,255,255,.25);
        }
        .placedly-hero-cta:hover { transform:translateY(-2px); filter:brightness(1.07); background-position:100% 50%; }
        .placedly-hero-cta:active { transform:translateY(-1px) scale(.98); }
        .placedly-hero-cta-label { position:relative; z-index:1; white-space:nowrap; }
        .placedly-hero-cta-icon {
          position:relative; z-index:1; display:inline-flex; align-items:center; justify-content:center;
          width:24px; height:24px; border-radius:50%; background:rgba(255,255,255,.22);
          transition:background .3s ease;
        }
        .placedly-hero-cta:hover .placedly-hero-cta-icon { background:rgba(255,255,255,.34); }
        .placedly-hero-cta-shine {
          position:absolute; top:0; left:-130%; width:55%; height:100%;
          background:linear-gradient(115deg,transparent,rgba(255,255,255,.5),transparent);
          transform:skewX(-20deg); transition:left .65s ease; z-index:0; pointer-events:none;
        }
        .placedly-hero-cta:hover .placedly-hero-cta-shine { left:140%; }
      `}</style>

      {/* ════ COPY ════ */}
      <div className="placedly-lift-hero-copy" style={{ paddingBottom: '8px' }}>

        {/* Live ticker */}
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          style={{ marginBottom: '14px' }}
        >
          <MobileTicker />
        </motion.div>

        {/* Headline */}
        <motion.h1
          className="placedly-liftoff-m-headline"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.06 }}
          style={{ WebkitTextFillColor: 'initial', color: 'inherit', marginBottom: '10px' }}
        >
          Grow your career,
          <br />
          <span style={GRADIENT_STYLE}>through people you trust.</span>
        </motion.h1>

        {/* Subline — uses CMS value matching desktop */}
        <motion.p
          className="placedly-liftoff-m-sub"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.12 }}
          style={{ marginBottom: '16px' }}
        >
          {subline}
        </motion.p>

        {/* Achievement badges */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.18 }}
          style={{ marginBottom: '18px' }}
        >
          <AchievementBadges />
        </motion.div>

        {/* CTA buttons — full-width row matching desktop shine-pill */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.28 }}
          style={{ display: 'flex', gap: '10px', width: '100%' }}
        >
          <MobileCtaButton href="/contact"    label={primaryCta}   variant="get-placed"   delay={0.30} />
          <MobileCtaButton href="/study-visa" label={secondaryCta} variant="study-abroad" delay={0.36} />
        </motion.div>
      </div>

      {/* ════ VISUAL STAGE ════ */}
      <motion.div
        initial={{ opacity: 0, y: 22 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.22 }}
        style={{ position: 'relative', zIndex: 1 }}
      >
        <div className="mb-scene">

          {/* Scatter avatars */}
          {SCATTER_AVATARS.map((person, i) => {
            const isCenter = 'center' in person && person.center;
            const rotate   = 'rotate' in person ? person.rotate : 0;
            return (
              <motion.div
                key={`${person.src}-${i}`}
                initial={{ opacity: 0, scale: 0.7 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: 0.3 + person.delay }}
                style={{
                  position: 'absolute',
                  top: person.top, left: person.left,
                  width: person.size, height: person.size,
                  zIndex: isCenter ? 8 : i + 2,
                  transform: isCenter ? 'translateX(-50%)' : `rotate(${rotate}deg)`,
                }}
              >
                {/* Pulse ring on center avatar */}
                {isCenter && (
                  <div style={{
                    position: 'absolute', inset: '-4px', borderRadius: '50%',
                    background: `${G.blue}40`,
                    animation: 'mb-pulse-ring 2s ease-out infinite',
                  }} />
                )}
                <img src={person.src} alt="" width={person.size} height={person.size}
                  loading="lazy" decoding="async"
                  className={isCenter ? 'mb-scatter-center' : ''}
                  style={{
                    width: '100%', height: '100%', borderRadius: '50%', objectFit: 'cover',
                    border: isCenter ? `3px solid #fff` : `2px solid rgba(255,255,255,0.7)`,
                    boxShadow: isCenter
                      ? `0 8px 24px ${G.blue}40`
                      : '0 3px 10px rgba(0,0,0,0.18)',
                    display: 'block',
                  }}
                />
                {/* Badge dot on non-center */}
                {!isCenter && i % 2 === 0 && (
                  <div style={{
                    position: 'absolute', bottom: '-1px', right: '-1px',
                    width: '10px', height: '10px', borderRadius: '50%',
                    background: [G.blue, G.orange, G.green][i % 3],
                    border: '1.5px solid #fff',
                  }} />
                )}
              </motion.div>
            );
          })}

          {/* Glass pill — Share */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, delay: 0.5 }}
            animate-after={{ y: [0, -4, 0] }}
            style={{
              position: 'absolute', top: '38%', left: '50%',
              transform: 'translateX(-50%)',
              display: 'inline-flex', alignItems: 'center', gap: '6px',
              background: 'rgba(255,255,255,0.9)', backdropFilter: 'blur(12px)',
              border: `1px solid ${G.blue}20`, borderRadius: '999px',
              padding: '5px 12px 5px 7px',
              boxShadow: `0 6px 20px ${G.blue}20`,
              zIndex: 9, whiteSpace: 'nowrap',
            }}
          >
            <div style={{
              width: '20px', height: '20px', borderRadius: '50%', flexShrink: 0,
              background: `${G.blue}15`, border: `1px solid ${G.blue}25`,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <Share2 size={10} color={G.blue} />
            </div>
            <span style={{ fontSize: '10px', fontWeight: 700, color: '#0f172a' }}>Shared</span>
            <span style={{ fontSize: '10px', color: '#64748b' }}>CAP roadmap</span>
          </motion.div>

          {/* Glass pill — Sparkles */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, delay: 0.6 }}
            style={{
              position: 'absolute', top: '55%', right: '2%',
              display: 'inline-flex', alignItems: 'center', gap: '6px',
              background: 'rgba(255,255,255,0.9)', backdropFilter: 'blur(12px)',
              border: `1px solid ${G.orange}20`, borderRadius: '999px',
              padding: '5px 12px 5px 7px',
              boxShadow: `0 6px 20px ${G.orange}20`,
              zIndex: 9, whiteSpace: 'nowrap',
            }}
          >
            <div style={{
              width: '20px', height: '20px', borderRadius: '50%', flexShrink: 0,
              background: `${G.orange}15`, border: `1px solid ${G.orange}25`,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <Sparkles size={10} color={G.orange} />
            </div>
            <span style={{ fontSize: '10px', fontWeight: 700, color: '#0f172a' }}>Recommended</span>
            <span style={{ fontSize: '10px', color: '#64748b' }}>Admit path</span>
          </motion.div>

          {/* Left floating card */}
          <MobileCard
            side="left"
            avatarSrc={HERO_CARD_AVATARS.left}
            name={offerName}
            role="CAP · India careers"
            line={<>Targeting <strong style={{ color: G.blue }}>{offerRole}</strong></>}
            animY={[0, -6, 0]}
            delay={0}
          />

          {/* Right floating card */}
          <MobileCard
            side="right"
            avatarSrc={HERO_CARD_AVATARS.right}
            name={admitName}
            role="Study abroad track"
            line={<>Interested in <strong style={{ color: G.orange }}>{admitProgramme.split('·')[0]?.trim()}</strong></>}
            animY={[0, 6, 0]}
            delay={0.4}
          />
        </div>
      </motion.div>
    </div>
  );
}