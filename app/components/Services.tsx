'use client';

import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import Link from 'next/link';
import {
  ArrowRight,
  CheckCircle2,
  GraduationCap,
  Briefcase,
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
  stats: { value: string; label: string }[];
  ctaLabel: string;
  ctaHref: string;
  accent: string;
  accentSoft: string;
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
      { value: '48h', label: 'Resume turnaround' },
      { value: '12%', label: 'Fee, only post-offer' },
      { value: '10–15', label: 'Warm referrals' },
    ],
    ctaLabel: 'Start My CAP Journey',
    ctaHref: '/cap',
    accent: '#f97316',
    accentSoft: 'rgba(249,115,22,0.12)',
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
      { value: '6', label: 'Study destinations' },
      { value: '95%', label: 'Visa success rate' },
      { value: '1:1', label: 'Dedicated advisor' },
    ],
    ctaLabel: 'Explore Study Abroad',
    ctaHref: '/study-abroad',
    accent: '#2563eb',
    accentSoft: 'rgba(37,99,235,0.12)',
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
      className="pv-video"
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
  const Icon = current.icon;

  const tagline = cms['hp:servicesTagline'] ?? 'What We Do';
  const title = cms['hp:servicesTitle'] ?? 'One Platform. Two Powerful Verticals.';
  const subtitle =
    cms['hp:servicesSubtitle'] ?? 'Both Designed Around Your Growth — Not Our Revenue.';

  return (
    <section className="pv-section" data-active={current.id} id="services">
      <style jsx>{`
        .pv-section {
          position: relative;
          padding: clamp(64px, 8vw, 104px) clamp(20px, 4vw, 40px);
          background: #fffbf4;
          overflow: hidden;
        }
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
          font-size: 12px;
          font-weight: 700;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: #94a3b8;
          margin: 0 0 12px;
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
          isolation: isolate;
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
          transition: transform 0.32s cubic-bezier(0.22, 1, 0.36, 1);
          transform: translateX(0);
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
          transition: color 0.25s ease;
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
        }
        .pv-copy-eyebrow-icon {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 20px;
          height: 20px;
          border-radius: 50%;
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

        .pv-stats {
          display: flex;
          gap: clamp(20px, 3vw, 32px);
          margin-bottom: 30px;
          padding-top: 22px;
          border-top: 1px solid rgba(15, 23, 42, 0.08);
          width: 100%;
        }
        .pv-stat strong {
          display: block;
          font-family: Inter, var(--font), sans-serif;
          font-size: clamp(1.35rem, 2.2vw, 1.7rem);
          font-weight: 800;
          letter-spacing: -0.02em;
          color: #0f172a;
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
          transition: transform 0.2s ease, box-shadow 0.2s ease, background 0.2s ease;
        }
        .pv-cta:hover {
          transform: translateY(-2px);
          box-shadow: 0 14px 34px rgba(0, 0, 0, 0.2);
        }
        .pv-cta-icon {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 26px;
          height: 26px;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.16);
        }

        /* ── Video card (right) ─────────────────────────── */
        .pv-media {
          position: relative;
          display: flex;
          justify-content: center;
        }
        .pv-media-card {
          position: relative;
          width: 100%;
          max-width: 460px;
          border-radius: 32px;
          padding: 14px;
          background: linear-gradient(145deg, #020617 0%, #0f172a 100%);
          border: 1px solid rgba(255, 255, 255, 0.14);
          box-shadow: 0 30px 70px -20px rgba(15, 23, 42, 0.4);
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
        }

        @media (max-width: 480px) {
          .pv-stats {
            gap: 18px;
          }
          .pv-headline {
            max-width: none;
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
      </div>

      <div className="pv-wrap">
        <FadeUp className="pv-header">
          <p className="pv-kicker">{tagline}</p>
          <h2 className="pv-title">{title}</h2>
          <p className="pv-sub">{subtitle}</p>
        </FadeUp>

        <div className="pv-tabs-wrap">
          <div
            className={`pv-tabs${active === 1 ? ' is-right' : ''}`}
            role="tablist"
            aria-label="Placedly verticals"
          >
            <span className="pv-tabs-indicator" aria-hidden />
            {VERTICALS.map((v, i) => (
              <button
                key={v.id}
                type="button"
                role="tab"
                aria-selected={active === i}
                className={`pv-tab${active === i ? ' is-active' : ''}`}
                onClick={() => setActive(i)}
              >
                {v.tabLabel}
              </button>
            ))}
          </div>
        </div>

        <div className="pv-grid">
          {/* ── Left: copy ── */}
          <AnimatePresence mode="wait">
            <motion.div
              key={current.id}
              className="pv-copy"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            >
              <span
                className="pv-copy-eyebrow"
                style={{ background: current.accentSoft, color: current.accent }}
              >
                <span
                  className="pv-copy-eyebrow-icon"
                  style={{ background: current.accent, color: '#fff' }}
                >
                  <Icon size={12} strokeWidth={2.5} />
                </span>
                {current.eyebrow}
              </span>

              <h3 className="pv-headline">{current.headline}</h3>
              <p className="pv-desc">{current.description}</p>

              <ul className="pv-bullets">
                {current.bullets.map((b) => (
                  <li key={b} className="pv-bullet">
                    <CheckCircle2 size={18} strokeWidth={2} color={current.accent} />
                    {b}
                  </li>
                ))}
              </ul>

              <div className="pv-stats">
                {current.stats.map((s) => (
                  <div key={s.label} className="pv-stat">
                    <strong style={{ color: current.accent }}>{s.value}</strong>
                    <span>{s.label}</span>
                  </div>
                ))}
              </div>

              <Link href={current.ctaHref} className="pv-cta">
                {current.ctaLabel}
                <span className="pv-cta-icon">
                  <ArrowRight size={14} strokeWidth={2.5} />
                </span>
              </Link>
            </motion.div>
          </AnimatePresence>

          {/* ── Right: video card ── */}
          <div className="pv-media">
            <div
              className="pv-media-badge"
              style={{ color: current.accent }}
            >
              <span
                className="pv-media-badge-dot"
                style={{ background: current.accent }}
              />
              Live walkthrough
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={current.id}
                className="pv-media-card"
                initial={{ opacity: 0, scale: 0.97, y: 12 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.97, y: -8 }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              >
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
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}