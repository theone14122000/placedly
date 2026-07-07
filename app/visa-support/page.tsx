import ServiceDetailPage from '../components/ServiceDetailPage';

export default function Page() {
  return (
    <ServiceDetailPage config={{
      breadcrumb: 'Visa Support',
      tag: 'Study Abroad Services',
      title: 'Student Visa Support, Done Right',
      subtitle: 'Complete guidance on visa documentation, financial proof, and interview preparation for the UK, France, Germany, and Dubai.',
      stats: [
        { value: '97%', label: 'Visa Approval Rate' },
        { value: '4', label: 'Countries Supported' },
        { value: '1,800+', label: 'Visas Processed' },
      ],
      ctaPrimaryLabel: 'Start My Visa Process',
      ctaPrimaryHref: '/study-visa#apply',
      ctaSecondaryLabel: 'See Study Abroad Program',
      ctaSecondaryHref: '/study-visa',
      overviewHeading: 'Visa Rejections Are Preventable',
      overviewBody: 'Most student visa rejections come down to incomplete documentation or weak financial proof — not eligibility. Our visa support service walks you through every requirement for your destination country, reviews your documents before submission, and prepares you for visa interviews where applicable.',
      featuresHeading: "What's Included",
      features: [
        { title: 'Document Checklist & Review', desc: 'Country-specific checklists with document review before submission.' },
        { title: 'Financial Proof Guidance', desc: 'Help structuring bank statements and sponsorship documents correctly.' },
        { title: 'Visa Interview Coaching', desc: 'Mock visa interviews for countries that require an interview stage.' },
        { title: 'Application Tracking', desc: 'We monitor your visa application status and flag issues early.' },
      ],
      processHeading: 'How It Works',
      process: [
        { title: 'Document Collection', desc: 'We provide a checklist specific to your destination country.' },
        { title: 'Document Review', desc: 'Every document is reviewed for compliance before submission.' },
        { title: 'Application Submission', desc: 'Support through the online or in-person visa application process.' },
        { title: 'Interview Prep', desc: 'Mock interview practice for countries requiring visa interviews.' },
      ],
      faqs: [
        { q: 'Which countries do you support?', a: 'UK, France, Germany, and Dubai/UAE student visa processes are fully supported.' },
        { q: 'What if my visa gets rejected?', a: 'We help you understand the rejection reason and support a reapplication where possible.' },
        { q: 'How long does visa processing take?', a: 'This varies by country — typically 3-8 weeks depending on destination and season.' },
      ],
      finalHeading: 'Get Your Visa Right the First Time',
      finalSub: 'Start your visa process with expert document review.',
      finalCtaLabel: 'Get Started',
      finalCtaHref: '/study-visa#apply',
    }} />
  );
}