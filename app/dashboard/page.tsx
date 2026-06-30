'use client';
import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { CheckCircle2, Clock, Briefcase, BookOpen, TrendingUp, ChevronRight, ArrowRight } from 'lucide-react';
import Link from 'next/link';

const JOURNEY_LABELS = [
  'Discovery Call',
  'Profile Assessment',
  'Agreement Signed',
  'Resume Rebuild',
  'Interview Prep',
  'Employer Connect',
  'Offer & Placement',
];

const COLORS = ['#2145fb', '#f97316', '#16a34a', '#ef4444', '#7c3aed', '#0891b2'];
const BGS    = ['#eff6ff', '#fff7ed', '#f0fdf4', '#fef2f2', '#faf5ff', '#ecfeff'];

type Profile = {
  name: string; capStep: number; programme: string; status: string;
};

type CourseRow = {
  id: string; title: string; category: string; color: string; bg: string; progress: number;
};

export default function DashboardHome() {
  const { data: session } = useSession();
  const [profile, setProfile]   = useState<Profile | null>(null);
  const [courses, setCourses]   = useState<CourseRow[]>([]);
  const [jobCount, setJobCount] = useState<number>(0);
  const [loading, setLoading]   = useState(true);

  useEffect(() => {
    Promise.all([
      fetch('/api/candidate/profile').then(r => r.ok ? r.json() : null).catch(() => null),
      fetch('/api/admin/courses').then(r => r.json()).catch(() => []),
      fetch('/api/candidate/progress').then(r => r.json()).catch(() => []),
      fetch('/api/admin/vacancies').then(r => r.json()).catch(() => []),
    ]).then(([prof, dbCourses, progressData, vacancies]) => {
      if (prof) setProfile(prof);

      const pMap: Record<string, Set<number>> = {};
      for (const p of (progressData ?? [])) {
        if (!pMap[p.courseId]) pMap[p.courseId] = new Set();
        pMap[p.courseId].add(p.moduleIndex);
      }

      const MODULES = 5;
      const mapped: CourseRow[] = (dbCourses ?? []).slice(0, 3).map((c: any, i: number) => ({
        id: c.id,
        title: c.title,
        category: c.category,
        color: COLORS[i % 6],
        bg: BGS[i % 6],
        progress: Math.round(((pMap[c.id]?.size ?? 0) / MODULES) * 100),
      }));
      setCourses(mapped);
      setJobCount(Array.isArray(vacancies) ? vacancies.filter((v: any) => v.isActive !== false).length : 0);
      setLoading(false);
    });
  }, []);

  const capStep  = profile?.capStep ?? 1;
  const firstName = profile?.name?.split(' ')[0] ?? session?.user?.name?.split(' ')[0] ?? 'there';
  const nextLabel = JOURNEY_LABELS[capStep] ?? 'Placement';
  const isDone    = capStep >= 7;

  const journey = JOURNEY_LABELS.map((label, i) => ({
    step: i + 1,
    label,
    done: i + 1 <= capStep,
    date: i + 1 < capStep ? 'Completed' : i + 1 === capStep ? 'In Progress' : 'Upcoming',
  }));

  if (loading) {
    return (
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '60vh', color: '#94a3b8', fontSize: 14 }}>
        Loading your dashboard…
      </div>
    );
  }

  return (
    <div>
      {/* Welcome banner */}
      <div style={{ background: '#0b0d20', borderRadius: '16px', padding: '28px 32px', marginBottom: '24px', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', right: -40, top: -40, width: 220, height: 220, borderRadius: '50%', background: 'rgba(33,69,251,0.15)', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', right: 60, bottom: -60, width: 160, height: 160, borderRadius: '50%', background: 'rgba(249,115,22,0.10)', pointerEvents: 'none' }} />
        <div style={{ position: 'relative' }}>
          <div style={{ fontSize: '11px', fontWeight: 700, color: '#f97316', textTransform: 'uppercase', letterSpacing: '0.7px', marginBottom: '8px' }}>
            {profile?.programme ?? 'CAP Programme'} — {profile?.status ?? 'Active'}
          </div>
          <h1 style={{ fontSize: 'clamp(1.3rem,2vw,1.8rem)', fontWeight: 900, color: '#fff', marginBottom: '8px', lineHeight: 1.2 }}>
            Hello, {firstName}! {isDone ? 'Congratulations on your placement!' : 'Ready to grow today?'}
          </h1>
          <p style={{ fontSize: '14px', color: 'rgba(255,255,255,0.55)', marginBottom: '20px' }}>
            {isDone
              ? 'You have completed all 7 steps of your CAP journey.'
              : `You are on Step ${capStep} of 7. ${capStep < 7 ? `Next: ${JOURNEY_LABELS[capStep]}.` : ''}`}
          </p>
          <div style={{ display: 'flex', gap: '10px' }}>
            <Link href="/dashboard/progress" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', padding: '9px 18px', background: '#f97316', color: '#fff', borderRadius: '8px', textDecoration: 'none', fontSize: '13px', fontWeight: 700, fontFamily: "'Poppins',sans-serif" }}>
              View Progress <ArrowRight size={13} />
            </Link>
            <Link href="/dashboard/courses" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', padding: '9px 18px', background: 'rgba(255,255,255,0.08)', color: '#fff', borderRadius: '8px', textDecoration: 'none', fontSize: '13px', fontWeight: 500, border: '1px solid rgba(255,255,255,0.12)', fontFamily: "'Poppins',sans-serif" }}>
              Start Learning
            </Link>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="dash-stats-4" style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: '14px', marginBottom: '24px' }}>
        {[
          { Icon: TrendingUp, label: 'CAP Status',  value: `Step ${capStep}/7`,        sub: isDone ? 'Completed!' : 'In Progress',    color: '#2145fb', bg: '#eff6ff' },
          { Icon: BookOpen,   label: 'Courses',      value: `${courses.length} Enrolled`, sub: `${courses.filter(c => c.progress === 100).length} completed`, color: '#f97316', bg: '#fff7ed' },
          { Icon: Briefcase,  label: 'Jobs Live',    value: `${jobCount} Open`,           sub: 'Browse vacancies',                       color: '#16a34a', bg: '#f0fdf4' },
          { Icon: Clock,      label: 'Next Step',    value: isDone ? 'Done!' : nextLabel, sub: isDone ? 'All complete' : 'Action needed', color: '#7c3aed', bg: '#faf5ff' },
        ].map(s => (
          <div key={s.label} style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: '14px', padding: '18px 20px', boxShadow: '0 1px 3px rgba(0,0,0,.04)' }}>
            <div style={{ width: '36px', height: '36px', borderRadius: '10px', background: s.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '12px' }}>
              <s.Icon size={16} color={s.color} />
            </div>
            <div style={{ fontSize: '11px', color: '#94a3b8', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.4px', marginBottom: '4px' }}>{s.label}</div>
            <div style={{ fontSize: '17px', fontWeight: 900, color: '#0b0d20', lineHeight: 1, marginBottom: '3px' }}>{s.value}</div>
            <div style={{ fontSize: '11px', color: '#94a3b8' }}>{s.sub}</div>
          </div>
        ))}
      </div>

      {/* Two-col */}
      <div className="dash-two-col" style={{ display: 'grid', gridTemplateColumns: '1fr 340px', gap: '20px' }}>

        {/* Continue Learning */}
        <div style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: '16px', padding: '24px', boxShadow: '0 1px 3px rgba(0,0,0,.04)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '18px' }}>
            <h2 style={{ fontSize: '15px', fontWeight: 800, color: '#0b0d20' }}>Continue Learning</h2>
            <Link href="/dashboard/courses" style={{ fontSize: '12px', color: '#2145fb', fontWeight: 600, textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '3px' }}>
              All courses <ChevronRight size={13} />
            </Link>
          </div>
          {courses.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '40px 20px', color: '#94a3b8', fontSize: 13 }}>
              No courses available yet. Check back soon.
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {courses.map(c => (
                <div key={c.id} style={{ display: 'flex', alignItems: 'center', gap: '14px', padding: '14px', borderRadius: '12px', border: '1px solid #f1f5f9', background: '#fafcff' }}>
                  <div style={{ width: '44px', height: '44px', borderRadius: '10px', background: c.bg, flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: c.color }} />
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontSize: '13px', fontWeight: 700, color: '#0b0d20', marginBottom: '6px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{c.title}</div>
                    <div style={{ height: '4px', background: '#e2e8f0', borderRadius: 999 }}>
                      <div style={{ height: '100%', width: `${c.progress}%`, background: c.color, borderRadius: 999 }} />
                    </div>
                  </div>
                  <span style={{ fontSize: '11px', fontWeight: 700, color: c.color, flexShrink: 0, background: c.bg, padding: '3px 8px', borderRadius: 999 }}>{c.progress}%</span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Journey + Quick links */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {/* Journey */}
          <div style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: '16px', padding: '22px', boxShadow: '0 1px 3px rgba(0,0,0,.04)' }}>
            <div style={{ fontSize: '14px', fontWeight: 800, color: '#0b0d20', marginBottom: '18px' }}>Your CAP Journey</div>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              {journey.map((item, i) => (
                <div key={item.step} style={{ display: 'flex', gap: '12px', alignItems: 'stretch' }}>
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flexShrink: 0 }}>
                    <div style={{ width: '26px', height: '26px', borderRadius: '50%', flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', background: item.done ? '#2145fb' : '#f1f5f9', border: item.done ? 'none' : '1.5px solid #e2e8f0' }}>
                      {item.done
                        ? <CheckCircle2 size={13} color="#fff" />
                        : <span style={{ fontSize: '9px', fontWeight: 700, color: '#94a3b8' }}>{item.step}</span>}
                    </div>
                    {i < journey.length - 1 && <div style={{ width: '1px', flex: 1, minHeight: '14px', background: item.done ? 'rgba(33,69,251,0.25)' : '#e2e8f0', margin: '3px 0' }} />}
                  </div>
                  <div style={{ paddingBottom: i < journey.length - 1 ? '14px' : 0 }}>
                    <div style={{ fontSize: '12px', fontWeight: 600, color: item.done ? '#0b0d20' : '#94a3b8' }}>{item.label}</div>
                    <div style={{ fontSize: '10px', color: item.done ? '#2145fb' : '#cbd5e1', marginTop: '1px' }}>{item.date}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick links */}
          <div style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: '16px', padding: '20px', boxShadow: '0 1px 3px rgba(0,0,0,.04)' }}>
            <div style={{ fontSize: '13px', fontWeight: 700, color: '#0b0d20', marginBottom: '12px' }}>Quick Links</div>
            {[
              { label: 'Browse Live Vacancies', href: '/dashboard/vacancies' },
              { label: 'View All Courses',      href: '/dashboard/courses' },
              { label: 'Track My Progress',     href: '/dashboard/progress' },
              { label: 'Contact Advisor',        href: '/contact' },
            ].map(l => (
              <Link key={l.label} href={l.href} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '9px 0', borderBottom: '1px solid #f8faff', textDecoration: 'none', color: '#374151', fontSize: '13px' }}>
                {l.label} <ChevronRight size={13} color="#cbd5e1" />
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
