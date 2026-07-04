'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  GraduationCap, FileText, User, CheckCircle2, BookOpen, Bell,
  Globe, MessageCircle, Zap, DollarSign, Sparkles,
} from 'lucide-react';
import PageLayout from '../components/PageLayout';

/* ========================================================================
   DESIGN SYSTEM TOKENS
   ======================================================================== */
const BRAND = ['#2563eb', '#7c8ff0', '#fb923c', '#f43f5e', '#a855f7'];
const EASE = [0.22, 1, 0.36, 1] as const;

/* Modern Geometric Sans-Serif stack — FORCED site-wide on this page */
const FONT_STACK = `"Outfit", "Poppins", "Inter", "Manrope", "Geist", "Plus Jakarta Sans", -apple-system, BlinkMacSystemFont, "Segoe UI", system-ui, sans-serif`;

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
  { icon: 'GraduationCap', title: 'University & Course Shortlisting', desc: 'We match your profile, budget & goals to the right programme across 140+ institutions worldwide.' },
  { icon: 'FileText', title: 'Application Management', desc: 'Upload documents once — apply to multiple universities through a single streamlined process.' },
  { icon: 'User', title: 'Dedicated Account Manager', desc: 'Your personal advisor from first enquiry to confirmed enrolment — always available.' },
  { icon: 'CheckCircle2', title: 'Visa Guidance & Documentation', desc: 'Expert support on student visa requirements, documentation, and submission for all 4 destinations.' },
  { icon: 'BookOpen', title: '50,000+ Course Knowledge Base', desc: 'Comprehensive destination info, compliance requirements, scholarships & intake deadlines.' },
  { icon: 'Bell', title: 'Real-Time Application Updates', desc: 'Stay informed on your application status, university responses & visa progress at every step.' },
];

const POINT_ICONS = [Zap, GraduationCap, User, CheckCircle2, DollarSign];

const STATS = [
  { icon: Globe, value: '140+', label: 'Partner Universities' },
  { icon: GraduationCap, value: '4', label: 'Study Destinations' },
  { icon: Bell, value: '24hr', label: 'Response Time' },
  { icon: BookOpen, value: '50K+', label: 'Courses Indexed' },
];

/* ========================================================================
   PRIMITIVES
   ======================================================================== */

function AmbientBlobs({ opacityScale = 1 }: { opacityScale?: number }) {
  return (
    <>
      <motion.div
        aria-hidden
        style={{
          position: 'absolute', top: '-10%', left: '-8%', width: 420, height: 420,
          borderRadius: '50%',
          background: `radial-gradient(circle, rgba(37,99,235,${0.13 * opacityScale}) 0%, transparent 70%)`,
          filter: 'blur(110px)', pointerEvents: 'none', zIndex: 0,
        }}
        animate={{ x: [0, 40, 0], y: [0, 30, 0] }}
        transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        aria-hidden
        style={{
          position: 'absolute', bottom: '-12%', right: '-6%', width: 460, height: 460,
          borderRadius: '50%',
          background: `radial-gradient(circle, rgba(249,115,22,${0.12 * opacityScale}) 0%, transparent 70%)`,
          filter: 'blur(120px)', pointerEvents: 'none', zIndex: 0,
        }}
        animate={{ x: [0, -30, 0], y: [0, -40, 0] }}
        transition={{ duration: 16, repeat: Infinity, ease: 'easeInOut' }}
      />
    </>
  );
}

function Eyebrow({ children, center = false, dark = false }: { children: React.ReactNode; center?: boolean; dark?: boolean }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 10, justifyContent: center ? 'center' : 'flex-start', marginBottom: 16 }}>
      <span style={{ width: 20, height: 3, borderRadius: 999, background: '#0b0d20', flexShrink: 0, opacity: 0.5 }} />
      <span style={{
        fontSize: 11.5, fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.12em',
        color: dark ? '#ffffff' : '#0b0d20',
        whiteSpace: 'nowrap',
      }}>{children}</span>
      <span style={{ width: 20, height: 3, borderRadius: 999, background: '#0b0d20', flexShrink: 0, opacity: 0.5 }} />
    </div>
  );
}

