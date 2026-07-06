export const dynamic = 'force-dynamic';

import type { Metadata } from 'next';
import {
  Target, DollarSign, Handshake, Globe,
  Building2, TrendingUp, Rocket, Plane, Trophy,
  ArrowRight, CheckCircle2,
} from 'lucide-react';
import PageLayout from '../components/PageLayout';
import { getCmsMap, parseCmsJson } from '@/lib/cms';

export const metadata: Metadata = {
  title: 'About Us — Placedly',
  description: "Learn about Placedly — Delhi NCR's career placement and global education consultancy.",
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const ICON_MAP: Record<string, React.ComponentType<any>> = {
  Target, DollarSign, Handshake, Globe, Building2, TrendingUp,
};

/* ── Design tokens ── */
const ORANGE        = '#f97316';
const ORANGE_DARK   = '#ea580c';
const ORANGE_SOFT   = 'rgba(249,115,22,0.08)';
const ORANGE_BORDER = 'rgba(249,115,22,0.22)';
const BLACK         = '#0b0d20';
const BODY          = '#374151';
const MUTED         = '#64748b';
const BORDER        = '#e5e7eb';
const SURFACE       = '#ffffff';
const BG_ALT        = '#f9fafb';
const FONT          = `'Inter','Manrope','Geist','Plus Jakarta Sans',system-ui,sans-serif`;

const DEFAULT_VALUES = [
  { Icon: Target,     title: 'Personalised, Always',    desc: 'No two careers are the same. Every candidate gets a bespoke roadmap built around their skills, goals, and target industry — not a generic playbook.' },
  { Icon: DollarSign, title: 'Zero Upfront',            desc: 'Career Assistance Fee of 12% is charged only after you receive your offer letter. Our success is tied directly to yours.' },
  { Icon: Handshake,  title: 'End-to-End Partnership',  desc: 'From CV rebuild to day 90 in your new role — we stay with you through every step, including salary negotiation and joining support.' },
  { Icon: Globe,      title: 'Global Reach',            desc: '140+ university partners across UK, France, Germany, and Dubai. We make international education accessible, transparent, and stress-free.' },
  { Icon: Building2,  title: 'Direct Employer Access',  desc: 'Our 50+ hiring partner network means your profile goes directly to decision-makers — not into a black-hole job board.' },
  { Icon: TrendingUp, title: 'Measurable Outcomes',     desc: 'Average 40% salary hike. 300+ careers transformed. First interview call within 1–2 weeks. Results you can count on.' },
];

const DEFAULT_TIMELINE = [
  { year: '2022', title: 'Placedly Founded',         desc: 'Started in Delhi NCR with a single mission: make career growth transparent and accessible to every professional.' },
  { year: '2023', title: '100 Placements Milestone', desc: 'Crossed 100 successful placements and launched our flagship Career Assistance Programme (CAP).' },
  { year: '2024', title: 'Study Abroad Division',    desc: 'Launched global education services with 140+ university partnerships across UK, France, Germany, and Dubai.' },
  { year: '2025', title: '300+ Careers Transformed', desc: 'Expanded to 50+ hiring partners and achieved an average 40% salary hike for placed professionals.' },
  { year: '2026', title: 'Scaling Pan-India',        desc: 'Growing beyond Delhi NCR to serve professionals in Bangalore, Mumbai, Hyderabad, and Chennai.' },
];

const DEFAULT_STATS = [
  { num: '300+', label: 'Professionals Placed' },
  { num: '50+',  label: 'Hiring Partners'      },
  { num: '40%',  label: 'Avg. Salary Hike'     },
  { num: '₹0',   label: 'Upfront Cost'         },
];

type AbCmsData = {
  stats?:    Array<{ num?: string; label?: string }>;
  values?:   Array<{ icon?: string; title?: string; desc?: string }>;
  timeline?: Array<{ year?: string; title?: string; desc?: string }>;
  founder?:  { name?: string; role?: string; bio?: string; quote?: string };
};

export default async function AboutUsPage() {
  const cmsMap = await getCmsMap('ab:');
  const abCms  = parseCmsJson<AbCmsData>(cmsMap, 'ab:data', {});

  const stats = (abCms.stats && abCms.stats.length > 0)
    ? abCms.stats.map(s => ({ num: s.num ?? '', label: s.label ?? '' }))
    : DEFAULT_STATS;

  const values = (abCms.values && abCms.values.length > 0)
    ? abCms.values.map((v, i) => {
        const def     = DEFAULT_VALUES[i] ?? DEFAULT_VALUES[0];
        const IconComp = (v.icon && ICON_MAP[v.icon]) ? ICON_MAP[v.icon] : def.Icon;
        return { Icon: IconComp, title: v.title ?? def.title, desc: v.desc ?? def.desc };
      })
    : DEFAULT_VALUES;

  const timeline = (abCms.timeline && abCms.timeline.length > 0)
    ? abCms.timeline.map(t => ({ year: t.year ?? '', title: t.title ?? '', desc: t.desc ?? '' }))
    : DEFAULT_TIMELINE;

  return (
    <PageLayout>

      {/* ════════════════════════════════════════════
          GLOBAL STYLES + ANIMATIONS
      ════════════════════════════════════════════ */}
      <style>{`
        /* ── Font ── */
        .ab-page, .ab-page * {
          font-family: ${FONT};
          box-sizing: border-box;
        }

        /* ── Keyframes ── */
        @keyframes ab-fade-up {
          from { opacity: 0; transform: translateY(24px); }
          to   { opacity: 1; transform: translateY(0);    }
        }
        @keyframes ab-fade-in {
          from { opacity: 0; }
          to   { opacity: 1; }
        }
        @keyframes ab-slide-right {
          from { opacity: 0; transform: translateX(-20px); }
          to   { opacity: 1; transform: translateX(0);     }
        }
        @keyframes ab-scale-in {
          from { opacity: 0; transform: scale(0.92); }
          to   { opacity: 1; transform: scale(1);    }
        }
        @keyframes ab-shimmer {
          0%   { background-position: -400px 0; }
          100% { background-position:  400px 0; }
        }
        @keyframes ab-float {
          0%, 100% { transform: translateY(0);   }
          50%       { transform: translateY(-8px); }
        }
        @keyframes ab-pulse-ring {
          0%   { box-shadow: 0 0 0 0 rgba(249,115,22,0.4); }
          70%  { box-shadow: 0 0 0 8px rgba(249,115,22,0);  }
          100% { box-shadow: 0 0 0 0 rgba(249,115,22,0);    }
        }
        @keyframes ab-line-grow {
          from { height: 0; }
          to   { height: 100%; }
        }

        /* ── Animation utility classes ── */
        .ab-anim-fade-up   { animation: ab-fade-up    0.55s cubic-bezier(0.22,1,0.36,1) both; }
        .ab-anim-fade-in   { animation: ab-fade-in    0.45s ease both; }
        .ab-anim-scale-in  { animation: ab-scale-in   0.5s  cubic-bezier(0.22,1,0.36,1) both; }
        .ab-anim-slide-r   { animation: ab-slide-right 0.5s cubic-bezier(0.22,1,0.36,1) both; }

        /* stagger helpers */
        .ab-d0  { animation-delay: 0s;    }
        .ab-d1  { animation-delay: 0.08s; }
        .ab-d2  { animation-delay: 0.16s; }
        .ab-d3  { animation-delay: 0.24s; }
        .ab-d4  { animation-delay: 0.32s; }
        .ab-d5  { animation-delay: 0.40s; }

        /* ── Scroll-triggered via IntersectionObserver class ── */
        .ab-reveal {
          opacity: 0;
          transform: translateY(24px);
          transition: opacity 0.55s cubic-bezier(0.22,1,0.36,1),
                      transform 0.55s cubic-bezier(0.22,1,0.36,1);
        }
        .ab-reveal.is-visible {
          opacity: 1;
          transform: translateY(0);
        }
        .ab-reveal-scale {
          opacity: 0;
          transform: scale(0.94);
          transition: opacity 0.5s cubic-bezier(0.22,1,0.36,1),
                      transform 0.5s cubic-bezier(0.22,1,0.36,1);
        }
        .ab-reveal-scale.is-visible {
          opacity: 1;
          transform: scale(1);
        }

        /* ── Eyebrow pill ── */
        .ab-eyebrow {
          display: inline-flex;
          align-items: center;
          gap: 7px;
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: ${ORANGE};
          background: ${ORANGE_SOFT};
          border: 1px solid ${ORANGE_BORDER};
          border-radius: 999px;
          padding: 5px 13px;
          width: fit-content;
          margin-bottom: 16px;
        }
        .ab-eyebrow-dot {
          width: 6px; height: 6px;
          border-radius: 50%;
          background: ${ORANGE};
          animation: ab-pulse-ring 2.4s ease-out infinite;
        }

        /* ── Buttons ── */
        .ab-btn-primary {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: ${ORANGE};
          color: #fff;
          font-weight: 700;
          font-size: 14px;
          padding: 13px 28px;
          border-radius: 999px;
          text-decoration: none;
          border: 1px solid ${ORANGE_DARK};
          box-shadow: 0 4px 14px rgba(249,115,22,0.28);
          transition: transform 0.2s ease, box-shadow 0.2s ease, filter 0.2s ease;
        }
        .ab-btn-primary:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 22px rgba(249,115,22,0.36);
          filter: brightness(1.06);
        }
        .ab-btn-primary:active { transform: translateY(0); filter: brightness(0.96); }

        .ab-btn-ghost {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: transparent;
          color: ${BLACK};
          font-weight: 600;
          font-size: 14px;
          padding: 13px 28px;
          border-radius: 999px;
          text-decoration: none;
          border: 1.5px solid ${BORDER};
          transition: border-color 0.2s ease, color 0.2s ease, background 0.2s ease;
        }
        .ab-btn-ghost:hover {
          border-color: ${ORANGE};
          color: ${ORANGE};
          background: ${ORANGE_SOFT};
        }

        .ab-btn-cta-ghost {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: transparent;
          color: #fff;
          font-weight: 600;
          font-size: 14px;
          padding: 14px 32px;
          border-radius: 999px;
          text-decoration: none;
          border: 1.5px solid rgba(255,255,255,0.30);
          transition: border-color 0.2s ease, background 0.2s ease;
        }
        .ab-btn-cta-ghost:hover {
          border-color: rgba(255,255,255,0.60);
          background: rgba(255,255,255,0.07);
        }

        /* ── Section headings ── */
        .ab-h1 {
          font-size: clamp(2.2rem,4.5vw,3.8rem);
          font-weight: 900;
          color: ${BLACK};
          line-height: 1.1;
          letter-spacing: -0.03em;
          margin: 0 0 20px;
        }
        .ab-h2 {
          font-size: clamp(1.8rem,3vw,2.6rem);
          font-weight: 900;
          color: ${BLACK};
          line-height: 1.15;
          letter-spacing: -0.025em;
          margin: 0 0 20px;
        }
        .ab-accent { color: ${ORANGE}; }

        /* ── Stats strip ── */
        .ab-stats-4 {
          display: grid;
          grid-template-columns: repeat(4,1fr);
          border-top: 1px solid ${BORDER};
        }
        .ab-stat-cell {
          text-align: center;
          padding: 28px 16px;
          position: relative;
          border-right: 1px solid ${BORDER};
          cursor: default;
          transition: background 0.2s ease;
        }
        .ab-stat-cell:last-child { border-right: none; }
        .ab-stat-cell:hover { background: ${ORANGE_SOFT}; }
        .ab-stat-num {
          font-size: clamp(1.5rem,2.5vw,1.9rem);
          font-weight: 900;
          color: ${BLACK};
          line-height: 1;
          margin-bottom: 6px;
          letter-spacing: -0.03em;
          transition: color 0.2s ease;
        }
        .ab-stat-cell:hover .ab-stat-num { color: ${ORANGE}; }
        .ab-stat-label {
          font-size: 12px;
          color: ${MUTED};
          font-weight: 500;
        }

        /* ── Values cards ── */
        .ab-values-3 {
          display: grid;
          grid-template-columns: repeat(3,1fr);
          gap: 20px;
        }
        .ab-value-card {
          background: ${SURFACE};
          border-radius: 16px;
          padding: 28px;
          border: 1px solid ${BORDER};
          box-shadow: 0 1px 4px rgba(0,0,0,0.04);
          transition: transform 0.25s cubic-bezier(0.22,1,0.36,1),
                      box-shadow 0.25s ease,
                      border-color 0.25s ease;
          cursor: default;
        }
        .ab-value-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 12px 32px rgba(249,115,22,0.12);
          border-color: ${ORANGE_BORDER};
        }
        .ab-value-icon {
          width: 44px; height: 44px;
          border-radius: 12px;
          background: ${ORANGE_SOFT};
          border: 1px solid ${ORANGE_BORDER};
          display: flex; align-items: center; justify-content: center;
          margin-bottom: 16px;
          transition: background 0.2s ease, transform 0.25s cubic-bezier(0.22,1,0.36,1);
        }
        .ab-value-card:hover .ab-value-icon {
          background: rgba(249,115,22,0.14);
          transform: scale(1.08) rotate(-3deg);
        }
        .ab-value-title {
          font-size: 15px; font-weight: 700;
          color: ${BLACK}; margin-bottom: 8px;
        }
        .ab-value-desc {
          font-size: 14px; color: ${MUTED}; line-height: 1.65;
        }

        /* ── Timeline ── */
        .ab-timeline-item {
          display: flex;
          gap: 20px;
          align-items: stretch;
          cursor: default;
        }
        .ab-timeline-dot-col {
          display: flex; flex-direction: column;
          align-items: center; flex-shrink: 0;
        }
        .ab-timeline-dot {
          width: 36px; height: 36px;
          border-radius: 50%;
          background: ${ORANGE};
          display: flex; align-items: center; justify-content: center;
          font-size: 13px; font-weight: 700; color: #fff;
          border: 3px solid rgba(249,115,22,0.15);
          flex-shrink: 0;
          transition: transform 0.25s cubic-bezier(0.22,1,0.36,1),
                      box-shadow 0.25s ease;
        }
        .ab-timeline-item:hover .ab-timeline-dot {
          transform: scale(1.15);
          box-shadow: 0 0 0 6px rgba(249,115,22,0.12);
        }
        .ab-timeline-line {
          width: 2px; flex: 1;
          background: ${BORDER};
          margin-top: 4px;
          position: relative;
          overflow: hidden;
        }
        .ab-timeline-line::after {
          content: '';
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 0;
          background: ${ORANGE};
          transition: height 0.6s ease;
        }
        .ab-timeline-item:hover + .ab-timeline-item .ab-timeline-line::after,
        .ab-timeline-item:hover .ab-timeline-line::after {
          height: 100%;
        }
        .ab-timeline-body { padding-bottom: 24px; }
        .ab-timeline-year {
          font-size: 11px; font-weight: 700;
          color: ${ORANGE}; letter-spacing: 0.06em;
          text-transform: uppercase; margin-bottom: 3px;
        }
        .ab-timeline-title {
          font-size: 15px; font-weight: 700;
          color: ${BLACK}; margin-bottom: 4px;
        }
        .ab-timeline-desc {
          font-size: 14px; color: ${MUTED}; line-height: 1.65;
        }

        /* ── Floating chips on mission image ── */
        .ab-float-chip {
          position: absolute;
          background: ${SURFACE};
          border-radius: 14px;
          box-shadow: 0 8px 28px rgba(0,0,0,0.10);
          padding: 14px 18px;
          display: flex; align-items: center; gap: 12px;
          border: 1px solid ${BORDER};
          animation: ab-float 4s ease-in-out infinite;
        }
        .ab-float-chip-icon {
          width: 40px; height: 40px;
          border-radius: 10px;
          background: ${ORANGE_SOFT};
          border: 1px solid ${ORANGE_BORDER};
          display: flex; align-items: center; justify-content: center;
        }
        .ab-float-chip-num {
          font-size: 18px; font-weight: 900;
          color: ${BLACK}; line-height: 1;
        }
        .ab-float-chip-label {
          font-size: 11px; color: ${MUTED}; margin-top: 2px;
        }

        /* ── Founder card ── */
        .ab-founder-card {
          background: ${SURFACE};
          border: 1px solid ${BORDER};
          border-radius: 24px;
          padding: 48px;
          box-shadow: 0 2px 8px rgba(0,0,0,0.04);
          display: flex; gap: 48px; align-items: flex-start;
          max-width: 860px; margin: 0 auto;
          transition: box-shadow 0.3s ease, border-color 0.3s ease;
        }
        .ab-founder-card:hover {
          box-shadow: 0 16px 40px rgba(249,115,22,0.10);
          border-color: ${ORANGE_BORDER};
        }
        .ab-founder-quote {
          background: ${ORANGE_SOFT};
          border-left: 3px solid ${ORANGE};
          padding: 16px 20px;
          border-radius: 0 12px 12px 0;
          font-size: 14px;
          color: ${BODY};
          font-style: italic;
          line-height: 1.7;
        }

        /* ── CTA dark section ── */
        .ab-cta-dark {
          background: ${BLACK};
          border-radius: 24px;
          padding: 72px 64px;
          text-align: center;
          position: relative;
          overflow: hidden;
        }
        .ab-cta-dark::before {
          content: '';
          position: absolute;
          top: -60px; left: 50%;
          transform: translateX(-50%);
          width: 400px; height: 200px;
          background: radial-gradient(ellipse, rgba(249,115,22,0.18) 0%, transparent 70%);
          pointer-events: none;
        }
        .ab-cta-dark::after {
          content: '';
          position: absolute;
          bottom: -40px; right: -40px;
          width: 200px; height: 200px;
          background: radial-gradient(circle, rgba(249,115,22,0.10) 0%, transparent 70%);
          pointer-events: none;
        }

        /* ── Breadcrumb ── */
        .ab-breadcrumb {
          display: flex; align-items: center; gap: 8px;
          font-size: 13px; color: ${MUTED}; margin-bottom: 24px;
        }
        .ab-breadcrumb a {
          color: ${MUTED}; text-decoration: none;
          transition: color 0.18s;
        }
        .ab-breadcrumb a:hover { color: ${ORANGE}; }
        .ab-breadcrumb-current { color: ${BODY}; font-weight: 500; }

        /* ── Section label (line + text) ── */
        .ab-section-label {
          display: inline-flex; align-items: center; gap: 8px;
          font-size: 11px; font-weight: 700; color: ${ORANGE};
          letter-spacing: 0.1em; text-transform: uppercase;
          margin-bottom: 16px;
        }
        .ab-section-label-bar {
          width: 20px; height: 3px;
          border-radius: 999px; background: ${ORANGE};
        }

        /* ── Responsive ── */
        @media (max-width: 900px) {
          .ab-stats-4  { grid-template-columns: repeat(2,1fr); }
          .ab-values-3 { grid-template-columns: repeat(2,1fr); }
          .ab-two-col  { grid-template-columns: 1fr !important; }
          .ab-founder-card { flex-direction: column; padding: 28px; gap: 24px; }
          .ab-cta-dark { padding: 48px 24px; }
          .ab-mission-img { height: 340px !important; }
        }
        @media (max-width: 600px) {
          .ab-stats-4  { grid-template-columns: repeat(2,1fr); }
          .ab-values-3 { grid-template-columns: 1fr; }
          .ab-stat-cell { padding: 20px 12px; }
          .ab-cta-dark  { border-radius: 16px; }
        }
      `}</style>

      {/* Scroll-reveal script */}
      <script dangerouslySetInnerHTML={{ __html: `
        (function(){
          function init(){
            var els = document.querySelectorAll('.ab-reveal, .ab-reveal-scale');
            if(!els.length) return;
            var io = new IntersectionObserver(function(entries){
              entries.forEach(function(e){
                if(e.isIntersecting){
                  e.target.classList.add('is-visible');
                  io.unobserve(e.target);
                }
              });
            },{ threshold: 0.12, rootMargin: '-30px' });
            els.forEach(function(el){ io.observe(el); });
          }
          if(document.readyState === 'loading'){
            document.addEventListener('DOMContentLoaded', init);
          } else { init(); }
        })();
      `}} />

      <div className="ab-page">

        {/* ════════════════════════════════════════════
            HERO
        ════════════════════════════════════════════ */}
        <section className="inner-section" style={{ padding: 'calc(56px + 68px) 0 0' }}>
          <div className="container">
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', maxWidth: '760px' }}>

              <nav className="ab-breadcrumb ab-anim-fade-in ab-d0">
                <a href="/">Home</a>
                <span>›</span>
                <span className="ab-breadcrumb-current">About Us</span>
              </nav>

              <span className="ab-eyebrow ab-anim-fade-up ab-d1">
                <span className="ab-eyebrow-dot" />
                Our Story
              </span>

              <h1 className="ab-h1 ab-anim-fade-up ab-d2">
                We&apos;re Not Just a<br />
                Placement Agency.<br />
                <span className="ab-accent">We&apos;re Career Partners.</span>
              </h1>

              <p className="ab-anim-fade-up ab-d3" style={{ fontSize: '16px', color: MUTED, lineHeight: 1.7, maxWidth: '520px', marginBottom: '32px' }}>
                Born in Delhi NCR. Built for every professional who deserves better — a better role, a better salary, and a career that actually reflects their potential.
              </p>

              <div className="ab-anim-fade-up ab-d4" style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', marginBottom: '48px' }}>
                <a href="/contact" className="ab-btn-primary">
                  <Rocket size={15} /> Start Your Journey
                </a>
                <a href="#our-story" className="ab-btn-ghost">
                  Read Our Story ↓
                </a>
              </div>
            </div>

            {/* Stats strip */}
            <div className="ab-stats-4">
              {stats.map((s, i) => (
                <div key={s.num} className={`ab-stat-cell ab-reveal ab-d${i}`}>
                  <div className="ab-stat-num">{s.num}</div>
                  <div className="ab-stat-label">{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ════════════════════════════════════════════
            MISSION
        ════════════════════════════════════════════ */}
        <section className="inner-section" style={{ padding: '80px 0' }} id="our-story">
          <div className="container">
            <div className="ab-two-col" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '64px', alignItems: 'center' }}>

              <div className="ab-reveal">
                <span className="ab-section-label">
                  <span className="ab-section-label-bar" />
                  Our Mission
                </span>
                <h2 className="ab-h2">
                  Making Career Growth{' '}
                  <span className="ab-accent">Accessible</span>{' '}
                  for Everyone
                </h2>
                <p style={{ fontSize: '15px', color: MUTED, lineHeight: 1.75, marginBottom: '16px' }}>
                  Placedly was founded with one deeply held belief: exceptional careers shouldn&apos;t be a privilege reserved for people with the right connections. Every professional deserves expert guidance, real employer access, and a fair shot at the role they want.
                </p>
                <p style={{ fontSize: '15px', color: BODY, lineHeight: 1.75, marginBottom: '32px' }}>
                  We operate on a simple model:{' '}
                  <strong style={{ color: BLACK }}>zero upfront, success-share only.</strong>{' '}
                  Career Assistance Fee of 12% of CTC — collected only after you receive your offer letter.
                </p>
                <a href="/contact" className="ab-btn-primary">
                  Talk to Our Team <ArrowRight size={14} strokeWidth={2.5} />
                </a>
              </div>

              <div className="ab-mission-img ab-reveal-scale" style={{ position: 'relative', height: '480px' }}>
                <div style={{ position: 'absolute', top: 0, left: 0, width: '72%', height: '300px', borderRadius: '20px', overflow: 'hidden', boxShadow: '0 20px 48px rgba(0,0,0,0.12)' }}>
                  <img src="/img/team.png" alt="Placedly Team" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
                <div style={{ position: 'absolute', bottom: 0, right: 0, width: '60%', height: '240px', borderRadius: '20px', overflow: 'hidden', boxShadow: '0 20px 48px rgba(0,0,0,0.12)', border: '4px solid #fff' }}>
                  <img src="/img/aboutt us consultancy.png" alt="Consultancy" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>

                {/* Floating chip — left */}
                <div className="ab-float-chip" style={{ bottom: '155px', left: '-16px', animationDelay: '0s' }}>
                  <div className="ab-float-chip-icon">
                    <Trophy size={18} color={ORANGE} />
                  </div>
                  <div>
                    <div className="ab-float-chip-num">300+</div>
                    <div className="ab-float-chip-label">Careers Transformed</div>
                  </div>
                </div>

                {/* Floating chip — right */}
                <div className="ab-float-chip" style={{ top: '50px', right: '-16px', animationDelay: '1.2s' }}>
                  <div className="ab-float-chip-icon">
                    <Handshake size={18} color={ORANGE} />
                  </div>
                  <div>
                    <div className="ab-float-chip-num">50+</div>
                    <div className="ab-float-chip-label">Hiring Partners</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ════════════════════════════════════════════
            VALUES
        ════════════════════════════════════════════ */}
        <section className="inner-section alt" style={{ padding: '80px 0', background: BG_ALT }}>
          <div className="container">
            <div className="ab-reveal" style={{ textAlign: 'center', marginBottom: '48px' }}>
              <span className="ab-eyebrow" style={{ margin: '0 auto 16px' }}>
                <span className="ab-eyebrow-dot" />
                What We Stand For
              </span>
              <h2 className="ab-h2">
                The Principles That{' '}
                <span className="ab-accent">Drive Us</span>
              </h2>
            </div>

            <div className="ab-values-3">
              {values.map((v, i) => (
                <div key={v.title} className={`ab-value-card ab-reveal ab-d${Math.min(i, 5)}`}>
                  <div className="ab-value-icon">
                    <v.Icon size={20} color={ORANGE} />
                  </div>
                  <div className="ab-value-title">{v.title}</div>
                  <div className="ab-value-desc">{v.desc}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ════════════════════════════════════════════
            TIMELINE
        ════════════════════════════════════════════ */}
        <section className="inner-section" style={{ padding: '80px 0' }}>
          <div className="container">
            <div className="ab-two-col" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '80px', alignItems: 'start' }}>

              <div className="ab-reveal">
                <span className="ab-section-label">
                  <span className="ab-section-label-bar" />
                  Our Journey
                </span>
                <h2 className="ab-h2">
                  From Startup to{' '}
                  <span className="ab-accent">300+ Placements</span>
                </h2>
                <p style={{ fontSize: '15px', color: MUTED, lineHeight: 1.75 }}>
                  Every milestone was earned the hard way — one candidate at a time, one employer relationship at a time.
                </p>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column' }}>
                {timeline.map((item, i) => (
                  <div key={item.year} className={`ab-timeline-item ab-reveal ab-d${Math.min(i, 5)}`}>
                    <div className="ab-timeline-dot-col">
                      <div className="ab-timeline-dot">{i + 1}</div>
                      {i < timeline.length - 1 && (
                        <div className="ab-timeline-line" />
                      )}
                    </div>
                    <div className="ab-timeline-body">
                      <div className="ab-timeline-year">{item.year}</div>
                      <div className="ab-timeline-title">{item.title}</div>
                      <div className="ab-timeline-desc">{item.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ════════════════════════════════════════════
            LEADERSHIP
        ════════════════════════════════════════════ */}
        <section className="inner-section alt" style={{ padding: '80px 0', background: BG_ALT }}>
          <div className="container">
            <div className="ab-reveal" style={{ textAlign: 'center', marginBottom: '48px' }}>
              <span className="ab-eyebrow" style={{ margin: '0 auto 16px' }}>
                <span className="ab-eyebrow-dot" />
                Leadership
              </span>
              <h2 className="ab-h2">The Person Behind Placedly</h2>
            </div>

            <div className="ab-founder-card ab-reveal-scale">
              <div style={{ width: '180px', height: '220px', borderRadius: '18px', overflow: 'hidden', flexShrink: 0, boxShadow: '0 8px 24px rgba(0,0,0,0.10)', border: `2px solid ${ORANGE_BORDER}` }}>
                <img
                  src="/img/at founder part.png"
                  alt="Founder"
                  style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center top' }}
                />
              </div>
              <div>
                <div style={{ fontSize: '22px', fontWeight: 800, color: BLACK, marginBottom: '4px' }}>
                  Our Founder
                </div>
                <div style={{ fontSize: '14px', color: ORANGE, fontWeight: 700, marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <CheckCircle2 size={14} strokeWidth={2.5} />
                  Founder &amp; CEO, Placedly
                </div>
                <p style={{ fontSize: '15px', color: MUTED, lineHeight: 1.75, marginBottom: '24px' }}>
                  With a deep background in talent acquisition and career consulting across Delhi NCR&apos;s top MNCs, our founder built Placedly with a frustration-turned-mission: too many talented professionals were being left behind by a system that favoured connections over competence.
                </p>
                <div className="ab-founder-quote">
                  &ldquo;Your next job shouldn&apos;t depend on who you know. It should depend on how well we prepare you.&rdquo;
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ════════════════════════════════════════════
            CTA
        ════════════════════════════════════════════ */}
        <section className="inner-section" style={{ padding: '80px 0' }}>
          <div className="container">
            <div className="ab-cta-dark ab-reveal">
              <h2 style={{ fontSize: 'clamp(1.6rem,3vw,2.4rem)', fontWeight: 900, color: '#fff', lineHeight: 1.2, letterSpacing: '-0.03em', marginBottom: '12px', position: 'relative', zIndex: 1 }}>
                Ready to Write Your Success Story?
              </h2>
              <p style={{ fontSize: '15px', color: 'rgba(255,255,255,0.60)', marginBottom: '32px', maxWidth: '480px', margin: '0 auto 32px', position: 'relative', zIndex: 1 }}>
                Join 300+ professionals who trusted Placedly to transform their career. Zero upfront — you only pay after you&apos;re placed.
              </p>
              <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap', position: 'relative', zIndex: 1 }}>
                <a href="/contact" className="ab-btn-primary">
                  <Rocket size={15} /> Get Placed Now
                </a>
                <a href="/study-visa" className="ab-btn-cta-ghost">
                  <Plane size={15} /> Study Abroad
                </a>
              </div>
            </div>
          </div>
        </section>

      </div>
    </PageLayout>
  );
}