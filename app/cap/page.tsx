export const dynamic = 'force-dynamic';

import type { Metadata } from 'next';
import PageLayout from '../components/PageLayout';
import {
  HeartPulse, ClipboardList, Briefcase, BarChart3,
  RefreshCw, TrendingUp, Phone, Search, FileSignature,
  FileText, Mic2, Handshake, PartyPopper, CheckCircle2,
} from 'lucide-react';
import { getCmsMap, parseCmsJson } from '@/lib/cms';

export const metadata: Metadata = {
  title: 'Career Assistance Programme (CAP) — Placedly',
  description: 'Placedly CAP: The flagship career growth programme for BPO, Healthcare Claims, Insurance & Finance professionals.',
};

const ORANGE = '#f97316';
const ORANGE_DARK = '#ea580c';
const ORANGE_LIGHT = '#fff7ed';
const ORANGE_BORDER = '#fed7aa';
const BLACK = '#0a0a0a';
const GRAY = '#374151';
const GRAY_LIGHT = '#6b7280';
const BORDER = '#e5e7eb';
const BG_SOFT = '#fafafa';

const FONT = `"Inter","Outfit","Poppins",-apple-system,BlinkMacSystemFont,"Segoe UI",system-ui,sans-serif`;

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
  { Icon: HeartPulse,    title: 'US Healthcare Claims',  desc: 'CPT coding, ICD-10, adjudication, COB, denial management. Direct connections at EXL, Optum, WNS & more.',          badge: 'Strongest Domain' },
  { Icon: ClipboardList, title: 'Insurance Operations',   desc: "Lloyd's market, underwriting support, XIS submission, RFT compliance, claims processing.",                        badge: 'High Value'       },
  { Icon: Briefcase,     title: 'BPO / KPO Operations',   desc: 'Process associates, team leads, quality analysts, ops managers. Volume domain — fastest results.',                 badge: 'Fast Growth'      },
  { Icon: BarChart3,     title: 'Finance & Accounts',      desc: 'Accounts executives, finance analysts, payroll specialists, BFSI roles at growing companies.',                    badge: 'Growing'          },
  { Icon: RefreshCw,     title: 'Career Switchers',        desc: 'Gap in career? Domain switch needed? We know exactly how to present your story to land the role.',                badge: 'Specialist'       },
  { Icon: TrendingUp,    title: 'Salary Growth Seekers',   desc: 'Want 40–70% growth? This is exactly what the CAP is designed to deliver — real, fast career jumps.',             badge: 'High Impact'      },
];

const steps = [
  { num: 1, Icon: Phone,         title: 'Free Discovery Call',            badge: 'Free',                desc: "15-minute call. We understand your experience, goals and situation. Honest assessment — we'll tell you if we can help.",                                                tags: ['15–20 min', 'Zero Cost'] },
  { num: 2, Icon: Search,        title: 'Deep Profile Assessment',        badge: 'Foundation',          desc: '45–60 minute session. Full career story, strengths, gaps, target companies. Your personalized roadmap is built here.',                                               tags: ['45–60 min', 'Roadmap Delivered'] },
  { num: 3, Icon: FileSignature, title: 'Service Agreement Sign',         badge: 'Transparent',         desc: 'Digital service agreement signed. Scope, Success Share %, and terms — everything in writing before we start.',                                                       tags: ['Digital Agreement', 'Fully Transparent'] },
  { num: 4, Icon: FileText,      title: 'Resume & LinkedIn Rebuild',      badge: 'Core',                desc: 'ATS-friendly resume, achievement-based bullets, domain keywords. LinkedIn updated too. Ready in 1–2 days. 2 revisions included.',                                   tags: ['1–2 Days', 'ATS Optimized', '2 Revisions'] },
  { num: 5, Icon: Mic2,          title: 'Interview Mastery — 3 Sessions', badge: 'Biggest Edge',        desc: 'Session 1: HR Round. Session 2: Technical/Domain. Session 3: Full Mock + Salary Negotiation Script.',                                                               tags: ['~3 hrs total', 'Mock Interview', 'Negotiation Script'] },
  { num: 6, Icon: Handshake,     title: 'Direct Employer Connect',        badge: 'Our Work',            desc: 'Your profile goes directly to hiring managers at 10–15 target companies — with a warm intro from us. We follow up, schedule, and track everything.',                 tags: ['7–21 Days Active', '10–15 Companies'] },
  { num: 7, Icon: PartyPopper,   title: 'Career Grows — Success Share!',  badge: 'Partnership Complete', desc: 'New role confirmed. Better CTC. Real growth. Now we collect our Success Share — because we grew together.',                                                         tags: ['12% Success Share', '7 Day Window', 'GST Receipt'] },
];

