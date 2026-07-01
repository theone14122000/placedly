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
  },
];

function VideoCard({
  src,
  ariaLabel,
  isActive,
}: {
  src: string;
  ariaLabel: string;
  isActive: boolean;
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
  }, []);

  return (
    <div
      style={{
        position: 'relative',
        width: '100%',
        borderRadius: '20px',
        overflow: 'hidden',
        background: '#111',
        aspectRatio: '9 / 16',
        maxHeight: '480px',
        boxShadow: '0 25px 80px rgba(0, 0, 0, 0.35)',
      }}
    >
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
      <div
        style={{
          position: 'absolute',
          inset: 0,
          borderRadius: '20px',
          border: '2px solid rgba(255, 255, 255, 0.1)',
          pointerEvents: 'none',
        }}
      />
    </div>
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
        padding: '100px 24px',
        overflow: 'hidden',
      }}
    >
      {/* Background gradients */}
      <motion.div
        aria-hidden
        style={{
          position: 'absolute',
          inset: 0,
          background:
            'linear-gradient(135deg, rgba(99, 102, 241, 0.15) 0%, rgba(139, 92, 246, 0.1) 100%)',
          zIndex: 0,
        }}
        initial={false}
        animate={{ opacity: active === 0 ? 1 : 0.5 }}
        transition={{ duration: 0.9, ease: [0.4, 0, 0.2, 1] }}
      />
      <motion.div
        aria-hidden
        style={{
          position: 'absolute',
          inset: 0,
          background:
            'linear-gradient(135deg, rgba(59, 130, 246, 0.15) 0%, rgba(6, 182, 212, 0.1) 100%)',
          zIndex: 0,
        }}
        initial={false}
        animate={{ opacity: active === 1 ? 1 : 0.5 }}
        transition={{ duration: 0.9, ease: [0.4, 0, 0.2, 1] }}
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
            marginBottom: '60px',
          }}
        >
          <p
            style={{
              fontSize: '14px',
              fontWeight: '600',
              textTransform: 'uppercase',
              letterSpacing: '2px',
              color: '#6366f1',
              marginBottom: '16px',
            }}
          >
            {tagline}
          </p>
          <h2
            style={{
              fontSize: 'clamp(2rem, 5vw, 3rem)',
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
              fontSize: '1.1rem',
              color: '#666',
              maxWidth: '600px',
              margin: '0 auto',
            }}
          >
            {subtitle}
          </p>
        </FadeUp>

        {/* Toggle Tabs */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            marginBottom: '60px',
          }}
        >
          <div
            style={{
              display: 'inline-flex',
              background: '#fff',
              borderRadius: '12px',
              padding: '6px',
              boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
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
                  padding: '12px 32px',
                  borderRadius: '8px',
                  border: 'none',
                  fontWeight: '600',
                  fontSize: '15px',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  background: active === i ? '#111' : 'transparent',
                  color: active === i ? '#fff' : '#666',
                }}
              >
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
              gridTemplateColumns: '1fr 1fr',
              gap: '60px',
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
                padding: '40px',
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
                  color: '#6366f1',
                  marginBottom: '12px',
                }}
              >
                {current.kicker}
              </p>

              <h3
                style={{
                  fontSize: '2rem',
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
                  gap: '16px',
                }}
              >
                {current.highlights.map((item, idx) => (
                  <motion.li
                    key={idx}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.1, duration: 0.3 }}
                    style={{
                      display: 'flex',
                      alignItems: 'flex-start',
                      gap: '12px',
                      fontSize: '15px',
                      color: '#444',
                      lineHeight: '1.5',
                    }}
                  >
                    <span
                      style={{
                        fontSize: '18px',
                        flexShrink: 0,
                        marginTop: '2px',
                      }}
                    >
                      {item.icon}
                    </span>
                    <span>{item.text}</span>
                  </motion.li>
                ))}
              </ul>

              {/* Stats */}
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(3, 1fr)',
                  gap: '16px',
                  padding: '20px 0',
                  borderTop: '1px solid rgba(0, 0, 0, 0.06)',
                  marginBottom: '24px',
                }}
              >
                {current.stats.map((stat, idx) => (
                  <div key={idx} style={{ textAlign: 'center' }}>
                    <p
                      style={{
                        fontSize: '1.5rem',
                        fontWeight: '800',
                        color: '#111',
                        marginBottom: '4px',
                      }}
                    >
                      {stat.value}
                    </p>
                    <p
                      style={{
                        fontSize: '12px',
                        color: '#888',
                        textTransform: 'uppercase',
                        letterSpacing: '0.5px',
                      }}
                    >
                      {stat.label}
                    </p>
                  </div>
                ))}
              </div>

              {/* CTA Button */}
              <button
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '14px 28px',
                  background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
                  color: '#fff',
                  border: 'none',
                  borderRadius: '12px',
                  fontWeight: '600',
                  fontSize: '15px',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-2px)';
                  e.currentTarget.style.boxShadow =
                    '0 10px 30px rgba(99, 102, 241, 0.4)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                {current.cta}
                <span aria-hidden>→</span>
              </button>
            </div>

            {/* Right Side - Video Card */}
            <div
              style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <VideoCard
                src={current.videoSrc}
                ariaLabel={current.ariaLabel}
                isActive={active === 0}
              />
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Responsive Styles */}
      <style>{`
        @media (max-width: 900px) {
          .services-grid {
            grid-template-columns: 1fr !important;
            gap: 40px !important;
          }
        }
      `}</style>
    </section>
  );
}