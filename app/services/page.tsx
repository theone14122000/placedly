'use client';

export const dynamic = 'force-dynamic';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import {
  Target, DollarSign, Handshake, Globe2, FileCheck, TrendingUp,
  Rocket, Globe, ArrowRight, Users, Award, Clock, Briefcase,
} from 'lucide-react';
import PageLayout from '../components/PageLayout';

/* ============================================================
   DESIGN SYSTEM TOKENS
   ============================================================ */
const BRAND = ['#2563eb', '#7c8ff0', '#fb923c', '#f43f5e', '#a855f7'];
const EASE = [0.22, 1, 0.36, 1] as const;

/* Modern Geometric Sans-Serif stack — FORCED on every element */
const FONT_STACK = `"Outfit", "Poppins", "Inter", "Manrope", "Geist", "Plus Jakarta Sans", -apple-system, BlinkMacSystemFont, "Segoe UI", system-ui, sans-serif`;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const ICON_MAP: Record<string, React.ComponentType<any>> = {
  Target, DollarSign, Handshake, Globe2, FileCheck, TrendingUp,
};

const DEFAULT_DIFFERENTIATORS = [
  { icon: 'Target', title: 'Domain Specialist', desc: 'We specialize in BPO, US Healthcare Claims, Insurance Operations, and Finance — not generic careers. Deep domain expertise = better results.' },
  { icon: 'DollarSign', title: 'Zero Upfront Model', desc: 'We invest first — time, expertise, network. You pay only when your career genuinely grows. This is our commitment.' },
  { icon: 'Handshake', title: 'Direct Employer Access', desc: 'Your profile reaches hiring managers directly — not portals. We have warm connections at EXL, Quatrro, eBiz, WNS, Optum & more.' },
  { icon: 'Globe2', title: 'Global University Network', desc: '140+ universities across UK, France, Germany & Dubai. Dedicated account manager. Application to visa — all handled.' },
  { icon: 'FileCheck', title: 'Transparent Agreements', desc: 'Everything in writing. Signed service agreement before we start. No surprises, no hidden terms, ever.' },
  { icon: 'TrendingUp', title: 'Proven Results', desc: '300+ professionals placed. Average 60%+ career growth. Fastest placement in 9 days. Numbers speak for themselves.' },
];

const careerFeatures = ['ATS Resume + LinkedIn Rebuild', '3 Mock Interview Sessions', 'Direct Employer Connect (10–15 companies)', 'Salary Negotiation Support', 'Zero upfront — pay after placement'];
const studyFeatures = ['University & Course Shortlisting', 'Application Management', 'Dedicated Account Manager', 'Visa Guidance & Documentation', '50,000+ Course Knowledge Base'];

const STATS = [
  { icon: Users, value: '300+', label: 'Professionals Placed' },
  { icon: TrendingUp, value: '60%+', label: 'Avg. Career Growth' },
  { icon: Clock, value: '9 Days', label: 'Fastest Placement' },
  { icon: Award, value: '140+', label: 'Partner Universities' },
];

type DiffItem = { title?: string; desc?: string; icon?: string };
type SvcCmsData = {
  services?: Array<{ id?: string; title?: string; tag?: string; desc?: string; color?: string; features?: string[] }>;
  diff?: DiffItem[];
};

/* ============================================================
   PRIMITIVES
   ============================================================ */
function AmbientBlobs({ scale = 1 }: { scale?: number }) {
  return (
    <>
      <motion.div
        aria-hidden
        style={{
          position: 'absolute', top: '-8%', left: '-6%', width: 420, height: 420, borderRadius: '50%',
          background: `radial-gradient(circle, rgba(37,99,235,${0.13 * scale}) 0%, transparent 70%)`,
          filter: 'blur(110px)', pointerEvents: 'none', zIndex: 0,
        }}
        animate={{ x: [0, 40, 0], y: [0, 30, 0] }}
        transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        aria-hidden
        style={{
          position: 'absolute', bottom: '-10%', right: '-6%', width: 460, height: 460, borderRadius: '50%',
          background: `radial-gradient(circle, rgba(249,115,22,${0.12 * scale}) 0%, transparent 70%)`,
          filter: 'blur(120px)', pointerEvents: 'none', zIndex: 0,
        }}
        animate={{ x: [0, -30, 0], y: [0, -40, 0] }}
        transition={{ duration: 16, repeat: Infinity, ease: 'easeInOut' }}
      />
    </>
  );
}

