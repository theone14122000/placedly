'use client';
import { useState, useEffect } from 'react';
import { Save, Plus, Trash2, Globe } from 'lucide-react';

type Country = { flag: string; name: string; sub: string };
type Feature = { icon: string; title: string; desc: string };

const DEFAULT_COUNTRIES: Country[] = [
  { flag: 'https://flagcdn.com/w80/gb.png', name: 'United Kingdom', sub: '140+ Universities' },
  { flag: 'https://flagcdn.com/w80/fr.png', name: 'France', sub: 'Top Business Schools' },
  { flag: 'https://flagcdn.com/w80/de.png', name: 'Germany', sub: 'Low/No Tuition Fees' },
  { flag: 'https://flagcdn.com/w80/ae.png', name: 'Dubai / UAE', sub: 'Global Campus Hubs' },
];

const DEFAULT_FEATURES: Feature[] = [
  { icon: 'GraduationCap', title: 'University & Course Shortlisting', desc: 'We match your profile, budget & goals to the right programme across 140+ institutions worldwide.' },
  { icon: 'FileText', title: 'Application Management', desc: 'Upload documents once — apply to multiple universities through a single streamlined process.' },
  { icon: 'User', title: 'Dedicated Account Manager', desc: 'Your personal advisor from first enquiry to confirmed enrolment — always available.' },
  { icon: 'CheckCircle2', title: 'Visa Guidance & Documentation', desc: 'Expert support on student visa requirements, documentation, and submission for all 4 destinations.' },
  { icon: 'BookOpen', title: '50,000+ Course Knowledge Base', desc: 'Comprehensive destination info, compliance requirements, scholarships & intake deadlines.' },
  { icon: 'Bell', title: 'Real-Time Application Updates', desc: 'Stay informed on your application status, university responses & visa progress at every step.' },
];

const DEFAULT_APPLY_POINTS = [
  'Response within 24 hours',
  '140+ university options across 4 countries',
  'Dedicated advisor assigned to your profile',
  'End-to-end support from shortlist to visa',
  'Transparent fees — no hidden charges',
];

const inp: React.CSSProperties = {
  width: '100%', padding: '9px 12px', border: '1.5px solid #e2e8f0',
  borderRadius: '8px', fontSize: '13px', fontFamily: "'Poppins',sans-serif",
  color: '#0b0d20', background: '#f8faff', outline: 'none', boxSizing: 'border-box' as const,
};
const lbl: React.CSSProperties = {
  display: 'block', fontSize: '11px', fontWeight: 600, color: '#374151',
  letterSpacing: '0.4px', textTransform: 'uppercase' as const, marginBottom: '5px',
};
const card: React.CSSProperties = {
  background: '#fff', border: '1px solid #e2e8f0', borderRadius: '16px', padding: '24px', marginBottom: '20px',
};
const sectionTitle = (label: string, icon?: React.ReactNode) => (
  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '18px' }}>
    {icon}
    <span style={{ fontSize: '14px', fontWeight: 700, color: '#0b0d20' }}>{label}</span>
  </div>
);

