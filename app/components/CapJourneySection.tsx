'use client';

import React, { useCallback, useEffect, useRef, useState } from 'react';
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

/** How far from the top of the viewport the first card pins, in px */
const PIN_BASE_TOP = 100;
/** Each subsequent card pins slightly lower, leaving a "peeking" sliver of the one behind it */
const PIN_STACK_STEP = 18;
/** Extra scroll runway per card (in px) beyond its own height, before it releases */
const SLOT_BUFFER = 420;
const SECTION_ID = 'cap-journey-section';

function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}

export default function CapJourneySection({ cms = {} }: { cms?: Cms }) {
  const [activeStep, setActiveStep] = useState(0);
  const [markerTops, setMarkerTops] = useState<number[]>([]);
  const [slotHeights, setSlotHeights] = useState<number[]>(() =>
    DEFAULT_STEPS.map(() => 0),
  );
  const [showFloatingCta, setShowFloatingCta] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  const sectionRef = useRef<HTMLElement | null>(null);
  const cardsColRef = useRef<HTMLDivElement | null>(null);
  const trackRef = useRef<HTMLDivElement | null>(null);
  const railFillRef = useRef<HTMLDivElement | null>(null);

  const slotRefs = useRef<(HTMLDivElement | null)[]>([]);
  const cardRefs = useRef<(HTMLElement | null)[]>([]);
  const cardHeightsRef = useRef<number[]>(DEFAULT_STEPS.map(() => 0));

  const kicker = cms['hp:capJourneyKicker'] ?? 'Career Assistance Programme';
  const title =
    cms['hp:capJourneyTitle'] ?? 'Your CAP Journey — From Resume to Offer';
  const subtitle =
    cms['hp:capJourneySubtitle'] ??
    'Scroll through each stage of the programme. Every step is advisor-led, transparent, and built to get you placed — not just applied.';

  /* ============================================================
     Reduced motion check — respects OS-level accessibility setting
  ============================================================ */
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(mq.matches);
    const onChange = () => setReducedMotion(mq.matches);
    mq.addEventListener?.('change', onChange);
    return () => mq.removeEventListener?.('change', onChange);
  }, []);

  /* ============================================================
     MEASURE: card heights → slot heights, and marker positions.
     Runs on mount, on resize, and after any lazily-loaded image
     finishes loading (which can change card height in production).
  ============================================================ */
  const measure = useCallback(() => {
    const heights = cardRefs.current.map((el) => el?.offsetHeight ?? 0);
    cardHeightsRef.current = heights;
    setSlotHeights(heights.map((h) => (h ? h + SLOT_BUFFER : 0)));

    const track = trackRef.current;
    if (!track) return;
    const trackHeight = track.offsetHeight;
    if (!trackHeight) return;

    const tops = slotRefs.current.map((slot) => {
      if (!slot) return 0;
      const center = slot.offsetTop + slot.offsetHeight / 2;
      return (center / trackHeight) * 100;
    });
    setMarkerTops(tops);
  }, []);

  useEffect(() => {
    measure();

    const imgs = document.querySelectorAll<HTMLImageElement>(
      '.placedly-cap-journey-card-img',
    );
    const onImgLoad = () => measure();
    imgs.forEach((img) => {
      if (!img.complete) img.addEventListener('load', onImgLoad, { once: true });
    });

    window.addEventListener('resize', measure);
    window.addEventListener('orientationchange', measure);

    // Safety net: fonts/images can finish shifting layout slightly late.
    const safetyTimer = window.setTimeout(measure, 400);

    return () => {
      window.removeEventListener('resize', measure);
      window.removeEventListener('orientationchange', measure);
      window.clearTimeout(safetyTimer);
      imgs.forEach((img) => img.removeEventListener('load', onImgLoad));
    };
  }, [measure]);

  /* ============================================================
     THE ENGINE — rAF loop gated by IntersectionObserver.

     Why not a `scroll` listener? Because if the real scrolling
     happens inside a nested container (very common with
     Framer Motion page-transition wrappers) instead of `window`,
     a `window.addEventListener('scroll', ...)` NEVER fires and the
     whole effect silently does nothing. getBoundingClientRect(),
     on the other hand, always reports true viewport position no
     matter what actually scrolled or what transforms sit in the
     ancestor chain — so driving everything off a continuous rAF
     loop instead of a scroll event makes this 100% environment-proof.

     All per-frame writes go straight to the DOM via refs (not
     React state) to avoid re-rendering 60x/sec.
  ============================================================ */
  useEffect(() => {
    if (reducedMotion) return;

    let rafId: number | null = null;
    let isActive = false;

    const tick = () => {
      const col = cardsColRef.current;

      // 1) Position every card
      DEFAULT_STEPS.forEach((_, i) => {
        const slot = slotRefs.current[i];
        const card = cardRefs.current[i];
        if (!slot || !card) return;

        const slotRect = slot.getBoundingClientRect();
        const cardH = cardHeightsRef.current[i] || slotRect.height;
        const pinTop = PIN_BASE_TOP + i * PIN_STACK_STEP;
        const maxTranslate = Math.max(slotRect.height - cardH, 0);

        // Push the card down by exactly as much as the slot has
        // scrolled past the pin line — net effect: card appears to
        // stay pinned at `pinTop` until its scroll budget runs out.
        const translateY = clamp(pinTop - slotRect.top, 0, maxTranslate);

        card.style.transform = `translateY(${translateY}px)`;
      });

      // 2) Progress rail fill
      if (railFillRef.current && col) {
        const colRect = col.getBoundingClientRect();
        const scrollable = col.offsetHeight - window.innerHeight + PIN_BASE_TOP;
        let progress: number;
        if (scrollable <= 0) {
          progress = colRect.top <= PIN_BASE_TOP ? 1 : 0;
        } else {
          progress = clamp((-colRect.top + PIN_BASE_TOP) / scrollable, 0, 1);
        }
        railFillRef.current.style.height = `${progress * 100}%`;
      }

      if (isActive) rafId = requestAnimationFrame(tick);
    };

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          if (!isActive) {
            isActive = true;
            rafId = requestAnimationFrame(tick);
          }
        } else {
          isActive = false;
          if (rafId != null) cancelAnimationFrame(rafId);
        }
      },
      { rootMargin: '50% 0px 50% 0px', threshold: 0 },
    );

    const section = sectionRef.current;
    if (section) io.observe(section);

    // Also run one frame immediately in case IO hasn't fired yet
    // (e.g. section already in view on mount).
    rafId = requestAnimationFrame(tick);
    isActive = true;

    return () => {
      io.disconnect();
      isActive = false;
      if (rafId != null) cancelAnimationFrame(rafId);
    };
  }, [reducedMotion]);

  /* ============================================================
     ACTIVE STEP — which card is "current" for badges/markers.
     IntersectionObserver correctly handles nested scroll
     containers automatically (unlike raw scroll events), so this
     part was never the problem.
  ============================================================ */
  useEffect(() => {
    const cards = cardRefs.current.filter(Boolean) as HTMLElement[];
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
  }, [slotHeights]);

  /* ============================================================
     FLOATING CTA VISIBILITY
  ============================================================ */
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const observer = new IntersectionObserver(
      ([entry]) => setShowFloatingCta(entry.isIntersecting),
      { threshold: 0.08 },
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
      <style dangerouslySetInnerHTML={{ __html: COMPONENT_STYLES }} />

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
                <div ref={railFillRef} className="placedly-cap-journey-rail-fill" />
              </div>
              <div className="placedly-cap-journey-rail-markers">
                {DEFAULT_STEPS.map((step, index) => {
                  const top =
                    markerTops[index] ??
                    (index / (DEFAULT_STEPS.length - 1)) * 100;
                  const isLit = activeStep >= index;
                  return (
                    <span
                      key={step.id}
                      className={`placedly-cap-journey-rail-marker ${
                        isLit ? 'is-lit' : ''
                      } ${activeStep === index ? 'is-active' : ''}`}
                      style={{ top: `${top}%` }}
                    />
                  );
                })}
              </div>
            </div>
          </div>

          {/* Stacking Cards */}
          <div ref={cardsColRef} className="placedly-cap-journey-cards-col">
            <div ref={trackRef} className="placedly-cap-journey-track">
              {DEFAULT_STEPS.map((step, index) => (
                <div
                  key={step.id}
                  ref={(el) => {
                    slotRefs.current[index] = el;
                  }}
                  className="placedly-cap-journey-slot"
                  style={
                    reducedMotion
                      ? undefined
                      : { height: slotHeights[index] || undefined }
                  }
                >
                  <article
                    ref={(el) => {
                      cardRefs.current[index] = el;
                    }}
                    data-cap-step={index}
                    className={`placedly-cap-journey-card ${
                      activeStep === index ? 'is-active' : ''
                    }`}
                    style={{ zIndex: 10 + index }}
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
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={step.image}
                          alt={step.title}
                          className="placedly-cap-journey-card-img"
                          loading={index < 2 ? 'eager' : 'lazy'}
                        />
                      </div>

                      <div className="placedly-cap-journey-card-right">
                        <p className="placedly-cap-journey-card-body">
                          {step.body}
                        </p>
                        <Link
                          href={step.href}
                          className="placedly-cap-journey-card-link"
                        >
                          Read More <ArrowRight size={16} strokeWidth={2.5} />
                        </Link>
                      </div>
                    </div>
                  </article>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Floating CTA */}
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
                Apply for CAP <ArrowRight size={18} />
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

const COMPONENT_STYLES = `
  .placedly-cap-journey { position: relative; padding: clamp(56px, 8vw, 96px) clamp(20px, 4vw, 40px); background: #fffbf4; overflow: visible; }
  .placedly-cap-journey-bg { position: absolute; inset: 0; pointer-events: none; background: radial-gradient(ellipse 70% 45% at 50% 0%, rgba(255, 255, 255, 0.95), transparent 65%), radial-gradient(ellipse 40% 30% at 8% 85%, rgba(15, 23, 42, 0.03), transparent 55%); }
  .placedly-cap-journey-wrap { position: relative; z-index: 1; max-width: 1180px; margin: 0 auto; }
  .placedly-cap-journey-header { text-align: center; margin-bottom: clamp(36px, 5vw, 52px); }
  .placedly-cap-journey-kicker { font-size: 12px; font-weight: 600; letter-spacing: 0.1em; text-transform: uppercase; color: #94a3b8; margin: 0 0 12px; }
  .placedly-cap-journey-title { font-family: Inter, var(--font), sans-serif !important; font-size: clamp(1.85rem, 3.4vw, 2.65rem) !important; font-weight: 600 !important; letter-spacing: -0.03em !important; line-height: 1.12 !important; color: #181229 !important; margin: 0 0 14px !important; }
  .placedly-cap-journey-sub { font-size: clamp(15px, 1.35vw, 17px); line-height: 1.65; color: #64748b; max-width: 620px; margin: 0 auto; }
  .placedly-cap-journey-scroll-layout { display: grid; grid-template-columns: 48px minmax(0, 1fr); gap: clamp(20px, 3vw, 36px); }
  .placedly-cap-journey-rail-col { position: relative; min-height: 100%; }
  .placedly-cap-journey-rail { position: absolute; inset: 0; display: flex; justify-content: center; }
  .placedly-cap-journey-rail-track { position: relative; width: 2px; height: 100%; background: #e2e8f0; border-radius: 999px; overflow: hidden; }
  .placedly-cap-journey-rail-fill { position: absolute; top: 0; left: 0; right: 0; height: 0%; background: linear-gradient(#181229, #f97316); border-radius: 999px; box-shadow: 0 0 12px rgba(249, 115, 22, 0.4); }
  .placedly-cap-journey-rail-markers { position: absolute; inset: 0; left: 50%; transform: translateX(-50%); width: 10px; pointer-events: none; }
  .placedly-cap-journey-rail-marker { position: absolute; left: 50%; width: 10px; height: 10px; margin: -5px 0 0 -5px; border-radius: 999px; background: #fff; border: 2.5px solid #e2e8f0; transition: all 0.3s cubic-bezier(0.23, 1, 0.32, 1); }
  .placedly-cap-journey-rail-marker.is-lit { border-color: #f97316; background: #fff7ed; transform: scale(1.2); }
  .placedly-cap-journey-rail-marker.is-active { border-color: #181229; background: #181229; transform: scale(1.4); }
  .placedly-cap-journey-track { position: relative; }
  .placedly-cap-journey-slot { position: relative; }
  .placedly-cap-journey-card { position: relative; border-radius: 28px; background: #fffbf4; border: 1px solid rgba(0, 0, 0, 0.06); box-shadow: 0 12px 40px rgba(249, 115, 22, 0.12); will-change: transform; overflow: hidden; transition: box-shadow 0.4s ease; }
  .placedly-cap-journey-card:not(.is-active) { box-shadow: 0 8px 30px rgba(249, 115, 22, 0.08); }
  .placedly-cap-journey-card.is-active { box-shadow: 0 25px 60px -12px rgba(249, 115, 22, 0.25); }
  .placedly-cap-journey-card-inner { display: grid; grid-template-columns: minmax(0, 1fr) minmax(160px, 220px) minmax(0, 1fr); gap: clamp(20px, 3vw, 40px); align-items: stretch; min-height: clamp(220px, 24vw, 280px); padding: clamp(28px, 3.5vw, 44px) clamp(24px, 3vw, 40px); }
  .placedly-cap-journey-card-left { display: flex; flex-direction: column; justify-content: space-between; align-items: flex-start; }
  .placedly-cap-journey-card-badge { display: inline-flex; align-items: center; justify-content: center; padding: 7px 16px; border-radius: 999px; border: 1px solid #334155; font-size: 13px; font-weight: 500; letter-spacing: 0.02em; color: #334155; background: transparent; }
  .placedly-cap-journey-card-title { font-family: Inter, var(--font), sans-serif !important; font-size: clamp(1.75rem, 3vw, 2.5rem) !important; font-weight: 700 !important; letter-spacing: -0.03em !important; line-height: 1.08 !important; color: #0f172a !important; max-width: 14ch; }
  .placedly-cap-journey-card-media { display: flex; align-items: center; justify-content: center; padding: 8px 0; }
  .placedly-cap-journey-card-img { display: block; width: min(100%, 220px); aspect-ratio: 4/3; object-fit: cover; border-radius: 16px; transform: rotate(-7deg); box-shadow: 0 14px 40px rgba(15, 23, 42, 0.14); transition: transform 0.4s ease; }
  .placedly-cap-journey-card.is-active .placedly-cap-journey-card-img { transform: rotate(-3deg); }
  .placedly-cap-journey-card-right { display: flex; flex-direction: column; justify-content: center; align-items: flex-start; gap: clamp(16px, 2vw, 22px); max-width: 320px; margin-left: auto; }
  .placedly-cap-journey-card-body { font-size: clamp(14px, 1.2vw, 15px); line-height: 1.65; color: #64748b; margin: 0; }
  .placedly-cap-journey-card-link { display: inline-flex; align-items: center; gap: 8px; font-size: 15px; font-weight: 600; color: #2563eb !important; text-decoration: none; transition: gap 0.2s ease, color 0.2s ease; }
  .placedly-cap-journey-card-link:hover { color: #1d4ed8 !important; gap: 12px; }
  .placedly-cap-floating-cta { position: fixed; left: 0; right: 0; bottom: 0; z-index: 8995; display: flex; justify-content: center; align-items: flex-end; pointer-events: none; padding: 0 16px calc(12px + env(safe-area-inset-bottom, 0px)); }
  .placedly-cap-floating-cta::after { content: ''; position: absolute; left: 0; right: 0; bottom: 0; height: 14px; background: #fffbf4; border-top: 1px solid rgba(15, 23, 42, 0.08); box-shadow: 0 -8px 28px rgba(15, 23, 42, 0.08); z-index: -1; }
  .placedly-cap-floating-cta-float { pointer-events: auto; position: relative; z-index: 2; animation: float-bob 3.2s ease-in-out infinite; }
  .placedly-cap-floating-cta-btn { display: inline-flex; align-items: center; justify-content: center; gap: 10px; padding: 15px 28px; border-radius: 999px; background: linear-gradient(135deg, #fb923c 0%, #f97316 45%, #ea580c 100%); color: #fff !important; text-decoration: none; font-size: 15px; font-weight: 700; white-space: nowrap; border: 1px solid rgba(255, 255, 255, 0.35); box-shadow: 0 10px 30px rgba(234, 88, 12, 0.35), 0 20px 50px rgba(234, 88, 12, 0.25), inset 0 1px 0 rgba(255, 255, 255, 0.3); transition: transform 0.25s cubic-bezier(0.23, 1, 0.32, 1), box-shadow 0.25s ease; }
  .placedly-cap-floating-cta-btn:hover { transform: translateY(-4px) scale(1.03); box-shadow: 0 15px 40px rgba(234, 88, 12, 0.45), 0 25px 60px rgba(234, 88, 12, 0.35); }
  @keyframes float-bob { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-9px); } }
  @media (max-width: 768px) { .placedly-cap-journey-scroll-layout { grid-template-columns: 1fr; gap: 0; } .placedly-cap-journey-rail-col { display: none; } .placedly-cap-journey-card-inner { grid-template-columns: 1fr; grid-template-rows: auto auto auto; min-height: 0; gap: 20px; padding: 24px 20px 28px; } .placedly-cap-journey-card-title { width: 100%; max-width: none; } .placedly-cap-journey-card-img { width: min(72vw, 260px); transform: rotate(-4deg); } }
  @media (prefers-reduced-motion: reduce) { .placedly-cap-floating-cta-float { animation: none !important; } .placedly-cap-journey-card { transition: none !important; will-change: auto; } }
`;