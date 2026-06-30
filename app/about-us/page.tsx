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
  { Icon: Target,      color: '#2145fb', bg: '#eff6ff', title: 'Personalised, Always', desc: 'No two careers are the same. Every candidate gets a bespoke roadmap built around their skills, goals, and target industry — not a generic playbook.' },
  { Icon: DollarSign,  color: '#16a34a', bg: '#f0fdf4', title: 'Zero Upfront', desc: 'We believe in putting our money where our mouth is. Career Assistance Fee of 12% is charged only after you receive your offer letter. Our success is tied directly to yours.' },
  { Icon: Handshake,   color: '#f97316', bg: '#fff7ed', title: 'End-to-End Partnership', desc: 'From CV rebuild to day 90 in your new role — we stay with you through every step, including salary negotiation and joining support.' },
  { Icon: Globe,       color: '#0891b2', bg: '#ecfeff', title: 'Global Reach', desc: '140+ university partners across UK, France, Germany, and Dubai. We make international education accessible, transparent, and stress-free.' },
  { Icon: Building2,   color: '#7c3aed', bg: '#faf5ff', title: 'Direct Employer Access', desc: 'Our 50+ hiring partner network means your profile goes directly to decision-makers — not into a black-hole job board.' },
  { Icon: TrendingUp,  color: '#ef4444', bg: '#fef2f2', title: 'Measurable Outcomes', desc: 'Average 40% salary hike. 300+ careers transformed. First interview call within 1–2 weeks. Results you can count on.' },
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
      {/* ── Hero ── */}
      <section className="inner-section" style={{ padding: 'calc(56px + 68px) 0 0' }}>
        <div className="container">
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', maxWidth: '760px' }}>
            <nav style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', color: '#94a3b8', marginBottom: '24px' }}>
              <a href="/" style={{ color: '#94a3b8', textDecoration: 'none' }}>Home</a>
              <span>›</span>
              <span style={{ color: '#374151' }}>About Us</span>
            </nav>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '20px' }}>
              <div style={{ width: '20px', height: '3px', borderRadius: '999px', background: '#2145fb' }} />
              <span style={{ fontSize: '11px', fontWeight: 700, color: '#2145fb', letterSpacing: '0.8px', textTransform: 'uppercase' }}>Our Story</span>
            </div>
            <h1 style={{ fontSize: 'clamp(2.2rem,4.5vw,3.8rem)', fontWeight: 900, color: '#0b0d20', lineHeight: 1.1, letterSpacing: '-1px', marginBottom: '20px' }}>
              We&apos;re Not Just a<br />Placement Agency.<br />
              <span style={{ color: '#f97316' }}>We&apos;re Career Partners.</span>
            </h1>
            <p style={{ fontSize: '16px', color: '#64748b', lineHeight: 1.7, maxWidth: '520px', marginBottom: '32px' }}>
              Born in Delhi NCR. Built for every professional who deserves better — a better role, a better salary, and a career that actually reflects their potential.
            </p>
            <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', marginBottom: '48px' }}>
              <a href="/contact" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: '#2145fb', color: '#fff', fontWeight: 600, fontSize: '14px', fontFamily: 'Poppins,sans-serif', padding: '13px 28px', borderRadius: '999px', textDecoration: 'none', boxShadow: '0 2px 10px rgba(33,69,251,.25)' }}>
                <Rocket size={15} /> Start Your Journey
              </a>
              <a href="#our-story" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'transparent', color: '#374151', fontWeight: 500, fontSize: '14px', fontFamily: 'Poppins,sans-serif', padding: '13px 28px', borderRadius: '999px', textDecoration: 'none', border: '1.5px solid #e2e8f0' }}>Read Our Story ↓</a>
            </div>
          </div>

          {/* Stats strip */}
          <div className="ab-stats-4" style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', borderTop: '1px solid #eef0f6' }}>
            {stats.map((s, i) => (
              <div key={s.num} style={{ textAlign: 'center', padding: '28px 16px', position: 'relative', borderRight: i < 3 ? '1px solid #eef0f6' : 'none' }}>
                <div style={{ fontSize: '1.8rem', fontWeight: 900, color: '#0b0d20', lineHeight: 1, marginBottom: '6px', letterSpacing: '-0.5px' }}>{s.num}</div>
                <div style={{ fontSize: '12px', color: '#94a3b8', fontWeight: 500 }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Mission ── */}
      <section className="inner-section" style={{ padding: '80px 0' }} id="our-story">
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
              <a href="/contact" style={{ display: 'inline-flex', alignItems: 'center', background: '#2145fb', color: '#fff', fontWeight: 600, fontSize: '14px', fontFamily: 'Poppins,sans-serif', padding: '13px 28px', borderRadius: '999px', textDecoration: 'none' }}>
                Talk to Our Team →
              </a>
            </div>
            <div className="ab-mission-img" style={{ position: 'relative', height: '480px' }}>
              <div style={{ position: 'absolute', top: 0, left: 0, width: '72%', height: '300px', borderRadius: '20px', overflow: 'hidden', boxShadow: '0 20px 48px rgba(0,0,0,.12)' }}>
                <img src="/img/team.png" alt="Placedly Team" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>
              <div style={{ position: 'absolute', bottom: 0, right: 0, width: '60%', height: '240px', borderRadius: '20px', overflow: 'hidden', boxShadow: '0 20px 48px rgba(0,0,0,.12)', border: '4px solid #fff' }}>
                <img src="/img/aboutt us consultancy.png" alt="Consultancy" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>
              <div style={{ position: 'absolute', bottom: '155px', left: '-16px', background: '#fff', borderRadius: '14px', boxShadow: '0 8px 28px rgba(0,0,0,.10)', padding: '14px 18px', display: 'flex', alignItems: 'center', gap: '12px', border: '1px solid #eef0f6' }}>
                <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: '#eff6ff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Trophy size={18} color="#2145fb" />
                </div>
                <div>
                  <div style={{ fontSize: '18px', fontWeight: 900, color: '#0b0d20', lineHeight: 1 }}>300+</div>
                  <div style={{ fontSize: '11px', color: '#94a3b8', marginTop: '2px' }}>Careers Transformed</div>
                </div>
              </div>
              <div style={{ position: 'absolute', top: '50px', right: '-16px', background: '#fff', borderRadius: '14px', boxShadow: '0 8px 28px rgba(0,0,0,.10)', padding: '14px 18px', display: 'flex', alignItems: 'center', gap: '12px', border: '1px solid #eef0f6' }}>
                <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: '#f0fdf4', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Handshake size={18} color="#16a34a" />
                </div>
                <div>
                  <div style={{ fontSize: '18px', fontWeight: 900, color: '#0b0d20', lineHeight: 1 }}>50+</div>
                  <div style={{ fontSize: '11px', color: '#94a3b8', marginTop: '2px' }}>Hiring Partners</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Values ── */}
      <section className="inner-section alt" style={{ padding: '80px 0' }}>
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
          <div className="ab-values-3" style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '20px' }}>
            {values.map(v => (
              <div key={v.title} style={{ background: '#fff', borderRadius: '16px', padding: '28px', border: '1px solid #eef0f6', boxShadow: '0 1px 4px rgba(0,0,0,.04)' }}>
                <div style={{ width: '44px', height: '44px', borderRadius: '12px', background: v.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '16px' }}>
                  <v.Icon size={20} color={v.color} />
                </div>
                <div style={{ fontSize: '15px', fontWeight: 700, color: '#0f172a', marginBottom: '8px' }}>{v.title}</div>
                <div style={{ fontSize: '14px', color: '#64748b', lineHeight: 1.65 }}>{v.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Timeline ── */}
      <section className="inner-section" style={{ padding: '80px 0' }}>
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
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              {timeline.map((item, i) => (
                <div key={item.year} style={{ display: 'flex', gap: '20px', alignItems: 'stretch' }}>
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flexShrink: 0 }}>
                    <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: '#2145fb', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '13px', fontWeight: 700, color: '#fff', border: '3px solid #eff6ff', flexShrink: 0 }}>{i + 1}</div>
                    {i < timeline.length - 1 && <div style={{ width: '2px', flex: 1, background: '#eef0f6', marginTop: '4px' }} />}
                  </div>
                  <div style={{ paddingBottom: i < timeline.length - 1 ? '24px' : 0 }}>
                    <div style={{ fontSize: '11px', fontWeight: 700, color: '#2145fb', letterSpacing: '0.5px', textTransform: 'uppercase', marginBottom: '3px' }}>{item.year}</div>
                    <div style={{ fontSize: '15px', fontWeight: 700, color: '#0f172a', marginBottom: '4px' }}>{item.title}</div>
                    <div style={{ fontSize: '14px', color: '#64748b', lineHeight: 1.65 }}>{item.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Leadership ── */}
      <section className="inner-section alt" style={{ padding: '80px 0' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '48px' }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', fontSize: '11px', fontWeight: 700, color: '#2145fb', letterSpacing: '0.8px', textTransform: 'uppercase', marginBottom: '16px' }}>
              <div style={{ width: '20px', height: '3px', borderRadius: '999px', background: '#2145fb' }} />
              Leadership
            </div>
            <h2 style={{ fontSize: 'clamp(1.8rem,3vw,2.6rem)', fontWeight: 900, color: '#0b0d20', lineHeight: 1.15, letterSpacing: '-0.6px' }}>The Person Behind Placedly</h2>
          </div>
          <div className="ab-founder-card" style={{ background: '#fff', border: '1px solid #eef0f6', borderRadius: '24px', padding: '48px', boxShadow: '0 2px 8px rgba(0,0,0,.04)', display: 'flex', gap: '48px', alignItems: 'flex-start', maxWidth: '860px', margin: '0 auto' }}>
            <div style={{ width: '180px', height: '220px', borderRadius: '18px', overflow: 'hidden', flexShrink: 0, boxShadow: '0 8px 24px rgba(0,0,0,.10)' }}>
              <img src="/img/at founder part.png" alt="Founder" style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center top' }} />
            </div>
            <div>
              <div style={{ fontSize: '22px', fontWeight: 800, color: '#0b0d20', marginBottom: '4px' }}>Our Founder</div>
              <div style={{ fontSize: '14px', color: '#2145fb', fontWeight: 600, marginBottom: '20px' }}>Founder &amp; CEO, Placedly</div>
              <p style={{ fontSize: '15px', color: '#64748b', lineHeight: 1.75, marginBottom: '24px' }}>
                With a deep background in talent acquisition and career consulting across Delhi NCR&apos;s top MNCs, our founder built Placedly with a frustration-turned-mission: too many talented professionals were being left behind by a system that favoured connections over competence.
              </p>
              <div style={{ background: '#f8faff', borderLeft: '3px solid #2145fb', padding: '16px 20px', borderRadius: '0 12px 12px 0', fontSize: '14px', color: '#374151', fontStyle: 'italic', lineHeight: 1.7 }}>
                &ldquo;Your next job shouldn&apos;t depend on who you know. It should depend on how well we prepare you.&rdquo;
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="inner-section" style={{ padding: '80px 0' }}>
        <div className="container">
          <div className="page-dark-cta" style={{ background: '#0b0d20', borderRadius: '24px', padding: '72px 64px', textAlign: 'center' }}>
            <h2 style={{ fontSize: 'clamp(1.6rem,3vw,2.4rem)', fontWeight: 900, color: '#ffffff', lineHeight: 1.2, letterSpacing: '-0.5px', marginBottom: '12px' }}>Ready to Write Your Success Story?</h2>
            <p style={{ fontSize: '15px', color: 'rgba(255,255,255,.6)', marginBottom: '32px', maxWidth: '480px', margin: '0 auto 32px' }}>Join 300+ professionals who trusted Placedly to transform their career. Zero upfront — you only pay after you&apos;re placed.</p>
            <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
              <a href="/contact" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: '#f97316', color: '#fff', fontWeight: 700, fontSize: '14px', fontFamily: 'Poppins,sans-serif', padding: '14px 32px', borderRadius: '999px', textDecoration: 'none', boxShadow: '0 4px 16px rgba(249,115,22,.35)' }}>
                <Rocket size={15} /> Get Placed Now
              </a>
              <a href="/study-visa" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'transparent', color: '#fff', fontWeight: 500, fontSize: '14px', fontFamily: 'Poppins,sans-serif', padding: '14px 32px', borderRadius: '999px', textDecoration: 'none', border: '1.5px solid rgba(255,255,255,.25)' }}>
                <Plane size={15} /> Study Abroad
              </a>
            </div>
          </div>
        </div>
      </section>
    </PageLayout>
  );
}
