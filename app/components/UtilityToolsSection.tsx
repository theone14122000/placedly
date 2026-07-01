'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import {
  Bot,
  Calculator,
  FileSearch,
  FileText,
  GraduationCap,
  MessageSquare,
  PenLine,
  Search,
  Sparkles,
  Target,
  X,
  type LucideIcon,
} from 'lucide-react';

type Category = 'career' | 'study' | 'ai';

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

const CATEGORY_META: Record<Category | 'all', { label: string } & Accent> = {
  all: { label: 'All Tools', from: '#6366f1', to: '#8b5cf6', soft: 'rgba(99,102,241,0.12)' },
  career: { label: 'Career & Resume', from: '#6366f1', to: '#8b5cf6', soft: 'rgba(99,102,241,0.12)' },
  study: { label: 'Study Abroad', from: '#3b82f6', to: '#06b6d4', soft: 'rgba(59,130,246,0.12)' },
  ai: { label: 'AI Assistant', from: '#ec4899', to: '#f97316', soft: 'rgba(236,72,153,0.12)' },
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
  {
    id: 'chat',
    title: 'AI Career Assistant Chat',
    description: 'Ask anything about placements, CAP, or study abroad — 24/7.',
    Icon: Bot,
    placeholder: 'Ask Placedly AI: "How does CAP work?" or "Best countries for MSc Finance?"',
    cta: 'Start Chat',
    sampleResult:
      "Hi — I'm Placedly AI. CAP is pay-after-offer: we rebuild your profile, run mocks, and introduce you to hiring managers. Want a free roadmap call?",
    category: 'ai',
    popular: true,
  },
];

const FILTERS: (Category | 'all')[] = ['all', 'career', 'study', 'ai'];

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

/* ---------- component ---------- */

