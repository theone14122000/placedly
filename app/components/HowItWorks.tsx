'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import {
  BadgeCheck,
  FileText,
  GraduationCap,
  Plane,
  Send,
  Users,
  Sparkles,
  ChevronDown,
  MessageSquare,
  Search,
  PenLine,
  Award,
  Languages,
  Wallet,
  FileSignature,
  BookOpen,
  ArrowRight,
  type LucideIcon,
} from 'lucide-react';
import { FadeUp } from './motion';
import SeeDemoButton from './SeeDemoButton';

type Cms = Record<string, string>;

const GEOM_FONT_STACK = `"Inter", "Manrope", "Geist", "Plus Jakarta Sans", -apple-system, BlinkMacSystemFont, "Segoe UI", system-ui, sans-serif`;

const ORANGE = '#f97316';
const ORANGE_DARK = '#ea580c';
const ORANGE_BORDER = 'rgba(249, 115, 22, 0.25)';
const BLACK = '#0b0d20';
const TEXT_BODY = '#1e293b';
const TEXT_MUTED = '#64748b';
const BORDER = '#e5e7eb';
const SURFACE = '#ffffff';
const BG = '#fafafa';

const INTERVAL_MS = 3600;

/* ════════════════════════════════════════════════════════════
   Content
════════════════════════════════════════════════════════════ */

const CAREER_DEFAULTS = [
  {
    title: 'Understand You First',
    details: 'A free 45-minute session where we actually listen. We understand your current role, your target outcome, and what you truly want — not just what looks good on paper.',
  },
  {
    title: 'Resume + Interview Prep',
    details: 'Complete ATS-optimized resume rebuild, LinkedIn profile overhaul, and live mock interviews with real feedback. You walk into every interview knowing exactly what to say.',
  },
  {
    title: 'Offer Received. Then We Invoice.',
    details: "When you have your offer letter in hand, only then does our 12% Career Assistance Fee apply. That's our entire model — zero upfront, zero risk.",
    cta: { label: 'Apply for CAP', href: '/cap/apply' },
  },
];

const STUDY_DEFAULTS = [
  {
    title: 'Free Counselling Session',
    details: 'We understand your academic background, budget, and destination goals — UK, France, Germany, or Dubai — before recommending a single university.',
  },
  {
    title: 'University Shortlist & Applications',
    details: 'Course shortlisting, SOP writing, and applications to 140+ partner universities — handled end to end by one dedicated advisor.',
  },
  {
    title: 'Visa & Pre-Departure Support',
    details: 'Documentation, visa filing, and pre-departure checklist so you land abroad prepared — not overwhelmed.',
    cta: { label: 'Explore Study Abroad', href: '/study-visa' },
  },
];

const PROCESS_STEPS: Array<{
  id: string;
  number: string;
  short: string;
  title: string;
  description: string;
  Icon: LucideIcon;
}> = [
  { id: 'discover', number: '01', short: 'Discover',  title: 'Free Consultation',        description: 'We understand your goals, background, and constraints — career or study abroad. No fees, no obligation, just clarity.',           Icon: MessageSquare },
  { id: 'plan',     number: '02', short: 'Plan',      title: 'Curated Shortlist',         description: 'Best-fit companies or universities, driven by data — not guesswork. You see the shortlist, you approve the plan.',              Icon: Search },
  { id: 'prepare',  number: '03', short: 'Prepare',   title: 'Resume, SOP & Interview',   description: 'ATS-optimised resume rebuild, LinkedIn overhaul, mock interviews, and full application documentation — all by your advisor.',  Icon: PenLine },
  { id: 'connect',  number: '04', short: 'Connect',   title: 'Direct Employer / Uni',     description: 'Warm introductions to 10–15 hiring managers or direct applications to 140+ partner universities worldwide.',                       Icon: Users },
  { id: 'offer',    number: '05', short: 'Offer',     title: 'Offer or Admission',       description: 'Secured an offer or admission — we guide you through acceptance, salary negotiation, and pre-visa requirements.',              Icon: BadgeCheck },
  { id: 'launch',   number: '06', short: 'Launch',    title: 'Onboard or Fly',            description: 'Career: 30-day post-joining advisor support. Study abroad: visa filing + pre-departure briefing. You start with confidence.',     Icon: Plane },
];

type DocRow = { label: string; note: string; Icon: LucideIcon };
const DOCUMENTS: DocRow[] = [
  { label: 'Valid Passport',         note: 'Minimum 18 months validity recommended',   Icon: BookOpen },
  { label: 'Academic Transcripts',   note: '10th, 12th, and graduation mark sheets',   Icon: GraduationCap },
  { label: 'English Proficiency',   note: 'IELTS / TOEFL / PTE — as required',       Icon: Languages },
  { label: 'Statement of Purpose',   note: 'Drafted with Placedly advisory support',   Icon: PenLine },
  { label: 'Letters of Recommendation', note: 'Typically 2–3 from academic or professional referees', Icon: Users },
  { label: 'Updated CV / Resume',    note: 'Professionally formatted',                  Icon: FileText },
  { label: 'Proof of Funds',         note: 'Bank statements — typically 3–6 months',   Icon: Wallet },
  { label: 'Admission / Offer Letter', note: 'Issued upon acceptance',                  Icon: Award },
  { label: 'Visa Application Form',  note: 'Country and category-specific',            Icon: FileSignature },
];

/* ════════════════════════════════════════════════════════════
   Visuals
════════════════════════════════════════════════════════════ */

