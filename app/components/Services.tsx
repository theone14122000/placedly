'use client';

import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
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
      { value: '95%', label: 'Acceptance Rate' },
      { value: '50+', label: 'Countries' },
    ],
    accent: { from: '#3b82f6', to: '#06b6d4', soft: 'rgba(59, 130, 246, 0.12)' },
  },
];

function VideoCard({
  src,
  ariaLabel,
}: {
  src: string;
  ariaLabel: string;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const isVisibleRef = useRef(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const canPlayWithSound = () => {
      if (
        typeof navigator !== 'undefined' &&
        navigator.userActivation?.hasBeenActive
      ) {
        return true;
      }
      return false;
    };

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
      if (isVisibleRef.current) {
        void video.play().catch(() => playMuted());
      }
    };

    document.addEventListener('pointerdown', unlockSound, { capture: true });
    document.addEventListener('keydown', unlockSound, { capture: true });

    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisibleRef.current = entry.isIntersecting;
        if (entry.isIntersecting) {
          if (canPlayWithSound()) {
            void playWithSound();
          } else {
            void playMuted();
          }
        } else {
          video.pause();
        }
      },
      { threshold: 0.35, rootMargin: '0px 0px -8% 0px' },
    );

    observer.observe(video);
    return () => {
      observer.disconnect();
      document.removeEventListener('pointerdown', unlockSound, {
        capture: true,
      });
      document.removeEventListener('keydown', unlockSound, { capture: true });
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
      style={{
        width: '100%',
        height: '100%',
        objectFit: 'cover',
        display: 'block',
      }}
    />
  );
}

