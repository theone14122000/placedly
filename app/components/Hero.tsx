'use client';

import { motion, useMotionValue, useSpring, useTransform, useInView } from 'framer-motion';
import {
  Share2, Sparkles, Globe, Users, ShieldCheck, Award,
  ArrowRight, UserCheck, Building2, type LucideIcon,
} from 'lucide-react';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import HeroMobileBrief from './HeroMobileBrief';
import HeroGradientBg from './HeroGradientBg';
import HeroBgVideo from './HeroBgVideo';
import HiringPartnersMarquee from './HiringPartnersMarquee';

type HeroCms = { [k: string]: string };

/* ─── Compact centered cluster — replaces the far-flung scatter ─── */
const CLUSTER_AVATARS = [
  { src: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=128&h=128&fit=crop&crop=face', top: '-6%', left: '30%', size: 44, badge: false, depth: 12 },
  { src: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=128&h=128&fit=crop&crop=face', top: '2%',   left: '76%', size: 34, badge: true,  depth: 20 },
  { src: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=128&h=128&fit=crop&crop=face', top: '68%', left: '4%',  size: 36, badge: true,  depth: 10 },
] as const;

const HERO_CARD_AVATARS = {
  left:  'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=96&h=96&fit=crop&crop=face',
  right: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=96&h=96&fit=crop&crop=face',
} as const;

const STATS = [
  { icon: ShieldCheck, value: 500,   suffix: '+', label: 'Companies Trusted Us' },
  { icon: Users,       value: 50000, suffix: '+', label: 'Careers Transformed'  },
  { icon: Globe,       value: 20,    suffix: '+', label: 'Countries'             },
  { icon: Award,       value: 10,    suffix: '+', label: 'Years Excellence'      },
] as const;

const NAV_PILLS = [
  {
    id: 'candidates' as const,
    icon: UserCheck,
    label: 'For Candidates',
    sub: 'Find Jobs & Build Your Career',
    variant: 'primary' as const,
    href: '/contact',
    popup: {
      title: 'For Candidates',
      items: [
        { icon: '🎯', heading: 'Get Placed Fast', sub: 'Match with top employers in 48h' },
        { icon: '📋', heading: 'Resume Review',   sub: 'AI-powered feedback & scoring'   },
        { icon: '🚀', heading: 'Career Roadmap',  sub: 'Personalised growth path'        },
      ],
    },
  },
  {
    id: 'recruiters' as const,
    icon: Building2,
    label: 'For Recruiters',
    sub: 'Hire Top Talent Faster',
    variant: 'secondary' as const,
    href: '/recruiters',
    popup: {
      title: 'For Recruiters',
      items: [
        { icon: '🔍', heading: 'Source Top Talent',   sub: 'Pre-vetted candidate pool'   },
        { icon: '⚡', heading: 'Hire in Days',        sub: 'Streamlined shortlisting'    },
        { icon: '📊', heading: 'Analytics Dashboard', sub: 'Track pipeline in real-time' },
      ],
    },
  },
  {
    id: 'study' as const,
    icon: Globe,
    label: 'Study Abroad',
    sub: 'Study in Top Countries',
    variant: 'tertiary' as const,
    href: '/study-visa',
    popup: {
      title: 'Study Abroad',
      items: [
        { icon: '🌍', heading: '20+ Countries',     sub: 'UK, US, Canada, Europe & more' },
        { icon: '🎓', heading: 'University Admits', sub: 'Expert application guidance'   },
        { icon: '✈️', heading: 'Visa Support',      sub: 'End-to-end visa assistance'    },
      ],
    },
  },
] as const;

type PopupKey = 'candidates' | 'recruiters' | 'study' | null;

function AnimatedGradientText({ children, as: Tag = 'span' }: {
  children: React.ReactNode;
  as?: 'span' | 'h1' | 'h2' | 'h3';
}) {
  return (
    <>
      <Tag style={{
        backgroundImage: 'linear-gradient(270deg,#2563eb,#7c8ff0,#fb923c,#f43f5e,#a855f7,#2563eb)',
        backgroundSize: '300% 300%',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        backgroundClip: 'text',
        animation: 'ph-grad 6s ease infinite',
        display: 'inline',
      }}>
        {children}
      </Tag>
      <style>{`
        @keyframes ph-grad {
          0%   { background-position: 0%   50%; }
          50%  { background-position: 100% 50%; }
          100% { background-position: 0%   50%; }
        }
      `}</style>
    </>
  );
}

function CountUpNumber({ value, suffix = '' }: { value: number; suffix?: string }) {
  const ref    = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: '-40px' });
  const mv     = useMotionValue(0);
  const sp     = useSpring(mv, { damping: 22, stiffness: 90 });
  const disp   = useTransform(sp, (v) => `${Math.floor(v).toLocaleString()}${suffix}`);
  useEffect(() => { if (inView) mv.set(value); }, [inView, value, mv]);
  return <motion.span ref={ref}>{disp}</motion.span>;
}

/* ─── Dynamic pill button: animated gradient + pulsing glow + shine sweep ─── */
function NavPillButton({ pill, active, onClick, delay }: {
  pill: typeof NAV_PILLS[number];
  active: boolean;
  onClick: () => void;
  delay: number;
}) {
  const Icon = pill.icon;
  return (
    <motion.div
      className="ph-pill-wrap"
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.42, delay }}
      whileHover={{ y: -3, scale: 1.015 }}
      whileTap={{ scale: 0.97 }}
    >
      <span className={`ph-pill-glow ph-pill-glow--${pill.variant}`} aria-hidden />
      <button
        className={`ph-pill ph-pill--${pill.variant}${active ? ' ph-pill--on' : ''}`}
        onClick={onClick}
        aria-expanded={active}
      >
        <span className="ph-pill-shine" aria-hidden />
        <span className="ph-pill-icon"><Icon size={16} strokeWidth={2.1} /></span>
        <span className="ph-pill-txt">
          <strong>{pill.label}</strong>
          <span>{pill.sub}</span>
        </span>
        <motion.span
          className={`ph-pill-arr${active ? ' ph-pill-arr--open' : ''}`}
          animate={{ x: active ? 0 : [0, 3, 0] }}
          transition={{ duration: 1.5, repeat: active ? 0 : Infinity, ease: 'easeInOut', delay }}
        >
          <ArrowRight size={12} strokeWidth={2.5} />
        </motion.span>
      </button>
    </motion.div>
  );
}

