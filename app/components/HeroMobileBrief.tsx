'use client';

import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';
import HeroGradientBg from './HeroGradientBg';
import HeroBgVideo from './HeroBgVideo';

type HeroCms = { [k: string]: string };

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
      <HeroGradientBg />
      <HeroBgVideo />
      <div className="placedly-lift-hero-copy">
        {/* Only the heading copy changed — class + inherited font untouched */}
        <motion.h1
          className="placedly-liftoff-m-headline"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Your next opportunity,
          <br />
          powered by trust.
        </motion.h1>

        <motion.p
          className="placedly-liftoff-m-sub"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.06 }}
        >
          {MOBILE_SUBLINE}
        </motion.p>

        {/* NEW: CTA row — isolated class namespace, forced single row */}
        <motion.div
          className="placedly-hero-cta-row"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.12 }}
        >
          <a href="/candidates" className="placedly-hero-cta-pill placedly-hero-cta-pill--deep">
            For Candidates
          </a>
          <a href="/recruiters" className="placedly-hero-cta-pill placedly-hero-cta-pill--royal">
            For Recruiters
          </a>
          <a href="/study-abroad" className="placedly-hero-cta-pill placedly-hero-cta-pill--sky">
            Study Abroad
          </a>
        </motion.div>
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

          {/* Popup cards — 100% untouched, no font/style changes */}
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

      {/* Scoped styles — only affects the new CTA row, nothing else on the page */}
      <style jsx>{`
        .placedly-hero-cta-row {
          display: flex !important;
          flex-direction: row !important;
          flex-wrap: nowrap !important;
          align-items: center;
          justify-content: center;
          gap: clamp(6px, 1.8vw, 14px);
          margin-top: 18px;
          width: 100%;
          max-width: 100%;
          overflow-x: auto;
          -webkit-overflow-scrolling: touch;
          scrollbar-width: none;
          -ms-overflow-style: none;
        }
        .placedly-hero-cta-row::-webkit-scrollbar {
          display: none;
        }

        .placedly-hero-cta-pill {
          flex: 0 0 auto !important;
          display: inline-flex !important;
          flex-direction: row !important;
          font-family: 'Inter', 'Sora', 'Manrope', system-ui, sans-serif;
          font-weight: 600;
          font-size: clamp(10.5px, 2.4vw, 13.5px);
          letter-spacing: 0.01em;
          color: #ffffff;
          white-space: nowrap;
          align-items: center;
          justify-content: center;
          padding: clamp(7px, 1.8vw, 11px) clamp(11px, 2.8vw, 20px);
          border-radius: 9999px;
          border: none;
          cursor: pointer;
          text-decoration: none;
          transition: transform 0.25s ease, box-shadow 0.25s ease;
        }
        .placedly-hero-cta-pill:hover {
          transform: translateY(-2px);
        }
        .placedly-hero-cta-pill:active {
          transform: translateY(0);
        }

        /* Deep royal blue — For Candidates */
        .placedly-hero-cta-pill--deep {
          background-image: linear-gradient(135deg, #1e3a8a, #2563eb);
          box-shadow: 0 8px 20px rgba(30, 58, 138, 0.34), inset 0 1px 0 rgba(255, 255, 255, 0.2);
        }
        .placedly-hero-cta-pill--deep:hover {
          box-shadow: 0 14px 30px rgba(30, 58, 138, 0.46), inset 0 1px 0 rgba(255, 255, 255, 0.26);
        }

        /* Classic blue — For Recruiters */
        .placedly-hero-cta-pill--royal {
          background-image: linear-gradient(135deg, #2563eb, #3b82f6);
          box-shadow: 0 8px 20px rgba(37, 99, 235, 0.32), inset 0 1px 0 rgba(255, 255, 255, 0.2);
        }
        .placedly-hero-cta-pill--royal:hover {
          box-shadow: 0 14px 30px rgba(37, 99, 235, 0.44), inset 0 1px 0 rgba(255, 255, 255, 0.26);
        }

        /* Sky blue — Study Abroad */
        .placedly-hero-cta-pill--sky {
          background-image: linear-gradient(135deg, #0ea5e9, #38bdf8);
          box-shadow: 0 8px 20px rgba(14, 165, 233, 0.32), inset 0 1px 0 rgba(255, 255, 255, 0.2);
        }
        .placedly-hero-cta-pill--sky:hover {
          box-shadow: 0 14px 30px rgba(14, 165, 233, 0.44), inset 0 1px 0 rgba(255, 255, 255, 0.26);
        }
      `}</style>
    </div>
  );
}