'use client';

import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion, useInView } from 'framer-motion';
import Link from 'next/link';
import {
  MessageSquare,
  Search,
  PenLine,
  Award,
  FileCheck2,
  Plane,
  BookOpen,
  GraduationCap,
  Languages,
  Users,
  FileText,
  Wallet,
  FileSignature,
  ArrowRight,
  Sparkles,
  ClipboardList,
  type LucideIcon,
} from 'lucide-react';

/* ────────────────────────────────────────────────────────────
   Shared theme tokens — identical gradient used across the site
──────────────────────────────────────────────────────────── */

const HEADING_GRADIENT =
  'linear-gradient(270deg, #2563eb 0%, #4f46e5 20%, #f97316 45%, #f43f5e 65%, #9333ea 85%, #2563eb 100%)';

const headingGradientStyle: React.CSSProperties = {
  backgroundImage: HEADING_GRADIENT,
  backgroundSize: '200% 200%',
  WebkitBackgroundClip: 'text',
  backgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  color: 'transparent',
};

/* Unique colors extracted from the gradient stops (blue → indigo → orange → rose → purple),
   cycled across the 6 process steps so the timeline itself "flows" through the same
   palette as the headings — step 6 loops back to step 1's family, symbolising
   the journey coming full circle. */
const GRADIENT_STOPS = ['#2563eb', '#4f46e5', '#f97316', '#f43f5e', '#9333ea'];

function stepAccent(i: number) {
  const from = GRADIENT_STOPS[i % GRADIENT_STOPS.length];
  const to = GRADIENT_STOPS[(i + 1) % GRADIENT_STOPS.length];
  return { from, to, soft: `${from}16`, border: `${from}30` };
}

/* ────────────────────────────────────────────────────────────
   Content
──────────────────────────────────────────────────────────── */

type ProcessStep = {
  id: string;
  number: string;
  title: string;
  description: string;
  Icon: LucideIcon;
};

const PROCESS_STEPS: ProcessStep[] = [
  {
    id: 'counselling',
    number: '01',
    title: 'Free Counselling Session',
    description:
      'We understand your academic background, career goals, budget, and preferred destination. We recommend best-fit countries and programmes.',
    Icon: MessageSquare,
  },
  {
    id: 'shortlisting',
    number: '02',
    title: 'University Shortlisting',
    description:
      'Based on your profile, we shortlist universities with the highest probability of acceptance — balancing ambition with realism.',
    Icon: Search,
  },
  {
    id: 'application',
    number: '03',
    title: 'Application Preparation',
    description:
      'We assist with your Statement of Purpose (SOP), Letters of Recommendation (LOR), and application submissions — ensuring every document reflects your strongest self.',
    Icon: PenLine,
  },
  {
    id: 'offer',
    number: '04',
    title: 'Offer & Admission',
    description:
      'Once you receive your admission letter, we guide you through acceptance, conditional fulfilment, and pre-visa requirements.',
    Icon: Award,
  },
  {
    id: 'visa',
    number: '05',
    title: 'Visa Documentation & Application',
    description:
      'We prepare and review your complete visa documentation — reducing the risk of rejection through rigorous compliance checking.',
    Icon: FileCheck2,
  },
  {
    id: 'predeparture',
    number: '06',
    title: 'Pre-Departure Briefing',
    description:
      'Before you fly, we brief you on accommodation, banking, transport, cultural adjustment, and academic expectations.',
    Icon: Plane,
  },
];

type DocRow = { label: string; note: string; Icon: LucideIcon };

const DOCUMENTS: DocRow[] = [
  { label: 'Valid Passport', note: 'Minimum 18 months validity recommended', Icon: BookOpen },
  { label: 'Academic Transcripts', note: '10th, 12th, and graduation mark sheets', Icon: GraduationCap },
  { label: 'English Proficiency', note: 'IELTS / TOEFL / PTE — as required by institution', Icon: Languages },
  { label: 'Statement of Purpose (SOP)', note: 'Drafted with Placedly advisory support', Icon: PenLine },
  { label: 'Letters of Recommendation', note: 'Typically 2–3 from academic or professional referees', Icon: Users },
  { label: 'Updated CV / Resume', note: 'Professionally formatted', Icon: FileText },
  { label: 'Proof of Funds', note: 'Bank statements — typically 3–6 months', Icon: Wallet },
  { label: 'University Admission Letter', note: 'Issued upon offer acceptance', Icon: Award },
  { label: 'Visa Application Form', note: 'Country and category-specific', Icon: FileSignature },
];

