'use client';
import { useEffect, useRef, useState } from 'react';
import { X } from 'lucide-react';

interface Skill { id: string; name: string; category: string }

interface Props {
  value: string;       // comma-separated
  onChange: (v: string) => void;
  placeholder?: string;
}

const CAT_COLORS: Record<string, string> = {
  Tech: '#2145fb', Data: '#7c3aed', Finance: '#16a34a', Healthcare: '#0891b2',
  Sales: '#f97316', Marketing: '#db2777', Operations: '#64748b', HR: '#d97706',
  Design: '#ec4899', 'Soft Skills': '#6366f1', BPO: '#475569',
};

export default function SkillsInput({ value, onChange, placeholder = 'Search or type a skill…' }: Props) {
  const [allSkills, setAllSkills] = useState<Skill[]>([]);
  const [query, setQuery] = useState('');
  const [open, setOpen] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);

  const selected = value ? value.split(',').map(s => s.trim()).filter(Boolean) : [];

  useEffect(() => {
    fetch('/api/admin/skills').then(r => r.json()).then(setAllSkills).catch(() => {});
  }, []);

  // Close dropdown on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (wrapRef.current && !wrapRef.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const add = (skill: string) => {
    const trimmed = skill.trim();
    if (!trimmed || selected.includes(trimmed)) return;
    onChange([...selected, trimmed].join(','));
    setQuery('');
  };

  const remove = (skill: string) => {
    onChange(selected.filter(s => s !== skill).join(','));
  };

  const handleKey = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if ((e.key === 'Enter' || e.key === ',') && query.trim()) {
      e.preventDefault();
      add(query);
    }
    if (e.key === 'Backspace' && !query && selected.length > 0) {
      remove(selected[selected.length - 1]);
    }
  };

  // Filtered suggestions
  const q = query.toLowerCase();
  const filtered = q
    ? allSkills.filter(s => s.name.toLowerCase().includes(q) && !selected.includes(s.name)).slice(0, 10)
    : allSkills.filter(s => !selected.includes(s.name)).slice(0, 30);

  // Group by category when no query
  const grouped: Record<string, Skill[]> = {};
  if (!q) {
    for (const s of filtered) {
      (grouped[s.category] ??= []).push(s);
    }
  }

  const lbl: React.CSSProperties = { display: 'block', fontSize: '10px', fontWeight: 600, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.4px', marginBottom: '6px' };

  return (
    <div ref={wrapRef} style={{ position: 'relative' }}>
      <label style={lbl}>Skills / Tags</label>

      {/* Chips + input box */}
      <div
        onClick={() => { inputRef.current?.focus(); setOpen(true); }}
        style={{
          display: 'flex', flexWrap: 'wrap', gap: '6px', padding: '8px 10px',
          border: `1.5px solid ${open ? '#2145fb' : '#e2e8f0'}`, borderRadius: '9px',
          background: '#f8faff', cursor: 'text', minHeight: '42px', transition: 'border-color 0.15s',
          fontFamily: "'Poppins',sans-serif",
        }}
      >
        {selected.map(skill => (
          <span
            key={skill}
            style={{
              display: 'inline-flex', alignItems: 'center', gap: '4px',
              background: '#eff6ff', color: '#2145fb', padding: '3px 9px 3px 10px',
              borderRadius: '999px', fontSize: '12px', fontWeight: 600, lineHeight: 1,
              border: '1px solid #bfdbfe',
            }}
          >
            {skill}
            <button
              type="button"
              onClick={e => { e.stopPropagation(); remove(skill); }}
              style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0, display: 'flex', alignItems: 'center', color: '#93c5fd', lineHeight: 1 }}
            >
              <X size={11} />
            </button>
          </span>
        ))}
        <input
          ref={inputRef}
          value={query}
          onChange={e => { setQuery(e.target.value); setOpen(true); }}
          onFocus={() => setOpen(true)}
          onKeyDown={handleKey}
          placeholder={selected.length === 0 ? placeholder : ''}
          style={{
            border: 'none', outline: 'none', background: 'transparent', fontSize: '13px',
            fontFamily: "'Poppins',sans-serif", color: '#0b0d20', flex: '1', minWidth: '120px',
            padding: '2px 0',
          }}
        />
      </div>
      <div style={{ fontSize: '11px', color: '#94a3b8', marginTop: '4px' }}>
        Type to search, press Enter or comma to add custom · {selected.length} selected
      </div>

      {/* Dropdown */}
      {open && (
        <div style={{
          position: 'absolute', top: 'calc(100% - 8px)', left: 0, right: 0, zIndex: 50,
          background: '#fff', border: '1px solid #e2e8f0', borderRadius: '12px',
          boxShadow: '0 8px 24px rgba(0,0,0,.12)', maxHeight: '260px', overflowY: 'auto',
          marginTop: '4px',
        }}>
          {filtered.length === 0 && (
            <div style={{ padding: '12px 16px', fontSize: '12px', color: '#94a3b8' }}>
              {query ? `No match — press Enter to add "${query}"` : 'No more skills'}
            </div>
          )}

          {q ? (
            /* flat list when searching */
            <div style={{ padding: '6px' }}>
              {filtered.map(skill => (
                <button
                  key={skill.id}
                  type="button"
                  onMouseDown={e => { e.preventDefault(); add(skill.name); }}
                  style={{
                    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                    width: '100%', padding: '8px 12px', background: 'none', border: 'none',
                    borderRadius: '8px', cursor: 'pointer', fontFamily: "'Poppins',sans-serif",
                    fontSize: '13px', color: '#0b0d20', textAlign: 'left',
                  }}
                  onMouseEnter={e => (e.currentTarget.style.background = '#f1f5f9')}
                  onMouseLeave={e => (e.currentTarget.style.background = 'none')}
                >
                  <span>{skill.name}</span>
                  <span style={{ fontSize: '10px', color: CAT_COLORS[skill.category] ?? '#64748b', fontWeight: 600 }}>{skill.category}</span>
                </button>
              ))}
            </div>
          ) : (
            /* grouped by category when no query */
            <div style={{ padding: '6px' }}>
              {Object.entries(grouped).map(([cat, skills]) => (
                <div key={cat}>
                  <div style={{
                    fontSize: '10px', fontWeight: 700, color: CAT_COLORS[cat] ?? '#64748b',
                    textTransform: 'uppercase', letterSpacing: '0.5px', padding: '8px 12px 4px',
                  }}>{cat}</div>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '5px', padding: '0 8px 8px' }}>
                    {skills.map(skill => (
                      <button
                        key={skill.id}
                        type="button"
                        onMouseDown={e => { e.preventDefault(); add(skill.name); }}
                        style={{
                          padding: '4px 10px', background: '#f8faff', border: '1px solid #e2e8f0',
                          borderRadius: '999px', fontSize: '12px', color: '#374151', fontWeight: 500,
                          cursor: 'pointer', fontFamily: "'Poppins',sans-serif",
                        }}
                        onMouseEnter={e => { e.currentTarget.style.background = '#eff6ff'; e.currentTarget.style.borderColor = '#bfdbfe'; e.currentTarget.style.color = '#2145fb'; }}
                        onMouseLeave={e => { e.currentTarget.style.background = '#f8faff'; e.currentTarget.style.borderColor = '#e2e8f0'; e.currentTarget.style.color = '#374151'; }}
                      >
                        {skill.name}
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
