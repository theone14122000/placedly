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
  accent: { from: string; to: string; soft: string };
}

/* Modern geometric sans-serif stack */
const GEOM_FONT_STACK = `"Inter", "Manrope", "Geist", "Plus Jakarta Sans", -apple-system, BlinkMacSystemFont, "Segoe UI", system-ui, sans-serif`;

/* Default hiring partners */
const DEFAULT_COMPANIES = [
  'EXL Services',
  'Quatrro',
  'eBiz Solutions',
  'WNS Global',
  'Optum',
  'Cognizant',
  'Wipro',
  'Infosys BPM',
  'Mphasis',
  'HCL',
  'Genpact',
  'Access Healthcare',
  'Conifer Health',
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
      {
        icon: '🎯',
        text: '1:1 mentorship from industry mentors who know where you want to go',
      },
      {
        icon: '📝',
        text: 'Resume review, mock interviews, and confidence building through real memory',
      },
      {
        icon: '🤝',
        text: 'Direct access to careers and networks at 50+ partner companies',
      },
    ],
    cta: 'Explore Placements',
    stats: [
      { value: '100%', label: 'Placement Rate' },
      { value: '6 LPA', label: 'Avg CTC' },
      { value: '400+', label: 'Hiring Partners' },
    ],
    accent: { from: '#6366f1', to: '#8b5cf6', soft: 'rgba(99, 102, 241, 0.12)' },
  },
  {
    id: 'study',
    tabLabel: 'Study Abroad',
    videoSrc: '/new2.mp4',
    ariaLabel: 'Study Abroad Programme overview',
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
    accent: { from: '#3b82f6', to: '#06b6d4', soft: 'rgba(59, 130, 246, 0.12)' },
  },
];

