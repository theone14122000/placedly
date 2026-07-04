'use client';

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
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

/* ─────────────────────────────────────────────────────────
   DESIGN SYSTEM TOKENS
───────────────────────────────────────────────────────── */
const GEOM_FONT = `'Inter','Manrope','Geist','Plus Jakarta Sans',system-ui,sans-serif`;

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
type Accent = { from: string; soft: string };

/* ── Solid accent per category (no gradients) ── */
const CATEGORY_META: Record<Category | 'all', { label: string } & Accent> = {
  all:    { label: 'All Tools',       from: '#2563eb', soft: 'rgba(37,99,235,0.07)'  },
  career: { label: 'Career & Resume', from: '#2563eb', soft: 'rgba(37,99,235,0.07)'  },
  study:  { label: 'Study Abroad',    from: '#0891b2', soft: 'rgba(8,145,178,0.07)'  },
};

const TOOLS: Tool[] = [
  {
    id: 'ats', title: 'ATS Resume Score Checker',
    description: 'Instant AI scan for keyword match, formatting, and ATS readability.',
    Icon: FileSearch, placeholder: 'Paste your resume text or upload a file below…',
    cta: 'Check ATS Score',
    sampleResult: 'ATS Score: 82/100 — Strong keyword alignment for Claims Analyst roles.',
    category: 'career', popular: true,
  },
  {
    id: 'resume', title: 'Resume Analyzer',
    description: 'Deep AI review of impact, clarity, and role positioning.',
    Icon: FileText, placeholder: 'Paste your resume text or upload a file below…',
    cta: 'Analyze Resume',
    sampleResult: 'Priority fixes: lead with quantified outcomes, tighten summary to 3 lines.',
    category: 'career',
  },
  {
    id: 'interview', title: 'Interview Question Generator',
    description: 'Role-specific questions with suggested answer frameworks.',
    Icon: MessageSquare, placeholder: 'Enter job title, company, or domain…',
    cta: 'Generate Questions',
    sampleResult: '5 questions ready — including denial management scenario and STAR prompt.',
    category: 'career',
  },
  {
    id: 'salary', title: 'Salary Estimator',
    description: 'Market-informed CTC ranges for your profile and city.',
    Icon: Calculator, placeholder: 'Role, years of experience, and location…',
    cta: 'Estimate Salary',
    sampleResult: 'Estimated range: ₹6.8 – ₹9.4 LPA for Senior Claims Analyst in NCR.',
    category: 'career', popular: true,
  },
  {
    id: 'career-path', title: 'Career Path Advisor',
    description: 'AI roadmap from your current role to your next milestone.',
    Icon: Target, placeholder: 'Where you are today and where you want to be…',
    cta: 'Build Roadmap',
    sampleResult: 'Suggested path: Analyst → Senior Analyst → Team Lead.',
    category: 'career',
  },
  {
    id: 'eligibility', title: 'Study Abroad Eligibility Checker',
    description: 'Quick read on academic fit, intake windows, and budget band.',
    Icon: GraduationCap, placeholder: 'Degree, GPA/percentage, target country, and intake…',
    cta: 'Check Eligibility',
    sampleResult: 'Strong fit for UK & Germany MSc programmes in Business / Analytics.',
    category: 'study', popular: true,
  },
  {
    id: 'university', title: 'University Match Tool',
    description: 'AI shortlist aligned to profile, budget, and career goals.',
    Icon: Sparkles, placeholder: 'Programme interest, budget range, and preferred countries…',
    cta: 'Match Universities',
    sampleResult: '8 universities matched — including Manchester, Aston, and ESSEC.',
    category: 'study',
  },
  {
    id: 'sop', title: 'SOP Assistant',
    description: 'Structure, tone, and differentiation guidance for your statement.',
    Icon: PenLine, placeholder: 'Paste a draft SOP or bullet your background and goals…',
    cta: 'Improve SOP',
    sampleResult: 'Opening hook strengthened, career pivot clarified.',
    category: 'study',
  },
];

const FILTERS: (Category | 'all')[] = ['all', 'career', 'study'];
const UPLOAD_ENABLED_IDS = ['ats', 'resume'];

const HEADLINE_WORDS: { text: string; dwell: number }[] = [
  { text: 'Grow Career.', dwell: 1400 },
  { text: 'Go Global.',   dwell: 1400 },
  { text: 'Go Placedly.', dwell: 2200 },
];

/* ── helpers ── */
function useIsMobile(bp = 900) {
  const [v, setV] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia(`(max-width:${bp}px)`);
    const fn = () => setV(mq.matches);
    fn(); mq.addEventListener('change', fn);
    return () => mq.removeEventListener('change', fn);
  }, [bp]);
  return v;
}

function useTypewriter(text: string, active: boolean, speed = 10) {
  const [out, setOut] = useState('');
  useEffect(() => {
    if (!active || !text) { setOut(''); return; }
    let i = 0; setOut('');
    const id = window.setInterval(() => {
      i += 2; setOut(text.slice(0, i));
      if (i >= text.length) clearInterval(id);
    }, speed);
    return () => clearInterval(id);
  }, [text, active, speed]);
  return out;
}

/* ── file extraction (unchanged logic) ── */
function loadScriptOnce(src: string): Promise<void> {
  return new Promise((res, rej) => {
    if (document.querySelector(`script[data-loaded-src="${src}"]`)) { res(); return; }
    const s = document.createElement('script');
    s.src = src; s.async = true; s.dataset.loadedSrc = src;
    s.onload = () => res(); s.onerror = () => rej(new Error('Failed to load library.'));
    document.body.appendChild(s);
  });
}
async function extractPdfText(file: File): Promise<string> {
  await loadScriptOnce('https://cdn.jsdelivr.net/npm/pdfjs-dist@3.11.174/legacy/build/pdf.min.js');
  const lib = (window as any).pdfjsLib;
  lib.GlobalWorkerOptions.workerSrc = 'https://cdn.jsdelivr.net/npm/pdfjs-dist@3.11.174/legacy/build/pdf.worker.min.js';
  const pdf = await lib.getDocument({ data: await file.arrayBuffer() }).promise;
  let t = '';
  for (let i = 1; i <= pdf.numPages; i++) {
    const page = await pdf.getPage(i);
    const c = await page.getTextContent();
    t += c.items.map((x: any) => x.str).join(' ') + '\n';
  }
  return t.trim();
}
async function extractDocxText(file: File): Promise<string> {
  await loadScriptOnce('https://cdn.jsdelivr.net/npm/mammoth@1.6.0/mammoth.browser.min.js');
  const m = (window as any).mammoth;
  return ((await m.extractRawText({ arrayBuffer: await file.arrayBuffer() })).value as string).trim();
}
async function extractTextFromFile(file: File): Promise<string> {
  if (file.size > 8 * 1024 * 1024) throw new Error('File is too large (max 8MB).');
  const n = file.name.toLowerCase();
  if (file.type === 'text/plain' || n.endsWith('.txt')) return (await file.text()).trim();
  if (file.type === 'application/pdf' || n.endsWith('.pdf')) return extractPdfText(file);
  if (n.endsWith('.docx')) return extractDocxText(file);
  if (n.endsWith('.doc')) throw new Error('Legacy .doc not supported — save as .docx or .pdf.');
  const t = await file.text().catch(() => '');
  if (t && /[a-zA-Z]{20,}/.test(t)) return t.trim();
  throw new Error('Unsupported format. Please upload .pdf, .docx, or .txt.');
}

