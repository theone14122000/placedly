'use client';
import { useState, type ReactNode } from 'react';
import Link from 'next/link';
import { AnimatePresence, motion } from 'framer-motion';
import PageLayout from '../components/PageLayout';
import {
  ArrowUpRight,
  BadgeCheck,
  Banknote,
  Building2,
  Check,
  CheckCircle2,
  ChevronDown,
  GraduationCap,
  Headset,
  LayoutDashboard,
  MapPin,
  UserCheck,
  Zap,
} from 'lucide-react';

/* ════════════════════════════════════════════════════════
   Placedly Recruiter Network — public marketing page.
   All copy is source-of-truth content; no mock data.
   Pill theme everywhere — items expand on click like the
   homepage Document Checklist section.
════════════════════════════════════════════════════════ */

const ORANGE        = '#f97316';
const BLACK         = '#0b0d20';
const TEXT_BODY     = '#404040';
const BORDER        = 'rgba(0,0,0,0.10)';

const PARTNER_TYPES = [
  {
    icon: UserCheck,
    title: 'Freelancer Recruiters',
    body: 'Work independently from anywhere and earn commissions on every successful placement.',
    listLabel: 'Ideal For',
    list: ['Freelance Recruiters', 'HR Professionals', 'Talent Acquisition Specialists', 'Career Coaches', 'Placement Consultants'],
  },
  {
    icon: Building2,
    title: 'Recruitment Vendors',
    body: 'Already running a recruitment agency? Partner with Placedly to receive consistent hiring requirements from multiple industries without spending time acquiring new clients.',
    listLabel: 'Benefits',
    list: ['Bulk hiring projects', 'Dedicated account support', 'Faster interview coordination', 'High-volume hiring opportunities', 'Transparent payment process'],
  },
  {
    icon: GiftIcon,
    title: 'Referral Partners',
    body: 'Know talented candidates? Refer them to Placedly and earn rewards whenever your referral gets successfully placed.',
    listLabel: 'Perfect for',
    list: ['College Placement Cells', 'Working Professionals', 'Alumni Networks', 'Influencers & Communities'],
  },
  {
    icon: GraduationCap,
    title: 'Campus Hiring Partners',
    body: 'Partner with colleges and institutes to connect students with verified job opportunities.',
    listLabel: 'Suitable for',
    list: ['Colleges', 'Universities', 'Training Institutes', 'Skill Development Centres'],
  },
];

const WHY_RECRUITERS = [
  { icon: BadgeCheck, title: 'Verified Hiring Requirements', desc: 'Receive genuine openings from trusted employers.' },
  { icon: Banknote, title: 'Attractive Commission Structure', desc: 'Earn competitive payouts for every successful placement.' },
  { icon: MapPin, title: 'PAN India Hiring', desc: 'Access opportunities across multiple cities and industries.' },
  { icon: LayoutDashboard, title: 'Recruiter Dashboard', desc: 'Manage candidates, submissions, interviews and payouts from one place.' },
  { icon: Zap, title: 'Faster Interview Process', desc: 'Our recruitment team coordinates interviews to reduce delays.' },
  { icon: Headset, title: 'Dedicated Support Team', desc: 'Our operations team helps throughout the hiring lifecycle.' },
];

const INDUSTRIES = [
  'IT & Software',
  'BPO / Customer Support',
  'BFSI',
  'Healthcare',
  'Finance & Accounts',
  'HR & Recruitment',
  'Sales & Marketing',
  'Logistics & Supply Chain',
  'Retail & E-commerce',
  'Manufacturing',
  'Engineering',
  'Hospitality',
];

const STEPS = [
  'Register as a Recruiter.',
  'Complete profile verification.',
  'Receive active hiring requirements.',
  'Source and submit relevant candidates.',
  'Interview coordination by Placedly.',
  'Candidate joins the company.',
  'Receive your commission as per payout policy.',
];

const TOOLS = [
  'Daily Hiring Requirements',
  'JD Library',
  'Candidate Submission Portal',
  'Interview Updates',
  'Offer Tracking',
  'Recruiter Performance Dashboard',
  'Payment History',
  'Dedicated Recruiter Support',
];

const COMMISSION = [
  'Placement-based commission',
  'Performance incentives',
  'Special hiring drives with bonus payouts',
  'High-volume recruitment rewards',
  'Priority allocation for top-performing recruiters',
];

