export const dynamic = 'force-dynamic';

import type { Metadata } from 'next';
import PageLayout from '../components/PageLayout';
import {
  HeartPulse, ClipboardList, Briefcase, BarChart3,
  RefreshCw, TrendingUp, Phone, Search, FileSignature,
  FileText, Mic2, Handshake, PartyPopper,
  CheckCircle2, Sparkles, ArrowRight, Rocket, MessageCircle,
} from 'lucide-react';
import { getCmsMap, parseCmsJson } from '@/lib/cms';

export const metadata: Metadata = {
  title: 'Career Assistance Programme (CAP) — Placedly',
  description: 'Placedly CAP: The flagship career growth programme for BPO, Healthcare Claims, Insurance & Finance professionals. Resume rebuild, mock interviews, direct employer connect. Zero upfront.',
};

/* ── Brand tokens (site-wide) ── */
const G = {
  blue:   '#2563eb',
  indigo: '#7c8ff0',
  orange: '#fb923c',
  rose:   '#f43f5e',
  purple: '#a855f7',
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
  { Icon: HeartPulse,    iconBg: '#fef2f2', iconColor: '#ef4444', title: 'US Healthcare Claims',  desc: 'CPT coding, ICD-10, adjudication, COB, denial management. Direct connections at EXL, Optum, WNS & more.',      badge: 'Strongest Domain',   badgeColor: '#ef4444' },
  { Icon: ClipboardList, iconBg: '#fff7ed', iconColor: G.orange,  title: 'Insurance Operations',   desc: "Lloyd's market, underwriting support, XIS submission, RFT compliance, claims processing.",                    badge: 'High Value',         badgeColor: G.orange },
  { Icon: Briefcase,     iconBg: '#eff6ff', iconColor: G.blue,    title: 'BPO / KPO Operations',   desc: 'Process associates, team leads, quality analysts, ops managers. Volume domain — fastest results.',           badge: 'Fast Growth',        badgeColor: G.blue },
  { Icon: BarChart3,     iconBg: '#f0fdf4', iconColor: '#16a34a', title: 'Finance & Accounts',     desc: 'Accounts executives, finance analysts, payroll specialists, BFSI roles at growing companies.',               badge: 'Growing',            badgeColor: '#16a34a' },
  { Icon: RefreshCw,     iconBg: '#faf5ff', iconColor: G.purple,  title: 'Career Switchers',       desc: 'Gap in career? Domain switch needed? We know exactly how to present your story to land the role.',           badge: 'Specialist',         badgeColor: G.purple },
  { Icon: TrendingUp,    iconBg: '#ecfeff', iconColor: '#0891b2', title: 'Salary Growth Seekers',  desc: 'Want 40–70% growth? This is exactly what the CAP is designed to deliver — real, fast career jumps.',         badge: 'High Impact',        badgeColor: '#0891b2' },
];

const steps = [
  { num: 1, Icon: Phone,         title: 'Free Discovery Call',            badge: 'Free',                 desc: "15-minute call. We understand your experience, goals and situation. Honest assessment — we'll tell you if we can help.",                             tags: ['15–20 min', 'Zero Cost'] },
  { num: 2, Icon: Search,        title: 'Deep Profile Assessment',        badge: 'Foundation',           desc: '45–60 minute session. Full career story, strengths, gaps, target companies. Your personalized roadmap is built here.',                              tags: ['45–60 min', 'Roadmap Delivered'] },
  { num: 3, Icon: FileSignature, title: 'Service Agreement Sign',         badge: 'Transparent',          desc: 'Digital service agreement signed. Scope, Success Share %, and terms — everything in writing before we start.',                                    tags: ['Digital Agreement', 'Fully Transparent'] },
  { num: 4, Icon: FileText,      title: 'Resume & LinkedIn Rebuild',      badge: 'Core',                 desc: 'ATS-friendly resume, achievement-based bullets, domain keywords. LinkedIn updated too. Ready in 1–2 days. 2 revisions included.',                    tags: ['1–2 Days', 'ATS Optimized', '2 Revisions'] },
  { num: 5, Icon: Mic2,          title: 'Interview Mastery — 3 Sessions', badge: 'Biggest Edge',         desc: 'Session 1: HR Round. Session 2: Technical/Domain. Session 3: Full Mock + Salary Negotiation Script.',                                              tags: ['~3 hrs total', 'Mock Interview', 'Negotiation Script'] },
  { num: 6, Icon: Handshake,     title: 'Direct Employer Connect',        badge: 'Our Work',             desc: 'Your profile goes directly to hiring managers at 10–15 target companies — with a warm intro from us. We follow up, schedule, and track everything.', tags: ['7–21 Days Active', '10–15 Companies'] },
  { num: 7, Icon: PartyPopper,   title: 'Career Grows — Success Share!',  badge: 'Partnership Complete', desc: 'New role confirmed. Better CTC. Real growth. Now we collect our Success Share — because we grew together.',                                     tags: ['12% Success Share', '7 Day Window', 'GST Receipt'] },
];

