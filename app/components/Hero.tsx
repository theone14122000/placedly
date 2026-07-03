'use client';

import { motion } from 'framer-motion';
import { Share2, Sparkles, Briefcase, Globe, ArrowRight, Star, Users, Shield, Award, type LucideIcon } from 'lucide-react';
import Link from 'next/link';
import HeroMobileBrief from './HeroMobileBrief';
import HeroGradientBg from './HeroGradientBg';
import HeroBgVideo from './HeroBgVideo';
import HiringPartnersMarquee from './HiringPartnersMarquee';

type HeroCms = { [k: string]: string };

/* Avatar assets - matched to picture */
const SCATTER_AVATARS = [
  { src: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=128&h=128&fit=crop&crop=face', top: '8%', left: '46%', size: 56, ring: true, isAmber: false },     // center red shirt
  { src: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=128&h=128&fit=crop&crop=face', top: '38%', left: '82%', size: 52, ring: false, isAmber: false },  // right
  { src: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=128&h=128&fit=crop&crop=face', top: '72%', left: '32%', size: 50, ring: false, isAmber: false },  // bottom left
  { src: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=128&h=128&fit=crop&crop=face', top: '54%', left: '6%', size: 46, ring: true, isAmber: false },   // left blue ball-ish
] as const;

const AMBER_AVATAR = 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=160&h=160&fit=crop&crop=face';
const DANIEL_AVATAR = 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=160&h=160&fit=crop&crop=face';

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
            '90deg,',
            '#2563eb,',
            '#7c8ff0,',
            '#2563eb',
            ')',
          ].join(' '),
          backgroundSize: '200% 200%',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
          animation: 'placedly-gradient-shift 5s ease infinite',
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

/* ─── Three CTA cards row (matches picture) ─── */
function HeroCtaCard({
  href,
  title,
  subtitle,
  icon: Icon,
  variant,
  delay = 0,
}: {
  href: string;
  title: string;
  subtitle: string;
  icon: LucideIcon;
  variant: 'primary' | 'outline' | 'soft';
  delay?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      whileTap={{ scale: 0.98 }}
      className={`placedly-hero-cta-card placedly-hero-cta-card--${variant}`}
    >
      <Link href={href} className="placedly-hero-cta-card-link">
        <span className="placedly-hero-cta-card-icon">
          <Icon size={22} strokeWidth={1.75} />
        </span>
        <span className="placedly-hero-cta-card-text">
          <span className="placedly-hero-cta-card-title">{title}</span>
          <span className="placedly-hero-cta-card-sub">{subtitle}</span>
        </span>
        <motion.span
          className="placedly-hero-cta-card-arrow"
          animate={{ x: [0, 3, 0] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut', delay: delay + 0.3 }}
        >
          <ArrowRight size={14} strokeWidth={2.5} />
        </motion.span>
      </Link>
    </motion.div>
  );
}

export default function Hero({ cms = {} }: { cms?: HeroCms }) {
  const offerRole      = cms['hp:heroOfferRole']      ?? 'Head of Marketing';
  const admitProgramme = cms['hp:heroAdmitProgramme'] ?? 'Early stage AI';

  return (
    <section id="Top" className="placedly-lift-hero">
      <style>{`
        /* ============================================================
           HERO SECTION
           ============================================================ */
        .placedly-lift-hero {
          position: relative;
          width: 100%;
          background: linear-gradient(180deg, #ffffff 0%, #f5f7ff 60%, #eef2ff 100%);
          overflow: hidden;
        }

        .placedly-hero-desktop-gradient {
          position: absolute;
          inset: 0;
          z-index: 0;
          pointer-events: none;
        }

        .placedly-hero-desktop-only {
          position: relative;
          z-index: 1;
          max-width: 1200px;
          margin: 0 auto;
          padding: 60px 32px 40px;
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        /* ============================================================
           COPY / TITLE BLOCK
           ============================================================ */
        .placedly-lift-hero-copy {
          text-align: center;
          max-width: 900px;
          margin: 0 auto;
        }

        .placedly-lift-hero-title {
          font-size: clamp(40px, 5.5vw, 72px);
          font-weight: 800;
          line-height: 1.05;
          letter-spacing: -0.02em;
          margin: 0 0 22px;
          color: #0f172a;
        }

        .placedly-lift-hero-sub {
          font-size: clamp(15px, 1.4vw, 18px);
          line-height: 1.55;
          color: #475569;
          max-width: 640px;
          margin: 0 auto 38px;
          font-weight: 400;
        }

        /* ============================================================
           3-CARD CTA ROW
           ============================================================ */
        .placedly-lift-hero-ctas {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 16px;
          width: 100%;
          max-width: 980px;
          margin: 0 auto 70px;
        }

        @media (max-width: 820px) {
          .placedly-lift-hero-ctas {
            grid-template-columns: 1fr;
            max-width: 480px;
          }
        }

        .placedly-hero-cta-card {
          position: relative;
          border-radius: 18px;
          transition: transform 0.28s cubic-bezier(0.22,1,0.36,1),
                      box-shadow 0.28s cubic-bezier(0.22,1,0.36,1);
        }

        .placedly-hero-cta-card:hover {
          transform: translateY(-3px);
        }

        .placedly-hero-cta-card-link {
          display: flex;
          align-items: center;
          gap: 14px;
          padding: 16px 18px;
          border-radius: 18px;
          text-decoration: none;
          color: inherit;
          position: relative;
          overflow: hidden;
        }

        /* primary - filled blue */
        .placedly-hero-cta-card--primary .placedly-hero-cta-card-link {
          background: linear-gradient(135deg, #1d4ed8, #2563eb);
          color: #ffffff;
          box-shadow:
            0 12px 28px rgba(37, 99, 235, 0.32),
            inset 0 1px 0 rgba(255,255,255,0.2);
        }
        .placedly-hero-cta-card--primary:hover .placedly-hero-cta-card-link {
          box-shadow:
            0 18px 40px rgba(37, 99, 235, 0.42),
            inset 0 1px 0 rgba(255,255,255,0.25);
        }

        /* outline - white with blue border */
        .placedly-hero-cta-card--outline .placedly-hero-cta-card-link {
          background: #ffffff;
          color: #0f172a;
          border: 1.5px solid #c7d2fe;
          box-shadow: 0 4px 14px rgba(37, 99, 235, 0.06);
        }
        .placedly-hero-cta-card--outline:hover .placedly-hero-cta-card-link {
          border-color: #6366f1;
          box-shadow: 0 14px 30px rgba(37, 99, 235, 0.14);
        }

        /* soft - light blue/indigo fill */
        .placedly-hero-cta-card--soft .placedly-hero-cta-card-link {
          background: linear-gradient(135deg, #eef2ff, #e0e7ff);
          color: #1e1b4b;
          box-shadow: 0 4px 14px rgba(99, 102, 241, 0.08);
        }
        .placedly-hero-cta-card--soft:hover .placedly-hero-cta-card-link {
          box-shadow: 0 14px 30px rgba(99, 102, 241, 0.18);
        }

        .placedly-hero-cta-card-icon {
          flex-shrink: 0;
          width: 42px;
          height: 42px;
          border-radius: 50%;
          display: inline-flex;
          align-items: center;
          justify-content: center;
        }
        .placedly-hero-cta-card--primary .placedly-hero-cta-card-icon {
          background: rgba(255,255,255,0.18);
          color: #ffffff;
        }
        .placedly-hero-cta-card--outline .placedly-hero-cta-card-icon {
          background: #eef2ff;
          color: #2563eb;
        }
        .placedly-hero-cta-card--soft .placedly-hero-cta-card-icon {
          background: #ffffff;
          color: #4f46e5;
        }

        .placedly-hero-cta-card-text {
          display: flex;
          flex-direction: column;
          gap: 2px;
          flex: 1;
          min-width: 0;
        }
        .placedly-hero-cta-card-title {
          font-weight: 700;
          font-size: 15px;
          letter-spacing: 0.01em;
        }
        .placedly-hero-cta-card-sub {
          font-size: 12.5px;
          opacity: 0.78;
          line-height: 1.3;
        }
        .placedly-hero-cta-card--primary .placedly-hero-cta-card-sub {
          color: #dbeafe;
        }
        .placedly-hero-cta-card--outline .placedly-hero-cta-card-sub {
          color: #64748b;
        }
        .placedly-hero-cta-card--soft .placedly-hero-cta-card-sub {
          color: #4338ca;
        }

        .placedly-hero-cta-card-arrow {
          flex-shrink: 0;
          width: 32px;
          height: 32px;
          border-radius: 50%;
          display: inline-flex;
          align-items: center;
          justify-content: center;
        }
        .placedly-hero-cta-card--primary .placedly-hero-cta-card-arrow {
          background: #ffffff;
          color: #2563eb;
        }
        .placedly-hero-cta-card--outline .placedly-hero-cta-card-arrow {
          background: #2563eb;
          color: #ffffff;
        }
        .placedly-hero-cta-card--soft .placedly-hero-cta-card-arrow {
          background: #4f46e5;
          color: #ffffff;
        }

        /* ============================================================
           STAGE / NETWORK VISUAL
           ============================================================ */
        .placedly-lift-hero-stage {
          width: 100%;
          max-width: 1100px;
          margin: 0 auto;
          position: relative;
        }

        .placedly-lift-network {
          position: relative;
          width: 100%;
          height: 420px;
        }

        /* dotted connection lines SVG layer */
        .placedly-lift-network-lines {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          z-index: 0;
          pointer-events: none;
        }

        .placedly-lift-card {
          position: absolute;
          background: #ffffff;
          border-radius: 16px;
          padding: 14px 18px;
          box-shadow:
            0 10px 30px rgba(37, 99, 235, 0.12),
            0 2px 6px rgba(15, 23, 42, 0.04);
          min-width: 240px;
          z-index: 2;
        }

        .placedly-lift-card--amber {
          top: 12%;
          left: 4%;
        }

        .placedly-lift-card--daniel {
          bottom: 8%;
          right: 4%;
        }

        .placedly-lift-card-row {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .placedly-lift-card-avatar {
          width: 44px;
          height: 44px;
          border-radius: 50%;
          object-fit: cover;
          flex-shrink: 0;
        }

        .placedly-lift-card-info {
          display: flex;
          flex-direction: column;
          gap: 1px;
        }

        .placedly-lift-card-name {
          font-weight: 700;
          font-size: 14.5px;
          color: #0f172a;
          margin: 0;
          line-height: 1.2;
        }

        .placedly-lift-card-role {
          font-size: 12px;
          color: #64748b;
          margin: 0;
          line-height: 1.3;
        }

        .placedly-lift-card-action {
          font-size: 12.5px;
          color: #475569;
          margin: 8px 0 0;
          line-height: 1.4;
        }
        .placedly-lift-card-action strong {
          color: #2563eb;
          font-weight: 700;
        }

        /* scatter avatars + pills */
        .placedly-lift-scatter {
          position: absolute;
          inset: 0;
          z-index: 1;
        }

        .placedly-lift-scatter-avatar-wrap {
          position: absolute;
          border-radius: 50%;
          overflow: visible;
        }

        .placedly-lift-scatter-avatar {
          width: 100%;
          height: 100%;
          border-radius: 50%;
          object-fit: cover;
          box-shadow: 0 6px 16px rgba(37, 99, 235, 0.18);
        }

        .placedly-lift-scatter-ring {
          position: absolute;
          inset: -4px;
          border-radius: 50%;
          border: 2px solid rgba(37, 99, 235, 0.35);
          pointer-events: none;
        }

        .placedly-lift-scatter-ball {
          position: absolute;
          width: 30px;
          height: 30px;
          border-radius: 50%;
          background: linear-gradient(135deg, #3b82f6, #6366f1);
          box-shadow:
            0 6px 16px rgba(99, 102, 241, 0.4),
            inset 0 1px 0 rgba(255,255,255,0.4);
          top: 60%;
          left: 22%;
        }

        /* Recommended pill */
        .placedly-lift-glass-pill {
          position: absolute;
          display: inline-flex;
          align-items: center;
          gap: 10px;
          padding: 10px 16px;
          background: #ffffff;
          border-radius: 14px;
          box-shadow:
            0 8px 22px rgba(37, 99, 235, 0.1),
            0 2px 6px rgba(15, 23, 42, 0.04);
          z-index: 2;
        }

        .placedly-lift-glass-pill--rec {
          top: 6%;
          right: 18%;
        }

        .placedly-lift-glass-pill-icon {
          width: 32px;
          height: 32px;
          border-radius: 50%;
          background: #eef2ff;
          color: #2563eb;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .placedly-lift-glass-pill-text {
          display: flex;
          flex-direction: column;
          gap: 0;
          line-height: 1.2;
        }
        .placedly-lift-glass-pill-text strong {
          font-size: 13px;
          font-weight: 700;
          color: #2563eb;
        }
        .placedly-lift-glass-pill-text span {
          font-size: 12px;
          color: #0f172a;
          font-weight: 500;
        }

        /* ============================================================
           STATS BAR
           ============================================================ */
        .placedly-lift-stats {
          width: 100%;
          max-width: 1100px;
          margin: 50px auto 0;
          background: #ffffff;
          border-radius: 22px;
          padding: 24px 30px;
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 20px;
          box-shadow:
            0 14px 38px rgba(37, 99, 235, 0.1),
            0 2px 6px rgba(15, 23, 42, 0.04);
        }

        @media (max-width: 820px) {
          .placedly-lift-stats {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        .placedly-lift-stat {
          display: flex;
          align-items: center;
          gap: 14px;
        }

        .placedly-lift-stat-icon {
          width: 46px;
          height: 46px;
          border-radius: 12px;
          background: #eef2ff;
          color: #2563eb;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .placedly-lift-stat-text {
          display: flex;
          flex-direction: column;
          line-height: 1.25;
        }
        .placedly-lift-stat-prefix {
          font-size: 12px;
          color: #64748b;
          font-weight: 500;
        }
        .placedly-lift-stat-value {
          font-size: 16px;
          font-weight: 800;
          color: #0f172a;
        }
        .placedly-lift-stat-suffix {
          font-size: 12px;
          color: #64748b;
          font-weight: 500;
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
          >
            Grow your{' '}
            <AnimatedGradientText>career,</AnimatedGradientText>
            <br />
            through people you{' '}
            <AnimatedGradientText>trust.</AnimatedGradientText>
          </motion.h1>

          <motion.p
            className="placedly-lift-hero-sub"
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.08 }}
          >
            {cms['hp:heroSubline'] ??
              'A career placement and study abroad platform where exceptional people connect—and start working together.'}
          </motion.p>

          <div className="placedly-lift-hero-ctas">
            <HeroCtaCard
              href="/for-candidates"
              title={cms['hp:heroCta1Title'] ?? 'For Candidates'}
              subtitle={cms['hp:heroCta1Sub'] ?? 'Find Jobs & Build Your Career'}
              icon={Users}
              variant="primary"
              delay={0.16}
            />
            <HeroCtaCard
              href="/for-recruiters"
              title={cms['hp:heroCta2Title'] ?? 'For Recruiters'}
              subtitle={cms['hp:heroCta2Sub'] ?? 'Hire Top Talent Faster'}
              icon={Briefcase}
              variant="outline"
              delay={0.22}
            />
            <HeroCtaCard
              href="/study-visa"
              title={cms['hp:heroCta3Title'] ?? 'Study Abroad'}
              subtitle={cms['hp:heroCta3Sub'] ?? 'Study in Top Countries & Shape Your Future'}
              icon={Globe}
              variant="soft"
              delay={0.28}
            />
          </div>
        </div>

        {/* ── Stage (network visualization) ── */}
        <motion.div
          className="placedly-lift-hero-stage"
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, delay: 0.32 }}
        >
          <div className="placedly-lift-network">
            {/* SVG dotted connection lines forming curve */}
            <svg
              className="placedly-lift-network-lines"
              viewBox="0 0 1100 420"
              preserveAspectRatio="none"
              aria-hidden
            >
              <defs>
                <linearGradient id="placedly-net-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#6366f1" stopOpacity="0.45" />
                  <stop offset="50%" stopColor="#3b82f6" stopOpacity="0.7" />
                  <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0.45" />
                </linearGradient>
              </defs>
              {Array.from({ length: 28 }).map((_, i) => {
                const t = i / 27;
                const x = 50 + t * 1000;
                const y = 60 + Math.sin(t * Math.PI) * 260;
                return (
                  <circle key={i} cx={x} cy={y} r="2" fill="url(#placedly-net-grad)" />
                );
              })}
            </svg>

            {/* Amber card (top-left) */}
            <motion.div
              className="placedly-lift-card placedly-lift-card--amber"
              animate={{ y: [0, -6, 0] }}
              transition={{ duration: 5.5, repeat: Infinity, ease: 'easeInOut' }}
            >
              <div className="placedly-lift-card-row">
                <img
                  src={AMBER_AVATAR}
                  alt=""
                  className="placedly-lift-card-avatar"
                  width={44}
                  height={44}
                  loading="lazy"
                  decoding="async"
                />
                <div className="placedly-lift-card-info">
                  <p className="placedly-lift-card-name">
                    {cms['hp:heroAmberName'] ?? 'Amber'}
                  </p>
                  <p className="placedly-lift-card-role">CEO at AI Startup</p>
                </div>
              </div>
              <p className="placedly-lift-card-action">
                Hiring a <strong>{offerRole}</strong>
              </p>
            </motion.div>

            {/* Recommended pill (top-right) */}
            <motion.div
              className="placedly-lift-glass-pill placedly-lift-glass-pill--rec"
              animate={{ y: [0, 4, 0] }}
              transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut', delay: 0.3 }}
            >
              <span className="placedly-lift-glass-pill-icon">
                <Star size={16} strokeWidth={2.25} fill="#fbbf24" color="#fbbf24" />
              </span>
              <span className="placedly-lift-glass-pill-text">
                <strong>Recommended</strong>
                <span>Daniel</span>
              </span>
            </motion.div>

            {/* Daniel card (bottom-right) */}
            <motion.div
              className="placedly-lift-card placedly-lift-card--daniel"
              animate={{ y: [0, 6, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut', delay: 0.4 }}
            >
              <div className="placedly-lift-card-row">
                <img
                  src={DANIEL_AVATAR}
                  alt=""
                  className="placedly-lift-card-avatar"
                  width={44}
                  height={44}
                  loading="lazy"
                  decoding="async"
                />
                <div className="placedly-lift-card-info">
                  <p className="placedly-lift-card-name">
                    {cms['hp:heroDanielName'] ?? 'Daniel'}
                  </p>
                  <p className="placedly-lift-card-role">Marketing Leader</p>
                </div>
              </div>
              <p className="placedly-lift-card-action">
                Interested in <strong>{admitProgramme}</strong>
              </p>
            </motion.div>

            {/* Scattered avatars + decorative ball */}
            <div className="placedly-lift-scatter">
              <div
                className="placedly-lift-scatter-ball"
                style={{ top: '60%', left: '22%' }}
                aria-hidden
              />

              {SCATTER_AVATARS.map((person, i) => (
                <motion.div
                  key={person.src}
                  className="placedly-lift-scatter-avatar-wrap"
                  style={{
                    top: person.top,
                    left: person.left,
                    width: person.size,
                    height: person.size,
                    zIndex: 1,
                  }}
                  animate={{ y: [0, -4, 0] }}
                  transition={{
                    duration: 4 + (i % 3),
                    repeat: Infinity,
                    ease: 'easeInOut',
                    delay: i * 0.2,
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
                  {person.ring && <span className="placedly-lift-scatter-ring" />}
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* ── Stats bar ── */}
        <motion.div
          className="placedly-lift-stats"
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.45 }}
        >
          <div className="placedly-lift-stat">
            <span className="placedly-lift-stat-icon">
              <Shield size={22} strokeWidth={1.75} />
            </span>
            <div className="placedly-lift-stat-text">
              <span className="placedly-lift-stat-prefix">Trusted by</span>
              <span className="placedly-lift-stat-value">500+</span>
              <span className="placedly-lift-stat-suffix">Companies</span>
            </div>
          </div>

          <div className="placedly-lift-stat">
            <span className="placedly-lift-stat-icon">
              <Users size={22} strokeWidth={1.75} />
            </span>
            <div className="placedly-lift-stat-text">
              <span className="placedly-lift-stat-value">50,000+</span>
              <span className="placedly-lift-stat-suffix">Careers Transformed</span>
            </div>
          </div>

          <div className="placedly-lift-stat">
            <span className="placedly-lift-stat-icon">
              <Globe size={22} strokeWidth={1.75} />
            </span>
            <div className="placedly-lift-stat-text">
              <span className="placedly-lift-stat-prefix">Global Opportunities</span>
              <span className="placedly-lift-stat-value">Across</span>
              <span className="placedly-lift-stat-suffix">20+ Countries</span>
            </div>
          </div>

          <div className="placedly-lift-stat">
            <span className="placedly-lift-stat-icon">
              <Award size={22} strokeWidth={1.75} />
            </span>
            <div className="placedly-lift-stat-text">
              <span className="placedly-lift-stat-value">10+ Years of</span>
              <span className="placedly-lift-stat-suffix">Recruitment Excellence</span>
            </div>
          </div>
        </motion.div>
      </div>

      <HeroMobileBrief cms={cms} />
      <HiringPartnersMarquee cms={cms} />
    </section>
  );
}