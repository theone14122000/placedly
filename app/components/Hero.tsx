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
import HeroMobileBrief from './HeroMobileBrief';
import HeroGradientBg from './HeroGradientBg';
import HeroBgVideo from './HeroBgVideo';
import HiringPartnersMarquee from './HiringPartnersMarquee';

type HeroCms = { [k: string]: string };

/* Modern geometric sans-serif stack — FORCED with !important */
const GEOM_FONT_STACK = `"Outfit", "Poppins", "Inter", "Manrope", "Geist", "Plus Jakarta Sans", -apple-system, BlinkMacSystemFont, "Segoe UI", system-ui, sans-serif`;

/** Static portrait URLs — loose zig-zag spacing like reference hero */
const SCATTER_AVATARS = [
  {
    src: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=128&h=128&fit=crop&crop=face',
    top: '0%',
    left: '0%',
    size: 46,
    badge: false,
  },
  {
    src: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=128&h=128&fit=crop&crop=face',
    top: '2%',
    left: '72%',
    size: 44,
    badge: true,
  },
  {
    src: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=128&h=128&fit=crop&crop=face',
    top: '38%',
    left: '6%',
    size: 50,
    badge: true,
  },
  {
    src: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=128&h=128&fit=crop&crop=face',
    top: '70%',
    left: '0%',
    size: 44,
    badge: false,
  },
  {
    src: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=128&h=128&fit=crop&crop=face',
    top: '66%',
    left: '74%',
    size: 48,
    badge: true,
  },
] as const;

const HERO_CARD_AVATARS = {
  left: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=96&h=96&fit=crop&crop=face',
  right: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=96&h=96&fit=crop&crop=face',
} as const;

/* ─── 3 CTA pills — same blue family, distinct shades each ─── */
const HERO_CTAS = [
  {
    id: 'candidates',
    icon: Briefcase,
    label: 'For Candidates',
    href: '/contact',
    cmsKey: 'hp:heroPrimaryCtaText',
    fallback: 'For Candidates',
    shade: 'deep',
  },
  {
    id: 'recruiters',
    icon: Building2,
    label: 'For Recruiters',
    href: '/recruiters',
    cmsKey: 'hp:heroRecruiterCtaText',
    fallback: 'For Recruiters',
    shade: 'royal',
  },
  {
    id: 'study',
    icon: Globe,
    label: 'Study Abroad',
    href: '/study-visa',
    cmsKey: 'hp:heroSecondaryCtaText',
    fallback: 'Study Abroad',
    shade: 'sky',
  },
] as const;

/* ─── Stats bar — pill-shaped, sits beneath the video/stage section ─── */
const HERO_STATS = [
  { icon: ShieldCheck, value: '40+', label: 'Companies Trusted Us' },
  { icon: Users, value: '1K+', label: 'Candidates Placed' },
  { icon: Globe, value: '20+', label: 'Countries' },
  { icon: Award, value: '10+', label: 'Years Experience' },
] as const;

function HeroCtaPill({
  href,
  label,
  icon: Icon,
  shade,
  delay = 0,
}: {
  href: string;
  label: string;
  icon: LucideIcon;
  shade: 'deep' | 'royal' | 'sky';
  delay?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, delay }}
      whileHover={{ y: -3, scale: 1.02 }}
      whileTap={{ scale: 0.97 }}
      style={{ flex: '1 1 0', minWidth: 0 }}
    >
      <Link href={href} className={`placedly-hero-cta-pill placedly-hero-cta-pill--${shade}`}>
        <span className="placedly-hero-cta-pill-shine" aria-hidden />
        <span className="placedly-hero-cta-pill-icon">
          <Icon size={15} strokeWidth={2.15} />
        </span>
        <span className="placedly-hero-cta-pill-label">{label}</span>
        <motion.span
          className="placedly-hero-cta-pill-arrow"
          animate={{ x: [0, 3, 0] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut', delay: delay + 0.3 }}
        >
          <ArrowRight size={12} strokeWidth={2.5} />
        </motion.span>
      </Link>
    </motion.div>
  );
}

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
      whileHover={{ y: -3, boxShadow: '0 10px 24px rgba(37,99,235,0.16)' }}
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

