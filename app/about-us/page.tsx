'use client';

import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import {
  Target, DollarSign, Handshake, Globe, Building2, TrendingUp,
  Rocket, Plane, Trophy, Sparkles, ArrowRight, Moon, Sun
} from 'lucide-react';
import PageLayout from '../components/PageLayout';
import { getCmsMap, parseCmsJson } from '@/lib/cms';

// ──────────────────────────────────────────────────────────────
// CUSTOM HOOKS
// ──────────────────────────────────────────────────────────────

function useMousePosition() {
  const [pos, setPos] = useState({ x: 0, y: 0 });
  useEffect(() => {
    const handler = (e: MouseEvent) => setPos({ x: e.clientX, y: e.clientY });
    window.addEventListener('mousemove', handler, { passive: true });
    return () => window.removeEventListener('mousemove', handler);
  }, []);
  return pos;
}

function useScrollProgress() {
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    const handler = () => {
      const h = document.documentElement;
      const p = (h.scrollTop || document.body.scrollTop) / ((h.scrollHeight || document.body.scrollHeight) - h.clientHeight);
      setProgress(Math.min(1, Math.max(0, p)));
    };
    window.addEventListener('scroll', handler, { passive: true });
    handler();
    return () => window.removeEventListener('scroll', handler);
  }, []);
  return progress;
}

function useInView(threshold = 0.1) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold });
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, visible };
}

function useTheme() {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const stored = typeof window !== 'undefined' ? localStorage.getItem('placedly-theme') : null;
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    setTheme(stored === 'dark' || (!stored && prefersDark) ? 'dark' : 'light');
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('placedly-theme', theme);
  }, [theme, mounted]);

  return { theme, toggle: () => setTheme(t => t === 'light' ? 'dark' : 'light'), mounted };
}

// ──────────────────────────────────────────────────────────────
// DATA DEFAULTS
// ──────────────────────────────────────────────────────────────

const ICON_MAP: Record<string, React.ComponentType<any>> = { Target, DollarSign, Handshake, Globe, Building2, TrendingUp };

const DEFAULT_VALUES = [
  { Icon: Target, color: '#2145fb', bg: 'linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%)', title: 'Personalised, Always', desc: 'No two careers are the same. Every candidate gets a bespoke roadmap built around their skills, goals, and target industry.' },
  { Icon: DollarSign, color: '#16a34a', bg: 'linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%)', title: 'Zero Upfront', desc: 'We believe in putting our money where our mouth is. 12% fee charged only after you receive your offer letter.' },
  { Icon: Handshake, color: '#f97316', bg: 'linear-gradient(135deg, #fff7ed 0%, #ffedd5 100%)', title: 'End-to-End Partnership', desc: 'From CV rebuild to day 90 in your new role — we stay with you through every step, including salary negotiation.' },
  { Icon: Globe, color: '#0891b2', bg: 'linear-gradient(135deg, #ecfeff 0%, #cffafe 100%)', title: 'Global Reach', desc: '140+ university partners across UK, France, Germany, and Dubai. International education made stress-free.' },
  { Icon: Building2, color: '#7c3aed', bg: 'linear-gradient(135deg, #faf5ff 0%, #f3e8ff 100%)', title: 'Direct Employer Access', desc: '50+ hiring partners means your profile goes directly to decision-makers — not into a black-hole job board.' },
  { Icon: TrendingUp, color: '#ef4444', bg: 'linear-gradient(135deg, #fef2f2 0%, #fee2e2 100%)', title: 'Measurable Outcomes', desc: 'Average 40% salary hike. 300+ careers transformed. First interview call within 1–2 weeks.' },
];

const DEFAULT_TIMELINE = [
  { year: '2022', title: 'Placedly Founded', desc: 'Started in Delhi NCR with a single mission: make career growth transparent and accessible.' },
  { year: '2023', title: '100 Placements Milestone', desc: 'Crossed 100 successful placements and launched our flagship Career Assistance Programme.' },
  { year: '2024', title: 'Study Abroad Division', desc: 'Launched global education services with 140+ university partnerships worldwide.' },
  { year: '2025', title: '300+ Careers Transformed', desc: 'Expanded to 50+ hiring partners and achieved an average 40% salary hike.' },
  { year: '2026', title: 'Scaling Pan-India', desc: 'Growing beyond Delhi NCR to serve professionals in Bangalore, Mumbai, Hyderabad, and Chennai.' },
];

