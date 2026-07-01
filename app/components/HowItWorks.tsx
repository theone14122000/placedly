'use client';

import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import {
  BadgeCheck,
  ChevronLeft,
  ChevronRight,
  FileText,
  GraduationCap,
  Plane,
  Send,
  Users,
  Sparkles,
  ArrowRight,
  Pause,
  Play,
  type LucideIcon,
} from 'lucide-react';
import { FadeUp } from './motion';
import SeeDemoButton from './SeeDemoButton';

/* ─────────────────────────────────────────────────────────────────
   TYPES
───────────────────────────────────────────────────────────────── */
type Cms = Record<string, string>;

type TabDef = {
  id: string;
  label: string;
  Icon: LucideIcon;
  title: string;
  details: string;
  accent: string;
  category: 'career' | 'study';
  step: number;
  totalSteps: number;
  cta?: { label: string; href: string };
  Visual: () => React.ReactNode;
};

/* ─────────────────────────────────────────────────────────────────
   DEFAULTS
───────────────────────────────────────────────────────────────── */
const CAREER_DEFAULTS = [
  {
    title: 'Understand You First',
    details:
      'A free 45-minute session where we actually listen. We understand your current role, your target outcome, and what you truly want — not just what looks good on paper.',
  },
  {
    title: 'Resume + Interview Prep',
    details:
      'Complete ATS-optimised resume rebuild, LinkedIn profile overhaul, and live mock interviews with real feedback. You walk into every interview knowing exactly what to say.',
  },
  {
    title: 'Offer Received. Then We Invoice.',
    details:
      "When you have your offer letter in hand, only then does our 12% Career Assistance Fee apply. That's our entire model — zero upfront, zero risk.",
    cta: { label: 'Apply for CAP', href: '/cap/apply' },
  },
];

const STUDY_DEFAULTS = [
  {
    title: 'Free Counselling Session',
    details:
      'We understand your academic background, budget, and destination goals — UK, France, Germany, or Dubai — before recommending a single university.',
  },
  {
    title: 'University Shortlist & Applications',
    details:
      'Course shortlisting, SOP writing, and applications to 140+ partner universities — handled end to end by one dedicated advisor.',
  },
  {
    title: 'Visa & Pre-Departure Support',
    details:
      'Documentation, visa filing, and pre-departure checklist so you land abroad prepared — not overwhelmed.',
    cta: { label: 'Explore Study Abroad', href: '/study-visa' },
  },
];

/* ─────────────────────────────────────────────────────────────────
   VISUAL COMPONENTS (Unchanged, clean & reusable)
───────────────────────────────────────────────────────────────── */
function MockCard({
  children,
  style,
}: {
  children: React.ReactNode;
  style?: React.CSSProperties;
}) {
  return (
    <div
      style={{
        background: '#fff',
        borderRadius: 16,
        padding: '14px 16px',
        boxShadow: '0 2px 12px rgba(15,23,42,0.07)',
        border: '1px solid rgba(15,23,42,0.06)',
        ...style,
      }}
    >
      {children}
    </div>
  );
}

function Tag({
  children,
  color = '#f97316',
}: {
  children: React.ReactNode;
  color?: string;
}) {
  return (
    <span
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        padding: '4px 10px',
        borderRadius: 999,
        fontSize: 11,
        fontWeight: 600,
        background: `${color}18`,
        color,
        border: `1px solid ${color}30`,
        whiteSpace: 'nowrap',
      }}
    >
      {children}
    </span>
  );
}

function Avatar({
  size = 32,
  color = '#f97316',
  letter,
}: {
  size?: number;
  color?: string;
  letter?: string;
}) {
  return (
    <div
      style={{
        width: size,
        height: size,
        borderRadius: '50%',
        background: `linear-gradient(135deg, ${color}40, ${color}20)`,
        border: `2px solid ${color}40`,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: size * 0.38,
        fontWeight: 700,
        color,
        flexShrink: 0,
      }}
    >
      {letter}
    </div>
  );
}

