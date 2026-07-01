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
  Upload,
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
    placeholder: 'Paste your resume text or upload a file below…',
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
    placeholder: 'Paste your resume text or upload a file below…',
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

/* upload is only offered for these two tools */
const UPLOAD_ENABLED_IDS = ['ats', 'resume'];

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

function useTypewriter(text: string, active: boolean, speed = 10) {
  const [output, setOutput] = useState('');
  useEffect(() => {
    if (!active || !text) {
      setOutput('');
      return;
    }
    let i = 0;
    setOutput('');
    const id = window.setInterval(() => {
      i += 2;
      setOutput(text.slice(0, i));
      if (i >= text.length) window.clearInterval(id);
    }, speed);
    return () => window.clearInterval(id);
  }, [text, active, speed]);
  return output;
}

/* ============================================================
   REAL FILE TEXT EXTRACTION (no design impact — logic only)
   Loads pdf.js / mammoth.js from CDN on demand, no npm install needed.
============================================================ */

function loadScriptOnce(src: string): Promise<void> {
  return new Promise((resolve, reject) => {
    if (document.querySelector(`script[data-loaded-src="${src}"]`)) {
      resolve();
      return;
    }
    const s = document.createElement('script');
    s.src = src;
    s.async = true;
    s.dataset.loadedSrc = src;
    s.onload = () => resolve();
    s.onerror = () => reject(new Error('Failed to load required library.'));
    document.body.appendChild(s);
  });
}

async function extractPdfText(file: File): Promise<string> {
  await loadScriptOnce('https://cdn.jsdelivr.net/npm/pdfjs-dist@3.11.174/legacy/build/pdf.min.js');
  const pdfjsLib = (window as any).pdfjsLib;
  if (!pdfjsLib) throw new Error('PDF reader failed to load. Please paste your resume text instead.');
  pdfjsLib.GlobalWorkerOptions.workerSrc =
    'https://cdn.jsdelivr.net/npm/pdfjs-dist@3.11.174/legacy/build/pdf.worker.min.js';
  const buf = await file.arrayBuffer();
  const pdf = await pdfjsLib.getDocument({ data: buf }).promise;
  let text = '';
  for (let i = 1; i <= pdf.numPages; i += 1) {
    const page = await pdf.getPage(i);
    const content = await page.getTextContent();
    text += content.items.map((it: any) => it.str).join(' ') + '\n';
  }
  return text.trim();
}

async function extractDocxText(file: File): Promise<string> {
  await loadScriptOnce('https://cdn.jsdelivr.net/npm/mammoth@1.6.0/mammoth.browser.min.js');
  const mammoth = (window as any).mammoth;
  if (!mammoth) throw new Error('DOCX reader failed to load. Please paste your resume text instead.');
  const arrayBuffer = await file.arrayBuffer();
  const result = await mammoth.extractRawText({ arrayBuffer });
  return (result.value as string).trim();
}

async function extractTextFromFile(file: File): Promise<string> {
  if (file.size > 8 * 1024 * 1024) {
    throw new Error('File is too large (max 8MB). Please upload a smaller file or paste text directly.');
  }
  const name = file.name.toLowerCase();
  const type = file.type;

  if (type === 'text/plain' || name.endsWith('.txt')) {
    return (await file.text()).trim();
  }
  if (type === 'application/pdf' || name.endsWith('.pdf')) {
    return extractPdfText(file);
  }
  if (name.endsWith('.docx')) {
    return extractDocxText(file);
  }
  if (name.endsWith('.doc')) {
    throw new Error('Legacy .doc files are not supported — please save as .docx or .pdf, or paste your resume text directly.');
  }
  // best-effort fallback
  const text = await file.text().catch(() => '');
  if (text && /[a-zA-Z]{20,}/.test(text)) return text.trim();
  throw new Error('Unsupported file format. Please upload a .pdf, .docx, or .txt file.');
}

/* ============================================================
   REAL ANALYSIS ENGINES (deterministic, input-driven — no mocks)
============================================================ */

