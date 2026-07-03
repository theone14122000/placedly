'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  Sparkles, Briefcase, Globe,
  Share2, CheckCircle2, Zap,
} from 'lucide-react';
import Link from 'next/link';
import HeroGradientBg from './HeroGradientBg';
import HeroBgVideo from './HeroBgVideo';

type HeroCms = { [k: string]: string };

const G = {
  blue:   '#2563eb',
  indigo: '#7c8ff0',
  orange: '#fb923c',
  rose:   '#f43f5e',
  purple: '#a855f7',
  green:  '#16a34a',
};

const GRADIENT_STYLE: React.CSSProperties = {
  backgroundImage: `linear-gradient(270deg,${G.blue},${G.indigo},${G.orange},${G.rose},${G.purple},${G.blue})`,
  backgroundSize: '300% 300%',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  backgroundClip: 'text',
  animation: 'placedly-gradient-shift 6s ease infinite',
  display: 'inline',
};

const SCATTER_AVATARS = [
  { src: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=128&h=128&fit=crop&crop=face', top: '6%',  left: '4%',  size: 28, rotate: -12, delay: 0.10 },
  { src: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=128&h=128&fit=crop&crop=face', top: '2%',  left: '52%', size: 34, rotate: 0,   delay: 0.20, center: true },
  { src: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=128&h=128&fit=crop&crop=face', top: '62%', left: '18%', size: 24, rotate: -8,  delay: 0.15 },
  { src: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=128&h=128&fit=crop&crop=face', top: '10%', left: '84%', size: 22, rotate: 10,  delay: 0.25 },
  { src: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=128&h=128&fit=crop&crop=face', top: '68%', left: '70%', size: 26, rotate: 6,   delay: 0.30 },
] as const;

const HERO_CARD_AVATARS = {
  left:  'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=96&h=96&fit=crop&crop=face',
  right: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=96&h=96&fit=crop&crop=face',
} as const;

const TICKER_ITEMS = [
  '🎉 Ankit R. placed — ₹6.4L CTC',
  '⚡ Priya S. interview in 9 days',
  '✅ Rohit K. — 52% hike',
  '🎯 Vikram T. Sr. Analyst role',
  '🚀 47 in active hiring connect',
];

/* ════ TICKER ════ */
function MobileTicker() {
  const [idx, setIdx]   = useState(0);
  const [show, setShow] = useState(true);

  useEffect(() => {
    const t = setInterval(() => {
      setShow(false);
      setTimeout(() => { setIdx(i => (i + 1) % TICKER_ITEMS.length); setShow(true); }, 300);
    }, 3200);
    return () => clearInterval(t);
  }, []);

  return (
    <div style={{
      display: 'inline-flex', alignItems: 'center', gap: '6px',
      background: 'rgba(255,255,255,0.1)', backdropFilter: 'blur(10px)',
      border: '1px solid rgba(255,255,255,0.18)', borderRadius: '999px',
      padding: '4px 12px 4px 6px', maxWidth: '100%', overflow: 'hidden',
    }}>
      <span style={{
        display: 'inline-flex', alignItems: 'center', gap: '3px',
        fontSize: '8px', fontWeight: 800, color: '#ef4444',
        background: 'rgba(239,68,68,0.2)', padding: '2px 6px',
        borderRadius: '999px', flexShrink: 0, letterSpacing: '0.04em',
      }}>
        <span style={{
          width: '4px', height: '4px', borderRadius: '50%', background: '#ef4444',
          display: 'inline-block', animation: 'mb-ticker-dot 1.4s ease-in-out infinite',
        }} />
        LIVE
      </span>
      <span style={{
        fontSize: '11px', fontWeight: 600,
        color: show ? 'rgba(255,255,255,0.9)' : 'transparent',
        whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis',
        transition: 'color .25s ease, transform .25s ease',
        transform: show ? 'translateY(0)' : 'translateY(3px)',
        maxWidth: '180px',
      }}>
        {TICKER_ITEMS[idx]}
      </span>
    </div>
  );
}

/* ════ CTA BUTTON ════ */
function MobileCtaButton({
  href, label, variant, delay = 0,
}: {
  href: string; label: string;
  variant: 'get-placed' | 'study-abroad';
  delay?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, delay }}
      whileTap={{ scale: 0.97 }}
      style={{ flex: 1, minWidth: 0 }}
    >
      <Link
        href={href}
        className={`placedly-hero-cta placedly-hero-cta--${variant}`}
        style={{
          width: '100%', justifyContent: 'center',
          padding: '12px 16px', fontSize: '13.5px', gap: '7px',
          borderRadius: '14px',
        }}
      >
        <span className="placedly-hero-cta-shine" aria-hidden />
        <span className="placedly-hero-cta-label">{label}</span>
        <motion.span
          className="placedly-hero-cta-icon"
          animate={{ x: [0, 2, 0] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut', delay: delay + 0.3 }}
          style={{ width: '22px', height: '22px', flexShrink: 0 }}
        >
          {variant === 'get-placed'
            ? <Briefcase size={11} strokeWidth={2.5} />
            : <Globe size={11} strokeWidth={2.5} />}
        </motion.span>
      </Link>
    </motion.div>
  );
}

/* ════ COMPACT FLOATING CARD ════ */
function MobileCard({
  side, avatarSrc, name, role, line, animY, delay = 0,
}: {
  side: 'left' | 'right';
  avatarSrc: string; name: string; role: string;
  line: React.ReactNode; animY: number[]; delay?: number;
}) {
  const isLeft = side === 'left';
  return (
    <motion.div
      animate={{ y: animY }}
      transition={{ duration: isLeft ? 5.5 : 6, repeat: Infinity, ease: 'easeInOut', delay }}
      style={{
        position: 'absolute',
        /* Keep cards inside the scene — don't bleed outside */
        bottom: isLeft ? '14%' : '8%',
        left:  isLeft ? '1%'  : undefined,
        right: isLeft ? undefined : '1%',
        /* Compact fixed width — no clamp overflow */
        width: '128px',
        background: 'rgba(255,255,255,0.95)',
        backdropFilter: 'blur(20px)',
        borderRadius: '12px',
        /* Tight padding */
        padding: '8px 9px 8px 9px',
        boxShadow: isLeft
          ? `0 8px 20px rgba(37,99,235,0.18), 0 2px 6px rgba(0,0,0,0.08)`
          : `0 8px 20px rgba(251,146,60,0.18), 0 2px 6px rgba(0,0,0,0.08)`,
        border: `1px solid ${isLeft ? 'rgba(37,99,235,0.18)' : 'rgba(251,146,60,0.18)'}`,
        zIndex: 10,
      }}
    >
      {/* Accent top strip */}
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0, height: '2.5px',
        borderRadius: '12px 12px 0 0',
        background: isLeft
          ? `linear-gradient(90deg,${G.blue},${G.indigo})`
          : `linear-gradient(90deg,${G.orange},${G.rose})`,
      }} />

      {/* Avatar + name row */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '5px' }}>
        <img
          src={avatarSrc} alt="" width={24} height={24} loading="lazy" decoding="async"
          style={{
            width: '24px', height: '24px', borderRadius: '50%', objectFit: 'cover',
            border: '2px solid #fff', boxShadow: '0 1px 4px rgba(0,0,0,0.14)', flexShrink: 0,
          }}
        />
        <div style={{ minWidth: 0, flex: 1 }}>
          <p style={{
            fontSize: '10.5px', fontWeight: 800, color: '#0f172a',
            margin: 0, lineHeight: 1.2,
            /* truncate long names */
            whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis',
          }}>
            {name}
          </p>
          <p style={{
            fontSize: '8.5px', color: '#94a3b8', margin: 0, lineHeight: 1.2,
            whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis',
          }}>
            {role}
          </p>
        </div>
      </div>

      {/* Info line — single line, no wrapping */}
      <div style={{
        fontSize: '9.5px', color: '#374151', lineHeight: 1.3,
        padding: '4px 6px', borderRadius: '7px',
        background: isLeft ? `${G.blue}08` : `${G.orange}08`,
        border: `1px solid ${isLeft ? G.blue + '18' : G.orange + '18'}`,
        /* Prevent text from expanding card */
        overflow: 'hidden',
        display: '-webkit-box',
        WebkitLineClamp: 2,
        WebkitBoxOrient: 'vertical',
      }}>
        {line}
      </div>
    </motion.div>
  );
}

/* ════ ACHIEVEMENT BADGES ════ */
function AchievementBadges() {
  const badges = [
    { icon: <CheckCircle2 size={9} color={G.green} />,  text: '300+ Placed',  color: G.green  },
    { icon: <Zap size={9} color={G.orange} />,          text: '40% Hike',     color: G.orange },
    { icon: <Globe size={9} color={G.blue} />,          text: "140+ Uni's",   color: G.blue   },
    { icon: <Sparkles size={9} color={G.purple} />,     text: '₹0 Upfront',   color: G.purple },
  ];
  return (
    <div style={{
      display: 'flex', gap: '5px', flexWrap: 'wrap', justifyContent: 'center',
    }}>
      {badges.map((b, i) => (
        <motion.div
          key={b.text}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3, delay: 0.45 + i * 0.05 }}
          style={{
            display: 'inline-flex', alignItems: 'center', gap: '3px',
            fontSize: '9.5px', fontWeight: 700, color: b.color,
            background: `${b.color}14`, border: `1px solid ${b.color}28`,
            borderRadius: '999px', padding: '3px 9px',
            backdropFilter: 'blur(8px)', whiteSpace: 'nowrap',
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
export default function HeroMobileBrief({ cms = {} }: { cms?: HeroCms }) {
  const offerRole      = cms['hp:heroOfferRole']        ?? 'Sr. Claims Analyst';
  const offerName      = cms['hp:heroOfferName']        ?? 'Priya';
  const admitName      = cms['hp:heroAdmitName']        ?? 'Arjun';
  const admitProgramme = cms['hp:heroAdmitProgramme']   ?? "MSc Int'l Business · Fall '25";
  const subline        = cms['hp:heroSubline']          ?? 'Career Placement & Global Education — Delhi NCR.';
  const primaryCta     = cms['hp:heroPrimaryCtaText']   ?? 'Get Placed';
  const secondaryCta   = cms['hp:heroSecondaryCtaText'] ?? 'Study Abroad';

  /* Shorten admit programme to first segment only */
  const admitShort = admitProgramme.split('·')[0]?.trim() ?? 'UK Masters';

  return (
    <div className="placedly-hero-mobile-brief" aria-label="Mobile hero">

      {/* Backgrounds */}
      <HeroGradientBg />
      <HeroBgVideo />

      <style>{`
        @keyframes placedly-gradient-shift {
          0%   { background-position:0%   50%; }
          50%  { background-position:100% 50%; }
          100% { background-position:0%   50%; }
        }
        @keyframes mb-ticker-dot {
          0%,100% { opacity:1;  transform:scale(1);   }
          50%     { opacity:.4; transform:scale(1.3); }
        }
        @keyframes mb-pulse-ring {
          0%   { transform:scale(1);   opacity:.45; }
          70%  { transform:scale(1.55); opacity:0;  }
          100% { transform:scale(1.55); opacity:0;  }
        }

        /* ── Scene container ── */
        .mb-scene {
          position: relative;
          width: 100%;
          /* Fixed comfortable height — cards are absolutely positioned inside */
          height: 190px;
          margin: 0 auto;
          max-width: 380px;
          /* Clip cards that would bleed outside */
          overflow: hidden;
          border-radius: 16px;
        }

        /* ── Shared CTA pill styles ── */
        .placedly-hero-cta {
          position: relative;
          display: inline-flex;
          align-items: center;
          font-weight: 700;
          letter-spacing: 0.01em;
          font-family: inherit;
          text-decoration: none;
          color: #fff;
          border: 1px solid rgba(255,255,255,0.25);
          overflow: hidden;
          isolation: isolate;
          cursor: pointer;
          background-size: 200% 200%;
          background-position: 0% 50%;
          transition:
            transform .25s cubic-bezier(.22,1,.36,1),
            box-shadow .25s cubic-bezier(.22,1,.36,1),
            filter .25s ease,
            background-position .55s ease;
        }
        .placedly-hero-cta--get-placed {
          background-image: linear-gradient(135deg,#2563eb,#7c8ff0);
          box-shadow: 0 6px 18px rgba(37,99,235,.30), inset 0 1px 0 rgba(255,255,255,.22);
        }
        .placedly-hero-cta--study-abroad {
          background-image: linear-gradient(135deg,#fb923c,#f43f5e);
          box-shadow: 0 6px 18px rgba(251,146,60,.30), inset 0 1px 0 rgba(255,255,255,.22);
        }
        .placedly-hero-cta:hover  { transform:translateY(-2px); filter:brightness(1.06); background-position:100% 50%; }
        .placedly-hero-cta:active { transform:translateY(-1px) scale(.98); }
        .placedly-hero-cta-label  { position:relative; z-index:1; white-space:nowrap; }
        .placedly-hero-cta-icon   {
          position:relative; z-index:1;
          display:inline-flex; align-items:center; justify-content:center;
          border-radius:50%; background:rgba(255,255,255,.22);
          transition:background .3s ease;
        }
        .placedly-hero-cta:hover .placedly-hero-cta-icon { background:rgba(255,255,255,.34); }
        .placedly-hero-cta-shine  {
          position:absolute; top:0; left:-130%; width:55%; height:100%;
          background:linear-gradient(115deg,transparent,rgba(255,255,255,.48),transparent);
          transform:skewX(-20deg); transition:left .6s ease;
          z-index:0; pointer-events:none;
        }
        .placedly-hero-cta:hover .placedly-hero-cta-shine { left:140%; }

        /* ── center avatar ring ── */
        .mb-scatter-center {
          box-shadow: 0 0 0 3px rgba(255,255,255,0.95), 0 6px 18px rgba(37,99,235,0.32) !important;
        }
      `}</style>

      {/* ════ COPY BLOCK ════ */}
      <div
        className="placedly-lift-hero-copy"
        style={{ paddingBottom: '10px' }}
      >
        {/* Ticker */}
        <motion.div
          initial={{ opacity: 0, y: -6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.38 }}
          style={{ marginBottom: '12px' }}
        >
          <MobileTicker />
        </motion.div>

        {/* Headline */}
        <motion.h1
          className="placedly-liftoff-m-headline"
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.48, delay: 0.06 }}
          style={{ WebkitTextFillColor: 'initial', color: 'inherit', marginBottom: '8px' }}
        >
          Grow your career,<br />
          <span style={GRADIENT_STYLE}>through people you trust.</span>
        </motion.h1>

        {/* Subline */}
        <motion.p
          className="placedly-liftoff-m-sub"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.42, delay: 0.12 }}
          style={{ marginBottom: '14px' }}
        >
          {subline}
        </motion.p>

        {/* Badges */}
        <motion.div
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.38, delay: 0.18 }}
          style={{ marginBottom: '16px' }}
        >
          <AchievementBadges />
        </motion.div>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.42, delay: 0.26 }}
          style={{ display: 'flex', gap: '9px', width: '100%' }}
        >
          <MobileCtaButton href="/contact"    label={primaryCta}   variant="get-placed"   delay={0.28} />
          <MobileCtaButton href="/study-visa" label={secondaryCta} variant="study-abroad" delay={0.33} />
        </motion.div>
      </div>

      {/* ════ VISUAL STAGE ════ */}
      <motion.div
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55, delay: 0.20 }}
        style={{ position: 'relative', zIndex: 1 }}
      >
        <div className="mb-scene">

          {/* ── Scatter avatars ── */}
          {SCATTER_AVATARS.map((person, i) => {
            const isCenter = 'center' in person && person.center;
            const rotate   = person.rotate ?? 0;
            return (
              <motion.div
                key={`av-${i}`}
                initial={{ opacity: 0, scale: 0.65 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.38, delay: 0.28 + person.delay }}
                style={{
                  position: 'absolute',
                  top: person.top, left: person.left,
                  width:  `${person.size}px`,
                  height: `${person.size}px`,
                  zIndex: isCenter ? 8 : i + 2,
                  transform: isCenter ? 'translateX(-50%)' : `rotate(${rotate}deg)`,
                }}
              >
                {/* Pulse ring — center only */}
                {isCenter && (
                  <div style={{
                    position: 'absolute', inset: '-5px', borderRadius: '50%',
                    background: `${G.blue}35`,
                    animation: 'mb-pulse-ring 2s ease-out infinite',
                  }} />
                )}

                <img
                  src={person.src} alt="" width={person.size} height={person.size}
                  loading="lazy" decoding="async"
                  className={isCenter ? 'mb-scatter-center' : ''}
                  style={{
                    width: '100%', height: '100%', borderRadius: '50%', objectFit: 'cover',
                    border: isCenter ? '3px solid #fff' : '2px solid rgba(255,255,255,0.75)',
                    boxShadow: isCenter
                      ? `0 6px 20px ${G.blue}38`
                      : '0 2px 8px rgba(0,0,0,0.16)',
                    display: 'block',
                  }}
                />

                {/* Colour dot badge on alternate non-center avatars */}
                {!isCenter && i % 2 === 0 && (
                  <div style={{
                    position: 'absolute', bottom: '-1px', right: '-1px',
                    width: '8px', height: '8px', borderRadius: '50%',
                    background: [G.blue, G.orange, G.green][i % 3],
                    border: '1.5px solid #fff',
                  }} />
                )}
              </motion.div>
            );
          })}

          {/* ── Glass pill: Shared ── */}
          <motion.div
            initial={{ opacity: 0, scale: 0.75 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.38, delay: 0.50 }}
            style={{
              position: 'absolute', top: '36%', left: '50%',
              transform: 'translateX(-50%)',
              display: 'inline-flex', alignItems: 'center', gap: '5px',
              background: 'rgba(255,255,255,0.92)', backdropFilter: 'blur(12px)',
              border: `1px solid ${G.blue}22`, borderRadius: '999px',
              padding: '4px 10px 4px 5px',
              boxShadow: `0 4px 14px ${G.blue}18`,
              zIndex: 9, whiteSpace: 'nowrap',
            }}
          >
            <div style={{
              width: '18px', height: '18px', borderRadius: '50%', flexShrink: 0,
              background: `${G.blue}12`, border: `1px solid ${G.blue}22`,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <Share2 size={8} color={G.blue} />
            </div>
            <span style={{ fontSize: '9px', fontWeight: 700, color: '#0f172a' }}>Shared</span>
            <span style={{ fontSize: '9px', color: '#64748b' }}>CAP roadmap</span>
          </motion.div>

          {/* ── Glass pill: Recommended ── */}
          <motion.div
            initial={{ opacity: 0, scale: 0.75 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.38, delay: 0.60 }}
            style={{
              position: 'absolute', top: '53%', right: '3%',
              display: 'inline-flex', alignItems: 'center', gap: '5px',
              background: 'rgba(255,255,255,0.92)', backdropFilter: 'blur(12px)',
              border: `1px solid ${G.orange}22`, borderRadius: '999px',
              padding: '4px 10px 4px 5px',
              boxShadow: `0 4px 14px ${G.orange}18`,
              zIndex: 9, whiteSpace: 'nowrap',
            }}
          >
            <div style={{
              width: '18px', height: '18px', borderRadius: '50%', flexShrink: 0,
              background: `${G.orange}12`, border: `1px solid ${G.orange}22`,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <Sparkles size={8} color={G.orange} />
            </div>
            <span style={{ fontSize: '9px', fontWeight: 700, color: '#0f172a' }}>Recommended</span>
            <span style={{ fontSize: '9px', color: '#64748b' }}>Admit path</span>
          </motion.div>

          {/* ── Left card: Priya ── */}
          <MobileCard
            side="left"
            avatarSrc={HERO_CARD_AVATARS.left}
            name={offerName}
            role="CAP · India careers"
            line={<>Targeting <strong style={{ color: G.blue }}>{offerRole}</strong></>}
            animY={[0, -5, 0]}
            delay={0}
          />

          {/* ── Right card: Arjun ── */}
          <MobileCard
            side="right"
            avatarSrc={HERO_CARD_AVATARS.right}
            name={admitName}
            role="Study abroad track"
            line={<>Into <strong style={{ color: G.orange }}>{admitShort}</strong></>}
            animY={[0, 5, 0]}
            delay={0.4}
          />

        </div>
      </motion.div>
    </div>
  );
}