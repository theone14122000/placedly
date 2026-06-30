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
  secondaryCta: { href: string; label: string };
  proof: Array<{ value: string; label: string }>;
  highlights: Array<{ icon: LucideIcon; title: string; text: string }>;
  steps: string[];
  videoLabel: string;
  overlayKicker: string;
  overlayTitle: string;
  overlayPill: string;
  previewCards: Array<{ icon: LucideIcon; label: string; value: string }>;
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
    primaryCta: { href: '/contact', label: 'Start placement plan', icon: Rocket },
    secondaryCta: { href: '/career-assistance', label: 'Explore CAP' },
    proof: [
      { value: '300+', label: 'professionals placed' },
      { value: '40%', label: 'avg. salary hike' },
      { value: '₹0', label: 'upfront fee' },
    ],
    highlights: [
      { icon: FileText, title: 'Profile rebuild', text: 'ATS-ready CV, LinkedIn positioning and a sharper career story.' },
      { icon: UsersRound, title: 'Employer access', text: 'Your profile reaches relevant hiring partners and decision-makers.' },
      { icon: Handshake, title: 'Offer support', text: 'Interview prep, follow-ups, negotiation and joining assistance.' },
    ],
    steps: ['Career audit', 'CV + LinkedIn revamp', 'Employer outreach', 'Interview coaching', 'Offer negotiation'],
    videoLabel: 'Placement journey preview',
    overlayKicker: 'Live programme preview',
    overlayTitle: 'From profile audit to offer letter.',
    overlayPill: 'End-to-end CAP',
    previewCards: [
      { icon: WalletCards, label: 'Fee model', value: '₹0 upfront' },
      { icon: Trophy, label: 'Outcome', value: 'Offer-focused support' },
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
    primaryCta: { href: '/study-visa', label: 'Plan study abroad', icon: PlaneTakeoff },
    secondaryCta: { href: '/contact', label: 'Talk to counsellor' },
    proof: [
      { value: '140+', label: 'university partners' },
      { value: '4', label: 'destination hubs' },
      { value: '1:1', label: 'expert counselling' },
    ],
    highlights: [
      { icon: Globe2, title: 'Country strategy', text: 'Choose the right destination based on goals, budget and profile.' },
      { icon: ClipboardCheck, title: 'Applications handled', text: 'Shortlisting, SOP guidance, documentation and submissions.' },
      { icon: ShieldCheck, title: 'Visa-ready files', text: 'Structured support for financials, documents and interview prep.' },
    ],
    steps: ['Profile evaluation', 'Country + course fit', 'University applications', 'Visa documentation', 'Pre-departure support'],
    videoLabel: 'Study abroad preview',
    overlayKicker: 'Guided global pathway',
    overlayTitle: 'From shortlist to student visa.',
    overlayPill: 'Start to visa',
    previewCards: [
      { icon: GraduationCap, label: 'Network', value: '140+ universities' },
      { icon: PlaneTakeoff, label: 'Journey', value: 'Admissions to visa' },
    ],
  },
];

const showcaseVariants: Variants = {
  initial: { opacity: 0, y: 22, scale: 0.985 },
  animate: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.52, ease: [0.22, 1, 0.36, 1] } },
  exit: { opacity: 0, y: -16, scale: 0.985, transition: { duration: 0.24, ease: [0.4, 0, 1, 1] } },
};

const contentGroupVariants: Variants = {
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: { staggerChildren: 0.055, delayChildren: 0.08 } },
  exit: { opacity: 0, transition: { duration: 0.16 } },
};

const itemVariants: Variants = {
  initial: { opacity: 0, y: 14, filter: 'blur(8px)' },
  animate: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.42, ease: [0.22, 1, 0.36, 1] } },
  exit: { opacity: 0, y: -8, filter: 'blur(6px)', transition: { duration: 0.16 } },
};

