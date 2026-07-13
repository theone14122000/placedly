'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';
import HeroGradientBg from './HeroGradientBg';
import HeroBgVideo from './HeroBgVideo';
import HiringPartnersMarquee from './HiringPartnersMarquee';

type HeroCms = { [k: string]: string };

const SCATTER_AVATARS = [
  { src: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=128&h=128&fit=crop&crop=face', top: '52%', left: '12%', size: 26, rotate: -14, blur: true },
  { src: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=128&h=128&fit=crop&crop=face', top: '4%', left: '56%', size: 34, center: true },
  { src: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=128&h=128&fit=crop&crop=face', top: '70%', left: '26%', size: 24, rotate: -10 },
  { src: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=128&h=128&fit=crop&crop=face', top: '16%', left: '89%', size: 24, rotate: 10 },
] as const;

const HERO_CARD_AVATARS = {
  left: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=96&h=96&fit=crop&crop=face',
  right: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=96&h=96&fit=crop&crop=face',
} as const;

const ORANGE        = '#f97316';
const ORANGE_DARK   = '#ea580c';
const ORANGE_SOFT   = 'rgba(249, 115, 22, 0.12)';
const ORANGE_BORDER = 'rgba(249, 115, 22, 0.30)';
const ORANGE_GLOW   = 'rgba(249, 115, 22, 0.35)';

const MOBILE_HERO_STATS = [
  { id: 'companies',  value: '40+',  label: 'Companies'  },
  { id: 'candidates', value: '1K+',  label: 'Placements' },
  { id: 'countries',  value: '20+',  label: 'Countries'  },
  { id: 'years',      value: '10+',  label: 'Years Exp'  },
] as const;

const MOBILE_SUBLINE = (
  <>
    <span className="placedly-liftoff-m-sub-line">
      A career placement and study abroad platform where
    </span>
    <span className="placedly-liftoff-m-sub-line">
      exceptional people connect—and start working together.
    </span>
  </>
);

/* ── Stats bar ── */
function MobileHeroStatsBar({ delay = 0 }: { delay?: number }) {
  const [activeId, setActiveId] = useState<(typeof MOBILE_HERO_STATS)[number]['id']>(MOBILE_HERO_STATS[0].id);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;
    const id = setInterval(() => {
      setActiveId((prev) => {
        const idx = MOBILE_HERO_STATS.findIndex((s) => s.id === prev);
        return MOBILE_HERO_STATS[(idx + 1) % MOBILE_HERO_STATS.length].id;
      });
    }, 2400);
    return () => clearInterval(id);
  }, [paused]);

  return (
    <motion.div
      className="placedly-hero-stats-tab"
      initial={{ opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.5, delay }}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onTouchStart={() => setPaused(true)}
      onTouchEnd={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
    >
      <div className="placedly-hero-stats-tab-shine" aria-hidden />

      {MOBILE_HERO_STATS.map((stat, i) => {
        const isActive = stat.id === activeId;
        return (
          <div
            key={stat.id}
            className={`placedly-hero-stat-cell${isActive ? ' is-active' : ''}`}
            onMouseEnter={() => setActiveId(stat.id)}
            onTouchStart={() => setActiveId(stat.id)}
          >
            <span className="placedly-hero-stat-cell-text">
              <strong>{stat.value}</strong>
              <span>{stat.label}</span>
            </span>
            {i < MOBILE_HERO_STATS.length - 1 && (
              <span className="placedly-hero-stat-divider" aria-hidden />
            )}
          </div>
        );
      })}
    </motion.div>
  );
}

/* ════════════════════════════════════════════════════════
   Main component
════════════════════════════════════════════════════════ */
export default function HeroMobileBrief({ cms = {} }: { cms?: HeroCms }) {
  const admitInterest  = 'Early stage AI';
  const offerName      = 'Amber';
  const recommendName  = 'Daniel';

  return (
    <div className="placedly-hero-mobile-brief" aria-label="Mobile hero">
      <HeroGradientBg />
      <HeroBgVideo />

      {/* ── Copy ── */}
      <div className="placedly-lift-hero-copy">
        <motion.h1
          className="placedly-liftoff-m-headline"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Grow your career,
          <br />
          through people you trust.
        </motion.h1>

        <motion.p
          className="placedly-liftoff-m-sub"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.06 }}
        >
          {MOBILE_SUBLINE}
        </motion.p>

        <motion.div
          className="placedly-hero-cta-row"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.12 }}
        >
          <a href="/candidates"  className="placedly-hero-cta-pill">For Candidates</a>
          <a href="/recruiters"  className="placedly-hero-cta-pill">For Recruiters</a>
          <a href="/study-abroad" className="placedly-hero-cta-pill">Study Abroad</a>
        </motion.div>
      </div>

      {/* ── Scene ── */}
      <motion.div
        className="placedly-lift-hero-stage placedly-lift-hero-stage--liftoff"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55, delay: 0.18 }}
      >
        <div className="placedly-lift-mobile-scene" aria-hidden>
          {SCATTER_AVATARS.map((person, i) => {
            const isCenter = 'center' in person && person.center;
            const rotate   = 'rotate' in person ? person.rotate : 0;
            const isBlur   = 'blur'   in person && person.blur;
            return (
              <div
                key={`${person.src}-${i}`}
                className={`placedly-lift-mobile-bokeh${isCenter ? ' is-center' : ''}${isBlur ? ' is-blur' : ''}`}
                style={{
                  top: person.top,
                  left: person.left,
                  width: person.size,
                  height: person.size,
                  zIndex: isCenter ? 6 : i + 2,
                  transform: isCenter ? 'translateX(-50%)' : `rotate(${rotate}deg)`,
                }}
              >
                <img
                  src={person.src} alt=""
                  width={person.size} height={person.size}
                  loading="lazy" decoding="async"
                />
              </div>
            );
          })}

          {/* left card */}
          <motion.div
            className="placedly-lift-card placedly-lift-card--mobile placedly-lift-card--mobile-left"
            animate={{ y: [0, -5, 0] }}
            transition={{ duration: 5.5, repeat: Infinity, ease: 'easeInOut' }}
          >
            <div className="placedly-lift-card-profile">
              <img
                src={HERO_CARD_AVATARS.left} alt=""
                className="placedly-lift-avatar placedly-lift-avatar--photo"
                width={28} height={28} loading="lazy" decoding="async"
              />
              <div className="placedly-lift-card-identity">
                <p className="placedly-lift-name">{offerName}</p>
                <p className="placedly-lift-role">CEO at AI Startup</p>
              </div>
            </div>
            <p className="placedly-lift-card-line">
              Hiring a <strong>Head of Marketing</strong>
            </p>
          </motion.div>

          {/* rec pill */}
          <motion.div
            className="placedly-lift-mobile-rec"
            animate={{ y: [0, -4, 0] }}
            transition={{ duration: 4.8, repeat: Infinity, ease: 'easeInOut', delay: 0.3 }}
          >
            <Sparkles size={11} strokeWidth={2.25} aria-hidden />
            <span className="placedly-lift-mobile-rec-text">
              <strong>Recommended</strong>
              <span>{recommendName}</span>
            </span>
          </motion.div>

          {/* right card */}
          <motion.div
            className="placedly-lift-card placedly-lift-card--mobile placedly-lift-card--mobile-right placedly-lift-card--mobile-daniel"
            animate={{ y: [0, 5, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut', delay: 0.4 }}
          >
            <div className="placedly-lift-card-profile">
              <img
                src={HERO_CARD_AVATARS.right} alt=""
                className="placedly-lift-avatar placedly-lift-avatar--photo"
                width={28} height={28} loading="lazy" decoding="async"
              />
              <div className="placedly-lift-card-identity">
                <p className="placedly-lift-name">{recommendName}</p>
                <p className="placedly-lift-role">Marketing leader</p>
              </div>
            </div>
            <p className="placedly-lift-card-line">
              Interested in <strong>{admitInterest}</strong>
            </p>
          </motion.div>
        </div>
      </motion.div>

      {/* ── Stats bar ── */}
      <MobileHeroStatsBar delay={0.24} />

      {/* ════════════════════════════════════════
          ★ MARQUEE — added below stats bar
          with clear breathing room
      ════════════════════════════════════════ */}
      <motion.div
        className="placedly-hero-mobile-marquee-slot"
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-20px' }}
        transition={{ duration: 0.45, delay: 0.3 }}
      >
        <HiringPartnersMarquee cms={cms} />
      </motion.div>

      <style
        dangerouslySetInnerHTML={{
          __html: `
            /* ── Enlarge background video & gradient ── */
            .placedly-hero-mobile-brief > *:nth-child(1),
            .placedly-hero-mobile-brief > *:nth-child(2) {
              transform: scale(1.15) !important;
              transform-origin: center center !important;
            }

            /* ── CTA row ── */
            .placedly-hero-mobile-brief .placedly-hero-cta-row {
              display: flex !important;
              flex-direction: row !important;
              flex-wrap: nowrap !important;
              align-items: center !important;
              justify-content: center !important;
              width: 100% !important;
              max-width: 100% !important;
              box-sizing: border-box !important;
              gap: 8px !important;
              margin: 18px 0 0 0 !important;
              padding: 0 !important;
              overflow-x: auto !important;
              scrollbar-width: none !important;
              position: relative !important;
              inset: auto !important;
              float: none !important;
              clear: none !important;
              transform: none !important;
              z-index: 10 !important;
            }
            .placedly-hero-mobile-brief .placedly-hero-cta-row::-webkit-scrollbar {
              display: none !important;
            }

            /* ── Orange CTA pill ── */
            .placedly-hero-mobile-brief .placedly-hero-cta-pill {
              flex: 0 0 auto !important;
              display: inline-flex !important;
              align-items: center !important;
              justify-content: center !important;
              width: auto !important;
              min-width: 0 !important;
              max-width: 100% !important;
              height: auto !important;
              box-sizing: border-box !important;
              white-space: nowrap !important;
              float: none !important;
              clear: none !important;
              position: relative !important;
              inset: auto !important;
              transform: none !important;
              margin: 0 !important;
              padding: 10px 16px !important;
              font-family: 'Inter','Sora','Manrope',system-ui,sans-serif !important;
              font-weight: 600 !important;
              font-size: 12.5px !important;
              line-height: 1 !important;
              letter-spacing: 0.01em !important;
              color: #ffffff !important;
              text-decoration: none !important;
              text-align: center !important;
              border-radius: 9999px !important;
              border: 1px solid rgba(255,255,255,0.18) !important;
              cursor: pointer !important;
              background-color: transparent !important;
              background-image: linear-gradient(135deg, #f97316 0%, #ea580c 100%) !important;
              box-shadow: 0 4px 12px rgba(249,115,22,0.28) !important;
              transition: transform .25s ease, filter .25s ease, box-shadow .25s ease !important;
            }
            .placedly-hero-mobile-brief .placedly-hero-cta-pill:hover {
              transform: translateY(-1px) !important;
              box-shadow: 0 6px 18px rgba(249,115,22,0.38) !important;
              filter: brightness(1.08) !important;
            }
            .placedly-hero-mobile-brief .placedly-hero-cta-pill:active {
              transform: translateY(0) !important;
              filter: brightness(0.94) !important;
            }

            /* ── Scene ── */
            .placedly-hero-mobile-brief .placedly-lift-hero-stage--liftoff {
              position: relative !important;
              width: 100% !important;
              max-width: 100% !important;
              box-sizing: border-box !important;
              margin: 120px 0 0 0 !important;
              padding: 0 !important;
              z-index: 1 !important;
              clear: both !important;
            }
            .placedly-lift-mobile-scene {
              position: relative !important;
              width: 100% !important;
              height: 380px !important;
              margin: 0 !important;
              padding: 0 !important;
            }
            .placedly-hero-mobile-brief .placedly-lift-card--mobile {
              max-width: 240px !important;
              width: max-content !important;
              min-width: 0 !important;
              height: auto !important;
              min-height: 56px !important;
              box-sizing: border-box !important;
              padding: 10px 12px !important;
              overflow: hidden !important;
              word-wrap: break-word !important;
              overflow-wrap: anywhere !important;
              white-space: normal !important;
              position: absolute !important;
              inset: auto !important;
              margin: 0 !important;
              float: none !important;
              clear: none !important;
              border-radius: 12px !important;
              z-index: 3 !important;
              opacity: 0.7 !important;
              transition: opacity 0.2s ease, transform 0.2s ease !important;
            }
            .placedly-hero-mobile-brief .placedly-lift-card--mobile:hover {
              opacity: 0.95 !important;
              transform: translateY(-1px) !important;
            }
            .placedly-hero-mobile-brief .placedly-lift-card-line {
              font-size: 11px !important;
              line-height: 1.3 !important;
              letter-spacing: -0.005em !important;
              margin: 0 !important;
              padding: 0 !important;
              word-break: break-word !important;
              overflow-wrap: anywhere !important;
              white-space: normal !important;
              max-width: 100% !important;
              color: inherit !important;
              text-align: left !important;
            }
            .placedly-hero-mobile-brief .placedly-lift-card-line strong {
              font-size: 11px !important;
              font-weight: 700 !important;
              line-height: 1.3 !important;
              white-space: normal !important;
              color: inherit !important;
            }
            .placedly-hero-mobile-brief .placedly-lift-name {
              font-size: 12px !important;
              line-height: 1.2 !important;
              margin: 0 !important;
              padding: 0 !important;
            }
            .placedly-hero-mobile-brief .placedly-lift-role {
              font-size: 10px !important;
              line-height: 1.2 !important;
              margin: 0 !important;
              padding: 0 !important;
            }
            .placedly-hero-mobile-brief .placedly-lift-card-profile {
              gap: 8px !important;
              margin: 0 0 6px 0 !important;
              padding: 0 !important;
            }
            .placedly-hero-mobile-brief .placedly-lift-avatar--photo {
              width: 32px !important;
              height: 32px !important;
            }
            .placedly-hero-mobile-brief .placedly-lift-mobile-rec {
              max-width: 180px !important;
              width: max-content !important;
              min-width: 0 !important;
              min-height: 28px !important;
              box-sizing: border-box !important;
              padding: 6px 10px !important;
              overflow: hidden !important;
              word-wrap: break-word !important;
              overflow-wrap: anywhere !important;
              white-space: normal !important;
              position: absolute !important;
              top: 50% !important;
              left: 50% !important;
              transform: translate(-50%, -50%) !important;
              margin: 0 !important;
              float: none !important;
              clear: none !important;
              border-radius: 12px !important;
              z-index: 4 !important;
              opacity: 0.7 !important;
            }
            .placedly-hero-mobile-brief .placedly-lift-mobile-rec:hover {
              opacity: 0.95 !important;
            }
            .placedly-hero-mobile-brief .placedly-lift-mobile-rec-text strong,
            .placedly-hero-mobile-brief .placedly-lift-mobile-rec-text span {
              font-size: 10px !important;
              line-height: 1.2 !important;
              white-space: normal !important;
              margin: 0 !important;
              padding: 0 !important;
              color: inherit !important;
            }
            .placedly-hero-mobile-brief .placedly-lift-card--mobile.placedly-lift-card--mobile-right.placedly-lift-card--mobile-daniel,
            .placedly-hero-mobile-brief .placedly-lift-card--mobile-daniel.placedly-lift-card--mobile-daniel.placedly-lift-card--mobile-daniel {
              position: absolute !important;
              top: auto !important;
              bottom: 12px !important;
              left: auto !important;
              right: 12px !important;
              margin: 0 !important;
              transform: none !important;
              float: none !important;
              clear: none !important;
              z-index: 5 !important;
            }

            /* ── Stats tab ── */
            .placedly-hero-stats-tab {
              position: relative !important;
              display: flex !important;
              align-items: stretch !important;
              justify-content: center !important;
              flex-wrap: nowrap !important;
              gap: 0 !important;
              margin: 18px 12px 0 12px !important;
              width: auto !important;
              max-width: calc(100% - 24px) !important;
              padding: 5px !important;
              background: #ffffff !important;
              border: 1.5px solid ${ORANGE_BORDER} !important;
              border-radius: 9999px !important;
              box-shadow: 0 4px 14px rgba(249,115,22,0.10) !important;
              overflow: hidden !important;
              isolation: isolate !important;
              z-index: 2 !important;
            }
            .placedly-hero-stats-tab-shine {
              position: absolute !important;
              top: 0 !important; left: -130% !important;
              width: 60% !important; height: 100% !important;
              background: linear-gradient(115deg, transparent, rgba(249,115,22,0.14), transparent) !important;
              transform: skewX(-20deg) !important;
              transition: left 0.8s ease !important;
              z-index: 0 !important; pointer-events: none !important;
            }
            .placedly-hero-stats-tab:hover .placedly-hero-stats-tab-shine,
            .placedly-hero-stats-tab:active .placedly-hero-stats-tab-shine {
              left: 140% !important;
            }
            .placedly-hero-stat-cell {
              position: relative !important; z-index: 1 !important;
              display: flex !important; align-items: center !important;
              justify-content: center !important; gap: 4px !important;
              flex: 1 1 0 !important; min-width: 0 !important;
              padding: 5px 8px !important; border-radius: 9999px !important;
              cursor: default !important;
              transition: background 0.3s ease, transform 0.3s ease !important;
            }
            .placedly-hero-stat-cell:hover,
            .placedly-hero-stat-cell:active { background: rgba(249,115,22,0.06) !important; }
            .placedly-hero-stat-cell.is-active { background: rgba(249,115,22,0.12) !important; }
            .placedly-hero-stat-cell.is-active .placedly-hero-stat-cell-text strong {
              color: ${ORANGE_DARK} !important;
            }
            .placedly-hero-stat-cell-text {
              display: flex !important; flex-direction: column !important;
              align-items: center !important; line-height: 1.1 !important;
              min-width: 0 !important; flex: 1 !important;
              text-align: center !important; overflow: hidden !important;
            }
            .placedly-hero-stat-cell-text strong {
              font-size: 13px !important; color: ${ORANGE} !important;
              font-weight: 800 !important; letter-spacing: -0.01em !important;
              transition: color 0.3s ease !important; line-height: 1.1 !important;
              white-space: nowrap !important;
            }
            .placedly-hero-stat-cell-text span {
              font-size: 9.5px !important; color: #64748b !important;
              font-weight: 500 !important; white-space: nowrap !important;
              overflow: hidden !important; text-overflow: ellipsis !important;
              max-width: 100% !important; margin-top: 1px !important;
            }
            .placedly-hero-stat-divider {
              align-self: stretch !important; width: 1px !important;
              background: linear-gradient(to bottom, transparent, rgba(15,23,42,0.12), transparent) !important;
              flex-shrink: 0 !important; margin: 4px 0 !important;
            }

            /* ════════════════════════════════════════
               ★ MARQUEE SLOT
            ════════════════════════════════════════ */
            .placedly-hero-mobile-marquee-slot {
              margin-top: 28px !important;
              width: 100% !important;
              overflow: hidden !important;
            }

            /* ════════════════════════════════════════
               ★ KILL DUPLICATE TOP MARQUEE
               Only allow the marquee inside our mobile
               slot to render — hides any other instance
               of the partners marquee elsewhere on the
               page (e.g. a desktop hero rendering it
               above this component at mobile widths).
            ════════════════════════════════════════ */
            @media (max-width: 1024px) {
              body .placedly-partners-section {
                display: none !important;
              }
              body .placedly-hero-mobile-marquee-slot .placedly-partners-section {
                display: block !important;
              }
            }

            /* ── responsive stats ── */
            @media (max-width: 640px) {
              .placedly-hero-stats-tab {
                margin: 18px 14px 0 14px !important;
                padding: 4px !important;
              }
              .placedly-hero-stat-cell { padding: 4px 6px !important; }
              .placedly-hero-stat-cell-text strong { font-size: 12px !important; }
              .placedly-hero-stat-cell-text span   { font-size: 8.5px !important; }
              .placedly-hero-stat-divider { margin: 3px 0 !important; }

              /* marquee a little tighter on small screens */
              .placedly-hero-mobile-marquee-slot { margin-top: 22px !important; }
            }
            @media (max-width: 380px) {
              .placedly-hero-stats-tab { margin: 16px 10px 0 10px !important; padding: 3px !important; }
              .placedly-hero-stat-cell { padding: 3px 4px !important; }
              .placedly-hero-stat-cell-text strong { font-size: 11px !important; }
              .placedly-hero-stat-cell-text span   { font-size: 8px !important; }
              .placedly-hero-mobile-marquee-slot   { margin-top: 18px !important; }
            }
          `,
        }}
      />
    </div>
  );
}