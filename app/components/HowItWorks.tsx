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

type HiwCSSVars = React.CSSProperties & {
  '--hiw-accent-from'?: string;
  '--hiw-accent-to'?: string;
  '--hiw-accent-soft'?: string;
  '--hiw-accent-border'?: string;
};

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

/* Modern geometric sans-serif stack */
const GEOM_FONT_STACK = `"Inter", "Manrope", "Geist", "Plus Jakarta Sans", -apple-system, BlinkMacSystemFont, "Segoe UI", system-ui, sans-serif`;

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
      cta:     'cta' in def ? def.cta : undefined,
      Visual:  meta.Visual,
      accent:  ACCENTS[meta.id] ?? ACCENTS.consult,
    };
  });
}

const INTERVAL_MS = 2200;

function TabBar({
  tabs, activeId, onSelect, tickKey,
}: {
  tabs: TabDef[];
  activeId: string;
  onSelect: (id: string) => void;
  tickKey: number;
}) {
  return (
    <>
      <div className="hiw-tabbar-desktop">
        <div role="tablist" aria-label="How Placedly works" className="hiw-tabbar-strip">
          {tabs.map((tab) => (
            <TabButton key={tab.id} tab={tab} active={tab.id === activeId}
              tickKey={tickKey} onSelect={onSelect} />
          ))}
        </div>
      </div>

      <div className="hiw-tabbar-mobile" role="tablist" aria-label="How Placedly works">
        {tabs.map((tab) => (
          <TabButton key={tab.id} tab={tab} active={tab.id === activeId}
            tickKey={tickKey} onSelect={onSelect} mobile />
        ))}
      </div>
    </>
  );
}

function TabButton({
  tab, active, tickKey, onSelect, mobile = false,
}: {
  tab: TabDef; active: boolean; tickKey: number;
  onSelect: (id: string) => void; mobile?: boolean;
}) {
  return (
    <button
      type="button"
      role="tab"
      aria-selected={active}
      onClick={() => onSelect(tab.id)}
      className={`placedly-hiw-tab${mobile ? ' placedly-hiw-tab--mobile' : ''}${active ? ' is-active' : ''}`}
      style={{
        color: active ? tab.accent.from : 'rgba(15,23,42,0.50)',
        boxShadow: active
          ? `0 2px 12px rgba(0,0,0,0.08), 0 0 0 1px ${tab.accent.border}`
          : 'none',
      }}
    >
      <tab.Icon
        size={mobile ? 16 : 14}
        strokeWidth={2.2}
        aria-hidden
        className="placedly-hiw-tab-icon"
        style={{ color: active ? tab.accent.from : 'rgba(15,23,42,0.35)' }}
      />
      <span
        className="placedly-hiw-tab-label"
        style={active ? { color: tab.accent.from } : undefined}
      >
        {tab.label}
      </span>

      {active && (
        <motion.span
          key={`${tab.id}-${tickKey}`}
          aria-hidden
          className="placedly-hiw-tab-progress"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: INTERVAL_MS / 1000, ease: 'linear' }}
          style={{ background: tab.accent.from }}
        />
      )}
    </button>
  );
}

/* ════════════════════════════════════════
   Tab Panel
════════════════════════════════════════ */
function TabPanel({ tab }: { tab: TabDef }) {
  return (
    <div className="placedly-hiw-panel-inner">
      <div
        aria-hidden
        className="placedly-hiw-panel-glow"
        style={{ background: `radial-gradient(circle at 25% 20%,${tab.accent.from}22,transparent 60%)` }}
      />

      <motion.div
        className="placedly-hiw-panel-visual"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -6 }}
        transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
      >
        <tab.Visual />
      </motion.div>

      <motion.div
        className="placedly-hiw-panel-copy"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -6 }}
        transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1], delay: 0.05 }}
      >
        <h3 className="placedly-hiw-panel-title">
          <span
            aria-hidden
            className="placedly-hiw-panel-accent-bar"
            style={{ background: tab.accent.from }}
          />
          <span style={{ color: '#0f172a' }}>{tab.title}</span>
        </h3>

        <p className="placedly-hiw-panel-desc">{tab.details}</p>

        {tab.cta && (
          <Link
            href={tab.cta.href}
            className="placedly-hiw-step-cta"
            style={{
              background: tab.accent.from,
              boxShadow: `0 8px 20px ${tab.accent.soft}`,
            }}
          >
            {tab.cta.label}
          </Link>
        )}
      </motion.div>
    </div>
  );
}

