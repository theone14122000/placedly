export const dynamic = 'force-dynamic';

import type { Metadata } from 'next';
import PageLayout from '../components/PageLayout';
import {
  HeartPulse, ClipboardList, Briefcase, BarChart3,
  RefreshCw, TrendingUp, Phone, Search, FileSignature,
  FileText, Mic2, Handshake, PartyPopper,
  CheckCircle2,
} from 'lucide-react';
import { getCmsMap, parseCmsJson } from '@/lib/cms';

export const metadata: Metadata = {
  title: 'Career Assistance Programme (CAP) — Placedly',
  description: 'Placedly CAP: The flagship career growth programme for BPO, Healthcare Claims, Insurance & Finance professionals. Resume rebuild, mock interviews, direct employer connect. Zero upfront.',
};

const benefits = [
  'ATS-Optimized Resume + LinkedIn Rebuild',
  '3 Mock Interview Sessions (HR + Technical + Negotiation)',
  'Personalized Career Roadmap & Strategy',
  'Direct Employer Connect — 10–15 Target Companies',
  'Offer Negotiation Script & Salary Support',
  '30-Day Post-Joining Support',
  '48-Hour WhatsApp Support Throughout',
];


const domains = [
  { Icon: HeartPulse,   iconBg: '#fef2f2', iconColor: '#ef4444', title: 'US Healthcare Claims',   desc: 'CPT coding, ICD-10, adjudication, COB, denial management. Direct connections at EXL, Optum, WNS & more.',           badge: 'Strongest Domain', badgeColor: '#ef4444' },
  { Icon: ClipboardList, iconBg: '#fff7ed', iconColor: '#f97316', title: 'Insurance Operations',    desc: "Lloyd's market, underwriting support, XIS submission, RFT compliance, claims processing.",                         badge: 'High Value',       badgeColor: '#f97316' },
  { Icon: Briefcase,    iconBg: '#eff6ff', iconColor: '#2145fb', title: 'BPO / KPO Operations',    desc: 'Process associates, team leads, quality analysts, ops managers. Volume domain — fastest results.',                  badge: 'Fast Growth',      badgeColor: '#2145fb' },
  { Icon: BarChart3,    iconBg: '#f0fdf4', iconColor: '#16a34a', title: 'Finance & Accounts',       desc: 'Accounts executives, finance analysts, payroll specialists, BFSI roles at growing companies.',                     badge: 'Growing',          badgeColor: '#16a34a' },
  { Icon: RefreshCw,    iconBg: '#faf5ff', iconColor: '#7c3aed', title: 'Career Switchers',         desc: 'Gap in career? Domain switch needed? We know exactly how to present your story to land the role.',                 badge: 'Specialist',       badgeColor: '#7c3aed' },
  { Icon: TrendingUp,   iconBg: '#ecfeff', iconColor: '#0891b2', title: 'Salary Growth Seekers',    desc: 'Want 40–70% growth? This is exactly what the CAP is designed to deliver — real, fast career jumps.',              badge: 'High Impact',      badgeColor: '#0891b2' },
];

const steps = [
  { num: 1, Icon: Phone,          title: 'Free Discovery Call',           badge: 'Free',                 desc: "15-minute call. We understand your experience, goals and situation. Honest assessment — we'll tell you if we can help.",                                                              tags: ['15–20 min', 'Zero Cost'] },
  { num: 2, Icon: Search,         title: 'Deep Profile Assessment',       badge: 'Foundation',           desc: '45–60 minute session. Full career story, strengths, gaps, target companies. Your personalized roadmap is built here.',                                                               tags: ['45–60 min', 'Roadmap Delivered'] },
  { num: 3, Icon: FileSignature,  title: 'Service Agreement Sign',        badge: 'Transparent',          desc: 'Digital service agreement signed. Scope, Success Share %, and terms — everything in writing before we start.',                                                                      tags: ['Digital Agreement', 'Fully Transparent'] },
  { num: 4, Icon: FileText,       title: 'Resume & LinkedIn Rebuild',     badge: 'Core',                 desc: 'ATS-friendly resume, achievement-based bullets, domain keywords. LinkedIn updated too. Ready in 1–2 days. 2 revisions included.',                                                  tags: ['1–2 Days', 'ATS Optimized', '2 Revisions'] },
  { num: 5, Icon: Mic2,           title: 'Interview Mastery — 3 Sessions',badge: 'Biggest Edge',        desc: 'Session 1: HR Round. Session 2: Technical/Domain. Session 3: Full Mock + Salary Negotiation Script.',                                                                              tags: ['~3 hrs total', 'Mock Interview', 'Negotiation Script'] },
  { num: 6, Icon: Handshake,      title: 'Direct Employer Connect',       badge: 'Our Work',             desc: 'Your profile goes directly to hiring managers at 10–15 target companies — with a warm intro from us. We follow up, schedule, and track everything.',                                tags: ['7–21 Days Active', '10–15 Companies'] },
  { num: 7, Icon: PartyPopper,    title: 'Career Grows — Success Share!', badge: 'Partnership Complete', desc: 'New role confirmed. Better CTC. Real growth. Now we collect our Success Share — because we grew together.',                                                                         tags: ['12% Success Share', '7 Day Window', 'GST Receipt'] },
];

