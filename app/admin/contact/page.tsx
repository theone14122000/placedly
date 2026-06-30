'use client';
import { useState, useEffect } from 'react';
import { Save, RefreshCw, ChevronDown, ChevronUp } from 'lucide-react';

const inp: React.CSSProperties = { display: 'block', width: '100%', padding: '10px 13px', border: '1.5px solid #e2e8f0', borderRadius: '9px', fontSize: '13px', fontFamily: "'Poppins',sans-serif", color: '#0b0d20', background: '#f8faff', outline: 'none', boxSizing: 'border-box' as const };
const ta: React.CSSProperties  = { ...inp, resize: 'vertical' as const, minHeight: '80px' };
const lbl: React.CSSProperties = { display: 'block', fontSize: '10px', fontWeight: 600, color: '#64748b', textTransform: 'uppercase' as const, letterSpacing: '0.4px', marginBottom: '5px' };
const row: React.CSSProperties = { display: 'flex', flexDirection: 'column' as const, gap: '14px' };

function Field({ label, k, data, set, textarea }: { label: string; k: string; data: Record<string,string>; set: (k:string) => (e:React.ChangeEvent<any>) => void; textarea?: boolean }) {
  return (
    <div>
      <label style={lbl}>{label}</label>
      {textarea
        ? <textarea style={ta} value={data[k] ?? ''} onChange={set(k)} />
        : <input style={inp} value={data[k] ?? ''} onChange={set(k)} />}
    </div>
  );
}

function Section({ title, children, open=true }: { title:string; children:React.ReactNode; open?:boolean }) {
  const [show, setShow] = useState(open);
  return (
    <div style={{ background:'#fff', border:'1px solid #eef0f6', borderRadius:'16px', marginBottom:'16px', overflow:'hidden', boxShadow:'0 1px 4px rgba(0,0,0,.04)' }}>
      <button type="button" onClick={()=>setShow(v=>!v)} style={{ width:'100%', display:'flex', alignItems:'center', justifyContent:'space-between', padding:'18px 24px', background:'none', border:'none', cursor:'pointer', fontFamily:"'Poppins',sans-serif" }}>
        <span style={{ fontSize:'14px', fontWeight:700, color:'#0b0d20' }}>{title}</span>
        {show ? <ChevronUp size={16} color="#64748b" /> : <ChevronDown size={16} color="#64748b" />}
      </button>
      {show && <div style={{ padding:'0 24px 24px' }}>{children}</div>}
    </div>
  );
}

const DEFAULTS: Record<string,string> = {
  'ct:heroTag':      'Get In Touch',
  'ct:heroTitle':    "Let's Build Your Next Chapter Together.",
  'ct:heroSubtitle': 'Looking for a job in India or planning to study abroad? Free consultation — no obligation.',
  'ct:heroPrimary':  'WhatsApp Now',
  'ct:heroWaHref':   'https://wa.me/919910116901',
  'ct:heroSecondary':'Fill the Form ↓',

  'ct:formTitle':    'Tell Us About Your Goals',
  'ct:formSubtitle': 'Free consultation — personalised plan, no obligation.',
  'ct:formSubmitBtn':'Send Message — It\'s Free',
  'ct:formFooter':   'Zero spam. We only contact you about your query.',
  'ct:successTitle': 'Message Received!',
  'ct:successSub':   'We\'ll reach out within 24 hours. For faster help, WhatsApp us.',
  'ct:services':     'Career Placement (India),Study Abroad,CV & Resume Writing,Interview Coaching,LinkedIn Optimisation,Career Assessment,Other',

  'ct:waPhone':    '+91 99101 16901',
  'ct:waHref':     'https://wa.me/919910116901',
  'ct:waNote':     'Usually replies in < 1 hour',
  'ct:email':      'hello@placedly.in',
  'ct:emailNote':  'We reply within 24 hours',
  'ct:office':     'Delhi NCR, India',
  'ct:officeNote': 'Serving Pan-India & Global',
  'ct:hours':      'Mon – Sat: 9 AM – 7 PM',
  'ct:hoursNote':  'Sunday: By appointment',
  'ct:promise':    "Free consultation. No obligation. If we can't help you, we'll say so honestly. No hard sell, ever.",

  'ct:faqSectionTitle': 'Frequently Asked Questions',
  'ct:faq1Q': 'How does the payment model work?',
  'ct:faq1A': "Initial consultation is free. For CAP, we charge a 12% Career Assistance Fee based on your annual CTC — but only after your offer letter is in hand. Nothing upfront, nothing during the process.",
  'ct:faq2Q': 'How long does placement typically take?',
  'ct:faq2A': 'Most candidates get their first interview call within 1–2 weeks. Typical placement timeline is 4–6 weeks depending on target role and industry.',
  'ct:faq3Q': 'Do you help freshers as well as experienced professionals?',
  'ct:faq3A': 'Absolutely. We work with candidates at every level — freshers, mid-career professionals, and senior executives. Each gets a personalised roadmap.',
  'ct:faq4Q': 'What industries do you cover?',
  'ct:faq4A': 'Technology, Finance & Banking, Healthcare & Pharma, Marketing, Engineering, Sales, Design, and Operations — across top MNCs in India and globally.',
};