function VisualShell({
  gradient,
  children,
}: {
  gradient: string;
  children: React.ReactNode;
}) {
  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        minHeight: 260,
        borderRadius: 20,
        background: gradient,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '24px 20px',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <div
        style={{
          position: 'absolute',
          top: -40,
          right: -40,
          width: 140,
          height: 140,
          borderRadius: '50%',
          background: 'rgba(255,255,255,0.12)',
          pointerEvents: 'none',
        }}
      />
      <div
        style={{
          position: 'absolute',
          bottom: -30,
          left: -30,
          width: 100,
          height: 100,
          borderRadius: '50%',
          background: 'rgba(255,255,255,0.08)',
          pointerEvents: 'none',
        }}
      />
      <div style={{ position: 'relative', zIndex: 1, width: '100%', maxWidth: 320 }}>
        {children}
      </div>
    </div>
  );
}

/* Career Visuals */
function VisualCareer1() {
  return (
    <VisualShell gradient="linear-gradient(135deg, #fff7ed 0%, #ffedd5 100%)">
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        <MockCard>
          <p style={{ fontSize: 11, fontWeight: 600, color: '#94a3b8', margin: '0 0 8px', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
            I&apos;m targeting
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
            {['Claims & Insurance', 'BPO / MNC', '₹8–12 LPA'].map((t) => (
              <Tag key={t} color="#f97316">{t}</Tag>
            ))}
          </div>
        </MockCard>
        <MockCard>
          <p style={{ fontSize: 11, fontWeight: 600, color: '#94a3b8', margin: '0 0 10px', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
            My Placedly roadmap
          </p>
          {[
            { dot: '#f97316', name: 'EXL', role: 'Senior Analyst' },
            { dot: '#2563eb', name: 'Optum', role: 'Claims Lead' },
            { dot: '#7c3aed', name: 'WNS', role: 'Operations' },
          ].map((row) => (
            <div key={row.name} style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '5px 0', borderBottom: '1px solid rgba(15,23,42,0.04)' }}>
              <div style={{ width: 8, height: 8, borderRadius: '50%', background: row.dot, flexShrink: 0 }} />
              <span style={{ fontSize: 13, fontWeight: 600, color: '#0f172a' }}>{row.name}</span>
              <span style={{ fontSize: 12, color: '#64748b', marginLeft: 2 }}>· {row.role}</span>
            </div>
          ))}
        </MockCard>
      </div>
    </VisualShell>
  );
}

function VisualCareer2() {
  return (
    <VisualShell gradient="linear-gradient(135deg, #fef3c7 0%, #fde68a 40%, #fcd34d 100%)">
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        <MockCard style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <Avatar size={32} color="#f97316" letter="P" />
          <span style={{ fontSize: 12, color: '#64748b', fontWeight: 500 }}>Placedly shared with you</span>
        </MockCard>
        <MockCard>
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: 10 }}>
            <Avatar size={40} color="#2563eb" letter="E" />
            <div>
              <p style={{ fontSize: 11, color: '#94a3b8', margin: '0 0 2px' }}>Your advisor connected you to</p>
              <p style={{ fontSize: 14, fontWeight: 700, color: '#0f172a', margin: '0 0 2px' }}>Senior Claims Analyst</p>
              <p style={{ fontSize: 12, color: '#64748b', margin: 0 }}>EXL Service · Noida</p>
            </div>
          </div>
        </MockCard>
        <MockCard style={{ display: 'flex', alignItems: 'center', gap: 10, background: 'linear-gradient(135deg,#0f172a,#1e293b)' }}>
          <Sparkles size={16} style={{ color: '#f97316', flexShrink: 0 }} />
          <div style={{ flex: 1 }}>
            <p style={{ fontSize: 13, fontWeight: 600, color: '#fff', margin: '0 0 2px' }}>Interview prep booked</p>
            <p style={{ fontSize: 11, color: '#94a3b8', margin: 0 }}>Mock round with industry coach</p>
          </div>
          <ArrowRight size={14} style={{ color: '#f97316', flexShrink: 0 }} />
        </MockCard>
      </div>
    </VisualShell>
  );
}

