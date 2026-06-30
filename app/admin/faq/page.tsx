'use client';
import { useState, useEffect } from 'react';
import { Save, Plus, Trash2, MessageSquare, Star } from 'lucide-react';

type FAQ = { q: string; a: string };
type Testimonial = { name: string; role: string; company: string; text: string; rating: number };

const DEFAULT_FAQS: FAQ[] = [
  { q: 'Is there really no upfront cost for CAP?', a: 'Yes — absolutely zero upfront. You pay only after you receive a job offer and accept placement. Our success is directly tied to yours.' },
  { q: 'How long does the CAP programme typically take?', a: 'Most candidates receive their first interview call within 1–2 weeks. Typical time-to-placement is 3–8 weeks depending on role and industry.' },
  { q: 'What industries and roles does Placedly cover?', a: 'We cover IT, BFSI, FMCG, Consulting, E-commerce, and Manufacturing across mid-to-senior roles (3–15 years experience).' },
  { q: 'What countries are available for Study Abroad?', a: 'We currently offer full-service support for UK, France, Germany, and Dubai/UAE through our 140+ university partner network.' },
  { q: 'How is Placedly different from a job board?', a: 'We do the work for you — CV rebuild, direct employer submissions, mock interviews, and offer negotiation. You are not just posting your profile; we actively place you.' },
];

const DEFAULT_TESTIMONIALS: Testimonial[] = [
  { name: 'Priya Sharma', role: 'Senior Product Manager', company: 'Flipkart', text: 'Placedly rebuilt my resume, prepped me for interviews, and got me three offers in 5 weeks. The salary negotiation support alone was worth it.', rating: 5 },
  { name: 'Arjun Mehta', role: 'Data Analyst', company: 'Deloitte', text: 'I had been job hunting for 6 months with zero luck. Placedly placed me in 3 weeks. Their direct employer access is real — no black holes.', rating: 5 },
  { name: 'Sneha Reddy', role: 'MBA Student', company: 'University of Exeter', text: 'The study abroad team guided me through my entire UK application — SOP, visa, everything. Smooth process from start to finish.', rating: 5 },
];

const inputS: React.CSSProperties = {
  width: '100%', padding: '9px 12px', border: '1.5px solid #e2e8f0',
  borderRadius: '8px', fontSize: '13px', fontFamily: "'Poppins',sans-serif",
  color: '#0b0d20', background: '#f8faff', outline: 'none', boxSizing: 'border-box' as const,
};
const labelS: React.CSSProperties = {
  display: 'block', fontSize: '11px', fontWeight: 600, color: '#374151',
  letterSpacing: '0.4px', textTransform: 'uppercase' as const, marginBottom: '5px',
};

