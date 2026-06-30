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

// ─── Inline style objects (no CSS file needed) ───────────────────────────────

// How much each overlapped card peeks — gives the "deck" look
const PEEK = 28; // px

function getCardStyle(
  index: number,
  isActive: boolean,
  isOverlapped: boolean,
  isDeep: boolean,
): React.CSSProperties {
  // Scale + translateY drive the stacking depth illusion
  let transform = 'scale(0.994)';
  let opacity = 0.96;
  let boxShadow = '0 12px 40px rgba(249,115,22,0.12)';
  let marginTop: number | string = 0;

  if (isActive) {
    transform = 'scale(1) translateY(0)';
    opacity = 1;
    boxShadow = '0 14px 44px rgba(249,115,22,0.18)';
  } else if (isDeep) {
    // Two or more cards back in the stack
    transform = `scale(0.91) translateY(-${PEEK * 2}px)`;
    opacity = 0.55;
    boxShadow = '0 4px 12px rgba(15,23,42,0.06)';
    marginTop = index === 0 ? 0 : -PEEK * 1.5;
  } else if (isOverlapped) {
    // One card back
    transform = `scale(0.96) translateY(-${PEEK}px)`;
    opacity = 0.78;
    boxShadow = '0 6px 20px rgba(15,23,42,0.08)';
    marginTop = index === 0 ? 0 : -PEEK * 0.5;
  }

  return {
    position: 'sticky',
    top: STICKY_TOP,
    zIndex: index + 1,
    marginTop,
    marginBottom: 'clamp(80px, 14vh, 120px)', // scroll breathing room
    borderRadius: 'clamp(24px, 3vw, 36px)',
    background: '#FFFBF4',
    border: '1px solid rgba(0,0,0,0.06)',
    boxShadow,
    opacity,
    transform,
    willChange: 'transform, opacity',
    transition:
      'transform 0.4s cubic-bezier(0.22,1,0.36,1), opacity 0.4s ease, box-shadow 0.4s ease, margin-top 0.4s cubic-bezier(0.22,1,0.36,1)',
    overflow: 'hidden',
  };
}

function getImgStyle(isActive: boolean, isOverlapped: boolean): React.CSSProperties {
  if (isActive) {
    return {
      display: 'block',
      width: 'min(100%, 220px)',
      aspectRatio: '4/3',
      objectFit: 'cover',
      borderRadius: 16,
      transform: 'rotate(-6deg) translateY(-4px) scale(1.02)',
      boxShadow: '0 18px 48px rgba(15,23,42,0.16), 0 6px 16px rgba(15,23,42,0.10)',
      transition: 'transform 0.4s ease, box-shadow 0.4s ease',
    };
  }
  if (isOverlapped) {
    return {
      display: 'block',
      width: 'min(100%, 220px)',
      aspectRatio: '4/3',
      objectFit: 'cover',
      borderRadius: 16,
      transform: 'rotate(-7deg) scale(0.97)',
      boxShadow: '0 6px 18px rgba(15,23,42,0.07)',
      transition: 'transform 0.4s ease, box-shadow 0.4s ease',
    };
  }
  return {
    display: 'block',
    width: 'min(100%, 220px)',
    aspectRatio: '4/3',
    objectFit: 'cover',
    borderRadius: 16,
    transform: 'rotate(-7deg)',
    boxShadow: '0 14px 40px rgba(15,23,42,0.14), 0 4px 12px rgba(15,23,42,0.08)',
    transition: 'transform 0.4s ease, box-shadow 0.4s ease',
  };
}

// ─── Component ────────────────────────────────────────────────────────────────

