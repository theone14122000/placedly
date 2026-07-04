'use client';

import { motion } from 'framer-motion';
import {
  Sparkles,
  Briefcase,
  Building2,
  Globe,
  ArrowRight,
  type LucideIcon,
} from 'lucide-react';
import Link from 'next/link';
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

/* 3 CTA pills — same blue-shade system as desktop Hero */
const HERO_CTAS = [
  { id: 'candidates', icon: Briefcase, cmsKey: 'hp:heroPrimaryCtaText',   fallback: 'For Candidates', href: '/contact',    shade: 'deep' as const },
  { id: 'recruiters', icon: Building2, cmsKey: 'hp:heroRecruiterCtaText', fallback: 'For Recruiters', href: '/recruiters', shade: 'royal' as const },
  { id: 'study',      icon: Globe,     cmsKey: 'hp:heroSecondaryCtaText', fallback: 'Study Abroad',   href: '/study-visa', shade: 'sky' as const },
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

/* ─── Mobile CTA Pill ─── */
function MobileCtaPill({
  href, label, icon: Icon, shade, delay = 0,
}: {
  href: string; label: string; icon: LucideIcon;
  shade: 'deep' | 'royal' | 'sky'; delay?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay }}
      whileTap={{ scale: 0.96 }}
      style={{ flex: '1 1 0', minWidth: 0 }}
    >
      <Link href={href} className={`mb-cta-pill mb-cta-pill--${shade}`}>
        <span className="mb-cta-pill-shine" aria-hidden />
        <span className="mb-cta-pill-icon">
          <Icon size={13} strokeWidth={2.2} />
        </span>
        <span className="mb-cta-pill-label">{label}</span>
        <motion.span
          className="mb-cta-pill-arrow"
          animate={{ x: [0, 2, 0] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut', delay: delay + 0.3 }}
        >
          <ArrowRight size={11} strokeWidth={2.5} />
        </motion.span>
      </Link>
    </motion.div>
  );
}

export default function HeroMobileBrief({ cms = {} }: { cms?: HeroCms }) {
  const admitInterest = 'Early stage AI';
  const offerName = 'Amber';
  const recommendName = 'Daniel';

  return (
    <div className="placedly-hero-mobile-brief" aria-label="Mobile hero">
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;600;700;800&family=Poppins:wght@400;500;600;700;800&family=Inter:wght@400;500;600;700;800&family=Manrope:wght@400;500;600;700;800&family=Geist:wght@400;500;600;700;800&family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap"
      />

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;600;700;800&family=Poppins:wght@400;500;600;700;800&family=Inter:wght@400;500;600;700;800&family=Manrope:wght@400;500;600;700;800&family=Geist:wght@400;500;600;700;800&family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');

        /* ============================================================
           FONT — Modern Geometric Sans-Serif
         ============================================================ */
        .placedly-hero-mobile-brief,
        .placedly-hero-mobile-brief *,
        .placedly-hero-mobile-brief h1, .placedly-hero-mobile-brief h2,
        .placedly-hero-mobile-brief h3, .placedly-hero-mobile-brief h4,
        .placedly-hero-mobile-brief p, .placedly-hero-mobile-brief span,
        .placedly-hero-mobile-brief a, .placedly-hero-mobile-brief button,
        .placedly-hero-mobile-brief strong, .placedly-hero-mobile-brief small {
          font-family: ${GEOM_FONT_STACK} !important;
          font-feature-settings: "ss01", "cv11", "cv02" !important;
          font-optical-sizing: auto !important;
          letter-spacing: -0.011em !important;
        }

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

        /* ============================================================
           CTA pills
           ============================================================ */
        .mb-cta-row {
          position: relative;
          z-index: 2;
          display: flex;
          gap: 8px;
          width: 100%;
          padding: 0 18px;
          margin-bottom: clamp(20px, 4vw, 28px);
        }

        .mb-cta-pill {
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 6px;
          width: 100%;
          padding: 12px 10px;
          border-radius: 999px;
          font-weight: 600 !important;
          font-size: 12px;
          letter-spacing: -0.005em !important;
          text-decoration: none;
          color: #ffffff;
          border: 1px solid rgba(255,255,255,0.22);
          overflow: hidden;
          isolation: isolate;
          white-space: nowrap;
          transition: transform 0.2s ease, box-shadow 0.2s ease;
        }
        .mb-cta-pill:active { transform: scale(0.96); }

        .mb-cta-pill--deep {
          background-image: linear-gradient(135deg, #1e3a8a, #2563eb);
          box-shadow: 0 6px 16px rgba(30, 58, 138, 0.3);
        }
        .mb-cta-pill--royal {
          background-image: linear-gradient(135deg, #2563eb, #3b82f6);
          box-shadow: 0 6px 16px rgba(37, 99, 235, 0.28);
        }
        .mb-cta-pill--sky {
          background-image: linear-gradient(135deg, #0ea5e9, #38bdf8);
          box-shadow: 0 6px 16px rgba(14, 165, 233, 0.28);
        }

        .mb-cta-pill-shine {
          position: absolute;
          top: 0; left: -130%;
          width: 55%; height: 100%;
          background: linear-gradient(115deg, transparent, rgba(255,255,255,0.5), transparent);
          transform: skewX(-20deg);
          z-index: 0;
          pointer-events: none;
          transition: left 0.6s ease;
        }
        .mb-cta-pill:hover .mb-cta-pill-shine { left: 140%; }

        .mb-cta-pill-icon {
          position: relative;
          z-index: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .mb-cta-pill-label {
          position: relative;
          z-index: 1;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .mb-cta-pill-arrow {
          position: relative;
          z-index: 1;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 18px;
          height: 18px;
          border-radius: 50%;
          background: rgba(255,255,255,0.2);
          flex-shrink: 0;
        }

        /* ============================================================
           STAGE / SCENE — fixed card sizing
           ============================================================ */
        .placedly-lift-hero-stage--liftoff {
          padding: 0 18px;
        }

        .placedly-lift-mobile-scene {
          position: relative;
          width: 100%;
          height: 220px;
          max-width: 480px;
          margin: 0 auto;
          border-radius: 18px;
          overflow: hidden;
          background: linear-gradient(135deg, #f8faff, #f0f7ff);
          border: 1px solid #eef2f9;
        }

        /* Scatter avatars (bokeh) */
        .placedly-lift-mobile-bokeh {
          position: absolute;
          border-radius: 50%;
          overflow: hidden;
        }
        .placedly-lift-mobile-bokeh img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          border-radius: 50%;
          border: 1.5px solid #fff;
          box-shadow: 0 2px 6px rgba(0,0,0,0.12);
          display: block;
        }
        .placedly-lift-mobile-bokeh.is-center img {
          border: 2.5px solid #fff;
          box-shadow: 0 5px 16px rgba(37,99,235,0.30);
        }
        .placedly-lift-mobile-bokeh.is-blur img {
          filter: blur(1.5px);
          opacity: 0.7;
        }

        /* ============================================================
           PROFILE CARDS — compact, height locked
           This is the key fix: the cards were stretching to fill
           the scene because they had no height set.
         ============================================================ */
        .placedly-lift-card--mobile {
          position: absolute;
          background: #ffffff;
          border-radius: 11px;
          padding: 7px 9px;
          box-shadow: 0 6px 16px rgba(15, 23, 42, 0.10);
          border: 1px solid rgba(15, 23, 42, 0.06);
          z-index: 10;
          width: 122px;
          height: 56px;       /* ← FIX: explicit height so card stays compact */
          overflow: hidden;   /* ← FIX: prevent any overflow from stretching the card */
        }
        .placedly-lift-card--mobile-left {
          left: 2%;
          bottom: 18%;
        }
        .placedly-lift-card--mobile-right {
          right: 2%;
          top: 38%;
        }
        .placedly-lift-card-profile {
          display: flex;
          align-items: center;
          gap: 6px;
          margin-bottom: 3px;
        }
        .placedly-lift-avatar--photo {
          width: 24px;
          height: 24px;
          border-radius: 50%;
          object-fit: cover;
          flex-shrink: 0;
          background: #f1f5f9;
        }
        .placedly-lift-card-identity { 
          min-width: 0; 
          flex: 1;
        }
        .placedly-lift-name {
          font-size: 11px;
          color: #0f172a;
          margin: 0;
          line-height: 1.1;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .placedly-lift-role {
          font-size: 9px;
          color: #64748b;
          margin: 0;
          line-height: 1.2;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .placedly-lift-card-line {
          font-size: 10px;
          color: #475569;
          margin: 0;
          line-height: 1.3;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .placedly-lift-card-line strong {
          color: #2563eb;
        }

        /* ============================================================
           RECOMMENDED PILL
           ============================================================ */
        .placedly-lift-mobile-rec {
          position: absolute;
          top: 6%;
          right: 4%;
          display: inline-flex;
          align-items: center;
          gap: 5px;
          background: #ffffff;
          border: 1px solid #dbeafe;
          border-radius: 999px;
          padding: 4px 10px 4px 6px;
          box-shadow: 0 3px 10px rgba(37, 99, 235, 0.10);
          z-index: 9;
          white-space: nowrap;
        }
        .placedly-lift-mobile-rec > svg {
          color: #2563eb;
          flex-shrink: 0;
        }
        .placedly-lift-mobile-rec-text {
          display: flex;
          flex-direction: column;
          line-height: 1.1;
        }
        .placedly-lift-mobile-rec-text strong {
          font-size: 9.5px;
          color: #2563eb;
        }
        .placedly-lift-mobile-rec-text span {
          font-size: 10.5px;
          color: #0f172a;
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

      {/* ── 3 CTA pills ── */}
      <div className="mb-cta-row">
        {HERO_CTAS.map((cta, i) => (
          <MobileCtaPill
            key={cta.id}
            href={cta.href}
            label={cms[cta.cmsKey] ?? cta.fallback}
            icon={cta.icon}
            shade={cta.shade}
            delay={0.16 + i * 0.06}
          />
        ))}
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
            className="placedly-lift-card--mobile placedly-lift-card--mobile-left"
            animate={{ y: [0, -5, 0] }}
            transition={{ duration: 5.5, repeat: Infinity, ease: 'easeInOut' }}
          >
            <div className="placedly-lift-card-profile">
              <img
                src={HERO_CARD_AVATARS.left}
                alt=""
                className="placedly-lift-avatar--photo"
                width={24}
                height={24}
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
            className="placedly-lift-card--mobile placedly-lift-card--mobile-right"
            animate={{ y: [0, 5, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut', delay: 0.4 }}
          >
            <div className="placedly-lift-card-profile">
              <img
                src={HERO_CARD_AVATARS.right}
                alt=""
                className="placedly-lift-avatar--photo"
                width={24}
                height={24}
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