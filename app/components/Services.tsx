'use client';

import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion, useScroll, useTransform } from 'framer-motion';
import { FadeUp } from './motion';

type Cms = Record<string, string>;

const VERTICALS = [
  {
    id: 'cap',
    tabLabel: 'Get Placed',
    videoSrc: '/new1.mp4',
    ariaLabel: 'Career Assistance Programme overview',
  },
  {
    id: 'study',
    tabLabel: 'Study Abroad',
    videoSrc: '/new2.mp4',
    ariaLabel: 'Study Abroad Programme overview',
  },
] as const;

function VerticalScrollVideo({ src, ariaLabel }: { src: string; ariaLabel: string }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const isVisibleRef = useRef(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const canPlayWithSound = () => {
      if (typeof navigator !== 'undefined' && navigator.userActivation?.hasBeenActive) {
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
      document.removeEventListener('pointerdown', unlockSound, { capture: true });
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
  const sectionRef = useRef<HTMLElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });
  const showcaseY = useTransform(scrollYProgress, [0, 1], [0, -10]);

  const [active, setActive] = useState(0);
  const current = VERTICALS[active];

  const tagline = cms['hp:servicesTagline'] ?? 'What We Do';
  const title = cms['hp:servicesTitle'] ?? 'One Platform. Two Powerful Verticals.';
  const subtitle =
    cms['hp:servicesSubtitle'] ?? 'Both Designed Around Your Growth — Not Our Revenue.';

  return (
    <section
      ref={sectionRef}
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
      <motion.div className="placedly-vertical-wrap" style={{ y: showcaseY }}>
        <FadeUp className="placedly-vertical-header">
          <p className="placedly-vertical-kicker">{tagline}</p>
          <h2 className="placedly-vertical-title">{title}</h2>
          <p className="placedly-vertical-sub">{subtitle}</p>
        </FadeUp>

        <div className="placedly-vertical-tabs-wrap">
          <div
            className={`placedly-vertical-tabs${active === 1 ? ' is-right' : ''}`}
            role="tablist"
            aria-label="Placedly verticals"
          >
            <span className="placedly-vertical-tabs-indicator" aria-hidden />
            {VERTICALS.map((v, i) => (
              <motion.button
                key={v.id}
                type="button"
                role="tab"
                aria-selected={active === i}
                className={`placedly-vertical-tab${active === i ? ' is-active' : ''}`}
                onClick={() => setActive(i)}
                whileHover={{ y: -2, scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
                transition={{ type: 'spring', stiffness: 280, damping: 20 }}
              >
                {v.tabLabel}
              </motion.button>
            ))}
          </div>
        </div>

        <AnimatePresence mode="wait">
          <motion.article
            key={current.id}
            className="placedly-vertical-showcase placedly-vertical-showcase--video-only"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            whileHover={{ scale: 1.01, y: -4 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="placedly-vertical-video-shell">
              <div className="placedly-vertical-video-toolbar">
                <div className="placedly-vertical-video-dots" aria-hidden>
                  <span />
                  <span />
                  <span />
                </div>
                <span className="placedly-vertical-video-label">
                  {current.id === 'cap' ? 'Placement experience' : 'Study abroad journey'}
                </span>
              </div>
              <div className="placedly-vertical-video-stage">
                <VerticalScrollVideo src={current.videoSrc} ariaLabel={current.ariaLabel} />
                <div className="placedly-vertical-video-overlay">
                  <div>
                    <span className="placedly-vertical-video-overlay-kicker">
                      {current.id === 'cap' ? 'Live preview' : 'Guided experience'}
                    </span>
                    <strong>
                      {current.id === 'cap'
                        ? 'See how the placement journey comes to life.'
                        : 'Explore the full study abroad path in motion.'}
                    </strong>
                  </div>
                  <span className="placedly-vertical-video-pill">
                    {current.id === 'cap' ? 'End to end' : 'From start to visa'}
                  </span>
                </div>
              </div>
            </div>
          </motion.article>
        </AnimatePresence>
      </motion.div>
    </section>
  );
}
