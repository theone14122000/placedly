'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { FadeUp } from './motion';
import { motion, AnimatePresence } from 'framer-motion';

type Cms = Record<string, string>;

type JourneyStep = {
  id: string;
  title: string;
  body: string;
  image: string;
  href: string;
};

const DEFAULT_STEPS: JourneyStep[] = [
  {
    id: 'resume',
    title: 'Resume Rebuild',
    body: 'ATS-friendly resume with achievement-based bullets, domain keywords, and a narrative that positions you for MNC roles — ready in 48 hours.',
    image: '/img/hero%20feature%20img.png',
    href: '/cap',
  },
  {
    id: 'linkedin',
    title: 'LinkedIn Overhaul',
    body: 'Headline, summary, and experience aligned to the roles you want — so recruiters and hiring managers see a consistent, credible profile.',
    image: '/img/hero%20feature%20img%202.png',
    href: '/cap',
  },
  {
    id: 'mock',
    title: 'Mock Interview Sprint',
    body: 'Three live coaching rounds — HR, technical/domain, and a full mock with salary negotiation scripting before you ever enter the real room.',
    image: '/img/team.png',
    href: '/cap',
  },
  {
    id: 'referral',
    title: 'Warm Referrals',
    body: 'Your profile goes directly to hiring managers at 10–15 target companies — with a warm introduction from Placedly, not a mass blast.',
    image: '/img/career%20fair.png',
    href: '/cap',
  },
  {
    id: 'offer',
    title: 'Offer Letter',
    body: 'When your offer arrives, the journey completes — and only then does our 12% Career Assistance Fee apply. Zero upfront, zero risk.',
    image: '/img/placed.jpg',
    href: '/cap/apply',
  },
  {
    id: 'launch',
    title: 'Career Launch',
    body: 'Post-offer onboarding prep, salary negotiation support, and first-90-days check-ins so your new role starts strong.',
    image: '/img/hero%20feaure%20img%203.png',
    href: '/cap',
  },
];

const STICKY_TOP = 112;
const SECTION_ID = 'cap-journey-section';

