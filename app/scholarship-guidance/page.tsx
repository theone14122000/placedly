import ServiceDetailPage from '../components/ServiceDetailPage';

export default function Page() {
  return (
    <ServiceDetailPage config={{
      breadcrumb: 'Scholarship Guidance',
      tag: 'Study Abroad Services',
      title: 'Scholarship Guidance to Fund Your Education',
      subtitle: 'Identify and apply for merit, need-based, and country-specific scholarships to reduce your study abroad costs.',
      stats: [
        { value: '£2M+', label: 'Scholarships Secured' },
        { value: '60+', label: 'Scholarship Programs Tracked' },
        { value: '450+', label: 'Students Funded' },
      ],
      ctaPrimaryLabel: 'Find My Scholarships',
      ctaPrimaryHref: '/study-visa#apply',
      ctaSecondaryLabel: 'See Study Abroad Program',
      ctaSecondaryHref: '/study-visa',
      overviewHeading: 'Don\'t Leave Free Money on the Table',
      overviewBody: 'Thousands of scholarships go unclaimed every year simply because students don\'t know they exist or run out of time to apply. We track merit-based, need-based, and country-specific scholarship programs across our partner universities and help you build strong applications before deadlines close.',
      featuresHeading: "What's Included",
      features: [
        { title: 'Scholarship Matching', desc: 'Personalized list of scholarships you\'re eligible for based on your profile.' },
        { title: 'Application Support', desc: 'Help drafting scholarship essays and completing application forms.' },
        { title: 'Deadline Tracking', desc: 'We track every deadline so you never miss a funding opportunity.' },
        { title: 'Financial Aid Strategy', desc: 'Combining scholarships, aid, and loans into a realistic funding plan.' },
      ],
      processHeading: 'How It Works',
      process: [
        { title: 'Eligibility Review', desc: 'We assess your academic and financial profile for scholarship fit.' },
        { title: 'Scholarship Shortlist', desc: 'Receive a curated list of scholarships to apply for.' },
        { title: 'Application Support', desc: 'Get help with essays, forms, and required documentation.' },
        { title: 'Submission & Tracking', desc: 'We track outcomes and follow up on your behalf where possible.' },
      ],
      faqs: [
        { q: 'Are scholarships guaranteed?', a: 'No, but we maximize your chances by matching you to scholarships aligned with your profile.' },
        { q: 'Do scholarships cover full tuition?', a: 'Some do, but most cover partial tuition — we help build a full funding plan.' },
        { q: 'Is this service free?', a: 'Scholarship guidance is included as part of our Study Abroad program.' },
      ],
      finalHeading: 'Make Your Education More Affordable',
      finalSub: 'Find out which scholarships you qualify for today.',
      finalCtaLabel: 'Get Started',
      finalCtaHref: '/study-visa#apply',
    }} />
  );
}