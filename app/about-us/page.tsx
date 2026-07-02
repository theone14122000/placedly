export const dynamic = 'force-dynamic';

import type { Metadata } from 'next';
import {
  Target, DollarSign, Handshake, Globe, Building2, TrendingUp,
  Rocket, Plane, Trophy, ArrowRight, Sparkles, Users, Award, Quote,
} from 'lucide-react';
import PageLayout from '../components/PageLayout';
import { getCmsMap, parseCmsJson } from '@/lib/cms';

export const metadata: Metadata = {
  title: 'About Us — Placedly',
  description: "Learn about Placedly — Delhi NCR's career placement and global education consultancy.",
};

/* eslint-disable @typescript-eslint/no-explicit-any */
const ICON_MAP: Record<string, React.ComponentType<any>> = {
  Target, DollarSign, Handshake, Globe, Building2, TrendingUp, Users, Award,
};

/* ── Brand tokens ── */
const G = {
  blue:   '#2563eb',
  indigo: '#7c8ff0',
  orange: '#fb923c',
  rose:   '#f43f5e',
  purple: '#a855f7',
};

/* ── Default content ── */
const DEFAULT_VALUES = [
  { icon: 'Target',     color: G.blue,     bg: '#eff6ff', title: 'Personalised, Always',      desc: 'No two careers are the same. Every candidate gets a bespoke roadmap built around their skills, goals, and target industry — not a generic playbook.' },
  { icon: 'DollarSign', color: '#16a34a',  bg: '#f0fdf4', title: 'Zero Upfront',               desc: 'Career Assistance Fee of 12% is charged only after you receive your offer letter. Our success is tied directly to yours.' },
  { icon: 'Handshake',  color: G.orange,   bg: '#fff7ed', title: 'End-to-End Partnership',     desc: 'From CV rebuild to day 90 in your new role — we stay with you through every step, including salary negotiation and joining support.' },
  { icon: 'Globe',      color: '#0891b2',  bg: '#ecfeff', title: 'Global Reach',                desc: '140+ university partners across UK, France, Germany, and Dubai. We make international education accessible, transparent, and stress-free.' },
  { icon: 'Building2',  color: G.purple,   bg: '#faf5ff', title: 'Direct Employer Access',     desc: 'Our 50+ hiring partner network means your profile goes directly to decision-makers — not into a black-hole job board.' },
  { icon: 'TrendingUp', color: G.rose,     bg: '#fff1f2', title: 'Measurable Outcomes',        desc: 'Average 40% salary hike. 300+ careers transformed. First interview call within 1–2 weeks. Results you can count on.' },
];

const DEFAULT_TIMELINE = [
  { year: '2022', title: 'Placedly Founded',          desc: 'Started in Delhi NCR with a single mission: make career growth transparent and accessible to every professional.' },
  { year: '2023', title: '100 Placements Milestone',  desc: 'Crossed 100 successful placements and launched our flagship Career Assistance Programme (CAP).' },
  { year: '2024', title: 'Study Abroad Division',     desc: 'Launched global education services with 140+ university partnerships across UK, France, Germany, and Dubai.' },
  { year: '2025', title: '300+ Careers Transformed',  desc: 'Expanded to 50+ hiring partners and achieved an average 40% salary hike for placed professionals.' },
  { year: '2026', title: 'Scaling Pan-India',         desc: 'Growing beyond Delhi NCR to serve professionals in Bangalore, Mumbai, Hyderabad, and Chennai.' },
];

const DEFAULT_STATS = [
  { icon: 'Users',      color: G.blue,   num: '300+', label: 'Professionals Placed' },
  { icon: 'Handshake',  color: G.orange, num: '50+',  label: 'Hiring Partners' },
  { icon: 'TrendingUp', color: '#16a34a', num: '40%', label: 'Avg. Salary Hike' },
  { icon: 'Award',      color: G.purple, num: '₹0',   label: 'Upfront Cost' },
];

const DOT_COLORS = [G.blue, G.orange, G.purple, '#16a34a', G.rose];

type AbCmsData = {
  stats?:    Array<{ num?: string; label?: string }>;
  values?:   Array<{ icon?: string; title?: string; desc?: string }>;
  timeline?: Array<{ year?: string; title?: string; desc?: string }>;
  founder?:  { name?: string; role?: string; bio?: string; quote?: string };
};

/* ════════════════════════════════════════════════════════════
   Reusable server-rendered pieces (no hooks — plain functions)
   ════════════════════════════════════════════════════════════ */

function GradientText({
  children, tag: Tag = 'span', style = {},
}: { children: React.ReactNode; tag?: 'h1' | 'h2' | 'span'; style?: React.CSSProperties }) {
  return (
    <Tag
      style={{
        backgroundImage: `linear-gradient(270deg, ${G.blue}, ${G.indigo}, ${G.orange}, ${G.rose}, ${G.purple}, ${G.blue})`,
        backgroundSize: '300% 300%',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        backgroundClip: 'text',
        animation: 'ab-grad 6s ease infinite',
        display: 'inline-block',
        ...style,
      }}
    >
      {children}
    </Tag>
  );
}

