'use client';
import { useState, useEffect } from 'react';
import { MessageCircle, Mail, MapPin, Clock, Shield, CheckCircle2 } from 'lucide-react';
import PageLayout from '../components/PageLayout';

const CT_DEFAULTS: Record<string, string> = {
  'ct:heroTag':      'Get In Touch',
  'ct:heroTitle':    "Let's Build Your Next Chapter Together.",
  'ct:heroSubtitle': 'Looking for a job in India or planning to study abroad? Free consultation — no obligation.',
  'ct:heroPrimary':  'WhatsApp Now',
  'ct:heroWaHref':   'https://wa.me/919910116901',
  'ct:heroSecondary':'Fill the Form ↓',
  'ct:formTitle':    'Tell Us About Your Goals',
  'ct:formSubtitle': 'Free consultation — personalised plan, no obligation.',
  'ct:formSubmitBtn':"Send Message — It's Free",
  'ct:formFooter':   'Zero spam. We only contact you about your query.',
  'ct:successTitle': 'Message Received!',
  'ct:successSub':   "We'll reach out within 24 hours. For faster help, WhatsApp us.",
  'ct:services':     'Career Placement (India),Study Abroad,CV & Resume Writing,Interview Coaching,LinkedIn Optimisation,Career Assessment,Other',
  'ct:waPhone':      '+91 99101 16901',
  'ct:waHref':       'https://wa.me/919910116901',
  'ct:waNote':       'Usually replies in < 1 hour',
  'ct:email':        'hello@placedly.in',
  'ct:emailNote':    'We reply within 24 hours',
  'ct:office':       'Delhi NCR, India',
  'ct:officeNote':   'Serving Pan-India & Global',
  'ct:hours':        'Mon – Sat: 9 AM – 7 PM',
  'ct:hoursNote':    'Sunday: By appointment',
  'ct:promise':      "Free consultation. No obligation. If we can't help you, we'll say so honestly. No hard sell, ever.",
  'ct:faqSectionTitle': 'Frequently Asked Questions',
  'ct:faq1Q': 'How does the payment model work?',
  'ct:faq1A': "Initial consultation is free. For CAP, we charge a 12% Career Assistance Fee based on your annual CTC — but only after your offer letter is in hand. Nothing upfront, nothing during the process.",
  'ct:faq2Q': 'How long does placement typically take?',
  'ct:faq2A': 'Most candidates get their first interview call within 1–2 weeks. Typical placement timeline is 4–6 weeks depending on target role and industry.',
  'ct:faq3Q': 'Do you help freshers as well as experienced professionals?',
  'ct:faq3A': 'Absolutely. We work with candidates at every level — freshers, mid-career professionals, and senior executives. Each gets a personalised roadmap.',
  'ct:faq4Q': 'What industries do you cover?',
  'ct:faq4A': 'Technology, Finance & Banking, Healthcare & Pharma, Marketing, Engineering, Sales, Design, and Operations — across top MNCs in India and globally.',
};

