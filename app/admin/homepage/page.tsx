'use client';
import { useState, useEffect } from 'react';
import { Save, RefreshCw, ChevronDown, ChevronUp } from 'lucide-react';
import ImageUpload from '../components/ImageUpload';

/* ─── helpers ──────────────────────────────────────────────────────── */

const inp: React.CSSProperties = { display: 'block', width: '100%', padding: '10px 13px', border: '1.5px solid #e2e8f0', borderRadius: '9px', fontSize: '13px', fontFamily: "'Poppins',sans-serif", color: '#0b0d20', background: '#f8faff', outline: 'none', boxSizing: 'border-box' as const };
const ta: React.CSSProperties  = { ...inp, resize: 'vertical' as const, minHeight: '80px' };
const lbl: React.CSSProperties = { display: 'block', fontSize: '10px', fontWeight: 600, color: '#64748b', textTransform: 'uppercase' as const, letterSpacing: '0.4px', marginBottom: '5px' };
const row: React.CSSProperties = { display: 'flex', flexDirection: 'column' as const, gap: '14px' };

function Inp({ label, k, data, set, textarea }: { label: string; k: string; data: Record<string,string>; set: (k:string) => (e: React.ChangeEvent<HTMLInputElement|HTMLTextAreaElement>) => void; textarea?: boolean }) {
  return (
    <div>
      <label style={lbl}>{label}</label>
      {textarea
        ? <textarea style={ta} value={data[k] ?? ''} onChange={set(k)} />
        : <input style={inp} value={data[k] ?? ''} onChange={set(k)} />}
    </div>
  );
}

function Section({ title, children, open = true }: { title: string; children: React.ReactNode; open?: boolean }) {
  const [show, setShow] = useState(open);
  return (
    <div style={{ background: '#fff', border: '1px solid #eef0f6', borderRadius: '16px', marginBottom: '16px', boxShadow: '0 1px 4px rgba(0,0,0,.04)', overflow: 'hidden' }}>
      <button
        type="button"
        onClick={() => setShow(v => !v)}
        style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '18px 24px', background: 'none', border: 'none', cursor: 'pointer', fontFamily: "'Poppins',sans-serif" }}
      >
        <span style={{ fontSize: '14px', fontWeight: 700, color: '#0b0d20' }}>{title}</span>
        {show ? <ChevronUp size={16} color="#64748b" /> : <ChevronDown size={16} color="#64748b" />}
      </button>
      {show && <div style={{ padding: '0 24px 24px', width: '100%', boxSizing: 'border-box' }}>{children}</div>}
    </div>
  );
}

/* ─── defaults ──────────────────────────────────────────────────────── */

