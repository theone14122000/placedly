'use client';
import { useState } from 'react';
import { MapPin, Clock, Search, Briefcase, ExternalLink } from 'lucide-react';
import ApplyModal from '../../components/ApplyModal';

const JOBS = [
  { id: 1, role: 'Data Analyst', company: 'EXL Analytics', location: 'Delhi NCR', type: 'Full Time', typeCls: 'full', salary: '₹6 – 10 LPA', tags: ['Excel', 'SQL', 'Python', 'Power BI'], category: 'Tech', experience: '1–3 yrs', logo: 'EA' },
  { id: 2, role: 'Business Development Manager', company: 'Quatrro Global Services', location: 'Noida', type: 'Full Time', typeCls: 'full', salary: '₹8 – 14 LPA', tags: ['B2B Sales', 'CRM', 'Lead Gen'], category: 'Sales', experience: '3–6 yrs', logo: 'QG' },
  { id: 3, role: 'Digital Marketing Executive', company: 'eBiz Commerce', location: 'Gurugram', type: 'Hybrid', typeCls: 'hybrid', salary: '₹4 – 7 LPA', tags: ['SEO', 'Google Ads', 'Meta Ads'], category: 'Marketing', experience: '1–2 yrs', logo: 'eB' },
  { id: 4, role: 'Financial Analyst', company: 'HDFC Securities', location: 'Noida', type: 'Full Time', typeCls: 'full', salary: '₹7 – 12 LPA', tags: ['Financial Modelling', 'Excel', 'Equity Research'], category: 'Finance', experience: '2–4 yrs', logo: 'HS' },
  { id: 5, role: 'HR Business Partner', company: 'Teleperformance India', location: 'Delhi', type: 'Full Time', typeCls: 'full', salary: '₹6 – 9 LPA', tags: ['HRBP', 'Talent Management', 'People Ops'], category: 'Operations', experience: '2–5 yrs', logo: 'TP' },
  { id: 6, role: 'Software Engineer (React)', company: 'Persistent Systems', location: 'Remote', type: 'Remote', typeCls: 'remote', salary: '₹10 – 18 LPA', tags: ['React', 'TypeScript', 'Node.js'], category: 'Tech', experience: '2–4 yrs', logo: 'PS' },
  { id: 7, role: 'Clinical Research Associate', company: 'Sun Pharma', location: 'Delhi NCR', type: 'Full Time', typeCls: 'full', salary: '₹5 – 9 LPA', tags: ['GCP', 'Clinical Trials', 'Pharmacovigilance'], category: 'Healthcare', experience: '1–3 yrs', logo: 'SP' },
  { id: 8, role: 'Operations Manager', company: 'Blue Dart Express', location: 'Delhi NCR', type: 'Full Time', typeCls: 'full', salary: '₹8 – 13 LPA', tags: ['Logistics', 'Supply Chain', 'Team Leadership'], category: 'Operations', experience: '4–7 yrs', logo: 'BD' },
  { id: 9, role: 'UX/UI Designer', company: 'MakeMyTrip', location: 'Gurugram', type: 'Hybrid', typeCls: 'hybrid', salary: '₹8 – 14 LPA', tags: ['Figma', 'Prototyping', 'User Research'], category: 'Tech', experience: '2–5 yrs', logo: 'MM' },
  { id: 10, role: 'Account Manager — Enterprise', company: 'Tata Consultancy Services', location: 'Delhi', type: 'Full Time', typeCls: 'full', salary: '₹12 – 20 LPA', tags: ['Account Management', 'Enterprise Sales'], category: 'Sales', experience: '5–8 yrs', logo: 'TC' },
];

const CATS = ['All', 'Tech', 'Sales', 'Finance', 'Marketing', 'Healthcare', 'Operations'];

const TYPE_COLORS: Record<string, { bg: string; color: string }> = {
  'Full Time': { bg: '#eff6ff', color: '#2145fb' },
  'Hybrid':    { bg: '#fff7ed', color: '#f97316' },
  'Remote':    { bg: '#f0fdf4', color: '#16a34a' },
};

export default function DashboardVacancies() {
  const [cat, setCat] = useState('All');
  const [search, setSearch] = useState('');
  const [applyJob, setApplyJob] = useState<typeof JOBS[0] | null>(null);

  const filtered = JOBS
    .filter(j => cat === 'All' || j.category === cat)
    .filter(j => !search || j.role.toLowerCase().includes(search.toLowerCase()) || j.company.toLowerCase().includes(search.toLowerCase()));

  return (
    <div>
      <div style={{ marginBottom: '24px' }}>
        <h1 style={{ fontSize: '22px', fontWeight: 900, color: '#0b0d20', marginBottom: '4px' }}>Live Vacancies</h1>
        <p style={{ fontSize: '14px', color: '#64748b' }}>{filtered.length} roles live · Your Placedly advisor will send your profile directly to hiring managers.</p>
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

      {/* Job list */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        {filtered.map(job => {
          const tc = TYPE_COLORS[job.type] ?? { bg: '#f1f5f9', color: '#475569' };
          return (
            <div key={job.id} style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: '14px', padding: '20px 24px', boxShadow: '0 1px 3px rgba(0,0,0,.04)', display: 'flex', alignItems: 'center', gap: '20px' }}>
              {/* Logo avatar */}
              <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: '#f1f5f9', border: '1px solid #e2e8f0', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '12px', fontWeight: 800, color: '#475569', flexShrink: 0, letterSpacing: '0.5px' }}>
                {job.logo}
              </div>

              {/* Info */}
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', marginBottom: '6px', flexWrap: 'wrap' }}>
                  <div style={{ fontSize: '15px', fontWeight: 700, color: '#0b0d20' }}>{job.role}</div>
                  <span style={{ fontSize: '11px', fontWeight: 700, padding: '2px 9px', borderRadius: 999, background: tc.bg, color: tc.color, flexShrink: 0 }}>{job.type}</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px', fontSize: '13px', color: '#64748b', marginBottom: '10px', flexWrap: 'wrap' }}>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><Briefcase size={12} />{job.company}</span>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><MapPin size={12} />{job.location}</span>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><Clock size={12} />{job.experience}</span>
                </div>
                <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                  {job.tags.map(t => (
                    <span key={t} style={{ fontSize: '11px', background: '#f8faff', border: '1px solid #e2e8f0', color: '#475569', padding: '3px 9px', borderRadius: 999, fontWeight: 500 }}>{t}</span>
                  ))}
                </div>
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

      {filtered.length === 0 && (
        <div style={{ textAlign: 'center', padding: '64px', color: '#94a3b8', fontSize: '14px' }}>No roles match your search.</div>
      )}

      {applyJob && <ApplyModal job={applyJob} onClose={() => setApplyJob(null)} />}
    </div>
  );
}
