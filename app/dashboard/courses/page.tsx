'use client';
import { useState, useEffect } from 'react';
import { Play, Lock, Clock, BookOpen, BarChart2, CheckCircle2, Zap, Star } from 'lucide-react';

type Course = {
  id: string; title: string; category: string; level: string;
  duration: string; modules: number; lessons: number;
  progress: number; color: string; bg: string;
  enrolled: boolean; description: string; instructor: string;
};

const DEFAULT_COURSES: Course[] = [
  { id: 'default-1', title: 'ATS Resume & LinkedIn Mastery', category: 'Career', level: 'Beginner', duration: '2.5 hrs', modules: 5, lessons: 15, progress: 0, color: '#2145fb', bg: '#eff6ff', enrolled: true, instructor: 'Placedly Career Team', description: 'Build an ATS-optimized resume that clears automated filters and gets noticed by hiring managers at top MNCs. Includes LinkedIn rebuild.' },
  { id: 'default-2', title: 'Interview Mastery Programme', category: 'Interview', level: 'Intermediate', duration: '4 hrs', modules: 5, lessons: 15, progress: 0, color: '#f97316', bg: '#fff7ed', enrolled: true, instructor: 'Placedly Advisors', description: 'Three-session system covering HR Round, Technical/Domain Round, and a Full Mock with Salary Negotiation Script.' },
  { id: 'default-3', title: 'Salary Negotiation Secrets', category: 'Career', level: 'Intermediate', duration: '1.5 hrs', modules: 5, lessons: 15, progress: 0, color: '#16a34a', bg: '#f0fdf4', enrolled: true, instructor: 'Placedly Career Team', description: 'Word-for-word scripts and proven tactics to negotiate 20–40% higher offers — without sounding greedy.' },
];

const CATS = ['All', 'Career', 'Interview', 'Domain', 'Study'];

const LEVEL_COLOR: Record<string, { color: string; bg: string }> = {
  Beginner:     { color: '#16a34a', bg: '#f0fdf4' },
  Intermediate: { color: '#f97316', bg: '#fff7ed' },
  Advanced:     { color: '#ef4444', bg: '#fef2f2' },
};

