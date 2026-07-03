'use client';

import { motion } from 'framer-motion';
import {
  Star,
  Briefcase,
  Globe,
  Users,
  ShieldCheck,
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

/* ─── Floating scatter avatars — tightened, professional composition ─── */
const SCATTER_AVATARS = [
  { src: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=128&h=128&fit=crop&crop=face', top: '2%',  left: '45%', size: 56 },
  { src: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=128&h=128&fit=crop&crop=face', top: '8%',  left: '88%', size: 42 },
  { src: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=128&h=128&fit=crop&crop=face', top: '60%', left: '22%', size: 46 },
] as const;

const DECORATIVE_DOTS = [
  { top: '54%', left: '2%',  size: 18, tone: 'solid' as const },
  { top: '0%',  left: '96%', size: 11, tone: 'ghost' as const },
] as const;

const HERO_CARD_AVATARS = {
  left: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=96&h=96&fit=crop&crop=face',
  right: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=96&h=96&fit=crop&crop=face',
} as const;

/* ─── Animated gradient heading — full rainbow shift ─── */
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

/* ─── Feature pill (For Candidates / For Recruiters / Study Abroad) ─── */
function HeroFeaturePill({
  href,
  icon: Icon,
  title,
  subtitle,
  variant,
  delay = 0,
}: {
  href: string;
  icon: LucideIcon;
  title: string;
  subtitle: string;
  variant: 'candidates' | 'recruiters' | 'study';
  delay?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      whileTap={{ scale: 0.98 }}
    >
      <Link href={href} className={`placedly-feature-pill placedly-feature-pill--${variant}`}>
        <span className="placedly-feature-pill-shine" aria-hidden />
        <span className="placedly-feature-pill-icon">
          <Icon size={17} strokeWidth={2.1} />
        </span>
        <span className="placedly-feature-pill-text">
          <strong>{title}</strong>
          <span>{subtitle}</span>
        </span>
        <motion.span
          className="placedly-feature-pill-arrow"
          animate={{ x: [0, 3, 0] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut', delay: delay + 0.3 }}
        >
          <ArrowRight size={13} strokeWidth={2.5} />
        </motion.span>
      </Link>
    </motion.div>
  );
}

export default function Hero({ cms = {} }: { cms?: HeroCms }) {
  const offerRole      = cms['hp:heroOfferRole']      ?? 'Head of Marketing';
  const admitProgramme = cms['hp:heroAdmitProgramme'] ?? 'Early stage AI';

  return (
    <section id="Top" className="placedly-cap-hero">
      <style>{`
        /* ============================================================
           FEATURE PILL SYSTEM
           ============================================================ */
        .placedly-feature-pill {
          position: relative;
          display: inline-flex;
          align-items: center;
          gap: 12px;
          padding: 10px 14px 10px 10px;
          border-radius: 999px;
          text-decoration: none;
          overflow: hidden;
          isolation: isolate;
          cursor: pointer;
          transition: transform 0.28s cubic-bezier(0.22,1,0.36,1), box-shadow 0.28s ease, filter 0.28s ease;
        }
        .placedly-feature-pill:hover { transform: translateY(-3px); }

        .placedly-feature-pill-shine {
          position: absolute;
          top: 0; left: -130%;
          width: 55%; height: 100%;
          background: linear-gradient(115deg, transparent, rgba(255,255,255,0.5), transparent);
          transform: skewX(-20deg);
          transition: left 0.65s ease;
          z-index: 0;
          pointer-events: none;
        }
        .placedly-feature-pill:hover .placedly-feature-pill-shine { left: 140%; }

        .placedly-feature-pill-icon {
          position: relative;
          z-index: 1;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 34px;
          height: 34px;
          border-radius: 50%;
          flex-shrink: 0;
        }

        .placedly-feature-pill-text {
          position: relative;
          z-index: 1;
          display: flex;
          flex-direction: column;
          line-height: 1.25;
          white-space: nowrap;
        }
        .placedly-feature-pill-text strong { font-size: 13.5px; font-weight: 700; }
        .placedly-feature-pill-text span { font-size: 11.5px; font-weight: 500; opacity: 0.85; }

        .placedly-feature-pill-arrow {
          position: relative;
          z-index: 1;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 26px;
          height: 26px;
          border-radius: 50%;
          flex-shrink: 0;
        }

        .placedly-feature-pill--candidates {
          background-image: linear-gradient(135deg, #2563eb, #7c8ff0);
          color: #fff;
          box-shadow: 0 10px 24px rgba(37,99,235,0.32);
        }
        .placedly-feature-pill--candidates .placedly-feature-pill-icon { background: rgba(255,255,255,0.2); color: #fff; }
        .placedly-feature-pill--candidates .placedly-feature-pill-arrow { background: rgba(255,255,255,0.24); color: #fff; }
        .placedly-feature-pill--candidates:hover { box-shadow: 0 16px 32px rgba(37,99,235,0.42); }

        .placedly-feature-pill--recruiters {
          background: #ffffff;
          border: 1.5px solid #e5e7ff;
          box-shadow: 0 8px 20px rgba(99,102,241,0.08);
        }
        .placedly-feature-pill--recruiters .placedly-feature-pill-icon {
          background: linear-gradient(135deg, #eef2ff, #fdf2f8);
          color: #7c3aed;
        }
        .placedly-feature-pill--recruiters .placedly-feature-pill-text strong {
          background-image: linear-gradient(90deg, #2563eb, #a855f7);
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
        }
        .placedly-feature-pill--recruiters .placedly-feature-pill-text span { color: #64748b; }
        .placedly-feature-pill--recruiters .placedly-feature-pill-arrow { background: #eef2ff; color: #7c3aed; }
        .placedly-feature-pill--recruiters:hover { box-shadow: 0 14px 28px rgba(99,102,241,0.18); border-color: #c7d2fe; }

        .placedly-feature-pill--study {
          background-image: linear-gradient(135deg, #fdf2ee, #fee2e8);
          color: #9a3412;
          box-shadow: 0 8px 20px rgba(251,146,60,0.14);
        }
        .placedly-feature-pill--study .placedly-feature-pill-icon {
          background: linear-gradient(135deg, #fb923c, #f43f5e);
          color: #fff;
        }
        .placedly-feature-pill--study .placedly-feature-pill-text strong {
          background-image: linear-gradient(90deg, #fb923c, #f43f5e);
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
        }
        .placedly-feature-pill--study .placedly-feature-pill-arrow { background: linear-gradient(135deg, #fb923c, #f43f5e); color: #fff; }
        .placedly-feature-pill--study:hover { box-shadow: 0 14px 28px rgba(244,63,94,0.24); }

        /* ============================================================
           HERO LAYOUT — video sits at z-index:0, everything else at z-index:1+
           spacing is fluid via clamp() instead of fixed jumps
           ============================================================ */
        .placedly-cap-hero {
          position: relative;
          overflow: hidden;
          isolation: isolate;
          padding: clamp(40px, 6vw, 64px) 20px clamp(28px, 4vw, 40px);
        }

        .placedly-cap-hero-bg {
          position: absolute;
          inset: 0;
          z-index: 0;
          pointer-events: none;
          overflow: hidden;
        }

        .placedly-cap-hero-desktop {
          position: relative;
          z-index: 1;
          max-width: 980px;
          margin: 0 auto;
        }

        .placedly-cap-hero-copy {
          text-align: center;
          max-width: 720px;
          margin: 0 auto;
        }

        .placedly-cap-hero-title {
          font-size: clamp(2rem, 3.8vw, 3.25rem);
          font-weight: 800;
          line-height: 1.13;
          letter-spacing: -0.02em;
          margin: 0 0 clamp(12px, 1.6vw, 18px);
        }

        .placedly-cap-hero-sub {
          font-size: clamp(14.5px, 1.2vw, 16px);
          line-height: 1.55;
          color: #55607a;
          max-width: 540px;
          margin: 0 auto clamp(20px, 2.4vw, 28px);
        }

        .placedly-cap-hero-ctas {
          display: flex;
          align-items: center;
          justify-content: center;
          flex-wrap: wrap;
          gap: 12px;
          margin-bottom: clamp(36px, 5vw, 52px);
        }

        /* Stage — fluid height, tighter composition */
        .placedly-cap-hero-stage {
          position: relative;
          width: 100%;
          max-width: 860px;
          height: clamp(300px, 34vw, 400px);
          margin: 0 auto clamp(32px, 4.5vw, 48px);
        }

        .placedly-cap-card {
          position: absolute;
          width: clamp(210px, 24vw, 250px);
          background: #ffffff;
          border-radius: 18px;
          padding: 14px 16px;
          box-shadow: 0 16px 36px rgba(15, 23, 42, 0.12);
          border: 1px solid rgba(15, 23, 42, 0.04);
          z-index: 3;
        }
        .placedly-cap-card--left  { top: 0;   left: 0; }
        .placedly-cap-card--right { bottom: 0; right: 0; }

        .placedly-cap-card-profile { display: flex; align-items: center; gap: 10px; margin-bottom: 8px; }
        .placedly-cap-avatar-photo {
          width: 40px; height: 40px; border-radius: 50%; object-fit: cover;
          border: 2px solid #fff; box-shadow: 0 2px 8px rgba(0,0,0,0.12);
          flex-shrink: 0;
        }
        .placedly-cap-name { font-size: 14px; font-weight: 700; color: #0f172a; margin: 0; }
        .placedly-cap-role { font-size: 12px; color: #64748b; margin: 0; }
        .placedly-cap-line { font-size: 12.5px; color: #334155; margin: 0; line-height: 1.4; }
        .placedly-cap-line strong {
          background-image: linear-gradient(90deg, #2563eb, #a855f7);
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
          font-weight: 700;
        }

        .placedly-cap-scatter { position: absolute; inset: 0; z-index: 1; }

        .placedly-cap-scatter-avatar-wrap {
          position: absolute;
          border-radius: 50%;
          overflow: hidden;
          box-shadow: 0 8px 18px rgba(15,23,42,0.14);
          border: 3px solid #fff;
        }
        .placedly-cap-scatter-avatar { width: 100%; height: 100%; object-fit: cover; display: block; }

        .placedly-cap-dot { position: absolute; border-radius: 50%; z-index: 1; }
        .placedly-cap-dot--solid { background: linear-gradient(135deg, #2563eb, #7c8ff0); box-shadow: 0 6px 14px rgba(37,99,235,0.35); }
        .placedly-cap-dot--ghost { background: #c7d2fe; }

        .placedly-cap-rec-pill {
          position: absolute;
          top: 4%;
          left: 62%;
          display: flex;
          align-items: center;
          gap: 9px;
          background: #ffffff;
          border-radius: 14px;
          padding: 9px 14px;
          box-shadow: 0 10px 22px rgba(37,99,235,0.16);
          z-index: 3;
        }
        .placedly-cap-rec-pill-icon {
          width: 27px; height: 27px; border-radius: 50%;
          background: linear-gradient(135deg, #2563eb, #a855f7);
          color: #fff;
          display: flex; align-items: center; justify-content: center;
          flex-shrink: 0;
        }
        .placedly-cap-rec-pill-text { display: flex; flex-direction: column; line-height: 1.2; white-space: nowrap; }
        .placedly-cap-rec-pill-text strong {
          font-size: 12.5px;
          font-weight: 700;
          background-image: linear-gradient(90deg, #2563eb, #a855f7);
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
        }
        .placedly-cap-rec-pill-text span { font-size: 12.5px; color: #0f172a; font-weight: 600; }

        /* Trust stats — fluid gap, no extra whitespace */
        .placedly-cap-stats {
          display: flex;
          flex-wrap: wrap;
          align-items: center;
          justify-content: center;
          gap: 12px;
          margin-bottom: clamp(36px, 5vw, 52px);
        }
        .placedly-cap-stat {
          display: flex;
          align-items: center;
          gap: 9px;
          background: #ffffff;
          border: 1px solid #eef1f6;
          border-radius: 14px;
          padding: 11px 16px;
          box-shadow: 0 6px 16px rgba(15,23,42,0.05);
        }
        .placedly-cap-stat-icon {
          width: 34px; height: 34px; border-radius: 50%;
          border: 1.5px solid #e5e7ff;
          display: flex; align-items: center; justify-content: center;
          flex-shrink: 0;
          background: linear-gradient(135deg, #eef2ff, #fdf2f8);
          color: #7c3aed;
        }
        .placedly-cap-stat-text { display: flex; flex-direction: column; line-height: 1.22; }
        .placedly-cap-stat-text span:first-child { font-size: 11.5px; color: #64748b; }
        .placedly-cap-stat-text strong { font-size: 14px; color: #0f172a; font-weight: 700; }

        /* "Landed roles at" heading — tighter gap into marquee */
        .placedly-cap-marquee-heading { text-align: center; margin-bottom: clamp(18px, 2.4vw, 24px); }
        .placedly-cap-marquee-heading .bar {
          width: 38px; height: 3px; border-radius: 999px;
          background-image: linear-gradient(90deg, #2563eb, #a855f7, #fb923c);
          margin: 0 auto 14px;
        }
        .placedly-cap-marquee-heading h3 {
          font-size: clamp(19px, 1.8vw, 22px);
          font-weight: 800;
          color: #0f172a;
          line-height: 1.28;
          margin: 0;
        }

        @media (max-width: 900px) {
          .placedly-cap-hero-desktop { display: none; }
        }
      `}</style>

      {/* z-index:0 layer — video + gradient */}
      <div className="placedly-cap-hero-bg" aria-hidden>
        <HeroGradientBg />
        <HeroBgVideo />
      </div>

      {/* z-index:1 layer — all content */}
      <div className="placedly-cap-hero-desktop">
        <div className="placedly-cap-hero-copy">
          <motion.h1
            className="placedly-cap-hero-title"
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
            className="placedly-cap-hero-sub"
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.08 }}
          >
            {cms['hp:heroSubline'] ??
              'A career placement and study abroad platform where exceptional people connect—and start working together.'}
          </motion.p>

          <div className="placedly-cap-hero-ctas">
            <HeroFeaturePill
              href="/contact"
              icon={Briefcase}
              title={cms['hp:heroPrimaryCtaText'] ?? 'For Candidates'}
              subtitle="Find Jobs & Build Your Career"
              variant="candidates"
              delay={0.14}
            />
            <HeroFeaturePill
              href="/recruiters"
              icon={Users}
              title={cms['hp:heroRecruiterCtaText'] ?? 'For Recruiters'}
              subtitle="Hire Top Talent Faster"
              variant="recruiters"
              delay={0.2}
            />
            <HeroFeaturePill
              href="/study-visa"
              icon={Globe}
              title={cms['hp:heroSecondaryCtaText'] ?? 'Study Abroad'}
              subtitle="Study in Top Countries & Shape Your Future"
              variant="study"
              delay={0.26}
            />
          </div>
        </div>

        <motion.div
          className="placedly-cap-hero-stage"
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, delay: 0.3 }}
        >
          <motion.div
            className="placedly-cap-card placedly-cap-card--left"
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 5.5, repeat: Infinity, ease: 'easeInOut' }}
          >
            <div className="placedly-cap-card-profile">
              <img
                src={HERO_CARD_AVATARS.left}
                alt=""
                className="placedly-cap-avatar-photo"
                width={40}
                height={40}
                loading="lazy"
                decoding="async"
              />
              <div>
                <p className="placedly-cap-name">{cms['hp:heroOfferName'] ?? 'Amber'}</p>
                <p className="placedly-cap-role">CEO at AI Startup</p>
              </div>
            </div>
            <p className="placedly-cap-line">
              Hiring a <strong>{offerRole}</strong>
            </p>
          </motion.div>

          <div className="placedly-cap-scatter" aria-hidden>
            {SCATTER_AVATARS.map((person, i) => (
              <motion.div
                key={person.src}
                className="placedly-cap-scatter-avatar-wrap"
                style={{ top: person.top, left: person.left, width: person.size, height: person.size }}
                animate={{ y: [0, i % 2 === 0 ? -6 : 6, 0] }}
                transition={{ duration: 4.5 + i, repeat: Infinity, ease: 'easeInOut', delay: i * 0.3 }}
              >
                <img
                  src={person.src}
                  alt=""
                  className="placedly-cap-scatter-avatar"
                  width={person.size}
                  height={person.size}
                  loading="lazy"
                  decoding="async"
                />
              </motion.div>
            ))}

            {DECORATIVE_DOTS.map((dot, i) => (
              <span
                key={i}
                className={`placedly-cap-dot placedly-cap-dot--${dot.tone}`}
                style={{ top: dot.top, left: dot.left, width: dot.size, height: dot.size }}
              />
            ))}
          </div>

          <motion.div
            className="placedly-cap-rec-pill"
            animate={{ y: [0, -6, 0] }}
            transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut', delay: 0.2 }}
          >
            <span className="placedly-cap-rec-pill-icon">
              <Star size={13} strokeWidth={2.25} />
            </span>
            <span className="placedly-cap-rec-pill-text">
              <strong>Recommended</strong>
              <span>{cms['hp:heroAdmitName'] ?? 'Daniel'}</span>
            </span>
          </motion.div>

          <motion.div
            className="placedly-cap-card placedly-cap-card--right"
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut', delay: 0.4 }}
          >
            <div className="placedly-cap-card-profile">
              <img
                src={HERO_CARD_AVATARS.right}
                alt=""
                className="placedly-cap-avatar-photo"
                width={40}
                height={40}
                loading="lazy"
                decoding="async"
              />
              <div>
                <p className="placedly-cap-name">{cms['hp:heroAdmitName'] ?? 'Daniel'}</p>
                <p className="placedly-cap-role">Marketing Leader</p>
              </div>
            </div>
            <p className="placedly-cap-line">
              Interested in <strong>{admitProgramme}</strong>
            </p>
          </motion.div>
        </motion.div>

        <motion.div
          className="placedly-cap-stats"
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <div className="placedly-cap-stat">
            <span className="placedly-cap-stat-icon"><ShieldCheck size={16} strokeWidth={2} /></span>
            <span className="placedly-cap-stat-text"><span>Trusted by</span><strong>500+ Companies</strong></span>
          </div>
          <div className="placedly-cap-stat">
            <span className="placedly-cap-stat-icon"><Users size={16} strokeWidth={2} /></span>
            <span className="placedly-cap-stat-text"><span>50,000+</span><strong>Careers Transformed</strong></span>
          </div>
          <div className="placedly-cap-stat">
            <span className="placedly-cap-stat-icon"><Globe size={16} strokeWidth={2} /></span>
            <span className="placedly-cap-stat-text"><span>Global Opportunities Across</span><strong>20+ Countries</strong></span>
          </div>
          <div className="placedly-cap-stat">
            <span className="placedly-cap-stat-icon"><Award size={16} strokeWidth={2} /></span>
            <span className="placedly-cap-stat-text"><span>10+ Years of</span><strong>Recruitment Excellence</strong></span>
          </div>
        </motion.div>
      </div>

      <HeroMobileBrief cms={cms} />

      <div className="placedly-cap-marquee-heading">
        <div className="bar" />
        <h3>
          Our CAP Candidates
          <br />
          <AnimatedGradientText>Have Landed Roles At</AnimatedGradientText>
        </h3>
      </div>

      <HiringPartnersMarquee cms={cms} />
    </section>
  );
}