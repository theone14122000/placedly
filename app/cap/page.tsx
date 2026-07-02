export const dynamic = 'force-dynamic';

import type { Metadata } from 'next';
import PageLayout from '../components/PageLayout';
import {
  HeartPulse, ClipboardList, Briefcase, BarChart3,
  RefreshCw, TrendingUp, Phone, Search, FileSignature,
  FileText, Mic2, Handshake, PartyPopper,
  CheckCircle2, Sparkles, ArrowRight, Rocket, MessageCircle,
  Play, X, Zap, Calculator,
  type LucideIcon,
} from 'lucide-react';
import { getCmsMap, parseCmsJson } from '@/lib/cms';

export async function generateMetadata(): Promise<Metadata> {
  const cmsMap = await getCmsMap('cap:');
  const capCms = parseCmsJson<CapCmsData>(cmsMap, 'cap:data', {});
  return {
    title: capCms.seo?.title ?? 'Career Assistance Programme (CAP) — Placedly',
    description: capCms.seo?.description ?? 'Placedly CAP: The flagship career growth programme for BPO, Healthcare Claims, Insurance & Finance professionals. Resume rebuild, mock interviews, direct employer connect. Zero upfront.',
  };
}

/* ── Brand tokens ── */
const G = {
  blue:   '#2563eb',
  indigo: '#7c8ff0',
  orange: '#fb923c',
  rose:   '#f43f5e',
  purple: '#a855f7',
};

const DOT_COLORS = [G.blue, G.orange, G.purple, '#16a34a', G.rose, '#0891b2', G.blue];

/* ── Icon registry ── */
const ICON_MAP: Record<string, LucideIcon> = {
  HeartPulse, ClipboardList, Briefcase, BarChart3, RefreshCw, TrendingUp,
  Phone, Search, FileSignature, FileText, Mic2, Handshake, PartyPopper,
  Rocket, Zap, Sparkles,
};
function resolveIcon(name: string | undefined, fallback: LucideIcon): LucideIcon {
  return (name && ICON_MAP[name]) || fallback;
}

/* ════════════════════════════════════════════════════════════
   CMS TYPES
════════════════════════════════════════════════════════════ */
type CapCmsData = {
  seo?: { title?: string; description?: string };
  hero?: {
    tag?: string;
    titlePlain?: string;
    titleGradient?: string;
    subtitle?: string;
    ctaText?: string;
    ctaLink?: string;
    secondaryCtaText?: string;
    secondaryCtaLink?: string;
  };
  liveActivity?: string[];
  stats?: Array<{ label?: string; value?: string }>;
  included?: {
    heading?: string;
    headingGradient?: string;
    body?: string;
    benefits?: string[];
    ctaText?: string;
    ctaLink?: string;
  };
  successShare?: {
    title?: string;
    subtitle?: string;
    percent?: number;
    note?: string;
    calcMin?: number;
    calcMax?: number;
    calcDefault?: number;
  };
  shareTable?: Array<{ ctc: string; fee: string; net: string; roi: string }>;
  domainsSection?: { heading?: string; headingGradient?: string; body?: string };
  domains?: Array<{
    icon?: string;
    iconBg?: string;
    iconColor?: string;
    category?: string;
    title?: string;
    desc?: string;
    badge?: string;
    badgeColor?: string;
    stats?: Array<{ label?: string; value?: string }>;
  }>;
  journey?: { heading?: string; headingGradient?: string };
  steps?: Array<{
    id?: number;
    number?: number;
    icon?: string;
    title?: string;
    badge?: string;
    desc?: string;
    tags?: string[];
  }>;
  cta?: {
    title?: string;
    body?: string;
    primaryText?: string;
    primaryLink?: string;
    whatsappNumber?: string;
    whatsappText?: string;
  };
  stickyCta?: {
    title?: string;
    subtitle?: string;
    ctaText?: string;
    ctaLink?: string;
  };
};

/* ════════════════════════════════════════════════════════════
   DEFAULTS
════════════════════════════════════════════════════════════ */
const DEFAULT_BENEFITS = [
  'ATS-Optimized Resume + LinkedIn Rebuild',
  '3 Mock Interview Sessions (HR + Domain + Salary)',
  'Personalized Career Strategy Roadmap',
  'Direct Connect — 10–15 Target Companies',
  'Offer Negotiation Script & CTC Boost',
  '30-Day Post-Joining Advisor Support',
];

const DEFAULT_DOMAINS = [
  {
    icon: 'HeartPulse', iconBg: '#fef2f2', iconColor: '#ef4444',
    category: 'health', title: 'US Healthcare Claims',
    desc: 'CPT coding, ICD-10, adjudication, denial management. Direct connect at EXL, Optum, WNS.',
    badge: 'Strongest', badgeColor: '#ef4444',
    stats: [{ label: 'Placements/mo', value: '12+' }, { label: 'Avg Hike', value: '45%' }, { label: 'Time to Offer', value: '18 days' }],
  },
  {
    icon: 'ClipboardList', iconBg: '#fff7ed', iconColor: G.orange,
    category: 'health', title: 'Insurance Operations',
    desc: "Lloyd's market, underwriting, XIS submission, claims processing & policy servicing.",
    badge: 'High CTC', badgeColor: G.orange,
    stats: [{ label: 'Placements/mo', value: '8+' }, { label: 'Avg Hike', value: '40%' }, { label: 'Time to Offer', value: '21 days' }],
  },
  {
    icon: 'Briefcase', iconBg: '#eff6ff', iconColor: G.blue,
    category: 'ops', title: 'BPO / KPO Operations',
    desc: 'Process associates, team leads, QAs, ops managers. Volume domain — fastest results.',
    badge: 'Fast Results', badgeColor: G.blue,
    stats: [{ label: 'Placements/mo', value: '15+' }, { label: 'Avg Hike', value: '35%' }, { label: 'Time to Offer', value: '12 days' }],
  },
  {
    icon: 'BarChart3', iconBg: '#f0fdf4', iconColor: '#16a34a',
    category: 'finance', title: 'Finance & Accounts',
    desc: 'Accounts executives, finance analysts, payroll specialists, BFSI roles.',
    badge: 'High Demand', badgeColor: '#16a34a',
    stats: [{ label: 'Placements/mo', value: '9+' }, { label: 'Avg Hike', value: '42%' }, { label: 'Time to Offer', value: '20 days' }],
  },
  {
    icon: 'RefreshCw', iconBg: '#faf5ff', iconColor: G.purple,
    category: 'switch', title: 'Career Switchers',
    desc: 'Career gap? Domain switch? We re-package your story for top MNC hiring managers.',
    badge: 'Specialist', badgeColor: G.purple,
    stats: [{ label: 'Placements/mo', value: '6+' }, { label: 'Avg Hike', value: '38%' }, { label: 'Time to Offer', value: '25 days' }],
  },
  {
    icon: 'TrendingUp', iconBg: '#ecfeff', iconColor: '#0891b2',
    category: 'switch', title: 'Salary Growth Seekers',
    desc: 'Targeting 40–70% growth? Designed specifically for aggressive career jumps.',
    badge: 'Max Impact', badgeColor: '#0891b2',
    stats: [{ label: 'Placements/mo', value: '10+' }, { label: 'Avg Hike', value: '58%' }, { label: 'Time to Offer', value: '16 days' }],
  },
];

const DEFAULT_STEPS = [
  { num: 1, icon: 'Phone',         title: 'Free Discovery Call',           badge: 'Free',        desc: '15-min call to review your profile and set clear growth goals.',              tags: ['15 min', 'Zero Cost'] },
  { num: 2, icon: 'Search',        title: 'Deep Profile Assessment',       badge: 'Foundation',  desc: 'Uncover strengths, target roles, and map your tailored strategy.',             tags: ['45 min', 'Roadmap'] },
  { num: 3, icon: 'FileSignature', title: 'Service Agreement Sign',        badge: 'Transparent', desc: '100% digital agreement with zero upfront hidden terms.',                      tags: ['Digital', '0 Upfront'] },
  { num: 4, icon: 'FileText',      title: 'Resume & LinkedIn Rebuild',     badge: 'Core',        desc: 'ATS-optimized resume + LinkedIn overhaul ready in 48 hours.',                 tags: ['1–2 Days', 'ATS Clean'] },
  { num: 5, icon: 'Mic2',          title: 'Interview Mastery — 3 Rounds',  badge: 'Edge',        desc: 'HR round, technical prep, and salary negotiation scripting.',                 tags: ['3 Mock Sessions', 'Scripted'] },
  { num: 6, icon: 'Handshake',     title: 'Direct Employer Connect',       badge: 'Active',      desc: 'Warm introductions to 10–15 target hiring managers.',                        tags: ['10–15 Companies', 'Direct'] },
  { num: 7, icon: 'PartyPopper',   title: 'Offer Signed — Success Share!', badge: 'Complete',    desc: 'Joined new role with higher CTC. Pay success fee only now.',                  tags: ['12% Share', 'Post Offer'] },
];

