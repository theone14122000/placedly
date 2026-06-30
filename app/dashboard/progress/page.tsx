'use client';
import { useState, useEffect } from 'react';
import { CheckCircle2, Clock, AlertCircle, TrendingUp, Award, Target } from 'lucide-react';

const JOURNEY = [
  { step: 1, label: 'Free Discovery Call', desc: '15-minute assessment. Goals understood. Advisor matched.', badge: 'Free', badgeColor: '#16a34a', badgeBg: '#f0fdf4' },
  { step: 2, label: 'Deep Profile Assessment', desc: 'Career story mapped. Gaps identified. Roadmap delivered.', badge: 'Foundation', badgeColor: '#2145fb', badgeBg: '#eff6ff' },
  { step: 3, label: 'Service Agreement Sign', desc: 'Digital agreement with scope, success share %, and terms.', badge: 'Pending', badgeColor: '#f97316', badgeBg: '#fff7ed' },
  { step: 4, label: 'Resume & LinkedIn Rebuild', desc: 'ATS-optimized resume + LinkedIn. Ready in 1–2 days.', badge: 'Core', badgeColor: '#7c3aed', badgeBg: '#faf5ff' },
  { step: 5, label: 'Interview Mastery — 3 Sessions', desc: 'HR Round → Technical → Full Mock + Salary Negotiation Script.', badge: 'Biggest Edge', badgeColor: '#ef4444', badgeBg: '#fef2f2' },
  { step: 6, label: 'Direct Employer Connect', desc: 'Your profile goes to 10–15 hiring managers with a warm intro.', badge: 'Our Work', badgeColor: '#0891b2', badgeBg: '#ecfeff' },
  { step: 7, label: 'Offer & Career Growth', desc: 'New role confirmed. Success share collected. Career transformed.', badge: 'Goal', badgeColor: '#f97316', badgeBg: '#fff7ed' },
];

// APPROVED candidates start at step 3 (agreement signed)
const APP_STEP_MAP: Record<string, number> = { PENDING: 2, APPROVED: 3 };

