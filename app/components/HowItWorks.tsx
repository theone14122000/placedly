'use client';

import {
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { FadeUp } from './motion';
import { CAP_JOURNEY_SECTION_ID } from './CapFloatingCta';

/* ─────────────────────────────────────────────────────────────────
   TYPES
───────────────────────────────────────────────────────────────── */
type Cms = Record<string, string>;

type JourneyStep = {
  id: string;
  badge: string;
  title: string;
  body: string;
  image: string;
  href: string;
  accent: string; // per-card accent colour
};

/* ─────────────────────────────────────────────────────────────────
   DATA
───────────────────────────────────────────────────────────────── */
const DEFAULT_STEPS: JourneyStep[] = [
  {
    id: 'resume',
    badge: 'Step 01',
    title: 'Resume Rebuild',
    body: 'ATS-friendly resume with achievement-based bullets, domain keywords, and a narrative that positions you for MNC roles — ready in 48 hours.',
    image: '/img/hero%20feature%20img.png',
    href: '/cap',
    accent: '#f97316',
  },
  {
    id: 'linkedin',
    badge: 'Step 02',
    title: 'LinkedIn Overhaul',
    body: 'Headline, summary, and experience aligned to the roles you want — so recruiters and hiring managers see a consistent, credible profile.',
    image: '/img/hero%20feature%20img%202.png',
    href: '/cap',
    accent: '#2563eb',
  },
  {
    id: 'mock',
    badge: 'Step 03',
    title: 'Mock Interview Sprint',
    body: 'Three live coaching rounds — HR, technical/domain, and a full mock with salary negotiation scripting before you ever enter the real room.',
    image: '/img/team.png',
    href: '/cap',
    accent: '#7c3aed',
  },
  {
    id: 'referral',
    badge: 'Step 04',
    title: 'Warm Referrals',
    body: 'Your profile goes directly to hiring managers at 10–15 target companies — with a warm introduction from Placedly, not a mass blast.',
    image: '/img/career%20fair.png',
    href: '/cap',
    accent: '#0891b2',
  },
  {
    id: 'offer',
    badge: 'Step 05',
    title: 'Offer Letter',
    body: 'When your offer arrives, the journey completes — and only then does our 12% Career Assistance Fee apply. Zero upfront, zero risk.',
    image: '/img/placed.jpg',
    href: '/cap/apply',
    accent: '#16a34a',
  },
  {
    id: 'launch',
    badge: 'Step 06',
    title: 'Career Launch',
    body: 'Post-offer onboarding prep, salary negotiation support, and first-90-days check-ins so your new role starts strong.',
    image: '/img/hero%20feaure%20img%203.png',
    href: '/cap',
    accent: '#db2777',
  },
];

/* ─────────────────────────────────────────────────────────────────
   CONSTANTS
───────────────────────────────────────────────────────────────── */
const STICKY_TOP_DESKTOP = 100;
const STICKY_TOP_MOBILE = 72;
const OVERLAP_THRESHOLD = 0.72; // fraction of vh

/* ─────────────────────────────────────────────────────────────────
   HOOK — viewport width (SSR-safe)
───────────────────────────────────────────────────────────────── */
function useIsMobile(breakpoint = 768) {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < breakpoint);
    check();
    window.addEventListener('resize', check, { passive: true });
    return () => window.removeEventListener('resize', check);
  }, [breakpoint]);
  return isMobile;
}

/* ─────────────────────────────────────────────────────────────────
   STYLE HELPERS
───────────────────────────────────────────────────────────────── */
function hexToRgb(hex: string) {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `${r},${g},${b}`;
}