/* ── analysis engines (unchanged logic) ── */
const ACTION_VERBS = ['managed','led','built','created','improved','increased','reduced','achieved','developed','implemented','designed','coordinated','negotiated','resolved','streamlined','automated','delivered','launched','trained','mentored','analyzed','optimized','generated','processed','handled','executed','supervised','drove','spearheaded','collaborated'];
const DOMAIN_KEYWORDS: Record<string,string[]> = {
  healthcare: ['claims','icd-10','cpt','denial','healthcare','medical billing','prior authorization','hipaa'],
  insurance:  ['insurance','underwriting','policy','premium',"lloyd's",'reinsurance','actuarial','claims adjuster'],
  finance:    ['accounts','reconciliation','audit','gaap','forecasting','budgeting','accounts payable','accounts receivable'],
  bpo:        ['bpo','kpo','call center','call centre','customer service','sla','process improvement'],
};
const SECTION_HEADERS = ['summary','objective','experience','work experience','education','skills','certifications','projects','achievements'];

function analyzeAts(text: string): string {
  const clean = text.trim();
  if (clean.length < 50) return 'Paste at least a few sentences of resume content — or upload a file above — to generate an accurate ATS score.';
  const lower = clean.toLowerCase();
  const wordCount = clean.split(/\s+/).filter(Boolean).length;
  const hasEmail = /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}/i.test(clean);
  const hasPhone = /(\+?\d[\d\s-]{8,}\d)/.test(clean);
  const foundSections = SECTION_HEADERS.filter(s => lower.includes(s));
  const bulletCount = (clean.match(/(^|\n)\s*[•\-*]/g)||[]).length;
  const verbHits = ACTION_VERBS.filter(v => lower.includes(v));
  const quantHits = (clean.match(/(\d+%|₹\s?\d|\$\s?\d|\d+\s?(lpa|lakh|crore|hours|days|months|years|clients|agents))/gi)||[]).length;
  const domainMatches: {domain:string;hits:string[]}[] = [];
  Object.entries(DOMAIN_KEYWORDS).forEach(([domain,words]) => {
    const hits = words.filter(w => lower.includes(w));
    if (hits.length) domainMatches.push({domain,hits});
  });
  let score = 0;
  score += hasEmail?8:0; score += hasPhone?7:0;
  score += Math.min(foundSections.length,5)*6;
  score += Math.min(bulletCount,8)*2.5;
  score += Math.min(verbHits.length,8)*2;
  score += Math.min(quantHits,6)*2.5;
  score += domainMatches.length?Math.min(domainMatches.reduce((a,d)=>a+d.hits.length,0),4)*2:0;
  score += wordCount>=250&&wordCount<=900?4:0;
  score = Math.max(8,Math.min(97,Math.round(score)));
  const missing = SECTION_HEADERS.filter(s=>!foundSections.includes(s)).slice(0,3);
  const domainLabel = domainMatches.length?domainMatches.map(d=>d.domain).join(', '):'no specific domain detected';
  const contactNote = hasEmail&&hasPhone?'complete':`incomplete (add ${[!hasEmail&&'email',!hasPhone&&'phone'].filter(Boolean).join(' & ')})`;
  return `ATS Score: ${score}/100 — Word count: ${wordCount}. Contact info: ${contactNote}. Sections found: ${foundSections.length?foundSections.join(', '):'none clearly detected'}. Bullets: ${bulletCount}. Action verbs: ${verbHits.length}${verbHits.length?` (${verbHits.slice(0,5).join(', ')})`:''}.  Quantified achievements: ${quantHits}. Domain: ${domainLabel}.${missing.length?` Consider adding: ${missing.join(', ')}.`:''}`;
}
function analyzeResume(text: string): string {
  const clean = text.trim();
  if (clean.length < 50) return 'Paste your resume — or upload a file above — so we can run a structural analysis.';
  const lower = clean.toLowerCase();
  const wordCount = clean.split(/\s+/).filter(Boolean).length;
  const sentences = clean.split(/[.!?]+/).filter(s=>s.trim().length>2);
  const bulletLines = clean.split('\n').filter(l=>/^\s*[•\-*]/.test(l));
  const quantifiedBullets = bulletLines.filter(l=>/\d/.test(l));
  const foundSections = SECTION_HEADERS.filter(s=>lower.includes(s));
  const missing = SECTION_HEADERS.filter(s=>!foundSections.includes(s));
  const avgLen = sentences.length?Math.round(wordCount/sentences.length):0;
  const weakPhrases = ['responsible for','worked on','helped with','duties included','tasked with'];
  const weakHits = weakPhrases.filter(w=>lower.includes(w));
  const quantRate = bulletLines.length?Math.round((quantifiedBullets.length/bulletLines.length)*100):0;
  const notes:string[] = [];
  notes.push(`Length: ${wordCount} words across ${sentences.length} sentences (avg ${avgLen} words/sentence).`);
  notes.push(`Sections detected: ${foundSections.length?foundSections.join(', '):'none clearly labeled'}.`);
  if (missing.length) notes.push(`Consider adding: ${missing.slice(0,3).join(', ')}.`);
  notes.push(`Bullet points: ${bulletLines.length}, of which ${quantifiedBullets.length} (${quantRate}%) include a number or metric.`);
  if (quantRate<40) notes.push('Add more quantified outcomes (%, ₹, time saved, volume) to strengthen impact.');
  if (weakHits.length) notes.push(`Replace passive phrasing (${weakHits.join(', ')}) with strong action verbs.`);
  if (avgLen>28) notes.push('Tighten bullets to under ~20 words for readability.');
  return notes.join(' ');
}
const QUESTION_BANK:Record<string,string[]> = {
  healthcare:['Walk me through how you handle a denied claim from identification to resolution.','How do you ensure HIPAA compliance while processing claims data?','Describe a time you reduced claim processing turnaround time.'],
  insurance:['How do you assess risk when underwriting a new policy?',"Explain how you would handle a high-value Lloyd's market claim dispute.",'What KPIs do you track in your current claims/underwriting role?'],
  finance:['Walk me through a month-end reconciliation process you have owned.','How do you handle a discrepancy found during an audit?','Describe your approach to variance analysis in budgeting.'],
  bpo:['How do you manage SLA pressure during high call volume periods?','Describe a time you improved a process that boosted team efficiency.','How do you handle an escalated, dissatisfied customer?'],
  generic:['Tell me about a challenge you faced in your current role and how you resolved it.','Why are you looking to make a move at this point in your career?','Describe a time you exceeded a target or KPI.'],
};
function generateInterviewQuestions(input: string): string {
  const clean = input.trim();
  if (!clean) return 'Enter a job title, company, or domain so we can tailor real interview questions.';
  const lower = clean.toLowerCase();
  let pool = QUESTION_BANK.generic; let domainLabel = 'general professional';
  if (/(claim|healthcare|medical|icd|cpt|denial)/.test(lower)) { pool=QUESTION_BANK.healthcare; domainLabel='US Healthcare Claims'; }
  else if (/(insur|underwrit|lloyd|policy|premium)/.test(lower)) { pool=QUESTION_BANK.insurance; domainLabel='Insurance & Underwriting'; }
  else if (/(financ|account|audit|reconcil|budget)/.test(lower)) { pool=QUESTION_BANK.finance; domainLabel='Finance & Accounts'; }
  else if (/(bpo|kpo|call cent|customer service|operations)/.test(lower)) { pool=QUESTION_BANK.bpo; domainLabel='BPO/KPO Operations'; }
  const questions = [...pool,'Tell me about a time you dealt with a tight deadline under pressure — STAR format recommended.'].slice(0,5);
  return `${questions.length} questions for ${domainLabel}: ${questions.map((q,i)=>`${i+1}. ${q}`).join(' ')}`;
}
const SALARY_BASE:Record<string,number> = {healthcare:4.8,insurance:5.2,finance:5.0,bpo:3.6,generic:4.0};
const CITY_MULTIPLIER:Record<string,number> = {noida:1.05,delhi:1.1,gurugram:1.12,gurgaon:1.12,mumbai:1.2,bangalore:1.18,bengaluru:1.18,pune:1.08,hyderabad:1.1,chennai:1.05,kolkata:0.92};
function estimateSalary(input: string): string {
  const clean = input.trim();
  if (!clean) return 'Enter role, years of experience, and location (e.g. "Senior Claims Analyst, 4 years, Noida").';
  const lower = clean.toLowerCase();
  const expMatch = lower.match(/(\d+(\.\d+)?)\s*(\+)?\s*(yrs?|years?)/);
  const years = expMatch?parseFloat(expMatch[1]):1;
  let domain = 'generic';
  if (/(claim|healthcare|medical)/.test(lower)) domain='healthcare';
  else if (/(insur|underwrit)/.test(lower)) domain='insurance';
  else if (/(financ|account)/.test(lower)) domain='finance';
  else if (/(bpo|kpo|call cent|operations)/.test(lower)) domain='bpo';
  const city = Object.keys(CITY_MULTIPLIER).find(c=>lower.includes(c));
  const cm = city?CITY_MULTIPLIER[city]:1;
  const sm = /senior|lead|manager/.test(lower)?1.25:/junior|associate|fresher/.test(lower)?0.85:1;
  const base = SALARY_BASE[domain];
  const em = 1+Math.min(years,10)*0.13;
  const low = +(base*em*cm*sm*0.88).toFixed(1);
  const high = +(base*em*cm*sm*1.18).toFixed(1);
  const cityLabel = city?city.charAt(0).toUpperCase()+city.slice(1):null;
  return `Estimated range: ₹${low} – ₹${high} LPA for a ${domain!=='generic'?domain:'general'} profile with ~${years} yrs experience${cityLabel?` in ${cityLabel}`:''}.`;
}
const CAREER_LADDERS:Record<string,string[]> = {
  healthcare:['Claims Associate','Claims Analyst','Senior Claims Analyst','Claims Team Lead','Claims Manager'],
  insurance:['Underwriting Associate','Underwriter','Senior Underwriter','Underwriting Team Lead','Underwriting Manager'],
  finance:['Accounts Executive','Senior Accounts Executive','Finance Analyst','Finance Team Lead','Finance Manager'],
  bpo:['Process Associate','Senior Process Associate','Team Lead','Assistant Manager - Operations','Operations Manager'],
  generic:['Associate','Senior Associate','Team Lead','Manager','Senior Manager'],
};
function buildCareerPath(input: string): string {
  const clean = input.trim();
  if (!clean) return 'Describe your current role and where you want to be in 12–24 months.';
  const lower = clean.toLowerCase();
  let domain = 'generic';
  if (/(claim|healthcare|medical)/.test(lower)) domain='healthcare';
  else if (/(insur|underwrit)/.test(lower)) domain='insurance';
  else if (/(financ|account)/.test(lower)) domain='finance';
  else if (/(bpo|kpo|call cent|operations)/.test(lower)) domain='bpo';
  const ladder = CAREER_LADDERS[domain];
  let ci = /manager/.test(lower)?3:/lead/.test(lower)?2:/senior/.test(lower)?1:0;
  const next = ladder.slice(ci+1,ci+3);
  return `Current level: ${ladder[ci]} (${domain} track). Next steps: ${next.length?next.join(' → '):'Consider a lateral move or people-management track'}. Recommended actions: strengthen quantified achievements, complete 2–3 mock interviews, and pursue 1–2 warm referrals.`;
}
const COUNTRY_THRESHOLDS:Record<string,number> = {uk:60,germany:65,france:55,dubai:50,uae:50,canada:65,australia:60,singapore:70};
function checkEligibility(input: string): string {
  const clean = input.trim();
  if (!clean) return 'Enter your degree, GPA/percentage, target country, and intake.';
  const lower = clean.toLowerCase();
  const pct = lower.match(/(\d{2,3}(\.\d+)?)\s*%/);
  const gpa = lower.match(/(\d(\.\d{1,2})?)\s*(cgpa|gpa)/);
  let percentage: number|null = pct?parseFloat(pct[1]):gpa?parseFloat(gpa[1])*10:null;
  const country = Object.keys(COUNTRY_THRESHOLDS).find(c=>lower.includes(c));
  const threshold = country?COUNTRY_THRESHOLDS[country]:null;
  if (!percentage) return `Please include your percentage or CGPA so we can compare against ${country?country.toUpperCase():'destination'} entry thresholds.`;
  if (!country||!threshold) return `Detected academic score: ${percentage}%. Please mention a target country (UK, Germany, France, Dubai, Canada, Australia, or Singapore).`;
  return percentage>=threshold
    ?`Eligible — your ${percentage}% clears the typical ${threshold}%+ requirement for ${country.toUpperCase()} postgraduate programmes.`
    :`Below typical threshold — ${country.toUpperCase()} programmes generally look for ${threshold}%+, you're at ${percentage}%. A strong SOP or relevant work experience could still make you competitive.`;
}
const UNIVERSITIES = [
  {name:'University of Manchester',country:'uk',programme:'business',budgetLPA:28},
  {name:'Aston University',country:'uk',programme:'business',budgetLPA:22},
  {name:'University of Sheffield',country:'uk',programme:'engineering',budgetLPA:24},
  {name:'ESSEC Business School',country:'france',programme:'business',budgetLPA:26},
  {name:'EM Lyon',country:'france',programme:'business',budgetLPA:24},
  {name:'TU Munich',country:'germany',programme:'engineering',budgetLPA:8},
  {name:'RWTH Aachen',country:'germany',programme:'engineering',budgetLPA:7},
  {name:'University of Wollongong Dubai',country:'dubai',programme:'business',budgetLPA:18},
  {name:'Heriot-Watt Dubai',country:'dubai',programme:'engineering',budgetLPA:16},
  {name:'University of Toronto',country:'canada',programme:'business',budgetLPA:32},
  {name:'University of Melbourne',country:'australia',programme:'business',budgetLPA:30},
  {name:'NUS Singapore',country:'singapore',programme:'business',budgetLPA:27},
];
function matchUniversities(input: string): string {
  const clean = input.trim();
  if (!clean) return 'Enter programme interest, budget range, and preferred countries.';
  const lower = clean.toLowerCase();
  const budgetMatch = lower.match(/(\d{1,3})\s*(lpa|lakh)/);
  const budget = budgetMatch?parseFloat(budgetMatch[1]):null;
  const programme = /engineer/.test(lower)?'engineering':/business|mba|management/.test(lower)?'business':null;
  const countries = Object.keys(COUNTRY_THRESHOLDS).filter(c=>lower.includes(c));
  let matches = UNIVERSITIES.filter(u=>{
    const cOk = countries.length?countries.includes(u.country):true;
    const pOk = programme?u.programme===programme:true;
    const bOk = budget?u.budgetLPA<=budget*1.15:true;
    return cOk&&pOk&&bOk;
  });
  if (!matches.length) matches = UNIVERSITIES.filter(u=>countries.length?countries.includes(u.country):true).slice(0,4);
  const list = matches.slice(0,6).map(u=>`${u.name} (${u.country.toUpperCase()}, ~₹${u.budgetLPA}L total cost)`).join(', ');
  return `${matches.length} universities matched: ${list||'No exact matches — try broadening budget or country.'}`;
}
const SOP_CLICHES = ['since childhood','passion for','from a young age','always dreamed',"in today's world",'i am writing this'];
function analyzeSop(input: string): string {
  const clean = input.trim();
  if (clean.length < 80) return 'Paste your draft SOP (at least a paragraph) so we can give real, text-based feedback.';
  const lower = clean.toLowerCase();
  const wordCount = clean.split(/\s+/).filter(Boolean).length;
  const paragraphs = clean.split(/\n\s*\n/).filter(Boolean);
  const clicheHits = SOP_CLICHES.filter(c=>lower.includes(c));
  const mentionsGoals = /(goal|aspir|aim to|plan to|career objective)/.test(lower);
  const mentionsWhy = /(why i (chose|am applying)|this university|this programme|this program)/.test(lower);
  const mentionsFuture = /(after (graduat|completing)|post-study|upon completion|return to)/.test(lower);
  const notes:string[] = [];
  notes.push(`Length: ${wordCount} words across ${paragraphs.length||1} paragraph(s).`);
  if (wordCount<400) notes.push('SOPs typically run 500–1000 words — consider expanding.');
  if (wordCount>1200) notes.push('On the longer side — tighten to keep the reader engaged.');
  if (clicheHits.length) notes.push(`Remove generic openers: "${clicheHits.join('", "')}" — replace with a specific moment or achievement.`);
  notes.push(mentionsGoals?'Career goals are clearly stated.':'Career goals not clearly stated — add a specific objective.');
  notes.push(mentionsWhy?'Good — you explain why this university/programme.':'Add a paragraph on why this specific university/programme.');
  notes.push(mentionsFuture?'Closing ties to post-study plans — good.':'Add a closing line connecting the degree to your future plans.');
  return notes.join(' ');
}
function computeToolResult(tool: Tool, input: string): string {
  switch (tool.id) {
    case 'ats':         return analyzeAts(input);
    case 'resume':      return analyzeResume(input);
    case 'interview':   return generateInterviewQuestions(input);
    case 'salary':      return estimateSalary(input);
    case 'career-path': return buildCareerPath(input);
    case 'eligibility': return checkEligibility(input);
    case 'university':  return matchUniversities(input);
    case 'sop':         return analyzeSop(input);
    default:            return 'Analysis complete.';
  }
}