const DOT_COLORS = [G.blue, G.orange, G.purple, '#16a34a', G.rose, '#0891b2', G.blue];

type CapCmsData = {
  hero?: { tag?: string; title?: string; subtitle?: string; ctaText?: string; ctaLink?: string };
  steps?: Array<{ id?: number; number?: number; title?: string; desc?: string; tag?: string }>;
  stats?: Array<{ label?: string; value?: string }>;
  shareTable?: Array<{ ctc: string; fee: string; net: string; roi: string }>;
};

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
      textTransform: 'uppercase', marginBottom: '18px',
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
  const capCms = parseCmsJson<CapCmsData>(cmsMap, 'cap:data', {});

  const heroTag = capCms.hero?.tag ?? 'Career Assistance Programme';
  const heroTitle = capCms.hero?.title ?? 'Not Just a Job. A Career Transformation.';
  const heroSubtitle = capCms.hero?.subtitle ?? "The CAP is Placedly's flagship programme for working professionals in BPO, Healthcare Claims, Insurance & Finance who want to grow — fast.";

  const cmsStats = capCms.stats;
  const defaultStats = [
    { num: '300+', label: 'Professionals Placed' },
    { num: '60%+', label: 'Avg. Career Growth' },
    { num: '9', label: 'Fastest Placement (Days)' },
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

      {/* ════════════════════ HERO ════════════════════ */}
      <section className="cap-hero">
        <AmbientBlobs />
        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <nav className="cap-breadcrumb reveal" data-reveal>
            <a href="/">Home</a><span className="cap-sep">›</span>
            <span className="cap-current">CAP</span>
          </nav>

          <div style={{ maxWidth: '780px' }}>
            <div className="reveal" data-reveal><SectionLabel text={heroTag} /></div>

            <h1 className="cap-h1 reveal" data-reveal data-delay="0.08">
              Not Just a Job.{' '}
              <GradientText tag="h1" style={{ display: 'inline' }}>A Career Transformation.</GradientText>
            </h1>

            <p className="cap-lead reveal" data-reveal data-delay="0.16">{heroSubtitle}</p>

            <div className="cap-btn-row reveal" data-reveal data-delay="0.24">
              <a href="/cap/apply" className="cap-btn cap-btn-primary">
                <Rocket size={15} /> Apply to CAP Now
                <span className="cap-arrow"><ArrowRight size={14} /></span>
              </a>
              <a href="#how-it-works" className="cap-btn cap-btn-ghost">See the Journey</a>
            </div>
          </div>

          <div className="cap-stats-4">
            {heroStats.map((s, i) => (
              <div key={s.label} className="cap-stat-cell reveal" data-reveal data-delay={`${i * 0.08}`}
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

      {/* ════════════════════ WHAT YOU GET + SUCCESS SHARE ════════════════════ */}
      <section className="cap-section" style={{ background: '#fff' }}>
        <div className="container">
          <div className="cap-two-col">
            <div className="reveal" data-reveal>
              <SectionLabel text="What's Included" />
              <h2 className="cap-h2">Everything You Get <GradientText tag="h2">in the CAP</GradientText></h2>
              <p className="cap-body">A complete career transformation system — not just a resume, not just job leads. Everything, end to end.</p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                {benefits.map((b, i) => (
                  <div key={b} className="cap-benefit reveal" data-reveal data-delay={`${0.1 + i * 0.05}`}>
                    <CheckCircle2 size={18} color={G.blue} className="cap-check" style={{ flexShrink: 0, marginTop: '2px' }} />
                    <span>{b}</span>
                  </div>
                ))}
              </div>

              <div style={{ marginTop: '32px' }}>
                <a href="/cap/apply" className="cap-btn cap-btn-primary">
                  Apply Now — It&apos;s Free to Start
                  <span className="cap-arrow"><ArrowRight size={14} /></span>
                </a>
              </div>
            </div>

            <div className="cap-share-card reveal" data-reveal data-delay="0.15" data-tilt>
              <div aria-hidden className="cap-share-orb" />
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px', position: 'relative', zIndex: 1 }}>
                <TrendingUp size={22} color={G.orange} />
                <div style={{ fontSize: '18px', fontWeight: 800 }}>Our Success Share Model</div>
              </div>
              <p style={{ fontSize: '14px', color: 'rgba(255,255,255,0.65)', lineHeight: 1.7, marginBottom: '24px', position: 'relative', zIndex: 1 }}>
                We invest everything first. You pay only when your career genuinely grows — after your offer letter arrives.
              </p>
              <table className="cap-share-table" style={{ position: 'relative', zIndex: 1 }}>
                <thead>
                  <tr>
                    {['Annual CTC', 'Service Fee', 'Your Net Gain'].map(h => <th key={h}>{h}</th>)}
                  </tr>
                </thead>
                <tbody>
                  {shareTable.map((row, i) => (
                    <tr key={i} className="cap-share-row" style={{ animationDelay: `${i * 0.08}s` }}>
                      <td style={{ fontWeight: 600, color: '#fff' }}>{row.ctc}</td>
                      <td style={{ color: G.orange }}>{row.fee}</td>
                      <td>
                        <span style={{ color: '#4ade80', fontWeight: 700 }}>{row.net}</span>
                        <span className="cap-roi-badge">{row.roi}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <p style={{ fontSize: '12px', color: 'rgba(255,255,255,0.35)', marginTop: '16px', position: 'relative', zIndex: 1 }}>
                * 12% Success Share of agreed annual CTC. GST receipt provided.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ════════════════════ WHO WE HELP ════════════════════ */}
      <section className="cap-section" style={{ background: '#f8faff', position: 'relative', overflow: 'hidden' }}>
        <AmbientBlobs />
        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <div className="cap-center reveal" data-reveal>
            <SectionLabel text="Who We Help" center />
            <h2 className="cap-h2">Our <GradientText tag="h2">Specialist Domains</GradientText></h2>
          </div>

          <div className="cap-domains-3">
            {domains.map((d, i) => (
              <div key={d.title} className="cap-domain-card reveal" data-reveal data-delay={`${i * 0.08}`} data-spotlight-card
                style={{ '--accent': d.iconColor } as React.CSSProperties}>
                <div className="cap-domain-glow" style={{ background: `linear-gradient(135deg, ${d.iconColor}, ${G.orange})` }} />
                <div className="cap-domain-spotlight" data-spotlight
                  style={{ background: `radial-gradient(360px circle at var(--mx,50%) var(--my,50%), ${d.iconColor}14, transparent 60%)` }} />
                <div className="cap-domain-strip" style={{ background: `linear-gradient(90deg, ${d.iconColor}, ${G.indigo})` }} />
                <div className="cap-domain-ghost" style={{ backgroundImage: `linear-gradient(135deg, ${d.iconColor}, transparent)`, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                  {String(i + 1).padStart(2, '0')}
                </div>

                <div className="cap-domain-icon" style={{ background: d.iconBg, boxShadow: `0 4px 14px ${d.iconColor}20` }}>
                  <d.Icon size={20} color={d.iconColor} />
                </div>
                <div className="cap-domain-badge" style={{ background: `${d.badgeColor}12`, border: `1px solid ${d.badgeColor}30`, color: d.badgeColor }}>
                  {d.badge}
                </div>
                <div className="cap-domain-title">{d.title}</div>
                <div className="cap-domain-desc">{d.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════ THE JOURNEY (dynamic) ════════════════════ */}
      <section className="cap-section" id="how-it-works" style={{ background: '#fff', position: 'relative', overflow: 'hidden' }}>
        <div aria-hidden className="cap-blob cap-blob-blue" style={{ top: '10%', left: '-160px' }} />
        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <div className="cap-center reveal" data-reveal>
            <SectionLabel text="The Journey" center />
            <h2 className="cap-h2">Your 7-Step <GradientText tag="h2">Career Growth Path</GradientText></h2>
            <p className="cap-body" style={{ margin: '0 auto', textAlign: 'center', maxWidth: '520px' }}>
              Follow along — the progress rail fills as you scroll, and the active step lights up.
            </p>
          </div>

          {/* Step navigator pills */}
          <div className="cap-step-nav reveal" data-reveal data-delay="0.1">
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
                  className="cap-journey-item reveal"
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
                    <div className="cap-journey-card-head">
                      <div className="cap-journey-icon" style={{ background: `${col}15` }}>
                        <step.Icon size={18} color={col} />
                      </div>
                      <span className="cap-journey-title">{step.title}</span>
                      <span className="cap-journey-badge" style={{ background: `${col}12`, color: col, border: `1px solid ${col}30` }}>
                        {step.badge}
                      </span>
                    </div>
                    <p className="cap-journey-desc">{step.desc}</p>
                    <div className="cap-journey-tags">
                      {step.tags.map((tag, ti) => (
                        <span key={tag} className="cap-journey-tag" style={{ animationDelay: `${ti * 0.06}s` }}>{tag}</span>
                      ))}
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
              <h2 className="cap-cta-h2"><GradientText tag="h2">Ready to Transform Your Career?</GradientText></h2>
              <p className="cap-cta-body">
                Zero upfront. You only pay after your career grows. Start with a free 15-minute discovery call.
              </p>
              <div className="cap-btn-row" style={{ justifyContent: 'center', marginBottom: 0 }}>
                <a href="/cap/apply" className="cap-btn cap-btn-warm">
                  <Rocket size={15} /> Apply to CAP Now
                  <span className="cap-arrow"><ArrowRight size={14} /></span>
                </a>
                <a href="https://wa.me/919876543210" target="_blank" rel="noopener noreferrer" className="cap-btn cap-btn-ghost-dark">
                  <MessageCircle size={15} /> WhatsApp Us
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

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

        .reveal { opacity:0; transform:translateY(40px); transition:opacity .55s cubic-bezier(.22,1,.36,1), transform .55s cubic-bezier(.22,1,.36,1); }
        .reveal.is-visible { opacity:1; transform:translateY(0); }

        .cap-blob { position:absolute; border-radius:50%; pointer-events:none; }
        .cap-blob-blue { top:-120px; left:-120px; width:520px; height:520px; background:radial-gradient(circle, ${G.blue}22 0%, transparent 70%); filter:blur(100px); animation:cap-blob-a 14s ease-in-out infinite; }
        .cap-blob-orange { top:15%; right:-140px; width:440px; height:440px; background:radial-gradient(circle, ${G.orange}1e 0%, transparent 70%); filter:blur(110px); animation:cap-blob-b 16s ease-in-out infinite 1s; }

        .cap-hero { position:relative; padding: calc(56px + 72px) 0 0; overflow:hidden; background:#fafbff; }
        .cap-breadcrumb { display:flex; align-items:center; gap:6px; font-size:13px; color:#94a3b8; margin-bottom:28px; }
        .cap-breadcrumb a { color:#94a3b8; text-decoration:none; }
        .cap-breadcrumb a:hover { color:${G.blue}; }
        .cap-sep { color:#cbd5e1; }
        .cap-current { color:#475569; font-weight:500; }

        .cap-h1 { font-size:clamp(2.2rem, 4.5vw, 3.6rem); font-weight:900; line-height:1.1; letter-spacing:-1.2px; color:#0b0d20; margin-bottom:22px; }
        .cap-h2 { font-size:clamp(1.8rem, 3vw, 2.6rem); font-weight:900; color:#0b0d20; line-height:1.14; letter-spacing:-0.7px; margin-bottom:18px; }
        .cap-lead { font-size:16.5px; color:#64748b; line-height:1.75; max-width:560px; margin-bottom:32px; }
        .cap-body { font-size:15.5px; color:#64748b; line-height:1.8; margin-bottom:24px; }

        .cap-btn-row { display:flex; gap:12px; flex-wrap:wrap; margin-bottom:56px; }
        .cap-btn { display:inline-flex; align-items:center; gap:8px; font-weight:700; font-size:14px; padding:14px 30px; border-radius:999px; text-decoration:none; transition:transform .2s ease, box-shadow .2s ease; border:none; cursor:pointer; }
        .cap-btn:hover { transform:translateY(-3px); }
        .cap-btn-primary { background-image:linear-gradient(135deg, ${G.blue}, ${G.indigo}); color:#fff; box-shadow:0 8px 24px ${G.blue}35; }
        .cap-btn-primary:hover { box-shadow:0 16px 36px ${G.blue}55; }
        .cap-btn-warm { background-image:linear-gradient(135deg, ${G.orange}, ${G.rose}); color:#fff; box-shadow:0 8px 28px ${G.orange}40; }
        .cap-btn-warm:hover { box-shadow:0 16px 36px ${G.orange}55; }
        .cap-btn-ghost { background:#fff; color:#374151; border:1.5px solid #e2e8f0; box-shadow:0 2px 8px rgba(0,0,0,.05); }
        .cap-btn-ghost:hover { border-color:${G.blue}; box-shadow:0 8px 24px rgba(37,99,235,.15); }
        .cap-btn-ghost-dark { background:transparent; color:#fff; border:1.5px solid rgba(255,255,255,.25); }
        .cap-btn-ghost-dark:hover { border-color:rgba(255,255,255,.5); }
        .cap-arrow { display:inline-flex; animation:cap-arrow-bounce 1.3s ease-in-out infinite; }

        .cap-stats-4 { display:grid; grid-template-columns:repeat(4,1fr); border-top:1px solid #eef2ff; }
        .cap-stat-cell { text-align:center; padding:28px 20px; background:#fafbff; transition:background .25s ease; }
        .cap-stat-cell:hover { background:#fff; }
        .cap-stat-num { font-size:2rem; font-weight:900; line-height:1; margin-bottom:6px; }
        .cap-stat-label { font-size:12px; color:#94a3b8; font-weight:600; }

        .cap-section { padding:clamp(56px, 8vw, 88px) 0; }
        .cap-center { text-align:center; margin-bottom:48px; }
        .cap-two-col { display:grid; grid-template-columns:1fr 1fr; gap:56px; align-items:start; }

        .cap-benefit { display:flex; align-items:flex-start; gap:10px; padding:8px 10px; border-radius:12px; transition:background .2s ease, transform .2s ease; }
        .cap-benefit:hover { background:#f0f6ff; transform:translateX(4px); }
        .cap-benefit span { font-size:15px; color:#374151; line-height:1.55; }
        .cap-check { transition:transform .2s ease; }
        .cap-benefit:hover .cap-check { transform:scale(1.15); }

        .cap-share-card { position:relative; overflow:hidden; background:linear-gradient(160deg, #0b0d20 0%, #14163a 100%); border-radius:24px; color:#fff; padding:36px; transition:transform .3s ease; transform-style:preserve-3d; }
        .cap-share-orb { position:absolute; top:-60px; right:-60px; width:260px; height:260px; border-radius:50%; background:radial-gradient(circle, ${G.blue}30 0%, transparent 70%); pointer-events:none; animation:cap-blob-a 10s ease-in-out infinite; }
        .cap-share-table { width:100%; border-collapse:collapse; font-size:13px; }
        .cap-share-table th { padding:10px 8px; text-align:left; color:rgba(255,255,255,.45); font-weight:600; font-size:11px; text-transform:uppercase; letter-spacing:.4px; border-bottom:1px solid rgba(255,255,255,.12); }
        .cap-share-row { border-bottom:1px solid rgba(255,255,255,.06); opacity:0; animation:cap-row-in .5s ease forwards; transition:background .2s ease; }
        .cap-share-row:hover { background:rgba(255,255,255,.04); }
        .cap-share-row td { padding:11px 8px; }
        .cap-roi-badge { margin-left:6px; background:rgba(74,222,128,.12); color:#4ade80; border:1px solid rgba(74,222,128,.2); border-radius:999px; padding:2px 8px; font-size:11px; font-weight:700; }

        .cap-domains-3 { display:grid; grid-template-columns:repeat(3,1fr); gap:20px; }
        .cap-domain-card { position:relative; background:#fff; border-radius:20px; padding:28px; border:1px solid rgba(15,23,42,.06); overflow:hidden; transition:transform .25s ease, box-shadow .3s ease; box-shadow:0 8px 28px rgba(15,23,42,.05); display:flex; flex-direction:column; gap:12px; }
        .cap-domain-card:hover { transform:translateY(-6px); box-shadow:0 24px 60px rgba(37,99,235,.14); }
        .cap-domain-glow { position:absolute; inset:0; border-radius:20px; padding:1.5px; -webkit-mask:linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0); -webkit-mask-composite:xor; mask-composite:exclude; opacity:0; transition:opacity .3s ease; pointer-events:none; }
        .cap-domain-card:hover .cap-domain-glow { opacity:1; }
        .cap-domain-spotlight { position:absolute; inset:0; opacity:0; transition:opacity .3s ease; pointer-events:none; }
        .cap-domain-card:hover .cap-domain-spotlight { opacity:1; }
        .cap-domain-strip { position:absolute; top:0; left:0; right:0; height:3px; }
        .cap-domain-ghost { position:absolute; bottom:-18px; right:6px; font-size:88px; font-weight:900; opacity:.06; line-height:1; user-select:none; pointer-events:none; }
        .cap-domain-icon { width:44px; height:44px; border-radius:12px; display:flex; align-items:center; justify-content:center; position:relative; z-index:1; transition:transform .3s ease; }
        .cap-domain-card:hover .cap-domain-icon { transform:scale(1.1) rotate(-6deg); }
        .cap-domain-badge { display:inline-flex; align-items:center; gap:6px; width:fit-content; padding:4px 12px; border-radius:999px; font-size:11px; font-weight:700; position:relative; z-index:1; }
        .cap-domain-title { font-size:15px; font-weight:700; color:#0f172a; position:relative; z-index:1; }
        .cap-domain-desc { font-size:14px; color:#64748b; line-height:1.65; position:relative; z-index:1; }

        /* ── Journey ── */
        .cap-step-nav { display:flex; gap:8px; flex-wrap:wrap; justify-content:center; margin-bottom:48px; }
        .cap-step-pill { display:flex; align-items:center; gap:8px; padding:8px 14px 8px 8px; border-radius:999px; border:1.5px solid #e2e8f0; background:#fff; cursor:pointer; transition:all .25s ease; font-family:inherit; }
        .cap-step-pill:hover { border-color:var(--pill-color); transform:translateY(-2px); }
        .cap-step-pill.is-active { border-color:var(--pill-color); background:color-mix(in srgb, var(--pill-color) 8%, white); box-shadow:0 4px 14px rgba(0,0,0,.08); }
        .cap-step-pill-num { width:22px; height:22px; border-radius:50%; background:var(--pill-color); color:#fff; font-size:11px; font-weight:800; display:flex; align-items:center; justify-content:center; flex-shrink:0; }
        .cap-step-pill-label { font-size:12px; font-weight:600; color:#64748b; white-space:nowrap; }
        .cap-step-pill.is-active .cap-step-pill-label { color:#0f172a; }

        .cap-journey { position:relative; max-width:820px; margin:0 auto; }
        .cap-journey-rail { position:absolute; left:21px; top:8px; bottom:8px; width:2px; background:#eef2ff; }
        .cap-journey-rail-fill { position:absolute; left:21px; top:8px; width:2px; height:0%; background:linear-gradient(to bottom, ${G.blue}, ${G.purple}, ${G.orange}); transition:height .25s linear; }

        .cap-journey-item { display:flex; gap:20px; position:relative; padding-bottom:28px; }
        .cap-journey-item:last-child { padding-bottom:0; }
        .cap-journey-dot-wrap { position:relative; width:44px; height:44px; flex-shrink:0; }
        .cap-journey-dot-pulse { position:absolute; inset:0; border-radius:50%; opacity:0; }
        .cap-journey-item.is-active .cap-journey-dot-pulse { animation:cap-pulse-ring 1.8s ease-out infinite; }
        .cap-journey-dot { width:44px; height:44px; border-radius:50%; display:flex; align-items:center; justify-content:center; font-size:15px; font-weight:800; color:#fff; position:relative; z-index:1; transition:transform .3s ease; }
        .cap-journey-item.is-active .cap-journey-dot { transform:scale(1.12); }

        .cap-journey-card { position:relative; background:#fff; border:1px solid #eef0f6; border-radius:18px; padding:22px 24px; flex:1; box-shadow:0 2px 12px rgba(0,0,0,.04); transition:box-shadow .3s ease, border-color .3s ease, transform .3s ease; overflow:hidden; }
        .cap-journey-item.is-active .cap-journey-card { box-shadow:0 16px 40px rgba(37,99,235,.14); border-color:rgba(37,99,235,.25); transform:translateX(4px); }
        .cap-journey-card-final { background:linear-gradient(135deg, #fff7ed, #fff); border-color:${G.orange}40; }
        .cap-journey-card-glow { position:absolute; top:0; left:0; right:0; height:3px; opacity:.85; }
        .cap-journey-card-head { display:flex; align-items:center; gap:10px; margin-bottom:8px; flex-wrap:wrap; }
        .cap-journey-icon { width:32px; height:32px; border-radius:9px; display:flex; align-items:center; justify-content:center; transition:transform .3s ease; }
        .cap-journey-item.is-active .cap-journey-icon { transform:rotate(-8deg) scale(1.08); }
        .cap-journey-title { font-size:15px; font-weight:700; color:#0b0d20; }
        .cap-journey-badge { margin-left:auto; padding:3px 10px; border-radius:999px; font-size:11px; font-weight:700; }
        .cap-journey-desc { font-size:14px; color:#64748b; line-height:1.65; margin-bottom:12px; }
        .cap-journey-tags { display:flex; flex-wrap:wrap; gap:6px; }
        .cap-journey-tag { font-size:11px; font-weight:600; color:#475569; border:1px solid #e2e8f0; border-radius:999px; padding:3px 10px; opacity:0; animation:cap-tag-in .4s ease forwards; }
        .cap-journey-item.is-visible .cap-journey-tag { opacity:0; animation-play-state:running; }
        .cap-journey-sparkle { position:absolute; top:16px; right:16px; animation:cap-sparkle-spin 2.4s ease-in-out infinite; }

        .cap-cta { position:relative; border-radius:28px; padding:clamp(48px,8vw,80px) clamp(24px,6vw,72px); text-align:center; overflow:hidden; background:linear-gradient(135deg, #0b0d20 0%, #1a1040 50%, #0d1836 100%); }
        .cap-cta-orb { position:absolute; border-radius:50%; filter:blur(60px); pointer-events:none; }
        .cap-cta-orb-blue { top:-80px; left:10%; width:340px; height:340px; background:radial-gradient(circle, ${G.blue}35 0%, transparent 70%); animation:cap-blob-a 12s ease-in-out infinite; }
        .cap-cta-orb-orange { bottom:-60px; right:8%; width:300px; height:300px; background:radial-gradient(circle, ${G.orange}30 0%, transparent 70%); animation:cap-blob-b 14s ease-in-out infinite 1s; }
        .cap-cta-h2 { font-size:clamp(1.6rem, 3.2vw, 2.4rem); font-weight:900; line-height:1.18; letter-spacing:-0.5px; margin-bottom:14px; }
        .cap-cta-body { font-size:15px; color:rgba(255,255,255,.6); max-width:460px; margin:0 auto 32px; line-height:1.75; }

        @media (max-width: 900px) { .cap-step-nav { display:none; } }
        @media (max-width: 860px) {
          .cap-two-col { grid-template-columns:1fr !important; gap:36px !important; }
          .cap-domains-3 { grid-template-columns:1fr 1fr !important; }
        }
        @media (max-width: 580px) {
          .cap-stats-4 { grid-template-columns:repeat(2,1fr) !important; }
          .cap-domains-3 { grid-template-columns:1fr !important; }
          .cap-journey-card-head { flex-direction:column; align-items:flex-start; }
          .cap-journey-badge { margin-left:0; }
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

                /* ── Success-share card tilt ── */
                var tiltCard = document.querySelector('[data-tilt]');
                if (tiltCard) {
                  tiltCard.addEventListener('mousemove', function (e) {
                    var rect = tiltCard.getBoundingClientRect();
                    var px = (e.clientX - rect.left) / rect.width - 0.5;
                    var py = (e.clientY - rect.top) / rect.height - 0.5;
                    tiltCard.style.transform = 'perspective(1000px) rotateX(' + (py * -3) + 'deg) rotateY(' + (px * 3) + 'deg)';
                  });
                  tiltCard.addEventListener('mouseleave', function () {
                    tiltCard.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg)';
                  });
                }

                /* ── Journey: scroll-linked rail fill + active step tracking ── */
                var track = document.querySelector('[data-journey-track]');
                var fill = document.querySelector('[data-journey-fill]');
                var journeyItems = Array.prototype.slice.call(document.querySelectorAll('[data-journey-step]'));
                var stepPills = Array.prototype.slice.call(document.querySelectorAll('[data-step-pill]'));

                if (track && fill) {
                  var ticking = false;

                  function updateJourney() {
                    var rect = track.getBoundingClientRect();
                    var vh = window.innerHeight;
                    var total = rect.height;
                    var visible = Math.min(Math.max(vh * 0.6 - rect.top, 0), total);
                    var pct = total > 0 ? (visible / total) * 100 : 0;
                    fill.style.height = pct + '%';

                    /* find item closest to viewport center-ish line (vh * 0.45) */
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

                    journeyItems.forEach(function (item, idx) {
                      item.classList.toggle('is-active', idx === closestIdx);
                    });
                    stepPills.forEach(function (pill, idx) {
                      pill.classList.toggle('is-active', idx === closestIdx);
                    });

                    ticking = false;
                  }

                  document.addEventListener('scroll', function () {
                    if (!ticking) { requestAnimationFrame(updateJourney); ticking = true; }
                  }, { passive: true });
                  window.addEventListener('resize', updateJourney);
                  updateJourney();
                }

                /* ── Step nav pill click → scroll to step ── */
                stepPills.forEach(function (pill, idx) {
                  pill.addEventListener('click', function () {
                    var target = journeyItems[idx];
                    if (target) {
                      var rect = target.getBoundingClientRect();
                      var scrollTop = window.pageYOffset + rect.top - (window.innerHeight * 0.3);
                      window.scrollTo({ top: scrollTop, behavior: 'smooth' });
                    }
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