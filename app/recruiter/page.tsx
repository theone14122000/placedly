'use client';
import { useEffect, useState, useRef } from 'react';
import {
  Phone, FileText, Plus, X, Download, Search,
  Check, AlertCircle, ArrowLeft, MessageSquare,
  ClipboardList, Gift, ExternalLink,
} from 'lucide-react';

type Note = { id: string; content: string; type: string; authorName: string; createdAt: string };
type App  = {
  id: string; name: string; email: string; phone: string; role: string;
  currentStage: string; currentStatus: string; resumeUrl: string | null;
  recruiter: { name: string } | null; notes: Note[]; createdAt: string;
};

const STAGES = ['SCREENING', 'TECHNICAL', 'MANAGER', 'OFFER'];
const STAGE_LABELS: Record<string, string> = {
  SCREENING: 'Stage 1 — Screening',
  TECHNICAL: 'Stage 2 — Technical Round',
  MANAGER:   'Stage 3 — Manager Round',
  OFFER:     'Stage 4 — CTC / Offer',
};
const STAGE_ACTIONS: Record<string, string[]> = {
  SCREENING: ['PENDING', 'SELECTED', 'REJECTED'],
  TECHNICAL: ['PENDING', 'SELECTED', 'HOLD', 'REJECTED'],
  MANAGER:   ['PENDING', 'SELECTED', 'HOLD', 'REJECTED'],
  OFFER:     ['OFFER_DISCUSSED', 'OFFER_ACCEPTED', 'DECLINED', 'DROPPED', 'JOINED'],
};
const STATUS_COLOR: Record<string, { bg: string; color: string }> = {
  PENDING:         { bg: '#fef9c3', color: '#854d0e' },
  SELECTED:        { bg: '#dcfce7', color: '#166534' },
  REJECTED:        { bg: '#fee2e2', color: '#991b1b' },
  HOLD:            { bg: '#ede9fe', color: '#5b21b6' },
  OFFER_DISCUSSED: { bg: '#dbeafe', color: '#1e40af' },
  OFFER_ACCEPTED:  { bg: '#d1fae5', color: '#065f46' },
  DECLINED:        { bg: '#fee2e2', color: '#991b1b' },
  DROPPED:         { bg: '#f1f5f9', color: '#475569' },
  JOINED:          { bg: '#ecfdf5', color: '#065f46' },
};

const pill = (s: string) => {
  const c = STATUS_COLOR[s] ?? { bg: '#f1f5f9', color: '#475569' };
  return (
    <span style={{ padding: '2px 8px', borderRadius: '999px', fontSize: '10px', fontWeight: 700, background: c.bg, color: c.color, whiteSpace: 'nowrap' as const }}>
      {s.replace(/_/g, ' ')}
    </span>
  );
};

/* ── Resume Drawer ───────────────────────────────────────────────────── */
function ResumeDrawer({ url, name, onClose }: { url: string; name: string; onClose: () => void }) {
  // Try to make Google Drive links embeddable
  const embedUrl = url.includes('drive.google.com/file/d/')
    ? url.replace('/view', '/preview').replace('/edit', '/preview')
    : url.includes('docs.google.com')
    ? url.replace('/edit', '/preview')
    : url;

  return (
    <div className="ats-resume-drawer" style={{
      position: 'fixed', top: 52, right: 0, bottom: 0,
      width: 'clamp(320px, 50vw, 760px)',
      background: '#fff',
      borderLeft: '1px solid #e2e8f0',
      zIndex: 300,
      display: 'flex', flexDirection: 'column',
      boxShadow: '-8px 0 32px rgba(0,0,0,0.12)',
      animation: 'slideInRight 0.2s ease',
    }}>
      <style>{`@keyframes slideInRight{from{transform:translateX(100%);opacity:0}to{transform:translateX(0);opacity:1}}`}</style>

      {/* Header */}
      <div style={{ padding: '14px 20px', borderBottom: '1px solid #e2e8f0', display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: '#f8faff', flexShrink: 0 }}>
        <div>
          <div style={{ fontSize: 13, fontWeight: 700, color: '#0b0d20' }}>📄 Resume — {name}</div>
          <div style={{ fontSize: 11, color: '#94a3b8', marginTop: 2 }}>If resume doesn't load, open in new tab</div>
        </div>
        <div style={{ display: 'flex', gap: 8 }}>
          <a href={url} target="_blank" rel="noreferrer"
            style={{ display: 'flex', alignItems: 'center', gap: 5, padding: '6px 12px', background: '#eff6ff', border: '1px solid #bfdbfe', borderRadius: 8, fontSize: 12, fontWeight: 600, color: '#2145fb', textDecoration: 'none' }}>
            <ExternalLink size={12} /> Open Tab
          </a>
          <button onClick={onClose}
            style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#94a3b8', padding: 4, display: 'flex' }}>
            <X size={18} />
          </button>
        </div>
      </div>

      {/* iframe viewer */}
      <iframe
        src={embedUrl}
        style={{ flex: 1, border: 'none', width: '100%' }}
        title="Resume"
        allow="autoplay"
      />
    </div>
  );
}

