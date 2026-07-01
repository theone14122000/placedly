'use client';

export const dynamic = 'force-dynamic';

import type { Metadata } from 'next';
import { Target, DollarSign, Handshake, Globe, Building2, TrendingUp, Rocket, Plane, Trophy } from 'lucide-react';
import PageLayout from '../components/PageLayout';
import { getCmsMap, parseCmsJson } from '@/lib/cms';
import { useEffect, useRef, useState } from 'react';
import styles from './about.module.css';

export const metadata: Metadata = {
  title: 'About Us — Placedly',
  description: 'Learn about Placedly — Delhi NCR\'s career placement and global education consultancy.',
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const ICON_MAP: Record<string, React.ComponentType<any>> = {
  Target, DollarSign, Handshake, Globe, Building2, TrendingUp
};

const DEFAULT_VALUES = [
  { Icon: Target, color: '#2145fb', bg: '#eff6ff', title: 'Personalised, Always', desc: 'No two careers are the same. Every candidate gets a bespoke roadmap built around their skills, goals, and target industry — not a generic playbook.' },
  { Icon: DollarSign, color: '#16a34a', bg: '#f0fdf4', title: 'Zero Upfront', desc: 'We believe in putting our money where our mouth is. Career Assistance Fee of 12% is charged only after you receive your offer letter. Our success is tied directly to yours.' },
  { Icon: Handshake, color: '#f97316', bg: '#fff7ed', title: 'End-to-End Partnership', desc: 'From CV rebuild to day 90 in your new role — we stay with you through every step, including salary negotiation and joining support.' },
  { Icon: Globe, color: '#0891b2', bg: '#ecfeff', title: 'Global Reach', desc: '140+ university partners across UK, France, Germany, and Dubai. We make international education accessible, transparent, and stress-free.' },
  { Icon: Building2, color: '#7c3aed', bg: '#faf5ff', title: 'Direct Employer Access', desc: 'Our 50+ hiring partner network means your profile goes directly to decision-makers — not into a black-hole job board.' },
  { Icon: TrendingUp, color: '#ef4444', bg: '#fef2f2', title: 'Measurable Outcomes', desc: 'Average 40% salary hike. 300+ careers transformed. First interview call within 1–2 weeks. Results you can count on.' },
];

const DEFAULT_TIMELINE = [
  { year: '2022', title: 'Placedly Founded', desc: 'Started in Delhi NCR with a single mission: make career growth transparent and accessible to every professional.' },
  { year: '2023', title: '100 Placements Milestone', desc: 'Crossed 100 successful placements and launched our flagship Career Assistance Programme (CAP).' },
  { year: '2024', title: 'Study Abroad Division', desc: 'Launched global education services with 140+ university partnerships across UK, France, Germany, and Dubai.' },
  { year: '2025', title: '300+ Careers Transformed', desc: 'Expanded to 50+ hiring partners and achieved an average 40% salary hike for placed professionals.' },
  { year: '2026', title: 'Scaling Pan-India', desc: 'Growing beyond Delhi NCR to serve professionals in Bangalore, Mumbai, Hyderabad, and Chennai.' },
];

const DEFAULT_STATS = [
  { num: '300+', label: 'Professionals Placed' },
  { num: '50+', label: 'Hiring Partners' },
  { num: '40%', label: 'Avg. Salary Hike' },
  { num: '₹0', label: 'Upfront Cost' },
];

type AbCmsData = {
  stats?: Array<{ num?: string; label?: string }>;
  values?: Array<{ icon?: string; title?: string; desc?: string }>;
  timeline?: Array<{ year?: string; title?: string; desc?: string }>;
  founder?: { name?: string; role?: string; bio?: string; quote?: string };
};

// ────────────────────────────────────────────────────────────────
// CSS STYLES (Module)
// ────────────────────────────────────────────────────────────────
const aboutStyles = `
  /* ── 3D & Perspective Effects ── */
  .about-container {
    perspective: 1000px;
  }

  .card-3d {
    transform-style: preserve-3d;
    transition: transform 0.6s cubic-bezier(0.23, 1, 0.320, 1);
  }

  .card-3d:hover {
    transform: rotateY(5deg) rotateX(3deg) translateZ(20px);
  }

  /* ── Shimmer Effects ── */
  @keyframes shimmer {
    0% {
      background-position: -1000px 0;
    }
    100% {
      background-position: 1000px 0;
    }
  }

  @keyframes shimmer-pulse {
    0%, 100% {
      opacity: 1;
    }
    50% {
      opacity: 0.7;
    }
  }

  .shimmer-effect {
    background: linear-gradient(
      90deg,
      rgba(255, 255, 255, 0) 0%,
      rgba(255, 255, 255, 0.2) 20%,
      rgba(255, 255, 255, 0.5) 60%,
      rgba(255, 255, 255, 0)
    );
    background-size: 1000px 100%;
    animation: shimmer 3s infinite;
  }

  .pulse-shimmer {
    animation: shimmer-pulse 2s ease-in-out infinite;
  }

  /* ── Float & Rise Animations ── */
  @keyframes float {
    0%, 100% {
      transform: translateY(0px);
    }
    50% {
      transform: translateY(-20px);
    }
  }

  @keyframes float-delayed {
    0%, 100% {
      transform: translateY(0px);
    }
    50% {
      transform: translateY(-15px);
    }
  }

  .float-animation {
    animation: float 4s ease-in-out infinite;
  }

  .float-delayed {
    animation: float-delayed 4.5s ease-in-out infinite;
  }

  /* ── Glow Effects ── */
  @keyframes glow-pulse {
    0%, 100% {
      box-shadow: 0 0 5px rgba(33, 69, 251, 0.3),
                  0 0 10px rgba(33, 69, 251, 0.1);
    }
    50% {
      box-shadow: 0 0 15px rgba(33, 69, 251, 0.6),
                  0 0 25px rgba(33, 69, 251, 0.3);
    }
  }

  .glow-effect {
    animation: glow-pulse 3s ease-in-out infinite;
  }

  /* ── Gradient Animations ── */
  @keyframes gradient-shift {
    0% {
      background-position: 0% 50%;
    }
    50% {
      background-position: 100% 50%;
    }
    100% {
      background-position: 0% 50%;
    }
  }

  .animated-gradient {
    background-size: 200% 200%;
    animation: gradient-shift 6s ease infinite;
  }

  /* ── Fade In Up Animation ── */
  @keyframes fadeInUp {
    from {
      opacity: 0;
      transform: translateY(30px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  .fade-in-up {
    animation: fadeInUp 0.8s ease-out forwards;
  }

  /* ── Stagger Animation ── */
  .stagger-item {
    animation: fadeInUp 0.8s ease-out forwards;
  }

  .stagger-item:nth-child(1) { animation-delay: 0.1s; }
  .stagger-item:nth-child(2) { animation-delay: 0.2s; }
  .stagger-item:nth-child(3) { animation-delay: 0.3s; }
  .stagger-item:nth-child(4) { animation-delay: 0.4s; }
  .stagger-item:nth-child(5) { animation-delay: 0.5s; }
  .stagger-item:nth-child(6) { animation-delay: 0.6s; }

  /* ── Scale & Bounce Effects ── */
  @keyframes bounce-in {
    0% {
      opacity: 0;
      transform: scale(0.9);
    }
    50% {
      opacity: 1;
    }
    100% {
      opacity: 1;
      transform: scale(1);
    }
  }

  .bounce-in {
    animation: bounce-in 0.6s cubic-bezier(0.34, 1.56, 0.64, 1);
  }

  /* ── Icon Spin Animation ── */
  @keyframes spin-slow {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }

  .icon-spin {
    animation: spin-slow 6s linear infinite;
  }

  .icon-spin:hover {
    animation-duration: 1s;
  }

  /* ── Stats Counter Animation ── */
  @keyframes counter-glow {
    0%, 100% {
      text-shadow: 0 0 5px rgba(33, 69, 251, 0.3);
    }
    50% {
      text-shadow: 0 0 15px rgba(33, 69, 251, 0.6),
                   0 0 25px rgba(33, 69, 251, 0.3);
    }
  }

  .stat-number {
    animation: counter-glow 2s ease-in-out infinite;
  }

  /* ── Line Animation ── */
  @keyframes line-expand {
    from {
      transform: scaleX(0);
      opacity: 0;
    }
    to {
      transform: scaleX(1);
      opacity: 1;
    }
  }

  .line-expand {
    animation: line-expand 0.8s ease-out forwards;
    transform-origin: left;
  }

  /* ── Slide In Animations ── */
  @keyframes slideInLeft {
    from {
      opacity: 0;
      transform: translateX(-50px);
    }
    to {
      opacity: 1;
      transform: translateX(0);
    }
  }

  @keyframes slideInRight {
    from {
      opacity: 0;
      transform: translateX(50px);
    }
    to {
      opacity: 1;
      transform: translateX(0);
    }
  }

  .slide-in-left {
    animation: slideInLeft 0.8s ease-out forwards;
  }

  .slide-in-right {
    animation: slideInRight 0.8s ease-out forwards;
  }

  /* ── Timeline Node Pulse ── */
  @keyframes node-pulse {
    0%, 100% {
      transform: scale(1);
      box-shadow: 0 0 0 0 rgba(33, 69, 251, 0.7);
    }
    50% {
      transform: scale(1.1);
      box-shadow: 0 0 0 8px rgba(33, 69, 251, 0);
    }
  }

  .timeline-node {
    animation: node-pulse 2s ease-in-out infinite;
  }

  /* ── Image Float Effects ── */
  @keyframes image-float {
    0%, 100% {
      transform: translateY(-5px) translateX(0);
    }
    25% {
      transform: translateY(-15px) translateX(2px);
    }
    50% {
      transform: translateY(-5px) translateX(0);
    }
    75% {
      transform: translateY(-15px) translateX(-2px);
    }
  }

  .image-float {
    animation: image-float 5s ease-in-out infinite;
  }

  /* ── Hover Lift Effect ── */
  .hover-lift {
    transition: all 0.4s cubic-bezier(0.23, 1, 0.320, 1);
  }

  .hover-lift:hover {
    transform: translateY(-8px);
    box-shadow: 0 20px 48px rgba(0, 0, 0, 0.15) !important;
  }

  /* ── Glass Morphism ── */
  .glass-effect {
    background: rgba(255, 255, 255, 0.7);
    backdrop-filter: blur(10px);
    border: 1px solid rgba(255, 255, 255, 0.2);
  }

  .glass-effect:hover {
    background: rgba(255, 255, 255, 0.85);
    border-color: rgba(255, 255, 255, 0.3);
  }

  /* ── Gradient Border Animation ── */
  @keyframes gradient-border {
    0% {
      background-position: 0% 50%;
    }
    50% {
      background-position: 100% 50%;
    }
    100% {
      background-position: 0% 50%;
    }
  }

  .gradient-border {
    position: relative;
    background: linear-gradient(white, white) padding-box,
                linear-gradient(90deg, #2145fb, #f97316, #2145fb) border-box;
    border: 2px solid transparent;
    animation: gradient-border 6s ease infinite;
    background-size: 200% 200%;
  }

  /* ── Responsive Adjustments ── */
  @media (max-width: 768px) {
    .card-3d:hover {
      transform: rotateY(0deg) rotateX(0deg) translateZ(10px);
    }

    .float-animation {
      animation: float 4s ease-in-out infinite;
    }
  }
`;

// ────────────────────────────────────────────────────────────────
// Enhanced Component with Animations
// ────────────────────────────────────────────────────────────────

function AnimatedStatCard({ num, label, delay }: { num: string; label: string; delay: number }) {
  return (
    <div
      className="stagger-item card-3d hover-lift"
      style={{
        textAlign: 'center',
        padding: '28px 16px',
        position: 'relative',
        borderRight: '1px solid #eef0f6',
        animationDelay: `${delay}s`
      }}
    >
      <div className="stat-number shimmer-effect" style={{ fontSize: '1.8rem', fontWeight: 900, color: '#0b0d20', lineHeight: 1, marginBottom: '6px', letterSpacing: '-0.5px' }}>
        {num}
      </div>
      <div style={{ fontSize: '12px', color: '#94a3b8', fontWeight: 500 }}>{label}</div>
    </div>
  );
}

function AnimatedValueCard({ v, index }: { v: any; index: number }) {
  return (
    <div
      key={v.title}
      className="stagger-item card-3d hover-lift"
      style={{
        background: '#fff',
        borderRadius: '16px',
        padding: '28px',
        border: '1px solid #eef0f6',
        boxShadow: '0 1px 4px rgba(0,0,0,.04)',
        animationDelay: `${index * 0.1}s`
      }}
    >
      <div
        className="bounce-in"
        style={{
          width: '44px',
          height: '44px',
          borderRadius: '12px',
          background: v.bg,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          marginBottom: '16px',
        }}
      >
        <v.Icon size={20} color={v.color} className="icon-spin" />
      </div>
      <div style={{ fontSize: '15px', fontWeight: 700, color: '#0f172a', marginBottom: '8px' }}>{v.title}</div>
      <div style={{ fontSize: '14px', color: '#64748b', lineHeight: 1.65 }}>{v.desc}</div>
    </div>
  );
}

function AnimatedTimelineItem({ item, i, total }: { item: any; i: number; total: number }) {
  return (
    <div key={item.year} className="stagger-item" style={{ display: 'flex', gap: '20px', alignItems: 'stretch', animationDelay: `${i * 0.1}s` }}>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flexShrink: 0 }}>
        <div
          className="timeline-node"
          style={{
            width: '36px',
            height: '36px',
            borderRadius: '50%',
            background: '#2145fb',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '13px',
            fontWeight: 700,
            color: '#fff',
            border: '3px solid #eff6ff',
            flexShrink: 0,
          }}
        >
          {i + 1}
        </div>
        {i < total - 1 && <div style={{ width: '2px', flex: 1, background: '#eef0f6', marginTop: '4px' }} />}
      </div>
      <div style={{ paddingBottom: i < total - 1 ? '24px' : 0 }}>
        <div style={{ fontSize: '11px', fontWeight: 700, color: '#2145fb', letterSpacing: '0.5px', textTransform: 'uppercase', marginBottom: '3px' }}>{item.year}</div>
        <div style={{ fontSize: '15px', fontWeight: 700, color: '#0f172a', marginBottom: '4px' }}>{item.title}</div>
        <div style={{ fontSize: '14px', color: '#64748b', lineHeight: 1.65 }}>{item.desc}</div>
      </div>
    </div>
  );
}