type CapCmsData = {
  hero?: { tag?: string; title?: string; subtitle?: string; ctaText?: string; ctaLink?: string };
  steps?: Array<{ id?: number; number?: number; title?: string; desc?: string; tag?: string }>;
  stats?: Array<{ label?: string; value?: string }>;
  shareTable?: Array<{ ctc: string; fee: string; net: string; roi: string }>;
};

const STEP_ICONS = [Phone, Search, FileSignature, FileText, Mic2, Handshake, PartyPopper];

export default async function CapPage() {
  const cmsMap = await getCmsMap('cap:');
  const capCms = parseCmsJson<CapCmsData>(cmsMap, 'cap:data', {});

  const heroTag = capCms.hero?.tag ?? 'Career Assistance Programme';
  const heroTitle = capCms.hero?.title ?? 'Not Just a Job. A Career Transformation.';
  const heroSubtitle = capCms.hero?.subtitle ?? "The CAP is Placedly’s flagship programme for working professionals in BPO, Healthcare Claims, Insurance & Finance who want to grow — fast.";

  const cmsStats = capCms.stats;
  const defaultStats = [
    { num: '300+', label: 'Professionals Placed' },
    { num: '60%+', label: 'Avg. Career Growth' },
    { num: '9 Days', label: 'Fastest Placement' },
    { num: '₹0', label: 'Upfront Cost' },
  ];
  const heroStats = cmsStats && cmsStats.length > 0
    ? cmsStats.map(s => ({ num: s.value ?? '', label: s.label ?? '' }))
    : defaultStats;

  const shareTable = (capCms.shareTable && capCms.shareTable.length > 0)
    ? capCms.shareTable
    : [
        { ctc: '₹3,00,000',  fee: '₹36,000',   net: '₹2.64L+', roi: '7x ROI' },
        { ctc: '₹4,50,000',  fee: '₹54,000',   net: '₹3.96L+', roi: '7x ROI' },
        { ctc: '₹6,00,000',  fee: '₹72,000',   net: '₹5.28L+', roi: '8x ROI' },
        { ctc: '₹8,00,000',  fee: '₹96,000',   net: '₹7.04L+', roi: '8x ROI' },
        { ctc: '₹10,00,000', fee: '₹1,20,000', net: '₹8.8L+',  roi: '9x ROI' },
      ];

  const cmsSteps = capCms.steps;
  const mergedSteps = steps.map((step, i) => {
    const cms = cmsSteps?.[i];
    return {
      ...step,
      num: cms?.number ?? step.num,
      title: cms?.title ?? step.title,
      desc: cms?.desc ?? step.desc,
    };
  });


  return (
    <PageLayout>
      {/* ── Hero ── */}
      <section className="page-hero">
        <div className="container">
          <div className="page-hero-inner">
            <nav className="page-hero-breadcrumb">
              <a href="/">Home</a><span>›</span>
              <span style={{ color: 'var(--c-body)' }}>CAP</span>
            </nav>
            <div className="page-hero-tag">
              <div className="page-hero-tag-dot" />
              <span>{heroTag}</span>
            </div>
            <h1 className="page-hero-title">
              {heroTitle}
            </h1>
            <p className="page-hero-subtitle">
              {heroSubtitle}
            </p>
            <div className="page-hero-ctas">
              <a href="/cap/apply" className="page-cta-primary">Apply to CAP Now</a>
              <a href="#how-it-works" className="page-cta-ghost">See the Journey ↓</a>
            </div>
            <div className="page-stats-strip">
              {heroStats.map(s => (
                <div key={s.label} className="page-stat-item">
                  <div className="page-stat-num">{s.num}</div>
                  <div className="page-stat-label">{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── What You Get + Success Share ── */}
      <section className="inner-section">
        <div className="container">
          <div className="page-two-col cap-share-grid" style={{ display: 'grid', gap: '40px', alignItems: 'center' }}>
            <div>
              <div className="section-eyebrow"><div className="section-eyebrow-bar" />What&apos;s Included</div>
              <h2 className="section-heading">Everything You Get <em>in the CAP</em></h2>
              <p className="section-body">A complete career transformation system — not just a resume, not just job leads. Everything, end to end.</p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {benefits.map(b => (
                  <div key={b} style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                    <CheckCircle2 size={18} color="#2145fb" style={{ flexShrink: 0, marginTop: '2px' }} />
                    <span style={{ fontSize: '15px', color: '#374151', lineHeight: 1.55 }}>{b}</span>
                  </div>
                ))}
              </div>
              <div style={{ marginTop: '32px' }}>
                <a href="/cap/apply" className="page-cta-primary" style={{ display: 'inline-flex', textDecoration: 'none' }}>Apply Now — It&apos;s Free to Start →</a>
              </div>
            </div>

            <div className="cap-share-card" style={{ background: '#0b0d20', borderRadius: '20px', color: '#fff' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
                <TrendingUp size={22} color="#f97316" />
                <div style={{ fontSize: '18px', fontWeight: 800 }}>Our Success Share Model</div>
              </div>
              <p style={{ fontSize: '14px', color: 'rgba(255,255,255,0.7)', lineHeight: 1.7, marginBottom: '24px' }}>
                We invest everything first. You pay only when your career genuinely grows — after your offer letter arrives.
              </p>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px' }}>
                <thead>
                  <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.12)' }}>
                    {['Annual CTC', 'Service Fee', 'Your Net Gain'].map(h => (
                      <th key={h} style={{ padding: '10px 8px', textAlign: 'left', color: 'rgba(255,255,255,0.45)', fontWeight: 600, fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.4px' }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {shareTable.map((row, i) => (
                    <tr key={i} style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
                      <td style={{ padding: '11px 8px', color: '#fff', fontWeight: 600 }}>{row.ctc}</td>
                      <td style={{ padding: '11px 8px', color: '#f97316' }}>{row.fee}</td>
                      <td style={{ padding: '11px 8px' }}>
                        <span style={{ color: '#4ade80', fontWeight: 700 }}>{row.net}</span>
                        <span style={{ marginLeft: '6px', background: 'rgba(74,222,128,0.12)', color: '#4ade80', border: '1px solid rgba(74,222,128,0.2)', borderRadius: '999px', padding: '2px 8px', fontSize: '11px', fontWeight: 700 }}>{row.roi}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <p style={{ fontSize: '12px', color: 'rgba(255,255,255,0.35)', marginTop: '16px' }}>* 12% Success Share of agreed annual CTC. GST receipt provided.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Who We Help ── */}
      <section className="inner-section alt" style={{ padding: '80px 0' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '48px' }}>
            <div className="section-eyebrow" style={{ justifyContent: 'center' }}><div className="section-eyebrow-bar" />Who We Help</div>
            <h2 className="section-heading">Our <em>Specialist Domains</em></h2>
          </div>
          <div className="cap-domains-3" style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '20px' }}>
            {domains.map(({ Icon, iconBg, iconColor, title, desc, badge, badgeColor }) => (
              <div key={title} style={{ background: '#fff', borderRadius: '16px', padding: '28px', border: '1px solid #eef0f6', boxShadow: '0 1px 4px rgba(0,0,0,.04)', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <div style={{ width: '44px', height: '44px', borderRadius: '12px', background: iconBg, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Icon size={20} color={iconColor} />
                </div>
                <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', width: 'fit-content', padding: '4px 12px', borderRadius: '999px', background: `${badgeColor}12`, border: `1px solid ${badgeColor}30` }}>
                  <span style={{ fontSize: '11px', fontWeight: 700, color: badgeColor }}>{badge}</span>
                </div>
                <div style={{ fontSize: '15px', fontWeight: 700, color: '#0f172a' }}>{title}</div>
                <div style={{ fontSize: '14px', color: '#64748b', lineHeight: 1.65 }}>{desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── The Journey ── */}
      <section className="inner-section" style={{ padding: '80px 0' }} id="how-it-works">
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '56px' }}>
            <div className="section-eyebrow" style={{ justifyContent: 'center' }}><div className="section-eyebrow-bar" />The Journey</div>
            <h2 className="section-heading">Your 7-Step <em>Career Growth Path</em></h2>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0', maxWidth: '800px', margin: '0 auto' }}>
            {mergedSteps.map((step, i) => (
              <div key={step.num} style={{ display: 'flex', gap: '20px', alignItems: 'stretch' }}>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flexShrink: 0 }}>
                  <div style={{ width: '44px', height: '44px', minWidth: '44px', borderRadius: '50%', background: i === 6 ? '#f97316' : '#2145fb', color: '#fff', fontWeight: 800, fontSize: '15px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    {step.num}
                  </div>
                  {i < steps.length - 1 && <div style={{ width: '2px', flex: 1, background: '#eef0f6', marginTop: '6px', alignSelf: 'center' }} />}
                </div>
                <div style={{ background: '#fff', border: '1px solid #eef0f6', borderRadius: '16px', padding: '20px 24px', flex: 1, boxShadow: '0 1px 4px rgba(0,0,0,.04)', marginBottom: i < steps.length - 1 ? '8px' : 0 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px', flexWrap: 'wrap' }}>
                    <div style={{ width: '32px', height: '32px', borderRadius: '8px', background: '#eff6ff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <step.Icon size={16} color="#2145fb" />
                    </div>
                    <span style={{ fontSize: '15px', fontWeight: 700, color: '#0b0d20' }}>{step.title}</span>
                    <span style={{ marginLeft: 'auto', padding: '3px 10px', borderRadius: '999px', fontSize: '11px', fontWeight: 700, background: '#f0f9ff', color: '#0284c7', border: '1px solid #bae6fd' }}>{step.badge}</span>
                  </div>
                  <p style={{ fontSize: '14px', color: '#64748b', lineHeight: 1.65, marginBottom: '12px' }}>{step.desc}</p>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                    {step.tags.map(tag => (
                      <span key={tag} style={{ fontSize: '11px', fontWeight: 600, color: '#475569', border: '1px solid #e2e8f0', borderRadius: '999px', padding: '3px 10px' }}>{tag}</span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="inner-section" style={{ padding: '80px 0' }}>
        <div className="container">
          <div className="page-dark-cta" style={{ background: '#0b0d20', borderRadius: '24px', padding: '72px 64px', textAlign: 'center' }}>
            <h2 style={{ fontSize: 'clamp(1.6rem,3vw,2.4rem)', fontWeight: 900, color: '#fff', lineHeight: 1.2, letterSpacing: '-0.5px', marginBottom: '12px' }}>Ready to Transform Your Career?</h2>
            <p style={{ fontSize: '15px', color: 'rgba(255,255,255,.6)', maxWidth: '480px', margin: '0 auto 32px' }}>Zero upfront. You only pay after your career grows. Start with a free 15-minute discovery call.</p>
            <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
              <a href="/cap/apply" style={{ display: 'inline-flex', alignItems: 'center', background: '#f97316', color: '#fff', fontWeight: 700, fontSize: '14px', fontFamily: 'Poppins,sans-serif', padding: '14px 32px', borderRadius: '999px', textDecoration: 'none', boxShadow: '0 4px 16px rgba(249,115,22,.35)' }}>Apply to CAP Now</a>
              <a href="https://wa.me/919876543210" target="_blank" rel="noopener noreferrer" style={{ display: 'inline-flex', alignItems: 'center', background: 'transparent', color: '#fff', fontWeight: 500, fontSize: '14px', fontFamily: 'Poppins,sans-serif', padding: '14px 32px', borderRadius: '999px', textDecoration: 'none', border: '1.5px solid rgba(255,255,255,.25)' }}>WhatsApp Us</a>
            </div>
          </div>
        </div>
      </section>
    </PageLayout>
  );
}
