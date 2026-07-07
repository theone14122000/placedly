'use client';
import { useState, useEffect } from 'react';
import PageLayout from '../components/PageLayout';
import ApplyModal from '../components/ApplyModal';

type Job = { id: string; title: string; company: string; location: string; type: string; salary: string; category: string; experience: string; tags: string; description: string };

const categories = ['All', 'Tech', 'Sales', 'Finance', 'Marketing', 'Healthcare', 'Operations', 'HR', 'General'];

const ORANGE       = '#f97316';
const ORANGE_DARK  = '#ea580c';
const ORANGE_SOFT  = 'rgba(249,115,22,0.08)';
const ORANGE_SOFT2 = 'rgba(249,115,22,0.14)';
const ORANGE_BORDER = 'rgba(249,115,22,0.35)';
const FONT = `"Inter","Manrope","Plus Jakarta Sans",-apple-system,BlinkMacSystemFont,"Segoe UI",system-ui,sans-serif`;

function typeCls(type: string) {
  if (type === 'Remote') return 'vac-badge--solid';
  if (type === 'Hybrid') return 'vac-badge--outline';
  return 'vac-badge--neutral';
}

const MapPinIcon = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" /><circle cx="12" cy="10" r="3" />
  </svg>
);
const ClockIcon = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" />
  </svg>
);