const DEFAULT_LIVE_ACTIVITY = [
  '🎉 Ankit R. placed at WNS — ₹6.4L CTC',
  '⚡ Priya S. completed Interview Mastery',
  '🚀 47 candidates in active hiring connect',
  '✅ Rohit K. signed offer at EXL — 52% hike',
  '📄 ATS Resume rebuilt for Simran K.',
  '🎯 Vikram T. landed Sr. Analyst — 9 days flat',
];

const DEFAULT_STATS = [
  { num: '300+', label: 'Placed' },
  { num: '60%+', label: 'Avg Hike' },
  { num: '9 Days', label: 'Fastest Offer' },
  { num: '₹0', label: 'Upfront' },
];

const DEFAULT_SHARE_TABLE = [
  { ctc: '₹3,00,000',  fee: '₹36,000',   net: '₹2.64L+', roi: '7x ROI' },
  { ctc: '₹4,50,000',  fee: '₹54,000',   net: '₹3.96L+', roi: '7x ROI' },
  { ctc: '₹6,00,000',  fee: '₹72,000',   net: '₹5.28L+', roi: '8x ROI' },
  { ctc: '₹8,00,000',  fee: '₹96,000',   net: '₹7.04L+', roi: '8x ROI' },
  { ctc: '₹10,00,000', fee: '₹1,20,000', net: '₹8.8L+',  roi: '9x ROI' },
];

/* ════════════════════════════════════════════════════════════
   Reusable Server Primitives
════════════════════════════════════════════════════════════ */
function GradientText({
  children,
  tag: Tag = 'span',
  style = {},
}: {
  children: React.ReactNode;
  tag?: 'h1' | 'h2' | 'span';
  style?: React.CSSProperties;
}) {
  return (
    <Tag
      style={{
        backgroundImage: `linear-gradient(270deg, ${G.blue}, ${G.indigo}, ${G.orange}, ${G.rose}, ${G.purple}, ${G.blue})`,
        backgroundSize: '300% 300%',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        backgroundClip: 'text',
        animation: 'cap-grad 6s ease infinite',
        display: 'inline-block',
        ...style,
      }}
    >
      {children}
    </Tag>
  );
}

function SectionLabel({
  text,
  center = false,
  light = false,
}: {
  text: string;
  center?: boolean;
  light?: boolean;
}) {
  return (
    <div
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '6px',
        fontSize: '10.5px',
        fontWeight: 800,
        letterSpacing: '0.12em',
        textTransform: 'uppercase',
        marginBottom: '8px',
        justifyContent: center ? 'center' : 'flex-start',
        width: center ? '100%' : 'auto',
      }}
    >
      <span style={{ width: '18px', height: '2.5px', borderRadius: '999px', background: `linear-gradient(90deg, ${G.blue}, ${G.orange})` }} />
      <span
        style={
          light
            ? { color: 'rgba(255,255,255,0.5)' }
            : {
                backgroundImage: `linear-gradient(90deg, ${G.blue}, ${G.indigo})`,
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }
        }
      >
        {text}
      </span>
      <span style={{ width: '18px', height: '2.5px', borderRadius: '999px', background: `linear-gradient(90deg, ${G.orange}, ${G.blue})` }} />
    </div>
  );
}

function AmbientBlobs() {
  return (
    <>
      <div aria-hidden className="cap-blob cap-blob-blue" />
      <div aria-hidden className="cap-blob cap-blob-orange" />
    </>
  );
}