function VerticalScrollVideo({ src, ariaLabel }: { src: string; ariaLabel: string }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const isVisibleRef = useRef(false);
  const mutedRef = useRef(true);
  const [muted, setMuted] = useState(true);

  useEffect(() => {
    mutedRef.current = muted;
    if (videoRef.current) videoRef.current.muted = muted;
  }, [muted]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    video.muted = mutedRef.current;
    video.load();
    const playPreview = () => { video.muted = mutedRef.current; return video.play().catch(() => undefined); };
    if (typeof window === 'undefined' || !('IntersectionObserver' in window)) { void playPreview(); return; }
    const observer = new IntersectionObserver(
      ([entry]) => { isVisibleRef.current = entry.isIntersecting; if (entry.isIntersecting) { void playPreview(); } else { video.pause(); } },
      { threshold: 0.32, rootMargin: '0px 0px -10% 0px' }
    );
    observer.observe(video);
    return () => { observer.disconnect(); };
  }, [src]);

  const toggleSound = () => {
    const video = videoRef.current;
    const nextMuted = !mutedRef.current;
    mutedRef.current = nextMuted;
    setMuted(nextMuted);
    if (!video) return;
    video.muted = nextMuted;
    if (!nextMuted) {
      void video.play().catch(() => { video.muted = true; mutedRef.current = true; setMuted(true); });
    }
  };

  return (
    <div style={{ position: 'relative', width: '100%', height: '100%' }}>
      <video
        ref={videoRef}
        src={src}
        autoPlay
        muted={muted}
        loop
        playsInline
        preload="auto"
        controls={false}
        disablePictureInPicture
        aria-label={ariaLabel}
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          borderRadius: '16px',
          display: 'block',
        }}
      />
      <button
        type="button"
        aria-label={muted ? 'Turn sound on for preview video' : 'Mute preview video'}
        aria-pressed={!muted}
        onClick={toggleSound}
        style={{
          position: 'absolute',
          bottom: '16px',
          left: '16px',
          display: 'flex',
          alignItems: 'center',
          gap: '6px',
          background: 'rgba(0,0,0,0.55)',
          backdropFilter: 'blur(8px)',
          border: '1px solid rgba(255,255,255,0.15)',
          borderRadius: '999px',
          color: '#fff',
          fontSize: '12px',
          fontWeight: 500,
          padding: '6px 12px',
          cursor: 'pointer',
          zIndex: 10,
        }}
      >
        {muted ? <VolumeX size={13} /> : <Volume2 size={13} />}
        <span>{muted ? 'Tap for sound' : 'Sound on'}</span>
      </button>
    </div>
  );
}

