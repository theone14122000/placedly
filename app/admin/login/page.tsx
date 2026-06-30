'use client';
import { useState, useEffect } from 'react';
import { Save, RefreshCw, ChevronDown, ChevronUp } from 'lucide-react';

const inp: React.CSSProperties = { display: 'block', width: '100%', padding: '10px 13px', border: '1.5px solid #e2e8f0', borderRadius: '9px', fontSize: '13px', fontFamily: "'Poppins',sans-serif", color: '#0b0d20', background: '#f8faff', outline: 'none', boxSizing: 'border-box' as const };
const ta: React.CSSProperties  = { ...inp, resize: 'vertical' as const, minHeight: '80px' };
const lbl: React.CSSProperties = { display: 'block', fontSize: '10px', fontWeight: 600, color: '#64748b', textTransform: 'uppercase' as const, letterSpacing: '0.4px', marginBottom: '5px' };
const row: React.CSSProperties = { display: 'flex', flexDirection: 'column' as const, gap: '14px' };

function Field({ label, k, data, set, textarea }: { label: string; k: string; data: Record<string,string>; set: (k:string) => (e:React.ChangeEvent<any>) => void; textarea?: boolean }) {
  return (
    <div>
      <label style={lbl}>{label}</label>
      {textarea
        ? <textarea style={ta} value={data[k] ?? ''} onChange={set(k)} />
        : <input style={inp} value={data[k] ?? ''} onChange={set(k)} />}
    </div>
  );
}

function Section({ title, children, open=true }: { title:string; children:React.ReactNode; open?:boolean }) {
  const [show, setShow] = useState(open);
  return (
    <div style={{ background:'#fff', border:'1px solid #eef0f6', borderRadius:'16px', marginBottom:'16px', overflow:'hidden', boxShadow:'0 1px 4px rgba(0,0,0,.04)' }}>
      <button type="button" onClick={()=>setShow(v=>!v)} style={{ width:'100%', display:'flex', alignItems:'center', justifyContent:'space-between', padding:'18px 24px', background:'none', border:'none', cursor:'pointer', fontFamily:"'Poppins',sans-serif" }}>
        <span style={{ fontSize:'14px', fontWeight:700, color:'#0b0d20' }}>{title}</span>
        {show ? <ChevronUp size={16} color="#64748b" /> : <ChevronDown size={16} color="#64748b" />}
      </button>
      {show && <div style={{ padding:'0 24px 24px' }}>{children}</div>}
    </div>
  );
}

const DEFAULTS: Record<string,string> = {
  /* Shared stats */
  'login:stat1Num': '300+', 'login:stat1Label': 'Placed',
  'login:stat2Num': '60%+', 'login:stat2Label': 'Avg Growth',
  'login:stat3Num': '₹0',   'login:stat3Label': 'Upfront',
  'login:adminHint': 'Admin & ops staff can log in on any tab.',

  /* Candidate portal */
  'login:candidateLabel':    'Candidate',
  'login:candidateTagline':  'Welcome back to your career journey.',
  'login:candidateSub':      'Access granted only to approved CAP participants. Log in with the credentials sent to your email.',
  'login:candidatePerk1':    'Track your CAP programme progress in real time',
  'login:candidatePerk2':    'Access interview schedules & advisor feedback',
  'login:candidatePerk3':    'View and download your rebuilt resume',
  'login:candidatePerk4':    'Browse live job opportunities matched to your profile',
  'login:candidateNote':     'Credentials are sent by email after your CAP application is approved by our team.',
  'login:candidateCtaText':  'Apply for CAP →',
  'login:candidateCtaHref':  '/cap/apply',
  'login:candidateCtaPre':   'Not enrolled yet?',
  'login:candidateErrMsg':   'Invalid email or password. If you applied for CAP, your account may still be pending approval.',

  /* Partner (freelancer) portal */
  'login:partnerLabel':   'Partner',
  'login:partnerTagline': 'Track your referrals and grow your earnings.',
  'login:partnerSub':     'Partner portal access for registered Placedly freelancers. Log in with your partner credentials.',
  'login:partnerPerk1':   'View all candidates referred via your link',
  'login:partnerPerk2':   'Track commission status and payout history',
  'login:partnerPerk3':   'Access training materials and SOP guides',
  'login:partnerPerk4':   'Copy your referral link and share instantly',
  'login:partnerNote':    'Partner accounts are created by the Placedly team. Contact us to become a partner.',

  /* Recruiter portal */
  'login:recruiterLabel':   'Recruiter',
  'login:recruiterTagline': 'Manage your pipeline from screening to offer.',
  'login:recruiterSub':     'ATS portal for Placedly recruiters. Access your candidate pipeline, notes, and stage management.',
  'login:recruiterPerk1':   'Full ATS — screen, shortlist, and move candidates',
  'login:recruiterPerk2':   'Add call notes, interview feedback, and stage updates',
  'login:recruiterPerk3':   'Search and filter by role, stage, and status',
  'login:recruiterPerk4':   'Export candidate data to CSV',
  'login:recruiterNote':    'Recruiter accounts are set up by the Placedly operations team.',

  /* Generic */
  'login:genericErrMsg': 'Invalid email or password. Contact the Placedly team if you need access.',
};