function VisualCareer3() {
  return (
    <VisualShell gradient="linear-gradient(135deg, #fdf2f8 0%, #fce7f3 100%)">
      <MockCard style={{ textAlign: 'center', padding: '24px 20px' }}>
        <div style={{
          display: 'inline-flex', alignItems: 'center', gap: 6,
          padding: '4px 12px', borderRadius: 999,
          background: '#dcfce7', color: '#16a34a',
          fontSize: 11, fontWeight: 700, marginBottom: 12,
          border: '1px solid #bbf7d0',
        }}>
          <BadgeCheck size={12} /> You received
        </div>
        <p style={{ fontSize: 20, fontWeight: 800, color: '#0f172a', margin: '0 0 16px', letterSpacing: '-0.02em' }}>
          Offer Letter · ₹9.2 LPA
        </p>
        <div style={{ display: 'flex', justifyContent: 'center', gap: -6, marginBottom: 12 }}>
          {['P', 'A', 'M'].map((l, i) => (
            <div key={l} style={{ marginLeft: i === 0 ? 0 : -8, zIndex: 3 - i }}>
              <Avatar size={32} color={['#f97316','#2563eb','#7c3aed'][i]} letter={l} />
            </div>
          ))}
        </div>
        <p style={{ fontSize: 12, color: '#64748b', margin: '0 0 12px' }}>
          Placedly team sent congratulations 🎉
        </p>
        <div style={{
          background: 'linear-gradient(135deg,#0f172a,#1e293b)',
          borderRadius: 12, padding: '10px 14px',
          fontSize: 12, color: '#e2e8f0', lineHeight: 1.5,
          fontStyle: 'italic',
        }}>
          &ldquo;Zero upfront until this moment — that&apos;s the Placedly promise.&rdquo;
        </div>
      </MockCard>
    </VisualShell>
  );
}

