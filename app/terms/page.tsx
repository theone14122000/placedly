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
      <section className="tos-section">
        <div className="tos-container">

          <nav className="tos-breadcrumb" aria-label="Breadcrumb">
            <a href="/">Home</a>
            <span aria-hidden>›</span>
            <span className="is-current">Terms of Service</span>
          </nav>

          <div className="tos-header">
            <h1 className="tos-title">Terms of Service</h1>
            <p className="tos-updated">Last updated: January 2025</p>
            <div className="tos-notice">
              <p>
                Please read these terms carefully before using Placedly. They outline your rights, our obligations, and the success-share model that underpins our service.
              </p>
            </div>
          </div>

          <div className="tos-sections">
            {sections.map(s => (
              <div key={s.title} className="tos-block">
                <h2>{s.title}</h2>
                <p>{s.body}</p>
              </div>
            ))}
          </div>

          <div className="tos-cta">
            <p>Questions about our terms?</p>
            <a href="/contact" className="tos-cta-btn">
              Contact Us
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" />
              </svg>
            </a>
          </div>
        </div>
      </section>

      <style>{`
        /* ═══════════════════════════════════════
           BASE / RESET
        ═══════════════════════════════════════ */
        .tos-section,
        .tos-section * {
          font-family: "Inter","Manrope","Plus Jakarta Sans",-apple-system,BlinkMacSystemFont,"Segoe UI",system-ui,sans-serif !important;
          box-sizing: border-box;
        }
        .tos-section {
          background: #ffffff;
          padding: 96px 0 56px;
        }
        .tos-container {
          max-width: 760px;
          margin: 0 auto;
          padding: 0 16px;
        }

        /* ═══════════════════════════════════════
           BREADCRUMB
        ═══════════════════════════════════════ */
        .tos-breadcrumb {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 12.5px;
          font-weight: 500;
          color: #737373;
          margin-bottom: 24px;
          flex-wrap: wrap;
        }
        .tos-breadcrumb a {
          color: #737373;
          text-decoration: none;
          transition: color 0.2s ease;
        }
        .tos-breadcrumb a:hover {
          color: #f97316;
        }
        .tos-breadcrumb .is-current {
          color: #000000;
          font-weight: 700;
        }

        /* ═══════════════════════════════════════
           HEADER
        ═══════════════════════════════════════ */
        .tos-header {
          margin-bottom: 36px;
        }
        .tos-title {
          font-size: 30px;
          font-weight: 900;
          color: #000000;
          line-height: 1.15;
          letter-spacing: -0.02em;
          margin: 0 0 12px;
        }
        .tos-updated {
          font-size: 13px;
          font-weight: 500;
          color: #737373;
          margin: 0;
        }
        .tos-notice {
          margin-top: 18px;
          padding: 14px 16px;
          background: rgba(249,115,22,0.06);
          border-radius: 12px;
          border-left: 3px solid #f97316;
        }
        .tos-notice p {
          font-size: 13.5px;
          color: #000000;
          line-height: 1.65;
          margin: 0;
          font-weight: 500;
        }

        /* ═══════════════════════════════════════
           SECTIONS
        ═══════════════════════════════════════ */
        .tos-sections {
          display: flex;
          flex-direction: column;
          gap: 28px;
        }
        .tos-block h2 {
          font-size: 15.5px;
          font-weight: 800;
          color: #000000;
          margin: 0 0 8px;
          letter-spacing: -0.01em;
        }
        .tos-block p {
          font-size: 14px;
          color: #404040;
          line-height: 1.7;
          margin: 0;
          font-weight: 400;
        }

        /* ═══════════════════════════════════════
           CTA
        ═══════════════════════════════════════ */
        .tos-cta {
          margin-top: 48px;
          padding: 24px 20px;
          background: rgba(249,115,22,0.05);
          border-radius: 16px;
          border: 1px solid rgba(249,115,22,0.20);
          text-align: center;
        }
        .tos-cta p {
          font-size: 13.5px;
          font-weight: 600;
          color: #000000;
          margin: 0 0 14px;
        }
        .tos-cta-btn {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          background: linear-gradient(135deg, #f97316 0%, #ea580c 100%);
          color: #ffffff;
          font-weight: 700;
          font-size: 13.5px;
          padding: 11px 24px;
          border-radius: 999px;
          text-decoration: none;
          box-shadow: 0 4px 14px rgba(249,115,22,0.28);
          transition: transform 0.2s ease, box-shadow 0.2s ease, filter 0.2s ease;
        }
        .tos-cta-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 20px rgba(249,115,22,0.38);
          filter: brightness(1.05);
        }
        .tos-cta-btn:active {
          transform: translateY(0);
          filter: brightness(0.95);
        }

        /* ═══════════════════════════════════════
           RESPONSIVE — mobile-first, scale UP
        ═══════════════════════════════════════ */
        @media (min-width: 480px) {
          .tos-title { font-size: 34px; }
        }

        @media (min-width: 640px) {
          .tos-section { padding: 104px 0 64px; }
          .tos-container { padding: 0 24px; }
          .tos-title { font-size: clamp(2rem, 4vw, 3rem); }
          .tos-notice p { font-size: 14px; }
          .tos-block h2 { font-size: 17px; }
          .tos-block p { font-size: 15px; }
          .tos-sections { gap: 36px; }
          .tos-cta { padding: 28px 32px; }
          .tos-cta p { font-size: 14px; }
        }

        @media (min-width: 960px) {
          .tos-header { margin-bottom: 48px; }
        }
      `}</style>
    </PageLayout>
  );
}