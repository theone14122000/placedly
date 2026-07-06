'use client';
import { useState, useEffect } from 'react';
import { GraduationCap, FileText, User, CheckCircle2, BookOpen, Bell, Globe, MessageCircle, Zap, DollarSign } from 'lucide-react';
import PageLayout from '../components/PageLayout';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const ICON_MAP: Record<string, React.ComponentType<any>> = {
  GraduationCap, FileText, User, CheckCircle2, BookOpen, Bell, Zap, DollarSign,
};

const DEFAULT_COUNTRIES = [
  { flag: 'https://flagcdn.com/w80/gb.png', name: 'United Kingdom', sub: '140+ Universities' },
  { flag: 'https://flagcdn.com/w80/fr.png', name: 'France', sub: 'Top Business Schools' },
  { flag: 'https://flagcdn.com/w80/de.png', name: 'Germany', sub: 'Low/No Tuition Fees' },
  { flag: 'https://flagcdn.com/w80/ae.png', name: 'Dubai / UAE', sub: 'Global Campus Hubs' },
];

const DEFAULT_FEATURES = [
  { Icon: GraduationCap, color: '#2145fb', bg: '#eff6ff', title: 'University & Course Shortlisting', desc: 'We match your profile, budget & goals to the right programme across 140+ institutions worldwide.' },
  { Icon: FileText,      color: '#f97316', bg: '#fff7ed', title: 'Application Management', desc: 'Upload documents once — apply to multiple universities through a single streamlined process.' },
  { Icon: User,          color: '#16a34a', bg: '#f0fdf4', title: 'Dedicated Account Manager', desc: 'Your personal advisor from first enquiry to confirmed enrolment — always available.' },
  { Icon: CheckCircle2,  color: '#0891b2', bg: '#ecfeff', title: 'Visa Guidance & Documentation', desc: 'Expert support on student visa requirements, documentation, and submission for all 4 destinations.' },
  { Icon: BookOpen,      color: '#7c3aed', bg: '#faf5ff', title: '50,000+ Course Knowledge Base', desc: 'Comprehensive destination info, compliance requirements, scholarships & intake deadlines.' },
  { Icon: Bell,          color: '#ef4444', bg: '#fef2f2', title: 'Real-Time Application Updates', desc: 'Stay informed on your application status, university responses & visa progress at every step.' },
];

const FEAT_COLORS = ['#2145fb','#f97316','#16a34a','#0891b2','#7c3aed','#ef4444'];
const FEAT_BGS    = ['#eff6ff','#fff7ed','#f0fdf4','#ecfeff','#faf5ff','#fef2f2'];

const POINT_ICONS = [Zap, GraduationCap, User, CheckCircle2, DollarSign];

const inputS: React.CSSProperties = {
  display: 'block', width: '100%', padding: '11px 14px',
  border: '1.5px solid #e2e8f0', borderRadius: '10px', fontSize: '14px',
  fontFamily: "'Poppins', sans-serif", color: '#0b0d20',
  outline: 'none', boxShadow: 'none', appearance: 'none' as const,
  WebkitAppearance: 'none' as const, margin: 0, boxSizing: 'border-box' as const,
};

const labelS: React.CSSProperties = {
  display: 'block', fontSize: '11px', fontWeight: 600,
  color: '#374151', letterSpacing: '0.5px', textTransform: 'uppercase' as const,
  marginBottom: '6px', padding: 0, background: 'none', border: 'none', borderRadius: 0, boxShadow: 'none',
};