function VisualCareer1() {
  return (
    <div className="placedly-hiw-mock">
      <div className="placedly-hiw-mock-card">
        <p className="placedly-hiw-mock-label">I&apos;m targeting:</p>
        <div className="placedly-hiw-tags">
          {['Claims & Insurance', 'BPO / MNC', '₹8–12 LPA'].map((t) => (
            <span key={t} className="placedly-hiw-tag">{t}</span>
          ))}
        </div>
      </div>
      <div className="placedly-hiw-mock-card">
        <p className="placedly-hiw-mock-label">My Placedly roadmap</p>
        <ul className="placedly-hiw-mock-list">
          {['EXL · Senior Analyst', 'Optum · Claims Lead', 'WNS · Operations'].map((c) => (
            <li key={c}><span className="placedly-hiw-mock-dot" style={{ background: ORANGE }} />{c}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}
function VisualCareer2() {
  return (
    <div className="placedly-hiw-mock">
      <div className="placedly-hiw-mock-card">
        <span className="placedly-hiw-mock-avatar" />
        <span className="placedly-hiw-mock-meta">Placedly shared with you</span>
      </div>
      <div className="placedly-hiw-mock-card">
        <div className="placedly-hiw-mock-row">
          <span className="placedly-hiw-mock-avatar placedly-hiw-mock-avatar--md" />
          <div>
            <p className="placedly-hiw-mock-sub">Your advisor connected you to</p>
            <p className="placedly-hiw-mock-title">Senior Claims Analyst</p>
            <p className="placedly-hiw-mock-co">EXL Service · Noida</p>
          </div>
        </div>
      </div>
      <div className="placedly-hiw-mock-card placedly-hiw-mock-card--cta">
        <span className="placedly-hiw-mock-spark" style={{ color: ORANGE }}>✦</span>
        <div>
          <p className="placedly-hiw-mock-cta-title">Interview prep booked</p>
          <p className="placedly-hiw-mock-cta-sub">Mock round with industry coach</p>
        </div>
        <span className="placedly-hiw-mock-arrow" style={{ color: ORANGE }}>→</span>
      </div>
    </div>
  );
}
function VisualCareer3() {
  return (
    <div className="placedly-hiw-mock">
      <div className="placedly-hiw-mock-card placedly-hiw-mock-card--center">
        <p className="placedly-hiw-mock-chip">You received</p>
        <p className="placedly-hiw-mock-offer" style={{ color: BLACK }}>Offer Letter · ₹9.2 LPA</p>
        <div className="placedly-hiw-mock-avatars">
          {['P', 'A', 'M'].map((l) => (
            <span key={l} className="placedly-hiw-mock-avatar placedly-hiw-mock-avatar--sm">{l}</span>
          ))}
        </div>
        <p className="placedly-hiw-mock-thanks">Placedly team sent congratulations 🎉</p>
        <div className="placedly-hiw-mock-bubble" style={{ background: 'rgba(249,115,22,0.10)', borderColor: 'rgba(249,115,22,0.20)', color: ORANGE_DARK }}>
          &ldquo;Zero upfront until this moment — that&apos;s the Placedly promise.&rdquo;
        </div>
      </div>
    </div>
  );
}
function VisualStudy1() {
  return (
    <div className="placedly-hiw-mock">
      <div className="placedly-hiw-mock-card">
        <p className="placedly-hiw-mock-label">Dream destinations:</p>
        <div className="placedly-hiw-tags">
          {['United Kingdom', 'France', 'Germany', 'Dubai'].map((t) => (
            <span key={t} className="placedly-hiw-tag">{t}</span>
          ))}
        </div>
      </div>
      <div className="placedly-hiw-mock-card">
        <p className="placedly-hiw-mock-label">My profile focus</p>
        <ul className="placedly-hiw-mock-list">
          {['MSc Business · UK', 'MBA · France', 'Engineering · Germany'].map((c) => (
            <li key={c}><span className="placedly-hiw-mock-dot" style={{ background: ORANGE }} />{c}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}
function VisualStudy2() {
  return (
    <div className="placedly-hiw-mock">
      <div className="placedly-hiw-mock-card">
        <span className="placedly-hiw-mock-avatar placedly-hiw-mock-avatar--study" />
        <span className="placedly-hiw-mock-meta">Application update</span>
      </div>
      <div className="placedly-hiw-mock-card">
        <p className="placedly-hiw-mock-sub">University of Manchester</p>
        <p className="placedly-hiw-mock-title">MSc International Business</p>
        <p className="placedly-hiw-mock-co">Fall &apos;25 intake · Offer received</p>
      </div>
      <div className="placedly-hiw-mock-card placedly-hiw-mock-card--cta">
        <span className="placedly-hiw-mock-spark" style={{ color: ORANGE }}>✦</span>
        <div>
          <p className="placedly-hiw-mock-cta-title">SOP & documents complete</p>
          <p className="placedly-hiw-mock-cta-sub">Ready for visa filing</p>
        </div>
        <span className="placedly-hiw-mock-arrow" style={{ color: ORANGE }}>→</span>
      </div>
    </div>
  );
}
function VisualStudy3() {
  return (
    <div className="placedly-hiw-mock">
      <div className="placedly-hiw-mock-card placedly-hiw-mock-card--center">
        <span className="placedly-hiw-mock-avatar placedly-hiw-mock-avatar--lg" />
        <p className="placedly-hiw-mock-name">Priya Sharma</p>
        <p className="placedly-hiw-mock-role">MSc Admit · UK</p>
        <div className="placedly-hiw-mock-bubble" style={{ background: 'rgba(249,115,22,0.10)', borderColor: 'rgba(249,115,22,0.20)', color: ORANGE_DARK }}>
          Visa approved · Flying September 2025
        </div>
        <p className="placedly-hiw-mock-thanks">Your advisor: pre-departure checklist sent ✓</p>
      </div>
    </div>
  );
}

type TabDef = {
  id: string;
  label: string;
  Icon: LucideIcon;
  title: string;
  details: string;
  cta?: { label: string; href: string };
  Visual: () => React.ReactNode;
};

const TAB_META = [
  { id: 'consult', label: 'Free Session',    Icon: Users,         cmsKey: 'consult',  defaultIndex: 0, defaults: CAREER_DEFAULTS, Visual: VisualCareer1 },
  { id: 'prep',    label: 'Interview Prep',  Icon: FileText,      cmsKey: 'prep',     defaultIndex: 1, defaults: CAREER_DEFAULTS, Visual: VisualCareer2 },
  { id: 'offer',   label: 'Offer & Fee',     Icon: BadgeCheck,    cmsKey: 'offer',    defaultIndex: 2, defaults: CAREER_DEFAULTS, Visual: VisualCareer3 },
  { id: 'counsel', label: 'Counselling',     Icon: GraduationCap, cmsKey: 'counsel',  defaultIndex: 0, defaults: STUDY_DEFAULTS,  Visual: VisualStudy1  },
  { id: 'apply',   label: 'Applications',    Icon: Send,          cmsKey: 'apply',    defaultIndex: 1, defaults: STUDY_DEFAULTS,  Visual: VisualStudy2  },
  { id: 'visa',    label: 'Visa Support',    Icon: Plane,         cmsKey: 'visa',     defaultIndex: 2, defaults: STUDY_DEFAULTS,  Visual: VisualStudy3  },
] as const;

function buildTabs(cms: Cms): TabDef[] {
  return TAB_META.map((meta) => {
    const def     = meta.defaults[meta.defaultIndex];
    const isStudy = meta.cmsKey === 'counsel' || meta.cmsKey === 'apply' || meta.cmsKey === 'visa';
    const prefix  = isStudy ? 'hp:hiwStudy' : 'hp:hiw';
    const key     = meta.cmsKey === 'consult' ? '1' : meta.cmsKey === 'prep' ? '3' : meta.cmsKey === 'offer' ? '5' : meta.cmsKey === 'counsel' ? '1' : meta.cmsKey === 'apply' ? '2' : '3';
    return {
      id:      meta.id,
      label:   meta.label,
      Icon:    meta.Icon,
      title:   cms[`${prefix}${key}Title`]   || def.title,
      details: cms[`${prefix}${key}Details`] || def.details,
      cta:     'cta' in def ? def.cta : undefined,
      Visual:  meta.Visual,
    };
  });
}

function useAutoAdvance(length: number, intervalMs: number, paused: boolean) {
  const [idx, setIdx] = useState(0);
  const [tick, setTick] = useState(0);
  const ref = useRef<ReturnType<typeof setInterval> | null>(null);

  const start = () => {
    if (ref.current) clearInterval(ref.current);
    if (paused || length <= 1) return;
    ref.current = setInterval(() => {
      setIdx((p) => (p + 1) % length);
      setTick((k) => k + 1);
    }, intervalMs);
  };

  useEffect(() => {
    start();
    return () => { if (ref.current) clearInterval(ref.current); };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [length, intervalMs, paused]);

  const goTo = (i: number) => {
    setIdx(i);
    setTick((k) => k + 1);
  };

  return { idx, tick, goTo, restart: start };
}

function TabBar({
  tabs, activeId, onSelect, tickKey, onHoverIn, onHoverOut,
}: {
  tabs: TabDef[];
  activeId: string;
  onSelect: (id: string) => void;
  tickKey: number;
  onHoverIn: () => void;
  onHoverOut: () => void;
}) {
  return (
    <div
      className="placedly-hiw-tabbar"
      onMouseEnter={onHoverIn}
      onMouseLeave={onHoverOut}
      onTouchStart={onHoverIn}
    >
      <div role="tablist" aria-label="How Placedly works" className="placedly-hiw-tabbar-strip">
        {tabs.map((tab) => (
          <TabButton
            key={tab.id}
            tab={tab}
            active={tab.id === activeId}
            tickKey={tickKey}
            onSelect={onSelect}
          />
        ))}
      </div>
    </div>
  );
}

function TabButton({
  tab, active, tickKey, onSelect,
}: {
  tab: TabDef; active: boolean; tickKey: number;
  onSelect: (id: string) => void;
}) {
  return (
    <button
      type="button"
      role="tab"
      aria-selected={active}
      onClick={() => onSelect(tab.id)}
      className={`placedly-hiw-tab${active ? ' is-active' : ''}`}
      style={{
        color: active ? ORANGE : TEXT_MUTED,
        boxShadow: active ? `0 2px 12px rgba(0,0,0,0.06), 0 0 0 1px ${ORANGE}40` : 'none',
        borderColor: active ? ORANGE : BORDER,
      }}
    >
      <tab.Icon size={13} strokeWidth={2.2} aria-hidden className="placedly-hiw-tab-icon" />
      <span className="placedly-hiw-tab-label">{tab.label}</span>
      {active && (
        <motion.span
          key={`${tab.id}-${tickKey}`}
          aria-hidden
          className="placedly-hiw-tab-progress"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: INTERVAL_MS / 1000, ease: 'linear' }}
          style={{ background: ORANGE }}
        />
      )}
    </button>
  );
}

function TabPanel({ tab }: { tab: TabDef }) {
  return (
    <motion.div
      className="placedly-hiw-panel-inner"
      key={tab.id}
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="placedly-hiw-panel-visual">
        <div className="placedly-hiw-visual">
          <tab.Visual />
        </div>
      </div>
      <div className="placedly-hiw-panel-copy">
        <h3 className="placedly-hiw-panel-title">
          <span aria-hidden className="placedly-hiw-panel-accent-bar" style={{ background: ORANGE }} />
          <span style={{ color: BLACK }}>{tab.title}</span>
        </h3>
        <p className="placedly-hiw-panel-desc">{tab.details}</p>
        {tab.cta && (
          <Link
            href={tab.cta.href}
            className="placedly-hiw-step-cta"
            style={{ background: ORANGE, color: '#fff', boxShadow: '0 8px 20px rgba(249,115,22,0.30)' }}
          >
            {tab.cta.label}
            <ArrowRight size={14} strokeWidth={2.4} />
          </Link>
        )}
      </div>
    </motion.div>
  );
}

function ProcessStepStrip({ step, setStep, tickKey, onHoverIn, onHoverOut }: { step: number; setStep: (n: number) => void; tickKey: number; onHoverIn: () => void; onHoverOut: () => void }) {
  return (
    <div
      className="process-strip"
      role="tablist"
      aria-label="Our 6-step process"
      onMouseEnter={onHoverIn}
      onMouseLeave={onHoverOut}
      onTouchStart={onHoverIn}
    >
      <div className="process-strip-track">
        {PROCESS_STEPS.map((s, i) => {
          const isPassed = i <= step;
          const isActive = i === step;
          return (
            <button
              type="button"
              role="tab"
              aria-selected={isActive}
              key={s.id}
              onClick={() => setStep(i)}
              className={`process-strip-step${isActive ? ' is-active' : ''}${isPassed ? ' is-passed' : ''}`}
            >
              <span
                className="process-strip-num"
                style={{
                  backgroundColor: isPassed ? ORANGE : SURFACE,
                  borderColor: isPassed ? 'transparent' : BORDER,
                  color: isPassed ? '#fff' : TEXT_MUTED,
                }}
              >
                {s.number}
              </span>
              <span className="process-strip-icon">
                <s.Icon size={15} strokeWidth={2.2} aria-hidden />
              </span>
              <span className="process-strip-text">
                <span className="process-strip-title">{s.short}</span>
                <span className="process-strip-desc">{s.title}</span>
              </span>
            </button>
          );
        })}
      </div>
      <div className="process-strip-progress" aria-hidden>
        <motion.div
          key={tickKey}
          className="process-strip-progress-fill"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: INTERVAL_MS / 1000, ease: 'linear' }}
        />
      </div>
    </div>
  );
}

function ProcessStepDetail({ step, setStep }: { step: number; setStep: (n: number) => void }) {
  const active = PROCESS_STEPS[step];
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={active.id}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -8 }}
        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
        className="process-panel"
      >
        <span className="process-panel-icon" style={{ backgroundColor: ORANGE }}>
          <active.Icon size={20} strokeWidth={2.2} color="#fff" />
        </span>
        <div className="process-panel-text">
          <span className="process-panel-number" style={{ color: ORANGE }}>
            Step {active.number}
          </span>
          <h3 className="process-panel-title">{active.title}</h3>
          <p className="process-panel-desc">{active.description}</p>

          <div className="process-mini-nav" role="tablist">
            {PROCESS_STEPS.map((s, i) => (
              <button
                key={s.id}
                type="button"
                role="tab"
                aria-selected={i === step}
                aria-label={`Jump to step ${s.number}: ${s.title}`}
                onClick={() => setStep(i)}
                className={`process-mini-dot${i === step ? ' is-active' : ''}${i < step ? ' is-passed' : ''}`}
              >
                {String(i + 1).padStart(2, '0')}
              </button>
            ))}
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}

/* ════════════════════════════════════════════════════════════
   MAIN — Document Checklist → How It Works (no marquees)
════════════════════════════════════════════════════════════ */
export default function HowItWorks({ cms = {} }: { cms?: Cms }) {
  return (
    <>
      <DocumentChecklistSection />
      <ParallelSection cms={cms} />
    </>
  );
}

/* ════════════════════════════════════════════════════════════
   DOCUMENT CHECKLIST — at the TOP
════════════════════════════════════════════════════════════ */
function DocumentChecklistSection() {
  const [expandedDoc, setExpandedDoc] = useState<number | null>(null);

  return (
    <section className="placedly-docs-section" id="documents">
      <div className="placedly-docs-container">
        <FadeUp className="placedly-docs-header">
          <p className="placedly-docs-eyebrow">
            <Sparkles size={13} strokeWidth={2.25} aria-hidden />
            Document Checklist
          </p>
          <h2 className="placedly-docs-title">What You Will Typically Need</h2>
          <p className="placedly-docs-subtitle">
            Tap a document to see notes. Requirements vary by country and role.
          </p>
        </FadeUp>

        <div className="placedly-doc-chip-grid">
          {DOCUMENTS.map((doc, i) => {
            const isOpen = expandedDoc === i;
            return (
              <button
                key={doc.label}
                type="button"
                onClick={() => setExpandedDoc(isOpen ? null : i)}
                className={`placedly-doc-chip${isOpen ? ' is-open' : ''}`}
                style={{ borderColor: isOpen ? ORANGE : BORDER }}
              >
                <span className="placedly-doc-chip-row">
                  <span className="placedly-doc-chip-icon" style={{ background: 'rgba(249,115,22,0.12)', color: ORANGE }}>
                    <doc.Icon size={14} strokeWidth={2.1} />
                  </span>
                  <span className="placedly-doc-chip-label">{doc.label}</span>
                  <ChevronDown
                    size={14} strokeWidth={2.4} className="placedly-doc-chip-chevron"
                    style={{ transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)', color: ORANGE }}
                  />
                </span>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.span
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.22, ease: [0.4, 0, 0.2, 1] }}
                      className="placedly-doc-chip-note"
                    >
                      {doc.note}
                    </motion.span>
                  )}
                </AnimatePresence>
              </button>
            );
          })}
        </div>

        <div className="placedly-doc-advisor-note">
          <Sparkles size={13} strokeWidth={2.4} color={ORANGE} />
          <p>
            Your advisor provides a <strong>personalised, destination-specific checklist</strong> during your free consultation.
          </p>
        </div>

        <div className="placedly-doc-cta">
          <div className="placedly-doc-cta-text">
            <h3>Your Journey Starts With One Conversation</h3>
            <p>Free consultation, no obligation — just clarity on what&apos;s next for you.</p>
          </div>
          <motion.div whileHover={{ y: -2 }} whileTap={{ scale: 0.98 }} className="placedly-doc-cta-wrap">
            <Link href="/contact" className="placedly-doc-cta-btn">
              <span className="placedly-doc-cta-btn-shine" aria-hidden />
              <span className="placedly-doc-cta-btn-text">Book Free Consultation</span>
              <ArrowRight size={16} strokeWidth={2.4} className="placedly-doc-cta-btn-arrow" />
            </Link>
          </motion.div>
        </div>
      </div>

      <style>{`
        .placedly-doc-chip-grid {
          display: flex;
          flex-wrap: wrap;
          align-items: flex-start;
          gap: 10px;
          justify-content: center;
        }
        .placedly-doc-chip {
          flex: 1 1 100%;
          min-width: 0;
          text-align: left;
          background: ${SURFACE};
          border: 1.5px solid;
          border-radius: 14px;
          padding: 11px 14px;
          cursor: pointer;
          transition: border-color 0.25s, box-shadow 0.25s;
        }
        .placedly-doc-chip:hover { box-shadow: 0 6px 18px rgba(15,23,42,0.06); }
        .placedly-doc-chip.is-open { box-shadow: 0 10px 24px rgba(249, 115, 22, 0.10); }
        .placedly-doc-chip-row { display: flex; align-items: center; gap: 10px; }
        .placedly-doc-chip-icon { width: 26px; height: 26px; border-radius: 8px; display: inline-flex; align-items: center; justify-content: center; flex-shrink: 0; }
        .placedly-doc-chip-label { font-size: 13px; font-weight: 700; color: ${BLACK}; flex: 1; }
        .placedly-doc-chip-chevron { flex-shrink: 0; transition: transform 0.25s ease; }
        .placedly-doc-chip-note { display: block; overflow: hidden; font-size: 12.5px; color: ${TEXT_BODY}; line-height: 1.5; padding-left: 36px; padding-top: 6px; }

        .placedly-doc-advisor-note {
          display: flex; align-items: flex-start; gap: 8px;
          max-width: 600px; margin: 18px auto 0;
          padding: 10px 16px; border-radius: 12px;
          background: rgba(249, 115, 22, 0.06);
          border: 1px solid rgba(249, 115, 22, 0.15);
        }
        .placedly-doc-advisor-note p { font-size: 12.5px; line-height: 1.5; color: ${TEXT_BODY}; margin: 0; }

        .placedly-doc-cta {
          position: relative; overflow: hidden;
          display: flex; flex-direction: column;
          align-items: flex-start; justify-content: space-between;
          gap: 18px;
          margin-top: clamp(32px, 5vw, 56px);
          padding: clamp(20px, 4vw, 30px) clamp(20px, 4vw, 36px);
          border-radius: 22px;
          background: ${SURFACE};
          border: 1px solid ${BORDER};
        }
        .placedly-doc-cta-text { position: relative; z-index: 1; max-width: 460px; }
        .placedly-doc-cta-text h3 { font-size: clamp(1.05rem, 3.4vw, 1.4rem); font-weight: 800; letter-spacing: -0.01em; margin: 0 0 6px; line-height: 1.3; color: ${BLACK}; }
        .placedly-doc-cta-text p { font-size: 13px; color: ${TEXT_BODY}; line-height: 1.5; margin: 0; }
        .placedly-doc-cta-wrap { position: relative; z-index: 1; flex-shrink: 0; width: 100%; }
        .placedly-doc-cta-btn {
          position: relative; display: inline-flex; align-items: center; justify-content: center;
          gap: 8px; padding: 12px 22px; border-radius: 999px;
          font-weight: 700; font-size: 13.5px; color: #fff;
          background-color: ${ORANGE}; border: 1px solid ${ORANGE_DARK};
          box-shadow: 0 8px 20px rgba(249,115,22,0.32);
          overflow: hidden; isolation: isolate; white-space: nowrap;
          transition: transform 0.25s cubic-bezier(0.22,1,0.36,1), box-shadow 0.25s, filter 0.25s;
          text-decoration: none; width: 100%;
        }
        .placedly-doc-cta-btn-text { position: relative; z-index: 1; }
        .placedly-doc-cta-btn:hover { filter: brightness(1.06); box-shadow: 0 12px 26px rgba(249,115,22,0.42); }
        .placedly-doc-cta-btn-arrow { position: relative; z-index: 1; transition: transform 0.25s ease; }
        .placedly-doc-cta-btn:hover .placedly-doc-cta-btn-arrow { transform: translateX(3px); }
        .placedly-doc-cta-btn-shine {
          position: absolute; top: 0; left: -130%; width: 55%; height: 100%;
          background: linear-gradient(115deg, transparent, rgba(255,255,255,0.35), transparent);
          transform: skewX(-20deg);
          transition: left 0.6s ease; z-index: 0;
        }
        .placedly-doc-cta-btn:hover .placedly-doc-cta-btn-shine { left: 140%; }

        @media (min-width: 641px) and (max-width: 900px) {
          .placedly-doc-chip { flex: 0 1 calc(50% - 10px); }
        }
        @media (min-width: 901px) {
          .placedly-doc-chip { flex: 0 1 calc(33.333% - 10px); min-width: 220px; }
          .placedly-doc-cta { flex-direction: row; align-items: center; }
          .placedly-doc-cta-wrap { width: auto; }
          .placedly-doc-cta-btn { width: auto; }
        }
      `}</style>
    </section>
  );
}