/* ─── VideoCard ─── */
function VideoCard({ src, ariaLabel }: { src: string; ariaLabel: string }) {
  const videoRef     = useRef<HTMLVideoElement>(null);
  const isVisibleRef = useRef(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const canPlayWithSound = () =>
      typeof navigator !== 'undefined' &&
      navigator.userActivation?.hasBeenActive;

    const playMuted = () => {
      video.muted = true;
      return video.play().catch(() => undefined);
    };

    const playWithSound = () => {
      video.muted = false;
      return video.play().catch(() => playMuted());
    };

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

/* ─── TiltVideoCard ─── */
function TiltVideoCard({ current }: { current: VerticalContent }) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const rotateX = useSpring(useTransform(y, [-80, 80], [8, -8]),  { stiffness: 200, damping: 20 });
  const rotateY = useSpring(useTransform(x, [-80, 80], [-8, 8]), { stiffness: 200, damping: 20 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = wrapRef.current?.getBoundingClientRect();
    if (!rect) return;
    x.set(e.clientX - rect.left - rect.width  / 2);
    y.set(e.clientY - rect.top  - rect.height / 2);
  };

  const handleMouseLeave = () => { x.set(0); y.set(0); };

  return (
    <motion.div
      ref={wrapRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      initial={{ opacity: 0, scale: 0.94, rotate: -2 }}
      animate={{ opacity: 1, scale: 1,    rotate:  0 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="services-video-wrap"
      style={{ position: 'relative', width: '100%', perspective: '1400px' }}
    >
      {/* Rotating dashed accent ring */}
      <motion.div
        aria-hidden
        className="services-orbit-ring"
        animate={{ rotate: 360 }}
        transition={{ duration: 40, repeat: Infinity, ease: 'linear' }}
        style={{
          position: 'absolute',
          inset: '-26px',
          borderRadius: '32px',
          border: `1.5px dashed ${current.accent.from}55`,
          zIndex: 0,
          pointerEvents: 'none',
        }}
      />

      {/* Soft glow behind card */}
      <div
        aria-hidden
        style={{
          position: 'absolute',
          inset: '-40px',
          background: `${current.accent.soft}`,
          filter: 'blur(80px)',
          borderRadius: '36px',
          zIndex: 0,
          opacity: 0.7,
        }}
      />

      {/* Frame */}
      <motion.div
        style={{
          position: 'relative',
          zIndex: 1,
          borderRadius: '30px',
          padding: '3px',
          background: '#0f172a',
          boxShadow: '0 40px 90px rgba(0,0,0,0.3)',
          rotateX,
          rotateY,
          transformStyle: 'preserve-3d',
        }}
      >
        <div
          style={{ position: 'relative', borderRadius: '27px', overflow: 'hidden', background: '#0a0a0a' }}
          className="services-video-inner"
        >
          {/* Toolbar strip */}
          <div
            className="services-video-toolbar"
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '12px 16px',
              background: 'rgba(255,255,255,0.05)',
              borderBottom: '1px solid rgba(255,255,255,0.08)',
            }}
          >
            <div style={{ display: 'flex', gap: '6px' }}>
              <span style={dotStyle('#ff5f57')} />
              <span style={dotStyle('#febc2e')} />
              <span style={dotStyle('#28c840')} />
            </div>
            <span style={{
              fontSize: '10.5px', fontWeight: 700,
              letterSpacing: '0.14em', textTransform: 'uppercase',
              color: 'rgba(255,255,255,0.55)',
            }}>
              {current.kicker}
            </span>
          </div>

          <div className="services-video-stage">
            <VideoCard src={current.videoSrc} ariaLabel={current.ariaLabel} />

            <div
              aria-hidden
              style={{
                position: 'absolute', inset: 0, pointerEvents: 'none',
                background:
                  'linear-gradient(180deg, rgba(0,0,0,0.18) 0%, transparent 22%, transparent 68%, rgba(0,0,0,0.4) 100%)',
              }}
            />

            <div style={{
              position: 'absolute', bottom: '16px', left: '16px',
              display: 'flex', alignItems: 'center', gap: '6px',
              background: 'rgba(0,0,0,0.55)', backdropFilter: 'blur(10px)',
              padding: '7px 14px', borderRadius: '20px',
              color: '#fff', fontSize: '12px', fontWeight: 600,
            }}>
              <motion.span
                animate={{ opacity: [1, 0.3, 1] }}
                transition={{ duration: 1.6, repeat: Infinity }}
                style={{
                  width: '7px', height: '7px', borderRadius: '50%',
                  background: '#22c55e', display: 'inline-block',
                }}
              />
              Real Story
            </div>
          </div>
        </div>
      </motion.div>

      {/* Floating chip — top right (stat 1) */}
      <motion.div
        animate={{ y: [0, -8, 0] }}
        transition={{ duration: 3.2, repeat: Infinity, ease: 'easeInOut' }}
        className="services-floating-chip services-floating-chip--top"
        style={{
          position: 'absolute', top: '-20px', right: '-22px', zIndex: 2,
          background: '#fff', borderRadius: '18px', padding: '14px 20px',
          boxShadow: '0 18px 40px rgba(0,0,0,0.18)',
          textAlign: 'center', minWidth: '100px',
        }}
      >
        <p style={{
          fontSize: '1.35rem', fontWeight: 800,
          color: current.accent.from,
          lineHeight: 1,
        }}>
          {current.stats[0].value}
        </p>
        <p style={{ fontSize: '10.5px', color: '#888', marginTop: '4px', fontWeight: 600 }}>
          {current.stats[0].label}
        </p>
      </motion.div>

      {/* Floating chip — bottom left (stat 2) */}
      <motion.div
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 3.6, repeat: Infinity, ease: 'easeInOut' }}
        className="services-floating-chip services-floating-chip--bottom"
        style={{
          position: 'absolute', bottom: '38px', left: '-36px', zIndex: 2,
          background: '#fff', borderRadius: '18px', padding: '12px 18px',
          boxShadow: '0 18px 40px rgba(0,0,0,0.18)',
          display: 'flex', alignItems: 'center', gap: '12px',
        }}
      >
        <span style={{
          width: '34px', height: '34px', borderRadius: '10px',
          background: current.accent.soft,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: '16px', flexShrink: 0,
        }}>
          {current.highlights[0].icon}
        </span>
        <div style={{ textAlign: 'left' }}>
          <p style={{ fontSize: '0.9rem', fontWeight: 800, color: '#0f172a', lineHeight: 1 }}>
            {current.stats[1].value}
          </p>
          <p style={{ fontSize: '10.5px', color: '#888', marginTop: '3px' }}>
            {current.stats[1].label}
          </p>
        </div>
      </motion.div>

      {/* Bottom info strip */}
      <div className="services-video-footer">
        {current.stats.map((s, i) => (
          <div key={i} className="services-video-footer-item">
            <span style={{
              color: current.accent.from,
              fontWeight: 800, fontSize: '15px',
            }}>
              {s.value}
            </span>
            <span style={{ fontSize: '10.5px', color: '#94a3b8', fontWeight: 600 }}>
              {s.label}
            </span>
          </div>
        ))}
      </div>
    </motion.div>
  );
}

function dotStyle(color: string): React.CSSProperties {
  return { width: '9px', height: '9px', borderRadius: '50%', background: color, display: 'inline-block' };
}

/* ─── PartnersStrip ─── */
function PartnersStrip({ companies }: { companies: string[] }) {
  const list = [...companies, ...companies];

  return (
    <div className="services-partners-strip">
      <div aria-hidden className="services-partners-strip-fade" />
      <motion.div
        className="services-partners-strip-track"
        animate={{ x: ['0%', '-50%'] }}
        transition={{ duration: 24, repeat: Infinity, ease: 'linear' }}
      >
        {list.map((name, i) => (
          <span key={`${name}-${i}`} className="services-partners-strip-item">
            <span aria-hidden className="services-partners-strip-dot" />
            {name}
          </span>
        ))}
      </motion.div>
    </div>
  );
}

/* ════════════════════════════════════════
   Main export
════════════════════════════════════════ */
export default function Services({ cms = {} }: { cms?: Cms }) {
  const [active, setActive] = useState(0);
  const current     = VERTICALS[active];
  const isDark      = current.id === 'study';
  const isGetPlaced = current.id === 'cap';

  const tagline  = cms['hp:servicesTagline'] ?? 'What We Do';
  const title    = cms['hp:servicesTitle']   ?? 'One Platform. Two Powerful Verticals.';
  const subtitle = cms['hp:servicesSubtitle'] ?? 'Both Designed Around Your Growth — Not Our Revenue.';

  const rawList          = cms['hp:marqueeCompanies'] ?? '';
  const partnerCompanies = rawList
    ? rawList.split(',').map((s) => s.trim()).filter(Boolean)
    : DEFAULT_COMPANIES;

  return (
    <section id="services" className="services-section">
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
        aria-hidden
        className="services-blob services-blob--tl"
        animate={{
          background: `radial-gradient(circle, ${current.accent.from}${isDark ? '4d' : '38'} 0%, transparent 70%)`,
          x: [0, 35, 0], y: [0, 25, 0],
        }}
        transition={{
          background: { duration: 0.9, ease: [0.4, 0, 0.2, 1] },
          x: { duration: 10, repeat: Infinity, ease: 'easeInOut' },
          y: { duration: 12, repeat: Infinity, ease: 'easeInOut' },
        }}
      />
      <motion.div
        aria-hidden
        className="services-blob services-blob--br"
        animate={{
          background: `radial-gradient(circle, ${current.accent.to}${isDark ? '45' : '32'} 0%, transparent 70%)`,
          x: [0, -30, 0], y: [0, -20, 0],
        }}
        transition={{
          background: { duration: 0.9, ease: [0.4, 0, 0.2, 1] },
          x: { duration: 11, repeat: Infinity, ease: 'easeInOut' },
          y: { duration: 9,  repeat: Infinity, ease: 'easeInOut' },
        }}
      />
      <motion.div
        aria-hidden
        className="services-blob services-blob--c"
        animate={{
          background: `radial-gradient(ellipse, ${current.accent.from}${isDark ? '22' : '14'} 0%, transparent 70%)`,
        }}
        transition={{ duration: 0.9, ease: [0.4, 0, 0.2, 1] }}
      />

      <div className="services-container">
        <FadeUp style={{ textAlign: 'center', marginBottom: 'clamp(40px, 6vw, 72px)' }}>
          <p
            className="services-kicker"
            style={{ color: current.accent.from }}
          >
            {tagline}
          </p>
          <h2 className="services-title">{title}</h2>
          <p
            className="services-subtitle"
            style={{ color: isDark ? '#a3b1c6' : '#475569' }}
          >
            {subtitle}
          </p>
        </FadeUp>

        {/* Toggle tabs */}
        <div
          className="services-toggle-wrap"
          style={{
            marginBottom: isGetPlaced ? 'clamp(20px, 3vw, 28px)' : 'clamp(48px, 6vw, 76px)',
          }}
        >
          <motion.div
            className="services-toggle"
            animate={{
              background:   isDark ? 'rgba(255,255,255,0.06)' : '#ffffff',
              boxShadow:    isDark
                ? '0 4px 30px rgba(0,0,0,0.4), inset 0 0 0 1px rgba(255,255,255,0.06)'
                : '0 4px 24px rgba(0,0,0,0.08)',
              borderColor:  isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.05)',
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
                  color: active === i ? '#ffffff' : isDark ? 'rgba(255,255,255,0.55)' : '#64748b',
                }}
              >
                {active === i && (
                  <motion.span
                    layoutId="services-pill"
                    className="services-toggle-pill"
                    style={{ background: current.accent.from }}
                    transition={{ type: 'spring', stiffness: 500, damping: 35 }}
                  />
                )}
                <span className="services-toggle-label">{v.tabLabel}</span>
              </button>
            ))}
          </motion.div>
        </div>

        {/* Hiring-partners strip */}
        <AnimatePresence initial={false}>
          {isGetPlaced && (
            <motion.div
              key="services-partners-strip"
              initial={{ opacity: 0, height: 0, marginBottom: 0 }}
              animate={{ opacity: 1, height: 'auto', marginBottom: 'clamp(32px, 5vw, 56px)' }}
              exit={{ opacity: 0, height: 0, marginBottom: 0 }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              style={{ overflow: 'hidden' }}
            >
              <div className="services-partners-row">
                <span className="services-partners-label">Hiring Network</span>
                <div className="services-partners-track-wrap">
                  <PartnersStrip companies={partnerCompanies} />
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence mode="wait">
          <motion.div
            key={current.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="services-grid"
          >
            <div className="services-content-card">
              <p
                className="services-card-kicker"
                style={{ color: current.accent.from }}
              >
                {current.kicker}
              </p>

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
                    style={{ background: current.accent.soft }}
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
                    <p
                      className="services-stat-value"
                      style={{ color: current.accent.from }}
                    >
                      {stat.value}
                    </p>
                    <p className="services-stat-label">{stat.label}</p>
                  </motion.div>
                ))}
              </div>

              <motion.button
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.97 }}
                className="services-cta"
                style={{ background: current.accent.from }}
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

            <div className="services-video-shell">
              <TiltVideoCard current={current} />
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      <style>{`
        /* ============================================================
           FONT — Modern Geometric Sans-Serif
           ============================================================ */
        .services-section,
        .services-section * {
          font-family: ${GEOM_FONT_STACK};
          font-feature-settings: "ss01", "cv11", "cv02";
          font-optical-sizing: auto;
          letter-spacing: -0.011em;
        }

        /* ============================================================
           SECTION + BACKGROUNDS
           ============================================================ */
        .services-section {
          position: relative;
          padding: clamp(72px, 10vw, 160px) clamp(16px, 5vw, 24px);
          overflow: hidden;
        }

        .services-bg-base {
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, #dbeafe 0%, #ffffff 45%, #ffedd5 100%);
          z-index: 0;
        }

        .services-bg-dark {
          position: absolute;
          inset: 0;
          background: linear-gradient(180deg, #060912 0%, #0b1226 45%, #04070f 100%);
          z-index: 0;
          pointer-events: none;
        }

        .services-pattern {
          position: absolute;
          inset: 0;
          background-size: 28px 28px;
          mask-image: radial-gradient(ellipse 60% 50% at 50% 50%, black 30%, transparent 80%);
          z-index: 0;
        }

        .services-blob {
          position: absolute;
          border-radius: 50%;
          filter: blur(100px);
          z-index: 0;
          pointer-events: none;
        }
        .services-blob--tl {
          top: -10%; left: -12%;
          width: 560px; height: 560px;
        }
        .services-blob--br {
          bottom: -18%; right: -12%;
          width: 600px; height: 600px;
          filter: blur(110px);
        }
        .services-blob--c {
          top: 35%; left: 50%;
          width: 700px; height: 360px;
          transform: translateX(-50%);
          filter: blur(140px);
        }

        .services-container {
          position: relative;
          z-index: 1;
          max-width: 1320px;
          margin: 0 auto;
        }

        /* ============================================================
           HEADER
           ============================================================ */
        .services-kicker {
          font-size: 13px;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.14em;
          margin: 0 0 16px;
          transition: color 0.4s ease;
        }

        .services-title {
          font-size: clamp(1.8rem, 4vw, 3.4rem);
          font-weight: 700;
          line-height: 1.1;
          letter-spacing: -0.025em;
          color: #0f172a;
          margin: 0 0 18px;
        }

        .services-subtitle {
          font-size: clamp(0.95rem, 1.4vw, 1.15rem);
          line-height: 1.6;
          max-width: 640px;
          margin: 0 auto;
          padding: 0 12px;
          font-weight: 400;
          transition: color 0.4s ease;
        }

        /* ============================================================
           TOGGLE
           ============================================================ */
        .services-toggle-wrap {
          display: flex;
          justify-content: center;
          padding: 0 12px;
          transition: margin-bottom 0.4s ease;
        }

        .services-toggle {
          position: relative;
          display: inline-flex;
          width: 100%;
          max-width: 440px;
          border-radius: 999px;
          padding: 6px;
          border: 1px solid rgba(0,0,0,0.05);
        }

        .services-toggle-btn {
          position: relative;
          flex: 1;
          padding: 13px 20px;
          border-radius: 999px;
          border: none;
          font-weight: 600;
          font-size: clamp(13px, 1.1vw, 15px);
          cursor: pointer;
          background: transparent;
          transition: color 0.3s ease;
          z-index: 1;
          white-space: nowrap;
          letter-spacing: 0.005em;
        }

        .services-toggle-pill {
          position: absolute;
          inset: 0;
          border-radius: 999px;
          z-index: -1;
          box-shadow: 0 8px 20px rgba(15, 23, 42, 0.18);
        }

        .services-toggle-label {
          position: relative;
          z-index: 1;
        }

        /* ============================================================
           PARTNERS STRIP
           ============================================================ */
        .services-partners-row {
          display: flex;
          align-items: center;
          gap: 14px;
          flex-wrap: wrap;
          padding: 0 4px;
        }

        .services-partners-label {
          font-size: 11.5px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          color: #475569;
          white-space: nowrap;
          flex-shrink: 0;
        }

        .services-partners-track-wrap {
          flex: 1;
          min-width: 220px;
        }

        .services-partners-strip {
          position: relative;
          overflow: hidden;
          border-radius: 999px;
          background: rgba(255, 255, 255, 0.85);
          border: 1px solid rgba(15, 23, 42, 0.06);
          box-shadow: 0 4px 18px rgba(15, 23, 42, 0.04);
          backdrop-filter: blur(6px);
          padding: 9px 0;
        }

        .services-partners-strip-fade {
          position: absolute;
          inset: 0;
          z-index: 2;
          pointer-events: none;
          background: linear-gradient(90deg,
            rgba(255,255,255,0.95) 0%,
            transparent 8%,
            transparent 92%,
            rgba(255,255,255,0.95) 100%);
        }

        .services-partners-strip-track {
          display: flex;
          gap: 30px;
          width: max-content;
          padding-left: 20px;
        }

        .services-partners-strip-item {
          display: inline-flex;
          align-items: center;
          gap: 7px;
          font-size: 12.5px;
          font-weight: 600;
          color: #334155;
          white-space: nowrap;
          letter-spacing: 0.005em;
        }

        .services-partners-strip-dot {
          width: 5px;
          height: 5px;
          border-radius: 50%;
          background: #0f172a;
          flex-shrink: 0;
        }

        /* ============================================================
           CONTENT GRID
           ============================================================ */
        .services-grid {
          display: grid;
          grid-template-columns: 1.05fr 0.95fr;
          gap: clamp(32px, 5vw, 80px);
          align-items: center;
        }

        .services-content-card {
          background: rgba(255, 255, 255, 0.95);
          backdrop-filter: blur(20px);
          border-radius: 28px;
          padding: clamp(24px, 3vw, 48px);
          border: 1px solid rgba(15, 23, 42, 0.06);
          box-shadow: 0 20px 60px rgba(15, 23, 42, 0.08);
        }

        .services-card-kicker {
          font-size: 12.5px;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.12em;
          margin: 0 0 12px;
        }

        .services-card-title {
          font-size: clamp(1.5rem, 2.6vw, 2.3rem);
          font-weight: 700;
          line-height: 1.2;
          letter-spacing: -0.02em;
          color: #0f172a;
          margin: 0 0 16px;
        }

        .services-card-desc {
          font-size: clamp(0.95rem, 1.1vw, 1.05rem);
          line-height: 1.7;
          color: #475569;
          margin: 0 0 30px;
          max-width: 520px;
        }

        /* ============================================================
           HIGHLIGHTS
           ============================================================ */
        .services-highlights {
          list-style: none;
          padding: 0;
          margin: 0 0 30px 0;
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .services-highlight-item {
          display: flex;
          align-items: flex-start;
          gap: 14px;
          font-size: 15px;
          color: #334155;
          line-height: 1.5;
          border-radius: 14px;
          padding: 14px 16px;
          cursor: default;
          border: 1px solid rgba(15, 23, 42, 0.04);
        }

        .services-highlight-icon {
          font-size: 18px;
          flex-shrink: 0;
          width: 34px;
          height: 34px;
          border-radius: 10px;
          background: #ffffff;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 2px 8px rgba(15, 23, 42, 0.05);
        }

        .services-highlight-text {
          padding-top: 5px;
        }

        /* ============================================================
           STATS
           ============================================================ */
        .services-stats {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 16px;
          padding: 24px 0;
          border-top: 1px solid rgba(15, 23, 42, 0.06);
          margin-bottom: 28px;
        }

        .services-stat {
          text-align: center;
        }

        .services-stat-value {
          font-size: clamp(1.2rem, 2vw, 1.7rem);
          font-weight: 800;
          margin: 0 0 4px;
          letter-spacing: -0.02em;
        }

        .services-stat-label {
          font-size: 11px;
          color: #64748b;
          text-transform: uppercase;
          letter-spacing: 0.06em;
          margin: 0;
          font-weight: 600;
        }

        /* ============================================================
           CTA
           ============================================================ */
        .services-cta {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 15px 32px;
          color: #fff;
          border: none;
          border-radius: 12px;
          font-weight: 600;
          font-size: 15px;
          cursor: pointer;
          width: 100%;
          justify-content: center;
          box-shadow: 0 8px 20px rgba(15, 23, 42, 0.15);
          transition: box-shadow 0.3s ease, filter 0.25s ease;
        }
        .services-cta:hover { filter: brightness(1.08); }

        .services-cta-arrow {
          display: inline-flex;
          align-items: center;
          justify-content: center;
        }

        /* ============================================================
           VIDEO SHELL
           ============================================================ */
        .services-video-shell {
          width: 100%;
          max-width: clamp(380px, 34vw, 480px);
          margin: 0 auto;
          display: flex;
          justify-content: center;
          align-items: center;
        }

        .services-video-inner { width: 100%; }

        .services-video-stage {
          position: relative;
          width: 100%;
          aspect-ratio: 4 / 5;
        }

        .services-video-footer {
          margin-top: 26px;
          display: flex;
          justify-content: space-between;
          background: #ffffff;
          border-radius: 18px;
          padding: 14px 20px;
          box-shadow: 0 10px 30px rgba(15, 23, 42, 0.06);
          border: 1px solid rgba(15, 23, 42, 0.05);
        }

        .services-video-footer-item {
          display: flex;
          flex-direction: column;
          gap: 3px;
          align-items: center;
          flex: 1;
        }
        .services-video-footer-item:not(:last-child) {
          border-right: 1px solid rgba(15, 23, 42, 0.06);
        }

        .services-floating-chip--bottom { display: flex; }

        /* ============================================================
           RESPONSIVE
           ============================================================ */
        @media (max-width: 1400px) {
          .services-video-shell { max-width: 520px; }
        }
        @media (max-width: 1100px) {
          .services-video-shell { max-width: 400px; }
        }
        @media (max-width: 900px) {
          .services-grid            { grid-template-columns: 1fr; }
          .services-video-shell     { max-width: 340px; }
          .services-video-stage     { aspect-ratio: 4 / 5; }
          .services-floating-chip--bottom { display: none; }
          .services-floating-chip--top {
            top: -14px !important;
            right: -10px !important;
            padding: 10px 14px !important;
            min-width: 76px !important;
          }
          .services-orbit-ring  { display: none; }
          .services-pattern     { display: none; }
          .services-content-card { padding: 24px; }
          .services-video-footer  { padding: 12px 14px; }
        }
        @media (max-width: 480px) {
          .services-toggle-btn   { padding: 10px 12px; }
          .services-video-shell  { max-width: 300px; }
        }
      `}</style>
    </section>
  );
}