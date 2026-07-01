'use client';

import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { FadeUp } from './motion';

type Cms = Record<string, string>;

type Vertical = {
  id: 'cap' | 'study';
  tabLabel: string;
  eyebrow: string;
  heading: string;
  description: string;
  bullets: { title: string; text: string }[];
  stats: { value: string; label: string }[];
  primaryCta: { label: string; href: string };
  secondaryCta: { label: string; href: string };
  videoSrc: string;
  posterBadge: string;
  ariaLabel: string;
};

const VERTICALS: Vertical[] = [
  {
    id: 'cap',
    tabLabel: 'Get Placed',
    eyebrow: 'Career Assistance Programme',
    heading: 'Land the job you actually deserve.',
    description:
      'A hands-on programme that pairs you with mentors, live projects and hiring partners — so you graduate from “applying” to “getting hired”.',
    bullets: [
      {
        title: '1:1 Mentorship',
        text: 'Personal guidance from industry mentors who’ve been where you want to go.',
      },
      {
        title: 'Interview Mastery',
        text: 'Mock interviews, DSA drills and HR rounds until confidence becomes muscle memory.',
      },
      {
        title: 'Direct Hiring Access',
        text: 'Referrals and shortlists across our network of 500+ partner companies.',
      },
    ],
    stats: [
      { value: '92%', label: 'Placement rate' },
      { value: '8 LPA', label: 'Avg. package' },
      { value: '500+', label: 'Hiring partners' },
    ],
    primaryCta: { label: 'Start Getting Placed', href: '#apply-cap' },
    secondaryCta: { label: 'View curriculum', href: '#curriculum-cap' },
    videoSrc: '/new1.mp4',
    posterBadge: 'Live Cohort',
    ariaLabel: 'Career Assistance Programme overview',
  },
  {
    id: 'study',
    tabLabel: 'Study Abroad',
    eyebrow: 'Study Abroad Programme',
    heading: 'Your global degree, guided end-to-end.',
    description:
      'From shortlisting universities to visa approvals — we handle the paperwork, timelines and strategy so you focus on the dream.',
    bullets: [
      {
        title: 'University Shortlisting',
        text: 'Data-backed matches across the US, UK, Canada, Germany, Australia and more.',
      },
      {
        title: 'SOP & Application Craft',
        text: 'Story-led SOPs, LORs and profile building that actually stand out.',
      },
      {
        title: 'Visa & Scholarship Support',
        text: 'Interview prep, funding roadmaps and end-to-end visa handholding.',
      },
    ],
    stats: [
      { value: '30+', label: 'Countries' },
      { value: '96%', label: 'Visa success' },
      { value: '₹40Cr+', label: 'Scholarships won' },
    ],
    primaryCta: { label: 'Plan My Study Abroad', href: '#apply-study' },
    secondaryCta: { label: 'Explore universities', href: '#universities' },
    videoSrc: '/new2.mp4',
    posterBadge: 'Global Admissions',
    ariaLabel: 'Study Abroad Programme overview',
  },
];

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

/**
 * Build a vertical from CMS overrides while falling back to the default copy.
 * CMS keys follow the pattern: `hp:services.<id>.<field>` and
 * `hp:services.<id>.bullet.<index>.title|text`, etc.
 */
function withCms(vertical: Vertical, cms: Cms): Vertical {
  const k = (field: string) => `hp:services.${vertical.id}.${field}`;
  const get = (field: string, fallback: string) => cms[k(field)] ?? fallback;

  const bullets = vertical.bullets.map((b, i) => ({
    title: cms[k(`bullet.${i}.title`)] ?? b.title,
    text: cms[k(`bullet.${i}.text`)] ?? b.text,
  }));

  const stats = vertical.stats.map((s, i) => ({
    value: cms[k(`stat.${i}.value`)] ?? s.value,
    label: cms[k(`stat.${i}.label`)] ?? s.label,
  }));

  return {
    ...vertical,
    tabLabel: get('tabLabel', vertical.tabLabel),
    eyebrow: get('eyebrow', vertical.eyebrow),
    heading: get('heading', vertical.heading),
    description: get('description', vertical.description),
    primaryCta: {
      label: get('primaryCta.label', vertical.primaryCta.label),
      href: get('primaryCta.href', vertical.primaryCta.href),
    },
    secondaryCta: {
      label: get('secondaryCta.label', vertical.secondaryCta.label),
      href: get('secondaryCta.href', vertical.secondaryCta.href),
    },
    videoSrc: get('videoSrc', vertical.videoSrc),
    posterBadge: get('posterBadge', vertical.posterBadge),
    bullets,
    stats,
  };
}