export default function CapJourneySection({ cms = {} }: { cms?: Cms }) {
  const [activeStep, setActiveStep] = useState(0);
  const [fillProgress, setFillProgress] = useState(0);
  const [markerTops, setMarkerTops] = useState<number[]>([]);
  const [showFloatingCta, setShowFloatingCta] = useState(false);

  const cardsColRef = useRef<HTMLDivElement>(null);
  const cardsTrackRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);

  const kicker = cms['hp:capJourneyKicker'] ?? 'Career Assistance Programme';
  const title = cms['hp:capJourneyTitle'] ?? 'Your CAP Journey — From Resume to Offer';
  const subtitle = cms['hp:capJourneySubtitle'] ?? 'Scroll through each stage of the programme. Every step is advisor-led, transparent, and built to get you placed — not just applied.';

  /* ====================== SCROLL & MARKER LOGIC ====================== */
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
    const scrolled = -rect.top + STICKY_TOP;
    setFillProgress(Math.min(1, Math.max(0, scrolled / scrollable)));
  }, []);

  /* ====================== INTERSECTION OBSERVER FOR CARDS ====================== */
  useEffect(() => {
    const cards = document.querySelectorAll<HTMLElement>('[data-cap-step]');
    if (!cards.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const idx = Number(entry.target.getAttribute('data-cap-step'));
            if (!Number.isNaN(idx)) setActiveStep(idx);
          }
        });
      },
      { threshold: 0.52, rootMargin: '-42% 0px -42% 0px' }
    );

    cards.forEach((card) => observer.observe(card));
    return () => observer.disconnect();
  }, []);

  /* ====================== SCROLL & RESIZE ====================== */
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
    const resizeObserver = track
      ? new ResizeObserver(onResize)
      : null;
    if (track && resizeObserver) resizeObserver.observe(track);

    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onResize);
      resizeObserver?.disconnect();
    };
  }, [updateMarkerPositions, updateScrollProgress]);

  /* ====================== FLOATING CTA VISIBILITY ====================== */
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const observer = new IntersectionObserver(
      ([entry]) => setShowFloatingCta(entry.isIntersecting),
      { threshold: 0.08 }
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      id={SECTION_ID}
      className="placedly-cap-journey"
      aria-labelledby="cap-journey-title"
    >
      {/* ==================== ALL STYLES INSIDE COMPONENT ==================== */}
      <style jsx global>{`
        .placedly-cap-journey {
          position: relative;
          padding: var(--placedly-section-pad, clamp(56px, 8vw, 96px)) clamp(20px, 4vw, 40px);
          background: #FFFBF4;
          overflow: visible;
        }
        .placedly-cap-journey-bg {
          position: absolute;
          inset: 0;
          pointer-events: none;
          background: radial-gradient(ellipse 70% 45% at 50% 0%, rgba(255,255,255,0.95), transparent 65%),
                      radial-gradient(ellipse 40% 30% at 8% 85%, rgba(15,23,42,0.03), transparent 55%);
          opacity: 1;
        }
        .placedly-cap-journey-wrap { position: relative; z-index: 1; max-width: 1180px; margin: 0 auto; }
        .placedly-cap-journey-header { text-align: center; margin-bottom: clamp(36px, 5vw, 52px); }
        .placedly-cap-journey-kicker {
          font-size: 12px; font-weight: 600; letter-spacing: 0.1em;
          text-transform: uppercase; color: #94a3b8; margin: 0 0 12px;
        }
        .placedly-cap-journey-title {
          font-family: Inter, var(--font), sans-serif !important;
          font-size: clamp(1.85rem, 3.4vw, 2.65rem) !important;
          font-weight: 600 !important;
          letter-spacing: -0.03em !important;
          line-height: 1.12 !important;
          color: #181229 !important;
          margin: 0 0 14px !important;
        }
        .placedly-cap-journey-sub {
          font-size: clamp(15px, 1.35vw, 17px);
          line-height: 1.65; color: #64748b;
          max-width: 620px; margin: 0 auto;
        }

        /* Scroll Layout */
        .placedly-cap-journey-scroll-layout {
          display: grid;
          grid-template-columns: 48px minmax(0, 1fr);
          gap: clamp(20px, 3vw, 36px);
          align-items: stretch;
        }
        .placedly-cap-journey-rail-col { position: relative; min-height: 100%; }
        .placedly-cap-journey-rail {
          position: absolute; inset: 0; display: flex; justify-content: center;
        }
        .placedly-cap-journey-rail-track {
          position: relative; width: 2px; height: 100%;
          background: #e2e8f0; border-radius: 999px; overflow: hidden;
        }
        .placedly-cap-journey-rail-fill {
          position: absolute; top: 0; left: 0; right: 0;
          width: 100%; background: linear-gradient(#181229, #f97316);
          border-radius: 999px; transition: height .12s linear;
          will-change: height;
          box-shadow: 0 0 12px rgba(249, 115, 22, 0.4);
        }
        .placedly-cap-journey-rail-markers {
          position: absolute; inset: 0; left: 50%; transform: translateX(-50%);
          width: 10px; pointer-events: none;
        }
        .placedly-cap-journey-rail-marker {
          position: absolute; left: 50%; width: 10px; height: 10px;
          margin: -5px 0 0 -5px; border-radius: 999px;
          background: #fff; border: 2.5px solid #e2e8f0;
          transition: all 0.3s cubic-bezier(0.23, 1, 0.32, 1);
        }
        .placedly-cap-journey-rail-marker.is-lit {
          border-color: #f97316; background: #fff7ed; transform: scale(1.2);
        }
        .placedly-cap-journey-rail-marker.is-active {
          border-color: #181229; background: #181229; transform: scale(1.4);
        }

        /* Cards with Overlapping Effect */
        .placedly-cap-journey-track {
          position: relative;
          display: flex;
          flex-direction: column;
          gap: 0;
          padding-bottom: min(36vh, 280px);
        }
        .placedly-cap-journey-card {
          position: sticky;
          top: clamp(88px, 12vh, 112px);
          margin-bottom: clamp(18px, 3vw, 28px);
          border-radius: clamp(24px, 3vw, 36px);
          background: #FFFBF4;
          border: 1px solid rgba(0,0,0,0.06);
          box-shadow: 0 12px 40px rgba(249,115,22,0.12);
          transition: all 0.45s cubic-bezier(0.23, 1, 0.32, 1);
          overflow: hidden;
        }
        .placedly-cap-journey-card:not(.is-active) {
          opacity: 0.85;
          transform: scale(0.96) translateY(20px);
          z-index: 1;
        }
        .placedly-cap-journey-card.is-active {
          opacity: 1;
          transform: scale(1) translateY(0);
          box-shadow: 0 24px 60px -10px rgba(249,115,22,0.25);
          z-index: 10;
        }

        /* Overlapping depth on hover */
        .placedly-cap-journey-card:hover {
          transform: scale(1.02) translateY(-8px) rotate(0.5deg);
          box-shadow: 0 30px 70px -12px rgba(249,115,22,0.3);
        }

        .placedly-cap-journey-card-inner {
          display: grid;
          grid-template-columns: minmax(0,1fr) minmax(160px,220px) minmax(0,1fr);
          gap: clamp(20px, 3vw, 40px);
          align-items: stretch;
          min-height: clamp(220px, 24vw, 280px);
          padding: clamp(28px, 3.5vw, 44px) clamp(24px, 3vw, 40px);
        }
        .placedly-cap-journey-card-left { display: flex; flex-direction: column; justify-content: space-between; align-items: flex-start; }
        .placedly-cap-journey-card-badge {
          display: inline-flex; align-items: center; justify-content: center;
          padding: 7px 16px; border-radius: 999px; border: 1px solid #334155;
          font-size: 13px; font-weight: 500; letter-spacing: 0.02em;
          color: #334155; background: transparent;
        }
        .placedly-cap-journey-card-title {
          font-family: Inter, var(--font), sans-serif !important;
          font-size: clamp(1.75rem, 3vw, 2.5rem) !important;
          font-weight: 700 !important;
          letter-spacing: -0.03em !important;
          line-height: 1.08 !important;
          color: #0f172a !important;
          max-width: 14ch;
        }
        .placedly-cap-journey-card-media { display: flex; align-items: center; justify-content: center; padding: 8px 0; }
        .placedly-cap-journey-card-img {
          display: block; width: min(100%, 220px); aspect-ratio: 4/3;
          object-fit: cover; border-radius: 16px;
          transform: rotate(-7deg);
          box-shadow: 0 14px 40px rgba(15,23,42,0.14), 0 4px 12px rgba(15,23,42,0.08);
          transition: transform 0.4s ease;
        }
        .placedly-cap-journey-card.is-active .placedly-cap-journey-card-img {
          transform: rotate(-3deg);
        }
        .placedly-cap-journey-card-right {
          display: flex; flex-direction: column; justify-content: center;
          align-items: flex-start; gap: clamp(16px, 2vw, 22px);
          max-width: 320px; margin-left: auto;
        }
        .placedly-cap-journey-card-body {
          font-size: clamp(14px, 1.2vw, 15px); line-height: 1.65; color: #64748b; margin: 0;
        }
        .placedly-cap-journey-card-link {
          display: inline-flex; align-items: center; gap: 8px;
          font-size: 15px; font-weight: 600; color: #2563eb !important;
          text-decoration: none; transition: gap .2s ease, color .2s ease;
        }
        .placedly-cap-journey-card-link:hover {
          color: #1d4ed8 !important; gap: 12px;
        }

        /* Floating CTA - Solidroad style with gentle float */
        .placedly-cap-floating-cta {
          position: fixed;
          left: 0; right: 0; bottom: 0;
          z-index: 8995;
          display: flex; justify-content: center; align-items: flex-end;
          pointer-events: none;
          padding: 0 16px calc(12px + env(safe-area-inset-bottom, 0px));
        }
        .placedly-cap-floating-cta::after {
          content: '';
          position: absolute; left: 0; right: 0; bottom: 0;
          height: 14px;
          background: #FFFBF4;
          border-top: 1px solid rgba(15,23,42,0.08);
          box-shadow: 0 -8px 28px rgba(15,23,42,0.08);
          z-index: -1;
        }
        .placedly-cap-floating-cta-float {
          pointer-events: auto; position: relative; z-index: 2;
          animation: float-bob 3.2s ease-in-out infinite;
        }
        .placedly-cap-floating-cta-btn {
          display: inline-flex; align-items: center; justify-content: center; gap: 10px;
          padding: 15px 28px;
          border-radius: 999px;
          background: linear-gradient(135deg, #fb923c 0%, #f97316 45%, #ea580c 100%);
          color: #fff !important; text-decoration: none;
          font-size: 15px; font-weight: 700; white-space: nowrap;
          border: 1px solid rgba(255,255,255,0.35);
          box-shadow: 0 10px 30px rgba(234,88,12,0.35),
                      0 20px 50px rgba(234,88,12,0.25),
                      inset 0 1px 0 rgba(255,255,255,0.3);
          transition: transform 0.25s cubic-bezier(0.23,1,0.32,1), box-shadow 0.25s ease;
        }
        .placedly-cap-floating-cta-btn:hover {
          transform: translateY(-4px) scale(1.03);
          box-shadow: 0 15px 40px rgba(234,88,12,0.45),
                      0 25px 60px rgba(234,88,12,0.35);
        }

        @keyframes float-bob {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-9px); }
        }

        @media (max-width: 768px) {
          .placedly-cap-journey-scroll-layout { grid-template-columns: 1fr; gap: 0; }
          .placedly-cap-journey-rail-col { display: none; }
          .placedly-cap-journey-card-inner {
            grid-template-columns: 1fr;
            grid-template-rows: auto auto auto;
            min-height: 0; gap: 20px;
            padding: 24px 20px 28px;
          }
          .placedly-cap-journey-card-title { width: 100%; max-width: none; }
          .placedly-cap-journey-card-img { width: min(72vw, 260px); transform: rotate(-4deg); }
          .placedly-cap-journey-track { padding-bottom: 24vh; }
          .placedly-cap-floating-cta-btn { padding: 12px 20px; font-size: 14px; }
        }

        @media (prefers-reduced-motion: reduce) {
          .placedly-cap-floating-cta-float { animation: none !important; }
          .placedly-cap-journey-card { transition: none !important; }
        }
      `}</style>

      <div className="placedly-cap-journey-bg" aria-hidden />

      <div className="placedly-cap-journey-wrap">
        <FadeUp className="placedly-cap-journey-header">
          <p className="placedly-cap-journey-kicker">{kicker}</p>
          <h2 id="cap-journey-title" className="placedly-cap-journey-title">
            {title}
          </h2>
          <p className="placedly-cap-journey-sub">{subtitle}</p>
        </FadeUp>

        <div className="placedly-cap-journey-scroll-layout">
          {/* Progress Rail */}
          <div className="placedly-cap-journey-rail-col" aria-hidden>
            <div className="placedly-cap-journey-rail">
              <div className="placedly-cap-journey-rail-track">
                <div
                  className="placedly-cap-journey-rail-fill"
                  style={{ height: `${fillProgress * 100}%` }}
                />
              </div>

              <div className="placedly-cap-journey-rail-markers">
                {DEFAULT_STEPS.map((step, index) => {
                  const top = markerTops[index] ?? (index / (DEFAULT_STEPS.length - 1)) * 100;
                  const isLit = fillProgress >= top / 100 - 0.02 || activeStep >= index;
                  return (
                    <span
                      key={step.id}
                      className={`placedly-cap-journey-rail-marker ${isLit ? 'is-lit' : ''} ${activeStep === index ? 'is-active' : ''}`}
                      style={{ top: `${top}%` }}
                    />
                  );
                })}
              </div>
            </div>
          </div>

          {/* Cards Column */}
          <div ref={cardsColRef} className="placedly-cap-journey-cards-col">
            <div ref={cardsTrackRef} className="placedly-cap-journey-track">
              {DEFAULT_STEPS.map((step, index) => (
                <article
                  key={step.id}
                  data-cap-step={index}
                  className={`placedly-cap-journey-card ${activeStep === index ? 'is-active' : ''}`}
                >
                  <div className="placedly-cap-journey-card-inner">
                    <div className="placedly-cap-journey-card-left">
                      <span className="placedly-cap-journey-card-badge">
                        {String(index + 1).padStart(3, '0')}
                      </span>
                      <h3 className="placedly-cap-journey-card-title">{step.title}</h3>
                    </div>

                    <div className="placedly-cap-journey-card-media">
                      <img
                        src={step.image}
                        alt={step.title}
                        className="placedly-cap-journey-card-img"
                        loading={index < 2 ? 'eager' : 'lazy'}
                      />
                    </div>

                    <div className="placedly-cap-journey-card-right">
                      <p className="placedly-cap-journey-card-body">{step.body}</p>
                      <Link href={step.href} className="placedly-cap-journey-card-link">
                        Read More <ArrowRight size={16} strokeWidth={2.5} />
                      </Link>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ====================== FLOATING CTA ====================== */}
      <AnimatePresence>
        {showFloatingCta && (
          <motion.div
            className="placedly-cap-floating-cta"
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 80 }}
            transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
          >
            <div className="placedly-cap-floating-cta-float">
              <Link href="/cap/apply" className="placedly-cap-floating-cta-btn">
                Start Your CAP Journey Now
                <ArrowRight size={18} />
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}