/* ── Rotating headline banner ── */
function RotatingHeadlineBanner() {
  const [index, setIndex] = useState(0);
  const current = HEADLINE_WORDS[index];
  useEffect(() => {
    const id = window.setTimeout(()=>setIndex(i=>(i+1)%HEADLINE_WORDS.length), current.dwell);
    return ()=>clearTimeout(id);
  }, [index, current.dwell]);

  return (
    <motion.div
      initial={{ opacity:0, y:12 }}
      whileInView={{ opacity:1, y:0 }}
      viewport={{ once:true, amount:0.4 }}
      transition={{ duration:0.5 }}
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '8px',
        margin: '0 auto clamp(20px,3.5vw,32px)',
        maxWidth: '540px',
        width: '100%',
        padding: 'clamp(14px,3vw,20px) clamp(16px,4vw,24px)',
        borderRadius: '16px',
        background: '#ffffff',
        border: '1px solid rgba(15,23,42,0.08)',
        boxShadow: '0 2px 12px rgba(15,23,42,0.06)',
        textAlign: 'center',
        fontFamily: GEOM_FONT,
      }}
    >
      <div style={{
        display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
        gap: '10px', fontSize: 'clamp(1rem,2.4vw,1.45rem)',
        fontWeight: 700, letterSpacing: '-0.02em', flexWrap: 'wrap', width: '100%',
      }}>
        <motion.span
          animate={{ rotate:[0,-8,8,0] }}
          transition={{ duration:2.2, repeat:Infinity, ease:'easeInOut' }}
          style={{
            display:'inline-flex', width:'26px', height:'26px', borderRadius:'8px',
            background:'#2563eb', color:'#fff',
            alignItems:'center', justifyContent:'center', flexShrink:0,
          }}
        >
          <Rocket size={13} strokeWidth={2.2} />
        </motion.span>

        <span style={{
          position:'relative', display:'inline-block',
          minWidth:'clamp(120px,22vw,180px)', height:'1.3em', textAlign:'left',
        }}>
          <AnimatePresence mode="wait">
            <motion.span
              key={current.text}
              initial={{ y:12, opacity:0 }}
              animate={{ y:0, opacity:1 }}
              exit={{ y:-12, opacity:0 }}
              transition={{ duration:0.32, ease:[0.22,1,0.36,1] }}
              style={{
                position:'absolute', left:0, top:0, whiteSpace:'nowrap',
                /* solid color — no gradient text */
                color: '#2563eb',
              }}
            >
              {current.text}
            </motion.span>
          </AnimatePresence>
        </span>
      </div>

      <p style={{
        fontSize:'clamp(0.78rem,1.1vw,0.9rem)', color:'#64748b',
        lineHeight:1.55, maxWidth:'440px', margin:0, fontFamily: GEOM_FONT,
      }}>
        From CV to Offer. Home to Abroad.{' '}
        <span style={{ fontWeight:600, color:'#1e293b' }}>
          Your Career Co-Pilot — One Place, One Partner.
        </span>
      </p>
    </motion.div>
  );
}

