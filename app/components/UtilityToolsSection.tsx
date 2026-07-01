'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import {
  Calculator,
  FileSearch,
  FileText,
  GraduationCap,
  MessageSquare,
  PenLine,
  Rocket,
  Search,
  Sparkles,
  Target,
  X,
  ChevronDown,
  type LucideIcon,
} from 'lucide-react';

type Category = 'career' | 'study';

type Tool = {
  id: string;
  title: string;
  description: string;
  Icon: LucideIcon;
  placeholder: string;
  cta: string;
  sampleResult: string;
  category: Category;
  popular?: boolean;
};

type Accent = { from: string; to: string; soft: string };

/* ---------- shared heading gradient (blue → indigo → orange → rose → purple → blue) ---------- */

const HEADING_GRADIENT =
  'linear-gradient(270deg, #2563eb 0%, #4f46e5 20%, #f97316 45%, #f43f5e 65%, #9333ea 85%, #2563eb 100%)';

const headingGradientStyle: React.CSSProperties = {
  backgroundImage: HEADING_GRADIENT,
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  backgroundClip: 'text',
  color: 'transparent',
};

const CATEGORY_META: Record<Category | 'all', { label: string } & Accent> = {
  all: { label: 'All Tools', from: '#6366f1', to: '#8b5cf6', soft: 'rgba(99,102,241,0.12)' },
  career: { label: 'Career & Resume', from: '#6366f1', to: '#8b5cf6', soft: 'rgba(99,102,241,0.12)' },
  study: { label: 'Study Abroad', from: '#3b82f6', to: '#06b6d4', soft: 'rgba(59,130,246,0.12)' },
};

const TOOLS: Tool[] = [
  {
    id: 'ats',
    title: 'ATS Resume Score Checker',
    description: 'Instant AI scan for keyword match, formatting, and ATS readability.',
    Icon: FileSearch,
    placeholder: 'Paste your resume text or upload a summary…',
    cta: 'Check ATS Score',
    sampleResult:
      'ATS Score: 82/100 — Strong keyword alignment for Claims Analyst roles. Improve metrics in experience bullets and add a skills block for ICD-10 / CPT.',
    category: 'career',
    popular: true,
  },
  {
    id: 'resume',
    title: 'Resume Analyzer',
    description: 'Deep AI review of impact, clarity, and role positioning.',
    Icon: FileText,
    placeholder: 'Describe your current role and target job title…',
    cta: 'Analyze Resume',
    sampleResult:
      'Priority fixes: lead with quantified outcomes, tighten summary to 3 lines, and mirror JD language for senior analyst keywords.',
    category: 'career',
  },
  {
    id: 'interview',
    title: 'Interview Question Generator',
    description: 'Role-specific questions with suggested answer frameworks.',
    Icon: MessageSquare,
    placeholder: 'Enter job title, company, or domain (e.g. US Healthcare Claims)…',
    cta: 'Generate Questions',
    sampleResult:
      '5 questions ready — including denial management scenario, KPI ownership, and a behavioral STAR prompt tailored to BPO hiring panels.',
    category: 'career',
  },
  {
    id: 'salary',
    title: 'Salary Estimator',
    description: 'Market-informed CTC ranges for your profile and city.',
    Icon: Calculator,
    placeholder: 'Role, years of experience, and location (e.g. Noida, 4 yrs, Claims)…',
    cta: 'Estimate Salary',
    sampleResult:
      'Estimated range: ₹6.8 – ₹9.4 LPA for Senior Claims Analyst in NCR, based on comparable CAP placements and partner employers.',
    category: 'career',
    popular: true,
  },
  {
    id: 'career-path',
    title: 'Career Path Advisor',
    description: 'AI roadmap from your current role to your next milestone.',
    Icon: Target,
    placeholder: 'Where you are today and where you want to be in 12–24 months…',
    cta: 'Build Roadmap',
    sampleResult:
      'Suggested path: Analyst → Senior Analyst → Team Lead. Focus on AR follow-up depth, mock interviews, and 2 warm referrals in the next quarter.',
    category: 'career',
  },
  {
    id: 'eligibility',
    title: 'Study Abroad Eligibility Checker',
    description: 'Quick read on academic fit, intake windows, and budget band.',
    Icon: GraduationCap,
    placeholder: 'Degree, GPA/percentage, target country, and intake…',
    cta: 'Check Eligibility',
    sampleResult:
      'Strong fit for UK & Germany MSc programmes in Business / Analytics. Scholarship track possible with improved SOP narrative.',
    category: 'study',
    popular: true,
  },
  {
    id: 'university',
    title: 'University Match Tool',
    description: 'AI shortlist aligned to profile, budget, and career goals.',
    Icon: Sparkles,
    placeholder: 'Programme interest, budget range, and preferred countries…',
    cta: 'Match Universities',
    sampleResult:
      '8 universities matched — including Manchester, Aston, and ESSEC with realistic admit probability and fee bands.',
    category: 'study',
  },
  {
    id: 'sop',
    title: 'SOP Assistant',
    description: 'Structure, tone, and differentiation guidance for your statement.',
    Icon: PenLine,
    placeholder: 'Paste a draft SOP or bullet your background and goals…',
    cta: 'Improve SOP',
    sampleResult:
      'Opening hook strengthened, career pivot clarified, and closing tied to post-study outcomes — ready for advisor review.',
    category: 'study',
  },
];

