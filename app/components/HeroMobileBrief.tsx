'use client';

import { motion } from 'framer-motion';
import { Briefcase, Building2, Globe, ArrowRight, ShieldCheck, Users, Award, type LucideIcon } from 'lucide-react';
import Link from 'next/link';
import HeroGradientBg from './HeroGradientBg';
import HeroBgVideo from './HeroBgVideo';

type HeroCms = { [k: string]: string };

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
   HeroStatCard (mobile) — same markup/classes as the desktop
   pill bar so it inherits the identical styling
════════════════════════════════════════════════════════ */
function HeroStatCard({
  icon: Icon,
  value,
  label,
  delay = 0,
  isLast = false,
}: {
  icon: LucideIcon;
  value: string;
  label: string;
  delay?: number;
  isLast?: boolean;
}) {
  return (
    <motion.div
      className={`placedly-hero-stat-card${isLast ? '' : ' placedly-hero-stat-card--divider'}`}
      initial={{ opacity: 0, y: 10, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.4, delay }}
    >
      <span className="placedly-hero-stat-card-icon">
        <Icon size={14} strokeWidth={2.1} />
      </span>
      <span className="placedly-hero-stat-card-text">
        <strong className="placedly-hero-stat-card-value">{value}</strong>
        <span className="placedly-hero-stat-card-label">{label}</span>
      </span>
    </motion.div>
  );
}

export default function HeroMobileBrief({ cms = {} }: { cms?: HeroCms }) {
  return (
    <div className="placedly-hero-mobile-brief" aria-label="Mobile hero">
      <HeroGradientBg src="/images/hero-liftoff-bg3.webp" />
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

      {/* Empty stage — keeps the original mobile hero rhythm/spacing
          (same size as the removed pop-up cards) */}
      <motion.div
        className="placedly-lift-hero-stage placedly-lift-hero-stage--liftoff"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55, delay: 0.18 }}
      >
        <div className="placedly-lift-mobile-scene" aria-hidden />
      </motion.div>

      {/* ── Stats bar — same style as desktop ── */}
      <div className="placedly-hero-stats-wrap">
        <div className="placedly-hero-stats-label" aria-hidden>
          <span className="placedly-hero-stats-label-line" />
          <span className="placedly-hero-stats-label-text">Trusted by professionals</span>
          <span className="placedly-hero-stats-label-line" />
        </div>
        <div className="placedly-hero-stats-bar">
          {HERO_STATS.map((stat, i) => (
            <HeroStatCard
              key={stat.label}
              icon={stat.icon}
              value={cms[`hp:stat${i + 1}Num`] ?? stat.value}
              label={cms[`hp:stat${i + 1}Label`] ?? stat.label}
              delay={0.1 + i * 0.06}
              isLast={i === HERO_STATS.length - 1}
            />
          ))}
        </div>
      </div>

      <style>{`
        /* Mobile-only tightening for the CTA row so it doesn't
           fight the headline/subline rhythm on small screens.
           Compound selector (two classes) beats the global
           ".placedly-lift-hero-ctas { flex-direction: column }"
           rule from Hero.tsx regardless of DOM order. */
        .placedly-liftoff-m-ctas.placedly-lift-hero-ctas {
          margin-top: 16px;
          flex-direction: row !important;
          flex-wrap: nowrap;
          justify-content: center;
          gap: 6px;
          max-width: 360px;
          width: 100%;
          margin-left: auto;
          margin-right: auto;
        }
        .placedly-liftoff-m-ctas.placedly-lift-hero-ctas .placedly-hero-cta-pill {
          width: auto !important;
          flex: 1 1 0;
          min-width: 0;
          padding: 7px 9px 7px 7px !important;
          font-size: 9.5px;
          justify-content: center;
        }
        .placedly-liftoff-m-ctas .placedly-hero-cta-pill-icon {
          width: 16px;
          height: 16px;
        }
        .placedly-liftoff-m-ctas .placedly-hero-cta-pill-label {
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .placedly-liftoff-m-ctas .placedly-hero-cta-pill-arrow {
          width: 12px;
          height: 12px;
        }
        @media (max-width: 360px) {
          .placedly-liftoff-m-ctas.placedly-lift-hero-ctas .placedly-hero-cta-pill {
            padding: 6px 6px 6px 6px !important;
            font-size: 8.5px;
          }
          .placedly-liftoff-m-ctas .placedly-hero-cta-pill-icon {
            width: 14px;
            height: 14px;
          }
        }

        /* ── Popup cards: contain text inside the rounded card
           instead of letting it overflow past the edges.
           Sized up + set to 85% opacity per latest feedback. ── */
        .placedly-lift-hero .placedly-lift-card--mobile {
          box-sizing: border-box !important;
          overflow: hidden !important;
          max-width: 172px !important;
          padding: 10px 13px !important;
          opacity: 0.85 !important;
        }
        .placedly-lift-hero .placedly-lift-card--mobile .placedly-lift-card-profile {
          gap: 7px !important;
          margin-bottom: 5px !important;
        }
        .placedly-lift-hero .placedly-lift-card--mobile .placedly-lift-avatar--photo {
          width: 32px !important;
          height: 32px !important;
        }
        .placedly-lift-hero .placedly-lift-card--mobile .placedly-lift-name {
          font-size: 14.5px !important;
          line-height: 1.25 !important;
          white-space: nowrap !important;
          overflow: hidden !important;
          text-overflow: ellipsis !important;
          max-width: 118px !important;
        }
        .placedly-lift-hero .placedly-lift-card--mobile .placedly-lift-role {
          font-size: 12px !important;
          line-height: 1.25 !important;
          white-space: nowrap !important;
          overflow: hidden !important;
          text-overflow: ellipsis !important;
          max-width: 118px !important;
        }
        .placedly-lift-hero .placedly-lift-card--mobile .placedly-lift-card-line {
          font-size: 12.5px !important;
          line-height: 1.4 !important;
          white-space: normal !important;
          word-break: break-word !important;
          overflow-wrap: break-word !important;
          margin: 0 !important;
        }

        /* ── Stats bar — desktop style, compact for phones ── */
        .placedly-hero-stats-wrap {
          margin: 16px auto 0;
          padding: 0 16px;
          max-width: 520px;
          width: 100%;
        }
        .placedly-hero-stats-bar {
          padding: 5px;
          border-radius: 9999px !important;
        }
        .placedly-hero-stat-card {
          gap: 6px;
          padding: 8px 6px;
        }
        .placedly-hero-stat-card-icon {
          width: 24px;
          height: 24px;
        }
        .placedly-hero-stat-card-value {
          font-size: 13px !important;
        }
        .placedly-hero-stat-card-label {
          font-size: 8.5px !important;
        }
      `}</style>
    </div>
  );
}