/* ────────────────────────────────────────────────────────────
   Animated counter for the stat strip
──────────────────────────────────────────────────────────── */

function AnimatedCounter({ target, suffix = '' }: { target: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!inView) return;
    let frame: number;
    const duration = 900;
    const start = performance.now();
    const tick = (now: number) => {
      const progress = Math.min(1, (now - start) / duration);
      setValue(Math.round(progress * target));
      if (progress < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [inView, target]);

  return (
    <span ref={ref}>
      {String(value).padStart(2, '0')}
      {suffix}
    </span>
  );
}

/* ────────────────────────────────────────────────────────────
   Scroll-driven timeline hook — tracks fill % + active step
──────────────────────────────────────────────────────────── */

function useTimelineProgress(count: number) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [fill, setFill] = useState(0);
  const [activeStep, setActiveStep] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const el = trackRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const viewportMid = window.innerHeight * 0.5;
      const progress = (viewportMid - rect.top) / rect.height;
      setFill(Math.min(1, Math.max(0, progress)));
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);

  useEffect(() => {
    const nodes = trackRef.current?.querySelectorAll<HTMLElement>('[data-process-step]');
    if (!nodes || !nodes.length) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const idx = Number(entry.target.getAttribute('data-process-step'));
          if (!Number.isNaN(idx)) setActiveStep(idx);
        });
      },
      { threshold: 0.5, rootMargin: '-35% 0px -35% 0px' },
    );
    nodes.forEach((n) => observer.observe(n));
    return () => observer.disconnect();
  }, [count]);

  return { trackRef, fill, activeStep };
}

/* ════════════════════════════════════════════════════════════
   Component
════════════════════════════════════════════════════════════ */