export default function ProgressPage() {
  const [currentStep, setCurrentStep] = useState(2);
  const [daysLeft, setDaysLeft] = useState<number | null>(null);

  useEffect(() => {
    fetch('/api/candidate/profile')
      .then(r => r.json())
      .then(d => {
        setCurrentStep(APP_STEP_MAP[d.applicationStatus] ?? 2);
        setDaysLeft(Math.max(0, Math.ceil((new Date(d.validUntil).getTime() - Date.now()) / 86400000)));
      }).catch(() => {});
  }, []);

  const journeyWithDone = JOURNEY.map(j => ({ ...j, done: j.step <= currentStep, date: j.step <= currentStep ? 'Completed' : j.step === currentStep + 1 ? 'Action Required' : 'Upcoming' }));
  const completedCount = journeyWithDone.filter(j => j.done).length;
  const pct = Math.round((completedCount / JOURNEY.length) * 100);
  const nextStep = journeyWithDone.find(j => !j.done);

  return (
    <div>
      <div style={{ marginBottom: '24px' }}>
        <h1 style={{ fontSize: '22px', fontWeight: 900, color: '#0b0d20', marginBottom: '4px' }}>My Progress</h1>
        <p style={{ fontSize: '14px', color: '#64748b' }}>Track every step of your CAP programme journey.</p>
      </div>

      {/* Progress overview */}
      {daysLeft !== null && daysLeft <= 14 && (
        <div style={{ background: daysLeft <= 7 ? '#fef2f2' : '#fff7ed', border: `1.5px solid ${daysLeft <= 7 ? '#fecaca' : '#fed7aa'}`, borderRadius: '12px', padding: '14px 18px', marginBottom: '16px', fontSize: '13px', fontWeight: 600, color: daysLeft <= 7 ? '#dc2626' : '#c2410c' }}>
          ⚠️ Your portal access expires in {daysLeft} day{daysLeft !== 1 ? 's' : ''}. Contact your advisor to renew.
        </div>
      )}

      <div className="dash-prog-top" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '14px', marginBottom: '24px' }}>
        <div style={{ background: '#0b0d20', borderRadius: '16px', padding: '24px', gridColumn: '1', position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', top: -30, right: -30, width: 120, height: 120, borderRadius: '50%', background: 'rgba(33,69,251,0.2)', pointerEvents: 'none' }} />
          <div style={{ fontSize: '11px', fontWeight: 700, color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '8px' }}>Overall Progress</div>
          <div style={{ fontSize: '42px', fontWeight: 900, color: '#fff', lineHeight: 1, marginBottom: '8px' }}>{pct}%</div>
          <div style={{ height: '6px', background: 'rgba(255,255,255,0.1)', borderRadius: 999, marginBottom: '8px' }}>
            <div style={{ height: '100%', width: `${pct}%`, background: '#f97316', borderRadius: 999 }} />
          </div>
          <div style={{ fontSize: '12px', color: 'rgba(255,255,255,0.5)' }}>{completedCount} of {JOURNEY.length} steps complete</div>
        </div>

        <div style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: '16px', padding: '24px', boxShadow: '0 1px 3px rgba(0,0,0,.04)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px' }}>
            <div style={{ width: '36px', height: '36px', borderRadius: '10px', background: '#fff7ed', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <AlertCircle size={16} color="#f97316" />
            </div>
            <div style={{ fontSize: '13px', fontWeight: 700, color: '#0b0d20' }}>Action Needed</div>
          </div>
          <div style={{ fontSize: '16px', fontWeight: 800, color: '#f97316', marginBottom: '4px' }}>Step {nextStep?.step ?? '—'}</div>
          <div style={{ fontSize: '13px', color: '#64748b' }}>{nextStep?.desc ?? 'All steps complete!'}</div>
        </div>

        <div style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: '16px', padding: '24px', boxShadow: '0 1px 3px rgba(0,0,0,.04)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px' }}>
            <div style={{ width: '36px', height: '36px', borderRadius: '10px', background: '#f0fdf4', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Target size={16} color="#16a34a" />
            </div>
            <div style={{ fontSize: '13px', fontWeight: 700, color: '#0b0d20' }}>Target</div>
          </div>
          <div style={{ fontSize: '16px', fontWeight: 800, color: '#16a34a', marginBottom: '4px' }}>60%+ Growth</div>
          <div style={{ fontSize: '13px', color: '#64748b' }}>Average salary growth for Placedly CAP candidates.</div>
        </div>
      </div>

      <div className="dash-two-col" style={{ display: 'grid', gridTemplateColumns: '1fr 280px', gap: '20px' }}>

        {/* Full journey timeline */}
        <div style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: '16px', padding: '28px', boxShadow: '0 1px 3px rgba(0,0,0,.04)' }}>
          <h2 style={{ fontSize: '15px', fontWeight: 800, color: '#0b0d20', marginBottom: '24px' }}>Your 7-Step Journey</h2>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            {journeyWithDone.map((item, i) => (
              <div key={item.step} style={{ display: 'flex', gap: '16px', alignItems: 'stretch' }}>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flexShrink: 0 }}>
                  <div style={{
                    width: '40px', height: '40px', borderRadius: '50%', flexShrink: 0,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    background: item.done ? '#2145fb' : '#f8faff',
                    border: item.done ? 'none' : '2px solid #e2e8f0',
                  }}>
                    {item.done
                      ? <CheckCircle2 size={18} color="#fff" />
                      : <span style={{ fontSize: '13px', fontWeight: 700, color: '#94a3b8' }}>{item.step}</span>}
                  </div>
                  {i < JOURNEY.length - 1 && <div style={{ width: '2px', flex: 1, minHeight: '20px', background: item.done ? 'rgba(33,69,251,0.2)' : '#e2e8f0', margin: '6px 0' }} />}
                </div>
                <div style={{ paddingBottom: i < JOURNEY.length - 1 ? '24px' : 0, flex: 1 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '4px', flexWrap: 'wrap' }}>
                    <div style={{ fontSize: '14px', fontWeight: 700, color: item.done ? '#0b0d20' : '#374151' }}>{item.label}</div>
                    <span style={{ fontSize: '10px', fontWeight: 700, padding: '2px 8px', borderRadius: 999, background: item.badgeBg, color: item.badgeColor }}>{item.badge}</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '6px' }}>
                    <Clock size={11} color={item.done ? '#2145fb' : '#94a3b8'} />
                    <span style={{ fontSize: '11px', color: item.done ? '#2145fb' : '#94a3b8', fontWeight: 600 }}>{item.date}</span>
                  </div>
                  <div style={{ fontSize: '13px', color: '#64748b', lineHeight: 1.6 }}>{item.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right column */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {/* Milestones */}
          <div style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: '16px', padding: '22px', boxShadow: '0 1px 3px rgba(0,0,0,.04)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
              <Award size={15} color="#f97316" />
              <div style={{ fontSize: '14px', fontWeight: 800, color: '#0b0d20' }}>Milestones</div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {journeyWithDone.map(m => (
                <div key={m.label} style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <div style={{ width: '22px', height: '22px', borderRadius: '50%', background: m.done ? '#2145fb' : '#f1f5f9', border: m.done ? 'none' : '1.5px solid #e2e8f0', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    {m.done ? <CheckCircle2 size={12} color="#fff" /> : <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#cbd5e1', display: 'block' }} />}
                  </div>
                  <span style={{ fontSize: '12px', fontWeight: 500, color: m.done ? '#0b0d20' : '#94a3b8' }}>{m.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Stats */}
          <div style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: '16px', padding: '22px', boxShadow: '0 1px 3px rgba(0,0,0,.04)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
              <TrendingUp size={15} color="#2145fb" />
              <div style={{ fontSize: '14px', fontWeight: 800, color: '#0b0d20' }}>Placement Stats</div>
            </div>
            {[
              { label: 'Avg placement time', value: '4–6 weeks' },
              { label: 'Fastest placement', value: '9 days' },
              { label: 'Avg salary growth', value: '60%+' },
              { label: 'Interview calls (avg)', value: '3–5' },
            ].map(s => (
              <div key={s.label} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '9px 0', borderBottom: '1px solid #f8faff' }}>
                <span style={{ fontSize: '12px', color: '#64748b' }}>{s.label}</span>
                <span style={{ fontSize: '13px', fontWeight: 700, color: '#0b0d20' }}>{s.value}</span>
              </div>
            ))}
          </div>

          {/* CTA */}
          <a href="/contact" style={{ display: 'block', background: '#0b0d20', borderRadius: '16px', padding: '22px', textDecoration: 'none' }}>
            <div style={{ fontSize: '14px', fontWeight: 700, color: '#fff', marginBottom: '6px' }}>Need help with Step 3?</div>
            <div style={{ fontSize: '12px', color: 'rgba(255,255,255,0.5)', marginBottom: '14px' }}>Your advisor is ready to guide you through the agreement.</div>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', padding: '9px 16px', background: '#f97316', color: '#fff', borderRadius: '8px', fontSize: '12px', fontWeight: 700, fontFamily: "'Poppins',sans-serif" }}>
              Contact Advisor →
            </div>
          </a>
        </div>
      </div>
    </div>
  );
}