export default function Services({ cms = {} }: { cms?: Cms }) {
  const [active, setActive] = useState(0);

  const verticals = VERTICALS.map((v) => withCms(v, cms));
  const current = verticals[active];

  const tagline = cms['hp:servicesTagline'] ?? 'What We Do';
  const title = cms['hp:servicesTitle'] ?? 'One Platform. Two Powerful Verticals.';
  const subtitle =
    cms['hp:servicesSubtitle'] ?? 'Both Designed Around Your Growth — Not Our Revenue.';

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
        <FadeUp className="placedly-vertical-header">
          <p className="placedly-vertical-kicker">{tagline}</p>
          <h2 className="placedly-vertical-title">{title}</h2>
          <p className="placedly-vertical-sub">{subtitle}</p>
        </FadeUp>

        {/* Toggle — preserved */}
        <div className="placedly-vertical-tabs-wrap">
          <div
            className={`placedly-vertical-tabs${active === 1 ? ' is-right' : ''}`}
            role="tablist"
            aria-label="Placedly verticals"
          >
            <span className="placedly-vertical-tabs-indicator" aria-hidden />
            {verticals.map((v, i) => (
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

        <AnimatePresence mode="wait">
          <motion.article
            key={current.id}
            className="placedly-vertical-showcase placedly-vertical-showcase--split"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          >
            {/* LEFT — dynamic content */}
            <div className="placedly-vertical-content">
              <motion.p
                className="placedly-vertical-eyebrow"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.05, duration: 0.4 }}
              >
                <span className="placedly-vertical-eyebrow-dot" aria-hidden />
                {current.eyebrow}
              </motion.p>

              <motion.h3
                className="placedly-vertical-heading"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1, duration: 0.45 }}
              >
                {current.heading}
              </motion.h3>

              <motion.p
                className="placedly-vertical-desc"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15, duration: 0.45 }}
              >
                {current.description}
              </motion.p>

              <ul className="placedly-vertical-bullets">
                {current.bullets.map((b, i) => (
                  <motion.li
                    key={b.title}
                    className="placedly-vertical-bullet"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 + i * 0.06, duration: 0.4 }}
                  >
                    <span className="placedly-vertical-bullet-icon" aria-hidden>
                      <svg
                        width="14"
                        height="14"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="3"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                    </span>
                    <div>
                      <p className="placedly-vertical-bullet-title">{b.title}</p>
                      <p className="placedly-vertical-bullet-text">{b.text}</p>
                    </div>
                  </motion.li>
                ))}
              </ul>

              <div className="placedly-vertical-stats" role="list">
                {current.stats.map((s, i) => (
                  <motion.div
                    key={s.label}
                    role="listitem"
                    className="placedly-vertical-stat"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.35 + i * 0.06, duration: 0.4 }}
                  >
                    <p className="placedly-vertical-stat-value">{s.value}</p>
                    <p className="placedly-vertical-stat-label">{s.label}</p>
                  </motion.div>
                ))}
              </div>

              <motion.div
                className="placedly-vertical-ctas"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.55, duration: 0.4 }}
              >
                <a
                  className="placedly-vertical-cta placedly-vertical-cta--primary"
                  href={current.primaryCta.href}
                >
                  {current.primaryCta.label}
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden
                  >
                    <line x1="5" y1="12" x2="19" y2="12" />
                    <polyline points="12 5 19 12 12 19" />
                  </svg>
                </a>
                <a
                  className="placedly-vertical-cta placedly-vertical-cta--ghost"
                  href={current.secondaryCta.href}
                >
                  {current.secondaryCta.label}
                </a>
              </motion.div>
            </div>

            {/* RIGHT — small video card */}
            <motion.div
              className="placedly-vertical-video-card"
              initial={{ opacity: 0, scale: 0.96, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="placedly-vertical-video-card-head">
                <span className="placedly-vertical-video-dots" aria-hidden>
                  <i /> <i /> <i />
                </span>
                <span className="placedly-vertical-video-badge">
                  <span className="placedly-vertical-video-badge-pulse" aria-hidden />
                  {current.posterBadge}
                </span>
              </div>
              <div className="placedly-vertical-video-frame">
                <VerticalScrollVideo
                  src={current.videoSrc}
                  ariaLabel={current.ariaLabel}
                />
              </div>
              <div className="placedly-vertical-video-caption">
                <p>{current.tabLabel}</p>
                <span>Watch a 30-second walkthrough</span>
              </div>
            </motion.div>
          </motion.article>
        </AnimatePresence>
      </div>
    </section>
  );
}