export default function Services({ cms = {} }: { cms?: Cms }) {
  const sectionRef = useRef<HTMLElement | null>(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start end', 'end start'] });
  const showcaseY = useTransform(scrollYProgress, [0, 1], [18, -18]);
  const [active, setActive] = useState(0);
  const current = VERTICALS[active];
  const HeroIcon = current.heroIcon;
  const PrimaryCtaIcon = current.primaryCta.icon;

  const tagline = cms['hp:servicesTagline'] ?? 'What We Do';
  const title = cms['hp:servicesTitle'] ?? 'One Platform. Two Powerful Verticals.';
  const subtitle = cms['hp:servicesSubtitle'] ?? 'Both designed around your growth — not generic counselling, not empty promises.';

  const isStudy = active === 1;
  const accentColor = current.accent;
  const accent2Color = current.accent2;

  return (
    <section
      ref={sectionRef}
      id="services"
      style={{
        position: 'relative',
        overflow: 'hidden',
        background: isStudy
          ? 'linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 40%, #f5f3ff 100%)'
          : 'linear-gradient(135deg, #f0f4ff 0%, #e8ecff 40%, #fff7ed 100%)',
        padding: '100px 0 120px',
        transition: 'background 0.9s ease',
      }}
    >
      {/* Ambient orbs */}
      <div aria-hidden style={{
        position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 0,
      }}>
        <div style={{
          position: 'absolute',
          top: '-10%',
          left: '-5%',
          width: '600px',
          height: '600px',
          borderRadius: '50%',
          background: `radial-gradient(circle, ${current.glow} 0%, transparent 70%)`,
          transition: 'background 0.9s ease',
          filter: 'blur(40px)',
        }} />
        <div style={{
          position: 'absolute',
          bottom: '-15%',
          right: '-8%',
          width: '500px',
          height: '500px',
          borderRadius: '50%',
          background: `radial-gradient(circle, ${isStudy ? 'rgba(124,58,237,0.18)' : 'rgba(249,115,22,0.18)'} 0%, transparent 70%)`,
          transition: 'background 0.9s ease',
          filter: 'blur(50px)',
        }} />
      </div>

      <motion.div style={{ y: showcaseY, position: 'relative', zIndex: 1 }}>
        {/* ── Header ── */}
        <FadeUp>
          <div style={{ textAlign: 'center', marginBottom: '56px', padding: '0 24px' }}>
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              background: `linear-gradient(135deg, ${accentColor}18, ${accentColor}10)`,
              border: `1px solid ${accentColor}30`,
              borderRadius: '999px',
              padding: '6px 16px',
              marginBottom: '20px',
              transition: 'all 0.6s ease',
            }}>
              <Sparkles size={13} style={{ color: accentColor }} />
              <span style={{ fontSize: '13px', fontWeight: 600, color: accentColor, letterSpacing: '0.04em', textTransform: 'uppercase' }}>
                {tagline}
              </span>
            </div>

            <h2 style={{
              fontSize: 'clamp(2rem, 4vw, 3.25rem)',
              fontWeight: 800,
              letterSpacing: '-0.03em',
              lineHeight: 1.15,
              color: '#0f172a',
              marginBottom: '16px',
              maxWidth: '680px',
              margin: '0 auto 16px',
            }}>
              {title}
            </h2>

            <p style={{
              fontSize: '1.0625rem',
              color: '#64748b',
              maxWidth: '520px',
              margin: '0 auto',
              lineHeight: 1.7,
            }}>
              {subtitle}
            </p>
          </div>
        </FadeUp>

        {/* ── Toggle Switch Tabs ── */}
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '60px' }}>
          <div
            role="tablist"
            aria-label="Placedly verticals"
            style={{
              display: 'inline-flex',
              background: 'rgba(255,255,255,0.7)',
              backdropFilter: 'blur(12px)',
              border: '1px solid rgba(0,0,0,0.08)',
              borderRadius: '999px',
              padding: '5px',
              gap: '4px',
              boxShadow: '0 4px 24px rgba(0,0,0,0.08)',
            }}
          >
            {VERTICALS.map((vertical, index) => {
              const TabIcon = vertical.heroIcon;
              const selected = active === index;
              return (
                <motion.button
                  key={vertical.id}
                  id={`tab-${vertical.id}`}
                  type="button"
                  role="tab"
                  aria-selected={selected}
                  aria-controls={`panel-${vertical.id}`}
                  onClick={() => setActive(index)}
                  whileTap={{ scale: 0.96 }}
                  style={{
                    position: 'relative',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    padding: '10px 24px',
                    borderRadius: '999px',
                    border: 'none',
                    cursor: 'pointer',
                    fontSize: '14px',
                    fontWeight: 600,
                    color: selected ? '#fff' : '#64748b',
                    background: 'transparent',
                    zIndex: 1,
                    transition: 'color 0.3s ease',
                  }}
                >
                  {selected && (
                    <motion.span
                      layoutId="tab-pill"
                      style={{
                        position: 'absolute',
                        inset: 0,
                        borderRadius: '999px',
                        background: `linear-gradient(135deg, ${vertical.accent}, ${vertical.accent2})`,
                        zIndex: -1,
                        boxShadow: `0 4px 16px ${vertical.glow}`,
                      }}
                      transition={{ type: 'spring', stiffness: 420, damping: 34 }}
                    />
                  )}
                  <TabIcon size={15} />
                  {vertical.tabLabel}
                </motion.button>
              );
            })}
          </div>
        </div>

        {/* ── Main Showcase: Content LEFT | Video RIGHT ── */}
        <AnimatePresence mode="wait">
          <motion.article
            key={current.id}
            id={`panel-${current.id}`}
            role="tabpanel"
            aria-labelledby={`tab-${current.id}`}
            variants={showcaseVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '48px',
              alignItems: 'center',
              maxWidth: '1240px',
              margin: '0 auto',
              padding: '0 40px',
            }}
          >
            {/* ── LEFT: Content ── */}
            <motion.div
              variants={contentGroupVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}
            >
              {/* Eyebrow */}
              <motion.div variants={itemVariants} style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <span style={{
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  width: '36px', height: '36px', borderRadius: '10px',
                  background: `linear-gradient(135deg, ${accentColor}22, ${accentColor}10)`,
                  color: accentColor,
                  border: `1px solid ${accentColor}25`,
                }}>
                  <HeroIcon size={18} />
                </span>
                <span style={{ fontSize: '13px', fontWeight: 600, color: accentColor, letterSpacing: '0.05em', textTransform: 'uppercase' }}>
                  {current.eyebrow}
                </span>
              </motion.div>

              {/* Badge */}
              <motion.div variants={itemVariants} style={{
                display: 'inline-flex', alignSelf: 'flex-start', alignItems: 'center', gap: '7px',
                background: `linear-gradient(135deg, ${accent2Color}18, ${accent2Color}08)`,
                border: `1px solid ${accent2Color}30`,
                borderRadius: '999px', padding: '5px 14px',
                color: accent2Color, fontSize: '12.5px', fontWeight: 600,
              }}>
                <Sparkles size={12} />
                {current.badge}
              </motion.div>

              {/* Headline */}
              <motion.h3 variants={itemVariants} style={{
                fontSize: 'clamp(1.6rem, 2.8vw, 2.4rem)',
                fontWeight: 800,
                letterSpacing: '-0.03em',
                lineHeight: 1.2,
                color: '#0f172a',
                margin: 0,
              }}>
                {current.headline}
              </motion.h3>

              {/* Description */}
              <motion.p variants={itemVariants} style={{
                fontSize: '1rem', color: '#475569', lineHeight: 1.75, margin: 0,
              }}>
                {current.description}
              </motion.p>

              {/* Proof metrics */}
              <motion.div variants={itemVariants} style={{
                display: 'flex', gap: '0', 
                background: 'rgba(255,255,255,0.8)',
                backdropFilter: 'blur(8px)',
                border: '1px solid rgba(0,0,0,0.07)',
                borderRadius: '16px',
                overflow: 'hidden',
              }}>
                {current.proof.map((metric, i) => (
                  <div key={metric.label} style={{
                    flex: 1, textAlign: 'center', padding: '20px 16px',
                    borderRight: i < current.proof.length - 1 ? '1px solid rgba(0,0,0,0.07)' : 'none',
                  }}>
                    <div style={{ fontSize: 'clamp(1.4rem, 2.5vw, 2rem)', fontWeight: 800, color: accentColor, letterSpacing: '-0.03em' }}>
                      {metric.value}
                    </div>
                    <div style={{ fontSize: '12px', color: '#94a3b8', fontWeight: 500, marginTop: '4px' }}>
                      {metric.label}
                    </div>
                  </div>
                ))}
              </motion.div>

              {/* Highlights */}
              <motion.div variants={itemVariants} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {current.highlights.map((item) => {
                  const Icon = item.icon;
                  return (
                    <div key={item.title} style={{
                      display: 'flex', alignItems: 'flex-start', gap: '14px',
                      padding: '16px 18px',
                      background: 'rgba(255,255,255,0.75)',
                      backdropFilter: 'blur(8px)',
                      border: '1px solid rgba(0,0,0,0.07)',
                      borderRadius: '14px',
                      transition: 'transform 0.2s ease, box-shadow 0.2s ease',
                    }}>
                      <span style={{
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        width: '38px', height: '38px', borderRadius: '10px',
                        background: `linear-gradient(135deg, ${accentColor}20, ${accentColor}08)`,
                        color: accentColor, flexShrink: 0,
                        border: `1px solid ${accentColor}20`,
                      }}>
                        <Icon size={17} />
                      </span>
                      <div>
                        <div style={{ fontSize: '14px', fontWeight: 700, color: '#1e293b', marginBottom: '3px' }}>
                          {item.title}
                        </div>
                        <div style={{ fontSize: '13px', color: '#64748b', lineHeight: 1.6 }}>
                          {item.text}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </motion.div>

              {/* Process steps */}
              <motion.div variants={itemVariants} style={{
                background: 'rgba(255,255,255,0.8)',
                backdropFilter: 'blur(8px)',
                border: '1px solid rgba(0,0,0,0.07)',
                borderRadius: '16px',
                padding: '18px 20px',
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '14px' }}>
                  <CheckCircle2 size={15} style={{ color: accentColor }} />
                  <span style={{ fontSize: '12.5px', fontWeight: 700, color: '#475569', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                    Guided operating system
                  </span>
                </div>
                <ol style={{
                  display: 'flex', flexWrap: 'wrap', gap: '8px',
                  listStyle: 'none', margin: 0, padding: 0,
                }}>
                  {current.steps.map((step, index) => (
                    <li key={step} style={{
                      display: 'flex', alignItems: 'center', gap: '6px',
                      background: `linear-gradient(135deg, ${accentColor}12, ${accentColor}06)`,
                      border: `1px solid ${accentColor}20`,
                      borderRadius: '999px', padding: '5px 12px',
                      fontSize: '12.5px', color: '#1e293b', fontWeight: 500,
                    }}>
                      <span style={{
                        fontSize: '11px', fontWeight: 700, color: accentColor,
                        background: `${accentColor}18`, borderRadius: '50%',
                        width: '18px', height: '18px', display: 'flex', alignItems: 'center', justifyContent: 'center',
                      }}>
                        {String(index + 1).padStart(2, '0')}
                      </span>
                      {step}
                    </li>
                  ))}
                </ol>
              </motion.div>

              {/* CTAs */}
              <motion.div variants={itemVariants} style={{ display: 'flex', alignItems: 'center', gap: '14px', flexWrap: 'wrap' }}>
                <motion.a
                  href={current.primaryCta.href}
                  whileHover={{ scale: 1.03, y: -2 }}
                  whileTap={{ scale: 0.97 }}
                  style={{
                    display: 'inline-flex', alignItems: 'center', gap: '8px',
                    background: `linear-gradient(135deg, ${accentColor}, ${accent2Color})`,
                    color: '#fff', borderRadius: '12px',
                    padding: '14px 24px', fontWeight: 700, fontSize: '14px',
                    textDecoration: 'none',
                    boxShadow: `0 8px 28px ${current.glow}`,
                    transition: 'box-shadow 0.3s ease',
                  }}
                >
                  <PrimaryCtaIcon size={16} />
                  {current.primaryCta.label}
                  <ArrowRight size={15} />
                </motion.a>

                <a
                  href={current.secondaryCta.href}
                  style={{
                    display: 'inline-flex', alignItems: 'center', gap: '6px',
                    color: accentColor, fontSize: '14px', fontWeight: 600,
                    textDecoration: 'none', padding: '14px 4px',
                    borderBottom: `2px solid ${accentColor}30`,
                    transition: 'border-color 0.2s ease',
                  }}
                >
                  {current.secondaryCta.label}
                  <ArrowRight size={14} />
                </a>
              </motion.div>
            </motion.div>

            {/* ── RIGHT: Video ── */}
            <motion.aside
              aria-label={`${current.tabLabel} video preview`}
              initial={{ opacity: 0, x: 48, rotateY: -8 }}
              animate={{ opacity: 1, x: 0, rotateY: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } }}
              exit={{ opacity: 0, x: -24, rotateY: 6, transition: { duration: 0.22 } }}
              style={{ position: 'relative', perspective: '1200px' }}
            >
              {/* Glow halo behind video */}
              <div aria-hidden style={{
                position: 'absolute', inset: '-24px',
                borderRadius: '32px',
                background: `radial-gradient(ellipse at center, ${current.glow} 0%, transparent 65%)`,
                filter: 'blur(20px)',
                zIndex: 0,
              }} />

              <motion.div
                whileHover={{ y: -10, rotateX: 2, rotateY: -4, scale: 1.012 }}
                transition={{ type: 'spring', stiffness: 180, damping: 18 }}
                style={{
                  position: 'relative', zIndex: 1,
                  background: 'rgba(255,255,255,0.9)',
                  backdropFilter: 'blur(20px)',
                  borderRadius: '24px',
                  overflow: 'visible',
                  boxShadow: `0 32px 80px rgba(0,0,0,0.14), 0 0 0 1px rgba(255,255,255,0.8)`,
                }}
              >
                {/* Toolbar */}
                <div style={{
                  display: 'flex', alignItems: 'center', gap: '12px',
                  padding: '14px 18px',
                  background: 'rgba(255,255,255,0.95)',
                  borderBottom: '1px solid rgba(0,0,0,0.07)',
                  borderRadius: '24px 24px 0 0',
                }}>
                  <div style={{ display: 'flex', gap: '6px' }}>
                    {['#ff5f57', '#febc2e', '#28c840'].map((c) => (
                      <span key={c} style={{ width: '11px', height: '11px', borderRadius: '50%', background: c, display: 'block' }} />
                    ))}
                  </div>
                  <span style={{ flex: 1, textAlign: 'center', fontSize: '12px', fontWeight: 600, color: '#94a3b8' }}>
                    {current.videoLabel}
                  </span>
                </div>

                {/* Video stage */}
                <div style={{ position: 'relative', aspectRatio: '16/10', overflow: 'hidden', borderRadius: '0 0 24px 24px' }}>
                  <VerticalScrollVideo key={current.videoSrc} src={current.videoSrc} ariaLabel={current.ariaLabel} />

                  {/* Bottom overlay */}
                  <div style={{
                    position: 'absolute', bottom: 0, left: 0, right: 0,
                    background: 'linear-gradient(to top, rgba(0,0,0,0.72) 0%, transparent 100%)',
                    padding: '40px 20px 20px',
                    display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between',
                  }}>
                    <div>
                      <div style={{ fontSize: '11px', color: 'rgba(255,255,255,0.7)', fontWeight: 500, marginBottom: '4px', letterSpacing: '0.05em', textTransform: 'uppercase' }}>
                        {current.overlayKicker}
                      </div>
                      <div style={{ fontSize: '15px', fontWeight: 700, color: '#fff' }}>
                        {current.overlayTitle}
                      </div>
                    </div>
                    <span style={{
                      background: `linear-gradient(135deg, ${accentColor}, ${accent2Color})`,
                      color: '#fff', fontSize: '11px', fontWeight: 700,
                      padding: '5px 12px', borderRadius: '999px',
                      letterSpacing: '0.03em',
                    }}>
                      {current.overlayPill}
                    </span>
                  </div>
                </div>
              </motion.div>

              {/* Floating preview cards */}
              {current.previewCards.map((card, index) => {
                const CardIcon = card.icon;
                return (
                  <motion.div
                    key={card.label}
                    initial={{ opacity: 0, y: 16, scale: 0.9 }}
                    animate={{ opacity: 1, y: 0, scale: 1, transition: { delay: 0.2 + index * 0.1, duration: 0.4, ease: [0.22, 1, 0.36, 1] } }}
                    style={{
                      position: 'absolute',
                      ...(index === 0
                        ? { top: '-18px', right: '-22px' }
                        : { bottom: '-18px', left: '-22px' }
                      ),
                      zIndex: 10,
                      display: 'flex', alignItems: 'center', gap: '10px',
                      background: 'rgba(255,255,255,0.96)',
                      backdropFilter: 'blur(16px)',
                      border: '1px solid rgba(0,0,0,0.08)',
                      borderRadius: '14px',
                      padding: '12px 16px',
                      boxShadow: '0 8px 32px rgba(0,0,0,0.12)',
                      minWidth: '160px',
                    }}
                  >
                    <span style={{
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      width: '34px', height: '34px', borderRadius: '9px',
                      background: `linear-gradient(135deg, ${accentColor}22, ${accentColor}10)`,
                      color: accentColor,
                      flexShrink: 0,
                    }}>
                      <CardIcon size={16} />
                    </span>
                    <div>
                      <div style={{ fontSize: '11px', color: '#94a3b8', fontWeight: 500 }}>{card.label}</div>
                      <div style={{ fontSize: '13px', fontWeight: 700, color: '#1e293b' }}>{card.value}</div>
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