function SectionLabel({ text, light = false }: { text: string; light?: boolean }) {
  return (
    <div style={{
      display: 'inline-flex', alignItems: 'center', gap: '8px',
      fontSize: '11px', fontWeight: 800, letterSpacing: '0.12em',
      textTransform: 'uppercase', marginBottom: '18px',
    }}>
      <span style={{ width: '22px', height: '3px', borderRadius: '999px', background: `linear-gradient(90deg, ${G.blue}, ${G.orange})` }} />
      <span style={light ? { color: 'rgba(255,255,255,0.5)' } : {
        backgroundImage: `linear-gradient(90deg, ${G.blue}, ${G.indigo})`,
        WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
      }}>{text}</span>
      <span style={{ width: '22px', height: '3px', borderRadius: '999px', background: `linear-gradient(90deg, ${G.orange}, ${G.blue})` }} />
    </div>
  );
}

function AmbientBlobs() {
  return (
    <>
      <div aria-hidden className="ab-blob ab-blob-blue" />
      <div aria-hidden className="ab-blob ab-blob-orange" />
    </>
  );
}

function PrimaryButton({ href, children, icon: Icon }: { href: string; children: React.ReactNode; icon?: React.ComponentType<any> }) {
  return (
    <a href={href} className="ab-btn ab-btn-primary">
      {Icon && <Icon size={15} />}
      {children}
      <span className="ab-arrow"><ArrowRight size={14} /></span>
    </a>
  );
}
function WarmButton({ href, children, icon: Icon }: { href: string; children: React.ReactNode; icon?: React.ComponentType<any> }) {
  return (
    <a href={href} className="ab-btn ab-btn-warm">
      {Icon && <Icon size={15} />}
      {children}
    </a>
  );
}
function GhostButton({ href, children, icon: Icon }: { href: string; children: React.ReactNode; icon?: React.ComponentType<any> }) {
  return (
    <a href={href} className="ab-btn ab-btn-ghost">
      {children}
      {Icon && <Icon size={14} />}
    </a>
  );
}

