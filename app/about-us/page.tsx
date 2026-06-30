export const dynamic = 'force-dynamic';

import type { Metadata } from 'next';
import { Target, DollarSign, Handshake, Globe, Building2, TrendingUp, Rocket, Plane, Trophy } from 'lucide-react';
import PageLayout from '../components/PageLayout';
import { getCmsMap, parseCmsJson } from '@/lib/cms';

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
      {/* Global styles for 3D effects and animations */}
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-15px); }
        }
        
        @keyframes shimmer {
          0% { background-position: -200% 0; }
          100% { background-position: 200% 0; }
        }
        
        @keyframes pulse-glow {
          0%, 100% { box-shadow: 0 0 0 0 rgba(33, 69, 251, 0.4); }
          50% { box-shadow: 0 0 0 20px rgba(33, 69, 251, 0); }
        }
        
        @keyframes rotate-3d {
          0% { transform: rotateX(0deg) rotateY(0deg); }
          100% { transform: rotateX(360deg) rotateY(360deg); }
        }
        
        @keyframes slide-up-fade {
          0% { opacity: 0; transform: translateY(60px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes scale-bounce {
          0% { transform: scale(0.95); }
          50% { transform: scale(1.02); }
          100% { transform: scale(1); }
        }
        
        .hero-float {
          animation: float 6s ease-in-out infinite;
        }
        
        .value-card-3d {
          transform-style: preserve-3d;
          perspective: 1000px;
          transition: all 0.6s cubic-bezier(0.23, 1, 0.32, 1);
        }
        
        .value-card-3d:hover {
          transform: translateZ(30px) rotateX(5deg) rotateY(5deg);
          box-shadow: 0 20px 40px rgba(0,0,0,0.15), 0 10px 20px rgba(0,0,0,0.1);
        }
        
        .value-card-3d::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: linear-gradient(45deg, transparent, rgba(255,255,255,0.8), transparent);
          background-size: 200% 100%;
          animation: shimmer 3s infinite;
          opacity: 0;
          transition: opacity 0.3s;
          pointer-events: none;
          border-radius: inherit;
          z-index: 1;
        }
        
        .value-card-3d:hover::before {
          opacity: 1;
        }
        
        .timeline-node-glow {
          animation: pulse-glow 2s infinite;
        }
        
        .stat-shimmer {
          background: linear-gradient(90deg, 
            rgba(11, 13, 32, 0.8) 0%, 
            rgba(33, 69, 251, 0.9) 25%, 
            rgba(11, 13, 32, 0.8) 50%, 
            rgba(33, 69, 251, 0.9) 75%, 
            rgba(11, 13, 32, 0.8) 100%);
          background-size: 200% auto;
          -webkit-background-clip: text;
          background-clip: text;
          -webkit-text-fill-color: transparent;
          animation: shimmer 4s linear infinite;
        }
        
        .parallax-3d {
          transform-style: preserve-3d;
          perspective: 1500px;
        }
        
        .parallax-layer-1 {
          transform: translateZ(0px);
          transition: transform 0.5s ease-out;
        }
        
        .parallax-layer-2 {
          transform: translateZ(-100px) scale(1.1);
          transition: transform 0.5s ease-out;
        }
        
        .parallax-layer-3 {
          transform: translateZ(-200px) scale(1.2);
          transition: transform 0.5s ease-out;
        }
        
        .section-reveal {
          opacity: 0;
          transform: translateY(60px);
          animation: slide-up-fade 1s cubic-bezier(0.23, 1, 0.32, 1) forwards;
        }
        
        .section-reveal:nth-child(2) { animation-delay: 0.1s; }
        .section-reveal:nth-child(3) { animation-delay: 0.2s; }
        .section-reveal:nth-child(4) { animation-delay: 0.3s; }
        .section-reveal:nth-child(5) { animation-delay: 0.4s; }
        .section-reveal:nth-child(6) { animation-delay: 0.5s; }
        
        .magnetic-hover {
          transition: all 0.3s cubic-bezier(0.23, 1, 0.32, 1);
        }
        
        .magnetic-hover:hover {
          transform: scale(1.05);
          box-shadow: 0 10px 30px rgba(0,0,0,0.15);
        }
        
        .glass-effect {
          backdrop-filter: blur(10px);
          -webkit-backdrop-filter: blur(10px);
          background: rgba(255, 255, 255, 0.85);
        }
        
        .glow-text {
          text-shadow: 0 0 10px rgba(33, 69, 251, 0.3);
        }
        
        .text-gradient-animate {
          background: linear-gradient(45deg, #2145fb, #f97316, #2145fb);
          background-size: 200% auto;
          -webkit-background-clip: text;
          background-clip: text;
          -webkit-text-fill-color: transparent;
          animation: shimmer 4s linear infinite;
        }
        
        .floating-decoration {
          position: absolute;
          border-radius: 50%;
          filter: blur(40px);
          opacity: 0.1;
          z-index: -1;
          animation: float 8s ease-in-out infinite;
        }
      `}} />

      {/* ── Hero ── */}
      <section className="inner-section section-reveal" style={{ padding: 'calc(56px + 68px) 0 0', position: 'relative', overflow: 'hidden' }}>
        {/* Floating decorations */}
        <div className="floating-decoration" style={{ width: '400px', height: '400px', background: '#2145fb', top: '-100px', right: '-100px' }} />
        <div className="floating-decoration" style={{ width: '300px', height: '300px', background: '#f97316', bottom: '-50px', left: '-50px', animationDelay: '2s' }} />
        <div className="floating-decoration" style={{ width: '200px', height: '200px', background: '#16a34a', top: '50%', left: '20%', animationDelay: '4s' }} />
        
        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <div className="parallax-3d" style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', maxWidth: '760px' }}>
            <div className="parallax-layer-1">
              <nav style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', color: '#94a3b8', marginBottom: '24px' }}>
                <a href="/" style={{ color: '#94a3b8', textDecoration: 'none' }}>Home</a>
                <span>›</span>
                <span style={{ color: '#374151' }}>About Us</span>
              </nav>
            </div>
            
            <div className="parallax-layer-2">
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '20px' }}>
                <div style={{ width: '20px', height: '3px', borderRadius: '999px', background: '#2145fb', animation: 'pulse-glow 2s infinite' }} />
                <span style={{ fontSize: '11px', fontWeight: 700, color: '#2145fb', letterSpacing: '0.8px', textTransform: 'uppercase' }}>Our Story</span>
              </div>
            </div>
            
            <div className="parallax-layer-1 hero-float">
              <h1 style={{ fontSize: 'clamp(2.2rem,4.5vw,3.8rem)', fontWeight: 900, color: '#0b0d20', lineHeight: 1.1, letterSpacing: '-1px', marginBottom: '20px' }}>
                We&apos;re Not Just a<br />Placement Agency.<br />
                <span className="text-gradient-animate">We&apos;re Career Partners.</span>
              </h1>
            </div>
            
            <div className="parallax-layer-3">
              <p style={{ fontSize: '16px', color: '#64748b', lineHeight: 1.7, maxWidth: '520px', marginBottom: '32px' }}>
                Born in Delhi NCR. Built for every professional who deserves better — a better role, a better salary, and a career that actually reflects their potential.
              </p>
              
              <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', marginBottom: '48px' }}>
                <a href="/contact" className="magnetic-hover" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: '#2145fb', color: '#fff', fontWeight: 600, fontSize: '14px', fontFamily: 'Poppins,sans-serif', padding: '13px 28px', borderRadius: '999px', textDecoration: 'none', boxShadow: '0 2px 10px rgba(33,69,251,.25)' }}>
                  <Rocket size={15} /> Start Your Journey
                </a>
                <a href="#our-story" className="magnetic-hover" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'transparent', color: '#374151', fontWeight: 500, fontSize: '14px', fontFamily: 'Poppins,sans-serif', padding: '13px 28px', borderRadius: '999px', textDecoration: 'none', border: '1.5px solid #e2e8f0' }}>Read Our Story ↓</a>
              </div>
            </div>
          </div>

          {/* Stats strip */}
          <div className="ab-stats-4 glass-effect" style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', borderTop: '1px solid #eef0f6', borderRadius: '16px', boxShadow: '0 10px 40px rgba(0,0,0,0.05)' }}>
            {stats.map((s, i) => (
              <div key={s.num} style={{ textAlign: 'center', padding: '32px 16px', position: 'relative', borderRight: i < 3 ? '1px solid #eef0f6' : 'none' }}>
                <div className="stat-shimmer" style={{ fontSize: '2.2rem', fontWeight: 900, lineHeight: 1, marginBottom: '8px', letterSpacing: '-0.5px' }}>{s.num}</div>
                <div style={{ fontSize: '12px', color: '#94a3b8', fontWeight: 500 }}>{s.label}</div>
                {i < 3 && <div style={{ position: 'absolute', right: '-1px', top: '50%', transform: 'translateY(-50%)', width: '2px', height: '20px', background: 'linear-gradient(transparent, #2145fb, transparent)', opacity: 0.5 }} />}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Mission ── */}
      <section className="inner-section section-reveal" style={{ padding: '80px 0', position: 'relative' }} id="our-story">
        <div className="floating-decoration" style={{ width: '300px', height: '300px', background: '#0891b2', top: '20%', right: '10%', animationDelay: '3s' }} />
        
        <div className="container">
          <div className="ab-two-col" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '64px', alignItems: 'center' }}>
            <div>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', fontSize: '11px', fontWeight: 700, color: '#2145fb', letterSpacing: '0.8px', textTransform: 'uppercase', marginBottom: '16px' }}>
                <div style={{ width: '20px', height: '3px', borderRadius: '999px', background: '#2145fb' }} />
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
              <a href="/contact" className="magnetic-hover" style={{ display: 'inline-flex', alignItems: 'center', background: '#2145fb', color: '#fff', fontWeight: 600, fontSize: '14px', fontFamily: 'Poppins,sans-serif', padding: '13px 28px', borderRadius: '999px', textDecoration: 'none' }}>
                Talk to Our Team →
              </a>
            </div>
            
            <div className="ab-mission-img parallax-3d" style={{ position: 'relative', height: '480px' }}>
              <div className="parallax-layer-3" style={{ position: 'absolute', top: 0, left: 0, width: '72%', height: '300px', borderRadius: '20px', overflow: 'hidden', boxShadow: '0 20px 48px rgba(0,0,0,.12)', transition: 'transform 0.5s ease-out' }}>
                <img src="/img/team.png" alt="Placedly Team" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>
              
              <div className="parallax-layer-2" style={{ position: 'absolute', bottom: 0, right: 0, width: '60%', height: '240px', borderRadius: '20px', overflow: 'hidden', boxShadow: '0 20px 48px rgba(0,0,0,.12)', border: '4px solid #fff', transition: 'transform 0.5s ease-out' }}>
                <img src="/img/aboutt us consultancy.png" alt="Consultancy" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>
              
              <div className="parallax-layer-1 glass-effect magnetic-hover" style={{ position: 'absolute', bottom: '155px', left: '-16px', borderRadius: '14px', boxShadow: '0 8px 28px rgba(0,0,0,.10)', padding: '14px 18px', display: 'flex', alignItems: 'center', gap: '12px', border: '1px solid #eef0f6', transition: 'transform 0.5s ease-out' }}>
                <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: '#eff6ff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Trophy size={18} color="#2145fb" />
                </div>
                <div>
                  <div className="stat-shimmer" style={{ fontSize: '18px', fontWeight: 900, lineHeight: 1 }}>300+</div>
                  <div style={{ fontSize: '11px', color: '#94a3b8', marginTop: '2px' }}>Careers Transformed</div>
                </div>
              </div>
              
              <div className="parallax-layer-1 glass-effect magnetic-hover" style={{ position: 'absolute', top: '50px', right: '-16px', borderRadius: '14px', boxShadow: '0 8px 28px rgba(0,0,0,.10)', padding: '14px 18px', display: 'flex', alignItems: 'center', gap: '12px', border: '1px solid #eef0f6', transition: 'transform 0.5s ease-out' }}>
                <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: '#f0fdf4', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Handshake size={18} color="#16a34a" />
                </div>
                <div>
                  <div className="stat-shimmer" style={{ fontSize: '18px', fontWeight: 900, lineHeight: 1 }}>50+</div>
                  <div style={{ fontSize: '11px', color: '#94a3b8', marginTop: '2px' }}>Hiring Partners</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Values ── */}
      <section className="inner-section alt section-reveal" style={{ padding: '80px 0', position: 'relative' }}>
        <div className="floating-decoration" style={{ width: '400px', height: '400px', background: '#f97316', bottom: '-100px', left: '-100px', animationDelay: '5s' }} />
        
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '48px' }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', fontSize: '11px', fontWeight: 700, color: '#2145fb', letterSpacing: '0.8px', textTransform: 'uppercase', marginBottom: '16px' }}>
              <div style={{ width: '20px', height: '3px', borderRadius: '999px', background: '#2145fb' }} />
              What We Stand For
            </div>
            <h2 style={{ fontSize: 'clamp(1.8rem,3vw,2.6rem)', fontWeight: 900, color: '#0b0d20', lineHeight: 1.15, letterSpacing: '-0.6px' }}>
              The Principles That <span style={{ color: '#2145fb' }}>Drive Us</span>
            </h2>
          </div>
          
          <div className="ab-values-3" style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '24px' }}>
            {values.map((v, index) => (
              <div key={v.title} className="value-card-3d" style={{ 
                background: '#fff', 
                borderRadius: '20px', 
                padding: '32px', 
                border: '1px solid #eef0f6', 
                boxShadow: '0 1px 4px rgba(0,0,0,.04)',
                position: 'relative',
                overflow: 'hidden',
                animationDelay: `${index * 0.1}s`
              }}>
                <div style={{ 
                  width: '48px', 
                  height: '48px', 
                  borderRadius: '14px', 
                  background: v.bg, 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center', 
                  marginBottom: '20px',
                  boxShadow: `0 4px 12px ${v.color}20`
                }}>
                  <v.Icon size={24} color={v.color} />
                </div>
                <div style={{ fontSize: '16px', fontWeight: 700, color: '#0f172a', marginBottom: '10px' }}>{v.title}</div>
                <div style={{ fontSize: '14px', color: '#64748b', lineHeight: 1.65 }}>{v.desc}</div>
                
                {/* Subtle gradient overlay */}
                <div style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  background: `linear-gradient(135deg, ${v.color}05, ${v.color}10)`,
                  borderRadius: 'inherit',
                  pointerEvents: 'none',
                  zIndex: -1
                }} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Timeline ── */}
      <section className="inner-section section-reveal" style={{ padding: '80px 0', position: 'relative' }}>
        <div className="floating-decoration" style={{ width: '300px', height: '300px', background: '#7c3aed', top: '30%', right: '5%', animationDelay: '4s' }} />
        
        <div className="container">
          <div className="ab-two-col" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '80px', alignItems: 'start' }}>
            <div>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', fontSize: '11px', fontWeight: 700, color: '#2145fb', letterSpacing: '0.8px', textTransform: 'uppercase', marginBottom: '16px' }}>
                <div style={{ width: '20px', height: '3px', borderRadius: '999px', background: '#2145fb' }} />
                Our Journey
              </div>
              <h2 style={{ fontSize: 'clamp(1.8rem,3vw,2.6rem)', fontWeight: 900, color: '#0b0d20', lineHeight: 1.15, letterSpacing: '-0.6px', marginBottom: '16px' }}>
                From Startup to <span style={{ color: '#2145fb' }}>300+ Placements</span>
              </h2>
              <p style={{ fontSize: '15px', color: '#64748b', lineHeight: 1.75 }}>
                Every milestone was earned the hard way — one candidate at a time, one employer relationship at a time.
              </p>
            </div>
            
            <div style={{ display: 'flex', flexDirection: 'column', position: 'relative' }}>
              {/* Connecting line */}
              <div style={{ 
                position: 'absolute', 
                left: '17px', 
                top: '20px', 
                bottom: '20px', 
                width: '2px', 
                background: 'linear-gradient(transparent, #2145fb, transparent)',
                opacity: 0.3
              }} />
              
              {timeline.map((item, i) => (
                <div key={item.year} style={{ display: 'flex', gap: '20px', alignItems: 'stretch', marginBottom: i < timeline.length - 1 ? '32px' : 0 }}>
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flexShrink: 0 }}>
                    <div className="timeline-node-glow" style={{ 
                      width: '40px', 
                      height: '40px', 
                      borderRadius: '50%', 
                      background: i === timeline.length - 1 ? 'linear-gradient(135deg, #2145fb, #f97316)' : '#2145fb', 
                      display: 'flex', 
                      alignItems: 'center', 
                      justifyContent: 'center', 
                      fontSize: '14px', 
                      fontWeight: 700, 
                      color: '#fff', 
                      border: '4px solid #eff6ff', 
                      boxShadow: `0 0 0 4px rgba(33, 69, 251, 0.1)`,
                      flexShrink: 0,
                      transition: 'all 0.3s ease'
                    }}>
                      {i + 1}
                    </div>
                  </div>
                  
                  <div className="glass-effect magnetic-hover" style={{ 
                    padding: '24px', 
                    borderRadius: '16px', 
                    background: 'rgba(255,255,255,0.9)', 
                    flex: 1,
                    border: '1px solid rgba(238,240,246,0.8)',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.03)'
                  }}>
                    <div style={{ fontSize: '12px', fontWeight: 700, color: '#2145fb', letterSpacing: '0.5px', textTransform: 'uppercase', marginBottom: '6px' }}>{item.year}</div>
                    <div style={{ fontSize: '16px', fontWeight: 700, color: '#0f172a', marginBottom: '8px' }}>{item.title}</div>
                    <div style={{ fontSize: '14px', color: '#64748b', lineHeight: 1.65 }}>{item.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Leadership ── */}
      <section className="inner-section alt section-reveal" style={{ padding: '80px 0', position: 'relative' }}>
        <div className="floating-decoration" style={{ width: '350px', height: '350px', background: '#16a34a', top: '10%', left: '10%', animationDelay: '6s' }} />
        
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '48px' }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', fontSize: '11px', fontWeight: 700, color: '#2145fb', letterSpacing: '0.8px', textTransform: 'uppercase', marginBottom: '16px' }}>
              <div style={{ width: '20px', height: '3px', borderRadius: '999px', background: '#2145fb' }} />
              Leadership
            </div>
            <h2 style={{ fontSize: 'clamp(1.8rem,3vw,2.6rem)', fontWeight: 900, color: '#0b0d20', lineHeight: 1.15, letterSpacing: '-0.6px' }}>The Person Behind Placedly</h2>
          </div>
          
          <div className="ab-founder-card parallax-3d" style={{ 
            background: 'rgba(255,255,255,0.9)', 
            border: '1px solid #eef0f6', 
            borderRadius: '28px', 
            padding: '56px', 
            boxShadow: '0 20px 60px rgba(0,0,0,0.08), 0 10px 30px rgba(0,0,0,0.05)', 
            display: 'flex', 
            gap: '56px', 
            alignItems: 'center', 
            maxWidth: '900px', 
            margin: '0 auto',
            backdropFilter: 'blur(10px)',
            WebkitBackdropFilter: 'blur(10px)'
          }}>
            <div className="parallax-layer-2" style={{ 
              width: '200px', 
              height: '250px', 
              borderRadius: '22px', 
              overflow: 'hidden', 
              flexShrink: 0, 
              boxShadow: '0 20px 40px rgba(0,0,0,.15)',
              position: 'relative',
              transition: 'transform 0.5s ease-out'
            }}>
              <img src="/img/at founder part.png" alt="Founder" style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center top' }} />
              <div style={{
                position: 'absolute',
                bottom: 0,
                left: 0,
                right: 0,
                height: '40%',
                background: 'linear-gradient(transparent, rgba(0,0,0,0.3))',
                pointerEvents: 'none'
              }} />
            </div>
            
            <div className="parallax-layer-1" style={{ flex: 1, transition: 'transform 0.5s ease-out' }}>
              <div style={{ fontSize: '24px', fontWeight: 800, color: '#0b0d20', marginBottom: '6px' }}>Our Founder</div>
              <div style={{ fontSize: '15px', color: '#2145fb', fontWeight: 600, marginBottom: '24px' }}>Founder &amp; CEO, Placedly</div>
              <p style={{ fontSize: '16px', color: '#64748b', lineHeight: 1.8, marginBottom: '28px' }}>
                With a deep background in talent acquisition and career consulting across Delhi NCR&apos;s top MNCs, our founder built Placedly with a frustration-turned-mission: too many talented professionals were being left behind by a system that favoured connections over competence.
              </p>
              <div style={{ 
                background: 'linear-gradient(135deg, #f8faff, #f0fdf4)', 
                borderLeft: '4px solid #2145fb', 
                padding: '20px 24px', 
                borderRadius: '0 16px 16px 0', 
                fontSize: '15px', 
                color: '#374151', 
                fontStyle: 'italic', 
                lineHeight: 1.7,
                boxShadow: '0 4px 12px rgba(0,0,0,0.03)'
              }}>
                &ldquo;Your next job shouldn&apos;t depend on who you know. It should depend on how well we prepare you.&rdquo;
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="inner-section section-reveal" style={{ padding: '80px 0', position: 'relative' }}>
        <div className="floating-decoration" style={{ width: '400px', height: '400px', background: '#f97316', bottom: '-100px', right: '-100px', animationDelay: '7s' }} />
        
        <div className="container">
          <div className="page-dark-cta" style={{ 
            background: 'linear-gradient(135deg, #0b0d20, #1a1c3a, #0b0d20)', 
            borderRadius: '32px', 
            padding: '80px 72px', 
            textAlign: 'center',
            position: 'relative',
            overflow: 'hidden',
            boxShadow: '0 30px 80px rgba(0,0,0,0.3)'
          }}>
            {/* Animated gradient background */}
            <div style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: 'radial-gradient(circle at 30% 50%, rgba(33, 69, 251, 0.15), transparent 50%)',
              animation: 'float 8s ease-in-out infinite',
              pointerEvents: 'none'
            }} />
            
            <div className="floating-decoration" style={{ width: '200px', height: '200px', background: '#f97316', top: '-50px', right: '20%', animationDelay: '2s', opacity: 0.2 }} />
            
            <div style={{ position: 'relative', zIndex: 1 }}>
              <h2 style={{ fontSize: 'clamp(1.8rem,3vw,2.8rem)', fontWeight: 900, color: '#ffffff', lineHeight: 1.2, letterSpacing: '-0.5px', marginBottom: '16px' }}>
                Ready to Write Your <span className="text-gradient-animate">Success Story?</span>
              </h2>
              <p style={{ fontSize: '16px', color: 'rgba(255,255,255,.7)', marginBottom: '40px', maxWidth: '500px', margin: '0 auto 40px', lineHeight: 1.7 }}>
                Join 300+ professionals who trusted Placedly to transform their career. Zero upfront — you only pay after you&apos;re placed.
              </p>
              
              <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
                <a href="/contact" className="magnetic-hover" style={{ 
                  display: 'inline-flex', 
                  alignItems: 'center', 
                  gap: '10px', 
                  background: 'linear-gradient(135deg, #f97316, #ff6b00)', 
                  color: '#fff', 
                  fontWeight: 700, 
                  fontSize: '15px', 
                  fontFamily: 'Poppins,sans-serif', 
                  padding: '16px 36px', 
                  borderRadius: '999px', 
                  textDecoration: 'none', 
                  boxShadow: '0 8px 24px rgba(249,115,22,.4)',
                  transition: 'all 0.3s ease'
                }}>
                  <Rocket size={16} /> Get Placed Now
                </a>
                
                <a href="/study-visa" className="magnetic-hover" style={{ 
                  display: 'inline-flex', 
                  alignItems: 'center', 
                  gap: '10px', 
                  background: 'transparent', 
                  color: '#fff', 
                  fontWeight: 600, 
                  fontSize: '15px', 
                  fontFamily: 'Poppins,sans-serif', 
                  padding: '16px 36px', 
                  borderRadius: '999px', 
                  textDecoration: 'none', 
                  border: '2px solid rgba(255,255,255,.3)',
                  transition: 'all 0.3s ease',
                  backdropFilter: 'blur(10px)',
                  WebkitBackdropFilter: 'blur(10px)'
                }}>
                  <Plane size={16} /> Study Abroad
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </PageLayout>
  );
}