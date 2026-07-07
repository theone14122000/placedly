import ServiceDetailPage from '../components/ServiceDetailPage';

export default function Page() {
  return (
    <ServiceDetailPage config={{
      breadcrumb: 'IT Hiring',
      tag: 'Placement Services',
      title: 'IT Hiring for Developers & Tech Talent',
      subtitle: 'From software developers to DevOps engineers — placement into IT roles matched to your tech stack and experience level.',
      stats: [
        { value: '20+', label: 'Tech Hiring Partners' },
        { value: '₹9L-₹35L', label: 'CTC Range Placed' },
        { value: '500+', label: 'IT Placements' },
      ],
      ctaPrimaryLabel: 'View IT Roles',
      ctaPrimaryHref: '/vacancies?sector=it',
      ctaSecondaryLabel: 'Talk to an Advisor',
      ctaSecondaryHref: '/contact',
      overviewHeading: 'Tech Hiring That Understands Tech',
      overviewBody: 'Generic recruiters often can\'t tell a good match from a buzzword-matched resume. Our IT hiring vertical works with tech-literate advisors who understand stacks, seniority signals, and what hiring managers in engineering, QA, DevOps, and data actually look for — resulting in more relevant matches and faster placements.',
      featuresHeading: "What's Included",
      features: [
        { title: 'Stack-Specific Matching', desc: 'Roles matched to your exact tech stack — frontend, backend, mobile, cloud, and more.' },
        { title: 'Technical Interview Prep', desc: 'Mock technical rounds including DSA, system design, and stack-specific questions.' },
        { title: 'Portfolio & GitHub Review', desc: 'Feedback on your portfolio, GitHub profile, and project presentation.' },
        { title: 'Startup & Enterprise Access', desc: 'Roles across early-stage startups and large enterprise tech teams.' },
      ],
      processHeading: 'How It Works',
      process: [
        { title: 'Tech Profile Review', desc: 'We assess your stack, experience level, and career goals.' },
        { title: 'Role Matching', desc: 'Matched to open roles across our tech partner network.' },
        { title: 'Technical Prep', desc: 'Mock technical interviews tailored to the specific role.' },
        { title: 'Offer Support', desc: 'Negotiation and offer support through to joining.' },
      ],
      faqs: [
        { q: 'What tech stacks do you place for?', a: 'Frontend, backend, full-stack, mobile, DevOps, data engineering, and QA automation roles.' },
        { q: 'Do you support remote roles?', a: 'Yes, many of our partner companies offer remote and hybrid tech roles.' },
        { q: 'Is technical interview prep included?', a: 'Yes — technical mock interviews are included as part of the placement process.' },
      ],
      finalHeading: 'Build Your Tech Career With Us',
      finalSub: 'Browse open developer and tech roles today.',
      finalCtaLabel: 'View IT Roles',
      finalCtaHref: '/vacancies?sector=it',
    }} />
  );
}