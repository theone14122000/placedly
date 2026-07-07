import ServiceDetailPage from '../components/ServiceDetailPage';

export default function Page() {
  return (
    <ServiceDetailPage config={{
      breadcrumb: 'Application Assistance',
      tag: 'Study Abroad Services',
      title: 'University Application Assistance',
      subtitle: 'End-to-end support managing applications across multiple universities — documents, deadlines, and portals, all in one place.',
      stats: [
        { value: '140+', label: 'Universities Supported' },
        { value: '1', label: 'Streamlined Process' },
        { value: '2,000+', label: 'Applications Managed' },
      ],
      ctaPrimaryLabel: 'Start My Application',
      ctaPrimaryHref: '/study-visa#apply',
      ctaSecondaryLabel: 'See Study Abroad Program',
      ctaSecondaryHref: '/study-visa',
      overviewHeading: 'One Profile, Multiple Applications',
      overviewBody: 'Applying to multiple universities means juggling different portals, document formats, and deadlines. We centralize your application process — upload your documents once, and we manage submission across every university on your shortlist, tracking deadlines and requirements so nothing slips through.',
      featuresHeading: "What's Included",
      features: [
        { title: 'Centralized Document Upload', desc: 'Upload transcripts, SOPs, and LORs once — reused across all applications.' },
        { title: 'Multi-University Submission', desc: 'We handle submission across every university portal on your shortlist.' },
        { title: 'Deadline Management', desc: 'Automated tracking so no application deadline is ever missed.' },
        { title: 'Application Status Dashboard', desc: 'Real-time visibility into where each application stands.' },
      ],
      processHeading: 'How It Works',
      process: [
        { title: 'Document Collection', desc: 'Upload all required documents to your Placedly profile once.' },
        { title: 'Application Review', desc: 'We verify every application meets each university\'s requirements.' },
        { title: 'Submission', desc: 'Applications are submitted across all shortlisted universities.' },
        { title: 'Status Tracking', desc: 'Track responses and next steps from a single dashboard.' },
      ],
      faqs: [
        { q: 'How many universities can I apply to?', a: 'There\'s no fixed limit — most students apply to 5-8 universities through our process.' },
        { q: 'Do I need to fill separate forms for each university?', a: 'No, we manage submission across portals using your centralized profile and documents.' },
        { q: 'What if a university requires additional documents?', a: 'We notify you immediately and help you complete any additional requirements.' },
      ],
      finalHeading: 'Simplify Your Application Process',
      finalSub: 'Manage every application from one place, stress-free.',
      finalCtaLabel: 'Get Started',
      finalCtaHref: '/study-visa#apply',
    }} />
  );
}