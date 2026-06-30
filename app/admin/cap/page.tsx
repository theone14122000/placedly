'use client';
import { useState, useEffect } from 'react';
import { Save, Plus, Trash2, Rocket, TrendingUp } from 'lucide-react';

type Step      = { id: number; number: string; title: string; desc: string; tag: string };
type Stat      = { label: string; value: string };
type ShareRow  = { ctc: string; fee: string; net: string; roi: string };

const DEFAULT_STEPS: Step[] = [
  { id: 1, number: '01', title: 'Profile Deep-Dive', desc: 'We start with a 45-min diagnostic call to map your skills, gaps, and career goals.', tag: 'Discovery' },
  { id: 2, number: '02', title: 'CV & LinkedIn Rebuild', desc: 'ATS-optimised resume + complete LinkedIn overhaul aligned with your target roles.', tag: 'Branding' },
  { id: 3, number: '03', title: 'Job Application Sprint', desc: 'We identify and apply to roles across our 50+ hiring partner network on your behalf.', tag: 'Outreach' },
  { id: 4, number: '04', title: 'Interview Preparation', desc: 'Three mock interview sessions: HR, Technical/Domain, and a full final mock with feedback.', tag: 'Prep' },
  { id: 5, number: '05', title: 'Offer & Negotiation Support', desc: 'Word-for-word salary negotiation scripts and advisor support through offer stage.', tag: 'Offer' },
  { id: 6, number: '06', title: 'Post-Placement Check-in', desc: '30, 60, and 90-day check-ins to ensure you\'re thriving in your new role.', tag: 'Success' },
];

const DEFAULT_STATS: Stat[] = [
  { label: 'Avg. Salary Hike', value: '40%+' },
  { label: 'Fastest Placement', value: '9 Days' },
  { label: 'Hiring Partners', value: '50+' },
  { label: 'Careers Transformed', value: '300+' },
];

const DEFAULT_SHARE: ShareRow[] = [
  { ctc: '₹3,00,000',  fee: '₹36,000',   net: '₹2.64L+', roi: '7x ROI' },
  { ctc: '₹4,50,000',  fee: '₹54,000',   net: '₹3.96L+', roi: '7x ROI' },
  { ctc: '₹6,00,000',  fee: '₹72,000',   net: '₹5.28L+', roi: '8x ROI' },
  { ctc: '₹8,00,000',  fee: '₹96,000',   net: '₹7.04L+', roi: '8x ROI' },
  { ctc: '₹10,00,000', fee: '₹1,20,000', net: '₹8.8L+',  roi: '9x ROI' },
];

const DEFAULT_HERO = {
  tag: 'CAP Programme',
  title: 'The Career Assistance Programme',
  subtitle: 'A six-step system that takes you from where you are to where you want to be — with zero upfront cost.',
  ctaText: 'Apply for CAP',
  ctaLink: '/contact',
};

const inputS: React.CSSProperties = {
  width: '100%', padding: '9px 12px', border: '1.5px solid #e2e8f0',
  borderRadius: '8px', fontSize: '13px', fontFamily: "'Poppins',sans-serif",
  color: '#0b0d20', background: '#f8faff', outline: 'none',
  boxSizing: 'border-box' as const,
};

const labelS: React.CSSProperties = {
  display: 'block', fontSize: '11px', fontWeight: 600, color: '#374151',
  letterSpacing: '0.4px', textTransform: 'uppercase' as const, marginBottom: '5px',
};