export default function VacanciesPage() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [active, setActive] = useState('All');
  const [applyJob, setApplyJob] = useState<Job | null>(null);

  useEffect(() => {
    fetch('/api/admin/vacancies')
      .then(r => r.json())
      .then((data) => setJobs(Array.isArray(data) ? data : []))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const filtered = active === 'All' ? jobs : jobs.filter(j => j.category === active);

  return (
    <PageLayout>
      <section className="vac-section">
        <div className="vac-container">

          {/* ── Header ── */}
          <div className="vac-header">
            <h1 className="vac-title">Open Positions</h1>
            <p className="vac-subtitle">
              {loading ? 'Loading roles…' : `${filtered.length} role${filtered.length === 1 ? '' : 's'} live`} · Updated daily · Direct employer connections
            </p>
          </div>

          {/* ── Filters ── */}
          <div className="vac-filters" role="tablist" aria-label="Job categories">
            {categories.map(cat => (
              <button
                key={cat}
                role="tab"
                aria-selected={active === cat}
                className={`vac-chip${active === cat ? ' is-active' : ''}`}
                onClick={() => setActive(cat)}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* ── Loading state ── */}
          {loading && (
            <div className="vac-grid">
              {[0, 1, 2].map(i => (
                <div key={i} className="vac-card vac-card--skeleton" aria-hidden>
                  <div className="vac-skel vac-skel--logo" />
                  <div className="vac-skel vac-skel--line" style={{ width: '70%' }} />
                  <div className="vac-skel vac-skel--line" style={{ width: '45%' }} />
                  <div className="vac-skel vac-skel--line" style={{ width: '90%', height: 30 }} />
                </div>
              ))}
            </div>
          )}

          {/* ── Job grid ── */}
          {!loading && (
            <div className="vac-grid">
              {filtered.map(job => (
                <div key={job.id} className="vac-card">
                  <div className="vac-card-top">
                    <div className="vac-logo">💼</div>
                    <span className={`vac-badge ${typeCls(job.type)}`}>{job.type}</span>
                  </div>

                  <div className="vac-card-body">
                    <div className="vac-role">{job.title}</div>
                    <div className="vac-company">{job.company}</div>
                  </div>

                  <div className="vac-meta">
                    <span className="vac-meta-item"><MapPinIcon />{job.location}</span>
                    <span className="vac-meta-item"><ClockIcon />{job.experience}</span>
                  </div>

                  {job.salary && <div className="vac-salary">{job.salary}</div>}

                  {job.tags && (
                    <div className="vac-tags">
                      {job.tags.split(',').map(t => t.trim()).filter(Boolean).map(t => (
                        <span key={t} className="vac-tag">{t}</span>
                      ))}
                    </div>
                  )}

                  <button className="vac-apply" onClick={() => setApplyJob(job)}>
                    Apply via Placedly
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" />
                    </svg>
                  </button>
                </div>
              ))}
            </div>
          )}

          {/* ── Empty state ── */}
          {!loading && filtered.length === 0 && (
            <div className="vac-empty">
              <div className="vac-empty-icon">🔍</div>
              <div className="vac-empty-title">No roles in this category right now</div>
              <div className="vac-empty-sub">
                We add new openings daily — check back soon or <a href="/contact">talk to our team</a>.
              </div>
            </div>
          )}
        </div>
      </section>

      {applyJob && <ApplyModal job={applyJob as any} onClose={() => setApplyJob(null)} />}

      <style>{`
        /* ═══════════════════════════════════════
           BASE / RESET
        ═══════════════════════════════════════ */
        .vac-section,
        .vac-section * {
          font-family: ${FONT} !important;
          box-sizing: border-box;
        }
        .vac-section {
          background: #ffffff;
          padding: 96px 0 64px;
        }
        .vac-container {
          max-width: 1180px;
          margin: 0 auto;
          padding: 0 16px;
        }

        /* ═══════════════════════════════════════
           HEADER  (mobile-first)
        ═══════════════════════════════════════ */
        .vac-header {
          margin-bottom: 24px;
        }
        .vac-title {
          font-size: 26px;
          font-weight: 800;
          letter-spacing: -0.02em;
          color: #000000;
          margin: 0 0 6px;
          line-height: 1.2;
        }
        .vac-subtitle {
          font-size: 13px;
          color: #525252;
          margin: 0;
          font-weight: 500;
        }

        /* ═══════════════════════════════════════
           FILTER CHIPS — horizontal scroll on mobile
        ═══════════════════════════════════════ */
        .vac-filters {
          display: flex;
          gap: 8px;
          overflow-x: auto;
          -webkit-overflow-scrolling: touch;
          scrollbar-width: none;
          padding-bottom: 4px;
          margin-bottom: 24px;
        }
        .vac-filters::-webkit-scrollbar { display: none; }

        .vac-chip {
          flex: 0 0 auto;
          padding: 8px 16px;
          font-size: 12.5px;
          font-weight: 700;
          color: #000000;
          background: #ffffff;
          border: 1.5px solid rgba(0,0,0,0.12);
          border-radius: 999px;
          cursor: pointer;
          white-space: nowrap;
          transition: border-color 0.2s ease, background 0.2s ease, color 0.2s ease, transform 0.15s ease;
        }
        .vac-chip:hover {
          border-color: ${ORANGE_BORDER};
          background: ${ORANGE_SOFT};
        }
        .vac-chip.is-active {
          background: ${ORANGE} !important;
          border-color: ${ORANGE} !important;
          color: #ffffff !important;
          box-shadow: 0 4px 12px rgba(249,115,22,0.30);
        }
        .vac-chip:active { transform: scale(0.96); }

        /* ═══════════════════════════════════════
           GRID  (mobile-first: 1 col → up)
        ═══════════════════════════════════════ */
        .vac-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 16px;
        }

        /* ═══════════════════════════════════════
           CARD
        ═══════════════════════════════════════ */
        .vac-card {
          display: flex;
          flex-direction: column;
          gap: 12px;
          padding: 18px;
          background: #ffffff;
          border: 1.5px solid rgba(0,0,0,0.10);
          border-radius: 16px;
          transition: border-color 0.2s ease, box-shadow 0.2s ease, transform 0.2s ease;
        }
        .vac-card:hover {
          border-color: ${ORANGE_BORDER};
          box-shadow: 0 10px 28px rgba(249,115,22,0.12);
          transform: translateY(-2px);
        }

        .vac-card-top {
          display: flex;
          align-items: center;
          justify-content: space-between;
        }
        .vac-logo {
          width: 40px;
          height: 40px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 18px;
          border-radius: 12px;
          background: ${ORANGE_SOFT};
          border: 1px solid ${ORANGE_BORDER};
        }

        .vac-badge {
          font-size: 11px;
          font-weight: 700;
          padding: 5px 11px;
          border-radius: 999px;
          white-space: nowrap;
          letter-spacing: 0.01em;
        }
        .vac-badge--solid {
          background: ${ORANGE};
          color: #ffffff;
        }
        .vac-badge--outline {
          background: ${ORANGE_SOFT};
          color: ${ORANGE_DARK};
          border: 1px solid ${ORANGE_BORDER};
        }
        .vac-badge--neutral {
          background: #f5f5f5;
          color: #000000;
          border: 1px solid rgba(0,0,0,0.12);
        }

        .vac-card-body { display: flex; flex-direction: column; gap: 2px; }
        .vac-role {
          font-size: 16px;
          font-weight: 800;
          color: #000000;
          letter-spacing: -0.01em;
          line-height: 1.3;
        }
        .vac-company {
          font-size: 13px;
          font-weight: 600;
          color: #525252;
        }

        .vac-meta {
          display: flex;
          flex-wrap: wrap;
          gap: 10px 16px;
        }
        .vac-meta-item {
          display: inline-flex;
          align-items: center;
          gap: 5px;
          font-size: 12px;
          font-weight: 500;
          color: #525252;
        }
        .vac-meta-item svg { color: ${ORANGE_DARK}; flex-shrink: 0; }

        .vac-salary {
          font-size: 14px;
          font-weight: 800;
          color: #000000;
        }

        .vac-tags {
          display: flex;
          flex-wrap: wrap;
          gap: 6px;
        }
        .vac-tag {
          font-size: 11px;
          font-weight: 600;
          padding: 4px 10px;
          border-radius: 999px;
          background: #f8f8f8;
          border: 1px solid rgba(0,0,0,0.08);
          color: #000000;
        }

        .vac-apply {
          margin-top: 4px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 6px;
          width: 100%;
          padding: 11px 16px;
          font-size: 13px;
          font-weight: 700;
          color: #ffffff;
          background: linear-gradient(135deg, ${ORANGE} 0%, ${ORANGE_DARK} 100%);
          border: none;
          border-radius: 999px;
          cursor: pointer;
          text-align: center;
          box-shadow: 0 4px 14px rgba(249,115,22,0.28);
          transition: transform 0.2s ease, box-shadow 0.2s ease, filter 0.2s ease;
        }
        .vac-apply:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 20px rgba(249,115,22,0.38);
          filter: brightness(1.05);
        }
        .vac-apply:active {
          transform: translateY(0);
          filter: brightness(0.95);
        }

        /* ═══════════════════════════════════════
           SKELETON LOADING
        ═══════════════════════════════════════ */
        .vac-card--skeleton { gap: 10px; }
        .vac-skel {
          background: linear-gradient(90deg, #f0f0f0 25%, #f7f7f7 50%, #f0f0f0 75%);
          background-size: 200% 100%;
          animation: vac-shimmer 1.4s ease-in-out infinite;
          border-radius: 8px;
        }
        .vac-skel--logo { width: 40px; height: 40px; border-radius: 12px; }
        .vac-skel--line { height: 14px; border-radius: 6px; }
        @keyframes vac-shimmer {
          0%   { background-position: 200% 0; }
          100% { background-position: -200% 0; }
        }

        /* ═══════════════════════════════════════
           EMPTY STATE
        ═══════════════════════════════════════ */
        .vac-empty {
          text-align: center;
          padding: 64px 20px;
        }
        .vac-empty-icon { font-size: 36px; margin-bottom: 14px; }
        .vac-empty-title {
          font-size: 16px;
          font-weight: 800;
          color: #000000;
          margin-bottom: 6px;
        }
        .vac-empty-sub {
          font-size: 13px;
          color: #525252;
        }
        .vac-empty-sub a {
          color: ${ORANGE_DARK};
          font-weight: 700;
          text-decoration: none;
        }
        .vac-empty-sub a:hover { text-decoration: underline; }

        /* ═══════════════════════════════════════
           RESPONSIVE — mobile-first, scale UP
        ═══════════════════════════════════════ */
        @media (min-width: 480px) {
          .vac-title { font-size: 28px; }
        }

        @media (min-width: 640px) {
          .vac-grid { grid-template-columns: 1fr 1fr; }
          .vac-section { padding: 104px 0 72px; }
          .vac-title { font-size: 32px; }
          .vac-subtitle { font-size: 14px; }
        }

        @media (min-width: 960px) {
          .vac-grid { grid-template-columns: 1fr 1fr 1fr; }
          .vac-title { font-size: clamp(2rem, 3vw, 2.6rem); }
          .vac-container { padding: 0 24px; }
        }
      `}</style>
    </PageLayout>
  );
}