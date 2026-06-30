'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { ArrowRight, Sparkles } from 'lucide-react';
import Link from 'next/link';
import { FadeUp } from './motion';

/* ─── constants ─── */
export const CAP_JOURNEY_SECTION_ID = 'cap-journey';
const STICKY_TOP = 112;

/* ─── types ─── */
type Cms = Record<string, string>;

type JourneyStep = {
  id: string;
  title: string;
  body: string;
  image: string;
  href: string;
};

/* ─── data ─── */
const DEFAULT_STEPS: JourneyStep[] = [
  {
    id: 'resume',
    title: 'Resume Rebuild',
    body:
      'ATS-friendly resume with achievement-based bullets, domain keywords, and a narrative that positions you for MNC roles — ready in 48 hours.',
    image: '/img/hero%20feature%20img.png',
    href: '/cap',
  },
  {
    id: 'linkedin',
    title: 'LinkedIn Overhaul',
    body:
      'Headline, summary, and experience aligned to the roles you want — so recruiters and hiring managers see a consistent, credible profile.',
    image: '/img/hero%20feature%20img%202.png',
    href: '/cap',
  },
  {
    id: 'mock',
    title: 'Mock Interview Sprint',
    body:
      'Three live coaching rounds — HR, technical/domain, and a full mock with salary negotiation scripting before you ever enter the real room.',
    image: '/img/team.png',
    href: '/cap',
  },
  {
    id: 'referral',
    title: 'Warm Referrals',
    body:
      'Your profile goes directly to hiring managers at 10–15 target companies — with a warm introduction from Placedly, not a mass blast.',
    image: '/img/career%20fair.png',
    href: '/cap',
  },
  {
    id: 'offer',
    title: 'Offer Letter',
    body:
      'When your offer arrives, the journey completes — and only then does our 12% Career Assistance Fee apply. Zero upfront, zero risk.',
    image: '/img/placed.jpg',
    href: '/cap/apply',
  },
  {
    id: 'launch',
    title: 'Career Launch',
    body:
      'Post-offer onboarding prep, salary negotiation support, and first-90-days check-ins so your new role starts strong.',
    image: '/img/hero%20feaure%20img%203.png',
    href: '/cap',
  },
];

/* ─── Floating CTA (inline) ─── */
function CapFloatingCta() {
  const [isVisible, setIsVisible] = useState(false);
  const observerRef = useRef<IntersectionObserver | null>(null);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    const section = document.getElementById(CAP_JOURNEY_SECTION_ID);
    if (!section) return;

    if (observerRef.current) observerRef.current.disconnect();

    observerRef.current = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (!entry) return;
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0, rootMargin: '-6% 0px -6% 0px' },
    );

    observerRef.current.observe(section);
    return () => observerRef.current?.disconnect();
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <div className="cap-floating-cta">
          <motion.div
            className="cap-floating-cta-float"
            initial={{ opacity: 0, y: 24, scale: 0.94 }}
            animate={{
              opacity: 1,
              scale: 1,
              y: shouldReduceMotion ? 0 : [0, -8, 0],
            }}
            exit={{ opacity: 0, y: 24, scale: 0.94 }}
            transition={{
              opacity: { duration: 0.32, ease: [0.22, 1, 0.36, 1] },
              scale: { duration: 0.32, ease: [0.22, 1, 0.36, 1] },
              y: shouldReduceMotion
                ? { duration: 0 }
                : { duration: 3.8, repeat: Infinity, repeatType: 'loop', ease: [0.45, 0, 0.55, 1], delay: 0.18 },
            }}
          >
            <Link href="/cap/apply" className="cap-floating-cta-btn" aria-label="Apply to the Career Assistance Programme">
              <Sparkles size={16} aria-hidden />
              <span>Apply to CAP</span>
              <ArrowRight size={16} aria-hidden />
            </Link>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

