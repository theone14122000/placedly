import type { Metadata } from 'next';
import PageLayout from '../components/PageLayout';

export const metadata: Metadata = {
  title: 'Privacy Policy — Placedly',
  description: 'How Placedly collects, uses, and protects your personal information.',
};

const sections = [
  {
    title: '1. Information We Collect',
    body: 'We collect information you provide directly: name, email address, phone number, work experience, resume, and service preferences. When you use our dashboard, we may collect usage data such as pages visited and features accessed. We do not collect sensitive financial information beyond what is necessary to process success-share payments.',
  },
  {
    title: '2. How We Use Your Information',
    body: 'Your information is used to: match you with suitable employers or universities, communicate placement updates and advisor feedback, personalise your dashboard experience, and send relevant service notifications. We do not use your data for automated decision-making that significantly affects you without human review.',
  },
  {
    title: '3. Sharing Your Information',
    body: 'With your explicit consent, we share your profile (resume, experience summary) with prospective employers in our hiring partner network. For study abroad candidates, relevant documents are shared with partner universities. We do not sell, rent, or trade your personal data with third parties for marketing purposes.',
  },
  {
    title: '4. Data Retention',
    body: 'We retain your personal data for as long as you remain an active candidate or student, plus 3 years thereafter for legal and audit purposes. You may request deletion of your data at any time by contacting us. Anonymised, aggregated data may be retained indefinitely for service improvement.',
  },
  {
    title: '5. Cookies & Tracking',
    body: 'Our website uses essential cookies required for authentication and session management. We may use analytics cookies to understand how visitors use the site. You can disable non-essential cookies in your browser settings. We do not use third-party advertising trackers.',
  },
  {
    title: '6. Data Security',
    body: 'We implement industry-standard security measures including encrypted data transmission (HTTPS), secure password storage, and access controls. While we take all reasonable precautions, no internet transmission is 100% secure. Please notify us immediately if you suspect any unauthorised access to your account.',
  },
  {
    title: '7. Your Rights',
    body: 'You have the right to: access the personal data we hold about you, correct inaccurate data, request deletion of your data, withdraw consent for data processing, and receive a copy of your data in a portable format. To exercise these rights, contact us at privacy@placedly.com.',
  },
  {
    title: '8. Third-Party Services',
    body: 'We use Google OAuth for authentication and may use third-party tools for communication and analytics. These services have their own privacy policies. We select vendors who comply with applicable data protection laws.',
  },
  {
    title: '9. Children\'s Privacy',
    body: 'Our services are intended for working professionals aged 18 and above. We do not knowingly collect personal information from anyone under 18. If we become aware that a minor has provided data, we will delete it promptly.',
  },
  {
    title: '10. Changes to This Policy',
    body: 'We may update this Privacy Policy from time to time. We will notify registered users of material changes via email at least 14 days before they take effect. Continued use of our services after the effective date constitutes acceptance.',
  },
  {
    title: '11. Contact & Grievances',
    body: 'For privacy concerns, data requests, or grievances, contact our Data Officer at privacy@placedly.com. We aim to respond to all requests within 30 days.',
  },
];

export default function PrivacyPage() {
  return (
    <PageLayout>
      <section style={{ background: '#ffffff', padding: 'calc(56px + 68px) 0 64px' }}>
        <div className="container" style={{ maxWidth: '760px' }}>
          <nav style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', color: '#94a3b8', marginBottom: '32px' }}>
            <a href="/" style={{ color: '#94a3b8', textDecoration: 'none' }}>Home</a>
            <span>›</span>
            <span style={{ color: '#374151' }}>Privacy Policy</span>
          </nav>

          <div style={{ marginBottom: '48px' }}>
            <h1 style={{ fontSize: 'clamp(2rem,4vw,3rem)', fontWeight: 900, color: '#0b0d20', lineHeight: 1.1, letterSpacing: '-0.8px', marginBottom: '16px' }}>
              Privacy Policy
            </h1>
            <p style={{ fontSize: '14px', color: '#94a3b8' }}>Last updated: January 2025</p>
            <div style={{ marginTop: '20px', padding: '16px 20px', background: '#f0fdf4', borderRadius: '12px', borderLeft: '3px solid #16a34a' }}>
              <p style={{ fontSize: '14px', color: '#15803d', lineHeight: 1.65, margin: 0 }}>
                Your privacy matters to us. We never sell your data. Everything we collect is used solely to deliver and improve your career placement or study abroad experience.
              </p>
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '36px' }}>
            {sections.map(s => (
              <div key={s.title}>
                <h2 style={{ fontSize: '17px', fontWeight: 800, color: '#0b0d20', marginBottom: '10px' }}>{s.title}</h2>
                <p style={{ fontSize: '15px', color: '#475569', lineHeight: 1.75 }}>{s.body}</p>
              </div>
            ))}
          </div>

          <div style={{ marginTop: '56px', padding: '28px 32px', background: '#f8faff', borderRadius: '16px', border: '1px solid #eef0f6', textAlign: 'center' }}>
            <p style={{ fontSize: '14px', color: '#64748b', marginBottom: '16px' }}>Privacy questions or data requests?</p>
            <a href="/contact" style={{ display: 'inline-flex', alignItems: 'center', background: '#2145fb', color: '#fff', fontWeight: 600, fontSize: '14px', fontFamily: 'Poppins,sans-serif', padding: '12px 28px', borderRadius: '999px', textDecoration: 'none' }}>
              Contact Us →
            </a>
          </div>
        </div>
      </section>
    </PageLayout>
  );
}
