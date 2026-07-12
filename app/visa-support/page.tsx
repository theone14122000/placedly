import ServiceDetailPage from '../components/ServiceDetailPage';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Study Abroad Visa Support Services | Placedly',
  description: "Placedly provides end-to-end visa support for study abroad students — documentation, financial proof, and interview preparation for a smoother approval process.",
};

export default function Page() {
  return (
    <ServiceDetailPage config={{
      breadcrumb: 'Visa Support',
      tag: 'Study Abroad Services',
      title: 'Visa Support – Navigate the Process Without the Guesswork',
      subtitle: "Placedly provides end-to-end visa support for study abroad students — documentation, financial proof, and interview preparation for a smoother approval process.",
      stats: [
        { value: '97%', label: 'Visa Approval Rate' },
        { value: '4', label: 'Countries Supported' },
        { value: '1,800+', label: 'Visas Processed' },
      ],
      ctaPrimaryLabel: 'Start My Visa Process',
      ctaPrimaryHref: '/study-visa#apply',
      ctaSecondaryLabel: 'See Study Abroad Program',
      ctaSecondaryHref: '/study-visa',
      overviewHeading: 'Navigate the Process Without the Guesswork',
      overviewBody: "For many students, the student visa process is the most stressful part of the entire study abroad journey — not because the requirements are impossible, but because they're detailed, country-specific, and unforgiving of small mistakes. A missing document or an unclear financial proof can delay or derail months of planning. Placedly's visa support service is designed to remove that uncertainty. We guide students through the specific documentation requirements of their destination country, help prepare and organise financial proof and sponsorship documents correctly, and coach students through the visa interview itself where applicable. Because visa requirements and processing timelines vary significantly by country, we help students plan realistically around these timelines, reducing the risk of last-minute scrambling or avoidable delays. Visa rules change and vary significantly by country, and getting even small details wrong can cause real delays. Placedly stays current on destination-specific requirements and works closely with students to make sure documentation is accurate and complete the first time, reducing avoidable stress during an already demanding period.",
      featuresHeading: "What's Included",
      features: [
        { title: 'Destination-Specific Guidance', desc: 'Step-by-step guidance on destination-specific visa documentation.' },
        { title: 'Financial Proof Support', desc: 'Support organising financial proof and sponsorship documentation.' },
        { title: 'Interview Coaching', desc: 'Visa interview preparation and coaching where required.' },
        { title: 'Timeline Planning', desc: 'Timeline planning to align visa processing with intake deadlines.' },
        { title: 'Application Review', desc: 'Review of application forms before submission to catch errors.' },
        { title: 'Ongoing Support', desc: 'Ongoing support through queries or additional document requests.' },
      ],
      processHeading: 'How It Works',
      process: [
        { title: '1. Requirement Review', desc: "Review of destination country's specific visa requirements." },
        { title: '2. Checklist & Organisation', desc: 'Documentation checklist and organisation support.' },
        { title: '3. Financial Guidance', desc: 'Financial proof and sponsorship documentation guidance.' },
        { title: '4. Interview Prep', desc: 'Visa interview preparation, where applicable.' },
        { title: '5. Final Review & Submission', desc: 'Final review before submission and ongoing support through the process.' },
      ],
      faqs: [
        { q: 'Do visa requirements differ by country?', a: 'Yes, requirements vary significantly by destination, and we tailor our guidance to your specific country and university.' },
        { q: 'Can you guarantee visa approval?', a: 'Visa decisions are made solely by the relevant government authority; we focus on ensuring your application is accurate, complete, and well-prepared.' },
        { q: 'How early should I start the visa process?', a: 'We recommend starting well ahead of your intake deadline, and we help you plan a realistic timeline based on your destination country.' },
      ],
      finalHeading: 'Get Your Visa Process Handled With Confidence',
      finalSub: "Connect with Placedly's visa support team.",
      finalCtaLabel: 'Get Started',
      finalCtaHref: '/study-visa#apply',
    }} />
  );
}