export default function AdminLogin() {
  const [data, setData] = useState(DEFAULTS);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [status, setStatus] = useState('');

  useEffect(() => {
    fetch('/api/admin/content?prefix=login:')
      .then(r => r.json())
      .then((saved: Record<string,string>) => { setData({ ...DEFAULTS, ...saved }); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  const set = (k: string) => (e: React.ChangeEvent<any>) => setData(d => ({ ...d, [k]: e.target.value }));

  const handleSave = async () => {
    setSaving(true);
    const r = await fetch('/api/admin/content', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data) });
    setSaving(false);
    setStatus(r.ok ? 'Saved!' : 'Save failed');
    setTimeout(() => setStatus(''), 3000);
  };

  if (loading) return <div style={{ padding: '32px', color: '#64748b' }}>Loading…</div>;

  const portals = [
    { label: '🎓 Candidate Portal', key: 'candidate', hasCta: true, accent: '#f97316' },
    { label: '🔗 Partner Portal', key: 'partner', hasCta: false, accent: '#7c3aed' },
    { label: '👥 Recruiter Portal', key: 'recruiter', hasCta: false, accent: '#2145fb' },
  ];

  return (
    <div className="adm-page" style={{ padding: '32px' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px', flexWrap: 'wrap', gap: '12px' }}>
        <div>
          <h1 style={{ fontSize: '22px', fontWeight: 900, color: '#0b0d20', marginBottom: '2px' }}>Login Page Content</h1>
          <p style={{ fontSize: '13px', color: '#64748b' }}>Edit all portal branding, perks, notes, and messages.</p>
        </div>
        <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
          {status && <span style={{ fontSize: '12px', color: status.includes('fail') ? '#dc2626' : '#16a34a', fontWeight: 600 }}>{status}</span>}
          <button onClick={() => setData(DEFAULTS)} style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '9px 16px', background: '#f1f5f9', color: '#374151', border: 'none', borderRadius: '9px', fontSize: '13px', cursor: 'pointer', fontFamily: "'Poppins',sans-serif" }}>
            <RefreshCw size={13} /> Defaults
          </button>
          <button onClick={handleSave} disabled={saving} style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '9px 20px', background: '#2145fb', color: '#fff', border: 'none', borderRadius: '9px', fontSize: '13px', fontWeight: 600, cursor: 'pointer', fontFamily: "'Poppins',sans-serif", opacity: saving ? 0.7 : 1 }}>
            <Save size={13} /> {saving ? 'Saving…' : 'Save All'}
          </button>
        </div>
      </div>

      <Section title="📊 Shared Stats (bottom of left panel)">
        <div className="adm-grid-3">
          {[1,2,3].map(i => (
            <div key={i} style={row}>
              <Field label={`Stat ${i} number`} k={`login:stat${i}Num`} data={data} set={set} />
              <Field label={`Stat ${i} label`} k={`login:stat${i}Label`} data={data} set={set} />
            </div>
          ))}
        </div>
      </Section>

      <Section title="💬 Admin Hint Text" open={false}>
        <Field label="Hint shown at bottom of form (subtle grey text)" k="login:adminHint" data={data} set={set} />
      </Section>

      {portals.map(portal => (
        <Section key={portal.key} title={portal.label}>
          <div style={row}>
            <div className="adm-grid-2">
              <Field label="Tab label text" k={`login:${portal.key}Label`} data={data} set={set} />
              <div />
            </div>
            <Field label="Tagline (large text on left panel)" k={`login:${portal.key}Tagline`} data={data} set={set} />
            <Field label="Subtext (below tagline)" k={`login:${portal.key}Sub`} data={data} set={set} textarea />
            <div style={{ background: '#f8faff', borderRadius: 12, padding: 14, border: '1px solid #e2e8f0' }}>
              <div style={{ fontSize: 11, fontWeight: 700, color: portal.accent, marginBottom: 10, textTransform: 'uppercase', letterSpacing: '0.4px' }}>Perks list (4 checkmarks)</div>
              <div style={row}>
                {[1,2,3,4].map(i => (
                  <Field key={i} label={`Perk ${i}`} k={`login:${portal.key}Perk${i}`} data={data} set={set} />
                ))}
              </div>
            </div>
            <Field label="Note text (info box below form)" k={`login:${portal.key}Note`} data={data} set={set} textarea />
            {portal.hasCta && (
              <div style={{ background: '#fff7ed', borderRadius: 12, padding: 14, border: '1px solid #fed7aa' }}>
                <div style={{ fontSize: 11, fontWeight: 700, color: '#f97316', marginBottom: 10, textTransform: 'uppercase', letterSpacing: '0.4px' }}>CTA link (below subtext)</div>
                <div className="adm-grid-3">
                  <Field label="Prefix text" k={`login:${portal.key}CtaPre`} data={data} set={set} />
                  <Field label="Link text" k={`login:${portal.key}CtaText`} data={data} set={set} />
                  <Field label="Link href" k={`login:${portal.key}CtaHref`} data={data} set={set} />
                </div>
              </div>
            )}
            <Field label="Error message on wrong password" k={`login:${portal.key}ErrMsg`} data={data} set={set} textarea />
          </div>
        </Section>
      ))}

      <div style={{ position: 'sticky', bottom: 24, display: 'flex', justifyContent: 'flex-end', marginTop: 8 }}>
        <button onClick={handleSave} disabled={saving} style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '12px 28px', background: '#2145fb', color: '#fff', border: 'none', borderRadius: '12px', fontSize: '14px', fontWeight: 700, cursor: 'pointer', fontFamily: "'Poppins',sans-serif", opacity: saving ? 0.7 : 1, boxShadow: '0 8px 24px rgba(33,69,251,0.35)' }}>
          <Save size={15} /> {saving ? 'Saving…' : 'Save All Changes'}
        </button>
      </div>
    </div>
  );
}