const DEFAULTS: Record<string, string> = {
  /* Hero — text */
  'hp:heroEyebrow':          'Career & Global Growth Platform',
  'hp:heroSubline':          'Career Placement & Global Education Consultancy — Delhi NCR.',
  'hp:heroCtaText':          'Apply for CAP',
  'hp:heroSecondaryCtaText': 'Study Abroad',
  'hp:heroBottomBar':        'Built for global ambition',
  /* Hero — stats */
  'hp:stat1Num': '300+', 'hp:stat1Label': 'Careers Placed',
  'hp:stat2Num': '40%+', 'hp:stat2Label': 'Avg CTC Hike',
  'hp:stat3Num': '140+', 'hp:stat3Label': 'Universities',
  'hp:stat4Num': '₹0',   'hp:stat4Label': 'Upfront Fee',
  /* Hero — offer letter card */
  'hp:heroOfferRole':    'Senior Claims Analyst',
  'hp:heroOfferCompany': 'EXL Service · Noida',
  'hp:heroOfferInitial': 'E',
  'hp:heroOfferCtc':     '₹ 9.2 LPA',
  'hp:heroOfferJoining': 'Aug 2025',
  /* Hero — admit card */
  'hp:heroAdmitUniversity': 'University of Manchester',
  'hp:heroAdmitProgramme':  "MSc International Business · Fall '25",

  /* Services */
  'hp:servicesTagline':  'What We Do',
  'hp:servicesTitle':    'One Platform. Two Powerful Verticals.',
  'hp:servicesSubtitle': 'Both Designed Around Your Growth — Not Our Revenue.',
  'hp:service1Name':     'Career Assistance Programme (CAP) — India',
  'hp:service1Details':  "Resume rebuild, interview coaching, and direct warm introductions to hiring managers at EXL, Optum, WNS, Quatrro & more. We work on your side — not the employer's. Our 12% Career Assistance Fee applies only after your offer letter arrives. Zero upfront, zero risk.",
  'hp:service1CtaLabel': 'See How CAP Works',
  'hp:service2Name':     'Study Abroad Programme — Go Global',
  'hp:service2Details':  '140+ universities across UK, France, Germany & Dubai. Course shortlisting, university applications, SOP writing, and student visa documentation — handled end to end by one dedicated advisor. Real admissions, zero confusion.',
  'hp:service2CtaLabel': 'Explore Study Abroad',

  /* Hiring Partners Marquee */
  'hp:marqueeLabel':     'Our cap candiate have landed roles at',
  'hp:marqueeSub':       'Through our placement network — roles sourced via trusted recruitment partners',
  'hp:marqueeCompanies': 'EXL Services,Quatrro,eBiz Solutions,WNS Global,Optum,Cognizant,Wipro,Infosys BPM,Mphasis,HCL,Genpact,Access Healthcare,Conifer Health',

  /* About Us section (homepage) */
  'hp:aboutTagline':      'About Us',
  'hp:aboutHeading':      'Behind Every Career Success Is a Team That Truly Cares.',
  'hp:aboutBody':         "Placedly was built in India for one reason — most career consultants work for employers, not for you. We flipped the model.\n\nWe are a Career Assistance Programme (CAP) provider and Study Abroad consultancy — both built around the same belief: invest in the person first, earn only when we deliver.\n\nWhether you're a claims analyst targeting your first MNC role, or a student planning a Master's in the UK — our team brings the strategy, connections, and coaching to make it happen. Our 12% Career Assistance Fee applies only after your offer letter is in your hands.",
  'hp:aboutTeamImg':      '/img/team.png',
  'hp:aboutConsultImg':   '/img/aboutt us consultancy.png',
  'hp:aboutBadge1Num':    '300+',
  'hp:aboutBadge1Label':  'Careers Transformed',
  'hp:aboutBadge2Num':    '100+',
  'hp:aboutBadge2Label':  'Hiring Partners',
  'hp:aboutFeat1Title':   'Personalised, Not Templated',
  'hp:aboutFeat1Desc':    'Every candidate and every student gets a roadmap built specifically around their background, goals, and budget — not a generic shortlist.',
  'hp:aboutFeat2Title':   'End-to-End Support',
  'hp:aboutFeat2Desc':    'From CV to offer letter for careers. From counselling to visa filing for study abroad. We stay with you at every step.',
  'hp:aboutFeat3Title':   '100+ Hiring Partners + 140+ Universities',
  'hp:aboutFeat3Desc':    'Direct connects to MNCs actively hiring across India, and university partnerships across UK, France, Germany & Dubai.',
  'hp:aboutCtaText':      'Our Story →',

  /* How It Works */
  'hp:hiwTagline':       'How It Works',
  'hp:hiwTitle':         'How Placedly Works — Simple, Transparent, Proven',
  'hp:hiwSubtitle':      'Placedly connects ambitious professionals to careers and global education. Built for candidates who want clarity, warm guidance, and results — not generic agency noise.',
  'hp:hiw1Title':        'Understand You First',
  'hp:hiw1Details':      'A free 45-minute session where we actually listen. We understand your current role, your target outcome, your domain expertise, and what you truly want — not just what looks good on paper. No templates. No generic advice.',
  'hp:hiw1Highlight':    'Zero charge for this session, ever.',
  'hp:hiw2Title':        'Build Your Roadmap',
  'hp:hiw2Details':      "We map out 10–15 specific roles or universities that genuinely fit your profile, salary expectations, and growth goals. You get a written roadmap — not a list of job portals to spam.",
  'hp:hiw2Highlight':    'Honest shortlist. We say no to bad fits.',
  'hp:hiw3Title':        'Resume + Interview Prep',
  'hp:hiw3Details':      'Complete ATS-optimised resume rebuild, LinkedIn profile overhaul, and 3 rounds of live mock interviews with real feedback. You walk into every interview knowing exactly what to say and how to position yourself.',
  'hp:hiw3Highlight':    'Average 3× more callbacks post-resume rebuild.',
  'hp:hiw4Title':        'Direct Employer Connect',
  'hp:hiw4Details':      'We personally reach out to 10–15 hiring managers at the right companies on your behalf. Not a mass email blast — targeted, warm introductions to people who are actually hiring for your profile.',
  'hp:hiw4Highlight':    'Our direct connects at EXL, Optum, WNS, Genpact & more.',
  'hp:hiw5Title':        'Offer Received. Then We Invoice.',
  'hp:hiw5Details':      "When you have your offer letter in hand, only then does our 12% Career Assistance Fee apply. Not before. Not during. Not at any point in the process unless you've actually grown. That's our entire model.",
  'hp:hiw5Highlight':    '₹0 upfront. 12% only after your offer letter arrives.',

  /* Why Placedly / ChooseUs */
  'hp:whyTitle':    'Why Professionals Choose Placedly',
  'hp:whySubtitle': "We don't just find you a job. We build your career.",

  /* CEO Quote */
  'hp:ceoImg':    'https://cdn.prod.website-files.com/68297ae923cb528bf9784f53/682db74463bfe59bcce17434_Ceo-Quote-Img.png',
  'hp:ceoName':   'Pavan Mishra',
  'hp:ceoRole':   'Founder, Placedly',
  'hp:ceoQuote':  "Most people don't fail in their careers because they lack skill. They fail because no one helped them present that skill the right way, to the right people, at the right time. That's exactly what Placedly exists to fix — for every professional in India and beyond.",
  'hp:ceoCtaText': 'Talk to Our Team',
  'hp:ceoCtaHref': '#contact',

  /* CTA Banner */
  'hp:ctaBannerHeadline': 'We Only Get Paid After You Get Placed.',
  'hp:ctaBannerSub':      'Free consultation. No upfront cost. Start today.',

  /* Footer */
  'hp:footerDesc':      "India's career growth and study abroad consultancy. Career Assistance Programme: 12% Success Share, post-placement only. Study Abroad: UK · France · Germany · Dubai. Zero upfront. We grow when you grow.",
  'hp:footerCtaText':   'Grow Careers. Grow Global.',
  'hp:footerInstagram': 'https://www.instagram.com/',
  'hp:footerTwitter':   'https://twitter.com/',
  'hp:footerLinkedin':  'https://linkedin.com/',
  'hp:footerFacebook':  'https://www.facebook.com/',
  'hp:footerEmail':     'hello@placedly.in',
  'hp:footerWa':        '919876543210',
  'hp:footerCopyright': '© 2026 Placedly · Career Assistance Programme · Study Abroad Consultancy · India · CAP Fee: 12% of Annual CTC · Career Assistance Fee — Not a Placement Fee · Collected post-offer letter only · All engagements governed by signed Candidate Service Agreement',
};

