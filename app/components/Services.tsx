'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import { AnimatePresence, motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import Link from 'next/link';
import {
  ArrowRight,
  CheckCircle2,
  GraduationCap,
  Briefcase,
  Sparkles,
  Play,
} from 'lucide-react';
import { FadeUp } from './motion';

type Cms = Record<string, string>;

type Vertical = {
  id: 'cap' | 'study';
  tabLabel: string;
  videoSrc: string;
  ariaLabel: string;
  icon: typeof Briefcase;
  eyebrow: string;
  headline: string;
  description: string;
  bullets: string[];
  stats: { value: string; numeric: number; suffix: string; label: string }[];
  ctaLabel: string;
  ctaHref: string;
  accent: string;
  accentSoft: string;
  gradient: string;
};

const VERTICALS: Vertical[] = [
  {
    id: 'cap',
    tabLabel: 'Get Placed',
    videoSrc: '/new1.mp4',
    ariaLabel: 'Career Assistance Programme overview',
    icon: Briefcase,
    eyebrow: 'Career Assistance Programme',
    headline: 'Land the MNC role — pay only after your offer letter.',
    description:
      'From resume rebuild to warm referrals at hiring managers, CAP is a done-with-you placement engine. No upfront fees, no spray-and-pray applications — just a structured path to an offer.',
    bullets: [
      'ATS-optimised resume & LinkedIn overhaul in 48 hours',
      'Live mock interviews with real-time feedback',
      'Warm introductions to 10–15 target companies',
      'Zero cost until you sign your offer letter',
    ],
    stats: [
      { value: '48h', numeric: 48, suffix: 'h', label: 'Resume turnaround' },
      { value: '12%', numeric: 12, suffix: '%', label: 'Fee, only post-offer' },
      { value: '15', numeric: 15, suffix: '+', label: 'Warm referrals' },
    ],
    ctaLabel: 'Start My CAP Journey',
    ctaHref: '/cap',
    accent: '#f97316',
    accentSoft: 'rgba(249,115,22,0.12)',
    gradient: 'linear-gradient(135deg, #f97316 0%, #fb923c 50%, #fdba74 100%)',
  },
  {
    id: 'study',
    tabLabel: 'Study Abroad',
    videoSrc: '/new2.mp4',
    ariaLabel: 'Study Abroad Programme overview',
    icon: GraduationCap,
    eyebrow: 'Study Abroad Programme',
    headline: 'Your global degree, mapped from shortlist to visa.',
    description:
      'University shortlisting, SOP crafting, funding strategy, and visa filing — handled by advisors who know the process cold. Built around your goals, not commission-driven university tie-ups.',
    bullets: [
      'Personalised university shortlist across 6 countries',
      'SOP & LOR crafted with subject-matter advisors',
      'Scholarship & education-loan guidance',
      'End-to-end visa filing support',
    ],
    stats: [
      { value: '6', numeric: 6, suffix: '', label: 'Study destinations' },
      { value: '95%', numeric: 95, suffix: '%', label: 'Visa success rate' },
      { value: '1:1', numeric: 1, suffix: ':1', label: 'Dedicated advisor' },
    ],
    ctaLabel: 'Explore Study Abroad',
    ctaHref: '/study-abroad',
    accent: '#2563eb',
    accentSoft: 'rgba(37,99,235,0.12)',
    gradient: 'linear-gradient(135deg, #2563eb 0%, #3b82f6 50%, #60a5fa 100%)',
  },
];

/* ============ Animated Counter ============ */
function AnimatedCounter({ target, suffix, color }: { target: number; suffix: string; color: string }) {
  const [display, setDisplay] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;
          const duration = 1200;
          const start = performance.now();

          const step = (now: number) => {
            const progress = Math.min((now - start) / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            setDisplay(Math.round(eased * target));
            if (progress < 1) requestAnimationFrame(step);
          };
          requestAnimationFrame(step);
        }
      },
      { threshold: 0.5 },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [target]);

  return (
    <span ref={ref} style={{ color }}>
      {display}
      {suffix}
    </span>
  );
}

