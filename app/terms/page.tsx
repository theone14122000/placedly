import type { Metadata } from 'next';
import PageLayout from '../components/PageLayout';

export const metadata: Metadata = {
  title: 'Terms of Service — Placedly',
  description: 'Terms and conditions for using Placedly career placement and study abroad services.',
};

const sections = [
  {
    title: '1. Acceptance of Terms',
    body: 'By accessing or using Placedly\'s services — including our Career Assistance Programme (CAP), Study Abroad guidance, and online dashboard — you agree to be bound by these Terms of Service. If you do not agree, please do not use our services.',
  },
  {
    title: '2. Services Provided',
    body: 'Placedly provides career placement consultancy and study abroad guidance services. Our Career Assistance Programme (CAP) operates on a success-share model: you pay a service fee only after receiving and accepting a job offer. Study abroad services may have separate fee structures communicated at onboarding.',
  },
  {
    title: '3. Success Share Model',
    body: 'For CAP candidates, Placedly charges 12% of the agreed annual CTC as a success share fee, payable within 7 days of joining a new employer. A GST receipt is provided. No fee is charged if placement is not achieved. The exact terms are documented in a signed service agreement prior to engagement.',
  },
  {
    title: '4. Candidate Obligations',
    body: 'You agree to provide accurate information about your work experience, qualifications, and employment status. You agree to attend scheduled mock interviews, submit required documents promptly, and communicate honestly with Placedly advisors. Misrepresentation of qualifications may result in immediate termination of services.',
  },
  {
    title: '5. Confidentiality',
    body: 'Placedly treats all candidate information as confidential. Your resume, personal details, and career history will only be shared with prospective employers with your explicit consent. We do not sell personal data to third parties.',
  },
  {
    title: '6. Intellectual Property',
    body: 'All content on the Placedly website, including text, graphics, and course materials, is the property of Placedly and protected by applicable intellectual property laws. You may not reproduce or redistribute content without written permission.',
  },
  {
    title: '7. Limitation of Liability',
    body: 'Placedly does not guarantee employment outcomes. While we commit our best efforts, final hiring decisions rest with employers. Placedly shall not be liable for indirect, incidental, or consequential damages arising from use of our services.',
  },
  {
    title: '8. Termination',
    body: 'Either party may terminate the service agreement with written notice. If you accept a job offer facilitated by Placedly but decline to pay the success share fee, Placedly reserves the right to pursue recovery through appropriate legal channels.',
  },
  {
    title: '9. Changes to Terms',
    body: 'Placedly may update these terms periodically. Continued use of our services after changes constitutes acceptance of the revised terms. We will notify registered users of material changes via email.',
  },
  {
    title: '10. Governing Law',
    body: 'These terms are governed by the laws of India. Any disputes shall be subject to the exclusive jurisdiction of courts in Delhi NCR.',
  },
  {
    title: '11. Contact',
    body: 'For questions about these Terms, contact us at legal@placedly.com or through our Contact page.',
  },
];

export default function TermsPage() {
  return (
    <PageLayout>
      <section style={{ background: '#ffffff', padding: 'calc(56px + 68px) 0 64px' }}>
        <div className="container" style={{ maxWidth: '760px' }}>
          <nav style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', color: '#94a3b8', marginBottom: '32px' }}>
            <a href="/" style={{ color: '#94a3b8', textDecoration: 'none' }}>Home</a>
            <span>›</span>
            <span style={{ color: '#374151' }}>Terms of Service</span>
          </nav>

          <div style={{ marginBottom: '48px' }}>
            <h1 style={{ fontSize: 'clamp(2rem,4vw,3rem)', fontWeight: 900, color: '#0b0d20', lineHeight: 1.1, letterSpacing: '-0.8px', marginBottom: '16px' }}>
              Terms of Service
            </h1>
            <p style={{ fontSize: '14px', color: '#94a3b8' }}>Last updated: January 2025</p>
            <div style={{ marginTop: '20px', padding: '16px 20px', background: '#eff6ff', borderRadius: '12px', borderLeft: '3px solid #2145fb' }}>
              <p style={{ fontSize: '14px', color: '#1e40af', lineHeight: 1.65, margin: 0 }}>
                Please read these terms carefully before using Placedly. They outline your rights, our obligations, and the success-share model that underpins our service.
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
            <p style={{ fontSize: '14px', color: '#64748b', marginBottom: '16px' }}>Questions about our terms?</p>
            <a href="/contact" style={{ display: 'inline-flex', alignItems: 'center', background: '#2145fb', color: '#fff', fontWeight: 600, fontSize: '14px', fontFamily: 'Poppins,sans-serif', padding: '12px 28px', borderRadius: '999px', textDecoration: 'none' }}>
              Contact Us →
            </a>
          </div>
        </div>
      </section>
    </PageLayout>
  );
}
