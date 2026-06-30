'use client';
import { useState, useEffect } from 'react';
import { Save, Plus, Trash2, Layers } from 'lucide-react';

type Service = { id: number; title: string; tag: string; desc: string; color: string; features: string[] };
type Differentiator = { title: string; desc: string };

const DEFAULT_SERVICES: Service[] = [
  {
    id: 1, title: 'Career Assistance Programme (CAP)', tag: 'India Placement',
    color: '#f97316',
    desc: 'End-to-end career placement service for professionals targeting top MNC roles in India. Resume, LinkedIn, interviews, and direct employer connections — all in one programme.',
    features: ['ATS-optimised CV + LinkedIn rebuild', 'Direct access to 50+ hiring partners', '3 mock interview sessions', 'Salary negotiation coaching', 'Zero upfront — pay after placement'],
  },
  {
    id: 2, title: 'Study Abroad Guidance', tag: 'Global Education',
    color: '#2145fb',
    desc: 'Full-service study abroad consultancy for UK, France, Germany, and Dubai. From university shortlisting to visa documentation and pre-departure support.',
    features: ['140+ university partnerships', 'Application management', 'SOP & LOR guidance', 'Visa documentation support', 'Pre-departure orientation'],
  },
];

const DEFAULT_DIFF: Differentiator[] = [
  { title: 'Zero Upfront Cost', desc: 'Pay only after you succeed — our incentives are aligned with yours.' },
  { title: 'Direct Employer Network', desc: '50+ hiring partners across industries — no job boards, direct submissions.' },
  { title: 'End-to-End Support', desc: 'From day 1 to day 90 in your new role — we stay with you throughout.' },
  { title: 'Personalised Roadmap', desc: 'Every candidate gets a bespoke strategy built around their specific goals.' },
];

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