/* ============ Video with 3D tilt ============ */
function VerticalScrollVideo({ src, ariaLabel }: { src: string; ariaLabel: string }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const isVisibleRef = useRef(false);
  const [isPlaying, setIsPlaying] = useState(false);

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
      return video.play().then(() => setIsPlaying(true)).catch(() => undefined);
    };

    const playWithSound = () => {
      video.muted = false;
      return video.play().then(() => setIsPlaying(true)).catch(() => playMuted());
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
          setIsPlaying(false);
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
    <>
      <video
        ref={videoRef}
        className="pv-video"
        src={src}
        loop
        playsInline
        preload="auto"
        aria-label={ariaLabel}
      />
      <AnimatePresence>
        {isPlaying && (
          <motion.div
            className="pv-live-pulse"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <span className="pv-live-dot" />
            LIVE
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export default function Services({ cms = {} }: { cms?: Cms }) {
  const [active, setActive] = useState(0);
  const current = VERTICALS[active];
  const Icon = current.icon;

  const tagline = cms['hp:servicesTagline'] ?? 'What We Do';
  const title = cms['hp:servicesTitle'] ?? 'One Platform. Two Powerful Verticals.';
  const subtitle =
    cms['hp:servicesSubtitle'] ?? 'Both Designed Around Your Growth — Not Our Revenue.';

  /* ---- 3D tilt for media card ---- */
  const cardRef = useRef<HTMLDivElement>(null);
  const mvX = useMotionValue(0);
  const mvY = useMotionValue(0);
  const rotateX = useSpring(useTransform(mvY, [-0.5, 0.5], [10, -10]), {
    stiffness: 220,
    damping: 22,
  });
  const rotateY = useSpring(useTransform(mvX, [-0.5, 0.5], [-10, 10]), {
    stiffness: 220,
    damping: 22,
  });
  const glowX = useTransform(mvX, [-0.5, 0.5], ['0%', '100%']);
  const glowY = useTransform(mvY, [-0.5, 0.5], ['0%', '100%']);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const rect = cardRef.current?.getBoundingClientRect();
    if (!rect) return;
    mvX.set((e.clientX - rect.left) / rect.width - 0.5);
    mvY.set((e.clientY - rect.top) / rect.height - 0.5);
  }, [mvX, mvY]);

  const handleMouseLeave = useCallback(() => {
    mvX.set(0);
    mvY.set(0);
  }, [mvX, mvY]);

  /* ---- magnetic CTA button ---- */
  const ctaRef = useRef<HTMLAnchorElement>(null);
  const ctaX = useSpring(0, { stiffness: 300, damping: 20 });
  const ctaY = useSpring(0, { stiffness: 300, damping: 20 });

  const handleCtaMove = useCallback((e: React.MouseEvent<HTMLAnchorElement>) => {
    const rect = ctaRef.current?.getBoundingClientRect();
    if (!rect) return;
    const relX = e.clientX - rect.left - rect.width / 2;
    const relY = e.clientY - rect.top - rect.height / 2;
    ctaX.set(relX * 0.25);
    ctaY.set(relY * 0.35);
  }, [ctaX, ctaY]);

  const handleCtaLeave = useCallback(() => {
    ctaX.set(0);
    ctaY.set(0);
  }, [ctaX, ctaY]);

  return (
    <section className="pv-section" data-active={current.id} id="services">
      <style jsx>{`
        .pv-section {
          position: relative;
          padding: clamp(64px, 8vw, 104px) clamp(20px, 4vw, 40px);
          background: #fffbf4;
          overflow: hidden;
        }

        /* ── Animated background ── */
        .pv-bg {
          position: absolute;
          inset: 0;
          pointer-events: none;
          z-index: 0;
        }
        .pv-bg-layer {
          position: absolute;
          inset: 0;
        }
        .pv-bg-layer--cap {
          background: radial-gradient(
              ellipse 60% 50% at 85% 10%,
              rgba(249, 115, 22, 0.14),
              transparent 65%
            ),
            radial-gradient(ellipse 45% 40% at 5% 90%, rgba(249, 115, 22, 0.08), transparent 60%);
        }
        .pv-bg-layer--study {
          background: radial-gradient(
              ellipse 60% 50% at 85% 10%,
              rgba(37, 99, 235, 0.14),
              transparent 65%
            ),
            radial-gradient(ellipse 45% 40% at 5% 90%, rgba(37, 99, 235, 0.08), transparent 60%);
        }
        .pv-orb {
          position: absolute;
          border-radius: 50%;
          filter: blur(50px);
          opacity: 0.35;
          pointer-events: none;
        }
        .pv-orb-1 {
          width: 280px;
          height: 280px;
          top: -60px;
          right: 8%;
          animation: pv-float-1 9s ease-in-out infinite;
        }
        .pv-orb-2 {
          width: 200px;
          height: 200px;
          bottom: -40px;
          left: 4%;
          animation: pv-float-2 11s ease-in-out infinite;
        }
        @keyframes pv-float-1 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          50% { transform: translate(-24px, 30px) scale(1.08); }
        }
        @keyframes pv-float-2 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          50% { transform: translate(20px, -24px) scale(1.1); }
        }

        .pv-grain {
          position: absolute;
          inset: 0;
          opacity: 0.025;
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='60' height='60'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
          mix-blend-mode: overlay;
          pointer-events: none;
        }

        .pv-wrap {
          position: relative;
          z-index: 1;
          max-width: 1220px;
          margin: 0 auto;
        }

        .pv-header {
          text-align: center;
          max-width: 640px;
          margin: 0 auto clamp(28px, 4vw, 40px);
        }
        .pv-kicker {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          font-size: 12px;
          font-weight: 700;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: #94a3b8;
          margin: 0 0 12px;
        }
        .pv-kicker svg {
          animation: pv-spin-slow 6s linear infinite;
        }
        @keyframes pv-spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .pv-title {
          font-family: Inter, var(--font), sans-serif;
          font-size: clamp(1.85rem, 3.4vw, 2.65rem);
          font-weight: 600;
          letter-spacing: -0.03em;
          line-height: 1.14;
          color: #181229;
          margin: 0 0 12px;
        }
        .pv-sub {
          font-size: clamp(14px, 1.3vw, 16px);
          line-height: 1.6;
          color: #64748b;
          margin: 0;
        }

        /* ── Toggle ─────────────────────────────────────── */
        .pv-tabs-wrap {
          display: flex;
          justify-content: center;
          margin-bottom: clamp(36px, 5vw, 52px);
        }
        .pv-tabs {
          position: relative;
          display: grid;
          grid-template-columns: 1fr 1fr;
          width: min(100%, 320px);
          min-height: 56px;
          padding: 4px;
          border-radius: 999px;
          background: linear-gradient(90deg, #a8d8f8 0%, #d5c8f5 50%, #f8c9a8 100%);
          background-size: 200% 100%;
          animation: pv-gradient-shift 6s ease infinite;
          isolation: isolate;
          box-shadow: 0 8px 24px rgba(15, 23, 42, 0.08);
        }
        @keyframes pv-gradient-shift {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        .pv-tabs::before {
          content: '';
          position: absolute;
          inset: 4px;
          border-radius: 999px;
          background: #fffbf4;
          z-index: 0;
        }
        .pv-tabs-indicator {
          position: absolute;
          z-index: 1;
          top: 8px;
          bottom: 8px;
          left: 8px;
          width: calc(50% - 16px);
          border-radius: 999px;
          background: #0a1225;
          transition: transform 0.32s cubic-bezier(0.22, 1, 0.36, 1),
                      background 0.4s ease;
          transform: translateX(0);
          box-shadow: 0 4px 16px rgba(0,0,0,0.25);
        }
        .pv-tabs-indicator::after {
          content: '';
          position: absolute;
          inset: 0;
          border-radius: inherit;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.15), transparent);
          background-size: 200% 100%;
          animation: pv-shimmer 2.5s linear infinite;
        }
        @keyframes pv-shimmer {
          0% { background-position: -100% 0; }
          100% { background-position: 200% 0; }
        }
        .pv-tabs.is-right .pv-tabs-indicator {
          transform: translateX(calc(100% + 16px));
        }
        .pv-tab {
          position: relative;
          z-index: 2;
          border: none;
          cursor: pointer;
          background: transparent;
          color: #0a0a0a;
          font-family: var(--font);
          font-size: 14px;
          font-weight: 600;
          border-radius: 999px;
          padding: 10px 6px;
          transition: color 0.25s ease, transform 0.2s ease;
        }
        .pv-tab:hover {
          transform: scale(1.03);
        }
        .pv-tab.is-active {
          color: #fff;
        }
        .pv-tab:focus-visible {
          outline: 2px solid #2563eb;
          outline-offset: 2px;
        }

        /* ── Split layout ───────────────────────────────── */
        .pv-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: clamp(32px, 5vw, 64px);
          align-items: center;
        }

        .pv-copy {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
        }
        .pv-copy-eyebrow {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 7px 14px 7px 10px;
          border-radius: 999px;
          font-size: 12px;
          font-weight: 700;
          letter-spacing: 0.04em;
          margin-bottom: 18px;
          transition: background 0.4s ease, color 0.4s ease;
          position: relative;
          overflow: hidden;
        }
        .pv-copy-eyebrow-icon {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 20px;
          height: 20px;
          border-radius: 50%;
          position: relative;
          z-index: 1;
        }
        .pv-copy-eyebrow-icon::after {
          content: '';
          position: absolute;
          inset: -4px;
          border-radius: 50%;
          border: 1.5px solid currentColor;
          opacity: 0.5;
          animation: pv-ping 2s cubic-bezier(0,0,0.2,1) infinite;
        }
        @keyframes pv-ping {
          0% { transform: scale(1); opacity: 0.5; }
          75%, 100% { transform: scale(1.6); opacity: 0; }
        }

        .pv-headline-wrap {
          overflow: hidden;
        }
        .pv-headline {
          font-family: Inter, var(--font), sans-serif;
          font-size: clamp(1.65rem, 2.8vw, 2.25rem);
          font-weight: 700;
          letter-spacing: -0.03em;
          line-height: 1.18;
          color: #0f172a;
          margin: 0 0 16px;
          max-width: 20ch;
        }
        .pv-desc {
          font-size: 15px;
          line-height: 1.7;
          color: #4b5563;
          margin: 0 0 26px;
          max-width: 46ch;
        }
        .pv-bullets {
          list-style: none;
          margin: 0 0 30px;
          padding: 0;
          display: flex;
          flex-direction: column;
          gap: 12px;
          width: 100%;
        }
        .pv-bullet {
          display: flex;
          align-items: flex-start;
          gap: 10px;
          font-size: 14.5px;
          font-weight: 500;
          color: #334155;
          line-height: 1.5;
        }
        .pv-bullet svg {
          flex-shrink: 0;
          margin-top: 1px;
        }
        .pv-bullet-check {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 20px;
          height: 20px;
          border-radius: 50%;
          flex-shrink: 0;
          margin-top: 1px;
        }

        .pv-stats {
          display: flex;
          gap: clamp(20px, 3vw, 32px);
          margin-bottom: 30px;
          padding-top: 22px;
          border-top: 1px solid rgba(15, 23, 42, 0.08);
          width: 100%;
        }
        .pv-stat {
          position: relative;
        }
        .pv-stat strong {
          display: block;
          font-family: Inter, var(--font), sans-serif;
          font-size: clamp(1.35rem, 2.2vw, 1.7rem);
          font-weight: 800;
          letter-spacing: -0.02em;
          line-height: 1;
        }
        .pv-stat span {
          display: block;
          margin-top: 6px;
          font-size: 11.5px;
          font-weight: 600;
          color: #94a3b8;
          letter-spacing: 0.02em;
        }

        .pv-cta {
          position: relative;
          display: inline-flex;
          align-items: center;
          gap: 10px;
          padding: 14px 24px;
          border-radius: 999px;
          background: #0a0a0a;
          color: #fff !important;
          font-size: 14.5px;
          font-weight: 700;
          text-decoration: none;
          box-shadow: 0 10px 28px rgba(0, 0, 0, 0.14);
          overflow: hidden;
        }
        .pv-cta::before {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.18), transparent);
          transform: translateX(-100%);
          transition: transform 0.6s ease;
        }
        .pv-cta:hover::before {
          transform: translateX(100%);
        }
        .pv-cta-icon {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 26px;
          height: 26px;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.16);
          position: relative;
          z-index: 1;
        }
        .pv-cta span:not(.pv-cta-icon) {
          position: relative;
          z-index: 1;
        }

        /* ── Video card (right) ─────────────────────────── */
        .pv-media {
          position: relative;
          display: flex;
          justify-content: center;
          perspective: 1400px;
        }
        .pv-media-card {
          position: relative;
          width: 100%;
          max-width: 460px;
          border-radius: 32px;
          padding: 14px;
          background: linear-gradient(145deg, #020617 0%, #0f172a 100%);
          border: 1px solid rgba(255, 255, 255, 0.14);
          box-shadow: 0 30px 70px -20px rgba(15, 23, 42, 0.45);
          transform-style: preserve-3d;
          cursor: pointer;
        }
        .pv-media-glow {
          position: absolute;
          inset: -2px;
          border-radius: 34px;
          padding: 2px;
          background: radial-gradient(
            circle at var(--gx, 50%) var(--gy, 50%),
            currentColor,
            transparent 60%
          );
          opacity: 0.55;
          pointer-events: none;
          z-index: -1;
          filter: blur(2px);
        }
        .pv-media-toolbar {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 2px 6px 12px;
        }
        .pv-media-dots {
          display: flex;
          gap: 6px;
        }
        .pv-media-dots span {
          width: 8px;
          height: 8px;
          border-radius: 999px;
          background: rgba(255, 255, 255, 0.34);
        }
        .pv-media-label {
          font-size: 11px;
          font-weight: 600;
          letter-spacing: 0.16em;
          text-transform: uppercase;
          color: rgba(255, 255, 255, 0.65);
        }
        .pv-media-stage {
          position: relative;
          overflow: hidden;
          border-radius: 24px;
          background: #000;
          box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.08);
        }
        .pv-video {
          display: block;
          width: 100%;
          height: 100%;
          aspect-ratio: 3 / 4;
          object-fit: cover;
          border-radius: inherit;
          background: #000;
        }
        .pv-live-pulse {
          position: absolute;
          top: 14px;
          left: 14px;
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 5px 10px;
          border-radius: 999px;
          background: rgba(0,0,0,0.5);
          backdrop-filter: blur(6px);
          font-size: 10px;
          font-weight: 800;
          letter-spacing: 0.08em;
          color: #fff;
        }
        .pv-live-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: #ef4444;
          animation: pv-live-blink 1.4s ease-in-out infinite;
        }
        @keyframes pv-live-blink {
          0%, 100% { opacity: 1; box-shadow: 0 0 0 0 rgba(239,68,68,0.5); }
          50% { opacity: 0.4; box-shadow: 0 0 0 6px rgba(239,68,68,0); }
        }
        .pv-media-overlay {
          position: absolute;
          left: 14px;
          right: 14px;
          bottom: 14px;
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 12px 14px;
          border-radius: 16px;
          background: linear-gradient(180deg, rgba(2, 6, 23, 0.1), rgba(2, 6, 23, 0.78));
          backdrop-filter: blur(10px);
          -webkit-backdrop-filter: blur(10px);
          color: #fff;
        }
        .pv-media-overlay-icon {
          flex-shrink: 0;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 34px;
          height: 34px;
          border-radius: 12px;
          background: rgba(255, 255, 255, 0.14);
        }
        .pv-media-overlay strong {
          display: block;
          font-size: 13px;
          font-weight: 700;
          line-height: 1.3;
        }
        .pv-media-overlay span {
          display: block;
          margin-top: 2px;
          font-size: 11px;
          color: rgba(255, 255, 255, 0.65);
        }

        .pv-media-badge {
          position: absolute;
          top: -14px;
          right: 18px;
          z-index: 3;
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 9px 14px;
          border-radius: 999px;
          background: #fff;
          border: 1px solid rgba(15, 23, 42, 0.08);
          box-shadow: 0 12px 30px rgba(15, 23, 42, 0.12);
          font-size: 12.5px;
          font-weight: 700;
          color: #0f172a;
        }
        .pv-media-badge-dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          animation: pv-live-blink 1.6s ease-in-out infinite;
        }

        .pv-float-chip {
          position: absolute;
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 10px 14px;
          border-radius: 16px;
          background: rgba(255,255,255,0.9);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(15,23,42,0.06);
          box-shadow: 0 16px 34px rgba(15,23,42,0.14);
          font-size: 12px;
          font-weight: 700;
          color: #0f172a;
          z-index: 4;
        }
        .pv-float-chip--left {
          bottom: 32px;
          left: -18px;
        }

        @media (max-width: 900px) {
          .pv-grid {
            grid-template-columns: 1fr;
            gap: 40px;
          }
          .pv-copy {
            align-items: center;
            text-align: center;
          }
          .pv-bullets {
            align-items: center;
          }
          .pv-bullet {
            text-align: left;
          }
          .pv-stats {
            justify-content: center;
          }
          .pv-media {
            order: -1;
          }
          .pv-media-card {
            max-width: 380px;
          }
          .pv-float-chip {
            display: none;
          }
        }

        @media (max-width: 480px) {
          .pv-stats {
            gap: 18px;
          }
          .pv-headline {
            max-width: none;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .pv-orb-1, .pv-orb-2, .pv-tabs, .pv-tabs-indicator::after,
          .pv-copy-eyebrow-icon::after, .pv-live-dot, .pv-media-badge-dot,
          .pv-kicker svg {
            animation: none !important;
          }
        }
      `}</style>

      <div className="pv-bg" aria-hidden>
        <motion.div
          className="pv-bg-layer pv-bg-layer--cap"
          initial={false}
          animate={{ opacity: active === 0 ? 1 : 0 }}
          transition={{ duration: 0.9, ease: [0.4, 0, 0.2, 1] }}
        />
        <motion.div
          className="pv-bg-layer pv-bg-layer--study"
          initial={false}
          animate={{ opacity: active === 1 ? 1 : 0 }}
          transition={{ duration: 0.9, ease: [0.4, 0, 0.2, 1] }}
        />
        <div className="pv-orb pv-orb-1" style={{ background: current.accent }} />
        <div className="pv-orb pv-orb-2" style={{ background: current.accent }} />
        <div className="pv-grain" />
      </div>

      <div className="pv-wrap">
        <FadeUp className="pv-header">
          <p className="pv-kicker">
            <Sparkles size={13} strokeWidth={2.5} />
            {tagline}
          </p>
          <h2 className="pv-title">{title}</h2>
          <p className="pv-sub">{subtitle}</p>
        </FadeUp>

        <div className="pv-tabs-wrap">
          <div
            className={`pv-tabs${active === 1 ? ' is-right' : ''}`}
            role="tablist"
            aria-label="Placedly verticals"
          >
            <span
              className="pv-tabs-indicator"
              style={{ background: current.id === 'cap' ? '#0a1225' : '#0a1225' }}
              aria-hidden
            />
            {VERTICALS.map((v, i) => (
              <motion.button
                key={v.id}
                type="button"
                role="tab"
                aria-selected={active === i}
                className={`pv-tab${active === i ? ' is-active' : ''}`}
                onClick={() => setActive(i)}
                whileTap={{ scale: 0.95 }}
              >
                {v.tabLabel}
              </motion.button>
            ))}
          </div>
        </div>

        <div className="pv-grid">
          {/* ── Left: copy ── */}
          <AnimatePresence mode="wait">
            <motion.div
              key={current.id}
              className="pv-copy"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -14 }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            >
              <motion.span
                className="pv-copy-eyebrow"
                style={{ background: current.accentSoft, color: current.accent }}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.05, duration: 0.4 }}
              >
                <span
                  className="pv-copy-eyebrow-icon"
                  style={{ background: current.accent, color: '#fff' }}
                >
                  <Icon size={12} strokeWidth={2.5} />
                </span>
                {current.eyebrow}
              </motion.span>

              <div className="pv-headline-wrap">
                <motion.h3
                  className="pv-headline"
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                >
                  {current.headline}
                </motion.h3>
              </div>

              <motion.p
                className="pv-desc"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.18, duration: 0.4 }}
              >
                {current.description}
              </motion.p>

              <ul className="pv-bullets">
                {current.bullets.map((b, i) => (
                  <motion.li
                    key={b}
                    className="pv-bullet"
                    initial={{ opacity: 0, x: -14 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.24 + i * 0.06, duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <span
                      className="pv-bullet-check"
                      style={{ background: current.accentSoft }}
                    >
                      <CheckCircle2 size={13} strokeWidth={2.5} color={current.accent} />
                    </span>
                    {b}
                  </motion.li>
                ))}
              </ul>

              <motion.div
                className="pv-stats"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.4 }}
              >
                {current.stats.map((s) => (
                  <div key={s.label} className="pv-stat">
                    <strong>
                      <AnimatedCounter target={s.numeric} suffix={s.suffix} color={current.accent} />
                    </strong>
                    <span>{s.label}</span>
                  </div>
                ))}
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.58, duration: 0.4 }}
              >
                <motion.div style={{ x: ctaX, y: ctaY, display: 'inline-block' }}>
                  <Link
                    ref={ctaRef}
                    href={current.ctaHref}
                    className="pv-cta"
                    onMouseMove={handleCtaMove}
                    onMouseLeave={handleCtaLeave}
                  >
                    <span>{current.ctaLabel}</span>
                    <span className="pv-cta-icon">
                      <ArrowRight size={14} strokeWidth={2.5} />
                    </span>
                  </Link>
                </motion.div>
              </motion.div>
            </motion.div>
          </AnimatePresence>

          {/* ── Right: video card ── */}
          <div className="pv-media">
            <motion.div
              className="pv-media-badge"
              style={{ color: current.accent }}
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, type: 'spring', stiffness: 260, damping: 20 }}
            >
              <span
                className="pv-media-badge-dot"
                style={{ background: current.accent }}
              />
              Live walkthrough
            </motion.div>

            <AnimatePresence mode="wait">
              <motion.div
                key={current.id}
                ref={cardRef}
                className="pv-media-card"
                style={{ rotateX, rotateY, color: current.accent }}
                initial={{ opacity: 0, scale: 0.94, y: 16 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: -10 }}
                transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
              >
                <div
                  className="pv-media-glow"
                  style={
                    {
                      '--gx': glowX,
                      '--gy': glowY,
                    } as React.CSSProperties
                  }
                />

                <div className="pv-media-toolbar">
                  <div className="pv-media-dots">
                    <span />
                    <span />
                    <span />
                  </div>
                  <span className="pv-media-label">{current.tabLabel}</span>
                </div>

                <div className="pv-media-stage">
                  <VerticalScrollVideo src={current.videoSrc} ariaLabel={current.ariaLabel} />

                  <div className="pv-media-overlay">
                    <span
                      className="pv-media-overlay-icon"
                      style={{ background: current.accentSoft, color: current.accent }}
                    >
                      <Icon size={16} strokeWidth={2.5} />
                    </span>
                    <div>
                      <strong>{current.eyebrow}</strong>
                      <span>Watch how it works, end to end</span>
                    </div>
                  </div>
                </div>

                <motion.div
                  className="pv-float-chip pv-float-chip--left"
                  initial={{ opacity: 0, scale: 0.8, y: 10 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  transition={{ delay: 0.4, type: 'spring', stiffness: 240, damping: 18 }}
                >
                  <Play size={12} fill={current.accent} color={current.accent} />
                  Autoplaying preview
                </motion.div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}