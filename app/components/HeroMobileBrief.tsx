'use client';

import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';
import HeroGradientBg from './HeroGradientBg';
import HeroBgVideo from './HeroBgVideo';

type HeroCms = { [k: string]: string };

/* Modern geometric sans-serif stack (FORCED with !important) */
const GEOM_FONT_STACK = `"Outfit", "Poppins", "Inter", "Manrope", "Geist", "Plus Jakarta Sans", -apple-system, BlinkMacSystemFont, "Segoe UI", system-ui, sans-serif`;

/** Five profile circles — 2 tilted left (lower), 1 center, 2 tilted right (higher) */
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

export default function HeroMobileBrief({ cms: _cms = {} }: { cms?: HeroCms }) {
  const admitInterest = 'Early stage AI';
  const offerName = 'Amber';
  const recommendName = 'Daniel';

  return (
    <div className="placedly-hero-mobile-brief" aria-label="Mobile hero">
      {/* Real <link> for Google Fonts — loaded once */}
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;600;700;800&family=Poppins:wght@400;500;600;700;800&family=Inter:wght@400;500;600;700;800&family=Manrope:wght@400;500;600;700;800&family=Geist:wght@400;500;600;700;800&family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap"
      />

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;600;700;800&family=Poppins:wght@400;500;600;700;800&family=Inter:wght@400;500;600;700;800&family=Manrope:wght@400;500;600;700;800&family=Geist:wght@400;500;600;700;800&family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');

        /* ============================================================
           FONT — Modern Geometric Sans-Serif
           FORCED with !important so global styles can't override.
         ============================================================ */
        .placedly-hero-mobile-brief,
        .placedly-hero-mobile-brief *,
        .placedly-hero-mobile-brief h1,
        .placedly-hero-mobile-brief h2,
        .placedly-hero-mobile-brief h3,
        .placedly-hero-mobile-brief h4,
        .placedly-hero-mobile-brief h5,
        .placedly-hero-mobile-brief h6,
        .placedly-hero-mobile-brief p,
        .placedly-hero-mobile-brief span,
        .placedly-hero-mobile-brief a,
        .placedly-hero-mobile-brief button,
        .placedly-hero-mobile-brief strong,
        .placedly-hero-mobile-brief small,
        .placedly-hero-mobile-brief em,
        .placedly-hero-mobile-brief b {
          font-family: ${GEOM_FONT_STACK} !important;
          font-feature-settings: "ss01", "cv11", "cv02" !important;
          font-optical-sizing: auto !important;
          letter-spacing: -0.011em !important;
        }

        /* Per-element typography — Modern Geometric Sans-Serif */
        .placedly-liftoff-m-headline {
          font-weight: 700 !important;
          letter-spacing: -0.028em !important;
        }
        .placedly-liftoff-m-sub {
          font-weight: 400 !important;
          letter-spacing: -0.012em !important;
        }
        .placedly-lift-name {
          font-weight: 700 !important;
          letter-spacing: -0.015em !important;
        }
        .placedly-lift-role {
          font-weight: 500 !important;
          letter-spacing: -0.003em !important;
        }
        .placedly-lift-card-line {
          font-weight: 500 !important;
          letter-spacing: -0.008em !important;
        }
        .placedly-lift-card-line strong {
          font-weight: 700 !important;
          letter-spacing: -0.01em !important;
        }
        .placedly-lift-mobile-rec-text strong {
          font-weight: 700 !important;
          letter-spacing: -0.008em !important;
        }
        .placedly-lift-mobile-rec-text span {
          font-weight: 500 !important;
          letter-spacing: -0.003em !important;
        }
      `}</style>

      <HeroGradientBg />
      <HeroBgVideo />

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
      </div>

      <motion.div
        className="placedly-lift-hero-stage placedly-lift-hero-stage--liftoff"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55, delay: 0.18 }}
      >
        <div className="placedly-lift-mobile-scene" aria-hidden>
          {SCATTER_AVATARS.map((person, i) => {
            const isCenter = 'center' in person && person.center;
            const rotate = 'rotate' in person ? person.rotate : 0;
            const isBlur = 'blur' in person && person.blur;
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
                <img src={person.src} alt="" width={person.size} height={person.size} loading="lazy" decoding="async" />
              </div>
            );
          })}

          <motion.div
            className="placedly-lift-card placedly-lift-card--mobile placedly-lift-card--mobile-left"
            animate={{ y: [0, -5, 0] }}
            transition={{ duration: 5.5, repeat: Infinity, ease: 'easeInOut' }}
          >
            <div className="placedly-lift-card-profile">
              <img
                src={HERO_CARD_AVATARS.left}
                alt=""
                className="placedly-lift-avatar placedly-lift-avatar--photo"
                width={28}
                height={28}
                loading="lazy"
                decoding="async"
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

          <motion.div
            className="placedly-lift-card placedly-lift-card--mobile placedly-lift-card--mobile-right"
            animate={{ y: [0, 5, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut', delay: 0.4 }}
          >
            <div className="placedly-lift-card-profile">
              <img
                src={HERO_CARD_AVATARS.right}
                alt=""
                className="placedly-lift-avatar placedly-lift-avatar--photo"
                width={28}
                height={28}
                loading="lazy"
                decoding="async"
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
    </div>
  );
}