/* ─── component ─────────────────────────────────────────────────────── */

export default function AdminHomepage() {
  const [data, setData] = useState(DEFAULTS);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [status, setStatus] = useState('');

  useEffect(() => {
    fetch('/api/admin/content?prefix=hp:')
      .then(r => r.json())
      .then((saved: Record<string, string>) => { setData({ ...DEFAULTS, ...saved }); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  const set = (k: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => setData(d => ({ ...d, [k]: e.target.value }));
  const setImg = (k: string) => (url: string) => setData(d => ({ ...d, [k]: url }));

  const handleSave = async () => {
    setSaving(true);
    const r = await fetch('/api/admin/content', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data) });
    setSaving(false);
    setStatus(r.ok ? 'Saved!' : 'Save failed');
    setTimeout(() => setStatus(''), 3000);
  };

  if (loading) return <div style={{ padding: '32px', color: '#64748b' }}>Loading…</div>;

  return (
    <div className="adm-page" style={{ padding: '32px' }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px', flexWrap: 'wrap', gap: '12px' }}>
        <div>
          <h1 style={{ fontSize: '22px', fontWeight: 900, color: '#0b0d20', marginBottom: '2px' }}>Homepage Content</h1>
          <p style={{ fontSize: '13px', color: '#64748b' }}>Every section, every word, every image — all editable.</p>
        </div>
        <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
          {status && <span style={{ fontSize: '12px', color: status.includes('fail') ? '#dc2626' : '#16a34a', fontWeight: 600 }}>{status}</span>}
          <button onClick={() => setData(DEFAULTS)} style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '9px 16px', background: '#f1f5f9', color: '#374151', border: 'none', borderRadius: '9px', fontSize: '13px', cursor: 'pointer', fontFamily: "'Poppins',sans-serif" }}>
            <RefreshCw size={13} /> Defaults
          </button>
          <button onClick={handleSave} disabled={saving} style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '9px 20px', background: '#2145fb', color: '#fff', border: 'none', borderRadius: '9px', fontSize: '13px', fontWeight: 600, cursor: 'pointer', fontFamily: "'Poppins',sans-serif", opacity: saving ? 0.7 : 1 }}>
            <Save size={13} /> {saving ? 'Saving…' : 'Save All'}
          </button>
        </div>
      </div>

      {/* ── Hero ── */}
      <Section title="🦸 Hero — Text & CTAs">
        <div style={row}>
          <Inp label="Eyebrow pill text" k="hp:heroEyebrow" data={data} set={set} />
          <Inp label="Subheadline / description" k="hp:heroSubline" data={data} set={set} textarea />
          <div className="adm-grid-2">
            <Inp label="Primary CTA text" k="hp:heroCtaText" data={data} set={set} />
            <Inp label="Secondary CTA text" k="hp:heroSecondaryCtaText" data={data} set={set} />
          </div>
          <Inp label="Bottom bar text" k="hp:heroBottomBar" data={data} set={set} />
        </div>
      </Section>

      <Section title="📊 Hero — Stats Strip" open={false}>
        <div className="adm-grid-4">
          {[1,2,3,4].map(i => (
            <div key={i} style={row}>
              <Inp label={`Stat ${i} number`} k={`hp:stat${i}Num`} data={data} set={set} />
              <Inp label={`Stat ${i} label`} k={`hp:stat${i}Label`} data={data} set={set} />
            </div>
          ))}
        </div>
      </Section>

      <Section title="🪪 Hero — Offer Letter Card" open={false}>
        <div className="adm-grid-2">
          <Inp label="Role / position" k="hp:heroOfferRole" data={data} set={set} />
          <Inp label="Company · Location" k="hp:heroOfferCompany" data={data} set={set} />
          <Inp label="Company initial (icon letter)" k="hp:heroOfferInitial" data={data} set={set} />
          <Inp label="CTC" k="hp:heroOfferCtc" data={data} set={set} />
          <Inp label="Joining date" k="hp:heroOfferJoining" data={data} set={set} />
        </div>
      </Section>

      <Section title="🎓 Hero — Admit Letter Card" open={false}>
        <div style={row}>
          <Inp label="University name" k="hp:heroAdmitUniversity" data={data} set={set} />
          <Inp label="Programme & intake" k="hp:heroAdmitProgramme" data={data} set={set} />
        </div>
      </Section>

      {/* ── Services ── */}
      <Section title="⚙️ Services Section">
        <div style={row}>
          <div className="adm-grid-2">
            <Inp label="Section tagline" k="hp:servicesTagline" data={data} set={set} />
            <Inp label="Section subtitle (below title)" k="hp:servicesSubtitle" data={data} set={set} />
          </div>
          <Inp label="Section title" k="hp:servicesTitle" data={data} set={set} />
          <div style={{ background: '#f8faff', borderRadius: 12, padding: 16, border: '1px solid #e2e8f0' }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: '#2145fb', marginBottom: 12, textTransform: 'uppercase', letterSpacing: '0.4px' }}>Service Card 1 — CAP</div>
            <div style={row}>
              <Inp label="Card title" k="hp:service1Name" data={data} set={set} />
              <Inp label="Card body" k="hp:service1Details" data={data} set={set} textarea />
              <Inp label="CTA label" k="hp:service1CtaLabel" data={data} set={set} />
            </div>
          </div>
          <div style={{ background: '#fff7ed', borderRadius: 12, padding: 16, border: '1px solid #fed7aa' }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: '#f97316', marginBottom: 12, textTransform: 'uppercase', letterSpacing: '0.4px' }}>Service Card 2 — Study Abroad</div>
            <div style={row}>
              <Inp label="Card title" k="hp:service2Name" data={data} set={set} />
              <Inp label="Card body" k="hp:service2Details" data={data} set={set} textarea />
              <Inp label="CTA label" k="hp:service2CtaLabel" data={data} set={set} />
            </div>
          </div>
        </div>
      </Section>

      {/* ── Marquee ── */}
      <Section title="🏢 Hiring Partners Marquee" open={false}>
        <div style={row}>
          <Inp label="Label pill text" k="hp:marqueeLabel" data={data} set={set} />
          <Inp label="Subtitle text" k="hp:marqueeSub" data={data} set={set} />
          <div>
            <label style={lbl}>Companies (comma-separated list)</label>
            <textarea style={{ ...ta, minHeight: 64 }} value={data['hp:marqueeCompanies'] ?? ''} onChange={set('hp:marqueeCompanies')} />
            <div style={{ fontSize: 11, color: '#94a3b8', marginTop: 4 }}>e.g. EXL Services,WNS Global,Optum</div>
          </div>
        </div>
      </Section>

      {/* ── About Us ── */}
      <Section title="🏠 About Us Section (Homepage)">
        <div style={row}>
          <div className="adm-grid-2">
            <Inp label="Section tagline" k="hp:aboutTagline" data={data} set={set} />
            <Inp label="CTA button text" k="hp:aboutCtaText" data={data} set={set} />
          </div>
          <Inp label="Heading" k="hp:aboutHeading" data={data} set={set} />
          <Inp label="Body text (use \\n\\n for paragraph breaks)" k="hp:aboutBody" data={data} set={set} textarea />
          <div className="adm-grid-2">
            <ImageUpload label="Team photo" value={data['hp:aboutTeamImg'] ?? ''} onChange={setImg('hp:aboutTeamImg')} hint="Recommended: 800×600px" />
            <ImageUpload label="Consultancy photo" value={data['hp:aboutConsultImg'] ?? ''} onChange={setImg('hp:aboutConsultImg')} hint="Recommended: 800×600px" />
          </div>
          <div className="adm-grid-2">
            <div style={row}>
              <Inp label="Badge 1 number" k="hp:aboutBadge1Num" data={data} set={set} />
              <Inp label="Badge 1 label" k="hp:aboutBadge1Label" data={data} set={set} />
            </div>
            <div style={row}>
              <Inp label="Badge 2 number" k="hp:aboutBadge2Num" data={data} set={set} />
              <Inp label="Badge 2 label" k="hp:aboutBadge2Label" data={data} set={set} />
            </div>
          </div>
          {[1,2,3].map(i => (
            <div key={i} style={{ background: '#f8faff', borderRadius: 12, padding: 14, border: '1px solid #e2e8f0' }}>
              <div style={{ fontSize: 11, fontWeight: 700, color: '#0b0d20', marginBottom: 10, textTransform: 'uppercase', letterSpacing: '0.4px' }}>Feature {i}</div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: 12 }}>
                <Inp label="Title" k={`hp:aboutFeat${i}Title`} data={data} set={set} />
                <Inp label="Description" k={`hp:aboutFeat${i}Desc`} data={data} set={set} />
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* ── How It Works ── */}
      <Section title="🔄 How It Works" open={false}>
        <div style={row}>
          <div className="adm-grid-2">
            <Inp label="Section tagline" k="hp:hiwTagline" data={data} set={set} />
            <div />
          </div>
          <Inp label="Section title" k="hp:hiwTitle" data={data} set={set} />
          <Inp label="Section subtitle (below title)" k="hp:hiwSubtitle" data={data} set={set} textarea />
          {[1,2,3,4,5].map(i => (
            <div key={i} style={{ background: '#f8faff', borderRadius: 12, padding: 14, border: '1px solid #e2e8f0' }}>
              <div style={{ fontSize: 11, fontWeight: 700, color: '#2145fb', marginBottom: 10, textTransform: 'uppercase', letterSpacing: '0.4px' }}>Step {i} — 0{i}</div>
              <div style={row}>
                <Inp label="Title" k={`hp:hiw${i}Title`} data={data} set={set} />
                <Inp label="Details / body" k={`hp:hiw${i}Details`} data={data} set={set} textarea />
                <Inp label="Highlight (small callout text)" k={`hp:hiw${i}Highlight`} data={data} set={set} />
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* ── Why Placedly ── */}
      <Section title="✅ Why Placedly Section" open={false}>
        <div style={row}>
          <Inp label="Section title" k="hp:whyTitle" data={data} set={set} />
          <Inp label="Section subtitle" k="hp:whySubtitle" data={data} set={set} />
        </div>
      </Section>

      {/* ── CEO Quote ── */}
      <Section title="💬 CEO Quote Section">
        <div style={row}>
          <div className="adm-grid-2">
            <Inp label="CEO name" k="hp:ceoName" data={data} set={set} />
            <Inp label="CEO role / title" k="hp:ceoRole" data={data} set={set} />
          </div>
          <ImageUpload label="CEO photo" value={data['hp:ceoImg'] ?? ''} onChange={setImg('hp:ceoImg')} hint="Square image recommended (e.g. 400×400px)" shape="circle" />
          <Inp label="Quote text (no quotes needed)" k="hp:ceoQuote" data={data} set={set} textarea />
          <div className="adm-grid-2">
            <Inp label="CTA button text" k="hp:ceoCtaText" data={data} set={set} />
            <Inp label="CTA href" k="hp:ceoCtaHref" data={data} set={set} />
          </div>
        </div>
      </Section>

      {/* ── CTA Banner ── */}
      <Section title="🚀 CTA Banner" open={false}>
        <div style={row}>
          <Inp label="Headline" k="hp:ctaBannerHeadline" data={data} set={set} />
          <Inp label="Subtext" k="hp:ctaBannerSub" data={data} set={set} />
        </div>
      </Section>

      {/* ── Footer ── */}
      <Section title="🦶 Footer">
        <div style={row}>
          <Inp label="Footer description text" k="hp:footerDesc" data={data} set={set} textarea />
          <Inp label="Footer CTA button text" k="hp:footerCtaText" data={data} set={set} />
          <div className="adm-grid-2">
            <Inp label="Instagram URL" k="hp:footerInstagram" data={data} set={set} />
            <Inp label="Twitter / X URL" k="hp:footerTwitter" data={data} set={set} />
            <Inp label="LinkedIn URL" k="hp:footerLinkedin" data={data} set={set} />
            <Inp label="Facebook URL" k="hp:footerFacebook" data={data} set={set} />
          </div>
          <div className="adm-grid-2">
            <Inp label="Contact email" k="hp:footerEmail" data={data} set={set} />
            <Inp label="WhatsApp number (without +)" k="hp:footerWa" data={data} set={set} />
          </div>
          <Inp label="Copyright / legal bar text" k="hp:footerCopyright" data={data} set={set} textarea />
        </div>
      </Section>

      {/* Sticky save */}
      <div style={{ position: 'sticky', bottom: 24, display: 'flex', justifyContent: 'flex-end', marginTop: 8 }}>
        <button onClick={handleSave} disabled={saving} style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '12px 28px', background: '#2145fb', color: '#fff', border: 'none', borderRadius: '12px', fontSize: '14px', fontWeight: 700, cursor: 'pointer', fontFamily: "'Poppins',sans-serif", opacity: saving ? 0.7 : 1, boxShadow: '0 8px 24px rgba(33,69,251,0.35)' }}>
          <Save size={15} /> {saving ? 'Saving…' : 'Save All Changes'}
        </button>
      </div>

    </div>
  );
}