export default function HowItWorks({ cms = {} }: { cms?: Cms }) {
  const tabs = useMemo(() => buildTabs(cms), [cms]);

  const [activeIndex, setActiveIndex] = useState(0);
  const [tickKey, setTickKey]         = useState(0);
  const intervalRef                   = useRef<ReturnType<typeof setInterval> | null>(null);

  const activeTab = tabs[activeIndex] ?? tabs[0];

  const startInterval = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % tabs.length);
      setTickKey((k) => k + 1);
    }, INTERVAL_MS);
  };

  useEffect(() => {
    startInterval();
    return () => { if (intervalRef.current) clearInterval(intervalRef.current); };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tabs.length]);

  const handleSelect = (id: string) => {
    const idx = tabs.findIndex((t) => t.id === id);
    if (idx === -1) return;
    setActiveIndex(idx);
    setTickKey((k) => k + 1);
    startInterval();
  };

  const title =
    cms['hp:hiwTitle'] ?? 'How Placedly Works — Simple, Transparent, Proven';
  const subtitle =
    cms['hp:hiwSubtitle'] ??
    'Placedly connects ambitious professionals to careers and global education. Built for candidates who want clarity, warm guidance, and results — not generic agency noise.';

  const sectionVars: HiwCSSVars = {
    '--hiw-accent-from':   activeTab.accent.from,
    '--hiw-accent-to':     activeTab.accent.to,
    '--hiw-accent-soft':   activeTab.accent.soft,
    '--hiw-accent-border': activeTab.accent.border,
  };

  return (
    <section
      className="placedly-hiw-section"
      id="how"
      style={sectionVars}
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
        /* ============================================================
           FONT — Modern Geometric Sans-Serif
           ============================================================ */
        .placedly-hiw-section,
        .placedly-hiw-section * {
          font-family: ${GEOM_FONT_STACK};
          font-feature-settings: "ss01", "cv11", "cv02";
          font-optical-sizing: auto;
          letter-spacing: -0.011em;
        }

        /* ============================================================
           SECTION
           ============================================================ */
        .placedly-hiw-section {
          position: relative;
          width: 100%;
          padding: clamp(72px, 9vw, 130px) clamp(16px, 5vw, 24px);
          background: #f8fafc;
        }

        .placedly-hiw-container {
          position: relative;
          max-width: 1200px;
          margin: 0 auto;
        }

        /* ============================================================
           HEADER
           ============================================================ */
        .placedly-hiw-header {
          text-align: center;
          max-width: 760px;
          margin: 0 auto 48px;
        }

        .placedly-hiw-title {
          font-size: clamp(28px, 3.6vw, 44px);
          font-weight: 700;
          line-height: 1.12;
          letter-spacing: -0.025em;
          color: #0f172a;
          margin: 0 0 14px;
        }

        .placedly-hiw-subtitle {
          font-size: clamp(15px, 1.2vw, 17px);
          line-height: 1.6;
          color: #475569;
          margin: 0;
          font-weight: 400;
        }

        /* ============================================================
           SHOWCASE / PANEL
           ============================================================ */
        .placedly-hiw-showcase {
          width: 100%;
        }

        .placedly-hiw-panel {
          position: relative;
          background: #ffffff;
          border: 1px solid rgba(15, 23, 42, 0.06);
          border-radius: 24px;
          padding: clamp(20px, 3vw, 40px);
          box-shadow: 0 18px 50px rgba(15, 23, 42, 0.06);
        }

        .placedly-hiw-panel-footer {
          display: flex;
          justify-content: center;
          margin-top: 24px;
          padding-top: 20px;
          border-top: 1px solid rgba(15, 23, 42, 0.05);
        }

        .placedly-hiw-panel-glow {
          position: absolute;
          inset: -30px;
          z-index: 0;
          pointer-events: none;
          filter: blur(50px);
        }

        /* ============================================================
           TAB BAR
           ============================================================ */
        .hiw-tabbar-desktop {
          display: flex !important;
          justify-content: center;
          margin-bottom: 28px;
        }
        .hiw-tabbar-mobile {
          display: none !important;
          margin-bottom: 20px;
        }

        .hiw-tabbar-strip {
          display: inline-flex;
          align-items: center;
          gap: 4px;
          padding: 5px;
          border-radius: 999px;
          background: rgba(15, 23, 42, 0.05);
          border: 1px solid rgba(15, 23, 42, 0.08);
        }

        .placedly-hiw-tab {
          position: relative;
          display: flex;
          align-items: center;
          justify-content: flex-start;
          gap: 6px;
          padding: 8px 16px;
          border-radius: 999px;
          border: none;
          cursor: pointer;
          font-size: 13px;
          font-weight: 600;
          white-space: nowrap;
          text-align: center;
          background: transparent;
          transition: background 0.3s, color 0.3s, box-shadow 0.3s;
          overflow: hidden;
          font-family: inherit;
        }

        .placedly-hiw-tab--mobile {
          flex-direction: column;
          justify-content: center;
          gap: 4px;
          padding: 10px 6px;
          border-radius: 14px;
          font-size: 11px;
          width: 100%;
        }

        .placedly-hiw-tab.is-active {
          background: #ffffff;
        }

        .placedly-hiw-tab-icon {
          flex-shrink: 0;
          transition: color 0.3s;
        }

        .placedly-hiw-tab-label {
          line-height: 1.2;
          transition: color 0.3s;
        }

        .placedly-hiw-tab-progress {
          position: absolute;
          left: 0;
          right: 0;
          bottom: 0;
          height: 3px;
          transform-origin: left;
          border-radius: 0 0 999px 999px;
          opacity: 0.6;
        }

        /* ============================================================
           PANEL INNER LAYOUT
           ============================================================ */
        div.placedly-hiw-panel-inner {
          display: grid !important;
          grid-template-columns: 1fr 1fr !important;
          grid-template-areas: "visual copy" !important;
          align-items: center !important;
          gap: 48px !important;
          position: relative !important;
        }
        div.placedly-hiw-panel-inner > .placedly-hiw-panel-visual {
          grid-area: visual !important;
          min-width: 0 !important;
          width: 100% !important;
          position: relative;
          z-index: 1;
        }
        div.placedly-hiw-panel-inner > .placedly-hiw-panel-copy {
          grid-area: copy !important;
          min-width: 0 !important;
          width: 100% !important;
          position: relative;
          z-index: 1;
        }

        /* ============================================================
           COPY
           ============================================================ */
        .placedly-hiw-panel-title {
          position: relative;
          padding-left: 16px;
          font-size: clamp(1.4rem, 2.2vw, 1.9rem);
          font-weight: 700;
          line-height: 1.2;
          letter-spacing: -0.02em;
          color: #0f172a;
          margin: 0 0 14px;
        }

        .placedly-hiw-panel-accent-bar {
          position: absolute;
          left: 0;
          top: 4px;
          bottom: 4px;
          width: 4px;
          border-radius: 4px;
        }

        .placedly-hiw-panel-desc {
          font-size: 15px;
          line-height: 1.7;
          color: #475569;
          margin: 0 0 22px;
        }

        .placedly-hiw-step-cta {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 12px 22px;
          color: #ffffff;
          border: none;
          border-radius: 999px;
          font-weight: 600;
          font-size: 14.5px;
          text-decoration: none;
          transition: transform 0.25s ease, filter 0.25s ease;
        }
        .placedly-hiw-step-cta:hover {
          transform: translateY(-2px);
          filter: brightness(1.08);
        }

        /* ============================================================
           VISUALS
           ============================================================ */
        .placedly-hiw-visual {
          position: relative;
          width: 100%;
          min-height: 360px;
          border-radius: 20px;
          padding: 24px;
          overflow: hidden;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .placedly-hiw-visual--warm   { background: linear-gradient(135deg, #fef3e8 0%, #ffe2c4 100%); }
        .placedly-hiw-visual--sunset { background: linear-gradient(135deg, #fce8f3 0%, #ffe1d4 100%); }
        .placedly-hiw-visual--peach  { background: linear-gradient(135deg, #e0fbe8 0%, #d6f4f0 100%); }

        .placedly-hiw-mock {
          width: 100%;
          max-width: 360px;
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .placedly-hiw-mock-card {
          background: #ffffff;
          border-radius: 14px;
          padding: 14px;
          box-shadow: 0 6px 20px rgba(15, 23, 42, 0.06);
          border: 1px solid rgba(15, 23, 42, 0.04);
        }

        .placedly-hiw-mock-card--center { text-align: center; }
        .placedly-hiw-mock-card--hero   { background: #ffffff; }
        .placedly-hiw-mock-card--cta    { display: flex; align-items: center; gap: 10px; }

        .placedly-hiw-mock-label {
          font-size: 11.5px;
          font-weight: 600;
          color: #64748b;
          margin: 0 0 10px;
          text-transform: uppercase;
          letter-spacing: 0.08em;
        }

        .placedly-hiw-tags {
          display: flex;
          flex-wrap: wrap;
          gap: 6px;
        }

        .placedly-hiw-tag {
          font-size: 12px;
          font-weight: 600;
          padding: 5px 10px;
          border-radius: 999px;
          background: rgba(15, 23, 42, 0.06);
          color: #334155;
        }
        .placedly-hiw-tag--study { background: rgba(249, 115, 22, 0.10); color: #c2410c; }

        .placedly-hiw-mock-list {
          list-style: none;
          margin: 0;
          padding: 0;
          display: flex;
          flex-direction: column;
          gap: 8px;
          font-size: 13px;
          color: #334155;
          font-weight: 500;
        }

        .placedly-hiw-mock-dot {
          display: inline-block;
          width: 8px;
          height: 8px;
          border-radius: 50%;
          margin-right: 8px;
          vertical-align: middle;
        }
        .placedly-hiw-mock-dot--exl   { background: #6366f1; }
        .placedly-hiw-mock-dot--optum { background: #10b981; }
        .placedly-hiw-mock-dot--wns   { background: #f97316; }
        .placedly-hiw-mock-dot--uk    { background: #3b82f6; }
        .placedly-hiw-mock-dot--fr    { background: #ec4899; }
        .placedly-hiw-mock-dot--de    { background: #0ea5e9; }

        .placedly-hiw-mock-row { display: flex; align-items: center; gap: 12px; }

        .placedly-hiw-mock-avatar {
          display: inline-block;
          width: 28px;
          height: 28px;
          border-radius: 50%;
          background: #e2e8f0;
          flex-shrink: 0;
        }
        .placedly-hiw-mock-avatar--md   { width: 40px; height: 40px; background: #6366f1; }
        .placedly-hiw-mock-avatar--sm   { width: 26px; height: 26px; background: #0f172a; color: #fff; font-size: 11px; font-weight: 700; display: inline-flex; align-items: center; justify-content: center; }
        .placedly-hiw-mock-avatar--lg   { width: 64px; height: 64px; background: #ec4899; margin: 0 auto 8px; }
        .placedly-hiw-mock-avatar--study { background: #f97316; }

        .placedly-hiw-mock-meta { font-size: 12px; color: #64748b; font-weight: 500; }

        .placedly-hiw-mock-sub  { font-size: 11.5px; color: #64748b; margin: 0 0 2px; font-weight: 500; }
        .placedly-hiw-mock-title { font-size: 15px; font-weight: 700; color: #0f172a; margin: 0 0 2px; }
        .placedly-hiw-mock-co   { font-size: 12px; color: #64748b; margin: 0; }
        .placedly-hiw-mock-name { font-size: 15px; font-weight: 700; color: #0f172a; margin: 4px 0 0; }
        .placedly-hiw-mock-role { font-size: 12px; color: #64748b; margin: 0 0 8px; }

        .placedly-hiw-mock-spark { font-size: 16px; color: var(--hiw-accent-from); }
        .placedly-hiw-mock-arrow { margin-left: auto; color: var(--hiw-accent-from); font-weight: 700; }

        .placedly-hiw-mock-cta-title { font-size: 13px; font-weight: 700; color: #0f172a; margin: 0; }
        .placedly-hiw-mock-cta-sub   { font-size: 11.5px; color: #64748b; margin: 2px 0 0; }

        .placedly-hiw-mock-chip {
          display: inline-block;
          font-size: 11px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.08em;
          padding: 4px 10px;
          border-radius: 999px;
          background: rgba(16, 185, 129, 0.12);
          color: #047857;
          margin: 0 0 8px;
        }

        .placedly-hiw-mock-offer {
          font-size: 20px;
          font-weight: 800;
          color: #047857;
          margin: 0 0 12px;
          letter-spacing: -0.02em;
        }

        .placedly-hiw-mock-avatars { display: flex; justify-content: center; gap: -8px; margin-bottom: 10px; }
        .placedly-hiw-mock-avatars > * + * { margin-left: -8px; }

        .placedly-hiw-mock-bubble {
          font-size: 12.5px;
          color: #6366f1;
          background: rgba(99, 102, 241, 0.10);
          border: 1px solid rgba(99, 102, 241, 0.20);
          padding: 8px 12px;
          border-radius: 12px;
          margin: 8px 0;
        }
        .placedly-hiw-mock-bubble--purple { color: #0e7490; background: rgba(14, 165, 233, 0.10); border-color: rgba(14, 165, 233, 0.20); }

        .placedly-hiw-mock-thanks { font-size: 12px; color: #64748b; margin: 6px 0 0; }

        /* ============================================================
           MOBILE
           ============================================================ */
        @media (max-width: 900px) {
          .placedly-hiw-panel-inner { gap: 32px !important; }
        }
        @media (max-width: 639px) {
          .hiw-tabbar-desktop { display: none !important; }
          .hiw-tabbar-mobile  {
            display: grid !important;
            grid-template-columns: repeat(3, 1fr);
            gap: 8px;
            padding: 6px;
            border-radius: 20px;
            background: rgba(15, 23, 42, 0.05);
            border: 1px solid rgba(15, 23, 42, 0.08);
          }

          div.placedly-hiw-panel-inner {
            grid-template-columns: 1fr !important;
            grid-template-areas:
              "visual"
              "copy" !important;
            gap: 20px !important;
          }

          div.placedly-hiw-panel-inner > .placedly-hiw-panel-visual {
            border-radius: 18px;
            overflow: hidden;
            box-shadow: 0 4px 24px rgba(0,0,0,0.07);
          }
          .placedly-hiw-panel-visual .placedly-hiw-visual {
            border-radius: 18px !important;
            min-height: 220px;
            height: auto !important;
          }

          .placedly-hiw-panel { padding: 18px !important; border-radius: 20px; }
          .placedly-hiw-section { padding: 48px 16px !important; }
          .placedly-hiw-header { margin-bottom: 32px; }
          .placedly-hiw-title { font-size: clamp(1.5rem, 5vw, 2rem) !important; }
          .placedly-hiw-subtitle { font-size: 14px !important; }

          .placedly-hiw-panel-title {
            font-size: 1.15rem !important;
            line-height: 1.3 !important;
            margin-bottom: 10px !important;
          }
          .placedly-hiw-panel-desc {
            font-size: 13.5px !important;
            line-height: 1.65 !important;
            margin-bottom: 18px !important;
          }
          .placedly-hiw-step-cta {
            width: 100%;
            justify-content: center;
            text-align: center;
          }
          .placedly-hiw-panel-footer { margin-top: 16px; padding-top: 16px; }
        }
      `}</style>
    </section>
  );
}