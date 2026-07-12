import ServiceDetailPage from '../components/ServiceDetailPage';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Non-IT Hiring & Recruitment Services India | Placedly',
  description: "Placedly's non-IT hiring services cover sales, operations, finance, HR, and support functions, connecting candidates to the right roles across industries pan-India.",
};

export default function Page() {
  return (
    <ServiceDetailPage config={{
      breadcrumb: 'Non-IT Hiring',
      tag: 'Placement Services',
      title: 'Non-IT Hiring – Recruitment Across Sales, Operations, Finance & More',
      subtitle: "Placedly's non-IT hiring services cover sales, operations, finance, HR, and support functions, connecting candidates to the right roles across industries pan-India.",
      stats: [
        { value: '18+', label: 'Non-IT Partners' },
        { value: '6', label: 'Industries Covered' },
        { value: '700+', label: 'Non-IT Placements' },
      ],
      ctaPrimaryLabel: 'View Non-IT Roles',
      ctaPrimaryHref: '/vacancies?sector=non-it',
      ctaSecondaryLabel: 'Talk to an Advisor',
      ctaSecondaryHref: '/contact',
      overviewHeading: 'Beyond Tech: Meaningful Careers in Every Function',
      overviewBody: "Not every meaningful career path runs through technology, and not every company's biggest hiring need is a developer. Sales teams need closers, operations need people who can manage complexity calmly, finance needs precision, and HR needs people who genuinely understand people — each of these functions requires its own kind of recruitment expertise. Placedly's non-IT hiring service is built to serve exactly this range. We recruit across sales, operations, finance, HR, administration, and customer support functions, working with companies across multiple industries and sizes, pan-India, to fill roles where functional experience and fit matter more than a narrow technical skill list. Our approach centres on understanding the actual day-to-day demands of a role and matching candidates whose experience and working style genuinely align — rather than just screening for job titles that sound similar on paper. Non-IT hiring is often underserved by recruitment platforms built primarily around tech roles. Placedly treats sales, operations, finance, and HR hiring with the same level of rigour and sector-specific understanding, helping both companies and candidates find matches that hold up beyond the interview stage.",
      featuresHeading: "What's Included",
      features: [
        { title: 'Comprehensive Function Coverage', desc: 'Recruitment across sales, operations, finance, HR, and support functions.' },
        { title: 'Pan-India Access', desc: 'Access to roles across multiple industries and company sizes pan-India.' },
        { title: 'Functional Experience Matching', desc: 'Matching based on functional experience and demonstrated results.' },
        { title: 'Tailored Screening', desc: 'Candidate screening tailored to the specific demands of each function.' },
        { title: 'End-to-End Support', desc: 'End-to-end support from initial application through to offer.' },
        { title: 'Transition Guidance', desc: 'Guidance for candidates transitioning between functions or industries.' },
      ],
      processHeading: 'How It Works',
      process: [
        { title: '1. Requirement Analysis', desc: 'Understanding the specific functional requirement and team context.' },
        { title: '2. Sourcing & Screening', desc: 'Sourcing and screening candidates against functional fit criteria.' },
        { title: '3. Interview Coordination', desc: 'Coordinating interviews across relevant rounds.' },
        { title: '4. Offer Finalisation', desc: 'Supporting offer discussions and finalisation.' },
        { title: '5. Onboarding Follow-up', desc: 'Follow-up to ensure a smooth transition into the new role.' },
      ],
      faqs: [
        { q: 'What functions does this service cover?', a: 'We cover sales, operations, finance, HR, administration, and customer support roles, among other non-IT functions.' },
        { q: 'Is this only for experienced candidates?', a: 'No, we support both entry-level and experienced candidates across these functions, matched to relevant openings.' },
        { q: 'Do you work with companies across different industries?', a: 'Yes, our non-IT hiring network spans multiple industries and company sizes pan-India.' },
      ],
      finalHeading: 'Find Your Next Non-IT Role or Hire the Right Talent',
      finalSub: "Find your next non-IT role or hire the right talent — connect with Placedly's dedicated hiring team.",
      finalCtaLabel: 'View Open Roles',
      finalCtaHref: '/vacancies?sector=non-it',
    }} />
  );
}