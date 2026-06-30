'use client';
import { useRef, useState, useEffect } from 'react';
import { Plus, Pencil, Trash2, X, Save, BookOpen, ChevronDown, ChevronUp, Upload, Loader, Link, FileText, Film, ImageIcon, File } from 'lucide-react';

type Course = { id: string; title: string; category: string; level: string; duration: string; description: string; isActive: boolean };
type CourseModule = { id: string; courseId: string; title: string; type: string; url: string | null; content: string | null; sortOrder: number };

const BLANK_COURSE = { title: '', category: 'Career', level: 'Beginner', duration: '', description: '' };
const BLANK_MODULE = { title: '', type: 'PDF', url: '', content: '' };
const CATEGORIES = ['Career', 'Interview', 'Domain', 'Study', 'Finance', 'Leadership'];
const LEVELS = ['Beginner', 'Intermediate', 'Advanced'];
const MODULE_TYPES = ['VIDEO', 'PDF', 'DOC', 'IMAGE', 'LINK', 'TEXT'];
const LEVEL_COLORS: Record<string, string> = { Beginner: '#16a34a', Intermediate: '#f97316', Advanced: '#ef4444' };

const TYPE_META: Record<string, { icon: React.ReactNode; label: string; color: string; accept: string }> = {
  VIDEO: { icon: <Film size={13} />,      label: 'Video',    color: '#7c3aed', accept: 'video/mp4,video/webm,video/ogg,video/quicktime' },
  PDF:   { icon: <FileText size={13} />,  label: 'PDF',      color: '#ef4444', accept: 'application/pdf' },
  DOC:   { icon: <File size={13} />,      label: 'Document', color: '#f97316', accept: '.doc,.docx,.ppt,.pptx,.xls,.xlsx,.txt,.csv' },
  IMAGE: { icon: <ImageIcon size={13} />, label: 'Image',    color: '#0891b2', accept: 'image/*' },
  LINK:  { icon: <Link size={13} />,      label: 'Link',     color: '#2145fb', accept: '' },
  TEXT:  { icon: <FileText size={13} />,  label: 'Text',     color: '#64748b', accept: '' },
};

const inp: React.CSSProperties = { display: 'block', width: '100%', padding: '9px 12px', border: '1.5px solid #e2e8f0', borderRadius: '8px', fontSize: '13px', fontFamily: "'Poppins',sans-serif", color: '#0b0d20', background: '#f8faff', outline: 'none', boxSizing: 'border-box' as const };
const lbl: React.CSSProperties = { display: 'block', fontSize: '10px', fontWeight: 600, color: '#64748b', textTransform: 'uppercase' as const, letterSpacing: '0.4px', marginBottom: '5px' };

/* ── FileUploadZone ─────────────────────────────────────────────────── */
function FileUploadZone({ accept, onFile, preview }: { accept: string; onFile: (f: File) => void; preview?: string | null }) {
  const ref = useRef<HTMLInputElement>(null);
  const [drag, setDrag] = useState(false);
  const [name, setName] = useState('');

  const handle = (f: File | undefined) => {
    if (!f) return;
    setName(f.name);
    onFile(f);
  };

  return (
    <div
      onDragOver={e => { e.preventDefault(); setDrag(true); }}
      onDragLeave={() => setDrag(false)}
      onDrop={e => { e.preventDefault(); setDrag(false); handle(e.dataTransfer.files[0]); }}
      onClick={() => ref.current?.click()}
      style={{ border: `2px dashed ${drag ? '#2145fb' : '#d1d5db'}`, borderRadius: 10, padding: 16, background: drag ? '#eff3ff' : '#f8faff', cursor: 'pointer', textAlign: 'center', transition: 'all 0.15s' }}
    >
      {preview && (
        <img src={preview} alt="" style={{ maxHeight: 80, maxWidth: '100%', borderRadius: 6, marginBottom: 8, objectFit: 'cover', display: 'block', margin: '0 auto 8px' }} />
      )}
      <Upload size={18} color="#94a3b8" style={{ margin: '0 auto 6px', display: 'block' }} />
      <div style={{ fontSize: 12, color: name ? '#0b0d20' : '#94a3b8', fontWeight: name ? 600 : 400 }}>{name || 'Click or drag & drop to upload'}</div>
      <input ref={ref} type="file" accept={accept} style={{ display: 'none' }} onChange={e => handle(e.target.files?.[0])} />
    </div>
  );
}

