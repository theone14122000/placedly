'use client';
import { Suspense, useState, useEffect, useRef } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { CheckCircle2, ChevronDown } from 'lucide-react';

const inputStyle: React.CSSProperties = {
  display: 'block', width: '100%', padding: '11px 14px',
  border: '1.5px solid #e2e8f0', borderRadius: '10px',
  fontSize: '14px', fontFamily: "'Poppins',sans-serif",
  color: '#0b0d20', background: '#f8faff', outline: 'none',
  boxSizing: 'border-box' as const, transition: 'border-color 0.15s, box-shadow 0.15s',
};

const labelStyle: React.CSSProperties = {
  display: 'block', fontSize: '11px', fontWeight: 700, color: '#374151',
  letterSpacing: '0.5px', textTransform: 'uppercase' as const, marginBottom: '6px',
};

function Section({ n, title, children }: { n: string; title: string; children: React.ReactNode }) {
  return (
    <div style={{ marginBottom: 22 }}>
      <div style={{ fontSize: 13, fontWeight: 800, color: '#0b0d20', marginBottom: 6, display: 'flex', alignItems: 'center', gap: 8 }}>
        <span style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: 22, height: 22, borderRadius: '50%', background: '#eff6ff', color: '#2145fb', fontSize: 11, fontWeight: 900, flexShrink: 0 }}>{n}</span>
        <span dangerouslySetInnerHTML={{ __html: title }} />
      </div>
      <div style={{ paddingLeft: 30 }}>{children}</div>
    </div>
  );
}

