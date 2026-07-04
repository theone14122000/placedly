export const dynamic = 'force-dynamic';

import type { Metadata } from 'next';
import {
  Target, DollarSign, Handshake, Globe,
  Building2, TrendingUp, Rocket, Plane, Trophy,
  Users, Award, Sparkles, ArrowRight,
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

/* ── Brand tokens ── */
const G = {
  blue:   '#2563eb',
  indigo: '#7c8ff0',
  orange: '#fb923c',
  rose:   '#f43f5e',
  purple: '#a855f7',
};

// CHANGED: gradient text constants removed (kept commented for reference)
// const GRAD = 'linear-gradient(270deg, #2563eb, #7c8ff0, #fb923c, #f43f5e, #a855f7, #2563eb)';
// const GRAD_TEXT: React.CSSProperties = {
//   backgroundImage: GRAD,
//   backgroundSize: '300% 300%',
//   WebkitBackgroundClip: 'text',
//   WebkitTextFillColor: 'transparent',
//   backgroundClip: 'text',
//   animation: 'ab-grad 6s ease infinite',
//   display: 'inline',
// };

/* ── Defaults ── */
const DEFAULT_VALUES = [
  { Icon: Target,     color: G.blue,    bg: '#eff6ff', title: 'Personalised, Always',    desc: 'No two careers are the same. Every candidate gets a bespoke roadmap built around their skills, goals, and target industry — not a generic playbook.' },
  { Icon: DollarSign, color: '#16a34a', bg: '#f0fdf4', title: 'Zero Upfront',             desc: 'Career Assistance Fee of 12% is charged only after you receive your offer letter. Our success is tied directly to yours.' },
  { Icon: Handshake,  color: G.orange,  bg: '#fff7ed', title: 'End-to-End Partnership',   desc: 'From CV rebuild to day 90 in your new role — we stay with you through every step, including salary negotiation and joining support.' },
  { Icon: Globe,      color: '#0891b2', bg: '#ecfeff', title: 'Global Reach',             desc: '140+ university partners across UK, France, Germany, and Dubai. We make international education accessible, transparent, and stress-free.' },
  { Icon: Building2,  color: G.purple,  bg: '#faf5ff', title: 'Direct Employer Access',  desc: 'Our 50+ hiring partner network means your profile goes directly to decision-makers — not into a black-hole job board.' },
  { Icon: TrendingUp, color: G.rose,    bg: '#fff1f2', title: 'Measurable Outcomes',      desc: 'Average 40% salary hike. 300+ careers transformed. First interview call within 1–2 weeks. Results you can count on.' },
];

const DEFAULT_TIMELINE = [
  { year: '2022', title: 'Placedly Founded',          desc: 'Started in Delhi NCR with a single mission: make career growth transparent and accessible to every professional.' },
  { year: '2023', title: '100 Placements Milestone',  desc: 'Crossed 100 successful placements and launched our flagship Career Assistance Programme (CAP).' },
  { year: '2024', title: 'Study Abroad Division',     desc: 'Launched global education services with 140+ university partnerships across UK, France, Germany, and Dubai.' },
  { year: '2025', title: '300+ Careers Transformed',  desc: 'Expanded to 50+ hiring partners and achieved an average 40% salary hike for placed professionals.' },
  { year: '2026', title: 'Scaling Pan-India',         desc: 'Growing beyond Delhi NCR to serve professionals in Bangalore, Mumbai, Hyderabad, and Chennai.' },
];

const DEFAULT_STATS = [
  { num: '300+', label: 'Professionals Placed', Icon: Users,      color: G.blue   },
  { num: '50+',  label: 'Hiring Partners',       Icon: Handshake, color: G.orange  },
  { num: '40%',  label: 'Avg. Salary Hike',      Icon: TrendingUp,color: '#16a34a' },
  { num: '₹0',   label: 'Upfront Cost',           Icon: Award,     color: G.purple  },
];

const DOT_COLORS = [G.blue, G.orange, G.purple, '#16a34a', G.rose];

type AbCmsData = {
  stats?:    Array<{ num?: string; label?: string }>;
  values?:   Array<{ icon?: string; title?: string; desc?: string }>;
  timeline?: Array<{ year?: string; title?: string; desc?: string }>;
  founder?:  { name?: string; role?: string; bio?: string; quote?: string };
};

/* ══════════════════════════════════════════════════════════
   Page
══════════════════════════════════════════════════════════ */
export default async function AboutUsPage() {
  const cmsMap = await getCmsMap('ab:');
  const abCms  = parseCmsJson<AbCmsData>(cmsMap, 'ab:data', {});

  const stats = abCms.stats?.length
    ? abCms.stats.map((s, i) => ({ ...DEFAULT_STATS[i], num: s.num ?? '', label: s.label ?? '' }))
    : DEFAULT_STATS;

  const values = abCms.values?.length
    ? abCms.values.map((v, i) => {
        const def      = DEFAULT_VALUES[i] ?? DEFAULT_VALUES[0];
        const IconComp = v.icon && ICON_MAP[v.icon] ? ICON_MAP[v.icon] : def.Icon;
        return { ...def, Icon: IconComp, title: v.title ?? def.title, desc: v.desc ?? def.desc };
      })
    : DEFAULT_VALUES;

  const timeline = abCms.timeline?.length
    ? abCms.timeline.map(t => ({ year: t.year ?? '', title: t.title ?? '', desc: t.desc ?? '' }))
    : DEFAULT_TIMELINE;

  const founder = abCms.founder ?? {};

  return (
    <PageLayout>

      {/* ════════════════════ ENHANCED KEYFRAMES ════════════════════ */}
      <style>{`
        @keyframes ab-float-up   { 0%,100%{ transform:translateY(0) }  50%{ transform:translateY(-10px) } }
        @keyframes ab-float-down { 0%,100%{ transform:translateY(0) }  50%{ transform:translateY( 10px) } }
        @keyframes ab-fade-up {
          from { opacity:0; transform:translateY(28px); }
          to   { opacity:1; transform:translateY(0);    }
        }
        @keyframes ab-shimmer {
          from { transform:scaleX(0); }
          to   { transform:scaleX(1); }
        }
        @keyframes ab-pulse-dot {
          0%,100% { opacity:1; transform:scale(1);   }
          50%     { opacity:.5; transform:scale(1.4); }
        }
        @keyframes ab-glow-pulse {
          0%, 100% { box-shadow: 0 0 20px rgba(37,99,235,0.3); }
          50% { box-shadow: 0 0 40px rgba(37,99,235,0.6); }
        }
        @keyframes ab-bounce-in {
          0% { transform: scale(0.9); opacity: 0; }
          50% { transform: scale(1.05); }
          100% { transform: scale(1); opacity: 1; }
        }

        /* entry animation utility */
        .ab-fade-up { opacity:0; animation: ab-fade-up 0.6s cubic-bezier(.22,1,.36,1) forwards; }

        /* ═══════════ ENHANCED INTERACTIVE STYLES ═══════════ */
        .ab-btn {
          position: relative;
          overflow: hidden;
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .ab-btn::before {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent);
          transform: translateX(-100%);
          transition: transform 0.6s;
        }
        .ab-btn:hover::before { transform: translateX(100%); }
        .ab-btn:hover {
          transform: translateY(-3px) scale(1.02);
          box-shadow: 0 20px 50px rgba(37,99,235,0.4) !important;
        }
        .ab-btn:active { transform: translateY(-1px) scale(0.98); }

        .ab-btn-secondary {
          position: relative;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .ab-btn-secondary:hover {
          transform: translateY(-3px);
          border-color: ${G.blue} !important;
          background: rgba(37,99,235,0.05) !important;
          box-shadow: 0 12px 30px rgba(37,99,235,0.15) !important;
        }
        .ab-btn-secondary:active { transform: translateY(-1px) scale(0.98); }

        /* Value Cards */
        .ab-val-card { 
          position: relative;
          transition: all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
          cursor: pointer;
        }
        .ab-val-card::after {
          content: '';
          position: absolute;
          inset: 0;
          border-radius: 20px;
          background: linear-gradient(135deg, rgba(37,99,235,0.1), rgba(251,146,60,0.1));
          opacity: 0;
          transition: opacity 0.4s;
        }
        .ab-val-card:hover {
          transform: translateY(-12px) scale(1.02);
          box-shadow: 0 30px 60px rgba(37,99,235,0.2) !important;
          border-color: transparent !important;
        }
        .ab-val-card:hover::after { opacity: 1; }
        .ab-val-card .ab-val-strip {
          transform: scaleX(.35);
          transform-origin: left;
          transition: transform .5s cubic-bezier(.34,1.56,.64,1);
        }
        .ab-val-card:hover .ab-val-strip { transform: scaleX(1); }
        .ab-val-card .ab-val-icon {
          transition: all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
        }
        .ab-val-card:hover .ab-val-icon {
          transform: scale(1.15) rotate(5deg);
          animation: ab-glow-pulse 2s infinite;
        }

        /* CHANGED: Stat cards — thin + pill-shaped, horizontal row */
        .ab-stat-cell { 
          position: relative;
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 10px 16px;
          background: #fff;
          border: 1px solid #eef2ff;
          border-radius: 999px;
          box-shadow: 0 2px 8px rgba(15,23,42,0.04);
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          cursor: pointer;
        }
        .ab-stat-cell:hover {
          transform: translateY(-3px);
          box-shadow: 0 8px 20px rgba(37,99,235,0.10) !important;
          border-color: ${G.blue}30;
        }
        .ab-stat-cell .ab-stat-icon {
          width: 32px;
          height: 32px;
          border-radius: 50%;
          flex-shrink: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
        }
        .ab-stat-cell:hover .ab-stat-icon { transform: scale(1.15) rotate(8deg); }
        .ab-stat-cell .ab-stat-text {
          display: flex;
          flex-direction: column;
          line-height: 1.1;
          min-width: 0;
        }

        /* Timeline dots */
        .ab-tl-dot { 
          animation: ab-pulse-dot 2.4s ease-in-out infinite;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .ab-timeline-item:hover .ab-tl-dot {
          transform: scale(1.3);
          animation: ab-glow-pulse 1.5s infinite;
        }
        .ab-timeline-item { transition: all 0.3s ease; cursor: pointer; }
        .ab-timeline-item:hover { transform: translateX(8px); }

        /* Floating badges */
        .ab-badge-left  { 
          animation: ab-float-up 5.5s ease-in-out infinite;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .ab-badge-right { 
          animation: ab-float-down 6s ease-in-out infinite;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .ab-badge-left:hover,
        .ab-badge-right:hover {
          transform: scale(1.1);
          box-shadow: 0 20px 50px rgba(37,99,235,0.25) !important;
        }

        .ab-founder-card { transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1); }
        .ab-founder-card:hover {
          transform: translateY(-8px);
          box-shadow: 0 30px 70px rgba(37,99,235,0.15) !important;
        }

        .ab-dark-cta .ab-cta-btn {
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
          position: relative;
          overflow: hidden;
        }
        .ab-dark-cta .ab-cta-btn::before {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent);
          transform: translateX(-100%);
          transition: transform 0.6s;
        }
        .ab-dark-cta .ab-cta-btn:hover::before { transform: translateX(100%); }
        .ab-dark-cta .ab-cta-btn:hover {
          transform: translateY(-5px) scale(1.05);
          box-shadow: 0 25px 60px rgba(37,99,235,0.6) !important;
        }
        .ab-dark-cta .ab-cta-btn:active { transform: translateY(-2px) scale(1.02); }

        /* responsive */
        @media (max-width: 860px) {
          .ab-two-col   { grid-template-columns: 1fr !important; gap: 40px !important; }
          .ab-values-3  { grid-template-columns: 1fr 1fr !important; }
          .ab-stats-4   { flex-wrap: wrap !important; }
          .ab-stat-cell { flex: 1 1 calc(50% - 6px) !important; }
          .ab-founder-card { flex-direction: column !important; padding: 32px !important; text-align: center; }
          .ab-mission-img  { height: 320px !important; }
          .ab-sticky-col { position: static !important; top: auto !important; }
          .ab-founder-card > div:first-child {
            width: 150px !important;
            height: 190px !important;
            margin: 0 auto;
          }
          .ab-badge-left  { left: 0 !important; padding: 10px 14px !important; }
          .ab-badge-right { right: 0 !important; padding: 10px 14px !important; }
          .ab-dark-cta { padding: 56px 28px !important; }
          section { overflow-x: hidden; }
        }
        @media (max-width: 580px) {
          .ab-stats-4   { flex-direction: column !important; }
          .ab-stat-cell { width: 100% !important; }
          .ab-values-3  { grid-template-columns: 1fr !important; }
          .ab-dark-cta  { padding: 48px 20px !important; }
          .ab-timeline-item { gap: 14px !important; }
        }
      `}</style>

      {/* ════════════════════ HERO ════════════════════ */}
      <section style={{
        position: 'relative',
        padding: 'calc(56px + 80px) 0 32px',
        overflow: 'hidden',
        background: '#f8faff',
      }}>
        {/* Orbs */}
        <div aria-hidden style={{
          position:'absolute', top:'-120px', left:'-100px',
          width:'500px', height:'500px', borderRadius:'50%',
          background:`radial-gradient(circle,${G.blue}18 0%,transparent 70%)`,
          filter:'blur(80px)', pointerEvents:'none',
        }}/>
        <div aria-hidden style={{
          position:'absolute', top:'40px', right:'-80px',
          width:'420px', height:'420px', borderRadius:'50%',
          background:`radial-gradient(circle,${G.orange}14 0%,transparent 70%)`,
          filter:'blur(90px)', pointerEvents:'none',
        }}/>

        <div className="container" style={{ position:'relative', zIndex:1 }}>
          {/* Breadcrumb */}
          <nav style={{ display:'flex', alignItems:'center', gap:'6px', fontSize:'13px', color:'#94a3b8', marginBottom:'28px' }}>
            <a href="/" style={{ color:'#94a3b8', textDecoration:'none' }}>Home</a>
            <span style={{ color:'#cbd5e1' }}>›</span>
            <span style={{ color:'#475569', fontWeight:500 }}>About Us</span>
          </nav>

          <div style={{ maxWidth:'780px' }} className="ab-fade-up">
            {/* Eyebrow — gradient removed, now plain text */}
            <div style={{ display:'inline-flex', alignItems:'center', gap:'10px', marginBottom:'20px' }}>
              <span style={{ width:'22px', height:'3px', borderRadius:'999px', background:`linear-gradient(90deg,${G.blue},${G.orange})` }}/>
              <span style={{ fontSize:'11.5px', fontWeight:800, letterSpacing:'0.12em', textTransform:'uppercase', color: G.blue }}>Our Story</span>
              <span style={{ width:'22px', height:'3px', borderRadius:'999px', background:`linear-gradient(90deg,${G.orange},${G.blue})` }}/>
            </div>

            {/* CHANGED: gradient span removed, plain colored text */}
            <h1 style={{ fontSize:'clamp(2.4rem,5vw,4rem)', fontWeight:900, lineHeight:1.08, letterSpacing:'-1.5px', color:'#0b0d20', marginBottom:'22px' }}>
              We&apos;re Not Just a<br/>Placement Agency.{' '}
              <span style={{ color: G.blue }}>We&apos;re Career Partners.</span>
            </h1>

            <p style={{ fontSize:'17px', color:'#64748b', lineHeight:1.75, maxWidth:'540px', marginBottom:'36px' }}>
              Born in Delhi NCR. Built for every professional who deserves better — a better role, a better salary, and a career that actually reflects their potential.
            </p>

            <div className="ab-hero-actions" style={{ display:'flex', gap:'12px', flexWrap:'wrap', marginBottom:'40px' }}>
              <a href="/contact" className="ab-btn" style={{
                display:'inline-flex', alignItems:'center', gap:'8px',
                backgroundImage:`linear-gradient(135deg,${G.blue},${G.indigo})`,
                color:'#fff', fontWeight:700, fontSize:'14px',
                padding:'14px 30px', borderRadius:'999px',
                textDecoration:'none', boxShadow:`0 8px 24px ${G.blue}35`,
              }}>
                <Rocket size={15}/> Start Your Journey
              </a>
              <a href="#our-story" className="ab-btn-secondary" style={{
                display:'inline-flex', alignItems:'center', gap:'8px',
                background:'#fff', color:'#374151', fontWeight:500, fontSize:'14px',
                padding:'14px 30px', borderRadius:'999px',
                textDecoration:'none', border:'1.5px solid #e2e8f0',
                boxShadow:'0 2px 8px rgba(0,0,0,.05)',
              }}>
                Read Our Story <ArrowRight size={14}/>
              </a>
            </div>
          </div>

          {/* CHANGED: Stats strip — thin pill-shaped horizontal row */}
          <div className="ab-stats-4" style={{ display:'flex', gap:'12px', flexWrap:'wrap', justifyContent:'center' }}>
            {stats.map((s, i) => {
              const IconComp = s.Icon ?? Users;
              const col      = s.color ?? G.blue;
              return (
                <div key={i} className="ab-stat-cell">
                  <div className="ab-stat-icon" style={{
                    background:`${col}15`,
                  }}>
                    <IconComp size={15} color={col}/>
                  </div>
                  <div className="ab-stat-text">
                    {/* CHANGED: gradient number → plain colored bold */}
                    <div style={{ fontSize:'15px', fontWeight:800, lineHeight:1, color: col }}>{s.num}</div>
                    <div style={{ fontSize:'10.5px', color:'#94a3b8', fontWeight:500, marginTop:'2px' }}>{s.label}</div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ════════════════════ MISSION ════════════════════ */}
      <section id="our-story" style={{ padding:'96px 0', background:'#fff' }}>
        <div className="container">
          <div className="ab-two-col" style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'72px', alignItems:'center' }}>
            <div className="ab-fade-up" style={{ animationDelay:'.1s' }}>
              {/* CHANGED: gradient eyebrow → plain blue text */}
              <div style={{ display:'inline-flex', alignItems:'center', gap:'8px', fontSize:'11.5px', fontWeight:800, letterSpacing:'0.1em', textTransform:'uppercase', marginBottom:'18px', color: G.blue }}>
                <span style={{ width:'20px', height:'3px', borderRadius:'999px', background:`linear-gradient(90deg,${G.blue},${G.orange})`, display:'inline-block' }}/>
                Our Mission
              </div>
              {/* CHANGED: gradient "Accessible" → plain orange text */}
              <h2 style={{ fontSize:'clamp(1.9rem,3vw,2.75rem)', fontWeight:900, color:'#0b0d20', lineHeight:1.12, letterSpacing:'-0.8px', marginBottom:'22px' }}>
                Making Career Growth{' '}
                <span style={{ color: G.orange }}>Accessible</span>
                {' '}for Everyone
              </h2>
              <p style={{ fontSize:'15.5px', color:'#64748b', lineHeight:1.8, marginBottom:'16px' }}>
                Placedly was founded with one deeply held belief: exceptional careers shouldn&apos;t be a privilege reserved for people with the right connections. Every professional deserves expert guidance, real employer access, and a fair shot at the role they want.
              </p>
              <p style={{ fontSize:'15.5px', color:'#374151', lineHeight:1.8, marginBottom:'36px' }}>
                We operate on a simple model:{' '}
                <strong style={{ color:G.blue }}>zero upfront, success-share only.</strong>{' '}
                Career Assistance Fee of 12% of CTC — collected only after you receive your offer letter. If we don&apos;t place you, you don&apos;t pay.
              </p>
              <a href="/contact" className="ab-btn" style={{
                display:'inline-flex', alignItems:'center', gap:'8px',
                backgroundImage:`linear-gradient(135deg,${G.blue},${G.indigo})`,
                color:'#fff', fontWeight:700, fontSize:'14px',
                padding:'13px 28px', borderRadius:'999px',
                textDecoration:'none', boxShadow:`0 8px 22px ${G.blue}30`,
              }}>
                Talk to Our Team <ArrowRight size={14}/>
              </a>
            </div>

            <div className="ab-mission-img" style={{ position:'relative', height:'500px' }}>
              <div style={{
                position:'absolute', top:0, left:0,
                width:'70%', height:'310px',
                borderRadius:'22px', overflow:'hidden',
                boxShadow:'0 24px 56px rgba(0,0,0,.12)',
              }}>
                <img src="/img/team.png" alt="Placedly Team"
                  style={{ width:'100%', height:'100%', objectFit:'cover' }}/>
                <div style={{
                  position:'absolute', inset:0,
                  background:`linear-gradient(160deg,${G.blue}22 0%,transparent 60%)`,
                }}/>
              </div>

              <div style={{
                position:'absolute', bottom:0, right:0,
                width:'58%', height:'250px',
                borderRadius:'22px', overflow:'hidden',
                boxShadow:'0 24px 56px rgba(0,0,0,.12)',
                border:'4px solid #fff',
              }}>
                <img src="/img/aboutt us consultancy.png" alt="Consultancy"
                  style={{ width:'100%', height:'100%', objectFit:'cover' }}/>
              </div>

              {/* CHANGED: gradient numbers on floating badges → plain colored */}
              <div className="ab-badge-left" style={{
                position:'absolute', bottom:'165px', left:'-20px',
                background:'#fff', borderRadius:'16px',
                boxShadow:`0 12px 32px rgba(0,0,0,.10)`,
                padding:'14px 18px',
                display:'flex', alignItems:'center', gap:'12px',
                border:`1px solid ${G.blue}20`,
              }}>
                <div style={{ width:'42px', height:'42px', borderRadius:'12px', background:`${G.blue}15`, display:'flex', alignItems:'center', justifyContent:'center' }}>
                  <Trophy size={18} color={G.blue}/>
                </div>
                <div>
                  <div style={{ fontSize:'20px', fontWeight:900, lineHeight:1, color: G.blue }}>300+</div>
                  <div style={{ fontSize:'11px', color:'#94a3b8', marginTop:'2px' }}>Careers Transformed</div>
                </div>
              </div>

              <div className="ab-badge-right" style={{
                position:'absolute', top:'60px', right:'-20px',
                background:'#fff', borderRadius:'16px',
                boxShadow:`0 12px 32px rgba(0,0,0,.10)`,
                padding:'14px 18px',
                display:'flex', alignItems:'center', gap:'12px',
                border:`1px solid ${G.orange}20`,
              }}>
                <div style={{ width:'42px', height:'42px', borderRadius:'12px', background:`${G.orange}15`, display:'flex', alignItems:'center', justifyContent:'center' }}>
                  <Handshake size={18} color={G.orange}/>
                </div>
                <div>
                  <div style={{ fontSize:'20px', fontWeight:900, lineHeight:1, color: G.orange }}>50+</div>
                  <div style={{ fontSize:'11px', color:'#94a3b8', marginTop:'2px' }}>Hiring Partners</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ════════════════════ VALUES ════════════════════ */}
      <section style={{ padding:'96px 0', background:'#f8faff' }}>
        <div className="container">
          <div style={{ textAlign:'center', marginBottom:'56px' }}>
            {/* CHANGED: gradient eyebrow → plain blue */}
            <div style={{ display:'inline-flex', alignItems:'center', gap:'10px', marginBottom:'16px' }}>
              <span style={{ width:'20px', height:'3px', borderRadius:'999px', background:`linear-gradient(90deg,${G.blue},${G.orange})` }}/>
              <span style={{ fontSize:'11.5px', fontWeight:800, letterSpacing:'0.12em', textTransform:'uppercase', color: G.blue }}>What We Stand For</span>
              <span style={{ width:'20px', height:'3px', borderRadius:'999px', background:`linear-gradient(90deg,${G.orange},${G.blue})` }}/>
            </div>
            {/* CHANGED: gradient "Drive Us" → plain orange */}
            <h2 style={{ fontSize:'clamp(1.9rem,3vw,2.75rem)', fontWeight:900, color:'#0b0d20', lineHeight:1.12, letterSpacing:'-0.8px' }}>
              The Principles That{' '}
              <span style={{ color: G.orange }}>Drive Us</span>
            </h2>
          </div>

          <div className="ab-values-3" style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:'20px' }}>
            {values.map((v, i) => (
              <div key={i} className="ab-val-card" style={{
                background:'#fff', borderRadius:'20px', padding:'30px',
                border:'1px solid #eef2ff',
                boxShadow:'0 2px 12px rgba(0,0,0,.04)',
                position:'relative', overflow:'hidden',
              }}>
                <div className="ab-val-strip" style={{
                  position:'absolute', top:0, left:0, right:0, height:'3px',
                  background:`linear-gradient(90deg,${v.color},${G.indigo})`,
                  borderRadius:'20px 20px 0 0',
                }}/>
                <div className="ab-val-icon" style={{
                  width:'48px', height:'48px', borderRadius:'14px',
                  background:v.bg,
                  display:'flex', alignItems:'center', justifyContent:'center',
                  marginBottom:'18px',
                  boxShadow:`0 4px 14px ${v.color}20`,
                }}>
                  <v.Icon size={22} color={v.color}/>
                </div>
                <div style={{ fontSize:'15.5px', fontWeight:800, color:'#0f172a', marginBottom:'10px' }}>{v.title}</div>
                <div style={{ fontSize:'14px', color:'#64748b', lineHeight:1.7 }}>{v.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════ TIMELINE ════════════════════ */}
      <section style={{ padding:'96px 0', background:'#fff' }}>
        <div className="container">
          <div className="ab-two-col" style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'88px', alignItems:'start' }}>
            <div className="ab-sticky-col" style={{ position:'sticky', top:'100px' }}>
              {/* CHANGED: gradient eyebrow → plain blue */}
              <div style={{ display:'inline-flex', alignItems:'center', gap:'10px', marginBottom:'18px' }}>
                <span style={{ width:'20px', height:'3px', borderRadius:'999px', background:`linear-gradient(90deg,${G.blue},${G.orange})` }}/>
                <span style={{ fontSize:'11.5px', fontWeight:800, letterSpacing:'0.12em', textTransform:'uppercase', color: G.blue }}>Our Journey</span>
              </div>
              {/* CHANGED: gradient "300+ Placements" → plain orange */}
              <h2 style={{ fontSize:'clamp(1.9rem,3vw,2.75rem)', fontWeight:900, color:'#0b0d20', lineHeight:1.12, letterSpacing:'-0.8px', marginBottom:'18px' }}>
                From Startup to{' '}
                <span style={{ color: G.orange }}>300+ Placements</span>
              </h2>
              <p style={{ fontSize:'15.5px', color:'#64748b', lineHeight:1.8, marginBottom:'32px' }}>
                Every milestone was earned the hard way — one candidate at a time, one employer relationship at a time.
              </p>
              <div style={{ background:'#f8faff', borderRadius:'16px', padding:'22px 24px', border:`1px solid ${G.blue}18` }}>
                <div style={{ display:'flex', alignItems:'center', gap:'10px', marginBottom:'14px' }}>
                  <Sparkles size={16} color={G.blue}/>
                  <span style={{ fontSize:'13px', fontWeight:700, color:G.blue }}>Growth trajectory</span>
                </div>
                {[
                  { label:'Placements',   val:85 },
                  { label:'Partners',     val:60 },
                  { label:'Satisfaction', val:97 },
                ].map(bar => (
                  <div key={bar.label} style={{ marginBottom:'10px' }}>
                    <div style={{ display:'flex', justifyContent:'space-between', fontSize:'12px', color:'#64748b', marginBottom:'4px' }}>
                      <span>{bar.label}</span><span>{bar.val}%</span>
                    </div>
                    <div style={{ height:'6px', borderRadius:'99px', background:'#eef2ff', overflow:'hidden' }}>
                      <div style={{ height:'100%', width:`${bar.val}%`, borderRadius:'99px', background:`linear-gradient(90deg,${G.blue},${G.orange})` }}/>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div style={{ display:'flex', flexDirection:'column' }}>
              {timeline.map((item, i) => {
                const col = DOT_COLORS[i % DOT_COLORS.length];
                return (
                  <div key={i} className="ab-timeline-item" style={{ display:'flex', gap:'20px', alignItems:'stretch' }}>
                    <div style={{ display:'flex', flexDirection:'column', alignItems:'center', flexShrink:0 }}>
                      <div className="ab-tl-dot" style={{
                        width:'40px', height:'40px', borderRadius:'50%',
                        background:`linear-gradient(135deg,${col},${G.indigo})`,
                        display:'flex', alignItems:'center', justifyContent:'center',
                        fontSize:'13px', fontWeight:800, color:'#fff',
                        boxShadow:`0 6px 18px ${col}40`, flexShrink:0,
                        animationDelay:`${i * 0.4}s`,
                      }}>
                        {i + 1}
                      </div>
                      {i < timeline.length-1 && (
                        <div style={{ width:'2px', flex:1, background:`linear-gradient(to bottom,${col}60,transparent)`, marginTop:'6px' }}/>
                      )}
                    </div>
                    <div style={{ paddingBottom: i < timeline.length-1 ? '32px' : 0, paddingTop:'6px' }}>
                      <div style={{
                        display:'inline-block', fontSize:'11px', fontWeight:800,
                        letterSpacing:'0.6px', textTransform:'uppercase',
                        marginBottom:'4px', padding:'3px 10px', borderRadius:'999px',
                        background:`${col}15`, color:col,
                      }}>
                        {item.year}
                      </div>
                      <div style={{ fontSize:'15.5px', fontWeight:800, color:'#0f172a', marginBottom:'5px' }}>{item.title}</div>
                      <div style={{ fontSize:'14px', color:'#64748b', lineHeight:1.7 }}>{item.desc}</div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ════════════════════ LEADERSHIP ════════════════════ */}
      <section style={{ padding:'96px 0', background:'#f8faff' }}>
        <div className="container">
          <div style={{ textAlign:'center', marginBottom:'52px' }}>
            {/* CHANGED: gradient eyebrow → plain blue */}
            <div style={{ display:'inline-flex', alignItems:'center', gap:'10px', marginBottom:'16px' }}>
              <span style={{ width:'20px', height:'3px', borderRadius:'999px', background:`linear-gradient(90deg,${G.blue},${G.orange})` }}/>
              <span style={{ fontSize:'11.5px', fontWeight:800, letterSpacing:'0.12em', textTransform:'uppercase', color: G.blue }}>Leadership</span>
              <span style={{ width:'20px', height:'3px', borderRadius:'999px', background:`linear-gradient(90deg,${G.orange},${G.blue})` }}/>
            </div>
            {/* CHANGED: gradient "Placedly" → plain orange */}
            <h2 style={{ fontSize:'clamp(1.9rem,3vw,2.75rem)', fontWeight:900, color:'#0b0d20', lineHeight:1.12, letterSpacing:'-0.8px' }}>
              The Person Behind{' '}
              <span style={{ color: G.orange }}>Placedly</span>
            </h2>
          </div>

          <div className="ab-founder-card" style={{
            background:'#fff', border:'1px solid #eef2ff',
            borderRadius:'28px', padding:'52px',
            boxShadow:`0 4px 24px ${G.blue}08`,
            display:'flex', gap:'52px', alignItems:'flex-start',
            maxWidth:'900px', margin:'0 auto',
            position:'relative', overflow:'hidden',
          }}>
            <div aria-hidden style={{
              position:'absolute', top:'-60px', right:'-60px',
              width:'260px', height:'260px', borderRadius:'50%',
              background:`radial-gradient(circle,${G.blue}12 0%,transparent 70%)`,
              pointerEvents:'none',
            }}/>

            <div style={{
              width:'190px', height:'230px', borderRadius:'20px',
              overflow:'hidden', flexShrink:0,
              boxShadow:`0 16px 40px ${G.blue}20`,
              border:`3px solid ${G.blue}20`,
              position:'relative',
            }}>
              <img src="/img/at founder part.png"
                alt={founder.name ?? 'Founder'}
                style={{ width:'100%', height:'100%', objectFit:'cover', objectPosition:'center top' }}/>
              <div style={{
                position:'absolute', bottom:0, left:0, right:0, height:'60px',
                background:`linear-gradient(transparent,${G.blue}30)`,
              }}/>
            </div>

            <div style={{ position:'relative', zIndex:1 }}>
              <div style={{ fontSize:'24px', fontWeight:900, color:'#0b0d20', marginBottom:'4px' }}>
                {founder.name ?? 'Our Founder'}
              </div>
              {/* CHANGED: gradient role → plain blue text */}
              <div style={{ fontSize:'13.5px', fontWeight:600, marginBottom:'22px', color: G.blue }}>
                {founder.role ?? 'Founder & CEO, Placedly'}
              </div>
              <p style={{ fontSize:'15px', color:'#64748b', lineHeight:1.8, marginBottom:'26px' }}>
                {founder.bio ?? "With a deep background in talent acquisition and career consulting across Delhi NCR's top MNCs, our founder built Placedly with a frustration-turned-mission: too many talented professionals were being left behind by a system that favoured connections over competence."}
              </p>
              <div style={{
                background:'#f8faff',
                borderLeft:'4px solid transparent',
                borderImage:`linear-gradient(180deg,${G.blue},${G.orange}) 1`,
                padding:'18px 22px',
                borderRadius:'0 14px 14px 0',
                fontSize:'14.5px', color:'#374151',
                fontStyle:'italic', lineHeight:1.75,
                position:'relative',
              }}>
                <span style={{
                  position:'absolute', top:'-2px', left:'16px',
                  fontSize:'48px', lineHeight:1, color:G.blue, opacity:.15,
                  fontFamily:'Georgia,serif',
                }}>&ldquo;</span>
                {founder.quote ?? "Your next job shouldn't depend on who you know. It should depend on how well we prepare you."}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ════════════════════ CTA ════════════════════ */}
      <section style={{ padding:'96px 0', background:'#fff' }}>
        <div className="container">
          <div className="ab-dark-cta" style={{
            position:'relative', borderRadius:'28px',
            padding:'80px 72px', textAlign:'center',
            overflow:'hidden',
            background:'linear-gradient(135deg,#0b0d20 0%,#1a1040 50%,#0d1836 100%)',
          }}>
            <div aria-hidden style={{
              position:'absolute', top:'-80px', left:'10%',
              width:'340px', height:'340px', borderRadius:'50%',
              background:`radial-gradient(circle,${G.blue}35 0%,transparent 70%)`,
              filter:'blur(60px)', pointerEvents:'none',
            }}/>
            <div aria-hidden style={{
              position:'absolute', bottom:'-60px', right:'8%',
              width:'300px', height:'300px', borderRadius:'50%',
              background:`radial-gradient(circle,${G.orange}30 0%,transparent 70%)`,
              filter:'blur(60px)', pointerEvents:'none',
            }}/>

            <div style={{ position:'relative', zIndex:1 }}>
              <div style={{
                display:'inline-flex', alignItems:'center', gap:'8px',
                fontSize:'11px', fontWeight:700, letterSpacing:'0.1em',
                textTransform:'uppercase', color:'rgba(255,255,255,.45)',
                marginBottom:'20px',
              }}>
                <span style={{ width:'20px', height:'2px', borderRadius:'999px', background:`linear-gradient(90deg,${G.blue},${G.orange})` }}/>
                Take Action
                <span style={{ width:'20px', height:'2px', borderRadius:'999px', background:`linear-gradient(90deg,${G.orange},${G.blue})` }}/>
              </div>

              {/* CHANGED: gradient heading → plain white bold */}
              <h2 style={{
                fontSize:'clamp(1.7rem,3.5vw,2.6rem)',
                fontWeight:900, lineHeight:1.15, letterSpacing:'-0.6px',
                marginBottom:'14px', color:'#fff',
              }}>
                Ready to Write Your Success Story?
              </h2>

              <p style={{ fontSize:'15.5px', color:'rgba(255,255,255,.55)', maxWidth:'480px', margin:'0 auto 36px', lineHeight:1.75 }}>
                Join 300+ professionals who trusted Placedly to transform their career. Zero upfront — you only pay after you&apos;re placed.
              </p>

              <div style={{ display:'flex', gap:'14px', justifyContent:'center', flexWrap:'wrap' }}>
                <a href="/contact" className="ab-cta-btn" style={{
                  display:'inline-flex', alignItems:'center', gap:'8px',
                  backgroundImage:`linear-gradient(135deg,${G.blue},${G.indigo})`,
                  color:'#fff', fontWeight:700, fontSize:'14px',
                  padding:'15px 34px', borderRadius:'999px',
                  textDecoration:'none', boxShadow:`0 8px 28px ${G.blue}50`,
                }}>
                  <Rocket size={15}/> Get Placed Now
                </a>
                <a href="/study-visa" className="ab-cta-btn" style={{
                  display:'inline-flex', alignItems:'center', gap:'8px',
                  backgroundImage:`linear-gradient(135deg,${G.orange},${G.rose})`,
                  color:'#fff', fontWeight:700, fontSize:'14px',
                  padding:'15px 34px', borderRadius:'999px',
                  textDecoration:'none', boxShadow:`0 8px 28px ${G.orange}40`,
                }}>
                  <Plane size={15}/> Study Abroad
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

    </PageLayout>
  );
}