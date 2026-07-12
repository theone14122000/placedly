import ServiceDetailPage from '../components/ServiceDetailPage';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'ATS Resume Review & Scan Services | Placedly',
  description: "Placedly's ATS resume review checks your resume against real applicant tracking system parameters, identifying formatting and keyword issues causing rejections.",
};

export default function Page() {
  return (
    <ServiceDetailPage config={{
      breadcrumb: 'ATS Resume Review',
      tag: 'Career Services',
      title: 'ATS Resume Review – Find Out Why Your Resume Isn\'t Getting Through',
      subtitle: "Placedly's ATS resume review checks your resume against real applicant tracking system parameters, identifying formatting and keyword issues causing rejections.",
      stats: [
        { value: '75%+', label: 'Filtered Out by ATS' },
        { value: '100%', label: 'Compatibility Check' },
        { value: 'Line-by-Line', label: 'Actionable Feedback' },
      ],
      ctaPrimaryLabel: 'Scan My Resume',
      ctaPrimaryHref: '/tools#ats-resume',
      ctaSecondaryLabel: 'Talk to an Advisor',
      ctaSecondaryHref: '/contact',
      overviewHeading: 'Is Your Resume Reaching a Human?',
      overviewBody: "A large share of resumes never reach a human recruiter at all — they're filtered out by applicant tracking system (ATS) software before anyone sees them. This happens for reasons candidates often don't realise: unsupported formatting, missing keywords, tables or graphics that don't parse correctly, or a structure that confuses the software's parsing logic. Placedly's ATS resume review service is a diagnostic check specifically for this problem. We run your resume through the same lens applicant tracking systems use, identifying exactly where it's likely to fail — whether that's a formatting issue, a keyword gap against your target job descriptions, or a structural problem that's quietly costing you interviews. This isn't a generic proofread. It's a targeted analysis focused on one outcome: making sure your resume actually reaches a recruiter's desk instead of getting filtered out at the first automated step. Most candidates assume a rejection means they weren't qualified — when often the real issue is that the resume never made it past the software. Placedly's ATS review gives you clarity on this specific, fixable problem, so you're not repeating the same mistakes across dozens of applications without knowing why they're not converting into interviews.",
      featuresHeading: "What's Included",
      features: [
        { title: 'ATS Compatibility Check', desc: 'Full ATS compatibility check across formatting, fonts, and file structure.' },
        { title: 'Keyword Gap Analysis', desc: 'Keyword gap analysis against real job descriptions in your target field.' },
        { title: 'Structural Issue ID', desc: 'Identification of structural issues like tables, columns, or graphics that break parsing.' },
        { title: 'Actionable Feedback', desc: 'Line-by-line, actionable feedback on what to fix and why.' },
        { title: 'Before-and-After Comparison', desc: 'Before-and-after comparison so you can see the impact of each fix.' },
        { title: 'Submission Guidance', desc: 'Guidance on file format and naming conventions for submissions.' },
      ],
      processHeading: 'How It Works',
      process: [
        { title: '1. Submit Resume', desc: 'Submit your current resume and target job descriptions or industry.' },
        { title: '2. Detailed Analysis', desc: 'We run a detailed ATS compatibility and keyword gap analysis.' },
        { title: '3. Receive Report', desc: 'You receive a report highlighting specific issues and fixes.' },
        { title: '4. Implement Changes', desc: 'Optional follow-up support to implement the recommended changes.' },
        { title: '5. Final Check', desc: 'Final check to confirm the resume is now ATS-ready.' },
      ],
      faqs: [
        { q: 'Is this different from resume optimization?', a: 'Yes. ATS review is a focused diagnostic on compatibility and keyword gaps, while resume optimization is a full rebuild. Many candidates use ATS review first to understand the issues, then move to full optimization.' },
        { q: 'Can I fix the issues myself after the review?', a: "Yes, the report is detailed enough for you to make the changes yourself, though we're also available to help implement them." },
        { q: 'Does this work for any industry?', a: 'Yes, we tailor the keyword analysis to your specific target industry, whether that\'s BPO, KPO, IT, or MNC roles.' },
      ],
      finalHeading: 'Get Your Resume ATS-Reviewed',
      finalSub: "Get your resume ATS-reviewed by Placedly before you send out your next application.",
      finalCtaLabel: 'Scan My Resume',
      finalCtaHref: '/tools#ats-resume',
    }} />
  );
}