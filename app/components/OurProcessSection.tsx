'use client';

import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
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
  ChevronDown,
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
  short: string;
  title: string;
  description: string;
  Icon: LucideIcon;
};

const PROCESS_STEPS: ProcessStep[] = [
  {
    id: 'counselling',
    number: '01',
    short: 'Counselling',
    title: 'Free Counselling Session',
    description:
      'We understand your academic background, career goals, budget, and preferred destination. We recommend best-fit countries and programmes.',
    Icon: MessageSquare,
  },
  {
    id: 'shortlisting',
    number: '02',
    short: 'Shortlisting',
    title: 'University Shortlisting',
    description:
      'Based on your profile, we shortlist universities with the highest probability of acceptance — balancing ambition with realism.',
    Icon: Search,
  },
  {
    id: 'application',
    number: '03',
    short: 'Application',
    title: 'Application Preparation',
    description:
      'We assist with your SOP, Letters of Recommendation, and application submissions — ensuring every document reflects your strongest self.',
    Icon: PenLine,
  },
  {
    id: 'offer',
    number: '04',
    short: 'Admission',
    title: 'Offer & Admission',
    description:
      'Once you receive your admission letter, we guide you through acceptance, conditional fulfilment, and pre-visa requirements.',
    Icon: Award,
  },
  {
    id: 'visa',
    number: '05',
    short: 'Visa',
    title: 'Visa Documentation & Application',
    description:
      'We prepare and review your complete visa documentation — reducing the risk of rejection through rigorous compliance checking.',
    Icon: FileCheck2,
  },
  {
    id: 'predeparture',
    number: '06',
    short: 'Departure',
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
  { label: 'Statement of Purpose', note: 'Drafted with Placedly advisory support', Icon: PenLine },
  { label: 'Letters of Recommendation', note: 'Typically 2–3 from academic or professional referees', Icon: Users },
  { label: 'Updated CV / Resume', note: 'Professionally formatted', Icon: FileText },
  { label: 'Proof of Funds', note: 'Bank statements — typically 3–6 months', Icon: Wallet },
  { label: 'Admission Letter', note: 'Issued upon offer acceptance', Icon: Award },
  { label: 'Visa Application Form', note: 'Country and category-specific', Icon: FileSignature },
];

const INTERVAL_MS = 3600;

/* ════════════════════════════════════════════════════════════
   Component
════════════════════════════════════════════════════════════ */

export default function OurProcessSection() {
  const [activeStep, setActiveStep] = useState(0);
  const [expandedDoc, setExpandedDoc] = useState<number | null>(null);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const accent = stepAccent(activeStep);
  const active = PROCESS_STEPS[activeStep];

  const startInterval = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      setActiveStep((p) => (p + 1) % PROCESS_STEPS.length);
    }, INTERVAL_MS);
  };

  useEffect(() => {
    startInterval();
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleStepClick = (i: number) => {
    setActiveStep(i);
    startInterval();
  };

  return (
    <section
      id="our-process"
      style={{
        position: 'relative',
        padding: 'clamp(40px, 6vw, 64px) clamp(16px, 5vw, 24px)',
        overflow: 'hidden',
        background: '#fafafa',
      }}
    >
      {/* ambient recoloring blobs — smaller & subtler than a full-length section */}
      <motion.div
        aria-hidden
        className="process-blob"
        style={{ position: 'absolute', top: '-14%', left: '-8%', width: '320px', height: '320px', borderRadius: '50%', filter: 'blur(90px)', zIndex: 0, pointerEvents: 'none' }}
        animate={{ background: `radial-gradient(circle, ${accent.from}26 0%, transparent 70%)` }}
        transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
      />
      <motion.div
        aria-hidden
        className="process-blob"
        style={{ position: 'absolute', bottom: '-16%', right: '-8%', width: '340px', height: '340px', borderRadius: '50%', filter: 'blur(100px)', zIndex: 0, pointerEvents: 'none' }}
        animate={{ background: `radial-gradient(circle, ${accent.to}22 0%, transparent 70%)` }}
        transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
      />

      <div style={{ position: 'relative', zIndex: 1, maxWidth: '1080px', margin: '0 auto' }}>
        {/* ── Header ── */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.45 }}
          style={{ textAlign: 'center', marginBottom: 'clamp(22px, 3vw, 32px)' }}
        >
          <p
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              fontSize: '12.5px',
              fontWeight: 600,
              textTransform: 'uppercase',
              letterSpacing: '1.4px',
              color: accent.from,
              marginBottom: '10px',
              transition: 'color 0.4s ease',
            }}
          >
            <Sparkles size={13} strokeWidth={2.25} aria-hidden />
            Our Process
          </p>
          <h2
            style={{
              fontSize: 'clamp(1.6rem, 3.4vw, 2.4rem)',
              fontWeight: 800,
              lineHeight: 1.15,
              marginBottom: '10px',
              letterSpacing: '-0.02em',
              ...headingGradientStyle,
            }}
          >
            From Aspiration to Admission — We Handle It All
          </h2>
          <p
            style={{
              fontSize: 'clamp(0.88rem, 1.2vw, 0.98rem)',
              color: '#666',
              maxWidth: '540px',
              margin: '0 auto 12px',
              lineHeight: 1.55,
            }}
          >
            A structured, six-step journey — guided by a dedicated advisor from your first
            conversation to the day you board your flight.
          </p>

          {/* compact single-line stat badge */}
          <div className="process-stat-line">
            <span><strong>06</strong> Steps</span>
            <span className="process-stat-dot" />
            <span><strong>09</strong> Documents</span>
            <span className="process-stat-dot" />
            <span><strong>100%</strong> Personalised</span>
          </div>
        </motion.div>

        {/* ── Compact interactive stepper ── */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.45, delay: 0.05 }}
        >
          <div className="process-stepper-scroll">
            <div className="process-stepper">
              {PROCESS_STEPS.map((step, i) => {
                const stAccent = stepAccent(i);
                const isPassed = i <= activeStep;
                const isActive = i === activeStep;
                return (
                  <div key={step.id} className="process-step-node">
                    <button
                      type="button"
                      onClick={() => handleStepClick(i)}
                      aria-label={step.title}
                      className="process-step-btn"
                      style={{
                        backgroundImage: isPassed
                          ? `linear-gradient(135deg, ${stAccent.from}, ${stAccent.to})`
                          : undefined,
                        backgroundColor: isPassed ? undefined : '#fff',
                        borderColor: isPassed ? 'transparent' : 'rgba(15,23,42,0.15)',
                        boxShadow: isActive
                          ? `0 0 0 5px ${stAccent.from}22, 0 6px 16px ${stAccent.from}45`
                          : 'none',
                        transform: isActive ? 'scale(1.12)' : 'scale(1)',
                      }}
                    >
                      <step.Icon size={15} strokeWidth={2.4} color={isPassed ? '#fff' : '#94a3b8'} />
                    </button>
                    <span
                      className="process-step-label"
                      style={{ color: isActive ? stAccent.from : '#94a3b8', fontWeight: isActive ? 700 : 600 }}
                    >
                      {step.short}
                    </span>
                    {i < PROCESS_STEPS.length - 1 && (
                      <span
                        className="process-connector"
                        style={{
                          backgroundImage: i < activeStep ? HEADING_GRADIENT : undefined,
                          backgroundColor: i < activeStep ? undefined : 'rgba(15,23,42,0.10)',
                        }}
                      />
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* single detail panel — swaps content instead of stacking 6 cards */}
          <AnimatePresence mode="wait">
            <motion.div
              key={active.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="process-panel"
              style={{ borderColor: accent.border, boxShadow: `0 14px 32px ${accent.soft}` }}
            >
              <span
                className="process-panel-icon"
                style={{ backgroundImage: `linear-gradient(135deg, ${accent.from}, ${accent.to})` }}
              >
                <active.Icon size={20} strokeWidth={2.2} color="#fff" />
              </span>
              <div>
                <span className="process-panel-number" style={{ color: accent.from }}>
                  Step {active.number}
                </span>
                <h3 className="process-panel-title">{active.title}</h3>
                <p className="process-panel-desc">{active.description}</p>
              </div>
            </motion.div>
          </AnimatePresence>
        </motion.div>

        {/* ── Document Checklist (collapsible chip grid) ── */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.45 }}
          style={{ marginTop: 'clamp(36px, 5vw, 52px)' }}
        >
          <div style={{ textAlign: 'center', marginBottom: '18px' }}>
            <p
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                fontSize: '12.5px',
                fontWeight: 600,
                textTransform: 'uppercase',
                letterSpacing: '1.4px',
                color: '#6366f1',
                marginBottom: '8px',
              }}
            >
              <ClipboardList size={13} strokeWidth={2.25} aria-hidden />
              Document Checklist
            </p>
            <h2
              style={{
                fontSize: 'clamp(1.3rem, 2.6vw, 1.8rem)',
                fontWeight: 800,
                lineHeight: 1.2,
                marginBottom: '6px',
                letterSpacing: '-0.02em',
                ...headingGradientStyle,
              }}
            >
              What You Will Typically Need
            </h2>
            <p style={{ fontSize: '13px', color: '#777', maxWidth: '480px', margin: '0 auto' }}>
              Tap a document to see notes. Requirements vary by country and university.
            </p>
          </div>

          <div className="doc-chip-grid">
            {DOCUMENTS.map((doc, i) => {
              const docAccent = stepAccent(i);
              const isOpen = expandedDoc === i;
              return (
                <button
                  key={doc.label}
                  type="button"
                  onClick={() => setExpandedDoc(isOpen ? null : i)}
                  className={`doc-chip${isOpen ? ' is-open' : ''}`}
                  style={{ borderColor: isOpen ? docAccent.border : 'rgba(15,23,42,0.08)' }}
                >
                  <span className="doc-chip-row">
                    <span className="doc-chip-icon" style={{ background: docAccent.soft, color: docAccent.from }}>
                      <doc.Icon size={14} strokeWidth={2.1} />
                    </span>
                    <span className="doc-chip-label">{doc.label}</span>
                    <ChevronDown
                      size={14}
                      strokeWidth={2.4}
                      className="doc-chip-chevron"
                      style={{ transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)', color: docAccent.from }}
                    />
                  </span>
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.span
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.22, ease: [0.4, 0, 0.2, 1] }}
                        className="doc-chip-note"
                      >
                        {doc.note}
                      </motion.span>
                    )}
                  </AnimatePresence>
                </button>
              );
            })}
          </div>

          <div className="doc-advisor-note">
            <Sparkles size={13} strokeWidth={2.4} />
            <p>
              Your advisor provides a <strong>personalised, destination-specific checklist</strong> during counselling.
            </p>
          </div>
        </motion.div>

        {/* ── Closing CTA (slim banner) ── */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.45 }}
          className="process-cta"
        >
          <motion.div
            aria-hidden
            className="process-cta-sweep"
            animate={{ x: ['-30%', '130%'] }}
            transition={{ duration: 3.5, repeat: Infinity, ease: 'linear' }}
          />
          <div className="process-cta-text">
            <h3 style={headingGradientStyle}>Your Global Journey Starts With One Conversation</h3>
            <p>Book a free counselling session today — no obligations, just clarity.</p>
          </div>
          <motion.div whileHover={{ y: -2 }} whileTap={{ scale: 0.98 }} style={{ position: 'relative', zIndex: 1, flexShrink: 0 }}>
            <Link href="/study-visa" className="process-cta-btn">
              <span className="process-cta-btn-shine" aria-hidden />
              <span style={{ position: 'relative', zIndex: 1 }}>Book Free Counselling</span>
              <ArrowRight size={16} strokeWidth={2.4} className="process-cta-btn-arrow" />
            </Link>
          </motion.div>
        </motion.div>
      </div>

      <style>{`
        .process-stat-line {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          font-size: 12.5px;
          color: #64748b;
          background: #fff;
          border: 1px solid rgba(15,23,42,0.07);
          padding: 6px 16px;
          border-radius: 999px;
          box-shadow: 0 2px 10px rgba(15,23,42,0.04);
        }
        .process-stat-line strong { color: #334155; font-weight: 800; }
        .process-stat-dot {
          width: 3px; height: 3px; border-radius: 50%; background: #cbd5e1; flex-shrink: 0;
        }

        /* ── Stepper ── */
        .process-stepper-scroll {
          overflow-x: auto;
          -webkit-overflow-scrolling: touch;
          scrollbar-width: none;
          padding-bottom: 2px;
        }
        .process-stepper-scroll::-webkit-scrollbar { display: none; }
        .process-stepper {
          display: flex;
          align-items: flex-start;
          justify-content: center;
          min-width: max-content;
          margin: 0 auto;
          padding: 4px 8px;
        }
        .process-step-node {
          display: flex;
          align-items: center;
          flex-shrink: 0;
        }
        .process-step-btn {
          width: 38px;
          height: 38px;
          border-radius: 50%;
          border: 2px solid;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: transform 0.3s cubic-bezier(0.22,1,0.36,1), box-shadow 0.3s ease, background 0.3s ease;
          flex-shrink: 0;
        }
        .process-step-label {
          position: absolute;
          margin-top: 52px;
          font-size: 10.5px;
          letter-spacing: 0.02em;
          white-space: nowrap;
          transition: color 0.3s ease;
        }
        .process-connector {
          width: 34px;
          height: 2px;
          margin: 0 4px;
          border-radius: 999px;
          background-size: 200% 200%;
          transition: background 0.4s ease;
          flex-shrink: 0;
        }

        /* ── Detail panel ── */
        .process-panel {
          display: flex;
          align-items: flex-start;
          gap: 16px;
          max-width: 640px;
          margin: 42px auto 0;
          background: #fff;
          border: 1.5px solid rgba(15,23,42,0.08);
          border-radius: 18px;
          padding: 20px 22px;
        }
        .process-panel-icon {
          width: 44px;
          height: 44px;
          border-radius: 14px;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }
        .process-panel-number {
          font-size: 11px;
          font-weight: 800;
          letter-spacing: 0.06em;
          text-transform: uppercase;
        }
        .process-panel-title {
          font-size: 16.5px;
          font-weight: 800;
          color: #0f172a;
          margin: 3px 0 6px;
          line-height: 1.3;
        }
        .process-panel-desc {
          font-size: 13.5px;
          line-height: 1.6;
          color: #555;
        }

        /* ── Document chip grid ── */
        .doc-chip-grid {
          display: flex;
          flex-wrap: wrap;
          align-items: flex-start;
          gap: 10px;
          justify-content: center;
        }
        .doc-chip {
          flex: 0 1 calc(33.333% - 10px);
          min-width: 220px;
          text-align: left;
          background: #fff;
          border: 1.5px solid rgba(15,23,42,0.08);
          border-radius: 14px;
          padding: 11px 14px;
          cursor: pointer;
          transition: border-color 0.25s ease, box-shadow 0.25s ease;
        }
        .doc-chip:hover {
          box-shadow: 0 6px 18px rgba(15,23,42,0.06);
        }
        .doc-chip.is-open {
          box-shadow: 0 10px 24px rgba(15,23,42,0.08);
        }
        .doc-chip-row {
          display: flex;
          align-items: center;
          gap: 10px;
        }
        .doc-chip-icon {
          width: 26px;
          height: 26px;
          border-radius: 8px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }
        .doc-chip-label {
          font-size: 13px;
          font-weight: 700;
          color: #0f172a;
          flex: 1;
        }
        .doc-chip-chevron {
          flex-shrink: 0;
          transition: transform 0.25s ease;
        }
        .doc-chip-note {
          display: block;
          overflow: hidden;
          font-size: 12.5px;
          color: #64748b;
          line-height: 1.5;
          padding-left: 36px;
          padding-top: 6px;
        }

        .doc-advisor-note {
          display: flex;
          align-items: flex-start;
          gap: 8px;
          max-width: 560px;
          margin: 16px auto 0;
          padding: 10px 16px;
          border-radius: 12px;
          background: rgba(99, 102, 241, 0.06);
          border: 1px solid rgba(99, 102, 241, 0.15);
          color: #6366f1;
        }
        .doc-advisor-note p {
          font-size: 12.5px;
          line-height: 1.5;
          color: #475569;
        }

        /* ── Closing CTA ── */
        .process-cta {
          position: relative;
          overflow: hidden;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 20px;
          flex-wrap: wrap;
          margin-top: clamp(32px, 4.5vw, 48px);
          padding: clamp(20px, 3vw, 28px) clamp(22px, 4vw, 32px);
          border-radius: 22px;
          background: linear-gradient(135deg, rgba(37,99,235,0.06) 0%, rgba(147,51,234,0.06) 100%);
          border: 1px solid rgba(37,99,235,0.14);
        }
        .process-cta-sweep {
          position: absolute;
          top: 0; bottom: 0;
          width: 40%;
          background: linear-gradient(90deg, transparent, rgba(147,51,234,0.06), transparent);
          pointer-events: none;
        }
        .process-cta-text { position: relative; z-index: 1; max-width: 420px; }
        .process-cta-text h3 {
          font-size: clamp(1.05rem, 1.8vw, 1.3rem);
          font-weight: 800;
          letter-spacing: -0.01em;
          margin-bottom: 4px;
          line-height: 1.3;
        }
        .process-cta-text p {
          font-size: 13px;
          color: #666;
          line-height: 1.5;
        }

        .process-cta-btn {
          position: relative;
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 12px 22px;
          border-radius: 999px;
          font-weight: 700;
          font-size: 13.5px;
          color: #fff;
          background-image: ${HEADING_GRADIENT};
          background-size: 200% 200%;
          border: 1px solid rgba(255,255,255,0.25);
          box-shadow: 0 10px 24px rgba(79,70,229,0.26);
          overflow: hidden;
          isolation: isolate;
          white-space: nowrap;
          transition: transform 0.25s cubic-bezier(0.22,1,0.36,1), box-shadow 0.25s ease, filter 0.25s ease, background-position 0.6s ease;
        }
        .process-cta-btn:hover {
          filter: brightness(1.07);
          box-shadow: 0 14px 30px rgba(79,70,229,0.34);
          background-position: 100% 50%;
        }
        .process-cta-btn-arrow { position: relative; z-index: 1; transition: transform 0.25s ease; }
        .process-cta-btn:hover .process-cta-btn-arrow { transform: translateX(3px); }
        .process-cta-btn-shine {
          position: absolute; top: 0; left: -130%; width: 55%; height: 100%;
          background: linear-gradient(115deg, transparent, rgba(255,255,255,0.5), transparent);
          transform: skewX(-20deg);
          transition: left 0.6s ease;
          z-index: 0;
        }
        .process-cta-btn:hover .process-cta-btn-shine { left: 140%; }

        /* ── Responsive ── */
        @media (max-width: 640px) {
          .process-blob { display: none; }
          .process-step-btn { width: 34px; height: 34px; }
          .process-step-label { display: none; }
          .process-connector { width: 22px; }
          .process-panel { margin-top: 26px; padding: 16px 16px; gap: 12px; }
          .process-panel-icon { width: 38px; height: 38px; }
          .doc-chip { flex: 1 1 100%; min-width: 0; }
          .process-cta { flex-direction: column; align-items: flex-start; }
          .process-cta-btn { width: 100%; justify-content: center; }
        }
        @media (min-width: 641px) and (max-width: 900px) {
          .doc-chip { flex: 0 1 calc(50% - 10px); }
        }
      `}</style>
    </section>
  );
}