export default function AdminCapPage() {
  const [hero, setHero]         = useState(DEFAULT_HERO);
  const [steps, setSteps]       = useState<Step[]>(DEFAULT_STEPS);
  const [stats, setStats]       = useState<Stat[]>(DEFAULT_STATS);
  const [shareTable, setShare]  = useState<ShareRow[]>(DEFAULT_SHARE);
  const [saving, setSaving]     = useState(false);
  const [status, setStatus]     = useState('');
  const [editStep, setEditStep] = useState<Step | null>(null);

  useEffect(() => {
    fetch('/api/admin/content?prefix=cap:')
      .then(r => r.json())
      .then((d: Record<string, string>) => {
        if (d['cap:data']) { const p = JSON.parse(d['cap:data']); if (p.hero) setHero(p.hero); if (p.steps) setSteps(p.steps); if (p.stats) setStats(p.stats); if (p.shareTable) setShare(p.shareTable); }
      }).catch(() => {});
  }, []);

  const save = async () => {
    setSaving(true);
    const r = await fetch('/api/admin/content', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ 'cap:data': JSON.stringify({ hero, steps, stats, shareTable }) }) });
    setSaving(false);
    setStatus(r.ok ? 'Saved!' : 'Save failed');
    setTimeout(() => setStatus(''), 3000);
  };

  const updateStep = (id: number, field: keyof Step, value: string) => {
    setSteps(prev => prev.map(s => s.id === id ? { ...s, [field]: value } : s));
  };

  const deleteStep = (id: number) => setSteps(prev => prev.filter(s => s.id !== id));

  const addStep = () => {
    const newId = Date.now();
    setSteps(prev => [...prev, { id: newId, number: String(prev.length + 1).padStart(2, '0'), title: 'New Step', desc: 'Description', tag: 'Tag' }]);
  };

  const updateStat = (i: number, field: keyof Stat, value: string) => {
    setStats(prev => prev.map((s, idx) => idx === i ? { ...s, [field]: value } : s));
  };

  return (
    <div className="adm-page" style={{ padding: '32px', fontFamily: "'Poppins',sans-serif" }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '28px' }}>
        <div>
          <h1 style={{ fontSize: '22px', fontWeight: 900, color: '#0b0d20', marginBottom: '3px' }}>CAP Programme</h1>
          <p style={{ fontSize: '13px', color: '#64748b' }}>Manage the Career Assistance Programme page content.</p>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          {status && <span style={{ fontSize: '12px', color: status.includes('fail') ? '#ef4444' : '#16a34a', fontWeight: 600 }}>{status}</span>}
          <button onClick={save} disabled={saving} style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '10px 20px', background: '#0b0d20', color: '#fff', border: 'none', borderRadius: '10px', fontSize: '13px', fontWeight: 700, cursor: 'pointer', fontFamily: "'Poppins',sans-serif", opacity: saving ? 0.7 : 1 }}>
            <Save size={14} />{saving ? 'Saving…' : 'Save Changes'}
          </button>
        </div>
      </div>

      <div className="adm-grid-2" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>

        {/* Hero Section */}
        <div style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: '16px', padding: '24px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '20px' }}>
            <Rocket size={16} color="#f97316" />
            <span style={{ fontSize: '14px', fontWeight: 700, color: '#0b0d20' }}>Hero Section</span>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            <div>
              <label style={labelS}>Tag Label</label>
              <input style={inputS} value={hero.tag} onChange={e => setHero({ ...hero, tag: e.target.value })} />
            </div>
            <div>
              <label style={labelS}>Page Title</label>
              <input style={inputS} value={hero.title} onChange={e => setHero({ ...hero, title: e.target.value })} />
            </div>
            <div>
              <label style={labelS}>Subtitle</label>
              <textarea style={{ ...inputS, minHeight: '80px', resize: 'vertical' as const }} value={hero.subtitle} onChange={e => setHero({ ...hero, subtitle: e.target.value })} />
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
              <div>
                <label style={labelS}>CTA Button Text</label>
                <input style={inputS} value={hero.ctaText} onChange={e => setHero({ ...hero, ctaText: e.target.value })} />
              </div>
              <div>
                <label style={labelS}>CTA Link</label>
                <input style={inputS} value={hero.ctaLink} onChange={e => setHero({ ...hero, ctaLink: e.target.value })} />
              </div>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: '16px', padding: '24px' }}>
          <div style={{ fontSize: '14px', fontWeight: 700, color: '#0b0d20', marginBottom: '20px' }}>Stats Bar</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {stats.map((s, i) => (
              <div key={i} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', padding: '12px', background: '#f8faff', borderRadius: '10px', border: '1px solid #e2e8f0' }}>
                <div>
                  <label style={labelS}>Value</label>
                  <input style={inputS} value={s.value} onChange={e => updateStat(i, 'value', e.target.value)} />
                </div>
                <div>
                  <label style={labelS}>Label</label>
                  <input style={inputS} value={s.label} onChange={e => updateStat(i, 'label', e.target.value)} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Steps */}
      <div style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: '16px', padding: '24px', marginTop: '24px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
          <div style={{ fontSize: '14px', fontWeight: 700, color: '#0b0d20' }}>Programme Steps ({steps.length})</div>
          <button onClick={addStep} style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '8px 16px', background: '#eff6ff', color: '#2145fb', border: '1.5px solid #bfdbfe', borderRadius: '8px', fontSize: '12px', fontWeight: 600, cursor: 'pointer', fontFamily: "'Poppins',sans-serif" }}>
            <Plus size={13} /> Add Step
          </button>
        </div>
        <div className="adm-steps-2" style={{ display: 'grid', gridTemplateColumns: 'repeat(2,1fr)', gap: '16px' }}>
          {steps.map(step => (
            <div key={step.id} style={{ border: '1.5px solid #e2e8f0', borderRadius: '12px', padding: '16px', background: '#f8faff', position: 'relative' }}>
              <button onClick={() => deleteStep(step.id)} style={{ position: 'absolute', top: '12px', right: '12px', background: '#fef2f2', border: '1px solid #fecaca', borderRadius: '6px', padding: '4px', cursor: 'pointer', display: 'flex' }}>
                <Trash2 size={12} color="#ef4444" />
              </button>
              <div style={{ display: 'grid', gridTemplateColumns: '60px 1fr 80px', gap: '10px', marginBottom: '10px' }}>
                <div>
                  <label style={labelS}>No.</label>
                  <input style={inputS} value={step.number} onChange={e => updateStep(step.id, 'number', e.target.value)} />
                </div>
                <div>
                  <label style={labelS}>Title</label>
                  <input style={inputS} value={step.title} onChange={e => updateStep(step.id, 'title', e.target.value)} />
                </div>
                <div>
                  <label style={labelS}>Tag</label>
                  <input style={inputS} value={step.tag} onChange={e => updateStep(step.id, 'tag', e.target.value)} />
                </div>
              </div>
              <div>
                <label style={labelS}>Description</label>
                <textarea style={{ ...inputS, minHeight: '60px', resize: 'vertical' as const }} value={step.desc} onChange={e => updateStep(step.id, 'desc', e.target.value)} />
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Success Share Table */}
      <div style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: '16px', padding: '24px', marginTop: '24px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <TrendingUp size={16} color="#f97316" />
            <span style={{ fontSize: '14px', fontWeight: 700, color: '#0b0d20' }}>Success Share Table ({shareTable.length} rows)</span>
          </div>
          <button onClick={() => setShare(p => [...p, { ctc: '₹0', fee: '₹0', net: '₹0', roi: '0x ROI' }])} style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '8px 16px', background: '#eff6ff', color: '#2145fb', border: '1.5px solid #bfdbfe', borderRadius: '8px', fontSize: '12px', fontWeight: 600, cursor: 'pointer', fontFamily: "'Poppins',sans-serif" }}>
            <Plus size={13} /> Add Row
          </button>
        </div>
        {/* Column headers */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr 36px', gap: '10px', marginBottom: '8px', padding: '0 4px' }}>
          {['Annual CTC', 'Service Fee (12%)', 'Net Gain', 'ROI Badge', ''].map(h => (
            <div key={h} style={{ fontSize: '10px', fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.4px' }}>{h}</div>
          ))}
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          {shareTable.map((row, i) => (
            <div key={i} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr 36px', gap: '10px', alignItems: 'center', padding: '10px 12px', background: '#f8faff', borderRadius: '10px', border: '1px solid #e2e8f0' }}>
              <input style={inputS} value={row.ctc} placeholder="₹3,00,000" onChange={e => setShare(p => p.map((r, idx) => idx === i ? { ...r, ctc: e.target.value } : r))} />
              <input style={inputS} value={row.fee} placeholder="₹36,000"   onChange={e => setShare(p => p.map((r, idx) => idx === i ? { ...r, fee: e.target.value } : r))} />
              <input style={inputS} value={row.net} placeholder="₹2.64L+"   onChange={e => setShare(p => p.map((r, idx) => idx === i ? { ...r, net: e.target.value } : r))} />
              <input style={inputS} value={row.roi} placeholder="7x ROI"    onChange={e => setShare(p => p.map((r, idx) => idx === i ? { ...r, roi: e.target.value } : r))} />
              <button onClick={() => setShare(p => p.filter((_, idx) => idx !== i))} style={{ background: '#fef2f2', border: '1px solid #fecaca', borderRadius: '6px', padding: '6px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Trash2 size={12} color="#ef4444" />
              </button>
            </div>
          ))}
        </div>
        <p style={{ fontSize: '11px', color: '#94a3b8', marginTop: '12px' }}>These values display in the dark &quot;Our Success Share Model&quot; card on the CAP page.</p>
      </div>
    </div>
  );
}
