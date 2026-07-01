'use client';

import React, { useEffect, useMemo, useRef, useState } from 'react';
import {
  ArrowRight,
  Building2,
  DollarSign,
  Globe,
  Handshake,
  Moon,
  Plane,
  Rocket,
  Sparkles,
  Sun,
  Target,
  TrendingUp,
  Trophy,
  type LucideIcon,
} from 'lucide-react';

export type AboutPayload = {
  stats: Array<{ num: string; label: string }>;
  values: Array<{
    icon?: string;
    color?: string;
    bg?: string;
    title: string;
    desc: string;
  }>;
  timeline: Array<{ year: string; title: string; desc: string }>;
  founder: {
    name: string;
    role: string;
    bio: string;
    quote: string;
  };
};

type IconComponent = LucideIcon;

const ICON_MAP: Record<string, IconComponent> = {
  Target,
  DollarSign,
  Handshake,
  Globe,
  Building2,
  TrendingUp,
};

function useThemeMode() {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('placedly-theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

    if (saved === 'dark' || saved === 'light') {
      setTheme(saved);
    } else {
      setTheme(prefersDark ? 'dark' : 'light');
    }

    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    localStorage.setItem('placedly-theme', theme);
  }, [theme, mounted]);

  return {
    theme,
    mounted,
    toggleTheme: () => setTheme((prev) => (prev === 'light' ? 'dark' : 'light')),
  };
}

function useScrollProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const doc = document.documentElement;
      const total = doc.scrollHeight - doc.clientHeight;
      const value = total > 0 ? doc.scrollTop / total : 0;
      setProgress(Math.min(1, Math.max(0, value)));
    };

    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });

    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return progress;
}

function useCursorGlow(ref: React.RefObject<HTMLElement | null>) {
  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    let frame = 0;

    const onMove = (event: PointerEvent) => {
      cancelAnimationFrame(frame);

      frame = requestAnimationFrame(() => {
        el.style.setProperty('--mx', `${event.clientX}px`);
        el.style.setProperty('--my', `${event.clientY}px`);
      });
    };

    window.addEventListener('pointermove', onMove, { passive: true });

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('pointermove', onMove);
    };
  }, [ref]);
}

function useInView<T extends HTMLElement>(threshold = 0.16) {
  const ref = useRef<T | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVisible(true);
      },
      { threshold }
    );

    observer.observe(node);

    return () => observer.disconnect();
  }, [threshold]);

  return { ref, visible };
}

function handleCardPointerMove(event: React.PointerEvent<HTMLElement>) {
  const el = event.currentTarget;
  const rect = el.getBoundingClientRect();

  el.style.setProperty('--card-x', `${event.clientX - rect.left}px`);
  el.style.setProperty('--card-y', `${event.clientY - rect.top}px`);
}

function CountUp({ value, active }: { value: string; active: boolean }) {
  const [display, setDisplay] = useState(value);

  useEffect(() => {
    if (!active) return;

    const match = value.match(/^([^0-9]*)([0-9]+)(.*)$/);

    if (!match) {
      setDisplay(value);
      return;
    }

    const [, prefix, number, suffix] = match;
    const target = Number(number);

    if (!Number.isFinite(target) || target === 0) {
      setDisplay(value);
      return;
    }

    let frame = 0;
    let start: number | null = null;
    const duration = 1100;

    const tick = (time: number) => {
      if (!start) start = time;

      const progress = Math.min(1, (time - start) / duration);
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = Math.round(target * eased);

      setDisplay(`${prefix}${current}${suffix}`);

      if (progress < 1) {
        frame = requestAnimationFrame(tick);
      }
    };

    frame = requestAnimationFrame(tick);

    return () => cancelAnimationFrame(frame);
  }, [active, value]);

  return <>{display}</>;
}

function MagneticLink({
  href,
  children,
  variant = 'primary',
}: {
  href: string;
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'orange' | 'ghost';
}) {
  const ref = useRef<HTMLAnchorElement | null>(null);

  const onMove = (event: React.MouseEvent<HTMLAnchorElement>) => {
    const el = ref.current;
    if (!el) return;

    const rect = el.getBoundingClientRect();
    const x = event.clientX - rect.left - rect.width / 2;
    const y = event.clientY - rect.top - rect.height / 2;

    el.style.transform = `translate(${x * 0.14}px, ${y * 0.2}px)`;
  };

  const onLeave = () => {
    if (!ref.current) return;
    ref.current.style.transform = 'translate(0, 0)';
  };

  return (
    <a
      ref={ref}
      href={href}
      className={`pro-btn pro-btn-${variant}`}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
    >
      {children}
    </a>
  );
}

