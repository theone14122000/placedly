'use client';
import { useState } from 'react';
import { BookOpen, ChevronDown, ChevronRight, CheckCircle2, MessageCircle, Target, IndianRupee, Users, FileText } from 'lucide-react';

type Section = { title: string; icon: React.ReactNode; color: string; items: { q: string; a: string }[] };

const SECTIONS: Section[] = [
  {
    title: 'Getting Started as a Partner',
    icon: <Target size={18} />,
    color: '#2145fb',
    items: [
      {
        q: 'What is the Placedly Partner Programme?',
        a: 'Placedly partners (freelancers) source and refer job-seekers to our Career Assistance Programme (CAP). Every candidate you refer who gets enrolled earns you a commission. There are no targets or minimum commitments — you earn purely on successful placements.',
      },
      {
        q: 'What is my referral link and how do I use it?',
        a: 'Your unique referral link looks like: https://placedly.com/cap/apply?ref=YOURCODE\n\nShare this link on WhatsApp, Instagram, LinkedIn, or any platform. When a candidate fills the form via your link, they are automatically tagged to you — even if they apply days later.',
      },
      {
        q: 'Who should I refer?',
        a: 'Best-fit candidates are:\n• Working professionals (0–8 years experience) looking to switch industries or roles\n• Freshers struggling to land their first job\n• People in Tier-2/3 cities wanting corporate placements\n• Anyone actively job-hunting or dissatisfied with their current profile',
      },
    ],
  },
  {
    title: 'The Application Process',
    icon: <FileText size={18} />,
    color: '#7c3aed',
    items: [
      {
        q: 'What happens after a candidate submits the form?',
        a: '1. Application is received and reviewed by the Placedly team within 24–48 hours.\n2. If eligible, the candidate is approved and sent their login credentials by email.\n3. They access the candidate portal, begin their programme, and are placed in relevant roles.\n4. Once placed, your commission is logged and processed.',
      },
      {
        q: 'How do I know if my referral was registered?',
        a: 'All your referrals appear in the Referrals tab with their current status (PENDING → APPROVED/REJECTED). You will also receive an email notification when any of your referrals are approved.',
      },
      {
        q: 'What if a candidate I referred already applied before?',
        a: 'If the candidate\'s email already exists in our system (applied earlier), the new application will be flagged as a duplicate. In such cases, the referral credit may not apply. Always share your link with fresh leads.',
      },
    ],
  },
  {
    title: 'Commission & Payouts',
    icon: <IndianRupee size={18} />,
    color: '#16a34a',
    items: [
      {
        q: 'How much commission do I earn?',
        a: 'Commission varies based on the candidate\'s package and programme tier. The Placedly team will communicate the exact commission structure. Typical commissions range from ₹2,000 to ₹8,000 per successful placement.',
      },
      {
        q: 'When is my commission credited?',
        a: 'Commission is logged as PENDING once a candidate is enrolled. It is marked PAID within 7 working days after the placement is confirmed and the candidate\'s fee is received. You can track this in the Commissions tab.',
      },
      {
        q: 'How do I receive my payout?',
        a: 'Payouts are processed directly to your bank account or UPI. Contact your Placedly account manager via WhatsApp to register your payment details. KYC verification is required before your first payout.',
      },
    ],
  },
  {
    title: 'Sourcing Tips & Scripts',
    icon: <MessageCircle size={18} />,
    color: '#f97316',
    items: [
      {
        q: 'WhatsApp message template (cold outreach)',
        a: 'Hi [Name]! 👋\n\nI\'m partnered with Placedly — a career placement firm that helps professionals land better roles. They have a structured programme with guaranteed placement support.\n\nIf you or someone you know is looking for a job switch or placement assistance, here\'s the application link:\n👉 [YOUR REFERRAL LINK]\n\nNo commitment, just a quick application. Happy to answer any questions!',
      },
      {
        q: 'LinkedIn post template',
        a: 'Looking for a career change or struggling to crack interviews? 🚀\n\nPlacedly\'s Career Assistance Programme has helped hundreds of professionals land roles in top companies.\n\n✅ Structured placement support\n✅ Resume & interview coaching\n✅ Job matching based on your profile\n\nApply here 👉 [YOUR REFERRAL LINK]\n\n#JobSearch #CareerGrowth #Placement #Hiring',
      },
      {
        q: 'Common objections and responses',
        a: '"Is it free?" → The programme has a nominal fee that covers placement support, coaching and tools. The fee is only charged after enrolment confirmation.\n\n"I\'ll think about it" → Share the link and tell them: The form takes 2 minutes and there\'s no obligation until they\'re approved.\n\n"I already have a job" → Ask: Are you happy with your current growth and salary? Placedly helps people move to better-fit roles, not just jobs.',
      },
    ],
  },
  {
    title: 'Do\'s and Don\'ts',
    icon: <CheckCircle2 size={18} />,
    color: '#dc2626',
    items: [
      {
        q: 'What should I always do?',
        a: '✅ Share only your unique referral link — never share someone else\'s\n✅ Be honest about what the programme offers\n✅ Follow up with candidates who showed interest\n✅ Keep your contact details updated in your profile\n✅ Verify candidates are genuinely interested before referring',
      },
      {
        q: 'What must I never do?',
        a: '❌ Do not make false promises about salary, timelines, or job guarantees\n❌ Do not spam unknown people with bulk messages\n❌ Do not collect or share candidate information outside the Placedly form\n❌ Do not share the admin or internal portals with anyone\n❌ Do not apply for candidates yourself using fake details',
      },
    ],
  },
  {
    title: 'Support & Escalations',
    icon: <Users size={18} />,
    color: '#0891b2',
    items: [
      {
        q: 'How do I contact my account manager?',
        a: 'Reach out on WhatsApp: +91 99101 16901\nEmail: hello@placedly.com\n\nFor commission disputes or KYC registration, always use email so there is a written record.',
      },
      {
        q: 'What if I see a wrong status on one of my referrals?',
        a: 'Screenshot the referral from your dashboard and send it to your account manager on WhatsApp with the candidate\'s name and email. We will investigate within 2 business days.',
      },
    ],
  },
];

