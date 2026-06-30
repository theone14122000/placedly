'use client';

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
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
  type LucideIcon,
} from 'lucide-react';
import { FadeUp } from './motion';
import SeeDemoButton from './SeeDemoButton';

type Cms = Record<string, string>;

type TabDef = {
  id: string;
  label: string;
  Icon: LucideIcon;
  title: string;
  details: string;
  cta?: { label: string; href: string };
  Visual: () => React.ReactNode;
};

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

function VisualCareer1() {
  return (
    <div className="placedly-hiw-visual placedly-hiw-visual--warm">
      <div className="placedly-hiw-mock placedly-hiw-mock--stack">
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
            <li><span className="placedly-hiw-mock-dot placedly-hiw-mock-dot--exl" />EXL · Senior Analyst</li>
            <li><span className="placedly-hiw-mock-dot placedly-hiw-mock-dot--optum" />Optum · Claims Lead</li>
            <li><span className="placedly-hiw-mock-dot placedly-hiw-mock-dot--wns" />WNS · Operations</li>
          </ul>
      </div>
      </div>
    </div>
  );
}

function VisualCareer2() {
  return (
    <div className="placedly-hiw-visual placedly-hiw-visual--sunset">
      <div className="placedly-hiw-mock placedly-hiw-mock--feed">
        <div className="placedly-hiw-mock-card placedly-hiw-mock-card--sm">
          <span className="placedly-hiw-mock-avatar" />
          <span className="placedly-hiw-mock-meta">Placedly shared with you</span>
        </div>
        <div className="placedly-hiw-mock-card placedly-hiw-mock-card--hero">
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
          <span className="placedly-hiw-mock-spark">✦</span>
          <div>
            <p className="placedly-hiw-mock-cta-title">Interview prep booked</p>
            <p className="placedly-hiw-mock-cta-sub">Mock round with industry coach</p>
          </div>
          <span className="placedly-hiw-mock-arrow">→</span>
        </div>
      </div>
    </div>
  );
}

function VisualCareer3() {
  return (
    <div className="placedly-hiw-visual placedly-hiw-visual--peach">
      <div className="placedly-hiw-mock placedly-hiw-mock--success">
        <div className="placedly-hiw-mock-card placedly-hiw-mock-card--center">
          <p className="placedly-hiw-mock-chip">You received</p>
          <p className="placedly-hiw-mock-offer">Offer Letter · ₹9.2 LPA</p>
          <div className="placedly-hiw-mock-avatars">
            {['P', 'A', 'M'].map((l) => (
              <span key={l} className="placedly-hiw-mock-avatar placedly-hiw-mock-avatar--sm">{l}</span>
            ))}
          </div>
          <p className="placedly-hiw-mock-thanks">Placedly team sent congratulations 🎉</p>
          <div className="placedly-hiw-mock-bubble">
            &ldquo;Zero upfront until this moment — that&apos;s the Placedly promise.&rdquo;
          </div>
        </div>
      </div>
    </div>
  );
}

