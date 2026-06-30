'use client';
import { useEffect, useState } from 'react';
import { Users, Briefcase, ClipboardList, TrendingUp, ExternalLink, ArrowRight, Clock } from 'lucide-react';

type Stats = { totalApplications: number; pendingApplications: number; activeCandidates: number; expiredCandidates: number };

const SECTIONS = [
  { label: '📋 Applications', desc: 'Review, approve & renew CAP candidates', href: '/admin/applications', color: '#2145fb' },
  { label: 'Homepage',        desc: 'Edit hero, stats, testimonials',          href: '/admin/homepage',     color: '#6366f1' },
  { label: 'Vacancies',       desc: 'Add, edit, delete job listings',          href: '/admin/vacancies',    color: '#f97316' },
  { label: 'Courses',         desc: 'Manage dashboard learning hub',           href: '/admin/courses',      color: '#16a34a' },
  { label: 'CAP Page',        desc: 'Edit CAP programme content',              href: '/admin/cap',          color: '#ef4444' },
  { label: 'Study Visa',      desc: 'Edit study abroad content',               href: '/admin/study-visa',   color: '#7c3aed' },
  { label: 'About Us',        desc: 'Edit team & mission content',             href: '/admin/about',        color: '#0891b2' },
  { label: 'Services',        desc: 'Edit service descriptions',               href: '/admin/services',     color: '#f59e0b' },
  { label: 'Media',           desc: 'Upload & manage site images',             href: '/admin/media',        color: '#ec4899' },
];

export default function AdminOverview() {
  const [stats, setStats] = useState<Stats | null>(null);

  useEffect(() => {
    fetch('/api/admin/stats').then(r => r.json()).then(setStats).catch(() => {});
  }, []);

  const s = stats;

  const QUICK_STATS = [
    { label: 'Total Applications', value: s ? String(s.totalApplications) : '…', sub: 'All time', color: '#2145fb', bg: '#eff6ff', Icon: ClipboardList, href: '/admin/applications' },
    { label: 'Pending Review',     value: s ? String(s.pendingApplications) : '…', sub: 'Awaiting approval', color: '#f97316', bg: '#fff7ed', Icon: Clock,          href: '/admin/applications?status=PENDING' },
    { label: 'Active Candidates',  value: s ? String(s.activeCandidates)   : '…', sub: 'Portal access live', color: '#16a34a', bg: '#f0fdf4', Icon: Users,          href: '/admin/applications?status=APPROVED' },
    { label: 'Expired Access',     value: s ? String(s.expiredCandidates)  : '…', sub: 'May need renewal',   color: '#7c3aed', bg: '#faf5ff', Icon: TrendingUp,     href: '/admin/applications' },
  ];

  return (
    <div className="adm-page" style={{ padding: '32px' }}>
      {/* Header */}
      <div style={{ marginBottom: '32px', display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
        <div>
          <h1 style={{ fontSize: '24px', fontWeight: 900, color: '#0b0d20', marginBottom: '4px' }}>Admin Dashboard</h1>
          <p style={{ fontSize: '14px', color: '#64748b' }}>Control everything on the Placedly website from here.</p>
        </div>
        <a href="/" target="_blank" rel="noopener noreferrer" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', padding: '9px 16px', background: '#fff', border: '1.5px solid #e2e8f0', borderRadius: '10px', fontSize: '13px', fontWeight: 600, color: '#374151', textDecoration: 'none', fontFamily: "'Poppins',sans-serif" }}>
          <ExternalLink size={13} /> View Live Site
        </a>
      </div>

      {/* Live Stats */}
      <div className="adm-stats-4" style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: '16px', marginBottom: '36px' }}>
        {QUICK_STATS.map(s => (
          <a key={s.label} href={s.href} style={{ background: '#fff', border: '1px solid #eef0f6', borderRadius: '14px', padding: '20px', boxShadow: '0 1px 4px rgba(0,0,0,.04)', textDecoration: 'none', display: 'block' }}>
            <div style={{ width: '38px', height: '38px', borderRadius: '10px', background: s.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '12px' }}>
              <s.Icon size={17} color={s.color} />
            </div>
            <div style={{ fontSize: '24px', fontWeight: 900, color: '#0b0d20', lineHeight: 1, marginBottom: '4px' }}>{s.value}</div>
            <div style={{ fontSize: '12px', fontWeight: 600, color: '#0b0d20', marginBottom: '2px' }}>{s.label}</div>
            <div style={{ fontSize: '11px', color: '#94a3b8' }}>{s.sub}</div>
          </a>
        ))}
      </div>

      {/* Manage sections */}
      <h2 style={{ fontSize: '16px', fontWeight: 800, color: '#0b0d20', marginBottom: '16px' }}>Manage Website</h2>
      <div className="adm-stats-4" style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: '14px' }}>
        {SECTIONS.map(sec => (
          <a key={sec.label} href={sec.href} style={{ background: '#fff', border: '1px solid #eef0f6', borderRadius: '14px', padding: '20px', textDecoration: 'none', boxShadow: '0 1px 4px rgba(0,0,0,.04)', display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: sec.color }} />
            <div style={{ fontSize: '14px', fontWeight: 700, color: '#0b0d20' }}>{sec.label}</div>
            <div style={{ fontSize: '12px', color: '#64748b', lineHeight: 1.5, flex: 1 }}>{sec.desc}</div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '12px', fontWeight: 600, color: sec.color }}>
              Manage <ArrowRight size={12} />
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}