export default function AdminContact() {
  const [data, setData] = useState(DEFAULTS);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [status, setStatus] = useState('');

  useEffect(() => {
    fetch('/api/admin/content?prefix=ct:')
      .then(r => r.json())
      .then((saved: Record<string,string>) => { setData({ ...DEFAULTS, ...saved }); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  const set = (k: string) => (e: React.ChangeEvent<any>) => setData(d => ({ ...d, [k]: e.target.value }));

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
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px', flexWrap: 'wrap', gap: '12px' }}>
        <div>
          <h1 style={{ fontSize: '22px', fontWeight: 900, color: '#0b0d20', marginBottom: '2px' }}>Contact Page</h1>
          <p style={{ fontSize: '13px', color: '#64748b' }}>Every word on the contact page — editable.</p>
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

      <Section title="🦸 Hero Section">
        <div style={row}>
          <div className="adm-grid-2">
            <Field label="Section tag / eyebrow" k="ct:heroTag" data={data} set={set} />
            <div />
          </div>
          <Field label="Hero title" k="ct:heroTitle" data={data} set={set} />
          <Field label="Hero subtitle" k="ct:heroSubtitle" data={data} set={set} textarea />
          <div className="adm-grid-2">
            <Field label="Primary CTA text" k="ct:heroPrimary" data={data} set={set} />
            <Field label="WhatsApp link (href)" k="ct:heroWaHref" data={data} set={set} />
            <Field label="Secondary CTA text" k="ct:heroSecondary" data={data} set={set} />
          </div>
        </div>
      </Section>

      <Section title="📋 Contact Form">
        <div style={row}>
          <div className="adm-grid-2">
            <Field label="Form heading" k="ct:formTitle" data={data} set={set} />
            <Field label="Form subheading" k="ct:formSubtitle" data={data} set={set} />
          </div>
          <Field label="Submit button text" k="ct:formSubmitBtn" data={data} set={set} />
          <Field label="Footer note below button" k="ct:formFooter" data={data} set={set} />
          <div>
            <label style={lbl}>Service options (comma-separated)</label>
            <textarea style={{ ...ta, minHeight: 56 }} value={data['ct:services'] ?? ''} onChange={set('ct:services')} />
          </div>
          <div style={{ background: '#f0fdf4', borderRadius: 12, padding: 14, border: '1px solid #bbf7d0' }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: '#16a34a', marginBottom: 10, textTransform: 'uppercase', letterSpacing: '0.4px' }}>Success State</div>
            <div className="adm-grid-2">
              <Field label="Success title" k="ct:successTitle" data={data} set={set} />
              <Field label="Success subtitle" k="ct:successSub" data={data} set={set} />
            </div>
          </div>
        </div>
      </Section>

      <Section title="📞 Contact Details (sidebar)">
        <div style={row}>
          {[
            { label: 'WhatsApp', numK: 'ct:waPhone', hrefK: 'ct:waHref', noteK: 'ct:waNote' },
            { label: 'Email',    numK: 'ct:email',   hrefK: null,         noteK: 'ct:emailNote' },
            { label: 'Office',   numK: 'ct:office',  hrefK: null,         noteK: 'ct:officeNote' },
            { label: 'Hours',    numK: 'ct:hours',   hrefK: null,         noteK: 'ct:hoursNote' },
          ].map(item => (
            <div key={item.label} style={{ background: '#f8faff', borderRadius: 12, padding: 14, border: '1px solid #e2e8f0' }}>
              <div style={{ fontSize: 11, fontWeight: 700, color: '#0b0d20', marginBottom: 10, textTransform: 'uppercase', letterSpacing: '0.4px' }}>{item.label}</div>
              <div className={item.hrefK ? 'adm-grid-3' : 'adm-grid-2'}>
                <Field label="Display text" k={item.numK} data={data} set={set} />
                {item.hrefK && <Field label="Link href" k={item.hrefK} data={data} set={set} />}
                <Field label="Note (small text)" k={item.noteK} data={data} set={set} />
              </div>
            </div>
          ))}
          <Field label="Promise card text" k="ct:promise" data={data} set={set} textarea />
        </div>
      </Section>

      <Section title="❓ FAQ Section" open={false}>
        <div style={row}>
          <Field label="Section title" k="ct:faqSectionTitle" data={data} set={set} />
          {[1,2,3,4].map(i => (
            <div key={i} style={{ background: '#f8faff', borderRadius: 12, padding: 14, border: '1px solid #e2e8f0' }}>
              <div style={{ fontSize: 11, fontWeight: 700, color: '#2145fb', marginBottom: 10, textTransform: 'uppercase', letterSpacing: '0.4px' }}>FAQ {i}</div>
              <div style={row}>
                <Field label="Question" k={`ct:faq${i}Q`} data={data} set={set} />
                <Field label="Answer" k={`ct:faq${i}A`} data={data} set={set} textarea />
              </div>
            </div>
          ))}
        </div>
      </Section>

      <div style={{ position: 'sticky', bottom: 24, display: 'flex', justifyContent: 'flex-end', marginTop: 8 }}>
        <button onClick={handleSave} disabled={saving} style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '12px 28px', background: '#2145fb', color: '#fff', border: 'none', borderRadius: '12px', fontSize: '14px', fontWeight: 700, cursor: 'pointer', fontFamily: "'Poppins',sans-serif", opacity: saving ? 0.7 : 1, boxShadow: '0 8px 24px rgba(33,69,251,0.35)' }}>
          <Save size={15} /> {saving ? 'Saving…' : 'Save All Changes'}
        </button>
      </div>
    </div>
  );
}