type CapCmsData = {
  hero?: { tag?: string; title?: string; subtitle?: string };
  steps?: Array<{ id?: number; number?: number; title?: string; desc?: string; tag?: string }>;
  stats?: Array<{ label?: string; value?: string }>;
  shareTable?: Array<{ ctc: string; fee: string; net: string; roi: string }>;
};

export default async function CapPage() {
  const cmsMap = await getCmsMap('cap:');
  const capCms = parseCmsJson<CapCmsData>(cmsMap, 'cap:data', {});

  const heroTag      = capCms.hero?.tag      ?? 'Career Assistance Programme';
  const heroTitle    = capCms.hero?.title    ?? 'Not Just a Job. A Career Transformation.';
  const heroSubtitle = capCms.hero?.subtitle ?? "The CAP is Placedly's flagship programme for working professionals in BPO, Healthcare Claims, Insurance & Finance who want to grow — fast.";

  const defaultStats = [
    { num: '300+',  label: 'Professionals Placed' },
    { num: '60%+',  label: 'Avg. Career Growth'   },
    { num: '9 Days', label: 'Fastest Placement'   },
    { num: '₹0',    label: 'Upfront Cost'         },
  ];
  const heroStats = capCms.stats?.length
    ? capCms.stats.map(s => ({ num: s.value ?? '', label: s.label ?? '' }))
    : defaultStats;

  const shareTable = capCms.shareTable?.length
    ? capCms.shareTable
    : [
        { ctc: '₹3,00,000',  fee: '₹36,000',   net: '₹2.64L+', roi: '7x ROI' },
        { ctc: '₹4,50,000',  fee: '₹54,000',   net: '₹3.96L+', roi: '7x ROI' },
        { ctc: '₹6,00,000',  fee: '₹72,000',   net: '₹5.28L+', roi: '8x ROI' },
        { ctc: '₹8,00,000',  fee: '₹96,000',   net: '₹7.04L+', roi: '8x ROI' },
        { ctc: '₹10,00,000', fee: '₹1,20,000', net: '₹8.8L+',  roi: '9x ROI' },
      ];

  const mergedSteps = steps.map((step, i) => {
    const cms = capCms.steps?.[i];
    return { ...step, num: cms?.number ?? step.num, title: cms?.title ?? step.title, desc: cms?.desc ?? step.desc };
  });

  return (
    <PageLayout>
      <style>{`
        /* ── Reset / base ── */
        .cap-root, .cap-root * {
          font-family: ${FONT} !important;
          box-sizing: border-box;
        }

        /* ── Hero ── */
        .cap-hero {
          background: #fff;
          border-bottom: 1px solid ${BORDER};
          padding: 64px 0 56px;
        }
        .cap-hero-inner { max-width: 760px; }

        .cap-breadcrumb {
          display: flex; align-items: center; gap: 6px;
          font-size: 12px; color: ${GRAY_LIGHT};
          margin-bottom: 24px;
        }
        .cap-breadcrumb a { color: ${GRAY_LIGHT}; text-decoration: none; }
        .cap-breadcrumb a:hover { color: ${ORANGE}; }

        .cap-hero-tag {
          display: inline-flex; align-items: center; gap: 7px;
          padding: 5px 13px; border-radius: 999px;
          background: ${ORANGE_LIGHT}; border: 1px solid ${ORANGE_BORDER};
          font-size: 11.5px; font-weight: 700; color: ${ORANGE_DARK};
          text-transform: uppercase; letter-spacing: 0.06em;
          margin-bottom: 22px;
        }
        .cap-hero-tag-dot {
          width: 6px; height: 6px; border-radius: 50%; background: ${ORANGE};
        }

        .cap-hero-title {
          font-size: clamp(1.9rem, 4vw, 2.8rem);
          font-weight: 900; color: ${BLACK};
          line-height: 1.15; letter-spacing: -0.03em;
          margin: 0 0 16px;
        }
        .cap-hero-title em { font-style: normal; color: ${ORANGE}; }

        .cap-hero-subtitle {
          font-size: 15px; color: ${GRAY};
          line-height: 1.7; margin: 0 0 28px; max-width: 620px;
        }

        .cap-hero-ctas {
          display: flex; gap: 12px; flex-wrap: wrap; margin-bottom: 40px;
        }

        .cap-stats-strip {
          display: flex; gap: 0;
          border: 1px solid ${BORDER}; border-radius: 12px; overflow: hidden;
        }
        .cap-stat-item {
          flex: 1; padding: 16px 20px; text-align: center;
          border-right: 1px solid ${BORDER};
        }
        .cap-stat-item:last-child { border-right: none; }
        .cap-stat-num {
          font-size: 22px; font-weight: 900; color: ${ORANGE}; letter-spacing: -0.03em;
        }
        .cap-stat-label {
          font-size: 11px; font-weight: 600; color: ${GRAY_LIGHT};
          text-transform: uppercase; letter-spacing: 0.05em; margin-top: 3px;
        }

        /* ── Buttons — now fully rounded (pill shape) ── */
        .btn-primary {
          display: inline-flex; align-items: center; gap: 6px;
          background: ${ORANGE}; color: #fff !important;
          font-weight: 700; font-size: 14px;
          padding: 13px 28px; border-radius: 999px;
          text-decoration: none !important;
          border: 2px solid ${ORANGE};
          transition: background 0.18s, border-color 0.18s, transform 0.18s, box-shadow 0.18s;
        }
        .btn-primary:hover {
          background: ${ORANGE_DARK}; border-color: ${ORANGE_DARK};
          transform: translateY(-2px);
          box-shadow: 0 8px 20px rgba(249,115,22,0.28);
        }
        .btn-primary:active { transform: translateY(0); }

        .btn-ghost {
          display: inline-flex; align-items: center; gap: 6px;
          background: #fff; color: ${BLACK} !important;
          font-weight: 600; font-size: 14px;
          padding: 13px 28px; border-radius: 999px;
          text-decoration: none !important;
          border: 2px solid ${BORDER};
          transition: border-color 0.18s, color 0.18s, transform 0.18s;
        }
        .btn-ghost:hover {
          border-color: ${ORANGE}; color: ${ORANGE} !important;
          transform: translateY(-2px);
        }
        .btn-ghost:active { transform: translateY(0); }

        /* ── Section common ── */
        .cap-section { padding: 80px 0; }
        .cap-section-alt { padding: 80px 0; background: ${BG_SOFT}; }
        .cap-container { max-width: 1120px; margin: 0 auto; padding: 0 clamp(20px,4vw,40px); }

        .cap-eyebrow {
          display: inline-flex; align-items: center; gap: 8px;
          font-size: 11px; font-weight: 700; color: ${ORANGE};
          text-transform: uppercase; letter-spacing: 0.1em;
          margin-bottom: 10px;
        }
        .cap-eyebrow-bar {
          width: 24px; height: 2px; background: ${ORANGE}; border-radius: 999px;
        }

        .cap-section-title {
          font-size: clamp(1.4rem, 3vw, 2rem);
          font-weight: 900; color: ${BLACK};
          letter-spacing: -0.025em; line-height: 1.2;
          margin: 0 0 12px;
        }
        .cap-section-title em { font-style: normal; color: ${ORANGE}; }

        .cap-section-body {
          font-size: 15px; color: ${GRAY}; line-height: 1.7; margin: 0 0 28px;
        }

        /* ── What you get + share ── */
        .cap-two-col {
          display: grid; grid-template-columns: 1fr 1fr;
          gap: 48px; align-items: center;
        }

        .cap-benefits { display: flex; flex-direction: column; gap: 11px; }
        .cap-benefit-row {
          display: flex; align-items: flex-start; gap: 10px;
        }
        .cap-benefit-check {
          width: 20px; height: 20px; border-radius: 50%;
          background: ${ORANGE_LIGHT}; border: 1.5px solid ${ORANGE_BORDER};
          display: flex; align-items: center; justify-content: center; flex-shrink: 0;
          margin-top: 1px;
        }
        .cap-benefit-text {
          font-size: 14px; color: ${GRAY}; line-height: 1.55;
        }

        /* ── Share table card ── */
        .cap-share-card {
          border: 1.5px solid ${ORANGE_BORDER};
          border-radius: 16px; overflow: hidden;
          background: #fff;
        }
        .cap-share-card-header {
          background: ${ORANGE_LIGHT};
          padding: 20px 24px;
          border-bottom: 1.5px solid ${ORANGE_BORDER};
          display: flex; align-items: center; gap: 10px;
        }
        .cap-share-card-title {
          font-size: 15px; font-weight: 800; color: ${BLACK};
        }
        .cap-share-card-sub {
          font-size: 13px; color: ${GRAY}; line-height: 1.6;
          padding: 14px 24px 0;
        }
        .cap-share-table {
          width: 100%; border-collapse: collapse; font-size: 13px;
          margin-top: 14px;
        }
        .cap-share-table th {
          padding: 10px 16px;
          text-align: left; font-size: 10.5px; font-weight: 700;
          text-transform: uppercase; letter-spacing: 0.06em;
          color: ${GRAY_LIGHT}; border-bottom: 1px solid ${BORDER};
        }
        .cap-share-table td {
          padding: 12px 16px; border-bottom: 1px solid ${BORDER};
          color: ${BLACK}; font-weight: 500;
        }
        .cap-share-table tr:last-child td { border-bottom: none; }
        .cap-share-table .td-fee { color: ${ORANGE}; font-weight: 700; }
        .cap-share-table .td-net { color: #16a34a; font-weight: 700; }
        .cap-roi-badge {
          display: inline-block;
          background: #f0fdf4; color: #16a34a;
          border: 1px solid #bbf7d0; border-radius: 999px;
          padding: 2px 8px; font-size: 10.5px; font-weight: 700;
          margin-left: 6px;
        }
        .cap-share-note {
          font-size: 11px; color: ${GRAY_LIGHT};
          padding: 12px 24px 20px;
        }

        /* ── Domains ── */
        .cap-domains-grid {
          display: grid; grid-template-columns: repeat(3, 1fr); gap: 18px;
        }
        .cap-domain-card {
          background: #fff; border: 1.5px solid ${BORDER};
          border-radius: 14px; padding: 24px;
          display: flex; flex-direction: column; gap: 10px;
          transition: border-color 0.18s, box-shadow 0.18s;
        }
        .cap-domain-card:hover {
          border-color: ${ORANGE_BORDER};
          box-shadow: 0 4px 16px rgba(249,115,22,0.10);
        }
        .cap-domain-icon {
          width: 42px; height: 42px; border-radius: 10px;
          background: ${ORANGE_LIGHT}; border: 1.5px solid ${ORANGE_BORDER};
          display: flex; align-items: center; justify-content: center;
        }
        .cap-domain-badge {
          display: inline-flex; align-items: center;
          padding: 3px 10px; border-radius: 999px;
          background: ${ORANGE_LIGHT}; border: 1px solid ${ORANGE_BORDER};
          font-size: 10.5px; font-weight: 700; color: ${ORANGE_DARK};
          width: fit-content;
        }
        .cap-domain-title {
          font-size: 14.5px; font-weight: 800; color: ${BLACK};
        }
        .cap-domain-desc {
          font-size: 13px; color: ${GRAY_LIGHT}; line-height: 1.65;
        }

        /* ── Steps ── */
        .cap-steps-wrap {
          display: flex; flex-direction: column;
          max-width: 800px; margin: 0 auto;
        }
        .cap-step-row { display: flex; gap: 18px; align-items: stretch; }
        .cap-step-left {
          display: flex; flex-direction: column; align-items: center; flex-shrink: 0;
        }
        .cap-step-num {
          width: 42px; height: 42px; min-width: 42px; border-radius: 50%;
          background: ${ORANGE}; color: #fff;
          font-weight: 900; font-size: 15px;
          display: flex; align-items: center; justify-content: center;
          border: 2px solid ${ORANGE_DARK};
        }
        .cap-step-num--last { background: ${ORANGE_DARK}; }
        .cap-step-line {
          width: 2px; flex: 1; background: ${ORANGE_BORDER}; margin-top: 6px;
        }
        .cap-step-card {
          background: #fff; border: 1.5px solid ${BORDER};
          border-radius: 14px; padding: 18px 22px; flex: 1;
          margin-bottom: 8px;
          transition: border-color 0.18s;
        }
        .cap-step-card:hover { border-color: ${ORANGE_BORDER}; }
        .cap-step-card-top {
          display: flex; align-items: center; gap: 10px;
          flex-wrap: wrap; margin-bottom: 8px;
        }
        .cap-step-icon-wrap {
          width: 30px; height: 30px; border-radius: 7px;
          background: ${ORANGE_LIGHT}; border: 1px solid ${ORANGE_BORDER};
          display: flex; align-items: center; justify-content: center; flex-shrink: 0;
        }
        .cap-step-title {
          font-size: 14.5px; font-weight: 800; color: ${BLACK};
        }
        .cap-step-badge {
          margin-left: auto;
          padding: 3px 10px; border-radius: 999px;
          font-size: 10.5px; font-weight: 700;
          background: ${ORANGE_LIGHT}; color: ${ORANGE_DARK};
          border: 1px solid ${ORANGE_BORDER};
          white-space: nowrap;
        }
        .cap-step-desc {
          font-size: 13.5px; color: ${GRAY}; line-height: 1.65; margin-bottom: 12px;
        }
        .cap-step-tags { display: flex; flex-wrap: wrap; gap: 6px; }
        .cap-step-tag {
          font-size: 11px; font-weight: 600; color: ${GRAY};
          border: 1.5px solid ${BORDER}; border-radius: 999px; padding: 3px 10px;
        }

        /* ── Final CTA ── */
        .cap-cta-box {
          background: ${ORANGE_LIGHT};
          border: 2px solid ${ORANGE_BORDER};
          border-radius: 20px; padding: clamp(40px,6vw,72px) clamp(24px,6vw,64px);
          text-align: center;
        }
        .cap-cta-title {
          font-size: clamp(1.5rem, 3vw, 2.3rem);
          font-weight: 900; color: ${BLACK};
          letter-spacing: -0.03em; line-height: 1.2; margin-bottom: 12px;
        }
        .cap-cta-title em { font-style: normal; color: ${ORANGE}; }
        .cap-cta-sub {
          font-size: 15px; color: ${GRAY};
          max-width: 460px; margin: 0 auto 32px; line-height: 1.7;
        }
        .cap-cta-btns { display: flex; gap: 12px; justify-content: center; flex-wrap: wrap; }

        .btn-orange-outline {
          display: inline-flex; align-items: center; gap: 6px;
          background: #fff; color: ${ORANGE} !important;
          font-weight: 700; font-size: 14px;
          padding: 13px 28px; border-radius: 999px;
          text-decoration: none !important;
          border: 2px solid ${ORANGE};
          transition: background 0.18s, transform 0.18s, box-shadow 0.18s;
        }
        .btn-orange-outline:hover {
          background: ${ORANGE_LIGHT};
          transform: translateY(-2px);
          box-shadow: 0 8px 20px rgba(249,115,22,0.18);
        }
        .btn-orange-outline:active { transform: translateY(0); }

        /* ── Responsive ── */
        @media (max-width: 1024px) {
          .cap-domains-grid { grid-template-columns: repeat(2,1fr); }
        }
        @media (max-width: 768px) {
          .cap-two-col { grid-template-columns: 1fr; gap: 32px; }
          .cap-domains-grid { grid-template-columns: 1fr; }
          .cap-stats-strip { flex-wrap: wrap; }
          .cap-stat-item { border-right: none; border-bottom: 1px solid ${BORDER}; }
          .cap-stat-item:last-child { border-bottom: none; }
        }
      `}</style>

      <div className="cap-root">

        {/* ── Hero ── */}
        <section className="cap-hero">
          <div className="cap-container">
            <div className="cap-hero-inner">
              <nav className="cap-breadcrumb">
                <a href="/">Home</a><span>›</span>
                <span>CAP</span>
              </nav>
              <div className="cap-hero-tag">
                <div className="cap-hero-tag-dot" />
                {heroTag}
              </div>
              <h1 className="cap-hero-title">{heroTitle}</h1>
              <p className="cap-hero-subtitle">{heroSubtitle}</p>
              <div className="cap-hero-ctas">
                <a href="/cap/apply" className="btn-primary">Apply to CAP Now</a>
                <a href="#how-it-works" className="btn-ghost">See the Journey ↓</a>
              </div>
              <div className="cap-stats-strip">
                {heroStats.map(s => (
                  <div key={s.label} className="cap-stat-item">
                    <div className="cap-stat-num">{s.num}</div>
                    <div className="cap-stat-label">{s.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── What You Get + Success Share ── */}
        <section className="cap-section">
          <div className="cap-container">
            <div className="cap-two-col">
              <div>
                <div className="cap-eyebrow"><div className="cap-eyebrow-bar" />What&apos;s Included</div>
                <h2 className="cap-section-title">Everything You Get <em>in the CAP</em></h2>
                <p className="cap-section-body">A complete career transformation system — not just a resume, not just job leads. Everything, end to end.</p>
                <div className="cap-benefits">
                  {benefits.map(b => (
                    <div key={b} className="cap-benefit-row">
                      <span className="cap-benefit-check">
                        <CheckCircle2 size={13} color={ORANGE} />
                      </span>
                      <span className="cap-benefit-text">{b}</span>
                    </div>
                  ))}
                </div>
                <div style={{ marginTop: '28px' }}>
                  <a href="/cap/apply" className="btn-primary">Apply Now — It&apos;s Free to Start →</a>
                </div>
              </div>

              <div className="cap-share-card">
                <div className="cap-share-card-header">
                  <TrendingUp size={20} color={ORANGE} />
                  <span className="cap-share-card-title">Our Success Share Model</span>
                </div>
                <p className="cap-share-card-sub">
                  We invest everything first. You pay only when your career genuinely grows — after your offer letter arrives.
                </p>
                <table className="cap-share-table">
                  <thead>
                    <tr>
                      <th>Annual CTC</th>
                      <th>Service Fee</th>
                      <th>Your Net Gain</th>
                    </tr>
                  </thead>
                  <tbody>
                    {shareTable.map((row, i) => (
                      <tr key={i}>
                        <td style={{ fontWeight: 700, color: BLACK }}>{row.ctc}</td>
                        <td className="td-fee">{row.fee}</td>
                        <td>
                          <span className="td-net">{row.net}</span>
                          <span className="cap-roi-badge">{row.roi}</span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <p className="cap-share-note">* 12% Success Share of agreed annual CTC. GST receipt provided.</p>
              </div>
            </div>
          </div>
        </section>

        {/* ── Who We Help ── */}
        <section className="cap-section-alt">
          <div className="cap-container">
            <div style={{ textAlign: 'center', marginBottom: '44px' }}>
              <div className="cap-eyebrow" style={{ justifyContent: 'center' }}>
                <div className="cap-eyebrow-bar" />Who We Help
              </div>
              <h2 className="cap-section-title">Our <em>Specialist Domains</em></h2>
            </div>
            <div className="cap-domains-grid">
              {domains.map(({ Icon, title, desc, badge }) => (
                <div key={title} className="cap-domain-card">
                  <div className="cap-domain-icon">
                    <Icon size={20} color={ORANGE} />
                  </div>
                  <div className="cap-domain-badge">{badge}</div>
                  <div className="cap-domain-title">{title}</div>
                  <div className="cap-domain-desc">{desc}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── The Journey ── */}
        <section className="cap-section" id="how-it-works">
          <div className="cap-container">
            <div style={{ textAlign: 'center', marginBottom: '52px' }}>
              <div className="cap-eyebrow" style={{ justifyContent: 'center' }}>
                <div className="cap-eyebrow-bar" />The Journey
              </div>
              <h2 className="cap-section-title">Your 7-Step <em>Career Growth Path</em></h2>
            </div>
            <div className="cap-steps-wrap">
              {mergedSteps.map((step, i) => (
                <div key={step.num} className="cap-step-row">
                  <div className="cap-step-left">
                    <div className={`cap-step-num${i === mergedSteps.length - 1 ? ' cap-step-num--last' : ''}`}>
                      {step.num}
                    </div>
                    {i < mergedSteps.length - 1 && <div className="cap-step-line" />}
                  </div>
                  <div className="cap-step-card">
                    <div className="cap-step-card-top">
                      <div className="cap-step-icon-wrap">
                        <step.Icon size={15} color={ORANGE} />
                      </div>
                      <span className="cap-step-title">{step.title}</span>
                      <span className="cap-step-badge">{step.badge}</span>
                    </div>
                    <p className="cap-step-desc">{step.desc}</p>
                    <div className="cap-step-tags">
                      {step.tags.map(tag => (
                        <span key={tag} className="cap-step-tag">{tag}</span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Final CTA ── */}
        <section className="cap-section">
          <div className="cap-container">
            <div className="cap-cta-box">
              <h2 className="cap-cta-title">
                Ready to <em>Transform Your Career?</em>
              </h2>
              <p className="cap-cta-sub">
                Zero upfront. You only pay after your career grows. Start with a free 15-minute discovery call.
              </p>
              <div className="cap-cta-btns">
                <a href="/cap/apply" className="btn-primary">Apply to CAP Now</a>
                <a
                  href="https://wa.me/919876543210"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-orange-outline"
                >
                  WhatsApp Us
                </a>
              </div>
            </div>
          </div>
        </section>

      </div>
    </PageLayout>
  );
}