/* Study Visuals */
function VisualStudy1() {
  return (
    <VisualShell gradient="linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%)">
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        <MockCard>
          <p style={{ fontSize: 11, fontWeight: 600, color: '#94a3b8', margin: '0 0 8px', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
            Dream destinations
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
            {[
              { label: '🇬🇧 UK', color: '#2563eb' },
              { label: '🇫🇷 France', color: '#7c3aed' },
              { label: '🇩🇪 Germany', color: '#0891b2' },
              { label: '🇦🇪 Dubai', color: '#16a34a' },
            ].map(({ label, color }) => (
              <Tag key={label} color={color}>{label}</Tag>
            ))}
          </div>
        </MockCard>
        <MockCard>
          <p style={{ fontSize: 11, fontWeight: 600, color: '#94a3b8', margin: '0 0 10px', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
            My profile focus
          </p>
          {[
            { dot: '#2563eb', prog: 'MSc Business', dest: 'UK' },
            { dot: '#7c3aed', prog: 'MBA', dest: 'France' },
            { dot: '#0891b2', prog: 'Engineering', dest: 'Germany' },
          ].map((row) => (
            <div key={row.prog} style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '5px 0', borderBottom: '1px solid rgba(15,23,42,0.04)' }}>
              <div style={{ width: 8, height: 8, borderRadius: '50%', background: row.dot, flexShrink: 0 }} />
              <span style={{ fontSize: 13, fontWeight: 600, color: '#0f172a' }}>{row.prog}</span>
              <span style={{ fontSize: 12, color: '#64748b', marginLeft: 2 }}>· {row.dest}</span>
            </div>
          ))}
        </MockCard>
      </div>
    </VisualShell>
  );
}

function VisualStudy2() {
  return (
    <VisualShell gradient="linear-gradient(135deg, #f5f3ff 0%, #ede9fe 100%)">
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        <MockCard style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <Avatar size={32} color="#7c3aed" letter="U" />
          <span style={{ fontSize: 12, color: '#64748b', fontWeight: 500 }}>Application update</span>
        </MockCard>
        <MockCard>
          <p style={{ fontSize: 12, color: '#7c3aed', fontWeight: 600, margin: '0 0 2px' }}>University of Manchester</p>
          <p style={{ fontSize: 14, fontWeight: 700, color: '#0f172a', margin: '0 0 2px' }}>MSc International Business</p>
          <p style={{ fontSize: 12, color: '#64748b', margin: 0 }}>Fall &apos;25 intake · Offer received</p>
        </MockCard>
        <MockCard style={{ display: 'flex', alignItems: 'center', gap: 10, background: 'linear-gradient(135deg,#4c1d95,#5b21b6)' }}>
          <Sparkles size={16} style={{ color: '#a78bfa', flexShrink: 0 }} />
          <div style={{ flex: 1 }}>
            <p style={{ fontSize: 13, fontWeight: 600, color: '#fff', margin: '0 0 2px' }}>SOP & documents complete</p>
            <p style={{ fontSize: 11, color: '#c4b5fd', margin: 0 }}>Ready for visa filing</p>
          </div>
          <ArrowRight size={14} style={{ color: '#a78bfa', flexShrink: 0 }} />
        </MockCard>
      </div>
    </VisualShell>
  );
}

function VisualStudy3() {
  return (
    <VisualShell gradient="linear-gradient(135deg, #ecfdf5 0%, #d1fae5 100%)">
      <MockCard style={{ textAlign: 'center', padding: '24px 20px' }}>
        <Avatar size={56} color="#16a34a" letter="P" />
        <p style={{ fontSize: 15, fontWeight: 700, color: '#0f172a', margin: '12px 0 2px' }}>Priya Sharma</p>
        <p style={{ fontSize: 12, color: '#64748b', margin: '0 0 14px' }}>MSc Admit · UK 🇬🇧</p>
        <div style={{
          background: 'linear-gradient(135deg,#14532d,#166534)',
          borderRadius: 12, padding: '10px 14px',
          fontSize: 12, color: '#bbf7d0',
          lineHeight: 1.5, marginBottom: 12,
        }}>
          ✈️ Visa approved · Flying September 2025
        </div>
        <p style={{ fontSize: 11, color: '#94a3b8', margin: 0 }}>
          Your advisor: pre-departure checklist sent ✓
        </p>
      </MockCard>
    </VisualShell>
  );
}

/* ─────────────────────────────────────────────────────────────────
   TAB META & BUILD
───────────────────────────────────────────────────────────────── */
const TAB_META = [
  { id: 'consult', label: 'Free Session', Icon: Users, accent: '#f97316', category: 'career', step: 1, cmsKey: '1', defaultIndex: 0, defaults: CAREER_DEFAULTS, Visual: VisualCareer1 },
  { id: 'prep', label: 'Interview Prep', Icon: FileText, accent: '#f59e0b', category: 'career', step: 2, cmsKey: '3', defaultIndex: 1, defaults: CAREER_DEFAULTS, Visual: VisualCareer2 },
  { id: 'offer', label: 'Offer & Fee', Icon: BadgeCheck, accent: '#16a34a', category: 'career', step: 3, cmsKey: '5', defaultIndex: 2, defaults: CAREER_DEFAULTS, Visual: VisualCareer3 },
  { id: 'counsel', label: 'Counselling', Icon: GraduationCap, accent: '#2563eb', category: 'study', step: 1, cmsKey: 'Study1', defaultIndex: 0, defaults: STUDY_DEFAULTS, Visual: VisualStudy1 },
  { id: 'apply', label: 'Applications', Icon: Send, accent: '#7c3aed', category: 'study', step: 2, cmsKey: 'Study2', defaultIndex: 1, defaults: STUDY_DEFAULTS, Visual: VisualStudy2 },
  { id: 'visa', label: 'Visa Support', Icon: Plane, accent: '#0891b2', category: 'study', step: 3, cmsKey: 'Study3', defaultIndex: 2, defaults: STUDY_DEFAULTS, Visual: VisualStudy3 },
] as const;

function buildTabs(cms: Cms): TabDef[] {
  return TAB_META.map((meta) => {
    const def = meta.defaults[meta.defaultIndex];
    const isStudy = meta.cmsKey.startsWith('Study');
    const prefix = isStudy ? 'hp:hiwStudy' : 'hp:hiw';
    const key = isStudy ? meta.cmsKey.replace('Study', '') : meta.cmsKey;
    const totalSteps = meta.category === 'career' ? 3 : 3;

    return {
      id: meta.id,
      label: meta.label,
      Icon: meta.Icon,
      accent: meta.accent,
      category: meta.category,
      step: meta.step,
      totalSteps,
      title: cms[`${prefix}${key}Title`] || def.title,
      details: cms[`${prefix}${key}Details`] || def.details,
      cta: def.cta,
      Visual: meta.Visual,
    };
  });
}

/* ─────────────────────────────────────────────────────────────────
   AUTO-PLAY HOOK
───────────────────────────────────────────────────────────────── */
function useAutoPlay(
  items: TabDef[],
  intervalMs: number,
  isPaused: boolean,
) {
  const [index, setIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const rafRef = useRef<number>(0);
  const startRef = useRef<number>(0);

  useEffect(() => {
    startRef.current = performance.now();

    const tick = (now: number) => {
      if (isPaused) {
        rafRef.current = requestAnimationFrame(tick);
        return;
      }

      const elapsed = now - startRef.current;
      const p = Math.min(elapsed / intervalMs, 1);
      setProgress(p);

      if (p >= 1) {
        setIndex((prev) => (prev + 1) % items.length);
        startRef.current = now;
        setProgress(0);
      } else {
        rafRef.current = requestAnimationFrame(tick);
      }
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, [items.length, intervalMs, isPaused]);

  const goTo = useCallback(
    (i: number) => {
      setIndex(((i % items.length) + items.length) % items.length);
      setProgress(0);
      startRef.current = performance.now();
    },
    [items.length],
  );

  return { index, progress, goTo };
}

/* ─────────────────────────────────────────────────────────────────
   COMPONENTS
───────────────────────────────────────────────────────────────── */
function StepIndicator({ tab }: { tab: TabDef }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 12 }}>
      <div
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: 6,
          padding: '4px 12px',
          borderRadius: 999,
          background: `${tab.accent}14`,
          border: `1px solid ${tab.accent}30`,
          fontSize: 11,
          fontWeight: 700,
          letterSpacing: '0.08em',
          color: tab.accent,
          textTransform: 'uppercase',
        }}
      >
        <span
          style={{
            width: 6,
            height: 6,
            borderRadius: '50%',
            background: tab.accent,
            flexShrink: 0,
          }}
        />
        {tab.category === 'career' ? 'Career' : 'Study Abroad'}
        {' · '}Step {tab.step} of {tab.totalSteps}
      </div>
    </div>
  );
}