export default function ContactPage() {
  const [cms, setCms] = useState(CT_DEFAULTS);
  const [sent, setSent] = useState(false);
  const [focused, setFocused] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', phone: '', service: '', message: '' });

  useEffect(() => {
    fetch('/api/admin/content?prefix=ct:')
      .then(r => r.json())
      .then((saved: Record<string,string>) => setCms({ ...CT_DEFAULTS, ...saved }))
      .catch(() => {});
  }, []);

  const g = (k: string) => cms[k] ?? CT_DEFAULTS[k] ?? '';

  const services = g('ct:services').split(',').map(s => s.trim()).filter(Boolean);
  const faqs = [1,2,3,4].map(i => ({ q: g(`ct:faq${i}Q`), a: g(`ct:faq${i}A`) })).filter(f => f.q);

  const contactItems = [
    { Icon: MessageCircle, iconColor: '#16a34a', bg: '#f0fdf4', border: '#bbf7d0', label: 'WhatsApp', line1: g('ct:waPhone'),  href: g('ct:waHref'),              line2: g('ct:waNote') },
    { Icon: Mail,          iconColor: '#2145fb', bg: '#eff6ff', border: '#dbeafe', label: 'Email',    line1: g('ct:email'),   href: `mailto:${g('ct:email')}`,    line2: g('ct:emailNote') },
    { Icon: MapPin,        iconColor: '#f97316', bg: '#fff7ed', border: '#fed7aa', label: 'Office',   line1: g('ct:office'),  href: null,                          line2: g('ct:officeNote') },
    { Icon: Clock,         iconColor: '#7c3aed', bg: '#faf5ff', border: '#e9d5ff', label: 'Hours',    line1: g('ct:hours'),   href: null,                          line2: g('ct:hoursNote') },
  ];

  const handle = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setTimeout(() => { setSent(true); setSubmitting(false); }, 600);
  };

  const inp = (name: string): React.CSSProperties => ({
    display: 'block', width: '100%', padding: '11px 14px',
    border: `1.5px solid ${focused === name ? '#2145fb' : '#e2e8f0'}`,
    borderRadius: '10px', fontSize: '14px', fontFamily: "'Poppins', sans-serif",
    color: '#0b0d20', background: focused === name ? '#fff' : '#f8faff',
    outline: 'none', boxShadow: focused === name ? '0 0 0 3px rgba(33,69,251,0.09)' : 'none',
    boxSizing: 'border-box', transition: 'border-color .15s, box-shadow .15s',
  } as React.CSSProperties);

  return (
    <PageLayout>
      <style>{`
        .ct-layout { display: grid; grid-template-columns: 1fr 340px; gap: 32px; align-items: start; }
        .ct-row2 { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
        .ct-faq { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; max-width: 900px; margin: 0 auto; }
        @media (max-width: 820px) {
          .ct-layout { grid-template-columns: 1fr; }
          .ct-row2 { grid-template-columns: 1fr; }
          .ct-faq { grid-template-columns: 1fr; }
        }
      `}</style>

      {/* Hero */}
      <section className="page-hero" style={{ background: '#fff' }}>
        <div className="container">
          <div className="page-hero-inner">
            <nav className="page-hero-breadcrumb">
              <a href="/">Home</a><span>›</span>
              <span style={{ color: 'var(--c-body)' }}>Contact</span>
            </nav>
            <div className="page-hero-tag">
              <div className="page-hero-tag-dot" />
              <span>{g('ct:heroTag')}</span>
            </div>
            <h1 className="page-hero-title">
              {g('ct:heroTitle').includes('Next Chapter')
                ? <>{g('ct:heroTitle').split('Next Chapter')[0]}<em>Next Chapter{g('ct:heroTitle').split('Next Chapter')[1]}</em></>
                : g('ct:heroTitle')
              }
            </h1>
            <p className="page-hero-subtitle">{g('ct:heroSubtitle')}</p>
            <div className="page-hero-ctas">
              <a href={g('ct:heroWaHref')} target="_blank" rel="noopener noreferrer" className="page-cta-primary" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
                <MessageCircle size={15} /> {g('ct:heroPrimary')}
              </a>
              <a href="#contact-form" className="page-cta-ghost">{g('ct:heroSecondary')}</a>
            </div>
          </div>
        </div>
      </section>

      {/* Form + sidebar */}
      <section style={{ background: '#f8faff', padding: '64px 0' }} id="contact-form">
        <div className="container">
          <div className="ct-layout">
            <div style={{ background: '#fff', borderRadius: '20px', border: '1px solid #e8edf5', boxShadow: '0 4px 24px rgba(0,0,0,0.07)', overflow: 'hidden' }}>
              {sent ? (
                <div style={{ padding: '64px 40px', textAlign: 'center' }}>
                  <CheckCircle2 size={48} color="#16a34a" style={{ marginBottom: '16px' }} />
                  <div style={{ fontSize: '22px', fontWeight: 800, color: '#0b0d20', marginBottom: '8px' }}>{g('ct:successTitle')}</div>
                  <div style={{ color: '#64748b', fontSize: '14px', lineHeight: 1.7, marginBottom: '24px' }}>{g('ct:successSub')}</div>
                  <a href={g('ct:waHref')} target="_blank" rel="noopener noreferrer"
                    style={{ display: 'inline-block', background: '#25D366', color: '#fff', fontWeight: 700, fontSize: '14px', padding: '12px 28px', borderRadius: '10px', textDecoration: 'none' }}>
                    {g('ct:heroPrimary')}
                  </a>
                </div>
              ) : (
                <div style={{ padding: '36px' }}>
                  <div style={{ marginBottom: '24px' }}>
                    <div style={{ fontSize: '20px', fontWeight: 800, color: '#0b0d20', marginBottom: '4px' }}>
                      {g('ct:formTitle').split(' ').length > 3
                        ? <>{g('ct:formTitle').split(' ').slice(0,-2).join(' ')} <span style={{ color: '#f97316' }}>{g('ct:formTitle').split(' ').slice(-2).join(' ')}</span></>
                        : g('ct:formTitle')
                      }
                    </div>
                    <div style={{ fontSize: '13px', color: '#64748b' }}>{g('ct:formSubtitle')}</div>
                  </div>
                  <form onSubmit={handle}>
                    <div className="ct-row2">
                      <div style={{ marginBottom: '16px' }}>
                        <label style={{ display: 'block', fontSize: '11px', fontWeight: 700, color: '#374151', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '6px' }}>Full Name *</label>
                        <input style={inp('name')} required placeholder="Your full name" value={form.name} onFocus={() => setFocused('name')} onBlur={() => setFocused('')} onChange={e => setForm({ ...form, name: e.target.value })} />
                      </div>
                      <div style={{ marginBottom: '16px' }}>
                        <label style={{ display: 'block', fontSize: '11px', fontWeight: 700, color: '#374151', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '6px' }}>Phone *</label>
                        <input style={inp('phone')} required type="tel" placeholder="+91 XXXXX XXXXX" value={form.phone} onFocus={() => setFocused('phone')} onBlur={() => setFocused('')} onChange={e => setForm({ ...form, phone: e.target.value })} />
                      </div>
                    </div>
                    <div style={{ marginBottom: '16px' }}>
                      <label style={{ display: 'block', fontSize: '11px', fontWeight: 700, color: '#374151', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '6px' }}>Email *</label>
                      <input style={inp('email')} required type="email" placeholder="you@email.com" value={form.email} onFocus={() => setFocused('email')} onBlur={() => setFocused('')} onChange={e => setForm({ ...form, email: e.target.value })} />
                    </div>
                    <div style={{ marginBottom: '16px' }}>
                      <label style={{ display: 'block', fontSize: '11px', fontWeight: 700, color: '#374151', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '6px' }}>I&apos;m Interested In</label>
                      <select style={{ ...inp('service'), cursor: 'pointer' }} value={form.service} onFocus={() => setFocused('service')} onBlur={() => setFocused('')} onChange={e => setForm({ ...form, service: e.target.value })}>
                        <option value="">Select a service…</option>
                        {services.map(s => <option key={s}>{s}</option>)}
                      </select>
                    </div>
                    <div style={{ marginBottom: '24px' }}>
                      <label style={{ display: 'block', fontSize: '11px', fontWeight: 700, color: '#374151', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '6px' }}>Message</label>
                      <textarea style={{ ...inp('message'), resize: 'vertical', minHeight: '110px' } as React.CSSProperties} placeholder="Your current role, target role, goals…" value={form.message} onFocus={() => setFocused('message')} onBlur={() => setFocused('')} onChange={e => setForm({ ...form, message: e.target.value })} />
                    </div>
                    <button type="submit" disabled={submitting}
                      style={{ display: 'block', width: '100%', padding: '14px', background: submitting ? '#93a5fd' : '#f97316', color: '#fff', fontWeight: 700, fontSize: '15px', fontFamily: "'Poppins',sans-serif", border: 'none', borderRadius: '10px', cursor: submitting ? 'not-allowed' : 'pointer', textAlign: 'center' }}>
                      {submitting ? 'Sending…' : g('ct:formSubmitBtn')}
                    </button>
                    <p style={{ fontSize: '11px', color: '#94a3b8', textAlign: 'center', marginTop: '10px', marginBottom: 0 }}>{g('ct:formFooter')}</p>
                  </form>
                </div>
              )}
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div style={{ background: '#fff', borderRadius: '20px', border: '1px solid #e8edf5', padding: '24px', boxShadow: '0 4px 16px rgba(0,0,0,0.05)' }}>
                <div style={{ fontSize: '15px', fontWeight: 800, color: '#0b0d20', marginBottom: '16px' }}>Reach Us Directly</div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  {contactItems.map(item => (
                    <div key={item.label} style={{ display: 'flex', alignItems: 'flex-start', gap: '12px', padding: '12px', borderRadius: '12px', border: '1px solid #eef0f6' }}>
                      <div style={{ width: '36px', height: '36px', minWidth: '36px', borderRadius: '10px', background: item.bg, border: `1px solid ${item.border}`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                        <item.Icon size={16} color={item.iconColor} />
                      </div>
                      <div>
                        <div style={{ fontSize: '10px', fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.4px', marginBottom: '2px' }}>{item.label}</div>
                        {item.href
                          ? <a href={item.href} target={item.href.startsWith('http') ? '_blank' : undefined} rel="noopener noreferrer" style={{ fontSize: '13px', fontWeight: 600, color: '#0f172a', textDecoration: 'none', display: 'block' }}>{item.line1}</a>
                          : <div style={{ fontSize: '13px', fontWeight: 600, color: '#0f172a' }}>{item.line1}</div>
                        }
                        <div style={{ fontSize: '11px', color: '#94a3b8', marginTop: '1px' }}>{item.line2}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div style={{ background: 'linear-gradient(135deg, #2145fb 0%, #1a38d4 100%)', borderRadius: '20px', padding: '24px', boxShadow: '0 4px 20px rgba(33,69,251,0.22)' }}>
                <Shield size={20} color="#fff" style={{ marginBottom: '10px', opacity: 0.9 }} />
                <div style={{ fontSize: '15px', fontWeight: 700, color: '#fff', marginBottom: '6px' }}>Our Promise to You</div>
                <div style={{ fontSize: '13px', lineHeight: 1.65, color: 'rgba(255,255,255,0.85)' }}>{g('ct:promise')}</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section style={{ background: '#fff', padding: '64px 0' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '40px' }}>
            <div className="section-eyebrow" style={{ justifyContent: 'center' }}>
              <div className="section-eyebrow-bar" />Quick Answers
            </div>
            <h2 className="section-heading">{g('ct:faqSectionTitle').split(' ').slice(0,-1).join(' ')} <em>{g('ct:faqSectionTitle').split(' ').slice(-1)[0]}</em></h2>
          </div>
          <div className="ct-faq">
            {faqs.map(faq => (
              <div key={faq.q} className="value-card sr-ready">
                <h4 style={{ fontSize: '15px', fontWeight: 700, color: '#0f172a', marginBottom: '10px' }}>{faq.q}</h4>
                <p style={{ fontSize: '14px', color: '#64748b', lineHeight: 1.65 }}>{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </PageLayout>
  );
}
