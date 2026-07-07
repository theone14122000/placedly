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
  { Icon: GraduationCap, title: 'University & Course Shortlisting', desc: 'We match your profile, budget & goals to the right programme across 140+ institutions worldwide.' },
  { Icon: FileText,      title: 'Application Management', desc: 'Upload documents once — apply to multiple universities through a single streamlined process.' },
  { Icon: User,          title: 'Dedicated Account Manager', desc: 'Your personal advisor from first enquiry to confirmed enrolment — always available.' },
  { Icon: CheckCircle2,  title: 'Visa Guidance & Documentation', desc: 'Expert support on student visa requirements, documentation, and submission for all 4 destinations.' },
  { Icon: BookOpen,      title: '50,000+ Course Knowledge Base', desc: 'Comprehensive destination info, compliance requirements, scholarships & intake deadlines.' },
  { Icon: Bell,          title: 'Real-Time Application Updates', desc: 'Stay informed on your application status, university responses & visa progress at every step.' },
];

const POINT_ICONS = [Zap, GraduationCap, User, CheckCircle2, DollarSign];

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
    submitBtn: 'Submit Study Abroad Application',
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
              return { Icon: IconComp, title: f.title ?? '', desc: f.desc ?? '' };
            }));
          }
        } catch { /* keep defaults */ }
      })
      .catch(() => {});
  }, []);

  const handle = (e: React.FormEvent) => { e.preventDefault(); setSent(true); };

  const inputCls = (n: string) => `sv-input${focused === n ? ' is-focused' : ''}`;

  return (
    <PageLayout>
      {/* ── Hero ── */}
      <section className="sv-hero">
        <div className="sv-container">
          <nav className="sv-breadcrumb">
            <a href="/">Home</a><span aria-hidden>›</span>
            <span className="is-current">Study Visa</span>
          </nav>
          <div className="sv-hero-tag">
            <span className="sv-hero-tag-dot" />
            <span>{hero.tag}</span>
          </div>
          <h1 className="sv-hero-title">{hero.title}</h1>
          <p className="sv-hero-subtitle">{hero.subtitle}</p>
          <div className="sv-hero-ctas">
            <a href="#apply" className="sv-cta-primary">
              <Globe size={15} /> {hero.cta1}
            </a>
            <a href={hero.waHref} target="_blank" rel="noopener noreferrer" className="sv-cta-ghost">
              <MessageCircle size={15} /> {hero.cta2}
            </a>
          </div>
        </div>
      </section>

      {/* ── Destinations ── */}
      <section className="sv-section">
        <div className="sv-container">
          <div className="sv-section-head">
            <div className="sv-eyebrow">
              <span className="sv-eyebrow-bar" />
              {dest.eyebrow}
            </div>
            <h2 className="sv-heading">{dest.heading}</h2>
          </div>

          <div className="sv-countries-grid">
            {countries.map(c => (
              <div key={c.name} className="sv-country-card">
                <img src={c.flag} alt={c.name} className="sv-country-flag" />
                <div className="sv-country-name">{c.name}</div>
                <div className="sv-country-sub">{c.sub}</div>
              </div>
            ))}
          </div>

          {/* Features */}
          <div className="sv-section-head">
            <h2 className="sv-heading">{featHeading}</h2>
          </div>
          <div className="sv-features-grid">
            {features.map(f => (
              <div key={f.title} className="sv-feature-card">
                <div className="sv-feature-icon">
                  <f.Icon size={22} />
                </div>
                <h3 className="sv-feature-title">{f.title}</h3>
                <p className="sv-feature-desc">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Apply Form ── */}
      <section className="sv-section" id="apply">
        <div className="sv-container">
          <div className="sv-apply-grid">
            {/* Left: info */}
            <div>
              <div className="sv-eyebrow">
                <span className="sv-eyebrow-bar" />
                {apply.eyebrow}
              </div>
              <h2 className="sv-heading">{apply.heading}</h2>
              <p className="sv-apply-desc">{apply.desc}</p>
              <div className="sv-apply-points">
                {applyPoints.filter(Boolean).map((text, i) => {
                  const PointIcon = POINT_ICONS[i % POINT_ICONS.length];
                  return (
                    <div key={i} className="sv-apply-point">
                      <div className="sv-apply-point-icon">
                        <PointIcon size={15} />
                      </div>
                      <span>{text}</span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Right: form */}
            <div className="sv-form-card">
              {sent ? (
                <div className="sv-success">
                  <div className="sv-success-icon">
                    <CheckCircle2 size={32} />
                  </div>
                  <div className="sv-success-title">{apply.successTitle}</div>
                  <div className="sv-success-sub">{apply.successSub}</div>
                  <a href={hero.waHref} target="_blank" rel="noopener noreferrer" className="sv-success-wa">
                    <MessageCircle size={15} /> {apply.successWaText}
                  </a>
                </div>
              ) : (
                <>
                  <div className="sv-form-tag">
                    <span className="sv-form-tag-dot" />
                    <Globe size={12} /> {apply.formTitle}
                  </div>
                  <div className="sv-form-subtitle">{apply.formSubtitle}</div>

                  <form onSubmit={handle} className="sv-form">
                    <div className="sv-form-row">
                      <div className="sv-field">
                        <label className="sv-label">Full Name *</label>
                        <input className={inputCls('name')} required placeholder="Your full name" value={form.name}
                          onFocus={() => setFocused('name')} onBlur={() => setFocused('')}
                          onChange={e => setForm({ ...form, name: e.target.value })} />
                      </div>
                      <div className="sv-field">
                        <label className="sv-label">WhatsApp Number *</label>
                        <input className={inputCls('phone')} required type="tel" placeholder="+91 XXXXX XXXXX" value={form.phone}
                          onFocus={() => setFocused('phone')} onBlur={() => setFocused('')}
                          onChange={e => setForm({ ...form, phone: e.target.value })} />
                      </div>
                    </div>

                    <div className="sv-field">
                      <label className="sv-label">Email Address *</label>
                      <input className={inputCls('email')} required type="email" placeholder="your@email.com" value={form.email}
                        onFocus={() => setFocused('email')} onBlur={() => setFocused('')}
                        onChange={e => setForm({ ...form, email: e.target.value })} />
                    </div>

                    <div className="sv-form-row">
                      <div className="sv-field">
                        <label className="sv-label">Preferred Country *</label>
                        <select className={`${inputCls('country')} sv-select`} required value={form.country}
                          onFocus={() => setFocused('country')} onBlur={() => setFocused('')}
                          onChange={e => setForm({ ...form, country: e.target.value })}>
                          <option value="">Select country</option>
                          {countries.map(c => <option key={c.name}>{c.name}</option>)}
                        </select>
                      </div>
                      <div className="sv-field">
                        <label className="sv-label">Highest Qualification</label>
                        <select className={`${inputCls('qual')} sv-select`} value={form.qualification}
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

                    <div className="sv-field">
                      <label className="sv-label">Preferred Course / Field *</label>
                      <input className={inputCls('course')} required placeholder="e.g. MBA, Computer Science, Engineering" value={form.course}
                        onFocus={() => setFocused('course')} onBlur={() => setFocused('')}
                        onChange={e => setForm({ ...form, course: e.target.value })} />
                    </div>

                    <div className="sv-form-row">
                      <div className="sv-field">
                        <label className="sv-label">Intended Intake</label>
                        <select className={`${inputCls('intake')} sv-select`} value={form.intake}
                          onFocus={() => setFocused('intake')} onBlur={() => setFocused('')}
                          onChange={e => setForm({ ...form, intake: e.target.value })}>
                          <option value="">Select</option>
                          <option>Sep 2025</option>
                          <option>Jan 2026</option>
                          <option>Sep 2026</option>
                          <option>Jan 2027</option>
                        </select>
                      </div>
                      <div className="sv-field">
                        <label className="sv-label">Budget (Annual Tuition)</label>
                        <select className={`${inputCls('budget')} sv-select`} value={form.budget}
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

                    <div className="sv-field">
                      <label className="sv-label">Any Additional Notes</label>
                      <textarea className={`${inputCls('notes')} sv-textarea`}
                        placeholder="Tell us anything specific about your goals or requirements…"
                        value={form.notes}
                        onFocus={() => setFocused('notes')} onBlur={() => setFocused('')}
                        onChange={e => setForm({ ...form, notes: e.target.value })} />
                    </div>

                    <button type="submit" className="sv-submit-btn">
                      {apply.submitBtn}
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" />
                      </svg>
                    </button>
                    <div className="sv-form-note">{apply.formNote}</div>
                  </form>
                </>
              )}
            </div>
          </div>
        </div>
      </section>

      <style>{`
        /* ═══════════════════════════════════════
           BASE / RESET
        ═══════════════════════════════════════ */
        .sv-hero, .sv-hero *,
        .sv-section, .sv-section * {
          font-family: "Inter","Manrope","Plus Jakarta Sans",-apple-system,BlinkMacSystemFont,"Segoe UI",system-ui,sans-serif !important;
          box-sizing: border-box;
        }
        .sv-container {
          max-width: 1180px;
          margin: 0 auto;
          padding: 0 16px;
        }

        /* ═══════════════════════════════════════
           HERO
        ═══════════════════════════════════════ */
        .sv-hero {
          background: #ffffff;
          padding: 96px 0 48px;
        }
        .sv-breadcrumb {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 12.5px;
          font-weight: 500;
          color: #737373;
          margin-bottom: 20px;
          flex-wrap: wrap;
        }
        .sv-breadcrumb a {
          color: #737373;
          text-decoration: none;
          transition: color 0.2s ease;
        }
        .sv-breadcrumb a:hover { color: #f97316; }
        .sv-breadcrumb .is-current { color: #000000; font-weight: 700; }

        .sv-hero-tag {
          display: inline-flex;
          align-items: center;
          gap: 7px;
          padding: 6px 14px;
          background: rgba(249,115,22,0.08);
          border: 1px solid rgba(249,115,22,0.30);
          border-radius: 999px;
          font-size: 12px;
          font-weight: 700;
          color: #ea580c;
          margin-bottom: 18px;
        }
        .sv-hero-tag-dot {
          width: 6px; height: 6px;
          border-radius: 50%;
          background: #f97316;
        }

        .sv-hero-title {
          font-size: 30px;
          font-weight: 900;
          color: #000000;
          line-height: 1.15;
          letter-spacing: -0.02em;
          margin: 0 0 16px;
        }
        .sv-hero-subtitle {
          font-size: 14.5px;
          color: #404040;
          line-height: 1.65;
          max-width: 620px;
          margin: 0 0 28px;
        }
        .sv-hero-ctas {
          display: flex;
          flex-wrap: wrap;
          gap: 12px;
        }
        .sv-cta-primary {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 13px 24px;
          background: linear-gradient(135deg, #f97316 0%, #ea580c 100%);
          color: #ffffff;
          font-weight: 700;
          font-size: 14px;
          border-radius: 999px;
          text-decoration: none;
          box-shadow: 0 4px 14px rgba(249,115,22,0.28);
          transition: transform 0.2s ease, box-shadow 0.2s ease, filter 0.2s ease;
        }
        .sv-cta-primary:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 20px rgba(249,115,22,0.38);
          filter: brightness(1.05);
        }
        .sv-cta-ghost {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 13px 24px;
          background: #ffffff;
          color: #000000;
          font-weight: 700;
          font-size: 14px;
          border: 1.5px solid rgba(0,0,0,0.14);
          border-radius: 999px;
          text-decoration: none;
          transition: border-color 0.2s ease, background 0.2s ease;
        }
        .sv-cta-ghost:hover {
          border-color: rgba(249,115,22,0.40);
          background: rgba(249,115,22,0.06);
        }

        /* ═══════════════════════════════════════
           SECTION HEAD
        ═══════════════════════════════════════ */
        .sv-section { background: #ffffff; padding: 40px 0; }
        .sv-section-head { text-align: center; margin-bottom: 32px; }
        .sv-eyebrow {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          font-size: 12px;
          font-weight: 700;
          color: #ea580c;
          text-transform: uppercase;
          letter-spacing: 0.08em;
          margin-bottom: 10px;
        }
        .sv-eyebrow-bar {
          width: 18px; height: 2px;
          background: #f97316;
          border-radius: 2px;
        }
        .sv-heading {
          font-size: 24px;
          font-weight: 800;
          color: #000000;
          letter-spacing: -0.02em;
          line-height: 1.25;
          margin: 0;
        }

        /* ═══════════════════════════════════════
           COUNTRIES GRID  (mobile-first)
        ═══════════════════════════════════════ */
        .sv-countries-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 12px;
          margin-bottom: 48px;
        }
        .sv-country-card {
          background: #ffffff;
          border: 1.5px solid rgba(0,0,0,0.10);
          border-radius: 16px;
          padding: 20px 14px;
          text-align: center;
          transition: border-color 0.2s ease, box-shadow 0.2s ease, transform 0.2s ease;
        }
        .sv-country-card:hover {
          border-color: rgba(249,115,22,0.35);
          box-shadow: 0 10px 24px rgba(249,115,22,0.10);
          transform: translateY(-2px);
        }
        .sv-country-flag {
          width: 48px; height: 34px;
          object-fit: cover;
          border-radius: 6px;
          margin-bottom: 10px;
          box-shadow: 0 2px 8px rgba(0,0,0,0.12);
        }
        .sv-country-name {
          font-size: 13.5px;
          font-weight: 700;
          color: #000000;
          margin-bottom: 3px;
        }
        .sv-country-sub {
          font-size: 11.5px;
          color: #737373;
        }

        /* ═══════════════════════════════════════
           FEATURES GRID  (mobile-first)
        ═══════════════════════════════════════ */
        .sv-features-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 16px;
        }
        .sv-feature-card {
          background: #ffffff;
          border: 1.5px solid rgba(0,0,0,0.10);
          border-radius: 16px;
          padding: 22px;
          transition: border-color 0.2s ease, box-shadow 0.2s ease, transform 0.2s ease;
        }
        .sv-feature-card:hover {
          border-color: rgba(249,115,22,0.35);
          box-shadow: 0 10px 24px rgba(249,115,22,0.10);
          transform: translateY(-2px);
        }
        .sv-feature-icon {
          width: 44px; height: 44px;
          border-radius: 12px;
          background: rgba(249,115,22,0.08);
          border: 1px solid rgba(249,115,22,0.20);
          color: #ea580c;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 14px;
        }
        .sv-feature-title {
          font-size: 15.5px;
          font-weight: 800;
          color: #000000;
          margin: 0 0 8px;
          letter-spacing: -0.01em;
        }
        .sv-feature-desc {
          font-size: 13.5px;
          color: #404040;
          line-height: 1.6;
          margin: 0;
        }

        /* ═══════════════════════════════════════
           APPLY GRID  (mobile-first)
        ═══════════════════════════════════════ */
        .sv-apply-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 40px;
          align-items: start;
        }
        .sv-apply-desc {
          font-size: 14px;
          color: #404040;
          line-height: 1.7;
          margin: 0 0 24px;
        }
        .sv-apply-points {
          display: flex;
          flex-direction: column;
          gap: 14px;
        }
        .sv-apply-point {
          display: flex;
          align-items: center;
          gap: 12px;
        }
        .sv-apply-point-icon {
          width: 30px; height: 30px;
          border-radius: 8px;
          background: rgba(249,115,22,0.08);
          border: 1px solid rgba(249,115,22,0.20);
          color: #ea580c;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }
        .sv-apply-point span {
          font-size: 13.5px;
          color: #000000;
          font-weight: 500;
        }

        /* ═══════════════════════════════════════
           FORM CARD
        ═══════════════════════════════════════ */
        .sv-form-card {
          background: #ffffff;
          border: 1.5px solid rgba(0,0,0,0.10);
          border-radius: 20px;
          padding: 24px 20px;
          box-shadow: 0 8px 32px rgba(0,0,0,0.06);
        }
        .sv-form-tag {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          font-size: 11px;
          font-weight: 700;
          color: #ea580c;
          letter-spacing: 0.05em;
          text-transform: uppercase;
          margin-bottom: 14px;
        }
        .sv-form-tag-dot {
          width: 6px; height: 6px;
          border-radius: 50%;
          background: #f97316;
        }
        .sv-form-subtitle {
          font-size: 12.5px;
          color: #737373;
          margin-bottom: 22px;
        }

        .sv-form { display: flex; flex-direction: column; gap: 14px; }
        .sv-form-row {
          display: grid;
          grid-template-columns: 1fr;
          gap: 14px;
        }
        .sv-field { display: flex; flex-direction: column; }
        .sv-label {
          font-size: 10.5px;
          font-weight: 700;
          color: #000000;
          letter-spacing: 0.04em;
          text-transform: uppercase;
          margin-bottom: 6px;
        }
        .sv-input {
          display: block;
          width: 100%;
          padding: 11px 14px;
          border: 1.5px solid rgba(0,0,0,0.12);
          border-radius: 10px;
          font-size: 13.5px;
          color: #000000;
          background: #fafafa;
          outline: none;
          appearance: none;
          -webkit-appearance: none;
          transition: border-color 0.2s ease, background 0.2s ease, box-shadow 0.2s ease;
        }
        .sv-input::placeholder { color: #a3a3a3; }
        .sv-input.is-focused {
          border-color: #f97316;
          background: #ffffff;
          box-shadow: 0 0 0 3px rgba(249,115,22,0.12);
        }
        .sv-select { cursor: pointer; }
        .sv-textarea {
          resize: vertical;
          min-height: 80px;
          padding-top: 11px;
        }

        .sv-submit-btn {
          width: 100%;
          padding: 14px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          background: linear-gradient(135deg, #f97316 0%, #ea580c 100%);
          color: #ffffff;
          font-weight: 700;
          font-size: 14px;
          border: none;
          border-radius: 10px;
          cursor: pointer;
          box-shadow: 0 4px 18px rgba(249,115,22,0.28);
          transition: transform 0.2s ease, box-shadow 0.2s ease, filter 0.2s ease;
        }
        .sv-submit-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 22px rgba(249,115,22,0.36);
          filter: brightness(1.05);
        }
        .sv-submit-btn:active {
          transform: translateY(0);
          filter: brightness(0.95);
        }
        .sv-form-note {
          font-size: 11px;
          color: #a3a3a3;
          text-align: center;
        }

        /* ═══════════════════════════════════════
           SUCCESS STATE
        ═══════════════════════════════════════ */
        .sv-success { text-align: center; padding: 24px 0; }
        .sv-success-icon {
          width: 60px; height: 60px;
          border-radius: 50%;
          background: rgba(249,115,22,0.08);
          border: 1px solid rgba(249,115,22,0.25);
          color: #ea580c;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto 16px;
        }
        .sv-success-title {
          font-size: 18px;
          font-weight: 800;
          color: #000000;
          margin-bottom: 8px;
        }
        .sv-success-sub {
          font-size: 13.5px;
          color: #404040;
          line-height: 1.65;
          margin-bottom: 22px;
        }
        .sv-success-wa {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 12px 22px;
          background: linear-gradient(135deg, #f97316 0%, #ea580c 100%);
          color: #ffffff;
          border-radius: 10px;
          font-weight: 700;
          font-size: 13.5px;
          text-decoration: none;
          box-shadow: 0 4px 14px rgba(249,115,22,0.28);
          transition: transform 0.2s ease, filter 0.2s ease;
        }
        .sv-success-wa:hover {
          transform: translateY(-2px);
          filter: brightness(1.05);
        }

        /* ═══════════════════════════════════════
           RESPONSIVE — mobile-first, scale UP
        ═══════════════════════════════════════ */
        @media (min-width: 480px) {
          .sv-hero-title { font-size: 34px; }
        }

        @media (min-width: 640px) {
          .sv-hero { padding: 104px 0 56px; }
          .sv-container { padding: 0 24px; }
          .sv-hero-title { font-size: clamp(2rem, 4vw, 2.8rem); }
          .sv-hero-subtitle { font-size: 15px; }
          .sv-section { padding: 56px 0; }
          .sv-heading { font-size: 28px; }
          .sv-countries-grid { grid-template-columns: repeat(4, 1fr); gap: 16px; }
          .sv-features-grid { grid-template-columns: 1fr 1fr; }
          .sv-form-row { grid-template-columns: 1fr 1fr; }
          .sv-form-card { padding: 32px; }
        }

        @media (min-width: 960px) {
          .sv-features-grid { grid-template-columns: 1fr 1fr 1fr; }
          .sv-apply-grid { grid-template-columns: 1fr 1fr; gap: 56px; }
          .sv-form-card { padding: 36px; }
        }
      `}</style>
    </PageLayout>
  );
}