function VisualStudy1() {
  return (
    <div className="placedly-hiw-visual placedly-hiw-visual--warm">
      <div className="placedly-hiw-mock placedly-hiw-mock--stack">
        <div className="placedly-hiw-mock-card">
          <p className="placedly-hiw-mock-label">Dream destinations:</p>
          <div className="placedly-hiw-tags">
            {['United Kingdom', 'France', 'Germany', 'Dubai'].map((t) => (
              <span key={t} className="placedly-hiw-tag placedly-hiw-tag--study">{t}</span>
            ))}
          </div>
        </div>
        <div className="placedly-hiw-mock-card">
          <p className="placedly-hiw-mock-label">My profile focus</p>
          <ul className="placedly-hiw-mock-list">
            <li><span className="placedly-hiw-mock-dot placedly-hiw-mock-dot--uk" />MSc Business · UK</li>
            <li><span className="placedly-hiw-mock-dot placedly-hiw-mock-dot--fr" />MBA · France</li>
            <li><span className="placedly-hiw-mock-dot placedly-hiw-mock-dot--de" />Engineering · Germany</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

function VisualStudy2() {
  return (
    <div className="placedly-hiw-visual placedly-hiw-visual--sunset">
      <div className="placedly-hiw-mock placedly-hiw-mock--feed">
        <div className="placedly-hiw-mock-card placedly-hiw-mock-card--sm">
          <span className="placedly-hiw-mock-avatar placedly-hiw-mock-avatar--study" />
          <span className="placedly-hiw-mock-meta">Application update</span>
        </div>
        <div className="placedly-hiw-mock-card placedly-hiw-mock-card--hero">
          <p className="placedly-hiw-mock-sub">University of Manchester</p>
          <p className="placedly-hiw-mock-title">MSc International Business</p>
          <p className="placedly-hiw-mock-co">Fall &apos;25 intake · Offer received</p>
        </div>
        <div className="placedly-hiw-mock-card placedly-hiw-mock-card--cta">
          <span className="placedly-hiw-mock-spark">✦</span>
          <div>
            <p className="placedly-hiw-mock-cta-title">SOP & documents complete</p>
            <p className="placedly-hiw-mock-cta-sub">Ready for visa filing</p>
          </div>
          <span className="placedly-hiw-mock-arrow">→</span>
        </div>
      </div>
    </div>
  );
}

function VisualStudy3() {
  return (
    <div className="placedly-hiw-visual placedly-hiw-visual--peach">
      <div className="placedly-hiw-mock placedly-hiw-mock--success">
        <div className="placedly-hiw-mock-card placedly-hiw-mock-card--center">
          <span className="placedly-hiw-mock-avatar placedly-hiw-mock-avatar--lg" />
          <p className="placedly-hiw-mock-name">Priya Sharma</p>
          <p className="placedly-hiw-mock-role">MSc Admit · UK</p>
          <div className="placedly-hiw-mock-bubble placedly-hiw-mock-bubble--purple">
            Visa approved · Flying September 2025
          </div>
          <p className="placedly-hiw-mock-thanks">Your advisor: pre-departure checklist sent ✓</p>
        </div>
      </div>
    </div>
  );
}

const TAB_META: {
  id: string;
  label: string;
  Icon: LucideIcon;
  cmsKey: string;
  defaultIndex: number;
  defaults: typeof CAREER_DEFAULTS;
  Visual: () => React.ReactNode;
}[] = [
  { id: 'consult', label: 'Free Session', Icon: Users, cmsKey: '1', defaultIndex: 0, defaults: CAREER_DEFAULTS, Visual: VisualCareer1 },
  { id: 'prep', label: 'Interview Prep', Icon: FileText, cmsKey: '3', defaultIndex: 1, defaults: CAREER_DEFAULTS, Visual: VisualCareer2 },
  { id: 'offer', label: 'Offer & Fee', Icon: BadgeCheck, cmsKey: '5', defaultIndex: 2, defaults: CAREER_DEFAULTS, Visual: VisualCareer3 },
  { id: 'counsel', label: 'Counselling', Icon: GraduationCap, cmsKey: 'Study1', defaultIndex: 0, defaults: STUDY_DEFAULTS, Visual: VisualStudy1 },
  { id: 'apply', label: 'Applications', Icon: Send, cmsKey: 'Study2', defaultIndex: 1, defaults: STUDY_DEFAULTS, Visual: VisualStudy2 },
  { id: 'visa', label: 'Visa Support', Icon: Plane, cmsKey: 'Study3', defaultIndex: 2, defaults: STUDY_DEFAULTS, Visual: VisualStudy3 },
];

function buildTabs(cms: Cms): TabDef[] {
  return TAB_META.map((meta) => {
    const def = meta.defaults[meta.defaultIndex];
    const isStudy = meta.cmsKey.startsWith('Study');
    const prefix = isStudy ? 'hp:hiwStudy' : 'hp:hiw';
    const key = isStudy ? meta.cmsKey.replace('Study', '') : meta.cmsKey;

    return {
      id: meta.id,
      label: meta.label,
      Icon: meta.Icon,
      title: cms[`${prefix}${key}Title`] || def.title,
      details: cms[`${prefix}${key}Details`] || def.details,
      cta: def.cta,
      Visual: meta.Visual,
    };
  });
}

const AUTO_TAB_MS = 4000;
const PROGRESS_RADIUS = 20;
const PROGRESS_CIRC = 2 * Math.PI * PROGRESS_RADIUS;

function TabBar({
  tabs,
  activeId,
  progress,
  onSelect,
  onPrev,
  onNext,
}: {
  tabs: TabDef[];
  activeId: string;
  progress: number;
  onSelect: (id: string) => void;
  onPrev: () => void;
  onNext: () => void;
}) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const progressOffset = PROGRESS_CIRC * (1 - progress);

  return (
    <div className="placedly-hiw-tabbar">
      <button
        type="button"
        className="placedly-hiw-tabbar-arrow"
        aria-label="Previous tab"
        onClick={onPrev}
      >
        <ChevronLeft size={20} strokeWidth={2} />
      </button>

      <div className="placedly-hiw-tabbar-shell">
        <div
          className="placedly-hiw-tabbar-track"
          ref={scrollRef}
          role="tablist"
          aria-label="How Placedly works"
        >
          {tabs.map((tab) => {
            const active = tab.id === activeId;
            return (
              <button
                key={tab.id}
                type="button"
                role="tab"
                aria-selected={active}
                className={`placedly-hiw-tab ${active ? 'is-active' : ''}`}
                onClick={() => onSelect(tab.id)}
              >
                <tab.Icon size={16} strokeWidth={2} aria-hidden />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      <button
        type="button"
        className="placedly-hiw-tabbar-arrow placedly-hiw-tabbar-arrow--next"
        aria-label="Next tab"
        onClick={onNext}
      >
        <svg
          className="placedly-hiw-tabbar-progress"
          viewBox="0 0 48 48"
          aria-hidden
        >
          <circle
            className="placedly-hiw-tabbar-progress-bg"
            cx="24"
            cy="24"
            r={PROGRESS_RADIUS}
          />
          <circle
            className="placedly-hiw-tabbar-progress-fill"
            cx="24"
            cy="24"
            r={PROGRESS_RADIUS}
            strokeDasharray={PROGRESS_CIRC}
            strokeDashoffset={progressOffset}
          />
        </svg>
        <ChevronRight size={20} strokeWidth={2} />
      </button>
    </div>
  );
}

function TabPanel({ tab }: { tab: TabDef }) {
  return (
    <motion.div
      className="placedly-hiw-panel-inner"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -6 }}
      transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="placedly-hiw-panel-visual">
        <tab.Visual />
      </div>
      <div className="placedly-hiw-panel-copy">
        <h3 className="placedly-hiw-panel-title">{tab.title}</h3>
        <p className="placedly-hiw-panel-desc">{tab.details}</p>
        {tab.cta && (
          <Link href={tab.cta.href} className="placedly-hiw-step-cta">
            {tab.cta.label}
          </Link>
        )}
      </div>
    </motion.div>
  );
}

export default function HowItWorks({ cms = {} }: { cms?: Cms }) {
  const tabs = useMemo(() => buildTabs(cms), [cms]);
  const [activeId, setActiveId] = useState(tabs[0]?.id ?? 'consult');
  const [progress, setProgress] = useState(0);
  const activeTab = tabs.find((t) => t.id === activeId) ?? tabs[0];

  const goToIndex = useCallback(
    (index: number) => {
      if (!tabs.length) return;
      const next = tabs[((index % tabs.length) + tabs.length) % tabs.length];
      setActiveId(next.id);
      setProgress(0);
    },
    [tabs],
  );

  const goNext = useCallback(() => {
    const idx = tabs.findIndex((t) => t.id === activeId);
    goToIndex(idx + 1);
  }, [activeId, goToIndex, tabs]);

  const goPrev = useCallback(() => {
    const idx = tabs.findIndex((t) => t.id === activeId);
    goToIndex(idx - 1);
  }, [activeId, goToIndex, tabs]);

  const handleSelect = useCallback(
    (id: string) => {
      setActiveId(id);
      setProgress(0);
    },
    [],
  );

  useEffect(() => {
    if (!tabs.length) return;

    setProgress(0);
    const started = performance.now();
    let raf = 0;

    const tick = (now: number) => {
      const elapsed = now - started;
      const p = Math.min(elapsed / AUTO_TAB_MS, 1);
      setProgress(p);

      if (p >= 1) {
        const idx = tabs.findIndex((t) => t.id === activeId);
        goToIndex(idx + 1);
        return;
      }

      raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [activeId, goToIndex, tabs]);

  const title =
    cms['hp:hiwTitle'] ?? 'How Placedly Works — Simple, Transparent, Proven';
  const subtitle =
    cms['hp:hiwSubtitle'] ??
    'Placedly connects ambitious professionals to careers and global education. Built for candidates who want clarity, warm guidance, and results — not generic agency noise.';

  return (
    <section className="placedly-hiw-section" id="how">
      <div className="placedly-hiw-container">
        <FadeUp className="placedly-hiw-header">
          <h2 className="placedly-hiw-title">{title}</h2>
          <p className="placedly-hiw-subtitle">{subtitle}</p>
        </FadeUp>

        <div className="placedly-hiw-showcase">
          <TabBar
            tabs={tabs}
            activeId={activeId}
            progress={progress}
            onSelect={handleSelect}
            onPrev={goPrev}
            onNext={goNext}
          />

          <div className="placedly-hiw-panel">
            <AnimatePresence mode="wait">
              {activeTab && <TabPanel key={activeTab.id} tab={activeTab} />}
            </AnimatePresence>
            <div className="placedly-hiw-panel-footer">
              <SeeDemoButton variant="panel" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