export default function StudyVisaPage() {
  const [focused, setFocused] = useState('');
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({
    name: '', phone: '', email: '', country: '',
    course: '', qualification: '', intake: '', budget: '', notes: '',
  });

  // CMS state
  const [hero, setHero] = useState({
    tag: 'Study Abroad',
    title: 'Your Global Education Journey Starts Here.',
    subtitle: 'Access to 140+ world-class universities across UK, France, Germany & Dubai — with expert guidance from application to visa.',
    cta1: 'Apply Now',
    cta2: 'WhatsApp Us',
    waHref: 'https://wa.me/919876543210',
  });
  const [dest, setDest]         = useState({ eyebrow: 'Destinations', heading: '4 Countries. Endless Opportunities.' });
  const [countries, setCountries] = useState(DEFAULT_COUNTRIES);
  const [featHeading, setFeatHeading] = useState('What We Handle for You');
  const [features, setFeatures] = useState(DEFAULT_FEATURES);
  const [applyPoints, setApplyPoints] = useState([
    'Response within 24 hours',
    '140+ university options across 4 countries',
    'Dedicated advisor assigned to your profile',
    'End-to-end support from shortlist to visa',
    'Transparent fees — no hidden charges',
  ]);
  const [apply, setApply] = useState({
    eyebrow: 'Apply Now',
    heading: 'Start Your Study Abroad Journey',
    desc: 'Fill in your details — our study abroad advisor will reach out within 24 hours.',
    formTitle: 'Study Abroad Application',
    formSubtitle: "Tell us about your study goals — we'll match you to the right university.",
    submitBtn: 'Submit Study Abroad Application →',
    formNote: 'Our study advisor will contact you within 24 hours. No spam, ever.',
    successTitle: 'Application Received!',
    successSub: 'Our study abroad advisor will contact you within 24 hours to discuss your options.',
    successWaText: 'WhatsApp Us Now',
  });

  useEffect(() => {
    fetch('/api/admin/content?prefix=sv:')
      .then(r => r.json())
      .then((map: Record<string, string>) => {
        try {
          const raw = map['sv:data'];
          if (!raw) return;
          const p = JSON.parse(raw);
          if (p.hero)        setHero(prev => ({ ...prev, ...p.hero }));
          if (p.dest)        setDest(prev => ({ ...prev, ...p.dest }));
          if (p.featHeading) setFeatHeading(p.featHeading);
          if (p.apply)       setApply(prev => ({ ...prev, ...p.apply }));
          if (Array.isArray(p.applyPoints) && p.applyPoints.length) setApplyPoints(p.applyPoints);
          if (Array.isArray(p.countries) && p.countries.length)     setCountries(p.countries);
          if (Array.isArray(p.features) && p.features.length) {
            setFeatures(p.features.map((f: { icon?: string; title?: string; desc?: string }, i: number) => {
              const IconComp = (f.icon && ICON_MAP[f.icon]) ? ICON_MAP[f.icon] : DEFAULT_FEATURES[i % DEFAULT_FEATURES.length].Icon;
              return { Icon: IconComp, color: FEAT_COLORS[i % FEAT_COLORS.length], bg: FEAT_BGS[i % FEAT_BGS.length], title: f.title ?? '', desc: f.desc ?? '' };
            }));
          }
        } catch { /* keep defaults */ }
      })
      .catch(() => {});
  }, []);

  const fi = (n: string): React.CSSProperties => ({
    ...inputS,
    borderColor: focused === n ? '#2145fb' : '#e2e8f0',
    background:  focused === n ? '#ffffff' : '#f8faff',
    boxShadow:   focused === n ? '0 0 0 3px rgba(33,69,251,0.09)' : 'none',
  });

  const handle = (e: React.FormEvent) => { e.preventDefault(); setSent(true); };

  return (
    <PageLayout>
      {/* ── Hero ── */}
      <section className="page-hero">
        <div className="container">
          <div className="page-hero-inner">
            <nav className="page-hero-breadcrumb">
              <a href="/">Home</a><span>›</span>
              <span style={{ color: 'var(--c-body)' }}>Study Visa</span>
            </nav>
            <div className="page-hero-tag">
              <div className="page-hero-tag-dot" />
              <span>{hero.tag}</span>
            </div>
            <h1 className="page-hero-title">{hero.title}</h1>
            <p className="page-hero-subtitle">{hero.subtitle}</p>
            <div className="page-hero-ctas">
              <a href="#apply" className="page-cta-primary" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
                <Globe size={15} /> {hero.cta1}
              </a>
              <a href={hero.waHref} target="_blank" rel="noopener noreferrer" className="page-cta-ghost" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
                <MessageCircle size={15} /> {hero.cta2}
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ── Destinations ── */}
      <section className="inner-section">
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '40px' }}>
            <div className="section-eyebrow" style={{ justifyContent: 'center' }}>
              <div className="section-eyebrow-bar" />
              {dest.eyebrow}
            </div>
            <h2 className="section-heading">{dest.heading}</h2>
          </div>
          <div className="sv-countries-4" style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: '16px', marginBottom: '56px' }}>
            {countries.map(c => (
              <div key={c.name} className="sr-ready" style={{ background: '#f8faff', border: '1px solid #e2e8f0', borderRadius: '16px', padding: '28px 20px', textAlign: 'center' }}>
                <img src={c.flag} alt={c.name} style={{ width: '56px', height: '40px', objectFit: 'cover', borderRadius: '6px', marginBottom: '12px', boxShadow: '0 2px 8px rgba(0,0,0,0.12)' }} />
                <div style={{ fontSize: '15px', fontWeight: 700, color: '#0b0d20', marginBottom: '4px' }}>{c.name}</div>
                <div style={{ fontSize: '13px', color: '#64748b' }}>{c.sub}</div>
              </div>
            ))}
          </div>

          {/* Features */}
          <div style={{ textAlign: 'center', marginBottom: '40px' }}>
            <h2 className="section-heading">{featHeading}</h2>
          </div>
          <div className="inner-grid-3">
            {features.map(f => (
              <div key={f.title} className="value-card sr-ready">
                <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: f.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '12px' }}>
                  <f.Icon size={22} color={f.color} />
                </div>
                <h3 className="value-title">{f.title}</h3>
                <p className="value-desc">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Apply Form ── */}
      <section className="inner-section" id="apply">
        <div className="container">
          <div className="sv-two-col" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '56px', alignItems: 'start' }}>
            {/* Left: info */}
            <div>
              <div className="section-eyebrow">
                <div className="section-eyebrow-bar" />
                {apply.eyebrow}
              </div>
              <h2 className="section-heading">{apply.heading}</h2>
              <p style={{ fontSize: '15px', color: '#64748b', lineHeight: 1.7, marginBottom: '32px' }}>
                {apply.desc}
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {applyPoints.filter(Boolean).map((text, i) => {
                  const PointIcon = POINT_ICONS[i % POINT_ICONS.length];
                  return (
                    <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <div style={{ width: '32px', height: '32px', borderRadius: '8px', background: '#eff6ff', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                        <PointIcon size={15} color="#2145fb" />
                      </div>
                      <span style={{ fontSize: '14px', color: '#374151' }}>{text}</span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Right: form */}
            <div style={{ background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '20px', padding: '36px', boxShadow: '0 8px 40px rgba(0,0,0,0.07)' }}>
              {sent ? (
                <div style={{ textAlign: 'center', padding: '32px 0' }}>
                  <div style={{ width: '64px', height: '64px', borderRadius: '50%', background: '#f0fdf4', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px' }}>
                    <CheckCircle2 size={32} color="#16a34a" />
                  </div>
                  <div style={{ fontSize: '20px', fontWeight: 800, color: '#0b0d20', marginBottom: '8px' }}>{apply.successTitle}</div>
                  <div style={{ fontSize: '14px', color: '#64748b', lineHeight: 1.7, marginBottom: '24px' }}>{apply.successSub}</div>
                  <a href={hero.waHref} target="_blank" rel="noopener noreferrer" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', padding: '12px 20px', background: '#22c55e', color: '#fff', borderRadius: '10px', fontWeight: 600, fontSize: '14px', textDecoration: 'none', fontFamily: "'Poppins',sans-serif" }}>
                    <MessageCircle size={15} /> {apply.successWaText}
                  </a>
                </div>
              ) : (
                <>
                  <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', fontSize: '11px', fontWeight: 700, color: '#2145fb', letterSpacing: '0.5px', textTransform: 'uppercase', marginBottom: '16px' }}>
                    <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#2145fb', display: 'inline-block' }} />
                    <Globe size={12} /> {apply.formTitle}
                  </div>
                  <div style={{ fontSize: '13px', color: '#64748b', marginBottom: '24px' }}>{apply.formSubtitle}</div>

                  <form onSubmit={handle} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                    <div className="sv-form-2col" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
                      <div>
                        <label style={labelS}>Full Name *</label>
                        <input style={fi('name')} required placeholder="Your full name" value={form.name}
                          onFocus={() => setFocused('name')} onBlur={() => setFocused('')}
                          onChange={e => setForm({ ...form, name: e.target.value })} />
                      </div>
                      <div>
                        <label style={labelS}>WhatsApp Number *</label>
                        <input style={fi('phone')} required type="tel" placeholder="+91 XXXXX XXXXX" value={form.phone}
                          onFocus={() => setFocused('phone')} onBlur={() => setFocused('')}
                          onChange={e => setForm({ ...form, phone: e.target.value })} />
                      </div>
                    </div>

                    <div>
                      <label style={labelS}>Email Address *</label>
                      <input style={fi('email')} required type="email" placeholder="your@email.com" value={form.email}
                        onFocus={() => setFocused('email')} onBlur={() => setFocused('')}
                        onChange={e => setForm({ ...form, email: e.target.value })} />
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
                      <div>
                        <label style={labelS}>Preferred Country *</label>
                        <select style={{ ...fi('country'), cursor: 'pointer' }} required value={form.country}
                          onFocus={() => setFocused('country')} onBlur={() => setFocused('')}
                          onChange={e => setForm({ ...form, country: e.target.value })}>
                          <option value="">Select country</option>
                          {countries.map(c => <option key={c.name}>{c.name}</option>)}
                        </select>
                      </div>
                      <div>
                        <label style={labelS}>Highest Qualification</label>
                        <select style={{ ...fi('qual'), cursor: 'pointer' }} value={form.qualification}
                          onFocus={() => setFocused('qual')} onBlur={() => setFocused('')}
                          onChange={e => setForm({ ...form, qualification: e.target.value })}>
                          <option value="">Select</option>
                          <option>High School</option>
                          <option>Diploma</option>
                          <option>Bachelor&apos;s Degree</option>
                          <option>Master&apos;s Degree</option>
                          <option>MBA</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label style={labelS}>Preferred Course / Field *</label>
                      <input style={fi('course')} required placeholder="e.g. MBA, Computer Science, Engineering" value={form.course}
                        onFocus={() => setFocused('course')} onBlur={() => setFocused('')}
                        onChange={e => setForm({ ...form, course: e.target.value })} />
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
                      <div>
                        <label style={labelS}>Intended Intake</label>
                        <select style={{ ...fi('intake'), cursor: 'pointer' }} value={form.intake}
                          onFocus={() => setFocused('intake')} onBlur={() => setFocused('')}
                          onChange={e => setForm({ ...form, intake: e.target.value })}>
                          <option value="">Select</option>
                          <option>Sep 2025</option>
                          <option>Jan 2026</option>
                          <option>Sep 2026</option>
                          <option>Jan 2027</option>
                        </select>
                      </div>
                      <div>
                        <label style={labelS}>Budget (Annual Tuition)</label>
                        <select style={{ ...fi('budget'), cursor: 'pointer' }} value={form.budget}
                          onFocus={() => setFocused('budget')} onBlur={() => setFocused('')}
                          onChange={e => setForm({ ...form, budget: e.target.value })}>
                          <option value="">Select budget range</option>
                          <option>Under £10,000 / year</option>
                          <option>£10,000 – £15,000 / year</option>
                          <option>£15,000 – £25,000 / year</option>
                          <option>£25,000+ / year</option>
                          <option>Flexible / Scholarship Seeking</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label style={labelS}>Any Additional Notes</label>
                      <textarea style={{ ...fi('notes'), resize: 'vertical' as const, minHeight: '80px', paddingTop: '11px' }}
                        placeholder="Tell us anything specific about your goals or requirements…"
                        value={form.notes}
                        onFocus={() => setFocused('notes')} onBlur={() => setFocused('')}
                        onChange={e => setForm({ ...form, notes: e.target.value })} />
                    </div>

                    <button type="submit" style={{
                      width: '100%', padding: '14px',
                      background: 'linear-gradient(135deg,#2145fb,#1a38d4)',
                      color: '#fff', fontWeight: 700, fontSize: '15px',
                      fontFamily: "'Poppins',sans-serif",
                      border: 'none', borderRadius: '10px', cursor: 'pointer',
                      boxShadow: '0 4px 18px rgba(33,69,251,0.28)',
                    }}>
                      {apply.submitBtn}
                    </button>
                    <div style={{ fontSize: '11px', color: '#94a3b8', textAlign: 'center' }}>
                      {apply.formNote}
                    </div>
                  </form>
                </>
              )}
            </div>
          </div>
        </div>
      </section>
    </PageLayout>
  );
}