/* CHANGED: plain text, no gradient on the label */
function Eyebrow({ children, center = false }: { children: React.ReactNode; center?: boolean }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 10, justifyContent: center ? 'center' : 'flex-start', marginBottom: 16 }}>
      <span style={{ width: 20, height: 3, borderRadius: 999, background: '#0b0d20', opacity: 0.4, flexShrink: 0 }} />
      <span style={{
        fontSize: 11.5, fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.12em',
        color: '#0b0d20', whiteSpace: 'nowrap',
      }}>{children}</span>
      <span style={{ width: 20, height: 3, borderRadius: 999, background: '#0b0d20', opacity: 0.4, flexShrink: 0 }} />
    </div>
  );
}

/* CHANGED: PlainHeading replaces GradientHeading — solid color, no gradient */
function PlainHeading({
  children, size = 'clamp(1.8rem, 4vw, 2.75rem)', align = 'left', as: Tag = 'h2', color,
}: {
  children: React.ReactNode;
  size?: string;
  align?: 'left' | 'center' | 'right';
  as?: React.ElementType;
  color?: string;
}) {
  const Comp = Tag as React.ElementType;
  return (
    <Comp style={{
      fontSize: size, fontWeight: 900, letterSpacing: '-0.02em', lineHeight: 1.1,
      textAlign: align, margin: 0, color: color ?? '#0b0d20',
    }}>{children}</Comp>
  );
}

function ShineButton({
  href, children, variant, external = false,
}: {
  href: string; children: React.ReactNode;
  variant: 'orange' | 'blue' | 'white' | 'ghost-dark' | 'black' | 'white-outline';
  external?: boolean;
}) {
  /* CHANGED: added 'black' and 'white-outline' variants for dark backgrounds */
  return (
    <motion.a
      href={href}
      target={external ? '_blank' : undefined}
      rel={external ? 'noopener noreferrer' : undefined}
      whileHover={{ y: -3 }}
      whileTap={{ y: 0, scale: 0.98 }}
      className={`svc-shine-btn svc-shine-btn--${variant}`}
    >
      <span className="svc-shine-sweep" aria-hidden />
      <span style={{ position: 'relative', zIndex: 1, display: 'inline-flex', alignItems: 'center', gap: 8 }}>
        {children}
        <motion.span
          style={{ display: 'flex' }}
          animate={{ x: [0, 4, 0] }}
          transition={{ duration: 1.4, repeat: Infinity, ease: 'easeInOut' }}
        >
          <ArrowRight size={14} strokeWidth={2.5} />
        </motion.span>
      </span>
    </motion.a>
  );
}

function BrandCard({ index, accent, children }: { index: number; accent: string; children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.55, ease: EASE, delay: index * 0.08 }}
      whileHover={{ y: -6 }}
      className="svc-brand-card"
      style={{
        position: 'relative', background: '#fff', borderRadius: 22, border: '1px solid rgba(15,23,42,0.06)',
        padding: '30px 26px', overflow: 'hidden',
      }}
    >
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0, height: 3,
        background: '#0b0d20', opacity: 0.4,
      }} />
      {/* CHANGED: large background number is now plain black, not gradient text */}
      <div style={{
        position: 'absolute', right: 14, bottom: -20, fontSize: 88, fontWeight: 900, lineHeight: 1,
        color: '#0b0d20', opacity: 0.05,
        userSelect: 'none', pointerEvents: 'none',
      }}>{String(index + 1).padStart(2, '0')}</div>
      <div style={{ position: 'relative', zIndex: 1 }}>{children}</div>
    </motion.div>
  );
}

