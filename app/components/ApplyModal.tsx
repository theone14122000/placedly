'use client';
import { useState, useRef, useEffect } from 'react';

interface Job {
  id: number;
  role: string;
  company: string;
  logo: string;
  location: string;
  type: string;
}

interface Props {
  job: Job | null;
  onClose: () => void;
}

const noticePeriods = ['Immediate', '15 Days', '30 Days', '45 Days', '60 Days', '90 Days', 'Serving Notice'];
const educationOptions = ['High School', 'Diploma', "Bachelor's Degree", "Master's Degree", 'MBA', 'PhD', 'Other'];

const inputS: React.CSSProperties = {
  display: 'block', width: '100%',
  padding: '11px 14px',
  border: '1.5px solid #e2e8f0',
  borderRadius: '10px',
  fontSize: '14px',
  fontFamily: "'Poppins', sans-serif",
  color: '#0b0d20',
  background: '#f8faff',
  outline: 'none',
  boxShadow: 'none',
  appearance: 'none' as const,
  WebkitAppearance: 'none' as const,
  margin: 0,
  boxSizing: 'border-box' as const,
};

const labelS: React.CSSProperties = {
  display: 'block',
  fontSize: '11px',
  fontWeight: 600,
  color: '#374151',
  letterSpacing: '0.5px',
  textTransform: 'uppercase' as const,
  marginBottom: '6px',
  padding: 0,
  background: 'none',
  border: 'none',
  borderRadius: 0,
  boxShadow: 'none',
};

const fieldS: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
};

