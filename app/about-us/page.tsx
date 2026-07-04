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

/* ── Brand tokens (kept for icon/background use only, NOT for text) ── */
const G = {
  blue:   '#2563eb',
  indigo: '#7c8ff0',
  orange: '#fb923c',
  rose:   '#f43f5e',
  purple: '#a855f7',
};

/* ── ONE single text color for the whole page (on light bg) ── */
const TEXT_LIGHT = '#0b0d20';
/* ── ONE single text color for the whole page (on dark bg) ── */
const TEXT_DARK = '#ffffff';

/* ── Modern geometric sans-serif stack — forced across whole page ── */
const FONT_STACK = `"Outfit", "Poppins", "Inter", "Manrope", "Geist", "Plus Jakarta Sans", -apple-system, BlinkMacSystemFont, "Segoe UI", system-ui, sans-serif`;

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

      <style>{`
        /* Modern geometric sans-serif — FORCED everywhere on the page */
        .ab-page,
        .ab-page *,
        .ab-page h1,
        .ab-page h2,
        .ab-page h3,
        .ab-page h4,
        .ab-page h5,
        .ab-page h6,
        .ab-page p,
        .ab-page span,
        .ab-page a,
        .ab-page button,
        .ab-page strong,
        .ab-page small,
        .ab-page em,
        .ab-page b,
        .ab-page div,
        .ab-page label,
        .ab-page input,
        .ab-page textarea {
          font-family: ${FONT_STACK} !important;
          font-feature-settings: "ss01", "cv11", "cv02" !important;
          font-optical-sizing: auto !important;
          letter-spacing: -0.011em !important;
        }

        /* CHANGED: ALL text in light sections is forced to ONE color (deep black) */
        .ab-page,
        .ab-page h1,
        .ab-page h2,
        .ab-page h3,
        .ab-page h4,
        .ab-page h5,
        .ab-page h6,
        .ab-page p,
        .ab-page span,
        .ab-page a,
        .ab-page strong,
        .ab-page small,
        .ab-page em,
        .ab-page b,
        .ab-page div,
        .ab-page label {
          color: ${TEXT_LIGHT} !important;
        }

        /* CHANGED: ALL text in the dark CTA section is forced to ONE color (white) */
        .ab-dark-cta,
        .ab-dark-cta h1,
        .ab-dark-cta h2,
        .ab-dark-cta h3,
        .ab-dark-cta p,
        .ab-dark-cta span,
        .ab-dark-cta a,
        .ab-dark-cta strong,
        .ab-dark-cta small,
        .ab-dark-cta em,
        .ab-dark-cta b,
        .ab-dark-cta div {
          color: ${TEXT_DARK} !important;
        }

        @keyframes ab-float-up   { 0%,100%{ transform:translateY(0) }  50%{ transform:translateY(-10px) } }
        @keyframes ab-float-down { 0%,100%{ transform:translateY(0) }  50%{ transform:translateY( 10px) } }
        @keyframes ab-fade-up {
          from { opacity:0; transform:translateY(28px); }
          to   { opacity:1; transform:translateY(0);    }
        }
        @keyframes ab-pulse-dot {
          0%,100% { opacity:1; transform:scale(1);   }
          50%     { opacity:.5; transform:scale(1.4); }
        }
        @keyframes ab-bounce-in {
          0% { transform: scale(0.9); opacity: 0; }
          50% { transform: scale(1.05); }
          100% { transform: scale(1); opacity: 1; }
        }

        .ab-fade-up { opacity:0; animation: ab-fade-up 0.6s cubic-bezier(.22,1,.36,1) forwards; }

        /* Pill-shaped buttons */
        .ab-btn, .ab-btn-secondary, .ab-cta-btn, .ab-btn-ab {
          border-radius: 999px !important;
        }

        /* Hover lift */
        .ab-btn { transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1); }
        .ab-btn:hover { transform: translateY(-3px); box-shadow: 0 20px 40px rgba(0,0,0,0.15) !important; }
        .ab-btn:active { transform: translateY(-1px) scale(0.98); }

        .ab-btn-secondary { transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1); }
        .ab-btn-secondary:hover { transform: translateY(-3px); box-shadow: 0 12px 30px rgba(0,0,0,0.10) !important; }
        .ab-btn-secondary:active { transform: translateY(-1px) scale(0.98); }

        /* Value Cards */
        .ab-val-card { 
          position: relative;
          transition: all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
          cursor: pointer;
        }
        .ab-val-card:hover {
          transform: translateY(-12px) scale(1.02);
          box-shadow: 0 30px 60px rgba(0,0,0,0.10) !important;
          border-color: transparent !important;
        }
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
        }

        /* Stat cards — thin + pill */
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
          box-shadow: 0 8px 20px rgba(0,0,0,0.10) !important;
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

        /* Timeline */
        .ab-tl-dot { 
          animation: ab-pulse-dot 2.4s ease-in-out infinite;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .ab-timeline-item:hover .ab-tl-dot { transform: scale(1.3); }
        .ab-timeline-item { transition: all 0.3s ease; cursor: pointer; }
        .ab-timeline-item:hover { transform: translateX(8px); }

        /* Floating badges */
        .ab-badge-left  { animation: ab-float-up 5.5s ease-in-out infinite; }
        .ab-badge-right { animation: ab-float-down 6s ease-in-out infinite; }
        .ab-badge-left:hover, .ab-badge-right:hover { transform: scale(1.1); }

        .ab-founder-card { transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1); }
        .ab-founder-card:hover { transform: translateY(-8px); box-shadow: 0 30px 70px rgba(0,0,0,0.10) !important; }

        .ab-dark-cta .ab-cta-btn {
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
          position: relative;
          overflow: hidden;
        }
        .ab-dark-cta .ab-cta-btn:hover { transform: translateY(-5px) scale(1.05); }
        .ab-dark-cta .ab-cta-btn:active { transform: translateY(-2px) scale(1.02); }

        @media (max-width: 860px) {
          .ab-two-col   { grid-template-columns: 1fr !important; gap: 40px !important; }
          .ab-values-3  { grid-template-columns: 1fr 1fr !important; }
          .ab-stats-4   { flex-wrap: wrap !important; }
          .ab-stat-cell { flex: 1 1 calc(50% - 6px) !important; }
          .ab-founder-card { flex-direction: column !important; padding: 32px !important; text-align: center; }
          .ab-mission-img  { height: 320px !important; }
          .ab-sticky-col { position: static !important; top: auto !important; }
          .ab-founder-card > div:first-child { width: 150px !important; height: 190px !important; margin: 0 auto; }
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

      <div className="ab-page">

        {/* ════════════════════ HERO ════════════════════ */}
        <section style={{
          position: 'relative',
          padding: 'calc(56px + 80px) 0 32px',
          overflow: 'hidden',
          background: '#f8faff',
        }}>
          <div aria-hidden style={{
            position:'absolute', top:'-120px', left:'-100px',
            width:'500px', height:'500px', borderRadius:'50%',
            background:`radial-gradient(circle,${G.blue}10 0%,transparent 70%)`,
            filter:'blur(80px)', pointerEvents:'none',
          }}/>
          <div aria-hidden style={{
            position:'absolute', top:'40px', right:'-80px',
            width:'420px', height:'420px', borderRadius:'50%',
            background:`radial-gradient(circle,${G.orange}0a 0%,transparent 70%)`,
            filter:'blur(90px)', pointerEvents:'none',
          }}/>

          <div className="container" style={{ position:'relative', zIndex:1 }}>
            <nav style={{ display:'flex', alignItems:'center', gap:'6px', fontSize:'13px', marginBottom:'28px' }}>
              <a href="/" style={{ textDecoration:'none' }}>Home</a>
              <span>›</span>
              <span style={{ fontWeight:500 }}>About Us</span>
            </nav>

            <div style={{ maxWidth:'780px' }} className="ab-fade-up">
              <div style={{ display:'inline-flex', alignItems:'center', gap:'10px', marginBottom:'20px' }}>
                <span style={{ width:'22px', height:'3px', borderRadius:'999px', background:'#0b0d20', opacity:0.4 }}/>
                <span style={{ fontSize:'11.5px', fontWeight:800, letterSpacing:'0.12em', textTransform:'uppercase' }}>Our Story</span>
                <span style={{ width:'22px', height:'3px', borderRadius:'999px', background:'#0b0d20', opacity:0.4 }}/>
              </div>

              <h1 style={{ fontSize:'clamp(2.4rem,5vw,4rem)', fontWeight:900, lineHeight:1.08, letterSpacing:'-1.5px', marginBottom:'22px' }}>
                We&apos;re Not Just a Placement Agency. We&apos;re Career Partners.
              </h1>

              <p style={{ fontSize:'17px', lineHeight:1.75, maxWidth:'540px', marginBottom:'36px' }}>
                Born in Delhi NCR. Built for every professional who deserves better — a better role, a better salary, and a career that actually reflects their potential.
              </p>

              <div className="ab-hero-actions" style={{ display:'flex', gap:'12px', flexWrap:'wrap', marginBottom:'40px' }}>
                <a href="/contact" className="ab-btn" style={{
                  display:'inline-flex', alignItems:'center', gap:'8px',
                  background:'#0b0d20', color:'#ffffff',
                  fontWeight:700, fontSize:'14px',
                  padding:'14px 30px', borderRadius:'999px',
                  textDecoration:'none', boxShadow:'0 8px 24px rgba(0,0,0,0.25)',
                }}>
                  <Rocket size={15}/> Start Your Journey
                </a>
                <a href="#our-story" className="ab-btn-secondary" style={{
                  display:'inline-flex', alignItems:'center', gap:'8px',
                  background:'#ffffff', fontWeight:500, fontSize:'14px',
                  padding:'14px 30px', borderRadius:'999px',
                  textDecoration:'none', border:'1.5px solid #e2e8f0',
                  boxShadow:'0 2px 8px rgba(0,0,0,.05)',
                }}>
                  Read Our Story <ArrowRight size={14}/>
                </a>
              </div>
            </div>

            <div className="ab-stats-4" style={{ display:'flex', gap:'12px', flexWrap:'wrap', justifyContent:'center' }}>
              {stats.map((s, i) => {
                const IconComp = s.Icon ?? Users;
                const col      = s.color ?? G.blue;
                return (
                  <div key={i} className="ab-stat-cell">
                    <div className="ab-stat-icon" style={{ background:'#f1f5f9' }}>
                      <IconComp size={15} color={col}/>
                    </div>
                    <div className="ab-stat-text">
                      <div style={{ fontSize:'15px', fontWeight:800, lineHeight:1 }}>{s.num}</div>
                      <div style={{ fontSize:'10.5px', fontWeight:500, marginTop:'2px' }}>{s.label}</div>
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
                <div style={{ display:'inline-flex', alignItems:'center', gap:'8px', fontSize:'11.5px', fontWeight:800, letterSpacing:'0.1em', textTransform:'uppercase', marginBottom:'18px' }}>
                  <span style={{ width:'20px', height:'3px', borderRadius:'999px', background:'#0b0d20', opacity:0.4, display:'inline-block' }}/>
                  Our Mission
                </div>
                <h2 style={{ fontSize:'clamp(1.9rem,3vw,2.75rem)', fontWeight:900, lineHeight:1.12, letterSpacing:'-0.8px', marginBottom:'22px' }}>
                  Making Career Growth Accessible for Everyone
                </h2>
                <p style={{ fontSize:'15.5px', lineHeight:1.8, marginBottom:'16px' }}>
                  Placedly was founded with one deeply held belief: exceptional careers shouldn&apos;t be a privilege reserved for people with the right connections. Every professional deserves expert guidance, real employer access, and a fair shot at the role they want.
                </p>
                <p style={{ fontSize:'15.5px', lineHeight:1.8, marginBottom:'36px' }}>
                  We operate on a simple model: <strong>zero upfront, success-share only.</strong> Career Assistance Fee of 12% of CTC — collected only after you receive your offer letter. If we don&apos;t place you, you don&apos;t pay.
                </p>
                <a href="/contact" className="ab-btn" style={{
                  display:'inline-flex', alignItems:'center', gap:'8px',
                  background:'#0b0d20', color:'#ffffff',
                  fontWeight:700, fontSize:'14px',
                  padding:'13px 28px', borderRadius:'999px',
                  textDecoration:'none', boxShadow:'0 8px 22px rgba(0,0,0,0.22)',
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

                <div className="ab-badge-left" style={{
                  position:'absolute', bottom:'165px', left:'-20px',
                  background:'#fff', borderRadius:'16px',
                  boxShadow:`0 12px 32px rgba(0,0,0,.10)`,
                  padding:'14px 18px',
                  display:'flex', alignItems:'center', gap:'12px',
                  border:'1px solid #e2e8f0',
                }}>
                  <div style={{ width:'42px', height:'42px', borderRadius:'12px', background:'#f1f5f9', display:'flex', alignItems:'center', justifyContent:'center' }}>
                    <Trophy size={18} color={G.blue}/>
                  </div>
                  <div>
                    <div style={{ fontSize:'20px', fontWeight:900, lineHeight:1 }}>300+</div>
                    <div style={{ fontSize:'11px', marginTop:'2px' }}>Careers Transformed</div>
                  </div>
                </div>

                <div className="ab-badge-right" style={{
                  position:'absolute', top:'60px', right:'-20px',
                  background:'#fff', borderRadius:'16px',
                  boxShadow:`0 12px 32px rgba(0,0,0,.10)`,
                  padding:'14px 18px',
                  display:'flex', alignItems:'center', gap:'12px',
                  border:'1px solid #e2e8f0',
                }}>
                  <div style={{ width:'42px', height:'42px', borderRadius:'12px', background:'#f1f5f9', display:'flex', alignItems:'center', justifyContent:'center' }}>
                    <Handshake size={18} color={G.orange}/>
                  </div>
                  <div>
                    <div style={{ fontSize:'20px', fontWeight:900, lineHeight:1 }}>50+</div>
                    <div style={{ fontSize:'11px', marginTop:'2px' }}>Hiring Partners</div>
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
              <div style={{ display:'inline-flex', alignItems:'center', gap:'10px', marginBottom:'16px' }}>
                <span style={{ width:'20px', height:'3px', borderRadius:'999px', background:'#0b0d20', opacity:0.4 }}/>
                <span style={{ fontSize:'11.5px', fontWeight:800, letterSpacing:'0.12em', textTransform:'uppercase' }}>What We Stand For</span>
                <span style={{ width:'20px', height:'3px', borderRadius:'999px', background:'#0b0d20', opacity:0.4 }}/>
              </div>
              <h2 style={{ fontSize:'clamp(1.9rem,3vw,2.75rem)', fontWeight:900, lineHeight:1.12, letterSpacing:'-0.8px' }}>
                The Principles That Drive Us
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
                    background:'#0b0d20', opacity:0.4,
                    borderRadius:'20px 20px 0 0',
                  }}/>
                  <div className="ab-val-icon" style={{
                    width:'48px', height:'48px', borderRadius:'14px',
                    background:'#f1f5f9',
                    display:'flex', alignItems:'center', justifyContent:'center',
                    marginBottom:'18px',
                    boxShadow:'0 4px 14px rgba(0,0,0,0.06)',
                  }}>
                    <v.Icon size={22} color={v.color}/>
                  </div>
                  <div style={{ fontSize:'15.5px', fontWeight:800, marginBottom:'10px' }}>{v.title}</div>
                  <div style={{ fontSize:'14px', lineHeight:1.7 }}>{v.desc}</div>
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
                <div style={{ display:'inline-flex', alignItems:'center', gap:'10px', marginBottom:'18px' }}>
                  <span style={{ width:'20px', height:'3px', borderRadius:'999px', background:'#0b0d20', opacity:0.4 }}/>
                  <span style={{ fontSize:'11.5px', fontWeight:800, letterSpacing:'0.12em', textTransform:'uppercase' }}>Our Journey</span>
                </div>
                <h2 style={{ fontSize:'clamp(1.9rem,3vw,2.75rem)', fontWeight:900, lineHeight:1.12, letterSpacing:'-0.8px', marginBottom:'18px' }}>
                  From Startup to 300+ Placements
                </h2>
                <p style={{ fontSize:'15.5px', lineHeight:1.8, marginBottom:'32px' }}>
                  Every milestone was earned the hard way — one candidate at a time, one employer relationship at a time.
                </p>
                <div style={{ background:'#f8faff', borderRadius:'16px', padding:'22px 24px', border:'1px solid #e2e8f0' }}>
                  <div style={{ display:'flex', alignItems:'center', gap:'10px', marginBottom:'14px' }}>
                    <Sparkles size={16}/>
                    <span style={{ fontSize:'13px', fontWeight:700 }}>Growth trajectory</span>
                  </div>
                  {[
                    { label:'Placements',   val:85 },
                    { label:'Partners',     val:60 },
                    { label:'Satisfaction', val:97 },
                  ].map(bar => (
                    <div key={bar.label} style={{ marginBottom:'10px' }}>
                      <div style={{ display:'flex', justifyContent:'space-between', fontSize:'12px', marginBottom:'4px' }}>
                        <span>{bar.label}</span><span>{bar.val}%</span>
                      </div>
                      <div style={{ height:'6px', borderRadius:'99px', background:'#eef2ff', overflow:'hidden' }}>
                        <div style={{ height:'100%', width:`${bar.val}%`, borderRadius:'99px', background:'#0b0d20' }}/>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div style={{ display:'flex', flexDirection:'column' }}>
                {timeline.map((item, i) => {
                  const isLast = i === timeline.length - 1;
                  return (
                    <div key={i} className="ab-timeline-item" style={{ display:'flex', gap:'20px', alignItems:'stretch' }}>
                      <div style={{ display:'flex', flexDirection:'column', alignItems:'center', flexShrink:0 }}>
                        <div className="ab-tl-dot" style={{
                          width:'40px', height:'40px', borderRadius:'50%',
                          background:'#0b0d20',
                          display:'flex', alignItems:'center', justifyContent:'center',
                          fontSize:'13px', fontWeight:800, color:'#fff',
                          boxShadow:'0 6px 18px rgba(0,0,0,0.20)', flexShrink:0,
                          animationDelay:`${i * 0.4}s`,
                        }}>
                          {i + 1}
                        </div>
                        {!isLast && (
                          <div style={{ width:'2px', flex:1, background:'#e2e8f0', marginTop:'6px' }}/>
                        )}
                      </div>
                      <div style={{ paddingBottom: !isLast ? '32px' : 0, paddingTop:'6px' }}>
                        <div style={{
                          display:'inline-block', fontSize:'11px', fontWeight:800,
                          letterSpacing:'0.6px', textTransform:'uppercase',
                          marginBottom:'4px', padding:'3px 10px', borderRadius:'999px',
                          background:'#0b0d20', color:'#ffffff',
                        }}>
                          {item.year}
                        </div>
                        <div style={{ fontSize:'15.5px', fontWeight:800, marginBottom:'5px' }}>{item.title}</div>
                        <div style={{ fontSize:'14px', lineHeight:1.7 }}>{item.desc}</div>
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
              <div style={{ display:'inline-flex', alignItems:'center', gap:'10px', marginBottom:'16px' }}>
                <span style={{ width:'20px', height:'3px', borderRadius:'999px', background:'#0b0d20', opacity:0.4 }}/>
                <span style={{ fontSize:'11.5px', fontWeight:800, letterSpacing:'0.12em', textTransform:'uppercase' }}>Leadership</span>
                <span style={{ width:'20px', height:'3px', borderRadius:'999px', background:'#0b0d20', opacity:0.4 }}/>
              </div>
              <h2 style={{ fontSize:'clamp(1.9rem,3vw,2.75rem)', fontWeight:900, lineHeight:1.12, letterSpacing:'-0.8px' }}>
                The Person Behind Placedly
              </h2>
            </div>

            <div className="ab-founder-card" style={{
              background:'#fff', border:'1px solid #eef2ff',
              borderRadius:'28px', padding:'52px',
              boxShadow:'0 4px 24px rgba(0,0,0,0.06)',
              display:'flex', gap:'52px', alignItems:'flex-start',
              maxWidth:'900px', margin:'0 auto',
              position:'relative', overflow:'hidden',
            }}>
              <div style={{
                width:'190px', height:'230px', borderRadius:'20px',
                overflow:'hidden', flexShrink:0,
                boxShadow:'0 16px 40px rgba(0,0,0,0.12)',
                border:'1px solid #e2e8f0',
                position:'relative',
              }}>
                <img src="/img/at founder part.png"
                  alt={founder.name ?? 'Founder'}
                  style={{ width:'100%', height:'100%', objectFit:'cover', objectPosition:'center top' }}/>
              </div>

              <div style={{ position:'relative', zIndex:1 }}>
                <div style={{ fontSize:'24px', fontWeight:900, marginBottom:'4px' }}>
                  {founder.name ?? 'Our Founder'}
                </div>
                <div style={{ fontSize:'13.5px', fontWeight:600, marginBottom:'22px' }}>
                  {founder.role ?? 'Founder & CEO, Placedly'}
                </div>
                <p style={{ fontSize:'15px', lineHeight:1.8, marginBottom:'26px' }}>
                  {founder.bio ?? "With a deep background in talent acquisition and career consulting across Delhi NCR's top MNCs, our founder built Placedly with a frustration-turned-mission: too many talented professionals were being left behind by a system that favoured connections over competence."}
                </p>
                <div style={{
                  background:'#f8faff',
                  borderLeft:'4px solid #0b0d20',
                  padding:'18px 22px',
                  borderRadius:'0 14px 14px 0',
                  fontSize:'14.5px',
                  fontStyle:'italic', lineHeight:1.75,
                  position:'relative',
                }}>
                  <span style={{
                    position:'absolute', top:'-2px', left:'16px',
                    fontSize:'48px', lineHeight:1, opacity:.15,
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
              background:'#0b0d20',
            }}>
              <div style={{ position:'relative', zIndex:1 }}>
                <div style={{
                  display:'inline-flex', alignItems:'center', gap:'8px',
                  fontSize:'11px', fontWeight:700, letterSpacing:'0.1em',
                  textTransform:'uppercase',
                  marginBottom:'20px',
                }}>
                  <span style={{ width:'20px', height:'2px', borderRadius:'999px', background:'#ffffff', opacity:0.5 }}/>
                  Take Action
                  <span style={{ width:'20px', height:'2px', borderRadius:'999px', background:'#ffffff', opacity:0.5 }}/>
                </div>

                <h2 style={{
                  fontSize:'clamp(1.7rem,3.5vw,2.6rem)',
                  fontWeight:900, lineHeight:1.15, letterSpacing:'-0.6px',
                  marginBottom:'14px',
                }}>
                  Ready to Write Your Success Story?
                </h2>

                <p style={{ fontSize:'15.5px', maxWidth:'480px', margin:'0 auto 36px', lineHeight:1.75, opacity:0.7 }}>
                  Join 300+ professionals who trusted Placedly to transform their career. Zero upfront — you only pay after you&apos;re placed.
                </p>

                <div style={{ display:'flex', gap:'14px', justifyContent:'center', flexWrap:'wrap' }}>
                  <a href="/contact" className="ab-cta-btn" style={{
                    display:'inline-flex', alignItems:'center', gap:'8px',
                    background:'#ffffff', color:'#0b0d20',
                    fontWeight:700, fontSize:'14px',
                    padding:'15px 34px', borderRadius:'999px',
                    textDecoration:'none', boxShadow:'0 8px 28px rgba(0,0,0,0.30)',
                  }}>
                    <Rocket size={15}/> Get Placed Now
                  </a>
                  <a href="/study-visa" className="ab-cta-btn" style={{
                    display:'inline-flex', alignItems:'center', gap:'8px',
                    background:'transparent', color:'#ffffff',
                    fontWeight:700, fontSize:'14px',
                    padding:'15px 34px', borderRadius:'999px',
                    textDecoration:'none', border:'1.5px solid #ffffff',
                  }}>
                    <Plane size={15}/> Study Abroad
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

      </div>
    </PageLayout>
  );
}