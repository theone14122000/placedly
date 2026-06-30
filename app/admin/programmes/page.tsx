'use client';
import { useState, useEffect } from 'react';
import { Plus, Pencil, Trash2, X, Save, ToggleLeft, ToggleRight } from 'lucide-react';

type Programme = { id: string; name: string; description: string | null; cycleDays: number; isActive: boolean; createdAt: string; _count?: { applications: number } };
const BLANK = { name: '', description: '', cycleDays: 90 };

const inp: React.CSSProperties = { display: 'block', width: '100%', padding: '9px 12px', border: '1.5px solid #e2e8f0', borderRadius: '8px', fontSize: '13px', fontFamily: "'Poppins',sans-serif", color: '#0b0d20', background: '#f8faff', outline: 'none', boxSizing: 'border-box' as const };
const lbl: React.CSSProperties = { display: 'block', fontSize: '10px', fontWeight: 600, color: '#64748b', textTransform: 'uppercase' as const, letterSpacing: '0.4px', marginBottom: '5px' };

export default function AdminProgrammes() {
  const [programmes, setProgrammes] = useState<Programme[]>([]);
  const [modal, setModal] = useState<'add' | 'edit' | null>(null);
  const [editing, setEditing] = useState<Programme | null>(null);
  const [form, setForm] = useState(BLANK);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState('');

  const load = () =>
    fetch('/api/admin/programmes').then(r => r.json()).then(setProgrammes).catch(() => {});
  useEffect(() => { load(); }, []);

  const openAdd = () => { setForm(BLANK); setModal('add'); };
  const openEdit = (p: Programme) => { setEditing(p); setForm({ name: p.name, description: p.description || '', cycleDays: p.cycleDays }); setModal('edit'); };
  const close = () => { setModal(null); setEditing(null); };

  const handleSave = async () => {
    setLoading(true);
    const body = modal === 'edit' ? { id: editing!.id, ...form, cycleDays: Number(form.cycleDays) } : { ...form, cycleDays: Number(form.cycleDays) };
    const r = await fetch('/api/admin/programmes', { method: modal === 'add' ? 'POST' : 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) });
    if (r.ok) { await load(); close(); setStatus('Saved!'); setTimeout(() => setStatus(''), 2000); }
    setLoading(false);
  };

  const toggleActive = async (p: Programme) => {
    await fetch('/api/admin/programmes', { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ id: p.id, name: p.name, description: p.description, cycleDays: p.cycleDays, isActive: !p.isActive }) });
    await load();
  };

  return (
    <div className="adm-page" style={{ padding: '32px' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '28px' }}>
        <div>
          <h1 style={{ fontSize: '22px', fontWeight: 900, color: '#0b0d20', marginBottom: '2px' }}>Programmes</h1>
          <p style={{ fontSize: '13px', color: '#64748b' }}>Manage service packages and access durations.</p>
        </div>
        <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
          {status && <span style={{ fontSize: '12px', color: '#16a34a', fontWeight: 600 }}>✓ {status}</span>}
          <button onClick={openAdd} style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '10px 18px', background: '#2145fb', color: '#fff', border: 'none', borderRadius: '10px', fontSize: '13px', fontWeight: 600, cursor: 'pointer', fontFamily: "'Poppins',sans-serif" }}>
            <Plus size={14} /> Add Programme
          </button>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(280px,1fr))', gap: '16px' }}>
        {programmes.map(p => (
          <div key={p.id} style={{ background: '#fff', border: `1.5px solid ${p.isActive ? '#e2e8f0' : '#f1f5f9'}`, borderRadius: '16px', padding: '22px', boxShadow: '0 1px 4px rgba(0,0,0,.04)', opacity: p.isActive ? 1 : 0.65 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '14px' }}>
              <span style={{ fontSize: '11px', fontWeight: 700, padding: '3px 10px', borderRadius: 999, background: p.isActive ? '#f0fdf4' : '#f1f5f9', color: p.isActive ? '#16a34a' : '#94a3b8' }}>{p.isActive ? 'Active' : 'Inactive'}</span>
              <div style={{ display: 'flex', gap: '6px' }}>
                <button onClick={() => openEdit(p)} style={{ padding: '5px 9px', background: '#eff6ff', color: '#2145fb', border: 'none', borderRadius: '6px', cursor: 'pointer', fontSize: '11px', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '3px', fontFamily: "'Poppins',sans-serif" }}><Pencil size={10} /> Edit</button>
                <button onClick={() => toggleActive(p)} title={p.isActive ? 'Deactivate' : 'Activate'} style={{ padding: '5px', background: p.isActive ? '#fff7ed' : '#f0fdf4', border: 'none', borderRadius: '6px', cursor: 'pointer', display: 'flex' }}>
                  {p.isActive ? <ToggleRight size={16} color="#f97316" /> : <ToggleLeft size={16} color="#16a34a" />}
                </button>
              </div>
            </div>
            <div style={{ fontSize: '16px', fontWeight: 800, color: '#0b0d20', marginBottom: '6px' }}>{p.name}</div>
            <div style={{ fontSize: '12px', color: '#64748b', lineHeight: 1.6, marginBottom: '14px' }}>{p.description || '—'}</div>
            <div style={{ display: 'flex', gap: '10px' }}>
              <div style={{ background: '#eff6ff', borderRadius: '8px', padding: '8px 12px', flex: 1, textAlign: 'center' }}>
                <div style={{ fontSize: '18px', fontWeight: 900, color: '#2145fb' }}>{p.cycleDays}</div>
                <div style={{ fontSize: '10px', color: '#64748b', fontWeight: 600 }}>DAYS ACCESS</div>
              </div>
            </div>
          </div>
        ))}
        {programmes.length === 0 && <div style={{ gridColumn: '1/-1', textAlign: 'center', padding: '48px', color: '#94a3b8' }}>No programmes. Click "Add Programme" to create one.</div>}
      </div>

      {modal && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 999, padding: '24px' }}>
          <div style={{ background: '#fff', borderRadius: '20px', padding: '32px', width: '100%', maxWidth: '480px', boxShadow: '0 24px 64px rgba(0,0,0,0.2)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
              <h2 style={{ fontSize: '18px', fontWeight: 800, color: '#0b0d20' }}>{modal === 'add' ? 'Add Programme' : 'Edit Programme'}</h2>
              <button onClick={close} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#94a3b8' }}><X size={18} /></button>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div><label style={lbl}>Programme Name *</label><input style={inp} placeholder="e.g. CAP — Premium" value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} /></div>
              <div><label style={lbl}>Description</label><textarea style={{ ...inp, resize: 'vertical' as const, minHeight: '70px' }} placeholder="What does this programme include?" value={form.description} onChange={e => setForm(f => ({ ...f, description: e.target.value }))} /></div>
              <div><label style={lbl}>Access Duration (days) *</label><input type="number" min={1} style={inp} placeholder="180" value={form.cycleDays} onChange={e => setForm(f => ({ ...f, cycleDays: Number(e.target.value) }))} /></div>
            </div>
            <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end', marginTop: '24px' }}>
              <button onClick={close} style={{ padding: '10px 20px', background: '#f1f5f9', color: '#374151', border: 'none', borderRadius: '10px', fontSize: '13px', fontWeight: 600, cursor: 'pointer', fontFamily: "'Poppins',sans-serif" }}>Cancel</button>
              <button onClick={handleSave} disabled={loading || !form.name || !form.cycleDays} style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '10px 24px', background: '#2145fb', color: '#fff', border: 'none', borderRadius: '10px', fontSize: '13px', fontWeight: 600, cursor: 'pointer', fontFamily: "'Poppins',sans-serif", opacity: loading ? 0.7 : 1 }}>
                <Save size={13} /> {loading ? 'Saving…' : 'Save'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