/* ── Mobile bottom sheet ── */
function MobileToolSheet({ onClose, titleId, children }: {
  onClose: () => void; titleId: string; children: React.ReactNode;
}) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(()=>{ ref.current?.focus(); },[]);
  return (
    <>
      <motion.div
        key="backdrop"
        initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}}
        transition={{duration:0.22}}
        onClick={onClose}
        style={{ position:'fixed', inset:0, background:'rgba(15,23,42,0.5)', zIndex:60 }}
      />
      <motion.div
        key="sheet"
        ref={ref} role="dialog" aria-modal="true" aria-labelledby={titleId} tabIndex={-1}
        initial={{y:'100%'}} animate={{y:0}} exit={{y:'100%'}}
        transition={{ type:'spring', damping:32, stiffness:300 }}
        drag="y" dragConstraints={{top:0,bottom:0}} dragElastic={{top:0,bottom:0.5}}
        onDragEnd={(_e,info)=>{ if(info.offset.y>110||info.velocity.y>700) onClose(); }}
        style={{
          position:'fixed', left:0, right:0, bottom:0, zIndex:61,
          background:'#fff', borderRadius:'20px 20px 0 0',
          maxHeight:'92vh', display:'flex', flexDirection:'column',
          boxShadow:'0 -16px 48px rgba(15,23,42,0.18)', outline:'none', touchAction:'none',
        }}
      >
        <div aria-hidden style={{ display:'flex', justifyContent:'center', padding:'10px 0 2px', cursor:'grab', flexShrink:0 }}>
          <span style={{ width:'36px', height:'4px', borderRadius:'999px', background:'rgba(15,23,42,0.15)' }} />
        </div>
        <div style={{ flex:1, minHeight:0, display:'flex', flexDirection:'column', padding:'4px 16px 0', touchAction:'pan-y' }}>
          {children}
        </div>
      </motion.div>
    </>
  );
}

