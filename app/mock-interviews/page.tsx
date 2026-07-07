import ServiceDetailPage from '../components/ServiceDetailPage';

export default function Page() {
  return (
    <ServiceDetailPage config={{
      breadcrumb: 'Mock Interviews',
      tag: 'Career Services',
      title: 'Mock Interviews With Real Feedback',
      subtitle: 'Practice with industry professionals in realistic interview simulations — then get direct, actionable feedback to sharpen your answers.',
      stats: [
        { value: '4.8/5', label: 'Avg. Candidate Rating' },
        { value: '60 Min', label: 'Per Session' },
        { value: '2,000+', label: 'Mock Interviews Run' },
      ],
      ctaPrimaryLabel: 'Book a Mock Interview',
      ctaPrimaryHref: '/contact',
      ctaSecondaryLabel: 'See CAP Program',
      ctaSecondaryHref: '/cap',
      overviewHeading: 'Practice Like It\'s the Real Thing',
      overviewBody: 'Confidence comes from repetition. Our mock interviews simulate real hiring conversations — behavioral, technical, and situational — conducted by advisors with actual hiring experience in your target industry, so the feedback you get is grounded in what real interviewers look for.',
      featuresHeading: "What's Included",
      features: [
        { title: 'Role-Specific Simulation', desc: 'Interviews tailored to your exact job title, seniority, and industry.' },
        { title: 'Recorded Session', desc: 'Review your own body language, tone, and pacing after the call.' },
        { title: 'Structured Feedback Report', desc: 'A written breakdown of strengths and specific areas to improve.' },
        { title: 'Follow-Up Session', desc: 'One free follow-up mock interview to apply the feedback.' },
      ],
      processHeading: 'How It Works',
      process: [
        { title: 'Share Job Details', desc: 'Tell us the role and company type you\'re preparing for.' },
        { title: 'Schedule Session', desc: 'Pick a slot that works for you — sessions run 7 days a week.' },
        { title: 'Live Mock Interview', desc: 'A 45-60 minute simulated interview with a real advisor.' },
        { title: 'Get Feedback', desc: 'Receive your recording and written feedback within 24 hours.' },
      ],
      faqs: [
        { q: 'Who conducts the interviews?', a: 'Advisors with real hiring and recruitment experience in your target industry.' },
        { q: 'Can I request a specific interview type?', a: 'Yes — behavioral, technical, case-based, or panel-style formats are all available.' },
        { q: 'How many sessions can I book?', a: 'CAP candidates get unlimited mock interviews throughout their placement journey.' },
      ],
      finalHeading: 'Walk In Ready, Not Nervous',
      finalSub: 'Book your first mock interview and get feedback within a day.',
      finalCtaLabel: 'Book Now',
      finalCtaHref: '/contact',
    }} />
  );
}