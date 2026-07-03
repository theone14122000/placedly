'use client';

import { motion, useMotionValue, useSpring, useTransform, useInView } from 'framer-motion';
import {
  Share2,
  Sparkles,
  Globe,
  Users,
  ShieldCheck,
  Award,
  ArrowRight,
  UserCheck,
  Building2,
  type LucideIcon,
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
  left: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=96&h=96&fit=crop&crop=face',
  right: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=96&h=96&fit=crop&crop=face',
} as const;

const STATS = [
  { icon: ShieldCheck, value: 500, suffix: '+', label: 'Companies Trusted Us' },
  { icon: Users,       value: 50000, suffix: '+', label: 'Careers Transformed' },
  { icon: Globe,       value: 20,  suffix: '+', label: 'Countries' },
  { icon: Award,       value: 10,  suffix: '+', label: 'Years Excellence' },
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
        { icon: '🎯', heading: 'Get Placed Fast',  sub: 'Match with top employers in 48h' },
        { icon: '📋', heading: 'Resume Review',    sub: 'AI-powered feedback & scoring'   },
        { icon: '🚀', heading: 'Career Roadmap',   sub: 'Personalised growth path'        },
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
        { icon: '🔍', heading: 'Source Top Talent',      sub: 'Pre-vetted candidate pool'       },
        { icon: '⚡', heading: 'Hire in Days',           sub: 'Streamlined shortlisting'        },
        { icon: '📊', heading: 'Analytics Dashboard',    sub: 'Track pipeline in real-time'     },
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
        { icon: '🌍', heading: '20+ Countries',       sub: 'UK, US, Canada, Europe & more'   },
        { icon: '🎓', heading: 'University Admits',   sub: 'Expert application guidance'      },
        { icon: '✈️', heading: 'Visa Support',        sub: 'End-to-end visa assistance'       },
      ],
    },
  },
] as const;

type PopupKey = 'candidates' | 'recruiters' | 'study' | null;

