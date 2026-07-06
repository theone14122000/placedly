'use client';

import { useEffect, useRef, useState } from 'react';
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { FadeUp } from './motion';

type Cms = Record<string, string>;

interface VerticalContent {
  id: string;
  tabLabel: string;
  videoSrc: string;
  ariaLabel: string;
  kicker: string;
  title: string;
  description: string;
  highlights: { icon: string; text: string }[];
  cta: string;
  stats: { value: string; label: string }[];
}

const GEOM_FONT_STACK = `"Inter", "Manrope", "Geist", "Plus Jakarta Sans", -apple-system, BlinkMacSystemFont, "Segoe UI", system-ui, sans-serif`;

const ORANGE        = '#f97316';
const ORANGE_DARK   = '#ea580c';
const ORANGE_BORDER = 'rgba(249, 115, 22, 0.25)';
const ORANGE_SOFT   = 'rgba(249, 115, 22, 0.12)';
const ORANGE_TINT   = 'rgba(249, 115, 22, 0.08)';
const ORANGE_RING   = 'rgba(249, 115, 22, 0.55)';

/* ── Hiring partners ── */
const DEFAULT_COMPANIES = [
  'EXL Services', 'Quatrro', 'eBiz Solutions', 'WNS Global',
  'Optum', 'Cognizant', 'Wipro', 'Infosys BPM',
  'Mphasis', 'HCL', 'Genpact', 'Access Healthcare', 'Conifer Health',
];

/* ── Go Global countries ── */
const DEFAULT_COUNTRIES = [
  'United Kingdom', 'Germany', 'Canada', 'Australia',
  'France', 'Singapore', 'Dubai', 'Netherlands',
  'Ireland', 'New Zealand', 'Sweden', 'Italy',
];

const VERTICALS: VerticalContent[] = [
  {
    id: 'cap',
    tabLabel: 'Get Placed',
    videoSrc: '/new1.mp4',
    ariaLabel: 'Career Assistance Programme overview',
    kicker: 'Career Growth',
    title: 'Land the job you actually deserve.',
    description:
      'CAP is designed for final-year students and recent graduates—from applying to getting hired.',
    highlights: [
      { icon: '🎯', text: '1:1 mentorship from industry mentors who know where you want to go' },
      { icon: '📝', text: 'Resume review, mock interviews, and confidence building through real memory' },
      { icon: '🤝', text: 'Direct access to careers and networks at 50+ partner companies' },
    ],
    cta: 'Explore Placements',
    stats: [
      { value: '100%', label: 'Placement Rate' },
      { value: '6 LPA',  label: 'Avg CTC' },
      { value: '400+',   label: 'Hiring Partners' },
    ],
  },
  {
    id: 'study',
    tabLabel: 'Go Global',
    videoSrc: '/new2.mp4',
    ariaLabel: 'Go Global Programme overview',
    kicker: 'Global Education',
    title: 'Study at world-class universities.',
    description:
      'Unlock opportunities at prestigious universities worldwide. We guide you through every step of your international education journey.',
    highlights: [
      { icon: '🌍', text: 'Partnerships with 200+ universities globally' },
      { icon: '✈️', text: 'Complete visa and admission support' },
      { icon: '💰', text: 'Scholarship guidance and funding assistance' },
    ],
    cta: 'Explore Opportunities',
    stats: [
      { value: '200+', label: 'Partner Universities' },
      { value: '95%',  label: 'Acceptance Rate' },
      { value: '50+',  label: 'Countries' },
    ],
  },
];

