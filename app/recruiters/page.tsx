'use client';
import { useState } from 'react';
import Link from 'next/link';
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
   Styled to match the homepage + service pages theme.
════════════════════════════════════════════════════════ */

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

export default function RecruitersPage() {
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
          <div className="rnp-partner-grid">
            {PARTNER_TYPES.map((p) => (
              <div key={p.title} className="rnp-partner-card">
                <div className="rnp-partner-icon"><p.icon size={18} /></div>
                <h3>{p.title}</h3>
                <p className="rnp-partner-body">{p.body}</p>
                <div className="rnp-partner-list-label">{p.listLabel}</div>
                <ul className="rnp-partner-list">
                  {p.list.map((item) => (
                    <li key={item}><Check size={13} />{item}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Why Recruiters Choose Placedly ── */}
      <section className="rnp-section">
        <div className="rnp-container">
          <h2 className="rnp-heading rnp-heading--center">Why Recruiters Choose Placedly</h2>
          <div className="rnp-features-grid">
            {WHY_RECRUITERS.map((f) => (
              <div key={f.title} className="rnp-feature-card">
                <div className="rnp-feature-icon"><f.icon size={18} /></div>
                <h3>{f.title}</h3>
                <p>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Industries ── */}
      <section className="rnp-section rnp-section--tint">
        <div className="rnp-container">
          <h2 className="rnp-heading rnp-heading--center">Industries We Hire For</h2>
          <div className="rnp-industries">
            {INDUSTRIES.map((ind) => (
              <span key={ind} className="rnp-industry-pill">{ind}</span>
            ))}
          </div>
        </div>
      </section>

      {/* ── How It Works ── */}
      <section className="rnp-section">
        <div className="rnp-container">
          <h2 className="rnp-heading rnp-heading--center">How It Works</h2>
          <div className="rnp-steps">
            {STEPS.map((step, i) => (
              <div key={i} className="rnp-step">
                <div className="rnp-step-num">{String(i + 1).padStart(2, '0')}</div>
                <p>{step}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── What You'll Get ── */}
      <section className="rnp-section rnp-section--tint">
        <div className="rnp-container">
          <h2 className="rnp-heading rnp-heading--center">What You'll Get</h2>
          <div className="rnp-tools-grid">
            {TOOLS.map((t) => (
              <div key={t} className="rnp-tool-item">
                <CheckCircle2 size={17} />
                <span>{t}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Commission & Rewards ── */}
      <section className="rnp-section">
        <div className="rnp-container rnp-container--narrow">
          <h2 className="rnp-heading rnp-heading--center">Commission &amp; Rewards</h2>
          <p className="rnp-section-intro">At Placedly, your earnings grow with your performance.</p>
          <div className="rnp-check-list">
            {COMMISSION.map((c) => (
              <div key={c} className="rnp-check-item">
                <span className="rnp-check-badge"><Check size={14} /></span>
                <span>{c}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Why Companies Work With Us ── */}
      <section className="rnp-section rnp-section--tint">
        <div className="rnp-container rnp-container--narrow">
          <h2 className="rnp-heading rnp-heading--center">Why Companies Work With Us</h2>
          <div className="rnp-check-list">
            {WHY_COMPANIES.map((c) => (
              <div key={c} className="rnp-check-item">
                <span className="rnp-check-badge"><Check size={14} /></span>
                <span>{c}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="rnp-section">
        <div className="rnp-container rnp-container--narrow">
          <h2 className="rnp-heading rnp-heading--center">Frequently Asked Questions</h2>
          <div className="rnp-faq-list">
            {FAQS.map((f, i) => {
              const isOpen = openFaq === i;
              return (
                <div key={i} className={`rnp-faq-item${isOpen ? ' is-open' : ''}`}>
                  <button className="rnp-faq-q" onClick={() => setOpenFaq(isOpen ? null : i)} aria-expanded={isOpen}>
                    {f.q}
                    <ChevronDown size={16} className="rnp-faq-chevron" />
                  </button>
                  {isOpen && <div className="rnp-faq-a">{f.a}</div>}
                </div>
              );
            })}
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

        /* Partner types */
        .rnp-partner-grid { display: grid; grid-template-columns: 1fr; gap: 14px; }
        .rnp-partner-card {
          background: #ffffff; border: 1.5px solid rgba(0,0,0,0.10); border-radius: 14px;
          padding: 20px; transition: border-color .2s, box-shadow .2s, transform .2s;
        }
        .rnp-partner-card:hover { border-color: rgba(249,115,22,0.35); box-shadow: 0 10px 24px rgba(249,115,22,0.10); transform: translateY(-2px); }
        .rnp-partner-icon {
          width: 34px; height: 34px; border-radius: 9px;
          background: rgba(249,115,22,0.08); border: 1px solid rgba(249,115,22,0.2);
          color: #ea580c; display: flex; align-items: center; justify-content: center; margin-bottom: 10px;
        }
        .rnp-partner-card h3 { font-size: 15px; font-weight: 800; color: #000000; margin: 0 0 6px; }
        .rnp-partner-body { font-size: 13px; color: #404040; line-height: 1.6; margin: 0 0 12px; }
        .rnp-partner-list-label {
          font-size: 10px; font-weight: 800; color: #ea580c; text-transform: uppercase;
          letter-spacing: 0.06em; margin-bottom: 8px;
        }
        .rnp-partner-list { list-style: none; margin: 0; padding: 0; display: flex; flex-direction: column; gap: 6px; }
        .rnp-partner-list li { display: flex; align-items: center; gap: 7px; font-size: 12.5px; color: #404040; }
        .rnp-partner-list li svg { flex-shrink: 0; color: #f97316; }

        /* Why recruiters */
        .rnp-features-grid { display: grid; grid-template-columns: 1fr; gap: 14px; }
        .rnp-feature-card {
          background: #ffffff; border: 1.5px solid rgba(0,0,0,0.10); border-radius: 14px;
          padding: 18px; transition: border-color .2s, box-shadow .2s, transform .2s;
        }
        .rnp-feature-card:hover { border-color: rgba(249,115,22,0.35); box-shadow: 0 10px 24px rgba(249,115,22,0.10); transform: translateY(-2px); }
        .rnp-feature-icon {
          width: 34px; height: 34px; border-radius: 9px;
          background: rgba(249,115,22,0.08); border: 1px solid rgba(249,115,22,0.2);
          color: #ea580c; display: flex; align-items: center; justify-content: center; margin-bottom: 10px;
        }
        .rnp-feature-card h3 { font-size: 14.5px; font-weight: 800; color: #000000; margin: 0 0 6px; }
        .rnp-feature-card p { font-size: 13px; color: #404040; line-height: 1.6; margin: 0; }

        /* Industries */
        .rnp-industries { display: flex; flex-wrap: wrap; justify-content: center; gap: 10px; }
        .rnp-industry-pill {
          display: inline-flex; align-items: center;
          padding: 9px 18px; background: #ffffff;
          border: 1.5px solid rgba(249,115,22,0.25); border-radius: 999px;
          font-size: 13px; font-weight: 600; color: #111827;
          transition: background .2s, border-color .2s, color .2s;
        }
        .rnp-industry-pill:hover { background: rgba(249,115,22,0.08); border-color: rgba(249,115,22,0.45); color: #ea580c; }

        /* Steps */
        .rnp-steps { display: flex; flex-direction: column; gap: 20px; }
        .rnp-step { display: flex; gap: 14px; align-items: flex-start; }
        .rnp-step-num {
          flex-shrink: 0; font-size: 13px; font-weight: 800; color: #ea580c;
          background: rgba(249,115,22,0.08); border: 1px solid rgba(249,115,22,0.25);
          width: 38px; height: 38px; border-radius: 10px;
          display: flex; align-items: center; justify-content: center;
        }
        .rnp-step p { font-size: 13.5px; color: #404040; line-height: 1.6; margin: 0; padding-top: 9px; }

        /* Tools */
        .rnp-tools-grid { display: grid; grid-template-columns: 1fr; gap: 10px; }
        .rnp-tool-item {
          display: flex; align-items: center; gap: 10px;
          background: #ffffff; border: 1.5px solid rgba(0,0,0,0.10); border-radius: 12px;
          padding: 12px 16px; font-size: 13.5px; font-weight: 600; color: #111827;
          transition: border-color .2s;
        }
        .rnp-tool-item:hover { border-color: rgba(249,115,22,0.35); }
        .rnp-tool-item svg { flex-shrink: 0; color: #f97316; }

        /* Check lists */
        .rnp-check-list { display: flex; flex-direction: column; gap: 10px; }
        .rnp-check-item {
          display: flex; align-items: center; gap: 10px;
          background: #ffffff; border: 1.5px solid rgba(0,0,0,0.10); border-radius: 12px;
          padding: 12px 16px; font-size: 13.5px; font-weight: 600; color: #111827;
          transition: border-color .2s;
        }
        .rnp-check-item:hover { border-color: rgba(249,115,22,0.35); }
        .rnp-check-badge {
          flex-shrink: 0; width: 22px; height: 22px; border-radius: 50%;
          background: rgba(249,115,22,0.10); border: 1px solid rgba(249,115,22,0.30);
          color: #ea580c; display: flex; align-items: center; justify-content: center;
        }

        /* FAQ */
        .rnp-faq-list { display: flex; flex-direction: column; gap: 10px; }
        .rnp-faq-item {
          background: #ffffff; border: 1.5px solid rgba(0,0,0,0.10); border-radius: 12px;
          overflow: hidden; transition: border-color .2s;
        }
        .rnp-faq-item.is-open { border-color: rgba(249,115,22,0.35); }
        .rnp-faq-q {
          width: 100%; display: flex; align-items: center; justify-content: space-between;
          gap: 12px; padding: 14px 16px; background: none; border: none; cursor: pointer;
          font-size: 13.5px; font-weight: 700; color: #000000; text-align: left;
        }
        .rnp-faq-chevron { flex-shrink: 0; color: #ea580c; transition: transform .25s ease; }
        .rnp-faq-item.is-open .rnp-faq-chevron { transform: rotate(180deg); }
        .rnp-faq-a { padding: 0 16px 16px; font-size: 13px; color: #404040; line-height: 1.65; }

        /* Final CTA */
        .rnp-final-cta {
          text-align: center; padding: 32px 20px;
          background: rgba(249,115,22,0.05); border: 1px solid rgba(249,115,22,0.20);
          border-radius: 18px;
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
          .rnp-partner-grid { grid-template-columns: 1fr 1fr; }
          .rnp-features-grid { grid-template-columns: 1fr 1fr; }
          .rnp-tools-grid { grid-template-columns: 1fr 1fr; }
          .rnp-steps { flex-direction: row; flex-wrap: wrap; }
          .rnp-step { flex: 1 1 calc(50% - 20px); }
        }
        @media (min-width: 960px) {
          .rnp-features-grid { grid-template-columns: repeat(3, 1fr); }
          .rnp-tools-grid { grid-template-columns: repeat(4, 1fr); }
          .rnp-step { flex: 1 1 calc(25% - 20px); }
        }
      `}</style>
    </PageLayout>
  );
}