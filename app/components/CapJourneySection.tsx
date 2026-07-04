'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { FadeUp } from './motion';
import { CAP_JOURNEY_SECTION_ID } from './CapFloatingCta';

type Cms = Record<string, string>;

type JourneyStep = {
  id: string;
  title: string;
  body: string;
  image: string;
  href: string;
};

/* Modern geometric sans-serif stack */
const GEOM_FONT_STACK = `"Inter", "Manrope", "Geist", "Plus Jakarta Sans", -apple-system, BlinkMacSystemFont, "Segoe UI", system-ui, sans-serif`;

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

const STICKY_TOP = 112;

export default function CapJourneySection({ cms = {} }: { cms?: Cms }) {
  const [activeStep, setActiveStep] = useState(0);
  const [fillProgress, setFillProgress] = useState(0);
  const [markerTops, setMarkerTops] = useState<number[]>([]);

  const cardsColRef = useRef<HTMLDivElement>(null);
  const cardsTrackRef = useRef<HTMLDivElement>(null);

  const kicker = cms['hp:capJourneyKicker'] ?? 'Career Assistance Programme';
  const title =
    cms['hp:capJourneyTitle'] ?? 'Your CAP Journey — From Resume to Offer';
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

  useEffect(() => {
    const onScroll = () => {
      updateScrollProgress();
    };

    const onResize = () => {
      updateMarkerPositions();
      updateScrollProgress();
    };

    onResize();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onResize);

    const track = cardsTrackRef.current;
    const resizeObserver =
      track && typeof ResizeObserver !== 'undefined'
        ? new ResizeObserver(onResize)
        : null;
    if (track && resizeObserver) resizeObserver.observe(track);

    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onResize);
      resizeObserver?.disconnect();
    };
  }, [updateMarkerPositions, updateScrollProgress]);

  return (
    <section
      className="placedly-cap-journey"
      id={CAP_JOURNEY_SECTION_ID}
      aria-labelledby="cap-journey-title"
    >
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
                  const top =
                    markerTops[index] ??
                    (index / (DEFAULT_STEPS.length - 1)) * 100;
                  const isLit =
                    fillProgress >= top / 100 - 0.02 || activeStep >= index;

                  return (
                    <span
                      key={step.id}
                      className={`placedly-cap-journey-rail-marker${isLit ? ' is-lit' : ''}${activeStep === index ? ' is-active' : ''}`}
                      style={{ top: `${top}%` }}
                    />
                  );
                })}
              </div>
            </div>
          </div>

          <div ref={cardsColRef} className="placedly-cap-journey-cards-col">
            <div ref={cardsTrackRef} className="placedly-cap-journey-track">
              {DEFAULT_STEPS.map((step, index) => (
                <article
                  key={step.id}
                  data-cap-step={index}
                  className={`placedly-cap-journey-card${activeStep === index ? ' is-active' : ''}`}
                  style={{ zIndex: index + 1 }}
                >
                  <div className="placedly-cap-journey-card-inner">
                    <div className="placedly-cap-journey-card-left">
                      <span className="placedly-cap-journey-card-badge">
                        {String(index + 1).padStart(3, '0')}
                      </span>
                      <h3 className="placedly-cap-journey-card-title">
                        {step.title}
                      </h3>
                    </div>

                    <div className="placedly-cap-journey-card-media">
                      <img
                        src={step.image}
                        alt=""
                        className="placedly-cap-journey-card-img"
                        loading={index < 2 ? 'eager' : 'lazy'}
                      />
                    </div>

                    <div className="placedly-cap-journey-card-right">
                      <p className="placedly-cap-journey-card-body">{step.body}</p>
                      <Link
                        href={step.href}
                        className="placedly-cap-readmore"
                      >
                        <span className="placedly-cap-readmore-shine" aria-hidden />
                        <span className="placedly-cap-readmore-label">Read More</span>
                        <span className="placedly-cap-readmore-icon">
                          <ArrowRight size={15} strokeWidth={2.5} aria-hidden />
                        </span>
                      </Link>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </div>

      <style>{`
        /* ============================================================
           FONT — Modern Geometric Sans-Serif
           ============================================================ */
        .placedly-cap-journey {
          font-family: ${GEOM_FONT_STACK};
          font-feature-settings: "ss01", "cv11", "cv02";
          font-optical-sizing: auto;
          letter-spacing: -0.011em;
        }

        /* ============================================================
           SECTION
           ============================================================ */
        .placedly-cap-journey {
          position: relative;
          width: 100%;
          padding: 100px 24px;
          background: #f8fafc;
          overflow: hidden;
        }

        .placedly-cap-journey-bg {
          position: absolute;
          inset: 0;
          background:
            radial-gradient(60% 50% at 50% 0%, #eef2ff 0%, transparent 70%),
            #f8fafc;
          z-index: 0;
        }

        .placedly-cap-journey-wrap {
          position: relative;
          z-index: 1;
          max-width: 1200px;
          margin: 0 auto;
        }

        /* ============================================================
           HEADER
           ============================================================ */
        .placedly-cap-journey-header {
          text-align: center;
          max-width: 760px;
          margin: 0 auto 60px;
        }

        .placedly-cap-journey-kicker {
          display: inline-block;
          padding: 6px 14px;
          background: #eef2ff;
          color: #1e1b4b;
          font-weight: 600;
          font-size: 12.5px;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          border-radius: 999px;
          margin: 0 0 18px;
        }

        .placedly-cap-journey-title {
          font-family: inherit;
          font-size: clamp(30px, 4vw, 48px);
          font-weight: 700;
          line-height: 1.1;
          letter-spacing: -0.025em;
          color: #0f172a;
          margin: 0 0 16px;
        }

        .placedly-cap-journey-sub {
          font-size: 16px;
          font-weight: 400;
          line-height: 1.6;
          color: #475569;
          margin: 0;
          letter-spacing: -0.005em;
        }

        /* ============================================================
           SCROLL LAYOUT
           ============================================================ */
        .placedly-cap-journey-scroll-layout {
          display: grid;
          grid-template-columns: 80px 1fr;
          gap: 32px;
          align-items: flex-start;
        }

        .placedly-cap-journey-rail-col {
          position: sticky;
          top: ${STICKY_TOP}px;
          align-self: flex-start;
        }

        .placedly-cap-journey-rail {
          position: relative;
          width: 80px;
          height: 360px;
        }

        .placedly-cap-journey-rail-track {
          position: absolute;
          top: 0;
          left: 50%;
          transform: translateX(-50%);
          width: 3px;
          height: 100%;
          background: #e2e8f0;
          border-radius: 999px;
          overflow: hidden;
        }

        .placedly-cap-journey-rail-fill {
          width: 100%;
          background: #0f172a;
          border-radius: 999px;
          transition: height 0.12s linear;
        }

        .placedly-cap-journey-rail-markers {
          position: absolute;
          inset: 0;
        }

        .placedly-cap-journey-rail-marker {
          position: absolute;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 14px;
          height: 14px;
          border-radius: 50%;
          background: #ffffff;
          border: 2px solid #cbd5e1;
          transition: all 0.25s ease;
        }

        .placedly-cap-journey-rail-marker.is-lit {
          background: #0f172a;
          border-color: #0f172a;
        }

        .placedly-cap-journey-rail-marker.is-active {
          width: 18px;
          height: 18px;
          background: #0f172a;
          border-color: #0f172a;
          box-shadow: 0 0 0 5px rgba(15, 23, 42, 0.08);
        }

        /* ============================================================
           CARDS
           ============================================================ */
        .placedly-cap-journey-cards-col {
          position: relative;
        }

        .placedly-cap-journey-track {
          display: flex;
          flex-direction: column;
          gap: 28px;
        }

        .placedly-cap-journey-card {
          background: #ffffff;
          border: 1px solid #e2e8f0;
          border-radius: 24px;
          padding: 28px;
          box-shadow: 0 1px 2px rgba(15, 23, 42, 0.04);
          transition: border-color 0.3s ease, box-shadow 0.3s ease, transform 0.3s ease;
        }

        .placedly-cap-journey-card.is-active {
          border-color: #cbd5e1;
          box-shadow: 0 16px 40px rgba(15, 23, 42, 0.08);
        }

        .placedly-cap-journey-card-inner {
          display: grid;
          grid-template-columns: 1.1fr 1fr 1.2fr;
          gap: 28px;
          align-items: center;
        }

        .placedly-cap-journey-card-left {
          display: flex;
          flex-direction: column;
          gap: 14px;
        }

        .placedly-cap-journey-card-badge {
          display: inline-block;
          align-self: flex-start;
          padding: 5px 12px;
          background: #0f172a;
          color: #ffffff;
          font-weight: 600;
          font-size: 12px;
          letter-spacing: 0.05em;
          border-radius: 999px;
          font-variant-numeric: tabular-nums;
        }

        .placedly-cap-journey-card-title {
          font-family: inherit;
          font-size: clamp(22px, 2.2vw, 28px);
          font-weight: 700;
          line-height: 1.15;
          letter-spacing: -0.02em;
          color: #0f172a;
          margin: 0;
        }

        .placedly-cap-journey-card-media {
          border-radius: 16px;
          overflow: hidden;
          background: #f1f5f9;
          aspect-ratio: 4 / 3;
        }

        .placedly-cap-journey-card-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
        }

        .placedly-cap-journey-card-right {
          display: flex;
          flex-direction: column;
          gap: 18px;
        }

        .placedly-cap-journey-card-body {
          font-size: 15px;
          line-height: 1.6;
          color: #475569;
          margin: 0;
          letter-spacing: -0.005em;
        }

        /* ============================================================
           READ MORE BUTTON — clean, no gradient
           ============================================================ */
        .placedly-cap-readmore {
          position: relative;
          display: inline-flex;
          align-items: center;
          gap: 10px;
          padding: 12px 20px 12px 24px;
          border-radius: 999px;
          font-family: inherit;
          font-weight: 600;
          font-size: 14.5px;
          letter-spacing: 0.005em;
          text-decoration: none;
          color: #ffffff;
          background: #0f172a;
          border: 1px solid #0f172a;
          box-shadow:
            0 6px 16px rgba(15, 23, 42, 0.18),
            0 1px 2px rgba(15, 23, 42, 0.08);
          overflow: hidden;
          isolation: isolate;
          transition: transform 0.28s cubic-bezier(0.22, 1, 0.36, 1),
                      box-shadow 0.28s cubic-bezier(0.22, 1, 0.36, 1),
                      background-color 0.25s ease,
                      border-color 0.25s ease;
          align-self: flex-start;
        }

        .placedly-cap-readmore:hover {
          background: #1e293b;
          border-color: #1e293b;
          transform: translateY(-2px);
          box-shadow:
            0 12px 24px rgba(15, 23, 42, 0.24),
            0 2px 4px rgba(15, 23, 42, 0.1);
        }

        .placedly-cap-readmore:active {
          transform: translateY(0) scale(0.98);
        }

        .placedly-cap-readmore-label {
          position: relative;
          z-index: 1;
        }

        .placedly-cap-readmore-icon {
          position: relative;
          z-index: 1;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 24px;
          height: 24px;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.16);
          transition: transform 0.3s cubic-bezier(0.22, 1, 0.36, 1),
                      background 0.3s ease;
        }

        .placedly-cap-readmore:hover .placedly-cap-readmore-icon {
          transform: translateX(3px);
          background: rgba(255, 255, 255, 0.24);
        }

        .placedly-cap-readmore-shine {
          position: absolute;
          top: 0;
          left: -130%;
          width: 55%;
          height: 100%;
          background: linear-gradient(
            115deg,
            transparent,
            rgba(255, 255, 255, 0.18),
            transparent
          );
          transform: skewX(-20deg);
          transition: left 0.65s ease;
          z-index: 0;
          pointer-events: none;
        }

        .placedly-cap-readmore:hover .placedly-cap-readmore-shine {
          left: 140%;
        }

        /* ============================================================
           RESPONSIVE
           ============================================================ */
        @media (max-width: 960px) {
          .placedly-cap-journey {
            padding: 72px 18px;
          }
          .placedly-cap-journey-scroll-layout {
            grid-template-columns: 56px 1fr;
            gap: 20px;
          }
          .placedly-cap-journey-rail {
            width: 56px;
            height: 320px;
          }
          .placedly-cap-journey-card {
            padding: 22px;
          }
          .placedly-cap-journey-card-inner {
            grid-template-columns: 1fr 1fr;
            gap: 20px;
          }
          .placedly-cap-journey-card-media {
            grid-column: 1 / -1;
            order: -1;
            aspect-ratio: 16 / 9;
          }
        }

        @media (max-width: 640px) {
          .placedly-cap-journey {
            padding: 56px 16px;
          }
          .placedly-cap-journey-header {
            margin-bottom: 40px;
          }
          .placedly-cap-journey-sub {
            font-size: 14.5px;
          }
          .placedly-cap-journey-scroll-layout {
            grid-template-columns: 40px 1fr;
            gap: 14px;
          }
          .placedly-cap-journey-rail {
            width: 40px;
            height: 280px;
          }
          .placedly-cap-journey-rail-track {
            width: 2px;
          }
          .placedly-cap-journey-rail-marker {
            width: 12px;
            height: 12px;
          }
          .placedly-cap-journey-rail-marker.is-active {
            width: 16px;
            height: 16px;
          }
          .placedly-cap-journey-track {
            gap: 18px;
          }
          .placedly-cap-journey-card {
            padding: 20px;
            border-radius: 20px;
          }
          .placedly-cap-journey-card-inner {
            grid-template-columns: 1fr;
            gap: 16px;
          }
          .placedly-cap-journey-card-title {
            font-size: 22px;
          }
          .placedly-cap-journey-card-body {
            font-size: 14.5px;
          }
          .placedly-cap-readmore {
            width: 100%;
            justify-content: center;
            padding: 13px 20px;
            font-size: 14px;
          }
        }
      `}</style>
    </section>
  );
}