const FILTERS: (Category | 'all')[] = ['all', 'career', 'study'];

/* ---------- rotating headline config ---------- */

const HEADLINE_WORDS: { text: string; emphasis: boolean; dwell: number }[] = [
  { text: 'Grow Career.', emphasis: false, dwell: 1400 },
  { text: 'Go Global.', emphasis: false, dwell: 1400 },
  { text: 'Go Placedly.', emphasis: true, dwell: 2200 },
];

/* ---------- helpers ---------- */

function useIsMobile(breakpoint = 900) {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia(`(max-width: ${breakpoint}px)`);
    const update = () => setIsMobile(mq.matches);
    update();
    mq.addEventListener('change', update);
    return () => mq.removeEventListener('change', update);
  }, [breakpoint]);
  return isMobile;
}

function useTypewriter(text: string, active: boolean, speed = 14) {
  const [output, setOutput] = useState('');
  useEffect(() => {
    if (!active || !text) {
      setOutput('');
      return;
    }
    let i = 0;
    setOutput('');
    const id = window.setInterval(() => {
      i += 1;
      setOutput(text.slice(0, i));
      if (i >= text.length) window.clearInterval(id);
    }, speed);
    return () => window.clearInterval(id);
  }, [text, active, speed]);
  return output;
}

/* ---------- rotating headline banner ---------- */

