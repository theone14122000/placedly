'use client';
import { useState, useEffect } from 'react';
import { Plus, Pencil, Trash2, Search, X, Save } from 'lucide-react';
import SkillsInput from '../components/SkillsInput';

type Job = { id: string; title: string; company: string; location: string; type: string; salary: string; category: string; experience: string; tags: string; description: string; isActive: boolean };
const BLANK = { title: '', company: '', location: '', type: 'Full Time', salary: '', category: 'Tech', experience: '', tags: '', description: '' };
const CATEGORIES = ['Tech', 'Sales', 'Finance', 'Marketing', 'Healthcare', 'Operations', 'HR', 'General'];
const TYPES = ['Full Time', 'Hybrid', 'Remote', 'Contract', 'Part Time'];

const inp: React.CSSProperties = { display: 'block', width: '100%', padding: '9px 12px', border: '1.5px solid #e2e8f0', borderRadius: '8px', fontSize: '13px', fontFamily: "'Poppins',sans-serif", color: '#0b0d20', background: '#f8faff', outline: 'none', boxSizing: 'border-box' as const };
const lbl: React.CSSProperties = { display: 'block', fontSize: '10px', fontWeight: 600, color: '#64748b', textTransform: 'uppercase' as const, letterSpacing: '0.4px', marginBottom: '5px' };

