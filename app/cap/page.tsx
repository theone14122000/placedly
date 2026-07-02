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

/* ── Brand tokens (site-wide) ── */
const G = {
  blue:   '#2563eb',
  indigo: '#7c8ff0',
  orange: '#fb923c',
  rose:   '#f43f5e',
  purple: '#a855f7',
};

const DOT_COLORS = [G.blue, G.orange, G.purple, '#16a34a', G.rose, '#0891b2', G.blue];

/* ── Icon registry: CMS sends a string, we resolve the component ── */
const ICON_MAP: Record<string, LucideIcon> = {
  HeartPulse, ClipboardList, Briefcase, BarChart3, RefreshCw, TrendingUp,
  Phone, Search, FileSignature, FileText, Mic2, Handshake, PartyPopper,
  Rocket, Zap, Sparkles,
};
function resolveIcon(name: string | undefined, fallback: LucideIcon): LucideIcon {
  return (name && ICON_MAP[name]) || fallback;
}

/* ════════════════════════════════════════════════════════════
   CMS TYPES — everything on this page is editable
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
    percent?: number;          // e.g. 12
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
    whatsappNumber?: string;   // e.g. "919876543210"
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
   DEFAULTS (fallbacks when CMS is empty)
   ════════════════════════════════════════════════════════════ */

const DEFAULT_BENEFITS = [
  'ATS-Optimized Resume + LinkedIn Rebuild',
  '3 Mock Interview Sessions (HR + Technical + Negotiation)',
  'Personalized Career Roadmap & Strategy',
  'Direct Employer Connect — 10–15 Target Companies',
  'Offer Negotiation Script & Salary Support',
  '30-Day Post-Joining Support',
  '48-Hour WhatsApp Support Throughout',
];

const DEFAULT_DOMAINS = [
  {
    icon: 'HeartPulse', iconBg: '#fef2f2', iconColor: '#ef4444', title: 'US Healthcare Claims',
    desc: 'CPT coding, ICD-10, adjudication, COB, denial management. Direct connections at EXL, Optum, WNS & more.',
    badge: 'Strongest Domain', badgeColor: '#ef4444',
    stats: [{ label: 'Placements/mo', value: '12+' }, { label: 'Avg Salary Hike', value: '45%' }, { label: 'Time to Offer', value: '18 days' }],
  },
  {
    icon: 'ClipboardList', iconBg: '#fff7ed', iconColor: G.orange, title: 'Insurance Operations',
    desc: "Lloyd's market, underwriting support, XIS submission, RFT compliance, claims processing.",
    badge: 'High Value', badgeColor: G.orange,
    stats: [{ label: 'Placements/mo', value: '8+' }, { label: 'Avg Salary Hike', value: '40%' }, { label: 'Time to Offer', value: '21 days' }],
  },
  {
    icon: 'Briefcase', iconBg: '#eff6ff', iconColor: G.blue, title: 'BPO / KPO Operations',
    desc: 'Process associates, team leads, quality analysts, ops managers. Volume domain — fastest results.',
    badge: 'Fast Growth', badgeColor: G.blue,
    stats: [{ label: 'Placements/mo', value: '15+' }, { label: 'Avg Salary Hike', value: '35%' }, { label: 'Time to Offer', value: '12 days' }],
  },
  {
    icon: 'BarChart3', iconBg: '#f0fdf4', iconColor: '#16a34a', title: 'Finance & Accounts',
    desc: 'Accounts executives, finance analysts, payroll specialists, BFSI roles at growing companies.',
    badge: 'Growing', badgeColor: '#16a34a',
    stats: [{ label: 'Placements/mo', value: '9+' }, { label: 'Avg Salary Hike', value: '42%' }, { label: 'Time to Offer', value: '20 days' }],
  },
  {
    icon: 'RefreshCw', iconBg: '#faf5ff', iconColor: G.purple, title: 'Career Switchers',
    desc: 'Gap in career? Domain switch needed? We know exactly how to present your story to land the role.',
    badge: 'Specialist', badgeColor: G.purple,
    stats: [{ label: 'Placements/mo', value: '6+' }, { label: 'Avg Salary Hike', value: '38%' }, { label: 'Time to Offer', value: '25 days' }],
  },
  {
    icon: 'TrendingUp', iconBg: '#ecfeff', iconColor: '#0891b2', title: 'Salary Growth Seekers',
    desc: 'Want 40–70% growth? This is exactly what the CAP is designed to deliver — real, fast career jumps.',
    badge: 'High Impact', badgeColor: '#0891b2',
    stats: [{ label: 'Placements/mo', value: '10+' }, { label: 'Avg Salary Hike', value: '58%' }, { label: 'Time to Offer', value: '16 days' }],
  },
];

const DEFAULT_STEPS = [
  { num: 1, icon: 'Phone',         title: 'Free Discovery Call',            badge: 'Free',                 desc: "15-minute call. We understand your experience, goals and situation. Honest assessment — we'll tell you if we can help.",                             tags: ['15–20 min', 'Zero Cost'] },
  { num: 2, icon: 'Search',        title: 'Deep Profile Assessment',        badge: 'Foundation',           desc: '45–60 minute session. Full career story, strengths, gaps, target companies. Your personalized roadmap is built here.',                              tags: ['45–60 min', 'Roadmap Delivered'] },
  { num: 3, icon: 'FileSignature', title: 'Service Agreement Sign',         badge: 'Transparent',          desc: 'Digital service agreement signed. Scope, Success Share %, and terms — everything in writing before we start.',                                    tags: ['Digital Agreement', 'Fully Transparent'] },
  { num: 4, icon: 'FileText',      title: 'Resume & LinkedIn Rebuild',      badge: 'Core',                 desc: 'ATS-friendly resume, achievement-based bullets, domain keywords. LinkedIn updated too. Ready in 1–2 days. 2 revisions included.',                    tags: ['1–2 Days', 'ATS Optimized', '2 Revisions'] },
  { num: 5, icon: 'Mic2',          title: 'Interview Mastery — 3 Sessions', badge: 'Biggest Edge',         desc: 'Session 1: HR Round. Session 2: Technical/Domain. Session 3: Full Mock + Salary Negotiation Script.',                                              tags: ['~3 hrs total', 'Mock Interview', 'Negotiation Script'] },
  { num: 6, icon: 'Handshake',     title: 'Direct Employer Connect',        badge: 'Our Work',             desc: 'Your profile goes directly to hiring managers at 10–15 target companies — with a warm intro from us. We follow up, schedule, and track everything.', tags: ['7–21 Days Active', '10–15 Companies'] },
  { num: 7, icon: 'PartyPopper',   title: 'Career Grows — Success Share!',  badge: 'Partnership Complete', desc: 'New role confirmed. Better CTC. Real growth. Now we collect our Success Share — because we grew together.',                                     tags: ['12% Success Share', '7 Day Window', 'GST Receipt'] },
];

const DEFAULT_LIVE_ACTIVITY = [
  '🎉 Ankit R. just got placed at WNS — ₹6.4L CTC',
  '⚡ Priya S. completed Interview Mastery, Session 3',
  '🚀 47 candidates in active employer connect right now',
  '✅ Rohit K. signed offer at EXL — 52% salary hike',
  '📄 Resume rebuild delivered to Simran K. in 22 hours',
  '🎯 Vikram T. landed Senior Analyst role — 9 days flat',
];

const DEFAULT_STATS = [
  { num: '300+', label: 'Professionals Placed' },
  { num: '60%+', label: 'Avg. Career Growth' },
  { num: '9', label: 'Fastest Placement (Days)' },
  { num: '₹0', label: 'Upfront Cost' },
];

const DEFAULT_SHARE_TABLE = [
  { ctc: '₹3,00,000',  fee: '₹36,000',   net: '₹2.64L+', roi: '7x ROI' },
  { ctc: '₹4,50,000',  fee: '₹54,000',   net: '₹3.96L+', roi: '7x ROI' },
  { ctc: '₹6,00,000',  fee: '₹72,000',   net: '₹5.28L+', roi: '8x ROI' },
  { ctc: '₹8,00,000',  fee: '₹96,000',   net: '₹7.04L+', roi: '8x ROI' },
  { ctc: '₹10,00,000', fee: '₹1,20,000', net: '₹8.8L+',  roi: '9x ROI' },
];