function RotatingHeadlineBanner() {
  const [index, setIndex] = useState(0);
  const current = HEADLINE_WORDS[index];

  useEffect(() => {
    const id = window.setTimeout(() => {
      setIndex((i) => (i + 1) % HEADLINE_WORDS.length);
    }, current.dwell);
    return () => window.clearTimeout(id);
  }, [index, current.dwell]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{ duration: 0.5 }}
      style={{
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '10px',
        margin: '0 auto clamp(28px, 4vw, 40px)',
        maxWidth: '640px',
        padding: 'clamp(18px, 3vw, 26px) clamp(20px, 4vw, 32px)',
        borderRadius: '20px',
        background:
          'linear-gradient(135deg, rgba(37,99,235,0.06) 0%, rgba(251,146,60,0.06) 100%)',
        border: '1px solid rgba(37,99,235,0.12)',
        boxShadow: '0 10px 30px rgba(37,99,235,0.06)',
        textAlign: 'center',
        overflow: 'hidden',
      }}
    >
      {/* soft animated glow sweep */}
      <motion.div
        aria-hidden
        animate={{ x: ['-30%', '130%'] }}
        transition={{ duration: 3.5, repeat: Infinity, ease: 'linear' }}
        style={{
          position: 'absolute',
          top: 0,
          bottom: 0,
          width: '40%',
          background:
            'linear-gradient(90deg, transparent, rgba(251,146,60,0.08), transparent)',
          pointerEvents: 'none',
        }}
      />

      <div
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '8px',
          fontSize: 'clamp(1.3rem, 3vw, 1.9rem)',
          fontWeight: 800,
          letterSpacing: '-0.01em',
          position: 'relative',
          zIndex: 1,
        }}
      >
        <motion.span
          animate={{ rotate: [0, -8, 8, 0] }}
          transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
          style={{
            display: 'inline-flex',
            width: '30px',
            height: '30px',
            borderRadius: '9px',
            background: 'linear-gradient(135deg, #2563eb, #fb923c)',
            color: '#fff',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
          }}
        >
          <Rocket size={15} strokeWidth={2.2} />
        </motion.span>

        <span
          style={{
            position: 'relative',
            display: 'inline-block',
            minWidth: 'clamp(160px, 30vw, 230px)',
            height: '1.3em',
            textAlign: 'left',
          }}
        >
          <AnimatePresence mode="wait">
            <motion.span
              key={current.text}
              initial={{ y: 18, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -18, opacity: 0 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              style={{
                position: 'absolute',
                left: 0,
                top: 0,
                whiteSpace: 'nowrap',
                ...headingGradientStyle,
                fontSize: current.emphasis ? '1.06em' : '1em',
              }}
            >
              {current.text}
            </motion.span>
          </AnimatePresence>
        </span>
      </div>

      <p
        style={{
          position: 'relative',
          zIndex: 1,
          fontSize: 'clamp(0.85rem, 1.3vw, 0.98rem)',
          color: '#475569',
          lineHeight: 1.6,
          maxWidth: '520px',
        }}
      >
        From CV to Offer. Home to Abroad.{' '}
        <span style={{ fontWeight: 700, color: '#1e3a8a' }}>
          Your Career Co-Pilot — One Place, One Partner.
        </span>
      </p>
    </motion.div>
  );
}

/* ---------- component ---------- */

