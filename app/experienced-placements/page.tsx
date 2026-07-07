import ServiceDetailPage from '../components/ServiceDetailPage';

export default function Page() {
  return (
    <ServiceDetailPage config={{
      breadcrumb: 'Experienced Professional Placements',
      tag: 'Placement Services',
      title: 'Placements for Experienced Professionals',
      subtitle: 'Strategic career moves for mid-to-senior professionals — matched to roles that align with your experience, compensation goals, and growth trajectory.',
      stats: [
        { value: '₹18L', label: 'Avg. Placement CTC' },
        { value: '400+', label: 'Professionals Placed' },
        { value: '20+', label: 'Years Combined Recruiter Exp.' },
      ],
      ctaPrimaryLabel: 'Explore Senior Roles',
      ctaPrimaryHref: '/vacancies?level=experienced',
      ctaSecondaryLabel: 'See CAP Program',
      ctaSecondaryHref: '/cap',
      overviewHeading: 'Experienced Hiring Is a Different Game',
      overviewBody: 'For experienced professionals, the challenge isn\'t finding any job — it\'s finding the right one at the right compensation, without wasting months in a passive search. We work with mid and senior-level candidates to identify roles that match their trajectory, negotiate compensation, and manage the process discreetly.',
      featuresHeading: "What's Included",
      features: [
        { title: 'Targeted Role Curation', desc: 'Only roles matching your seniority, compensation band, and career direction.' },
        { title: 'Confidential Search Support', desc: 'Discreet job search assistance for professionals currently employed.' },
        { title: 'Compensation Benchmarking', desc: 'Market data to help you negotiate from a position of knowledge.' },
        { title: 'Executive Interview Coaching', desc: 'Coaching calibrated to senior-level interview formats and panels.' },
      ],
      processHeading: 'How It Works',
      process: [
        { title: 'Career Consultation', desc: 'A deep-dive call to understand your experience and goals.' },
        { title: 'Market Mapping', desc: 'We identify roles and companies matching your profile.' },
        { title: 'Curated Introductions', desc: 'Only relevant, vetted opportunities are shared with you.' },
        { title: 'Offer Negotiation', desc: 'Support through final offer discussions and negotiation.' },
      ],
      faqs: [
        { q: 'Is this confidential if I\'m currently employed?', a: 'Yes, we handle all searches discreetly and never share your profile without consent.' },
        { q: 'What experience levels do you support?', a: 'From 3+ years of experience up to senior leadership and director-level roles.' },
        { q: 'Do you help with compensation negotiation?', a: 'Yes, we provide market benchmarking and negotiation support once an offer is extended.' },
      ],
      finalHeading: 'Make Your Next Move Count',
      finalSub: 'Let\'s find a role that matches where you want to go next.',
      finalCtaLabel: 'Talk to an Advisor',
      finalCtaHref: '/contact',
    }} />
  );
}