/* ── AddModuleModal ─────────────────────────────────────────────────── */
function AddModuleModal({ courseId, onDone, onClose, existingCount }: {
  courseId: string; onDone: () => void; onClose: () => void; existingCount: number;
}) {
  const [form, setForm] = useState(BLANK_MODULE);
  const [file, setFile] = useState<File | null>(null);
  const [imgPreview, setImgPreview] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  const needsFile = ['VIDEO', 'PDF', 'DOC', 'IMAGE'].includes(form.type);

  const handleFile = (f: File) => {
    setFile(f);
    if (f.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = () => setImgPreview(reader.result as string);
      reader.readAsDataURL(f);
    } else {
      setImgPreview(null);
    }
  };

  const handleSave = async () => {
    if (!form.title.trim()) { setError('Title is required'); return; }
    setError('');
    setSaving(true);
    let url = form.url;

    if (file && needsFile) {
      setUploading(true);
      const fd = new FormData();
      fd.append('file', file);
      const res = await fetch('/api/admin/upload', { method: 'POST', body: fd });
      const json = await res.json();
      setUploading(false);
      if (!res.ok) { setError(json.error ?? 'Upload failed'); setSaving(false); return; }
      url = json.url;
    }

    const r = await fetch('/api/admin/courses/modules', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        courseId, title: form.title, type: form.type,
        url: url || null, content: form.content || null, sortOrder: existingCount,
      }),
    });
    setSaving(false);
    if (r.ok) { onDone(); } else { setError('Failed to save module'); }
  };

  const meta = TYPE_META[form.type];

  return (
    <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.55)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000, padding: 24 }}>
      <div style={{ background: '#fff', borderRadius: 20, padding: 32, width: '100%', maxWidth: 560, maxHeight: '90vh', overflowY: 'auto', boxShadow: '0 24px 64px rgba(0,0,0,0.22)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
          <h2 style={{ fontSize: 18, fontWeight: 800, color: '#0b0d20' }}>Add Content Module</h2>
          <button onClick={onClose} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#94a3b8' }}><X size={18} /></button>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <div><label style={lbl}>Module Title *</label><input style={inp} placeholder="e.g. Introduction to the Course" value={form.title} onChange={e => setForm(f => ({ ...f, title: e.target.value }))} /></div>

          {/* Type selector */}
          <div>
            <label style={lbl}>Content Type</label>
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
              {MODULE_TYPES.map(t => {
                const m = TYPE_META[t];
                const active = form.type === t;
                return (
                  <button key={t} type="button"
                    onClick={() => { setForm(f => ({ ...f, type: t, url: '', content: '' })); setFile(null); setImgPreview(null); }}
                    style={{ display: 'flex', alignItems: 'center', gap: 5, padding: '7px 12px', border: `1.5px solid ${active ? m.color : '#e2e8f0'}`, borderRadius: 8, background: active ? `${m.color}18` : '#fff', color: active ? m.color : '#64748b', fontSize: 12, fontWeight: active ? 700 : 500, cursor: 'pointer', fontFamily: "'Poppins',sans-serif" }}
                  >
                    {m.icon} {m.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Upload zone for file-based types */}
          {needsFile && (
            <div>
              <label style={lbl}>Upload File</label>
              <FileUploadZone accept={meta.accept} onFile={handleFile} preview={imgPreview} />
              {file && <div style={{ fontSize: 11, color: '#64748b', marginTop: 5 }}>📎 {file.name} · {(file.size / 1024 / 1024).toFixed(2)} MB</div>}
              <div style={{ marginTop: 10 }}>
                <label style={{ ...lbl, textTransform: 'none' as const, fontSize: 11, color: '#94a3b8' }}>Or paste a direct URL</label>
                <input style={{ ...inp, fontSize: 12 }} placeholder="https://…" value={form.url} onChange={e => setForm(f => ({ ...f, url: e.target.value }))} />
              </div>
            </div>
          )}

          {form.type === 'LINK' && (
            <div><label style={lbl}>External URL *</label><input style={inp} placeholder="https://youtube.com/watch?v=…" value={form.url} onChange={e => setForm(f => ({ ...f, url: e.target.value }))} /></div>
          )}

          {form.type === 'TEXT' && (
            <div><label style={lbl}>Content (text or HTML)</label><textarea style={{ ...inp, minHeight: 120, resize: 'vertical' as const }} placeholder="Write content here…" value={form.content} onChange={e => setForm(f => ({ ...f, content: e.target.value }))} /></div>
          )}

          {/* Optional description for non-text types */}
          {form.type !== 'TEXT' && (
            <div><label style={lbl}>Description / Notes (optional)</label><textarea style={{ ...inp, minHeight: 60, resize: 'vertical' as const }} placeholder="Brief description of this module…" value={form.content} onChange={e => setForm(f => ({ ...f, content: e.target.value }))} /></div>
          )}

          {error && <div style={{ fontSize: 12, color: '#ef4444', fontWeight: 600, background: '#fef2f2', padding: '8px 12px', borderRadius: 8 }}>{error}</div>}
        </div>

        <div style={{ display: 'flex', gap: 10, justifyContent: 'flex-end', marginTop: 24 }}>
          <button onClick={onClose} style={{ padding: '10px 20px', background: '#f1f5f9', color: '#374151', border: 'none', borderRadius: 10, fontSize: 13, fontWeight: 600, cursor: 'pointer', fontFamily: "'Poppins',sans-serif" }}>Cancel</button>
          <button onClick={handleSave} disabled={saving || uploading}
            style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '10px 24px', background: '#2145fb', color: '#fff', border: 'none', borderRadius: 10, fontSize: 13, fontWeight: 600, cursor: 'pointer', fontFamily: "'Poppins',sans-serif", opacity: (saving || uploading) ? 0.6 : 1 }}>
            {(uploading || saving)
              ? <><Loader size={13} style={{ animation: 'spin 1s linear infinite' }} /> {uploading ? 'Uploading…' : 'Saving…'}</>
              : <><Save size={13} /> Add Module</>}
          </button>
        </div>
      </div>
      <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
    </div>
  );
}

/* ── ModuleRow ──────────────────────────────────────────────────────── */
function ModuleRow({ mod, onDelete }: { mod: CourseModule; onDelete: () => void }) {
  const meta = TYPE_META[mod.type] ?? TYPE_META.DOC;
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '10px 14px', background: '#fff', borderRadius: 9, border: '1px solid #eef0f6' }}>
      <div style={{ width: 30, height: 30, borderRadius: 8, background: `${meta.color}18`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: meta.color, flexShrink: 0 }}>{meta.icon}</div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontSize: 13, fontWeight: 600, color: '#0b0d20', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{mod.title}</div>
        {mod.url && (
          <a href={mod.url} target="_blank" rel="noreferrer"
            style={{ fontSize: 11, color: '#2145fb', textDecoration: 'none', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', display: 'block' }}>
            {mod.url.length > 60 ? mod.url.slice(0, 60) + '…' : mod.url}
          </a>
        )}
        {mod.content && !mod.url && (
          <div style={{ fontSize: 11, color: '#64748b', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{mod.content.slice(0, 70)}{mod.content.length > 70 ? '…' : ''}</div>
        )}
      </div>
      <span style={{ fontSize: 10, fontWeight: 700, padding: '2px 8px', borderRadius: '999px', background: `${meta.color}18`, color: meta.color, flexShrink: 0, whiteSpace: 'nowrap' }}>{meta.label}</span>
      <button onClick={onDelete}
        style={{ display: 'flex', alignItems: 'center', padding: '5px 8px', background: '#fef2f2', color: '#ef4444', border: 'none', borderRadius: 7, cursor: 'pointer', flexShrink: 0 }}>
        <Trash2 size={11} />
      </button>
    </div>
  );
}

/* ── CourseCard ─────────────────────────────────────────────────────── */
function CourseCard({ course, onEdit, onDelete }: { course: Course; onEdit: () => void; onDelete: () => void }) {
  const [expanded, setExpanded] = useState(false);
  const [modules, setModules] = useState<CourseModule[]>([]);
  const [loadingMods, setLoadingMods] = useState(false);
  const [addingModule, setAddingModule] = useState(false);

  const loadModules = async () => {
    setLoadingMods(true);
    const r = await fetch(`/api/admin/courses/modules?courseId=${course.id}`);
    if (r.ok) setModules(await r.json());
    setLoadingMods(false);
  };

  const toggleExpand = () => {
    if (!expanded) loadModules();
    setExpanded(v => !v);
  };

  const deleteModule = async (id: string) => {
    await fetch('/api/admin/courses/modules', { method: 'DELETE', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ id }) });
    setModules(prev => prev.filter(m => m.id !== id));
  };

  return (
    <div style={{ background: '#fff', border: '1px solid #eef0f6', borderRadius: 14, overflow: 'hidden', boxShadow: '0 1px 4px rgba(0,0,0,.04)' }}>
      <div style={{ padding: 20 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12 }}>
          <div style={{ width: 36, height: 36, borderRadius: 10, background: '#eff6ff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <BookOpen size={16} color="#2145fb" />
          </div>
          <div style={{ display: 'flex', gap: 6 }}>
            <button onClick={onEdit} style={{ display: 'flex', alignItems: 'center', gap: 4, padding: '5px 9px', background: '#eff6ff', color: '#2145fb', border: 'none', borderRadius: 6, fontSize: 11, cursor: 'pointer', fontWeight: 600, fontFamily: "'Poppins',sans-serif" }}><Pencil size={10} /> Edit</button>
            <button onClick={onDelete} style={{ display: 'flex', alignItems: 'center', gap: 4, padding: '5px 9px', background: '#fef2f2', color: '#ef4444', border: 'none', borderRadius: 6, fontSize: 11, cursor: 'pointer', fontWeight: 600, fontFamily: "'Poppins',sans-serif" }}><Trash2 size={10} /></button>
          </div>
        </div>

        <div style={{ fontWeight: 700, fontSize: 14, color: '#0b0d20', marginBottom: 6 }}>{course.title}</div>
        <div style={{ fontSize: 12, color: '#64748b', marginBottom: 12, lineHeight: 1.5 }}>
          {(course.description?.length ?? 0) > 90 ? course.description.slice(0, 90) + '…' : course.description}
        </div>
        <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginBottom: 14 }}>
          <span style={{ fontSize: 10, padding: '2px 8px', borderRadius: '999px', background: '#f1f5f9', color: '#475569', fontWeight: 600 }}>{course.category}</span>
          <span style={{ fontSize: 10, padding: '2px 8px', borderRadius: '999px', background: '#f0fdf4', color: LEVEL_COLORS[course.level] ?? '#16a34a', fontWeight: 600 }}>{course.level}</span>
          {course.duration && <span style={{ fontSize: 10, padding: '2px 8px', borderRadius: '999px', background: '#eff6ff', color: '#2145fb', fontWeight: 600 }}>{course.duration}</span>}
        </div>

        {/* Content toggle */}
        <button onClick={toggleExpand}
          style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%', padding: '8px 12px', background: expanded ? '#eff6ff' : '#f8faff', border: '1px solid #e2e8f0', borderRadius: 9, fontSize: 12, fontWeight: 600, color: expanded ? '#2145fb' : '#64748b', cursor: 'pointer', fontFamily: "'Poppins',sans-serif' " }}>
          <span>📁 Course Content</span>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            {expanded && modules.length > 0 && (
              <span style={{ fontSize: 11, background: '#2145fb', color: '#fff', borderRadius: '999px', padding: '1px 7px' }}>{modules.length}</span>
            )}
            {expanded ? <ChevronUp size={13} /> : <ChevronDown size={13} />}
          </div>
        </button>
      </div>

      {/* Modules panel */}
      {expanded && (
        <div style={{ background: '#f8faff', borderTop: '1px solid #eef0f6', padding: 16 }}>
          {loadingMods ? (
            <div style={{ textAlign: 'center', padding: 16, color: '#94a3b8', fontSize: 13 }}>
              <Loader size={16} style={{ animation: 'spin 1s linear infinite', display: 'inline-block', marginRight: 6 }} />Loading…
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {modules.length === 0 && (
                <div style={{ fontSize: 12, color: '#94a3b8', textAlign: 'center', padding: '8px 0 4px' }}>No content yet — add videos, PDFs, docs, or links below.</div>
              )}
              {modules.map(m => <ModuleRow key={m.id} mod={m} onDelete={() => deleteModule(m.id)} />)}
              <button onClick={() => setAddingModule(true)}
                style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6, padding: '9px', background: '#fff', border: '1.5px dashed #2145fb', borderRadius: 9, fontSize: 12, fontWeight: 600, color: '#2145fb', cursor: 'pointer', fontFamily: "'Poppins',sans-serif", marginTop: 4 }}>
                <Plus size={13} /> Add Content Module
              </button>
            </div>
          )}
        </div>
      )}

      {addingModule && (
        <AddModuleModal
          courseId={course.id}
          existingCount={modules.length}
          onDone={() => { setAddingModule(false); loadModules(); }}
          onClose={() => setAddingModule(false)}
        />
      )}
    </div>
  );
}

