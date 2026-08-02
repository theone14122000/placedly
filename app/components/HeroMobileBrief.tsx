'use client';

import { motion } from 'framer-motion';
import { Sparkles, Briefcase, Building2, Globe, ArrowRight, ShieldCheck, Users, Award, type LucideIcon } from 'lucide-react';
import Link from 'next/link';
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

/** Same three CTAs as desktop Hero — kept in sync so mobile never falls behind */
const HERO_CTAS = [
  {
    id: 'candidates',
    icon: Briefcase,
    label: 'For Candidates',
    href: '/contact',
    cmsKey: 'hp:heroPrimaryCtaText',
    fallback: 'For Candidates',
  },
  {
    id: 'recruiters',
    icon: Building2,
    label: 'For Recruiters',
    href: '/recruiters',
    cmsKey: 'hp:heroRecruiterCtaText',
    fallback: 'For Recruiters',
  },
  {
    id: 'study',
    icon: Globe,
    label: 'Study Abroad',
    href: '/study-visa',
    cmsKey: 'hp:heroSecondaryCtaText',
    fallback: 'Study Abroad',
  },
] as const;

/** Same four trust stats as desktop Hero, laid out as a compact 2x2 grid on mobile */
const HERO_STATS = [
  { icon: ShieldCheck, value: '40+', label: 'Companies Trusted Us' },
  { icon: Users,       value: '1K+', label: 'Candidates Placed'    },
  { icon: Globe,       value: '20+', label: 'Countries'            },
  { icon: Award,       value: '10+', label: 'Years Experience'     },
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

/* ════════════════════════════════════════════════════════
   HeroCtaPill — identical markup/classes to desktop version
   so it inherits the orange gradient styling already
   injected by Hero.tsx's <style> block (shared parent scope)
════════════════════════════════════════════════════════ */
function HeroCtaPill({
  href,
  label,
  icon: Icon,
  delay = 0,
}: {
  href: string;
  label: string;
  icon: LucideIcon;
  delay?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, delay }}
      whileTap={{ scale: 0.97 }}
      style={{ flex: '0 0 auto' }}
    >
      <Link href={href} className="placedly-hero-cta-pill">
        <span className="placedly-hero-cta-pill-shine" aria-hidden />
        <span className="placedly-hero-cta-pill-icon">
          <Icon size={11} strokeWidth={2.15} />
        </span>
        <span className="placedly-hero-cta-pill-label">{label}</span>
        <motion.span
          className="placedly-hero-cta-pill-arrow"
          animate={{ x: [0, 3, 0] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut', delay: delay + 0.3 }}
        >
          <ArrowRight size={9} strokeWidth={2.5} />
        </motion.span>
      </Link>
    </motion.div>
  );
}

/* ════════════════════════════════════════════════════════
   HeroStatCard (mobile) — compact 2x2 grid cell, same
   orange/white treatment as the desktop pill bar
════════════════════════════════════════════════════════ */
function HeroStatCard({
  icon: Icon,
  value,
  label,
  delay = 0,
}: {
  icon: LucideIcon;
  value: string;
  label: string;
  delay?: number;
}) {
  return (
    <motion.div
      className="placedly-liftoff-m-stat-card"
      initial={{ opacity: 0, y: 10, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.4, delay }}
    >
      <span className="placedly-liftoff-m-stat-icon">
        <Icon size={14} strokeWidth={2.1} />
      </span>
      <span className="placedly-liftoff-m-stat-text">
        <strong className="placedly-liftoff-m-stat-value">{value}</strong>
        <span className="placedly-liftoff-m-stat-label">{label}</span>
      </span>
    </motion.div>
  );
}

export default function HeroMobileBrief({ cms = {} }: { cms?: HeroCms }) {
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

        {/* ── CTA buttons — brought over from desktop Hero ── */}
        <div className="placedly-lift-hero-ctas placedly-liftoff-m-ctas">
          {HERO_CTAS.map((cta, i) => (
            <HeroCtaPill
              key={cta.id}
              href={cta.href}
              label={cms[cta.cmsKey] ?? cta.fallback}
              icon={cta.icon}
              delay={0.14 + i * 0.07}
            />
          ))}
        </div>
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

      {/* ── Compact stats grid — mobile counterpart to desktop's stats bar ── */}
      <div className="placedly-liftoff-m-stats-wrap">
        <div className="placedly-liftoff-m-stats-label" aria-hidden>
          <span className="placedly-liftoff-m-stats-label-line" />
          <span className="placedly-liftoff-m-stats-label-text">Trusted by professionals</span>
          <span className="placedly-liftoff-m-stats-label-line" />
        </div>
        <div className="placedly-liftoff-m-stats">
          {HERO_STATS.map((stat, i) => (
            <HeroStatCard
              key={stat.label}
              icon={stat.icon}
              value={stat.value}
              label={stat.label}
              delay={0.1 + i * 0.06}
            />
          ))}
        </div>
      </div>

      <style>{`
        /* Mobile-only tightening for the CTA row so it doesn't
           fight the headline/subline rhythm on small screens */
        .placedly-liftoff-m-ctas {
          margin-top: 16px;
          justify-content: center;
        }
        @media (max-width: 640px) {
          .placedly-liftoff-m-ctas {
            max-width: 300px;
            margin-left: auto;
            margin-right: auto;
          }
        }

        /* ── Compact stats grid ── */
        .placedly-liftoff-m-stats-wrap {
          margin: 20px auto 0;
          padding: 0 16px;
          max-width: 360px;
          width: 100%;
        }
        .placedly-liftoff-m-stats-label {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          margin-bottom: 10px;
        }
        .placedly-liftoff-m-stats-label-line {
          flex: 1;
          height: 1px;
          background: linear-gradient(90deg, transparent, rgba(249,115,22,0.30), transparent);
          max-width: 60px;
        }
        .placedly-liftoff-m-stats-label-text {
          font-size: 9px !important;
          font-weight: 700 !important;
          text-transform: uppercase;
          letter-spacing: 0.12em !important;
          color: #64748b !important;
          white-space: nowrap;
        }
        .placedly-liftoff-m-stats {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 8px;
        }
        .placedly-liftoff-m-stat-card {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 10px 12px;
          border-radius: 14px;
          background: #ffffff;
          border: 1.5px solid rgba(249,115,22,0.30);
          box-shadow: 0 3px 12px rgba(249,115,22,0.08);
        }
        .placedly-liftoff-m-stat-icon {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 26px;
          height: 26px;
          border-radius: 50%;
          flex-shrink: 0;
          background: linear-gradient(135deg, rgba(249,115,22,0.12), rgba(249,115,22,0.06));
          border: 1.5px solid rgba(249,115,22,0.30);
          color: #f97316;
        }
        .placedly-liftoff-m-stat-text {
          display: flex;
          flex-direction: column;
          gap: 0px;
          min-width: 0;
        }
        .placedly-liftoff-m-stat-value {
          font-size: 13px !important;
          font-weight: 800 !important;
          letter-spacing: -0.02em !important;
          color: #f97316 !important;
          line-height: 1.15;
        }
        .placedly-liftoff-m-stat-label {
          font-size: 9.5px !important;
          font-weight: 500 !important;
          color: #64748b !important;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          display: block;
        }
      `}</style>
    </div>
  );
}