function getCardStyle(
  index: number,
  isActive: boolean,
  isOverlapped: boolean,
  isDeep: boolean,
  accent: string,
  isMobile: boolean,
): React.CSSProperties {
  const rgb = hexToRgb(accent);
  const stickyTop = isMobile ? STICKY_TOP_MOBILE : STICKY_TOP_DESKTOP;

  // Stack offset — each overlapped card peeks below the one above
  const peekPx = isMobile ? 14 : 22;

  let transform = 'scale(0.995)';
  let opacity = 0.97;
  let boxShadow = `0 8px 32px rgba(${rgb},0.13), 0 2px 8px rgba(15,23,42,0.06)`;
  let borderColor = 'rgba(0,0,0,0.06)';

  if (isDeep) {
    transform = isMobile
      ? 'scale(0.93) translateY(-6px)'
      : 'scale(0.90) translateY(-14px)';
    opacity = 0.52;
    boxShadow = '0 2px 8px rgba(15,23,42,0.05)';
    borderColor = 'rgba(0,0,0,0.04)';
  } else if (isOverlapped) {
    transform = isMobile
      ? 'scale(0.96) translateY(-4px)'
      : 'scale(0.955) translateY(-8px)';
    opacity = 0.76;
    boxShadow = '0 4px 16px rgba(15,23,42,0.07)';
    borderColor = 'rgba(0,0,0,0.05)';
  } else if (isActive) {
    transform = 'scale(1) translateY(0)';
    opacity = 1;
    boxShadow = `
      0 0 0 1px rgba(${rgb},0.18),
      0 8px 24px rgba(${rgb},0.18),
      0 24px 64px rgba(${rgb},0.14),
      0 2px 8px rgba(15,23,42,0.06)
    `;
    borderColor = `rgba(${rgb},0.22)`;
  }

  return {
    position: 'sticky',
    top: stickyTop,
    zIndex: index + 1,
    // bottom margin = scroll breathing room for this card
    marginBottom: isMobile
      ? 'clamp(56px,10vh,80px)'
      : 'clamp(80px,14vh,120px)',
    borderRadius: isMobile ? 20 : 'clamp(24px,3vw,36px)',
    background: '#FFFBF4',
    border: `1px solid ${borderColor}`,
    boxShadow,
    opacity,
    transform,
    willChange: 'transform, opacity',
    transition: [
      'transform 0.42s cubic-bezier(0.22,1,0.36,1)',
      'opacity 0.42s ease',
      'box-shadow 0.42s ease',
      'border-color 0.42s ease',
    ].join(', '),
    overflow: 'hidden',
    // Subtle per-card coloured top stripe when active
    backgroundImage: isActive
      ? `linear-gradient(135deg, rgba(${rgb},0.06) 0%, transparent 60%)`
      : 'none',
  };
}

function getImageStyle(
  isActive: boolean,
  isOverlapped: boolean,
  isMobile: boolean,
): React.CSSProperties {
  const base: React.CSSProperties = {
    display: 'block',
    width: isMobile ? 'min(60vw, 200px)' : 'min(100%, 220px)',
    aspectRatio: '4/3',
    objectFit: 'cover',
    borderRadius: isMobile ? 14 : 16,
    transition: 'transform 0.42s ease, box-shadow 0.42s ease',
  };

  if (isActive) {
    return {
      ...base,
      transform: isMobile
        ? 'rotate(-4deg) translateY(-4px) scale(1.03)'
        : 'rotate(-6deg) translateY(-6px) scale(1.03)',
      boxShadow:
        '0 20px 52px rgba(15,23,42,0.18), 0 6px 16px rgba(15,23,42,0.10)',
    };
  }
  if (isOverlapped) {
    return {
      ...base,
      transform: isMobile ? 'rotate(-3deg) scale(0.96)' : 'rotate(-7deg) scale(0.96)',
      boxShadow: '0 6px 18px rgba(15,23,42,0.07)',
    };
  }
  return {
    ...base,
    transform: isMobile ? 'rotate(-4deg)' : 'rotate(-7deg)',
    boxShadow:
      '0 14px 40px rgba(15,23,42,0.14), 0 4px 12px rgba(15,23,42,0.08)',
  };
}

/* ─────────────────────────────────────────────────────────────────
   FLOATING KEYFRAME INJECTION (once, client-side)
───────────────────────────────────────────────────────────────── */
function useFloatAnimation() {
  useEffect(() => {
    if (document.getElementById('cap-float-keyframes')) return;
    const style = document.createElement('style');
    style.id = 'cap-float-keyframes';
    style.textContent = `
      @keyframes capFloat {
        0%,100% { transform: translateY(0); }
        50%      { transform: translateY(-7px); }
      }
      @keyframes capPulse {
        0%,100% { box-shadow: 0 0 0 0 rgba(249,115,22,0.3); }
        50%      { box-shadow: 0 0 0 6px rgba(249,115,22,0); }
      }
    `;
    document.head.appendChild(style);
  }, []);
}