function TabBar({
  tabs,
  activeIndex,
  progress,
  onPrev,
  onNext,
  onSelect,
}: {
  tabs: TabDef[];
  activeIndex: number;
  progress: number;
  onPrev: () => void;
  onNext: () => void;
  onSelect: (i: number) => void;
}) {
  const activeTab = tabs[activeIndex];
  const circumference = 2 * Math.PI * 20;
  const offset = circumference * (1 - progress);

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 20 }}>
      <button
        type="button"
        aria-label="Previous tab"
        onClick={onPrev}
        style={{
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          width: 36, height: 36, borderRadius: '50%',
          border: '1px solid rgba(15,23,42,0.10)', background: '#fff',
          cursor: 'pointer', color: '#64748b', flexShrink: 0,
          boxShadow: '0 1px 4px rgba(15,23,42,0.06)',
          transition: 'all 0.2s ease',
        }}
      >
        <ChevronLeft size={18} strokeWidth={2} />
      </button>

      <div
        style={{
          display: 'flex', gap: 6, flex: 1, overflowX: 'auto',
          scrollbarWidth: 'none', WebkitOverflowScrolling: 'touch', padding: '2px 0',
        }}
        role="tablist"
        aria-label="How Placedly works"
      >
        {tabs.map((tab, i) => {
          const isActive = i === activeIndex;
          return (
            <button
              key={tab.id}
              type="button"
              role="tab"
              aria-selected={isActive}
              onClick={() => onSelect(i)}
              style={{
                display: 'inline-flex', alignItems: 'center', gap: 6,
                padding: '8px 14px', borderRadius: 999,
                border: isActive ? `1.5px solid ${tab.accent}40` : '1.5px solid rgba(15,23,42,0.08)',
                background: isActive ? `${tab.accent}12` : '#fff',
                color: isActive ? tab.accent : '#64748b',
                fontSize: 13, fontWeight: isActive ? 700 : 500,
                cursor: 'pointer', whiteSpace: 'nowrap', flexShrink: 0,
                boxShadow: isActive ? `0 0 0 3px ${tab.accent}18` : '0 1px 3px rgba(15,23,42,0.05)',
                transition: 'all 0.25s cubic-bezier(0.22,1,0.36,1)',
              }}
            >
              <tab.Icon size={14} strokeWidth={2} aria-hidden />
              {tab.label}
            </button>
          );
        })}
      </div>

      <button
        type="button"
        aria-label="Next tab"
        onClick={onNext}
        style={{
          position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center',
          width: 40, height: 40, borderRadius: '50%', border: 'none',
          background: activeTab?.accent ?? '#f97316',
          cursor: 'pointer', color: '#fff', flexShrink: 0,
          boxShadow: `0 4px 12px ${activeTab?.accent ?? '#f97316'}40`,
          transition: 'all 0.25s ease',
        }}
      >
        <svg
          style={{ position: 'absolute', inset: -3, width: 46, height: 46, transform: 'rotate(-90deg)', pointerEvents: 'none' }}
          viewBox="0 0 48 48" aria-hidden
        >
          <circle cx="24" cy="24" r="20" fill="none" stroke="rgba(255,255,255,0.25)" strokeWidth="2" />
          <circle
            cx="24" cy="24" r="20" fill="none"
            stroke="rgba(255,255,255,0.85)" strokeWidth="2" strokeLinecap="round"
            strokeDasharray={circumference} strokeDashoffset={offset}
            style={{ transition: 'stroke-dashoffset 0.1s linear' }}
          />
        </svg>
        <ChevronRight size={18} strokeWidth={2.5} />
      </button>
    </div>
  );
}

