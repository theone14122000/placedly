import ServiceDetailPage from '../components/ServiceDetailPage';

export default function Page() {
  return (
    <ServiceDetailPage config={{
      breadcrumb: 'Job Referrals',
      tag: 'Career Services',
      title: 'Job Referrals From Our Employer Network',
      subtitle: 'Skip the black hole of online applications — get directly referred into open roles through our network of hiring partners.',
      stats: [
        { value: '40+', label: 'Partner Companies' },
        { value: '3x', label: 'Higher Response Rate' },
        { value: '1,000+', label: 'Referrals Made' },
      ],
      ctaPrimaryLabel: 'Get Referred',
      ctaPrimaryHref: '/vacancies',
      ctaSecondaryLabel: 'See CAP Program',
      ctaSecondaryHref: '/cap',
      overviewHeading: 'Referrals Open Doors Applications Can\'t',
      overviewBody: 'A referral moves your application to the top of the pile — often bypassing the initial resume screening entirely. Through our network of 40+ hiring partners across tech, BPO, finance, and healthcare, we connect qualified candidates directly to hiring managers.',
      featuresHeading: "What's Included",
      features: [
        { title: 'Employer Network Access', desc: 'Direct introduction to hiring contacts across our partner companies.' },
        { title: 'Profile Matching', desc: 'We match your skills and experience to currently open roles.' },
        { title: 'Warm Introduction', desc: 'Your profile is personally shared with the hiring team, not submitted cold.' },
        { title: 'Status Tracking', desc: 'Get updates on your referral status throughout the process.' },
      ],
      processHeading: 'How It Works',
      process: [
        { title: 'Profile Assessment', desc: 'We review your resume and career goals for fit.' },
        { title: 'Role Matching', desc: 'Your profile is matched against current openings in our network.' },
        { title: 'Warm Referral', desc: 'We introduce you directly to the hiring manager or recruiter.' },
        { title: 'Interview Support', desc: 'You get interview prep support once the referral converts to a call.' },
      ],
      faqs: [
        { q: 'Do I need to pay for referrals?', a: 'Referrals are part of CAP — our success-share model means you only pay after you\'re placed.' },
        { q: 'What industries are covered?', a: 'Tech, BPO/KPO, finance, healthcare, operations, and more — see our live vacancies for current openings.' },
        { q: 'How fast can I get referred?', a: 'Most qualified candidates are referred to at least one matching role within 5-7 business days.' },
      ],
      finalHeading: 'Get In Front of Real Hiring Managers',
      finalSub: 'Browse live roles or let us match you directly.',
      finalCtaLabel: 'View Open Roles',
      finalCtaHref: '/vacancies',
    }} />
  );
}