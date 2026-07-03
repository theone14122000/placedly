'use client';

import { motion, useMotionValue, useSpring, useTransform, useInView } from 'framer-motion';
import {
  Share2,
  Sparkles,
  Briefcase,
  Globe,
  Users,
  ShieldCheck,
  Award,
  ArrowRight,
  type LucideIcon,
} from 'lucide-react';
import Link from 'next/link';
import { useEffect, useRef } from 'react';
import HeroMobileBrief from './HeroMobileBrief';
import HeroGradientBg from './HeroGradientBg';
import HeroBgVideo from './HeroBgVideo';
import HiringPartnersMarquee from './HiringPartnersMarquee';

type HeroCms = { [k: string]: string };

/* ─── Scatter avatars — restored original composition, repositioned to fit the centered stage without overlap ─── */
const SCATTER_AVATARS = [
  { src: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=128&h=128&fit=crop&crop=face', top: '0%',  left: '40%', size: 46, badge: false, depth: 16 },
  { src: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=128&h=128&fit=crop&crop=face', top: '4%',  left: '80%', size: 44, badge: true,  depth: 26 },
  { src: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=128&h=128&fit=crop&crop=face', top: '42%', left: '6%',  size: 50, badge: true,  depth: 12 },
  { src: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=128&h=128&fit=crop&crop=face', top: '38%', left: '90%', size: 46, badge: true,  depth: 22 },
  { src: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=128&h=128&fit=crop&crop=face', top: '76%', left: '36%', size: 44, badge: false, depth: 18 },
] as const;

const HERO_CARD_AVATARS = {
  left: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=96&h=96&fit=crop&crop=face',
  right: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=96&h=96&fit=crop&crop=face',
} as const;

/* ─── Stat data ─── */
const STATS = [
  { icon: ShieldCheck, prefix: 'Trusted by', value: 500, suffix: '+', label: 'Companies' },
  { icon: Users, prefix: '', value: 50000, suffix: '+', label: 'Careers Transformed' },
  { icon: Globe, prefix: 'Global Opportunities Across', value: 20, suffix: '+', label: 'Countries' },
  { icon: Award, prefix: '', value: 10, suffix: '+ Years', label: 'Recruitment Excellence' },
] as const;

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

/* ─── Count-up number ─── */
function CountUpNumber({ value, suffix = '' }: { value: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: '-40px' });
  const motionVal = useMotionValue(0);
  const spring = useSpring(motionVal, { damping: 22, stiffness: 90 });
  const display = useTransform(spring, (v) => `${Math.floor(v).toLocaleString()}${suffix}`);

  useEffect(() => {
    if (inView) motionVal.set(value);
  }, [inView, value, motionVal]);

  return <motion.span ref={ref}>{display}</motion.span>;
}

/* ─── Dynamic shine-pill CTA — animated gradient shift + pulsing glow + icon spin on hover ─── */
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
      whileHover={{ y: -4, scale: 1.02 }}
      whileTap={{ scale: 0.97 }}
    >
      <Link href={href} className={`placedly-hero-cta placedly-hero-cta--${variant}`}>
        <span className="placedly-hero-cta-glow" aria-hidden />
        <span className="placedly-hero-cta-shine" aria-hidden />
        <span className="placedly-hero-cta-label">{label}</span>
        <motion.span
          className="placedly-hero-cta-icon"
          animate={{ x: [0, 3, 0] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut', delay: delay + 0.3 }}
          whileHover={{ rotate: 90 }}
        >
          <Icon size={13} strokeWidth={2.5} />
        </motion.span>
      </Link>
    </motion.div>
  );
}

export default function Hero({ cms = {} }: { cms?: HeroCms }) {
  const offerRole      = cms['hp:heroOfferRole']      ?? 'Senior Claims Analyst';
  const admitProgramme = cms['hp:heroAdmitProgramme'] ?? "MSc International Business · Fall '25";

  /* ── mouse-parallax for the floating stage ── */
  const stageRef = useRef<HTMLDivElement>(null);
  const mx = useMotionValue(0.5);
  const my = useMotionValue(0.5);
  const smx = useSpring(mx, { damping: 24, stiffness: 120 });
  const smy = useSpring(my, { damping: 24, stiffness: 120 });

  function handleStageMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    const rect = stageRef.current?.getBoundingClientRect();
    if (!rect) return;
    mx.set((e.clientX - rect.left) / rect.width);
    my.set((e.clientY - rect.top) / rect.height);
  }
  function handleStageMouseLeave() {
    mx.set(0.5);
    my.set(0.5);
  }

  return (
    <section id="Top" className="placedly-cap-hero">
      <style>{`
        /* ============================================================
           DYNAMIC HERO CTA SYSTEM — animated gradient + pulsing glow
           ============================================================ */
        @keyframes placedly-cta-glow-pulse {
          0%, 100% { opacity: 0.55; transform: scale(1); }
          50%      { opacity: 0.9;  transform: scale(1.08); }
        }

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
          overflow: visible;
          isolation: isolate;
          cursor: pointer;
          background-size: 220% 220%;
          background-position: 0% 50%;
          animation: placedly-gradient-shift 5s ease infinite;
          transition: box-shadow 0.28s cubic-bezier(0.22,1,0.36,1), filter 0.28s ease;
        }

        .placedly-hero-cta--get-placed {
          background-image: linear-gradient(135deg, #2563eb, #7c8ff0, #a855f7, #2563eb);
          box-shadow:
            0 8px 22px rgba(37, 99, 235, 0.32),
            0 2px 6px rgba(0, 0, 0, 0.12),
            inset 0 1px 0 rgba(255,255,255,0.25);
        }
        .placedly-hero-cta--get-placed:hover {
          box-shadow:
            0 18px 38px rgba(37, 99, 235, 0.46),
            0 4px 10px rgba(0, 0, 0, 0.16),
            inset 0 1px 0 rgba(255,255,255,0.3);
        }

        .placedly-hero-cta--study-abroad {
          background-image: linear-gradient(135deg, #fb923c, #f43f5e, #a855f7, #fb923c);
          box-shadow:
            0 8px 22px rgba(251, 146, 60, 0.32),
            0 2px 6px rgba(0, 0, 0, 0.12),
            inset 0 1px 0 rgba(255,255,255,0.25);
        }
        .placedly-hero-cta--study-abroad:hover {
          box-shadow:
            0 18px 38px rgba(244, 63, 94, 0.44),
            0 4px 10px rgba(0, 0, 0, 0.16),
            inset 0 1px 0 rgba(255,255,255,0.3);
        }

        .placedly-hero-cta:hover { filter: brightness(1.08) saturate(1.08); }
        .placedly-hero-cta:active { filter: brightness(0.98); }

        /* pulsing glow halo behind the button */
        .placedly-hero-cta-glow {
          position: absolute;
          inset: -6px;
          border-radius: 999px;
          z-index: -1;
          filter: blur(14px);
          background: inherit;
          background-image: inherit;
          animation: placedly-cta-glow-pulse 2.6s ease-in-out infinite;
          pointer-events: none;
        }

        .placedly-hero-cta-label { position: relative; z-index: 1; white-space: nowrap; }

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
          transition: background 0.3s ease;
        }
        .placedly-hero-cta:hover .placedly-hero-cta-icon { background: rgba(255, 255, 255, 0.36); }

        .placedly-hero-cta-shine {
          position: absolute;
          top: 0; left: -130%;
          width: 55%; height: 100%;
          background: linear-gradient(115deg, transparent, rgba(255,255,255,0.55), transparent);
          transform: skewX(-20deg);
          transition: left 0.65s ease;
          z-index: 0;
          pointer-events: none;
          border-radius: inherit;
          overflow: hidden;
        }
        .placedly-hero-cta:hover .placedly-hero-cta-shine { left: 140%; }

        .placedly-lift-hero-ctas,
        .placedly-cap-hero-ctas {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 14px;
          flex-wrap: wrap;
        }

        @media (max-width: 640px) {
          .placedly-hero-cta { width: 100%; justify-content: center; padding: 15px 22px; font-size: 15px; }
          .placedly-cap-hero-ctas { flex-direction: column; align-items: stretch; }
        }

        /* ============================================================
           HERO LAYOUT
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

        .placedly-cap-hero-copy { text-align: center; max-width: 720px; margin: 0 auto; }

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

        .placedly-cap-hero-ctas { margin-bottom: clamp(40px, 5.5vw, 58px); }

        /* Stage — restored original card + scatter + glass-pill composition */
        .placedly-cap-hero-stage {
          position: relative;
          width: 100%;
          max-width: 860px;
          height: clamp(340px, 38vw, 440px);
          margin: 0 auto clamp(32px, 4.5vw, 48px);
        }

        .placedly-cap-card {
          position: absolute;
          width: clamp(200px, 22vw, 236px);
          background: #ffffff;
          border-radius: 18px;
          padding: 14px 16px;
          box-shadow: 0 16px 36px rgba(15, 23, 42, 0.12);
          border: 1px solid rgba(15, 23, 42, 0.04);
          z-index: 4;
          cursor: default;
          transition: box-shadow 0.3s ease;
        }
        .placedly-cap-card:hover { box-shadow: 0 22px 48px rgba(15, 23, 42, 0.18); }
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

        /* Scatter avatars with connector badge — restored from original */
        .placedly-cap-scatter { position: absolute; inset: 0; z-index: 1; }

        .placedly-cap-scatter-avatar-wrap {
          position: absolute;
          border-radius: 50%;
          overflow: visible;
          cursor: default;
        }
        .placedly-cap-scatter-avatar {
          width: 100%; height: 100%; object-fit: cover; display: block;
          border-radius: 50%;
          box-shadow: 0 8px 18px rgba(15,23,42,0.16);
          border: 3px solid #fff;
        }
        .placedly-cap-scatter-badge {
          position: absolute;
          bottom: -3px;
          right: -3px;
          width: 20px;
          height: 20px;
          border-radius: 50%;
          background: linear-gradient(135deg, #2563eb, #a855f7);
          color: #fff;
          display: flex;
          align-items: center;
          justify-content: center;
          border: 2px solid #fff;
          box-shadow: 0 3px 8px rgba(37,99,235,0.4);
        }

        /* Glass pills — restored "Shared / Recommended" pair from original */
        .placedly-cap-glass-pill {
          position: absolute;
          display: flex;
          align-items: center;
          gap: 9px;
          background: rgba(255,255,255,0.88);
          backdrop-filter: blur(10px);
          -webkit-backdrop-filter: blur(10px);
          border: 1px solid rgba(255,255,255,0.6);
          border-radius: 14px;
          padding: 9px 14px;
          box-shadow: 0 10px 24px rgba(37,99,235,0.14);
          z-index: 3;
        }
        .placedly-cap-glass-pill--share { top: 26%; left: 40%; }
        .placedly-cap-glass-pill--rec   { top: 46%; left: 46%; }

        .placedly-cap-glass-pill-icon {
          width: 27px; height: 27px; border-radius: 50%;
          background: linear-gradient(135deg, #2563eb, #a855f7);
          color: #fff;
          display: flex; align-items: center; justify-content: center;
          flex-shrink: 0;
        }
        .placedly-cap-glass-pill-text { display: flex; flex-direction: column; line-height: 1.2; white-space: nowrap; }
        .placedly-cap-glass-pill-text strong {
          font-size: 12.5px;
          font-weight: 700;
          background-image: linear-gradient(90deg, #2563eb, #a855f7);
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
        }
        .placedly-cap-glass-pill-text span { font-size: 12.5px; color: #0f172a; font-weight: 600; }

        /* ============================================================
           DYNAMIC STATS BAR
           ============================================================ */
        .placedly-cap-stats {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(190px, 1fr));
          gap: clamp(10px, 1.4vw, 14px);
          max-width: 920px;
          margin: 0 auto clamp(36px, 5vw, 52px);
        }

        .placedly-cap-stat {
          position: relative;
          display: flex;
          align-items: center;
          gap: 10px;
          background: #ffffff;
          border: 1px solid #eef1f6;
          border-radius: 16px;
          padding: 14px 16px;
          box-shadow: 0 6px 16px rgba(15,23,42,0.05);
          overflow: hidden;
          isolation: isolate;
          cursor: default;
        }

        .placedly-cap-stat-shine {
          position: absolute;
          top: 0; left: -130%;
          width: 60%; height: 100%;
          background: linear-gradient(115deg, transparent, rgba(124,143,240,0.16), transparent);
          transform: skewX(-20deg);
          transition: left 0.7s ease;
          z-index: 0;
          pointer-events: none;
        }
        .placedly-cap-stat:hover .placedly-cap-stat-shine { left: 140%; }

        .placedly-cap-stat-icon {
          position: relative;
          z-index: 1;
          width: 38px; height: 38px; border-radius: 50%;
          border: 1.5px solid #e5e7ff;
          display: flex; align-items: center; justify-content: center;
          flex-shrink: 0;
          background: linear-gradient(135deg, #eef2ff, #fdf2f8);
          color: #7c3aed;
          transition: transform 0.35s cubic-bezier(0.22,1,0.36,1);
        }
        .placedly-cap-stat:hover .placedly-cap-stat-icon { transform: scale(1.12) rotate(-6deg); }

        .placedly-cap-stat-text { position: relative; z-index: 1; display: flex; flex-direction: column; line-height: 1.25; min-width: 0; }
        .placedly-cap-stat-text span:first-child {
          font-size: 11.5px; color: #64748b; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
        }
        .placedly-cap-stat-text strong {
          font-size: 15px; font-weight: 800;
          background-image: linear-gradient(90deg, #2563eb, #a855f7);
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
        }

        /* "Landed roles at" heading */
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

      <div className="placedly-cap-hero-bg" aria-hidden>
        <HeroGradientBg />
        <HeroBgVideo />
      </div>

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
              'Career Placement & Global Education Consultancy — Delhi NCR.'}
          </motion.p>

          <div className="placedly-cap-hero-ctas">
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

        {/* ── Stage — restored card/scatter/glass-pill layout with parallax ── */}
        <motion.div
          ref={stageRef}
          className="placedly-cap-hero-stage"
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, delay: 0.3 }}
          onMouseMove={handleStageMouseMove}
          onMouseLeave={handleStageMouseLeave}
        >
          {/* Left card */}
          <motion.div
            className="placedly-cap-card placedly-cap-card--left"
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 5.5, repeat: Infinity, ease: 'easeInOut' }}
            style={{
              x: useTransform(smx, [0, 1], [-8, 8]),
              y: useTransform(smy, [0, 1], [-5, 5]),
            }}
            whileHover={{ scale: 1.03 }}
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
                <p className="placedly-cap-name">{cms['hp:heroOfferName'] ?? 'Priya'}</p>
                <p className="placedly-cap-role">CAP · India careers</p>
              </div>
            </div>
            <p className="placedly-cap-line">
              Targeting <strong>{offerRole}</strong>
            </p>
          </motion.div>

          {/* Scatter avatars with badges */}
          <div className="placedly-cap-scatter" aria-hidden>
            {SCATTER_AVATARS.map((person, i) => (
              <motion.div
                key={person.src}
                className="placedly-cap-scatter-avatar-wrap"
                style={{
                  top: person.top,
                  left: person.left,
                  width: person.size,
                  height: person.size,
                  zIndex: i + 1,
                  x: useTransform(smx, [0, 1], [-person.depth, person.depth]),
                  y: useTransform(smy, [0, 1], [-person.depth, person.depth]),
                }}
                animate={{ y: [0, i % 2 === 0 ? -6 : 6, 0] }}
                transition={{ duration: 4.5 + i, repeat: Infinity, ease: 'easeInOut', delay: i * 0.25 }}
                whileHover={{ scale: 1.15 }}
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
                {person.badge && (
                  <span className="placedly-cap-scatter-badge">
                    <Share2 size={11} strokeWidth={2.5} />
                  </span>
                )}
              </motion.div>
            ))}
          </div>

          {/* Glass pills — Shared / Recommended */}
          <motion.div
            className="placedly-cap-glass-pill placedly-cap-glass-pill--share"
            animate={{ y: [0, -5, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
            style={{
              x: useTransform(smx, [0, 1], [-10, 10]),
              y: useTransform(smy, [0, 1], [-8, 8]),
            }}
            whileHover={{ scale: 1.05 }}
          >
            <span className="placedly-cap-glass-pill-icon">
              <Share2 size={13} strokeWidth={2.25} />
            </span>
            <span className="placedly-cap-glass-pill-text">
              <strong>Shared</strong>
              <span>CAP roadmap</span>
            </span>
          </motion.div>

          <motion.div
            className="placedly-cap-glass-pill placedly-cap-glass-pill--rec"
            animate={{ y: [0, 5, 0] }}
            transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut', delay: 0.3 }}
            style={{
              x: useTransform(smx, [0, 1], [10, -10]),
              y: useTransform(smy, [0, 1], [8, -8]),
            }}
            whileHover={{ scale: 1.05 }}
          >
            <span className="placedly-cap-glass-pill-icon">
              <Sparkles size={13} strokeWidth={2.25} />
            </span>
            <span className="placedly-cap-glass-pill-text">
              <strong>Recommended</strong>
              <span>Admit path</span>
            </span>
          </motion.div>

          {/* Right card */}
          <motion.div
            className="placedly-cap-card placedly-cap-card--right"
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut', delay: 0.4 }}
            style={{
              x: useTransform(smx, [0, 1], [8, -8]),
              y: useTransform(smy, [0, 1], [5, -5]),
            }}
            whileHover={{ scale: 1.03 }}
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
                <p className="placedly-cap-name">{cms['hp:heroAdmitName'] ?? 'Arjun'}</p>
                <p className="placedly-cap-role">Study abroad track</p>
              </div>
            </div>
            <p className="placedly-cap-line">
              Interested in{' '}
              <strong>{admitProgramme.split('·')[0]?.trim() ?? 'UK Masters'}</strong>
            </p>
          </motion.div>
        </motion.div>

        {/* ── Dynamic stats bar ── */}
        <motion.div
          className="placedly-cap-stats"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-60px' }}
          variants={{ hidden: {}, show: { transition: { staggerChildren: 0.1 } } }}
        >
          {STATS.map((stat) => (
            <motion.div
              key={stat.label}
              className="placedly-cap-stat"
              variants={{
                hidden: { opacity: 0, y: 18, scale: 0.96 },
                show: { opacity: 1, y: 0, scale: 1 },
              }}
              transition={{ duration: 0.45, ease: 'easeOut' }}
              whileHover={{ y: -4, boxShadow: '0 14px 30px rgba(37,99,235,0.14)' }}
            >
              <span className="placedly-cap-stat-shine" aria-hidden />
              <span className="placedly-cap-stat-icon">
                <stat.icon size={16} strokeWidth={2} />
              </span>
              <span className="placedly-cap-stat-text">
                {stat.prefix && <span>{stat.prefix}</span>}
                <strong>
                  <CountUpNumber value={stat.value} suffix={stat.suffix} />
                  {!stat.prefix ? ` ${stat.label}` : ''}
                </strong>
                {stat.prefix && <span style={{ marginTop: 2 }}>{stat.label}</span>}
              </span>
            </motion.div>
          ))}
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