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

const SCATTER_AVATARS = [
  { src: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=128&h=128&fit=crop&crop=face', top: '0%',  left: '40%', size: 46, badge: false, depth: 16 },
  { src: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=128&h=128&fit=crop&crop=face', top: '4%',  left: '80%', size: 44, badge: true,  depth: 26 },
  { src: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=128&h=128&fit=crop&crop=face', top: '42%', left: '6%',  size: 50, badge: true,  depth: 12 },
  { src: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=128&h=128&fit=crop&crop=face', top: '38%', left: '90%', size: 46, badge: true,  depth: 22 },
  { src: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=128&h=128&fit=crop&crop=face', top: '76%', left: '36%', size: 44, badge: false, depth: 18 },
] as const;

const HERO_CARD_AVATARS = {
  left:  'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=96&h=96&fit=crop&crop=face',
  right: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=96&h=96&fit=crop&crop=face',
} as const;

const STATS = [
  { icon: ShieldCheck, value: 500,   suffix: '+', label: 'Companies Trusted Us'  },
  { icon: Users,       value: 50000, suffix: '+', label: 'Careers Transformed'   },
  { icon: Globe,       value: 20,    suffix: '+', label: 'Countries'              },
  { icon: Award,       value: 10,    suffix: '+', label: 'Years Excellence'       },
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
        { icon: '🔍', heading: 'Source Top Talent',   sub: 'Pre-vetted candidate pool'    },
        { icon: '⚡', heading: 'Hire in Days',        sub: 'Streamlined shortlisting'     },
        { icon: '📊', heading: 'Analytics Dashboard', sub: 'Track pipeline in real-time'  },
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

/* ── Animated gradient text ── */
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
      <style>{`@keyframes ph-grad{0%{background-position:0% 50%}50%{background-position:100% 50%}100%{background-position:0% 50%}}`}</style>
    </>
  );
}

/* ── Count-up ── */
function CountUpNumber({ value, suffix = '' }: { value: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: '-40px' });
  const mv = useMotionValue(0);
  const sp = useSpring(mv, { damping: 22, stiffness: 90 });
  const display = useTransform(sp, (v) => `${Math.floor(v).toLocaleString()}${suffix}`);
  useEffect(() => { if (inView) mv.set(value); }, [inView, value, mv]);
  return <motion.span ref={ref}>{display}</motion.span>;
}

/* ── Nav pill ── */
function NavPillButton({ pill, active, onClick, delay }: {
  pill: typeof NAV_PILLS[number];
  active: boolean;
  onClick: () => void;
  delay: number;
}) {
  const Icon = pill.icon;
  return (
    <motion.button
      className={`ph-pill ph-pill--${pill.variant}${active ? ' ph-pill--on' : ''}`}
      onClick={onClick}
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.42, delay }}
      whileHover={{ y: -2, scale: 1.02 }}
      whileTap={{ scale: 0.97 }}
      aria-expanded={active}
    >
      <span className="ph-pill-icon"><Icon size={16} strokeWidth={2.1} /></span>
      <span className="ph-pill-txt">
        <strong>{pill.label}</strong>
        <span>{pill.sub}</span>
      </span>
      <span className={`ph-pill-arr${active ? ' ph-pill-arr--open' : ''}`}>
        <ArrowRight size={12} strokeWidth={2.5} />
      </span>
    </motion.button>
  );
}

/* ── Popup card — rendered INSIDE the stage as absolute overlay ── */
function PopupCard({ pill, onClose }: { pill: typeof NAV_PILLS[number]; onClose: () => void }) {
  return (
    <motion.div
      className="ph-popup"
      key={pill.id}
      initial={{ opacity: 0, y: 8, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 6, scale: 0.96 }}
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
  const admitProgramme = cms['hp:heroAdmitProgramme'] ?? "MSc International Business · Fall '25";

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

  /* close on outside click */
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
        /* ─────────────────────────────────────────
           ROOT LAYOUT
        ───────────────────────────────────────── */
        .ph-hero {
          position: relative;
          overflow: hidden;
          isolation: isolate;
          padding: clamp(32px,5vw,56px) 20px clamp(20px,3vw,32px);
        }
        .ph-bg {
          position: absolute; inset: 0; z-index: 0;
          pointer-events: none; overflow: hidden;
        }
        .ph-wrap {
          position: relative; z-index: 1;
          max-width: 900px; margin: 0 auto;
          display: flex; flex-direction: column;
          align-items: center;
        }

        /* ─────────────────────────────────────────
           COPY — perfectly centred
        ───────────────────────────────────────── */
        .ph-copy {
          width: 100%;
          text-align: center;
          display: flex;
          flex-direction: column;
          align-items: center;
          margin-bottom: 20px;
        }
        .ph-title {
          font-size: clamp(2rem,3.8vw,3.2rem);
          font-weight: 800;
          line-height: 1.12;
          letter-spacing: -0.023em;
          color: #0f172a;
          -webkit-text-fill-color: #0f172a;
          margin: 0 0 12px;
          text-align: center;
          width: 100%;
        }
        .ph-sub {
          font-size: clamp(13.5px,1.1vw,15px);
          line-height: 1.6;
          color: #55607a;
          max-width: 480px;
          margin: 0 0 20px;
          text-align: center;
        }

        /* ─────────────────────────────────────────
           3-PILL ROW  — centred, equal width
        ───────────────────────────────────────── */
        .ph-pills {
          display: flex;
          align-items: stretch;
          justify-content: center;
          gap: 8px;
          width: 100%;
          max-width: 720px;
          /* NO margin-bottom — popup lives inside stage */
        }

        .ph-pill {
          flex: 1;
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
          transition: box-shadow .2s, border-color .2s, background .2s, transform .2s;
        }

        .ph-pill--primary {
          background: linear-gradient(135deg,#1d4ed8,#2563eb);
          border-color: #2563eb; color: #fff;
          box-shadow: 0 4px 16px rgba(37,99,235,.30);
        }
        .ph-pill--primary:hover,.ph-pill--primary.ph-pill--on {
          box-shadow: 0 8px 24px rgba(37,99,235,.42);
        }
        .ph-pill--secondary {
          background: #fff; border-color: #e2e8f0; color: #0f172a;
          box-shadow: 0 3px 10px rgba(15,23,42,.06);
        }
        .ph-pill--secondary:hover,.ph-pill--secondary.ph-pill--on {
          border-color: #2563eb; background: #f4f8ff;
          box-shadow: 0 6px 18px rgba(37,99,235,.12);
        }
        .ph-pill--tertiary {
          background: rgba(248,250,255,.95); border-color: #e2e8f0; color: #0f172a;
          box-shadow: 0 3px 10px rgba(15,23,42,.05);
        }
        .ph-pill--tertiary:hover,.ph-pill--tertiary.ph-pill--on {
          border-color: #a855f7; background: #fdf8ff;
          box-shadow: 0 6px 18px rgba(168,85,247,.12);
        }

        .ph-pill-icon {
          width: 32px; height: 32px; border-radius: 9px; flex-shrink: 0;
          display: flex; align-items: center; justify-content: center;
          transition: transform .2s;
        }
        .ph-pill--primary  .ph-pill-icon { background: rgba(255,255,255,.2);  color: #fff; }
        .ph-pill--secondary .ph-pill-icon { background: linear-gradient(135deg,#eef2ff,#e0e7ff); color: #2563eb; }
        .ph-pill--tertiary  .ph-pill-icon { background: linear-gradient(135deg,#fdf4ff,#f3e8ff); color: #a855f7; }
        .ph-pill:hover .ph-pill-icon { transform: scale(1.1) rotate(-5deg); }

        .ph-pill-txt {
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
        .ph-pill--primary  .ph-pill-txt span   { color: rgba(255,255,255,.75); }
        .ph-pill--secondary .ph-pill-txt strong,
        .ph-pill--tertiary  .ph-pill-txt strong { color: #0f172a; }
        .ph-pill--secondary .ph-pill-txt span,
        .ph-pill--tertiary  .ph-pill-txt span   { color: #64748b; }

        .ph-pill-arr {
          width: 22px; height: 22px; border-radius: 50%; flex-shrink: 0;
          display: flex; align-items: center; justify-content: center;
          transition: transform .2s;
        }
        .ph-pill--primary  .ph-pill-arr { background: rgba(255,255,255,.18); color: #fff; }
        .ph-pill--secondary .ph-pill-arr { background: #eef2ff; color: #2563eb; }
        .ph-pill--tertiary  .ph-pill-arr { background: #f3e8ff; color: #a855f7; }
        .ph-pill-arr--open { transform: rotate(90deg) !important; }
        .ph-pill:hover .ph-pill-arr:not(.ph-pill-arr--open) { transform: translateX(2px); }

        /* ─────────────────────────────────────────
           STAGE WRAPPER — position:relative so
           popup can be absolute INSIDE it, at top
        ───────────────────────────────────────── */
        .ph-stage-wrap {
          position: relative;
          width: 100%;
          max-width: 860px;
          /* top padding = popup height so stage content is not covered */
        }

        /* ─────────────────────────────────────────
           POPUP — absolute, top of stage-wrap,
           centred horizontally
        ───────────────────────────────────────── */
        .ph-popup {
          position: absolute;
          top: 8px;
          left: 50%;
          transform: translateX(-50%);
          width: 340px;
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
        .ph-popup-rtxt span   { font-size: 11px; color: #64748b; }

        /* ─────────────────────────────────────────
           STAGE — video / avatar scene
           top offset = popup card height (≈148px)
           when popup is open; use padding-top
        ───────────────────────────────────────── */
        .ph-stage {
          position: relative;
          width: 100%;
          height: clamp(300px,35vw,420px);
          margin-bottom: clamp(18px,2.8vw,28px);
          /* shift down when popup is showing handled via CSS var */
        }
        .ph-stage-wrap.ph-has-popup .ph-stage {
          margin-top: 158px; /* popup ~148px + 10px gap */
        }

        /* floating cards */
        .ph-card {
          position: absolute; width: clamp(190px,20vw,224px);
          background: #fff; border-radius: 15px; padding: 12px 14px;
          box-shadow: 0 12px 30px rgba(15,23,42,.11);
          border: 1px solid rgba(15,23,42,.04); z-index: 4;
          transition: box-shadow .26s;
        }
        .ph-card:hover { box-shadow: 0 18px 40px rgba(15,23,42,.17); }
        .ph-card--l { top: 0;    left: 0; }
        .ph-card--r { bottom: 0; right: 0; }
        .ph-card-row { display: flex; align-items: center; gap: 8px; margin-bottom: 6px; }
        .ph-av {
          width: 36px; height: 36px; border-radius: 50%; object-fit: cover;
          border: 2px solid #fff; box-shadow: 0 2px 6px rgba(0,0,0,.10); flex-shrink: 0;
        }
        .ph-nm { font-size: 13px; font-weight: 700; color: #0f172a; margin: 0; }
        .ph-rl { font-size: 11px; color: #64748b; margin: 0; }
        .ph-ln { font-size: 11.5px; color: #334155; margin: 0; line-height: 1.4; }
        .ph-ln strong {
          background-image: linear-gradient(90deg,#2563eb,#a855f7);
          -webkit-background-clip: text; background-clip: text;
          color: transparent; font-weight: 700;
        }

        /* scatter */
        .ph-sc { position: absolute; inset: 0; z-index: 1; }
        .ph-sc-w { position: absolute; border-radius: 50%; overflow: visible; }
        .ph-sc-i {
          width: 100%; height: 100%; object-fit: cover; border-radius: 50%;
          box-shadow: 0 6px 14px rgba(15,23,42,.14); border: 3px solid #fff; display: block;
        }
        .ph-sc-b {
          position: absolute; bottom: -3px; right: -3px; width: 18px; height: 18px;
          border-radius: 50%; background: linear-gradient(135deg,#2563eb,#a855f7);
          color: #fff; display: flex; align-items: center; justify-content: center;
          border: 2px solid #fff; box-shadow: 0 2px 6px rgba(37,99,235,.36);
        }

        /* glass pills */
        .ph-gp {
          position: absolute; display: flex; align-items: center; gap: 7px;
          background: rgba(255,255,255,.88); backdrop-filter: blur(10px);
          -webkit-backdrop-filter: blur(10px);
          border: 1px solid rgba(255,255,255,.6); border-radius: 12px;
          padding: 7px 12px; box-shadow: 0 8px 20px rgba(37,99,235,.12); z-index: 3;
        }
        .ph-gp--sh { top: 26%; left: 40%; }
        .ph-gp--re { top: 46%; left: 46%; }
        .ph-gp-ic {
          width: 23px; height: 23px; border-radius: 50%;
          background: linear-gradient(135deg,#2563eb,#a855f7);
          color: #fff; display: flex; align-items: center; justify-content: center; flex-shrink: 0;
        }
        .ph-gp-tx { display: flex; flex-direction: column; line-height: 1.2; white-space: nowrap; }
        .ph-gp-tx strong {
          font-size: 11.5px; font-weight: 700;
          background-image: linear-gradient(90deg,#2563eb,#a855f7);
          -webkit-background-clip: text; background-clip: text; color: transparent;
        }
        .ph-gp-tx span { font-size: 11.5px; color: #0f172a; font-weight: 600; }

        /* ─────────────────────────────────────────
           STATS BAR
        ───────────────────────────────────────── */
        .ph-stats {
          display: grid;
          grid-template-columns: repeat(4,1fr);
          gap: 8px;
          width: 100%;
          max-width: 860px;
          margin-bottom: clamp(22px,3.5vw,36px);
        }
        .ph-stat {
          position: relative; overflow: hidden; isolation: isolate;
          display: flex; align-items: center; gap: 10px;
          background: #fff; border: 1px solid #eef1f6; border-radius: 14px;
          padding: 12px 14px; cursor: default;
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
          width: 34px; height: 34px; border-radius: 50%;
          background: linear-gradient(135deg,#eef2ff,#fdf2f8);
          border: 1.5px solid #e5e7ff; color: #7c3aed;
          display: flex; align-items: center; justify-content: center;
          transition: transform .28s cubic-bezier(.22,1,.36,1);
        }
        .ph-stat:hover .ph-stat-ic { transform: scale(1.13) rotate(-7deg); }
        .ph-stat-body { position: relative; z-index: 1; display: flex; flex-direction: column; line-height: 1.22; min-width: 0; }
        .ph-stat-val {
          font-size: clamp(15px,1.6vw,18px); font-weight: 800; line-height: 1;
          background-image: linear-gradient(90deg,#2563eb,#a855f7);
          -webkit-background-clip: text; background-clip: text; color: transparent;
        }
        .ph-stat-lbl { font-size: 10.5px; color: #64748b; font-weight: 500; margin-top: 2px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }

        /* ─────────────────────────────────────────
           MARQUEE HEADING
        ───────────────────────────────────────── */
        .ph-mhead { text-align: center; margin-bottom: clamp(14px,2vw,20px); }
        .ph-mhead .bar {
          width: 34px; height: 3px; border-radius: 999px;
          background-image: linear-gradient(90deg,#2563eb,#a855f7,#fb923c);
          margin: 0 auto 12px;
        }
        .ph-mhead h3 { font-size: clamp(17px,1.7vw,20px); font-weight: 800; color: #0f172a; line-height: 1.28; margin: 0; }

        /* ─────────────────────────────────────────
           RESPONSIVE
        ───────────────────────────────────────── */
        @media (max-width: 900px) { .ph-wrap { display: none; } }
        @media (max-width: 680px) {
          .ph-pills { flex-wrap: wrap; }
          .ph-pill  { flex: 1 1 calc(50% - 4px); max-width: none; }
          .ph-stats { grid-template-columns: repeat(2,1fr); }
        }
        @media (max-width: 400px) {
          .ph-pill  { flex: 1 1 100%; }
        }
      `}</style>

      {/* bg */}
      <div className="ph-bg" aria-hidden>
        <HeroGradientBg />
        <HeroBgVideo />
      </div>

      <div className="ph-wrap">

        {/* ── Copy block ── */}
        <div className="ph-copy">
          <motion.h1
            className="ph-title"
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.52 }}
          >
            Grow your career,{' '}
            <AnimatedGradientText>through people you trust.</AnimatedGradientText>
          </motion.h1>

          <motion.p
            className="ph-sub"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.48, delay: 0.08 }}
          >
            {cms['hp:heroSubline'] ?? 'Career Placement & Global Education Consultancy — Delhi NCR.'}
          </motion.p>

          {/* 3 pills */}
          <motion.div
            className="ph-pills"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.16 }}
          >
            {NAV_PILLS.map((pill, i) => (
              <NavPillButton
                key={pill.id}
                pill={pill}
                active={activePopup === pill.id}
                onClick={() => setActivePopup(activePopup === pill.id ? null : pill.id)}
                delay={0.18 + i * 0.07}
              />
            ))}
          </motion.div>
        </div>

        {/* ── Stage wrapper — popup lives here, above the scene ── */}
        <motion.div
          className={`ph-stage-wrap${activePill ? ' ph-has-popup' : ''}`}
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.58, delay: 0.26 }}
        >
          {/* POPUP rendered at top of stage-wrap */}
          {activePill && (
            <PopupCard pill={activePill} onClose={() => setActivePopup(null)} />
          )}

          {/* scene */}
          <div
            ref={stageRef}
            className="ph-stage"
            onMouseMove={onMouseMove}
            onMouseLeave={onMouseLeave}
          >
            {/* left card */}
            <motion.div
              className="ph-card ph-card--l"
              animate={{ y: [0,-8,0] }}
              transition={{ duration: 5.5, repeat: Infinity, ease: 'easeInOut' }}
              style={{ x: useTransform(smx,[0,1],[-8,8]), y: useTransform(smy,[0,1],[-5,5]) }}
              whileHover={{ scale: 1.03 }}
            >
              <div className="ph-card-row">
                <img src={HERO_CARD_AVATARS.left} alt="" className="ph-av" width={36} height={36} loading="lazy" decoding="async" />
                <div>
                  <p className="ph-nm">{cms['hp:heroOfferName'] ?? 'Priya'}</p>
                  <p className="ph-rl">CAP · India careers</p>
                </div>
              </div>
              <p className="ph-ln">Targeting <strong>{offerRole}</strong></p>
            </motion.div>

            {/* scatter avatars */}
            <div className="ph-sc" aria-hidden>
              {SCATTER_AVATARS.map((p, i) => (
                <motion.div
                  key={p.src}
                  className="ph-sc-w"
                  style={{
                    top: p.top, left: p.left, width: p.size, height: p.size, zIndex: i + 1,
                    x: useTransform(smx,[0,1],[-p.depth,p.depth]),
                    y: useTransform(smy,[0,1],[-p.depth,p.depth]),
                  }}
                  animate={{ y: [0, i%2===0 ? -6 : 6, 0] }}
                  transition={{ duration: 4.5+i, repeat: Infinity, ease: 'easeInOut', delay: i*0.25 }}
                  whileHover={{ scale: 1.14 }}
                >
                  <img src={p.src} alt="" className="ph-sc-i" width={p.size} height={p.size} loading="lazy" decoding="async" />
                  {p.badge && <span className="ph-sc-b"><Share2 size={9} strokeWidth={2.5} /></span>}
                </motion.div>
              ))}
            </div>

            {/* glass pills */}
            <motion.div className="ph-gp ph-gp--sh"
              animate={{ y:[0,-5,0] }} transition={{ duration:4, repeat:Infinity, ease:'easeInOut' }}
              style={{ x:useTransform(smx,[0,1],[-10,10]), y:useTransform(smy,[0,1],[-8,8]) }}
              whileHover={{ scale:1.05 }}
            >
              <span className="ph-gp-ic"><Share2 size={11} strokeWidth={2.25}/></span>
              <span className="ph-gp-tx"><strong>Shared</strong><span>CAP roadmap</span></span>
            </motion.div>

            <motion.div className="ph-gp ph-gp--re"
              animate={{ y:[0,5,0] }} transition={{ duration:4.5, repeat:Infinity, ease:'easeInOut', delay:0.3 }}
              style={{ x:useTransform(smx,[0,1],[10,-10]), y:useTransform(smy,[0,1],[8,-8]) }}
              whileHover={{ scale:1.05 }}
            >
              <span className="ph-gp-ic"><Sparkles size={11} strokeWidth={2.25}/></span>
              <span className="ph-gp-tx"><strong>Recommended</strong><span>Admit path</span></span>
            </motion.div>

            {/* right card */}
            <motion.div
              className="ph-card ph-card--r"
              animate={{ y:[0,8,0] }}
              transition={{ duration:6, repeat:Infinity, ease:'easeInOut', delay:0.4 }}
              style={{ x:useTransform(smx,[0,1],[8,-8]), y:useTransform(smy,[0,1],[5,-5]) }}
              whileHover={{ scale:1.03 }}
            >
              <div className="ph-card-row">
                <img src={HERO_CARD_AVATARS.right} alt="" className="ph-av" width={36} height={36} loading="lazy" decoding="async" />
                <div>
                  <p className="ph-nm">{cms['hp:heroAdmitName'] ?? 'Arjun'}</p>
                  <p className="ph-rl">Study abroad track</p>
                </div>
              </div>
              <p className="ph-ln">Interested in <strong>{admitProgramme.split('·')[0]?.trim() ?? 'UK Masters'}</strong></p>
            </motion.div>
          </div>{/* /ph-stage */}
        </motion.div>{/* /ph-stage-wrap */}

        {/* ── Stats bar ── */}
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

      </div>{/* /ph-wrap */}

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