export default function AdminFaqPage() {
  const [faqs, setFaqs] = useState<FAQ[]>(DEFAULT_FAQS);
  const [testimonials, setTestimonials] = useState<Testimonial[]>(DEFAULT_TESTIMONIALS);
  const [saving, setSaving] = useState(false);
  const [status, setStatus] = useState('');

  useEffect(() => {
    fetch('/api/admin/content?prefix=faq:')
      .then(r => r.json())
      .then((d: Record<string, string>) => {
        if (d['faq:data']) {
          const p = JSON.parse(d['faq:data']);
          if (p.faqs) setFaqs(p.faqs);
          if (p.testimonials) setTestimonials(p.testimonials);
        }
      }).catch(() => {});
  }, []);

  const save = async () => {
    setSaving(true);
    const r = await fetch('/api/admin/content', {
      method: 'POST', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ 'faq:data': JSON.stringify({ faqs, testimonials }) }),
    });
    setSaving(false);
    setStatus(r.ok ? 'Saved!' : 'Save failed');
    setTimeout(() => setStatus(''), 3000);
  };

  const updateFaq = (i: number, field: keyof FAQ, val: string) =>
    setFaqs(prev => prev.map((f, idx) => idx === i ? { ...f, [field]: val } : f));
  const deleteFaq = (i: number) => setFaqs(prev => prev.filter((_, idx) => idx !== i));
  const addFaq = () => setFaqs(prev => [...prev, { q: 'New question?', a: 'Answer here.' }]);

  const updateTestimonial = (i: number, field: keyof Testimonial, val: string | number) =>
    setTestimonials(prev => prev.map((t, idx) => idx === i ? { ...t, [field]: val } : t));
  const deleteTestimonial = (i: number) => setTestimonials(prev => prev.filter((_, idx) => idx !== i));
  const addTestimonial = () => setTestimonials(prev => [...prev, { name: 'Name', role: 'Role', company: 'Company', text: 'Testimonial text.', rating: 5 }]);

  return (
    <div className="adm-page" style={{ padding: '32px', fontFamily: "'Poppins',sans-serif" }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '28px' }}>
        <div>
          <h1 style={{ fontSize: '22px', fontWeight: 900, color: '#0b0d20', marginBottom: '3px' }}>FAQ & Reviews</h1>
          <p style={{ fontSize: '13px', color: '#64748b' }}>Manage frequently asked questions and testimonials.</p>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          {status && <span style={{ fontSize: '12px', color: status.includes('fail') ? '#ef4444' : '#16a34a', fontWeight: 600 }}>{status}</span>}
          <button onClick={save} disabled={saving} style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '10px 20px', background: '#0b0d20', color: '#fff', border: 'none', borderRadius: '10px', fontSize: '13px', fontWeight: 700, cursor: 'pointer', fontFamily: "'Poppins',sans-serif", opacity: saving ? 0.7 : 1 }}>
            <Save size={14} />{saving ? 'Saving…' : 'Save Changes'}
          </button>
        </div>
      </div>

      {/* FAQs */}
      <div style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: '16px', padding: '24px', marginBottom: '24px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <MessageSquare size={16} color="#2145fb" />
            <span style={{ fontSize: '14px', fontWeight: 700, color: '#0b0d20' }}>FAQs ({faqs.length})</span>
          </div>
          <button onClick={addFaq} style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '8px 16px', background: '#eff6ff', color: '#2145fb', border: '1.5px solid #bfdbfe', borderRadius: '8px', fontSize: '12px', fontWeight: 600, cursor: 'pointer', fontFamily: "'Poppins',sans-serif" }}>
            <Plus size={13} /> Add FAQ
          </button>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {faqs.map((f, i) => (
            <div key={i} style={{ border: '1.5px solid #e2e8f0', borderRadius: '12px', padding: '16px', background: '#f8faff', position: 'relative' }}>
              <button onClick={() => deleteFaq(i)} style={{ position: 'absolute', top: '12px', right: '12px', background: '#fef2f2', border: '1px solid #fecaca', borderRadius: '6px', padding: '4px', cursor: 'pointer', display: 'flex' }}>
                <Trash2 size={12} color="#ef4444" />
              </button>
              <div style={{ paddingRight: '32px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <div>
                  <label style={labelS}>Question</label>
                  <input style={inputS} value={f.q} onChange={e => updateFaq(i, 'q', e.target.value)} />
                </div>
                <div>
                  <label style={labelS}>Answer</label>
                  <textarea style={{ ...inputS, minHeight: '70px', resize: 'vertical' as const }} value={f.a} onChange={e => updateFaq(i, 'a', e.target.value)} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Testimonials */}
      <div style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: '16px', padding: '24px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Star size={16} color="#f97316" />
            <span style={{ fontSize: '14px', fontWeight: 700, color: '#0b0d20' }}>Testimonials ({testimonials.length})</span>
          </div>
          <button onClick={addTestimonial} style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '8px 16px', background: '#fff7ed', color: '#f97316', border: '1.5px solid #fed7aa', borderRadius: '8px', fontSize: '12px', fontWeight: 600, cursor: 'pointer', fontFamily: "'Poppins',sans-serif" }}>
            <Plus size={13} /> Add Testimonial
          </button>
        </div>
        <div className="adm-steps-2" style={{ display: 'grid', gridTemplateColumns: 'repeat(2,1fr)', gap: '16px' }}>
          {testimonials.map((t, i) => (
            <div key={i} style={{ border: '1.5px solid #e2e8f0', borderRadius: '12px', padding: '16px', background: '#f8faff', position: 'relative' }}>
              <button onClick={() => deleteTestimonial(i)} style={{ position: 'absolute', top: '12px', right: '12px', background: '#fef2f2', border: '1px solid #fecaca', borderRadius: '6px', padding: '4px', cursor: 'pointer', display: 'flex' }}>
                <Trash2 size={12} color="#ef4444" />
              </button>
              <div style={{ paddingRight: '32px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                  <div>
                    <label style={labelS}>Name</label>
                    <input style={inputS} value={t.name} onChange={e => updateTestimonial(i, 'name', e.target.value)} />
                  </div>
                  <div>
                    <label style={labelS}>Rating (1–5)</label>
                    <input type="number" min={1} max={5} style={inputS} value={t.rating} onChange={e => updateTestimonial(i, 'rating', Number(e.target.value))} />
                  </div>
                  <div>
                    <label style={labelS}>Role</label>
                    <input style={inputS} value={t.role} onChange={e => updateTestimonial(i, 'role', e.target.value)} />
                  </div>
                  <div>
                    <label style={labelS}>Company</label>
                    <input style={inputS} value={t.company} onChange={e => updateTestimonial(i, 'company', e.target.value)} />
                  </div>
                </div>
                <div>
                  <label style={labelS}>Testimonial</label>
                  <textarea style={{ ...inputS, minHeight: '70px', resize: 'vertical' as const }} value={t.text} onChange={e => updateTestimonial(i, 'text', e.target.value)} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