/* ============================================================
   PAGE
   ============================================================ */
export default function ServicesPage() {
  const [focus, setFocus] = useState<'career' | 'study' | null>(null);
  const [differentiators, setDifferentiators] = useState(DEFAULT_DIFFERENTIATORS);

  useEffect(() => {
    fetch('/api/admin/content?prefix=services:')
      .then(r => r.json())
      .then((map: Record<string, string>) => {
        try {
          const raw = map['services:data'];
          if (!raw) return;
          const p: SvcCmsData = JSON.parse(raw);
          if (Array.isArray(p.diff) && p.diff.length > 0) {
            setDifferentiators(
              p.diff.map((d, i) => {
                const def = DEFAULT_DIFFERENTIATORS[i] ?? DEFAULT_DIFFERENTIATORS[0];
                return { icon: d.icon ?? def.icon, title: d.title ?? def.title, desc: d.desc ?? def.desc };
              })
            );
          }
        } catch { /* keep defaults */ }
      })
      .catch(() => {});
  }, []);

  return (
    <PageLayout>
      <style jsx global>{`
        /* Modern Geometric Sans-Serif — FORCED on everything */
        .svc-page,
        .svc-page *,
        .svc-page h1, .svc-page h2, .svc-page h3, .svc-page h4, .svc-page h5, .svc-page h6,
        .svc-page p, .svc-page span, .svc-page a, .svc-page button,
        .svc-page strong, .svc-page small, .svc-page em, .svc-page b,
        .svc-page div, .svc-page label, .svc-page input, .svc-page textarea {
          font-family: ${FONT_STACK} !important;
          font-feature-settings: "ss01", "cv11", "cv02" !important;
          font-optical-sizing: auto !important;
          letter-spacing: -0.011em !important;
        }

        /* All text on light bg → same deep-black color */
        .svc-page,
        .svc-page h1, .svc-page h2, .svc-page h3, .svc-page h4, .svc-page h5, .svc-page h6,
        .svc-page p, .svc-page span, .svc-page a, .svc-page button,
        .svc-page strong, .svc-page small, .svc-page em, .svc-page b,
        .svc-page div, .svc-page label {
          color: #0b0d20 !important;
        }

        /* CHANGED: removed @keyframes svcGradientShift (text gradient animation) */

        .svc-brand-card { transition: box-shadow .3s ease, border-color .3s ease; }
        .svc-brand-card:hover { box-shadow: 0 24px 60px rgba(0,0,0,0.10); border-color: rgba(15,23,42,0.10); }

        .svc-vertical-card {
          position: relative; border-radius: 24px; padding: 40px; color: #fff;
          display: flex; flex-direction: column; gap: 20px; overflow: hidden; cursor: pointer;
          transition: transform 0.4s cubic-bezier(0.22,1,0.36,1), box-shadow 0.4s ease, filter 0.4s ease;
        }
        .svc-vertical-card:hover { transform: translateY(-8px); }
        .svc-vertical-card--dim { filter: brightness(0.82) saturate(0.85); }

        .svc-feature-row { display: flex; align-items: center; gap: 10px; opacity: 0; transform: translateX(-8px); animation: svcFeatureIn 0.5s ease forwards; }
        @keyframes svcFeatureIn { to { opacity: 1; transform: translateX(0); } }

        /* Pill-shaped buttons */
        .svc-shine-btn {
          position: relative; display: inline-flex; align-items: center; gap: 8px;
          padding: 13px 26px; border-radius: 999px; font-weight: 700; font-size: 14px;
          text-decoration: none; overflow: hidden; isolation: isolate;
          border: 1px solid transparent; cursor: pointer;
          transition: box-shadow 0.28s cubic-bezier(0.22,1,0.36,1), filter 0.28s ease;
        }
        .svc-shine-btn--orange {
          background: linear-gradient(135deg,#fb923c,#f43f5e); color: #fff;
          box-shadow: 0 8px 22px rgba(251,146,60,0.32);
        }
        .svc-shine-btn--orange:hover { box-shadow: 0 16px 34px rgba(244,63,94,0.4); filter: brightness(1.06); }
        .svc-shine-btn--blue {
          background: linear-gradient(135deg,#2563eb,#7c8ff0); color: #fff;
          box-shadow: 0 8px 22px rgba(37,99,235,0.32);
        }
        .svc-shine-btn--blue:hover { box-shadow: 0 16px 34px rgba(37,99,235,0.42); filter: brightness(1.06); }
        .svc-shine-btn--white {
          background: #ffffff; color: #0b0d20; box-shadow: 0 8px 22px rgba(0,0,0,0.12);
        }
        .svc-shine-btn--white:hover { box-shadow: 0 16px 34px rgba(0,0,0,0.16); }
        /* CHANGED: new solid-black button variant for dark backgrounds */
        .svc-shine-btn--black {
          background: #0b0d20; color: #ffffff;
          box-shadow: 0 8px 22px rgba(0,0,0,0.25);
        }
        .svc-shine-btn--black:hover { box-shadow: 0 16px 34px rgba(0,0,0,0.35); }
        .svc-shine-btn--white-outline {
          background: transparent; color: #ffffff; border: 1.5px solid #ffffff;
        }
        .svc-shine-btn--white-outline:hover { background: rgba(255,255,255,0.10); }
        .svc-shine-btn--ghost-dark {
          background: transparent; color: #fff; border: 1.5px solid rgba(255,255,255,0.25);
        }
        .svc-shine-btn--ghost-dark:hover { border-color: rgba(255,255,255,0.45); background: rgba(255,255,255,0.06); }

        .svc-shine-sweep {
          position: absolute; top: 0; left: -130%; width: 55%; height: 100%;
          background: linear-gradient(115deg, transparent, rgba(255,255,255,0.5), transparent);
          transform: skewX(-20deg); transition: left 0.65s ease; z-index: 0; pointer-events: none;
        }
        .svc-shine-btn:hover .svc-shine-sweep { left: 140%; }

        .svc-quickmatch-btn {
          display: flex; align-items: center; gap: 10px; padding: 12px 20px; border-radius: 999px;
          font-size: 13.5px; font-weight: 700; cursor: pointer; border: 1.5px solid rgba(15,23,42,0.08);
          background: #fff; transition: all 0.25s ease;
        }
        .svc-quickmatch-btn:hover { border-color: rgba(0,0,0,0.2); box-shadow: 0 8px 20px rgba(0,0,0,0.06); }
        /* CHANGED: active state is solid black, not gradient */
        .svc-quickmatch-btn.active { background: #0b0d20; color: #ffffff; border-color: transparent; }

        .svc-verticals-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 24px; }
        @media (max-width: 860px) { .svc-verticals-grid { grid-template-columns: 1fr; } }

        .svc-diff-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; }
        @media (max-width: 900px) { .svc-diff-grid { grid-template-columns: repeat(2, 1fr); } }
        @media (max-width: 560px) { .svc-diff-grid { grid-template-columns: 1fr; } }

        .svc-stats-strip { display: grid; grid-template-columns: repeat(4, 1fr); gap: 20px; }
        @media (max-width: 580px) { .svc-stats-strip { grid-template-columns: repeat(2, 1fr); } }

        .svc-quickmatch-row { display: flex; gap: 12px; justify-content: flex-start; flex-wrap: wrap; }
      `}</style>

      <div className="svc-page">

        {/* ══════════════════ HERO ══════════════════ */}
        <section style={{ position: 'relative', overflow: 'hidden', background: '#fbfbfd', padding: 'clamp(90px, 12vw, 130px) 0 clamp(56px, 8vw, 90px)' }}>
          <AmbientBlobs />
          <div style={{ position: 'relative', zIndex: 1, maxWidth: 1200, margin: '0 auto', padding: '0 24px' }}>
            <nav style={{ display: 'flex', gap: 8, fontSize: 13, marginBottom: 24 }}>
              <a href="/" style={{ textDecoration: 'none' }}>Home</a>
              <span>›</span>
              <span>Services</span>
            </nav>

            <Eyebrow>Our Services</Eyebrow>

            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55, ease: EASE }}>
              {/* CHANGED: GradientHeading → PlainHeading, no gradient */}
              <PlainHeading as="h1" size="clamp(2rem, 5vw, 3.2rem)">
                Everything You Need to Grow.
              </PlainHeading>
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, ease: EASE, delay: 0.1 }}
              style={{ fontSize: 16, maxWidth: 520, margin: '18px 0 32px' }}
            >
              Two powerful verticals. One growth partner.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, ease: EASE, delay: 0.2 }}
            >
              <div style={{ fontSize: 12, fontWeight: 700, marginBottom: 12 }}>
                Not sure where to start? Tell us your goal:
              </div>
              <div className="svc-quickmatch-row">
                <button
                  type="button"
                  onClick={() => setFocus(focus === 'career' ? null : 'career')}
                  className={`svc-quickmatch-btn${focus === 'career' ? ' active' : ''}`}
                >
                  <Briefcase size={15} /> I want a job in India
                </button>
                <button
                  type="button"
                  onClick={() => setFocus(focus === 'study' ? null : 'study')}
                  className={`svc-quickmatch-btn${focus === 'study' ? ' active' : ''}`}
                >
                  <Globe size={15} /> I want to study abroad
                </button>
              </div>
            </motion.div>
          </div>
        </section>

        {/* ══════════════════ TWO VERTICALS ══════════════════ */}
        <section style={{ position: 'relative', background: '#ffffff', padding: '0 0 clamp(64px, 9vw, 100px)' }}>
          <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 24px' }}>
            <div className="svc-verticals-grid" style={{ marginBottom: 80 }}>

              {/* Career */}
              <motion.div
                initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                transition={{ duration: 0.55, ease: EASE }}
                onMouseEnter={() => setFocus('career')} onMouseLeave={() => setFocus(null)}
                className={`svc-vertical-card${focus === 'study' ? ' svc-vertical-card--dim' : ''}`}
                style={{
                  background: 'linear-gradient(135deg, #0b0d20 0%, #1a1040 100%)',
                  boxShadow: focus === 'career' ? '0 24px 60px rgba(0,0,0,0.30)' : '0 8px 30px rgba(0,0,0,0.15)',
                }}
              >
                <div style={{
                  position: 'absolute', top: -40, right: -40, width: 180, height: 180, borderRadius: '50%',
                  background: 'radial-gradient(circle, rgba(251,146,60,0.18) 0%, transparent 70%)', filter: 'blur(50px)', pointerEvents: 'none',
                }} />
                <motion.div
                  style={{
                    width: 52, height: 52, borderRadius: 14, background: 'rgba(249,115,22,0.15)',
                    border: '1px solid rgba(249,115,22,0.25)', display: 'flex', alignItems: 'center', justifyContent: 'center',
                    position: 'relative', zIndex: 1,
                  }}
                  animate={{ rotate: focus === 'career' ? [0, -8, 8, 0] : 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <Rocket size={26} color="#fb923c" />
                </motion.div>
                <div style={{ position: 'relative', zIndex: 1 }}>
                  <div style={{ fontSize: 11, fontWeight: 700, color: 'rgba(255,255,255,0.4)', letterSpacing: '0.6px', textTransform: 'uppercase', marginBottom: 8 }}>Vertical 01</div>
                  <div style={{ fontSize: 22, fontWeight: 800, marginBottom: 12, letterSpacing: '-0.01em', color: '#ffffff' }}>Career Growth — India</div>
                  <p style={{ fontSize: 15, color: 'rgba(255,255,255,0.72)', lineHeight: 1.7 }}>
                    Land roles at top MNCs — EXL, Quatrro, eBiz, WNS, Optum &amp; more. Resume transformation, interview mastery, direct employer connect.
                  </p>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 10, position: 'relative', zIndex: 1 }}>
                  {careerFeatures.map((item, i) => (
                    <div key={item} className="svc-feature-row" style={{ animationDelay: `${i * 0.08}s` }}>
                      <div style={{ width: 20, height: 20, minWidth: 20, borderRadius: '50%', background: 'rgba(249,115,22,0.18)', border: '1px solid rgba(249,115,22,0.35)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <ArrowRight size={10} color="#fb923c" strokeWidth={3} />
                      </div>
                      <span style={{ fontSize: 14, color: 'rgba(255,255,255,0.8)' }}>{item}</span>
                    </div>
                  ))}
                </div>
                <div style={{ position: 'relative', zIndex: 1 }}>
                  {/* CHANGED: orange→rose gradient button kept (intentional button fill) */}
                  <ShineButton href="/cap" variant="orange">Explore CAP</ShineButton>
                </div>
              </motion.div>

              {/* Study Abroad */}
              <motion.div
                initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                transition={{ duration: 0.55, ease: EASE, delay: 0.1 }}
                onMouseEnter={() => setFocus('study')} onMouseLeave={() => setFocus(null)}
                className={`svc-vertical-card${focus === 'career' ? ' svc-vertical-card--dim' : ''}`}
                style={{
                  background: 'linear-gradient(135deg, #2563eb 0%, #1a38d4 100%)',
                  boxShadow: focus === 'study' ? '0 24px 60px rgba(37,99,235,0.3)' : '0 8px 30px rgba(37,99,235,0.2)',
                }}
              >
                <div style={{
                  position: 'absolute', top: -40, right: -40, width: 180, height: 180, borderRadius: '50%',
                  background: 'radial-gradient(circle, rgba(255,255,255,0.16) 0%, transparent 70%)', filter: 'blur(50px)', pointerEvents: 'none',
                }} />
                <motion.div
                  style={{
                    width: 52, height: 52, borderRadius: 14, background: 'rgba(255,255,255,0.15)',
                    border: '1px solid rgba(255,255,255,0.25)', display: 'flex', alignItems: 'center', justifyContent: 'center',
                    position: 'relative', zIndex: 1,
                  }}
                  animate={{ rotate: focus === 'study' ? [0, -8, 8, 0] : 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <Globe size={26} color="#ffffff" />
                </motion.div>
                <div style={{ position: 'relative', zIndex: 1 }}>
                  <div style={{ fontSize: 11, fontWeight: 700, color: 'rgba(255,255,255,0.4)', letterSpacing: '0.6px', textTransform: 'uppercase', marginBottom: 8 }}>Vertical 02</div>
                  <div style={{ fontSize: 22, fontWeight: 800, marginBottom: 12, letterSpacing: '-0.01em', color: '#ffffff' }}>Study Abroad — Go Global</div>
                  <p style={{ fontSize: 15, color: 'rgba(255,255,255,0.72)', lineHeight: 1.7 }}>
                    140+ universities in UK, France, Germany &amp; Dubai. Course shortlisting, applications, visa guidance — end to end.
                  </p>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 10, position: 'relative', zIndex: 1 }}>
                  {studyFeatures.map((item, i) => (
                    <div key={item} className="svc-feature-row" style={{ animationDelay: `${i * 0.08}s` }}>
                      <div style={{ width: 20, height: 20, minWidth: 20, borderRadius: '50%', background: 'rgba(255,255,255,0.15)', border: '1px solid rgba(255,255,255,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <ArrowRight size={10} color="#fff" strokeWidth={3} />
                      </div>
                      <span style={{ fontSize: 14, color: 'rgba(255,255,255,0.8)' }}>{item}</span>
                    </div>
                  ))}
                </div>
                <div style={{ position: 'relative', zIndex: 1 }}>
                  {/* CHANGED: now white-outline pill (no fill, white border + text) — pure on dark card */}
                  <ShineButton href="/study-visa" variant="white-outline">Study Visa</ShineButton>
                </div>
              </motion.div>
            </div>

            {/* ── Stats strip — CHANGED: numbers are plain black, not gradient ── */}
            <motion.div
              initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              transition={{ duration: 0.5, ease: EASE }}
              className="svc-stats-strip"
              style={{
                background: '#f8faff', border: '1px solid rgba(15,23,42,0.06)', borderRadius: 20,
                padding: '32px 28px', marginBottom: 80,
              }}
            >
              {STATS.map((s, i) => (
                <motion.div
                  key={s.label}
                  initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                  transition={{ duration: 0.5, ease: EASE, delay: i * 0.08 }}
                  style={{ display: 'flex', alignItems: 'center', gap: 14 }}
                >
                  <div style={{
                    width: 44, height: 44, borderRadius: 12, background: '#f1f5f9',
                    display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
                  }}>
                    <s.icon size={20} color="#0b0d20" />
                  </div>
                  <div>
                    {/* CHANGED: solid black, not gradient text */}
                    <div style={{ fontSize: '1.5rem', fontWeight: 900, lineHeight: 1 }}>{s.value}</div>
                    <div style={{ fontSize: 12, fontWeight: 600, marginTop: 2 }}>{s.label}</div>
                  </div>
                </motion.div>
              ))}
            </motion.div>

            {/* ── Why Placedly ── */}
            <div style={{ textAlign: 'center', marginBottom: 40 }}>
              <Eyebrow center>Why Placedly</Eyebrow>
              <PlainHeading align="center">What Makes Us Different</PlainHeading>
            </div>
            <div className="svc-diff-grid">
              {differentiators.map((d, i) => {
                const Icon = ICON_MAP[d.icon ?? 'Target'] ?? Target;
                return (
                  <BrandCard key={d.title} index={i} accent="#0b0d20">
                    <div style={{
                      width: 44, height: 44, borderRadius: 12, background: '#f1f5f9',
                      display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 16,
                    }}>
                      <Icon size={20} color="#0b0d20" />
                    </div>
                    <div style={{ fontSize: 15.5, fontWeight: 800, marginBottom: 8 }}>{d.title}</div>
                    <div style={{ fontSize: 14, lineHeight: 1.65 }}>{d.desc}</div>
                  </BrandCard>
                );
              })}
            </div>
          </div>
        </section>

        {/* ══════════════════ DARK CTA ══════════════════ */}
        <section style={{ background: '#ffffff', padding: '0 0 clamp(64px, 9vw, 100px)' }}>
          <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 24px' }}>
            <motion.div
              initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              transition={{ duration: 0.55, ease: EASE }}
              style={{
                position: 'relative', overflow: 'hidden',
                background: '#0b0d20',
                borderRadius: 28, padding: 'clamp(48px, 8vw, 80px) clamp(24px, 6vw, 64px)', textAlign: 'center',
              }}
            >
              <AmbientBlobs scale={1.4} />
              <div style={{ position: 'relative', zIndex: 1 }}>
                <Eyebrow center>Free Consultation</Eyebrow>
                <PlainHeading align="center" color="#ffffff" size="clamp(1.6rem, 3.5vw, 2.4rem)">
                  Not Sure Which Service Is Right for You?
                </PlainHeading>
                <p style={{ fontSize: 15, color: 'rgba(255,255,255,0.7)', margin: '16px auto 36px', maxWidth: 480, lineHeight: 1.7 }}>
                  Talk to our team — free consultation, no obligation. We&apos;ll tell you honestly which path makes the most sense for your goals.
                </p>
                <div style={{ display: 'flex', gap: 14, justifyContent: 'center', flexWrap: 'wrap' }}>
                  {/* CHANGED: orange→rose button kept on dark CTA (intentional button fill, not text) */}
                  <ShineButton href="/contact" variant="orange">Get Free Consultation</ShineButton>
                  {/* CHANGED: ghost-dark → white-outline for cleaner look on pure black bg */}
                  <ShineButton href="https://wa.me/919876543210" variant="white-outline" external>WhatsApp Us</ShineButton>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

      </div>
    </PageLayout>
  );
}