export default function ApplyModal({ job, onClose }: Props) {
  const [step, setStep] = useState<'form' | 'tnc' | 'done'>('form');
  const [focusedField, setFocusedField] = useState('');
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [dragOver, setDragOver] = useState(false);
  const [agreed, setAgreed] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  const [form, setForm] = useState({
    firstName: '', lastName: '',
    experience: '', noticePeriod: '',
    education: '', location: '',
    currentCtc: '', expectedCtc: '',
    skills: '', usShift: '' as '' | 'yes' | 'no',
  });

  // Lock body scroll while modal open
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = ''; };
  }, []);

  if (!job) return null;

  const fi = (name: string): React.CSSProperties => ({
    ...inputS,
    borderColor: focusedField === name ? '#2145fb' : '#e2e8f0',
    background: focusedField === name ? '#ffffff' : '#f8faff',
    boxShadow: focusedField === name ? '0 0 0 3px rgba(33,69,251,0.09)' : 'none',
  });

  const handleFile = (file: File | null) => {
    if (!file) return;
    const allowed = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
    if (allowed.includes(file.type)) setResumeFile(file);
    else alert('Please upload a PDF or Word document.');
  };

  const handleSubmitForm = (e: React.FormEvent) => {
    e.preventDefault();
    setStep('tnc');
  };

  const handleConfirm = () => {
    if (!agreed) return;
    setStep('done');
  };

  return (
    <div
      style={{ position: 'fixed', inset: 0, zIndex: 9999, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '16px' }}
      onClick={e => { if (e.target === e.currentTarget) onClose(); }}
    >
      {/* Backdrop */}
      <div style={{ position: 'absolute', inset: 0, background: 'rgba(11,13,32,0.55)', backdropFilter: 'blur(4px)' }} />

      {/* Modal */}
      <div style={{
        position: 'relative', zIndex: 1,
        background: '#ffffff', borderRadius: '20px',
        width: '100%', maxWidth: '700px',
        maxHeight: '92vh', overflowY: 'auto',
        boxShadow: '0 24px 80px rgba(0,0,0,0.18)',
        fontFamily: "'Poppins', sans-serif",
      }}>

        {/* ── STEP: FORM ── */}
        {step === 'form' && (
          <>
            {/* Modal header */}
            <div style={{ padding: '24px 28px 20px', borderBottom: '1px solid #f0f2f7', display: 'flex', alignItems: 'center', justifyContent: 'space-between', position: 'sticky', top: 0, background: '#ffffff', zIndex: 2, borderRadius: '20px 20px 0 0' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div style={{ fontSize: '28px', width: '44px', height: '44px', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#f8faff', border: '1px solid #e2e8f0', borderRadius: '12px' }}>
                  {job.logo}
                </div>
                <div>
                  <div style={{ fontSize: '15px', fontWeight: 700, color: '#0b0d20', lineHeight: 1.3 }}>{job.role}</div>
                  <div style={{ fontSize: '13px', color: '#64748b' }}>{job.company} · {job.location}</div>
                </div>
              </div>
              <button
                onClick={onClose}
                style={{ width: '32px', height: '32px', borderRadius: '50%', border: '1px solid #e2e8f0', background: '#f8faff', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '16px', color: '#64748b', flexShrink: 0 }}
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSubmitForm} style={{ padding: '24px 28px 28px', display: 'flex', flexDirection: 'column', gap: '16px' }}>

              {/* Name row */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
                <div style={fieldS}>
                  <label style={labelS}>First Name *</label>
                  <input style={fi('fn')} required placeholder="First name" value={form.firstName}
                    onFocus={() => setFocusedField('fn')} onBlur={() => setFocusedField('')}
                    onChange={e => setForm({ ...form, firstName: e.target.value })} />
                </div>
                <div style={fieldS}>
                  <label style={labelS}>Last Name *</label>
                  <input style={fi('ln')} required placeholder="Last name" value={form.lastName}
                    onFocus={() => setFocusedField('ln')} onBlur={() => setFocusedField('')}
                    onChange={e => setForm({ ...form, lastName: e.target.value })} />
                </div>
              </div>

              {/* Exp + Notice */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
                <div style={fieldS}>
                  <label style={labelS}>Total Experience *</label>
                  <input style={fi('exp')} required placeholder="e.g. 3 years 6 months" value={form.experience}
                    onFocus={() => setFocusedField('exp')} onBlur={() => setFocusedField('')}
                    onChange={e => setForm({ ...form, experience: e.target.value })} />
                </div>
                <div style={fieldS}>
                  <label style={labelS}>Notice Period *</label>
                  <select style={{ ...fi('np'), cursor: 'pointer' }} required value={form.noticePeriod}
                    onFocus={() => setFocusedField('np')} onBlur={() => setFocusedField('')}
                    onChange={e => setForm({ ...form, noticePeriod: e.target.value })}>
                    <option value="">Select…</option>
                    {noticePeriods.map(n => <option key={n} value={n}>{n}</option>)}
                  </select>
                </div>
              </div>

              {/* Education */}
              <div style={fieldS}>
                <label style={labelS}>Highest Education *</label>
                <select style={{ ...fi('edu'), cursor: 'pointer' }} required value={form.education}
                  onFocus={() => setFocusedField('edu')} onBlur={() => setFocusedField('')}
                  onChange={e => setForm({ ...form, education: e.target.value })}>
                  <option value="">Select qualification…</option>
                  {educationOptions.map(e => <option key={e} value={e}>{e}</option>)}
                </select>
              </div>

              {/* Location */}
              <div style={fieldS}>
                <label style={labelS}>Current Location *</label>
                <input style={fi('loc')} required placeholder="City, State" value={form.location}
                  onFocus={() => setFocusedField('loc')} onBlur={() => setFocusedField('')}
                  onChange={e => setForm({ ...form, location: e.target.value })} />
              </div>

              {/* CTC row */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
                <div style={fieldS}>
                  <label style={labelS}>Current CTC *</label>
                  <input style={fi('cctc')} required placeholder="e.g. ₹6 LPA" value={form.currentCtc}
                    onFocus={() => setFocusedField('cctc')} onBlur={() => setFocusedField('')}
                    onChange={e => setForm({ ...form, currentCtc: e.target.value })} />
                </div>
                <div style={fieldS}>
                  <label style={labelS}>Expected CTC *</label>
                  <input style={fi('ectc')} required placeholder="e.g. ₹10 LPA" value={form.expectedCtc}
                    onFocus={() => setFocusedField('ectc')} onBlur={() => setFocusedField('')}
                    onChange={e => setForm({ ...form, expectedCtc: e.target.value })} />
                </div>
              </div>

              {/* Skills */}
              <div style={fieldS}>
                <label style={labelS}>Key Skills *</label>
                <textarea
                  style={{ ...fi('skills'), resize: 'vertical' as const, minHeight: '80px', paddingTop: '11px' }}
                  required
                  placeholder="e.g. React, TypeScript, Node.js, SQL…"
                  value={form.skills}
                  onFocus={() => setFocusedField('skills')} onBlur={() => setFocusedField('')}
                  onChange={e => setForm({ ...form, skills: e.target.value })}
                />
              </div>

              {/* US Shift */}
              <div style={fieldS}>
                <label style={labelS}>Open to US Shift? *</label>
                <div style={{ display: 'flex', gap: '10px', marginTop: '2px' }}>
                  {(['yes', 'no'] as const).map(v => (
                    <button
                      key={v}
                      type="button"
                      onClick={() => setForm({ ...form, usShift: v })}
                      style={{
                        flex: 1, padding: '10px', borderRadius: '10px', cursor: 'pointer',
                        border: form.usShift === v ? '2px solid #2145fb' : '1.5px solid #e2e8f0',
                        background: form.usShift === v ? '#eff6ff' : '#f8faff',
                        color: form.usShift === v ? '#2145fb' : '#374151',
                        fontWeight: form.usShift === v ? 700 : 500,
                        fontSize: '14px', fontFamily: "'Poppins', sans-serif",
                        transition: 'all 0.15s',
                      }}
                    >
                      {v === 'yes' ? '✓ Yes' : '✕ No'}
                    </button>
                  ))}
                </div>
              </div>

              {/* Resume Upload */}
              <div style={fieldS}>
                <label style={labelS}>Resume / CV *</label>
                <div
                  onClick={() => fileRef.current?.click()}
                  onDragOver={e => { e.preventDefault(); setDragOver(true); }}
                  onDragLeave={() => setDragOver(false)}
                  onDrop={e => { e.preventDefault(); setDragOver(false); handleFile(e.dataTransfer.files[0]); }}
                  style={{
                    border: `2px dashed ${dragOver ? '#2145fb' : resumeFile ? '#22c55e' : '#e2e8f0'}`,
                    borderRadius: '12px',
                    padding: '20px',
                    textAlign: 'center',
                    cursor: 'pointer',
                    background: dragOver ? '#eff6ff' : resumeFile ? '#f0fdf4' : '#f8faff',
                    transition: 'all 0.15s',
                  }}
                >
                  {resumeFile ? (
                    <>
                      <div style={{ fontSize: '22px', marginBottom: '4px' }}>✅</div>
                      <div style={{ fontSize: '13px', fontWeight: 600, color: '#16a34a' }}>{resumeFile.name}</div>
                      <div style={{ fontSize: '11px', color: '#64748b', marginTop: '2px' }}>Click to change file</div>
                    </>
                  ) : (
                    <>
                      <div style={{ fontSize: '22px', marginBottom: '4px' }}>📄</div>
                      <div style={{ fontSize: '13px', fontWeight: 600, color: '#374151' }}>Drop your resume here or <span style={{ color: '#2145fb' }}>browse</span></div>
                      <div style={{ fontSize: '11px', color: '#94a3b8', marginTop: '2px' }}>PDF or Word · Max 5 MB</div>
                    </>
                  )}
                </div>
                <input
                  ref={fileRef} type="file" accept=".pdf,.doc,.docx" style={{ display: 'none' }}
                  onChange={e => handleFile(e.target.files?.[0] ?? null)}
                />
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={!form.usShift || !resumeFile}
                style={{
                  width: '100%', padding: '14px',
                  background: (!form.usShift || !resumeFile) ? '#e2e8f0' : 'linear-gradient(135deg,#2145fb,#1a38d4)',
                  color: (!form.usShift || !resumeFile) ? '#94a3b8' : '#ffffff',
                  fontWeight: 700, fontSize: '15px',
                  fontFamily: "'Poppins', sans-serif",
                  border: 'none', borderRadius: '10px',
                  cursor: (!form.usShift || !resumeFile) ? 'not-allowed' : 'pointer',
                  marginTop: '4px',
                  boxShadow: (!form.usShift || !resumeFile) ? 'none' : '0 4px 18px rgba(33,69,251,0.28)',
                }}
              >
                Continue to Review →
              </button>
            </form>
          </>
        )}

        {/* ── STEP: T&C ── */}
        {step === 'tnc' && (
          <div style={{ padding: '32px 28px' }}>
            <div style={{ textAlign: 'center', marginBottom: '24px' }}>
              <div style={{ fontSize: '36px', marginBottom: '10px' }}>📋</div>
              <div style={{ fontSize: '20px', fontWeight: 800, color: '#0b0d20', marginBottom: '6px' }}>Terms & Consent</div>
              <div style={{ fontSize: '13px', color: '#64748b' }}>Please read and agree before submitting your application</div>
            </div>

            <div style={{
              background: '#f8faff', border: '1px solid #e2e8f0', borderRadius: '12px',
              padding: '24px', fontSize: '13px', color: '#374151', lineHeight: 1.75,
              maxHeight: '340px', overflowY: 'auto', marginBottom: '24px',
            }}>
              <p style={{ fontWeight: 700, marginBottom: '10px' }}>By submitting this application, you confirm and agree to the following:</p>
              <p style={{ marginBottom: '10px' }}>1. <strong>Data Processing:</strong> You consent to Placedly collecting, storing, and processing your personal data (name, contact details, CV, employment history) for recruitment purposes.</p>
              <p style={{ marginBottom: '10px' }}>2. <strong>Profile Sharing:</strong> You authorise Placedly to share your profile and application details with relevant hiring partners and employers on your behalf.</p>
              <p style={{ marginBottom: '10px' }}>3. <strong>Accuracy:</strong> All information provided in this application is accurate and complete to the best of your knowledge. Providing false information may result in disqualification.</p>
              <p style={{ marginBottom: '10px' }}>4. <strong>Communication:</strong> You agree to be contacted by Placedly and its hiring partners via phone, email, or WhatsApp regarding this and relevant future opportunities.</p>
              <p style={{ marginBottom: '10px' }}>5. <strong>No Guarantee:</strong> Submitting this application does not guarantee an interview or placement. Placedly will make reasonable efforts to match your profile to suitable roles.</p>
              <p>6. <strong>Zero Upfront:</strong> Placedly operates on a success-share model. No fees are charged to candidates upfront. Any placement fee is agreed upon and payable only after successful placement.</p>
            </div>

            {/* Agree checkbox */}
            <div
              onClick={() => setAgreed(!agreed)}
              style={{ display: 'flex', alignItems: 'flex-start', gap: '12px', cursor: 'pointer', marginBottom: '20px', padding: '14px', borderRadius: '10px', border: `1.5px solid ${agreed ? '#2145fb' : '#e2e8f0'}`, background: agreed ? '#eff6ff' : '#f8faff' }}
            >
              <div style={{
                width: '20px', height: '20px', minWidth: '20px', borderRadius: '6px',
                border: `2px solid ${agreed ? '#2145fb' : '#cbd5e1'}`,
                background: agreed ? '#2145fb' : '#ffffff',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                marginTop: '1px', transition: 'all 0.15s',
              }}>
                {agreed && <span style={{ color: '#fff', fontSize: '12px', fontWeight: 700, lineHeight: 1 }}>✓</span>}
              </div>
              <div style={{ fontSize: '13px', color: '#374151', lineHeight: 1.6 }}>
                I have read and agree to the above terms. I confirm that the information provided is accurate and I consent to Placedly processing my application data.
              </div>
            </div>

            <div style={{ display: 'flex', gap: '10px' }}>
              <button
                onClick={() => setStep('form')}
                style={{
                  flex: 1, padding: '13px',
                  border: '1.5px solid #e2e8f0', borderRadius: '10px',
                  background: '#f8faff', color: '#374151',
                  fontWeight: 600, fontSize: '14px',
                  fontFamily: "'Poppins', sans-serif", cursor: 'pointer',
                }}
              >
                ← Back
              </button>
              <button
                onClick={handleConfirm}
                disabled={!agreed}
                style={{
                  flex: 2, padding: '13px',
                  background: agreed ? 'linear-gradient(135deg,#f97316,#ea580c)' : '#e2e8f0',
                  color: agreed ? '#ffffff' : '#94a3b8',
                  fontWeight: 700, fontSize: '15px',
                  fontFamily: "'Poppins', sans-serif",
                  border: 'none', borderRadius: '10px',
                  cursor: agreed ? 'pointer' : 'not-allowed',
                  boxShadow: agreed ? '0 4px 18px rgba(249,115,22,0.30)' : 'none',
                }}
              >
                🚀 Submit Application
              </button>
            </div>
          </div>
        )}

        {/* ── STEP: DONE ── */}
        {step === 'done' && (
          <div style={{ padding: '48px 28px', textAlign: 'center' }}>
            <div style={{ fontSize: '56px', marginBottom: '16px' }}>🎉</div>
            <div style={{ fontSize: '22px', fontWeight: 800, color: '#0b0d20', marginBottom: '8px' }}>Application Submitted!</div>
            <div style={{ fontSize: '14px', color: '#64748b', lineHeight: 1.7, marginBottom: '28px', maxWidth: '360px', margin: '0 auto 28px' }}>
              Your application for <strong style={{ color: '#0b0d20' }}>{job.role}</strong> at {job.company} has been received. Our team will review your profile and get back to you within 48 hours.
            </div>
            <div style={{ display: 'flex', gap: '10px', justifyContent: 'center', flexWrap: 'wrap' }}>
              <a
                href="https://wa.me/919876543210"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'inline-flex', alignItems: 'center', gap: '6px',
                  padding: '12px 20px',
                  background: '#22c55e', color: '#fff',
                  borderRadius: '10px', fontWeight: 600, fontSize: '14px',
                  textDecoration: 'none', fontFamily: "'Poppins', sans-serif",
                }}
              >
                💬 Follow up on WhatsApp
              </a>
              <button
                onClick={onClose}
                style={{
                  padding: '12px 20px',
                  border: '1.5px solid #e2e8f0', borderRadius: '10px',
                  background: '#f8faff', color: '#374151',
                  fontWeight: 600, fontSize: '14px',
                  fontFamily: "'Poppins', sans-serif", cursor: 'pointer',
                }}
              >
                Browse More Roles
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
