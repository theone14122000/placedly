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

/* Modern geometric sans-serif stack — FORCED with !important */
const GEOM_FONT_STACK = `"Outfit", "Poppins", "Inter", "Manrope", "Geist", "Plus Jakarta Sans", -apple-system, BlinkMacSystemFont, "Segoe UI", system-ui, sans-serif`;

/* ════════════════════════════════════════════════════════════
   Theme tokens — match mobile for consistency
════════════════════════════════════════════════════════════ */
const ORANGE        = '#f97316';
const ORANGE_DARK   = '#ea580c';
const ORANGE_SOFT   = 'rgba(249, 115, 22, 0.12)';
const ORANGE_BORDER = 'rgba(249, 115, 22, 0.30)';
const BLACK         = '#0b0d20';
const TEXT_BODY     = '#1e293b';
const TEXT_MUTED    = '#64748b';
const BORDER        = '#e5e7eb';
const SURFACE       = '#ffffff';

/** Static portrait URLs — loose zig-zag spacing like reference hero */
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

/* ─── 3 CTA pills — ORANGE gradient ─── */
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

/* ─── ONE stats bar (4 cells, single row) ─── */
const HERO_STATS = [
  { icon: ShieldCheck, value: '40+',  label: 'Companies Trusted Us' },
  { icon: Users,       value: '1K+',  label: 'Candidates Placed' },
  { icon: Globe,       value: '20+',  label: 'Countries' },
  { icon: Award,       value: '10+',  label: 'Years Experience' },
] as const;

/* ════════════════════════════════════════════════════════════
   HeroCtaPill — orange gradient button
════════════════════════════════════════════════════════════ */
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

/* ════════════════════════════════════════════════════════════
   HeroStatPill — single combined stats bar cell
   Uses ORANGE theme (matches mobile)
════════════════════════════════════════════════════════════ */
function HeroStatPill({
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
      className="placedly-hero-stat-pill"
      initial={{ opacity: 0, y: 14, scale: 0.95 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.4, delay }}
      whileHover={{ y: -3 }}
    >
      <span className="placedly-hero-stat-pill-shine" aria-hidden />
      <span className="placedly-hero-stat-pill-icon">
        <Icon size={15} strokeWidth={2.1} />
      </span>
      <span className="placedly-hero-stat-pill-text">
        <strong>{value}</strong>
        <span>{label}</span>
      </span>
    </motion.div>
  );
}

