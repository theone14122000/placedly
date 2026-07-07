import ServiceDetailPage from '../components/ServiceDetailPage';

export default function Page() {
  return (
    <ServiceDetailPage config={{
      breadcrumb: 'SOP & LOR Assistance',
      tag: 'Study Abroad Services',
      title: 'SOP & LOR Assistance That Stands Out',
      subtitle: 'Compelling Statements of Purpose and Letters of Recommendation crafted to strengthen your university application.',
      stats: [
        { value: '95%', label: 'Application Success Rate' },
        { value: '48 Hrs', label: 'First Draft Turnaround' },
        { value: '1,500+', label: 'SOPs Written' },
      ],
      ctaPrimaryLabel: 'Get My SOP Started',
      ctaPrimaryHref: '/study-visa#apply',
      ctaSecondaryLabel: 'See Study Abroad Program',
      ctaSecondaryHref: '/study-visa',
      overviewHeading: 'Your Story, Told the Right Way',
      overviewBody: 'Admissions committees read thousands of generic SOPs every cycle. A strong Statement of Purpose tells a specific, authentic story connecting your background to your chosen course and future goals. We help you craft SOPs and coordinate LORs that reflect your genuine voice while meeting each university\'s specific expectations.',
      featuresHeading: "What's Included",
      features: [
        { title: 'Personalized SOP Drafting', desc: 'A unique SOP for each university, tailored to their specific prompts and focus.' },
        { title: 'LOR Guidance for Recommenders', desc: 'Templates and talking points to help your recommenders write strong letters.' },
        { title: 'Multiple Revision Rounds', desc: 'Iterative editing until your SOP is polished and submission-ready.' },
        { title: 'Plagiarism & Quality Check', desc: 'Every SOP is checked for originality and quality before submission.' },
      ],
      processHeading: 'How It Works',
      process: [
        { title: 'Discovery Call', desc: 'We learn about your background, motivations, and goals.' },
        { title: 'First Draft', desc: 'Receive your first SOP draft within 48 hours.' },
        { title: 'Revisions', desc: 'Collaborative editing until the SOP reflects your voice perfectly.' },
        { title: 'LOR Coordination', desc: 'We help structure and guide your letters of recommendation.' },
      ],
      faqs: [
        { q: 'Do you write the SOP for me entirely?', a: 'We co-create it with you — the story and voice are yours, we provide structure and polish.' },
        { q: 'How many universities can I get SOPs for?', a: 'We tailor a unique SOP for each university on your shortlist.' },
        { q: 'Can you help my recommender write a stronger LOR?', a: 'Yes, we provide guidance and templates recommenders can use as a starting point.' },
      ],
      finalHeading: 'Tell Your Story With Confidence',
      finalSub: 'Start your SOP with a free discovery call.',
      finalCtaLabel: 'Get Started',
      finalCtaHref: '/study-visa#apply',
    }} />
  );
}