/* ═══════════════════════════════════════
   VideoCard — plain, no extras
═══════════════════════════════════════ */
function VideoCard({ src, ariaLabel }: { src: string; ariaLabel: string }) {
  const videoRef     = useRef<HTMLVideoElement>(null);
  const isVisibleRef = useRef(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const canPlayWithSound = () =>
      typeof navigator !== 'undefined' &&
      navigator.userActivation?.hasBeenActive;

    const playMuted     = () => { video.muted = true;  return video.play().catch(() => undefined); };
    const playWithSound = () => { video.muted = false; return video.play().catch(() => playMuted()); };

    const unlockSound = () => {
      video.muted = false;
      if (isVisibleRef.current) void video.play().catch(() => playMuted());
    };

    document.addEventListener('pointerdown', unlockSound, { capture: true });
    document.addEventListener('keydown',     unlockSound, { capture: true });

    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisibleRef.current = entry.isIntersecting;
        if (entry.isIntersecting) {
          canPlayWithSound() ? void playWithSound() : void playMuted();
        } else {
          video.pause();
        }
      },
      { threshold: 0.35, rootMargin: '0px 0px -8% 0px' },
    );

    observer.observe(video);
    return () => {
      observer.disconnect();
      document.removeEventListener('pointerdown', unlockSound, { capture: true });
      document.removeEventListener('keydown',     unlockSound, { capture: true });
    };
  }, [src]);

  return (
    <video
      ref={videoRef}
      src={src}
      loop
      playsInline
      preload="auto"
      aria-label={ariaLabel}
      style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
    />
  );
}

/* ═══════════════════════════════════════
   Plain VideoCard — no tilt, no chips,
   no orbit ring, no toolbar, no footer
═══════════════════════════════════════ */
function PlainVideoCard({ current }: { current: VerticalContent }) {
  return (
    <motion.div
      key={current.id}
      initial={{ opacity: 0, scale: 0.97 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      style={{
        width: '100%',
        borderRadius: '24px',
        overflow: 'hidden',
        background: '#000',
        aspectRatio: '4/5',
        position: 'relative',
      }}
    >
      <VideoCard src={current.videoSrc} ariaLabel={current.ariaLabel} />
    </motion.div>
  );
}

function dotStyle(color: string): React.CSSProperties {
  return {
    width: '9px', height: '9px', borderRadius: '50%',
    background: color, display: 'inline-block',
  };
}

/* ═══════════════════════════════════════
   ScrollingStrip — shared by both sections
═══════════════════════════════════════ */
function ScrollingStrip({
  items,
  isDark = false,
}: {
  items: string[];
  isDark?: boolean;
}) {
  const list = [...items, ...items];

  return (
    <div
      style={{
        position: 'relative',
        overflow: 'hidden',
        padding: '10px 0',
      }}
    >
      {/* fade edges */}
      <div
        aria-hidden
        style={{
          position: 'absolute',
          inset: 0,
          zIndex: 2,
          pointerEvents: 'none',
          background: isDark
            ? `linear-gradient(90deg,
                rgba(6,9,18,1) 0%,
                transparent 10%,
                transparent 90%,
                rgba(6,9,18,1) 100%)`
            : `linear-gradient(90deg,
                rgba(255,255,255,1) 0%,
                transparent 10%,
                transparent 90%,
                rgba(255,255,255,1) 100%)`,
        }}
      />
      <motion.div
        animate={{ x: ['0%', '-50%'] }}
        transition={{ duration: 28, repeat: Infinity, ease: 'linear' }}
        style={{ display: 'flex', gap: '36px', width: 'max-content', paddingLeft: '20px' }}
      >
        {list.map((name, i) => (
          <span
            key={`${name}-${i}`}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              fontSize: '13.5px',
              fontWeight: 700,
              color: isDark ? 'rgba(255,255,255,0.82)' : '#1e293b',
              whiteSpace: 'nowrap',
              letterSpacing: '0.01em',
            }}
          >
            <span
              aria-hidden
              style={{
                width: '5px',
                height: '5px',
                borderRadius: '50%',
                background: ORANGE,
                flexShrink: 0,
                display: 'inline-block',
              }}
            />
            {name}
          </span>
        ))}
      </motion.div>
    </div>
  );
}

