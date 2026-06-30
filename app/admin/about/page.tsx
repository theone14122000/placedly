'use client';
import { useState, useEffect } from 'react';
import { Save, Plus, Trash2, Info } from 'lucide-react';

type Stat = { num: string; label: string };
type Value = { icon: string; title: string; desc: string };
type TimelineItem = { year: string; title: string; desc: string };

const DEFAULT_STATS: Stat[] = [
  { num: '300+', label: 'Professionals Placed' },
  { num: '50+', label: 'Hiring Partners' },
  { num: '40%', label: 'Avg. Salary Hike' },
  { num: '₹0', label: 'Upfront Cost' },
];

const DEFAULT_VALUES: Value[] = [
  { icon: 'Target', title: 'Personalised, Always', desc: 'No two careers are the same. Every candidate gets a bespoke roadmap built around their skills, goals, and target industry — not a generic playbook.' },
  { icon: 'DollarSign', title: 'Zero Upfront', desc: 'We believe in putting our money where our mouth is. You pay only after you get placed. Our success is tied directly to yours.' },
  { icon: 'Handshake', title: 'End-to-End Partnership', desc: 'From CV rebuild to day 90 in your new role — we stay with you through every step, including salary negotiation and joining support.' },
  { icon: 'Globe', title: 'Global Reach', desc: '140+ university partners across UK, France, Germany, and Dubai. We make international education accessible, transparent, and stress-free.' },
  { icon: 'Building2', title: 'Direct Employer Access', desc: 'Our 50+ hiring partner network means your profile goes directly to decision-makers — not into a black-hole job board.' },
  { icon: 'TrendingUp', title: 'Measurable Outcomes', desc: 'Average 40% salary hike. 300+ careers transformed. First interview call within 1–2 weeks. Results you can count on.' },
];

const DEFAULT_TIMELINE: TimelineItem[] = [
  { year: '2022', title: 'Placedly Founded', desc: 'Started in Delhi NCR with a single mission: make career growth transparent and accessible to every professional.' },
  { year: '2023', title: '100 Placements Milestone', desc: 'Crossed 100 successful placements and launched our flagship Career Assistance Programme (CAP).' },
  { year: '2024', title: 'Study Abroad Division', desc: 'Launched global education services with 140+ university partnerships across UK, France, Germany, and Dubai.' },
  { year: '2025', title: '300+ Careers Transformed', desc: 'Expanded to 50+ hiring partners and achieved an average 40% salary hike for placed professionals.' },
  { year: '2026', title: 'Scaling Pan-India', desc: 'Growing beyond Delhi NCR to serve professionals in Bangalore, Mumbai, Hyderabad, and Chennai.' },
];