export default function FreelancerSOP() {
  const [open, setOpen] = useState<Record<string, boolean>>({});

  const toggle = (key: string) => setOpen(prev => ({ ...prev, [key]: !prev[key] }));

  return (
    <div style={{ padding: 'clamp(16px, 4vw, 32px)', fontFamily: "'Poppins',sans-serif", maxWidth: '820px' }}>
      <style>{`
        .sop-q-btn {
          width: 100%;
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          padding: 14px 24px;
          background: none;
          border: none;
          cursor: pointer;
          text-align: left;
          gap: 12px;
          font-family: 'Poppins', sans-serif;
        }
        .sop-cta {
          display: flex;
          align-items: center;
          gap: 16px;
        }
        @media (max-width: 639px) {
          .sop-q-btn {
            padding: 12px 16px;
          }
          .sop-section-header {
            padding: 14px 16px !important;
          }
          .sop-answer {
            padding: 0 16px 14px 16px !important;
          }
          .sop-cta {
            flex-direction: column;
            align-items: flex-start;
            gap: 10px;
          }
        }
      `}</style>

      <div style={{ marginBottom: '32px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '6px' }}>
          <div style={{ width: '38px', height: '38px', borderRadius: '10px', background: '#eff6ff', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            <BookOpen size={18} color="#2145fb" />
          </div>
          <h1 style={{ fontSize: 'clamp(17px, 4vw, 22px)', fontWeight: 900, color: '#0b0d20' }}>Partner Training & SOPs</h1>
        </div>
        <p style={{ fontSize: '14px', color: '#64748b', lineHeight: 1.7, paddingLeft: '48px' }}>
          Everything you need to know about referring candidates, earning commissions, and growing with Placedly.
        </p>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        {SECTIONS.map((section, si) => (
          <div key={si} style={{ background: '#fff', borderRadius: '16px', border: '1px solid #eef0f6', overflow: 'hidden' }}>
            {/* Section header */}
            <div className="sop-section-header" style={{ padding: '18px 24px', display: 'flex', alignItems: 'center', gap: '12px', borderBottom: '1px solid #f1f5f9' }}>
              <div style={{ width: '34px', height: '34px', borderRadius: '9px', background: section.color + '18', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, color: section.color }}>
                {section.icon}
              </div>
              <div style={{ fontSize: '15px', fontWeight: 800, color: '#0b0d20' }}>{section.title}</div>
            </div>

            {/* Items */}
            <div style={{ padding: '8px 0' }}>
              {section.items.map((item, ii) => {
                const key = `${si}-${ii}`;
                const isOpen = !!open[key];
                return (
                  <div key={ii} style={{ borderBottom: ii < section.items.length - 1 ? '1px solid #f8faff' : 'none' }}>
                    <button
                      className="sop-q-btn"
                      onClick={() => toggle(key)}
                    >
                      <span style={{ fontSize: '14px', fontWeight: 600, color: isOpen ? section.color : '#0b0d20', flex: 1 }}>{item.q}</span>
                      <span style={{ color: '#94a3b8', flexShrink: 0, marginTop: '2px' }}>
                        {isOpen ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
                      </span>
                    </button>
                    {isOpen && (
                      <div className="sop-answer" style={{ padding: '0 24px 18px 24px' }}>
                        <div style={{ background: '#f8faff', borderRadius: '10px', padding: '16px', fontSize: '13px', color: '#374151', lineHeight: 1.8, whiteSpace: 'pre-line', borderLeft: `3px solid ${section.color}` }}>
                          {item.a}
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      <div style={{ marginTop: '28px', padding: '18px 22px', background: 'linear-gradient(135deg, #2145fb 0%, #1a38d4 100%)', borderRadius: '14px', color: '#fff' }}>
        <div className="sop-cta">
          <MessageCircle size={28} style={{ flexShrink: 0 }} />
          <div>
            <div style={{ fontSize: '14px', fontWeight: 800, marginBottom: '3px' }}>Need help? We're on WhatsApp.</div>
            <div style={{ fontSize: '13px', color: 'rgba(255,255,255,0.75)' }}>
              Message your account manager at <strong style={{ color: '#fff' }}>+91 99101 16901</strong> for queries, commission disputes, or KYC registration.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