export default async function AboutUsPage() {
  const cmsMap = await getCmsMap('ab:');
  const abCms = parseCmsJson<AbCmsData>(cmsMap, 'ab:data', {});

  const stats = (abCms.stats && abCms.stats.length > 0)
    ? abCms.stats.map(s => ({ num: s.num ?? '', label: s.label ?? '' }))
    : DEFAULT_STATS;

  const values = (abCms.values && abCms.values.length > 0)
    ? abCms.values.map((v, i) => {
      const def = DEFAULT_VALUES[i] ?? DEFAULT_VALUES[0];
      const IconComp = (v.icon && ICON_MAP[v.icon]) ? ICON_MAP[v.icon] : def.Icon;
      return { Icon: IconComp, color: def.color, bg: def.bg, title: v.title ?? def.title, desc: v.desc ?? def.desc };
    })
    : DEFAULT_VALUES;

  const timeline = (abCms.timeline && abCms.timeline.length > 0)
    ? abCms.timeline.map(t => ({ year: t.year ?? '', title: t.title ?? '', desc: t.desc ?? '' }))
    : DEFAULT_TIMELINE;

  return (
    <PageLayout>
      <style>{aboutStyles}</style>

      {/* ── Hero ── */}
      <section className="inner-section fade-in-up" style={{ padding: 'calc(56px + 68px) 0 0' }}>
        <div className="container">
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', maxWidth: '760px' }}>
            <nav className="slide-in-left" style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', color: '#94a3b8', marginBottom: '24px' }}>
              <a href="/" style={{ color: '#94a3b8', textDecoration: 'none' }}>Home</a>
              <span>›</span>
              <span style={{ color: '#374151' }}>About Us</span>
            </nav>

            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '20px' }}>
              <div className="line-expand" style={{ width: '20px', height: '3px', borderRadius: '999px', background: '#2145fb' }} />
              <span style={{ fontSize: '11px', fontWeight: 700, color: '#2145fb', letterSpacing: '0.8px', textTransform: 'uppercase' }}>Our Story</span>
            </div>

            <h1 className="slide-in-left bounce-in" style={{ fontSize: 'clamp(2.2rem,4.5vw,3.8rem)', fontWeight: 900, color: '#0b0d20', lineHeight: 1.1, letterSpacing: '-1px', marginBottom: '20px', animationDelay: '0.2s' }}>
              We&apos;re Not Just a<br />Placement Agency.<br />
              <span style={{ background: 'linear-gradient(135deg, #f97316 0%, #2145fb 100%)', backgroundClip: 'text', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', animation: 'gradient-shift 6s ease infinite', backgroundSize: '200% 200%' }}>We&apos;re Career Partners.</span>
            </h1>

            <p className="slide-in-right" style={{ fontSize: '16px', color: '#64748b', lineHeight: 1.7, maxWidth: '520px', marginBottom: '32px' }}>
              Born in Delhi NCR. Built for every professional who deserves better — a better role, a better salary, and a career that actually reflects their potential.
            </p>

            <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', marginBottom: '48px' }}>
              <a
                href="/contact"
                className="hover-lift glow-effect"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  background: '#2145fb',
                  color: '#fff',
                  fontWeight: 600,
                  fontSize: '14px',
                  fontFamily: 'Poppins,sans-serif',
                  padding: '13px 28px',
                  borderRadius: '999px',
                  textDecoration: 'none',
                  boxShadow: '0 2px 10px rgba(33,69,251,.25)',
                  transition: 'all 0.4s ease',
                }}
              >
                <Rocket size={15} className="icon-spin" /> Start Your Journey
              </a>
              <a
                href="#our-story"
                className="hover-lift"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  background: 'transparent',
                  color: '#374151',
                  fontWeight: 500,
                  fontSize: '14px',
                  fontFamily: 'Poppins,sans-serif',
                  padding: '13px 28px',
                  borderRadius: '999px',
                  textDecoration: 'none',
                  border: '1.5px solid #e2e8f0',
                  transition: 'all 0.4s ease',
                }}
              >
                Read Our Story ↓
              </a>
            </div>
          </div>

          {/* Stats strip */}
          <div className="ab-stats-4" style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', borderTop: '1px solid #eef0f6' }}>
            {stats.map((s, i) => (
              <AnimatedStatCard key={s.num} num={s.num} label={s.label} delay={i * 0.1} />
            ))}
          </div>
        </div>
      </section>

      {/* ── Mission ── */}
      <section className="inner-section" style={{ padding: '80px 0' }} id="our-story">
        <div className="container">
          <div className="ab-two-col" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '64px', alignItems: 'center' }}>
            <div className="slide-in-left">
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', fontSize: '11px', fontWeight: 700, color: '#2145fb', letterSpacing: '0.8px', textTransform: 'uppercase', marginBottom: '16px' }}>
                <div className="line-expand" style={{ width: '20px', height: '3px', borderRadius: '999px', background: '#2145fb' }} />
                Our Mission
              </div>
              <h2 style={{ fontSize: 'clamp(1.8rem,3vw,2.6rem)', fontWeight: 900, color: '#0b0d20', lineHeight: 1.15, letterSpacing: '-0.6px', marginBottom: '20px' }}>
                Making Career Growth <span style={{ color: '#2145fb' }}>Accessible</span> for Everyone
              </h2>
              <p style={{ fontSize: '15px', color: '#64748b', lineHeight: 1.75, marginBottom: '16px' }}>
                Placedly was founded with one deeply held belief: exceptional careers shouldn&apos;t be a privilege reserved for people with the right connections. Every professional deserves expert guidance, real employer access, and a fair shot at the role they want.
              </p>
              <p style={{ fontSize: '15px', color: '#374151', lineHeight: 1.75, marginBottom: '32px' }}>
                We operate on a simple model: <strong>zero upfront, success-share only.</strong> Career Assistance Fee of 12% of CTC — collected only after you receive your offer letter. If we don&apos;t place you, you don&apos;t pay.
              </p>
              <a
                href="/contact"
                className="hover-lift glow-effect"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  background: '#2145fb',
                  color: '#fff',
                  fontWeight: 600,
                  fontSize: '14px',
                  fontFamily: 'Poppins,sans-serif',
                  padding: '13px 28px',
                  borderRadius: '999px',
                  textDecoration: 'none',
                  transition: 'all 0.4s ease',
                }}
              >
                Talk to Our Team →
              </a>
            </div>

            <div className="ab-mission-img slide-in-right" style={{ position: 'relative', height: '480px', perspective: '1000px' }}>
              <div className="image-float" style={{ position: 'absolute', top: 0, left: 0, width: '72%', height: '300px', borderRadius: '20px', overflow: 'hidden', boxShadow: '0 20px 48px rgba(0,0,0,.12)' }}>
                <img src="/img/team.png" alt="Placedly Team" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>
              <div className="image-float" style={{ position: 'absolute', bottom: 0, right: 0, width: '60%', height: '240px', borderRadius: '20px', overflow: 'hidden', boxShadow: '0 20px 48px rgba(0,0,0,.12)', border: '4px solid #fff', animationDelay: '0.2s' }}>
                <img src="/img/aboutt us consultancy.png" alt="Consultancy" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>

              <div className="float-animation hover-lift" style={{ position: 'absolute', bottom: '155px', left: '-16px', background: '#fff', borderRadius: '14px', boxShadow: '0 8px 28px rgba(0,0,0,.10)', padding: '14px 18px', display: 'flex', alignItems: 'center', gap: '12px', border: '1px solid #eef0f6' }}>
                <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: '#eff6ff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Trophy size={18} color="#2145fb" className="icon-spin" />
                </div>
                <div>
                  <div className="stat-number" style={{ fontSize: '18px', fontWeight: 900, color: '#0b0d20', lineHeight: 1 }}>300+</div>
                  <div style={{ fontSize: '11px', color: '#94a3b8', marginTop: '2px' }}>Careers Transformed</div>
                </div>
              </div>

              <div className="float-delayed hover-lift" style={{ position: 'absolute', top: '50px', right: '-16px', background: '#fff', borderRadius: '14px', boxShadow: '0 8px 28px rgba(0,0,0,.10)', padding: '14px 18px', display: 'flex', alignItems: 'center', gap: '12px', border: '1px solid #eef0f6' }}>
                <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: '#f0fdf4', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Handshake size={18} color="#16a34a" className="icon-spin" />
                </div>
                <div>
                  <div className="stat-number" style={{ fontSize: '18px', fontWeight: 900, color: '#0b0d20', lineHeight: 1 }}>50+</div>
                  <div style={{ fontSize: '11px', color: '#94a3b8', marginTop: '2px' }}>Hiring Partners</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Values ── */}
      <section className="inner-section alt" style={{ padding: '80px 0' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '48px' }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', fontSize: '11px', fontWeight: 700, color: '#2145fb', letterSpacing: '0.8px', textTransform: 'uppercase', marginBottom: '16px' }}>
              <div className="line-expand" style={{ width: '20px', height: '3px', borderRadius: '999px', background: '#2145fb' }} />
              What We Stand For
            </div>
            <h2 className="bounce-in" style={{ fontSize: 'clamp(1.8rem,3vw,2.6rem)', fontWeight: 900, color: '#0b0d20', lineHeight: 1.15, letterSpacing: '-0.6px' }}>
              The Principles That <span style={{ color: '#2145fb' }}>Drive Us</span>
            </h2>
          </div>
          <div className="ab-values-3" style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '20px' }}>
            {values.map((v, i) => (
              <AnimatedValueCard key={v.title} v={v} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* ── Timeline ── */}
      <section className="inner-section" style={{ padding: '80px 0' }}>
        <div className="container">
          <div className="ab-two-col" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '80px', alignItems: 'start' }}>
            <div className="slide-in-left">
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', fontSize: '11px', fontWeight: 700, color: '#2145fb', letterSpacing: '0.8px', textTransform: 'uppercase', marginBottom: '16px' }}>
                <div className="line-expand" style={{ width: '20px', height: '3px', borderRadius: '999px', background: '#2145fb' }} />
                Our Journey
              </div>
              <h2 style={{ fontSize: 'clamp(1.8rem,3vw,2.6rem)', fontWeight: 900, color: '#0b0d20', lineHeight: 1.15, letterSpacing: '-0.6px', marginBottom: '16px' }}>
                From Startup to <span style={{ color: '#2145fb' }}>300+ Placements</span>
              </h2>
              <p style={{ fontSize: '15px', color: '#64748b', lineHeight: 1.75 }}>
                Every milestone was earned the hard way — one candidate at a time, one employer relationship at a time.
              </p>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              {timeline.map((item, i) => (
                <AnimatedTimelineItem key={item.year} item={item} i={i} total={timeline.length} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Leadership ── */}
      <section className="inner-section alt" style={{ padding: '80px 0' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '48px' }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', fontSize: '11px', fontWeight: 700, color: '#2145fb', letterSpacing: '0.8px', textTransform: 'uppercase', marginBottom: '16px' }}>
              <div className="line-expand" style={{ width: '20px', height: '3px', borderRadius: '999px', background: '#2145fb' }} />
              Leadership
            </div>
            <h2 className="bounce-in" style={{ fontSize: 'clamp(1.8rem,3vw,2.6rem)', fontWeight: 900, color: '#0b0d20', lineHeight: 1.15, letterSpacing: '-0.6px' }}>The Person Behind Placedly</h2>
          </div>
          <div className="ab-founder-card card-3d hover-lift" style={{ background: '#fff', border: '1px solid #eef0f6', borderRadius: '24px', padding: '48px', boxShadow: '0 2px 8px rgba(0,0,0,.04)', display: 'flex', gap: '48px', alignItems: 'flex-start', maxWidth: '860px', margin: '0 auto' }}>
            <div className="image-float" style={{ width: '180px', height: '220px', borderRadius: '18px', overflow: 'hidden', flexShrink: 0, boxShadow: '0 8px 24px rgba(0,0,0,.10)' }}>
              <img src="/img/at founder part.png" alt="Founder" style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center top' }} />
            </div>
            <div className="slide-in-right">
              <div style={{ fontSize: '22px', fontWeight: 800, color: '#0b0d20', marginBottom: '4px' }}>Our Founder</div>
              <div style={{ fontSize: '14px', color: '#2145fb', fontWeight: 600, marginBottom: '20px' }}>Founder &amp; CEO, Placedly</div>
              <p style={{ fontSize: '15px', color: '#64748b', lineHeight: 1.75, marginBottom: '24px' }}>
                With a deep background in talent acquisition and career consulting across Delhi NCR&apos;s top MNCs, our founder built Placedly with a frustration-turned-mission: too many talented professionals were being left behind by a system that favoured connections over competence.
              </p>
              <div className="glass-effect" style={{ borderLeft: '3px solid #2145fb', padding: '16px 20px', borderRadius: '0 12px 12px 0', fontSize: '14px', color: '#374151', fontStyle: 'italic', lineHeight: 1.7 }}>
                &ldquo;Your next job shouldn&apos;t depend on who you know. It should depend on how well we prepare you.&rdquo;
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="inner-section fade-in-up" style={{ padding: '80px 0' }}>
        <div className="container">
          <div className="page-dark-cta card-3d hover-lift animated-gradient" style={{ background: 'linear-gradient(-45deg, #0b0d20, #1a1d2e, #0b0d20, #1a1d2e)', borderRadius: '24px', padding: '72px 64px', textAlign: 'center', boxShadow: '0 20px 50px rgba(33, 69, 251, 0.15)' }}>
            <h2 className="bounce-in" style={{ fontSize: 'clamp(1.6rem,3vw,2.4rem)', fontWeight: 900, color: '#ffffff', lineHeight: 1.2, letterSpacing: '-0.5px', marginBottom: '12px' }}>Ready to Write Your Success Story?</h2>
            <p className="fade-in-up" style={{ fontSize: '15px', color: 'rgba(255,255,255,.6)', marginBottom: '32px', maxWidth: '480px', margin: '0 auto 32px', animationDelay: '0.2s' }}>Join 300+ professionals who trusted Placedly to transform their career. Zero upfront — you only pay after you&apos;re placed.</p>
            <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
              <a
                href="/contact"
                className="hover-lift glow-effect"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  background: '#f97316',
                  color: '#fff',
                  fontWeight: 700,
                  fontSize: '14px',
                  fontFamily: 'Poppins,sans-serif',
                  padding: '14px 32px',
                  borderRadius: '999px',
                  textDecoration: 'none',
                  boxShadow: '0 4px 16px rgba(249,115,22,.35)',
                  transition: 'all 0.4s ease',
                }}
              >
                <Rocket size={15} className="icon-spin" /> Get Placed Now
              </a>
              <a
                href="/study-visa"
                className="hover-lift"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  background: 'transparent',
                  color: '#fff',
                  fontWeight: 500,
                  fontSize: '14px',
                  fontFamily: 'Poppins,sans-serif',
                  padding: '14px 32px',
                  borderRadius: '999px',
                  textDecoration: 'none',
                  border: '1.5px solid rgba(255,255,255,.25)',
                  transition: 'all 0.4s ease',
                }}
              >
                <Plane size={15} /> Study Abroad
              </a>
            </div>
          </div>
        </div>
      </section>
    </PageLayout>
  );
}