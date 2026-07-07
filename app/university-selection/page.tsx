import ServiceDetailPage from '../components/ServiceDetailPage';

export default function Page() {
  return (
    <ServiceDetailPage config={{
      breadcrumb: 'University Selection',
      tag: 'Study Abroad Services',
      title: 'University Selection Made Simple',
      subtitle: 'Match your academic profile, budget, and career goals to the right universities across the UK, France, Germany, and Dubai.',
      stats: [
        { value: '140+', label: 'Partner Universities' },
        { value: '4', label: 'Countries Covered' },
        { value: '2,000+', label: 'Students Guided' },
      ],
      ctaPrimaryLabel: 'Start My Shortlist',
      ctaPrimaryHref: '/study-visa#apply',
      ctaSecondaryLabel: 'See Study Abroad Program',
      ctaSecondaryHref: '/study-visa',
      overviewHeading: 'The Right University Changes Everything',
      overviewBody: 'Choosing a university isn\'t just about rankings — it\'s about fit: your budget, your career path, your preferred learning style, and post-study work opportunities. Our advisors build a personalized shortlist based on your academic profile and long-term goals, not just generic "top 10" lists.',
      featuresHeading: "What's Included",
      features: [
        { title: 'Profile-Based Shortlisting', desc: 'Universities matched to your grades, budget, and career interests.' },
        { title: 'Course Comparison', desc: 'Side-by-side comparison of curriculum, faculty, and outcomes.' },
        { title: 'Post-Study Work Insights', desc: 'Guidance on which destinations offer the best post-study work visa pathways.' },
        { title: 'Application Fit Scoring', desc: 'Realistic assessment of your admission chances at each shortlisted university.' },
      ],
      processHeading: 'How It Works',
      process: [
        { title: 'Profile Assessment', desc: 'Share your academic records, budget, and career goals.' },
        { title: 'Shortlist Creation', desc: 'Receive a curated list of 5-8 best-fit universities.' },
        { title: 'Deep-Dive Review', desc: 'A call to walk through each option in detail.' },
        { title: 'Final Selection', desc: 'Finalize your target universities before applications begin.' },
      ],
      faqs: [
        { q: 'How many universities will I be shortlisted?', a: 'Typically 5-8 universities balanced across reach, match, and safety options.' },
        { q: 'Can I choose universities outside your partner list?', a: 'Yes, we can also guide applications to non-partner universities upon request.' },
        { q: 'Is this service free?', a: 'University selection guidance is included as part of our Study Abroad program.' },
      ],
      finalHeading: 'Find Your Best-Fit University',
      finalSub: 'Start with a free profile assessment today.',
      finalCtaLabel: 'Get Started',
      finalCtaHref: '/study-visa#apply',
    }} />
  );
}