/* ════════════════════════════════════════════════════════════ */
export default async function AboutUsPage() {
  const cmsMap = await getCmsMap('ab:');
  const abCms  = parseCmsJson<AbCmsData>(cmsMap, 'ab:data', {});

  const stats = (abCms.stats?.length)
    ? abCms.stats.map((s, i) => ({ ...DEFAULT_STATS[i], num: s.num ?? DEFAULT_STATS[i]?.num ?? '', label: s.label ?? DEFAULT_STATS[i]?.label ?? '' }))
    : DEFAULT_STATS;

  const values = (abCms.values?.length)
    ? abCms.values.map((v, i) => {
        const def = DEFAULT_VALUES[i] ?? DEFAULT_VALUES[0];
        return { ...def, icon: v.icon ?? def.icon, title: v.title ?? def.title, desc: v.desc ?? def.desc };
      })
    : DEFAULT_VALUES;

  const timeline = (abCms.timeline?.length)
    ? abCms.timeline.map(t => ({ year: t.year ?? '', title: t.title ?? '', desc: t.desc ?? '' }))
    : DEFAULT_TIMELINE;

  const founder = abCms.founder ?? {};

  return (
    <PageLayout>

      {/* ════════════════════ HERO ════════════════════ */}
      <section className="ab-hero">
        <AmbientBlobs />
        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <nav className="ab-breadcrumb reveal" data-reveal>
            <a href="/">Home</a>
            <span className="ab-sep">›</span>
            <span className="ab-current">About Us</span>
          </nav>

          <div style={{ maxWidth: '780px' }}>
            <div className="reveal" data-reveal><SectionLabel text="Our Story" /></div>

            <h1 className="ab-h1 reveal" data-reveal data-delay="0.1">
              We&apos;re Not Just a<br />
              Placement Agency.{' '}
              <GradientText tag="h1" style={{ display: 'inline' }}>We&apos;re Career Partners.</GradientText>
            </h1>

            <p className="ab-lead reveal" data-reveal data-delay="0.18">
              Born in Delhi NCR. Built for every professional who deserves better — a better role,
              a better salary, and a career that actually reflects their potential.
            </p>

            <div className="ab-btn-row reveal" data-reveal data-delay="0.26">
              <PrimaryButton href="/contact" icon={Rocket}>Start Your Journey</PrimaryButton>
              <GhostButton href="#our-story" icon={ArrowRight}>Read Our Story</GhostButton>
            </div>
          </div>

          <div className="ab-stats-4">
            {stats.map((s, i) => {
              const IconComp = ICON_MAP[s.icon] ?? Users;
              return (
                <div key={i} className="ab-stat-cell reveal" data-reveal data-delay={`${i * 0.08}`}
                  style={{ borderRight: i < stats.length - 1 ? '1px solid #eef2ff' : 'none' }}>
                  <div className="ab-stat-icon" style={{ background: `${s.color}15` }}>
                    <IconComp size={20} color={s.color} />
                  </div>
                  <div
                    className="ab-stat-num"
                    data-countup={s.num}
                    style={{
                      backgroundImage: `linear-gradient(135deg, ${s.color}, ${G.indigo})`,
                      WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
                    }}
                  >
                    {s.num.replace(/[0-9.]/g, '0')}
                  </div>
                  <div className="ab-stat-label">{s.label}</div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ════════════════════ MISSION / VISION ════════════════════ */}
      <section id="our-story" className="ab-section" style={{ background: '#fff' }}>
        <div className="container">
          <div className="ab-two-col">
            <div className="reveal" data-reveal>
              <SectionLabel text="Our Mission & Vision" />

              {/* Tabs */}
              <div className="ab-tabs" role="tablist">
                <button className="ab-tab is-active" role="tab" data-tab="mission" aria-selected="true">Our Mission</button>
                <button className="ab-tab" role="tab" data-tab="vision" aria-selected="false">Our Vision</button>
              </div>

              <div className="ab-tab-panel is-active" data-tab-panel="mission">
                <h2 className="ab-h2">
                  Making Career Growth <GradientText tag="h2">Accessible</GradientText> for Everyone
                </h2>
                <p className="ab-body-1">
                  Placedly was founded with one deeply held belief: exceptional careers shouldn&apos;t be a
                  privilege reserved for people with the right connections. Every professional deserves expert
                  guidance, real employer access, and a fair shot at the role they want.
                </p>
                <p className="ab-body-2">
                  We operate on a simple model:{' '}
                  <strong style={{ color: G.blue }}>zero upfront, success-share only.</strong>{' '}
                  Career Assistance Fee of 12% of CTC — collected only after you receive your offer letter.
                  If we don&apos;t place you, you don&apos;t pay.
                </p>
              </div>

              <div className="ab-tab-panel" data-tab-panel="vision">
                <h2 className="ab-h2">
                  Becoming India&apos;s Most <GradientText tag="h2">Trusted</GradientText> Career Partner
                </h2>
                <p className="ab-body-1">
                  To become the first name that comes to mind when ambitious professionals think about
                  their next big move — a partner defined by outcomes, not empty promises.
                </p>
                <p className="ab-body-2">
                  We envision a future where geography and network no longer decide your ceiling — where
                  140+ global university partners and 50+ hiring partners make world-class opportunity
                  a default, not a privilege.
                </p>
              </div>

              <PrimaryButton href="/contact">Talk to Our Team</PrimaryButton>
            </div>

            {/* Image collage */}
            <div className="ab-mission-img reveal" data-reveal data-delay="0.15">
              <div className="ab-img-main">
                <img src="/img/team.png" alt="Placedly Team" />
                <div className="ab-img-tint" />
              </div>
              <div className="ab-img-secondary">
                <img src="/img/aboutt us consultancy.png" alt="Consultancy" />
              </div>

              <div className="ab-chip ab-chip-1">
                <div className="ab-chip-icon" style={{ background: `${G.blue}15` }}>
                  <Trophy size={18} color={G.blue} />
                </div>
                <div>
                  <div className="ab-chip-num" style={{ backgroundImage: `linear-gradient(135deg, ${G.blue}, ${G.indigo})` }}>300+</div>
                  <div className="ab-chip-label">Careers Transformed</div>
                </div>
              </div>

              <div className="ab-chip ab-chip-2">
                <div className="ab-chip-icon" style={{ background: `${G.orange}15` }}>
                  <Handshake size={18} color={G.orange} />
                </div>
                <div>
                  <div className="ab-chip-num" style={{ backgroundImage: `linear-gradient(135deg, ${G.orange}, ${G.rose})` }}>50+</div>
                  <div className="ab-chip-label">Hiring Partners</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ════════════════════ VALUES ════════════════════ */}
      <section className="ab-section" style={{ background: '#f8faff', position: 'relative', overflow: 'hidden' }}>
        <AmbientBlobs />
        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <div className="ab-center reveal" data-reveal>
            <SectionLabel text="What We Stand For" />
            <h2 className="ab-h2">The Principles That <GradientText tag="h2">Drive Us</GradientText></h2>
          </div>

          <div className="ab-values-3">
            {values.map((v, i) => {
              const IconComp = ICON_MAP[v.icon] ?? Target;
              return (
                <div
                  key={i}
                  className="ab-value-card reveal"
                  data-reveal
                  data-delay={`${i * 0.08}`}
                  data-value-card
                  style={{ '--accent': v.color } as React.CSSProperties}
                >
                  <div className="ab-value-glow" style={{
                    background: `linear-gradient(135deg, ${v.color}, ${G.orange})`,
                  }} />
                  <div className="ab-value-spotlight" data-spotlight
                    style={{ background: `radial-gradient(360px circle at var(--mx,50%) var(--my,50%), ${v.color}14, transparent 60%)` }} />
                  <div className="ab-value-strip" style={{ background: `linear-gradient(90deg, ${v.color}, ${G.indigo})` }} />
                  <div className="ab-value-ghost" style={{
                    backgroundImage: `linear-gradient(135deg, ${v.color}, transparent)`,
                    WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
                  }}>{String(i + 1).padStart(2, '0')}</div>

                  <div className="ab-value-icon" style={{ background: v.bg, boxShadow: `0 4px 14px ${v.color}20` }}>
                    <IconComp size={22} color={v.color} />
                  </div>
                  <div className="ab-value-title">{v.title}</div>
                  <div className="ab-value-desc">{v.desc}</div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ════════════════════ TIMELINE ════════════════════ */}
      <section id="journey" className="ab-section" style={{ background: '#fff' }}>
        <div className="container">
          <div className="ab-two-col ab-timeline-grid">
            <div className="ab-timeline-sticky">
              <div className="reveal" data-reveal>
                <SectionLabel text="Our Journey" />
                <h2 className="ab-h2">From Startup to <GradientText tag="h2">300+ Placements</GradientText></h2>
                <p className="ab-body-1" style={{ marginBottom: '32px' }}>
                  Every milestone was earned the hard way — one candidate at a time, one employer relationship at a time.
                </p>
              </div>

              <div className="ab-growth-card reveal" data-reveal data-delay="0.15">
                <div className="ab-growth-head">
                  <Sparkles size={16} color={G.blue} className="ab-sparkle" />
                  <span>Growth trajectory</span>
                </div>
                {[{ label: 'Placements', val: 85 }, { label: 'Partners', val: 60 }, { label: 'Satisfaction', val: 97 }].map(bar => (
                  <div key={bar.label} className="ab-growth-row">
                    <div className="ab-growth-labels"><span>{bar.label}</span><span>{bar.val}%</span></div>
                    <div className="ab-growth-track">
                      <div className="ab-growth-fill reveal-bar" data-reveal-bar style={{ '--w': `${bar.val}%` } as React.CSSProperties} />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="ab-timeline" data-timeline-track>
              <div className="ab-timeline-rail" />
              <div className="ab-timeline-rail-fill" data-timeline-fill />
              {timeline.map((item, i) => {
                const col = DOT_COLORS[i % DOT_COLORS.length];
                return (
                  <div key={i} className="ab-timeline-item reveal" data-reveal data-delay={`${i * 0.08}`}>
                    <div className="ab-timeline-dot" style={{ background: `linear-gradient(135deg, ${col}, ${G.indigo})`, boxShadow: `0 6px 18px ${col}40` }}>
                      {i + 1}
                    </div>
                    <div className="ab-timeline-content">
                      <div className="ab-timeline-year" style={{ background: `${col}15`, color: col }}>{item.year}</div>
                      <div className="ab-timeline-title">{item.title}</div>
                      <div className="ab-timeline-desc">{item.desc}</div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ════════════════════ LEADERSHIP ════════════════════ */}
      <section className="ab-section" style={{ background: '#f8faff' }}>
        <div className="container">
          <div className="ab-center reveal" data-reveal>
            <SectionLabel text="Leadership" />
            <h2 className="ab-h2">The Person Behind <GradientText tag="h2">Placedly</GradientText></h2>
          </div>

          <div className="ab-founder-card reveal" data-reveal data-delay="0.1" data-tilt>
            <div aria-hidden className="ab-founder-orb" />
            <div className="ab-founder-photo">
              <img src="/img/at founder part.png" alt={founder.name ?? 'Founder'} />
              <div className="ab-founder-photo-tint" />
            </div>
            <div className="ab-founder-body">
              <div className="ab-founder-name">{founder.name ?? 'Our Founder'}</div>
              <div className="ab-founder-role">{founder.role ?? 'Founder & CEO, Placedly'}</div>
              <p className="ab-founder-bio">
                {founder.bio ?? "With a deep background in talent acquisition and career consulting across Delhi NCR's top MNCs, our founder built Placedly with a frustration-turned-mission: too many talented professionals were being left behind by a system that favoured connections over competence."}
              </p>
              <div className="ab-founder-quote">
                <Quote size={38} color={G.blue} className="ab-quote-icon" />
                {founder.quote ?? "Your next job shouldn't depend on who you know. It should depend on how well we prepare you."}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ════════════════════ CTA ════════════════════ */}
      <section className="ab-section" style={{ background: '#fff' }}>
        <div className="container">
          <div className="ab-cta reveal" data-reveal>
            <div className="ab-cta-orb ab-cta-orb-blue" />
            <div className="ab-cta-orb ab-cta-orb-orange" />
            <div style={{ position: 'relative', zIndex: 1 }}>
              <SectionLabel text="Take Action" light />
              <h2 className="ab-cta-h2"><GradientText tag="h2">Ready to Write Your Success Story?</GradientText></h2>
              <p className="ab-cta-body">
                Join 300+ professionals who trusted Placedly to transform their career.
                Zero upfront — you only pay after you&apos;re placed.
              </p>
              <div className="ab-btn-row" style={{ justifyContent: 'center' }}>
                <PrimaryButton href="/contact" icon={Rocket}>Get Placed Now</PrimaryButton>
                <WarmButton href="/study-visa" icon={Plane}>Study Abroad</WarmButton>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ════════════════════ STYLES ════════════════════ */}
      <style>{`
        @keyframes ab-grad { 0%{background-position:0% 50%} 50%{background-position:100% 50%} 100%{background-position:0% 50%} }
        @keyframes ab-blob-a { 0%,100%{transform:translate(0,0)} 50%{transform:translate(30px,20px)} }
        @keyframes ab-blob-b { 0%,100%{transform:translate(0,0)} 50%{transform:translate(-25px,-15px)} }
        @keyframes ab-float { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-8px)} }
        @keyframes ab-float-2 { 0%,100%{transform:translateY(0)} 50%{transform:translateY(8px)} }
        @keyframes ab-arrow-bounce { 0%,100%{transform:translateX(0)} 50%{transform:translateX(4px)} }
        @keyframes ab-sparkle-swing { 0%,100%{transform:rotate(0)} 25%{transform:rotate(15deg)} 75%{transform:rotate(-15deg)} }

        .reveal { opacity: 0; transform: translateY(40px); transition: opacity .55s cubic-bezier(.22,1,.36,1), transform .55s cubic-bezier(.22,1,.36,1); }
        .reveal.is-visible { opacity: 1; transform: translateY(0); }

        .ab-blob { position:absolute; border-radius:50%; pointer-events:none; }
        .ab-blob-blue { top:-120px; left:-120px; width:520px; height:520px; background:radial-gradient(circle, ${G.blue}22 0%, transparent 70%); filter:blur(100px); animation: ab-blob-a 14s ease-in-out infinite; }
        .ab-blob-orange { top:15%; right:-140px; width:440px; height:440px; background:radial-gradient(circle, ${G.orange}1e 0%, transparent 70%); filter:blur(110px); animation: ab-blob-b 16s ease-in-out infinite 1s; }

        .ab-hero { position:relative; padding: calc(56px + 80px) 0 0; overflow:hidden; background:#fafbff; }
        .ab-breadcrumb { display:flex; align-items:center; gap:6px; font-size:13px; color:#94a3b8; margin-bottom:28px; }
        .ab-breadcrumb a { color:#94a3b8; text-decoration:none; }
        .ab-breadcrumb a:hover { color:${G.blue}; }
        .ab-sep { color:#cbd5e1; }
        .ab-current { color:#475569; font-weight:500; }

        .ab-h1 { font-size: clamp(2.4rem, 5vw, 4rem); font-weight:900; line-height:1.08; letter-spacing:-1.5px; color:#0b0d20; margin-bottom:24px; }
        .ab-h2 { font-size: clamp(1.9rem, 3vw, 2.75rem); font-weight:900; color:#0b0d20; line-height:1.12; letter-spacing:-0.8px; margin-bottom:22px; }
        .ab-lead { font-size:17px; color:#64748b; line-height:1.75; max-width:540px; margin-bottom:36px; }
        .ab-body-1 { font-size:15.5px; color:#64748b; line-height:1.8; margin-bottom:16px; }
        .ab-body-2 { font-size:15.5px; color:#374151; line-height:1.8; margin-bottom:36px; }

        .ab-btn-row { display:flex; gap:12px; flex-wrap:wrap; margin-bottom:64px; }
        .ab-btn { display:inline-flex; align-items:center; gap:8px; font-weight:700; font-size:14px; padding:14px 30px; border-radius:999px; text-decoration:none; transition: transform .2s ease, box-shadow .2s ease; }
        .ab-btn:hover { transform: translateY(-3px); }
        .ab-btn-primary { background-image: linear-gradient(135deg, ${G.blue}, ${G.indigo}); color:#fff; box-shadow: 0 8px 24px ${G.blue}35; }
        .ab-btn-primary:hover { box-shadow: 0 16px 36px ${G.blue}55; }
        .ab-btn-warm { background-image: linear-gradient(135deg, ${G.orange}, ${G.rose}); color:#fff; box-shadow: 0 8px 28px ${G.orange}40; }
        .ab-btn-warm:hover { box-shadow: 0 16px 36px ${G.orange}55; }
        .ab-btn-ghost { background:#fff; color:#374151; border:1.5px solid #e2e8f0; box-shadow: 0 2px 8px rgba(0,0,0,.05); }
        .ab-btn-ghost:hover { border-color:${G.blue}; box-shadow: 0 8px 24px rgba(37,99,235,.15); }
        .ab-arrow { display:inline-flex; animation: ab-arrow-bounce 1.3s ease-in-out infinite; }

        .ab-stats-4 { display:grid; grid-template-columns:repeat(4,1fr); border-top:1px solid #eef2ff; }
        .ab-stat-cell { text-align:center; padding:32px 20px; background:#fafbff; transition: background .25s ease; }
        .ab-stat-cell:hover { background:#fff; }
        .ab-stat-icon { width:44px; height:44px; border-radius:12px; display:flex; align-items:center; justify-content:center; margin:0 auto 12px; transition: transform .3s ease; }
        .ab-stat-cell:hover .ab-stat-icon { transform: scale(1.12) rotate(6deg); }
        .ab-stat-num { font-size:2rem; font-weight:900; line-height:1; margin-bottom:6px; }
        .ab-stat-label { font-size:12px; color:#94a3b8; font-weight:600; }

        .ab-section { padding: clamp(64px, 9vw, 96px) 0; }
        .ab-center { text-align:center; margin-bottom:56px; }
        .ab-two-col { display:grid; grid-template-columns:1fr 1fr; gap:72px; align-items:center; }

        .ab-tabs { display:inline-flex; background:rgba(15,23,42,0.05); border:1px solid rgba(15,23,42,0.08); border-radius:999px; padding:5px; margin-bottom:18px; gap:4px; }
        .ab-tab { border:none; cursor:pointer; background:transparent; padding:8px 20px; border-radius:999px; font-size:13px; font-weight:700; color:rgba(15,23,42,.5); transition: all .2s ease; }
        .ab-tab.is-active { background:#fff; box-shadow:0 2px 12px rgba(0,0,0,.08); background-image: linear-gradient(90deg, ${G.blue}, ${G.indigo}), linear-gradient(#fff,#fff); -webkit-background-clip:text, padding-box; -webkit-text-fill-color:transparent; background-color:#fff; }
        .ab-tab-panel { display:none; animation: ab-fadein .35s ease; }
        .ab-tab-panel.is-active { display:block; }
        @keyframes ab-fadein { from{opacity:0; transform:translateY(8px)} to{opacity:1; transform:translateY(0)} }

        .ab-mission-img { position:relative; height:500px; }
        .ab-img-main { position:absolute; top:0; left:0; width:70%; height:310px; border-radius:22px; overflow:hidden; box-shadow:0 24px 56px rgba(0,0,0,.12); }
        .ab-img-main img { width:100%; height:100%; object-fit:cover; }
        .ab-img-tint { position:absolute; inset:0; background:linear-gradient(160deg, ${G.blue}22 0%, transparent 60%); }
        .ab-img-secondary { position:absolute; bottom:0; right:0; width:58%; height:250px; border-radius:22px; overflow:hidden; box-shadow:0 24px 56px rgba(0,0,0,.12); border:4px solid #fff; }
        .ab-img-secondary img { width:100%; height:100%; object-fit:cover; }

        .ab-chip { position:absolute; background:#fff; border-radius:16px; box-shadow:0 12px 32px rgba(0,0,0,.10); padding:14px 18px; display:flex; align-items:center; gap:12px; transition: transform .25s ease; }
        .ab-chip:hover { transform: scale(1.05); }
        .ab-chip-1 { bottom:165px; left:-20px; border:1px solid ${G.blue}20; animation: ab-float 5.5s ease-in-out infinite; }
        .ab-chip-2 { top:60px; right:-20px; border:1px solid ${G.orange}20; animation: ab-float-2 6s ease-in-out infinite .5s; }
        .ab-chip-icon { width:42px; height:42px; border-radius:12px; display:flex; align-items:center; justify-content:center; }
        .ab-chip-num { font-size:20px; font-weight:900; line-height:1; -webkit-background-clip:text; -webkit-text-fill-color:transparent; background-clip:text; }
        .ab-chip-label { font-size:11px; color:#94a3b8; margin-top:2px; }

        .ab-values-3 { display:grid; grid-template-columns:repeat(3,1fr); gap:20px; }
        .ab-value-card { position:relative; background:#fff; border-radius:22px; padding:32px; border:1px solid rgba(15,23,42,0.06); overflow:hidden; transition: transform .25s ease, box-shadow .3s ease; box-shadow: 0 8px 28px rgba(15,23,42,0.06); }
        .ab-value-card:hover { transform: translateY(-6px); box-shadow: 0 24px 60px rgba(37,99,235,.14); }
        .ab-value-glow { position:absolute; inset:0; border-radius:22px; padding:1.5px; -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0); -webkit-mask-composite: xor; mask-composite: exclude; opacity:0; transition: opacity .3s ease; pointer-events:none; }
        .ab-value-card:hover .ab-value-glow { opacity:1; }
        .ab-value-spotlight { position:absolute; inset:0; opacity:0; transition: opacity .3s ease; pointer-events:none; }
        .ab-value-card:hover .ab-value-spotlight { opacity:1; }
        .ab-value-strip { position:absolute; top:0; left:0; right:0; height:3px; }
        .ab-value-ghost { position:absolute; bottom:-22px; right:4px; font-size:104px; font-weight:900; opacity:.07; line-height:1; user-select:none; pointer-events:none; }
        .ab-value-icon { width:48px; height:48px; border-radius:14px; display:flex; align-items:center; justify-content:center; margin-bottom:18px; position:relative; z-index:1; transition: transform .3s ease; }
        .ab-value-card:hover .ab-value-icon { transform: scale(1.08) rotate(-6deg); }
        .ab-value-title { font-size:15.5px; font-weight:800; color:#0f172a; margin-bottom:10px; position:relative; z-index:1; }
        .ab-value-desc { font-size:14px; color:#64748b; line-height:1.7; position:relative; z-index:1; }

        .ab-timeline-grid { gap:88px; align-items:start; }
        .ab-timeline-sticky { position:sticky; top:100px; }
        .ab-growth-card { background:#f8faff; border-radius:16px; padding:22px 24px; border:1px solid ${G.blue}18; }
        .ab-growth-head { display:flex; align-items:center; gap:10px; margin-bottom:14px; font-size:13px; font-weight:700; color:${G.blue}; }
        .ab-sparkle { animation: ab-sparkle-swing 4s ease-in-out infinite; }
        .ab-growth-row { margin-bottom:10px; }
        .ab-growth-labels { display:flex; justify-content:space-between; font-size:12px; color:#64748b; margin-bottom:4px; }
        .ab-growth-track { height:6px; border-radius:99px; background:#eef2ff; overflow:hidden; }
        .ab-growth-fill { height:100%; width:0%; border-radius:99px; background:linear-gradient(90deg, ${G.blue}, ${G.orange}); transition: width 1s cubic-bezier(.22,1,.36,1); }
        .ab-growth-fill.is-visible { width: var(--w); }

        .ab-timeline { position:relative; }
        .ab-timeline-rail { position:absolute; left:19px; top:20px; bottom:20px; width:2px; background:#eef2ff; }
        .ab-timeline-rail-fill { position:absolute; left:19px; top:20px; width:2px; height:0%; background:linear-gradient(to bottom, ${G.blue}, ${G.orange}); transition: height .3s linear; }
        .ab-timeline-item { display:flex; gap:20px; position:relative; padding-bottom:36px; }
        .ab-timeline-item:last-child { padding-bottom:0; }
        .ab-timeline-dot { width:40px; height:40px; border-radius:50%; display:flex; align-items:center; justify-content:center; font-size:13px; font-weight:800; color:#fff; flex-shrink:0; z-index:1; transition: transform .25s ease; }
        .ab-timeline-item:hover .ab-timeline-dot { transform: scale(1.15); }
        .ab-timeline-content { padding-top:6px; }
        .ab-timeline-year { display:inline-block; font-size:11px; font-weight:800; letter-spacing:.6px; text-transform:uppercase; margin-bottom:4px; padding:3px 10px; border-radius:999px; }
        .ab-timeline-title { font-size:15.5px; font-weight:800; color:#0f172a; margin-bottom:5px; }
        .ab-timeline-desc { font-size:14px; color:#64748b; line-height:1.7; }

        .ab-founder-card { perspective:1200px; transform-style:preserve-3d; background:#fff; border:1px solid #eef2ff; border-radius:28px; padding:52px; box-shadow:0 4px 24px rgba(37,99,235,.06); display:flex; gap:52px; align-items:flex-start; max-width:900px; margin:0 auto; position:relative; overflow:hidden; transition: transform .3s ease; }
        .ab-founder-orb { position:absolute; top:-60px; right:-60px; width:260px; height:260px; border-radius:50%; background:radial-gradient(circle, ${G.blue}12 0%, transparent 70%); pointer-events:none; animation: ab-blob-a 10s ease-in-out infinite; }
        .ab-founder-photo { width:190px; height:230px; border-radius:20px; overflow:hidden; flex-shrink:0; box-shadow:0 16px 40px rgba(37,99,235,.15); border:3px solid ${G.blue}20; position:relative; transition: transform .3s ease; }
        .ab-founder-card:hover .ab-founder-photo { transform: scale(1.03); }
        .ab-founder-photo img { width:100%; height:100%; object-fit:cover; object-position:center top; }
        .ab-founder-photo-tint { position:absolute; bottom:0; left:0; right:0; height:60px; background:linear-gradient(transparent, ${G.blue}30); }
        .ab-founder-body { position:relative; z-index:1; }
        .ab-founder-name { font-size:24px; font-weight:900; color:#0b0d20; margin-bottom:4px; }
        .ab-founder-role { font-size:13.5px; font-weight:600; margin-bottom:22px; background-image: linear-gradient(90deg, ${G.blue}, ${G.indigo}); -webkit-background-clip:text; -webkit-text-fill-color:transparent; background-clip:text; }
        .ab-founder-bio { font-size:15px; color:#64748b; line-height:1.8; margin-bottom:26px; }
        .ab-founder-quote { background:#f8faff; border-left:4px solid ${G.blue}; padding:18px 22px; border-radius:0 14px 14px 0; font-size:14.5px; color:#374151; font-style:italic; line-height:1.75; position:relative; }
        .ab-quote-icon { position:absolute; top:-4px; left:14px; opacity:.15; }

        .ab-cta { position:relative; border-radius:28px; padding: clamp(48px,8vw,80px) clamp(24px,6vw,72px); text-align:center; overflow:hidden; background: linear-gradient(135deg, #0b0d20 0%, #1a1040 50%, #0d1836 100%); }
        .ab-cta-orb { position:absolute; border-radius:50%; filter:blur(60px); pointer-events:none; }
        .ab-cta-orb-blue { top:-80px; left:10%; width:340px; height:340px; background:radial-gradient(circle, ${G.blue}35 0%, transparent 70%); animation: ab-blob-a 12s ease-in-out infinite; }
        .ab-cta-orb-orange { bottom:-60px; right:8%; width:300px; height:300px; background:radial-gradient(circle, ${G.orange}30 0%, transparent 70%); animation: ab-blob-b 14s ease-in-out infinite 1s; }
        .ab-cta-h2 { font-size: clamp(1.7rem, 3.5vw, 2.6rem); font-weight:900; line-height:1.15; letter-spacing:-0.6px; margin-bottom:14px; }
        .ab-cta-body { font-size:15.5px; color:rgba(255,255,255,.55); max-width:480px; margin:0 auto 36px; line-height:1.75; }

        @media (max-width: 900px) { .ab-chip { display:none !important; } }
        @media (max-width: 860px) {
          .ab-two-col { grid-template-columns:1fr !important; gap:40px !important; }
          .ab-values-3 { grid-template-columns:1fr 1fr !important; }
          .ab-founder-card { flex-direction:column !important; padding:32px !important; }
          .ab-mission-img { height:320px !important; }
        }
        @media (max-width: 580px) {
          .ab-stats-4 { grid-template-columns:repeat(2,1fr) !important; }
          .ab-values-3 { grid-template-columns:1fr !important; }
        }
      `}</style>

      {/* ════════════════════ VANILLA JS INTERACTIVITY ════════════════════ */}
      <script
        dangerouslySetInnerHTML={{
          __html: `
            (function () {
              function ready(fn) {
                if (document.readyState !== 'loading') fn();
                else document.addEventListener('DOMContentLoaded', fn);
              }

              ready(function () {
                /* ── Scroll reveal ── */
                var revealEls = document.querySelectorAll('[data-reveal]');
                var barEls = document.querySelectorAll('[data-reveal-bar]');
                var io = new IntersectionObserver(function (entries) {
                  entries.forEach(function (entry) {
                    if (entry.isIntersecting) {
                      var el = entry.target;
                      var delay = parseFloat(el.getAttribute('data-delay') || '0');
                      setTimeout(function () { el.classList.add('is-visible'); }, delay * 1000);
                      io.unobserve(el);
                    }
                  });
                }, { threshold: 0.12, rootMargin: '-40px' });
                revealEls.forEach(function (el) { io.observe(el); });
                barEls.forEach(function (el) { io.observe(el); });

                /* ── Count-up stats ── */
                var countEls = document.querySelectorAll('[data-countup]');
                var countIO = new IntersectionObserver(function (entries) {
                  entries.forEach(function (entry) {
                    if (!entry.isIntersecting) return;
                    var el = entry.target;
                    var target = el.getAttribute('data-countup') || '';
                    var match = target.match(/[\\d.]+/);
                    if (!match) { el.textContent = target; countIO.unobserve(el); return; }
                    var num = parseFloat(match[0]);
                    var isInt = Number.isInteger(num);
                    var prefix = target.slice(0, match.index);
                    var suffix = target.slice(match.index + match[0].length);
                    var start = null;
                    var duration = 1400;
                    function step(ts) {
                      if (!start) start = ts;
                      var progress = Math.min((ts - start) / duration, 1);
                      var eased = 1 - Math.pow(1 - progress, 3);
                      var val = num * eased;
                      el.textContent = prefix + (isInt ? Math.round(val) : val.toFixed(1)) + suffix;
                      if (progress < 1) requestAnimationFrame(step);
                    }
                    requestAnimationFrame(step);
                    countIO.unobserve(el);
                  });
                }, { threshold: 0.5 });
                countEls.forEach(function (el) { countIO.observe(el); });

                /* ── Mission / Vision tabs ── */
                var tabs = document.querySelectorAll('.ab-tab');
                tabs.forEach(function (tab) {
                  tab.addEventListener('click', function () {
                    var key = tab.getAttribute('data-tab');
                    tabs.forEach(function (t) { t.classList.remove('is-active'); t.setAttribute('aria-selected', 'false'); });
                    tab.classList.add('is-active');
                    tab.setAttribute('aria-selected', 'true');
                    document.querySelectorAll('[data-tab-panel]').forEach(function (panel) {
                      panel.classList.toggle('is-active', panel.getAttribute('data-tab-panel') === key);
                    });
                  });
                });

                /* ── Value card mouse-tracking spotlight ── */
                document.querySelectorAll('[data-value-card]').forEach(function (card) {
                  card.addEventListener('mousemove', function (e) {
                    var rect = card.getBoundingClientRect();
                    var x = ((e.clientX - rect.left) / rect.width) * 100;
                    var y = ((e.clientY - rect.top) / rect.height) * 100;
                    card.style.setProperty('--mx', x + '%');
                    card.style.setProperty('--my', y + '%');
                  });
                });

                /* ── Founder card 3D tilt ── */
                var founderCard = document.querySelector('[data-tilt]');
                if (founderCard) {
                  founderCard.addEventListener('mousemove', function (e) {
                    var rect = founderCard.getBoundingClientRect();
                    var px = (e.clientX - rect.left) / rect.width - 0.5;
                    var py = (e.clientY - rect.top) / rect.height - 0.5;
                    founderCard.style.transform = 'rotateX(' + (py * -5) + 'deg) rotateY(' + (px * 5) + 'deg)';
                  });
                  founderCard.addEventListener('mouseleave', function () {
                    founderCard.style.transform = 'rotateX(0deg) rotateY(0deg)';
                  });
                }

                /* ── Timeline scroll-linked fill ── */
                var track = document.querySelector('[data-timeline-track]');
                var fill = document.querySelector('[data-timeline-fill]');
                if (track && fill) {
                  var ticking = false;
                  function updateFill() {
                    var rect = track.getBoundingClientRect();
                    var vh = window.innerHeight;
                    var total = rect.height;
                    var visible = Math.min(Math.max(vh * 0.85 - rect.top, 0), total);
                    var pct = total > 0 ? (visible / total) * 100 : 0;
                    fill.style.height = pct + '%';
                    ticking = false;
                  }
                  document.addEventListener('scroll', function () {
                    if (!ticking) { requestAnimationFrame(updateFill); ticking = true; }
                  }, { passive: true });
                  updateFill();
                }
              });
            })();
          `,
        }}
      />

    </PageLayout>
  );
}