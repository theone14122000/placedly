'use client';

import { motion } from 'framer-motion';
import { Share2, Sparkles, Briefcase, Globe, ArrowRight, type LucideIcon } from 'lucide-react';
import Link from 'next/link';
import HeroMobileBrief from './HeroMobileBrief';
import HeroGradientBg from './HeroGradientBg';
import HeroBgVideo from './HeroBgVideo';
import HiringPartnersMarquee from './HiringPartnersMarquee';

type HeroCms = { [k: string]: string };

const SCATTER_AVATARS = [
  { src: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=128&h=128&fit=crop&crop=face', top: '0%', left: '0%', size: 46, badge: false },
  { src: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=128&h=128&fit=crop&crop=face', top: '2%', left: '72%', size: 44, badge: true },
  { src: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=128&h=128&fit=crop&crop=face', top: '38%', left: '6%', size: 50, badge: true },
  { src: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=128&h=128&fit=crop&crop=face', top: '70%', left: '0%', size: 44, badge: false },
  { src: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=128&h=128&fit=crop&crop=face', top: '66%', left: '74%', size: 48, badge: true },
] as const;

const HERO_CARD_AVATARS = {
  left: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=96&h=96&fit=crop&crop=face',
  right: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=96&h=96&fit=crop&crop=face',
} as const;

/* ─── Animated gradient heading ─── */
function AnimatedGradientText({
  children,
  className,
  as: Tag = 'span',
}: {
  children: React.ReactNode;
  className?: string;
  as?: 'span' | 'h1' | 'h2' | 'h3';
}) {
  return (
    <>
      <Tag
        className={className}
        style={{
          backgroundImage: [
            'linear-gradient(',
            '270deg,',
            '#2563eb,',
            '#7c8ff0,',
            '#fb923c,',
            '#f43f5e,',
            '#a855f7,',
            '#2563eb',
            ')',
          ].join(' '),
          backgroundSize: '300% 300%',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
          animation: 'placedly-gradient-shift 6s ease infinite',
          display: 'inline',
        }}
      >
        {children}
      </Tag>

      <style>{`
        @keyframes placedly-gradient-shift {
          0%   { background-position: 0%   50%; }
          50%  { background-position: 100% 50%; }
          100% { background-position: 0%   50%; }
        }
      `}</style>
    </>
  );
}

/* ─── Dynamic shine-pill CTA (shared by both hero buttons) ─── */
function HeroCtaButton({
  href,
  label,
  icon: Icon,
  variant,
  delay = 0,
}: {
  href: string;
  label: string;
  icon: LucideIcon;
  variant: 'get-placed' | 'study-abroad';
  delay?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      whileTap={{ scale: 0.98 }}
    >
      <Link href={href} className={`placedly-hero-cta placedly-hero-cta--${variant}`}>
        <span className="placedly-hero-cta-shine" aria-hidden />
        <span className="placedly-hero-cta-label">{label}</span>
        <motion.span
          className="placedly-hero-cta-icon"
          animate={{ x: [0, 3, 0] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut', delay: delay + 0.3 }}
        >
          {href.includes('study-visa') || variant === 'study-abroad'
            ? <ArrowRight size={13} strokeWidth={2.5} />
            : <Icon size={13} strokeWidth={2.5} />}
        </motion.span>
      </Link>
    </motion.div>
  );
}

export default function Hero({ cms = {} }: { cms?: HeroCms }) {
  const offerRole      = cms['hp:heroOfferRole']      ?? 'Senior Claims Analyst';
  const admitProgramme = cms['hp:heroAdmitProgramme'] ?? "MSc International Business · Fall '25";

  return (
    <section id="Top" className="placedly-lift-hero">
      <style>{`
        /* ============================================================
           DYNAMIC HERO CTA SYSTEM
           Shared shine-pill mechanic, two brand-token colour variants
           ============================================================ */
        .placedly-hero-cta {
          position: relative;
          display: inline-flex;
          align-items: center;
          gap: 10px;
          padding: 13px 22px 13px 26px;
          border-radius: 999px;
          font-weight: 700;
          font-size: 14.5px;
          letter-spacing: 0.01em;
          font-family: inherit;
          text-decoration: none;
          color: #ffffff;
          border: 1px solid rgba(255,255,255,0.25);
          overflow: hidden;
          isolation: isolate;
          cursor: pointer;
          background-size: 200% 200%;
          background-position: 0% 50%;
          transition:
            transform 0.28s cubic-bezier(0.22,1,0.36,1),
            box-shadow 0.28s cubic-bezier(0.22,1,0.36,1),
            filter 0.28s ease,
            background-position 0.6s ease;
        }

        /* Get Placed — primary blue gradient */
        .placedly-hero-cta--get-placed {
          background-image: linear-gradient(135deg, #2563eb, #7c8ff0);
          box-shadow:
            0 8px 22px rgba(37, 99, 235, 0.32),
            0 2px 6px rgba(0, 0, 0, 0.12),
            inset 0 1px 0 rgba(255,255,255,0.25);
        }
        .placedly-hero-cta--get-placed:hover {
          box-shadow:
            0 16px 34px rgba(37, 99, 235, 0.42),
            0 4px 10px rgba(0, 0, 0, 0.16),
            inset 0 1px 0 rgba(255,255,255,0.3);
        }

        /* Study Abroad — warm orange/rose gradient */
        .placedly-hero-cta--study-abroad {
          background-image: linear-gradient(135deg, #fb923c, #f43f5e);
          box-shadow:
            0 8px 22px rgba(251, 146, 60, 0.32),
            0 2px 6px rgba(0, 0, 0, 0.12),
            inset 0 1px 0 rgba(255,255,255,0.25);
        }
        .placedly-hero-cta--study-abroad:hover {
          box-shadow:
            0 16px 34px rgba(244, 63, 94, 0.4),
            0 4px 10px rgba(0, 0, 0, 0.16),
            inset 0 1px 0 rgba(255,255,255,0.3);
        }

        .placedly-hero-cta:hover {
          transform: translateY(-3px);
          filter: brightness(1.07) saturate(1.05);
          background-position: 100% 50%;
        }

        .placedly-hero-cta:active {
          transform: translateY(-1px) scale(0.98);
          filter: brightness(0.98);
        }

        .placedly-hero-cta-label {
          position: relative;
          z-index: 1;
          white-space: nowrap;
        }

        .placedly-hero-cta-icon {
          position: relative;
          z-index: 1;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 24px;
          height: 24px;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.22);
          transition: transform 0.3s cubic-bezier(0.22,1,0.36,1), background 0.3s ease;
        }

        .placedly-hero-cta:hover .placedly-hero-cta-icon {
          background: rgba(255, 255, 255, 0.34);
        }

        .placedly-hero-cta-shine {
          position: absolute;
          top: 0;
          left: -130%;
          width: 55%;
          height: 100%;
          background: linear-gradient(115deg, transparent, rgba(255,255,255,0.5), transparent);
          transform: skewX(-20deg);
          transition: left 0.65s ease;
          z-index: 0;
          pointer-events: none;
        }

        .placedly-hero-cta:hover .placedly-hero-cta-shine {
          left: 140%;
        }

        /* CTA row layout */
        .placedly-lift-hero-ctas {
          display: flex;
          align-items: center;
          gap: 14px;
          flex-wrap: wrap;
        }

        @media (max-width: 640px) {
          .placedly-lift-hero-ctas {
            flex-direction: column;
            align-items: stretch;
            gap: 12px;
          }
          .placedly-hero-cta {
            width: 100%;
            justify-content: center;
            padding: 15px 22px;
            font-size: 15px;
          }
        }
      `}</style>

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
            style={{ color: 'inherit', WebkitTextFillColor: 'initial' }}
          >
            Grow your career,
            <br />
            <AnimatedGradientText>
              through people you trust.
            </AnimatedGradientText>
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
            <HeroCtaButton
              href="/contact"
              label={cms['hp:heroPrimaryCtaText'] ?? 'Get Placed'}
              icon={Briefcase}
              variant="get-placed"
              delay={0.16}
            />
            <HeroCtaButton
              href="/study-visa"
              label={cms['hp:heroSecondaryCtaText'] ?? 'Study Abroad'}
              icon={Globe}
              variant="study-abroad"
              delay={0.24}
            />
          </div>
        </div>

        {/* ── Stage ── */}
        <motion.div
          className="placedly-lift-hero-stage"
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, delay: 0.28 }}
        >
          <div className="placedly-lift-network">
            {/* Left card */}
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

            {/* Centre scatter */}
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

            {/* Right card */}
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
                Interested in{' '}
                <strong>
                  {admitProgramme.split('·')[0]?.trim() ?? 'UK Masters'}
                </strong>
              </p>
            </motion.div>
          </div>
        </motion.div>
      </div>

      <HeroMobileBrief cms={cms} />
      <HiringPartnersMarquee cms={cms} />
    </section>
  );
}