function PlainHeading({
  children, size = 'clamp(1.8rem, 4vw, 2.75rem)', align = 'left', as: Tag = 'h2', dark = false,
}: {
  children: React.ReactNode;
  size?: string;
  align?: 'left' | 'center' | 'right';
  as?: React.ElementType;
  dark?: boolean;
}) {
  const Comp = Tag as React.ElementType;
  return (
    <Comp style={{
      fontSize: size, fontWeight: 900, letterSpacing: '-0.02em', lineHeight: 1.1,
      textAlign: align, margin: 0, color: dark ? '#ffffff' : '#0b0d20',
    }}>{children}</Comp>
  );
}

/* CHANGED: pill-shaped button with plain black background.
   Was: linear-gradient(135deg,#2563eb,#7c8ff0) — now: solid #0b0d20 black. */
function PrimaryButton({ href, children, icon: Icon }: { href: string; children: React.ReactNode; icon?: any }) {
  return (
    <motion.a
      href={href}
      whileHover={{ y: -3 }} whileTap={{ y: 0, scale: 0.98 }}
      style={{
        display: 'inline-flex', alignItems: 'center', gap: 8, textDecoration: 'none',
        background: '#0b0d20', color: '#ffffff',
        fontWeight: 700, fontSize: 15, padding: '14px 32px', borderRadius: 999,
        boxShadow: '0 8px 24px rgba(0,0,0,0.25)',
      }}
    >
      {Icon && <Icon size={16} />}
      {children}
      <motion.span animate={{ x: [0, 4, 0] }} transition={{ duration: 1.4, repeat: Infinity, ease: 'easeInOut' }}>→</motion.span>
    </motion.a>
  );
}

/* CHANGED: pill-shaped ghost button — was gradient outline, now plain white/dark surface */
function GhostButton({ href, children, icon: Icon, dark = false }: { href: string; children: React.ReactNode; icon?: any; dark?: boolean }) {
  const external = typeof href === 'string' && href.startsWith('http');
  return (
    <motion.a
      href={href} target={external ? '_blank' : undefined} rel={external ? 'noopener noreferrer' : undefined}
      whileHover={{ y: -2 }} whileTap={{ y: 0 }}
      style={{
        display: 'inline-flex', alignItems: 'center', gap: 8, textDecoration: 'none',
        background: dark ? 'rgba(255,255,255,0.08)' : '#ffffff', color: dark ? '#fff' : '#0f172a',
        fontWeight: 700, fontSize: 15, padding: '13px 30px', borderRadius: 999,
        border: dark ? '1.5px solid rgba(255,255,255,0.25)' : '1.5px solid #e2e8f0',
      }}
    >
      {Icon && <Icon size={16} />}
      {children}
    </motion.a>
  );
}

function BrandCard({ index, accent, children, onClick, selected, as = 'div' }: {
  index: number; accent: string; children: React.ReactNode;
  onClick?: () => void; selected?: boolean; as?: keyof typeof motion;
}) {
  const Comp: any = motion[as as 'div'] ?? motion.div;
  return (
    <Comp
      onClick={onClick}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.55, ease: EASE, delay: index * 0.08 }}
      whileHover={{ y: -6 }}
      className="brand-card"
      style={{
        position: 'relative', background: '#fff', borderRadius: 22,
        border: selected ? `1.5px solid ${accent}` : '1px solid rgba(15,23,42,0.06)',
        padding: '30px 24px', overflow: 'hidden', textAlign: onClick ? 'center' : 'left',
        boxShadow: selected ? `0 20px 50px ${accent}22` : '0 8px 28px rgba(15,23,42,0.06)',
        cursor: onClick ? 'pointer' : 'default', width: '100%',
      }}
    >
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0, height: 3,
        background: '#0b0d20', opacity: 0.15,
      }} />
      <div style={{
        position: 'absolute', right: 10, bottom: -22, fontSize: 92, fontWeight: 900, lineHeight: 1,
        color: '#0b0d20', opacity: 0.05,
        userSelect: 'none', pointerEvents: 'none',
      }}>{String(index + 1).padStart(2, '0')}</div>

      {selected && (
        <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} style={{
          position: 'absolute', top: 12, right: 12, width: 22, height: 22, borderRadius: '50%',
          background: '#0b0d20', display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          <CheckCircle2 size={13} color="#fff" />
        </motion.div>
      )}
      <div style={{ position: 'relative', zIndex: 1 }}>{children}</div>
    </Comp>
  );
}

