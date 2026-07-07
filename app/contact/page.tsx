'use client';

import { useState, useEffect, useRef } from 'react';
import {
  MessageCircle, Mail, MapPin, Clock,
  Shield, CheckCircle2, ArrowRight, Sparkles,
} from 'lucide-react';
import PageLayout from '../components/PageLayout';

/* ── Design tokens ── */
const ORANGE        = '#f97316';
const ORANGE_DARK   = '#ea580c';
const ORANGE_SOFT   = 'rgba(249,115,22,0.08)';
const ORANGE_MED    = 'rgba(249,115,22,0.14)';
const ORANGE_BORDER = 'rgba(249,115,22,0.22)';
const ORANGE_RING   = 'rgba(249,115,22,0.18)';
const BLACK         = '#0b0d20';
const BODY          = '#374151';
const MUTED         = '#64748b';
const BORDER        = '#e5e7eb';
const SURFACE       = '#ffffff';
const BG_ALT        = '#f9fafb';
const FONT          = `'Inter','Manrope','Geist','Plus Jakarta Sans',system-ui,sans-serif`;

const CT_DEFAULTS: Record<string, string> = {
  'ct:heroTag':         'Get In Touch',
  'ct:heroTitle':       "Let's Build Your Next Chapter Together.",
  'ct:heroSubtitle':    'Looking for a job in India or planning to study abroad? Free consultation — no obligation.',
  'ct:heroPrimary':     'WhatsApp Now',
  'ct:heroWaHref':      'https://wa.me/919910116901',
  'ct:heroSecondary':   'Fill the Form ↓',
  'ct:formTitle':       'Tell Us About Your Goals',
  'ct:formSubtitle':    'Free consultation — personalised plan, no obligation.',
  'ct:formSubmitBtn':   "Send Message — It's Free",
  'ct:formFooter':      'Zero spam. We only contact you about your query.',
  'ct:successTitle':    'Message Received!',
  'ct:successSub':      "We'll reach out within 24 hours. For faster help, WhatsApp us.",
  'ct:services':        'Career Placement (India),Study Abroad,CV & Resume Writing,Interview Coaching,LinkedIn Optimisation,Career Assessment,Other',
  'ct:waPhone':         '+91 99101 16901',
  'ct:waHref':          'https://wa.me/919910116901',
  'ct:waNote':          'Usually replies in < 1 hour',
  'ct:email':           'hello@placedly.in',
  'ct:emailNote':       'We reply within 24 hours',
  'ct:office':          'Delhi NCR, India',
  'ct:officeNote':      'Serving Pan-India & Global',
  'ct:hours':           'Mon – Sat: 9 AM – 7 PM',
  'ct:hoursNote':       'Sunday: By appointment',
  'ct:promise':         "Free consultation. No obligation. If we can't help you, we'll say so honestly. No hard sell, ever.",
  'ct:faqSectionTitle': 'Frequently Asked Questions',
  'ct:faq1Q': 'How does the payment model work?',
  'ct:faq1A': 'Initial consultation is free. For CAP, we charge a 12% Career Assistance Fee based on your annual CTC — but only after your offer letter is in hand. Nothing upfront, nothing during the process.',
  'ct:faq2Q': 'How long does placement typically take?',
  'ct:faq2A': 'Most candidates get their first interview call within 1–2 weeks. Typical placement timeline is 4–6 weeks depending on target role and industry.',
  'ct:faq3Q': 'Do you help freshers as well as experienced professionals?',
  'ct:faq3A': 'Absolutely. We work with candidates at every level — freshers, mid-career professionals, and senior executives. Each gets a personalised roadmap.',
  'ct:faq4Q': 'What industries do you cover?',
  'ct:faq4A': 'Technology, Finance & Banking, Healthcare & Pharma, Marketing, Engineering, Sales, Design, and Operations — across top MNCs in India and globally.',
};

/* ── Scroll-reveal hook ── */
function useReveal() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); io.disconnect(); } },
      { threshold: 0.12, rootMargin: '-20px' },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return { ref, visible };
}

