import ServiceDetailPage from '../components/ServiceDetailPage';

export default function Page() {
  return (
    <ServiceDetailPage config={{
      breadcrumb: 'Resume Optimization',
      tag: 'Career Services',
      title: 'Resume Optimization That Gets You Noticed',
      subtitle: 'We rewrite your resume with achievement-led content, ATS-safe formatting, and keyword targeting so recruiters — and algorithms — see your best self first.',
      stats: [
        { value: '2.3x', label: 'More Callbacks' },
        { value: '48 Hrs', label: 'Turnaround' },
        { value: '1,200+', label: 'Resumes Revamped' },
      ],
      ctaPrimaryLabel: 'Get My Resume Reviewed',
      ctaPrimaryHref: '/contact',
      ctaSecondaryLabel: 'See CAP Program',
      ctaSecondaryHref: '/cap',
      overviewHeading: 'Why Your Resume Needs a Rewrite',
      overviewBody: 'Most resumes fail before a human ever reads them — filtered out by Applicant Tracking Systems, buried under generic bullet points, or missing the exact keywords a recruiter searched for. Our resume optimization service rebuilds your resume from the ground up: structured for ATS parsing, written in outcome-driven language, and tailored to the roles you\'re actually targeting.',
      featuresHeading: "What's Included",
      features: [
        { title: 'Keyword-Optimized Content', desc: 'We map your resume against real job descriptions in your target role so it passes ATS keyword scans.' },
        { title: 'Achievement-Led Bullet Points', desc: 'Generic duties rewritten into quantified, impact-driven statements recruiters actually remember.' },
        { title: 'ATS-Friendly Formatting', desc: 'Clean, parseable layout tested against major ATS platforms — no tables, columns, or graphics that break parsing.' },
        { title: 'Industry-Specific Templates', desc: 'Formatting and tone calibrated to your sector — tech, finance, BPO, healthcare, and more.' },
      ],
      processHeading: 'How It Works',
      process: [
        { title: 'Profile Review', desc: 'Send us your current resume and target roles — we audit gaps and opportunities.' },
        { title: 'Draft Rewrite', desc: 'Our writers rebuild your resume with optimized structure and content.' },
        { title: 'Feedback Round', desc: 'You review the draft and request edits — unlimited revisions within scope.' },
        { title: 'Final Delivery', desc: 'Receive your polished, ATS-ready resume in PDF and editable formats.' },
      ],
      faqs: [
        { q: 'How long does the process take?', a: 'Most resumes are delivered within 48 hours of receiving your details and target job descriptions.' },
        { q: 'Is this included in CAP?', a: 'Yes — resume optimization is a core part of our Career Assistance Program at no extra cost.' },
        { q: 'Can you rewrite for a career change?', a: 'Absolutely. We specialize in translating transferable skills for candidates pivoting industries or roles.' },
      ],
      finalHeading: 'Ready for a Resume That Works?',
      finalSub: 'Join 1,200+ candidates who\'ve upgraded their resume with Placedly.',
      finalCtaLabel: 'Start Now',
      finalCtaHref: '/contact',
    }} />
  );
}