function StatsStrip() {
  return (
    <div className="stats-strip">
      {STATS.map((s, i) => (
        <motion.div
          key={s.label}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: EASE, delay: i * 0.08 }}
          style={{ display: 'flex', alignItems: 'center', gap: 14 }}
        >
          <div style={{
            width: 44, height: 44, borderRadius: 12, background: `${BRAND[i % BRAND.length]}20`,
            display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
          }}>
            <s.icon size={20} color={BRAND[i % BRAND.length]} />
          </div>
          <div>
            <div style={{ fontSize: '1.5rem', fontWeight: 900, lineHeight: 1, color: '#ffffff' }}>{s.value}</div>
            <div style={{ fontSize: 12, fontWeight: 600, color: 'rgba(255,255,255,0.5)', marginTop: 2 }}>{s.label}</div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}

function ApplyTimeline({ points }: { points: string[] }) {
  return (
    <div>
      {points.map((text, i) => {
        const color = BRAND[i % BRAND.length];
        const isLast = i === points.length - 1;
        const PointIcon = POINT_ICONS[i % POINT_ICONS.length];
        return (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: EASE, delay: i * 0.09 }}
            style={{ display: 'flex', gap: 14 }}
          >
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <div style={{
                width: 34, height: 34, borderRadius: '50%', background: `${color}15`, color,
                fontWeight: 800, fontSize: 13, display: 'flex', alignItems: 'center', justifyContent: 'center',
                border: `1.5px solid ${color}40`, flexShrink: 0,
              }}>
                <PointIcon size={14} />
              </div>
              {!isLast && (
                <div style={{ width: 2, flex: 1, minHeight: 22, background: `${color}30` }} />
              )}
            </div>
            <div style={{ paddingBottom: 22, paddingTop: 6 }}>
              <span style={{ fontSize: 14, color: '#374151', fontWeight: 500 }}>{text}</span>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}

/* ========================================================================
   FORM INPUT STYLES
   ======================================================================== */
const inputS: React.CSSProperties = {
  display: 'block', width: '100%', padding: '11px 14px',
  border: '1.5px solid #e2e8f0', borderRadius: '10px', fontSize: '14px',
  color: '#0f172a',
  outline: 'none', boxShadow: 'none', appearance: 'none' as const,
  WebkitAppearance: 'none' as const, margin: 0, boxSizing: 'border-box' as const,
  transition: 'border-color .2s, box-shadow .2s, background .2s',
};

const labelS: React.CSSProperties = {
  display: 'block', fontSize: '11px', fontWeight: 700,
  color: '#94a3b8', letterSpacing: '0.08em', textTransform: 'uppercase' as const,
  marginBottom: '6px', padding: 0, background: 'none', border: 'none',
};

/* ========================================================================
   PAGE
   ======================================================================== */
export default function StudyVisaPage() {
  const [focused, setFocused] = useState('');
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({
    name: '', phone: '', email: '', country: '',
    course: '', qualification: '', intake: '', budget: '', notes: '',
  });

  const [hero, setHero] = useState({
    tag: 'Study Abroad',
    title: 'Your Global Education Journey Starts Here.',
    subtitle: 'Access to 140+ world-class universities across UK, France, Germany & Dubai — with expert guidance from application to visa.',
    cta1: 'Apply Now',
    cta2: 'WhatsApp Us',
    waHref: 'https://wa.me/919876543210',
  });
  const [dest, setDest] = useState({ eyebrow: 'Destinations', heading: '4 Countries. Endless Opportunities.' });
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
          if (p.hero) setHero(prev => ({ ...prev, ...p.hero }));
          if (p.dest) setDest(prev => ({ ...prev, ...p.dest }));
          if (p.featHeading) setFeatHeading(p.featHeading);
          if (p.apply) setApply(prev => ({ ...prev, ...p.apply }));
          if (Array.isArray(p.applyPoints) && p.applyPoints.length) setApplyPoints(p.applyPoints);
          if (Array.isArray(p.countries) && p.countries.length) setCountries(p.countries);
          if (Array.isArray(p.features) && p.features.length) {
            setFeatures(p.features.map((f: { icon?: string; title?: string; desc?: string }) => ({
              icon: f.icon && ICON_MAP[f.icon] ? f.icon : 'GraduationCap',
              title: f.title ?? '',
              desc: f.desc ?? '',
            })));
          }
        } catch { /* keep defaults */ }
      })
      .catch(() => {});
  }, []);

  const fi = (n: string): React.CSSProperties => ({
    ...inputS,
    borderColor: focused === n ? '#0b0d20' : '#e2e8f0',
    background: focused === n ? '#ffffff' : '#f8faff',
    boxShadow: focused === n ? '0 0 0 3px rgba(11,13,32,0.10)' : 'none',
  });

  const handle = (e: React.FormEvent) => { e.preventDefault(); setSent(true); };

  const selectCountry = (name: string) => {
    setForm(f => ({ ...f, country: name }));
    document.getElementById('apply')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const requiredKeys: (keyof typeof form)[] = ['name', 'phone', 'email', 'country', 'course'];
  const filledCount = requiredKeys.filter(k => form[k]).length;
  const progress = filledCount / requiredKeys.length;
  const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email);

  return (
    <PageLayout>
      <style jsx global>{`
        /* Modern Geometric Sans-Serif — FORCED on everything on the page */
        .sv-page,
        .sv-page *,
        .sv-page h1,
        .sv-page h2,
        .sv-page h3,
        .sv-page h4,
        .sv-page h5,
        .sv-page h6,
        .sv-page p,
        .sv-page span,
        .sv-page a,
        .sv-page button,
        .sv-page strong,
        .sv-page small,
        .sv-page em,
        .sv-page b,
        .sv-page div,
        .sv-page label,
        .sv-page input,
        .sv-page textarea,
        .sv-page select,
        .sv-page option {
          font-family: ${FONT_STACK} !important;
          font-feature-settings: "ss01", "cv11", "cv02" !important;
          font-optical-sizing: auto !important;
          letter-spacing: -0.011em !important;
        }

        /* Force every button in this page to be pill-shaped, no exceptions */
        .sv-page a,
        .sv-page button,
        .sv-page .pill {
          border-radius: 999px !important;
        }

        .brand-card { transition: box-shadow .3s ease, border-color .3s ease; }
        .brand-card:hover { box-shadow: 0 24px 60px rgba(0,0,0,0.10); }

        .sv-countries-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 18px; }
        @media (max-width: 860px) { .sv-countries-grid { grid-template-columns: repeat(2, 1fr); } }
        @media (max-width: 560px) { .sv-countries-grid { grid-template-columns: 1fr; } }

        .sv-features-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 22px; }
        @media (max-width: 900px) { .sv-features-grid { grid-template-columns: repeat(2, 1fr); } }
        @media (max-width: 560px) { .sv-features-grid { grid-template-columns: 1fr; } }

        .sv-two-col { display: grid; grid-template-columns: 1fr 1fr; gap: 56px; align-items: start; }
        @media (max-width: 860px) { .sv-two-col { grid-template-columns: 1fr; } }

        .stats-strip { display: grid; grid-template-columns: repeat(4, 1fr); gap: 24px; }
        @media (max-width: 580px) { .stats-strip { grid-template-columns: repeat(2, 1fr); } }

        .sv-form-2col { display: grid; grid-template-columns: 1fr 1fr; gap: 14px; }
        @media (max-width: 560px) { .sv-form-2col { grid-template-columns: 1fr; } }

        .floating-chip { display: flex; }
        @media (max-width: 900px) { .floating-chip { display: none !important; } }
      `}</style>

      <div className="sv-page">

        {/* ══════════════════ HERO ══════════════════ */}
        <section style={{
          position: 'relative', overflow: 'hidden',
          background: 'linear-gradient(180deg, #060912 0%, #0b1226 45%, #04070f 100%)',
          padding: 'clamp(90px, 12vw, 140px) 0 clamp(64px, 9vw, 100px)',
        }}>
          <AmbientBlobs />

          <motion.div
            className="floating-chip"
            style={{
              position: 'absolute', top: 100, right: '6%', alignItems: 'center', gap: 8,
              background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.12)',
              borderRadius: 999, padding: '8px 16px', fontSize: 12.5, fontWeight: 700, color: '#fff',
              zIndex: 1, backdropFilter: 'blur(8px)',
            }}
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 5.5, repeat: Infinity, ease: 'easeInOut' }}
          >
            <Sparkles size={14} color="#fb923c" /> 500+ Students Placed
          </motion.div>

          <div className="container" style={{ position: 'relative', zIndex: 1, maxWidth: 1200, margin: '0 auto', padding: '0 24px' }}>
            <nav style={{ display: 'flex', gap: 8, fontSize: 13, color: 'rgba(255,255,255,0.4)', marginBottom: 28 }}>
              <a href="/" style={{ color: 'inherit', textDecoration: 'none' }}>Home</a>
              <span>›</span>
              <span style={{ color: 'rgba(255,255,255,0.75)' }}>Study Visa</span>
            </nav>

            <Eyebrow dark>{hero.tag}</Eyebrow>

            <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease: EASE }}>
              <PlainHeading as="h1" size="clamp(2.2rem, 5.5vw, 3.6rem)" dark>
                {hero.title}
              </PlainHeading>
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: EASE, delay: 0.15 }}
              style={{ fontSize: 16, lineHeight: 1.7, color: 'rgba(255,255,255,0.7)', maxWidth: 620, margin: '20px 0 36px' }}
            >
              {hero.subtitle}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: EASE, delay: 0.28 }}
              style={{ display: 'flex', gap: 16, flexWrap: 'wrap', marginBottom: 64 }}
            >
              {/* CHANGED: pill-shaped primary button, plain black background */}
              <PrimaryButton href="#apply" icon={Globe}>{hero.cta1}</PrimaryButton>
              <GhostButton href={hero.waHref} icon={MessageCircle} dark>{hero.cta2}</GhostButton>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.6, ease: EASE, delay: 0.1 }}
            >
              <StatsStrip />
            </motion.div>
          </div>
        </section>

        {/* ══════════════════ DESTINATIONS ══════════════════ */}
        <section style={{ position: 'relative', overflow: 'hidden', background: '#fbfbfd', padding: 'clamp(64px, 9vw, 120px) 0' }}>
          <AmbientBlobs opacityScale={0.5} />
          <div className="container" style={{ position: 'relative', zIndex: 1, maxWidth: 1200, margin: '0 auto', padding: '0 24px' }}>
            <div style={{ textAlign: 'center', marginBottom: 40 }}>
              <Eyebrow center>{dest.eyebrow}</Eyebrow>
              <PlainHeading align="center">{dest.heading}</PlainHeading>
              <p style={{ fontSize: 13, color: '#94a3b8', marginTop: 12, fontWeight: 600 }}>
                Tap a destination to pre-fill your application below
              </p>
            </div>

            <div className="sv-countries-grid" style={{ marginBottom: 72 }}>
              {countries.map((c, i) => {
                const color = BRAND[i % BRAND.length];
                const selected = form.country === c.name;
                return (
                  <BrandCard key={c.name} index={i} accent={color} selected={selected} onClick={() => selectCountry(c.name)}>
                    <img
                      src={c.flag} alt={c.name}
                      style={{ width: 56, height: 40, objectFit: 'cover', borderRadius: 6, marginBottom: 14, boxShadow: '0 4px 12px rgba(0,0,0,0.15)' }}
                    />
                    <div style={{ fontSize: 15, fontWeight: 800, color: '#0f172a', marginBottom: 4 }}>{c.name}</div>
                    <div style={{ fontSize: 13, color: '#64748b' }}>{c.sub}</div>
                  </BrandCard>
                );
              })}
            </div>

            <div style={{ textAlign: 'center', marginBottom: 40 }}>
              <PlainHeading align="center">{featHeading}</PlainHeading>
            </div>
            <div className="sv-features-grid">
              {features.map((f, i) => {
                const Icon = ICON_MAP[f.icon] || GraduationCap;
                const color = BRAND[i % BRAND.length];
                return (
                  <BrandCard key={f.title + i} index={i} accent={color}>
                    <div style={{
                      width: 48, height: 48, borderRadius: 12, background: `${color}18`,
                      display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 16,
                    }}>
                      <Icon size={22} color={color} />
                    </div>
                    <h3 style={{ fontSize: 17, fontWeight: 800, color: '#0f172a', marginBottom: 8, letterSpacing: '-0.01em' }}>{f.title}</h3>
                    <p style={{ fontSize: 14, color: '#64748b', lineHeight: 1.7 }}>{f.desc}</p>
                  </BrandCard>
                );
              })}
            </div>
          </div>
        </section>

        {/* ══════════════════ APPLY FORM ══════════════════ */}
        <section id="apply" style={{ position: 'relative', overflow: 'hidden', background: '#ffffff', padding: 'clamp(64px, 9vw, 120px) 0' }}>
          <AmbientBlobs opacityScale={0.4} />
          <div className="container" style={{ position: 'relative', zIndex: 1, maxWidth: 1200, margin: '0 auto', padding: '0 24px' }}>
            <div className="sv-two-col">
              <div>
                <Eyebrow>{apply.eyebrow}</Eyebrow>
                <PlainHeading>{apply.heading}</PlainHeading>
                <p style={{ fontSize: 15, color: '#64748b', lineHeight: 1.7, margin: '20px 0 32px' }}>
                  {apply.desc}
                </p>
                <ApplyTimeline points={applyPoints.filter(Boolean)} />
              </div>

              <motion.div
                initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }} transition={{ duration: 0.55, ease: EASE }}
                style={{
                  position: 'relative', background: '#ffffff', border: '1px solid rgba(15,23,42,0.06)',
                  borderRadius: 24, padding: 36, boxShadow: '0 8px 40px rgba(15,23,42,0.08)', overflow: 'hidden',
                }}
              >
                <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 3, background: '#0b0d20', opacity: 0.15 }} />

                <AnimatePresence mode="wait">
                  {sent ? (
                    <motion.div
                      key="success"
                      initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }}
                      transition={{ duration: 0.4, ease: EASE }}
                      style={{ textAlign: 'center', padding: '32px 0' }}
                    >
                      <motion.div
                        initial={{ scale: 0 }} animate={{ scale: 1 }}
                        transition={{ type: 'spring', stiffness: 260, damping: 18, delay: 0.1 }}
                        style={{
                          width: 72, height: 72, borderRadius: '50%',
                          background: 'rgba(11,13,32,0.08)',
                          display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px',
                        }}
                      >
                        <CheckCircle2 size={36} color="#0b0d20" />
                      </motion.div>
                      <div style={{ fontSize: 21, fontWeight: 900, marginBottom: 10, color: '#0b0d20' }}>
                        {apply.successTitle}
                      </div>
                      <div style={{ fontSize: 14, color: '#64748b', lineHeight: 1.7, marginBottom: 26, maxWidth: 380, margin: '0 auto 26px' }}>
                        {apply.successSub}
                      </div>
                      {/* CHANGED: pill-shaped, plain black WhatsApp button (was green) */}
                      <motion.a
                        href={hero.waHref} target="_blank" rel="noopener noreferrer"
                        whileHover={{ y: -2 }} whileTap={{ y: 0 }}
                        style={{
                          display: 'inline-flex', alignItems: 'center', gap: 8, padding: '13px 26px',
                          background: '#0b0d20', color: '#fff', borderRadius: 999, fontWeight: 700,
                          fontSize: 14, textDecoration: 'none',
                          boxShadow: '0 8px 24px rgba(0,0,0,0.25)',
                        }}
                      >
                        <MessageCircle size={16} /> {apply.successWaText}
                      </motion.a>
                    </motion.div>
                  ) : (
                    <motion.div key="form" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }}>
                      <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, fontSize: 11, fontWeight: 800, color: '#0b0d20', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 6 }}>
                        <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#0b0d20', display: 'inline-block' }} />
                        <Globe size={12} /> {apply.formTitle}
                      </div>
                      <div style={{ fontSize: 13, color: '#64748b', marginBottom: 18 }}>{apply.formSubtitle}</div>

                      <div style={{ marginBottom: 22 }}>
                        <div style={{ height: 5, borderRadius: 999, background: 'rgba(15,23,42,0.06)', overflow: 'hidden' }}>
                          <motion.div
                            animate={{ scaleX: progress }} initial={{ scaleX: 0 }}
                            transition={{ duration: 0.4, ease: EASE }}
                            style={{
                              height: '100%', width: '100%', transformOrigin: 'left',
                              background: '#0b0d20', borderRadius: 999,
                            }}
                          />
                        </div>
                        <div style={{ fontSize: 11, color: '#94a3b8', fontWeight: 600, marginTop: 6 }}>
                          {filledCount}/{requiredKeys.length} required fields completed
                        </div>
                      </div>

                      <form onSubmit={handle} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                        <div className="sv-form-2col">
                          <div>
                            <label style={labelS}>Full Name *</label>
                            <input
                              style={fi('name')} required placeholder="Your full name" value={form.name}
                              onFocus={() => setFocused('name')} onBlur={() => setFocused('')}
                              onChange={e => setForm({ ...form, name: e.target.value })}
                            />
                          </div>
                          <div>
                            <label style={labelS}>WhatsApp Number *</label>
                            <input
                              style={fi('phone')} required type="tel" placeholder="+91 XXXXX XXXXX" value={form.phone}
                              onFocus={() => setFocused('phone')} onBlur={() => setFocused('')}
                              onChange={e => setForm({ ...form, phone: e.target.value })}
                            />
                          </div>
                        </div>

                        <div style={{ position: 'relative' }}>
                          <label style={labelS}>Email Address *</label>
                          <input
                            style={fi('email')} required type="email" placeholder="your@email.com" value={form.email}
                            onFocus={() => setFocused('email')} onBlur={() => setFocused('')}
                            onChange={e => setForm({ ...form, email: e.target.value })}
                          />
                          {form.email && emailValid && (
                            <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} style={{ position: 'absolute', right: 12, top: 34 }}>
                              <CheckCircle2 size={16} color="#0b0d20" />
                            </motion.div>
                          )}
                        </div>

                        <div className="sv-form-2col">
                          <div>
                            <label style={labelS}>Preferred Country *</label>
                            <select
                              style={{ ...fi('country'), cursor: 'pointer' }} required value={form.country}
                              onFocus={() => setFocused('country')} onBlur={() => setFocused('')}
                              onChange={e => setForm({ ...form, country: e.target.value })}
                            >
                              <option value="">Select country</option>
                              {countries.map(c => <option key={c.name}>{c.name}</option>)}
                            </select>
                          </div>
                          <div>
                            <label style={labelS}>Highest Qualification</label>
                            <select
                              style={{ ...fi('qual'), cursor: 'pointer' }} value={form.qualification}
                              onFocus={() => setFocused('qual')} onBlur={() => setFocused('')}
                              onChange={e => setForm({ ...form, qualification: e.target.value })}
                            >
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
                          <input
                            style={fi('course')} required placeholder="e.g. MBA, Computer Science, Engineering" value={form.course}
                            onFocus={() => setFocused('course')} onBlur={() => setFocused('')}
                            onChange={e => setForm({ ...form, course: e.target.value })}
                          />
                        </div>

                        <div className="sv-form-2col">
                          <div>
                            <label style={labelS}>Intended Intake</label>
                            <select
                              style={{ ...fi('intake'), cursor: 'pointer' }} value={form.intake}
                              onFocus={() => setFocused('intake')} onBlur={() => setFocused('')}
                              onChange={e => setForm({ ...form, intake: e.target.value })}
                            >
                              <option value="">Select</option>
                              <option>Sep 2025</option>
                              <option>Jan 2026</option>
                              <option>Sep 2026</option>
                              <option>Jan 2027</option>
                            </select>
                          </div>
                          <div>
                            <label style={labelS}>Budget (Annual Tuition)</label>
                            <select
                              style={{ ...fi('budget'), cursor: 'pointer' }} value={form.budget}
                              onFocus={() => setFocused('budget')} onBlur={() => setFocused('')}
                              onChange={e => setForm({ ...form, budget: e.target.value })}
                            >
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
                          <textarea
                            style={{ ...fi('notes'), resize: 'vertical' as const, minHeight: 80, paddingTop: 11 }}
                            placeholder="Tell us anything specific about your goals or requirements…"
                            value={form.notes} maxLength={400}
                            onFocus={() => setFocused('notes')} onBlur={() => setFocused('')}
                            onChange={e => setForm({ ...form, notes: e.target.value })}
                          />
                          <div style={{ fontSize: 10.5, color: '#cbd5e1', textAlign: 'right', marginTop: 4 }}>{form.notes.length}/400</div>
                        </div>

                        {/* CHANGED: pill-shaped, plain black submit button (was blue→indigo gradient) */}
                        <motion.button
                          type="submit"
                          whileHover={{ y: -2 }} whileTap={{ y: 0, scale: 0.99 }}
                          style={{
                            width: '100%', padding: '15px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
                            background: '#0b0d20', color: '#fff', fontWeight: 700, fontSize: 15,
                            border: 'none', borderRadius: 999, cursor: 'pointer',
                            boxShadow: '0 8px 24px rgba(0,0,0,0.25)',
                          }}
                        >
                          {apply.submitBtn}
                          <motion.span animate={{ x: [0, 4, 0] }} transition={{ duration: 1.4, repeat: Infinity, ease: 'easeInOut' }}>→</motion.span>
                        </motion.button>
                        <div style={{ fontSize: 11, color: '#94a3b8', textAlign: 'center' }}>
                          {apply.formNote}
                        </div>
                      </form>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            </div>
          </div>
        </section>

      </div>
    </PageLayout>
  );
}