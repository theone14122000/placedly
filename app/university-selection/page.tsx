import ServiceDetailPage from '../components/ServiceDetailPage';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'University Selection Guidance for Study Abroad | Placedly',
  description: "Placedly's study abroad advisors help students shortlist universities based on academic profile, budget, career goals, and country preference.",
};

export default function Page() {
  return (
    <ServiceDetailPage config={{
      breadcrumb: 'University Selection',
      tag: 'Study Abroad Services',
      title: 'University Selection – Choose the Right Fit, Not Just a Big Name',
      subtitle: "Placedly's study abroad advisors help students shortlist universities based on academic profile, budget, career goals, and country preference.",
      stats: [
        { value: '140+', label: 'Partner Universities' },
        { value: '4', label: 'Countries Covered' },
        { value: '2,000+', label: 'Students Guided' },
      ],
      ctaPrimaryLabel: 'Start My Shortlist',
      ctaPrimaryHref: '/study-visa#apply',
      ctaSecondaryLabel: 'See Study Abroad Program',
      ctaSecondaryHref: '/study-visa',
      overviewHeading: 'Choose the Right Fit, Not Just a Big Name',
      overviewBody: "Choosing where to study abroad is one of the most consequential decisions a student will make — it shapes your finances, your daily life for years, and often your early career trajectory. Yet many students end up choosing based on rankings alone or a friend's recommendation, without a clear sense of whether the university actually fits their goals, budget, and academic profile. Placedly's university selection service takes a more grounded approach. We work with students to understand their academic background, career aspirations, budget constraints, and lifestyle preferences, then build a shortlist of universities that genuinely align — rather than a generic list of 'top' schools that may not be the right fit at all. This includes practical guidance on course structure and curriculum, realistic career outcomes for graduates, and location or city-level considerations, so students go into their application phase with a clear, well-reasoned shortlist instead of a scattered guess. A rankings list doesn't account for your specific budget, career goals, or the kind of environment you'll actually thrive in. Placedly's advisors take the time to understand your individual situation, so the university shortlist you end up with is realistic, well-matched, and genuinely improves your chances of both admission and long-term success.",
      featuresHeading: "What's Included",
      features: [
        { title: 'Personalised Shortlist', desc: 'Personalised university shortlist based on academic profile and goals.' },
        { title: 'Budget-Aligned Recommendations', desc: 'Budget-aligned recommendations across a range of university tiers.' },
        { title: 'Course & Career Insights', desc: 'Insights into course structure, curriculum, and career outcomes.' },
        { title: 'Location Guidance', desc: 'Country and city-level guidance matched to student preferences.' },
        { title: 'Comparison Support', desc: 'Comparison support across multiple shortlisted universities.' },
        { title: 'Ongoing Advisory', desc: 'Ongoing advisory through the shortlisting and decision-making process.' },
      ],
      processHeading: 'How It Works',
      process: [
        { title: '1. Initial Consultation', desc: 'Initial consultation covering academic background, goals, and budget.' },
        { title: '2. Research & Shortlist', desc: 'Research and shortlist of universities matching your profile.' },
        { title: '3. Detailed Comparison', desc: 'Detailed comparison across course structure, outcomes, and cost.' },
        { title: '4. Finalisation', desc: 'Guidance sessions to help finalise your preferred choices.' },
        { title: '5. Application Handoff', desc: 'Handoff into the application and SOP/LOR process.' },
      ],
      faqs: [
        { q: 'How many universities should I shortlist?', a: 'This varies by student, but we typically recommend a balanced mix of ambitious, moderate, and safe options based on your profile.' },
        { q: 'Do you consider budget in the shortlist?', a: 'Yes, budget is one of the core factors we account for when building your university shortlist.' },
        { q: 'Can I change my shortlist later in the process?', a: 'Yes, the shortlist is a starting point and can be refined as your preferences or circumstances evolve.' },
      ],
      finalHeading: 'Get a University Shortlist That Actually Fits You',
      finalSub: "Talk to Placedly's study abroad advisors today.",
      finalCtaLabel: 'Get Started',
      finalCtaHref: '/study-visa#apply',
    }} />
  );
}