/* ════════════════════════════════════════════════════════════
   Reusable server-rendered pieces
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
        animation: 'cap-grad 6s ease infinite',
        display: 'inline-block',
        ...style,
      }}
    >
      {children}
    </Tag>
  );
}

function SectionLabel({ text, center = false, light = false }: { text: string; center?: boolean; light?: boolean }) {
  return (
    <div style={{
      display: 'inline-flex', alignItems: 'center', gap: '8px',
      fontSize: '11px', fontWeight: 800, letterSpacing: '0.12em',
      textTransform: 'uppercase', marginBottom: '14px',
      justifyContent: center ? 'center' : 'flex-start',
      width: center ? '100%' : 'auto',
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
      <div aria-hidden className="cap-blob cap-blob-blue" />
      <div aria-hidden className="cap-blob cap-blob-orange" />
    </>
  );
}

/* ════════════════════════════════════════════════════════════ */
export default async function CapPage() {
  const cmsMap = await getCmsMap('cap:');
  const cms = parseCmsJson<CapCmsData>(cmsMap, 'cap:data', {});

  /* ── HERO (dynamic) ── */
  const hero = {
    tag:               cms.hero?.tag ?? 'Career Assistance Programme',
    titlePlain:        cms.hero?.titlePlain ?? 'Not Just a Job.',
    titleGradient:     cms.hero?.titleGradient ?? 'A Career Transformation.',
    subtitle:          cms.hero?.subtitle ?? "The CAP is Placedly's flagship programme for working professionals in BPO, Healthcare Claims, Insurance & Finance who want to grow — fast.",
    ctaText:           cms.hero?.ctaText ?? 'Apply to CAP Now',
    ctaLink:           cms.hero?.ctaLink ?? '/cap/apply',
    secondaryCtaText:  cms.hero?.secondaryCtaText ?? 'See the Journey',
    secondaryCtaLink:  cms.hero?.secondaryCtaLink ?? '#how-it-works',
  };

  /* ── LIVE TICKER (dynamic) ── */
  const liveActivity = (cms.liveActivity && cms.liveActivity.length > 0)
    ? cms.liveActivity
    : DEFAULT_LIVE_ACTIVITY;

  /* ── STATS (dynamic) ── */
  const heroStats = (cms.stats && cms.stats.length > 0)
    ? cms.stats.map(s => ({ num: s.value ?? '', label: s.label ?? '' }))
    : DEFAULT_STATS;

  /* ── WHAT'S INCLUDED (dynamic) ── */
  const included = {
    heading:         cms.included?.heading ?? 'Everything You Get',
    headingGradient: cms.included?.headingGradient ?? 'in the CAP',
    body:            cms.included?.body ?? 'A complete career transformation system — not just a resume, not just job leads. Everything, end to end.',
    benefits:        (cms.included?.benefits && cms.included.benefits.length > 0) ? cms.included.benefits : DEFAULT_BENEFITS,
    ctaText:         cms.included?.ctaText ?? "Apply Now — It's Free to Start",
    ctaLink:         cms.included?.ctaLink ?? '/cap/apply',
  };

  /* ── SUCCESS SHARE (dynamic, drives calculator too) ── */
  const sharePercent = cms.successShare?.percent ?? 12;
  const successShare = {
    title:       cms.successShare?.title ?? 'Our Success Share Model',
    subtitle:    cms.successShare?.subtitle ?? 'We invest everything first. You pay only when your career genuinely grows — after your offer letter arrives.',
    percent:     sharePercent,
    note:        cms.successShare?.note ?? `* ${sharePercent}% Success Share of agreed annual CTC. GST receipt provided.`,
    calcMin:     cms.successShare?.calcMin ?? 200000,
    calcMax:     cms.successShare?.calcMax ?? 2000000,
    calcDefault: cms.successShare?.calcDefault ?? 500000,
  };

  /* pre-compute initial calculator display (SSR-correct before JS runs) */
  const initFee = Math.round(successShare.calcDefault * (sharePercent / 100));
  const initNet = successShare.calcDefault - initFee;
  const initRoi = initFee > 0 ? Math.max(1, Math.round(initNet / initFee)) : 0;
  const fmtINR = (n: number) => '₹' + Math.round(n).toLocaleString('en-IN');
  const fmtLakh = (n: number) => '₹' + (n / 100000).toFixed(2).replace(/\.00$/, '') + 'L';

  /* ── SHARE TABLE (dynamic) ── */
  const shareTable = (cms.shareTable && cms.shareTable.length > 0)
    ? cms.shareTable
    : DEFAULT_SHARE_TABLE;

  /* ── DOMAINS (dynamic, merged with defaults) ── */
  const domainsSection = {
    heading:         cms.domainsSection?.heading ?? 'Our',
    headingGradient: cms.domainsSection?.headingGradient ?? 'Specialist Domains',
    body:            cms.domainsSection?.body ?? 'Click or tap any card to see the numbers behind each domain.',
  };
  const rawDomains = (cms.domains && cms.domains.length > 0) ? cms.domains : DEFAULT_DOMAINS;
  const mergedDomains = rawDomains.map((d, i) => {
    const def = DEFAULT_DOMAINS[i % DEFAULT_DOMAINS.length];
    return {
      Icon:       resolveIcon(d.icon, resolveIcon(def.icon, Briefcase)),
      iconBg:     d.iconBg ?? def.iconBg,
      iconColor:  d.iconColor ?? def.iconColor,
      title:      d.title ?? def.title,
      desc:       d.desc ?? def.desc,
      badge:      d.badge ?? def.badge,
      badgeColor: d.badgeColor ?? def.badgeColor,
      stats:      (d.stats && d.stats.length > 0)
        ? d.stats.map(s => ({ label: s.label ?? '', value: s.value ?? '' }))
        : def.stats,
    };
  });

  /* ── JOURNEY STEPS (dynamic, merged by step number) ── */
  const journey = {
    heading:         cms.journey?.heading ?? 'Your 7-Step',
    headingGradient: cms.journey?.headingGradient ?? 'Career Growth Path',
  };
  const cmsSteps = cms.steps;
  const mergedSteps = DEFAULT_STEPS.map((step, i) => {
    const match = cmsSteps?.find(s => s.number === step.num || s.id === step.num) ?? cmsSteps?.[i];
    return {
      num:   match?.number ?? step.num,
      Icon:  resolveIcon(match?.icon, resolveIcon(step.icon, Phone)),
      title: match?.title ?? step.title,
      badge: match?.badge ?? step.badge,
      desc:  match?.desc ?? step.desc,
      tags:  (match?.tags && match.tags.length > 0) ? match.tags : step.tags,
    };
  });
  const totalSteps = mergedSteps.length;

  /* ── CTA SECTION (dynamic) ── */
  const cta = {
    title:          cms.cta?.title ?? 'Ready to Transform Your Career?',
    body:           cms.cta?.body ?? 'Zero upfront. You only pay after your career grows. Start with a free 15-minute discovery call.',
    primaryText:    cms.cta?.primaryText ?? 'Apply to CAP Now',
    primaryLink:    cms.cta?.primaryLink ?? '/cap/apply',
    whatsappNumber: cms.cta?.whatsappNumber ?? '919876543210',
    whatsappText:   cms.cta?.whatsappText ?? 'WhatsApp Us',
  };

  /* ── STICKY BAR (dynamic) ── */
  const stickyCta = {
    title:    cms.stickyCta?.title ?? 'Ready to grow?',
    subtitle: cms.stickyCta?.subtitle ?? "Zero upfront — pay only after you're placed.",
    ctaText:  cms.stickyCta?.ctaText ?? 'Apply Now',
    ctaLink:  cms.stickyCta?.ctaLink ?? '/cap/apply',
  };

  return (
    <PageLayout>

      {/* ════════════════════ SCROLL PROGRESS BAR ════════════════════ */}
      <div className="cap-progress-track" aria-hidden>
        <div className="cap-progress-fill" data-scroll-progress />
      </div>

      {/* ════════════════════ HERO ════════════════════ */}
      <section className="cap-hero">
        <AmbientBlobs />
        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <nav className="cap-breadcrumb reveal" data-reveal aria-label="Breadcrumb">
            <a href="/">Home</a><span className="cap-sep">›</span>
            <span className="cap-current">CAP</span>
          </nav>

          <div style={{ maxWidth: '780px' }}>
            <div className="reveal" data-reveal><SectionLabel text={hero.tag} /></div>

            <h1 className="cap-h1 reveal" data-reveal data-delay="0.08">
              {hero.titlePlain}{' '}
              <GradientText tag="span" style={{ display: 'inline' }}>{hero.titleGradient}</GradientText>
            </h1>

            <p className="cap-lead reveal" data-reveal data-delay="0.16">{hero.subtitle}</p>

            {/* Live activity ticker */}
            <div className="cap-ticker reveal" data-reveal data-delay="0.2">
              <span className="cap-ticker-live">
                <span className="cap-ticker-dot" /> LIVE
              </span>
              <span className="cap-ticker-text" data-ticker-text>{liveActivity[0]}</span>
            </div>

            <div className="cap-btn-row" data-reveal data-delay="0.28" style={{ opacity: 0, transform: 'translateY(40px)' }}>
              <div className="reveal" data-reveal style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                <a href={hero.ctaLink} className="cap-btn cap-btn-primary" data-magnetic>
                  <Rocket size={15} /> {hero.ctaText}
                  <span className="cap-arrow"><ArrowRight size={14} /></span>
                </a>
                <a href={hero.secondaryCtaLink} className="cap-btn cap-btn-ghost">{hero.secondaryCtaText}</a>
              </div>
            </div>
          </div>

          <div className="cap-stats-4" style={{ gridTemplateColumns: `repeat(${Math.min(heroStats.length, 4)}, 1fr)` }}>
            {heroStats.map((s, i) => (
              <div key={`${s.label}-${i}`} className="cap-stat-cell reveal" data-reveal data-delay={`${i * 0.08}`}
                style={{ borderRight: i < heroStats.length - 1 ? '1px solid #eef2ff' : 'none' }}>
                <div className="cap-stat-num" data-countup={s.num}
                  style={{ backgroundImage: `linear-gradient(135deg, ${DOT_COLORS[i % DOT_COLORS.length]}, ${G.indigo})`, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                  {s.num.replace(/[0-9.]/g, '0')}
                </div>
                <div className="cap-stat-label">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════ WHAT YOU GET + SUCCESS SHARE CALCULATOR ════════════════════ */}
      <section className="cap-section" style={{ background: '#fff' }}>
        <div className="container">
          <div className="cap-two-col">
            <div className="reveal" data-reveal>
              <SectionLabel text="What's Included" />
              <h2 className="cap-h2">{included.heading} <GradientText tag="span">{included.headingGradient}</GradientText></h2>
              <p className="cap-body">{included.body}</p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                {included.benefits.map((b, i) => (
                  <div key={`${b}-${i}`} className="cap-benefit reveal" data-reveal data-delay={`${0.1 + i * 0.05}`}>
                    <CheckCircle2 size={18} color={G.blue} className="cap-check" style={{ flexShrink: 0, marginTop: '2px' }} />
                    <span>{b}</span>
                  </div>
                ))}
              </div>

              <div style={{ marginTop: '24px' }}>
                <a href={included.ctaLink} className="cap-btn cap-btn-primary" data-magnetic>
                  {included.ctaText}
                  <span className="cap-arrow"><ArrowRight size={14} /></span>
                </a>
              </div>
            </div>

            <div className="cap-share-card reveal" data-reveal data-delay="0.15" data-tilt>
              <div aria-hidden className="cap-share-orb" />

              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px', position: 'relative', zIndex: 1 }}>
                <TrendingUp size={22} color={G.orange} />
                <div style={{ fontSize: '18px', fontWeight: 800 }}>{successShare.title}</div>
              </div>
              <p style={{ fontSize: '14px', color: 'rgba(255,255,255,0.65)', lineHeight: 1.7, marginBottom: '20px', position: 'relative', zIndex: 1 }}>
                {successShare.subtitle}
              </p>

              {/* ── Interactive calculator (percent + range fully dynamic) ── */}
              <div className="cap-calc" data-no-tilt style={{ position: 'relative', zIndex: 2 }}>
                <div className="cap-calc-head">
                  <Calculator size={14} color={G.orange} />
                  <span>Drag to calculate your own numbers</span>
                </div>
                <div className="cap-calc-value-row">
                  <span>Annual CTC</span>
                  <span className="cap-calc-ctc-display" data-ctc-value>{fmtINR(successShare.calcDefault)}</span>
                </div>
                <input
                  type="range"
                  min={successShare.calcMin}
                  max={successShare.calcMax}
                  step={10000}
                  defaultValue={successShare.calcDefault}
                  className="cap-calc-range"
                  data-ctc-slider
                  data-no-tilt
                  data-share-percent={sharePercent}
                  aria-label="Annual CTC slider"
                />
                <div className="cap-calc-results">
                  <div className="cap-calc-result">
                    <span className="cap-calc-result-k">Service Fee</span>
                    <span className="cap-calc-result-v" style={{ color: G.orange }} data-ctc-fee>{fmtINR(initFee)}</span>
                  </div>
                  <div className="cap-calc-result">
                    <span className="cap-calc-result-k">Your Net Gain</span>
                    <span className="cap-calc-result-v" style={{ color: '#4ade80' }} data-ctc-net>{fmtLakh(initNet)}</span>
                  </div>
                  <div className="cap-calc-result">
                    <span className="cap-calc-result-k">Return</span>
                    <span className="cap-calc-result-v" style={{ color: '#fff' }} data-ctc-roi>{initRoi}x ROI</span>
                  </div>
                </div>
              </div>

              <table className="cap-share-table" style={{ position: 'relative', zIndex: 1, marginTop: '16px' }}>
                <thead>
                  <tr>
                    {['Annual CTC', 'Service Fee', 'Your Net Gain'].map(h => <th key={h}>{h}</th>)}
                  </tr>
                </thead>
                <tbody>
                  {shareTable.map((row, i) => {
                    const ctcNum = parseInt(row.ctc.replace(/[^\d]/g, ''), 10) || 0;
                    return (
                      <tr key={i} className="cap-share-row" data-ctc-row data-ctc-num={ctcNum} style={{ animationDelay: `${i * 0.08}s` }}>
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
              <p style={{ fontSize: '12px', color: 'rgba(255,255,255,0.35)', marginTop: '14px', position: 'relative', zIndex: 1 }}>
                {successShare.note}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ════════════════════ WHO WE HELP (flip cards) ════════════════════ */}
      <section className="cap-section" style={{ background: '#f8faff', position: 'relative', overflow: 'hidden' }}>
        <AmbientBlobs />
        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <div className="cap-center reveal" data-reveal>
            <SectionLabel text="Who We Help" center />
            <h2 className="cap-h2">{domainsSection.heading} <GradientText tag="span">{domainsSection.headingGradient}</GradientText></h2>
            <p className="cap-body" style={{ margin: '0 auto', textAlign: 'center', maxWidth: '480px' }}>
              {domainsSection.body}
            </p>
          </div>

          <div className="cap-domains-3">
            {mergedDomains.map((d, i) => (
              <div key={`${d.title}-${i}`} className="cap-flip-outer reveal" data-reveal data-delay={`${i * 0.08}`}>
                <div
                  className="cap-flip-card"
                  tabIndex={0}
                  role="region"
                  aria-label={`${d.title} domain details`}
                  data-flip-card
                >
                  <div className="cap-flip-inner" data-flip-inner>

                    {/* Front */}
                    <div className="cap-domain-card cap-flip-face" data-spotlight-card style={{ '--accent': d.iconColor } as React.CSSProperties}>
                      <div className="cap-domain-glow" style={{ background: `linear-gradient(135deg, ${d.iconColor}, ${G.orange})` }} />
                      <div className="cap-domain-spotlight" data-spotlight
                        style={{ background: `radial-gradient(360px circle at var(--mx,50%) var(--my,50%), ${d.iconColor}14, transparent 60%)` }} />
                      <div className="cap-domain-strip" style={{ background: `linear-gradient(90deg, ${d.iconColor}, ${G.indigo})` }} />
                      <div className="cap-domain-ghost" style={{ backgroundImage: `linear-gradient(135deg, ${d.iconColor}, transparent)`, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                        {String(i + 1).padStart(2, '0')}
                      </div>
                      <div className="cap-domain-top">
                        <div className="cap-domain-icon" style={{ background: d.iconBg, boxShadow: `0 4px 14px ${d.iconColor}20` }}>
                          <d.Icon size={20} color={d.iconColor} />
                        </div>
                        <div className="cap-domain-badge" style={{ background: `${d.badgeColor}12`, border: `1px solid ${d.badgeColor}30`, color: d.badgeColor }}>
                          {d.badge}
                        </div>
                      </div>
                      <div className="cap-domain-title">{d.title}</div>
                      <div className="cap-domain-desc">{d.desc}</div>
                      <div className="cap-flip-hint"><Zap size={11} /> Click for stats</div>
                    </div>

                    {/* Back */}
                    <div className="cap-domain-card cap-flip-face cap-flip-back" style={{ background: `linear-gradient(160deg, ${d.iconColor}, #0b0d20)` }}>
                      <div className="cap-domain-back-title">{d.title}</div>
                      <div className="cap-domain-back-stats">
                        {d.stats.map((s, si) => (
                          <div key={`${s.label}-${si}`} className="cap-domain-back-stat">
                            <span className="cap-domain-back-v">{s.value}</span>
                            <span className="cap-domain-back-k">{s.label}</span>
                          </div>
                        ))}
                      </div>
                      <a href={hero.ctaLink} className="cap-domain-back-cta">
                        Talk to a Specialist <ArrowRight size={13} />
                      </a>
                    </div>

                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════ THE JOURNEY (accordion + autoplay) ════════════════════ */}
      <section className="cap-section" id="how-it-works" style={{ background: '#fff', position: 'relative', overflow: 'hidden' }}>
        <div aria-hidden className="cap-blob cap-blob-blue" style={{ top: '10%', left: '-160px' }} />
        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <div className="cap-center reveal" data-reveal>
            <SectionLabel text="The Journey" center />
            <h2 className="cap-h2">{journey.heading} <GradientText tag="span">{journey.headingGradient}</GradientText></h2>
          </div>

          {/* Controls */}
          <div className="cap-journey-controls reveal" data-reveal data-delay="0.1">
            <button type="button" className="cap-play-btn" data-journey-play aria-label="Auto play step journey">
              <span data-play-icon><Play size={13} /></span>
              <span data-play-label>Auto-Play Journey</span>
            </button>
            <span className="cap-journey-progress-text" data-journey-progress-text>
              Step 1 of {totalSteps} · {Math.round((1 / totalSteps) * 100)}% complete
            </span>
          </div>

          {/* Step navigator pills */}
          <div className="cap-step-nav reveal" data-reveal data-delay="0.14">
            {mergedSteps.map((step, i) => (
              <button
                key={step.num}
                type="button"
                className="cap-step-pill"
                data-step-pill={i}
                style={{ '--pill-color': DOT_COLORS[i % DOT_COLORS.length] } as React.CSSProperties}
              >
                <span className="cap-step-pill-num">{step.num}</span>
                <span className="cap-step-pill-label">{step.title.split(' ').slice(0, 2).join(' ')}</span>
              </button>
            ))}
          </div>

          <div className="cap-journey" data-journey-track>
            <div className="cap-journey-rail" />
            <div className="cap-journey-rail-fill" data-journey-fill />

            {mergedSteps.map((step, i) => {
              const col = DOT_COLORS[i % DOT_COLORS.length];
              const isLast = i === mergedSteps.length - 1;
              return (
                <div
                  key={step.num}
                  className={`cap-journey-item reveal ${i === 0 ? 'is-open' : ''}`}
                  data-reveal
                  data-journey-step={i}
                  data-delay={`${i * 0.06}`}
                >
                  <div className="cap-journey-dot-wrap">
                    <div className="cap-journey-dot-pulse" style={{ background: col }} />
                    <div className="cap-journey-dot" style={{ background: `linear-gradient(135deg, ${col}, ${G.indigo})`, boxShadow: `0 6px 18px ${col}45` }}>
                      {step.num}
                    </div>
                  </div>

                  <div className={`cap-journey-card ${isLast ? 'cap-journey-card-final' : ''}`}>
                    <div className="cap-journey-card-glow" style={{ background: `linear-gradient(135deg, ${col}, ${G.orange})` }} />

                    <button type="button" className="cap-journey-card-head" data-journey-toggle aria-expanded={i === 0}>
                      <div className="cap-journey-icon" style={{ background: `${col}15` }}>
                        <step.Icon size={18} color={col} />
                      </div>
                      <span className="cap-journey-title">{step.title}</span>
                      <span className="cap-journey-badge" style={{ background: `${col}12`, color: col, border: `1px solid ${col}30` }}>
                        {step.badge}
                      </span>
                      <span className="cap-journey-chevron" data-journey-chevron>▾</span>
                    </button>

                    <div className="cap-journey-body">
                      <div className="cap-journey-body-inner">
                        <p className="cap-journey-desc">{step.desc}</p>
                        <div className="cap-journey-tags">
                          {step.tags.map((tag, ti) => (
                            <span key={`${tag}-${ti}`} className="cap-journey-tag" style={{ animationDelay: `${ti * 0.06}s` }}>{tag}</span>
                          ))}
                        </div>
                      </div>
                    </div>

                    {isLast && (
                      <div className="cap-journey-sparkle">
                        <Sparkles size={16} color={G.orange} />
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ════════════════════ CTA ════════════════════ */}
      <section className="cap-section" style={{ background: '#fff' }}>
        <div className="container">
          <div className="cap-cta reveal" data-reveal>
            <div className="cap-cta-orb cap-cta-orb-blue" />
            <div className="cap-cta-orb cap-cta-orb-orange" />
            <div style={{ position: 'relative', zIndex: 1 }}>
              <SectionLabel text="Take Action" center light />
              <h2 className="cap-cta-h2"><GradientText tag="span">{cta.title}</GradientText></h2>
              <p className="cap-cta-body">{cta.body}</p>
              <div className="cap-btn-row" style={{ justifyContent: 'center', marginBottom: 0, display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                <a href={cta.primaryLink} className="cap-btn cap-btn-warm" data-magnetic>
                  <Rocket size={15} /> {cta.primaryText}
                  <span className="cap-arrow"><ArrowRight size={14} /></span>
                </a>
                <a href={`https://wa.me/${cta.whatsappNumber}`} target="_blank" rel="noopener noreferrer" className="cap-btn cap-btn-ghost-dark">
                  <MessageCircle size={15} /> {cta.whatsappText}
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ════════════════════ STICKY CTA BAR ════════════════════ */}
      <div className="cap-sticky-cta" data-sticky-cta>
        <div className="cap-sticky-cta-inner">
          <div className="cap-sticky-cta-text">
            <strong>{stickyCta.title}</strong>
            <span>{stickyCta.subtitle}</span>
          </div>
          <div className="cap-sticky-cta-actions">
            <a href={stickyCta.ctaLink} className="cap-btn cap-btn-primary" style={{ padding: '10px 22px', fontSize: '13px' }}>
              {stickyCta.ctaText} <ArrowRight size={13} />
            </a>
            <button type="button" className="cap-sticky-dismiss" data-sticky-dismiss aria-label="Dismiss banner">
              <X size={16} />
            </button>
          </div>
        </div>
      </div>

      {/* ════════════════════ STYLES ════════════════════ */}
      <style>{`
        @keyframes cap-grad { 0%{background-position:0% 50%} 50%{background-position:100% 50%} 100%{background-position:0% 50%} }
        @keyframes cap-blob-a { 0%,100%{transform:translate(0,0)} 50%{transform:translate(30px,20px)} }
        @keyframes cap-blob-b { 0%,100%{transform:translate(0,0)} 50%{transform:translate(-25px,-15px)} }
        @keyframes cap-arrow-bounce { 0%,100%{transform:translateX(0)} 50%{transform:translateX(4px)} }
        @keyframes cap-pulse-ring { 0%{transform:scale(1); opacity:.55} 70%{transform:scale(2.1); opacity:0} 100%{transform:scale(2.1); opacity:0} }
        @keyframes cap-tag-in { from{opacity:0; transform:translateY(6px)} to{opacity:1; transform:translateY(0)} }
        @keyframes cap-row-in { from{opacity:0; transform:translateX(-8px)} to{opacity:1; transform:translateX(0)} }
        @keyframes cap-sparkle-spin { 0%,100%{transform:rotate(0) scale(1)} 50%{transform:rotate(20deg) scale(1.15)} }
        @keyframes cap-ticker-dot-pulse { 0%,100%{opacity:1; transform:scale(1)} 50%{opacity:.4; transform:scale(1.3)} }
        @keyframes cap-fade-slide { from{opacity:0; transform:translateY(4px)} to{opacity:1; transform:translateY(0)} }
        @keyframes cap-sticky-in { from{transform:translateY(120%)} to{transform:translateY(0)} }

        .reveal { opacity:0; transform:translateY(28px); transition:opacity .5s cubic-bezier(.22,1,.36,1), transform .5s cubic-bezier(.22,1,.36,1); }
        .reveal.is-visible { opacity:1; transform:translateY(0); }

        .cap-progress-track { position:fixed; top:0; left:0; right:0; height:3px; background:transparent; z-index:9999; pointer-events:none; }
        .cap-progress-fill { height:100%; width:0%; background:linear-gradient(90deg, ${G.blue}, ${G.purple}, ${G.orange}); transition:width .1s linear; }

        .cap-blob { position:absolute; border-radius:50%; pointer-events:none; }
        .cap-blob-blue { top:-120px; left:-120px; width:520px; height:520px; background:radial-gradient(circle, ${G.blue}22 0%, transparent 70%); filter:blur(100px); animation:cap-blob-a 14s ease-in-out infinite; }
        .cap-blob-orange { top:15%; right:-140px; width:440px; height:440px; background:radial-gradient(circle, ${G.orange}1e 0%, transparent 70%); filter:blur(110px); animation:cap-blob-b 16s ease-in-out infinite 1s; }

        .cap-hero { position:relative; padding: calc(40px + 72px) 0 0; overflow:hidden; background:#fafbff; }
        .cap-breadcrumb { display:flex; align-items:center; gap:6px; font-size:13px; color:#94a3b8; margin-bottom:20px; }
        .cap-breadcrumb a { color:#94a3b8; text-decoration:none; }
        .cap-breadcrumb a:hover { color:${G.blue}; }
        .cap-sep { color:#cbd5e1; }
        .cap-current { color:#475569; font-weight:500; }

        .cap-h1 { font-size:clamp(2.2rem, 4.5vw, 3.6rem); font-weight:900; line-height:1.1; letter-spacing:-1.2px; color:#0b0d20; margin-bottom:18px; }
        .cap-h2 { font-size:clamp(1.8rem, 3vw, 2.6rem); font-weight:900; color:#0b0d20; line-height:1.14; letter-spacing:-0.7px; margin-bottom:16px; }
        .cap-lead { font-size:16.5px; color:#64748b; line-height:1.75; max-width:560px; margin-bottom:18px; }
        .cap-body { font-size:15.5px; color:#64748b; line-height:1.8; margin-bottom:20px; }

        .cap-ticker { display:inline-flex; align-items:center; gap:10px; background:#fff; border:1px solid #e2e8f0; border-radius:999px; padding:8px 16px 8px 8px; margin-bottom:20px; box-shadow:0 2px 10px rgba(0,0,0,.05); max-width:100%; }
        .cap-ticker-live { display:inline-flex; align-items:center; gap:5px; font-size:10px; font-weight:800; color:#ef4444; background:#fef2f2; padding:4px 8px; border-radius:999px; flex-shrink:0; }
        .cap-ticker-dot { width:6px; height:6px; border-radius:50%; background:#ef4444; animation:cap-ticker-dot-pulse 1.4s ease-in-out infinite; }
        .cap-ticker-text { font-size:12.5px; font-weight:600; color:#374151; white-space:nowrap; overflow:hidden; text-overflow:ellipsis; animation:cap-fade-slide .4s ease; }

        .cap-btn-row { display:flex; gap:12px; flex-wrap:wrap; margin-bottom:36px; }
        .cap-btn { display:inline-flex; align-items:center; gap:8px; font-weight:700; font-size:14px; padding:14px 30px; border-radius:999px; text-decoration:none; transition:transform .15s ease, box-shadow .2s ease; border:none; cursor:pointer; will-change:transform; }
        .cap-btn:hover { box-shadow:0 16px 36px rgba(37,99,235,.4); }
        .cap-btn-primary { background-image:linear-gradient(135deg, ${G.blue}, ${G.indigo}); color:#fff; box-shadow:0 8px 24px ${G.blue}35; }
        .cap-btn-warm { background-image:linear-gradient(135deg, ${G.orange}, ${G.rose}); color:#fff; box-shadow:0 8px 28px ${G.orange}40; }
        .cap-btn-ghost { background:#fff; color:#374151; border:1.5px solid #e2e8f0; box-shadow:0 2px 8px rgba(0,0,0,.05); }
        .cap-btn-ghost:hover { border-color:${G.blue}; transform:translateY(-3px); }
        .cap-btn-ghost-dark { background:transparent; color:#fff; border:1.5px solid rgba(255,255,255,.25); }
        .cap-btn-ghost-dark:hover { border-color:rgba(255,255,255,.5); transform:translateY(-3px); }
        .cap-arrow { display:inline-flex; animation:cap-arrow-bounce 1.3s ease-in-out infinite; }

        .cap-stats-4 { display:grid; border-top:1px solid #eef2ff; }
        .cap-stat-cell { text-align:center; padding:20px 16px; background:#fafbff; transition:background .25s ease; }
        .cap-stat-cell:hover { background:#fff; }
        .cap-stat-num { font-size:2rem; font-weight:900; line-height:1; margin-bottom:6px; }
        .cap-stat-label { font-size:12px; color:#94a3b8; font-weight:600; }

        .cap-section { padding:clamp(40px, 6vw, 64px) 0; }
        .cap-center { text-align:center; margin-bottom:32px; }
        .cap-two-col { display:grid; grid-template-columns:1fr 1fr; gap:40px; align-items:start; }

        .cap-benefit { display:flex; align-items:flex-start; gap:10px; padding:7px 10px; border-radius:12px; transition:background .2s ease, transform .2s ease; }
        .cap-benefit:hover { background:#f0f6ff; transform:translateX(4px); }
        .cap-benefit span { font-size:15px; color:#374151; line-height:1.55; }
        .cap-check { transition:transform .2s ease; }
        .cap-benefit:hover .cap-check { transform:scale(1.15); }

        .cap-share-card { position:relative; overflow:hidden; background:linear-gradient(160deg, #0b0d20 0%, #14163a 100%); border-radius:24px; color:#fff; padding:32px; transition:transform .3s ease; transform-style:preserve-3d; }
        .cap-share-orb { position:absolute; top:-60px; right:-60px; width:260px; height:260px; border-radius:50%; background:radial-gradient(circle, ${G.blue}30 0%, transparent 70%); pointer-events:none; animation:cap-blob-a 10s ease-in-out infinite; }

        .cap-calc { background:rgba(255,255,255,0.05); border:1px solid rgba(255,255,255,0.1); border-radius:16px; padding:18px; }
        .cap-calc-head { display:flex; align-items:center; gap:7px; font-size:11px; font-weight:700; color:rgba(255,255,255,0.6); text-transform:uppercase; letter-spacing:.5px; margin-bottom:12px; }
        .cap-calc-value-row { display:flex; justify-content:space-between; align-items:baseline; margin-bottom:8px; }
        .cap-calc-value-row span:first-child { font-size:12px; color:rgba(255,255,255,0.5); font-weight:600; }
        .cap-calc-ctc-display { font-size:20px; font-weight:900; color:#fff; }
        .cap-calc-range { position:relative; z-index:3; width:100%; -webkit-appearance:none; appearance:none; height:6px; border-radius:99px; background:linear-gradient(90deg, ${G.blue}, ${G.orange}); outline:none; margin-bottom:16px; cursor:pointer; touch-action:none; }
        .cap-calc-range::-webkit-slider-thumb { -webkit-appearance:none; appearance:none; width:20px; height:20px; border-radius:50%; background:#fff; border:3px solid ${G.blue}; box-shadow:0 2px 8px rgba(0,0,0,.4); cursor:pointer; transition:transform .15s ease; }
        .cap-calc-range::-webkit-slider-thumb:hover { transform:scale(1.15); }
        .cap-calc-range::-moz-range-thumb { width:20px; height:20px; border-radius:50%; background:#fff; border:3px solid ${G.blue}; cursor:pointer; }
        .cap-calc-results { display:grid; grid-template-columns:repeat(3,1fr); gap:10px; }
        .cap-calc-result { background:rgba(255,255,255,0.04); border-radius:10px; padding:10px 8px; text-align:center; }
        .cap-calc-result-k { display:block; font-size:9.5px; font-weight:700; color:rgba(255,255,255,0.4); text-transform:uppercase; letter-spacing:.4px; margin-bottom:4px; }
        .cap-calc-result-v { display:block; font-size:14.5px; font-weight:800; }

        .cap-share-table { width:100%; border-collapse:collapse; font-size:13px; }
        .cap-share-table th { padding:10px 8px; text-align:left; color:rgba(255,255,255,.45); font-weight:600; font-size:11px; text-transform:uppercase; letter-spacing:.4px; border-bottom:1px solid rgba(255,255,255,.12); }
        .cap-share-row { border-bottom:1px solid rgba(255,255,255,.06); opacity:0; animation:cap-row-in .5s ease forwards; transition:background .2s ease, transform .2s ease; }
        .cap-share-row:hover { background:rgba(255,255,255,.04); }
        .cap-share-row.is-highlighted { background:rgba(37,99,235,0.18); transform:scale(1.02); border-radius:8px; box-shadow:inset 0 0 0 1.5px ${G.blue}; }
        .cap-share-row td { padding:11px 8px; }
        .cap-roi-badge { margin-left:6px; background:rgba(74,222,128,.12); color:#4ade80; border:1px solid rgba(74,222,128,.2); border-radius:999px; padding:2px 8px; font-size:11px; font-weight:700; }

        .cap-domains-3 { display:grid; grid-template-columns:repeat(3,1fr); grid-auto-rows:1fr; gap:18px; align-items:stretch; }

        .cap-flip-outer { perspective:1400px; height:100%; }
        .cap-flip-card { display:block; width:100%; height:100%; cursor:pointer; outline:none; }
        .cap-flip-inner { position:relative; width:100%; height:100%; min-height:290px; transform-style:preserve-3d; transition:transform .6s cubic-bezier(.22,1,.36,1); }
        .cap-flip-inner.is-flipped { transform:rotateY(180deg); }
        .cap-flip-face { position:absolute; inset:0; backface-visibility:hidden; -webkit-backface-visibility:hidden; }
        .cap-flip-back { transform:rotateY(180deg); display:flex; flex-direction:column; justify-content:center; color:#fff; text-align:center; }

        .cap-domain-card { position:relative; background:#fff; border-radius:20px; padding:24px; border:1px solid rgba(15,23,42,.06); overflow:hidden; transition:box-shadow .3s ease; box-shadow:0 8px 28px rgba(15,23,42,.05); display:flex; flex-direction:column; gap:10px; height:100%; box-sizing:border-box; }
        .cap-flip-outer:hover .cap-domain-card:not(.cap-flip-back) { box-shadow:0 24px 60px rgba(37,99,235,.14); }
        .cap-domain-glow { position:absolute; inset:0; border-radius:20px; padding:1.5px; -webkit-mask:linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0); -webkit-mask-composite:xor; mask-composite:exclude; opacity:0; transition:opacity .3s ease; pointer-events:none; }
        .cap-flip-outer:hover .cap-domain-glow { opacity:1; }
        .cap-domain-spotlight { position:absolute; inset:0; opacity:0; transition:opacity .3s ease; pointer-events:none; }
        .cap-flip-outer:hover .cap-domain-spotlight { opacity:1; }
        .cap-domain-strip { position:absolute; top:0; left:0; right:0; height:3px; }
        .cap-domain-ghost { position:absolute; bottom:-18px; right:6px; font-size:80px; font-weight:900; opacity:.06; line-height:1; user-select:none; pointer-events:none; }
        .cap-domain-top { display:flex; align-items:center; justify-content:space-between; gap:10px; position:relative; z-index:1; }
        .cap-domain-icon { width:44px; height:44px; border-radius:12px; display:flex; align-items:center; justify-content:center; flex-shrink:0; transition:transform .3s ease; }
        .cap-flip-outer:hover .cap-domain-icon { transform:scale(1.1) rotate(-6deg); }
        .cap-domain-badge { display:inline-flex; align-items:center; gap:6px; width:fit-content; padding:4px 12px; border-radius:999px; font-size:11px; font-weight:700; white-space:nowrap; }
        .cap-domain-title { font-size:15px; font-weight:700; color:#0f172a; position:relative; z-index:1; display:-webkit-box; -webkit-line-clamp:1; -webkit-box-orient:vertical; overflow:hidden; }
        .cap-domain-desc { font-size:14px; color:#64748b; line-height:1.6; position:relative; z-index:1; flex:1; display:-webkit-box; -webkit-line-clamp:3; -webkit-box-orient:vertical; overflow:hidden; }
        .cap-flip-hint { display:inline-flex; align-items:center; gap:5px; font-size:10.5px; font-weight:700; color:${G.blue}; text-transform:uppercase; letter-spacing:.4px; position:relative; z-index:1; margin-top:auto; }

        .cap-domain-back-title { font-size:16px; font-weight:800; margin-bottom:16px; padding:0 20px; }
        .cap-domain-back-stats { display:flex; flex-direction:column; gap:10px; padding:0 24px; margin-bottom:16px; }
        .cap-domain-back-stat { display:flex; justify-content:space-between; align-items:baseline; border-bottom:1px solid rgba(255,255,255,.15); padding-bottom:8px; }
        .cap-domain-back-v { font-size:18px; font-weight:900; }
        .cap-domain-back-k { font-size:11px; color:rgba(255,255,255,.7); font-weight:600; }
        .cap-domain-back-cta { display:inline-flex; align-items:center; justify-content:center; gap:6px; margin:0 24px; padding:10px 16px; background:rgba(255,255,255,.15); border:1px solid rgba(255,255,255,.3); border-radius:999px; color:#fff; font-size:12.5px; font-weight:700; text-decoration:none; transition:background .2s ease; }
        .cap-domain-back-cta:hover { background:rgba(255,255,255,.25); }

        .cap-journey-controls { display:flex; align-items:center; justify-content:center; gap:16px; margin-bottom:18px; flex-wrap:wrap; }
        .cap-play-btn { display:inline-flex; align-items:center; gap:8px; padding:9px 18px; border-radius:999px; border:1.5px solid #e2e8f0; background:#fff; cursor:pointer; font-size:13px; font-weight:700; color:#374151; transition:all .2s ease; font-family:inherit; }
        .cap-play-btn:hover { border-color:${G.blue}; color:${G.blue}; }
        .cap-play-btn.is-playing { background:${G.blue}; border-color:${G.blue}; color:#fff; }
        .cap-journey-progress-text { font-size:12.5px; font-weight:600; color:#94a3b8; }

        .cap-step-nav { display:flex; gap:8px; flex-wrap:wrap; justify-content:center; margin-bottom:28px; }
        .cap-step-pill { display:flex; align-items:center; gap:8px; padding:8px 14px 8px 8px; border-radius:999px; border:1.5px solid #e2e8f0; background:#fff; cursor:pointer; transition:all .25s ease; font-family:inherit; }
        .cap-step-pill:hover { border-color:var(--pill-color); transform:translateY(-2px); }
        .cap-step-pill.is-active { border-color:var(--pill-color); background:color-mix(in srgb, var(--pill-color) 8%, white); box-shadow:0 4px 14px rgba(0,0,0,.08); }
        .cap-step-pill-num { width:22px; height:22px; border-radius:50%; background:var(--pill-color); color:#fff; font-size:11px; font-weight:800; display:flex; align-items:center; justify-content:center; flex-shrink:0; }
        .cap-step-pill-label { font-size:12px; font-weight:600; color:#64748b; white-space:nowrap; }
        .cap-step-pill.is-active .cap-step-pill-label { color:#0f172a; }

        .cap-journey { position:relative; max-width:820px; margin:0 auto; }
        .cap-journey-rail { position:absolute; left:21px; top:8px; bottom:8px; width:2px; background:#eef2ff; }
        .cap-journey-rail-fill { position:absolute; left:21px; top:8px; width:2px; height:0%; background:linear-gradient(to bottom, ${G.blue}, ${G.purple}, ${G.orange}); transition:height .25s linear; }

        .cap-journey-item { display:flex; gap:18px; position:relative; padding-bottom:16px; }
        .cap-journey-item:last-child { padding-bottom:0; }
        .cap-journey-dot-wrap { position:relative; width:44px; height:44px; flex-shrink:0; }
        .cap-journey-dot-pulse { position:absolute; inset:0; border-radius:50%; opacity:0; }
        .cap-journey-item.is-active .cap-journey-dot-pulse { animation:cap-pulse-ring 1.8s ease-out infinite; }
        .cap-journey-dot { width:44px; height:44px; border-radius:50%; display:flex; align-items:center; justify-content:center; font-size:15px; font-weight:800; color:#fff; position:relative; z-index:1; transition:transform .3s ease; }
        .cap-journey-item.is-active .cap-journey-dot { transform:scale(1.12); }

        .cap-journey-card { position:relative; background:#fff; border:1px solid #eef0f6; border-radius:18px; padding:0; flex:1; box-shadow:0 2px 12px rgba(0,0,0,.04); transition:box-shadow .3s ease, border-color .3s ease, transform .3s ease; overflow:hidden; }
        .cap-journey-item.is-active .cap-journey-card { box-shadow:0 16px 40px rgba(37,99,235,.14); border-color:rgba(37,99,235,.25); transform:translateX(4px); }
        .cap-journey-card-final { background:linear-gradient(135deg, #fff7ed, #fff); border-color:${G.orange}40; }
        .cap-journey-card-glow { position:absolute; top:0; left:0; right:0; height:3px; opacity:.85; }

        .cap-journey-card-head { all:unset; display:flex; align-items:center; gap:10px; padding:16px 20px; flex-wrap:wrap; cursor:pointer; width:100%; box-sizing:border-box; }
        .cap-journey-icon { width:32px; height:32px; border-radius:99px; display:flex; align-items:center; justify-content:center; transition:transform .3s ease; flex-shrink:0; }
        .cap-journey-item.is-active .cap-journey-icon { transform:rotate(-8deg) scale(1.08); }
        .cap-journey-title { font-size:15px; font-weight:700; color:#0b0d20; }
        .cap-journey-badge { margin-left:auto; padding:3px 10px; border-radius:999px; font-size:11px; font-weight:700; }
        .cap-journey-chevron { font-size:14px; color:#94a3b8; transition:transform .3s ease; margin-left:4px; }
        .cap-journey-item.is-open .cap-journey-chevron { transform:rotate(180deg); }

        .cap-journey-body { display:grid; grid-template-rows:0fr; transition:grid-template-rows .4s ease; }
        .cap-journey-item.is-open .cap-journey-body { grid-template-rows:1fr; }
        .cap-journey-body-inner { overflow:hidden; min-height:0; padding:0 20px; }
        .cap-journey-item.is-open .cap-journey-body-inner { padding:0 20px 16px; }
        .cap-journey-desc { font-size:14px; color:#64748b; line-height:1.65; margin:0 0 10px; }
        .cap-journey-tags { display:flex; flex-wrap:wrap; gap:6px; }
        .cap-journey-tag { font-size:11px; font-weight:600; color:#475569; border:1px solid #e2e8f0; border-radius:999px; padding:3px 10px; opacity:0; animation:cap-tag-in .4s ease forwards; }
        .cap-journey-sparkle { position:absolute; top:16px; right:16px; animation:cap-sparkle-spin 2.4s ease-in-out infinite; }

        .cap-cta { position:relative; border-radius:28px; padding:clamp(36px,6vw,56px) clamp(24px,6vw,64px); text-align:center; overflow:hidden; background:linear-gradient(135deg, #0b0d20 0%, #1a1040 50%, #0d1836 100%); }
        .cap-cta-orb { position:absolute; border-radius:50%; filter:blur(60px); pointer-events:none; }
        .cap-cta-orb-blue { top:-80px; left:10%; width:340px; height:340px; background:radial-gradient(circle, ${G.blue}35 0%, transparent 70%); animation:cap-blob-a 12s ease-in-out infinite; }
        .cap-cta-orb-orange { bottom:-60px; right:8%; width:300px; height:300px; background:radial-gradient(circle, ${G.orange}30 0%, transparent 70%); animation:cap-blob-b 14s ease-in-out infinite 1s; }
        .cap-cta-h2 { font-size:clamp(1.6rem, 3.2vw, 2.4rem); font-weight:900; line-height:1.18; letter-spacing:-0.5px; margin-bottom:12px; }
        .cap-cta-body { font-size:15px; color:rgba(255,255,255,.6); max-width:460px; margin:0 auto 24px; line-height:1.75; }

        .cap-sticky-cta { position:fixed; bottom:0; left:0; right:0; z-index:998; transform:translateY(120%); transition:transform .4s cubic-bezier(.22,1,.36,1); pointer-events:none; }
        .cap-sticky-cta.is-visible { transform:translateY(0); pointer-events:auto; animation:cap-sticky-in .4s cubic-bezier(.22,1,.36,1); }
        .cap-sticky-cta-inner { max-width:900px; margin:0 auto; background:#fff; border:1px solid #e2e8f0; border-radius:16px 16px 0 0; box-shadow:0 -8px 32px rgba(0,0,0,.12); padding:14px 20px; display:flex; align-items:center; justify-content:space-between; gap:16px; flex-wrap:wrap; }
        .cap-sticky-cta-text { display:flex; flex-direction:column; }
        .cap-sticky-cta-text strong { font-size:13.5px; color:#0b0d20; }
        .cap-sticky-cta-text span { font-size:11.5px; color:#64748b; }
        .cap-sticky-cta-actions { display:flex; align-items:center; gap:10px; }
        .cap-sticky-dismiss { all:unset; display:flex; align-items:center; justify-content:center; width:30px; height:30px; border-radius:50%; background:#f1f5f9; color:#64748b; cursor:pointer; transition:background .2s ease; }
        .cap-sticky-dismiss:hover { background:#e2e8f0; }

        @media (max-width: 900px) { .cap-step-nav { display:none; } }
        @media (max-width: 860px) {
          .cap-two-col { grid-template-columns:1fr !important; gap:28px !important; }
          .cap-domains-3 { grid-template-columns:1fr 1fr !important; }
        }
        @media (max-width: 640px) {
          .cap-sticky-cta-inner { flex-direction:column; align-items:stretch; text-align:center; }
          .cap-sticky-cta-actions { justify-content:center; }
        }
        @media (max-width: 580px) {
          .cap-stats-4 { grid-template-columns:repeat(2,1fr) !important; }
          .cap-domains-3 { grid-template-columns:1fr !important; grid-auto-rows:auto !important; }
          .cap-flip-inner { min-height:250px; }
          .cap-calc-results { grid-template-columns:1fr !important; }
          .cap-ticker-text { white-space:normal; }
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

                /* ── Scroll progress bar ── */
                var progressFill = document.querySelector('[data-scroll-progress]');
                function updateProgress() {
                  var h = document.documentElement;
                  var scrolled = window.pageYOffset || h.scrollTop;
                  var max = h.scrollHeight - h.clientHeight;
                  var pct = max > 0 ? (scrolled / max) * 100 : 0;
                  if (progressFill) progressFill.style.width = pct + '%';
                }

                /* ── Scroll reveal ── */
                var revealEls = document.querySelectorAll('[data-reveal]');
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
                    var duration = 1300;
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

                /* ── Live activity ticker (CMS-driven list) ── */
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
                      tickerText.style.animation = 'none';
                      void tickerText.offsetWidth;
                      tickerText.style.animation = 'cap-fade-slide .4s ease';
                    }, 250);
                  }, 3200);
                }

                /* ── Mouse-tracking spotlight on cards ── */
                document.querySelectorAll('[data-spotlight-card]').forEach(function (card) {
                  card.addEventListener('mousemove', function (e) {
                    var rect = card.getBoundingClientRect();
                    var x = ((e.clientX - rect.left) / rect.width) * 100;
                    var y = ((e.clientY - rect.top) / rect.height) * 100;
                    card.style.setProperty('--mx', x + '%');
                    card.style.setProperty('--my', y + '%');
                  });
                });

                /* ── Success-share card tilt ──
                   FIX: the calculator (and its range slider) lives inside this
                   tilting card. Re-tilting the whole card on every mousemove
                   while the user is dragging the slider thumb changes the
                   coordinate space under the cursor mid-drag, which is what
                   made the slider feel broken/unresponsive. We now skip the
                   tilt entirely whenever the pointer is over the calculator
                   ([data-no-tilt]), so dragging the range input is unaffected. */
                var tiltCard = document.querySelector('[data-tilt]');
                if (tiltCard) {
                  tiltCard.addEventListener('mousemove', function (e) {
                    if (e.target.closest('[data-no-tilt]')) {
                      tiltCard.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg)';
                      return;
                    }
                    var rect = tiltCard.getBoundingClientRect();
                    var px = (e.clientX - rect.left) / rect.width - 0.5;
                    var py = (e.clientY - rect.top) / rect.height - 0.5;
                    tiltCard.style.transform = 'perspective(1000px) rotateX(' + (py * -2) + 'deg) rotateY(' + (px * 2) + 'deg)';
                  });
                  tiltCard.addEventListener('mouseleave', function () {
                    tiltCard.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg)';
                  });
                }

                /* ── Interactive CTC calculator (percent from CMS) ── */
                var slider = document.querySelector('[data-ctc-slider]');
                var ctcValueEl = document.querySelector('[data-ctc-value]');
                var feeEl = document.querySelector('[data-ctc-fee]');
                var netEl = document.querySelector('[data-ctc-net]');
                var roiEl = document.querySelector('[data-ctc-roi]');
                var ctcRows = Array.prototype.slice.call(document.querySelectorAll('[data-ctc-row]'));
                var sharePct = slider ? (parseFloat(slider.getAttribute('data-share-percent')) || 12) / 100 : 0.12;

                function formatINR(n) {
                  return '₹' + Math.round(n).toLocaleString('en-IN');
                }
                function formatLakh(n) {
                  return '₹' + (n / 100000).toFixed(2).replace(/\\.00$/, '') + 'L';
                }

                function updateCalculator() {
                  if (!slider) return;
                  var val = parseFloat(slider.value);
                  var fee = val * sharePct;
                  var net = val - fee;
                  var roi = fee > 0 ? Math.max(1, Math.round(net / fee)) : 0;

                  if (ctcValueEl) ctcValueEl.textContent = formatINR(val);
                  if (feeEl) feeEl.textContent = formatINR(fee);
                  if (netEl) netEl.textContent = formatLakh(net);
                  if (roiEl) roiEl.textContent = roi + 'x ROI';

                  var closestRow = null;
                  var closestDist = Infinity;
                  ctcRows.forEach(function (row) {
                    var rowVal = parseFloat(row.getAttribute('data-ctc-num') || '0');
                    var dist = Math.abs(rowVal - val);
                    if (dist < closestDist) { closestDist = dist; closestRow = row; }
                  });
                  ctcRows.forEach(function (row) { row.classList.toggle('is-highlighted', row === closestRow); });
                }
                if (slider) {
                  slider.addEventListener('input', updateCalculator);
                  slider.addEventListener('pointerdown', function (e) { e.stopPropagation(); });
                  updateCalculator();
                }

                /* ── Flip cards ── */
                document.querySelectorAll('[data-flip-card]').forEach(function (card) {
                  var toggle = function (e) {
                    if (e.target.closest('a')) return;
                    var inner = card.querySelector('[data-flip-inner]');
                    if (inner) inner.classList.toggle('is-flipped');
                  };
                  card.addEventListener('click', toggle);
                  card.addEventListener('keydown', function(e) {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      toggle(e);
                    }
                  });
                });

                /* ── Journey: scroll-linked rail fill + active step tracking ── */
                var track = document.querySelector('[data-journey-track]');
                var fill = document.querySelector('[data-journey-fill]');
                var journeyItems = Array.prototype.slice.call(document.querySelectorAll('[data-journey-step]'));
                var stepPills = Array.prototype.slice.call(document.querySelectorAll('[data-step-pill]'));
                var progressText = document.querySelector('[data-journey-progress-text]');
                var totalSteps = journeyItems.length;
                var autoplayOn = false;
                var autoplayTimer = null;
                var autoplayIndex = 0;

                function setActiveStep(idx, openIt) {
                  journeyItems.forEach(function (item, i) {
                    item.classList.toggle('is-active', i === idx);
                    if (openIt) item.classList.toggle('is-open', i === idx);
                  });
                  stepPills.forEach(function (pill, i) { pill.classList.toggle('is-active', i === idx); });
                  if (progressText && totalSteps > 0) {
                    var pct = Math.round(((idx + 1) / totalSteps) * 100);
                    progressText.textContent = 'Step ' + (idx + 1) + ' of ' + totalSteps + ' · ' + pct + '% complete';
                  }
                }

                function updateJourneyFromScroll() {
                  if (!track || !fill || autoplayOn) return;
                  var rect = track.getBoundingClientRect();
                  var vh = window.innerHeight;
                  var total = rect.height;
                  var visible = Math.min(Math.max(vh * 0.6 - rect.top, 0), total);
                  var pct = total > 0 ? (visible / total) * 100 : 0;
                  fill.style.height = pct + '%';

                  var centerLine = vh * 0.45;
                  var closestIdx = 0;
                  var closestDist = Infinity;
                  journeyItems.forEach(function (item, idx) {
                    var r = item.getBoundingClientRect();
                    var mid = r.top + r.height / 2;
                    var dist = Math.abs(mid - centerLine);
                    if (dist < closestDist && r.top < vh && r.bottom > 0) {
                      closestDist = dist;
                      closestIdx = idx;
                    }
                  });
                  setActiveStep(closestIdx, false);
                }

                var ticking = false;
                document.addEventListener('scroll', function () {
                  updateProgress();
                  if (!ticking) {
                    requestAnimationFrame(updateJourneyFromScroll);
                    ticking = true;
                    setTimeout(function(){ ticking = false; }, 16);
                  }
                  updateStickyBar();
                }, { passive: true });
                window.addEventListener('resize', updateJourneyFromScroll);
                updateJourneyFromScroll();
                updateProgress();

                /* ── Step nav pill click → scroll to step, disables autoplay ── */
                stepPills.forEach(function (pill, idx) {
                  pill.addEventListener('click', function () {
                    stopAutoplay();
                    var target = journeyItems[idx];
                    if (target) {
                      var rect = target.getBoundingClientRect();
                      var scrollTop = window.pageYOffset + rect.top - (window.innerHeight * 0.3);
                      window.scrollTo({ top: scrollTop, behavior: 'smooth' });
                    }
                  });
                });

                /* ── Journey card click-to-toggle accordion ── */
                document.querySelectorAll('[data-journey-toggle]').forEach(function (btn, idx) {
                  btn.addEventListener('click', function () {
                    var item = journeyItems[idx];
                    if (item) {
                      var wasOpen = item.classList.contains('is-open');
                      item.classList.toggle('is-open');
                      btn.setAttribute('aria-expanded', String(!wasOpen));
                    }
                  });
                });

                /* ── Autoplay ── */
                var playBtn = document.querySelector('[data-journey-play]');
                var playIcon = document.querySelector('[data-play-icon]');
                var playLabel = document.querySelector('[data-play-label]');

                var playSVG = '<svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>';
                var pauseSVG = '<svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><rect x="6" y="4" width="4" height="16"></rect><rect x="14" y="4" width="4" height="16"></rect></svg>';

                function startAutoplay() {
                  autoplayOn = true;
                  autoplayIndex = 0;
                  if (playBtn) playBtn.classList.add('is-playing');
                  if (playLabel) playLabel.textContent = 'Pause Journey';
                  if (playIcon) playIcon.innerHTML = pauseSVG;
                  advanceAutoplay();
                  autoplayTimer = setInterval(advanceAutoplay, 3200);
                }
                function stopAutoplay() {
                  autoplayOn = false;
                  if (autoplayTimer) clearInterval(autoplayTimer);
                  if (playBtn) playBtn.classList.remove('is-playing');
                  if (playLabel) playLabel.textContent = 'Auto-Play Journey';
                  if (playIcon) playIcon.innerHTML = playSVG;
                }
                function advanceAutoplay() {
                  setActiveStep(autoplayIndex, true);
                  var target = journeyItems[autoplayIndex];
                  if (target) {
                    var rect = target.getBoundingClientRect();
                    var scrollTop = window.pageYOffset + rect.top - (window.innerHeight * 0.3);
                    window.scrollTo({ top: scrollTop, behavior: 'smooth' });
                  }
                  var fillPct = totalSteps > 0 ? ((autoplayIndex + 1) / totalSteps) * 100 : 0;
                  if (fill) fill.style.height = fillPct + '%';
                  autoplayIndex = (autoplayIndex + 1) % totalSteps;
                }
                if (playBtn) {
                  playBtn.addEventListener('click', function () {
                    if (autoplayOn) stopAutoplay(); else startAutoplay();
                  });
                }

                /* ── Sticky CTA bar ── */
                var stickyBar = document.querySelector('[data-sticky-cta]');
                var stickyDismiss = document.querySelector('[data-sticky-dismiss]');
                var stickyDismissed = false;
                try { stickyDismissed = sessionStorage.getItem('cap_sticky_dismissed') === '1'; } catch (e) {}

                function updateStickyBar() {
                  if (!stickyBar || stickyDismissed) return;
                  var heroEl = document.querySelector('.cap-hero');
                  var threshold = heroEl ? heroEl.offsetHeight : 500;
                  if (window.pageYOffset > threshold) stickyBar.classList.add('is-visible');
                  else stickyBar.classList.remove('is-visible');
                }
                if (stickyDismiss) {
                  stickyDismiss.addEventListener('click', function () {
                    stickyDismissed = true;
                    if (stickyBar) stickyBar.classList.remove('is-visible');
                    try { sessionStorage.setItem('cap_sticky_dismissed', '1'); } catch (e) {}
                  });
                }
                updateStickyBar();

                /* ── Magnetic buttons ── */
                document.querySelectorAll('[data-magnetic]').forEach(function (btn) {
                  btn.addEventListener('mousemove', function (e) {
                    var rect = btn.getBoundingClientRect();
                    var x = e.clientX - rect.left - rect.width / 2;
                    var y = e.clientY - rect.top - rect.height / 2;
                    btn.style.transform = 'translate(' + (x * 0.2) + 'px, ' + (y * 0.3 - 3) + 'px)';
                  });
                  btn.addEventListener('mouseleave', function () {
                    btn.style.transform = '';
                  });
                });

              });
            })();
          `,
        }}
      />

    </PageLayout>
  );
}