export default function Hero({ cms = {} }: { cms?: HeroCms }) {
  const offerRole = cms['hp:heroOfferRole'] ?? 'Senior Claims Analyst';
  const admitProgramme = cms['hp:heroAdmitProgramme'] ?? "MSc International Business · Fall '25";

  return (
    <section id="Top" className="placedly-lift-hero">
      {/* ============================================================
           FONT IMPORT — loaded once for the whole hero
         ============================================================ */}
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;600;700;800&family=Poppins:wght@400;500;600;700;800&family=Inter:wght@400;500;600;700;800&family=Manrope:wght@400;500;600;700;800&family=Geist:wght@400;500;600;700;800&family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap"
      />

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;600;700;800&family=Poppins:wght@400;500;600;700;800&family=Inter:wght@400;500;600;700;800&family=Manrope:wght@400;500;600;700;800&family=Geist:wght@400;500;600;700;800&family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');

        /* ============================================================
           FONT — Modern Geometric Sans-Serif
           FORCED with !important so global styles can't override.
           Applied universally inside the hero scope.
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

        /* Display headline */
        .placedly-lift-hero-title,
        .placedly-lift-hero h1.placedly-lift-hero-title {
          font-weight: 700 !important;
          letter-spacing: -0.028em !important;
          font-family: ${GEOM_FONT_STACK} !important;
        }

        /* Subheadline */
        .placedly-lift-hero-sub {
          font-weight: 400 !important;
          letter-spacing: -0.012em !important;
          font-family: ${GEOM_FONT_STACK} !important;
        }

        /* CTA pills */
        .placedly-hero-cta-pill {
          font-weight: 600 !important;
          letter-spacing: -0.005em !important;
          font-family: ${GEOM_FONT_STACK} !important;
        }

        /* Profile card name */
        .placedly-lift-name {
          font-weight: 700 !important;
          letter-spacing: -0.015em !important;
          font-family: ${GEOM_FONT_STACK} !important;
        }

        /* Profile card role */
        .placedly-lift-role {
          font-weight: 500 !important;
          letter-spacing: -0.003em !important;
          font-family: ${GEOM_FONT_STACK} !important;
        }

        /* Profile card line */
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

        /* Glass pill (Shared / Recommended) */
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

        /* Stat pill */
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
           HERO CTA PILL SYSTEM — 3 buttons, distinct blue shades
           ============================================================ */
        .placedly-lift-hero-ctas {
          display: flex;
          align-items: stretch;
          gap: 10px;
          flex-wrap: wrap;
        }

        .placedly-hero-cta-pill {
          position: relative;
          display: inline-flex;
          align-items: center;
          gap: 8px;
          width: 100%;
          padding: 11px 16px 11px 10px;
          border-radius: 999px;
          font-size: 13px;
          text-decoration: none;
          color: #ffffff;
          border: 1px solid rgba(255,255,255,0.22);
          overflow: hidden;
          isolation: isolate;
          cursor: pointer;
          white-space: nowrap;
          transition: box-shadow 0.28s cubic-bezier(0.22,1,0.36,1), filter 0.28s ease;
        }

        /* Deep royal blue — For Candidates */
        .placedly-hero-cta-pill--deep {
          background-image: linear-gradient(135deg, #1e3a8a, #2563eb);
          box-shadow: 0 8px 20px rgba(30, 58, 138, 0.34), inset 0 1px 0 rgba(255,255,255,0.2);
        }
        .placedly-hero-cta-pill--deep:hover {
          box-shadow: 0 14px 30px rgba(30, 58, 138, 0.46), inset 0 1px 0 rgba(255,255,255,0.26);
        }

        /* Classic blue — For Recruiters */
        .placedly-hero-cta-pill--royal {
          background-image: linear-gradient(135deg, #2563eb, #3b82f6);
          box-shadow: 0 8px 20px rgba(37, 99, 235, 0.32), inset 0 1px 0 rgba(255,255,255,0.2);
        }
        .placedly-hero-cta-pill--royal:hover {
          box-shadow: 0 14px 30px rgba(37, 99, 235, 0.44), inset 0 1px 0 rgba(255,255,255,0.26);
        }

        /* Sky blue — Study Abroad */
        .placedly-hero-cta-pill--sky {
          background-image: linear-gradient(135deg, #0ea5e9, #38bdf8);
          box-shadow: 0 8px 20px rgba(14, 165, 233, 0.32), inset 0 1px 0 rgba(255,255,255,0.2);
        }
        .placedly-hero-cta-pill--sky:hover {
          box-shadow: 0 14px 30px rgba(14, 165, 233, 0.44), inset 0 1px 0 rgba(255,255,255,0.26);
        }

        .placedly-hero-cta-pill:active { filter: brightness(0.97); }

        .placedly-hero-cta-pill-shine {
          position: absolute;
          top: 0; left: -130%;
          width: 55%; height: 100%;
          background: linear-gradient(115deg, transparent, rgba(255,255,255,0.5), transparent);
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
          width: 26px;
          height: 26px;
          border-radius: 50%;
          background: rgba(255,255,255,0.2);
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
          width: 20px;
          height: 20px;
          border-radius: 50%;
          background: rgba(255,255,255,0.2);
          margin-left: auto;
          flex-shrink: 0;
        }

        @media (max-width: 640px) {
          .placedly-lift-hero-ctas { flex-direction: column; }
          .placedly-hero-cta-pill { justify-content: center; }
        }

        /* ============================================================
           STATS BAR — pill-shaped, sits beneath the video/stage section
           ============================================================ */
        .placedly-hero-stats-bar {
          display: flex;
          flex-wrap: wrap;
          align-items: stretch;
          justify-content: center;
          gap: 12px;
          margin: clamp(28px, 4vw, 48px) auto clamp(40px, 6vw, 64px);
          max-width: 1000px;
          width: 100%;
          padding: 0 16px;
        }

        .placedly-hero-stat-pill {
          position: relative;
          display: flex;
          align-items: center;
          gap: 10px;
          flex: 1 1 200px;
          min-width: 0;
          background: #ffffff;
          border: 1px solid #e7ebf3;
          border-radius: 999px;
          padding: 10px 16px 10px 10px;
          box-shadow: 0 4px 14px rgba(15,23,42,0.06);
          overflow: hidden;
          isolation: isolate;
          cursor: default;
          transition: box-shadow 0.25s ease, transform 0.25s ease;
        }

        .placedly-hero-stat-pill-shine {
          position: absolute;
          top: 0; left: -130%;
          width: 60%; height: 100%;
          background: linear-gradient(115deg, transparent, rgba(37,99,235,0.1), transparent);
          transform: skewX(-20deg);
          transition: left 0.65s ease;
          z-index: 0;
          pointer-events: none;
        }
        .placedly-hero-stat-pill:hover .placedly-hero-stat-pill-shine { left: 140%; }

        .placedly-hero-stat-pill-icon {
          position: relative;
          z-index: 1;
          width: 32px;
          height: 32px;
          border-radius: 50%;
          flex-shrink: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          background: linear-gradient(135deg, #eff6ff, #dbeafe);
          border: 1.5px solid #bfdbfe;
          color: #1e40af;
          transition: transform 0.3s cubic-bezier(0.22,1,0.36,1);
        }
        .placedly-hero-stat-pill:hover .placedly-hero-stat-pill-icon {
          transform: scale(1.12) rotate(-6deg);
        }

        .placedly-hero-stat-pill-text {
          position: relative;
          z-index: 1;
          display: flex;
          flex-direction: column;
          line-height: 1.2;
          min-width: 0;
          flex: 1;
        }
        .placedly-hero-stat-pill-text strong {
          font-size: 14.5px;
          color: #1e3a8a;
        }
        .placedly-hero-stat-pill-text span {
          font-size: 10.5px;
          color: #64748b;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        /* Force 4 columns at desktop so labels never get truncated */
        @media (min-width: 900px) {
          .placedly-hero-stats-bar {
            flex-wrap: nowrap;
          }
          .placedly-hero-stat-pill {
            flex: 1 1 0;
          }
        }

        @media (max-width: 720px) {
          .placedly-hero-stat-pill { flex: 1 1 calc(50% - 6px); }
        }
        @media (max-width: 420px) {
          .placedly-hero-stat-pill { flex: 1 1 100%; }
        }

        /* ============================================================
           THINNER POP-UP CARDS (left/right profile cards)
           ============================================================ */
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
                shade={cta.shade}
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

        {/* ── Stats bar — pill-shaped, beneath the video/stage section ── */}
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

      <HeroMobileBrief cms={cms} />

      <HiringPartnersMarquee cms={cms} />
    </section>
  );
}