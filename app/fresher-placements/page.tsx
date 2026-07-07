import ServiceDetailPage from '../components/ServiceDetailPage';

export default function Page() {
  return (
    <ServiceDetailPage config={{
      breadcrumb: 'Fresher Placements',
      tag: 'Placement Services',
      title: 'Fresher Placements, Guided From Day One',
      subtitle: 'No experience, no problem. We help freshers build job-ready profiles and place them into entry-level roles with real growth potential.',
      stats: [
        { value: '600+', label: 'Freshers Placed' },
        { value: '30 Days', label: 'Avg. Time to Offer' },
        { value: '25+', label: 'Hiring Partners' },
      ],
      ctaPrimaryLabel: 'Start My Fresher Journey',
      ctaPrimaryHref: '/vacancies?level=fresher',
      ctaSecondaryLabel: 'See CAP Program',
      ctaSecondaryHref: '/cap',
      overviewHeading: 'Your First Job Sets the Tone — We Help You Get It Right',
      overviewBody: 'Freshers face a unique catch-22: no experience means no interviews, and no interviews means no experience. We work with employers who actively hire freshers, and prepare candidates with the resume, interview, and skill polish needed to compete for those roles.',
      featuresHeading: "What's Included",
      features: [
        { title: 'Entry-Level Role Matching', desc: 'Access to roles specifically open to freshers and recent graduates.' },
        { title: 'Skill Gap Coaching', desc: 'Guidance on which skills to build to become interview-ready fast.' },
        { title: 'Resume Built From Scratch', desc: 'We help freshers build a compelling first resume, even with limited experience.' },
        { title: 'First-Job Interview Coaching', desc: 'Tailored coaching for candidates interviewing for the first time.' },
      ],
      processHeading: 'How It Works',
      process: [
        { title: 'Profile Assessment', desc: 'We evaluate your education, projects, and career interests.' },
        { title: 'Resume & Skill Prep', desc: 'Build a fresher-friendly resume and close key skill gaps.' },
        { title: 'Role Matching', desc: 'Get matched to entry-level openings across our partner network.' },
        { title: 'Interview & Placement', desc: 'Full interview support until you receive and accept an offer.' },
      ],
      faqs: [
        { q: 'Do I need prior internship experience?', a: 'No — we work with candidates straight out of college with zero prior work experience.' },
        { q: 'What sectors hire freshers through Placedly?', a: 'BPO/KPO, IT support, operations, and entry-level finance roles are most common.' },
        { q: 'When do I pay?', a: 'Our success-share model means you only pay a fee after you accept and join a role.' },
      ],
      finalHeading: 'Your Career Starts Here',
      finalSub: 'Browse fresher-friendly roles or talk to an advisor today.',
      finalCtaLabel: 'View Fresher Roles',
      finalCtaHref: '/vacancies?level=fresher',
    }} />
  );
}