const WHY_COMPANIES = [
  'Faster hiring turnaround',
  'Quality candidate screening',
  'Experienced recruiter network',
  'PAN India sourcing capability',
  'Dedicated hiring support',
  'Scalable recruitment solutions',
];

const FAQS = [
  { q: 'Is joining Placedly free?', a: 'Yes. Registration is completely free. Certain premium programs or advanced services may have separate terms where applicable.' },
  { q: 'Who can become a recruiter?', a: 'Anyone with recruitment experience, sourcing skills, HR background, or a strong professional network can apply.' },
  { q: 'When do I receive commission?', a: 'Commission is released according to the agreed payout cycle after the successful joining and applicable client payment terms.' },
  { q: 'Can I work part-time?', a: 'Yes. Recruiters can work full-time, part-time, or as freelance partners.' },
  { q: 'Will I receive training?', a: 'Yes. Recruiters receive sourcing guidelines, recruitment SOPs, submission standards, and ongoing support.' },
  { q: 'Can recruitment agencies partner with Placedly?', a: 'Absolutely. We actively collaborate with staffing firms, recruitment vendors, and hiring partners across India.' },
];

function GiftIcon(props: { size?: number }) {
  return <svg xmlns="http://www.w3.org/2000/svg" width={props.size ?? 24} height={props.size ?? 24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="8" width="18" height="4" rx="1" /><path d="M12 8v13" /><path d="M19 12v7a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2v-7" /><path d="M7.5 8a2.5 2.5 0 0 1 0-5A4.8 8 0 0 1 12 8a4.8 8 0 0 1 4.5-5 2.5 2.5 0 0 1 0 5" /></svg>;
}

/* ── Expandable pill — same interaction as the homepage
      Document Checklist: single-open, smooth height reveal,
      chevron rotates, orange border when open. ── */
function ExpandablePill({
  index,
  open,
  onToggle,
  row,
  body,
}: {
  index: number;
  open: boolean;
  onToggle: (i: number) => void;
  row: ReactNode;
  body: ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={() => onToggle(open ? -1 : index)}
      className={`rnp-pill${open ? ' is-open' : ''}`}
      style={{ borderColor: open ? ORANGE : BORDER }}
    >
      <span className="rnp-pill-row">
        {row}
        <ChevronDown
          size={15} strokeWidth={2.4} className="rnp-pill-chevron"
          style={{ transform: open ? 'rotate(180deg)' : 'rotate(0deg)', color: ORANGE }}
        />
      </span>
      <AnimatePresence initial={false}>
        {open && (
          <motion.span
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.22, ease: [0.4, 0, 0.2, 1] }}
            className="rnp-pill-body"
          >
            {body}
          </motion.span>
        )}
      </AnimatePresence>
    </button>
  );
}

/* ── Static pill chip (list items / industries) ── */
function PillChip({ children, icon }: { children: ReactNode; icon?: boolean }) {
  return (
    <span className="rnp-pill-chip">
      {icon && <CheckCircle2 size={16} />}
      <span>{children}</span>
    </span>
  );
}