function PopupCard({ pill, onClose }: { pill: typeof NAV_PILLS[number]; onClose: () => void }) {
  return (
    <motion.div
      className="ph-popup"
      key={pill.id}
      initial={{ opacity: 0, y: 8, scale: 0.96 }}
      animate={{ opacity: 1, y: 0,  scale: 1    }}
      exit={{    opacity: 0, y: 6,  scale: 0.96 }}
      transition={{ duration: 0.18, ease: 'easeOut' }}
    >
      <div className="ph-popup-head">
        <span className="ph-popup-ttl">{pill.popup.title}</span>
        <button className="ph-popup-x" onClick={onClose} aria-label="Close">×</button>
      </div>
      <div className="ph-popup-rows">
        {pill.popup.items.map((item) => (
          <Link key={item.heading} href={pill.href} className="ph-popup-row">
            <span className="ph-popup-em">{item.icon}</span>
            <span className="ph-popup-rtxt">
              <strong>{item.heading}</strong>
              <span>{item.sub}</span>
            </span>
            <ArrowRight size={12} strokeWidth={2} style={{ color: '#94a3b8', flexShrink: 0 }} />
          </Link>
        ))}
      </div>
    </motion.div>
  );
}

export default function Hero({ cms = {} }: { cms?: HeroCms }) {
  const offerRole      = cms['hp:heroOfferRole']      ?? 'Senior Claims Analyst';
  const admitProgramme = cms['hp:heroAdmitProgramme'] ?? "MSc International Business";

  const [activePopup, setActivePopup] = useState<PopupKey>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const mx  = useMotionValue(0.5);
  const my  = useMotionValue(0.5);
  const smx = useSpring(mx, { damping: 24, stiffness: 120 });
  const smy = useSpring(my, { damping: 24, stiffness: 120 });

  function onMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    const r = stageRef.current?.getBoundingClientRect();
    if (!r) return;
    mx.set((e.clientX - r.left) / r.width);
    my.set((e.clientY - r.top)  / r.height);
  }
  function onMouseLeave() { mx.set(0.5); my.set(0.5); }

  useEffect(() => {
    if (!activePopup) return;
    const fn = (e: MouseEvent) => {
      const t = e.target as HTMLElement;
      if (!t.closest('.ph-pill') && !t.closest('.ph-popup')) setActivePopup(null);
    };
    document.addEventListener('mousedown', fn);
    return () => document.removeEventListener('mousedown', fn);
  }, [activePopup]);

  const activePill = NAV_PILLS.find((p) => p.id === activePopup) ?? null;

  return (
    <section id="Top" className="ph-hero">
      <style>{`

        /* ─── SECTION — tightened, no dead space ─────── */
        .ph-hero {
          position: relative;
          overflow: hidden;
          padding-top: clamp(44px, 6vw, 72px);
          padding-bottom: clamp(20px, 3vw, 32px);
          padding-left: 20px;
          padding-right: 20px;
        }

        .ph-wrap {
          position: relative; z-index: 1;
          max-width: 900px;
          margin: 0 auto;
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        /* ─── COPY ────────────────────────────────── */
        .ph-copy {
          width: 100%;
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          margin-bottom: 20px;
        }

        .ph-title {
          font-size: clamp(2rem, 3.8vw, 3.1rem);
          font-weight: 800;
          line-height: 1.13;
          letter-spacing: -0.024em;
          color: #0f172a;
          -webkit-text-fill-color: #0f172a;
          margin: 0 0 12px;
          text-align: center;
          width: 100%;
        }

        .ph-sub {
          font-size: clamp(13.5px, 1.1vw, 15px);
          line-height: 1.6;
          color: #55607a;
          max-width: 460px;
          margin: 0;
          text-align: center;
        }

        /* ─── PILLS — dynamic gradient, glow, shine ──── */
        .ph-pills {
          display: flex;
          align-items: stretch;
          justify-content: center;
          gap: 9px;
          width: 100%;
          max-width: 700px;
        }

        .ph-pill-wrap { position: relative; flex: 1; isolation: isolate; min-width: 0; }

        @keyframes ph-pulse {
          0%, 100% { opacity: 0.32; transform: scale(1); }
          50%      { opacity: 0.6;  transform: scale(1.07); }
        }

        .ph-pill-glow {
          position: absolute;
          inset: -5px;
          border-radius: 17px;
          z-index: 0;
          filter: blur(11px);
          pointer-events: none;
          opacity: 0;
          transition: opacity 0.3s ease;
        }
        .ph-pill-glow--primary {
          background: linear-gradient(135deg, #2563eb, #a855f7);
          opacity: 0.36;
          animation: ph-pulse 2.6s ease-in-out infinite;
        }
        .ph-pill-glow--secondary { background: linear-gradient(135deg, #2563eb, #7c8ff0); }
        .ph-pill-glow--tertiary  { background: linear-gradient(135deg, #a855f7, #fb923c); }
        .ph-pill-wrap:hover .ph-pill-glow--secondary,
        .ph-pill-wrap:hover .ph-pill-glow--tertiary { opacity: 0.3; }

        .ph-pill {
          position: relative;
          z-index: 1;
          width: 100%;
          display: inline-flex;
          align-items: center;
          gap: 9px;
          padding: 10px 12px;
          border-radius: 14px;
          font-family: inherit;
          cursor: pointer;
          border: 1.5px solid transparent;
          text-align: left;
          min-width: 0;
          overflow: hidden;
          isolation: isolate;
          transition: box-shadow .22s, border-color .22s, filter .22s;
        }

        .ph-pill-shine {
          position: absolute;
          top: 0; left: -130%;
          width: 55%; height: 100%;
          background: linear-gradient(115deg, transparent, rgba(255,255,255,0.55), transparent);
          transform: skewX(-20deg);
          transition: left 0.6s ease;
          z-index: 0;
          pointer-events: none;
        }
        .ph-pill:hover .ph-pill-shine { left: 140%; }

        .ph-pill--primary {
          background-image: linear-gradient(135deg, #2563eb, #7c8ff0, #a855f7, #2563eb);
          background-size: 240% 240%;
          background-position: 0% 50%;
          animation: ph-grad 5s ease infinite;
          color: #fff;
          box-shadow: 0 6px 18px rgba(37,99,235,.32), inset 0 1px 0 rgba(255,255,255,.25);
        }
        .ph-pill--primary:hover, .ph-pill--primary.ph-pill--on {
          box-shadow: 0 10px 26px rgba(37,99,235,.46), inset 0 1px 0 rgba(255,255,255,.3);
          filter: brightness(1.06);
        }

        .ph-pill--secondary {
          background: #fff; border-color: #e2e8f0; color: #0f172a;
          box-shadow: 0 3px 10px rgba(15,23,42,.06);
        }
        .ph-pill--secondary:hover,.ph-pill--secondary.ph-pill--on {
          border-color: #2563eb; background: #f4f8ff;
          box-shadow: 0 8px 22px rgba(37,99,235,.16);
        }
        .ph-pill--tertiary {
          background: rgba(248,250,255,.95); border-color: #e2e8f0; color: #0f172a;
          box-shadow: 0 3px 10px rgba(15,23,42,.05);
        }
        .ph-pill--tertiary:hover,.ph-pill--tertiary.ph-pill--on {
          border-color: #a855f7; background: #fdf8ff;
          box-shadow: 0 8px 22px rgba(168,85,247,.16);
        }

        .ph-pill-icon {
          position: relative; z-index: 1;
          width: 32px; height: 32px; border-radius: 9px; flex-shrink: 0;
          display: flex; align-items: center; justify-content: center;
          transition: transform .25s cubic-bezier(.22,1,.36,1);
        }
        .ph-pill--primary  .ph-pill-icon { background: rgba(255,255,255,.22);  color: #fff;    }
        .ph-pill--secondary .ph-pill-icon { background: linear-gradient(135deg,#eef2ff,#e0e7ff); color: #2563eb; }
        .ph-pill--tertiary  .ph-pill-icon { background: linear-gradient(135deg,#fdf4ff,#f3e8ff); color: #a855f7; }
        .ph-pill:hover .ph-pill-icon { transform: scale(1.12) rotate(-6deg); }

        .ph-pill-txt {
          position: relative; z-index: 1;
          display: flex; flex-direction: column; line-height: 1.2;
          flex: 1; min-width: 0; overflow: hidden;
        }
        .ph-pill-txt strong {
          font-size: 12.5px; font-weight: 700;
          white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
        }
        .ph-pill-txt span {
          font-size: 10.5px;
          white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
        }
        .ph-pill--primary  .ph-pill-txt strong { color: #fff; }
        .ph-pill--primary  .ph-pill-txt span   { color: rgba(255,255,255,.78); }
        .ph-pill--secondary .ph-pill-txt strong,
        .ph-pill--tertiary  .ph-pill-txt strong { color: #0f172a; }
        .ph-pill--secondary .ph-pill-txt span,
        .ph-pill--tertiary  .ph-pill-txt span   { color: #64748b; }

        .ph-pill-arr {
          position: relative; z-index: 1;
          width: 22px; height: 22px; border-radius: 50%; flex-shrink: 0;
          display: flex; align-items: center; justify-content: center;
          transition: transform .2s, background .2s;
        }
        .ph-pill--primary  .ph-pill-arr { background: rgba(255,255,255,.2); color: #fff; }
        .ph-pill--secondary .ph-pill-arr { background: #eef2ff; color: #2563eb; }
        .ph-pill--tertiary  .ph-pill-arr { background: #f3e8ff; color: #a855f7; }
        .ph-pill-arr--open { transform: rotate(90deg) !important; }

        /* ─── STAGE WRAPPER ───────────────────────── */
        .ph-stage-wrap {
          position: relative;
          width: 100%;
          max-width: 700px;
          margin-top: 16px;
          margin-bottom: clamp(20px, 3vw, 30px);
        }

        /* ─── POPUP ────────────────────────────────── */
        .ph-popup {
          position: absolute;
          bottom: calc(100% + 8px);
          left: 50%;
          transform: translateX(-50%);
          width: 320px;
          max-width: 88vw;
          background: #fff;
          border-radius: 18px;
          padding: 14px 14px 11px;
          box-shadow:
            0 20px 44px rgba(15,23,42,.13),
            0 5px 14px rgba(37,99,235,.09),
            0 0 0 1px rgba(15,23,42,.04);
          z-index: 40;
          pointer-events: all;
        }
        .ph-popup-head {
          display: flex; align-items: center; justify-content: space-between;
          margin-bottom: 9px; padding-bottom: 8px; border-bottom: 1px solid #f1f5f9;
        }
        .ph-popup-ttl {
          font-size: 10px; font-weight: 700; color: #94a3b8;
          text-transform: uppercase; letter-spacing: .07em;
        }
        .ph-popup-x {
          width: 20px; height: 20px; border-radius: 50%; border: none; cursor: pointer;
          background: #f1f5f9; color: #64748b; font-size: 14px;
          display: flex; align-items: center; justify-content: center;
          transition: background .15s, color .15s; padding: 0; font-family: inherit;
        }
        .ph-popup-x:hover { background: #e2e8f0; color: #0f172a; }

        .ph-popup-rows { display: flex; flex-direction: column; gap: 5px; }
        .ph-popup-row {
          display: flex; align-items: center; gap: 9px;
          padding: 7px 9px; border-radius: 10px;
          background: #f8faff; border: 1px solid #eef2ff;
          text-decoration: none;
          transition: background .15s, border-color .15s, transform .15s;
        }
        .ph-popup-row:hover { background: #eef2ff; border-color: #c7d7fd; transform: translateX(3px); }
        .ph-popup-em {
          font-size: 17px; width: 32px; height: 32px; border-radius: 8px;
          background: #fff; border: 1px solid #e2e8f0; flex-shrink: 0;
          display: flex; align-items: center; justify-content: center;
          box-shadow: 0 1px 3px rgba(15,23,42,.06);
        }
        .ph-popup-rtxt {
          display: flex; flex-direction: column; line-height: 1.25; flex: 1; min-width: 0;
        }
        .ph-popup-rtxt strong { font-size: 12.5px; font-weight: 700; color: #0f172a; }
        .ph-popup-rtxt span   { font-size: 11px;   color: #64748b; }

        /* ═══════════════════════════════════════════
           STAGE — a compact rounded "video card".
           The bg (video+gradient) is scoped ONLY to this
           box, so the floating cards sit exactly on top
           of it — never above/below it.
           ═══════════════════════════════════════════ */
        .ph-stage {
          position: relative;
          width: 100%;
          height: clamp(228px, 27vw, 288px);
          border-radius: 24px;
          overflow: hidden;
          isolation: isolate;
          box-shadow: 0 18px 44px rgba(15,23,42,.14);
          background: linear-gradient(135deg, #eef2ff, #fdf2f8);
        }

        .ph-stage-bg {
          position: absolute;
          inset: 0;
          z-index: 0;
          pointer-events: none;
          overflow: hidden;
        }

        .ph-stage-content {
          position: relative;
          z-index: 1;
          width: 100%;
          height: 100%;
        }

        /* floating cards — compact, pinned to the box's own corners */
        .ph-card {
          position: absolute; width: clamp(172px,19vw,202px);
          background: #fff; border-radius: 14px; padding: 10px 12px;
          box-shadow: 0 10px 24px rgba(15,23,42,.14);
          border: 1px solid rgba(15,23,42,.04); z-index: 4;
          transition: box-shadow .26s;
        }
        .ph-card:hover { box-shadow: 0 16px 34px rgba(15,23,42,.2); }
        .ph-card--l { top: 10px;    left: 10px; }
        .ph-card--r { bottom: 10px; right: 10px; }
        .ph-card-row { display: flex; align-items: center; gap: 7px; margin-bottom: 5px; }
        .ph-av {
          width: 32px; height: 32px; border-radius: 50%; object-fit: cover;
          border: 2px solid #fff; box-shadow: 0 2px 6px rgba(0,0,0,.1); flex-shrink: 0;
        }
        .ph-nm { font-size: 12px; font-weight: 700; color: #0f172a; margin: 0; }
        .ph-rl { font-size: 10px; color: #64748b; margin: 0; }
        .ph-ln { font-size: 10.5px; color: #334155; margin: 0; line-height: 1.35; }
        .ph-ln strong {
          background-image: linear-gradient(90deg,#2563eb,#a855f7);
          -webkit-background-clip: text; background-clip: text;
          color: transparent; font-weight: 700;
        }

        /* ─── Center cluster — replaces the far-flung scatter,
               everything tightly grouped and properly aligned ─── */
        .ph-cluster {
          position: absolute;
          top: 50%; left: 50%;
          transform: translate(-50%, -50%);
          width: clamp(180px, 24vw, 216px);
          height: clamp(120px, 16vw, 146px);
          z-index: 2;
        }

        .ph-cl-av-wrap { position: absolute; border-radius: 50%; overflow: visible; }
        .ph-cl-av {
          width: 100%; height: 100%; object-fit: cover; border-radius: 50%;
          box-shadow: 0 6px 14px rgba(15,23,42,.16); border: 3px solid #fff; display: block;
        }
        .ph-cl-badge {
          position: absolute; bottom: -3px; right: -3px; width: 16px; height: 16px;
          border-radius: 50%; background: linear-gradient(135deg,#2563eb,#a855f7);
          color: #fff; display: flex; align-items: center; justify-content: center;
          border: 2px solid #fff; box-shadow: 0 2px 6px rgba(37,99,235,.36);
        }

        .ph-cl-gp {
          position: absolute; display: flex; align-items: center; gap: 6px;
          background: rgba(255,255,255,.92); backdrop-filter: blur(10px);
          -webkit-backdrop-filter: blur(10px);
          border: 1px solid rgba(255,255,255,.7); border-radius: 11px;
          padding: 6px 10px; box-shadow: 0 6px 16px rgba(37,99,235,.14); z-index: 3;
          white-space: nowrap;
        }
        .ph-cl-gp-ic {
          width: 20px; height: 20px; border-radius: 50%;
          background: linear-gradient(135deg,#2563eb,#a855f7);
          color: #fff; display: flex; align-items: center; justify-content: center; flex-shrink: 0;
        }
        .ph-cl-gp-tx { display: flex; flex-direction: column; line-height: 1.15; }
        .ph-cl-gp-tx strong {
          font-size: 10px; font-weight: 700;
          background-image: linear-gradient(90deg,#2563eb,#a855f7);
          -webkit-background-clip: text; background-clip: text; color: transparent;
        }
        .ph-cl-gp-tx span { font-size: 10px; color: #0f172a; font-weight: 600; }

        /* ─── STATS BAR ───────────────────────────── */
        .ph-stats {
          display: grid;
          grid-template-columns: repeat(4,1fr);
          gap: 8px;
          width: 100%;
          max-width: 860px;
          margin-bottom: clamp(16px, 2.4vw, 26px);
        }
        .ph-stat {
          position: relative; overflow: hidden; isolation: isolate;
          display: flex; align-items: center; gap: 10px;
          background: #fff; border: 1px solid #eef1f6; border-radius: 14px;
          padding: 11px 13px; cursor: default;
          box-shadow: 0 3px 12px rgba(15,23,42,.05);
          transition: box-shadow .22s, transform .22s;
        }
        .ph-stat:hover { transform: translateY(-3px); box-shadow: 0 10px 24px rgba(37,99,235,.12); }
        .ph-stat-shine {
          position: absolute; top: 0; left: -130%; width: 60%; height: 100%;
          background: linear-gradient(115deg,transparent,rgba(124,143,240,.14),transparent);
          transform: skewX(-20deg); transition: left .6s ease; z-index: 0; pointer-events: none;
        }
        .ph-stat:hover .ph-stat-shine { left: 140%; }
        .ph-stat-ic {
          position: relative; z-index: 1; flex-shrink: 0;
          width: 32px; height: 32px; border-radius: 50%;
          background: linear-gradient(135deg,#eef2ff,#fdf2f8);
          border: 1.5px solid #e5e7ff; color: #7c3aed;
          display: flex; align-items: center; justify-content: center;
          transition: transform .28s cubic-bezier(.22,1,.36,1);
        }
        .ph-stat:hover .ph-stat-ic { transform: scale(1.13) rotate(-7deg); }
        .ph-stat-body {
          position: relative; z-index: 1;
          display: flex; flex-direction: column; line-height: 1.2; min-width: 0;
        }
        .ph-stat-val {
          font-size: clamp(14px,1.5vw,17px); font-weight: 800; line-height: 1;
          background-image: linear-gradient(90deg,#2563eb,#a855f7);
          -webkit-background-clip: text; background-clip: text; color: transparent;
        }
        .ph-stat-lbl {
          font-size: 10px; color: #64748b; font-weight: 500; margin-top: 2px;
          white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
        }

        /* ─── MARQUEE HEADING ─────────────────────── */
        .ph-mhead { text-align: center; margin-bottom: clamp(12px,1.8vw,18px); }
        .ph-mhead .bar {
          width: 34px; height: 3px; border-radius: 999px;
          background-image: linear-gradient(90deg,#2563eb,#a855f7,#fb923c);
          margin: 0 auto 12px;
        }
        .ph-mhead h3 {
          font-size: clamp(17px,1.7vw,20px); font-weight: 800;
          color: #0f172a; line-height: 1.28; margin: 0;
        }

        /* ─── RESPONSIVE ──────────────────────────── */
        @media (max-width: 900px) { .ph-wrap { display: none; } }
        @media (max-width: 680px) {
          .ph-pills { flex-wrap: wrap; }
          .ph-pill-wrap  { flex: 1 1 calc(50% - 5px); }
          .ph-stats { grid-template-columns: repeat(2,1fr); }
        }
        @media (max-width: 400px) {
          .ph-pill-wrap  { flex: 1 1 100%; }
        }
      `}</style>

      <div className="ph-wrap">

        {/* ── Copy ── */}
        <div className="ph-copy">
          <motion.h1
            className="ph-title"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.52 }}
          >
            Grow your career,{' '}<br />
            <AnimatedGradientText>through people you trust.</AnimatedGradientText>
          </motion.h1>

          <motion.p
            className="ph-sub"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.48, delay: 0.1 }}
          >
            {cms['hp:heroSubline'] ?? 'Career Placement & Global Education Consultancy — Delhi NCR.'}
          </motion.p>
        </div>

        {/* ── Pills ── */}
        <motion.div
          className="ph-pills"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.18 }}
        >
          {NAV_PILLS.map((pill, i) => (
            <NavPillButton
              key={pill.id}
              pill={pill}
              active={activePopup === pill.id}
              onClick={() => setActivePopup(activePopup === pill.id ? null : pill.id)}
              delay={0.2 + i * 0.07}
            />
          ))}
        </motion.div>

        {/* ── Stage wrapper — popup anchors here, above the video box ── */}
        <motion.div
          className="ph-stage-wrap"
          initial={{ opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.26 }}
        >
          {activePill && (
            <PopupCard pill={activePill} onClose={() => setActivePopup(null)} />
          )}

          {/* ── The compact video card — bg is scoped exactly here ── */}
          <div
            ref={stageRef}
            className="ph-stage"
            onMouseMove={onMouseMove}
            onMouseLeave={onMouseLeave}
          >
            <div className="ph-stage-bg" aria-hidden>
              <HeroGradientBg />
              <HeroBgVideo />
            </div>

            <div className="ph-stage-content">
              {/* left card */}
              <motion.div
                className="ph-card ph-card--l"
                animate={{ y: [0, -6, 0] }}
                transition={{ duration: 5.5, repeat: Infinity, ease: 'easeInOut' }}
                style={{ x: useTransform(smx,[0,1],[-6,6]), y: useTransform(smy,[0,1],[-4,4]) }}
                whileHover={{ scale: 1.04 }}
              >
                <div className="ph-card-row">
                  <img src={HERO_CARD_AVATARS.left} alt="" className="ph-av" width={32} height={32} loading="lazy" decoding="async" />
                  <div>
                    <p className="ph-nm">{cms['hp:heroOfferName'] ?? 'Priya'}</p>
                    <p className="ph-rl">CAP · India careers</p>
                  </div>
                </div>
                <p className="ph-ln">Targeting <strong>{offerRole}</strong></p>
              </motion.div>

              {/* center cluster: avatars + connector badges + glass pills, tightly grouped */}
              <div className="ph-cluster" aria-hidden>
                {CLUSTER_AVATARS.map((p, i) => (
                  <motion.div
                    key={p.src}
                    className="ph-cl-av-wrap"
                    style={{
                      top: p.top, left: p.left, width: p.size, height: p.size, zIndex: i + 1,
                      x: useTransform(smx,[0,1],[-p.depth,p.depth]),
                      y: useTransform(smy,[0,1],[-p.depth,p.depth]),
                    }}
                    animate={{ y: [0, i % 2 === 0 ? -5 : 5, 0] }}
                    transition={{ duration: 4.2 + i, repeat: Infinity, ease: 'easeInOut', delay: i * 0.25 }}
                    whileHover={{ scale: 1.15 }}
                  >
                    <img src={p.src} alt="" className="ph-cl-av" width={p.size} height={p.size} loading="lazy" decoding="async" />
                    {p.badge && <span className="ph-cl-badge"><Share2 size={8} strokeWidth={2.5} /></span>}
                  </motion.div>
                ))}

                <motion.div
                  className="ph-cl-gp"
                  style={{ top: '32%', left: '0%' }}
                  animate={{ y: [0, -4, 0] }}
                  transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                  whileHover={{ scale: 1.06 }}
                >
                  <span className="ph-cl-gp-ic"><Share2 size={10} strokeWidth={2.25} /></span>
                  <span className="ph-cl-gp-tx"><strong>Shared</strong><span>CAP roadmap</span></span>
                </motion.div>

                <motion.div
                  className="ph-cl-gp"
                  style={{ top: '58%', left: '32%' }}
                  animate={{ y: [0, 4, 0] }}
                  transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut', delay: 0.3 }}
                  whileHover={{ scale: 1.06 }}
                >
                  <span className="ph-cl-gp-ic"><Sparkles size={10} strokeWidth={2.25} /></span>
                  <span className="ph-cl-gp-tx"><strong>Recommended</strong><span>Admit path</span></span>
                </motion.div>
              </div>

              {/* right card */}
              <motion.div
                className="ph-card ph-card--r"
                animate={{ y: [0, 6, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut', delay: 0.4 }}
                style={{ x: useTransform(smx,[0,1],[6,-6]), y: useTransform(smy,[0,1],[4,-4]) }}
                whileHover={{ scale: 1.04 }}
              >
                <div className="ph-card-row">
                  <img src={HERO_CARD_AVATARS.right} alt="" className="ph-av" width={32} height={32} loading="lazy" decoding="async" />
                  <div>
                    <p className="ph-nm">{cms['hp:heroAdmitName'] ?? 'Arjun'}</p>
                    <p className="ph-rl">Study abroad track</p>
                  </div>
                </div>
                <p className="ph-ln">Interested in <strong>{admitProgramme.split('·')[0]?.trim() ?? 'UK Masters'}</strong></p>
              </motion.div>
            </div>
          </div>
        </motion.div>

        {/* ── Stats ── */}
        <motion.div
          className="ph-stats"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-50px' }}
          variants={{ hidden:{}, show:{ transition:{ staggerChildren:0.08 } } }}
        >
          {STATS.map((s) => (
            <motion.div
              key={s.label}
              className="ph-stat"
              variants={{ hidden:{ opacity:0, y:14, scale:0.96 }, show:{ opacity:1, y:0, scale:1 } }}
              transition={{ duration:0.4, ease:'easeOut' }}
            >
              <span className="ph-stat-shine" aria-hidden />
              <span className="ph-stat-ic"><s.icon size={14} strokeWidth={2} /></span>
              <span className="ph-stat-body">
                <span className="ph-stat-val"><CountUpNumber value={s.value} suffix={s.suffix} /></span>
                <span className="ph-stat-lbl">{s.label}</span>
              </span>
            </motion.div>
          ))}
        </motion.div>

      </div>

      <HeroMobileBrief cms={cms} />

      <div className="ph-mhead">
        <div className="bar" />
        <h3>
          Our CAP Candidates<br />
          <AnimatedGradientText>Have Landed Roles At</AnimatedGradientText>
        </h3>
      </div>

      <HiringPartnersMarquee cms={cms} />
    </section>
  );
}