'use client';

import { useState, useEffect, useRef } from 'react';
import {
  MessageCircle, Mail, MapPin, Clock, Shield,
  CheckCircle2, ArrowRight, Rocket, Sparkles,
  Phone, Send, ChevronDown, Zap,
  type LucideIcon,
} from 'lucide-react';
import PageLayout from '../components/PageLayout';

/* ── Brand tokens (matches site-wide theme) ── */
const G = {
  blue:   '#2563eb',
  indigo: '#7c8ff0',
  orange: '#fb923c',
  rose:   '#f43f5e',
  purple: '#a855f7',
  green:  '#16a34a',
};

// CHANGED: GRAD constant removed (no more animated text gradient).
// Buttons still use GRAD only for solid background gradients (kept inline as needed).
// const GRAD = `linear-gradient(270deg, ${G.blue}, ${G.indigo}, ${G.orange}, ${G.rose}, ${G.purple}, ${G.blue})`;

/* ── CMS defaults ── */
const CT_DEFAULTS: Record<string, string> = {
  'ct:heroTag':         'Get In Touch',
  'ct:heroTitle':       "Let's Build Your",
  'ct:heroTitleGrad':   'Next Chapter',
  'ct:heroTitleEnd':    'Together.',
  'ct:heroSubtitle':    'Looking for a job in India or planning to study abroad? Free consultation — no obligation, no hard sell.',
  'ct:heroPrimary':     'WhatsApp Now',
  'ct:heroWaHref':      'https://wa.me/919910116901',
  'ct:heroSecondary':   'Fill the Form',
  'ct:formTitle':       'Tell Us About',
  'ct:formTitleGrad':   'Your Goals',
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

const LIVE_ACTIVITY = [
  '🎉 Ankit R. placed at WNS — ₹6.4L CTC',
  '⚡ Priya S. got interview call in 9 days',
  '🚀 47 candidates in active hiring connect',
  '✅ Rohit K. signed offer — 52% hike',
  '🎯 Vikram T. landed Sr. Analyst role',
];

/* CHANGED: GradText component removed entirely.
   Previously: animated rainbow text gradient. Now: callers use a plain colored <span>. */

/* ── Section label ── */
function SectionLabel({ text, center = false, light = false }: { text: string; center?: boolean; light?: boolean }) {
  return (
    <div style={{
      display: 'inline-flex', alignItems: 'center', gap: '6px',
      fontSize: '10.5px', fontWeight: 800, letterSpacing: '0.12em',
      textTransform: 'uppercase', marginBottom: '10px',
      justifyContent: center ? 'center' : 'flex-start',
      width: center ? '100%' : 'auto',
    }}>
      <span style={{ width: '18px', height: '2.5px', borderRadius: '999px', background: `linear-gradient(90deg,${G.blue},${G.orange})` }} />
      {/* CHANGED: was gradient text, now plain blue (or light on dark bg) */}
      <span style={light ? { color: 'rgba(255,255,255,0.55)' } : { color: G.blue }}>{text}</span>
      <span style={{ width: '18px', height: '2.5px', borderRadius: '999px', background: `linear-gradient(90deg,${G.orange},${G.blue})` }} />
    </div>
  );
}

/* ════════════════════════════════════════════
   FAQ ACCORDION ITEM
════════════════════════════════════════════ */
function FaqItem({ q, a, index }: { q: string; a: string; index: number }) {
  const [open, setOpen] = useState(false);
  const colors = [G.blue, G.orange, G.purple, G.green];
  const col = colors[index % colors.length];

  return (
    <div
      style={{
        background: '#fff',
        borderRadius: '16px',
        border: `1px solid ${open ? col + '40' : '#eef2ff'}`,
        overflow: 'hidden',
        transition: 'border-color .25s ease, box-shadow .25s ease',
        boxShadow: open ? `0 8px 28px ${col}15` : '0 2px 8px rgba(0,0,0,0.04)',
      }}
    >
      <button
        type="button"
        onClick={() => setOpen(!open)}
        style={{
          all: 'unset',
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          width: '100%',
          padding: '18px 20px',
          cursor: 'pointer',
          boxSizing: 'border-box',
        }}
      >
        <div style={{
          width: '28px', height: '28px', borderRadius: '8px', flexShrink: 0,
          background: `${col}15`, display: 'flex', alignItems: 'center', justifyContent: 'center',
          transition: 'background .2s ease',
        }}>
          <span style={{ fontSize: '12px', fontWeight: 900, color: col }}>{index + 1}</span>
        </div>
        <span style={{ flex: 1, fontSize: '14px', fontWeight: 700, color: '#0f172a', textAlign: 'left', lineHeight: 1.4 }}>{q}</span>
        <ChevronDown
          size={16}
          color="#94a3b8"
          style={{ flexShrink: 0, transition: 'transform .3s ease', transform: open ? 'rotate(180deg)' : 'rotate(0deg)' }}
        />
      </button>

      <div style={{
        display: 'grid',
        gridTemplateRows: open ? '1fr' : '0fr',
        transition: 'grid-template-rows .35s ease',
      }}>
        <div style={{ overflow: 'hidden', minHeight: 0 }}>
          <div style={{
            padding: '0 20px 18px 60px',
            fontSize: '13.5px', color: '#64748b', lineHeight: 1.7,
            borderTop: `1px solid ${col}20`,
            paddingTop: '14px',
          }}>
            {a}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ════════════════════════════════════════════
   CONTACT CARD
════════════════════════════════════════════ */
function ContactCard({
  Icon, iconColor, bg, border, label, line1, href, line2,
}: {
  Icon: LucideIcon;
  iconColor: string; bg: string; border: string;
  label: string; line1: string; href: string | null; line2: string;
}) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: 'flex', alignItems: 'flex-start', gap: '14px',
        padding: '16px', borderRadius: '14px',
        border: `1px solid ${hovered ? border : '#eef0f6'}`,
        background: hovered ? bg : '#fff',
        transition: 'all .2s ease',
        transform: hovered ? 'translateX(4px)' : 'translateX(0)',
        cursor: href ? 'pointer' : 'default',
      }}
    >
      <div style={{
        width: '40px', height: '40px', minWidth: '40px', borderRadius: '12px',
        background: bg, border: `1px solid ${border}`,
        display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
        boxShadow: hovered ? `0 4px 12px ${iconColor}25` : 'none',
        transition: 'box-shadow .2s ease',
      }}>
        <Icon size={18} color={iconColor} />
      </div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontSize: '10px', fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '3px' }}>{label}</div>
        {href ? (
          <a href={href} target={href.startsWith('http') ? '_blank' : undefined} rel="noopener noreferrer"
            style={{ fontSize: '13.5px', fontWeight: 700, color: '#0f172a', textDecoration: 'none', display: 'block', transition: 'color .15s ease' }}
            onMouseEnter={e => (e.currentTarget.style.color = iconColor)}
            onMouseLeave={e => (e.currentTarget.style.color = '#0f172a')}
          >{line1}</a>
        ) : (
          <div style={{ fontSize: '13.5px', fontWeight: 700, color: '#0f172a' }}>{line1}</div>
        )}
        <div style={{ fontSize: '11px', color: '#94a3b8', marginTop: '2px' }}>{line2}</div>
      </div>
      {href && (
        <ArrowRight
          size={14}
          color={iconColor}
          style={{ flexShrink: 0, marginTop: '12px', opacity: hovered ? 1 : 0, transition: 'opacity .2s ease' }}
        />
      )}
    </div>
  );
}