export default function RecruitersPage() {
  const [openPartners, setOpenPartners] = useState<number | null>(null);
  const [openWhy, setOpenWhy] = useState<number | null>(null);
  const [openSteps, setOpenSteps] = useState<number | null>(null);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  return (
    <PageLayout>
      {/* ── Hero ── */}
      <section className="rnp-hero">
        <div className="rnp-container">
          <nav className="rnp-breadcrumb">
            <Link href="/">Home</Link><span aria-hidden>›</span>
            <span className="is-current">For Recruiters</span>
          </nav>
          <div className="rnp-tag"><span className="rnp-tag-dot" />India's Recruitment Partner Ecosystem</div>
          <h1 className="rnp-title">Placedly Recruiter Network</h1>
          <p className="rnp-subtitle">
            Whether you're an independent recruiter, staffing agency, recruitment vendor, HR consultant, or someone looking to build a career in talent acquisition, Placedly gives you access to verified hiring requirements, transparent payouts, and a streamlined recruitment workflow.
          </p>
          <p className="rnp-subtitle">
            Join our growing recruiter community and start placing candidates with leading employers across India.
          </p>

          <div className="rnp-hero-ctas">
            <Link href="/contact" className="rnp-cta-primary">
              Become a Recruiter<ArrowUpRight size={15} />
            </Link>
            <Link href="/vacancies" className="rnp-cta-ghost">View Open Requirements</Link>
          </div>
        </div>
      </section>

      {/* ── Who Can Join ── */}
      <section className="rnp-section rnp-section--tint">
        <div className="rnp-container">
          <h2 className="rnp-heading rnp-heading--center">Who Can Join?</h2>
          <div className="rnp-pill-grid">
            {PARTNER_TYPES.map((p, i) => (
              <ExpandablePill
                key={p.title}
                index={i}
                open={openPartners === i}
                onToggle={setOpenPartners}
                row={<>
                  <span className="rnp-pill-icon"><p.icon size={16} /></span>
                  <span className="rnp-pill-label">{p.title}</span>
                </>}
                body={<>
                  <p className="rnp-pill-note">{p.body}</p>
                  <span className="rnp-pill-list-label">{p.listLabel}</span>
                  <ul className="rnp-pill-list">
                    {p.list.map((item) => (
                      <li key={item}><Check size={13} />{item}</li>
                    ))}
                  </ul>
                </>}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ── Why Recruiters Choose Placedly ── */}
      <section className="rnp-section">
        <div className="rnp-container">
          <h2 className="rnp-heading rnp-heading--center">Why Recruiters Choose Placedly</h2>
          <div className="rnp-pill-grid">
            {WHY_RECRUITERS.map((f, i) => (
              <ExpandablePill
                key={f.title}
                index={i}
                open={openWhy === i}
                onToggle={setOpenWhy}
                row={<>
                  <span className="rnp-pill-icon"><f.icon size={16} /></span>
                  <span className="rnp-pill-label">{f.title}</span>
                </>}
                body={<p className="rnp-pill-note">{f.desc}</p>}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ── Industries ── */}
      <section className="rnp-section rnp-section--tint">
        <div className="rnp-container">
          <h2 className="rnp-heading rnp-heading--center">Industries We Hire For</h2>
          <div className="rnp-chips">
            {INDUSTRIES.map((ind) => (
              <PillChip key={ind}>{ind}</PillChip>
            ))}
          </div>
        </div>
      </section>

      {/* ── How It Works ── */}
      <section className="rnp-section">
        <div className="rnp-container rnp-container--narrow">
          <h2 className="rnp-heading rnp-heading--center">How It Works</h2>
          <div className="rnp-pill-list">
            {STEPS.map((step, i) => (
              <ExpandablePill
                key={i}
                index={i}
                open={openSteps === i}
                onToggle={setOpenSteps}
                row={<>
                  <span className="rnp-pill-num">{String(i + 1).padStart(2, '0')}</span>
                  <span className="rnp-pill-label">Step {i + 1}</span>
                </>}
                body={<p className="rnp-pill-note">{step}</p>}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ── What You'll Get ── */}
      <section className="rnp-section rnp-section--tint">
        <div className="rnp-container">
          <h2 className="rnp-heading rnp-heading--center">What You'll Get</h2>
          <div className="rnp-chips">
            {TOOLS.map((t) => (
              <PillChip key={t} icon>{t}</PillChip>
            ))}
          </div>
        </div>
      </section>

      {/* ── Commission & Rewards ── */}
      <section className="rnp-section">
        <div className="rnp-container rnp-container--narrow">
          <h2 className="rnp-heading rnp-heading--center">Commission &amp; Rewards</h2>
          <p className="rnp-section-intro">At Placedly, your earnings grow with your performance.</p>
          <div className="rnp-chips">
            {COMMISSION.map((c) => (
              <PillChip key={c} icon>{c}</PillChip>
            ))}
          </div>
        </div>
      </section>

      {/* ── Why Companies Work With Us ── */}
      <section className="rnp-section rnp-section--tint">
        <div className="rnp-container rnp-container--narrow">
          <h2 className="rnp-heading rnp-heading--center">Why Companies Work With Us</h2>
          <div className="rnp-chips">
            {WHY_COMPANIES.map((c) => (
              <PillChip key={c} icon>{c}</PillChip>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="rnp-section">
        <div className="rnp-container rnp-container--narrow">
          <h2 className="rnp-heading rnp-heading--center">Frequently Asked Questions</h2>
          <div className="rnp-pill-list">
            {FAQS.map((f, i) => (
              <ExpandablePill
                key={i}
                index={i}
                open={openFaq === i}
                onToggle={setOpenFaq}
                row={<span className="rnp-pill-label">{f.q}</span>}
                body={<p className="rnp-pill-note">{f.a}</p>}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ── Final CTA ── */}
      <section className="rnp-section rnp-section--tint">
        <div className="rnp-container rnp-container--narrow">
          <div className="rnp-final-cta">
            <h2>Ready to Grow With Placedly?</h2>
            <p>Join one of India's fastest-growing recruitment partner networks and gain access to verified hiring opportunities, dedicated support, and rewarding earning potential.</p>
            <p className="rnp-final-line">Build Careers. Create Opportunities. Grow Together.</p>
            <Link href="/contact" className="rnp-cta-primary">
              Become a Placedly Recruiter Today<ArrowUpRight size={15} />
            </Link>
          </div>
        </div>
      </section>

      <style>{`
        .rnp-hero, .rnp-hero *,
        .rnp-section, .rnp-section * {
          font-family: "Inter","Manrope","Plus Jakarta Sans",-apple-system,BlinkMacSystemFont,"Segoe UI",system-ui,sans-serif !important;
          box-sizing: border-box;
        }
        .rnp-container { max-width: 1080px; margin: 0 auto; padding: 0 16px; }
        .rnp-container--narrow { max-width: 720px; }

        /* Hero */
        .rnp-hero { background: #ffffff; padding: 96px 0 48px; }
        .rnp-breadcrumb {
          display: flex; align-items: center; gap: 8px;
          font-size: 12.5px; font-weight: 500; color: #737373;
          margin-bottom: 18px; flex-wrap: wrap;
        }
        .rnp-breadcrumb a { color: #737373; text-decoration: none; transition: color .2s; }
        .rnp-breadcrumb a:hover { color: #f97316; }
        .rnp-breadcrumb .is-current { color: #000000; font-weight: 700; }

        .rnp-tag {
          display: inline-flex; align-items: center; gap: 7px;
          padding: 6px 14px; background: rgba(249,115,22,0.08);
          border: 1px solid rgba(249,115,22,0.30); border-radius: 999px;
          font-size: 12px; font-weight: 700; color: #ea580c; margin-bottom: 16px;
        }
        .rnp-tag-dot { width: 6px; height: 6px; border-radius: 50%; background: #f97316; }

        .rnp-title {
          font-size: 28px; font-weight: 900; color: #000000;
          line-height: 1.15; letter-spacing: -0.02em; margin: 0 0 14px;
        }
        .rnp-subtitle {
          font-size: 14.5px; color: #404040; line-height: 1.65;
          max-width: 680px; margin: 0 0 14px;
        }

        .rnp-hero-ctas { display: flex; flex-wrap: wrap; gap: 12px; margin-top: 18px; }
        .rnp-cta-primary {
          display: inline-flex; align-items: center; gap: 8px;
          padding: 13px 24px; background: linear-gradient(135deg, #f97316 0%, #ea580c 100%);
          color: #ffffff; font-weight: 700; font-size: 14px; border-radius: 999px;
          text-decoration: none; box-shadow: 0 4px 14px rgba(249,115,22,0.28);
          transition: transform .2s, box-shadow .2s, filter .2s;
        }
        .rnp-cta-primary:hover { transform: translateY(-2px); box-shadow: 0 8px 20px rgba(249,115,22,0.38); filter: brightness(1.05); }
        .rnp-cta-ghost {
          display: inline-flex; align-items: center; padding: 13px 24px;
          background: #ffffff; color: #000000; font-weight: 700; font-size: 14px;
          border: 1.5px solid rgba(0,0,0,0.14); border-radius: 999px; text-decoration: none;
          transition: border-color .2s, background .2s;
        }
        .rnp-cta-ghost:hover { border-color: rgba(249,115,22,0.4); background: rgba(249,115,22,0.06); }

        /* Sections */
        .rnp-section { background: #ffffff; padding: 40px 0; }
        .rnp-section--tint { background: #fafafa; }
        .rnp-heading { font-size: 22px; font-weight: 800; color: #000000; letter-spacing: -0.02em; line-height: 1.3; margin: 0 0 14px; }
        .rnp-heading--center { text-align: center; margin-bottom: 28px; }
        .rnp-section-intro { font-size: 14px; color: #404040; text-align: center; margin: 0 0 22px; }

        /* ── Expandable pills (document-checklist style) ── */
        .rnp-pill-grid { display: grid; grid-template-columns: 1fr; gap: 12px; }
        .rnp-pill-list { display: flex; flex-direction: column; gap: 10px; }
        .rnp-pill {
          flex: 1 1 100%;
          min-width: 0;
          width: 100%;
          text-align: left;
          background: #ffffff;
          border: 1.5px solid;
          border-radius: 999px;
          padding: 13px 18px;
          cursor: pointer;
          transition: border-color 0.25s, box-shadow 0.25s;
        }
        .rnp-pill:hover { box-shadow: 0 6px 18px rgba(15,23,42,0.06); }
        .rnp-pill.is-open { box-shadow: 0 10px 24px rgba(249, 115, 22, 0.10); }
        .rnp-pill-row { display: flex; align-items: center; gap: 12px; width: 100%; }
        .rnp-pill-icon {
          width: 30px; height: 30px; border-radius: 50%;
          display: inline-flex; align-items: center; justify-content: center; flex-shrink: 0;
          background: rgba(249,115,22,0.12); border: 1px solid rgba(249,115,22,0.30);
          color: #ea580c;
        }
        .rnp-pill-num {
          width: 30px; height: 30px; border-radius: 50%;
          display: inline-flex; align-items: center; justify-content: center; flex-shrink: 0;
          background: rgba(249,115,22,0.08); border: 1px solid rgba(249,115,22,0.25);
          font-size: 12px; font-weight: 800; color: #ea580c;
        }
        .rnp-pill-label { font-size: 13.5px; font-weight: 700; color: ${BLACK}; flex: 1; }
        .rnp-pill-chevron { flex-shrink: 0; transition: transform 0.25s ease; }
        .rnp-pill-body { display: block; overflow: hidden; padding: 8px 0 2px 42px; }
        .rnp-pill-note { font-size: 13px; color: ${TEXT_BODY}; line-height: 1.6; margin: 0 0 10px; }
        .rnp-pill-list-label {
          font-size: 10px; font-weight: 800; color: #ea580c; text-transform: uppercase;
          letter-spacing: 0.06em; margin-bottom: 8px; display: block;
        }
        .rnp-pill-list { list-style: none; margin: 0; padding: 0; display: flex; flex-direction: column; gap: 7px; }
        .rnp-pill-list li { display: flex; align-items: center; gap: 7px; font-size: 12.5px; color: ${TEXT_BODY}; }
        .rnp-pill-list li svg { flex-shrink: 0; color: #f97316; }

        /* ── Static pill chips ── */
        .rnp-chips { display: flex; flex-wrap: wrap; justify-content: center; gap: 10px; }
        .rnp-pill-chip {
          display: inline-flex; align-items: center; gap: 8px;
          padding: 9px 18px; background: #ffffff;
          border: 1.5px solid rgba(249,115,22,0.25); border-radius: 999px;
          font-size: 13px; font-weight: 600; color: #111827;
          transition: background .2s, border-color .2s, color .2s;
        }
        .rnp-pill-chip svg { flex-shrink: 0; color: #f97316; }
        .rnp-pill-chip:hover { background: rgba(249,115,22,0.08); border-color: rgba(249,115,22,0.45); color: #ea580c; }

        /* Final CTA */
        .rnp-final-cta {
          text-align: center; padding: 32px 24px;
          background: rgba(249,115,22,0.05); border: 1px solid rgba(249,115,22,0.20);
          border-radius: 999px;
        }
        .rnp-final-cta h2 { font-size: 20px; font-weight: 800; color: #000000; margin: 0 0 8px; }
        .rnp-final-cta p { font-size: 13.5px; color: #404040; margin: 0 0 10px; }
        .rnp-final-line { font-weight: 700; color: #ea580c !important; }
        .rnp-final-cta .rnp-cta-primary { margin-top: 12px; }

        /* Responsive — mobile-first */
        @media (min-width: 480px) { .rnp-title { font-size: 32px; } }
        @media (min-width: 640px) {
          .rnp-hero { padding: 104px 0 56px; }
          .rnp-container { padding: 0 24px; }
          .rnp-title { font-size: clamp(2rem, 4vw, 2.6rem); }
          .rnp-section { padding: 56px 0; }
          .rnp-heading { font-size: 26px; }
          .rnp-pill-grid { grid-template-columns: 1fr 1fr; }
        }
        @media (min-width: 960px) {
          .rnp-pill-grid { grid-template-columns: repeat(3, 1fr); }
        }
      `}</style>
    </PageLayout>
  );
}