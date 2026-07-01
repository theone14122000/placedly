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

const HEADING_GRADIENT =
  'linear-gradient(270deg, #2563eb 0%, #4f46e5 20%, #f97316 45%, #f43f5e 65%, #9333ea 85%, #2563eb 100%)';

const gradientTextStyle: React.CSSProperties = {
  backgroundImage: HEADING_GRADIENT,
  backgroundSize: '200% 200%',
  WebkitBackgroundClip: 'text',
  backgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  color: 'transparent',
};

const gradientButtonStyle: React.CSSProperties = {
  backgroundImage: HEADING_GRADIENT,
  backgroundSize: '200% 200%',
  color: '#fff',
  WebkitTextFillColor: '#fff',
};

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
          <h2
            id="cap-journey-title"
            className="placedly-cap-journey-title"
            style={gradientTextStyle}
          >
            {title}
          </h2>
          <p className="placedly-cap-journey-sub">{subtitle}</p>
        </FadeUp>

        <div className="placedly-cap-journey-scroll-layout">
          <div
            className="placedly-cap-journey-rail-col"
            aria-hidden
          >
            <div className="placedly-cap-journey-rail">
              <div className="placedly-cap-journey-rail-track">
                <div
                  className="placedly-cap-journey-rail-fill"
                  style={{
                    height: `${fillProgress * 100}%`,
                    backgroundImage: HEADING_GRADIENT,
                    backgroundSize: '200% 200%',
                  }}
                />
              </div>

              <div className="placedly-cap-journey-rail-markers">
                {DEFAULT_STEPS.map((step, index) => {
                  const top = markerTops[index] ?? (index / (DEFAULT_STEPS.length - 1)) * 100;
                  const isLit =
                    fillProgress >= top / 100 - 0.02 || activeStep >= index;

                  return (
                    <span
                      key={step.id}
                      className={`placedly-cap-journey-rail-marker${isLit ? ' is-lit' : ''}${activeStep === index ? ' is-active' : ''}`}
                      style={{
                        top: `${top}%`,
                        ...(isLit
                          ? {
                              backgroundImage: HEADING_GRADIENT,
                              backgroundSize: '200% 200%',
                            }
                          : {}),
                      }}
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
                      <h3
                        className="placedly-cap-journey-card-title"
                        style={gradientTextStyle}
                      >
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
                        className="placedly-cap-journey-card-link placedly-cap-readmore"
                        style={gradientButtonStyle}
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
        .placedly-cap-readmore {
          position: relative;
          display: inline-flex;
          align-items: center;
          gap: 10px;
          padding: 12px 20px 12px 24px;
          border-radius: 999px;
          font-weight: 600;
          font-size: 14.5px;
          letter-spacing: 0.01em;
          border: 1px solid rgba(255,255,255,0.25);
          box-shadow:
            0 8px 20px rgba(37, 99, 235, 0.28),
            0 2px 6px rgba(0, 0, 0, 0.12),
            inset 0 1px 0 rgba(255,255,255,0.25);
          overflow: hidden;
          isolation: isolate;
          transition: transform 0.28s cubic-bezier(0.22,1,0.36,1),
                      box-shadow 0.28s cubic-bezier(0.22,1,0.36,1),
                      filter 0.28s ease,
                      background-position 0.6s ease;
        }

        .placedly-cap-readmore:hover {
          transform: translateY(-3px);
          filter: brightness(1.07) saturate(1.05);
          box-shadow:
            0 14px 30px rgba(37, 99, 235, 0.38),
            0 4px 10px rgba(0, 0, 0, 0.16),
            inset 0 1px 0 rgba(255,255,255,0.3);
          background-position: 100% 50%;
        }

        .placedly-cap-readmore:active {
          transform: translateY(-1px) scale(0.98);
          filter: brightness(0.98);
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
          background: rgba(255, 255, 255, 0.22);
          transition: transform 0.3s cubic-bezier(0.22,1,0.36,1),
                      background 0.3s ease;
        }

        .placedly-cap-readmore:hover .placedly-cap-readmore-icon {
          transform: translateX(3px);
          background: rgba(255, 255, 255, 0.32);
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
            rgba(255, 255, 255, 0.5),
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
      `}</style>
    </section>
  );
}