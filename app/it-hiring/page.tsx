import ServiceDetailPage from '../components/ServiceDetailPage';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'IT Hiring & Recruitment Services India | Placedly',
  description: "Placedly's IT hiring services connect developers, engineers, and IT professionals with the right companies across India, from early-stage startups to large MNCs.",
};

export default function Page() {
  return (
    <ServiceDetailPage config={{
      breadcrumb: 'IT Hiring',
      tag: 'Placement Services',
      title: 'IT Hiring – Connecting Technical Talent with the Right Companies',
      subtitle: "Placedly's IT hiring services connect developers, engineers, and IT professionals with the right companies across India, from early-stage startups to large MNCs.",
      stats: [
        { value: '20+', label: 'Tech Hiring Partners' },
        { value: '₹9L-₹35L', label: 'CTC Range Placed' },
        { value: '500+', label: 'IT Placements' },
      ],
      ctaPrimaryLabel: 'View IT Roles',
      ctaPrimaryHref: '/vacancies?sector=it',
      ctaSecondaryLabel: 'Talk to an Advisor',
      ctaSecondaryHref: '/contact',
      overviewHeading: 'Tech Hiring That Goes Beyond Keywords',
      overviewBody: "Technical hiring comes with its own set of challenges — evaluating real skill versus resume keywords, understanding niche technology stacks, and matching candidates not just to a job title but to the actual working environment and team they'll thrive in. Placedly's IT hiring service bridges the gap between technical talent and growing companies by focusing on genuine skill and project-fit matching, not just keyword overlap. Whether the requirement is software development, QA, infrastructure, or emerging technology roles, we work to understand both what the company actually needs and what the candidate has genuinely built and worked on. We support candidates across the spectrum — from those targeting early-stage startups looking for versatile builders, to those aiming for structured, process-driven roles at larger MNCs — helping match expectations on both sides for a placement that lasts. A resume full of technology keywords doesn't always reflect real hands-on skill, and companies increasingly need recruitment partners who can tell the difference. Placedly's approach to IT hiring goes beyond surface-level matching, helping companies find candidates who can actually deliver, and helping candidates find roles where their real skills are valued.",
      featuresHeading: "What's Included",
      features: [
        { title: 'Comprehensive Role Coverage', desc: 'Recruitment across development, QA, infrastructure, and emerging tech roles.' },
        { title: 'Skill & Project-Fit Matching', desc: 'Matching based on actual technical skills, tools, and project experience.' },
        { title: 'Diverse Company Access', desc: 'Access to opportunities at startups, mid-size companies, and MNCs.' },
        { title: 'Technical Screening', desc: 'Technical screening support to validate candidate skill claims.' },
        { title: 'Interview Guidance', desc: 'Guidance through technical interview rounds and assessments.' },
        { title: 'Tech Compensation Support', desc: 'Support with offer discussions specific to tech compensation structures.' },
      ],
      processHeading: 'How It Works',
      process: [
        { title: '1. Requirement Analysis', desc: 'Understanding the technical requirement and team context.' },
        { title: '2. Sourcing & Screening', desc: 'Sourcing and initial technical screening of candidates.' },
        { title: '3. Interview Coordination', desc: 'Coordinating technical interviews and assessments.' },
        { title: '4. Offer Alignment', desc: 'Supporting offer discussions and compensation alignment.' },
        { title: '5. Onboarding Support', desc: 'Follow-up support through the onboarding process.' },
      ],
      faqs: [
        { q: 'What kind of IT roles do you place?', a: 'We cover a range of roles including development, QA, infrastructure, and emerging technology positions, matched to specific company needs.' },
        { q: 'Do you place candidates at startups as well as large companies?', a: 'Yes, our network spans early-stage startups, mid-size companies, and large MNCs.' },
        { q: 'How do you assess technical skill?', a: "We use structured screening and coordinate technical interview rounds to validate candidates' real, hands-on skills." },
      ],
      finalHeading: 'Looking for Your Next Tech Role?',
      finalSub: "Looking for your next tech role or hiring for one? Connect with Placedly's IT hiring team.",
      finalCtaLabel: 'View IT Roles',
      finalCtaHref: '/vacancies?sector=it',
    }} />
  );
}