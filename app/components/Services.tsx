'use client';

import { useEffect, useRef, useState, type CSSProperties } from 'react';
import {
  AnimatePresence,
  motion,
  useScroll,
  useTransform,
  type Variants,
} from 'framer-motion';
import type { LucideIcon } from 'lucide-react';
import {
  ArrowRight,
  BriefcaseBusiness,
  CheckCircle2,
  ClipboardCheck,
  FileText,
  Globe2,
  GraduationCap,
  Handshake,
  PlaneTakeoff,
  Rocket,
  ShieldCheck,
  Sparkles,
  Trophy,
  UsersRound,
  Volume2,
  VolumeX,
  WalletCards,
} from 'lucide-react';
import { FadeUp } from './motion';

type Cms = Record<string, string>;

type VerticalCssVars = CSSProperties & {
  '--vertical-accent': string;
  '--vertical-accent-2': string;
  '--vertical-glow': string;
};

type Cta = {
  href: string;
  label: string;
  icon: LucideIcon;
};

type VerticalConfig = {
  id: 'cap' | 'study';
  tabLabel: string;
  videoSrc: string;
  ariaLabel: string;
  heroIcon: LucideIcon;
  eyebrow: string;
  badge: string;
  headline: string;
  description: string;
  accent: string;
  accent2: string;
  glow: string;
  primaryCta: Cta;
  secondaryCta: {
    href: string;
    label: string;
  };
  proof: Array<{
    value: string;
    label: string;
  }>;
  highlights: Array<{
    icon: LucideIcon;
    title: string;
    text: string;
  }>;
  steps: string[];
  videoLabel: string;
  overlayKicker: string;
  overlayTitle: string;
  overlayPill: string;
  previewCards: Array<{
    icon: LucideIcon;
    label: string;
    value: string;
  }>;
};

const VERTICALS: VerticalConfig[] = [
  {
    id: 'cap',
    tabLabel: 'Get Placed',
    videoSrc: '/new1.mp4',
    ariaLabel: 'Career Assistance Programme overview',
    heroIcon: BriefcaseBusiness,
    eyebrow: 'Career Assistance Programme',
    badge: 'Zero upfront. Success-share only.',
    headline: 'A managed placement engine built around your next offer.',
    description:
      'See the placement journey in motion: profile audit, recruiter-ready positioning, direct employer routing, interview preparation and offer negotiation — all designed around one outcome: getting you placed.',
    accent: '#2145fb',
    accent2: '#f97316',
    glow: 'rgba(33, 69, 251, 0.28)',
    primaryCta: {
      href: '/contact',
      label: 'Start placement plan',
      icon: Rocket,
    },
    secondaryCta: {
      href: '/career-assistance',
      label: 'Explore CAP',
    },
    proof: [
      { value: '300+', label: 'professionals placed' },
      { value: '40%', label: 'avg. salary hike' },
      { value: '₹0', label: 'upfront fee' },
    ],
    highlights: [
      {
        icon: FileText,
        title: 'Profile rebuild',
        text: 'ATS-ready CV, LinkedIn positioning and a sharper career story.',
      },
      {
        icon: UsersRound,
        title: 'Employer access',
        text: 'Your profile reaches relevant hiring partners and decision-makers.',
      },
      {
        icon: Handshake,
        title: 'Offer support',
        text: 'Interview prep, follow-ups, negotiation and joining assistance.',
      },
    ],
    steps: [
      'Career audit',
      'CV + LinkedIn revamp',
      'Employer outreach',
      'Interview coaching',
      'Offer negotiation',
    ],
    videoLabel: 'Placement journey preview',
    overlayKicker: 'Live programme preview',
    overlayTitle: 'From profile audit to offer letter.',
    overlayPill: 'End-to-end CAP',
    previewCards: [
      {
        icon: WalletCards,
        label: 'Fee model',
        value: '₹0 upfront',
      },
      {
        icon: Trophy,
        label: 'Outcome',
        value: 'Offer-focused support',
      },
    ],
  },
  {
    id: 'study',
    tabLabel: 'Study Abroad',
    videoSrc: '/new2.mp4',
    ariaLabel: 'Study Abroad Programme overview',
    heroIcon: GraduationCap,
    eyebrow: 'Global Education Counselling',
    badge: 'University shortlisting to visa support.',
    headline: 'A guided study abroad pathway from confusion to campus.',
    description:
      'The preview shows how we simplify your global education journey: destination strategy, course shortlisting, university applications, documentation, visa preparation and pre-departure guidance.',
    accent: '#0891b2',
    accent2: '#7c3aed',
    glow: 'rgba(8, 145, 178, 0.26)',
    primaryCta: {
      href: '/study-visa',
      label: 'Plan study abroad',
      icon: PlaneTakeoff,
    },
    secondaryCta: {
      href: '/contact',
      label: 'Talk to counsellor',
    },
    proof: [
      { value: '140+', label: 'university partners' },
      { value: '4', label: 'destination hubs' },
      { value: '1:1', label: 'expert counselling' },
    ],
    highlights: [
      {
        icon: Globe2,
        title: 'Country strategy',
        text: 'Choose the right destination based on goals, budget and profile.',
      },
      {
        icon: ClipboardCheck,
        title: 'Applications handled',
        text: 'Shortlisting, SOP guidance, documentation and submissions.',
      },
      {
        icon: ShieldCheck,
        title: 'Visa-ready files',
        text: 'Structured support for financials, documents and interview prep.',
      },
    ],
    steps: [
      'Profile evaluation',
      'Country + course fit',
      'University applications',
      'Visa documentation',
      'Pre-departure support',
    ],
    videoLabel: 'Study abroad preview',
    overlayKicker: 'Guided global pathway',
    overlayTitle: 'From shortlist to student visa.',
    overlayPill: 'Start to visa',
    previewCards: [
      {
        icon: GraduationCap,
        label: 'Network',
        value: '140+ universities',
      },
      {
        icon: PlaneTakeoff,
        label: 'Journey',
        value: 'Admissions to visa',
      },
    ],
  },
];

