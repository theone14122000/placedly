'use client';

import { useState, useEffect, useRef } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import {
  CheckCircle2, ChevronDown, ArrowRight, ArrowLeft,
  User, Briefcase, Sparkles, ShieldCheck, Rocket,
  FileText, AlertTriangle, Mail, Phone, MapPin, Target,
} from 'lucide-react';

/* ═══════════════════════ Brand tokens ═══════════════════════ */
const G = {
  blue:   '#2563eb',
  indigo: '#7c8ff0',
  orange: '#fb923c',
  rose:   '#f43f5e',
  purple: '#a855f7',
};

const STEP_COLORS = [G.blue, G.purple, G.orange];
const STEP_META = [
  { label: 'Personal Info', Icon: User },
  { label: 'Career Goals',  Icon: Briefcase },
  { label: 'Final Review',  Icon: Sparkles },
];

const inputBase: React.CSSProperties = {
  display: 'block', width: '100%', padding: '12px 14px',
  border: '1.5px solid #e2e8f0', borderRadius: '12px',
  fontSize: '14px', fontFamily: "'Poppins',sans-serif",
  color: '#0b0d20', background: '#f8faff', outline: 'none',
  boxSizing: 'border-box' as const,
  transition: 'border-color 0.2s ease, box-shadow 0.2s ease, background 0.2s ease',
};

const labelStyle: React.CSSProperties = {
  display: 'block', fontSize: '11px', fontWeight: 700, color: '#374151',
  letterSpacing: '0.6px', textTransform: 'uppercase' as const, marginBottom: '7px',
};

/* ═══════════════════════ Small primitives ═══════════════════════ */

function GradientText({
  children, tag: Tag = 'span', style = {},
}: { children: React.ReactNode; tag?: 'h1' | 'h2' | 'span'; style?: React.CSSProperties }) {
  return (
    <Tag
      style={{
        backgroundImage: `linear-gradient(270deg, ${G.blue}, ${G.indigo}, ${G.orange}, ${G.rose}, ${G.purple}, ${G.blue})`,
        backgroundSize: '300% 300%',
        WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
        animation: 'capa-grad 6s ease infinite',
        display: 'inline-block',
        ...style,
      }}
    >
      {children}
    </Tag>
  );
}

function AmbientBlobs() {
  return (
    <>
      <div aria-hidden className="capa-blob capa-blob-blue" />
      <div aria-hidden className="capa-blob capa-blob-orange" />
    </>
  );
}

function Section({ n, title, children }: { n: string; title: string; children: React.ReactNode }) {
  return (
    <div style={{ marginBottom: 22 }}>
      <div style={{ fontSize: 13, fontWeight: 800, color: '#0b0d20', marginBottom: 6, display: 'flex', alignItems: 'center', gap: 8 }}>
        <span style={{
          display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
          width: 24, height: 24, borderRadius: '50%',
          background: `linear-gradient(135deg, ${G.blue}, ${G.indigo})`,
          color: '#fff', fontSize: 11, fontWeight: 900, flexShrink: 0,
        }}>{n}</span>
        <span dangerouslySetInnerHTML={{ __html: title }} />
      </div>
      <div style={{ paddingLeft: 32 }}>{children}</div>
    </div>
  );
}

/* ═══════════════════════ Main component ═══════════════════════ */