export default function AdminVacancies() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [search, setSearch] = useState('');
  const [modal, setModal] = useState<'add' | 'edit' | null>(null);
  const [editing, setEditing] = useState<Job | null>(null);
  const [form, setForm] = useState(BLANK);
  const [loading, setLoading] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [status, setStatus] = useState('');

  const load = () => fetch('/api/admin/vacancies').then(r => r.json()).then(setJobs).catch(() => {});
  useEffect(() => { load(); }, []);

  const openAdd = () => { setForm(BLANK); setModal('add'); };
  const openEdit = (j: Job) => { setEditing(j); setForm({ title: j.title, company: j.company, location: j.location, type: j.type, salary: j.salary || '', category: j.category, experience: j.experience, tags: j.tags, description: j.description }); setModal('edit'); };
  const close = () => { setModal(null); setEditing(null); };

  const handleSave = async () => {
    setLoading(true);
    const method = modal === 'add' ? 'POST' : 'PUT';
    const body = modal === 'edit' ? { id: editing!.id, ...form } : form;
    const r = await fetch('/api/admin/vacancies', { method, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) });
    if (r.ok) { await load(); close(); setStatus('Saved!'); setTimeout(() => setStatus(''), 2000); }
    setLoading(false);
  };

  const handleDelete = async (id: string) => {
    await fetch('/api/admin/vacancies', { method: 'DELETE', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ id }) });
    await load(); setDeleteId(null);
  };

  const filtered = jobs.filter(j => j.title.toLowerCase().includes(search.toLowerCase()) || j.company.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="adm-page" style={{ padding: '32px' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px' }}>
        <div>
          <h1 style={{ fontSize: '22px', fontWeight: 900, color: '#0b0d20', marginBottom: '2px' }}>Vacancies</h1>
          <p style={{ fontSize: '13px', color: '#64748b' }}>{jobs.length} listings · saved to database</p>
        </div>
        <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
          {status && <span style={{ fontSize: '12px', color: '#16a34a', fontWeight: 600 }}>✓ {status}</span>}
          <button onClick={openAdd} style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '10px 18px', background: '#2145fb', color: '#fff', border: 'none', borderRadius: '10px', fontSize: '13px', fontWeight: 600, cursor: 'pointer', fontFamily: "'Poppins',sans-serif" }}>
            <Plus size={14} /> Add Vacancy
          </button>
        </div>
      </div>

      <div style={{ position: 'relative', marginBottom: '20px' }}>
        <Search size={14} color="#94a3b8" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }} />
        <input style={{ ...inp, paddingLeft: '36px', fontSize: '14px' }} placeholder="Search by role or company…" value={search} onChange={e => setSearch(e.target.value)} />
      </div>

      <div style={{ background: '#fff', border: '1px solid #eef0f6', borderRadius: '16px', overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px' }}>
          <thead>
            <tr style={{ background: '#f8faff', borderBottom: '1px solid #eef0f6' }}>
              {['Role', 'Company', 'Location', 'Type', 'Salary', 'Category', 'Actions'].map(h => (
                <th key={h} style={{ padding: '12px 16px', textAlign: 'left', fontWeight: 600, color: '#64748b', fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.4px', whiteSpace: 'nowrap' }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.map((job, i) => (
              <tr key={job.id} style={{ borderBottom: i < filtered.length - 1 ? '1px solid #f1f5f9' : 'none' }}>
                <td style={{ padding: '14px 16px' }}>
                  <div style={{ fontWeight: 700, color: '#0b0d20' }}>{job.title}</div>
                  {job.tags && <div style={{ display: 'flex', gap: '4px', marginTop: '5px', flexWrap: 'wrap' }}>
                    {job.tags.split(',').slice(0, 3).map(t => t.trim()).filter(Boolean).map(t => (
                      <span key={t} style={{ fontSize: '10px', background: '#eff6ff', color: '#2145fb', padding: '2px 8px', borderRadius: '999px', fontWeight: 600, border: '1px solid #bfdbfe' }}>{t}</span>
                    ))}
                    {job.tags.split(',').filter(Boolean).length > 3 && (
                      <span style={{ fontSize: '10px', background: '#f1f5f9', color: '#64748b', padding: '2px 7px', borderRadius: '999px', fontWeight: 500 }}>+{job.tags.split(',').filter(Boolean).length - 3}</span>
                    )}
                  </div>}
                </td>
                <td style={{ padding: '14px 16px', color: '#374151' }}>{job.company}</td>
                <td style={{ padding: '14px 16px', color: '#64748b' }}>{job.location}</td>
                <td style={{ padding: '14px 16px' }}>
                  <span style={{ fontSize: '11px', fontWeight: 600, padding: '3px 9px', borderRadius: '999px', background: job.type === 'Remote' ? '#f0fdf4' : job.type === 'Hybrid' ? '#fff7ed' : '#eff6ff', color: job.type === 'Remote' ? '#16a34a' : job.type === 'Hybrid' ? '#f97316' : '#2145fb' }}>{job.type}</span>
                </td>
                <td style={{ padding: '14px 16px', fontWeight: 600, color: '#0b0d20' }}>{job.salary}</td>
                <td style={{ padding: '14px 16px', color: '#64748b' }}>{job.category}</td>
                <td style={{ padding: '14px 16px' }}>
                  <div style={{ display: 'flex', gap: '6px' }}>
                    <button onClick={() => openEdit(job)} style={{ display: 'flex', alignItems: 'center', gap: '4px', padding: '6px 10px', background: '#eff6ff', color: '#2145fb', border: 'none', borderRadius: '7px', fontSize: '12px', cursor: 'pointer', fontWeight: 600, fontFamily: "'Poppins',sans-serif" }}><Pencil size={11} /> Edit</button>
                    <button onClick={() => setDeleteId(job.id)} style={{ display: 'flex', alignItems: 'center', gap: '4px', padding: '6px 10px', background: '#fef2f2', color: '#ef4444', border: 'none', borderRadius: '7px', fontSize: '12px', cursor: 'pointer', fontWeight: 600, fontFamily: "'Poppins',sans-serif" }}><Trash2 size={11} /> Delete</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {filtered.length === 0 && <div style={{ textAlign: 'center', padding: '48px', color: '#94a3b8', fontSize: '14px' }}>No vacancies yet. Click "Add Vacancy" to create one.</div>}
      </div>

      {modal && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 999, padding: '24px' }}>
          <div style={{ background: '#fff', borderRadius: '20px', padding: '32px', width: '100%', maxWidth: '640px', maxHeight: '90vh', overflowY: 'auto', boxShadow: '0 24px 64px rgba(0,0,0,0.2)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
              <h2 style={{ fontSize: '18px', fontWeight: 800, color: '#0b0d20' }}>{modal === 'add' ? 'Add New Vacancy' : 'Edit Vacancy'}</h2>
              <button onClick={close} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#94a3b8' }}><X size={18} /></button>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
              <div style={{ gridColumn: '1/-1' }}><label style={lbl}>Job Role / Title *</label><input style={inp} required placeholder="e.g. Senior Financial Analyst" value={form.title} onChange={e => setForm(f => ({ ...f, title: e.target.value }))} /></div>
              <div><label style={lbl}>Company *</label><input style={inp} placeholder="e.g. EXL Service" value={form.company} onChange={e => setForm(f => ({ ...f, company: e.target.value }))} /></div>
              <div><label style={lbl}>Location *</label><input style={inp} placeholder="e.g. Noida, UP" value={form.location} onChange={e => setForm(f => ({ ...f, location: e.target.value }))} /></div>
              <div><label style={lbl}>Salary Range</label><input style={inp} placeholder="e.g. ₹6–10 LPA" value={form.salary} onChange={e => setForm(f => ({ ...f, salary: e.target.value }))} /></div>
              <div><label style={lbl}>Experience</label><input style={inp} placeholder="e.g. 2–4 yrs" value={form.experience} onChange={e => setForm(f => ({ ...f, experience: e.target.value }))} /></div>
              <div><label style={lbl}>Job Type</label><select style={{ ...inp, cursor: 'pointer' }} value={form.type} onChange={e => setForm(f => ({ ...f, type: e.target.value }))}>{TYPES.map(t => <option key={t}>{t}</option>)}</select></div>
              <div><label style={lbl}>Category</label><select style={{ ...inp, cursor: 'pointer' }} value={form.category} onChange={e => setForm(f => ({ ...f, category: e.target.value }))}>{CATEGORIES.map(c => <option key={c}>{c}</option>)}</select></div>
              <div style={{ gridColumn: '1/-1' }}><SkillsInput value={form.tags} onChange={tags => setForm(f => ({ ...f, tags }))} /></div>
              <div style={{ gridColumn: '1/-1' }}><label style={lbl}>Description</label><textarea style={{ ...inp, resize: 'vertical' as const, minHeight: '80px' }} placeholder="Job description…" value={form.description} onChange={e => setForm(f => ({ ...f, description: e.target.value }))} /></div>
            </div>
            <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end', marginTop: '24px' }}>
              <button onClick={close} style={{ padding: '10px 20px', background: '#f1f5f9', color: '#374151', border: 'none', borderRadius: '10px', fontSize: '13px', fontWeight: 600, cursor: 'pointer', fontFamily: "'Poppins',sans-serif" }}>Cancel</button>
              <button onClick={handleSave} disabled={loading || !form.title || !form.company} style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '10px 24px', background: '#2145fb', color: '#fff', border: 'none', borderRadius: '10px', fontSize: '13px', fontWeight: 600, cursor: 'pointer', fontFamily: "'Poppins',sans-serif", opacity: loading ? 0.6 : 1 }}>
                <Save size={13} /> {loading ? 'Saving…' : modal === 'add' ? 'Add Vacancy' : 'Save Changes'}
              </button>
            </div>
          </div>
        </div>
      )}

      {deleteId && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 999 }}>
          <div style={{ background: '#fff', borderRadius: '16px', padding: '28px', maxWidth: '380px', width: '90%', textAlign: 'center', boxShadow: '0 24px 64px rgba(0,0,0,0.2)' }}>
            <div style={{ width: '44px', height: '44px', borderRadius: '50%', background: '#fef2f2', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px' }}><Trash2 size={20} color="#ef4444" /></div>
            <div style={{ fontSize: '16px', fontWeight: 700, color: '#0b0d20', marginBottom: '8px' }}>Delete this vacancy?</div>
            <div style={{ fontSize: '13px', color: '#64748b', marginBottom: '24px' }}>This cannot be undone.</div>
            <div style={{ display: 'flex', gap: '10px', justifyContent: 'center' }}>
              <button onClick={() => setDeleteId(null)} style={{ padding: '9px 20px', background: '#f1f5f9', border: 'none', borderRadius: '9px', fontSize: '13px', fontWeight: 600, cursor: 'pointer', color: '#374151', fontFamily: "'Poppins',sans-serif" }}>Cancel</button>
              <button onClick={() => handleDelete(deleteId)} style={{ padding: '9px 20px', background: '#ef4444', color: '#fff', border: 'none', borderRadius: '9px', fontSize: '13px', fontWeight: 600, cursor: 'pointer', fontFamily: "'Poppins',sans-serif" }}>Yes, Delete</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
