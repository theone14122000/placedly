import ServiceDetailPage from '../components/ServiceDetailPage';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Experienced Professional Placements India | Placedly',
  description: "Placedly places experienced professionals in senior BPO, KPO, IT, and MNC roles pan-India, matching skills, experience, and salary expectations with the right employer.",
};

export default function Page() {
  return (
    <ServiceDetailPage config={{
      breadcrumb: 'Experienced Professional Placements',
      tag: 'Placement Services',
      title: 'Experienced Professional Placements – Move Up, Not Just Sideways',
      subtitle: "Placedly places experienced professionals in senior BPO, KPO, IT, and MNC roles pan-India, matching skills, experience, and salary expectations with the right employer.",
      stats: [
        { value: '₹18L', label: 'Avg. Placement CTC' },
        { value: '400+', label: 'Professionals Placed' },
        { value: '20+', label: 'Years Combined Recruiter Exp.' },
      ],
      ctaPrimaryLabel: 'Explore Senior Roles',
      ctaPrimaryHref: '/vacancies?level=experienced',
      ctaSecondaryLabel: 'See CAP Program',
      ctaSecondaryHref: '/cap',
      overviewHeading: 'Find a Role That Represents Genuine Progress',
      overviewBody: "For professionals with a few years of experience under their belt, the job search looks different from a fresher's — it's less about getting a foot in the door and more about finding a role that represents genuine progress, whether that's a step up in seniority, a better package, or a move into a new domain. Placedly's experienced professional placement service is built around this kind of experience-level matching. We look beyond just matching keywords on a resume to understand your actual trajectory — where you've been, what you've achieved, and where you want to go — and connect you with mid-to-senior roles across BPO, KPO, LPO, IT, and MNC organisations that genuinely fit that direction. Compensation is a major factor at this stage, and we support candidates with salary benchmarking and negotiation guidance, so offers reflect market rates and your actual value, not just what an employer initially proposes. Experienced professionals often face a frustrating mismatch — companies want to see relevant experience, but generic job portals surface roles that don't actually align with a candidate's specific trajectory. Placedly's recruiter relationships and industry expertise mean experienced candidates get matched to roles that make sense for their next career move, not just any open position.",
      featuresHeading: "What's Included",
      features: [
        { title: 'Curated Opportunities', desc: 'Curated opportunities matched to your specific experience level and domain.' },
        { title: 'Mid-to-Senior Role Access', desc: 'Access to mid-level and senior roles across BPO, KPO, LPO, IT, and MNC sectors.' },
        { title: 'Salary Benchmarking', desc: 'Salary benchmarking based on current market data for your role.' },
        { title: 'Negotiation Support', desc: 'Negotiation support to help you secure a stronger offer.' },
        { title: 'Confidential Search Support', desc: 'Confidential job search support for candidates currently employed.' },
        { title: 'Offer Evaluation Guidance', desc: 'Guidance on evaluating multiple offers and making the right choice.' },
      ],
      processHeading: 'How It Works',
      process: [
        { title: '1. Profile Assessment', desc: 'In-depth profile and career trajectory assessment.' },
        { title: '2. Salary Benchmarking', desc: 'Salary benchmarking against current market data for your role.' },
        { title: '3. Role Matching', desc: "Matching against active mid-to-senior openings in Placedly's network." },
        { title: '4. Interview Coordination', desc: 'Interview coordination with confidentiality where required.' },
        { title: '5. Offer & Decision Guidance', desc: 'Offer negotiation support and final decision guidance.' },
      ],
      faqs: [
        { q: 'Can I search confidentially while currently employed?', a: 'Yes, Placedly supports confidential job searches for candidates who need to explore opportunities discreetly.' },
        { q: 'Do you help with salary negotiation?', a: 'Yes, we provide market benchmarking and negotiation guidance to help you secure a stronger offer.' },
        { q: 'What experience level does this service cover?', a: 'This service is built for professionals with prior work experience looking to move into mid-level or senior roles.' },
      ],
      finalHeading: 'Ready for Your Next Career Move?',
      finalSub: "Connect with Placedly's experienced professional placement team.",
      finalCtaLabel: 'Talk to an Advisor',
      finalCtaHref: '/contact',
    }} />
  );
}