/* ── Typing dots ── */
function TypingDots() {
  return (
    <div style={{ display:'flex', gap:'6px', padding:'6px 0' }}>
      {[0,1,2].map(i=>(
        <motion.span key={i}
          animate={{ y:[0,-6,0] }}
          transition={{ duration:0.7, repeat:Infinity, delay:i*0.15 }}
          style={{ width:'7px', height:'7px', borderRadius:'50%', background:'#94a3b8', display:'inline-block' }}
        />
      ))}
    </div>
  );
}

/* ═══════════════════════════════════════════════════════
   MAIN COMPONENT
═══════════════════════════════════════════════════════ */
export default function UtilityToolsSection() {
  const [category, setCategory] = useState<Category|'all'>('all');
  const [activeId, setActiveId] = useState<string|null>(null);
  const [input, setInput] = useState('');
  const [phase, setPhase] = useState<'idle'|'loading'|'done'>('idle');
  const [resultText, setResultText] = useState('');
  const [isExtracting, setIsExtracting] = useState(false);
  const [fileName, setFileName] = useState('');
  const [fileError, setFileError] = useState('');
  const isMobile = useIsMobile();

  const active = TOOLS.find(t=>t.id===activeId)??null;
  const accent: Accent = active ? CATEGORY_META[active.category] : CATEGORY_META[category];

  const filteredTools = useMemo(()=>TOOLS.filter(t=>category==='all'||t.category===category),[category]);
  const typedResult = useTypewriter(resultText, phase==='done');

  const runTool = useCallback(()=>{
    if (!active) return;
    setPhase('loading');
    window.setTimeout(()=>{
      setResultText(computeToolResult(active, input));
      setPhase('done');
    }, 900);
  },[active, input]);

  const handleFileUpload = useCallback(async(file: File)=>{
    setFileError(''); setFileName(file.name); setIsExtracting(true);
    try {
      const text = await extractTextFromFile(file);
      if (!text||text.trim().length<20) throw new Error('Could not extract text. Please paste instead.');
      setInput(text);
    } catch(err:any) {
      setFileError(err?.message||'Could not read this file. Please paste your text instead.');
    } finally { setIsExtracting(false); }
  },[]);

  const openTool = (tool: Tool) => {
    setActiveId(tool.id); setInput(''); setPhase('idle');
    setResultText(''); setFileName(''); setFileError('');
  };
  const closePanel = useCallback(()=>{
    setActiveId(null); setPhase('idle'); setInput('');
    setResultText(''); setFileName(''); setFileError('');
  },[]);

  useEffect(()=>{
    document.body.style.overflow = (isMobile&&active)?'hidden':'';
    return ()=>{ document.body.style.overflow=''; };
  },[isMobile,active]);

  useEffect(()=>{
    if (!active) return;
    const fn = (e:KeyboardEvent)=>{ if(e.key==='Escape') closePanel(); };
    window.addEventListener('keydown',fn);
    return ()=>window.removeEventListener('keydown',fn);
  },[active,closePanel]);

  const mobileTitleId = active?`mobile-tool-title-${active.id}`:undefined;

  return (
    <section
      id="utility-tools"
      style={{
        position:'relative',
        padding:'clamp(48px,7vw,88px) clamp(16px,4vw,24px)',
        overflow:'hidden',
        background:'#f8fafc',
        fontFamily: GEOM_FONT,
      }}
    >
      {/* subtle background blobs — solid, very faint */}
      <div aria-hidden style={{
        position:'absolute', top:'-10%', right:'-6%', width:'380px', height:'380px',
        borderRadius:'50%', background:'rgba(37,99,235,0.04)', filter:'blur(80px)',
        zIndex:0, pointerEvents:'none',
      }}/>
      <div aria-hidden style={{
        position:'absolute', bottom:'-12%', left:'-8%', width:'420px', height:'420px',
        borderRadius:'50%', background:'rgba(8,145,178,0.04)', filter:'blur(90px)',
        zIndex:0, pointerEvents:'none',
      }}/>

      <div style={{ position:'relative', zIndex:1, maxWidth:'1200px', margin:'0 auto' }}>

        {/* ── Header ── */}
        <motion.div
          initial={{opacity:0,y:16}} whileInView={{opacity:1,y:0}}
          viewport={{once:true,amount:0.3}} transition={{duration:0.5}}
          style={{ textAlign:'center', marginBottom:'clamp(20px,3vw,32px)' }}
        >
          {/* eyebrow */}
          <span style={{
            display:'inline-flex', alignItems:'center', gap:'6px',
            fontSize:'11px', fontWeight:600, textTransform:'uppercase',
            letterSpacing:'0.14em', color:'#2563eb',
            background:'rgba(37,99,235,0.07)',
            border:'1px solid rgba(37,99,235,0.14)',
            borderRadius:'999px', padding:'5px 12px',
            marginBottom:'14px',
          }}>
            <Sparkles size={13} strokeWidth={2.25} aria-hidden />
            Utility Tools
          </span>

          {/* heading — solid, no gradient */}
          <h2 style={{
            fontSize:'clamp(1.75rem,3.8vw,2.9rem)',
            fontWeight:700,
            lineHeight:1.12,
            letterSpacing:'-0.025em',
            color:'#0f172a',
            margin:'0 0 12px',
          }}>
            AI-Powered Tools Built for Real Career Decisions
          </h2>

          <p style={{
            fontSize:'clamp(0.9rem,1.3vw,1.05rem)',
            color:'#64748b',
            maxWidth:'580px',
            margin:'0 auto',
            lineHeight:1.65,
          }}>
            Interactive assistants for resumes, interviews, salaries, study abroad, and more —
            designed to feel fast, useful, and advisor-grade.
          </p>
        </motion.div>

        {/* ── Rotating banner ── */}
        <RotatingHeadlineBanner />

        {/* ── Category filter ── */}
        <div style={{ display:'flex', justifyContent:'center', marginBottom:'clamp(20px,2.8vw,28px)' }}>
          <div
            role="tablist" aria-label="Filter tools"
            style={{
              display:'inline-flex', gap:'4px', flexWrap:'wrap', justifyContent:'center',
              background:'#ffffff', padding:'5px', borderRadius:'999px',
              boxShadow:'0 2px 10px rgba(15,23,42,0.07)',
              border:'1px solid rgba(15,23,42,0.07)',
            }}
          >
            {FILTERS.map(f=>{
              const meta = CATEGORY_META[f];
              const isActive = category===f;
              return (
                <button key={f} type="button" role="tab" aria-selected={isActive}
                  onClick={()=>setCategory(f)}
                  style={{
                    position:'relative', padding:'9px 20px', borderRadius:'999px',
                    border:'none', fontWeight:600, fontSize:'13px', cursor:'pointer',
                    background: isActive ? '#2563eb' : 'transparent',
                    color: isActive ? '#ffffff' : '#64748b',
                    transition:'all 0.2s ease',
                    whiteSpace:'nowrap',
                    fontFamily: GEOM_FONT,
                  }}
                >
                  {meta.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* ── Tool toggle bar ── */}
        <motion.div
          initial={{opacity:0,y:10}} animate={{opacity:1,y:0}}
          transition={{duration:0.4}}
          style={{ marginBottom:'clamp(16px,2.5vw,24px)' }}
        >
          <div className="tools-toggle-wrap">
            <div
              className="tools-toggle-bar"
              style={{
                background:'#ffffff', borderRadius:'999px', padding:'6px',
                boxShadow:'0 2px 12px rgba(15,23,42,0.08)',
                border:'1px solid rgba(15,23,42,0.07)',
                display:'flex', flexWrap:'wrap', gap:'4px',
                justifyContent:'center', alignItems:'center',
              }}
            >
              {filteredTools.map(tool=>{
                const meta = CATEGORY_META[tool.category];
                const isActive = activeId===tool.id;
                return (
                  <motion.button
                    key={tool.id} type="button"
                    onClick={()=>openTool(tool)}
                    whileHover={{scale:1.02}} whileTap={{scale:0.97}}
                    style={{
                      display:'inline-flex', alignItems:'center', gap:'7px',
                      padding:'9px 16px', borderRadius:'999px', border:'none',
                      /* solid fill when active — no gradient */
                      background: isActive ? '#2563eb' : 'rgba(15,23,42,0.03)',
                      color: isActive ? '#ffffff' : '#475569',
                      fontSize:'13px', fontWeight:600, cursor:'pointer',
                      transition:'all 0.2s ease',
                      boxShadow: isActive ? '0 4px 14px rgba(37,99,235,0.22)' : 'none',
                      fontFamily: GEOM_FONT,
                    }}
                  >
                    <tool.Icon size={15} strokeWidth={2} />
                    <span className="tool-title-desktop">{tool.title}</span>
                    <span className="tool-title-mobile">{tool.title.split(' ')[0]}</span>
                    {tool.popular && (
                      <span className="tool-hot-badge" style={{
                        fontSize:'9px', fontWeight:700, letterSpacing:'0.4px',
                        background: isActive ? 'rgba(255,255,255,0.22)' : 'rgba(37,99,235,0.1)',
                        color: isActive ? '#fff' : '#2563eb',
                        borderRadius:'999px', padding:'2px 6px',
                      }}>HOT</span>
                    )}
                    {isActive && (
                      <ChevronDown size={13} strokeWidth={2.5} className="tool-chevron" />
                    )}
                  </motion.button>
                );
              })}
            </div>
            <span className="tools-toggle-fade tools-toggle-fade--left" aria-hidden />
            <span className="tools-toggle-fade tools-toggle-fade--right" aria-hidden />
          </div>
        </motion.div>

        {/* ── Desktop panel ── */}
        {!isMobile && (
          <AnimatePresence mode="wait">
            {active && (
              <motion.div
                key={active.id}
                initial={{opacity:0,y:-8,height:0}}
                animate={{opacity:1,y:0,height:'auto'}}
                exit={{opacity:0,y:-8,height:0}}
                transition={{duration:0.28, ease:[0.22,1,0.36,1]}}
                style={{overflow:'hidden'}}
              >
                <div style={{
                  maxWidth:'860px', margin:'0 auto',
                  background:'#ffffff', borderRadius:'20px',
                  padding:'clamp(22px,3.5vw,32px)',
                  boxShadow:'0 8px 32px rgba(15,23,42,0.1)',
                  border:'1px solid rgba(15,23,42,0.07)',
                }}>
                  <ToolPanel
                    active={active} accent={accent}
                    input={input} setInput={setInput}
                    phase={phase} typedResult={typedResult}
                    runTool={runTool} closePanel={closePanel}
                    onFileUpload={handleFileUpload}
                    isExtracting={isExtracting} fileName={fileName} fileError={fileError}
                    variant="desktop"
                  />
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        )}
      </div>

      {/* ── Mobile sheet ── */}
      {isMobile && (
        <AnimatePresence>
          {active && mobileTitleId && (
            <MobileToolSheet key="mobile-sheet" onClose={closePanel} titleId={mobileTitleId}>
              <ToolPanel
                active={active} accent={accent}
                input={input} setInput={setInput}
                phase={phase} typedResult={typedResult}
                runTool={runTool} closePanel={closePanel}
                onFileUpload={handleFileUpload}
                isExtracting={isExtracting} fileName={fileName} fileError={fileError}
                variant="mobile" titleId={mobileTitleId}
              />
            </MobileToolSheet>
          )}
        </AnimatePresence>
      )}

      <style>{`
        /* ── font & box-sizing ── */
        #utility-tools, #utility-tools * {
          font-family: ${GEOM_FONT};
          font-feature-settings: "ss01","cv11","cv02";
          font-optical-sizing: auto;
          box-sizing: border-box;
        }

        /* ── toggle bar responsive ── */
        .tools-toggle-wrap { position: relative; }

        .tools-toggle-fade {
          display: none;
          position: absolute; top: 0; bottom: 0; width: 24px;
          pointer-events: none; z-index: 2;
        }

        @media (max-width: 900px) {
          .tool-title-desktop { display: none; }
          .tool-title-mobile  { display: inline; }

          .tools-toggle-bar {
            flex-wrap: nowrap !important;
            justify-content: flex-start !important;
            overflow-x: auto !important;
            -webkit-overflow-scrolling: touch;
            scroll-snap-type: x proximity;
            padding: 6px 12px !important;
            gap: 6px !important;
            scrollbar-width: none;
          }
          .tools-toggle-bar::-webkit-scrollbar { display: none; }
          .tools-toggle-bar > button {
            flex-shrink: 0;
            scroll-snap-align: start;
            padding: 10px 14px !important;
            min-height: 42px;
          }
          .tool-hot-badge { display: none; }
          .tool-chevron   { display: none; }

          .tools-toggle-fade { display: block; }
          .tools-toggle-fade--left  {
            left: 0;
            background: linear-gradient(90deg, #f8fafc, rgba(248,250,252,0));
          }
          .tools-toggle-fade--right {
            right: 0;
            background: linear-gradient(270deg, #f8fafc, rgba(248,250,252,0));
          }

          .tool-textarea     { font-size: 16px !important; }
          .tool-close-btn    { width: 40px !important; height: 40px !important; }
          .tool-upload-label { padding: 11px 14px !important; min-height: 42px; }
        }

        @media (min-width: 901px) {
          .tool-title-desktop { display: inline; }
          .tool-title-mobile  { display: none;   }
        }
      `}</style>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════
   TOOL PANEL
═══════════════════════════════════════════════════════ */
function ToolPanel({
  active, accent, input, setInput, phase, typedResult,
  runTool, closePanel, onFileUpload, isExtracting, fileName, fileError,
  variant='desktop', titleId,
}: {
  active: Tool|null; accent: Accent;
  input: string; setInput:(v:string)=>void;
  phase:'idle'|'loading'|'done'; typedResult:string;
  runTool:()=>void; closePanel:()=>void;
  onFileUpload:(f:File)=>void;
  isExtracting:boolean; fileName:string; fileError:string;
  variant?:'desktop'|'mobile'; titleId?:string;
}) {
  if (!active) return null;
  const isMob = variant==='mobile';
  const supportsUpload = UPLOAD_ENABLED_IDS.includes(active.id);

  /* ── header ── */
  const header = (
    <div style={{
      display:'flex', justifyContent:'space-between', alignItems:'flex-start',
      marginBottom: isMob?'12px':'18px',
      paddingBottom: isMob?'12px':0,
      borderBottom: isMob?'1px solid rgba(15,23,42,0.07)':'none',
    }}>
      <div style={{ display:'flex', gap:'12px', alignItems:'center', minWidth:0 }}>
        {/* icon box — solid color, no gradient */}
        <span style={{
          width: isMob?'42px':'48px', height: isMob?'42px':'48px',
          borderRadius:'14px', display:'flex', alignItems:'center', justifyContent:'center',
          background: accent.from, color:'#fff', flexShrink:0,
          boxShadow:`0 4px 14px ${accent.soft}`,
        }}>
          <active.Icon size={isMob?20:22} strokeWidth={2} />
        </span>

        <div style={{ minWidth:0 }}>
          <p style={{
            fontSize:'10px', fontWeight:600, textTransform:'uppercase',
            letterSpacing:'0.12em', color: accent.from, marginBottom:'3px',
          }}>
            Placedly AI Tool
          </p>
          <h3
            id={titleId}
            style={{
              fontSize: isMob?'1rem':'clamp(1.05rem,1.8vw,1.3rem)',
              fontWeight:700, lineHeight:1.3, letterSpacing:'-0.02em',
              color:'#0f172a', margin:0,
              /* NO gradient text */
            }}
          >
            {active.title}
          </h3>
          {!isMob && (
            <p style={{ fontSize:'13px', color:'#64748b', marginTop:'4px', lineHeight:1.5 }}>
              {active.description}
            </p>
          )}
        </div>
      </div>

      <button
        type="button" onClick={closePanel} aria-label="Close tool"
        className="tool-close-btn"
        style={{
          border:'none', background:'rgba(15,23,42,0.05)',
          width:'34px', height:'34px', borderRadius:'10px',
          display:'flex', alignItems:'center', justifyContent:'center',
          cursor:'pointer', color:'#64748b', flexShrink:0,
          transition:'background 0.18s',
        }}
        onMouseEnter={e=>{ e.currentTarget.style.background='rgba(15,23,42,0.1)'; }}
        onMouseLeave={e=>{ e.currentTarget.style.background='rgba(15,23,42,0.05)'; }}
      >
        <X size={16} strokeWidth={2.5} />
      </button>
    </div>
  );

  /* ── upload ── */
  const uploadBlock = supportsUpload && (
    <div style={{ marginBottom:'12px' }}>
      <input
        type="file" id={`ru-${active.id}-${variant}`}
        accept=".pdf,.doc,.docx,.txt" style={{ display:'none' }}
        onChange={e=>{ const f=e.target.files?.[0]; if(f) onFileUpload(f); e.target.value=''; }}
      />
      <label
        htmlFor={`ru-${active.id}-${variant}`}
        className="tool-upload-label"
        style={{
          display:'inline-flex', alignItems:'center', gap:'8px',
          padding:'8px 14px', borderRadius:'999px',
          border:`1.5px dashed rgba(37,99,235,0.3)`,
          background: accent.soft, color: accent.from,
          fontSize:'12.5px', fontWeight:600,
          cursor: isExtracting?'wait':'pointer',
          transition:'border-color 0.2s',
        }}
      >
        <Upload size={14} strokeWidth={2.25} />
        {isExtracting?'Reading file…':fileName?`Uploaded: ${fileName}`:'Upload Resume (.pdf, .docx, .txt)'}
      </label>
      {fileError && (
        <p style={{ fontSize:'12px', color:'#dc2626', marginTop:'6px', lineHeight:1.5 }}>{fileError}</p>
      )}
    </div>
  );

  /* ── textarea ── */
  const textarea = (
    <textarea
      rows={isMob?4:5} value={input}
      onChange={e=>setInput(e.target.value)}
      placeholder={active.placeholder}
      className="tool-textarea"
      style={{
        width:'100%', resize:'vertical', padding:'14px',
        borderRadius:'12px',
        border:`1.5px solid rgba(15,23,42,0.1)`,
        fontSize:'14px', lineHeight:1.62, color:'#0f172a',
        outline:'none', marginBottom:'14px',
        fontFamily: GEOM_FONT,
        background:'#f8fafc',
        transition:'border-color 0.2s',
      }}
      onFocus={e=>{ e.currentTarget.style.borderColor=accent.from; }}
      onBlur={e=>{  e.currentTarget.style.borderColor='rgba(15,23,42,0.1)'; }}
    />
  );

  /* ── run button — solid, no gradient ── */
  const runButton = (
    <motion.button
      type="button" onClick={runTool} disabled={phase==='loading'}
      whileHover={{ y:-2, boxShadow:`0 8px 24px rgba(37,99,235,0.22)` }}
      whileTap={{ scale:0.98 }}
      style={{
        width:'100%', display:'inline-flex', alignItems:'center',
        justifyContent:'center', gap:'9px',
        padding:'14px 24px',
        background: accent.from,      /* solid — no gradient */
        color:'#fff', border:'none', borderRadius:'12px',
        fontWeight:700, fontSize:'14.5px',
        cursor: phase==='loading'?'wait':'pointer',
        opacity: phase==='loading'?0.82:1,
        boxShadow:`0 4px 16px rgba(37,99,235,0.2)`,
        transition:'opacity 0.18s, box-shadow 0.18s',
        fontFamily: GEOM_FONT,
      }}
    >
      {phase==='loading'?(
        <>
          <motion.span aria-hidden
            animate={{rotate:360}} transition={{duration:0.75,repeat:Infinity,ease:'linear'}}
            style={{
              width:'15px',height:'15px',borderRadius:'50%',
              border:'2px solid rgba(255,255,255,0.3)',borderTopColor:'#fff',display:'inline-block',
            }}
          />
          Analyzing…
        </>
      ):(
        <>
          <Sparkles size={16} strokeWidth={2.5} aria-hidden />
          {active.cta}
        </>
      )}
    </motion.button>
  );

  /* ── result block ── */
  const resultBlock = (
    <AnimatePresence>
      {(phase==='loading'||phase==='done') && (
        <motion.div
          initial={{opacity:0,y:8,height:0}}
          animate={{opacity:1,y:0,height:'auto'}}
          exit={{opacity:0,height:0}}
          transition={{duration:0.26}}
          style={{
            marginTop:'16px', padding:'18px', borderRadius:'14px',
            background: accent.soft,
            border:`1px solid rgba(37,99,235,0.12)`,
            overflow:'hidden',
          }}
        >
          <p style={{
            fontSize:'10.5px', fontWeight:700, textTransform:'uppercase',
            letterSpacing:'0.1em', color: accent.from,
            marginBottom:'10px', display:'flex', alignItems:'center', gap:'7px',
          }}>
            <Sparkles size={13} strokeWidth={2.5} /> AI Insight
          </p>
          {phase==='loading'
            ? <TypingDots />
            : (
              <p style={{ fontSize:'14px', lineHeight:1.72, color:'#1e293b' }}>
                {typedResult}
                <motion.span
                  animate={{opacity:[1,0]}}
                  transition={{duration:0.55,repeat:Infinity}}
                  style={{
                    display:'inline-block', width:'2px', height:'15px',
                    background: accent.from, marginLeft:'3px', verticalAlign:'middle',
                  }}
                />
              </p>
            )
          }
        </motion.div>
      )}
    </AnimatePresence>
  );

  /* ── desktop layout ── */
  if (!isMob) return (
    <div>
      {header}
      {uploadBlock}
      {textarea}
      {runButton}
      {resultBlock}
    </div>
  );

  /* ── mobile layout ── */
  return (
    <div style={{ position:'relative', display:'flex', flexDirection:'column', height:'100%', minHeight:0 }}>
      <div style={{ flexShrink:0 }}>{header}</div>
      <div style={{
        flex:1, minHeight:0, overflowY:'auto',
        WebkitOverflowScrolling:'touch', paddingTop:'12px', paddingBottom:'8px',
      }}>
        <p style={{ fontSize:'13px', color:'#64748b', marginBottom:'12px', lineHeight:1.5 }}>
          {active.description}
        </p>
        {uploadBlock}
        {textarea}
        {resultBlock}
      </div>
      <div style={{
        flexShrink:0, paddingTop:'10px',
        paddingBottom:'max(12px, env(safe-area-inset-bottom))',
        borderTop:'1px solid rgba(15,23,42,0.07)', background:'#fff',
      }}>
        {runButton}
      </div>
    </div>
  );
}