const showcaseVariants: Variants = {
  initial: {
    opacity: 0,
    y: 22,
    scale: 0.985,
  },
  animate: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.52,
      ease: [0.22, 1, 0.36, 1],
    },
  },
  exit: {
    opacity: 0,
    y: -16,
    scale: 0.985,
    transition: {
      duration: 0.24,
      ease: [0.4, 0, 1, 1],
    },
  },
};

const contentGroupVariants: Variants = {
  initial: {
    opacity: 0,
  },
  animate: {
    opacity: 1,
    transition: {
      staggerChildren: 0.055,
      delayChildren: 0.08,
    },
  },
  exit: {
    opacity: 0,
    transition: {
      duration: 0.16,
    },
  },
};

const itemVariants: Variants = {
  initial: {
    opacity: 0,
    y: 14,
    filter: 'blur(8px)',
  },
  animate: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: {
      duration: 0.42,
      ease: [0.22, 1, 0.36, 1],
    },
  },
  exit: {
    opacity: 0,
    y: -8,
    filter: 'blur(6px)',
    transition: {
      duration: 0.16,
    },
  },
};

function VerticalScrollVideo({
  src,
  ariaLabel,
}: {
  src: string;
  ariaLabel: string;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const isVisibleRef = useRef(false);
  const mutedRef = useRef(true);
  const [muted, setMuted] = useState(true);

  useEffect(() => {
    mutedRef.current = muted;

    if (videoRef.current) {
      videoRef.current.muted = muted;
    }
  }, [muted]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    video.muted = mutedRef.current;
    video.load();

    const playPreview = () => {
      video.muted = mutedRef.current;
      return video.play().catch(() => undefined);
    };

    if (typeof window === 'undefined' || !('IntersectionObserver' in window)) {
      void playPreview();
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisibleRef.current = entry.isIntersecting;

        if (entry.isIntersecting) {
          void playPreview();
        } else {
          video.pause();
        }
      },
      {
        threshold: 0.32,
        rootMargin: '0px 0px -10% 0px',
      },
    );

    observer.observe(video);

    return () => {
      observer.disconnect();
    };
  }, [src]);

  const toggleSound = () => {
    const video = videoRef.current;
    const nextMuted = !mutedRef.current;

    mutedRef.current = nextMuted;
    setMuted(nextMuted);

    if (!video) return;

    video.muted = nextMuted;

    if (!nextMuted) {
      void video.play().catch(() => {
        video.muted = true;
        mutedRef.current = true;
        setMuted(true);
      });
    }
  };

  return (
    <>
      <video
        ref={videoRef}
        className="placedly-vertical-cap-video"
        src={src}
        autoPlay
        muted={muted}
        loop
        playsInline
        preload="auto"
        controls={false}
        disablePictureInPicture
        aria-label={ariaLabel}
      />

      <button
        type="button"
        className="placedly-vertical-sound-toggle"
        aria-label={muted ? 'Turn sound on for preview video' : 'Mute preview video'}
        aria-pressed={!muted}
        onClick={toggleSound}
      >
        {muted ? <VolumeX size={14} /> : <Volume2 size={14} />}
        <span>{muted ? 'Tap for sound' : 'Sound on'}</span>
      </button>
    </>
  );
}