function TiltPanel({
  children,
  className = '',
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement | null>(null);

  const onMove = (event: React.MouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;

    const rect = el.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    const rotateY = ((x / rect.width) - 0.5) * 10;
    const rotateX = -((y / rect.height) - 0.5) * 10;

    el.style.transform = `perspective(1200px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
  };

  const onLeave = () => {
    if (!ref.current) return;
    ref.current.style.transform = 'perspective(1200px) rotateX(0deg) rotateY(0deg)';
  };

  return (
    <div
      ref={ref}
      className={className}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
    >
      {children}
    </div>
  );
}

function StatCard({
  stat,
  index,
}: {
  stat: AboutPayload['stats'][number];
  index: number;
}) {
  const { ref, visible } = useInView<HTMLDivElement>();

  return (
    <div
      ref={ref}
      className={`pro-card pro-stat ${visible ? 'is-visible' : ''}`}
      style={{ transitionDelay: `${index * 90}ms` }}
      onPointerMove={handleCardPointerMove}
    >
      <div className="pro-stat-glow" />
      <div className="pro-stat-num">
        <CountUp value={stat.num} active={visible} />
      </div>
      <div className="pro-stat-label">{stat.label}</div>
    </div>
  );
}

function ValueCard({
  item,
  index,
}: {
  item: AboutPayload['values'][number];
  index: number;
}) {
  const { ref, visible } = useInView<HTMLDivElement>();
  const Icon = ICON_MAP[item.icon ?? 'Target'] ?? Target;

  return (
    <article
      ref={ref}
      className={`pro-card pro-value ${visible ? 'is-visible' : ''}`}
      style={{ transitionDelay: `${index * 80}ms` }}
      onPointerMove={handleCardPointerMove}
    >
      <div
        className="pro-value-icon"
        style={{
          background: item.bg ?? '#eff6ff',
          color: item.color ?? '#2145fb',
        }}
      >
        <Icon size={23} color={item.color ?? '#2145fb'} />
      </div>

      <h3>{item.title}</h3>
      <p>{item.desc}</p>
    </article>
  );
}

function TimelineItem({
  item,
  index,
}: {
  item: AboutPayload['timeline'][number];
  index: number;
}) {
  const { ref, visible } = useInView<HTMLDivElement>();

  return (
    <div
      ref={ref}
      className={`pro-timeline-item ${visible ? 'is-visible' : ''}`}
      style={{ transitionDelay: `${index * 110}ms` }}
    >
      <div className="pro-time-marker">
        <div className="pro-time-dot">{index + 1}</div>
        <div className="pro-time-line" />
      </div>

      <div className="pro-time-content">
        <span>{item.year}</span>
        <h3>{item.title}</h3>
        <p>{item.desc}</p>
      </div>
    </div>
  );
}

export default function AboutUsExperience({
  stats,
  values,
  timeline,
  founder,
}: AboutPayload) {
  const rootRef = useRef<HTMLElement | null>(null);
  const { theme, mounted, toggleTheme } = useThemeMode();
  const progress = useScrollProgress();

  useCursorGlow(rootRef);

  const themeStyle = useMemo(
    () =>
      ({
        '--heading-gradient':
          theme === 'dark'
            ? 'linear-gradient(120deg, #7dd3fc 0%, #a78bfa 38%, #fb923c 72%, #7dd3fc 100%)'
            : 'linear-gradient(120deg, #2145fb 0%, #6366f1 38%, #f97316 72%, #2145fb 100%)',
      }) as React.CSSProperties,
    [theme]
  );

  const heroReveal = useInView<HTMLDivElement>(0.05);
  const missionReveal = useInView<HTMLDivElement>();
  const valuesReveal = useInView<HTMLDivElement>();
  const timelineReveal = useInView<HTMLDivElement>();
  const founderReveal = useInView<HTMLDivElement>();

  return (
    <main
      ref={rootRef}
      className="about-pro"
      data-theme={theme}
      style={themeStyle}
    >
      <style>{`
        .about-pro {
          --bg: #ffffff;
          --bg-soft: #f8faff;
          --card: rgba(255,255,255,0.78);
          --card-solid: #ffffff;
          --text: #090d1f;
          --muted: #64748b;
          --line: rgba(15,23,42,0.09);
          --primary: #2145fb;
          --accent: #f97316;
          --shadow: 0 24px 70px rgba(15,23,42,0.08);
          --shadow-strong: 0 30px 90px rgba(33,69,251,0.18);
          --mx: 50vw;
          --my: 20vh;
          position: relative;
          isolation: isolate;
          overflow: hidden;
          background:
            radial-gradient(circle at 15% 5%, rgba(33,69,251,0.09), transparent 32%),
            radial-gradient(circle at 85% 18%, rgba(249,115,22,0.08), transparent 30%),
            linear-gradient(180deg, var(--bg) 0%, var(--bg-soft) 48%, var(--bg) 100%);
          color: var(--text);
          transition: background 0.45s ease, color 0.3s ease;
        }

        .about-pro[data-theme="dark"] {
          --bg: #070b18;
          --bg-soft: #0d1426;
          --card: rgba(15,23,42,0.72);
          --card-solid: #111827;
          --text: #f8fafc;
          --muted: #94a3b8;
          --line: rgba(255,255,255,0.11);
          --primary: #60a5fa;
          --accent: #fb923c;
          --shadow: 0 24px 80px rgba(0,0,0,0.34);
          --shadow-strong: 0 30px 95px rgba(96,165,250,0.16);
          background:
            radial-gradient(circle at 18% 6%, rgba(96,165,250,0.16), transparent 34%),
            radial-gradient(circle at 82% 20%, rgba(251,146,60,0.12), transparent 34%),
            linear-gradient(180deg, var(--bg) 0%, var(--bg-soft) 52%, var(--bg) 100%);
        }

        .about-pro::before {
          content: "";
          position: fixed;
          inset: 0;
          z-index: -1;
          pointer-events: none;
          background:
            radial-gradient(620px circle at var(--mx) var(--my), rgba(33,69,251,0.13), transparent 44%),
            radial-gradient(360px circle at var(--mx) var(--my), rgba(249,115,22,0.09), transparent 54%);
          opacity: 0.9;
          transition: opacity 0.3s ease;
        }

        .about-pro[data-theme="dark"]::before {
          background:
            radial-gradient(680px circle at var(--mx) var(--my), rgba(96,165,250,0.16), transparent 45%),
            radial-gradient(420px circle at var(--mx) var(--my), rgba(168,85,247,0.11), transparent 55%);
        }

        .pro-progress {
          position: fixed;
          left: 0;
          top: 0;
          width: 100%;
          height: 3px;
          z-index: 9999;
          transform-origin: left center;
          background: var(--heading-gradient);
          box-shadow: 0 0 22px rgba(33,69,251,0.35);
        }

        .pro-theme {
          position: fixed;
          top: 92px;
          right: 18px;
          z-index: 80;
          border: 1px solid var(--line);
          background: var(--card);
          color: var(--text);
          backdrop-filter: blur(18px);
          border-radius: 999px;
          padding: 10px 14px;
          display: inline-flex;
          align-items: center;
          gap: 8px;
          font-size: 12px;
          font-weight: 700;
          cursor: pointer;
          box-shadow: var(--shadow);
          transition: transform 0.25s ease, border-color 0.25s ease;
        }

        .pro-theme:hover {
          transform: translateY(-2px);
          border-color: rgba(33,69,251,0.32);
        }

        .pro-gradient {
          background: var(--heading-gradient);
          background-size: 240% 240%;
          -webkit-background-clip: text;
          background-clip: text;
          -webkit-text-fill-color: transparent;
          animation: pro-gradient-flow 7s ease-in-out infinite;
        }

        @keyframes pro-gradient-flow {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }

        .pro-shine {
          position: relative;
          overflow: hidden;
        }

        .pro-shine::after {
          content: "";
          position: absolute;
          inset: 0;
          transform: translateX(-120%);
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.45), transparent);
          transition: transform 0.8s ease;
          pointer-events: none;
        }

        .pro-shine:hover::after {
          transform: translateX(120%);
        }

        .pro-hero {
          padding: calc(56px + 76px) 0 70px;
          position: relative;
        }

        .pro-hero-grid {
          display: grid;
          grid-template-columns: minmax(0, 1.08fr) minmax(360px, 0.92fr);
          gap: 64px;
          align-items: center;
        }

        .pro-breadcrumb {
          display: flex;
          align-items: center;
          gap: 8px;
          color: var(--muted);
          font-size: 13px;
          margin-bottom: 24px;
        }

        .pro-breadcrumb a {
          color: var(--muted);
          text-decoration: none;
        }

        .pro-kicker {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          color: var(--primary);
          font-size: 11px;
          font-weight: 800;
          text-transform: uppercase;
          letter-spacing: 1.1px;
          margin-bottom: 18px;
        }

        .pro-kicker-line {
          width: 26px;
          height: 3px;
          border-radius: 999px;
          background: var(--heading-gradient);
          position: relative;
          overflow: hidden;
        }

        .pro-kicker-line::after {
          content: "";
          position: absolute;
          inset: 0;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.8), transparent);
          background-size: 200% 100%;
          animation: pro-shimmer 2.2s linear infinite;
        }

        @keyframes pro-shimmer {
          from { background-position: 200% 0; }
          to { background-position: -200% 0; }
        }

        .pro-hero h1 {
          font-size: clamp(2.45rem, 5vw, 4.65rem);
          line-height: 0.98;
          letter-spacing: -2.2px;
          font-weight: 950;
          margin: 0 0 24px;
          color: var(--text);
        }

        .pro-hero h1 span {
          display: block;
        }

        .pro-hero p {
          max-width: 570px;
          color: var(--muted);
          font-size: 16px;
          line-height: 1.8;
          margin: 0 0 34px;
        }

        .pro-actions {
          display: flex;
          flex-wrap: wrap;
          gap: 13px;
        }

        .pro-btn {
          position: relative;
          isolation: isolate;
          overflow: hidden;
          min-height: 48px;
          padding: 14px 28px;
          border-radius: 999px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          text-decoration: none;
          font-size: 14px;
          font-weight: 800;
          transition:
            transform 0.2s ease,
            box-shadow 0.25s ease,
            border-color 0.25s ease,
            color 0.25s ease;
          will-change: transform;
        }

        .pro-btn::before {
          content: "";
          position: absolute;
          inset: 0;
          z-index: -1;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.22), transparent);
          transform: translateX(-120%);
          transition: transform 0.75s ease;
        }

        .pro-btn:hover::before {
          transform: translateX(120%);
        }

        .pro-btn-primary {
          color: #fff;
          background: linear-gradient(135deg, var(--primary), #1734c6);
          box-shadow: 0 16px 34px rgba(33,69,251,0.26);
        }

        .about-pro[data-theme="dark"] .pro-btn-primary {
          background: linear-gradient(135deg, #60a5fa, #2563eb);
          box-shadow: 0 16px 38px rgba(96,165,250,0.18);
        }

        .pro-btn-secondary {
          color: var(--text);
          border: 1.5px solid var(--line);
          background: rgba(255,255,255,0.2);
          backdrop-filter: blur(14px);
        }

        .pro-btn-orange {
          color: #fff;
          background: linear-gradient(135deg, #f97316, #fb923c);
          box-shadow: 0 16px 38px rgba(249,115,22,0.3);
        }

        .pro-btn-ghost {
          color: #fff;
          border: 1.5px solid rgba(255,255,255,0.22);
          background: rgba(255,255,255,0.06);
          backdrop-filter: blur(16px);
        }

        .pro-hero-stage {
          position: relative;
          min-height: 490px;
          transition: transform 0.18s ease;
          transform-style: preserve-3d;
        }

        .pro-dashboard {
          position: absolute;
          inset: 50px 22px auto 22px;
          min-height: 360px;
          padding: 24px;
          border-radius: 30px;
          background:
            linear-gradient(180deg, rgba(255,255,255,0.84), rgba(255,255,255,0.58)),
            radial-gradient(circle at 20% 0%, rgba(33,69,251,0.16), transparent 40%);
          border: 1px solid var(--line);
          backdrop-filter: blur(22px);
          box-shadow: var(--shadow-strong);
        }

        .about-pro[data-theme="dark"] .pro-dashboard {
          background:
            linear-gradient(180deg, rgba(15,23,42,0.86), rgba(15,23,42,0.62)),
            radial-gradient(circle at 20% 0%, rgba(96,165,250,0.16), transparent 42%);
        }

        .pro-dashboard-top {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 24px;
        }

        .pro-dots {
          display: flex;
          gap: 7px;
        }

        .pro-dots span {
          width: 10px;
          height: 10px;
          border-radius: 50%;
          background: var(--line);
        }

        .pro-dots span:nth-child(1) { background: #ef4444; }
        .pro-dots span:nth-child(2) { background: #f59e0b; }
        .pro-dots span:nth-child(3) { background: #22c55e; }

        .pro-pulse-pill {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 8px 12px;
          border-radius: 999px;
          font-size: 12px;
          font-weight: 800;
          color: var(--primary);
          background: rgba(33,69,251,0.08);
        }

        .pro-pulse-pill span {
          width: 7px;
          height: 7px;
          border-radius: 50%;
          background: var(--primary);
          box-shadow: 0 0 0 0 rgba(33,69,251,0.45);
          animation: pro-pulse 1.8s ease-in-out infinite;
        }

        @keyframes pro-pulse {
          0% { box-shadow: 0 0 0 0 rgba(33,69,251,0.45); }
          70% { box-shadow: 0 0 0 9px rgba(33,69,251,0); }
          100% { box-shadow: 0 0 0 0 rgba(33,69,251,0); }
        }

        .pro-dashboard h3 {
          font-size: 30px;
          line-height: 1.06;
          letter-spacing: -1px;
          margin: 0 0 12px;
          color: var(--text);
        }

        .pro-dashboard p {
          margin: 0;
          color: var(--muted);
          font-size: 14px;
          line-height: 1.7;
        }

        .pro-dashboard-rows {
          margin-top: 24px;
          display: grid;
          gap: 12px;
        }

        .pro-dashboard-row {
          display: flex;
          justify-content: space-between;
          gap: 16px;
          border: 1px solid var(--line);
          background: rgba(255,255,255,0.28);
          border-radius: 16px;
          padding: 14px;
        }

        .about-pro[data-theme="dark"] .pro-dashboard-row {
          background: rgba(255,255,255,0.04);
        }

        .pro-dashboard-row strong {
          color: var(--text);
          font-size: 14px;
        }

        .pro-dashboard-row span {
          color: var(--muted);
          font-size: 12px;
          font-weight: 700;
        }

        .pro-floating-card {
          position: absolute;
          border-radius: 22px;
          padding: 18px 20px;
          background: var(--card);
          backdrop-filter: blur(20px);
          border: 1px solid var(--line);
          box-shadow: var(--shadow);
          animation: pro-float 5.5s ease-in-out infinite;
        }

        .pro-floating-card.one {
          left: -4px;
          top: 22px;
        }

        .pro-floating-card.two {
          right: -2px;
          bottom: 24px;
          animation-delay: 1.2s;
        }

        @keyframes pro-float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-12px); }
        }

        .pro-floating-card strong {
          display: block;
          font-size: 24px;
          color: var(--text);
          letter-spacing: -0.5px;
        }

        .pro-floating-card span {
          display: block;
          color: var(--muted);
          font-size: 12px;
          font-weight: 700;
          margin-top: 3px;
        }

        .pro-orbit {
          position: absolute;
          width: 280px;
          height: 280px;
          border: 1px dashed var(--line);
          border-radius: 50%;
          right: 40px;
          top: 8px;
          animation: pro-rotate 24s linear infinite;
          opacity: 0.7;
        }

        .pro-orbit::before,
        .pro-orbit::after {
          content: "";
          position: absolute;
          width: 12px;
          height: 12px;
          border-radius: 50%;
          background: var(--accent);
          box-shadow: 0 0 24px rgba(249,115,22,0.55);
        }

        .pro-orbit::before {
          top: 20px;
          left: 50%;
        }

        .pro-orbit::after {
          bottom: 18px;
          right: 48px;
          background: var(--primary);
        }

        @keyframes pro-rotate {
          to { transform: rotate(360deg); }
        }

        .pro-reveal,
        .pro-card,
        .pro-timeline-item {
          opacity: 0;
          transform: translateY(28px);
          filter: blur(10px);
          transition:
            opacity 0.75s cubic-bezier(0.2,0.8,0.2,1),
            transform 0.75s cubic-bezier(0.2,0.8,0.2,1),
            filter 0.75s cubic-bezier(0.2,0.8,0.2,1),
            box-shadow 0.3s ease,
            border-color 0.3s ease;
        }

        .pro-reveal.is-visible,
        .pro-card.is-visible,
        .pro-timeline-item.is-visible {
          opacity: 1;
          transform: translateY(0);
          filter: blur(0);
        }

        .pro-stats {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 16px;
          margin-top: 20px;
        }

        .pro-card {
          position: relative;
          overflow: hidden;
          border-radius: 24px;
          border: 1px solid var(--line);
          background: var(--card);
          backdrop-filter: blur(18px);
          box-shadow: var(--shadow);
        }

        .pro-card::before {
          content: "";
          position: absolute;
          inset: 0;
          background: radial-gradient(
            240px circle at var(--card-x, 50%) var(--card-y, 50%),
            rgba(33,69,251,0.13),
            transparent 42%
          );
          opacity: 0;
          transition: opacity 0.25s ease;
          pointer-events: none;
        }

        .about-pro[data-theme="dark"] .pro-card::before {
          background: radial-gradient(
            250px circle at var(--card-x, 50%) var(--card-y, 50%),
            rgba(96,165,250,0.18),
            transparent 44%
          );
        }

        .pro-card:hover::before {
          opacity: 1;
        }

        .pro-card.is-visible:hover {
          transform: translateY(-8px);
          border-color: rgba(33,69,251,0.22);
          box-shadow: var(--shadow-strong);
        }

        .pro-stat {
          padding: 30px 18px;
          text-align: center;
        }

        .pro-stat-glow {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: var(--primary);
          margin: 0 auto 15px;
          box-shadow: 0 0 22px rgba(33,69,251,0.4);
        }

        .pro-stat-num {
          font-size: 2.15rem;
          line-height: 1;
          font-weight: 950;
          letter-spacing: -1px;
          margin-bottom: 8px;
          background: var(--heading-gradient);
          background-size: 200% 200%;
          -webkit-background-clip: text;
          background-clip: text;
          -webkit-text-fill-color: transparent;
          animation: pro-gradient-flow 7s ease-in-out infinite;
        }

        .pro-stat-label {
          color: var(--muted);
          font-size: 12px;
          font-weight: 750;
        }

        .pro-marquee {
          overflow: hidden;
          border-top: 1px solid var(--line);
          border-bottom: 1px solid var(--line);
          background: rgba(255,255,255,0.26);
          backdrop-filter: blur(18px);
        }

        .about-pro[data-theme="dark"] .pro-marquee {
          background: rgba(255,255,255,0.035);
        }

        .pro-marquee-track {
          display: flex;
          width: max-content;
          animation: pro-marquee 30s linear infinite;
        }

        @keyframes pro-marquee {
          to { transform: translateX(-50%); }
        }

        .pro-marquee-item {
          padding: 18px 34px;
          color: var(--muted);
          font-size: 13px;
          font-weight: 800;
          white-space: nowrap;
          display: inline-flex;
          align-items: center;
          gap: 10px;
        }

        .pro-marquee-item span {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: var(--primary);
          opacity: 0.55;
        }

        .pro-section {
          padding: 100px 0;
        }

        .pro-section.alt {
          background: rgba(255,255,255,0.24);
          border-top: 1px solid var(--line);
          border-bottom: 1px solid var(--line);
        }

        .about-pro[data-theme="dark"] .pro-section.alt {
          background: rgba(255,255,255,0.025);
        }

        .pro-grid-2 {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 68px;
          align-items: center;
        }

        .pro-section-title {
          font-size: clamp(1.85rem, 3vw, 2.85rem);
          line-height: 1.1;
          letter-spacing: -1px;
          font-weight: 950;
          color: var(--text);
          margin: 0 0 20px;
        }

        .pro-copy {
          color: var(--muted);
          font-size: 15px;
          line-height: 1.82;
          margin: 0 0 16px;
        }

        .pro-copy strong {
          color: var(--text);
        }

        .pro-visual {
          position: relative;
          min-height: 510px;
          transform-style: preserve-3d;
          transition: transform 0.18s ease;
        }

        .pro-img-main,
        .pro-img-second {
          position: absolute;
          overflow: hidden;
          border-radius: 28px;
          box-shadow: var(--shadow-strong);
          border: 1px solid var(--line);
        }

        .pro-img-main {
          top: 0;
          left: 0;
          width: 72%;
          height: 315px;
        }

        .pro-img-second {
          right: 0;
          bottom: 0;
          width: 62%;
          height: 255px;
          border: 6px solid var(--bg);
        }

        .pro-img-main img,
        .pro-img-second img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.55s ease;
        }

        .pro-img-main:hover img,
        .pro-img-second:hover img {
          transform: scale(1.06);
        }

        .pro-badge {
          position: absolute;
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 15px 18px;
          border-radius: 18px;
          border: 1px solid var(--line);
          background: var(--card);
          backdrop-filter: blur(18px);
          box-shadow: var(--shadow);
          animation: pro-float 5s ease-in-out infinite;
        }

        .pro-badge.left {
          left: -22px;
          bottom: 150px;
        }

        .pro-badge.right {
          right: -22px;
          top: 58px;
          animation-delay: 1s;
        }

        .pro-badge-icon {
          width: 42px;
          height: 42px;
          border-radius: 13px;
          display: grid;
          place-items: center;
        }

        .pro-badge strong {
          display: block;
          color: var(--text);
          font-size: 19px;
          line-height: 1;
        }

        .pro-badge span {
          display: block;
          color: var(--muted);
          font-size: 11px;
          font-weight: 700;
          margin-top: 4px;
        }

        .pro-center {
          text-align: center;
          max-width: 760px;
          margin: 0 auto 56px;
        }

        .pro-values {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 22px;
        }

        .pro-value {
          padding: 32px;
        }

        .pro-value-icon {
          width: 54px;
          height: 54px;
          border-radius: 17px;
          display: grid;
          place-items: center;
          margin-bottom: 20px;
          transition: transform 0.35s ease;
        }

        .pro-value:hover .pro-value-icon {
          transform: rotate(-6deg) scale(1.08);
        }

        .pro-value h3 {
          position: relative;
          margin: 0 0 10px;
          color: var(--text);
          font-size: 17px;
          font-weight: 850;
        }

        .pro-value p {
          position: relative;
          margin: 0;
          color: var(--muted);
          font-size: 14px;
          line-height: 1.72;
        }

        .pro-timeline-wrap {
          display: grid;
          grid-template-columns: 0.88fr 1.12fr;
          gap: 80px;
          align-items: start;
        }

        .pro-sticky {
          position: sticky;
          top: 110px;
        }

        .pro-timeline {
          display: grid;
          gap: 0;
        }

        .pro-timeline-item {
          display: grid;
          grid-template-columns: 46px 1fr;
          gap: 18px;
        }

        .pro-time-marker {
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .pro-time-dot {
          width: 42px;
          height: 42px;
          border-radius: 50%;
          display: grid;
          place-items: center;
          color: #fff;
          font-size: 13px;
          font-weight: 900;
          background: var(--heading-gradient);
          box-shadow: 0 12px 28px rgba(33,69,251,0.22);
        }

        .pro-time-line {
          flex: 1;
          width: 2px;
          min-height: 52px;
          margin-top: 7px;
          background: linear-gradient(180deg, var(--primary), transparent);
          opacity: 0.42;
        }

        .pro-timeline-item:last-child .pro-time-line {
          display: none;
        }

        .pro-time-content {
          padding-bottom: 30px;
        }

        .pro-time-content span {
          display: inline-block;
          color: var(--primary);
          font-size: 11px;
          font-weight: 900;
          letter-spacing: 0.8px;
          text-transform: uppercase;
          margin-bottom: 5px;
        }

        .pro-time-content h3 {
          margin: 0 0 6px;
          color: var(--text);
          font-size: 17px;
          font-weight: 880;
        }

        .pro-time-content p {
          margin: 0;
          color: var(--muted);
          font-size: 14px;
          line-height: 1.72;
        }

        .pro-founder {
          max-width: 920px;
          margin: 0 auto;
          padding: 48px;
          display: grid;
          grid-template-columns: 210px 1fr;
          gap: 46px;
          align-items: start;
        }

        .pro-founder-img {
          height: 255px;
          border-radius: 26px;
          overflow: hidden;
          box-shadow: var(--shadow-strong);
          border: 1px solid var(--line);
        }

        .pro-founder-img img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: center top;
          transition: transform 0.55s ease;
        }

        .pro-founder:hover .pro-founder-img img {
          transform: scale(1.06);
        }

        .pro-founder h3 {
          margin: 0 0 5px;
          color: var(--text);
          font-size: 25px;
          font-weight: 920;
          letter-spacing: -0.5px;
        }

        .pro-founder-role {
          display: inline-block;
          margin-bottom: 20px;
          font-size: 14px;
          font-weight: 850;
        }

        .pro-founder p {
          color: var(--muted);
          margin: 0 0 24px;
          font-size: 15px;
          line-height: 1.8;
        }

        .pro-quote {
          position: relative;
          border-left: 4px solid var(--primary);
          border-radius: 0 18px 18px 0;
          background: rgba(33,69,251,0.06);
          padding: 20px 24px;
          color: var(--text);
          font-size: 14px;
          line-height: 1.75;
          font-style: italic;
        }

        .about-pro[data-theme="dark"] .pro-quote {
          background: rgba(96,165,250,0.08);
        }

        .pro-cta {
          padding: 84px 0;
        }

        .pro-cta-card {
          position: relative;
          overflow: hidden;
          border-radius: 34px;
          padding: 82px 62px;
          text-align: center;
          background:
            radial-gradient(circle at 20% 20%, rgba(33,69,251,0.35), transparent 32%),
            radial-gradient(circle at 80% 70%, rgba(249,115,22,0.24), transparent 36%),
            linear-gradient(135deg, #080b1d, #141845 54%, #080b1d);
          box-shadow: 0 34px 110px rgba(0,0,0,0.22);
        }

        .pro-cta-card::before {
          content: "";
          position: absolute;
          inset: 0;
          background-image:
            radial-gradient(circle at 10% 20%, rgba(255,255,255,0.16) 0 1px, transparent 2px),
            radial-gradient(circle at 80% 30%, rgba(255,255,255,0.12) 0 1px, transparent 2px),
            radial-gradient(circle at 40% 75%, rgba(255,255,255,0.12) 0 1px, transparent 2px),
            radial-gradient(circle at 70% 85%, rgba(255,255,255,0.16) 0 1px, transparent 2px);
          animation: pro-stars 5s ease-in-out infinite alternate;
          opacity: 0.85;
        }

        @keyframes pro-stars {
          from { transform: translateY(0); opacity: 0.45; }
          to { transform: translateY(-10px); opacity: 0.95; }
        }

        .pro-cta-card h2,
        .pro-cta-card p,
        .pro-cta-actions {
          position: relative;
          z-index: 2;
        }

        .pro-cta-card h2 {
          color: #fff;
          font-size: clamp(1.85rem, 3.6vw, 3rem);
          line-height: 1.1;
          letter-spacing: -1px;
          font-weight: 950;
          margin: 0 0 16px;
        }

        .pro-cta-card p {
          color: rgba(255,255,255,0.68);
          max-width: 540px;
          margin: 0 auto 34px;
          font-size: 15px;
          line-height: 1.75;
        }

        .pro-cta-actions {
          display: flex;
          flex-wrap: wrap;
          gap: 14px;
          justify-content: center;
        }

        @media (max-width: 1024px) {
          .pro-hero-grid,
          .pro-grid-2,
          .pro-timeline-wrap {
            grid-template-columns: 1fr;
          }

          .pro-hero-stage {
            min-height: 430px;
          }

          .pro-stats {
            grid-template-columns: repeat(2, 1fr);
          }

          .pro-values {
            grid-template-columns: repeat(2, 1fr);
          }

          .pro-sticky {
            position: static;
          }
        }

        @media (max-width: 700px) {
          .pro-theme {
            top: 78px;
            right: 10px;
            padding: 9px 11px;
          }

          .pro-theme span {
            display: none;
          }

          .pro-hero {
            padding-top: calc(56px + 54px);
          }

          .pro-hero h1 {
            font-size: clamp(2.25rem, 13vw, 3.25rem);
            letter-spacing: -1.3px;
          }

          .pro-hero-grid {
            gap: 38px;
          }

          .pro-hero-stage {
            min-height: 390px;
          }

          .pro-dashboard {
            inset: 35px 0 auto 0;
          }

          .pro-floating-card.one {
            left: 0;
            top: 0;
          }

          .pro-floating-card.two {
            right: 0;
          }

          .pro-orbit {
            width: 210px;
            height: 210px;
          }

          .pro-stats,
          .pro-values {
            grid-template-columns: 1fr;
          }

          .pro-section {
            padding: 74px 0;
          }

          .pro-visual {
            min-height: 410px;
          }

          .pro-img-main {
            width: 80%;
            height: 245px;
          }

          .pro-img-second {
            width: 68%;
            height: 200px;
          }

          .pro-badge.left {
            left: 0;
            bottom: 130px;
          }

          .pro-badge.right {
            right: 0;
            top: 42px;
          }

          .pro-founder {
            grid-template-columns: 1fr;
            padding: 30px;
          }

          .pro-founder-img {
            width: 210px;
          }

          .pro-cta-card {
            padding: 54px 24px;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          *,
          *::before,
          *::after {
            animation-duration: 0.001ms !important;
            animation-iteration-count: 1 !important;
            scroll-behavior: auto !important;
            transition-duration: 0.001ms !important;
          }
        }
      `}</style>

      <div
        className="pro-progress"
        style={{ transform: `scaleX(${progress})` }}
      />

      {mounted && (
        <button
          type="button"
          className="pro-theme"
          onClick={toggleTheme}
          aria-label="Toggle color theme"
          aria-pressed={theme === 'dark'}
        >
          {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
          <span>{theme === 'dark' ? 'Light' : 'Dark'}</span>
        </button>
      )}

      {/* Hero */}
      <section className="inner-section pro-hero">
        <div className="container">
          <div className="pro-hero-grid">
            <div
              ref={heroReveal.ref}
              className={`pro-reveal ${heroReveal.visible ? 'is-visible' : ''}`}
            >
              <nav className="pro-breadcrumb">
                <a href="/">Home</a>
                <span>›</span>
                <strong>About Us</strong>
              </nav>

              <div className="pro-kicker">
                <span className="pro-kicker-line" />
                <Sparkles size={13} />
                Our Story
              </div>

              <h1>
                <span>Not Just a</span>
                <span>Placement Agency.</span>
                <span className="pro-gradient">Career Partners.</span>
              </h1>

              <p>
                Born in Delhi NCR. Built for every professional who deserves
                better — a better role, a better salary, and a career that
                actually reflects their potential.
              </p>

              <div className="pro-actions">
                <MagneticLink href="/contact">
                  <Rocket size={16} />
                  Start Your Journey
                </MagneticLink>

                <MagneticLink href="#our-story" variant="secondary">
                  Read Our Story
                  <ArrowRight size={16} />
                </MagneticLink>
              </div>
            </div>

            <TiltPanel className="pro-hero-stage">
              <div className="pro-orbit" />

              <div className="pro-dashboard pro-shine">
                <div className="pro-dashboard-top">
                  <div className="pro-dots">
                    <span />
                    <span />
                    <span />
                  </div>

                  <div className="pro-pulse-pill">
                    <span />
                    Live outcomes
                  </div>
                </div>

                <h3>
                  Career growth, engineered with{' '}
                  <span className="pro-gradient">precision.</span>
                </h3>

                <p>
                  Strategy, preparation, employer access, negotiation and
                  joining support — built into one success-share model.
                </p>

                <div className="pro-dashboard-rows">
                  {stats.slice(0, 3).map((stat) => (
                    <div key={`${stat.num}-${stat.label}`} className="pro-dashboard-row">
                      <strong>{stat.num}</strong>
                      <span>{stat.label}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pro-floating-card one">
                <strong>{stats[0]?.num ?? '300+'}</strong>
                <span>{stats[0]?.label ?? 'Professionals Placed'}</span>
              </div>

              <div className="pro-floating-card two">
                <strong>{stats[2]?.num ?? '40%'}</strong>
                <span>{stats[2]?.label ?? 'Avg. Salary Hike'}</span>
              </div>
            </TiltPanel>
          </div>

          <div className="pro-stats">
            {stats.map((stat, index) => (
              <StatCard key={`${stat.num}-${stat.label}`} stat={stat} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* Marquee */}
      <div className="pro-marquee">
        <div className="pro-marquee-track">
          {[
            'Career Assistance Programme',
            'Zero Upfront Fee',
            '12% Success Share',
            '300+ Careers Transformed',
            '50+ Hiring Partners',
            '140+ Universities',
            'Study Abroad Services',
            'Average 40% Salary Hike',
            'Career Assistance Programme',
            'Zero Upfront Fee',
            '12% Success Share',
            '300+ Careers Transformed',
            '50+ Hiring Partners',
            '140+ Universities',
            'Study Abroad Services',
            'Average 40% Salary Hike',
          ].map((item, index) => (
            <div key={`${item}-${index}`} className="pro-marquee-item">
              <span />
              {item}
            </div>
          ))}
        </div>
      </div>

      {/* Mission */}
      <section className="inner-section pro-section" id="our-story">
        <div className="container">
          <div
            ref={missionReveal.ref}
            className={`pro-grid-2 pro-reveal ${
              missionReveal.visible ? 'is-visible' : ''
            }`}
          >
            <div>
              <div className="pro-kicker">
                <span className="pro-kicker-line" />
                Our Mission
              </div>

              <h2 className="pro-section-title">
                Making Career Growth{' '}
                <span className="pro-gradient">Accessible</span> for Everyone
              </h2>

              <p className="pro-copy">
                Placedly was founded with one deeply held belief: exceptional
                careers shouldn&apos;t be a privilege reserved for people with
                the right connections.
              </p>

              <p className="pro-copy">
                We operate on a simple model:{' '}
                <strong>zero upfront, success-share only.</strong> Career
                Assistance Fee of 12% of CTC — collected only after you receive
                your offer letter.
              </p>

              <div style={{ marginTop: 32 }}>
                <MagneticLink href="/contact">
                  Talk to Our Team
                  <ArrowRight size={16} />
                </MagneticLink>
              </div>
            </div>

            <TiltPanel className="pro-visual">
              <div className="pro-img-main">
                <img src="/img/team.png" alt="Placedly team" />
              </div>

              <div className="pro-img-second">
                <img src="/img/aboutt us consultancy.png" alt="Placedly consultancy" />
              </div>

              <div className="pro-badge left">
                <div className="pro-badge-icon" style={{ background: '#eff6ff' }}>
                  <Trophy size={19} color="#2145fb" />
                </div>
                <div>
                  <strong>300+</strong>
                  <span>Careers Transformed</span>
                </div>
              </div>

              <div className="pro-badge right">
                <div className="pro-badge-icon" style={{ background: '#f0fdf4' }}>
                  <Handshake size={19} color="#16a34a" />
                </div>
                <div>
                  <strong>50+</strong>
                  <span>Hiring Partners</span>
                </div>
              </div>
            </TiltPanel>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="inner-section pro-section alt">
        <div className="container">
          <div
            ref={valuesReveal.ref}
            className={`pro-center pro-reveal ${
              valuesReveal.visible ? 'is-visible' : ''
            }`}
          >
            <div className="pro-kicker" style={{ justifyContent: 'center' }}>
              <span className="pro-kicker-line" />
              What We Stand For
            </div>

            <h2 className="pro-section-title">
              The Principles That <span className="pro-gradient">Drive Us</span>
            </h2>

            <p className="pro-copy">
              Clear process, transparent pricing, honest guidance and measurable
              outcomes — that&apos;s how we build careers.
            </p>
          </div>

          <div className="pro-values">
            {values.map((item, index) => (
              <ValueCard key={item.title} item={item} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="inner-section pro-section">
        <div className="container">
          <div
            ref={timelineReveal.ref}
            className={`pro-timeline-wrap pro-reveal ${
              timelineReveal.visible ? 'is-visible' : ''
            }`}
          >
            <div className="pro-sticky">
              <div className="pro-kicker">
                <span className="pro-kicker-line" />
                Our Journey
              </div>

              <h2 className="pro-section-title">
                From Startup to{' '}
                <span className="pro-gradient">300+ Placements</span>
              </h2>

              <p className="pro-copy">
                Every milestone was earned the hard way — one candidate at a
                time, one employer relationship at a time.
              </p>
            </div>

            <div className="pro-timeline">
              {timeline.map((item, index) => (
                <TimelineItem
                  key={`${item.year}-${item.title}`}
                  item={item}
                  index={index}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Founder */}
      <section className="inner-section pro-section alt">
        <div className="container">
          <div
            ref={founderReveal.ref}
            className={`pro-center pro-reveal ${
              founderReveal.visible ? 'is-visible' : ''
            }`}
          >
            <div className="pro-kicker" style={{ justifyContent: 'center' }}>
              <span className="pro-kicker-line" />
              Leadership
            </div>

            <h2 className="pro-section-title">
              The Person Behind <span className="pro-gradient">Placedly</span>
            </h2>
          </div>

          <article
            className={`pro-card pro-founder ${
              founderReveal.visible ? 'is-visible' : ''
            }`}
            onPointerMove={handleCardPointerMove}
          >
            <div className="pro-founder-img">
              <img src="/img/at founder part.png" alt={founder.name} />
            </div>

            <div>
              <h3>{founder.name}</h3>

              <span className="pro-founder-role pro-gradient">
                {founder.role}
              </span>

              <p>{founder.bio}</p>

              <div className="pro-quote">&ldquo;{founder.quote}&rdquo;</div>
            </div>
          </article>
        </div>
      </section>

      {/* CTA */}
      <section className="inner-section pro-cta">
        <div className="container">
          <div className="pro-cta-card">
            <h2>Ready to Write Your Success Story?</h2>

            <p>
              Join 300+ professionals who trusted Placedly to transform their
              career. Zero upfront — you only pay after you&apos;re placed.
            </p>

            <div className="pro-cta-actions">
              <MagneticLink href="/contact" variant="orange">
                <Rocket size={16} />
                Get Placed Now
              </MagneticLink>

              <MagneticLink href="/study-visa" variant="ghost">
                <Plane size={16} />
                Study Abroad
              </MagneticLink>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}