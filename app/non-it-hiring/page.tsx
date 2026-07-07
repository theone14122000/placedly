import ServiceDetailPage from '../components/ServiceDetailPage';

export default function Page() {
  return (
    <ServiceDetailPage config={{
      breadcrumb: 'Non-IT Hiring',
      tag: 'Placement Services',
      title: 'Non-IT Hiring Across Industries',
      subtitle: 'Placement support for sales, marketing, finance, operations, HR, and healthcare roles outside the tech ecosystem.',
      stats: [
        { value: '18+', label: 'Non-IT Partners' },
        { value: '6', label: 'Industries Covered' },
        { value: '700+', label: 'Non-IT Placements' },
      ],
      ctaPrimaryLabel: 'View Non-IT Roles',
      ctaPrimaryHref: '/vacancies?sector=non-it',
      ctaSecondaryLabel: 'Talk to an Advisor',
      ctaSecondaryHref: '/contact',
      overviewHeading: 'Great Careers Exist Outside of Tech',
      overviewBody: 'Not every great career runs through a codebase. We place candidates into sales, marketing, finance, HR, operations, and healthcare roles — working with employers across industries who value domain expertise over technical stacks.',
      featuresHeading: "What's Included",
      features: [
        { title: 'Cross-Industry Role Access', desc: 'Roles across sales, marketing, finance, HR, ops, and healthcare sectors.' },
        { title: 'Domain-Specific Coaching', desc: 'Interview prep tailored to the specific expectations of your industry.' },
        { title: 'Career Transition Support', desc: 'Guidance for candidates switching industries or functions.' },
        { title: 'Compensation Benchmarking', desc: 'Salary insights specific to your role and industry.' },
      ],
      processHeading: 'How It Works',
      process: [
        { title: 'Profile Assessment', desc: 'We understand your background, skills, and target industry.' },
        { title: 'Role Matching', desc: 'Matched to relevant openings across our non-IT partner network.' },
        { title: 'Interview Prep', desc: 'Coaching tailored to the specific role and industry norms.' },
        { title: 'Offer & Placement', desc: 'Full support through offer negotiation and joining.' },
      ],
      faqs: [
        { q: 'Which industries do you cover?', a: 'Sales, marketing, finance, HR, operations, healthcare, and general management roles.' },
        { q: 'Can I switch industries?', a: 'Yes — we specialize in helping candidates transition into new functions or sectors.' },
        { q: 'Is there a fee to apply?', a: 'No, our success-share model means you only pay after being placed.' },
      ],
      finalHeading: 'Find Your Next Role, Beyond Tech',
      finalSub: 'Browse current non-IT openings across our network.',
      finalCtaLabel: 'View Open Roles',
      finalCtaHref: '/vacancies?sector=non-it',
    }} />
  );
}