export default function Services({ cms = {} }: { cms?: Cms }) {
  const sectionRef = useRef<HTMLElement | null>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  const showcaseY = useTransform(scrollYProgress, [0, 1], [18, -18]);

  const [active, setActive] = useState(0);
  const current = VERTICALS[active];

  const HeroIcon = current.heroIcon;
  const PrimaryCtaIcon = current.primaryCta.icon;

  const tagline = cms['hp:servicesTagline'] ?? 'What We Do';
  const title = cms['hp:servicesTitle'] ?? 'One Platform. Two Powerful Verticals.';
  const subtitle =
    cms['hp:servicesSubtitle'] ??
    'Both designed around your growth — not generic counselling, not empty promises.';

  const themeVars: VerticalCssVars = {
    '--vertical-accent': current.accent,
    '--vertical-accent-2': current.accent2,
    '--vertical-glow': current.glow,
  };

  return (
    <section
      ref={sectionRef}
      className="placedly-vertical-section"
      data-active={current.id}
      id="services"
      style={themeVars}
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

      <span aria-hidden className="placedly-vertical-orb placedly-vertical-orb--primary" />
      <span aria-hidden className="placedly-vertical-orb placedly-vertical-orb--secondary" />

      <motion.div className="placedly-vertical-wrap" style={{ y: showcaseY }}>
        <FadeUp className="placedly-vertical-header">
          <p className="placedly-vertical-kicker">{tagline}</p>
          <h2 className="placedly-vertical-title">{title}</h2>
          <p className="placedly-vertical-sub">{subtitle}</p>
        </FadeUp>

        <div className="placedly-vertical-tabs-wrap">
          <div
            className="placedly-vertical-tabs"
            role="tablist"
            aria-label="Placedly verticals"
          >
            {VERTICALS.map((vertical, index) => {
              const TabIcon = vertical.heroIcon;
              const selected = active === index;

              return (
                <motion.button
                  key={vertical.id}
                  id={`placedly-vertical-tab-${vertical.id}`}
                  type="button"
                  role="tab"
                  aria-selected={selected}
                  aria-controls={`placedly-vertical-panel-${vertical.id}`}
                  className={`placedly-vertical-tab${selected ? ' is-active' : ''}`}
                  onClick={() => setActive(index)}
                  whileHover={{ y: -2, scale: 1.02 }}
                  whileTap={{ scale: 0.97 }}
                  transition={{ type: 'spring', stiffness: 320, damping: 22 }}
                >
                  {selected && (
                    <motion.span
                      layoutId="placedly-vertical-active-tab"
                      className="placedly-vertical-tab-indicator"
                      transition={{
                        type: 'spring',
                        stiffness: 420,
                        damping: 34,
                      }}
                    />
                  )}

                  <span className="placedly-vertical-tab-icon">
                    <TabIcon size={16} />
                  </span>
                  <span className="placedly-vertical-tab-copy">
                    {vertical.tabLabel}
                  </span>
                </motion.button>
              );
            })}
          </div>
        </div>

        <AnimatePresence mode="wait">
          <motion.article
            key={current.id}
            id={`placedly-vertical-panel-${current.id}`}
            role="tabpanel"
            aria-labelledby={`placedly-vertical-tab-${current.id}`}
            className="placedly-vertical-showcase"
            variants={showcaseVariants}
            initial="initial"
            animate="animate"
            exit="exit"
          >
            <motion.div
              className="placedly-vertical-content"
              variants={contentGroupVariants}
              initial="initial"
              animate="animate"
              exit="exit"
            >
              <motion.div
                className="placedly-vertical-content-topline"
                variants={itemVariants}
              >
                <span className="placedly-vertical-content-icon">
                  <HeroIcon size={18} />
                </span>
                <span>{current.eyebrow}</span>
              </motion.div>

              <motion.div className="placedly-vertical-badge" variants={itemVariants}>
                <Sparkles size={14} />
                <span>{current.badge}</span>
              </motion.div>

              <motion.h3
                className="placedly-vertical-content-title"
                variants={itemVariants}
              >
                {current.headline}
              </motion.h3>

              <motion.p
                className="placedly-vertical-content-copy"
                variants={itemVariants}
              >
                {current.description}
              </motion.p>

              <motion.div className="placedly-vertical-proof" variants={itemVariants}>
                {current.proof.map((metric) => (
                  <div key={metric.label} className="placedly-vertical-proof-card">
                    <strong>{metric.value}</strong>
                    <span>{metric.label}</span>
                  </div>
                ))}
              </motion.div>

              <motion.div
                className="placedly-vertical-highlight-grid"
                variants={itemVariants}
              >
                {current.highlights.map((item) => {
                  const Icon = item.icon;

                  return (
                    <div key={item.title} className="placedly-vertical-highlight-card">
                      <span className="placedly-vertical-highlight-icon">
                        <Icon size={18} />
                      </span>
                      <div>
                        <strong>{item.title}</strong>
                        <p>{item.text}</p>
                      </div>
                    </div>
                  );
                })}
              </motion.div>

              <motion.div className="placedly-vertical-process" variants={itemVariants}>
                <div className="placedly-vertical-process-head">
                  <CheckCircle2 size={16} />
                  <span>Guided operating system</span>
                </div>

                <ol className="placedly-vertical-process-list">
                  {current.steps.map((step, index) => (
                    <li key={step}>
                      <span>{String(index + 1).padStart(2, '0')}</span>
                      {step}
                    </li>
                  ))}
                </ol>
              </motion.div>

              <motion.div className="placedly-vertical-actions" variants={itemVariants}>
                <a
                  href={current.primaryCta.href}
                  className="placedly-vertical-cta placedly-vertical-cta--primary"
                >
                  <PrimaryCtaIcon size={16} />
                  <span>{current.primaryCta.label}</span>
                  <ArrowRight size={16} />
                </a>

                <a
                  href={current.secondaryCta.href}
                  className="placedly-vertical-cta placedly-vertical-cta--secondary"
                >
                  {current.secondaryCta.label}
                </a>
              </motion.div>
            </motion.div>

            <motion.aside
              className="placedly-vertical-media"
              aria-label={`${current.tabLabel} video preview`}
              initial={{ opacity: 0, x: 34, rotateY: -10 }}
              animate={{
                opacity: 1,
                x: 0,
                rotateY: 0,
                transition: {
                  duration: 0.58,
                  ease: [0.22, 1, 0.36, 1],
                },
              }}
              exit={{
                opacity: 0,
                x: -18,
                rotateY: 6,
                transition: {
                  duration: 0.22,
                },
              }}
            >
              <span aria-hidden className="placedly-vertical-media-ring" />
              <span aria-hidden className="placedly-vertical-media-aura" />

              <motion.div
                className="placedly-vertical-video-shell"
                whileHover={{
                  y: -8,
                  rotateX: 2.5,
                  rotateY: -4,
                  scale: 1.015,
                }}
                transition={{
                  type: 'spring',
                  stiffness: 180,
                  damping: 18,
                }}
              >
                <div className="placedly-vertical-video-toolbar">
                  <div className="placedly-vertical-video-dots" aria-hidden>
                    <span />
                    <span />
                    <span />
                  </div>

                  <span className="placedly-vertical-video-label">
                    {current.videoLabel}
                  </span>
                </div>

                <div className="placedly-vertical-video-stage">
                  <VerticalScrollVideo
                    key={current.videoSrc}
                    src={current.videoSrc}
                    ariaLabel={current.ariaLabel}
                  />

                  <div className="placedly-vertical-video-overlay">
                    <div>
                      <span className="placedly-vertical-video-overlay-kicker">
                        {current.overlayKicker}
                      </span>
                      <strong>{current.overlayTitle}</strong>
                    </div>

                    <span className="placedly-vertical-video-pill">
                      {current.overlayPill}
                    </span>
                  </div>
                </div>
              </motion.div>

              {current.previewCards.map((card, index) => {
                const CardIcon = card.icon;

                return (
                  <motion.div
                    key={card.label}
                    className={`placedly-vertical-mini-card ${
                      index === 0
                        ? 'placedly-vertical-mini-card--top'
                        : 'placedly-vertical-mini-card--bottom'
                    }`}
                    initial={{ opacity: 0, y: 12, scale: 0.94 }}
                    animate={{
                      opacity: 1,
                      y: 0,
                      scale: 1,
                      transition: {
                        delay: 0.18 + index * 0.08,
                        duration: 0.38,
                        ease: [0.22, 1, 0.36, 1],
                      },
                    }}
                  >
                    <span>
                      <CardIcon size={16} />
                    </span>
                    <div>
                      <small>{card.label}</small>
                      <strong>{card.value}</strong>
                    </div>
                  </motion.div>
                );
              })}
            </motion.aside>
          </motion.article>
        </AnimatePresence>
      </motion.div>
    </section>
  );
}