export default function CoursesPage() {
  const [courses, setCourses] = useState<Course[]>(DEFAULT_COURSES);
  const [filter, setFilter] = useState('All');
  const [tab, setTab] = useState<'all' | 'enrolled'>('enrolled');
  const [expanded, setExpanded] = useState<string | null>(null);

  const [progressMap, setProgressMap] = useState<Record<string, Set<number>>>({});

  useEffect(() => {
    const COLORS = ['#2145fb', '#f97316', '#16a34a', '#ef4444', '#7c3aed', '#0891b2'];
    const BGS    = ['#eff6ff', '#fff7ed', '#f0fdf4', '#fef2f2', '#faf5ff', '#ecfeff'];

    Promise.all([
      fetch('/api/admin/courses').then(r => r.json()),
      fetch('/api/candidate/progress').then(r => r.json()).catch(() => []),
    ]).then(([dbCourses, progressData]: [any[], any[]]) => {
      if (dbCourses.length === 0) return;

      const pMap: Record<string, Set<number>> = {};
      for (const p of progressData) {
        if (!pMap[p.courseId]) pMap[p.courseId] = new Set();
        pMap[p.courseId].add(p.moduleIndex);
      }
      setProgressMap(pMap);

      const MODULES = 5;
      setCourses(dbCourses.map((c: any, i: number) => ({
        id: c.id,
        title: c.title, category: c.category, level: c.level,
        duration: c.duration || '', modules: MODULES, lessons: MODULES * 3,
        progress: Math.round(((pMap[c.id]?.size ?? 0) / MODULES) * 100),
        color: COLORS[i % 6], bg: BGS[i % 6],
        enrolled: true, description: c.description || '', instructor: 'Placedly Team',
      })));
    }).catch(() => {});
  }, []);

  const toggleModule = async (courseId: string, moduleIndex: number, done: boolean) => {
    const method = done ? 'DELETE' : 'POST';
    await fetch('/api/candidate/progress', {
      method, headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ courseId, moduleIndex }),
    });
    setProgressMap(prev => {
      const next = { ...prev, [courseId]: new Set(prev[courseId] ?? []) };
      done ? next[courseId].delete(moduleIndex) : next[courseId].add(moduleIndex);
      return next;
    });
    const MODULES = 5;
    setCourses(prev => prev.map(c => c.id === courseId
      ? { ...c, progress: Math.round(((progressMap[courseId]?.size ?? 0) + (done ? -1 : 1)) / MODULES * 100) }
      : c));
  };

  const displayed = courses
    .filter(c => tab === 'enrolled' ? c.enrolled : true)
    .filter(c => filter === 'All' || c.category === filter);

  const enrolledCount = courses.filter(c => c.enrolled).length;
  const completedCount = courses.filter(c => c.progress === 100).length;

  return (
    <div>
      {/* Page header */}
      <div style={{ marginBottom: '28px' }}>
        <h1 style={{ fontSize: '24px', fontWeight: 900, color: '#0b0d20', marginBottom: '4px' }}>Learning Hub</h1>
        <p style={{ fontSize: '14px', color: '#64748b' }}>Master the skills that land better roles and higher salaries.</p>
      </div>

      {/* Stats row */}
      <div className="dash-stats-4" style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: '12px', marginBottom: '28px' }}>
        {[
          { Icon: BookOpen, label: 'Enrolled', value: enrolledCount, color: '#2145fb', bg: '#eff6ff' },
          { Icon: CheckCircle2, label: 'Completed', value: completedCount, color: '#16a34a', bg: '#f0fdf4' },
          { Icon: Zap, label: 'Available', value: courses.length - enrolledCount, color: '#f97316', bg: '#fff7ed' },
          { Icon: Star, label: 'Total Courses', value: courses.length, color: '#7c3aed', bg: '#faf5ff' },
        ].map(s => (
          <div key={s.label} style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: '12px', padding: '16px 18px', display: 'flex', alignItems: 'center', gap: '12px', boxShadow: '0 1px 3px rgba(0,0,0,.04)' }}>
            <div style={{ width: '38px', height: '38px', borderRadius: '10px', background: s.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <s.Icon size={16} color={s.color} />
            </div>
            <div>
              <div style={{ fontSize: '22px', fontWeight: 900, color: '#0b0d20', lineHeight: 1 }}>{s.value}</div>
              <div style={{ fontSize: '11px', color: '#94a3b8', marginTop: '2px' }}>{s.label}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Tabs + filters */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '22px', flexWrap: 'wrap' }}>
        <div style={{ display: 'flex', background: '#f1f5f9', borderRadius: '10px', padding: '3px', gap: '2px' }}>
          {(['enrolled', 'all'] as const).map(t => (
            <button key={t} onClick={() => setTab(t)} style={{ padding: '7px 16px', borderRadius: '8px', border: 'none', cursor: 'pointer', fontFamily: "'Poppins',sans-serif", fontSize: '12px', fontWeight: 700, background: tab === t ? '#fff' : 'transparent', color: tab === t ? '#0b0d20' : '#64748b', boxShadow: tab === t ? '0 1px 3px rgba(0,0,0,0.08)' : 'none', transition: 'all 0.15s' }}>
              {t === 'enrolled' ? `My Courses (${enrolledCount})` : `All Courses (${courses.length})`}
            </button>
          ))}
        </div>
        <div style={{ width: '1px', height: '24px', background: '#e2e8f0' }} />
        {CATS.map(c => (
          <button key={c} onClick={() => setFilter(c)} style={{ padding: '7px 14px', borderRadius: '999px', border: '1.5px solid', cursor: 'pointer', fontFamily: "'Poppins',sans-serif", fontSize: '12px', fontWeight: 600, background: filter === c ? '#0b0d20' : '#fff', borderColor: filter === c ? '#0b0d20' : '#e2e8f0', color: filter === c ? '#fff' : '#64748b', transition: 'all 0.15s' }}>
            {c}
          </button>
        ))}
      </div>

      {/* Course grid */}
      {displayed.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '80px 20px', color: '#94a3b8' }}>
          <BookOpen size={40} color="#e2e8f0" style={{ marginBottom: '12px' }} />
          <div style={{ fontSize: '15px', fontWeight: 600 }}>No courses here yet</div>
          <div style={{ fontSize: '13px', marginTop: '4px' }}>Switch to &ldquo;All Courses&rdquo; to browse available content</div>
        </div>
      ) : (
        <div className="dash-courses-3" style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '18px' }}>
          {displayed.map(course => {
            const lc = LEVEL_COLOR[course.level] ?? { color: '#64748b', bg: '#f1f5f9' };
            const isExpanded = expanded === course.id;
            return (
              <div key={course.id} style={{ background: '#fff', border: `1px solid ${isExpanded ? course.color : '#e2e8f0'}`, borderRadius: '18px', overflow: 'hidden', boxShadow: isExpanded ? `0 4px 20px ${course.color}22` : '0 1px 3px rgba(0,0,0,.04)', display: 'flex', flexDirection: 'column', transition: 'all 0.2s' }}>

                {/* Color accent bar */}
                <div style={{ height: '4px', background: course.color }} />

                <div style={{ padding: '22px', flex: 1, display: 'flex', flexDirection: 'column' }}>
                  {/* Top row */}
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '14px' }}>
                    <div style={{ width: '46px', height: '46px', borderRadius: '12px', background: course.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                      <BarChart2 size={20} color={course.color} />
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '5px' }}>
                      <span style={{ fontSize: '10px', fontWeight: 700, padding: '3px 8px', borderRadius: 999, background: lc.bg, color: lc.color }}>{course.level}</span>
                      {course.enrolled && (
                        <span style={{ fontSize: '10px', fontWeight: 700, color: '#16a34a', display: 'flex', alignItems: 'center', gap: '3px' }}>
                          <CheckCircle2 size={9} /> Enrolled
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Category */}
                  <div style={{ fontSize: '10px', fontWeight: 700, color: course.color, textTransform: 'uppercase', letterSpacing: '0.6px', marginBottom: '6px' }}>{course.category}</div>

                  {/* Title */}
                  <div style={{ fontSize: '15px', fontWeight: 800, color: '#0b0d20', lineHeight: 1.3, marginBottom: '8px' }}>{course.title}</div>

                  {/* Description — show when expanded */}
                  <div style={{ fontSize: '13px', color: '#64748b', lineHeight: 1.6, marginBottom: '14px', maxHeight: isExpanded ? '200px' : '40px', overflow: 'hidden', transition: 'max-height 0.3s ease' }}>
                    {course.description}
                  </div>

                  {/* Meta pills */}
                  <div style={{ display: 'flex', gap: '8px', marginBottom: '14px', flexWrap: 'wrap' }}>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '11px', color: '#64748b', background: '#f8faff', border: '1px solid #e2e8f0', padding: '4px 10px', borderRadius: 999 }}>
                      <Clock size={10} />{course.duration}
                    </span>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '11px', color: '#64748b', background: '#f8faff', border: '1px solid #e2e8f0', padding: '4px 10px', borderRadius: 999 }}>
                      <BookOpen size={10} />{course.modules} modules
                    </span>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '11px', color: '#64748b', background: '#f8faff', border: '1px solid #e2e8f0', padding: '4px 10px', borderRadius: 999 }}>
                      {course.lessons} lessons
                    </span>
                  </div>

                  {/* Progress bar — enrolled only */}
                  {course.enrolled && (
                    <div style={{ marginBottom: '16px' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '10px', color: '#94a3b8', marginBottom: '6px' }}>
                        <span>Progress</span><span style={{ fontWeight: 700, color: course.color }}>{course.progress}%</span>
                      </div>
                      <div style={{ height: '6px', background: '#f1f5f9', borderRadius: 999 }}>
                        <div style={{ height: '100%', width: `${course.progress}%`, background: course.color, borderRadius: 999, transition: 'width 0.4s ease' }} />
                      </div>
                    </div>
                  )}

                  {/* Instructor + Module Progress */}
                  {isExpanded && (
                    <>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '14px', padding: '10px 12px', background: '#f8faff', borderRadius: '10px', border: '1px solid #eef0f6' }}>
                        <div style={{ width: '28px', height: '28px', borderRadius: '50%', background: course.color, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '11px', fontWeight: 700, color: '#fff', flexShrink: 0 }}>
                          {course.instructor[0]}
                        </div>
                        <div>
                          <div style={{ fontSize: '11px', color: '#94a3b8' }}>Instructor</div>
                          <div style={{ fontSize: '12px', fontWeight: 600, color: '#0b0d20' }}>{course.instructor}</div>
                        </div>
                      </div>
                      {course.enrolled && (
                        <div style={{ marginBottom: '14px' }}>
                          <div style={{ fontSize: '11px', fontWeight: 700, color: '#374151', textTransform: 'uppercase', letterSpacing: '0.4px', marginBottom: '8px' }}>Modules</div>
                          {Array.from({ length: course.modules }, (_, mi) => {
                            const done = progressMap[course.id]?.has(mi) ?? false;
                            return (
                              <button key={mi} onClick={() => toggleModule(course.id, mi, done)} style={{ display: 'flex', alignItems: 'center', gap: '8px', width: '100%', background: 'none', border: 'none', padding: '5px 0', cursor: 'pointer', fontFamily: "'Poppins',sans-serif", textAlign: 'left' }}>
                                <div style={{ width: '18px', height: '18px', borderRadius: '50%', background: done ? course.color : '#f1f5f9', border: done ? 'none' : '1.5px solid #e2e8f0', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                                  {done && <CheckCircle2 size={10} color="#fff" />}
                                </div>
                                <span style={{ fontSize: '12px', color: done ? '#0b0d20' : '#94a3b8', fontWeight: done ? 600 : 400 }}>Module {mi + 1}</span>
                                {done && <span style={{ fontSize: '10px', color: course.color, fontWeight: 600, marginLeft: 'auto' }}>✓ Done</span>}
                              </button>
                            );
                          })}
                        </div>
                      )}
                    </>
                  )}

                  <div style={{ marginTop: 'auto', display: 'flex', gap: '8px' }}>
                    {/* Main CTA */}
                    <button style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', padding: '11px', background: course.enrolled ? course.color : '#f8faff', color: course.enrolled ? '#fff' : '#94a3b8', border: `1.5px solid ${course.enrolled ? course.color : '#e2e8f0'}`, borderRadius: '10px', fontSize: '13px', fontWeight: 700, cursor: course.enrolled ? 'pointer' : 'default', fontFamily: "'Poppins',sans-serif", boxShadow: course.enrolled ? `0 2px 8px ${course.color}33` : 'none' }}>
                      {course.enrolled ? <><Play size={13} />Start Learning</> : <><Lock size={13} />Locked</>}
                    </button>
                    {/* Details toggle */}
                    <button onClick={() => setExpanded(isExpanded ? null : course.id)} style={{ padding: '11px 14px', background: isExpanded ? course.bg : '#f8faff', color: isExpanded ? course.color : '#64748b', border: `1.5px solid ${isExpanded ? course.color : '#e2e8f0'}`, borderRadius: '10px', fontSize: '12px', fontWeight: 600, cursor: 'pointer', fontFamily: "'Poppins',sans-serif", whiteSpace: 'nowrap' }}>
                      {isExpanded ? 'Less' : 'Details'}
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Unlock banner */}
      {tab === 'enrolled' && courses.filter(c => !c.enrolled).length > 0 && (
        <div style={{ marginTop: '28px', background: '#0b0d20', borderRadius: '16px', padding: '24px 28px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '20px' }}>
          <div>
            <div style={{ fontSize: '14px', fontWeight: 800, color: '#fff', marginBottom: '4px' }}>
              {courses.filter(c => !c.enrolled).length} more courses available
            </div>
            <div style={{ fontSize: '13px', color: 'rgba(255,255,255,0.5)' }}>Talk to your advisor to unlock domain and study abroad courses.</div>
          </div>
          <a href="/contact" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', padding: '10px 22px', background: '#f97316', color: '#fff', borderRadius: '10px', textDecoration: 'none', fontSize: '13px', fontWeight: 700, fontFamily: "'Poppins',sans-serif", flexShrink: 0 }}>
            Talk to Advisor →
          </a>
        </div>
      )}
    </div>
  );
}
