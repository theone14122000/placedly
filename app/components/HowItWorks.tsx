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
  type LucideIcon,
} from 'lucide-react';
import { FadeUp } from './motion';
import SeeDemoButton from './SeeDemoButton';

type Cms = Record<string, string>;
type Accent = { from: string; to: string; soft: string; border: string };

type TabDef = {
  id: string;
  label: string;
  Icon: LucideIcon;
  title: string;
  details: string;
  cta?: { label: string; href: string };
  Visual: () => React.ReactNode;
  accent: Accent;
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

function makeAccent(from: string, to: string, soft: string): Accent {
  return { from, to, soft, border: `${from}30` };
}

const ACCENTS: Record<string, Accent> = {
  consult: makeAccent('#6366f1', '#8b5cf6', 'rgba(99,102,241,0.10)'),
  prep:    makeAccent('#3b82f6', '#06b6d4', 'rgba(59,130,246,0.10)'),
  offer:   makeAccent('#10b981', '#22c55e', 'rgba(16,185,129,0.10)'),
  counsel: makeAccent('#f97316', '#fbbf24', 'rgba(249,115,22,0.10)'),
  apply:   makeAccent('#ec4899', '#f43f5e', 'rgba(236,72,153,0.10)'),
  visa:    makeAccent('#0ea5e9', '#14b8a6', 'rgba(14,165,233,0.10)'),
};

/* ─── Visuals (unchanged) ─── */
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

const TAB_META = [
  { id: 'consult', label: 'Free Session',   Icon: Users,         cmsKey: '1',      defaultIndex: 0, defaults: CAREER_DEFAULTS, Visual: VisualCareer1 },
  { id: 'prep',    label: 'Interview Prep', Icon: FileText,      cmsKey: '3',      defaultIndex: 1, defaults: CAREER_DEFAULTS, Visual: VisualCareer2 },
  { id: 'offer',   label: 'Offer & Fee',    Icon: BadgeCheck,    cmsKey: '5',      defaultIndex: 2, defaults: CAREER_DEFAULTS, Visual: VisualCareer3 },
  { id: 'counsel', label: 'Counselling',    Icon: GraduationCap, cmsKey: 'Study1', defaultIndex: 0, defaults: STUDY_DEFAULTS,  Visual: VisualStudy1  },
  { id: 'apply',   label: 'Applications',   Icon: Send,          cmsKey: 'Study2', defaultIndex: 1, defaults: STUDY_DEFAULTS,  Visual: VisualStudy2  },
  { id: 'visa',    label: 'Visa Support',   Icon: Plane,         cmsKey: 'Study3', defaultIndex: 2, defaults: STUDY_DEFAULTS,  Visual: VisualStudy3  },
] as const;

function buildTabs(cms: Cms): TabDef[] {
  return TAB_META.map((meta) => {
    const def     = meta.defaults[meta.defaultIndex];
    const isStudy = meta.cmsKey.startsWith('Study');
    const prefix  = isStudy ? 'hp:hiwStudy' : 'hp:hiw';
    const key     = isStudy ? meta.cmsKey.replace('Study', '') : meta.cmsKey;
    return {
      id:      meta.id,
      label:   meta.label,
      Icon:    meta.Icon,
      title:   cms[`${prefix}${key}Title`]   || def.title,
      details: cms[`${prefix}${key}Details`] || def.details,
      cta:     def.cta,
      Visual:  meta.Visual,
      accent:  ACCENTS[meta.id] ?? ACCENTS.consult,
    };
  });
}

/* ─── How long each tab stays visible ─── */
const INTERVAL_MS = 2200;

/* ════════════════════════════════════════
   Tab Bar
════════════════════════════════════════ */
function TabBar({
  tabs,
  activeId,
  onSelect,
  tickKey,          // bumped every interval → remounts progress bar
}: {
  tabs: TabDef[];
  activeId: string;
  onSelect: (id: string) => void;
  tickKey: number;
}) {
  const activeIndex  = Math.max(0, tabs.findIndex((t) => t.id === activeId));
  const trackRef     = useRef<HTMLDivElement>(null);
  const activeBtnRef = useRef<HTMLButtonElement>(null);

  /* keep active tab scrolled into view (mobile) */
  useEffect(() => {
    const track = trackRef.current;
    const btn   = activeBtnRef.current;
    if (!track || !btn) return;
    track.scrollTo({
      left: btn.offsetLeft - (track.clientWidth - btn.clientWidth) / 2,
      behavior: 'smooth',
    });
  }, [activeIndex]);

  return (
    <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '28px' }}>
      <div
        ref={trackRef}
        role="tablist"
        aria-label="How Placedly works"
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '4px',
          padding: '5px',
          borderRadius: '999px',
          background: 'rgba(15,23,42,0.05)',
          border: '1px solid rgba(15,23,42,0.08)',
          overflowX: 'auto',
          scrollbarWidth: 'none',
          maxWidth: '100%',
        }}
      >
        {tabs.map((tab) => {
          const active = tab.id === activeId;
          return (
            <button
              key={tab.id}
              type="button"
              role="tab"
              aria-selected={active}
              ref={active ? activeBtnRef : undefined}
              onClick={() => onSelect(tab.id)}
              style={{
                position: 'relative',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                padding: '8px 16px',
                borderRadius: '999px',
                border: 'none',
                cursor: 'pointer',
                fontSize: '13px',
                fontWeight: active ? 700 : 500,
                whiteSpace: 'nowrap',
                background: active ? '#ffffff' : 'transparent',
                color: active ? tab.accent.from : 'rgba(15,23,42,0.50)',
                boxShadow: active
                  ? `0 2px 12px rgba(0,0,0,0.08), 0 0 0 1px ${tab.accent.border}`
                  : 'none',
                transition: 'background 0.3s, color 0.3s, box-shadow 0.3s',
                overflow: 'hidden',
              }}
            >
              <tab.Icon
                size={14}
                strokeWidth={2.2}
                aria-hidden
                style={{
                  color: active ? tab.accent.from : 'rgba(15,23,42,0.35)',
                  transition: 'color 0.3s',
                  flexShrink: 0,
                }}
              />

              {/* gradient label when active */}
              <span
                style={
                  active
                    ? {
                        backgroundImage: `linear-gradient(135deg, ${tab.accent.from}, ${tab.accent.to})`,
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        backgroundClip: 'text',
                      }
                    : undefined
                }
              >
                {tab.label}
              </span>

              {/* ── progress bar — only on active tab, key forces remount each tick ── */}
              {active && (
                <motion.span
                  key={`${tab.id}-${tickKey}`}
                  aria-hidden
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: INTERVAL_MS / 1000, ease: 'linear' }}
                  style={{
                    position: 'absolute',
                    left: 0,
                    right: 0,
                    bottom: 0,
                    height: '3px',
                    transformOrigin: 'left',
                    borderRadius: '0 0 999px 999px',
                    background: `linear-gradient(90deg, ${tab.accent.from}, ${tab.accent.to})`,
                    opacity: 0.6,
                  }}
                />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}

/* ════════════════════════════════════════
   Tab Panel
════════════════════════════════════════ */
function TabPanel({ tab }: { tab: TabDef }) {
  return (
    <motion.div
      className="placedly-hiw-panel-inner"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -6 }}
      transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
      style={{ position: 'relative' }}
    >
      {/* soft glow behind the panel */}
      <div
        aria-hidden
        style={{
          position: 'absolute',
          inset: '-30px',
          background: `radial-gradient(circle at 25% 20%, ${tab.accent.from}22, transparent 60%)`,
          filter: 'blur(50px)',
          zIndex: 0,
          pointerEvents: 'none',
        }}
      />

      <div className="placedly-hiw-panel-visual" style={{ position: 'relative', zIndex: 1 }}>
        <tab.Visual />
      </div>

      <div className="placedly-hiw-panel-copy" style={{ position: 'relative', zIndex: 1 }}>
        <h3
          className="placedly-hiw-panel-title"
          style={{ position: 'relative', paddingLeft: '16px' }}
        >
          <span
            aria-hidden
            style={{
              position: 'absolute',
              left: 0,
              top: '4px',
              bottom: '4px',
              width: '4px',
              borderRadius: '4px',
              background: `linear-gradient(180deg, ${tab.accent.from}, ${tab.accent.to})`,
            }}
          />
          {tab.title}
        </h3>

        <p className="placedly-hiw-panel-desc">{tab.details}</p>

        {tab.cta && (
          <Link
            href={tab.cta.href}
            className="placedly-hiw-step-cta"
            style={{
              background: `linear-gradient(135deg, ${tab.accent.from}, ${tab.accent.to})`,
              boxShadow: `0 10px 26px ${tab.accent.soft}`,
              borderColor: 'transparent',
              color: '#fff',
            }}
          >
            {tab.cta.label}
          </Link>
        )}
      </div>
    </motion.div>
  );
}

/* ════════════════════════════════════════
   Section
════════════════════════════════════════ */
export default function HowItWorks({ cms = {} }: { cms?: Cms }) {
  const tabs = useMemo(() => buildTabs(cms), [cms]);

  /*
   * activeIndex — drives both the visible tab AND the interval.
   * We store an index (not id) so the interval arithmetic is trivial.
   */
  const [activeIndex, setActiveIndex] = useState(0);
  const [tickKey, setTickKey]         = useState(0);   // incremented every advance
  const intervalRef                   = useRef<ReturnType<typeof setInterval> | null>(null);

  const activeTab = tabs[activeIndex] ?? tabs[0];

  /* ── start / restart the interval ── */
  const startInterval = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % tabs.length);
      setTickKey((k) => k + 1);           // remount progress bar
    }, INTERVAL_MS);
  };

  /* mount → start; unmount → clear */
  useEffect(() => {
    startInterval();
    return () => { if (intervalRef.current) clearInterval(intervalRef.current); };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tabs.length]);

  /* manual tab click — jump to that tab, reset the interval from scratch */
  const handleSelect = (id: string) => {
    const idx = tabs.findIndex((t) => t.id === id);
    if (idx === -1) return;
    setActiveIndex(idx);
    setTickKey((k) => k + 1);
    startInterval();                       // restart so it counts from NOW
  };

  const title =
    cms['hp:hiwTitle'] ?? 'How Placedly Works — Simple, Transparent, Proven';
  const subtitle =
    cms['hp:hiwSubtitle'] ??
    'Placedly connects ambitious professionals to careers and global education. Built for candidates who want clarity, warm guidance, and results — not generic agency noise.';

  return (
    <section
      className="placedly-hiw-section"
      id="how"
      style={
        {
          '--hiw-accent-from':   activeTab.accent.from,
          '--hiw-accent-to':     activeTab.accent.to,
          '--hiw-accent-soft':   activeTab.accent.soft,
          '--hiw-accent-border': activeTab.accent.border,
        } as React.CSSProperties
      }
    >
      <div className="placedly-hiw-container">
        <FadeUp className="placedly-hiw-header">
          <h2 className="placedly-hiw-title">{title}</h2>
          <p className="placedly-hiw-subtitle">{subtitle}</p>
        </FadeUp>

        <div className="placedly-hiw-showcase">
          <TabBar
            tabs={tabs}
            activeId={activeTab.id}
            onSelect={handleSelect}
            tickKey={tickKey}
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

      <style>{`
        [role="tablist"]::-webkit-scrollbar { display: none; }

        .placedly-hiw-mock-tag {
          background: var(--hiw-accent-soft) !important;
          color: var(--hiw-accent-from) !important;
          border-color: var(--hiw-accent-border) !important;
          transition: background 0.4s, color 0.4s, border-color 0.4s;
        }
        .placedly-hiw-mock-spark  { color: var(--hiw-accent-from) !important; transition: color 0.4s; }
        .placedly-hiw-mock-arrow  { color: var(--hiw-accent-from) !important; transition: color 0.4s; }
        .placedly-hiw-mock-card--cta {
          background: var(--hiw-accent-soft) !important;
          border-color: var(--hiw-accent-border) !important;
          transition: background 0.4s, border-color 0.4s;
        }
        .placedly-hiw-mock-chip {
          background: var(--hiw-accent-soft) !important;
          color: var(--hiw-accent-from) !important;
          transition: background 0.4s, color 0.4s;
        }
        .placedly-hiw-mock-offer  { color: var(--hiw-accent-from) !important; transition: color 0.4s; }
        .placedly-hiw-mock-bubble {
          background: var(--hiw-accent-soft) !important;
          color: var(--hiw-accent-from) !important;
          border-color: var(--hiw-accent-border) !important;
          transition: background 0.4s, color 0.4s, border-color 0.4s;
        }
      `}</style>
    </section>
  );
}