const ACTION_VERBS = [
  'managed', 'led', 'built', 'created', 'improved', 'increased', 'reduced', 'achieved',
  'developed', 'implemented', 'designed', 'coordinated', 'negotiated', 'resolved',
  'streamlined', 'automated', 'delivered', 'launched', 'trained', 'mentored',
  'analyzed', 'optimized', 'generated', 'processed', 'handled', 'executed',
  'supervised', 'drove', 'spearheaded', 'collaborated',
];

const DOMAIN_KEYWORDS: Record<string, string[]> = {
  healthcare: ['claims', 'icd-10', 'cpt', 'denial', 'healthcare', 'medical billing', 'prior authorization', 'hipaa'],
  insurance: ['insurance', 'underwriting', 'policy', 'premium', "lloyd's", 'reinsurance', 'actuarial', 'claims adjuster'],
  finance: ['accounts', 'reconciliation', 'audit', 'gaap', 'forecasting', 'budgeting', 'accounts payable', 'accounts receivable'],
  bpo: ['bpo', 'kpo', 'call center', 'call centre', 'customer service', 'sla', 'process improvement'],
};

const SECTION_HEADERS = ['summary', 'objective', 'experience', 'work experience', 'education', 'skills', 'certifications', 'projects', 'achievements'];

function analyzeAts(text: string): string {
  const clean = text.trim();
  if (clean.length < 50) {
    return 'Please paste at least a few sentences of resume content — or upload a .pdf/.docx/.txt file above — so we can generate an accurate ATS score.';
  }
  const lower = clean.toLowerCase();
  const wordCount = clean.split(/\s+/).filter(Boolean).length;
  const hasEmail = /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}/i.test(clean);
  const hasPhone = /(\+?\d[\d\s-]{8,}\d)/.test(clean);
  const foundSections = SECTION_HEADERS.filter((s) => lower.includes(s));
  const bulletCount = (clean.match(/(^|\n)\s*[•\-*]/g) || []).length;
  const verbHits = ACTION_VERBS.filter((v) => lower.includes(v));
  const quantHits = (clean.match(/(\d+%|₹\s?\d|\$\s?\d|\d+\s?(lpa|lakh|crore|hours|days|months|years|clients|agents))/gi) || []).length;

  const domainMatches: { domain: string; hits: string[] }[] = [];
  Object.entries(DOMAIN_KEYWORDS).forEach(([domain, words]) => {
    const hits = words.filter((w) => lower.includes(w));
    if (hits.length) domainMatches.push({ domain, hits });
  });

  let score = 0;
  score += hasEmail ? 8 : 0;
  score += hasPhone ? 7 : 0;
  score += Math.min(foundSections.length, 5) * 6;
  score += Math.min(bulletCount, 8) * 2.5;
  score += Math.min(verbHits.length, 8) * 2;
  score += Math.min(quantHits, 6) * 2.5;
  score += domainMatches.length ? Math.min(domainMatches.reduce((a, d) => a + d.hits.length, 0), 4) * 2 : 0;
  score += wordCount >= 250 && wordCount <= 900 ? 4 : 0;
  score = Math.max(8, Math.min(97, Math.round(score)));

  const missingSections = SECTION_HEADERS.filter((s) => !foundSections.includes(s)).slice(0, 3);
  const domainLabel = domainMatches.length ? domainMatches.map((d) => d.domain).join(', ') : 'no specific domain detected';
  const contactNote = hasEmail && hasPhone
    ? 'complete'
    : `incomplete (add ${[!hasEmail && 'email', !hasPhone && 'phone'].filter(Boolean).join(' & ')})`;

  return `ATS Score: ${score}/100 — Word count: ${wordCount}. Contact info: ${contactNote}. Sections found: ${foundSections.length ? foundSections.join(', ') : 'none clearly detected'}. Bullet points: ${bulletCount}. Action verbs used: ${verbHits.length}${verbHits.length ? ` (${verbHits.slice(0, 5).join(', ')})` : ''}. Quantified achievements: ${quantHits}. Domain match: ${domainLabel}.${missingSections.length ? ` Consider adding: ${missingSections.join(', ')}.` : ''}`;
}

