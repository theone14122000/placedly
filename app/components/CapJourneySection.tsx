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
          <div
            className="placedly-cap-journey-rail-col"
            aria-hidden
          >
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
                      <h3 className="placedly-cap-journey-card-title">{step.title}</h3>
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
                      <Link href={step.href} className="placedly-cap-journey-card-link">
                        Read More
                        <ArrowRight size={16} strokeWidth={2.25} aria-hidden />
                      </Link>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