function TabPanel({ tab }: { tab: TabDef }) {
  return (
    <motion.div
      key={tab.id}
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
      style={{
        display: 'grid',
        gridTemplateColumns: 'minmax(0,1fr) minmax(0,1fr)',
        gap: 'clamp(20px,3vw,40px)',
        alignItems: 'center',
      }}
    >
      <div style={{ borderRadius: 20, overflow: 'hidden' }}>
        <tab.Visual />
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        <StepIndicator tab={tab} />
        <h3 style={{ fontFamily: 'Inter, sans-serif', fontSize: 'clamp(1.4rem,2.5vw,1.9rem)', fontWeight: 700, letterSpacing: '-0.03em', lineHeight: 1.15, color: '#0f172a', margin: 0 }}>
          {tab.title}
        </h3>
        <p style={{ fontSize: 'clamp(14px,1.2vw,15px)', lineHeight: 1.72, color: '#64748b', margin: 0 }}>
          {tab.details}
        </p>
        <div style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
          {Array.from({ length: tab.totalSteps }).map((_, i) => (
            <div key={i} style={{
              width: i + 1 === tab.step ? 20 : 6, height: 6, borderRadius: 999,
              background: i + 1 <= tab.step ? tab.accent : 'rgba(15,23,42,0.10)',
              transition: 'all 0.35s cubic-bezier(0.22,1,0.36,1)',
            }} />
          ))}
          <span style={{ fontSize: 11, color: '#94a3b8', marginLeft: 4, fontWeight: 600 }}>
            {tab.step}/{tab.totalSteps}
          </span>
        </div>
        {tab.cta && (
          <Link href={tab.cta.href} style={{
            display: 'inline-flex', alignItems: 'center', gap: 8,
            padding: '11px 22px', borderRadius: 999, background: tab.accent,
            color: '#fff', fontSize: 14, fontWeight: 700, textDecoration: 'none',
            width: 'fit-content', boxShadow: `0 4px 14px ${tab.accent}40`,
            transition: 'transform 0.2s ease, box-shadow 0.2s ease',
          }}>
            {tab.cta.label}
            <ArrowRight size={15} strokeWidth={2.25} aria-hidden />
          </Link>
        )}
      </div>
    </motion.div>
  );
}