const DEFAULT_FOUNDER = {
  name: 'Our Founder',
  role: 'Founder & CEO, Placedly',
  bio: "With a deep background in talent acquisition and career consulting across Delhi NCR's top MNCs, our founder built Placedly with a frustration-turned-mission: too many talented professionals were being left behind by a system that favoured connections over competence.",
  quote: "Your next job shouldn't depend on who you know. It should depend on how well we prepare you.",
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

export default function AdminAboutPage() {
  const [stats, setStats] = useState<Stat[]>(DEFAULT_STATS);
  const [values, setValues] = useState<Value[]>(DEFAULT_VALUES);
  const [timeline, setTimeline] = useState<TimelineItem[]>(DEFAULT_TIMELINE);
  const [founder, setFounder] = useState(DEFAULT_FOUNDER);
  const [saving, setSaving] = useState(false);
  const [status, setStatus] = useState('');

  useEffect(() => {
    fetch('/api/admin/content?prefix=about:')
      .then(r => r.json())
      .then((d: Record<string, string>) => {
        if (d['about:data']) {
          const p = JSON.parse(d['about:data']);
          if (p.stats) setStats(p.stats);
          if (p.values) setValues(p.values);
          if (p.timeline) setTimeline(p.timeline);
          if (p.founder) setFounder(p.founder);
        }
      }).catch(() => {});
  }, []);

  const save = async () => {
    setSaving(true);
    const r = await fetch('/api/admin/content', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ 'about:data': JSON.stringify({ stats, values, timeline, founder }) }) });
    setSaving(false);
    setStatus(r.ok ? 'Saved!' : 'Save failed');
    setTimeout(() => setStatus(''), 3000);
  };

  const updateStat = (i: number, field: keyof Stat, val: string) =>
    setStats(prev => prev.map((s, idx) => idx === i ? { ...s, [field]: val } : s));
  const updateValue = (i: number, field: keyof Value, val: string) =>
    setValues(prev => prev.map((v, idx) => idx === i ? { ...v, [field]: val } : v));
  const deleteValue = (i: number) => setValues(prev => prev.filter((_, idx) => idx !== i));
  const addValue = () => setValues(prev => [...prev, { icon: 'Star', title: 'New Value', desc: 'Description' }]);

  const updateTimeline = (i: number, field: keyof TimelineItem, val: string) =>
    setTimeline(prev => prev.map((t, idx) => idx === i ? { ...t, [field]: val } : t));
  const deleteTimeline = (i: number) => setTimeline(prev => prev.filter((_, idx) => idx !== i));
  const addTimeline = () => setTimeline(prev => [...prev, { year: '2027', title: 'New Milestone', desc: 'Description' }]);

  return (
    <div className="adm-page" style={{ padding: '32px', fontFamily: "'Poppins',sans-serif" }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '28px' }}>
        <div>
          <h1 style={{ fontSize: '22px', fontWeight: 900, color: '#0b0d20', marginBottom: '3px' }}>About Us Page</h1>
          <p style={{ fontSize: '13px', color: '#64748b' }}>Manage stats, values, timeline, and founder section.</p>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          {status && <span style={{ fontSize: '12px', color: status.includes('fail') ? '#ef4444' : '#16a34a', fontWeight: 600 }}>{status}</span>}
          <button onClick={save} disabled={saving} style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '10px 20px', background: '#0b0d20', color: '#fff', border: 'none', borderRadius: '10px', fontSize: '13px', fontWeight: 700, cursor: 'pointer', fontFamily: "'Poppins',sans-serif", opacity: saving ? 0.7 : 1 }}>
            <Save size={14} />{saving ? 'Saving…' : 'Save Changes'}
          </button>
        </div>
      </div>

      {/* Stats */}
      <div style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: '16px', padding: '24px', marginBottom: '24px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '20px' }}>
          <Info size={16} color="#2145fb" />
          <span style={{ fontSize: '14px', fontWeight: 700, color: '#0b0d20' }}>Hero Stats</span>
        </div>
        <div className="adm-stats-4" style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: '14px' }}>
          {stats.map((s, i) => (
            <div key={i} style={{ padding: '14px', background: '#f8faff', borderRadius: '10px', border: '1px solid #e2e8f0' }}>
              <div style={{ marginBottom: '8px' }}>
                <label style={labelS}>Value</label>
                <input style={inputS} value={s.num} onChange={e => updateStat(i, 'num', e.target.value)} />
              </div>
              <div>
                <label style={labelS}>Label</label>
                <input style={inputS} value={s.label} onChange={e => updateStat(i, 'label', e.target.value)} />
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="adm-grid-2" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px', marginBottom: '24px' }}>
        {/* Values */}
        <div style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: '16px', padding: '24px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
            <div style={{ fontSize: '14px', fontWeight: 700, color: '#0b0d20' }}>Core Values ({values.length})</div>
            <button onClick={addValue} style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '7px 14px', background: '#eff6ff', color: '#2145fb', border: '1.5px solid #bfdbfe', borderRadius: '8px', fontSize: '12px', fontWeight: 600, cursor: 'pointer', fontFamily: "'Poppins',sans-serif" }}>
              <Plus size={12} /> Add
            </button>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', maxHeight: '420px', overflowY: 'auto' }}>
            {values.map((v, i) => (
              <div key={i} style={{ border: '1px solid #e2e8f0', borderRadius: '10px', padding: '12px', background: '#f8faff', position: 'relative' }}>
                <button onClick={() => deleteValue(i)} style={{ position: 'absolute', top: '10px', right: '10px', background: '#fef2f2', border: '1px solid #fecaca', borderRadius: '6px', padding: '3px', cursor: 'pointer', display: 'flex' }}>
                  <Trash2 size={11} color="#ef4444" />
                </button>
                <div style={{ paddingRight: '28px' }}>
                  <div style={{ marginBottom: '6px' }}>
                    <label style={{ ...labelS, fontSize: '10px' }}>Title</label>
                    <input style={{ ...inputS, padding: '6px 10px', fontSize: '12px' }} value={v.title} onChange={e => updateValue(i, 'title', e.target.value)} />
                  </div>
                  <div>
                    <label style={{ ...labelS, fontSize: '10px' }}>Description</label>
                    <textarea style={{ ...inputS, padding: '6px 10px', fontSize: '12px', minHeight: '50px', resize: 'vertical' as const }} value={v.desc} onChange={e => updateValue(i, 'desc', e.target.value)} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Timeline */}
        <div style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: '16px', padding: '24px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
            <div style={{ fontSize: '14px', fontWeight: 700, color: '#0b0d20' }}>Company Timeline ({timeline.length})</div>
            <button onClick={addTimeline} style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '7px 14px', background: '#eff6ff', color: '#2145fb', border: '1.5px solid #bfdbfe', borderRadius: '8px', fontSize: '12px', fontWeight: 600, cursor: 'pointer', fontFamily: "'Poppins',sans-serif" }}>
              <Plus size={12} /> Add
            </button>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', maxHeight: '420px', overflowY: 'auto' }}>
            {timeline.map((t, i) => (
              <div key={i} style={{ border: '1px solid #e2e8f0', borderRadius: '10px', padding: '12px', background: '#f8faff', position: 'relative' }}>
                <button onClick={() => deleteTimeline(i)} style={{ position: 'absolute', top: '10px', right: '10px', background: '#fef2f2', border: '1px solid #fecaca', borderRadius: '6px', padding: '3px', cursor: 'pointer', display: 'flex' }}>
                  <Trash2 size={11} color="#ef4444" />
                </button>
                <div style={{ paddingRight: '28px' }}>
                  <div style={{ display: 'grid', gridTemplateColumns: '70px 1fr', gap: '8px', marginBottom: '6px' }}>
                    <div>
                      <label style={{ ...labelS, fontSize: '10px' }}>Year</label>
                      <input style={{ ...inputS, padding: '6px 10px', fontSize: '12px' }} value={t.year} onChange={e => updateTimeline(i, 'year', e.target.value)} />
                    </div>
                    <div>
                      <label style={{ ...labelS, fontSize: '10px' }}>Milestone Title</label>
                      <input style={{ ...inputS, padding: '6px 10px', fontSize: '12px' }} value={t.title} onChange={e => updateTimeline(i, 'title', e.target.value)} />
                    </div>
                  </div>
                  <div>
                    <label style={{ ...labelS, fontSize: '10px' }}>Description</label>
                    <textarea style={{ ...inputS, padding: '6px 10px', fontSize: '12px', minHeight: '50px', resize: 'vertical' as const }} value={t.desc} onChange={e => updateTimeline(i, 'desc', e.target.value)} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Founder */}
      <div style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: '16px', padding: '24px' }}>
        <div style={{ fontSize: '14px', fontWeight: 700, color: '#0b0d20', marginBottom: '20px' }}>Founder / Leadership Section</div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
          <div>
            <label style={labelS}>Name</label>
            <input style={inputS} value={founder.name} onChange={e => setFounder({ ...founder, name: e.target.value })} />
          </div>
          <div>
            <label style={labelS}>Role / Title</label>
            <input style={inputS} value={founder.role} onChange={e => setFounder({ ...founder, role: e.target.value })} />
          </div>
          <div style={{ gridColumn: '1 / -1' }}>
            <label style={labelS}>Bio</label>
            <textarea style={{ ...inputS, minHeight: '80px', resize: 'vertical' as const }} value={founder.bio} onChange={e => setFounder({ ...founder, bio: e.target.value })} />
          </div>
          <div style={{ gridColumn: '1 / -1' }}>
            <label style={labelS}>Quote</label>
            <textarea style={{ ...inputS, minHeight: '60px', resize: 'vertical' as const }} value={founder.quote} onChange={e => setFounder({ ...founder, quote: e.target.value })} />
          </div>
        </div>
      </div>
    </div>
  );
}