/* ════════════════════════════════════════════════════════════
   PARALLEL SECTION (A + B) — both use ORANGE (no blue)
   Each section is a separate bordered card for clear separation
════════════════════════════════════════════════════════════ */
function ParallelSection({ cms }: { cms: Cms }) {
  const tabs = useMemo(() => buildTabs(cms), [cms]);

  const [tabPaused, setTabPaused] = useState(false);
  const tabs_ = useAutoAdvance(tabs.length, INTERVAL_MS, tabPaused);
  const activeTab = tabs[tabs_.idx] ?? tabs[0];

  const handleSelect = (id: string) => {
    const i = tabs.findIndex((t) => t.id === id);
    if (i === -1) return;
    tabs_.goTo(i);
  };

  const [stepPaused, setStepPaused] = useState(false);
  const steps_ = useAutoAdvance(PROCESS_STEPS.length, INTERVAL_MS, stepPaused);

  return (
    <section className="placedly-hiw-section" id="how">
      <div className="placedly-hiw-container">

        <FadeUp className="placedly-hiw-header">
          <p className="placedly-hiw-eyebrow">
            <Sparkles size={13} strokeWidth={2.25} aria-hidden />
            How It Works
          </p>
          <h2 className="placedly-hiw-title">
            Choose Your Path, See the Process, Get the Outcome
          </h2>
          <p className="placedly-hiw-subtitle">
            Whether you&apos;re chasing a career in India or a degree abroad, the same advisor-led process gets you there.
          </p>
        </FadeUp>

        <div className="placedly-hiw-parallel-grid">

          {/* ═══════ SECTION A — How It Works (orange) ═══════ */}
          <div className="placedly-hiw-col placedly-hiw-col--a">
            <div className="placedly-hiw-col-header">
              <span className="placedly-hiw-col-label">
                <span className="placedly-hiw-col-label-num">A</span>
                <span className="placedly-hiw-col-label-text">How It Works</span>
              </span>
              <h3 className="placedly-hiw-col-title">Three Stages to Your Outcome</h3>
              <p className="placedly-hiw-col-sub">Auto-advancing. Tap to pause.</p>
            </div>

            <div className="placedly-hiw-col-body">
              <TabBar
                tabs={tabs}
                activeId={activeTab.id}
                onSelect={handleSelect}
                tickKey={tabs_.tick}
                onHoverIn={() => setTabPaused(true)}
                onHoverOut={() => setTabPaused(false)}
              />

              <div className="placedly-hiw-panel">
                <AnimatePresence mode="wait">
                  <TabPanel key={activeTab.id} tab={activeTab} />
                </AnimatePresence>
                <div className="placedly-hiw-panel-footer">
                  <SeeDemoButton variant="panel" />
                </div>
              </div>
            </div>
          </div>

          {/* ═══════ SECTION B — Our Process (orange) ═══════ */}
          <div className="placedly-hiw-col placedly-hiw-col--b">
            <div className="placedly-hiw-col-header">
              <span className="placedly-hiw-col-label">
                <span className="placedly-hiw-col-label-num">B</span>
                <span className="placedly-hiw-col-label-text">Our Process</span>
              </span>
              <h3 className="placedly-hiw-col-title">From First Call to First Day</h3>
              <p className="placedly-hiw-col-sub">Six steps. Auto-advancing. Tap to pause.</p>
            </div>

            <div className="placedly-hiw-col-body">
              <div className="placedly-hiw-col-process-grid">
                <div className="placedly-hiw-col-process-left">
                  <ProcessStepStrip
                    step={steps_.idx}
                    setStep={steps_.goTo}
                    tickKey={steps_.tick}
                    onHoverIn={() => setStepPaused(true)}
                    onHoverOut={() => setStepPaused(false)}
                  />
                </div>
                <div className="placedly-hiw-col-process-right">
                  <ProcessStepDetail step={steps_.idx} setStep={steps_.goTo} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .placedly-hiw-section, .placedly-hiw-section *,
        .placedly-docs-section, .placedly-docs-section * {
          font-family: ${GEOM_FONT_STACK};
          font-feature-settings: "ss01", "cv11", "cv02";
          font-optical-sizing: auto;
          letter-spacing: -0.011em;
          box-sizing: border-box;
          color: ${BLACK};
        }

        .placedly-hiw-section, .placedly-docs-section {
          position: relative;
          width: 100%;
          padding: clamp(48px, 7vw, 96px) clamp(14px, 4vw, 24px);
          background: ${BG};
        }
        .placedly-hiw-container, .placedly-docs-container {
          position: relative;
          max-width: 1200px;
          margin: 0 auto;
        }

        /* ── headers ── */
        .placedly-hiw-header, .placedly-docs-header {
          text-align: center;
          max-width: 760px;
          margin: 0 auto 32px;
        }
        .placedly-hiw-eyebrow, .placedly-docs-eyebrow {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          font-size: 12px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.12em;
          color: ${ORANGE};
          margin-bottom: 10px;
          padding: 5px 11px;
          background: rgba(249, 115, 22, 0.10);
          border: 1px solid rgba(249, 115, 22, 0.25);
          border-radius: 999px;
        }
        .placedly-hiw-title, .placedly-docs-title {
          font-size: clamp(24px, 4.5vw, 40px);
          font-weight: 800;
          line-height: 1.15;
          letter-spacing: -0.025em;
          color: ${BLACK};
          margin: 0 0 12px;
        }
        .placedly-hiw-subtitle, .placedly-docs-subtitle {
          font-size: clamp(13.5px, 2.6vw, 16px);
          line-height: 1.6;
          color: ${TEXT_BODY};
          margin: 0;
        }

        /* ═══ PARALLEL GRID — mobile-first stack, desktop 2-col ═══ */
        .placedly-hiw-parallel-grid {
          display: flex;
          flex-direction: column;
          gap: 20px;
          align-items: stretch;
        }
        .placedly-hiw-col { min-width: 0; width: 100%; }

        /* ═══ ★ BOTH SECTIONS USE ORANGE (no blue) ═══ */
        .placedly-hiw-col--a {
          position: relative;
          padding: clamp(18px, 2.5vw, 28px);
          border-radius: 20px;
          background: linear-gradient(180deg, rgba(249,115,22,0.05) 0%, rgba(249,115,22,0.02) 100%);
          border: 1.5px solid rgba(249, 115, 22, 0.22);
          box-shadow: 0 4px 14px rgba(249, 115, 22, 0.05);
        }
        .placedly-hiw-col--b {
          position: relative;
          padding: clamp(18px, 2.5vw, 28px);
          border-radius: 20px;
          background: linear-gradient(180deg, rgba(249,115,22,0.03) 0%, rgba(249,115,22,0.01) 100%);
          border: 1.5px solid rgba(249, 115, 22, 0.18);
          box-shadow: 0 4px 14px rgba(249, 115, 22, 0.04);
        }
        .placedly-hiw-col--b::before {
          content: '';
          position: absolute;
          top: 12px;
          right: 12px;
          width: 28px;
          height: 28px;
          background: rgba(249, 115, 22, 0.06);
          border-radius: 8px;
          pointer-events: none;
        }

        .placedly-hiw-col-header {
          margin-bottom: 16px;
          padding-bottom: 14px;
          border-bottom: 1px dashed rgba(15, 23, 42, 0.10);
        }
        .placedly-hiw-col-label {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          font-size: 11.5px;
          font-weight: 800;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: ${ORANGE};
          background: ${SURFACE};
          border: 1.5px solid ${ORANGE_BORDER};
          border-radius: 999px;
          padding: 5px 12px;
          margin-bottom: 10px;
        }
        .placedly-hiw-col-label-num {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 20px; height: 20px;
          border-radius: 50%;
          background: ${ORANGE};
          color: #fff;
          font-size: 11px;
          font-weight: 800;
        }
        .placedly-hiw-col-label-text {
          color: ${ORANGE};
          font-weight: 800;
        }
        .placedly-hiw-col-title {
          font-size: clamp(1.15rem, 3.6vw, 1.5rem);
          font-weight: 800;
          line-height: 1.2;
          letter-spacing: -0.02em;
          color: ${BLACK};
          margin: 0 0 4px;
        }
        .placedly-hiw-col-sub {
          font-size: 12.5px;
          color: ${TEXT_MUTED};
          margin: 0;
        }

        .placedly-hiw-col-body { width: 100%; }

        /* ═══ TAB BAR ═══ */
        .placedly-hiw-tabbar { width: 100%; margin-bottom: 14px; }
        .placedly-hiw-tabbar-strip {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 6px;
          padding: 6px;
          border-radius: 14px;
          background: ${SURFACE};
          border: 1px solid ${BORDER};
        }
        .placedly-hiw-tab {
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 5px;
          padding: 9px 6px;
          border-radius: 999px;
          border: 1.5px solid ${BORDER};
          cursor: pointer;
          font-size: 11px;
          font-weight: 600;
          white-space: nowrap;
          text-align: center;
          background: ${SURFACE};
          transition: background 0.3s, color 0.3s, border-color 0.3s, box-shadow 0.3s;
          overflow: hidden;
          min-width: 0;
          color: ${TEXT_MUTED};
        }
        .placedly-hiw-tab.is-active {
          background: ${SURFACE};
          border-color: ${ORANGE};
          color: ${ORANGE};
        }
        .placedly-hiw-tab-icon { flex-shrink: 0; transition: color 0.3s; color: ${TEXT_MUTED}; }
        .placedly-hiw-tab.is-active .placedly-hiw-tab-icon { color: ${ORANGE}; }
        .placedly-hiw-tab-label {
          line-height: 1.15;
          transition: color 0.3s;
          color: inherit;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
        .placedly-hiw-tab-progress {
          position: absolute;
          left: 0; right: 0; bottom: 0;
          height: 3px;
          transform-origin: left;
          border-radius: 0 0 999px 999px;
        }

        /* ═══ PANEL — mobile-first visual above copy ═══ */
        .placedly-hiw-panel {
          position: relative;
          background: ${SURFACE};
          border: 1px solid ${BORDER};
          border-radius: 18px;
          padding: clamp(16px, 4vw, 28px);
          box-shadow: 0 14px 40px rgba(15, 23, 42, 0.06);
        }
        .placedly-hiw-panel-footer {
          display: flex;
          justify-content: center;
          margin-top: 16px;
          padding-top: 14px;
          border-top: 1px solid ${BORDER};
        }
        .placedly-hiw-panel-inner {
          display: flex;
          flex-direction: column;
          gap: 18px;
          position: relative;
        }
        .placedly-hiw-panel-visual, .placedly-hiw-panel-copy { min-width: 0; width: 100%; }
        .placedly-hiw-panel-title {
          position: relative;
          padding-left: 14px;
          font-size: clamp(1.05rem, 3.6vw, 1.5rem);
          font-weight: 800;
          line-height: 1.2;
          letter-spacing: -0.02em;
          margin: 0 0 10px;
        }
        .placedly-hiw-panel-accent-bar {
          position: absolute;
          left: 0; top: 4px; bottom: 4px;
          width: 4px;
          border-radius: 4px;
        }
        .placedly-hiw-panel-desc {
          font-size: clamp(13px, 2.8vw, 14px);
          line-height: 1.6;
          color: ${TEXT_BODY};
          margin: 0 0 14px;
        }
        .placedly-hiw-step-cta {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 10px 18px;
          border: none;
          border-radius: 999px;
          font-weight: 700;
          font-size: 13px;
          text-decoration: none;
          transition: transform 0.25s ease, filter 0.25s ease;
        }
        .placedly-hiw-step-cta:hover { transform: translateY(-2px); filter: brightness(1.06); }

        /* visual mock */
        .placedly-hiw-visual {
          position: relative;
          width: 100%;
          min-height: 260px;
          border-radius: 14px;
          padding: 18px;
          overflow: hidden;
          display: flex;
          align-items: center;
          justify-content: center;
          background: linear-gradient(135deg, #fff7ed 0%, #ffedd5 100%);
        }
        .placedly-hiw-mock { width: 100%; max-width: 360px; display: flex; flex-direction: column; gap: 10px; }
        .placedly-hiw-mock-card { background: ${SURFACE}; border-radius: 12px; padding: 12px; box-shadow: 0 4px 14px rgba(15, 23, 42, 0.05); border: 1px solid ${BORDER}; }
        .placedly-hiw-mock-card--center { text-align: center; }
        .placedly-hiw-mock-label { font-size: 10.5px; font-weight: 700; color: ${TEXT_MUTED}; margin: 0 0 7px; text-transform: uppercase; letter-spacing: 0.08em; }
        .placedly-hiw-tags { display: flex; flex-wrap: wrap; gap: 5px; }
        .placedly-hiw-tag { font-size: 11px; font-weight: 600; padding: 3px 8px; border-radius: 999px; background: rgba(249, 115, 22, 0.10); color: ${BLACK}; }
        .placedly-hiw-mock-list { list-style: none; margin: 0; padding: 0; display: flex; flex-direction: column; gap: 6px; font-size: 12.5px; color: ${TEXT_BODY}; font-weight: 500; }
        .placedly-hiw-mock-dot { display: inline-block; width: 7px; height: 7px; border-radius: 50%; margin-right: 7px; vertical-align: middle; background: ${ORANGE}; }
        .placedly-hiw-mock-row { display: flex; align-items: center; gap: 10px; }
        .placedly-hiw-mock-avatar { display: inline-block; width: 24px; height: 24px; border-radius: 50%; background: #e2e8f0; flex-shrink: 0; }
        .placedly-hiw-mock-avatar--md { width: 34px; height: 34px; background: ${ORANGE}; }
        .placedly-hiw-mock-avatar--sm { width: 24px; height: 24px; background: ${BLACK}; color: ${SURFACE}; font-size: 10.5px; font-weight: 700; display: inline-flex; align-items: center; justify-content: center; }
        .placedly-hiw-mock-avatar--lg { width: 56px; height: 56px; background: ${ORANGE}; margin: 0 auto 6px; }
        .placedly-hiw-mock-avatar--study { background: ${ORANGE}; }
        .placedly-hiw-mock-meta { font-size: 11.5px; color: ${TEXT_MUTED}; font-weight: 500; }
        .placedly-hiw-mock-sub  { font-size: 11px; color: ${TEXT_MUTED}; margin: 0 0 2px; font-weight: 500; }
        .placedly-hiw-mock-title { font-size: 14px; font-weight: 700; color: ${BLACK}; margin: 0 0 2px; }
        .placedly-hiw-mock-co   { font-size: 11.5px; color: ${TEXT_MUTED}; margin: 0; }
        .placedly-hiw-mock-name { font-size: 14px; font-weight: 700; color: ${BLACK}; margin: 4px 0 0; }
        .placedly-hiw-mock-role { font-size: 11.5px; color: ${TEXT_MUTED}; margin: 0 0 8px; }
        .placedly-hiw-mock-spark { font-size: 14px; color: ${ORANGE}; }
        .placedly-hiw-mock-arrow { margin-left: auto; color: ${ORANGE}; font-weight: 700; }
        .placedly-hiw-mock-cta-title { font-size: 12.5px; font-weight: 700; color: ${BLACK}; margin: 0; }
        .placedly-hiw-mock-cta-sub   { font-size: 11px; color: ${TEXT_MUTED}; margin: 2px 0 0; }
        .placedly-hiw-mock-chip { display: inline-block; font-size: 10.5px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.08em; padding: 3px 9px; border-radius: 999px; background: rgba(249, 115, 22, 0.10); color: ${BLACK}; margin: 0 0 6px; }
        .placedly-hiw-mock-offer { font-size: 18px; font-weight: 800; margin: 0 0 10px; letter-spacing: -0.02em; }
        .placedly-hiw-mock-avatars { display: flex; justify-content: center; gap: 0; margin-bottom: 8px; }
        .placedly-hiw-mock-avatars > * + * { margin-left: -8px; }
        .placedly-hiw-mock-bubble { font-size: 12px; padding: 7px 10px; border-radius: 12px; margin: 6px 0; }
        .placedly-hiw-mock-thanks { font-size: 11.5px; color: ${TEXT_MUTED}; margin: 5px 0 0; }

        /* ═══ PROCESS STRIP — swipeable on mobile, vertical on desktop ═══ */
        .process-strip-wrap { position: relative; }
        .process-strip { display: block; width: 100%; }
        .process-strip-track {
          display: flex;
          flex-direction: row;
          flex-wrap: nowrap;
          gap: 8px;
          overflow-x: auto;
          padding: 4px 4px 8px;
          margin: 0 -4px;
          scroll-snap-type: x mandatory;
          -webkit-overflow-scrolling: touch;
          scrollbar-width: none;
        }
        .process-strip-track::-webkit-scrollbar { display: none; }
        .process-strip-step {
          flex: 0 0 auto;
          min-width: 160px;
          max-width: 200px;
          display: flex;
          align-items: center;
          gap: 9px;
          padding: 9px 12px;
          background: ${SURFACE};
          border: 1.5px solid ${BORDER};
          border-radius: 12px;
          cursor: pointer;
          text-align: left;
          scroll-snap-align: start;
          transition: border-color 0.3s, background 0.3s, box-shadow 0.3s, transform 0.3s;
        }
        .process-strip-step:hover { border-color: rgba(249, 115, 22, 0.40); }
        .process-strip-step.is-passed { border-color: rgba(249, 115, 22, 0.30); }
        .process-strip-step.is-active {
          border-color: ${ORANGE};
          background: rgba(249, 115, 22, 0.04);
          box-shadow: 0 6px 18px rgba(249, 115, 22, 0.20);
          transform: translateY(-2px);
        }
        .process-strip-num {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 28px; height: 28px;
          border-radius: 50%;
          border: 1.5px solid;
          font-size: 11px;
          font-weight: 800;
          flex-shrink: 0;
          transition: background 0.3s, color 0.3s, border-color 0.3s;
        }
        .process-strip-icon { color: ${TEXT_MUTED}; flex-shrink: 0; display: inline-flex; transition: color 0.3s; }
        .process-strip-step.is-passed .process-strip-icon,
        .process-strip-step.is-active .process-strip-icon { color: ${ORANGE}; }
        .process-strip-text { display: flex; flex-direction: column; line-height: 1.25; min-width: 0; flex: 1; }
        .process-strip-title { font-size: 13px; font-weight: 800; color: ${BLACK}; }
        .process-strip-desc { font-size: 11px; color: ${TEXT_MUTED}; font-weight: 500; margin-top: 1px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }

        .process-strip-progress {
          position: relative;
          height: 3px;
          background: rgba(15, 23, 42, 0.06);
          border-radius: 999px;
          margin-top: 6px;
          overflow: hidden;
        }
        .process-strip-progress-fill {
          position: absolute;
          inset: 0;
          background: ${ORANGE};
          border-radius: 999px;
          transform-origin: left;
        }

        /* detail panel */
        .process-detail-wrap { width: 100%; }
        .process-panel {
          display: flex;
          align-items: flex-start;
          gap: 12px;
          width: 100%;
          background: ${SURFACE};
          border: 1.5px solid rgba(249, 115, 22, 0.30);
          border-radius: 16px;
          padding: 16px;
          box-shadow: 0 8px 22px rgba(249, 115, 22, 0.10);
        }
        .process-panel-icon { width: 40px; height: 40px; border-radius: 12px; display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
        .process-panel-text { min-width: 0; flex: 1; }
        .process-panel-number { font-size: 10.5px; font-weight: 800; letter-spacing: 0.06em; text-transform: uppercase; }
        .process-panel-title { font-size: clamp(1rem, 3.4vw, 1.25rem); font-weight: 800; color: ${BLACK}; margin: 3px 0 5px; line-height: 1.25; letter-spacing: -0.02em; }
        .process-panel-desc { font-size: clamp(12.5px, 2.6vw, 13px); line-height: 1.55; color: ${TEXT_BODY}; margin: 0 0 12px; }

        .process-mini-nav { display: flex; gap: 4px; align-items: center; flex-wrap: wrap; }
        .process-mini-dot {
          width: 26px; height: 26px;
          border-radius: 50%;
          background: ${SURFACE};
          border: 1.5px solid ${BORDER};
          display: inline-flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          color: ${TEXT_MUTED};
          font-size: 9.5px;
          font-weight: 700;
          transition: background 0.2s, border-color 0.2s, color 0.2s, transform 0.2s;
        }
        .process-mini-dot:hover { border-color: rgba(249, 115, 22, 0.4); color: ${ORANGE}; }
        .process-mini-dot.is-passed { background: rgba(249, 115, 22, 0.10); border-color: rgba(249, 115, 22, 0.4); color: ${ORANGE}; }
        .process-mini-dot.is-active { background: ${ORANGE}; border-color: ${ORANGE}; color: #fff; transform: scale(1.12); box-shadow: 0 4px 14px rgba(249, 115, 22, 0.35); }

        /* ═══ PROCESS GRID — strip above detail on mobile ═══ */
        .placedly-hiw-col-process-grid {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        /* ═══ DESKTOP (≥980px): parallel 2-col + vertical stepper ═══ */
        @media (min-width: 980px) {
          .placedly-hiw-parallel-grid {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 24px;
            align-items: start;
          }
          .placedly-hiw-col-process-grid {
            display: grid;
            grid-template-columns: 1.1fr 1fr;
            gap: 14px;
            align-items: start;
          }
          .process-strip-track {
            flex-direction: column;
            overflow: visible;
            padding: 0;
            margin: 0;
            gap: 7px;
          }
          .process-strip-step { max-width: none; min-width: 0; width: 100%; }
        }

        @media (max-width: 639px) {
          .placedly-hiw-section { padding: 48px 14px !important; }
          .placedly-hiw-header { margin-bottom: 24px; }
          .placedly-hiw-parallel-grid { gap: 16px !important; }
          .placedly-hiw-tabbar-strip { grid-template-columns: repeat(3, 1fr); gap: 5px; padding: 5px; }
          .placedly-hiw-tab { padding: 7px 5px; font-size: 10.5px; gap: 3px; }
          .placedly-hiw-tab-icon { width: 11px; height: 11px; }
          .placedly-hiw-panel { padding: 16px !important; border-radius: 16px; }
          .placedly-hiw-panel-inner { gap: 14px !important; }
          .process-panel { padding: 14px; gap: 10px; }
          .process-panel-icon { width: 34px; height: 34px; }
        }
      `}</style>
    </section>
  );
}