/* ── Candidate Row ───────────────────────────────────────────────────── */
function CandidateRow({ app, selected, onClick }: { app: App; selected: boolean; onClick: () => void }) {
  return (
    <div onClick={onClick}
      style={{ padding: '12px 16px', borderBottom: '1px solid #f8faff', cursor: 'pointer', background: selected ? '#eff6ff' : '#fff', borderLeft: `3px solid ${selected ? '#2145fb' : 'transparent'}`, transition: '0.1s' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 4 }}>
        <div style={{ fontSize: 14, fontWeight: 700, color: '#0b0d20' }}>{app.name}</div>
        <span style={{ fontSize: 10, fontWeight: 700, padding: '2px 7px', borderRadius: '999px', background: app.role === 'AP' ? '#dbeafe' : '#fef3c7', color: app.role === 'AP' ? '#1e40af' : '#92400e', flexShrink: 0 }}>{app.role}</span>
      </div>
      <div style={{ fontSize: 12, color: '#64748b', marginBottom: 5 }}>{app.phone}</div>
      <div style={{ display: 'flex', gap: 6, alignItems: 'center', flexWrap: 'wrap' as const }}>
        <span style={{ fontSize: 10, color: '#94a3b8' }}>{app.currentStage}</span>
        {pill(app.currentStatus)}
      </div>
    </div>
  );
}

