'use client';

import React from 'react';
import { motion } from 'framer-motion';
import {
  Share2, Sparkles, Briefcase, Building2, Globe,
  ShieldCheck, Users, Award, ArrowRight, type LucideIcon,
} from 'lucide-react';
import Link from 'next/link';

type HeroCms = { [k: string]: string };

const G = {
  deep:  '#1e3a8a',
  royal: '#2563eb',
  sky:   '#0ea5e9',
  orange: '#fb923c',
  green:  '#16a34a',
  purple: '#a855f7',
};

/* ── Scatter avatars — kept for visual continuity, slightly simplified ── */
const SCATTER_AVATARS = [
  { src: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=80&h=80&fit=crop&crop=face', top: '8%',  left: '5%',  size: 26, rotate: -10, delay: 0.10 },
  { src: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&h=80&fit=crop&crop=face', top: '2%',  left: '44%', size: 32, rotate: 0,   delay: 0.18, center: true },
  { src: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=80&h=80&fit=crop&crop=face', top: '65%', left: '38%', size: 22, rotate: -6,  delay: 0.14 },
  { src: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=80&h=80&fit=crop&crop=face', top: '12%', left: '82%', size: 20, rotate: 8,   delay: 0.22 },
  { src: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=80&h=80&fit=crop&crop=face', top: '70%', left: '68%', size: 24, rotate: 5,   delay: 0.28 },
] as const;

const HERO_CARD_AVATARS = {
  left:  'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=64&h=64&fit=crop&crop=face',
  right: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=64&h=64&fit=crop&crop=face',
} as const;

/* ── 3 CTA pills — same shades as desktop ── */
const HERO_CTAS = [
  { id: 'candidates', icon: Briefcase, cmsKey: 'hp:heroPrimaryCtaText',   fallback: 'For Candidates', href: '/contact',      shade: 'deep' as const },
  { id: 'recruiters', icon: Building2, cmsKey: 'hp:heroRecruiterCtaText', fallback: 'For Recruiters', href: '/recruiters',   shade: 'royal' as const },
  { id: 'study',      icon: Globe,     cmsKey: 'hp:heroSecondaryCtaText', fallback: 'Study Abroad',   href: '/study-visa',   shade: 'sky' as const },
] as const;

/* ── Stats — same as desktop ── */
const HERO_STATS = [
  { icon: ShieldCheck, value: '40+', label: 'Companies Trusted' },
  { icon: Users,       value: '1K+', label: 'Candidates Placed' },
  { icon: Globe,       value: '20+', label: 'Countries' },
  { icon: Award,       value: '10+', label: 'Yrs Experience' },
] as const;

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
      </Link>
    </motion.div>
  );
}

function MobileStatPill({
  icon: Icon, value, label, delay = 0,
}: {
  icon: LucideIcon; value: string; label: string; delay?: number;
}) {
  return (
    <motion.div
      className="mb-stat-pill"
      initial={{ opacity: 0, y: 12, scale: 0.94 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.36, delay }}
    >
      <span className="mb-stat-pill-icon">
        <Icon size={13} strokeWidth={2.15} />
      </span>
      <span className="mb-stat-pill-text">
        <strong>{value}</strong>
        <span>{label}</span>
      </span>
    </motion.div>
  );
}

/* ════ MICRO FLOATING CARD ════ */
function MicroCard({
  side, avatarSrc, name, topLine, bottomLine, animY, delay = 0,
}: {
  side: 'left' | 'right';
  avatarSrc: string;
  name: string;
  topLine: string;
  bottomLine: string;
  animY: number[];
  delay?: number;
}) {
  const isLeft = side === 'left';

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.82, y: 6 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.3 + delay }}
    >
      <motion.div
        animate={{ y: animY }}
        transition={{ duration: isLeft ? 5.5 : 6, repeat: Infinity, ease: 'easeInOut', delay }}
        style={{
          position: 'absolute',
          bottom: isLeft ? '16%' : '10%',
          left:  isLeft ? '2%'  : undefined,
          right: isLeft ? undefined : '2%',
          width: '104px',
          background: '#ffffff',
          borderRadius: '11px',
          padding: '7px 8px',
          boxShadow: isLeft
            ? `0 6px 16px rgba(30,58,138,0.14)`
            : `0 6px 16px rgba(14,165,233,0.14)`,
          border: `1px solid ${isLeft ? '#dbeafe' : '#bae6fd'}`,
          zIndex: 10,
        }}
      >
        <div style={{
          position: 'absolute', top: 0, left: 0, right: 0, height: '2px',
          borderRadius: '11px 11px 0 0',
          background: isLeft
            ? `linear-gradient(90deg,${G.deep},${G.royal})`
            : `linear-gradient(90deg,${G.royal},${G.sky})`,
        }} />

        <div style={{ display: 'flex', alignItems: 'center', gap: '5px', marginBottom: '5px' }}>
          <img
            src={avatarSrc} alt="" width={20} height={20}
            loading="lazy" decoding="async"
            style={{
              width: '20px', height: '20px', borderRadius: '50%',
              objectFit: 'cover', border: '1.5px solid #fff',
              boxShadow: '0 1px 3px rgba(0,0,0,0.12)', flexShrink: 0,
            }}
          />
          <p style={{
            fontSize: '9.5px', fontWeight: 700, color: '#0f172a',
            margin: 0, lineHeight: 1.1,
            whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis',
          }}>
            {name}
          </p>
        </div>

        <div style={{
          background: isLeft ? '#eff6ff' : '#f0f9ff',
          border: `1px solid ${isLeft ? '#dbeafe' : '#bae6fd'}`,
          borderRadius: '7px', padding: '4px 6px',
        }}>
          <p style={{
            fontSize: '8px', color: '#64748b',
            margin: '0 0 1px', lineHeight: 1.2,
            whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis',
          }}>
            {topLine}
          </p>
          <p style={{
            fontSize: '9px', fontWeight: 700,
            color: isLeft ? G.deep : G.sky,
            margin: 0, lineHeight: 1.2,
            whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis',
          }}>
            {bottomLine}
          </p>
        </div>
      </motion.div>
    </motion.div>
  );
}