function MobilePanel({ tab }: { tab: TabDef }) {
  return (
    <motion.div
      key={tab.id}
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
      style={{ display: 'flex', flexDirection: 'column', gap: 16 }}
    >
      <div style={{ borderRadius: 16, overflow: 'hidden' }}>
        <tab.Visual />
      </div>
      <StepIndicator tab={tab} />
      <h3 style={{ fontFamily: 'Inter, sans-serif', fontSize: 'clamp(1.3rem,5.5vw,1.6rem)', fontWeight: 700, letterSpacing: '-0.03em', lineHeight: 1.15, color: '#0f172a', margin: 0 }}>
        {tab.title}
      </h3>
      <p style={{ fontSize: 14, lineHeight: 1.7, color: '#64748b', margin: 0 }}>
        {tab.details}
      </p>
      <div style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
        {Array.from({ length: tab.totalSteps }).map((_, i) => (
          <div key={i} style={{
            width: i + 1 === tab.step ? 20 : 6, height: 6, borderRadius: 999,
            background: i + 1 <= tab.step ? tab.accent : 'rgba(15,23,42,0.10)',
            transition: 'all 0.35s cubic-bezier(0.22,1,0.36,1)',
          }} />
        ))}
      </div>
      {tab.cta && (
        <Link href={tab.cta.href} style={{
          display: 'inline-flex', alignItems: 'center', gap: 8,
          padding: '11px 22px', borderRadius: 999, background: tab.accent,
          color: '#fff', fontSize: 14, fontWeight: 700, textDecoration: 'none',
          width: 'fit-content', boxShadow: `0 4px 14px ${tab.accent}40`,
        }}>
          {tab.cta.label}
          <ArrowRight size={15} strokeWidth={2.25} aria-hidden />
        </Link>
      )}
    </motion.div>
  );
}

