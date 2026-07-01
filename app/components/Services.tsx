'use client';

import { useEffect, useRef, useState } from 'react';
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from 'framer-motion';
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

/* ---------- shared heading gradient ---------- */

const HEADING_GRADIENT =
  'linear-gradient(270deg, #2563eb 0%, #4f46e5 20%, #f97316 45%, #f43f5e 65%, #9333ea 85%, #2563eb 100%)';

const headingGradientStyle: React.CSSProperties = {
  backgroundImage: HEADING_GRADIENT,
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  backgroundClip: 'text',
  color: 'transparent',
};

/* ---------- default hiring partners ---------- */

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
      {
        icon: '🌍',
        text: 'Partnerships with 200+ universities globally',
      },
      {
        icon: '✈️',
        text: 'Complete visa and admission support',
      },
      {
        icon: '💰',
        text: 'Scholarship guidance and funding assistance',
      },
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
          border: `1.5px dashed ${current.accent.from}44`,
          zIndex: 0,
          pointerEvents: 'none',
        }}
      />

      {/* Glow behind card */}
      <div
        aria-hidden
        style={{
          position: 'absolute',
          inset: '-40px',
          background: `linear-gradient(135deg, ${current.accent.from}55, ${current.accent.to}55)`,
          filter: 'blur(80px)',
          borderRadius: '36px',
          zIndex: 0,
          opacity: 0.75,
        }}
      />

      {/* Gradient border frame */}
      <motion.div
        style={{
          position: 'relative',
          zIndex: 1,
          borderRadius: '30px',
          padding: '3px',
          background: `linear-gradient(140deg, ${current.accent.from}, ${current.accent.to})`,
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

            {/* Inner vignette */}
            <div
              aria-hidden
              style={{
                position: 'absolute', inset: 0, pointerEvents: 'none',
                background:
                  'linear-gradient(180deg, rgba(0,0,0,0.18) 0%, transparent 22%, transparent 68%, rgba(0,0,0,0.4) 100%)',
              }}
            />

            {/* Live badge */}
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

      {/* Floating chip — top right */}
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
          backgroundImage: `linear-gradient(135deg, ${current.accent.from}, ${current.accent.to})`,
          WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
          backgroundClip: 'text', lineHeight: 1,
        }}>
          {current.stats[0].value}
        </p>
        <p style={{ fontSize: '10.5px', color: '#888', marginTop: '4px', fontWeight: 600 }}>
          {current.stats[0].label}
        </p>
      </motion.div>

      {/* Floating chip — bottom left */}
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
          <p style={{ fontSize: '0.9rem', fontWeight: 800, color: '#111', lineHeight: 1 }}>
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
              background: `linear-gradient(135deg, ${current.accent.from}, ${current.accent.to})`,
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
              backgroundClip: 'text', fontWeight: 800, fontSize: '15px',
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
    <div style={{
      position: 'relative', overflow: 'hidden', borderRadius: '999px',
      background: 'rgba(255,255,255,0.65)',
      border: '1px solid rgba(37,99,235,0.14)',
      boxShadow: '0 4px 18px rgba(37,99,235,0.06)',
      backdropFilter: 'blur(6px)', padding: '9px 0',
    }}>
      <div
        aria-hidden
        style={{
          position: 'absolute', inset: 0, zIndex: 2, pointerEvents: 'none',
          background:
            'linear-gradient(90deg, rgba(255,255,255,0.95) 0%, transparent 8%, transparent 92%, rgba(255,255,255,0.95) 100%)',
        }}
      />
      <motion.div
        style={{ display: 'flex', gap: '30px', width: 'max-content', paddingLeft: '20px' }}
        animate={{ x: ['0%', '-50%'] }}
        transition={{ duration: 24, repeat: Infinity, ease: 'linear' }}
      >
        {list.map((name, i) => (
          <span
            key={`${name}-${i}`}
            style={{
              display: 'inline-flex', alignItems: 'center', gap: '7px',
              fontSize: '12.5px', fontWeight: 700, color: '#334155', whiteSpace: 'nowrap',
            }}
          >
            <span
              aria-hidden
              style={{
                width: '5px', height: '5px', borderRadius: '50%',
                background: 'linear-gradient(135deg, #2563eb, #f97316)', flexShrink: 0,
              }}
            />
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
    <section
      id="services"
      style={{
        position: 'relative',
        padding: 'clamp(72px, 10vw, 160px) clamp(16px, 5vw, 24px)',
        overflow: 'hidden',
      }}
    >
      {/* ── Base background — light blue left, white centre, light orange right ── */}
      {/* ↓ ONLY LINE CHANGED — #dbeafe and #ffedd5 instead of #eaf2ff and #fff2e4 */}
      <div
        aria-hidden
        style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(135deg, #dbeafe 0%, #ffffff 45%, #ffedd5 100%)',
          zIndex: 0,
        }}
      />

      {/* Dark overlay — fades in for Study Abroad, covers the base above */}
      <motion.div
        aria-hidden
        style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(180deg, #060912 0%, #0b1226 45%, #04070f 100%)',
          zIndex: 0, pointerEvents: 'none',
        }}
        animate={{ opacity: isDark ? 1 : 0 }}
        transition={{ duration: 0.65, ease: [0.4, 0, 0.2, 1] }}
      />

      {/* Dot-grid pattern */}
      <motion.div
        aria-hidden
        className="services-pattern"
        style={{
          position: 'absolute', inset: 0, backgroundSize: '28px 28px',
          maskImage: 'radial-gradient(ellipse 60% 50% at 50% 50%, black 30%, transparent 80%)',
          zIndex: 0,
        }}
        animate={{
          backgroundImage: isDark
            ? 'radial-gradient(rgba(255,255,255,0.08) 1px, transparent 1px)'
            : 'radial-gradient(rgba(0,0,0,0.06) 1px, transparent 1px)',
        }}
        transition={{ duration: 0.5 }}
      />

      {/* Ambient blob — top left */}
      <motion.div
        aria-hidden
        className="services-blob"
        style={{
          position: 'absolute', top: '-10%', left: '-12%',
          width: '560px', height: '560px',
          borderRadius: '50%', filter: 'blur(100px)', zIndex: 0, pointerEvents: 'none',
        }}
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

      {/* Ambient blob — bottom right */}
      <motion.div
        aria-hidden
        className="services-blob"
        style={{
          position: 'absolute', bottom: '-18%', right: '-12%',
          width: '600px', height: '600px',
          borderRadius: '50%', filter: 'blur(110px)', zIndex: 0, pointerEvents: 'none',
        }}
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

      {/* Ambient blob — centre */}
      <motion.div
        aria-hidden
        style={{
          position: 'absolute', top: '35%', left: '50%',
          width: '700px', height: '360px',
          borderRadius: '50%', filter: 'blur(140px)', zIndex: 0, pointerEvents: 'none',
          transform: 'translateX(-50%)',
        }}
        animate={{
          background: `radial-gradient(ellipse, ${current.accent.from}${isDark ? '22' : '14'} 0%, transparent 70%)`,
        }}
        transition={{ duration: 0.9, ease: [0.4, 0, 0.2, 1] }}
      />

      {/* ── Content ── */}
      <div style={{ position: 'relative', zIndex: 1, maxWidth: '1320px', margin: '0 auto' }}>

        {/* Header */}
        <FadeUp style={{ textAlign: 'center', marginBottom: 'clamp(40px, 6vw, 72px)' }}>
          <p style={{
            fontSize: '14px', fontWeight: '600',
            textTransform: 'uppercase', letterSpacing: '2px',
            color: current.accent.from, marginBottom: '16px',
            transition: 'color 0.4s ease',
          }}>
            {tagline}
          </p>
          <h2 style={{
            fontSize: 'clamp(1.8rem, 4vw, 3.4rem)',
            fontWeight: '800', lineHeight: '1.1',
            marginBottom: '18px', letterSpacing: '-0.02em',
            ...headingGradientStyle,
          }}>
            {title}
          </h2>
          <p style={{
            fontSize: 'clamp(0.95rem, 1.4vw, 1.2rem)',
            color: isDark ? '#a3b1c6' : '#666',
            maxWidth: '640px', margin: '0 auto', padding: '0 12px',
            transition: 'color 0.4s ease',
          }}>
            {subtitle}
          </p>
        </FadeUp>

        {/* Toggle tabs */}
        <div style={{
          display: 'flex', justifyContent: 'center',
          marginBottom: isGetPlaced ? 'clamp(20px, 3vw, 28px)' : 'clamp(48px, 6vw, 76px)',
          padding: '0 12px', transition: 'margin-bottom 0.4s ease',
        }}>
          <motion.div
            className="services-toggle"
            style={{
              position: 'relative', display: 'inline-flex',
              width: '100%', maxWidth: '440px',
              borderRadius: '999px', padding: '6px',
              border: '1px solid rgba(0,0,0,0.05)',
            }}
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
                style={{
                  position: 'relative', flex: 1,
                  padding: '13px 20px', borderRadius: '999px',
                  border: 'none', fontWeight: '600',
                  fontSize: 'clamp(13px, 1.1vw, 15px)',
                  cursor: 'pointer', background: 'transparent',
                  color: active === i ? '#fff' : isDark ? 'rgba(255,255,255,0.55)' : '#666',
                  transition: 'color 0.3s ease',
                  zIndex: 1, whiteSpace: 'nowrap',
                }}
              >
                {active === i && (
                  <motion.span
                    layoutId="services-pill"
                    style={{
                      position: 'absolute', inset: 0, borderRadius: '999px',
                      background: `linear-gradient(135deg, ${current.accent.from} 0%, ${current.accent.to} 100%)`,
                      zIndex: -1,
                      boxShadow: `0 8px 20px ${current.accent.soft}`,
                    }}
                    transition={{ type: 'spring', stiffness: 500, damping: 35 }}
                  />
                )}
                {v.tabLabel}
              </button>
            ))}
          </motion.div>
        </div>

        {/* Hiring-partners strip — Get Placed only */}
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
              <div style={{
                display: 'flex', alignItems: 'center',
                gap: '14px', flexWrap: 'wrap', padding: '0 4px',
              }}>
                <span style={{
                  fontSize: '11.5px', fontWeight: 700,
                  textTransform: 'uppercase', letterSpacing: '0.08em',
                  color: '#64748b', whiteSpace: 'nowrap', flexShrink: 0,
                }}>
                  Hiring Network
                </span>
                <div style={{ flex: 1, minWidth: '220px' }}>
                  <PartnersStrip companies={partnerCompanies} />
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Main content grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={current.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            style={{
              display: 'grid',
              gridTemplateColumns: '1.05fr 0.95fr',
              gap: 'clamp(32px, 5vw, 80px)',
              alignItems: 'center',
            }}
            className="services-grid"
          >
            {/* Left — content card */}
            <div
              className="services-content-card"
              style={{
                background: 'rgba(255,255,255,0.92)',
                backdropFilter: 'blur(20px)',
                borderRadius: '28px',
                padding: 'clamp(24px, 3vw, 48px)',
                border: '1px solid rgba(0,0,0,0.06)',
                boxShadow: '0 20px 60px rgba(0,0,0,0.08)',
              }}
            >
              <p style={{
                fontSize: '13px', fontWeight: '600',
                textTransform: 'uppercase', letterSpacing: '1.5px',
                color: current.accent.from, marginBottom: '12px',
              }}>
                {current.kicker}
              </p>

              <h3 style={{
                fontSize: 'clamp(1.5rem, 2.6vw, 2.3rem)',
                fontWeight: '800', lineHeight: '1.2',
                marginBottom: '16px', letterSpacing: '-0.01em',
                ...headingGradientStyle,
              }}>
                {current.title}
              </h3>

              <p style={{
                fontSize: 'clamp(0.95rem, 1.1vw, 1.05rem)',
                lineHeight: '1.7', color: '#666',
                marginBottom: '30px', maxWidth: '520px',
              }}>
                {current.description}
              </p>

              {/* Highlights */}
              <ul style={{
                listStyle: 'none', padding: 0,
                margin: '0 0 30px 0',
                display: 'flex', flexDirection: 'column', gap: '12px',
              }}>
                {current.highlights.map((item, idx) => (
                  <motion.li
                    key={idx}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.08, duration: 0.35 }}
                    whileHover={{ x: 4 }}
                    style={{
                      display: 'flex', alignItems: 'flex-start',
                      gap: '14px', fontSize: '15px', color: '#444',
                      lineHeight: '1.5', background: current.accent.soft,
                      borderRadius: '14px', padding: '14px 16px', cursor: 'default',
                    }}
                  >
                    <span style={{
                      fontSize: '18px', flexShrink: 0,
                      width: '34px', height: '34px', borderRadius: '10px',
                      background: '#fff',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
                    }}>
                      {item.icon}
                    </span>
                    <span style={{ paddingTop: '5px' }}>{item.text}</span>
                  </motion.li>
                ))}
              </ul>

              {/* Stats */}
              <div style={{
                display: 'grid', gridTemplateColumns: 'repeat(3,1fr)',
                gap: '16px', padding: '24px 0',
                borderTop: '1px solid rgba(0,0,0,0.06)', marginBottom: '28px',
              }}>
                {current.stats.map((stat, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, scale: 0.85 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.15 + idx * 0.08, duration: 0.3 }}
                    style={{ textAlign: 'center' }}
                  >
                    <p style={{
                      fontSize: 'clamp(1.2rem, 2vw, 1.7rem)', fontWeight: '800',
                      backgroundImage: `linear-gradient(135deg, ${current.accent.from}, ${current.accent.to})`,
                      WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
                      backgroundClip: 'text', marginBottom: '4px',
                    }}>
                      {stat.value}
                    </p>
                    <p style={{ fontSize: '11px', color: '#888', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                      {stat.label}
                    </p>
                  </motion.div>
                ))}
              </div>

              {/* CTA button */}
              <motion.button
                whileHover={{ y: -2, boxShadow: `0 14px 34px ${current.accent.soft}` }}
                whileTap={{ scale: 0.97 }}
                style={{
                  display: 'inline-flex', alignItems: 'center',
                  gap: '8px', padding: '15px 32px',
                  background: `linear-gradient(135deg, ${current.accent.from} 0%, ${current.accent.to} 100%)`,
                  color: '#fff', border: 'none', borderRadius: '12px',
                  fontWeight: '600', fontSize: '15px', cursor: 'pointer',
                  width: '100%', justifyContent: 'center',
                }}
                className="services-cta"
              >
                {current.cta}
                <motion.span
                  aria-hidden
                  animate={{ x: [0, 4, 0] }}
                  transition={{ duration: 1.4, repeat: Infinity, ease: 'easeInOut' }}
                >
                  →
                </motion.span>
              </motion.button>
            </div>

            {/* Right — video card */}
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              <div className="services-video-shell">
                <TiltVideoCard current={current} />
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* ── Responsive styles ── */}
      <style>{`
        .services-video-shell {
          width: 100%;
          max-width: clamp(380px, 34vw, 480px);
          margin: 0 auto;
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
          background: #fff;
          border-radius: 18px;
          padding: 14px 20px;
          box-shadow: 0 10px 30px rgba(0,0,0,0.06);
          border: 1px solid rgba(0,0,0,0.05);
        }
        .services-video-footer-item {
          display: flex;
          flex-direction: column;
          gap: 3px;
          align-items: center;
          flex: 1;
        }
        .services-video-footer-item:not(:last-child) {
          border-right: 1px solid rgba(0,0,0,0.06);
        }
        .services-floating-chip--bottom { display: flex; }

        @media (max-width: 1100px) {
          .services-video-shell { max-width: 400px; }
        }
        @media (max-width: 900px) {
          .services-grid            { grid-template-columns: 1fr !important; }
          .services-video-shell     { max-width: 340px !important; }
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
          .services-content-card { padding: 24px !important; }
          .services-video-footer  { padding: 12px 14px; }
        }
        @media (max-width: 480px) {
          .services-toggle button   { padding: 10px 12px !important; }
          .services-video-shell     { max-width: 300px !important; }
        }
        @media (min-width: 1400px) {
          .services-video-shell { max-width: 520px; }
        }
        .services-cta { transition: box-shadow 0.3s ease; }
      `}</style>
    </section>
  );
}