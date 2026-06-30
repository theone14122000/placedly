'use client';
import { useState, useEffect } from 'react';
import PageLayout from '../components/PageLayout';
import ApplyModal from '../components/ApplyModal';

type Job = { id: string; title: string; company: string; location: string; type: string; salary: string; category: string; experience: string; tags: string; description: string };

const categories = ['All', 'Tech', 'Sales', 'Finance', 'Marketing', 'Healthcare', 'Operations', 'HR', 'General'];

function typeCls(type: string) {
  if (type === 'Remote') return 'green';
  if (type === 'Hybrid') return 'orange';
  return 'blue';
}

export default function VacanciesPage() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [active, setActive] = useState('All');
  const [applyJob, setApplyJob] = useState<Job | null>(null);

  useEffect(() => {
    fetch('/api/admin/vacancies').then(r => r.json()).then(setJobs).catch(() => {});
  }, []);

  const filtered = active === 'All' ? jobs : jobs.filter(j => j.category === active);

  return (
    <PageLayout>
      <section className="inner-section" style={{ background: '#ffffff', paddingTop: 'calc(var(--sp-14) + 68px)' }}>
        <div className="container">

          <div style={{ marginBottom: 'var(--sp-8)' }}>
            <h1 style={{ fontSize: 'clamp(1.8rem,4vw,2.6rem)', fontWeight: 800, color: '#0b0d20', marginBottom: '8px' }}>
              Open Positions
            </h1>
            <p style={{ fontSize: '15px', color: '#64748b' }}>
              {filtered.length} roles live · Updated daily · Direct employer connections
            </p>
          </div>

          <div className="vacancy-filters" style={{ marginBottom: 'var(--sp-8)' }}>
            {categories.map(cat => (
              <button key={cat} className={`filter-chip${active === cat ? ' active' : ''}`} onClick={() => setActive(cat)}>{cat}</button>
            ))}
          </div>

          <div className="vacancies-grid">
            {filtered.map(job => (
              <div key={job.id} className="job-card">
                <div className="job-card-top">
                  <div className="job-company-logo">💼</div>
                  <span className={`job-badge ${typeCls(job.type)}`}>{job.type}</span>
                </div>
                <div>
                  <div className="job-role">{job.title}</div>
                  <div className="job-company">{job.company}</div>
                </div>
                <div className="job-meta">
                  <div className="job-meta-item">
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>
                    {job.location}
                  </div>
                  <div className="job-meta-item">
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                    {job.experience}
                  </div>
                </div>
                <div className="job-salary">{job.salary}</div>
                <div className="job-tags">
                  {(job.tags || '').split(',').map(t => t.trim()).filter(Boolean).map(t => (
                    <span key={t} className="job-tag">{t}</span>
                  ))}
                </div>
                <button className="job-apply" style={{ cursor: 'pointer', border: 'none', textAlign: 'left' }} onClick={() => setApplyJob(job)}>Apply via Placedly →</button>
              </div>
            ))}
          </div>

          {filtered.length === 0 && (
            <div style={{ textAlign: 'center', padding: 'var(--sp-16)', color: 'var(--c-muted)' }}>
              <div style={{ fontSize: '40px', marginBottom: '16px' }}>🔍</div>
              <div style={{ fontSize: '18px', fontWeight: 700, color: '#0f172a', marginBottom: '8px' }}>No roles in this category right now</div>
              <div style={{ fontSize: '14px' }}>We add new openings daily — check back soon or <a href="/contact" style={{ color: '#2145fb' }}>talk to our team</a>.</div>
            </div>
          )}
        </div>
      </section>

      {applyJob && <ApplyModal job={applyJob as any} onClose={() => setApplyJob(null)} />}
    </PageLayout>
  );
}