function CAPApplyForm() {
  const searchParams = useSearchParams();
  const [form, setForm] = useState({
    name: '', email: '', phone: '', city: '',
    experience: '', currentRole: '', targetRole: '', message: '',
  });
  const [referralCode, setReferralCode] = useState('');
  const [referrerName, setReferrerName] = useState('');
  const [focused, setFocused] = useState('');
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState('');
  const [showTc, setShowTc] = useState(false);
  const [tcChecked, setTcChecked] = useState(false);
  const [hasScrolled, setHasScrolled] = useState(false);
  const tcBodyRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ref = searchParams.get('ref');
    if (!ref) return;
    fetch(`/api/freelancer/referral?code=${ref}`)
      .then(r => r.json())
      .then(d => {
        if (d.valid) { setReferralCode(ref); setReferrerName(d.name); }
      })
      .catch(() => {});
  }, [searchParams]);

  const fi = (n: string): React.CSSProperties => ({
    ...inputStyle,
    borderColor: focused === n ? '#2145fb' : '#e2e8f0',
    background: focused === n ? '#fff' : '#f8faff',
    boxShadow: focused === n ? '0 0 0 3px rgba(33,69,251,0.10)' : 'none',
  });

  const set = (k: string, v: string) => setForm(f => ({ ...f, [k]: v }));
  const fp = (n: string) => ({ onFocus: () => setFocused(n), onBlur: () => setFocused('') });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setShowTc(true);
  };

  const handleAgreeAndSubmit = async () => {
    if (!tcChecked) return;
    setLoading(true);
    setError('');
    setShowTc(false);
    try {
      const r = await fetch('/api/cap/apply', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, referralCode: referralCode || undefined }),
      });
      const data = await r.json();
      if (r.ok) setDone(true);
      else setError(data.error ?? 'Something went wrong.');
    } catch {
      setError('Network error. Please try again.');
    }
    setLoading(false);
  };

  if (done) return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#f8faff', fontFamily: "'Poppins',sans-serif", padding: '24px' }}>
      <div style={{ maxWidth: '480px', textAlign: 'center' }}>
        <CheckCircle2 size={56} color="#16a34a" style={{ marginBottom: '16px' }} />
        <h1 style={{ fontSize: '24px', fontWeight: 900, color: '#0b0d20', marginBottom: '10px' }}>Application submitted!</h1>
        <p style={{ fontSize: '15px', color: '#64748b', lineHeight: 1.7, marginBottom: '28px' }}>
          We&apos;ve received your application. Our team will review it and send your login credentials to <strong>{form.email}</strong> once approved — usually within 1–2 business days.
        </p>
        <Link href="/" style={{ padding: '12px 28px', background: '#2145fb', color: '#fff', borderRadius: '10px', fontWeight: 700, fontSize: '14px', textDecoration: 'none' }}>
          Back to Home
        </Link>
      </div>
    </div>
  );

  return (
    <>
    <div style={{ minHeight: '100vh', background: '#f8faff', fontFamily: "'Poppins',sans-serif", padding: '40px 24px' }}>
      <div style={{ maxWidth: '640px', margin: '0 auto' }}>
        {/* Header */}
        <div style={{ marginBottom: '32px', textAlign: 'center' }}>
          <Link href="/" style={{ display: 'inline-block', marginBottom: '24px' }}>
            <img src="/logo.png" alt="Placedly" style={{ height: '44px' }} />
          </Link>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', marginBottom: '12px', background: '#eff6ff', border: '1px solid #bfdbfe', borderRadius: '999px', padding: '5px 14px' }}>
            <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#2145fb' }} />
            <span style={{ fontSize: '12px', fontWeight: 700, color: '#2145fb', textTransform: 'uppercase', letterSpacing: '0.5px' }}>CAP Application</span>
          </div>
          <h1 style={{ fontSize: '28px', fontWeight: 900, color: '#0b0d20', lineHeight: 1.2, marginBottom: '10px' }}>
            Join the Career Assistance Programme
          </h1>
          <p style={{ fontSize: '15px', color: '#64748b', lineHeight: 1.7 }}>
            Fill in the form below. We&apos;ll review your application and send you portal access within 1–2 business days.
          </p>
        </div>

        {/* Referral banner */}
        {referrerName && (
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '12px 16px', background: '#f5f3ff', border: '1px solid #ddd6fe', borderRadius: '10px', marginBottom: '20px' }}>
            <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: '#7c3aed', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, fontSize: '15px', fontWeight: 900, color: '#fff' }}>
              {referrerName[0]}
            </div>
            <div>
              <div style={{ fontSize: '13px', fontWeight: 700, color: '#4c1d95' }}>Referred by {referrerName}</div>
              <div style={{ fontSize: '12px', color: '#7c3aed' }}>You&apos;ve been personally referred by a Placedly partner.</div>
            </div>
          </div>
        )}

        {/* Form card */}
        <div style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: '16px', padding: '36px', boxShadow: '0 4px 24px rgba(0,0,0,0.06)' }}>
          {error && (
            <div style={{ padding: '12px 16px', background: '#fef2f2', border: '1px solid #fecaca', borderRadius: '10px', fontSize: '13px', color: '#dc2626', marginBottom: '20px', lineHeight: 1.6 }}>
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>

            {/* Name + Email */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
              <div>
                <label style={labelStyle}>Full Name *</label>
                <input required placeholder="Rahul Sharma" style={fi('name')} value={form.name}
                  onChange={e => set('name', e.target.value)} {...fp('name')} />
              </div>
              <div>
                <label style={labelStyle}>Email *</label>
                <input type="email" required placeholder="you@email.com" style={fi('email')} value={form.email}
                  onChange={e => set('email', e.target.value)} {...fp('email')} />
              </div>
            </div>

            {/* Phone + City */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
              <div>
                <label style={labelStyle}>Phone *</label>
                <input required placeholder="+91 98765 43210" style={fi('phone')} value={form.phone}
                  onChange={e => set('phone', e.target.value)} {...fp('phone')} />
              </div>
              <div>
                <label style={labelStyle}>City *</label>
                <input required placeholder="Delhi" style={fi('city')} value={form.city}
                  onChange={e => set('city', e.target.value)} {...fp('city')} />
              </div>
            </div>

            {/* Experience + Current Role */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
              <div>
                <label style={labelStyle}>Experience *</label>
                <select required value={form.experience} onChange={e => set('experience', e.target.value)}
                  style={{ ...fi('experience'), appearance: 'auto' }} {...fp('experience')}>
                  <option value="">Select…</option>
                  <option>Fresher (0–1 year)</option>
                  <option>1–3 years</option>
                  <option>3–5 years</option>
                  <option>5–8 years</option>
                  <option>8+ years</option>
                </select>
              </div>
              <div>
                <label style={labelStyle}>Current Role</label>
                <input placeholder="e.g. Claims Processor" style={fi('currentRole')} value={form.currentRole}
                  onChange={e => set('currentRole', e.target.value)} {...fp('currentRole')} />
              </div>
            </div>

            {/* Target Role */}
            <div>
              <label style={labelStyle}>Target Role / Goal *</label>
              <input required placeholder="e.g. Senior Analyst at an MNC" style={fi('targetRole')} value={form.targetRole}
                onChange={e => set('targetRole', e.target.value)} {...fp('targetRole')} />
            </div>

            {/* Message */}
            <div>
              <label style={labelStyle}>Anything else you&apos;d like us to know?</label>
              <textarea placeholder="Tell us about your situation, salary expectations, timeline…"
                rows={4} value={form.message} onChange={e => set('message', e.target.value)}
                style={{ ...fi('message'), resize: 'vertical' as const }} {...fp('message')} />
            </div>

            <button type="submit" disabled={loading} style={{
              display: 'block', width: '100%', padding: '14px', textAlign: 'center',
              background: loading ? '#93a5fd' : '#2145fb', color: '#fff',
              fontWeight: 700, fontSize: '15px', fontFamily: "'Poppins',sans-serif",
              border: 'none', borderRadius: '10px', cursor: loading ? 'not-allowed' : 'pointer',
              boxShadow: '0 4px 18px rgba(33,69,251,0.25)',
            }}>
              {loading ? 'Submitting…' : 'Submit Application →'}
            </button>
          </form>
        </div>

        <p style={{ fontSize: '12px', color: '#94a3b8', textAlign: 'center', marginTop: '20px', lineHeight: 1.6 }}>
          Already approved?{' '}
          <Link href="/login" style={{ color: '#2145fb', fontWeight: 600 }}>Sign in here →</Link>
        </p>
      </div>
    </div>

    {/* ── T&C Modal ── */}
    {showTc && (
      <div style={{ position: 'fixed', inset: 0, background: 'rgba(11,13,32,0.72)', zIndex: 999, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '16px', fontFamily: "'Poppins',sans-serif", backdropFilter: 'blur(4px)' }}>
        <div style={{ background: '#fff', borderRadius: 20, width: '100%', maxWidth: 560, maxHeight: '92vh', display: 'flex', flexDirection: 'column', boxShadow: '0 32px 80px rgba(0,0,0,0.32)', overflow: 'hidden' }}>

          {/* Sticky header */}
          <div style={{ padding: '22px 28px 18px', borderBottom: '1px solid #e2e8f0', flexShrink: 0 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 6 }}>
              <div style={{ width: 32, height: 32, borderRadius: 8, background: '#eff6ff', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#2145fb" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg>
              </div>
              <div>
                <div style={{ fontSize: 16, fontWeight: 900, color: '#0b0d20', lineHeight: 1.2 }}>Career Assistance Programme</div>
                <div style={{ fontSize: 12, color: '#64748b' }}>Service Agreement &amp; Terms of Enrolment</div>
              </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '7px 12px', background: '#fffbeb', border: '1px solid #fde68a', borderRadius: 8 }}>
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#d97706" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
              <span style={{ fontSize: 12, color: '#92400e', fontWeight: 600 }}>Please read the full agreement before accepting</span>
            </div>
          </div>

          {/* Scrollable body */}
          <div
            ref={tcBodyRef}
            onScroll={() => {
              const el = tcBodyRef.current;
              if (!el) return;
              if (el.scrollTop + el.clientHeight >= el.scrollHeight - 24) setHasScrolled(true);
            }}
            style={{ overflowY: 'auto', flex: 1, padding: '24px 28px', fontSize: 13, color: '#374151', lineHeight: 1.85 }}
          >
            <p style={{ fontSize: 14, fontWeight: 700, color: '#0b0d20', marginBottom: 4 }}>Last updated: May 2025</p>
            <p style={{ marginBottom: 20, color: '#64748b' }}>This Service Agreement ("Agreement") is entered into between <strong>Placedly</strong> ("Company", "We", "Us") and the individual submitting this application ("Candidate", "You"). By submitting the CAP application you acknowledge that you have read, understood, and agree to be bound by the following terms.</p>

            <Section n="1" title="Programme Overview">
              The Career Assistance Programme (CAP) is a structured, advisor-led placement support service designed to help professionals secure suitable employment. CAP includes, but is not limited to: resume development, interview preparation, employer introductions, offer negotiation support, and post-placement follow-up. Enrolment is subject to approval by Placedly at its sole discretion.
            </Section>

            <Section n="2" title="Candidate Eligibility &amp; Responsibilities">
              <p>To participate in CAP you agree to:</p>
              <ul style={{ paddingLeft: 20, marginTop: 6, display: 'flex', flexDirection: 'column', gap: 6 }}>
                <li>Provide accurate, complete, and up-to-date personal and professional information throughout the programme.</li>
                <li>Attend all scheduled advisor calls, assessment sessions, and employer interviews on time. Missed sessions without prior notice (minimum 4 hours in advance) may result in rescheduling fees or programme suspension.</li>
                <li>Respond to communications from your assigned advisor within 24 hours on business days.</li>
                <li>Act professionally and ethically in all interactions facilitated by Placedly, including interactions with prospective employers.</li>
                <li>Immediately inform Placedly if you independently receive or accept a job offer during the programme period.</li>
                <li>Not share proprietary tools, templates, or materials provided by Placedly with third parties.</li>
              </ul>
            </Section>

            <Section n="3" title="Success-Share Fee Model">
              <p>Placedly operates on a <strong>success-share model</strong>. No upfront or monthly fees are charged for CAP enrolment.</p>
              <ul style={{ paddingLeft: 20, marginTop: 6, display: 'flex', flexDirection: 'column', gap: 6 }}>
                <li><strong>Fee:</strong> A success fee of <strong>12% of your first month's gross CTC</strong> (Cost to Company) is payable upon successful placement into a role directly facilitated by Placedly.</li>
                <li><strong>Trigger:</strong> The fee becomes due within 15 calendar days of your first day of employment at the placed organisation.</li>
                <li><strong>Facilitated Placement:</strong> A placement is considered "facilitated by Placedly" if the employer connection was established through Placedly's network, job board, or advisor introduction, whether or not you independently pursued the same employer.</li>
                <li><strong>Dispute Resolution:</strong> Any dispute regarding whether a placement was facilitated must be raised in writing within 7 days of offer acceptance. Disputes raised after this window will not be entertained.</li>
                <li><strong>Non-Payment:</strong> Failure to remit the success fee within the stipulated period may result in legal recovery proceedings, credit reporting, and blacklisting from future Placedly programmes.</li>
              </ul>
            </Section>

            <Section n="4" title="Programme Duration &amp; Renewal">
              The CAP enrolment is valid for the duration specified in your programme plan (typically 60–90 days from the date of portal access grant). If placement is not achieved within this period and both parties mutually agree, the programme may be extended at Placedly's discretion. Extensions do not reset the fee obligation for any placement achieved within or after the original term.
            </Section>

            <Section n="5" title="Data Privacy &amp; Confidentiality">
              <ul style={{ paddingLeft: 20, marginTop: 0, display: 'flex', flexDirection: 'column', gap: 6 }}>
                <li>All personal data you provide is collected and processed in accordance with applicable Indian data protection laws and Placedly's Privacy Policy.</li>
                <li>Your information (resume, contact details, professional background) will be shared with prospective employers solely for the purpose of facilitating your placement.</li>
                <li>Placedly will not sell your personal data to third parties or use it for any purpose unrelated to your programme.</li>
                <li>You grant Placedly a non-exclusive licence to present your anonymised profile data for internal analytics and service improvement.</li>
                <li>Any sensitive information (salary slips, offer letters, medical records) shared with your advisor will be treated as strictly confidential.</li>
              </ul>
            </Section>

            <Section n="6" title="Intellectual Property">
              All course materials, resume templates, interview guides, assessment tools, and proprietary frameworks provided by Placedly remain the exclusive intellectual property of Placedly. You may use these materials solely for your personal career development during the programme period. Reproduction, distribution, resale, or derivative use of any Placedly material is strictly prohibited.
            </Section>

            <Section n="7" title="Termination">
              <p>Either party may terminate participation in the CAP under the following conditions:</p>
              <ul style={{ paddingLeft: 20, marginTop: 6, display: 'flex', flexDirection: 'column', gap: 6 }}>
                <li><strong>By Candidate:</strong> You may withdraw at any time by written notice to your advisor. No fee is payable if withdrawal occurs before any placement facilitated by Placedly.</li>
                <li><strong>By Placedly:</strong> We reserve the right to suspend or terminate your access if you breach any term of this Agreement, provide false information, engage in misconduct, or fail to meet programme milestones. Termination does not waive the success fee obligation for any placement already in progress.</li>
              </ul>
            </Section>

            <Section n="8" title="Limitation of Liability">
              Placedly acts as a facilitator and does not guarantee employment. We shall not be liable for any loss, damage, or expense arising from: (a) your failure to secure employment; (b) an employer's decision to withdraw an offer; (c) any representation made by an employer; or (d) delays outside our reasonable control. Our maximum aggregate liability under this Agreement shall not exceed the success fee actually paid by you.
            </Section>

            <Section n="9" title="Governing Law &amp; Dispute Resolution">
              This Agreement is governed by the laws of India. Any dispute arising under or in connection with this Agreement shall first be attempted to be resolved through good-faith negotiation. If unresolved within 30 days, disputes shall be submitted to binding arbitration in New Delhi under the Arbitration and Conciliation Act, 1996, before a sole arbitrator appointed by mutual agreement.
            </Section>

            <Section n="10" title="Amendments">
              Placedly reserves the right to update these terms at any time. Material changes will be notified via email or in-portal notification at least 7 days before taking effect. Continued participation in the programme after notification constitutes acceptance of the revised terms.
            </Section>

            <div style={{ marginTop: 20, padding: '14px 16px', background: '#f8faff', border: '1px solid #e2e8f0', borderRadius: 10, fontSize: 12, color: '#64748b', lineHeight: 1.7 }}>
              By accepting below, you confirm that you are at least 18 years of age, have the legal capacity to enter into this Agreement, and that the information provided in your application is true and accurate to the best of your knowledge.
            </div>
          </div>

          {/* Scroll indicator */}
          {!hasScrolled && (
            <div style={{ textAlign: 'center', padding: '8px 0', background: '#fff', borderTop: '1px solid #f1f5f9', flexShrink: 0 }}>
              <span style={{ fontSize: 11, color: '#94a3b8', display: 'inline-flex', alignItems: 'center', gap: 4 }}>
                <ChevronDown size={13} /> Scroll down to read all terms
              </span>
            </div>
          )}

          {/* Sticky footer */}
          <div style={{ padding: '16px 28px 20px', borderTop: '1px solid #e2e8f0', flexShrink: 0, background: '#fff' }}>
            <label style={{ display: 'flex', alignItems: 'flex-start', gap: 10, cursor: hasScrolled ? 'pointer' : 'not-allowed', marginBottom: 14, opacity: hasScrolled ? 1 : 0.4, transition: 'opacity 0.3s' }}>
              <input type="checkbox" checked={tcChecked} disabled={!hasScrolled} onChange={e => setTcChecked(e.target.checked)}
                style={{ marginTop: 3, width: 16, height: 16, accentColor: '#2145fb', flexShrink: 0, cursor: hasScrolled ? 'pointer' : 'not-allowed' }} />
              <span style={{ fontSize: 13, color: '#374151', lineHeight: 1.6 }}>
                I have read the complete Placedly Career Assistance Programme Service Agreement and agree to be bound by all its terms and conditions.
              </span>
            </label>
            <div style={{ display: 'flex', gap: 10 }}>
              <button onClick={() => { setShowTc(false); setTcChecked(false); setHasScrolled(false); }}
                style={{ flex: 1, padding: '11px', background: '#f1f5f9', border: 'none', borderRadius: 10, fontSize: 13, fontWeight: 600, cursor: 'pointer', color: '#374151', fontFamily: "'Poppins',sans-serif" }}>
                Go Back
              </button>
              <button onClick={handleAgreeAndSubmit} disabled={!tcChecked || !hasScrolled || loading}
                style={{ flex: 2, padding: '11px', background: (tcChecked && hasScrolled) ? '#2145fb' : '#e2e8f0', border: 'none', borderRadius: 10, fontSize: 13, fontWeight: 700, cursor: (tcChecked && hasScrolled) ? 'pointer' : 'not-allowed', color: (tcChecked && hasScrolled) ? '#fff' : '#94a3b8', fontFamily: "'Poppins',sans-serif", transition: 'all 0.25s', boxShadow: (tcChecked && hasScrolled) ? '0 4px 16px rgba(33,69,251,0.25)' : 'none' }}>
                {loading ? 'Submitting…' : 'I Agree & Submit Application →'}
              </button>
            </div>
          </div>
        </div>
      </div>
    )}
    </>
  );
}

export default function CAPApplyPage() {
  return (
    <Suspense>
      <CAPApplyForm />
    </Suspense>
  );
}
