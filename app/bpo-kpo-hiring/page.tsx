import ServiceDetailPage from '../components/ServiceDetailPage';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'BPO & KPO Hiring Services India | Placedly',
  description: "Placedly specializes in BPO and KPO hiring across voice, non-voice, back-office, and analytics roles, connecting candidates and companies pan-India.",
};

export default function Page() {
  return (
    <ServiceDetailPage config={{
      breadcrumb: 'BPO / KPO Hiring',
      tag: 'Placement Services',
      title: 'BPO / KPO Hiring – Specialist Recruitment for Voice, Non-Voice & Analytics Roles',
      subtitle: "Placedly specializes in BPO and KPO hiring across voice, non-voice, back-office, and analytics roles, connecting candidates and companies pan-India.",
      stats: [
        { value: '15+', label: 'BPO/KPO Partners' },
        { value: '7 Days', label: 'Avg. Time to Interview' },
        { value: '800+', label: 'BPO/KPO Placements' },
      ],
      ctaPrimaryLabel: 'View BPO/KPO Roles',
      ctaPrimaryHref: '/vacancies?sector=bpo-kpo',
      ctaSecondaryLabel: 'Talk to an Advisor',
      ctaSecondaryHref: '/contact',
      overviewHeading: 'Specialist Recruitment for Real Sector Demands',
      overviewBody: "BPO and KPO hiring isn't a single, uniform process — it spans voice and non-voice roles, back-office operations, and highly analytical KPO functions that each require different skills, temperaments, and evaluation criteria. Generic recruitment approaches often miss these distinctions, resulting in poor-fit placements on both sides. Placedly's BPO/KPO hiring service is built around genuine sector expertise. Our team understands the operational realities of voice processes, the communication and analytical demands of non-voice and back-office roles, and the domain-specific requirements of KPO functions — and we use that understanding to match candidates to roles where they're genuinely likely to succeed and stay. With reach across major BPO/KPO hubs pan-India, we support both high-volume hiring needs and more specialised, niche requirements that demand a more targeted search. BPO and KPO hiring often runs on tight timelines with high volume, but that doesn't mean quality should be sacrificed for speed. Placedly balances both — our sector-specific screening process ensures candidates are matched to the right type of process, reducing early attrition and mismatch issues that generic hiring approaches often create.",
      featuresHeading: "What's Included",
      features: [
        { title: 'Comprehensive Process Coverage', desc: 'Recruitment across voice, non-voice, chat, email, and back-office processes.' },
        { title: 'Specialist KPO Matching', desc: 'Specialist matching for KPO roles requiring analytical or domain expertise.' },
        { title: 'Pan-India Reach', desc: 'Pan-India reach across major BPO/KPO hiring hubs.' },
        { title: 'Volume & Niche Hiring', desc: 'Support for both high-volume and niche, specialised hiring requirements.' },
        { title: 'Process-Fit Screening', desc: 'Candidate screening focused on process-fit and communication skills.' },
        { title: 'Fast Turnaround', desc: 'Fast turnaround to match the pace BPO/KPO hiring typically demands.' },
      ],
      processHeading: 'How It Works',
      process: [
        { title: '1. Requirement Analysis', desc: 'Understanding the specific process type and role requirements.' },
        { title: '2. Sourcing & Screening', desc: 'Sourcing and screening candidates against process-fit criteria.' },
        { title: '3. Interview Coordination', desc: 'Coordinating interviews and assessments as required.' },
        { title: '4. Offer Finalisation', desc: 'Supporting offer discussions and finalisation.' },
        { title: '5. Post-Placement Support', desc: 'Post-placement check-ins to ensure a smooth transition.' },
      ],
      faqs: [
        { q: 'Do you handle both voice and non-voice hiring?', a: 'Yes, our BPO/KPO hiring service covers voice, non-voice, chat, email, and back-office roles.' },
        { q: 'Can you support urgent, high-volume hiring needs?', a: "Yes, we're equipped to handle high-volume hiring timelines common in the BPO/KPO industry, alongside more specialised requirements." },
        { q: 'What KPO domains do you cover?', a: 'We work across a range of KPO functions requiring analytical and domain-specific expertise, matched to the specific requirement.' },
      ],
      finalHeading: 'Partner with Placedly for BPO/KPO Hiring',
      finalSub: "Partner with Placedly for BPO/KPO hiring that understands your industry's real demands.",
      finalCtaLabel: 'View Open Roles',
      finalCtaHref: '/vacancies?sector=bpo-kpo',
    }} />
  );
}