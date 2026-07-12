import ServiceDetailPage from '../components/ServiceDetailPage';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Fresher Job Placements India | Placedly',
  description: "Placedly helps freshers land their first job across BPO, KPO, IT, and MNC sectors with resume support, interview coaching, and direct employer connections.",
};

export default function Page() {
  return (
    <ServiceDetailPage config={{
      breadcrumb: 'Fresher Placements',
      tag: 'Placement Services',
      title: 'Fresher Placements – Launch Your Career the Right Way',
      subtitle: "Placedly helps freshers land their first job across BPO, KPO, IT, and MNC sectors with resume support, interview coaching, and direct employer connections.",
      stats: [
        { value: '600+', label: 'Freshers Placed' },
        { value: '30 Days', label: 'Avg. Time to Offer' },
        { value: '25+', label: 'Hiring Partners' },
      ],
      ctaPrimaryLabel: 'Start My Fresher Journey',
      ctaPrimaryHref: '/vacancies?level=fresher',
      ctaSecondaryLabel: 'See CAP Program',
      ctaSecondaryHref: '/cap',
      overviewHeading: 'The First Job Is Often the Hardest to Get',
      overviewBody: "The first job is often the hardest one to get — not because freshers lack potential, but because they lack the experience employers usually screen for, and they often don't know how to present the potential they do have. Placedly's fresher placement service is built specifically around solving this problem. We work with new graduates and early-career candidates to identify roles that genuinely match their academic background, skills, and interests across BPO, KPO, IT, and MNC sectors, pan-India. Rather than encouraging freshers to apply broadly and hope something sticks, we take a targeted approach — matching candidates to companies that are actively hiring at the entry level and are set up to onboard and train freshers well. Alongside job matching, freshers get access to resume building and interview coaching specifically designed for candidates with limited or no work experience, helping them present academic projects, internships, and transferable skills in a way that resonates with employers. Many freshers apply to dozens of jobs without ever hearing back, simply because their applications aren't reaching the right employers or aren't positioned effectively. Placedly's direct relationships with companies actively hiring freshers means candidates spend less time applying into the void and more time in real conversations with employers who are genuinely looking for entry-level talent.",
      featuresHeading: "What's Included",
      features: [
        { title: 'Curated Entry-Level Openings', desc: 'Curated entry-level openings across BPO, KPO, IT, and MNC sectors pan-India.' },
        { title: 'Fresher Resume Support', desc: 'Resume support built around academic projects, internships, and skills.' },
        { title: 'Interview Coaching', desc: 'Interview coaching tailored to first-time job seekers.' },
        { title: 'Direct Employer Connections', desc: 'Direct connections with employers actively hiring and onboarding freshers.' },
        { title: 'Offer Evaluation Guidance', desc: 'Guidance on evaluating offers and choosing the right first role.' },
        { title: 'Onboarding Support', desc: "Ongoing support through onboarding once you're selected." },
      ],
      processHeading: 'How It Works',
      process: [
        { title: '1. Profile Assessment', desc: 'Profile assessment covering education, skills, and interests.' },
        { title: '2. Preparation', desc: 'Resume and interview preparation tailored for fresher candidates.' },
        { title: "3. Role Matching", desc: "Matching against active entry-level openings in Placedly's network." },
        { title: '4. Interview Scheduling', desc: 'Interview scheduling and coaching support through each round.' },
        { title: '5. Offer & Onboarding', desc: 'Offer support and onboarding guidance once selected.' },
      ],
      faqs: [
        { q: 'I have no work experience — can Placedly still help?', a: 'Yes, this service is specifically designed for candidates with little to no work experience, focusing on academic and project-based strengths.' },
        { q: 'What industries are covered for freshers?', a: 'Fresher placements span BPO, KPO, IT, and MNC sectors, giving candidates from different academic backgrounds relevant options.' },
        { q: 'Is there a fee for candidates?', a: "Placedly's fee structure is discussed directly during your consultation, based on the specific service and support required." },
      ],
      finalHeading: 'Start Your Career the Right Way',
      finalSub: 'Connect with Placedly for fresher placement support today.',
      finalCtaLabel: 'View Fresher Roles',
      finalCtaHref: '/vacancies?level=fresher',
    }} />
  );
}