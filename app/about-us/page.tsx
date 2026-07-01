export const dynamic = 'force-dynamic';

import type { Metadata } from 'next';
import { 
  Target, DollarSign, Handshake, Globe, Building2, TrendingUp, 
  Rocket, Plane, Trophy, Sparkles, Award, ArrowRight, CheckCircle2, Zap 
} from 'lucide-react';
import PageLayout from '../components/PageLayout';
import { getCmsMap, parseCmsJson } from '@/lib/cms';

export const metadata: Metadata = {
  title: 'About Us — Placedly | Next-Gen Career & Global Education Partners',
  description: 'Discover Placedly — Delhi NCR\'s award-winning career placement and global education consultancy transforming futures with zero upfront fees.',
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const ICON_MAP: Record<string, React.ComponentType<any>> = {
  Target, DollarSign, Handshake, Globe, Building2, TrendingUp
};

const DEFAULT_VALUES = [
  { Icon: Target,      color: '#2563eb', bg: 'linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%)', title: 'Personalised, Always', desc: 'No two careers are the same. Every candidate gets a bespoke roadmap built around their skills, goals, and target industry — not a generic playbook.' },
  { Icon: DollarSign,  color: '#16a34a', bg: 'linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%)', title: 'Zero Upfront Model', desc: 'We put our money where our mouth is. Our Career Assistance Fee of 12% is charged only after you receive your official offer letter. Our success is tied directly to yours.' },
  { Icon: Handshake,   color: '#f97316', bg: 'linear-gradient(135deg, #fff7ed 0%, #ffedd5 100%)', title: 'End-to-End Partnership', desc: 'From complete CV architecture to day 90 in your new role — we stay with you through every step, including aggressive salary negotiation and onboarding support.' },
  { Icon: Globe,       color: '#0891b2', bg: 'linear-gradient(135deg, #ecfeff 0%, #cffafe 100%)', title: 'Global Reach & Access', desc: '140+ prestigious university partners across UK, France, Germany, and Dubai. We make international education accessible, transparent, and completely stress-free.' },
  { Icon: Building2,   color: '#7c3aed', bg: 'linear-gradient(135deg, #faf5ff 0%, #f3e8ff 100%)', title: 'Direct Employer Network', desc: 'Our 50+ tier-1 hiring partner network means your profile bypasses screening bots and lands directly on decision-makers desks.' },
  { Icon: TrendingUp,  color: '#ef4444', bg: 'linear-gradient(135deg, #fef2f2 0%, #fee2e2 100%)', title: 'Measurable Outcomes', desc: 'Average 40% salary hike. 300+ careers transformed. First interview call typically secured within 1–2 weeks. Results you can bank on.' },
];

const DEFAULT_TIMELINE = [
  { year: '2022', title: 'Placedly Founded', desc: 'Started in Delhi NCR with a rebellious mission: make career growth transparent, merit-based, and accessible to every ambitious professional.' },
  { year: '2023', title: '100 Placements Milestone', desc: 'Crossed 100 successful placements and launched our flagship Career Assistance Programme (CAP) with revolutionary zero upfront fees.' },
  { year: '2024', title: 'Study Abroad Division', desc: 'Launched global education services, establishing direct alliances with 140+ university partners across UK, France, Germany, and Dubai.' },
  { year: '2025', title: '300+ Careers Transformed', desc: 'Expanded to 50+ corporate hiring partners and maintained an astonishing average 40% salary hike for placed professionals.' },
  { year: '2026', title: 'Scaling Pan-India & Global', desc: 'Rapidly expanding beyond Delhi NCR to serve tech and business leaders in Bangalore, Mumbai, Hyderabad, and overseas.' },
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
      {/* Embedded Award-Winning Styles & Keyframe Animations */}
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes shimmerWave {
          0% { background-position: -200% 0; }
          100% { background-position: 200% 0; }
        }
        @keyframes floatSlow {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-12px) rotate(1.5deg); }
        }
        @keyframes floatReverse {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(10px) rotate(-1.5deg); }
        }
        @keyframes pulseGlow {
          0%, 100% { opacity: 0.4; transform: scale(1); }
          50% { opacity: 0.8; transform: scale(1.15); }
        }
        @keyframes textShimmer {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        .text-gradient-shimmer {
          background: linear-gradient(270deg, #2145fb, #60a5fa, #f97316, #2145fb);
          background-size: 300% 300%;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          animation: textShimmer 6s ease infinite;
        }
        .card-3d {
          transition: all 0.5s cubic-bezier(0.16, 1, 0.3, 1);
          transform-style: preserve-3d;
          position: relative;
        }
        .card-3d:hover {
          transform: perspective(1000px) rotateX(4deg) rotateY(-4deg) translateY(-8px) scale(1.02);
          box-shadow: 0 25px 50px -12px rgba(33, 69, 251, 0.15), 0 0 0 1px rgba(33, 69, 251, 0.2);
        }
        .shimmer-btn {
          position: relative;
          overflow: hidden;
          transition: all 0.3s ease;
        }
        .shimmer-btn::after {
          content: '';
          position: absolute;
          top: 0; left: -100%;
          width: 100%; height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.35), transparent);
          transition: left 0.7s ease;
        }
        .shimmer-btn:hover::after {
          left: 100%;
        }
        .shimmer-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 12px 24px -6px rgba(33, 69, 251, 0.4);
        }
        .glass-badge {
          background: rgba(255, 255, 255, 0.85);
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
          border: 1px solid rgba(255, 255, 255, 0.6);
        }
        .bg-glow-orb {
          position: absolute;
          border-radius: 50%;
          filter: blur(90px);
          pointer-events: none;
          z-index: 0;
          animation: pulseGlow 8s ease-in-out infinite;
        }
        .timeline-line::after {
          content: '';
          position: absolute;
          top: 0; left: 0; width: 100%; height: 100%;
          background: linear-gradient(180deg, #2145fb, #f97316, transparent);
        }
      `}} />

      {/* ── Hero Section ── */}
      <section className="inner-section" style={{ position: 'relative', padding: 'calc(72px + 68px) 0 60px', overflow: 'hidden' }}>
        {/* Ambient Glowing Orbs */}
        <div className="bg-glow-orb" style={{ width: '450px', height: '450px', background: 'rgba(33, 69, 251, 0.08)', top: '-50px', right: '-100px' }} />
        <div className="bg-glow-orb" style={{ width: '350px', height: '350px', background: 'rgba(249, 115, 22, 0.06)', bottom: '50px', left: '-80px', animationDelay: '3s' }} />

        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', maxWidth: '820px' }}>
            <nav style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', color: '#64748b', marginBottom: '24px', fontWeight: 500 }}>
              <a href="/" style={{ color: '#64748b', textDecoration: 'none', transition: 'color 0.2s' }}>Home</a>
              <span>›</span>
              <span style={{ color: '#2145fb', fontWeight: 600 }}>About Us</span>
            </nav>

            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '10px', padding: '6px 14px', background: '#eff6ff', borderRadius: '999px', border: '1px solid #dbeafe', marginBottom: '24px' }}>
              <Sparkles size={14} color="#2145fb" />
              <span style={{ fontSize: '12px', fontWeight: 700, color: '#2145fb', letterSpacing: '0.6px', textTransform: 'uppercase' }}>Our Story & Vision</span>
            </div>

            <h1 style={{ fontSize: 'clamp(2.5rem, 5.5vw, 4.2rem)', fontWeight: 900, color: '#0b0d20', lineHeight: 1.08, letterSpacing: '-1.5px', marginBottom: '24px' }}>
              We&apos;re Not Just a<br />Placement Agency.<br />
              <span className="text-gradient-shimmer">We&apos;re Career Partners.</span>
            </h1>

            <p style={{ fontSize: '18px', color: '#475569', lineHeight: 1.7, maxWidth: '600px', marginBottom: '40px' }}>
              Born in Delhi NCR. Engineered for every professional who refuses to settle — delivering superior roles, peak compensation, and global trajectories that match your true ambition.
            </p>

            <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', marginBottom: '64px' }}>
              <a href="/contact" className="shimmer-btn" style={{ display: 'inline-flex', alignItems: 'center', gap: '10px', background: '#2145fb', color: '#fff', fontWeight: 600, fontSize: '15px', padding: '16px 34px', borderRadius: '999px', textDecoration: 'none' }}>
                <Rocket size={18} /> Start Your Journey <ArrowRight size={16} />
              </a>
              <a href="#our-story" style={{ display: 'inline-flex', alignItems: 'center', gap: '10px', background: '#fff', color: '#0f172a', fontWeight: 600, fontSize: '15px', padding: '16px 34px', borderRadius: '999px', textDecoration: 'none', border: '1.5px solid #cbd5e1', transition: 'all 0.3s ease', boxShadow: '0 2px 4px rgba(0,0,0,0.02)' }}>
                Explore Our Blueprint ↓
              </a>
            </div>
          </div>

          {/* Shimmering 3D Stats Strip */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px', marginTop: '20px' }}>
            {stats.map((s, i) => (
              <div 
                key={s.num + i} 
                className="card-3d" 
                style={{ 
                  background: '#ffffff', 
                  borderRadius: '20px', 
                  padding: '32px 24px', 
                  textAlign: 'center',
                  border: '1px solid #f1f5f9',
                  boxShadow: '0 10px 30px -10px rgba(0,0,0,0.04)' 
                }}
              >
                <div style={{ fontSize: '2.4rem', fontWeight: 900, color: '#0b0d20', lineHeight: 1, marginBottom: '8px', letterSpacing: '-1px' }}>
                  {s.num}
                </div>
                <div style={{ fontSize: '13px', color: '#64748b', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Mission Section (3D Visual Grid) ── */}
      <section className="inner-section" style={{ padding: '100px 0', position: 'relative' }} id="our-story">
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '80px', alignItems: 'center' }}>
            
            {/* Left Content */}
            <div>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', fontSize: '12px', fontWeight: 700, color: '#2145fb', letterSpacing: '1px', textTransform: 'uppercase', marginBottom: '16px' }}>
                <Zap size={16} color="#f97316" /> Our Core Mission
              </div>
              <h2 style={{ fontSize: 'clamp(2rem, 3.5vw, 3rem)', fontWeight: 900, color: '#0b0d20', lineHeight: 1.15, letterSpacing: '-1px', marginBottom: '24px' }}>
                Democratising Elite Career Growth <span style={{ color: '#2145fb' }}>For Everyone</span>
              </h2>
              <p style={{ fontSize: '16px', color: '#64748b', lineHeight: 1.8, marginBottom: '20px' }}>
                Placedly was founded upon one non-negotiable principle: exceptional careers shouldn&apos;t be a privilege reserved for those with legacy connections. Every high-performing professional deserves strategic guidance, direct access to hiring managers, and a fair shot at top-tier roles.
              </p>
              <div style={{ background: '#f8fafc', borderRadius: '16px', padding: '20px', borderLeft: '4px solid #2145fb', marginBottom: '32px' }}>
                <p style={{ fontSize: '15px', color: '#0f172a', lineHeight: 1.7, margin: 0, fontWeight: 500 }}>
                  We operate on an uncompromising alignment model: <strong>Zero Upfront, Success-Share Only.</strong> Our 12% Career Assistance Fee is triggered strictly upon receipt of your formal offer letter. If you don&apos;t win, we don&apos;t get paid.
                </p>
              </div>
              <a href="/contact" className="shimmer-btn" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: '#0b0d20', color: '#fff', fontWeight: 600, fontSize: '14px', padding: '14px 30px', borderRadius: '999px', textDecoration: 'none' }}>
                Speak With a Career Strategist →
              </a>
            </div>

            {/* Right 3D Visual Collage */}
            <div style={{ position: 'relative', height: '520px', perspective: '1200px' }}>
              
              {/* Back Image with 3D Tilt */}
              <div 
                className="card-3d"
                style={{ 
                  position: 'absolute', top: 0, left: 0, width: '75%', height: '340px', 
                  borderRadius: '24px', overflow: 'hidden', boxShadow: '0 25px 50px -12px rgba(0,0,0,0.18)',
                  border: '1px solid rgba(255,255,255,0.4)'
                }}
              >
                <img src="/img/team.png" alt="Placedly Expert Team" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>

              {/* Front Overlapping Image */}
              <div 
                className="card-3d"
                style={{ 
                  position: 'absolute', bottom: 0, right: 0, width: '65%', height: '280px', 
                  borderRadius: '24px', overflow: 'hidden', boxShadow: '0 30px 60px -15px rgba(0,0,0,0.25)', 
                  border: '6px solid #fff' 
                }}
              >
                <img src="/img/aboutt us consultancy.png" alt="Consultancy Session" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>

              {/* Floating Glassmorphism Badge 1 */}
              <div 
                className="glass-badge"
                style={{ 
                  position: 'absolute', bottom: '160px', left: '-10px', 
                  borderRadius: '18px', boxShadow: '0 20px 40px rgba(0,0,0,0.12)', 
                  padding: '16px 22px', display: 'flex', alignItems: 'center', gap: '14px', 
                  animation: 'floatSlow 5s ease-in-out infinite', zIndex: 10
                }}
              >
                <div style={{ width: '46px', height: '46px', borderRadius: '14px', background: 'linear-gradient(135deg, #2145fb, #60a5fa)', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 6px 16px rgba(33,69,251,0.3)' }}>
                  <Trophy size={22} color="#ffffff" />
                </div>
                <div>
                  <div style={{ fontSize: '20px', fontWeight: 900, color: '#0b0d20', lineHeight: 1 }}>300+</div>
                  <div style={{ fontSize: '12px', color: '#64748b', fontWeight: 600, marginTop: '2px' }}>Careers Transformed</div>
                </div>
              </div>

              {/* Floating Glassmorphism Badge 2 */}
              <div 
                className="glass-badge"
                style={{ 
                  position: 'absolute', top: '40px', right: '-10px', 
                  borderRadius: '18px', boxShadow: '0 20px 40px rgba(0,0,0,0.12)', 
                  padding: '16px 22px', display: 'flex', alignItems: 'center', gap: '14px', 
                  animation: 'floatReverse 6s ease-in-out infinite', zIndex: 10
                }}
              >
                <div style={{ width: '46px', height: '46px', borderRadius: '14px', background: 'linear-gradient(135deg, #16a34a, #4ade80)', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 6px 16px rgba(22,163,74,0.3)' }}>
                  <Award size={22} color="#ffffff" />
                </div>
                <div>
                  <div style={{ fontSize: '20px', fontWeight: 900, color: '#0b0d20', lineHeight: 1 }}>40% Avg</div>
                  <div style={{ fontSize: '12px', color: '#64748b', fontWeight: 600, marginTop: '2px' }}>Salary Hike Secured</div>
                </div>
              </div>

            </div>

          </div>
        </div>
      </section>

      {/* ── Values Section (Interactive 3D Cards) ── */}
      <section className="inner-section" style={{ padding: '100px 0', background: '#f8fafc', borderTop: '1px solid #e2e8f0', borderBottom: '1px solid #e2e8f0', position: 'relative' }}>
        <div className="container">
          <div style={{ textAlign: 'center', maxWidth: '680px', margin: '0 auto 64px' }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', fontSize: '12px', fontWeight: 700, color: '#2145fb', letterSpacing: '1px', textTransform: 'uppercase', marginBottom: '16px' }}>
              What Drives Us
            </div>
            <h2 style={{ fontSize: 'clamp(2rem, 3.5vw, 3rem)', fontWeight: 900, color: '#0b0d20', lineHeight: 1.15, letterSpacing: '-1px' }}>
              The Architectural Principles Behind <span className="text-gradient-shimmer">Placedly</span>
            </h2>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '28px' }}>
            {values.map(v => (
              <div 
                key={v.title} 
                className="card-3d" 
                style={{ 
                  background: '#ffffff', 
                  borderRadius: '24px', 
                  padding: '36px 30px', 
                  border: '1px solid #f1f5f9',
                  boxShadow: '0 4px 20px rgba(0,0,0,0.03)',
                  display: 'flex',
                  flexDirection: 'column'
                }}
              >
                <div style={{ width: '56px', height: '56px', borderRadius: '16px', background: v.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '24px', border: '1px solid rgba(0,0,0,0.04)' }}>
                  <v.Icon size={26} color={v.color} />
                </div>
                <div style={{ fontSize: '18px', fontWeight: 800, color: '#0f172a', marginBottom: '12px' }}>
                  {v.title}
                </div>
                <div style={{ fontSize: '15px', color: '#64748b', lineHeight: 1.7 }}>
                  {v.desc}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Dynamic Timeline Section ── */}
      <section className="inner-section" style={{ padding: '100px 0' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '80px', alignItems: 'start' }}>
            
            <div style={{ position: 'sticky', top: '120px' }}>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', fontSize: '12px', fontWeight: 700, color: '#2145fb', letterSpacing: '1px', textTransform: 'uppercase', marginBottom: '16px' }}>
                Evolution Timeline
              </div>
              <h2 style={{ fontSize: 'clamp(2rem, 3.5vw, 3rem)', fontWeight: 900, color: '#0b0d20', lineHeight: 1.15, letterSpacing: '-1px', marginBottom: '20px' }}>
                From Startup Vision to <span style={{ color: '#2145fb' }}>Industry Benchmark</span>
              </h2>
              <p style={{ fontSize: '16px', color: '#64748b', lineHeight: 1.8, marginBottom: '32px' }}>
                Every milestone on our timeline represents real professional lives elevated, negotiations won, and international boundaries crossed.
              </p>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', color: '#0f172a', fontWeight: 700 }}>
                <CheckCircle2 size={20} color="#16a34a" /> Over 10,000+ hours invested in coaching
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', position: 'relative' }}>
              {timeline.map((item, i) => (
                <div key={item.year} style={{ display: 'flex', gap: '24px', alignItems: 'stretch', position: 'relative' }}>
                  
                  {/* Timeline Bar & Node */}
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flexShrink: 0 }}>
                    <div 
                      style={{ 
                        width: '44px', height: '44px', borderRadius: '50%', background: '#2145fb', 
                        display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '14px', 
                        fontWeight: 800, color: '#fff', border: '4px solid #eff6ff', 
                        boxShadow: '0 0 0 4px rgba(33,69,251,0.1)', zIndex: 2
                      }}
                    >
                      {i + 1}
                    </div>
                    {i < timeline.length - 1 && (
                      <div style={{ width: '3px', flex: 1, background: 'linear-gradient(180deg, #2145fb, #cbd5e1)', margin: '6px 0' }} />
                    )}
                  </div>

                  {/* Content Card */}
                  <div 
                    className="card-3d"
                    style={{ 
                      paddingBottom: i < timeline.length - 1 ? '40px' : '0', flex: 1
                    }}
                  >
                    <div style={{ background: '#ffffff', padding: '24px', borderRadius: '20px', border: '1px solid #f1f5f9', boxShadow: '0 8px 24px rgba(0,0,0,0.03)' }}>
                      <div style={{ display: 'inline-block', padding: '4px 12px', background: '#eff6ff', borderRadius: '999px', fontSize: '12px', fontWeight: 800, color: '#2145fb', marginBottom: '10px' }}>
                        {item.year}
                      </div>
                      <div style={{ fontSize: '18px', fontWeight: 800, color: '#0f172a', marginBottom: '8px' }}>
                        {item.title}
                      </div>
                      <div style={{ fontSize: '15px', color: '#64748b', lineHeight: 1.7 }}>
                        {item.desc}
                      </div>
                    </div>
                  </div>

                </div>
              ))}
            </div>

          </div>
        </div>
      </section>

      {/* ── Leadership / Founder Section ── */}
      <section className="inner-section" style={{ padding: '100px 0', background: '#f8fafc', borderTop: '1px solid #e2e8f0' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '64px' }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', fontSize: '12px', fontWeight: 700, color: '#2145fb', letterSpacing: '1px', textTransform: 'uppercase', marginBottom: '16px' }}>
              Visionary Leadership
            </div>
            <h2 style={{ fontSize: 'clamp(2rem, 3.5vw, 3rem)', fontWeight: 900, color: '#0b0d20', lineHeight: 1.15, letterSpacing: '-1px' }}>
              The Mind Behind <span className="text-gradient-shimmer">Placedly</span>
            </h2>
          </div>

          <div 
            className="card-3d" 
            style={{ 
              background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '32px', 
              padding: '56px', boxShadow: '0 20px 50px rgba(0,0,0,0.05)', display: 'grid', 
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '48px', 
              alignItems: 'center', maxWidth: '960px', margin: '0 auto' 
            }}
          >
            <div style={{ position: 'relative', width: '100%', maxWidth: '300px', margin: '0 auto' }}>
              <div style={{ width: '100%', height: '360px', borderRadius: '24px', overflow: 'hidden', boxShadow: '0 20px 40px rgba(0,0,0,0.15)', position: 'relative', zIndex: 2 }}>
                <img src="/img/at founder part.png" alt="Founder & CEO" style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center top' }} />
              </div>
              <div style={{ position: 'absolute', inset: '-12px', background: 'linear-gradient(135deg, #2145fb, #f97316)', borderRadius: '30px', zIndex: 1, opacity: 0.15 }} />
            </div>

            <div>
              <div style={{ fontSize: '28px', fontWeight: 900, color: '#0b0d20', marginBottom: '4px' }}>Our Founder</div>
              <div style={{ fontSize: '15px', color: '#2145fb', fontWeight: 700, marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                Founder &amp; Chief Executive Officer <Sparkles size={16} />
              </div>
              <p style={{ fontSize: '16px', color: '#475569', lineHeight: 1.8, marginBottom: '28px' }}>
                With an extensive background in executive talent acquisition across Delhi NCR and global hubs, our founder recognized a glaring industry flaw: traditional recruitment agencies served corporate clients, leaving ambitious candidates without an advocate.
              </p>
              <div style={{ background: '#eff6ff', borderLeft: '4px solid #2145fb', padding: '22px 26px', borderRadius: '0 16px 16px 0', position: 'relative' }}>
                <p style={{ fontSize: '16px', color: '#0f172a', fontStyle: 'italic', lineHeight: 1.7, margin: 0, fontWeight: 600 }}>
                  &ldquo;Your next job shouldn&apos;t depend on who you know or luck. It should be the direct result of precision strategy, elite preparation, and aggressive advocacy.&rdquo;
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Award-Winning CTA Section ── */}
      <section className="inner-section" style={{ padding: '100px 0' }}>
        <div className="container">
          <div 
            style={{ 
              background: 'linear-gradient(135deg, #0b0d20 0%, #1e1b4b 100%)', 
              borderRadius: '36px', padding: '80px 48px', textAlign: 'center', 
              position: 'relative', overflow: 'hidden',
              boxShadow: '0 30px 60px -15px rgba(11, 13, 32, 0.4)'
            }}
          >
            {/* Background Glows inside CTA */}
            <div className="bg-glow-orb" style={{ width: '400px', height: '400px', background: 'rgba(33, 69, 251, 0.25)', top: '-100px', right: '-100px' }} />
            <div className="bg-glow-orb" style={{ width: '300px', height: '300px', background: 'rgba(249, 115, 22, 0.2)', bottom: '-80px', left: '-80px' }} />

            <div style={{ position: 'relative', zIndex: 2, maxWidth: '640px', margin: '0 auto' }}>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '6px 16px', background: 'rgba(255,255,255,0.1)', borderRadius: '999px', color: '#fff', fontSize: '12px', fontWeight: 700, letterSpacing: '1px', textTransform: 'uppercase', marginBottom: '24px' }}>
                Take Control Today
              </div>

              <h2 style={{ fontSize: 'clamp(2.2rem, 4.5vw, 3.4rem)', fontWeight: 900, color: '#ffffff', lineHeight: 1.15, letterSpacing: '-1px', marginBottom: '20px' }}>
                Ready to Author Your <span style={{ color: '#f97316' }}>Breakthrough?</span>
              </h2>

              <p style={{ fontSize: '17px', color: 'rgba(255,255,255,0.75)', lineHeight: 1.7, marginBottom: '40px' }}>
                Join 300+ professionals who secured high-impact roles and massive salary hikes with Placedly. Remember: strictly ₹0 upfront.
              </p>

              <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
                <a 
                  href="/contact" 
                  className="shimmer-btn" 
                  style={{ 
                    display: 'inline-flex', alignItems: 'center', gap: '10px', 
                    background: 'linear-gradient(90deg, #f97316, #ea580c)', color: '#fff', 
                    fontWeight: 700, fontSize: '16px', padding: '18px 38px', 
                    borderRadius: '999px', textDecoration: 'none', 
                    boxShadow: '0 10px 25px rgba(249, 115, 22, 0.4)' 
                  }}
                >
                  <Rocket size={18} /> Secure Your Career Roadmap
                </a>
                <a 
                  href="/study-visa" 
                  style={{ 
                    display: 'inline-flex', alignItems: 'center', gap: '10px', 
                    background: 'rgba(255,255,255,0.08)', color: '#fff', fontWeight: 600, 
                    fontSize: '16px', padding: '18px 38px', borderRadius: '999px', 
                    textDecoration: 'none', border: '1.5px solid rgba(255,255,255,0.25)',
                    transition: 'all 0.3s ease'
                  }}
                >
                  <Plane size={18} /> Explore Global Study
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </PageLayout>
  );
}