/* ════════════════════════════════════════════════════════════
   PAGE
════════════════════════════════════════════════════════════ */
export default async function CapPage() {
  const cmsMap = await getCmsMap('cap:');
  const cms = parseCmsJson<CapCmsData>(cmsMap, 'cap:data', {});

  /* ── Hero ── */
  const hero = {
    tag:              cms.hero?.tag              ?? 'Career Assistance Programme',
    titlePlain:       cms.hero?.titlePlain       ?? 'Not Just a Job.',
    titleGradient:    cms.hero?.titleGradient    ?? 'A Career Transformation.',
    subtitle:         cms.hero?.subtitle         ?? "Placedly's flagship programme for BPO, Healthcare Claims, Insurance & Finance professionals aiming for 40%+ CTC jumps.",
    ctaText:          cms.hero?.ctaText          ?? 'Apply to CAP Now',
    ctaLink:          cms.hero?.ctaLink          ?? '/cap/apply',
    secondaryCtaText: cms.hero?.secondaryCtaText ?? 'See the Journey',
    secondaryCtaLink: cms.hero?.secondaryCtaLink ?? '#how-it-works',
  };

  /* ── Live activity ── */
  const liveActivity =
    cms.liveActivity && cms.liveActivity.length > 0
      ? cms.liveActivity
      : DEFAULT_LIVE_ACTIVITY;

  /* ── Hero stats ── */
  const heroStats =
    cms.stats && cms.stats.length > 0
      ? cms.stats.map((s) => ({ num: s.value ?? '', label: s.label ?? '' }))
      : DEFAULT_STATS;

  /* ── Included ── */
  const included = {
    heading:         cms.included?.heading         ?? 'Everything You Get',
    headingGradient: cms.included?.headingGradient ?? 'in the CAP',
    body:            cms.included?.body            ?? 'A complete, end-to-end career acceleration system.',
    benefits:        cms.included?.benefits && cms.included.benefits.length > 0
                       ? cms.included.benefits
                       : DEFAULT_BENEFITS,
    ctaText: cms.included?.ctaText ?? 'Apply Now — Zero Upfront',
    ctaLink: cms.included?.ctaLink ?? '/cap/apply',
  };

  /* ── Success share ── */
  const sharePercent  = cms.successShare?.percent    ?? 12;
  const calcDefault   = cms.successShare?.calcDefault ?? 500000;
  const successShare  = {
    title:       cms.successShare?.title    ?? 'Success-Share Model',
    subtitle:    cms.successShare?.subtitle ?? 'Zero upfront cost. Pay 12% of CTC only after offer letter.',
    percent:     sharePercent,
    note:        cms.successShare?.note     ?? `* ${sharePercent}% Success Share of annual CTC. GST receipt provided.`,
    calcMin:     cms.successShare?.calcMin  ?? 200000,
    calcMax:     cms.successShare?.calcMax  ?? 2000000,
    calcDefault,
  };

  const initFee = Math.round(calcDefault * (sharePercent / 100));
  const initNet = calcDefault - initFee;
  const initRoi = initFee > 0 ? Math.max(1, Math.round(initNet / initFee)) : 0;
  const fmtINR  = (n: number) => '₹' + Math.round(n).toLocaleString('en-IN');
  const fmtLakh = (n: number) => '₹' + (n / 100000).toFixed(2).replace(/\.00$/, '') + 'L';

  /* ── Share table ── */
  const shareTable =
    cms.shareTable && cms.shareTable.length > 0
      ? cms.shareTable
      : DEFAULT_SHARE_TABLE;

  /* ── Domains ── */
  const rawDomains =
    cms.domains && cms.domains.length > 0 ? cms.domains : DEFAULT_DOMAINS;

  const mergedDomains = rawDomains.map((d, i) => {
    const def = DEFAULT_DOMAINS[i % DEFAULT_DOMAINS.length];
    return {
      Icon:       resolveIcon(d.icon, resolveIcon(def.icon, Briefcase)),
      iconBg:     d.iconBg     ?? def.iconBg,
      iconColor:  d.iconColor  ?? def.iconColor,
      category:   d.category   ?? def.category ?? 'all',
      title:      d.title      ?? def.title,
      desc:       d.desc       ?? def.desc,
      badge:      d.badge      ?? def.badge,
      badgeColor: d.badgeColor ?? def.badgeColor,
      stats:
        d.stats && d.stats.length > 0
          ? d.stats.map((s) => ({ label: s.label ?? '', value: s.value ?? '' }))
          : def.stats,
    };
  });

  /* ── Steps ── */
  const mergedSteps = DEFAULT_STEPS.map((step, i) => {
    const match =
      cms.steps?.find((s) => s.number === step.num || s.id === step.num) ??
      cms.steps?.[i];
    return {
      num:   match?.number ?? step.num,
      Icon:  resolveIcon(match?.icon, resolveIcon(step.icon, Phone)),
      title: match?.title ?? step.title,
      badge: match?.badge ?? step.badge,
      desc:  match?.desc  ?? step.desc,
      tags:  match?.tags && match.tags.length > 0 ? match.tags : step.tags,
    };
  });

  /* ── Journey heading — FIX: was undefined before ── */
  const journey = {
    heading:         cms.journey?.heading         ?? 'Your 7-Step',
    headingGradient: cms.journey?.headingGradient ?? 'Career Roadmap',
  };

  /* ── CTA ── */
  const cta = {
    title:          cms.cta?.title          ?? 'Ready to Transform Your Career?',
    body:           cms.cta?.body           ?? 'Zero upfront. Pay only after you succeed.',
    primaryText:    cms.cta?.primaryText    ?? 'Apply to CAP Now',
    primaryLink:    cms.cta?.primaryLink    ?? '/cap/apply',
    whatsappNumber: cms.cta?.whatsappNumber ?? '919876543210',
    whatsappText:   cms.cta?.whatsappText   ?? 'WhatsApp Us',
  };

  /* ── Sticky CTA ── */
  const stickyCta = {
    title:    cms.stickyCta?.title    ?? 'Ready to grow?',
    subtitle: cms.stickyCta?.subtitle ?? 'Zero upfront — pay after offer.',
    ctaText:  cms.stickyCta?.ctaText  ?? 'Apply Now',
    ctaLink:  cms.stickyCta?.ctaLink  ?? '/cap/apply',
  };

  /* ═══════════════════════════════════════════
     RENDER
  ═══════════════════════════════════════════ */
  return (
    <PageLayout>

      {/* ════ SCROLL PROGRESS ════ */}
      <div className="cap-progress-track" aria-hidden>
        <div className="cap-progress-fill" data-scroll-progress />
      </div>

      {/* ════ HERO ════ */}
      <section className="cap-hero">
        <AmbientBlobs />
        <div className="container" style={{ position: 'relative', zIndex: 1 }}>

          {/* Breadcrumb */}
          <nav className="cap-breadcrumb reveal" data-reveal aria-label="Breadcrumb">
            <a href="/">Home</a>
            <span className="cap-sep">›</span>
            <span className="cap-current">CAP</span>
          </nav>

          <div style={{ maxWidth: '720px' }}>
            <div className="reveal" data-reveal>
              <SectionLabel text={hero.tag} />
            </div>

            <h1 className="cap-h1 reveal" data-reveal data-delay="0.04">
              {hero.titlePlain}{' '}
              <GradientText tag="span" style={{ display: 'inline' }}>
                {hero.titleGradient}
              </GradientText>
            </h1>

            <p className="cap-lead reveal" data-reveal data-delay="0.08">
              {hero.subtitle}
            </p>

            {/* Live ticker */}
            <div className="cap-ticker reveal" data-reveal data-delay="0.12">
              <span className="cap-ticker-live">
                <span className="cap-ticker-dot" /> LIVE
              </span>
              <span className="cap-ticker-text" data-ticker-text>
                {liveActivity[0]}
              </span>
            </div>

            <div className="reveal" data-reveal data-delay="0.16">
              <div className="cap-btn-row">
                <a href={hero.ctaLink} className="cap-btn cap-btn-primary" data-magnetic>
                  <Rocket size={14} /> {hero.ctaText}
                  <span className="cap-arrow"><ArrowRight size={13} /></span>
                </a>
                <a href={hero.secondaryCtaLink} className="cap-btn cap-btn-ghost">
                  {hero.secondaryCtaText}
                </a>
              </div>
            </div>
          </div>

          {/* Stats strip */}
          <div className="cap-stats-4">
            {heroStats.map((s, i) => (
              <div
                key={`stat-${i}`}
                className="cap-stat-cell reveal"
                data-reveal
                data-delay={`${i * 0.04}`}
                data-stat-cell
                style={{ borderRight: i < heroStats.length - 1 ? '1px solid #eef2ff' : 'none' }}
              >
                <div
                  className="cap-stat-num"
                  data-countup={s.num}
                  style={{
                    backgroundImage: `linear-gradient(135deg, ${DOT_COLORS[i % DOT_COLORS.length]}, ${G.indigo})`,
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                  }}
                >
                  {s.num}
                </div>
                <div className="cap-stat-label">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ════ WHAT YOU GET + CALCULATOR ════ */}
      <section className="cap-section" style={{ background: '#fff' }}>
        <div className="container">
          <div className="cap-two-col">

            {/* Left: Benefits */}
            <div className="reveal" data-reveal>
              <SectionLabel text="What's Included" />
              <h2 className="cap-h2">
                {included.heading}{' '}
                <GradientText tag="span">{included.headingGradient}</GradientText>
              </h2>
              <p className="cap-body">{included.body}</p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                {included.benefits.map((b, i) => (
                  <div
                    key={`benefit-${i}`}
                    className="cap-benefit reveal"
                    data-reveal
                    data-delay={`${0.04 + i * 0.03}`}
                  >
                    <CheckCircle2
                      size={15}
                      color={G.blue}
                      style={{ flexShrink: 0, marginTop: '2px' }}
                    />
                    <span>{b}</span>
                  </div>
                ))}
              </div>

              <div style={{ marginTop: '16px' }}>
                <a href={included.ctaLink} className="cap-btn cap-btn-primary" data-magnetic>
                  {included.ctaText}
                  <span className="cap-arrow"><ArrowRight size={13} /></span>
                </a>
              </div>
            </div>

            {/* Right: Success-Share Card + Slider Calculator */}
            <div className="cap-share-card reveal" data-reveal data-delay="0.1">
              <div aria-hidden className="cap-share-orb" />

              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px', position: 'relative', zIndex: 1 }}>
                <TrendingUp size={18} color={G.orange} />
                <div style={{ fontSize: '16px', fontWeight: 800 }}>{successShare.title}</div>
              </div>
              <p style={{ fontSize: '12.5px', color: 'rgba(255,255,255,0.65)', lineHeight: 1.5, marginBottom: '12px', position: 'relative', zIndex: 1 }}>
                {successShare.subtitle}
              </p>

              {/* Calculator */}
              <div className="cap-calc" style={{ position: 'relative', zIndex: 5 }}>
                <div className="cap-calc-head">
                  <Calculator size={12} color={G.orange} />
                  <span>Drag slider to calculate CTC ROI</span>
                </div>

                <div className="cap-calc-value-row">
                  <span>Target CTC</span>
                  <span className="cap-calc-ctc-display" data-ctc-value>
                    {fmtINR(successShare.calcDefault)}
                  </span>
                </div>

                <input
                  type="range"
                  min={successShare.calcMin}
                  max={successShare.calcMax}
                  step={10000}
                  defaultValue={successShare.calcDefault}
                  className="cap-calc-range"
                  data-ctc-slider
                  data-share-percent={sharePercent}
                  aria-label="Annual CTC"
                />

                <div className="cap-calc-results">
                  <div className="cap-calc-result">
                    <span className="cap-calc-result-k">Fee ({sharePercent}%)</span>
                    <span className="cap-calc-result-v" style={{ color: G.orange }} data-ctc-fee>
                      {fmtINR(initFee)}
                    </span>
                  </div>
                  <div className="cap-calc-result">
                    <span className="cap-calc-result-k">Net Gain</span>
                    <span className="cap-calc-result-v" style={{ color: '#4ade80' }} data-ctc-net>
                      {fmtLakh(initNet)}
                    </span>
                  </div>
                  <div className="cap-calc-result">
                    <span className="cap-calc-result-k">Return</span>
                    <span className="cap-calc-result-v" style={{ color: '#fff' }} data-ctc-roi>
                      {initRoi}x ROI
                    </span>
                  </div>
                </div>
              </div>

              {/* Share table */}
              <table
                className="cap-share-table"
                style={{ position: 'relative', zIndex: 1, marginTop: '12px' }}
              >
                <thead>
                  <tr>
                    {['Annual CTC', 'Fee', 'Your Net Gain'].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {shareTable.map((row, i) => {
                    const ctcNum = parseInt(row.ctc.replace(/[^\d]/g, ''), 10) || 0;
                    return (
                      <tr
                        key={`row-${i}`}
                        className="cap-share-row"
                        data-ctc-row
                        data-ctc-num={ctcNum}
                      >
                        <td style={{ fontWeight: 600, color: '#fff' }}>{row.ctc}</td>
                        <td style={{ color: G.orange }}>{row.fee}</td>
                        <td>
                          <span style={{ color: '#4ade80', fontWeight: 700 }}>{row.net}</span>
                          <span className="cap-roi-badge">{row.roi}</span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>

              <p style={{ fontSize: '10px', color: 'rgba(255,255,255,0.35)', marginTop: '10px', position: 'relative', zIndex: 1 }}>
                {successShare.note}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ════ DOMAINS ════ */}
      <section
        className="cap-section"
        style={{ background: '#f8faff', position: 'relative', overflow: 'hidden' }}
      >
        <AmbientBlobs />
        <div className="container" style={{ position: 'relative', zIndex: 1 }}>

          <div className="cap-center reveal" data-reveal>
            <SectionLabel text="Specialist Networks" center />
            <h2 className="cap-h2">
              Target <GradientText tag="span">Specialist Domains</GradientText>
            </h2>
            <p className="cap-body" style={{ margin: '0 auto', textAlign: 'center', maxWidth: '420px' }}>
              Filter by industry or tap any card to flip for placement metrics.
            </p>
          </div>

          {/* Filter pills */}
          <div className="cap-domain-filters reveal" data-reveal>
            {[
              { id: 'all',     label: 'All Domains' },
              { id: 'health',  label: 'Healthcare & Ins' },
              { id: 'ops',     label: 'BPO & Ops' },
              { id: 'finance', label: 'Finance' },
              { id: 'switch',  label: 'Switchers & Growth' },
            ].map((f) => (
              <button
                key={f.id}
                type="button"
                className={`cap-filter-pill${f.id === 'all' ? ' is-active' : ''}`}
                data-domain-filter={f.id}
              >
                {f.label}
              </button>
            ))}
          </div>

          {/* Domain cards */}
          <div className="cap-domains-3">
            {mergedDomains.map((d, i) => (
              <div
                key={`domain-${i}`}
                className="cap-flip-outer reveal"
                data-reveal
                data-delay={`${i * 0.04}`}
                data-domain-category={d.category}
              >
                <div
                  className="cap-flip-card"
                  tabIndex={0}
                  role="button"
                  aria-label={`Flip card: ${d.title}`}
                  data-flip-card
                >
                  <div className="cap-flip-inner" data-flip-inner>

                    {/* Front */}
                    <div
                      className="cap-domain-card cap-flip-face"
                      data-spotlight-card
                      style={{ '--accent': d.iconColor } as React.CSSProperties}
                    >
                      <div
                        className="cap-domain-glow"
                        style={{ background: `linear-gradient(135deg, ${d.iconColor}, ${G.orange})` }}
                      />
                      <div
                        className="cap-domain-spotlight"
                        data-spotlight
                        style={{
                          background: `radial-gradient(240px circle at var(--mx,50%) var(--my,50%), ${d.iconColor}14, transparent 60%)`,
                        }}
                      />
                      <div
                        className="cap-domain-strip"
                        style={{ background: `linear-gradient(90deg, ${d.iconColor}, ${G.indigo})` }}
                      />

                      <div className="cap-domain-top">
                        <div className="cap-domain-icon" style={{ background: d.iconBg }}>
                          <d.Icon size={16} color={d.iconColor} />
                        </div>
                        <div
                          className="cap-domain-badge"
                          style={{
                            background: `${d.badgeColor}12`,
                            border: `1px solid ${d.badgeColor}30`,
                            color: d.badgeColor,
                          }}
                        >
                          {d.badge}
                        </div>
                      </div>

                      <div className="cap-domain-title">{d.title}</div>
                      <div className="cap-domain-desc">{d.desc}</div>
                      <div className="cap-flip-hint">
                        <Zap size={10} /> Tap for stats
                      </div>
                    </div>

                    {/* Back */}
                    <div
                      className="cap-domain-card cap-flip-face cap-flip-back"
                      style={{ background: `linear-gradient(160deg, ${d.iconColor}, #0b0d20)` }}
                    >
                      <div className="cap-domain-back-title">{d.title}</div>
                      <div className="cap-domain-back-stats">
                        {d.stats.map((s, si) => (
                          <div key={`stat-${si}`} className="cap-domain-back-stat">
                            <span className="cap-domain-back-v">{s.value}</span>
                            <span className="cap-domain-back-k">{s.label}</span>
                          </div>
                        ))}
                      </div>
                      <a href={hero.ctaLink} className="cap-domain-back-cta">
                        Connect <ArrowRight size={12} />
                      </a>
                    </div>

                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ════ THE JOURNEY ════ */}
      <section
        className="cap-section"
        id="how-it-works"
        style={{ background: '#fff', position: 'relative', overflow: 'hidden' }}
      >
        <div aria-hidden className="cap-blob cap-blob-blue" style={{ top: '10%', left: '-160px' }} />

        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <div className="cap-center reveal" data-reveal>
            <SectionLabel text="The Roadmap" center />
            {/* FIX: journey is now properly defined above */}
            <h2 className="cap-h2">
              {journey.heading}{' '}
              <GradientText tag="span">{journey.headingGradient}</GradientText>
            </h2>
          </div>

          {/* Autoplay controls */}
          <div className="cap-journey-controls reveal" data-reveal>
            <button
              type="button"
              className="cap-play-btn"
              data-journey-play
              aria-label="Auto play step journey"
            >
              <span data-play-icon><Play size={12} /></span>
              <span data-play-label>Auto-Play Journey</span>
            </button>
            <span className="cap-journey-progress-text" data-journey-progress-text>
              Step 1 of {mergedSteps.length} · 14% complete
            </span>
          </div>

          {/* Step nav pills */}
          <div className="cap-step-nav reveal" data-reveal>
            {mergedSteps.map((step, i) => (
              <button
                key={`pill-${step.num}`}
                type="button"
                className={`cap-step-pill${i === 0 ? ' is-active' : ''}`}
                data-step-pill={i}
                style={{ '--pill-color': DOT_COLORS[i % DOT_COLORS.length] } as React.CSSProperties}
              >
                <span className="cap-step-pill-num">{step.num}</span>
                <span className="cap-step-pill-label">
                  {step.title.split(' ').slice(0, 2).join(' ')}
                </span>
              </button>
            ))}
          </div>

          {/* Journey timeline */}
          <div className="cap-journey" data-journey-track>
            <div className="cap-journey-rail" />
            <div className="cap-journey-rail-fill" data-journey-fill />

            {mergedSteps.map((step, i) => {
              const col    = DOT_COLORS[i % DOT_COLORS.length];
              const isLast = i === mergedSteps.length - 1;
              return (
                <div
                  key={`step-${step.num}`}
                  className={`cap-journey-item reveal${i === 0 ? ' is-open is-active' : ''}`}
                  data-reveal
                  data-journey-step={i}
                  data-delay={`${i * 0.04}`}
                >
                  <div className="cap-journey-dot-wrap">
                    <div className="cap-journey-dot-pulse" style={{ background: col }} />
                    <div
                      className="cap-journey-dot"
                      style={{ background: `linear-gradient(135deg, ${col}, ${G.indigo})` }}
                    >
                      {step.num}
                    </div>
                  </div>

                  <div className={`cap-journey-card${isLast ? ' cap-journey-card-final' : ''}`}>
                    <div
                      className="cap-journey-card-glow"
                      style={{ background: `linear-gradient(135deg, ${col}, ${G.orange})` }}
                    />

                    <button
                      type="button"
                      className="cap-journey-card-head"
                      data-journey-toggle
                      aria-expanded={i === 0 ? 'true' : 'false'}
                    >
                      <div className="cap-journey-icon" style={{ background: `${col}15` }}>
                        <step.Icon size={15} color={col} />
                      </div>
                      <span className="cap-journey-title">{step.title}</span>
                      <span
                        className="cap-journey-badge"
                        style={{
                          background: `${col}12`,
                          color: col,
                          border: `1px solid ${col}30`,
                        }}
                      >
                        {step.badge}
                      </span>
                      <span className="cap-journey-chevron" aria-hidden>▾</span>
                    </button>

                    <div className="cap-journey-body" role="region">
                      <div className="cap-journey-body-inner">
                        <p className="cap-journey-desc">{step.desc}</p>
                        <div className="cap-journey-tags">
                          {step.tags.map((tag, ti) => (
                            <span key={`tag-${ti}`} className="cap-journey-tag">{tag}</span>
                          ))}
                        </div>
                      </div>
                    </div>

                    {isLast && (
                      <div className="cap-journey-sparkle">
                        <Sparkles size={14} color={G.orange} />
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ════ CTA ════ */}
      <section className="cap-section" style={{ background: '#fff' }}>
        <div className="container">
          <div className="cap-cta reveal" data-reveal>
            <div className="cap-cta-orb cap-cta-orb-blue" />
            <div className="cap-cta-orb cap-cta-orb-orange" />
            <div style={{ position: 'relative', zIndex: 1 }}>
              <SectionLabel text="Take Action" center light />
              <h2 className="cap-cta-h2">
                <GradientText tag="span">{cta.title}</GradientText>
              </h2>
              <p className="cap-cta-body">{cta.body}</p>
              <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', justifyContent: 'center' }}>
                <a href={cta.primaryLink} className="cap-btn cap-btn-warm" data-magnetic>
                  <Rocket size={14} /> {cta.primaryText}
                  <span className="cap-arrow"><ArrowRight size={13} /></span>
                </a>
                <a
                  href={`https://wa.me/${cta.whatsappNumber}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="cap-btn cap-btn-ghost-dark"
                >
                  <MessageCircle size={14} /> {cta.whatsappText}
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ════ STICKY BAR ════ */}
      <div className="cap-sticky-cta" data-sticky-cta aria-live="polite">
        <div className="cap-sticky-cta-inner">
          <div className="cap-sticky-cta-text">
            <strong>{stickyCta.title}</strong>
            <span>{stickyCta.subtitle}</span>
          </div>
          <div className="cap-sticky-cta-actions">
            <a
              href={stickyCta.ctaLink}
              className="cap-btn cap-btn-primary"
              style={{ padding: '8px 18px', fontSize: '12.5px' }}
            >
              {stickyCta.ctaText} <ArrowRight size={12} />
            </a>
            <button
              type="button"
              className="cap-sticky-dismiss"
              data-sticky-dismiss
              aria-label="Dismiss banner"
            >
              <X size={14} />
            </button>
          </div>
        </div>
      </div>

      {/* ════ STYLES ════ */}
      <style>{`
        /* ── Keyframes ── */
        @keyframes cap-grad        { 0%{background-position:0% 50%} 50%{background-position:100% 50%} 100%{background-position:0% 50%} }
        @keyframes cap-blob-a      { 0%,100%{transform:translate(0,0)} 50%{transform:translate(20px,15px)} }
        @keyframes cap-blob-b      { 0%,100%{transform:translate(0,0)} 50%{transform:translate(-15px,-10px)} }
        @keyframes cap-arrow-bounce{ 0%,100%{transform:translateX(0)} 50%{transform:translateX(3px)} }
        @keyframes cap-pulse-ring  { 0%{transform:scale(1);opacity:.5} 70%{transform:scale(1.8);opacity:0} 100%{transform:scale(1.8);opacity:0} }
        @keyframes cap-ticker-dot-pulse { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:.4;transform:scale(1.2)} }
        @keyframes cap-fade-slide  { from{opacity:0;transform:translateY(3px)} to{opacity:1;transform:translateY(0)} }

        /* FIX: was referenced in CSS but never defined */
        @keyframes cap-row-in      { from{opacity:0;transform:translateX(-6px)} to{opacity:1;transform:translateX(0)} }

        /* ── Reveal utility ── */
        .reveal { opacity:0; transform:translateY(18px); transition:opacity .4s cubic-bezier(.22,1,.36,1), transform .4s cubic-bezier(.22,1,.36,1); }
        .reveal.is-visible { opacity:1; transform:translateY(0); }

        /* ── Scroll progress ── */
        .cap-progress-track { position:fixed; top:0; left:0; right:0; height:3px; background:transparent; z-index:9999; pointer-events:none; }
        .cap-progress-fill  { height:100%; width:0%; background:linear-gradient(90deg,${G.blue},${G.purple},${G.orange}); transition:width .1s linear; }

        /* ── Ambient blobs ── */
        .cap-blob        { position:absolute; border-radius:50%; pointer-events:none; }
        .cap-blob-blue   { top:-100px; left:-100px; width:400px; height:400px; background:radial-gradient(circle,${G.blue}1e 0%,transparent 70%); filter:blur(90px); animation:cap-blob-a 14s ease-in-out infinite; }
        .cap-blob-orange { top:15%; right:-120px; width:340px; height:340px; background:radial-gradient(circle,${G.orange}1a 0%,transparent 70%); filter:blur(90px); animation:cap-blob-b 16s ease-in-out infinite 1s; }

        /* ── Hero ── */
        .cap-hero       { position:relative; padding:calc(18px + 56px) 0 0; overflow:hidden; background:#fafbff; }
        .cap-breadcrumb { display:flex; align-items:center; gap:5px; font-size:12px; color:#94a3b8; margin-bottom:10px; }
        .cap-breadcrumb a { color:#94a3b8; text-decoration:none; }
        .cap-breadcrumb a:hover { color:${G.blue}; }
        .cap-sep     { color:#cbd5e1; }
        .cap-current { color:#475569; font-weight:500; }

        /* ── Typography ── */
        .cap-h1  { font-size:clamp(1.9rem,3.8vw,3rem); font-weight:900; line-height:1.1; letter-spacing:-1px; color:#0b0d20; margin-bottom:10px; }
        .cap-h2  { font-size:clamp(1.5rem,2.5vw,2.1rem); font-weight:900; color:#0b0d20; line-height:1.14; letter-spacing:-0.5px; margin-bottom:8px; }
        .cap-lead{ font-size:14.5px; color:#64748b; line-height:1.65; max-width:520px; margin-bottom:12px; }
        .cap-body{ font-size:13.5px; color:#64748b; line-height:1.65; margin-bottom:12px; }

        /* ── Live ticker ── */
        .cap-ticker      { display:inline-flex; align-items:center; gap:8px; background:#fff; border:1px solid #e2e8f0; border-radius:999px; padding:5px 12px 5px 6px; margin-bottom:12px; box-shadow:0 2px 8px rgba(0,0,0,.04); max-width:100%; overflow:hidden; }
        .cap-ticker-live { display:inline-flex; align-items:center; gap:4px; font-size:9.5px; font-weight:800; color:#ef4444; background:#fef2f2; padding:2px 6px; border-radius:999px; flex-shrink:0; }
        .cap-ticker-dot  { width:5px; height:5px; border-radius:50%; background:#ef4444; animation:cap-ticker-dot-pulse 1.4s ease-in-out infinite; }
        .cap-ticker-text { font-size:11.5px; font-weight:600; color:#374151; white-space:nowrap; overflow:hidden; text-overflow:ellipsis; animation:cap-fade-slide .4s ease; }

        /* ── Buttons ── */
        .cap-btn-row { display:flex; gap:10px; flex-wrap:wrap; margin-bottom:24px; }
        .cap-btn { display:inline-flex; align-items:center; gap:6px; font-weight:700; font-size:13px; padding:10px 22px; border-radius:999px; text-decoration:none; transition:transform .15s ease, box-shadow .2s ease; border:none; cursor:pointer; font-family:inherit; }
        .cap-btn:hover { transform:translateY(-2px); }
        .cap-btn-primary    { background-image:linear-gradient(135deg,${G.blue},${G.indigo}); color:#fff; box-shadow:0 6px 18px ${G.blue}30; }
        .cap-btn-warm       { background-image:linear-gradient(135deg,${G.orange},${G.rose}); color:#fff; box-shadow:0 6px 18px ${G.orange}35; }
        .cap-btn-ghost      { background:#fff; color:#374151; border:1.5px solid #e2e8f0; box-shadow:0 2px 6px rgba(0,0,0,.04); }
        .cap-btn-ghost:hover{ border-color:${G.blue}; }
        .cap-btn-ghost-dark { background:transparent; color:#fff; border:1.5px solid rgba(255,255,255,.25); }
        .cap-btn-ghost-dark:hover { border-color:rgba(255,255,255,.5); }
        .cap-arrow { display:inline-flex; animation:cap-arrow-bounce 1.3s ease-in-out infinite; }

        /* ── Stats strip — FIX: added grid-template-columns ── */
        .cap-stats-4     { display:grid; grid-template-columns:repeat(4,1fr); border-top:1px solid #eef2ff; }
        .cap-stat-cell   { text-align:center; padding:12px 10px; background:#fafbff; transition:background .25s ease; cursor:default; }
        .cap-stat-cell:hover { background:#fff; }
        .cap-stat-num    { font-size:1.5rem; font-weight:900; line-height:1; margin-bottom:2px; transition:transform .2s ease; }
        .cap-stat-cell:hover .cap-stat-num { transform:scale(1.05); }
        .cap-stat-label  { font-size:11px; color:#94a3b8; font-weight:600; }

        /* ── Sections ── */
        .cap-section { padding:clamp(24px,4vw,44px) 0; }
        .cap-center  { text-align:center; margin-bottom:18px; }
        .cap-two-col { display:grid; grid-template-columns:1fr 1fr; gap:24px; align-items:start; }

        /* ── Benefit rows ── */
        .cap-benefit { display:flex; align-items:flex-start; gap:8px; padding:5px 6px; border-radius:8px; transition:background .2s ease, transform .2s ease; }
        .cap-benefit:hover { background:#f0f6ff; transform:translateX(3px); }
        .cap-benefit span { font-size:13px; color:#374151; line-height:1.45; }

        /* ── Success-share card ── */
        .cap-share-card { position:relative; overflow:hidden; background:linear-gradient(160deg,#0b0d20 0%,#14163a 100%); border-radius:18px; color:#fff; padding:20px; transition:transform .25s ease, box-shadow .25s ease; }
        .cap-share-card:hover { transform:translateY(-3px); box-shadow:0 16px 36px rgba(0,0,0,.25); }
        .cap-share-orb  { position:absolute; top:-50px; right:-50px; width:200px; height:200px; border-radius:50%; background:radial-gradient(circle,${G.blue}30 0%,transparent 70%); pointer-events:none; }

        /* ── Calculator ── */
        .cap-calc { background:rgba(255,255,255,0.05); border:1px solid rgba(255,255,255,0.1); border-radius:12px; padding:12px; }
        .cap-calc-head { display:flex; align-items:center; gap:5px; font-size:10px; font-weight:700; color:rgba(255,255,255,0.6); text-transform:uppercase; letter-spacing:.4px; margin-bottom:8px; }
        .cap-calc-value-row { display:flex; justify-content:space-between; align-items:baseline; margin-bottom:6px; }
        .cap-calc-value-row span:first-child { font-size:11px; color:rgba(255,255,255,0.5); font-weight:600; }
        .cap-calc-ctc-display { font-size:17px; font-weight:900; color:#fff; }

        /* ── Slider — fully unblocked ── */
        .cap-calc-range { position:relative; z-index:50; width:100%; -webkit-appearance:none; appearance:none; height:6px; border-radius:99px; background:linear-gradient(90deg,${G.blue},${G.orange}); outline:none; margin-bottom:10px; cursor:grab; touch-action:none; pointer-events:auto !important; display:block; }
        .cap-calc-range:active { cursor:grabbing; }
        .cap-calc-range::-webkit-slider-thumb { -webkit-appearance:none; appearance:none; width:22px; height:22px; border-radius:50%; background:#fff; border:3px solid ${G.blue}; box-shadow:0 2px 8px rgba(0,0,0,.4); cursor:grab; transition:transform .15s ease; }
        .cap-calc-range:active::-webkit-slider-thumb { cursor:grabbing; transform:scale(1.2); }
        .cap-calc-range::-moz-range-thumb { width:22px; height:22px; border-radius:50%; background:#fff; border:3px solid ${G.blue}; cursor:grab; }

        .cap-calc-results { display:grid; grid-template-columns:repeat(3,1fr); gap:6px; }
        .cap-calc-result   { background:rgba(255,255,255,0.04); border-radius:8px; padding:6px 4px; text-align:center; }
        .cap-calc-result-k { display:block; font-size:8.5px; font-weight:700; color:rgba(255,255,255,0.4); text-transform:uppercase; letter-spacing:.3px; margin-bottom:2px; }
        .cap-calc-result-v { display:block; font-size:12.5px; font-weight:800; }

        /* ── Share table ── */
        .cap-share-table { width:100%; border-collapse:collapse; font-size:11.5px; }
        .cap-share-table th { padding:6px 4px; text-align:left; color:rgba(255,255,255,.45); font-weight:600; font-size:10px; text-transform:uppercase; border-bottom:1px solid rgba(255,255,255,.12); }

        /* FIX: cap-row-in now defined above */
        .cap-share-row { border-bottom:1px solid rgba(255,255,255,.06); opacity:0; animation:cap-row-in .4s ease forwards; transition:background .2s ease; }
        .cap-share-row.is-highlighted { background:rgba(37,99,235,0.22); box-shadow:inset 0 0 0 1px ${G.blue}; }
        .cap-share-row td { padding:7px 4px; }
        .cap-roi-badge { margin-left:4px; background:rgba(74,222,128,.12); color:#4ade80; border:1px solid rgba(74,222,128,.2); border-radius:999px; padding:1px 5px; font-size:9.5px; font-weight:700; }

        /* ── Domain filter pills ── */
        .cap-domain-filters { display:flex; gap:6px; flex-wrap:wrap; justify-content:center; margin-bottom:14px; }
        .cap-filter-pill { border:1.5px solid #e2e8f0; background:#fff; color:#64748b; font-size:11.5px; font-weight:700; padding:5px 12px; border-radius:999px; cursor:pointer; transition:all .2s ease; font-family:inherit; }
        .cap-filter-pill.is-active, .cap-filter-pill:hover { border-color:${G.blue}; color:${G.blue}; background:#eff6ff; }

        /* ── Flip cards ── */
        .cap-domains-3   { display:grid; grid-template-columns:repeat(3,1fr); gap:12px; align-items:stretch; }
        .cap-flip-outer  { perspective:1200px; height:100%; transition:opacity .3s ease; }
        .cap-flip-outer.is-hidden { display:none; }
        .cap-flip-card   { display:block; width:100%; height:100%; cursor:pointer; outline:none; }
        .cap-flip-inner  { position:relative; width:100%; height:100%; min-height:165px; transform-style:preserve-3d; transition:transform .5s cubic-bezier(.22,1,.36,1); }
        .cap-flip-inner.is-flipped { transform:rotateY(180deg); }
        .cap-flip-face   { position:absolute; inset:0; backface-visibility:hidden; -webkit-backface-visibility:hidden; }
        .cap-flip-back   { transform:rotateY(180deg); display:flex; flex-direction:column; justify-content:center; color:#fff; text-align:center; }

        .cap-domain-card  { position:relative; background:#fff; border-radius:14px; padding:14px 16px; border:1px solid rgba(15,23,42,.06); overflow:hidden; transition:box-shadow .25s ease; box-shadow:0 4px 14px rgba(15,23,42,.04); display:flex; flex-direction:column; gap:6px; height:100%; box-sizing:border-box; }
        .cap-flip-outer:hover .cap-domain-card:not(.cap-flip-back) { box-shadow:0 14px 32px rgba(37,99,235,.12); }
        .cap-domain-glow  { position:absolute; inset:0; border-radius:14px; padding:1.5px; -webkit-mask:linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0); -webkit-mask-composite:xor; mask-composite:exclude; opacity:0; transition:opacity .25s ease; pointer-events:none; }
        .cap-flip-outer:hover .cap-domain-glow { opacity:1; }
        .cap-domain-spotlight { position:absolute; inset:0; opacity:0; transition:opacity .25s ease; pointer-events:none; }
        .cap-flip-outer:hover .cap-domain-spotlight { opacity:1; }
        .cap-domain-strip { position:absolute; top:0; left:0; right:0; height:2.5px; }
        .cap-domain-top   { display:flex; align-items:center; justify-content:space-between; gap:6px; position:relative; z-index:1; }
        .cap-domain-icon  { width:34px; height:34px; border-radius:9px; display:flex; align-items:center; justify-content:center; flex-shrink:0; transition:transform .25s ease; }
        .cap-flip-outer:hover .cap-domain-icon { transform:scale(1.08) rotate(-4deg); }
        .cap-domain-badge { display:inline-flex; align-items:center; padding:2px 8px; border-radius:999px; font-size:9.5px; font-weight:700; white-space:nowrap; }
        .cap-domain-title { font-size:13.5px; font-weight:700; color:#0f172a; position:relative; z-index:1; white-space:nowrap; overflow:hidden; text-overflow:ellipsis; }
        .cap-domain-desc  { font-size:12px; color:#64748b; line-height:1.45; position:relative; z-index:1; flex:1; display:-webkit-box; -webkit-line-clamp:2; -webkit-box-orient:vertical; overflow:hidden; }
        .cap-flip-hint    { display:inline-flex; align-items:center; gap:3px; font-size:9.5px; font-weight:700; color:${G.blue}; text-transform:uppercase; letter-spacing:.3px; position:relative; z-index:1; margin-top:auto; }

        .cap-domain-back-title { font-size:13.5px; font-weight:800; margin-bottom:8px; padding:0 12px; }
        .cap-domain-back-stats { display:flex; flex-direction:column; gap:6px; padding:0 14px; margin-bottom:10px; }
        .cap-domain-back-stat  { display:flex; justify-content:space-between; align-items:baseline; border-bottom:1px solid rgba(255,255,255,.15); padding-bottom:4px; }
        .cap-domain-back-v     { font-size:14px; font-weight:900; }
        .cap-domain-back-k     { font-size:9.5px; color:rgba(255,255,255,.7); font-weight:600; }
        .cap-domain-back-cta   { display:inline-flex; align-items:center; justify-content:center; gap:4px; margin:0 14px; padding:6px 12px; background:rgba(255,255,255,.15); border:1px solid rgba(255,255,255,.3); border-radius:999px; color:#fff; font-size:11px; font-weight:700; text-decoration:none; }

        /* ── Journey ── */
        .cap-journey-controls { display:flex; align-items:center; justify-content:center; gap:12px; margin-bottom:10px; flex-wrap:wrap; }
        .cap-play-btn { display:inline-flex; align-items:center; gap:6px; padding:6px 14px; border-radius:999px; border:1.5px solid #e2e8f0; background:#fff; cursor:pointer; font-size:11.5px; font-weight:700; color:#374151; transition:all .2s ease; font-family:inherit; }
        .cap-play-btn.is-playing { background:${G.blue}; border-color:${G.blue}; color:#fff; }
        .cap-journey-progress-text { font-size:11.5px; font-weight:600; color:#94a3b8; }

        .cap-step-nav  { display:flex; gap:5px; flex-wrap:wrap; justify-content:center; margin-bottom:16px; }
        .cap-step-pill { display:flex; align-items:center; gap:6px; padding:5px 10px 5px 5px; border-radius:999px; border:1.5px solid #e2e8f0; background:#fff; cursor:pointer; transition:all .2s ease; font-family:inherit; }
        .cap-step-pill.is-active { border-color:var(--pill-color); background:color-mix(in srgb, var(--pill-color) 8%, white); }
        .cap-step-pill-num   { width:18px; height:18px; border-radius:50%; background:var(--pill-color); color:#fff; font-size:10px; font-weight:800; display:flex; align-items:center; justify-content:center; flex-shrink:0; }
        .cap-step-pill-label { font-size:10.5px; font-weight:600; color:#64748b; white-space:nowrap; }

        .cap-journey      { position:relative; max-width:760px; margin:0 auto; }
        .cap-journey-rail { position:absolute; left:15px; top:6px; bottom:6px; width:2px; background:#eef2ff; }
        .cap-journey-rail-fill { position:absolute; left:15px; top:6px; width:2px; height:0%; background:linear-gradient(to bottom,${G.blue},${G.purple},${G.orange}); transition:height .25s linear; }

        .cap-journey-item { display:flex; gap:12px; position:relative; padding-bottom:10px; }
        .cap-journey-item:last-child { padding-bottom:0; }
        .cap-journey-dot-wrap  { position:relative; width:32px; height:32px; flex-shrink:0; margin-top:2px; }
        .cap-journey-dot-pulse { position:absolute; inset:0; border-radius:50%; opacity:0; }
        .cap-journey-item.is-active .cap-journey-dot-pulse { animation:cap-pulse-ring 1.8s ease-out infinite; }
        .cap-journey-dot { width:32px; height:32px; border-radius:50%; display:flex; align-items:center; justify-content:center; font-size:12px; font-weight:800; color:#fff; position:relative; z-index:1; transition:transform .25s ease; }
        .cap-journey-item.is-active .cap-journey-dot { transform:scale(1.08); }

        .cap-journey-card { position:relative; background:#fff; border:1px solid #eef0f6; border-radius:12px; padding:0; flex:1; box-shadow:0 2px 8px rgba(0,0,0,.03); transition:box-shadow .25s ease, border-color .25s ease; overflow:hidden; }
        .cap-journey-item.is-active .cap-journey-card { box-shadow:0 10px 28px rgba(37,99,235,.12); border-color:rgba(37,99,235,.25); }
        .cap-journey-card-final { border-color:${G.orange}33; }
        .cap-journey-card-glow { position:absolute; top:0; left:0; right:0; height:2.5px; opacity:.85; }

        .cap-journey-card-head { all:unset; display:flex; align-items:center; gap:8px; padding:10px 14px; flex-wrap:wrap; cursor:pointer; width:100%; box-sizing:border-box; }
        .cap-journey-card-head:focus-visible { outline:2px solid ${G.blue}; outline-offset:2px; }
        .cap-journey-icon    { width:26px; height:26px; border-radius:99px; display:flex; align-items:center; justify-content:center; flex-shrink:0; }
        .cap-journey-title   { font-size:13.5px; font-weight:700; color:#0b0d20; }
        .cap-journey-badge   { margin-left:auto; padding:2px 7px; border-radius:999px; font-size:9.5px; font-weight:700; }

        /* FIX: chevron rotation on open */
        .cap-journey-chevron { font-size:13px; color:#94a3b8; transition:transform .3s ease; flex-shrink:0; }
        .cap-journey-item.is-open .cap-journey-chevron { transform:rotate(180deg); }

        .cap-journey-body        { display:grid; grid-template-rows:0fr; transition:grid-template-rows .35s ease; }
        .cap-journey-item.is-open .cap-journey-body { grid-template-rows:1fr; }
        .cap-journey-body-inner  { overflow:hidden; min-height:0; padding:0 14px; }
        .cap-journey-item.is-open .cap-journey-body-inner { padding:0 14px 12px; }
        .cap-journey-desc        { font-size:12.5px; color:#64748b; line-height:1.55; margin:0 0 6px; }
        .cap-journey-tags        { display:flex; flex-wrap:wrap; gap:4px; }
        .cap-journey-tag         { font-size:9.5px; font-weight:600; color:#475569; border:1px solid #e2e8f0; border-radius:999px; padding:2px 7px; }

        .cap-journey-sparkle { position:absolute; bottom:10px; right:12px; opacity:.6; }

        /* ── Dark CTA ── */
        .cap-cta { position:relative; border-radius:20px; padding:clamp(24px,4vw,36px) clamp(16px,4vw,40px); text-align:center; overflow:hidden; background:linear-gradient(135deg,#0b0d20 0%,#1a1040 50%,#0d1836 100%); }
        .cap-cta-orb { position:absolute; border-radius:50%; filter:blur(60px); pointer-events:none; }
        .cap-cta-orb-blue   { top:-60px; left:10%; width:240px; height:240px; background:radial-gradient(circle,${G.blue}35 0%,transparent 70%); }
        .cap-cta-orb-orange { bottom:-40px; right:8%; width:200px; height:200px; background:radial-gradient(circle,${G.orange}30 0%,transparent 70%); }
        .cap-cta-h2   { font-size:clamp(1.4rem,2.8vw,2rem); font-weight:900; line-height:1.18; margin-bottom:8px; }
        .cap-cta-body { font-size:13px; color:rgba(255,255,255,.6); max-width:400px; margin:0 auto 16px; line-height:1.65; }

        /* ── Sticky bar ── */
        .cap-sticky-cta { position:fixed; bottom:0; left:0; right:0; z-index:998; transform:translateY(120%); transition:transform .35s cubic-bezier(.22,1,.36,1); pointer-events:none; }
        .cap-sticky-cta.is-visible { transform:translateY(0); pointer-events:auto; }
        .cap-sticky-cta-inner { max-width:840px; margin:0 auto; background:#fff; border:1px solid #e2e8f0; border-radius:12px 12px 0 0; box-shadow:0 -6px 24px rgba(0,0,0,.1); padding:10px 16px; display:flex; align-items:center; justify-content:space-between; gap:12px; }
        .cap-sticky-cta-text strong { font-size:12.5px; color:#0b0d20; display:block; }
        .cap-sticky-cta-text span   { font-size:11px; color:#64748b; }
        .cap-sticky-cta-actions { display:flex; align-items:center; gap:8px; flex-shrink:0; }
        .cap-sticky-dismiss { all:unset; display:flex; align-items:center; justify-content:center; width:26px; height:26px; border-radius:50%; background:#f1f5f9; color:#64748b; cursor:pointer; }
        .cap-sticky-dismiss:hover { background:#e2e8f0; }

        /* ── Responsive ── */
        @media (max-width: 900px) { .cap-step-nav { display:none; } }
        @media (max-width: 860px) {
          .cap-two-col    { grid-template-columns:1fr !important; gap:20px !important; }
          .cap-domains-3  { grid-template-columns:1fr 1fr !important; }
          .cap-stats-4    { grid-template-columns:repeat(2,1fr) !important; }
        }
        @media (max-width: 580px) {
          .cap-domains-3    { grid-template-columns:1fr !important; }
          .cap-flip-inner   { min-height:155px; }
          .cap-calc-results { grid-template-columns:1fr !important; }
          .cap-ticker-text  { white-space:normal; }
        }
      `}</style>

      {/* ════ CLIENT-SIDE INTERACTIVITY ════ */}
      <script
        dangerouslySetInnerHTML={{
          __html: `
(function () {
  function ready(fn) {
    if (document.readyState !== 'loading') fn();
    else document.addEventListener('DOMContentLoaded', fn);
  }

  ready(function () {

    /* ── Scroll progress ── */
    var progressFill = document.querySelector('[data-scroll-progress]');
    function updateProgress() {
      var h = document.documentElement;
      var scrolled = window.pageYOffset || h.scrollTop;
      var max = h.scrollHeight - h.clientHeight;
      if (progressFill) progressFill.style.width = (max > 0 ? (scrolled / max) * 100 : 0) + '%';
    }

    /* ── Intersection reveal ── */
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        var el = entry.target;
        var delay = parseFloat(el.getAttribute('data-delay') || '0');
        setTimeout(function () { el.classList.add('is-visible'); }, delay * 1000);
        io.unobserve(el);
      });
    }, { threshold: 0.1, rootMargin: '-30px' });
    document.querySelectorAll('[data-reveal]').forEach(function (el) { io.observe(el); });

    /* ── Count-up ── */
    function runCountUp(el) {
      var target = el.getAttribute('data-countup') || '';
      var match = target.match(/[\\d.]+/);
      if (!match) { el.textContent = target; return; }
      var num = parseFloat(match[0]);
      var isInt = Number.isInteger(num);
      var prefix = target.slice(0, match.index);
      var suffix = target.slice((match.index || 0) + match[0].length);
      var start = null;
      var dur = 900;
      function step(ts) {
        if (!start) start = ts;
        var p = Math.min((ts - start) / dur, 1);
        var eased = 1 - Math.pow(1 - p, 3);
        el.textContent = prefix + (isInt ? Math.round(num * eased) : (num * eased).toFixed(1)) + suffix;
        if (p < 1) requestAnimationFrame(step);
      }
      requestAnimationFrame(step);
    }
    var countIO = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (!e.isIntersecting) return;
        runCountUp(e.target);
        countIO.unobserve(e.target);
      });
    }, { threshold: 0.5 });
    document.querySelectorAll('[data-countup]').forEach(function (el) { countIO.observe(el); });
    document.querySelectorAll('[data-stat-cell]').forEach(function (cell) {
      cell.addEventListener('mouseenter', function () {
        var numEl = cell.querySelector('[data-countup]');
        if (numEl) runCountUp(numEl);
      });
    });

    /* ── Live ticker ── */
    var tickerText = document.querySelector('[data-ticker-text]');
    var activities = ${JSON.stringify(liveActivity)};
    var tickerIdx = 0;
    if (tickerText && activities.length > 1) {
      setInterval(function () {
        tickerIdx = (tickerIdx + 1) % activities.length;
        tickerText.style.opacity = '0';
        setTimeout(function () {
          tickerText.textContent = activities[tickerIdx];
          tickerText.style.opacity = '1';
        }, 250);
      }, 3200);
    }

    /* ── Spotlight paint ── */
    document.querySelectorAll('[data-spotlight-card]').forEach(function (card) {
      card.addEventListener('mousemove', function (e) {
        var rect = card.getBoundingClientRect();
        card.style.setProperty('--mx', ((e.clientX - rect.left) / rect.width * 100) + '%');
        card.style.setProperty('--my', ((e.clientY - rect.top) / rect.height * 100) + '%');
      });
    });

    /* ── Domain filter ── */
    var filterBtns  = document.querySelectorAll('[data-domain-filter]');
    var domainCards = document.querySelectorAll('[data-domain-category]');
    filterBtns.forEach(function (btn) {
      btn.addEventListener('click', function () {
        var cat = btn.getAttribute('data-domain-filter');
        filterBtns.forEach(function (b) { b.classList.remove('is-active'); });
        btn.classList.add('is-active');
        domainCards.forEach(function (card) {
          var matches = cat === 'all' || card.getAttribute('data-domain-category') === cat;
          card.classList.toggle('is-hidden', !matches);
        });
      });
    });

    /* ── Slider calculator ── */
    var slider     = document.querySelector('[data-ctc-slider]');
    var ctcValueEl = document.querySelector('[data-ctc-value]');
    var feeEl      = document.querySelector('[data-ctc-fee]');
    var netEl      = document.querySelector('[data-ctc-net]');
    var roiEl      = document.querySelector('[data-ctc-roi]');
    var ctcRows    = Array.prototype.slice.call(document.querySelectorAll('[data-ctc-row]'));
    var sharePct   = slider ? (parseFloat(slider.getAttribute('data-share-percent') || '12') / 100) : 0.12;

    function fmtINR(n) { return '\u20b9' + Math.round(n).toLocaleString('en-IN'); }
    function fmtLakh(n) { return '\u20b9' + (n / 100000).toFixed(2).replace(/\\.00$/, '') + 'L'; }

    function updateCalc() {
      if (!slider) return;
      var val = parseFloat(slider.value);
      var fee = val * sharePct;
      var net = val - fee;
      var roi = fee > 0 ? Math.max(1, Math.round(net / fee)) : 0;
      if (ctcValueEl) ctcValueEl.textContent = fmtINR(val);
      if (feeEl)      feeEl.textContent      = fmtINR(fee);
      if (netEl)      netEl.textContent      = fmtLakh(net);
      if (roiEl)      roiEl.textContent      = roi + 'x ROI';
      var closestRow = null, closestDist = Infinity;
      ctcRows.forEach(function (row) {
        var dist = Math.abs((parseFloat(row.getAttribute('data-ctc-num') || '0')) - val);
        if (dist < closestDist) { closestDist = dist; closestRow = row; }
      });
      ctcRows.forEach(function (row) { row.classList.toggle('is-highlighted', row === closestRow); });
    }
    if (slider) {
      ['input','change'].forEach(function (evt) {
        slider.addEventListener(evt, updateCalc);
      });
      updateCalc();
    }

    /* ── Flip cards ── */
    document.querySelectorAll('[data-flip-card]').forEach(function (card) {
      function toggle(e) {
        if (e.target && e.target.closest('a')) return;
        var inner = card.querySelector('[data-flip-inner]');
        if (inner) inner.classList.toggle('is-flipped');
      }
      card.addEventListener('click', toggle);
      card.addEventListener('keydown', function (e) {
        if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); toggle(e); }
      });
    });

    /* ── Journey ── */
    var journeyItems   = Array.prototype.slice.call(document.querySelectorAll('[data-journey-step]'));
    var stepPills      = Array.prototype.slice.call(document.querySelectorAll('[data-step-pill]'));
    var fill           = document.querySelector('[data-journey-fill]');
    var progressText   = document.querySelector('[data-journey-progress-text]');
    var totalSteps     = journeyItems.length;
    var autoplayOn     = false;
    var autoplayTimer  = null;
    var autoplayIndex  = 0;

    function setActiveStep(idx, openIt) {
      journeyItems.forEach(function (item, i) {
        item.classList.toggle('is-active', i === idx);
        if (openIt) item.classList.toggle('is-open', i === idx);
        var btn = item.querySelector('[data-journey-toggle]');
        if (btn && openIt) btn.setAttribute('aria-expanded', String(i === idx));
      });
      stepPills.forEach(function (pill, i) { pill.classList.toggle('is-active', i === idx); });
      if (progressText && totalSteps > 0) {
        var pct = Math.round(((idx + 1) / totalSteps) * 100);
        progressText.textContent = 'Step ' + (idx + 1) + ' of ' + totalSteps + ' \xb7 ' + pct + '% complete';
      }
    }

    /* Scroll-driven rail + active step */
    var track = document.querySelector('[data-journey-track]');
    function updateJourneyFromScroll() {
      if (!track || !fill || autoplayOn) return;
      var rect  = track.getBoundingClientRect();
      var vh    = window.innerHeight;
      var total = rect.height;
      var vis   = Math.min(Math.max(vh * 0.6 - rect.top, 0), total);
      fill.style.height = (total > 0 ? (vis / total) * 100 : 0) + '%';

      var center = vh * 0.45;
      var best = 0, bestDist = Infinity;
      journeyItems.forEach(function (item, idx) {
        var r = item.getBoundingClientRect();
        if (r.top >= vh || r.bottom <= 0) return;
        var dist = Math.abs(r.top + r.height / 2 - center);
        if (dist < bestDist) { bestDist = dist; best = idx; }
      });
      setActiveStep(best, false);
    }

    var scrollTicking = false;
    document.addEventListener('scroll', function () {
      updateProgress();
      if (!scrollTicking) {
        requestAnimationFrame(function () { updateJourneyFromScroll(); scrollTicking = false; });
        scrollTicking = true;
      }
      updateStickyBar();
    }, { passive: true });
    window.addEventListener('resize', updateJourneyFromScroll);
    updateJourneyFromScroll();
    updateProgress();

    /* Step pill nav */
    stepPills.forEach(function (pill, idx) {
      pill.addEventListener('click', function () {
        stopAutoplay();
        var target = journeyItems[idx];
        if (target) {
          window.scrollTo({ top: window.pageYOffset + target.getBoundingClientRect().top - window.innerHeight * 0.3, behavior: 'smooth' });
        }
      });
    });

    /* Accordion toggle */
    document.querySelectorAll('[data-journey-toggle]').forEach(function (btn, idx) {
      btn.addEventListener('click', function () {
        var item = journeyItems[idx];
        if (!item) return;
        var willOpen = !item.classList.contains('is-open');
        item.classList.toggle('is-open');
        btn.setAttribute('aria-expanded', String(willOpen));
      });
    });

    /* Autoplay */
    var playBtn   = document.querySelector('[data-journey-play]');
    var playIcon  = document.querySelector('[data-play-icon]');
    var playLabel = document.querySelector('[data-play-label]');

    function startAutoplay() {
      autoplayOn = true; autoplayIndex = 0;
      if (playBtn)   playBtn.classList.add('is-playing');
      if (playLabel) playLabel.textContent = 'Pause Journey';
      if (playIcon)  playIcon.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><rect x="6" y="4" width="4" height="16"></rect><rect x="14" y="4" width="4" height="16"></rect></svg>';
      advanceAutoplay();
      autoplayTimer = setInterval(advanceAutoplay, 3200);
    }
    function stopAutoplay() {
      autoplayOn = false;
      if (autoplayTimer) clearInterval(autoplayTimer);
      if (playBtn)   playBtn.classList.remove('is-playing');
      if (playLabel) playLabel.textContent = 'Auto-Play Journey';
      if (playIcon)  playIcon.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>';
    }
    function advanceAutoplay() {
      setActiveStep(autoplayIndex, true);
      var target = journeyItems[autoplayIndex];
      if (target) window.scrollTo({ top: window.pageYOffset + target.getBoundingClientRect().top - window.innerHeight * 0.3, behavior: 'smooth' });
      if (fill) fill.style.height = (totalSteps > 0 ? ((autoplayIndex + 1) / totalSteps) * 100 : 0) + '%';
      autoplayIndex = (autoplayIndex + 1) % totalSteps;
    }
    if (playBtn) playBtn.addEventListener('click', function () {
      if (autoplayOn) stopAutoplay(); else startAutoplay();
    });

    /* ── Sticky CTA ── */
    var stickyBar = document.querySelector('[data-sticky-cta]');
    var dismissed = false;
    try { dismissed = sessionStorage.getItem('cap_sticky_dismissed') === '1'; } catch(e) {}

    function updateStickyBar() {
      if (!stickyBar || dismissed) return;
      var hero = document.querySelector('.cap-hero');
      stickyBar.classList.toggle('is-visible', window.pageYOffset > (hero ? hero.offsetHeight : 400));
    }
    var stickyDismiss = document.querySelector('[data-sticky-dismiss]');
    if (stickyDismiss) {
      stickyDismiss.addEventListener('click', function () {
        dismissed = true;
        if (stickyBar) stickyBar.classList.remove('is-visible');
        try { sessionStorage.setItem('cap_sticky_dismissed', '1'); } catch(e) {}
      });
    }
    updateStickyBar();

    /* ── Magnetic buttons ── */
    document.querySelectorAll('[data-magnetic]').forEach(function (btn) {
      btn.addEventListener('mousemove', function (e) {
        var r = btn.getBoundingClientRect();
        var x = e.clientX - r.left - r.width / 2;
        var y = e.clientY - r.top - r.height / 2;
        btn.style.transform = 'translate(' + (x * 0.15) + 'px, ' + (y * 0.25 - 2) + 'px)';
      });
      btn.addEventListener('mouseleave', function () { btn.style.transform = ''; });
    });

  }); // ready
})();
          `,
        }}
      />

    </PageLayout>
  );
}