/* ════════════════════════════════════════════════════════════
   Main hero
════════════════════════════════════════════════════════════ */
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

        /* ============================================================
           FONT
         ============================================================ */
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
          font-feature-settings: "ss01", "cv11", "cv02" !important;
          font-optical-sizing: auto !important;
          letter-spacing: -0.011em !important;
        }

        .placedly-lift-hero-title,
        .placedly-lift-hero h1.placedly-lift-hero-title {
          font-weight: 700 !important;
          letter-spacing: -0.028em !important;
          font-family: ${GEOM_FONT_STACK} !important;
        }
        .placedly-lift-hero-sub {
          font-weight: 400 !important;
          letter-spacing: -0.012em !important;
          font-family: ${GEOM_FONT_STACK} !important;
        }
        .placedly-hero-cta-pill {
          font-weight: 600 !important;
          letter-spacing: -0.005em !important;
          font-family: ${GEOM_FONT_STACK} !important;
        }
        .placedly-lift-name {
          font-weight: 700 !important;
          letter-spacing: -0.015em !important;
          font-family: ${GEOM_FONT_STACK} !important;
        }
        .placedly-lift-role {
          font-weight: 500 !important;
          letter-spacing: -0.003em !important;
          font-family: ${GEOM_FONT_STACK} !important;
        }
        .placedly-lift-card-line {
          font-weight: 500 !important;
          letter-spacing: -0.008em !important;
          font-family: ${GEOM_FONT_STACK} !important;
        }
        .placedly-lift-card-line strong {
          font-weight: 700 !important;
          letter-spacing: -0.01em !important;
          font-family: ${GEOM_FONT_STACK} !important;
        }
        .placedly-lift-glass-pill-text strong {
          font-weight: 700 !important;
          letter-spacing: -0.008em !important;
          font-family: ${GEOM_FONT_STACK} !important;
        }
        .placedly-lift-glass-pill-text span {
          font-weight: 500 !important;
          letter-spacing: -0.003em !important;
          font-family: ${GEOM_FONT_STACK} !important;
        }
        .placedly-hero-stat-pill-text strong {
          font-weight: 800 !important;
          letter-spacing: -0.025em !important;
          font-family: ${GEOM_FONT_STACK} !important;
        }
        .placedly-hero-stat-pill-text span {
          font-weight: 500 !important;
          letter-spacing: -0.003em !important;
          font-family: ${GEOM_FONT_STACK} !important;
        }

        /* ============================================================
           ORANGE CTA PILL SYSTEM (same as mobile)
         ============================================================ */
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
        }

        .placedly-hero-cta-pill {
          background-image: linear-gradient(135deg, #f97316, #ea580c) !important;
          box-shadow:
            0 6px 16px rgba(249, 115, 22, 0.38),
            inset 0 1px 0 rgba(255, 255, 255, 0.18) !important;
        }
        .placedly-hero-cta-pill:hover {
          box-shadow:
            0 10px 22px rgba(249, 115, 22, 0.48),
            inset 0 1px 0 rgba(255, 255, 255, 0.22) !important;
        }
        .placedly-hero-cta-pill:active { filter: brightness(0.94); }

        .placedly-hero-cta-pill-shine {
          position: absolute;
          top: 0; left: -130%;
          width: 55%; height: 100%;
          background: linear-gradient(115deg, transparent, rgba(255,255,255,0.35), transparent);
          transform: skewX(-20deg);
          transition: left 0.6s ease;
          z-index: 0;
          pointer-events: none;
        }
        .placedly-hero-cta-pill:hover .placedly-hero-cta-pill-shine { left: 140%; }

        .placedly-hero-cta-pill-icon {
          position: relative;
          z-index: 1;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 20px;
          height: 20px;
          border-radius: 50%;
          background: rgba(255,255,255,0.18);
          flex-shrink: 0;
        }
        .placedly-hero-cta-pill-label {
          position: relative;
          z-index: 1;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .placedly-hero-cta-pill-arrow {
          position: relative;
          z-index: 1;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 14px;
          height: 14px;
          border-radius: 50%;
          background: rgba(255,255,255,0.18);
          margin-left: auto;
          flex-shrink: 0;
        }

        @media (max-width: 640px) {
          .placedly-lift-hero-ctas {
            flex-direction: column;
            max-width: 360px;
          }
          .placedly-hero-cta-pill {
            width: 100% !important;
            justify-content: center;
          }
        }

        /* ============================================================
           STAGE / NETWORK
         ============================================================ */
        .placedly-lift-hero-stage {
          margin-bottom: 0 !important;
          padding-bottom: 0 !important;
        }
        .placedly-lift-network {
          margin-bottom: 0 !important;
          padding-bottom: 0 !important;
        }

        /* ============================================================
           ★ ONE STATS BAR — matches mobile (orange theme)
         ============================================================ */
        .placedly-hero-stats-bar {
          display: flex;
          flex-wrap: wrap;
          align-items: stretch;
          justify-content: center;
          gap: 0;
          margin: 32px auto 0 !important;
          max-width: 720px;
          width: max-content;
          max-width: calc(100% - 32px);
          padding: 5px;
          background: #ffffff;
          border: 1.5px solid ${ORANGE_BORDER};
          border-radius: 9999px;
          box-shadow: 0 4px 14px rgba(249, 115, 22, 0.10);
          overflow: hidden;
          isolation: isolate;
        }

        .placedly-hero-stats-tab-shine {
          position: absolute;
          top: 0; left: -130%;
          width: 60%; height: 100%;
          background: linear-gradient(115deg, transparent, rgba(249, 115, 22, 0.14), transparent);
          transform: skewX(-20deg);
          transition: left 0.8s ease;
          z-index: 0;
          pointer-events: none;
        }
        .placedly-hero-stats-bar:hover .placedly-hero-stats-tab-shine {
          left: 140% !important;
        }

        .placedly-hero-stat-pill {
          position: relative;
          z-index: 1;
          display: flex;
          align-items: center;
          gap: 8px;
          flex: 1 1 0;
          min-width: 0;
          padding: 6px 16px;
          border-radius: 9999px;
          cursor: default;
          transition: background 0.3s ease, transform 0.3s ease;
        }

        .placedly-hero-stat-pill:hover {
          background: rgba(249, 115, 22, 0.06) !important;
        }

        .placedly-hero-stat-pill-shine {
          position: absolute;
          top: 0; left: -130%;
          width: 60%; height: 100%;
          background: linear-gradient(115deg, transparent, rgba(249, 115, 22, 0.14), transparent);
          transform: skewX(-20deg);
          transition: left 0.8s ease;
          z-index: 0;
          pointer-events: none;
        }
        .placedly-hero-stat-pill:hover .placedly-hero-stat-pill-shine {
          left: 140% !important;
        }

        /* ★ orange icon circle (was blue) */
        .placedly-hero-stat-pill-icon {
          position: relative;
          z-index: 1;
          width: 26px;
          height: 26px;
          border-radius: 50%;
          flex-shrink: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          background: linear-gradient(135deg, rgba(249,115,22,0.10), rgba(249,115,22,0.04));
          border: 1.5px solid ${ORANGE_BORDER};
          color: ${ORANGE};
          transition: transform 0.3s cubic-bezier(0.22,1,0.36,1);
        }
        .placedly-hero-stat-pill:hover .placedly-hero-stat-pill-icon {
          transform: scale(1.08);
        }

        .placedly-hero-stat-pill-text {
          position: relative;
          z-index: 1;
          display: flex;
          flex-direction: column;
          line-height: 1.15;
          min-width: 0;
          flex: 1;
        }

        /* ★ orange value text (was dark blue) */
        .placedly-hero-stat-pill-text strong {
          font-size: 13.5px;
          color: ${ORANGE};
          font-weight: 800;
          letter-spacing: -0.01em;
        }
        .placedly-hero-stat-pill-text span {
          font-size: 10.5px;
          color: #64748b;
          font-weight: 500;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        @media (min-width: 900px) {
          .placedly-hero-stats-bar {
            flex-wrap: nowrap;
            max-width: 760px;
          }
          .placedly-hero-stat-pill {
            padding: 6px 20px;
          }
        }
        @media (max-width: 720px) {
          .placedly-hero-stats-bar {
            border-radius: 18px;
            padding: 8px;
          }
          .placedly-hero-stat-pill {
            flex: 1 1 calc(50% - 4px);
            padding: 6px 10px;
          }
        }
        @media (max-width: 420px) {
          .placedly-hero-stat-pill {
            flex: 1 1 100%;
            justify-content: center;
          }
        }

        /* ============================================================
           ★ POPUP CARDS — 70% opacity (matches mobile)
         ============================================================ */
        .placedly-lift-card--left,
        .placedly-lift-card--right {
          opacity: 0.7 !important;
          transition: opacity 0.2s ease, transform 0.2s ease, box-shadow 0.2s ease !important;
        }
        .placedly-lift-card--left:hover,
        .placedly-lift-card--right:hover {
          opacity: 0.95 !important;
          transform: translateY(-2px) !important;
          box-shadow: 0 8px 24px rgba(15, 23, 42, 0.10) !important;
        }

        .placedly-lift-hero .placedly-lift-card {
          padding: 10px 14px !important;
        }
        .placedly-lift-hero .placedly-lift-card-profile {
          margin-bottom: 6px !important;
        }
        .placedly-lift-hero .placedly-lift-avatar--photo {
          width: 38px !important;
          height: 38px !important;
        }
        .placedly-lift-hero .placedly-lift-name {
          font-size: 13px !important;
          margin: 0 !important;
        }
        .placedly-lift-hero .placedly-lift-role {
          font-size: 11px !important;
          margin: 0 !important;
        }
        .placedly-lift-hero .placedly-lift-card-line {
          font-size: 11.5px !important;
          margin: 0 !important;
        }
      `}</style>

      <div className="placedly-hero-desktop-gradient" aria-hidden>
        <HeroGradientBg />
        <HeroBgVideo />
      </div>
      <div className="placedly-hero-desktop-only">
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
            {cms['hp:heroSubline'] ??
              'Career Placement & Global Education Consultancy — Delhi NCR.'}
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

        <motion.div
          className="placedly-lift-hero-stage"
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, delay: 0.28 }}
        >
          <div className="placedly-lift-network">
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
                  width={48}
                  height={48}
                  loading="lazy"
                  decoding="async"
                />
                <div className="placedly-lift-card-identity">
                  <p className="placedly-lift-name">
                    {cms['hp:heroOfferName'] ?? 'Priya'}
                  </p>
                  <p className="placedly-lift-role">CAP · India careers</p>
                </div>
              </div>
              <p className="placedly-lift-card-line">
                Targeting <strong>{offerRole}</strong>
              </p>
            </motion.div>

            <div className="placedly-lift-connect" aria-hidden>
              <div className="placedly-lift-scatter">
                {SCATTER_AVATARS.map((person, i) => (
                  <div
                    key={person.src}
                    className="placedly-lift-scatter-avatar-wrap"
                    style={{
                      top: person.top,
                      left: person.left,
                      width: person.size,
                      height: person.size,
                      zIndex: i + 1,
                    }}
                  >
                    <img
                      src={person.src}
                      alt=""
                      className="placedly-lift-scatter-avatar"
                      width={person.size}
                      height={person.size}
                      loading="lazy"
                      decoding="async"
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
                  width={48}
                  height={48}
                  loading="lazy"
                  decoding="async"
                />
                <div className="placedly-lift-card-identity">
                  <p className="placedly-lift-name">
                    {cms['hp:heroAdmitName'] ?? 'Arjun'}
                  </p>
                  <p className="placedly-lift-role">Study abroad track</p>
                </div>
              </div>
              <p className="placedly-lift-card-line">
                Interested in <strong>{admitProgramme.split('·')[0]?.trim() ?? 'UK Masters'}</strong>
              </p>
            </motion.div>
          </div>
        </motion.div>

        {/* ★ ONE stats bar — matches mobile orange theme */}
        <div className="placedly-hero-stats-bar">
          {HERO_STATS.map((stat, i) => (
            <HeroStatPill
              key={stat.label}
              icon={stat.icon}
              value={stat.value}
              label={stat.label}
              delay={i * 0.08}
            />
          ))}
        </div>
      </div>

      {/* ★ Hiring partners marquee — with proper top spacing */}
      <div className="placedly-hero-marquee-slot">
        <HiringPartnersMarquee cms={cms} />
      </div>

      <HeroMobileBrief cms={cms} />
    </section>
  );
}