export default function OurProcessSection() {
  const { trackRef, fill, activeStep } = useTimelineProgress(PROCESS_STEPS.length);
  const activeAccent = stepAccent(activeStep);

  return (
    <section
      id="our-process"
      style={{
        position: 'relative',
        padding: 'clamp(56px, 8vw, 112px) clamp(16px, 5vw, 24px)',
        overflow: 'hidden',
        background: '#fafafa',
      }}
    >
      {/* ambient recoloring blobs — tie to active step accent */}
      <motion.div
        aria-hidden
        className="process-blob"
        style={{
          position: 'absolute',
          top: '-10%',
          left: '-8%',
          width: '440px',
          height: '440px',
          borderRadius: '50%',
          filter: 'blur(100px)',
          zIndex: 0,
          pointerEvents: 'none',
        }}
        animate={{
          background: `radial-gradient(circle, ${activeAccent.from}28 0%, transparent 70%)`,
        }}
        transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
      />
      <motion.div
        aria-hidden
        className="process-blob"
        style={{
          position: 'absolute',
          bottom: '-10%',
          right: '-8%',
          width: '480px',
          height: '480px',
          borderRadius: '50%',
          filter: 'blur(110px)',
          zIndex: 0,
          pointerEvents: 'none',
        }}
        animate={{
          background: `radial-gradient(circle, ${activeAccent.to}24 0%, transparent 70%)`,
        }}
        transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
      />

      <div style={{ position: 'relative', zIndex: 1, maxWidth: '1180px', margin: '0 auto' }}>
        {/* ── Header ── */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.5 }}
          style={{ textAlign: 'center', marginBottom: 'clamp(20px, 3vw, 28px)' }}
        >
          <p
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              fontSize: '13px',
              fontWeight: 600,
              textTransform: 'uppercase',
              letterSpacing: '1.5px',
              color: activeAccent.from,
              marginBottom: '14px',
              transition: 'color 0.4s ease',
            }}
          >
            <Sparkles size={14} strokeWidth={2.25} aria-hidden />
            Our Process
          </p>
          <h2
            style={{
              fontSize: 'clamp(1.9rem, 4.2vw, 3.1rem)',
              fontWeight: 800,
              lineHeight: 1.12,
              marginBottom: '14px',
              letterSpacing: '-0.02em',
              ...headingGradientStyle,
            }}
          >
            From Aspiration to Admission — We Handle It All
          </h2>
          <p
            style={{
              fontSize: 'clamp(0.95rem, 1.4vw, 1.1rem)',
              color: '#666',
              maxWidth: '640px',
              margin: '0 auto',
              lineHeight: 1.6,
            }}
          >
            A structured, six-step journey — guided by a dedicated advisor from your first
            conversation to the day you board your flight.
          </p>
        </motion.div>

        {/* ── Stat strip ── */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          style={{
            display: 'flex',
            justifyContent: 'center',
            gap: 'clamp(24px, 5vw, 56px)',
            flexWrap: 'wrap',
            margin: '0 auto clamp(48px, 6vw, 72px)',
          }}
        >
          {[
            { target: 6, suffix: '', label: 'Structured Steps' },
            { target: 9, suffix: '', label: 'Key Documents' },
            { target: 100, suffix: '%', label: 'Personalised Guidance' },
          ].map((stat) => (
            <div key={stat.label} style={{ textAlign: 'center' }}>
              <div
                style={{
                  fontSize: 'clamp(1.6rem, 3vw, 2.2rem)',
                  fontWeight: 800,
                  ...headingGradientStyle,
                }}
              >
                <AnimatedCounter target={stat.target} suffix={stat.suffix} />
              </div>
              <div
                style={{
                  fontSize: '12.5px',
                  fontWeight: 600,
                  color: '#64748b',
                  textTransform: 'uppercase',
                  letterSpacing: '0.06em',
                  marginTop: '2px',
                }}
              >
                {stat.label}
              </div>
            </div>
          ))}
        </motion.div>

        {/* ── Timeline ── */}
        <div ref={trackRef} className="process-track">
          {/* central connecting line (desktop) / left line (mobile) */}
          <div className="process-line" aria-hidden>
            <div
              className="process-line-fill"
              style={{
                height: `${fill * 100}%`,
                backgroundImage: HEADING_GRADIENT,
                backgroundSize: '200% 200%',
              }}
            />
          </div>

          {PROCESS_STEPS.map((step, i) => {
            const accent = stepAccent(i);
            const isLeft = i % 2 === 0;
            const isPassed = fill >= (i + 0.5) / PROCESS_STEPS.length;
            const isActive = activeStep === i;

            return (
              <div
                key={step.id}
                data-process-step={i}
                className={`process-row ${isLeft ? 'is-left' : 'is-right'}`}
              >
                <div className="process-spacer" aria-hidden />

                <div className="process-dot-col">
                  <motion.div
                    className="process-dot"
                    animate={{
                      scale: isActive ? 1.18 : 1,
                      boxShadow: isPassed
                        ? `0 0 0 6px ${accent.from}22, 0 4px 14px ${accent.from}55`
                        : '0 0 0 4px rgba(15,23,42,0.05)',
                    }}
                    transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                    style={{
                      backgroundImage: isPassed
                        ? `linear-gradient(135deg, ${accent.from}, ${accent.to})`
                        : undefined,
                      backgroundColor: isPassed ? undefined : '#fff',
                      borderColor: isPassed ? 'transparent' : 'rgba(15,23,42,0.15)',
                    }}
                  >
                    <step.Icon
                      size={16}
                      strokeWidth={2.4}
                      color={isPassed ? '#fff' : '#94a3b8'}
                    />
                  </motion.div>
                </div>

                <motion.div
                  className="process-card"
                  initial={{ opacity: 0, x: isLeft ? 40 : -40 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, amount: 0.5 }}
                  transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                  whileHover={{ y: -4 }}
                  style={{
                    borderColor: isActive ? accent.border : 'rgba(15,23,42,0.08)',
                    boxShadow: isActive
                      ? `0 16px 34px ${accent.soft}`
                      : '0 4px 16px rgba(15,23,42,0.05)',
                  }}
                >
                  <span className="process-card-number" style={{ color: accent.from }}>
                    {step.number}
                  </span>
                  <h3 className="process-card-title" style={{ color: accent.from }}>
                    {step.title}
                  </h3>
                  <p className="process-card-desc">{step.description}</p>
                </motion.div>
              </div>
            );
          })}
        </div>

        {/* ── Document Checklist ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5 }}
          style={{ marginTop: 'clamp(72px, 9vw, 112px)' }}
        >
          <div style={{ textAlign: 'center', marginBottom: 'clamp(28px, 4vw, 40px)' }}>
            <p
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                fontSize: '13px',
                fontWeight: 600,
                textTransform: 'uppercase',
                letterSpacing: '1.5px',
                color: '#6366f1',
                marginBottom: '14px',
              }}
            >
              <ClipboardList size={14} strokeWidth={2.25} aria-hidden />
              Document Checklist
            </p>
            <h2
              style={{
                fontSize: 'clamp(1.7rem, 3.6vw, 2.6rem)',
                fontWeight: 800,
                lineHeight: 1.15,
                marginBottom: '12px',
                letterSpacing: '-0.02em',
                ...headingGradientStyle,
              }}
            >
              What You Will Typically Need
            </h2>
            <p
              style={{
                fontSize: 'clamp(0.9rem, 1.3vw, 1.02rem)',
                color: '#666',
                maxWidth: '620px',
                margin: '0 auto',
                lineHeight: 1.6,
              }}
            >
              Requirements vary by country and university. The following is a standard baseline.
            </p>
          </div>

          <div className="doc-table-wrap">
            <table className="doc-table">
              <thead>
                <tr>
                  <th>Document</th>
                  <th>Notes</th>
                </tr>
              </thead>
              <tbody>
                {DOCUMENTS.map((doc, i) => {
                  const accent = stepAccent(i);
                  return (
                    <motion.tr
                      key={doc.label}
                      initial={{ opacity: 0, y: 12 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, amount: 0.4 }}
                      transition={{ duration: 0.35, delay: i * 0.04 }}
                    >
                      <td data-label="Document">
                        <span
                          className="doc-icon"
                          style={{
                            background: accent.soft,
                            color: accent.from,
                          }}
                        >
                          <doc.Icon size={16} strokeWidth={2.1} />
                        </span>
                        {doc.label}
                      </td>
                      <td data-label="Notes">{doc.note}</td>
                    </motion.tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          <div className="doc-advisor-note">
            <span className="doc-advisor-note-icon">
              <Sparkles size={15} strokeWidth={2.4} />
            </span>
            <p>
              Your Placedly advisor will provide a{' '}
              <strong>personalised, destination-specific checklist</strong> during your
              counselling session.
            </p>
          </div>
        </motion.div>

        {/* ── Closing CTA ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.5 }}
          className="process-cta"
        >
          <motion.div
            aria-hidden
            className="process-cta-sweep"
            animate={{ x: ['-30%', '130%'] }}
            transition={{ duration: 3.5, repeat: Infinity, ease: 'linear' }}
          />
          <h2 style={{ ...headingGradientStyle, position: 'relative', zIndex: 1 }}>
            Your Global Journey Starts With One Conversation
          </h2>
          <p style={{ position: 'relative', zIndex: 1 }}>
            Book a free counselling session today. No obligations — just clarity on your path
            forward.
          </p>
          <motion.div
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.98 }}
            style={{ position: 'relative', zIndex: 1, display: 'inline-block' }}
          >
            <Link href="/study-visa" className="process-cta-btn">
              <span className="process-cta-btn-shine" aria-hidden />
              <span style={{ position: 'relative', zIndex: 1 }}>
                Book Free Study Abroad Counselling
              </span>
              <ArrowRight size={17} strokeWidth={2.4} className="process-cta-btn-arrow" />
            </Link>
          </motion.div>
        </motion.div>
      </div>

      <style>{`
        /* ── Timeline layout ── */
        .process-track {
          position: relative;
        }
        .process-line {
          position: absolute;
          left: 50%;
          top: 6px;
          bottom: 6px;
          width: 3px;
          background: rgba(15, 23, 42, 0.08);
          transform: translateX(-50%);
          border-radius: 999px;
          overflow: hidden;
        }
        .process-line-fill {
          position: absolute;
          left: 0;
          top: 0;
          width: 100%;
          border-radius: 999px;
          transition: height 0.15s linear;
        }
        .process-row {
          position: relative;
          display: grid;
          grid-template-columns: 1fr 64px 1fr;
          align-items: center;
          gap: 20px;
          margin-bottom: 48px;
        }
        .process-row:last-child {
          margin-bottom: 0;
        }
        .process-row.is-left .process-card {
          grid-column: 1;
          justify-self: end;
          text-align: right;
        }
        .process-row.is-left .process-spacer {
          grid-column: 3;
        }
        .process-row.is-right .process-card {
          grid-column: 3;
          justify-self: start;
          text-align: left;
        }
        .process-row.is-right .process-spacer {
          grid-column: 1;
        }
        .process-dot-col {
          grid-column: 2;
          display: flex;
          justify-content: center;
        }
        .process-dot {
          width: 42px;
          height: 42px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          border: 2px solid rgba(15, 23, 42, 0.15);
          background: #fff;
          flex-shrink: 0;
          z-index: 2;
        }
        .process-card {
          max-width: 420px;
          background: #fff;
          border-radius: 18px;
          padding: 22px 26px;
          border: 1.5px solid rgba(15, 23, 42, 0.08);
          transition: border-color 0.3s ease, box-shadow 0.3s ease;
        }
        .process-card-number {
          display: block;
          font-size: 12px;
          font-weight: 800;
          letter-spacing: 0.08em;
          margin-bottom: 6px;
          opacity: 0.85;
        }
        .process-card-title {
          font-size: 17px;
          font-weight: 800;
          margin-bottom: 8px;
          line-height: 1.3;
        }
        .process-card-desc {
          font-size: 14px;
          line-height: 1.65;
          color: #555;
        }

        /* ── Document table ── */
        .doc-table-wrap {
          background: #fff;
          border-radius: 22px;
          overflow: hidden;
          border: 1px solid rgba(15, 23, 42, 0.07);
          box-shadow: 0 14px 40px rgba(15, 23, 42, 0.06);
        }
        .doc-table {
          width: 100%;
          border-collapse: collapse;
        }
        .doc-table thead th {
          text-align: left;
          padding: 16px 26px;
          font-size: 11.5px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.08em;
          color: #64748b;
          background: rgba(99, 102, 241, 0.045);
          border-bottom: 1px solid rgba(15, 23, 42, 0.06);
        }
        .doc-table tbody tr {
          border-bottom: 1px solid rgba(15, 23, 42, 0.055);
          transition: background 0.2s ease;
        }
        .doc-table tbody tr:last-child {
          border-bottom: none;
        }
        .doc-table tbody tr:hover {
          background: rgba(99, 102, 241, 0.035);
        }
        .doc-table td {
          padding: 15px 26px;
          font-size: 14px;
          color: #334155;
          vertical-align: middle;
          line-height: 1.5;
        }
        .doc-table td:first-child {
          font-weight: 700;
          color: #0f172a;
          display: flex;
          align-items: center;
          gap: 12px;
          white-space: nowrap;
        }
        .doc-icon {
          width: 32px;
          height: 32px;
          border-radius: 9px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .doc-advisor-note {
          display: flex;
          align-items: flex-start;
          gap: 10px;
          margin-top: 20px;
          padding: 16px 20px;
          border-radius: 14px;
          background: rgba(99, 102, 241, 0.06);
          border: 1px solid rgba(99, 102, 241, 0.15);
        }
        .doc-advisor-note-icon {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 26px;
          height: 26px;
          border-radius: 50%;
          background: rgba(99, 102, 241, 0.15);
          color: #6366f1;
          flex-shrink: 0;
          margin-top: 1px;
        }
        .doc-advisor-note p {
          font-size: 13.5px;
          line-height: 1.6;
          color: #475569;
        }

        /* ── Closing CTA ── */
        .process-cta {
          position: relative;
          overflow: hidden;
          text-align: center;
          margin-top: clamp(64px, 8vw, 96px);
          padding: clamp(36px, 5vw, 56px) clamp(24px, 5vw, 48px);
          border-radius: 28px;
          background: linear-gradient(135deg, rgba(37,99,235,0.06) 0%, rgba(147,51,234,0.06) 100%);
          border: 1px solid rgba(37,99,235,0.14);
          box-shadow: 0 20px 50px rgba(37,99,235,0.08);
        }
        .process-cta-sweep {
          position: absolute;
          top: 0;
          bottom: 0;
          width: 40%;
          background: linear-gradient(90deg, transparent, rgba(147,51,234,0.07), transparent);
          pointer-events: none;
        }
        .process-cta h2 {
          font-size: clamp(1.5rem, 3.4vw, 2.3rem);
          font-weight: 800;
          letter-spacing: -0.02em;
          margin-bottom: 12px;
        }
        .process-cta p {
          font-size: clamp(0.92rem, 1.3vw, 1.02rem);
          color: #555;
          max-width: 520px;
          margin: 0 auto 26px;
          line-height: 1.6;
        }

        .process-cta-btn {
          position: relative;
          display: inline-flex;
          align-items: center;
          gap: 10px;
          padding: 15px 30px;
          border-radius: 999px;
          font-weight: 700;
          font-size: 15px;
          color: #fff;
          background-image: ${HEADING_GRADIENT};
          background-size: 200% 200%;
          border: 1px solid rgba(255,255,255,0.25);
          box-shadow: 0 12px 30px rgba(79,70,229,0.28), 0 4px 12px rgba(0,0,0,0.12);
          overflow: hidden;
          isolation: isolate;
          transition: transform 0.28s cubic-bezier(0.22,1,0.36,1),
                      box-shadow 0.28s cubic-bezier(0.22,1,0.36,1),
                      filter 0.28s ease,
                      background-position 0.6s ease;
        }
        .process-cta-btn:hover {
          filter: brightness(1.07);
          box-shadow: 0 18px 38px rgba(79,70,229,0.36), 0 6px 16px rgba(0,0,0,0.16);
          background-position: 100% 50%;
        }
        .process-cta-btn-arrow {
          position: relative;
          z-index: 1;
          transition: transform 0.25s ease;
        }
        .process-cta-btn:hover .process-cta-btn-arrow {
          transform: translateX(4px);
        }
        .process-cta-btn-shine {
          position: absolute;
          top: 0;
          left: -130%;
          width: 55%;
          height: 100%;
          background: linear-gradient(115deg, transparent, rgba(255,255,255,0.5), transparent);
          transform: skewX(-20deg);
          transition: left 0.65s ease;
          z-index: 0;
        }
        .process-cta-btn:hover .process-cta-btn-shine {
          left: 140%;
        }

        /* ── Responsive: mobile timeline + table ── */
        @media (max-width: 780px) {
          .process-blob { display: none; }

          .process-line {
            left: 20px;
            transform: none;
          }
          .process-row {
            grid-template-columns: 40px 1fr;
            gap: 14px;
          }
          .process-row .process-spacer {
            display: none;
          }
          .process-row.is-left .process-card,
          .process-row.is-right .process-card {
            grid-column: 2;
            justify-self: start;
            text-align: left;
            max-width: 100%;
          }
          .process-dot-col {
            grid-column: 1;
            justify-content: flex-start;
          }
          .process-dot {
            width: 36px;
            height: 36px;
          }

          .doc-table thead {
            display: none;
          }
          .doc-table, .doc-table tbody, .doc-table tr, .doc-table td {
            display: block;
            width: 100%;
          }
          .doc-table tr {
            padding: 16px 20px;
          }
          .doc-table td {
            padding: 4px 0;
            border: none;
          }
          .doc-table td:first-child {
            white-space: normal;
          }
          .doc-table td:nth-child(2) {
            padding-left: 44px;
            color: #64748b;
          }
          .doc-table td:nth-child(2)::before {
            content: 'Notes';
            display: block;
            font-size: 10px;
            font-weight: 700;
            text-transform: uppercase;
            letter-spacing: 0.06em;
            color: #94a3b8;
            margin: 4px 0 2px;
          }
        }
      `}</style>
    </section>
  );
}