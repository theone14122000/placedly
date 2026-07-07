import ServiceDetailPage from '../components/ServiceDetailPage';

export default function Page() {
  return (
    <ServiceDetailPage config={{
      breadcrumb: 'LinkedIn Profile Enhancement',
      tag: 'Career Services',
      title: 'LinkedIn Profile Enhancement',
      subtitle: 'Turn your LinkedIn into a recruiter magnet — optimized headline, summary, and keyword strategy that gets you found for the right roles.',
      stats: [
        { value: '5.6x', label: 'Profile Views' },
        { value: '3x', label: 'Recruiter InMails' },
        { value: '900+', label: 'Profiles Optimized' },
      ],
      ctaPrimaryLabel: 'Optimize My Profile',
      ctaPrimaryHref: '/contact',
      ctaSecondaryLabel: 'See CAP Program',
      ctaSecondaryHref: '/cap',
      overviewHeading: 'Your LinkedIn Is Your First Impression',
      overviewBody: 'Recruiters search LinkedIn before they open your resume. A weak headline or generic summary means you never show up in the search results that matter. We rewrite your entire profile — headline, about section, experience descriptions, and skills — to align with recruiter search behavior in your target industry.',
      featuresHeading: "What's Included",
      features: [
        { title: 'Keyword-Rich Headline', desc: 'A headline built around the exact terms recruiters search for in your field.' },
        { title: 'Compelling About Section', desc: 'A narrative summary that positions your career story with clarity and confidence.' },
        { title: 'Experience Rewrite', desc: 'Each role rewritten with measurable outcomes, not just responsibilities.' },
        { title: 'Skills & Endorsement Strategy', desc: 'Guidance on which skills to prioritize for maximum discoverability.' },
      ],
      processHeading: 'How It Works',
      process: [
        { title: 'Profile Audit', desc: 'We review your current profile and identify visibility gaps.' },
        { title: 'Strategy Call', desc: 'A short call to understand your target roles and career goals.' },
        { title: 'Content Rewrite', desc: 'We deliver optimized copy for every section of your profile.' },
        { title: 'Implementation Support', desc: 'We guide you through publishing the changes live.' },
      ],
      faqs: [
        { q: 'Do you post on my behalf?', a: 'No — we provide the optimized content and guide you through updating it yourself for authenticity.' },
        { q: 'Will this help with passive job search?', a: 'Yes, an optimized profile means recruiters find you even when you\'re not actively applying.' },
        { q: 'Is a professional photo included?', a: 'We provide guidance on photo selection, but photography itself is not included.' },
      ],
      finalHeading: 'Get Found by the Right Recruiters',
      finalSub: 'A stronger LinkedIn presence starts with one conversation.',
      finalCtaLabel: 'Start Now',
      finalCtaHref: '/contact',
    }} />
  );
}
