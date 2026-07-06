'use client';

import { motion } from 'framer-motion';
import {
  Share2,
  Sparkles,
  Briefcase,
  Building2,
  Globe,
  ShieldCheck,
  Users,
  Award,
  ArrowRight,
  type LucideIcon,
} from 'lucide-react';
import Link from 'next/link';
import HeroGradientBg from './HeroGradientBg';
import HeroMobileBrief from './HeroMobileBrief';
import HeroBgVideo from './HeroBgVideo';
import HiringPartnersMarquee from './HiringPartnersMarquee';

type HeroCms = { [k: string]: string };

const GEOM_FONT_STACK = `"Outfit", "Poppins", "Inter", "Manrope", "Geist", "Plus Jakarta Sans", -apple-system, BlinkMacSystemFont, "Segoe UI", system-ui, sans-serif`;

const ORANGE        = '#f97316';
const ORANGE_DARK   = '#ea580c';
const ORANGE_SOFT   = 'rgba(249, 115, 22, 0.12)';
const ORANGE_BORDER = 'rgba(249, 115, 22, 0.30)';
const BLACK         = '#0b0d20';
const TEXT_BODY     = '#1e293b';
const TEXT_MUTED    = '#64748b';
const BORDER        = '#e5e7eb';
const SURFACE       = '#ffffff';