function analyzeResume(text: string): string {
  const clean = text.trim();
  if (clean.length < 50) {
    return 'Paste your resume text — or upload a .pdf/.docx/.txt file above — so we can run a structural analysis.';
  }
  const lower = clean.toLowerCase();
  const wordCount = clean.split(/\s+/).filter(Boolean).length;
  const sentences = clean.split(/[.!?]+/).filter((s) => s.trim().length > 2);
  const bulletLines = clean.split('\n').filter((l) => /^\s*[•\-*]/.test(l));
  const quantifiedBullets = bulletLines.filter((l) => /\d/.test(l));
  const foundSections = SECTION_HEADERS.filter((s) => lower.includes(s));
  const missing = SECTION_HEADERS.filter((s) => !foundSections.includes(s));
  const avgSentenceLen = sentences.length ? Math.round(wordCount / sentences.length) : 0;
  const weakPhrases = ['responsible for', 'worked on', 'helped with', 'duties included', 'tasked with'];
  const weakHits = weakPhrases.filter((w) => lower.includes(w));
  const quantRate = bulletLines.length ? Math.round((quantifiedBullets.length / bulletLines.length) * 100) : 0;

  const notes: string[] = [];
  notes.push(`Length: ${wordCount} words across ${sentences.length} sentences (avg ${avgSentenceLen} words/sentence).`);
  notes.push(`Sections detected: ${foundSections.length ? foundSections.join(', ') : 'none clearly labeled'}.`);
  if (missing.length) notes.push(`Consider adding: ${missing.slice(0, 3).join(', ')}.`);
  notes.push(`Bullet points: ${bulletLines.length}, of which ${quantifiedBullets.length} (${quantRate}%) include a number or metric.`);
  if (quantRate < 40) notes.push('Add more quantified outcomes (%, ₹, time saved, volume handled) to strengthen impact.');
  if (weakHits.length) notes.push(`Replace passive phrasing found (${weakHits.join(', ')}) with strong action verbs.`);
  if (avgSentenceLen > 28) notes.push('Some lines run long — tighten bullets to under ~20 words for readability.');

  return notes.join(' ');
}

const QUESTION_BANK: Record<string, string[]> = {
  healthcare: [
    'Walk me through how you handle a denied claim from identification to resolution.',
    'How do you ensure HIPAA compliance while processing claims data?',
    'Describe a time you reduced claim processing turnaround time.',
  ],
  insurance: [
    'How do you assess risk when underwriting a new policy?',
    "Explain how you would handle a high-value Lloyd's market claim dispute.",
    'What KPIs do you track in your current claims/underwriting role?',
  ],
  finance: [
    'Walk me through a month-end reconciliation process you have owned.',
    'How do you handle a discrepancy found during an audit?',
    'Describe your approach to variance analysis in budgeting.',
  ],
  bpo: [
    'How do you manage SLA pressure during high call volume periods?',
    'Describe a time you improved a process that boosted team efficiency.',
    'How do you handle an escalated, dissatisfied customer?',
  ],
  generic: [
    'Tell me about a challenge you faced in your current role and how you resolved it.',
    'Why are you looking to make a move at this point in your career?',
    'Describe a time you exceeded a target or KPI.',
  ],
};