/* ── Animated gradient heading ── */
function AnimatedGradientText({
  children,
  as: Tag = 'span',
}: {
  children: React.ReactNode;
  as?: 'span' | 'h1' | 'h2' | 'h3';
}) {
  return (
    <>
      <Tag
        style={{
          backgroundImage: 'linear-gradient(270deg,#2563eb,#7c8ff0,#fb923c,#f43f5e,#a855f7,#2563eb)',
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

/* ── Count-up ── */
function CountUpNumber({ value, suffix = '' }: { value: number; suffix?: string }) {
  const ref      = useRef<HTMLSpanElement>(null);
  const inView   = useInView(ref, { once: true, margin: '-40px' });
  const motionVal = useMotionValue(0);
  const spring   = useSpring(motionVal, { damping: 22, stiffness: 90 });
  const display  = useTransform(spring, (v) => `${Math.floor(v).toLocaleString()}${suffix}`);
  useEffect(() => { if (inView) motionVal.set(value); }, [inView, value, motionVal]);
  return <motion.span ref={ref}>{display}</motion.span>;
}

/* ── Nav pill button ── */
function NavPillButton({
  pill,
  active,
  onClick,
  delay,
}: {
  pill: typeof NAV_PILLS[number];
  active: boolean;
  onClick: () => void;
  delay: number;
}) {
  const Icon = pill.icon;
  return (
    <motion.button
      className={`ph-nav-pill ph-nav-pill--${pill.variant}${active ? ' ph-nav-pill--active' : ''}`}
      onClick={onClick}
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, delay }}
      whileHover={{ y: -3, scale: 1.025 }}
      whileTap={{ scale: 0.97 }}
      aria-expanded={active}
    >
      <span className="ph-nav-pill-icon">
        <Icon size={17} strokeWidth={2.1} />
      </span>
      <span className="ph-nav-pill-text">
        <strong>{pill.label}</strong>
        <span>{pill.sub}</span>
      </span>
      <span className={`ph-nav-pill-arrow${active ? ' ph-nav-pill-arrow--open' : ''}`}>
        <ArrowRight size={13} strokeWidth={2.5} />
      </span>
    </motion.button>
  );
}

/* ── Popup card ── */
function PopupCard({ pill, onClose }: { pill: typeof NAV_PILLS[number]; onClose: () => void }) {
  return (
    <motion.div
      className="ph-popup"
      key={pill.id}
      initial={{ opacity: 0, y: 10, scale: 0.97 }}
      animate={{ opacity: 1, y: 0,  scale: 1    }}
      exit={{    opacity: 0, y: 8,  scale: 0.97 }}
      transition={{ duration: 0.2, ease: 'easeOut' }}
    >
      <div className="ph-popup-head">
        <span className="ph-popup-title">{pill.popup.title}</span>
        <button className="ph-popup-close" onClick={onClose} aria-label="Close">×</button>
      </div>
      <div className="ph-popup-items">
        {pill.popup.items.map((item) => (
          <Link key={item.heading} href={pill.href} className="ph-popup-item">
            <span className="ph-popup-emoji">{item.icon}</span>
            <span className="ph-popup-item-text">
              <strong>{item.heading}</strong>
              <span>{item.sub}</span>
            </span>
            <ArrowRight size={13} strokeWidth={2} className="ph-popup-item-arrow" />
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

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    const r = stageRef.current?.getBoundingClientRect();
    if (!r) return;
    mx.set((e.clientX - r.left) / r.width);
    my.set((e.clientY - r.top)  / r.height);
  }
  function handleMouseLeave() { mx.set(0.5); my.set(0.5); }

  useEffect(() => {
    if (!activePopup) return;
    const h = (e: MouseEvent) => {
      const t = e.target as HTMLElement;
      if (!t.closest('.ph-nav-pill') && !t.closest('.ph-popup')) setActivePopup(null);
    };
    document.addEventListener('mousedown', h);
    return () => document.removeEventListener('mousedown', h);
  }, [activePopup]);

  const activePill = NAV_PILLS.find((p) => p.id === activePopup) ?? null;

  return (
    <section id="Top" className="ph-hero">
      <style>{`
        /* ── layout ── */
        .ph-hero {
          position: relative; overflow: hidden; isolation: isolate;
          padding: clamp(36px,5.5vw,60px) 20px clamp(24px,3.5vw,36px);
        }
        .ph-hero-bg { position: absolute; inset: 0; z-index: 0; pointer-events: none; overflow: hidden; }
        .ph-wrap    { position: relative; z-index: 1; max-width: 980px; margin: 0 auto; }
        .ph-copy    { text-align: center; max-width: 700px; margin: 0 auto; }

        /* ── heading ── */
        .ph-title {
          font-size: clamp(1.95rem,3.7vw,3.15rem); font-weight: 800; line-height: 1.13;
          letter-spacing: -0.022em; margin: 0 0 clamp(10px,1.4vw,16px);
          color: inherit; -webkit-text-fill-color: initial;
        }
        .ph-sub {
          font-size: clamp(14px,1.15vw,15.5px); line-height: 1.58; color: #55607a;
          max-width: 520px; margin: 0 auto clamp(18px,2.2vw,26px);
        }

        /* ── 3-pill row ── */
        .ph-pills {
          display: flex; align-items: stretch; justify-content: center;
          gap: 10px; flex-wrap: nowrap;
          margin-bottom: clamp(18px,2.5vw,28px);
        }

        .ph-nav-pill {
          position: relative; display: inline-flex; align-items: center;
          gap: 10px; padding: 11px 14px 11px 12px;
          border-radius: 15px; font-family: inherit; cursor: pointer;
          border: 1.5px solid transparent; text-align: left;
          transition: box-shadow .22s ease, border-color .22s ease, background .22s ease, transform .22s ease;
          flex: 1; min-width: 0; max-width: 220px;
          white-space: nowrap;
        }

        /* primary — filled blue */
        .ph-nav-pill--primary {
          background: linear-gradient(135deg,#1d4ed8,#2563eb);
          border-color: #2563eb; color: #fff;
          box-shadow: 0 5px 18px rgba(37,99,235,.30), inset 0 1px 0 rgba(255,255,255,.18);
        }
        .ph-nav-pill--primary:hover,
        .ph-nav-pill--primary.ph-nav-pill--active {
          box-shadow: 0 10px 28px rgba(37,99,235,.42), inset 0 1px 0 rgba(255,255,255,.22);
        }

        /* secondary — white */
        .ph-nav-pill--secondary {
          background: #fff; border-color: #e2e8f0; color: #0f172a;
          box-shadow: 0 3px 12px rgba(15,23,42,.06);
        }
        .ph-nav-pill--secondary:hover,
        .ph-nav-pill--secondary.ph-nav-pill--active {
          border-color: #2563eb; background: #f4f8ff;
          box-shadow: 0 7px 20px rgba(37,99,235,.13);
        }

        /* tertiary — soft */
        .ph-nav-pill--tertiary {
          background: rgba(248,250,255,.92); border-color: #e2e8f0; color: #0f172a;
          box-shadow: 0 3px 12px rgba(15,23,42,.05);
        }
        .ph-nav-pill--tertiary:hover,
        .ph-nav-pill--tertiary.ph-nav-pill--active {
          border-color: #a855f7; background: #fdf8ff;
          box-shadow: 0 7px 20px rgba(168,85,247,.13);
        }

        /* icon bubble */
        .ph-nav-pill-icon {
          width: 34px; height: 34px; border-radius: 10px; flex-shrink: 0;
          display: flex; align-items: center; justify-content: center;
          transition: transform .22s ease;
        }
        .ph-nav-pill--primary  .ph-nav-pill-icon { background: rgba(255,255,255,.2);  color: #fff;    }
        .ph-nav-pill--secondary .ph-nav-pill-icon { background: linear-gradient(135deg,#eef2ff,#e0e7ff); color: #2563eb; }
        .ph-nav-pill--tertiary  .ph-nav-pill-icon { background: linear-gradient(135deg,#fdf4ff,#f3e8ff); color: #a855f7; }
        .ph-nav-pill:hover .ph-nav-pill-icon { transform: scale(1.1) rotate(-5deg); }

        /* text block */
        .ph-nav-pill-text { display: flex; flex-direction: column; line-height: 1.22; flex: 1; min-width: 0; overflow: hidden; }
        .ph-nav-pill-text strong { font-size: 13px; font-weight: 700; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
        .ph-nav-pill-text span   { font-size: 11px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
        .ph-nav-pill--primary  .ph-nav-pill-text strong { color: #fff; }
        .ph-nav-pill--primary  .ph-nav-pill-text span   { color: rgba(255,255,255,.78); }
        .ph-nav-pill--secondary .ph-nav-pill-text strong,
        .ph-nav-pill--tertiary  .ph-nav-pill-text strong { color: #0f172a; }
        .ph-nav-pill--secondary .ph-nav-pill-text span,
        .ph-nav-pill--tertiary  .ph-nav-pill-text span   { color: #64748b; }

        /* arrow chip */
        .ph-nav-pill-arrow {
          width: 24px; height: 24px; border-radius: 50%; flex-shrink: 0;
          display: flex; align-items: center; justify-content: center;
          transition: transform .22s ease;
        }
        .ph-nav-pill--primary  .ph-nav-pill-arrow { background: rgba(255,255,255,.18); color: #fff;    }
        .ph-nav-pill--secondary .ph-nav-pill-arrow { background: #eef2ff; color: #2563eb; }
        .ph-nav-pill--tertiary  .ph-nav-pill-arrow { background: #f3e8ff; color: #a855f7; }
        .ph-nav-pill-arrow--open { transform: rotate(90deg); }
        .ph-nav-pill:hover .ph-nav-pill-arrow:not(.ph-nav-pill-arrow--open) { transform: translateX(2px); }

        /* ── popup card ── */
        .ph-popup-anchor {
          position: relative; width: 100%; max-width: 860px;
          margin: 0 auto; height: 0; overflow: visible;
          display: flex; justify-content: center; z-index: 30;
        }
        .ph-popup {
          position: absolute; bottom: 10px; left: 50%; transform: translateX(-50%);
          width: 330px; background: #fff; border-radius: 18px;
          padding: 15px 15px 12px;
          box-shadow: 0 20px 44px rgba(15,23,42,.13), 0 6px 16px rgba(37,99,235,.09), 0 0 0 1px rgba(15,23,42,.045);
          pointer-events: all;
        }
        .ph-popup-head {
          display: flex; align-items: center; justify-content: space-between;
          margin-bottom: 10px; padding-bottom: 9px; border-bottom: 1px solid #f1f5f9;
        }
        .ph-popup-title { font-size: 10.5px; font-weight: 700; color: #94a3b8; text-transform: uppercase; letter-spacing: .06em; }
        .ph-popup-close {
          width: 22px; height: 22px; border-radius: 50%; border: none; cursor: pointer;
          background: #f1f5f9; color: #64748b; font-size: 15px;
          display: flex; align-items: center; justify-content: center;
          transition: background .18s, color .18s; padding: 0; font-family: inherit;
        }
        .ph-popup-close:hover { background: #e2e8f0; color: #0f172a; }

        .ph-popup-items { display: flex; flex-direction: column; gap: 6px; }
        .ph-popup-item {
          display: flex; align-items: center; gap: 10px;
          padding: 8px 10px; border-radius: 11px;
          background: #f8faff; border: 1px solid #eef2ff;
          text-decoration: none;
          transition: background .18s, border-color .18s, transform .18s;
          cursor: pointer;
        }
        .ph-popup-item:hover { background: #eef2ff; border-color: #c7d7fd; transform: translateX(3px); }
        .ph-popup-emoji {
          font-size: 18px; width: 34px; height: 34px; border-radius: 9px;
          background: #fff; border: 1px solid #e2e8f0; flex-shrink: 0;
          display: flex; align-items: center; justify-content: center;
          box-shadow: 0 1px 4px rgba(15,23,42,.06);
        }
        .ph-popup-item-text { display: flex; flex-direction: column; line-height: 1.28; flex: 1; min-width: 0; }
        .ph-popup-item-text strong { font-size: 13px; font-weight: 700; color: #0f172a; }
        .ph-popup-item-text span   { font-size: 11.5px; color: #64748b; }
        .ph-popup-item-arrow { color: #94a3b8; flex-shrink: 0; }

        /* ── stage ── */
        .ph-stage {
          position: relative; width: 100%; max-width: 860px;
          height: clamp(320px,37vw,430px); margin: 0 auto clamp(24px,3.5vw,36px);
        }

        /* floating cards */
        .ph-card {
          position: absolute; width: clamp(196px,21vw,230px);
          background: #fff; border-radius: 16px; padding: 13px 15px;
          box-shadow: 0 14px 32px rgba(15,23,42,.11);
          border: 1px solid rgba(15,23,42,.04); z-index: 4;
          transition: box-shadow .28s;
        }
        .ph-card:hover { box-shadow: 0 20px 44px rgba(15,23,42,.17); }
        .ph-card--left  { top: 0;    left: 0; }
        .ph-card--right { bottom: 0; right: 0; }
        .ph-card-profile { display: flex; align-items: center; gap: 9px; margin-bottom: 7px; }
        .ph-avatar { width: 38px; height: 38px; border-radius: 50%; object-fit: cover; border: 2px solid #fff; box-shadow: 0 2px 7px rgba(0,0,0,.11); flex-shrink: 0; }
        .ph-name { font-size: 13.5px; font-weight: 700; color: #0f172a; margin: 0; }
        .ph-role { font-size: 11.5px; color: #64748b; margin: 0; }
        .ph-line { font-size: 12px; color: #334155; margin: 0; line-height: 1.4; }
        .ph-line strong { background-image: linear-gradient(90deg,#2563eb,#a855f7); -webkit-background-clip: text; background-clip: text; color: transparent; font-weight: 700; }

        /* scatter */
        .ph-scatter { position: absolute; inset: 0; z-index: 1; }
        .ph-scatter-wrap { position: absolute; border-radius: 50%; overflow: visible; cursor: default; }
        .ph-scatter-img  { width: 100%; height: 100%; object-fit: cover; border-radius: 50%; box-shadow: 0 7px 16px rgba(15,23,42,.15); border: 3px solid #fff; display: block; }
        .ph-scatter-badge {
          position: absolute; bottom: -3px; right: -3px; width: 19px; height: 19px;
          border-radius: 50%; background: linear-gradient(135deg,#2563eb,#a855f7);
          color: #fff; display: flex; align-items: center; justify-content: center;
          border: 2px solid #fff; box-shadow: 0 2px 7px rgba(37,99,235,.38);
        }

        /* glass pills */
        .ph-gpill {
          position: absolute; display: flex; align-items: center; gap: 8px;
          background: rgba(255,255,255,.88); backdrop-filter: blur(10px);
          -webkit-backdrop-filter: blur(10px);
          border: 1px solid rgba(255,255,255,.6); border-radius: 13px;
          padding: 8px 13px; box-shadow: 0 9px 22px rgba(37,99,235,.13); z-index: 3;
        }
        .ph-gpill--share { top: 26%; left: 40%; }
        .ph-gpill--rec   { top: 46%; left: 46%; }
        .ph-gpill-icon {
          width: 25px; height: 25px; border-radius: 50%;
          background: linear-gradient(135deg,#2563eb,#a855f7);
          color: #fff; display: flex; align-items: center; justify-content: center; flex-shrink: 0;
        }
        .ph-gpill-text { display: flex; flex-direction: column; line-height: 1.2; white-space: nowrap; }
        .ph-gpill-text strong { font-size: 12px; font-weight: 700; background-image: linear-gradient(90deg,#2563eb,#a855f7); -webkit-background-clip: text; background-clip: text; color: transparent; }
        .ph-gpill-text span   { font-size: 12px; color: #0f172a; font-weight: 600; }

        /* ── stats bar ── */
        .ph-stats {
          display: grid;
          grid-template-columns: repeat(4,1fr);
          gap: 10px;
          max-width: 900px;
          margin: 0 auto clamp(28px,4vw,42px);
        }
        .ph-stat {
          position: relative; overflow: hidden; isolation: isolate;
          display: flex; flex-direction: column; align-items: center; justify-content: center;
          gap: 6px; text-align: center;
          background: #fff; border: 1px solid #eef1f6; border-radius: 16px;
          padding: 16px 12px 14px; cursor: default;
          box-shadow: 0 4px 14px rgba(15,23,42,.05);
          transition: box-shadow .25s, transform .25s;
        }
        .ph-stat:hover { transform: translateY(-4px); box-shadow: 0 12px 28px rgba(37,99,235,.13); }
        .ph-stat-shine {
          position: absolute; top: 0; left: -130%; width: 60%; height: 100%;
          background: linear-gradient(115deg,transparent,rgba(124,143,240,.15),transparent);
          transform: skewX(-20deg); transition: left .65s ease; z-index: 0; pointer-events: none;
        }
        .ph-stat:hover .ph-stat-shine { left: 140%; }
        .ph-stat-icon {
          position: relative; z-index: 1;
          width: 36px; height: 36px; border-radius: 50%;
          background: linear-gradient(135deg,#eef2ff,#fdf2f8);
          border: 1.5px solid #e5e7ff; color: #7c3aed;
          display: flex; align-items: center; justify-content: center;
          transition: transform .3s cubic-bezier(.22,1,.36,1);
        }
        .ph-stat:hover .ph-stat-icon { transform: scale(1.14) rotate(-7deg); }
        .ph-stat-value {
          position: relative; z-index: 1;
          font-size: clamp(18px,2vw,22px); font-weight: 800; line-height: 1;
          background-image: linear-gradient(90deg,#2563eb,#a855f7);
          -webkit-background-clip: text; background-clip: text; color: transparent;
        }
        .ph-stat-label {
          position: relative; z-index: 1;
          font-size: 11.5px; color: #64748b; line-height: 1.3; font-weight: 500;
        }

        /* divider */
        .ph-stat-divider {
          width: 1px; background: #e9edf4; align-self: stretch; margin: 8px 0;
          display: none;
        }

        /* ── marquee heading ── */
        .ph-marquee-head { text-align: center; margin-bottom: clamp(16px,2.2vw,22px); }
        .ph-marquee-head .bar {
          width: 36px; height: 3px; border-radius: 999px;
          background-image: linear-gradient(90deg,#2563eb,#a855f7,#fb923c);
          margin: 0 auto 13px;
        }
        .ph-marquee-head h3 { font-size: clamp(18px,1.75vw,21px); font-weight: 800; color: #0f172a; line-height: 1.28; margin: 0; }

        @media (max-width: 900px) { .ph-wrap { display: none; } }
        @media (max-width: 700px) {
          .ph-pills { flex-wrap: wrap; }
          .ph-nav-pill { max-width: 100%; flex: 1 1 calc(50% - 5px); }
          .ph-stats { grid-template-columns: repeat(2,1fr); }
        }
        @media (max-width: 460px) {
          .ph-nav-pill { flex: 1 1 100%; }
          .ph-stats { grid-template-columns: repeat(2,1fr); }
        }
      `}</style>

      <div className="ph-hero-bg" aria-hidden>
        <HeroGradientBg />
        <HeroBgVideo />
      </div>

      <div className="ph-wrap">
        {/* ── copy ── */}
        <div className="ph-copy">
          <motion.h1
            className="ph-title"
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55 }}
          >
            Grow your career,
            <br />
            <AnimatedGradientText>through people you trust.</AnimatedGradientText>
          </motion.h1>

          <motion.p
            className="ph-sub"
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.08 }}
          >
            {cms['hp:heroSubline'] ?? 'Career Placement & Global Education Consultancy — Delhi NCR.'}
          </motion.p>

          {/* ── 3 nav pills ── */}
          <motion.div
            className="ph-pills"
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.48, delay: 0.18 }}
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
        </div>

        {/* ── popup anchor — zero-height row immediately above stage ── */}
        <div className="ph-popup-anchor">
          {activePill && (
            <PopupCard pill={activePill} onClose={() => setActivePopup(null)} />
          )}
        </div>

        {/* ── stage ── */}
        <motion.div
          ref={stageRef}
          className="ph-stage"
          initial={{ opacity: 0, y: 26 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.62, delay: 0.28 }}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
        >
          {/* left card */}
          <motion.div
            className="ph-card ph-card--left"
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 5.5, repeat: Infinity, ease: 'easeInOut' }}
            style={{ x: useTransform(smx,[0,1],[-8,8]), y: useTransform(smy,[0,1],[-5,5]) }}
            whileHover={{ scale: 1.03 }}
          >
            <div className="ph-card-profile">
              <img src={HERO_CARD_AVATARS.left} alt="" className="ph-avatar" width={38} height={38} loading="lazy" decoding="async" />
              <div>
                <p className="ph-name">{cms['hp:heroOfferName'] ?? 'Priya'}</p>
                <p className="ph-role">CAP · India careers</p>
              </div>
            </div>
            <p className="ph-line">Targeting <strong>{offerRole}</strong></p>
          </motion.div>

          {/* scatter avatars */}
          <div className="ph-scatter" aria-hidden>
            {SCATTER_AVATARS.map((p, i) => (
              <motion.div
                key={p.src}
                className="ph-scatter-wrap"
                style={{
                  top: p.top, left: p.left, width: p.size, height: p.size, zIndex: i + 1,
                  x: useTransform(smx,[0,1],[-p.depth,p.depth]),
                  y: useTransform(smy,[0,1],[-p.depth,p.depth]),
                }}
                animate={{ y: [0, i % 2 === 0 ? -6 : 6, 0] }}
                transition={{ duration: 4.5 + i, repeat: Infinity, ease: 'easeInOut', delay: i * 0.25 }}
                whileHover={{ scale: 1.15 }}
              >
                <img src={p.src} alt="" className="ph-scatter-img" width={p.size} height={p.size} loading="lazy" decoding="async" />
                {p.badge && <span className="ph-scatter-badge"><Share2 size={10} strokeWidth={2.5} /></span>}
              </motion.div>
            ))}
          </div>

          {/* glass pills */}
          <motion.div className="ph-gpill ph-gpill--share"
            animate={{ y: [0,-5,0] }} transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
            style={{ x: useTransform(smx,[0,1],[-10,10]), y: useTransform(smy,[0,1],[-8,8]) }}
            whileHover={{ scale: 1.05 }}
          >
            <span className="ph-gpill-icon"><Share2 size={12} strokeWidth={2.25} /></span>
            <span className="ph-gpill-text"><strong>Shared</strong><span>CAP roadmap</span></span>
          </motion.div>

          <motion.div className="ph-gpill ph-gpill--rec"
            animate={{ y: [0,5,0] }} transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut', delay: 0.3 }}
            style={{ x: useTransform(smx,[0,1],[10,-10]), y: useTransform(smy,[0,1],[8,-8]) }}
            whileHover={{ scale: 1.05 }}
          >
            <span className="ph-gpill-icon"><Sparkles size={12} strokeWidth={2.25} /></span>
            <span className="ph-gpill-text"><strong>Recommended</strong><span>Admit path</span></span>
          </motion.div>

          {/* right card */}
          <motion.div
            className="ph-card ph-card--right"
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut', delay: 0.4 }}
            style={{ x: useTransform(smx,[0,1],[8,-8]), y: useTransform(smy,[0,1],[5,-5]) }}
            whileHover={{ scale: 1.03 }}
          >
            <div className="ph-card-profile">
              <img src={HERO_CARD_AVATARS.right} alt="" className="ph-avatar" width={38} height={38} loading="lazy" decoding="async" />
              <div>
                <p className="ph-name">{cms['hp:heroAdmitName'] ?? 'Arjun'}</p>
                <p className="ph-role">Study abroad track</p>
              </div>
            </div>
            <p className="ph-line">Interested in <strong>{admitProgramme.split('·')[0]?.trim() ?? 'UK Masters'}</strong></p>
          </motion.div>
        </motion.div>

        {/* ── stats bar ── */}
        <motion.div
          className="ph-stats"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-60px' }}
          variants={{ hidden: {}, show: { transition: { staggerChildren: 0.09 } } }}
        >
          {STATS.map((stat) => (
            <motion.div
              key={stat.label}
              className="ph-stat"
              variants={{ hidden: { opacity: 0, y: 16, scale: 0.96 }, show: { opacity: 1, y: 0, scale: 1 } }}
              transition={{ duration: 0.42, ease: 'easeOut' }}
            >
              <span className="ph-stat-shine" aria-hidden />
              <span className="ph-stat-icon"><stat.icon size={15} strokeWidth={2} /></span>
              <span className="ph-stat-value">
                <CountUpNumber value={stat.value} suffix={stat.suffix} />
              </span>
              <span className="ph-stat-label">{stat.label}</span>
            </motion.div>
          ))}
        </motion.div>
      </div>

      <HeroMobileBrief cms={cms} />

      <div className="ph-marquee-head">
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