/* ─────────────────────────────────────────────────────────────────
   ROOT COMPONENT
───────────────────────────────────────────────────────────────── */
export default function HowItWorks({ cms = {} }: { cms?: Cms }) {
  const tabs = useMemo(() => buildTabs(cms), [cms]);
  const [isMobile, setIsMobile] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  // SSR-safe mobile detection
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener('resize', check, { passive: true });
    return () => window.removeEventListener('resize', check);
  }, []);

  // Auto-play configuration: 6 seconds per tab (within 5-8s request)
  const AUTO_INTERVAL = 6000;
  const { index: activeIndex, progress, goTo } = useAutoPlay(tabs, AUTO_INTERVAL, isPaused);
  const activeTab = tabs[activeIndex] ?? tabs[0];

  // Sync category automatically based on active tab
  const activeCategory = activeTab?.category ?? 'career';

  const handlePrev = useCallback(() => goTo(activeIndex - 1), [activeIndex, goTo]);
  const handleNext = useCallback(() => goTo(activeIndex + 1), [activeIndex, goTo]);
  const handleSelect = useCallback((i: number) => goTo(i), [goTo]);

  const title = cms['hp:hiwTitle'] ?? 'How Placedly Works — Simple, Transparent, Proven';
  const subtitle = cms['hp:hiwSubtitle'] ?? 'Placedly connects ambitious professionals to careers and global education. Built for candidates who want clarity, warm guidance, and results — not generic agency noise.';

  return (
    <section
      id="how"
      style={{
        position: 'relative',
        padding: isMobile ? 'clamp(48px,8vw,72px) clamp(16px,4vw,24px)' : 'clamp(64px,9vw,104px) clamp(20px,4vw,48px)',
        background: '#f8fafc',
        overflow: 'hidden',
      }}
    >
      <div aria-hidden style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        background: `
          radial-gradient(ellipse 60% 50% at 80% 20%, rgba(249,115,22,0.05), transparent 60%),
          radial-gradient(ellipse 50% 40% at 20% 80%, rgba(37,99,235,0.05), transparent 60%)
        `,
      }} />

      <div style={{ position: 'relative', zIndex: 1, maxWidth: 1100, margin: '0 auto' }}>
        <FadeUp style={{ textAlign: 'center', marginBottom: isMobile ? 32 : 48 }}>
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: 6,
            padding: '5px 14px', borderRadius: 999,
            background: 'rgba(15,23,42,0.05)', border: '1px solid rgba(15,23,42,0.08)',
            fontSize: 11, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#64748b', marginBottom: 16,
          }}>
            <Sparkles size={12} aria-hidden />
            How it works
          </div>
          <h2 style={{
            fontFamily: 'Inter, sans-serif',
            fontSize: isMobile ? 'clamp(1.65rem,7vw,2.1rem)' : 'clamp(1.9rem,3.5vw,2.8rem)',
            fontWeight: 700, letterSpacing: '-0.035em', lineHeight: 1.1, color: '#0f172a', margin: '0 0 14px',
          }}>
            {title}
          </h2>
          <p style={{
            fontSize: isMobile ? 14 : 'clamp(15px,1.3vw,17px)',
            lineHeight: 1.72, color: '#64748b', maxWidth: 600, margin: '0 auto',
          }}>
            {subtitle}
          </p>
        </FadeUp>

        {/* Showcase Card */}
        <div
          role="region"
          aria-label="How Placedly works showcase"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          onFocus={() => setIsPaused(true)}
          onBlur={() => setIsPaused(false)}
          style={{
            position: 'relative',
            background: '#fff',
            borderRadius: isMobile ? 20 : 28,
            border: '1px solid rgba(15,23,42,0.07)',
            boxShadow: '0 4px 6px rgba(15,23,42,0.04), 0 20px 60px rgba(15,23,42,0.08)',
            padding: isMobile ? '20px 16px 24px' : 'clamp(28px,3vw,40px) clamp(24px,3vw,36px)',
            overflow: 'hidden',
          }}
        >
          {/* Top Progress Bar */}
          <div style={{
            position: 'absolute', top: 0, left: 0, right: 0, height: 3,
            background: 'rgba(15,23,42,0.06)', borderRadius: '0 0 3px 3px',
          }}>
            <motion.div
              style={{
                height: '100%',
                background: activeTab?.accent ?? '#f97316',
                borderRadius: '0 0 3px 3px',
              }}
              animate={{ width: `${progress * 100}%` }}
              transition={{ duration: 0.1, ease: 'linear' }}
            />
          </div>

          <TabBar
            tabs={tabs}
            activeIndex={activeIndex}
            progress={progress}
            onPrev={handlePrev}
            onNext={handleNext}
            onSelect={handleSelect}
          />

          <AnimatePresence mode="wait">
            {isMobile ? (
              <MobilePanel key={activeTab.id} tab={activeTab} />
            ) : (
              <TabPanel key={activeTab.id} tab={activeTab} />
            )}
          </AnimatePresence>

          {/* Footer */}
          <div style={{
            marginTop: isMobile ? 20 : 28,
            paddingTop: isMobile ? 16 : 20,
            borderTop: '1px solid rgba(15,23,42,0.06)',
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            flexWrap: 'wrap', gap: 12,
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <div style={{
                display: 'inline-flex', alignItems: 'center', gap: 4,
                padding: '4px 10px', borderRadius: 999,
                background: isPaused ? 'rgba(15,23,42,0.06)' : 'rgba(249,115,22,0.1)',
                fontSize: 11, fontWeight: 600, color: isPaused ? '#64748b' : '#f97316',
                transition: 'all 0.2s ease',
              }}>
                {isPaused ? <Pause size={10} /> : <Play size={10} />}
                {isPaused ? 'Paused' : 'Auto-playing'}
              </div>
              <p style={{ fontSize: 12, color: '#94a3b8', margin: 0, fontWeight: 500 }}>
                {activeCategory === 'career' ? '500+ professionals placed · Zero upfront fee' : '140+ partner universities · End-to-end support'}
              </p>
            </div>
            <SeeDemoButton variant="panel" />
          </div>
        </div>
      </div>
    </section>
  );
}