export default function AdminServicesPage() {
  const [services, setServices] = useState<Service[]>(DEFAULT_SERVICES);
  const [diff, setDiff] = useState<Differentiator[]>(DEFAULT_DIFF);
  const [saving, setSaving] = useState(false);
  const [status, setStatus] = useState('');

  useEffect(() => {
    fetch('/api/admin/content?prefix=services:')
      .then(r => r.json())
      .then((d: Record<string, string>) => {
        if (d['services:data']) { const p = JSON.parse(d['services:data']); if (p.services) setServices(p.services); if (p.diff) setDiff(p.diff); }
      }).catch(() => {});
  }, []);

  const save = async () => {
    setSaving(true);
    const r = await fetch('/api/admin/content', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ 'services:data': JSON.stringify({ services, diff }) }) });
    setSaving(false);
    setStatus(r.ok ? 'Saved!' : 'Save failed');
    setTimeout(() => setStatus(''), 3000);
  };

  const updateService = (id: number, field: keyof Service, value: string | string[]) =>
    setServices(prev => prev.map(s => s.id === id ? { ...s, [field]: value } : s));

  const updateFeature = (svcId: number, fi: number, val: string) =>
    setServices(prev => prev.map(s => s.id === svcId
      ? { ...s, features: s.features.map((f, idx) => idx === fi ? val : f) }
      : s
    ));

  const addFeature = (svcId: number) =>
    setServices(prev => prev.map(s => s.id === svcId ? { ...s, features: [...s.features, 'New feature'] } : s));

  const deleteFeature = (svcId: number, fi: number) =>
    setServices(prev => prev.map(s => s.id === svcId
      ? { ...s, features: s.features.filter((_, idx) => idx !== fi) }
      : s
    ));

  const addService = () => setServices(prev => [...prev, {
    id: Date.now(), title: 'New Service', tag: 'Tag', color: '#7c3aed', desc: 'Service description', features: ['Feature 1'],
  }]);

  const deleteService = (id: number) => setServices(prev => prev.filter(s => s.id !== id));

  const updateDiff = (i: number, field: keyof Differentiator, val: string) =>
    setDiff(prev => prev.map((d, idx) => idx === i ? { ...d, [field]: val } : d));

  return (
    <div className="adm-page" style={{ padding: '32px', fontFamily: "'Poppins',sans-serif" }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '28px' }}>
        <div>
          <h1 style={{ fontSize: '22px', fontWeight: 900, color: '#0b0d20', marginBottom: '3px' }}>Services Page</h1>
          <p style={{ fontSize: '13px', color: '#64748b' }}>Manage service offerings and differentiators.</p>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          {status && <span style={{ fontSize: '12px', color: status.includes('fail') ? '#ef4444' : '#16a34a', fontWeight: 600 }}>{status}</span>}
          <button onClick={save} disabled={saving} style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '10px 20px', background: '#0b0d20', color: '#fff', border: 'none', borderRadius: '10px', fontSize: '13px', fontWeight: 700, cursor: 'pointer', fontFamily: "'Poppins',sans-serif", opacity: saving ? 0.7 : 1 }}>
            <Save size={14} />{saving ? 'Saving…' : 'Save Changes'}
          </button>
        </div>
      </div>

      {/* Services */}
      <div style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: '16px', padding: '24px', marginBottom: '24px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Layers size={16} color="#2145fb" />
            <span style={{ fontSize: '14px', fontWeight: 700, color: '#0b0d20' }}>Services ({services.length})</span>
          </div>
          <button onClick={addService} style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '8px 16px', background: '#eff6ff', color: '#2145fb', border: '1.5px solid #bfdbfe', borderRadius: '8px', fontSize: '12px', fontWeight: 600, cursor: 'pointer', fontFamily: "'Poppins',sans-serif" }}>
            <Plus size={13} /> Add Service
          </button>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {services.map(svc => (
            <div key={svc.id} style={{ border: '2px solid #e2e8f0', borderRadius: '14px', padding: '20px', background: '#f8faff' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <div style={{ width: '16px', height: '16px', borderRadius: '50%', background: svc.color, flexShrink: 0 }} />
                  <span style={{ fontSize: '13px', fontWeight: 700, color: '#0b0d20' }}>{svc.title}</span>
                </div>
                <button onClick={() => deleteService(svc.id)} style={{ background: '#fef2f2', border: '1px solid #fecaca', borderRadius: '6px', padding: '5px', cursor: 'pointer', display: 'flex' }}>
                  <Trash2 size={13} color="#ef4444" />
                </button>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 120px', gap: '12px', marginBottom: '12px' }}>
                <div>
                  <label style={labelS}>Service Title</label>
                  <input style={inputS} value={svc.title} onChange={e => updateService(svc.id, 'title', e.target.value)} />
                </div>
                <div>
                  <label style={labelS}>Tag / Category</label>
                  <input style={inputS} value={svc.tag} onChange={e => updateService(svc.id, 'tag', e.target.value)} />
                </div>
                <div>
                  <label style={labelS}>Accent Color</label>
                  <input type="color" style={{ ...inputS, padding: '4px', height: '38px', cursor: 'pointer' }} value={svc.color} onChange={e => updateService(svc.id, 'color', e.target.value)} />
                </div>
              </div>
              <div style={{ marginBottom: '12px' }}>
                <label style={labelS}>Description</label>
                <textarea style={{ ...inputS, minHeight: '70px', resize: 'vertical' as const }} value={svc.desc} onChange={e => updateService(svc.id, 'desc', e.target.value)} />
              </div>
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                  <label style={labelS}>Features</label>
                  <button onClick={() => addFeature(svc.id)} style={{ fontSize: '11px', color: '#2145fb', background: 'none', border: 'none', cursor: 'pointer', fontFamily: "'Poppins',sans-serif", fontWeight: 600 }}>+ Add</button>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  {svc.features.map((f, fi) => (
                    <div key={fi} style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                      <input style={{ ...inputS, fontSize: '12px', padding: '7px 10px' }} value={f} onChange={e => updateFeature(svc.id, fi, e.target.value)} />
                      <button onClick={() => deleteFeature(svc.id, fi)} style={{ background: '#fef2f2', border: '1px solid #fecaca', borderRadius: '6px', padding: '5px', cursor: 'pointer', display: 'flex', flexShrink: 0 }}>
                        <Trash2 size={11} color="#ef4444" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Differentiators */}
      <div style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: '16px', padding: '24px' }}>
        <div style={{ fontSize: '14px', fontWeight: 700, color: '#0b0d20', marginBottom: '20px' }}>Differentiators / Why Choose Us ({diff.length})</div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2,1fr)', gap: '14px' }}>
          {diff.map((d, i) => (
            <div key={i} style={{ border: '1px solid #e2e8f0', borderRadius: '10px', padding: '14px', background: '#f8faff' }}>
              <div style={{ marginBottom: '8px' }}>
                <label style={labelS}>Title</label>
                <input style={inputS} value={d.title} onChange={e => updateDiff(i, 'title', e.target.value)} />
              </div>
              <div>
                <label style={labelS}>Description</label>
                <textarea style={{ ...inputS, minHeight: '60px', resize: 'vertical' as const }} value={d.desc} onChange={e => updateDiff(i, 'desc', e.target.value)} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