export default function UtilityToolsSection() {
  const [category, setCategory] = useState<Category | 'all'>('all');
  const [activeId, setActiveId] = useState<string | null>(null);
  const [input, setInput] = useState('');
  const [phase, setPhase] = useState<'idle' | 'loading' | 'done'>('idle');

  const isMobile = useIsMobile();

  const active = TOOLS.find((t) => t.id === activeId) ?? null;
  const accent: Accent = active
    ? CATEGORY_META[active.category]
    : CATEGORY_META[category];

  const filteredTools = useMemo(() => {
    return TOOLS.filter((t) => {
      const matchesCategory = category === 'all' || t.category === category;
      return matchesCategory;
    });
  }, [category]);

  const typedResult = useTypewriter(active?.sampleResult ?? '', phase === 'done');

  const runTool = useCallback(() => {
    if (!active) return;
    setPhase('loading');
    window.setTimeout(() => {
      setPhase('done');
    }, 1100);
  }, [active]);

  const openTool = (tool: Tool) => {
    setActiveId(tool.id);
    setInput('');
    setPhase('idle');
  };

  const closePanel = () => {
    setActiveId(null);
    setPhase('idle');
    setInput('');
  };

  // lock body scroll when mobile modal open
  useEffect(() => {
    if (isMobile && active) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobile, active]);

  return (
    <section
      id="utility-tools"
      style={{
        position: 'relative',
        padding: 'clamp(48px, 7vw, 96px) clamp(16px, 5vw, 24px)',
        overflow: 'hidden',
        background: '#fafafa',
      }}
    >
      {/* Ambient blobs — recolor with active category */}
      <motion.div
        aria-hidden
        className="tools-blob"
        style={{
          position: 'absolute',
          top: '-12%',
          right: '-8%',
          width: '460px',
          height: '460px',
          borderRadius: '50%',
          filter: 'blur(100px)',
          zIndex: 0,
          pointerEvents: 'none',
        }}
        animate={{
          background: `radial-gradient(circle, ${accent.from}30 0%, transparent 70%)`,
          x: [0, -20, 0],
          y: [0, 15, 0],
        }}
        transition={{
          background: { duration: 0.8, ease: [0.4, 0, 0.2, 1] },
          x: { duration: 11, repeat: Infinity, ease: 'easeInOut' },
          y: { duration: 9, repeat: Infinity, ease: 'easeInOut' },
        }}
      />
      <motion.div
        aria-hidden
        className="tools-blob"
        style={{
          position: 'absolute',
          bottom: '-14%',
          left: '-10%',
          width: '500px',
          height: '500px',
          borderRadius: '50%',
          filter: 'blur(110px)',
          zIndex: 0,
          pointerEvents: 'none',
        }}
        animate={{
          background: `radial-gradient(circle, ${accent.to}28 0%, transparent 70%)`,
          x: [0, 20, 0],
          y: [0, -15, 0],
        }}
        transition={{
          background: { duration: 0.8, ease: [0.4, 0, 0.2, 1] },
          x: { duration: 12, repeat: Infinity, ease: 'easeInOut' },
          y: { duration: 10, repeat: Infinity, ease: 'easeInOut' },
        }}
      />

      <div style={{ position: 'relative', zIndex: 1, maxWidth: '1280px', margin: '0 auto' }}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5 }}
          style={{ textAlign: 'center', marginBottom: 'clamp(24px, 3.5vw, 36px)' }}
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
              color: accent.from,
              marginBottom: '12px',
              transition: 'color 0.4s ease',
            }}
          >
            <Sparkles size={14} strokeWidth={2.25} aria-hidden />
            Utility Tools
          </p>
          <h2
            style={{
              fontSize: 'clamp(1.8rem, 4vw, 3rem)',
              fontWeight: 800,
              lineHeight: 1.1,
              marginBottom: '12px',
              letterSpacing: '-0.02em',
              ...headingGradientStyle,
            }}
          >
            AI-Powered Tools Built for Real Career Decisions
          </h2>
          <p
            style={{
              fontSize: 'clamp(0.95rem, 1.4vw, 1.1rem)',
              color: '#666',
              maxWidth: '620px',
              margin: '0 auto',
            }}
          >
            Interactive assistants for resumes, interviews, salaries, study abroad, and more —
            designed to feel fast, useful, and advisor-grade.
          </p>
        </motion.div>

        {/* Rotating headline banner — Grow Career / Go Global / Go Placedly */}
        <RotatingHeadlineBanner />

        {/* Category filter (only filter bar) */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            marginBottom: 'clamp(24px, 3vw, 32px)',
          }}
        >
          <div
            className="tools-filter"
            role="tablist"
            aria-label="Filter tools"
            style={{
              position: 'relative',
              display: 'inline-flex',
              gap: '4px',
              background: '#fff',
              padding: '6px',
              borderRadius: '999px', // Pill shape
              boxShadow: '0 4px 20px rgba(0,0,0,0.06)',
              border: '1px solid rgba(0,0,0,0.05)',
              flexWrap: 'wrap',
            }}
          >
            {FILTERS.map((f) => {
              const meta = CATEGORY_META[f];
              const isActive = category === f;
              return (
                <button
                  key={f}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => setCategory(f)}
                  style={{
                    position: 'relative',
                    padding: '10px 20px',
                    borderRadius: '999px', // Pill shape for buttons
                    border: 'none',
                    fontWeight: 600,
                    fontSize: '13.5px',
                    cursor: 'pointer',
                    background: 'transparent',
                    color: isActive ? '#fff' : '#666',
                    zIndex: 1,
                    whiteSpace: 'nowrap',
                    transition: 'color 0.3s ease',
                  }}
                >
                  {isActive && (
                    <motion.span
                      layoutId="tools-filter-pill"
                      style={{
                        position: 'absolute',
                        inset: 0,
                        borderRadius: '999px',
                        background: `linear-gradient(135deg, ${meta.from}, ${meta.to})`,
                        zIndex: -1,
                        boxShadow: `0 8px 18px ${meta.soft}`,
                      }}
                      transition={{ type: 'spring', stiffness: 500, damping: 35 }}
                    />
                  )}
                  {meta.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Pill-shaped toggle bar with all tools */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          style={{
            marginBottom: 'clamp(20px, 3vw, 28px)',
          }}
        >
          {/* NOTE: wrapper only adds mobile scroll-fade hints — no desktop visual change */}
          <div className="tools-toggle-wrap">
            <div
              className="tools-toggle-bar"
              style={{
                background: '#fff',
                borderRadius: '999px',
                padding: '8px',
                boxShadow: '0 6px 24px rgba(0,0,0,0.08)',
                border: '1px solid rgba(0,0,0,0.06)',
                display: 'flex',
                flexWrap: 'wrap',
                gap: '6px',
                justifyContent: 'center',
                alignItems: 'center',
                maxWidth: '100%',
                margin: '0 auto',
              }}
            >
              {filteredTools.map((tool) => {
                const meta = CATEGORY_META[tool.category];
                const isActive = activeId === tool.id;
                return (
                  <motion.button
                    key={tool.id}
                    type="button"
                    onClick={() => openTool(tool)}
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    style={{
                      position: 'relative',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '8px',
                      padding: '10px 18px',
                      borderRadius: '999px',
                      border: 'none',
                      background: isActive
                        ? `linear-gradient(135deg, ${meta.from}, ${meta.to})`
                        : 'rgba(0,0,0,0.02)',
                      color: isActive ? '#fff' : '#333',
                      fontSize: '13px',
                      fontWeight: 600,
                      cursor: 'pointer',
                      transition: 'all 0.3s ease',
                      boxShadow: isActive ? `0 6px 16px ${meta.soft}` : 'none',
                    }}
                  >
                    <tool.Icon size={16} strokeWidth={2} />
                    <span className="tool-title-desktop">{tool.title}</span>
                    <span className="tool-title-mobile">
                      {tool.title.split(' ')[0]}
                    </span>
                    {tool.popular && (
                      <span
                        className="tool-hot-badge"
                        style={{
                          fontSize: '9px',
                          fontWeight: 700,
                          letterSpacing: '0.5px',
                          background: isActive ? 'rgba(255,255,255,0.25)' : meta.soft,
                          color: isActive ? '#fff' : meta.from,
                          borderRadius: '999px',
                          padding: '2px 6px',
                        }}
                      >
                        HOT
                      </span>
                    )}
                    {isActive && (
                      <ChevronDown
                        size={14}
                        strokeWidth={2.5}
                        className="tool-chevron"
                        style={{
                          marginLeft: '2px',
                        }}
                      />
                    )}
                  </motion.button>
                );
              })}
            </div>

            {/* mobile-only scroll affordance (hidden on desktop) */}
            <span className="tools-toggle-fade tools-toggle-fade--left" aria-hidden />
            <span className="tools-toggle-fade tools-toggle-fade--right" aria-hidden />
          </div>
        </motion.div>

        {/* Tool panel appears beneath toggle bar */}
        <AnimatePresence mode="wait">
          {active && (
            <motion.div
              key={active.id}
              initial={{ opacity: 0, y: -10, height: 0 }}
              animate={{ opacity: 1, y: 0, height: 'auto' }}
              exit={{ opacity: 0, y: -10, height: 0 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              style={{
                overflow: 'hidden',
              }}
            >
              <div
                style={{
                  maxWidth: '900px',
                  margin: '0 auto',
                  background: '#fff',
                  borderRadius: '24px',
                  padding: 'clamp(24px, 4vw, 36px)',
                  boxShadow: '0 20px 60px rgba(0,0,0,0.12)',
                  border: `2px solid ${accent.from}22`,
                }}
              >
                <ToolPanel
                  active={active}
                  accent={accent}
                  input={input}
                  setInput={setInput}
                  phase={phase}
                  typedResult={typedResult}
                  runTool={runTool}
                  closePanel={closePanel}
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .tools-blob {
            display: none;
          }
          .tool-title-desktop {
            display: none;
          }
          .tool-title-mobile {
            display: inline;
          }

          /* ── Mobile-only toggle bar redesign: single-row horizontal scroll ── */
          .tools-toggle-wrap {
            position: relative;
          }
          .tools-toggle-bar {
            flex-wrap: nowrap !important;
            justify-content: flex-start !important;
            overflow-x: auto !important;
            -webkit-overflow-scrolling: touch;
            scroll-snap-type: x proximity;
            padding: 8px 16px !important;
            gap: 8px !important;
            scrollbar-width: none;
          }
          .tools-toggle-bar::-webkit-scrollbar {
            display: none;
          }
          .tools-toggle-bar > button {
            flex-shrink: 0;
            scroll-snap-align: start;
            padding: 10px 16px !important;
          }
          .tool-hot-badge {
            display: none;
          }
          .tool-chevron {
            display: none;
          }
          .tools-toggle-fade {
            display: block;
            position: absolute;
            top: 0;
            bottom: 0;
            width: 28px;
            pointer-events: none;
            z-index: 2;
          }
          .tools-toggle-fade--left {
            left: 0;
            background: linear-gradient(90deg, #fafafa, rgba(250,250,250,0));
            border-radius: 999px 0 0 999px;
          }
          .tools-toggle-fade--right {
            right: 0;
            background: linear-gradient(270deg, #fafafa, rgba(250,250,250,0));
            border-radius: 0 999px 999px 0;
          }
        }
        @media (min-width: 901px) {
          .tool-title-desktop {
            display: inline;
          }
          .tool-title-mobile {
            display: none;
          }
          .tools-toggle-fade {
            display: none;
          }
        }
      `}</style>
    </section>
  );
}

/* ---------- shared panel ---------- */

function ToolPanel({
  active,
  accent,
  input,
  setInput,
  phase,
  typedResult,
  runTool,
  closePanel,
}: {
  active: Tool | null;
  accent: Accent;
  input: string;
  setInput: (v: string) => void;
  phase: 'idle' | 'loading' | 'done';
  typedResult: string;
  runTool: () => void;
  closePanel: () => void;
}) {
  if (!active) return null;

  return (
    <div style={{ position: 'relative' }}>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
          marginBottom: '20px',
        }}
      >
        <div style={{ display: 'flex', gap: '14px', alignItems: 'center' }}>
          <span
            style={{
              width: '50px',
              height: '50px',
              borderRadius: '16px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              background: `linear-gradient(135deg, ${accent.from}, ${accent.to})`,
              color: '#fff',
              flexShrink: 0,
              boxShadow: `0 8px 20px ${accent.soft}`,
            }}
          >
            <active.Icon size={24} strokeWidth={2} />
          </span>
          <div>
            <p
              style={{
                fontSize: '11px',
                fontWeight: 700,
                textTransform: 'uppercase',
                letterSpacing: '1.2px',
                color: accent.from,
                marginBottom: '4px',
              }}
            >
              Placedly AI Tool
            </p>
            <h3
              style={{
                fontSize: 'clamp(1.1rem, 2vw, 1.4rem)',
                fontWeight: 800,
                lineHeight: 1.3,
                ...headingGradientStyle,
              }}
            >
              {active.title}
            </h3>
            <p
              style={{
                fontSize: '13px',
                color: '#666',
                marginTop: '4px',
                lineHeight: 1.5,
              }}
            >
              {active.description}
            </p>
          </div>
        </div>
        <button
          type="button"
          onClick={closePanel}
          aria-label="Close tool"
          style={{
            border: 'none',
            background: 'rgba(0,0,0,0.05)',
            width: '36px',
            height: '36px',
            borderRadius: '12px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            color: '#666',
            flexShrink: 0,
            transition: 'all 0.2s ease',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = 'rgba(0,0,0,0.1)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = 'rgba(0,0,0,0.05)';
          }}
        >
          <X size={18} strokeWidth={2.5} />
        </button>
      </div>

      <textarea
        rows={5}
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder={active.placeholder}
        style={{
          width: '100%',
          resize: 'vertical',
          padding: '16px',
          borderRadius: '16px',
          border: `2px solid ${accent.from}22`,
          fontSize: '14px',
          lineHeight: 1.6,
          color: '#111',
          outline: 'none',
          marginBottom: '16px',
          fontFamily: 'inherit',
          background: accent.soft,
          transition: 'border-color 0.3s ease',
        }}
        onFocus={(e) => {
          e.currentTarget.style.borderColor = accent.from;
        }}
        onBlur={(e) => {
          e.currentTarget.style.borderColor = `${accent.from}22`;
        }}
      />

      <motion.button
        type="button"
        onClick={runTool}
        disabled={phase === 'loading'}
        whileHover={{ y: -2, boxShadow: `0 12px 32px ${accent.soft}` }}
        whileTap={{ scale: 0.98 }}
        style={{
          width: '100%',
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '10px',
          padding: '16px 28px',
          background: `linear-gradient(135deg, ${accent.from}, ${accent.to})`,
          color: '#fff',
          border: 'none',
          borderRadius: '14px',
          fontWeight: 700,
          fontSize: '15px',
          cursor: phase === 'loading' ? 'wait' : 'pointer',
          opacity: phase === 'loading' ? 0.85 : 1,
          boxShadow: `0 8px 24px ${accent.soft}`,
        }}
      >
        {phase === 'loading' ? (
          <>
            <motion.span
              aria-hidden
              animate={{ rotate: 360 }}
              transition={{ duration: 0.8, repeat: Infinity, ease: 'linear' }}
              style={{
                width: '16px',
                height: '16px',
                borderRadius: '50%',
                border: '2px solid rgba(255,255,255,0.3)',
                borderTopColor: '#fff',
                display: 'inline-block',
              }}
            />
            Analyzing…
          </>
        ) : (
          <>
            <Sparkles size={18} strokeWidth={2.5} aria-hidden />
            {active.cta}
          </>
        )}
      </motion.button>

      <AnimatePresence>
        {(phase === 'loading' || phase === 'done') && (
          <motion.div
            initial={{ opacity: 0, y: 10, height: 0 }}
            animate={{ opacity: 1, y: 0, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            style={{
              marginTop: '20px',
              padding: '20px',
              borderRadius: '16px',
              background: accent.soft,
              border: `2px solid ${accent.from}33`,
              overflow: 'hidden',
            }}
          >
            <p
              style={{
                fontSize: '11px',
                fontWeight: 700,
                textTransform: 'uppercase',
                letterSpacing: '0.8px',
                color: accent.from,
                marginBottom: '12px',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
              }}
            >
              <Sparkles size={14} strokeWidth={2.5} />
              AI Insight
            </p>
            {phase === 'loading' ? (
              <TypingDots />
            ) : (
              <p style={{ fontSize: '14.5px', lineHeight: 1.7, color: '#222' }}>
                {typedResult}
                <motion.span
                  animate={{ opacity: [1, 0] }}
                  transition={{ duration: 0.6, repeat: Infinity }}
                  style={{
                    display: 'inline-block',
                    width: '2px',
                    height: '16px',
                    background: accent.from,
                    marginLeft: '3px',
                    verticalAlign: 'middle',
                  }}
                />
              </p>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function TypingDots() {
  return (
    <div style={{ display: 'flex', gap: '6px', padding: '6px 0' }}>
      {[0, 1, 2].map((i) => (
        <motion.span
          key={i}
          animate={{ y: [0, -6, 0] }}
          transition={{ duration: 0.7, repeat: Infinity, delay: i * 0.15 }}
          style={{
            width: '8px',
            height: '8px',
            borderRadius: '50%',
            background: '#999',
            display: 'inline-block',
          }}
        />
      ))}
    </div>
  );
}