/* ════════════════════════════════════════════
   MAIN PAGE
════════════════════════════════════════════ */
export default function ContactPage() {
  const [cms, setCms]           = useState(CT_DEFAULTS);
  const [sent, setSent]         = useState(false);
  const [focused, setFocused]   = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [tickerIdx, setTickerIdx]   = useState(0);
  const [tickerVisible, setTickerVisible] = useState(true);
  const [form, setForm] = useState({
    name: '', email: '', phone: '', service: '', message: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [touched, setTouched]   = useState<Record<string, boolean>>({});
  const [charCount, setCharCount] = useState(0);

  /* Reveal refs */
  const heroRef   = useRef<HTMLDivElement>(null);
  const formRef   = useRef<HTMLDivElement>(null);
  const statsRef  = useRef<HTMLDivElement>(null);

  /* Load CMS */
  useEffect(() => {
    fetch('/api/admin/content?prefix=ct:')
      .then(r => r.json())
      .then((saved: Record<string, string>) => setCms({ ...CT_DEFAULTS, ...saved }))
      .catch(() => {});
  }, []);

  /* Ticker */
  useEffect(() => {
    const interval = setInterval(() => {
      setTickerVisible(false);
      setTimeout(() => {
        setTickerIdx(i => (i + 1) % LIVE_ACTIVITY.length);
        setTickerVisible(true);
      }, 300);
    }, 3500);
    return () => clearInterval(interval);
  }, []);

  /* Scroll reveal */
  useEffect(() => {
    const els = document.querySelectorAll('[data-ct-reveal]');
    const io = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const el = entry.target as HTMLElement;
          const delay = parseFloat(el.dataset.delay ?? '0');
          setTimeout(() => el.classList.add('ct-visible'), delay * 1000);
          io.unobserve(el);
        }
      });
    }, { threshold: 0.1, rootMargin: '-20px' });
    els.forEach(el => io.observe(el));
    return () => io.disconnect();
  }, []);

  const g = (k: string) => cms[k] ?? CT_DEFAULTS[k] ?? '';
  const services = g('ct:services').split(',').map(s => s.trim()).filter(Boolean);
  const faqs = [1, 2, 3, 4]
    .map(i => ({ q: g(`ct:faq${i}Q`), a: g(`ct:faq${i}A`) }))
    .filter(f => f.q);

  const contactItems = [
    { Icon: MessageCircle, iconColor: G.green,  bg: '#f0fdf4', border: '#bbf7d0', label: 'WhatsApp', line1: g('ct:waPhone'), href: g('ct:waHref'),           line2: g('ct:waNote') },
    { Icon: Mail,          iconColor: G.blue,   bg: '#eff6ff', border: '#dbeafe', label: 'Email',    line1: g('ct:email'),  href: `mailto:${g('ct:email')}`, line2: g('ct:emailNote') },
    { Icon: MapPin,        iconColor: G.orange, bg: '#fff7ed', border: '#fed7aa', label: 'Office',   line1: g('ct:office'), href: null,                       line2: g('ct:officeNote') },
    { Icon: Clock,         iconColor: G.purple, bg: '#faf5ff', border: '#e9d5ff', label: 'Hours',    line1: g('ct:hours'),  href: null,                       line2: g('ct:hoursNote') },
  ];

  /* Validation */
  const validate = (field: string, value: string) => {
    if (field === 'name'    && !value.trim())               return 'Name is required';
    if (field === 'email'   && !/\S+@\S+\.\S+/.test(value)) return 'Valid email required';
    if (field === 'phone'   && value.length < 8)            return 'Valid phone required';
    return '';
  };

  const handleBlur = (field: string) => {
    setFocused('');
    setTouched(t => ({ ...t, [field]: true }));
    setErrors(e => ({ ...e, [field]: validate(field, form[field as keyof typeof form]) }));
  };

  const handleChange = (field: string, value: string) => {
    setForm(f => ({ ...f, [field]: value }));
    if (field === 'message') setCharCount(value.length);
    if (touched[field]) {
      setErrors(e => ({ ...e, [field]: validate(field, value) }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: Record<string, string> = {};
    ['name', 'email', 'phone'].forEach(f => {
      const err = validate(f, form[f as keyof typeof form]);
      if (err) newErrors[f] = err;
    });
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setTouched({ name: true, email: true, phone: true });
      return;
    }
    setSubmitting(true);
    setTimeout(() => { setSent(true); setSubmitting(false); }, 800);
  };

  /* Input style factory */
  const inp = (name: string): React.CSSProperties => ({
    display: 'block', width: '100%', padding: '12px 14px',
    border: `1.5px solid ${
      errors[name] && touched[name] ? '#f43f5e'
      : focused === name ? G.blue
      : '#e2e8f0'
    }`,
    borderRadius: '10px', fontSize: '14px',
    color: '#0b0d20', background: focused === name ? '#fff' : '#f8faff',
    outline: 'none',
    boxShadow: focused === name ? `0 0 0 3px ${G.blue}18` : 'none',
    boxSizing: 'border-box',
    transition: 'border-color .15s ease, box-shadow .15s ease, background .15s ease',
    fontFamily: 'inherit',
  });

  /* Stat counters */
  const stats = [
    { num: '300+', label: 'Placed',          color: G.blue   },
    { num: '40%',  label: 'Avg Salary Hike', color: G.orange },
    { num: '9',    label: 'Days Fastest',    color: G.purple },
    { num: '₹0',   label: 'Upfront Cost',    color: G.green  },
  ];

  return (
    <PageLayout>

      {/* ═══ GLOBAL STYLES ═══ */}
      <style>{`
        /* CHANGED: removed @keyframes ct-grad (text-gradient animation) */
        @keyframes ct-float-up {
          0%,100% { transform: translateY(0); }
          50%     { transform: translateY(-8px); }
        }
        @keyframes ct-float-down {
          0%,100% { transform: translateY(0); }
          50%     { transform: translateY(8px); }
        }
        @keyframes ct-pulse-ring {
          0%   { transform: scale(1);   opacity: .5; }
          70%  { transform: scale(1.7); opacity: 0;  }
          100% { transform: scale(1.7); opacity: 0;  }
        }
        @keyframes ct-ticker-dot {
          0%,100% { opacity:1; transform:scale(1);   }
          50%     { opacity:.4; transform:scale(1.3); }
        }
        @keyframes ct-slide-up {
          from { opacity:0; transform:translateY(24px); }
          to   { opacity:1; transform:translateY(0);    }
        }
        @keyframes ct-shimmer {
          from { transform:translateX(-100%); }
          to   { transform:translateX(200%);  }
        }
        @keyframes ct-success-pop {
          0%   { transform:scale(0.7); opacity:0; }
          70%  { transform:scale(1.05); }
          100% { transform:scale(1);   opacity:1; }
        }
        @keyframes ct-bounce-arrow {
          0%,100% { transform:translateX(0);  }
          50%     { transform:translateX(4px); }
        }
        @keyframes ct-spin-slow {
          from { transform:rotate(0deg); }
          to   { transform:rotate(360deg); }
        }

        /* Reveal */
        [data-ct-reveal] {
          opacity: 0;
          transform: translateY(20px);
          transition: opacity .5s cubic-bezier(.22,1,.36,1), transform .5s cubic-bezier(.22,1,.36,1);
        }
        [data-ct-reveal].ct-visible {
          opacity: 1;
          transform: translateY(0);
        }

        /* Blobs */
        .ct-blob {
          position: absolute; border-radius: 50%; pointer-events: none;
        }

        /* Progress bar on submit button */
        .ct-btn-shimmer {
          position: relative; overflow: hidden;
        }
        .ct-btn-shimmer::after {
          content: '';
          position: absolute; inset: 0;
          background: linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.2) 50%, transparent 100%);
          animation: ct-shimmer 1.5s ease infinite;
        }

        /* Responsive */
        .ct-layout       { display:grid; grid-template-columns:1fr 360px; gap:28px; align-items:start; }
        .ct-row2         { display:grid; grid-template-columns:1fr 1fr; gap:16px; }
        .ct-faq-grid     { display:grid; grid-template-columns:1fr 1fr; gap:16px; max-width:920px; margin:0 auto; }
        .ct-stats-strip  { display:grid; grid-template-columns:repeat(4,1fr); }

        @media (max-width: 900px) {
          .ct-layout      { grid-template-columns:1fr; }
          .ct-faq-grid    { grid-template-columns:1fr; }
          .ct-stats-strip { grid-template-columns:repeat(2,1fr); }
        }
        @media (max-width: 560px) {
          .ct-row2        { grid-template-columns:1fr; }
          .ct-stats-strip { grid-template-columns:repeat(2,1fr); }
        }
      `}</style>

      {/* ═══════════════════════ HERO ═══════════════════════ */}
      <section style={{ position: 'relative', paddingTop: 'calc(64px + 56px)', paddingBottom: 0, background: '#f8faff', overflow: 'hidden' }}>

        {/* Orbs */}
        <div className="ct-blob" style={{ top: '-120px', left: '-100px', width: '480px', height: '480px', background: `radial-gradient(circle,${G.blue}18 0%,transparent 70%)`, filter: 'blur(80px)' }} />
        <div className="ct-blob" style={{ top: '20px', right: '-80px', width: '380px', height: '380px', background: `radial-gradient(circle,${G.orange}14 0%,transparent 70%)`, filter: 'blur(90px)' }} />
        <div className="ct-blob" style={{ bottom: '-60px', left: '30%', width: '300px', height: '300px', background: `radial-gradient(circle,${G.purple}12 0%,transparent 70%)`, filter: 'blur(80px)' }} />

        <div className="container" style={{ position: 'relative', zIndex: 1 }}>

          {/* Breadcrumb */}
          <nav
            data-ct-reveal data-delay="0"
            style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px', color: '#94a3b8', marginBottom: '28px' }}
          >
            <a href="/" style={{ color: '#94a3b8', textDecoration: 'none', transition: 'color .15s' }}
              onMouseEnter={e => (e.currentTarget.style.color = G.blue)}
              onMouseLeave={e => (e.currentTarget.style.color = '#94a3b8')}
            >Home</a>
            <span style={{ color: '#cbd5e1' }}>›</span>
            <span style={{ color: '#475569', fontWeight: 500 }}>Contact</span>
          </nav>

          <div style={{ maxWidth: '760px' }}>

            {/* Eyebrow */}
            <div data-ct-reveal data-delay="0.02">
              <SectionLabel text={g('ct:heroTag')} />
            </div>

            {/* Heading — CHANGED: gradient <GradText> → plain orange span */}
            <h1
              data-ct-reveal
              data-delay="0.06"
              style={{ fontSize: 'clamp(2.2rem,4.5vw,3.6rem)', fontWeight: 900, lineHeight: 1.08, letterSpacing: '-1.5px', color: '#0b0d20', marginBottom: '20px' }}
            >
              {g('ct:heroTitle')}{' '}
              <span style={{ color: G.orange }}>{g('ct:heroTitleGrad')}</span>
              {' '}{g('ct:heroTitleEnd')}
            </h1>

            {/* Subtitle */}
            <p data-ct-reveal data-delay="0.10" style={{ fontSize: '16px', color: '#64748b', lineHeight: 1.75, maxWidth: '520px', marginBottom: '28px' }}>
              {g('ct:heroSubtitle')}
            </p>

            {/* Live ticker */}
            <div
              data-ct-reveal data-delay="0.13"
              style={{
                display: 'inline-flex', alignItems: 'center', gap: '10px',
                background: '#fff', border: '1px solid #e2e8f0',
                borderRadius: '999px', padding: '6px 14px 6px 8px',
                marginBottom: '28px', boxShadow: '0 2px 10px rgba(0,0,0,0.05)',
                maxWidth: '100%', overflow: 'hidden',
              }}
            >
              <span style={{
                display: 'inline-flex', alignItems: 'center', gap: '5px',
                fontSize: '9.5px', fontWeight: 800, color: '#ef4444',
                background: '#fef2f2', padding: '3px 8px', borderRadius: '999px', flexShrink: 0,
              }}>
                <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#ef4444', animation: 'ct-ticker-dot 1.4s ease-in-out infinite', display: 'inline-block' }} />
                LIVE
              </span>
              <span style={{
                fontSize: '12px', fontWeight: 600, color: '#374151',
                whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis',
                opacity: tickerVisible ? 1 : 0,
                transform: tickerVisible ? 'translateY(0)' : 'translateY(4px)',
                transition: 'opacity .3s ease, transform .3s ease',
              }}>
                {LIVE_ACTIVITY[tickerIdx]}
              </span>
            </div>

            {/* CTAs */}
            <div data-ct-reveal data-delay="0.16" style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', marginBottom: '60px' }}>
              <a
                href={g('ct:heroWaHref')}
                target="_blank" rel="noopener noreferrer"
                style={{
                  display: 'inline-flex', alignItems: 'center', gap: '8px',
                  background: '#25D366', color: '#fff',
                  fontWeight: 700, fontSize: '14px',
                  padding: '14px 28px', borderRadius: '999px',
                  textDecoration: 'none',
                  boxShadow: '0 8px 24px rgba(37,211,102,0.35)',
                  transition: 'transform .15s ease, box-shadow .2s ease',
                }}
                onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 12px 30px rgba(37,211,102,0.45)'; }}
                onMouseLeave={e => { e.currentTarget.style.transform = ''; e.currentTarget.style.boxShadow = '0 8px 24px rgba(37,211,102,0.35)'; }}
              >
                <MessageCircle size={15} /> {g('ct:heroPrimary')}
              </a>
              <a
                href="#contact-form"
                style={{
                  display: 'inline-flex', alignItems: 'center', gap: '8px',
                  background: '#fff', color: '#374151',
                  fontWeight: 600, fontSize: '14px',
                  padding: '14px 28px', borderRadius: '999px',
                  textDecoration: 'none', border: '1.5px solid #e2e8f0',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
                  transition: 'all .15s ease',
                }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = G.blue; e.currentTarget.style.color = G.blue; e.currentTarget.style.transform = 'translateY(-2px)'; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = '#e2e8f0'; e.currentTarget.style.color = '#374151'; e.currentTarget.style.transform = ''; }}
              >
                {g('ct:heroSecondary')} <ArrowRight size={14} style={{ animation: 'ct-bounce-arrow 1.5s ease-in-out infinite' }} />
              </a>
            </div>
          </div>

          {/* Stats strip — CHANGED: gradient numbers → plain colored bold */}
          <div className="ct-stats-strip" style={{ borderTop: '1px solid #eef2ff' }}>
            {stats.map((s, i) => (
              <div
                key={s.label}
                data-ct-reveal
                data-delay={`${0.18 + i * 0.04}`}
                style={{
                  textAlign: 'center', padding: '28px 12px',
                  borderRight: i < stats.length - 1 ? '1px solid #eef2ff' : 'none',
                  cursor: 'default', transition: 'background .2s ease',
                }}
                onMouseEnter={e => (e.currentTarget.style.background = '#fff')}
                onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
              >
                <div style={{
                  fontSize: '1.8rem', fontWeight: 900, lineHeight: 1, marginBottom: '5px',
                  color: s.color,
                }}>{s.num}</div>
                <div style={{ fontSize: '11.5px', color: '#94a3b8', fontWeight: 600 }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════ FORM + SIDEBAR ═══════════════════════ */}
      <section style={{ background: '#f8faff', padding: '72px 0' }} id="contact-form">
        <div className="container">
          <div className="ct-layout">

            {/* ── FORM CARD ── */}
            <div
              data-ct-reveal data-delay="0.04"
              style={{
                background: '#fff', borderRadius: '24px',
                border: '1px solid #eef2ff',
                boxShadow: '0 4px 32px rgba(37,99,235,0.07)',
                overflow: 'hidden',
              }}
            >
              {sent ? (
                /* Success state */
                <div style={{ padding: '72px 40px', textAlign: 'center' }}>
                  <div style={{ animation: 'ct-success-pop .6s cubic-bezier(.22,1,.36,1)', display: 'inline-block', marginBottom: '20px' }}>
                    <div style={{
                      width: '72px', height: '72px', borderRadius: '50%',
                      background: '#f0fdf4', border: '3px solid #bbf7d0',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      margin: '0 auto',
                    }}>
                      <CheckCircle2 size={36} color={G.green} />
                    </div>
                  </div>
                  <div style={{ fontSize: '24px', fontWeight: 900, color: '#0b0d20', marginBottom: '10px' }}>
                    {g('ct:successTitle')}
                  </div>
                  <div style={{ color: '#64748b', fontSize: '14px', lineHeight: 1.75, marginBottom: '32px', maxWidth: '340px', margin: '0 auto 32px' }}>
                    {g('ct:successSub')}
                  </div>
                  <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
                    <a
                      href={g('ct:waHref')}
                      target="_blank" rel="noopener noreferrer"
                      style={{
                        display: 'inline-flex', alignItems: 'center', gap: '8px',
                        background: '#25D366', color: '#fff',
                        fontWeight: 700, fontSize: '14px',
                        padding: '13px 26px', borderRadius: '999px',
                        textDecoration: 'none', boxShadow: '0 6px 20px rgba(37,211,102,0.3)',
                      }}
                    >
                      <MessageCircle size={15} /> WhatsApp Us
                    </a>
                    <button
                      onClick={() => { setSent(false); setForm({ name:'',email:'',phone:'',service:'',message:'' }); setTouched({}); setErrors({}); }}
                      style={{
                        display: 'inline-flex', alignItems: 'center', gap: '8px',
                        background: '#f8faff', color: '#374151',
                        fontWeight: 600, fontSize: '14px',
                        padding: '13px 26px', borderRadius: '999px',
                        border: '1.5px solid #e2e8f0', cursor: 'pointer', fontFamily: 'inherit',
                      }}
                    >
                      Send Another
                    </button>
                  </div>
                </div>
              ) : (
                /* Form */
                <div style={{ padding: '40px' }}>
                  {/* Form header — CHANGED: gradient "Your Goals" → plain orange */}
                  <div style={{ marginBottom: '28px' }}>
                    <SectionLabel text="Contact Form" />
                    <h2 style={{ fontSize: 'clamp(1.4rem,2.5vw,1.9rem)', fontWeight: 900, color: '#0b0d20', lineHeight: 1.15, marginBottom: '6px', letterSpacing: '-0.5px' }}>
                      {g('ct:formTitle')}{' '}
                      <span style={{ color: G.orange }}>{g('ct:formTitleGrad')}</span>
                    </h2>
                    <p style={{ fontSize: '13px', color: '#64748b' }}>{g('ct:formSubtitle')}</p>
                  </div>

                  <form onSubmit={handleSubmit} noValidate>

                    {/* Name + Phone */}
                    <div className="ct-row2" style={{ marginBottom: '0' }}>
                      <div style={{ marginBottom: '16px' }}>
                        <label style={{ display: 'block', fontSize: '11px', fontWeight: 700, color: '#374151', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '6px' }}>
                          Full Name <span style={{ color: G.rose }}>*</span>
                        </label>
                        <input
                          style={inp('name')}
                          required
                          placeholder="Your full name"
                          value={form.name}
                          onFocus={() => setFocused('name')}
                          onBlur={() => handleBlur('name')}
                          onChange={e => handleChange('name', e.target.value)}
                        />
                        {errors.name && touched.name && (
                          <p style={{ fontSize: '11px', color: G.rose, marginTop: '4px' }}>{errors.name}</p>
                        )}
                      </div>
                      <div style={{ marginBottom: '16px' }}>
                        <label style={{ display: 'block', fontSize: '11px', fontWeight: 700, color: '#374151', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '6px' }}>
                          Phone <span style={{ color: G.rose }}>*</span>
                        </label>
                        <input
                          style={inp('phone')}
                          required type="tel"
                          placeholder="+91 XXXXX XXXXX"
                          value={form.phone}
                          onFocus={() => setFocused('phone')}
                          onBlur={() => handleBlur('phone')}
                          onChange={e => handleChange('phone', e.target.value)}
                        />
                        {errors.phone && touched.phone && (
                          <p style={{ fontSize: '11px', color: G.rose, marginTop: '4px' }}>{errors.phone}</p>
                        )}
                      </div>
                    </div>

                    {/* Email */}
                    <div style={{ marginBottom: '16px' }}>
                      <label style={{ display: 'block', fontSize: '11px', fontWeight: 700, color: '#374151', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '6px' }}>
                        Email <span style={{ color: G.rose }}>*</span>
                      </label>
                      <input
                        style={inp('email')}
                        required type="email"
                        placeholder="you@email.com"
                        value={form.email}
                        onFocus={() => setFocused('email')}
                        onBlur={() => handleBlur('email')}
                        onChange={e => handleChange('email', e.target.value)}
                      />
                      {errors.email && touched.email && (
                        <p style={{ fontSize: '11px', color: G.rose, marginTop: '4px' }}>{errors.email}</p>
                      )}
                    </div>

                    {/* Service select */}
                    <div style={{ marginBottom: '16px' }}>
                      <label style={{ display: 'block', fontSize: '11px', fontWeight: 700, color: '#374151', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '6px' }}>
                        I&apos;m Interested In
                      </label>
                      <div style={{ position: 'relative' }}>
                        <select
                          style={{ ...inp('service'), cursor: 'pointer', appearance: 'none', paddingRight: '36px' }}
                          value={form.service}
                          onFocus={() => setFocused('service')}
                          onBlur={() => setFocused('')}
                          onChange={e => handleChange('service', e.target.value)}
                        >
                          <option value="">Select a service…</option>
                          {services.map(s => <option key={s}>{s}</option>)}
                        </select>
                        <ChevronDown
                          size={14} color="#94a3b8"
                          style={{ position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }}
                        />
                      </div>
                    </div>

                    {/* Message */}
                    <div style={{ marginBottom: '24px' }}>
                      <label style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', fontWeight: 700, color: '#374151', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '6px' }}>
                        <span>Message</span>
                        <span style={{ color: charCount > 400 ? G.rose : '#94a3b8', fontWeight: 500, textTransform: 'none', letterSpacing: 0 }}>
                          {charCount}/500
                        </span>
                      </label>
                      <textarea
                        style={{ ...inp('message'), resize: 'vertical', minHeight: '120px' } as React.CSSProperties}
                        placeholder="Your current role, target role, goals, or any questions…"
                        maxLength={500}
                        value={form.message}
                        onFocus={() => setFocused('message')}
                        onBlur={() => setFocused('')}
                        onChange={e => handleChange('message', e.target.value)}
                      />
                    </div>

                    {/* Submit */}
                    <button
                      type="submit"
                      disabled={submitting}
                      className={submitting ? 'ct-btn-shimmer' : ''}
                      style={{
                        display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
                        width: '100%', padding: '15px',
                        backgroundImage: submitting ? 'none' : `linear-gradient(135deg,${G.orange},${G.rose})`,
                        background: submitting ? '#e2e8f0' : undefined,
                        color: submitting ? '#94a3b8' : '#fff',
                        fontWeight: 700, fontSize: '15px',
                        fontFamily: 'inherit', border: 'none', borderRadius: '12px',
                        cursor: submitting ? 'not-allowed' : 'pointer',
                        boxShadow: submitting ? 'none' : `0 8px 24px ${G.orange}35`,
                        transition: 'all .2s ease',
                      }}
                      onMouseEnter={e => { if (!submitting) e.currentTarget.style.transform = 'translateY(-1px)'; }}
                      onMouseLeave={e => { e.currentTarget.style.transform = ''; }}
                    >
                      {submitting ? (
                        <>
                          <span style={{ width: '16px', height: '16px', border: '2px solid #94a3b8', borderTopColor: 'transparent', borderRadius: '50%', animation: 'ct-spin-slow .7s linear infinite', display: 'inline-block' }} />
                          Sending…
                        </>
                      ) : (
                        <>
                          <Send size={15} /> {g('ct:formSubmitBtn')}
                        </>
                      )}
                    </button>

                    <p style={{ fontSize: '11px', color: '#94a3b8', textAlign: 'center', marginTop: '12px', marginBottom: 0 }}>
                      <Shield size={10} style={{ display: 'inline', marginRight: '4px', verticalAlign: 'middle' }} />
                      {g('ct:formFooter')}
                    </p>
                  </form>
                </div>
              )}
            </div>

            {/* ── SIDEBAR ── */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>

              {/* Contact methods */}
              <div
                data-ct-reveal data-delay="0.08"
                style={{
                  background: '#fff', borderRadius: '20px',
                  border: '1px solid #eef2ff', padding: '24px',
                  boxShadow: '0 4px 20px rgba(0,0,0,0.05)',
                }}
              >
                <div style={{ marginBottom: '16px' }}>
                  <SectionLabel text="Reach Us" />
                  <div style={{ fontSize: '15px', fontWeight: 800, color: '#0b0d20' }}>Reach Us Directly</div>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  {contactItems.map(item => (
                    <ContactCard key={item.label} {...item} />
                  ))}
                </div>
              </div>

              {/* Promise card */}
              <div
                data-ct-reveal data-delay="0.12"
                style={{
                  position: 'relative', overflow: 'hidden',
                  background: 'linear-gradient(135deg,#0b0d20 0%,#1a1040 50%,#0d1836 100%)',
                  borderRadius: '20px', padding: '28px',
                  boxShadow: `0 8px 28px ${G.blue}25`,
                }}
              >
                <div style={{ position: 'absolute', top: '-40px', right: '-40px', width: '160px', height: '160px', borderRadius: '50%', background: `radial-gradient(circle,${G.blue}35 0%,transparent 70%)`, pointerEvents: 'none' }} />
                <div style={{ position: 'absolute', bottom: '-30px', left: '-30px', width: '130px', height: '130px', borderRadius: '50%', background: `radial-gradient(circle,${G.orange}30 0%,transparent 70%)`, pointerEvents: 'none' }} />
                <div style={{ position: 'relative', zIndex: 1 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
                    <div style={{ width: '36px', height: '36px', borderRadius: '10px', background: 'rgba(255,255,255,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <Shield size={18} color="#fff" />
                    </div>
                    <div style={{ fontSize: '15px', fontWeight: 800, color: '#fff' }}>Our Promise</div>
                  </div>
                  <p style={{ fontSize: '13px', lineHeight: 1.7, color: 'rgba(255,255,255,0.75)', margin: 0 }}>
                    {g('ct:promise')}
                  </p>
                  <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginTop: '16px' }}>
                    {['Zero Upfront', 'No Hard Sell', 'Honest Advice'].map(tag => (
                      <span key={tag} style={{
                        fontSize: '10px', fontWeight: 700, color: '#fff',
                        background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)',
                        borderRadius: '999px', padding: '3px 10px',
                      }}>
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Quick-call nudge */}
              <div
                data-ct-reveal data-delay="0.16"
                style={{
                  borderRadius: '20px', padding: '22px',
                  background: `linear-gradient(135deg,${G.green}12,${G.green}06)`,
                  border: `1px solid ${G.green}25`,
                  display: 'flex', alignItems: 'center', gap: '14px',
                }}
              >
                <div style={{ position: 'relative', flexShrink: 0 }}>
                  <div style={{ position: 'absolute', inset: 0, borderRadius: '50%', background: G.green, animation: 'ct-pulse-ring 1.8s ease-out infinite', opacity: 0.3 }} />
                  <div style={{ width: '42px', height: '42px', borderRadius: '50%', background: G.green, display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', zIndex: 1 }}>
                    <Phone size={18} color="#fff" />
                  </div>
                </div>
                <div>
                  <div style={{ fontSize: '13px', fontWeight: 700, color: '#0f172a', marginBottom: '2px' }}>Prefer a call?</div>
                  <div style={{ fontSize: '11.5px', color: '#64748b', lineHeight: 1.5 }}>
                    WhatsApp us — we respond in{' '}
                    <span style={{ color: G.green, fontWeight: 700 }}>under 1 hour</span>
                  </div>
                </div>
              </div>

              {/* Trust badges */}
              <div
                data-ct-reveal data-delay="0.20"
                style={{
                  background: '#fff', borderRadius: '20px',
                  border: '1px solid #eef2ff', padding: '20px',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
                }}
              >
                <div style={{ fontSize: '11px', fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '12px' }}>Trusted by professionals</div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
                  {[
                    { icon: <Zap size={13} color={G.orange} />, text: '300+ Placed' },
                    { icon: <CheckCircle2 size={13} color={G.green} />, text: 'Zero Upfront' },
                    { icon: <Rocket size={13} color={G.blue} />, text: '40% Avg Hike' },
                    { icon: <Sparkles size={13} color={G.purple} />, text: '9-Day Fastest' },
                  ].map(b => (
                    <div key={b.text} style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px', fontWeight: 600, color: '#374151' }}>
                      {b.icon} {b.text}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════ FAQ ═══════════════════════ */}
      <section style={{ background: '#fff', padding: '80px 0' }}>
        <div className="container">

          <div data-ct-reveal style={{ textAlign: 'center', marginBottom: '48px' }}>
            <SectionLabel text="Quick Answers" center />
            {/* CHANGED: split "Questions" + gradient "Questions" → plain orange "Questions" */}
            <h2 style={{ fontSize: 'clamp(1.6rem,2.8vw,2.3rem)', fontWeight: 900, color: '#0b0d20', lineHeight: 1.12, letterSpacing: '-0.5px' }}>
              {g('ct:faqSectionTitle').split(' ').slice(0, -1).join(' ')}{' '}
              <span style={{ color: G.orange }}>{g('ct:faqSectionTitle').split(' ').slice(-1)[0]}</span>
            </h2>
            <p style={{ fontSize: '14px', color: '#64748b', marginTop: '8px', maxWidth: '400px', margin: '8px auto 0' }}>
              Everything you need to know before reaching out.
            </p>
          </div>

          <div className="ct-faq-grid">
            {faqs.map((faq, i) => (
              <div key={faq.q} data-ct-reveal data-delay={`${i * 0.05}`}>
                <FaqItem q={faq.q} a={faq.a} index={i} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════ DARK CTA BANNER ═══════════════════════ */}
      <section style={{ background: '#f8faff', padding: '80px 0' }}>
        <div className="container">
          <div
            data-ct-reveal
            style={{
              position: 'relative', borderRadius: '28px', overflow: 'hidden',
              padding: 'clamp(40px,6vw,72px) clamp(24px,6vw,80px)',
              textAlign: 'center',
              background: 'linear-gradient(135deg,#0b0d20 0%,#1a1040 50%,#0d1836 100%)',
            }}
          >
            <div style={{ position: 'absolute', top: '-80px', left: '10%', width: '300px', height: '300px', borderRadius: '50%', background: `radial-gradient(circle,${G.blue}35 0%,transparent 70%)`, filter: 'blur(60px)', pointerEvents: 'none' }} />
            <div style={{ position: 'absolute', bottom: '-60px', right: '8%', width: '260px', height: '260px', borderRadius: '50%', background: `radial-gradient(circle,${G.orange}30 0%,transparent 70%)`, filter: 'blur(60px)', pointerEvents: 'none' }} />

            <div style={{ position: 'relative', zIndex: 1 }}>
              <SectionLabel text="Take the First Step" center light />
              {/* CHANGED: gradient "Your Next Role Is Waiting." → plain white bold */}
              <h2 style={{
                fontSize: 'clamp(1.7rem,3.5vw,2.6rem)', fontWeight: 900, lineHeight: 1.15,
                letterSpacing: '-0.6px', marginBottom: '14px',
                color: '#fff',
              }}>
                Your Next Role Is Waiting.
              </h2>
              <p style={{ fontSize: '15px', color: 'rgba(255,255,255,0.6)', maxWidth: '420px', margin: '0 auto 36px', lineHeight: 1.75 }}>
                Join 300+ professionals who trusted Placedly with their career. Zero upfront — you only pay after you&apos;re placed.
              </p>
              <div style={{ display: 'flex', gap: '14px', justifyContent: 'center', flexWrap: 'wrap' }}>
                <a
                  href="#contact-form"
                  style={{
                    display: 'inline-flex', alignItems: 'center', gap: '8px',
                    backgroundImage: `linear-gradient(135deg,${G.blue},${G.indigo})`,
                    color: '#fff', fontWeight: 700, fontSize: '14px',
                    padding: '15px 32px', borderRadius: '999px', textDecoration: 'none',
                    boxShadow: `0 8px 28px ${G.blue}50`,
                    transition: 'transform .15s ease',
                  }}
                  onMouseEnter={e => (e.currentTarget.style.transform = 'translateY(-2px)')}
                  onMouseLeave={e => (e.currentTarget.style.transform = '')}
                >
                  <Rocket size={15} /> Get Started Free
                </a>
                <a
                  href={g('ct:waHref')}
                  target="_blank" rel="noopener noreferrer"
                  style={{
                    display: 'inline-flex', alignItems: 'center', gap: '8px',
                    background: '#25D366', color: '#fff', fontWeight: 700, fontSize: '14px',
                    padding: '15px 32px', borderRadius: '999px', textDecoration: 'none',
                    boxShadow: '0 8px 28px rgba(37,211,102,0.35)',
                    transition: 'transform .15s ease',
                  }}
                  onMouseEnter={e => (e.currentTarget.style.transform = 'translateY(-2px)')}
                  onMouseLeave={e => (e.currentTarget.style.transform = '')}
                >
                  <MessageCircle size={15} /> WhatsApp Now
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

    </PageLayout>
  );
}