export default function CapJourneySection({ cms = {} }: { cms?: Cms }) {
  const [activeStep, setActiveStep] = useState(0);
  const [fillProgress, setFillProgress] = useState(0);
  const [markerTops, setMarkerTops] = useState<number[]>([]);
  const [overlappedSteps, setOverlappedSteps] = useState<Set<number>>(new Set());
  const [deepSteps, setDeepSteps] = useState<Set<number>>(new Set());

  const cardsColRef = useRef<HTMLDivElement>(null);
  const cardsTrackRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLElement | null)[]>([]);

  const kicker = cms['hp:capJourneyKicker'] ?? 'Career Assistance Programme';
  const title = cms['hp:capJourneyTitle'] ?? 'Your CAP Journey — From Resume to Offer';
  const subtitle =
    cms['hp:capJourneySubtitle'] ??
    'Scroll through each stage of the programme. Every step is advisor-led, transparent, and built to get you placed — not just applied.';

  // ── Marker positions ────────────────────────────────────────────
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

  // ── Rail fill progress ──────────────────────────────────────────
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

  // ── Overlap detection ───────────────────────────────────────────
  const updateOverlapState = useCallback(() => {
    const cards = cardRefs.current.filter(Boolean) as HTMLElement[];
    if (!cards.length) return;

    const newOverlapped = new Set<number>();
    const newDeep = new Set<number>();
    const vh = window.innerHeight;

    cards.forEach((card, i) => {
      const nextCard = cards[i + 1];
      const nextNextCard = cards[i + 2];

      if (nextCard) {
        const nextRect = nextCard.getBoundingClientRect();
        // Next card is encroaching — mark this one overlapped
        if (nextRect.top < vh * 0.75) {
          newOverlapped.add(i);
        }
      }

      if (nextNextCard) {
        const nextNextRect = nextNextCard.getBoundingClientRect();
        // Two cards ahead is also encroaching — this card is deep in the stack
        if (nextNextRect.top < vh * 0.75) {
          newDeep.add(i);
        }
      }
    });

    setOverlappedSteps(newOverlapped);
    setDeepSteps(newDeep);
  }, []);

  // ── Active step via IntersectionObserver ────────────────────────
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

  // ── Scroll + resize listeners ───────────────────────────────────
  useEffect(() => {
    const onScroll = () => {
      updateScrollProgress();
      updateOverlapState();
    };

    const onResize = () => {
      updateMarkerPositions();
      updateScrollProgress();
      updateOverlapState();
    };

    onResize();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onResize);

    const track = cardsTrackRef.current;
    const ro =
      track && typeof ResizeObserver !== 'undefined'
        ? new ResizeObserver(onResize)
        : null;
    if (track && ro) ro.observe(track);

    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onResize);
      ro?.disconnect();
    };
  }, [updateMarkerPositions, updateScrollProgress, updateOverlapState]);

  // ── Render ──────────────────────────────────────────────────────
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

          {/* ── Progress Rail ── */}
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
                      className={[
                        'placedly-cap-journey-rail-marker',
                        isLit ? 'is-lit' : '',
                        activeStep === index ? 'is-active' : '',
                      ]
                        .filter(Boolean)
                        .join(' ')}
                      style={{ top: `${top}%` }}
                    />
                  );
                })}
              </div>
            </div>
          </div>

          {/* ── Cards Column ── */}
          <div ref={cardsColRef} className="placedly-cap-journey-cards-col">
            <div
              ref={cardsTrackRef}
              className="placedly-cap-journey-track"
              // Override track gap/padding inline so the sticky effect
              // has enough vertical scroll room without touching the CSS file
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: 0,             // gap is handled by marginBottom on each card
                paddingBottom: 'min(36vh, 320px)',
              }}
            >
              {DEFAULT_STEPS.map((step, index) => {
                const isActive = activeStep === index;
                const isOverlapped = overlappedSteps.has(index);
                const isDeep = deepSteps.has(index);

                return (
                  <article
                    key={step.id}
                    data-cap-step={index}
                    ref={(el) => { cardRefs.current[index] = el; }}
                    // All overlap logic lives in getCardStyle — no CSS needed
                    style={getCardStyle(index, isActive, isOverlapped, isDeep)}
                  >
                    <div
                      style={{
                        display: 'grid',
                        gridTemplateColumns:
                          'minmax(0,1fr) minmax(160px,220px) minmax(0,1fr)',
                        gap: 'clamp(20px,3vw,40px)',
                        alignItems: 'stretch',
                        minHeight: 'clamp(220px,24vw,280px)',
                        padding:
                          'clamp(28px,3.5vw,44px) clamp(24px,3vw,40px)',
                      }}
                    >
                      {/* LEFT — badge + title */}
                      <div
                        style={{
                          display: 'flex',
                          flexDirection: 'column',
                          justifyContent: 'space-between',
                          alignItems: 'flex-start',
                          minHeight: '100%',
                        }}
                      >
                        <span
                          style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            padding: '7px 16px',
                            borderRadius: 999,
                            border: '1px solid #334155',
                            fontSize: 13,
                            fontWeight: 500,
                            letterSpacing: '0.02em',
                            color: '#334155',
                            background: 'transparent',
                            lineHeight: 1,
                          }}
                        >
                          {String(index + 1).padStart(3, '0')}
                        </span>

                        <h3
                          style={{
                            fontFamily: 'Inter, sans-serif',
                            fontSize: 'clamp(1.75rem,3vw,2.5rem)',
                            fontWeight: 700,
                            letterSpacing: '-0.03em',
                            lineHeight: 1.08,
                            color: '#0f172a',
                            margin: 0,
                            maxWidth: '14ch',
                            // Fade title slightly when deep in stack
                            opacity: isDeep ? 0.6 : isOverlapped ? 0.8 : 1,
                            transition: 'opacity 0.4s ease',
                          }}
                        >
                          {step.title}
                        </h3>
                      </div>

                      {/* CENTRE — image */}
                      <div
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          padding: '8px 0',
                        }}
                      >
                        <img
                          src={step.image}
                          alt=""
                          loading={index < 2 ? 'eager' : 'lazy'}
                          style={getImgStyle(isActive, isOverlapped)}
                        />
                      </div>

                      {/* RIGHT — body + link */}
                      <div
                        style={{
                          display: 'flex',
                          flexDirection: 'column',
                          justifyContent: 'center',
                          alignItems: 'flex-start',
                          gap: 'clamp(16px,2vw,22px)',
                          maxWidth: 320,
                          marginLeft: 'auto',
                          // Fade body text when buried in stack
                          opacity: isDeep ? 0.5 : isOverlapped ? 0.72 : 1,
                          transition: 'opacity 0.4s ease',
                        }}
                      >
                        <p
                          style={{
                            fontSize: 'clamp(14px,1.2vw,15px)',
                            lineHeight: 1.65,
                            color: '#64748b',
                            margin: 0,
                          }}
                        >
                          {step.body}
                        </p>

                        <Link
                          href={step.href}
                          className="placedly-cap-journey-card-link"
                        >
                          Read More
                          <ArrowRight size={16} strokeWidth={2.25} aria-hidden />
                        </Link>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}