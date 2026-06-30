export const dynamic = 'force-dynamic';

import type { Metadata } from 'next';
import PageLayout from '../components/PageLayout';
import {
  Target, DollarSign, Handshake, Globe2, FileCheck, TrendingUp,
  Rocket, Globe, ArrowRight,
} from 'lucide-react';
import { getCmsMap, parseCmsJson } from '@/lib/cms';

export const metadata: Metadata = {
  title: 'Our Services — Placedly',
  description: 'Two powerful verticals: Career Growth in India (CAP programme) and Study Abroad (140+ universities across UK, France, Germany & Dubai). One growth partner.',
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const ICON_MAP: Record<string, React.ComponentType<any>> = {
  Target, DollarSign, Handshake, Globe2, FileCheck, TrendingUp
};

const DEFAULT_DIFFERENTIATORS = [
  { Icon: Target,      iconBg: '#fff7ed', iconColor: '#f97316', title: 'Domain Specialist',       desc: 'We specialize in BPO, US Healthcare Claims, Insurance Operations, and Finance — not generic careers. Deep domain expertise = better results.' },
  { Icon: DollarSign,  iconBg: '#f0fdf4', iconColor: '#16a34a', title: 'Zero Upfront Model',       desc: 'We invest first — time, expertise, network. You pay only when your career genuinely grows. This is our commitment.' },
  { Icon: Handshake,   iconBg: '#eff6ff', iconColor: '#2145fb', title: 'Direct Employer Access',   desc: 'Your profile reaches hiring managers directly — not portals. We have warm connections at EXL, Quatrro, eBiz, WNS, Optum & more.' },
  { Icon: Globe2,      iconBg: '#faf5ff', iconColor: '#7c3aed', title: 'Global University Network', desc: '140+ universities across UK, France, Germany & Dubai. Dedicated account manager. Application to visa — all handled.' },
  { Icon: FileCheck,   iconBg: '#ecfeff', iconColor: '#0891b2', title: 'Transparent Agreements',   desc: 'Everything in writing. Signed service agreement before we start. No surprises, no hidden terms, ever.' },
  { Icon: TrendingUp,  iconBg: '#f0fdf4', iconColor: '#16a34a', title: 'Proven Results',           desc: '300+ professionals placed. Average 60%+ career growth. Fastest placement in 9 days. Numbers speak for themselves.' },
];

const careerFeatures = ['ATS Resume + LinkedIn Rebuild', '3 Mock Interview Sessions', 'Direct Employer Connect (10–15 companies)', 'Salary Negotiation Support', 'Zero upfront — pay after placement'];
const studyFeatures  = ['University & Course Shortlisting', 'Application Management', 'Dedicated Account Manager', 'Visa Guidance & Documentation', '50,000+ Course Knowledge Base'];

type SvcCmsData = {
  services?: Array<{ id?: string; title?: string; tag?: string; desc?: string; color?: string; features?: string[] }>;
  diff?: Array<{ title?: string; desc?: string }>;
};

export default async function ServicesPage() {
  const cmsMap = await getCmsMap('services:');
  const svcCms = parseCmsJson<SvcCmsData>(cmsMap, 'services:data', {});

  const differentiators = (svcCms.diff && svcCms.diff.length > 0)
    ? svcCms.diff.map((d, i) => {
        const def = DEFAULT_DIFFERENTIATORS[i] ?? DEFAULT_DIFFERENTIATORS[0];
        return { Icon: def.Icon, iconBg: def.iconBg, iconColor: def.iconColor, title: d.title ?? def.title, desc: d.desc ?? def.desc };
      })
    : DEFAULT_DIFFERENTIATORS;


  return (
    <PageLayout>
      {/* ── Hero ── */}
      <section className="page-hero">
        <div className="container">
          <div className="page-hero-inner">
            <nav className="page-hero-breadcrumb">
              <a href="/">Home</a><span>›</span>
              <span style={{ color: 'var(--c-body)' }}>Services</span>
            </nav>
            <div className="page-hero-tag">
              <div className="page-hero-tag-dot" />
              <span>Our Services</span>
            </div>
            <h1 className="page-hero-title">
              Everything You Need<br /><em>to Grow.</em>
            </h1>
            <p className="page-hero-subtitle">
              Two powerful verticals. One growth partner.
            </p>
          </div>
        </div>
      </section>

      {/* ── Two Verticals ── */}
      <section className="inner-section">
        <div className="container">
          <div className="svc-two-col" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px', marginBottom: '80px' }}>

            {/* Career */}
            <div style={{ background: '#0b0d20', borderRadius: '24px', padding: '40px', color: '#fff', display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <div style={{ width: '52px', height: '52px', borderRadius: '14px', background: 'rgba(249,115,22,0.15)', border: '1px solid rgba(249,115,22,0.25)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Rocket size={26} color="#f97316" />
              </div>
              <div>
                <div style={{ fontSize: '11px', fontWeight: 700, color: 'rgba(255,255,255,0.4)', letterSpacing: '0.6px', textTransform: 'uppercase', marginBottom: '8px' }}>Vertical 01</div>
                <div style={{ fontSize: '22px', fontWeight: 800, marginBottom: '12px' }}>Career Growth — India</div>
                <p style={{ fontSize: '15px', color: 'rgba(255,255,255,0.72)', lineHeight: 1.7 }}>
                  Land roles at top MNCs — EXL, Quatrro, eBiz, WNS, Optum &amp; more. Resume transformation, interview mastery, direct employer connect.
                </p>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {careerFeatures.map(item => (
                  <div key={item} style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <div style={{ width: '20px', height: '20px', minWidth: '20px', borderRadius: '50%', background: 'rgba(249,115,22,0.18)', border: '1px solid rgba(249,115,22,0.35)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <ArrowRight size={10} color="#fb923c" strokeWidth={3} />
                    </div>
                    <span style={{ fontSize: '14px', color: 'rgba(255,255,255,0.8)' }}>{item}</span>
                  </div>
                ))}
              </div>
              <a href="/cap" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', padding: '13px 20px', background: '#f97316', color: '#fff', borderRadius: '10px', fontWeight: 700, fontSize: '14px', textDecoration: 'none', fontFamily: "'Poppins',sans-serif", width: 'fit-content', boxShadow: '0 4px 18px rgba(249,115,22,0.35)' }}>
                Explore CAP →
              </a>
            </div>

            {/* Study Abroad */}
            <div style={{ background: '#2145fb', borderRadius: '24px', padding: '40px', color: '#fff', display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <div style={{ width: '52px', height: '52px', borderRadius: '14px', background: 'rgba(255,255,255,0.15)', border: '1px solid rgba(255,255,255,0.25)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Globe size={26} color="#ffffff" />
              </div>
              <div>
                <div style={{ fontSize: '11px', fontWeight: 700, color: 'rgba(255,255,255,0.4)', letterSpacing: '0.6px', textTransform: 'uppercase', marginBottom: '8px' }}>Vertical 02</div>
                <div style={{ fontSize: '22px', fontWeight: 800, marginBottom: '12px' }}>Study Abroad — Go Global</div>
                <p style={{ fontSize: '15px', color: 'rgba(255,255,255,0.72)', lineHeight: 1.7 }}>
                  140+ universities in UK, France, Germany &amp; Dubai. Course shortlisting, applications, visa guidance — end to end.
                </p>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {studyFeatures.map(item => (
                  <div key={item} style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <div style={{ width: '20px', height: '20px', minWidth: '20px', borderRadius: '50%', background: 'rgba(255,255,255,0.15)', border: '1px solid rgba(255,255,255,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <ArrowRight size={10} color="#fff" strokeWidth={3} />
                    </div>
                    <span style={{ fontSize: '14px', color: 'rgba(255,255,255,0.8)' }}>{item}</span>
                  </div>
                ))}
              </div>
              <a href="/study-visa" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', padding: '13px 20px', background: '#fff', color: '#2145fb', borderRadius: '10px', fontWeight: 700, fontSize: '14px', textDecoration: 'none', fontFamily: "'Poppins',sans-serif", width: 'fit-content' }}>
                Study Visa →
              </a>
            </div>
          </div>

          {/* Why Placedly */}
          <div style={{ textAlign: 'center', marginBottom: '48px' }}>
            <div className="section-eyebrow" style={{ justifyContent: 'center' }}>
              <div className="section-eyebrow-bar" />
              Why Placedly
            </div>
            <h2 className="section-heading">What Makes Us <em>Different</em></h2>
          </div>
          <div className="svc-diff-3" style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '20px' }}>
            {differentiators.map(({ Icon, iconBg, iconColor, title, desc }) => (
              <div key={title} style={{ background: '#fff', borderRadius: '16px', padding: '28px', border: '1px solid #eef0f6', boxShadow: '0 1px 4px rgba(0,0,0,.04)' }}>
                <div style={{ width: '44px', height: '44px', borderRadius: '12px', background: iconBg, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '16px' }}>
                  <Icon size={20} color={iconColor} />
                </div>
                <div style={{ fontSize: '15px', fontWeight: 700, color: '#0f172a', marginBottom: '8px' }}>{title}</div>
                <div style={{ fontSize: '14px', color: '#64748b', lineHeight: 1.65 }}>{desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section style={{ background: '#ffffff', padding: '80px 0' }}>
        <div className="container">
          <div className="page-dark-cta" style={{ background: '#0b0d20', borderRadius: '24px', padding: '72px 64px', textAlign: 'center' }}>
            <h2 style={{ fontSize: 'clamp(1.6rem,3vw,2.4rem)', fontWeight: 900, color: '#fff', lineHeight: 1.2, letterSpacing: '-0.5px', marginBottom: '12px' }}>Not Sure Which Service Is Right for You?</h2>
            <p style={{ fontSize: '15px', color: 'rgba(255,255,255,.6)', marginBottom: '32px', maxWidth: '480px', margin: '0 auto 32px' }}>Talk to our team — free consultation, no obligation. We&apos;ll tell you honestly which path makes the most sense for your goals.</p>
            <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
              <a href="/contact" style={{ display: 'inline-flex', alignItems: 'center', background: '#f97316', color: '#fff', fontWeight: 700, fontSize: '14px', fontFamily: 'Poppins,sans-serif', padding: '14px 32px', borderRadius: '999px', textDecoration: 'none', boxShadow: '0 4px 16px rgba(249,115,22,.35)' }}>Get Free Consultation</a>
              <a href="https://wa.me/919876543210" target="_blank" rel="noopener noreferrer" style={{ display: 'inline-flex', alignItems: 'center', background: 'transparent', color: '#fff', fontWeight: 500, fontSize: '14px', fontFamily: 'Poppins,sans-serif', padding: '14px 32px', borderRadius: '999px', textDecoration: 'none', border: '1.5px solid rgba(255,255,255,.25)' }}>WhatsApp Us</a>
            </div>
          </div>
        </div>
      </section>
    </PageLayout>
  );
}