const SCATTER_AVATARS = [
  { src: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=128&h=128&fit=crop&crop=face', top: '0%',  left: '0%',  size: 46, badge: false },
  { src: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=128&h=128&fit=crop&crop=face', top: '2%',  left: '72%', size: 44, badge: true  },
  { src: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=128&h=128&fit=crop&crop=face', top: '38%', left: '6%',  size: 50, badge: true  },
  { src: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=128&h=128&fit=crop&crop=face', top: '70%', left: '0%',  size: 44, badge: false },
  { src: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=128&h=128&fit=crop&crop=face', top: '66%', left: '74%', size: 48, badge: true  },
] as const;

const HERO_CARD_AVATARS = {
  left:  'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=96&h=96&fit=crop&crop=face',
  right: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=96&h=96&fit=crop&crop=face',
} as const;

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

const HERO_STATS = [
  { icon: ShieldCheck, value: '40+',  label: 'Companies Trusted Us' },
  { icon: Users,       value: '1K+',  label: 'Candidates Placed'    },
  { icon: Globe,       value: '20+',  label: 'Countries'            },
  { icon: Award,       value: '10+',  label: 'Years Experience'     },
] as const;

/* ════════════════════════════════════════════════════════
   HeroCtaPill
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
      whileHover={{ y: -3, scale: 1.02 }}
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
   HeroStatCard — improved card style with dividers
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
      initial={{ opacity: 0, y: 14, scale: 0.95 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.4, delay }}
      whileHover={{ y: -2 }}
    >
      {/* icon badge */}
      <span className="placedly-hero-stat-card-icon">
        <Icon size={16} strokeWidth={2.1} />
      </span>

      {/* text */}
      <span className="placedly-hero-stat-card-text">
        <strong className="placedly-hero-stat-card-value">{value}</strong>
        <span  className="placedly-hero-stat-card-label">{label}</span>
      </span>
    </motion.div>
  );
}

/* ════════════════════════════════════════════════════════
   Main Hero
════════════════════════════════════════════════════════ */
export default function Hero({ cms = {} }: { cms?: HeroCms }) {
  const offerRole      = cms['hp:heroOfferRole']      ?? 'Senior Claims Analyst';
  const admitProgramme = cms['hp:heroAdmitProgramme'] ?? "MSc International Business · Fall '25";

  return (
    <section id="Top" className="placedly-lift-hero">
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;600;700;800&family=Poppins:wght@400;500;600;700;800&family=Inter:wght@400;500;600;700;800&family=Manrope:wght@400;500;600;700;800&family=Geist:wght@400;500;600;700;800&family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap"
      />

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;600;700;800&family=Poppins:wght@400;500;600;700;800&family=Inter:wght@400;500;600;700;800&family=Manrope:wght@400;500;600;700;800&family=Geist:wght@400;500;600;700;800&family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');

        /* ── Font ── */
        .placedly-lift-hero,
        .placedly-lift-hero *,
        .placedly-lift-hero h1,
        .placedly-lift-hero h2,
        .placedly-lift-hero h3,
        .placedly-lift-hero h4,
        .placedly-lift-hero h5,
        .placedly-lift-hero h6,
        .placedly-lift-hero p,
        .placedly-lift-hero span,
        .placedly-lift-hero a,
        .placedly-lift-hero button,
        .placedly-lift-hero strong,
        .placedly-lift-hero small,
        .placedly-lift-hero em,
        .placedly-lift-hero b {
          font-family: ${GEOM_FONT_STACK} !important;
          font-feature-settings: "ss01","cv11","cv02" !important;
          font-optical-sizing: auto !important;
          letter-spacing: -0.011em !important;
        }

        .placedly-lift-hero-title,
        .placedly-lift-hero h1.placedly-lift-hero-title {
          font-weight: 700 !important;
          letter-spacing: -0.028em !important;
        }
        .placedly-lift-hero-sub  { font-weight: 400 !important; letter-spacing: -0.012em !important; }
        .placedly-hero-cta-pill  { font-weight: 600 !important; letter-spacing: -0.005em !important; }
        .placedly-lift-name      { font-weight: 700 !important; letter-spacing: -0.015em !important; }
        .placedly-lift-role      { font-weight: 500 !important; letter-spacing: -0.003em !important; }
        .placedly-lift-card-line { font-weight: 500 !important; letter-spacing: -0.008em !important; }
        .placedly-lift-card-line strong { font-weight: 700 !important; }
        .placedly-lift-glass-pill-text strong { font-weight: 700 !important; }
        .placedly-lift-glass-pill-text span   { font-weight: 500 !important; }

        /* ── Orange CTA pill ── */
        .placedly-lift-hero-ctas {
          display: flex;
          align-items: stretch;
          gap: 10px;
          flex-wrap: wrap;
          max-width: 520px;
          margin: 0 auto;
        }
        .placedly-hero-cta-pill {
          position: relative;
          display: inline-flex;
          align-items: center;
          gap: 6px;
          width: auto !important;
          min-width: 0;
          padding: 6px 12px 6px 6px;
          border-radius: 999px;
          font-size: 11px;
          text-decoration: none;
          color: #ffffff;
          border: 1px solid rgba(255,255,255,0.18);
          overflow: hidden;
          isolation: isolate;
          cursor: pointer;
          white-space: nowrap;
          transition: box-shadow 0.28s cubic-bezier(0.22,1,0.36,1), filter 0.28s ease;
          background-image: linear-gradient(135deg, #f97316, #ea580c) !important;
          box-shadow:
            0 6px 16px rgba(249,115,22,0.38),
            inset 0 1px 0 rgba(255,255,255,0.18) !important;
        }
        .placedly-hero-cta-pill:hover {
          box-shadow:
            0 10px 22px rgba(249,115,22,0.48),
            inset 0 1px 0 rgba(255,255,255,0.22) !important;
        }
        .placedly-hero-cta-pill:active { filter: brightness(0.94); }

        .placedly-hero-cta-pill-shine {
          position: absolute; top: 0; left: -130%;
          width: 55%; height: 100%;
          background: linear-gradient(115deg, transparent, rgba(255,255,255,0.35), transparent);
          transform: skewX(-20deg);
          transition: left 0.6s ease;
          z-index: 0; pointer-events: none;
        }
        .placedly-hero-cta-pill:hover .placedly-hero-cta-pill-shine { left: 140%; }

        .placedly-hero-cta-pill-icon {
          position: relative; z-index: 1;
          display: inline-flex; align-items: center; justify-content: center;
          width: 20px; height: 20px; border-radius: 50%;
          background: rgba(255,255,255,0.18); flex-shrink: 0;
        }
        .placedly-hero-cta-pill-label { position: relative; z-index: 1; overflow: hidden; text-overflow: ellipsis; }
        .placedly-hero-cta-pill-arrow {
          position: relative; z-index: 1;
          display: inline-flex; align-items: center; justify-content: center;
          width: 14px; height: 14px; border-radius: 50%;
          background: rgba(255,255,255,0.18); margin-left: auto; flex-shrink: 0;
        }

        @media (max-width: 640px) {
          .placedly-lift-hero-ctas { flex-direction: column; max-width: 360px; }
          .placedly-hero-cta-pill  { width: 100% !important; justify-content: center; }
        }

        /* ── Stage / Network ── */
        .placedly-lift-hero-stage { margin-bottom: 0 !important; padding-bottom: 0 !important; }
        .placedly-lift-network    { margin-bottom: 0 !important; padding-bottom: 0 !important; }

        /* ════════════════════════════════════════════════
           ★ IMPROVED STATS BAR
           White card, orange accents, clean dividers,
           pill-shaped container — consistent with site theme
        ════════════════════════════════════════════════ */
        .placedly-hero-stats-wrap {
          /* sits between network and marquee with clear breathing room */
          margin: clamp(28px, 4vw, 44px) auto 0;
          padding: 0 clamp(16px, 4vw, 24px);
          max-width: 880px;
          width: 100%;
        }

        /* label row above bar */
        .placedly-hero-stats-label {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          margin-bottom: 12px;
        }
        .placedly-hero-stats-label-line {
          flex: 1;
          height: 1px;
          background: linear-gradient(90deg, transparent, ${ORANGE_BORDER}, transparent);
          max-width: 120px;
        }
        .placedly-hero-stats-label-text {
          font-size: 10px !important;
          font-weight: 700 !important;
          text-transform: uppercase;
          letter-spacing: 0.14em !important;
          color: ${TEXT_MUTED} !important;
          white-space: nowrap;
        }

        /* pill-shaped stats container */
        .placedly-hero-stats-bar {
          display: flex;
          align-items: stretch;
          justify-content: center;
          background: #ffffff;
          border: 1.5px solid ${ORANGE_BORDER};
          border-radius: 9999px;
          box-shadow:
            0 4px 20px rgba(249,115,22,0.10),
            0 1px 4px rgba(15,23,42,0.05);
          overflow: hidden;
          isolation: isolate;
          padding: 6px;
          gap: 0;
          width: 100%;
        }

        /* each stat cell */
        .placedly-hero-stat-card {
          position: relative;
          display: flex;
          align-items: center;
          gap: 9px;
          flex: 1 1 0;
          min-width: 0;
          padding: 10px 18px;
          border-radius: 9999px;
          cursor: default;
          transition: background 0.25s ease, transform 0.25s ease;
        }
        .placedly-hero-stat-card:hover {
          background: rgba(249,115,22,0.06);
        }

        /* vertical divider between cells */
        .placedly-hero-stat-card--divider::after {
          content: '';
          position: absolute;
          right: 0;
          top: 20%;
          height: 60%;
          width: 1px;
          background: ${ORANGE_BORDER};
          border-radius: 1px;
        }

        /* icon circle */
        .placedly-hero-stat-card-icon {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 32px;
          height: 32px;
          border-radius: 50%;
          flex-shrink: 0;
          background: linear-gradient(135deg,
            rgba(249,115,22,0.12) 0%,
            rgba(249,115,22,0.06) 100%);
          border: 1.5px solid ${ORANGE_BORDER};
          color: ${ORANGE};
          transition: transform 0.25s cubic-bezier(0.22,1,0.36,1),
                      box-shadow 0.25s ease;
        }
        .placedly-hero-stat-card:hover .placedly-hero-stat-card-icon {
          transform: scale(1.1) rotate(-4deg);
          box-shadow: 0 4px 12px rgba(249,115,22,0.22);
        }

        /* text stack */
        .placedly-hero-stat-card-text {
          display: flex;
          flex-direction: column;
          gap: 1px;
          min-width: 0;
          flex: 1;
        }
        .placedly-hero-stat-card-value {
          font-size: clamp(14px, 1.4vw, 16px) !important;
          font-weight: 800 !important;
          letter-spacing: -0.025em !important;
          color: ${ORANGE} !important;
          line-height: 1.1;
          display: block;
        }
        .placedly-hero-stat-card-label {
          font-size: clamp(9.5px, 0.85vw, 11px) !important;
          font-weight: 500 !important;
          letter-spacing: 0.01em !important;
          color: ${TEXT_MUTED} !important;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          display: block;
        }

        /* ── responsive ── */
        @media (min-width: 900px) {
          .placedly-hero-stat-card { padding: 10px 22px; }
        }
        @media (max-width: 720px) {
          .placedly-hero-stats-bar  { border-radius: 20px; padding: 6px; }
          .placedly-hero-stat-card  { flex: 1 1 calc(50% - 6px); padding: 10px 12px; }
          /* hide divider on right of 2nd cell (row break) */
          .placedly-hero-stat-card:nth-child(2)::after { display: none; }
          .placedly-hero-stat-card--divider::after { top: 15%; height: 70%; }
        }
        @media (max-width: 420px) {
          .placedly-hero-stats-bar { border-radius: 16px; }
          .placedly-hero-stat-card { flex: 1 1 100%; padding: 10px 14px; }
          .placedly-hero-stat-card--divider::after { display: none; }
          /* horizontal divider instead */
          .placedly-hero-stat-card--divider::before {
            content: '';
            position: absolute;
            bottom: 0; left: 12%; width: 76%; height: 1px;
            background: ${ORANGE_BORDER};
          }
        }

        /* ════════════════════════════════════════════════
           ★ MARQUEE SLOT — clear gap above marquee
        ════════════════════════════════════════════════ */
        .placedly-hero-marquee-slot {
          margin-top: clamp(32px, 5vw, 52px);
          padding: 0;
          width: 100%;
        }

        /* ── Popup cards ── */
        .placedly-lift-card--left,
        .placedly-lift-card--right {
          opacity: 0.7 !important;
          transition: opacity 0.2s ease, transform 0.2s ease, box-shadow 0.2s ease !important;
        }
        .placedly-lift-card--left:hover,
        .placedly-lift-card--right:hover {
          opacity: 0.95 !important;
          transform: translateY(-2px) !important;
          box-shadow: 0 8px 24px rgba(15,23,42,0.10) !important;
        }
        .placedly-lift-hero .placedly-lift-card         { padding: 10px 14px !important; }
        .placedly-lift-hero .placedly-lift-card-profile  { margin-bottom: 6px !important; }
        .placedly-lift-hero .placedly-lift-avatar--photo { width: 38px !important; height: 38px !important; }
        .placedly-lift-hero .placedly-lift-name          { font-size: 13px !important; margin: 0 !important; }
        .placedly-lift-hero .placedly-lift-role          { font-size: 11px !important; margin: 0 !important; }
        .placedly-lift-hero .placedly-lift-card-line     { font-size: 11.5px !important; margin: 0 !important; }
      `}</style>

      {/* backgrounds */}
      <div className="placedly-hero-desktop-gradient" aria-hidden>
        <HeroGradientBg />
        <HeroBgVideo />
      </div>

      <div className="placedly-hero-desktop-only">

        {/* ── Copy ── */}
        <div className="placedly-lift-hero-copy">
          <motion.h1
            className="placedly-lift-hero-title"
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55 }}
          >
            Grow your career,
            <br />
            through people you trust.
          </motion.h1>

          <motion.p
            className="placedly-lift-hero-sub"
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.08 }}
          >
            {cms['hp:heroSubline'] ?? 'Career Placement & Global Education Consultancy — Delhi NCR.'}
          </motion.p>

          <div className="placedly-lift-hero-ctas">
            {HERO_CTAS.map((cta, i) => (
              <HeroCtaPill
                key={cta.id}
                href={cta.href}
                label={cms[cta.cmsKey] ?? cta.fallback}
                icon={cta.icon}
                delay={0.16 + i * 0.07}
              />
            ))}
          </div>
        </div>

        {/* ── Network / Stage ── */}
        <motion.div
          className="placedly-lift-hero-stage"
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, delay: 0.28 }}
        >
          <div className="placedly-lift-network">
            {/* left card */}
            <motion.div
              className="placedly-lift-card placedly-lift-card--left"
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 5.5, repeat: Infinity, ease: 'easeInOut' }}
            >
              <div className="placedly-lift-card-profile">
                <img
                  src={HERO_CARD_AVATARS.left}
                  alt=""
                  className="placedly-lift-avatar placedly-lift-avatar--photo"
                  width={48} height={48}
                  loading="lazy" decoding="async"
                />
                <div className="placedly-lift-card-identity">
                  <p className="placedly-lift-name">{cms['hp:heroOfferName'] ?? 'Priya'}</p>
                  <p className="placedly-lift-role">CAP · India careers</p>
                </div>
              </div>
              <p className="placedly-lift-card-line">
                Targeting <strong>{offerRole}</strong>
              </p>
            </motion.div>

            {/* scatter */}
            <div className="placedly-lift-connect" aria-hidden>
              <div className="placedly-lift-scatter">
                {SCATTER_AVATARS.map((person, i) => (
                  <div
                    key={person.src}
                    className="placedly-lift-scatter-avatar-wrap"
                    style={{
                      top: person.top, left: person.left,
                      width: person.size, height: person.size,
                      zIndex: i + 1,
                    }}
                  >
                    <img
                      src={person.src} alt=""
                      className="placedly-lift-scatter-avatar"
                      width={person.size} height={person.size}
                      loading="lazy" decoding="async"
                    />
                    {person.badge && (
                      <span className="placedly-lift-scatter-badge">
                        <Share2 size={11} strokeWidth={2.5} />
                      </span>
                    )}
                  </div>
                ))}

                <div className="placedly-lift-glass-pill placedly-lift-glass-pill--share">
                  <span className="placedly-lift-glass-pill-icon">
                    <Share2 size={14} strokeWidth={2.25} />
                  </span>
                  <span className="placedly-lift-glass-pill-text">
                    <strong>Shared</strong>
                    <span>CAP roadmap</span>
                  </span>
                </div>

                <div className="placedly-lift-glass-pill placedly-lift-glass-pill--rec">
                  <span className="placedly-lift-glass-pill-icon">
                    <Sparkles size={14} strokeWidth={2.25} />
                  </span>
                  <span className="placedly-lift-glass-pill-text">
                    <strong>Recommended</strong>
                    <span>Admit path</span>
                  </span>
                </div>
              </div>
            </div>

            {/* right card */}
            <motion.div
              className="placedly-lift-card placedly-lift-card--right"
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut', delay: 0.4 }}
            >
              <div className="placedly-lift-card-profile">
                <img
                  src={HERO_CARD_AVATARS.right}
                  alt=""
                  className="placedly-lift-avatar placedly-lift-avatar--photo"
                  width={48} height={48}
                  loading="lazy" decoding="async"
                />
                <div className="placedly-lift-card-identity">
                  <p className="placedly-lift-name">{cms['hp:heroAdmitName'] ?? 'Arjun'}</p>
                  <p className="placedly-lift-role">Study abroad track</p>
                </div>
              </div>
              <p className="placedly-lift-card-line">
                Interested in{' '}
                <strong>{admitProgramme.split('·')[0]?.trim() ?? 'UK Masters'}</strong>
              </p>
            </motion.div>
          </div>
        </motion.div>

        {/* ════════════════════════════════════════
            ★ STATS BAR — improved with label row
        ════════════════════════════════════════ */}
        <div className="placedly-hero-stats-wrap">
          {/* decorative label above bar */}
          <div className="placedly-hero-stats-label" aria-hidden>
            <span className="placedly-hero-stats-label-line" />
            <span className="placedly-hero-stats-label-text">Trusted by professionals</span>
            <span className="placedly-hero-stats-label-line" />
          </div>

          {/* pill bar */}
          <div className="placedly-hero-stats-bar">
            {HERO_STATS.map((stat, i) => (
              <HeroStatCard
                key={stat.label}
                icon={stat.icon}
                value={stat.value}
                label={stat.label}
                delay={i * 0.08}
                isLast={i === HERO_STATS.length - 1}
              />
            ))}
          </div>
        </div>
      </div>

      {/* ════════════════════════════════════════
          ★ MARQUEE — clear gap above, full width
      ════════════════════════════════════════ */}
      <div className="placedly-hero-marquee-slot">
        <HiringPartnersMarquee cms={cms} />
      </div>

      <HeroMobileBrief cms={cms} />
    </section>
  );
}