/* ── Reveal wrapper ── */
function Reveal({
  children,
  delay = 0,
  scale = false,
  className = '',
  style = {},
}: {
  children: React.ReactNode;
  delay?: number;
  scale?: boolean;
  className?: string;
  style?: React.CSSProperties;
}) {
  const { ref, visible } = useReveal();
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity:   visible ? 1 : 0,
        transform: visible
          ? 'none'
          : scale ? 'scale(0.94)' : 'translateY(22px)',
        transition: `opacity 0.55s cubic-bezier(0.22,1,0.36,1) ${delay}s,
                     transform 0.55s cubic-bezier(0.22,1,0.36,1) ${delay}s`,
        ...style,
      }}
    >
      {children}
    </div>
  );
}

/* ── Contact info items — all orange ── */
function buildContactItems(g: (k: string) => string) {
  return [
    {
      Icon: MessageCircle,
      label: 'WhatsApp',
      line1: g('ct:waPhone'),
      href:  g('ct:waHref'),
      line2: g('ct:waNote'),
    },
    {
      Icon: Mail,
      label: 'Email',
      line1: g('ct:email'),
      href:  `mailto:${g('ct:email')}`,
      line2: g('ct:emailNote'),
    },
    {
      Icon: MapPin,
      label: 'Office',
      line1: g('ct:office'),
      href:  null,
      line2: g('ct:officeNote'),
    },
    {
      Icon: Clock,
      label: 'Hours',
      line1: g('ct:hours'),
      href:  null,
      line2: g('ct:hoursNote'),
    },
  ];
}