export default function AdminStudyVisaPage() {
  const [hero, setHero] = useState({
    tag: 'Study Abroad',
    title: 'Your Global Education Journey Starts Here.',
    subtitle: 'Access to 140+ world-class universities across UK, France, Germany & Dubai — with expert guidance from application to visa.',
    cta1: 'Apply Now',
    cta2: 'WhatsApp Us',
    waHref: 'https://wa.me/919876543210',
  });
  const [dest, setDest] = useState({ eyebrow: 'Destinations', heading: '4 Countries. Endless Opportunities.' });
  const [countries, setCountries] = useState<Country[]>(DEFAULT_COUNTRIES);
  const [featHeading, setFeatHeading] = useState('What We Handle for You');
  const [features, setFeatures] = useState<Feature[]>(DEFAULT_FEATURES);
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
  const [applyPoints, setApplyPoints] = useState<string[]>(DEFAULT_APPLY_POINTS);
  const [saving, setSaving] = useState(false);
  const [status, setStatus] = useState('');

  useEffect(() => {
    fetch('/api/admin/content?prefix=sv:')
      .then(r => r.json())
      .then((d: Record<string, string>) => {
        if (!d['sv:data']) return;
        const p = JSON.parse(d['sv:data']);
        if (p.hero)        setHero(prev => ({ ...prev, ...p.hero }));
        if (p.dest)        setDest(prev => ({ ...prev, ...p.dest }));
        if (p.countries)   setCountries(p.countries);
        if (p.featHeading) setFeatHeading(p.featHeading);
        if (p.features)    setFeatures(p.features);
        if (p.apply)       setApply(prev => ({ ...prev, ...p.apply }));
        if (p.applyPoints) setApplyPoints(p.applyPoints);
      }).catch(() => {});
  }, []);

  const save = async () => {
    setSaving(true);
    const payload = { 'sv:data': JSON.stringify({ hero, dest, countries, featHeading, features, apply, applyPoints }) };
    const r = await fetch('/api/admin/content', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) });
    setSaving(false);
    setStatus(r.ok ? 'Saved!' : 'Save failed');
    setTimeout(() => setStatus(''), 3000);
  };

  return (
    <div className="adm-page" style={{ padding: '32px', fontFamily: "'Poppins',sans-serif" }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '28px', flexWrap: 'wrap', gap: '12px' }}>
        <div>
          <h1 style={{ fontSize: '22px', fontWeight: 900, color: '#0b0d20', marginBottom: '3px' }}>Study Visa Page</h1>
          <p style={{ fontSize: '13px', color: '#64748b' }}>All content on the Study Abroad page.</p>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          {status && <span style={{ fontSize: '12px', color: status.includes('fail') ? '#ef4444' : '#16a34a', fontWeight: 600 }}>{status}</span>}
          <button onClick={save} disabled={saving} style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '10px 20px', background: '#0b0d20', color: '#fff', border: 'none', borderRadius: '10px', fontSize: '13px', fontWeight: 700, cursor: 'pointer', fontFamily: "'Poppins',sans-serif", opacity: saving ? 0.7 : 1 }}>
            <Save size={14} />{saving ? 'Saving…' : 'Save Changes'}
          </button>
        </div>
      </div>

      {/* Hero */}
      <div style={card}>
        {sectionTitle('🦸 Hero Section', <Globe size={16} color="#2145fb" />)}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
          <div><label style={lbl}>Tag pill</label><input style={inp} value={hero.tag} onChange={e => setHero({ ...hero, tag: e.target.value })} /></div>
          <div><label style={lbl}>Primary CTA text</label><input style={inp} value={hero.cta1} onChange={e => setHero({ ...hero, cta1: e.target.value })} /></div>
          <div style={{ gridColumn: '1/-1' }}><label style={lbl}>Page Title</label><input style={inp} value={hero.title} onChange={e => setHero({ ...hero, title: e.target.value })} /></div>
          <div style={{ gridColumn: '1/-1' }}><label style={lbl}>Subtitle</label><textarea style={{ ...inp, minHeight: '72px', resize: 'vertical' as const }} value={hero.subtitle} onChange={e => setHero({ ...hero, subtitle: e.target.value })} /></div>
          <div><label style={lbl}>WhatsApp CTA text</label><input style={inp} value={hero.cta2} onChange={e => setHero({ ...hero, cta2: e.target.value })} /></div>
          <div><label style={lbl}>WhatsApp link (wa.me/...)</label><input style={inp} value={hero.waHref} onChange={e => setHero({ ...hero, waHref: e.target.value })} /></div>
        </div>
      </div>

      {/* Destinations headings */}
      <div style={card}>
        {sectionTitle('🌍 Destinations Section Headings')}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
          <div><label style={lbl}>Eyebrow</label><input style={inp} value={dest.eyebrow} onChange={e => setDest({ ...dest, eyebrow: e.target.value })} /></div>
          <div><label style={lbl}>Heading</label><input style={inp} value={dest.heading} onChange={e => setDest({ ...dest, heading: e.target.value })} /></div>
        </div>
      </div>

      {/* Countries + Features */}
      <div className="adm-grid-2" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '20px' }}>
        {/* Countries */}
        <div style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: '16px', padding: '24px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '18px' }}>
            <span style={{ fontSize: '14px', fontWeight: 700, color: '#0b0d20' }}>Destination Countries ({countries.length})</span>
            <button onClick={() => setCountries(p => [...p, { flag: '', name: 'New Country', sub: 'Subtitle' }])} style={{ display: 'flex', alignItems: 'center', gap: '5px', padding: '6px 12px', background: '#eff6ff', color: '#2145fb', border: '1.5px solid #bfdbfe', borderRadius: '8px', fontSize: '12px', fontWeight: 600, cursor: 'pointer', fontFamily: "'Poppins',sans-serif" }}>
              <Plus size={12} /> Add
            </button>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {countries.map((c, i) => (
              <div key={i} style={{ border: '1px solid #e2e8f0', borderRadius: '10px', padding: '12px', background: '#f8faff', position: 'relative' }}>
                <button onClick={() => setCountries(p => p.filter((_, idx) => idx !== i))} style={{ position: 'absolute', top: '8px', right: '8px', background: '#fef2f2', border: '1px solid #fecaca', borderRadius: '6px', padding: '3px', cursor: 'pointer', display: 'flex' }}><Trash2 size={11} color="#ef4444" /></button>
                <div style={{ paddingRight: '28px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
                  <div><label style={{ ...lbl, fontSize: '10px' }}>Name</label><input style={{ ...inp, padding: '6px 10px', fontSize: '12px' }} value={c.name} onChange={e => setCountries(p => p.map((x, idx) => idx === i ? { ...x, name: e.target.value } : x))} /></div>
                  <div><label style={{ ...lbl, fontSize: '10px' }}>Sub-label</label><input style={{ ...inp, padding: '6px 10px', fontSize: '12px' }} value={c.sub} onChange={e => setCountries(p => p.map((x, idx) => idx === i ? { ...x, sub: e.target.value } : x))} /></div>
                  <div style={{ gridColumn: '1/-1' }}><label style={{ ...lbl, fontSize: '10px' }}>Flag URL</label><input style={{ ...inp, padding: '6px 10px', fontSize: '12px' }} value={c.flag} onChange={e => setCountries(p => p.map((x, idx) => idx === i ? { ...x, flag: e.target.value } : x))} placeholder="https://flagcdn.com/w80/xx.png" /></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Features */}
        <div style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: '16px', padding: '24px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
            <span style={{ fontSize: '14px', fontWeight: 700, color: '#0b0d20' }}>Features ({features.length})</span>
            <button onClick={() => setFeatures(p => [...p, { icon: 'Star', title: 'New Feature', desc: 'Description' }])} style={{ display: 'flex', alignItems: 'center', gap: '5px', padding: '6px 12px', background: '#eff6ff', color: '#2145fb', border: '1.5px solid #bfdbfe', borderRadius: '8px', fontSize: '12px', fontWeight: 600, cursor: 'pointer', fontFamily: "'Poppins',sans-serif" }}>
              <Plus size={12} /> Add
            </button>
          </div>
          <div style={{ marginBottom: '12px' }}>
            <label style={lbl}>Section Heading</label>
            <input style={inp} value={featHeading} onChange={e => setFeatHeading(e.target.value)} />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {features.map((f, i) => (
              <div key={i} style={{ border: '1px solid #e2e8f0', borderRadius: '10px', padding: '12px', background: '#f8faff', position: 'relative' }}>
                <button onClick={() => setFeatures(p => p.filter((_, idx) => idx !== i))} style={{ position: 'absolute', top: '8px', right: '8px', background: '#fef2f2', border: '1px solid #fecaca', borderRadius: '6px', padding: '3px', cursor: 'pointer', display: 'flex' }}><Trash2 size={11} color="#ef4444" /></button>
                <div style={{ paddingRight: '28px' }}>
                  <div style={{ marginBottom: '6px' }}><label style={{ ...lbl, fontSize: '10px' }}>Title</label><input style={{ ...inp, padding: '6px 10px', fontSize: '12px' }} value={f.title} onChange={e => setFeatures(p => p.map((x, idx) => idx === i ? { ...x, title: e.target.value } : x))} /></div>
                  <div><label style={{ ...lbl, fontSize: '10px' }}>Description</label><textarea style={{ ...inp, padding: '6px 10px', fontSize: '12px', minHeight: '52px', resize: 'vertical' as const }} value={f.desc} onChange={e => setFeatures(p => p.map((x, idx) => idx === i ? { ...x, desc: e.target.value } : x))} /></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Apply Section */}
      <div style={card}>
        {sectionTitle('📋 Apply Section')}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px', marginBottom: '14px' }}>
          <div><label style={lbl}>Eyebrow</label><input style={inp} value={apply.eyebrow} onChange={e => setApply({ ...apply, eyebrow: e.target.value })} /></div>
          <div><label style={lbl}>Heading</label><input style={inp} value={apply.heading} onChange={e => setApply({ ...apply, heading: e.target.value })} /></div>
          <div style={{ gridColumn: '1/-1' }}><label style={lbl}>Description</label><textarea style={{ ...inp, minHeight: '60px', resize: 'vertical' as const }} value={apply.desc} onChange={e => setApply({ ...apply, desc: e.target.value })} /></div>
        </div>
        <div style={{ marginBottom: '14px' }}>
          <label style={lbl}>Bullet points (one per line)</label>
          <textarea style={{ ...inp, minHeight: '110px', resize: 'vertical' as const }} value={applyPoints.join('\n')} onChange={e => setApplyPoints(e.target.value.split('\n'))} />
        </div>
      </div>

      {/* Form content */}
      <div style={card}>
        {sectionTitle('📝 Application Form Content')}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
          <div><label style={lbl}>Form eyebrow title</label><input style={inp} value={apply.formTitle} onChange={e => setApply({ ...apply, formTitle: e.target.value })} /></div>
          <div><label style={lbl}>Submit button text</label><input style={inp} value={apply.submitBtn} onChange={e => setApply({ ...apply, submitBtn: e.target.value })} /></div>
          <div style={{ gridColumn: '1/-1' }}><label style={lbl}>Form subtitle</label><input style={inp} value={apply.formSubtitle} onChange={e => setApply({ ...apply, formSubtitle: e.target.value })} /></div>
          <div style={{ gridColumn: '1/-1' }}><label style={lbl}>Below-form note</label><input style={inp} value={apply.formNote} onChange={e => setApply({ ...apply, formNote: e.target.value })} /></div>
        </div>
      </div>

      {/* Success state */}
      <div style={card}>
        {sectionTitle('✅ Success State (after form submit)')}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
          <div><label style={lbl}>Success title</label><input style={inp} value={apply.successTitle} onChange={e => setApply({ ...apply, successTitle: e.target.value })} /></div>
          <div><label style={lbl}>WhatsApp button text</label><input style={inp} value={apply.successWaText} onChange={e => setApply({ ...apply, successWaText: e.target.value })} /></div>
          <div style={{ gridColumn: '1/-1' }}><label style={lbl}>Success sub-text</label><textarea style={{ ...inp, minHeight: '60px', resize: 'vertical' as const }} value={apply.successSub} onChange={e => setApply({ ...apply, successSub: e.target.value })} /></div>
        </div>
      </div>
    </div>
  );
}