function generateInterviewQuestions(input: string): string {
  const clean = input.trim();
  if (!clean) {
    return 'Enter a job title, company, or domain (e.g. "US Healthcare Claims Analyst") so we can tailor real interview questions.';
  }
  const lower = clean.toLowerCase();
  let pool = QUESTION_BANK.generic;
  let domainLabel = 'general professional';

  if (/(claim|healthcare|medical|icd|cpt|denial)/.test(lower)) {
    pool = QUESTION_BANK.healthcare;
    domainLabel = 'US Healthcare Claims';
  } else if (/(insur|underwrit|lloyd|policy|premium)/.test(lower)) {
    pool = QUESTION_BANK.insurance;
    domainLabel = 'Insurance & Underwriting';
  } else if (/(financ|account|audit|reconcil|budget)/.test(lower)) {
    pool = QUESTION_BANK.finance;
    domainLabel = 'Finance & Accounts';
  } else if (/(bpo|kpo|call cent|customer service|operations)/.test(lower)) {
    pool = QUESTION_BANK.bpo;
    domainLabel = 'BPO/KPO Operations';
  }

  const behavioral = 'Tell me about a time you dealt with a tight deadline under pressure — what was your approach? (STAR format recommended)';
  const questions = [...pool, behavioral].slice(0, 5);
  const numbered = questions.map((q, i) => `${i + 1}. ${q}`).join(' ');
  return `${questions.length} questions generated for ${domainLabel}: ${numbered}`;
}

const SALARY_BASE: Record<string, number> = {
  healthcare: 4.8, insurance: 5.2, finance: 5.0, bpo: 3.6, generic: 4.0,
};
const CITY_MULTIPLIER: Record<string, number> = {
  noida: 1.05, delhi: 1.1, gurugram: 1.12, gurgaon: 1.12, mumbai: 1.2, bangalore: 1.18,
  bengaluru: 1.18, pune: 1.08, hyderabad: 1.1, chennai: 1.05, kolkata: 0.92,
};

function estimateSalary(input: string): string {
  const clean = input.trim();
  if (!clean) {
    return 'Enter role, years of experience, and location (e.g. "Senior Claims Analyst, 4 years, Noida") so we can compute a real range.';
  }
  const lower = clean.toLowerCase();
  const expMatch = lower.match(/(\d+(\.\d+)?)\s*(\+)?\s*(yrs?|years?)/);
  const years = expMatch ? parseFloat(expMatch[1]) : 1;

  let domain = 'generic';
  if (/(claim|healthcare|medical)/.test(lower)) domain = 'healthcare';
  else if (/(insur|underwrit)/.test(lower)) domain = 'insurance';
  else if (/(financ|account)/.test(lower)) domain = 'finance';
  else if (/(bpo|kpo|call cent|operations)/.test(lower)) domain = 'bpo';

  const city = Object.keys(CITY_MULTIPLIER).find((c) => lower.includes(c));
  const cityMultiplier = city ? CITY_MULTIPLIER[city] : 1;
  const seniorityMultiplier = /senior|lead|manager/.test(lower) ? 1.25 : /junior|associate|fresher/.test(lower) ? 0.85 : 1;

  const base = SALARY_BASE[domain];
  const expMultiplier = 1 + Math.min(years, 10) * 0.13;
  const low = +(base * expMultiplier * cityMultiplier * seniorityMultiplier * 0.88).toFixed(1);
  const high = +(base * expMultiplier * cityMultiplier * seniorityMultiplier * 1.18).toFixed(1);
  const cityLabel = city ? city.charAt(0).toUpperCase() + city.slice(1) : null;

  return `Estimated range: ₹${low} – ₹${high} LPA for a ${domain !== 'generic' ? domain : 'general'} profile with ~${years} yrs experience${cityLabel ? ` in ${cityLabel}` : ''}. Based on domain base rate, experience curve, and location cost-of-living multiplier.`;
}

const CAREER_LADDERS: Record<string, string[]> = {
  healthcare: ['Claims Associate', 'Claims Analyst', 'Senior Claims Analyst', 'Claims Team Lead', 'Claims Manager'],
  insurance: ['Underwriting Associate', 'Underwriter', 'Senior Underwriter', 'Underwriting Team Lead', 'Underwriting Manager'],
  finance: ['Accounts Executive', 'Senior Accounts Executive', 'Finance Analyst', 'Finance Team Lead', 'Finance Manager'],
  bpo: ['Process Associate', 'Senior Process Associate', 'Team Lead', 'Assistant Manager - Operations', 'Operations Manager'],
  generic: ['Associate', 'Senior Associate', 'Team Lead', 'Manager', 'Senior Manager'],
};

