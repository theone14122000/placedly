'use client';

import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';
import HeroGradientBg from './HeroGradientBg';
import HeroBgVideo from './HeroBgVideo';

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

        <motion.div
          className="placedly-hero-cta-row"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.12 }}
        >
          <a
            href="/candidates"
            className="placedly-hero-cta-pill placedly-hero-cta-pill--deep"
          >
            For Candidates
          </a>
          <a
            href="/recruiters"
            className="placedly-hero-cta-pill placedly-hero-cta-pill--royal"
          >
            For Recruiters
          </a>
          <a
            href="/study-abroad"
            className="placedly-hero-cta-pill placedly-hero-cta-pill--sky"
          >
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
                <img
                  src={person.src}
                  alt=""
                  width={person.size}
                  height={person.size}
                  loading="lazy"
                  decoding="async"
                />
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

      {/* ============================================================
           NUCLEAR OVERRIDE — inline <style> rendered in the DOM.
           Being a real <style> tag inserted at the end of the body,
           AND scoped with data-attr selector for max specificity,
           no external stylesheet rule can win.
         ============================================================ */}
      <style
        dangerouslySetInnerHTML={{
          __html: `
            /* Force CTA row into a single horizontal line */
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
            }
            .placedly-hero-mobile-brief .placedly-hero-cta-row::-webkit-scrollbar {
              display: none !important;
            }

            /* Force every pill to size to its content (no stretch) */
            .placedly-hero-mobile-brief .placedly-hero-cta-pill {
              flex: 0 0 auto !important;
              flex-grow: 0 !important;
              flex-shrink: 0 !important;
              flex-basis: auto !important;
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
              padding: 8px 14px !important;
              font-family: 'Inter','Sora','Manrope',system-ui,sans-serif !important;
              font-weight: 600 !important;
              font-size: 12px !important;
              line-height: 1 !important;
              letter-spacing: 0.01em !important;
              color: #ffffff !important;
              text-decoration: none !important;
              text-align: center !important;
              border-radius: 9999px !important;
              border: 1px solid rgba(255,255,255,0.08) !important;
              cursor: pointer !important;
              background-color: transparent !important;
              background-image: linear-gradient(135deg, #0a0a0a, #1a1a1a) !important;
              box-shadow: 0 6px 16px rgba(0,0,0,0.28),
                          inset 0 1px 0 rgba(255,255,255,0.06) !important;
              transition: transform .25s ease, box-shadow .25s ease, filter .25s ease !important;
            }
            .placedly-hero-mobile-brief .placedly-hero-cta-pill:hover {
              transform: translateY(-2px) !important;
              box-shadow: 0 10px 22px rgba(0,0,0,0.38),
                          inset 0 1px 0 rgba(255,255,255,0.12) !important;
            }
            .placedly-hero-mobile-brief .placedly-hero-cta-pill:active {
              transform: translateY(0) !important;
              filter: brightness(0.94) !important;
            }

            .placedly-hero-mobile-brief .placedly-hero-cta-pill--deep,
            .placedly-hero-mobile-brief .placedly-hero-cta-pill--royal,
            .placedly-hero-mobile-brief .placedly-hero-cta-pill--sky {
              background-color: transparent !important;
              background-image: linear-gradient(135deg, #0a0a0a, #1a1a1a) !important;
            }

            /* Popup cards: hard ceiling so text can't escape */
            .placedly-hero-mobile-brief .placedly-lift-card--mobile {
              max-width: 220px !important;
              width: max-content !important;
              min-width: 0 !important;
              height: auto !important;
              box-sizing: border-box !important;
              padding: 8px 10px !important;
              overflow: hidden !important;
              word-wrap: break-word !important;
              overflow-wrap: anywhere !important;
              white-space: normal !important;
              position: relative !important;
              inset: auto !important;
              margin: 0 !important;
              float: none !important;
              clear: none !important;
            }
            .placedly-hero-mobile-brief .placedly-lift-card-line {
              font-size: 9.5px !important;
              line-height: 1.25 !important;
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
              font-size: 9.5px !important;
              font-weight: 700 !important;
              line-height: 1.25 !important;
              white-space: normal !important;
              color: inherit !important;
            }
            .placedly-hero-mobile-brief .placedly-lift-mobile-rec {
              max-width: 180px !important;
              width: max-content !important;
              min-width: 0 !important;
              box-sizing: border-box !important;
              padding: 6px 10px !important;
              overflow: hidden !important;
              word-wrap: break-word !important;
              overflow-wrap: anywhere !important;
              white-space: normal !important;
              position: relative !important;
              inset: auto !important;
              margin: 0 !important;
              float: none !important;
              clear: none !important;
            }
            .placedly-hero-mobile-brief .placedly-lift-mobile-rec-text strong,
            .placedly-hero-mobile-brief .placedly-lift-mobile-rec-text span {
              font-size: 9px !important;
              line-height: 1.2 !important;
              white-space: normal !important;
              margin: 0 !important;
              padding: 0 !important;
              color: inherit !important;
            }
          `,
        }}
      />
    </div>
  );
}