'use client';
import { useState, useEffect } from 'react';
import { MapPin, Clock, Search, Briefcase, ExternalLink } from 'lucide-react';
import ApplyModal from '../../components/ApplyModal';

type Job = {
  id: string; title: string; company: string; location: string; type: string;
  salary: string | null; category: string; experience: string; tags: string; isActive: boolean;
};

const CATS = ['All', 'Tech', 'Sales', 'Finance', 'Marketing', 'Healthcare', 'Operations'];

const TYPE_COLORS: Record<string, { bg: string; color: string }> = {
  'Full Time': { bg: '#eff6ff', color: '#2145fb' },
  'Hybrid':    { bg: '#fff7ed', color: '#f97316' },
  'Remote':    { bg: '#f0fdf4', color: '#16a34a' },
};

function initials(company: string) {
  return company.split(' ').filter(Boolean).slice(0, 2).map(w => w[0]).join('').toUpperCase();
}

export default function DashboardVacancies() {
  const [cat, setCat] = useState('All');
  const [search, setSearch] = useState('');
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [applyJob, setApplyJob] = useState<Job | null>(null);

  useEffect(() => {
    fetch('/api/admin/vacancies')
      .then(r => r.json())
      .then((data) => setJobs(Array.isArray(data) ? data.filter((j: any) => j.isActive !== false) : []))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const filtered = jobs
    .filter(j => cat === 'All' || j.category === cat)
    .filter(j => !search || j.title.toLowerCase().includes(search.toLowerCase()) || j.company.toLowerCase().includes(search.toLowerCase()));

  return (
    <div>
      <div style={{ marginBottom: '24px' }}>
        <h1 style={{ fontSize: '22px', fontWeight: 900, color: '#0b0d20', marginBottom: '4px' }}>Live Vacancies</h1>
        <p style={{ fontSize: '14px', color: '#64748b' }}>{loading ? 'Loading roles…' : `${filtered.length} roles live`} · Your Placedly advisor will send your profile directly to hiring managers.</p>
      </div>

      {/* Search + filter */}
      <div style={{ display: 'flex', gap: '12px', marginBottom: '20px', flexWrap: 'wrap' }}>
        <div style={{ position: 'relative', flex: '0 0 280px' }}>
          <Search size={14} color="#94a3b8" style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }} />
          <input
            style={{ display: 'block', width: '100%', padding: '9px 12px 9px 36px', border: '1.5px solid #e2e8f0', borderRadius: '10px', fontSize: '13px', fontFamily: "'Poppins',sans-serif", color: '#0b0d20', background: '#fff', outline: 'none', boxSizing: 'border-box' as const }}
            placeholder="Search role or company..."
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </div>
        <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
          {CATS.map(c => (
            <button key={c} onClick={() => setCat(c)} style={{ padding: '8px 14px', borderRadius: '999px', border: '1.5px solid', cursor: 'pointer', fontFamily: "'Poppins',sans-serif", fontSize: '12px', fontWeight: 600, background: cat === c ? '#0b0d20' : '#fff', borderColor: cat === c ? '#0b0d20' : '#e2e8f0', color: cat === c ? '#fff' : '#64748b' }}>
              {c}
            </button>
          ))}
        </div>
      </div>

      {/* Loading state */}
      {loading && (
        <div style={{ textAlign: 'center', padding: '64px', color: '#94a3b8', fontSize: '14px' }}>Loading vacancies…</div>
      )}

      {/* Job list */}
      {!loading && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {filtered.map(job => {
            const tc = TYPE_COLORS[job.type] ?? { bg: '#f1f5f9', color: '#475569' };
            const tags = (job.tags || '').split(',').map(t => t.trim()).filter(Boolean);
            return (
              <div key={job.id} style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: '14px', padding: '20px 24px', boxShadow: '0 1px 3px rgba(0,0,0,.04)', display: 'flex', alignItems: 'center', gap: '20px' }}>
                {/* Logo avatar */}
                <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: '#f1f5f9', border: '1px solid #e2e8f0', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '12px', fontWeight: 800, color: '#475569', flexShrink: 0, letterSpacing: '0.5px' }}>
                  {initials(job.company)}
                </div>

                {/* Info */}
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', marginBottom: '6px', flexWrap: 'wrap' }}>
                    <div style={{ fontSize: '15px', fontWeight: 700, color: '#0b0d20' }}>{job.title}</div>
                    <span style={{ fontSize: '11px', fontWeight: 700, padding: '2px 9px', borderRadius: 999, background: tc.bg, color: tc.color, flexShrink: 0 }}>{job.type}</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '16px', fontSize: '13px', color: '#64748b', marginBottom: '10px', flexWrap: 'wrap' }}>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><Briefcase size={12} />{job.company}</span>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><MapPin size={12} />{job.location}</span>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><Clock size={12} />{job.experience}</span>
                  </div>
                  {tags.length > 0 && (
                    <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                      {tags.map(t => (
                        <span key={t} style={{ fontSize: '11px', background: '#f8faff', border: '1px solid #e2e8f0', color: '#475569', padding: '3px 9px', borderRadius: 999, fontWeight: 500 }}>{t}</span>
                      ))}
                    </div>
                  )}
                </div>

                {/* Salary + CTA */}
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '10px', flexShrink: 0 }}>
                  <div style={{ fontSize: '15px', fontWeight: 800, color: '#0b0d20' }}>{job.salary}</div>
                  <button
                    onClick={() => setApplyJob(job)}
                    style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', padding: '9px 18px', background: '#2145fb', color: '#fff', border: 'none', borderRadius: '9px', fontSize: '13px', fontWeight: 700, cursor: 'pointer', fontFamily: "'Poppins',sans-serif", whiteSpace: 'nowrap' }}
                  >
                    <ExternalLink size={12} /> Apply
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {!loading && filtered.length === 0 && (
        <div style={{ textAlign: 'center', padding: '64px', color: '#94a3b8', fontSize: '14px' }}>No roles match your search.</div>
      )}

      {applyJob && <ApplyModal job={{ id: applyJob.id, role: applyJob.title, company: applyJob.company, logo: initials(applyJob.company), location: applyJob.location, type: applyJob.type }} onClose={() => setApplyJob(null)} />}
    </div>
  );
}