/* ─── Main Section ─── */
export default function CapJourneySection({ cms = {} }: { cms?: Cms }) {
  const [activeStep, setActiveStep] = useState(0);
  const [fillProgress, setFillProgress] = useState(0);
  const [markerTops, setMarkerTops] = useState<number[]>([]);

  const cardsColRef = useRef<HTMLDivElement>(null);
  const cardsTrackRef = useRef<HTMLDivElement>(null);

  const kicker = cms['hp:capJourneyKicker'] ?? 'Career Assistance Programme';
  const title = cms['hp:capJourneyTitle'] ?? 'Your CAP Journey — From Resume to Offer';
  const subtitle =
    cms['hp:capJourneySubtitle'] ??
    'Scroll through each stage of the programme. Every step is advisor-led, transparent, and built to get you placed — not just applied.';

  const updateMarkerPositions = useCallback(() => {
    const track = cardsTrackRef.current;
    if (!track) return;
    const cards = track.querySelectorAll<HTMLElement>('[data-cap-step]');
    const trackHeight = track.offsetHeight;
    if (!trackHeight || !cards.length) return;

    const tops = Array.from(cards).map((card) => {
      const center = card.offsetTop + card.offsetHeight / 2;
      return (center / trackHeight) * 100;
    });
    setMarkerTops(tops);
  }, []);

  const updateScrollProgress = useCallback(() => {
    const col = cardsColRef.current;
    if (!col) return;
    const rect = col.getBoundingClientRect();
    const scrollable = col.offsetHeight - window.innerHeight + STICKY_TOP;
    if (scrollable <= 0) {
      setFillProgress(rect.top <= STICKY_TOP ? 1 : 0);
      return;
    }
    const scrolled = -rect.top + STICKY_TOP;
    setFillProgress(Math.min(1, Math.max(0, scrolled / scrollable)));
  }, []);

  /* IntersectionObserver → set active step */
  useEffect(() => {
    const cards = document.querySelectorAll<HTMLElement>('[data-cap-step]');
    if (!cards.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const idx = Number(entry.target.getAttribute('data-cap-step'));
          if (!Number.isNaN(idx)) setActiveStep(idx);
        });
      },
      { threshold: 0.52, rootMargin: '-42% 0px -42% 0px' },
    );

    cards.forEach((card) => observer.observe(card));
    return () => observer.disconnect();
  }, []);

  /* Scroll + resize listeners */
  useEffect(() => {
    const onScroll = () => updateScrollProgress();
    const onResize = () => {
      updateMarkerPositions();
      updateScrollProgress();
    };

    onResize();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onResize);

    const track = cardsTrackRef.current;
    const ro = track && typeof ResizeObserver !== 'undefined' ? new ResizeObserver(onResize) : null;
    if (track && ro) ro.observe(track);

    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onResize);
      ro?.disconnect();
    };
  }, [updateMarkerPositions, updateScrollProgress]);

  return (
    <>
      {/* ─── All CSS embedded inside component ─── */}
      <style jsx global>{`
        /* ============================
           CAP JOURNEY SECTION
           ============================ */
        .cap-journey {
          --cap-accent: #f97316;
          --cap-accent-dark: #ea580c;
          --cap-accent-glow: rgba(249, 115, 22, 0.22);
          --cap-ink: #181229;
          --cap-ink-muted: #64748b;
          --cap-surface: #fffbf4;
          --cap-border: rgba(0, 0, 0, 0.06);
          --cap-ease: cubic-bezier(0.22, 1, 0.36, 1);

          position: relative;
          padding: clamp(56px, 8vw, 96px) clamp(20px, 4vw, 40px);
          background: var(--cap-surface);
          overflow: visible;
        }

        /* ── Background effects ── */
        .cap-journey-bg {
          position: absolute;
          inset: 0;
          pointer-events: none;
          z-index: 0;
          background:
            radial-gradient(ellipse 70% 45% at 50% 0%, rgba(255, 255, 255, 0.95), transparent 65%),
            radial-gradient(ellipse 40% 30% at 8% 85%, rgba(15, 23, 42, 0.03), transparent 55%);
        }

        .cap-journey-orb {
          position: absolute;
          border-radius: 999px;
          pointer-events: none;
          filter: blur(60px);
          z-index: 0;
          will-change: transform;
        }

        .cap-journey-orb--left {
          width: 320px;
          height: 320px;
          top: 12%;
          left: -80px;
          background: rgba(249, 115, 22, 0.14);
          animation: capOrbFloat 12s ease-in-out infinite;
        }

        .cap-journey-orb--right {
          width: 280px;
          height: 280px;
          bottom: 18%;
          right: -60px;
          background: rgba(33, 69, 251, 0.1);
          animation: capOrbFloat 14s ease-in-out infinite reverse;
        }

        @keyframes capOrbFloat {
          0%, 100% { transform: translate3d(0, 0, 0) scale(1); }
          33% { transform: translate3d(20px, -30px, 0) scale(1.08); }
          66% { transform: translate3d(-14px, 18px, 0) scale(0.95); }
        }

        /* ── Grid lines overlay ── */
        .cap-journey-grid {
          position: absolute;
          inset: 0;
          z-index: 0;
          pointer-events: none;
          opacity: 0.35;
          background-image:
            linear-gradient(rgba(15, 23, 42, 0.04) 1px, transparent 1px),
            linear-gradient(90deg, rgba(15, 23, 42, 0.04) 1px, transparent 1px);
          background-size: 48px 48px;
          mask-image: radial-gradient(ellipse 60% 50% at 50% 30%, #000 0%, transparent 70%);
          -webkit-mask-image: radial-gradient(ellipse 60% 50% at 50% 30%, #000 0%, transparent 70%);
        }

        /* ── Shimmer sweep across section ── */
        .cap-journey-shimmer {
          position: absolute;
          top: -30%;
          bottom: -30%;
          left: -45%;
          z-index: 0;
          width: 30%;
          transform: skewX(-18deg);
          background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.6), transparent);
          animation: capShimmerSweep 8s ease-in-out infinite;
          pointer-events: none;
        }

        @keyframes capShimmerSweep {
          0% { transform: translateX(-160%) skewX(-18deg); opacity: 0; }
          15% { opacity: 0.85; }
          45%, 100% { transform: translateX(450%) skewX(-18deg); opacity: 0; }
        }

        /* ── Layout wrapper ── */
        .cap-journey-wrap {
          position: relative;
          z-index: 1;
          max-width: 1180px;
          margin: 0 auto;
        }

        /* ── Header ── */
        .cap-journey-header {
          text-align: center;
          margin-bottom: clamp(36px, 5vw, 52px);
        }

        .cap-journey-kicker {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          font-size: 12px;
          font-weight: 700;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: var(--cap-accent);
          margin: 0 0 12px;
        }

        .cap-journey-kicker::before {
          content: '';
          width: 20px;
          height: 3px;
          border-radius: 999px;
          background: var(--cap-accent);
        }

        .cap-journey-title {
          font-family: Inter, var(--font), sans-serif !important;
          font-size: clamp(1.85rem, 3.4vw, 2.65rem) !important;
          font-weight: 700 !important;
          letter-spacing: -0.03em !important;
          line-height: 1.12 !important;
          color: var(--cap-ink) !important;
          margin: 0 0 14px !important;
        }

        .cap-journey-title span {
          background: linear-gradient(135deg, var(--cap-accent), var(--cap-accent-dark));
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .cap-journey-sub {
          font-size: clamp(15px, 1.35vw, 17px);
          line-height: 1.65;
          color: var(--cap-ink-muted);
          max-width: 620px;
          margin: 0 auto;
        }

        /* ── Scroll layout ── */
        .cap-journey-scroll-layout {
          display: grid;
          grid-template-columns: 48px minmax(0, 1fr);
          gap: clamp(20px, 3vw, 36px);
          align-items: stretch;
        }

        /* ── Rail column ── */
        .cap-journey-rail-col {
          position: relative;
          min-height: 100%;
        }

        .cap-journey-rail {
          position: absolute;
          inset: 0;
          display: flex;
          justify-content: center;
        }

        .cap-journey-rail-track {
          position: relative;
          width: 3px;
          height: 100%;
          background: linear-gradient(180deg, #e2e8f0, #f1f5f9);
          border-radius: 999px;
          overflow: hidden;
        }

        .cap-journey-rail-fill {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          width: 100%;
          background: linear-gradient(180deg, var(--cap-accent), var(--cap-accent-dark));
          border-radius: 999px;
          transition: height 0.12s linear;
          will-change: height;
          box-shadow: 0 0 12px var(--cap-accent-glow);
        }

        .cap-journey-rail-markers {
          position: absolute;
          inset: 0;
          left: 50%;
          transform: translateX(-50%);
          width: 14px;
          pointer-events: none;
        }

        .cap-journey-rail-marker {
          position: absolute;
          left: 50%;
          width: 10px;
          height: 10px;
          margin: -5px 0 0 -5px;
          border-radius: 999px;
          background: #fff;
          border: 2.5px solid #e2e8f0;
          transition: border-color 0.3s ease, background 0.3s ease, transform 0.3s ease, box-shadow 0.3s ease;
        }

        .cap-journey-rail-marker.is-lit {
          border-color: var(--cap-accent);
          background: #fff7ed;
        }

        .cap-journey-rail-marker.is-active {
          border-color: var(--cap-accent);
          background: var(--cap-accent);
          transform: scale(1.35);
          box-shadow: 0 0 0 4px var(--cap-accent-glow), 0 0 16px var(--cap-accent-glow);
        }

        /* ── Cards column ── */
        .cap-journey-cards-col {
          min-width: 0;
        }

        .cap-journey-track {
          position: relative;
          display: flex;
          flex-direction: column;
          gap: 0;
          padding-bottom: min(36vh, 280px);
        }

        /* ── Individual card ── */
        .cap-journey-card {
          position: sticky;
          top: clamp(88px, 12vh, 112px);
          margin-bottom: clamp(18px, 3vw, 28px);
          border-radius: clamp(24px, 3vw, 36px);
          background: linear-gradient(165deg, #ffffff 0%, #fffbf4 100%);
          border: 1px solid var(--cap-border);
          box-shadow:
            0 12px 40px rgba(249, 115, 22, 0.08),
            0 2px 8px rgba(0, 0, 0, 0.04);
          transition:
            transform 0.45s var(--cap-ease),
            box-shadow 0.45s ease,
            opacity 0.45s ease,
            border-color 0.45s ease;
          overflow: hidden;
        }

        /* Card glow line at top */
        .cap-journey-card::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 3px;
          background: linear-gradient(90deg, var(--cap-accent), #fb923c, var(--cap-accent-dark));
          opacity: 0;
          transition: opacity 0.4s ease;
          z-index: 2;
        }

        /* Card shimmer on hover */
        .cap-journey-card::after {
          content: '';
          position: absolute;
          top: -50%;
          bottom: -50%;
          left: -45%;
          width: 28%;
          transform: skewX(-18deg) translateX(-160%);
          background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.55), transparent);
          pointer-events: none;
          z-index: 1;
          transition: transform 0.7s ease;
        }

        .cap-journey-card:hover::after {
          transform: skewX(-18deg) translateX(500%);
        }

        .cap-journey-card:not(.is-active) {
          opacity: 0.88;
          transform: scale(0.985) translateY(4px);
          border-color: rgba(0, 0, 0, 0.04);
        }

        .cap-journey-card.is-active {
          opacity: 1;
          transform: scale(1) translateY(0);
          border-color: rgba(249, 115, 22, 0.15);
          box-shadow:
            0 18px 52px rgba(249, 115, 22, 0.12),
            0 4px 14px rgba(0, 0, 0, 0.06);
        }

        .cap-journey-card.is-active::before {
          opacity: 1;
        }

        /* ── Card inner layout ── */
        .cap-journey-card-inner {
          display: grid;
          grid-template-columns: minmax(0, 1fr) minmax(160px, 220px) minmax(0, 1fr);
          gap: clamp(20px, 3vw, 40px);
          align-items: stretch;
          min-height: clamp(220px, 24vw, 280px);
          padding: clamp(28px, 3.5vw, 44px) clamp(24px, 3vw, 40px);
          position: relative;
          z-index: 2;
        }

        /* ── Card left ── */
        .cap-journey-card-left {
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          align-items: flex-start;
          min-height: 100%;
        }

        .cap-journey-card-badge {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          padding: 7px 16px;
          border-radius: 999px;
          border: 1.5px solid #334155;
          font-size: 13px;
          font-weight: 600;
          letter-spacing: 0.02em;
          color: #334155;
          background: transparent;
          line-height: 1;
          transition: border-color 0.3s ease, color 0.3s ease, background 0.3s ease;
        }

        .cap-journey-card.is-active .cap-journey-card-badge {
          border-color: var(--cap-accent);
          color: var(--cap-accent);
          background: #fff7ed;
        }

        .cap-journey-card-title {
          font-family: Inter, var(--font), sans-serif !important;
          font-size: clamp(1.75rem, 3vw, 2.5rem) !important;
          font-weight: 700 !important;
          letter-spacing: -0.03em !important;
          line-height: 1.08 !important;
          color: var(--cap-ink) !important;
          margin: 0 !important;
          max-width: 14ch;
        }

        /* ── Card media ── */
        .cap-journey-card-media {
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 8px 0;
        }

        .cap-journey-card-img {
          display: block;
          width: min(100%, 220px);
          aspect-ratio: 4 / 3;
          object-fit: cover;
          border-radius: 16px;
          transform: rotate(-7deg);
          box-shadow:
            0 14px 40px rgba(15, 23, 42, 0.14),
            0 4px 12px rgba(15, 23, 42, 0.08);
          transition: transform 0.45s var(--cap-ease), box-shadow 0.45s ease;
        }

        .cap-journey-card.is-active .cap-journey-card-img {
          transform: rotate(-4deg) scale(1.03);
          box-shadow:
            0 20px 48px rgba(15, 23, 42, 0.18),
            0 6px 16px rgba(15, 23, 42, 0.1);
        }

        /* ── Card right ── */
        .cap-journey-card-right {
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: flex-start;
          gap: clamp(16px, 2vw, 22px);
          max-width: 320px;
          margin-left: auto;
        }

        .cap-journey-card-body {
          font-size: clamp(14px, 1.2vw, 15px);
          line-height: 1.65;
          color: var(--cap-ink-muted);
          margin: 0;
        }

        .cap-journey-card-link {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          font-size: 15px;
          font-weight: 600;
          color: #2563eb !important;
          text-decoration: none;
          transition: gap 0.2s ease, color 0.2s ease;
        }

        .cap-journey-card-link:hover {
          color: #1d4ed8 !important;
          gap: 11px;
        }

        /* ── Progress label ── */
        .cap-journey-progress-label {
          position: absolute;
          bottom: clamp(16px, 3vw, 28px);
          right: clamp(24px, 3vw, 40px);
          z-index: 3;
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 8px 14px;
          border-radius: 999px;
          background: rgba(255, 255, 255, 0.82);
          border: 1px solid rgba(226, 232, 240, 0.9);
          box-shadow: 0 8px 24px rgba(0, 0, 0, 0.06);
          backdrop-filter: blur(10px);
          -webkit-backdrop-filter: blur(10px);
          font-size: 12px;
          font-weight: 700;
          color: #475569;
          pointer-events: none;
        }

        .cap-journey-progress-label strong {
          color: var(--cap-accent);
          font-weight: 900;
        }

        /* ========================================
           FLOATING CTA — Solidroad-style
           ======================================== */
        .cap-floating-cta {
          position: fixed;
          left: 0;
          right: 0;
          bottom: 0;
          z-index: 8995;
          display: flex;
          justify-content: center;
          align-items: flex-end;
          pointer-events: none;
          padding: 0 16px calc(2px + env(safe-area-inset-bottom, 0px));
          background: transparent;
        }

        .cap-floating-cta::after {
          content: '';
          position: absolute;
          left: 0;
          right: 0;
          bottom: 0;
          height: 14px;
          background: #ffffff;
          border-top: 1px solid rgba(15, 23, 42, 0.08);
          box-shadow: 0 -8px 28px rgba(15, 23, 42, 0.08);
          pointer-events: none;
          z-index: 0;
        }

        .cap-floating-cta-float {
          pointer-events: auto;
          position: relative;
          z-index: 1;
        }

        .cap-floating-cta-btn {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          padding: 15px 26px 15px 24px;
          border-radius: 999px;
          background: linear-gradient(135deg, #fb923c 0%, #f97316 45%, #ea580c 100%);
          color: #fff !important;
          text-decoration: none;
          font-size: 15px;
          font-weight: 700;
          line-height: 1;
          white-space: nowrap;
          border: 1px solid rgba(255, 255, 255, 0.35);
          box-shadow:
            0 4px 14px rgba(234, 88, 12, 0.35),
            0 14px 40px rgba(234, 88, 12, 0.28),
            inset 0 1px 0 rgba(255, 255, 255, 0.25);
          transition: transform 0.25s var(--cap-ease), box-shadow 0.25s ease;
        }

        .cap-floating-cta-btn:hover {
          transform: translateY(-2px);
          box-shadow:
            0 6px 18px rgba(234, 88, 12, 0.4),
            0 18px 48px rgba(234, 88, 12, 0.32),
            inset 0 1px 0 rgba(255, 255, 255, 0.3);
        }

        .cap-floating-cta-btn:active {
          transform: translateY(0);
        }

        /* ========================================
           RESPONSIVE
           ======================================== */
        @media (max-width: 768px) {
          .cap-journey-scroll-layout {
            grid-template-columns: 1fr;
            gap: 0;
          }

          .cap-journey-rail-col {
            display: none;
          }

          .cap-journey-card-inner {
            grid-template-columns: 1fr;
            grid-template-rows: auto auto auto;
            min-height: 0;
            gap: 20px;
            padding: 24px 20px 28px;
          }

          .cap-journey-card-left {
            flex-direction: row;
            flex-wrap: wrap;
            justify-content: space-between;
            align-items: center;
            gap: 12px;
            min-height: 0;
          }

          .cap-journey-card-title {
            width: 100%;
            max-width: none;
            font-size: clamp(1.5rem, 6vw, 1.85rem) !important;
          }

          .cap-journey-card-media {
            padding: 4px 0 8px;
          }

          .cap-journey-card-img {
            width: min(72vw, 260px);
            transform: rotate(-5deg);
          }

          .cap-journey-card.is-active .cap-journey-card-img {
            transform: rotate(-3deg) scale(1.02);
          }

          .cap-journey-card-right {
            max-width: none;
            margin-left: 0;
          }

          .cap-journey-track {
            padding-bottom: 24vh;
          }

          .cap-journey-progress-label {
            right: 20px;
            bottom: 16px;
            font-size: 11px;
            padding: 6px 12px;
          }

          .cap-floating-cta {
            bottom: 0;
            padding: 0 16px calc(2px + env(safe-area-inset-bottom, 0px));
          }

          .cap-floating-cta::after {
            height: 12px;
          }

          .cap-floating-cta-btn {
            padding: 9px 16px;
            font-size: 13px;
            gap: 4px;
          }

          .cap-floating-cta-btn svg {
            width: 13px;
            height: 13px;
            flex-shrink: 0;
          }
        }

        @media (max-width: 480px) {
          .cap-journey-card {
            top: 78px;
            border-radius: 20px;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .cap-journey-orb,
          .cap-journey-shimmer {
            animation: none !important;
          }

          .cap-floating-cta-float {
            animation: none !important;
          }

          .cap-journey-card,
          .cap-journey-card-img,
          .cap-journey-rail-fill,
          .cap-journey-card-badge,
          .cap-journey-rail-marker {
            transition: none !important;
          }
        }
      `}</style>

      {/* ─── Floating CTA ─── */}
      <CapFloatingCta />

      {/* ─── Section ─── */}
      <section
        className="cap-journey"
        id={CAP_JOURNEY_SECTION_ID}
        aria-labelledby="cap-journey-title"
      >
        {/* Background layers */}
        <div className="cap-journey-bg" aria-hidden />
        <div className="cap-journey-grid" aria-hidden />
        <div className="cap-journey-shimmer" aria-hidden />
        <span className="cap-journey-orb cap-journey-orb--left" aria-hidden />
        <span className="cap-journey-orb cap-journey-orb--right" aria-hidden />

        <div className="cap-journey-wrap">
          {/* ── Header ── */}
          <FadeUp className="cap-journey-header">
            <p className="cap-journey-kicker">{kicker}</p>
            <h2 id="cap-journey-title" className="cap-journey-title">
              {title}
            </h2>
            <p className="cap-journey-sub">{subtitle}</p>
          </FadeUp>

          {/* ── Scroll layout ── */}
          <div className="cap-journey-scroll-layout">
            {/* Rail column */}
            <div className="cap-journey-rail-col" aria-hidden>
              <div className="cap-journey-rail">
                <div className="cap-journey-rail-track">
                  <div
                    className="cap-journey-rail-fill"
                    style={{ height: `${fillProgress * 100}%` }}
                  />
                </div>

                <div className="cap-journey-rail-markers">
                  {DEFAULT_STEPS.map((step, index) => {
                    const top = markerTops[index] ?? (index / (DEFAULT_STEPS.length - 1)) * 100;
                    const isLit = fillProgress >= top / 100 - 0.02 || activeStep >= index;

                    return (
                      <span
                        key={step.id}
                        className={`cap-journey-rail-marker${isLit ? ' is-lit' : ''}${activeStep === index ? ' is-active' : ''}`}
                        style={{ top: `${top}%` }}
                      />
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Cards column */}
            <div ref={cardsColRef} className="cap-journey-cards-col">
              <div ref={cardsTrackRef} className="cap-journey-track">
                {DEFAULT_STEPS.map((step, index) => (
                  <article
                    key={step.id}
                    data-cap-step={index}
                    className={`cap-journey-card${activeStep === index ? ' is-active' : ''}`}
                    style={{ zIndex: DEFAULT_STEPS.length - index + 1 }}
                  >
                    <div className="cap-journey-card-inner">
                      <div className="cap-journey-card-left">
                        <span className="cap-journey-card-badge">
                          {String(index + 1).padStart(3, '0')}
                        </span>
                        <h3 className="cap-journey-card-title">{step.title}</h3>
                      </div>

                      <div className="cap-journey-card-media">
                        <img
                          src={step.image}
                          alt=""
                          className="cap-journey-card-img"
                          loading={index < 2 ? 'eager' : 'lazy'}
                        />
                      </div>

                      <div className="cap-journey-card-right">
                        <p className="cap-journey-card-body">{step.body}</p>
                        <Link href={step.href} className="cap-journey-card-link">
                          Read More
                          <ArrowRight size={16} strokeWidth={2.25} aria-hidden />
                        </Link>
                      </div>
                    </div>

                    {/* Progress badge on active card */}
                    {activeStep === index && (
                      <div className="cap-journey-progress-label">
                        <strong>{index + 1}</strong>
                        <span>/ {DEFAULT_STEPS.length}</span>
                      </div>
                    )}
                  </article>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}