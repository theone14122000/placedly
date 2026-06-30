'use client';

import { useCallback, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import {
  Bot,
  Calculator,
  FileSearch,
  FileText,
  GraduationCap,
  MessageSquare,
  PenLine,
  Sparkles,
  Target,
  type LucideIcon,
} from 'lucide-react';
import GenZBlobs from './GenZBlobs';

type Tool = {
  id: string;
  title: string;
  description: string;
  Icon: LucideIcon;
  placeholder: string;
  cta: string;
  sampleResult: string;
  aiTag?: boolean;
};

const tools: Tool[] = [
  {
    id: 'ats',
    title: 'ATS Resume Score Checker',
    description: 'Instant AI scan for keyword match, formatting, and ATS readability.',
    Icon: FileSearch,
    placeholder: 'Paste your resume text or upload a summary…',
    cta: 'Check ATS Score',
    sampleResult:
      'ATS Score: 82/100 — Strong keyword alignment for Claims Analyst roles. Improve metrics in experience bullets and add a skills block for ICD-10 / CPT.',
    aiTag: true,
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
    aiTag: true,
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
    aiTag: true,
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
    aiTag: true,
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
    aiTag: true,
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
    aiTag: true,
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
    aiTag: true,
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
    aiTag: true,
  },
  {
    id: 'chat',
    title: 'AI Career Assistant Chat',
    description: 'Ask anything about placements, CAP, or study abroad — 24/7.',
    Icon: Bot,
    placeholder: 'Ask Placedly AI: “How does CAP work?” or “Best countries for MSc Finance?”',
    cta: 'Start Chat',
    sampleResult:
      'Hi — I’m Placedly AI. CAP is pay-after-offer: we rebuild your profile, run mocks, and introduce you to hiring managers. Want a free roadmap call?',
    aiTag: true,
  },
];

export default function UtilityToolsSection() {
  const [activeId, setActiveId] = useState<string | null>(null);
  const [input, setInput] = useState('');
  const [phase, setPhase] = useState<'idle' | 'loading' | 'done'>('idle');
  const [result, setResult] = useState('');

  const active = tools.find((t) => t.id === activeId) ?? null;

  const runTool = useCallback(() => {
    if (!active) return;
    setPhase('loading');
    setResult('');
    window.setTimeout(() => {
      setResult(active.sampleResult);
      setPhase('done');
    }, 1400);
  }, [active]);

  const openTool = (tool: Tool) => {
    setActiveId(tool.id);
    setInput('');
    setPhase('idle');
    setResult('');
  };

  const closePanel = () => {
    setActiveId(null);
    setPhase('idle');
    setResult('');
    setInput('');
  };

  return (
    <section className="placedly-genz-section placedly-tools-section" id="utility-tools">
      <GenZBlobs />
      <div className="placedly-genz-wrap">
        <motion.div
          className="placedly-genz-header"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5 }}
        >
          <p className="placedly-genz-eyebrow placedly-genz-eyebrow--orange">
            <Sparkles size={14} strokeWidth={2.25} aria-hidden />
            Utility Tools
          </p>
          <h2 className="placedly-genz-title">AI-Powered Tools Built for Real Career Decisions</h2>
          <p className="placedly-genz-sub">
            Interactive assistants for resumes, interviews, salaries, study abroad, and more — designed
            to feel fast, useful, and advisor-grade.
          </p>
        </motion.div>

        <div className="placedly-tools-layout">
          <div className="placedly-tools-grid">
            {tools.map((tool, i) => (
              <motion.button
                key={tool.id}
                type="button"
                className={`placedly-tools-card${activeId === tool.id ? ' is-active' : ''}`}
                onClick={() => openTool(tool)}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.45, delay: i * 0.04 }}
                whileHover={{ y: -3 }}
                whileTap={{ scale: 0.99 }}
              >
                {tool.aiTag ? <span className="placedly-tools-ai-badge">AI</span> : null}
                <span className="placedly-tools-icon" aria-hidden>
                  <tool.Icon size={20} strokeWidth={1.85} />
                </span>
                <span className="placedly-tools-title">{tool.title}</span>
                <span className="placedly-tools-desc">{tool.description}</span>
              </motion.button>
            ))}
          </div>

          <div className={`placedly-tools-aside${active ? ' is-open' : ''}`}>
            <AnimatePresence mode="wait">
              {active ? (
                <motion.aside
                  key={active.id}
                  className="placedly-tools-panel"
                  initial={{ opacity: 0, x: 24, scale: 0.98 }}
                  animate={{ opacity: 1, x: 0, scale: 1 }}
                  exit={{ opacity: 0, x: 16, scale: 0.98 }}
                  transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
                >
                  <div className="placedly-tools-panel-head">
                    <div>
                      <p className="placedly-tools-panel-eyebrow">Placedly AI</p>
                      <h3 className="placedly-tools-panel-title">{active.title}</h3>
                    </div>
                    <button type="button" className="placedly-tools-close" onClick={closePanel} aria-label="Close tool">
                      ×
                    </button>
                  </div>

                  <label className="placedly-tools-field">
                    <span className="sr-only">{active.title} input</span>
                    <textarea
                      rows={4}
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      placeholder={active.placeholder}
                      className="placedly-tools-textarea"
                    />
                  </label>

                  <button
                    type="button"
                    className="placedly-tools-run"
                    onClick={runTool}
                    disabled={phase === 'loading'}
                  >
                    {phase === 'loading' ? (
                      <>
                        <span className="placedly-tools-spinner" aria-hidden />
                        Analyzing…
                      </>
                    ) : (
                      <>
                        <Sparkles size={16} strokeWidth={2.25} aria-hidden />
                        {active.cta}
                      </>
                    )}
                  </button>

                  <AnimatePresence>
                    {phase === 'done' && result && (
                      <motion.div
                        className="placedly-tools-result"
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 4 }}
                        transition={{ duration: 0.28 }}
                      >
                        <p className="placedly-tools-result-label">AI insight</p>
                        <p>{result}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.aside>
              ) : (
                <motion.div
                  key="placeholder"
                  className="placedly-tools-panel placedly-tools-panel--empty"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <p className="placedly-tools-panel-eyebrow">Placedly AI</p>
                  <h3 className="placedly-tools-panel-title">Select a tool to begin</h3>
                  <p className="placedly-tools-empty-copy">
                    Choose any utility on the left — run a quick AI preview for resumes, interviews,
                    salaries, or study abroad planning.
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