function buildCareerPath(input: string): string {
  const clean = input.trim();
  if (!clean) {
    return 'Describe your current role and where you want to be in 12–24 months so we can map a real path.';
  }
  const lower = clean.toLowerCase();
  let domain = 'generic';
  if (/(claim|healthcare|medical)/.test(lower)) domain = 'healthcare';
  else if (/(insur|underwrit)/.test(lower)) domain = 'insurance';
  else if (/(financ|account)/.test(lower)) domain = 'finance';
  else if (/(bpo|kpo|call cent|operations)/.test(lower)) domain = 'bpo';

  const ladder = CAREER_LADDERS[domain];
  let currentIndex = 0;
  if (/manager/.test(lower)) currentIndex = 3;
  else if (/lead/.test(lower)) currentIndex = 2;
  else if (/senior/.test(lower)) currentIndex = 1;

  const nextSteps = ladder.slice(currentIndex + 1, currentIndex + 3);
  const currentRole = ladder[currentIndex];

  return `Detected current level: ${currentRole} (${domain} track). Suggested next steps: ${nextSteps.length ? nextSteps.join(' → ') : 'you are near the top of this ladder — consider a lateral domain move or people-management track'}. Recommended actions: strengthen quantified achievements on your resume, complete 2–3 mock interviews, and pursue 1–2 warm referrals in the next quarter.`;
}

const COUNTRY_THRESHOLDS: Record<string, number> = {
  uk: 60, germany: 65, france: 55, dubai: 50, uae: 50, canada: 65, australia: 60, singapore: 70,
};

function checkEligibility(input: string): string {
  const clean = input.trim();
  if (!clean) {
    return 'Enter your degree, GPA/percentage, target country, and intake so we can check real eligibility thresholds.';
  }
  const lower = clean.toLowerCase();
  const pctMatch = lower.match(/(\d{2,3}(\.\d+)?)\s*%/);
  const gpaMatch = lower.match(/(\d(\.\d{1,2})?)\s*(cgpa|gpa)/);
  let percentage: number | null = null;
  if (pctMatch) percentage = parseFloat(pctMatch[1]);
  else if (gpaMatch) percentage = parseFloat(gpaMatch[1]) * 10;

  const country = Object.keys(COUNTRY_THRESHOLDS).find((c) => lower.includes(c));
  const threshold = country ? COUNTRY_THRESHOLDS[country] : null;

  if (!percentage) {
    return `Please include your percentage or CGPA (e.g. "72%" or "7.5 CGPA") so we can compare against ${country ? country.toUpperCase() : 'destination'} entry thresholds.`;
  }
  if (!country || !threshold) {
    return `Detected academic score: ${percentage}%. Please mention a target country (UK, Germany, France, Dubai, Canada, Australia, or Singapore) for a precise threshold comparison.`;
  }

  return percentage >= threshold
    ? `Eligible — your ${percentage}% clears the typical ${threshold}%+ requirement for ${country.toUpperCase()} postgraduate programmes.`
    : `Below typical threshold — ${country.toUpperCase()} programmes generally look for ${threshold}%+, and you're at ${percentage}%. A strong SOP, relevant work experience, or a foundation year could still make you competitive.`;
}

const UNIVERSITIES = [
  { name: 'University of Manchester', country: 'uk', programme: 'business', budgetLPA: 28 },
  { name: 'Aston University', country: 'uk', programme: 'business', budgetLPA: 22 },
  { name: 'University of Sheffield', country: 'uk', programme: 'engineering', budgetLPA: 24 },
  { name: 'ESSEC Business School', country: 'france', programme: 'business', budgetLPA: 26 },
  { name: 'EM Lyon', country: 'france', programme: 'business', budgetLPA: 24 },
  { name: 'TU Munich', country: 'germany', programme: 'engineering', budgetLPA: 8 },
  { name: 'RWTH Aachen', country: 'germany', programme: 'engineering', budgetLPA: 7 },
  { name: 'University of Wollongong Dubai', country: 'dubai', programme: 'business', budgetLPA: 18 },
  { name: 'Heriot-Watt Dubai', country: 'dubai', programme: 'engineering', budgetLPA: 16 },
  { name: 'University of Toronto', country: 'canada', programme: 'business', budgetLPA: 32 },
  { name: 'University of Melbourne', country: 'australia', programme: 'business', budgetLPA: 30 },
  { name: 'NUS Singapore', country: 'singapore', programme: 'business', budgetLPA: 27 },
];

