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
  highlights: string[];
  cta: string;
}

const VERTICALS: VerticalContent[] = [
  {
    id: 'cap',
    tabLabel: 'Get Placed',
    videoSrc: '/new1.mp4',
    ariaLabel: 'Career Assistance Programme overview',
    kicker: 'Career Growth',
    title: 'Get Placed with Confidence',
    description:
      'Our comprehensive Career Assistance Programme connects you with top employers and provides mentorship to accelerate your professional journey.',
    highlights: [
      'Direct access to 500+ recruiting partners',
      'Personal career coaching and interview prep',
      'Resume optimization and portfolio building',
      '1-on-1 placement support',
    ],
    cta: 'Explore Placements',
  },
  {
    id: 'study',
    tabLabel: 'Study Abroad',
    videoSrc: '/new2.mp4',
    ariaLabel: 'Study Abroad Programme overview',
    kicker: 'Global Education',
    title: 'Study at World-Class Universities',
    description:
      'Unlock opportunities at prestigious universities worldwide. We guide you through every step of your international education journey.',
    highlights: [
      'Partnerships with 200+ universities globally',
      'Visa and admission support',
      'Scholarship guidance and funding assistance',
      'Cultural integration programs',
    ],
    cta: 'Explore Opportunities',
  },
] as const;

function VerticalScrollVideo({
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
  }, []);

  return (
    <video
      ref={videoRef}
      className="placedly-vertical-cap-video"
      src={src}
      loop
      playsInline
      preload="auto"
      aria-label={ariaLabel}
    />
  );
}

export default function Services({ cms = {} }: { cms?: Cms }) {
  const [active, setActive] = useState(0);
  const current = VERTICALS[active];

  const tagline = cms['hp:servicesTagline'] ?? 'What We Do';
  const title = cms['hp:servicesTitle'] ?? 'One Platform. Two Powerful Verticals.';
  const subtitle =
    cms['hp:servicesSubtitle'] ??
    'Both Designed Around Your Growth — Not Our Revenue.';

  return (
    <section
      className="placedly-vertical-section"
      data-active={current.id}
      id="services"
    >
      <motion.div
        aria-hidden
        className="placedly-vertical-section-bg placedly-vertical-section-bg--cap"
        initial={false}
        animate={{ opacity: active === 0 ? 1 : 0 }}
        transition={{ duration: 0.9, ease: [0.4, 0, 0.2, 1] }}
      />
      <motion.div
        aria-hidden
        className="placedly-vertical-section-bg placedly-vertical-section-bg--study"
        initial={false}
        animate={{ opacity: active === 1 ? 1 : 0 }}
        transition={{ duration: 0.9, ease: [0.4, 0, 0.2, 1] }}
      />

      <div className="placedly-vertical-wrap">
        {/* Header */}
        <FadeUp className="placedly-vertical-header">
          <p className="placedly-vertical-kicker">{tagline}</p>
          <h2 className="placedly-vertical-title">{title}</h2>
          <p className="placedly-vertical-sub">{subtitle}</p>
        </FadeUp>

        {/* Tabs */}
        <div className="placedly-vertical-tabs-wrap">
          <div
            className={`placedly-vertical-tabs${active === 1 ? ' is-right' : ''}`}
            role="tablist"
            aria-label="Placedly verticals"
          >
            <span className="placedly-vertical-tabs-indicator" aria-hidden />
            {VERTICALS.map((v, i) => (
              <button
                key={v.id}
                type="button"
                role="tab"
                aria-selected={active === i}
                className={`placedly-vertical-tab${active === i ? ' is-active' : ''}`}
                onClick={() => setActive(i)}
              >
                {v.tabLabel}
              </button>
            ))}
          </div>
        </div>

        {/* Two Column Layout */}
        <div className="placedly-vertical-showcase-wrapper">
          {/* Left Column - Content */}
          <AnimatePresence mode="wait">
            <motion.div
              key={`${current.id}-content`}
              className="placedly-vertical-content-card"
              initial={{ opacity: 0, x: -24 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -24 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="placedly-vertical-content-inner">
                <p className="placedly-vertical-content-kicker">
                  {current.kicker}
                </p>
                <h3 className="placedly-vertical-content-title">
                  {current.title}
                </h3>
                <p className="placedly-vertical-content-description">
                  {current.description}
                </p>

                <ul className="placedly-vertical-highlights-list">
                  {current.highlights.map((highlight, idx) => (
                    <motion.li
                      key={idx}
                      className="placedly-vertical-highlight-item"
                      initial={{ opacity: 0, x: -12 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{
                        delay: 0.15 + idx * 0.08,
                        duration: 0.35,
                        ease: [0.22, 1, 0.36, 1],
                      }}
                    >
                      <span className="placedly-vertical-highlight-icon">
                        <svg
                          width="14"
                          height="14"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <polyline points="20 6 9 17 4 12" />
                        </svg>
                      </span>
                      <span>{highlight}</span>
                    </motion.li>
                  ))}
                </ul>

                <button className="placedly-vertical-content-cta">
                  {current.cta}
                  <span aria-hidden>
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <line x1="5" y1="12" x2="19" y2="12" />
                      <polyline points="12 5 19 12 12 19" />
                    </svg>
                  </span>
                </button>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Right Column - Video Card */}
          <AnimatePresence mode="wait">
            <motion.article
              key={`${current.id}-video`}
              className="placedly-vertical-showcase placedly-vertical-showcase--video-card"
              initial={{ opacity: 0, scale: 0.92, y: 16 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.92, y: 16 }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="placedly-vertical-video-card">
                <div className="placedly-vertical-video-wrapper">
                  <VerticalScrollVideo
                    src={current.videoSrc}
                    ariaLabel={current.ariaLabel}
                  />
                </div>
                <div className="placedly-vertical-video-overlay">
                  <span className="placedly-vertical-video-label">
                    {current.tabLabel}
                  </span>
                </div>
              </div>
            </motion.article>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}