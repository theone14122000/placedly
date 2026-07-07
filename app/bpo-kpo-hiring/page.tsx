import ServiceDetailPage from '../components/ServiceDetailPage';

export default function Page() {
  return (
    <ServiceDetailPage config={{
      breadcrumb: 'BPO / KPO Hiring',
      tag: 'Placement Services',
      title: 'BPO & KPO Hiring, Simplified',
      subtitle: 'Direct placement into leading BPO and KPO firms — voice, non-voice, back-office, and analytics roles with fast turnaround.',
      stats: [
        { value: '15+', label: 'BPO/KPO Partners' },
        { value: '7 Days', label: 'Avg. Time to Interview' },
        { value: '800+', label: 'BPO/KPO Placements' },
      ],
      ctaPrimaryLabel: 'View BPO/KPO Roles',
      ctaPrimaryHref: '/vacancies?sector=bpo-kpo',
      ctaSecondaryLabel: 'Talk to an Advisor',
      ctaSecondaryHref: '/contact',
      overviewHeading: 'Fast-Moving Hiring for a Fast-Moving Industry',
      overviewBody: 'BPO and KPO hiring moves quickly, with high-volume openings across voice support, technical support, back-office processing, and research/analytics. We maintain direct relationships with hiring teams at major BPO/KPO firms to place candidates quickly and accurately into roles that match their communication skills and domain interest.',
      featuresHeading: "What's Included",
      features: [
        { title: 'Voice & Non-Voice Matching', desc: 'Roles matched to your communication strengths and shift preferences.' },
        { title: 'Domain-Specific Roles', desc: 'Access to KPO roles in research, analytics, and specialized back-office functions.' },
        { title: 'Fast-Track Interviews', desc: 'Direct scheduling with hiring teams — often within a week of application.' },
        { title: 'Shift & Location Flexibility', desc: 'Roles across shifts and work models, including remote and hybrid options.' },
      ],
      processHeading: 'How It Works',
      process: [
        { title: 'Profile Screening', desc: 'Quick assessment of communication skills and role fit.' },
        { title: 'Role Matching', desc: 'Matched to open positions across our BPO/KPO partner network.' },
        { title: 'Fast-Track Interview', desc: 'Direct interview scheduling, often within days.' },
        { title: 'Offer & Onboarding', desc: 'Support through offer acceptance and joining formalities.' },
      ],
      faqs: [
        { q: 'Do I need prior BPO experience?', a: 'No — many roles are open to freshers and career switchers with strong communication skills.' },
        { q: 'Are night shift roles available?', a: 'Yes, we place candidates across day, night, and rotational shift roles.' },
        { q: 'What is the typical hiring timeline?', a: 'Most candidates interview within a week and receive offers shortly after.' },
      ],
      finalHeading: 'Get Placed in BPO/KPO, Fast',
      finalSub: 'Browse current openings across our partner network.',
      finalCtaLabel: 'View Open Roles',
      finalCtaHref: '/vacancies?sector=bpo-kpo',
    }} />
  );
}