function matchUniversities(input: string): string {
  const clean = input.trim();
  if (!clean) {
    return 'Enter programme interest, budget range, and preferred countries so we can filter real matches.';
  }
  const lower = clean.toLowerCase();
  const budgetMatch = lower.match(/(\d{1,3})\s*(lpa|lakh)/);
  const budget = budgetMatch ? parseFloat(budgetMatch[1]) : null;
  const programme = /engineer/.test(lower) ? 'engineering' : /business|mba|management/.test(lower) ? 'business' : null;
  const countries = Object.keys(COUNTRY_THRESHOLDS).filter((c) => lower.includes(c));

  let matches = UNIVERSITIES.filter((u) => {
    const countryOk = countries.length ? countries.includes(u.country) : true;
    const programmeOk = programme ? u.programme === programme : true;
    const budgetOk = budget ? u.budgetLPA <= budget * 1.15 : true;
    return countryOk && programmeOk && budgetOk;
  });

  if (!matches.length) {
    matches = UNIVERSITIES.filter((u) => (countries.length ? countries.includes(u.country) : true)).slice(0, 4);
  }

  const list = matches.slice(0, 6).map((u) => `${u.name} (${u.country.toUpperCase()}, ~₹${u.budgetLPA}L total cost)`).join(', ');
  return `${matches.length} universities matched: ${list || 'No exact matches — try broadening your budget or country.'}`;
}

const SOP_CLICHES = ['since childhood', 'passion for', 'from a young age', 'always dreamed', "in today's world", 'i am writing this'];

function analyzeSop(input: string): string {
  const clean = input.trim();
  if (clean.length < 80) {
    return 'Paste your draft SOP (at least a paragraph) so we can give real, text-based feedback.';
  }
  const lower = clean.toLowerCase();
  const wordCount = clean.split(/\s+/).filter(Boolean).length;
  const paragraphs = clean.split(/\n\s*\n/).filter(Boolean);
  const clicheHits = SOP_CLICHES.filter((c) => lower.includes(c));
  const mentionsGoals = /(goal|aspir|aim to|plan to|career objective)/.test(lower);
  const mentionsWhyUniversity = /(why i (chose|am applying)|this university|this programme|this program)/.test(lower);
  const mentionsFuture = /(after (graduat|completing)|post-study|upon completion|return to)/.test(lower);

  const notes: string[] = [];
  notes.push(`Length: ${wordCount} words across ${paragraphs.length || 1} paragraph(s).`);
  if (wordCount < 400) notes.push('SOPs typically run 500–1000 words — consider expanding your narrative.');
  if (wordCount > 1200) notes.push('This is on the longer side — tighten to keep the admissions reader engaged.');
  if (clicheHits.length) notes.push(`Remove generic openers found: "${clicheHits.join('", "')}" — replace with a specific moment or achievement.`);
  notes.push(mentionsGoals ? 'Career goals are clearly stated.' : 'Career goals are not clearly stated — add a specific objective.');
  notes.push(mentionsWhyUniversity ? 'Good — you explain why this university/programme.' : 'Add a paragraph on why this specific university/programme fits your goals.');
  notes.push(mentionsFuture ? 'Closing ties to post-study plans — good.' : 'Add a closing line connecting the degree to your future plans.');

  return notes.join(' ');
}