const DEFAULT_STATS = [
  { num: '300+', label: 'Professionals Placed' },
  { num: '50+', label: 'Hiring Partners' },
  { num: '40%', label: 'Avg. Salary Hike' },
  { num: '₹0', label: 'Upfront Cost' },
];

// ──────────────────────────────────────────────────────────────
// MAIN COMPONENT
// ──────────────────────────────────────────────────────────────

export default function AboutUsPage() {
  // In production, move CMS fetching to a Server Component and pass as props
  const [stats] = useState(DEFAULT_STATS);
  const [values] = useState(DEFAULT_VALUES);
  const [timeline] = useState(DEFAULT_TIMELINE);

  const { theme, toggle, mounted } = useTheme();
  const scrollProgress = useScrollProgress();
  const mouse = useMousePosition();

  // Dynamic heading gradient based on scroll + theme
  const headingGradient = useMemo(() => {
    const isDark = theme === 'dark';
    const shift = scrollProgress * 40;
    return isDark
      ? `linear-gradient(${135 + shift}deg, #60a5fa, #c084fc, #fb923c)`
      : `linear-gradient(${135 + shift}deg, #2145fb, #6366f1, #f97316)`;
  }, [theme, scrollProgress]);

  const sectionRef1 = useInView(0.1);
  const sectionRef2 = useInView(0.15);
  const sectionRef3 = useInView(0.1);
  const sectionRef4 = useInView(0.15);

  // 3D Tilt helper
  const getTilt = (ref: React.RefObject<HTMLDivElement | null>) => {
    if (!ref.current) return { rx: 0, ry: 0 };
    const rect = ref.current.getBoundingClientRect();
    const x = (mouse.x - rect.left - rect.width / 2) / 25;
    const y = (mouse.y - rect.top - rect.height / 2) / 25;
    return { rx: -y, ry: x };
  };

  const missionRef = useRef<HTMLDivElement>(null);
  const founderRef = useRef<HTMLDivElement>(null);

  return (
    <PageLayout>
      {/* ──────────────────────────────────────────────────────
         GLOBAL STYLES & VARIABLES
         ────────────────────────────────────────────────────── */}
      <style>{`
        :root {
          --bg: #ffffff;
          --bg-alt: #f8fafc;
          --text: #0f172a;
          --text-muted: #64748b;
          --card: #ffffff;
          --border: #e2e8f0;
          --primary: #2145fb;
          --accent: #f97316;
          --shadow: rgba(0,0,0,0.04);
          --shadow-hover: rgba(33,69,251,0.12);
          --glass: rgba(255,255,255,0.6);
          transition: background 0.4s ease, color 0.3s ease, border-color 0.3s ease;
        }
        [data-theme="dark"] {
          --bg: #0b1120;
          --bg-alt: #111827;
          --text: #f8fafc;
          --text-muted: #94a3b8;
          --card: #1e293b;
          --border: #334155;
          --primary: #60a5fa;
          --accent: #fb923c;
          --shadow: rgba(0,0,0,0.3);
          --shadow-hover: rgba(96,165,250,0.15);
          --glass: rgba(15,23,42,0.7);
        }
        body { background: var(--bg); color: var(--text); }
        
        /* Noise overlay for premium feel */
        .ab-noise {
          position: fixed; inset: 0; pointer-events: none; z-index: 9999;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.03'/%3E%3C/svg%3E");
          opacity: 0.4; mix-blend-mode: overlay;
        }

        /* Mesh gradient background */
        .ab-mesh-bg {
          position: fixed; inset: 0; z-index: -1; pointer-events: none;
          background: 
            radial-gradient(circle at 20% 30%, rgba(var(--mesh-c1, 33,69,251), 0.08) 0%, transparent 40%),
            radial-gradient(circle at 80% 70%, rgba(var(--mesh-c2, 249,115,22), 0.06) 0%, transparent 40%),
            radial-gradient(circle at 50% 50%, rgba(var(--mesh-c3, 99,102,241), 0.04) 0%, transparent 50%);
          animation: ab-mesh-drift 20s ease-in-out infinite alternate;
        }
        @keyframes ab-mesh-drift {
          0% { transform: scale(1) translate(0,0); }
          100% { transform: scale(1.1) translate(-20px, 15px); }
        }

        /* Dynamic heading text */
        .ab-dynamic-heading {
          background: var(--heading-grad, linear-gradient(135deg, var(--primary), var(--accent)));
          -webkit-background-clip: text; background-clip: text;
          -webkit-text-fill-color: transparent;
          background-size: 200% 200%;
          animation: ab-grad-shift 8s ease infinite;
          transition: background 0.6s ease;
        }
        @keyframes ab-grad-shift {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }

        /* Magnetic button */
        .ab-btn-magnetic {
          display: inline-flex; align-items: center; gap: 8px;
          padding: 14px 28px; border-radius: 999px; font-weight: 600; font-size: 14px;
          cursor: pointer; position: relative; overflow: hidden;
          transition: transform 0.3s cubic-bezier(0.4,0,0.2,1), box-shadow 0.3s ease;
          will-change: transform;
        }
        .ab-btn-magnetic::before {
          content: ''; position: absolute; inset: 0;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent);
          background-size: 200% 100%; animation: ab-shimmer 3s infinite;
        }
        .ab-btn-primary {
          background: linear-gradient(135deg, var(--primary), color-mix(in srgb, var(--primary) 80%, black));
          color: #fff; box-shadow: 0 4px 20px rgba(var(--primary-rgb, 33,69,251), 0.3);
        }
        .ab-btn-secondary {
          background: transparent; color: var(--text); border: 1.5px solid var(--border);
        }
        .ab-btn-secondary:hover { border-color: var(--primary); color: var(--primary); }

        /* 3D Card Tilt */
        .ab-tilt-card {
          background: var(--card); border: 1px solid var(--border); border-radius: 20px;
          padding: 28px; box-shadow: 0 4px 16px var(--shadow);
          transition: transform 0.4s cubic-bezier(0.4,0,0.2,1), box-shadow 0.4s ease;
          transform-style: preserve-3d; will-change: transform;
        }
        .ab-tilt-card:hover { box-shadow: 0 16px 32px var(--shadow-hover); }

        /* Shimmer sweep */
        .ab-shimmer-sweep {
          position: relative; overflow: hidden;
        }
        .ab-shimmer-sweep::after {
          content: ''; position: absolute; top: 0; left: -150%; width: 60%; height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent);
          transition: left 0.8s ease;
        }
        .ab-shimmer-sweep:hover::after { left: 150%; }

        /* Reveal animations */
        .ab-reveal {
          opacity: 0; transform: translateY(30px);
          transition: opacity 0.7s cubic-bezier(0.4,0,0.2,1), transform 0.7s cubic-bezier(0.4,0,0.2,1);
        }
        .ab-reveal.visible { opacity: 1; transform: translateY(0); }
        .ab-reveal.delay-1 { transition-delay: 0.1s; }
        .ab-reveal.delay-2 { transition-delay: 0.2s; }
        .ab-reveal.delay-3 { transition-delay: 0.3s; }
        .ab-reveal.delay-4 { transition-delay: 0.4s; }

        /* Theme toggle */
        .ab-theme-toggle {
          position: fixed; top: 100px; right: 20px; z-index: 1000;
          background: var(--card); border: 1px solid var(--border); border-radius: 999px;
          padding: 10px 14px; cursor: pointer; display: flex; align-items: center; gap: 8px;
          box-shadow: 0 4px 16px var(--shadow); transition: all 0.3s ease; color: var(--text);
        }
        .ab-theme-toggle:hover { transform: scale(1.05); box-shadow: 0 8px 24px var(--shadow-hover); }

        /* Marquee */
        .ab-marquee { overflow: hidden; padding: 16px 0; background: var(--bg-alt); border-top: 1px solid var(--border); border-bottom: 1px solid var(--border); }
        .ab-marquee-track { display: flex; animation: ab-marquee-left 30s linear infinite; width: max-content; }
        .ab-marquee-item { padding: 0 32px; font-size: 13px; font-weight: 600; color: var(--text-muted); white-space: nowrap; display: flex; align-items: center; gap: 8px; }
        .ab-marquee-dot { width: 5px; height: 5px; border-radius: 50%; background: var(--primary); opacity: 0.5; }
        @keyframes ab-marquee-left { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }

        /* Responsive */
        @media (max-width: 1024px) {
          .ab-grid-2 { grid-template-columns: 1fr !important; }
          .ab-grid-3 { grid-template-columns: repeat(2, 1fr) !important; }
          .ab-grid-4 { grid-template-columns: repeat(2, 1fr) !important; }
        }
        @media (max-width: 640px) {
          .ab-grid-3, .ab-grid-4 { grid-template-columns: 1fr !important; }
          .ab-hero-h1 { font-size: 2.2rem !important; letter-spacing: -0.5px !important; }
          .ab-theme-toggle { top: 80px; right: 10px; padding: 8px; }
        }

        /* Reduced motion */
        @media (prefers-reduced-motion: reduce) {
          *, *::before, *::after { animation-duration: 0.01ms !important; animation-iteration-count: 1 !important; transition-duration: 0.01ms !important; scroll-behavior: auto !important; }
        }
      `}</style>

      {/* Background layers */}
      <div className="ab-noise" />
      <div className="ab-mesh-bg" style={{ '--mesh-c1': theme === 'dark' ? '96,165,250' : '33,69,251', '--mesh-c2': theme === 'dark' ? '251,146,60' : '249,115,22', '--mesh-c3': theme === 'dark' ? '168,85,247' : '99,102,241' } as React.CSSProperties} />

      {/* Theme Toggle */}
      {mounted && (
        <button className="ab-theme-toggle" onClick={toggle} aria-label="Toggle theme">
          {theme === 'light' ? <Moon size={16} /> : <Sun size={16} />}
          <span style={{ fontSize: 12, fontWeight: 600 }}>{theme === 'light' ? 'Dark' : 'Light'}</span>
        </button>
      )}

      {/* ──────────────────────────────────────────────────────
         HERO
         ────────────────────────────────────────────────────── */}
      <section className="inner-section" style={{ padding: 'calc(56px + 68px) 0 0', position: 'relative' }}>
        <div className="container">
          <div style={{ maxWidth: 760 }}>
            <nav className="ab-reveal" style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, color: 'var(--text-muted)', marginBottom: 24 }}>
              <a href="/" style={{ color: 'var(--text-muted)', textDecoration: 'none' }}>Home</a>
              <span>›</span>
              <span style={{ color: 'var(--text)' }}>About Us</span>
            </nav>
            <div className="ab-reveal delay-1" style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 20 }}>
              <div style={{ width: 24, height: 3, borderRadius: 999, background: 'var(--primary)', position: 'relative', overflow: 'hidden' }}>
                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.6), transparent)', backgroundSize: '200% 100%', animation: 'ab-shimmer 2s infinite' }} />
              </div>
              <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: 1.2, textTransform: 'uppercase', color: 'var(--primary)' }}>
                <Sparkles size={12} style={{ display: 'inline', verticalAlign: 'middle', marginRight: 4 }} /> Our Story
              </span>
            </div>
            <h1 className="ab-hero-h1 ab-reveal delay-2" style={{ fontSize: 'clamp(2.4rem, 4.5vw, 4rem)', fontWeight: 900, color: 'var(--text)', lineHeight: 1.08, letterSpacing: '-1.5px', marginBottom: 20 }}>
              <span style={{ display: 'block' }}>We&apos;re Not Just a</span>
              <span style={{ display: 'block' }}>Placement Agency.</span>
              <span className="ab-dynamic-heading" style={{ '--heading-grad': headingGradient } as React.CSSProperties}>We&apos;re Career Partners.</span>
            </h1>
            <p className="ab-reveal delay-3" style={{ fontSize: 16, color: 'var(--text-muted)', lineHeight: 1.75, maxWidth: 520, marginBottom: 32 }}>
              Born in Delhi NCR. Built for every professional who deserves better — a better role, a better salary, and a career that actually reflects their potential.
            </p>
            <div className="ab-reveal delay-4" style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginBottom: 48 }}>
              <a href="/contact" className="ab-btn-magnetic ab-btn-primary">
                <Rocket size={15} /> Start Your Journey
              </a>
              <a href="#our-story" className="ab-btn-magnetic ab-btn-secondary">
                Read Our Story ↓
              </a>
            </div>
          </div>

          {/* Stats */}
          <div className="ab-grid-4" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16, marginTop: 16 }}>
            {stats.map((s, i) => (
              <div key={s.num} className="ab-tilt-card ab-shimmer-sweep ab-reveal" style={{ textAlign: 'center', padding: '28px 16px', animationDelay: `${0.5 + i * 0.1}s` }}>
                <div style={{ fontSize: '1.9rem', fontWeight: 900, background: `linear-gradient(135deg, var(--text), var(--primary))`, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', lineHeight: 1, marginBottom: 6, letterSpacing: '-0.5px' }}>{s.num}</div>
                <div style={{ fontSize: 12, color: 'var(--text-muted)', fontWeight: 500 }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ──────────────────────────────────────────────────────
         MARQUEE
         ────────────────────────────────────────────────────── */}
      <div className="ab-marquee">
        <div className="ab-marquee-track">
          {['Career Assistance Programme', 'Zero Upfront Fee', '12% Success Share', '300+ Careers Transformed', '50+ Hiring Partners', '140+ Universities', 'Study Abroad Services', 'Average 40% Salary Hike', 'Career Assistance Programme', 'Zero Upfront Fee', '12% Success Share', '300+ Careers Transformed', '50+ Hiring Partners', '140+ Universities', 'Study Abroad Services', 'Average 40% Salary Hike'].map((t, i) => (
            <div key={i} className="ab-marquee-item"><div className="ab-marquee-dot" />{t}</div>
          ))}
        </div>
      </div>

      {/* ──────────────────────────────────────────────────────
         MISSION
         ────────────────────────────────────────────────────── */}
      <section className="inner-section" style={{ padding: '100px 0' }} id="our-story" ref={sectionRef1.ref}>
        <div className="container">
          <div className={`ab-grid-2 ab-reveal ${sectionRef1.visible ? 'visible' : ''}`} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 64, alignItems: 'center' }}>
            <div>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: 10, fontSize: 11, fontWeight: 700, letterSpacing: 1.2, textTransform: 'uppercase', marginBottom: 16, color: 'var(--primary)' }}>
                <div style={{ width: 24, height: 3, borderRadius: 999, background: 'var(--primary)', position: 'relative', overflow: 'hidden' }}>
                  <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.6), transparent)', backgroundSize: '200% 100%', animation: 'ab-shimmer 2.5s infinite' }} />
                </div>
                Our Mission
              </div>
              <h2 style={{ fontSize: 'clamp(1.8rem, 3vw, 2.6rem)', fontWeight: 900, color: 'var(--text)', lineHeight: 1.15, letterSpacing: '-0.6px', marginBottom: 20 }}>
                Making Career Growth <span className="ab-dynamic-heading" style={{ '--heading-grad': headingGradient } as React.CSSProperties }>Accessible</span> for Everyone
              </h2>
              <p style={{ fontSize: 15, color: 'var(--text-muted)', lineHeight: 1.75, marginBottom: 16 }}>
                Placedly was founded with one deeply held belief: exceptional careers shouldn&apos;t be a privilege reserved for people with the right connections. Every professional deserves expert guidance, real employer access, and a fair shot at the role they want.
              </p>
              <p style={{ fontSize: 15, color: 'var(--text)', lineHeight: 1.75, marginBottom: 32 }}>
                We operate on a simple model: <strong>zero upfront, success-share only.</strong> Career Assistance Fee of 12% of CTC — collected only after you receive your offer letter. If we don&apos;t place you, you don&apos;t pay.
              </p>
              <a href="/contact" className="ab-btn-magnetic ab-btn-primary">
                Talk to Our Team <ArrowRight size={15} />
              </a>
            </div>
            <div ref={missionRef} className="ab-reveal delay-2" style={{ position: 'relative', height: 480, perspective: 1200 }}>
              <div style={{ position: 'absolute', top: 0, left: 0, width: '72%', height: 300, borderRadius: 24, overflow: 'hidden', boxShadow: '0 24px 56px var(--shadow)', transform: `rotateX(${getTilt(missionRef).rx}deg) rotateY(${getTilt(missionRef).ry}deg)`, transition: 'transform 0.1s ease-out' }}>
                <img src="/img/team.png" alt="Placedly Team" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>
              <div style={{ position: 'absolute', bottom: 0, right: 0, width: '60%', height: 240, borderRadius: 24, overflow: 'hidden', boxShadow: '0 24px 56px var(--shadow)', border: '5px solid var(--bg)', transform: `rotateX(${getTilt(missionRef).rx * 0.8}deg) rotateY(${getTilt(missionRef).ry * 0.8}deg)`, transition: 'transform 0.1s ease-out' }}>
                <img src="/img/aboutt us consultancy.png" alt="Consultancy" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>
              {/* Floating Badges */}
              {[
                { pos: { bottom: 165, left: -24 }, icon: <Trophy size={18} color="#2145fb" />, num: '300+', label: 'Careers Transformed', bg: '#eff6ff' },
                { pos: { top: 50, right: -24 }, icon: <Handshake size={18} color="#16a34a" />, num: '50+', label: 'Hiring Partners', bg: '#f0fdf4' }
              ].map((b, i) => (
                <div key={i} className="ab-tilt-card ab-shimmer-sweep" style={{ position: 'absolute', ...b.pos, background: 'var(--glass)', backdropFilter: 'blur(12px)', border: '1px solid var(--border)', padding: '14px 18px', display: 'flex', alignItems: 'center', gap: 12, borderRadius: 16, boxShadow: '0 8px 24px var(--shadow)', animation: `ab-float-slow ${4 + i}s ease-in-out infinite`, animationDelay: `${i * 0.5}s` }}>
                  <div style={{ width: 40, height: 40, borderRadius: 10, background: b.bg, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{b.icon}</div>
                  <div>
                    <div style={{ fontSize: 18, fontWeight: 900, color: 'var(--text)', lineHeight: 1 }}>{b.num}</div>
                    <div style={{ fontSize: 11, color: 'var(--text-muted)', marginTop: 2 }}>{b.label}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ──────────────────────────────────────────────────────
         VALUES
         ────────────────────────────────────────────────────── */}
      <section className="inner-section" style={{ padding: '100px 0', background: 'var(--bg-alt)' }} ref={sectionRef2.ref}>
        <div className="container">
          <div className={`ab-reveal ${sectionRef2.visible ? 'visible' : ''}`} style={{ textAlign: 'center', marginBottom: 56 }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 10, fontSize: 11, fontWeight: 700, letterSpacing: 1.2, textTransform: 'uppercase', marginBottom: 16, color: 'var(--primary)' }}>
              <div style={{ width: 24, height: 3, borderRadius: 999, background: 'var(--primary)', position: 'relative', overflow: 'hidden' }}>
                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.6), transparent)', backgroundSize: '200% 100%', animation: 'ab-shimmer 2.5s infinite' }} />
              </div>
              What We Stand For
            </div>
            <h2 style={{ fontSize: 'clamp(1.8rem, 3vw, 2.6rem)', fontWeight: 900, color: 'var(--text)', lineHeight: 1.15, letterSpacing: '-0.6px' }}>
              The Principles That <span className="ab-dynamic-heading" style={{ '--heading-grad': headingGradient } as React.CSSProperties }>Drive Us</span>
            </h2>
          </div>
          <div className="ab-grid-3" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24 }}>
            {values.map((v, i) => (
              <div key={v.title} className={`ab-tilt-card ab-shimmer-sweep ab-reveal delay-${(i % 4) + 1}`} style={{ background: 'var(--card)', padding: 32 }}>
                <div style={{ width: 52, height: 52, borderRadius: 14, background: v.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 18, transition: 'transform 0.4s ease' }}>
                  <v.Icon size={22} color={v.color} />
                </div>
                <div style={{ fontSize: 16, fontWeight: 700, color: 'var(--text)', marginBottom: 8 }}>{v.title}</div>
                <div style={{ fontSize: 14, color: 'var(--text-muted)', lineHeight: 1.7 }}>{v.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ──────────────────────────────────────────────────────
         TIMELINE
         ────────────────────────────────────────────────────── */}
      <section className="inner-section" style={{ padding: '100px 0' }} ref={sectionRef3.ref}>
        <div className="container">
          <div className={`ab-grid-2 ab-reveal ${sectionRef3.visible ? 'visible' : ''}`} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 80, alignItems: 'start' }}>
            <div style={{ position: 'sticky', top: 120 }}>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: 10, fontSize: 11, fontWeight: 700, letterSpacing: 1.2, textTransform: 'uppercase', marginBottom: 16, color: 'var(--primary)' }}>
                <div style={{ width: 24, height: 3, borderRadius: 999, background: 'var(--primary)', position: 'relative', overflow: 'hidden' }}>
                  <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.6), transparent)', backgroundSize: '200% 100%', animation: 'ab-shimmer 2.5s infinite' }} />
                </div>
                Our Journey
              </div>
              <h2 style={{ fontSize: 'clamp(1.8rem, 3vw, 2.6rem)', fontWeight: 900, color: 'var(--text)', lineHeight: 1.15, letterSpacing: '-0.6px', marginBottom: 16 }}>
                From Startup to <span className="ab-dynamic-heading" style={{ '--heading-grad': headingGradient } as React.CSSProperties }>300+ Placements</span>
              </h2>
              <p style={{ fontSize: 15, color: 'var(--text-muted)', lineHeight: 1.75 }}>
                Every milestone was earned the hard way — one candidate at a time, one employer relationship at a time.
              </p>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              {timeline.map((item, i) => (
                <div key={item.year} className={`ab-reveal delay-${(i % 4) + 1}`} style={{ display: 'flex', gap: 24, alignItems: 'stretch', marginBottom: i < timeline.length - 1 ? 28 : 0 }}>
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flexShrink: 0 }}>
                    <div style={{ width: 40, height: 40, borderRadius: '50%', background: 'linear-gradient(135deg, var(--primary), #6366f1)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13, fontWeight: 700, color: '#fff', border: '4px solid var(--bg)', boxShadow: '0 4px 16px rgba(var(--primary-rgb, 33,69,251), 0.25)', transition: 'transform 0.3s ease' }}>
                      {i + 1}
                    </div>
                    {i < timeline.length - 1 && <div style={{ width: 2, flex: 1, marginTop: 6, background: 'linear-gradient(180deg, var(--primary), var(--border))', opacity: 0.4 }} />}
                  </div>
                  <div>
                    <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: 0.8, textTransform: 'uppercase', marginBottom: 4, color: 'var(--primary)' }}>{item.year}</div>
                    <div style={{ fontSize: 16, fontWeight: 700, color: 'var(--text)', marginBottom: 4 }}>{item.title}</div>
                    <div style={{ fontSize: 14, color: 'var(--text-muted)', lineHeight: 1.7 }}>{item.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ──────────────────────────────────────────────────────
         LEADERSHIP
         ────────────────────────────────────────────────────── */}
      <section className="inner-section" style={{ padding: '100px 0', background: 'var(--bg-alt)' }} ref={sectionRef4.ref}>
        <div className="container">
          <div className={`ab-reveal ${sectionRef4.visible ? 'visible' : ''}`} style={{ textAlign: 'center', marginBottom: 48 }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 10, fontSize: 11, fontWeight: 700, letterSpacing: 1.2, textTransform: 'uppercase', marginBottom: 16, color: 'var(--primary)' }}>
              <div style={{ width: 24, height: 3, borderRadius: 999, background: 'var(--primary)', position: 'relative', overflow: 'hidden' }}>
                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.6), transparent)', backgroundSize: '200% 100%', animation: 'ab-shimmer 2.5s infinite' }} />
              </div>
              Leadership
            </div>
            <h2 style={{ fontSize: 'clamp(1.8rem, 3vw, 2.6rem)', fontWeight: 900, color: 'var(--text)', lineHeight: 1.15, letterSpacing: '-0.6px' }}>
              The Person Behind <span className="ab-dynamic-heading" style={{ '--heading-grad': headingGradient } as React.CSSProperties }>Placedly</span>
            </h2>
          </div>
          <div ref={founderRef} className={`ab-tilt-card ab-reveal delay-2 ${sectionRef4.visible ? 'visible' : ''}`} style={{ background: 'var(--card)', border: '1px solid var(--border)', borderRadius: 28, padding: 52, display: 'flex', gap: 52, alignItems: 'flex-start', maxWidth: 880, margin: '0 auto', transformStyle: 'preserve-3d', boxShadow: '0 8px 32px var(--shadow)' }}>
            <div style={{ width: 190, height: 230, borderRadius: 20, overflow: 'hidden', flexShrink: 0, boxShadow: '0 12px 32px var(--shadow)', transition: 'transform 0.5s ease' }}>
              <img src="/img/at founder part.png" alt="Founder" style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center top' }} />
            </div>
            <div>
              <div style={{ fontSize: 24, fontWeight: 800, color: 'var(--text)', marginBottom: 4 }}>Our Founder</div>
              <div className="ab-dynamic-heading" style={{ fontSize: 14, fontWeight: 600, marginBottom: 20, '--heading-grad': headingGradient } as React.CSSProperties }>Founder &amp; CEO, Placedly</div>
              <p style={{ fontSize: 15, color: 'var(--text-muted)', lineHeight: 1.75, marginBottom: 24 }}>
                With a deep background in talent acquisition and career consulting across Delhi NCR&apos;s top MNCs, our founder built Placedly with a frustration-turned-mission: too many talented professionals were being left behind by a system that favoured connections over competence.
              </p>
              <div style={{ background: 'var(--bg-alt)', borderLeft: '4px solid var(--primary)', padding: '20px 24px', borderRadius: '0 14px 14px 0', fontSize: 14, color: 'var(--text)', fontStyle: 'italic', lineHeight: 1.75, position: 'relative' }}>
                <span style={{ position: 'absolute', top: 8, left: 12, fontSize: 40, color: 'var(--primary)', opacity: 0.15, fontWeight: 900, lineHeight: 1 }}>&ldquo;</span>
                &ldquo;Your next job shouldn&apos;t depend on who you know. It should depend on how well we prepare you.&rdquo;
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ──────────────────────────────────────────────────────
         CTA
         ────────────────────────────────────────────────────── */}
      <section className="inner-section" style={{ padding: '80px 0' }}>
        <div className="container">
          <div className="ab-reveal" style={{ background: 'linear-gradient(135deg, #0b0d20 0%, #131640 50%, #0b0d20 100%)', borderRadius: 28, padding: '80px 64px', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
            {/* Animated orbs */}
            <div style={{ position: 'absolute', top: -80, right: -80, width: 200, height: 200, borderRadius: '50%', background: 'radial-gradient(circle, rgba(33,69,251,0.2), transparent)', animation: 'ab-float 8s ease-in-out infinite' }} />
            <div style={{ position: 'absolute', bottom: -60, left: -60, width: 160, height: 160, borderRadius: '50%', background: 'radial-gradient(circle, rgba(249,115,22,0.15), transparent)', animation: 'ab-float 10s ease-in-out infinite reverse' }} />
            
            <h2 style={{ fontSize: 'clamp(1.8rem, 3vw, 2.8rem)', fontWeight: 900, color: '#fff', lineHeight: 1.2, letterSpacing: '-0.5px', marginBottom: 16, position: 'relative', zIndex: 2 }}>
              Ready to Write Your Success Story?
            </h2>
            <p style={{ fontSize: 15, color: 'rgba(255,255,255,0.6)', marginBottom: 36, maxWidth: 500, margin: '0 auto 36px', lineHeight: 1.7, position: 'relative', zIndex: 2 }}>
              Join 300+ professionals who trusted Placedly to transform their career. Zero upfront — you only pay after you&apos;re placed.
            </p>
            <div style={{ display: 'flex', gap: 14, justifyContent: 'center', flexWrap: 'wrap', position: 'relative', zIndex: 2 }}>
              <a href="/contact" className="ab-btn-magnetic" style={{ background: 'linear-gradient(135deg, #f97316, #fb923c)', color: '#fff', fontWeight: 700, boxShadow: '0 6px 24px rgba(249,115,22,0.4)' }}>
                <Rocket size={15} /> Get Placed Now
              </a>
              <a href="/study-visa" className="ab-btn-magnetic" style={{ background: 'rgba(255,255,255,0.05)', color: '#fff', border: '1.5px solid rgba(255,255,255,0.2)', backdropFilter: 'blur(10px)' }}>
                <Plane size={15} /> Study Abroad
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ──────────────────────────────────────────────────────
         FLOAT ANIMATION KEYFRAME (injected once)
         ────────────────────────────────────────────────────── */}
      <style>{`
        @keyframes ab-float-slow {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-8px); }
        }
        @keyframes ab-float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-12px) rotate(2deg); }
        }
      `}</style>
    </PageLayout>
  );
}