/* ── Main ────────────────────────────────────────────────────────────── */
export default function RecruiterATS() {
  const [apps, setApps]           = useState<App[]>([]);
  const [selected, setSelected]   = useState<App | null>(null);
  const [notes, setNotes]         = useState<Note[]>([]);
  const [leftTab, setLeftTab]     = useState<'applications' | 'notes' | 'offer'>('applications');
  const [roleFilter, setRoleFilter]   = useState('');
  const [stageFilter, setStageFilter] = useState('');
  const [q, setQ]                 = useState('');
  const [noteText, setNoteText]   = useState('');
  const [noteType, setNoteType]   = useState('CALL');
  const [showAdd, setShowAdd]     = useState(false);
  const [showResume, setShowResume] = useState(false);
  const [busy, setBusy]           = useState(false);
  const [addForm, setAddForm]     = useState({ name: '', email: '', phone: '', role: 'AP', resumeUrl: '' });
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [resumeUploading, setResumeUploading] = useState(false);
  const noteRef = useRef<HTMLTextAreaElement>(null);

  const fetchApps = async () => {
    const params = new URLSearchParams();
    if (roleFilter)  params.set('role', roleFilter);
    if (stageFilter) params.set('stage', stageFilter);
    if (q)           params.set('q', q);
    const r = await fetch(`/api/recruiter/applications?${params}`);
    const data = await r.json();
    setApps(Array.isArray(data) ? data : []);
  };

  const fetchNotes = async (id: string) => {
    const r = await fetch(`/api/recruiter/applications/${id}/notes`);
    setNotes(await r.json());
  };

  useEffect(() => { fetchApps(); }, [roleFilter, stageFilter, q]);

  const selectApp = (app: App) => {
    setSelected(app);
    setShowResume(false);
    fetchNotes(app.id);
  };

  const updateStage = async (stage: string, status: string) => {
    if (!selected) return;
    setBusy(true);
    const r = await fetch(`/api/recruiter/applications/${selected.id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ stage, status }),
    });
    const updated = await r.json();
    setSelected(updated);
    setApps(a => a.map(x => x.id === updated.id ? { ...x, currentStage: updated.currentStage, currentStatus: updated.currentStatus } : x));
    setBusy(false);
  };

  const saveNote = async () => {
    if (!selected || !noteText.trim()) return;
    setBusy(true);
    await fetch(`/api/recruiter/applications/${selected.id}/notes`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ content: noteText, type: noteType }),
    });
    setNoteText('');
    fetchNotes(selected.id);
    setBusy(false);
  };

  const addApplication = async () => {
    if (!addForm.name || !addForm.email || !addForm.phone) return;
    setBusy(true);
    let resumeUrl = addForm.resumeUrl;
    if (resumeFile) {
      setResumeUploading(true);
      const fd = new FormData();
      fd.append('file', resumeFile);
      const r = await fetch('/api/admin/upload', { method: 'POST', body: fd });
      if (r.ok) { const j = await r.json(); resumeUrl = j.url; }
      setResumeUploading(false);
    }
    await fetch('/api/recruiter/applications', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...addForm, resumeUrl }),
    });
    setShowAdd(false);
    setAddForm({ name: '', email: '', phone: '', role: 'AP', resumeUrl: '' });
    setResumeFile(null);
    fetchApps();
    setBusy(false);
  };

  // Data for each tab
  const offerApps = apps.filter(a => a.currentStage === 'OFFER');
  // For Notes tab: all apps that have notes (approximate — show all, notes loaded on select)
  const displayApps = leftTab === 'offer' ? offerApps : apps;

  /* ── Left panel tab button ─────────────────────────────────────────── */
  const TabBtn = ({ id, label, icon, count }: { id: typeof leftTab; label: string; icon: React.ReactNode; count?: number }) => (
    <button
      onClick={() => setLeftTab(id)}
      style={{
        flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 5,
        padding: '10px 4px', background: leftTab === id ? '#fff' : 'transparent',
        border: 'none', borderBottom: `2px solid ${leftTab === id ? '#2145fb' : 'transparent'}`,
        color: leftTab === id ? '#2145fb' : '#94a3b8', fontSize: 11, fontWeight: 700,
        cursor: 'pointer', fontFamily: "'Poppins',sans-serif", transition: '0.15s', whiteSpace: 'nowrap' as const,
      }}
    >
      {icon} {label}
      {count !== undefined && count > 0 && (
        <span style={{ background: leftTab === id ? '#2145fb' : '#e2e8f0', color: leftTab === id ? '#fff' : '#64748b', borderRadius: '999px', fontSize: 10, fontWeight: 700, padding: '1px 6px' }}>{count}</span>
      )}
    </button>
  );

  return (
    <>
      <div className="ats-root">

        {/* ══ LEFT PANEL ══════════════════════════════════════════════════ */}
        <div className={`ats-left${selected ? ' hidden' : ''}`}>

          {/* Tabs */}
          <div className="ats-tab-strip" style={{ display: 'flex', borderBottom: '1px solid #e2e8f0', background: '#f8faff', flexShrink: 0 }}>
            <TabBtn id="applications" label="Applications" icon={<ClipboardList size={13} />} count={apps.length} />
            <TabBtn id="notes"        label="Notes"        icon={<MessageSquare size={13} />} />
            <TabBtn id="offer"        label="Offer Stage"  icon={<Gift size={13} />}          count={offerApps.length} />
          </div>

          {/* Search + filters (Applications & Offer tabs) */}
          {leftTab !== 'notes' && (
            <div style={{ padding: '12px 14px', borderBottom: '1px solid #f1f5f9', flexShrink: 0 }}>
              <div style={{ display: 'flex', gap: 8, marginBottom: 8 }}>
                <div style={{ flex: 1, display: 'flex', alignItems: 'center', gap: 6, background: '#f8faff', border: '1px solid #e2e8f0', borderRadius: 8, padding: '7px 10px' }}>
                  <Search size={13} color="#94a3b8" />
                  <input value={q} onChange={e => setQ(e.target.value)} placeholder="Search name, email, phone…"
                    style={{ border: 'none', background: 'none', outline: 'none', fontSize: 13, fontFamily: "'Poppins',sans-serif", color: '#0b0d20', width: '100%' }} />
                </div>
                <button onClick={() => setShowAdd(true)}
                  style={{ display: 'flex', alignItems: 'center', gap: 4, padding: '7px 12px', background: '#2145fb', color: '#fff', border: 'none', borderRadius: 8, fontSize: 12, fontWeight: 700, cursor: 'pointer', fontFamily: "'Poppins',sans-serif", whiteSpace: 'nowrap' as const }}>
                  <Plus size={13} /> Add
                </button>
              </div>
              <div style={{ display: 'flex', gap: 6 }}>
                <select value={roleFilter} onChange={e => setRoleFilter(e.target.value)}
                  style={{ flex: 1, padding: '6px 8px', borderRadius: 7, border: '1px solid #e2e8f0', fontSize: 12, fontFamily: "'Poppins',sans-serif", background: '#f8faff', color: '#475569' }}>
                  <option value="">All Roles</option>
                  <option value="AP">AP</option>
                  <option value="R2R">R2R</option>
                </select>
                {leftTab === 'applications' && (
                  <select value={stageFilter} onChange={e => setStageFilter(e.target.value)}
                    style={{ flex: 1, padding: '6px 8px', borderRadius: 7, border: '1px solid #e2e8f0', fontSize: 12, fontFamily: "'Poppins',sans-serif", background: '#f8faff', color: '#475569' }}>
                    <option value="">All Stages</option>
                    {STAGES.map(s => <option key={s} value={s}>{s}</option>)}
                  </select>
                )}
              </div>
            </div>
          )}

          {/* ── Tab: Applications ───────────────────────────────────────── */}
          {leftTab !== 'notes' && (
            <div style={{ flex: 1, overflowY: 'auto' }}>
              {displayApps.length === 0 ? (
                <div style={{ padding: '40px 20px', textAlign: 'center', color: '#94a3b8', fontSize: 13 }}>
                  {leftTab === 'offer' ? 'No candidates in Offer stage yet.' : 'No applications found.'}
                </div>
              ) : displayApps.map(app => (
                <CandidateRow key={app.id} app={app} selected={selected?.id === app.id} onClick={() => selectApp(app)} />
              ))}
            </div>
          )}

          {/* ── Tab: Notes ──────────────────────────────────────────────── */}
          {leftTab === 'notes' && (
            <div style={{ flex: 1, overflowY: 'auto' }}>
              <div style={{ padding: '10px 14px', borderBottom: '1px solid #f1f5f9', background: '#fffbeb', flexShrink: 0 }}>
                <div style={{ fontSize: 11, color: '#92400e', fontWeight: 600 }}>
                  📝 Click a candidate to add or view their notes
                </div>
              </div>
              {apps.length === 0 ? (
                <div style={{ padding: '40px 20px', textAlign: 'center', color: '#94a3b8', fontSize: 13 }}>No candidates yet.</div>
              ) : apps.map(app => (
                <div key={app.id} onClick={() => selectApp(app)}
                  style={{ padding: '12px 16px', borderBottom: '1px solid #f8faff', cursor: 'pointer', background: selected?.id === app.id ? '#eff6ff' : '#fff', borderLeft: `3px solid ${selected?.id === app.id ? '#2145fb' : 'transparent'}`, transition: '0.1s' }}>
                  <div style={{ fontSize: 13, fontWeight: 700, color: '#0b0d20', marginBottom: 3 }}>{app.name}</div>
                  <div style={{ fontSize: 11, color: '#94a3b8' }}>{app.phone} · {app.role}</div>
                </div>
              ))}
            </div>
          )}

          {/* Export */}
          <div style={{ padding: '12px 14px', borderTop: '1px solid #f1f5f9', flexShrink: 0 }}>
            <a href="/api/recruiter/export" download
              style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6, width: '100%', padding: '9px', background: '#f8faff', border: '1px solid #e2e8f0', borderRadius: 8, fontSize: 12, fontWeight: 600, color: '#475569', textDecoration: 'none' }}>
              <Download size={13} /> Export to CSV
            </a>
          </div>
        </div>

        {/* ══ RIGHT PANEL ═════════════════════════════════════════════════ */}
        <div className={`ats-right${selected ? '' : ' hidden'}`}>
          {selected ? (
            <>
              {/* Header */}
              <div className="ats-right-header" style={{ padding: '14px 24px', background: '#fff', borderBottom: '1px solid #e2e8f0', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexShrink: 0 }}>
                <div>
                  <button className="ats-back-btn" onClick={() => { setSelected(null); setShowResume(false); }}>
                    <ArrowLeft size={14} /> Back
                  </button>
                  <div style={{ fontSize: 'clamp(15px, 2.5vw, 18px)', fontWeight: 800, color: '#0b0d20' }}>{selected.name}</div>
                  <div style={{ fontSize: 13, color: '#64748b', marginTop: 2 }}>
                    {selected.email} ·{' '}
                    <a href={`tel:${selected.phone}`} style={{ color: '#2145fb', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: 4 }}>
                      <Phone size={12} /> {selected.phone}
                    </a>
                  </div>
                </div>
                <div className="ats-right-header-actions" style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                  {selected.resumeUrl && (
                    <button
                      onClick={() => setShowResume(v => !v)}
                      style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '7px 14px', background: showResume ? '#2145fb' : '#eff6ff', border: '1px solid #bfdbfe', borderRadius: 8, fontSize: 12, fontWeight: 600, color: showResume ? '#fff' : '#2145fb', cursor: 'pointer', fontFamily: "'Poppins',sans-serif" }}>
                      <FileText size={13} /> {showResume ? 'Close Resume' : 'View Resume'}
                    </button>
                  )}
                  <button onClick={() => { setSelected(null); setShowResume(false); }} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#94a3b8', padding: 4 }}>
                    <X size={18} />
                  </button>
                </div>
              </div>

              {/* Scrollable body */}
              <div style={{ flex: 1, overflowY: 'auto', padding: 'clamp(14px,3vw,20px) clamp(16px,4vw,24px)' }}>

                {/* ── Pipeline Stage ─────────────────────────────────── */}
                <div style={{ marginBottom: 24 }}>
                  <div style={{ fontSize: 11, fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase' as const, letterSpacing: '0.5px', marginBottom: 12 }}>Pipeline Stage</div>
                  <div className="ats-stage-row" style={{ display: 'flex', gap: 8, marginBottom: 16, flexWrap: 'wrap' as const }}>
                    {STAGES.map((st, i) => (
                      <div key={st} style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                        <button onClick={() => updateStage(st, STAGE_ACTIONS[st][0])}
                          style={{ padding: '6px 14px', borderRadius: 8, fontSize: 12, fontWeight: 700, cursor: 'pointer', fontFamily: "'Poppins',sans-serif", border: `2px solid ${selected.currentStage === st ? '#2145fb' : '#e2e8f0'}`, background: selected.currentStage === st ? '#eff6ff' : '#fff', color: selected.currentStage === st ? '#2145fb' : '#94a3b8' }}>
                          {i + 1}. {st}
                        </button>
                        {i < STAGES.length - 1 && <span style={{ color: '#cbd5e1' }}>›</span>}
                      </div>
                    ))}
                  </div>

                  <div style={{ background: '#f8faff', border: '1px solid #eef0f6', borderRadius: 12, padding: 16 }}>
                    <div style={{ fontSize: 12, fontWeight: 700, color: '#64748b', marginBottom: 10 }}>{STAGE_LABELS[selected.currentStage]}</div>
                    <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' as const }}>
                      {STAGE_ACTIONS[selected.currentStage]?.map(action => {
                        const isActive = selected.currentStatus === action;
                        const c = STATUS_COLOR[action] ?? { bg: '#f1f5f9', color: '#475569' };
                        return (
                          <button key={action} disabled={busy} onClick={() => updateStage(selected.currentStage, action)}
                            style={{ display: 'flex', alignItems: 'center', gap: 5, padding: '7px 14px', borderRadius: 8, fontSize: 12, fontWeight: 700, cursor: 'pointer', fontFamily: "'Poppins',sans-serif", background: isActive ? c.bg : '#fff', color: isActive ? c.color : '#475569', border: `2px solid ${isActive ? c.color + '40' : '#e2e8f0'}`, transition: '0.1s' }}>
                            {isActive && <Check size={11} />}
                            {action.replace(/_/g, ' ')}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>

                {/* ── Add Note ───────────────────────────────────────── */}
                <div style={{ marginBottom: 24 }}>
                  <div style={{ fontSize: 11, fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase' as const, letterSpacing: '0.5px', marginBottom: 10 }}>Add Note</div>
                  <div className="ats-note-types" style={{ display: 'flex', gap: 8, marginBottom: 8 }}>
                    {[
                      { t: 'CALL',      label: '📞 Call Feedback' },
                      { t: 'INTERVIEW', label: '🧑‍💼 Interview Feedback' },
                      { t: 'GENERAL',   label: '📋 General' },
                    ].map(({ t, label }) => (
                      <button key={t} onClick={() => setNoteType(t)}
                        style={{ padding: '6px 12px', borderRadius: 7, fontSize: 11, fontWeight: 700, cursor: 'pointer', fontFamily: "'Poppins',sans-serif", background: noteType === t ? '#0b0d20' : '#fff', color: noteType === t ? '#fff' : '#64748b', border: `1.5px solid ${noteType === t ? '#0b0d20' : '#e2e8f0'}` }}>
                        {label}
                      </button>
                    ))}
                  </div>
                  <textarea ref={noteRef} value={noteText} onChange={e => setNoteText(e.target.value)}
                    placeholder={
                      noteType === 'CALL'      ? 'What was discussed on the call? Any key points, candidate response, next steps…' :
                      noteType === 'INTERVIEW' ? 'How did the interview go? Performance, strengths, concerns, interviewer feedback…' :
                                                 'Any other notes about this candidate…'
                    }
                    rows={3}
                    style={{ width: '100%', padding: '10px 12px', border: '1.5px solid #e2e8f0', borderRadius: 10, fontSize: 13, fontFamily: "'Poppins',sans-serif", resize: 'vertical' as const, outline: 'none', boxSizing: 'border-box' as const, color: '#0b0d20' }} />
                  <button className="ats-save-note" onClick={saveNote} disabled={busy || !noteText.trim()}
                    style={{ marginTop: 8, padding: '9px 22px', background: '#2145fb', color: '#fff', border: 'none', borderRadius: 8, fontSize: 13, fontWeight: 700, cursor: busy || !noteText.trim() ? 'not-allowed' : 'pointer', fontFamily: "'Poppins',sans-serif", opacity: busy ? 0.6 : 1 }}>
                    Save Note
                  </button>
                </div>

                {/* ── Notes History ──────────────────────────────────── */}
                <div>
                  <div style={{ fontSize: 11, fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase' as const, letterSpacing: '0.5px', marginBottom: 10 }}>
                    Notes History ({notes.length})
                  </div>
                  {notes.length === 0 ? (
                    <div style={{ color: '#94a3b8', fontSize: 13, fontStyle: 'italic' }}>No notes yet. Add your first note above.</div>
                  ) : notes.map(n => (
                    <div key={n.id} style={{ padding: '12px 14px', background: '#fff', border: '1px solid #eef0f6', borderRadius: 10, marginBottom: 8 }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
                        <span style={{ fontSize: 10, fontWeight: 700, padding: '2px 8px', borderRadius: '999px', background: n.type === 'CALL' ? '#dcfce7' : n.type === 'INTERVIEW' ? '#dbeafe' : '#f1f5f9', color: n.type === 'CALL' ? '#166534' : n.type === 'INTERVIEW' ? '#1e40af' : '#475569' }}>
                          {n.type === 'CALL' ? '📞' : n.type === 'INTERVIEW' ? '🧑‍💼' : '📋'} {n.type}
                        </span>
                        <span style={{ fontSize: 11, color: '#94a3b8' }}>
                          {n.authorName} · {new Date(n.createdAt).toLocaleString('en-IN', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' })}
                        </span>
                      </div>
                      <div style={{ fontSize: 13, color: '#374151', lineHeight: 1.65 }}>{n.content}</div>
                    </div>
                  ))}
                </div>
              </div>
            </>
          ) : (
            <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: 12, color: '#94a3b8', height: '100%' }}>
              <AlertCircle size={40} strokeWidth={1.5} />
              <div style={{ fontSize: 15, fontWeight: 500 }}>Select a candidate to view details</div>
            </div>
          )}
        </div>

      </div>

      {/* ── Resume Drawer (half-screen slide-in) ──────────────────────── */}
      {showResume && selected?.resumeUrl && (
        <ResumeDrawer url={selected.resumeUrl} name={selected.name} onClose={() => setShowResume(false)} />
      )}

      {/* ── Add Candidate Modal ───────────────────────────────────────── */}
      {showAdd && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', zIndex: 400, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 16 }}>
          <div style={{ background: '#fff', borderRadius: 16, padding: 'clamp(20px,5vw,28px)', width: '100%', maxWidth: 440, boxShadow: '0 20px 60px rgba(0,0,0,0.2)', maxHeight: '90vh', overflowY: 'auto' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
              <div style={{ fontSize: 17, fontWeight: 800, color: '#0b0d20' }}>Add Candidate</div>
              <button onClick={() => { setShowAdd(false); setResumeFile(null); }} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#94a3b8' }}><X size={18} /></button>
            </div>
            {[
              { label: 'Full Name *', key: 'name',  type: 'text',  ph: 'Rahul Sharma' },
              { label: 'Email *',     key: 'email', type: 'email', ph: 'rahul@email.com' },
              { label: 'Phone *',     key: 'phone', type: 'tel',   ph: '+91 98765 43210' },
            ].map(f => (
              <div key={f.key} style={{ marginBottom: 14 }}>
                <label style={{ display: 'block', fontSize: 11, fontWeight: 700, color: '#374151', textTransform: 'uppercase' as const, letterSpacing: '0.5px', marginBottom: 5 }}>{f.label}</label>
                <input type={f.type} placeholder={f.ph} value={(addForm as Record<string, string>)[f.key]}
                  onChange={e => setAddForm({ ...addForm, [f.key]: e.target.value })}
                  style={{ display: 'block', width: '100%', padding: '9px 12px', border: '1.5px solid #e2e8f0', borderRadius: 9, fontSize: 13, fontFamily: "'Poppins',sans-serif", color: '#0b0d20', outline: 'none', boxSizing: 'border-box' as const }} />
              </div>
            ))}
            <div style={{ marginBottom: 14 }}>
              <label style={{ display: 'block', fontSize: 11, fontWeight: 700, color: '#374151', textTransform: 'uppercase' as const, letterSpacing: '0.5px', marginBottom: 5 }}>Resume (PDF)</label>
              <label style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '10px 14px', border: '1.5px dashed #e2e8f0', borderRadius: 9, cursor: 'pointer', background: resumeFile ? '#f0fdf4' : '#f8faff', borderColor: resumeFile ? '#86efac' : '#e2e8f0' }}>
                <FileText size={16} color={resumeFile ? '#16a34a' : '#94a3b8'} />
                <span style={{ fontSize: 13, color: resumeFile ? '#166534' : '#94a3b8', fontFamily: "'Poppins',sans-serif", flex: 1, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' as const }}>
                  {resumeFile ? resumeFile.name : 'Click to upload PDF'}
                </span>
                {resumeFile && (
                  <button type="button" onClick={e => { e.preventDefault(); setResumeFile(null); }}
                    style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#94a3b8', padding: 0, display: 'flex' }}>
                    <X size={14} />
                  </button>
                )}
                <input type="file" accept="application/pdf" style={{ display: 'none' }}
                  onChange={e => setResumeFile(e.target.files?.[0] ?? null)} />
              </label>
              {resumeUploading && <div style={{ fontSize: 11, color: '#2145fb', marginTop: 4 }}>Uploading…</div>}
            </div>
            <div style={{ marginBottom: 20 }}>
              <label style={{ display: 'block', fontSize: 11, fontWeight: 700, color: '#374151', textTransform: 'uppercase' as const, letterSpacing: '0.5px', marginBottom: 5 }}>Role *</label>
              <div style={{ display: 'flex', gap: 10 }}>
                {['AP', 'R2R'].map(r => (
                  <button key={r} onClick={() => setAddForm({ ...addForm, role: r })}
                    style={{ flex: 1, padding: 9, borderRadius: 9, border: `2px solid ${addForm.role === r ? '#2145fb' : '#e2e8f0'}`, background: addForm.role === r ? '#eff6ff' : '#fff', color: addForm.role === r ? '#2145fb' : '#64748b', fontWeight: 700, fontSize: 14, cursor: 'pointer', fontFamily: "'Poppins',sans-serif" }}>
                    {r}
                  </button>
                ))}
              </div>
            </div>
            <button onClick={addApplication} disabled={busy}
              style={{ display: 'block', width: '100%', padding: 12, background: '#2145fb', color: '#fff', border: 'none', borderRadius: 10, fontWeight: 700, fontSize: 14, cursor: 'pointer', fontFamily: "'Poppins',sans-serif" }}>
              Add Candidate
            </button>
          </div>
        </div>
      )}
    </>
  );
}