function computeToolResult(tool: Tool, input: string): string {
  switch (tool.id) {
    case 'ats': return analyzeAts(input);
    case 'resume': return analyzeResume(input);
    case 'interview': return generateInterviewQuestions(input);
    case 'salary': return estimateSalary(input);
    case 'career-path': return buildCareerPath(input);
    case 'eligibility': return checkEligibility(input);
    case 'university': return matchUniversities(input);
    case 'sop': return analyzeSop(input);
    default: return 'Analysis complete.';
  }
}

/* ---------- rotating headline banner (unchanged) ---------- */

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
  const [resultText, setResultText] = useState('');

  const [isExtracting, setIsExtracting] = useState(false);
  const [fileName, setFileName] = useState('');
  const [fileError, setFileError] = useState('');

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

  const typedResult = useTypewriter(resultText, phase === 'done');

  const runTool = useCallback(() => {
    if (!active) return;
    setPhase('loading');
    window.setTimeout(() => {
      const computed = computeToolResult(active, input);
      setResultText(computed);
      setPhase('done');
    }, 900);
  }, [active, input]);

  const handleFileUpload = useCallback(async (file: File) => {
    setFileError('');
    setFileName(file.name);
    setIsExtracting(true);
    try {
      const text = await extractTextFromFile(file);
      if (!text || text.trim().length < 20) {
        throw new Error('Could not extract readable text from this file. Please paste your resume text instead.');
      }
      setInput(text);
    } catch (err: any) {
      setFileError(err?.message || 'Could not read this file. Please paste your resume text instead.');
    } finally {
      setIsExtracting(false);
    }
  }, []);

  const openTool = (tool: Tool) => {
    setActiveId(tool.id);
    setInput('');
    setPhase('idle');
    setResultText('');
    setFileName('');
    setFileError('');
  };

  const closePanel = () => {
    setActiveId(null);
    setPhase('idle');
    setInput('');
    setResultText('');
    setFileName('');
    setFileError('');
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
              borderRadius: '999px',
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
                    borderRadius: '999px',
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
                        style={{ marginLeft: '2px' }}
                      />
                    )}
                  </motion.button>
                );
              })}
            </div>

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
              style={{ overflow: 'hidden' }}
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
                  onFileUpload={handleFileUpload}
                  isExtracting={isExtracting}
                  fileName={fileName}
                  fileError={fileError}
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
  onFileUpload,
  isExtracting,
  fileName,
  fileError,
}: {
  active: Tool | null;
  accent: Accent;
  input: string;
  setInput: (v: string) => void;
  phase: 'idle' | 'loading' | 'done';
  typedResult: string;
  runTool: () => void;
  closePanel: () => void;
  onFileUpload: (file: File) => void;
  isExtracting: boolean;
  fileName: string;
  fileError: string;
}) {
  if (!active) return null;

  const supportsUpload = UPLOAD_ENABLED_IDS.includes(active.id);

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

      {supportsUpload && (
        <div style={{ marginBottom: '14px' }}>
          <input
            type="file"
            id={`resume-upload-${active.id}`}
            accept=".pdf,.doc,.docx,.txt"
            style={{ display: 'none' }}
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) onFileUpload(file);
              e.target.value = '';
            }}
          />
          <label
            htmlFor={`resume-upload-${active.id}`}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              padding: '9px 16px',
              borderRadius: '999px',
              border: `1.5px dashed ${accent.from}55`,
              background: accent.soft,
              color: accent.from,
              fontSize: '13px',
              fontWeight: 600,
              cursor: isExtracting ? 'wait' : 'pointer',
              transition: 'border-color 0.25s ease, background 0.25s ease',
            }}
          >
            <Upload size={15} strokeWidth={2.25} aria-hidden />
            {isExtracting
              ? 'Reading file…'
              : fileName
              ? `Uploaded: ${fileName}`
              : 'Upload Resume (.pdf, .docx, .txt)'}
          </label>
          {fileError && (
            <p style={{ fontSize: '12px', color: '#dc2626', marginTop: '6px', lineHeight: 1.5 }}>
              {fileError}
            </p>
          )}
        </div>
      )}

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