/* ── Main Page ──────────────────────────────────────────────────────── */
export default function AdminCourses() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [modal, setModal] = useState<'add' | 'edit' | null>(null);
  const [editing, setEditing] = useState<Course | null>(null);
  const [form, setForm] = useState(BLANK_COURSE);
  const [loading, setLoading] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [status, setStatus] = useState('');

  const load = () => fetch('/api/admin/courses').then(r => r.json()).then(setCourses).catch(() => {});
  useEffect(() => { load(); }, []);

  const openAdd = () => { setForm(BLANK_COURSE); setModal('add'); };
  const openEdit = (c: Course) => { setEditing(c); setForm({ title: c.title, category: c.category, level: c.level, duration: c.duration, description: c.description }); setModal('edit'); };
  const close = () => { setModal(null); setEditing(null); };

  const handleSave = async () => {
    setLoading(true);
    const method = modal === 'add' ? 'POST' : 'PUT';
    const body = modal === 'edit' ? { id: editing!.id, ...form } : form;
    const r = await fetch('/api/admin/courses', { method, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) });
    if (r.ok) { await load(); close(); setStatus('Saved!'); setTimeout(() => setStatus(''), 2500); }
    setLoading(false);
  };

  const handleDelete = async (id: string) => {
    await fetch('/api/admin/courses', { method: 'DELETE', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ id }) });
    await load();
    setDeleteId(null);
  };

  return (
    <div className="adm-page" style={{ padding: '32px' }}>
      <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>

      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 24 }}>
        <div>
          <h1 style={{ fontSize: 22, fontWeight: 900, color: '#0b0d20', marginBottom: 2 }}>Courses</h1>
          <p style={{ fontSize: 13, color: '#64748b' }}>{courses.length} courses · expand any card to add videos, PDFs, docs, images & links</p>
        </div>
        <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
          {status && <span style={{ fontSize: 12, color: '#16a34a', fontWeight: 600 }}>✓ {status}</span>}
          <button onClick={openAdd}
            style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '10px 18px', background: '#2145fb', color: '#fff', border: 'none', borderRadius: 10, fontSize: 13, fontWeight: 600, cursor: 'pointer', fontFamily: "'Poppins',sans-serif" }}>
            <Plus size={14} /> Add Course
          </button>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(320px,1fr))', gap: 16 }}>
        {courses.map(c => (
          <CourseCard key={c.id} course={c} onEdit={() => openEdit(c)} onDelete={() => setDeleteId(c.id)} />
        ))}
        {courses.length === 0 && (
          <div style={{ gridColumn: '1/-1', textAlign: 'center', padding: 48, color: '#94a3b8', fontSize: 14 }}>
            No courses yet. Click "Add Course" to create one.
          </div>
        )}
      </div>

      {/* Add/Edit Course Modal */}
      {modal && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 999, padding: 24 }}>
          <div style={{ background: '#fff', borderRadius: 20, padding: 32, width: '100%', maxWidth: 580, maxHeight: '90vh', overflowY: 'auto', boxShadow: '0 24px 64px rgba(0,0,0,0.2)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
              <h2 style={{ fontSize: 18, fontWeight: 800, color: '#0b0d20' }}>{modal === 'add' ? 'Add New Course' : 'Edit Course'}</h2>
              <button onClick={close} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#94a3b8' }}><X size={18} /></button>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              <div><label style={lbl}>Course Title *</label><input style={inp} placeholder="e.g. Interview Mastery Programme" value={form.title} onChange={e => setForm(f => ({ ...f, title: e.target.value }))} /></div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                <div><label style={lbl}>Category</label><select style={{ ...inp, cursor: 'pointer' }} value={form.category} onChange={e => setForm(f => ({ ...f, category: e.target.value }))}>{CATEGORIES.map(c => <option key={c}>{c}</option>)}</select></div>
                <div><label style={lbl}>Level</label><select style={{ ...inp, cursor: 'pointer' }} value={form.level} onChange={e => setForm(f => ({ ...f, level: e.target.value }))}>{LEVELS.map(l => <option key={l}>{l}</option>)}</select></div>
              </div>
              <div><label style={lbl}>Duration</label><input style={inp} placeholder="e.g. 3 hrs · 6 sessions" value={form.duration} onChange={e => setForm(f => ({ ...f, duration: e.target.value }))} /></div>
              <div><label style={lbl}>Description</label><textarea style={{ ...inp, resize: 'vertical' as const, minHeight: 90 }} placeholder="What will candidates learn?" value={form.description} onChange={e => setForm(f => ({ ...f, description: e.target.value }))} /></div>
            </div>
            <div style={{ display: 'flex', gap: 10, justifyContent: 'flex-end', marginTop: 24 }}>
              <button onClick={close} style={{ padding: '10px 20px', background: '#f1f5f9', color: '#374151', border: 'none', borderRadius: 10, fontSize: 13, fontWeight: 600, cursor: 'pointer', fontFamily: "'Poppins',sans-serif" }}>Cancel</button>
              <button onClick={handleSave} disabled={loading || !form.title}
                style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '10px 24px', background: '#2145fb', color: '#fff', border: 'none', borderRadius: 10, fontSize: 13, fontWeight: 600, cursor: 'pointer', fontFamily: "'Poppins',sans-serif", opacity: loading ? 0.6 : 1 }}>
                <Save size={13} /> {loading ? 'Saving…' : modal === 'add' ? 'Add Course' : 'Save Changes'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirm */}
      {deleteId && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 999 }}>
          <div style={{ background: '#fff', borderRadius: 16, padding: 28, maxWidth: 380, width: '90%', textAlign: 'center', boxShadow: '0 24px 64px rgba(0,0,0,0.2)' }}>
            <div style={{ width: 44, height: 44, borderRadius: '50%', background: '#fef2f2', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px' }}><Trash2 size={20} color="#ef4444" /></div>
            <div style={{ fontSize: 16, fontWeight: 700, color: '#0b0d20', marginBottom: 8 }}>Delete this course?</div>
            <div style={{ fontSize: 13, color: '#64748b', marginBottom: 24 }}>All content modules will also be deleted. This cannot be undone.</div>
            <div style={{ display: 'flex', gap: 10, justifyContent: 'center' }}>
              <button onClick={() => setDeleteId(null)} style={{ padding: '9px 20px', background: '#f1f5f9', border: 'none', borderRadius: 9, fontSize: 13, fontWeight: 600, cursor: 'pointer', color: '#374151', fontFamily: "'Poppins',sans-serif" }}>Cancel</button>
              <button onClick={() => handleDelete(deleteId)} style={{ padding: '9px 20px', background: '#ef4444', color: '#fff', border: 'none', borderRadius: 9, fontSize: 13, fontWeight: 600, cursor: 'pointer', fontFamily: "'Poppins',sans-serif" }}>Yes, Delete</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