/* ═══════════════════════════════════════
   Main export
═══════════════════════════════════════ */
export default function Services({ cms = {} }: { cms?: Cms }) {
  const [active, setActive] = useState(0);
  const current = VERTICALS[active];
  const isDark  = current.id === 'study';

  const tagline  = cms['hp:servicesTagline']  ?? 'What We Do';
  const title    = cms['hp:servicesTitle']    ?? 'One Platform. Two Powerful Verticals.';
  const subtitle = cms['hp:servicesSubtitle'] ?? 'Both Designed Around Your Growth — Not Our Revenue.';

  const rawCompanies     = cms['hp:marqueeCompanies'] ?? '';
  const partnerCompanies = rawCompanies
    ? rawCompanies.split(',').map(s => s.trim()).filter(Boolean)
    : DEFAULT_COMPANIES;

  const rawCountries  = cms['hp:marqueeCountries'] ?? '';
  const goGlobalCountries = rawCountries
    ? rawCountries.split(',').map(s => s.trim()).filter(Boolean)
    : DEFAULT_COUNTRIES;

  return (
    <section id="services" className="services-section">
      {/* ── backgrounds ── */}
      <div aria-hidden className="services-bg-base" />
      <motion.div
        aria-hidden
        className="services-bg-dark"
        animate={{ opacity: isDark ? 1 : 0 }}
        transition={{ duration: 0.65, ease: [0.4, 0, 0.2, 1] }}
      />
      <motion.div
        aria-hidden
        className="services-pattern"
        animate={{
          backgroundImage: isDark
            ? 'radial-gradient(rgba(255,255,255,0.08) 1px, transparent 1px)'
            : 'radial-gradient(rgba(0,0,0,0.06) 1px, transparent 1px)',
        }}
        transition={{ duration: 0.5 }}
      />
      <motion.div
        aria-hidden className="services-blob services-blob--tl"
        animate={{
          background: `radial-gradient(circle, ${ORANGE}4d 0%, transparent 70%)`,
          x: [0, 35, 0], y: [0, 25, 0],
        }}
        transition={{
          background: { duration: 0.9, ease: [0.4, 0, 0.2, 1] },
          x: { duration: 10, repeat: Infinity, ease: 'easeInOut' },
          y: { duration: 12, repeat: Infinity, ease: 'easeInOut' },
        }}
      />
      <motion.div
        aria-hidden className="services-blob services-blob--br"
        animate={{
          background: `radial-gradient(circle, ${ORANGE_DARK}45 0%, transparent 70%)`,
          x: [0, -30, 0], y: [0, -20, 0],
        }}
        transition={{
          background: { duration: 0.9, ease: [0.4, 0, 0.2, 1] },
          x: { duration: 11, repeat: Infinity, ease: 'easeInOut' },
          y: { duration: 9,  repeat: Infinity, ease: 'easeInOut' },
        }}
      />
      <motion.div
        aria-hidden className="services-blob services-blob--c"
        animate={{ background: `radial-gradient(ellipse, ${ORANGE_TINT} 0%, transparent 70%)` }}
        transition={{ duration: 0.9, ease: [0.4, 0, 0.2, 1] }}
      />

      <div className="services-container">

        {/* ── Section header ── */}
        <FadeUp style={{ textAlign: 'center', marginBottom: 'clamp(40px, 6vw, 72px)' }}>
          <p className="services-kicker">{tagline}</p>
          <h2 className="services-title">{title}</h2>
          <p className="services-subtitle" style={{ color: isDark ? '#a3b1c6' : '#475569' }}>
            {subtitle}
          </p>
        </FadeUp>

        {/* ── Toggle tabs ── */}
        <div
          className="services-toggle-wrap"
          style={{
            marginBottom: isGetPlaced(active)
              ? 'clamp(16px, 2.5vw, 24px)'
              : 'clamp(16px, 2.5vw, 24px)',
          }}
        >
          <motion.div
            className="services-toggle"
            animate={{
              background:  isDark ? 'rgba(255,255,255,0.06)' : '#ffffff',
              boxShadow:   isDark
                ? '0 4px 30px rgba(0,0,0,0.4), inset 0 0 0 1px rgba(255,255,255,0.06)'
                : '0 4px 24px rgba(0,0,0,0.08)',
              borderColor: isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.05)',
            }}
            transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
            role="tablist"
            aria-label="Services"
          >
            {VERTICALS.map((v, i) => (
              <button
                key={v.id}
                type="button"
                role="tab"
                aria-selected={active === i}
                onClick={() => setActive(i)}
                className={`services-toggle-btn${active === i ? ' is-active' : ''} ${isDark ? 'is-dark' : ''}`}
                style={{
                  color: active === i
                    ? '#ffffff'
                    : isDark ? 'rgba(255,255,255,0.55)' : '#64748b',
                }}
              >
                {active === i && (
                  <motion.span
                    layoutId="services-pill"
                    className="services-toggle-pill"
                    style={{ background: ORANGE }}
                    transition={{ type: 'spring', stiffness: 500, damping: 35 }}
                  />
                )}
                <span className="services-toggle-label">{v.tabLabel}</span>
              </button>
            ))}
          </motion.div>
        </div>

        {/* ── Get Placed: company marquee ── */}
        <AnimatePresence initial={false}>
          {isGetPlaced(active) && (
            <motion.div
              key="partners-strip"
              initial={{ opacity: 0, height: 0, marginBottom: 0 }}
              animate={{ opacity: 1, height: 'auto', marginBottom: 'clamp(28px, 4vw, 48px)' }}
              exit={{ opacity: 0, height: 0, marginBottom: 0 }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              style={{ overflow: 'hidden' }}
            >
              <ScrollingStrip items={partnerCompanies} isDark={false} />
            </motion.div>
          )}
        </AnimatePresence>

        {/* ── Go Global: country marquee ── */}
        <AnimatePresence initial={false}>
          {!isGetPlaced(active) && (
            <motion.div
              key="countries-strip"
              initial={{ opacity: 0, height: 0, marginBottom: 0 }}
              animate={{ opacity: 1, height: 'auto', marginBottom: 'clamp(28px, 4vw, 48px)' }}
              exit={{ opacity: 0, height: 0, marginBottom: 0 }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              style={{ overflow: 'hidden' }}
            >
              <ScrollingStrip items={goGlobalCountries} isDark={true} />
            </motion.div>
          )}
        </AnimatePresence>

        {/* ── Main grid ── */}
        <AnimatePresence mode="wait">
          <motion.div
            key={current.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="services-grid"
          >
            {/* Video — rendered first in DOM for mobile (CSS reorders on desktop) */}
            <div className="services-video-shell">
              <PlainVideoCard current={current} />
            </div>

            {/* Content card */}
            <div className="services-content-card">
              <p className="services-card-kicker">{current.kicker}</p>
              <h3 className="services-card-title">{current.title}</h3>
              <p className="services-card-desc">{current.description}</p>

              <ul className="services-highlights">
                {current.highlights.map((item, idx) => (
                  <motion.li
                    key={idx}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.08, duration: 0.35 }}
                    whileHover={{ x: 4 }}
                    className="services-highlight-item"
                  >
                    <span className="services-highlight-icon">{item.icon}</span>
                    <span className="services-highlight-text">{item.text}</span>
                  </motion.li>
                ))}
              </ul>

              <div className="services-stats">
                {current.stats.map((stat, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, scale: 0.85 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.15 + idx * 0.08, duration: 0.3 }}
                    className="services-stat"
                  >
                    <p className="services-stat-value">{stat.value}</p>
                    <p className="services-stat-label">{stat.label}</p>
                  </motion.div>
                ))}
              </div>

              <motion.button
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.97 }}
                className="services-cta"
              >
                {current.cta}
                <motion.span
                  aria-hidden
                  className="services-cta-arrow"
                  animate={{ x: [0, 4, 0] }}
                  transition={{ duration: 1.4, repeat: Infinity, ease: 'easeInOut' }}
                >
                  <ArrowRight size={16} strokeWidth={2.5} />
                </motion.span>
              </motion.button>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      <style>{`
        /* ── Global font ── */
        .services-section,
        .services-section * {
          font-family: ${GEOM_FONT_STACK};
          font-feature-settings: "ss01","cv11","cv02";
          font-optical-sizing: auto;
          letter-spacing: -0.011em;
          box-sizing: border-box;
        }

        /* ── Section ── */
        .services-section {
          position: relative;
          /* mobile-first padding */
          padding: clamp(56px, 10vw, 160px) clamp(16px, 5vw, 24px);
          overflow: hidden;
        }

        /* ── Backgrounds ── */
        .services-bg-base {
          position: absolute; inset: 0;
          background: linear-gradient(135deg, #fff7ed 0%, #ffffff 45%, #ffedd5 100%);
          z-index: 0;
        }
        .services-bg-dark {
          position: absolute; inset: 0;
          background: linear-gradient(180deg, #060912 0%, #0b1226 45%, #04070f 100%);
          z-index: 0; pointer-events: none;
        }
        .services-pattern {
          position: absolute; inset: 0;
          background-size: 28px 28px;
          mask-image: radial-gradient(ellipse 60% 50% at 50% 50%, black 30%, transparent 80%);
          z-index: 0;
        }
        .services-blob {
          position: absolute; border-radius: 50%;
          filter: blur(100px); z-index: 0; pointer-events: none;
        }
        .services-blob--tl { top:-10%; left:-12%; width:560px; height:560px; }
        .services-blob--br { bottom:-18%; right:-12%; width:600px; height:600px; filter:blur(110px); }
        .services-blob--c  {
          top:35%; left:50%; width:700px; height:360px;
          transform:translateX(-50%); filter:blur(140px);
        }

        .services-container {
          position: relative; z-index: 1;
          max-width: 1320px; margin: 0 auto;
        }

        /* ── Header ── */
        .services-kicker {
          font-size: 13px; font-weight: 700;
          text-transform: uppercase; letter-spacing: 0.14em;
          margin: 0 0 16px; color: ${ORANGE};
        }
        .services-title {
          font-size: clamp(1.7rem, 4vw, 3.4rem);
          font-weight: 800; line-height: 1.1;
          letter-spacing: -0.025em; color: #0f172a;
          margin: 0 0 18px;
        }
        .services-subtitle {
          font-size: clamp(0.9rem, 1.4vw, 1.15rem);
          line-height: 1.6; max-width: 640px;
          margin: 0 auto; padding: 0 12px;
          font-weight: 400; transition: color 0.4s ease;
        }

        /* ── Toggle ── */
        .services-toggle-wrap {
          display: flex; justify-content: center;
          padding: 0 12px;
        }
        .services-toggle {
          position: relative; display: inline-flex;
          width: 100%; max-width: 440px;
          border-radius: 999px; padding: 6px;
          border: 1px solid rgba(0,0,0,0.05);
        }
        .services-toggle-btn {
          position: relative; flex: 1;
          padding: 13px 20px; border-radius: 999px;
          border: none; font-weight: 600;
          font-size: clamp(13px, 1.1vw, 15px);
          cursor: pointer; background: transparent;
          transition: color 0.3s ease; z-index: 1;
          white-space: nowrap; letter-spacing: 0.005em;
        }
        .services-toggle-pill {
          position: absolute; inset: 0;
          border-radius: 999px; z-index: -1;
          background: ${ORANGE};
          box-shadow: 0 8px 20px rgba(249,115,22,0.32);
        }
        .services-toggle-label { position: relative; z-index: 1; }

        /* ── GRID — mobile first: single column, video on top ── */
        .services-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: clamp(24px, 4vw, 40px);
        }

        /* video shell — first in DOM = top on mobile */
        .services-video-shell {
          width: 100%;
          max-width: 360px;
          margin: 0 auto;
        }

        /* ── desktop: side-by-side, content left / video right ── */
        @media (min-width: 900px) {
          .services-grid {
            grid-template-columns: 1.1fr 0.9fr;
            align-items: center;
            gap: clamp(40px, 5vw, 80px);
          }
          /* push video to second column */
          .services-video-shell { order: 2; max-width: 460px; margin: 0 auto; }
          .services-content-card { order: 1; }
        }
        @media (min-width: 1100px) {
          .services-video-shell { max-width: 520px; }
        }

        /* ── Content card ── */
        .services-content-card {
          background: rgba(255,255,255,0.95);
          backdrop-filter: blur(20px);
          border-radius: 28px;
          padding: clamp(20px, 3vw, 48px);
          border: 1.5px solid ${ORANGE_BORDER};
          box-shadow: 0 20px 60px rgba(249,115,22,0.10);
        }
        .services-card-kicker {
          font-size: 12.5px; font-weight: 700;
          text-transform: uppercase; letter-spacing: 0.12em;
          margin: 0 0 12px; color: ${ORANGE};
        }
        .services-card-title {
          font-size: clamp(1.35rem, 2.6vw, 2.3rem);
          font-weight: 800; line-height: 1.2;
          letter-spacing: -0.02em; color: #0f172a;
          margin: 0 0 16px;
        }
        .services-card-desc {
          font-size: clamp(0.9rem, 1.1vw, 1.05rem);
          line-height: 1.7; color: #475569;
          margin: 0 0 24px; max-width: 520px;
        }

        /* ── Highlights ── */
        .services-highlights {
          list-style: none; padding: 0;
          margin: 0 0 24px; display: flex;
          flex-direction: column; gap: 10px;
        }
        .services-highlight-item {
          display: flex; align-items: flex-start; gap: 12px;
          font-size: clamp(13px, 1vw, 15px);
          color: #334155; line-height: 1.5;
          border-radius: 12px; padding: 12px 14px;
          background: ${ORANGE_SOFT};
          border: 1.5px solid ${ORANGE_BORDER};
        }
        .services-highlight-icon {
          font-size: 16px; flex-shrink: 0;
          width: 32px; height: 32px; border-radius: 9px;
          background: #fff; display: flex;
          align-items: center; justify-content: center;
          box-shadow: 0 2px 8px rgba(249,115,22,0.10);
        }
        .services-highlight-text { padding-top: 4px; }

        /* ── Stats ── */
        .services-stats {
          display: grid; grid-template-columns: repeat(3,1fr);
          gap: 12px; padding: 20px 0;
          border-top: 1px solid ${ORANGE_BORDER};
          margin-bottom: 24px;
        }
        .services-stat { text-align: center; }
        .services-stat-value {
          font-size: clamp(1.1rem, 2vw, 1.7rem);
          font-weight: 800; margin: 0 0 4px;
          letter-spacing: -0.02em; color: ${ORANGE};
        }
        .services-stat-label {
          font-size: 10px; color: #64748b;
          text-transform: uppercase; letter-spacing: 0.06em;
          margin: 0; font-weight: 600;
        }

        /* ── CTA ── */
        .services-cta {
          display: inline-flex; align-items: center; gap: 8px;
          padding: 14px 28px; color: #fff; border: none;
          border-radius: 12px; font-weight: 700; font-size: 15px;
          cursor: pointer; width: 100%; justify-content: center;
          background: ${ORANGE};
          box-shadow: 0 8px 20px rgba(249,115,22,0.30);
          transition: box-shadow 0.3s ease, filter 0.25s ease;
        }
        .services-cta:hover {
          filter: brightness(1.08);
          box-shadow: 0 12px 26px rgba(249,115,22,0.42);
        }
        .services-cta-arrow {
          display: inline-flex; align-items: center; justify-content: center;
        }

        /* ── mobile toggle adjustments ── */
        @media (max-width: 480px) {
          .services-toggle-btn  { padding: 10px 12px; font-size: 13px; }
          .services-video-shell { max-width: 100%; }
        }
      `}</style>
    </section>
  );
}

function isGetPlaced(active: number): boolean {
  return VERTICALS[active]?.id === 'cap';
}