export default function Services({ cms = {} }: { cms?: Cms }) {
  const [active, setActive] = useState(0);
  const current = VERTICALS[active];

  const tagline = cms['hp:servicesTagline'] ?? 'What We Do';
  const title =
    cms['hp:servicesTitle'] ?? 'One Platform. Two Powerful Verticals.';
  const subtitle =
    cms['hp:servicesSubtitle'] ??
    'Both Designed Around Your Growth — Not Our Revenue.';

  return (
    <section
      id="services"
      style={{
        position: 'relative',
        padding: 'clamp(64px, 10vw, 100px) clamp(16px, 5vw, 24px)',
        overflow: 'hidden',
      }}
    >
      {/* Ambient animated background blobs */}
      <motion.div
        aria-hidden
        className="services-blob"
        style={{
          position: 'absolute',
          top: '-10%',
          left: '-10%',
          width: '480px',
          height: '480px',
          borderRadius: '50%',
          filter: 'blur(90px)',
          zIndex: 0,
          pointerEvents: 'none',
        }}
        animate={{
          background: `radial-gradient(circle, ${current.accent.from}33 0%, transparent 70%)`,
          x: [0, 30, 0],
          y: [0, 20, 0],
        }}
        transition={{
          background: { duration: 0.9, ease: [0.4, 0, 0.2, 1] },
          x: { duration: 10, repeat: Infinity, ease: 'easeInOut' },
          y: { duration: 12, repeat: Infinity, ease: 'easeInOut' },
        }}
      />
      <motion.div
        aria-hidden
        className="services-blob"
        style={{
          position: 'absolute',
          bottom: '-15%',
          right: '-10%',
          width: '520px',
          height: '520px',
          borderRadius: '50%',
          filter: 'blur(100px)',
          zIndex: 0,
          pointerEvents: 'none',
        }}
        animate={{
          background: `radial-gradient(circle, ${current.accent.to}2e 0%, transparent 70%)`,
          x: [0, -25, 0],
          y: [0, -15, 0],
        }}
        transition={{
          background: { duration: 0.9, ease: [0.4, 0, 0.2, 1] },
          x: { duration: 11, repeat: Infinity, ease: 'easeInOut' },
          y: { duration: 9, repeat: Infinity, ease: 'easeInOut' },
        }}
      />

      <div
        style={{
          position: 'relative',
          zIndex: 1,
          maxWidth: '1200px',
          margin: '0 auto',
        }}
      >
        {/* Header */}
        <FadeUp
          style={{
            textAlign: 'center',
            marginBottom: 'clamp(40px, 6vw, 60px)',
          }}
        >
          <p
            style={{
              fontSize: '14px',
              fontWeight: '600',
              textTransform: 'uppercase',
              letterSpacing: '2px',
              color: current.accent.from,
              marginBottom: '16px',
              transition: 'color 0.4s ease',
            }}
          >
            {tagline}
          </p>
          <h2
            style={{
              fontSize: 'clamp(1.8rem, 5vw, 3rem)',
              fontWeight: '800',
              lineHeight: '1.1',
              color: '#111',
              marginBottom: '16px',
            }}
          >
            {title}
          </h2>
          <p
            style={{
              fontSize: 'clamp(0.95rem, 2vw, 1.1rem)',
              color: '#666',
              maxWidth: '600px',
              margin: '0 auto',
              padding: '0 12px',
            }}
          >
            {subtitle}
          </p>
        </FadeUp>

        {/* Toggle Tabs — sliding pill */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            marginBottom: 'clamp(40px, 6vw, 60px)',
            padding: '0 12px',
          }}
        >
          <div
            className="services-toggle"
            style={{
              position: 'relative',
              display: 'inline-flex',
              width: '100%',
              maxWidth: '420px',
              background: '#fff',
              borderRadius: '14px',
              padding: '6px',
              boxShadow: '0 4px 24px rgba(0, 0, 0, 0.08)',
              border: '1px solid rgba(0, 0, 0, 0.05)',
            }}
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
                  position: 'relative',
                  flex: 1,
                  padding: '12px 20px',
                  borderRadius: '10px',
                  border: 'none',
                  fontWeight: '600',
                  fontSize: 'clamp(13px, 2vw, 15px)',
                  cursor: 'pointer',
                  background: 'transparent',
                  color: active === i ? '#fff' : '#666',
                  transition: 'color 0.3s ease',
                  zIndex: 1,
                  whiteSpace: 'nowrap',
                }}
              >
                {active === i && (
                  <motion.span
                    layoutId="services-pill"
                    style={{
                      position: 'absolute',
                      inset: 0,
                      borderRadius: '10px',
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
          </div>
        </div>

        {/* Main Content Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={current.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            style={{
              display: 'grid',
              gridTemplateColumns: '1.1fr 0.9fr',
              gap: 'clamp(32px, 5vw, 60px)',
              alignItems: 'center',
            }}
            className="services-grid"
          >
            {/* Left Side - Content Card */}
            <div
              style={{
                background: 'rgba(255, 255, 255, 0.9)',
                backdropFilter: 'blur(20px)',
                borderRadius: '24px',
                padding: 'clamp(24px, 4vw, 40px)',
                border: '1px solid rgba(0, 0, 0, 0.06)',
                boxShadow: '0 10px 40px rgba(0, 0, 0, 0.08)',
              }}
            >
              <p
                style={{
                  fontSize: '13px',
                  fontWeight: '600',
                  textTransform: 'uppercase',
                  letterSpacing: '1.5px',
                  color: current.accent.from,
                  marginBottom: '12px',
                }}
              >
                {current.kicker}
              </p>

              <h3
                style={{
                  fontSize: 'clamp(1.5rem, 4vw, 2rem)',
                  fontWeight: '800',
                  lineHeight: '1.2',
                  color: '#111',
                  marginBottom: '16px',
                }}
              >
                {current.title}
              </h3>

              <p
                style={{
                  fontSize: '1rem',
                  lineHeight: '1.6',
                  color: '#666',
                  marginBottom: '28px',
                }}
              >
                {current.description}
              </p>

              {/* Highlights */}
              <ul
                style={{
                  listStyle: 'none',
                  padding: 0,
                  margin: '0 0 28px 0',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '12px',
                }}
              >
                {current.highlights.map((item, idx) => (
                  <motion.li
                    key={idx}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.08, duration: 0.35 }}
                    style={{
                      display: 'flex',
                      alignItems: 'flex-start',
                      gap: '14px',
                      fontSize: '15px',
                      color: '#444',
                      lineHeight: '1.5',
                      background: current.accent.soft,
                      borderRadius: '14px',
                      padding: '12px 14px',
                    }}
                  >
                    <span
                      style={{
                        fontSize: '18px',
                        flexShrink: 0,
                        width: '32px',
                        height: '32px',
                        borderRadius: '10px',
                        background: '#fff',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
                      }}
                    >
                      {item.icon}
                    </span>
                    <span style={{ paddingTop: '4px' }}>{item.text}</span>
                  </motion.li>
                ))}
              </ul>

              {/* Stats */}
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(3, 1fr)',
                  gap: '12px',
                  padding: '20px 0',
                  borderTop: '1px solid rgba(0, 0, 0, 0.06)',
                  marginBottom: '24px',
                }}
              >
                {current.stats.map((stat, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, scale: 0.85 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.15 + idx * 0.08, duration: 0.3 }}
                    style={{ textAlign: 'center' }}
                  >
                    <p
                      style={{
                        fontSize: 'clamp(1.2rem, 3vw, 1.5rem)',
                        fontWeight: '800',
                        backgroundImage: `linear-gradient(135deg, ${current.accent.from}, ${current.accent.to})`,
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        backgroundClip: 'text',
                        marginBottom: '4px',
                      }}
                    >
                      {stat.value}
                    </p>
                    <p
                      style={{
                        fontSize: '11px',
                        color: '#888',
                        textTransform: 'uppercase',
                        letterSpacing: '0.5px',
                      }}
                    >
                      {stat.label}
                    </p>
                  </motion.div>
                ))}
              </div>

              {/* CTA Button */}
              <motion.button
                whileHover={{ y: -2, boxShadow: `0 12px 30px ${current.accent.soft}` }}
                whileTap={{ scale: 0.97 }}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '14px 28px',
                  background: `linear-gradient(135deg, ${current.accent.from} 0%, ${current.accent.to} 100%)`,
                  color: '#fff',
                  border: 'none',
                  borderRadius: '12px',
                  fontWeight: '600',
                  fontSize: '15px',
                  cursor: 'pointer',
                  width: '100%',
                  justifyContent: 'center',
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

            {/* Right Side - Video Card */}
            <div
              style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.92, rotate: -2 }}
                animate={{ opacity: 1, scale: 1, rotate: 0 }}
                whileHover={{ scale: 1.02, rotate: 0.3 }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                className="services-video-wrap"
                style={{
                  position: 'relative',
                  width: '100%',
                  maxWidth: '320px',
                }}
              >
                {/* Glow behind card */}
                <div
                  aria-hidden
                  style={{
                    position: 'absolute',
                    inset: '-24px',
                    background: `linear-gradient(135deg, ${current.accent.from}55, ${current.accent.to}55)`,
                    filter: 'blur(50px)',
                    borderRadius: '32px',
                    zIndex: 0,
                    opacity: 0.7,
                  }}
                />

                {/* Gradient border frame */}
                <div
                  style={{
                    position: 'relative',
                    zIndex: 1,
                    borderRadius: '28px',
                    padding: '3px',
                    background: `linear-gradient(140deg, ${current.accent.from}, ${current.accent.to})`,
                    boxShadow: '0 25px 60px rgba(0, 0, 0, 0.25)',
                  }}
                >
                  <div
                    style={{
                      position: 'relative',
                      borderRadius: '25px',
                      overflow: 'hidden',
                      background: '#0a0a0a',
                      aspectRatio: '9 / 16',
                      maxHeight: '460px',
                    }}
                  >
                    <VideoCard src={current.videoSrc} ariaLabel={current.ariaLabel} />

                    {/* subtle inner vignette */}
                    <div
                      aria-hidden
                      style={{
                        position: 'absolute',
                        inset: 0,
                        background:
                          'linear-gradient(180deg, rgba(0,0,0,0.15) 0%, transparent 25%, transparent 70%, rgba(0,0,0,0.35) 100%)',
                        pointerEvents: 'none',
                      }}
                    />

                    {/* Live badge */}
                    <div
                      style={{
                        position: 'absolute',
                        bottom: '14px',
                        left: '14px',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '6px',
                        background: 'rgba(0, 0, 0, 0.55)',
                        backdropFilter: 'blur(10px)',
                        padding: '6px 12px',
                        borderRadius: '20px',
                        color: '#fff',
                        fontSize: '12px',
                        fontWeight: 600,
                      }}
                    >
                      <motion.span
                        animate={{ opacity: [1, 0.3, 1] }}
                        transition={{ duration: 1.6, repeat: Infinity }}
                        style={{
                          width: '7px',
                          height: '7px',
                          borderRadius: '50%',
                          background: '#22c55e',
                          display: 'inline-block',
                        }}
                      />
                      Real Story
                    </div>
                  </div>
                </div>

                {/* Floating stat chip */}
                <motion.div
                  animate={{ y: [0, -8, 0] }}
                  transition={{ duration: 3.2, repeat: Infinity, ease: 'easeInOut' }}
                  className="services-floating-chip"
                  style={{
                    position: 'absolute',
                    top: '-16px',
                    right: '-16px',
                    zIndex: 2,
                    background: '#fff',
                    borderRadius: '16px',
                    padding: '10px 16px',
                    boxShadow: '0 12px 30px rgba(0, 0, 0, 0.15)',
                    textAlign: 'center',
                    minWidth: '84px',
                  }}
                >
                  <p
                    style={{
                      fontSize: '1.1rem',
                      fontWeight: 800,
                      backgroundImage: `linear-gradient(135deg, ${current.accent.from}, ${current.accent.to})`,
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      backgroundClip: 'text',
                      lineHeight: 1,
                    }}
                  >
                    {current.stats[0].value}
                  </p>
                  <p style={{ fontSize: '10px', color: '#888', marginTop: '2px' }}>
                    {current.stats[0].label}
                  </p>
                </motion.div>
              </motion.div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Responsive Styles */}
      <style>{`
        @media (max-width: 900px) {
          .services-grid {
            grid-template-columns: 1fr !important;
          }
          .services-video-wrap {
            max-width: 260px !important;
            margin: 0 auto;
          }
          .services-floating-chip {
            top: -12px !important;
            right: -8px !important;
            padding: 8px 12px !important;
            min-width: 68px !important;
          }
          .services-blob {
            display: none;
          }
        }

        @media (max-width: 480px) {
          .services-toggle button {
            padding: 10px 12px !important;
          }
        }

        .services-cta {
          transition: box-shadow 0.3s ease;
        }
      `}</style>
    </section>
  );
}