/* ════════════════════════════════════════════
   MAIN MOBILE HERO — clean, no bg gradient/video
════════════════════════════════════════════ */
export default function HeroMobileBrief({ cms = {} }: { cms?: HeroCms }) {
  const offerRole      = cms['hp:heroOfferRole']      ?? 'Sr. Claims Analyst';
  const offerName      = cms['hp:heroOfferName']      ?? 'Priya';
  const admitName      = cms['hp:heroAdmitName']      ?? 'Arjun';
  const admitProgramme = cms['hp:heroAdmitProgramme'] ?? "MSc Int'l Business";
  const subline        = cms['hp:heroSubline']        ?? 'Career Placement & Global Education — Delhi NCR.';

  const admitShort = admitProgramme.split('·')[0]?.trim().slice(0, 18) ?? 'UK Masters';
  const roleShort  = offerRole.slice(0, 16);

  return (
    <div className="placedly-hero-mobile-brief" aria-label="Mobile hero">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;600;700;800&family=Poppins:wght@400;500;600;700;800&display=swap');

        .placedly-hero-mobile-brief {
          font-family: 'Outfit', 'Poppins', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
          letter-spacing: -0.01em;
          background: #ffffff;
          padding: clamp(28px, 6vw, 40px) 18px clamp(20px, 4vw, 28px);
        }

        .mb-headline {
          font-size: clamp(1.7rem, 7vw, 2.1rem);
          font-weight: 800;
          line-height: 1.16;
          letter-spacing: -0.02em;
          color: #0f172a;
          text-align: center;
          margin: 0 0 10px;
        }

        .mb-sub {
          font-size: 14px;
          line-height: 1.55;
          color: #55607a;
          text-align: center;
          max-width: 320px;
          margin: 0 auto 20px;
        }

        /* ── CTA pills — same blue-shade system as desktop ── */
        .mb-cta-row {
          display: flex;
          gap: 8px;
          width: 100%;
          margin-bottom: clamp(20px, 4vw, 28px);
        }

        .mb-cta-pill {
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 6px;
          width: 100%;
          padding: 11px 8px;
          border-radius: 999px;
          font-weight: 700;
          font-size: 11.5px;
          text-decoration: none;
          color: #ffffff;
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
        }

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

        /* ── Scene ── */
        .mb-scene {
          position: relative;
          width: 100%;
          height: 186px;
          max-width: 400px;
          margin: 0 auto clamp(20px, 4vw, 28px);
          overflow: hidden;
          border-radius: 18px;
          background: linear-gradient(135deg, #f8faff, #f0f7ff);
          border: 1px solid #eef2f9;
        }

        @keyframes mb-pulse-ring {
          0%   { transform: scale(1);    opacity: .4; }
          70%  { transform: scale(1.55); opacity: 0;  }
          100% { transform: scale(1.55); opacity: 0;  }
        }

        .mb-av-center {
          box-shadow:
            0 0 0 2.5px rgba(255,255,255,0.95),
            0 5px 16px rgba(37,99,235,0.30) !important;
        }

        /* ── Stats bar — pill-shaped, same as desktop ── */
        .mb-stats-bar {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 8px;
          width: 100%;
        }

        .mb-stat-pill {
          display: flex;
          align-items: center;
          gap: 8px;
          background: #ffffff;
          border: 1px solid #e7ebf3;
          border-radius: 999px;
          padding: 9px 12px 9px 8px;
          box-shadow: 0 3px 10px rgba(15,23,42,0.05);
        }

        .mb-stat-pill-icon {
          width: 28px;
          height: 28px;
          border-radius: 50%;
          flex-shrink: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          background: linear-gradient(135deg, #eff6ff, #dbeafe);
          border: 1.5px solid #bfdbfe;
          color: #1e40af;
        }

        .mb-stat-pill-text {
          display: flex;
          flex-direction: column;
          line-height: 1.18;
          min-width: 0;
        }
        .mb-stat-pill-text strong {
          font-size: 13px;
          font-weight: 800;
          color: #1e3a8a;
        }
        .mb-stat-pill-text span {
          font-size: 9.5px;
          font-weight: 500;
          color: #64748b;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
      `}</style>

      {/* ── Copy ── */}
      <motion.h1
        className="mb-headline"
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45 }}
      >
        Grow your career,<br />
        through people you trust.
      </motion.h1>

      <motion.p
        className="mb-sub"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.08 }}
      >
        {subline}
      </motion.p>

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

      {/* ── Visual scene ── */}
      <motion.div
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, delay: 0.22 }}
      >
        <div className="mb-scene">
          {SCATTER_AVATARS.map((person, i) => {
            const isCenter = 'center' in person && person.center;
            const rotate   = person.rotate ?? 0;
            return (
              <motion.div
                key={`av-${i}`}
                initial={{ opacity: 0, scale: 0.6 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.35, delay: 0.28 + person.delay }}
                style={{
                  position: 'absolute',
                  top: person.top,
                  left: person.left,
                  width:  `${person.size}px`,
                  height: `${person.size}px`,
                  zIndex: isCenter ? 8 : i + 2,
                  transform: isCenter ? 'translateX(-50%)' : `rotate(${rotate}deg)`,
                }}
              >
                {isCenter && (
                  <div style={{
                    position: 'absolute', inset: '-4px', borderRadius: '50%',
                    background: `${G.royal}30`,
                    animation: 'mb-pulse-ring 2s ease-out infinite',
                  }} />
                )}
                <img
                  src={person.src} alt=""
                  width={person.size} height={person.size}
                  loading="lazy" decoding="async"
                  className={isCenter ? 'mb-av-center' : ''}
                  style={{
                    width: '100%', height: '100%',
                    borderRadius: '50%', objectFit: 'cover',
                    border: isCenter ? '2.5px solid #fff' : '1.5px solid #fff',
                    boxShadow: isCenter
                      ? `0 5px 16px ${G.royal}35`
                      : '0 2px 6px rgba(0,0,0,0.12)',
                    display: 'block',
                  }}
                />
                {!isCenter && i % 2 === 0 && (
                  <div style={{
                    position: 'absolute', bottom: '-1px', right: '-1px',
                    width: '7px', height: '7px', borderRadius: '50%',
                    background: [G.royal, G.orange, G.green][i % 3],
                    border: '1.5px solid #fff',
                  }} />
                )}
              </motion.div>
            );
          })}

          {/* Glass pill — Shared */}
          <motion.div
            initial={{ opacity: 0, scale: 0.72 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.35, delay: 0.42 }}
            style={{
              position: 'absolute', top: '35%', left: '50%',
              transform: 'translateX(-50%)',
              display: 'inline-flex', alignItems: 'center', gap: '4px',
              background: '#ffffff',
              border: `1px solid #dbeafe`,
              borderRadius: '999px',
              padding: '3px 9px 3px 4px',
              boxShadow: `0 3px 10px rgba(37,99,235,0.1)`,
              zIndex: 9, whiteSpace: 'nowrap',
            }}
          >
            <div style={{
              width: '16px', height: '16px', borderRadius: '50%',
              background: '#eff6ff', border: '1px solid #dbeafe',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              flexShrink: 0,
            }}>
              <Share2 size={7} color={G.royal} />
            </div>
            <span style={{ fontSize: '8.5px', fontWeight: 700, color: '#0f172a' }}>Shared</span>
            <span style={{ fontSize: '8.5px', color: '#64748b' }}>CAP roadmap</span>
          </motion.div>

          {/* Glass pill — Recommended */}
          <motion.div
            initial={{ opacity: 0, scale: 0.72 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.35, delay: 0.5 }}
            style={{
              position: 'absolute', top: '52%', right: '4%',
              display: 'inline-flex', alignItems: 'center', gap: '4px',
              background: '#ffffff',
              border: `1px solid #bae6fd`,
              borderRadius: '999px',
              padding: '3px 9px 3px 4px',
              boxShadow: `0 3px 10px rgba(14,165,233,0.1)`,
              zIndex: 9, whiteSpace: 'nowrap',
            }}
          >
            <div style={{
              width: '16px', height: '16px', borderRadius: '50%',
              background: '#f0f9ff', border: '1px solid #bae6fd',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              flexShrink: 0,
            }}>
              <Sparkles size={7} color={G.sky} />
            </div>
            <span style={{ fontSize: '8.5px', fontWeight: 700, color: '#0f172a' }}>Recommended</span>
            <span style={{ fontSize: '8.5px', color: '#64748b' }}>Admit</span>
          </motion.div>

          <MicroCard
            side="left"
            avatarSrc={HERO_CARD_AVATARS.left}
            name={offerName}
            topLine="Targeting"
            bottomLine={roleShort}
            animY={[0, -5, 0]}
            delay={0}
          />

          <MicroCard
            side="right"
            avatarSrc={HERO_CARD_AVATARS.right}
            name={admitName}
            topLine="Interested in"
            bottomLine={admitShort}
            animY={[0, 5, 0]}
            delay={0.35}
          />
        </div>
      </motion.div>

      {/* ── Stats bar ── */}
      <div className="mb-stats-bar">
        {HERO_STATS.map((stat, i) => (
          <MobileStatPill
            key={stat.label}
            icon={stat.icon}
            value={stat.value}
            label={stat.label}
            delay={0.3 + i * 0.06}
          />
        ))}
      </div>
    </div>
  );
}