export default function UtilityToolsSection() {
  const [category, setCategory] = useState<Category | 'all'>('all');
  const [query, setQuery] = useState('');
  const [activeId, setActiveId] = useState<string | null>(null);
  const [input, setInput] = useState('');
  const [phase, setPhase] = useState<'idle' | 'loading' | 'done'>('idle');

  const isMobile = useIsMobile();

  const active = TOOLS.find((t) => t.id === activeId) ?? null;
  const accent: Accent = active
    ? CATEGORY_META[active.category]
    : CATEGORY_META[category];

  const filteredTools = useMemo(() => {
    const q = query.trim().toLowerCase();
    return TOOLS.filter((t) => {
      const matchesCategory = category === 'all' || t.category === category;
      const matchesQuery =
        !q ||
        t.title.toLowerCase().includes(q) ||
        t.description.toLowerCase().includes(q);
      return matchesCategory && matchesQuery;
    });
  }, [category, query]);

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
        padding: 'clamp(64px, 9vw, 120px) clamp(16px, 5vw, 24px)',
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
          style={{ textAlign: 'center', marginBottom: 'clamp(32px, 5vw, 48px)' }}
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
              marginBottom: '16px',
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
              color: '#111',
              marginBottom: '16px',
              letterSpacing: '-0.02em',
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

        {/* Search + Category filter */}
        <div
          className="tools-controls"
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '14px',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: 'clamp(28px, 4vw, 40px)',
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
              borderRadius: '14px',
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
                    padding: '10px 18px',
                    borderRadius: '10px',
                    border: 'none',
                    fontWeight: 600,
                    fontSize: '13.5px',
                    cursor: 'pointer',
                    background: 'transparent',
                    color: isActive ? '#fff' : '#666',
                    zIndex: 1,
                    whiteSpace: 'nowrap',
                  }}
                >
                  {isActive && (
                    <motion.span
                      layoutId="tools-filter-pill"
                      style={{
                        position: 'absolute',
                        inset: 0,
                        borderRadius: '10px',
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

          <div
            className="tools-search"
            style={{
              position: 'relative',
              flex: '1 1 240px',
              maxWidth: '320px',
            }}
          >
            <Search
              size={16}
              strokeWidth={2}
              style={{
                position: 'absolute',
                top: '50%',
                left: '14px',
                transform: 'translateY(-50%)',
                color: '#999',
                pointerEvents: 'none',
              }}
            />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search tools…"
              style={{
                width: '100%',
                padding: '12px 14px 12px 38px',
                borderRadius: '12px',
                border: '1px solid rgba(0,0,0,0.08)',
                background: '#fff',
                fontSize: '14px',
                color: '#111',
                outline: 'none',
                boxShadow: '0 4px 16px rgba(0,0,0,0.04)',
              }}
            />
          </div>
        </div>

        {/* Layout: grid + aside */}
        <div className="tools-layout" style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: 'clamp(24px, 3vw, 40px)', alignItems: 'start' }}>
          {/* Cards grid */}
          <motion.div layout className="tools-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '16px' }}>
            <AnimatePresence mode="popLayout">
              {filteredTools.length === 0 ? (
                <motion.p
                  key="empty"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  style={{ gridColumn: '1 / -1', color: '#888', textAlign: 'center', padding: '40px 0' }}
                >
                  No tools match “{query}”. Try another search.
                </motion.p>
              ) : (
                filteredTools.map((tool, i) => {
                  const meta = CATEGORY_META[tool.category];
                  const isActive = activeId === tool.id;
                  return (
                    <motion.button
                      key={tool.id}
                      layout
                      type="button"
                      onClick={() => openTool(tool)}
                      initial={{ opacity: 0, y: 16 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.32, delay: i * 0.02 }}
                      whileHover={{ y: -4 }}
                      whileTap={{ scale: 0.98 }}
                      className="tools-card"
                      style={{
                        position: 'relative',
                        textAlign: 'left',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '10px',
                        padding: '20px',
                        borderRadius: '18px',
                        border: isActive
                          ? `1.5px solid ${meta.from}`
                          : '1px solid rgba(0,0,0,0.06)',
                        background: isActive ? meta.soft : '#fff',
                        cursor: 'pointer',
                        boxShadow: isActive
                          ? `0 12px 30px ${meta.soft}`
                          : '0 4px 16px rgba(0,0,0,0.04)',
                        transition: 'border 0.25s ease, background 0.25s ease, box-shadow 0.25s ease',
                      }}
                    >
                      {tool.popular && (
                        <span
                          style={{
                            position: 'absolute',
                            top: '14px',
                            right: '14px',
                            fontSize: '10px',
                            fontWeight: 700,
                            letterSpacing: '0.5px',
                            color: meta.from,
                            background: '#fff',
                            border: `1px solid ${meta.soft}`,
                            borderRadius: '999px',
                            padding: '3px 8px',
                          }}
                        >
                          POPULAR
                        </span>
                      )}
                      <span
                        aria-hidden
                        style={{
                          width: '40px',
                          height: '40px',
                          borderRadius: '12px',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          background: `linear-gradient(135deg, ${meta.from}, ${meta.to})`,
                          color: '#fff',
                          flexShrink: 0,
                        }}
                      >
                        <tool.Icon size={19} strokeWidth={1.9} />
                      </span>
                      <span style={{ fontSize: '15px', fontWeight: 700, color: '#111', lineHeight: 1.3 }}>
                        {tool.title}
                      </span>
                      <span style={{ fontSize: '13px', color: '#777', lineHeight: 1.5 }}>
                        {tool.description}
                      </span>
                    </motion.button>
                  );
                })
              )}
            </AnimatePresence>
          </motion.div>

          {/* Desktop sticky aside */}
          {!isMobile && (
            <div className="tools-aside" style={{ position: 'sticky', top: '100px' }}>
              <ToolPanel
                active={active}
                accent={accent}
                input={input}
                setInput={setInput}
                phase={phase}
                typedResult={typedResult}
                runTool={runTool}
                closePanel={closePanel}
                variant="desktop"
              />
            </div>
          )}
        </div>
      </div>

      {/* Mobile bottom-sheet modal */}
      {isMobile && (
        <AnimatePresence>
          {active && (
            <>
              <motion.div
                key="backdrop"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={closePanel}
                style={{
                  position: 'fixed',
                  inset: 0,
                  background: 'rgba(0,0,0,0.45)',
                  backdropFilter: 'blur(2px)',
                  zIndex: 40,
                }}
              />
              <motion.div
                key="sheet"
                initial={{ y: '100%' }}
                animate={{ y: 0 }}
                exit={{ y: '100%' }}
                transition={{ type: 'spring', stiffness: 320, damping: 34 }}
                style={{
                  position: 'fixed',
                  left: 0,
                  right: 0,
                  bottom: 0,
                  zIndex: 41,
                  maxHeight: '88vh',
                  overflowY: 'auto',
                  borderRadius: '24px 24px 0 0',
                  background: '#fff',
                  padding: '20px 20px calc(24px + env(safe-area-inset-bottom))',
                  boxShadow: '0 -20px 50px rgba(0,0,0,0.25)',
                }}
              >
                <div
                  aria-hidden
                  style={{
                    width: '40px',
                    height: '4px',
                    borderRadius: '2px',
                    background: '#e5e5e5',
                    margin: '0 auto 16px',
                  }}
                />
                <ToolPanel
                  active={active}
                  accent={accent}
                  input={input}
                  setInput={setInput}
                  phase={phase}
                  typedResult={typedResult}
                  runTool={runTool}
                  closePanel={closePanel}
                  variant="mobile"
                />
              </motion.div>
            </>
          )}
        </AnimatePresence>
      )}

      <style>{`
        @media (max-width: 900px) {
          .tools-layout {
            grid-template-columns: 1fr !important;
          }
          .tools-grid {
            grid-template-columns: 1fr !important;
          }
          .tools-blob {
            display: none;
          }
          .tools-controls {
            flex-direction: column;
            align-items: stretch !important;
          }
          .tools-search {
            max-width: 100% !important;
          }
        }
        @media (min-width: 601px) and (max-width: 900px) {
          .tools-grid {
            grid-template-columns: repeat(2, 1fr) !important;
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
  variant,
}: {
  active: Tool | null;
  accent: Accent;
  input: string;
  setInput: (v: string) => void;
  phase: 'idle' | 'loading' | 'done';
  typedResult: string;
  runTool: () => void;
  closePanel: () => void;
  variant: 'desktop' | 'mobile';
}) {
  return (
    <AnimatePresence mode="wait">
      {active ? (
        <motion.div
          key={active.id}
          initial={{ opacity: 0, x: variant === 'desktop' ? 24 : 0, y: variant === 'mobile' ? 8 : 0 }}
          animate={{ opacity: 1, x: 0, y: 0 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          style={{
            position: 'relative',
            background: variant === 'desktop' ? '#fff' : 'transparent',
            borderRadius: '22px',
            padding: variant === 'desktop' ? '28px' : '4px',
            border: variant === 'desktop' ? '1px solid rgba(0,0,0,0.06)' : 'none',
            boxShadow: variant === 'desktop' ? '0 20px 50px rgba(0,0,0,0.08)' : 'none',
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '18px' }}>
            <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
              <span
                style={{
                  width: '42px',
                  height: '42px',
                  borderRadius: '12px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  background: `linear-gradient(135deg, ${accent.from}, ${accent.to})`,
                  color: '#fff',
                  flexShrink: 0,
                }}
              >
                <active.Icon size={20} strokeWidth={1.9} />
              </span>
              <div>
                <p style={{ fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '1px', color: accent.from, marginBottom: '2px' }}>
                  Placedly AI
                </p>
                <h3 style={{ fontSize: '17px', fontWeight: 800, color: '#111', lineHeight: 1.3 }}>{active.title}</h3>
              </div>
            </div>
            {variant === 'desktop' && (
              <button
                type="button"
                onClick={closePanel}
                aria-label="Close tool"
                style={{
                  border: 'none',
                  background: 'rgba(0,0,0,0.05)',
                  width: '30px',
                  height: '30px',
                  borderRadius: '9px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  color: '#666',
                  flexShrink: 0,
                }}
              >
                <X size={16} />
              </button>
            )}
          </div>

          <textarea
            rows={variant === 'desktop' ? 4 : 3}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={active.placeholder}
            style={{
              width: '100%',
              resize: 'vertical',
              padding: '14px',
              borderRadius: '14px',
              border: '1px solid rgba(0,0,0,0.1)',
              fontSize: '14px',
              lineHeight: 1.5,
              color: '#111',
              outline: 'none',
              marginBottom: '14px',
              fontFamily: 'inherit',
            }}
          />

          <motion.button
            type="button"
            onClick={runTool}
            disabled={phase === 'loading'}
            whileHover={{ y: -2, boxShadow: `0 12px 28px ${accent.soft}` }}
            whileTap={{ scale: 0.97 }}
            style={{
              width: '100%',
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              padding: '14px 24px',
              background: `linear-gradient(135deg, ${accent.from}, ${accent.to})`,
              color: '#fff',
              border: 'none',
              borderRadius: '12px',
              fontWeight: 700,
              fontSize: '14.5px',
              cursor: phase === 'loading' ? 'wait' : 'pointer',
              opacity: phase === 'loading' ? 0.85 : 1,
            }}
          >
            {phase === 'loading' ? (
              <>
                <motion.span
                  aria-hidden
                  animate={{ rotate: 360 }}
                  transition={{ duration: 0.8, repeat: Infinity, ease: 'linear' }}
                  style={{
                    width: '15px',
                    height: '15px',
                    borderRadius: '50%',
                    border: '2px solid rgba(255,255,255,0.4)',
                    borderTopColor: '#fff',
                    display: 'inline-block',
                  }}
                />
                Analyzing…
              </>
            ) : (
              <>
                <Sparkles size={16} strokeWidth={2.25} aria-hidden />
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
                  marginTop: '16px',
                  padding: '16px',
                  borderRadius: '14px',
                  background: accent.soft,
                  border: `1px solid ${accent.from}22`,
                  overflow: 'hidden',
                }}
              >
                <p
                  style={{
                    fontSize: '11px',
                    fontWeight: 700,
                    textTransform: 'uppercase',
                    letterSpacing: '0.6px',
                    color: accent.from,
                    marginBottom: '8px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                  }}
                >
                  <Sparkles size={12} strokeWidth={2.5} />
                  AI Insight
                </p>
                {phase === 'loading' ? (
                  <TypingDots />
                ) : (
                  <p style={{ fontSize: '14px', lineHeight: 1.6, color: '#222' }}>
                    {typedResult}
                    <motion.span
                      animate={{ opacity: [1, 0] }}
                      transition={{ duration: 0.6, repeat: Infinity }}
                      style={{ display: 'inline-block', width: '2px', height: '14px', background: accent.from, marginLeft: '2px', verticalAlign: 'middle' }}
                    />
                  </p>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      ) : (
        variant === 'desktop' && (
          <motion.div
            key="placeholder"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{
              background: '#fff',
              borderRadius: '22px',
              padding: '40px 28px',
              border: '1px dashed rgba(0,0,0,0.12)',
              textAlign: 'center',
            }}
          >
            <span
              style={{
                width: '52px',
                height: '52px',
                borderRadius: '14px',
                background: `linear-gradient(135deg, ${accent.from}, ${accent.to})`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 16px',
                color: '#fff',
              }}
            >
              <Sparkles size={22} strokeWidth={2} />
            </span>
            <p style={{ fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '1px', color: accent.from, marginBottom: '6px' }}>
              Placedly AI
            </p>
            <h3 style={{ fontSize: '18px', fontWeight: 800, color: '#111', marginBottom: '8px' }}>
              Select a tool to begin
            </h3>
            <p style={{ fontSize: '13.5px', color: '#777', lineHeight: 1.6 }}>
              Choose any utility on the left — run a quick AI preview for resumes, interviews,
              salaries, or study abroad planning.
            </p>
          </motion.div>
        )
      )}
    </AnimatePresence>
  );
}

function TypingDots() {
  return (
    <div style={{ display: 'flex', gap: '5px', padding: '4px 0' }}>
      {[0, 1, 2].map((i) => (
        <motion.span
          key={i}
          animate={{ y: [0, -5, 0] }}
          transition={{ duration: 0.7, repeat: Infinity, delay: i * 0.15 }}
          style={{
            width: '7px',
            height: '7px',
            borderRadius: '50%',
            background: '#999',
            display: 'inline-block',
          }}
        />
      ))}
    </div>
  );
}