export default function CAPApplyClient() {
  const searchParams = useSearchParams();

  const [step, setStep] = useState(0);
  const [shake, setShake] = useState(false);
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
  const [tcProgress, setTcProgress] = useState(0);
  const tcBodyRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ref = searchParams.get('ref');
    if (!ref) return;
    fetch(`/api/freelancer/referral?code=${ref}`)
      .then(r => r.json())
      .then(d => { if (d.valid) { setReferralCode(ref); setReferrerName(d.name); } })
      .catch(() => {});
  }, [searchParams]);

  const fi = (n: string): React.CSSProperties => ({
    ...inputBase,
    borderColor: focused === n ? G.blue : '#e2e8f0',
    background: focused === n ? '#fff' : '#f8faff',
    boxShadow: focused === n ? `0 0 0 4px ${G.blue}18` : 'none',
  });

  const set = (k: string, v: string) => setForm(f => ({ ...f, [k]: v }));
  const fp = (n: string) => ({ onFocus: () => setFocused(n), onBlur: () => setFocused('') });

  const step0Valid = !!(form.name && form.email && form.phone && form.city);
  const step1Valid = !!(form.experience && form.targetRole);
  const stepValid = [step0Valid, step1Valid, true][step];

  function goNext() {
    if (!stepValid) {
      setShake(true);
      setTimeout(() => setShake(false), 450);
      return;
    }
    setStep(s => Math.min(s + 1, 2));
  }
  function goBack() {
    setStep(s => Math.max(s - 1, 0));
  }

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

  function handleTcScroll() {
    const el = tcBodyRef.current;
    if (!el) return;
    const pct = (el.scrollTop / (el.scrollHeight - el.clientHeight)) * 100;
    setTcProgress(Math.min(100, Math.max(0, pct)));
    if (el.scrollTop + el.clientHeight >= el.scrollHeight - 24) setHasScrolled(true);
  }

  /* ═══════════════════════ Success screen ═══════════════════════ */
  if (done) {
    return (
      <div className="capa-success-wrap">
        <AmbientBlobs />
        <div aria-hidden className="capa-confetti">
          {Array.from({ length: 10 }).map((_, i) => (
            <span key={i} className="capa-confetti-dot" style={{
              left: `${8 + i * 9}%`,
              background: STEP_COLORS[i % STEP_COLORS.length],
              animationDelay: `${i * 0.15}s`,
              animationDuration: `${3 + (i % 3)}s`,
            }} />
          ))}
        </div>
        <div className="capa-success-card">
          <div className="capa-success-icon-wrap">
            <div className="capa-success-ring" />
            <div className="capa-success-ring capa-success-ring-2" />
            <CheckCircle2 size={52} color="#16a34a" strokeWidth={2.2} />
          </div>
          <h1 className="capa-success-h1">Application <GradientText>Submitted!</GradientText></h1>
          <p className="capa-success-body">
            We&apos;ve received your application. Our team will review it and send your login credentials to{' '}
            <strong style={{ color: '#0b0d20' }}>{form.email}</strong> once approved — usually within 1–2 business days.
          </p>
          <Link href="/" className="capa-btn capa-btn-primary" style={{ display: 'inline-flex' }}>
            <Rocket size={15} /> Back to Home
          </Link>
        </div>
      </div>
    );
  }

  /* ═══════════════════════ Main form ═══════════════════════ */
  return (
    <>
      <div className="capa-page">
        <AmbientBlobs />
        <div className="capa-container">

          {/* Header */}
          <div className="capa-header">
            <Link href="/" style={{ display: 'inline-block', marginBottom: '22px' }}>
              <img src="/logo.png" alt="Placedly" style={{ height: '42px' }} />
            </Link>
            <div className="capa-badge">
              <span className="capa-badge-dot" />
              <span>CAP Application</span>
            </div>
            <h1 className="capa-h1">
              Join the <GradientText tag="h1" style={{ display: 'inline' }}>Career Assistance Programme</GradientText>
            </h1>
            <p className="capa-lead">
              Fill in the form below. We&apos;ll review your application and send you portal access within 1–2 business days.
            </p>
          </div>

          {/* Referral banner */}
          {referrerName && (
            <div className="capa-referral">
              <div className="capa-referral-avatar">{referrerName[0]}</div>
              <div>
                <div className="capa-referral-name">Referred by {referrerName}</div>
                <div className="capa-referral-sub">You&apos;ve been personally referred by a Placedly partner.</div>
              </div>
            </div>
          )}

          {/* Step indicator */}
          <div className="capa-steps">
            {STEP_META.map((s, i) => {
              const active = i === step;
              const completed = i < step;
              const color = STEP_COLORS[i];
              return (
                <div key={s.label} className="capa-step-item">
                  <div className="capa-step-node">
                    <div
                      className={`capa-step-circle ${active ? 'is-active' : ''} ${completed ? 'is-done' : ''}`}
                      style={{ '--sc': color } as React.CSSProperties}
                    >
                      {completed ? <CheckCircle2 size={16} /> : <s.Icon size={15} />}
                    </div>
                    {i < STEP_META.length - 1 && (
                      <div className="capa-step-line">
                        <div className="capa-step-line-fill" style={{ width: completed ? '100%' : '0%', background: `linear-gradient(90deg, ${color}, ${STEP_COLORS[i + 1]})` }} />
                      </div>
                    )}
                  </div>
                  <span className={`capa-step-label ${active ? 'is-active' : ''}`}>{s.label}</span>
                </div>
              );
            })}
          </div>

          {/* Form card */}
          <div className={`capa-card ${shake ? 'capa-shake' : ''}`}>
            {error && (
              <div className="capa-error">
                <AlertTriangle size={16} style={{ flexShrink: 0, marginTop: 1 }} />
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit}>
              {/* ── Step 0: Personal ── */}
              {step === 0 && (
                <div key="step-0" className="capa-step-panel">
                  <div className="capa-grid-2">
                    <div>
                      <label style={labelStyle}><User size={11} style={{ display: 'inline', marginRight: 5, verticalAlign: -1 }} />Full Name *</label>
                      <input required placeholder="Rahul Sharma" style={fi('name')} value={form.name}
                        onChange={e => set('name', e.target.value)} {...fp('name')} />
                    </div>
                    <div>
                      <label style={labelStyle}><Mail size={11} style={{ display: 'inline', marginRight: 5, verticalAlign: -1 }} />Email *</label>
                      <input type="email" required placeholder="you@email.com" style={fi('email')} value={form.email}
                        onChange={e => set('email', e.target.value)} {...fp('email')} />
                    </div>
                  </div>
                  <div className="capa-grid-2">
                    <div>
                      <label style={labelStyle}><Phone size={11} style={{ display: 'inline', marginRight: 5, verticalAlign: -1 }} />Phone *</label>
                      <input required placeholder="+91 98765 43210" style={fi('phone')} value={form.phone}
                        onChange={e => set('phone', e.target.value)} {...fp('phone')} />
                    </div>
                    <div>
                      <label style={labelStyle}><MapPin size={11} style={{ display: 'inline', marginRight: 5, verticalAlign: -1 }} />City *</label>
                      <input required placeholder="Delhi" style={fi('city')} value={form.city}
                        onChange={e => set('city', e.target.value)} {...fp('city')} />
                    </div>
                  </div>
                </div>
              )}

              {/* ── Step 1: Career ── */}
              {step === 1 && (
                <div key="step-1" className="capa-step-panel">
                  <div className="capa-grid-2">
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
                      <label style={labelStyle}><Briefcase size={11} style={{ display: 'inline', marginRight: 5, verticalAlign: -1 }} />Current Role</label>
                      <input placeholder="e.g. Claims Processor" style={fi('currentRole')} value={form.currentRole}
                        onChange={e => set('currentRole', e.target.value)} {...fp('currentRole')} />
                    </div>
                  </div>
                  <div>
                    <label style={labelStyle}><Target size={11} style={{ display: 'inline', marginRight: 5, verticalAlign: -1 }} />Target Role / Goal *</label>
                    <input required placeholder="e.g. Senior Analyst at an MNC" style={fi('targetRole')} value={form.targetRole}
                      onChange={e => set('targetRole', e.target.value)} {...fp('targetRole')} />
                  </div>
                </div>
              )}

              {/* ── Step 2: Review ── */}
              {step === 2 && (
                <div key="step-2" className="capa-step-panel">
                  <div className="capa-review">
                    <div className="capa-review-title"><Sparkles size={14} color={G.orange} /> Review your details</div>
                    <div className="capa-review-grid">
                      {[
                        ['Name', form.name], ['Email', form.email],
                        ['Phone', form.phone], ['City', form.city],
                        ['Experience', form.experience], ['Target Role', form.targetRole],
                      ].map(([k, v]) => (
                        <div key={k} className="capa-review-item">
                          <span className="capa-review-k">{k}</span>
                          <span className="capa-review-v">{v || '—'}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label style={labelStyle}>Anything else you&apos;d like us to know?</label>
                    <textarea placeholder="Tell us about your situation, salary expectations, timeline…"
                      rows={4} value={form.message} onChange={e => set('message', e.target.value)}
                      style={{ ...fi('message'), resize: 'vertical' as const }} {...fp('message')} />
                  </div>
                </div>
              )}

              {/* Nav buttons */}
              <div className="capa-nav-row">
                {step > 0 ? (
                  <button type="button" onClick={goBack} className="capa-btn capa-btn-ghost">
                    <ArrowLeft size={14} /> Back
                  </button>
                ) : <span />}

                {step < 2 ? (
                  <button type="button" onClick={goNext} className="capa-btn capa-btn-primary" style={{ opacity: stepValid ? 1 : 0.55 }}>
                    Continue <span className="capa-arrow"><ArrowRight size={14} /></span>
                  </button>
                ) : (
                  <button type="submit" disabled={loading} className="capa-btn capa-btn-primary" style={{ opacity: loading ? 0.7 : 1 }}>
                    {loading ? 'Submitting…' : <>Submit Application <span className="capa-arrow"><ArrowRight size={14} /></span></>}
                  </button>
                )}
              </div>
            </form>
          </div>

          <p className="capa-footer-link">
            Already approved?{' '}
            <Link href="/login" style={{ color: G.blue, fontWeight: 700 }}>Sign in here →</Link>
          </p>
        </div>
      </div>

      {/* ── T&C Modal ── */}
      {showTc && (
        <div className="capa-modal-backdrop">
          <div className="capa-modal">

            <div className="capa-modal-header">
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 }}>
                <div className="capa-modal-icon">
                  <FileText size={16} color={G.blue} />
                </div>
                <div>
                  <div style={{ fontSize: 16, fontWeight: 900, color: '#0b0d20', lineHeight: 1.2 }}>Career Assistance Programme</div>
                  <div style={{ fontSize: 12, color: '#64748b' }}>Service Agreement &amp; Terms of Enrolment</div>
                </div>
              </div>
              <div className="capa-modal-warning">
                <AlertTriangle size={13} color="#d97706" />
                <span>Please read the full agreement before accepting</span>
              </div>
              {/* Reading progress bar */}
              <div className="capa-modal-progress-track">
                <div className="capa-modal-progress-fill" style={{ width: `${tcProgress}%` }} />
              </div>
            </div>

            <div ref={tcBodyRef} onScroll={handleTcScroll} className="capa-modal-body">
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

              <div className="capa-modal-notice">
                By accepting below, you confirm that you are at least 18 years of age, have the legal capacity to enter into this Agreement, and that the information provided in your application is true and accurate to the best of your knowledge.
              </div>
            </div>

            {!hasScrolled && (
              <div className="capa-scroll-hint">
                <ChevronDown size={13} className="capa-chevron-bounce" /> Scroll down to read all terms
              </div>
            )}

            <div className="capa-modal-footer">
              <label className={`capa-checkbox-row ${hasScrolled ? '' : 'is-disabled'}`}>
                <span className={`capa-checkbox ${tcChecked ? 'is-checked' : ''}`}>
                  <input type="checkbox" checked={tcChecked} disabled={!hasScrolled} onChange={e => setTcChecked(e.target.checked)} />
                  <CheckCircle2 size={13} className="capa-checkbox-icon" />
                </span>
                <span style={{ fontSize: 13, color: '#374151', lineHeight: 1.6 }}>
                  I have read the complete Placedly Career Assistance Programme Service Agreement and agree to be bound by all its terms and conditions.
                </span>
              </label>
              <div style={{ display: 'flex', gap: 10 }}>
                <button onClick={() => { setShowTc(false); setTcChecked(false); setHasScrolled(false); setTcProgress(0); }} className="capa-btn capa-btn-ghost" style={{ flex: 1, justifyContent: 'center' }}>
                  Go Back
                </button>
                <button onClick={handleAgreeAndSubmit} disabled={!tcChecked || !hasScrolled || loading} className="capa-btn capa-btn-primary" style={{ flex: 2, justifyContent: 'center', opacity: (tcChecked && hasScrolled) ? 1 : 0.4, cursor: (tcChecked && hasScrolled) ? 'pointer' : 'not-allowed' }}>
                  <ShieldCheck size={15} /> {loading ? 'Submitting…' : 'I Agree & Submit'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ═══════════════════════ Styles ═══════════════════════ */}
      <style>{`
        @keyframes capa-grad { 0%{background-position:0% 50%} 50%{background-position:100% 50%} 100%{background-position:0% 50%} }
        @keyframes capa-blob-a { 0%,100%{transform:translate(0,0)} 50%{transform:translate(30px,20px)} }
        @keyframes capa-blob-b { 0%,100%{transform:translate(0,0)} 50%{transform:translate(-25px,-15px)} }
        @keyframes capa-arrow-bounce { 0%,100%{transform:translateX(0)} 50%{transform:translateX(4px)} }
        @keyframes capa-shake { 0%,100%{transform:translateX(0)} 20%{transform:translateX(-6px)} 40%{transform:translateX(6px)} 60%{transform:translateX(-4px)} 80%{transform:translateX(4px)} }
        @keyframes capa-step-in { from{opacity:0; transform:translateX(16px)} to{opacity:1; transform:translateX(0)} }
        @keyframes capa-pop-in { from{opacity:0; transform:translateY(24px) scale(.98)} to{opacity:1; transform:translateY(0) scale(1)} }
        @keyframes capa-modal-in { from{opacity:0; transform:translateY(30px) scale(.96)} to{opacity:1; transform:translateY(0) scale(1)} }
        @keyframes capa-backdrop-in { from{opacity:0} to{opacity:1} }
        @keyframes capa-chevron-bounce { 0%,100%{transform:translateY(0)} 50%{transform:translateY(4px)} }
        @keyframes capa-ring-pulse { 0%{transform:scale(1); opacity:.5} 100%{transform:scale(1.8); opacity:0} }
        @keyframes capa-confetti-fall { 0%{transform:translateY(-20px) rotate(0deg); opacity:0} 10%{opacity:1} 100%{transform:translateY(420px) rotate(360deg); opacity:0} }
        @keyframes capa-check-draw { from{ stroke-dashoffset: 24 } to{ stroke-dashoffset: 0 } }

        .capa-page { position:relative; min-height:100vh; background:#f8faff; font-family:'Poppins',sans-serif; padding:48px 20px 64px; overflow:hidden; }
        .capa-container { max-width:660px; margin:0 auto; position:relative; z-index:1; }

        .capa-blob { position:absolute; border-radius:50%; pointer-events:none; }
        .capa-blob-blue { top:-140px; left:-140px; width:480px; height:480px; background:radial-gradient(circle, ${G.blue}20 0%, transparent 70%); filter:blur(100px); animation:capa-blob-a 14s ease-in-out infinite; }
        .capa-blob-orange { bottom:-100px; right:-140px; width:420px; height:420px; background:radial-gradient(circle, ${G.orange}1c 0%, transparent 70%); filter:blur(100px); animation:capa-blob-b 16s ease-in-out infinite 1s; }

        .capa-header { margin-bottom:28px; text-align:center; }
        .capa-badge { display:inline-flex; align-items:center; gap:8px; margin-bottom:14px; background:#eff6ff; border:1px solid #bfdbfe; border-radius:999px; padding:6px 16px; }
        .capa-badge-dot { width:8px; height:8px; border-radius:50%; background:${G.blue}; animation:capa-ring-pulse 1.6s ease-out infinite; box-shadow:0 0 0 0 ${G.blue}; }
        .capa-badge span:last-child { font-size:12px; font-weight:700; color:${G.blue}; text-transform:uppercase; letter-spacing:0.6px; }
        .capa-h1 { font-size:26px; font-weight:900; color:#0b0d20; line-height:1.25; letter-spacing:-0.5px; margin-bottom:10px; }
        .capa-lead { font-size:15px; color:#64748b; line-height:1.7; max-width:480px; margin:0 auto; }

        .capa-referral { display:flex; align-items:center; gap:12px; padding:13px 16px; background:#f5f3ff; border:1px solid #ddd6fe; border-radius:12px; margin-bottom:20px; animation:capa-pop-in .5s cubic-bezier(.22,1,.36,1); }
        .capa-referral-avatar { width:38px; height:38px; border-radius:50%; background:linear-gradient(135deg, ${G.purple}, ${G.indigo}); display:flex; align-items:center; justify-content:center; flex-shrink:0; font-size:15px; font-weight:900; color:#fff; }
        .capa-referral-name { font-size:13px; font-weight:700; color:#4c1d95; }
        .capa-referral-sub { font-size:12px; color:#7c3aed; }

        .capa-steps { display:flex; align-items:flex-start; justify-content:space-between; margin-bottom:26px; padding:0 4px; }
        .capa-step-item { display:flex; flex-direction:column; align-items:center; flex:1; position:relative; }
        .capa-step-node { display:flex; align-items:center; width:100%; }
        .capa-step-circle { width:36px; height:36px; border-radius:50%; display:flex; align-items:center; justify-content:center; background:#fff; border:2px solid #e2e8f0; color:#94a3b8; flex-shrink:0; transition:all .3s ease; margin:0 auto; }
        .capa-step-circle.is-active { border-color:var(--sc); color:var(--sc); box-shadow:0 0 0 5px color-mix(in srgb, var(--sc) 15%, transparent); transform:scale(1.08); }
        .capa-step-circle.is-done { background:var(--sc); border-color:var(--sc); color:#fff; }
        .capa-step-line { flex:1; height:2px; background:#e2e8f0; margin:0 6px; border-radius:2px; overflow:hidden; position:relative; top:-18px; }
        .capa-step-line-fill { height:100%; transition:width .5s cubic-bezier(.22,1,.36,1); }
        .capa-step-label { font-size:11px; font-weight:600; color:#94a3b8; margin-top:8px; text-align:center; transition:color .3s ease; }
        .capa-step-label.is-active { color:#0f172a; font-weight:700; }

        .capa-card { background:#fff; border:1px solid #e2e8f0; border-radius:20px; padding:32px; box-shadow:0 8px 32px rgba(15,23,42,.07); animation:capa-pop-in .5s cubic-bezier(.22,1,.36,1); transition:transform .1s ease; }
        .capa-shake { animation:capa-shake .45s ease; }
        .capa-step-panel { animation:capa-step-in .4s cubic-bezier(.22,1,.36,1); display:flex; flex-direction:column; gap:20px; }
        .capa-grid-2 { display:grid; grid-template-columns:1fr 1fr; gap:16px; }

        .capa-error { display:flex; gap:10px; padding:12px 16px; background:#fef2f2; border:1px solid #fecaca; border-radius:12px; font-size:13px; color:#dc2626; margin-bottom:20px; line-height:1.6; }

        .capa-review { background:#f8faff; border:1px solid #eef2ff; border-radius:14px; padding:18px 20px; margin-bottom:4px; }
        .capa-review-title { display:flex; align-items:center; gap:8px; font-size:13px; font-weight:800; color:#0b0d20; margin-bottom:14px; }
        .capa-review-grid { display:grid; grid-template-columns:1fr 1fr; gap:10px 20px; }
        .capa-review-item { display:flex; flex-direction:column; gap:2px; }
        .capa-review-k { font-size:10.5px; font-weight:700; color:#94a3b8; text-transform:uppercase; letter-spacing:.5px; }
        .capa-review-v { font-size:13.5px; font-weight:600; color:#1e293b; word-break:break-word; }

        .capa-nav-row { display:flex; align-items:center; justify-content:space-between; margin-top:26px; }

        .capa-btn { display:inline-flex; align-items:center; gap:8px; font-weight:700; font-size:14px; padding:13px 26px; border-radius:999px; text-decoration:none; border:none; cursor:pointer; transition:transform .2s ease, box-shadow .2s ease; font-family:inherit; }
        .capa-btn:hover { transform:translateY(-2px); }
        .capa-btn-primary { background-image:linear-gradient(135deg, ${G.blue}, ${G.indigo}); color:#fff; box-shadow:0 8px 22px ${G.blue}35; }
        .capa-btn-primary:hover { box-shadow:0 14px 32px ${G.blue}50; }
        .capa-btn-ghost { background:#f1f5f9; color:#374151; box-shadow:none; }
        .capa-btn-ghost:hover { background:#e2e8f0; }
        .capa-arrow { display:inline-flex; animation:capa-arrow-bounce 1.3s ease-in-out infinite; }

        .capa-footer-link { font-size:12px; color:#94a3b8; text-align:center; margin-top:20px; line-height:1.6; }

        /* ── Success screen ── */
        .capa-success-wrap { position:relative; min-height:100vh; display:flex; align-items:center; justify-content:center; background:#f8faff; font-family:'Poppins',sans-serif; padding:24px; overflow:hidden; }
        .capa-confetti { position:absolute; inset:0; overflow:hidden; pointer-events:none; }
        .capa-confetti-dot { position:absolute; top:-20px; width:8px; height:8px; border-radius:2px; animation-name:capa-confetti-fall; animation-timing-function:ease-in; animation-iteration-count:infinite; }
        .capa-success-card { max-width:480px; text-align:center; position:relative; z-index:1; animation:capa-pop-in .6s cubic-bezier(.22,1,.36,1); }
        .capa-success-icon-wrap { position:relative; width:90px; height:90px; margin:0 auto 20px; display:flex; align-items:center; justify-content:center; }
        .capa-success-ring { position:absolute; inset:0; border-radius:50%; border:2px solid #16a34a; animation:capa-ring-pulse 2s ease-out infinite; }
        .capa-success-ring-2 { animation-delay:.5s; }
        .capa-success-h1 { font-size:26px; font-weight:900; color:#0b0d20; margin-bottom:12px; }
        .capa-success-body { font-size:15px; color:#64748b; line-height:1.75; margin-bottom:28px; }

        /* ── Modal ── */
        .capa-modal-backdrop { position:fixed; inset:0; background:rgba(11,13,32,0.72); z-index:999; display:flex; align-items:center; justify-content:center; padding:16px; font-family:'Poppins',sans-serif; backdrop-filter:blur(4px); animation:capa-backdrop-in .25s ease; }
        .capa-modal { background:#fff; border-radius:20px; width:100%; max-width:560px; max-height:92vh; display:flex; flex-direction:column; box-shadow:0 32px 80px rgba(0,0,0,0.32); overflow:hidden; animation:capa-modal-in .35s cubic-bezier(.22,1,.36,1); }
        .capa-modal-header { padding:22px 28px 16px; border-bottom:1px solid #e2e8f0; flex-shrink:0; }
        .capa-modal-icon { width:34px; height:34px; border-radius:9px; background:linear-gradient(135deg, ${G.blue}15, ${G.indigo}15); display:flex; align-items:center; justify-content:center; flex-shrink:0; }
        .capa-modal-warning { display:flex; align-items:center; gap:6px; padding:7px 12px; background:#fffbeb; border:1px solid #fde68a; border-radius:8px; margin-bottom:12px; }
        .capa-modal-warning span { font-size:12px; color:#92400e; font-weight:600; }
        .capa-modal-progress-track { height:4px; background:#eef2ff; border-radius:99px; overflow:hidden; }
        .capa-modal-progress-fill { height:100%; background:linear-gradient(90deg, ${G.blue}, ${G.orange}); transition:width .15s linear; border-radius:99px; }

        .capa-modal-body { overflow-y:auto; flex:1; padding:24px 28px; font-size:13px; color:#374151; line-height:1.85; }
        .capa-modal-notice { margin-top:20px; padding:14px 16px; background:#f8faff; border:1px solid #e2e8f0; border-radius:10px; font-size:12px; color:#64748b; line-height:1.7; }

        .capa-scroll-hint { text-align:center; padding:8px 0; background:#fff; border-top:1px solid #f1f5f9; flex-shrink:0; font-size:11px; color:#94a3b8; display:flex; align-items:center; justify-content:center; gap:4px; }
        .capa-chevron-bounce { animation:capa-chevron-bounce 1.2s ease-in-out infinite; }

        .capa-modal-footer { padding:16px 28px 20px; border-top:1px solid #e2e8f0; flex-shrink:0; background:#fff; }
        .capa-checkbox-row { display:flex; align-items:flex-start; gap:10px; cursor:pointer; margin-bottom:14px; transition:opacity .3s ease; }
        .capa-checkbox-row.is-disabled { opacity:.4; cursor:not-allowed; pointer-events:none; }
        .capa-checkbox { position:relative; width:18px; height:18px; flex-shrink:0; margin-top:2px; border-radius:5px; border:1.5px solid #cbd5e1; display:flex; align-items:center; justify-content:center; transition:all .2s ease; }
        .capa-checkbox.is-checked { background:linear-gradient(135deg, ${G.blue}, ${G.indigo}); border-color:${G.blue}; }
        .capa-checkbox input { position:absolute; inset:0; opacity:0; cursor:pointer; margin:0; }
        .capa-checkbox-icon { color:#fff; opacity:0; transform:scale(.5); transition:all .2s ease; position:absolute; }
        .capa-checkbox.is-checked .capa-checkbox-icon { opacity:1; transform:scale(1); }

        @media (max-width: 640px) {
          .capa-grid-2 { grid-template-columns:1fr !important; }
          .capa-review-grid { grid-template-columns:1fr !important; }
          .capa-card { padding:24px !important; }
          .capa-step-label { font-size:10px; }
        }
      `}</style>
    </>
  );
}