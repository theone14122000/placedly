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

/* ── Scatter avatars ── */
const SCATTER_AVATARS = [
  { src: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=80&h=80&fit=crop&crop=face', top: '8%',  left: '5%',  size: 26, rotate: -10, delay: 0.10 },
  { src: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&h=80&fit=crop&crop=face', top: '2%',  left: '44%', size: 32, rotate: 0,   delay: 0.18, center: true },
  { src: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=80&h=80&fit=crop&crop=face', top: '65%', left: '38%', size: 22, rotate: -6,  delay: 0.14 },
  { src: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=80&h=80&fit=crop&crop=face', top: '12%', left: '82%', size: 20, rotate: 8,   delay: 0.22 },
  { src: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=80&h=80&fit=crop&crop=face', top: '70%', left: '68%', size: 24, rotate: 5,   delay: 0.28 },
] as const;

const HERO_CARD_AVATARS = {
  left:  'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=64&h=64&fit=crop&crop=face',
  right: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=64&h=64&fit=crop&crop=face',
} as const;

const TICKER_ITEMS = [
  '🎉 Ankit R. placed — ₹6.4L CTC',
  '⚡ Priya S. call in 9 days',
  '✅ Rohit K. — 52% hike',
  '🎯 Vikram — Sr. Analyst',
  '🚀 47 in active connect',
];

/* ════ TICKER ════ */
function MobileTicker() {
  const [idx, setIdx]   = useState(0);
  const [show, setShow] = useState(true);

  useEffect(() => {
    const t = setInterval(() => {
      setShow(false);
      setTimeout(() => {
        setIdx(i => (i + 1) % TICKER_ITEMS.length);
        setShow(true);
      }, 280);
    }, 3000);
    return () => clearInterval(t);
  }, []);

  return (
    <div style={{
      display: 'inline-flex',
      alignItems: 'center',
      gap: '6px',
      background: 'rgba(255,255,255,0.10)',
      backdropFilter: 'blur(10px)',
      border: '1px solid rgba(255,255,255,0.16)',
      borderRadius: '999px',
      padding: '4px 11px 4px 5px',
      maxWidth: '100%',
      overflow: 'hidden',
    }}>
      {/* LIVE badge */}
      <span style={{
        display: 'inline-flex', alignItems: 'center', gap: '3px',
        fontSize: '7.5px', fontWeight: 800, color: '#ef4444',
        background: 'rgba(239,68,68,0.18)',
        padding: '2px 5px', borderRadius: '999px',
        flexShrink: 0, letterSpacing: '0.05em',
      }}>
        <span style={{
          width: '4px', height: '4px', borderRadius: '50%',
          background: '#ef4444', display: 'inline-block',
          animation: 'mb-ticker-dot 1.4s ease-in-out infinite',
        }} />
        LIVE
      </span>

      {/* Text */}
      <span style={{
        fontSize: '10.5px', fontWeight: 600,
        color: show ? 'rgba(255,255,255,0.88)' : 'transparent',
        whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis',
        transition: 'color .22s ease, transform .22s ease',
        transform: show ? 'translateY(0)' : 'translateY(3px)',
        maxWidth: '170px',
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
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.42, delay }}
      whileTap={{ scale: 0.97 }}
      style={{ flex: 1, minWidth: 0 }}
    >
      <Link
        href={href}
        className={`placedly-hero-cta placedly-hero-cta--${variant}`}
        style={{
          width: '100%',
          justifyContent: 'center',
          padding: '11px 14px',
          fontSize: '13px',
          gap: '7px',
          borderRadius: '12px',
        }}
      >
        <span className="placedly-hero-cta-shine" aria-hidden />
        <span className="placedly-hero-cta-label">{label}</span>
        <motion.span
          className="placedly-hero-cta-icon"
          animate={{ x: [0, 2, 0] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut', delay: delay + 0.3 }}
          style={{ width: '20px', height: '20px', flexShrink: 0 }}
        >
          {variant === 'get-placed'
            ? <Briefcase size={10} strokeWidth={2.5} />
            : <Globe size={10} strokeWidth={2.5} />}
        </motion.span>
      </Link>
    </motion.div>
  );
}

/* ════ MICRO FLOATING CARD ════ */
function MicroCard({
  side, avatarSrc, name, topLine, bottomLine, animY, delay = 0,
}: {
  side: 'left' | 'right';
  avatarSrc: string;
  name: string;
  topLine: string;
  bottomLine: string;
  animY: number[];
  delay?: number;
}) {
  const isLeft = side === 'left';

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.82, y: 6 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.38 + delay }}
    >
      <motion.div
        animate={{ y: animY }}
        transition={{
          duration: isLeft ? 5.5 : 6,
          repeat: Infinity,
          ease: 'easeInOut',
          delay,
        }}
        style={{
          position: 'absolute',
          bottom: isLeft ? '16%' : '10%',
          left:  isLeft ? '2%'  : undefined,
          right: isLeft ? undefined : '2%',
          /* ── KEY FIX: narrow fixed width ── */
          width: '108px',
          background: 'rgba(255,255,255,0.96)',
          backdropFilter: 'blur(18px)',
          borderRadius: '11px',
          padding: '7px 8px',
          boxShadow: isLeft
            ? `0 6px 18px rgba(37,99,235,0.16), 0 2px 5px rgba(0,0,0,0.07)`
            : `0 6px 18px rgba(251,146,60,0.16),  0 2px 5px rgba(0,0,0,0.07)`,
          border: `1px solid ${isLeft ? 'rgba(37,99,235,0.16)' : 'rgba(251,146,60,0.16)'}`,
          zIndex: 10,
        }}
      >
        {/* Accent strip */}
        <div style={{
          position: 'absolute', top: 0, left: 0, right: 0, height: '2px',
          borderRadius: '11px 11px 0 0',
          background: isLeft
            ? `linear-gradient(90deg,${G.blue},${G.indigo})`
            : `linear-gradient(90deg,${G.orange},${G.rose})`,
        }} />

        {/* Avatar + name */}
        <div style={{
          display: 'flex', alignItems: 'center',
          gap: '5px', marginBottom: '5px',
        }}>
          <img
            src={avatarSrc} alt="" width={20} height={20}
            loading="lazy" decoding="async"
            style={{
              width: '20px', height: '20px', borderRadius: '50%',
              objectFit: 'cover', border: '1.5px solid #fff',
              boxShadow: '0 1px 3px rgba(0,0,0,0.12)', flexShrink: 0,
            }}
          />
          <p style={{
            fontSize: '9.5px', fontWeight: 800, color: '#0f172a',
            margin: 0, lineHeight: 1.1,
            whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis',
          }}>
            {name}
          </p>
        </div>

        {/* Info box */}
        <div style={{
          background: isLeft ? `${G.blue}08` : `${G.orange}08`,
          border: `1px solid ${isLeft ? G.blue + '15' : G.orange + '15'}`,
          borderRadius: '7px', padding: '4px 6px',
        }}>
          <p style={{
            fontSize: '8px', color: '#64748b',
            margin: '0 0 1px', lineHeight: 1.2,
            whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis',
          }}>
            {topLine}
          </p>
          <p style={{
            fontSize: '9px', fontWeight: 700,
            color: isLeft ? G.blue : G.orange,
            margin: 0, lineHeight: 1.2,
            whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis',
          }}>
            {bottomLine}
          </p>
        </div>
      </motion.div>
    </motion.div>
  );
}

/* ════ ACHIEVEMENT BADGES ════ */
function AchievementBadges() {
  const badges = [
    { icon: <CheckCircle2 size={8} color={G.green} />,  text: '300+ Placed', color: G.green  },
    { icon: <Zap size={8} color={G.orange} />,          text: '40% Hike',    color: G.orange },
    { icon: <Globe size={8} color={G.blue} />,          text: "140+ Uni's",  color: G.blue   },
    { icon: <Sparkles size={8} color={G.purple} />,     text: '₹0 Upfront',  color: G.purple },
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
          transition={{ duration: 0.28, delay: 0.42 + i * 0.05 }}
          style={{
            display: 'inline-flex', alignItems: 'center', gap: '3px',
            fontSize: '9px', fontWeight: 700, color: b.color,
            background: `${b.color}12`,
            border: `1px solid ${b.color}25`,
            borderRadius: '999px', padding: '3px 8px',
            whiteSpace: 'nowrap',
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
  const admitProgramme = cms['hp:heroAdmitProgramme']   ?? "MSc Int'l Business";
  const subline        = cms['hp:heroSubline']          ?? 'Career Placement & Global Education — Delhi NCR.';
  const primaryCta     = cms['hp:heroPrimaryCtaText']   ?? 'Get Placed';
  const secondaryCta   = cms['hp:heroSecondaryCtaText'] ?? 'Study Abroad';

  /* Truncate at · so card stays one line */
  const admitShort = admitProgramme.split('·')[0]?.trim().slice(0, 18) ?? 'UK Masters';
  const roleShort  = offerRole.slice(0, 16);

  return (
    <div className="placedly-hero-mobile-brief" aria-label="Mobile hero">

      <HeroGradientBg />
      <HeroBgVideo />

      {/* ════ STYLES ════ */}
      <style>{`
        @keyframes placedly-gradient-shift {
          0%   { background-position: 0%   50%; }
          50%  { background-position: 100% 50%; }
          100% { background-position: 0%   50%; }
        }
        @keyframes mb-ticker-dot {
          0%,100% { opacity:1;  transform:scale(1);   }
          50%     { opacity:.4; transform:scale(1.3); }
        }
        @keyframes mb-pulse-ring {
          0%   { transform:scale(1);    opacity:.4; }
          70%  { transform:scale(1.55); opacity:0;  }
          100% { transform:scale(1.55); opacity:0;  }
        }

        /* Scene — fixed height, clips anything that overflows */
        .mb-scene {
          position: relative;
          width: 100%;
          height: 186px;
          max-width: 400px;
          margin: 0 auto;
          overflow: hidden;
          border-radius: 14px;
        }

        /* Shared CTA pill */
        .placedly-hero-cta {
          position: relative;
          display: inline-flex;
          align-items: center;
          font-weight: 700;
          letter-spacing: 0.01em;
          font-family: inherit;
          text-decoration: none;
          color: #fff;
          border: 1px solid rgba(255,255,255,0.22);
          overflow: hidden;
          isolation: isolate;
          cursor: pointer;
          background-size: 200% 200%;
          background-position: 0% 50%;
          transition:
            transform .24s cubic-bezier(.22,1,.36,1),
            box-shadow .24s cubic-bezier(.22,1,.36,1),
            filter .24s ease,
            background-position .5s ease;
        }
        .placedly-hero-cta--get-placed {
          background-image: linear-gradient(135deg,#2563eb,#7c8ff0);
          box-shadow: 0 6px 16px rgba(37,99,235,.28), inset 0 1px 0 rgba(255,255,255,.2);
        }
        .placedly-hero-cta--study-abroad {
          background-image: linear-gradient(135deg,#fb923c,#f43f5e);
          box-shadow: 0 6px 16px rgba(251,146,60,.28), inset 0 1px 0 rgba(255,255,255,.2);
        }
        .placedly-hero-cta:hover  { transform:translateY(-2px); filter:brightness(1.06); background-position:100% 50%; }
        .placedly-hero-cta:active { transform:scale(.98); }
        .placedly-hero-cta-label  { position:relative; z-index:1; white-space:nowrap; }
        .placedly-hero-cta-icon   {
          position:relative; z-index:1;
          display:inline-flex; align-items:center; justify-content:center;
          border-radius:50%; background:rgba(255,255,255,.2);
          transition:background .25s ease;
        }
        .placedly-hero-cta:hover .placedly-hero-cta-icon { background:rgba(255,255,255,.32); }
        .placedly-hero-cta-shine  {
          position:absolute; top:0; left:-130%; width:55%; height:100%;
          background:linear-gradient(115deg,transparent,rgba(255,255,255,.45),transparent);
          transform:skewX(-20deg); transition:left .55s ease;
          z-index:0; pointer-events:none;
        }
        .placedly-hero-cta:hover .placedly-hero-cta-shine { left:140%; }

        /* Center avatar ring */
        .mb-av-center {
          box-shadow:
            0 0 0 2.5px rgba(255,255,255,0.95),
            0 5px 16px rgba(37,99,235,0.30) !important;
        }
      `}</style>

      {/* ════ COPY ════ */}
      <div className="placedly-lift-hero-copy" style={{ paddingBottom: '10px' }}>

        {/* Ticker */}
        <motion.div
          initial={{ opacity: 0, y: -6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35 }}
          style={{ marginBottom: '11px' }}
        >
          <MobileTicker />
        </motion.div>

        {/* Headline */}
        <motion.h1
          className="placedly-liftoff-m-headline"
          initial={{ opacity: 0, y: 13 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.06 }}
          style={{
            WebkitTextFillColor: 'initial',
            color: 'inherit',
            marginBottom: '8px',
          }}
        >
          Grow your career,<br />
          <span style={GRADIENT_STYLE}>through people you trust.</span>
        </motion.h1>

        {/* Subline */}
        <motion.p
          className="placedly-liftoff-m-sub"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.40, delay: 0.12 }}
          style={{ marginBottom: '13px' }}
        >
          {subline}
        </motion.p>

        {/* Badges */}
        <motion.div
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.36, delay: 0.18 }}
          style={{ marginBottom: '15px' }}
        >
          <AchievementBadges />
        </motion.div>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.40, delay: 0.25 }}
          style={{ display: 'flex', gap: '8px', width: '100%' }}
        >
          <MobileCtaButton
            href="/contact"
            label={primaryCta}
            variant="get-placed"
            delay={0.27}
          />
          <MobileCtaButton
            href="/study-visa"
            label={secondaryCta}
            variant="study-abroad"
            delay={0.32}
          />
        </motion.div>
      </div>

      {/* ════ VISUAL STAGE ════ */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.50, delay: 0.20 }}
        style={{ position: 'relative', zIndex: 1 }}
      >
        <div className="mb-scene">

          {/* Scatter avatars */}
          {SCATTER_AVATARS.map((person, i) => {
            const isCenter = 'center' in person && person.center;
            const rotate   = person.rotate ?? 0;
            return (
              <motion.div
                key={`av-${i}`}
                initial={{ opacity: 0, scale: 0.6 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.35, delay: 0.26 + person.delay }}
                style={{
                  position: 'absolute',
                  top: person.top,
                  left: person.left,
                  width:  `${person.size}px`,
                  height: `${person.size}px`,
                  zIndex: isCenter ? 8 : i + 2,
                  transform: isCenter
                    ? 'translateX(-50%)'
                    : `rotate(${rotate}deg)`,
                }}
              >
                {/* Pulse ring — center only */}
                {isCenter && (
                  <div style={{
                    position: 'absolute', inset: '-4px', borderRadius: '50%',
                    background: `${G.blue}30`,
                    animation: 'mb-pulse-ring 2s ease-out infinite',
                  }} />
                )}

                <img
                  src={person.src} alt=""
                  width={person.size} height={person.size}
                  loading="lazy" decoding="async"
                  className={isCenter ? 'mb-av-center' : ''}
                  style={{
                    width: '100%', height: '100%',
                    borderRadius: '50%', objectFit: 'cover',
                    border: isCenter
                      ? '2.5px solid #fff'
                      : '1.5px solid rgba(255,255,255,0.7)',
                    boxShadow: isCenter
                      ? `0 5px 16px ${G.blue}35`
                      : '0 2px 6px rgba(0,0,0,0.15)',
                    display: 'block',
                  }}
                />

                {/* Colour dot — alternate non-center */}
                {!isCenter && i % 2 === 0 && (
                  <div style={{
                    position: 'absolute', bottom: '-1px', right: '-1px',
                    width: '7px', height: '7px', borderRadius: '50%',
                    background: [G.blue, G.orange, G.green][i % 3],
                    border: '1.5px solid #fff',
                  }} />
                )}
              </motion.div>
            );
          })}

          {/* Glass pill — Shared */}
          <motion.div
            initial={{ opacity: 0, scale: 0.72 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.35, delay: 0.48 }}
            style={{
              position: 'absolute', top: '35%', left: '50%',
              transform: 'translateX(-50%)',
              display: 'inline-flex', alignItems: 'center', gap: '4px',
              background: 'rgba(255,255,255,0.94)',
              backdropFilter: 'blur(12px)',
              border: `1px solid ${G.blue}20`,
              borderRadius: '999px',
              padding: '3px 9px 3px 4px',
              boxShadow: `0 3px 12px ${G.blue}15`,
              zIndex: 9, whiteSpace: 'nowrap',
            }}
          >
            <div style={{
              width: '16px', height: '16px', borderRadius: '50%',
              background: `${G.blue}10`, border: `1px solid ${G.blue}20`,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              flexShrink: 0,
            }}>
              <Share2 size={7} color={G.blue} />
            </div>
            <span style={{ fontSize: '8.5px', fontWeight: 700, color: '#0f172a' }}>Shared</span>
            <span style={{ fontSize: '8.5px', color: '#64748b' }}>CAP roadmap</span>
          </motion.div>

          {/* Glass pill — Recommended */}
          <motion.div
            initial={{ opacity: 0, scale: 0.72 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.35, delay: 0.56 }}
            style={{
              position: 'absolute', top: '52%', right: '4%',
              display: 'inline-flex', alignItems: 'center', gap: '4px',
              background: 'rgba(255,255,255,0.94)',
              backdropFilter: 'blur(12px)',
              border: `1px solid ${G.orange}20`,
              borderRadius: '999px',
              padding: '3px 9px 3px 4px',
              boxShadow: `0 3px 12px ${G.orange}15`,
              zIndex: 9, whiteSpace: 'nowrap',
            }}
          >
            <div style={{
              width: '16px', height: '16px', borderRadius: '50%',
              background: `${G.orange}10`, border: `1px solid ${G.orange}20`,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              flexShrink: 0,
            }}>
              <Sparkles size={7} color={G.orange} />
            </div>
            <span style={{ fontSize: '8.5px', fontWeight: 700, color: '#0f172a' }}>Recommended</span>
            <span style={{ fontSize: '8.5px', color: '#64748b' }}>Admit</span>
          </motion.div>

          {/* Left card — Priya */}
          <MicroCard
            side="left"
            avatarSrc={HERO_CARD_AVATARS.left}
            name={offerName}
            topLine="Targeting"
            bottomLine={roleShort}
            animY={[0, -5, 0]}
            delay={0}
          />

          {/* Right card — Arjun */}
          <MicroCard
            side="right"
            avatarSrc={HERO_CARD_AVATARS.right}
            name={admitName}
            topLine="Interested in"
            bottomLine={admitShort}
            animY={[0, 5, 0]}
            delay={0.4}
          />

        </div>
      </motion.div>
    </div>
  );
}