/* ─────────────────────────────────────────────────────────────────
   MAIN COMPONENT
───────────────────────────────────────────────────────────────── */
export default function CapJourneySection({ cms = {} }: { cms?: Cms }) {
  useFloatAnimation();

  const isMobile = useIsMobile();

  const [activeStep, setActiveStep] = useState(0);
  const [fillProgress, setFillProgress] = useState(0);
  const [markerTops, setMarkerTops] = useState<number[]>([]);
  const [overlappedSteps, setOverlappedSteps] = useState<Set<number>>(new Set());
  const [deepSteps, setDeepSteps] = useState<Set<number>>(new Set());

  const cardsColRef = useRef<HTMLDivElement>(null);
  const cardsTrackRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLElement | null)[]>([]);

  const kicker =
    cms['hp:capJourneyKicker'] ?? 'Career Assistance Programme';
  const title =
    cms['hp:capJourneyTitle'] ??
    'Your CAP Journey — From Resume to Offer';
  const subtitle =
    cms['hp:capJourneySubtitle'] ??
    'Scroll through each stage of the programme. Every step is advisor-led, transparent, and built to get you placed — not just applied.';

  /* ── Marker positions ── */
  const updateMarkerPositions = useCallback(() => {
    const track = cardsTrackRef.current;
    if (!track) return;
    const cards = track.querySelectorAll<HTMLElement>('[data-cap-step]');
    const trackH = track.offsetHeight;
    if (!trackH || !cards.length) return;
    setMarkerTops(
      Array.from(cards).map((c) => {
        const center = c.offsetTop + c.offsetHeight / 2;
        return (center / trackH) * 100;
      }),
    );
  }, []);

  /* ── Rail fill ── */
  const updateScrollProgress = useCallback(() => {
    const col = cardsColRef.current;
    if (!col) return;
    const rect = col.getBoundingClientRect();
    const stickyTop = isMobile ? STICKY_TOP_MOBILE : STICKY_TOP_DESKTOP;
    const scrollable = col.offsetHeight - window.innerHeight + stickyTop;
    if (scrollable <= 0) {
      setFillProgress(rect.top <= stickyTop ? 1 : 0);
      return;
    }
    setFillProgress(
      Math.min(1, Math.max(0, (-rect.top + stickyTop) / scrollable)),
    );
  }, [isMobile]);

  /* ── Overlap detection ── */
  const updateOverlapState = useCallback(() => {
    const cards = cardRefs.current.filter(Boolean) as HTMLElement[];
    if (!cards.length) return;
    const vh = window.innerHeight;
    const newOverlapped = new Set<number>();
    const newDeep = new Set<number>();

    cards.forEach((_, i) => {
      const next = cards[i + 1];
      const nextNext = cards[i + 2];
      if (next && next.getBoundingClientRect().top < vh * OVERLAP_THRESHOLD) {
        newOverlapped.add(i);
      }
      if (nextNext && nextNext.getBoundingClientRect().top < vh * OVERLAP_THRESHOLD) {
        newDeep.add(i);
      }
    });

    setOverlappedSteps(newOverlapped);
    setDeepSteps(newDeep);
  }, []);

  /* ── IntersectionObserver for active step ── */
  useEffect(() => {
    const cards = document.querySelectorAll<HTMLElement>('[data-cap-step]');
    if (!cards.length) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (!e.isIntersecting) return;
          const idx = Number(e.target.getAttribute('data-cap-step'));
          if (!Number.isNaN(idx)) setActiveStep(idx);
        });
      },
      { threshold: 0.52, rootMargin: '-42% 0px -42% 0px' },
    );
    cards.forEach((c) => observer.observe(c));
    return () => observer.disconnect();
  }, []);

  /* ── Scroll / resize ── */
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
    ro?.observe(track!);

    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onResize);
      ro?.disconnect();
    };
  }, [updateMarkerPositions, updateScrollProgress, updateOverlapState]);

  /* ── Render ── */
  return (
    <section
      id={CAP_JOURNEY_SECTION_ID}
      aria-labelledby="cap-journey-title"
      style={{
        position: 'relative',
        padding: isMobile
          ? 'clamp(48px,8vw,72px) clamp(16px,4vw,24px)'
          : 'clamp(56px,8vw,96px) clamp(20px,4vw,40px)',
        background: '#FFFBF4',
        overflow: 'visible',
      }}
    >
      {/* Background blobs */}
      <div
        aria-hidden
        style={{
          position: 'absolute',
          inset: 0,
          pointerEvents: 'none',
          background: `
            radial-gradient(ellipse 70% 45% at 50% 0%, rgba(255,255,255,0.95), transparent 65%),
            radial-gradient(ellipse 40% 30% at 8% 85%, rgba(15,23,42,0.03), transparent 55%)
          `,
        }}
      />

      {/* Wrap */}
      <div
        style={{
          position: 'relative',
          zIndex: 1,
          maxWidth: 1180,
          margin: '0 auto',
        }}
      >
        {/* ── Header ── */}
        <FadeUp
          style={{
            textAlign: 'center',
            marginBottom: isMobile
              ? 'clamp(28px,5vw,40px)'
              : 'clamp(36px,5vw,52px)',
          }}
        >
          {/* Kicker pill */}
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 8,
              padding: '6px 16px',
              borderRadius: 999,
              background: 'rgba(249,115,22,0.09)',
              border: '1px solid rgba(249,115,22,0.2)',
              fontSize: 11,
              fontWeight: 700,
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              color: '#ea580c',
              marginBottom: 16,
            }}
          >
            {/* Small dot */}
            <span
              style={{
                width: 6,
                height: 6,
                borderRadius: '50%',
                background: '#f97316',
                animation: 'capPulse 2s ease-in-out infinite',
                flexShrink: 0,
              }}
            />
            {kicker}
          </div>

          <h2
            id="cap-journey-title"
            style={{
              fontFamily: 'Inter, sans-serif',
              fontSize: isMobile
                ? 'clamp(1.65rem,7vw,2.1rem)'
                : 'clamp(1.85rem,3.4vw,2.65rem)',
              fontWeight: 700,
              letterSpacing: '-0.035em',
              lineHeight: 1.1,
              color: '#0f172a',
              margin: '0 0 14px',
            }}
          >
            {title}
          </h2>

          <p
            style={{
              fontSize: isMobile ? 14 : 'clamp(15px,1.35vw,17px)',
              lineHeight: 1.7,
              color: '#64748b',
              maxWidth: 580,
              margin: '0 auto',
            }}
          >
            {subtitle}
          </p>
        </FadeUp>

        {/* ── Scroll layout ── */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: isMobile ? '1fr' : '44px minmax(0,1fr)',
            gap: isMobile ? 0 : 'clamp(20px,3vw,36px)',
            alignItems: 'stretch',
          }}
        >
          {/* ── Rail (desktop only) ── */}
          {!isMobile && (
            <div
              aria-hidden
              style={{ position: 'relative', minHeight: '100%' }}
            >
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  display: 'flex',
                  justifyContent: 'center',
                }}
              >
                {/* Track */}
                <div
                  style={{
                    position: 'relative',
                    width: 2,
                    height: '100%',
                    background: '#e2e8f0',
                    borderRadius: 999,
                    overflow: 'hidden',
                  }}
                >
                  <div
                    style={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      right: 0,
                      width: '100%',
                      height: `${fillProgress * 100}%`,
                      background: `linear-gradient(180deg, ${DEFAULT_STEPS[activeStep]?.accent ?? '#f97316'}, #181229)`,
                      borderRadius: 999,
                      transition: 'height 0.12s linear, background 0.4s ease',
                      willChange: 'height',
                    }}
                  />
                </div>

                {/* Markers */}
                <div
                  style={{
                    position: 'absolute',
                    inset: 0,
                    left: '50%',
                    transform: 'translateX(-50%)',
                    width: 10,
                    pointerEvents: 'none',
                  }}
                >
                  {DEFAULT_STEPS.map((step, index) => {
                    const top =
                      markerTops[index] ??
                      (index / (DEFAULT_STEPS.length - 1)) * 100;
                    const isLit =
                      fillProgress >= top / 100 - 0.02 ||
                      activeStep >= index;
                    const isMarkerActive = activeStep === index;
                    const rgb = hexToRgb(step.accent);

                    return (
                      <span
                        key={step.id}
                        style={{
                          position: 'absolute',
                          left: '50%',
                          top: `${top}%`,
                          width: isMarkerActive ? 12 : 8,
                          height: isMarkerActive ? 12 : 8,
                          marginLeft: isMarkerActive ? -6 : -4,
                          marginTop: isMarkerActive ? -6 : -4,
                          borderRadius: '50%',
                          background: isMarkerActive
                            ? step.accent
                            : isLit
                            ? '#94a3b8'
                            : '#fff',
                          border: isMarkerActive
                            ? `2px solid ${step.accent}`
                            : isLit
                            ? '2px solid #94a3b8'
                            : '2px solid #e2e8f0',
                          boxShadow: isMarkerActive
                            ? `0 0 0 4px rgba(${rgb},0.18)`
                            : 'none',
                          transition:
                            'all 0.3s cubic-bezier(0.22,1,0.36,1)',
                        }}
                      />
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {/* ── Cards column ── */}
          <div ref={cardsColRef} style={{ minWidth: 0 }}>
            {/* Mobile step counter */}
            {isMobile && (
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 8,
                  marginBottom: 20,
                  padding: '0 4px',
                }}
              >
                {DEFAULT_STEPS.map((step, i) => (
                  <div
                    key={step.id}
                    style={{
                      flex: i === activeStep ? '0 0 24px' : '0 0 6px',
                      height: 6,
                      borderRadius: 999,
                      background:
                        i === activeStep
                          ? step.accent
                          : i < activeStep
                          ? '#cbd5e1'
                          : '#e2e8f0',
                      transition: 'all 0.35s cubic-bezier(0.22,1,0.36,1)',
                    }}
                  />
                ))}
                <span
                  style={{
                    marginLeft: 'auto',
                    fontSize: 12,
                    fontWeight: 600,
                    color: '#94a3b8',
                    letterSpacing: '0.05em',
                  }}
                >
                  {activeStep + 1} / {DEFAULT_STEPS.length}
                </span>
              </div>
            )}

            <div
              ref={cardsTrackRef}
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: 0,
                paddingBottom: isMobile ? '22vh' : 'min(36vh,320px)',
              }}
            >
              {DEFAULT_STEPS.map((step, index) => {
                const isActive = activeStep === index;
                const isOverlapped = overlappedSteps.has(index);
                const isDeep = deepSteps.has(index);
                const rgb = hexToRgb(step.accent);

                return (
                  <article
                    key={step.id}
                    data-cap-step={index}
                    ref={(el) => { cardRefs.current[index] = el; }}
                    style={getCardStyle(
                      index,
                      isActive,
                      isOverlapped,
                      isDeep,
                      step.accent,
                      isMobile,
                    )}
                  >
                    {/* Active card glow blob */}
                    {isActive && (
                      <div
                        aria-hidden
                        style={{
                          position: 'absolute',
                          inset: 'auto -10% -30% auto',
                          width: 220,
                          height: 220,
                          background: `radial-gradient(circle, rgba(${rgb},0.18), transparent 70%)`,
                          filter: 'blur(32px)',
                          pointerEvents: 'none',
                          zIndex: 0,
                        }}
                      />
                    )}

                    {isMobile ? (
                      /* ════════════════════════════════
                         MOBILE CARD LAYOUT
                      ════════════════════════════════ */
                      <div
                        style={{
                          position: 'relative',
                          zIndex: 1,
                          padding: '22px 20px 26px',
                        }}
                      >
                        {/* Top row: badge + image */}
                        <div
                          style={{
                            display: 'flex',
                            alignItems: 'flex-start',
                            justifyContent: 'space-between',
                            gap: 12,
                            marginBottom: 18,
                          }}
                        >
                          {/* Left: badge + title */}
                          <div
                            style={{
                              display: 'flex',
                              flexDirection: 'column',
                              gap: 10,
                              flex: 1,
                              minWidth: 0,
                            }}
                          >
                            <span
                              style={{
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: 6,
                                padding: '5px 12px',
                                borderRadius: 999,
                                background: `rgba(${rgb},0.10)`,
                                border: `1px solid rgba(${rgb},0.22)`,
                                fontSize: 11,
                                fontWeight: 700,
                                letterSpacing: '0.08em',
                                color: step.accent,
                                width: 'fit-content',
                              }}
                            >
                              {step.badge}
                            </span>

                            <h3
                              style={{
                                fontFamily: 'Inter, sans-serif',
                                fontSize: 'clamp(1.4rem,5.5vw,1.75rem)',
                                fontWeight: 700,
                                letterSpacing: '-0.03em',
                                lineHeight: 1.1,
                                color: '#0f172a',
                                margin: 0,
                                opacity: isDeep ? 0.55 : isOverlapped ? 0.78 : 1,
                                transition: 'opacity 0.4s ease',
                              }}
                            >
                              {step.title}
                            </h3>
                          </div>

                          {/* Right: tilted image */}
                          <div
                            style={{
                              flexShrink: 0,
                              animation: isActive
                                ? 'capFloat 3.8s ease-in-out infinite'
                                : 'none',
                            }}
                          >
                            <img
                              src={step.image}
                              alt=""
                              loading={index < 2 ? 'eager' : 'lazy'}
                              style={getImageStyle(isActive, isOverlapped, true)}
                            />
                          </div>
                        </div>

                        {/* Body */}
                        <p
                          style={{
                            fontSize: 14,
                            lineHeight: 1.68,
                            color: '#64748b',
                            margin: '0 0 16px',
                            opacity: isDeep ? 0.5 : isOverlapped ? 0.72 : 1,
                            transition: 'opacity 0.4s ease',
                          }}
                        >
                          {step.body}
                        </p>

                        {/* Link */}
                        <Link
                          href={step.href}
                          style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: 6,
                            fontSize: 14,
                            fontWeight: 600,
                            color: step.accent,
                            textDecoration: 'none',
                            padding: '8px 16px',
                            borderRadius: 999,
                            background: `rgba(${rgb},0.08)`,
                            border: `1px solid rgba(${rgb},0.18)`,
                            transition: 'background 0.2s ease, gap 0.2s ease',
                          }}
                        >
                          Read More
                          <ArrowRight size={14} strokeWidth={2.25} aria-hidden />
                        </Link>
                      </div>
                    ) : (
                      /* ════════════════════════════════
                         DESKTOP CARD LAYOUT
                      ════════════════════════════════ */
                      <div
                        style={{
                          position: 'relative',
                          zIndex: 1,
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
                        {/* LEFT */}
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
                              gap: 6,
                              padding: '6px 14px',
                              borderRadius: 999,
                              background: `rgba(${rgb},0.09)`,
                              border: `1px solid rgba(${rgb},0.2)`,
                              fontSize: 12,
                              fontWeight: 700,
                              letterSpacing: '0.08em',
                              color: step.accent,
                            }}
                          >
                            {step.badge}
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
                              opacity:
                                isDeep ? 0.55 : isOverlapped ? 0.78 : 1,
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
                            animation: isActive
                              ? 'capFloat 3.8s ease-in-out infinite'
                              : 'none',
                          }}
                        >
                          <img
                            src={step.image}
                            alt=""
                            loading={index < 2 ? 'eager' : 'lazy'}
                            style={getImageStyle(
                              isActive,
                              isOverlapped,
                              false,
                            )}
                          />
                        </div>

                        {/* RIGHT */}
                        <div
                          style={{
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'center',
                            alignItems: 'flex-start',
                            gap: 'clamp(16px,2vw,22px)',
                            maxWidth: 320,
                            marginLeft: 'auto',
                            opacity:
                              isDeep ? 0.5 : isOverlapped ? 0.72 : 1,
                            transition: 'opacity 0.4s ease',
                          }}
                        >
                          <p
                            style={{
                              fontSize: 'clamp(14px,1.2vw,15px)',
                              lineHeight: 1.68,
                              color: '#64748b',
                              margin: 0,
                            }}
                          >
                            {step.body}
                          </p>

                          <Link
                            href={step.href}
                            style={{
                              display: 'inline-flex',
                              alignItems: 'center',
                              gap: 8,
                              fontSize: 15,
                              fontWeight: 600,
                              color: step.accent,
                              textDecoration: 'none',
                              padding: '9px 18px',
                              borderRadius: 999,
                              background: `rgba(${rgb},0.08)`,
                              border: `1px solid rgba(${rgb},0.18)`,
                              transition: 'background 0.2s ease',
                            }}
                          >
                            Read More
                            <ArrowRight
                              size={16}
                              strokeWidth={2.25}
                              aria-hidden
                            />
                          </Link>
                        </div>
                      </div>
                    )}
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