export default function ContactPage() {
  const [cms, setCms]           = useState(CT_DEFAULTS);
  const [sent, setSent]         = useState(false);
  const [focused, setFocused]   = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [openFaq, setOpenFaq]   = useState<number | null>(null);
  const [form, setForm]         = useState({
    name: '', email: '', phone: '', service: '', message: '',
  });

  useEffect(() => {
    fetch('/api/admin/content?prefix=ct:')
      .then(r => r.json())
      .then((saved: Record<string, string>) => setCms({ ...CT_DEFAULTS, ...saved }))
      .catch(() => {});
  }, []);

  const g        = (k: string) => cms[k] ?? CT_DEFAULTS[k] ?? '';
  const services = g('ct:services').split(',').map(s => s.trim()).filter(Boolean);
  const faqs     = [1, 2, 3, 4]
    .map(i => ({ q: g(`ct:faq${i}Q`), a: g(`ct:faq${i}A`) }))
    .filter(f => f.q);
  const contactItems = buildContactItems(g);

  /* input style */
  const inp = (name: string): React.CSSProperties => ({
    display: 'block', width: '100%', padding: '11px 14px',
    border: `1.5px solid ${focused === name ? ORANGE : BORDER}`,
    borderRadius: '10px', fontSize: '14px',
    fontFamily: FONT, color: BLACK,
    background: focused === name ? SURFACE : BG_ALT,
    outline: 'none',
    boxShadow: focused === name ? `0 0 0 3px ${ORANGE_RING}` : 'none',
    boxSizing: 'border-box',
    transition: 'border-color .18s, box-shadow .18s, background .18s',
  });

  const handle = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setTimeout(() => { setSent(true); setSubmitting(false); }, 700);
  };

  return (
    <PageLayout>
      <style>{`
        /* ── Font ── */
        .ct-page, .ct-page * {
          font-family: ${FONT};
          box-sizing: border-box;
        }

        /* ── Keyframes ── */
        @keyframes ct-fade-up {
          from { opacity:0; transform:translateY(20px); }
          to   { opacity:1; transform:translateY(0); }
        }
        @keyframes ct-pulse-ring {
          0%  { box-shadow: 0 0 0 0   rgba(249,115,22,0.45); }
          70% { box-shadow: 0 0 0 8px rgba(249,115,22,0);    }
          100%{ box-shadow: 0 0 0 0   rgba(249,115,22,0);    }
        }
        @keyframes ct-shimmer {
          0%  { background-position:-400px 0; }
          100%{ background-position: 400px 0; }
        }
        @keyframes ct-spin {
          to { transform: rotate(360deg); }
        }
        @keyframes ct-check-pop {
          0%  { transform: scale(0);   opacity:0; }
          60% { transform: scale(1.2); opacity:1; }
          100%{ transform: scale(1);   opacity:1; }
        }
        @keyframes ct-float {
          0%,100%{ transform:translateY(0);   }
          50%    { transform:translateY(-6px); }
        }

        /* ── Anim helpers ── */
        .ct-d0{ animation-delay:0s;    }
        .ct-d1{ animation-delay:0.08s; }
        .ct-d2{ animation-delay:0.16s; }
        .ct-d3{ animation-delay:0.24s; }

        /* ── Grid layouts ── */
        .ct-layout {
          display: grid;
          grid-template-columns: 1fr 340px;
          gap: 32px;
          align-items: start;
        }
        .ct-row2 {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 16px;
        }
        .ct-faq-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 16px;
          max-width: 900px;
          margin: 0 auto;
        }
        @media (max-width: 860px) {
          .ct-layout   { grid-template-columns: 1fr; }
          .ct-row2     { grid-template-columns: 1fr; }
          .ct-faq-grid { grid-template-columns: 1fr; }
        }

        /* ── Eyebrow ── */
        .ct-eyebrow {
          display: inline-flex;
          align-items: center;
          gap: 7px;
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: ${ORANGE};
          background: ${ORANGE_SOFT};
          border: 1px solid ${ORANGE_BORDER};
          border-radius: 999px;
          padding: 5px 14px;
          width: fit-content;
          margin-bottom: 16px;
        }
        .ct-eyebrow-dot {
          width: 6px; height: 6px;
          border-radius: 50%;
          background: ${ORANGE};
          animation: ct-pulse-ring 2.4s ease-out infinite;
        }

        /* ── Section label ── */
        .ct-section-label {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          font-size: 11px;
          font-weight: 700;
          color: ${ORANGE};
          letter-spacing: 0.1em;
          text-transform: uppercase;
          margin-bottom: 16px;
        }
        .ct-section-label-bar {
          width: 20px; height: 3px;
          border-radius: 999px;
          background: ${ORANGE};
        }

        /* ── Buttons ── */
        .ct-btn-primary {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: ${ORANGE};
          color: #fff;
          font-weight: 700;
          font-size: 14px;
          padding: 13px 28px;
          border-radius: 999px;
          text-decoration: none;
          border: 1px solid ${ORANGE_DARK};
          box-shadow: 0 4px 14px rgba(249,115,22,0.28);
          transition: transform .2s ease, box-shadow .2s ease, filter .2s ease;
          cursor: pointer;
          font-family: ${FONT};
        }
        .ct-btn-primary:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 22px rgba(249,115,22,0.36);
          filter: brightness(1.06);
        }
        .ct-btn-primary:active {
          transform: translateY(0);
          filter: brightness(0.95);
        }
        .ct-btn-primary:disabled {
          opacity: 0.65;
          cursor: not-allowed;
          transform: none;
        }

        .ct-btn-ghost {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: transparent;
          color: ${BLACK};
          font-weight: 600;
          font-size: 14px;
          padding: 13px 28px;
          border-radius: 999px;
          text-decoration: none;
          border: 1.5px solid ${BORDER};
          transition: border-color .2s ease, color .2s ease, background .2s ease;
        }
        .ct-btn-ghost:hover {
          border-color: ${ORANGE};
          color: ${ORANGE};
          background: ${ORANGE_SOFT};
        }

        /* ── Contact item card ── */
        .ct-contact-item {
          display: flex;
          align-items: flex-start;
          gap: 12px;
          padding: 12px;
          border-radius: 12px;
          border: 1px solid ${BORDER};
          background: ${SURFACE};
          transition: border-color .2s ease, background .2s ease, transform .2s ease;
          cursor: default;
        }
        .ct-contact-item:hover {
          border-color: ${ORANGE_BORDER};
          background: ${ORANGE_SOFT};
          transform: translateX(3px);
        }
        .ct-contact-icon {
          width: 36px; height: 36px; min-width: 36px;
          border-radius: 10px;
          background: ${ORANGE_SOFT};
          border: 1px solid ${ORANGE_BORDER};
          display: flex; align-items: center; justify-content: center;
          flex-shrink: 0;
          transition: background .2s ease, transform .2s ease;
        }
        .ct-contact-item:hover .ct-contact-icon {
          background: ${ORANGE_MED};
          transform: scale(1.08) rotate(-4deg);
        }
        .ct-contact-label {
          font-size: 10px;
          font-weight: 700;
          color: ${MUTED};
          text-transform: uppercase;
          letter-spacing: 0.06em;
          margin-bottom: 2px;
        }
        .ct-contact-line1 {
          font-size: 13px;
          font-weight: 600;
          color: ${BLACK};
          text-decoration: none;
          display: block;
          transition: color .18s;
        }
        a.ct-contact-line1:hover { color: ${ORANGE}; }
        .ct-contact-line2 {
          font-size: 11px;
          color: ${MUTED};
          margin-top: 1px;
        }

        /* ── Promise card ── */
        .ct-promise-card {
          background: ${BLACK};
          border-radius: 20px;
          padding: 24px;
          position: relative;
          overflow: hidden;
          transition: transform .25s ease, box-shadow .25s ease;
        }
        .ct-promise-card:hover {
          transform: translateY(-3px);
          box-shadow: 0 16px 36px rgba(249,115,22,0.18);
        }
        .ct-promise-card::before {
          content: '';
          position: absolute;
          top: -40px; right: -40px;
          width: 130px; height: 130px;
          background: radial-gradient(circle, rgba(249,115,22,0.22) 0%, transparent 70%);
          pointer-events: none;
        }

        /* ── FAQ items ── */
        .ct-faq-item {
          background: ${SURFACE};
          border: 1px solid ${BORDER};
          border-radius: 16px;
          overflow: hidden;
          transition: border-color .22s ease, box-shadow .22s ease;
          cursor: pointer;
        }
        .ct-faq-item:hover {
          border-color: ${ORANGE_BORDER};
          box-shadow: 0 4px 16px rgba(249,115,22,0.08);
        }
        .ct-faq-item.is-open {
          border-color: ${ORANGE_BORDER};
          border-left: 3px solid ${ORANGE};
          box-shadow: 0 6px 20px rgba(249,115,22,0.10);
        }
        .ct-faq-trigger {
          display: flex;
          justify-content: space-between;
          align-items: center;
          width: 100%;
          padding: 18px 20px;
          background: transparent;
          border: none;
          cursor: pointer;
          text-align: left;
          gap: 12px;
          transition: background .18s ease;
          font-family: ${FONT};
        }
        .ct-faq-trigger:hover { background: #fff7ed; }
        .ct-faq-q {
          font-size: 14px;
          font-weight: 600;
          color: ${BLACK};
          line-height: 1.45;
          flex: 1;
        }
        .ct-faq-item.is-open .ct-faq-q { color: ${ORANGE_DARK}; }
        .ct-faq-icon {
          width: 26px; height: 26px;
          border-radius: 50%;
          background: #f1f5f9;
          color: ${MUTED};
          font-size: 17px;
          font-weight: 400;
          display: flex; align-items: center; justify-content: center;
          flex-shrink: 0;
          transition: background .2s ease, color .2s ease, transform .22s ease;
          line-height: 1;
        }
        .ct-faq-item.is-open .ct-faq-icon {
          background: ${ORANGE};
          color: #fff;
          transform: rotate(45deg);
        }
        .ct-faq-body {
          overflow: hidden;
          max-height: 0;
          transition: max-height .32s cubic-bezier(0.4,0,0.2,1),
                      opacity   .28s ease,
                      padding   .28s ease;
          opacity: 0;
          padding: 0 20px;
        }
        .ct-faq-item.is-open .ct-faq-body {
          max-height: 400px;
          opacity: 1;
          padding: 0 20px 18px;
        }
        .ct-faq-body p {
          font-size: 14px;
          line-height: 1.7;
          color: ${MUTED};
          margin: 0;
          border-top: 1px solid rgba(249,115,22,0.08);
          padding-top: 14px;
        }

        /* ── Form card ── */
        .ct-form-card {
          background: ${SURFACE};
          border-radius: 20px;
          border: 1px solid ${BORDER};
          box-shadow: 0 4px 24px rgba(0,0,0,0.06);
          overflow: hidden;
          transition: box-shadow .3s ease;
        }
        .ct-form-card:hover {
          box-shadow: 0 8px 32px rgba(249,115,22,0.08);
        }

        /* ── Label ── */
        .ct-label {
          display: block;
          font-size: 11px;
          font-weight: 700;
          color: ${BODY};
          text-transform: uppercase;
          letter-spacing: 0.06em;
          margin-bottom: 6px;
        }

        /* ── Success check ── */
        .ct-success-check {
          animation: ct-check-pop 0.5s cubic-bezier(0.22,1,0.36,1) both;
        }

        /* ── Responsive ── */
        @media (max-width: 600px) {
          .ct-promise-card { padding: 20px; }
        }
      `}</style>

      <div className="ct-page">

        {/* ════════════════════════════════════════════
            HERO
        ════════════════════════════════════════════ */}
        <section className="page-hero" style={{ background: SURFACE }}>
          <div className="container">
            <div className="page-hero-inner">

              {/* breadcrumb */}
              <nav style={{
                display: 'flex', alignItems: 'center', gap: '8px',
                fontSize: '13px', color: MUTED, marginBottom: '24px',
                animation: 'ct-fade-up 0.45s ease both',
              }}>
                <a href="/" style={{ color: MUTED, textDecoration: 'none', transition: 'color .18s' }}
                   onMouseEnter={e => (e.currentTarget.style.color = ORANGE)}
                   onMouseLeave={e => (e.currentTarget.style.color = MUTED)}>
                  Home
                </a>
                <span>›</span>
                <span style={{ color: BODY, fontWeight: 500 }}>Contact</span>
              </nav>

              {/* eyebrow */}
              <span className="ct-eyebrow" style={{ animation: 'ct-fade-up 0.45s 0.05s ease both' }}>
                <span className="ct-eyebrow-dot" />
                {g('ct:heroTag')}
              </span>

              <h1 style={{
                fontSize: 'clamp(2rem,4.5vw,3.6rem)',
                fontWeight: 900, color: BLACK,
                lineHeight: 1.1, letterSpacing: '-0.03em',
                margin: '0 0 20px',
                animation: 'ct-fade-up 0.5s 0.1s ease both',
              }}>
                {g('ct:heroTitle').includes('Next Chapter')
                  ? <>
                      {g('ct:heroTitle').split('Next Chapter')[0]}
                      <em style={{ fontStyle: 'normal', color: ORANGE }}>
                        Next Chapter{g('ct:heroTitle').split('Next Chapter')[1]}
                      </em>
                    </>
                  : g('ct:heroTitle')
                }
              </h1>

              <p style={{
                fontSize: '16px', color: MUTED, lineHeight: 1.7,
                maxWidth: '520px', marginBottom: '32px',
                animation: 'ct-fade-up 0.5s 0.15s ease both',
              }}>
                {g('ct:heroSubtitle')}
              </p>

              <div style={{
                display: 'flex', gap: '12px', flexWrap: 'wrap',
                animation: 'ct-fade-up 0.5s 0.2s ease both',
              }}>
                <a href={g('ct:heroWaHref')} target="_blank" rel="noopener noreferrer"
                   className="ct-btn-primary">
                  <MessageCircle size={15} />
                  {g('ct:heroPrimary')}
                </a>
                <a href="#contact-form" className="ct-btn-ghost">
                  {g('ct:heroSecondary')}
                </a>
              </div>

            </div>
          </div>
        </section>

        {/* ════════════════════════════════════════════
            FORM + SIDEBAR
        ════════════════════════════════════════════ */}
        <section style={{ background: BG_ALT, padding: '64px 0' }} id="contact-form">
          <div className="container">
            <div className="ct-layout">

              {/* ── Form card ── */}
              <Reveal>
                <div className="ct-form-card">
                  {sent ? (
                    /* Success state */
                    <div style={{ padding: '64px 40px', textAlign: 'center' }}>
                      <CheckCircle2
                        size={52}
                        color={ORANGE}
                        className="ct-success-check"
                        style={{ marginBottom: '16px' }}
                      />
                      <div style={{
                        fontSize: '22px', fontWeight: 800,
                        color: BLACK, marginBottom: '8px',
                      }}>
                        {g('ct:successTitle')}
                      </div>
                      <div style={{
                        color: MUTED, fontSize: '14px',
                        lineHeight: 1.7, marginBottom: '28px',
                      }}>
                        {g('ct:successSub')}
                      </div>
                      <a href={g('ct:waHref')} target="_blank" rel="noopener noreferrer"
                         className="ct-btn-primary" style={{ display: 'inline-flex' }}>
                        <MessageCircle size={15} />
                        {g('ct:heroPrimary')}
                      </a>
                    </div>
                  ) : (
                    /* Form state */
                    <div style={{ padding: '36px' }}>
                      <div style={{ marginBottom: '24px' }}>
                        <div style={{
                          fontSize: '20px', fontWeight: 800,
                          color: BLACK, marginBottom: '4px',
                        }}>
                          {g('ct:formTitle').split(' ').length > 3
                            ? <>
                                {g('ct:formTitle').split(' ').slice(0, -2).join(' ')}{' '}
                                <span style={{ color: ORANGE }}>
                                  {g('ct:formTitle').split(' ').slice(-2).join(' ')}
                                </span>
                              </>
                            : g('ct:formTitle')
                          }
                        </div>
                        <div style={{ fontSize: '13px', color: MUTED }}>
                          {g('ct:formSubtitle')}
                        </div>
                      </div>

                      <form onSubmit={handle}>
                        <div className="ct-row2">
                          <div style={{ marginBottom: '16px' }}>
                            <label className="ct-label">Full Name *</label>
                            <input
                              style={inp('name')} required
                              placeholder="Your full name"
                              value={form.name}
                              onFocus={() => setFocused('name')}
                              onBlur={() => setFocused('')}
                              onChange={e => setForm({ ...form, name: e.target.value })}
                            />
                          </div>
                          <div style={{ marginBottom: '16px' }}>
                            <label className="ct-label">Phone *</label>
                            <input
                              style={inp('phone')} required type="tel"
                              placeholder="+91 XXXXX XXXXX"
                              value={form.phone}
                              onFocus={() => setFocused('phone')}
                              onBlur={() => setFocused('')}
                              onChange={e => setForm({ ...form, phone: e.target.value })}
                            />
                          </div>
                        </div>

                        <div style={{ marginBottom: '16px' }}>
                          <label className="ct-label">Email *</label>
                          <input
                            style={inp('email')} required type="email"
                            placeholder="you@email.com"
                            value={form.email}
                            onFocus={() => setFocused('email')}
                            onBlur={() => setFocused('')}
                            onChange={e => setForm({ ...form, email: e.target.value })}
                          />
                        </div>

                        <div style={{ marginBottom: '16px' }}>
                          <label className="ct-label">I&apos;m Interested In</label>
                          <select
                            style={{ ...inp('service'), cursor: 'pointer' }}
                            value={form.service}
                            onFocus={() => setFocused('service')}
                            onBlur={() => setFocused('')}
                            onChange={e => setForm({ ...form, service: e.target.value })}
                          >
                            <option value="">Select a service…</option>
                            {services.map(s => <option key={s}>{s}</option>)}
                          </select>
                        </div>

                        <div style={{ marginBottom: '24px' }}>
                          <label className="ct-label">Message</label>
                          <textarea
                            style={{ ...inp('message'), resize: 'vertical', minHeight: '110px' } as React.CSSProperties}
                            placeholder="Your current role, target role, goals…"
                            value={form.message}
                            onFocus={() => setFocused('message')}
                            onBlur={() => setFocused('')}
                            onChange={e => setForm({ ...form, message: e.target.value })}
                          />
                        </div>

                        <button
                          type="submit"
                          disabled={submitting}
                          className="ct-btn-primary"
                          style={{
                            width: '100%', justifyContent: 'center',
                            borderRadius: '10px', fontSize: '15px',
                            padding: '14px 24px',
                            opacity: submitting ? 0.72 : 1,
                          }}
                        >
                          {submitting ? (
                            <>
                              <span style={{
                                width: '14px', height: '14px',
                                border: '2px solid rgba(255,255,255,0.35)',
                                borderTopColor: '#fff',
                                borderRadius: '50%',
                                display: 'inline-block',
                                animation: 'ct-spin 0.7s linear infinite',
                              }} />
                              Sending…
                            </>
                          ) : (
                            <>{g('ct:formSubmitBtn')}</>
                          )}
                        </button>

                        <p style={{
                          fontSize: '11px', color: MUTED,
                          textAlign: 'center', marginTop: '10px', marginBottom: 0,
                        }}>
                          {g('ct:formFooter')}
                        </p>
                      </form>
                    </div>
                  )}
                </div>
              </Reveal>

              {/* ── Sidebar ── */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>

                {/* Contact items */}
                <Reveal delay={0.08}>
                  <div style={{
                    background: SURFACE, borderRadius: '20px',
                    border: `1px solid ${BORDER}`,
                    padding: '24px',
                    boxShadow: '0 4px 16px rgba(0,0,0,0.05)',
                  }}>
                    <div style={{
                      fontSize: '15px', fontWeight: 800,
                      color: BLACK, marginBottom: '16px',
                    }}>
                      Reach Us Directly
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                      {contactItems.map((item, i) => (
                        <div
                          key={item.label}
                          className="ct-contact-item"
                          style={{ animationDelay: `${i * 0.06}s` }}
                        >
                          <div className="ct-contact-icon">
                            <item.Icon size={16} color={ORANGE} />
                          </div>
                          <div>
                            <div className="ct-contact-label">{item.label}</div>
                            {item.href
                              ? <a href={item.href}
                                   target={item.href.startsWith('http') ? '_blank' : undefined}
                                   rel="noopener noreferrer"
                                   className="ct-contact-line1">
                                  {item.line1}
                                </a>
                              : <div className="ct-contact-line1" style={{ cursor: 'default' }}>
                                  {item.line1}
                                </div>
                            }
                            <div className="ct-contact-line2">{item.line2}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </Reveal>

                {/* Promise card */}
                <Reveal delay={0.14}>
                  <div className="ct-promise-card">
                    <Sparkles
                      size={20} color={ORANGE}
                      style={{ marginBottom: '10px', opacity: 0.9, animation: 'ct-float 3s ease-in-out infinite' }}
                    />
                    <div style={{
                      fontSize: '15px', fontWeight: 700,
                      color: '#fff', marginBottom: '6px',
                      position: 'relative', zIndex: 1,
                    }}>
                      Our Promise to You
                    </div>
                    <div style={{
                      fontSize: '13px', lineHeight: 1.65,
                      color: 'rgba(255,255,255,0.80)',
                      position: 'relative', zIndex: 1,
                    }}>
                      {g('ct:promise')}
                    </div>
                    <div style={{
                      marginTop: '16px',
                      display: 'flex', alignItems: 'center', gap: '6px',
                      position: 'relative', zIndex: 1,
                    }}>
                      <CheckCircle2 size={13} color={ORANGE} />
                      <span style={{ fontSize: '11px', color: 'rgba(255,255,255,0.60)', fontWeight: 600 }}>
                        Zero upfront · Pay after placement
                      </span>
                    </div>
                  </div>
                </Reveal>

              </div>
            </div>
          </div>
        </section>

        {/* ════════════════════════════════════════════
            FAQ
        ════════════════════════════════════════════ */}
        <section style={{ background: SURFACE, padding: '64px 0' }}>
          <div className="container">

            <Reveal style={{ textAlign: 'center', marginBottom: '40px' }}>
              <span className="ct-eyebrow" style={{ margin: '0 auto 16px' }}>
                <span className="ct-eyebrow-dot" />
                Quick Answers
              </span>
              <h2 style={{
                fontSize: 'clamp(1.8rem,3vw,2.4rem)',
                fontWeight: 900, color: BLACK,
                lineHeight: 1.15, letterSpacing: '-0.025em',
                margin: 0,
              }}>
                {(() => {
                  const words = g('ct:faqSectionTitle').split(' ');
                  const last  = words.slice(-1)[0];
                  const rest  = words.slice(0, -1).join(' ');
                  return <>{rest} <span style={{ color: ORANGE }}>{last}</span></>;
                })()}
              </h2>
            </Reveal>

            <div className="ct-faq-grid">
              {faqs.map((faq, i) => (
                <Reveal key={faq.q} delay={i * 0.07}>
                  <div
                    className={`ct-faq-item${openFaq === i ? ' is-open' : ''}`}
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  >
                    <button type="button" className="ct-faq-trigger">
                      <span className="ct-faq-q">{faq.q}</span>
                      <span className="ct-faq-icon">+</span>
                    </button>
                    <div className="ct-faq-body">
                      <p>{faq.a}</p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>

          </div>
        </section>

      </div>
    </PageLayout>
  );
}