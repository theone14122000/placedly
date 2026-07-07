import ServiceDetailPage from '../components/ServiceDetailPage';

export default function Page() {
  return (
    <ServiceDetailPage config={{
      breadcrumb: 'ATS Resume Review',
      tag: 'Career Services',
      title: 'ATS Resume Review',
      subtitle: 'Find out exactly why your resume isn\'t getting past Applicant Tracking Systems — and fix it with a detailed compatibility report.',
      stats: [
        { value: '92%', label: 'Pass Rate After Fix' },
        { value: '15 Min', label: 'Report Turnaround' },
        { value: '3,000+', label: 'Resumes Scanned' },
      ],
      ctaPrimaryLabel: 'Scan My Resume',
      ctaPrimaryHref: '/tools#ats-resume',
      ctaSecondaryLabel: 'Talk to an Advisor',
      ctaSecondaryHref: '/contact',
      overviewHeading: 'Is Your Resume Even Reaching a Human?',
      overviewBody: 'Over 75% of resumes are rejected by ATS software before a recruiter ever sees them. Our ATS scanner analyzes your resume against real parsing engines, flagging formatting issues, missing keywords, and structural problems — then gives you a clear, actionable report to fix them.',
      featuresHeading: "What's Included",
      features: [
        { title: 'Compatibility Score', desc: 'An instant score showing how well your resume parses through common ATS platforms.' },
        { title: 'Keyword Gap Analysis', desc: 'See which critical keywords from your target job description are missing.' },
        { title: 'Formatting Diagnostics', desc: 'Flags tables, columns, graphics, and fonts that break ATS parsing.' },
        { title: 'Fix Recommendations', desc: 'Clear, prioritized suggestions to improve your score immediately.' },
      ],
      processHeading: 'How It Works',
      process: [
        { title: 'Upload Resume', desc: 'Submit your resume and the job description you\'re targeting.' },
        { title: 'Automated Scan', desc: 'Our tool runs your resume through ATS-simulation parsing.' },
        { title: 'Review Report', desc: 'Receive a detailed breakdown of score, gaps, and formatting issues.' },
        { title: 'Apply Fixes', desc: 'Use our recommendations — or have our team rewrite it for you.' },
      ],
      faqs: [
        { q: 'Is the scan free?', a: 'Yes, a basic ATS scan is free. Detailed rewrites are part of our paid resume optimization service.' },
        { q: 'Which ATS systems do you test against?', a: 'We simulate parsing behavior from the most widely used platforms including Workday, Greenhouse, and Taleo.' },
        { q: 'What if my score is low?', a: 'We recommend our full Resume Optimization service to rebuild your resume from the ground up.' },
      ],
      finalHeading: 'Know Before You Apply',
      finalSub: 'Run a free ATS scan and see exactly where your resume stands.',
      finalCtaLabel: 'Run Free Scan',
      finalCtaHref: '/tools#ats-resume',
    }} />
  );
}